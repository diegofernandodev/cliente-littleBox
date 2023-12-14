import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Egreso } from 'src/app/interfaces/egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/interfaces/categorias';
import { TerceroService } from 'src/app/services/tercero.service';
import { Tercero } from 'src/app/interfaces/terceros';
import { ObjectId } from 'mongodb';
import { TenantService } from 'src/app/services/tenant.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';

@Component({
  selector: 'app-add-edit-egreso',
  templateUrl: './add-edit-egreso.component.html',
  styleUrls: ['./add-edit-egreso.component.css']
})
export class AddEditEgresoComponent implements OnInit {
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  categorias: Categoria[] = [];
  terceros: Tercero[] = [];
  
  selectedCategoriaId: string | ObjectId = ''; // Agregado para manejar ngModel
  selectedTerceroId: string | ObjectId = ''; // Agregado para manejar ngModel

  formulario: Egreso = {
    fecha: new Date(),
    detalle: "",
    categoria:null,
    valor: 0,
    tercero: null
  };

  constructor(
    private _egresoService: EgresoService,
    private router: Router,
    private aRouter: ActivatedRoute,
    private categoriaService: CategoriaService,
    private tenantService: TenantService,
    private terceroService: TerceroService,
    private sweetAlertService: SweetAlertService
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.tenantService.setTenant('123456789')
    this.getCategorias();
    this.getTerceros();
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getEgreso(this.id);
    } else {
      // Inicializa los controles ngModel
      this.selectedCategoriaId = '';
      this.selectedTerceroId = '';
    }
  }

  getCategorias(): void {
    this.categoriaService.getListaCategorias().subscribe((Data: any) => {
      this.categorias = [...Data.data];
    });
  }

  getTerceros(): void {
    this.terceroService.getListaTerceros().subscribe((Data: any) => {
      this.terceros = [...Data.data];
    });
  }

  getEgreso(id: any) {
    this.loading = true;
    this._egresoService.getEgreso(id).subscribe((response: any) => {
      this.loading = false;
      const data = response.data; // Extraer la propiedad 'data' de la respuesta
      console.log('Datos obtenidos:', data);

      // Asignar 'data' al formulario
      this.formulario = {
        egresoId: data.egresoId,
        tenantId: data.tenantId,
        fecha: new Date(data.fecha),
        detalle: data.detalle,
        valor: data.valor,
        categoria: data.categoria?.nombre,
        tercero: data.tercero?.nombreTercero
      };
      console.log("esta es la categoria", this.formulario.categoria, this.formulario.tercero);
      
      // Asignar valores por defecto a los controles ngModel
      this.selectedCategoriaId = data.categoria?._id || ''; // Asignar el ID de la categoría
      this.selectedTerceroId = data.tercero?._id || ''; // Asignar el ID del tercero
      console.log('Formulario después de la asignación:', this.formulario);
      console.log(this.selectedCategoriaId, this.selectedTerceroId);
      
    });
  }


  updateTercero(value: string): void {
    if (this.formulario.tercero) {
      this.formulario.tercero.nombreTercero = value;
    }
  }

  updateCategoria(value: string): void {
    if (this.formulario.categoria) {
      this.formulario.categoria.nombre = value;
    }
  }

  addEgreso() {
    this.loading = true;
    this.formulario.categoria = this.categorias.find(c => c._id === this.selectedCategoriaId);
    this.formulario.tercero = this.terceros.find(t => t._id === this.selectedTerceroId);
    if (this.id !== null) {
    this.sweetAlertService.showConfirmationDialog().then((result) => {
      if (result.isConfirmed) {
        this.realizarActualizacion();
      } else if (result.isDenied) {
        this.sweetAlertService.showErrorAlert('Los cambios no se guardaron');
        this.loading = false;
      }else{
        // Si hace clic en "Cancelar", redirige a la lista de egresos
        this.router.navigate(['/']);
      }
    });
    } else {
      this.realizarInsercion();
    }
  }
  realizarActualizacion() {
    this._egresoService.updateEgreso(this.id, this.formulario).subscribe(() => {
      const categoriaNombre = this.formulario.categoria?.nombre;
      this.sweetAlertService.showSuccessAlert(`El Egreso ${categoriaNombre} fue actualizado con éxito`);
      this.loading = false;
      this.router.navigate(['/']);
    });
  }
  realizarInsercion() {
    this._egresoService.saveEgresos(this.formulario).subscribe(() => {
      // Muestra la alerta de éxito con SweetAlert2
      this.sweetAlertService.showSuccessToast('Egreso guardado exitosamente');

      // Espera 1500 milisegundos (1.5 segundos) antes de navegar a la lista de egresos
      setTimeout(() => {
        this.loading = false;
        this.router.navigate(['/']);
      }, 1500);
    });
  }
}


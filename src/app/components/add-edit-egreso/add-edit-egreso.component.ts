import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Egreso } from 'src/app/interfaces/egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Categoria } from 'src/app/interfaces/categorias';
import { toArray, map } from 'rxjs/operators';
import { TerceroService } from 'src/app/services/tercero.service';

@Component({
  selector: 'app-add-edit-egreso',
  templateUrl: './add-edit-egreso.component.html',
  styleUrls: ['./add-edit-egreso.component.css']
})
export class AddEditEgresoComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  id: string | null;
  operacion: string = 'Agregar ';
  categorias: Categoria[] = [];
  tenantIdSave:string = "123456789"
  selectedCategoriaControl = this.fb.control('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private _egresoService: EgresoService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute,
    private categoriaService: CategoriaService
  ) {
    this.form = this.fb.group({
      tercero: ["", Validators.required], 
      fecha: ["", Validators.required],
      categoria: ["", Validators.required],
      detalle: ["", Validators.required],
      valor: ["", Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
    this.getCategorias()
  }

  ngOnInit() {
   this.getCategorias();
    if (this.id !== null) {
      this.operacion = 'Editar ';
      this.getEgreso(this.id);
    }
  }

  getCategorias(): void{
    this.categoriaService.getListaCategorias().subscribe((Data:any)=>{
      this.categorias = [...Data.data];
    })
    
  }
  // getCategorias(): void {
  //   this.categoriaService.getListaCategorias().pipe(
  //     toArray(), // Convert Observable to array
  //     map((categoriasData: any[]) => { // Convert each object to Categoria
  //       return categoriasData.map((categoriaData: any) => {
  //         return({
  //           _id: categoriaData._id,
  //           nombre: categoriaData.nombre,
  //         });
  //       });
  //     })
  //   ).subscribe((categorias: Categoria[]) => {
  //     this.categorias = categorias;
  //   });
  //   console.log("listado de categorias",this.categorias);
    
  // }

  getEgreso(id: any) {
    this.loading = true;
    this._egresoService.getEgreso(id,this.tenantIdSave).subscribe((data: Egreso) => {
      this.loading = false;
      this.form.setValue({
        fecha: data.fecha,
        categoria: data.categoria, // Asigna el objeto completo de la categoría
        detalle: data.detalle,
        valor: data.valor,
        tercero: data.tercero, // Asigna el objeto completo del tercero
      });

      // Verifica si data.categoria es un objeto antes de acceder a _id
      if (data.categoria && typeof data.categoria === 'object') {
        this.selectedCategoriaControl.setValue(data.categoria._id?.toString());
      } else {
        // Si no es un objeto o no tiene _id, puedes manejarlo según tus necesidades
        // Por ejemplo, asignar un valor predeterminado o lanzar un error.
      }
    });
  }

  addEgreso() {
    const egreso: Egreso = {
      egresoId: 0, // Este valor se asignará en el backend con el método de incremento
      tenantId: "", // Este valor se obtendrá del servicio de tenants
      fecha: this.form.value.fecha,
      detalle: this.form.value.detalle,
      categoria: this.form.value.categoria,
      valor: this.form.value.valor,
      tercero: this.form.value.tercero, // Debes asignar el valor correcto según tu lógica de negocio
    };
    this.loading = true;
    if (this.id !== null) {
      egreso._id = this.id;
      this._egresoService.updateEgreso(this.id, egreso, this.tenantIdSave).subscribe(() => {
        this.toastr.info(`El Egreso ${egreso.categoria} fue actualizado con éxito`, 'Egreso actualizado');
        this.loading = false;
        this.router.navigate(['/']);
      });
    } else {
      this._egresoService.saveEgresos(egreso,this.tenantIdSave).subscribe(() => {
        this.toastr.success(`El egreso ${egreso.categoria} fue registrado con éxito`, 'Egreso registrado');
        this.loading = false;
        this.router.navigate(['/']);
      });
    }
  }
}

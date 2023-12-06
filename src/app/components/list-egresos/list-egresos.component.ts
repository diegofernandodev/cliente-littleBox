import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Egreso } from 'src/app/interfaces/egreso';
import { EgresoService } from 'src/app/services/egreso.service';


@Component({
  selector: 'app-list-egresos',
  templateUrl: './list-egresos.component.html',
  styleUrls: ['./list-egresos.component.css']
})
export class ListEgresosComponent implements OnInit {
  listEgresos: Egreso[] = []
  loading: boolean = false;

  constructor(private _egresoService: EgresoService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getListEgresos('123456789');
  }

  // setTenantForTesting() {
  //   const tenantIdForTesting = '123456789'; 
  //   this._egresoService.setTenantForTesting(tenantIdForTesting);
  // }

  getListEgresos(tenantId: string): void {
    this.loading = true;
    this._egresoService.getListaEgresos(tenantId).subscribe((data: any) => {
      console.log(data);
      this.listEgresos = [...data.data];
      this.loading = false;
      console.log(this.listEgresos);
      
    });
  }
  
  
  deleteEgreso(id: any, tenantId:string) {
    if (id) {
      this.loading = true;
      this._egresoService.deleteEgresos(id,tenantId).subscribe(() => {
        this.getListEgresos('123456789');
        this.toastr.warning('El egreso fue eliminado con éxito', 'Egreso eliminado');
      });

    } else {
      console.log("no funciona");

    }
  }


}

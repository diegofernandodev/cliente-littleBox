import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Egreso } from 'src/app/interfaces/egreso';
import { EgresoService } from 'src/app/services/egreso.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { TenantService } from 'src/app/services/tenant.service';


@Component({
  selector: 'app-list-egresos',
  templateUrl: './list-egresos.component.html',
  styleUrls: ['./list-egresos.component.css']
})
export class ListEgresosComponent implements OnInit {
  listEgresos: Egreso[] = []
  loading: boolean = false;

  constructor(private tenantService: TenantService,private _egresoService: EgresoService, private route: ActivatedRoute,private sweetAlertService: SweetAlertService) { }

  ngOnInit(): void {
    this.tenantService.setTenant('123456789')
    this.getListEgresos();
  }

  getListEgresos(): void {
    this.loading = true;
    this._egresoService.getListaEgresos().subscribe((data: any) => {
      console.log(data);
      this.listEgresos = [...data.data];
      this.loading = false;
      console.log(this.listEgresos);
      
    });
  }
  
  
  deleteEgreso(id: any, tenantId:string) {
    if (id) {
      this.sweetAlertService.showConfirmationDelete().then((result) => {
        if (result.isConfirmed) {
          this.loading = true;
          this._egresoService.deleteEgresos(id).subscribe(() => {
            this.sweetAlertService.showDeleteAlert('Egreso eliminado con exito.');
            this.getListEgresos();
          });
        }
      });
    }
    else {
      console.log("no funciona");

    }
  }


}

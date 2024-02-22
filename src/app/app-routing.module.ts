import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes
import { ListEgresosComponent } from './components/list-egresos/list-egresos.component';
import { AddEditEgresoComponent } from './components/add-edit-egreso/add-edit-egreso.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'register-Login', component: RegisterLoginComponent },
  { path: 'obtenerTodosLosEgresos', component: ListEgresosComponent },
  { path: 'add', component: AddEditEgresoComponent },
  { path: 'edit/:id', component: AddEditEgresoComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

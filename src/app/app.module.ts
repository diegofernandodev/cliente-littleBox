import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {TenantInterceptorService  } from './services/tenant-interceptor.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListEgresosComponent } from './components/list-egresos/list-egresos.component';
import { AddEditEgresoComponent } from './components/add-edit-egreso/add-edit-egreso.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { FormsModule } from '@angular/forms'; // Agrega esta línea

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListEgresosComponent,
    AddEditEgresoComponent,
    ProgressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, // Agrega esta línea
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TenantInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


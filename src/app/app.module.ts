import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './services/auth.interceptor.service';
// import {TenantInterceptorService  } from './services/tenant-interceptor.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListEgresosComponent } from './components/list-egresos/list-egresos.component';
import { AddEditEgresoComponent } from './components/add-edit-egreso/add-edit-egreso.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { FormsModule } from '@angular/forms';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegisterLoginComponent } from './components/register-login/register-login.component'; // Agrega esta línea
import { AuthServiceService } from './services/auth-service.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListEgresosComponent,
    AddEditEgresoComponent,
    ProgressBarComponent,
    PrincipalComponent,
    RegisterLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule, // Agrega esta línea
  ],
  providers: [
    AuthServiceService,
    {
      // provide: HTTP_INTERCEPTORS,
      // useClass: TenantInterceptorService,
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


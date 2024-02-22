// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register-login',
//   templateUrl: './register-login.component.html',
//   styleUrls: ['./register-login.component.css']
// })
// export class RegisterLoginComponent {

//   showLogin: boolean = true;
//   showRegister: boolean = false;

//   constructor() { }

//   toggleModal(showLogin: boolean) {
//     this.showLogin = showLogin;
//     this.showRegister = !showLogin;
//   }

// }
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from 'src/app/services/login.service'; // Importa tu servicio de login
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from "src/app/services/auth-service.service";

@Component({
  selector: 'app-register-login',
  templateUrl: './register-login.component.html',
  styleUrls: ['./register-login.component.css']
})
export class RegisterLoginComponent implements OnInit {

  showLogin: boolean = true;
  showRegister: boolean = false;

  // Propiedades para el formulario de inicio de sesión
  emailLogin: string = "";
  passwordLogin: string = "";

  // Propiedades para el formulario de registro
  name: string = "";
  emailRegister: string = "";
  passwordRegister: string = "";

  errorMessage: string = "";

  token: string | null = null; // Propiedad para almacenar el token

  constructor(private authService: LoginService, private serviceToken: AuthServiceService) {
  this.emailLogin = "";
  this.passwordLogin = "";
  this.name = "";
  this.emailRegister = "";
  this.passwordRegister = "";

  
   }

   

  ngOnInit():void {
  }
   

  onSubmitLogin() {
    // Validaciones y lógica para el inicio de sesión
    this.authService.loginUser(this.emailLogin, this.passwordLogin)
      .subscribe({
        next: response => {
           // Lógica después de iniciar sesión correctamente
        console.log("Sesión iniciada correctamente");
        },
        error: error => {
          this.errorMessage = "Error al iniciar sesión. Verifique sus credenciales.";
        },
        complete: () => {
          this.serviceToken.getToken().subscribe(token => {
            this.token = token;
            console.log('Token:', this.token);
          });
        }
      });
  }

  onSubmitRegister() {
    // Validaciones y lógica para el registro
  }

  onToggleModal(showLogin: boolean) {
    this.showLogin = showLogin;
    this.showRegister = !showLogin;
  }
  //  ngOnInit(): void {
  //    throw new Error('Method not implemented.');
  //  }

  //  // Propiedades para el formulario de inicio de sesión
  //  emailLogin: string = "";
  //  passwordLogin: string = "";
 
  //  // Propiedades para el formulario de registro
  //  name: string = "";
  //  emailRegister: string = "";
  //  passwordRegister: string = "";
 
  //  // Otras propiedades...
 
  //  onSubmitLogin() {
  //    // Validaciones y lógica para el inicio de sesión
  //  }
 
  //  onSubmitRegister() {
  //    // Validaciones y lógica para el registro
  //  }

  // showLogin: boolean = true;
  // showRegister: boolean = false;

  // constructor() { }

  // ngOnInit() { }

  // onSubmitLogin() {
  //   // Obtener los valores de los campos del formulario
  //   const email = this.email.value;
  //   const password = this.password.value;
  
  //   // Validar los valores de los campos
  //   if (!email || email.length < 5) {
  //     // Mostrar un mensaje de error
  //     this.errorMessage = "El correo electrónico debe ser de al menos 5 caracteres.";
  //     return;
  //   }
  
  //   if (!password || password.length < 6) {
  //     // Mostrar un mensaje de error
  //     this.errorMessage = "La contraseña debe ser de al menos 6 caracteres.";
  //     return;
  //   }
  
  //   // Iniciar el proceso de inicio de sesión
  //   this.authService.login(email, password);
  // }

  // onSubmitRegister() {
  //   // código para registrarse
  // }

  // onToggleModal(showLogin: boolean) {
  //   this.showLogin = showLogin;
  //   this.showRegister = !showLogin;
  // }

}


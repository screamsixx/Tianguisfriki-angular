import { registerLocaleData } from '@angular/common';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuario ={
    email:'',
    password:''
  }

  constructor(private authService: AuthService){

  }

  Ingresar(){
    console.log(this.usuario);
    const {email, password}=this.usuario;
    this.authService.login(email,password).then(resp=>{
    console.log("se registro: ", resp);

    })
  }

  IngresarConGoogle(){
    console.log(this.usuario);
    const {email, password}=this.usuario;
    this.authService.loginWithGoogle(email,password).then(resp=>{
    console.log("se registro: ", resp);

    })
  }

  obtenerUsuarioLogeado(){
    this.authService.getUserLogged().subscribe(resp=>{

      console.log(resp?.email);
    });
    
  }
       
    logout(){
      this.authService.loggout();
    }

  title = 'tianguisfriki';
}

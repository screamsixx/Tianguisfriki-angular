import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario ={
    email:'',
    password:''
  }

  constructor(private authService: AuthService, private router:Router) { }

  
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
      return resp?.email;
    });
  }

  sesionxproducts(){
    this.authService.getUserLogged().subscribe(resp=>{
      console.log(resp?.email);
      if(resp?.email!=null){ //que hay sesion
        this.router.navigate(['/', 'products']);
      }
    });
  }
  

       
    logout(){
      this.authService.loggout();
    }

  ngOnInit(): void {

    this.sesionxproducts(); //ven y checa ya hay alguien logeado pa que lo cambies de pagina
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  usuario ={
    email:'',
    password:''
  }

  constructor(private authService: AuthService) { }


  Registrar(){
    console.log(this.usuario);
    const {email, password}=this.usuario;
    this.authService.register(email,password).then(resp=>{
    console.log("se registro: ", resp);

    })
  }

  ngOnInit(): void {
  }

}

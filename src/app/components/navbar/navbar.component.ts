import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  vendedor="";
  usuario ={
    email:'',
    password:''
  }

  constructor(private router:Router, private authService:AuthService) { }

  logout(){
    this.authService.loggout();
  }

  noautenticado(){
    this.authService.getUserLogged().subscribe(resp=>{
      console.log(resp?.email);
      if(resp?.email==null){ //que hay sesion
        this.router.navigate(['/', 'signup']);
      }
    });
  }

  ngOnInit(): void {
    this.noautenticado();
    this.obtenervendedor();
    
  }


  obtenervendedor(){
    this.authService.getUserLogged().subscribe(resp=>{
      let x:string = resp?.email!; //le dice a typescrit se lo pase por los webos el tipado
      this.vendedor=x;
      
    });
    
  }

  onCreatePost(postData ={search:""}) {
    
    if(postData.search!=""){ //busqueda diferente de blanco
      console.log("search: ",postData.search);
      this.router.navigate(['/searchs',postData.search]);

    }
}

}

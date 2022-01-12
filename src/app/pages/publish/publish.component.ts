import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Router } from '@angular/router';
@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  usuario ={
    email:'',
    password:''
  }

  vendedor="";
  randomid="";
  

  constructor(private http:HttpClient, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.obtenervendedor();

     

  }


  obtenervendedor(){
    this.authService.getUserLogged().subscribe(resp=>{
      let x:string = resp?.email!; //le dice a typescrit se lo pase por los webos el tipado
      this.vendedor=x;
      let y:string=((Math.random() + 1).toString(36).substring(7)+(Math.random() + 1).toString(36).substring(7)).toString();
      this.randomid=y;
    });
    
  }
 
  

  onCreatePost(postData ={description:"", id:"", img:"", name:"", price:"", seller:"", stock:"", category:""}) {
    postData.id=this.randomid;
    postData.seller=this.vendedor;
    console.log("datos enviados",postData);
    // Send Http request
    let enviar=true;
    if(postData.category==""){
enviar=false;
    }
    if(postData.name==""){
      enviar=false;
    }
    if(postData.price==""){
      enviar=false;
    }
    
    if((Number(postData.price))<=0){
      enviar=false;
    }

    if(postData.stock==""){
      enviar=false;
    }
    if((Number(postData.stock))<=0){
      enviar=false;
    }
    
    

    if(enviar==true){ //si todo se cumple envialo
      this.http
      .post('https://marketplace-10b84-default-rtdb.firebaseio.com/products.json',postData)
       .subscribe(responseData => {
          console.log(responseData);
          alert("Exito al publicar producto");
          this.router.navigate(['/', 'products']); //se autodirige a productos
        });
    }else{
      alert("Verifica el producto");
    }

   

   
         
    }

}

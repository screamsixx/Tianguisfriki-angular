import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Listaproductos } from 'src/app/models/products.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit {
  productos: Listaproductos[] = []; //productos en general
  myproducts:Listaproductos[] = []; //para los productos mios

  constructor(private activeroute:ActivatedRoute, private api:ProductsService, private http:HttpClient, private router:Router) { }

  ngOnInit(): void {
    let parametrovendedor=this.activeroute.snapshot.params["param"]; //vendedor solicitado
    this.api.getallproducts().subscribe(resp=>{
      console.log("resp: ", resp);
      
      for(let i in resp){
        
        resp[i].id=i; //intercambiamos el id de producto por el id del restapi encriptado ya que solo ocupamos el encriptado
        this.productos.push(resp[i]); //carga uno por uno los productos
      }
      //this.productos=resp;
      this.myproducts=this.productos.filter( element => element.seller ==parametrovendedor); //filtra el producto en especifico por vendedor
      console.log("con id nuevo: ",this.myproducts);
      if(this.myproducts.length.toString()=="0"){
        alert("No tienes productos publicados, te invitamos a realizar una publicación");
      }

    })
    
    
    
  }

  eliminarproducto(elid:string){ //recibir el parametro osea el id encriptado
    console.log(elid);
    let idunico="https://marketplace-10b84-default-rtdb.firebaseio.com/products/"+elid+".json";
    console.log("idunico a borrar: ",idunico);
    this.http.delete(idunico)
    .subscribe(resp =>{
      console.log(resp);
      alert("Publicación eliminada con exito");
      this.router.navigate(['/', 'products']); //se autodirige a productos
    })
    
  }

}

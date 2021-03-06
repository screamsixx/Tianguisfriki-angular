import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Listaproductos } from 'src/app/models/products.interface';
@Component({
  selector: 'app-searchs',
  templateUrl: './searchs.component.html',
  styleUrls: ['./searchs.component.css']
})
export class SearchsComponent implements OnInit {
  productos: Listaproductos[] = [];
  mibusqueda:Listaproductos[]=[];
  constructor(private api:ProductsService, private activeroute:ActivatedRoute) { }
   parametro="";
   
   

  ngOnInit(): void {
    this.parametro=this.activeroute.snapshot.params["param"]; //producto solicitado
    this.parametro=this.parametro.toLowerCase(); //convertido a minusculas
    this.api.getallproducts().subscribe(resp=>{
      console.log("resp: ", resp);
      for(let i in resp){
        let x=resp[i].name.toLowerCase(); //rep a minuscula
        let cat=resp[i].category.toLowerCase();
        if(x.includes(this.parametro)){ //si entra aqui sabremos que se encontro tal producto en los nombres
          console.log("se encontro:", resp[i].name);
          this.mibusqueda.push(resp[i]);//y aqui se guardarĂ¡
        }else if(cat.includes(this.parametro)){ //si entra aqui sabremos que se encontro el producto en categorias
          console.log("se encontro:", resp[i].name);
          this.mibusqueda.push(resp[i]);//y aqui se guardarĂ¡
        }
      }

      console.log("se encontro: ", this.mibusqueda);
      
      
      //this.productos=resp;
      
    })

    

  }

}

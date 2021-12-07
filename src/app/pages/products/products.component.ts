import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Listaproductos } from 'src/app/models/products.interface';
import { getAuth, onAuthStateChanged } from "firebase/auth";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  
  productos: Listaproductos[] = [];

  constructor(private api:ProductsService) { }

  ngOnInit(): void {


    this.api.getallproducts().subscribe(resp=>{
      console.log("resp: ", resp);
      for(let i in resp){
        this.productos.push(resp[i]); //carga uno por uno
      }
      
      //this.productos=resp;
      
    })
    

    
  }

}

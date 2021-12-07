import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Listaproductos } from 'src/app/models/products.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  activarbtncompra: boolean = false; //el boton comprar inicia activo
  productos: Listaproductos[] = [];
  oneproduct:Listaproductos[] = []; //pa un solo producto
  indiceencriptado: Listaproductos[] = [];
  constructor(private api:ProductsService, private activeroute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    let parametroid=this.activeroute.snapshot.params["param"]; //producto solicitado

    this.api.getallproducts().subscribe(resp=>{
      console.log("resp: ", resp);
      this.indiceencriptado=resp;//pal inidice encriptado
      for(let i in resp){
        this.productos.push(resp[i]); //carga uno por uno
      }
      //this.productos=resp;
      this.oneproduct=this.productos.filter( element => element.id ==parametroid); //filtra el producto en especifico por id
      
      for(let c in this.oneproduct){
        console.log("c: ", this.oneproduct[c].stock); //ver stock
        if(this.oneproduct[c].stock =="0"){
          this.activarbtncompra=true;//se desactiva por tener 0 productos
        }
      }
      
    })
    
  }

  iracomprar(){
    let parametroid=this.activeroute.snapshot.params["param"]; //producto solicitado
    for(let z in this.indiceencriptado){
      if(this.indiceencriptado[z].id ==parametroid){
        console.log("indice encriptado restapi: ", z); //encontrar el indice encriptado
        this.router.navigate(['/buy/', z]);
      }
    }
  }

  

}

import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Listasales } from 'src/app/models/sales.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mysales',
  templateUrl: './mysales.component.html',
  styleUrls: ['./mysales.component.css']
})
export class MysalesComponent implements OnInit {
  todaslascompras: Listasales[] = []; //productos en general
  misventas:Listasales[] = []; //para los productos mios
  constructor(
    private activeroute:ActivatedRoute, private api:SalesService,
    private http:HttpClient, private router:Router
  ) { }

  ngOnInit(): void {
    let parametro=this.activeroute.snapshot.params["param"];
    this.api.getallsales().subscribe(resp=>{
      console.log("resp:",resp);
      for(let i in resp){
        this.todaslascompras.push(resp[i]);
      }
      //empieza el filtrado
      this.misventas=this.todaslascompras.filter(element => element.seller==parametro);
      console.log("mis compras:", this.misventas);
      if(this.misventas.length.toString()=="0"){
        alert("No has realizado alguna venta, ten paciencia");
      }

    })
  }

}

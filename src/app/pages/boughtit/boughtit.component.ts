import { Component, OnInit } from '@angular/core';
import { SalesService } from 'src/app/services/sales.service';
import { Listasales } from 'src/app/models/sales.interface';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-boughtit',
  templateUrl: './boughtit.component.html',
  styleUrls: ['./boughtit.component.css']
})
export class BoughtitComponent implements OnInit {
  todaslascompras: Listasales[] = []; //productos en general
  miscompras:Listasales[] = []; //para los productos mios

  constructor(
    private activeroute:ActivatedRoute, private api:SalesService,
    private http:HttpClient, private router:Router
  ) { }

  ngOnInit(): void {
    let parametrocomprador=this.activeroute.snapshot.params["param"]; //vendedor solicitado
    this.api.getallsales().subscribe(resp =>{
      console.log("resp:", resp); //pa depurar mas isi
      for(let i in resp){ //cargamos todos los productos
        this.todaslascompras.push(resp[i]);
      }
      //empezamos a filtrar productos comprados por el comprador
      this.miscompras=this.todaslascompras.filter(element => element.buyer==parametrocomprador);
      console.log("mis compras: ",this.miscompras);//pa depurar
      if(this.miscompras.length.toString()=="0"){
        alert("No has realizado alguna compra, te invitamos a realizar una");
      }

    })
  }

}

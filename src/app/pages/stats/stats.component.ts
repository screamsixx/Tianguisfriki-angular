import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Listasales } from 'src/app/models/sales.interface';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SalesService } from 'src/app/services/sales.service';
import { Listaopiniones } from 'src/app/models/opinions.interface';
import { OpinionesservicesService } from 'src/app/services/opinionesservices.service';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  

  constructor(private activeroute:ActivatedRoute, private api:SalesService,private apiop:OpinionesservicesService) { }
  parametrocomprador=this.activeroute.snapshot.params["param"]; //vendedor solicitado
  todaslasventas: Listasales[] = []; //ventas en general
  misventas:Listasales[] = []; //para los productos mios
  miscompras:Listasales[] = []; //para los productos mios
  todasopiniones: Listaopiniones[] = []; // en general
  lasopiniones:Listaopiniones[] = []; // los mios
  numerodeopiniones="";
  numerodeventas="";
  numerodeventasenelsitio="";
  numerodecompras="";
  porcentajedeventasfrentealsitio=0;
  laimg="";
  imgpromedio="";
  solopromedio=0;
  
  ngOnInit(): void {
    let parametro=this.activeroute.snapshot.params["param"] //copypaste de codigo que ya tenia pa las ventas
    this.api.getallsales().subscribe(resp=>{
      console.log("resp:",resp);
      for(let i in resp){
        this.todaslasventas.push(resp[i]);
      }
      //empieza el filtrado de mis ventas
      this.misventas=this.todaslasventas.filter(element => element.seller==parametro);
      console.log("mis compras:", this.misventas);
      this.numerodeventas=this.misventas.length.toString(); //misventas
      this.numerodeventasenelsitio=this.todaslasventas.length.toString();//totaldeventasenelsitio
      this.laimg="https://chart.googleapis.com/chart?cht=p3&chd=t:"+this.numerodeventas+","+(Number(this.numerodeventasenelsitio)-Number(this.numerodeventas))+"&chs=500x250&chl";
      this.porcentajedeventasfrentealsitio=(Number(this.numerodeventas)/Number(this.numerodeventasenelsitio))*100; //porcentajedemisventasfrentealsitio
      
      //pa calcular que se ha vendido mas

      for(let i in this.misventas){
        
        for(let o in this.misventas){

        }

      }

      //fin mas vendido
      if(this.misventas.length.toString()=="0"){
        alert("No has realizado alguna venta, ten paciencia");
      }

      //filtrado de mis compras
      //empezamos a filtrar productos comprados por el comprador
      this.miscompras=this.todaslasventas.filter(element => element.buyer==parametro);
      console.log("mis compras: ",this.miscompras);//pa depurar
      this.numerodecompras=this.miscompras.length.toString();
      if(this.miscompras.length.toString()=="0"){
        alert("No has realizado alguna compra, te invitamos a realizar una");
      }

    })

    //para opiniones
    //traer opiniones
    this.apiop.getall().subscribe(resp =>{
      console.log("resp",resp);
      for(let i in resp){
        this.todasopiniones.push(resp[i]); //guarda todo
      }
      //filtrar tienda
      this.lasopiniones=this.todasopiniones.filter(element => element.profile==this.parametrocomprador);
      console.log("las opiniones", this.lasopiniones);
      this.numerodeopiniones=this.lasopiniones.length.toString(); //numero de opiniones
      if(this.lasopiniones.length.toString()=="0"){
        alert("Todavia no hay opiniones, intenta dejar un comentario");
      }

      for(let i in this.lasopiniones){
        this.solopromedio=Number(this.lasopiniones[i].score)+this.solopromedio;
        
      } //sacar promedio
      console.log("promedio "+this.solopromedio);
      this.solopromedio=this.solopromedio/(Number(this.numerodeopiniones));
      console.log("el promedio es: "+this.solopromedio);
      
      this.imgpromedio="https://chart.apis.google.com/chart?chxl=0:|Terrible|Regular|Excelente&chxt=y&chs=300x200&cht=gm&chd=t:"+(this.solopromedio*10)+"&chtt";



    })
    
    

  }


  onPrint() {
    window.print();
  }

}

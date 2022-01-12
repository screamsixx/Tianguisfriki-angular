import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Listaopiniones } from 'src/app/models/opinions.interface';
import { OpinionesservicesService } from 'src/app/services/opinionesservices.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  todasopiniones: Listaopiniones[] = []; // en general
  lasopiniones:Listaopiniones[] = []; // los mios

  constructor(private activeroute:ActivatedRoute, private http:HttpClient,
    private api:OpinionesservicesService
    
    ) { }

  parametrocomprador=this.activeroute.snapshot.params["param"]; //vendedor solicitado
  
  ngOnInit(): void {

    //traer opiniones
    this.api.getall().subscribe(resp =>{
      console.log("resp",resp);
      for(let i in resp){
        this.todasopiniones.push(resp[i]); //guarda todo
      }
      //filtrar tienda
      this.lasopiniones=this.todasopiniones.filter(element => element.profile==this.parametrocomprador);
      console.log("las opiniones", this.lasopiniones);
      if(this.lasopiniones.length.toString()=="0"){
        alert("Todavia no hay opiniones, intenta dejar un comentario");
      }

    })
    
    

    
  }

  onCreatePost(postData ={opinion:"",profile:"",score:""}) {
    postData.profile=this.parametrocomprador;
    console.log("datos enviados",postData);
    // Send Http request
    let enviar=true;
    if(postData.score==""){
      enviar=false;
    }
    if((Number(postData.score))<0){
      enviar=false;
    }
    if((Number(postData.score))>10){
      enviar=false;
    }
    
    if(postData.opinion==""){
      enviar=false;
    }
    if(postData.profile==""){
      enviar=false;
    }
    
    

    if(enviar==true){ //si todo se cumple envialo
      this.http
      .post('https://marketplace-10b84-default-rtdb.firebaseio.com/opinions.json',postData)
       .subscribe(responseData => {
          console.log(responseData);
          alert("Se envio el comentario, refresca para actualizar contenido");
          
        });
    }else{
      alert("Verifica tu opinion");
    }

   

   
         
    }


}

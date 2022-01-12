import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Listasales } from '../models/sales.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SalesService {
  url:string ="https://marketplace-10b84-default-rtdb.firebaseio.com/sales.json";


  constructor(private http:HttpClient) { }

  getallsales():Observable<Listasales[]>{ //regresa todas las ventas
    let apiventas=this.url;
    return this.http.get<Listasales[]>(apiventas);
  }

}

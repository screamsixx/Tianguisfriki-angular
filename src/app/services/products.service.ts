import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {Listaproductos} from 'src/app/models/products.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url:string ="http://marketplace-10b84-default-rtdb.firebaseio.com/products.json";

  constructor(private http:HttpClient) { }

  getallproducts():Observable<Listaproductos[]>{
		let apiproductos=this.url;
    return this.http.get<Listaproductos[]>(apiproductos);
	}

  productoporidencriptado(parametrourl:string){
    return this.http.get<Listaproductos[]>(parametrourl);
  }




}

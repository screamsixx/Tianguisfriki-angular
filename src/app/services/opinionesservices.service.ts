import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Listaopiniones } from 'src/app/models/opinions.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OpinionesservicesService {
  url:string ="https://marketplace-10b84-default-rtdb.firebaseio.com/opinions.json";

  constructor(private http:HttpClient) { }

  getall():Observable<Listaopiniones[]>{
		let laapi=this.url;
    return this.http.get<Listaopiniones[]>(laapi);
	}

}

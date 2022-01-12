import { Attribute, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Listaproductos } from 'src/app/models/products.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit {
  cliente = "";
  utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
  idventa = (Math.random() + 1).toString(36).substring(7) + this.utc + "tianguisfriki" + (Math.random() + 1).toString(36).substring(7);
  private parametroid = this.activeroute.snapshot.params["param"]; //producto solicitado
  productos: Listaproductos[] = [];
  private productsapi = "https://marketplace-10b84-default-rtdb.firebaseio.com/products/" + this.parametroid + ".json";
  constructor(private http: HttpClient, private activeroute: ActivatedRoute, private router: Router, private servicioproductos: ProductsService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.servicioproductos.productoporidencriptado(this.productsapi).subscribe(resp => {
      //marañas pa desconstruir y construir el objeto ya que no se acceder a sus indices
      for (let i in resp) {
        this.productos.push(resp[i]);

      }

    })

    this.obtenercliente(); //pa que se traiga el cliente
    console.log(this.productos);

  }

  obtenercliente() {
    this.authService.getUserLogged().subscribe(resp => {
      let x: string = resp?.email!; //le dice a typescrit se lo pase por los webos el tipado
      this.cliente = x;
    });

  }
  /**
   * hago miles de mexicanadas por que no se usar json
   * [0] -> Categoria
   * [1] -> Descripcion
   * [2] -> un id
   * [3] -> img
   * [4] -> nombre
   * [5] -> precio
   * [6] -> vendedor
   * [7] -> stock
   */
  onCreatePost(postData = { buyer: "", city: "", fullname: "", id: "", price: "", product: "", seller: "", street: "", datetime: "", img:"" }) {
    //funciones fecha
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    postData.datetime = date + ' ' + time;

    let zz = JSON.stringify((this.productos));
    let zzz = JSON.parse(zz);
    console.log("triplez",zzz);
    postData.product = zzz[4];
    postData.seller = zzz[6];
    postData.price = zzz[5]
    postData.img=zzz[3]; //aqui es la imagen
    postData.id = this.idventa; //id random nuevo generado para esta venta
    postData.buyer = this.cliente;
    let valor = true;
    if (postData.fullname == "") {
      valor = false;
    }
    if (postData.street == "") {
      valor = false;
    }
    if (postData.city == "") {
      valor = false;
    }


    if (valor == true) { //si todo se cumple envialo
      this.http
        .post('https://marketplace-10b84-default-rtdb.firebaseio.com/sales.json', postData)
        .subscribe(responseData => {
          console.log(responseData);
          alert("Exito al ordenar, el vendedor podria contactarte pronto.");

          //en este fragmento se hace un update al producto
          let path = "https://marketplace-10b84-default-rtdb.firebaseio.com/products/" + this.parametroid + ".json";
          let update = { stock: "" };
          let u = (Number(zzz[7])) - (Number(1));
          update.stock = (u.toString());

          this.http.patch(path, update).subscribe(resp => {
            console.log("resp update:", resp);
          });

          //finpeticion
          //fin de fragmento
          this.router.navigate(['/', 'products']); //se autodirige a productos
        });
    } else if (valor == false) { //verifica
      alert("Verifica el producto");
    }


  }



}

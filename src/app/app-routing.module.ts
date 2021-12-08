import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './pages/signup/signup.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component'; //productos
import { ProductComponent } from './pages/product/product.component'; //producto
import  {PublishComponent} from './pages/publish/publish.component';
import { MyproductsComponent } from './pages/myproducts/myproducts.component';
import { BuyComponent } from './pages/buy/buy.component';
import { BoughtitComponent } from './pages/boughtit/boughtit.component';
import { MysalesComponent } from './pages/mysales/mysales.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { SearchsComponent } from './pages/searchs/searchs.component';
const routes: Routes = [
  
{path: '', component:LoginComponent},
{path: 'signup', component:SignupComponent},
{path: 'products', component:ProductsComponent},
{path: 'product/:param', component:ProductComponent}, //recibe parametros
{path: 'publish', component:PublishComponent},
{path: 'myproducts/:param', component:MyproductsComponent}, //recibe parametros
{path: 'buy/:param', component:BuyComponent}, //recibe parametros
{path: 'boughtit/:param', component:BoughtitComponent}, //tambien recibe parametro osea quien es el cliente
{path: 'mysales/:param', component:MysalesComponent}, //parametro pa saber mis ventas osea que usuario
{path: 'searchs/:param',component:SearchsComponent}, //busquedas
//pagina error404
{ path: '**', pathMatch: 'full', 
component: ErrorpageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

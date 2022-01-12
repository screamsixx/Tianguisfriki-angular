import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductComponent } from './pages/product/product.component';
import { PublishComponent } from './pages/publish/publish.component';
import { MyproductsComponent } from './pages/myproducts/myproducts.component';
import { BuyComponent } from './pages/buy/buy.component';
import { BoughtitComponent } from './pages/boughtit/boughtit.component';
import { MysalesComponent } from './pages/mysales/mysales.component';
import { ErrorpageComponent } from './pages/errorpage/errorpage.component';
import { SearchsComponent } from './pages/searchs/searchs.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { StatsComponent } from './pages/stats/stats.component';

const firebaseConfig = {
  apiKey: "AIzaSyBwFHvkOXlJAFx7gVLlna5vF2G0t_ZbLN4",
  authDomain: "marketplace-10b84.firebaseapp.com",
  databaseURL: "https://marketplace-10b84-default-rtdb.firebaseio.com",
  projectId: "marketplace-10b84",
  storageBucket: "marketplace-10b84.appspot.com",
  messagingSenderId: "838941209008",
  appId: "1:838941209008:web:52cca79e25dcb30974a675"
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    ProductsComponent,
    ProductComponent,
    PublishComponent,
    MyproductsComponent,
    BuyComponent,
    BoughtitComponent,
    MysalesComponent,
    ErrorpageComponent,
    SearchsComponent,
    ProfileComponent,
    StatsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

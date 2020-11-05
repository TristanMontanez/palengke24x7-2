import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductAPIService } from '../app/services/product-api.service';
import { SignUpService } from '../app/services/signup.service';
import { SingleProductPageModule } from './modal/single-product/single-product.module';
import { ProductCategoriesPageModule } from './modal/product-categories/product-categories.module';
import { SignupPageModule} from './pages/signup/signup.module';
import { CheckoutPageModule} from './pages/checkout/checkout.module';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, SingleProductPageModule, ProductCategoriesPageModule,IonicStorageModule.forRoot(), SignupPageModule, CheckoutPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    ProductAPIService,
    SignUpService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component, OnInit } from '@angular/core';
import { ProductAPIService } from '../../services/product-api.service';
import { LoadingController,ModalController } from '@ionic/angular';
import { ProductCategoriesPage } from '../../modal/product-categories/product-categories.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  products: any;
  items: any;
  singleProductDetails: any;

  constructor(private productAPIService: ProductAPIService, private loadingCtrl: LoadingController,private modalCtrl: ModalController) {
   }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.getProducts();
  }

  async getProducts(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this.productAPIService.getProductCategories().subscribe((response) => {
      this.products = response;
      this.loadingCtrl.dismiss();
    });
  }

  async openSingleProductPage(id){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();
    this.productAPIService.getAllProductsByCategories
    (id).subscribe(async (response) => {
      this.items = JSON.stringify(response);
      this.singleProductDetails = JSON.parse(this.items);
      this.loadingCtrl.dismiss();
    
      const modal = await this.modalCtrl.create({
        component: ProductCategoriesPage,
        componentProps: {
          'data': this.singleProductDetails,
        }
      });
      return modal.present();
    });

    
  
  }


}
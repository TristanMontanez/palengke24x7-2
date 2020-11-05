import { Component, OnInit } from '@angular/core';
import { ProductAPIService } from '../../services/product-api.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { SingleProductPage } from '../../modal/single-product/single-product.page';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.page.html',
  styleUrls: ['./product-categories.page.scss'],
})
export class ProductCategoriesPage implements OnInit {

  items: any;
  singleProductDetails: any;
  productReview: any[]= [];

  constructor(private productAPIService: ProductAPIService, private loadingCtrl: LoadingController, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  

  async openSingleProductPage(id){
    // console.log(id);
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this.productAPIService.getProductReviewById
    (id).subscribe(async (response) => {
      this.items = JSON.stringify(response);
      this.productReview = JSON.parse(this.items);

    });

    this.productAPIService.getSingleProduct
    (id).subscribe(async (response) => {
      this.items = JSON.stringify(response);
      this.singleProductDetails = JSON.parse(this.items);
      // console.log(this.singleProductDetails);

      
      this.loadingCtrl.dismiss();
    
      const modal = await this.modalCtrl.create({
        component: SingleProductPage,
        componentProps: {
          'product': this.singleProductDetails,
          'review': this.productReview,
        }
      });
      return modal.present();
    });

    
  }

  
  back(){
    this.modalCtrl.dismiss();
  }


}

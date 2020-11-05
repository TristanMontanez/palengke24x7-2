import { Component, OnInit } from '@angular/core';
import { ProductAPIService } from '../../services/product-api.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { SingleProductPage } from '../../modal/single-product/single-product.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  palengke: string = "karne";
  karne: any;
  isda: any;
  prutas: any;
  gulay: any;
  driedfish:any;
  other:any;
  items: any;
  singleProductDetails:any;
  productReview: any[]= [];

  constructor(private productAPIService: ProductAPIService, private loadingCtrl: LoadingController, private modalCtrl: ModalController) {
   }

  ngOnInit() {
  }

  ionViewWillEnter(){

    this.getAllProducts();
  }


  async getAllProducts(){
    const loading = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    await loading.present();

    this.productAPIService.getKarneProducts
    ().subscribe((response) => {
      this.karne = response;
    
    });

    this.productAPIService.getIsdaProducts
    ().subscribe((response) => {
      this.isda = response;
    });

    
    this.productAPIService.getPrutasProducts
    ().subscribe((response) => {
      this.prutas = response;
    });

    this.productAPIService.getGulayProducts
    ().subscribe((response) => {
      this.gulay = response;
     
    });

    this.productAPIService.getDriedFishProducts
    ().subscribe((response) => {
      this.driedfish = response;
    });

    this.productAPIService.getOtherProducts
    ().subscribe((response) => {
      this.other = response;
      this.loadingCtrl.dismiss();
    });


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


}

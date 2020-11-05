import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.page.html',
  styleUrls: ['./single-product.page.scss'],
})
export class SingleProductPage implements OnInit {



  constructor(public storage: Storage, public toastCtrl: ToastController, public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  addToCart(product){
  
      this.storage.get("cart").then((data) => {

          if(data == null || data.length == 0){
            data = [];

            data.push({
              "product": product,
              "qty": 1,
              "amount": parseFloat(product.price)
            });
          }else{
              let added = 0;

              for(let i=0; i< data.length; i++){
                if(product.id == data[i].product.id){
                  // console.log("Product is already in the cart");

                  let qty = data[i].qty;

                  data[i].qty = qty+1;
                  data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
                  added = 1;
                }
              }

              if(added == 0){
                data.push({
                  "product": product,
                  "qty": 1,
                  "amount": parseFloat(product.price)
                });
              }
          }

          this.storage.set("cart", data).then(async ()=>{
            // console.log("Cart Updated");
            // console.log(data);

            (await this.toastCtrl.create({
              message: "Cart Updated",
              duration: 3000,
              position: 'top',
            })).present();
          });
      });
  }

  back(){
    this.modalCtrl.dismiss();
  }


}

import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { PaymentGatewaysService } from '../../services/payment-gateways.service';
/*import { WooCommerceRestApi } from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
    url: 'http://palengke24x7.com',
    consumerKey: 'consumer_key',
    consumerSecret: 'consumer_secret', 
    version: 'wc/v3' // WooCommerce WP REST API version
}); 
*/

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})


export class CheckoutPage implements OnInit {

    paymentGateways: any;
    newOrder: any;

    constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private paymentGateway: PaymentGatewaysService) {
        this.newOrder = {}
        this.newOrder.billing_address = {};
        this.newOrder.shipping_address = {};
        this.newOrder.shipping_same = false;
        this.line_items = [
            {
                product_id: 0,
                quantity: 1
            },
            {
                product_id: 1,
                quantity: 1
            }
        ]

    }

    ngOnInit() {
    }
  
  // async getPaymentGateways(){
  //   const loading = await this.loadingCtrl.create({
  //     message: 'Please wait...',
  //   });

  //   await loading.present();

  //   this.paymentGateway.getPaymentGateways().subscribe((response) => {
  //     this.paymentGateways = response;
  //     this.loadingCtrl.dismiss();
  //   });

    checkout_submit() {
        console.log("checkout test");

        const { first_name = "",
                last_name = "",
                country,
                postcode = "",
                paymentmethod } = this.newOrder.billing_address;

        if (    first_name.length <= 0 ||
                last_name.length <= 0 ||
                country == null ||
                postcode == "" ||
                paymentmethod == null) {
                    console.log("error message: please fill all required fields");
                    return;
        }

        if (this.newOrder.billing_address.postcode.length != 4) {
            console.log("invalid postcode");
            return;
        }

        console.log(this.newOrder.billing_address);
/*        WooCommerceRestApi.get("")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
*/
    }
   
    back(){
        this.modalCtrl.dismiss();
    }

}

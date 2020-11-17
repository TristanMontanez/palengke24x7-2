import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { PaymentGatewaysService } from '../../services/payment-gateways.service';
import { HttpClientModule } from '@angular/common/http';
import  WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})


export class CheckoutPage implements OnInit {

    api = new WooCommerceRestApi({
        url: 'https://karinderya24x7.com',
        consumerKey: 'ck_0ecf3e9078e50ff7043cbb49423ed45269bcaad3',
        consumerSecret: 'cs_d80111293fa10ab07635464f3dbc9a4041220caf',
        version: 'wc/v3' // WooCommerce WP REST API version
    }); 

    paymentGateways: any;
    newOrder: any;

    constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private paymentGateway: PaymentGatewaysService) {
        this.newOrder = {}
        this.newOrder.billing_address = {};
        this.newOrder.shipping_address = {};
        this.newOrder.shipping_same = false;

    }

    ngOnInit() {
    }
  /*
    async getPaymentGateways() {
        return new Promise(resolve => {
            this.api.get(
                    `${this.api.url}/wp-json/wc/v3/payment_gateways?consumer_key=${
                    this.api.consumerKey
                    }&consumer_secret=${this.api.consumerSecret}`
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    */
    /*
    async createOrder(input) {
        const orderObj = {};
        orderObj['payment_method'] = input.paymentmethod;
        orderObj['customer_id'] = 1;                                            //customer id
        orderObj['billing'] = input.billing_address;
//        orderObj['shipping'] = this.address;
//        orderObj['line_items'] = this.line_items;

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });

        const order = this.JSON_to_URLEncoded(obj);

        return new Promise(resolve => {
            this.http
                .post(
                    `${this.url}/wp-json/wc/v3/orders/?consumer_key=${
                    this.consumerKey
                    }&consumer_secret=${this.consumerSecret}`,
                    order,
                    { 'Content-Type': 'application/x-www-form-urlencoded' }
                )
                .subscribe(data => {
                    resolve(data);
                });
        });
    }
    */

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
        console.log("success")
        console.log(this.newOrder.billing_address);
        this.api.post(`$/wp-json/wc/v3/orders/?consumer_key=$this.api.}&consumer_secret=${this.api.consumerSecret}`, this.newOrder.billing_address)
            .then((response) => {
                console.log(response.newOrder);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
/*
        return new Promise(resolve => {
            this.api.http.post( `$/wp-json/wc/v3/orders/?consumer_key=$this.api.}&consumer_secret=${this.api.consumerSecret}`,
                                this.newOrder,
                                { 'Content-Type': 'application/x-www-form-urlencoded' })
        });
*/
    }
  
    back(){
        this.modalCtrl.dismiss();
    }

}

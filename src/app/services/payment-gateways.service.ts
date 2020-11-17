import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentGatewaysService {

  url = 'https://www.palengke24x7.com/';
  consumerKey = 'ck_0ecf3e9078e50ff7043cbb49423ed45269bcaad3';
  consumerSecret = 'cs_d80111293fa10ab07635464f3dbc9a4041220caf';
  paymentGateway = ["paypal","rits_paymaya"];

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
  
  constructor(private http: HttpClient) { }


  getPaymentGateways(){

    return this.http.get(`${this.url}wp-json/wc/v3/payment_gateways?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )

  }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductAPIService {

  url = 'https://www.karinderya24x7.com/';
  consumerKey = 'ck_77300cf86ff3c9aa0c3f1d5729eb1c9a9af8d639';
    consumerSecret = 'cs_2eb6e739b6c640d4495d7267a39728f8209086e0';

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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }


  getProductCategories(){
    return this.http.get(`${this.url}wp-json/wc/v3/products/categories?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

  getUlamProducts(){
    return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&category=75&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

  getMeryendaProducts(){
    return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&category=76&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

  getDrinksProducts(){
    return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&category=73&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

  getBreakfastProducts(){
    return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&category=74&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

  getPanghimagasProducts(){
    return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&category=100&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

   getGulayProducts() {
        return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
            this.consumerKey
            }&consumer_secret=${this.consumerSecret}&category=100&hide_empty=true`)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

  getOtherProducts(){
    return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&category=105&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )
  }

  getSingleProduct(id){

    return this.http.get(`${this.url}wp-json/wc/v3/products/` + id + `?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )

  }

  getAllProductsByCategories(id){

    return this.http.get(`${this.url}wp-json/wc/v3/products?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&category=` + id + `&hide_empty=true`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )

  }

  getProductReviewById(id){

    return this.http.get(`${this.url}wp-json/wc/v3/products/reviews?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&product=` + id + ``)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )

  }

  getEmailAddress(email){

    return this.http.get(`${this.url}wp-json/wc/v3/customers?consumer_key=${
      this.consumerKey
    }&consumer_secret=${this.consumerSecret}&email=` + email + ``)
      .pipe(
        retry(2),
        catchError(this.handleError)
    )

  }
}

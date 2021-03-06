import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SignUpService {

  url = 'https://www.palengke24x7.com/';
  consumerKey = 'ck_224659887db29e0a8f174760705289589aa6ca29';
  consumerSecret = 'cs_17fbd677bb7377b60ccdc0fe03d32401abfa8866';

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

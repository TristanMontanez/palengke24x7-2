import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { SignUpService } from '../../services/signup.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  newUser: any = {};
  items: any;
  options: any = {};




  constructor(public modalCtrl: ModalController, private signUpService: SignUpService, private toastCtrl: ToastController, private http: HttpClient) { }

  ngOnInit() {
  }
  
  back(){
    this.modalCtrl.dismiss();
  }

  async checkEmail(){
    
    let validEmail = false;
    let reg  = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (reg.test(this.newUser.email)){
      this.signUpService.getEmailAddress
       (this.newUser.email).subscribe(async (response) => {
          this.items = JSON.stringify(response);
          let res = JSON.parse(this.items);

          if(res.length > 0){
            validEmail = true;
          }else{
            validEmail = false;
          }
      });
    }else{
      validEmail = false;
      (await this.toastCtrl.create({
          message : "Invalid Email. Please Check!",
          duration: 3000,
          position: 'top',
      })).present();
    }
  }

  signUp(){

     var params = {
       username: this.newUser.username,
       email: this.newUser.email,
       password: this.newUser.password,

     }

    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.options.withCredentials = true;
    this.options.headers = headers;

      this.http.post(`${this.signUpService.url}wp-json/wc/v3/customers?consumer_key=${
        this.signUpService.consumerKey
      }&consumer_secret=${this.signUpService.consumerSecret}`, params, {headers: this.options})
      .subscribe(async data => {
        this.items = JSON.stringify(data);
        let res = JSON.parse(this.items);

        if(res.id){
          (await this.toastCtrl.create({
            message : "Successfully account created! Please login to proceed.",
            duration: 3000,
            position: 'top',
          })).present();
          
          this.modalCtrl.dismiss();
        }

       }, error => {
        console.log(error);
      });
  }
}

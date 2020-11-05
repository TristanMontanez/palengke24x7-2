import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {SignupPage} from '../../pages/signup/signup.page';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async signUp(){

      const modal = await this.modalCtrl.create({
        component: SignupPage,
      });
      return modal.present();
  
  }


}

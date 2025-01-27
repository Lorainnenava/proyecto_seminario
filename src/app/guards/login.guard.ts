import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class loginGuard implements CanActivate {
  constructor(private storage: Storage, private navCtrl: NavController) {}

  async canActivate() {
    const isUserLogged = await this.storage.get('isUserLoggedIn');
    if (isUserLogged) {
      return true;
    } else {
      this.navCtrl.navigateRoot('/login');
      return false;
    }
  }
}

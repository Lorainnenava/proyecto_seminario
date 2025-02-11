import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) {}

  ngOnInit() {}

  closeMenu() {
    this.menu.close();
  }

  goToHome() {
    this.navCtrl.navigateForward('menu/home');
  }

  goToAccount() {
    this.navCtrl.navigateForward('menu/account');
  }

  goToSearchUser() {
    this.navCtrl.navigateForward('menu/search-users');
  }

  log_out() {
    this.storage.remove('isUserLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }
}

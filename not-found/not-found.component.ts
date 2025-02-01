import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  standalone: false,
})
export class NotFoundComponent implements OnInit {
  constructor(private nav: NavController, private storage: Storage) {}

  ngOnInit() {}

  async backPage() {
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn');
    if (isUserLoggedIn) {
      this.nav.navigateForward('/menu/home');
    } else {
      this.nav.navigateRoot('/login');
    }
  }
}

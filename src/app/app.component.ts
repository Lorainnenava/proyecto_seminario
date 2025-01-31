import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
  }

  shouldShowTabs(): boolean {
    const hiddenRoutes = [, '/intro', '/login', '/register'];
    return !hiddenRoutes.includes(this.router.url);
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Storage } from '@ionic/storage-angular';
import { UserService } from '../service/user/user.service';
import { UpdateUserPage } from '../update-user/update-user.page';

defineCustomElements(window);
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
  public state = {
    errorMessage: '',
    isError: false,
    isLoading: false,
  };

  user_data: any = {
    name: '',
    email: '',
    image: '',
    username: '',
    followees: [],
    followers: [],
  };

  constructor(
    private storage: Storage,
    private userService: UserService,
    public alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.getUser();
    this.userService.userGot.subscribe((newPost: any) => {
      if (newPost.user.last_name) {
        this.user_data.last_name = newPost.user.last_name;
      }
      if (newPost.user.name) {
        this.user_data.name = newPost.user.name;
      }
      if (newPost.user.image) {
        this.user_data.image = newPost.user.image;
      }
    });
  }

  async getUser() {
    this.state.isLoading = true;
    let user: any = await this.storage.get('user');
    this.userService
      .getUser(user.id)
      .then((data: any) => {
        this.user_data = data;
        this.state.isLoading = false;
      })
      .catch((error) => {
        this.state.isLoading = false;
        this.state.isError = true;
        this.state.errorMessage = error;
      });
  }

  async editProfile() {
    const modal = await this.modalController.create({
      component: UpdateUserPage,
      componentProps: {},
    });
    return await modal.present();
  }
}

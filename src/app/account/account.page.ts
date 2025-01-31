import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Storage } from '@ionic/storage-angular';
import { PostService } from '../service/post/post.service';
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
  posts: any[] = [];
  page: number = 1;
  limit: number = 10;
  hasMore: boolean = true;

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
    private postService: PostService,
    public alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.getUser();
    this.loadPosts();
    this.userService.userGot.subscribe((data: any) => {
      this.user_data.unshift(data);
    });
  }

  async getUser() {
    let user: any = await this.storage.get('user');
    this.userService
      .getUser(user.id)
      .then((data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggleTextDisplay(postId: any) {
    this.posts.filter((post: any) => {
      if (post.id == postId) {
        post.showCompleteDescription = !post.showCompleteDescription;
      }
    });
  }

  async editProfile() {
    console.log('update profile');
    const modal = await this.modalController.create({
      component: UpdateUserPage,
      componentProps: {},
    });
    return await modal.present();
  }

  async loadPosts(event?: any) {
    console.log('Load Posts');
    let user: any = await this.storage.get('user');
    this.postService.getPosts(this.page, this.limit).then(
      (data: any) => {
        if (data.length > 0) {
          const filterData = data.filter((x: any) => x.user.id === user.id);
          this.posts = [...this.posts, ...filterData];
          this.page++;
        } else {
          this.hasMore = false;
        }
        if (event) {
          event.target.complete();
        }
      },
      (error) => {
        console.log(error);
        if (event) {
          event.target.complete();
        }
      }
    );
  }
}

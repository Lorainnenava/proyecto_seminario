import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.page.html',
  styleUrls: ['./search-user.page.scss'],
  standalone: false,
})
export class SearchUserPage implements OnInit {
  users: any[] = [];
  page: number = 1;
  current_user: any;
  limit: number = 10;
  query: string = '';
  hasHoreUsers: boolean = true;

  public state = {
    errorMessage: '',
    isError: false,
  };

  constructor(private userService: UserService, private storage: Storage) {}

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(event?: any) {
    this.current_user = await this.storage.get('user');
    const followingUsers = this.current_user.followees || [];
    this.userService
      .listUsers(this.page, this.limit, this.query)
      .then((data: any) => {
        if (data.users.length > 0) {
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUsers.some(
              (followedUser: any) => followedUser.id == user.id
            ),
          }));
          this.users = [...this.users, ...updateUsers];
          this.page++;
        } else {
          this.hasHoreUsers = false;
        }
        if (event) {
          event.target.complete();
        }
      })
      .catch((error) => {
        this.state.errorMessage = error;
        this.state.isError = true;
        setTimeout(() => {
          this.state.isError = false;
        }, 2000);
        event.target.complete();
      });
  }

  searchUsers(event?: any) {
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasHoreUsers = true;
    this.loadUsers();
  }

  follow(followee_id: any) {
    const user_id = this.current_user.id;
    this.userService
      .followUser(user_id, followee_id)
      .then((data: any) => {
        console.log(data);
        this.users = this.users.map((user: any) => {
          if (user.id == followee_id) {
            return {
              ...user,
              is_following: true,
            };
          }
          return user;
        });
      })
      .catch((error) => {
        this.state.errorMessage = error;
        this.state.isError = true;
        setTimeout(() => {
          this.state.isError = false;
        }, 2000);
      });
  }

  unfollow(followee_id: any) {
    const user_id = this.current_user.id;
    this.userService
      .unfollowUser(user_id, followee_id)
      .then((data: any) => {
        console.log(data);
        this.users = this.users.map((user: any) => {
          if (user.id == followee_id) {
            return {
              ...user,
              is_following: false,
            };
          }
          return user;
        });
      })
      .catch((error) => {
        this.state.errorMessage = error;
        this.state.isError = true;
        setTimeout(() => {
          this.state.isError = false;
        }, 2000);
      });
  }

  toggleFollow(user: any) {
    if (user.is_following) {
      this.unfollow(user.id);
    } else {
      this.follow(user.id);
    }
  }
}

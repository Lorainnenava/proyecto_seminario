import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  userGot: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  getUser(id: any) {
    return new Promise((accept, reject) => {
      this.http
        .get(`${this.urlServer}/current_user/${id}`, this.httpHeaders)
        .subscribe(
          (data: any) => {
            accept(data);
            this.userGot.emit(data);
          },
          (error) => {
            console.log(error, 'error');
            if (error.status == 500) {
              reject('Error Por favor intenta mas tarde');
            } else {
              reject('Error al obtener el usuario');
            }
          }
        );
    });
  }

  updateUser(user: any) {
    const user_params = {
      user: user,
    };
    return new Promise((accept, reject) => {
      this.http
        .post(
          `${this.urlServer}/update/${user.id}`,
          user_params,
          this.httpHeaders
        )
        .subscribe(
          (data: any) => {
            accept(data);
<<<<<<< HEAD
            this.userUpdated.emit(data);
=======
            this.userGot.emit(data);
>>>>>>> c4fa49e82fcdc067fb24b02e477f710427146cd7
          },
          (error) => {
            console.log(error, 'error');
            if (error.status == 500) {
              reject('Error Por favor intenta mas tarde');
            } else {
              reject('Error al actualizar el usuario');
            }
          }
        );
    });
  }

  listUsers(page: number, perPage: number, query: string = '') {
    return new Promise((accept, reject) => {
      this.http
        .get(
          `${this.urlServer}/list_users?page=${page}&per_page=${perPage}&query=${query}`
        ).subscribe(
          (data: any) => {
            accept(data);
            this.usersGot.emit(data);
          }
        ),
    })
  }

  followUser(user_id: any, followee_id: any) {
    const follow_params = {
      followee_id: followee_id,
    };
    return new Promise((accept, reject) => {
      this.http
        .post(
          `${this.urlServer}/follow/${user_id}`,
          follow_params,
          this.httpHeaders
        )
        .subscribe(
          (data: any) => {
            accept(data);
          },
          (error) => {
            console.log(error, 'error');
            if (error.status == 500) {
              reject('Error Por favor intenta mas tarde');
            } else {
              reject('Error al seguir al usuario');
            }
          }
        );
    });
  }

  unfollowUser(user_id: any, followee_id: any) {
    const follow_params = {
      followee_id: followee_id,
    };
    return new Promise((accept, reject) => {
      this.http
        .post(
          `${this.urlServer}/unfollow/${user_id}`,
          follow_params,
          this.httpHeaders
        )
        .subscribe(
          (data: any) => {
            accept(data);
          },
          (error) => {
            console.log(error, 'error');
            if (error.status == 500) {
              reject('Error Por favor intenta mas tarde');
            } else {
              reject('Error al dejar seguir al usuario');
            }
          }
        );
    });
  }
}

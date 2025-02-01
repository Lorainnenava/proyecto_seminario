import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  urlServer = 'http://51.79.26.171';
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  postCreated: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  getPosts(page: number, perPage: number) {
    return new Promise((accept, reject) => {
      this.http
        .get(
          `${this.urlServer}/posts?page=${page}&per_page=${perPage}`,
          this.httpHeaders
        )
        .subscribe(
          (data: any) => {
            accept(data);
          },
          (error) => {
            if (error.status == 500) {
              reject('Error Por favor intenta mas tarde');
            } else {
              reject('Error al obtener los Posts');
            }
          }
        );
    });
  }

  createPost(post_data: any) {
    return new Promise((accept, reject) => {
      this.http
        .post(`${this.urlServer}/posts`, post_data, this.httpHeaders)
        .subscribe(
          (data: any) => {
            accept(data);
            this.postCreated.emit(data);
          },
          (error) => {
            if (error.status == 500) {
              reject('Error Por favor intenta mas tarde');
            } else {
              reject('Error al crear el Post');
            }
          }
        );
    });
  }
}

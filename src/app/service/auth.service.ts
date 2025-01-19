import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  loginUser(credentials: any) {
    console.log(`Estas son mis credenciales: ${credentials}`);
    return new Promise((resolve, reject) => {
      if (credentials.email === 'lorainne@gmail.com') {
        resolve('Login correcto');
      } else {
        reject('Login incorrecto');
      }
    });
  }
}

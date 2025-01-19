import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  ErrorMessage: any;

  emailErrors = {
    email: [
      {
        type: 'required',
        message: 'Correo requerido',
      },
      {
        type: 'email',
        message: 'Correo invalido',
      },
    ],
  };
  passwordErrors = {
    password: [
      {
        type: 'required',
        message: 'Contraseña requerida',
      },
      {
        type: 'minLength',
        message: 'La contraseña debe tener mínimo 6 caracteres',
      },
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private nav: NavController,
    private storage: Storage
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
    });
  }

  ngOnInit() {}

  onSubmit(credentials: any) {
    this.authService
      .loginUser(credentials)
      .then((res) => {
        console.log(res);
        this.storage.set('isUserLoggedIn', true);
        this.nav.navigateForward('/home');
        this.ErrorMessage = '';
      })
      .catch((err) => {
        console.log(err);
        this.ErrorMessage = err;
      });
  }
}

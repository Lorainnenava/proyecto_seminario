import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ErrorMessageService } from 'src/utils/service/error-message.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private nav: NavController,
    private storage: Storage,
    private errorMessageService: ErrorMessageService
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

  getFirstErrorMessage(controlName: string): string {
    return this.errorMessageService.getFirstErrorMessage(
      this.loginForm,
      controlName
    );
  }

  onSubmit(credentials: any) {
    this.authService
      .login(credentials)
      .then((res) => {
        console.log(res);
        this.storage.set('isUserLoggedIn', true);
        this.nav.navigateForward('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

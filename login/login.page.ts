import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { ErrorMessageService } from 'src/utils/service/errorMessage/error-message.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  public state = {
    isLoading: false,
    errorMessage: '',
    isError: false,
  };

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
        Validators.compose([Validators.required, Validators.minLength(6)])
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
    this.state.isLoading = true;
    this.authService
      .login(credentials)
      .then((res: any) => {
        this.storage.set('user', res.user);
        this.storage.set('isUserLoggedIn', true);
        this.nav.navigateRoot('/menu/home');
      })
      .catch((err) => {
        this.state.errorMessage = err;
        this.state.isError = true;
        this.state.isLoading = false;
        setTimeout(() => {
          this.state.isError = false;
        }, 2000);
      });
  }
}

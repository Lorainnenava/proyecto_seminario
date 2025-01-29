import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ErrorMessageService } from 'src/utils/service/errorMessage/error-message.service';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  public state = {
    disabled: false,
    isLoading: false,
  };

  constructor(
    private form: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private errorMessageService: ErrorMessageService
  ) {
    this.registerForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  ngOnInit() {}

  getFirstErrorMessage(controlName: string): string {
    return this.errorMessageService.getFirstErrorMessage(
      this.registerForm,
      controlName
    );
  }

  registerUser(registerData: any) {
    this.state.disabled = true;
    this.state.isLoading = true;
    this.authService
      .register(registerData)
      .then((res) => {
        console.log(res);
        this.navCtrl.navigateForward('/login');
      })
      .catch((err) => {
        this.state.disabled = false;
        this.state.isLoading = false;
        console.log(err);
      });
  }
}

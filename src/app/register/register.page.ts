import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessageService } from 'src/utils/service/error-message.service';
import { AuthService } from '../service/auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private form: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
    private errorMessageService: ErrorMessageService
  ) {
    this.registerForm = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      passwordConfirmation: [
        '',
        [Validators.required, Validators.minLength(4)],
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
    this.authService
      .register(registerData)
      .then((res) => {
        console.log(res);
        this.navCtrl.navigateForward('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user/user.service';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { ErrorMessageService } from 'src/utils/service/errorMessage/error-message.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

defineCustomElements(window);
@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.page.html',
  styleUrls: ['./update-user.page.scss'],
  standalone: false,
})
export class UpdateUserPage implements OnInit {
  updateForm: FormGroup;

  user_data: any = {
    name: '',
    email: '',
    image: '',
    last_name: '',
    followees: [],
    followers: [],
  };

  public state = {
    isLoading: false,
    errorMessage: '',
    isError: false,
  };

  constructor(
    private storage: Storage,
    private form: FormBuilder,
    private navCtrl: NavController,
    private userService: UserService,
    public alertController: AlertController,
    public modalController: ModalController,
    private errorMessageService: ErrorMessageService
  ) {
    this.updateForm = this.form.group({
      image: [this.user_data.image ?? 'assets/images/avatar.png'],
      name: [this.user_data.name ?? '', [Validators.required]],
      last_name: [this.user_data.last_name ?? '', [Validators.required]],
    });
  }

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    this.userService
      .getUser(user.id)
      .then((data: any) => {
        this.storage.set('user', data);
        this.user_data = data;

        this.updateForm.patchValue({
          image: data.image ?? 'assets/images/avatar.png',
          name: data.name ?? '',
          last_name: data.last_name ?? '',
        });
      })
      .catch((error) => {
        this.state.errorMessage = error;
        this.state.isError = true;
        this.state.isLoading = false;
        setTimeout(() => {
          this.state.isError = false;
        }, 2000);
      });
  }

  cancel() {
    this.modalController.dismiss();
  }

  getFirstErrorMessage(controlName: string): string {
    return this.errorMessageService.getFirstErrorMessage(
      this.updateForm,
      controlName
    );
  }

  async update() {
    let user: any = await this.storage.get('user');
    this.state.isLoading = true;
    // Valores del formulario
    const formValues = this.updateForm.value;
    const data = {
      id: user.id,
      name: formValues.name,
      last_name: formValues.last_name,
      image: this.user_data.image,
    };
    this.userService
      .updateUser(data)
      .then((res: any) => {
        this.storage.set('user', res.user);
        this.navCtrl.navigateRoot('/menu/account');
        this.modalController.dismiss();
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

  async takePhoto(source: CameraSource) {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100,
    });
    this.user_data.image = capturedPhoto.dataUrl;
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: 'Seleccione una opción',
      message: '¿De dónde desea obtener la imagen?',
      buttons: [
        {
          text: 'Cámara',
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          },
        },
        {
          text: 'Galería',
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          },
        },
      ],
    });
    await alert.present();
  }
}

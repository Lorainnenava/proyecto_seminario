import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Storage } from '@ionic/storage-angular';
import { ErrorMessageService } from 'src/utils/service/errorMessage/error-message.service';
import { PostService } from '../service/post/post.service';

defineCustomElements(window);
@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone: false,
})
export class AddPostModalPage implements OnInit {
  post_image: any;
  addPostForm: FormGroup;

  public state = {
    isLoading: false,
    errorMessage: '',
    isError: false,
  };

  constructor(
    private storage: Storage,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private modalController: ModalController,
    private errorMessageService: ErrorMessageService
  ) {
    this.addPostForm = this.formBuilder.group({
      description: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      image: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  ngOnInit() {}

  getFirstErrorMessage(controlName: string): string {
    return this.errorMessageService.getFirstErrorMessage(
      this.addPostForm,
      controlName
    );
  }

  cancel() {
    this.modalController.dismiss();
  }

  async uploadPhone() {
    const uploadPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos,
      quality: 100,
    });
    this.post_image = uploadPhoto.dataUrl;
    this.addPostForm.patchValue({
      image: this.post_image,
    });
  }

  async addPost(post_data: any) {
    this.state.isLoading = true;
    const user = await this.storage.get('user');
    const post_param = {
      post: {
        description: post_data.description,
        image: post_data.image,
        user_id: user.id,
      },
    };
    this.postService.createPost(post_param).then(
      (data: any) => {
        data.user = {
          id: user.id,
          name: user.name,
          image: user.image || 'assets/images/avatar.png',
        };
        this.postService.postCreated.emit(data);
        this.addPostForm.reset();
        this.post_image = null;
        this.modalController.dismiss();
      },
      (error) => {
        this.state.errorMessage = error;
        this.state.isError = true;
        this.state.isLoading = false;
        setTimeout(() => {
          this.state.isError = false;
        }, 2000);
      }
    );
  }
}

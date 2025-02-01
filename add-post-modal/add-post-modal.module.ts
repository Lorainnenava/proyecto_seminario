import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPostModalPageRoutingModule } from './add-post-modal-routing.module';

import { AddPostModalPage } from './add-post-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddPostModalPageRoutingModule,
  ],
  declarations: [AddPostModalPage],
})
export class AddPostModalPageModule {}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserPageRoutingModule } from './update-user-routing.module';

import { UpdateUserPage } from './update-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UpdateUserPageRoutingModule,
  ],
  declarations: [UpdateUserPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UpdateUserPageModule {}

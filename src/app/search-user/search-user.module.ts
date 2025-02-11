import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchUserPageRoutingModule } from './search-user-routing.module';
import { SearchUserPage } from './search-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchUserPageRoutingModule,
  ],
  declarations: [SearchUserPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchUserPageModule {}

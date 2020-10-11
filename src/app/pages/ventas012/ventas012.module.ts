import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas012PageRoutingModule } from './ventas012-routing.module';

import { Ventas012Page } from './ventas012.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas012PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas012Page]
})
export class Ventas012PageModule {}

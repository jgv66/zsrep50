import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas02PageRoutingModule } from './ventas02-routing.module';

import { Ventas02Page } from './ventas02.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas02PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas02Page]
})
export class Ventas02PageModule {}

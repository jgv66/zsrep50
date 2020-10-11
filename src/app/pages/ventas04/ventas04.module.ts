import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas04PageRoutingModule } from './ventas04-routing.module';

import { Ventas04Page } from './ventas04.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas04PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas04Page]
})
export class Ventas04PageModule {}

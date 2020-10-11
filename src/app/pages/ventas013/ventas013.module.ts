import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas013PageRoutingModule } from './ventas013-routing.module';

import { Ventas013Page } from './ventas013.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas013PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas013Page]
})
export class Ventas013PageModule {}

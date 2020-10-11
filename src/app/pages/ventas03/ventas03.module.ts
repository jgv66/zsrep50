import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas03PageRoutingModule } from './ventas03-routing.module';

import { Ventas03Page } from './ventas03.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas03PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas03Page]
})
export class Ventas03PageModule {}

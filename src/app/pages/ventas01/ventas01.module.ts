import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas01PageRoutingModule } from './ventas01-routing.module';

import { Ventas01Page } from './ventas01.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas01PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas01Page]
})
export class Ventas01PageModule {}

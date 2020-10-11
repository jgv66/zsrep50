import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas011PageRoutingModule } from './ventas011-routing.module';

import { Ventas011Page } from './ventas011.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas011PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas011Page]
})
export class Ventas011PageModule {}

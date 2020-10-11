import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ventas014PageRoutingModule } from './ventas014-routing.module';

import { Ventas014Page } from './ventas014.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ventas014PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Ventas014Page]
})
export class Ventas014PageModule {}

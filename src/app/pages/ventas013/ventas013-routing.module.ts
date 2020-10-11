import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas013Page } from './ventas013.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas013Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas013PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas03Page } from './ventas03.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas03Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas03PageRoutingModule {}

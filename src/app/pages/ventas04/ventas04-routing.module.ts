import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas04Page } from './ventas04.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas04Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas04PageRoutingModule {}

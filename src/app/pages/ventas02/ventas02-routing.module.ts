import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas02Page } from './ventas02.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas02PageRoutingModule {}

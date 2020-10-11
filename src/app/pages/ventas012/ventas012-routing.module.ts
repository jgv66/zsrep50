import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas012Page } from './ventas012.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas012Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas012PageRoutingModule {}

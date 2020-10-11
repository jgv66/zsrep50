import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas01Page } from './ventas01.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas01Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas01PageRoutingModule {}

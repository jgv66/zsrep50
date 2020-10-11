import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas014Page } from './ventas014.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas014Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas014PageRoutingModule {}

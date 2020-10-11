import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ventas011Page } from './ventas011.page';

const routes: Routes = [
  {
    path: '',
    component: Ventas011Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ventas011PageRoutingModule {}

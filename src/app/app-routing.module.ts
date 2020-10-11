import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '',          redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',      loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)                },
  { path: 'login',     loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)             },
  { path: 'logout',    loadChildren: () => import('./pages/logout/logout.module').then( m => m.LogoutPageModule )         },
  { path: 'ventas01',  loadChildren: () => import('./pages/ventas01/ventas01.module').then( m => m.Ventas01PageModule)    },
  { path: 'ventas02',  loadChildren: () => import('./pages/ventas02/ventas02.module').then( m => m.Ventas02PageModule)    },
  { path: 'ventas03',  loadChildren: () => import('./pages/ventas03/ventas03.module').then( m => m.Ventas03PageModule)    },
  { path: 'ventas04',  loadChildren: () => import('./pages/ventas04/ventas04.module').then( m => m.Ventas04PageModule)    },
  { path: 'ventas011', loadChildren: () => import('./pages/ventas011/ventas011.module').then( m => m.Ventas011PageModule) },
  { path: 'ventas012', loadChildren: () => import('./pages/ventas012/ventas012.module').then( m => m.Ventas012PageModule) },
  { path: 'ventas013', loadChildren: () => import('./pages/ventas013/ventas013.module').then( m => m.Ventas013PageModule) },
  { path: 'ventas014', loadChildren: () => import('./pages/ventas014/ventas014.module').then( m => m.Ventas014PageModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

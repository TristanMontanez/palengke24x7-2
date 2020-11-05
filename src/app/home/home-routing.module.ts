import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path:'home',
        children:[
          {
            path: '',
            loadChildren: () => import('../tabs/home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path:'products',
        children:[
          {
            path: '',
            loadChildren: () => import('../tabs/products/products.module').then( m => m.ProductsPageModule)
          }
        ]
      },
      {
        path:'cart',
        children:[
          {
            path: '',
            loadChildren: () => import('../tabs/cart/cart.module').then( m => m.CartPageModule)
          }
        ]
      },
      {
        path:'account',
        children:[
          {
            path: '',
            loadChildren: () => import('../tabs/account/account.module').then( m => m.AccountPageModule)
          }
        ]
      },{
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
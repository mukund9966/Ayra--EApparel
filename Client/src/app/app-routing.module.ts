import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop/shop.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'shop', component:ShopComponent},
  {path:'shop/:id', component:ProductDetailsComponent},
  // using lazy
  {path:'cart', loadChildren: () => import('./cart/cart.module').then(mod => mod.CartModule)},
  // {path:'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule)},
  {path:'**', redirectTo:'', pathMatch:'full'},

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }

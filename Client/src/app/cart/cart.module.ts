import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { RouterModule } from '@angular/router';
import { CartRoutingModule } from './cart-routing.module';


@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    CartRoutingModule
  ],
  exports: [
    
  ]
})
export class CartModule { }

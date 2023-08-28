import { Component } from '@angular/core';
import { BasketService } from './basket.service';
import { Product } from '../shared/model/product';
import { BasketItem } from '../shared/model/basket';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent {

  constructor(public basketService: BasketService) {}
  
  incrementItemQuantity(item: BasketItem) {
    this.basketService.incrementItemQuantity(item);
  }


  removeItem(id: number, quantity: number) {
    this.basketService.removeItemFromBasket(id, quantity);
  }

 

}
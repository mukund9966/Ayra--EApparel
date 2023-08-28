import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/model/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {


  constructor(public basketService: BasketService) { 

  }

  getCount(items: BasketItem[]) {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }
}

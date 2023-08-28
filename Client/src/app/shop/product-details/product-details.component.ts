import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/model/product';
import { BasketService } from 'src/app/basket/basket.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product?: any ;
  quantity = 1;
  quantityInCart : number = 0;



  constructor(private shopService: ShopService, private ActivatedRoute: ActivatedRoute, private basketService: BasketService) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct() {
    const id = this.ActivatedRoute.snapshot.paramMap.get('id');
    
   if (id) this.shopService.getProduct(+id).subscribe({
    next: product=> {
      this.product = product,
      this.basketService.basket$.pipe(take(1)).subscribe({
        next: basket => {
          const item = basket?.items.find(i => i.id === +id);
         if(item){
            this.quantity = item.quantity;
            this.quantityInCart = item.quantity;

         }
        }
      })
    
        
      },
      
    
    error: error => console.log(error)
   } 
   )
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  updateBasket() {
    if(this.product){
      if(this.quantity>this.quantityInCart){
const itemsToAdd = this.quantity-this.quantityInCart;
this.quantityInCart += itemsToAdd;
this.basketService.addItemToBasket(this.product, itemsToAdd);
    }
  }
  else{
    const itemsToRemove = this.quantityInCart - this.quantity;
    this.quantityInCart -= itemsToRemove;
    this.basketService.removeItemFromBasket(this.product);
  }

}

get buttonText() {
  return this.product ? 'Add to Basket' : 'Remove from Basket';
}

}
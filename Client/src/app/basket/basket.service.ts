import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket, BasketItem, IBasketTotals } from '../shared/model/basket';
import { Product } from '../shared/model/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = 'http://localhost:5001/api/';

  // baseUrl = 'enviroment.apiUrl'
  private basketSource = new BehaviorSubject<Basket | null>(null);
  basket$ = this.basketSource.asObservable();
  
  private basketTotalSource = new BehaviorSubject<IBasketTotals | null>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http:HttpClient) { }

  getBasket(id: string) {
    return this.http.get<Basket>(this.baseUrl + 'basket?id=' + id).subscribe({
      next: basket => {
        this.basketSource.next(basket);
         this.calculateTotals();
      }}
    );
  }

  setBasket(basket: Basket) {
    return this.http.post<Basket>(this.baseUrl + 'basket', basket).subscribe({
      next: basket=>{ this.basketSource.next(basket);
        this.calculateTotals();
      }
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: Product, quantity = 1) {
    const itemToAdd: BasketItem = this.mapProductItemToBasketItem(item);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  
  incrementItemQuantity(item: BasketItem) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const foundItemIndex = basket.items.findIndex(x => x.id === item.id);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }


  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }

  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
      }
    })
  }
  
  public addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    const item = items.find(i => i.id === itemToAdd.id);
   if(item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }
  


  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  // map Products with basket

   private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity:0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if(!basket) return;

      const shipping = 0;
      const subtotal = basket.items.reduce((a,b) => (b.price * b.quantity) + a, 0);
      const total = shipping + subtotal;
      this.basketTotalSource.next({shipping, total, subtotal});
    
  }

  calculateOrderSubtotal(basketItems: BasketItem[]): number {
    return basketItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  }
}

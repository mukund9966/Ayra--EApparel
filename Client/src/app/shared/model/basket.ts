import * as cuid from "cuid";

export interface BasketItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface Basket {
    id: string;
    items: BasketItem[];
}
    

export class Basket implements Basket{
    // to give a unique id to each cart
    id = cuid();  

    items: BasketItem[] = [];
}

export interface IBasketTotals {
    shipping: number;
    subtotal: number;
    total: number;
}

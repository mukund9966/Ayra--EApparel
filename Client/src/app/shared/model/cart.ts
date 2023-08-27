export interface ICart {
    id: number;
    name: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

export interface RootObject {
    id: string;
    items: ICart[];
}
    


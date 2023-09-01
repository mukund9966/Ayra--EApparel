import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/model/product';
import { ShopService } from './shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

@ViewChild('search') searchTerm?: ElementRef;
products: any[] = [];
brands: any[] = [];
types: any[] = [];
brandIdSelected: number = 0;
typeIdSelected: number = 0;
sortSelected = 'name';
sortOptions = [
  {name: 'Alphabetical', value: 'name'},
  {name: 'Price: Low to High', value: 'priceAsc'},
  {name: 'Price: High to Low', value: 'priceDesc'}
];
searchItem= '';
constructor(private shopService : ShopService) { 
 
}

ngOnInit(): void {
  this.getProducts();
  this.getBrands();
  this.getTypes();
}

getProducts() {
  this.shopService.getProducts(this.brandIdSelected, this.typeIdSelected, this.sortSelected, this.searchItem).subscribe((response:any) => {
    this.products = response;
    this.products.forEach((product: any) => {
      product.pictureUrl = 'http://localhost:5001/' + product.pictureUrl;
      console.log(product.pictureUrl);
    });
  }, error => {
    console.log(error);
  })
}

getBrands() {
  this.shopService.getBrands().subscribe((response:any) => {
    this.brands = [{id: 0, name: 'All'}, ...response];  //get all brands
  }, error => {
    console.log(error);
  })
}
getTypes() {
  this.shopService.getTypes().subscribe((response:any) => {
    this.types = [{id: 0, name: 'All'}, ...response];
  }, error => {
    console.log(error);
  })
}

onBrandSelected(brandId: number) {
  this.brandIdSelected = brandId;
  this.getProducts();
}

onTypeSelected(typeId: number) {
  this.typeIdSelected = typeId;
  this.getProducts();
}

onSortSelected(event: any) {
  this.sortSelected = event.target.value;
  this.getProducts();
}

onSearch() {
  this.searchItem = this.searchTerm?.nativeElement.value;
  this.getProducts();

}

onReset() {
 if(this.searchTerm) this.searchTerm.nativeElement.value = '';
  this.searchItem = '';
  this.brandIdSelected = 0;
  this.typeIdSelected = 0;
  this.sortSelected = 'name';
  this.getProducts();
}}
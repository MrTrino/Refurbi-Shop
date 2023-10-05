import { ProductsService } from './../../services/products.service';
import { Subscription } from 'rxjs';
import { IProducts } from './../../models/products';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  constructor(private ProductsService: ProductsService) { }

  // @TODO po co definite assignment assertion?
  basket!: IProducts[];
  basketSubscription!: Subscription;

  ngOnInit(): void {
    // @TODO uzyj async pipe zamiast jawnej subskrypcji
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  minusItemFromBasket(item: IProducts) {
    /* @TODO dla czytelnosci wydziel metode deleteProduct()
     * if (item.quantity > 1) {
     *   item.quantity -= 1;
     *   this.ProductsService.updateProductToBasket(item).subscribe()
     * } else {
     *  this.deleteProduct();
     * }
     */
    if (item.quantity === 1) {
      this.ProductsService.deleteProductFromBasket(item.id).subscribe(() => {
        let idx = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(idx, 1);
      });
    } else {
      item.quantity -= 1;
      this.ProductsService.updateProductToBasket(item).subscribe((data) => {
        // @TODO nieuzywany parametr
      });
    }

  }

  plusItemFromBasket(item: IProducts) {
    item.quantity += 1;
    this.ProductsService.updateProductToBasket(item).subscribe((data) => {
      // @TODO nieuzywany parametr
    });
  }

}

import { ProductsService } from './../../services/products.service';
import { IProducts } from './../../models/products';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(private ProductsService: ProductsService) { }
  products!: IProducts[];
  productsSubscription!: Subscription;

  basket!: IProducts[];
  basketSubscription!: Subscription;

  // @TODO mozna usunac oznaczenie typu - TS wywnioskuje boolean na podstawie wartosci "false"
  canEdit: boolean = false;
  canView: boolean = false;

  ngOnInit(): void {
    // @TODO tu nie rozumiem - domyslnie canEdit jest false, w ngOnInit zmienia się na true.
    // Po co taki zabieg?
    this.canEdit = true;

    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
    });

    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }
  addToBasket(product: IProducts) {
    // @TODO komponent ma ten sam kod, co product-details 
    // warto wyodrebnic wspolne czesci do zewnetrznego serwisu, z którego oba komponenty będą korzystać
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => { });
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
}
}

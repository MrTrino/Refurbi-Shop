import { Subscription } from 'rxjs';
import { IProducts } from './../../models/products';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './../../services/products.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  // @TODO po co definite assignment assertion?
  product!: IProducts;
  productSubscription!: Subscription;
    // @TODO formatowanie kodu
    constructor(private ProductsService: ProductsService, private route: ActivatedRoute) { }

    products!: IProducts[];
    productsSubscription!: Subscription;

    basket!: IProducts[];
    basketSubscription!: Subscription;

  ngOnInit(): void {
    // @TODO sprobuj async pipe zamioast jawnej subskrypcji
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });

    // @TODO sprobuj async pipe zamioast jawnej subskrypcji
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }
  addToBasket(product: IProducts) {
    product.quantity = 1;
    // @TODO nie ma potrzeby pozostawienia findItem bez inicjalizacji. Logika z if / else jest troche zawila:
    // const findItem = this.basket.find((item) => item.id === product.id);
    // if (findItem) {
    //   this.updateToBasket(findItem);
    // } else {
    //   this.postToBasket(product);
    // }
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

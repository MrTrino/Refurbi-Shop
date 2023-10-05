import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs'; // @TODO nieuzywane
import { IProducts } from './../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // @TODO niejednoznaczna nazwa 'url' - zmien na urlProducts (jak przy urlBasket)
  // najlepiej przy pomocy rename symbol (F2), podmieni kazde wystapienie
  url: string = 'http://localhost:3000/products'; 
  urlBasket: string = 'http://localhost:3000/basket';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProducts[]>(this.url);
  }

  getProduct(id: number) {
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  postProductToBasket(product: IProducts) {
    return this.http.post<IProducts>(this.urlBasket, product);
  }

  getProductFromBasket() {
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  updateProductToBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }


  deleteProductFromBasket(id: number) {
    // @TODO usuwasz produkt, wiec poprawne bedzie delete<IProducts>
    return this.http.delete<any>(`${this.urlBasket}/${id}`);
  }
}

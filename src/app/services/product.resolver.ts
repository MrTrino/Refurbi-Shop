import { ProductsService } from './products.service';
import { IProducts } from './../models/products';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, EMPTY, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// @TODO Class-based Route resolvers are deprecated in favor of functional resolvers.
// https://stackoverflow.com/questions/76168417/i-get-resolve-as-strikethrough-in-my-angular-15-generated-project-how-can-i-sol
// z klasy trzeba przerobic go na funkcje
export class ProductResolver implements Resolve<IProducts> {
  constructor(private ProductsService: ProductsService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProducts> {
    return this.ProductsService.getProduct(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['products']);
        return EMPTY;
      })
    );
  }
}

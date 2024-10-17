import { Injectable } from '@angular/core';
import { Product } from './models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [];
  private products$ = new BehaviorSubject<Product[]>(this.products);

  constructor() {}

  getProducts(): Observable<Product[]> {
    return this.products$.asObservable();
  }

  addProduct(product: Product): void {
    setTimeout(() => {
      this.products.push(product);
      this.products$.next(this.products);
    }, 1000);
  }

  updateProduct(product: Product): void {
    setTimeout(() => {
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = product;
        this.products$.next(this.products);
      }
    }, 1000);
  }

  deleteProduct(id: number): void {
    setTimeout(() => {
      this.products = this.products.filter(p => p.id !== id);
      this.products$.next(this.products);
    }, 1000);
  }
}

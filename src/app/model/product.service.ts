import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];

  getProducts(): Product[] {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      this.products = JSON.parse(storedProducts);
    }
    return this.products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
    this.updateLocalStorage();
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.title === updatedProduct.title);
    if (index !== -1) {
      this.products[index] = updatedProduct;
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('products', JSON.stringify(this.products));
  }
}
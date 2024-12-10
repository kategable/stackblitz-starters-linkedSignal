// product.service.ts
import { Injectable, signal, resource } from '@angular/core';
import { Product, Response } from './Product';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://dummyjson.com/products';

  // Signal to trigger the resource loader
  private trigger = signal<void>(undefined);

  // Resource to fetch products
  products = resource({
    // Reactive request computation
    request: () => this.trigger,
    // Async loader function
    loader: async () => {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data =  response.json() as Promise<Response>;
      return (await data).products;
    },
  });

  // Method to reload products
  reload() {
    this.trigger.set(undefined);
  }
}


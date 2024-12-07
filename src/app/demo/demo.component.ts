import { CommonModule } from '@angular/common';
import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-demo',
  imports: [CommonModule],
  template: `   <h2>Product Filter</h2>
  <div>
    <label>Filter by Category:</label>
    <select [value]="selectedCategory()" (change)="selectCategory($event)">
      <option value="all">All</option>
      <option *ngFor="let category of categories" [value]="category">
        {{ category }}
      </option>
    </select>
  </div>

  <div>
    <h3>Products</h3>
    <ul>
      <li *ngFor="let product of filteredProducts()">
        {{ product.name }} - {{ product.category }}
      </li>
    </ul>
  </div>`,
})
export class DemoComponent {

   // Static list of products
   products = signal([
    { name: 'Laptop', category: 'Electronics' },
    { name: 'Headphones', category: 'Electronics' },
    { name: 'Sofa', category: 'Furniture' },
    { name: 'Table', category: 'Furniture' },
    { name: 'T-shirt', category: 'Clothing' },
  ]);

  // Signal for selected category
  selectedCategory = signal<string>('all');

  // Derived signal for categories
  categories = Array.from(
    new Set(this.products().map(product => product.category))
  );

  // Linked signal for filtered products
  filteredProducts = linkedSignal(() => {
    const category = this.selectedCategory();
    const allProducts = this.products();
    if (category === 'all') {
      return allProducts; // Return all products if "all" is selected
    }
    return allProducts.filter(product => product.category === category); // Filter products by category
  });

  // Update the selected category
  selectCategory(e: any) {
    const category = e.target.value;
    this.selectedCategory.set(category);
  }
}

import { CommonModule } from "@angular/common";
import { Component, effect, linkedSignal, signal } from "@angular/core";
import { Product } from "../Product";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ['./product-list.component.css'],
 
  imports: [CommonModule],
})
export class ProductListComponent {
  productsResource = this.productService.products;
  products: Product[] = [];

  constructor(private productService: ProductService) {
    // Effect to react to changes in the resource's value
    effect(() => {
      if (this.productsResource.value()) {
        console.log("Products loaded:", this.productsResource.value());
      }
    });
  }
  selectedCategory = signal<string>("all");

  categories = linkedSignal(() => {
    if (!this.productsResource.value()) return [];
    return Array.from(
      new Set(
        this.productsResource
          .value()
          ?.map((product: Product) => product.category)
      )
    );
  });

  // Linked signal for filtered products
  filteredProducts = linkedSignal(() => {
    const category = this.selectedCategory();
    if (category === "all") {
      return this.productsResource.value(); // Return all products if "all" is selected
    }
    return this.productsResource
      .value()
      ?.filter((product: Product) => product.category === category); // Filter products by category
  });

  // Update the selected category
  selectCategory(e: any) {
    const category = e.target.value;
    this.selectedCategory.set(category);
  }
  reload() {
    this.selectedCategory.set('all');
    this.productService.reload();
  }
}

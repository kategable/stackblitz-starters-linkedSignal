import { Routes } from "@angular/router";
import { ProductListComponent } from "./demo-r/product-list.component";
import { DemoComponent } from "./demo/demo.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "demo", component: DemoComponent },
  { path: "demo-r", component: ProductListComponent },
];

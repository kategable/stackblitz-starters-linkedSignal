import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-root",
  template: `
    <div class="nav-buttons">
      <button routerLink="/home" routerLinkActive="active-route">Home</button>
      <button routerLink="/demo" routerLinkActive="active-route">
        Demo LinkedSignal
      </button>
      <button routerLink="/demo-r" routerLinkActive="active-route">
        Demo Resource
      </button>
    </div>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class AppComponent {}

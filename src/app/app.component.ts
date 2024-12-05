import { Component } from '@angular/core';
import { DemoComponent } from './demo/demo.component';

@Component({
  selector: 'app-root',
  template: `
     <app-demo>Loading demo...</app-demo>`,
  imports: [DemoComponent],
  standalone: true,
})
export class AppComponent {}

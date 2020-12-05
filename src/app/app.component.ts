import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div [ngClass] = "style">

    <app-header></app-header>

    <router-outlet></router-outlet>

  </div>
  `
})
export class AppComponent {
    style = 'mat-indigo';
}

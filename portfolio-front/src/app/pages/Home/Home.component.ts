import { Component } from '@angular/core';
import { PageComponent } from '@components/Page/Page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './Home.component.html',
})
export class HomeComponent {}

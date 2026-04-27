import { Component } from '@angular/core';
import { HeaderComponent } from '@components/Header/Header.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './Page.component.html',
})
export class PageComponent {}

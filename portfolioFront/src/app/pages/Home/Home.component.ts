import { Component } from '@angular/core';
import { PageComponent } from '@components/Page/Page.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PageComponent],
  templateUrl: './Home.component.html',
})
export class HomeComponent {
  readonly welcomeText = 'Olá, meu nome é ';
  readonly name = 'Icaro Justino.';
  profileImageUrl = 'assets/profile.jpg';
  readonly description =
    'Fullstack developer, inspirado em explorar todos os campos do desenvolvimento para se tornar um solido arquiteto de software entendendo os problemas e quais são as melhores soluções.';
}

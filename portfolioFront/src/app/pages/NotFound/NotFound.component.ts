import { Component, computed,inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageComponent } from '@components/Page/Page.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, PageComponent],
  templateUrl: './NotFound.component.html',
})
export class NotFoundComponent {
  languageService = inject(LanguageService);
  
  notFoundTexts = computed(() => this.languageService.t().notFound);

}

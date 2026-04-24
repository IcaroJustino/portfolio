import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavigationHistoryService } from '@services/NavigationHistory.service';
import { PageComponent } from '@components/Page/Page.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, PageComponent],
  templateUrl: './NotFound.component.html',
})
export class NotFoundComponent {
  constructor(
    private readonly router: Router,
    @Inject(NavigationHistoryService) private readonly history: NavigationHistoryService,
  ) {}

  goBack(): void {
    const target = this.history.getLastUrl();
    if (!target || target.startsWith('/not-found')) {
      this.router.navigateByUrl('/');
      return;
    }

    this.router.navigateByUrl(target);
  }
}

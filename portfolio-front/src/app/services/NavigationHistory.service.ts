import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  private lastUrl = '/';
  private currentUrl = '/';

  constructor(private readonly router: Router) {
    this.currentUrl = this.router.url || '/';

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const nextUrl = event.urlAfterRedirects || event.url;
        if (!this.isTrackable(nextUrl)) {
          return;
        }

        this.lastUrl = this.currentUrl;
        this.currentUrl = nextUrl;
      });
  }

  getLastUrl(): string {
    return this.lastUrl;
  }

  private isTrackable(url: string): boolean {
    return !url.startsWith('/not-found');
  }
}

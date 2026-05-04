import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit, Renderer2, inject, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageService } from '../../services/language.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Header.component.html',
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isDarkMode = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light') {
        this.isDarkMode = false;
        this.renderer.addClass(this.document.documentElement, 'light');
      } else {
        this.isDarkMode = true;
        this.renderer.removeClass(this.document.documentElement, 'light');
      }
    }
  }

  languageService = inject(LanguageService);

  // Compute navItems dynamically based on current language
  navItems = computed(() => {
    const t = this.languageService.t().header;
    return [
      { label: t.about || 'About', href: '#about' },
      { label: t.experience || 'Experience', href: '#experience' },
      { label: t.skills || 'Skills', href: '#skills' },
      { label: t.projects || 'Projects', href: '#projects' },
      { label: t.resume || 'Resume', href: '#resume' },
      { label: t.contact || 'Contact', href: '#contact' },
    ];
  });

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (isPlatformBrowser(this.platformId)) {
      if (this.isDarkMode) {
        this.renderer.removeClass(this.document.documentElement, 'light');
        localStorage.setItem('theme', 'dark');
      } else {
        this.renderer.addClass(this.document.documentElement, 'light');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  toggleLanguage(): void {
    const current = this.languageService.currentLang();
    this.languageService.setLanguage(current === 'eng-us' ? 'pt-br' : 'eng-us');
  }
}

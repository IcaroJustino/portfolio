import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Footer.component.html',
})
export class FooterComponent {
  languageService = inject(LanguageService);
  
  texts = computed(() => this.languageService.t().footer);
  navItems = computed(() => this.languageService.t().header);

  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { icon: 'github', url: 'https://github.com/IcaroJustino' },
    { icon: 'linkedin', url: 'https://linkedin.com' },
    { icon: 'twitter', url: 'https://twitter.com' },
    { icon: 'mail', url: 'mailto:icaro.justino@gmail.com' }
  ];
}

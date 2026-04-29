import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Footer.component.html',
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  socialLinks = [
    { icon: 'github', url: 'https://github.com/IcaroJustino' },
    { icon: 'linkedin', url: 'https://linkedin.com' },
    { icon: 'twitter', url: 'https://twitter.com' },
    { icon: 'mail', url: 'mailto:icaro.justino@gmail.com' }
  ];
}

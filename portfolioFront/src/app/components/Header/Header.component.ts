import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Header.component.html',
})
export class HeaderComponent {
  isMenuOpen = false;

  readonly navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' },
  ];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleBodyScroll(this.isMenuOpen);
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(lock: boolean) {
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
}

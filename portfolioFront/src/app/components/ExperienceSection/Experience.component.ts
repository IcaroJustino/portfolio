import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Component, inject, computed, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { LanguageService } from '../../services/language.service';
type ExperienceSide = 'left' | 'right';

interface ExperienceItem {
  badge: string;
  title: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  technologies: string[];
  achievements: string[];
  icon: 'graduation-cap' | 'code' | 'chevron-right' | 'rocket' | 'building-2';
}

interface ExperienceWithSide extends ExperienceItem {
  side: ExperienceSide;
  colorClass: string;
  iconClass: string;
}

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Experience.component.html',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  languageService = inject(LanguageService);

  @ViewChildren('experienceCard') cards!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  texts = computed(() => this.languageService.t().experience);

  experiences = computed<ExperienceWithSide[]>(() => {
    const exps = this.texts().experiences;
    return exps.map((experience: any, index: number) => {
      const borderColors = [
        'bg-gradient-to-r from-primary/80 to-primary',
        'bg-gradient-to-r from-success/80 to-success',
        'bg-gradient-to-r from-danger/80 to-danger',
        'bg-gradient-to-r from-secondary/80 to-secondary',
        'bg-gradient-to-r from-primary/80 to-primary',
        'bg-gradient-to-r from-warning/80 to-warning'
      ];
      const iconClasses = [
        'bg-bg-dark text-primary border-primary/50',
        'bg-bg-dark text-success border-success/50',
        'bg-bg-dark text-danger border-danger/50',
        'bg-bg-dark text-secondary border-secondary/50',
        'bg-bg-dark text-primary border-primary/50',
        'bg-bg-dark text-warning border-warning/50'
      ];
      return {
        ...experience,
        icon: this.getIconForIndex(index),
        side: index % 2 === 0 ? 'left' : 'right',
        colorClass: borderColors[index % borderColors.length],
        iconClass: iconClasses[index % iconClasses.length]
      };
    });
  });

  ngAfterViewInit() {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0', 'translate-x-12');
            entry.target.classList.add('opacity-100', 'translate-x-0');
            this.observer?.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      // Observe cards initially
      this.cards.forEach(card => {
        this.observer?.observe(card.nativeElement);
      });

      // Handle changes if the list of cards is updated dynamically
      this.cards.changes.subscribe((cards: QueryList<ElementRef>) => {
        cards.forEach(card => {
          this.observer?.observe(card.nativeElement);
        });
      });
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private getIconForIndex(index: number): 'graduation-cap' | 'code' | 'chevron-right' | 'rocket' | 'building-2' {
    const icons: ('graduation-cap' | 'code' | 'chevron-right' | 'rocket' | 'building-2')[] = [
      'rocket',         // Motorola
      'graduation-cap', // UFPE
      'code',           // Logap
      'graduation-cap', // IFRN
      'building-2',     // CAERN
      'chevron-right'   // P2b
    ];
    return icons[index % icons.length];
  }
}

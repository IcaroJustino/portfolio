import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, inject, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Aboutme.component.html',
})
export class AboutMeComponent implements OnInit, OnDestroy {
  languageService = inject(LanguageService);

  texts = computed(() => this.languageService.t().about);

  titleCards: {
    targetValue: number;
    suffix: string;
    descriptionKey: 'projects' | 'energy' | 'years';
    icon: string;
    displayCount: string;
  }[] = [
    { targetValue: 5, suffix: '+', descriptionKey: 'projects', icon: 'medal', displayCount: '0+' },
    { targetValue: 500, suffix: '+', descriptionKey: 'energy', icon: 'briefcase', displayCount: '0+' },
    { targetValue: 3, suffix: '+', descriptionKey: 'years', icon: 'code', displayCount: '0+' },
  ];

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (typeof IntersectionObserver !== 'undefined') {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true;
              this.animateCounters();
            }
          });
        },
        { threshold: 0.3 }
      );

      // Observe after a tick so the DOM is ready
      setTimeout(() => {
        const statsSection = this.el.nativeElement.querySelector('#about');
        if (statsSection) {
          this.observer?.observe(statsSection);
        }
      });
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private animateCounters() {
    const duration = 1800; // ms
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);

    this.titleCards.forEach((card) => {
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        // Ease-out curve for a smooth deceleration
        const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
        const current = Math.round(progress * card.targetValue);
        card.displayCount = current + card.suffix;
        this.cdr.markForCheck();

        if (frame >= totalFrames) {
          card.displayCount = card.targetValue + card.suffix;
          this.cdr.markForCheck();
          clearInterval(counter);
        }
      }, duration / totalFrames);
    });
  }
}

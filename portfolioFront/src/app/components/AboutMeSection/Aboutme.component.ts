import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Aboutme.component.html',
})
export class AboutMeComponent implements OnInit, OnDestroy {
  readonly aboutmeText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  readonly myJourneyText =
    'My journey in the world of technology began with a passion for problem-solving and creativity. I started learning programming languages in high school, which sparked my interest in software development. Over the years, I have honed my skills through various projects and internships, gaining experience in both frontend and backend development. I am particularly drawn to building user-friendly applications that make a positive impact on peoples lives. My goal is to continue growing as a developer and contribute to innovative projects that push the boundaries of technology.';

  readonly myApproachText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  titleCards = [
    { targetValue: 20, suffix: '+', description: 'Projects Completed', icon: 'medal', displayCount: '0+' },
    { targetValue: 500, suffix: '+', description: 'Energy Drinks Downed', icon: 'briefcase', displayCount: '0+' },
    { targetValue: 5, suffix: '+', description: 'Years Coding', icon: 'code', displayCount: '0+' },
  ];

  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef
  ) {}

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

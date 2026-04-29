import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';

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
  icon: 'lab' | 'shield' | 'code' | 'spark';
}

interface ExperienceWithSide extends ExperienceItem {
  side: ExperienceSide;
}

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Experience.component.html',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  readonly title = 'Experience';
  readonly subtitle = 'My professional journey and key experiences';

  private readonly baseExperiences: ExperienceItem[] = [
    {
      badge: 'internship',
      title: 'Machine Learning Research Intern',
      company: 'UTSA Unmanned Systems Lab',
      location: 'San Antonio, TX',
      period: 'January 2024 - August 2024',
      summary:
        'Conducted reinforcement learning research to optimize autonomous agent navigation using MuJoCo physics environments and custom AI algorithms.',
      technologies: ['Python', 'MuJoCo', 'Matplotlib', 'NumPy', 'TensorBoard/TensorFlow'],
      achievements: [
        'Trained models across 4 different environments while running 50+ parallel experiments daily, leveraging Python, NumPy, and Matplotlib for data analysis.',
        'Collaborated with a team of 3 researchers to develop 5 novel algorithms in dynamic traffic simulations.',
      ],
      icon: 'lab',
    },
    {
      badge: 'internship',
      title: 'Cybersecurity Intern',
      company: 'UT RSOC',
      location: 'Austin, TX',
      period: 'April 2025 - Present',
      summary: 'Supported real-time security operations for the UT Austin network.',
      technologies: ['Linux CLI', 'Python', 'Bash', 'Network Protocols', 'Splunk'],
      achievements: [
        'Reduced incident triage time by 90% by automating log parsing scripts.',
        'Identified and escalated critical threats through Splunk searches and forensic analysis.',
      ],
      icon: 'shield',
    },
    {
      badge: 'project',
      title: 'Frontend Developer',
      company: 'Portfolio Platform',
      location: 'Remote',
      period: '2025 - Present',
      summary:
        'Designed and built responsive portfolio experiences with Angular, Tailwind CSS, and reusable UI sections.',
      technologies: ['Angular', 'Tailwind CSS', 'TypeScript', 'Responsive UI'],
      achievements: [
        'Built reusable sections for hero, about, and experience content.',
        'Focused on clean layout systems and mobile-first responsiveness.',
      ],
      icon: 'code',
    },
    {
      badge: 'project',
      title: 'Software Engineering Assistant',
      company: 'Independent Projects',
      location: 'Texas',
      period: '2023 - 2024',
      summary:
        'Developed small full-stack applications and APIs while strengthening software engineering fundamentals.',
      technologies: ['JavaScript', 'Node.js', 'APIs', 'Git'],
      achievements: [
        'Implemented small end-to-end features and improved UI consistency.',
        'Practiced structured problem solving across multiple personal projects.',
      ],
      icon: 'spark',
    },
  ];

  readonly experiences: ExperienceWithSide[] = this.baseExperiences.map((experience, index) => ({
    ...experience,
    side: index % 2 === 0 ? 'left' : 'right',
  }));

  @ViewChildren('experienceCard', { read: ElementRef })
  private readonly cards?: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;
  private lastScrollY = 0;

  scrollDirection: 'up' | 'down' = 'down';
  cardInView: boolean[] = this.experiences.map(() => false);

  constructor(private readonly zone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!this.cards) {
      return;
    }

    this.lastScrollY = window.scrollY;
    this.observer = new IntersectionObserver(
      (entries) => {
        this.zone.run(() => {
          entries.forEach((entry) => {
            const indexValue = (entry.target as HTMLElement).dataset['index'];
            if (indexValue === undefined) {
              return;
            }

            const index = Number(indexValue);
            if (Number.isNaN(index)) {
              return;
            }

            this.cardInView[index] = entry.isIntersecting;
          });
        });
      },
      {
        threshold: 0.2,
      },
    );

    this.cards.forEach((card) => {
      this.observer?.observe(card.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const currentY = window.scrollY;
    this.scrollDirection = currentY >= this.lastScrollY ? 'down' : 'up';
    this.lastScrollY = currentY;
  }

  getCardClass(index: number, side: ExperienceSide): string {
    const sideClass =
      side === 'left'
        ? 'lg:col-start-1 lg:justify-self-end'
        : 'lg:col-start-3 lg:justify-self-start';

    const hiddenClass = side === 'left' ? 'lg:-translate-x-12' : 'lg:translate-x-12';
    const isVisible = this.scrollDirection === 'down' && this.cardInView[index];
    const motionClass = isVisible
      ? 'lg:translate-x-0 lg:opacity-100'
      : `${hiddenClass} lg:opacity-0`;

    return `${sideClass} ${motionClass}`;
  }
}

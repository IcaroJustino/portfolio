import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Component, inject, computed } from '@angular/core';
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
  icon: 'lab' | 'shield' | 'code' | 'spark' | 'phone';
}

interface ExperienceWithSide extends ExperienceItem {
  side: ExperienceSide;
}

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Experience.component.html',
})
export class ExperienceComponent {
  languageService = inject(LanguageService);

  texts = computed(() => this.languageService.t().experience);

  experiences = computed<ExperienceWithSide[]>(() => {
    const exps = this.texts().experiences;
    return exps.map((experience: any, index: number) => ({
      ...experience,
      icon: this.getIconForIndex(index),
      side: index % 2 === 0 ? 'left' : 'right',
    }));
  });

  private getIconForIndex(index: number): 'lab' | 'shield' | 'code' | 'spark' | 'phone' {
    const icons: ('lab' | 'shield' | 'code' | 'spark' | 'phone')[] = ['shield', 'code', 'lab', 'code'];
    return icons[index % icons.length];
  }
}

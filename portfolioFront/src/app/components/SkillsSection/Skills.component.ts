import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { LucideAngularModule } from 'lucide-angular';

type SkillCategoryIcon = 'code' | 'database' | 'cpu' | 'brain' | 'wrench' | 'users';

interface SkillCategory {
  title: string;
  icon: SkillCategoryIcon;
  accentClass: string;
  items: string[];
}

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Skills.component.html',
})
export class SkillsComponent {
  languageService = inject(LanguageService);

  texts = computed(() => this.languageService.t().skills);

  categories = computed<SkillCategory[]>(() => {
    const cats = this.texts().categories;
    return [
      {
        title: cats[0].title,
        icon: 'code' as SkillCategoryIcon,
        accentClass: 'bg-gradient-to-br from-sky-500 to-blue-600',
        items: cats[0].items,
      },
      {
        title: cats[1].title,
        icon: 'cpu' as SkillCategoryIcon,
        accentClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
        items: cats[1].items,
      },
      {
        title: cats[2].title,
        icon: 'database' as SkillCategoryIcon,
        accentClass: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
        items: cats[2].items,
      },
      {
        title: cats[3].title,
        icon: 'wrench' as SkillCategoryIcon,
        accentClass: 'bg-gradient-to-br from-orange-500 to-amber-500',
        items: cats[3].items,
      },
      {
        title: cats[4].title,
        icon: 'brain' as SkillCategoryIcon,
        accentClass: 'bg-gradient-to-br from-pink-500 to-rose-500',
        items: cats[4].items,
      },
      {
        title: cats[5].title,
        icon: 'users' as SkillCategoryIcon,
        accentClass: 'bg-gradient-to-br from-rose-500 to-pink-600',
        items: cats[5].items,
      },
    ];
  });
}

import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageService } from '../../services/language.service';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
}

@Component({
  selector: 'app-projects-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Projects.component.html',
})
export class ProjectsComponent {
  languageService = inject(LanguageService);

  texts = computed(() => this.languageService.t().projects);

  projects = computed<Project[]>(() => {
    const list = this.texts().list;
    return list.map((p: any) => ({
      title: p.title,
      description: p.description,
      image: 'assets/mipscode.png', // Or dynamically if you have multiple images
      technologies: p.technologies,
      githubUrl: 'https://github.com/IcaroJustino/mipsfrontend',
      demoUrl: 'https://github.com/IcaroJustino/mipsfrontend'
    }));
  });
}

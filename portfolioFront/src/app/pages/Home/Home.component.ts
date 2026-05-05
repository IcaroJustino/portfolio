import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { PageComponent } from '@components/Page/Page.component';
import { AboutMeComponent } from '@components/AboutMeSection/Aboutme.component';
import { ExperienceComponent } from '@components/ExperienceSection/Experience.component';
import { LucideAngularModule } from 'lucide-angular';
import { SkillsComponent } from '@components/SkillsSection/Skills.component';
import { ProjectsComponent } from '@components/ProjectsSection/Projects.component';
import { ContactComponent } from '@components/ContactSection/Contact.component';
import { FooterComponent } from '@components/Footer/Footer.component';
import { ResumeComponent } from '@components/ResumeSection/Resume.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PageComponent,
    AboutMeComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    ResumeComponent,
    ContactComponent,
    FooterComponent,
    LucideAngularModule,
  ],
  templateUrl: './Home.component.html',
})
export class HomeComponent {
  languageService = inject(LanguageService);

  heroTexts = computed(() => this.languageService.t().hero);

  profileImageUrl = 'assets/profile.png';
  name = 'Icaro Justino.';

  socialLinks = [
    { icon: 'github', url: 'https://github.com/IcaroJustino', label: 'GitHub' },
    { icon: 'linkedin', url: 'https://www.linkedin.com/in/icaro-justino/?locale=pt_BR', label: 'LinkedIn' },
    { icon: 'mail', url: 'mailto:[EMAIL_ADDRESS]', label: 'Email' },
  ];

  scrollToContact(): void {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

import { Component } from '@angular/core';
import { PageComponent } from '@components/Page/Page.component';
import { AboutMeComponent } from '@components/AboutMeSection/Aboutme.component';
import { ExperienceComponent } from '@components/ExperienceSection/Experience.component';
import { LucideAngularModule } from 'lucide-angular';
import { SkillsComponent } from '@components/SkillsSection/Skills.component';
import { ProjectsComponent } from '@components/ProjectsSection/Projects.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageComponent,
    AboutMeComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    LucideAngularModule,
  ],
  templateUrl: './Home.component.html',
})
export class HomeComponent {
  readonly welcomeText = 'Olá, meu nome é ';
  readonly name = 'Icaro Justino.';
  profileImageUrl = 'assets/profile.jpg';
  readonly description =
    'Fullstack developer, inspirado em explorar todos os campos do desenvolvimento para se tornar um solido arquiteto de software entendendo os problemas e quais são as melhores soluções.';
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  readonly title = 'Technical Skills';
  readonly subtitle =
    'I work with a variety of modern technologies and tools to build high-quality applications';

  readonly categories: SkillCategory[] = [
    {
      title: 'Frontend',
      icon: 'code',
      accentClass: 'bg-gradient-to-br from-sky-500 to-blue-600',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      title: 'Backend',
      icon: 'database',
      accentClass: 'bg-gradient-to-br from-emerald-500 to-green-600',
      items: ['Node.js', 'Express', 'Python', 'Serverless Function', 'Rest APIs'],
    },
    {
      title: 'Embedded Systems',
      icon: 'cpu',
      accentClass: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
      items: [
        'C',
        'Assembly',
        'MSPM0 Microcontrollers',
        'Finite State Machines',
        'PCB Design (KiCad)',
        'Real-Time Systems',
        'UART / GPIO',
      ],
    },
    {
      title: 'ML / AI',
      icon: 'brain',
      accentClass: 'bg-gradient-to-br from-orange-500 to-amber-500',
      items: [
        'Python',
        'Pandas',
        'NumPy',
        'Matplotlib',
        'Stable-Baselines3',
        'MuJoCo',
        'Reinforcement Learning',
        'Algorithm Tuning (PPO, ETPPO)',
      ],
    },
    {
      title: 'Tools',
      icon: 'wrench',
      accentClass: 'bg-gradient-to-br from-pink-500 to-rose-500',
      items: ['Git', 'GitHub', 'VS Code', 'Docker', 'Vercel', 'CI/CD', 'Linux CLI', 'Figma'],
    },
    {
      title: 'Soft Skills',
      icon: 'users',
      accentClass: 'bg-gradient-to-br from-rose-500 to-pink-600',
      items: [
        'Leadership',
        'Team Collaboration',
        'Public Speaking',
        'Project Management',
        'Problem Solving',
        'Adaptability',
        'Mentorship',
        'Strategic Thinking',
      ],
    },
  ];
}

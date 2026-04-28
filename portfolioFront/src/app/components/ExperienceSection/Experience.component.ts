import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './Experience.component.html',
})
export class ExperienceComponent {
  readonly title = 'Experience';
  readonly subtitle = 'My professional journey and key experiences';

  readonly experiences = [
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
}

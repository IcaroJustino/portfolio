import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-aboutme',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Aboutme.component.html',
})
export class AboutMeComponent {
  readonly aboutmeText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  readonly profileImageUrl = 'assets/aboutmepicture.jpg';
  readonly profileImageAlt = 'Profile picture of Icaro Justino';
  readonly myJourneyText =
    'My journey in the world of technology began with a passion for problem-solving and creativity. I started learning programming languages in high school, which sparked my interest in software development. Over the years, I have honed my skills through various projects and internships, gaining experience in both frontend and backend development. I am particularly drawn to building user-friendly applications that make a positive impact on peoples lives. My goal is to continue growing as a developer and contribute to innovative projects that push the boundaries of technology.';

  readonly titleCards = [
    {
      count: '20+',
      description: 'Projects Completed',
      icon: 'medal',
    },
    {
      count: '500+',
      description: 'Energy Drinks Downed',
      icon: 'briefcase',
    },
    {
      count: '5+',
      description: 'Years Coding',
      icon: 'code',
    },
  ];
}

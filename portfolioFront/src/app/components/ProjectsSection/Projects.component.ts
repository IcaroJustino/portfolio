import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

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
  readonly title = 'Featured Projects';
  readonly subtitle = 'Here are some of my recent projects that showcase my skills and experience';

  readonly projects: Project[] = [
    {
      title: 'FormCoach',
      description: 'A real-time AI-powered vertical jump form analyzer that runs entirely in the browser. Uses MediaPipe Pose estimation to detect body mechanics.',
      image: 'assets/formcoach.png',
      technologies: ['Next.js', 'TypeScript', 'MediaPipe', 'React'],
      githubUrl: '#',
      demoUrl: '#'
    },
    {
      title: 'Yash Shell',
      description: 'A custom Unix shell built from scratch in C, featuring process creation with fork/exec, piping, I/O redirection, background processing.',
      image: 'assets/yash.png',
      technologies: ['C', 'Unix', 'Systems Programming'],
      githubUrl: '#',
      demoUrl: '#'
    },
    {
      title: 'MetadataEditor',
      description: 'An Electron desktop app for batch-applying metadata to music files. Converts MP3, WAV, and FLAC to M4A, embeds cover art, and more.',
      image: 'assets/metadata.png',
      technologies: ['Electron', 'Node.js', 'JavaScript'],
      githubUrl: '#',
      demoUrl: '#'
    },
    {
      title: 'Algorithm Visualizer',
      description: 'An interactive pathfinding visualizer built with Next.js and React, showcasing BFS and DFS algorithms in real time on a dynamic grid.',
      image: 'assets/visualizer.png',
      technologies: ['Next.js', 'Node.js', 'React', 'CSS'],
      githubUrl: '#',
      demoUrl: '#'
    },
    {
      title: 'Space Invaders Clone',
      description: 'A fully playable Space Invaders game implemented in C and Assembly on the MSPM0 microcontroller, featuring custom graphics.',
      image: 'assets/spaceinvaders.png',
      technologies: ['C', 'Assembly'],
      githubUrl: '#',
      demoUrl: '#'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, animated portfolio built with Next.js, Tailwind CSS, and Framer Motion to highlight projects and skills with smooth UI/UX.',
      image: 'assets/portfolio.png',
      technologies: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'TypeScript'],
      githubUrl: '#',
      demoUrl: '#'
    }
  ];
}

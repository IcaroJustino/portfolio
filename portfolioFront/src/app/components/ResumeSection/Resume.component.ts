import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-resume-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Resume.component.html',
})
export class ResumeComponent {
  readonly title = 'Resume';
  readonly subtitle = 'Download or view my resume to learn more about my experience and qualifications';
  
  readonly resumeUrlPath = 'assets/IcaroMirandaResumePTBR.pdf';
  readonly safeResumeUrl: SafeResourceUrl;
  
  showPreview = true;

  constructor(private sanitizer: DomSanitizer) {
    this.safeResumeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.resumeUrlPath);
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }
}

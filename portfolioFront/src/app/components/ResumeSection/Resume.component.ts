import { CommonModule } from '@angular/common';
import { Component, inject, computed } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LucideAngularModule } from 'lucide-angular';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-resume-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './Resume.component.html',
})
export class ResumeComponent {
  languageService = inject(LanguageService);
  private sanitizer = inject(DomSanitizer);

  texts = computed(() => this.languageService.t().resume);

  safeResumeUrl = computed<SafeResourceUrl>(() => {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.texts().pdfFile);
  });

  showPreview = true;

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }
}

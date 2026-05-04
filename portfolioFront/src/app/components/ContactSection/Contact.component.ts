import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, computed } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './Contact.component.html',
})
export class ContactComponent implements OnInit {
  languageService = inject(LanguageService);

  texts = computed(() => this.languageService.t().contact);

  contactInfo = computed(() => {
    const info = this.texts().info;
    return [
      { icon: 'mail', title: info[0].title, value: info[0].value },
      { icon: 'phone', title: info[1].title, value: info[1].value },
      { icon: 'map-pin', title: info[2].title, value: info[2].value }
    ];
  });

  formData = {
    name: '',
    email: '',
    message: ''
  };

  // Anti-spam: honeypot field (bots auto-fill this, humans never see it)
  honeypot = '';

  // Anti-spam: records when the component loaded
  private loadedAt = 0;

  // Submission state
  isSubmitting = false;

  // Toast notification
  toast: { type: 'success' | 'error'; message: string; visible: boolean } = {
    type: 'success',
    message: '',
    visible: false
  };

  // Anti-spam: cooldown (seconds remaining until user can submit again)
  cooldownRemaining = 0;
  private cooldownInterval: ReturnType<typeof setInterval> | null = null;

  ngOnInit() {
    this.loadedAt = Date.now();
  }

  get isOnCooldown(): boolean {
    return this.cooldownRemaining > 0;
  }

  async onSubmit() {
    if (this.isSubmitting || this.isOnCooldown) return;

    this.isSubmitting = true;
    this.hideToast();

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: this.formData.name,
          email: this.formData.email,
          mensagem: this.formData.message,
          _honeypot: this.honeypot,       // honeypot for bot detection
          _loadedAt: this.loadedAt         // timing for bot detection
        }),
      });

      const data = await response.json();
      const t = this.texts().toast;

      if (response.ok) {
        this.showToast('success', t.success);
        this.formData = { name: '', email: '', message: '' };
        this.startCooldown(60); // 60-second cooldown after success
      } else if (response.status === 429) {
        this.showToast('error', data.error || t.rateLimit);
        this.startCooldown(120); // longer cooldown on rate-limit
      } else {
        this.showToast('error', data.error || t.error);
      }
    } catch (error) {
      this.showToast('error', this.texts().toast.connError);
      console.error('Error sending message:', error);
    } finally {
      this.isSubmitting = false;
    }
  }

  // ─── Toast helpers ─────────────────────────────────────────
  showToast(type: 'success' | 'error', message: string) {
    this.toast = { type, message, visible: true };

    // Auto-hide after 6 seconds
    setTimeout(() => {
      this.hideToast();
    }, 6000);
  }

  hideToast() {
    this.toast = { ...this.toast, visible: false };
  }

  // ─── Cooldown helpers ──────────────────────────────────────
  private startCooldown(seconds: number) {
    this.cooldownRemaining = seconds;

    if (this.cooldownInterval) {
      clearInterval(this.cooldownInterval);
    }

    this.cooldownInterval = setInterval(() => {
      this.cooldownRemaining--;
      if (this.cooldownRemaining <= 0) {
        this.cooldownRemaining = 0;
        if (this.cooldownInterval) {
          clearInterval(this.cooldownInterval);
          this.cooldownInterval = null;
        }
      }
    }, 1000);
  }
}

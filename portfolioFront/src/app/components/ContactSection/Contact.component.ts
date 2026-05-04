import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { ToastrService } from 'ngx-toastr';

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

  private toastr = inject(ToastrService);

  formData = signal({
    name: '',
    email: '',
    message: ''
  });

  // Anti-spam: honeypot field (bots auto-fill this, humans never see it)
  honeypot = signal('');

  // Anti-spam: records when the component loaded
  private loadedAt = 0;

  // Submission state
  isSubmitting = signal(false);
  
  // Flag to keep the button disabled after successful submission
  hasSubmitted = signal(false);

  ngOnInit() {
    this.loadedAt = Date.now();
  }

  async onSubmit() {
    if (this.isSubmitting() || this.hasSubmitted()) return;

    const data = this.formData();

    // Field Validations
    if (!data.name.trim()) {
      this.toastr.error('Por favor, preencha o seu nome.', 'Erro');
      return;
    }

    if (!data.email.trim()) {
      this.toastr.error('Por favor, preencha o seu e-mail.', 'Erro');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      this.toastr.error('Por favor, insira um e-mail válido.', 'Erro');
      return;
    }

    if (!data.message.trim()) {
      this.toastr.error('Por favor, digite sua mensagem.', 'Erro');
      return;
    }

    this.isSubmitting.set(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: data.name,
          email: data.email,
          mensagem: data.message,
          _honeypot: this.honeypot(),
          _loadedAt: this.loadedAt
        }),
      });

      const resData = await response.json();
      const t = this.texts().toast;

      if (response.ok) {
        this.formData.set({ name: '', email: '', message: '' });
        this.hasSubmitted.set(true); // Block button without exposing timer
        this.toastr.success(t.success, 'Sucesso');
      } else if (response.status === 429) {
        this.toastr.warning(resData.error || t.rateLimit, 'Atenção');
      } else {
        this.toastr.error(resData.error || t.error, 'Erro');
      }
    } catch (error) {
      this.toastr.error(this.texts().toast.connError, 'Erro');
    } finally {
      this.isSubmitting.set(false);
    }
  }
}

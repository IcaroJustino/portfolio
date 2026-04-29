import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  ArrowRight,
  Brain,
  Briefcase,
  Calendar,
  CircleDot,
  Code,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  FlaskConical,
  LucideAngularModule,
  MapPin,
  Medal,
  Menu,
  Shield,
  Sparkles,
  Users,
  Wrench,
  X,
} from 'lucide-angular';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    importProvidersFrom(
      LucideAngularModule.pick({
        ArrowRight,
        Brain,
        Briefcase,
        Calendar,
        CircleDot,
        Code,
        Cpu,
        Database,
        Download,
        ExternalLink,
        Eye,
        EyeOff,
        FileText,
        FlaskConical,
        MapPin,
        Medal,
        Menu,
        Shield,
        Sparkles,
        Users,
        Wrench,
        X,
      }),
    ),
  ],
};

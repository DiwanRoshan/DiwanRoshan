import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(true);
  isDarkMode$ = this.isDarkMode.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
    }
  }

  private initTheme(): void {
    // Check localStorage first
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
      const isDark = savedTheme === 'dark';
      this.isDarkMode.next(isDark);
      this.applyTheme(isDark);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkMode.next(prefersDark);
      this.applyTheme(prefersDark);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        this.isDarkMode.next(e.matches);
        this.applyTheme(e.matches);
      }
    });
  }

  toggle(): void {
    const newValue = !this.isDarkMode.value;
    this.isDarkMode.next(newValue);
    this.applyTheme(newValue);
    localStorage.setItem('portfolio-theme', newValue ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove('light');
    } else {
      html.classList.add('light');
    }
  }

  getCurrentTheme(): boolean {
    return this.isDarkMode.value;
  }
}

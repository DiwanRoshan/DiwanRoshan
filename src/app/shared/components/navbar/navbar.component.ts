import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { SmoothScrollService } from '../../../core/services/smooth-scroll.service';
import { DataService } from '../../../core/services/data.service';

interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isScrolled = false;
  isMobileMenuOpen = false;
  isDarkMode = true;
  
  navLinks: NavLink[] = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    // { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    // { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  personalInfo = this.dataService.getPersonalInfo();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private themeService: ThemeService,
    private smoothScroll: SmoothScrollService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled = window.scrollY > 50;
    }
  }

  toggleTheme(): void {
    this.themeService.toggle();
    
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (isPlatformBrowser(this.platformId)) {
      if (this.isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  scrollToSection(href: string, event: Event): void {
    event.preventDefault();
    this.closeMobileMenu();
    this.smoothScroll.scrollTo(href, { offset: -80 });
  }
}

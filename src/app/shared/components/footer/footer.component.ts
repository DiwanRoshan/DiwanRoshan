import { Component } from '@angular/core';
import { DataService } from '../../../core/services/data.service';
import { SmoothScrollService } from '../../../core/services/smooth-scroll.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  personalInfo = this.dataService.getPersonalInfo();
  currentYear = new Date().getFullYear();

  quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    // { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  constructor(
    private dataService: DataService,
    private smoothScroll: SmoothScrollService
  ) {}

  scrollToSection(href: string, event: Event): void {
    event.preventDefault();
    this.smoothScroll.scrollTo(href, { offset: -80 });
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    this.smoothScroll.scrollTo(0);
  }
}

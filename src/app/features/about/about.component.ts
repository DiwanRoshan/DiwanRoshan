import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutSection') aboutSection!: ElementRef;

  personalInfo = this.dataService.getPersonalInfo();
  
  // Stats to display
  stats = [
    { value: '4.6+', label: 'Years Experience' },
    { value: '7+', label: 'Projects Completed' },
    // { value: '30+', label: 'Happy Clients' },
    { value: '99%', label: 'Client Satisfaction' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private gsapService: GsapService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  private initAnimations(): void {
    const gsap = this.gsapService.gsap;
    const ScrollTrigger = this.gsapService.scrollTrigger;

    // Animate section header
    gsap.fromTo('.about .section-header', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about .section-header',
          start: 'top 100%',
        }
      }
    );

    // Animate about content
    gsap.fromTo('.about-content', 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-content',
          start: 'top 75%',
        }
      }
    );

    // Animate about image
    gsap.fromTo('.about-image-wrapper', 
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-image-wrapper',
          start: 'top 75%',
        }
      }
    );

    // Animate stats with stagger
    gsap.fromTo('.stat-item', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-stats',
          start: 'top 85%',
        }
      }
    );
  }
}

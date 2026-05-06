import { Component, OnInit, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from '../../core/services/data.service';
import { GsapService } from '../../core/services/gsap.service';
import { SmoothScrollService } from '../../core/services/smooth-scroll.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroTagline') heroTagline!: ElementRef;
  @ViewChild('heroCta') heroCta!: ElementRef;
  @ViewChild('scrollIndicator') scrollIndicator!: ElementRef;

  personalInfo = this.dataService.getPersonalInfo();
  
  roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'Front End Engineer', 'Problem Solver', 'Email Developer'];
  currentRole = '';
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimeout: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private gsapService: GsapService,
    private smoothScroll: SmoothScrollService
  ) {}

  ngOnInit(): void {
    this.personalInfo = this.dataService.getPersonalInfo();
    
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingAnimation();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
  }

  private initAnimations(): void {
    const gsap = this.gsapService.gsap;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero-greeting', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo('.hero-name', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    )
    .fromTo('.hero-role', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    )
    .fromTo('.hero-tagline', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo('.hero-cta', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.2'
    )
    .fromTo('.hero-social', 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    )
    .fromTo('.hero-visual', 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1 },
      '-=0.8'
    )
    .fromTo('.scroll-indicator', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    );

    gsap.to('.float-icon', {
      y: -15,
      duration: 2,
      ease: 'power1.inOut',
      stagger: {
        each: 0.3,
        repeat: -1,
        yoyo: true
      }
    });
  }

  private startTypingAnimation(): void {
    const currentFullText = this.roles[this.roleIndex];
    
    if (!this.isDeleting) {
      this.currentRole = currentFullText.substring(0, this.charIndex + 1);
      this.charIndex++;
      
      if (this.charIndex === currentFullText.length) {
        this.typingTimeout = setTimeout(() => {
          this.isDeleting = true;
          this.startTypingAnimation();
        }, 2000);
        return;
      }
    } else {
      this.currentRole = currentFullText.substring(0, this.charIndex - 1);
      this.charIndex--;
      
      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      }
    }
    
    const speed = this.isDeleting ? 50 : 100;
    this.typingTimeout = setTimeout(() => this.startTypingAnimation(), speed);
  }

  scrollToAbout(event: Event): void {
    event.preventDefault();
    this.smoothScroll.scrollTo('#about', { offset: -80 });
  }

  scrollToContact(event: Event): void {
    event.preventDefault();
    this.smoothScroll.scrollTo('#contact', { offset: -80 });
  }
}

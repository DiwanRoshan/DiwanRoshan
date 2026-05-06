import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService, Testimonial } from '../../core/services/data.service';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss']
})
export class TestimonialsComponent implements OnInit, AfterViewInit {
  testimonials: Testimonial[] = [];
  currentIndex = 0;
  private autoplayInterval: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private gsapService: GsapService
  ) {}

  ngOnInit(): void {
    this.testimonials = this.dataService.getTestimonials();
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  ngOnDestroy(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
    }
  }

  private initAnimations(): void {
    const gsap = this.gsapService.gsap;

    gsap.fromTo('.testimonials .section-header', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.testimonials .section-header',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.testimonials-slider', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.testimonials-slider',
          start: 'top 80%',
        }
      }
    );
  }

  private startAutoplay(): void {
    this.autoplayInterval = setInterval(() => {
      this.next();
    }, 5000);
  }

  private resetAutoplay(): void {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.startAutoplay();
    }
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.resetAutoplay();
  }

  prev(): void {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetAutoplay();
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
}

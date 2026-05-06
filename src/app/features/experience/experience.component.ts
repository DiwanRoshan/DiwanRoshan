import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService, Experience } from '../../core/services/data.service';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements OnInit, AfterViewInit {
  experiences: Experience[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private gsapService: GsapService
  ) {}

  ngOnInit(): void {
    this.experiences = this.dataService.getExperiences();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  private initAnimations(): void {
    const gsap = this.gsapService.gsap;

    gsap.fromTo('.experience .section-header', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.experience .section-header',
          start: 'top 80%',
        }
      }
    );

    // Animate timeline items
    gsap.fromTo('.timeline-item', 
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.experience-timeline',
          start: 'top 75%',
        }
      }
    );

    // Animate timeline line
    gsap.fromTo('.timeline-line', 
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.experience-timeline',
          start: 'top 80%',
        }
      }
    );
  }

  trackByExperience(index: number, experience: Experience): string {
    return experience.id;
  }

  trackByText(index: number, value: string): string {
    return `${index}-${value}`;
  }
}

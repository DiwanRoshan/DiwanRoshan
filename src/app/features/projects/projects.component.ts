import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService, Project } from '../../core/services/data.service';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  activeFilter = 'all';
  allTags: string[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private gsapService: GsapService
  ) {}

  ngOnInit(): void {
    this.projects = this.dataService.getProjects();
    this.filteredProjects = this.projects;
    
    // Extract unique tags
    const tagsSet = new Set<string>();
    this.projects.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
    this.allTags = Array.from(tagsSet).slice(0, 6); // Limit to 6 tags for filter
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  private initAnimations(): void {
    const gsap = this.gsapService.gsap;

    gsap.fromTo('.projects .section-header', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects .section-header',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.filter-btn', 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-filter',
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.project-card', 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.projects-grid',
          start: 'top 80%',
        }
      }
    );
  }

  filterProjects(filter: string): void {
    this.activeFilter = filter;
    
    if (filter === 'all') {
      this.filteredProjects = this.projects;
    } else if (filter === 'featured') {
      this.filteredProjects = this.projects.filter(p => p.featured);
    } else {
      this.filteredProjects = this.projects.filter(p => 
        p.tags.some(t => t.toLowerCase() === filter.toLowerCase())
      );
    }

    // Animate filtered projects
    if (isPlatformBrowser(this.platformId)) {
      const gsap = this.gsapService.gsap;
      gsap.fromTo('.project-card', 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
      );
    }
  }

  trackByProject(index: number, project: Project): string {
    return project.id;
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }
}

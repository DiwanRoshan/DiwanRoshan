import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService, Skill } from '../../core/services/data.service';
import { GsapService } from '../../core/services/gsap.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit, AfterViewInit {
  private readonly skillColors: { [key: string]: string } = {
    angular: '#DD0031',
    react: '#61DAFB',
    typescript: '#3178C6',
    javascript: '#F7DF1E',
    html5: '#E34F26',
    sass: '#CC6699',
    rxjs: '#B7178C',
    ngrx: '#764ABC',
    bootstrap: '#7952B3',
    tailwindcss: '#38BDF8',
    api: '#6366F1',
    cloud: '#0EA5E9',
    creditcard: '#10B981',
    mail: '#F59E0B',
    cast: '#8B5CF6',
    git: '#F05032',
    gitbranch: '#FB923C',
    jira: '#2684FF',
    postman: '#FF6C37',
    jenkins: '#D33833',
    vscode: '#007ACC',
    chrome: '#34A853',
    agile: '#14B8A6',
    code: '#A855F7',
    bug: '#EF4444',
    settings: '#6B7280',
    layers: '#6366F1',
    users: '#06B6D4',
    tv: '#EC4899',
    playcircle: '#22C55E',
    video: '#3B82F6'
  };

  private readonly iconType: { [key: string]: string } = {
    angular: 'code',
    react: 'component',
    typescript: 'brackets',
    javascript: 'braces',
    html5: 'browser',
    sass: 'palette',
    rxjs: 'shuffle',
    ngrx: 'layers',
    bootstrap: 'layout',
    tailwindcss: 'wind',
    api: 'server',
    cloud: 'cloud',
    creditcard: 'card',
    mail: 'mail',
    cast: 'cast',
    git: 'git',
    gitbranch: 'branch',
    jira: 'kanban',
    postman: 'send',
    jenkins: 'build',
    vscode: 'terminal',
    chrome: 'compass',
    agile: 'refresh',
    code: 'code-review',
    bug: 'bug',
    settings: 'settings',
    layers: 'layers',
    users: 'users',
    tv: 'tv',
    playcircle: 'play',
    video: 'video'
  };

  private readonly icons: { [key: string]: string } = {
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    component: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    brackets: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H6v16h3"></path><path d="M15 4h3v16h-3"></path></svg>',
    braces: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3"></path><path d="M15 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3"></path></svg>',
    browser: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="8" y1="4" x2="8" y2="9"></line></svg>',
    palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18h1.2a2.8 2.8 0 0 0 0-5.6H12a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2.2A4.8 4.8 0 0 0 19 6.6 3.6 3.6 0 0 0 15.4 3H12z"></path><circle cx="7.5" cy="10" r="1"></circle><circle cx="9" cy="7" r="1"></circle><circle cx="13" cy="7" r="1"></circle></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>',
    wind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 0-3.5-3.5"></path><path d="M2 10h14a2.5 2.5 0 1 1 0 5H2"></path><path d="M2 6h8"></path><path d="M2 14h10"></path></svg>',
    server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="2"></rect><rect x="2" y="14" width="20" height="7" rx="2"></rect><line x1="6" y1="7" x2="6.01" y2="7"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
    cloud: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 17.6A4.6 4.6 0 0 0 18 9h-1a7 7 0 1 0-12.6 4.2A4.2 4.2 0 0 0 5 21h13a4 4 0 0 0 2-3.4z"></path></svg>',
    card: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"></rect><polyline points="3 7 12 13 21 7"></polyline></svg>',
    cast: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16a6 6 0 0 1 6 6"></path><path d="M2 12a10 10 0 0 1 10 10"></path><path d="M2 8a14 14 0 0 1 14 14"></path><rect x="7" y="3" width="14" height="10" rx="2"></rect></svg>',
    git: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2"></circle><circle cx="18" cy="18" r="2"></circle><circle cx="6" cy="18" r="2"></circle><line x1="8" y1="6" x2="16" y2="6"></line><line x1="6" y1="8" x2="6" y2="16"></line><line x1="8" y1="18" x2="16" y2="18"></line></svg>',
    branch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="6" r="3"></circle><path d="M9 18h3a6 6 0 0 0 6-6V9"></path></svg>',
    kanban: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><line x1="8" y1="8" x2="8" y2="16"></line><line x1="12" y1="8" x2="12" y2="13"></line><line x1="16" y1="8" x2="16" y2="11"></line></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
    build: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 7h7"></path><path d="M14 12h7"></path><path d="M14 17h7"></path><path d="M3 7h7v4H3z"></path><path d="M3 13h7v4H3z"></path></svg>',
    terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"></rect><polyline points="7 9 10 12 7 15"></polyline><line x1="12" y1="15" x2="17" y2="15"></line></svg>',
    compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polygon points="14.5 9.5 10 10 9.5 14.5 14 14"></polygon></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.5 9a9 9 0 0 1 14-3l5.5 4"></path><path d="M20.5 15a9 9 0 0 1-14 3L1 14"></path></svg>',
    'code-review': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 8 5 12l4 4"></path><path d="M15 8l4 4-4 4"></path><line x1="10" y1="19" x2="14" y2="5"></line></svg>',
    bug: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 9h8"></path><path d="M9 9V7a3 3 0 0 1 6 0v2"></path><rect x="7" y="9" width="10" height="11" rx="5"></rect><path d="M3 13h4"></path><path d="M17 13h4"></path><path d="M5 6l3 2"></path><path d="M19 6l-3 2"></path></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06A2 2 0 1 1 3.4 17l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2.2a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82L3.4 7.2A2 2 0 1 1 6.23 4.4l.06.06a1.65 1.65 0 0 0 1.82.33h.01A1.65 1.65 0 0 0 9.13 3.3V3.2a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06A2 2 0 1 1 20.85 7.2l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1h.09a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
    tv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="13" rx="2"></rect><polyline points="8 3 12 7 16 3"></polyline></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="15" height="12" rx="2"></rect><polygon points="17 10 22 7 22 17 17 14"></polygon></svg>'
  };

  skills: Skill[] = [];
  displayedSkills: Array<Skill & { color: string; gradient: string; background: string; svg: SafeHtml }> = [];
  categories = [
    { key: 'frontend', label: 'Frontend', icon: 'layout' },
    { key: 'backend', label: 'Backend', icon: 'server' },
    { key: 'streaming', label: 'Streaming & OTT', icon: 'cast' },
    { key: 'tools', label: 'Tools & Others', icon: 'tool' }
  ];
  activeCategory = 'frontend';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private gsapService: GsapService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.skills = this.dataService.getSkills();
    this.updateDisplayedSkills();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initAnimations(), 100);
    }
  }

  private initAnimations(): void {
    const gsap = this.gsapService.gsap;

    gsap.fromTo('.skills .section-header', 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills .section-header',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.category-tab', 
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-categories',
          start: 'top 85%',
        }
      }
    );

    gsap.fromTo('.skill-card', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 80%',
        }
      }
    );
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
    this.updateDisplayedSkills();
    
    // Re-animate skill cards on category change
    if (isPlatformBrowser(this.platformId)) {
      const gsap = this.gsapService.gsap;
      gsap.fromTo('.skill-card', 
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03, ease: 'power2.out' }
      );
    }
  }

  trackByCategory(index: number, category: { key: string }): string {
    return category.key;
  }

  trackBySkill(index: number, skill: Skill): string {
    return `${skill.category}-${skill.name}`;
  }

  private updateDisplayedSkills(): void {
    this.displayedSkills = this.skills
      .filter((skill) => skill.category === this.activeCategory)
      .map((skill) => {
        const color = this.skillColors[skill.icon] || '#6366F1';
        const selectedIcon = this.icons[this.iconType[skill.icon]] || this.icons.code;

        return {
          ...skill,
          color,
          background: `${color}20`,
          gradient: `linear-gradient(90deg, ${color}, ${color}80)`,
          svg: this.sanitizer.bypassSecurityTrustHtml(selectedIcon)
        };
      });
  }
}

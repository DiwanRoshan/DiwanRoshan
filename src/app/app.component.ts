import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GsapService } from './core/services/gsap.service';
import { SmoothScrollService } from './core/services/smooth-scroll.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'portfolio';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private gsapService: GsapService,
    private smoothScrollService: SmoothScrollService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize GSAP
      this.gsapService.init();
      
      // Initialize smooth scroll
      this.smoothScrollService.init();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.gsapService.killAll();
      this.smoothScrollService.destroy();
    }
  }
}

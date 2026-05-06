import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Declare Lenis type
declare class Lenis {
  constructor(options?: any);
  raf(time: number): void;
  destroy(): void;
  scrollTo(target: string | number | HTMLElement, options?: any): void;
  on(event: string, callback: Function): void;
  stop(): void;
  start(): void;
}

@Injectable({
  providedIn: 'root'
})
export class SmoothScrollService {
  private lenis: Lenis | null = null;
  private rafId: number | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  async init(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Dynamic import of Lenis
    try {
      const LenisModule = await import('@studio-freight/lenis');
      const LenisClass = LenisModule.default || LenisModule;

      this.ngZone.runOutsideAngular(() => {
        this.lenis = new LenisClass({
          duration: 1.0,
          easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out-cubic: fast start, smooth end
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        });

        // Add lenis class to body
        document.body.classList.add('lenis', 'lenis-smooth');

        // RAF loop
        const raf = (time: number) => {
          this.lenis?.raf(time);
          this.rafId = requestAnimationFrame(raf);
        };

        this.rafId = requestAnimationFrame(raf);

        // Integrate with GSAP ScrollTrigger if available
        this.lenis.on('scroll', () => {
          // @ts-ignore
          if (window.ScrollTrigger) {
            // @ts-ignore
            window.ScrollTrigger.update();
          }
        });
      });
    } catch (error) {
      console.warn('Lenis smooth scroll could not be initialized:', error);
    }
  }

  scrollTo(target: string | number | HTMLElement, options: any = {}): void {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset: 0,
        duration: 0.8,
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out-cubic
        immediate: false,
        ...options
      });
    } else if (isPlatformBrowser(this.platformId)) {
      // Fallback to native smooth scroll
      if (typeof target === 'string') {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
    }
    this.lenis?.destroy();
    this.lenis = null;
    
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('lenis', 'lenis-smooth');
    }
  }

  get instance(): Lenis | null {
    return this.lenis;
  }
}

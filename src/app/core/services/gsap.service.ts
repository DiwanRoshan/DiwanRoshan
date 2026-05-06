import { Injectable, Inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({
  providedIn: 'root'
})
export class GsapService {
  private initialized = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  init(): void {
    if (!isPlatformBrowser(this.platformId) || this.initialized) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      gsap.registerPlugin(ScrollTrigger);
      
      // Configure ScrollTrigger defaults
      ScrollTrigger.defaults({
        toggleActions: 'play none none reverse',
        start: 'top 80%',
        end: 'bottom 20%',
      });
      
      this.initialized = true;
    });
  }

  // Fade up animation
  fadeUp(element: Element | Element[] | string, options: gsap.TweenVars = {}): gsap.core.Tween {
    return gsap.fromTo(element, 
      { 
        opacity: 0, 
        y: 60 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: 'power3.out',
        ...options
      }
    );
  }

  // Fade in from left
  fadeLeft(element: Element | Element[] | string, options: gsap.TweenVars = {}): gsap.core.Tween {
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        x: -60 
      },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1,
        ease: 'power3.out',
        ...options
      }
    );
  }

  // Fade in from right
  fadeRight(element: Element | Element[] | string, options: gsap.TweenVars = {}): gsap.core.Tween {
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        x: 60 
      },
      { 
        opacity: 1, 
        x: 0, 
        duration: 1,
        ease: 'power3.out',
        ...options
      }
    );
  }

  // Scale up animation
  scaleIn(element: Element | Element[] | string, options: gsap.TweenVars = {}): gsap.core.Tween {
    return gsap.fromTo(element,
      { 
        opacity: 0, 
        scale: 0.8 
      },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.8,
        ease: 'back.out(1.7)',
        ...options
      }
    );
  }

  // Stagger animation for lists
  staggerFadeUp(elements: Element[] | string, options: gsap.TweenVars = {}): gsap.core.Tween {
    return gsap.fromTo(elements,
      { 
        opacity: 0, 
        y: 40 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
        ...options
      }
    );
  }

  // Create scroll-triggered animation
  createScrollTrigger(element: Element | string, animation: gsap.core.Animation, options: ScrollTrigger.Vars = {}): ScrollTrigger {
    return ScrollTrigger.create({
      trigger: element,
      animation: animation,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...options
    });
  }

  // Parallax effect
  parallax(element: Element | string, speed: number = 0.5): gsap.core.Timeline {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      }
    });

    tl.fromTo(element, 
      { y: -100 * speed }, 
      { y: 100 * speed, ease: 'none' }
    );

    return tl;
  }

  // Text reveal animation (split text effect)
  textReveal(element: Element | string, options: gsap.TweenVars = {}): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    tl.fromTo(element,
      {
        opacity: 0,
        y: 100,
        rotationX: -80,
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: 'power4.out',
        ...options
      }
    );

    return tl;
  }

  // Magnetic effect for buttons/elements
  createMagneticEffect(element: HTMLElement, strength: number = 0.3): void {
    if (!isPlatformBrowser(this.platformId)) return;

    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    element.addEventListener('mouseleave', () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  }

  // Clean up all ScrollTriggers
  killAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }

  // Refresh ScrollTrigger (useful after dynamic content loads)
  refresh(): void {
    if (isPlatformBrowser(this.platformId)) {
      ScrollTrigger.refresh();
    }
  }

  // Get GSAP instance for custom animations
  get gsap() {
    return gsap;
  }

  // Get ScrollTrigger instance
  get scrollTrigger() {
    return ScrollTrigger;
  }
}

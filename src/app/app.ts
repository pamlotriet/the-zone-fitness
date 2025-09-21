import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
// Removed animations import to avoid deprecation warnings

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    'ngSkipHydration': 'true'
  }
})
export class App implements OnInit {

  // Form and toast properties
  isSubmitting = false;
  toastMessage = '';
  toastTitle = '';
  toastType: 'success' | 'error' = 'success';

  // Mobile navigation
  isMobileMenuOpen = false;

  // SMTP server URL (Azure hosted)
  private smtpServerUrl = 'https://zone-fitness-smtp-bthxdyd5c9d4dyff.southafricanorth-01.azurewebsites.net';

  // Array of all gym images
  gymImages: string[] = [
    '1cb8ab55-78f3-4fa1-bae9-08854f5d1ad6.JPG',
    '337580fd-64a3-476d-a4c0-ad9a76721456.JPG',
    '33fdf2f3-0c82-4791-9c75-e13796e6804c.JPG',
    '485896977_1234753355133136_5108972678431752617_n.jpg',
    '485908966_1234753321799806_1588789246562477513_n.jpg',
    '486083950_1234753231799815_8102855688050154364_n.jpg',
    '486261217_1235144591760679_74563798307280413_n.jpg',
    'jeandre.jpg',
    '486501569_1236894118252393_2680654569370207942_n.jpg',
    '486561276_1235141635094308_4551235605039176171_n.jpg',
    '486568226_1235144765093995_3222769883979021228_n.jpg',
    '489770446_1250979776843827_1951353875151540410_n.jpg',
    '490150526_1250979466843858_5391433201035004358_n.jpg',
    '490172259_1250979890177149_760173006625713715_n.jpg',
    '490207034_1250979850177153_4092627883290339522_n.jpg',
    '490265082_1250979550177183_3880056783620166943_n.jpg',
    '492126438_1260455509229587_3093060116518325725_n.jpg',
    '7b106720-4b2e-48a3-a358-059d431be474.JPG',
    'IMG_9416.jpg',
    'IMG_9418.jpg',
    'IMG_9419.jpg'
  ];

  nutritionImages: string[] = [
    'IMG_2014.JPG',
    'IMG_2015.JPG',
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveNavLink();
      // Initialize Lucide icons with retry mechanism
      this.initializeLucideIcons();
      // Initialize carousel and refresh icons after a delay to ensure Angular @for renders
      setTimeout(() => {
        this.initializeCarousel();
        this.initializeLucideIcons();
      }, 500);
      // Additional icon refresh and carousel retry after longer delay for reliability
      setTimeout(() => {
        this.initializeLucideIcons();
        this.initializeCarousel();
      }, 1000);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateActiveNavLink();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (isPlatformBrowser(this.platformId) && this.isMobileMenuOpen) {
      const target = event.target as HTMLElement;
      const nav = document.querySelector('nav');

      // Close mobile menu if clicked outside
      if (nav && !nav.contains(target)) {
        this.closeMobileMenu();
      }
    }
  }

  private updateActiveNavLink() {
    if (!isPlatformBrowser(this.platformId)) return;

    const sections = ['home', 'about', 'coaches', 'schedule', 'pricing', 'contact', 'nutrition'];
    const scrollPosition = window.scrollY + 100; // Offset for fixed nav

    for (const section of sections) {
      const element = document.getElementById(section);
      const navLink = document.querySelector(`a[href="#${section}"]`);

      if (element && navLink) {
        const elementTop = element.offsetTop;
        const elementHeight = element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementTop + elementHeight) {
          // Remove active class from all nav links
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
          });

          // Add active class to current section's nav link
          navLink.classList.add('active');
          break;
        }
      }
    }
  }

  private initializeCarousel() {
    if (!isPlatformBrowser(this.platformId)) return;

    const carousel = document.getElementById('carousel') as HTMLElement;
    const prevBtn = document.getElementById('prevBtn') as HTMLButtonElement;
    const nextBtn = document.getElementById('nextBtn') as HTMLButtonElement;
    const dotsContainer = document.getElementById('dots') as HTMLElement;

    if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

    const totalSlides = this.gymImages.length;
    let currentSlide = 0;

    // Responsive slides per view
    const getSlidesPerView = () => {
      if (window.innerWidth >= 1024) return 3; // lg: show 3
      if (window.innerWidth >= 768) return 2;  // md: show 2
      return 1; // mobile: show 1
    };


    let slidesPerView = getSlidesPerView();
    const maxSlideIndex = Math.max(0, totalSlides - slidesPerView);

    // Create dots based on number of possible positions
    const createDots = () => {
      dotsContainer.innerHTML = '';
      const numDots = maxSlideIndex + 1;
      for (let i = 0; i < numDots; i++) {
        const dot = document.createElement('button');
        // Desktop-only dots (hidden on mobile)
        dot.className = `w-3 h-3 rounded-full transition-all ${i === 0 ? 'bg-zone-green-400' : 'bg-gray-600 hover:bg-gray-500'}`;
        dot.style.cursor = 'pointer';
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    };

    const updateCarousel = () => {
      // Calculate proper translation based on current viewport
      let translateX = 0;

      if (slidesPerView === 1) {
        // Mobile: translate by 100% per slide
        translateX = -currentSlide * 100;
      } else if (slidesPerView === 2) {
        // Tablet: translate by 50% per slide
        translateX = -currentSlide * 50;
      } else {
        // Desktop: translate by 33.33% per slide
        translateX = -currentSlide * (100 / 3);
      }

      carousel.style.transform = `translateX(${translateX}%)`;

      // Update dots
      const dots = dotsContainer.children;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i] as HTMLElement;
        dot.className = `w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-zone-green-400' : 'bg-gray-600 hover:bg-gray-500'}`;
      }
    };

    const goToSlide = (slideIndex: number) => {
      currentSlide = Math.min(slideIndex, maxSlideIndex);
      updateCarousel();
    };

    const nextSlide = () => {
      currentSlide = currentSlide >= maxSlideIndex ? 0 : currentSlide + 1;
      updateCarousel();
    };

    const prevSlide = () => {
      currentSlide = currentSlide <= 0 ? maxSlideIndex : currentSlide - 1;
      updateCarousel();
    };

    // Handle window resize
    const handleResize = () => {
      const newSlidesPerView = getSlidesPerView();
      if (newSlidesPerView !== slidesPerView) {
        slidesPerView = newSlidesPerView;
        currentSlide = 0; // Reset to start
        createDots();
        updateCarousel();
      }
    };

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    window.addEventListener('resize', handleResize);

    // Auto-play functionality (slower for professional look)
    let autoPlayInterval = setInterval(nextSlide, 6000);

    // Pause auto-play on hover (desktop) and touch (mobile)
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(nextSlide, 6000);
    });

    // Enhanced mobile touch events
    let touchStartX = 0;
    let touchEndX = 0;
    let isTouching = false;

    carousel.addEventListener('touchstart', (e) => {
      clearInterval(autoPlayInterval);
      touchStartX = e.changedTouches[0].screenX;
      isTouching = true;
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isTouching) return;
      // Prevent default to avoid scrolling issues
      e.preventDefault();
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      isTouching = false;

      // Handle swipe gestures
      const swipeThreshold = 50; // Minimum distance for swipe
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > swipeThreshold) {
        if (swipeDistance > 0) {
          // Swipe right - go to previous slide
          prevSlide();
        } else {
          // Swipe left - go to next slide
          nextSlide();
        }
      }

      // Resume auto-play after touch interaction
      setTimeout(() => {
        autoPlayInterval = setInterval(nextSlide, 6000);
      }, 3000);
    });

    // Initialize
    createDots();
    updateCarousel();
  }

  private initializeLucideIcons() {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      if (typeof (window as any).lucide !== 'undefined') {
        (window as any).lucide.createIcons();
        console.log('Lucide icons initialized successfully');
      } else {
        console.warn('Lucide library not found, retrying...');
        // Retry after a short delay if library not loaded yet
        setTimeout(() => {
          if (typeof (window as any).lucide !== 'undefined') {
            (window as any).lucide.createIcons();
            console.log('Lucide icons initialized on retry');
          }
        }, 200);
      }
    } catch (error) {
      console.error('Error initializing Lucide icons:', error);
    }
  }

  // Send message via SMTP server
  async sendMessage(form: NgForm) {
    if (!form.valid || this.isSubmitting) return;

    this.isSubmitting = true;

    try {
      const formData = form.value;

      // Prepare email data
      const emailData = {
        to: 'pamela.lotriet@gmail.com', // Replace with your business email
        subject: `New Contact Form Message from ${formData.firstName} ${formData.lastName}`,
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact - The Zone Fitness</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">

            <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">

              <!-- Header -->
              <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 40px 32px; text-align: center;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">THE ZONE</h1>
                <p style="margin: 8px 0 0; font-size: 14px; opacity: 0.9; font-weight: 500;">HEALTH & FITNESS</p>
              </div>

              <!-- Content -->
              <div style="padding: 32px;">

                <!-- Contact Info -->
                <div style="margin-bottom: 32px;">
                  <h2 style="color: #111827; font-size: 20px; font-weight: 600; margin: 0 0 20px 0;">New Contact Message</h2>

                  <div style="background: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 20px;">
                    <div style="margin-bottom: 16px;">
                      <span style="color: #6b7280; font-size: 14px; font-weight: 500;">Name</span>
                      <div style="color: #111827; font-size: 16px; font-weight: 600; margin-top: 4px;">${formData.firstName} ${formData.lastName}</div>
                    </div>

                    <div>
                      <span style="color: #6b7280; font-size: 14px; font-weight: 500;">Email</span>
                      <div style="color: #111827; font-size: 16px; font-weight: 600; margin-top: 4px;">
                        <a href="mailto:${formData.email}" style="color: #10b981; text-decoration: none;">${formData.email}</a>
                      </div>
                    </div>
                  </div>

                  <!-- Message -->
                  <div>
                    <span style="color: #6b7280; font-size: 14px; font-weight: 500;">Message</span>
                    <div style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-top: 8px;">
                      <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6;">${formData.message}</p>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div style="text-align: center; margin-bottom: 24px;">
                  <a href="mailto:${formData.email}?subject=Re: Your inquiry about The Zone Fitness"
                     style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 0 8px;">
                    Reply
                  </a>
                </div>

                <!-- Timestamp -->
                <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                    Received: ${new Date().toLocaleString()}
                  </p>
                </div>

              </div>

              <!-- Footer -->
              <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                  <strong>The Zone Health & Fitness</strong><br>
                  Wall Street, Rustenburg • Waterfall Business Park
                </p>
              </div>

            </div>

          </body>
          </html>
        `,
        text: `
New Contact Form Message

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

Message:
${formData.message}

---
The Zone Health & Fitness
Wall Street, Rustenburg - Waterfall Business Park
        `
      };

      // Send email to SMTP server
      const response = await this.http.post(`${this.smtpServerUrl}/send-email`, emailData).toPromise();

      // Show success toast
      this.showToast('success', 'Message Sent!', 'Thank you for contacting us. We\'ll get back to you soon.');

      // Reset form
      form.resetForm();

    } catch (error: any) {
      console.error('Error sending message:', error);

      // Show error toast with specific message
      let errorMessage = 'Please try again later or contact us directly.';

      if (error.status === 0) {
        errorMessage = 'Unable to connect to email server. Please check if the SMTP server is running.';
      } else if (error.error?.details) {
        errorMessage = error.error.details;
      }

      this.showToast('error', 'Failed to Send Message', errorMessage);
    } finally {
      this.isSubmitting = false;
    }
  }

  // Show toast notification
  showToast(type: 'success' | 'error', title: string, message: string) {
    this.toastType = type;
    this.toastTitle = title;
    this.toastMessage = message;

    // Force change detection if needed
    if (isPlatformBrowser(this.platformId)) {
      // Trigger change detection to ensure Angular updates the DOM
      this.cdr.detectChanges();
    }

    // Auto-hide toast after 5 seconds
    setTimeout(() => {
      this.closeToast();
    }, 5000);
  }

  // Close toast notification
  closeToast() {
    this.toastMessage = '';
    this.toastTitle = '';
  }

  // Mobile menu methods
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  // Navigate to section and close mobile menu
  navigateToSection(sectionId: string) {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.closeMobileMenu();
  }
}

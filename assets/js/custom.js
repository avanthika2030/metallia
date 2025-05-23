/**
 * Custom JavaScript for Metallia Website
 */
document.addEventListener('DOMContentLoaded', function() {
  "use strict";

  /**
   * Custom Preloader
   */
  const preloader = document.querySelector('#custom-preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 600);
      }, 500);
    });
  }

  /**
   * Mobile Navigation Toggle
   */
  const mobileNavToggle = document.querySelector('.menu-toggle');
  const mainNavigation = document.querySelector('.main-navigation');

  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function(e) {
      document.querySelector('body').classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
      mainNavigation.classList.toggle('mobile-nav-show');
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('.main-navigation a').forEach(navLink => {
    navLink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        document.querySelector('body').classList.remove('mobile-nav-active');
        mobileNavToggle.classList.toggle('bi-list');
        mobileNavToggle.classList.toggle('bi-x');
        mainNavigation.classList.remove('mobile-nav-show');
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.main-navigation .dropdown-toggle').forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function(e) {
      if (window.innerWidth < 1200) {
        e.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');
      }
    });
  });

  /**
   * Scroll event for header background change
   */
  function toggleHeaderClass() {
    const selectHeader = document.querySelector('#main-header');
    if (selectHeader) {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    }
  }

  window.addEventListener('load', toggleHeaderClass);
  document.addEventListener('scroll', toggleHeaderClass);

  /**
   * Scroll to top button
   */
  const scrollTop = document.querySelector('#scroll-top');
  if (scrollTop) {
    const toggleScrollTop = function() {
      if (window.scrollY > 300) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    }
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);

    scrollTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Smooth scroll for navigation links
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.hash && this.hash !== '#') {
        e.preventDefault();

        const targetElement = document.querySelector(this.hash);
        if (targetElement) {
          const headerOffset = document.querySelector('#main-header').offsetHeight;
          const targetPosition = targetElement.offsetTop - headerOffset;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  /**
   * Animation on scroll using AOS
   */
  function initAOS() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', initAOS);

  /**
   * Initialize Swiper sliders
   */
  function initSwipers() {
    document.querySelectorAll('.init-swiper').forEach(function(swiperContainer) {
      let configElement = swiperContainer.querySelector('.swiper-config');

      if (configElement) {
        try {
          let config = JSON.parse(configElement.textContent);
          new Swiper(swiperContainer, config);
        } catch (error) {
          console.error('Error initializing Swiper:', error);
        }
      }
    });
  }

  window.addEventListener('load', initSwipers);

  /**
   * Initialize GLightbox
   */
  function initGLightbox() {
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }

  window.addEventListener('load', initGLightbox);

  /**
   * Initialize Isotope layout for portfolio/gallery
   */
  function initIsotope() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeContainer) {
      let layout = isotopeContainer.getAttribute('data-layout') || 'masonry';
      let defaultFilter = isotopeContainer.getAttribute('data-default-filter') || '*';

      let iso = new Isotope(isotopeContainer.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout
      });

      // Initial filter
      iso.arrange({
        filter: defaultFilter
      });

      // Filter items on click
      isotopeContainer.querySelectorAll('.isotope-filters li').forEach(function(filterItem) {
        filterItem.addEventListener('click', function() {
          isotopeContainer.querySelector('.filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          iso.arrange({
            filter: this.getAttribute('data-filter')
          });
        });
      });
    });
  }

  // Initialize Isotope after images are loaded
  window.addEventListener('load', function() {
    const isotopeContainers = document.querySelectorAll('.isotope-layout');
    if (isotopeContainers.length > 0) {
      imagesLoaded(document.querySelector('body'), function() {
        initIsotope();
      });
    }
  });

  /**
   * Custom form validation
   */
  function initFormValidation() {
    const forms = document.querySelectorAll('.custom-form');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        e.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });

        if (isValid) {
          // Here you would typically send the form data to a server
          // For now, just show a success message
          const successMessage = document.createElement('div');
          successMessage.className = 'alert alert-success mt-3';
          successMessage.textContent = 'Form submitted successfully!';
          form.appendChild(successMessage);

          // Reset form
          form.reset();

          // Remove success message after 3 seconds
          setTimeout(() => {
            successMessage.remove();
          }, 3000);
        }
      });
    });
  }

  window.addEventListener('load', initFormValidation);
});

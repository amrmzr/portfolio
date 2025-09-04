// Entry point JS
document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    easing: 'ease',
    once: true,
    mirror: false,
    offset: 50,
  });

  // Responsive navbar toggle for Bootstrap with icon toggle
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarNav = document.querySelector('#navbarNav');

  // Define icons
  const hamburgerIcon = '<span class="navbar-toggler-icon"></span>';
  const closeIcon = '<i class="fas fa-times"></i>';

  // Store initial state (make it global so other functions can access it)
  window.isMenuOpen = false;

  if (navbarToggler && navbarNav) {
    // Force reset the icon to hamburger on page load
    navbarToggler.innerHTML = hamburgerIcon;

    // Simple toggle approach - override Bootstrap's default behavior
    navbarToggler.addEventListener('click', (event) => {
      window.isMenuOpen = !window.isMenuOpen;

      if (window.isMenuOpen) {
        // Change to close icon when open
        navbarToggler.innerHTML = closeIcon;
        navbarToggler.classList.add('is-active');
      } else {
        // Change to hamburger icon when closed
        navbarToggler.innerHTML = hamburgerIcon;
        navbarToggler.classList.remove('is-active');
      }

      // Let Bootstrap's default data-bs-toggle behavior handle the actual collapse
    });

    // Make sure navbar closes and icon resets when clicking a link
    document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (isMenuOpen) {
          isMenuOpen = false;
          navbarToggler.innerHTML = hamburgerIcon;
          navbarToggler.classList.remove('is-active');
        }
      });
    });

    // Close navbar and reset icon when clicking outside
    document.addEventListener('click', (event) => {
      const isClickInsideNavbar =
        navbarNav.contains(event.target) ||
        navbarToggler.contains(event.target);

      if (isMenuOpen && !isClickInsideNavbar) {
        isMenuOpen = false;
        navbarToggler.innerHTML = hamburgerIcon;
        navbarToggler.classList.remove('is-active');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      // If menu is open and click is outside navbar
      if (
        navbarNav.classList.contains('show') &&
        !navbarNav.contains(event.target) &&
        !navbarToggler.contains(event.target)
      ) {
        // Use Bootstrap's collapse method to hide the menu
        if (bsCollapse) {
          bsCollapse.hide();
        } else {
          // Fallback if Bootstrap isn't initialized
          navbarNav.classList.remove('show');
          updateToggleButton(false);
        }
      }
    });

    // Add click event listeners to all navbar links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        // Always close the navbar when clicking a nav link
        if (navbarNav.classList.contains('show')) {
          // Use Bootstrap's collapse method
          if (bsCollapse) {
            bsCollapse.hide();
          } else {
            navbarNav.classList.remove('show');
            updateToggleButton(false);
          }
        }
      });
    });
  } // Legacy navbar toggle for non-Bootstrap
  // const menuToggle = document.querySelector('.menu-toggle');
  // const navLinks = document.querySelector('.nav-links');

  // if (menuToggle && navLinks) {
  //   menuToggle.addEventListener('click', () => {
  //     navLinks.classList.toggle('active');

  //     // Toggle aria-expanded attribute for accessibility
  //     const isExpanded = navLinks.classList.contains('active');
  //     menuToggle.setAttribute('aria-expanded', isExpanded);
  //   });
  // }

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition =
          targetElement.getBoundingClientRect().top +
          window.pageYOffset -
          navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });

        // First, check if this is a nav link within the navbar
        const isNavLink = this.closest('.navbar-nav') !== null;

        // Close Bootstrap navbar if open
        // We'll always attempt to close the navbar when clicking any anchor link
        // This ensures mobile menu closes when selecting a link
        const navbarNav = document.querySelector('#navbarNav');
        if (navbarNav && navbarNav.classList.contains('show')) {
          // Update our global state variable
          window.isMenuOpen = false;

          // Let Bootstrap handle the collapse
          // This will trigger the data-bs-toggle collapse
          const navbarToggler = document.querySelector('.navbar-toggler');
          if (navbarToggler) {
            // Reset to hamburger icon
            navbarToggler.innerHTML =
              '<span class="navbar-toggler-icon"></span>';
            navbarToggler.classList.remove('is-active');
            navbarToggler.setAttribute('aria-expanded', 'false');
          }

          // Force collapse
          navbarNav.classList.remove('show');
        }

        // If this is a nav link in the mobile menu, make sure the menu closes
        if (isNavLink && window.innerWidth < 992) {
          // Update our global state variable
          window.isMenuOpen = false;

          const navbarNav = document.querySelector('#navbarNav');
          if (navbarNav) {
            navbarNav.classList.remove('show');
          }

          const navbarToggler = document.querySelector('.navbar-toggler');
          if (navbarToggler) {
            // Make sure the hamburger icon is showing
            navbarToggler.innerHTML =
              '<span class="navbar-toggler-icon"></span>';
            navbarToggler.classList.remove('is-active');
            navbarToggler.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Update copyright year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();

  // Add hover animation to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.classList.add('animate__animated', 'animate__pulse');
    });

    card.addEventListener('mouseleave', function () {
      this.classList.remove('animate__animated', 'animate__pulse');
    });
  });
});

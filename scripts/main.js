/* ===================================
   3D DJ's Entertainment - Main JavaScript
   Premium DJ Entertainment Website
   =================================== */

document.addEventListener('DOMContentLoaded', function () {
  // ===== SPLASH INTRO =====
  const splash = document.getElementById('splash');
  const splashImages = splash.querySelectorAll('.splash__bg-image');
  let currentSplashImage = 0;

  // Start background photo crossfade
  function animateSplashImages() {
    if (splashImages.length === 0) return;

    splashImages[currentSplashImage].style.opacity = '0.2';

    setTimeout(() => {
      splashImages[currentSplashImage].style.opacity = '0';
      currentSplashImage = (currentSplashImage + 1) % splashImages.length;
      splashImages[currentSplashImage].style.opacity = '0.2';
    }, 1500);
  }

  // Start splash image animation
  setTimeout(() => {
    animateSplashImages();
  }, 500);

  // Hide splash after 3 seconds
  setTimeout(() => {
    splash.classList.add('splash--hidden');
    document.body.style.overflow = 'auto';
  }, 3000);

  // ===== NAVIGATION =====
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  // Sticky nav on scroll
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll);

  // Mobile menu toggle
  function openMobileMenu() {
    mobileMenu.classList.add('mobile-menu--open');
    mobileOverlay.classList.add('mobile-menu__overlay--visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('mobile-menu--open');
    mobileOverlay.classList.remove('mobile-menu__overlay--visible');
    document.body.style.overflow = 'auto';
  }

  navToggle.addEventListener('click', openMobileMenu);
  mobileClose.addEventListener('click', closeMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNavLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('nav__link--active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);

  // ===== HERO BACKGROUND CROSSFADE =====
  const heroImages = document.querySelectorAll('.hero__bg-image');
  let currentHeroImage = 0;

  function cycleHeroImages() {
    if (heroImages.length === 0) return;

    heroImages[currentHeroImage].classList.remove('hero__bg-image--active');
    currentHeroImage = (currentHeroImage + 1) % heroImages.length;
    heroImages[currentHeroImage].classList.add('hero__bg-image--active');
  }

  setInterval(cycleHeroImages, 5000);

  // ===== SCROLL REVEAL ANIMATIONS =====
  const revealElements = document.querySelectorAll('.reveal');
  const revealStaggerElements = document.querySelectorAll('.reveal-stagger');

  const revealObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-stagger--visible');
        staggerObserver.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach(el => revealObserver.observe(el));
  revealStaggerElements.forEach(el => staggerObserver.observe(el));

  // ===== DJ MODAL =====
  const djCards = document.querySelectorAll('.dj-card');
  const modal = document.getElementById('djModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalClose = document.getElementById('modalClose');
  const modalImage = document.getElementById('modalImage');
  const modalName = document.getElementById('modalName');
  const modalTags = document.getElementById('modalTags');
  const modalBio = document.getElementById('modalBio');

  const djData = {
    dj1: {
      name: 'DJ Marcus',
      image: 'assets/dj-1.jpg',
      tags: ['Wedding Specialist', 'Bilingual', 'MC Services', '15+ Years'],
      bio: 'DJ Marcus has been the heartbeat of Las Vegas weddings for over 15 years. His ability to read the crowd and create seamless transitions keeps dance floors packed all night. Fluent in English and Spanish, Marcus brings a warm, personable energy that puts couples at ease while delivering an unforgettable celebration. His specialty is crafting the perfect musical journey from ceremony to last dance.'
    },
    dj2: {
      name: 'DJ Aria',
      image: 'assets/dj-2.jpg',
      tags: ['Corporate Events', 'Galas', 'Professional', '10+ Years'],
      bio: 'DJ Aria is the go-to choice for Fortune 500 companies and high-profile galas in Las Vegas. Her sophisticated approach to event entertainment combines impeccable music selection with flawless execution. Aria understands the nuances of corporate culture and knows exactly how to set the right tone for networking events, awards ceremonies, and company celebrations.'
    },
    dj3: {
      name: 'DJ Rex',
      image: 'assets/dj-3.jpg',
      tags: ['Private Parties', 'High Energy', 'Club Style', '8+ Years'],
      bio: 'When you want a party that rivals the best Vegas nightclubs, you call DJ Rex. Known for his high-energy sets and seamless mixing, Rex brings the club experience to private events. His extensive knowledge of hip-hop, EDM, and top 40 makes him the perfect choice for birthdays, bachelor/bachelorette parties, and any event where the goal is to dance until dawn.'
    }
  };

  function openModal(djId) {
    const dj = djData[djId];
    if (!dj) return;

    modalImage.src = dj.image;
    modalImage.alt = dj.name;
    modalName.textContent = dj.name;
    modalTags.innerHTML = dj.tags.map(tag => `<span class="modal__tag">${tag}</span>`).join('');
    modalBio.textContent = dj.bio;

    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('modal--open');
    document.body.style.overflow = 'auto';
  }

  djCards.forEach(card => {
    card.addEventListener('click', () => {
      const djId = card.getAttribute('data-dj');
      openModal(djId);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
      closeModal();
    }
  });

  // ===== CALENDAR =====
  const calendarGrid = document.getElementById('calendarGrid');
  const calendarTitle = document.getElementById('calendarTitle');
  const calendarPrev = document.getElementById('calendarPrev');
  const calendarNext = document.getElementById('calendarNext');

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();

  // Demo booked dates (random dates for demonstration)
  const bookedDates = [
    { month: 1, day: 14 },  // Feb 14
    { month: 1, day: 21 },  // Feb 21
    { month: 2, day: 7 },   // Mar 7
    { month: 2, day: 15 },  // Mar 15
    { month: 2, day: 22 },  // Mar 22
    { month: 3, day: 5 },   // Apr 5
    { month: 3, day: 19 },  // Apr 19
  ];

  const availableDates = [
    { month: 1, day: 7 },
    { month: 1, day: 8 },
    { month: 1, day: 15 },
    { month: 1, day: 22 },
    { month: 1, day: 28 },
    { month: 2, day: 1 },
    { month: 2, day: 8 },
    { month: 2, day: 14 },
    { month: 2, day: 21 },
    { month: 2, day: 28 },
  ];

  function isBooked(month, day) {
    return bookedDates.some(d => d.month === month && d.day === day);
  }

  function isAvailable(month, day) {
    return availableDates.some(d => d.month === month && d.day === day);
  }

  function renderCalendar() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    calendarTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    // Clear previous days (keep headers)
    const headers = calendarGrid.querySelectorAll('.calendar__day-header');
    calendarGrid.innerHTML = '';
    headers.forEach(h => calendarGrid.appendChild(h));

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar__day calendar__day--other-month';
      dayEl.textContent = daysInPrevMonth - i;
      calendarGrid.appendChild(dayEl);
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'calendar__day';
      dayEl.textContent = day;

      if (isBooked(currentMonth, day)) {
        dayEl.classList.add('calendar__day--booked');
      } else if (isAvailable(currentMonth, day)) {
        dayEl.classList.add('calendar__day--available');
        dayEl.addEventListener('click', () => {
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
      }

      calendarGrid.appendChild(dayEl);
    }

    // Next month days
    const totalCells = firstDay + daysInMonth;
    const remainingCells = 7 - (totalCells % 7);
    if (remainingCells < 7) {
      for (let i = 1; i <= remainingCells; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar__day calendar__day--other-month';
        dayEl.textContent = i;
        calendarGrid.appendChild(dayEl);
      }
    }
  }

  calendarPrev.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar();
  });

  calendarNext.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar();
  });

  renderCalendar();

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  // Add hidden fields for Formsubmit configuration
  const hiddenFields = [
    { name: '_subject', value: '3D DJs Entertainment - New Event Inquiry' },
    { name: '_captcha', value: 'false' },
    { name: '_template', value: 'table' }
  ];

  hiddenFields.forEach(field => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = field.name;
    input.value = field.value;
    contactForm.appendChild(input);
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('.form__submit');
    submitBtn.classList.add('form__submit--loading');

    fetch(this.action, {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    }).then(function () {
      contactForm.style.display = 'none';
      formSuccess.classList.add('form__success--visible');
    }).catch(function () {
      contactForm.style.display = 'none';
      formSuccess.classList.add('form__success--visible');
    });
  });

  // ===== GALLERY FILTERS =====
  const galleryFilters = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  galleryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilters.forEach(b => b.classList.remove('gallery__filter--active'));
      btn.classList.add('gallery__filter--active');
      const cat = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.classList.remove('gallery__item--hidden');
        } else {
          item.classList.add('gallery__item--hidden');
        }
      });
    });
  });

  // ===== GALLERY VIDEO PLAYBACK =====
  document.querySelectorAll('.gallery__item--video').forEach(item => {
    const video = item.querySelector('video');
    item.addEventListener('click', e => {
      e.stopPropagation();
      if (video.paused) {
        document.querySelectorAll('.gallery__item--video').forEach(other => {
          const v = other.querySelector('video');
          if (v !== video) { v.pause(); other.classList.remove('is-playing'); }
        });
        video.play();
        item.classList.add('is-playing');
      } else {
        video.pause();
        item.classList.remove('is-playing');
      }
    });
    video.addEventListener('ended', () => item.classList.remove('is-playing'));
  });

  // ===== GALLERY LIGHTBOX =====
  const lightbox = document.createElement('div');
  lightbox.className = 'gallery-lightbox';
  lightbox.innerHTML = '<button class="gallery-lightbox__close">&times;</button><div class="gallery-lightbox__media"></div>';
  document.body.appendChild(lightbox);
  const lbMedia = lightbox.querySelector('.gallery-lightbox__media');
  const lbClose = lightbox.querySelector('.gallery-lightbox__close');

  galleryItems.forEach(item => {
    if (item.classList.contains('gallery__item--video')) return;
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      lbMedia.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
      lightbox.classList.add('gallery-lightbox--visible');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('gallery-lightbox--visible');
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

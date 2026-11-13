/**
 * Shelomi Suzan Nebu — "Curiosity in Orbit" High-Performance Engine
 * Engineered for buttery 60fps/120fps scrolling with zero layout thrashing:
 * 1. Geometry caching: layout measurements run strictly on init/resize
 * 2. State latching: DOM classes update ONLY on boundary crossings
 * 3. Composite-only transitions without CPU rasterization filters
 * 4. Pinned storytelling chapter transitions (Layer 2)
 * 5. Fullscreen coursework lightbox & 1-click email copy utility
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const header = document.getElementById('header');
  const hero = document.getElementById('hero');
  const storyTrack = document.getElementById('story');
  const curtainStage = document.getElementById('about');
  const orbitStar = document.getElementById('orbitStar');
  const orbitTrack = document.querySelector('.orbit-star-track');
  const motionToggle = document.getElementById('motionToggle');
  const motionBtnText = motionToggle ? motionToggle.querySelector('.motion-btn-text') : null;

  const slides = Array.from(document.querySelectorAll('.story-slide'));
  const hudTicks = Array.from(document.querySelectorAll('.hud-progress-ticks .tick'));

  const navTargets = [
    { id: 'hero', element: hero },
    { id: 'story', element: storyTrack },
    { id: 'work', element: document.getElementById('work') },
    { id: 'learning', element: document.getElementById('learning') },
    { id: 'outside', element: document.getElementById('outside') },
    { id: 'journey', element: document.getElementById('journey') }
  ];
  const navLinks = Array.from(document.querySelectorAll('.desktop-nav .nav-link'));

  // ========================================================
  // 1. MOTION PREFERENCE & CONTROLS
  // ========================================================
  const systemReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const savedMotion = localStorage.getItem('shelomi-motion');
  let isMotionPaused = savedMotion ? savedMotion === 'paused' : systemReduced;

  applyMotionState();

  if (motionToggle) {
    motionToggle.addEventListener('click', () => {
      isMotionPaused = !isMotionPaused;
      localStorage.setItem('shelomi-motion', isMotionPaused ? 'paused' : 'normal');
      applyMotionState();
      showToast(isMotionPaused ? 'Motion paused ✦' : 'Motion enabled ✦');
    });
  }

  function applyMotionState() {
    body.setAttribute('data-motion', isMotionPaused ? 'paused' : 'normal');
    if (motionToggle) {
      motionToggle.setAttribute('aria-pressed', String(isMotionPaused));
      if (motionBtnText) {
        motionBtnText.textContent = isMotionPaused ? 'Enable motion' : 'Pause motion';
      }
    }
    if (isMotionPaused && orbitStar) {
      orbitStar.style.transform = 'translate(-50%, 0)';
    }

    if (typeof gsap !== 'undefined') {
      if (isMotionPaused) {
        gsap.globalTimeline.pause();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.getAll().forEach(st => st.disable());
        }
      } else {
        gsap.globalTimeline.play();
        if (typeof ScrollTrigger !== 'undefined') {
          ScrollTrigger.getAll().forEach(st => st.enable());
          ScrollTrigger.refresh();
        }
      }
    }
  }

  // ========================================================
  // 1.5 GSAP 3 & SCROLLTRIGGER CINEMATIC PARALLAX SUITE
  // Inspired by Maryl Gonzalez & Dmitrii Naumov templates
  // ========================================================
  if (typeof Splitting !== 'undefined') {
    Splitting();
  }

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero entrance timeline
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl
      .from('.hero-badge-pill', {
        opacity: 0,
        y: -18,
        duration: 0.9,
        delay: 0.1
      })
      .from('.hero-pretitle', {
        opacity: 0,
        y: 20,
        duration: 0.9
      }, '-=0.6')
      .from('.hero-headline .char', {
        opacity: 0,
        yPercent: 120,
        rotateX: -45,
        stagger: 0.022,
        duration: 1.0,
        ease: 'back.out(1.2)'
      }, '-=0.6')
      .from('.hero-lead', {
        opacity: 0,
        y: 20,
        duration: 0.9
      }, '-=0.5')
      .from(['.hero-actions', '.stage-scroll-prompt'], {
        opacity: 0,
        y: 18,
        stagger: 0.12,
        duration: 0.8
      }, '-=0.6')
      .from(['.cosmic-disc', '.star-1', '.star-2', '.star-3'], {
        opacity: 0,
        scale: 0.6,
        duration: 1.6,
        stagger: 0.15,
        ease: 'power2.out'
      }, '-=1.4');

    // Hero multi-layer scroll parallax (exit scrub)
    gsap.to('.hero-centerpiece', {
      scrollTrigger: {
        trigger: '.stage-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      yPercent: -30,
      opacity: 0.2,
      ease: 'none'
    });

    gsap.to('.cosmic-disc', {
      scrollTrigger: {
        trigger: '.stage-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      yPercent: 40,
      ease: 'none'
    });

    gsap.to('.star-1', {
      scrollTrigger: {
        trigger: '.stage-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      yPercent: -75,
      rotate: 360,
      ease: 'none'
    });

    gsap.to('.star-2', {
      scrollTrigger: {
        trigger: '.stage-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.8
      },
      yPercent: -110,
      rotate: -360,
      ease: 'none'
    });

    gsap.to('.star-3', {
      scrollTrigger: {
        trigger: '.stage-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2
      },
      yPercent: -50,
      rotate: 240,
      ease: 'none'
    });

    // Continuous Scroll-Scrubbed Celestial Star Rotations
    const markerStars = gsap.utils.toArray('.marker-star');
    markerStars.forEach((star) => {
      gsap.to(star, {
        scrollTrigger: {
          trigger: star,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        },
        rotate: 720,
        ease: 'none'
      });
    });

    // Umami House Artwork Inner Frame Parallax
    const galleryItemsArr = gsap.utils.toArray('.gallery-item');
    galleryItemsArr.forEach((item) => {
      const img = item.querySelector('.artwork-frame img');
      if (img) {
        gsap.fromTo(img,
          { scale: 1.1, yPercent: -3 },
          {
            scale: 1.0,
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.6
            }
          }
        );
      }
    });
  }

  // ========================================================
  // 2. CACHED GEOMETRY ENGINE (Zero Layout Reads During Scroll)
  // ========================================================
  let storyOffsetTop = 0;
  let storyTotalScroll = 1;
  let curtainOffsetTop = 99999;
  let docScrollableHeight = 1;
  let trackHeight = 0;
  let trackScreenX = 0;
  let sectionOffsets = [];

  function measureLayout() {
    const winHeight = window.innerHeight;

    if (storyTrack) {
      storyOffsetTop = storyTrack.offsetTop;
      storyTotalScroll = Math.max(storyTrack.offsetHeight - winHeight, 1);
    }

    if (curtainStage) {
      curtainOffsetTop = curtainStage.offsetTop;
    }

    if (orbitTrack) {
      trackHeight = Math.max(orbitTrack.offsetHeight - 32, 0);
      trackScreenX = orbitTrack.getBoundingClientRect().left + 18;
    }

    docScrollableHeight = Math.max(document.documentElement.scrollHeight - winHeight, 1);

    sectionOffsets = navTargets.map(target => {
      if (target.element) {
        const top = target.element.offsetTop;
        const height = target.element.offsetHeight;
        return {
          id: target.id,
          top: top,
          bottom: top + height
        };
      }
      return null;
    }).filter(Boolean);
  }

  // Run measurement initially after fonts/styles load
  measureLayout();
  window.addEventListener('load', measureLayout);

  let resizeDebounceTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounceTimer);
    resizeDebounceTimer = setTimeout(() => {
      measureLayout();
      updateScrollVisuals();
      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 60);
  }, { passive: true });

  // ========================================================
  // 3. BUTTER-SMOOTH SCROLL VISUALS (0ms Layout Cost)
  // ========================================================
  let isScrolling = false;
  let activeSlideIndex = 0;
  let isLightCurtainActive = false;
  let currentNavId = '';
  let lastOrbitSpawnX = -100;
  let lastOrbitSpawnY = -100;
  let spawnStarParticle = null;

  function updateScrollVisuals() {
    const scrollY = window.scrollY;

    // --- A. THEATRICAL CURTAIN & HEADER PALETTE SHIFT ---
    // Only mutates DOM class when boundary actually crosses
    const isOverLight = (scrollY >= (curtainOffsetTop - 72));
    if (isOverLight !== isLightCurtainActive) {
      isLightCurtainActive = isOverLight;
      body.classList.toggle('on-light-curtain', isLightCurtainActive);
      header.classList.toggle('scrolled-light', isLightCurtainActive);
    }

    // --- B. LAYER 2 PINNED STORYTELLING CHAPTER SWITCHER ---
    if (storyTotalScroll > 0) {
      const scrolledInside = scrollY - storyOffsetTop;
      const progress = Math.min(Math.max(scrolledInside / storyTotalScroll, 0), 1);

      let newIndex = 0;
      if (progress >= 0.66) {
        newIndex = 2;
      } else if (progress >= 0.33) {
        newIndex = 1;
      }

      if (newIndex !== activeSlideIndex) {
        activeSlideIndex = newIndex;
        updateSlideClasses(activeSlideIndex);
      }
    }

    // --- C. HARDWARE ACCELERATED ORBITING GUIDE STAR & STARDUST COMET TRAIL ---
    if (!isMotionPaused && orbitStar && trackHeight > 0) {
      const progress = Math.min(Math.max(scrollY / docScrollableHeight, 0), 1);
      const yPos = progress * trackHeight;
      const xWave = Math.sin(progress * Math.PI * 3) * 14;
      const rotation = progress * 360;

      orbitStar.style.transform = `translate3d(calc(-50% + ${xWave.toFixed(1)}px), ${yPos.toFixed(1)}px, 0) rotate(${rotation.toFixed(1)}deg)`;

      // Emit celestial comet trail particles behind the star on scroll
      if (window.innerWidth >= 1100 && typeof spawnStarParticle === 'function') {
        const starScreenX = trackScreenX + xWave;
        const starScreenY = 90 + yPos + 11;
        const dist = Math.hypot(starScreenX - lastOrbitSpawnX, starScreenY - lastOrbitSpawnY);

        if (dist >= 12) {
          spawnStarParticle(starScreenX, starScreenY, rotation);
          lastOrbitSpawnX = starScreenX;
          lastOrbitSpawnY = starScreenY;
        }
      }
    }

    // --- D. FAST NAV SCROLLSPY ---
    updateNavHighlightFast(scrollY);

    isScrolling = false;
  }

  function updateSlideClasses(activeIndex) {
    slides.forEach((slide, idx) => {
      if (idx === activeIndex) {
        slide.classList.add('active');
        slide.classList.remove('past');
      } else if (idx < activeIndex) {
        slide.classList.remove('active');
        slide.classList.add('past');
      } else {
        slide.classList.remove('active');
        slide.classList.remove('past');
      }
    });

    hudTicks.forEach((tick, idx) => {
      tick.classList.toggle('active', idx === activeIndex);
    });
  }

  function updateNavHighlightFast(scrollY) {
    const scrollMid = scrollY + (window.innerHeight * 0.35);
    let activeId = 'hero';

    for (let i = 0; i < sectionOffsets.length; i++) {
      const s = sectionOffsets[i];
      if (scrollMid >= s.top && scrollMid < s.bottom) {
        activeId = s.id;
        break;
      }
    }

    if (activeId !== currentNavId) {
      currentNavId = activeId;
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const matches = (href === `#${activeId}`) ||
                        (href === '#about' && (activeId === 'story' || activeId === 'work'));
        link.classList.toggle('active', matches);
      });
    }
  }

  // Clickable HUD ticks for quick jump between slides
  hudTicks.forEach((tick) => {
    tick.addEventListener('click', () => {
      const step = parseInt(tick.getAttribute('data-step'), 10);
      if (isNaN(step) || !storyTrack) return;

      const targetScroll = storyOffsetTop + (step * (storyTotalScroll / 2));
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    });
  });

  function onScroll() {
    if (!isScrolling) {
      requestAnimationFrame(updateScrollVisuals);
      isScrolling = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollVisuals();

  // ========================================================
  // 4. UMAMI HOUSE GALLERY LIGHTBOX VIEWER
  // ========================================================
  const GALLERY_ITEMS = [
    {
      src: 'assets/umami-house-polaroid.jpg',
      alt: 'Umami House visual branding poster featuring an illustrated ramen bowl with chopsticks, soft gradient backdrop, and social links',
      index: '01 / 05',
      title: 'Brand Identity & Illustrated Bowl',
      desc: 'Visual branding coursework created in Canva. Pairs warm retro grid accents, hand-drawn food artwork, and social frame layout elements for a warm Japanese ramen concept.'
    },
    {
      src: 'assets/umami-house-delivery.jpg',
      alt: 'Umami House promotional poster on dark background reading: Craving Ramen? We Deliver. Fresh, Fast, Flavourful',
      index: '02 / 05',
      title: 'Delivery & Takeaway Promotion',
      desc: 'High-contrast promotional poster exploring bold typographic composition, food photography placement, and clear service tags (Dine in, Takeaway, Delivery).'
    },
    {
      src: 'assets/umami-house-one-bite.jpg',
      alt: 'Umami House poster with bold red grid and headline: Good food should do more than just taste good — One Bite Away',
      index: '03 / 05',
      title: '“One Bite Away” Campaign Poster',
      desc: 'Vibrant red grid design featuring illustrated rising steam elements and layered headline typography, highlighting the sensory appeal of ramen.'
    },
    {
      src: 'assets/umami-house-discount.jpg',
      alt: 'Umami House 50 percent off promotional design with red, yellow, and pixelated Ramen typography',
      index: '04 / 05',
      title: 'Promotional Offer & Pixel Typography',
      desc: 'Split-palette promotional concept combining bold warm colour blocking, hand-drawn circular callouts, and retro pixel-style display lettering.'
    },
    {
      src: 'assets/umami-house-review.jpg',
      alt: 'Coursework design layout featuring a pinned customer review note over a repeated crimson hashtag background',
      index: '05 / 05',
      title: 'Review Social Layout · Sample Copy',
      desc: 'Coursework design mockup exploring tactile social proof presentation with a pinned-note aesthetic layered over a repeating graphic hashtag backdrop.'
    }
  ];

  const lightbox = document.getElementById('lightbox');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxIndex = document.getElementById('lightboxIndex');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const galleryItems = document.querySelectorAll('.gallery-item');

  let lastFocusedTrigger = null;

  function openLightbox(index, triggerBtn) {
    const item = GALLERY_ITEMS[index];
    if (!item || !lightbox) return;

    lastFocusedTrigger = triggerBtn;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxIndex.textContent = item.index;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';

    if (lightboxClose) {
      setTimeout(() => lightboxClose.focus(), 60);
    }
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';

    if (lastFocusedTrigger) {
      lastFocusedTrigger.focus();
      lastFocusedTrigger = null;
    }
  }

  galleryItems.forEach(article => {
    const btn = article.querySelector('.gallery-trigger');
    const idx = parseInt(article.getAttribute('data-index'), 10);
    if (btn && !isNaN(idx)) {
      btn.addEventListener('click', () => openLightbox(idx, btn));
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  // ========================================================
  // 5. MOBILE DRAWER NAVIGATION
  // ========================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    drawerBackdrop.setAttribute('aria-hidden', 'false');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    body.style.overflow = 'hidden';
    if (drawerCloseBtn) setTimeout(() => drawerCloseBtn.focus(), 50);
  }

  function closeDrawer() {
    if (!mobileDrawer || !drawerBackdrop) return;
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    body.style.overflow = '';
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', closeDrawer);
  drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

  // Global Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && lightbox.classList.contains('open')) {
        closeLightbox();
      }
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    }
  });

  // ========================================================
  // 6. 1-CLICK EMAIL CLIPBOARD UTILITY
  // ========================================================
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'nebushelomi@gmail.com';

      try {
        await navigator.clipboard.writeText(email);
        const span = copyEmailBtn.querySelector('span');
        const originalText = span ? span.textContent : 'Copy email';
        if (span) span.textContent = 'Copied to clipboard! ✦';
        showToast(`Copied ${email} to clipboard!`);

        setTimeout(() => {
          if (span) span.textContent = originalText;
        }, 2200);
      } catch {
        showToast('Could not copy email — nebushelomi@gmail.com');
      }
    });
  }

  // ========================================================
  // 7. TOAST NOTIFICATION UTILITY
  // ========================================================
  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 2500);
  }

  // ========================================================
  // 8. CELESTIAL STARDUST CURSOR TRAIL (Screenshot Match)
  // High-performance canvas-based pointer bead & 4-point star trail
  // ========================================================
  const cursorCanvas = document.getElementById('cursorCanvas');
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (cursorCanvas && hasFinePointer) {
    const ctx = cursorCanvas.getContext('2d', { alpha: true });
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = window.devicePixelRatio || 1;

    function resizeCursorCanvas() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = window.devicePixelRatio || 1;
      cursorCanvas.width = width * dpr;
      cursorCanvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCursorCanvas();
    window.addEventListener('resize', resizeCursorCanvas, { passive: true });

    let mouseX = -100;
    let mouseY = -100;
    let curX = -100;
    let curY = -100;
    let lastSpawnX = -100;
    let lastSpawnY = -100;
    let isHovering = false;
    let currentBeadRadius = 6;
    let targetBeadRadius = 6;
    let isLoopRunning = false;
    let mouseHasEntered = false;

    const particles = [];
    const MAX_PARTICLES = 64;

    // Draw concave 4-point diamond star (astroid curve)
    function drawConcaveStar(ctx, x, y, r, rotation, alpha, color) {
      if (r <= 0.5 || alpha <= 0.01) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.fillStyle = color;
      ctx.globalAlpha = Math.max(alpha, 0);

      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.quadraticCurveTo(0, 0, 0, r);
      ctx.quadraticCurveTo(0, 0, -r, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Exposed function for the Orbiting Guide Star to cast comet stardust on scroll
    spawnStarParticle = function(x, y, rotation) {
      if (particles.length >= MAX_PARTICLES || isMotionPaused) return;

      const isLight = isLightCurtainActive;
      const starColorChoice = (Math.random() > 0.35)
        ? (isLight ? '#7864ed' : '#f0dfad')
        : (isLight ? '#9b89f5' : '#d4c4f0');

      particles.push({
        x: x,
        y: y,
        size: 7 + Math.random() * 3.5,
        alpha: 0.95,
        decay: 0.018 + Math.random() * 0.006,
        rotation: (rotation * Math.PI / 180) + (Math.random() - 0.5) * 0.6,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        color: starColorChoice
      });

      startLoopIfNeeded();
    };

    function renderCursor() {
      if (isMotionPaused) {
        ctx.clearRect(0, 0, width, height);
        isLoopRunning = false;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smoothly interpolate lead bead position towards target cursor
      curX += (mouseX - curX) * 0.42;
      curY += (mouseY - curY) * 0.42;

      // Smoothly interpolate bead radius on hover
      targetBeadRadius = isHovering ? 11 : 6;
      currentBeadRadius += (targetBeadRadius - currentBeadRadius) * 0.25;

      // Palette adaptation: dark cosmic stage vs warm ivory curtain
      const leadColor = isLightCurtainActive ? '#604cd9' : '#d4c4f0';
      const starColor = isLightCurtainActive ? '#7864ed' : '#b8a3db';
      const starGlowColor = isLightCurtainActive ? '#9b89f5' : '#f0dfad';

      // 1. Draw and update trailing star particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        p.size *= 0.965;
        p.rotation += p.rotSpeed;

        if (p.alpha <= 0.01 || p.size <= 0.8) {
          particles.splice(i, 1);
          continue;
        }

        drawConcaveStar(ctx, p.x, p.y, p.size, p.rotation, p.alpha, p.color);
      }

      // 2. Draw lead pointer bead
      if (mouseHasEntered && curX > 0 && curY > 0) {
        ctx.save();
        ctx.fillStyle = leadColor;
        ctx.shadowColor = leadColor;
        ctx.shadowBlur = isHovering ? 12 : 6;

        ctx.beginPath();
        ctx.arc(curX, curY, currentBeadRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle accent dot in center when hovering
        if (isHovering) {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(curX, curY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // Idle stop condition: if mouse is stationary and particles finished, sleep rAF
      const isMouseStationary = Math.abs(mouseX - curX) < 0.5 && Math.abs(mouseY - curY) < 0.5;
      if (isMouseStationary && particles.length === 0) {
        isLoopRunning = false;
        return;
      }

      requestAnimationFrame(renderCursor);
    }

    function startLoopIfNeeded() {
      if (!isLoopRunning && !isMotionPaused) {
        isLoopRunning = true;
        requestAnimationFrame(renderCursor);
      }
    }

    window.addEventListener('pointermove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!mouseHasEntered) {
        curX = mouseX;
        curY = mouseY;
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
        mouseHasEntered = true;
      }

      // Detect hover over interactive clickable elements
      const target = e.target;
      isHovering = !!(target && target.closest('a, button, [role="button"], input, textarea, .pill-btn, .tick, .gallery-trigger'));

      // Distance from last particle emission
      const dist = Math.hypot(mouseX - lastSpawnX, mouseY - lastSpawnY);
      if (dist >= 14 && particles.length < MAX_PARTICLES) {
        const starColorChoice = (Math.random() > 0.3)
          ? (isLightCurtainActive ? '#7864ed' : '#d4c4f0')
          : (isLightCurtainActive ? '#9b89f5' : '#f0dfad');

        particles.push({
          x: curX,
          y: curY,
          size: 6.5 + Math.random() * 2.5,
          alpha: 0.85,
          decay: 0.022 + Math.random() * 0.008,
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.04,
          color: starColorChoice
        });

        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
      }

      startLoopIfNeeded();
    }, { passive: true });

    window.addEventListener('pointerleave', () => {
      mouseHasEntered = false;
    }, { passive: true });
  }
});

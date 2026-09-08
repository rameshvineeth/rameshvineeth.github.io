// Interactive Helicopter Mascot Engine with Dynamic Spotlight Physics
// Supports both Hero Section and Outro/Contact Section with real-time spotlight beam
import { playBlip, playSuccessChime } from './sound.js';

// SVG markup for authentic Diving-Bell Cyber-Jelly mascot with spinning helicopter rotor
function getHelicopterSVGMarkup() {
  return `
    <div class="heli-character" aria-hidden="true">
      <svg class="heli-svg" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Cute Spinning Helicopter Rotor Blades on Top -->
        <g class="heli-propeller-group">
          <!-- Propeller Mast -->
          <line x1="40" y1="2" x2="40" y2="10" stroke="#4A2DB6" stroke-width="2.6" stroke-linecap="round"/>
          <!-- Spinning Rotor Blade Disc -->
          <g class="heli-rotor-spinning">
            <ellipse cx="40" cy="2.5" rx="26" ry="4" fill="#A3E635" stroke="#4A2DB6" stroke-width="1.8"/>
            <ellipse cx="40" cy="2.5" rx="16" ry="2.4" fill="#FACC15" opacity="0.85"/>
            <circle cx="40" cy="2.5" r="3" fill="#4A2DB6"/>
          </g>
        </g>

        <!-- Top Orange Saucer Cap & Antenna Pin -->
        <g class="tines-cap">
          <line x1="40" y1="9" x2="40" y2="15" stroke="#EA580C" stroke-width="2.6" stroke-linecap="round"/>
          <ellipse cx="40" cy="15.5" rx="12" ry="4.5" fill="#F97316" stroke="#4A2DB6" stroke-width="2.4"/>
        </g>

        <!-- Translucent Glass Bell Cloche Dome -->
        <path class="tines-dome" d="M 23 47 C 22 23, 28 16, 40 16 C 52 16, 58 23, 57 47" fill="#FAF7FE" stroke="#4A2DB6" stroke-width="2.8" stroke-linecap="round"/>
        <!-- Vertical Orange Center Seam Line -->
        <line x1="40" y1="16" x2="40" y2="46" stroke="#F97316" stroke-width="2" stroke-linecap="round"/>

        <!-- Glowing Orange Tiered Chamber & Resonant Bell Core -->
        <g class="tines-bell-core">
          <path d="M 30 47 C 30 59, 50 59, 50 47 Z" fill="#F97316" stroke="#4A2DB6" stroke-width="2.4"/>
          <ellipse cx="40" cy="54" rx="5.5" ry="3" fill="#FDBA74"/>
          <ellipse cx="40" cy="46.5" rx="18.5" ry="6" fill="#F97316" stroke="#4A2DB6" stroke-width="2.6"/>
          <ellipse cx="40" cy="45.5" rx="12" ry="3" fill="#FDBA74" opacity="0.75"/>
        </g>

        <!-- Front Umbilical Port Socket on Glass -->
        <rect x="46.5" y="26" width="7.5" height="12" rx="3.8" fill="#FFFFFF" stroke="#4A2DB6" stroke-width="2.4"/>

        <!-- Solid Deep Purple Tentacles / Octopus Arms -->
        <g class="tines-tentacles">
          <!-- Left Upward Tentacle holding Fork/Claw -->
          <g class="tentacle-claw-left">
            <path d="M 25 49 C 18 55, 12 63, 14 74 C 16 80, 23 80, 23 72 C 23 65, 23 58, 29 51 Z" fill="#4A2DB6"/>
            <path d="M 13 71 L 7 62 M 14 74 L 10 82" stroke="#4A2DB6" stroke-width="2.8" stroke-linecap="round"/>
            <polygon points="6,60 12,68 11,57" fill="#F97316"/>
          </g>

          <!-- Center-Left Curly Tentacle -->
          <path class="tentacle-sway-1" d="M 32 51 C 29 62, 31 77, 39 83 C 43 86, 47 81, 44 76 C 40 69, 38 60, 40 51 Z" fill="#4A2DB6"/>

          <!-- Center-Right Drooping Tentacle -->
          <path class="tentacle-sway-2" d="M 44 51 C 47 62, 53 73, 61 78 C 65 81, 68 76, 64 71 C 59 64, 53 57, 51 50 Z" fill="#4A2DB6"/>

          <!-- Far-Right Floating Tentacle Curl -->
          <path class="tentacle-sway-3" d="M 55 48 C 62 52, 70 60, 68 69 C 66 74, 60 72, 60 67" fill="none" stroke="#4A2DB6" stroke-width="4.2" stroke-linecap="round"/>
        </g>

        <!-- Flowing Orange Snorkel Tube connecting from Port -->
        <g class="tines-tube">
          <rect x="48" y="30" width="5" height="6" rx="1.6" fill="#4A2DB6"/>
          <path class="tube-sway" d="M 50 35 C 61 33, 73 37, 71 48 C 69 57, 55 60, 42 58 C 30 56, 23 64, 16 69" fill="none" stroke="#F97316" stroke-width="3.2" stroke-linecap="round"/>
        </g>
      </svg>
    </div>
  `;
}

// Sparkle burst helper on click flip
function spawnSparkles(parentEl) {
  const colors = ['#F472B6', '#FACC15', '#A3E635', '#C084FC', '#38BDF8'];
  for (let i = 0; i < 7; i++) {
    const spark = document.createElement('span');
    spark.className = 'heli-sparkle';
    spark.textContent = '✦';
    const angle = (i / 7) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
    const dist = 28 + Math.random() * 28;
    const sx = Math.cos(angle) * dist;
    const sy = Math.sin(angle) * dist - 18;
    spark.style.color = colors[i % colors.length];
    spark.style.setProperty('--tx', `${sx}px`);
    spark.style.setProperty('--ty', `${sy}px`);
    parentEl.appendChild(spark);
    setTimeout(() => spark.remove(), 750);
  }
}

// Factory function to create and animate a Helicopter Mascot in any section
function createHelicopterMascot(options) {
  const {
    section,
    heliId,
    beamPrefix,
    initialX = 200,
    initialY = 140,
    setupTargets = null,
    getAutonomousTarget = null
  } = options;

  if (!section) return null;

  // 1. Create Dynamic Section SVG Spotlight Beam Layer
  const beamLayer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  beamLayer.setAttribute('class', `heli-dynamic-beam-layer ${beamPrefix}-dynamic-beam-layer`);
  beamLayer.setAttribute('aria-hidden', 'true');
  beamLayer.innerHTML = `
    <defs>
      <!-- Refined Soft Pink Conical Spotlight Beam Gradient -->
      <linearGradient id="${beamPrefix}PinkBeamGrad" x1="0" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#F472B6" stop-opacity="0.48" />
        <stop offset="30%" stop-color="#FB7185" stop-opacity="0.32" />
        <stop offset="65%" stop-color="#FDA4AF" stop-opacity="0.18" />
        <stop offset="90%" stop-color="#FDE8F3" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#FDE8F3" stop-opacity="0.02" />
      </linearGradient>
      <!-- Refined Soft Pink Landing Glow Pool -->
      <radialGradient id="${beamPrefix}LandingRadial" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#F472B6" stop-opacity="0.35" />
        <stop offset="35%" stop-color="#FB7185" stop-opacity="0.20" />
        <stop offset="70%" stop-color="#FDA4AF" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#FDA4AF" stop-opacity="0" />
      </radialGradient>
      <filter id="${beamPrefix}PathGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="${beamPrefix}LandingSoftBlur" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="5" />
      </filter>
    </defs>
    <!-- Solid Dynamic Pink Conical Spotlight Beam -->
    <path class="heli-beam-path" id="${beamPrefix}-dynamic-path" fill="url(#${beamPrefix}PinkBeamGrad)" filter="url(#${beamPrefix}PathGlow)" d="" />
    <!-- Dynamic Landing Glow Pool on Hover Target -->
    <ellipse class="heli-beam-landing-glow" id="${beamPrefix}-landing-glow" fill="url(#${beamPrefix}LandingRadial)" filter="url(#${beamPrefix}LandingSoftBlur)" cx="0" cy="0" rx="0" ry="0" />
  `;
  section.appendChild(beamLayer);

  // 2. Create Helicopter Character Element
  const heliWrap = document.createElement('div');
  heliWrap.id = heliId;
  heliWrap.className = 'hero-heli-wrap';
  heliWrap.setAttribute('role', 'button');
  heliWrap.setAttribute('tabindex', '0');
  heliWrap.setAttribute('aria-label', 'Vineeth AI Explorer Drone. Click to do an aerial flip!');
  heliWrap.title = 'Vineeth AI Explorer Drone · Move mouse to project pink spotlight, click for aerial flip!';
  heliWrap.innerHTML = getHelicopterSVGMarkup();
  section.appendChild(heliWrap);

  const dynamicPath = beamLayer.querySelector(`#${beamPrefix}-dynamic-path`);
  const landingGlow = beamLayer.querySelector(`#${beamPrefix}-landing-glow`);
  const dynamicGrad = beamLayer.querySelector(`#${beamPrefix}PinkBeamGrad`);

  // Coordinates & Physics
  let x = initialX;
  let y = initialY;
  let targetHeliX = x;
  let targetHeliY = y;
  let vx = 0;
  let vy = 0;
  let time = Math.random() * 10;
  let isTargetHovered = false;
  let isFlipping = false;

  // Hover target coordinates
  let rawTargetX = x + 40;
  let rawTargetY = y + 120;
  let smoothTargetX = rawTargetX;
  let smoothTargetY = rawTargetY;

  // Beam Geometry: Projects radiant conical beam from drone belly searchlight down to target
  function updateDynamicBeam(heliOriginX, heliOriginY, beamTargetX, beamTargetY) {
    if (!dynamicPath || !landingGlow || !dynamicGrad) return;
    const vxBeam = beamTargetX - heliOriginX;
    const vyBeam = beamTargetY - heliOriginY;
    const dist = Math.max(10, Math.sqrt(vxBeam * vxBeam + vyBeam * vyBeam));

    const ux = vxBeam / dist;
    const uy = vyBeam / dist;
    const nx = -uy;
    const ny = ux;

    const w0 = 16; // Emitter lens at bottom of drone belly
    const w1 = Math.min(190, Math.max(90, dist * 0.65)); // Target pool width
    const angleRad = Math.atan2(vyBeam, vxBeam);
    const angleDeg = angleRad * (180 / Math.PI);

    const p0x = heliOriginX - nx * (w0 / 2);
    const p0y = heliOriginY - ny * (w0 / 2);
    const p1x = heliOriginX + nx * (w0 / 2);
    const p1y = heliOriginY + ny * (w0 / 2);

    const p2x = beamTargetX + nx * (w1 / 2);
    const p2y = beamTargetY + ny * (w1 / 2);
    const p3x = beamTargetX - nx * (w1 / 2);
    const p3y = beamTargetY - ny * (w1 / 2);

    const pmx = beamTargetX + ux * (w1 * 0.2);
    const pmy = beamTargetY + uy * (w1 * 0.2);

    const pathD = `M ${p0x.toFixed(1)} ${p0y.toFixed(1)} L ${p1x.toFixed(1)} ${p1y.toFixed(1)} L ${p2x.toFixed(1)} ${p2y.toFixed(1)} Q ${pmx.toFixed(1)} ${pmy.toFixed(1)} ${p3x.toFixed(1)} ${p3y.toFixed(1)} Z`;
    dynamicPath.setAttribute('d', pathD);

    dynamicGrad.setAttribute('x1', heliOriginX.toFixed(1));
    dynamicGrad.setAttribute('y1', heliOriginY.toFixed(1));
    dynamicGrad.setAttribute('x2', beamTargetX.toFixed(1));
    dynamicGrad.setAttribute('y2', beamTargetY.toFixed(1));

    landingGlow.setAttribute('cx', beamTargetX.toFixed(1));
    landingGlow.setAttribute('cy', beamTargetY.toFixed(1));
    landingGlow.setAttribute('rx', (w1 * 0.68).toFixed(1));
    landingGlow.setAttribute('ry', (w1 * 0.40).toFixed(1));
    landingGlow.setAttribute('transform', `rotate(${angleDeg.toFixed(1)} ${beamTargetX.toFixed(1)} ${beamTargetY.toFixed(1)})`);
  }

  // Cache section dimensions to eliminate layout thrashing inside render loop
  let sRect = section.getBoundingClientRect();
  let sW = sRect.width || window.innerWidth;
  let sH = sRect.height || 550;

  function updateDimensions() {
    sRect = section.getBoundingClientRect();
    sW = sRect.width || window.innerWidth;
    sH = sRect.height || 550;
  }

  // Setup custom hover targets
  if (typeof setupTargets === 'function') {
    setupTargets({
      onEnter(targetCenterScreenX, targetCenterScreenY) {
        isTargetHovered = true;
        beamLayer.classList.add('beam-active');
        updateDimensions();
        rawTargetX = targetCenterScreenX - sRect.left;
        rawTargetY = targetCenterScreenY - sRect.top;

        // Drone hovers ABOVE the target word in the sky, shining spotlight DOWN
        targetHeliX = rawTargetX - 40;
        targetHeliY = Math.max(15, rawTargetY - 110);
      },
      onLeave() {
        isTargetHovered = false;
        beamLayer.classList.remove('beam-active');
      }
    });
  }

  // Mouse / Touch Tracking across section
  let isMouseActive = false;
  let mouseX = x;
  let mouseY = y;
  let mouseIdleTimer = null;

  section.addEventListener('mousemove', (e) => {
    isMouseActive = true;
    clearTimeout(mouseIdleTimer);

    mouseX = e.clientX - sRect.left;
    mouseY = e.clientY - sRect.top;

    mouseIdleTimer = setTimeout(() => {
      isMouseActive = false;
    }, 2500);
  }, { passive: true });

  section.addEventListener('mouseleave', () => {
    isMouseActive = false;
    clearTimeout(mouseIdleTimer);
  });

  section.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      isMouseActive = true;
      clearTimeout(mouseIdleTimer);
      const touch = e.touches[0];
      mouseX = touch.clientX - sRect.left;
      mouseY = touch.clientY - sRect.top;

      mouseIdleTimer = setTimeout(() => {
        isMouseActive = false;
      }, 2500);
    }
  }, { passive: true });

  section.addEventListener('touchend', () => {
    isMouseActive = false;
  });

  window.addEventListener('resize', () => {
    updateDimensions();
  }, { passive: true });

  let rafId = null;
  let isSectionVisible = true;

  function startLoop() {
    if (!rafId && isSectionVisible && !document.hidden) {
      rafId = requestAnimationFrame(render);
    }
  }

  function stopLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  // IntersectionObserver pauses physics rendering when element is off-screen
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isSectionVisible = entry.isIntersecting;
        if (isSectionVisible) {
          updateDimensions();
          startLoop();
        } else {
          stopLoop();
        }
      });
    }, { threshold: 0.05 });
    observer.observe(section);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopLoop();
    } else if (isSectionVisible) {
      updateDimensions();
      startLoop();
    }
  });

  // Main 60fps render loop
  function render() {
    time += 0.016;

    const bobY = Math.sin(time * 3.5) * 3;
    const emitterX = x + 40;
    const emitterY = y + bobY + 54; // Searchlight emitter at bottom belly of drone

    if (isTargetHovered) {
      smoothTargetX += (rawTargetX - smoothTargetX) * 0.35;
      smoothTargetY += (rawTargetY - smoothTargetY) * 0.35;
      updateDynamicBeam(emitterX, emitterY, smoothTargetX, smoothTargetY);
    } else if (isMouseActive) {
      beamLayer.classList.remove('beam-active');
      const floatOffsetX = Math.sin(time * 2.0) * 15;
      const floatOffsetY = Math.cos(time * 2.5) * 10;
      targetHeliX = mouseX - 40 + floatOffsetX;
      targetHeliY = mouseY + 40 + floatOffsetY;
    } else {
      if (typeof getAutonomousTarget === 'function') {
        const auto = getAutonomousTarget(time, sW, sH, sRect);
        if (auto) {
          targetHeliX = auto.heliX;
          targetHeliY = auto.heliY;
          if (auto.beamActive && auto.beamTargetX !== null && auto.beamTargetY !== null) {
            beamLayer.classList.add('beam-active');
            smoothTargetX += (auto.beamTargetX - smoothTargetX) * 0.35;
            smoothTargetY += (auto.beamTargetY - smoothTargetY) * 0.35;
            updateDynamicBeam(emitterX, emitterY, smoothTargetX, smoothTargetY);
          } else {
            beamLayer.classList.remove('beam-active');
          }
        }
      }
    }

    // Boundary clamping
    const minX = 20;
    const maxX = Math.max(minX + 80, sW - 95);
    const minY = 10;
    const maxY = Math.max(minY + 80, sH - 105);

    targetHeliX = Math.max(minX, Math.min(maxX, targetHeliX));
    targetHeliY = Math.max(minY, Math.min(maxY, targetHeliY));

    // Spring physics
    const spring = 0.052;
    const damping = 0.84;
    const ax = (targetHeliX - x) * spring;
    const ay = (targetHeliY - y) * spring;
    vx = (vx + ax) * damping;
    vy = (vy + ay) * damping;
    x += vx;
    y += vy;

    x = Math.max(minX, Math.min(maxX, x));
    y = Math.max(minY, Math.min(maxY, y));

    const targetTilt = Math.max(-22, Math.min(22, vx * 2.4));

    if (!isFlipping) {
      heliWrap.style.transform = `translate3d(${x}px, ${y + bobY}px, 0) rotate(${targetTilt}deg)`;
    }

    if (isSectionVisible && !document.hidden) {
      rafId = requestAnimationFrame(render);
    } else {
      rafId = null;
    }
  }

  startLoop();

  // Flip trigger
  function triggerFlip() {
    if (isFlipping) return;
    isFlipping = true;
    playSuccessChime();

    spawnSparkles(heliWrap);
    heliWrap.classList.add('heli-flip-active');
    targetHeliY -= 45;

    setTimeout(() => {
      heliWrap.classList.remove('heli-flip-active');
      isFlipping = false;
    }, 750);
  }

  heliWrap.addEventListener('click', (e) => {
    e.stopPropagation();
    triggerFlip();
  });

  heliWrap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerFlip();
    }
  });

  return {
    heliWrap,
    beamLayer
  };
}

// ---------------------------------------------------------------------------
// Main Initializer: Sets up Mascot in Hero Section AND Contact Section
// ---------------------------------------------------------------------------
export function initHelicopter() {
  // 1. Hero Section Helicopter Drone with Headline Word Flash & Proximity Physics
  const heroSection = document.querySelector('.hero-section');
  const heroHeading = document.querySelector('.hero-heading');

  if (heroSection && heroHeading) {
    const allWords = Array.from(heroHeading.querySelectorAll('.hero-word'));
    let activeHoverWord = null;
    let hoverTimeout = null;
    let isUserInteracting = false;
    let userIdleTimeout = null;

    createHelicopterMascot({
      section: heroSection,
      heliId: 'hero-helicopter',
      beamPrefix: 'hero',
      initialX: window.innerWidth < 768 ? Math.max(20, window.innerWidth - 80) : window.innerWidth * 0.45,
      initialY: window.innerWidth < 768 ? 15 : 60,
      setupTargets({ onEnter, onLeave }) {
        function findClosestWord(clientX, clientY) {
          // On mobile/touch devices, disable word hover spotlighting
          if (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches) {
            return null;
          }

          let closest = null;
          let minDistance = Infinity;

          for (let i = 0; i < allWords.length; i++) {
            const word = allWords[i];
            const rect = word.getBoundingClientRect();
            // Direct hit inside word rectangle with generous padding
            if (
              clientX >= rect.left - 10 &&
              clientX <= rect.right + 10 &&
              clientY >= rect.top - 14 &&
              clientY <= rect.bottom + 14
            ) {
              return word;
            }
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const d = Math.hypot(clientX - cx, clientY - cy);
            if (d < minDistance && d < 95) {
              minDistance = d;
              closest = word;
            }
          }
          return closest;
        }

        function setHover(word) {
          clearTimeout(hoverTimeout);
          isUserInteracting = true;
          clearTimeout(userIdleTimeout);
          userIdleTimeout = setTimeout(() => {
            isUserInteracting = false;
          }, 2500);

          if (activeHoverWord === word) return;

          if (activeHoverWord) {
            activeHoverWord.classList.remove('illuminated');
          }

          activeHoverWord = word;

          if (activeHoverWord) {
            activeHoverWord.classList.add('illuminated');
            playBlip(560, 0.03);
            const wRect = activeHoverWord.getBoundingClientRect();
            onEnter(wRect.left + wRect.width / 2, wRect.top + wRect.height / 2);
          } else {
            onLeave();
          }
        }

        heroHeading.addEventListener('mousemove', (e) => {
          const word = findClosestWord(e.clientX, e.clientY);
          if (word) {
            setHover(word);
          }
        });

        heroHeading.addEventListener('mouseenter', (e) => {
          const word = findClosestWord(e.clientX, e.clientY);
          if (word) {
            setHover(word);
          }
        });

        heroHeading.addEventListener('mouseleave', () => {
          clearTimeout(hoverTimeout);
          hoverTimeout = setTimeout(() => {
            setHover(null);
          }, 180);
        });

        allWords.forEach((word) => {
          word.addEventListener('mouseenter', () => {
            setHover(word);
          });
        });
      },
      getAutonomousTarget(time, heroW, heroH, sRect) {
        // On mobile viewports (< 768px), keep mascot floating gracefully at top-right sky
        // so it NEVER blocks the headline or words
        if (heroW < 768 || window.innerWidth < 768) {
          return {
            heliX: Math.max(20, heroW - 80 + Math.sin(time * 1.5) * 8),
            heliY: 14 + Math.sin(time * 2.0) * 6,
            beamTargetX: null,
            beamTargetY: null,
            beamActive: false
          };
        }

        // If user is actively hovering over words, hover controller handles flight & beam
        if (activeHoverWord) {
          return null;
        }

        // Never automatically illuminate words - keep words clean when not hovered
        allWords.forEach((w) => w.classList.remove('illuminated'));

        if (!sRect || heroW <= 0) {
          return {
            heliX: heroW * 0.45,
            heliY: 50,
            beamTargetX: null,
            beamTargetY: null,
            beamActive: false
          };
        }

        // Autonomous Sky Cruise on Desktop:
        // Gently cruises in the upper sky above the headline with a smooth floating trajectory.
        // Spotlight beam remains strictly OFF until the user hovers over words.
        const cx = heroW * 0.42;
        const cy = Math.min(80, Math.max(40, heroH * 0.16));
        const rx = Math.min(heroW * 0.26, 260);
        const ry = 18;

        const heliX = cx + Math.sin(time * 0.7) * rx;
        const heliY = cy + Math.sin(time * 1.4) * ry;

        return {
          heliX,
          heliY,
          beamTargetX: null,
          beamTargetY: null,
          beamActive: false
        };
      }
    });
  }

  // 2. Outro / Contact Section Helicopter Drone
  const contactSection = document.querySelector('.outro-section');
  if (contactSection) {
    createHelicopterMascot({
      section: contactSection,
      heliId: 'contact-helicopter',
      beamPrefix: 'outro',
      initialX: window.innerWidth * 0.52,
      initialY: 110,
      setupTargets({ onEnter, onLeave }) {
        const clipText = contactSection.querySelector('.floral-text-clip');
        if (clipText && !clipText.querySelector('.hero-word')) {
          const words = clipText.textContent.trim().split(/\s+/);
          clipText.innerHTML = words.map((w) => `<span class="hero-word outro-word">${w}</span>`).join(' ');
        }

        const words = contactSection.querySelectorAll('.outro-word');
        const buttons = contactSection.querySelectorAll(
          '.contact-hub-bar button, .contact-hub-bar a, #quick-inquiry-form button'
        );

        let hoverTimeout = null;

        function handleTargetEnter(el) {
          clearTimeout(hoverTimeout);
          words.forEach((w) => w !== el && w.classList.remove('illuminated'));
          buttons.forEach((b) => b !== el && b.classList.remove('illuminated'));
          el.classList.add('illuminated');
          playBlip(560, 0.03);
          const rect = el.getBoundingClientRect();
          onEnter(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        function handleTargetLeave(el) {
          hoverTimeout = setTimeout(() => {
            el.classList.remove('illuminated');
            onLeave();
          }, 140);
        }

        words.forEach((w) => {
          w.addEventListener('mouseenter', () => handleTargetEnter(w));
          w.addEventListener('mouseleave', () => handleTargetLeave(w));
        });

        buttons.forEach((b) => {
          b.addEventListener('mouseenter', () => handleTargetEnter(b));
          b.addEventListener('mouseleave', () => handleTargetLeave(b));
        });
      },
      getAutonomousTarget(time, w, h) {
        const minX = 35;
        const maxX = Math.max(minX + 80, w - 100);
        const cx = (minX + maxX) * 0.5;
        const cy = Math.min(180, Math.max(100, h * 0.28));
        const rx = Math.min(w * 0.36, 360);
        const ry = Math.min(h * 0.2, 70);

        // Smooth lissajous cruising trajectory around the contact hub
        const t = time * 0.65;
        const heliX = cx + Math.sin(t) * rx + Math.sin(t * 1.8) * (rx * 0.18);
        const heliY = cy + Math.sin(t * 1.5) * ry + Math.cos(t * 0.7) * 16;
        return {
          heliX: Math.max(minX, Math.min(maxX, heliX)),
          heliY: Math.max(25, Math.min(h - 100, heliY)),
          beamTargetX: null,
          beamTargetY: null,
          beamActive: false
        };
      }
    });
  }
}


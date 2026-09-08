// Generative Mathematical Spirograph & Botanical Floral Kaleidoscope Engine
// Supports Ambient Drift, Infinite Rotating Floral Tunnel Vortex, and Botanical Shapes
import { playBlip } from './sound.js';

export class SpirographRenderer {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.petals = options.petals || 8;
    this.amplitude = options.amplitude !== undefined ? options.amplitude : 0.28;
    this.harmonic = options.harmonic || 0; // secondary harmonic ripple for complex lotus/star shapes
    this.colorPalette = options.colors || ['#10B981', '#F97316', '#8B5CF6', '#EC4899'];
    this.numLayers = options.layers || 8;

    // Kinetic Rotation and Infinite Tunnel Physics
    this.rotation = Math.random() * Math.PI * 2;
    this.baseSpeed = options.speed || 0.007;
    this.currentRotationSpeed = this.baseSpeed;
    this.targetRotationSpeed = this.baseSpeed;

    this.zoomPhase = Math.random();
    this.baseZoomSpeed = 0.0025;
    this.currentZoomSpeed = this.baseZoomSpeed;
    this.targetZoomSpeed = this.baseZoomSpeed;

    // Infinite Vortex Mode:
    // 0 = Serene Ambient Drift
    // 1 = Forward Infinite Blooming Vortex
    // 2 = Reverse Hyper-Speed Inward Warp
    this.infiniteMode = 0;
    this.pulseRipple = 0;
    this.time = Math.random() * 100;
    this.isRunning = true;
    this.isVisible = true;
    this.isHovered = false;

    this.resize();
    this.bindEvents();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width || 140;
    this.height = rect.height || 110;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
  }

  bindEvents() {
    const parent = this.canvas.closest('.crt-monitor');
    if (!parent) return;

    // Hover kinetic responsiveness
    parent.addEventListener('mouseenter', () => {
      this.isHovered = true;
      if (this.infiniteMode === 0) {
        this.targetRotationSpeed = this.baseSpeed * 2.8;
        this.targetZoomSpeed = this.baseZoomSpeed * 2.8;
      }
    });

    parent.addEventListener('mouseleave', () => {
      this.isHovered = false;
      if (this.infiniteMode === 0) {
        this.targetRotationSpeed = this.baseSpeed;
        this.targetZoomSpeed = this.baseZoomSpeed;
      }
    });

    // Click to activate the Infinite Rotating Floral Vortex!
    parent.addEventListener('click', (e) => {
      e.stopPropagation();

      // Cycle between modes: 0 -> 1 -> 2 -> 0
      this.infiniteMode = (this.infiniteMode + 1) % 3;
      this.pulseRipple = 0.01; // trigger shockwave ripple

      if (this.infiniteMode === 1) {
        // Mode 1: Fast Forward Continuous Rotation + Infinite Outward Blooming Tunnel
        this.targetRotationSpeed = 0.048;
        this.targetZoomSpeed = 0.010;
        parent.classList.add('is-infinite-active');
        parent.classList.remove('is-infinite-warp');
        playBlip(587.33, 0.06, 'sine'); // Musical D5 chime
      } else if (this.infiniteMode === 2) {
        // Mode 2: Reverse Hyper-Speed Inward Vortex Suction
        this.targetRotationSpeed = -0.062;
        this.targetZoomSpeed = -0.012;
        parent.classList.remove('is-infinite-active');
        parent.classList.add('is-infinite-warp');
        playBlip(783.99, 0.08, 'triangle'); // Musical G5 chime
      } else {
        // Mode 0: Return to serene ambient drift
        this.targetRotationSpeed = this.isHovered ? this.baseSpeed * 2.8 : this.baseSpeed;
        this.targetZoomSpeed = this.isHovered ? this.baseZoomSpeed * 2.8 : this.baseZoomSpeed;
        parent.classList.remove('is-infinite-active');
        parent.classList.remove('is-infinite-warp');
        playBlip(440, 0.05, 'sine'); // Musical A4 return chime
      }
    });

    // Accessible keyboard activation (Enter or Space)
    parent.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        parent.click();
      }
    });
  }

  render() {
    if (!this.isRunning || !this.isVisible) return;

    // Smooth physical spring damping
    this.currentRotationSpeed += (this.targetRotationSpeed - this.currentRotationSpeed) * 0.08;
    this.currentZoomSpeed += (this.targetZoomSpeed - this.currentZoomSpeed) * 0.08;
    this.rotation += this.currentRotationSpeed;
    this.zoomPhase = (this.zoomPhase + this.currentZoomSpeed + 1) % 1;
    this.time += 0.015;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const cx = this.width / 2;
    const cy = this.height / 2;
    const maxRadius = Math.hypot(cx, cy) * 0.95;

    // Draw Click Pulse Ripple Shockwave
    if (this.pulseRipple > 0) {
      const rippleR = this.pulseRipple * maxRadius;
      const rippleAlpha = Math.max(0, 1 - this.pulseRipple);
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(cx, cy, rippleR, 0, Math.PI * 2);
      this.ctx.strokeStyle = this.infiniteMode === 2 ? '#E02475' : '#8B5CF6';
      this.ctx.lineWidth = 2.4;
      this.ctx.globalAlpha = rippleAlpha * 0.65;
      this.ctx.stroke();
      this.ctx.restore();

      this.pulseRipple += 0.038;
      if (this.pulseRipple > 1) {
        this.pulseRipple = 0;
      }
    }

    // 72 steps provides mathematical curve smoothness while saving ~55% path iterations
    const steps = 72;

    // Render Infinite Concentric Blooming Floral Layers
    for (let l = 0; l < this.numLayers; l++) {
      // Modulo creates a mathematically seamless infinite tunnel
      const progress = ((l / this.numLayers) + this.zoomPhase) % 1;
      const radius = progress * maxRadius;

      if (radius < 3.5) continue;

      // Seamless Opacity Fade: blossoms at center, dissolves at outer bezel
      let alpha = 1;
      if (progress < 0.14) {
        alpha = progress / 0.14;
      } else if (progress > 0.82) {
        alpha = (1 - progress) / 0.18;
      }

      // Color mapping from palette
      const color = this.colorPalette[l % this.colorPalette.length];

      // Layer twist: inner rings spin with differential phase for hypnotic moiré vortex
      const twist = (1 - progress) * 0.7;
      const layerRotation = this.rotation + (twist * (this.currentRotationSpeed >= 0 ? 1 : -1));

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = 1.7;
      this.ctx.globalAlpha = Math.min(0.95, Math.max(0, alpha));

      for (let i = 0; i <= steps; i++) {
        const theta = (i / steps) * Math.PI * 2;
        const angle = theta + layerRotation;

        // Harmonic botanical petal equation
        let rFactor = 1 + this.amplitude * Math.cos(this.petals * angle);
        if (this.harmonic > 0) {
          rFactor += (this.amplitude * this.harmonic) * Math.cos(this.petals * 2 * angle);
        }

        const currentR = radius * rFactor;
        const px = cx + currentR * Math.cos(theta);
        const py = cy + currentR * Math.sin(theta);

        if (i === 0) {
          this.ctx.moveTo(px, py);
        } else {
          this.ctx.lineTo(px, py);
        }
      }

      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Central Botanical Blossom Core
    this.renderCenterBlossom(cx, cy);
  }

  renderCenterBlossom(cx, cy) {
    const centerR = Math.min(cx, cy) * 0.13;
    const coreColor = this.colorPalette[0];
    const steps = 48;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = coreColor;
    this.ctx.lineWidth = 1.8;
    this.ctx.globalAlpha = 0.95;

    const coreRotation = this.rotation * 1.6;
    for (let i = 0; i <= steps; i++) {
      const theta = (i / steps) * Math.PI * 2;
      const angle = theta + coreRotation;
      const r = centerR * (1 + 0.38 * Math.cos(this.petals * angle));
      const px = cx + r * Math.cos(theta);
      const py = cy + r * Math.sin(theta);
      if (i === 0) this.ctx.moveTo(px, py);
      else this.ctx.lineTo(px, py);
    }
    this.ctx.closePath();
    this.ctx.stroke();

    // Central Seed Dot
    this.ctx.beginPath();
    this.ctx.arc(cx, cy, 2.8, 0, Math.PI * 2);
    this.ctx.fillStyle = this.colorPalette[1] || '#FFFFFF';
    this.ctx.fill();
    this.ctx.strokeStyle = '#5236AB';
    this.ctx.lineWidth = 1.2;
    this.ctx.stroke();

    this.ctx.restore();
  }
}

export function initCRTMonitors() {
  const renderers = [];

  // 1. Hero Side Botanical Monitors (Exact Match to Reference Image)
  const heroConfigs = {
    'hero-crt-1': {
      petals: 5,
      amplitude: 0.28,
      harmonic: 0,
      colors: ['#10B981', '#F97316', '#8B5CF6', '#EC4899'],
      speed: 0.007,
      layers: 8,
    },
    'hero-crt-2': {
      petals: 4,
      amplitude: 0.32,
      harmonic: 0,
      colors: ['#D97706', '#059669', '#0284C7', '#F59E0B'],
      speed: 0.008,
      layers: 7,
    },
    'hero-crt-3': {
      petals: 8,
      amplitude: 0.26,
      harmonic: 0.28,
      colors: ['#0D9488', '#10B981', '#F43F5E', '#EC4899', '#38BDF8'],
      speed: 0.006,
      layers: 9,
    },
    'hero-crt-4': {
      petals: 16,
      amplitude: 0.22,
      harmonic: 0,
      colors: ['#EC4899', '#06B6D4', '#8B5CF6', '#F43F5E'],
      speed: 0.007,
      layers: 8,
    },
    'hero-crt-5': {
      petals: 12,
      amplitude: 0.24,
      harmonic: 0,
      colors: ['#06B6D4', '#0F766E', '#2563EB', '#34D399'],
      speed: 0.008,
      layers: 8,
    },
    'hero-crt-6': {
      petals: 10,
      amplitude: 0.25,
      harmonic: 0,
      colors: ['#EA580C', '#F59E0B', '#0284C7', '#6366F1'],
      speed: 0.007,
      layers: 7,
    },
  };

  const heroMonitors = document.querySelectorAll('.hero-chandelier-side .crt-monitor');
  heroMonitors.forEach((m) => {
    const canvas = m.querySelector('.crt-screen-canvas');
    if (!canvas) return;

    let cfgKey = null;
    for (const key of Object.keys(heroConfigs)) {
      if (m.classList.contains(key)) {
        cfgKey = key;
        break;
      }
    }
    const cfg = cfgKey ? heroConfigs[cfgKey] : { petals: 8, colors: ['#10B981', '#F97316', '#8B5CF6', '#EC4899'] };
    const renderer = new SpirographRenderer(canvas, cfg);
    renderers.push(renderer);
  });

  // 2. Chandelier Project Monitors in lower section (if present)
  const lowerMonitors = document.querySelectorAll('.chandelier-container .crt-monitor');
  const lowerConfigs = [
    { petals: 6, colors: ['#8B5CF6', '#6366F1', '#EC4899', '#A855F7'], speed: 0.007 },
    { petals: 8, colors: ['#10B981', '#059669', '#34D399', '#A3E635'], speed: 0.008 },
    { petals: 7, colors: ['#0284C7', '#38BDF8', '#06B6D4', '#7DD3FC'], speed: 0.009 },
    { petals: 9, colors: ['#F97316', '#EA580C', '#FBBF24', '#FB923C'], speed: 0.008 },
    { petals: 12, colors: ['#F43F5E', '#E11D48', '#FB7185', '#9333EA'], speed: 0.007 },
    { petals: 10, colors: ['#7C3AED', '#A855F7', '#C084FC', '#E879F9'], speed: 0.008 },
  ];

  lowerMonitors.forEach((m, idx) => {
    const canvas = m.querySelector('.crt-screen-canvas');
    if (!canvas) return;
    const cfg = lowerConfigs[idx % lowerConfigs.length];
    const renderer = new SpirographRenderer(canvas, cfg);
    renderers.push(renderer);
  });

  // 3. Botanical Origin Seed hover and surge
  const seed = document.getElementById('origin-botanical-seed');
  const chandelier = document.querySelector('.chandelier-container');
  if (seed && chandelier) {
    seed.addEventListener('mouseenter', () => {
      chandelier.classList.add('seed-energized');
      renderers.forEach((r) => {
        r.targetRotationSpeed = r.baseSpeed * 3.5;
        r.targetZoomSpeed = r.baseZoomSpeed * 3.5;
      });
    });
    seed.addEventListener('mouseleave', () => {
      chandelier.classList.remove('seed-energized');
      renderers.forEach((r) => {
        if (r.infiniteMode === 0) {
          r.targetRotationSpeed = r.baseSpeed;
          r.targetZoomSpeed = r.baseZoomSpeed;
        }
      });
    });
    seed.addEventListener('click', (e) => {
      e.stopPropagation();
      chandelier.classList.add('seed-burst');
      renderers.forEach((r) => {
        r.targetRotationSpeed = r.baseSpeed * 5;
        r.pulseRipple = 0.02;
        setTimeout(() => {
          if (r.infiniteMode === 0) r.targetRotationSpeed = r.baseSpeed;
        }, 900);
      });
      setTimeout(() => chandelier.classList.remove('seed-burst'), 1000);
    });
  }

  // 4. Unified 60fps Animation Loop with Smart Visibility Culling
  let animationFrameId = null;

  function loop() {
    let anyRendered = false;
    for (let i = 0; i < renderers.length; i++) {
      const r = renderers[i];
      if (r.isVisible && r.isRunning) {
        r.render();
        anyRendered = true;
      }
    }
    if (anyRendered && !document.hidden) {
      animationFrameId = requestAnimationFrame(loop);
    } else {
      animationFrameId = null;
    }
  }

  function ensureLoopRunning() {
    if (!animationFrameId && !document.hidden) {
      const anyVisible = renderers.some((r) => r.isVisible && r.isRunning);
      if (anyVisible) {
        animationFrameId = requestAnimationFrame(loop);
      }
    }
  }

  // IntersectionObserver dynamically culls off-screen canvas loops
  if ('IntersectionObserver' in window) {
    const monitorObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const canvas = entry.target.querySelector('.crt-screen-canvas');
        if (!canvas) return;
        const r = renderers.find((item) => item.canvas === canvas);
        if (r) {
          r.isVisible = entry.isIntersecting;
        }
      });
      ensureLoopRunning();
    }, { threshold: 0.05 });

    document.querySelectorAll('.crt-monitor').forEach((m) => monitorObserver.observe(m));
  }

  loop();

  // Post-mount resize pass for exact sub-pixel canvas dimensions
  setTimeout(() => {
    renderers.forEach((r) => r.resize());
  }, 120);

  // Visibility and Debounced Resize Listeners
  document.addEventListener('visibilitychange', () => {
    const isPaused = document.hidden;
    renderers.forEach((r) => (r.isRunning = !isPaused));
    if (!isPaused) {
      ensureLoopRunning();
    } else if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  });

  let resizeDebounce = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      renderers.forEach((r) => r.resize());
    }, 120);
  }, { passive: true });
}

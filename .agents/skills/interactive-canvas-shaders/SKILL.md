---
name: interactive-canvas-shaders
description: High-performance 2D Canvas and WebGL visual ambient background systems, interactive particle fields, and cursor physics.
---

# Interactive Canvas & Ambient Visuals Skill

This skill provides patterns for building performant, battery-conscious, 60fps canvas graphics that elevate web pages into interactive living digital art.

## Best Practices
1. **Decoupled Render Loop**: Keep physics updates separate from rendering to avoid jitter.
2. **Device Pixel Ratio Scaling**: Always scale the canvas backing store by `window.devicePixelRatio` for retina crispness, while keeping CSS layout size unchanged.
3. **Visibility Pausing**: Use `IntersectionObserver` or `document.hidden` to pause the animation loop when offscreen or in background tabs.
4. **Soft Mouse Physics**: Use easing interpolation (lerp) for smooth cursor interaction rather than abrupt tracking.

## Standard Interactive Particle Field
```javascript
class AmbientCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };
    this.init();
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  }

  // Smooth lerp: current + (target - current) * factor
}
```

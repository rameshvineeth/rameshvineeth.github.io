---
name: veteran-web-artisan
description: Design principles, layout blueprints, and editorial design recipes for master web designers and creative directors with 25+ years of digital craft.
---

# Veteran Web Artisan Skill

A skill for executing high-end, museum-grade web design that commands attention, expresses deep typographic refinement, and rejects generic cookie-cutter web aesthetics.

## When to Use
- When crafting portfolios, editorial digital magazines, luxury brand platforms, or avant-garde personal sites.
- When establishing bespoke CSS token systems, asymmetrical bento layouts, or tactile digital textures.
- When presenting decades of design history, case studies, or design philosophies.

## Core Design Recipes

### 1. Asymmetrical Editorial Layouts
Break away from boring centered containers. Use multi-column balance with tension:
```css
.editorial-grid {
  display: grid;
  grid-template-columns: 1fr 1.618fr; /* Golden ratio tension */
  gap: var(--space-2xl);
  align-items: baseline;
}
```

### 2. Deep Obsidian Atmosphere with Noise Grain
Add physical texture using procedural SVG or CSS masking to avoid plastic-looking flat dark modes:
```css
.obsidian-surface {
  background-color: #0c0d11;
  background-image: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 60%);
  position: relative;
}

.noise-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  z-index: 9999;
}
```

### 3. Glassmorphism Elevation
Clean borders and layered depth:
```css
.glass-panel {
  background: rgba(18, 19, 24, 0.65);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}
```

### 4. Native Accessible Dialog Patterns
Always use HTML5 `<dialog>` for modal overlays with platform-level dismiss:
```html
<dialog id="case-study-modal" class="modal-dialog">
  <div class="modal-content">
    <button class="modal-close" method="dialog" aria-label="Close modal">×</button>
    <div id="modal-body"></div>
  </div>
</dialog>
```

---
name: kinetic-motion-typography
description: Kinetic typography, scroll-driven entry/exit animations, magnetic spring physics, and high-precision micro-interactions.
---

# Kinetic Motion & Typography Skill

This skill provides guidelines for fluid, physics-driven micro-interactions, marquee banners, and scroll-driven entry/exit animations with modern CSS.

## Spring Curves & Easing Tokens
Always use high-tension spring curves:
```css
:root {
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

## Progressive Scroll-Driven Entry Effects
Use native CSS scroll-driven animations with modern feature detection and IntersectionObserver fallback:

```css
@supports ((animation-timeline: view()) and (animation-range: entry)) {
  .reveal-on-scroll {
    animation: revealEffect linear both;
    animation-timeline: view();
    animation-range: entry 10% entry 40%;
  }

  @keyframes revealEffect {
    from {
      opacity: 0;
      transform: translateY(40px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
}
```

## Magnetic Cursor Interaction
Magnetic pull on buttons:
```javascript
function attachMagneticEffect(el, strength = 0.3) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'translate(0px, 0px)';
  });
}
```

// Custom Magnetic Cursor & Interactive Mascot Eye Tracking
import { playBlip } from './sound.js';

export function initCustomCursor() {
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  // Mascot Eye Tracking with RAF throttle to prevent layout thrashing
  const mascotEyes = document.querySelectorAll('.mascot-eye');
  if (mascotEyes.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let isEyeRafScheduled = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isEyeRafScheduled) {
        isEyeRafScheduled = true;
        requestAnimationFrame(() => {
          isEyeRafScheduled = false;
          mascotEyes.forEach((eye) => {
            const rect = eye.getBoundingClientRect();
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;

            const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
            const distance = Math.min(3, Math.hypot(mouseX - eyeCenterX, mouseY - eyeCenterY) * 0.05);

            const offsetX = Math.cos(angle) * distance;
            const offsetY = Math.sin(angle) * distance;

            eye.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
          });
        });
      }
    }, { passive: true });
  }

  // Magnetic Buttons & Interactive Elements (Desktop only)
  const magneticElements = document.querySelectorAll('.btn-pill, .announcement-bar, .scrubber-play-btn, .filter-tab-btn');
  magneticElements.forEach((el) => {
    let rafScheduled = false;
    let targetX = 0;
    let targetY = 0;

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      targetX = (e.clientX - rect.left - rect.width / 2) * 0.22;
      targetY = (e.clientY - rect.top - rect.height / 2) * 0.22;

      if (!rafScheduled) {
        rafScheduled = true;
        requestAnimationFrame(() => {
          rafScheduled = false;
          el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
        });
      }
    }, { passive: true });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate3d(0px, 0px, 0)';
    });

    el.addEventListener('click', () => {
      playBlip(540, 0.04);
    });
  });
}

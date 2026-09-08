// Interactive Meadow Flower Physics: Windy Swaying & Harmonic Chimes
import { playBlip } from './sound.js';

export function initMeadowFlowers() {
  const flowers = document.querySelectorAll('.interactive-land-flower');
  if (!flowers.length) return;

  // Harmonic Pentatonic Scale for Musical Meadow Interaction (C5, D5, E5, G5, A5, C6)
  const notes = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

  flowers.forEach((flower, index) => {
    // 1. Give each flower a distinct organic breeze frequency and wind resonance
    const delay = -((index * 0.73) % 4).toFixed(2);
    const duration = (3.4 + (index % 4) * 0.5).toFixed(2);
    const windSpeed = (0.54 + (index % 5) * 0.045).toFixed(2); // 0.54s - 0.72s
    flower.style.setProperty('--duration', `${duration}s`);
    flower.style.setProperty('--wind-speed', `${windSpeed}s`);
    flower.style.animationDelay = `${delay}s`;

    let settleTimeout = null;

    // 2. Hover Interaction: Dynamic windy left-and-right sway
    flower.addEventListener('mouseenter', (e) => {
      clearTimeout(settleTimeout);
      flower.classList.remove('is-settling');
      flower.classList.add('is-windy');

      const note = notes[index % notes.length];
      playBlip(note, 0.04, 'sine');
    });

    flower.addEventListener('mouseleave', () => {
      flower.classList.remove('is-windy');
      flower.classList.add('is-settling');

      settleTimeout = setTimeout(() => {
        flower.classList.remove('is-settling');
      }, 650);
    });

    // 3. Click interaction: playful wind gust burst & chime
    flower.addEventListener('click', (e) => {
      e.stopPropagation();
      const highNote = notes[(index + 2) % notes.length] * 1.5;
      playBlip(highNote, 0.07, 'triangle');

      flower.classList.remove('is-clicked');
      void flower.offsetWidth; // Force reflow
      flower.classList.add('is-clicked');

      setTimeout(() => {
        flower.classList.remove('is-clicked');
      }, 500);
    });

    // Keyboard accessibility: Enter or Space triggers gust
    flower.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flower.click();
      }
    });
  });

  initVioletFloralBed();
}

export function initVioletFloralBed() {
  const violetFlowers = document.querySelectorAll('.v-meadow-flower');
  if (!violetFlowers.length) return;

  const notes = [392.00, 440.00, 523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];

  violetFlowers.forEach((flower, index) => {
    flower.addEventListener('mouseenter', (e) => {
      const note = notes[index % notes.length];
      playBlip(note, 0.04, 'sine');
      createFlowerSparkles(e, flower, 3);
    });

    flower.addEventListener('click', (e) => {
      e.stopPropagation();
      const highNote = notes[(index + 2) % notes.length] * 1.33;
      playBlip(highNote, 0.07, 'triangle');
      createFlowerSparkles(e, flower, 6);

      flower.style.transform = 'scale(1.28) translateY(-12px)';
      setTimeout(() => {
        flower.style.transform = '';
      }, 450);
    });

    flower.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flower.click();
      }
    });
  });
}

function createFlowerSparkles(e, flowerEl, count = 4) {
  const rect = flowerEl.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height * 0.35; // Spawn from the flower head

  const colors = ['#F472B6', '#FACC15', '#38BDF8', '#A78BFA', '#34D399', '#FB7185', '#F59E0B', '#C084FC'];

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'flower-pollen-sparkle';

    const size = 5 + Math.random() * 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const offsetX = (Math.random() - 0.5) * 44;
    const offsetY = (Math.random() - 0.5) * 32;
    const destX = offsetX * 2.2;
    const destY = -35 - Math.random() * 45;

    sparkle.style.left = `${centerX + offsetX}px`;
    sparkle.style.top = `${centerY + offsetY}px`;
    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.backgroundColor = color;
    sparkle.style.setProperty('--dest-x', `${destX}px`);
    sparkle.style.setProperty('--dest-y', `${destY}px`);

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 700);
  }
}


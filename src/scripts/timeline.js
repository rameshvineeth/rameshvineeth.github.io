import { playBlip } from './sound.js';

export const erasData = [
  {
    id: 'era-1',
    range: '1999 — 2004',
    name: 'The Raw Dawn & Typographic Experiments',
    badge: 'FOUNDATIONAL ERA',
    description: 'Began crafting hand-coded HTML 3.2/4.0 web pages using table structures, 1x1 spacer GIFs, and early CSS Zen Garden experimentation. Established foundational instincts for brutal semantic honesty, typography balance, and browser compatibility quirks across Netscape Navigator and Internet Explorer 5.',
    milestones: [
      'Pioneered tableless CSS layouts and semantic XHTML standards',
      'Handcrafted pixel-perfect web art and early Web 1.0 digital journals',
      'Engineered sub-50KB hyper-optimized assets for dial-up 56k modems'
    ],
    techStack: ['HTML 4.01', 'CSS Zen Garden', 'XHTML 1.0 Strict', 'Spacer GIFs', 'Photoshop 5.5', 'Notepad']
  },
  {
    id: 'era-2',
    range: '2005 — 2011',
    name: 'The Kinetic Flash & Skeuomorphic Revolution',
    badge: 'INTERACTIVE GOLDEN AGE',
    description: 'Directed experiential rich-media sites using Macromedia/Adobe Flash, ActionScript 2 & 3, and rich skeuomorphic lighting. Merged cinematic sound design with fluid motion curves, creating interactive narratives long before HTML5 canvas became mainstream.',
    milestones: [
      'Designed award-winning experiential Flash microsites and interactive music videos',
      'Mastered timeline physics, particle emitters, and procedural AS3 motion',
      'Transitioned into early CSS3 transforms and jQuery transitions'
    ],
    techStack: ['Flash MX / CS5', 'ActionScript 3.0', 'Skeuomorphism', 'Early CSS3', 'jQuery', 'Sound Synthesis']
  },
  {
    id: 'era-3',
    range: '2012 — 2018',
    name: 'The Responsive Paradigm & Design Systems',
    badge: 'SYSTEMS ARCHITECTURE',
    description: 'Architected comprehensive design systems at enterprise scale as mobile devices transformed user behavior. Championed fluid typography clamp(), CSS Flexbox & Grid, component tokenization, and atomic design methodologies.',
    milestones: [
      'Authored multi-brand cross-platform design systems with living token pipelines',
      'Pioneered responsive typography and fluid container query patterns',
      'Mentored 40+ junior and senior product designers across global creative agencies'
    ],
    techStack: ['CSS Grid & Flexbox', 'Design Tokens', 'Atomic Design', 'SVG Vector Systems', 'ES6 JavaScript', 'BEM']
  },
  {
    id: 'era-4',
    range: '2019 — 2025+',
    name: 'The Avant-Garde, WebGL & Spatial Web',
    badge: 'FUTURE-STATE SYNTHESIS',
    description: 'Spearheading modern high-craft digital experiences combining WebGL shaders, zero-latency micro-interactions, generative visual orchestration, and AI-augmented creative coding. Treating the browser as a responsive living museum canvas.',
    milestones: [
      'Built 60fps GPU-accelerated spatial web experiences and WebGL installations',
      'Integrated physics-based spring curves and native scroll-driven animations',
      'Championing craft over corporate conformity in the era of generative AI'
    ],
    techStack: ['Vanilla Modern Web', 'WebGL & Shaders', 'Scroll-Driven Timelines', 'Spatial UI', 'Generative Design', 'Native Web APIs']
  }
];

export function initTimeline() {
  const tabsContainer = document.getElementById('timeline-tabs');
  const cardsContainer = document.getElementById('timeline-cards');
  if (!tabsContainer || !cardsContainer) return;

  // Render tabs
  tabsContainer.innerHTML = erasData
    .map(
      (era, index) => `
      <button class="era-tab-btn ${index === 0 ? 'active' : ''}" data-era-id="${era.id}">
        <span>${era.range}</span>
      </button>
    `
    )
    .join('');

  function renderCards(selectedId = null) {
    const list = selectedId
      ? erasData.filter((e) => e.id === selectedId)
      : erasData;

    cardsContainer.innerHTML = list
      .map(
        (era) => `
      <article class="era-card scroll-reveal">
        <div>
          <div class="era-card-header">
            <span class="era-years">${era.range}</span>
            <span class="era-badge">${era.badge}</span>
          </div>
          <h3 class="era-name">${era.name}</h3>
          <p class="era-description">${era.description}</p>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 6px; margin-bottom: 1.25rem;">
            ${era.milestones
              .map(
                (m) =>
                  `<li style="font-size: 0.85rem; color: var(--text-primary); display: flex; gap: 8px; align-items: baseline;">
                    <span style="color: var(--accent-gold); font-size: 0.75rem;">✦</span>
                    <span>${m}</span>
                  </li>`
              )
              .join('')}
          </ul>
        </div>
        <div class="era-tech-stack" style="display: flex; flex-wrap: wrap; gap: 6px; align-items: center;">
          ${era.techStack.map((tech) => `<span class="tech-tag">${tech}</span>`).join(' ')}
        </div>
      </article>
    `
      )
      .join('');
  }

  // Initial render: show all eras in rich 2-col grid
  renderCards();

  // Tab click handler
  tabsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.era-tab-btn');
    if (!btn) return;

    playBlip(620, 0.03);
    tabsContainer.querySelectorAll('.era-tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const eraId = btn.dataset.eraId;
    renderCards(eraId);
  });
}

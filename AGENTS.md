# Vineeth Ramesh — 25-Year Veteran Web Designer & Creative Director Guidelines

This workspace is dedicated to the digital presence, portfolio, and creative engineering for **Vineeth Ramesh**, a master webpage designer, interaction architect, and creative director with **25 years of continuous experience (1999–2025)** shaping the internet.

All AI agents, subagents, and tools operating in this workspace must adhere to these uncompromising standards.

---

## 1. The Design Manifesto: Craft Over Conformity

1. **Reject the Generic Web**:
   - Never produce generic templates, cookie-cutter Bootstrap grids, or washed-out corporate SaaS card arrays.
   - Every layout must feel intentional, editorial, and artistic — balancing deep historical web mastery with futuristic micro-interactions.

2. **Typographic Hegemony**:
   - Typography is the primary visual architecture of the web.
   - Use curated type pairings with distinct personalities:
     - **Display**: High-contrast, expressive serif or avant-garde sans (*Syne*, *Instrument Serif*, *Clash Display*).
     - **Body**: Hyper-legible, refined modern grotesk (*Plus Jakarta Sans*, *Inter*).
     - **Technical/Accent**: Monospace for coordinates, timestamps, metrics, and era tags (*JetBrains Mono*).
   - Leverage fluid type scaling via CSS `clamp()` and enable `text-wrap: balance` on headings for optical perfection.

3. **Color, Light & Atmosphere**:
   - Embrace deep, moody obsidian canvases (`#0a0a0c`, `#111115`) infused with luminescent accents (Warm Gold `#d4af37`, Champagne `#f5e6c8`, Electric Violet `#8b5cf6`, Emerald `#10b981`).
   - Layer subtle tactile textures: SVG grain noise, backdrop blur (`backdrop-filter: blur(16px)`), and delicate 1px border glows (`rgba(255, 255, 255, 0.08)`).

4. **Motion with Intent & Physics**:
   - Avoid linear, robotic animations. Use physics-based spring easings: `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Micro-interactions must respond to the user: magnetic buttons, reactive hover glares, smooth cursor followers, and progressive scroll-driven timeline reveals.
   - Always honor `prefers-reduced-motion` with graceful, accessible fallbacks.

---

## 2. Technical Engineering Standards

1. **Vanilla Core Over Heavy Frameworks**:
   - Zero-bloat philosophy: Prefer semantic HTML5, modern Vanilla CSS, and modular ES JavaScript.
   - Do not load heavy runtime UI libraries (React, Angular, Tailwind) unless explicitly requested. A veteran designer understands browser primitives natively.

2. **60 FPS Performance Mandate**:
   - Animate exclusively compositor-friendly properties: `transform`, `opacity`, and CSS custom properties.
   - Keep Canvas loops decoupled, use `requestAnimationFrame`, and respect battery/CPU constraints via Intersection Observers when elements are off-screen.

3. **Modern Web Platform APIs**:
   - Utilize native `<dialog>` for accessible modal experiences with `backdrop` and keyboard dismiss (`Escape`).
   - Use CSS Container Queries, CSS Grid (`minmax`, auto-fit), `:has()`, `:user-valid` form states, and native scroll-driven animations with feature detection (`@supports`).

---

## 3. The 25-Year Historical Perspective (1999–2025)

Vineeth's work bridges four monumental eras of digital history:
- **1999–2004**: The Raw Dawn (HTML 3.2/4.0, CSS Zen Garden, table layouts, pixel gifs).
- **2005–2011**: The Kinetic Revolution (Macromedia/Adobe Flash, ActionScript, skeuomorphic realism, rich interactive sound).
- **2012–2018**: The Responsive Paradigm (Fluid grids, media queries, flat design, design systems at scale).
- **2019–2025+**: The Avant-Garde & Spatial Frontier (WebGL, fluid shaders, variable fonts, generative AI orchestration, zero-latency spatial web).

// Tactile Web Audio API micro-sound synthesizer
let audioCtx = null;
let soundEnabled = false;

export function initSound() {
  const toggleBtn = document.getElementById('sound-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    toggleBtn.classList.toggle('sound-on', soundEnabled);
    toggleBtn.setAttribute('aria-pressed', soundEnabled);
    const label = toggleBtn.querySelector('.sound-status-text');
    if (label) {
      label.textContent = soundEnabled ? 'AUDIO: ON' : 'AUDIO: MUTED';
    }
    const icon = toggleBtn.querySelector('.sound-status-icon');
    if (icon) {
      icon.textContent = soundEnabled ? '🔊' : '🔈';
    }

    if (soundEnabled) {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      playBlip(600, 0.04);
    }
  });
}

export function playBlip(freq = 440, duration = 0.05, type = 'sine') {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    
    // Soft click envelope to prevent speaker pop
    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (err) {
    console.debug('Audio blip error:', err);
  }
}

export function playSuccessChime() {
  if (!soundEnabled || !audioCtx) return;
  playBlip(523.25, 0.08); // C5
  setTimeout(() => playBlip(659.25, 0.08), 70); // E5
  setTimeout(() => playBlip(783.99, 0.12), 140); // G5
}

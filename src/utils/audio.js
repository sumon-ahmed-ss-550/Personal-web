// Web Audio API Synthesizer for UI micro-interactions
// Zero external files, zero latency, ultra-lightweight

let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isSoundEnabled = () => {
  if (typeof window === 'undefined') return false;
  const saved = localStorage.getItem('soundEnabled');
  return saved === 'true'; // Default is muted unless user toggles it on
};

export const setSoundEnabled = (enabled) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('soundEnabled', enabled ? 'true' : 'false');
  window.dispatchEvent(new Event('soundchange'));
};

export const playTick = () => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(850, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.035);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  } catch {
    // Graceful fallback for restricted audio policies
  }
};

export const playPop = () => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 0.05);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  } catch {
    // Graceful fallback
  }
};

export const playSuccess = () => {
  if (!isSoundEnabled()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Dual-tone chime (C5 -> E5)
    [523.25, 659.25].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const startTime = now + idx * 0.06;

      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.04, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.13);
    });
  } catch {
    // Graceful fallback
  }
};


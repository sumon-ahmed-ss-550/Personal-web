// Centralized Theme Manager for Obsidian Craft
// Synchronizes CSS custom properties, theme presets, and window events

export const ACCENT_PRESETS = [
  { name: 'Electric Indigo', value: '#6366f1', light: '#818cf8', aliases: ['indigo', 'default'] },
  { name: 'Cyber Cyan', value: '#06b6d4', light: '#22d3ee', aliases: ['cyan', 'sky'] },
  { name: 'Emerald Signal', value: '#10b981', light: '#34d399', aliases: ['emerald', 'green'] },
  { name: 'Solar Amber', value: '#f59e0b', light: '#fbbf24', aliases: ['amber', 'yellow', 'orange'] },
  { name: 'Neon Rose', value: '#f43f5e', light: '#fb7185', aliases: ['rose', 'red', 'pink'] },
  { name: 'Violet Pulse', value: '#8b5cf6', light: '#a78bfa', aliases: ['violet', 'purple'] },
  { name: 'Royal Blue', value: '#3b82f6', light: '#60a5fa', aliases: ['blue'] },
  { name: 'Teal Flare', value: '#14b8a6', light: '#2dd4bf', aliases: ['teal'] },
];

export const hexToRgb = (hex) => {
  if (!hex || !hex.startsWith('#') || hex.length < 7) return '99, 102, 241';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

export const applyAccentColor = (input) => {
  if (typeof window === 'undefined' || !input) return null;
  const cleaned = input.trim().toLowerCase();

  // Check alias or name or value
  const matched = ACCENT_PRESETS.find(
    (c) =>
      c.value.toLowerCase() === cleaned ||
      c.name.toLowerCase() === cleaned ||
      c.aliases.includes(cleaned)
  );

  let targetHex = '';
  let lightVal = '';

  if (matched) {
    targetHex = matched.value;
    lightVal = matched.light;
  } else if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(cleaned)) {
    // 3 or 6 digit hex
    targetHex = cleaned.length === 4
      ? `#${cleaned[1]}${cleaned[1]}${cleaned[2]}${cleaned[2]}${cleaned[3]}${cleaned[3]}`
      : cleaned;
    lightVal = targetHex;
  } else {
    return null;
  }

  const rgbVal = hexToRgb(targetHex);
  const root = document.documentElement;

  root.style.setProperty('--primary', targetHex);
  root.style.setProperty('--primary-rgb', rgbVal);
  root.style.setProperty('--primary-light', lightVal);

  localStorage.setItem('accentColor', targetHex);
  window.dispatchEvent(new CustomEvent('accentcolorchange', { detail: targetHex }));
  window.dispatchEvent(new Event('storage'));

  return {
    hex: targetHex,
    name: matched?.name || targetHex,
  };
};

export const setThemeMode = (mode) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('theme', mode);
  window.dispatchEvent(new Event('themechange'));
  window.dispatchEvent(new Event('storage'));
};

export const getThemeMode = () => {
  if (typeof window === 'undefined') return 'dark';
  return localStorage.getItem('theme') || 'dark';
};

export const getAccentColor = () => {
  if (typeof window === 'undefined') return '#6366f1';
  return localStorage.getItem('accentColor') || '#6366f1';
};


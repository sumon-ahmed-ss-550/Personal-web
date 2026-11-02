'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft } from 'lucide-react';
import { projects } from '@/data/projects';
import { applyAccentColor, setThemeMode, getThemeMode, getAccentColor, ACCENT_PRESETS } from '@/utils/theme';
import { playPop } from '@/utils/audio';

const INITIAL_OUTPUT = [
  { type: 'system', text: 'Welcome to Sumon Ahmed\'s Developer CLI (v1.0.0)' },
  { type: 'system', text: 'Type "help" to see available commands or "exit" to close.' },
];

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState(INITIAL_OUTPUT);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Global hotkey: Ctrl+K or Cmd+K to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isInputFocused = ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName);
      if (
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') ||
        ((e.key === '`' || e.key === '~') && (!isInputFocused || isOpen))
      ) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Focus input and lock body scroll on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Auto-scroll to bottom of output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (rawCmd) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCmdHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntries = [{ type: 'input', text: `smn@portfolio:~$ ${trimmed}` }];

    // 1. Direct mode shortcuts: "dark", "light", "toggle"
    if (['dark', 'light', 'toggle'].includes(cmd)) {
      const currentMode = getThemeMode();
      const nextMode = cmd === 'toggle' ? (currentMode === 'dark' ? 'light' : 'dark') : cmd;
      setThemeMode(nextMode);
      playPop();
      newEntries.push({
        type: 'success',
        text: `Appearance mode switched to ${nextMode.toUpperCase()}.`,
      });
      setHistory((prev) => [...prev, ...newEntries]);
      return;
    }

    // 2. Direct color shortcuts: e.g. "cyan", "emerald", "amber", "rose", "violet", "blue", "teal", "green", "red", "#hex"
    const directColorResult = applyAccentColor(cmd);
    if (directColorResult) {
      playPop();
      newEntries.push({
        type: 'success',
        text: `Theme accent color updated to ${directColorResult.name} (${directColorResult.hex})!
Buttons, glows, borders, and particle networks updated.`,
      });
      setHistory((prev) => [...prev, ...newEntries]);
      return;
    }

    switch (cmd) {
      case 'help':
      case '?':
        newEntries.push({
          type: 'output',
          text: `Available commands:
  help               Show this list of commands
  about              Learn about Sumon Ahmed
  skills             Display technical capabilities
  projects           List verified projects with links
  experience         Review career journey & timeline
  resume / cv        View & download official CV / resume
  contact            Direct contact (email, phone, socials)
  theme [arg]        Switch accent (e.g. "cyan", "rose", "emerald")
  dark / light       Toggle appearance mode (dark or light)
  sudo hire          Fast-track recruitment inquiry
  clear              Clear terminal history
  exit               Close this terminal window

Pro-Tip: You can type colors directly without "theme" (e.g. just type "cyan", "rose", "emerald", "blue", "dark")!`,
        });
        break;

      case 'about':
        newEntries.push({
          type: 'output',
          text: `Sumon Ahmed — Front-End & Full Stack Developer
Based in Rangpur, Bangladesh (GMT+6)
Focusing on high-performance React/Next.js architectures, accessible UI systems,
and modern full-stack web applications. Open to remote opportunities worldwide.`,
        });
        break;

      case 'skills':
        newEntries.push({
          type: 'output',
          text: `Frontend:   React, Next.js, JavaScript (ES6+), Tailwind CSS, HTML5, CSS3
Backend:    Node.js, Express.js, MongoDB, Mongoose, RESTful APIs
Workflow:   Git, GitHub, WCAG Accessibility, Responsive UI Architecture`,
        });
        break;

      case 'projects':
        newEntries.push({
          type: 'output',
          text: projects
            .map(
              (p, i) =>
                `[${i + 1}] ${p.title} (${p.category})
    ${p.description}
    Tech: ${p.technologies.join(', ')}
    GitHub: ${p.githubUrl}`
            )
            .join('\n\n'),
        });
        break;

      case 'experience':
        newEntries.push({
          type: 'output',
          text: `Career Timeline:
• Full-Stack & Front-End Developer (Independent / Freelance) — 2023 - Present
  Engineered decoupled MERN & Next.js applications, custom component libraries,
  and accessible user experiences.
• Frontend Engineering & Web Development — 2022 - 2023
  Specialized in modern JavaScript, React state management, and Tailwind CSS.`,
        });
        break;

      case 'contact':
        newEntries.push({
          type: 'output',
          text: `Contact Sumon Ahmed:
  Email:    md20sumon25ahmed@gmail.com
  Phone:    +8801707286766
  GitHub:   https://github.com/sumon-ahmed-ss-550
  LinkedIn: https://www.linkedin.com/in/sumon-ahmed-ss`,
        });
        break;

      case 'resume':
      case 'cv':
        newEntries.push({
          type: 'success',
          text: `Opening official resume PDF...
Direct download: /cv/sumon_resume.pdf`,
        });
        setTimeout(() => {
          window.open('/cv/sumon_resume.pdf', '_blank');
        }, 800);
        break;

      case 'color':
      case 'theme': {
        const sub = args[0]?.toLowerCase();

        // If no args or "list", show current theme info and options
        if (!sub || sub === 'list') {
          const currentMode = getThemeMode();
          const currentColor = getAccentColor();
          const matchedPreset = ACCENT_PRESETS.find(
            (p) => p.value.toLowerCase() === currentColor.toLowerCase()
          );

          newEntries.push({
            type: 'output',
            text: `Current Appearance:
  Mode:   ${currentMode.toUpperCase()}
  Accent: ${matchedPreset ? matchedPreset.name : currentColor} (${currentColor})

Usage:
  theme <color>      Set accent: indigo, cyan, emerald, amber, rose, violet, blue, teal, or #hex
  theme dark         Switch to dark mode
  theme light        Switch to light mode
  theme toggle       Toggle dark / light mode

Available Accent Presets:
${ACCENT_PRESETS.map((p) => `  • ${p.name.padEnd(16)}: theme ${p.aliases[0]} (${p.value})`).join('\n')}`,
          });
          break;
        }

        // Mode switching
        if (sub === 'dark') {
          setThemeMode('dark');
          playPop();
          newEntries.push({
            type: 'success',
            text: `Appearance mode switched to DARK.`,
          });
          break;
        }

        if (sub === 'light') {
          setThemeMode('light');
          playPop();
          newEntries.push({
            type: 'success',
            text: `Appearance mode switched to LIGHT.`,
          });
          break;
        }

        if (sub === 'toggle') {
          const currentMode = getThemeMode();
          const next = currentMode === 'dark' ? 'light' : 'dark';
          setThemeMode(next);
          playPop();
          newEntries.push({
            type: 'success',
            text: `Appearance mode toggled to ${next.toUpperCase()}.`,
          });
          break;
        }

        // Accent color setting
        const result = applyAccentColor(sub);
        if (result) {
          playPop();
          newEntries.push({
            type: 'success',
            text: `Theme accent color updated to ${result.name} (${result.hex})!
Buttons, glowing borders, and particle networks updated.`,
          });
        } else {
          newEntries.push({
            type: 'error',
            text: `Unrecognized color: "${sub}".
Try: theme indigo, theme cyan, theme emerald, theme amber, theme rose, theme violet, theme blue, theme teal, or any #hex code (e.g. theme #ff0055).`,
          });
        }
        break;
      }

      case 'sudo':
        if (args.join(' ').toLowerCase() === 'hire') {
          newEntries.push({
            type: 'success',
            text: `ACCESS GRANTED: Excellent decision!
Sumon Ahmed is actively available for front-end & full-stack roles.
Dispatching email prompt to: md20sumon25ahmed@gmail.com
Opening email client...`,
          });
          setTimeout(() => {
            window.location.href = 'mailto:md20sumon25ahmed@gmail.com?subject=Job%20Opportunity%20Inquiry%20via%20Terminal';
          }, 1200);
        } else {
          newEntries.push({
            type: 'error',
            text: `User is not in the sudoers file. Try "sudo hire".`,
          });
        }
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'exit':
      case 'quit':
        setIsOpen(false);
        return;

      default:
        newEntries.push({
          type: 'error',
          text: `Command not found: "${cmd}". Type "help" to see valid commands.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < cmdHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <>
      {/* Floating Terminal Trigger Button (Bottom-Left) */}
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open Interactive Developer Terminal (Ctrl+K)"
        title="Open Terminal (Ctrl + K)"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-surface/90 backdrop-blur-md border border-border shadow-xl hover:border-brand-primary/50 text-foreground transition-colors group"
      >
        <span className="p-1 rounded-md bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors">
          <TerminalIcon className="w-4 h-4" />
        </span>
        <span className="text-xs font-mono font-semibold hidden sm:inline">CLI Mode</span>
        <kbd className="hidden md:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border text-text-muted">
          Ctrl+K
        </kbd>
      </motion.button>

      {/* Terminal Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label="Developer Terminal"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`w-full flex flex-col rounded-2xl bg-[#0c0d14] border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 font-mono ${
                isExpanded ? 'max-w-6xl h-[88vh]' : 'max-w-2xl h-[520px]'
              }`}
            >
              {/* Terminal Window Titlebar */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#13141f] border-b border-white/5 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">smn@portfolio:~ (bash)</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <button
                    type="button"
                    onClick={() => setIsExpanded(!isExpanded)}
                    aria-label={isExpanded ? 'Restore window size' : 'Maximize terminal'}
                    className="p-1 rounded hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close terminal window"
                    className="p-1 rounded hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Terminal Output Stream */}
              <div
                ref={scrollRef}
                onClick={() => inputRef.current?.focus()}
                className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-2.5 text-xs sm:text-sm text-zinc-300 cursor-text"
              >
                {history.map((entry, index) => (
                  <div key={index} className="leading-relaxed">
                    {entry.type === 'input' && (
                      <span className="text-brand-primary font-bold">{entry.text}</span>
                    )}
                    {entry.type === 'system' && (
                      <span className="text-zinc-500 italic">{entry.text}</span>
                    )}
                    {entry.type === 'output' && (
                      <pre className="whitespace-pre-wrap font-mono text-zinc-300">{entry.text}</pre>
                    )}
                    {entry.type === 'success' && (
                      <pre className="whitespace-pre-wrap font-mono text-emerald-400 font-semibold">{entry.text}</pre>
                    )}
                    {entry.type === 'error' && (
                      <pre className="whitespace-pre-wrap font-mono text-rose-400">{entry.text}</pre>
                    )}
                  </div>
                ))}
              </div>

              {/* Terminal Input Line */}
              <div className="px-4 py-3 bg-[#13141f]/70 border-t border-white/5 flex items-center gap-2">
                <span className="text-brand-primary font-bold text-xs sm:text-sm">smn@portfolio:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command (e.g. 'help', 'skills', 'cyan', 'dark')..."
                  aria-label="Terminal command input"
                  className="flex-1 bg-transparent text-xs sm:text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    handleCommand(inputVal);
                    setInputVal('');
                  }}
                  aria-label="Submit command"
                  className="p-1 text-zinc-400 hover:text-brand-primary transition-colors"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

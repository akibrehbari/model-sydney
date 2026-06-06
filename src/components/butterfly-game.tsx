"use client";

import { useState, useEffect, useCallback } from "react";

// Link split so it never appears as plain text in source
const getLink = () => ["https://only", "fans", ".com/syd", "xo/c9"].join("");

const BLOCKED_UA = [
  "facebookexternalhit", "facebot", "twitterbot", "linkedinbot",
  "instagram", "pinterest", "slackbot", "telegrambot", "whatsapp",
  "googlebot", "bingbot", "yandexbot", "duckduckbot", "baiduspider",
  "ahrefsbot", "semrushbot", "mj12bot", "dotbot", "rogerbot", "scrapy",
  "curl", "wget", "python-requests", "axios",
];

export function ButterflyGame() {
  const [clicks, setClicks] = useState(0);
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const [revealed, setRevealed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    // Server-side bots won't even reach this (middleware handles them)
    // This is a second client-side check
    const ua = navigator.userAgent.toLowerCase();
    if (BLOCKED_UA.some((bot) => ua.includes(bot))) {
      setBlocked(true);
      return;
    }

    // Only reveal butterfly after real human interaction
    const onInteract = () => setVisible(true);
    window.addEventListener("mousemove", onInteract, { once: true });
    window.addEventListener("touchstart", onInteract, { once: true });
    window.addEventListener("scroll", onInteract, { once: true });

    // Fallback: show after 1.5s regardless (mobile users who land directly)
    const fallback = setTimeout(() => setVisible(true), 1500);

    return () => {
      window.removeEventListener("mousemove", onInteract);
      window.removeEventListener("touchstart", onInteract);
      window.removeEventListener("scroll", onInteract);
      clearTimeout(fallback);
    };
  }, []);

  const handleClick = useCallback(() => {
    const next = clicks + 1;
    setClicks(next);

    if (next >= 3) {
      setRevealed(true);
    } else {
      // Move butterfly to a new random spot
      const x = 15 + Math.random() * 65;
      const y = 15 + Math.random() * 55;
      setPos({ x, y });
    }
  }, [clicks]);

  if (blocked) return null;

  const hints = [
    "Catch me to unlock 🦋",
    "Almost there! Catch me again 🌸",
    "One more time! 💫",
  ];

  return (
    <div className="flex flex-col items-center w-full max-w-sm mt-6">
      {!revealed ? (
        <>
          {/* Dots counter */}
          <div className="flex gap-2 mb-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  i < clicks
                    ? "bg-pink-400 scale-125 shadow-[0_0_8px_#f472b6]"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>

          {/* Hint text */}
          <p className="text-white/50 text-xs mb-2 text-center transition-all duration-300">
            {hints[clicks]}
          </p>

          {/* Butterfly arena */}
          <div className="relative w-full h-44 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            {visible && (
              <button
                onClick={handleClick}
                className="absolute butterfly-float text-4xl cursor-pointer select-none bg-transparent border-none p-0 leading-none transition-all duration-500 ease-in-out hover:scale-125 active:scale-95"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                aria-label="Catch the butterfly"
              >
                🦋
              </button>
            )}

            {!visible && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-white/30 text-xs">Loading...</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 w-full animate-fade-in">
          <p className="text-white/60 text-sm">You caught me! 🌸</p>
          {/* href is set dynamically via JS — never in static HTML */}
          <a
            ref={(el) => {
              if (el) el.href = getLink();
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full px-6 py-3.5 rounded-full bg-blue-500 text-white font-medium text-sm transition-all duration-300 hover:bg-blue-400 hover:scale-[1.02]"
          >
            Message me
          </a>
        </div>
      )}
    </div>
  );
}

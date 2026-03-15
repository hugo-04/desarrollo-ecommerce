// ========== CSS ANIMATIONS ==========
// All keyframe animations and utility CSS classes are centralized here.
// This is injected once via dangerouslySetInnerHTML in the root layout.

export const globalAnimationsCSS = `
  /* ===== MARQUEE ===== */
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-reverse {
    0%   { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  .marquee-container { overflow: hidden; position: relative; }
  .marquee-content {
    display: flex;
    animation: marquee 30s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }
  .marquee-container:hover .marquee-content { animation-play-state: paused; }
  .marquee-container-reverse { overflow: hidden; position: relative; }
  .marquee-content-reverse {
    display: flex;
    animation: marquee-reverse 38s linear infinite;
    will-change: transform;
    backface-visibility: hidden;
  }
  .marquee-container-reverse:hover .marquee-content-reverse { animation-play-state: paused; }
  /* legacy */
  .marquee-container-slow { overflow: hidden; position: relative; }
  .marquee-content-slow { display: flex; animation: marquee 42s linear infinite; }
  .marquee-container-slow:hover .marquee-content-slow { animation-play-state: paused; }

  /* ===== REVEAL ANIMATIONS — spring easing ===== */
  @keyframes reveal-up {
    0% {
      opacity: 0;
      transform: translateY(38px) scale(0.975);
      filter: blur(6px);
    }
    55% { filter: blur(0px); }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }
  @keyframes reveal-left {
    0% {
      opacity: 0;
      transform: translateX(-40px) scale(0.98);
      filter: blur(5px);
    }
    55% { filter: blur(0px); }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
      filter: blur(0px);
    }
  }
  @keyframes reveal-right {
    0% {
      opacity: 0;
      transform: translateX(40px) scale(0.98);
      filter: blur(5px);
    }
    55% { filter: blur(0px); }
    100% {
      opacity: 1;
      transform: translateX(0) scale(1);
      filter: blur(0px);
    }
  }

  /* cubic-bezier(0.16, 1, 0.3, 1) = expo-out / spring — suave y natural */
  .animate-reveal {
    animation: reveal-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .animate-reveal-child {
    animation: reveal-up 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .animate-reveal-left {
    animation: reveal-left 0.95s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .animate-reveal-right {
    animation: reveal-right 0.95s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  /* ===== PARALLAX IMG ===== */
  .parallax-img {
    will-change: transform;
    backface-visibility: hidden;
  }

  /* ===== BANNER SWEEP — barrido diagonal cada 7s ===== */
  @keyframes sweep {
    0%   { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
  }
  .banner-sweep {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }
  .banner-sweep::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    left: -40%;
    width: 40%;
    background: linear-gradient(
      105deg,
      transparent 30%,
      rgba(255, 255, 255, 0.04) 50%,
      rgba(255, 255, 255, 0.015) 60%,
      transparent 70%
    );
    animation: sweep 7s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    animation-delay: 1.5s;
  }

  /* ===== WHATSAPP BOUNCE ===== */
  @keyframes whatsapp-bounce {
    0%, 100% { transform: translateY(0) scale(1); }
    40% { transform: translateY(-10px) scale(1.05); }
    60% { transform: translateY(-5px) scale(1.02); }
  }
  .whatsapp-bounce { animation: whatsapp-bounce 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite; }

  /* ===== HERO ACCENT BAR PULSE ===== */
  @keyframes pulse-line {
    0%, 100% { opacity: 0.45; transform: scaleX(0.55); }
    50% { opacity: 1; transform: scaleX(1); }
  }
  .pulse-line { animation: pulse-line 3.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

  /* ===== FLOATING ORB DECORATION ===== */
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33%  { transform: translateY(-14px) rotate(1.2deg); }
    66%  { transform: translateY(-7px) rotate(-0.8deg); }
  }
  .float        { animation: float 9s ease-in-out infinite; }
  .float-delayed{ animation: float 9s ease-in-out 2.5s infinite; }
  .float-slow   { animation: float 13s ease-in-out infinite; }

  /* ===== SHIMMER EFFECT ===== */
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  .shimmer {
    background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%);
    background-size: 200% 100%;
    animation: shimmer 3.5s linear infinite;
  }

  /* ===== SECTION DIVIDER ===== */
  .section-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,51,160,0.08), transparent);
  }

  /* ===== SMOOTH SCROLL ===== */
  html { scroll-behavior: smooth; }

  /* ===== DEPTH SECTION ===== */
  .depth-section {
    box-shadow:
      0 -1px 0 0 rgba(0,0,0,0.02),
      0 1px 2px rgba(0,0,0,0.03),
      0 4px 16px rgba(0,0,0,0.02);
  }
`

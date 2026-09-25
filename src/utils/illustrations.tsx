import React from 'react';

// Cozy Desk Scene (Header Banner)
export const CozyDeskIllustration: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => {
  return (
    <div className={`relative overflow-hidden flex items-center justify-end ${className}`}>
      <svg
        viewBox="0 0 520 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover select-none pointer-events-none"
      >
        {/* Soft Background Warm Gradient */}
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7ED" />
            <stop offset="60%" stopColor="#EFF6FF" />
            <stop offset="100%" stopColor="#EDE9FE" />
          </linearGradient>
          <linearGradient id="plantGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="deskGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        <rect width="520" height="220" rx="28" fill="url(#skyGrad)" />

        {/* Window Pane & Sunlight */}
        <path d="M120 0 L400 0 L360 220 L80 220 Z" fill="#FFFFFF" fillOpacity="0.35" />
        <rect x="300" y="20" width="180" height="130" rx="12" stroke="#CBD5E1" strokeWidth="3" fill="#F8FAFC" fillOpacity="0.4" />
        <line x1="390" y1="20" x2="390" y2="150" stroke="#CBD5E1" strokeWidth="2.5" />
        <line x1="300" y1="85" x2="480" y2="85" stroke="#CBD5E1" strokeWidth="2.5" />

        {/* Small Sun in Window */}
        <circle cx="440" cy="50" r="14" fill="#FBBF24" fillOpacity="0.8" />

        {/* Plants on Shelf / Window */}
        <ellipse cx="295" cy="148" rx="12" ry="4" fill="#E2E8F0" />
        <path d="M290 148 L287 130 L303 130 L300 148 Z" fill="#F97316" />
        <path d="M295 130 C280 115 275 90 282 80 C290 70 300 100 295 130 Z" fill="url(#plantGrad)" />
        <path d="M295 130 C310 118 318 95 310 85 C300 75 292 105 295 130 Z" fill="#10B981" />

        {/* Desk Surface */}
        <rect x="40" y="170" width="460" height="14" rx="4" fill="url(#deskGrad)" />
        <rect x="50" y="184" width="14" height="36" fill="#92400E" />
        <rect x="470" y="184" width="14" height="36" fill="#92400E" />

        {/* Coffee Mug with gentle steam */}
        <rect x="230" y="152" width="16" height="18" rx="3" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
        <path d="M246 156 C250 156 251 164 246 164" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <path d="M235 146 Q237 140 234 135" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
        <path d="M240 147 Q242 142 239 137" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

        {/* Laptop */}
        <path d="M260 170 L280 142 L340 142 L330 170 Z" fill="#334155" />
        <rect x="282" y="144" width="54" height="24" rx="2" fill="#38BDF8" fillOpacity="0.8" />
        {/* Apple/Star logo glow */}
        <circle cx="309" cy="156" r="3" fill="#FFFFFF" />

        {/* Boy Character at Desk (Sai) */}
        {/* Chair Back */}
        <rect x="365" y="110" width="18" height="60" rx="8" fill="#1E293B" />
        {/* Head & Hair */}
        <circle cx="395" cy="85" r="18" fill="#FCD34D" />
        {/* Dark messy anime hair */}
        <path d="M378 82 C378 68 390 64 402 64 C414 64 418 72 418 84 C412 80 405 82 398 76 C392 84 384 80 378 82 Z" fill="#1E1B4B" />
        {/* Face profile / headphone */}
        <circle cx="410" cy="86" r="6" fill="#6366F1" />
        {/* Yellow/Amber Hoodie */}
        <path d="M382 102 C372 110 365 130 362 170 L420 170 C422 145 420 115 410 102 Z" fill="url(#hoodieGrad)" />
        {/* Hoodie Pocket & Arm typing on laptop */}
        <path d="M375 125 C360 140 330 160 310 166 L315 170 C335 166 370 148 385 135 Z" fill="#D97706" />
        {/* Second arm */}
        <path d="M388 128 C375 142 345 162 325 167 L330 170 C350 166 380 148 395 135 Z" fill="#F59E0B" />

        {/* Monstera plant on floor/table left */}
        <path d="M110 185 C80 150 95 100 130 110 C145 115 150 140 120 175" fill="#10B981" fillOpacity="0.85" />
        <path d="M125 185 C140 140 180 125 175 155 C170 175 145 185 130 185" fill="#059669" fillOpacity="0.9" />
      </svg>
    </div>
  );
};

// Mascot Dog / Cat ("You're doing great! Keep going.")
export const CuteMascotIllustration: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => {
  return (
    <div className={`relative ${className} select-none`}>
      <svg viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Grass / Ground pillow */}
        <ellipse cx="60" cy="86" rx="48" ry="12" fill="#D1FAE5" />
        <path d="M22 84 C20 72 26 68 28 84" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M98 84 C96 74 102 70 104 84" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />

        {/* Sleeping / Relaxing Shiba Dog Body */}
        <path d="M32 76 C32 50 50 42 80 44 C95 45 102 58 100 76 C98 85 85 86 60 86 C40 86 32 84 32 76 Z" fill="#FB923C" />
        {/* White chest & belly */}
        <path d="M48 68 C55 60 75 60 85 70 C85 82 70 85 55 84 C48 83 46 75 48 68 Z" fill="#FFF7ED" />

        {/* Head */}
        <circle cx="45" cy="54" r="18" fill="#FB923C" />
        {/* Cheeks white */}
        <ellipse cx="38" cy="58" rx="8" ry="6" fill="#FFF7ED" />
        {/* Ears */}
        <path d="M34 42 L38 30 L46 40 Z" fill="#EA580C" />
        <path d="M48 40 L56 30 L60 42 Z" fill="#EA580C" />
        <path d="M37 40 L40 34 L44 39 Z" fill="#FED7AA" />
        <path d="M50 39 L54 34 L57 41 Z" fill="#FED7AA" />

        {/* Happy Sleeping Eyes */}
        <path d="M34 54 Q38 58 42 54" stroke="#431407" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M46 54 Q50 58 54 54" stroke="#431407" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Nose & Mouth */}
        <ellipse cx="44" cy="60" rx="2.5" ry="1.5" fill="#431407" />
        <path d="M44 62 Q44 65 42 66" stroke="#431407" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M44 62 Q44 65 46 66" stroke="#431407" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Cute blush */}
        <ellipse cx="33" cy="58" rx="3" ry="2" fill="#F43F5E" fillOpacity="0.4" />
        <ellipse cx="55" cy="58" rx="3" ry="2" fill="#F43F5E" fillOpacity="0.4" />

        {/* Little Tail wagging */}
        <path d="M100 68 Q108 58 104 52" stroke="#FB923C" strokeWidth="6" strokeLinecap="round" fill="none" />

        {/* Sparkle stars */}
        <path d="M102 32 L104 26 L106 32 L112 34 L106 36 L104 42 L102 36 L96 34 Z" fill="#FBBF24" />
        <path d="M18 42 L19 38 L20 42 L24 43 L20 44 L19 48 L18 44 L14 43 Z" fill="#FBBF24" />
      </svg>
    </div>
  );
};

// Focus Mode Character Illustration (Inside Timer)
export const FocusBoyIllustration: React.FC<{ className?: string }> = ({ className = "w-48 h-36" }) => {
  return (
    <div className={`relative ${className} select-none`}>
      <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Soft Shadow */}
        <ellipse cx="120" cy="168" rx="90" ry="10" fill="#E2E8F0" fillOpacity="0.7" />

        {/* Desk and Plant Left */}
        <path d="M40 160 L200 160" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
        
        {/* Coffee Mug */}
        <rect x="52" y="142" width="12" height="16" rx="2" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M52 147 C48 147 48 153 52 153" stroke="#94A3B8" strokeWidth="1.5" />
        <path d="M58 138 Q60 134 57 130" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" />

        {/* Plant Right */}
        <path d="M188 160 L185 146 L195 146 L192 160 Z" fill="#FB923C" />
        <path d="M190 146 C180 135 180 120 185 110 C192 120 195 135 190 146 Z" fill="#10B981" />
        <path d="M190 146 C198 138 204 125 198 116 C192 124 190 138 190 146 Z" fill="#059669" />

        {/* Laptop */}
        <rect x="88" y="132" width="56" height="28" rx="2" fill="#334155" />
        <rect x="91" y="134" width="50" height="22" rx="1" fill="#38BDF8" fillOpacity="0.85" />
        <circle cx="116" cy="145" r="2.5" fill="#FFFFFF" />
        <path d="M80 160 L90 156 L142 156 L152 160 Z" fill="#64748B" />

        {/* Boy Sitting Front/Slight Angle */}
        {/* Head */}
        <circle cx="116" cy="72" r="22" fill="#FED7AA" />
        {/* Hair */}
        <path d="M96 68 C96 50 110 44 125 44 C140 44 145 52 145 68 C138 62 130 64 120 58 C112 66 104 62 96 68 Z" fill="#1E1B4B" />
        <circle cx="94" cy="72" r="5" fill="#6366F1" />
        <circle cx="138" cy="72" r="5" fill="#6366F1" />
        {/* Face */}
        <circle cx="110" cy="74" r="2" fill="#431407" />
        <circle cx="124" cy="74" r="2" fill="#431407" />
        <path d="M114 82 Q117 84 120 82" stroke="#431407" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Cute blush */}
        <circle cx="106" cy="78" r="2" fill="#F43F5E" fillOpacity="0.4" />
        <circle cx="128" cy="78" r="2" fill="#F43F5E" fillOpacity="0.4" />

        {/* Yellow Hoodie */}
        <path d="M100 94 C90 102 82 120 80 156 L152 156 C150 120 142 102 132 94 Z" fill="#F59E0B" />
        {/* Arms typing */}
        <path d="M88 116 C88 132 98 148 106 150" stroke="#D97706" strokeWidth="8" strokeLinecap="round" />
        <path d="M144 116 C144 132 134 148 126 150" stroke="#D97706" strokeWidth="8" strokeLinecap="round" />

        {/* Ambient sparkle */}
        <circle cx="70" cy="60" r="2" fill="#FBBF24" />
        <circle cx="165" cy="54" r="2.5" fill="#8B5CF6" />
        <circle cx="178" cy="85" r="1.5" fill="#EC4899" />
      </svg>
    </div>
  );
};

// Robot Mascot for AI Assistant
export const RobotAvatar: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative ${className} select-none`}>
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="64" height="64" rx="18" fill="#6366F1" />
        {/* Antenna */}
        <line x1="32" y1="12" x2="32" y2="18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="10" r="3" fill="#FBBF24" />

        {/* Robot Face Screen */}
        <rect x="14" y="18" width="36" height="28" rx="8" fill="#1E1B4B" />

        {/* Glowing Cyan Eyes */}
        <circle cx="24" cy="30" r="4" fill="#38BDF8" />
        <circle cx="40" cy="30" r="4" fill="#38BDF8" />
        <circle cx="25" cy="29" r="1.5" fill="#FFFFFF" />
        <circle cx="41" cy="29" r="1.5" fill="#FFFFFF" />

        {/* Smile */}
        <path d="M26 38 Q32 42 38 38" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Little Ear Bolts */}
        <rect x="10" y="27" width="4" height="10" rx="2" fill="#CBD5E1" />
        <rect x="50" y="27" width="4" height="10" rx="2" fill="#CBD5E1" />
      </svg>
    </div>
  );
};

// Sai User Avatar
export const UserAvatar: React.FC<{ className?: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`rounded-full overflow-hidden bg-amber-100 flex items-center justify-center border-2 border-indigo-200 ${className} select-none`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="40" height="40" fill="#FEF3C7" />
        {/* Hair */}
        <circle cx="20" cy="17" r="11" fill="#1E1B4B" />
        <circle cx="20" cy="18" r="9" fill="#FED7AA" />
        {/* Anime hair spikes */}
        <path d="M11 16 C11 10 16 7 21 7 C26 7 29 10 29 16 C26 13 23 15 20 12 C17 15 14 13 11 16 Z" fill="#1E1B4B" />
        {/* Eyes */}
        <circle cx="17" cy="18" r="1.2" fill="#1E1B4B" />
        <circle cx="23" cy="18" r="1.2" fill="#1E1B4B" />
        {/* Smile */}
        <path d="M18.5 21 Q20 22.5 21.5 21" stroke="#1E1B4B" strokeWidth="1" strokeLinecap="round" fill="none" />
        {/* Yellow Hoodie */}
        <path d="M12 28 C12 24 16 23 20 23 C24 23 28 24 28 28 L28 40 L12 40 Z" fill="#F59E0B" />
      </svg>
    </div>
  );
};

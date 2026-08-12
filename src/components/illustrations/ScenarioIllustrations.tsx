const INK = "#2A2640";

function SketchFrame({ children }: { children: React.ReactNode }) {
  return (
    <>
      <path
        d="M6 14 C4 9, 10 5, 16 5 L284 6 C292 6, 296 11, 295 18 L294 202 C294 209, 289 214, 282 214 L18 213 C10 213, 5 208, 6 200 Z"
        fill="none"
        stroke={INK}
        strokeWidth="1.5"
        opacity="0.35"
      />
      {children}
    </>
  );
}

export function AmazonPhotosIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SketchFrame>
        {/* small existing storage cloud */}
        <path
          d="M62 148 C48 148, 40 138, 44 127 C40 116, 52 107, 63 110 C68 98, 88 96, 96 107 C110 103, 124 113, 121 126 C130 129, 130 144, 118 147 Z"
          fill="#A9CDE8"
          stroke={INK}
          strokeWidth="2"
          opacity="0.9"
        />
        {/* photo stack sitting in front of small cloud */}
        <g transform="translate(48 118) rotate(-6)">
          <rect x="0" y="10" width="46" height="36" rx="4" fill="#FDFCFA" stroke={INK} strokeWidth="1.8" />
        </g>
        <g transform="translate(58 108) rotate(4)">
          <rect x="0" y="10" width="46" height="36" rx="4" fill="#F2B6A8" stroke={INK} strokeWidth="1.8" opacity="0.85" />
          <circle cx="12" cy="22" r="4" fill={INK} opacity="0.5" />
          <path d="M4 40 L18 26 L28 34 L42 20 L42 42 L4 42 Z" fill={INK} opacity="0.35" />
        </g>

        {/* big incoming cloud, dwarfing the small one */}
        <path
          d="M175 95 C155 95, 142 80, 150 63 C144 46, 165 30, 186 36 C194 18, 226 15, 238 33 C260 27, 280 44, 271 63 C286 68, 285 92, 266 96 Z"
          fill="#F6C77D"
          stroke={INK}
          strokeWidth="2.2"
        />
        {/* motion lines trailing the big cloud to suggest sudden arrival */}
        <path d="M150 70 L128 66" stroke={INK} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        <path d="M156 84 L132 84" stroke={INK} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
        <path d="M162 98 L140 102" stroke={INK} strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />

        {/* sparkle marks */}
        <path d="M230 60 L234 68 L242 71 L234 74 L230 82 L226 74 L218 71 L226 68 Z" fill="#E8A94F" opacity="0.9" />
        <path d="M100 60 L102 65 L107 67 L102 69 L100 74 L98 69 L93 67 L98 65 Z" fill="#8B7FD9" opacity="0.8" />

        {/* baseline / horizon sketch */}
        <path d="M18 178 C 90 174, 210 174, 282 178" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.3" />
      </SketchFrame>
    </svg>
  );
}

export function GarageJetEngineIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SketchFrame>
        {/* garage silhouette, background left */}
        <path
          d="M20 150 L20 96 L58 62 L96 96 L96 150 Z"
          fill="#A9CDE8"
          stroke={INK}
          strokeWidth="2"
          opacity="0.55"
        />
        <path d="M20 96 L58 62 L96 96" fill="none" stroke={INK} strokeWidth="2" opacity="0.7" />
        <rect x="40" y="118" width="20" height="32" rx="2" fill="#FDFCFA" stroke={INK} strokeWidth="1.6" opacity="0.8" />

        {/* blueprint grid corner, engineering feel */}
        <g opacity="0.35" stroke={INK} strokeWidth="1">
          <path d="M14 20 L74 20 M14 34 L74 34 M14 48 L74 48" strokeDasharray="3 4" />
          <path d="M14 20 L14 60 M34 20 L34 60 M54 20 L54 60" strokeDasharray="3 4" />
        </g>

        {/* workbench */}
        <path d="M100 168 L268 168" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <path d="M112 168 L112 184 M256 168 L256 184" stroke={INK} strokeWidth="3" strokeLinecap="round" />

        {/* jet engine body */}
        <g transform="translate(140 108)">
          <path
            d="M0 30 C0 14, 14 4, 34 4 L70 4 C86 4, 96 14, 96 30 C96 46, 86 56, 70 56 L34 56 C14 56, 0 46, 0 30 Z"
            fill="#F6C77D"
            stroke={INK}
            strokeWidth="2.2"
          />
          {/* turbine face */}
          <circle cx="20" cy="30" r="19" fill="#FDFCFA" stroke={INK} strokeWidth="2" />
          <circle cx="20" cy="30" r="6" fill={INK} opacity="0.75" />
          <path d="M20 14 L20 24 M20 36 L20 46 M6 30 L16 30 M24 30 L34 30 M9 19 L16 26 M31 41 L24 34 M31 19 L24 26 M9 41 L16 34" stroke={INK} strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
          {/* body ribbing */}
          <path d="M46 8 L46 52 M62 6 L62 54 M78 10 L78 50" stroke={INK} strokeWidth="1.4" opacity="0.4" />
          {/* exhaust flicker */}
          <path d="M96 24 L110 20 L100 30 L112 32 L96 38" stroke="#E8A94F" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* person examining, simple line figure */}
        <g transform="translate(232 100)">
          <circle cx="12" cy="10" r="10" fill="#F2B6A8" stroke={INK} strokeWidth="1.8" />
          <path d="M12 20 C0 24, -4 46, 2 66 L22 66 C28 46, 24 24, 12 20 Z" fill="#8B7FD9" stroke={INK} strokeWidth="1.8" opacity="0.85" />
          {/* arm reaching toward engine */}
          <path d="M2 34 C-10 30, -16 22, -18 12" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* idea lightbulb */}
          <circle cx="14" cy="-10" r="7" fill="#FDFCFA" stroke={INK} strokeWidth="1.6" />
          <path d="M11 -3 L11 2 M17 -3 L17 2" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M14 -20 L14 -24 M24 -16 L27 -19 M4 -16 L1 -19" stroke={INK} strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        </g>

        {/* sparkle */}
        <path d="M114 70 L116 75 L121 77 L116 79 L114 84 L112 79 L107 77 L112 75 Z" fill="#8B7FD9" opacity="0.8" />
      </SketchFrame>
    </svg>
  );
}

export function AcquisitionOfferIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SketchFrame>
        <g transform="translate(90 60)">
          <path d="M0 12 C0 6, 5 2, 11 2 L89 2 C95 2, 100 6, 100 12 L100 128 C100 134, 95 138, 89 138 L11 138 C5 138, 0 134, 0 128 Z" fill="#FDFCFA" stroke={INK} strokeWidth="2" />
          <path d="M14 30 L86 30 M14 48 L86 48 M14 66 L70 66" stroke={INK} strokeWidth="1.6" opacity="0.5" />
          <path d="M14 92 L54 92 L54 112 L14 112 Z" fill="#A9CDE8" stroke={INK} strokeWidth="1.6" opacity="0.8" />
        </g>
        <g transform="translate(196 140)">
          <circle cx="24" cy="24" r="24" fill="#F6C77D" stroke={INK} strokeWidth="2" />
          <path d="M24 12 L24 24 L33 30" stroke={INK} strokeWidth="2.2" strokeLinecap="round" fill="none" />
        </g>
        <path d="M56 178 C 120 172, 200 172, 254 178" stroke={INK} strokeWidth="1.4" opacity="0.3" strokeLinecap="round" />
      </SketchFrame>
    </svg>
  );
}

export function ResearchEthicsIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 220"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SketchFrame>
        <g transform="translate(70 50)">
          <path d="M0 10 C0 5, 4 1, 9 1 L91 1 C96 1, 100 5, 100 10 L100 140 C100 145, 96 149, 91 149 L9 149 C4 149, 0 145, 0 140 Z" fill="#FDFCFA" stroke={INK} strokeWidth="2" />
          <path d="M14 28 L86 28 M14 46 L86 46 M14 64 L60 64" stroke={INK} strokeWidth="1.6" opacity="0.5" />
        </g>
        <g transform="translate(150 90)">
          <path d="M0 60 L60 0" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M-4 8 C-4 -2, 10 -2, 10 8 C10 16, -4 16, -4 8 Z" fill="#A9CDE8" stroke={INK} strokeWidth="1.8" transform="translate(0 6)" />
          <path d="M46 46 C46 36, 60 36, 60 46 C60 54, 46 54, 46 46 Z" fill="#F2B6A8" stroke={INK} strokeWidth="1.8" transform="translate(0 6)" />
          <path d="M-6 16 L14 16 M44 60 L64 60" stroke={INK} strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </SketchFrame>
    </svg>
  );
}

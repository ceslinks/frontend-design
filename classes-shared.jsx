// LINKS — Shared bits for Classes / Live Class / Quiz / Materials
// - Robot mascot (animated SVG character used by AI Coach + Live Class AI Tutor)
// - StockPortrait: illustrated faux-photographic portrait for video tiles
// - Donut: progress ring used everywhere

/* ─────────── Robot Mascot ─────────── */
function Robot({ size = 72, mood = "happy", waving = false }) {
  // Cute friendly purple robot, faces forward.
  // Mood "happy" — full smile; "thinking" — small smile + spark.
  return (
    <svg viewBox="0 0 120 130" width={size} height={size * 130 / 120} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="robotBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A78BFA"/>
          <stop offset="1" stopColor="#7C3AED"/>
        </linearGradient>
        <linearGradient id="robotFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F172A"/>
          <stop offset="1" stopColor="#1E293B"/>
        </linearGradient>
        <radialGradient id="robotEye" cx="50%" cy="40%" r="60%">
          <stop offset="0" stopColor="#7DD3FC"/>
          <stop offset="0.7" stopColor="#22D3EE"/>
          <stop offset="1" stopColor="#0891B2"/>
        </radialGradient>
      </defs>
      {/* Antenna */}
      <line x1="60" y1="6" x2="60" y2="20" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="60" cy="6" r="4" fill="#FBBF24"/>
      <circle cx="60" cy="6" r="6" fill="#FBBF24" opacity="0.25">
        <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.4;0.05;0.4" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* Head */}
      <rect x="22" y="20" width="76" height="62" rx="22" fill="url(#robotBody)"/>
      {/* Inner face panel */}
      <rect x="32" y="32" width="56" height="38" rx="12" fill="url(#robotFace)"/>

      {/* Eyes (cyan, big, blinking) */}
      <g>
        <circle cx="48" cy="51" r="6" fill="url(#robotEye)"/>
        <circle cx="72" cy="51" r="6" fill="url(#robotEye)"/>
        <circle cx="46" cy="49" r="1.6" fill="#fff"/>
        <circle cx="70" cy="49" r="1.6" fill="#fff"/>
        <rect x="40" y="48" width="16" height="6" fill="url(#robotFace)" opacity="0">
          <animate attributeName="opacity" values="0;0;0;1;0" keyTimes="0;0.94;0.96;0.98;1" dur="5s" repeatCount="indefinite"/>
        </rect>
        <rect x="64" y="48" width="16" height="6" fill="url(#robotFace)" opacity="0">
          <animate attributeName="opacity" values="0;0;0;1;0" keyTimes="0;0.94;0.96;0.98;1" dur="5s" repeatCount="indefinite"/>
        </rect>
      </g>

      {/* Smile */}
      {mood === "happy" ? (
        <path d="M50 62 Q 60 68 70 62" stroke="#22D3EE" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      ) : (
        <>
          <path d="M50 63 Q 60 65 70 63" stroke="#22D3EE" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
          <text x="84" y="38" fontSize="12">✨</text>
        </>
      )}

      {/* Side ears / speakers */}
      <rect x="16" y="36" width="6" height="22" rx="2" fill="#7C3AED"/>
      <rect x="98" y="36" width="6" height="22" rx="2" fill="#7C3AED"/>

      {/* Body (a small chest peeking) */}
      <rect x="36" y="80" width="48" height="22" rx="10" fill="url(#robotBody)"/>
      <circle cx="50" cy="91" r="2.4" fill="#FBBF24"/>
      <circle cx="60" cy="91" r="2.4" fill="#22D3EE"/>
      <circle cx="70" cy="91" r="2.4" fill="#F472B6"/>

      {/* Optional waving arm */}
      {waving && (
        <g style={{ transformOrigin: "30px 90px" }}>
          <animateTransform attributeName="transform" type="rotate" values="-15 30 90;15 30 90;-15 30 90" dur="1.4s" repeatCount="indefinite"/>
          <rect x="20" y="86" width="14" height="8" rx="4" fill="#A78BFA"/>
          <circle cx="20" cy="90" r="6" fill="#A78BFA"/>
        </g>
      )}
    </svg>
  );
}

/* ─────────── Stock-style portrait (CSS-only illustration) ─────────── */
// Looks vaguely photographic at small sizes — used for live class tiles.
function StockPortrait({ name, hue = 240, size = 64, ring, dot, badge }) {
  const id = "sp-" + name.replace(/\s/g, "");
  const skinHue = hue;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg viewBox="0 0 120 120" width={size} height={size} style={{
        display: "block",
        borderRadius: "50%",
        border: ring ? `2px solid ${ring}` : "none",
      }}>
        <defs>
          <linearGradient id={id + "-bg"} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={`hsl(${hue}, 65%, 78%)`}/>
            <stop offset="1" stopColor={`hsl(${hue}, 55%, 50%)`}/>
          </linearGradient>
          <radialGradient id={id + "-skin"} cx="50%" cy="40%" r="60%">
            <stop offset="0" stopColor={`hsl(${skinHue + 10}, 45%, 75%)`}/>
            <stop offset="0.6" stopColor={`hsl(${skinHue + 5}, 35%, 55%)`}/>
            <stop offset="1" stopColor={`hsl(${skinHue + 5}, 30%, 35%)`}/>
          </radialGradient>
        </defs>
        <rect width="120" height="120" fill={`url(#${id}-bg)`}/>
        {/* Soft vignette */}
        <ellipse cx="60" cy="120" rx="80" ry="40" fill="#000" opacity="0.20"/>
        {/* Shoulders */}
        <ellipse cx="60" cy="125" rx="55" ry="38" fill={`hsl(${(hue + 200) % 360}, 28%, 28%)`}/>
        {/* Neck */}
        <rect x="50" y="78" width="20" height="20" fill={`url(#${id}-skin)`}/>
        {/* Head */}
        <ellipse cx="60" cy="62" rx="26" ry="30" fill={`url(#${id}-skin)`}/>
        {/* Hair */}
        <path d={hairPath(hue)} fill={`hsl(${(hue + 30) % 360}, 35%, ${15 + (hue % 25)}%)`}/>
        {/* Eyes (subtle) */}
        <ellipse cx="51" cy="62" rx="2.4" ry="3" fill="#0F172A"/>
        <ellipse cx="69" cy="62" rx="2.4" ry="3" fill="#0F172A"/>
        <circle cx="50.4" cy="60.5" r="0.8" fill="#fff"/>
        <circle cx="68.4" cy="60.5" r="0.8" fill="#fff"/>
        {/* Cheek tint */}
        <ellipse cx="46" cy="73" rx="4" ry="2.5" fill="#F87171" opacity="0.18"/>
        <ellipse cx="74" cy="73" rx="4" ry="2.5" fill="#F87171" opacity="0.18"/>
        {/* Mouth — small smile */}
        <path d="M52 76 Q 60 82 68 76" stroke="#3B1E0E" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        {/* Brows */}
        <path d="M44 54 Q 51 51 56 54" stroke={`hsl(${(hue + 30) % 360}, 35%, 22%)`} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
        <path d="M64 54 Q 69 51 76 54" stroke={`hsl(${(hue + 30) % 360}, 35%, 22%)`} strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </svg>
      {dot && (
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: size * 0.28, height: size * 0.28,
          borderRadius: "50%",
          background: dot === "online" ? "#22C55E" : (dot === "speaking" ? "#22C55E" : "#94A3B8"),
          border: "2px solid #fff",
        }}/>
      )}
      {badge && (
        <div style={{
          position: "absolute", top: -3, left: -3,
          width: size * 0.32, height: size * 0.32,
          borderRadius: "50%",
          background: "#FBBF24",
          border: "2px solid #fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: size * 0.18,
        }}>⭐</div>
      )}
    </div>
  );
}

// Pick one of a few hair shapes by hue
function hairPath(hue) {
  const variant = hue % 4;
  if (variant === 0) {
    // short side-part
    return "M34 50 Q 38 28 60 28 Q 82 28 86 50 Q 86 38 76 32 Q 64 32 56 42 Q 44 38 34 50 Z";
  }
  if (variant === 1) {
    // longer hair on the sides
    return "M32 56 Q 30 30 60 28 Q 92 30 88 56 Q 92 60 90 70 L 86 60 Q 84 38 60 36 Q 36 38 34 60 L 30 70 Q 28 60 32 56 Z";
  }
  if (variant === 2) {
    // bun / ponytail look (only top is visible at this scale)
    return "M34 52 Q 36 24 60 24 Q 84 24 86 52 Q 84 36 76 30 Q 60 30 50 38 Q 42 38 34 52 Z";
  }
  // curly
  return "M32 52 Q 32 28 60 28 Q 88 28 88 52 Q 84 44 78 44 Q 70 36 60 38 Q 50 36 42 44 Q 36 44 32 52 Z";
}

/* ─────────── Donut progress ─────────── */
// Single value or stacked segments
function Donut({ size = 110, stroke = 14, value = 78, segments, track = "var(--mist)", color = "var(--student)", children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none"/>
        {segments ? renderSegments(segments, size, r, stroke, c) : (
          <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(value / 100) * c} ${c}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        )}
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children || (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: size * 0.26, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{value}<span style={{ fontSize: size * 0.16, fontWeight: 600 }}>%</span></div>
          </div>
        )}
      </div>
    </div>
  );
}

function renderSegments(segments, size, r, stroke, c) {
  let acc = 0;
  return segments.map((s, i) => {
    const len = (s.value / 100) * c;
    const offset = -((acc / 100) * c);
    acc += s.value;
    return (
      <circle key={i}
        cx={size / 2} cy={size / 2} r={r}
        stroke={s.color} strokeWidth={stroke} fill="none"
        strokeLinecap="butt"
        strokeDasharray={`${len} ${c}`}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    );
  });
}

/* ─────────── Linear progress bar ─────────── */
function ProgressBar({ value, color = "var(--student)", track = "var(--mist)", height = 6 }) {
  return (
    <div style={{ background: track, height, borderRadius: 999, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: `${Math.max(0, Math.min(100, value))}%`,
        background: color, borderRadius: 999,
      }}/>
    </div>
  );
}

window.Robot = Robot;
window.StockPortrait = StockPortrait;
window.Donut = Donut;
window.ProgressBar = ProgressBar;

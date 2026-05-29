/* ============================================================
   MY TO DO — rebuilt per my-todo-spec.md
   Styling: friendly-dashboard (pastels, borderless cards, hero
   illustration, Fredoka type) — aligned with My Portfolio / My Desk.

   Routes:
     /my-todo            → Focus tab (default)
     /my-todo/daily      → Daily Tasks tab (plant + habits)
     /my-todo/all        → All Tasks tab
     /my-todo/archived   → Archived tab
   ============================================================ */

const MT_COLORS = {
  // Page surfaces — warm off-white, never pure white
  bg:        "#FAFAF6",
  surface:   "#FFFBF5",     // cards
  surface2:  "#F4F1EA",     // muted card sections
  surfaceTint:"#F8F4EC",    // hover wash

  // Pastels (shared with my-desk / my-portfolio)
  mint:      "#A8D5BA",
  mintDeep:  "#86C9A0",
  coral:     "#FFD4B4",
  coralDeep: "#F4B98E",
  lavender:  "#E8D5F2",
  lavenderDeep: "#D4C5F0",
  sky:       "#D4E8FF",
  skyDeep:   "#BFDBFE",
  butter:    "#FFF4D4",
  butterDeep:"#FFE9A0",
  blush:     "#FBDDE6",
  blushDeep: "#F5C0CE",

  // Text — soft black, never pure
  text:      "#2A2A2A",
  textMuted: "#7A7A7A",
  textSoft:  "#A8A39B",

  // Semantic — friendlier hues
  growth:    "#5BB179",
  growthSoft:"#E6F2EA",
  warn:      "#E8923A",
  warnSoft:  "#FBEDDC",
  danger:    "#D86464",
  dangerSoft:"#FAE3E3",
};

const MT_SHADOW       = "0 2px 8px rgba(40, 30, 20, 0.06), 0 12px 24px rgba(40, 30, 20, 0.05)";
const MT_SHADOW_HOVER = "0 4px 14px rgba(40, 30, 20, 0.10), 0 18px 36px rgba(40, 30, 20, 0.08)";
const MT_SHADOW_HERO  = "0 6px 20px rgba(40, 30, 20, 0.10), 0 24px 60px rgba(40, 30, 20, 0.12)";
const MT_RADIUS       = 16;
const MT_RADIUS_HERO  = 24;
// Match my-portfolio: declare Fredoka first so the family name matches, but
// don't load it — falls back to system San Francisco, which reads less "bubbly".
const MT_FONT         = "Fredoka, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const MT_FLOWER_PALETTE = [
  { name: "Coral",    petal: "#F09579", petalDark: "#D85A30", center: "#FFD08E", centerDark: "#C97A3B" },
  { name: "Sunshine", petal: "#FCD35E", petalDark: "#D8A317", center: "#FF9E3E", centerDark: "#B85A0A" },
  { name: "Lavender", petal: "#C6A8E3", petalDark: "#9270C4", center: "#FFD08E", centerDark: "#C97A3B" },
  { name: "Sky",      petal: "#8FC3E8", petalDark: "#5B95C7", center: "#FFD08E", centerDark: "#C97A3B" },
  { name: "Rose",     petal: "#F4A4C0", petalDark: "#D17BA4", center: "#FFD08E", centerDark: "#C97A3B" },
  { name: "Cherry",   petal: "#E68B8B", petalDark: "#C24E4E", center: "#FFD08E", centerDark: "#C97A3B" },
  { name: "Mint",     petal: "#A5DAB8", petalDark: "#5BB179", center: "#FCD35E", centerDark: "#D8A317" },
  { name: "Marigold", petal: "#F5B16D", petalDark: "#D8843C", center: "#C24E4E", centerDark: "#8C2828" },
  { name: "Plum",     petal: "#B07AB4", petalDark: "#7C3D85", center: "#FFD08E", centerDark: "#C97A3B" },
  { name: "Snow",     petal: "#F2EAE0", petalDark: "#B8A595", center: "#FFD08E", centerDark: "#C97A3B" },
];

function mt_randomFlower(excludeName) {
  let pick;
  do { pick = MT_FLOWER_PALETTE[Math.floor(Math.random() * MT_FLOWER_PALETTE.length)]; }
  while (excludeName && pick.name === excludeName);
  return pick;
}

const MT_AI_DAILY_POOL = [
  "Walk for 15 minutes outside",
  "Drink a glass of water with each meal",
  "Write one thing I'm grateful for",
  "Stretch for 5 minutes before bed",
  "Read for 15 minutes before screens",
  "Make my bed in the morning",
  "Tidy my desk for 5 minutes",
  "Practice deep breathing for 2 minutes",
  "Text one friend to check in",
  "Step away from screens for 10 minutes",
];

const MT_AI_ALL_POOL = [
  { name: "Review notes for Friday's quiz",        dueText: "May 22", label: "academic" },
  { name: "Schedule annual eye doctor appointment", dueText: "May 27", label: "health" },
  { name: "Plan weekend study group with Maya",     dueText: "May 23", label: "academic" },
  { name: "Order birthday gift for my sister",      dueText: "May 29", label: "personal" },
  { name: "Submit field trip permission slip",      dueText: "May 21", label: "academic" },
  { name: "Sketch ideas for art project",           dueText: "May 24", label: "creative" },
  { name: "Refill water bottle, prep tomorrow's lunch", dueText: "Today", label: "life" },
  { name: "Outline Saturday's presentation",        dueText: "May 23", label: "academic" },
];

const MT_LABELS = {
  life:     { text: "Life",     bg: "#E0F0E2", fg: "#2E5C36" },
  health:   { text: "Health",   bg: MT_COLORS.sky,      fg: "#1F4A6E" },
  academic: { text: "Academic", bg: MT_COLORS.lavender, fg: "#5A3A85" },
  personal: { text: "Personal", bg: MT_COLORS.coral,    fg: "#7C3C12" },
  creative: { text: "Creative", bg: MT_COLORS.blush,    fg: "#7F2B4E" },
};

const MT_STAGES = [
  { name: ["Just a ", "seed"],         msg: () => "Every plant starts here. Complete your first daily habit to wake it up 🌱" },
  { name: ["Tiny ", "sprout"],         msg: () => "It's pushing through! Keep going to unfold its first leaves." },
  { name: ["First ", "leaves"],        msg: () => "Beautiful — two little leaves. A few more habits and the plant will stretch upward." },
  { name: ["Little ", "sapling"],      msg: () => "Nice rhythm! Three more habits and a flower bud will start forming." },
  { name: ["Growing ", "strong"],      msg: () => "Your plant is thriving. One more habit and you'll see today's mystery color." },
  { name: ["Bud ", "forming"],         msg: () => `Look — today's flower is `,           reveal: true,  trail: " ! Two more habits to see it bloom." },
  { name: ["Opening ", "flower"],      msg: () => `Your `,                                reveal: true,  trail: " flower is opening. One more habit for full bloom." },
  { name: ["Full ", "bloom"],          msg: () => `You did it. Today's `,                 reveal: true,  trail: " flower is in full bloom — pick it to add to your garden ✨" },
];

/* ============================================================
   PLANT SVG — 8 stages
   ============================================================ */
function MT_PlantSVG({ stage, flower, size = 200 }) {
  const s = Math.min(Math.max(stage, 0), 7);
  const f = flower || MT_FLOWER_PALETTE[4];
  const aspect = 220 / 200;

  return (
    <svg
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size * aspect}
      role="img"
      aria-label={`Today's plant — stage ${s} of 7${s >= 5 ? `, ${f.name} bloom` : ""}`}
      style={{ display: "block" }}
    >
      <ellipse cx="100" cy="190" rx="55" ry="8" fill="#000" opacity="0.06"/>
      <path d="M62 158 L138 158 L132 195 Q132 200 127 200 L73 200 Q68 200 68 195 Z"
            fill="#C97A3B" stroke="#A85F26" strokeWidth="1.5"/>
      <path d="M58 155 L142 155 L138 165 L62 165 Z"
            fill="#D8884B" stroke="#A85F26" strokeWidth="1.5"/>
      <ellipse cx="100" cy="160" rx="38" ry="3.5" fill="#3E2410" opacity="0.85"/>
      <circle cx="86" cy="160" r="1" fill="#2A1808"/>
      <circle cx="110" cy="159" r="0.8" fill="#2A1808"/>
      <circle cx="98" cy="161" r="0.7" fill="#2A1808"/>

      {s === 1 && (
        <g className="mt-leaf-sway">
          <path d="M100 158 Q100 148 100 138" stroke="#5BA672" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <ellipse cx="100" cy="138" rx="3" ry="5" fill="#7DC18B"/>
        </g>
      )}

      {s === 2 && (
        <g className="mt-leaf-sway">
          <path d="M100 158 Q100 145 100 128" stroke="#5BA672" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M100 128 Q90 122 84 128 Q88 134 100 132 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 128 Q110 122 116 128 Q112 134 100 132 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
        </g>
      )}

      {s === 3 && (
        <g className="mt-leaf-sway">
          <path d="M100 158 Q100 138 100 115" stroke="#4F9A66" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M100 138 Q85 130 76 138 Q86 146 100 142 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 138 Q115 130 124 138 Q114 146 100 142 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 118 Q90 110 82 116 Q90 124 100 122 Z" fill="#9ED3A8" stroke="#5BA672" strokeWidth="1"/>
          <path d="M100 118 Q110 110 118 116 Q110 124 100 122 Z" fill="#9ED3A8" stroke="#5BA672" strokeWidth="1"/>
        </g>
      )}

      {s === 4 && (
        <g className="mt-leaf-sway">
          <path d="M100 158 Q100 130 100 95" stroke="#4F9A66" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M100 138 Q82 130 72 140 Q84 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 138 Q118 130 128 140 Q116 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 118 Q85 110 75 118 Q86 126 100 122 Z" fill="#8ECC9A" stroke="#5BA672" strokeWidth="1"/>
          <path d="M100 118 Q115 110 125 118 Q114 126 100 122 Z" fill="#8ECC9A" stroke="#5BA672" strokeWidth="1"/>
          <path d="M100 100 Q92 92 84 98 Q92 106 100 104 Z" fill="#9ED3A8" stroke="#5BA672" strokeWidth="1"/>
          <path d="M100 100 Q108 92 116 98 Q108 106 100 104 Z" fill="#9ED3A8" stroke="#5BA672" strokeWidth="1"/>
        </g>
      )}

      {s === 5 && (
        <g className="mt-leaf-sway">
          <path d="M100 158 Q100 130 100 80" stroke="#4F9A66" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M100 138 Q82 130 70 140 Q84 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 138 Q118 130 130 140 Q116 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 118 Q83 110 73 120 Q86 128 100 124 Z" fill="#8ECC9A" stroke="#5BB179" strokeWidth="1"/>
          <path d="M100 118 Q117 110 127 120 Q114 128 100 124 Z" fill="#8ECC9A" stroke="#5BB179" strokeWidth="1"/>
          <path d="M100 100 Q90 92 80 100 Q90 108 100 106 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="1"/>
          <path d="M100 100 Q110 92 120 100 Q110 108 100 106 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="1"/>
          <ellipse cx="100" cy="76" rx="6" ry="10" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2"/>
          <path d="M94 78 Q100 70 106 78" stroke={f.petalDark} strokeWidth="1.2" fill="none"/>
        </g>
      )}

      {s === 6 && (
        <g className="mt-leaf-sway">
          <path d="M100 158 Q100 130 100 75" stroke="#4F9A66" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M100 138 Q82 130 70 140 Q84 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 138 Q118 130 130 140 Q116 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
          <path d="M100 118 Q83 110 73 120 Q86 128 100 124 Z" fill="#8ECC9A" stroke="#5BB179" strokeWidth="1"/>
          <path d="M100 118 Q117 110 127 120 Q114 128 100 124 Z" fill="#8ECC9A" stroke="#5BB179" strokeWidth="1"/>
          <path d="M100 100 Q90 92 80 100 Q90 108 100 106 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="1"/>
          <path d="M100 100 Q110 92 120 100 Q110 108 100 106 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="1"/>
          <ellipse cx="88" cy="72" rx="8" ry="9" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2"/>
          <ellipse cx="112" cy="72" rx="8" ry="9" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2"/>
          <ellipse cx="100" cy="62" rx="8" ry="9" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2" opacity="0.9"/>
          <circle cx="100" cy="72" r="5" fill={f.center} stroke={f.centerDark} strokeWidth="1.2"/>
        </g>
      )}

      {s === 7 && (
        <>
          <g className="mt-leaf-sway">
            <path d="M100 158 Q100 130 100 70" stroke="#4F9A66" strokeWidth="3" fill="none" strokeLinecap="round"/>
            <path d="M100 138 Q80 128 68 140 Q82 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
            <path d="M100 138 Q120 128 132 140 Q118 148 100 144 Z" fill="#7DC18B" stroke="#4F9A66" strokeWidth="1"/>
            <path d="M100 118 Q82 108 70 120 Q84 128 100 124 Z" fill="#8ECC9A" stroke="#5BB179" strokeWidth="1"/>
            <path d="M100 118 Q118 108 130 120 Q116 128 100 124 Z" fill="#8ECC9A" stroke="#5BB179" strokeWidth="1"/>
            <path d="M100 98 Q88 88 78 98 Q90 106 100 104 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="1"/>
            <path d="M100 98 Q112 88 122 98 Q110 106 100 104 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="1"/>
            <g>
              <ellipse cx="100" cy="50" rx="10" ry="13" fill={f.petal} stroke={f.petalDark} strokeWidth="1.4"/>
              <ellipse cx="115" cy="60" rx="10" ry="13" fill={f.petal} stroke={f.petalDark} strokeWidth="1.4" transform="rotate(72 115 60)"/>
              <ellipse cx="108" cy="80" rx="10" ry="13" fill={f.petal} stroke={f.petalDark} strokeWidth="1.4" transform="rotate(144 108 80)"/>
              <ellipse cx="92" cy="80" rx="10" ry="13" fill={f.petal} stroke={f.petalDark} strokeWidth="1.4" transform="rotate(216 92 80)"/>
              <ellipse cx="85" cy="60" rx="10" ry="13" fill={f.petal} stroke={f.petalDark} strokeWidth="1.4" transform="rotate(288 85 60)"/>
              <circle cx="100" cy="65" r="7" fill={f.center} stroke={f.centerDark} strokeWidth="1.4"/>
              <circle cx="100" cy="65" r="3.5" fill={f.centerDark} opacity="0.8"/>
            </g>
          </g>
          <g className="mt-sparkle" style={{ animationDelay: "0s" }}>
            <path d="M40 50 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill={f.center}/>
          </g>
          <g className="mt-sparkle" style={{ animationDelay: "0.4s" }}>
            <path d="M160 70 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill={f.petal}/>
          </g>
          <g className="mt-sparkle" style={{ animationDelay: "0.8s" }}>
            <path d="M50 110 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 z" fill={f.petalDark}/>
          </g>
          <g className="mt-sparkle" style={{ animationDelay: "1.2s" }}>
            <path d="M150 30 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 z" fill={f.center}/>
          </g>
        </>
      )}
    </svg>
  );
}

/* Standalone flower head */
function MT_FlowerHeadSVG({ flower, size = 44 }) {
  const f = flower;
  return (
    <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" width={size} height={size} style={{ display: "block" }}>
      <ellipse cx="30" cy="22" rx="9" ry="11" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2"/>
      <ellipse cx="42" cy="30" rx="9" ry="11" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2" transform="rotate(72 42 30)"/>
      <ellipse cx="37" cy="44" rx="9" ry="11" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2" transform="rotate(144 37 44)"/>
      <ellipse cx="23" cy="44" rx="9" ry="11" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2" transform="rotate(216 23 44)"/>
      <ellipse cx="18" cy="30" rx="9" ry="11" fill={f.petal} stroke={f.petalDark} strokeWidth="1.2" transform="rotate(288 18 30)"/>
      <circle cx="30" cy="32" r="5.5" fill={f.center} stroke={f.centerDark} strokeWidth="1.2"/>
      <circle cx="30" cy="32" r="2.5" fill={f.centerDark} opacity="0.8"/>
    </svg>
  );
}

/* Friendly mascot — a smiling daisy peeking out of the hero card */
function MT_GardenMascot({ size = 220 }) {
  return (
    <svg viewBox="0 0 240 260" xmlns="http://www.w3.org/2000/svg" width={size} height={size * (260/240)} style={{ display: "block" }}>
      {/* leaves on the side */}
      <g className="mt-leaf-sway">
        <path d="M60 200 Q35 175 30 145 Q50 165 70 195 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="2"/>
        <path d="M180 195 Q205 170 210 138 Q188 160 175 190 Z" fill="#9ED3A8" stroke="#5BB179" strokeWidth="2"/>
      </g>

      {/* stem */}
      <path d="M120 250 Q118 200 120 130" stroke="#5BB179" strokeWidth="6" fill="none" strokeLinecap="round"/>

      {/* daisy face */}
      <g className="mt-leaf-sway" style={{ transformOrigin: "120px 110px" }}>
        {/* 8 petals */}
        {Array.from({length: 8}).map((_, i) => (
          <ellipse key={i} cx="120" cy="60" rx="16" ry="26" fill="#FFFBF5" stroke="#F4B98E" strokeWidth="2" transform={`rotate(${i * 45} 120 110)`}/>
        ))}
        {/* center */}
        <circle cx="120" cy="110" r="22" fill="#FCD35E" stroke="#D8A317" strokeWidth="2"/>
        {/* eyes */}
        <ellipse cx="113" cy="107" rx="2.6" ry="3.4" fill="#2A2A2A"/>
        <ellipse cx="127" cy="107" rx="2.6" ry="3.4" fill="#2A2A2A"/>
        {/* eye highlights */}
        <circle cx="114" cy="105.5" r="0.9" fill="#FFFBF5"/>
        <circle cx="128" cy="105.5" r="0.9" fill="#FFFBF5"/>
        {/* cheek blush */}
        <ellipse cx="107" cy="115" rx="4" ry="2.5" fill="#F4A4C0" opacity="0.7"/>
        <ellipse cx="133" cy="115" rx="4" ry="2.5" fill="#F4A4C0" opacity="0.7"/>
        {/* smile */}
        <path d="M114 118 Q120 124 126 118" stroke="#2A2A2A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      </g>

      {/* little floating sparkle */}
      <g className="mt-sparkle" style={{ animationDelay: "0.2s" }}>
        <path d="M205 65 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 z" fill="#FFD08E"/>
      </g>
      <g className="mt-sparkle" style={{ animationDelay: "0.9s" }}>
        <path d="M30 85 l1.5 4 l4 1.5 l-4 1.5 l-1.5 4 l-1.5 -4 l-4 -1.5 l4 -1.5 z" fill="#F4A4C0"/>
      </g>
    </svg>
  );
}

/* ============================================================
   STYLE BLOCK
   ============================================================ */
function MT_Styles() {
  // No font injection — match my-portfolio, which lets Fredoka silently fall
  // back to the system sans (San Francisco on macOS, Roboto on Android).
  return (
    <style>{`
      @keyframes mt-sway { 0%,100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg); } }
      @keyframes mt-sparkle { 0%,100% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.1); } }
      @keyframes mt-slide-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes mt-fade-in { from { opacity: 0; } to { opacity: 1; } }
      @keyframes mt-modal-pop { from { opacity: 0; transform: scale(0.96) translateY(8px); } to { opacity: 1; transform: scale(1) translateY(0); } }
      @keyframes mt-spin-pulse { 0% { transform: scale(1) rotate(0); } 50% { transform: scale(1.3) rotate(180deg); } 100% { transform: scale(1) rotate(360deg); } }
      @keyframes mt-ai-flash { 0% { background: ${MT_COLORS.lavender}; } 100% { background: ${MT_COLORS.surface}; } }
      @keyframes mt-shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      @keyframes mt-pop-in { 0% { opacity: 0; transform: scale(0.9) translateY(8px); } 100% { opacity: 1; transform: scale(1) translateY(0); } }

      .mt-page * { font-family: ${MT_FONT}; }
      .mt-page input, .mt-page textarea, .mt-page select { font-family: inherit; }

      .mt-leaf-sway { transform-origin: bottom center; animation: mt-sway 4s ease-in-out infinite; }
      .mt-sparkle { animation: mt-sparkle 1.6s ease-in-out infinite; }
      .mt-tab-content { animation: mt-slide-in 0.3s ease-out; }

      .mt-card { background: ${MT_COLORS.surface}; border-radius: ${MT_RADIUS}px; box-shadow: ${MT_SHADOW}; transition: box-shadow 200ms ease, transform 200ms ease; }
      .mt-card-hover:hover { box-shadow: ${MT_SHADOW_HOVER}; transform: translateY(-1px); }

      .mt-ai-btn { transition: transform 180ms ease, box-shadow 180ms ease; }
      .mt-ai-btn:hover { transform: scale(1.08) rotate(8deg); box-shadow: 0 8px 18px rgba(180, 130, 200, 0.35); }
      .mt-ai-btn:active { transform: scale(0.96); }
      .mt-ai-btn.thinking svg { animation: mt-spin-pulse 0.6s ease; }
      .mt-ai-flash { animation: mt-ai-flash 0.6s ease; }

      .mt-task-row { transition: background 0.15s ease; }
      .mt-task-row:hover { background: ${MT_COLORS.surfaceTint}; }
      .mt-task-row:hover .mt-task-actions { opacity: 1; }
      .mt-task-actions { opacity: 0; transition: opacity 0.15s ease; }

      .mt-priority-row { transition: all 200ms ease; cursor: pointer; }
      .mt-priority-row:hover { transform: translateX(3px) translateY(-1px); box-shadow: ${MT_SHADOW_HOVER}; }

      .mt-chk { transition: all 0.15s ease; }
      .mt-chk:hover { border-color: ${MT_COLORS.mintDeep}; }

      .mt-filter-chip { transition: all 0.18s ease; }
      .mt-filter-chip:hover { transform: translateY(-1px); }

      .mt-restore { transition: all 0.15s ease; }
      .mt-restore:hover { background: ${MT_COLORS.mint}; color: #1a3a2a; }

      .mt-archive-row { transition: all 0.2s ease; }
      .mt-archive-row:hover { opacity: 0.95; filter: saturate(0.85); transform: translateX(3px); background: #F2EDE5 !important; }

      .mt-flower-chip { transition: all 0.2s ease; }
      .mt-flower-chip:hover { transform: translateY(-3px) scale(1.02); box-shadow: ${MT_SHADOW_HOVER}; }

      .mt-gallery-card { transition: all 0.2s ease; }
      .mt-gallery-card:hover { transform: translateY(-2px); box-shadow: ${MT_SHADOW_HOVER}; }

      .mt-pick-btn {
        background: linear-gradient(135deg, ${MT_COLORS.coral} 0%, ${MT_COLORS.blushDeep} 45%, ${MT_COLORS.lavenderDeep} 100%);
        background-size: 200% 200%;
        animation: mt-shimmer 3s ease-in-out infinite, mt-pop-in 0.4s ease-out;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
      }
      .mt-pick-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 24px rgba(244, 164, 192, 0.5); }

      .mt-toast { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
      .mt-modal { animation: mt-modal-pop 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
      .mt-backdrop { animation: mt-fade-in 0.2s ease; }

      .mt-btn {
        font-family: ${MT_FONT};
        font-weight: 600; font-size: 13px;
        padding: 10px 18px;
        border-radius: 14px;
        border: none;
        background: ${MT_COLORS.surface2};
        color: ${MT_COLORS.text};
        cursor: pointer;
        transition: all 180ms ease;
        box-shadow: 0 1px 3px rgba(0,0,0,0.04);
      }
      .mt-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.08); background: ${MT_COLORS.surfaceTint}; }
      .mt-btn-primary {
        background: linear-gradient(135deg, ${MT_COLORS.mint} 0%, ${MT_COLORS.mintDeep} 100%);
        color: #1a3a2a;
      }
      .mt-btn-primary:hover { background: linear-gradient(135deg, ${MT_COLORS.mintDeep} 0%, ${MT_COLORS.mint} 100%); }
      .mt-btn-ghost { background: transparent; box-shadow: none; color: ${MT_COLORS.textMuted}; }
      .mt-btn-ghost:hover { background: ${MT_COLORS.surfaceTint}; color: ${MT_COLORS.text}; }

      .mt-input {
        font-family: ${MT_FONT};
        font-size: 14px;
        padding: 12px 16px;
        border-radius: 14px;
        border: none;
        background: ${MT_COLORS.bg};
        outline: none;
        color: ${MT_COLORS.text};
        transition: background 180ms ease, box-shadow 180ms ease;
      }
      .mt-input:focus { background: ${MT_COLORS.surface}; box-shadow: 0 0 0 3px ${MT_COLORS.lavender}; }
      .mt-input::placeholder { color: ${MT_COLORS.textSoft}; }
    `}</style>
  );
}

/* ============================================================
   SMALL ATOMS
   ============================================================ */
function MT_CheckIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7"/>
    </svg>
  );
}

function MT_Checkbox({ checked, onClick, decorative }) {
  // When decorative (archived rows), render greyed-out instead of mint green —
  // signals "done and frozen" rather than a live completed task.
  const borderColor = decorative ? "#C9C3BB" : checked ? MT_COLORS.mintDeep : "#D8D2CC";
  const bgColor     = decorative ? "#C9C3BB" : checked ? MT_COLORS.mintDeep : MT_COLORS.surface;
  return (
    <button
      className="mt-chk"
      onClick={decorative ? undefined : onClick}
      style={{
        width: 26, height: 26,
        border: `2px solid ${borderColor}`,
        borderRadius: 10,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        background: bgColor,
        cursor: decorative ? "default" : "pointer",
        color: "#fff",
        padding: 0,
      }}
      aria-pressed={checked}
      aria-label={checked ? "Mark incomplete" : "Mark complete"}
    >
      {checked && <MT_CheckIcon size={15}/>}
    </button>
  );
}

function MT_AISparkle({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0l2.5 7.5L22 10l-7.5 2.5L12 20l-2.5-7.5L2 10l7.5-2.5z"/>
    </svg>
  );
}

function MT_AIButton({ onClick, size = 40, sparkleSize = 18, thinking, title = "AI suggest" }) {
  return (
    <button
      className={`mt-ai-btn ${thinking ? "thinking" : ""}`}
      onClick={onClick}
      title={title}
      aria-label={title}
      style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${MT_COLORS.lavender} 0%, ${MT_COLORS.lavenderDeep} 100%)`,
        borderRadius: "50%",
        border: "none",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        color: "#5A3A85",
        flexShrink: 0,
        cursor: "pointer",
        padding: 0,
        boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
      }}
    >
      <MT_AISparkle size={sparkleSize}/>
    </button>
  );
}

function MT_LabelPill({ id }) {
  const l = MT_LABELS[id];
  if (!l) return <span style={{ color: MT_COLORS.textSoft, fontSize: 12 }}>—</span>;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "5px 12px", borderRadius: 999,
      fontSize: 12, fontWeight: 600,
      background: l.bg, color: l.fg,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: l.fg }}/>
      {l.text}
    </span>
  );
}

function MT_CreatorAvatar({ creator }) {
  const cfg = {
    me:      { bg: MT_COLORS.butter,  fg: "#7C4E00",      initials: "JT", label: "Me" },
    ai:      { bg: `linear-gradient(135deg, ${MT_COLORS.lavender}, ${MT_COLORS.lavenderDeep})`, fg: "#5A3A85", initials: "✦", label: "AI · Clippy" },
    teacher: { bg: MT_COLORS.coral,   fg: "#7C3C12",      initials: "MG", label: "Mr. Green" },
  }[creator] || { bg: MT_COLORS.surface2, fg: MT_COLORS.textMuted, initials: "?", label: "—" };

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: MT_COLORS.text, fontWeight: 500 }}>
      <div style={{
        width: 28, height: 28, borderRadius: "50%",
        background: cfg.bg, color: cfg.fg,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 700,
      }}>{cfg.initials}</div>
      {cfg.label}
    </div>
  );
}

function MT_DueText({ text, urgency }) {
  const tones = {
    overdue: { color: MT_COLORS.danger, weight: 700 },
    today:   { color: MT_COLORS.warn,   weight: 700 },
    soon:    { color: MT_COLORS.text,   weight: 500 },
    "":      { color: MT_COLORS.textMuted, weight: 400 },
  };
  const t = tones[urgency || ""];
  return (
    <span style={{ fontSize: 13, color: t.color, fontWeight: t.weight, display: "inline-flex", alignItems: "center", gap: 6 }}>
      {text || "—"}
    </span>
  );
}

/* ============================================================
   TAB NAVIGATION — pill chips on warm card surface
   ============================================================ */
function MT_TabNav({ active, counts, onChange }) {
  const tabs = [
    { id: "focus",    label: "Focus", emoji: "✨" },
    { id: "daily",    label: "Daily Tasks", count: counts.daily, emoji: "🌱" },
    { id: "all",      label: "All Tasks",   count: counts.all,   emoji: "📋" },
    { id: "archived", label: "Archived",    count: counts.archived, emoji: "🗂" },
  ];
  return (
    <nav role="tablist" style={{
      display: "inline-flex", gap: 4,
      background: MT_COLORS.surface, padding: 6, borderRadius: 18,
      marginBottom: 32, boxShadow: MT_SHADOW,
    }}>
      {tabs.map(t => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.id)}
            style={{
              padding: "11px 20px", borderRadius: 14,
              fontWeight: isActive ? 700 : 500, fontSize: 14,
              color: isActive ? "#1a3a2a" : MT_COLORS.textMuted,
              background: isActive ? `linear-gradient(135deg, ${MT_COLORS.mint} 0%, ${MT_COLORS.mintDeep} 100%)` : "transparent",
              border: "none", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 8,
              transition: "all 0.2s ease",
              boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
              fontFamily: MT_FONT,
            }}
          >
            <span style={{ fontSize: 14 }}>{t.emoji}</span>
            {t.label}
            {t.count !== undefined && (
              <span style={{
                background: isActive ? "rgba(255,255,255,0.6)" : MT_COLORS.surface2,
                color: isActive ? "#1a3a2a" : MT_COLORS.textMuted,
                fontSize: 11, padding: "2px 9px", borderRadius: 999, fontWeight: 700,
              }}>{t.count}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ============================================================
   HERO CARD — friendly welcome with mascot overlap
   ============================================================ */
function MT_Hero({ greeting, lede, primaryStat, primaryStatLabel, mascot, gradient, mascotInset }) {
  return (
    <div style={{
      background: gradient,
      borderRadius: MT_RADIUS_HERO,
      padding: "32px 36px",
      marginBottom: 24,
      boxShadow: MT_SHADOW_HERO,
      position: "relative",
      overflow: "visible",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, position: "relative" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 24, fontWeight: 700, color: "#1a3a2a", marginBottom: 8, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
            {greeting}
          </div>
          <div style={{ fontSize: 14, color: "#2d5a45", lineHeight: 1.5, maxWidth: 460 }}>{lede}</div>
          {primaryStat && (
            <div style={{ marginTop: 16, display: "flex", alignItems: "baseline", gap: 10 }}>
              <div style={{ fontSize: 40, fontWeight: 800, color: "#1a3a2a", lineHeight: 1, letterSpacing: "-0.02em" }}>{primaryStat}</div>
              <div style={{ fontSize: 12, color: "#2d5a45", fontWeight: 500 }}>{primaryStatLabel}</div>
            </div>
          )}
        </div>
        {mascot && (
          <div style={{
            flexShrink: 0,
            marginRight: mascotInset !== undefined ? mascotInset : -16,
            marginTop: -16,
            marginBottom: -32,
            position: "relative",
            zIndex: 2,
          }}>
            {mascot}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   PLANT CARD (Daily Tasks)
   ============================================================ */
function MT_PlantCard({ dailyTasks, todaysFlower, pickedToday, onPick, onSimulateNextDay }) {
  const completed = dailyTasks.filter(t => t.done).length;
  const stage = Math.min(completed, 7);
  const target = 7;
  const pct = Math.min((completed / target) * 100, 100);

  const stageInfo = MT_STAGES[stage];
  const stageName = stageInfo.name;
  const showFlowerColor = stage >= 5;

  let stageLabelText;
  if (pickedToday) stageLabelText = `Picked today · ${todaysFlower.name.toLowerCase()}`;
  else stageLabelText = showFlowerColor ? `Today's flower · ${todaysFlower.name.toLowerCase()}` : "Today's growth";

  return (
    <div style={{
      background: `linear-gradient(180deg, ${MT_COLORS.butter} 0%, ${MT_COLORS.coral} 100%)`,
      borderRadius: MT_RADIUS,
      padding: "30px 26px 26px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      boxShadow: MT_SHADOW,
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.5), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.3), transparent 50%)",
        pointerEvents: "none",
      }}/>

      <div style={{ position: "relative", marginBottom: 18 }}>
        <div style={{ fontSize: 11, color: "#7C4E00", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 6 }}>
          {stageLabelText}
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#5A2A0A", letterSpacing: "-0.01em" }}>
          {pickedToday ? <>Come back <em style={{ fontWeight: 600 }}>tomorrow</em></> : <>{stageName[0]}<em style={{ fontWeight: 600 }}>{stageName[1]}</em></>}
        </div>
      </div>

      <div style={{ width: 200, height: 220, margin: "0 auto 22px", position: "relative" }}>
        <MT_PlantSVG stage={pickedToday ? 0 : stage} flower={todaysFlower}/>
      </div>

      <div style={{
        background: "rgba(255, 255, 255, 0.7)", borderRadius: 999, height: 12,
        position: "relative", overflow: "hidden",
        marginBottom: 14,
        backdropFilter: "blur(8px)",
      }}>
        <div style={{
          height: "100%", borderRadius: 999,
          width: pickedToday ? "100%" : `${pct}%`,
          background: pickedToday
            ? `linear-gradient(90deg, ${todaysFlower.petal}, ${todaysFlower.petalDark})`
            : `linear-gradient(90deg, ${MT_COLORS.mintDeep} 0%, ${MT_COLORS.growth} 100%)`,
          transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}/>
      </div>

      <p style={{ fontSize: 13, color: "#5A2A0A", position: "relative", margin: 0, fontWeight: 500 }}>
        {pickedToday ? (
          <span style={{ color: todaysFlower.petalDark, fontWeight: 700 }}>✓ Picked!</span>
        ) : (
          <><strong style={{ fontWeight: 700 }}>{completed} of {target}</strong> daily tasks today</>
        )}
      </p>

      <p style={{ fontSize: 12, color: "#5A2A0A", marginTop: 14, lineHeight: 1.6, position: "relative", opacity: 0.85 }}>
        {pickedToday ? (
          <>Your <strong>{todaysFlower.name}</strong> flower is safe in the garden. A new mystery color awaits tomorrow 🌱</>
        ) : stageInfo.reveal ? (
          <>{stageInfo.msg(todaysFlower)}<strong>{todaysFlower.name}</strong>{stageInfo.trail}</>
        ) : (
          stageInfo.msg(todaysFlower)
        )}
      </p>

      {stage === 7 && !pickedToday && (
        <button
          className="mt-pick-btn"
          onClick={onPick}
          style={{
            marginTop: 18, width: "100%",
            padding: "14px 18px",
            border: "none", borderRadius: 16,
            color: "#5A2A0A",
            fontWeight: 700, fontSize: 14,
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(244, 164, 192, 0.4)",
            fontFamily: MT_FONT,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 2l2 5 5 1-4 4 1 5-4-3-4 3 1-5-4-4 5-1z"/></svg>
          Pick today's {todaysFlower.name.toLowerCase()} flower
        </button>
      )}

      {pickedToday && (
        <button
          onClick={onSimulateNextDay}
          title="Demo: in production this happens automatically at midnight"
          style={{
            margin: "14px auto 0",
            padding: "8px 18px",
            background: "rgba(255, 255, 255, 0.5)",
            border: "1px dashed rgba(90, 42, 10, 0.3)",
            borderRadius: 999,
            fontSize: 11, fontWeight: 700,
            color: "#5A2A0A",
            display: "inline-flex", alignItems: "center", gap: 6,
            cursor: "pointer",
            fontFamily: MT_FONT,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 4l14 8-14 8z"/></svg>
          Simulate next day
        </button>
      )}
    </div>
  );
}

/* ============================================================
   GARDEN STRIP
   ============================================================ */
function MT_GardenStrip({ gallery, onOpenGallery }) {
  const recent = gallery.slice(0, 8);
  return (
    <div className="mt-card" style={{ padding: "22px 26px", marginTop: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h3 style={{
          fontSize: 16, fontWeight: 700, color: MT_COLORS.text, margin: 0,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{
            width: 32, height: 32, borderRadius: 10,
            background: MT_COLORS.mint, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🌼</span>
          Your Garden
          <span style={{
            background: MT_COLORS.lavender, color: "#5A3A85",
            padding: "3px 11px", borderRadius: 999, fontSize: 12, fontWeight: 700,
          }}>{gallery.length}</span>
        </h3>
        <button onClick={onOpenGallery} className="mt-btn mt-btn-ghost">
          View all →
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 6 }}>
        {recent.map(g => (
          <div
            key={g.id}
            className="mt-flower-chip"
            onClick={onOpenGallery}
            title={`${g.flower.name} · picked ${g.pickedOn}`}
            style={{
              flexShrink: 0, width: 84,
              background: MT_COLORS.bg, borderRadius: 18,
              padding: "12px 8px 10px",
              textAlign: "center", cursor: "pointer",
            }}
          >
            <div style={{ margin: "0 auto 8px", width: 48, height: 48 }}>
              <MT_FlowerHeadSVG flower={g.flower} size={48}/>
            </div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: MT_COLORS.text, lineHeight: 1.2 }}>{g.flower.name}</div>
            <div style={{ fontSize: 10, color: MT_COLORS.textSoft, marginTop: 2, fontWeight: 500 }}>{g.pickedOn}</div>
          </div>
        ))}
        {recent.length < 8 && (
          <div style={{
            flexShrink: 0, width: 84,
            border: `2px dashed ${MT_COLORS.lavenderDeep}`,
            borderRadius: 18,
            background: "transparent",
            color: MT_COLORS.textMuted,
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: 96, fontSize: 11, lineHeight: 1.4, textAlign: "center", padding: 8, fontWeight: 600,
          }}>
            Tomorrow's<br/>flower 🌱
          </div>
        )}
      </div>

      <p style={{ fontSize: 12, color: MT_COLORS.textMuted, marginTop: 14, lineHeight: 1.55 }}>
        Each day's flower is a surprise color. Pick them and they'll soon become paint colors in <strong style={{ color: MT_COLORS.text }}>My Tools</strong> for art projects.
      </p>
    </div>
  );
}

/* ============================================================
   GALLERY MODAL
   ============================================================ */
function MT_GalleryModal({ open, onClose, gallery }) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="mt-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(40, 30, 20, 0.4)",
        backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100, padding: 20,
        fontFamily: MT_FONT,
      }}
    >
      <div className="mt-modal" style={{
        background: MT_COLORS.surface, borderRadius: 28,
        maxWidth: 740, width: "100%", maxHeight: "86vh",
        overflowY: "auto",
        boxShadow: MT_SHADOW_HERO,
      }}>
        <div style={{
          padding: "26px 30px 22px",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between",
          background: `linear-gradient(135deg, ${MT_COLORS.mint} 0%, ${MT_COLORS.lavender} 100%)`,
          borderRadius: "28px 28px 0 0",
        }}>
          <div>
            <h2 style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", margin: 0, color: "#1a3a2a" }}>
              Your <em style={{ fontWeight: 600, fontStyle: "italic" }}>Garden</em>
            </h2>
            <p style={{ color: "#2d5a45", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
              {gallery.length} flower{gallery.length === 1 ? "" : "s"} picked from daily habits. More to come — including using them as paint and feeding your pet 🐾
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.6)", border: "none",
              color: "#1a3a2a", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", fontFamily: MT_FONT,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg>
          </button>
        </div>

        <div style={{ padding: "26px 30px 30px" }}>
          {gallery.length === 0 ? (
            <div style={{ textAlign: "center", padding: "50px 20px", color: MT_COLORS.textMuted }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: MT_COLORS.text, margin: "14px 0 6px" }}>No flowers yet</h3>
              <p style={{ fontSize: 14, maxWidth: 360, margin: "0 auto" }}>Complete 7 daily habits, then pick your first flower to start the garden.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 16 }}>
              {gallery.map(g => (
                <div
                  key={g.id}
                  className="mt-gallery-card"
                  style={{
                    background: MT_COLORS.bg,
                    borderRadius: 18, padding: "18px 14px 14px", textAlign: "center",
                  }}
                >
                  <div style={{ margin: "0 auto 10px", width: 64, height: 64 }}>
                    <MT_FlowerHeadSVG flower={g.flower} size={64}/>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: MT_COLORS.text, marginBottom: 2 }}>
                    {g.flower.name}
                  </div>
                  <div style={{ fontSize: 11, color: MT_COLORS.textMuted, fontWeight: 500 }}>Picked {g.pickedOn}</div>
                  <div style={{
                    marginTop: 10, padding: "5px 10px",
                    background: MT_COLORS.surface,
                    borderRadius: 999, fontSize: 10, color: MT_COLORS.textMuted, fontWeight: 600,
                    display: "inline-flex", alignItems: "center", gap: 4,
                  }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 21l3-9 12-12 6 6-12 12-9 3z"/></svg>
                    Paint · coming soon
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TOAST
   ============================================================ */
function MT_Toast({ toast }) {
  const visible = !!toast;
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-toast"
      style={{
        position: "fixed", bottom: 36, left: "50%",
        transform: `translateX(-50%) translateY(${visible ? 0 : 80}px)`,
        opacity: visible ? 1 : 0,
        background: MT_COLORS.text, color: MT_COLORS.bg,
        padding: "16px 26px", borderRadius: 999,
        fontSize: 14, fontWeight: 600,
        fontFamily: MT_FONT,
        display: "flex", alignItems: "center", gap: 12,
        zIndex: 200,
        boxShadow: MT_SHADOW_HERO,
        pointerEvents: "none",
      }}
    >
      {toast && (
        <>
          <span style={{
            width: 18, height: 18, borderRadius: "50%",
            background: toast.flower.petal,
            border: `2px solid ${toast.flower.petalDark}`,
          }}/>
          <span>{toast.text}</span>
        </>
      )}
    </div>
  );
}

/* ============================================================
   FOCUS TAB
   ============================================================ */
function MT_FocusTab({ state, goTab }) {
  const completed = state.dailyTasks.filter(t => t.done).length;
  const target = 7;
  const dueToday = state.allTasks.filter(t => t.urgency === "today" && !t.done).length;
  const dueThisWeek = state.allTasks.filter(t => t.urgency === "today" || t.urgency === "soon").length;

  const priorities = [
    { id: 1, name: "Study for chem test",          meta: "📅 Due in 4 hours", label: "health",   est: "≈ 90 min", action: "Start now",  primary: true },
    { id: 2, name: "Pick up groceries for dinner", meta: "📅 Today",          label: "life",     est: "≈ 30 min", action: "Snooze",     primary: false },
    { id: 3, name: "Read 20 pages for English",    meta: "📅 Tomorrow",       label: "academic", est: "≈ 40 min", action: "Schedule",   primary: false },
  ];

  return (
    <div className="mt-tab-content">
      {/* HERO */}
      <MT_Hero
        gradient={`linear-gradient(135deg, ${MT_COLORS.mint} 0%, ${MT_COLORS.coral} 60%, ${MT_COLORS.blush} 100%)`}
        greeting="Hello, Alex! 🌱"
        lede="You're on a roll — 14 days of consistent habits. Two tasks due today, and your plant is sprouting."
        primaryStat="14"
        primaryStatLabel="day Bloom Streak — personal best!"
        mascot={<MT_GardenMascot size={210}/>}
      />

      {/* STAT ROW — 3 pastel cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, marginBottom: 28 }}>
        <MT_StatCard
          tint={`linear-gradient(135deg, ${MT_COLORS.mint} 0%, ${MT_COLORS.mintDeep} 100%)`}
          text="#0F3D26"
          label="Daily Progress"
          value={completed}
          unit={`/ ${target} tasks today`}
          sub={completed === 0 ? "Ready to start" : completed >= 7 ? "Plant in full bloom 🌸" : "Plant is growing 🌱"}
        />
        <MT_StatCard
          tint={`linear-gradient(135deg, ${MT_COLORS.sky} 0%, ${MT_COLORS.skyDeep} 100%)`}
          text="#0C447C"
          label="This Week"
          value={dueThisWeek}
          unit="tasks due soon"
          sub={`${dueToday} due today`}
          subTone="#0C447C"
        />
        <MT_StatCard
          tint={`linear-gradient(135deg, ${MT_COLORS.lavender} 0%, ${MT_COLORS.lavenderDeep} 100%)`}
          text="#3C3489"
          label="Garden"
          value={state.gallery.length}
          unit="flowers picked"
          sub="3 colors collected"
        />
      </div>

      {/* PRIORITY CARD */}
      <div style={{
        background: MT_COLORS.surface,
        borderRadius: MT_RADIUS,
        padding: "28px 30px",
        marginBottom: 24,
        boxShadow: MT_SHADOW,
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: MT_COLORS.lavender, color: "#5A3A85",
          padding: "5px 12px", borderRadius: 999,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
          textTransform: "uppercase",
          marginBottom: 16,
        }}>
          <MT_AISparkle size={12}/>
          AI suggested · ordered by impact
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em", color: MT_COLORS.text, marginBottom: 4 }}>
          Here's what to tackle next
        </h2>
        <p style={{ color: MT_COLORS.textMuted, fontSize: 13, marginBottom: 18 }}>
          Based on due dates, effort, and how your week is shaping up.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {priorities.map((p, i) => (
            <div
              key={p.id}
              className="mt-priority-row"
              onClick={() => goTab("all")}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "16px 20px",
                background: MT_COLORS.bg, borderRadius: 18,
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 12,
                background: i === 0 ? MT_COLORS.coral : i === 1 ? MT_COLORS.mint : MT_COLORS.sky,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontStyle: "italic", fontSize: 16, fontWeight: 700,
                color: i === 0 ? "#7C3C12" : i === 1 ? "#1a3a2a" : "#0C447C",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4, color: MT_COLORS.text }}>{p.name}</div>
                <div style={{ fontSize: 12, color: MT_COLORS.textMuted, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <span>{p.meta}</span>
                  <span style={{ color: MT_COLORS.textSoft }}>•</span>
                  <MT_LabelPill id={p.label}/>
                  <span style={{ color: MT_COLORS.textSoft }}>•</span>
                  <span>{p.est}</span>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); goTab("all"); }}
                className={p.primary ? "mt-btn mt-btn-primary" : "mt-btn"}
                style={{ flexShrink: 0 }}
              >
                {p.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* TWO-COL ROW */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div className="mt-card" style={{ padding: 26, display: "flex", gap: 18, alignItems: "center" }}>
          <div style={{
            width: 120, height: 140, flexShrink: 0,
            background: `linear-gradient(180deg, ${MT_COLORS.butter} 0%, ${MT_COLORS.coral} 100%)`,
            borderRadius: 18, padding: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <MT_PlantSVG stage={state.pickedToday ? 0 : Math.min(completed, 7)} flower={state.todaysFlower} size={100}/>
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: MT_COLORS.text }}>Daily Habits</h3>
            <p style={{ fontSize: 12, color: MT_COLORS.textMuted, marginBottom: 12 }}>Complete 7 to fully grow your plant.</p>
            <div style={{ background: MT_COLORS.bg, borderRadius: 999, height: 12, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 999,
                width: state.pickedToday ? "100%" : `${Math.min((completed / target) * 100, 100)}%`,
                background: state.pickedToday
                  ? `linear-gradient(90deg, ${state.todaysFlower.petal}, ${state.todaysFlower.petalDark})`
                  : `linear-gradient(90deg, ${MT_COLORS.mintDeep} 0%, ${MT_COLORS.growth} 100%)`,
                transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
              }}/>
            </div>
            <p style={{ fontSize: 13, color: MT_COLORS.textMuted, marginTop: 10, fontWeight: 500 }}>
              <strong style={{ color: MT_COLORS.text, fontWeight: 700 }}>
                {state.pickedToday ? "Picked today" : `${completed} of ${target}`}
              </strong>{state.pickedToday ? "" : " daily tasks complete"}
            </p>
            <button onClick={() => goTab("daily")} className="mt-btn mt-btn-ghost" style={{ marginTop: 12, padding: "6px 0" }}>
              View all habits →
            </button>
          </div>
        </div>

        <div style={{
          background: `linear-gradient(135deg, ${MT_COLORS.lavender} 0%, ${MT_COLORS.lavenderDeep} 100%)`,
          color: "#3C3489",
          borderRadius: MT_RADIUS, padding: 26,
          position: "relative", overflow: "hidden",
          boxShadow: MT_SHADOW,
        }}>
          <div style={{
            position: "absolute", bottom: -30, right: -30,
            width: 160, height: 160,
            background: "radial-gradient(circle, rgba(255,255,255,0.5), transparent 70%)",
            pointerEvents: "none",
          }}/>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.5)",
            color: "#3C3489",
            padding: "5px 12px", borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: "0.04em",
            textTransform: "uppercase",
            marginBottom: 14,
          }}>
            <MT_AISparkle size={12}/>
            Daily Insight
          </div>
          <p style={{
            fontWeight: 600,
            fontSize: 15, lineHeight: 1.5, margin: "8px 0 16px",
            position: "relative",
          }}>
            "You finish chemistry work fastest in the morning. Want to move your study block to 8am tomorrow?"
          </p>
          <div style={{ display: "flex", gap: 10, position: "relative" }}>
            <button className="mt-btn" style={{ background: "rgba(255,255,255,0.7)", color: "#3C3489" }}>Yes, reschedule</button>
            <button className="mt-btn" style={{ background: "rgba(255,255,255,0.35)", color: "#3C3489" }}>Not today</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MT_StatCard({ tint, text, label, value, unit, sub, subTone }) {
  return (
    <div style={{
      background: tint, borderRadius: MT_RADIUS,
      padding: "18px 20px",
      boxShadow: MT_SHADOW,
      color: text,
    }}>
      <div style={{ fontSize: 11, color: text, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700, marginBottom: 8 }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
        <div style={{ fontSize: 32, fontWeight: 800, color: text, lineHeight: 1, letterSpacing: "-0.02em" }}>{value}</div>
        <div style={{ fontSize: 12, color: text, opacity: 0.75, fontWeight: 500 }}>{unit}</div>
      </div>
      {sub && <div style={{ marginTop: 8, fontSize: 11, color: subTone || text, fontWeight: 600, opacity: subTone ? 1 : 0.8 }}>{sub}</div>}
    </div>
  );
}

/* ============================================================
   DAILY TASKS TAB
   ============================================================ */
function MT_DailyTab({ state, dispatch, requestAIDaily, addDaily, dailyInputRef, dailyDraft, setDailyDraft, todayLabel }) {
  const completed = state.dailyTasks.filter(t => t.done).length;
  const total = state.dailyTasks.length;

  return (
    <div className="mt-tab-content">
      <MT_Hero
        gradient={`linear-gradient(135deg, ${MT_COLORS.sky} 0%, ${MT_COLORS.lavender} 100%)`}
        greeting="Daily habits, daily wins ✨"
        lede={`${completed} of ${total} done today. Check 'em off as you go — your plant grows with each tick.`}
        primaryStat={`${completed}/7`}
        primaryStatLabel="habits today"
        mascot={<MT_PlantSVG stage={state.pickedToday ? 0 : Math.min(completed, 7)} flower={state.todaysFlower} size={180}/>}
        mascotInset={10}
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 24 }}>
        {/* Task list */}
        <div className="mt-card" style={{ overflow: "hidden" }}>
          <div style={{
            padding: "20px 26px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: MT_COLORS.surface2,
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: MT_COLORS.text }}>
              {todayLabel} · habits
            </h2>
            <span style={{
              background: MT_COLORS.mint, color: "#1a3a2a",
              padding: "5px 14px", borderRadius: 999,
              fontSize: 13, fontWeight: 700,
            }}>{completed} of {total} complete</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "18px 26px" }}>
            <MT_AIButton onClick={(e) => requestAIDaily(e.currentTarget)} thinking={state.aiDailyThinking} title="AI suggest a habit"/>
            <input
              ref={dailyInputRef}
              className={`mt-input ${state.aiDailyFlash ? "mt-ai-flash" : ""}`}
              value={dailyDraft}
              onChange={(e) => setDailyDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") addDaily(); }}
              placeholder="Add a new daily habit — or tap ✦ for an AI suggestion"
              style={{ flex: 1 }}
            />
            <button onClick={addDaily} className="mt-btn mt-btn-primary">Add</button>
          </div>

          {state.dailyTasks.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: MT_COLORS.textMuted }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🌱</div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: MT_COLORS.text, margin: "0 0 8px" }}>
                Get started with daily habits
              </h3>
              <p style={{ fontSize: 14, maxWidth: 360, margin: "0 auto" }}>
                Tap the ✦ button above for a suggestion, or add your own. Aim for 5–7 to fully grow today's plant.
              </p>
            </div>
          ) : (
            <div style={{ padding: "0 12px 14px" }}>
              {state.dailyTasks.map(t => (
                <div
                  key={t.id}
                  className="mt-task-row"
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "14px 18px",
                    borderRadius: 14,
                    margin: "4px 0",
                    background: t.done ? MT_COLORS.growthSoft : "transparent",
                  }}
                >
                  <MT_Checkbox checked={t.done} onClick={() => dispatch({ type: "toggleDaily", id: t.id })}/>
                  <div style={{
                    flex: 1, fontSize: 14, fontWeight: 500,
                    textDecoration: t.done ? "line-through" : "none",
                    color: t.done ? MT_COLORS.textSoft : MT_COLORS.text,
                  }}>{t.name}</div>
                  <div className="mt-task-actions" style={{ display: "flex", gap: 4 }}>
                    <button
                      title="Edit"
                      style={{
                        width: 32, height: 32, borderRadius: 10,
                        background: "transparent", border: "none",
                        color: MT_COLORS.textSoft, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 113 3L7 19l-4 1 1-4z"/></svg>
                    </button>
                    <button
                      title="Delete"
                      onClick={() => dispatch({ type: "deleteDaily", id: t.id })}
                      style={{
                        width: 32, height: 32, borderRadius: 10,
                        background: "transparent", border: "none",
                        color: MT_COLORS.textSoft, cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = MT_COLORS.danger}
                      onMouseLeave={(e) => e.currentTarget.style.color = MT_COLORS.textSoft}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Plant card */}
        <MT_PlantCard
          dailyTasks={state.dailyTasks}
          todaysFlower={state.todaysFlower}
          pickedToday={state.pickedToday}
          onPick={() => dispatch({ type: "pickFlower" })}
          onSimulateNextDay={() => dispatch({ type: "simulateNextDay" })}
        />
      </div>

      <MT_GardenStrip
        gallery={state.gallery}
        onOpenGallery={() => dispatch({ type: "openGallery" })}
      />
    </div>
  );
}

/* ============================================================
   ALL TASKS TAB
   ============================================================ */
function MT_AllTasksTab({ state, dispatch, requestAIAll, draft, setDraft, addAll }) {
  const [filter, setFilter] = React.useState("all");
  const [search, setSearch] = React.useState("");

  const filterCounts = {
    all:     state.allTasks.length,
    today:   state.allTasks.filter(t => t.urgency === "today").length,
    week:    state.allTasks.filter(t => t.urgency === "today" || t.urgency === "soon").length,
    ai:      state.allTasks.filter(t => t.createdBy === "ai").length,
    teacher: state.allTasks.filter(t => t.createdBy === "teacher").length,
  };

  const visible = state.allTasks.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "today")   return t.urgency === "today";
    if (filter === "week")    return t.urgency === "today" || t.urgency === "soon";
    if (filter === "ai")      return t.createdBy === "ai";
    if (filter === "teacher") return t.createdBy === "teacher";
    return true;
  });

  const filters = [
    { id: "all",     label: "All",          count: filterCounts.all,     accent: MT_COLORS.mint,     fg: "#1a3a2a" },
    { id: "today",   label: "Today",        count: filterCounts.today,   accent: MT_COLORS.coral,    fg: "#7C3C12" },
    { id: "week",    label: "This Week",    count: filterCounts.week,    accent: MT_COLORS.sky,      fg: "#0C447C" },
    { id: "ai",      label: "From AI",      count: filterCounts.ai,      accent: MT_COLORS.lavender, fg: "#5A3A85" },
    { id: "teacher", label: "From Teacher", count: filterCounts.teacher, accent: MT_COLORS.butter,   fg: "#7C4E00" },
  ];

  return (
    <div className="mt-tab-content">
      <MT_Hero
        gradient={`linear-gradient(135deg, ${MT_COLORS.coral} 0%, ${MT_COLORS.butter} 100%)`}
        greeting="Everything on your plate 📋"
        lede="Filter by what's due, search by name, or ask AI to suggest based on your week."
        primaryStat={state.allTasks.length}
        primaryStatLabel={`tasks · ${filterCounts.today} due today`}
      />

      <div className="mt-card" style={{ overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "20px 26px",
          background: MT_COLORS.surface2, flexWrap: "wrap",
        }}>
          {filters.map(f => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                className="mt-filter-chip"
                onClick={() => setFilter(f.id)}
                style={{
                  background: active ? f.accent : MT_COLORS.surface,
                  border: "none",
                  color: active ? f.fg : MT_COLORS.textMuted,
                  padding: "9px 16px", borderRadius: 999,
                  fontSize: 13, fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  cursor: "pointer",
                  boxShadow: active ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  fontFamily: MT_FONT,
                }}
              >
                {f.label}
                <span style={{
                  background: active ? "rgba(255,255,255,0.5)" : MT_COLORS.bg,
                  padding: "2px 8px", borderRadius: 999,
                  fontSize: 11, fontWeight: 700,
                }}>{f.count}</span>
              </button>
            );
          })}
          <div style={{ flex: 1 }}/>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="mt-input"
            style={{ maxWidth: 220 }}
          />
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr>
              {[
                { w: 50 },
                { label: "Task" },
                { w: 140, label: "Due" },
                { w: 170, label: "Created by" },
                { w: 140, label: "Label" },
                { w: 80,  label: "", align: "right" },
              ].map((h, i) => (
                <th key={i} style={{
                  textAlign: h.align || "left",
                  padding: "16px 18px", width: h.w,
                  fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em",
                  color: MT_COLORS.textMuted, fontWeight: 700,
                  background: MT_COLORS.surface, cursor: h.label ? "pointer" : "default",
                  userSelect: "none",
                }}>
                  {h.label}
                  {h.label && <span style={{ marginLeft: 4, opacity: 0.5, fontSize: 10 }}>↕</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Add row */}
            <tr>
              <td style={{ background: MT_COLORS.lavender, padding: "12px 18px", textAlign: "center" }}>
                <MT_AIButton onClick={(e) => requestAIAll(e.currentTarget)} size={34} sparkleSize={15} thinking={state.aiAllThinking} title="AI suggest a task"/>
              </td>
              <td style={{ background: MT_COLORS.lavender, padding: "12px 18px" }}>
                <input
                  className={`mt-input ${state.aiAllFlash ? "mt-ai-flash" : ""}`}
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value, aiSuggested: false })}
                  onKeyDown={(e) => { if (e.key === "Enter") addAll(); }}
                  placeholder="Add a task — or tap ✦ for an AI suggestion"
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ background: MT_COLORS.lavender, padding: "12px 18px" }}>
                <input
                  className={`mt-input ${state.aiAllFlash ? "mt-ai-flash" : ""}`}
                  value={draft.dueText}
                  onChange={(e) => setDraft({ ...draft, dueText: e.target.value })}
                  placeholder="Due date"
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ background: MT_COLORS.lavender, padding: "12px 18px" }}>
                <MT_CreatorAvatar creator="me"/>
              </td>
              <td style={{ background: MT_COLORS.lavender, padding: "12px 18px" }}>
                <input
                  className={`mt-input ${state.aiAllFlash ? "mt-ai-flash" : ""}`}
                  value={draft.label}
                  onChange={(e) => setDraft({ ...draft, label: e.target.value })}
                  placeholder="life · health · …"
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ background: MT_COLORS.lavender, padding: "12px 18px", textAlign: "right" }}>
                <button onClick={addAll} className="mt-btn mt-btn-primary">Add</button>
              </td>
            </tr>

            {visible.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: "60px 20px", textAlign: "center", color: MT_COLORS.textMuted }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: MT_COLORS.text, margin: "0 0 8px" }}>
                    {state.allTasks.length === 0 ? "No tasks yet" : "Nothing matches"}
                  </h3>
                  <p style={{ fontSize: 14, maxWidth: 380, margin: "0 auto" }}>
                    {state.allTasks.length === 0
                      ? "Add one above, or ask AI to suggest tasks based on your week."
                      : "Try a different filter or search."}
                  </p>
                </td>
              </tr>
            )}

            {visible.map(t => (
              <tr key={t.id} style={{ background: t.done ? MT_COLORS.growthSoft : "transparent" }}>
                <td style={{ padding: "16px 18px" }}>
                  <MT_Checkbox checked={t.done} onClick={() => dispatch({ type: "toggleAll", id: t.id })}/>
                </td>
                <td style={{
                  padding: "16px 18px",
                  textDecoration: t.done ? "line-through" : "none",
                  color: t.done ? MT_COLORS.textSoft : MT_COLORS.text,
                  fontWeight: 500,
                }}>{t.name}</td>
                <td style={{ padding: "16px 18px" }}>
                  <MT_DueText text={t.dueText} urgency={t.urgency}/>
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <MT_CreatorAvatar creator={t.createdBy}/>
                </td>
                <td style={{ padding: "16px 18px" }}>
                  <MT_LabelPill id={t.label}/>
                </td>
                <td style={{ padding: "16px 18px", textAlign: "right" }}>
                  <button
                    onClick={() => dispatch({ type: "archive", id: t.id })}
                    title="Archive"
                    style={{
                      width: 32, height: 32, borderRadius: 10,
                      background: "transparent", border: "none",
                      color: MT_COLORS.textSoft, cursor: "pointer",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = MT_COLORS.danger}
                    onMouseLeave={(e) => e.currentTarget.style.color = MT_COLORS.textSoft}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v10h14V9M10 13h4"/></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ============================================================
   ARCHIVED TAB
   ============================================================ */
function MT_ArchivedTab({ state, dispatch }) {
  const groups = [
    { id: "this-week", label: "This Week", accent: MT_COLORS.mint,     fg: "#1a3a2a" },
    { id: "last-week", label: "Last Week", accent: MT_COLORS.sky,      fg: "#0C447C" },
    { id: "earlier",   label: "Earlier",   accent: MT_COLORS.lavender, fg: "#5A3A85" },
  ];
  const items = (g) => state.archived.filter(a => a.group === g);
  const totalItems = state.archived.length;

  return (
    <div className="mt-tab-content">
      <MT_Hero
        gradient={`linear-gradient(135deg, ${MT_COLORS.lavender} 0%, ${MT_COLORS.mint} 100%)`}
        greeting="Look how far you've come 🗂"
        lede="Everything you've completed or archived. Search, restore, or clear out the noise."
        primaryStat={totalItems}
        primaryStatLabel="finished and tucked away"
      />

      {totalItems === 0 ? (
        <div className="mt-card" style={{ padding: "60px 30px", textAlign: "center", color: MT_COLORS.textMuted }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📭</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: MT_COLORS.text, margin: "0 0 8px" }}>
            Nothing archived yet
          </h3>
          <p style={{ fontSize: 14, maxWidth: 380, margin: "0 auto" }}>
            Completed tasks and ones you archive from your To Do list will appear here.
          </p>
        </div>
      ) : (
        groups.map(g => {
          const list = items(g.id);
          if (!list.length) return null;
          return (
            <div key={g.id} style={{ marginBottom: 24 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: g.accent, color: g.fg,
                padding: "8px 16px", borderRadius: 999,
                fontSize: 12, fontWeight: 700, letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 14,
              }}>
                {g.label}
                <span style={{
                  background: "rgba(255,255,255,0.5)",
                  padding: "2px 8px", borderRadius: 999, fontSize: 11,
                }}>{list.length} item{list.length !== 1 ? "s" : ""}</span>
              </div>
              {list.map(a => (
                <div
                  key={a.id}
                  className="mt-archive-row"
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "14px 20px",
                    background: "#ECE7E0",
                    borderRadius: 14, marginBottom: 8,
                    boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.03)",
                    opacity: 0.78,
                    filter: "saturate(0.6)",
                  }}
                >
                  <MT_Checkbox checked decorative/>
                  <div style={{
                    flex: 1, fontSize: 14, fontWeight: 400,
                    textDecoration: "line-through",
                    textDecorationColor: "#A8A39B",
                    color: "#8E8A82",
                  }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: "#A8A39B", fontWeight: 500, fontStyle: "italic" }}>Archived {a.archivedOn}</div>
                  <button
                    onClick={() => dispatch({ type: "restore", id: a.id })}
                    style={{
                      fontFamily: MT_FONT,
                      fontWeight: 600, fontSize: 12,
                      padding: "6px 12px",
                      borderRadius: 10, border: "none",
                      background: "rgba(255,255,255,0.55)",
                      color: "#6B655C",
                      display: "inline-flex", alignItems: "center", gap: 5,
                      cursor: "pointer",
                      transition: "all 180ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = MT_COLORS.mint;
                      e.currentTarget.style.color = "#1a3a2a";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.55)";
                      e.currentTarget.style.color = "#6B655C";
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/></svg>
                    Restore
                  </button>
                  <button
                    onClick={() => dispatch({ type: "deleteArchived", id: a.id })}
                    title="Delete forever"
                    style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: "transparent", border: "none",
                      color: "#A8A39B", cursor: "pointer",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = MT_COLORS.danger}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#A8A39B"}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/></svg>
                  </button>
                </div>
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}

/* ============================================================
   INITIAL STATE
   ============================================================ */
function mt_initialState() {
  return {
    todaysFlower: MT_FLOWER_PALETTE[2],
    pickedToday: false,
    aiDailyIndex: 0,
    aiAllIndex: 0,
    aiDailyThinking: false,
    aiDailyFlash: false,
    aiAllThinking: false,
    aiAllFlash: false,
    bloomStreak: 14,
    habitStreak: 21,

    dailyTasks: [
      { id: "d1", name: "Move my body for 15 minutes",     done: true },
      { id: "d2", name: "Organize backpack",                done: true },
      { id: "d3", name: "Eat a healthy lunch",              done: true },
      { id: "d4", name: "Read for 20 minutes before bed",   done: false },
      { id: "d5", name: "Tidy up desk space",               done: false },
      { id: "d6", name: "Drink 6 glasses of water",         done: false },
      { id: "d7", name: "Practice piano for 10 minutes",    done: false },
    ],

    allTasks: [
      { id: "t1", name: "Return library books",                       dueText: "—",        createdBy: "me",      label: null,        done: false, urgency: "" },
      { id: "t2", name: "Pick up groceries for dinner",               dueText: "Today",    createdBy: "ai",      label: "life",      done: false, urgency: "today" },
      { id: "t3", name: "Study for chem test",                        dueText: "Today",    createdBy: "ai",      label: "health",    done: false, urgency: "today" },
      { id: "t4", name: "Read 20 pages for English homework",         dueText: "Tomorrow", createdBy: "me",      label: "academic",  done: false, urgency: "soon" },
      { id: "t5", name: "Research sources for history assignment",    dueText: "May 22",   createdBy: "ai",      label: "academic",  done: false, urgency: "soon" },
      { id: "t6", name: "Finish art portfolio sketch",                dueText: "May 24",   createdBy: "me",      label: "creative",  done: false, urgency: "" },
      { id: "t7", name: "Research sources for English assignment",    dueText: "May 11",   createdBy: "teacher", label: "academic",  done: true,  urgency: "" },
    ],

    archived: [
      { id: "a1", name: "Submit science fair proposal",     archivedOn: "May 18", group: "this-week" },
      { id: "a2", name: "Email Ms. Patel about field trip", archivedOn: "May 17", group: "this-week" },
      { id: "a3", name: "Buy birthday card for Maya",       archivedOn: "May 16", group: "this-week" },
      { id: "a4", name: "Finish chapter 4 study guide",     archivedOn: "May 13", group: "last-week" },
      { id: "a5", name: "Practice presentation slides",     archivedOn: "May 12", group: "last-week" },
      { id: "a6", name: "Help dad with garage cleanup",     archivedOn: "May 11", group: "last-week" },
      { id: "a7", name: "Submit math worksheet",            archivedOn: "May 7",  group: "earlier" },
      { id: "a8", name: "Sign up for spring soccer",        archivedOn: "May 5",  group: "earlier" },
      { id: "a9", name: "Update vocabulary flashcards",     archivedOn: "May 1",  group: "earlier" },
      { id: "a10", name: "Finalize project topic",          archivedOn: "Apr 29", group: "earlier" },
      { id: "a11", name: "Return PE uniform",               archivedOn: "Apr 27", group: "earlier" },
      { id: "a12", name: "Reschedule dentist appointment",  archivedOn: "Apr 24", group: "earlier" },
    ],

    gallery: [
      { id: "g1", flower: MT_FLOWER_PALETTE[0], pickedOn: "May 18" },
      { id: "g2", flower: MT_FLOWER_PALETTE[6], pickedOn: "May 16" },
      { id: "g3", flower: MT_FLOWER_PALETTE[4], pickedOn: "May 13" },
    ],

    galleryOpen: false,
    toast: null,
  };
}

/* ============================================================
   REDUCER
   ============================================================ */
function mt_reducer(state, action) {
  switch (action.type) {
    case "toggleDaily": {
      return { ...state, dailyTasks: state.dailyTasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
    }
    case "deleteDaily": {
      return { ...state, dailyTasks: state.dailyTasks.filter(t => t.id !== action.id) };
    }
    case "addDaily": {
      const v = (action.name || "").trim();
      if (!v) return state;
      return { ...state, dailyTasks: [...state.dailyTasks, { id: "d" + Date.now(), name: v, done: false }] };
    }
    case "toggleAll": {
      return { ...state, allTasks: state.allTasks.map(t => t.id === action.id ? { ...t, done: !t.done } : t) };
    }
    case "addAll": {
      const { name, dueText, label, createdBy } = action;
      const v = (name || "").trim();
      if (!v) return state;
      const validLabels = ["life", "health", "academic", "personal", "creative"];
      const labelClean = validLabels.includes((label || "").trim().toLowerCase()) ? label.trim().toLowerCase() : null;
      const dueTextClean = (dueText || "").trim() || "—";
      let urgency = "";
      if (/^today$/i.test(dueTextClean)) urgency = "today";
      else if (/^tomorrow$/i.test(dueTextClean)) urgency = "soon";
      else if (dueTextClean !== "—") urgency = "soon";
      return {
        ...state,
        allTasks: [
          { id: "t" + Date.now(), name: v, dueText: dueTextClean, createdBy: createdBy || "me", label: labelClean, done: false, urgency },
          ...state.allTasks,
        ],
      };
    }
    case "archive": {
      const idx = state.allTasks.findIndex(t => t.id === action.id);
      if (idx === -1) return state;
      const t = state.allTasks[idx];
      return {
        ...state,
        allTasks: state.allTasks.filter(x => x.id !== action.id),
        archived: [{ id: "a" + Date.now(), name: t.name, archivedOn: action.todayLabel || "Today", group: "this-week" }, ...state.archived],
      };
    }
    case "restore": {
      const idx = state.archived.findIndex(a => a.id === action.id);
      if (idx === -1) return state;
      const a = state.archived[idx];
      return {
        ...state,
        archived: state.archived.filter(x => x.id !== action.id),
        allTasks: [{ id: "t" + Date.now(), name: a.name, dueText: "—", createdBy: "me", label: null, done: false, urgency: "" }, ...state.allTasks],
      };
    }
    case "deleteArchived": {
      return { ...state, archived: state.archived.filter(a => a.id !== action.id) };
    }
    case "pickFlower": {
      if (state.pickedToday) return state;
      return {
        ...state,
        gallery: [{ id: "g" + Date.now(), flower: state.todaysFlower, pickedOn: action.todayLabel || "Today" }, ...state.gallery],
        pickedToday: true,
        bloomStreak: state.bloomStreak + 1,
        toast: { flower: state.todaysFlower, text: `Added ${state.todaysFlower.name} to your garden!` },
      };
    }
    case "simulateNextDay": {
      return {
        ...state,
        dailyTasks: state.dailyTasks.map(t => ({ ...t, done: false })),
        pickedToday: false,
        todaysFlower: mt_randomFlower(state.todaysFlower.name),
      };
    }
    case "openGallery":     return { ...state, galleryOpen: true };
    case "closeGallery":    return { ...state, galleryOpen: false };
    case "dismissToast":    return { ...state, toast: null };
    case "aiDailyThinking": return { ...state, aiDailyThinking: action.value };
    case "aiDailyFlash":    return { ...state, aiDailyFlash: action.value };
    case "aiDailyTick":     return { ...state, aiDailyIndex: state.aiDailyIndex + 1 };
    case "aiAllThinking":   return { ...state, aiAllThinking: action.value };
    case "aiAllFlash":      return { ...state, aiAllFlash: action.value };
    case "aiAllTick":       return { ...state, aiAllIndex: state.aiAllIndex + 1 };
    default: return state;
  }
}

/* ============================================================
   MAIN PAGE — TodoPage
   ============================================================ */
function TodoPage({ segments, navigate }) {
  const sub = segments[1] || "focus";
  const tab = ({
    focus: "focus", daily: "daily", all: "all", archived: "archived",
    completed: "archived", "ai-suggested": "focus",
  })[sub] || "focus";

  const [state, dispatch] = React.useReducer(mt_reducer, undefined, mt_initialState);

  const today = new Date();
  const monthsShort = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const todayLabel = `${monthsShort[today.getMonth()]} ${today.getDate()}`;
  const dayDateLabel = `${days[today.getDay()]} ${monthsShort[today.getMonth()]} ${today.getDate()}`;

  const [dailyDraft, setDailyDraft] = React.useState("");
  const dailyInputRef = React.useRef(null);
  const [allDraft, setAllDraft] = React.useState({ name: "", dueText: "", label: "", aiSuggested: false });

  React.useEffect(() => {
    if (!state.toast) return;
    const t = setTimeout(() => dispatch({ type: "dismissToast" }), 3200);
    return () => clearTimeout(t);
  }, [state.toast]);

  const goTab = (id) => {
    const next = id === "focus" ? ["my-todo"] : ["my-todo", id];
    navigate ? navigate(next) : (window.location.hash = "#/" + next.join("/"));
  };

  const requestAIDaily = () => {
    const suggestion = MT_AI_DAILY_POOL[state.aiDailyIndex % MT_AI_DAILY_POOL.length];
    setDailyDraft(suggestion);
    dispatch({ type: "aiDailyTick" });
    dispatch({ type: "aiDailyThinking", value: true });
    setTimeout(() => dispatch({ type: "aiDailyThinking", value: false }), 600);
    dispatch({ type: "aiDailyFlash", value: true });
    setTimeout(() => dispatch({ type: "aiDailyFlash", value: false }), 600);
    if (dailyInputRef.current) dailyInputRef.current.focus();
  };

  const requestAIAll = () => {
    const suggestion = MT_AI_ALL_POOL[state.aiAllIndex % MT_AI_ALL_POOL.length];
    setAllDraft({ name: suggestion.name, dueText: suggestion.dueText, label: suggestion.label, aiSuggested: true });
    dispatch({ type: "aiAllTick" });
    dispatch({ type: "aiAllThinking", value: true });
    setTimeout(() => dispatch({ type: "aiAllThinking", value: false }), 600);
    dispatch({ type: "aiAllFlash", value: true });
    setTimeout(() => dispatch({ type: "aiAllFlash", value: false }), 600);
  };

  const addDaily = () => {
    if (!dailyDraft.trim()) return;
    dispatch({ type: "addDaily", name: dailyDraft });
    setDailyDraft("");
  };

  const addAll = () => {
    if (!allDraft.name.trim()) return;
    dispatch({
      type: "addAll",
      name: allDraft.name, dueText: allDraft.dueText, label: allDraft.label,
      createdBy: allDraft.aiSuggested ? "ai" : "me",
    });
    setAllDraft({ name: "", dueText: "", label: "", aiSuggested: false });
  };

  const wrappedDispatch = React.useCallback((action) => {
    if (action.type === "pickFlower" || action.type === "archive") {
      dispatch({ ...action, todayLabel });
    } else {
      dispatch(action);
    }
  }, [todayLabel]);

  const dailyDoneCount = state.dailyTasks.filter(t => t.done).length;
  const counts = {
    daily:    `${dailyDoneCount} / 7`,
    all:      state.allTasks.length,
    archived: state.archived.length,
  };

  const extraCrumbs = tab === "focus" ? null : [{ daily: "Daily Tasks", all: "All Tasks", archived: "Archived" }[tab]];

  return (
    <div className="mt-page" style={{ background: MT_COLORS.bg, minHeight: "100vh", fontFamily: MT_FONT }}>
      <MT_Styles/>
      <Page
        segments={["my-todo"]}
        extraCrumbs={extraCrumbs}
        title="My To Do"
        lede={null}
      >
        <MT_TabNav active={tab} counts={counts} onChange={goTab}/>

        {tab === "focus"    && <MT_FocusTab state={state} goTab={goTab}/>}
        {tab === "daily"    && (
          <MT_DailyTab
            state={state}
            dispatch={wrappedDispatch}
            requestAIDaily={requestAIDaily}
            addDaily={addDaily}
            dailyDraft={dailyDraft}
            setDailyDraft={setDailyDraft}
            dailyInputRef={dailyInputRef}
            todayLabel={dayDateLabel}
          />
        )}
        {tab === "all"      && (
          <MT_AllTasksTab
            state={state}
            dispatch={wrappedDispatch}
            requestAIAll={requestAIAll}
            draft={allDraft}
            setDraft={setAllDraft}
            addAll={addAll}
          />
        )}
        {tab === "archived" && <MT_ArchivedTab state={state} dispatch={wrappedDispatch}/>}

        <MT_GalleryModal
          open={state.galleryOpen}
          onClose={() => dispatch({ type: "closeGallery" })}
          gallery={state.gallery}
        />

        <MT_Toast toast={state.toast}/>
      </Page>
    </div>
  );
}

window.TodoPage = TodoPage;

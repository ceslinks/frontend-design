// LINKS — My Desk (humanized)
// L1 surface that is the student's *active workspace*. Per the MCG, this is
// the home for in-flight work, captured thinking, saved files, pinned links,
// and the daily lunch surface. We render six L2 panes from a single page so
// state and chrome stay consistent.
//
// VISUAL DIRECTION (May 26 revision)
// "My Desk" should *feel* like a desk. Lean into the design system's tactile
// layer (paper, washi tape, pushpins, polaroid frames, ±3° tilt budget) so
// data has weight and personality without sacrificing legibility. Clinical
// cards stay for dense data (file table, storage); everything that maps to
// a real-world object becomes one — sticky notes ARE sticky notes, the lunch
// pick IS a cafeteria ticket, bookmarks ARE clipped scraps, the AI nudges
// are a Post-it pad. Rotation budget: ±3° max per object.

/* ============================================================
   L2 tabs (matches NAV_MAP children for "my-desk")
   ============================================================ */
function DeskTabs({ segments }) {
  const tabs = [
    { id: "overview",  label: "Overview" },
    { id: "my-menu",   label: "My Menu" },
    { id: "my-tools",  label: "My Tools" },
    { id: "notes",     label: "Notes" },
    { id: "files",     label: "Files" },
    { id: "bookmarks", label: "Bookmarks" },
  ];
  const active = segments[1] || "overview";
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--mist)", overflowX: "auto" }}>
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <a key={t.id} href={"#/my-desk/" + t.id}
            style={{
              padding: "10px 14px", textDecoration: "none",
              color: isActive ? "var(--ink)" : "var(--stone)",
              fontSize: 13, fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? "2px solid var(--student)" : "2px solid transparent",
              marginBottom: -1, whiteSpace: "nowrap",
            }}>{t.label}</a>
        );
      })}
    </div>
  );
}

/* ============================================================
   Shared mock data — keeps the surfaces self-consistent
   ============================================================ */
const DESK_WORK = [
  { title: "Argumentative Essay — 'Cities & Equity'", course: "English Lit", status: "in-progress", due: "Fri May 16", progress: 72, color: "#A855F7", kind: "Essay" },
  { title: "Cell Respiration Lab Report",            course: "Biology",     status: "in-progress", due: "Mon May 19", progress: 35, color: "#22C55E", kind: "Lab" },
  { title: "Quadratics Practice Set 8.2",            course: "Algebra II",  status: "submitted",   due: "Submitted Tue", progress: 100, color: "#3B82F6", kind: "Problem set" },
  { title: "1968 — A Civic Reflection",              course: "US History",  status: "returned",    due: "Feedback ready", progress: 100, color: "#F59E0B", kind: "Paper" },
];

const DESK_NOTES = [
  { id: "n1", title: "Quadratics — vertex form intuition",  course: "Algebra II",  body: "Completing the square is just rewriting so the parabola's lowest/highest point is obvious…", updated: "Today, 10:24 AM", color: "#FFE9A8", pinned: true },
  { id: "n2", title: "Cell respiration cheat-sheet",        course: "Biology",     body: "Glycolysis → Krebs → ETC. Ask Mr. Rivera about ATP yield discrepancies.", updated: "Today, 9:02 AM", color: "#C8EFD0" },
  { id: "n3", title: "Gatsby — symbol of the green light",  course: "English Lit", body: "Tracks Gatsby's hope across chapters; pair with the Valley of Ashes contrast.", updated: "Yesterday", color: "#FFD9B0" },
  { id: "n4", title: "Spanish III · Subjunctive triggers",  course: "Spanish III", body: "WEIRDO: Wishes, Emotion, Impersonal, Recommendations, Doubt, Ojalá.", updated: "Yesterday", color: "#FFB6B0" },
  { id: "n5", title: "Football — receiver routes review",   course: "Athletics",   body: "Slant + post combos vs. Cover 2; talk to Coach Patel on Tue.", updated: "May 12", color: "#D5C9F2" },
  { id: "n6", title: "Robotics — sensor wiring diagram",    course: "Robotics",    body: "Re-check pull-up resistors on the line sensor before Sat.", updated: "May 11", color: "#B6DCF5" },
];

const DESK_FILES = [
  { name: "Cells_lab_results.xlsx",       kind: "xlsx", course: "Biology",    size: "84 KB",   updated: "Today",      from: "You",         shared: ["Mr. Rivera"] },
  { name: "Essay_draft_v3.docx",          kind: "docx", course: "English Lit",size: "42 KB",   updated: "Today",      from: "You",         shared: [] },
  { name: "Quadratics_practice.pdf",      kind: "pdf",  course: "Algebra II", size: "1.2 MB",  updated: "Yesterday",  from: "Ms. Chen",    shared: [] },
  { name: "Gatsby_chapter_notes.pdf",     kind: "pdf",  course: "English Lit",size: "320 KB", updated: "May 13",     from: "Ms. Patel",   shared: [] },
  { name: "Cell_diagram.png",             kind: "png",  course: "Biology",    size: "1.8 MB",  updated: "May 12",     from: "You",         shared: ["Sam K."] },
  { name: "1968_paper_returned.docx",     kind: "docx", course: "US History", size: "58 KB",   updated: "May 10",     from: "Mr. Greene",  shared: [] },
  { name: "Spanish_subjunctive_drill.pdf",kind: "pdf",  course: "Spanish III",size: "210 KB", updated: "May 9",      from: "Sra. Morales",shared: [] },
];

const DESK_BOOKMARKS = [
  { title: "Khan Academy — Quadratic functions", url: "khanacademy.org",  tag: "Algebra II",   icon: "📐", color: "#3B82F6", saved: "Today" },
  { title: "Crash Course — Cellular Respiration",url: "youtube.com",      tag: "Biology",      icon: "🎬", color: "#22C55E", saved: "Today" },
  { title: "MLA in-text citations cheat sheet",  url: "owl.purdue.edu",   tag: "English Lit",  icon: "📖", color: "#A855F7", saved: "Yesterday" },
  { title: "Desmos — Graphing calculator",       url: "desmos.com",       tag: "Tools",        icon: "📊", color: "#0EA5A4", saved: "May 12" },
  { title: "WordReference — Spanish",            url: "wordreference.com",tag: "Spanish III",  icon: "🌐", color: "#EF4444", saved: "May 10" },
  { title: "Common App essay prompts (2026)",    url: "commonapp.org",    tag: "College",      icon: "🎓", color: "#F59E0B", saved: "May 7" },
];

const DESK_LUNCH = {
  cycle: "Cycle B · Day 3",
  date: "Wed, May 15",
  period: "5th period · 12:25 – 12:55 PM",
  vote: { open: true, deadline: "Fri 3 PM", optionsCount: 4 },
  options: [
    { name: "Roasted veg + chickpea bowl",   tags: ["Veg", "GF"],            kcal: 540, allergens: ["Sesame"],      pick: true,  desc: "Brown rice, harissa chickpeas, charred peppers, lemon-tahini." },
    { name: "Grilled chicken sandwich",      tags: ["Halal"],                kcal: 610, allergens: ["Wheat", "Egg"], pick: false, desc: "Brioche, slaw, pickles, avocado spread, oven fries." },
    { name: "Three-bean chili + cornbread",  tags: ["Veg", "DF"],            kcal: 580, allergens: [],              pick: false, desc: "Slow-cooked chili, scallions, cornbread square, cheddar (opt.)." },
    { name: "Chef's salad",                  tags: ["GF"],                   kcal: 420, allergens: ["Egg", "Dairy"], pick: false, desc: "Mixed greens, turkey, ham, egg, cheddar, croutons opt." },
  ],
  next: [
    { day: "Mon", header: "Cycle A · Day 1", main: "Buddha bowl",            v: "Veg" },
    { day: "Tue", header: "Cycle A · Day 2", main: "Chicken parm",           v: "" },
    { day: "Wed", header: "Cycle A · Day 3", main: "Veg lasagna",            v: "Veg" },
    { day: "Thu", header: "Cycle A · Day 4", main: "Tacos al pastor",        v: "" },
    { day: "Fri", header: "Cycle A · Day 5", main: "Grilled cheese · soup",  v: "Veg" },
  ],
};

/* ============================================================
   Tactile primitives — composed from the design system's tokens.
   These do the heavy lifting on My Desk. Kept inline (small) so
   it's obvious what's drawing each effect.
   ============================================================ */
const HAND_FONT = "'Caveat', 'Kalam', 'Bradley Hand', cursive";
const SCRIPT_FONT = "'Kalam', 'Caveat', 'Marker Felt', cursive";

// Deterministic pseudo-random tilt (-2.5..+2.5deg) so re-renders are stable.
function tiltFor(seed, max = 2.4) {
  let h = 0;
  for (let i = 0; i < String(seed).length; i++) h = (h * 31 + String(seed).charCodeAt(i)) | 0;
  const r = ((h % 1000) / 1000) * 2 - 1;
  return +(r * max).toFixed(2);
}

// Washi tape strip placed via absolute positioning (more flexible than ::before).
function Tape({ color = "lavender", rotate = -4, width = 80, top = -10, left = "50%", style = {} }) {
  const colorMap = {
    peach:    "rgba(247, 184, 152, 0.85)",
    mint:     "rgba(167, 213, 184, 0.85)",
    lavender: "rgba(196, 181, 253, 0.85)",
    butter:   "rgba(248, 222, 152, 0.88)",
    sky:      "rgba(167, 197, 235, 0.85)",
  };
  const bg = colorMap[color] || color;
  return (
    <div aria-hidden="true" style={{
      position: "absolute", top, left,
      width, height: 22,
      transform: `translateX(-50%) rotate(${rotate}deg)`,
      background: `repeating-linear-gradient(90deg, ${bg} 0 4px, rgba(255,255,255,0.10) 4px 5px), ${bg}`,
      borderRadius: 1,
      boxShadow: "0 2px 4px -2px rgba(15,23,42,0.18), inset 0 0 0 1px rgba(255,255,255,0.18)",
      pointerEvents: "none", zIndex: 4,
      ...style,
    }}/>
  );
}

// Pushpin (round, with a glint).
function Pin({ color = "var(--pin-red)", top = -7, left = "50%", style = {} }) {
  return (
    <div aria-hidden="true" style={{
      position: "absolute", top, left,
      width: 16, height: 16, borderRadius: 999,
      background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 45%), ${color}`,
      transform: "translateX(-50%)",
      boxShadow: "0 0 0 1px rgba(15,23,42,0.18) inset, 0 2px 3px rgba(15,23,42,0.30), 0 0 0 1px rgba(15,23,42,0.06)",
      zIndex: 5,
      ...style,
    }}/>
  );
}

// Paper-clip drawn via two stacked rounded outlines.
function Paperclip({ size = 28, color = "#9CA3AF", style = {} }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 28 32" aria-hidden="true" style={{ display: "block", ...style }}>
      <path d="M9 4 q-4 0 -4 5 v15 q0 5 5 5 t5 -5 V8 q0 -3 3 -3 t3 3 V21" fill="none"
        stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 4 q-4 0 -4 5 v15 q0 5 5 5 t5 -5 V8 q0 -3 3 -3 t3 3 V21" fill="none"
        stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"
        transform="translate(0.4 0.4)"/>
    </svg>
  );
}

// Sticky note — folded corner + slight tilt + soft drop. The "real" sticky.
function Sticky({ note, onOpen, tilt }) {
  const t = tilt ?? tiltFor(note.id || note.title);
  return (
    <div onClick={onOpen} role="button" tabIndex={0} style={{
      position: "relative",
      background: `linear-gradient(135deg, ${shade(note.color, 4)} 0%, ${note.color} 18%, ${note.color} 82%, ${shade(note.color, -8)} 100%)`,
      padding: "16px 16px 14px",
      borderRadius: 2,
      transform: `rotate(${t}deg)`,
      boxShadow: `0 1px 1px rgba(15,23,42,0.05),
                  0 12px 18px -10px rgba(15,23,42,0.18),
                  0 22px 26px -22px rgba(15,23,42,0.22)`,
      cursor: "pointer",
      minHeight: 148,
      display: "flex", flexDirection: "column", gap: 6,
      transition: "transform 0.18s ease, box-shadow 0.18s ease",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = `rotate(${t * 0.4}deg) translateY(-2px)`; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = `rotate(${t}deg)`; }}
    >
      {/* Folded corner shadow */}
      <div aria-hidden="true" style={{
        position: "absolute", right: 0, bottom: 0, width: 28, height: 28,
        background: `linear-gradient(135deg, transparent 50%, rgba(15,23,42,0.10) 50%, ${shade(note.color, -14)} 52%)`,
        borderBottomRightRadius: 2,
      }}/>
      {note.pinned && <Pin top={-8} left={18} color="var(--pin-red)"/>}
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(15,23,42,0.55)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{note.course}</div>
      <div style={{ fontFamily: HAND_FONT, fontSize: 18, fontWeight: 700, color: "rgba(15,23,42,0.92)", lineHeight: 1.1, letterSpacing: "-0.005em",
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{note.title}</div>
      <div style={{ fontFamily: SCRIPT_FONT, fontWeight: 400, fontSize: 13.5, color: "rgba(15,23,42,0.78)", lineHeight: 1.35,
        display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{note.body}</div>
      <div style={{ marginTop: "auto", fontSize: 10.5, color: "rgba(15,23,42,0.45)", fontWeight: 500 }}>{note.updated}</div>
    </div>
  );
}

// Tiny color-shade utility (hex only).
function shade(hex, pct) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return hex;
  const num = parseInt(h, 16);
  let r = (num >> 16) + pct;
  let g = ((num >> 8) & 0xff) + pct;
  let b = (num & 0xff) + pct;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return "#" + ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0");
}

// Cork-board background (subtle grain). For sections that should feel pinned-up.
const CORK_BG = {
  background:
    "radial-gradient(circle at 20% 30%, rgba(180,124,82,0.10) 0 1.5px, transparent 2px)," +
    "radial-gradient(circle at 70% 80%, rgba(140,90,52,0.08) 0 1px, transparent 2px)," +
    "radial-gradient(circle at 45% 55%, rgba(160,108,68,0.06) 0 1.2px, transparent 2px)," +
    "linear-gradient(180deg, #E8D9BF 0%, #DFCDAE 100%)",
  backgroundSize: "60px 60px, 90px 90px, 40px 40px, 100% 100%",
};

// Ruled-paper background — like a notebook.
const RULED_BG = {
  background:
    "linear-gradient(transparent 0 27px, rgba(120,142,196,0.30) 28px, transparent 28px)," +
    "linear-gradient(90deg, transparent 0 47px, rgba(217,84,74,0.30) 47px, rgba(217,84,74,0.30) 48px, transparent 48px)," +
    "var(--paper-warm)",
  backgroundSize: "100% 28px, 100% 100%",
};

/* ============================================================
   Small atoms used across panes
   ============================================================ */
function StatusPill({ status }) {
  const map = {
    "in-progress": { label: "In progress", tone: "info" },
    "submitted":   { label: "Submitted",   tone: "neutral" },
    "returned":    { label: "Feedback",    tone: "warning" },
    "draft":       { label: "Draft",       tone: "neutral" },
  };
  const t = map[status] || map["draft"];
  return <Tag tone={t.tone}>{t.label}</Tag>;
}

// Manila-folder file icon — feels like a tab on a hanging folder.
function FileIcon({ kind }) {
  const map = {
    pdf:  { fg: "#7A1F1F", bg: "#F1B7B1", label: "PDF" },
    docx: { fg: "#1E3A8A", bg: "#B4C9F0", label: "DOC" },
    xlsx: { fg: "#14532D", bg: "#B5DFC2", label: "XLS" },
    png:  { fg: "#5B21B6", bg: "#D5C9F2", label: "IMG" },
    jpg:  { fg: "#5B21B6", bg: "#D5C9F2", label: "IMG" },
  };
  const t = map[kind] || { fg: "var(--paper-warm-ink)", bg: "var(--paper-warm-edge)", label: "FILE" };
  return (
    <div style={{
      position: "relative", width: 36, height: 42, flexShrink: 0,
      filter: "drop-shadow(0 2px 3px rgba(15,23,42,0.10))",
    }}>
      {/* Tab */}
      <div style={{
        position: "absolute", top: 0, left: 4, width: 14, height: 5,
        background: t.bg, borderRadius: "2px 2px 0 0",
      }}/>
      {/* Body */}
      <div style={{
        position: "absolute", top: 4, left: 0, right: 0, bottom: 0,
        background: t.bg, color: t.fg, borderRadius: "1px 4px 4px 4px",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 9.5, fontWeight: 800, letterSpacing: "0.06em",
        boxShadow: "inset 0 0 0 1px rgba(15,23,42,0.06), inset 0 -3px 0 rgba(15,23,42,0.04)",
      }}>{t.label}</div>
    </div>
  );
}

/* ============================================================
   OVERVIEW — the hub
   ============================================================ */
function MyDeskOverview({ segments }) {
  const inProgress = DESK_WORK.filter((w) => w.status === "in-progress").length;
  const submitted  = DESK_WORK.filter((w) => w.status === "submitted").length;
  const returned   = DESK_WORK.filter((w) => w.status === "returned").length;

  return (
    <Page segments={segments} title="My Desk" emoji=""
      lede="What you're in the middle of, plus the bits and pieces you keep coming back to."
      actions={
        <>
          <button className="btn btn-sm"><I.Plus size={12} color="var(--stone)"/> New note</button>
          <button className="btn btn-sm"><I.Upload size={12} color="var(--stone)"/> Upload file</button>
          <a href="#/my-desk/my-tools" className="btn btn-sm" style={{ textDecoration: "none" }}><I.Tools size={12} color="var(--stone)"/> Open tools</a>
        </>
      }
      rightRail={
        <>
          {/* AI nudges — Post-it pad with a torn-off top sheet */}
          <div style={{ position: "relative", paddingTop: 16 }}>
            <div style={{
              position: "relative",
              background: "#FFF6B8",
              padding: "20px 18px 16px",
              borderRadius: "2px 2px 6px 6px",
              boxShadow:
                "0 1px 1px rgba(15,23,42,0.06)," +
                "0 14px 22px -14px rgba(15,23,42,0.20)," +
                "inset 0 -10px 12px -12px rgba(150,120,40,0.25)",
              transform: "rotate(-0.6deg)",
            }}>
              {/* Glue shadow at top */}
              <div aria-hidden="true" style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 14,
                background: "linear-gradient(180deg, rgba(160,130,40,0.18), transparent)",
                borderRadius: "2px 2px 0 0",
              }}/>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <I.Sparkle size={13} color="#7A5A0F"/>
                <div style={{ fontFamily: HAND_FONT, fontSize: 22, fontWeight: 700, color: "#3A2D08", letterSpacing: "-0.01em" }}>Nudges</div>
                <span style={{
                  fontSize: 9, fontWeight: 700, color: "#7A5A0F",
                  background: "rgba(255,255,255,0.55)",
                  padding: "1px 5px", borderRadius: 3, marginLeft: "auto",
                  letterSpacing: "0.06em", border: "1px solid rgba(122,90,15,0.2)",
                }}>AI</span>
              </div>
              <div style={{ fontFamily: SCRIPT_FONT, fontSize: 13.5, color: "rgba(58,45,8,0.75)", marginBottom: 12, lineHeight: 1.4 }}>
                Quick wins based on what's open and what's coming up.
              </div>
              {[
                { ic: "📝", t: "You left off mid-paragraph", s: "Cities & Equity essay — about 25 minutes to wrap section 3." },
                { ic: "🔬", t: "Your hypothesis is still blank", s: "Cell respiration lab — three prompts to fill in." },
                { ic: "💬", t: "Mr. Greene wrote you back", s: "Four comments on the 1968 paper. Worth reading before tonight." },
              ].map((s, i) => (
                <div key={i} style={{
                  paddingTop: i ? 12 : 0, paddingBottom: i === 2 ? 0 : 12,
                  borderTop: i ? "1px dashed rgba(122,90,15,0.3)" : "none",
                }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6,
                      background: "rgba(255,255,255,0.55)",
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, fontSize: 13,
                      border: "1px solid rgba(122,90,15,0.18)",
                    }}>{s.ic}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#2A2105" }}>{s.t}</div>
                      <div style={{ fontSize: 12, color: "rgba(58,45,8,0.7)", lineHeight: 1.4 }}>{s.s}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Stack illusion — peek of the next sheet */}
            <div aria-hidden="true" style={{
              position: "absolute", left: 6, right: 6, bottom: -4, height: 8,
              background: "#F4E59C", borderRadius: "0 0 6px 6px",
              boxShadow: "0 6px 10px -8px rgba(15,23,42,0.18)",
              transform: "rotate(0.3deg)", zIndex: -1,
            }}/>
          </div>

          {/* Lunch tile — cafeteria meal ticket */}
          <a href="#/my-desk/my-menu" style={{
            position: "relative", display: "block", textDecoration: "none",
            background: "var(--paper-warm)",
            border: "1px solid var(--paper-warm-edge)",
            borderRadius: 10,
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.6) inset," +
              "0 12px 18px -12px rgba(15,23,42,0.18)",
            padding: 0, overflow: "hidden",
            transform: "rotate(0.4deg)",
          }}>
            {/* Perforation strip */}
            <div aria-hidden="true" style={{
              position: "absolute", left: 0, right: 0, top: 56,
              height: 1,
              background: "repeating-linear-gradient(90deg, var(--paper-warm-shade) 0 6px, transparent 6px 12px)",
            }}/>
            {/* Header — like a stub */}
            <div style={{ padding: "12px 16px 10px", background: "#FFF6E2" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 2 }}>
                <span style={{ fontSize: 9.5, fontWeight: 800, color: "#A16207", letterSpacing: "0.14em" }}>LUNCH TICKET · 5TH PD</span>
                <span style={{ fontSize: 10, color: "#A16207", fontFamily: "ui-monospace, monospace" }}>№ 0512</span>
              </div>
              <div style={{ fontFamily: HAND_FONT, fontSize: 18, fontWeight: 700, color: "#3A2D08" }}>Wednesday, May 15</div>
            </div>
            <div style={{ padding: "14px 16px 14px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>{DESK_LUNCH.options[0].name}</div>
              <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 10, lineHeight: 1.4 }}>{DESK_LUNCH.options[0].desc}</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {DESK_LUNCH.options[0].tags.map((t) => <Tag key={t} tone="success">{t}</Tag>)}
                <Tag tone="neutral">{DESK_LUNCH.options[0].kcal} kcal</Tag>
              </div>
              <div style={{ fontSize: 11.5, color: "#A16207", fontWeight: 600 }}>See the rest of the menu →</div>
            </div>
            {/* Stamp */}
            <div aria-hidden="true" style={{
              position: "absolute", right: 12, bottom: 12,
              transform: "rotate(-14deg)",
              border: "2px solid rgba(217,84,74,0.55)",
              color: "rgba(217,84,74,0.75)",
              padding: "2px 8px", borderRadius: 4,
              fontSize: 9, fontWeight: 800, letterSpacing: "0.18em",
              fontFamily: "ui-monospace, monospace",
              background: "rgba(255,246,226,0.4)",
            }}>YOUR PICK</div>
          </a>

          {/* Storage — kept clinical (it's data) */}
          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 12 }}>STORAGE</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>2.4 GB</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>of 10 GB used</div>
            </div>
            <div style={{ height: 6, background: "var(--bone)", borderRadius: 999, overflow: "hidden", marginBottom: 12 }}>
              <div style={{ width: "24%", height: "100%", background: "var(--student)" }}/>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { label: "Documents", val: "1.2 GB", c: "#3B82F6" },
                { label: "Images",    val: "640 MB", c: "#A855F7" },
                { label: "Class files", val: "380 MB", c: "#22C55E" },
                { label: "Other",     val: "180 MB", c: "var(--silver)" },
              ].map((r) => (
                <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: r.c }}/>
                  <span style={{ color: "var(--slate)", flex: 1 }}>{r.label}</span>
                  <span style={{ color: "var(--stone)", fontVariantNumeric: "tabular-nums" }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      }
    >
      <DeskTabs segments={segments}/>

      {/* HERO — handwritten greeting on a notebook page */}
      <div style={{
        position: "relative", marginBottom: 22,
        background: "var(--paper-warm)",
        border: "1px solid var(--paper-warm-edge)",
        borderBottomColor: "var(--paper-warm-shade)",
        borderRadius: 6,
        boxShadow: "0 1px 0 rgba(255,255,255,0.6) inset, 0 14px 22px -16px rgba(15,23,42,0.18)",
        padding: "22px 26px 22px 60px",
        overflow: "hidden",
        backgroundImage: "linear-gradient(90deg, transparent 0 47px, rgba(217,84,74,0.30) 47px, rgba(217,84,74,0.30) 48px, transparent 48px)",
      }}>
        {/* Margin holes */}
        <div aria-hidden="true" style={{
          position: "absolute", left: 22, top: 18, bottom: 18, width: 10,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
        }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: 999,
              background: "var(--surface)",
              boxShadow: "inset 0 1px 2px rgba(15,23,42,0.18)",
            }}/>
          ))}
        </div>
        <Tape color="lavender" rotate={-3} width={90} top={-10} left={"22%"}/>
        <Tape color="butter" rotate={4} width={70} top={-9} left={"82%"}/>

        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3, 1fr)", gap: 24, alignItems: "end" }}>
          <div>
            <div style={{
              fontSize: 10.5, fontWeight: 800, color: "#A16207",
              letterSpacing: "0.16em", marginBottom: 4,
            }}>WEDNESDAY · MAY 15</div>
            <div style={{
              fontFamily: HAND_FONT, fontSize: 22, fontWeight: 700,
              color: "var(--paper-warm-ink)", lineHeight: 1.15,
              letterSpacing: "-0.01em", marginBottom: 20,
            }}>
              Two drafts going, one paper back from Mr.&nbsp;Greene.
            </div>
            <div style={{ fontFamily: SCRIPT_FONT, fontSize: 15, color: "rgba(58,51,40,0.7)", lineHeight: 1.4 }}>
              The essay's the closer one. Lab can wait till study hall.
            </div>
          </div>
          {[
            { label: "Working on", value: inProgress, c: "#3B82F6", sub: "Drafts open right now" },
            { label: "Turned in",   value: submitted,  c: "#64748B", sub: "Waiting on a grade" },
            { label: "Heard back",  value: returned,   c: "#D9544A", sub: "Comments to read" },
          ].map((m) => (
            <div key={m.label} style={{
              padding: "10px 0",
              borderLeft: "1px dashed rgba(58,51,40,0.20)",
              paddingLeft: 18,
            }}>
              <div style={{ fontFamily: HAND_FONT, fontSize: 48, fontWeight: 700, color: m.c, lineHeight: 1, marginBottom: 4 }}>{m.value}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--paper-warm-ink)" }}>{m.label}</div>
              <div style={{ fontSize: 11.5, color: "rgba(58,51,40,0.65)", marginTop: 2 }}>{m.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Work-in-flight — index cards, color-tabbed */}
      <div style={{ marginBottom: 26 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, margin: 0, color: "var(--ink)" }}>
            On your desk
          </h2>
          <a href="#/my-classes" style={{ fontSize: 12, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Every assignment →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {DESK_WORK.map((w, i) => (
            <IndexCard key={w.title} work={w} index={i}/>
          ))}
        </div>
      </div>

      {/* Three-up: Notes / Files / Bookmarks recent */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
        {/* Notes — sticky strip */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Lately written</div>
            <a href="#/my-desk/notes" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>See all →</a>
          </div>
          <div style={{
            ...CORK_BG, borderRadius: 10, padding: 14,
            boxShadow: "inset 0 0 0 1px rgba(120,80,40,0.15), inset 0 0 30px rgba(120,80,40,0.10)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {DESK_NOTES.slice(0, 4).map((n) => (
                <Sticky key={n.id} note={n}/>
              ))}
            </div>
          </div>
        </div>

        {/* Files — manila folder */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Lately opened</div>
            <a href="#/my-desk/files" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>See all →</a>
          </div>
          <ManilaFolder>
            {DESK_FILES.slice(0, 5).map((f, i) => (
              <div key={f.name} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 4px",
                borderTop: i ? "1px dashed rgba(122,90,15,0.20)" : "none",
              }}>
                <FileIcon kind={f.kind}/>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--paper-warm-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(58,51,40,0.6)" }}>{f.course} · {f.updated}</div>
                </div>
                <I.MoreH size={14} color="rgba(58,51,40,0.4)"/>
              </div>
            ))}
          </ManilaFolder>
        </div>

        {/* Bookmarks — taped scraps */}
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Stuff you bookmarked</div>
            <a href="#/my-desk/bookmarks" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>See all →</a>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 8 }}>
            {DESK_BOOKMARKS.slice(0, 5).map((b, i) => (
              <BookmarkScrap key={b.title} b={b} index={i}/>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}

/* Manila folder — thick paper bottom-edge tab. Wraps a list. */
function ManilaFolder({ children, label = "Recent" }) {
  return (
    <div style={{ position: "relative" }}>
      {/* Tab */}
      <div aria-hidden="true" style={{
        position: "absolute", top: -10, left: 18,
        background: "#E9C77B",
        padding: "4px 14px 6px",
        fontSize: 10, fontWeight: 800, letterSpacing: "0.12em",
        color: "#5C4710",
        borderRadius: "6px 10px 0 0",
        boxShadow: "0 -1px 0 rgba(255,255,255,0.4) inset",
      }}>{label.toUpperCase()}</div>
      {/* Body */}
      <div style={{
        background: "linear-gradient(180deg, #F4DFA8 0%, #ECD18A 100%)",
        borderRadius: "10px 10px 8px 8px",
        padding: "14px 16px 16px",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.45)," +
          "inset 0 -2px 0 rgba(140,100,30,0.18)," +
          "0 14px 22px -14px rgba(15,23,42,0.18)",
        color: "var(--paper-warm-ink)",
      }}>
        {children}
      </div>
    </div>
  );
}

/* Index-card — a 3x5 with a colored class-tab + handwritten title. */
function IndexCard({ work, index }) {
  const tilt = tiltFor(work.title, 1.2);
  return (
    <div style={{
      position: "relative",
      background: "var(--paper-warm)",
      border: "1px solid var(--paper-warm-edge)",
      borderBottomColor: "var(--paper-warm-shade)",
      borderRadius: 6,
      padding: "16px 18px 14px 22px",
      boxShadow:
        "0 1px 0 rgba(255,255,255,0.6) inset," +
        "0 14px 22px -14px rgba(15,23,42,0.18)," +
        "0 2px 4px rgba(15,23,42,0.05)",
      transform: `rotate(${tilt}deg)`,
      cursor: "pointer",
      // Single red margin line — index card vibe
      backgroundImage:
        "linear-gradient(90deg, transparent 0 12px, rgba(217,84,74,0.55) 12px 13px, transparent 13px)",
    }}>
      {/* Color spine — class identity */}
      <div style={{
        position: "absolute", top: 8, bottom: 8, right: 8, width: 4,
        borderRadius: 999, background: work.color,
      }}/>
      {/* Tape on submitted/returned only — feels archived */}
      {work.status === "submitted" && <Tape color="mint" rotate={-6} width={56} top={-9} left={"24%"}/>}
      {work.status === "returned"  && <Tape color="peach" rotate={5} width={56} top={-9} left={"76%"}/>}

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div style={{
          fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em",
          color: work.color, textTransform: "uppercase",
        }}>{work.kind} · {work.course}</div>
        <div style={{ flex: 1 }}/>
        <StatusPill status={work.status}/>
      </div>
      <div style={{
        fontFamily: HAND_FONT, fontSize: 19, fontWeight: 700,
        color: "var(--paper-warm-ink)", lineHeight: 1.15, letterSpacing: "-0.005em",
        marginBottom: 10,
        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
      }}>{work.title}</div>

      {work.status === "in-progress" && (
        <>
          <div style={{
            height: 6, background: "rgba(58,51,40,0.10)",
            borderRadius: 999, overflow: "hidden", marginBottom: 6,
          }}>
            <div style={{
              width: work.progress + "%", height: "100%",
              background: `linear-gradient(90deg, ${work.color}, ${shade(work.color, -16)})`,
            }}/>
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            fontFamily: SCRIPT_FONT, fontSize: 13.5,
            color: "rgba(58,51,40,0.7)",
          }}>
            <span>about {work.progress}% there</span>
            <span style={{ fontWeight: 700 }}>due {work.due}</span>
          </div>
        </>
      )}
      {work.status === "submitted" && (
        <div style={{
          fontFamily: SCRIPT_FONT, fontSize: 13.5,
          color: "rgba(58,51,40,0.7)",
          display: "flex", justifyContent: "space-between",
        }}>
          <span>{work.due}</span>
          <span>waiting on Ms. Chen</span>
        </div>
      )}
      {work.status === "returned" && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: SCRIPT_FONT, fontSize: 14, fontWeight: 700,
          color: "#A16207",
        }}>
          <I.MessageSquare size={13} color="#A16207"/>
          Mr. Greene left 4 comments — take a look
        </div>
      )}
    </div>
  );
}

/* Bookmark scrap — a torn paper strip, pinned. */
function BookmarkScrap({ b, index }) {
  const tilt = tiltFor(b.title, 1.6);
  const tapeColors = ["lavender", "mint", "peach", "butter", "sky"];
  const tape = tapeColors[index % tapeColors.length];
  return (
    <a href="#" style={{ textDecoration: "none", position: "relative", display: "block",
      transform: `rotate(${tilt}deg)`,
    }}>
      <Tape color={tape} rotate={index % 2 === 0 ? -6 : 6} width={50}
        top={-8} left={index % 2 === 0 ? "20%" : "80%"}/>
      <div style={{
        background: "var(--paper-warm)",
        border: "1px solid var(--paper-warm-edge)",
        borderBottom: "2px solid var(--paper-warm-shade)",
        borderRadius: 4,
        padding: "12px 14px",
        boxShadow: "0 8px 14px -10px rgba(15,23,42,0.18)",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: b.color + "1A",
          border: `1px solid ${b.color}33`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontSize: 17,
        }}>{b.icon}</div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--paper-warm-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.title}</div>
          <div style={{ fontSize: 11, color: "rgba(58,51,40,0.6)" }}>{b.url} · {b.tag}</div>
        </div>
        <I.External size={12} color="rgba(58,51,40,0.4)"/>
      </div>
    </a>
  );
}

/* ============================================================
   MY MENU — cafeteria
   ============================================================ */
function MyDeskMenu({ segments }) {
  return (
    <Page segments={segments} title="My Menu" emoji=""
      lede="What's on the line today, what's coming next week, and a vote so the cafeteria knows what you actually want."
      actions={
        <>
          <button className="btn btn-sm"><I.Filter size={12} color="var(--stone)"/> Dietary filters</button>
          <button className="btn btn-primary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.Check size={12} color="#fff"/> Confirm today's pick
          </button>
        </>
      }
      rightRail={
        <>
          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 10 }}>YOUR DIET</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Vegetarian", on: true },
                { label: "Halal",      on: false },
                { label: "Nut allergy", on: true },
                { label: "Gluten-free", on: false },
                { label: "Dairy-free",  on: false },
              ].map((p) => (
                <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 30, height: 18, borderRadius: 999, padding: 2,
                    background: p.on ? "var(--student)" : "var(--mist)",
                    display: "flex", alignItems: "center",
                    justifyContent: p.on ? "flex-end" : "flex-start",
                  }}>
                    <div style={{ width: 14, height: 14, borderRadius: 999, background: "#fff" }}/>
                  </div>
                  <span style={{ fontSize: 12.5, color: "var(--slate)" }}>{p.label}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, fontSize: 11.5, color: "var(--stone)", lineHeight: 1.5 }}>
              We'll only show you food that fits. Cafeteria sees this so they can plan.
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 8 }}>VOTE FOR NEXT FRIDAY</div>
            <div style={{ fontSize: 12.5, color: "var(--slate)", marginBottom: 12, lineHeight: 1.5 }}>
              Pick what you actually want to eat next Friday. Polls close <strong>Fri 3 PM</strong>.
            </div>
            {[
              { name: "BBQ jackfruit sliders", pct: 41, mine: true },
              { name: "Chicken & rice bowl",    pct: 33 },
              { name: "Pesto pasta + salad",    pct: 18 },
              { name: "Surprise me — chef's pick", pct: 8 },
            ].map((v) => (
              <div key={v.name} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: v.mine ? 700 : 500, color: "var(--ink)", marginBottom: 4 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    {v.mine && <I.Check size={11} color="var(--student)"/>}
                    {v.name}
                  </span>
                  <span style={{ color: "var(--stone)" }}>{v.pct}%</span>
                </div>
                <div style={{ height: 5, background: "var(--bone)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: v.pct + "%", height: "100%", background: v.mine ? "var(--student)" : "var(--student-200)" }}/>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 8 }}>CAFETERIA HOURS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, color: "var(--slate)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Breakfast</span><span>7:15 – 7:45 AM</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Lunch · Periods 4–6</span><span>11:25 – 1:00 PM</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Afterschool snack</span><span>3:10 – 3:45 PM</span></div>
            </div>
          </div>
        </>
      }
    >
      <DeskTabs segments={segments}/>

      {/* Today header — chalkboard menu vibe */}
      <div style={{
        position: "relative",
        background: "linear-gradient(180deg, #2A3F35 0%, #243530 100%)",
        backgroundImage:
          "radial-gradient(circle at 20% 40%, rgba(255,255,255,0.04) 0 1px, transparent 1.5px)," +
          "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.03) 0 1px, transparent 1.5px)," +
          "linear-gradient(180deg, #2A3F35 0%, #243530 100%)",
        backgroundSize: "40px 40px, 65px 65px, 100% 100%",
        borderRadius: 12,
        padding: "20px 24px",
        marginBottom: 20,
        boxShadow:
          "inset 0 0 0 8px #6B4A28," +
          "inset 0 0 0 9px rgba(0,0,0,0.4)," +
          "0 12px 22px -16px rgba(15,23,42,0.5)",
        color: "#F2F0E6",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: "#E5C690", letterSpacing: "0.18em", marginBottom: 4 }}>{DESK_LUNCH.cycle.toUpperCase()} · TODAY</div>
            <div style={{
              fontFamily: HAND_FONT, fontSize: 30, fontWeight: 700,
              color: "#F2F0E6", letterSpacing: "0.005em",
              textShadow: "0 0 1px rgba(255,255,255,0.4)",
            }}>
              {DESK_LUNCH.date}
            </div>
          </div>
          <div style={{ flex: 1 }}/>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "#E5C690", fontFamily: SCRIPT_FONT }}>
            <I.Clock size={13} color="#E5C690"/>
            <span>{DESK_LUNCH.period}</span>
          </div>
          <div style={{
            display: "inline-flex",
            border: "1px solid rgba(229,198,144,0.35)",
            borderRadius: 8, overflow: "hidden",
            background: "rgba(0,0,0,0.18)",
          }}>
            <button style={{ padding: "7px 12px", border: "none", background: "rgba(229,198,144,0.95)", color: "#2A3F35", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Today</button>
            <button style={{ padding: "7px 12px", border: "none", background: "transparent", color: "#E5C690", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>This week</button>
            <button style={{ padding: "7px 12px", border: "none", background: "transparent", color: "#E5C690", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Cycle</button>
          </div>
        </div>
      </div>

      {/* Options grid — meal-card paper */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18, marginBottom: 22 }}>
        {DESK_LUNCH.options.map((o, i) => {
          const tilt = tiltFor(o.name, 1.0);
          return (
            <div key={o.name} style={{
              position: "relative",
              background: o.pick ? "var(--paper-warm)" : "var(--paper)",
              border: o.pick ? "1px solid #E9C77B" : "1px solid var(--mist)",
              borderRadius: 10,
              padding: 18,
              transform: `rotate(${tilt}deg)`,
              boxShadow: o.pick
                ? "0 1px 0 rgba(255,255,255,0.6) inset, 0 16px 26px -16px rgba(15,23,42,0.20)"
                : "0 8px 14px -10px rgba(15,23,42,0.10)",
            }}>
              {o.pick && <Tape color="butter" rotate={-5} width={70} top={-10} left={"22%"}/>}
              {o.pick && (
                <div aria-hidden="true" style={{
                  position: "absolute", top: 14, right: 14,
                  transform: "rotate(-12deg)",
                  border: "2px solid rgba(217,84,74,0.55)",
                  color: "rgba(217,84,74,0.78)",
                  padding: "2px 8px", borderRadius: 4,
                  fontSize: 9, fontWeight: 800, letterSpacing: "0.18em",
                  fontFamily: "ui-monospace, monospace",
                }}>YOUR PICK</div>
              )}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{
                  position: "relative", width: 76, height: 76, borderRadius: 6,
                  flexShrink: 0,
                  padding: 6, background: "#fff",
                  border: "1px solid var(--paper-warm-edge)",
                  boxShadow: "0 4px 8px -4px rgba(15,23,42,0.18)",
                  transform: `rotate(${tilt * -1.5}deg)`,
                }}>
                  <div style={{
                    width: "100%", height: "100%",
                    background: "repeating-linear-gradient(135deg, var(--bone) 0 8px, var(--mist) 8px 9px)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 8,
                    color: "var(--silver)",
                  }}>photo</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: HAND_FONT, fontSize: 24, fontWeight: 700,
                    color: "var(--ink)", lineHeight: 1.05, marginBottom: 4,
                  }}>{o.name}</div>
                  <div style={{ fontSize: 12.5, color: "var(--stone)", marginBottom: 10, lineHeight: 1.4 }}>{o.desc}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {o.tags.map((t) => <Tag key={t} tone="success">{t}</Tag>)}
                    <Tag tone="neutral">{o.kcal} kcal</Tag>
                    {o.allergens.map((a) => <Tag key={a} tone="warning">⚠ {a}</Tag>)}
                  </div>
                </div>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                marginTop: 14, paddingTop: 12,
                borderTop: "1px dashed rgba(58,51,40,0.20)",
              }}>
                <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View full ingredients →</a>
                <button className="btn btn-sm" style={{ height: 28, padding: "0 14px" }}>{o.pick ? "Keep pick" : "Pick this"}</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next week strip — calendar tear-offs */}
      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Next week — Cycle A</div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Full cycle →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {DESK_LUNCH.next.map((d, i) => {
            const tilt = tiltFor(d.day, 1.3);
            return (
              <div key={d.day} style={{
                position: "relative",
                background: "var(--paper-warm)",
                border: "1px solid var(--paper-warm-edge)",
                borderBottom: "2px solid var(--paper-warm-shade)",
                borderRadius: 6,
                padding: "30px 12px 12px",
                transform: `rotate(${tilt}deg)`,
                boxShadow: "0 8px 14px -10px rgba(15,23,42,0.14)",
              }}>
                {/* Top tear/strip */}
                <div aria-hidden="true" style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 22,
                  background: i === 4 ? "#D9544A" : "#3B82F6",
                  borderRadius: "5px 5px 0 0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 9, fontWeight: 800, letterSpacing: "0.16em",
                }}>{d.day.toUpperCase()}</div>
                <div style={{ fontSize: 9.5, color: "var(--silver)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{d.header}</div>
                <div style={{
                  fontFamily: HAND_FONT, fontSize: 18, fontWeight: 700,
                  color: "var(--paper-warm-ink)", lineHeight: 1.05, marginBottom: 8,
                }}>{d.main}</div>
                {d.v && <Tag tone="success">{d.v}</Tag>}
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   NOTES — sticky board on cork
   ============================================================ */
function MyDeskNotes({ segments }) {
  const [filter, setFilter] = React.useState("all");
  const courses = ["all", ...Array.from(new Set(DESK_NOTES.map((n) => n.course)))];
  const filtered = filter === "all" ? DESK_NOTES : DESK_NOTES.filter((n) => n.course === filter);

  return (
    <Page segments={segments} title="Notes" emoji=""
      lede="Half-thoughts, study tricks, things you don't want to forget. Pinned to the top, searchable across every class."
      actions={
        <>
          <button className="btn btn-sm"><I.Search size={12} color="var(--stone)"/> Search</button>
          <button className="btn btn-primary btn-sm"><I.Plus size={12} color="#fff"/> New note</button>
        </>
      }
    >
      <DeskTabs segments={segments}/>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
        <span className="t-eyebrow" style={{ marginRight: 4 }}>FILTER</span>
        {courses.map((c) => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            border: filter === c ? "1px solid var(--student)" : "1px solid var(--mist)",
            background: filter === c ? "var(--student-soft)" : "var(--paper)",
            color: filter === c ? "var(--student-deep)" : "var(--slate)",
            cursor: "pointer",
          }}>{c === "all" ? "All notes" : c}</button>
        ))}
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>{filtered.length} notes</span>
      </div>

      {/* Cork board surface — everything sits on it */}
      <div style={{
        ...CORK_BG, borderRadius: 12, padding: "26px 22px 22px",
        boxShadow:
          "inset 0 0 0 1px rgba(120,80,40,0.15)," +
          "inset 0 0 60px rgba(120,80,40,0.10)," +
          "0 1px 0 rgba(255,255,255,0.4)",
      }}>
        {/* Pinned strip */}
        {filtered.some((n) => n.pinned) && (
          <div style={{ marginBottom: 26 }}>
            <div style={{
              fontFamily: HAND_FONT, fontSize: 22, fontWeight: 700,
              color: "rgba(80,50,20,0.75)", marginBottom: 14,
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              📌 Pinned
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
              {filtered.filter((n) => n.pinned).map((n) => <Sticky key={n.id} note={n}/>)}
            </div>
          </div>
        )}

        <div style={{
          fontFamily: HAND_FONT, fontSize: 22, fontWeight: 700,
          color: "rgba(80,50,20,0.75)", marginBottom: 14,
        }}>
          Everything else
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {filtered.filter((n) => !n.pinned).map((n) => <Sticky key={n.id} note={n}/>)}
          {/* New-note placeholder — empty index card */}
          <button style={{
            minHeight: 148, borderRadius: 4, border: "2px dashed rgba(80,50,20,0.40)",
            background: "rgba(255,253,245,0.55)", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 6, color: "rgba(80,50,20,0.75)",
            transform: `rotate(${tiltFor("new-note", 1.5)}deg)`,
            boxShadow: "0 6px 12px -8px rgba(15,23,42,0.18)",
          }}>
            <I.Plus size={20} color="rgba(80,50,20,0.6)"/>
            <span style={{ fontFamily: HAND_FONT, fontSize: 18, fontWeight: 700 }}>jot something down</span>
          </button>
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   FILES — table (humanized header + manila feel for upload zone)
   ============================================================ */
function MyDeskFiles({ segments }) {
  return (
    <Page segments={segments} title="Files" emoji=""
      lede="Everything you've uploaded or your teachers handed you — sortable by class, source, or type."
      actions={
        <>
          <button className="btn btn-sm"><I.Filter size={12} color="var(--stone)"/> Filter</button>
          <button className="btn btn-sm"><I.Search size={12} color="var(--stone)"/> Search</button>
          <button className="btn btn-primary btn-sm"><I.Upload size={12} color="#fff"/> Upload</button>
        </>
      }
    >
      <DeskTabs segments={segments}/>

      {/* Source pills */}
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {[
          { id: "all", label: "All", count: DESK_FILES.length },
          { id: "you", label: "From you", count: DESK_FILES.filter((f) => f.from === "You").length },
          { id: "teacher", label: "From teachers", count: DESK_FILES.filter((f) => f.from !== "You").length },
          { id: "shared", label: "Shared", count: DESK_FILES.filter((f) => f.shared.length).length },
          { id: "starred", label: "Starred", count: 2 },
        ].map((c, i) => (
          <button key={c.id} style={{
            padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            border: i === 0 ? "1px solid var(--student)" : "1px solid var(--mist)",
            background: i === 0 ? "var(--student-soft)" : "var(--paper)",
            color: i === 0 ? "var(--student-deep)" : "var(--slate)",
            cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
          }}>{c.label} <span style={{ color: "var(--silver)", fontWeight: 500 }}>{c.count}</span></button>
        ))}
      </div>

      {/* Drop zone — manila in-tray */}
      <div style={{
        position: "relative",
        background: "linear-gradient(180deg, #F4DFA8 0%, #ECD18A 100%)",
        border: "1px dashed #B58A3A",
        borderRadius: 10,
        padding: "16px 18px 16px 50px",
        marginBottom: 22,
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.45)," +
          "0 10px 16px -12px rgba(15,23,42,0.18)",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        {/* Folder tab on the left */}
        <div aria-hidden="true" style={{
          position: "absolute", top: -8, left: 18,
          background: "#E9C77B", padding: "4px 12px 6px",
          fontSize: 9.5, fontWeight: 800, letterSpacing: "0.14em",
          color: "#5C4710", borderRadius: "6px 10px 0 0",
        }}>IN-TRAY</div>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: "rgba(255,253,245,0.85)",
          border: "1px solid rgba(122,90,15,0.28)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}><I.Upload size={18} color="#7A5A0F"/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: HAND_FONT, fontSize: 22, fontWeight: 700, color: "#3A2D08", lineHeight: 1, marginBottom: 4 }}>
            Drop files here, or click to browse
          </div>
          <div style={{ fontSize: 11.5, color: "rgba(58,45,8,0.7)" }}>Up to 50 MB · PDF, DOCX, XLSX, PNG, JPG, MP3</div>
        </div>
        <button className="btn btn-sm">Browse</button>
      </div>

      {/* Table — kept clinical (it's a working list) but with friendlier file icons */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr 0.6fr 0.9fr 36px",
          padding: "12px 16px", background: "var(--surface-quiet)",
          borderBottom: "1px solid var(--mist)",
          fontSize: 10.5, fontWeight: 700, color: "var(--stone)", letterSpacing: "0.06em",
          gap: 12,
        }}>
          <div>NAME</div><div>CLASS</div><div>SOURCE</div><div>SIZE</div><div>UPDATED</div><div></div>
        </div>
        {DESK_FILES.map((f, i) => (
          <div key={f.name} style={{
            display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr 0.6fr 0.9fr 36px",
            padding: "14px 16px", alignItems: "center", gap: 12,
            borderTop: i ? "1px solid var(--mist)" : "none",
            cursor: "pointer",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
              <FileIcon kind={f.kind}/>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                {f.shared.length > 0 && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--stone)", marginTop: 2 }}>
                    <I.Share size={9} color="var(--silver)"/>
                    Shared with {f.shared.join(", ")}
                  </div>
                )}
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--slate)" }}>{f.course}</div>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>{f.from}</div>
            <div style={{ fontSize: 12, color: "var(--stone)", fontVariantNumeric: "tabular-nums" }}>{f.size}</div>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>{f.updated}</div>
            <I.MoreH size={14} color="var(--silver)"/>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ============================================================
   BOOKMARKS — taped scraps, clipped slips
   ============================================================ */
function MyDeskBookmarks({ segments }) {
  const groups = DESK_BOOKMARKS.reduce((acc, b) => {
    (acc[b.tag] = acc[b.tag] || []).push(b);
    return acc;
  }, {});

  return (
    <Page segments={segments} title="Bookmarks" emoji=""
      lede="Links worth keeping. Grouped by class so you can find that one Khan video again."
      actions={
        <>
          <button className="btn btn-sm"><I.Search size={12} color="var(--stone)"/> Search</button>
          <button className="btn btn-primary btn-sm"><I.Plus size={12} color="#fff"/> Add bookmark</button>
        </>
      }
    >
      <DeskTabs segments={segments}/>

      {/* Add-link strip */}
      <div className="card" style={{ padding: 14, marginBottom: 22, display: "flex", alignItems: "center", gap: 10 }}>
        <I.Link size={14} color="var(--silver)"/>
        <input placeholder="Paste a link — we'll grab the title and guess which class it belongs to"
          style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontSize: 13, color: "var(--ink)",
          }}/>
        <span className="t-eyebrow" style={{ fontSize: 9.5, color: "var(--silver)" }}>⌘K from anywhere</span>
        <button className="btn btn-sm"><I.Plus size={12} color="var(--stone)"/> Save</button>
      </div>

      {Object.entries(groups).map(([tag, items], gi) => (
        <div key={tag} style={{ marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 14 }}>
            <div style={{
              fontFamily: HAND_FONT, fontSize: 24, fontWeight: 700,
              color: "var(--ink)", letterSpacing: "-0.005em",
            }}>{tag}</div>
            <div style={{ fontSize: 11.5, color: "var(--silver)" }}>· {items.length} {items.length === 1 ? "link" : "links"}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, paddingTop: 8 }}>
            {items.map((b, i) => {
              const tilt = tiltFor(b.title + tag, 1.8);
              const tapeColors = ["lavender", "mint", "peach", "butter", "sky"];
              const tape = tapeColors[(gi + i) % tapeColors.length];
              return (
                <a key={b.title} href="#" style={{
                  textDecoration: "none", display: "block", position: "relative",
                  transform: `rotate(${tilt}deg)`,
                }}>
                  {i % 3 === 0 && <Tape color={tape} rotate={-7} width={70} top={-10} left={"22%"}/>}
                  {i % 3 === 1 && (
                    <Paperclip size={26} color="#9CA3AF" style={{
                      position: "absolute", top: -10, right: 14, zIndex: 4,
                      transform: "rotate(8deg)",
                      filter: "drop-shadow(0 2px 2px rgba(15,23,42,0.18))",
                    }}/>
                  )}
                  {i % 3 === 2 && <Pin top={-8} left={"50%"} color="var(--pin-amber)"/>}
                  <div style={{
                    background: "var(--paper-warm)",
                    border: "1px solid var(--paper-warm-edge)",
                    borderBottom: "2px solid var(--paper-warm-shade)",
                    borderRadius: 4,
                    padding: 16,
                    minHeight: 130,
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.6) inset," +
                      "0 12px 18px -12px rgba(15,23,42,0.18)",
                    display: "flex", flexDirection: "column", gap: 10,
                  }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div style={{
                        width: 38, height: 38, borderRadius: 8,
                        background: b.color + "1F",
                        border: `1px solid ${b.color}3A`,
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, fontSize: 19,
                      }}>{b.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--paper-warm-ink)", lineHeight: 1.3 }}>{b.title}</div>
                        <div style={{ fontSize: 11.5, color: "rgba(58,51,40,0.6)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.url}</div>
                      </div>
                      <I.External size={12} color="rgba(58,51,40,0.4)"/>
                    </div>
                    <div style={{
                      marginTop: "auto",
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      paddingTop: 10,
                      borderTop: "1px dashed rgba(58,51,40,0.18)",
                    }}>
                      <span style={{
                        fontFamily: SCRIPT_FONT, fontSize: 13, fontWeight: 700,
                        color: b.color,
                      }}>{b.tag}</span>
                      <span style={{ fontSize: 11, color: "rgba(58,51,40,0.5)" }}>Saved {b.saved}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      ))}
    </Page>
  );
}

/* ============================================================
   Route handler — wired into app.jsx
   ============================================================ */
window["renderRoute_my-desk"] = ({ segments, navigate }) => {
  const sub = segments[1] || "overview";
  if (sub === "overview")  return <MyDeskOverview segments={segments}/>;
  if (sub === "my-menu")   return <MyDeskMenu segments={segments}/>;
  if (sub === "notes")     return <MyDeskNotes segments={segments}/>;
  if (sub === "files")     return <MyDeskFiles segments={segments}/>;
  if (sub === "bookmarks") return <MyDeskBookmarks segments={segments}/>;
  if (sub === "my-tools")  return <MyToolsPage segments={segments}/>;
  return <StubRoute segments={segments}/>;
};

window.MyDeskOverview = MyDeskOverview;
window.MyDeskMenu = MyDeskMenu;
window.MyDeskNotes = MyDeskNotes;
window.MyDeskFiles = MyDeskFiles;
window.MyDeskBookmarks = MyDeskBookmarks;

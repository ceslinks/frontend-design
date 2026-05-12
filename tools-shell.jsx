// LINKS — My Tools · shell + registry for the 12 tool surfaces
//
// The My Tools workspace (pages-mockups.jsx → MyToolsPage) lists 12 tools
// across 4 categories per the Master Component Grid:
//
//   Create:   Writing, Notes, Presentation
//   Think:    Calculator, Graphing, Drawing
//   Produce:  Video Editing, Audio Editing, Audio Recorder
//   Organize: File Manager, Sticky Notes, Mind Map
//
// Each tool is a real working surface — opens at #/my-tools/<id>.
// Per Correction 03 in the brief, AI is a *scaffold* in every tool: it
// asks questions, surfaces gaps, cites materials — it never produces
// student work. That posture shows up in the AI side panel of every tool.

const TOOLS = [
  // CREATE
  { id: "writing",       name: "Writing",        cat: "Create",   color: "#A855F7", desc: "Docs, essays, and reports",       icon: "Edit" },
  { id: "notes",         name: "Notes",          cat: "Create",   color: "#A855F7", desc: "Take notes and organize ideas",   icon: "Notes" },
  { id: "presentation",  name: "Presentation",   cat: "Create",   color: "#A855F7", desc: "Slideshows and presentations",    icon: "Image" },
  // THINK
  { id: "calculator",    name: "Calculator",     cat: "Think",    color: "#22C55E", desc: "Advanced math calculations",      icon: "Calculator2" },
  { id: "graphing",      name: "Graphing",       cat: "Think",    color: "#22C55E", desc: "Plot equations and data",         icon: "ChartBar" },
  { id: "drawing",       name: "Drawing",        cat: "Think",    color: "#22C55E", desc: "Diagrams and sketching",          icon: "Edit" },
  // PRODUCE
  { id: "video",         name: "Video Editing",  cat: "Produce",  color: "#EF4444", desc: "Edit and create videos",          icon: "Video" },
  { id: "audio-edit",    name: "Audio Editing",  cat: "Produce",  color: "#EF4444", desc: "Record and edit audio",           icon: "Speaker" },
  { id: "audio-record",  name: "Audio Recorder", cat: "Produce",  color: "#EF4444", desc: "Quick audio recordings",          icon: "Mic" },
  // ORGANIZE
  { id: "files",         name: "File Manager",   cat: "Organize", color: "#3B82F6", desc: "Browse and manage your files",    icon: "Folder" },
  { id: "sticky",        name: "Sticky Notes",   cat: "Organize", color: "#3B82F6", desc: "Quick notes anywhere",            icon: "Notes" },
  { id: "mindmap",       name: "Mind Map",       cat: "Organize", color: "#3B82F6", desc: "Visualize ideas and connections", icon: "Atom" },
];

const TOOL_BY_ID = Object.fromEntries(TOOLS.map((t) => [t.id, t]));

/* ============================================================
   ToolShell — wraps every tool surface
   - Tool-specific header with title, category chip, save state, share
   - Optional left rail (sources / files / outline)
   - Main canvas (the tool itself)
   - Optional right rail — AI Coach (scaffold mode)
   - Footer status bar
   - Always emits an "AI as scaffold" reminder
   ============================================================ */
function ToolShell({
  toolId,
  docTitle = "Untitled",
  saveState = "Saved · just now",
  headerExtras,
  toolbar,
  leftRail,
  rightRail,
  bottomBar,
  children,
  contentBg = "var(--paper)",
}) {
  const tool = TOOL_BY_ID[toolId] || { name: "Tool", color: "var(--student)", cat: "—" };
  const Icon = window.I[tool.icon] || window.I.Tools;

  return (
    <div className="fade-in" style={{ padding: "8px 32px 40px", maxWidth: 1500, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--stone)", marginBottom: 10 }}>
        <a href="#/home" style={{ color: "var(--stone)", textDecoration: "none" }}>Home</a>
        <I.ChevronRight size={11} color="var(--silver)"/>
        <a href="#/my-tools" style={{ color: "var(--stone)", textDecoration: "none" }}>My Tools</a>
        <I.ChevronRight size={11} color="var(--silver)"/>
        <span style={{ color: "var(--ink)", fontWeight: 600 }}>{tool.name}</span>
      </div>

      {/* Tool header card */}
      <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderBottom: "1px solid var(--mist)" }}>
          <div style={{
            width: 38, height: 38, borderRadius: 8,
            background: tool.color + "1A", color: tool.color,
            display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <Icon size={18} color={tool.color}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                defaultValue={docTitle}
                style={{
                  border: "none", outline: "none", padding: 0, background: "transparent",
                  fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)",
                  letterSpacing: "-0.01em", flex: 1, minWidth: 0,
                }}
              />
              <span className="pill pill-purple" style={{ fontSize: 10 }}>{tool.cat}</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2, display: "flex", alignItems: "center", gap: 8 }}>
              <I.Check size={11} color="#15803D"/> {saveState}
              <span style={{ color: "var(--silver)" }}>·</span>
              <span>Auto-saves to <a href="#/my-desk/files" style={{ color: "var(--stone)" }}>My Desk → Files</a></span>
            </div>
          </div>
          {headerExtras}
          <button className="btn btn-sm"><I.External size={12} color="var(--stone)"/> Share</button>
          <button className="btn btn-sm"><I.MoreH size={12} color="var(--stone)"/></button>
        </div>

        {/* Optional toolbar strip */}
        {toolbar && (
          <div style={{ padding: "8px 14px", borderBottom: "1px solid var(--mist)", background: "var(--surface-quiet)", display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
            {toolbar}
          </div>
        )}
      </div>

      {/* Main 3-column workspace */}
      <div style={{
        display: "grid",
        gridTemplateColumns: `${leftRail ? "240px " : ""}minmax(0,1fr)${rightRail ? " 320px" : ""}`,
        gap: 16, alignItems: "start",
      }}>
        {leftRail && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{leftRail}</div>
        )}

        <div className="card" style={{ padding: 0, background: contentBg, minHeight: 540, overflow: "hidden", position: "relative" }}>
          {children}
        </div>

        {rightRail && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>{rightRail}</div>
        )}
      </div>

      {/* Bottom status / footer bar */}
      <div className="card" style={{ padding: "10px 14px", marginTop: 12, display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, color: "var(--stone)" }}>
        <I.Sparkle size={12} color="var(--student)"/>
        <span>
          <strong style={{ color: "var(--ink)" }}>LINKS AI is in scaffold mode.</strong>{" "}
          It asks questions, surfaces gaps, and cites your sources — it doesn't produce work for you.
        </span>
        <span style={{ flex: 1 }}/>
        {bottomBar}
      </div>
    </div>
  );
}

/* ============================================================
   AI Coach side-rail — used by every tool
   "Scaffold mode": prompts that probe rather than produce.
   ============================================================ */
function AICoachRail({ context = "this work", suggestions, cites }) {
  const defaults = [
    { q: "What's the strongest argument so far?", t: "Self-check" },
    { q: "Where would a skeptical reader push back?", t: "Probe" },
    { q: "Which source haven't you used yet?",       t: "Sources" },
  ];
  const items = suggestions || defaults;
  return (
    <div className="card" style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <I.Sparkle size={13} color="var(--student)"/>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Coach</div>
        <span style={{ fontSize: 9, fontWeight: 700, color: "var(--student-deep)", background: "var(--student-soft)", padding: "1px 5px", borderRadius: 3, marginLeft: "auto", letterSpacing: "0.06em" }}>SCAFFOLD</span>
      </div>
      <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 12, lineHeight: 1.45 }}>
        Working on <span style={{ color: "var(--ink)", fontWeight: 600 }}>{context}</span>. I ask questions — you do the thinking.
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((s, i) => (
          <button key={i} style={{
            textAlign: "left", padding: "10px 12px",
            background: "var(--student-soft)", border: "1px solid var(--student-200)",
            borderRadius: 8, cursor: "pointer", color: "var(--ink)",
            fontSize: 12.5, lineHeight: 1.4,
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "var(--student-deep)", letterSpacing: "0.06em", marginBottom: 4 }}>{s.t}</div>
            {s.q}
          </button>
        ))}
      </div>
      {cites && cites.length > 0 && (
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--mist)" }}>
          <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>CITED FROM YOUR WORK</div>
          {cites.map((c, i) => (
            <a key={i} href="#" style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", textDecoration: "none", color: "var(--stone)", fontSize: 11.5 }}>
              <I.Document size={11} color="var(--silver)"/>
              <span style={{ color: "var(--slate)" }}>{c}</span>
            </a>
          ))}
        </div>
      )}
      <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
        <input placeholder="Ask the coach…" style={{
          flex: 1, border: "1px solid var(--mist)", borderRadius: 8,
          padding: "7px 10px", fontSize: 12, fontFamily: "var(--font-ui)", background: "var(--paper)",
        }}/>
        <button className="btn-icon" aria-label="Send"><I.Send size={13} color="var(--student)"/></button>
      </div>
    </div>
  );
}

/* Tiny shared bits */
function ToolBtn({ icon, label, active, onClick, color }) {
  const Ic = typeof icon === "string" ? I[icon] : icon;
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "6px 10px", borderRadius: 6,
      border: active ? "1px solid var(--student-200)" : "1px solid transparent",
      background: active ? "var(--student-soft)" : "transparent",
      color: active ? "var(--student-deep)" : "var(--slate)",
      cursor: "pointer", fontSize: 12, fontWeight: 600,
    }}>
      {Ic && <Ic size={13} color={active ? "var(--student-deep)" : color || "var(--stone)"}/>}
      {label}
    </button>
  );
}

function ToolDivider() {
  return <div style={{ width: 1, height: 18, background: "var(--mist)", margin: "0 4px" }}/>;
}

function ToolUnknown({ id }) {
  return (
    <ToolShell toolId="files" docTitle={id}>
      <div style={{ padding: 60, textAlign: "center" }}>
        <div className="t-h2" style={{ marginBottom: 8 }}>Tool not found</div>
        <div style={{ color: "var(--stone)" }}>No tool registered for <code>{id}</code>. <a href="#/my-tools">Back to My Tools</a></div>
      </div>
    </ToolShell>
  );
}

window.TOOLS = TOOLS;
window.TOOL_BY_ID = TOOL_BY_ID;
window.ToolShell = ToolShell;
window.AICoachRail = AICoachRail;
window.ToolBtn = ToolBtn;
window.ToolDivider = ToolDivider;
window.ToolUnknown = ToolUnknown;

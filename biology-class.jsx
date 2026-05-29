// LINKS — Biology Period 3 class page
// Activates inside <ClassDetail> when classId === "biology".
// Sections: header · today's class flow · chat · schedule · tools · documents · lab/people

const BiologyCourse = {
  id: "biology",
  name: "Biology",
  teacher: "Mr. Evans",
  period: "Period 3",
  room: "Room 302",
  color: "#10B981",
  abbr: "🧬",
  unit: "Unit 4 · Cells & Energy",
  todayLesson: "Cellular Respiration — Lab Day",
  bell: "10:20 AM — 11:05 AM",
  progress: 82,
};
window.BiologyCourse = BiologyCourse;

/* ─────────── Page wrapper ─────────── */
function BiologyClassPage({ c }) {
  const course = BiologyCourse;
  const [tab, setTab] = React.useState("today"); // today · chat · documents · tools · grades

  return (
    <div className="bio-page" style={{
      display: "flex", flexDirection: "column", gap: 14,
      padding: "20px 24px", minWidth: 0,
    }}>
      <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 0", fontSize: 13 }}>
        <a href="#/my-classes" style={{ color: "var(--stone)", textDecoration: "none", fontWeight: 500 }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--stone)"}
        >My Classes</a>
        <span style={{ color: "var(--silver)", userSelect: "none" }}>›</span>
        <span style={{ color: "var(--ink)", fontWeight: 500 }}>{c.name}</span>
      </nav>

      <BioHeader c={c} course={course}/>

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--bone)", borderRadius: 10, alignSelf: "flex-start", flexWrap: "wrap" }}>
        {[
          { id: "today",      label: "Today's Class",     icon: "Sparkle"       },
          { id: "curriculum", label: "Curriculum",        icon: "Folder"        },
          { id: "virtual",    label: "Virtual Classroom", icon: "Video"         },
          { id: "work",       label: "Work",              icon: "Document"      },
          { id: "tools",      label: "Tools",             icon: "Tools"         },
          { id: "grades",     label: "Support & Growth",  icon: "Trophy"        },
          { id: "comms",      label: "Communication",     icon: "MessageSquare" },
          { id: "maps",       label: "Maps & Spaces",     icon: "MapPin"        },
        ].map((t) => {
          const Icon = I[t.icon];
          const active = t.id === tab;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "6px 12px",
              background: active ? "var(--paper)" : "transparent",
              border: "none", borderRadius: 8,
              fontSize: 12.5, fontWeight: active ? 600 : 500,
              color: active ? course.color : "var(--stone)",
              cursor: "pointer",
              boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
            }}>
              <Icon size={13} color={active ? course.color : "var(--stone)"}/> {t.label}
            </button>
          );
        })}
      </div>

      {tab === "today"      && <BioTodayView course={course} onSwitchTab={setTab}/>}
      {tab === "curriculum" && <BioCurriculumView course={course} onSwitchTab={setTab}/>}
      {tab === "virtual"    && <BioVirtualClassroomView course={course}/>}
      {tab === "work"       && <BioWorkView course={course}/>}
      {tab === "tools"      && <BioToolsView course={course}/>}
      {tab === "grades"     && <BioSupportGrowthView course={course}/>}
      {tab === "comms"      && <BioCommunicationView course={course} onSwitchTab={setTab}/>}
      {tab === "maps"       && <BioMapsSpacesView course={course}/>}
    </div>
  );
}

/* ─────────── Virtual Classroom ─────────── */
function BioVirtualClassroomView({ course }) {
  const [active, setActive] = React.useState(false);
  const [notified, setNotified] = React.useState(false);
  const [camOn, setCamOn] = React.useState(true);
  const [micOn, setMicOn] = React.useState(true);
  const [elapsed, setElapsed] = React.useState(872);

  React.useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active]);

  const fmtTime = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  if (!active) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 24px" }}>
        <div style={{
          position: "relative",
          width: "100%", maxWidth: 520,
          background: "var(--paper)", border: "1px solid var(--mist)",
          borderRadius: 16, padding: "36px 32px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
          textAlign: "center",
        }}>
          {/* Preview toggle — top-right of card */}
          <button onClick={() => setActive(true)} style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: "1.5px solid var(--student)",
            borderRadius: 7, padding: "5px 12px",
            fontSize: 13, fontWeight: 600, color: "var(--student)", cursor: "pointer",
          }}>Preview active state →</button>

          <div style={{
            width: "100%", height: 140,
            border: "2px dashed var(--mist)", borderRadius: 12,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            background: "var(--bone)",
          }}>
            <I.Video size={28} color="var(--silver)"/>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--silver)", letterSpacing: "0.02em" }}>Room 302 — Virtual Space</span>
          </div>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
            padding: "3px 10px", borderRadius: 999,
            background: "var(--bone)", color: "var(--stone)", border: "1px solid var(--mist)",
          }}>Not currently active</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>
              Virtual classroom is not currently active
            </div>
            <div style={{ fontSize: 13, color: "var(--stone)", lineHeight: 1.6, maxWidth: 420 }}>
              Your teacher will notify you when the virtual classroom is enabled. When active, you'll join directly from this tab — no external links needed.
            </div>
          </div>
          {notified ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#10B981" }}>
              <I.CheckCircle size={15} color="#10B981"/> You'll be notified when this room goes live
            </div>
          ) : (
            <button onClick={() => setNotified(true)} style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "9px 18px", borderRadius: 999,
              background: "var(--bone)", border: "1px solid var(--mist)",
              fontSize: 13, fontWeight: 600, color: "var(--slate)", cursor: "pointer",
            }}>
              <I.Bell size={14} color="var(--slate)"/> Notify me when enabled
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── Active state ── */
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "0 -24px -20px" }}>
      <style>{`@keyframes vcPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}`}</style>

      {/* Status bar — Live info + meeting controls + student count + exit */}
      <div style={{
        height: 48, display: "flex", alignItems: "center",
        padding: "0 20px", gap: 10,
        background: "var(--bone)",
        borderLeft: "3px solid #10B981",
        borderBottom: "1px solid var(--mist)",
        flexShrink: 0,
      }}>
        {/* Live indicator + session info */}
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#10B981", flexShrink: 0, display: "inline-block", animation: "vcPulse 1.6s ease-in-out infinite" }}/>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Live</span>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>Biology · Period 3 · Mr. Evans</span>
        <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "var(--ink)", marginLeft: 4 }}>{fmtTime(elapsed)}</span>

        {/* Meeting controls */}
        <div style={{ display: "flex", gap: 2, marginLeft: 10 }}>
          <VCIconBtn icon={camOn ? "Camera" : "CameraOff"} label="Camera" active={camOn} onClick={() => setCamOn((v) => !v)}/>
          <VCIconBtn icon={micOn ? "Mic" : "MicOff"}      label="Mic"    active={micOn} onClick={() => setMicOn((v) => !v)}/>
          <VCIconBtn icon="Hand"     label="Raise Hand"/>
          <VCIconBtn icon="Share"    label="Share Screen"/>
          <VCIconBtn icon="PhoneOff" label="Leave" color="#EF4444"/>
        </div>

        {/* Student count + exit */}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--stone)" }}>24 students present</span>
        <button onClick={() => setActive(false)} style={{
          background: "none", border: "1.5px solid var(--student)",
          borderRadius: 7, padding: "4px 11px",
          fontSize: 13, fontWeight: 600, color: "var(--student)", cursor: "pointer", marginLeft: 8,
        }}>← Exit preview</button>
      </div>

      {/* Main two-column area */}
      <div style={{ display: "flex", flex: 1, minHeight: 560 }}>
        {/* Left — video grid + room map */}
        <div style={{ flex: 1, minWidth: 0, padding: "20px 20px 24px", overflowY: "auto", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 20 }}>
          <BioVideoGrid course={course}/>
          <div>
            <div style={{ fontSize: 13, color: "var(--stone)", fontWeight: 600, marginBottom: 12 }}>Virtual Room 302</div>
            <BioVirtualRoomMap course={course}/>
          </div>
        </div>
        {/* Right — chat sidebar */}
        <div style={{ width: 380, flexShrink: 0, display: "flex", flexDirection: "column", borderLeft: "1px solid var(--mist)" }}>
          <BioChatPanelWide course={course}/>
        </div>
      </div>
    </div>
  );
}

function VCIconBtn({ icon, label, active, onClick, color }) {
  const Icon = I[icon];
  const col = color || (active === false ? "var(--silver)" : "var(--slate)");
  const bg  = active === false ? "var(--mist)" : "transparent";
  return (
    <button onClick={onClick} title={label} style={{
      width: 32, height: 32, borderRadius: 6,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: bg, border: "none", cursor: "pointer",
    }}>
      <Icon size={15} color={col}/>
    </button>
  );
}

function BioVideoGrid({ course }) {
  const color = course.color;
  const tiles = [
    { name: "Mr. Evans",      init: "ME", bg: "#475569",  teacher: true },
    { name: "Maya P.",        init: "MP", hue: 30 },
    { name: "Jordan T.",      init: "JT", hue: 280 },
    { name: "Alex Johnson",   init: "AJ", you: true },
    { name: "Aisha B.",       camOff: true },
    { name: "Noah B.",        camOff: true },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: "var(--stone)", fontWeight: 600 }}>Live Video — 24 participants</span>
        <a href="#" style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "var(--student)", textDecoration: "none" }}>View all →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {tiles.map((t, i) => {
          const avatarBg = t.bg || (t.you ? color : `hsl(${t.hue}, 60%, 55%)`);
          return (
            <div key={i} style={{
              height: 140, borderRadius: 8,
              background: t.camOff ? "var(--bone)" : "var(--bone)",
              border: `1.5px solid ${t.you ? color : "var(--mist)"}`,
              position: "relative",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
              overflow: "hidden",
            }}>
              {t.camOff ? (
                <>
                  <I.CameraOff size={22} color="var(--silver)"/>
                  <span style={{ fontSize: 11, color: "var(--stone)" }}>Camera off</span>
                  <span style={{ position: "absolute", bottom: 7, left: 8, fontSize: 11, color: "var(--stone)", fontWeight: 500 }}>{t.name}</span>
                </>
              ) : (
                <>
                  <div style={{
                    width: 40, height: 40, borderRadius: 999,
                    background: avatarBg,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, fontWeight: 700, color: "#fff",
                    border: t.you ? `2.5px solid ${color}` : "none",
                    flexShrink: 0,
                  }}>{t.init}</div>
                  <span style={{ fontSize: 12, color: "var(--slate)", fontWeight: 500 }}>
                    {t.name}
                    {t.teacher && <span style={{ marginLeft: 5, fontSize: 9, fontWeight: 700, background: "#47556920", color: "#475569", padding: "1px 4px", borderRadius: 3 }}>TEACHER</span>}
                    {t.you && <span style={{ marginLeft: 5, fontSize: 9, fontWeight: 700, background: `${color}20`, color: color, padding: "1px 4px", borderRadius: 3 }}>YOU</span>}
                  </span>
                  {/* Mic on indicator */}
                  <div style={{ position: "absolute", bottom: 7, right: 8 }}>
                    <I.Mic size={12} color="#10B981"/>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BioVirtualRoomMap({ course }) {
  const color = course.color; // #10B981

  const benches = [
    { n: 1, x: 50,  y: 102, sprites: [{ cx: 84,  fill: "#C026D3" }, { cx: 112, fill: "#84CC16" }] },
    { n: 2, x: 265, y: 102, sprites: [{ cx: 305, fill: "#22C55E" }] },
    { n: 3, x: 480, y: 102, sprites: [{ cx: 520, fill: "#EF4444" }] },
    { n: 4, x: 50,  y: 212, highlight: true, sprites: [
      { cx: 78,  fill: color,     you: true },
      { cx: 106, fill: "#F97316" },
      { cx: 134, fill: "#7C3AED" },
    ]},
    { n: 5, x: 265, y: 212, sprites: [{ cx: 305, fill: "#0EA5E9" }] },
    { n: 6, x: 480, y: 212, sprites: [{ cx: 520, fill: "#EC4899" }] },
  ];

  return (
    <div style={{ background: "var(--bone)", borderRadius: 12, border: "1px solid var(--mist)", overflow: "hidden", lineHeight: 0 }}>
      <svg width="100%" viewBox="0 0 660 380" style={{ display: "block" }} aria-label="Virtual Room 302 map">
        <defs>
          {/* Soft two-tone floor — nearly the same shade */}
          <pattern id="vcFloor" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#F8FAFC"/>
            <rect x="16" width="16" height="16" fill="#F1F5F9"/>
            <rect y="16" width="16" height="16" fill="#F1F5F9"/>
            <rect x="16" y="16" width="16" height="16" fill="#F8FAFC"/>
          </pattern>
        </defs>

        {/* ── Floor ── */}
        <rect x="3" y="3" width="654" height="374" fill="url(#vcFloor)"/>

        {/* ── Walls (#334155) ── */}
        <rect x="0" y="0"   width="660" height="3"   fill="#334155"/>
        <rect x="0" y="377" width="660" height="3"   fill="#334155"/>
        <rect x="657" y="0" width="3"   height="380" fill="#334155"/>
        <rect x="0" y="0"   width="3" height="258" fill="#334155"/>
        <rect x="0" y="306" width="3" height="74"  fill="#334155"/>

        {/* ── Wall inset shadow stripes (4px, #475569) ── */}
        <rect x="3" y="3"   width="654" height="4" fill="#475569" opacity="0.18"/>
        <rect x="3" y="373" width="654" height="4" fill="#475569" opacity="0.18"/>
        <rect x="653" y="3" width="4" height="374" fill="#475569" opacity="0.18"/>
        <rect x="3" y="3"   width="4" height="255" fill="#475569" opacity="0.18"/>
        <rect x="3" y="306" width="4" height="71"  fill="#475569" opacity="0.18"/>

        {/* ── Door ── */}
        <rect x="0" y="254" width="10" height="5" rx="1" fill="#475569"/>
        <rect x="0" y="302" width="10" height="5" rx="1" fill="#475569"/>
        <text x="14" y="287" fontSize="8" fill="#64748B" fontFamily="monospace">door</text>

        {/* ── Bookshelf — back wall, left of whiteboard (3-row pixel art) ── */}
        <rect x="10" y="5" width="155" height="46" rx="2" fill="#78716C" opacity="0.9"/>
        {/* Shelf dividers */}
        <rect x="10" y="20" width="155" height="2" fill="#57534E"/>
        <rect x="10" y="34" width="155" height="2" fill="#57534E"/>
        {/* Row 1 */}
        {[
          { x: 12, c: "#94A3B8" }, { x: 20, c: "#FCA5A5" }, { x: 28, c: "#86EFAC" },
          { x: 36, c: "#A8A29E" }, { x: 44, c: "#C4B5FD" }, { x: 52, c: "#94A3B8" },
        ].map((bk, i) => <rect key={"bs1"+i} x={bk.x} y="7"  width="6" height="11" rx="0.5" fill={bk.c}/>)}
        {/* Row 2 */}
        {[
          { x: 12, c: "#FCA5A5" }, { x: 19, c: "#C4B5FD" }, { x: 27, c: "#A8A29E" },
          { x: 35, c: "#86EFAC" }, { x: 43, c: "#FCA5A5" }, { x: 51, c: "#94A3B8" },
        ].map((bk, i) => <rect key={"bs2"+i} x={bk.x} y="22" width="6" height="10" rx="0.5" fill={bk.c}/>)}
        {/* Row 3 */}
        {[
          { x: 11, c: "#86EFAC" }, { x: 18, c: "#94A3B8" }, { x: 26, c: "#FCA5A5" },
          { x: 34, c: "#C4B5FD" }, { x: 42, c: "#A8A29E" }, { x: 50, c: "#86EFAC" },
        ].map((bk, i) => <rect key={"bs3"+i} x={bk.x} y="36" width="6" height="11" rx="0.5" fill={bk.c}/>)}

        {/* ── Whiteboard (top center, right of bookshelf) ── */}
        <rect x="185" y="5" width="290" height="30" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5"/>
        <line x1="200" y1="14" x2="462" y2="14" stroke="#E2E8F0" strokeWidth="1.5"/>
        <line x1="200" y1="20" x2="448" y2="20" stroke="#E2E8F0" strokeWidth="1.5"/>
        <line x1="200" y1="26" x2="435" y2="26" stroke="#E2E8F0" strokeWidth="1.5"/>
        <text x="330" y="24" fontSize="8" fill="#94A3B8" fontFamily="sans-serif" fontStyle="italic" textAnchor="middle">ATP Synthesis — Cellular Respiration</text>

        {/* ── Periodic table poster — back wall, right of whiteboard ── */}
        <rect x="481" y="5" width="140" height="30" rx="2" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="1"/>
        {/* Vertical grid lines */}
        {[494,508,522,536,550,564,578,592,606].map((lx, i) => (
          <line key={"ptv"+i} x1={lx} y1="5" x2={lx} y2="35" stroke="#CBD5E1" strokeWidth="0.5"/>
        ))}
        {/* Horizontal grid lines */}
        {[12,19,26].map((ly, i) => (
          <line key={"pth"+i} x1="481" y1={ly} x2="621" y2={ly} stroke="#CBD5E1" strokeWidth="0.5"/>
        ))}
        <text x="551" y="23" fontSize="7" fill="#94A3B8" fontFamily="sans-serif" textAnchor="middle">Periodic Table</text>

        {/* ── Teacher desk ── */}
        <rect x="215" y="44" width="230" height="48" rx="5" fill="#334155"/>
        <text x="288" y="63" fontSize="11" fontWeight="700" fill="#F8FAFC" fontFamily="sans-serif">Mr. Evans</text>
        <text x="288" y="78" fontSize="8" fill="#94A3B8" fontFamily="sans-serif">Biology · Room 302</text>
        <rect x="402" y="49" width="32" height="22" rx="2" fill="#1E293B"/>
        <rect x="404" y="51" width="28" height="16" fill="#0284C7" opacity="0.85"/>
        <line x1="406" y1="55" x2="430" y2="55" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.9"/>
        <line x1="406" y1="58" x2="428" y2="58" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.9"/>
        <line x1="406" y1="61" x2="425" y2="61" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.9"/>
        <rect x="416" y="72" width="4"   height="5"   fill="#1E293B"/>
        <rect x="411" y="76" width="14"  height="2.5" fill="#1E293B"/>

        {/* ── Student benches ── */}
        {benches.map((b) => {
          const baseline = b.y + 78;
          const benchFill   = b.highlight ? "#F0FDF4" : "#E2E8F0";
          const benchStroke = b.highlight ? color     : "#94A3B8";
          const strokeW     = b.highlight ? 2         : 1.5;
          return (
            <g key={b.n}>
              {/* Glow outline for bench 4 */}
              {b.highlight && (
                <rect x={b.x - 6} y={b.y - 6} width={142} height={92} rx={10}
                  fill="none" stroke={color} strokeWidth={2} opacity={0.65}/>
              )}
              {/* Bench body */}
              <rect x={b.x} y={b.y} width={130} height={80} rx={6}
                fill={benchFill} stroke={benchStroke} strokeWidth={strokeW}/>
              {/* White interior surface overlay */}
              <rect x={b.x + 4} y={b.y + 4} width={122} height={72} rx={4}
                fill="#FFFFFF" opacity={0.55}/>
              {/* Label */}
              <text x={b.x + 8} y={b.y + 16} fontSize="9" fontFamily="monospace"
                fontWeight="600" fill="#475569">Bench {b.n}</text>
              {/* Lab equipment (beakers) */}
              <rect x={b.x + 104} y={b.y + 7}  width={6} height={10} rx="1"
                fill="#DBEAFE" stroke="#94A3B8" strokeWidth="1"/>
              <rect x={b.x + 105} y={b.y + 5}  width={4} height={3}  rx="1"
                fill="#DBEAFE" stroke="#94A3B8" strokeWidth="1"/>
              <rect x={b.x + 113} y={b.y + 9}  width={5} height={8}  rx="1"
                fill="#BAE6FD" stroke="#94A3B8" strokeWidth="1"/>
              {/* Character sprites */}
              {b.sprites.map((s, si) => {
                const headY = baseline - 24;
                const bodyY = baseline - 15;
                return (
                  <g key={si}>
                    {/* YOU badge */}
                    {s.you && (
                      <>
                        <rect x={s.cx - 14} y={headY - 17} width={28} height={13} rx={3} fill={color}/>
                        <text x={s.cx} y={headY - 7} textAnchor="middle" fontSize="7"
                          fontWeight="700" fill="#fff" fontFamily="sans-serif">YOU</text>
                      </>
                    )}
                    {/* White outline (separation from bench bg) */}
                    <circle cx={s.cx} cy={headY} r={9.5} fill="#fff" opacity={0.9}/>
                    <rect x={s.cx - 9} y={bodyY - 1} width={18} height={14} rx={3} fill="#fff" opacity={0.9}/>
                    {/* Head */}
                    <circle cx={s.cx} cy={headY} r={8} fill={s.fill}/>
                    {/* Face highlight */}
                    <circle cx={s.cx - 2.5} cy={headY - 2.5} r={2.5} fill="#fff" opacity={0.28}/>
                    {/* Shirt / body */}
                    <rect x={s.cx - 8} y={bodyY} width={16} height={12} rx={2}
                      fill={s.fill} opacity={0.9}/>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* ── Safety equipment icon — right wall, above sink ── */}
        <rect x="636" y="190" width="22" height="22" rx="2" fill="#fff" stroke="#94A3B8" strokeWidth="1"/>
        {/* Red cross */}
        <rect x="639" y="199" width="16" height="4" fill="#EF4444"/>
        <rect x="645" y="193" width="4" height="16" fill="#EF4444"/>
        <text x="647" y="222" fontSize="7" fill="#64748B" fontFamily="sans-serif" textAnchor="middle">Safety</text>

        {/* ── Sink (right wall) ── */}
        <rect x="634" y="232" width="23" height="30" rx="3" fill="#0D9488"/>
        <rect x="639" y="237" width="13" height="20" rx="2" fill="#99F6E4"/>
        <circle cx="645.5" cy="238.5" r="2.5" fill="#0F766E"/>
        <text x="645" y="274" fontSize="8" fill="#334155"
          fontFamily="monospace" textAnchor="middle">sink</text>

        {/* ── Potted plant — bottom-left ── */}
        <rect x="13" y="337" width="18" height="18" rx="3" fill="#78350F" opacity="0.8"/>
        <ellipse cx="22" cy="334" rx="12" ry="9"  fill="#15803D"/>
        <ellipse cx="14" cy="328" rx="8"  ry="6"  fill="#16A34A"/>
        <ellipse cx="30" cy="329" rx="7"  ry="6"  fill="#22C55E"/>
        <ellipse cx="22" cy="323" rx="6"  ry="5"  fill="#4ADE80"/>

        {/* ── Potted plant — bottom-right ── */}
        <rect x="629" y="337" width="18" height="18" rx="3" fill="#78350F" opacity="0.8"/>
        <ellipse cx="638" cy="334" rx="12" ry="9"  fill="#15803D"/>
        <ellipse cx="630" cy="328" rx="8"  ry="6"  fill="#16A34A"/>
        <ellipse cx="646" cy="329" rx="7"  ry="6"  fill="#22C55E"/>
        <ellipse cx="638" cy="323" rx="6"  ry="5"  fill="#4ADE80"/>
      </svg>
    </div>
  );
}

/* ─────────── Wide Class Chat panel (only on Today tab, full-width below content) ─────────── */
function BioChatPanelWide({ course, onSwitchTab }) {
  return (
    <div style={{
      background: "var(--paper)", borderRadius: 14,
      boxShadow: "var(--shadow-card)",
      border: "1px solid var(--mist)",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      height: "100%",
      minHeight: 0,
    }}>
      <BioRightRail course={course} onSwitchTab={onSwitchTab}/>
    </div>
  );
}
window.BiologyClassPage = BiologyClassPage;

/* ─────────── Header ─────────── */
function BioHeader({ c, course }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${c.color}14, ${c.color}05)`,
      borderRadius: 16, padding: "14px 20px",
      border: `1px solid ${c.color}30`,
      display: "flex", alignItems: "center", gap: 16,
      flexWrap: "nowrap", overflow: "hidden",
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 13,
        background: c.color, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, flexShrink: 0,
      }}>{c.abbr}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "nowrap" }}>
          <h1 className="t-h1" style={{ fontSize: 22, margin: 0, whiteSpace: "nowrap" }}>{c.name}</h1>
          <span style={{ fontSize: 10.5, padding: "2px 8px", background: c.color, color: "#fff", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>IN PERSON · LAB</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.teacher} · {c.period} · {c.room} · <span style={{ color: c.color, fontWeight: 600, whiteSpace: "nowrap" }}>{course.bell.replace(/\s—\s/, "–")}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, paddingRight: 8, flexShrink: 0 }}>
        <BioStat label="Current Grade" value="86% · B" color={c.color}/>
        <BioStat label="Current Unit" value={course.unit.replace("Unit 4 · ", "")}/>
      </div>
    </div>
  );
}
function BioStat({ label, value, color, small }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: small ? 13 : 18, fontWeight: 700, color: color || "var(--ink)" }}>{value}</div>
    </div>
  );
}

/* ─────────── Today's Class view ─────────── */
function BioTodayView({ course, onSwitchTab }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", minWidth: 0 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        <BioPeriodSchedule course={course}/>
        <BioLessonAndMaterials course={course} onSwitchTab={onSwitchTab}/>
      </div>
      <div style={{ width: 380, flexShrink: 0, position: "sticky", top: 70, height: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
        <BioChatPanelWide course={course} onSwitchTab={onSwitchTab}/>
      </div>
    </div>
  );
}

function BioLessonHero({ course }) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>
        <span style={{ color: course.color, fontWeight: 600 }}>{course.unit}</span>
        <I.ChevronRight size={11} color="var(--stone)"/>
        <span>Lesson 4.3</span>
      </div>
      <h1 className="t-h1" style={{ fontSize: 24, margin: "0 0 4px" }}>{course.todayLesson}</h1>
      <div style={{ fontSize: 13, color: "var(--stone)" }}>
        Trace energy through glycolysis, the Krebs cycle, and the electron transport chain — then test it in lab.
      </div>

      <div style={{ display: "flex", gap: 18, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--mist)", flexWrap: "wrap" }}>
        <BioMini icon="Clock" color="#0EA5E9" label="Class period" value="45 min"/>
        <BioMini icon="Atom" color="#10B981" label="Lab partners" value="Maya & Jordan"/>
        <BioMini icon="MapPin" color="#F59E0B" label="Station" value="Bench 4 — Sink"/>
        <BioMini icon="Trophy" color="#8B5CF6" label="Lab points" value="20 pts"/>
      </div>

      <div style={{
        marginTop: 14,
        display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
        background: `${course.color}0F`,
        border: `1px solid ${course.color}40`,
        borderRadius: 10,
        padding: "10px 14px",
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: `${course.color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Bell size={16} color={course.color}/>
        </div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Bring lab reports + safety goggles today</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)" }}>From Mr. Evans, posted 1 hour ago</div>
        </div>
        <button className="btn btn-secondary btn-sm">Mark read</button>
      </div>
    </div>
  );
}

function BioMini({ icon, color, label, value }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={14} color={color}/>
      </div>
      <div>
        <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{value}</div>
      </div>
    </div>
  );
}

/* ─────────── Period schedule (timeline of the 45-min class) ─────────── */
function BioPeriodSchedule({ course }) {
  const segments = [
    { at: "10:20", len: 5,  title: "Bell ringer & attendance", body: "Quick warm-up: 1 question on yesterday's reading.", icon: "Bell", color: "#94A3B8", state: "done", flags: [] },
    { at: "10:25", len: 10, title: "Mini-lecture: ATP recap",  body: "Mr. Evans walks through the energy currency of the cell.", icon: "Book", color: "#0EA5E9", state: "active", flags: [
      { bg: "#EDE9FE", border: "#7C3AED", text: "#5B21B6", label: "AI TUTOR SUGGESTS", msg: "Missed 2 ATP questions — review 5 min?" },
    ]},
    { at: "10:35", len: 20, title: "Lab: Yeast respiration",   body: "Measure CO₂ output at three sugar concentrations.", icon: "Atom", color: "#10B981", state: "upcoming", flags: [
      { bg: "#D1FAE5", border: "#10B981", text: "#065F46", label: "DO NOW", msg: "Open lab handout & put on goggles" },
      { bg: "#DBEAFE", border: "#3B82F6", text: "#1E40AF", label: "JUST POSTED", msg: "Krebs Cycle Diagram — annotate before Friday" },
    ]},
    { at: "10:55", len: 8,  title: "Data share-out",            body: "Add your data to the shared class spreadsheet.", icon: "ChartBar", color: "#8B5CF6", state: "upcoming", flags: [] },
    { at: "11:03", len: 2,  title: "Exit ticket",                body: "1 thing learned, 1 question you still have.", icon: "Edit", color: "#F59E0B", state: "upcoming", flags: [] },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Today's Class Schedule</h2>
        <span style={{ fontSize: 11, color: "var(--stone)" }}>{course.bell} · 45 min</span>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 14 }}>You're <b style={{ color: course.color }}>10 minutes in</b>. Mini-lecture happening now.</div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: 26 }}>
        {/* spine */}
        <div style={{ position: "absolute", left: 9, top: 6, bottom: 6, width: 2, background: "var(--mist)" }}/>
        {segments.map((s, i) => (
          <div key={i} style={{ position: "relative", paddingBottom: i === segments.length - 1 ? 0 : 12, marginLeft: -26, paddingLeft: 26 }}>
            <div style={{
              position: "absolute", left: 4, top: 4,
              width: 12, height: 12, borderRadius: "50%",
              background: s.state === "done" ? "var(--silver)" : s.state === "active" ? course.color : "var(--paper)",
              border: `2px solid ${s.state === "active" ? course.color : "var(--mist)"}`,
              boxShadow: s.state === "active" ? `0 0 0 4px ${course.color}25` : "none",
            }}/>
            <div style={{
              display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 12, alignItems: "center",
              background: s.state === "active" ? `${course.color}0D` : "transparent",
              border: `1px solid ${s.state === "active" ? course.color + "30" : "transparent"}`,
              borderRadius: 10,
              padding: "8px 12px",
              opacity: s.state === "done" ? 0.6 : 1,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: s.state === "active" ? course.color : "var(--stone)" }}>
                {s.at}
                <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 500 }}>{s.len} min</div>
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6 }}>
                  {s.title}
                  {s.state === "active" && <span style={{ fontSize: 9, padding: "1px 5px", background: course.color, color: "#fff", borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em" }}>NOW</span>}
                  {s.state === "done" && <I.Check size={12} color="var(--silver)"/>}
                </div>
                <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 1 }}>{s.body}</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: `${s.color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {React.createElement(I[s.icon], { size: 13, color: s.color })}
              </div>
            </div>
            {s.flags && s.flags.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 5, marginLeft: 0 }}>
                {s.flags.map((f, fi) => (
                  <div key={fi} style={{ display: "flex", alignItems: "center", gap: 7, background: f.bg, border: `1px solid ${f.border}`, borderRadius: 7, padding: "5px 10px" }}>
                    <span style={{ fontSize: 9.5, fontWeight: 800, color: f.text, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>{f.label}</span>
                    <span style={{ fontSize: 11.5, color: f.text, fontWeight: 500 }}>{f.msg}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer: action items */}
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 7, padding: "6px 12px", flex: 1 }}>
          <span style={{ fontSize: 9.5, fontWeight: 800, color: "#991B1B", letterSpacing: "0.06em", whiteSpace: "nowrap" }}>DUE TONIGHT</span>
          <span style={{ fontSize: 11.5, color: "#991B1B", fontWeight: 500 }}>Cell Structure Quiz · Due 11:59 PM</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Live activity / next steps feed ─────────── */
function BioAITutorCard({ course }) {
  const [draft, setDraft] = React.useState("");
  const suggestions = [
    "Explain the Krebs cycle simply",
    "Help me prep for the quiz tonight",
    "What's the role of NADH?",
  ];
  return (
    <div style={{
      background: `linear-gradient(135deg, #F5F3FF 0%, ${course.color}10 100%)`,
      borderRadius: 14, padding: "18px 22px",
      border: `1px solid ${course.color}30`,
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <I.Sparkle size={20} color="#fff"/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Bio Tutor</h3>
            <span style={{ fontSize: 9, padding: "2px 6px", background: "#EDE9FE", color: "#7C3AED", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 1 }}>Your 24/7 study partner — trained on this unit's materials.</div>
        </div>
      </div>
      <div style={{
        display: "flex", gap: 8, alignItems: "center",
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 10, padding: "8px 10px",
      }}>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask Bio Tutor anything about Cells & Energy…"
          style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)" }}
        />
        <button style={{
          background: "linear-gradient(135deg, #A78BFA, #7C3AED)",
          border: "none", borderRadius: 8,
          padding: "7px 14px", cursor: "pointer",
          color: "#fff", fontSize: 12, fontWeight: 700,
          display: "inline-flex", alignItems: "center", gap: 5,
        }}>
          <I.Send size={12} color="#fff"/> Ask
        </button>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
        {suggestions.map((s, i) => (
          <button key={i} onClick={() => setDraft(s)} style={{
            fontSize: 11, padding: "5px 10px",
            background: "var(--paper)", border: "1px solid var(--mist)",
            borderRadius: 999, color: "var(--slate)", cursor: "pointer",
            fontWeight: 500,
          }}>{s}</button>
        ))}
      </div>
    </div>
  );
}

function BioLessonAndMaterials({ course, onSwitchTab }) {
  const [labLayoutOpen, setLabLayoutOpen] = React.useState(false);
  const [bioTutorOpen,  setBioTutorOpen]  = React.useState(false);
  const [tutorDraft,    setTutorDraft]    = React.useState("");
  const tutorSuggestions = ["Explain the Krebs cycle simply", "Help me prep for the quiz tonight", "What's the role of NADH?"];
  const items = [
    { name: "Campbell Biology — Ch. 9: Cellular Respiration", sub: "Textbook · pp. 162–186", icon: "Book", color: course.color },
    { name: "Unit 4 Slide Deck", sub: "32 slides · Mr. Evans", icon: "Document", color: "#0EA5E9" },
    { name: "Khan Academy: ATP & Respiration", sub: "Video series · 6 lessons", icon: "PlayCircle", color: "#EF4444" },
    { name: "Krebs Cycle Interactive", sub: "BioInteractive · simulation", icon: "Atom", color: "#8B5CF6" },
    { name: "Bio Glossary — Unit 4", sub: "32 terms · quick reference", icon: "Bookmark", color: "#F59E0B" },
  ];
  return (
    <>
    {/* Quick-access bar */}
    <div style={{ display: "flex", gap: 8 }}>
      {[
        { emoji: "🗺", label: "Lab Layout",           action: () => setLabLayoutOpen(true) },
        { emoji: "✨", label: "Bio Tutor",            action: () => setBioTutorOpen(true)  },
        { emoji: "🧭", label: "Self-Navigation Tool", action: () => { onSwitchTab("curriculum"); window.scrollTo(0, 0); } },
      ].map((pill) => (
        <button key={pill.label} onClick={pill.action} style={{
          flex: 1,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          height: 48,
          background: "#fff",
          border: "1.5px solid #10B981",
          borderLeft: "3px solid #10B981",
          borderRadius: 10,
          fontSize: 13.5, color: "#10B981", fontWeight: 600,
          cursor: "pointer",
          transition: "background 120ms",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#10B98114"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
        ><span style={{ fontSize: 16 }}>{pill.emoji}</span> {pill.label}</button>
      ))}
    </div>
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      {/* Unit / Lesson section */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>
        <span style={{ color: course.color, fontWeight: 600 }}>{course.unit}</span>
        <I.ChevronRight size={11} color="var(--stone)"/>
        <span>Lesson 4.3</span>
      </div>
      <h1 className="t-h1" style={{ fontSize: 24, margin: "0 0 4px" }}>{course.todayLesson}</h1>
      <div style={{ fontSize: 13, color: "var(--stone)" }}>
        Trace energy through glycolysis, the Krebs cycle, and the electron transport chain — then test it in lab.
      </div>

      <div style={{ display: "flex", gap: 18, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--mist)", flexWrap: "wrap" }}>
        <BioMini icon="Clock" color="#0EA5E9" label="Class period" value="45 min"/>
        <BioMini icon="Atom" color="#10B981" label="Lab partners" value="Maya & Jordan"/>
        <BioMini icon="MapPin" color="#F59E0B" label="Station" value="Bench 4 — Sink"/>
        <BioMini icon="Trophy" color="#8B5CF6" label="Lab points" value="20 pts"/>
      </div>

      <div style={{
        marginTop: 14,
        display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 12, alignItems: "center",
        background: `${course.color}0F`,
        border: `1px solid ${course.color}40`,
        borderRadius: 10,
        padding: "10px 14px",
      }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: `${course.color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Bell size={16} color={course.color}/>
        </div>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Bring lab reports + safety goggles today</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)" }}>From Mr. Evans, posted 1 hour ago</div>
        </div>
        <button className="btn btn-secondary btn-sm">Mark read</button>
      </div>

      {/* Divider */}
      <div style={{ margin: "18px 0 14px", borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", background: "var(--paper)", paddingRight: 10, marginTop: -10, whiteSpace: "nowrap" }}>Learning Materials</span>
        <span style={{ fontSize: 11, color: "var(--stone)", background: "var(--paper)", paddingLeft: 4, paddingRight: 0, marginTop: -10 }}>{course.unit}</span>
      </div>

      {/* Materials list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((it, i) => {
          const Icon = I[it.icon];
          return (
            <a key={i} href="#" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 8,
              textDecoration: "none",
              background: "var(--bone)",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${it.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={14} color={it.color}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.name}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{it.sub}</div>
              </div>
              <I.External size={12} color="var(--silver)"/>
            </a>
          );
        })}
      </div>
    </div>

    {/* Lab Layout modal */}
    {labLayoutOpen && (
      <>
        <div onClick={() => setLabLayoutOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 200, backdropFilter: "blur(2px)" }}/>
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 520, background: "var(--paper)", borderRadius: 16,
          boxShadow: "var(--shadow-card)", zIndex: 201, overflow: "hidden",
        }}>
          <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>Lab Layout — Room 302</div>
              <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>You are at Bench 4, near the sink</div>
            </div>
            <button onClick={() => setLabLayoutOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
            ><I.X size={16} color="var(--stone)"/></button>
          </div>
          <div style={{ padding: "20px 20px 24px" }}>
            <BioRoomMap color={course.color}/>
          </div>
        </div>
      </>
    )}

    {/* Bio Tutor modal */}
    {bioTutorOpen && (
      <>
        <div onClick={() => setBioTutorOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", zIndex: 200, backdropFilter: "blur(2px)" }}/>
        <div style={{
          position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 560, background: "var(--paper)", borderRadius: 16,
          boxShadow: "var(--shadow-card)", zIndex: 201, overflow: "hidden",
        }}>
          <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #A78BFA, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I.Sparkle size={18} color="#fff"/>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>Bio Tutor</span>
                  <span style={{ fontSize: 9, padding: "2px 6px", background: "#EDE9FE", color: "#7C3AED", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--stone)" }}>Your 24/7 study partner — trained on this unit's materials.</div>
              </div>
            </div>
            <button onClick={() => setBioTutorOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}
              onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "none"}
            ><I.X size={16} color="var(--stone)"/></button>
          </div>
          <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", background: "var(--bone)", border: "1px solid var(--mist)", borderRadius: 10, padding: "8px 10px" }}>
              <input
                value={tutorDraft}
                onChange={(e) => setTutorDraft(e.target.value)}
                placeholder="Ask Bio Tutor anything about Cells & Energy…"
                style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)" }}
              />
              <button style={{ background: "linear-gradient(135deg, #A78BFA, #7C3AED)", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", color: "#fff", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 5 }}>
                <I.Send size={12} color="#fff"/> Ask
              </button>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {tutorSuggestions.map((s, i) => (
                <button key={i} onClick={() => setTutorDraft(s)} style={{ fontSize: 11, padding: "5px 10px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 999, color: "var(--slate)", cursor: "pointer", fontWeight: 500 }}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </>
    )}
    </>
  );
}

function BioMaterialsCard({ course }) {
  const items = [
    { name: "Campbell Biology — Ch. 9: Cellular Respiration", sub: "Textbook · pp. 162–186", icon: "Book", color: course.color },
    { name: "Unit 4 Slide Deck", sub: "32 slides · Mr. Evans", icon: "Document", color: "#0EA5E9" },
    { name: "Khan Academy: ATP & Respiration", sub: "Video series · 6 lessons", icon: "PlayCircle", color: "#EF4444" },
    { name: "Krebs Cycle Interactive", sub: "BioInteractive · simulation", icon: "Atom", color: "#8B5CF6" },
    { name: "Bio Glossary — Unit 4", sub: "32 terms · quick reference", icon: "Bookmark", color: "#F59E0B" },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Learning Materials</h2>
        <span style={{ fontSize: 11, color: "var(--stone)" }}>{course.unit}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((it, i) => {
          const Icon = I[it.icon];
          return (
            <a key={i} href="#" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 8,
              textDecoration: "none",
              background: "var(--bone)",
            }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: `${it.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={14} color={it.color}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{it.name}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{it.sub}</div>
              </div>
              <I.External size={12} color="var(--silver)"/>
            </a>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────── Curriculum tab ─────────── */
function BioCurriculumView({ course, onSwitchTab }) {
  const green = "#10B981";

  // Section 3 state
  const [matStatus,      setMatStatus]      = React.useState(["done", "in-progress", "not-started", "not-started", "not-started"]);
  const [matReadiness,   setMatReadiness]   = React.useState(["confident", null, null, null, null]);
  const [matNotes,       setMatNotes]       = React.useState(["Good overview — re-read the ATP section before Lesson 4.4.", null, null, null, null]);
  const [matNoteEditing, setMatNoteEditing] = React.useState([false, false, false, false, false]);
  const [matNoteInput,   setMatNoteInput]   = React.useState(["", "", "", "", ""]);
  const [matDiscOpen,    setMatDiscOpen]    = React.useState([false, false, false, false, false]);
  const [matDiscInput,   setMatDiscInput]   = React.useState(["", "", "", "", ""]);
  // Section 4 & 5 state
  const [pastExpanded,     setPastExpanded]     = React.useState([false, false, false]);
  const [upcomingExpanded, setUpcomingExpanded] = React.useState([false, false]);
  // Modal + toast state
  const [modalLesson, setModalLesson] = React.useState(null);
  const [toast,       setToast]       = React.useState(false);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const MATERIALS = [
    { name: "Campbell Biology — Ch. 9: Cellular Respiration", sub: "Textbook · pp. 162–186",     icon: "Book",       color: course.color, peers: 6, disc: [] },
    { name: "Unit 4 Slide Deck",                              sub: "32 slides · Mr. Evans",       icon: "Document",   color: "#0EA5E9",    peers: 8, disc: [
      { name: "Maya P.",   init: "MP", hue: 30,  text: "Slide 18 on ATP synthesis is really helpful — Mr. Evans added extra notes there", time: "1 hr ago"   },
      { name: "Jordan T.", init: "JT", hue: 280, text: "Does anyone else think the Krebs cycle diagram on slide 22 is confusing?",         time: "45 min ago" },
    ]},
    { name: "Khan Academy: ATP & Respiration",                sub: "Video series · 6 lessons",    icon: "PlayCircle", color: "#EF4444",    peers: 5, disc: [] },
    { name: "Krebs Cycle Interactive",                        sub: "BioInteractive · simulation", icon: "Atom",       color: "#8B5CF6",    peers: 3, disc: [] },
    { name: "Bio Glossary — Unit 4",                          sub: "32 terms · quick reference",  icon: "Bookmark",   color: "#F59E0B",    peers: 1, disc: [] },
  ];

  const PAST_UNITS = [
    { title: "Unit 1 · Introduction to Biology",    pct: 95, grade: "A",  lessons: [
      { id: "1.1", title: "The Study of Life",             type: "Lecture",    dur: "40 min" },
      { id: "1.2", title: "Scientific Methods",            type: "Discussion", dur: "45 min" },
      { id: "1.3", title: "The Chemistry of Life",         type: "Lecture",    dur: "40 min" },
      { id: "1.4", title: "Water & Carbon",                type: "Lab",        dur: "45 min" },
      { id: "1.5", title: "Macromolecules",                type: "Lecture",    dur: "40 min" },
      { id: "1.6", title: "Unit Assessment",               type: "Quiz",       dur: "30 min" },
    ]},
    { title: "Unit 2 · Cell Structure & Function",  pct: 88, grade: "B+", lessons: [
      { id: "2.1", title: "Cell Theory & Types",           type: "Lecture",    dur: "40 min" },
      { id: "2.2", title: "Prokaryotic Cells",             type: "Discussion", dur: "45 min" },
      { id: "2.3", title: "Eukaryotic Cells",              type: "Lecture",    dur: "40 min" },
      { id: "2.4", title: "Cell Organelles",               type: "Lab",        dur: "45 min" },
      { id: "2.5", title: "Cell Membrane & Transport",     type: "Lecture",    dur: "40 min" },
      { id: "2.6", title: "Cell Division",                 type: "Lab",        dur: "45 min" },
      { id: "2.7", title: "Unit Assessment",               type: "Quiz",       dur: "30 min" },
    ]},
    { title: "Unit 3 · Genetics & Heredity",        pct: 82, grade: "B",  lessons: [
      { id: "3.1", title: "DNA Structure",                 type: "Lecture",    dur: "40 min" },
      { id: "3.2", title: "DNA Replication",               type: "Lab",        dur: "45 min" },
      { id: "3.3", title: "Transcription & Translation",   type: "Lecture",    dur: "40 min" },
      { id: "3.4", title: "Mendelian Genetics",            type: "Discussion", dur: "45 min" },
      { id: "3.5", title: "Punnett Squares",               type: "Lab",        dur: "45 min" },
      { id: "3.6", title: "Mutations & Genetic Disorders", type: "Lecture",    dur: "40 min" },
      { id: "3.7", title: "Unit Assessment",               type: "Quiz",       dur: "30 min" },
    ]},
  ];

  const UPCOMING_UNITS = [
    { title: "Unit 5 · Evolution & Natural Selection", lessonCount: 6, lessonTitles: [
      "5.1 Darwin & Natural Selection", "5.2 Evidence for Evolution", "5.3 Population Genetics",
      "5.4 Speciation", "5.5 Human Evolution", "5.6 Unit Assessment",
    ]},
    { title: "Unit 6 · Ecology & Ecosystems", lessonCount: 5, lessonTitles: [
      "6.1 Ecosystem Structure", "6.2 Energy Flow", "6.3 Nutrient Cycles",
      "6.4 Community Ecology", "6.5 Human Impact",
    ]},
  ];

  const lessons = [
    {
      id: "4.1", title: "Introduction to Cellular Energy", type: "Lecture", dur: "40 min", status: "complete", pts: "15 pts",
      desc: "Explore how cells capture, store, and release energy. Introduction to ATP, ADP, and the role of energy in biological processes.",
      objectives: ["Explain the role of ATP in cellular energy transfer", "Identify the main stages of cellular energy production", "Describe the relationship between ADP and ATP"],
      score: "92% · A",
    },
    {
      id: "4.2", title: "Photosynthesis — Light Reactions", type: "Lab", dur: "45 min", status: "complete", pts: "20 pts",
      desc: "Investigate the light-dependent reactions of photosynthesis using chromatography and spectroscopy techniques.",
      objectives: ["Identify the reactants and products of the light reactions", "Explain the role of chlorophyll in capturing light energy", "Describe how ATP and NADPH are produced in the thylakoid"],
      score: "92% · A",
    },
    {
      id: "4.3", title: "Cellular Respiration — Lab Day", type: "Lab", dur: "45 min", status: "in-progress", pts: "20 pts",
      desc: "Trace the flow of energy through glycolysis, the Krebs cycle, and the electron transport chain — then test it in lab.",
      objectives: ["Trace glucose through glycolysis to pyruvate", "Describe the role of the Krebs cycle in energy extraction", "Explain how the electron transport chain generates ATP"],
      labMaterials: ["Lab Handout: Cellular Respiration", "Krebs Cycle Interactive (BioInteractive)", "Campbell Biology Ch. 9"],
    },
    {
      id: "4.4", title: "ATP Synthesis", type: "Lecture", dur: "40 min", status: "upcoming", pts: "15 pts",
      desc: "Dive deeper into ATP synthase and the chemiosmosis process. Understand how proton gradients drive energy production.",
      objectives: ["Explain the structure and function of ATP synthase", "Describe chemiosmosis and proton gradients", "Compare ATP yield across aerobic and anaerobic respiration"],
    },
    {
      id: "4.5", title: "Fermentation", type: "Discussion", dur: "45 min", status: "upcoming", pts: "15 pts",
      desc: "Explore fermentation as an alternative to aerobic respiration. Analyze real-world applications from brewing to baking.",
      objectives: ["Compare lactic acid and alcoholic fermentation", "Identify conditions that favor fermentation over aerobic respiration", "Evaluate real-world applications of fermentation"],
    },
    {
      id: "4.6", title: "Energy & Ecosystems", type: "Quiz", dur: "30 min", status: "locked", pts: "30 pts",
      desc: "Unit assessment covering all major topics — cellular energy, photosynthesis, cellular respiration, ATP synthesis, and fermentation.",
      objectives: ["Demonstrate mastery of cellular energy pathways", "Synthesize Unit 4 concepts into coherent explanations", "Apply energy concepts to ecosystem-level processes"],
    },
  ];

  function StatusIcon({ status }) {
    if (status === "complete") return (
      <div style={{ width: 22, height: 22, borderRadius: 999, background: green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5l9-11"/></svg>
      </div>
    );
    if (status === "in-progress") return (
      <div style={{ width: 22, height: 22, borderRadius: 999, background: green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: 999, background: "#fff" }}/>
      </div>
    );
    if (status === "upcoming") return (
      <div style={{ width: 22, height: 22, borderRadius: 999, border: "2px solid var(--mist)", background: "var(--paper)", flexShrink: 0 }}/>
    );
    // locked
    return (
      <div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--bone)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <I.Lock size={11} color="var(--silver)"/>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

      {/* 1 · Self-Navigation Tool — featured card */}
      <div style={{
        background: "var(--paper)", borderRadius: 14, padding: "20px 24px",
        boxShadow: "var(--shadow-card)",
        border: "1px dashed var(--mist)",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 className="t-h3" style={{ fontSize: 14, margin: 0, color: "var(--slate)" }}>Self-Navigation Tool</h2>
          <span style={{ fontSize: 9.5, padding: "2px 7px", background: "var(--bone)", color: "var(--stone)", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Coming Soon</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--stone)", lineHeight: 1.6 }}>
          Track your own learning progress — set goals, reflect on your understanding, and guide your own path through the curriculum.
        </div>
        <div style={{
          minHeight: 120,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "repeating-linear-gradient(45deg, var(--bone), var(--bone) 8px, transparent 8px, transparent 16px)",
          border: "1px dashed var(--mist)",
          borderRadius: 10,
          color: "var(--silver)",
          fontFamily: "var(--font-mono, ui-monospace, monospace)",
          fontSize: 11,
          letterSpacing: "0.04em",
        }}>
          self-assessment preview
        </div>
      </div>

      {/* 2 · Current Unit */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--stone)" }}>Current Unit</div>

        {/* Unit header card */}
        <div style={{
          background: "var(--paper)", borderRadius: 14, padding: "18px 20px",
          boxShadow: "var(--shadow-card)",
          display: "flex", flexDirection: "column", gap: 10,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Unit 4 · Cells &amp; Energy</span>
            <span style={{ fontSize: 12, color: "var(--stone)" }}>Sep 15 — Nov 1</span>
          </div>

          {/* Progress bar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--stone)" }}>
              <span>14 of 17 lessons complete</span>
              <span style={{ fontWeight: 600, color: green }}>82%</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: "var(--bone)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "82%", background: green, borderRadius: 999 }}/>
            </div>
          </div>

          <a href="#/my-materials?class=biology&unit=4" onClick={(e) => { e.preventDefault(); window.location.hash = "#/my-materials?class=biology&unit=4"; }} style={{ fontSize: 13, fontWeight: 600, color: green, textDecoration: "none", alignSelf: "flex-start" }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = "underline"}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = "none"}
          >View unit materials →</a>
        </div>

        {/* Lesson rows */}
        <div style={{ background: "var(--paper)", borderRadius: 14, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
          {lessons.map((lesson, i) => {
            const locked = lesson.status === "locked";
            return (
              <div key={lesson.id} style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 18px",
                borderBottom: i < lessons.length - 1 ? "1px solid var(--mist)" : "none",
                cursor: locked ? "default" : "pointer",
                opacity: locked ? 0.55 : 1,
                transition: "background 120ms",
              }}
              onMouseEnter={(e) => { if (!locked) e.currentTarget.style.background = "var(--bone)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              onClick={() => { if (!locked) setModalLesson(lesson); }}
              >
                <StatusIcon status={lesson.status}/>

                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                      {lesson.id} {lesson.title}
                    </span>
                    {lesson.status === "in-progress" && (
                      <span style={{ fontSize: 9.5, fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: green, color: "#fff", letterSpacing: "0.05em" }}>NOW</span>
                    )}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11.5, padding: "1px 7px", borderRadius: 999, background: "var(--bone)", color: "var(--stone)", fontWeight: 500 }}>{lesson.type}</span>
                    <span style={{ fontSize: 12, color: "var(--stone)" }}>{lesson.dur}</span>
                  </div>
                </div>

                {!locked && <I.ChevronRight size={15} color="var(--silver)"/>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3 · Enhanced Learning Materials */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--stone)" }}>
          Learning Materials · Unit 4 · Cells &amp; Energy
        </div>
        <div style={{ background: "var(--paper)", borderRadius: 14, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
          {MATERIALS.map((mat, i) => {
            const Icon = I[mat.icon];
            const status = matStatus[i];
            const readiness = matReadiness[i];
            const note = matNotes[i];
            const editing = matNoteEditing[i];
            const discOpen = matDiscOpen[i];
            const statusOptions = [
              { val: "not-started", label: "Not started", color: "var(--silver)"  },
              { val: "in-progress", label: "In progress", color: "var(--student)" },
              { val: "done",        label: "Done",        color: green             },
            ];
            const readinessDotColor = readiness === "confident" ? green : readiness === "neutral" ? "#F59E0B" : "#EF4444";
            return (
              <div key={i} style={{
                borderBottom: i < MATERIALS.length - 1 ? "1px solid var(--mist)" : "none",
                padding: "14px 18px",
                display: "flex", flexDirection: "column", gap: 10,
              }}>
                {/* Top row: icon + name + peer pill */}
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${mat.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={15} color={mat.color}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{mat.name}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)" }}>{mat.sub}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
                    <I.Users size={11} color="var(--stone)"/>
                    <span style={{ fontSize: 11, color: "var(--stone)", whiteSpace: "nowrap" }}>{mat.peers} classmates</span>
                  </div>
                </div>

                {/* Status control */}
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {statusOptions.map((opt) => {
                    const active = status === opt.val;
                    return (
                      <button key={opt.val} onClick={() => setMatStatus(matStatus.map((v, j) => j === i ? opt.val : v))} style={{
                        padding: "3px 10px", borderRadius: 999,
                        fontSize: 11.5, fontWeight: active ? 600 : 500,
                        background: active ? `${opt.color}18` : "var(--bone)",
                        color: active ? opt.color : "var(--stone)",
                        border: active ? `1.5px solid ${opt.color}60` : "1.5px solid transparent",
                        cursor: "pointer", transition: "all 120ms",
                      }}>{opt.label}</button>
                    );
                  })}
                </div>

                {/* Readiness check — only when Done */}
                {status === "done" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {readiness ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 10, height: 10, borderRadius: 999, background: readinessDotColor, flexShrink: 0 }}/>
                        <span style={{ fontSize: 11.5, color: "var(--stone)" }}>
                          {readiness === "confident" ? "Confident" : readiness === "neutral" ? "Getting there" : "Still confused"}
                        </span>
                        <button onClick={() => setMatReadiness(matReadiness.map((v, j) => j === i ? null : v))}
                          style={{ background: "none", border: "none", padding: 0, fontSize: 11, color: "var(--silver)", cursor: "pointer", marginLeft: 2 }}>change</button>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 12, color: "var(--stone)" }}>How well do you understand this?</span>
                        {[
                          { face: "confused",  emoji: "😕", color: "#EF4444" },
                          { face: "neutral",   emoji: "😐", color: "#F59E0B" },
                          { face: "confident", emoji: "😊", color: green     },
                        ].map((opt) => (
                          <button key={opt.face}
                            onClick={() => setMatReadiness(matReadiness.map((v, j) => j === i ? opt.face : v))}
                            style={{
                              width: 28, height: 28, borderRadius: 999,
                              background: "var(--bone)", border: "1.5px solid var(--mist)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: 15, cursor: "pointer", transition: "border-color 120ms",
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = opt.color}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--mist)"}
                          >{opt.emoji}</button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Note + Discussion row */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  {/* Personal annotation */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    {editing ? (
                      <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
                        <input
                          value={matNoteInput[i]}
                          onChange={(e) => setMatNoteInput(matNoteInput.map((v, j) => j === i ? e.target.value : v))}
                          placeholder="Add a personal note…"
                          autoFocus
                          style={{
                            flex: 1, fontSize: 12, padding: "5px 9px", borderRadius: 6,
                            border: "1px solid var(--mist)", background: "var(--bone)",
                            color: "var(--slate)", outline: "none",
                          }}
                        />
                        <button onClick={() => {
                          setMatNotes(matNotes.map((v, j) => j === i ? matNoteInput[i] : v));
                          setMatNoteEditing(matNoteEditing.map((v, j) => j === i ? false : v));
                        }} style={{
                          padding: "5px 10px", borderRadius: 6, fontSize: 11.5, fontWeight: 600,
                          background: green, color: "#fff", border: "none", cursor: "pointer", flexShrink: 0,
                        }}>Save</button>
                      </div>
                    ) : note ? (
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                        <span style={{ fontSize: 12, fontStyle: "italic", color: "var(--slate)", lineHeight: 1.5 }}>{note}</span>
                        <button onClick={() => {
                          setMatNoteInput(matNoteInput.map((v, j) => j === i ? note : v));
                          setMatNoteEditing(matNoteEditing.map((v, j) => j === i ? true : v));
                        }} style={{ background: "none", border: "none", padding: 0, cursor: "pointer", flexShrink: 0, marginTop: 1 }}>
                          <I.Edit size={12} color="var(--silver)"/>
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setMatNoteEditing(matNoteEditing.map((v, j) => j === i ? true : v))}
                        style={{
                          background: "none", border: "none", padding: 0, fontSize: 12,
                          color: "var(--stone)", cursor: "pointer",
                          textDecoration: "underline", textDecorationStyle: "dashed", textUnderlineOffset: "2px",
                        }}>Add note</button>
                    )}
                  </div>

                  {/* Discussion toggle */}
                  <button onClick={() => setMatDiscOpen(matDiscOpen.map((v, j) => j === i ? !v : v))}
                    style={{
                      background: "none", border: "none", padding: 0,
                      fontSize: 11, color: "var(--stone)", cursor: "pointer",
                      textDecoration: "underline", textDecorationStyle: "dotted", textUnderlineOffset: "2px",
                      flexShrink: 0,
                    }}>Discussion ({mat.disc.length})</button>
                </div>

                {/* Discussion thread — expanded */}
                {discOpen && (
                  <div style={{ background: "var(--bone)", borderRadius: 10, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {mat.disc.length === 0 ? (
                      <div style={{ fontSize: 12, color: "var(--silver)", textAlign: "center", padding: "4px 0" }}>No comments yet — be the first.</div>
                    ) : mat.disc.map((c, ci) => (
                      <div key={ci} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 999, flexShrink: 0,
                          background: `hsl(${c.hue}, 60%, 55%)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 9.5, fontWeight: 700, color: "#fff",
                        }}>{c.init}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", gap: 6, alignItems: "baseline", marginBottom: 2 }}>
                            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{c.name}</span>
                            <span style={{ fontSize: 10.5, color: "var(--silver)" }}>{c.time}</span>
                          </div>
                          <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.5 }}>{c.text}</div>
                        </div>
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
                      <input
                        value={matDiscInput[i]}
                        onChange={(e) => setMatDiscInput(matDiscInput.map((v, j) => j === i ? e.target.value : v))}
                        placeholder="Add to discussion…"
                        style={{
                          flex: 1, fontSize: 12, padding: "5px 9px", borderRadius: 6,
                          border: "1px solid var(--mist)", background: "var(--paper)",
                          color: "var(--slate)", outline: "none",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 · Past Units */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--stone)" }}>Past Units</div>
        <div style={{ background: "var(--paper)", borderRadius: 14, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
          {PAST_UNITS.map((unit, i) => {
            const open = pastExpanded[i];
            return (
              <div key={i} style={{ borderBottom: i < PAST_UNITS.length - 1 ? "1px solid var(--mist)" : "none" }}>
                <button onClick={() => setPastExpanded(pastExpanded.map((v, j) => j === i ? !v : v))}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left", transition: "background 120ms",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5l9-11"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{unit.title}</div>
                    <div style={{ display: "flex", gap: 10, marginTop: 2, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, color: "var(--stone)" }}>{unit.lessons.length} lessons</span>
                      <span style={{ fontSize: 11, fontWeight: 600, color: green }}>{unit.pct}%</span>
                      <span style={{ fontSize: 11, color: "var(--stone)" }}>Grade: <strong style={{ color: "var(--ink)" }}>{unit.grade}</strong></span>
                    </div>
                  </div>
                  <div style={{ width: 80, flexShrink: 0 }}>
                    <div style={{ height: 4, borderRadius: 999, background: "var(--bone)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${unit.pct}%`, background: green, borderRadius: 999 }}/>
                    </div>
                  </div>
                  <I.ChevronDown size={14} color="var(--silver)" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 160ms", flexShrink: 0 }}/>
                </button>
                {open && (
                  <div style={{ borderTop: "1px solid var(--mist)" }}>
                    {unit.lessons.map((lesson, li) => (
                      <div key={li} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "11px 18px 11px 32px",
                        borderBottom: li < unit.lessons.length - 1 ? "1px solid var(--mist)" : "none",
                        background: "var(--bone)",
                      }}>
                        <div style={{ width: 18, height: 18, borderRadius: 999, background: green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5l9-11"/></svg>
                        </div>
                        <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: "var(--ink)", minWidth: 0 }}>{lesson.id} {lesson.title}</span>
                        <span style={{ fontSize: 11, padding: "1px 7px", borderRadius: 999, background: "var(--paper)", color: "var(--stone)", fontWeight: 500, border: "1px solid var(--mist)", flexShrink: 0 }}>{lesson.type}</span>
                        <span style={{ fontSize: 11.5, color: "var(--stone)", flexShrink: 0 }}>{lesson.dur}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5 · Upcoming Units */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--stone)" }}>Upcoming Units</div>
        <div style={{ background: "var(--paper)", borderRadius: 14, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
          {UPCOMING_UNITS.map((unit, i) => {
            const open = upcomingExpanded[i];
            return (
              <div key={i} style={{ borderBottom: i < UPCOMING_UNITS.length - 1 ? "1px solid var(--mist)" : "none" }}>
                <button onClick={() => setUpcomingExpanded(upcomingExpanded.map((v, j) => j === i ? !v : v))}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 18px", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left",
                    opacity: 0.65, transition: "background 120ms, opacity 120ms",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; e.currentTarget.style.opacity = "0.85"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.opacity = "0.65"; }}
                >
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--bone)", border: "1.5px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <I.Lock size={11} color="var(--silver)"/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{unit.title}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>{unit.lessonCount} lessons · Locked</div>
                  </div>
                  <I.ChevronDown size={14} color="var(--silver)" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 160ms", flexShrink: 0 }}/>
                </button>
                {open && (
                  <div style={{ borderTop: "1px solid var(--mist)", background: "var(--bone)" }}>
                    {unit.lessonTitles.map((title, li) => (
                      <div key={li} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "8px 18px 8px 32px",
                        borderBottom: li < unit.lessonTitles.length - 1 ? "1px solid var(--mist)" : "none",
                        opacity: 0.6,
                      }}>
                        <I.Lock size={11} color="var(--silver)"/>
                        <span style={{ fontSize: 12, color: "var(--stone)" }}>{title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson modal */}
      {modalLesson && (() => {
        const L = modalLesson;
        const isComplete   = L.status === "complete";
        const isInProgress = L.status === "in-progress";
        const isUpcoming   = L.status === "upcoming";
        const isLocked     = L.status === "locked";
        const statusLabel  = isComplete ? "Complete" : isInProgress ? "In Progress" : isUpcoming ? "Upcoming" : "Locked";
        const statusColor  = isComplete ? green : isInProgress ? green : isUpcoming ? "var(--stone)" : "var(--silver)";
        return (
          <>
            {/* Overlay */}
            <div onClick={() => setModalLesson(null)} style={{
              position: "fixed", inset: 0,
              background: "rgba(15,23,42,0.45)",
              zIndex: 200,
              backdropFilter: "blur(2px)",
            }}/>
            {/* Dialog */}
            <div role="dialog" aria-modal="true" style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 680, maxHeight: "80vh",
              background: "var(--paper)",
              borderRadius: 16,
              boxShadow: "var(--shadow-card)",
              zIndex: 201,
              display: "flex", flexDirection: "column",
              overflow: "hidden",
            }}>
              {/* Header */}
              <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid var(--mist)", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 999, background: "var(--bone)", color: "var(--stone)", fontWeight: 600, border: "1px solid var(--mist)" }}>{L.type}</span>
                  </div>
                  <button onClick={() => setModalLesson(null)} style={{
                    background: "none", border: "none", cursor: "pointer",
                    width: 28, height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                  >
                    <I.X size={16} color="var(--stone)"/>
                  </button>
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 600, color: "var(--ink)", margin: "0 0 6px", lineHeight: 1.2 }}>{L.id} {L.title}</h2>
                <p style={{ fontSize: 14, color: "var(--slate)", margin: "0 0 12px", lineHeight: 1.6 }}>{L.desc}</p>
                <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--stone)", flexWrap: "wrap" }}>
                  <span>{L.dur}</span>
                  <span>·</span>
                  <span>{L.type}</span>
                  <span>·</span>
                  <span>{L.pts}</span>
                  <span>·</span>
                  <span style={{ color: statusColor, fontWeight: 600 }}>{statusLabel}</span>
                </div>
              </div>

              {/* Body — scrollable */}
              <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Objectives (all statuses) */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--stone)", marginBottom: 10 }}>Learning Objectives</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {L.objectives.map((obj, oi) => (
                      <div key={oi} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <div style={{ width: 18, height: 18, borderRadius: 999, border: `2px solid ${isComplete ? green : "var(--mist)"}`, background: isComplete ? green : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          {isComplete && <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5l9-11"/></svg>}
                        </div>
                        <span style={{ fontSize: 13.5, color: "var(--slate)", lineHeight: 1.5 }}>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Complete body */}
                {isComplete && (
                  <>
                    <div style={{ padding: "14px 16px", background: `${green}12`, border: `1px solid ${green}40`, borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
                      <I.Trophy size={18} color={green}/>
                      <span style={{ fontSize: 15, fontWeight: 700, color: green }}>{L.score}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--stone)", marginBottom: 8 }}>Your Notes</div>
                      <div style={{ fontSize: 13, color: "var(--stone)", fontStyle: "italic", padding: "10px 14px", background: "var(--bone)", borderRadius: 8 }}>No notes saved.</div>
                    </div>
                    <a href="#" onClick={(e) => e.preventDefault()} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "9px 18px", borderRadius: 8, alignSelf: "flex-start",
                      background: green, color: "#fff", fontWeight: 600, fontSize: 13.5,
                      textDecoration: "none",
                    }}>Review materials →</a>
                  </>
                )}

                {/* In-progress body */}
                {isInProgress && (
                  <>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--stone)", marginBottom: 10 }}>Lab Materials</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {L.labMaterials.map((mat, mi) => (
                          <div key={mi} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "var(--bone)", borderRadius: 8 }}>
                            <I.Folder size={14} color="var(--stone)"/>
                            <span style={{ fontSize: 13, color: "var(--slate)" }}>{mat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button onClick={() => { setModalLesson(null); onSwitchTab("today"); }} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "9px 18px", borderRadius: 8, alignSelf: "flex-start",
                      background: green, color: "#fff", fontWeight: 600, fontSize: 13.5,
                      border: "none", cursor: "pointer",
                    }}>Go to Today&apos;s Class →</button>
                  </>
                )}

                {/* Upcoming body */}
                {isUpcoming && (
                  <>
                    <div style={{ fontSize: 13, color: "var(--stone)", fontStyle: "italic" }}>Materials not yet available.</div>
                    <button onClick={() => { setToast(true); }} style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "8px 16px", borderRadius: 8, alignSelf: "flex-start",
                      background: "transparent", color: green, fontWeight: 600, fontSize: 13.5,
                      border: `1.5px solid ${green}`, cursor: "pointer",
                    }}>
                      <I.Bell size={14} color={green}/> Remind me when this unlocks
                    </button>
                  </>
                )}

                {/* Locked body */}
                {isLocked && (
                  <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--stone)", fontSize: 13 }}>
                    <I.Lock size={15} color="var(--stone)"/>
                    <span>Complete previous lessons to unlock.</span>
                  </div>
                )}
              </div>
            </div>
          </>
        );
      })()}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
          zIndex: 300,
          background: "var(--ink)", color: "#fff",
          fontSize: 13, fontWeight: 500,
          padding: "10px 20px", borderRadius: 999,
          boxShadow: "var(--shadow-pop)",
          whiteSpace: "nowrap",
          animation: "overlayIn 180ms ease",
        }}>
          You&apos;ll be notified when this lesson unlocks.
        </div>
      )}

    </div>
  );
}

function BioSelfNavCard({ course }) {
  return (
    <div style={{
      background: "var(--paper)", borderRadius: 14, padding: "16px 20px",
      boxShadow: "var(--shadow-card)",
      border: "1px dashed var(--mist)",
      display: "flex", flexDirection: "column", gap: 10,
      position: "relative",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 className="t-h3" style={{ fontSize: 14, margin: 0, color: "var(--slate)" }}>Self-Navigation Tool</h2>
        <span style={{ fontSize: 9.5, padding: "2px 7px", background: "var(--bone)", color: "var(--stone)", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>Coming Soon</span>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--stone)", lineHeight: 1.5 }}>
        A self-assessment tool to track your learning progress.
      </div>
      <div style={{
        flex: 1, minHeight: 120,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "repeating-linear-gradient(45deg, var(--bone), var(--bone) 8px, transparent 8px, transparent 16px)",
        border: "1px dashed var(--mist)",
        borderRadius: 10,
        color: "var(--silver)",
        fontFamily: "var(--font-mono, ui-monospace, monospace)",
        fontSize: 11,
        letterSpacing: "0.04em",
      }}>
        self-assessment preview
      </div>
    </div>
  );
}

/* ─────────── Live activity / next steps feed ─────────── */
function BioActivityFeed({ course }) {
  const items = [
    { kind: "do",   label: "Do now", title: "Open the lab handout & put on goggles", time: "Now",       color: "#10B981" },
    { kind: "due",  label: "Due tonight",       title: "Cell Structure Quiz (15 questions)", time: "Due 11:59 PM",   color: "#EF4444" },
    { kind: "post", label: "Just posted",       title: "Krebs Cycle Diagram — annotate before Friday", time: "12 min ago", color: "#0EA5E9" },
    { kind: "ai",   label: "AI Tutor suggests", title: "You missed 2 questions on ATP last week — review for 5 min?", time: "Personal", color: "#8B5CF6" },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <h2 className="t-h3" style={{ fontSize: 14, margin: "0 0 10px" }}>Action Items</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((it, i) => (
          <div key={i} style={{
            display: "flex", gap: 10, padding: "10px 12px",
            border: "1px solid var(--mist)", borderRadius: 10,
            background: "var(--paper)",
          }}>
            <div style={{ width: 6, alignSelf: "stretch", borderRadius: 3, background: it.color, flexShrink: 0 }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10, color: it.color, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{it.label}</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>{it.title}</div>
              <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>{it.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Today sidebar (lab partners, room map, AI) ─────────── */
function BioTodaySidebar({ course }) {
  return (
    <div className="bio-today-sidebar" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {/* Lab partners */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Today's Lab Group</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <BioPartner name="You" hue={200} role="Recorder"  color={course.color} you/>
          <BioPartner name="Maya Patel" hue={30} role="Materials"/>
          <BioPartner name="Jordan Tate" hue={280} role="Timer"/>
        </div>
        <div style={{ marginTop: 10, padding: "8px 10px", background: "var(--bone)", borderRadius: 8, fontSize: 11, color: "var(--stone)" }}>
          <I.MapPin size={11} color={course.color} style={{ verticalAlign: "-1px", marginRight: 4 }}/>
          <b style={{ color: "var(--ink)" }}>Bench 4</b> — back-left, near the sink
        </div>
      </div>

      {/* Room map */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Lab Layout — Room 302</div>
        <BioRoomMap color={course.color}/>
      </div>

    </div>
  );
}

function BioPartner({ name, hue, role, color = "#10B981", you }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {you ? (
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>YOU</div>
      ) : (
        <StockPortrait name={name} hue={hue} size={32}/>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
        <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{role}</div>
      </div>
      {!you && <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.MessageCircle size={13} color="var(--stone)"/></button>}
    </div>
  );
}

function BioRoomMap({ color }) {
  // Simple top-down room — 6 lab benches + teacher's desk
  return (
    <svg viewBox="0 0 240 160" style={{ width: "100%", height: "auto", display: "block", background: "var(--bone)", borderRadius: 8 }}>
      {/* Door */}
      <rect x="2" y="120" width="3" height="22" fill="var(--silver)"/>
      <text x="8" y="140" fontSize="8" fill="var(--stone)">door</text>
      {/* Teacher desk */}
      <rect x="80" y="6" width="80" height="20" rx="3" fill="#475569" opacity="0.8"/>
      <text x="120" y="20" fontSize="8" fill="#fff" textAnchor="middle">Mr. Evans</text>
      {/* White board */}
      <rect x="40" y="2" width="160" height="3" fill="#0F172A" opacity="0.4"/>
      {/* Benches: 3x2 grid, label them */}
      {[
        { x: 30,  y: 50,  n: 1 },
        { x: 100, y: 50,  n: 2 },
        { x: 170, y: 50,  n: 3 },
        { x: 30,  y: 100, n: 4, here: true },
        { x: 100, y: 100, n: 5 },
        { x: 170, y: 100, n: 6 },
      ].map((b) => (
        <g key={b.n}>
          <rect x={b.x} y={b.y} width="44" height="28" rx="4"
            fill={b.here ? color : "#fff"}
            stroke={b.here ? "#059669" : "var(--mist)"}
            strokeWidth={b.here ? 2 : 1}/>
          <text x={b.x + 22} y={b.y + 18} fontSize="10" fontWeight="700"
            fill={b.here ? "#fff" : "var(--stone)"} textAnchor="middle">{b.n}</text>
          {b.here && <text x={b.x + 22} y={b.y + 40} fontSize="8" fontWeight="700"
            fill={color} textAnchor="middle">YOU</text>}
        </g>
      ))}
      {/* Sink */}
      <rect x="200" y="100" width="30" height="28" rx="4" fill="#cbd5e1"/>
      <text x="215" y="118" fontSize="8" fill="var(--stone)" textAnchor="middle">sink</text>
    </svg>
  );
}

/* ─────────── Projects view ─────────── */
const BIO_PERSONAL_PROJECTS = [
  {
    id: "cell-lab-report",
    title: "Cell Respiration Lab Report",
    type: "teacher",
    assigner: "Mr. Evans",
    due: "June 2",
    status: "In Progress",
    progress: 55,
    description: "Write a formal lab report covering your yeast fermentation experiment.",
  },
  {
    id: "study-guide-unit4",
    title: "Study Guide: Unit 4 Cells & Energy",
    type: "student",
    assigner: "Alex",
    supervisor: "Mr. Evans",
    due: "May 28",
    status: "In Progress",
    progress: 40,
    description: "Personal study guide covering ATP synthesis, cellular respiration, and photosynthesis.",
  },
];

const BIO_GROUP_PROJECTS = [
  {
    id: "photosynthesis-poster",
    title: "Photosynthesis vs. Respiration Poster",
    type: "teacher",
    assigner: "Mr. Evans",
    due: "June 5",
    status: "In Progress",
    progress: 30,
    members: [
      { name: "Maya P.",   hue: 280 },
      { name: "Jordan T.", hue: 195 },
      { name: "Alex",      hue: 220, you: true },
    ],
  },
  {
    id: "lab-data-study",
    title: "Lab Data Analysis Study Group",
    type: "student",
    assigner: "Alex",
    supervisor: "Mr. Evans",
    due: null,
    status: "Pending Approval",
    progress: 0,
    members: [
      { name: "Sam K.",    hue: 160 },
      { name: "Priya N.",  hue: 30  },
      { name: "Alex",      hue: 220, you: true },
    ],
  },
];

function BioNewProjectModal({ course, onClose }) {
  const [kind,     setKind]     = React.useState("personal"); // personal | group
  const [title,    setTitle]    = React.useState("");
  const [dueDate,  setDueDate]  = React.useState("");
  const [desc,     setDesc]     = React.useState("");
  const [members,  setMembers]  = React.useState("");

  const canCreate = title.trim().length > 0;

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    border: "1.5px solid var(--mist)", borderRadius: 10,
    padding: "9px 12px", fontSize: 13, color: "var(--ink)",
    background: "var(--bone)", outline: "none",
    fontFamily: "inherit",
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: "var(--stone)", marginBottom: 4, display: "block" };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex",
        alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "26px 28px 22px",
        width: 460, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)",
        display: "flex", flexDirection: "column", gap: 18, maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>New Project</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }}>
            <I.X size={18} color="var(--stone)" />
          </button>
        </div>

        {/* Personal / Group toggle */}
        <div style={{ display: "flex", gap: 0, background: "var(--bone)", borderRadius: 10, padding: 3, alignSelf: "flex-start" }}>
          {[
            { id: "personal", label: "Personal" },
            { id: "group",    label: "Group" },
          ].map((opt) => (
            <button key={opt.id} onClick={() => setKind(opt.id)} style={{
              padding: "6px 18px", fontSize: 12.5, fontWeight: kind === opt.id ? 600 : 500,
              background: kind === opt.id ? "var(--paper)" : "transparent",
              color: kind === opt.id ? course.color : "var(--stone)",
              border: "none", borderRadius: 8, cursor: "pointer",
              boxShadow: kind === opt.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              transition: "all 100ms",
            }}>{opt.label}</button>
          ))}
        </div>

        {/* Title */}
        <div>
          <label style={labelStyle}>Project title <span style={{ color: "#EF4444" }}>*</span></label>
          <input
            value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Unit 4 Study Guide"
            style={inputStyle}
          />
        </div>

        {/* Due date */}
        <div>
          <label style={labelStyle}>Due date <span style={{ color: "var(--stone)", fontWeight: 400 }}>(optional)</span></label>
          <input
            type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Description <span style={{ color: "var(--stone)", fontWeight: 400 }}>(optional)</span></label>
          <textarea
            value={desc} onChange={(e) => setDesc(e.target.value)}
            placeholder="What is this project about?"
            rows={3}
            style={{ ...inputStyle, resize: "vertical", lineHeight: 1.5 }}
          />
        </div>

        {/* Group members (only when group) */}
        {kind === "group" && (
          <div>
            <label style={labelStyle}>Add group members <span style={{ color: "var(--stone)", fontWeight: 400 }}>(optional)</span></label>
            <input
              value={members} onChange={(e) => setMembers(e.target.value)}
              placeholder="e.g. Maya P., Jordan T."
              style={inputStyle}
            />
          </div>
        )}

        {/* Supervisor note */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start",
          background: `${course.color}0F`, border: `1px solid ${course.color}25`,
          borderRadius: 10, padding: "10px 12px" }}>
          <I.Info size={14} color={course.color} style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "var(--stone)", lineHeight: 1.5 }}>
            {course.teacher} will be notified and will supervise this project.
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "9px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            background: "var(--bone)", border: "1.5px solid var(--mist)", borderRadius: 10, color: "var(--stone)",
          }}>Cancel</button>
          <button
            disabled={!canCreate}
            onClick={onClose}
            style={{
              padding: "9px 22px", fontSize: 13, fontWeight: 700, cursor: canCreate ? "pointer" : "not-allowed",
              background: canCreate ? course.color : "var(--mist)",
              border: "none", borderRadius: 10, color: "#fff",
              opacity: canCreate ? 1 : 0.7, transition: "background 120ms",
            }}
          >Create project</button>
        </div>
      </div>
    </div>
  );
}

function BioProjectCard({ project, course, isGroup }) {
  const [hovered, setHovered] = React.useState(false);
  const isPending = project.status === "Pending Approval";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--paper)", borderRadius: 14,
        border: `1.5px solid ${hovered ? course.color + "40" : "var(--mist)"}`,
        padding: "16px 18px", display: "flex", flexDirection: "column", gap: 10,
        transition: "border-color 150ms, box-shadow 150ms",
        boxShadow: hovered ? `0 4px 16px ${course.color}18` : "var(--shadow-card)",
      }}
    >
      {/* Top row: icon + title + status chip */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: project.type === "teacher" ? `${course.color}18` : "#8B5CF618",
          display: "flex", alignItems: "center", justifyContent: "center" }}>
          {project.type === "teacher"
            ? <I.Layers size={17} color={course.color} />
            : <I.User   size={17} color="#8B5CF6" />}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>{project.title}</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>
            {project.type === "teacher"
              ? <>Assigned by {project.assigner}</>
              : <>Created by {project.assigner}</>}
            {project.due && <> · Due {project.due}</>}
          </div>
        </div>
        {/* Status chip */}
        <div style={{
          flexShrink: 0, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.03em",
          padding: "3px 9px", borderRadius: 6,
          background: isPending ? "#F1F5F9" : `${course.color}18`,
          color: isPending ? "#64748B" : course.color,
          border: isPending ? "1px solid #E2E8F0" : `1px solid ${course.color}30`,
        }}>{project.status}</div>
      </div>

      {/* Supervisor chip (student projects only) */}
      {project.supervisor && (
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <I.GraduationCap size={12} color="var(--stone)" />
          <span style={{ fontSize: 11.5, color: "var(--stone)" }}>Supervised by {project.supervisor}</span>
        </div>
      )}

      {/* Awaiting approval banner (pending student group projects) */}
      {isPending && (
        <div style={{ display: "flex", alignItems: "center", gap: 6,
          background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 8, padding: "7px 10px" }}>
          <I.Clock size={12} color="#94A3B8" />
          <span style={{ fontSize: 11.5, color: "#64748B" }}>Awaiting {project.supervisor} approval</span>
        </div>
      )}

      {/* Group member avatars */}
      {isGroup && project.members && (
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ display: "flex", marginRight: 4 }}>
            {project.members.map((m, idx) => (
              <div key={idx} style={{
                width: 26, height: 26, borderRadius: "50%", border: "2px solid var(--paper)",
                background: `hsl(${m.hue}, 55%, 52%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9.5, fontWeight: 700, color: "#fff",
                marginLeft: idx === 0 ? 0 : -7,
                position: "relative", zIndex: project.members.length - idx,
              }}>{m.name.split(" ")[0][0]}{m.name.split(" ")[1] ? m.name.split(" ")[1][0] : ""}</div>
            ))}
          </div>
          <span style={{ fontSize: 11.5, color: "var(--stone)" }}>
            {project.members.map((m) => m.you ? "You" : m.name.split(" ")[0]).join(", ")}
          </span>
        </div>
      )}

      {/* Progress bar (non-pending) */}
      {!isPending && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: "var(--stone)" }}>Progress</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: course.color }}>{project.progress}%</span>
          </div>
          <div style={{ height: 6, background: "var(--mist)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${project.progress}%`,
              background: course.color, borderRadius: 4, transition: "width 400ms" }} />
          </div>
        </div>
      )}

      {/* View project button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button style={{
          padding: "7px 16px", fontSize: 12, fontWeight: 600,
          background: "transparent", border: `1.5px solid ${course.color}`,
          borderRadius: 8, color: course.color, cursor: "pointer",
          transition: "background 120ms",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = `${course.color}12`; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >View project</button>
      </div>
    </div>
  );
}

function BioProjectsView({ course }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <>
      {modalOpen && <BioNewProjectModal course={course} onClose={() => setModalOpen(false)} />}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Page header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>Projects</h2>
            <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2 }}>
              {course.name} · {course.teacher}
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 16px", fontSize: 13, fontWeight: 600,
              background: course.color, color: "#fff",
              border: "none", borderRadius: 10, cursor: "pointer",
              boxShadow: `0 2px 8px ${course.color}40`, transition: "background 120ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.93)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
          >
            <I.Plus size={14} color="#fff" />
            New project
          </button>
        </div>

        {/* Personal Projects */}
        <div style={{ background: "var(--paper)", borderRadius: 16, padding: "18px 20px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <I.User size={15} color={course.color} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Personal Projects</span>
            <span style={{ fontSize: 11.5, color: "var(--stone)", marginLeft: 2 }}>— just you</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {BIO_PERSONAL_PROJECTS.map((p) => (
              <BioProjectCard key={p.id} project={p} course={course} isGroup={false} />
            ))}
          </div>
        </div>

        {/* Group Projects */}
        <div style={{ background: "var(--paper)", borderRadius: 16, padding: "18px 20px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <I.Users size={15} color={course.color} />
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Group Projects</span>
            <span style={{ fontSize: 11.5, color: "var(--stone)", marginLeft: 2 }}>— with classmates</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {BIO_GROUP_PROJECTS.map((p) => (
              <BioProjectCard key={p.id} project={p} course={course} isGroup={true} />
            ))}
          </div>
        </div>

      </div>
    </>
  );
}

/* ─────────── Work tab — Assignments + Projects ─────────── */
function BioWorkView({ course }) {
  const C = course.color;
  const SectionDivider = ({ label }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "2px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--silver)", letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
    </div>
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <SectionDivider label="Assignments"/>
      <BioAssignmentsView course={course}/>
      <SectionDivider label="Projects"/>
      <BioProjectsView course={course}/>
    </div>
  );
}

/* ─────────── Documents view ─────────── */
function BioDocumentsView({ course }) {
  const [searchQuery,     setSearchQuery]     = React.useState("");
  const [searchAllActive, setSearchAllActive] = React.useState(false);

  const cats = [
    {
      title: "For Today's Class",
      icon: "Sparkle",
      tint: course.color,
      items: [
        { name: "Cellular Respiration — Lab Handout.pdf", sub: "Required for today · 4 pages",      kind: "pdf", from: "Mr. Evans", date: "Posted today",   urgent: true },
        { name: "Yeast Lab — Data Sheet.docx",            sub: "Fill in during lab · shared with group", kind: "doc", from: "Mr. Evans", date: "Posted today" },
        { name: "Safety Quick Reference.pdf",             sub: "Required reading before any lab",   kind: "pdf", from: "Mr. Evans", date: "Pinned" },
      ],
    },
    {
      title: "This Unit — Cells & Energy",
      icon: "Atom",
      tint: "#0EA5E9",
      items: [
        { name: "Unit 4 Slides — ATP & Respiration.pdf", sub: "Mr. Evans · 32 slides",  kind: "pdf",   from: "Mr. Evans", date: "2 days ago" },
        { name: "Krebs Cycle Diagram.png",                sub: "Annotatable — due Friday", kind: "image", from: "Mr. Evans", date: "Yesterday" },
        { name: "Cell Cycle Lecture.mp4",                  sub: "23:14 · captioned",      kind: "video", from: "Mr. Evans", date: "3 days ago" },
        { name: "Photosynthesis Concept Map.png",          sub: "Your annotated copy",    kind: "image", from: "You",       date: "Oct 14" },
        { name: "Cell Structure Lab Report.docx",         sub: "Submitted · awaiting feedback", kind: "doc", from: "You",   date: "Yesterday, 3:20 PM" },
      ],
    },
    {
      title: "Reference & Tools",
      icon: "Book",
      tint: "#F59E0B",
      items: [
        { name: "Course Syllabus 2025–26.pdf",            sub: "Pinned · grading & late policy",     kind: "pdf",  from: "Mr. Evans", date: "Sep 2" },
        { name: "Bio Glossary (Unit 4).pdf",               sub: "32 terms · ATP, NADH, glycolysis…", kind: "pdf",  from: "Mr. Evans", date: "Sep 5" },
        { name: "Periodic Table of Biology.png",           sub: "Quick-reference poster",             kind: "image", from: "Mr. Evans", date: "Sep 5" },
        { name: "Lab Notebook Template.docx",              sub: "Use for every lab write-up",         kind: "doc",   from: "Mr. Evans", date: "Sep 8" },
      ],
    },
    {
      title: "Your Notes & Submissions",
      icon: "Notes",
      tint: "#8B5CF6",
      items: [
        { name: "My Bio Notebook — Unit 4.notes",         sub: "12 entries · last edited 2 hours ago", kind: "notes", from: "You", date: "Today" },
        { name: "Cell Respiration — Pre-lab Notes.pdf",   sub: "Self-generated study sheet",            kind: "pdf",  from: "You", date: "Yesterday" },
      ],
    },
  ];

  // Flat pool used when "Search all" is active
  const bioFiles = cats.flatMap((cat) =>
    cat.items.map((it) => ({ ...it, classTag: "Biology", classColor: "#10B981" }))
  );
  const otherFiles = [
    { name: "Quadratic Functions — Study Guide.pdf",  sub: "Unit 3 test review · 8 pages",       kind: "pdf",   from: "Ms. Chen",     date: "Oct 11", classTag: "Algebra II",  classColor: "#F59E0B" },
    { name: "Polynomial Long Division — Practice.docx", sub: "With step-by-step worked examples", kind: "doc",   from: "You",          date: "Oct 8",  classTag: "Algebra II",  classColor: "#F59E0B" },
    { name: "The Great Gatsby — Essay Outline.docx",  sub: "Draft 2 · Due Oct 20",               kind: "doc",   from: "You",          date: "Oct 13", classTag: "English 10",  classColor: "#0EA5E9" },
    { name: "Romeo & Juliet — Act 3 Close Reading.pdf", sub: "Annotated packet",                 kind: "pdf",   from: "You",          date: "Oct 7",  classTag: "English 10",  classColor: "#0EA5E9" },
    { name: "Spanish Vocabulary — Unit 5.pdf",        sub: "Flashcard set · 40 words",           kind: "pdf",   from: "Sra. Morales", date: "Oct 10", classTag: "Spanish II",  classColor: "#EC4899" },
    { name: "WWII Primary Sources Packet.pdf",        sub: "Annotated · Chapters 12–14",         kind: "pdf",   from: "Mr. Kim",      date: "Oct 9",  classTag: "US History",  classColor: "#8B5CF6" },
    { name: "Cold War Timeline — Notes.docx",         sub: "Your notes from Oct 6 class",        kind: "doc",   from: "You",          date: "Oct 6",  classTag: "US History",  classColor: "#8B5CF6" },
  ];
  const allPool = [...bioFiles, ...otherFiles];

  const q = searchQuery.trim().toLowerCase();
  const filteredAll = q
    ? allPool.filter((f) => f.name.toLowerCase().includes(q) || f.sub.toLowerCase().includes(q))
    : allPool;

  // Per-category filtered list for normal (Biology-only) mode
  const filteredCats = cats.map((cat) => ({
    ...cat,
    items: q ? cat.items.filter((it) => it.name.toLowerCase().includes(q) || it.sub.toLowerCase().includes(q)) : cat.items,
  })).filter((cat) => cat.items.length > 0);

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>

      {/* Search + filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "0 12px", height: 34, background: "var(--bone)", borderRadius: 10 }}>
          <I.Search size={14} color="var(--stone)"/>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchAllActive ? "Search all your files…" : "Search Biology documents…"}
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12.5, color: "var(--ink)" }}
          />
        </div>
        <button className="btn btn-secondary btn-sm" style={{ height: 34 }}><I.Filter size={12} color="var(--slate)"/> All types</button>
        <button className="btn btn-secondary btn-sm" style={{ height: 34 }}><I.Calendar size={12} color="var(--slate)"/> Newest</button>
        <button className="btn btn-primary btn-sm" style={{ height: 34, background: course.color, borderColor: "#059669" }}><I.Upload size={12} color="#fff"/> Upload</button>
      </div>

      {/* Scope toggle — Biology only / All my files */}
      <div style={{ display: "flex", marginBottom: searchAllActive ? 10 : 16 }}>
        <div style={{ display: "flex", gap: 3, padding: 3, background: "var(--bone)", borderRadius: 10, border: "1px solid var(--mist)" }}>
          {[
            { id: false, label: "Biology only" },
            { id: true,  label: "All my files" },
          ].map(({ id, label }) => {
            const active = searchAllActive === id;
            return (
              <button
                key={String(id)}
                onClick={() => setSearchAllActive(id)}
                style={{
                  padding: "5px 16px",
                  borderRadius: 7,
                  border: "none",
                  background: active ? "var(--paper)" : "transparent",
                  color: active ? course.color : "var(--stone)",
                  fontSize: 12.5,
                  fontWeight: active ? 600 : 500,
                  cursor: "pointer",
                  boxShadow: active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  transition: "background 120ms, color 120ms, box-shadow 120ms",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* "Searching all files" banner */}
      {searchAllActive && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, padding: "7px 12px", background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 8 }}>
          <I.Globe size={13} color="#3B82F6"/>
          <span style={{ flex: 1, fontSize: 12, color: "#1D4ED8", fontWeight: 500 }}>
            Searching across all your files — not just Biology
          </span>
          <button
            onClick={() => { setSearchAllActive(false); setSearchQuery(""); }}
            style={{ padding: 0, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
            title="Return to Biology documents"
          >
            <I.X size={13} color="#3B82F6"/>
          </button>
        </div>
      )}

      {/* Search-all results */}
      {searchAllActive && (
        <div>
          {!q ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--stone)", fontSize: 13 }}>
              <I.Search size={22} color="var(--silver)" style={{ marginBottom: 8, display: "block", margin: "0 auto 8px" }}/>
              Start typing to search across all your files
            </div>
          ) : filteredAll.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--stone)", fontSize: 13 }}>
              No files matched <strong>"{searchQuery}"</strong>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", fontWeight: 500, marginBottom: 10 }}>
                {filteredAll.length} result{filteredAll.length !== 1 ? "s" : ""} across all classes
              </div>
              <div className="bio-doc-grid">
                {filteredAll.map((it, i) => (
                  <BioDocCard key={i} {...it} courseColor={it.classColor || course.color} classTag={it.classTag} classColor={it.classColor}/>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Normal Biology-only view */}
      {!searchAllActive && (
        filteredCats.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "var(--stone)", fontSize: 13 }}>
            No Biology documents matched <strong>"{searchQuery}"</strong>
            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => setSearchAllActive(true)}
                style={{ fontSize: 12, color: "#3B82F6", background: "transparent", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: 500 }}
              >
                Search all your files instead
              </button>
            </div>
          </div>
        ) : (
          filteredCats.map((cat, i) => (
            <div key={i} style={{ marginBottom: i === filteredCats.length - 1 ? 0 : 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: `${cat.tint}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {React.createElement(I[cat.icon], { size: 12, color: cat.tint })}
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{cat.title}</h3>
                <span style={{ fontSize: 11, color: "var(--silver)" }}>{cat.items.length}</span>
              </div>
              <div className="bio-doc-grid">
                {cat.items.map((it, j) => <BioDocCard key={j} {...it} courseColor={course.color}/>)}
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
}

function BioDocCard({ name, sub, kind, from, date, urgent, courseColor, classTag, classColor }) {
  const KIND = {
    pdf:   { icon: "Document", color: "#EF4444" },
    doc:   { icon: "Document", color: "#0EA5E9" },
    image: { icon: "Image",    color: "#8B5CF6" },
    video: { icon: "Camera",   color: "#F59E0B" },
    notes: { icon: "Notes",    color: courseColor },
  };
  const k = KIND[kind] || KIND.doc;
  return (
    <div style={{
      display: "flex", gap: 10, padding: "10px 12px",
      background: urgent ? `${courseColor}0A` : "var(--paper)",
      border: `1px solid ${urgent ? courseColor + "40" : "var(--mist)"}`,
      borderRadius: 10,
      alignItems: "center",
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${k.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {React.createElement(I[k.icon], { size: 15, color: k.color })}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {name}
          </span>
          {urgent && <span style={{ fontSize: 9, padding: "1px 5px", background: courseColor, color: "#fff", borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em", flexShrink: 0 }}>NEEDED NOW</span>}
          {classTag && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "1px 7px", background: `${classColor}18`, color: classColor, borderRadius: 999, fontSize: 10.5, fontWeight: 600, flexShrink: 0 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: classColor }}/>
              {classTag}
            </span>
          )}
        </div>
        <div style={{ fontSize: 11, color: "var(--stone)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</div>
        <div style={{ fontSize: 10.5, color: "var(--silver)", marginTop: 1 }}>{from} · {date}</div>
      </div>
      <button style={{ padding: 6, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.Download size={13} color="var(--silver)"/></button>
    </div>
  );
}

/* ─────────── Class Tools view ─────────── */
function BioToolsView({ course }) {
  const groups = [
    {
      title: "Writing & Notes",
      tools: [
        { name: "Lab Notebook", sub: "Open your active Bio notebook", icon: "Notes",      color: course.color, primary: true },
        { name: "Quick Note",  sub: "Capture a thought, link to today's lesson", icon: "Edit", color: "#8B5CF6" },
        { name: "Voice Memo",  sub: "Record up to 5 minutes — auto-transcribed", icon: "Mic",  color: "#EF4444" },
        { name: "Draw / Diagram", sub: "Sketch a diagram on a blank page",   icon: "Image",     color: "#F59E0B" },
      ],
    },
    {
      title: "Calculate & Measure",
      tools: [
        { name: "Scientific Calculator", sub: "Includes log, ln, scientific notation",   icon: "Calculator", color: "#0EA5E9" },
        { name: "Unit Converter",        sub: "mL ↔ L, °C ↔ K, molarity, dilution",     icon: "Refresh",    color: "#10B981" },
        { name: "Lab Timer",              sub: "Up to 4 simultaneous timers",            icon: "Clock",      color: "#F59E0B" },
        { name: "Stopwatch",              sub: "For reaction-rate measurements",         icon: "Time",       color: "#94A3B8" },
      ],
    },
    {
      title: "Annotate & Read",
      tools: [
        { name: "PDF Annotator",          sub: "Highlight today's lab handout",  icon: "Edit",       color: "#10B981" },
        { name: "Highlighter (live)",     sub: "Mark up shared docs with class", icon: "Sparkle",    color: "#FBBF24" },
        { name: "Read-Aloud",             sub: "Hear any document spoken",       icon: "Speaker",    color: "#8B5CF6" },
        { name: "Glossary Lookup",        sub: "Define any Bio term instantly",  icon: "Book",       color: "#0EA5E9" },
      ],
    },
    {
      title: "Capture & Share",
      tools: [
        { name: "Lab Camera",             sub: "Photo straight into lab report",  icon: "Camera",   color: "#EF4444" },
        { name: "Microscope Capture",     sub: "Stream from station microscope",  icon: "Eye",      color: "#0EA5E9" },
        { name: "Share to Group",         sub: "Send a file to Maya & Jordan",     icon: "Send",     color: "#10B981" },
        { name: "Submit Work",             sub: "Hand in to Mr. Evans",            icon: "Upload",   color: course.color },
      ],
    },
    {
      title: "Bio-specific",
      tools: [
        { name: "Periodic Table",         sub: "Including biology-relevant ions",  icon: "Atom",     color: "#8B5CF6" },
        { name: "Cell Explorer (3D)",     sub: "Interactive cell organelles",      icon: "Globe",    color: "#10B981" },
        { name: "DNA / Codon Table",      sub: "Translate sequences",              icon: "Hashtag",  color: "#EC4899" },
        { name: "Lab Safety Card",         sub: "Spill, fire, eye-wash quick ref",  icon: "Shield",   color: "#EF4444" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Quick-launch row */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Quick Launch</h3>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Your most-used tools in Biology</span>
        </div>
        <div className="bio-quicklaunch-grid">
          <BioQuickTool icon="Notes"      label="Lab Notebook"   color={course.color} active/>
          <BioQuickTool icon="Calculator" label="Calculator"     color="#0EA5E9"/>
          <BioQuickTool icon="Clock"      label="Lab Timer"      color="#F59E0B" badge="2 active"/>
          <BioQuickTool icon="Camera"     label="Lab Camera"     color="#EF4444"/>
          <BioQuickTool icon="Edit"       label="Note Taking"    color="#8B5CF6"/>
        </div>
      </div>

      {/* All tools by group */}
      {groups.map((g, i) => (
        <div key={i} style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
          <h3 className="t-h3" style={{ fontSize: 13, margin: "0 0 10px" }}>{g.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {g.tools.map((t, j) => <BioToolRow key={j} {...t} courseColor={course.color}/>)}
          </div>
        </div>
      ))}

      {/* ── Documents section ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "4px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--silver)", letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Documents</span>
        <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
      </div>
      <BioDocumentsView course={course}/>

    </div>
  );
}

function BioQuickTool({ icon, label, color, badge, active }) {
  const Icon = I[icon];
  return (
    <button style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      padding: "12px 8px",
      background: active ? `${color}10` : "var(--paper)",
      border: `1px solid ${active ? color + "40" : "var(--mist)"}`,
      borderRadius: 10,
      cursor: "pointer",
      position: "relative",
    }}>
      {badge && <span style={{
        position: "absolute", top: 6, right: 6,
        fontSize: 9, padding: "1px 5px", background: color, color: "#fff",
        borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em",
      }}>{badge}</span>}
      <div style={{ width: 38, height: 38, borderRadius: 9, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={18} color={color}/>
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)", textAlign: "center" }}>{label}</div>
    </button>
  );
}

function BioToolRow({ name, sub, icon, color, primary, courseColor, soon }) {
  const Icon = I[icon];
  return (
    <button style={{
      display: "flex", gap: 10, padding: "10px 12px",
      background: primary ? `${courseColor}0A` : "var(--bone)",
      border: `1px solid ${primary ? courseColor + "30" : "transparent"}`,
      borderRadius: 10, cursor: soon ? "default" : "pointer", textAlign: "left",
      alignItems: "center",
      opacity: soon ? 0.75 : 1,
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={15} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: 6 }}>
          {name}
          {soon && <span style={{ fontSize: 8.5, padding: "1px 5px", background: "var(--mist)", color: "var(--stone)", borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em" }}>SOON</span>}
        </div>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>{sub}</div>
      </div>
      <I.ChevronRight size={13} color="var(--silver)"/>
    </button>
  );
}

/* ─────────── Assignments + Grades (compact) ─────────── */
function BioAssignmentsView({ course }) {
  const items = [
    { name: "Cell Structure Quiz",            sub: "Unit 4 · Quiz",       due: "Due Today, 11:59 PM",   status: "Not started", statusColor: "#EF4444", points: "/ 30",  state: "open" },
    { name: "Cellular Respiration Lab Report", sub: "Unit 4 · Lab",        due: "Due Friday, 11:59 PM", status: "Draft",       statusColor: "#F59E0B", points: "/ 50",  state: "open" },
    { name: "Krebs Cycle Diagram (annotate)",  sub: "Unit 4 · Practice",   due: "Due Mon, Oct 28",      status: "Not started", statusColor: "#94A3B8", points: "/ 20",  state: "open" },
    { name: "Photosynthesis Concept Map",      sub: "Unit 3 · Practice",   due: "Submitted Oct 14",     status: "Graded",      statusColor: "#10B981", points: "18 / 20", state: "done" },
    { name: "Unit 3 Test — Photosynthesis",     sub: "Unit 3 · Test",       due: "Submitted Oct 9",      status: "Graded",      statusColor: "#10B981", points: "88 / 100", state: "done" },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, borderBottom: "1px solid var(--mist)" }}>
        {["All Assignments", "Due Soon (3)", "Submitted", "Graded"].map((it, i) => (
          <button key={i} style={{
            padding: "6px 0", fontSize: 12, fontWeight: i === 0 ? 600 : 500,
            color: i === 0 ? course.color : "var(--stone)",
            border: "none", background: "transparent", cursor: "pointer",
            borderBottom: i === 0 ? `2px solid ${course.color}` : "2px solid transparent",
            marginBottom: -1,
          }}>{it}</button>
        ))}
      </div>
      <div>
        {items.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 4px", borderBottom: i === items.length - 1 ? "none" : "1px solid var(--mist)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${a.statusColor}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I.Document size={15} color={a.statusColor}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{a.sub} · {a.due}</div>
            </div>
            <div style={{ width: 110, textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: a.statusColor }}>{a.points}</div>
              <div style={{ fontSize: 10.5, color: a.statusColor, fontWeight: 600 }}>{a.status}</div>
            </div>
            <button className={a.state === "open" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"} style={{ height: 28, fontSize: 11.5, padding: "0 12px", background: a.state === "open" ? course.color : undefined, borderColor: a.state === "open" ? "#059669" : undefined }}>
              {a.state === "open" ? "Start" : "View"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Support & Growth tab ─────────── */
function BioSupportGrowthView({ course }) {
  const [helpType, setHelpType] = React.useState("");
  const [helpNote, setHelpNote] = React.useState("");
  const [sent, setSent] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);

  const contacts = [
    { name: "Ms. Karen Liu",       role: "Special Education Coordinator", hue: 280 },
    { name: "Mr. Tony Bravo",      role: "Resource Specialist",           hue: 160 },
    { name: "Dr. Maria Hernandez", role: "Academic Counselor",            hue: 30  },
  ];

  const prevRequests = [
    {
      type: "Understanding the material",
      date: "May 5, 2026",
      status: "Resolved",
      note: "Needed help with photosynthesis light reactions.",
    },
    {
      type: "Accommodation reminder",
      date: "May 12, 2026",
      status: "In Progress",
      note: "Extended time reminder for upcoming Unit 4 quiz.",
    },
  ];

  const statusColor = (s) =>
    s === "Resolved" ? "#10B981" : s === "In Progress" ? "#0EA5E9" : "#94A3B8";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── SECTION DIVIDER ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "2px 0" }}>
        <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--silver)", letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Growth</span>
        <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
      </div>

      {/* ── GRADE METRICS ── */}
      <BioGradesView course={course}/>

      {/* ── TWO COLUMNS: Extra Help | Teacher Feedback ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start" }}>

        {/* Extra Help */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "20px 22px", boxShadow: "var(--shadow-card)" }}>

        {/* Section header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.LifeBuoy size={15} color="#3B82F6"/>
          </div>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Extra Help</h2>
        </div>
        <p style={{ fontSize: 13, color: "var(--stone)", margin: "0 0 18px 42px", lineHeight: 1.5 }}>
          Your support team is here to help you succeed in this class.
        </p>

        {/* Support contacts — compact horizontal rows */}
        <div style={{
          background: "var(--bone)", borderRadius: 10, border: "1px solid var(--mist)",
          overflow: "hidden", marginBottom: 14,
        }}>
          {contacts.map((ct, i) => (
            <div key={ct.name} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 14px",
              borderTop: i > 0 ? "1px solid var(--mist)" : "none",
            }}>
              <StockPortrait name={ct.name} hue={ct.hue} size={32}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{ct.name}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{ct.role}</div>
              </div>
              <button style={{
                fontSize: 11, padding: "4px 12px", flexShrink: 0,
                background: "var(--paper)", border: "1px solid var(--mist)",
                borderRadius: 6, color: "var(--slate)", fontWeight: 600, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 4,
              }}>
                <I.MessageSquare size={10} color="var(--stone)"/> Message
              </button>
            </div>
          ))}
        </div>

        {/* Toggle link */}
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: "none", border: "none", padding: 0, cursor: "pointer",
            fontSize: 12.5, color: "var(--stone)", fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 5,
            fontFamily: "inherit",
          }}
        >
          {showForm ? (
            <>
              <I.ChevronUp size={13} color="var(--silver)"/>
              <span>Hide</span>
            </>
          ) : (
            <>
              <span>Request extra help</span>
              <I.ChevronDown size={13} color="var(--silver)"/>
            </>
          )}
        </button>

        {/* Expandable: request form + previous requests */}
        {showForm && (
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Request form */}
            {sent ? (
              <div style={{
                background: "#F0FDF4", borderRadius: 10, padding: "14px 16px",
                display: "flex", alignItems: "center", gap: 10,
                border: "1px solid #BBF7D0",
              }}>
                <I.CheckCircle size={16} color="#10B981" style={{ flexShrink: 0 }}/>
                <span style={{ fontSize: 13, color: "#065F46", fontWeight: 600 }}>
                  Request sent — your support team will follow up soon.
                </span>
              </div>
            ) : (
              <div style={{ background: "var(--bone)", borderRadius: 12, padding: "16px 18px", border: "1px solid var(--mist)" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Request Extra Help</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div>
                    <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--slate)", display: "block", marginBottom: 4 }}>
                      Type of help needed
                    </label>
                    <select value={helpType} onChange={(e) => setHelpType(e.target.value)} style={{
                      width: "100%", fontSize: 12.5, padding: "8px 10px",
                      border: "1px solid var(--mist)", borderRadius: 8,
                      background: "var(--paper)", color: helpType ? "var(--ink)" : "var(--stone)",
                      cursor: "pointer",
                    }}>
                      <option value="">Select a type…</option>
                      <option>Understanding the material</option>
                      <option>Assignment support</option>
                      <option>Accommodation reminder</option>
                      <option>Study skills</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--slate)", display: "block", marginBottom: 4 }}>
                      Short note <span style={{ fontWeight: 400, color: "var(--silver)" }}>(optional)</span>
                    </label>
                    <textarea
                      value={helpNote}
                      onChange={(e) => setHelpNote(e.target.value)}
                      placeholder="Add any details that would help your team…"
                      rows={3}
                      style={{
                        width: "100%", boxSizing: "border-box", resize: "vertical",
                        fontSize: 12.5, padding: "8px 10px",
                        border: "1px solid var(--mist)", borderRadius: 8,
                        background: "var(--paper)", color: "var(--ink)",
                        fontFamily: "inherit", lineHeight: 1.5,
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      disabled={!helpType}
                      onClick={() => setSent(true)}
                      style={{
                        fontSize: 12, padding: "7px 18px",
                        background: helpType ? course.color : "var(--mist)",
                        border: "none", borderRadius: 8,
                        color: helpType ? "#fff" : "var(--silver)",
                        fontWeight: 700, cursor: helpType ? "pointer" : "default",
                        transition: "background 0.15s",
                      }}
                    >Send request</button>
                  </div>
                </div>
              </div>
            )}

            {/* Previous requests */}
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Previous requests</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {prevRequests.map((r, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 12,
                    background: "var(--bone)", borderRadius: 10, padding: "10px 14px",
                    border: "1px solid var(--mist)",
                  }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: statusColor(r.status), flexShrink: 0,
                    }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{r.type}</div>
                      <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>{r.note}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontSize: 10.5, color: "var(--silver)" }}>{r.date}</div>
                      <span style={{
                        display: "inline-block", marginTop: 3,
                        fontSize: 10, padding: "2px 8px",
                        background: `${statusColor(r.status)}1A`,
                        color: statusColor(r.status),
                        borderRadius: 4, fontWeight: 700, letterSpacing: "0.03em",
                      }}>{r.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

        {/* Teacher Feedback */}
        <BioTeacherFeedback course={course}/>

      </div>

      {/* ── WAYS TO IMPROVE ── */}
      <BioWaysToImprove course={course}/>

    </div>
  );
}

function BioGradesView({ course }) {
  const cats = [
    { name: "Tests",         weight: 35, score: 88, color: course.color },
    { name: "Labs",          weight: 30, score: 84, color: "#0EA5E9" },
    { name: "Quizzes",       weight: 20, score: 80, color: "#F59E0B" },
    { name: "Participation", weight: 15, score: 95, color: "#8B5CF6" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Top stat row: current grade · course progress · grade breakdown */}
      <div className="bio-growth-top" style={{ display: "grid", gridTemplateColumns: "260px 260px 1fr", gap: 14 }}>
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Current Grade</div>
          <Donut size={140} value={86} color={course.color}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>86<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: course.color }}>B</div>
            </div>
          </Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>↑ 2% from last month</div>
        </div>
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Course Progress</div>
          <Donut size={140} value={82} color="#0EA5E9">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>82<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#0EA5E9" }}>Unit 4 of 6</div>
            </div>
          </Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>14 of 17 lessons complete</div>
        </div>
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Grade Breakdown</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cats.map((cat) => (
              <div key={cat.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{cat.name} <span style={{ color: "var(--silver)", fontWeight: 500 }}>· {cat.weight}% of grade</span></span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: cat.color }}>{cat.score}%</span>
                </div>
                <ProgressBar value={cat.score} color={cat.color} height={6}/>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

function BioWaysToImprove({ course }) {
  const items = [
    {
      kind: "review",
      label: "Review",
      title: "Revisit the Krebs Cycle (your weakest area)",
      sub: "Quiz scores: 64% on cycle steps · 5 short videos + interactive diagram",
      meta: "≈ 25 min",
      icon: "Atom",
      color: "#8B5CF6",
    },
    {
      kind: "practice",
      label: "Practice Quiz",
      title: "Cellular Respiration — adaptive 12-question set",
      sub: "Targets concepts you missed on Quiz 3 · auto-grades + explains each answer",
      meta: "≈ 15 min",
      icon: "ListChecks",
      color: "#F59E0B",
    },
    {
      kind: "session",
      label: "Study Session",
      title: "Join Maya & Jordan — Friday 3:30 PM, Library",
      sub: "Group review for Unit 4 test · Mr. Evans recommends pairing with Maya (94%)",
      meta: "60 min",
      icon: "Users",
      color: "#10B981",
    },
    {
      kind: "tutor",
      label: "AI Tutor",
      title: "Ask Bio Tutor: \"Walk me through ATP yield step-by-step\"",
      sub: "You've asked about ATP twice this week — a focused walkthrough may help it click.",
      meta: "≈ 10 min",
      icon: "Sparkle",
      color: "#7C3AED",
    },
  ];
  return (
    <div style={{
      background: `linear-gradient(135deg, #F5F3FF 0%, ${course.color}10 100%)`,
      borderRadius: 14, padding: "18px 22px",
      border: `1px solid ${course.color}25`,
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #A78BFA, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.Sparkle size={15} color="#fff"/>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Ways to Improve</h2>
              <span style={{ fontSize: 9, padding: "2px 6px", background: "#EDE9FE", color: "#7C3AED", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Personalized to your weak areas in Cellular Respiration</div>
          </div>
        </div>
        <button style={{ fontSize: 11, padding: "6px 10px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8, color: "var(--slate)", cursor: "pointer", fontWeight: 600 }}>Refresh suggestions</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="bio-improve-grid">
        {items.map((it, i) => {
          const Icon = I[it.icon];
          return (
            <div key={i} style={{
              background: "var(--paper)", borderRadius: 12, padding: "12px 14px",
              border: "1px solid var(--mist)",
              display: "flex", gap: 11, alignItems: "flex-start",
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${it.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={16} color={it.color}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 9.5, padding: "1px 6px", background: `${it.color}1A`, color: it.color, borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{it.label}</span>
                  <span style={{ fontSize: 10.5, color: "var(--silver)" }}>· {it.meta}</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", marginBottom: 3, lineHeight: 1.35 }}>{it.title}</div>
                <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.4 }}>{it.sub}</div>
                <button style={{
                  marginTop: 8, fontSize: 11, padding: "5px 10px",
                  background: it.color, border: "none", borderRadius: 7,
                  color: "#fff", fontWeight: 700, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: 4,
                }}>
                  Start <I.ArrowRight size={11} color="#fff"/>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BioTeacherFeedback({ course }) {
  const items = [
    {
      on: "Photosynthesis Concept Map",
      onMeta: "Practice · 18 / 20 · Oct 14",
      tone: "praise",
      msg: "Beautiful work on the light-dependent reactions side — your arrows clearly show the proton gradient. Tighten the Calvin cycle labels next time.",
      time: "2 weeks ago",
    },
    {
      on: "Quiz 3 — Glycolysis",
      onMeta: "Quiz · 24 / 30 · Oct 21",
      tone: "growth",
      msg: "You nailed the ATP/ADP cycle questions. The two you missed were both on substrate-level phosphorylation — let's run through that together Friday.",
      time: "5 days ago",
    },
    {
      on: "Lab 4 — Yeast Fermentation (in progress)",
      onMeta: "Lab · draft",
      tone: "neutral",
      msg: "Strong predictions in the pre-lab. As you write up results, focus on WHY the 10% bubbled fastest — link back to enzyme kinetics from Tuesday.",
      time: "yesterday",
    },
  ];
  const toneStyle = (tone) => ({
    praise:  { color: "#10B981", label: "Praise"      },
    growth:  { color: "#F59E0B", label: "Growth area" },
    neutral: { color: course.color, label: "Note"     },
  }[tone]);
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <StockPortrait name="Mr. Evans" hue={220} size={36}/>
          <div>
            <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Teacher Feedback</h2>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Recent comments from Mr. Evans</div>
          </div>
        </div>
        <a href="#" style={{ fontSize: 11.5, color: course.color, textDecoration: "none", fontWeight: 600 }}>View all →</a>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((f, i) => {
          const t = toneStyle(f.tone);
          return (
            <div key={i} style={{
              display: "flex", gap: 12,
              padding: "12px 14px",
              background: "var(--bone)", borderRadius: 10,
              borderLeft: `3px solid ${t.color}`,
            }}>
              <I.Quote size={18} color={t.color} style={{ flexShrink: 0, marginTop: 2 }}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{f.on}</span>
                  <span style={{ fontSize: 10.5, color: "var(--silver)" }}>{f.onMeta}</span>
                  <span style={{ fontSize: 9.5, padding: "1px 6px", background: `${t.color}1A`, color: t.color, borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{t.label}</span>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.5 }}>{f.msg}</div>
                <div style={{ fontSize: 10.5, color: "var(--silver)", marginTop: 6 }}>{f.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────── RIGHT RAIL — Class Chat (always docked) ─────────── */
function BioRightRail({ course, onSwitchTab }) {
  const [tab, setTab] = React.useState("chat"); // chat · channels · people

  return (
    <div style={{
      background: "transparent", borderRadius: 14,
      overflow: "hidden",
      flex: 1, minHeight: 0,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--mist)", background: "var(--bone)", alignItems: "center" }}>
        {[
          { id: "chat",     label: "Class Chat" },
          { id: "channels", label: "Channels" },
          { id: "people",   label: "People" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 6px",
            background: tab === t.id ? "var(--paper)" : "transparent",
            border: "none",
            borderBottom: tab === t.id ? `2px solid ${course.color}` : "2px solid transparent",
            fontSize: 11.5, fontWeight: tab === t.id ? 700 : 500,
            color: tab === t.id ? "var(--ink)" : "var(--stone)",
            cursor: "pointer",
          }}>{t.label}</button>
        ))}
        {onSwitchTab && (
          <button
            onClick={() => onSwitchTab("comms")}
            title="Open Communication tab"
            style={{ padding: "8px 10px", background: "transparent", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center",
              color: "var(--stone)", flexShrink: 0 }}
          >
            <I.Expand size={13} color="var(--stone)" />
          </button>
        )}
      </div>
      {tab === "chat" && (
        <div style={{
          padding: "8px 12px", background: `${course.color}0F`,
          borderBottom: "1px solid var(--mist)",
          display: "flex", alignItems: "center", gap: 8, fontSize: 11.5,
        }}>
          <I.Pin size={12} color={course.color}/>
          <span style={{ color: "var(--stone)" }}>Live during class — moderated by</span>
          <b style={{ color: "var(--ink)" }}>Mr. Evans</b>
          <span style={{ marginLeft: "auto", color: "#10B981", fontWeight: 600 }}>● 24 online</span>
        </div>
      )}

      {tab === "chat"     && <BioChatPanel course={course}/>}
      {tab === "channels" && <BioChannelsPanel course={course}/>}
      {tab === "people"   && <BioPeoplePanel course={course}/>}
    </div>
  );
}

function BioChatPanel({ course }) {
  const [msgs, setMsgs] = React.useState([
    { who: "Mr. Evans",   role: "teacher", msg: "Goggles on, please. We're starting yeast prep at the 10-minute mark.", time: "10:21 AM", hue: 220 },
    { who: "Maya P.",     msg: "Bench 4 — got the yeast packets from the front 👍",   time: "10:23 AM", hue: 30 },
    { who: "Jordan T.",   msg: "Timers running. 5% sugar started.",                     time: "10:26 AM", hue: 280 },
    { who: "Mr. Evans",   role: "teacher", msg: "Quick check: who can tell me what gas the bubbles are?", time: "10:28 AM", hue: 220 },
    { who: "You",         self: true, msg: "CO₂ — from glycolysis + fermentation.",     time: "10:28 AM" },
    { who: "Mr. Evans",   role: "teacher", msg: "Exactly 🎉 — log it on your data sheet.", time: "10:29 AM", hue: 220, reactions: { "🎉": 4, "💯": 2 } },
    { who: "Aisha B.",    msg: "Our 10% bubbles are way faster than 5% — is that expected?", time: "10:31 AM", hue: 320 },
    { who: "Bio Tutor",   role: "ai", msg: "Yes — more sugar means more substrate for glycolysis, until enzymes saturate. Compare with 20% to see the plateau.", time: "10:31 AM" },
  ]);
  const [draft, setDraft] = React.useState("");
  const scroller = React.useRef(null);
  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [msgs.length]);

  const send = () => {
    if (!draft.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMsgs([...msgs, { who: "You", self: true, msg: draft.trim(), time }]);
    setDraft("");
  };

  return (
    <>
      <div ref={scroller} style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Day separator */}
        <div style={{ textAlign: "center", fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "4px 0" }}>
          ─── Today, Period 3 ───
        </div>

        {msgs.map((m, i) => <BioChatBubble key={i} m={m} course={course}/>)}
      </div>

      {/* Composer */}
      <div style={{ borderTop: "1px solid var(--mist)", padding: "10px 12px", background: "var(--paper)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <BioChip icon="Atom"      label="Question for Mr. Evans"  color={course.color}/>
          <BioChip icon="Sparkle"   label="Ask Bio Tutor"            color="#8B5CF6"/>
          <BioChip icon="Hand"      label="Raise hand"                color="#F59E0B"/>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "6px 8px", background: "var(--bone)", borderRadius: 10 }}>
          <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.Paperclip size={14} color="var(--stone)"/></button>
          <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.Image     size={14} color="var(--stone)"/></button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="Message your class…"
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "var(--ink)" }}
          />
          <button onClick={send} style={{
            background: course.color, border: "none", borderRadius: 7,
            padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
          }}>
            <I.Send size={12} color="#fff"/>
          </button>
        </div>
        <div style={{ fontSize: 10, color: "var(--silver)", marginTop: 6, textAlign: "center" }}>
          Class chat is logged. Be respectful.
        </div>
      </div>
    </>
  );
}

function BioChatBubble({ m, course }) {
  if (m.self) {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: "85%" }}>
          <div style={{
            background: course.color, color: "#fff",
            borderRadius: "12px 12px 2px 12px",
            padding: "8px 12px",
            fontSize: 12, lineHeight: 1.45,
          }}>{m.msg}</div>
          <div style={{ fontSize: 10, color: "var(--silver)", textAlign: "right", marginTop: 2 }}>{m.time}</div>
        </div>
      </div>
    );
  }
  if (m.role === "ai") {
    return (
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <I.Sparkle size={13} color="#fff"/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5 }}>
            <b style={{ color: "#7C3AED" }}>{m.who}</b>
            <span style={{ marginLeft: 4, fontSize: 9, padding: "1px 4px", background: "#EDE9FE", color: "#7C3AED", borderRadius: 3, fontWeight: 700 }}>AI</span>
            <span style={{ marginLeft: 6, fontSize: 10, color: "var(--silver)" }}>{m.time}</span>
          </div>
          <div style={{
            fontSize: 12, color: "var(--slate)", lineHeight: 1.45, marginTop: 2,
            background: "#F5F3FF", padding: "8px 10px", borderRadius: 10,
            borderLeft: "2px solid #7C3AED",
          }}>{m.msg}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <StockPortrait name={m.who} hue={m.hue} size={28}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11.5 }}>
          <b style={{ color: m.role === "teacher" ? course.color : "var(--ink)" }}>{m.who}</b>
          {m.role === "teacher" && <span style={{ marginLeft: 4, fontSize: 9, padding: "1px 4px", background: `${course.color}1A`, color: course.color, borderRadius: 3, fontWeight: 700 }}>TEACHER</span>}
          <span style={{ marginLeft: 6, fontSize: 10, color: "var(--silver)" }}>{m.time}</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.45, marginTop: 2 }}>{m.msg}</div>
        {m.reactions && (
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            {Object.entries(m.reactions).map(([emoji, n]) => (
              <span key={emoji} style={{ fontSize: 10.5, padding: "1px 6px", background: "var(--bone)", borderRadius: 999, border: "1px solid var(--mist)" }}>{emoji} {n}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BioChip({ icon, label, color }) {
  const Icon = I[icon];
  return (
    <button style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "4px 8px", background: `${color}10`, border: `1px solid ${color}30`,
      borderRadius: 999, cursor: "pointer",
      fontSize: 10.5, fontWeight: 600, color,
    }}>
      <Icon size={11} color={color}/> {label}
    </button>
  );
}

function BioChannelsPanel({ course }) {
  const channels = [
    { name: "# general",         sub: "Whole-class chat (you're here)",       unread: 0,  color: course.color, active: true },
    { name: "# announcements",   sub: "Mr. Evans only — read-only",            unread: 1,  color: "#0EA5E9" },
    { name: "# lab-bench-4",     sub: "Just you, Maya, Jordan",                unread: 3,  color: "#F59E0B" },
    { name: "# study-group",     sub: "8 classmates · student-run",            unread: 0,  color: "#8B5CF6" },
    { name: "# questions",       sub: "Ask anything — peers + AI Tutor",       unread: 2,  color: "#10B981" },
    { name: "# unit-4",           sub: "Cells & Energy thread",                  unread: 0,  color: "#EF4444" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 12px" }}>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", margin: "4px 0 6px" }}>Channels</div>
      {channels.map((c, i) => (
        <button key={i} style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          padding: "8px 10px", borderRadius: 8,
          background: c.active ? "var(--bone)" : "transparent",
          border: "none", cursor: "pointer", textAlign: "left",
          marginBottom: 2,
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.color }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: c.unread ? 700 : 600, color: "var(--ink)" }}>{c.name}</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{c.sub}</div>
          </div>
          {c.unread > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: "#EF4444", padding: "1px 6px", borderRadius: 999 }}>{c.unread}</span>}
        </button>
      ))}
      <button style={{
        marginTop: 8, width: "100%", padding: "8px 10px",
        background: "transparent", border: "1px dashed var(--mist)", borderRadius: 8,
        cursor: "pointer", fontSize: 11.5, color: "var(--stone)", fontWeight: 500,
      }}>
        <I.Plus size={11} color="var(--stone)" style={{ verticalAlign: "-1px", marginRight: 4 }}/> New study-group channel
      </button>
    </div>
  );
}

function BioPeoplePanel({ course }) {
  const teacher = { name: "Mr. Daniel Evans", role: "Teacher",      hue: 220, online: true };
  const ta      = { name: "Sam Reeves",       role: "Lab Aide",     hue: 160, online: true };
  const peers = [
    { name: "Maya Patel",    hue: 30,  online: true,  group: "Bench 4" },
    { name: "Jordan Tate",   hue: 280, online: true,  group: "Bench 4" },
    { name: "Aisha Brown",   hue: 320, online: true,  group: "Bench 1" },
    { name: "Connor Walsh",  hue: 100, online: true,  group: "Bench 2" },
    { name: "Rachel Kim",    hue: 0,   online: false, group: "Bench 3" },
    { name: "Liam Garcia",   hue: 200, online: true,  group: "Bench 5" },
    { name: "Priya Singh",   hue: 350, online: true,  group: "Bench 6" },
    { name: "Noah Bennett",  hue: 60,  online: false, group: "Bench 1" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Teacher</div>
      <BioPersonRow {...teacher} courseColor={course.color}/>
      <BioPersonRow {...ta}       courseColor={course.color}/>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 14, marginBottom: 6 }}>Your Lab Group</div>
      {peers.filter((p) => p.group === "Bench 4").map((p, i) => <BioPersonRow key={"lab" + i} {...p} courseColor={course.color}/>)}
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 14, marginBottom: 6 }}>Classmates ({peers.length - 2 + 1})</div>
      {peers.filter((p) => p.group !== "Bench 4").map((p, i) => <BioPersonRow key={i} {...p} courseColor={course.color}/>)}
    </div>
  );
}

function BioPersonRow({ name, role, hue, online, group, courseColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
      <StockPortrait name={name} hue={hue} size={32} dot={online ? "online" : "offline"}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
        {role && <div style={{ fontSize: 10.5, color: courseColor, fontWeight: 600 }}>{role}</div>}
        {!role && group && <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{group}</div>}
      </div>
      <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.MessageCircle size={13} color="var(--stone)"/></button>
    </div>
  );
}

/* ─────────── Communication tab ─────────── */
function BioCommunicationView({ course }) {
  const C = course.color;

  /* ── sidebar item definitions ── */
  const SIDEBAR_ITEMS = [
    { id: "class-chat",       section: "class",    name: "Class Chat",
      desc: "Whole-class live channel · moderated by " + course.teacher,
      color: C,    unread: 0 },
    { id: "ch-general",       section: "channels", name: "#general",
      sub: "Whole-class chat",              color: C,         unread: 0 },
    { id: "ch-announcements", section: "channels", name: "#announcements",
      sub: "Mr. Evans only — read-only",    color: "#0EA5E9", unread: 1, readOnly: true },
    { id: "ch-lab-bench-4",   section: "channels", name: "#lab-bench-4",
      sub: "You, Maya, Jordan",             color: "#F59E0B", unread: 3 },
    { id: "ch-study-group",   section: "channels", name: "#study-group",
      sub: "8 classmates · student-run",    color: "#8B5CF6", unread: 0 },
    { id: "ch-questions",     section: "channels", name: "#questions",
      sub: "Peers + AI Tutor",              color: "#10B981", unread: 2 },
    { id: "ch-unit-4",        section: "channels", name: "#unit-4",
      sub: "Cells & Energy thread",         color: "#EF4444", unread: 0 },
    { id: "dm-evans",  section: "dms", name: "Mr. Evans",  role: "Teacher",   hue: 220, online: true,  unread: 1 },
    { id: "dm-maya",   section: "dms", name: "Maya P.",    role: "Classmate", hue: 30,  online: true,  unread: 2 },
    { id: "dm-jordan", section: "dms", name: "Jordan T.",  role: "Classmate", hue: 280, online: true,  unread: 0 },
    { id: "parent-lab-safety", section: "parent",
      subject: "Lab Safety Update",
      preview: "All students handled chemicals safely during today's yeast lab.",
      from: "Mr. Evans", time: "Today, 10:40 AM", unread: 0 },
    { id: "parent-progress",   section: "parent",
      subject: "Mid-Unit Progress Note",
      preview: "Alex is performing at 86% (B) for Unit 4. Strong quiz scores.",
      from: "Mr. Evans", time: "Yesterday, 3:15 PM", unread: 1 },
  ];

  /* ── per-thread message data ── */
  const INIT_THREADS = {
    "class-chat": [
      { who: "Mr. Evans", role: "teacher", msg: "Goggles on, please. We're starting yeast prep at the 10-minute mark.", time: "10:21 AM", hue: 220 },
      { who: "Maya P.",   msg: "Bench 4 — got the yeast packets from the front 👍", time: "10:23 AM", hue: 30 },
      { who: "Jordan T.", msg: "Timers running. 5% sugar started.", time: "10:26 AM", hue: 280 },
      { who: "Mr. Evans", role: "teacher", msg: "Quick check: who can tell me what gas the bubbles are?", time: "10:28 AM", hue: 220 },
      { who: "You", self: true, msg: "CO₂ — from glycolysis + fermentation.", time: "10:28 AM" },
      { who: "Mr. Evans", role: "teacher", msg: "Exactly 🎉 — log it on your data sheet.", time: "10:29 AM", hue: 220, reactions: { "🎉": 4, "💯": 2 } },
      { who: "Aisha B.",  msg: "Our 10% bubbles are way faster than 5% — is that expected?", time: "10:31 AM", hue: 320 },
      { who: "Bio Tutor", role: "ai", msg: "Yes — more sugar means more substrate for glycolysis, until enzymes saturate. Compare with 20% to see the plateau.", time: "10:31 AM" },
    ],
    "ch-general": [
      { who: "Mr. Evans", role: "teacher", msg: "Welcome back, everyone! Today's lab is going to be a great one.", time: "10:20 AM", hue: 220 },
      { who: "Connor W.", msg: "Ready! 💪", time: "10:21 AM", hue: 100 },
      { who: "You", self: true, msg: "Super excited for the yeast lab 🧪", time: "10:22 AM" },
    ],
    "ch-announcements": [
      { who: "Mr. Evans", role: "teacher", msg: "📋 Lab report due FRIDAY by 11:59 PM. Submit via the Assignments tab. No late submissions accepted.", time: "Yesterday, 3:45 PM", hue: 220 },
      { who: "Mr. Evans", role: "teacher", msg: "📅 Unit 4 Test scheduled for June 10. Study guide posted in #unit-4.", time: "2 days ago, 9:00 AM", hue: 220, reactions: { "👍": 12 } },
    ],
    "ch-lab-bench-4": [
      { who: "Maya P.",   msg: "Hey — what did you get for bubble rate at 10% sugar?", time: "10:33 AM", hue: 30 },
      { who: "Jordan T.", msg: "I got ~14 bubbles/min. Maybe 15.", time: "10:34 AM", hue: 280 },
      { who: "You", self: true, msg: "Same. I'll put 14.5 as our average.", time: "10:35 AM" },
      { who: "Maya P.",   msg: "Perfect. Alex, can you type up the data table?", time: "10:36 AM", hue: 30 },
      { who: "You", self: true, msg: "On it — I'll share it in the doc.", time: "10:36 AM" },
    ],
    "ch-study-group": [
      { who: "Priya S.",  msg: "Anyone want to do a video review session before the test?", time: "Yesterday, 4:12 PM", hue: 350 },
      { who: "You", self: true, msg: "Yes! Sunday afternoon works for me.", time: "Yesterday, 4:45 PM" },
      { who: "Noah B.",   msg: "I'm in. Zoom or in person?", time: "Yesterday, 5:01 PM", hue: 60 },
    ],
    "ch-questions": [
      { who: "Liam G.",   msg: "Does the electron transport chain happen in the mitochondrial matrix or inner membrane?", time: "10:40 AM", hue: 200 },
      { who: "Bio Tutor", role: "ai", msg: "Great question! The ETC is embedded in the inner mitochondrial membrane — the matrix is where the Krebs cycle happens.", time: "10:41 AM" },
      { who: "You", self: true, msg: "That's the part I always mix up — thanks!", time: "10:42 AM" },
    ],
    "ch-unit-4": [
      { who: "Mr. Evans", role: "teacher", msg: "Unit 4 study guide is pinned above. Focus on ATP yield differences between aerobic and anaerobic respiration.", time: "2 days ago, 9:05 AM", hue: 220 },
      { who: "Rachel K.", msg: "Is glycolysis on the test?", time: "Yesterday, 7:22 PM", hue: 0 },
      { who: "Mr. Evans", role: "teacher", msg: "Yes — know the net ATP, NADH, and pyruvate outputs.", time: "Yesterday, 7:30 PM", hue: 220 },
    ],
    "dm-evans": [
      { who: "Mr. Evans", role: "teacher", msg: "Hey Alex — your class participation today was really strong. Keep it up!", time: "10:45 AM", hue: 220 },
      { who: "You", self: true, msg: "Thank you, Mr. Evans! I really enjoy the lab discussions.", time: "11:08 AM" },
      { who: "Mr. Evans", role: "teacher", msg: "Good work on the lab intro. See you tomorrow.", time: "11:10 AM", hue: 220 },
    ],
    "dm-maya": [
      { who: "Maya P.",   msg: "Did you finish the data table? I'm on #3 still 😅", time: "10:37 AM", hue: 30 },
      { who: "You", self: true, msg: "Almost! I'll send it to you in 5 mins.", time: "10:38 AM" },
      { who: "Maya P.",   msg: "Also — do you want to share notes after class?", time: "10:39 AM", hue: 30 },
      { who: "Maya P.",   msg: "We could meet in the library during free period.", time: "10:39 AM", hue: 30 },
    ],
    "dm-jordan": [
      { who: "Jordan T.", msg: "Ready for Friday's quiz?", time: "Yesterday, 3:20 PM", hue: 280 },
      { who: "You", self: true, msg: "Getting there! Mostly solid on the Krebs cycle now.", time: "Yesterday, 3:45 PM" },
      { who: "Jordan T.", msg: "Same. The electron transport chain still trips me up.", time: "Yesterday, 3:46 PM", hue: 280 },
    ],
  };

  /* ── parent message full bodies ── */
  const PARENT_BODIES = {
    "parent-lab-safety":
      "Dear Johnson Family,\n\nAll students handled chemicals safely during today's yeast fermentation lab. Alex showed excellent lab technique and contributed meaningfully to group discussion during the debrief.\n\nNo action required — this is a positive update.\n\nBest,\nMr. Daniel Evans\nBiology, Period 3",
    "parent-progress":
      "Dear Johnson Family,\n\nI wanted to share a mid-unit progress note for Alex in Biology Period 3.\n\nCurrent Grade: 86% (B)\nUnit: Unit 4 — Cells & Energy\n\nStrengths: Strong quiz performance, lab report draft submitted ahead of schedule, active participation in class discussion.\n\nAreas to watch: The upcoming Unit 4 Test on June 10 covers cellular respiration in depth — please encourage Alex to use the study guide posted in #unit-4.\n\nBest,\nMr. Daniel Evans",
  };

  const [activeId,  setActiveId]  = React.useState("class-chat");
  const [threads,   setThreads]   = React.useState(INIT_THREADS);
  const [drafts,    setDrafts]    = React.useState({});
  const scroller = React.useRef(null);

  const activeItem = SIDEBAR_ITEMS.find((x) => x.id === activeId) || SIDEBAR_ITEMS[0];
  const activeMsgs = threads[activeId] || [];
  const isReadOnly = !!activeItem.readOnly;
  const isParent   = activeItem.section === "parent";

  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [activeId, activeMsgs.length]);

  const send = () => {
    const d = (drafts[activeId] || "").trim();
    if (!d || isReadOnly || isParent) return;
    const now  = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setThreads((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] || []), { who: "You", self: true, msg: d, time }],
    }));
    setDrafts((prev) => ({ ...prev, [activeId]: "" }));
  };

  /* ── header info for right panel ── */
  const headerIcon = activeItem.section === "class"
    ? <div style={{ width: 30, height: 30, borderRadius: 8, background: C + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><I.MessageSquare size={15} color={C}/></div>
    : activeItem.section === "channels"
    ? <div style={{ width: 30, height: 30, borderRadius: 8, background: activeItem.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: activeItem.color }}/></div>
    : activeItem.section === "dms"
    ? <StockPortrait name={activeItem.name} hue={activeItem.hue} size={30}/>
    : <div style={{ width: 30, height: 30, borderRadius: 8, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center" }}><I.Home size={14} color="#0EA5E9"/></div>;

  const headerTitle = activeItem.section === "parent" ? activeItem.subject : activeItem.name || activeItem.subject;
  const headerDesc  = activeItem.section === "class"    ? activeItem.desc
    : activeItem.section === "channels" ? activeItem.sub
    : activeItem.section === "dms"      ? activeItem.role + (activeItem.online ? " · Online" : " · Offline")
    : "From " + activeItem.from + " · " + activeItem.time;

  /* ── sidebar section label ── */
  const SLabel = ({ label }) => (
    <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 700,
      letterSpacing: "0.07em", textTransform: "uppercase", padding: "10px 14px 3px" }}>
      {label}
    </div>
  );

  /* ── sidebar row styles ── */
  const rowBase = (isActive) => ({
    display: "flex", alignItems: "center", gap: 8, width: "100%",
    padding: "7px 14px", background: isActive ? C + "12" : "transparent",
    border: "none", cursor: "pointer", textAlign: "left",
    borderLeft: isActive ? "3px solid " + C : "3px solid transparent",
    transition: "background 80ms",
  });

  return (
    <div style={{ display: "flex", height: "calc(100vh - 260px)", minHeight: 520,
      background: "var(--paper)", borderRadius: 16,
      overflow: "hidden", boxShadow: "var(--shadow-card)" }}>

      {/* ═══ LEFT SIDEBAR ═══ */}
      <div style={{ width: 232, flexShrink: 0, borderRight: "1px solid var(--mist)",
        background: "var(--bone)", display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* Sidebar header */}
        <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid var(--mist)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{course.name} · {course.period}</div>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>All communications</div>
        </div>

        {/* ── Class Chat ── */}
        <button onClick={() => setActiveId("class-chat")} style={{
          ...rowBase(activeId === "class-chat"),
          padding: "10px 14px", gap: 10,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: C + "1A",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.MessageSquare size={15} color={C}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Class Chat</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>24 online · moderated</div>
          </div>
          <span style={{ fontSize: 9, fontWeight: 700, color: C,
            background: C + "1A", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>LIVE</span>
        </button>

        {/* ── Channels ── */}
        <SLabel label="Channels" />
        {SIDEBAR_ITEMS.filter((x) => x.section === "channels").map((item) => (
          <button key={item.id} onClick={() => setActiveId(item.id)} style={rowBase(activeId === item.id)}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: item.color, flexShrink: 0 }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: item.unread ? 700 : 500,
                color: item.unread || activeId === item.id ? "var(--ink)" : "var(--stone)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.name}
              </div>
            </div>
            {item.unread > 0 && (
              <span style={{ fontSize: 9.5, fontWeight: 700, color: "#fff",
                background: "#EF4444", padding: "1px 5px", borderRadius: 999, flexShrink: 0 }}>
                {item.unread}
              </span>
            )}
          </button>
        ))}
        <button style={{
          margin: "4px 14px 6px", padding: "5px 8px",
          background: "transparent", border: "1px dashed var(--mist)",
          borderRadius: 7, cursor: "pointer",
          fontSize: 11.5, color: "var(--stone)", fontWeight: 500,
          display: "flex", alignItems: "center", gap: 5,
        }}>
          <I.Plus size={10} color="var(--stone)"/> New study-group channel
        </button>

        {/* ── Direct Messages ── */}
        <SLabel label="Direct Messages" />
        {SIDEBAR_ITEMS.filter((x) => x.section === "dms").map((item) => (
          <button key={item.id} onClick={() => setActiveId(item.id)} style={rowBase(activeId === item.id)}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <StockPortrait name={item.name} hue={item.hue} size={26}/>
              <div style={{ position: "absolute", bottom: 0, right: -1,
                width: 8, height: 8, borderRadius: "50%",
                background: item.online ? "#22C55E" : "#94A3B8",
                border: "2px solid var(--bone)" }}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: item.unread ? 700 : 500,
                color: item.unread || activeId === item.id ? "var(--ink)" : "var(--stone)",
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {item.name}
              </div>
              <div style={{ fontSize: 10, color: "var(--silver)" }}>{item.role}</div>
            </div>
            {item.unread > 0 && (
              <span style={{ fontSize: 9.5, fontWeight: 700, color: "#fff",
                background: C, padding: "1px 5px", borderRadius: 999, flexShrink: 0 }}>
                {item.unread}
              </span>
            )}
          </button>
        ))}

        {/* ── Parent Communication ── */}
        <SLabel label="Parent Communication" />
        {SIDEBAR_ITEMS.filter((x) => x.section === "parent").map((item) => (
          <button key={item.id} onClick={() => setActiveId(item.id)} style={{
            ...rowBase(activeId === item.id),
            alignItems: "flex-start", padding: "8px 14px", gap: 9,
          }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "#E0F2FE",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, marginTop: 1 }}>
              <I.Home size={12} color="#0EA5E9"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11.5, fontWeight: item.unread ? 700 : 600,
                color: "var(--ink)", marginBottom: 1 }}>{item.subject}</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)", whiteSpace: "nowrap",
                overflow: "hidden", textOverflow: "ellipsis" }}>{item.preview}</div>
            </div>
            {item.unread > 0 && (
              <div style={{ width: 7, height: 7, borderRadius: "50%",
                background: C, flexShrink: 0, marginTop: 5 }}/>
            )}
          </button>
        ))}
        <div style={{ flex: 1 }}/>
      </div>

      {/* ═══ RIGHT PANEL ═══ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Panel header */}
        <div style={{ padding: "11px 16px", borderBottom: "1px solid var(--mist)",
          background: "var(--paper)", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {headerIcon}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)",
              whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{headerTitle}</div>
            <div style={{ fontSize: 11, color: "var(--stone)" }}>{headerDesc}</div>
          </div>
          {activeItem.section === "class" && (
            <span style={{ fontSize: 11, fontWeight: 600, color: "#22C55E", flexShrink: 0 }}>● 24 online</span>
          )}
          {isReadOnly && (
            <span style={{ fontSize: 10, fontWeight: 700, color: "#0EA5E9",
              background: "#E0F2FE", padding: "2px 7px", borderRadius: 4, flexShrink: 0 }}>READ-ONLY</span>
          )}
        </div>

        {/* Read-only info bar */}
        {isReadOnly && (
          <div style={{ padding: "7px 16px", background: "#F0F9FF",
            borderBottom: "1px solid #BAE6FD", fontSize: 11.5, color: "#0369A1",
            display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <I.Lock size={12} color="#0369A1"/>
            Only {course.teacher} can post in this channel.
          </div>
        )}

        {/* Live banner for class-chat */}
        {activeItem.section === "class" && (
          <div style={{ padding: "7px 16px", background: C + "0F",
            borderBottom: "1px solid var(--mist)", fontSize: 11.5, color: "var(--stone)",
            display: "flex", alignItems: "center", gap: 7, flexShrink: 0 }}>
            <I.Pin size={12} color={C}/>
            Live during class — moderated by <b style={{ color: "var(--ink)", marginLeft: 3 }}>{course.teacher}</b>
          </div>
        )}

        {/* ── Parent message view ── */}
        {isParent ? (
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            <div style={{ background: "#F0F9FF", border: "1px solid #BAE6FD",
              borderRadius: 14, padding: "18px 20px", maxWidth: 600 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                <I.Home size={16} color="#0EA5E9"/>
                <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>{activeItem.subject}</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 14,
                paddingBottom: 10, borderBottom: "1px solid #BAE6FD" }}>
                From: {activeItem.from} &nbsp;·&nbsp; To: Johnson Family &nbsp;·&nbsp; {activeItem.time}
              </div>
              <div style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.75,
                whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
                {PARENT_BODIES[activeItem.id] || ""}
              </div>
            </div>
            <div style={{ fontSize: 11, color: "var(--silver)", textAlign: "center", marginTop: 16 }}>
              School-to-home communications are automatically shared with your parent/guardian.
            </div>
          </div>
        ) : (
          <>
            {/* Message list */}
            <div ref={scroller} style={{ flex: 1, overflowY: "auto",
              padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ textAlign: "center", fontSize: 10, color: "var(--silver)",
                fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "2px 0 6px" }}>
                ─── {activeItem.section === "dms" ? "Direct Message" : "Today"} ───
              </div>
              {activeMsgs.map((m, i) => <BioChatBubble key={i} m={m} course={course}/>)}
            </div>

            {/* Composer (hidden for read-only) */}
            {!isReadOnly && (
              <div style={{ borderTop: "1px solid var(--mist)", padding: "10px 14px",
                background: "var(--paper)", flexShrink: 0 }}>
                {(activeItem.section === "class" || activeItem.id === "ch-general") && (
                  <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                    <BioChip icon="Atom"    label={"Question for " + course.teacher} color={C}/>
                    <BioChip icon="Sparkle" label="Ask Bio Tutor"                    color="#8B5CF6"/>
                    <BioChip icon="Hand"    label="Raise hand"                        color="#F59E0B"/>
                  </div>
                )}
                <div style={{ display: "flex", gap: 6, alignItems: "center",
                  padding: "6px 8px", background: "var(--bone)", borderRadius: 10 }}>
                  <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}>
                    <I.Paperclip size={13} color="var(--stone)"/>
                  </button>
                  <input
                    value={drafts[activeId] || ""}
                    onChange={(e) => setDrafts((prev) => ({ ...prev, [activeId]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                    placeholder={
                      activeItem.section === "dms"
                        ? "Message " + activeItem.name.split(" ")[0] + "…"
                        : "Message " + (activeItem.name || "the class") + "…"
                    }
                    style={{ flex: 1, border: "none", background: "transparent",
                      outline: "none", fontSize: 12.5, color: "var(--ink)", fontFamily: "inherit" }}
                  />
                  <button onClick={send} style={{
                    background: C, border: "none", borderRadius: 7,
                    padding: "6px 8px", cursor: "pointer",
                    display: "flex", alignItems: "center",
                  }}>
                    <I.Send size={12} color="#fff"/>
                  </button>
                </div>
                <div style={{ fontSize: 10, color: "var(--silver)", marginTop: 5, textAlign: "center" }}>
                  {activeItem.section === "dms"
                    ? "Direct message · private between you and " + activeItem.name
                    : "Class chat is logged. Be respectful."}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─────────── Campus map illustration ─────────── */
function BioCampusMap({ course }) {
  const C = course.color;
  return (
    <div style={{ background: "var(--bone)", borderRadius: 12, border: "1px solid var(--mist)", overflow: "hidden", lineHeight: 0 }}>
      <svg width="100%" viewBox="0 0 660 360" style={{ display: "block" }} aria-label="Campus map illustration">

        {/* ── Background ── */}
        <rect width="660" height="360" fill="#F5F3EF"/>

        {/* ── Grass / path strips between building columns ── */}
        <rect x="232" y="14" width="10" height="127" rx="2" fill="#BBF7D0" opacity="0.8"/>
        <rect x="412" y="14" width="10" height="127" rx="2" fill="#BBF7D0" opacity="0.8"/>
        <rect x="332" y="153" width="10" height="139" rx="2" fill="#BBF7D0" opacity="0.8"/>

        {/* ════ TOP ROW ════ */}

        {/* Main Building */}
        <rect x="14" y="14" width="216" height="127" rx="6" fill="#DBEAFE" stroke="#93C5FD" strokeWidth="1.5"/>
        <text x="122" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1E40AF" fontFamily="sans-serif">Main Building</text>
        <text x="122" y="86" textAnchor="middle" fontSize="9" fill="#3B82F6" fontFamily="sans-serif">Administration · Grades 9–12</text>

        {/* Library */}
        <rect x="244" y="14" width="166" height="127" rx="6" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1.5"/>
        <text x="327" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6B21A8" fontFamily="sans-serif">Library</text>
        <text x="327" y="86" textAnchor="middle" fontSize="9" fill="#7C3AED" fontFamily="sans-serif">Media Center · Resources</text>

        {/* Gym & Athletics */}
        <rect x="422" y="14" width="224" height="127" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1.5"/>
        <text x="534" y="70" textAnchor="middle" fontSize="11" fontWeight="700" fill="#991B1B" fontFamily="sans-serif">Gym &amp; Athletics</text>
        <text x="534" y="86" textAnchor="middle" fontSize="9" fill="#DC2626" fontFamily="sans-serif">Field · Courts · Weight Room</text>

        {/* ── Walkway: top row → middle row ── */}
        <rect x="0" y="143" width="660" height="9" fill="#D1D5DB"/>
        <line x1="0" y1="147" x2="660" y2="147" stroke="#9CA3AF" strokeWidth="0.5" strokeDasharray="10,8"/>

        {/* ════ MIDDLE ROW ════ */}

        {/* Main Office */}
        <rect x="14" y="154" width="100" height="56" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5"/>
        <text x="64" y="179" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#334155" fontFamily="sans-serif">Main Office</text>
        <text x="64" y="195" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="sans-serif">Room 101</text>

        {/* Counseling Office */}
        <rect x="124" y="154" width="100" height="56" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5"/>
        <text x="174" y="179" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#334155" fontFamily="sans-serif">Counseling</text>
        <text x="174" y="195" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="sans-serif">Room 103</text>

        {/* Health Office */}
        <rect x="234" y="154" width="96" height="56" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5"/>
        <text x="282" y="179" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#334155" fontFamily="sans-serif">Health Office</text>
        <text x="282" y="195" textAnchor="middle" fontSize="8" fill="#64748B" fontFamily="sans-serif">Room 105</text>

        {/* Cafeteria */}
        <rect x="14" y="221" width="316" height="71" rx="5" fill="#FEF9C3" stroke="#FDE68A" strokeWidth="1.5"/>
        <text x="172" y="253" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E" fontFamily="sans-serif">Cafeteria</text>
        <text x="172" y="268" textAnchor="middle" fontSize="9" fill="#B45309" fontFamily="sans-serif">Lunch 11:30 – 12:15</text>

        {/* Science Wing — highlighted */}
        <rect x="344" y="152" width="302" height="140" rx="6" fill="#D1FAE5" stroke={C} strokeWidth="2.5"/>
        <rect x="348" y="156" width="294" height="132" rx="4" fill="none" stroke={C} strokeWidth="1" opacity="0.3"/>

        {/* Science Wing labels */}
        <text x="495" y="172" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065F46" fontFamily="sans-serif">Science Wing</text>
        <text x="495" y="186" textAnchor="middle" fontSize="8.5" fill="#059669" fontFamily="sans-serif">Rooms 301–310 · Biology · Chemistry · Physics</text>

        {/* YOU ARE HERE map pin */}
        <path d="M495 198 C483 198 474 208 474 220 C474 235 495 250 495 250 C495 250 516 235 516 220 C516 208 507 198 495 198Z" fill={C}/>
        <circle cx="495" cy="219" r="6.5" fill="#fff"/>
        <circle cx="495" cy="219" r="2.5" fill={C}/>

        {/* YOU ARE HERE badge */}
        <rect x="461" y="254" width="68" height="16" rx="4" fill={C}/>
        <text x="495" y="266" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#fff" fontFamily="sans-serif">YOU ARE HERE</text>

        {/* Room 302 callout */}
        <text x="495" y="283" textAnchor="middle" fontSize="8.5" fill="#065F46" fontFamily="sans-serif">Room 302</text>

        {/* ── Walkway: middle row → parking ── */}
        <rect x="0" y="295" width="660" height="9" fill="#D1D5DB"/>
        <line x1="0" y1="299" x2="660" y2="299" stroke="#9CA3AF" strokeWidth="0.5" strokeDasharray="10,8"/>

        {/* ── Parking / Main Entrance ── */}
        <rect x="0" y="306" width="660" height="46" fill="#CBD5E1"/>
        {[8,46,84,122,160,198,236,274,312,350,388,426,464,502,540,578,616].map((px, i) => (
          <rect key={"pk"+i} x={px} y="312" width="34" height="30" rx="1" fill="none" stroke="#9CA3AF" strokeWidth="0.7"/>
        ))}
        <text x="330" y="331" textAnchor="middle" fontSize="10.5" fontWeight="600" fill="#475569" fontFamily="sans-serif" letterSpacing="0.5">PARKING · MAIN ENTRANCE</text>

      </svg>
    </div>
  );
}

/* ─────────── Maps & Spaces tab ─────────── */
function BioMapsSpacesView({ course }) {
  const C = course.color;
  const [searchVal, setSearchVal] = React.useState("");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "start" }}>

      {/* ── Room Layout ── */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "20px 22px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <I.MapPin size={15} color={C}/>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Room Layout</span>
          <div style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, background: C + "18", border: "1px solid " + C + "38", borderRadius: 8, padding: "4px 10px", fontSize: 11.5, fontWeight: 600, color: C }}>
            <I.MapPin size={11} color={C}/> Your seat: Bench 4
          </div>
        </div>

        {/* Seating map — reuses the Virtual Classroom SVG */}
        <BioVirtualRoomMap course={course}/>

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 14 }}>
          {[
            { fill: "#F0FDF4", stroke: C,         label: "Your seat"         },
            { fill: "#E2E8F0", stroke: "#94A3B8",  label: "Lab benches"       },
            { fill: "#334155", stroke: "#334155",  label: "Teacher area"      },
            { fill: "#ffffff", stroke: "#EF4444",  label: "Safety equipment"  },
            { fill: "#99F6E4", stroke: "#0D9488",  label: "Sink"              },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--stone)" }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, flexShrink: 0, background: item.fill, border: "1.5px solid " + item.stroke }}/>
              {item.label}
            </div>
          ))}
        </div>

        {/* Note */}
        <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--bone)", borderRadius: 9, fontSize: 12, color: "var(--stone)", lineHeight: 1.55 }}>
          Familiarize yourself with your classroom — know where everything is before lab days.
        </div>
      </div>

      {/* ── Campus Map ── */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "20px 22px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <I.MapPin size={15} color={C}/>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Campus Map</span>
        </div>

        {/* Search bar */}
        <div style={{ position: "relative", marginBottom: 10 }}>
          <I.Search size={13} color="var(--silver)" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}/>
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Find a room or space..."
            style={{
              width: "100%", boxSizing: "border-box",
              padding: "8px 12px 8px 32px",
              background: "var(--bone)", border: "1.5px solid var(--mist)",
              borderRadius: 9, fontSize: 13, color: "var(--ink)",
              outline: "none", fontFamily: "inherit",
            }}
          />
        </div>

        {/* Quick-access chips */}
        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
          {["Health Office", "Counseling", "Library"].map((chip) => (
            <button key={chip} onClick={() => setSearchVal(chip)} style={{
              padding: "5px 13px", borderRadius: 20,
              background: "var(--bone)", border: "1.5px solid var(--mist)",
              fontSize: 12, fontWeight: 500, color: "var(--stone)",
              cursor: "pointer", fontFamily: "inherit",
            }}>
              {chip}
            </button>
          ))}
        </div>

        {/* Campus map illustration */}
        <BioCampusMap course={course}/>
      </div>

    </div>
  );
}

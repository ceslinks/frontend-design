// LINKS — 1:1 mockup pages: My Schedule, Study Planner, My Tools, Events,
// Football Team Hub, Recruiting Profile, Calendar event panels, To Do variants

/* ========== Tiny helpers ========== */
function MK_Pill({ tone="neutral", children, style }) {
  const tones = {
    neutral: { bg: "var(--bone)", fg: "var(--stone)" },
    purple:  { bg: "var(--student-soft)", fg: "var(--student-deep)" },
    success: { bg: "#DCFCE7", fg: "#15803D" },
    warning: { bg: "#FEF3C7", fg: "#A16207" },
    danger:  { bg: "#FEE2E2", fg: "#B91C1C" },
    info:    { bg: "#DBEAFE", fg: "#1D4ED8" },
    soft:    { bg: "#F1F5F9", fg: "#475569" },
    pending: { bg: "#FED7AA", fg: "#9A3412" },
    open:    { bg: "#1E293B", fg: "#FFFFFF" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
      whiteSpace: "nowrap", ...style,
    }}>{children}</span>
  );
}

function MK_Card({ children, style, padding=18, ...rest }) {
  return <div className="card" style={{ padding, ...style }} {...rest}>{children}</div>;
}

function MK_SectionHead({ title, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</div>
      {action && <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>{action}</a>}
    </div>
  );
}

/* ============================================================
   MY SCHEDULE — daily / weekly schedule with Flex Block modal
   ============================================================ */
function MySchedulePage({ segments }) {
  const [viewMode, setViewMode] = React.useState("day");
  const [flexOpen, setFlexOpen] = React.useState(false);

  /* ── Period data ── */
  const PERIODS = [
    { type: "homeroom",  label: "Advisory Homeroom",       timeFull: "7:45 – 8:00 AM",  timeKey: "7:45",  note: "Check-in, announcements, and daily goals", done: true },
    { type: "class",     label: "Period 1", subj: "Algebra II",              teacher: "Mr. Kim",     room: "Room 203", timeFull: "8:00 – 9:15 AM",  timeKey: "8:00",  icon: "📐", status: "In Progress", tone: "info"    },
    { type: "class",     label: "Period 2", subj: "English 10 - Literature", teacher: "Ms. Carter",  room: "Room 305", timeFull: "9:20 – 10:35 AM", timeKey: "9:20",  icon: "📖", tone: "warning"  },
    { type: "flex",      label: "Flex Block",               subj: "Open Time",            timeFull: "10:40 – 11:20 AM", timeKey: "10:40" },
    { type: "lunch",     label: "Lunch",                    subj: "Cafeteria",            timeFull: "11:30 – 12:05 PM", timeKey: "11:30" },
    { type: "class",     label: "Period 3", subj: "Biology 101",             teacher: "Ms. Lopez",   room: "Room 215", timeFull: "12:05 – 1:20 PM", timeKey: "12:05", icon: "🧪", tone: "success"  },
    { type: "class",     label: "Period 4", subj: "US History",              teacher: "Mr. Johnson", room: "Room 307", timeFull: "1:25 – 2:40 PM",  timeKey: "1:25",  icon: "📜", tone: "warning"  },
    { type: "class",     label: "Period 5", subj: "Spanish II",              teacher: "Sra. Garcia", room: "Room 210", timeFull: "2:45 – 3:30 PM",  timeKey: "2:45",  icon: "💬", tone: "danger"   },
    { type: "dismissal", label: "Dismissal",                                 timeFull: "3:30 PM",     timeKey: "3:30",  note: "After school: Robotics Club (3:45 – 5:00 PM) in Lab 1" },
  ];

  /* ── Week view data ── */
  const WEEK_DAYS = [
    { label: "Mon", date: "May 12", dayBadge: "B", periods: [
      { subj: "English Lit",  time: "8:00–9:15",   room: "305" },
      { subj: "Flex Block",   time: "9:20–10:00",  room: "",    flex: true },
      { subj: "Lunch",        time: "11:30–12:05", room: "",    lunch: true },
      { subj: "Algebra II",   time: "12:05–1:20",  room: "203" },
      { subj: "US History",   time: "1:25–2:40",   room: "307" },
      { subj: "Spanish II",   time: "2:45–3:30",   room: "210" },
    ]},
    { label: "Tue", date: "May 13", dayBadge: "A", periods: [
      { subj: "Biology 101",  time: "8:00–9:15",   room: "215" },
      { subj: "English Lit",  time: "9:20–10:35",  room: "305" },
      { subj: "Flex Block",   time: "10:40–11:20", room: "",    flex: true },
      { subj: "Lunch",        time: "11:30–12:05", room: "",    lunch: true },
      { subj: "Algebra II",   time: "12:05–1:20",  room: "203" },
      { subj: "Spanish II",   time: "2:45–3:30",   room: "210" },
    ]},
    { label: "Wed", date: "May 14", dayBadge: "B", today: true, periods: [
      { subj: "Algebra II",   time: "8:00–9:15",   room: "203", status: "In Progress" },
      { subj: "English Lit",  time: "9:20–10:35",  room: "305" },
      { subj: "Flex Block",   time: "10:40–11:20", room: "",    flex: true },
      { subj: "Lunch",        time: "11:30–12:05", room: "",    lunch: true },
      { subj: "Biology 101",  time: "12:05–1:20",  room: "215" },
      { subj: "US History",   time: "1:25–2:40",   room: "307" },
      { subj: "Spanish II",   time: "2:45–3:30",   room: "210" },
    ]},
    { label: "Thu", date: "May 15", dayBadge: "A", periods: [
      { subj: "Biology 101",  time: "8:00–9:15",   room: "215" },
      { subj: "Flex Block",   time: "9:20–10:00",  room: "",    flex: true },
      { subj: "English Lit",  time: "10:05–11:20", room: "305" },
      { subj: "Lunch",        time: "11:30–12:05", room: "",    lunch: true },
      { subj: "Algebra II",   time: "12:05–1:20",  room: "203" },
      { subj: "US History",   time: "1:25–2:40",   room: "307" },
    ]},
    { label: "Fri", date: "May 16", dayBadge: "B", periods: [
      { subj: "Spanish II",   time: "8:00–9:15",   room: "210" },
      { subj: "English Lit",  time: "9:20–10:35",  room: "305" },
      { subj: "Flex Block",   time: "10:40–11:20", room: "",    flex: true },
      { subj: "Lunch",        time: "11:30–12:05", room: "",    lunch: true },
      { subj: "Biology 101",  time: "12:05–1:20",  room: "215" },
      { subj: "US History",   time: "1:25–2:40",   room: "307" },
    ]},
  ];

  const TONE_COLORS = {
    info:    { bg: "#DBEAFE", fg: "#1D4ED8" },
    warning: { bg: "#FEF3C7", fg: "#A16207" },
    success: { bg: "#DCFCE7", fg: "#15803D" },
    danger:  { bg: "#FEE2E2", fg: "#B91C1C" },
  };

  return (
    <Page segments={segments} title="My Schedule" lede="Your school day at a glance.">

      {/* ── Schedule | Projects tab strip ── */}
      <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid var(--mist)" }}>
        {[{ label: "Schedule", href: "#/my-time/my-schedule" }, { label: "Projects", href: "#/my-time/my-schedule/projects" }].map(({ label, href }) => (
          <a key={label} href={href} style={{
            padding: "10px 18px", textDecoration: "none",
            color: label === "Schedule" ? "var(--ink)" : "var(--stone)",
            fontSize: 13, fontWeight: label === "Schedule" ? 600 : 500,
            borderBottom: label === "Schedule" ? "2px solid var(--student)" : "2px solid transparent",
            marginBottom: -1,
          }}>{label}</a>
        ))}
      </div>

      {/* ── Date nav + view toggle ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 18 }}>
        <button className="btn btn-sm" style={{ padding: "0 8px", minWidth: 30 }}>
          <I.ChevronLeft size={13} color="var(--stone)"/>
        </button>
        <button className="btn btn-sm">Today</button>
        <button className="btn btn-sm" style={{ gap: 6 }}>
          <I.Calendar size={13} color="var(--stone)"/>
          <span style={{ fontWeight: 600 }}>Wednesday, May 14, 2026</span>
        </button>
        <button className="btn btn-sm" style={{ padding: "0 8px", minWidth: 30 }}>
          <I.ChevronRight size={13} color="var(--stone)"/>
        </button>
        <div style={{ flex: 1 }}/>
        {/* Day / Week toggle pill */}
        <div style={{
          display: "inline-flex", borderRadius: 8, overflow: "hidden",
          border: "1px solid var(--mist)", background: "var(--bone)",
        }}>
          {["Day", "Week"].map((v) => {
            const active = viewMode === v.toLowerCase();
            return (
              <button key={v} onClick={() => setViewMode(v.toLowerCase())} style={{
                padding: "6px 14px", border: "none", cursor: "pointer",
                fontSize: 12.5, fontWeight: 600,
                background: active ? "var(--student)" : "transparent",
                color: active ? "#fff" : "var(--stone)",
                transition: "background 120ms, color 120ms",
              }}>{v} View</button>
            );
          })}
        </div>
      </div>

      {/* ── Info banner (4-col card) ── */}
      <MK_Card padding={0} style={{ marginBottom: 20, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr 1fr 1.5fr" }}>
          {/* B Day */}
          <div style={{ padding: "16px 22px", borderRight: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--student-soft)", color: "var(--student-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>B</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Today is B Day</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View rotation →</a>
            </div>
          </div>
          {/* School Day */}
          <div style={{ padding: "16px 22px", borderRight: "1px solid var(--mist)" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>School Day</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>7:45 AM – 3:30 PM</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>7 Periods + Flex</div>
          </div>
          {/* Next Up */}
          <div style={{ padding: "16px 22px", borderRight: "1px solid var(--mist)" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>Next Up</div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>Flex Block</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>in 18 min</div>
          </div>
          {/* AI Daily Brief */}
          <div style={{ padding: "16px 22px", display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--student-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
              <I.Sparkle size={15} color="var(--student)"/>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>AI Daily Brief</div>
              <div style={{ fontSize: 12, color: "var(--stone)", lineHeight: 1.5, marginBottom: 4 }}>You have 2 assignments due this week and 1 exam next Tuesday.</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View insights →</a>
            </div>
          </div>
        </div>
      </MK_Card>

      {/* ── Day View ── */}
      {viewMode === "day" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20, alignItems: "start" }}>

          {/* Timeline card */}
          <MK_Card padding={20}>
            <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 14 }}>

              {/* Left: time labels + dot rail */}
              <div style={{ position: "relative" }}>
                {PERIODS.map((p, i) => {
                  const tall = p.type === "class" || p.type === "flex";
                  return (
                    <div key={i} style={{ height: tall ? 84 : 58, position: "relative", display: "flex", alignItems: "flex-start", paddingTop: 6 }}>
                      <span style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 600 }}>{p.timeKey}</span>
                      <div style={{
                        position: "absolute", right: -7, top: 9,
                        width: 7, height: 7, borderRadius: 999, zIndex: 1,
                        background: p.type === "flex" ? "var(--student)" : (i < 2 ? "#22C55E" : "var(--silver)"),
                      }}/>
                    </div>
                  );
                })}
                {/* vertical rail */}
                <div style={{ position: "absolute", right: -4, top: 10, bottom: 10, width: 1, background: "var(--mist)", zIndex: 0 }}/>
              </div>

              {/* Right: period cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {PERIODS.map((p, i) => {
                  const tc = TONE_COLORS[p.tone] || { bg: "var(--bone)", fg: "var(--stone)" };

                  /* Homeroom */
                  if (p.type === "homeroom") return (
                    <div key={i} style={{ background: "#DCFCE7", border: "1px solid #BBF7D0", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#15803D", padding: "2px 8px", background: "#fff", borderRadius: 999, flexShrink: 0 }}>7:45 – 8:00 AM</span>
                      <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{p.label}</span>
                      <span style={{ fontSize: 11.5, color: "var(--stone)" }}>· {p.note}</span>
                      <div style={{ marginLeft: "auto" }}><I.Check size={14} color="#15803D"/></div>
                    </div>
                  );

                  /* Lunch */
                  if (p.type === "lunch") return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 4px" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 999, background: "var(--bone)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>🍽️</div>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{p.label}</div>
                        <div style={{ fontSize: 11, color: "var(--stone)" }}>{p.subj} · {p.timeFull}</div>
                      </div>
                    </div>
                  );

                  /* Dismissal */
                  if (p.type === "dismissal") return (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "8px 4px" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 999, background: "var(--bone)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <I.Flag size={11} color="var(--stone)"/>
                      </div>
                      <div>
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{p.label} · {p.timeFull}</div>
                        <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>{p.note}</div>
                        <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", marginTop: 4, display: "inline-block" }}>View all after school activities →</a>
                      </div>
                    </div>
                  );

                  /* Flex Block */
                  if (p.type === "flex") return (
                    <div key={i} style={{ background: "#FBEFE2", border: "1px solid #FED7AA", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 34, height: 34, borderRadius: 999, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <I.Clock size={16} color="#F97316"/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>{p.label}</div>
                        <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{p.timeFull}</div>
                      </div>
                      <span style={{ fontSize: 11.5, fontWeight: 600, color: "#EA580C", flexShrink: 0 }}>You have options</span>
                      <button
                        onClick={() => setFlexOpen(true)}
                        style={{ padding: "6px 12px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "var(--ink)", cursor: "pointer", flexShrink: 0 }}
                      >Explore Options</button>
                      <I.ChevronRight size={14} color="var(--silver)"/>
                    </div>
                  );

                  /* Regular class */
                  return (
                    <a key={i} href="#" style={{
                      background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 12,
                      padding: "14px 18px", display: "flex", alignItems: "center", gap: 14,
                      boxShadow: "var(--shadow-1)", textDecoration: "none",
                    }}>
                      <div style={{ width: 38, height: 38, borderRadius: 8, background: tc.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{p.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>{p.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{p.subj}</div>
                        <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 1 }}>{p.teacher} · {p.room}</div>
                      </div>
                      <div style={{ fontSize: 12, color: "var(--stone)", flexShrink: 0 }}>{p.timeFull}</div>
                      {p.status && (
                        <span style={{ padding: "3px 8px", borderRadius: 999, background: "#DCFCE7", color: "#15803D", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{p.status}</span>
                      )}
                      <I.ChevronRight size={14} color="var(--silver)"/>
                    </a>
                  );
                })}
              </div>
            </div>
          </MK_Card>

          {/* ── Right sidebar ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* AI Schedule Assistant */}
            <MK_Card padding={16}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <I.Sparkle size={14} color="var(--student)"/>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Schedule Assistant</span>
                <span style={{ fontSize: 9, fontWeight: 700, color: "var(--student-deep)", background: "var(--student-soft)", padding: "1px 5px", borderRadius: 3, marginLeft: "auto", letterSpacing: "0.06em" }}>BETA</span>
              </div>
              <div style={{ background: "var(--student-soft)", padding: 10, borderRadius: 8, marginBottom: 12, display: "flex", gap: 8 }}>
                <I.Clock size={13} color="var(--student)" style={{ flexShrink: 0, marginTop: 1 }}/>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", lineHeight: 1.5 }}>
                  You have a 40 min Flex Block coming up.
                  <span style={{ color: "var(--stone)", fontWeight: 500 }}> Here are smart ways to use it.</span>
                </div>
              </div>
              {[
                { ic: I.Edit,   c: "var(--student)", t: "Work on Argument Essay", s: "Due Fri, May 16 · 45 min" },
                { ic: I.Team,   c: "#0EA5A4",        t: "Join Study Session",     s: "Algebra · Library Zone B"  },
                { ic: I.MapPin, c: "#F59E0B",        t: "Reserve a Study Space",  s: "East Wing available"       },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "9px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: row.c + "1A", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <row.ic size={13} color={row.c}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{row.t}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)" }}>{row.s}</div>
                  </div>
                  <I.ChevronRight size={11} color="var(--silver)"/>
                </div>
              ))}
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", display: "block", marginTop: 10 }}>View all suggestions →</a>
            </MK_Card>

            {/* Your Day at a Glance */}
            <MK_Card padding={16}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Your Day at a Glance</div>
              {[
                { num: "2",    lab: "Assignments Due", sub: "This week"    },
                { num: "1",    lab: "Test Next Week",  sub: "Biology 101"  },
                { num: "2.5h", lab: "Free Time",       sub: "After school" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink)", minWidth: 30 }}>{row.num}</div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{row.lab}</div>
                      <div style={{ fontSize: 11, color: "var(--stone)" }}>{row.sub}</div>
                    </div>
                  </div>
                  <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View →</a>
                </div>
              ))}
            </MK_Card>

            {/* Need to Talk? */}
            <MK_Card padding={16}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>Need to Talk to Someone?</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 12 }}>Your counselors are available.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 38, height: 38, borderRadius: 999, background: "linear-gradient(135deg, #FBBF24, #F59E0B)", flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>Ms. Davis</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>School Counselor</div>
                </div>
                <button style={{ padding: "6px 10px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 6, fontSize: 11.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
                  <I.MessageCircle size={11} color="#fff"/>Start Conversation
                </button>
              </div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", display: "block", marginTop: 10 }}>More support options →</a>
            </MK_Card>

            {/* This Week */}
            <MK_Card padding={14}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>This Week (B Week)</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
                {[
                  { d: "Mon", l: "B" }, { d: "Tue", l: "A" }, { d: "Wed", l: "B", active: true }, { d: "Thu", l: "A" }, { d: "Fri", l: "B" },
                ].map((day, i) => (
                  <div key={i} style={{
                    padding: "7px 3px", textAlign: "center", borderRadius: 7,
                    background: day.active ? "var(--student-soft)" : "var(--bone)",
                    border: day.active ? "1px solid #C4B5FD" : "1px solid transparent",
                  }}>
                    <div style={{ fontSize: 9.5, color: "var(--stone)", marginBottom: 2 }}>{day.d}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: day.active ? "var(--student-deep)" : "var(--ink)", fontFamily: "var(--font-display)" }}>{day.l}</div>
                  </div>
                ))}
              </div>
            </MK_Card>
          </div>
        </div>
      )}

      {/* ── Week View (full-width, no sidebar) ── */}
      {viewMode === "week" && (
        <MK_Card padding={0} style={{ overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
            {WEEK_DAYS.map((day, di) => (
              <div key={di} style={{ borderRight: di < 4 ? "1px solid var(--mist)" : "none" }}>
                {/* Column header */}
                <div style={{
                  padding: "12px 14px 10px",
                  background: day.today ? "var(--student)" : "var(--bone)",
                  borderBottom: "1px solid var(--mist)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: day.today ? "#fff" : "var(--ink)" }}>{day.label}</div>
                    <div style={{ fontSize: 11, color: day.today ? "rgba(255,255,255,0.72)" : "var(--stone)" }}>{day.date}</div>
                  </div>
                  <span style={{
                    padding: "2px 7px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                    background: day.today ? "rgba(255,255,255,0.22)" : "var(--student-soft)",
                    color: day.today ? "#fff" : "var(--student-deep)",
                  }}>{day.dayBadge}</span>
                </div>
                {/* Period cards */}
                <div style={{ padding: "10px 8px", display: "flex", flexDirection: "column", gap: 5 }}>
                  {day.periods.map((p, pi) => (
                    <div key={pi} style={{
                      padding: "7px 9px", borderRadius: 7, fontSize: 11,
                      background: p.flex ? "#FBEFE2" : p.lunch ? "var(--bone)" : "var(--paper)",
                      border: "1px solid " + (p.flex ? "#FED7AA" : "var(--mist)"),
                    }}>
                      <div style={{ fontWeight: 700, color: "var(--ink)", marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.subj}</div>
                      <div style={{ color: "var(--stone)" }}>{p.time}{p.room ? " · Rm " + p.room : ""}</div>
                      {p.status && (
                        <span style={{ display: "inline-block", marginTop: 2, padding: "1px 5px", borderRadius: 999, background: "#DCFCE7", color: "#15803D", fontSize: 10, fontWeight: 700 }}>{p.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </MK_Card>
      )}

      {/* ── Flex Block Modal ── */}
      {flexOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(15,23,42,0.42)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => setFlexOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "var(--paper)", borderRadius: 20, padding: 28, width: 480, maxWidth: "100%", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}
          >
            {/* Modal header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Your Flex Block Options</h2>
                <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 4 }}>10:40 – 11:20 AM · 40 minutes</div>
              </div>
              <button onClick={() => setFlexOpen(false)} style={{ border: "none", background: "var(--bone)", borderRadius: 8, width: 30, height: 30, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I.X size={14} color="var(--stone)"/>
              </button>
            </div>
            {/* Option cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              {[
                { emoji: "📚", title: "Study Hall",          sub: "Self-directed study time",                    loc: "Room 203",         bg: "#DBEAFE" },
                { emoji: "📖", title: "Library",             sub: "Open study + printing available",             loc: "Library",          bg: "#DCFCE7" },
                { emoji: "👥", title: "Join Study Session",  sub: "Algebra · Library Study Zone B · 8 students", loc: "Library Zone B",   bg: "var(--student-soft)" },
              ].map((opt, i) => (
                <button
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 12, cursor: "pointer", width: "100%", textAlign: "left" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--student)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--student-soft)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mist)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ width: 46, height: 46, borderRadius: 10, background: opt.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{opt.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>{opt.title}</div>
                    <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>{opt.sub}</div>
                  </div>
                  <I.ChevronRight size={14} color="var(--silver)"/>
                </button>
              ))}
            </div>
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setFlexOpen(false)} style={{ fontSize: 12.5, color: "var(--stone)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </Page>
  );
}

/* ============================================================
   STUDY PLANNER — overview / home
   ============================================================ */
function StudyPlannerPage({ segments, navigate }) {
  const PLANS = [
    {
      id: "essay",
      title: "Argument Essay",
      subject: "English 10",
      due: "Fri May 16",
      statusLabel: "In Progress",
      statusTone: "success",
      progress: 40,
      meta: "3 sessions planned · Next: Today 10:40 AM",
      cta: "Continue Plan →",
      icon: "Document",
      iconBg: "var(--student-soft)",
      iconFg: "var(--student)",
    },
    {
      id: "bio",
      title: "Biology Lab Report",
      subject: "Biology 101",
      due: "Wed May 13",
      statusLabel: "Due Today",
      statusTone: "warning",
      progress: 70,
      meta: "2 sessions remaining",
      cta: "Continue Plan →",
      icon: "Atom",
      iconBg: "#DCFCE7",
      iconFg: "#15803D",
    },
    {
      id: "quad",
      title: "Quadratic Functions Homework",
      subject: "Algebra II",
      due: "May 15",
      statusLabel: "Upcoming",
      statusTone: "neutral",
      progress: 0,
      meta: "Not started · Est. 1h 30m",
      cta: "Start Planning →",
      icon: "Calculator",
      iconBg: "#DBEAFE",
      iconFg: "#1D4ED8",
    },
  ];

  const ASSIGNMENTS = [
    { title: "Argument Essay",          subject: "English 10",  due: "Fri May 16",  priority: "High",   priorityTone: "danger",  hasPlan: true  },
    { title: "Math Problem Set",        subject: "Algebra II",  due: "Tue May 13",  priority: "Medium", priorityTone: "warning", hasPlan: false },
    { title: "History Essay",           subject: "US History",  due: "Thu May 14",  priority: "High",   priorityTone: "danger",  hasPlan: false },
    { title: "Biology Exam",            subject: "Biology 101", due: "Fri May 22",  priority: "High",   priorityTone: "danger",  hasPlan: false },
    { title: "Spanish Vocab Quiz",      subject: "Spanish II",  due: "Mon May 18",  priority: "Low",    priorityTone: "neutral", hasPlan: false },
  ];

  const progressColor = (tone) =>
    tone === "success" ? "var(--success)" : tone === "danger" ? "var(--danger)" : "var(--student)";

  const goGenerate = (e) => {
    if (e) e.preventDefault();
    navigate && navigate(["my-time","study-planner","generate"]);
  };

  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto" }}>

      {/* ── Page header ── */}
      <div style={{ marginBottom: 24 }}>
        <Breadcrumbs segments={["my-time","study-planner"]}/>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: 8, gap: 16 }}>
          <div>
            <h1 className="t-h1" style={{ fontSize: 28, marginBottom: 6, marginTop: 0, display: "flex", alignItems: "center", gap: 10 }}>
              Study Planner
              <span style={{
                fontSize: 10, fontWeight: 700, color: "var(--student-deep)",
                background: "var(--student-soft)", border: "1px solid var(--student-200)",
                padding: "2px 7px", borderRadius: 5, letterSpacing: "0.07em", alignSelf: "center",
              }}>AI</span>
            </h1>
            <p className="t-body" style={{ color: "var(--stone)", margin: 0 }}>
              AI-powered planning to keep you on track.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexShrink: 0, alignItems: "center" }}>
            <button className="btn btn-sm"><I.Settings size={12} color="var(--stone)"/> Preferences</button>
            <button style={{
              padding: "7px 14px", background: "var(--student)", color: "#fff",
              border: "none", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              display: "inline-flex", gap: 6, alignItems: "center",
            }}>
              <I.Plus size={13} color="#fff"/> New Plan
            </button>
          </div>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 280px", gap: 20, alignItems: "flex-start" }}>

        {/* ══ MAIN ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

          {/* ─ Section 1: My Study Plans ─ */}
          <div>
            <MK_SectionHead title="My Study Plans" action="View all →"/>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PLANS.map((p) => {
                const Ico = I[p.icon] || I.Document;
                return (
                  <MK_Card key={p.id} padding={16}>
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ width: 40, height: 40, borderRadius: 9, background: p.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Ico size={18} color={p.iconFg}/>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{p.title}</span>
                          <MK_Pill tone={p.statusTone}>{p.statusLabel}</MK_Pill>
                        </div>
                        <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 10 }}>
                          {p.subject} · Due {p.due}
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                            <span style={{ fontSize: 11, color: "var(--stone)" }}>Progress</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)" }}>{p.progress}%</span>
                          </div>
                          <ProgressBar value={p.progress} color={progressColor(p.statusTone)}/>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11.5, color: "var(--stone)" }}>{p.meta}</span>
                          <a href="#" onClick={goGenerate}
                            style={{ fontSize: 12.5, fontWeight: 600, color: "var(--student-deep)", textDecoration: "none" }}>
                            {p.cta}
                          </a>
                        </div>
                      </div>
                    </div>
                  </MK_Card>
                );
              })}
            </div>
          </div>

          {/* ─ Section 2: Upcoming Assignments ─ */}
          <div>
            <MK_SectionHead title="Upcoming Assignments" action="View all →"/>
            <MK_Card padding={0}>
              {/* Column headers */}
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 130px 110px 120px auto",
                gap: 12, padding: "10px 18px",
                background: "var(--bone)", borderBottom: "1px solid var(--mist)",
                fontSize: 10.5, fontWeight: 700, color: "var(--stone)",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>
                <span>Assignment</span>
                <span>Due</span>
                <span>Priority</span>
                <span>Plan</span>
                <span/>
              </div>
              {ASSIGNMENTS.map((a, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 130px 110px 120px auto",
                  gap: 12, padding: "13px 18px",
                  borderTop: i ? "1px solid var(--mist)" : "none",
                  alignItems: "center",
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)" }}>{a.subject}</div>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--slate)" }}>{a.due}</div>
                  <div><MK_Pill tone={a.priorityTone}>{a.priority}</MK_Pill></div>
                  <div>
                    {a.hasPlan
                      ? <span style={{ fontSize: 11.5, color: "var(--success)", fontWeight: 500 }}>
                          ✓&nbsp;Plan exists
                        </span>
                      : <span style={{ fontSize: 11.5, color: "var(--silver)" }}>—</span>
                    }
                  </div>
                  <div>
                    {a.hasPlan ? (
                      <a href="#" onClick={goGenerate}
                        style={{ fontSize: 12.5, fontWeight: 600, color: "var(--student-deep)", textDecoration: "none", whiteSpace: "nowrap" }}>
                        Edit Plan →
                      </a>
                    ) : (
                      <button onClick={goGenerate} style={{
                        padding: "5px 11px", background: "var(--student-soft)",
                        border: "1px solid var(--student-200)", color: "var(--student-deep)",
                        borderRadius: 7, fontSize: 12, fontWeight: 600, cursor: "pointer",
                        display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap",
                      }}>
                        <I.Sparkle size={11} color="var(--student)"/> Generate Plan →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </MK_Card>
          </div>
        </div>

        {/* ══ SIDEBAR ══ */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Card 1: Study Stats */}
          <MK_Card padding={18}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 14 }}>Your Study Stats</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {[
                { icon: "Flame",  iconBg: "#FEF3C7", iconFg: "#D97706", label: "Current Streak",             value: "12 days" },
                { icon: "Check",  iconBg: "#DCFCE7", iconFg: "#16A34A", label: "Plans completed this month", value: "3"       },
                { icon: "Target", iconBg: "#DBEAFE", iconFg: "#2563EB", label: "On-time rate",               value: "75%"     },
                { icon: "Clock",  iconBg: "#F3E8FF", iconFg: "#7C3AED", label: "Avg. session length",        value: "45 min"  },
              ].map((s, i) => {
                const Ico = I[s.icon] || I.Star;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: s.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Ico size={13} color={s.iconFg}/>
                    </div>
                    <div style={{ flex: 1, fontSize: 11.5, color: "var(--stone)" }}>{s.label}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", flexShrink: 0 }}>{s.value}</div>
                  </div>
                );
              })}
            </div>
          </MK_Card>

          {/* Card 2: This Week's Focus */}
          <MK_Card padding={18}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 14 }}>This Week's Focus</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { title: "Argument Essay",     sub: "English 10 · Due Fri",    border: "var(--danger)"  },
                { title: "Biology Lab Report", sub: "Biology 101 · Due today",  border: "var(--danger)"  },
                { title: "Quadratic Homework", sub: "Algebra II · Due Thu",     border: "var(--warning)" },
              ].map((f, i) => (
                <div key={i} style={{
                  padding: "10px 12px", background: "var(--bone)", borderRadius: 8,
                  borderLeft: `3px solid ${f.border}`,
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
                }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{f.title}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)" }}>{f.sub}</div>
                  </div>
                  <I.ChevronRight size={13} color="var(--silver)"/>
                </div>
              ))}
            </div>
          </MK_Card>

          {/* Card 3: AI Tip */}
          <MK_Card padding={18} style={{ background: "#FAF5FF", border: "1px solid var(--student-200)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: "var(--student)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I.Sparkle size={13} color="#fff"/>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>AI Tip</div>
            </div>
            <p style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.55, margin: "0 0 12px" }}>
              You have a Flex Block tomorrow at 10:40 AM — perfect for starting the History Essay outline.
            </p>
            <a href="#" onClick={goGenerate}
              style={{ fontSize: 12.5, fontWeight: 600, color: "var(--student-deep)", textDecoration: "none" }}>
              Add to Plan →
            </a>
          </MK_Card>
        </div>

      </div>
    </div>
  );
}

/* ============================================================
   STUDY PLANNER — generated plan (detail / generate flow)
   ============================================================ */
function StudyPlannerGeneratePage({ segments, navigate }) {
  const [activeTab, setActiveTab] = React.useState(1);
  return (
    <Page segments={["my-time","study-planner"]} title="Generate Study Plan" emoji=""
      lede="AI creates a personalized plan to help you complete your work on time."
      extraCrumbs={["Generate Study Plan"]}
      actions={
        <a href="#/my-time/study-planner" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--stone)", fontSize: 12.5, fontWeight: 600, textDecoration: "none" }}>
          <I.ChevronLeft size={13} color="var(--stone)"/> Back to Study Planner
        </a>
      }
      rightRail={
        <>
          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Why this plan?</div>
              <I.X size={14} color="var(--silver)"/>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Key Factors</div>
            {[
              { ic: "📅", t: "Due in 2 days", s: "We front-loaded research and writing.", c: "#FEF3C7" },
              { ic: "🌙", t: "You write better in the evening", s: "More deep work scheduled after 3 PM.", c: "#DBEAFE" },
              { ic: "⏰", t: "You have Flex Block tomorrow", s: "Great opportunity for focused work.", c: "#DCFCE7" },
              { ic: "📊", t: "Longer tasks broken down", s: "Each step is < 60 minutes.", c: "#FED7AA" },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: f.c, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>{f.ic}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{f.t}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>{f.s}</div>
                </div>
              </div>
            ))}
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Your Progress on Similar Assignments</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, textAlign: "center" }}>
              {[{ n: "B+", l: "Average Grade", s: "88%" }, { n: "75%", l: "On-Time Rate", s: "Good" }, { n: "3h 15m", l: "Avg. Time Spent", s: "" }].map((s, i) => (
                <div key={i} style={{ padding: 10, background: "var(--bone)", borderRadius: 8 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: "var(--stone)", fontWeight: 600 }}>{s.l}</div>
                  {s.s && <div style={{ fontSize: 10, color: "var(--silver)" }}>{s.s}</div>}
                </div>
              ))}
            </div>
          </MK_Card>

          <MK_Card padding={18} style={{ background: "#FAF5FF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <I.Sparkle size={13} color="var(--student)"/>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>AI Tip</div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5, marginBottom: 10 }}>Want even more time to review? Move "Write body paragraphs 2–3" to tomorrow evening.</div>
            <button style={{ padding: "7px 12px", background: "var(--paper)", border: "1px solid var(--student)", color: "var(--student-deep)", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Apply Suggestion</button>
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Need help?</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 10 }}>Ask AI anything about this assignment</div>
            <div style={{ display: "flex", gap: 6, padding: 8, background: "var(--bone)", borderRadius: 8, marginBottom: 10 }}>
              <input placeholder="Ask a question..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12 }}/>
              <button style={{ width: 26, height: 26, borderRadius: 999, background: "var(--student)", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <I.ArrowRight size={12} color="#fff"/>
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button style={{ padding: "6px 10px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 6, fontSize: 11.5, color: "var(--slate)", textAlign: "left", cursor: "pointer" }}>How long should this be?</button>
              <button style={{ padding: "6px 10px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 6, fontSize: 11.5, color: "var(--slate)", textAlign: "left", cursor: "pointer" }}>Show rubric</button>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>More quick questions →</a>
            </div>
          </MK_Card>
        </>
      }
    >
      {/* Assignment header */}
      <MK_Card padding={18} style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: "var(--student-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <I.Document size={20} color="var(--student)"/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Finish Argument Essay</div>
            <MK_Pill tone="danger">High Priority</MK_Pill>
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>English 10 · Due: Fri, May 16 at 11:59 PM</div>
        </div>
        <button className="btn btn-sm">
          <I.External size={12} color="var(--stone)"/> View Assignment
        </button>
      </MK_Card>

      {/* Steps tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 16, borderBottom: "1px solid var(--mist)" }}>
        {[{ n: 1, l: "Plan Overview" }, { n: 2, l: "Breakdown" }, { n: 3, l: "Schedule It" }].map((s) => {
          const on = activeTab === s.n;
          return (
            <button key={s.n} onClick={() => setActiveTab(s.n)} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 14px", background: "none", border: "none",
              borderBottom: on ? "2px solid var(--student)" : "2px solid transparent",
              color: on ? "var(--student-deep)" : "var(--stone)",
              fontSize: 13, fontWeight: on ? 600 : 500,
              marginBottom: -1, cursor: "pointer",
            }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, background: on ? "var(--student)" : "var(--bone)", color: on ? "#fff" : "var(--stone)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>{s.n}</span>
              {s.l}
            </button>
          );
        })}
      </div>

      {/* ── Tab 1: Plan Overview ── */}
      {activeTab === 1 && <>

      {/* AI plan overview */}
      <MK_Card padding={18} style={{ marginBottom: 16, background: "#FAF5FF" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <I.Sparkle size={14} color="var(--student)"/>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>AI Study Plan Overview</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Estimated Total Time: 4h 30m</span>
            <MK_Pill tone="success">Start Today · Recommended</MK_Pill>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 14 }}>Here's a recommended plan based on the assignment requirements, your schedule, and past performance.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {[
            { ic: I.Heart, c: "#22C55E", t: "Personalized for You", s: "Based on past essays, this plan gives you extra time for writing." },
            { ic: I.ChartBar, c: "#3B82F6", t: "Balanced Workload", s: "Breaks the work into manageable steps across 5 days." },
            { ic: I.Calendar, c: "#A855F7", t: "Fits Your Schedule", s: "Uses your free time and Flex Blocks to avoid class conflicts." },
            { ic: I.TrendUp, c: "#F59E0B", t: "Better Outcomes", s: "Completing the plan on time can boost your grade by 8–10%." },
          ].map((f, i) => (
            <div key={i} style={{ background: "var(--paper)", padding: 12, borderRadius: 8 }}>
              <f.ic size={16} color={f.c}/>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginTop: 6 }}>{f.t}</div>
              <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2, lineHeight: 1.4 }}>{f.s}</div>
            </div>
          ))}
        </div>
      </MK_Card>

      {/* Suggested plan */}
      <MK_Card padding={18}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Suggested Plan</div>
        {[
          { day: "Today · Wed, May 14", total: "1h 10m", expanded: false, items: [
            { time: "10:40 – 11:20 AM", tag: "Flex Block", tagTone: "pending", task: "Research topic & gather sources", dur: "30 min" },
            { time: "3:30 – 4:10 PM", tag: "After School", tagTone: "info", task: "Create outline", dur: "40 min" },
          ]},
          { day: "Thu, May 15", total: "1h", expanded: false, items: [
            { time: "10:40 – 11:20 AM", tag: "Flex Block", tagTone: "pending", task: "Write thesis & introduction", dur: "30 min" },
            { time: "7:00 – 7:30 PM", tag: "Evening", tagTone: "purple", task: "Write body paragraph 1", dur: "30 min" },
          ]},
          { day: "Fri, May 16 (Due Date)", total: "2h 20m", expanded: true, items: [
            { time: "10:40 – 11:20 AM", tag: "Flex Block", tagTone: "pending", task: "Write body paragraphs 2–3", dur: "40 min" },
            { time: "3:30 – 4:30 PM", tag: "After School", tagTone: "info", task: "Conclusion & review", dur: "40 min" },
            { time: "7:00 – 7:40 PM", tag: "Evening", tagTone: "purple", task: "Edit & polish final draft", dur: "1 hr" },
          ]},
        ].map((d, di) => (
          <div key={di} style={{ marginBottom: 14, borderBottom: di < 2 ? "1px solid var(--mist)" : "none", paddingBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: di === 2 ? "var(--danger)" : "var(--ink)" }}>{d.day}</div>
              <div style={{ flex: 1 }}/>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{d.total}</div>
              <I.ChevronDown size={12} color="var(--silver)" style={{ transform: d.expanded ? "rotate(180deg)" : "none" }}/>
            </div>
            {d.items.map((it, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 110px 100px 1fr 60px auto", gap: 12, alignItems: "center", padding: "8px 0" }}>
                <div style={{ width: 16, height: 16, border: "1.5px solid var(--silver)", borderRadius: 999 }}/>
                <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{it.time}</div>
                <MK_Pill tone={it.tagTone}>{it.tag}</MK_Pill>
                <div style={{ fontSize: 12.5, color: "var(--ink)" }}>{it.task}</div>
                <div style={{ fontSize: 11, color: "var(--silver)" }}>{it.dur}</div>
                <button className="btn btn-sm">
                  <I.Calendar size={11} color="var(--stone)"/> Add to Calendar
                </button>
              </div>
            ))}
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-sm"><I.Wand size={11} color="var(--stone)"/> Adjust Plan</button>
            <button className="btn btn-sm"><I.Refresh size={11} color="var(--stone)"/> Regenerate Plan</button>
          </div>
          <button style={{ padding: "8px 18px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", gap: 6, alignItems: "center" }}>
            <I.Calendar size={13} color="#fff"/> Add All to Calendar &amp; To Do
            <I.ChevronDown size={12} color="#fff"/>
          </button>
        </div>
      </MK_Card>

      </>}

      {/* ── Tab 2: Breakdown ── */}
      {activeTab === 2 && (
        <MK_Card padding={32}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 240, textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--student-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <I.ListChecks size={22} color="var(--student)"/>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Breakdown</div>
            <div style={{ fontSize: 13, color: "var(--stone)", maxWidth: 360 }}>Step-by-step task breakdown coming soon — each session will be broken into smaller, actionable chunks.</div>
          </div>
        </MK_Card>
      )}

      {/* ── Tab 3: Schedule It ── */}
      {activeTab === 3 && (
        <MK_Card padding={32}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minHeight: 240, textAlign: "center" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--student-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <I.Calendar size={22} color="var(--student)"/>
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Schedule It</div>
            <div style={{ fontSize: 13, color: "var(--stone)", maxWidth: 360 }}>Calendar integration coming soon — you'll be able to confirm time slots and push sessions directly to your calendar.</div>
          </div>
        </MK_Card>
      )}

    </Page>
  );
}

/* ============================================================
   MY TOOLS — workspace
   ============================================================ */
function MyToolsPage({ segments }) {
  return (
    <Page segments={segments} title="My Tools" emoji=""
      lede="Your workspace for creating, solving, and bringing ideas to life."
      actions={
        <>
          <button className="btn btn-sm"><I.Settings size={12} color="var(--stone)"/> Customize</button>
          <div style={{ display: "inline-flex", border: "1px solid var(--mist)", borderRadius: 8, overflow: "hidden", background: "var(--paper)" }}>
            <button style={{ padding: "6px 10px", border: "none", background: "var(--student-soft)", cursor: "pointer" }}><I.GridView size={14} color="var(--student)"/></button>
            <button style={{ padding: "6px 10px", border: "none", background: "transparent", cursor: "pointer" }}><I.ListView size={14} color="var(--stone)"/></button>
          </div>
        </>
      }
      rightRail={
        <>
          <MK_Card padding={18}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <I.Sparkle size={13} color="var(--student)"/>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Tool Suggestions</div>
              <span style={{ fontSize: 9, fontWeight: 700, color: "var(--student-deep)", background: "var(--student-soft)", padding: "1px 5px", borderRadius: 3, marginLeft: "auto", letterSpacing: "0.06em" }}>BETA</span>
            </div>
            <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 12 }}>Based on your classes and activity</div>
            {[
              { ic: "📈", c: "#DCFCE7", t: "Graph this equation?", s: "You're working on Linear Functions", b: "Open Graphing Tool" },
              { ic: "📝", c: "#FEF3C7", t: "Take notes on this reading?", s: "Biology Chapter 6 is due next week", b: "Open Notes" },
              { ic: "✏️", c: "#FED7AA", t: "Start your essay draft?", s: "Argumentative Essay due May 28", b: "Open Writing Tool" },
            ].map((s, i) => (
              <div key={i} style={{ paddingTop: i ? 12 : 0, borderTop: i ? "1px solid var(--mist)" : "none", paddingBottom: 12 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: s.c, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>{s.ic}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{s.t}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>{s.s}</div>
                    <button style={{ padding: "4px 10px", background: "var(--student-soft)", border: "none", color: "var(--student-deep)", borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{s.b}</button>
                  </div>
                </div>
              </div>
            ))}
            <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View more suggestions →</a>
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Recent Activity</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View all →</a>
            </div>
            {[
              { ic: "📈", c: "#DCFCE7", t: "Opened Graphing Tool", s: "Today at 10:24 AM" },
              { ic: "📝", c: "#FEF3C7", t: "Edited Biology Notes", s: "Today at 9:15 AM" },
              { ic: "🖼️", c: "#FED7AA", t: "Created Presentation", s: "Yesterday at 4:32 PM" },
              { ic: "🎤", c: "#FEE2E2", t: "Recorded Audio", s: "May 18 at 2:11 PM" },
              { ic: "📁", c: "#DBEAFE", t: "Uploaded File", s: "May 17 at 11:47 AM" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: a.c, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13 }}>{a.ic}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{a.t}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>{a.s}</div>
                </div>
              </div>
            ))}
          </MK_Card>
        </>
      }
    >
      {/* Continue Working */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Continue Working</div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View all →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { ic: "W", c: "#3B82F6", t: "Argumentative Essay Draft", k: "Writing", s: "Edited 20 min ago", prog: 72 },
            { ic: "📈", t: "Linear Functions Practice Graph", k: "Graphing", s: "Edited 1 hour ago" },
            { ic: "📝", t: "Biology Chapter 6 Notes", k: "Notes", s: "Edited yesterday", tag: "Class Notes" },
            { ic: "🧫", t: "Cell Structure Presentation", k: "Presentation", s: "Edited 2 days ago" },
          ].map((w, i) => (
            <MK_Card key={i} padding={14} style={{ position: "relative" }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: w.c || "var(--bone)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{w.ic}</div>
              <I.MoreH size={14} color="var(--silver)" style={{ position: "absolute", top: 14, right: 14 }}/>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>{w.t}</div>
              <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>{w.k}</div>
              <div style={{ fontSize: 10.5, color: "var(--silver)", marginBottom: 8 }}>{w.s}</div>
              {w.tag && <MK_Pill tone="purple">{w.tag}</MK_Pill>}
              {w.prog && (
                <div style={{ marginTop: 8 }}>
                  <div style={{ height: 4, background: "var(--bone)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: w.prog + "%", background: "var(--student)" }}/>
                  </div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)", marginTop: 4 }}>{w.prog}% complete</div>
                </div>
              )}
            </MK_Card>
          ))}
        </div>
      </div>

      {/* Explore Tools */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Explore Tools</div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>All Tools (12) →</a>
        </div>
        {[
          { cat: "Create", c: "#A855F7", desc: "Write, design, and communicate your ideas", items: [
            { ic: I.Edit, t: "Writing", s: "Docs, essays, and reports", id: "writing" },
            { ic: I.Notes, t: "Notes", s: "Take notes and organize ideas", id: "notes" },
            { ic: I.Image, t: "Presentation", s: "Slideshows and presentations", id: "presentation" },
          ]},
          { cat: "Think", c: "#22C55E", desc: "Solve problems and explore concepts", items: [
            { ic: I.Calculator2, t: "Calculator", s: "Advanced math calculations", id: "calculator" },
            { ic: I.ChartBar, t: "Graphing", s: "Plot equations and data", id: "graphing" },
            { ic: I.Edit, t: "Drawing", s: "Diagrams and sketching", id: "drawing" },
          ]},
          { cat: "Produce", c: "#EF4444", desc: "Record, edit, and create media", items: [
            { ic: I.Video, t: "Video Editing", s: "Edit and create videos", id: "video" },
            { ic: I.Speaker, t: "Audio Editing", s: "Record and edit audio", id: "audio-edit" },
            { ic: I.Mic, t: "Audio Recorder", s: "Quick audio recordings", id: "audio-record" },
          ]},
          { cat: "Organize", c: "#3B82F6", desc: "Keep your work organized and secure", items: [
            { ic: I.Folder, t: "File Manager", s: "Browse and manage your files", id: "files" },
            { ic: I.Notes, t: "Sticky Notes", s: "Quick notes anywhere", id: "sticky" },
            { ic: I.Atom, t: "Mind Map", s: "Visualize ideas and connections", id: "mindmap" },
          ]},
        ].map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "200px repeat(3, 1fr)", gap: 12 }}>
              <MK_Card padding={14} style={{ borderLeft: `3px solid ${cat.c}` }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: cat.c, marginBottom: 4 }}>{cat.cat}</div>
                <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.4 }}>{cat.desc}</div>
              </MK_Card>
              {cat.items.map((it, i) => (
                <a key={i} href={"#/my-tools/" + it.id} style={{ textDecoration: "none" }}>
                <MK_Card padding={14} style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer" }}>
                  <div style={{ width: 26, height: 26, borderRadius: 6, background: cat.c + "1A", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <it.ic size={14} color={cat.c}/>
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{it.t}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)" }}>{it.s}</div>
                  </div>
                </MK_Card>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick tools strip */}
      <MK_Card padding={14} style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Quick Tools</div>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>Jump back in fast</div>
        </div>
        <div style={{ flex: 1 }}/>
        {[
          { ic: I.Notes, t: "Notes", c: "#F59E0B", id: "notes" },
          { ic: I.Edit, t: "Writing", c: "#A855F7", id: "writing" },
          { ic: I.ChartBar, t: "Graphing", c: "#22C55E", id: "graphing" },
          { ic: I.Calculator2, t: "Calculator", c: "#0EA5A4", id: "calculator" },
          { ic: I.Folder, t: "File Manager", c: "#3B82F6", id: "files" },
          { ic: I.Mic, t: "Audio Recorder", c: "#EF4444", id: "audio-record" },
        ].map((q, i) => (
          <a key={i} href={"#/my-tools/" + q.id} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
            <q.ic size={13} color={q.c}/> {q.t}
          </a>
        ))}
        <button style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "var(--student-soft)", border: "1px dashed var(--student-200)", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--student-deep)" }}>
          <I.Plus size={13} color="var(--student)"/> Add / Pin Tools
        </button>
      </MK_Card>
    </Page>
  );
}

/* ============================================================
   EVENTS — Academic & Exams tab
   ============================================================ */
function EventsPage({ segments }) {
  return (
    <Page segments={segments} title="Events" emoji=""
      lede="Stay informed. Take action. Make the most of every opportunity."
      actions={<button className="btn btn-sm"><I.Calendar size={12} color="var(--stone)"/> Add to Calendar</button>}
      rightRail={
        <>
          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>My Registrations</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            {[
              { mark: "SAT", t: "SAT – June 8, 2025", s: "Status: Not Registered" },
              { mark: "ACT", t: "ACT – June 14, 2025", s: "Status: Not Registered" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "10px 0", borderTop: i ? "1px solid var(--mist)" : "none", alignItems: "center" }}>
                <div style={{ width: 38, height: 38, borderRadius: 6, background: "#1E293B", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{r.mark}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{r.t}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>{r.s}</div>
                </div>
                <button style={{ padding: "5px 10px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 6, fontSize: 11.5, fontWeight: 500, color: "var(--ink)", cursor: "pointer", display: "inline-flex", gap: 4, alignItems: "center" }}>
                  Action <I.ChevronDown size={10} color="var(--silver)"/>
                </button>
              </div>
            ))}
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <I.Sparkle size={13} color="var(--student)"/>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Coach</div>
              <I.X size={12} color="var(--silver)" style={{ marginLeft: "auto" }}/>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink)", marginBottom: 4 }}>Hi Alex! 👋</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 12 }}>I'm here to help you stay on track and reach your goals. Here are some things I noticed.</div>
            {[
              { ic: I.Clock, t: "SAT registration closes soon", s: "May 20 deadline", b: "Register Now" },
              { ic: I.Book, t: "Build a study plan", s: "I can create a personalized plan based on your goals.", b: "Create Plan" },
              { ic: I.Edit, t: "Practice makes progress", s: "Take a full-length practice test to see where you stand.", b: "Take Practice Test" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--student-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.ic size={13} color="var(--student)"/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{s.t}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 4 }}>{s.s}</div>
                  <button style={{ padding: "4px 10px", background: "var(--paper)", border: "1px solid var(--student-200)", color: "var(--student-deep)", borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{s.b}</button>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, padding: 8, background: "var(--bone)", borderRadius: 8, marginTop: 10 }}>
              <input placeholder="Ask me anything..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12 }}/>
              <button style={{ width: 22, height: 22, borderRadius: 999, background: "var(--student)", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <I.ArrowRight size={11} color="#fff"/>
              </button>
            </div>
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Helpful Links</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            {["SAT - College Board", "ACT - ACT.org", "AP Central", "Testing Calendar (PDF)"].map((l, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ fontSize: 12.5, color: "var(--ink)" }}>{l}</div>
                <I.External size={11} color="var(--silver)"/>
              </div>
            ))}
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Filters</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Clear All</a>
            </div>
            <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>Categories</div>
            <div style={{ padding: 8, border: "1px solid var(--mist)", borderRadius: 6, marginBottom: 12, fontSize: 12, color: "var(--ink)", display: "flex", justifyContent: "space-between" }}>
              Academic &amp; Exams <I.ChevronDown size={11} color="var(--silver)"/>
            </div>
            {[
              { l: "Registration Open", c: true },
              { l: "This Month", c: false },
              { l: "Next 3 Months", c: false },
            ].map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                <div style={{ width: 14, height: 14, border: f.c ? "none" : "1px solid var(--mist)", borderRadius: 3, background: f.c ? "var(--student)" : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {f.c && <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#fff" strokeWidth="3.5"><path d="M5 12.5L10 17.5l9-11"/></svg>}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink)" }}>{f.l}</div>
              </div>
            ))}
          </MK_Card>
        </>
      }
    >
      {/* Tab strip */}
      <div style={{ display: "flex", gap: 14, marginBottom: 16, borderBottom: "1px solid var(--mist)", overflowX: "auto" }}>
        {["All Events", "School Events", "Academic & Exams", "College & Careers", "Extracurricular", "External Opportunities"].map((t, i) => {
          const a = i === 2;
          return <a key={t} href="#" style={{ padding: "10px 6px", textDecoration: "none", color: a ? "var(--student-deep)" : "var(--stone)", fontSize: 13, fontWeight: a ? 600 : 500, borderBottom: a ? "2px solid var(--student)" : "2px solid transparent", marginBottom: -1, whiteSpace: "nowrap" }}>{t}</a>;
        })}
      </div>

      {/* Sub-filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center", flexWrap: "wrap" }}>
        <button style={{ padding: "6px 12px", background: "var(--student-soft)", color: "var(--student-deep)", border: "1px solid var(--student-200)", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", display: "inline-flex", gap: 4, alignItems: "center" }}>Upcoming <I.ChevronDown size={11} color="var(--student-deep)"/></button>
        <button className="btn btn-sm">All</button>
        <button className="btn btn-sm">Registration Open</button>
        <button className="btn btn-sm">This Month</button>
        <button className="btn btn-sm">Next 3 Months</button>
        <div style={{ flex: 1 }}/>
        <div style={{ fontSize: 12, color: "var(--stone)" }}>Sort by:</div>
        <button className="btn btn-sm">Date <I.ChevronDown size={11} color="var(--stone)"/></button>
      </div>

      {/* AI Insight strip */}
      <MK_Card padding={16} style={{ marginBottom: 16, background: "var(--student-soft)", border: "1px solid var(--student-200)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <I.Sparkle size={13} color="var(--student)"/>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>AI Insight for You</div>
          <I.X size={12} color="var(--silver)" style={{ marginLeft: "auto" }}/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { ic: "📅", c: "#FEF3C7", t: "SAT registration closes in 8 days", s: "Don't miss the May 20 deadline.", b: "Register Now" },
            { ic: "🎯", c: "#DBEAFE", t: "Based on your goals", s: "Taking the SAT this year can help keep your college options open.", b: "Why this matters →", soft: true },
            { ic: "📘", c: "#FED7AA", t: "Need help preparing?", s: "I can create a personalized study plan for you.", b: "Create Study Plan" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 30, height: 30, borderRadius: 6, background: c.c, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 14 }}>{c.ic}</div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{c.t}</div>
                <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>{c.s}</div>
                {c.soft ? <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>{c.b}</a>
                : <button style={{ padding: "4px 10px", background: "var(--paper)", border: "1px solid var(--student-200)", color: "var(--student-deep)", borderRadius: 999, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>{c.b}</button>}
              </div>
            </div>
          ))}
        </div>
      </MK_Card>

      {/* Featured exams */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        {[
          { bg: "linear-gradient(135deg, #6D28D9, #2E1065)", logo: "SAT", date: "June 8, 2025", lab: "SAT Test – June 8, 2025", sub: "Register now for the June SAT. Don't miss the deadline!", deadline: "May 20, 2025" },
          { bg: "linear-gradient(135deg, #1E3A8A, #0F1E40)", logo: "ACT", date: "June 14, 2025", lab: "ACT Test – June 14, 2025", sub: "Secure your spot for the June ACT today.", deadline: "May 9, 2025" },
        ].map((e, i) => (
          <MK_Card key={i} padding={0} style={{ background: e.bg, color: "#fff", border: "none", overflow: "hidden", position: "relative" }}>
            <div style={{ padding: 18, position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
                <MK_Pill tone="success">Registration Open</MK_Pill>
                <div style={{ flex: 1 }}/>
                <I.Bookmark size={14} color="rgba(255,255,255,0.7)"/>
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{e.lab}</div>
              <div style={{ fontSize: 12, opacity: 0.85, marginBottom: 14 }}>{e.sub}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div>
                  <div style={{ fontSize: 10, opacity: 0.7, display: "flex", gap: 4, alignItems: "center" }}><I.Calendar size={10} color="rgba(255,255,255,0.7)"/> Exam Date</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{e.date}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, opacity: 0.7, display: "flex", gap: 4, alignItems: "center" }}><I.Clock size={10} color="rgba(255,255,255,0.7)"/> Registration Deadline</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>{e.deadline}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ padding: "8px 14px", background: "var(--paper)", color: "var(--ink)", border: "none", borderRadius: 6, fontSize: 12.5, fontWeight: 700, cursor: "pointer", display: "inline-flex", gap: 6, alignItems: "center" }}>Register Now <I.External size={11} color="var(--ink)"/></button>
                <button style={{ padding: "8px 14px", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: 6, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>More Details</button>
              </div>
            </div>
            <div style={{ position: "absolute", right: 14, top: 60, fontFamily: "var(--font-display)", fontSize: 64, fontWeight: 800, opacity: 0.2, letterSpacing: "0.1em" }}>{e.logo}</div>
          </MK_Card>
        ))}
      </div>

      {/* List */}
      <MK_Card padding={0}>
        {[
          { ic: "AP", c: "#FED7AA", t: "AP Exams 2025", s: "Advanced Placement Exams: May 5 – May 16", tag: "Starting Soon", tagTone: "warning", date: "MAY 5" },
          { ic: "📅", c: "#DBEAFE", t: "PSAT 10 - Fall 2025", s: "Preliminary PSAT for 10th graders", tag: "Registration Opens Soon", tagTone: "warning", date: "AUG 20" },
          { ic: "📅", c: "#DBEAFE", t: "PSAT/NMSQT - Fall 2025", s: "National Merit Scholarship Qualifying Test", tag: "Registration Opens Soon", tagTone: "warning", date: "OCT 8" },
          { ic: "📅", c: "#DBEAFE", t: "AP Registration – Fall 2025", s: "Register for AP Exams", tag: "Not Open Yet", tagTone: "neutral", date: "NOV 1" },
        ].map((e, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto", gap: 14, alignItems: "center", padding: "14px 18px", borderTop: i ? "1px solid var(--mist)" : "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 6, background: e.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{e.ic}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{e.t}</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{e.s}</div>
            </div>
            <MK_Pill tone={e.tagTone}>{e.tag}</MK_Pill>
            <div style={{ textAlign: "center", fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{e.date.split(" ")[1]}</div>
              <div>{e.date.split(" ")[0]}</div>
            </div>
            <I.ChevronRight size={14} color="var(--silver)"/>
          </div>
        ))}
        <div style={{ borderTop: "1px solid var(--mist)", padding: "14px 18px", textAlign: "center" }}>
          <a href="#" style={{ fontSize: 12.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All Academic &amp; Exam Events →</a>
        </div>
      </MK_Card>
    </Page>
  );
}

window.MySchedulePage = MySchedulePage;
window.StudyPlannerPage = StudyPlannerPage;
window.StudyPlannerGeneratePage = StudyPlannerGeneratePage;
window.MyToolsPage = MyToolsPage;
window.EventsPage = EventsPage;

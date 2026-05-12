// LINKS — English 10 Period 4 class page
// Activates inside <ClassDetail> when classId === "english10".
// Sections: header · today's class · chat · schedule · tools · documents · assignments · growth

const Eng10Course = {
  id: "english10",
  name: "English 10",
  teacher: "Mrs. Lee",
  period: "Period 4",
  room: "Room 210",
  color: "#0EA5E9",
  abbr: "📖",
  unit: "Unit 2 · Argument & Persuasion",
  todayLesson: "Counterargument & Rebuttal",
  bell: "11:15 AM–12:00 PM",
  progress: 68,
};
window.Eng10Course = Eng10Course;

/* ─────────── Donut helper ─────────── */
function Eng10Donut({ value, color, size, children }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={12}/>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={12}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

/* ─────────── Page wrapper ─────────── */
function Eng10ClassPage({ c }) {
  const course = Eng10Course;
  const [tab, setTab] = React.useState("today");

  return (
    <div className="eng10-page" style={{
      display: "flex", flexDirection: "column", gap: 14,
      padding: "20px 24px", minWidth: 0,
    }}>
      <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 0", fontSize: 13 }}>
        <a href="#/my-classes" style={{ color: "var(--stone)", textDecoration: "none", fontWeight: 500 }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--ink)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--stone)"}
        >My Classes</a>
        <span style={{ color: "var(--silver)", userSelect: "none" }}>›</span>
        <span style={{ color: "var(--ink)", fontWeight: 500 }}>English 10</span>
      </nav>

      <Eng10Header c={c} course={course}/>

      {/* Sub-tabs */}
      <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--bone)", borderRadius: 10, alignSelf: "flex-start", flexWrap: "wrap" }}>
        {[
          { id: "today",     label: "Today's Class",     icon: "Sparkle" },
          { id: "virtual",   label: "Virtual Classroom",  icon: "Video" },
          { id: "documents", label: "Documents",          icon: "Folder" },
          { id: "tools",     label: "Class Tools",        icon: "Tools" },
          { id: "assign",    label: "Assignments",        icon: "Document" },
          { id: "grades",    label: "Growth",             icon: "Trophy" },
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

      {tab === "today"     && <Eng10TodayView course={course}/>}
      {tab === "virtual"   && <Eng10VirtualView course={course}/>}
      {tab === "documents" && <Eng10DocumentsView course={course}/>}
      {tab === "tools"     && <Eng10ToolsView course={course}/>}
      {tab === "assign"    && <Eng10AssignmentsView course={course}/>}
      {tab === "grades"    && <Eng10GradesView course={course}/>}
    </div>
  );
}
window.Eng10ClassPage = Eng10ClassPage;

/* ─────────── Header ─────────── */
function Eng10Header({ c, course }) {
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
          <span style={{ fontSize: 10.5, padding: "2px 8px", background: c.color, color: "#fff", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>IN PERSON</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.teacher} · {c.period} · {c.room} · <span style={{ color: c.color, fontWeight: 600, whiteSpace: "nowrap" }}>{course.bell}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, paddingRight: 8, flexShrink: 0 }}>
        <Eng10Stat label="Current Grade" value="84% · B" color={c.color}/>
        <Eng10Stat label="Current Unit" value={course.unit.replace("Unit 2 · ", "")}/>
      </div>
    </div>
  );
}

function Eng10Stat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: color || "var(--ink)" }}>{value}</div>
    </div>
  );
}

function Eng10Mini({ icon, color, label, value }) {
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

/* ═══════════════════════════════════════════════════════════════
   TAB 1 — Today's Class
═══════════════════════════════════════════════════════════════ */
function Eng10TodayView({ course }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", minWidth: 0 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        <Eng10PeriodSchedule course={course}/>
        <Eng10LessonAndMaterials course={course}/>
        <Eng10AITutorCard course={course}/>
        <Eng10SelfNavCard course={course}/>
        <Eng10ActivityFeed course={course}/>
        <Eng10TodaySidebar course={course}/>
      </div>
      <div style={{ width: 380, flexShrink: 0, position: "sticky", top: 70, height: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
        <Eng10ChatPanelWide course={course}/>
      </div>
    </div>
  );
}

/* ─────────── Period Schedule ─────────── */
function Eng10PeriodSchedule({ course }) {
  const segments = [
    { at: "11:15", len: 5,  title: "Do Now: Read the mentor text",               body: "Annotate as you read — mark the counterargument.",         icon: "Edit",     color: "#94A3B8", state: "done" },
    { at: "11:20", len: 15, title: "Mini-lesson: Counterargument Structure",      body: "Mrs. Lee walks through how to steel-man the other side.",  icon: "Book",     color: course.color, state: "active" },
    { at: "11:35", len: 20, title: "Discussion: Devil's Advocate Practice",       body: "Take the opposing side — argue it as strongly as you can.", icon: "Users",    color: "#8B5CF6", state: "upcoming" },
    { at: "11:55", len: 5,  title: "Exit Ticket: Write one counterargument sentence", body: "Submit before the bell.",                             icon: "Edit",     color: "#F59E0B", state: "upcoming" },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Today's Class Schedule</h2>
        <span style={{ fontSize: 11, color: "var(--stone)" }}>11:15 AM — 12:00 PM · 45 min</span>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 14 }}>
        You're <b style={{ color: course.color }}>10 minutes in</b>. Mini-lesson on counterarguments happening now.
      </div>

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
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Lesson & Materials ─────────── */
function Eng10LessonAndMaterials({ course }) {
  const [markedRead, setMarkedRead] = React.useState(false);
  const items = [
    { name: "Mentor Text — 'Should Schools Have Phone Bans?'", sub: "PDF · annotated · open link", icon: "Document", color: course.color },
    { name: "Argument Writing Checklist",                        sub: "PDF · reference",             icon: "Document", color: "#EF4444" },
    { name: "Counterargument Sentence Frames",                   sub: "PDF · scaffold",              icon: "Document", color: "#8B5CF6" },
    { name: "Khan Academy: Counterargument & Rebuttal",          sub: "Video · 8 min",               icon: "PlayCircle", color: "#F59E0B" },
    { name: "Unit 2 Vocabulary — Argument Terms",                sub: "28 terms · quick reference",  icon: "Bookmark",  color: "#10B981" },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>
        <span style={{ color: course.color, fontWeight: 600 }}>{course.unit}</span>
        <I.ChevronRight size={11} color="var(--stone)"/>
        <span>Lesson 2.4</span>
      </div>
      <h1 className="t-h1" style={{ fontSize: 24, margin: "0 0 4px" }}>{course.todayLesson}</h1>
      <div style={{ fontSize: 13, color: "var(--stone)" }}>
        Learn to steel-man the opposing view — then dismantle it with evidence.
      </div>

      {/* Metadata row */}
      <div style={{ display: "flex", gap: 18, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--mist)", flexWrap: "wrap" }}>
        <Eng10Mini icon="Clock"   color="#0EA5E9" label="Class Period"      value="45 min"/>
        <Eng10Mini icon="Users"   color="#8B5CF6" label="Discussion Partner" value="Jamie & Marcus"/>
        <Eng10Mini icon="MapPin"  color="#F59E0B" label="Location"           value="Room 210"/>
        <Eng10Mini icon="Trophy"  color="#10B981" label="Points"             value="10 pts"/>
      </div>

      {/* Announcement banner */}
      {!markedRead && (
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
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Bring your annotated mentor text today — we're analyzing structure</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>From Mrs. Lee, posted this morning</div>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={() => setMarkedRead(true)}>Mark read</button>
        </div>
      )}

      {/* Divider */}
      <div style={{ margin: "18px 0 14px", borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", background: "var(--paper)", paddingRight: 10, marginTop: -10, whiteSpace: "nowrap" }}>Learning Materials</span>
        <span style={{ fontSize: 11, color: "var(--stone)", background: "var(--paper)", paddingLeft: 4, marginTop: -10 }}>{course.unit}</span>
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
  );
}

/* ─────────── AI Tutor Card ─────────── */
function Eng10AITutorCard({ course }) {
  const [draft, setDraft] = React.useState("");
  const suggestions = [
    "Help me write a counterargument",
    "Check my thesis statement",
    "What makes a strong rebuttal?",
  ];
  return (
    <div style={{
      background: `linear-gradient(135deg, #F0F9FF 0%, ${course.color}10 100%)`,
      borderRadius: 14, padding: "18px 22px",
      border: `1px solid ${course.color}30`,
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `linear-gradient(135deg, ${course.color}, #0284C7)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <I.Sparkle size={20} color="#fff"/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Writing Tutor</h3>
            <span style={{ fontSize: 9, padding: "2px 6px", background: "#E0F2FE", color: "#0284C7", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 1 }}>Your 24/7 writing partner — trained on Unit 2 materials.</div>
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
          placeholder="Ask Writing Tutor anything about Argument & Persuasion…"
          style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)" }}
        />
        <button style={{
          background: `linear-gradient(135deg, ${course.color}, #0284C7)`,
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

/* ─────────── Self-Navigation Card ─────────── */
function Eng10SelfNavCard({ course }) {
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

/* ─────────── Activity Feed ─────────── */
function Eng10ActivityFeed({ course }) {
  const items = [
    { label: "DO NOW",            title: "Annotate the mentor text — mark the counterargument",                       time: "Now",        color: "#10B981" },
    { label: "DUE TONIGHT",       title: "Argument Essay — Draft 1 · 11:59 PM",                                       time: "Due 11:59 PM", color: "#EF4444" },
    { label: "JUST POSTED",       title: "Counterargument graphic organizer — fill in before discussion",             time: "12 min ago",  color: course.color },
    { label: "AI TUTOR SUGGESTS", title: "Your last essay had weak transitions — review the sentence frames",         time: "Personal",    color: "#8B5CF6" },
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

/* ─────────── Today Sidebar ─────────── */
function Eng10TodaySidebar({ course }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {/* Discussion Group */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Today's Discussion Group</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Eng10Member name="Alex Johnson" role="Note-taker" color={course.color} you/>
          <Eng10Member name="Jamie Kim"    role="Devil's Advocate" hue={200}/>
          <Eng10Member name="Marcus Torres" role="Moderator"      hue={120}/>
        </div>
        <div style={{ marginTop: 10, padding: "8px 10px", background: "var(--bone)", borderRadius: 8, fontSize: 11, color: "var(--stone)" }}>
          <I.MapPin size={11} color={course.color} style={{ verticalAlign: "-1px", marginRight: 4 }}/>
          📍 Room 210 · Seats together today
        </div>
      </div>

      {/* Seating map */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Room 210 — Seating</div>
        <Eng10SeatingMap color={course.color}/>
      </div>
    </div>
  );
}

function Eng10Member({ name, role, color = "#0EA5E9", hue, you }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {you ? (
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>YOU</div>
      ) : (
        <StockPortrait name={name} hue={hue} size={32}/>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
        <div style={{ fontSize: 10.5, color: "var(--stone)" }}>
          {you && <span style={{ display: "inline-block", marginRight: 4, fontSize: 9, padding: "1px 5px", background: `${color}20`, color: color, borderRadius: 3, fontWeight: 700 }}>YOU</span>}
          {role}
        </div>
      </div>
      {!you && <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.MessageCircle size={13} color="var(--stone)"/></button>}
    </div>
  );
}

/* ─────────── Seating Map SVG ─────────── */
function Eng10SeatingMap({ color }) {
  // 4 rows × 6 cols of desks, 52×36 each
  // Row y: 100, 148, 196, 244 | Col x: 60, 130, 200, 270, 340, 410
  // Alex: row 2 (y=148), col 4 (x=270)
  const rowYs = [100, 148, 196, 244];
  const colXs = [60, 130, 200, 270, 340, 410];

  const occupiedExtras = [
    [0,0],[0,1],[0,3],[0,5],
    [1,0],[1,2],[1,3],
    [2,1],[2,4],[2,5],
    [3,0],[3,2],[3,5],
  ];
  const occupiedSet = new Set(occupiedExtras.map(([r,c]) => `${r}-${c}`));

  return (
    <div style={{ background: "var(--bone)", borderRadius: 8, overflow: "hidden", lineHeight: 0 }}>
      <svg width="480" height="280" style={{ display: "block", width: "100%", height: "auto" }} aria-label="Room 210 seating map">
        <defs>
          <pattern id="eng10Floor" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#F8FAFC"/>
            <rect x="6" width="6" height="6" fill="#F1F5F9"/>
            <rect y="6" width="6" height="6" fill="#F1F5F9"/>
            <rect x="6" y="6" width="6" height="6" fill="#F8FAFC"/>
          </pattern>
        </defs>

        {/* Outer walls */}
        <rect x="0" y="0" width="480" height="280" fill="#334155"/>
        {/* Inner floor */}
        <rect x="8" y="8" width="464" height="264" fill="url(#eng10Floor)"/>

        {/* Wall shadow stripes */}
        <rect x="8" y="8"   width="464" height="4" fill="#475569" opacity="0.18"/>
        <rect x="8" y="268" width="464" height="4" fill="#475569" opacity="0.18"/>
        <rect x="468" y="8" width="4"   height="264" fill="#475569" opacity="0.18"/>
        <rect x="8" y="8"   width="4"   height="264" fill="#475569" opacity="0.18"/>

        {/* Whiteboard at top */}
        <rect x="140" y="8" width="200" height="26" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1"/>
        <text x="240" y="25" fontSize="9" fill="#334155" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic">Counterargument — Lesson 2.4</text>

        {/* Bookshelf back-left */}
        <rect x="10" y="8" width="110" height="36" fill="#78716C" rx="2"/>
        <rect x="10" y="21" width="110" height="2" fill="#57534E"/>
        <rect x="10" y="33" width="110" height="2" fill="#57534E"/>
        {[{x:12,c:"#94A3B8"},{x:19,c:"#FCA5A5"},{x:26,c:"#86EFAC"},{x:33,c:"#C4B5FD"},{x:40,c:"#A8A29E"},{x:47,c:"#94A3B8"}].map((bk,i)=><rect key={"e1"+i} x={bk.x} y="10" width="5" height="9" rx="0.5" fill={bk.c}/>)}
        {[{x:12,c:"#FCA5A5"},{x:19,c:"#C4B5FD"},{x:26,c:"#A8A29E"},{x:33,c:"#86EFAC"},{x:40,c:"#FCA5A5"},{x:47,c:"#94A3B8"}].map((bk,i)=><rect key={"e2"+i} x={bk.x} y="23" width="5" height="8" rx="0.5" fill={bk.c}/>)}
        {[{x:12,c:"#86EFAC"},{x:19,c:"#94A3B8"},{x:26,c:"#FCA5A5"},{x:33,c:"#C4B5FD"},{x:40,c:"#A8A29E"},{x:47,c:"#86EFAC"}].map((bk,i)=><rect key={"e3"+i} x={bk.x} y="35" width="5" height="9" rx="0.5" fill={bk.c}/>)}
        <text x="63" y="52" fontSize="7" fill="#fff" textAnchor="middle" fontFamily="sans-serif">Library</text>

        {/* Bulletin board right wall */}
        <rect x="446" y="56" width="22" height="50" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="1" rx="2"/>
        <text x="457" y="74" fontSize="7" fill="#92400E" textAnchor="middle" fontFamily="sans-serif">Writing</text>
        <text x="457" y="84" fontSize="7" fill="#92400E" textAnchor="middle" fontFamily="sans-serif">Tips</text>

        {/* Door left wall */}
        <rect x="8" y="118" width="8" height="44" fill="#475569" stroke="#334155" strokeWidth="1"/>
        <circle cx="18" cy="140" r="2.5" fill="#64748B"/>

        {/* Teacher desk */}
        <rect x="180" y="42" width="120" height="38" fill="#334155" stroke="#475569" rx="3"/>
        <text x="240" y="58" fontSize="9" fontWeight="700" fill="#F8FAFC" textAnchor="middle" fontFamily="sans-serif">Mrs. Lee</text>
        <text x="240" y="72" fontSize="7" fill="#94A3B8" textAnchor="middle" fontFamily="sans-serif">Room 210</text>
        {/* Monitor */}
        <rect x="278" y="47" width="22" height="15" rx="2" fill="#1E293B"/>
        <rect x="280" y="49" width="18" height="11" fill="#0284C7" opacity="0.85"/>
        {/* Mrs. Lee sprite */}
        <circle cx="156" cy="46" r="7" fill="#0EA5E9" stroke="#fff" strokeWidth="1.5"/>
        <rect x="150" y="53" width="12" height="8" rx="2" fill="#0EA5E9" opacity="0.9"/>

        {/* Potted plant front-left */}
        <rect x="14" y="240" width="16" height="16" rx="3" fill="#78350F" opacity="0.8"/>
        <ellipse cx="22" cy="237" rx="10" ry="7" fill="#15803D"/>
        <ellipse cx="15" cy="232" rx="7" ry="5" fill="#16A34A"/>
        <ellipse cx="29" cy="233" rx="6" ry="5" fill="#22C55E"/>
        <ellipse cx="22" cy="228" rx="5" ry="4" fill="#4ADE80"/>

        {/* Potted plant front-right */}
        <rect x="450" y="240" width="16" height="16" rx="3" fill="#78350F" opacity="0.8"/>
        <ellipse cx="458" cy="237" rx="10" ry="7" fill="#15803D"/>
        <ellipse cx="451" cy="232" rx="7" ry="5" fill="#16A34A"/>
        <ellipse cx="465" cy="233" rx="6" ry="5" fill="#22C55E"/>
        <ellipse cx="458" cy="228" rx="5" ry="4" fill="#4ADE80"/>

        {/* Desk grid */}
        {rowYs.map((dy, row) =>
          colXs.map((dx, col) => {
            const isYou = row === 1 && col === 3; // row 2 (y=148), col 4 (x=270)
            const key = `${row}-${col}`;
            const isOccupied = isYou || occupiedSet.has(key);
            const spriteCX = dx + 26;
            const spriteY = dy - 12;

            return (
              <g key={key}>
                {/* Desk */}
                <rect
                  x={dx} y={dy} width={52} height={36} rx={3}
                  fill={isYou ? "#E0F2FE" : "#E2E8F0"}
                  stroke={isYou ? color : "#94A3B8"}
                  strokeWidth={isYou ? 2 : 1}
                />
                {/* YOU badge + sprite */}
                {isYou && (
                  <>
                    <rect x={spriteCX - 14} y={spriteY - 14} width={28} height={12} rx={3} fill={color}/>
                    <text x={spriteCX} y={spriteY - 4} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="sans-serif">YOU</text>
                    <circle cx={spriteCX} cy={spriteY} r={7} fill="#fff" opacity={0.9}/>
                    <circle cx={spriteCX} cy={spriteY} r={6} fill={color}/>
                    <rect x={spriteCX - 6} y={spriteY + 6} width={12} height={8} rx={2} fill={color} opacity={0.9}/>
                  </>
                )}
                {/* Other occupied seats */}
                {!isYou && isOccupied && (
                  <circle cx={spriteCX} cy={spriteY} r={5} fill="#CBD5E1"/>
                )}
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}

/* ─────────── Wide Class Chat Panel (right sidebar on Today tab) ─────────── */
function Eng10ChatPanelWide({ course }) {
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
      <Eng10RightRail course={course}/>
    </div>
  );
}

function Eng10RightRail({ course }) {
  const [tab, setTab] = React.useState("chat");

  return (
    <div style={{
      background: "transparent", borderRadius: 14,
      overflow: "hidden",
      flex: 1, minHeight: 0,
      display: "flex", flexDirection: "column",
    }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--mist)", background: "var(--bone)" }}>
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
      </div>

      {tab === "chat" && (
        <div style={{
          padding: "8px 12px", background: `${course.color}0F`,
          borderBottom: "1px solid var(--mist)",
          display: "flex", alignItems: "center", gap: 8, fontSize: 11.5,
        }}>
          <I.Pin size={12} color={course.color}/>
          <span style={{ color: "var(--stone)" }}>Live during class — moderated by</span>
          <b style={{ color: "var(--ink)" }}>Mrs. Lee</b>
          <span style={{ marginLeft: "auto", color: "#10B981", fontWeight: 600 }}>● 24 online</span>
        </div>
      )}

      {tab === "chat"     && <Eng10ChatPanel course={course}/>}
      {tab === "channels" && <Eng10ChannelsPanel course={course}/>}
      {tab === "people"   && <Eng10PeoplePanel course={course}/>}
    </div>
  );
}

function Eng10ChatPanel({ course }) {
  const [msgs, setMsgs] = React.useState([
    { who: "Mrs. Lee",     role: "teacher", msg: "Let's look at how the mentor text handles the counterargument — highlight your copy.", time: "11:18 AM", hue: 200 },
    { who: "Jamie K.",     msg: "Does the concession always come before the rebuttal?",                                                   time: "11:19 AM", hue: 30 },
    { who: "Marcus T.",    msg: "I highlighted mine — the transition word is 'however'.",                                                time: "11:19 AM", hue: 120 },
    { who: "Mrs. Lee",     role: "teacher", msg: "Exactly — 'however' is doing a lot of work there. What other transitions could work?", time: "11:20 AM", hue: 200 },
    { who: "You",          self: true, msg: "Although / even though / while — they all set up a contrast.",                             time: "11:21 AM" },
    { who: "Writing Tutor", role: "ai", msg: "Great examples — those are called concessive conjunctions. They signal that you acknowledge the other side before countering it.", time: "11:21 AM" },
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
        <div style={{ textAlign: "center", fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", margin: "4px 0" }}>
          ─── Today, Period 4 ───
        </div>
        {msgs.map((m, i) => <Eng10ChatBubble key={i} m={m} course={course}/>)}
      </div>

      {/* Composer */}
      <div style={{ borderTop: "1px solid var(--mist)", padding: "10px 12px", background: "var(--paper)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <Eng10Chip icon="Book"    label="Question for Mrs. Lee"  color={course.color}/>
          <Eng10Chip icon="Sparkle" label="Ask Writing Tutor"       color="#8B5CF6"/>
          <Eng10Chip icon="Hand"    label="Raise hand"               color="#F59E0B"/>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "6px 8px", background: "var(--bone)", borderRadius: 10 }}>
          <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.Paperclip size={14} color="var(--stone)"/></button>
          <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.Image size={14} color="var(--stone)"/></button>
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

function Eng10ChatBubble({ m, course }) {
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
        <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${course.color}, #0284C7)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <I.Sparkle size={13} color="#fff"/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5 }}>
            <b style={{ color: "#0284C7" }}>{m.who}</b>
            <span style={{ marginLeft: 4, fontSize: 9, padding: "1px 4px", background: "#E0F2FE", color: "#0284C7", borderRadius: 3, fontWeight: 700 }}>AI</span>
            <span style={{ marginLeft: 6, fontSize: 10, color: "var(--silver)" }}>{m.time}</span>
          </div>
          <div style={{
            fontSize: 12, color: "var(--slate)", lineHeight: 1.45, marginTop: 2,
            background: "#F0F9FF", padding: "8px 10px", borderRadius: 10,
            borderLeft: `2px solid ${course.color}`,
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
      </div>
    </div>
  );
}

function Eng10Chip({ icon, label, color }) {
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

function Eng10ChannelsPanel({ course }) {
  const channels = [
    { name: "# general",              sub: "Whole-class chat (you're here)",          unread: 0, color: course.color, active: true },
    { name: "# lesson-2-4",           sub: "Counterargument & Rebuttal thread",        unread: 0, color: "#0EA5E9" },
    { name: "# discussion-group",     sub: "Just you, Jamie, Marcus",                  unread: 2, color: "#F59E0B" },
    { name: "# writing-help",         sub: "Ask anything — peers + Writing Tutor",     unread: 0, color: "#10B981" },
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
    </div>
  );
}

function Eng10PeoplePanel({ course }) {
  const teacher = { name: "Mrs. Lee", role: "Teacher", hue: 200, online: true };
  const peers = [
    { name: "Jamie Kim",    hue: 30,  online: true,  group: "Discussion Group" },
    { name: "Marcus Torres", hue: 120, online: true,  group: "Discussion Group" },
    { name: "Aisha B.",    hue: 320, online: true,  group: "Classmate" },
    { name: "Connor W.",   hue: 100, online: true,  group: "Classmate" },
    { name: "Rachel K.",   hue: 0,   online: false, group: "Classmate" },
    { name: "Liam G.",     hue: 200, online: true,  group: "Classmate" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Teacher</div>
      <Eng10PersonRow {...teacher} courseColor={course.color}/>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 14, marginBottom: 6 }}>Discussion Group</div>
      {peers.filter((p) => p.group === "Discussion Group").map((p, i) => <Eng10PersonRow key={"dg"+i} {...p} courseColor={course.color}/>)}
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 14, marginBottom: 6 }}>Classmates</div>
      {peers.filter((p) => p.group === "Classmate").map((p, i) => <Eng10PersonRow key={"cl"+i} {...p} courseColor={course.color}/>)}
    </div>
  );
}

function Eng10PersonRow({ name, role, hue, online, group, courseColor }) {
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

/* ═══════════════════════════════════════════════════════════════
   TAB 2 — Virtual Classroom
═══════════════════════════════════════════════════════════════ */
function Eng10VirtualView({ course }) {
  const [active, setActive]   = React.useState(false);
  const [notified, setNotified] = React.useState(false);
  const [camOn, setCamOn]     = React.useState(true);
  const [micOn, setMicOn]     = React.useState(true);
  const [elapsed, setElapsed] = React.useState(0);

  React.useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [active]);

  const fmtTime = (s) => {
    const h   = Math.floor(s / 3600).toString().padStart(2, "0");
    const m   = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  if (!active) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "40px 24px" }}>
        <div style={{
          position: "relative",
          width: "100%", maxWidth: 480,
          background: "var(--paper)", border: "1px solid var(--mist)",
          borderRadius: 16, padding: "32px 28px",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 20,
          textAlign: "center",
        }}>
          <button onClick={() => setActive(true)} style={{
            position: "absolute", top: 16, right: 16,
            background: "none", border: `1.5px solid ${course.color}`,
            borderRadius: 7, padding: "5px 12px",
            fontSize: 13, fontWeight: 600, color: course.color, cursor: "pointer",
          }}>Preview active state →</button>

          <div style={{
            width: "100%", height: 90,
            border: "2px dashed var(--mist)", borderRadius: 12,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            background: "var(--bone)",
          }}>
            <I.Video size={32} color="var(--silver)"/>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--silver)", letterSpacing: "0.02em" }}>Room 210 — Virtual Space</span>
          </div>

          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
            padding: "3px 10px", borderRadius: 999,
            background: "var(--bone)", color: "var(--stone)", border: "1px solid var(--mist)",
          }}>NOT CURRENTLY ACTIVE</span>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>Virtual Classroom</div>
            <div style={{ fontSize: 13, color: "var(--stone)", lineHeight: 1.6, maxWidth: 420 }}>
              This class meets in person. The virtual space is available for homework help and office hours.
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

  /* Active state */
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "0 -24px -20px" }}>
      <style>{`@keyframes eng10Pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}`}</style>

      {/* Status bar */}
      <div style={{
        height: 48, display: "flex", alignItems: "center",
        padding: "0 20px", gap: 10,
        background: "var(--bone)",
        borderLeft: "3px solid #10B981",
        borderBottom: "1px solid var(--mist)",
        flexShrink: 0,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#10B981", flexShrink: 0, display: "inline-block", animation: "eng10Pulse 1.6s ease-in-out infinite" }}/>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Live · Virtual Session</span>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>Mrs. Lee · Room 210 · Virtual</span>
        <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "var(--ink)", marginLeft: 4 }}>{fmtTime(elapsed)}</span>

        <div style={{ display: "flex", gap: 2, marginLeft: 10 }}>
          <Eng10IconBtn icon={micOn ? "Mic" : "MicOff"}       label="Mic"          active={micOn} onClick={() => setMicOn((v) => !v)}/>
          <Eng10IconBtn icon={camOn ? "Camera" : "CameraOff"} label="Camera"       active={camOn} onClick={() => setCamOn((v) => !v)}/>
          <Eng10IconBtn icon="Share"    label="Share Screen"/>
          <Eng10IconBtn icon="Hand"     label="Raise Hand"/>
          <Eng10IconBtn icon="Settings" label="Settings"/>
        </div>

        <span style={{ marginLeft: "auto", fontSize: 12, color: "#10B981", fontWeight: 600 }}>● 6 online</span>
        <button onClick={() => setActive(false)} style={{
          background: "#EF4444", border: "none", borderRadius: 7, padding: "5px 12px",
          fontSize: 12, fontWeight: 700, color: "#fff", cursor: "pointer", marginLeft: 8,
        }}>Exit</button>
      </div>

      {/* Main two-column area */}
      <div style={{ display: "flex", flex: 1, minHeight: 560 }}>
        <div style={{ flex: 1, minWidth: 0, padding: "20px 20px 24px", overflowY: "auto", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 20 }}>
          <Eng10VideoGrid course={course}/>
          <div>
            <div style={{ fontSize: 13, color: "var(--stone)", fontWeight: 600, marginBottom: 12 }}>Virtual Room 210</div>
            <Eng10VirtualRoomMap course={course}/>
          </div>
        </div>
        <div style={{ width: 380, flexShrink: 0, display: "flex", flexDirection: "column", borderLeft: "1px solid var(--mist)" }}>
          <Eng10ChatPanelWide course={course}/>
        </div>
      </div>
    </div>
  );
}

function Eng10IconBtn({ icon, label, active, onClick, color }) {
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

function Eng10VideoGrid({ course }) {
  const color = course.color;
  const tiles = [
    { name: "Mrs. Lee",      init: "ML", bg: "#475569", teacher: true },
    { name: "Alex Johnson",  init: "AJ", you: true },
    { name: "Student",       camOff: true },
    { name: "Student",       camOff: true },
    { name: "Student",       camOff: true },
    { name: "Student",       camOff: true },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: "var(--stone)", fontWeight: 600 }}>Live Video — 6 participants</span>
        <a href="#" style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: "var(--student)", textDecoration: "none" }}>View all →</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {tiles.map((t, i) => {
          const avatarBg = t.bg || (t.you ? color : "#94A3B8");
          return (
            <div key={i} style={{
              height: 140, borderRadius: 8,
              background: "var(--bone)",
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

function Eng10VirtualRoomMap({ course }) {
  const color = course.color;
  const rowYs = [100, 148, 196, 244];
  const colXs = [60, 130, 200, 270, 340, 410];

  const occupiedExtras = [
    [0,0],[0,1],[0,3],[0,5],
    [1,0],[1,2],[1,3],
    [2,1],[2,4],[2,5],
    [3,0],[3,2],[3,5],
  ];
  const occupiedSet = new Set(occupiedExtras.map(([r,c]) => `${r}-${c}`));

  return (
    <div style={{ background: "var(--bone)", borderRadius: 12, border: "1px solid var(--mist)", overflow: "hidden", lineHeight: 0 }}>
      <svg width="480" height="280" style={{ display: "block", width: "100%", height: "auto" }} aria-label="Virtual Room 210 map">
        <defs>
          <pattern id="eng10VCFloor" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#F8FAFC"/>
            <rect x="6" width="6" height="6" fill="#F1F5F9"/>
            <rect y="6" width="6" height="6" fill="#F1F5F9"/>
            <rect x="6" y="6" width="6" height="6" fill="#F8FAFC"/>
          </pattern>
        </defs>

        <rect x="0" y="0" width="480" height="280" fill="#334155"/>
        <rect x="8" y="8" width="464" height="264" fill="url(#eng10VCFloor)"/>

        <rect x="8" y="8"   width="464" height="4" fill="#475569" opacity="0.18"/>
        <rect x="8" y="268" width="464" height="4" fill="#475569" opacity="0.18"/>
        <rect x="468" y="8" width="4" height="264" fill="#475569" opacity="0.18"/>
        <rect x="8" y="8" width="4" height="264" fill="#475569" opacity="0.18"/>

        <rect x="140" y="8" width="200" height="26" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1"/>
        <text x="240" y="25" fontSize="9" fill="#334155" fontFamily="sans-serif" textAnchor="middle" fontStyle="italic">Counterargument — Lesson 2.4 (Virtual)</text>

        <rect x="10" y="8" width="110" height="36" fill="#78716C" rx="2"/>
        <rect x="10" y="21" width="110" height="2" fill="#57534E"/>
        <rect x="10" y="33" width="110" height="2" fill="#57534E"/>
        {[{x:12,c:"#94A3B8"},{x:19,c:"#FCA5A5"},{x:26,c:"#86EFAC"},{x:33,c:"#C4B5FD"},{x:40,c:"#A8A29E"},{x:47,c:"#94A3B8"}].map((bk,i)=><rect key={"vc1"+i} x={bk.x} y="10" width="5" height="9" rx="0.5" fill={bk.c}/>)}
        {[{x:12,c:"#FCA5A5"},{x:19,c:"#C4B5FD"},{x:26,c:"#A8A29E"},{x:33,c:"#86EFAC"},{x:40,c:"#FCA5A5"},{x:47,c:"#94A3B8"}].map((bk,i)=><rect key={"vc2"+i} x={bk.x} y="23" width="5" height="8" rx="0.5" fill={bk.c}/>)}
        {[{x:12,c:"#86EFAC"},{x:19,c:"#94A3B8"},{x:26,c:"#FCA5A5"},{x:33,c:"#C4B5FD"},{x:40,c:"#A8A29E"},{x:47,c:"#86EFAC"}].map((bk,i)=><rect key={"vc3"+i} x={bk.x} y="35" width="5" height="9" rx="0.5" fill={bk.c}/>)}
        <text x="63" y="52" fontSize="7" fill="#fff" textAnchor="middle" fontFamily="sans-serif">Library</text>

        <rect x="446" y="56" width="22" height="50" fill="#FEF9C3" stroke="#F59E0B" strokeWidth="1" rx="2"/>
        <text x="457" y="74" fontSize="7" fill="#92400E" textAnchor="middle" fontFamily="sans-serif">Writing</text>
        <text x="457" y="84" fontSize="7" fill="#92400E" textAnchor="middle" fontFamily="sans-serif">Tips</text>

        <rect x="8" y="118" width="8" height="44" fill="#475569" stroke="#334155" strokeWidth="1"/>
        <circle cx="18" cy="140" r="2.5" fill="#64748B"/>

        <rect x="180" y="42" width="120" height="38" fill="#334155" stroke="#475569" rx="3"/>
        <text x="240" y="58" fontSize="9" fontWeight="700" fill="#F8FAFC" textAnchor="middle" fontFamily="sans-serif">Mrs. Lee</text>
        <text x="240" y="72" fontSize="7" fill="#94A3B8" textAnchor="middle" fontFamily="sans-serif">Room 210</text>
        <rect x="278" y="47" width="22" height="15" rx="2" fill="#1E293B"/>
        <rect x="280" y="49" width="18" height="11" fill="#0284C7" opacity="0.85"/>

        <rect x="14" y="240" width="16" height="16" rx="3" fill="#78350F" opacity="0.8"/>
        <ellipse cx="22" cy="237" rx="10" ry="7" fill="#15803D"/>
        <ellipse cx="15" cy="232" rx="7" ry="5" fill="#16A34A"/>
        <ellipse cx="29" cy="233" rx="6" ry="5" fill="#22C55E"/>

        <rect x="450" y="240" width="16" height="16" rx="3" fill="#78350F" opacity="0.8"/>
        <ellipse cx="458" cy="237" rx="10" ry="7" fill="#15803D"/>
        <ellipse cx="451" cy="232" rx="7" ry="5" fill="#16A34A"/>
        <ellipse cx="465" cy="233" rx="6" ry="5" fill="#22C55E"/>

        {rowYs.map((dy, row) =>
          colXs.map((dx, col) => {
            const isYou = row === 1 && col === 3;
            const key = `${row}-${col}`;
            const isOccupied = isYou || occupiedSet.has(key);
            const spriteCX = dx + 26;
            const spriteY = dy - 12;
            return (
              <g key={key}>
                <rect x={dx} y={dy} width={52} height={36} rx={3}
                  fill={isYou ? "#E0F2FE" : "#E2E8F0"}
                  stroke={isYou ? color : "#94A3B8"}
                  strokeWidth={isYou ? 2 : 1}
                />
                {isYou && (
                  <>
                    <rect x={spriteCX - 14} y={spriteY - 14} width={28} height={12} rx={3} fill={color}/>
                    <text x={spriteCX} y={spriteY - 4} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="sans-serif">YOU</text>
                    <circle cx={spriteCX} cy={spriteY} r={6} fill={color}/>
                  </>
                )}
                {!isYou && isOccupied && (
                  <circle cx={spriteCX} cy={spriteY} r={5} fill="#CBD5E1"/>
                )}
              </g>
            );
          })
        )}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 3 — Documents
═══════════════════════════════════════════════════════════════ */
function Eng10DocumentsView({ course }) {
  const cats = [
    {
      title: "For Today's Class",
      icon: "Sparkle",
      tint: course.color,
      items: [
        { name: "Mentor Text — 'Should Schools Have Phone Bans?'", sub: "PDF · needed for today",           kind: "pdf",  from: "Mrs. Lee", date: "Posted today", urgent: true },
        { name: "Counterargument Graphic Organizer",                sub: "PDF · worksheet · fill in today", kind: "pdf",  from: "Mrs. Lee", date: "Posted today" },
      ],
    },
    {
      title: "This Unit — Argument & Persuasion",
      icon: "Book",
      tint: "#0EA5E9",
      items: [
        { name: "Argument Essay Prompt.pdf",             sub: "Writing assignment · Unit 2",  kind: "pdf",  from: "Mrs. Lee", date: "Oct 14" },
        { name: "Argument Writing Checklist.pdf",        sub: "PDF · reference",              kind: "pdf",  from: "Mrs. Lee", date: "Oct 12" },
        { name: "Mentor Text Collection — Unit 2.pdf",   sub: "PDF · reading",                kind: "pdf",  from: "Mrs. Lee", date: "Oct 10" },
        { name: "Sample Student Essays — annotated.pdf", sub: "PDF · examples",               kind: "pdf",  from: "Mrs. Lee", date: "Oct 8" },
      ],
    },
    {
      title: "Reference & Tools",
      icon: "Bookmark",
      tint: "#F59E0B",
      items: [
        { name: "Course Syllabus 2025–26",      sub: "PDF · pinned",           kind: "pdf",  from: "Mrs. Lee", date: "Sep 2" },
        { name: "English 10 Vocabulary Glossary", sub: "PDF · 200 terms",       kind: "pdf",  from: "Mrs. Lee", date: "Sep 5" },
        { name: "MLA Citation Guide",            sub: "PDF · reference",         kind: "pdf",  from: "Mrs. Lee", date: "Sep 8" },
        { name: "Grammar Handbook",              sub: "PDF · reference",         kind: "pdf",  from: "Mrs. Lee", date: "Sep 8" },
      ],
    },
    {
      title: "Your Notes & Submissions",
      icon: "Notes",
      tint: "#8B5CF6",
      items: [
        { name: "My Unit 2 Notes",          sub: "Notes · last edited today",          kind: "notes", from: "You", date: "Today" },
        { name: "Argument Essay — Draft 1", sub: "Doc · awaiting feedback · In Progress", kind: "doc",   from: "You", date: "Today" },
      ],
    },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "0 12px", height: 34, background: "var(--bone)", borderRadius: 10 }}>
          <I.Search size={14} color="var(--stone)"/>
          <input placeholder="Search English 10 documents…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12.5, color: "var(--ink)" }}/>
        </div>
        <button className="btn btn-secondary btn-sm" style={{ height: 34 }}><I.Filter size={12} color="var(--slate)"/> All types</button>
        <button className="btn btn-secondary btn-sm" style={{ height: 34 }}><I.Calendar size={12} color="var(--slate)"/> Newest</button>
        <button className="btn btn-primary btn-sm" style={{ height: 34, background: course.color, borderColor: course.color }}><I.Upload size={12} color="#fff"/> Upload</button>
      </div>

      {cats.map((cat, i) => (
        <div key={i} style={{ marginBottom: i === cats.length - 1 ? 0 : 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: `${cat.tint}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {React.createElement(I[cat.icon], { size: 12, color: cat.tint })}
            </div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{cat.title}</h3>
            <span style={{ fontSize: 11, color: "var(--silver)" }}>{cat.items.length}</span>
          </div>
          <div className="bio-doc-grid">
            {cat.items.map((it, j) => <Eng10DocCard key={j} {...it} courseColor={course.color}/>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Eng10DocCard({ name, sub, kind, from, date, urgent, courseColor }) {
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
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
          {urgent && <span style={{ marginLeft: 6, fontSize: 9, padding: "1px 5px", background: courseColor, color: "#fff", borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em" }}>NEEDED NOW</span>}
        </div>
        <div style={{ fontSize: 11, color: "var(--stone)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</div>
        <div style={{ fontSize: 10.5, color: "var(--silver)", marginTop: 1 }}>{from} · {date}</div>
      </div>
      <button style={{ padding: 6, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.Download size={13} color="var(--silver)"/></button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 4 — Class Tools
═══════════════════════════════════════════════════════════════ */
function Eng10ToolsView({ course }) {
  const groups = [
    {
      title: "Writing & Notes",
      tools: [
        { name: "English Notebook",        sub: "Open your active English 10 notebook",               icon: "Notes",       color: course.color, primary: true },
        { name: "Quick Note",              sub: "Capture a thought, link to today's lesson",           icon: "Edit",        color: course.color },
        { name: "Voice Memo",              sub: "Record up to 5 minutes — auto-transcribed",           icon: "Mic",         color: "#EF4444" },
        { name: "Draw / Diagram",          sub: "Sketch outlines or argument maps",                    icon: "Edit",        color: "#64748B" },
        { name: "Self-Navigation Tool",    sub: "Self-assessment to track your learning progress",     icon: "Target",      color: "#94A3B8", soon: true },
      ],
    },
    {
      title: "English Writing Tools",
      tools: [
        { name: "Writing Tutor",           sub: "AI writing partner for essays and arguments",         icon: "Sparkle",     color: course.color, primary: true },
        { name: "Grammar Checker",         sub: "Scan for grammar and style issues",                   icon: "Edit",        color: "#10B981" },
        { name: "Citation Builder",        sub: "MLA and APA formatting",                              icon: "BookOpen",    color: "#8B5CF6" },
        { name: "Thesaurus & Word Choice", sub: "Find stronger vocabulary",                            icon: "BookMarked",  color: "#F59E0B" },
        { name: "Outline Builder",         sub: "Structure your argument essay",                       icon: "Notes",       color: course.color },
        { name: "Plagiarism Checker",      sub: "Check originality before submitting",                 icon: "AlertCircle", color: "#EF4444" },
      ],
    },
    {
      title: "Annotate & Read",
      tools: [
        { name: "PDF Annotator",           sub: "Highlight and annotate any class document",           icon: "Edit",        color: course.color },
        { name: "Highlighter",             sub: "Live text highlighting",                              icon: "Edit",        color: "#F59E0B" },
        { name: "Read-Aloud",              sub: "Listen to text read aloud",                           icon: "Mic",         color: "#10B981" },
        { name: "Glossary Lookup",         sub: "Define any English term instantly",                   icon: "BookOpen",    color: "#8B5CF6" },
      ],
    },
    {
      title: "Capture & Share",
      tools: [
        { name: "Screenshot Tool",         sub: "Capture your screen or a document",                   icon: "Camera",      color: "#64748B" },
        { name: "Share to Discussion Group", sub: "Send to Jamie & Marcus",                            icon: "Send",        color: course.color },
        { name: "Submit Work",             sub: "Hand in to Mrs. Lee",                                 icon: "Send",        color: "#10B981" },
        { name: "Timer",                   sub: "For timed writes — set and go",                       icon: "Clock",       color: "#F59E0B" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Quick-launch row */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Quick Launch</h3>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Your most-used tools in English 10</span>
        </div>
        <div className="bio-quicklaunch-grid">
          <Eng10QuickTool icon="Edit"      label="Writing Notebook"    color={course.color} active/>
          <Eng10QuickTool icon="Edit"      label="Grammar Checker"     color="#10B981"/>
          <Eng10QuickTool icon="BookOpen"  label="Citation Builder"    color="#8B5CF6"/>
          <Eng10QuickTool icon="Notes"     label="Note Taking"         color="#F59E0B"/>
          <Eng10QuickTool icon="Sparkle"   label="Writing Tutor"       color={course.color}/>
        </div>
      </div>

      {groups.map((g, i) => (
        <div key={i} style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
          <h3 className="t-h3" style={{ fontSize: 13, margin: "0 0 10px" }}>{g.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {g.tools.map((t, j) => <Eng10ToolRow key={j} {...t} courseColor={course.color}/>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Eng10QuickTool({ icon, label, color, badge, active }) {
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

function Eng10ToolRow({ name, sub, icon, color, primary, courseColor, soon }) {
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

/* ═══════════════════════════════════════════════════════════════
   TAB 5 — Assignments
═══════════════════════════════════════════════════════════════ */
function Eng10AssignmentsView({ course }) {
  const upcoming = [
    { name: "Argument Essay — Draft 1",        sub: "Unit 2 · Writing",    due: "Due Today, 11:59 PM",  status: "In Progress",  statusColor: "#F59E0B", points: "/ 50",    state: "open" },
    { name: "Counterargument Graphic Organizer", sub: "Unit 2 · Worksheet", due: "Due Today",             status: "Not started",  statusColor: "#EF4444", points: "/ 10",    state: "open" },
    { name: "Socratic Seminar Prep",             sub: "Unit 2 · Discussion", due: "Due Thursday",          status: "Not started",  statusColor: "#94A3B8", points: "/ 20",    state: "open" },
  ];
  const completed = [
    { name: "Mentor Text Annotation",    sub: "Submitted Oct 20", status: "Graded",  statusColor: "#10B981", points: "18 / 20", state: "done", chip: "Good", chipColor: "#10B981" },
    { name: "Vocabulary Quiz — Unit 2",  sub: "Submitted Oct 18", status: "Graded",  statusColor: "#10B981", points: "24 / 25 (96%)", state: "done", chip: "A", chipColor: "#8B5CF6" },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, borderBottom: "1px solid var(--mist)" }}>
        {["All Assignments", "Due Soon (2)", "Submitted", "Graded"].map((it, i) => (
          <button key={i} style={{
            padding: "6px 0", fontSize: 12, fontWeight: i === 0 ? 600 : 500,
            color: i === 0 ? course.color : "var(--stone)",
            border: "none", background: "transparent", cursor: "pointer",
            borderBottom: i === 0 ? `2px solid ${course.color}` : "2px solid transparent",
            marginBottom: -1,
          }}>{it}</button>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.06em", padding: "8px 4px 4px" }}>Coming Up</div>
      <div>
        {upcoming.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 4px", borderBottom: "1px solid var(--mist)" }}>
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
            <button className="btn btn-primary btn-sm" style={{ height: 28, fontSize: 11.5, padding: "0 12px", background: course.color, borderColor: course.color }}>Start</button>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.06em", padding: "12px 4px 4px" }}>Completed</div>
      <div>
        {completed.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 4px", borderBottom: i === completed.length - 1 ? "none" : "1px solid var(--mist)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${a.statusColor}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I.Document size={15} color={a.statusColor}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{a.sub}</div>
            </div>
            <div style={{ width: 130, textAlign: "right", display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" }}>
              <span style={{ fontSize: 9, padding: "2px 6px", background: `${a.chipColor}1A`, color: a.chipColor, borderRadius: 4, fontWeight: 700 }}>{a.chip}</span>
              <div style={{ fontSize: 13, fontWeight: 700, color: a.statusColor }}>{a.points}</div>
            </div>
            <button className="btn btn-secondary btn-sm" style={{ height: 28, fontSize: 11.5, padding: "0 12px" }}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 6 — Growth
═══════════════════════════════════════════════════════════════ */
function Eng10GradesView({ course }) {
  const cats = [
    { name: "Essays",        weight: 40, score: 82, color: course.color },
    { name: "Participation", weight: 25, score: 90, color: "#10B981" },
    { name: "Quizzes",       weight: 20, score: 96, color: "#8B5CF6" },
    { name: "Homework",      weight: 15, score: 88, color: "#F59E0B" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Top stat row */}
      <div className="bio-growth-top" style={{ display: "grid", gridTemplateColumns: "260px 260px 1fr", gap: 14 }}>
        {/* Current Grade */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Current Grade</div>
          <Eng10Donut size={140} value={84} color={course.color}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>84<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: course.color }}>B</div>
            </div>
          </Eng10Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>↑ 1% from last month</div>
        </div>

        {/* Course Progress */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Course Progress</div>
          <Eng10Donut size={140} value={58} color={course.color}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>58<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 11, fontWeight: 600, color: course.color }}>Unit 2 of 4</div>
            </div>
          </Eng10Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>7 of 12 lessons complete</div>
        </div>

        {/* Grade Breakdown */}
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

      {/* Ways to Improve + Teacher Feedback */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Eng10WaysToImprove course={course}/>
        <Eng10TeacherFeedback course={course}/>
      </div>
    </div>
  );
}

function Eng10WaysToImprove({ course }) {
  const items = [
    {
      label: "REVIEW",
      title: "Essay structure is your weakest area — revisit the outline builder",
      icon: "Book",
      color: "#0EA5E9",
    },
    {
      label: "PRACTICE QUIZ",
      title: "Argument vocabulary — adaptive 20-word set",
      icon: "ListChecks",
      color: "#8B5CF6",
    },
    {
      label: "STUDY SESSION",
      title: "Mrs. Lee recommends: peer review with Jamie before Draft 2",
      icon: "Users",
      color: "#F59E0B",
    },
    {
      label: "WRITING TUTOR",
      title: "Your transitions need work — ask Writing Tutor to review your draft",
      icon: "Sparkle",
      color: course.color,
    },
  ];

  return (
    <div style={{
      background: `linear-gradient(135deg, #F0F9FF 0%, ${course.color}10 100%)`,
      borderRadius: 14, padding: "18px 22px",
      border: `1px solid ${course.color}25`,
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${course.color}, #0284C7)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.Sparkle size={15} color="#fff"/>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Ways to Improve</h2>
              <span style={{ fontSize: 9, padding: "2px 6px", background: "#E0F2FE", color: "#0284C7", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Personalized to your weak areas in Argument & Persuasion</div>
          </div>
        </div>
        <button style={{ fontSize: 11, padding: "6px 10px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8, color: "var(--slate)", cursor: "pointer", fontWeight: 600 }}>Refresh</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
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
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>{it.title}</div>
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

function Eng10TeacherFeedback({ course }) {
  const items = [
    {
      on: "Mentor Text Annotation",
      onMeta: "18 / 20 · Oct 20",
      tone: "praise",
      msg: "Great insight on the theme! Your marginal notes show strong inferencing — push that into your essay thesis.",
      time: "2 days ago",
    },
    {
      on: "Vocabulary Quiz",
      onMeta: "24 / 25 · Oct 18",
      tone: "praise",
      msg: "Nearly perfect — the one miss was 'rhetoric' vs 'rhetorical device'. Worth clarifying.",
      time: "4 days ago",
    },
    {
      on: "Argument Essay Outline",
      onMeta: "In Progress · today",
      tone: "note",
      msg: "Your claim is strong. The counterargument section needs a source — find one before Draft 1 is due tonight.",
      time: "today",
    },
  ];

  const toneStyle = (tone) => ({
    praise: { color: "#10B981", label: "PRAISE" },
    note:   { color: course.color, label: "NOTE" },
    growth: { color: "#F59E0B", label: "GROWTH AREA" },
  }[tone]);

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <StockPortrait name="Mrs. Lee" hue={200} size={36}/>
          <div>
            <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Teacher Feedback</h2>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Recent comments from Mrs. Lee</div>
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
                  <span style={{ fontSize: 9.5, padding: "1px 6px", background: `${t.color}1A`, color: t.color, borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>{t.label}</span>
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

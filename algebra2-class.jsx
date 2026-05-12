// LINKS — Algebra II Period 1 class page
// Activates inside <ClassDetail> when classId === "algebra2".
// Sections: header · today's class · chat · schedule · tools · documents · assignments · growth

const A2Course = {
  id: "algebra2",
  name: "Algebra II",
  teacher: "Mr. David Wilson",
  period: "Period 1",
  room: "Virtual",
  color: "#8B5CF6",
  abbr: "x²",
  unit: "Unit 3 · Quadratic Functions",
  todayLesson: "Completing the Square",
  bell: "9:00 AM — 9:50 AM",
  progress: 67,
};
window.A2Course = A2Course;

/* ─────────── Page wrapper ─────────── */
function Alg2ClassPage({ c }) {
  const course = A2Course;
  const [tab, setTab] = React.useState("today");
  // tabs: today, virtual, documents, tools, assign, grades

  return (
    <div className="a2-page" style={{
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

      <A2Header c={c} course={course}/>

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

      {tab === "today"     && <A2TodayView course={course} setTab={setTab}/>}
      {tab === "virtual"   && <A2VirtualView course={course} setTab={setTab}/>}
      {tab === "documents" && <A2DocumentsView course={course}/>}
      {tab === "tools"     && <A2ToolsView course={course}/>}
      {tab === "assign"    && <A2AssignmentsView course={course}/>}
      {tab === "grades"    && <A2GradesView course={course}/>}
    </div>
  );
}
window.Alg2ClassPage = Alg2ClassPage;

/* ─────────── Header ─────────── */
function A2Header({ c, course }) {
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
        fontSize: 18, fontWeight: 700, flexShrink: 0,
      }}>{c.abbr}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "nowrap" }}>
          <h1 className="t-h1" style={{ fontSize: 22, margin: 0, whiteSpace: "nowrap" }}>{c.name}</h1>
          <span style={{ fontSize: 10.5, padding: "2px 8px", background: c.color, color: "#fff", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>VIRTUAL · LIVE</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.teacher} · {c.period} · {c.room} · <span style={{ color: c.color, fontWeight: 600, whiteSpace: "nowrap" }}>{course.bell.replace(/\s—\s/, "–")}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, paddingRight: 8, flexShrink: 0 }}>
        <A2Stat label="Current Grade" value="91% · A−" color={c.color}/>
        <A2Stat label="Current Unit" value={course.unit.replace("Unit 3 · ", "")}/>
      </div>
    </div>
  );
}

function A2Stat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: color || "var(--ink)" }}>{value}</div>
    </div>
  );
}

function A2Mini({ icon, color, label, value }) {
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

/* ─────────── Today's Class view ─────────── */
function A2TodayView({ course, setTab }) {
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start", minWidth: 0 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
        <A2JoinCard course={course} setTab={setTab}/>
        <A2PeriodSchedule course={course}/>
        <A2LessonAndMaterials course={course}/>
        <A2AITutorCard course={course}/>
        <A2SelfNavCard course={course}/>
        <A2ActivityFeed course={course}/>
        <A2TodaySidebar course={course}/>
      </div>
      <div style={{ width: 380, flexShrink: 0, position: "sticky", top: 70, height: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
        <A2ChatPanelWide course={course}/>
      </div>
    </div>
  );
}

/* ─────────── Join Card ─────────── */
function A2JoinCard({ course, setTab }) {
  return (
    <div style={{
      background: course.color, borderRadius: 14,
      padding: "18px 22px",
      display: "flex", alignItems: "center", gap: 18,
      boxShadow: `0 4px 20px ${course.color}40`,
    }}>
      {/* Icon circle */}
      <div style={{
        width: 52, height: 52, borderRadius: "50%",
        background: "rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <I.Video size={28} color="#fff"/>
      </div>
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: "#fff", lineHeight: 1.25 }}>
          Algebra II is live now · {course.teacher}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", marginTop: 3 }}>
          {course.bell} · {course.period}
        </div>
      </div>
      {/* Button */}
      <button
        onClick={() => setTab("virtual")}
        style={{
          background: "#fff", color: course.color,
          border: "none", borderRadius: 10,
          padding: "10px 20px",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          flexShrink: 0,
          display: "inline-flex", alignItems: "center", gap: 6,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}>
        Join Virtual Class →
      </button>
    </div>
  );
}

/* ─────────── Period Schedule ─────────── */
function A2PeriodSchedule({ course }) {
  const segments = [
    { at: "9:00", len: 5,  title: "Warm-up problem",                    body: "Open Desmos — graph y = x² and identify the vertex.",                         icon: "Edit",      color: "#94A3B8", state: "done" },
    { at: "9:05", len: 10, title: "Review: Factoring Review Quiz",       body: "Return quiz results — class discussion on common errors.",                    icon: "Document",  color: "#8B5CF6", state: "active" },
    { at: "9:15", len: 20, title: "Direct Instruction: Completing the Square", body: "Step-by-step method to convert standard form → vertex form.",           icon: "Book",      color: "#0EA5E9", state: "upcoming" },
    { at: "9:35", len: 10, title: "Partner Practice",                    body: "Work with Sam & Riley on worksheet problems 1–8.",                            icon: "Users",     color: "#10B981", state: "upcoming" },
    { at: "9:45", len: 5,  title: "Exit Ticket",                         body: "Submit: convert one quadratic using completing the square.",                   icon: "Edit",      color: "#F59E0B", state: "upcoming" },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Today's Class Schedule</h2>
        <span style={{ fontSize: 11, color: "var(--stone)" }}>{course.bell} · 50 min</span>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 14 }}>
        You're <b style={{ color: course.color }}>5 minutes in</b>. Factoring quiz review happening now.
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
function A2LessonAndMaterials({ course }) {
  const [markedRead, setMarkedRead] = React.useState(false);
  const items = [
    { name: "Lesson 3.4 Slide Deck",             sub: "32 slides · Mr. David Wilson",          icon: "Document",   color: "#8B5CF6" },
    { name: "Quadratic Formula Reference Sheet", sub: "PDF · quick reference",                  icon: "Document",   color: "#EF4444" },
    { name: "Desmos Graphing Activity",          sub: "Interactive · open in browser",           icon: "Globe",      color: "#0EA5E9" },
    { name: "Khan Academy: Completing the Square", sub: "Video series · 4 lessons",             icon: "PlayCircle", color: "#EF4444" },
    { name: "Unit 3 Vocabulary List",            sub: "28 terms · vertex, discriminant…",        icon: "Bookmark",   color: "#F59E0B" },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>
        <span style={{ color: course.color, fontWeight: 600 }}>{course.unit}</span>
        <I.ChevronRight size={11} color="var(--stone)"/>
        <span>Lesson 3.4</span>
      </div>
      <h1 className="t-h1" style={{ fontSize: 24, margin: "0 0 4px" }}>{course.todayLesson}</h1>
      <div style={{ fontSize: 13, color: "var(--stone)" }}>
        Transform standard form quadratics into vertex form — then graph and solve them.
      </div>

      {/* Metadata row */}
      <div style={{ display: "flex", gap: 18, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--mist)", flexWrap: "wrap" }}>
        <A2Mini icon="Clock"  color="#0EA5E9" label="Class Period" value="50 min"/>
        <A2Mini icon="Users"  color="#8B5CF6" label="Partner"     value="Sam & Riley"/>
        <A2Mini icon="MapPin" color="#F59E0B" label="Location"    value="Virtual"/>
        <A2Mini icon="Trophy" color="#10B981" label="Points"      value="15 pts"/>
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
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Have your graphing calculator or Desmos open before class starts</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>From Mr. David Wilson, posted this morning</div>
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
function A2AITutorCard({ course }) {
  const [draft, setDraft] = React.useState("");
  const suggestions = [
    "Walk me through completing the square",
    "Help me check my work",
    "What's the vertex form formula?",
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
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Math Tutor</h3>
            <span style={{ fontSize: 9, padding: "2px 6px", background: "#EDE9FE", color: "#7C3AED", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 1 }}>Your 24/7 study partner — trained on Algebra II materials.</div>
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
          placeholder="Ask Math Tutor anything about Quadratic Functions…"
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

/* ─────────── Self-Navigation Tool ─────────── */
function A2SelfNavCard({ course }) {
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
function A2ActivityFeed({ course }) {
  const items = [
    { label: "DO NOW",            title: "Open Desmos and graph y = x²",                                            time: "Now",        color: "#10B981" },
    { label: "DUE TONIGHT",       title: "Quadratic Functions Worksheet · 11:59 PM",                                time: "Due 11:59 PM", color: "#EF4444" },
    { label: "JUST POSTED",       title: "Lesson 3.4 notes template — fill in during class",                       time: "12 min ago",  color: "#0EA5E9" },
    { label: "AI TUTOR SUGGESTS", title: "You struggled with the discriminant last week — review for 5 min?",      time: "Personal",    color: "#8B5CF6" },
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

/* ─────────── Today Sidebar (partner + seating) ─────────── */
function A2TodaySidebar({ course }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {/* Today's Partner Work */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Today's Partner Work</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <A2Partner name="Alex Johnson" hue={270} role="Recorder"  color={course.color} you/>
          <A2Partner name="Sam Chen"     hue={200} role="Explainer"/>
          <A2Partner name="Riley Park"   hue={120} role="Checker"/>
        </div>
        <div style={{ marginTop: 10, padding: "8px 10px", background: "var(--bone)", borderRadius: 8, fontSize: 11, color: "var(--stone)" }}>
          <I.Video size={11} color={course.color} style={{ verticalAlign: "-1px", marginRight: 4 }}/>
          Virtual · Meeting in main class session
        </div>
      </div>

      {/* Virtual Seating */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Virtual Seating</div>
        <A2SeatingMap color={course.color}/>
      </div>
    </div>
  );
}

function A2Partner({ name, hue, role, color = "#8B5CF6", you }) {
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

function A2SeatingMap({ color }) {
  // 4 rows × 5 desks compact SVG
  return (
    <svg viewBox="0 0 240 180" style={{ width: "100%", height: "auto", display: "block", background: "var(--bone)", borderRadius: 8 }}>
      {/* Whiteboard at top */}
      <rect x="10" y="2" width="220" height="8" rx="2" fill="#0F172A" opacity="0.35"/>
      {/* Teacher desk */}
      <rect x="80" y="14" width="80" height="18" rx="3" fill="#475569" opacity="0.85"/>
      <text x="120" y="27" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700">Mr. Wilson</text>

      {/* Desks: 4 rows × 5 cols. Each desk 30×14, col spacing 44, row spacing 34, start x=15, start y=42 */}
      {[0,1,2,3].map((row) => (
        [0,1,2,3,4].map((col) => {
          const dx = 15 + col * 44;
          const dy = 42 + row * 34;
          const isYou = row === 1 && col === 2;
          // row 2 col 4 empty, row 2 col 5 empty (0-indexed: row 2 col 3,4)
          const isEmpty = (row === 2 && col === 4) || (row === 3 && col === 3) || (row === 3 && col === 4);
          if (isEmpty) return null;
          return (
            <g key={`${row}-${col}`}>
              {/* Desk */}
              <rect
                x={dx} y={dy} width={30} height={14} rx={2}
                fill={isYou ? `${color}20` : "#fff"}
                stroke={isYou ? color : "#CBD5E1"}
                strokeWidth={isYou ? 2 : 1}
              />
              {/* YOU label */}
              {isYou && (
                <text x={dx + 15} y={dy + 10} fontSize="6" fontWeight="700" fill={color} textAnchor="middle">YOU</text>
              )}
            </g>
          );
        })
      ))}
      <text x="120" y="174" fontSize="8" fill="var(--stone)" textAnchor="middle">Virtual Room</text>
    </svg>
  );
}

/* ─────────── Wide Class Chat panel ─────────── */
function A2ChatPanelWide({ course }) {
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
      <A2RightRail course={course}/>
    </div>
  );
}

/* ─────────── Right Rail (Chat / Channels / People) ─────────── */
function A2RightRail({ course }) {
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
          <b style={{ color: "var(--ink)" }}>Mr. David Wilson</b>
          <span style={{ marginLeft: "auto", color: course.color, fontWeight: 600 }}>● 24 online</span>
        </div>
      )}

      {tab === "chat"     && <A2ChatPanel course={course}/>}
      {tab === "channels" && <A2ChannelsPanel course={course}/>}
      {tab === "people"   && <A2PeoplePanel course={course}/>}
    </div>
  );
}

/* ─────────── Chat Panel ─────────── */
function A2ChatPanel({ course }) {
  const [msgs, setMsgs] = React.useState([
    { who: "Mr. Wilson",  role: "teacher", msg: "Good morning everyone — please open Desmos before we start. Today's warm-up is on the board.", time: "9:02 AM", hue: 250 },
    { who: "Sam C.",      msg: "Ready! Opened the file from last week's class.",                                                                   time: "9:03 AM", hue: 200 },
    { who: "Riley P.",    msg: "Quick question — is the warm-up graded?",                                                                          time: "9:04 AM", hue: 120 },
    { who: "Mr. Wilson",  role: "teacher", msg: "No grade today — it's just to get your brain in math mode 😊",                                   time: "9:04 AM", hue: 250, reactions: { "😊": 6 } },
    { who: "You",         self: true, msg: "Desmos is open — vertex is at (0,0) for y = x²",                                                      time: "9:05 AM" },
    { who: "Mr. Wilson",  role: "teacher", msg: "Exactly right! Now shift it — what if it were y = (x−3)²?",                                     time: "9:05 AM", hue: 250 },
    { who: "Math Tutor",  role: "ai", msg: "Shifting x by −3 inside the parentheses moves the vertex right 3 units, to (3, 0). The shape doesn't change — only the position.", time: "9:06 AM" },
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
          ─── Today, Period 1 ───
        </div>
        {msgs.map((m, i) => <A2ChatBubble key={i} m={m} course={course}/>)}
      </div>

      {/* Composer */}
      <div style={{ borderTop: "1px solid var(--mist)", padding: "10px 12px", background: "var(--paper)" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <A2Chip icon="Calculator" label="Question for Mr. Wilson" color={course.color}/>
          <A2Chip icon="Sparkle"    label="Ask Math Tutor"          color="#8B5CF6"/>
          <A2Chip icon="Hand"       label="Raise hand"               color="#F59E0B"/>
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

function A2ChatBubble({ m, course }) {
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

function A2Chip({ icon, label, color }) {
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

function A2ChannelsPanel({ course }) {
  const channels = [
    { name: "# general",          sub: "Whole-class chat (you're here)",        unread: 0, color: course.color, active: true },
    { name: "# lesson-3-4",       sub: "Completing the Square thread",           unread: 0, color: "#0EA5E9" },
    { name: "# partner-sam-riley", sub: "Just you, Sam, Riley",                  unread: 2, color: "#F59E0B" },
    { name: "# math-help",        sub: "Ask anything — peers + Math Tutor",     unread: 0, color: "#10B981" },
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

function A2PeoplePanel({ course }) {
  const teacher = { name: "Mr. David Wilson", role: "Teacher", hue: 250, online: true };
  const peers = [
    { name: "Sam Chen",   hue: 200, online: true,  group: "Partner" },
    { name: "Riley Park", hue: 120, online: true,  group: "Partner" },
    { name: "Aisha B.",   hue: 320, online: true,  group: "Classmate" },
    { name: "Connor W.",  hue: 100, online: true,  group: "Classmate" },
    { name: "Rachel K.",  hue: 0,   online: false, group: "Classmate" },
    { name: "Liam G.",    hue: 200, online: true,  group: "Classmate" },
  ];
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px" }}>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Teacher</div>
      <A2PersonRow {...teacher} courseColor={course.color}/>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 14, marginBottom: 6 }}>Your Partners</div>
      {peers.filter((p) => p.group === "Partner").map((p, i) => <A2PersonRow key={"pt" + i} {...p} courseColor={course.color}/>)}
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 14, marginBottom: 6 }}>Classmates</div>
      {peers.filter((p) => p.group === "Classmate").map((p, i) => <A2PersonRow key={"cl" + i} {...p} courseColor={course.color}/>)}
    </div>
  );
}

function A2PersonRow({ name, role, hue, online, group, courseColor }) {
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
function A2VirtualView({ course }) {
  const [active, setActive]   = React.useState(true);
  const [camOn, setCamOn]     = React.useState(true);
  const [micOn, setMicOn]     = React.useState(true);
  const [elapsed, setElapsed] = React.useState(532);

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

  /* ── Active state ── */
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "0 -24px -20px" }}>
      <style>{`@keyframes a2Pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}`}</style>

      {/* Status bar */}
      <div style={{
        height: 48, display: "flex", alignItems: "center",
        padding: "0 20px", gap: 10,
        background: "var(--bone)",
        borderLeft: "3px solid #10B981",
        borderBottom: "1px solid var(--mist)",
        flexShrink: 0,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#10B981", flexShrink: 0, display: "inline-block", animation: "a2Pulse 1.6s ease-in-out infinite" }}/>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Live</span>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>Algebra II · Period 1 · Mr. David Wilson</span>
        <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "var(--ink)", marginLeft: 4 }}>{fmtTime(elapsed)}</span>

        {/* Meeting controls */}
        <div style={{ display: "flex", gap: 2, marginLeft: 10 }}>
          <A2IconBtn icon={camOn ? "Camera" : "CameraOff"} label="Camera"       active={camOn} onClick={() => setCamOn((v) => !v)}/>
          <A2IconBtn icon={micOn ? "Mic"    : "MicOff"}   label="Mic"           active={micOn} onClick={() => setMicOn((v) => !v)}/>
          <A2IconBtn icon="Hand"     label="Raise Hand"/>
          <A2IconBtn icon="Share"    label="Share Screen"/>
          <A2IconBtn icon="PhoneOff" label="Leave"         color="#EF4444"/>
        </div>

        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--stone)" }}>24 students present</span>
        <button onClick={() => setActive(false)} style={{
          background: "none", border: "1.5px solid var(--student)",
          borderRadius: 7, padding: "4px 11px",
          fontSize: 13, fontWeight: 600, color: "var(--student)", cursor: "pointer", marginLeft: 8,
        }}>← Exit preview</button>
      </div>

      {/* Main two-column area */}
      <div style={{ display: "flex", flex: 1, minHeight: 560 }}>
        <div style={{ flex: 1, minWidth: 0, padding: "20px 20px 24px", overflowY: "auto", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 20 }}>
          <A2VideoGrid course={course}/>
          <div>
            <div style={{ fontSize: 13, color: "var(--stone)", fontWeight: 600, marginBottom: 12 }}>Virtual Room</div>
            <A2VirtualRoomMap course={course}/>
          </div>
        </div>
        <div style={{ width: 380, flexShrink: 0, display: "flex", flexDirection: "column", borderLeft: "1px solid var(--mist)" }}>
          <A2ChatPanelWide course={course}/>
        </div>
      </div>
    </div>
  );
}

function A2IconBtn({ icon, label, active, onClick, color }) {
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

function A2VideoGrid({ course }) {
  const color = course.color;
  const tiles = [
    { name: "Mr. Wilson",    init: "MW", bg: "#475569", teacher: true },
    { name: "Sam C.",        init: "SC", hue: 200 },
    { name: "Riley P.",      init: "RP", hue: 120 },
    { name: "Alex Johnson",  init: "AJ", you: true },
    { name: "Student",       camOff: true },
    { name: "Student",       camOff: true },
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

function A2VirtualRoomMap({ course }) {
  const color = course.color; // #8B5CF6

  // Student hue map by (row, col) 0-indexed
  const studentHues = {
    "0-0": 30, "0-1": 100, "0-2": 150, "0-3": 220, "0-4": 300,
    "1-0": 350, "1-1": 50,
    // 1-2 = Alex (YOU)
    "1-3": 180, "1-4": 260,
    "2-0": 80, "2-1": 200, "2-2": 320, "2-3": 15,
    // 2-4 = empty
    "3-0": 140, "3-1": 240, "3-2": 10,
    // 3-3 and 3-4 empty
  };

  const colXs  = [128, 212, 296, 380, 464];
  const rowYs  = [105, 175, 245, 315];
  const deskW  = 68;
  const deskH  = 38;

  return (
    <div style={{ background: "var(--bone)", borderRadius: 12, border: "1px solid var(--mist)", overflow: "hidden", lineHeight: 0 }}>
      <svg width="660" height="380" style={{ display: "block" }} aria-label="Virtual Room map">
        <defs>
          <pattern id="a2Floor" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#F8FAFC"/>
            <rect x="16" width="16" height="16" fill="#F1F5F9"/>
            <rect y="16" width="16" height="16" fill="#F1F5F9"/>
            <rect x="16" y="16" width="16" height="16" fill="#F8FAFC"/>
          </pattern>
        </defs>

        {/* ── Floor ── */}
        <rect x="3" y="3" width="654" height="374" fill="url(#a2Floor)"/>

        {/* ── Walls ── */}
        <rect x="0" y="0"   width="660" height="3"   fill="#334155"/>
        <rect x="0" y="377" width="660" height="3"   fill="#334155"/>
        <rect x="657" y="0" width="3"   height="380" fill="#334155"/>
        <rect x="0" y="0"   width="3"   height="260" fill="#334155"/>
        <rect x="0" y="308" width="3"   height="72"  fill="#334155"/>

        {/* ── Wall inset shadow stripes ── */}
        <rect x="3" y="3"   width="654" height="4" fill="#475569" opacity="0.18"/>
        <rect x="3" y="373" width="654" height="4" fill="#475569" opacity="0.18"/>
        <rect x="653" y="3" width="4"   height="374" fill="#475569" opacity="0.18"/>
        <rect x="3" y="3"   width="4"   height="257" fill="#475569" opacity="0.18"/>
        <rect x="3" y="308" width="4"   height="69"  fill="#475569" opacity="0.18"/>

        {/* ── Door gap indicators ── */}
        <rect x="0" y="256" width="10" height="5" rx="1" fill="#475569"/>
        <rect x="0" y="304" width="10" height="5" rx="1" fill="#475569"/>
        <text x="14" y="287" fontSize="8" fill="#64748B" fontFamily="monospace">door</text>

        {/* ── Bookshelf — back-left wall ── */}
        <rect x="10" y="5" width="140" height="46" rx="2" fill="#78716C" opacity="0.9"/>
        <rect x="10" y="20" width="140" height="2" fill="#57534E"/>
        <rect x="10" y="34" width="140" height="2" fill="#57534E"/>
        {/* Row 1 */}
        {[
          { x: 12, c: "#94A3B8" }, { x: 20, c: "#FCA5A5" }, { x: 28, c: "#86EFAC" },
          { x: 36, c: "#A8A29E" }, { x: 44, c: "#C4B5FD" }, { x: 52, c: "#94A3B8" },
        ].map((bk, i) => <rect key={"b1"+i} x={bk.x} y="7"  width="6" height="11" rx="0.5" fill={bk.c}/>)}
        {/* Row 2 */}
        {[
          { x: 12, c: "#FCA5A5" }, { x: 19, c: "#C4B5FD" }, { x: 27, c: "#A8A29E" },
          { x: 35, c: "#86EFAC" }, { x: 43, c: "#FCA5A5" }, { x: 51, c: "#94A3B8" },
        ].map((bk, i) => <rect key={"b2"+i} x={bk.x} y="22" width="6" height="10" rx="0.5" fill={bk.c}/>)}
        {/* Row 3 */}
        {[
          { x: 11, c: "#86EFAC" }, { x: 18, c: "#94A3B8" }, { x: 26, c: "#FCA5A5" },
          { x: 34, c: "#C4B5FD" }, { x: 42, c: "#A8A29E" }, { x: 50, c: "#86EFAC" },
        ].map((bk, i) => <rect key={"b3"+i} x={bk.x} y="36" width="6" height="11" rx="0.5" fill={bk.c}/>)}

        {/* ── Whiteboard ── */}
        <rect x="165" y="5" width="340" height="30" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5"/>
        <line x1="180" y1="14" x2="492" y2="14" stroke="#E2E8F0" strokeWidth="1.5"/>
        <line x1="180" y1="20" x2="478" y2="20" stroke="#E2E8F0" strokeWidth="1.5"/>
        <line x1="180" y1="26" x2="465" y2="26" stroke="#E2E8F0" strokeWidth="1.5"/>
        <text x="335" y="24" fontSize="8" fill="#94A3B8" fontFamily="sans-serif" fontStyle="italic" textAnchor="middle">Completing the Square — Lesson 3.4</text>

        {/* ── Teacher desk ── */}
        <rect x="215" y="44" width="230" height="48" rx="5" fill="#334155"/>
        <text x="288" y="63" fontSize="11" fontWeight="700" fill="#F8FAFC" fontFamily="sans-serif">Mr. Wilson</text>
        <text x="288" y="78" fontSize="8" fill="#94A3B8" fontFamily="sans-serif">Algebra II · Virtual</text>
        {/* Computer monitor */}
        <rect x="402" y="49" width="32" height="22" rx="2" fill="#1E293B"/>
        <rect x="404" y="51" width="28" height="16" fill="#0284C7" opacity="0.85"/>
        <line x1="406" y1="55" x2="430" y2="55" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.9"/>
        <line x1="406" y1="58" x2="428" y2="58" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.9"/>
        <line x1="406" y1="61" x2="425" y2="61" stroke="#7DD3FC" strokeWidth="1.2" opacity="0.9"/>
        <rect x="416" y="72" width="4"  height="5"   fill="#1E293B"/>
        <rect x="411" y="76" width="14" height="2.5" fill="#1E293B"/>

        {/* ── Student desks — 4 rows × 5 cols ── */}
        {rowYs.map((dy, row) =>
          colXs.map((dx, col) => {
            const key = `${row}-${col}`;
            const isYou = row === 1 && col === 2;
            const isEmpty = (row === 2 && col === 4) ||
                            (row === 3 && col === 3) ||
                            (row === 3 && col === 4);
            if (isEmpty) return null;

            const hue = studentHues[key];
            const spriteColor = isYou ? color : (hue !== undefined ? `hsl(${hue}, 60%, 58%)` : "#94A3B8");
            const chairY = dy - 10;
            const spriteCX = dx + deskW / 2;
            const spriteCY = dy + deskH - 10;

            return (
              <g key={key}>
                {/* Chair above desk */}
                <rect x={dx + (deskW-40)/2} y={chairY} width={40} height={8} rx={2} fill="#CBD5E1"/>
                {/* Desk rect */}
                <rect
                  x={dx} y={dy} width={deskW} height={deskH} rx={4}
                  fill={isYou ? `${color}20` : "#E2E8F0"}
                  stroke={isYou ? color : "#94A3B8"}
                  strokeWidth={isYou ? 2 : 1.5}
                />
                {/* YOU badge */}
                {isYou && (
                  <>
                    <rect x={spriteCX - 12} y={dy - 22} width={24} height={11} rx={3} fill="#10B981"/>
                    <text x={spriteCX} y={dy - 13} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" fontFamily="sans-serif">YOU</text>
                  </>
                )}
                {/* Student sprite circle */}
                <circle cx={spriteCX} cy={spriteCY} r={5} fill={spriteColor}/>
              </g>
            );
          })
        )}

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

/* ═══════════════════════════════════════════════════════════════
   TAB 3 — Documents
═══════════════════════════════════════════════════════════════ */
function A2DocumentsView({ course }) {
  const cats = [
    {
      title: "For Today's Class",
      icon: "Sparkle",
      tint: course.color,
      items: [
        { name: "Lesson 3.4 Slide Deck.pdf",          sub: "Required for today · 32 slides",         kind: "pdf",  from: "Mr. David Wilson", date: "Posted today", urgent: true },
        { name: "Graphing Activity Worksheet.docx",   sub: "Fill in during class · partner activity", kind: "doc",  from: "Mr. David Wilson", date: "Posted today" },
      ],
    },
    {
      title: "This Unit — Quadratic Functions",
      icon: "Atom",
      tint: "#0EA5E9",
      items: [
        { name: "Unit 3 Test Review.pdf",             sub: "Mr. David Wilson · comprehensive review",  kind: "pdf",   from: "Mr. David Wilson", date: "3 days ago" },
        { name: "Vertex Form Notes.pdf",              sub: "Lesson 3.2 summary",                        kind: "pdf",   from: "Mr. David Wilson", date: "5 days ago" },
        { name: "Parabola Sketching Practice.docx",   sub: "Practice worksheet · 10 problems",         kind: "doc",   from: "Mr. David Wilson", date: "4 days ago" },
        { name: "Quadratic Formula Derivation.mp4",   sub: "14:22 · captioned",                        kind: "video", from: "Mr. David Wilson", date: "1 week ago" },
      ],
    },
    {
      title: "Reference & Tools",
      icon: "Book",
      tint: "#F59E0B",
      items: [
        { name: "Course Syllabus 2025–26.pdf",        sub: "Pinned · grading & late policy",          kind: "pdf", from: "Mr. David Wilson", date: "Sep 2" },
        { name: "Algebra II Glossary.pdf",            sub: "Key terms for the full course",            kind: "pdf", from: "Mr. David Wilson", date: "Sep 5" },
        { name: "Graphing Calculator Guide.pdf",      sub: "TI-84 + Desmos quick reference",          kind: "pdf", from: "Mr. David Wilson", date: "Sep 8" },
        { name: "Formula Sheet — Units 1–3.pdf",     sub: "Printable · cumulative formulas",          kind: "pdf", from: "Mr. David Wilson", date: "Oct 1" },
      ],
    },
    {
      title: "Your Notes & Submissions",
      icon: "Notes",
      tint: "#8B5CF6",
      items: [
        { name: "My Unit 3 Notes.notes",                      sub: "8 entries · last edited today",                 kind: "notes", from: "You", date: "Today" },
        { name: "Completing the Square — Pre-class Notes.pdf", sub: "Self-generated study sheet",                  kind: "pdf",   from: "You", date: "Yesterday" },
      ],
    },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      {/* Search + filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "0 12px", height: 34, background: "var(--bone)", borderRadius: 10 }}>
          <I.Search size={14} color="var(--stone)"/>
          <input placeholder="Search Algebra II documents…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12.5, color: "var(--ink)" }}/>
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
            {cat.items.map((it, j) => <A2DocCard key={j} {...it} courseColor={course.color}/>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function A2DocCard({ name, sub, kind, from, date, urgent, courseColor }) {
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
function A2ToolsView({ course }) {
  const groups = [
    {
      title: "Writing & Notes",
      tools: [
        { name: "Math Notebook",          sub: "Open your active Algebra II notebook",               icon: "Notes",      color: course.color, primary: true },
        { name: "Quick Note",             sub: "Capture a thought, link to today's lesson",          icon: "Edit",       color: "#8B5CF6" },
        { name: "Voice Memo",             sub: "Record up to 5 minutes — auto-transcribed",          icon: "Mic",        color: "#EF4444" },
        { name: "Draw / Diagram",         sub: "Sketch a graph or diagram on a blank page",          icon: "Image",      color: "#F59E0B" },
        { name: "Self-Navigation Tool",   sub: "Self-assessment to track your learning progress",    icon: "Target",     color: "#94A3B8", soon: true },
      ],
    },
    {
      title: "Calculate & Measure",
      tools: [
        { name: "Scientific Calculator",  sub: "Includes log, ln, scientific notation",              icon: "Calculator", color: "#0EA5E9" },
        { name: "Graphing Calculator Full", sub: "Full-feature graphing calculator",                 icon: "Globe",      color: "#8B5CF6" },
        { name: "Equation Editor",        sub: "Type and format math expressions",                   icon: "Edit",       color: "#F59E0B" },
        { name: "Unit Converter",         sub: "Distance, area, and more",                           icon: "Refresh",    color: "#10B981" },
        { name: "Stopwatch",              sub: "For timed practice sets",                            icon: "Time",       color: "#94A3B8" },
      ],
    },
    {
      title: "Annotate & Read",
      tools: [
        { name: "PDF Annotator",          sub: "Highlight today's slide deck",                       icon: "Edit",       color: "#10B981" },
        { name: "Highlighter (live)",     sub: "Mark up shared docs with class",                     icon: "Sparkle",    color: "#FBBF24" },
        { name: "Read-Aloud",             sub: "Hear any document spoken",                           icon: "Speaker",    color: "#8B5CF6" },
        { name: "Glossary Lookup",        sub: "Define any Algebra II term instantly",               icon: "Book",       color: "#0EA5E9" },
      ],
    },
    {
      title: "Capture & Share",
      tools: [
        { name: "Screenshot Tool",        sub: "Capture your work instantly",                        icon: "Camera",     color: "#EF4444" },
        { name: "Share to Partner",       sub: "Send to Sam & Riley",                                icon: "Send",       color: "#10B981" },
        { name: "Submit Work",            sub: "Hand in to Mr. David Wilson",                        icon: "Upload",     color: course.color },
      ],
    },
    {
      title: "Math-specific",
      tools: [
        { name: "Desmos Graphing",        sub: "Full Desmos graphing calculator",                    icon: "Globe",      color: course.color },
        { name: "Equation Editor LaTeX",  sub: "Typeset equations with LaTeX",                       icon: "Edit",       color: "#0EA5E9" },
        { name: "Wolfram Alpha Reference", sub: "Step-by-step problem solutions",                    icon: "Globe",      color: "#F59E0B" },
        { name: "Quadratic Solver",       sub: "Roots, vertex, discriminant — instant",              icon: "Calculator", color: "#10B981" },
        { name: "Coordinate Plane Tool",  sub: "Plot points and graph equations",                    icon: "Image",      color: "#8B5CF6" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Quick-launch row */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Quick Launch</h3>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Your most-used tools in Algebra II</span>
        </div>
        <div className="bio-quicklaunch-grid">
          <A2QuickTool icon="Calculator" label="Graphing Calculator" color={course.color} active/>
          <A2QuickTool icon="Globe"      label="Desmos"              color="#0EA5E9"/>
          <A2QuickTool icon="Edit"       label="Formula Editor"      color="#F59E0B"/>
          <A2QuickTool icon="Notes"      label="Note Taking"         color="#8B5CF6"/>
          <A2QuickTool icon="Image"      label="Whiteboard"          color="#94A3B8"/>
        </div>
      </div>

      {/* All tools by group */}
      {groups.map((g, i) => (
        <div key={i} style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
          <h3 className="t-h3" style={{ fontSize: 13, margin: "0 0 10px" }}>{g.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {g.tools.map((t, j) => <A2ToolRow key={j} {...t} courseColor={course.color}/>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function A2QuickTool({ icon, label, color, badge, active }) {
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

function A2ToolRow({ name, sub, icon, color, primary, courseColor, soon }) {
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
function A2AssignmentsView({ course }) {
  const items = [
    { name: "Quadratic Functions Worksheet",  sub: "Unit 3 · Homework", due: "Due Today, 11:59 PM",    status: "Not started", statusColor: "#EF4444", points: "/ 20",    state: "open" },
    { name: "Lesson 3.4 Practice Problems",   sub: "Unit 3 · Practice", due: "Due Friday, 11:59 PM",  status: "Draft",       statusColor: "#F59E0B", points: "/ 15",    state: "open" },
    { name: "Unit 3 Test",                    sub: "Unit 3 · Test",      due: "Due next Thursday",      status: "Not started", statusColor: "#94A3B8", points: "/ 100",   state: "open" },
    { name: "Vertex Form Exit Tickets ×3",    sub: "Unit 3 · Practice", due: "Submitted Oct 21",       status: "Graded",      statusColor: "#10B981", points: "14 / 15", state: "done" },
    { name: "Factoring Quiz",                 sub: "Unit 3 · Quiz",      due: "Submitted Oct 18",       status: "Graded",      statusColor: "#10B981", points: "88 / 100", state: "done" },
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
            <button className={a.state === "open" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"} style={{
              height: 28, fontSize: 11.5, padding: "0 12px",
              background: a.state === "open" ? course.color : undefined,
              borderColor: a.state === "open" ? course.color : undefined,
            }}>
              {a.state === "open" ? "Start" : "View"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 6 — Growth
═══════════════════════════════════════════════════════════════ */
function A2GradesView({ course }) {
  const cats = [
    { name: "Tests",         weight: 40, score: 91, color: course.color },
    { name: "Homework",      weight: 30, score: 95, color: "#0EA5E9" },
    { name: "Quizzes",       weight: 20, score: 88, color: "#F59E0B" },
    { name: "Participation", weight: 10, score: 98, color: "#8B5CF6" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Top stat row: current grade · course progress · grade breakdown */}
      <div className="bio-growth-top" style={{ display: "grid", gridTemplateColumns: "260px 260px 1fr", gap: 14 }}>
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Current Grade</div>
          <Donut size={140} value={91} color={course.color}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>91<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: course.color }}>A−</div>
            </div>
          </Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>↑ 3% from last month</div>
        </div>

        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Course Progress</div>
          <Donut size={140} value={67} color="#0EA5E9">
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>67<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#0EA5E9" }}>Unit 3 of 5</div>
            </div>
          </Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>8 of 12 lessons complete</div>
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

      {/* Ways to Improve + Teacher Feedback side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <A2WaysToImprove course={course}/>
        <A2TeacherFeedback course={course}/>
      </div>
    </div>
  );
}

function A2WaysToImprove({ course }) {
  const items = [
    {
      kind: "review",
      label: "Review",
      title: "Completing the square (your weakest area)",
      sub: "Quiz scores: 72% on vertex form · 3 practice videos + worked examples",
      meta: "≈ 20 min",
      icon: "Atom",
      color: "#8B5CF6",
    },
    {
      kind: "practice",
      label: "Practice Quiz",
      title: "Discriminant and nature of roots — adaptive 10-question set",
      sub: "Targets concepts you missed on Quiz 2 · auto-grades",
      meta: "≈ 12 min",
      icon: "ListChecks",
      color: "#F59E0B",
    },
    {
      kind: "session",
      label: "Study Session",
      title: "Study with Sam — Mr. Wilson recommends",
      sub: "Group review for Unit 3 test · Sam scored 96% last quiz",
      meta: "60 min",
      icon: "Users",
      color: "#10B981",
    },
    {
      kind: "tutor",
      label: "AI Tutor",
      title: "Ask Math Tutor: \"Walk me through vertex form step by step\"",
      sub: "You've asked about vertex form twice this week — a focused walkthrough may help.",
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
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Personalized to your weak areas in Quadratic Functions</div>
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

function A2TeacherFeedback({ course }) {
  const items = [
    {
      on: "Factoring Quiz",
      onMeta: "Quiz · 88 / 100 · Oct 18",
      tone: "growth",
      msg: "You nailed factoring by grouping — the two you missed were GCF extraction under pressure. Let's drill those before Unit 3 test.",
      time: "5 days ago",
    },
    {
      on: "Vertex Form Exit Ticket",
      onMeta: "Practice · 14/15 · Oct 21",
      tone: "praise",
      msg: "Clean vertex identification on every problem. The one miss was on the axis of symmetry — watch for that on the test.",
      time: "2 days ago",
    },
    {
      on: "Lesson 3.4 Warm-up (in progress)",
      onMeta: "Practice · today",
      tone: "neutral",
      msg: "Strong start today — your Desmos answer was spot-on. As you work through completing the square, show every step clearly for full credit.",
      time: "today",
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
          <StockPortrait name="Mr. David Wilson" hue={260} size={36}/>
          <div>
            <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Teacher Feedback</h2>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Recent comments from Mr. David Wilson</div>
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

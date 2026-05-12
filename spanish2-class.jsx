// LINKS — Spanish II Directed Study class page
// Activates inside <ClassDetail> when classId === "spanish".
// Sections: header · study plan · virtual · documents · tools · assignments · growth

const Sp2Course = {
  id: "spanish",
  name: "Spanish II",
  teacher: "Sra. Martinez",
  period: "Directed Study",
  room: "Virtual",
  color: "#EF4444",
  abbr: "🇪🇸",
  unit: "Unidad 3 · La Vida Cotidiana",
  currentLesson: "Lección 3.3 — Los Verbos Reflexivos en Contexto",
};
window.Sp2Course = Sp2Course;

/* ─────────── Page wrapper ─────────── */
function Sp2ClassPage({ c }) {
  const course = Sp2Course;
  const [tab, setTab] = React.useState("today");
  const [hideTranslations, setHideTranslations] = React.useState(false);
  // tabs: today, virtual, documents, tools, assign, grades

  return (
    <div className="sp2-page" style={{ display: "flex", flexDirection: "column", gap: 14, padding: "20px 24px", minWidth: 0 }}>
      {/* breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ display: "flex", alignItems: "center", gap: 6, padding: "12px 0", fontSize: 13 }}>
        <a href="#/my-classes" style={{ color: "var(--stone)", textDecoration: "none", fontWeight: 500 }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--ink)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--stone)"}
        >My Classes</a>
        <span style={{ color: "var(--silver)", userSelect: "none" }}>›</span>
        <span style={{ color: "var(--ink)", fontWeight: 500 }}>{c.name}</span>
      </nav>

      <Sp2Header c={c} course={course}/>

      {/* Tab row */}
      <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--bone)", borderRadius: 10, alignSelf: "flex-start", flexWrap: "wrap" }}>
        {[
          { id: "today",     label: "My Study Plan",    icon: "Sparkle" },
          { id: "virtual",   label: "Virtual Classroom", icon: "Video" },
          { id: "documents", label: "Documents",         icon: "Folder" },
          { id: "tools",     label: "Class Tools",       icon: "Tools" },
          { id: "assign",    label: "Assignments",       icon: "Document" },
          { id: "grades",    label: "Growth",            icon: "Trophy" },
        ].map(t => {
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

      {tab === "today"     && <Sp2StudyPlanView course={course} setTab={setTab} hideTranslations={hideTranslations} setHideTranslations={setHideTranslations}/>}
      {tab === "virtual"   && <Sp2VirtualView course={course}/>}
      {tab === "documents" && <Sp2DocumentsView course={course}/>}
      {tab === "tools"     && <Sp2ToolsView course={course}/>}
      {tab === "assign"    && <Sp2AssignmentsView course={course}/>}
      {tab === "grades"    && <Sp2GradesView course={course}/>}
    </div>
  );
}
window.Sp2ClassPage = Sp2ClassPage;

/* ─────────── Header ─────────── */
function Sp2Header({ c, course }) {
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
        fontSize: 22, fontWeight: 700, flexShrink: 0,
      }}>{c.abbr}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "nowrap" }}>
          <h1 className="t-h1" style={{ fontSize: 22, margin: 0, whiteSpace: "nowrap" }}>{c.name}</h1>
          <span style={{ fontSize: 10.5, padding: "2px 8px", background: c.color, color: "#fff", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>DIRECTED STUDY</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {c.teacher} · {c.period} · Self-paced
        </div>
      </div>
      <div style={{ display: "flex", gap: 18, paddingRight: 8, flexShrink: 0 }}>
        <Sp2Stat label="Current Grade" value="88% · B+" color={c.color}/>
        <Sp2Stat label="Current Unit" value="La Vida Cotidiana"/>
      </div>
    </div>
  );
}

function Sp2Stat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: color || "var(--ink)" }}>{value}</div>
    </div>
  );
}

/* ─────────── Bilingual helper ─────────── */
function Sp2Tr({ es, en, hide }) {
  return (
    <span>
      {es}
      {!hide && <span style={{ display: "block", fontSize: 12, color: "var(--stone)", fontStyle: "italic", marginTop: 1 }}>{en}</span>}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 1 — My Study Plan (full-width, no sidebar)
═══════════════════════════════════════════════════════════════ */
function Sp2StudyPlanView({ course, setTab, hideTranslations, setHideTranslations }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Hide translations toggle */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 12.5, color: "var(--stone)" }}>Hide translations</span>
        <button
          role="switch" aria-checked={hideTranslations}
          onClick={() => setHideTranslations(v => !v)}
          style={{
            width: 36, height: 20, borderRadius: 10, border: "none", cursor: "pointer",
            background: hideTranslations ? "#EF4444" : "var(--mist)",
            position: "relative", transition: "background 0.2s",
          }}
        >
          <span style={{
            position: "absolute", top: 2, left: hideTranslations ? 18 : 2,
            width: 16, height: 16, borderRadius: "50%", background: "#fff",
            transition: "left 0.2s",
          }}/>
        </button>
      </div>

      <Sp2CheckInCard setTab={setTab}/>
      <Sp2WeekGoals course={course} hideTranslations={hideTranslations}/>
      <Sp2UnitProgress course={course} hideTranslations={hideTranslations}/>
      <Sp2Modules course={course} hideTranslations={hideTranslations}/>
      <Sp2LangTutorCard course={course}/>
      <Sp2CheckInHistory course={course} hideTranslations={hideTranslations}/>
      <Sp2SelfNavCard course={course}/>
      <Sp2MessageTeacher/>
    </div>
  );
}

/* ─────────── 1a. Check-In Card ─────────── */
function Sp2CheckInCard({ setTab }) {
  return (
    <div style={{
      background: "#FEF2F2", borderLeft: "4px solid #EF4444",
      borderRadius: 14, padding: "16px 20px",
      display: "flex", alignItems: "center", gap: 18,
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.Calendar size={16} color="#EF4444"/>
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Next Check-in with Sra. Martinez</span>
        </div>
        <div style={{ fontSize: 13, color: "var(--stone)" }}>Thursday · 2:00 PM — 2:30 PM · Virtual</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, color: "#EF4444",
            background: "#FEF2F2", border: "1px solid #EF4444",
            padding: "2px 8px", borderRadius: 10,
          }}>In 2 days</span>
          <button
            onClick={() => setTab("virtual")}
            style={{
              background: "#EF4444", color: "#fff", border: "none", borderRadius: 8,
              padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}>Join Check-in →</button>
        </div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 4 }}>Previous check-in</div>
        <a href="#" style={{ fontSize: 12, color: "#EF4444", textDecoration: "none", fontWeight: 600 }}>Tuesday · Notes available →</a>
      </div>
    </div>
  );
}

/* ─────────── 1b. Week Goals ─────────── */
function Sp2WeekGoals({ course, hideTranslations }) {
  const goals = [
    { es: "Completa Lección 3.2 — Los Verbos Reflexivos", en: "Complete Lesson 3.2 — Reflexive Verbs", due: "Due Tue", status: "Completed" },
    { es: "Escucha y responde: Diálogo en el mercado", en: "Listen and respond: Market dialogue", due: "Due Tue", status: "Completed" },
    { es: "Escribe 10 oraciones usando verbos reflexivos", en: "Write 10 sentences using reflexive verbs", due: "Due Thu", status: "In Progress" },
    { es: "Practica pronunciación: Lección 3.3", en: "Practice pronunciation: Lesson 3.3", due: "Due Thu", status: "Not started" },
    { es: "Vocabulario: La Vida Cotidiana — 20 palabras", en: "Vocabulary: Daily Life — 20 words", due: "Due Fri", status: "Not started" },
  ];

  const statusChip = (s) => {
    if (s === "Completed")   return { bg: "#DCFCE7", color: "#166534" };
    if (s === "In Progress") return { bg: "#FEF9C3", color: "#854D0E" };
    return { bg: "var(--bone)", color: "var(--stone)" };
  };

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>
        Esta Semana
        {!hideTranslations && <span style={{ fontWeight: 400, fontSize: 13, color: "var(--stone)", marginLeft: 6 }}>/ This Week</span>}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {goals.map((g, i) => {
          const done = g.status === "Completed";
          const chip = statusChip(g.status);
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 12px", background: "var(--bone)", borderRadius: 10 }}>
              {done
                ? <I.CheckCircle size={18} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }}/>
                : <I.Circle size={18} color="var(--silver)" style={{ flexShrink: 0, marginTop: 1 }}/>
              }
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{g.es}</div>
                {!hideTranslations && <div style={{ fontSize: 12, color: "var(--stone)", fontStyle: "italic", marginTop: 1 }}>{g.en}</div>}
              </div>
              <span style={{ fontSize: 11, background: "var(--bone)", color: "var(--stone)", padding: "2px 8px", borderRadius: 10, flexShrink: 0, border: "1px solid var(--mist)" }}>{g.due}</span>
              <span style={{ fontSize: 11, fontWeight: 600, background: chip.bg, color: chip.color, padding: "2px 8px", borderRadius: 10, flexShrink: 0 }}>{g.status}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────── 1c. Unit Progress ─────────── */
function Sp2UnitProgress({ course, hideTranslations }) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>Unidad 3 · La Vida Cotidiana</span>
          {!hideTranslations && <span style={{ fontSize: 12, color: "var(--stone)", marginLeft: 6 }}>/ Unit 3 · Daily Life</span>}
        </div>
        <a href="#" style={{ fontSize: 12, color: "#EF4444", textDecoration: "none", fontWeight: 600 }}>View full unit →</a>
      </div>
      <div style={{ width: "100%", height: 8, borderRadius: 4, background: "var(--mist)", overflow: "hidden" }}>
        <div style={{ width: "60%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #EF4444, #F87171)" }}/>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>6 of 10 lessons complete</span>
        <span style={{ fontSize: 12, color: "#EF4444", fontWeight: 600 }}>60%</span>
      </div>
    </div>
  );
}

/* ─────────── 1d. Modules ─────────── */
function Sp2Modules({ course, hideTranslations }) {
  const modules = [
    { es: "Lección 3.3 — Los Verbos Reflexivos en Contexto", en: "Lesson 3.3 — Reflexive Verbs in Context", type: "Video + practice", min: 25, badge: "NEXT UP", badgeColor: "#EF4444" },
    { es: "Lección 3.3 — Pronunciación", en: "Lesson 3.3 — Pronunciation", type: "Audio exercises", min: 15 },
    { es: "Lección 3.3 — Escritura Guiada", en: "Lesson 3.3 — Guided Writing", type: "Writing activity", min: 20 },
    { es: "Repaso: Unidad 3 Mitad", en: "Mid-unit Review", type: "Quiz", min: 30, badge: "LOCKED", locked: true },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: "0 0 12px" }}>
        Módulos
        {!hideTranslations && <span style={{ fontWeight: 400, fontSize: 13, color: "var(--stone)", marginLeft: 6 }}>/ Modules</span>}
      </h2>
      <div style={{ border: "1px solid var(--mist)", borderRadius: 12, overflow: "hidden" }}>
        {modules.map((m, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
            borderBottom: i < modules.length - 1 ? "1px solid var(--mist)" : "none",
            opacity: m.locked ? 0.5 : 1,
            background: i === 0 ? "#FEF2F2" : "transparent",
          }}>
            <div style={{ width: 8, alignSelf: "stretch", borderRadius: 2, background: `${course.color}30`, flexShrink: 0 }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink)" }}>{m.es}</div>
              {!hideTranslations && <div style={{ fontSize: 12, color: "var(--stone)", fontStyle: "italic", marginTop: 1 }}>{m.en}</div>}
              <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>{m.type} · {m.min} min</div>
            </div>
            {m.badge && (
              <span style={{
                fontSize: 9.5, fontWeight: 700, padding: "2px 7px",
                background: m.badgeColor ? `${m.badgeColor}15` : "var(--bone)",
                color: m.badgeColor || "var(--stone)",
                borderRadius: 4, letterSpacing: "0.04em", flexShrink: 0,
                border: m.badgeColor ? `1px solid ${m.badgeColor}40` : "1px solid var(--mist)",
              }}>{m.badge}</span>
            )}
            <I.ChevronRight size={14} color="var(--silver)"/>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── 1e. Language Tutor Card ─────────── */
function Sp2LangTutorCard({ course }) {
  const [draft, setDraft] = React.useState("");
  const suggestions = [
    "Explain reflexive verbs simply",
    "Check my sentence",
    "How do I pronounce this?",
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg, #FEF2F2 0%, #EF444410 100%)",
      borderRadius: 14, padding: "18px 22px",
      border: "1px solid #EF444430",
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: "linear-gradient(135deg, #F87171, #EF4444)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <I.Sparkle size={20} color="#fff"/>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Language Tutor</h3>
            <span style={{ fontSize: 9, padding: "2px 6px", background: "#FEE2E2", color: "#B91C1C", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 1 }}>Your 24/7 Spanish study partner — trained on Unidad 3 materials.</div>
        </div>
      </div>
      <div style={{
        display: "flex", gap: 8, alignItems: "center",
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 10, padding: "8px 10px",
      }}>
        <input
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Pregúntale al Language Tutor sobre La Vida Cotidiana…"
          style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)" }}
        />
        <button style={{
          background: "linear-gradient(135deg, #F87171, #EF4444)",
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

/* ─────────── 1f. Check-In History ─────────── */
function Sp2CheckInHistory({ course, hideTranslations }) {
  const entries = [
    { date: "Tuesday Oct 22 · 28 min", es: "Buen progreso con los verbos — sigue practicando la pronunciación", en: "Good progress with verbs — keep practicing pronunciation" },
    { date: "Thursday Oct 17 · 30 min", es: "Necesitas más práctica con la escritura reflexiva", en: "You need more practice with reflexive writing" },
    { date: "Tuesday Oct 15 · 25 min", es: "Excelente participación hoy", en: "Excellent participation today" },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
      <div style={{ padding: "16px 20px 10px" }}>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
          Historial de Revisiones
          {!hideTranslations && <span style={{ fontWeight: 400, fontSize: 13, color: "var(--stone)", marginLeft: 6 }}>/ Check-in History</span>}
        </h2>
      </div>
      {entries.map((e, i) => (
        <div key={i} style={{
          display: "flex", alignItems: "flex-start", gap: 12,
          padding: "12px 20px",
          borderTop: "1px solid var(--mist)",
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>{e.date}</div>
            <div style={{ fontSize: 13, color: "var(--ink)" }}>{e.es}</div>
            {!hideTranslations && <div style={{ fontSize: 12, color: "var(--stone)", fontStyle: "italic", marginTop: 1 }}>{e.en}</div>}
          </div>
          <a href="#" style={{ fontSize: 12, color: "#EF4444", textDecoration: "none", fontWeight: 600, flexShrink: 0, marginTop: 2 }}>View notes →</a>
        </div>
      ))}
    </div>
  );
}

/* ─────────── 1g. Self-Navigation Card ─────────── */
function Sp2SelfNavCard({ course }) {
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

/* ─────────── Message Sra. Martinez ─────────── */
function Sp2MessageTeacher() {
  const msgs = [
    { from: "teacher", name: "Sra. Martinez", time: "Yesterday",   text: "Alex, don't forget your pronunciation recording is due Friday — you're almost there!" },
    { from: "you",     name: "Alex Johnson",  time: "Yesterday",   text: "Gracias Sra. Martinez! I'll finish it tonight." },
    { from: "teacher", name: "Sra. Martinez", time: "2 hours ago", text: "Quick reminder — check-in is Thursday at 2:00 PM. See you then! 😊" },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>Message Sra. Martinez</span>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", display: "inline-block" }}/>
        </div>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>Usually responds within a few hours</span>
      </div>

      {/* Mini thread */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.from === "you" ? "flex-end" : "flex-start", gap: 3 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexDirection: m.from === "you" ? "row-reverse" : "row" }}>
              {m.from === "teacher" && (
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#EF4444", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>SM</div>
              )}
              <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)" }}>{m.name}</span>
              <span style={{ fontSize: 11, color: "var(--stone)" }}>{m.time}</span>
            </div>
            <div style={{
              maxWidth: "72%",
              padding: "8px 12px",
              borderRadius: m.from === "you" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              background: m.from === "you" ? "#EF4444" : "var(--bone)",
              color: m.from === "you" ? "#fff" : "var(--ink)",
              fontSize: 13, lineHeight: 1.45,
            }}>{m.text}</div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--bone)", borderRadius: 10, padding: "8px 12px" }}>
          <I.Paperclip size={15} color="var(--stone)" style={{ cursor: "pointer", flexShrink: 0 }}/>
          <input
            type="text"
            placeholder="Message Sra. Martinez…"
            style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, color: "var(--ink)", outline: "none" }}
          />
          <button style={{ width: 30, height: 30, borderRadius: 8, background: "#EF4444", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Send size={13} color="#fff"/>
          </button>
        </div>
        <span style={{ fontSize: 11, color: "var(--silver)", paddingLeft: 4 }}>Messages are logged and visible to school staff.</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 2 — Virtual Classroom
═══════════════════════════════════════════════════════════════ */
function Sp2VirtualView({ course }) {
  const [active, setActive] = React.useState(false);
  const [secs, setSecs] = React.useState(872);

  React.useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setSecs(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [active]);

  const fmtTime = (s) => {
    const h   = Math.floor(s / 3600).toString().padStart(2, "0");
    const m   = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  /* ── Inactive state ── */
  if (!active) {
    return (
      <div style={{ position: "relative" }}>
        {/* Preview button */}
        <button
          onClick={() => setActive(true)}
          style={{
            position: "absolute", top: 0, right: 0,
            background: "none", border: "1.5px solid #EF4444",
            borderRadius: 7, padding: "4px 11px",
            fontSize: 13, fontWeight: 600, color: "#EF4444", cursor: "pointer",
          }}>Preview active state →</button>

        <div style={{ maxWidth: 480, margin: "40px auto", background: "var(--paper)", borderRadius: 16, padding: "32px 28px", textAlign: "center", boxShadow: "var(--shadow-card)" }}>
          {/* Room placeholder */}
          <div style={{
            width: 120, height: 90, margin: "0 auto 20px",
            background: "var(--bone)", border: "2px dashed var(--mist)", borderRadius: 12,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <I.Video size={32} color="var(--silver)"/>
            <span style={{ fontSize: 12, color: "var(--stone)" }}>Check-in Room</span>
          </div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "0 0 10px" }}>Virtual Classroom</h2>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", background: "var(--bone)", color: "var(--stone)", borderRadius: 4, padding: "3px 10px" }}>NOT ACTIVE · DIRECTED STUDY</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--stone)", marginBottom: 6 }}>Next scheduled session:</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 16 }}>Thursday · 2:00 PM with Sra. Martinez</div>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            borderRadius: 8, border: "1.5px solid var(--mist)", background: "none",
            fontSize: 13, color: "var(--stone)", padding: "8px 14px", cursor: "pointer",
          }}>
            <I.Bell size={14} color="var(--stone)"/> Notify me when enabled
          </button>
        </div>
      </div>
    );
  }

  /* ── Active state ── */
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "0 -24px -20px" }}>
      <style>{`@keyframes sp2Pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}`}</style>

      {/* Status bar */}
      <div style={{
        height: 48, display: "flex", alignItems: "center",
        padding: "0 20px", gap: 10,
        background: "var(--bone)",
        borderLeft: "3px solid #10B981",
        borderBottom: "1px solid var(--mist)",
        flexShrink: 0,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: 999, background: "#10B981", flexShrink: 0, display: "inline-block", animation: "sp2Pulse 1.6s ease-in-out infinite" }}/>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Live · Check-in</span>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>Sra. Martinez · Directed Study · Virtual</span>
        <span style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, color: "var(--ink)", marginLeft: 4 }}>{fmtTime(secs)}</span>

        <div style={{ display: "flex", gap: 2, marginLeft: 10 }}>
          <Sp2IconBtn icon="Mic"        label="Mic"          active={true}/>
          <Sp2IconBtn icon="Video"      label="Camera"       active={true}/>
          <Sp2IconBtn icon="Share"      label="Share Screen" active={false}/>
          <Sp2IconBtn icon="Hand"       label="Raise Hand"   active={false}/>
          <Sp2IconBtn icon="PhoneOff"   label="Settings"     active={false}/>
        </div>

        <span style={{ marginLeft: "auto", fontSize: 12, color: "#10B981", fontWeight: 600 }}>● 2 online</span>
        <button
          onClick={() => setActive(false)}
          style={{
            background: "#EF4444", border: "none", borderRadius: 7,
            padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#fff",
            cursor: "pointer", marginLeft: 6,
          }}>Exit</button>
        <button
          onClick={() => setActive(false)}
          style={{
            background: "none", border: "1.5px solid #EF4444",
            borderRadius: 7, padding: "4px 11px",
            fontSize: 13, fontWeight: 600, color: "#EF4444", cursor: "pointer", marginLeft: 4,
          }}>← Exit preview</button>
      </div>

      {/* Main two-column area */}
      <div style={{ display: "flex", flex: 1, minHeight: 560 }}>
        <div style={{ flex: 1, minWidth: 0, padding: "20px 20px 24px", overflowY: "auto", background: "var(--surface)", display: "flex", flexDirection: "column", gap: 20 }}>
          <Sp2VideoGrid course={course}/>
          <div>
            <div style={{ fontSize: 13, color: "var(--stone)", fontWeight: 600, marginBottom: 12 }}>Check-in Room</div>
            <Sp2VirtualRoomMap/>
          </div>
        </div>
        <div style={{ width: 380, flexShrink: 0, display: "flex", flexDirection: "column", borderLeft: "1px solid var(--mist)" }}>
          <Sp2ChatPanelWide course={course}/>
        </div>
      </div>
    </div>
  );
}

function Sp2IconBtn({ icon, label, active, onClick }) {
  const Icon = I[icon];
  const col = active === false ? "var(--silver)" : "var(--slate)";
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

function Sp2VideoGrid({ course }) {
  const color = course.color;
  const tiles = [
    { name: "Sra. Martinez", init: "SM", bg: "#EF4444", teacher: true },
    { name: "Alex Johnson",  init: "AJ", you: true },
    { name: "Student",       camOff: true },
    { name: "Student",       camOff: true },
    { name: "Student",       camOff: true },
    { name: "Student",       camOff: true },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 13, color: "var(--stone)", fontWeight: 600 }}>Live Video — Check-in Session</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {tiles.map((t, i) => (
          <div key={i} style={{
            height: 140, borderRadius: 10,
            background: "#1E293B",
            border: t.you ? `2px solid ${color}` : "none",
            position: "relative",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8,
            overflow: "hidden",
          }}>
            {t.camOff ? (
              <>
                <I.Video size={22} color="var(--silver)"/>
                <span style={{ fontSize: 11, color: "#94A3B8" }}>Student</span>
              </>
            ) : (
              <>
                <div style={{
                  width: 40, height: 40, borderRadius: 999,
                  background: t.bg || color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, fontWeight: 700, color: "#fff",
                  border: t.you ? `2.5px solid ${color}` : "none",
                  flexShrink: 0,
                }}>{t.init}</div>
                <span style={{ fontSize: 12, color: "#CBD5E1", fontWeight: 500 }}>{t.name}</span>
                {t.teacher && (
                  <span style={{ position: "absolute", top: 7, left: 8, fontSize: 9, fontWeight: 700, background: "#47556990", color: "#F1F5F9", padding: "1px 5px", borderRadius: 3 }}>TEACHER</span>
                )}
                {t.you && (
                  <span style={{ position: "absolute", top: 7, right: 8, fontSize: 9, fontWeight: 700, background: `${color}CC`, color: "#fff", padding: "1px 5px", borderRadius: 3 }}>YOU</span>
                )}
                <div style={{ position: "absolute", bottom: 7, right: 8 }}>
                  <I.Mic size={12} color="#10B981"/>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Sp2VirtualRoomMap() {
  return (
    <div style={{ background: "var(--bone)", borderRadius: 12, border: "1px solid var(--mist)", overflow: "hidden", lineHeight: 0 }}>
      <svg width="560" height="320" style={{ display: "block" }} aria-label="Check-in Room map">
        <defs>
          <pattern id="sp2Floor" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <rect width="12" height="12" fill="#F8FAFC"/>
            <rect x="12" width="12" height="12" fill="#F1F5F9"/>
            <rect y="12" width="12" height="12" fill="#F1F5F9"/>
            <rect x="12" y="12" width="12" height="12" fill="#F8FAFC"/>
          </pattern>
        </defs>

        {/* Outer walls */}
        <rect x="0" y="0" width="560" height="320" fill="#334155"/>
        {/* Inner floor */}
        <rect x="8" y="8" width="544" height="304" fill="url(#sp2Floor)"/>

        {/* Wall inset shadow stripes */}
        <rect x="8" y="8" width="544" height="4" fill="#475569" opacity="0.18"/>
        <rect x="8" y="308" width="544" height="4" fill="#475569" opacity="0.18"/>
        <rect x="548" y="8" width="4" height="304" fill="#475569" opacity="0.18"/>
        <rect x="8" y="8" width="4" height="304" fill="#475569" opacity="0.18"/>

        {/* Bookshelf (back wall left) */}
        <rect x="10" y="6" width="180" height="44" rx="2" fill="#78716C" opacity="0.9"/>
        <rect x="10" y="21" width="180" height="2" fill="#57534E"/>
        <rect x="10" y="35" width="180" height="2" fill="#57534E"/>
        {/* Book rows */}
        {[
          { x: 12, c: "#94A3B8" }, { x: 20, c: "#FCA5A5" }, { x: 28, c: "#86EFAC" },
          { x: 36, c: "#A8A29E" }, { x: 44, c: "#C4B5FD" }, { x: 52, c: "#94A3B8" },
          { x: 60, c: "#FCA5A5" }, { x: 68, c: "#86EFAC" },
        ].map((bk, i) => <rect key={"b1"+i} x={bk.x} y="8"  width="6" height="11" rx="0.5" fill={bk.c}/>)}
        {[
          { x: 12, c: "#FCA5A5" }, { x: 19, c: "#C4B5FD" }, { x: 27, c: "#A8A29E" },
          { x: 35, c: "#86EFAC" }, { x: 43, c: "#FCA5A5" }, { x: 51, c: "#94A3B8" },
          { x: 59, c: "#C4B5FD" }, { x: 67, c: "#86EFAC" },
        ].map((bk, i) => <rect key={"b2"+i} x={bk.x} y="23" width="6" height="10" rx="0.5" fill={bk.c}/>)}
        {[
          { x: 11, c: "#86EFAC" }, { x: 18, c: "#94A3B8" }, { x: 26, c: "#FCA5A5" },
          { x: 34, c: "#C4B5FD" }, { x: 42, c: "#A8A29E" }, { x: 50, c: "#86EFAC" },
          { x: 58, c: "#94A3B8" }, { x: 66, c: "#FCA5A5" },
        ].map((bk, i) => <rect key={"b3"+i} x={bk.x} y="37" width="6" height="10" rx="0.5" fill={bk.c}/>)}
        {/* Biblioteca / Library label */}
        <text x="100" y="58" fontSize="9" fill="#A8A29E" textAnchor="middle" fontFamily="sans-serif">Biblioteca / Library</text>

        {/* Whiteboard (front wall center) */}
        <rect x="200" y="8" width="160" height="36" rx="2" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5"/>
        <text x="280" y="24" fontSize="9" fill="#334155" textAnchor="middle" fontFamily="sans-serif" fontWeight="600">Check-in · Unidad 3</text>
        <line x1="212" y1="30" x2="348" y2="30" stroke="#E2E8F0" strokeWidth="1"/>

        {/* Teacher desk (Sra. Martinez) */}
        <rect x="180" y="100" width="100" height="60" rx="4" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5"/>
        {/* Monitor on teacher desk */}
        <rect x="238" y="104" width="20" height="14" rx="1.5" fill="#1E293B" stroke="#475569" strokeWidth="0.5"/>
        {/* Teacher sprite */}
        <circle cx="230" cy="93" r="7" fill="#EF4444" stroke="#fff" strokeWidth="1.5"/>
        <text x="230" y="86" fontSize="9" fill="#fff" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">SM</text>
        <rect x="223" y="100" width="14" height="10" rx="2" fill="#EF444450"/>
        <text x="230" y="115" fontSize="8" fill="#475569" textAnchor="middle" fontFamily="sans-serif">Sra. Martinez</text>

        {/* Student desk (Alex/YOU) */}
        <rect x="280" y="180" width="100" height="60" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2"/>
        {/* YOU sprite */}
        <circle cx="330" cy="173" r="7" fill="#EF4444" stroke="#fff" strokeWidth="1.5"/>
        {/* YOU badge */}
        <rect x="318" y="158" width="24" height="11" rx="3" fill="#EF4444"/>
        <text x="330" y="167" fontSize="7" fill="#fff" textAnchor="middle" fontFamily="sans-serif" fontWeight="700">YOU</text>
        <rect x="323" y="180" width="14" height="10" rx="2" fill="#EF444450"/>
        <text x="330" y="200" fontSize="8" fill="#475569" textAnchor="middle" fontFamily="sans-serif">Alex Johnson</text>

        {/* Potted plant bottom-left */}
        <rect x="16" y="282" width="18" height="12" rx="2" fill="#94A3B8"/>
        <line x1="25" y1="282" x2="25" y2="272" stroke="#4ADE80" strokeWidth="1.5"/>
        <circle cx="25" cy="267" r="9" fill="#4ADE80" opacity="0.85"/>
        <circle cx="18" cy="264" r="6" fill="#22C55E" opacity="0.85"/>
        <circle cx="32" cy="263" r="5" fill="#86EFAC" opacity="0.85"/>

        {/* Potted plant bottom-right */}
        <rect x="526" y="282" width="18" height="12" rx="2" fill="#94A3B8"/>
        <line x1="535" y1="282" x2="535" y2="272" stroke="#4ADE80" strokeWidth="1.5"/>
        <circle cx="535" cy="267" r="9" fill="#4ADE80" opacity="0.85"/>
        <circle cx="528" cy="264" r="6" fill="#22C55E" opacity="0.85"/>
        <circle cx="542" cy="263" r="5" fill="#86EFAC" opacity="0.85"/>
      </svg>
    </div>
  );
}

function Sp2ChatPanelWide({ course }) {
  const [chatTab, setChatTab] = React.useState("chat");
  const [draft, setDraft] = React.useState("");

  return (
    <div style={{
      background: "var(--paper)", borderRadius: 0,
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      height: "100%",
      minHeight: 0,
    }}>
      {/* Tab row */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--mist)", background: "var(--bone)" }}>
        {["Class Chat", "Channels", "People"].map((t, i) => {
          const id = ["chat","channels","people"][i];
          return (
            <button key={id} onClick={() => setChatTab(id)} style={{
              flex: 1, padding: "10px 6px",
              background: chatTab === id ? "var(--paper)" : "transparent",
              border: "none",
              borderBottom: chatTab === id ? `2px solid ${course.color}` : "2px solid transparent",
              fontSize: 11.5, fontWeight: chatTab === id ? 700 : 500,
              color: chatTab === id ? "var(--ink)" : "var(--stone)",
              cursor: "pointer",
            }}>{t}</button>
          );
        })}
      </div>

      {chatTab === "chat" && (
        <>
          {/* Context bar */}
          <div style={{
            padding: "8px 12px", background: "#EF444408",
            borderBottom: "1px solid var(--mist)",
            display: "flex", alignItems: "center", gap: 8, fontSize: 11.5,
          }}>
            <I.Pin size={12} color="#EF4444"/>
            <span style={{ color: "var(--stone)" }}>Check-in session — moderated by</span>
            <b style={{ color: "var(--ink)" }}>Sra. Martinez</b>
            <span style={{ marginLeft: "auto", color: "#10B981", fontWeight: 600 }}>● 2 online</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Sra. Martinez */}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>SM</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5 }}>
                  <b style={{ color: "#EF4444" }}>Sra. Martinez</b>
                  <span style={{ marginLeft: 4, fontSize: 9, padding: "1px 4px", background: "#FEE2E2", color: "#EF4444", borderRadius: 3, fontWeight: 700 }}>TEACHER</span>
                  <span style={{ marginLeft: 6, fontSize: 10, color: "var(--silver)" }}>2:02 PM</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.45, marginTop: 2 }}>Hola Alex! ¿Cómo estás hoy? ¿Tienes tu tarea lista?</div>
              </div>
            </div>

            {/* Alex YOU */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ maxWidth: "85%" }}>
                <div style={{
                  background: "#EF4444", color: "#fff",
                  borderRadius: "12px 12px 2px 12px",
                  padding: "8px 12px", fontSize: 12, lineHeight: 1.45,
                }}>¡Hola! Sí, tengo la tarea. Tengo una pregunta sobre los verbos reflexivos.</div>
                <div style={{ fontSize: 10, color: "var(--silver)", textAlign: "right", marginTop: 2 }}>2:02 PM</div>
              </div>
            </div>

            {/* Sra. Martinez reply */}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>SM</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5 }}>
                  <b style={{ color: "#EF4444" }}>Sra. Martinez</b>
                  <span style={{ marginLeft: 6, fontSize: 10, color: "var(--silver)" }}>2:03 PM</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.45, marginTop: 2 }}>Perfecto. Vamos a empezar con los verbos y luego revisamos tu escritura. 😊</div>
              </div>
            </div>

            {/* Language Tutor AI */}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #A78BFA, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I.Sparkle size={13} color="#fff"/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11.5 }}>
                  <b style={{ color: "#7C3AED" }}>Language Tutor</b>
                  <span style={{ marginLeft: 4, fontSize: 9, padding: "1px 4px", background: "#EDE9FE", color: "#7C3AED", borderRadius: 3, fontWeight: 700 }}>AI</span>
                  <span style={{ marginLeft: 6, fontSize: 10, color: "var(--silver)" }}>2:04 PM</span>
                </div>
                <div style={{
                  fontSize: 12, color: "var(--slate)", lineHeight: 1.45, marginTop: 2,
                  background: "#F5F3FF", padding: "8px 10px", borderRadius: 10,
                  borderLeft: "2px solid #7C3AED",
                }}>Reflexive verbs (verbos reflexivos) describe actions the subject does to themselves. For example: 'Me lavo' = I wash myself.</div>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div style={{ padding: "8px 12px", borderTop: "1px solid var(--mist)", display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#EF444410", border: "1px solid #EF444430", borderRadius: 999, cursor: "pointer", fontSize: 10.5, fontWeight: 600, color: "#EF4444" }}>
              <I.MessageCircle size={11} color="#EF4444"/> Question for Sra. Martinez
            </button>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#8B5CF610", border: "1px solid #8B5CF630", borderRadius: 999, cursor: "pointer", fontSize: 10.5, fontWeight: 600, color: "#8B5CF6" }}>
              <I.Sparkle size={11} color="#8B5CF6"/> Ask Language Tutor
            </button>
            <button style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 8px", background: "#F59E0B10", border: "1px solid #F59E0B30", borderRadius: 999, cursor: "pointer", fontSize: 10.5, fontWeight: 600, color: "#F59E0B" }}>
              <I.Hand size={11} color="#F59E0B"/> Raise hand
            </button>
          </div>

          {/* Input bar */}
          <div style={{ borderTop: "1px solid var(--mist)", padding: "10px 12px", background: "var(--paper)" }}>
            <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "6px 8px", background: "var(--bone)", borderRadius: 10 }}>
              <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.Paperclip size={14} color="var(--stone)"/></button>
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                placeholder="Message Sra. Martinez…"
                style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "var(--ink)" }}
              />
              <button style={{ background: "#EF4444", border: "none", borderRadius: 7, padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                <I.Send size={12} color="#fff"/>
              </button>
            </div>
          </div>
        </>
      )}

      {chatTab !== "chat" && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--stone)", fontSize: 13 }}>
          {chatTab === "channels" ? "Channels" : "People"} panel
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 3 — Documents
═══════════════════════════════════════════════════════════════ */
function Sp2DocumentsView({ course }) {
  const cats = [
    {
      title: "For This Week",
      icon: "Sparkle",
      tint: course.color,
      items: [
        { name: "Lección 3.3 Slide Deck", sub: "Required · Sra. Martinez", kind: "pdf", from: "Sra. Martinez", date: "Posted today", urgent: true },
        { name: "Diálogo en el Mercado Audio.mp3", sub: "Audio · open in player", kind: "audio", from: "Sra. Martinez", date: "Posted today" },
      ],
    },
    {
      title: "This Unit — Unidad 3",
      icon: "Globe",
      tint: "#0EA5E9",
      items: [
        { name: "Verbos Reflexivos Practice.pdf", sub: "Reflexive Verbs Practice · worksheet", kind: "pdf", from: "Sra. Martinez", date: "3 days ago" },
        { name: "Unidad 3 Vocabulary List.pdf", sub: "48 terms · La Vida Cotidiana", kind: "pdf", from: "Sra. Martinez", date: "4 days ago" },
        { name: "Pronunciation Guide — Lección 3.pdf", sub: "Audio + text", kind: "pdf", from: "Sra. Martinez", date: "5 days ago" },
        { name: "Cultural Reading — La Vida en España.pdf", sub: "Reading activity", kind: "pdf", from: "Sra. Martinez", date: "1 week ago" },
      ],
    },
    {
      title: "Reference & Tools",
      icon: "BookOpen",
      tint: "#F59E0B",
      items: [
        { name: "Course Syllabus 2025–26", sub: "Pinned · grading & policy", kind: "pdf", from: "Sra. Martinez", date: "Sep 2" },
        { name: "Spanish II Glossary", sub: "200 terms", kind: "pdf", from: "Sra. Martinez", date: "Sep 5" },
        { name: "Conjugation Tables — All Tenses", sub: "Reference", kind: "pdf", from: "Sra. Martinez", date: "Sep 8" },
        { name: "Pronunciation Guide — Full Course", sub: "Audio guide", kind: "pdf", from: "Sra. Martinez", date: "Sep 10" },
      ],
    },
    {
      title: "Your Notes & Submissions",
      icon: "Notes",
      tint: "#8B5CF6",
      items: [
        { name: "My Unidad 3 Notes", sub: "Notes · last edited today", kind: "notes", from: "You", date: "Today" },
        { name: "Reflexive Verbs — Writing Draft", sub: "Doc · draft · In Progress", kind: "doc", from: "You", date: "Yesterday", inProgress: true },
      ],
    },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
      {/* Search + filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, padding: "0 12px", height: 34, background: "var(--bone)", borderRadius: 10 }}>
          <I.Search size={14} color="var(--stone)"/>
          <input placeholder="Search Spanish II documents…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12.5, color: "var(--ink)" }}/>
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
            {cat.items.map((it, j) => <Sp2DocRow key={j} {...it} courseColor={course.color}/>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Sp2DocRow({ name, sub, kind, from, date, urgent, inProgress, courseColor }) {
  const KIND = {
    pdf:   { icon: "Document", color: "#EF4444" },
    doc:   { icon: "Document", color: "#0EA5E9" },
    audio: { icon: "Mic",      color: "#10B981" },
    notes: { icon: "Notes",    color: courseColor },
  };
  const k = KIND[kind] || KIND.doc;
  return (
    <div style={{
      display: "flex", gap: 10, padding: "10px 12px",
      background: urgent ? `${courseColor}0A` : "var(--paper)",
      border: `1px solid ${urgent ? courseColor + "40" : "var(--mist)"}`,
      borderRadius: 10, alignItems: "center",
    }}>
      <div style={{ width: 34, height: 34, borderRadius: 8, background: `${k.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {React.createElement(I[k.icon], { size: 15, color: k.color })}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {name}
          {urgent && <span style={{ marginLeft: 6, fontSize: 9, padding: "1px 5px", background: courseColor, color: "#fff", borderRadius: 3, fontWeight: 700 }}>NEEDED NOW</span>}
          {inProgress && <span style={{ marginLeft: 6, fontSize: 9, padding: "1px 5px", background: "#FEF9C3", color: "#854D0E", borderRadius: 3, fontWeight: 700 }}>IN PROGRESS</span>}
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
function Sp2ToolsView({ course }) {
  const groups = [
    {
      title: "Writing & Notes",
      tools: [
        { name: "Spanish Notebook",      sub: "Open your active Spanish II notebook",                   icon: "Notes",     color: course.color, primary: true },
        { name: "Quick Note",             sub: "Capture a thought, link to today's lesson",              icon: "Edit",      color: course.color },
        { name: "Voice Memo",             sub: "Record yourself speaking — auto-transcribed",            icon: "Mic",       color: course.color },
        { name: "Draw / Diagram",         sub: "Sketch grammar diagrams or vocabulary maps",             icon: "Edit",      color: "#64748B" },
        { name: "Self-Navigation Tool",   sub: "Self-assessment to track your learning progress",        icon: "Target",    color: "#94A3B8", soon: true },
      ],
    },
    {
      title: "Language Skills",
      tools: [
        { name: "Vocabulary Builder",     sub: "Flashcard-style with spaced repetition",                 icon: "BookOpen",  color: course.color, primary: true },
        { name: "Pronunciation Coach",    sub: "Record and compare with native audio",                   icon: "Mic",       color: course.color },
        { name: "Conjugation Table",      sub: "All tenses, searchable",                                 icon: "Notes",     color: "#8B5CF6" },
        { name: "Translation Reference",  sub: "Spanish ↔ English",                                     icon: "Globe",     color: "#0EA5E9" },
        { name: "Gender & Article Guide", sub: "la/el/los/las quick reference",                          icon: "BookMarked",color: "#F59E0B" },
      ],
    },
    {
      title: "Annotate & Read",
      tools: [
        { name: "PDF Annotator",          sub: "Highlight and annotate any class document",              icon: "Edit",      color: course.color },
        { name: "Highlighter",            sub: "Highlight text as you read",                             icon: "Edit",      color: "#F59E0B" },
        { name: "Read-Aloud",             sub: "Spanish pronunciation playback",                         icon: "Mic",       color: "#10B981" },
        { name: "Glossary Lookup",        sub: "Search Spanish terms",                                   icon: "BookOpen",  color: "#8B5CF6" },
      ],
    },
    {
      title: "Capture & Share",
      tools: [
        { name: "Voice Recorder",         sub: "Record up to 5 minutes — auto-transcribed",              icon: "Mic",       color: course.color },
        { name: "Submit Work",            sub: "Hand in to Sra. Martinez",                               icon: "Send",      color: "#10B981" },
        { name: "Share to Check-in",      sub: "Send file to upcoming session",                          icon: "Paperclip", color: "#8B5CF6" },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Quick-launch strip */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Quick Launch</h3>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Your most-used tools in Spanish II</span>
        </div>
        <div className="bio-quicklaunch-grid">
          <Sp2QuickTool icon="BookOpen"  label="Vocabulary Builder"  color={course.color} active/>
          <Sp2QuickTool icon="Mic"       label="Pronunciation Coach"  color={course.color}/>
          <Sp2QuickTool icon="Notes"     label="Conjugation Table"    color="#8B5CF6"/>
          <Sp2QuickTool icon="Edit"      label="Note Taking"          color={course.color}/>
          <Sp2QuickTool icon="Sparkle"   label="Language Tutor"       color={course.color}/>
        </div>
      </div>

      {groups.map((g, i) => (
        <div key={i} style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
          <h3 className="t-h3" style={{ fontSize: 13, margin: "0 0 10px" }}>{g.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
            {g.tools.map((t, j) => <Sp2ToolRow key={j} {...t} courseColor={course.color}/>)}
          </div>
        </div>
      ))}
    </div>
  );
}

function Sp2QuickTool({ icon, label, color, active }) {
  const Icon = I[icon];
  return (
    <button style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
      padding: "12px 8px",
      background: active ? `${color}10` : "var(--paper)",
      border: `1px solid ${active ? color + "40" : "var(--mist)"}`,
      borderRadius: 10, cursor: "pointer",
    }}>
      <div style={{ width: 38, height: 38, borderRadius: 9, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={18} color={color}/>
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)", textAlign: "center" }}>{label}</div>
    </button>
  );
}

function Sp2ToolRow({ name, sub, icon, color, primary, courseColor, soon }) {
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
function Sp2AssignmentsView({ course }) {
  const coming = [
    { name: "Reflexive Verbs Writing",            sub: "Unidad 3 · Writing",    due: "Due Thursday",     status: "In Progress",  statusColor: "#F59E0B", points: "/ 20" },
    { name: "Pronunciation Recording — Lección 3.3", sub: "Unidad 3 · Speaking", due: "Due Friday",      status: "Not started",  statusColor: "#EF4444", points: "/ 15" },
    { name: "Unidad 3 Mid-unit Quiz",             sub: "Unidad 3 · Quiz",       due: "Due next Monday",  status: "Not started",  statusColor: "#94A3B8", points: "/ 50" },
  ];
  const done = [
    { name: "Diálogo en el Mercado — Response",   sub: "Submitted Oct 20",      score: "18/20",  chip: "Good",  chipColor: "#10B981" },
    { name: "Unidad 2 Final Test",                sub: "Submitted Oct 5",       score: "44/50 (88%)", chip: "B+", chipColor: "#0EA5E9" },
  ];

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
      {/* Tab row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, borderBottom: "1px solid var(--mist)" }}>
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

      {/* Coming Up */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Coming Up</div>
      {coming.map((a, i) => (
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

      {/* Completed */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: "0.06em", textTransform: "uppercase", margin: "18px 0 8px" }}>Completed</div>
      {done.map((a, i) => (
        <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 4px", borderBottom: i < done.length - 1 ? "1px solid var(--mist)" : "none" }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: "#10B9811F", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.CheckCircle size={15} color="#10B981"/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.name}</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{a.sub}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>{a.score}</div>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 6px", background: `${a.chipColor}1A`, color: a.chipColor, borderRadius: 4 }}>{a.chip}</span>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ height: 28, fontSize: 11.5, padding: "0 12px" }}>View</button>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TAB 6 — Growth
═══════════════════════════════════════════════════════════════ */
function Sp2GradesView({ course }) {
  const cats = [
    { name: "Assignments",    weight: 40, score: 90, color: "#EF4444" },
    { name: "Quizzes",        weight: 30, score: 85, color: "#F87171" },
    { name: "Participation",  weight: 20, score: 92, color: "#10B981" },
    { name: "Pronunciation",  weight: 10, score: 78, color: "#F59E0B", weak: true },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Top: grade donut + course progress */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 260px 1fr", gap: 14 }}>
        {/* Current Grade donut */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Current Grade</div>
          <Sp2Donut value={88} color="#EF4444" size={140}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>88<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#EF4444" }}>B+</div>
            </div>
          </Sp2Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>Current Grade</div>
        </div>

        {/* Course Progress donut */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Course Progress</div>
          <Sp2Donut value={55} color="#EF4444" size={140}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>55<span style={{ fontSize: 18 }}>%</span></div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#EF4444" }}>Unit 3 of 5</div>
            </div>
          </Sp2Donut>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>11 of 20 lessons complete</div>
        </div>

        {/* Grade breakdown bars */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Grade Breakdown</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {cats.map(cat => (
              <div key={cat.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
                    {cat.name} <span style={{ color: "var(--silver)", fontWeight: 500 }}>· {cat.weight}% of grade</span>
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: cat.color }}>{cat.score}%</span>
                </div>
                <ProgressBar value={cat.score} color={cat.color} height={6}/>
                {cat.weak && <div style={{ fontSize: 11, color: "#F59E0B", marginTop: 3, fontWeight: 500 }}>↓ focus area</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ways to Improve + Teacher Feedback side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <Sp2WaysToImprove course={course}/>
        <Sp2TeacherFeedback course={course}/>
      </div>
    </div>
  );
}

/* ─────────── Donut SVG ─────────── */
function Sp2Donut({ value, color, size, children }) {
  const r = size * 0.38;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const filled = (value / 100) * circ;
  const strokeW = size * 0.09;

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ display: "block" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#F1F5F9" strokeWidth={strokeW}/>
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke={color} strokeWidth={strokeW}
          strokeDasharray={`${filled} ${circ - filled}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
    </div>
  );
}

/* ─────────── Ways to Improve ─────────── */
function Sp2WaysToImprove({ course }) {
  const items = [
    { label: "REVIEW",          color: "#0EA5E9", icon: "BookOpen",    title: "Pronunciation is your weakest area — 3 targeted exercises" },
    { label: "PRACTICE QUIZ",   color: "#8B5CF6", icon: "Notes",       title: "Reflexive verbs — adaptive 15-question set" },
    { label: "STUDY SESSION",   color: "#F59E0B", icon: "Star",        title: "Sra. Martinez recommends: record yourself reading Lección 3.3 aloud" },
    { label: "LANGUAGE TUTOR",  color: "#EF4444", icon: "Sparkle",     title: "You've asked about ser vs. estar twice — a focused review may help" },
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg, #FEF2F2 0%, #EF444410 100%)",
      borderRadius: 14, padding: "18px 22px",
      border: "1px solid #EF444425",
      boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg, #F87171, #EF4444)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Sparkle size={15} color="#fff"/>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Ways to Improve</h2>
            <span style={{ fontSize: 9, padding: "2px 6px", background: "#FEE2E2", color: "#B91C1C", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>AI</span>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Personalized to your Spanish II progress</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map((it, i) => {
          const Icon = I[it.icon];
          return (
            <div key={i} style={{
              background: "var(--paper)", borderRadius: 12, padding: "12px 14px",
              border: "1px solid var(--mist)",
              display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: `${it.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={15} color={it.color}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontSize: 9.5, padding: "1px 6px", background: `${it.color}1A`, color: it.color, borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>{it.label}</span>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", marginTop: 5, lineHeight: 1.35 }}>{it.title}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────── Teacher Feedback ─────────── */
function Sp2TeacherFeedback({ course }) {
  const items = [
    {
      on: "Reflexive Verbs Writing Draft",
      onMeta: "In Progress",
      tone: "neutral",
      msg: "Tu estructura es buena — enfócate en la concordancia / Your structure is good — focus on agreement",
      time: "today",
    },
    {
      on: "Pronunciation Recording",
      onMeta: "Submitted Oct 20",
      tone: "growth",
      msg: "La 'r' y la 'rr' necesitan más práctica / The 'r' and 'rr' sounds need more practice",
      time: "3 days ago",
    },
    {
      on: "Diálogo Response",
      onMeta: "18/20",
      tone: "praise",
      msg: "Excelente comprensión del contexto / Excellent contextual understanding",
      time: "1 week ago",
    },
  ];

  const toneStyle = (tone) => ({
    praise:  { color: "#10B981", label: "PRAISE" },
    growth:  { color: "#F59E0B", label: "GROWTH AREA" },
    neutral: { color: "#0EA5E9", label: "NOTE" },
  }[tone]);

  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>SM</span>
          </div>
          <div>
            <h2 className="t-h3" style={{ fontSize: 14, margin: 0 }}>Teacher Feedback</h2>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Recent comments from Sra. Martinez</div>
          </div>
        </div>
        <a href="#" style={{ fontSize: 11.5, color: course.color, textDecoration: "none", fontWeight: 600 }}>View all →</a>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((f, i) => {
          const t = toneStyle(f.tone);
          return (
            <div key={i} style={{
              padding: "12px 14px",
              background: "var(--bone)", borderRadius: 10,
              borderLeft: `3px solid #EF4444`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{f.on}</span>
                <span style={{ fontSize: 10.5, color: "var(--silver)" }}>{f.onMeta}</span>
                <span style={{ fontSize: 9.5, padding: "1px 6px", background: `${t.color}1A`, color: t.color, borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>{t.label}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.5 }}>{f.msg}</div>
              <div style={{ fontSize: 10.5, color: "var(--silver)", marginTop: 6 }}>{f.time}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

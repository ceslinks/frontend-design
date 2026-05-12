// LINKS — My Classes (overview + class detail with Modules/Lesson sub-views)

const ClassesData = {
  algebra2: {
    id: "algebra2", name: "Algebra II", teacher: "Mr. David Wilson", teacherShort: "Mr. Wilson",
    period: "Period 1", room: "Virtual",
    color: "#8B5CF6", icon: "Calculator2", abbr: "x²",
    progress: 75, status: "LIVE NOW", subtitle: "Quadratic Functions",
    nextDue: { name: "Linear Functions Quiz", at: "Due Today, 11:59 PM" },
    topic: "Quadratic Functions",
    sessionLine: "9:00 AM–9:50 AM · Virtual",
    ctaLabel: "Join Virtual Class",
  },
  biology: {
    id: "biology", name: "Biology", teacher: "Mr. Evans", period: "Period 3",
    room: "Room 302", color: "#10B981", icon: "Atom", abbr: "🧬",
    progress: 82, status: "IN PERSON", subtitle: "Lab tomorrow — bring lab reports",
    nextDue: { name: "Cell Structure Quiz", at: "Due Today, 11:59 PM" },
    startsIn: "Starts in 15 min",
    topic: "Unit 4 · Cells & Energy",
    sessionLine: "Starts in 15 min · Room 302",
    sessionIcon: true,
    ctaLabel: "Join Class",
  },
  english10: {
    id: "english10", name: "English 10", teacher: "Mrs. Lee", period: "Period 4",
    room: "Room 210", color: "#0EA5E9", icon: "Book", abbr: "📖",
    progress: 68, status: "UPCOMING", subtitle: "Discussion: Argument Essay",
    schedule: "11:15 AM — 12:00 PM",
    topic: "Unit 2 · Argument & Persuasion",
    sessionLine: "11:15 AM–12:00 PM · Room 210",
    ctaLabel: "View Class",
  },
  ushistory: {
    id: "ushistory", name: "US History", teacher: "Mr. Rodriguez", period: "Period 5",
    room: "Room 105", color: "#F59E0B", icon: "Globe", abbr: "🏛",
    progress: 71, status: "IN PERSON",
    schedule: "1:10 PM — 1:55 PM",
    topic: "Unit 3 · The Industrial Revolution",
    sessionLine: "1:10 PM–1:55 PM · Room 105",
    ctaLabel: "View Details",
    ctaStyle: "outlined",
  },
  spanish: {
    id: "spanish", name: "Spanish II", teacher: "Sra. Martinez", teacherShort: "Sra. Martinez",
    period: "Directed Study", room: "Virtual",
    color: "#EF4444", icon: "Globe", abbr: "🇪🇸",
    progress: 88, status: "DIRECTED STUDY", subtitle: "Unidad 3 · La Vida Cotidiana",
    nextDue: { name: "Reflexive Verbs Writing", at: "Due Thursday" },
    topic: "Unidad 3 · La Vida Cotidiana",
    sessionLine: "Next check-in: Thu · 2:00 PM",
    ctaLabel: "Open Study Plan",
  },
};
window.ClassesData = ClassesData;

/* ─────────── Page wrapper ─────────── */

function MyClassesPage({ subRoute }) {
  // subRoute: { kind: "overview" } | { kind: "class", classId } | { kind: "lesson", classId, lessonId } | { kind: "live", classId } | { kind: "quiz", classId, state }
  if (subRoute.kind === "live") return <window.LiveClassPage classId={subRoute.classId}/>;
  if (subRoute.kind === "lesson") return <window.LessonDetailPage classId={subRoute.classId} lessonId={subRoute.lessonId}/>;
  if (subRoute.kind === "quiz") return <window.QuizPage classId={subRoute.classId} state={subRoute.state}/>;
  if (subRoute.kind === "class") return <ClassDetail classId={subRoute.classId}/>;
  return <ClassesOverview/>;
}
window.MyClassesPage = MyClassesPage;

/* ─────────── Overview ─────────── */

function ClassesOverview() {
  const [showAllClasses, setShowAllClasses] = React.useState(false);
  const [listView, setListView] = React.useState(false);
  const [helpClass, setHelpClass] = React.useState(null);
  const [customizeOpen, setCustomizeOpen] = React.useState(false);
  const [activityTab, setActivityTab] = React.useState(0); // 0=Alerts, 1=Activity
  const [sections, setSections] = React.useState({ activity: true, assignments: true, today: true, glance: true });
  const toggleSection = (key) => setSections((s) => ({ ...s, [key]: !s[key] }));
  const custRef = React.useRef(null);
  React.useEffect(() => {
    if (!customizeOpen) return;
    const handler = (e) => { if (custRef.current && !custRef.current.contains(e.target)) setCustomizeOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [customizeOpen]);
  const visibleColCount = [sections.activity, sections.assignments, sections.today].filter(Boolean).length;
  const colTemplate = visibleColCount === 3 ? "1.05fr 1fr 1fr" : visibleColCount === 2 ? "1fr 1fr" : "1fr";
  return (
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
      {helpClass && <ExtraHelpModal classId={helpClass} onClose={() => setHelpClass(null)}/>}
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ flex: 1 }}>
          <h1 className="t-h1" style={{ fontSize: 26, margin: "0 0 4px" }}>My Classes</h1>
          <div className="t-body" style={{ color: "var(--stone)" }}>Everything happening in your classes, all in one place.</div>
        </div>
        <div ref={custRef} style={{ position: "relative" }}>
          <button className="btn btn-secondary btn-sm" style={{ height: 32 }} onClick={() => setCustomizeOpen((v) => !v)}>
            <I.Sparkle size={13} color="var(--student)"/> Customize
          </button>
          {customizeOpen && <CustomizePanel sections={sections} onToggle={toggleSection}/>}
        </div>
        <div style={{ display: "flex", gap: 2, padding: 3, background: "var(--bone)", borderRadius: 8 }}>
          <button onClick={() => setListView(false)} style={{ padding: 6, background: !listView ? "var(--paper)" : "transparent", border: "none", borderRadius: 6, cursor: "pointer", boxShadow: !listView ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}><I.GridView size={14} color={!listView ? "var(--student)" : "var(--stone)"}/></button>
          <button onClick={() => setListView(true)}  style={{ padding: 6, background: listView  ? "var(--paper)" : "transparent", border: "none", borderRadius: 6, cursor: "pointer", boxShadow: listView  ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}><I.ListView size={14} color={listView  ? "var(--student)" : "var(--stone)"}/></button>
        </div>
      </div>

      {/* Class cards / list */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <h2 className="t-h2" style={{ fontSize: 16, margin: 0 }}>Your Classes</h2>
          {!listView && (
            <a href="#" onClick={(e) => { e.preventDefault(); setShowAllClasses((v) => !v); }} style={{ fontSize: 12.5, color: "var(--student)", textDecoration: "none", fontWeight: 600 }}>
              {showAllClasses ? "Show less" : "See all classes"}
            </a>
          )}
        </div>
        {listView ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {Object.values(ClassesData).map((c) => <ClassRow key={c.id} c={c} onRequestHelp={setHelpClass}/>)}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: showAllClasses ? "repeat(auto-fill, minmax(280px, 1fr))" : "repeat(5, 1fr)", gap: 12 }}>
            {Object.values(ClassesData).map((c) => <ClassCard key={c.id} c={c} onRequestHelp={setHelpClass}/>)}
          </div>
        )}
      </div>

      {/* At a glance */}
      {sections.glance && (
        <Card>
          <CardHeader title="At a Glance"/>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            <Glance icon="Calendar" color="#10B981" value="16" label="Days of school left" sub="Keep pushing!"/>
            <Glance icon="Trophy" color="#0EA5E9" value="3.72" label="GPA" sub="↑ 0.15"/>
            <Glance icon="Trophy" color="#F59E0B" value="You're on track!" label="All 5 classes passing" sub="Keep up the great work" wide/>
            <Glance icon="Flame" color="#F97316" value="12" label="Day Streak" streak/>
          </div>
        </Card>
      )}

      {/* Three-column body */}
      {visibleColCount > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: colTemplate, gap: 14 }}>
          {/* Recent activity */}
          {sections.activity && (
            <Card>
              <CardHeader title="Recent Activity"/>
              <Tabs items={["Alerts", "Activity"]} active={activityTab} onChange={setActivityTab}/>
              {activityTab === 0 && (
                <>
                  <AlertRow border="#EF4444" icon="Bell" iconColor="#EF4444" title="Quadratic Functions Worksheet · Algebra II" sub="Was due today at 11:59 PM" time="Just now"/>
                  <AlertRow border="#EF4444" icon="Bell" iconColor="#EF4444" title="Cell Structure Quiz · Biology" sub="Due tonight at 11:59 PM" time="In 4 hours"/>
                  <AlertRow border="#F59E0B" icon="Bell" iconColor="#F59E0B" title="Lab reports + safety goggles · Biology" sub="Bring tomorrow" time="From Mr. Evans"/>
                  <AlertRow border="#0EA5E9" icon="Calendar" iconColor="#0EA5E9" title="Industrial Revolution DBQ · US History" sub="Due in 3 days" time="Oct 18"/>
                </>
              )}
              {activityTab === 1 && (
                <>
                  <ActivityRow color="#8B5CF6" icon="Document" who="Mr. Carter" what="posted a new assignment in" target="Algebra II" detail="Quadratic Functions Worksheet" time="15 min ago"/>
                  <ActivityRow color="#10B981" icon="Bell" who="Mr. Evans" what="posted an announcement in" target="Biology" detail="Lab tomorrow — bring your lab reports" time="1 hour ago"/>
                  <ActivityRow color="#0EA5E9" icon="MessageCircle" who="Mrs. Lee" what="replied to your comment in" target="English 10" detail={'"Great insight on the theme!"'} time="2 hours ago"/>
                  <ActivityRow color="#F59E0B" icon="Document" who="" what="New assignment in" target="US History" detail="The Industrial Revolution DBQ" time="3 hours ago"/>
                  <ActivityRow color="#EF4444" icon="MessageCircle" who="Sra. Martinez" what="sent a message in" target="Spanish II" detail="Don't forget the speaking activity!" time="Yesterday"/>
                  <a href="#" style={{ display: "block", padding: "8px 0 0", fontSize: 12.5, color: "var(--student)", textAlign: "center", textDecoration: "none", fontWeight: 600 }}>View all activity →</a>
                </>
              )}
            </Card>
          )}

          {/* Assignments */}
          {sections.assignments && <AssignmentsPanel/>}

          {/* Today */}
          {sections.today && (
            <Card>
              <CardHeader title="Today" right={<a href="#" style={{ fontSize: 12, color: "var(--student)", textDecoration: "none", fontWeight: 600 }}>View Calendar</a>}/>
              <ScheduleRow time="9:00 AM" color="#8B5CF6" name="Algebra II (LIVE)" sub="Ms. Carter" tag="LIVE NOW" tagColor="#EF4444" cta="Join"/>
              <ScheduleRow time="10:20 AM" color="#10B981" name="Biology" sub="Room 302" tag="15 min" tagColor="#F59E0B"/>
              <ScheduleRow time="11:15 AM" color="#0EA5E9" name="English 10" sub="Mrs. Lee · Room 210" subRight="50 min"/>
              <ScheduleRow time="1:10 PM" color="#F59E0B" name="US History (In Person)" sub="Mr. Rodriguez · Room 105" subRight="1h 45m"/>
              <ScheduleRow time="2:00 PM" color="#EF4444" name="Spanish II (LIVE)" sub="Sra. Martinez" subRight="2h 35m"/>
              <a href="#" style={{ display: "block", padding: "10px 0 0", fontSize: 12.5, color: "var(--student)", textAlign: "center", textDecoration: "none", fontWeight: 600 }}>View full schedule →</a>

              <hr style={{ border: "none", borderTop: "1px solid var(--mist)", margin: "14px 0 12px" }}/>
              {/* AI Coach card */}
              <div style={{
                background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.05))",
                borderRadius: 14, padding: "12px 14px",
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{ flexShrink: 0 }}><Robot size={56} mood="happy" waving/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--student-deep)", marginBottom: 4 }}>AI Coach</div>
                  <div style={{ fontSize: 11.5, color: "var(--slate)", marginBottom: 6, fontWeight: 500 }}>Here's what I found for you today.</div>
                  <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 11.5, color: "var(--slate)", lineHeight: 1.6 }}>
                    <li>You have <b>2 assignments</b> due today.</li>
                    <li>Algebra II: Consider reviewing vertex form examples.</li>
                    <li>Biology: 3 classmates also working on the quiz.</li>
                  </ul>
                  <a href="#" style={{ display: "inline-block", marginTop: 6, fontSize: 11.5, color: "var(--student)", fontWeight: 600, textDecoration: "none" }}>View all AI suggestions →</a>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

    </div>
  );
}

const chevBtn = {
  display: "inline-flex", alignItems: "center", gap: 4,
  padding: "4px 8px", background: "var(--bone)",
  border: "none", borderRadius: 6,
  fontSize: 11.5, color: "var(--stone)", fontWeight: 500, cursor: "pointer",
};

/* ─────────── Customize panel ─────────── */
function CustomizePanel({ sections, onToggle }) {
  const items = [
    { key: "activity",    label: "Recent Activity" },
    { key: "assignments", label: "Assignments" },
    { key: "today",       label: "Today" },
    { key: "glance",      label: "At a Glance" },
  ];
  return (
    <div style={{
      position: "absolute", top: "calc(100% + 6px)", right: 0,
      width: 220,
      background: "var(--paper)",
      borderRadius: 14,
      boxShadow: "var(--shadow-card)",
      border: "1px solid var(--mist)",
      zIndex: 200,
      overflow: "hidden",
    }}>
      <div style={{
        padding: "10px 14px 8px",
        fontSize: 10.5, fontWeight: 700, color: "var(--stone)",
        letterSpacing: "0.07em", textTransform: "uppercase",
        borderBottom: "1px solid var(--mist)",
      }}>Dashboard Sections</div>
      {items.map(({ key, label }) => (
        <label key={key}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", background: "transparent", transition: "background 80ms" }}
          onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
        >
          <input
            type="checkbox"
            checked={sections[key]}
            onChange={() => onToggle(key)}
            style={{ width: 14, height: 14, accentColor: "var(--student)", cursor: "pointer", flexShrink: 0 }}
          />
          <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{label}</span>
        </label>
      ))}
    </div>
  );
}

/* ─────────── Extra Help Request modal ─────────── */
function ExtraHelpModal({ classId, onClose }) {
  const cls = ClassesData[classId];
  const [helpType, setHelpType] = React.useState("");
  const [note, setNote] = React.useState("");
  const MAX = 300;

  const fieldStyle = {
    display: "block", width: "100%", boxSizing: "border-box",
    background: "var(--bone)", border: "1px solid var(--mist)",
    borderRadius: 10, padding: "9px 12px",
    fontSize: 13, color: "var(--ink)", fontFamily: "inherit",
    outline: "none", appearance: "none",
  };
  const labelStyle = {
    display: "block", fontSize: 12, fontWeight: 600,
    color: "var(--slate)", marginBottom: 6, marginTop: 16,
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div style={{
        background: "var(--paper)", borderRadius: 14,
        padding: "26px 28px 24px", width: 420,
        maxWidth: "calc(100vw - 32px)",
        boxShadow: "var(--shadow-card)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "var(--ink)", fontFamily: "Poppins, sans-serif" }}>Request Extra Help</h3>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 8, border: "none",
            background: "var(--bone)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}><I.X size={14} color="var(--stone)"/></button>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginBottom: 4 }}>Your teacher will follow up to confirm a time.</div>

        <label style={labelStyle}>Class</label>
        <div style={{ ...fieldStyle, color: "var(--slate)", cursor: "default" }}>
          {cls ? `${cls.name} — ${cls.teacher}` : classId}
        </div>

        <label style={labelStyle}>Type of help</label>
        <select value={helpType} onChange={(e) => setHelpType(e.target.value)} style={fieldStyle}>
          <option value="" disabled>Select...</option>
          <option value="before">Before school</option>
          <option value="after">After school</option>
          <option value="lunch">During lunch</option>
          <option value="online">Online session</option>
        </select>

        <label style={labelStyle}>What do you need help with?</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, MAX))}
          placeholder="Briefly describe what you are struggling with..."
          rows={3}
          style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.5 }}
        />
        <div style={{ fontSize: 11, color: note.length >= MAX ? "#EF4444" : "var(--silver)", textAlign: "right", marginTop: 4 }}>
          {note.length} / {MAX}
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 20, justifyContent: "flex-end", alignItems: "center" }}>
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }} style={{
            fontSize: 13, fontWeight: 600, color: "var(--stone)", textDecoration: "none",
          }}>Cancel</a>
          <button
            onClick={onClose}
            disabled={!helpType}
            style={{
              padding: "0 20px", height: 36, borderRadius: 10,
              border: "none",
              background: helpType ? "var(--student)" : "var(--mist)",
              fontSize: 13, fontWeight: 600,
              color: helpType ? "#fff" : "var(--stone)",
              cursor: helpType ? "pointer" : "default", fontFamily: "inherit",
            }}
          >Submit request</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Class row (list view) ─────────── */
function ClassRow({ c, onRequestHelp }) {
  const live = c.status === "LIVE NOW" || c.status === "LIVE";
  const sessionLine = c.startsIn || c.schedule || (live ? "Live now" : c.subtitle) || "";
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "var(--paper)", borderRadius: 10,
      padding: "10px 14px",
      boxShadow: "var(--shadow-card)",
      border: live ? `1.5px solid ${c.color}40` : "1px solid var(--mist)",
    }}>
      <div style={{ width: 4, alignSelf: "stretch", borderRadius: 2, background: c.color, flexShrink: 0 }}/>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: c.color }}>{c.abbr}</span>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{c.name}</div>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>{c.teacher}</div>
      </div>
      <div style={{ fontSize: 12, color: "var(--slate)", fontWeight: 500, minWidth: 140, textAlign: "right" }}>{sessionLine}</div>
      <span style={{
        fontSize: 9, fontWeight: 700, padding: "2px 6px", flexShrink: 0,
        background: live ? "#EF4444" : (c.status === "IN PERSON" ? "#10B981" : "#94A3B8"),
        color: "#fff", borderRadius: 4, letterSpacing: "0.04em",
      }}>{c.status}</span>
      {live ? (
        <a href={`#/my-classes/${c.id}/live`} className="btn btn-primary btn-sm" style={{ height: 28, padding: "0 14px", fontSize: 11.5, textDecoration: "none", flexShrink: 0 }}>
          <I.Camera size={11} color="#fff"/> Join
        </a>
      ) : (
        <a href={`#/my-classes/${c.id}`} className="btn btn-secondary btn-sm" style={{ height: 28, padding: "0 14px", fontSize: 11.5, textDecoration: "none", flexShrink: 0 }}>View</a>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); onRequestHelp(c.id); }}
        style={{ background: "none", border: "none", padding: 0, fontSize: 11, fontWeight: 600, color: "var(--student)", cursor: "pointer", flexShrink: 0, opacity: 0.8 }}
      >Request Help</button>
    </div>
  );
}

/* ─────────── Class card (overview grid) ─────────── */
function ClassCard({ c, onRequestHelp }) {
  const live = c.status === "LIVE NOW" || c.status === "LIVE";
  const badgeColor = (live || c.status === "DIRECTED STUDY") ? "#EF4444"
    : c.status === "IN PERSON" ? "#10B981"
    : "#94A3B8";
  return (
    <a href={`#/my-classes/${c.id}`} style={{
      display: "flex", flexDirection: "column", textDecoration: "none",
      background: live ? `linear-gradient(135deg, ${c.color}1A, ${c.color}10)` : "var(--paper)",
      borderRadius: 14,
      padding: "14px 14px 12px",
      boxShadow: "var(--shadow-card)",
      border: live ? `1.5px solid ${c.color}40` : "1px solid var(--mist)",
      cursor: "pointer",
    }}>
      {/* Row 1: avatar + name/teacher + status badge */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: c.color }}>{c.abbr}</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{c.name}</div>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>{c.teacher}</div>
        </div>
        {live && (
          <span style={{
            fontSize: 9, fontWeight: 700, padding: "2px 6px",
            background: badgeColor, color: "#fff", borderRadius: 4,
            letterSpacing: "0.04em", flexShrink: 0, whiteSpace: "nowrap",
          }}>{c.status}</span>
        )}
      </div>

      {/* Row 2: current topic/unit */}
      <div style={{ fontSize: 13, color: "var(--slate)", fontWeight: 500, marginBottom: 6, lineHeight: 1.3 }}>
        {c.topic}
      </div>

      {/* Row 3: session info */}
      <div style={{ fontSize: 12, color: c.color, fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 4 }}>
        {c.sessionIcon && <I.MapPin size={11} color={c.color}/>}
        {c.sessionLine}
      </div>

      {/* Row 4: CTA button */}
      <button
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", height: 30, marginBottom: 8, borderRadius: 8,
          fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          ...(c.ctaStyle === "outlined"
            ? { background: "none", border: `1.5px solid ${c.color}`, color: c.color }
            : { background: c.color, border: "none", color: "#fff" }
          ),
        }}
      >{c.ctaLabel}</button>

      {/* Row 5: progress bar */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: "var(--silver)", marginBottom: 4, fontWeight: 600, letterSpacing: "0.04em" }}>{c.progress}% Course Progress</div>
        <ProgressBar value={c.progress} color={c.color} height={4}/>
      </div>

      {/* Row 6: Request Help */}
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onRequestHelp(c.id); }}
        style={{
          display: "block", width: "100%", marginTop: 10,
          background: "none", border: "none", padding: 0,
          fontSize: 11.5, fontWeight: 600, color: "var(--student)",
          cursor: "pointer", textAlign: "center", fontFamily: "inherit",
          opacity: 0.85,
        }}
      >Request Help</button>
    </a>
  );
}

/* ─────────── Reusable bits ─────────── */

function Card({ children, padding = "16px 18px" }) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding, boxShadow: "var(--shadow-card)" }}>
      {children}
    </div>
  );
}
function CardHeader({ title, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
      <h3 className="t-h3" style={{ fontSize: 14, margin: 0, fontWeight: 700 }}>{title}</h3>
      {right}
    </div>
  );
}
function Tabs({ items, active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 10, borderBottom: "1px solid var(--mist)" }}>
      {items.map((it, i) => (
        <button key={i} onClick={() => onChange && onChange(i)} style={{
          padding: "6px 0",
          fontSize: 12, fontWeight: i === active ? 600 : 500,
          color: i === active ? "var(--student)" : "var(--stone)",
          border: "none", background: "transparent", cursor: "pointer",
          borderBottom: i === active ? "2px solid var(--student)" : "2px solid transparent",
          marginBottom: -1,
        }}>{it}</button>
      ))}
    </div>
  );
}

function AssignmentsPanel() {
  const [tab, setTab] = React.useState(0);
  return (
    <Card>
      <CardHeader title="Assignments"/>
      <Tabs items={["Due Today (2)", "Due This Week (5)", "Recently Graded"]} active={tab} onChange={setTab}/>
      {tab !== 2 && <>
        <AssignmentRow color="#EF4444" icon="Sparkle" name="Quadratic Functions Worksheet" sub="Algebra II · Mr. Carter" due="Due Today" time="11:59 PM" priority="Medium" priorityColor="#F59E0B"/>
        <AssignmentRow color="#10B981" icon="Atom" name="Cell Structure Quiz" sub="Biology · Mr. Evans" due="Due Today" time="11:59 PM" priority="High" priorityColor="#EF4444"/>
      </>}
      {tab === 2 && <>
        <AssignmentRow color="#8B5CF6" icon="Sparkle" name="Quadratic Functions — Quiz 2"  sub="Algebra II · Mr. Carter"  due="88/100 · A−" dueColor="#10B981" time="Graded Oct 18" viewBtn/>
        <AssignmentRow color="#10B981" icon="Atom"    name="Cell Structure Diagram"         sub="Biology · Mr. Evans"     due="47/50 · 94%" dueColor="#10B981" time="Graded Oct 16" viewBtn/>
        <AssignmentRow color="#0EA5E9" icon="Book"    name="Argument Essay — Draft 1"       sub="English 10 · Mrs. Lee"   due="41/50 · 82%" dueColor="#10B981" time="Graded Oct 14" viewBtn/>
      </>}
      <a href="#" style={{ display: "block", padding: "10px 0 0", fontSize: 12.5, color: "var(--student)", textAlign: "center", textDecoration: "none", fontWeight: 600 }}>View all assignments →</a>
    </Card>
  );
}

function AlertRow({ border, icon, iconColor, title, sub, time }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", marginBottom: 4, borderRadius: 8, borderLeft: `3px solid ${border}`, background: `${border}08` }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: `${iconColor}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={13} color={iconColor}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 1 }}>{sub}</div>
      </div>
      <div style={{ fontSize: 11, color: "var(--stone)", whiteSpace: "nowrap", flexShrink: 0 }}>{time}</div>
    </div>
  );
}

function ActivityRow({ color, icon, who, what, target, detail, time }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", gap: 10, padding: "8px 0" }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={13} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.45 }}>
          {who && <span style={{ fontWeight: 600, color: "var(--ink)" }}>{who} </span>}
          <span>{what} </span>
          <span style={{ color: color, fontWeight: 600 }}>{target}</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500, marginTop: 1 }}>{detail}</div>
        <div style={{ fontSize: 10.5, color: "var(--silver)", marginTop: 2 }}>{time}</div>
      </div>
    </div>
  );
}

function AssignmentRow({ color, icon, name, sub, due, time, priority, priorityColor, dueColor, viewBtn }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px dashed var(--mist)" }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={14} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>{sub}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 11, color: dueColor || "#EF4444", fontWeight: 600 }}>{due}</div>
        <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{time}</div>
        {viewBtn ? (
          <a href="#" style={{ display: "inline-block", marginTop: 3, fontSize: 10.5, fontWeight: 600, color: "var(--student)", textDecoration: "none" }}>View →</a>
        ) : priority && (
          <span style={{
            fontSize: 9.5, padding: "1px 6px",
            background: `${priorityColor}1A`, color: priorityColor,
            borderRadius: 3, fontWeight: 700, marginTop: 2, display: "inline-block",
          }}>{priority}</span>
        )}
      </div>
    </div>
  );
}

function UpcomingRow({ color, icon, name, sub, tag, tagColor, cta, muted }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={13} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
          {name}
          {tag && <span style={{ marginLeft: 6, fontSize: 9, padding: "1px 6px", background: tagColor, color: "#fff", borderRadius: 3, fontWeight: 700, letterSpacing: "0.03em" }}>{tag}</span>}
        </div>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>{sub}</div>
      </div>
      <button className={muted ? "btn btn-secondary btn-sm" : "btn btn-primary btn-sm"} style={{ height: 26, fontSize: 11, padding: "0 10px" }}>{cta}</button>
    </div>
  );
}

function ScheduleRow({ time, color, name, sub, subRight, tag, tagColor, cta }) {
  return (
    <div style={{ display: "flex", gap: 10, padding: "8px 0", alignItems: "flex-start" }}>
      <div style={{ width: 56, fontSize: 11, color: "var(--stone)", fontWeight: 600, flexShrink: 0, paddingTop: 2 }}>{time}</div>
      <div style={{ width: 4, alignSelf: "stretch", borderRadius: 2, background: color, flexShrink: 0 }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
          {name}
          {tag && <span style={{ marginLeft: 6, fontSize: 9, padding: "1px 6px", background: tagColor, color: "#fff", borderRadius: 3, fontWeight: 700, letterSpacing: "0.03em" }}>{tag}</span>}
        </div>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>{sub}</div>
      </div>
      {cta && <button className="btn btn-primary btn-sm" style={{ height: 26, fontSize: 11, padding: "0 10px" }}>{cta}</button>}
      {subRight && <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 500 }}>{subRight}</div>}
    </div>
  );
}

function Glance({ icon, color, value, label, sub, wide, streak }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "var(--bone)", borderRadius: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: wide ? 15 : 22, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1 }}>{value}</div>
        {label && <div style={{ fontSize: 11.5, color: "var(--stone)", fontWeight: 500 }}>{label}</div>}
        {sub && <div style={{ fontSize: 11, color: "var(--silver)" }}>{sub}</div>}
        {streak && <div style={{ fontSize: 12, marginTop: 1 }}>3 badges earned · <a href="#" style={{ color: "var(--student)", fontWeight: 600, textDecoration: "none" }}>View all →</a></div>}
      </div>
    </div>
  );
}

window.ClassesOverview = ClassesOverview;
window.AssignmentRow = AssignmentRow;
window.ScheduleRow = ScheduleRow;
window.ClassesCard = Card;
window.ClassesCardHeader = CardHeader;
window.ClassesProgressBar = ProgressBar;

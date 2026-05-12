// LINKS Curriculum Builder — Calendar canvas (variation B)

function CBCalendar({ selectedLessonId, onSelectLesson, showStandards }) {
  // Build a 12-week grid. Each lesson lands in the unit's week range.
  // Map units to week starts: u1=wk1, u2=wk4, u3=wk7, u4=wk10
  const unitWeekStart = { u1: 1, u2: 4, u3: 7, u4: 10 };
  const weeks = Array.from({ length: 12 }, (_, i) => {
    const num = i + 1;
    const startDay = new Date(2026, 0, 12 + i * 7); // Jan 12, 2026 = wk1 Mon
    return {
      num,
      label: `Week ${num}`,
      dates: `${startDay.toLocaleDateString("en", { month: "short", day: "numeric" })} – ${new Date(startDay.getTime() + 4 * 86400000).toLocaleDateString("en", { month: "short", day: "numeric" })}`,
    };
  });

  // Place lessons into a [week][dayIdx] grid. Day index: 0=Mon..4=Fri.
  const grid = Array.from({ length: 12 }, () => [null, null, null, null, null]);
  const dayIdxFromLabel = (day) => {
    if (day.startsWith("Mon")) return 0;
    if (day.startsWith("Tue")) return 1;
    if (day.startsWith("Wed")) return 2;
    if (day.startsWith("Thu")) return 3;
    if (day.startsWith("Fri")) return 4;
    return 0;
  };

  CB_UNITS.forEach((unit) => {
    const baseWeek = unitWeekStart[unit.id];
    let cursor = 0; // running offset in days within the unit
    unit.lessons.forEach((lesson) => {
      const dayIdx = dayIdxFromLabel(lesson.day);
      // Walk forward from baseWeek until we find an empty slot at dayIdx
      let week = baseWeek + Math.floor(cursor / 5);
      while (week <= 12 && grid[week - 1][dayIdx] != null) {
        week += 1;
      }
      if (week <= 12) {
        grid[week - 1][dayIdx] = { ...lesson, unit };
        cursor = (week - baseWeek) * 5 + dayIdx + 1;
      }
    });
  });

  return (
    <>
      {/* Course banner */}
      <div className="cb-course-header">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="h-eyebrow">{CB_COURSE.code} · {CB_COURSE.term}</div>
          <h1>{CB_COURSE.title}</h1>
          <div className="h-meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <I.Calendar size={13} color="rgba(255,255,255,0.78)"/>
              Term begins Mon, Jan 12 · ends Fri, Mar 27
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <I.Clock size={13} color="rgba(255,255,255,0.78)"/>
              60 instructional days · 4 holidays
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <div className="h-stat">
            <div className="num">28/60</div>
            <div className="lbl">Days planned</div>
          </div>
          <div className="h-stat">
            <div className="num">12</div>
            <div className="lbl">Weeks</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="cb-outline-toolbar">
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button className="btn btn-sm">
            <I.ChevronLeft size={13} color="var(--stone)"/>
            Term 1
          </button>
          <button className="btn btn-sm" style={{ background: "var(--instructor-soft)", borderColor: "var(--instructor-200)", color: "var(--instructor-deep)", fontWeight: 600 }}>
            Term 2 · Spring
          </button>
          <button className="btn btn-sm">
            Term 3
            <I.ChevronRight size={13} color="var(--stone)"/>
          </button>
        </div>
        <div className="spacer"/>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11, color: "var(--stone)" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#2E9B62" }}/> Lab
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#6D28D9" }}/> Workshop
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#E07A2D" }}/> Discussion
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: "#C0392B" }}/> Assessment
          </span>
        </div>
        <button className="btn btn-sm btn-primary">
          <I.Plus size={13} color="#fff"/>
          Add lesson
        </button>
      </div>

      {/* Calendar grid */}
      <div className="cb-calendar-grid">
        <div className="cb-cal-hdr"/>
        <div className="cb-cal-hdr">Monday</div>
        <div className="cb-cal-hdr">Tuesday</div>
        <div className="cb-cal-hdr">Wednesday</div>
        <div className="cb-cal-hdr">Thursday</div>
        <div className="cb-cal-hdr">Friday</div>

        {weeks.map((wk, wkIdx) => (
          <React.Fragment key={wk.num}>
            <div className="cb-cal-week-label">
              <span className="w-num">W{wk.num}</span>
              <span className="w-dates">{wk.dates}</span>
            </div>
            {grid[wkIdx].map((lesson, dayIdx) => {
              if (!lesson) {
                return <div key={dayIdx} className="cb-cal-cell empty"/>;
              }
              return (
                <div key={dayIdx} className="cb-cal-cell" style={{
                  background: lesson.unit.color + "0F", // ~6% tint
                }}>
                  <div
                    className={"cb-cal-card " + lesson.type + (lesson.id === selectedLessonId ? " active" : "")}
                    onClick={() => onSelectLesson(lesson.id)}
                  >
                    <div className="c-idx">{lesson.index} · {lesson.duration}m</div>
                    <div className="c-title">{lesson.title}</div>
                    <div className="c-meta">
                      <span className={"cb-type-pill " + lesson.type} style={{ fontSize: 9, padding: "1px 5px" }}>
                        {lesson.type}
                      </span>
                      <span className="cb-status-dot" style={{
                        background: lesson.status === "taught" ? "var(--success)" :
                                     lesson.status === "in-progress" ? "var(--warning)" :
                                     lesson.status === "draft" ? "var(--silver)" : "transparent",
                        border: lesson.status === "outline" ? "1px dashed var(--silver)" : "none",
                      }}/>
                    </div>
                    {showStandards && lesson.standards.length > 0 && (
                      <div style={{ marginTop: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
                        {lesson.standards.slice(0, 2).map((s) => (
                          <span key={s} className="cb-std-chip" style={{ fontSize: 8.5, padding: "1px 4px" }}>
                            {s.replace("NGSS ", "").replace("CCSS ", "")}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Helper */}
      <div style={{
        marginTop: 16, padding: "12px 16px",
        background: "var(--paper)", borderRadius: 10,
        border: "1px dashed var(--mist)",
        fontSize: 12.5, color: "var(--stone)",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <I.Lightbulb size={15} color="var(--instructor)"/>
        <span><strong style={{ color: "var(--ink)" }}>Tip · </strong>Drag lesson cards between cells to reschedule. Click a card to edit it on the right. Empty cells become drop zones when you drag.</span>
      </div>
    </>
  );
}

window.CBCalendar = CBCalendar;

// LINKS Curriculum Builder — Outline canvas (variation A: tree of units → lessons)

function CBOutline({ selectedLessonId, onSelectLesson, density, showStandards }) {
  const [collapsed, setCollapsed] = React.useState({});
  const toggle = (id) => setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  const statusDot = (status) => {
    const map = {
      taught: { c: "var(--success)", l: "Taught" },
      "in-progress": { c: "var(--warning)", l: "In progress" },
      draft: { c: "var(--silver)", l: "Draft" },
      outline: { c: "transparent", l: "Outline", border: "1px dashed var(--silver)" },
    };
    return map[status] || map.outline;
  };

  return (
    <>
      {/* Course banner */}
      <div className="cb-course-header">
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="h-eyebrow">{CB_COURSE.code} · {CB_COURSE.term}</div>
          <h1>{CB_COURSE.title}</h1>
          <div className="h-meta">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <I.User size={13} color="rgba(255,255,255,0.78)"/>
              {CB_COURSE.teacher}
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <I.Users size={13} color="rgba(255,255,255,0.78)"/>
              3 sections · 78 students
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <I.Calendar size={13} color="rgba(255,255,255,0.78)"/>
              12 weeks · 60 instructional days
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          <div className="h-stat"><div className="num">4</div><div className="lbl">Units</div></div>
          <div className="h-stat"><div className="num">22</div><div className="lbl">Lessons</div></div>
          <div className="h-stat"><div className="num">37%</div><div className="lbl">Complete</div></div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="cb-outline-toolbar">
        <div className="cb-search">
          <I.Search size={13} color="var(--stone)"/>
          <input placeholder="Search lessons, standards, materials…"/>
        </div>
        <button className="btn btn-sm">
          <I.Filter size={13} color="var(--stone)"/>
          Filter
        </button>
        <button className="btn btn-sm">
          <I.SortAsc size={13} color="var(--stone)"/>
          Sequence
        </button>
        <div className="spacer"/>
        <button className="btn btn-sm btn-ghost-ai">
          <I.Sparkles size={13} color="var(--instructor)"/>
          Generate unit
        </button>
        <button className="btn btn-sm">
          <I.Upload size={13} color="var(--stone)"/>
          Import
        </button>
        <button className="btn btn-sm btn-primary">
          <I.Plus size={13} color="#fff"/>
          Add unit
        </button>
      </div>

      {/* Units */}
      <div className={"cb-outline-list " + (density === "compact" ? "is-compact" : "")}>
        {CB_UNITS.map((unit) => {
          const isCollapsed = collapsed[unit.id];
          return (
            <div key={unit.id} className="cb-unit">
              <div className="cb-unit-hdr" style={{ borderLeft: `4px solid ${unit.color}` }}>
                <button className="cb-unit-toggle" onClick={() => toggle(unit.id)} aria-label="toggle unit">
                  {isCollapsed ? <I.ChevronRight size={13} color="var(--stone)"/> : <I.ChevronDown size={13} color="var(--stone)"/>}
                </button>
                <div className="cb-unit-title-block">
                  <div className="cb-unit-eyebrow">
                    <span>{unit.label}</span>
                    <span className="dot">·</span>
                    <span>{unit.weeks}</span>
                    <span className="dot">·</span>
                    <span>{unit.lessons.length} lessons</span>
                  </div>
                  <h3 className="cb-unit-title">{unit.title}</h3>
                  <p className="cb-unit-summary">{unit.summary}</p>
                </div>
                <div className="cb-unit-progress">
                  <div className="p-track"><div className="p-fill" style={{ width: `${unit.progress * 100}%`, background: unit.color }}/></div>
                  <div className="p-label">{Math.round(unit.progress * 100)}%</div>
                </div>
                <div className="cb-unit-actions">
                  <button className="icon-btn" title="AI generate"><I.Sparkles size={13} color="var(--instructor)"/></button>
                  <button className="icon-btn" title="More"><I.MoreHorizontal size={13} color="var(--stone)"/></button>
                </div>
              </div>

              {!isCollapsed && (
                <div className="cb-unit-lessons">
                  {unit.lessons.map((lesson) => {
                    const sd = statusDot(lesson.status);
                    return (
                      <button
                        key={lesson.id}
                        className={"cb-lesson-row" + (lesson.id === selectedLessonId ? " active" : "")}
                        onClick={() => onSelectLesson(lesson.id)}
                      >
                        <span className="cb-lesson-grip"><I.GripVertical size={11} color="var(--silver)"/></span>
                        <span className="cb-lesson-idx">{lesson.index}</span>
                        <span className="cb-status-dot" style={{ background: sd.c, border: sd.border || "none" }} title={sd.l}/>
                        <span className="cb-lesson-title">{lesson.title}</span>
                        <span className={"cb-type-pill " + lesson.type}>{lesson.type}</span>
                        {showStandards && (
                          <span className="cb-lesson-stds">
                            {lesson.standards.slice(0, 2).map((s) => (
                              <span key={s} className="cb-std-chip">{s.replace("NGSS ", "").replace("CCSS ", "")}</span>
                            ))}
                            {lesson.standards.length > 2 && <span className="cb-std-more">+{lesson.standards.length - 2}</span>}
                          </span>
                        )}
                        <span className="cb-lesson-meta">
                          <I.Clock size={11} color="var(--silver)"/>
                          <span>{lesson.duration}m</span>
                        </span>
                        <span className="cb-lesson-meta">
                          <I.Paperclip size={11} color="var(--silver)"/>
                          <span>{lesson.materials.length}</span>
                        </span>
                        <span className="cb-lesson-day">{lesson.day}</span>
                      </button>
                    );
                  })}
                  <button className="cb-lesson-add">
                    <I.Plus size={12} color="var(--instructor)"/>
                    <span>Add lesson to {unit.label}</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* Add unit row */}
        <button className="cb-unit-add">
          <div className="add-icon"><I.Plus size={14} color="var(--instructor)"/></div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13.5 }}>Add another unit</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Or <span style={{ color: "var(--instructor)", textDecoration: "underline" }}>generate one with AI</span> from a topic & duration</div>
          </div>
        </button>
      </div>
    </>
  );
}

window.CBOutline = CBOutline;

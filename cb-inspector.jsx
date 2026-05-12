// LINKS Curriculum Builder — Inspector (right rail lesson editor)

function CBInspector({ lessonId, showStandards }) {
  // Find the lesson + its unit
  let lesson = null, unit = null;
  CB_UNITS.forEach((u) => {
    u.lessons.forEach((l) => {
      if (l.id === lessonId) { lesson = l; unit = u; }
    });
  });
  if (!lesson) return null;

  const blocks = lesson.blocks || [
    { id: "b1", type: "Warm-up", duration: 8, title: "Bell-ringer: name 3 carbon cycle reservoirs", color: "#E07A2D" },
    { id: "b2", type: "Direct instruction", duration: 18, title: "Mini-lecture + carbon cycle diagram", color: "#1E3A5F" },
    { id: "b3", type: "Lab activity", duration: 25, title: "BTB indicator with elodea + light/dark", color: "#2E9B62" },
    { id: "b4", type: "Reflection", duration: 9, title: "Exit ticket: 2 observations, 1 question", color: "#6D28D9" },
  ];
  const totalDur = blocks.reduce((s, b) => s + b.duration, 0);

  return (
    <div className="cb-inspector">
      {/* Header */}
      <div className="cb-insp-hdr">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div className="h-eyebrow" style={{ color: "var(--instructor)" }}>
            {unit.label} · Lesson {lesson.index}
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="icon-btn" title="Duplicate"><I.Copy size={13} color="var(--stone)"/></button>
            <button className="icon-btn" title="Move"><I.Move size={13} color="var(--stone)"/></button>
            <button className="icon-btn" title="Delete"><I.Trash size={13} color="var(--stone)"/></button>
          </div>
        </div>
        <div className="cb-insp-title" contentEditable suppressContentEditableWarning>
          {lesson.title}
        </div>
        <div className="cb-insp-meta-row">
          <div className="cb-insp-meta-item">
            <I.Calendar size={12} color="var(--stone)"/>
            <span>{lesson.day}</span>
          </div>
          <div className="cb-insp-meta-item">
            <I.Clock size={12} color="var(--stone)"/>
            <span>{lesson.duration} min</span>
          </div>
          <div className="cb-insp-meta-item">
            <span className={"cb-type-pill " + lesson.type}>{lesson.type}</span>
          </div>
          <div className="cb-insp-meta-item">
            <span className="cb-cycle-tag">{lesson.cycle}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="cb-insp-tabs">
        <button className="cb-insp-tab active">Plan</button>
        <button className="cb-insp-tab">Materials <span className="t-count">{lesson.materials.length}</span></button>
        <button className="cb-insp-tab">Assessment</button>
        <button className="cb-insp-tab">Notes</button>
      </div>

      {/* Body */}
      <div className="cb-insp-body">
        {/* Objective */}
        <div className="cb-insp-section">
          <div className="cb-insp-label">
            <I.Target size={12} color="var(--instructor)"/>
            Learning objective
          </div>
          <div className="cb-insp-text" contentEditable suppressContentEditableWarning>
            {lesson.objective}
          </div>
        </div>

        {/* Standards */}
        {showStandards && (
          <div className="cb-insp-section">
            <div className="cb-insp-label">
              <I.Award size={12} color="var(--instructor)"/>
              Standards alignment
              <button className="cb-insp-add-mini">+ Add</button>
            </div>
            <div className="cb-insp-stds">
              {lesson.standards.map((s) => (
                <div key={s} className="cb-std-row">
                  <span className="cb-std-chip">{s}</span>
                  <span className="cb-std-desc">{CB_STANDARD_DESCS[s] || ""}</span>
                  <button className="icon-btn-mini"><I.X size={10} color="var(--silver)"/></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lesson blocks / activities */}
        <div className="cb-insp-section">
          <div className="cb-insp-label">
            <I.Layers size={12} color="var(--instructor)"/>
            Lesson flow
            <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--stone)", fontWeight: 500 }}>
              {totalDur} of {lesson.duration} min
            </span>
          </div>

          {/* Time bar */}
          <div className="cb-time-bar">
            {blocks.map((b) => (
              <div key={b.id} className="cb-time-seg" style={{
                flex: b.duration,
                background: b.color,
              }} title={`${b.type} — ${b.duration} min`}/>
            ))}
          </div>

          {/* Blocks list */}
          <div className="cb-blocks">
            {blocks.map((b, i) => (
              <div key={b.id} className="cb-block">
                <div className="cb-block-grip"><I.GripVertical size={11} color="var(--silver)"/></div>
                <div className="cb-block-color" style={{ background: b.color }}/>
                <div className="cb-block-body">
                  <div className="cb-block-meta">
                    <span className="cb-block-type">{b.type}</span>
                    <span className="cb-block-dur">{b.duration} min</span>
                  </div>
                  <div className="cb-block-title">{b.title}</div>
                </div>
                <button className="icon-btn-mini"><I.MoreHorizontal size={12} color="var(--silver)"/></button>
              </div>
            ))}
            <button className="cb-block-add">
              <I.Plus size={12} color="var(--instructor)"/>
              <span>Add lesson block</span>
              <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--silver)" }}>warm-up · direct · practice · check</span>
            </button>
          </div>
        </div>

        {/* Materials */}
        <div className="cb-insp-section">
          <div className="cb-insp-label">
            <I.Paperclip size={12} color="var(--instructor)"/>
            Materials
            <button className="cb-insp-add-mini">+ Attach</button>
          </div>
          <div className="cb-mat-list">
            {lesson.materials.map((m) => (
              <div key={m.id} className="cb-mat-row">
                <div className="cb-mat-icon" style={{ background: m.kindColor + "22", color: m.kindColor }}>
                  {m.kind === "doc" && <I.FileText size={13}/>}
                  {m.kind === "video" && <I.Video size={13}/>}
                  {m.kind === "slides" && <I.Layers size={13}/>}
                  {m.kind === "link" && <I.Link size={13}/>}
                  {m.kind === "lab" && <I.Beaker size={13}/>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="cb-mat-title">{m.title}</div>
                  <div className="cb-mat-sub">{m.kind} · {m.size}</div>
                </div>
                <button className="icon-btn-mini"><I.MoreHorizontal size={12} color="var(--silver)"/></button>
              </div>
            ))}
          </div>
        </div>

        {/* AI helper card */}
        <div className="cb-ai-card">
          <div className="cb-ai-card-hdr">
            <div className="cb-ai-spark"><I.Sparkles size={11} color="#fff"/></div>
            <span>AI suggestions for this lesson</span>
          </div>
          <button className="cb-ai-suggestion">
            <span className="s-icon"><I.MessageSquare size={11} color="var(--instructor)"/></span>
            <span className="s-text">Generate 5 discussion questions tied to today's objective</span>
          </button>
          <button className="cb-ai-suggestion">
            <span className="s-icon"><I.CheckSquare size={11} color="var(--instructor)"/></span>
            <span className="s-text">Draft a 4-question exit ticket aligned to NGSS HS-LS2-5</span>
          </button>
          <button className="cb-ai-suggestion">
            <span className="s-icon"><I.Users size={11} color="var(--instructor)"/></span>
            <span className="s-text">Differentiate this lab for ELL and IEP students</span>
          </button>
        </div>
      </div>

      {/* Footer actions */}
      <div className="cb-insp-foot">
        <button className="btn btn-sm" style={{ flex: 1 }}>
          <I.Eye size={13} color="var(--stone)"/>
          Preview
        </button>
        <button className="btn btn-sm btn-primary" style={{ flex: 1 }}>
          <I.Send size={13} color="#fff"/>
          Assign to sections
        </button>
      </div>
    </div>
  );
}

window.CBInspector = CBInspector;

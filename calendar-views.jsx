/* ============================================================
   MY CALENDAR — Views (token-driven, design-system aligned)
   - CAL_AIPlanInsights, CAL_LeftRail, CAL_QuickAdd  (unchanged shells)
   - CAL_WeekGrid  → tighter chrome, design-system tokens
   - CAL_DayGrid   → adds agenda side-panel (Schedule list)
   - CAL_MonthGrid → tightened gridlines + drill-down on cell click
   - CAL_YearGrid  → real density heatmap (5 tiers) + drill-down
   - CAL_EventBlock, CAL_NowLineV2  (unchanged)
   ============================================================ */

/* -------- Sidebar: AI Insights (collapsible, vertical list) -------- */
function CAL_AIPlanInsights() {
  const [collapsed, setCollapsed] = React.useState(false);
  const items = [
    { icon: "Calendar", iconBg: "var(--danger-50)",  iconFg: "var(--danger)",
      title: "2 assignments due this week.",
      sub: "Start early to avoid a late crunch." },
    { icon: "Clock",    iconBg: "var(--warning-50)", iconFg: "var(--warning)",
      title: "Thursday looks heavy.",
      sub: "Consider moving 1 task to Friday.",
      cta: "Optimize My Week" },
    { icon: "Sparkle",  iconBg: "var(--student-50)", iconFg: "var(--student)",
      title: "3h 15m of free time this week.",
      sub: "Want study suggestions?",
      cta: "Suggest Study Blocks" },
  ];
  return (
    <div style={{
      background: "linear-gradient(180deg, var(--student-50) 0%, #fff 100%)",
      border: "1px solid var(--student-200)",
      borderRadius: 12, overflow: "hidden",
    }}>
      {/* Header row — always visible */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 12px",
        borderBottom: collapsed ? "none" : "1px solid var(--student-200)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <I.Sparkle size={13} color="var(--student)"/>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>
            {collapsed ? `AI Insights · ${items.length} items` : "AI Insights"}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {!collapsed && (
            <a href="#" onClick={(e) => e.preventDefault()} style={{
              fontSize: 11, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none",
            }}>View all →</a>
          )}
          <button
            onClick={() => setCollapsed((p) => !p)}
            style={{
              width: 22, height: 22, borderRadius: 6,
              border: "1px solid var(--student-200)", background: "var(--paper)",
              cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <div style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 200ms ease", display: "flex" }}>
              <I.ChevronDown size={12} color="var(--student-deep)"/>
            </div>
          </button>
        </div>
      </div>

      {/* Expandable content — vertical list */}
      {!collapsed && (
        <div style={{ padding: "6px 0" }}>
          {items.map((it, i) => {
            const Ico = I[it.icon] || I.Sparkle;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: 9,
                padding: "8px 12px",
                borderBottom: "1px solid var(--student-200)",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 7, background: it.iconBg,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1,
                }}>
                  <Ico size={13} color={it.iconFg}/>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>{it.title}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.4, marginTop: 1 }}>{it.sub}</div>
                  {it.cta && (
                    <button style={{
                      marginTop: 5, padding: "3px 8px", borderRadius: 5,
                      border: "1px solid var(--student-200)", background: "var(--paper)",
                      color: "var(--student-deep)", fontSize: 10.5, fontWeight: 600, cursor: "pointer",
                      fontFamily: "inherit",
                    }}>{it.cta}</button>
                  )}
                </div>
              </div>
            );
          })}

          {/* AI Assistant button — last row */}
          <div style={{ padding: "8px 12px" }}>
            <button style={{
              width: "100%", padding: "8px 0",
              borderRadius: 8,
              border: "1.5px solid var(--student-200)",
              background: "var(--paper)",
              color: "var(--student-deep)",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
              fontFamily: "inherit",
            }}>
              <I.Sparkle size={13} color="var(--student)"/> Ask AI Assistant →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- Left rail: Calendar Layers / Show / Calendars -------- */
function CAL_LeftRail({ activeLayers, toggleLayer, show, setShow, view, yearFilters, toggleYearFilter }) {
  const layerOrder = ["classes", "assignments", "exams", "activities", "personal", "health", "focus"];
  const checkbox = (checked, color) => (
    <span style={{
      width: 16, height: 16, borderRadius: 4,
      border: checked ? "none" : "1.5px solid var(--silver)",
      background: checked ? color : "transparent",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      {checked && <I.Check size={11} color="#fff"/>}
    </span>
  );
  // Year view — simplified Event Filters sidebar (no Calendar Layers / Show / Calendars)
  if (view === "year") {
    const YEAR_FILTER_ITEMS = [
      { id: "satact",          label: "SAT / ACT Exams",  color: "var(--warning)" },
      { id: "holidays",        label: "School Holidays",  color: "var(--success)" },
      { id: "studentlife",     label: "Student Life",     color: "var(--info)"    },
      { id: "extracurricular", label: "Extracurricular",  color: "var(--danger)"  },
    ];
    return (
      <div style={{ width: 200, flexShrink: 0, fontSize: 12.5 }}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Event Filters</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {YEAR_FILTER_ITEMS.map((f) => {
              const on = !!(yearFilters && yearFilters.has(f.id));
              return (
                <button key={f.id}
                  onClick={() => toggleYearFilter && toggleYearFilter(f.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "transparent", border: "none",
                    padding: "3px 0", cursor: "pointer",
                    color: "var(--ink)", fontWeight: on ? 600 : 500, textAlign: "left",
                  }}>
                  {checkbox(on, f.color)}
                  <span>{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Non-year views: sidebar contains only Quick Add (rendered by the parent).
  return null;
}

/* -------- Filter bar: 11 toggle chips, full-width, above grid -------- */
function CAL_FilterBar({ activeLayers, toggleLayer }) {
  const CHIPS = [
    { id: "personal-sched",  label: "Personal Scheduler",        color: "#7367F0" },
    { id: "project-mgr",     label: "Project Manager",           color: "#F97316" },
    { id: "my-classes",      label: "My Classes",                color: "#3B82F6" },
    { id: "field-trips",     label: "Field Trips",               color: "#22C55E" },
    { id: "proj-due-dates",  label: "Project Due Dates",         color: "#F59E0B" },
    { id: "satact",          label: "SAT/ACT Exams",             color: "#14B8A6" },
    { id: "ap-exams",        label: "AP Exams",                  color: "#2DD4BF" },
    { id: "extracurricular", label: "Extracurricular Programs",  color: "#F43F5E" },
    { id: "field-study",     label: "Field Study/Work",          color: "#067647" },
    { id: "deadlines",       label: "Deadlines",                 color: "#EF4444" },
  ];
  const [active, setActive] = React.useState(() => new Set(CHIPS.map((c) => c.id)));
  const toggle = (id) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  /* Functional chips — wired to real activeLayers so toggling hides events across all views */
  const FUNCTIONAL_CHIPS = [
    { id: "school-cal",       label: "School Calendar",  color: "#D97706", icon: "School" },
    { id: "health",           label: "Health",           color: "#DB2777", icon: "Shield" },
    { id: "community-service",label: "Community Service",color: "#0D9488", icon: null },
    { id: "presentations",    label: "Presentations",    color: "#EA580C", icon: null },
    { id: "field-studies",    label: "Field Studies",    color: "#6366F1", icon: null },
  ];

  const functionalOnCount = FUNCTIONAL_CHIPS.filter(c => !activeLayers || activeLayers.has(c.id)).length;
  const activeCount = active.size + functionalOnCount;
  const totalCount  = CHIPS.length + FUNCTIONAL_CHIPS.length;

  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 12, padding: "12px 16px", marginBottom: 14,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <I.Filter size={13} color="var(--stone)"/>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Filters</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--stone)", fontWeight: 500 }}>
          {activeCount} of {totalCount} active
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {CHIPS.map((c) => {
          const on = active.has(c.id);
          return (
            <button key={c.id} onClick={() => toggle(c.id)} style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "4px 10px 4px 7px", borderRadius: 999, fontFamily: "inherit",
              border: `1.5px solid ${on ? c.color : "var(--mist)"}`,
              background: on ? `${c.color}18` : "transparent",
              cursor: "pointer",
            }}>
              <span style={{
                width: 9, height: 9, borderRadius: 2, flexShrink: 0,
                background: on ? c.color : "transparent",
                border: on ? "none" : "1.5px solid var(--silver)",
              }}/>
              <span style={{
                fontSize: 12, fontWeight: on ? 500 : 400,
                color: on ? "var(--ink)" : "var(--stone)",
                textDecoration: on ? "none" : "line-through",
              }}>{c.label}</span>
            </button>
          );
        })}

        {/* Functional chips — call real toggleLayer so events hide/show across all views */}
        {FUNCTIONAL_CHIPS.map((fc) => {
          const on = !activeLayers || activeLayers.has(fc.id);
          const Ico = fc.icon ? (I[fc.icon] || null) : null;
          return (
            <button
              key={fc.id}
              onClick={() => toggleLayer && toggleLayer(fc.id)}
              title={on ? `Hide ${fc.label}` : `Show ${fc.label}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "4px 10px 4px 7px", borderRadius: 999, fontFamily: "inherit",
                border: `1.5px solid ${on ? fc.color : "var(--mist)"}`,
                background: on ? `${fc.color}18` : "transparent",
                cursor: "pointer",
              }}
            >
              <span style={{
                width: 9, height: 9, borderRadius: 2, flexShrink: 0,
                background: on ? fc.color : "transparent",
                border: on ? "none" : "1.5px solid var(--silver)",
              }}/>
              {Ico && <Ico size={10} color={on ? fc.color : "var(--stone)"}/>}
              <span style={{
                fontSize: 12, fontWeight: on ? 500 : 400,
                color: on ? "var(--ink)" : "var(--stone)",
                textDecoration: on ? "none" : "line-through",
              }}>{fc.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}

/* -------- Quick Add box (lives in left sidebar) -------- */
function CAL_QuickAdd() {
  const items = [
    { id: "event",      label: "Event",         icon: "Calendar", bg: "var(--student-50)", fg: "var(--student)" },
    { id: "studyblock", label: "Study Block",   icon: "Book",     bg: "var(--success-50)", fg: "var(--success)" },
    { id: "todo",       label: "To Do",         icon: "Check",    bg: "var(--danger-50)",  fg: "var(--danger)" },
    { id: "reserve",    label: "Reserve Space", icon: "MapPin",   bg: "var(--warning-50)", fg: "var(--warning)" },
    { id: "ai",         label: "Ask AI",        icon: "Sparkle",  bg: "var(--student-50)", fg: "var(--student)" },
    { id: "focus",      label: "Focus Time",    icon: "Time",     bg: "var(--info-50)",    fg: "var(--info)" },
  ];
  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 12, padding: 14,
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10, letterSpacing: 0.2 }}>Quick Add</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {items.map((it) => {
          const Ico = I[it.icon] || I.Plus;
          return (
            <button key={it.id} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              padding: "10px 4px", borderRadius: 9,
              border: "1px solid var(--mist)", background: "var(--paper)", cursor: "pointer",
            }}>
              <div style={{ width: 26, height: 26, borderRadius: 7, background: it.bg, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Ico size={13} color={it.fg}/>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--slate)", fontWeight: 500, textAlign: "center", lineHeight: 1.2 }}>{it.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------- Event popover card (anchored to the clicked block) -------- */
function CAL_EventPopover({ ev, L, onClose }) {
  const day = CAL_DAYS[ev.day];
  const dayLabel = day ? `${day.dow}, May ${day.date}` : "";
  const isHealth    = ev.layer === "health";
  const isCancelled = ev.status === "cancelled";
  const isPast      = ev.day < 2;

  const statusBadge = isCancelled
    ? { label: "Cancelled",  bg: "var(--bone)",       color: "var(--stone)",   border: "var(--silver)",     icon: "X"            }
    : (ev.layer === "assignments" && isPast)
    ? { label: "Overdue",    bg: "#FEF2F2",           color: "#DC2626",        border: "#FECACA",           icon: "AlertTriangle" }
    : isPast
    ? { label: "Completed",  bg: "var(--success-50)", color: "var(--success)", border: "var(--success-200)",icon: "Check"        }
    : null;

  const SIco = statusBadge ? (I[statusBadge.icon] || I.Check) : null;

  const primaryActionLabel =
      ev.layer === "classes"            ? "Join Class"
    : ev.layer === "assignments"        ? "View Assignment"
    : ev.layer === "activities"         ? "View Program"
    : ev.layer === "health"             ? "View Health Log"
    : ev.layer === "focus"              ? "Open Study Tools"
    : ev.layer === "community-service"  ? "View Program"
    : ev.layer === "presentations"      ? "View Materials"
    : ev.layer === "field-studies"      ? "View Field Study"
    : "View Details";

  /* Flip to left side for columns near the right edge (Sat / Sun) */
  const toLeft = ev.day >= 5;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: 0,
        ...(toLeft ? { right: "calc(100% + 8px)" } : { left: "calc(100% + 8px)" }),
        width: 260,
        background: "var(--paper)",
        border: "1px solid var(--mist)",
        borderRadius: 12,
        boxShadow: "0 8px 24px rgba(15,23,42,0.12), 0 2px 6px rgba(15,23,42,0.06)",
        zIndex: 200,
        padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 10,
        fontFamily: "inherit", textAlign: "left",
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.25 }}>{ev.title}</span>
            {isHealth && <I.Shield size={12} color="var(--stone)"/>}
          </div>
          <span style={{
            fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999,
            background: L.bg, color: L.color, border: `1px solid ${L.border}`,
            lineHeight: 1.55,
          }}>{L.label}</span>
        </div>
        <button onClick={onClose} style={{
          width: 24, height: 24, borderRadius: 6, border: "1px solid var(--mist)",
          background: "var(--bone)", color: "var(--stone)", display: "inline-flex",
          alignItems: "center", justifyContent: "center", cursor: "pointer",
          flexShrink: 0, fontSize: 15, lineHeight: 1, fontFamily: "inherit", fontWeight: 400,
        }}>×</button>
      </div>

      {/* ── Meta rows ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
          <I.Calendar size={12} color="var(--stone)"/>
          <span style={{ color: "var(--stone)" }}>{dayLabel}</span>
        </div>
        {ev.time && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
            <I.Clock size={12} color="var(--stone)"/>
            <span style={{ color: "var(--stone)" }}>{ev.time}</span>
          </div>
        )}
        {(ev.teacher || ev.room) && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
            <I.User size={12} color="var(--stone)"/>
            <span style={{ color: "var(--stone)" }}>{ev.teacher}{ev.room ? ` · ${ev.room}` : ""}</span>
          </div>
        )}
        {ev.note && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
            <I.Book size={12} color="var(--stone)"/>
            <span style={{ color: "var(--stone)" }}>{ev.note}</span>
          </div>
        )}
        {ev.attendees && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12 }}>
            <I.User size={12} color="var(--stone)"/>
            <span style={{ color: "var(--stone)" }}>{ev.attendees} students</span>
          </div>
        )}
      </div>

      {/* ── Status badge ── */}
      {statusBadge && SIco && (
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "4px 10px", borderRadius: 999,
          background: statusBadge.bg, color: statusBadge.color,
          border: `1px solid ${statusBadge.border}`,
          fontSize: 11.5, fontWeight: 600, alignSelf: "flex-start",
        }}>
          <SIco size={11} color={statusBadge.color}/>
          {statusBadge.label}
        </div>
      )}

      {/* ── Primary action + full details link ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 2 }}>
        <button style={{
          padding: "7px 14px", borderRadius: 8,
          border: `1px solid ${L.border}`, background: L.bg,
          color: L.color, fontSize: 12, fontWeight: 600,
          cursor: "pointer", width: "100%", fontFamily: "inherit",
        }}>{primaryActionLabel}</button>
        <a href="#" onClick={(e) => e.preventDefault()} style={{
          fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600,
          textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          Open full details <I.ChevronRight size={11} color="var(--student-deep)"/>
        </a>
      </div>
    </div>
  );
}

/* -------- A single block on the time grid (week view) -------- */
function CAL_EventBlock({ ev, hourHeight, startHour, narrow, onOpenModal }) {
  const L = calLayerStyle(ev.layer);

  const top  = (ev.start - startHour) * hourHeight + 2;
  const h    = Math.max(20, (ev.end - ev.start) * hourHeight - 4);
  const isHighlight  = ev.highlight;
  const isHealth     = ev.layer === "health";
  const isCancelled  = ev.status === "cancelled";
  const isPast       = ev.day < 2;           // Mon & Tue are before today (Wed = 2)
  const isCompleted  = isPast && !isCancelled;

  /* Desaturated 15% opacity fill for normal events */
  const blockBg         = (isCancelled || isCompleted) ? "var(--bone)"            : `${L.color}26`;
  const blockBorder     = (isCancelled || isCompleted) ? "1px solid var(--mist)"  : `1px solid ${L.border}`;
  const blockBorderLeft = (isCancelled || isCompleted) ? "3px solid var(--silver)": `3px solid ${L.color}`;
  const blockOpacity    = (isCancelled || isCompleted) ? 0.58 : 1;
  const titleColor      = (isCancelled || isCompleted) ? "var(--stone)"           : L.color;

  const handleClick = (e) => {
    e.stopPropagation();
    if (onOpenModal) onOpenModal(ev);
  };

  return (
    <div style={{ position: "absolute", top, left: 3, right: 3, height: h, zIndex: 1 }}>
      <div
        onClick={handleClick}
        style={{
          height: "100%", position: "relative",
          background: blockBg, border: blockBorder, borderLeft: blockBorderLeft,
          borderRadius: 6, padding: "5px 8px", cursor: "pointer", overflow: "hidden",
          opacity: blockOpacity,
          boxShadow: isHighlight ? "0 0 0 2px var(--student-300), 0 4px 14px rgba(124,58,237,0.18)" : "none",
          outline: isHighlight ? "1px solid var(--student)" : "none",
        }}
      >
        {/* Health privacy shield icon */}
        {isHealth && (
          <div style={{ position: "absolute", top: 4, right: 5 }}>
            <I.Shield size={10} color={L.color}/>
          </div>
        )}
        <div style={{
          fontSize: narrow ? 10 : 11, fontWeight: 700, color: titleColor,
          lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          textDecoration: isCancelled ? "line-through" : "none",
          display: "flex", alignItems: "center", gap: 3,
          paddingRight: isHealth ? 16 : 0,
        }}>
          {isCompleted && <I.Check size={8} color="var(--silver)" style={{ flexShrink: 0 }}/>}
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</span>
        </div>
        {/* Time only — teacher/room removed from block surface */}
        {h > 32 && ev.time && (
          <div style={{ fontSize: narrow ? 9 : 10, color: titleColor, lineHeight: 1.3, marginTop: 1, opacity: 0.75 }}>
            {ev.time}
          </div>
        )}
        {ev.attendees && h > 60 && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
            {[0,1,2].map((i) => (
              <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: ["var(--danger-300)", "var(--info-300)", "var(--success-300)"][i], border: "2px solid var(--paper)", marginLeft: i === 0 ? 0 : -6 }}/>
            ))}
            <div style={{ fontSize: 9.5, color: L.color, fontWeight: 600, marginLeft: 4, padding: "1px 6px", borderRadius: 999, background: "var(--paper)" }}>+{ev.attendees - 3}</div>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------- WEEK grid -------- */
function CAL_WeekGrid({ activeLayers, onSelectEvent, onOpenModal, hourHeight = 60 }) {
  const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const startHour = 7;
  const days = CAL_DAYS;

  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 12, overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid var(--mist)" }}>
        <div/>
        {days.map((d) => (
          <div key={d.idx} style={{
            padding: "10px 12px", borderLeft: "1px solid var(--mist)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 11.5, color: "var(--stone)", fontWeight: 600 }}>{d.dow}</span>
            <span style={{ fontSize: 11.5, color: "var(--stone)" }}>5/{d.date}</span>
            {d.isToday && (
              <span style={{
                fontSize: 10, fontWeight: 700,
                width: 18, height: 18, borderRadius: "50%",
                background: "var(--student)", color: "#fff",
                display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: 2,
              }}>{d.badge}</span>
            )}
          </div>
        ))}
      </div>

      {/* All-day row */}
      <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", borderBottom: "1px solid var(--mist)", background: "var(--surface-quiet)", minHeight: 36 }}>
        <div style={{ padding: "8px 6px", textAlign: "right", fontSize: 10, color: "var(--silver)", fontWeight: 600 }}>All-day</div>
        {days.map((d) => {
          const items = calAllDayForDay(d.idx, activeLayers);
          return (
            <div key={d.idx} style={{ borderLeft: "1px solid var(--mist)", padding: 4, display: "flex", flexDirection: "column", gap: 3 }}>
              {items.map((a, i) => {
                const L          = calLayerStyle(a.layer);
                const isOverdue  = a.status === "overdue";
                const isDueToday = a.status === "due-today";
                const chipBg     = isOverdue ? "#DC2626" : L.bg;
                const chipColor  = isOverdue ? "#fff"    : L.color;
                return (
                  <button key={i}
                    onClick={() => onOpenModal && onOpenModal(a)}
                    style={{
                      background: chipBg,
                      border: isDueToday ? "1px solid #DC2626" : `1px solid ${L.border}`,
                      borderLeft: isOverdue ? "3px solid #991B1B" : `3px solid ${L.color}`,
                      borderRadius: 5, padding: "3px 6px",
                      fontSize: 10.5, lineHeight: 1.3,
                      display: "flex", alignItems: "flex-start", gap: 4,
                      cursor: "pointer", fontFamily: "inherit", textAlign: "left",
                    }}>
                    {isOverdue && <I.AlertTriangle size={10} color="#fff" style={{ marginTop: 2, flexShrink: 0 }}/>}
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 700, color: chipColor, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
                      {a.subtitle && <div style={{ fontSize: 9.5, color: isOverdue ? "rgba(255,255,255,0.8)" : "var(--stone)" }}>{a.subtitle}</div>}
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7, 1fr)", position: "relative" }}>
        <div>
          {HOURS.map((h) => (
            <div key={h} style={{ height: hourHeight, padding: "0 6px 0 0", textAlign: "right", fontSize: 10.5, color: "var(--silver)", fontWeight: 600, position: "relative" }}>
              <span style={{ position: "relative", top: -6 }}>{h === 12 ? "12 PM" : h > 12 ? (h-12)+" PM" : h+" AM"}</span>
            </div>
          ))}
        </div>
        {days.map((d) => (
          <div key={d.idx} style={{
            position: "relative", borderLeft: "1px solid var(--mist)",
            height: HOURS.length * hourHeight,
            background: d.isToday ? "var(--student-50)" : "transparent",
          }}>
            {HOURS.map((h, i) => (
              <div key={h} style={{
                position: "absolute", left: 0, right: 0, top: i * hourHeight,
                borderTop: "1px solid var(--mist)",
              }}/>
            ))}
            {calEventsForDay(d.idx, activeLayers).map((ev) => (
              <CAL_EventBlock key={ev.id} ev={ev} hourHeight={hourHeight} startHour={startHour} onOpenModal={onOpenModal}/>
            ))}
          </div>
        ))}

        <CAL_NowLineV2 startHour={startHour} hourHeight={hourHeight} day={1} hour={14.566}/>
      </div>
    </div>
  );
}

function CAL_NowLineV2({ startHour, hourHeight, day, hour }) {
  const top = (hour - startHour) * hourHeight;
  return (
    <div style={{
      position: "absolute",
      left: `calc(60px + (100% - 60px) * ${day / 7})`,
      width: `calc((100% - 60px) / 7)`,
      top, height: 1, borderTop: "2px solid var(--danger)",
      pointerEvents: "none", zIndex: 5,
    }}>
      <div style={{
        position: "absolute", left: -32, top: -8,
        fontSize: 10, fontWeight: 700, color: "var(--danger)",
        background: "var(--paper)", padding: "0 4px", borderRadius: 3,
      }}>2:34 PM</div>
      <div style={{ position: "absolute", left: -4, top: -4, width: 8, height: 8, borderRadius: "50%", background: "var(--danger)" }}/>
    </div>
  );
}

/* -------- DAY grid (with Schedule side-panel) -------- */
function CAL_DayGrid({ activeLayers, onSelectEvent, onOpenModal, hourHeight = 60, dayIdx = 2 }) {
  const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const startHour = 7;
  const day = CAL_DAYS[dayIdx];
  const events = calEventsForDay(dayIdx, activeLayers).sort((a, b) => a.start - b.start);
  const allday = calAllDayForDay(dayIdx, activeLayers);
  const [activeId, setActiveId] = React.useState(null);

  return (
    <div>
      {/* time grid — full width */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, overflow: "hidden",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", borderBottom: "1px solid var(--mist)" }}>
          <div/>
          <div style={{
            padding: "12px 16px", borderLeft: "1px solid var(--mist)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{day.dow}, May {day.date}</span>
            {day.isToday && (
              <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "var(--student)", color: "#fff" }}>TODAY</span>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", borderBottom: "1px solid var(--mist)", background: "var(--surface-quiet)", minHeight: 36 }}>
          <div style={{ padding: "8px 6px", textAlign: "right", fontSize: 10, color: "var(--silver)", fontWeight: 600 }}>All-day</div>
          <div style={{ borderLeft: "1px solid var(--mist)", padding: 6, display: "flex", flexWrap: "wrap", gap: 6 }}>
            {allday.map((a, i) => {
              const L          = calLayerStyle(a.layer);
              const isOverdue  = a.status === "overdue";
              const isDueToday = a.status === "due-today";
              const chipBg     = isOverdue ? "#DC2626" : L.bg;
              const chipColor  = isOverdue ? "#fff"    : L.color;
              return (
                <button key={i}
                  onClick={() => onOpenModal && onOpenModal(a)}
                  style={{
                    background: chipBg,
                    border: isDueToday ? "1px solid #DC2626" : `1px solid ${L.border}`,
                    borderLeft: isOverdue ? "3px solid #991B1B" : `3px solid ${L.color}`,
                    borderRadius: 6, padding: "4px 10px",
                    fontSize: 12, fontWeight: 600, color: chipColor,
                    display: "flex", alignItems: "center", gap: 6,
                    cursor: "pointer", fontFamily: "inherit",
                  }}>
                  {isOverdue && <I.AlertTriangle size={13} color="#fff"/>}
                  <span>{a.title}</span>
                  {a.subtitle && (
                    <span style={{ color: isOverdue ? "rgba(255,255,255,0.8)" : "var(--stone)", fontWeight: 400 }}> · {a.subtitle}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "70px 1fr", position: "relative" }}>
          <div>
            {HOURS.map((h) => (
              <div key={h} style={{ height: hourHeight, padding: "0 8px 0 0", textAlign: "right", fontSize: 11, color: "var(--silver)", fontWeight: 600 }}>
                <span style={{ position: "relative", top: -6 }}>{h === 12 ? "12 PM" : h > 12 ? (h-12)+" PM" : h+" AM"}</span>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", borderLeft: "1px solid var(--mist)", height: HOURS.length * hourHeight }}>
            {HOURS.map((h, i) => (
              <div key={h} style={{
                position: "absolute", left: 0, right: 0, top: i * hourHeight,
                borderTop: i % 2 ? "1px dashed var(--mist)" : "1px solid var(--mist)",
              }}/>
            ))}
            {events.map((ev) => (
              <CAL_DayEventBlock key={ev.id} ev={ev} hourHeight={hourHeight} startHour={startHour}
                isSelected={activeId === ev.id}
                onOpenModal={(e) => { setActiveId(e.id); if (onOpenModal) onOpenModal(e); }}/>
            ))}
            {/* Now-line at 2:34 PM — shown on today (Wed, day 2) */}
            {dayIdx === 2 && (
              <div style={{ position: "absolute", left: 0, right: 0, top: (14.566 - startHour) * hourHeight, pointerEvents: "none", zIndex: 5 }}>
                <div style={{ borderTop: "2px solid var(--danger)", position: "relative" }}>
                  <div style={{ position: "absolute", left: -4, top: -4, width: 8, height: 8, borderRadius: "50%", background: "var(--danger)" }}/>
                  <div style={{ position: "absolute", right: 6, top: -9, fontSize: 10, fontWeight: 700, color: "var(--danger)", background: "var(--paper)", padding: "0 4px", borderRadius: 3 }}>2:34 PM</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CAL_DayEventBlock({ ev, hourHeight, startHour, onOpenModal, isSelected }) {
  const L = calLayerStyle(ev.layer);

  const top      = (ev.start - startHour) * hourHeight + 2;
  const h        = Math.max(28, (ev.end - ev.start) * hourHeight - 4);
  const isHealth = ev.layer === "health";

  const handleClick = (e) => {
    e.stopPropagation();
    if (onOpenModal) onOpenModal(ev);
  };

  return (
    <div style={{ position: "absolute", top, left: 8, right: 8, height: h, zIndex: 1 }}>
      <div onClick={handleClick} style={{
        height: "100%", position: "relative",
        background: `${L.color}26`, border: `1px solid ${L.border}`, borderLeft: `3px solid ${L.color}`,
        borderRadius: 8, padding: "8px 12px", cursor: "pointer", overflow: "hidden",
        boxShadow: isSelected
          ? "0 0 0 2px var(--student), 0 4px 14px rgba(124,58,237,0.15)"
          : (ev.highlight ? "0 0 0 2px var(--student-300)" : "none"),
      }}>
        {/* Health privacy shield */}
        {isHealth && (
          <div style={{ position: "absolute", top: 8, right: 10 }}>
            <I.Shield size={12} color={L.color}/>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingRight: isHealth ? 22 : 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: L.color }}>{ev.title}</div>
          <div style={{ fontSize: 11, color: L.color, opacity: 0.75 }}>{ev.time}</div>
        </div>
      </div>
    </div>
  );
}

/* -------- MONTH grid (Mon–Fri 5-col, May 2026) -------- */
function CAL_MonthGrid({ activeLayers, onSelectEvent, onOpenModal, onDrillToDay }) {
  const [dayModal, setDayModal] = React.useState(null); // { dateNum, evs }
  // 5-column Mon–Fri: 5 rows starting Mon Apr 27
  const WEEK_START = new Date(2026, 3, 27); // Apr 27 (Mon)
  const cells = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      const d = new Date(WEEK_START);
      d.setDate(WEEK_START.getDate() + r * 7 + c);
      cells.push(d);
    }
  }

  // Sparse events for weeks 4 & 5 (May 18–29) — no CAL_EVENTS data for these dates
  const SPARSE = [
    { id:"s18a", date:18, layer:"classes",    title:"Biology 101",     start:8.0  },
    { id:"s18b", date:18, layer:"school-cal", title:"Lunch",           start:12.0 },
    { id:"s19a", date:19, layer:"classes",    title:"Algebra II",      start:8.0  },
    { id:"s19b", date:19, layer:"school-cal", title:"Lunch",           start:12.0 },
    { id:"s19c", date:19, layer:"classes",    title:"US History",      start:13.0 },
    { id:"s20a", date:20, layer:"classes",    title:"Chemistry",       start:8.0  },
    { id:"s20b", date:20, layer:"school-cal", title:"Lunch",           start:12.0 },
    { id:"s20c", date:20, layer:"classes",    title:"English 10",      start:13.0 },
    { id:"s21a", date:21, layer:"classes",    title:"Algebra II",      start:8.0  },
    { id:"s21b", date:21, layer:"exams",      title:"Chemistry Quiz",  start:10.0 },
    { id:"s22a", date:22, layer:"classes",    title:"Biology 101",     start:8.0  },
    { id:"s22b", date:22, layer:"activities", title:"Soccer Practice", start:15.5 },
    { id:"s25a", date:25, layer:"classes",    title:"Biology 101",     start:8.0  },
    { id:"s25b", date:25, layer:"focus",      title:"Study Block",     start:10.0 },
    { id:"s26a", date:26, layer:"classes",    title:"Algebra II",      start:8.0  },
    { id:"s26b", date:26, layer:"school-cal", title:"Lunch",           start:12.0 },
    { id:"s27a", date:27, layer:"classes",    title:"Chemistry",       start:8.0  },
    { id:"s27b", date:27, layer:"health",     title:"Gym / Workout",   start:18.0 },
    { id:"s28a", date:28, layer:"exams",      title:"Biology Exam",    start:8.0  },
    { id:"s28b", date:28, layer:"school-cal", title:"Lunch",           start:12.0 },
    { id:"s29a", date:29, layer:"classes",    title:"English 10",      start:13.0 },
    { id:"s29b", date:29, layer:"activities", title:"Soccer Practice", start:15.5 },
  ];

  // Build date→events map: timed (sorted by start) first, then all-day appended
  const eventsByDate = {};
  const timedSorted = [...CAL_EVENTS].sort((a, b) => a.start - b.start);
  timedSorted.forEach((ev) => {
    if (!activeLayers || activeLayers.has(ev.layer)) {
      const d = 11 + ev.day;
      (eventsByDate[d] = eventsByDate[d] || []).push(ev);
    }
  });
  SPARSE.forEach((ev) => {
    if (!activeLayers || activeLayers.has(ev.layer)) {
      (eventsByDate[ev.date] = eventsByDate[ev.date] || []).push(ev);
    }
  });
  CAL_ALLDAY.forEach((a) => {
    if (!activeLayers || activeLayers.has(a.layer)) {
      const d = 11 + a.day;
      (eventsByDate[d] = eventsByDate[d] || []).push({ ...a, allDay: true, id: "ad-" + d + "-" + a.title });
    }
  });

  const MAX_PILLS = 3;

  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 12, overflow: "hidden" }}>

      {/* Day-of-week header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", borderBottom: "2px solid var(--mist)", background: "var(--surface-quiet)" }}>
        {["Mon","Tue","Wed","Thu","Fri"].map((d, i) => (
          <div key={d} style={{
            padding: "10px 12px",
            fontSize: 10.5, fontWeight: 700, color: "var(--silver)",
            letterSpacing: "0.08em", textTransform: "uppercase",
            borderLeft: i > 0 ? "1px solid var(--mist)" : "none",
          }}>{d}</div>
        ))}
      </div>

      {/* 5 × 5 cell grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
        {cells.map((c, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const inMay = c.getMonth() === 4;
          const dateNum = c.getDate();
          const isToday = inMay && dateNum === 13;
          const evs = inMay ? (eventsByDate[dateNum] || []) : [];
          const overflow = Math.max(0, evs.length - MAX_PILLS);
          return (
            <button key={i}
              onClick={() => {
                if (!inMay || evs.length === 0) return;
                const first = evs.find((e) => !e.allDay) || evs[0];
                if (first && onOpenModal) onOpenModal(first);
              }}
              style={{
                background: inMay ? "var(--paper)" : "var(--bone)",
                padding: "8px 10px 10px",
                minHeight: 115,
                display: "flex", flexDirection: "column", gap: 4,
                cursor: (inMay && evs.length > 0) ? "pointer" : "default",
                border: "none",
                borderLeft: col > 0 ? "1px solid var(--mist)" : "none",
                borderTop: row > 0 ? "1px solid var(--mist)" : "none",
                textAlign: "left",
                transition: "background 120ms",
              }}
              onMouseEnter={(e) => { if (inMay && evs.length > 0) e.currentTarget.style.background = "var(--student-50)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = inMay ? "var(--paper)" : "var(--bone)"; }}
            >
              {/* Date number */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{
                  fontSize: 12.5, fontWeight: isToday ? 700 : (inMay ? 500 : 400),
                  color: isToday ? "#fff" : (inMay ? "var(--ink)" : "var(--silver)"),
                  width: 22, height: 22, borderRadius: "50%",
                  background: isToday ? "var(--student)" : "transparent",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  lineHeight: 1, flexShrink: 0,
                }}>{dateNum}</span>
                {overflow > 0 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); if (inMay) setDayModal({ dateNum, evs }); }}
                    style={{
                      fontSize: 10, color: "var(--student-deep)", fontWeight: 700,
                      background: "var(--student-50)", border: "none",
                      borderRadius: 4, padding: "1px 5px", cursor: "pointer", fontFamily: "inherit",
                    }}
                  >+{overflow} more</button>
                )}
              </div>
              {/* Event pills */}
              {evs.slice(0, MAX_PILLS).map((ev, k) => {
                const L = calLayerStyle(ev.layer);
                return (
                  <div key={k}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onOpenModal) onOpenModal(ev);
                    }}
                    style={{
                      fontSize: 10.5, padding: "2px 6px", borderRadius: 4,
                      background: `${L.color}20`, color: L.color,
                      borderLeft: `2px solid ${L.color}`,
                      whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      cursor: "pointer",
                      fontWeight: 600, lineHeight: 1.3,
                    }}>{ev.title}</div>
                );
              })}
            </button>
          );
        })}
      </div>

      {/* Day-events modal ("+N more" click) */}
      {dayModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div onClick={() => setDayModal(null)} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.5)" }}/>
          <div style={{
            position: "relative", width: 360,
            background: "var(--paper)", borderRadius: 16,
            boxShadow: "0 16px 48px rgba(15,23,42,0.18)",
            overflow: "hidden",
          }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>May {dayModal.dateNum}</span>
              <button onClick={() => setDayModal(null)} style={{ width: 26, height: 26, borderRadius: 7, border: "1px solid var(--mist)", background: "var(--bone)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "var(--stone)", fontFamily: "inherit", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ padding: "8px 0", maxHeight: 340, overflowY: "auto" }}>
              {dayModal.evs.map((ev, i) => {
                const L = calLayerStyle(ev.layer);
                return (
                  <button key={i}
                    onClick={() => { setDayModal(null); if (onOpenModal) onOpenModal(ev); }}
                    style={{
                      width: "100%", padding: "10px 18px",
                      display: "flex", alignItems: "center", gap: 10,
                      background: "transparent", border: "none",
                      cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                      borderBottom: i < dayModal.evs.length - 1 ? "1px solid var(--mist)" : "none",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div style={{ width: 3, alignSelf: "stretch", borderRadius: 999, background: L.color, flexShrink: 0 }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{ev.title}</div>
                      {ev.time && <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>{ev.time}</div>}
                    </div>
                    <I.ChevronRight size={12} color="var(--silver)"/>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- YEAR grid: 4×3 mini-calendar layout with event dots -------- */
function CAL_YearGrid({ activeLayers, onDrillToDay, yearFilters, yearSpan = 1 }) {
  const MONTH_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  /* -- Per-year metadata (computed from JS Date so multi-year is always accurate) -- */
  const buildYearMeta = (yr) => {
    const isLeap = (yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0;
    return {
      monthFirstDow: Array.from({ length: 12 }, (_, mi) => new Date(yr, mi, 1).getDay()),
      monthLen:      [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    };
  };

  /* -- Dot data (same patterns reused per year for mockup density) -- */
  const SCHOOL_MONTHS = new Set([0,1,2,3,4,8,9,10,11]);
  const ASSIGN_DATES  = new Set([
    "0-16","0-30","1-13","1-27","2-6","2-20","3-10","3-24",
    "4-11","4-15","4-18","8-18","8-25","9-9","9-23","10-6","10-20","11-4","11-11",
  ]);
  const EXAM_DATES = new Set([
    "0-26","0-27","0-28","0-29","0-30",
    "4-18","4-19","4-20","4-21","4-22",
    "11-14","11-15","11-16","11-17","11-18",
  ]);
  const FILTER_DOTS = {
    satact:          new Set(["0-24","3-4","6-11","10-7"]),
    holidays:        new Set(["0-19","2-30","4-25","9-12","11-24","11-25"]),
    studentlife:     new Set(["2-6","4-1","5-5","9-4","10-31"]),
    extracurricular: new Set(["1-14","3-18","4-16","9-19","10-17","11-21"]),
  };
  const FILTER_COLORS = {
    satact: "var(--warning)", holidays: "var(--success)",
    studentlife: "var(--info)", extracurricular: "var(--danger)",
  };

  const getPrimaryDot = (mi, day, mFirstDow) => {
    const key = `${mi}-${day}`;
    if (EXAM_DATES.has(key))   return "var(--student)";
    if (ASSIGN_DATES.has(key)) return "var(--danger)";
    if (SCHOOL_MONTHS.has(mi)) {
      const dow = (mFirstDow[mi] + day - 1) % 7; // Sun=0
      if (dow >= 1 && dow <= 5) return "var(--info)"; // Mon-Fri = class blue
    }
    return null;
  };

  const getFilterDotColors = (mi, day) => {
    if (!yearFilters || yearFilters.size === 0) return [];
    const key = `${mi}-${day}`;
    return Object.keys(FILTER_DOTS)
      .filter(id => yearFilters.has(id) && FILTER_DOTS[id].has(key))
      .map(id => FILTER_COLORS[id]);
  };

  /* -- Render one mini month calendar -- */
  const renderMonth = (mi, yr, mFirstDow, mLen, compact) => {
    const firstDow    = mFirstDow[mi];
    const daysInMonth = mLen[mi];
    const cellW   = compact ? 16   : 18;
    const numSize = compact ? 8.5  : 9.5;
    const dowSize = compact ? 7    : 8;
    const padCell = compact ? "1px 1px 2px" : "2px 1px 3px";

    return (
      <div key={mi}>
        {/* Month label */}
        <div style={{
          fontSize: compact ? 10.5 : 12, fontWeight: 700, marginBottom: 6,
          color: (yr === 2026 && mi === 4) ? "var(--student-deep)" : "var(--slate)",
        }}>{MONTH_SHORT[mi]} {yr}</div>

        {/* Day-of-week header */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 3 }}>
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d, di) => (
            <div key={di} style={{
              textAlign: "center", fontSize: dowSize, fontWeight: 700,
              color: "var(--silver)", letterSpacing: "0.04em", lineHeight: "14px",
            }}>{d}</div>
          ))}
        </div>

        {/* Date cells */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", rowGap: 1 }}>
          {Array.from({ length: firstDow }).map((_, i) => <div key={"b"+i}/>)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day        = i + 1;
            const isToday    = yr === 2026 && mi === 4 && day === 13;
            const primaryDot = getPrimaryDot(mi, day, mFirstDow);
            const filterDots = getFilterDotColors(mi, day);
            const hasAnyDot  = primaryDot || filterDots.length > 0;
            return (
              <button key={day}
                onClick={() => {
                  if (!onDrillToDay) return;
                  onDrillToDay(yr === 2026 && mi === 4 && day >= 11 && day <= 17 ? day - 11 : 2);
                }}
                title={`${MONTH_SHORT[mi]} ${day}, ${yr}`}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: padCell, border: "none",
                  background: "transparent", cursor: "pointer",
                  borderRadius: 3, minWidth: 0,
                }}
              >
                <span style={{
                  width: cellW, height: cellW, borderRadius: "50%",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: numSize, lineHeight: 1,
                  fontWeight: isToday ? 700 : 400,
                  background: isToday ? "var(--student)" : "transparent",
                  color: isToday ? "#fff" : "var(--ink)",
                  flexShrink: 0,
                }}>{day}</span>
                {hasAnyDot && (
                  <div style={{ display: "flex", gap: 2, marginTop: 2, height: 4, alignItems: "center" }}>
                    {primaryDot && (
                      <span style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: primaryDot, flexShrink: 0 }}/>
                    )}
                    {filterDots.map((color, di) => (
                      <span key={di} style={{ width: 3.5, height: 3.5, borderRadius: "50%", background: color, flexShrink: 0 }}/>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  /* -- Render one full year block (optional bold header + month grid) -- */
  const renderYearBlock = (yr, columns, compact, showHeader) => {
    const { monthFirstDow, monthLen } = buildYearMeta(yr);
    return (
      <div key={yr}>
        {showHeader && (
          <div style={{
            fontSize: 13, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.2px",
            marginBottom: 14, paddingBottom: 8, borderBottom: "1px solid var(--mist)",
          }}>{yr}</div>
        )}
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: compact ? "20px 20px" : "28px 32px",
        }}>
          {Array.from({ length: 12 }, (_, mi) => renderMonth(mi, yr, monthFirstDow, monthLen, compact))}
        </div>
      </div>
    );
  };

  /* -- 1 Year --------------------------------------------------------- */
  if (yearSpan === 1) {
    return (
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, padding: "22px 24px 26px",
      }}>
        {renderYearBlock(2026, 4, false, false)}
      </div>
    );
  }

  /* -- 2 Years (stacked vertically, year header above each) ----------- */
  if (yearSpan === 2) {
    return (
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, padding: "22px 24px 26px",
        display: "flex", flexDirection: "column", gap: 36,
      }}>
        {[2026, 2027].map(yr => renderYearBlock(yr, 4, false, true))}
      </div>
    );
  }

  /* -- 4 Years (2x2 year grid, 3-col month grid, compact) ------------- */
  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 12, padding: "22px 24px 26px",
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "36px 40px" }}>
        {[2026, 2027, 2028, 2029].map(yr => renderYearBlock(yr, 3, true, true))}
      </div>
    </div>
  );
}
/* -------- AGENDA — inline expanded detail panel -------- */
function CAL_AgendaDetail({ ev, L }) {
  const isFlexStudy = ev.eventType === "flexstudy";
  const isFieldTrip = ev.eventType === "fieldtrip";

  const metaFields = [
    ev.time && !ev.isAllDay && { icon: "Clock",  label: "Time",      value: ev.time },
    ev.teacher               && { icon: "User",   label: "Teacher",   value: ev.teacher },
    ev.room                  && { icon: "MapPin", label: "Room",      value: ev.room },
    ev.note                  && { icon: "Book",   label: "Note",      value: ev.note },
    ev.attendees             && { icon: "User",   label: "Attendees", value: `${ev.attendees} students` },
  ].filter(Boolean);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Meta fields */}
      {metaFields.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 28px" }}>
          {metaFields.map((f, i) => {
            const Ico = I[f.icon] || I.Clock;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5 }}>
                <Ico size={13} color="var(--stone)"/>
                <span style={{ color: "var(--stone)", fontWeight: 500 }}>{f.label}:</span>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{f.value}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* AI tools — flex study only */}
      {isFlexStudy && (
        <div>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>AI Study Tools</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {[
              { label: "Study Planner",  icon: "Sparkle"    },
              { label: "Practice Quiz",  icon: "ListChecks" },
              { label: "Flashcards",     icon: "Book"       },
            ].map((tool) => {
              const Ico = I[tool.icon] || I.Sparkle;
              return (
                <button key={tool.label} style={{
                  padding: "5px 12px", borderRadius: 7,
                  border: "1px solid var(--student-200)", background: "var(--paper)",
                  color: "var(--student-deep)", fontSize: 11.5, fontWeight: 600,
                  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
                }}>
                  <Ico size={11} color="var(--student-deep)"/> {tool.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Trip reminder — field trips only */}
      {isFieldTrip && (
        <div style={{
          fontSize: 12, color: "var(--stone)", padding: "8px 12px",
          background: "var(--paper)", borderRadius: 8, border: "1px solid var(--mist)",
          lineHeight: 1.5,
        }}>
          <span style={{ fontWeight: 600, color: "var(--ink)" }}>Reminder: </span>
          Bring permission slip, bag lunch, and comfortable shoes. Bus departs 3:30 PM from front entrance.
        </div>
      )}

      {/* Quick actions */}
      <div style={{ display: "flex", gap: 7 }}>
        <button style={{
          padding: "5px 12px", borderRadius: 7,
          border: `1px solid ${L.border}`, background: L.bg,
          color: L.color, fontSize: 11.5, fontWeight: 600, cursor: "pointer",
        }}>View Details</button>
        <button style={{
          padding: "5px 12px", borderRadius: 7,
          border: "1px solid var(--mist)", background: "transparent",
          color: "var(--stone)", fontSize: 11.5, fontWeight: 600, cursor: "pointer",
        }}>Edit</button>
      </div>
    </div>
  );
}

/* -------- AGENDA view (chronological flat list) -------- */
function CAL_AgendaView({ activeLayers, onOpenModal }) {
  const [isLoading] = React.useState(false); // flip to true to preview skeleton

  const DOW_LONG = {
    Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday",
    Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
  };

  // Build day groups from week data
  const groups = CAL_DAYS.map((d) => {
    const allday = calAllDayForDay(d.idx, activeLayers).map((a, i) => ({
      ...a, id: `allday-${d.idx}-${i}`, isAllDay: true,
    }));
    const timed = calEventsForDay(d.idx, activeLayers)
      .sort((a, b) => a.start - b.start);
    return { day: d, events: [...allday, ...timed] };
  }).filter((g) => g.events.length > 0);

  /* ---- Loading skeleton ---- */
  if (isLoading) {
    const Skel = ({ w, h }) => (
      <div style={{ width: w, height: h, borderRadius: 5, background: "var(--bone)" }}/>
    );
    return (
      <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 12, overflow: "hidden" }}>
        {[3, 2, 2].map((rowCount, gi) => (
          <div key={gi} style={{ borderTop: gi > 0 ? "2px solid var(--mist)" : "none" }}>
            {/* Header skeleton */}
            <div style={{ padding: "12px 20px", background: "var(--bone)", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 12 }}>
              <Skel w={160} h={13}/>
              <div style={{ marginLeft: "auto" }}><Skel w={52} h={11}/></div>
            </div>
            {/* Row skeletons */}
            {Array.from({ length: rowCount }).map((_, ri) => (
              <div key={ri} style={{ display: "flex", alignItems: "center", minHeight: 62, borderBottom: "1px solid var(--mist)" }}>
                <div style={{ width: 4, alignSelf: "stretch", background: "var(--mist)", flexShrink: 0 }}/>
                <div style={{ width: 140, padding: "0 12px 0 14px", flexShrink: 0 }}>
                  <Skel w={82} h={11}/>
                </div>
                <div style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: 7 }}>
                  <Skel w="52%" h={13}/>
                  <Skel w="32%" h={10}/>
                </div>
                <div style={{ width: 55, display: "flex", justifyContent: "center" }}>
                  <Skel w={16} h={16}/>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  /* ---- Empty state ---- */
  if (groups.length === 0) {
    return (
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 12,
        padding: "60px 40px", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10, minHeight: 300, textAlign: "center",
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: "var(--bone)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <I.CalendarOff size={22} color="var(--silver)"/>
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>No events scheduled for this period.</div>
        <div style={{ fontSize: 13, color: "var(--stone)", maxWidth: 360 }}>
          Try toggling on more filter chips above to see events.
        </div>
      </div>
    );
  }

  /* ---- Full list ---- */
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 12, overflow: "hidden" }}>
      {groups.map((group, gi) => {
        const { day, events } = group;
        const dateLabel = `${DOW_LONG[day.dow]}, May ${day.date}`;
        return (
          <div key={day.idx}>
            {/* ── Date group header ── */}
            <div style={{
              padding: "11px 20px",
              background: day.isToday ? "var(--student-50)" : "var(--bone)",
              borderTop: gi > 0 ? "2px solid var(--mist)" : "none",
              borderBottom: "1px solid var(--mist)",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{
                fontSize: 13, fontWeight: 700,
                color: day.isToday ? "var(--student-deep)" : "var(--ink)",
              }}>{dateLabel}</span>
              {day.isToday && (
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: "2px 8px",
                  borderRadius: 999, background: "var(--student)", color: "#fff",
                }}>Today</span>
              )}
              <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--stone)", fontWeight: 500 }}>
                {events.length} event{events.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* ── Event rows ── */}
            {events.map((ev, ei) => {
              const L = calLayerStyle(ev.layer);
              const isLast = ei === events.length - 1 && gi === groups.length - 1;
              return (
                <div key={ev.id} style={{ borderBottom: isLast ? "none" : "1px solid var(--mist)" }}>

                  {/* Clickable row — opens modal on click */}
                  <button
                    onClick={() => { if (onOpenModal) onOpenModal(ev); }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center",
                      background: "transparent",
                      border: "none", padding: 0, cursor: "pointer", textAlign: "left",
                      transition: "background 100ms", fontFamily: "inherit",
                    }}
                  >
                    {/* Colored left bar */}
                    <div style={{ width: 4, alignSelf: "stretch", flexShrink: 0, background: L.color }}/>

                    {/* Time column */}
                    <div style={{ width: 140, padding: "14px 12px 14px 14px", flexShrink: 0 }}>
                      <span style={{ fontSize: 11.5, fontWeight: 500, color: "var(--stone)", whiteSpace: "nowrap" }}>
                        {ev.isAllDay ? "All Day" : (ev.time || "")}
                      </span>
                    </div>

                    {/* Title + subtitle */}
                    <div style={{ flex: 1, minWidth: 0, padding: "14px 0" }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>
                        {ev.title}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                        {/* Layer chip */}
                        <span style={{
                          fontSize: 10.5, fontWeight: 600, padding: "1px 8px", borderRadius: 999,
                          background: L.bg, color: L.color, border: `1px solid ${L.border}`,
                          lineHeight: 1.55, whiteSpace: "nowrap",
                        }}>{L.label}</span>
                        {/* Location / teacher / note */}
                        {(ev.teacher || ev.note || ev.room) && (
                          <span style={{ fontSize: 11.5, color: "var(--stone)" }}>
                            {ev.teacher
                              ? `${ev.teacher}${ev.room ? " · " + ev.room : ""}`
                              : ev.note}
                          </span>
                        )}
                        {ev.attendees && (
                          <span style={{ fontSize: 11.5, color: "var(--stone)" }}>
                            {ev.attendees} attendees
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Open modal arrow */}
                    <div style={{ padding: "0 20px", flexShrink: 0, display: "flex", alignItems: "center" }}>
                      <I.ChevronRight size={14} color="var(--silver)"/>
                    </div>
                  </button>

                  {/* Health privacy note — always visible, indented to title column */}
                  {ev.layer === "health" && (
                    <div style={{
                      paddingLeft: 158, paddingBottom: 8, paddingTop: 2,
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <I.Lock size={10} color="var(--stone)"/>
                      <span style={{
                        fontSize: 10.5, color: "var(--stone)",
                        fontStyle: "italic", letterSpacing: 0.1,
                      }}>Private — Only visible to you and your guardian</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   CAL_EventModal — per-type centered overlay
   Shared shell: colored icon · title · layer chip · × close · dim backdrop
   Footer: type-specific CTAs + "Add to To Do" secondary
   ============================================================ */

/* ─── Shared sub-components ─── */

function ModalMiniMap({ roomLabel, layerColor, layerBg }) {
  const cells = [
    { label: "Office",   bg: "#FFF7ED", bd: "#FED7AA" },
    { label: "",         bg: "#F8FAFC", bd: "#E2E8F0" },
    { label: "Library",  bg: "#F0FDF4", bd: "#BBF7D0" },
    { label: "",         bg: "#F8FAFC", bd: "#E2E8F0" },
    { label: roomLabel,  bg: layerBg,   bd: layerColor, hi: true },
    { label: "",         bg: "#F8FAFC", bd: "#E2E8F0" },
    { label: "Entrance", bg: "#EFF6FF", bd: "#BFDBFE", ent: true },
    { label: "",         bg: "#F8FAFC", bd: "#E2E8F0" },
    { label: "Gym",      bg: "#F0FDF4", bd: "#BBF7D0" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 3 }}>
        {cells.map((c, i) => (
          <div key={i} style={{
            height: 44, borderRadius: 5, position: "relative",
            background: c.bg, border: `1.5px solid ${c.hi ? layerColor : c.bd}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, fontWeight: c.hi ? 700 : 400,
            color: c.hi ? layerColor : "#94A3B8",
          }}>
            {c.label}
            {c.ent && (
              <div style={{
                position: "absolute", bottom: 5, right: 5,
                width: 8, height: 8, borderRadius: "50%",
                background: "#3B82F6", border: "1.5px solid #fff",
              }}/>
            )}
          </div>
        ))}
      </div>
      <a href="#" onClick={e => e.preventDefault()} style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        marginTop: 7, fontSize: 11.5, fontWeight: 600,
        color: layerColor, textDecoration: "none",
      }}>
        <I.Navigation size={11} color={layerColor}/> Get directions →
      </a>
    </div>
  );
}

/* Street-map style (Google Maps lite) — used for off-campus destinations */
function ModalStreetMap({ label, layerColor }) {
  return (
    <div>
      <div style={{
        width: "100%", height: 196, borderRadius: 10, overflow: "hidden",
        background: "#F1F3F0", position: "relative", border: "1px solid #D4DAE1",
      }}>
        {/* City-block silhouettes */}
        <div style={{ position:"absolute", top:"8%",  left:"3%",  width:"22%", height:"28%", background:"#DDE2DA", borderRadius:3 }}/>
        <div style={{ position:"absolute", top:"8%",  left:"32%", width:"18%", height:"28%", background:"#D7DDD7", borderRadius:3 }}/>
        <div style={{ position:"absolute", top:"8%",  right:"3%", width:"24%", height:"28%", background:"#DDE2DA", borderRadius:3 }}/>
        <div style={{ position:"absolute", bottom:"8%", left:"3%",  width:"18%", height:"22%", background:"#D7DDD7", borderRadius:3 }}/>
        <div style={{ position:"absolute", bottom:"8%", right:"3%", width:"28%", height:"22%", background:"#DDE2DA", borderRadius:3 }}/>
        {/* Roads */}
        <div style={{ position:"absolute", top:"42%", left:0, right:0, height:14, background:"#fff" }}/>
        <div style={{ position:"absolute", bottom:"20%", left:0, right:0, height:8, background:"#fff", opacity:.75 }}/>
        <div style={{ position:"absolute", left:"28%", top:0, bottom:0, width:14, background:"#fff" }}/>
        <div style={{ position:"absolute", right:"20%", top:0, bottom:0, width:8, background:"#fff", opacity:.75 }}/>
        {/* Center-line dashes */}
        <div style={{ position:"absolute", top:"48.5%", left:0, right:0, height:1, background:"#E9B84A", opacity:.45 }}/>
        <div style={{ position:"absolute", left:"34.5%", top:0, bottom:0, width:1, background:"#E9B84A", opacity:.45 }}/>
        {/* Destination pin */}
        <div style={{
          position:"absolute", top:"29%", left:"28%",
          transform:"translate(-50%, -100%)",
          display:"flex", flexDirection:"column", alignItems:"center",
          zIndex: 2,
        }}>
          <div style={{
            background: layerColor, color:"#fff",
            borderRadius:999, padding:"2px 8px",
            fontSize:9, fontWeight:700, whiteSpace:"nowrap",
            boxShadow:"0 2px 6px rgba(0,0,0,.22)", marginBottom:3,
          }}>{label}</div>
          <div style={{
            width:13, height:13, borderRadius:"50%",
            background: layerColor, border:"2.5px solid #fff",
            boxShadow:"0 2px 8px rgba(0,0,0,.28)",
          }}/>
          <div style={{ width:2, height:7, background:layerColor, opacity:.5 }}/>
        </div>
        {/* Scale bar */}
        <div style={{
          position:"absolute", bottom:8, left:10,
          display:"flex", alignItems:"center", gap:4,
          background:"rgba(255,255,255,.88)", borderRadius:4, padding:"2px 6px",
        }}>
          <div style={{ width:28, height:2, background:"#64748B", borderRadius:1 }}/>
          <span style={{ fontSize:9, color:"#64748B", fontWeight:600 }}>100 m</span>
        </div>
      </div>
      <a href="#" onClick={e => e.preventDefault()} style={{
        display:"inline-flex", alignItems:"center", gap:4,
        marginTop:7, fontSize:11.5, fontWeight:600,
        color: layerColor, textDecoration:"none",
      }}>
        <I.Navigation size={11} color={layerColor}/> Get directions →
      </a>
    </div>
  );
}

function MetaRow({ icon, children }) {
  const Ico = I[icon] || I.Calendar;
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13 }}>
      <Ico size={14} color="var(--stone)" style={{ marginTop: 1, flexShrink: 0 }}/>
      <span style={{ color: "var(--slate)", fontWeight: 500, lineHeight: 1.4 }}>{children}</span>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: 10.5, fontWeight: 700, color: "var(--stone)",
      textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
    }}>{children}</div>
  );
}

function YellowBanner({ children }) {
  return (
    <div style={{
      padding: "9px 12px", borderRadius: 8,
      background: "#FFFBEB", border: "1px solid #FDE68A",
      fontSize: 12.5, color: "#92400E", lineHeight: 1.4,
    }}>{children}</div>
  );
}

function CalEvFileRow({ icon, bg, fg, title, sub, last }) {
  const Ico = I[icon] || I.File;
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10,
      padding: "8px 10px", borderRadius: 9,
      background: "var(--bone)", border: "1px solid var(--mist)",
      marginBottom: last ? 0 : 6, cursor: "pointer",
    }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: bg, flexShrink: 0,
        display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <Ico size={13} color={fg}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{title}</div>
        <div style={{ fontSize: 10.5, color: "var(--stone)", marginTop: 1 }}>{sub}</div>
      </div>
      <I.ChevronRight size={13} color="var(--silver)"/>
    </div>
  );
}

/* ─── Body: Classes ─── */
function ModalBodyClasses({ ev, L, dayLabel }) {
  const TOPICS = {
    "Algebra II":  "Quadratic Equations — Chapter 6",
    "Biology 101": "Cellular Respiration — Chapter 9",
    "Chemistry":   "Reaction Rates & Equilibrium — Chapter 7",
    "English 10":  "Shakespeare: Hamlet — Act III",
    "US History":  "WWII: The Pacific Theater — Chapter 12",
  };
  const topic = TOPICS[ev.title] || "Current Unit";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time    && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        {ev.teacher && <MetaRow icon="User">{ev.teacher}</MetaRow>}
        {ev.room    && <MetaRow icon="MapPin">{ev.room} · Main Building</MetaRow>}
      </div>

      <div>
        <SectionLabel>Today's Topic</SectionLabel>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", borderRadius: 9,
          background: L.bg, border: `1px solid ${L.border}`,
        }}>
          <I.Book size={14} color={L.color}/>
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{topic}</span>
        </div>
      </div>

      <YellowBanner>📌 Bring your textbook tomorrow — we start the next chapter</YellowBanner>

      <div>
        <SectionLabel>Campus Map</SectionLabel>
        <ModalMiniMap roomLabel={ev.room || "Classroom"} layerColor={L.color} layerBg={L.bg}/>
      </div>
    </div>
  );
}

/* ─── Body: Assignments ─── */
function ModalBodyAssignments({ ev, L, dayLabel }) {
  const INFO = {
    "Biology Lab Report": { status: "due-today", course: "Biology 101 · Ms. Lopez",   desc: "Write a full lab report from the May 10 microscopy lab. Include hypothesis, procedure, and results analysis.", progress: 40 },
    "Math Problem Set":   { status: "overdue",   course: "Algebra II · Mr. Kim",       desc: "Complete problems 1–20 on quadratic functions showing all work. Factoring, vertex form, and graphing required.", progress: 60 },
    "History Essay":      { status: "overdue",   course: "US History · Mr. Johnson",   desc: "Write a 3-page essay analyzing the causes of World War I. Use at least 3 primary sources.", progress: 20 },
  };
  const info = INFO[ev.title] || { status: null, course: "Your Course", desc: "Complete the assigned work per the instructions provided in class.", progress: 0 };
  const CHIPS = {
    "due-today": { label: "Due Today", bg: "#FFF7ED", color: "#EA8C2A", border: "#FED7AA" },
    "overdue":   { label: "Overdue",   bg: "#FEF3F2", color: "#E04C4C", border: "#FECDCA" },
  };
  const chip = CHIPS[info.status] || { label: "Upcoming", bg: "#F0FDF4", color: "#16A34A", border: "#BBF7D0" };
  const allDayMatch = (typeof window !== "undefined" && window.CAL_ALLDAY || []).find(a => a.title === ev.title);
  const dueDay = allDayMatch && typeof allDayMatch.day === "number" ? CAL_DAYS[allDayMatch.day] : null;
  const dueLabel = dueDay ? `May ${dueDay.date}, 2026` : dayLabel || "—";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <MetaRow icon="Calendar">Due {dueLabel}</MetaRow>
        <MetaRow icon="Book">{info.course}</MetaRow>
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 24 }}>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 999,
            background: chip.bg, color: chip.color, border: `1px solid ${chip.border}`,
          }}>{chip.label}</span>
        </div>
      </div>

      <div>
        <SectionLabel>Assignment</SectionLabel>
        <p style={{ margin: 0, fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55 }}>{info.desc}</p>
      </div>

      {info.progress > 0 && (
        <div>
          <SectionLabel>Progress</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ flex: 1, height: 6, borderRadius: 99, background: "var(--mist)" }}>
              <div style={{ width: `${info.progress}%`, height: "100%", borderRadius: 99, background: L.color }}/>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: L.color, minWidth: 32 }}>{info.progress}%</span>
          </div>
        </div>
      )}

      <div>
        <SectionLabel>Files &amp; Resources</SectionLabel>
        <CalEvFileRow icon="File"     bg="#F5F3FF" fg="#7C3AED" title="Assignment Instructions" sub="PDF · 2 pages"/>
        <CalEvFileRow icon="Document" bg="#EFF6FF" fg="#3B82F6" title="Rubric"                  sub="Google Doc"/>
        <CalEvFileRow icon="Notes"    bg="#F0FDF4" fg="#16A34A" title="My Notes"                sub="Updated May 12" last={true}/>
      </div>
    </div>
  );
}

/* ─── Body: Exams ─── */
function ModalBodyExams({ ev, L, dayLabel, examChecks, setExamChecks }) {
  const EXAM_DATA = {
    "Chemistry Quiz": { location: "Room 203", topics: ["Chapter 5 — Reaction Rates", "Lab Safety & Procedures", "Balancing Chemical Equations", "Periodic Trends"] },
    "Biology Exam":   { location: "Room 215", topics: ["Chapter 9 — Cellular Respiration", "Chapter 8 — Photosynthesis", "Lab Report Terminology", "Scientific Method"] },
  };
  const data = EXAM_DATA[ev.title] || { location: ev.room || "TBD", topics: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"] };
  const toggle = (i) => { const n = [...examChecks]; n[i] = !n[i]; setExamChecks(n); };
  const courseName = ev.title.replace(" Quiz","").replace(" Exam","");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        <MetaRow icon="Book">{courseName}</MetaRow>
        <MetaRow icon="MapPin">{data.location}</MetaRow>
      </div>

      <div>
        <SectionLabel>Topics Covered</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {data.topics.map((t, i) => (
            <button key={i} onClick={() => toggle(i)} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 11px", borderRadius: 8, cursor: "pointer",
              background: examChecks[i] ? "var(--bone)" : "var(--paper)",
              border: "1px solid var(--mist)",
              textAlign: "left", fontFamily: "inherit",
            }}>
              <div style={{
                width: 16, height: 16, borderRadius: 4, flexShrink: 0,
                background: examChecks[i] ? L.color : "transparent",
                border: examChecks[i] ? "none" : "1.5px solid var(--silver)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {examChecks[i] && <I.Check size={10} color="#fff"/>}
              </div>
              <span style={{ fontSize: 12.5, color: examChecks[i] ? "var(--stone)" : "var(--ink)", textDecoration: examChecks[i] ? "line-through" : "none" }}>{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>Study Materials</SectionLabel>
        <CalEvFileRow icon="Notes" bg={L.bg}      fg={L.color}   title="Class Notes"    sub="Updated this week"/>
        <CalEvFileRow icon="Edit"  bg="#EFF6FF"   fg="#3B82F6"   title="Practice Test"  sub="PDF · 10 questions" last={true}/>
      </div>
    </div>
  );
}

/* ─── Body: Activities ─── */
function ModalBodyActivities({ ev, L, dayLabel, noteText, setNoteText }) {
  const DATA = {
    "Club Meeting":      { location: "Robotics Lab — Building C", reminder: "Bring your laptop and last week's project files.", attendees: 14, dest: "Robotics Lab" },
    "Museum Field Trip": { location: "City Science Museum",        reminder: "Bring permission slip and bag lunch. Bus departs 3:30 PM from front entrance.", attendees: ev.attendees || 28, dest: "Museum" },
    "Soccer Practice":   { location: "Athletic Field — North Campus", reminder: "Bring cleats, water bottle, and shin guards.", attendees: 18, dest: "Soccer Field" },
  };
  const data = DATA[ev.title] || { location: ev.note || "TBD", reminder: "Check with your organizer for details.", attendees: ev.attendees || 12, dest: "Destination" };
  const AV_COLORS = ["#F87171","#60A5FA","#FBBF24","#34D399","#A78BFA"];
  const AV_INITIALS = ["MP","JS","RC","KB","SL"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        <MetaRow icon="MapPin">{data.location}</MetaRow>
      </div>

      <div>
        <SectionLabel>Location</SectionLabel>
        {ev.eventType === "fieldtrip"
          ? <ModalStreetMap label={data.dest} layerColor={L.color}/>
          : <ModalMiniMap roomLabel={data.dest} layerColor={L.color} layerBg={L.bg}/>
        }
      </div>

      <div>
        <SectionLabel>Attendees</SectionLabel>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {AV_COLORS.slice(0,4).map((c,i) => (
              <div key={i} style={{
                width: 26, height: 26, borderRadius: "50%", background: c,
                border: "2px solid var(--paper)", marginLeft: i === 0 ? 0 : -8,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, fontWeight: 700, color: "#fff",
              }}>{AV_INITIALS[i]}</div>
            ))}
          </div>
          <span style={{ fontSize: 12, color: "var(--stone)", fontWeight: 500, marginLeft: 4 }}>{data.attendees} students attending</span>
        </div>
      </div>

      <YellowBanner>📋 {data.reminder}</YellowBanner>

      <div>
        <SectionLabel>Notes</SectionLabel>
        <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note..."
          style={{
            width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 9,
            border: "1px solid var(--mist)", background: "var(--bone)",
            fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5,
            resize: "vertical", minHeight: 68, fontFamily: "inherit", outline: "none",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Body: Personal ─── */
function ModalBodyPersonal({ ev, L, dayLabel, noteText, setNoteText }) {
  const isMultiDay = typeof ev.endDay === "number";
  const startDay = typeof ev.day === "number" ? CAL_DAYS[ev.day] : null;
  const endDayObj = isMultiDay && typeof ev.endDay === "number" ? CAL_DAYS[ev.endDay] : null;
  const dateRangeLabel = isMultiDay && startDay && endDayObj
    ? `${startDay.dow}, May ${startDay.date} – ${endDayObj.dow}, May ${endDayObj.date}`
    : dayLabel;
  const duration = isMultiDay && startDay && endDayObj
    ? `${ev.endDay - ev.day + 1} days`
    : null;
  const hasLoc = !isMultiDay && !!(ev.note && ev.note !== "Work Session");
  const FAMILY_AVATARS = [
    { initials: "JD", bg: "#F87171" },
    { initials: "JM", bg: "#60A5FA" },
    { initials: "AJ", bg: "#FBBF24" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <MetaRow icon="Calendar">{dateRangeLabel}</MetaRow>
        {!isMultiDay && ev.time && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        {duration && <MetaRow icon="Clock">{duration}</MetaRow>}
      </div>

      <div>
        <SectionLabel>Location</SectionLabel>
        {(isMultiDay || hasLoc) ? (
          <div>
            <MetaRow icon="MapPin">{isMultiDay ? "Family Vacation" : ev.note}</MetaRow>
            <div style={{ marginTop: 8 }}>
              {isMultiDay
            ? <ModalStreetMap label="Family Vacation" layerColor={L.color}/>
            : <ModalMiniMap roomLabel={ev.note} layerColor={L.color} layerBg={L.bg}/>
          }
            </div>
          </div>
        ) : (
          <div style={{
            padding: "12px 14px", borderRadius: 9,
            background: "var(--bone)", border: "1px solid var(--mist)",
            fontSize: 12.5, color: "var(--stone)", fontStyle: "italic",
          }}>No location set</div>
        )}
      </div>

      {isMultiDay && (
        <div>
          <SectionLabel>Who's Coming</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {FAMILY_AVATARS.map((av, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%", background: av.bg,
                  border: "2px solid var(--paper)", marginLeft: i === 0 ? 0 : -8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#fff",
                }}>{av.initials}</div>
              ))}
            </div>
            <span style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 600 }}>
              👨‍👩‍👧 Johnson Family
            </span>
          </div>
        </div>
      )}

      <div>
        <SectionLabel>Notes</SectionLabel>
        <textarea value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note..."
          style={{
            width: "100%", boxSizing: "border-box", padding: "10px 12px", borderRadius: 9,
            border: "1px solid var(--mist)", background: "var(--bone)",
            fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5,
            resize: "vertical", minHeight: 72, fontFamily: "inherit", outline: "none",
          }}
        />
      </div>

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 12px", borderRadius: 9,
        background: "var(--bone)", border: "1px solid var(--mist)",
      }}>
        <span style={{ fontSize: 12.5, color: "var(--ink)", display: "flex", alignItems: "center", gap: 7 }}>
          <I.Bell size={13} color="var(--stone)"/>
          Reminder: {isMultiDay ? "1 day before" : "30 min before"}
        </span>
        <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 11.5, fontWeight: 600, color: L.color, textDecoration: "none" }}>Edit</a>
      </div>
    </div>
  );
}

/* ─── Body: Community Service ─── */
function ModalBodyCommunityService({ ev, L, dayLabel }) {
  const totalHours = 24;
  const goalHours  = 40;
  const pct = Math.round((totalHours / goalHours) * 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        {ev.note   && <MetaRow icon="MapPin">{ev.note}</MetaRow>}
      </div>

      {/* Type badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        padding: "8px 12px", borderRadius: 9,
        background: L.bg, border: `1px solid ${L.border}`,
        alignSelf: "flex-start",
      }}>
        <I.HeartHandshake size={14} color={L.color}/>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: L.color }}>Volunteer Shift</span>
      </div>

      {/* Hours progress */}
      <div>
        <SectionLabel>Graduation Hours Progress</SectionLabel>
        <div style={{ padding: "14px 16px", borderRadius: 10, background: L.bg, border: `1px solid ${L.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: L.color }}>{totalHours} hrs</span>
            <span style={{ fontSize: 12, color: "var(--stone)", fontWeight: 500 }}>of {goalHours} hr goal</span>
          </div>
          <div style={{ height: 8, borderRadius: 99, background: "var(--mist)", overflow: "hidden" }}>
            <div style={{ width: `${pct}%`, height: "100%", borderRadius: 99, background: L.color }}/>
          </div>
          <div style={{ marginTop: 6, fontSize: 11, color: "var(--stone)", fontWeight: 500 }}>
            {goalHours - totalHours} hrs remaining toward graduation requirement
          </div>
        </div>
      </div>

      {/* This shift */}
      <div>
        <SectionLabel>This Shift</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { icon: "HeartHandshake", label: "Organization", value: ev.title === "Boys & Girls Club" ? "Boys & Girls Club" : "Riverside Clean-Up Crew" },
            { icon: "Clock",          label: "Duration",      value: ev.note || "3 hours" },
            { icon: "MapPin",         label: "Type",          value: "Community Engagement" },
          ].map((r, i) => {
            const Ico = I[r.icon] || I.Info;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 8, background: "var(--bone)", border: "1px solid var(--mist)" }}>
                <div style={{ width: 28, height: 28, borderRadius: 7, background: L.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ico size={13} color={L.color}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 600 }}>{r.label}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{r.value}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Link to extracurriculars */}
      <a href="#" onClick={e => e.preventDefault()} style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 12px", borderRadius: 9,
        background: "var(--bone)", border: "1px solid var(--mist)",
        fontSize: 12.5, fontWeight: 600, color: L.color, textDecoration: "none",
      }}>
        <I.ChevronRight size={13} color={L.color}/> View My Activities & Service Record →
      </a>
    </div>
  );
}

/* ─── Body: Presentations / Meetings ─── */
function ModalBodyPresentation({ ev, L, dayLabel }) {
  const typeMap = {
    "Biology Lab Presentation": "Student Presentation",
    "Advisor Check-in":         "Advisor Check-in",
    "Group Project Review":     "Group Collaboration",
  };
  const type = typeMap[ev.title] || "Student Presentation";
  const isVirtual = ev.note && ev.note.toLowerCase().includes("virtual");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        {ev.room   && <MetaRow icon="MapPin">{ev.room} · Main Building</MetaRow>}
        {ev.note   && <MetaRow icon="Info">{ev.note}</MetaRow>}
      </div>

      {/* Type + format */}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 999,
          background: L.bg, border: `1px solid ${L.border}`,
        }}>
          <I.MonitorPlay size={12} color={L.color}/>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: L.color }}>{type}</span>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 999,
          background: isVirtual ? "#EFF6FF" : "#F0FDF4",
          border: isVirtual ? "1px solid #BFDBFE" : "1px solid #BBF7D0",
        }}>
          {isVirtual ? <I.Video size={12} color="#3B82F6"/> : <I.MapPin size={12} color="#16A34A"/>}
          <span style={{ fontSize: 11.5, fontWeight: 600, color: isVirtual ? "#1D4ED8" : "#15803D" }}>{isVirtual ? "Virtual" : "In-Person"}</span>
        </div>
      </div>

      {/* Preparation resources */}
      <div>
        <SectionLabel>Preparation</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <CalEvFileRow icon="File"    bg="#FEF3F2" fg="#E04C4C" title="Presentation Rubric" sub="PDF · 2 pages"/>
          <CalEvFileRow icon="File"    bg="#F5F3FF" fg="#7C3AED" title="Project Brief"       sub="Google Doc"/>
          <CalEvFileRow icon="Monitor" bg={L.bg}    fg={L.color} title="Slide Deck"          sub="Google Slides" last/>
        </div>
      </div>

      {/* Attendees (if group) */}
      {type !== "Advisor Check-in" && (
        <div>
          <SectionLabel>Group Members</SectionLabel>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {[
                { initials: "AJ", bg: "#F87171" },
                { initials: "MP", bg: "#60A5FA" },
                { initials: "RC", bg: "#FBBF24" },
                { initials: "KB", bg: "#34D399" },
              ].map((av, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: "50%", background: av.bg,
                  border: "2px solid var(--paper)", marginLeft: i === 0 ? 0 : -8,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, fontWeight: 700, color: "#fff",
                }}>{av.initials}</div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "var(--stone)", marginLeft: 4 }}>4 members · Group 2</span>
          </div>
        </div>
      )}

      {/* Related assignment link */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 12px", borderRadius: 9,
        background: "var(--bone)", border: "1px solid var(--mist)",
      }}>
        <div style={{ width: 32, height: 32, borderRadius: 7, background: "#FEF3F2", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <I.File size={14} color="#E04C4C"/>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Biology Lab Report</div>
          <div style={{ fontSize: 10.5, color: "var(--stone)" }}>Related assignment</div>
        </div>
        <I.ChevronRight size={13} color="var(--stone)"/>
      </div>
    </div>
  );
}

/* ─── Body: Field Studies ─── */
function ModalBodyFieldStudy({ ev, L, dayLabel }) {
  const isOverdue = ev.status === "overdue";
  const deliverables = [
    { label: "Data collection sheet",       done: true  },
    { label: "Site sketch / photos",        done: true  },
    { label: "Analysis write-up (2 pages)", done: false },
    { label: "Final report submitted",      done: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        {ev.note   && <MetaRow icon="MapPin">{ev.note}</MetaRow>}
      </div>

      {/* Type badge */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 999,
          background: L.bg, border: `1px solid ${L.border}`,
        }}>
          <I.MapPin size={12} color={L.color}/>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: L.color }}>Field Day</span>
        </div>
        {isOverdue ? (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 10px", borderRadius: 999,
            background: "#FEF2F2", border: "1px solid #FECACA",
          }}>
            <I.AlertTriangle size={12} color="#DC2626"/>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#DC2626" }}>Overdue</span>
          </div>
        ) : (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "5px 10px", borderRadius: 999,
            background: "#F0FDF4", border: "1px solid #BBF7D0",
          }}>
            <I.Check size={12} color="#16A34A"/>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#16A34A" }}>On Track</span>
          </div>
        )}
      </div>

      {/* Deliverables checklist */}
      <div>
        <SectionLabel>Deliverables</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {deliverables.map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 10px", borderRadius: 8,
              background: d.done ? "#F0FDF4" : "var(--bone)",
              border: d.done ? "1px solid #BBF7D0" : "1px solid var(--mist)",
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                background: d.done ? "#16A34A" : "transparent",
                border: d.done ? "none" : "1.5px solid var(--silver)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{d.done && <I.Check size={11} color="#fff"/>}</span>
              <span style={{ fontSize: 12.5, color: d.done ? "var(--stone)" : "var(--ink)", textDecoration: d.done ? "line-through" : "none", fontWeight: d.done ? 400 : 600 }}>
                {d.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Field study name + link */}
      <div>
        <SectionLabel>Field Study</SectionLabel>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: "10px 12px", borderRadius: 9,
          background: L.bg, border: `1px solid ${L.border}`,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: 7, background: "#EEF2FF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.MapPin size={14} color="#6366F1"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Urban Ecology Study</div>
            <div style={{ fontSize: 11, color: "var(--stone)" }}>Environmental Science · Spring 2026</div>
          </div>
          <I.ChevronRight size={13} color={L.color}/>
        </div>
      </div>

      {isOverdue && (
        <YellowBanner>⚠️ This report is overdue. Submit as soon as possible or message your instructor.</YellowBanner>
      )}
    </div>
  );
}

/* ─── Body: Health ─── */
function ModalBodyHealth({ ev, L, dayLabel }) {
  const providers = [
    { initials: "MD", bg: "#7C3AED", name: "Ms. Davis",   role: "School Counselor" },
    { initials: "NW", bg: "#DB2777", name: "Nurse Walsh", role: "School Nurse" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 13px", borderRadius: 9,
        background: "#FDF2F8", border: "1px solid #FBCFE8",
      }}>
        <I.Lock size={13} color="#DB2777"/>
        <span style={{ fontSize: 12, color: "#9D174D", fontWeight: 600 }}>
          Private — Only visible to you and your guardian
        </span>
      </div>

      <div>
        <SectionLabel>Stats</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          <div style={{ padding: "12px", borderRadius: 9, background: "#F1F5F9", border: "1px solid var(--mist)" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>5,234</div>
            <div style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 2, fontWeight: 500 }}>steps today</div>
            <div style={{ fontSize: 11, color: "#14B8A6", marginTop: 6, fontWeight: 700 }}>↑ 12% from yesterday</div>
          </div>
          <div style={{ padding: "12px", borderRadius: 9, background: "#F1F5F9", border: "1px solid var(--mist)" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>2 of 3</div>
            <div style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 2, fontWeight: 500 }}>workouts this week</div>
            <div style={{ fontSize: 11, color: "#16A34A", marginTop: 6, fontWeight: 700 }}>On track ✓</div>
          </div>
        </div>
        <a href="#" onClick={e => e.preventDefault()} style={{
          display: "block", textAlign: "right",
          fontSize: 11.5, fontWeight: 700, color: "#14B8A6", textDecoration: "none",
        }}>View Full Stats →</a>
      </div>

      <div>
        <SectionLabel>My Support Team</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {providers.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 9,
              background: "var(--bone)", border: "1px solid var(--mist)",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", background: p.bg,
                color: "#fff", fontSize: 11, fontWeight: 700, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{p.initials}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{p.name}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{p.role}</div>
              </div>
              <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: 12, fontWeight: 600, color: L.color, textDecoration: "none" }}>Message →</a>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {["View Health Records →", "View My Support Team →"].map((lnk, i) => (
          <a key={i} href="#" onClick={e => e.preventDefault()} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 12px", borderRadius: 9,
            background: "var(--bone)", border: "1px solid var(--mist)",
            fontSize: 12.5, fontWeight: 600, color: L.color, textDecoration: "none",
          }}>
            <I.ChevronRight size={13} color={L.color}/> {lnk}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─── Body: Focus / Study ─── */
function ModalBodyFocus({ ev, L, dayLabel }) {
  const allDay = (typeof window !== "undefined" && window.CAL_ALLDAY) || [];
  const deadlines = allDay.slice(0,2).map(a => ({
    title: a.title,
    day: typeof a.day === "number" ? CAL_DAYS[a.day] : null,
    status: a.status,
  }));
  if (!deadlines.length) {
    deadlines.push(
      { title: "Biology Lab Report", day: CAL_DAYS[0], status: "due-today" },
      { title: "History Essay",      day: CAL_DAYS[3], status: "overdue" },
    );
  }
  const statusColor = (s) => s === "overdue" ? "#E04C4C" : s === "due-today" ? "#EA8C2A" : "#16A34A";
  const statusLabel = (s) => s === "overdue" ? "Overdue" : s === "due-today" ? "Due Today" : "Upcoming";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel  && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        {ev.note   && <MetaRow icon="Book">{ev.note}</MetaRow>}
      </div>

      <div>
        <SectionLabel>Upcoming Deadlines</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {deadlines.map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", borderRadius: 9,
              background: "var(--bone)", border: "1px solid var(--mist)",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "#FEF3F2", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center" }}>
                <I.ListChecks size={13} color="#E04C4C"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{d.title}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>Due {d.day ? `May ${d.day.date}` : "—"}</div>
              </div>
              <span style={{
                fontSize: 10.5, fontWeight: 700, padding: "2px 8px", borderRadius: 999,
                background: statusColor(d.status) + "22", color: statusColor(d.status),
              }}>{statusLabel(d.status)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel>AI Tools</SectionLabel>
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
          {["Study Planner","Practice Quiz","Flashcards"].map(t => (
            <button key={t} style={{
              padding: "7px 14px", borderRadius: 999,
              border: "1px solid var(--student-200)", background: "var(--paper)",
              color: "var(--student-deep)", fontSize: 12, fontWeight: 600,
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
              fontFamily: "inherit",
            }}>
              <I.Sparkle size={11} color="var(--student-deep)"/> {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Body: School Calendar — Lunch ─── */
function ModalBodyLunch({ ev, L, dayLabel }) {
  const [selectedOption, setSelectedOption] = React.useState("A");
  const OPTIONS = [
    { id: "A", label: "Option A", name: "Grilled Chicken & Rice",    emoji: "🍗", cal: "520 cal" },
    { id: "B", label: "Option B", name: "Veggie Pasta Primavera",    emoji: "🍝", cal: "410 cal" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        <MetaRow icon="MapPin">Main Cafeteria — Building A</MetaRow>
      </div>

      <div>
        <SectionLabel>Today's Menu</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {OPTIONS.map((opt) => {
            const sel = selectedOption === opt.id;
            return (
              <div key={opt.id} onClick={() => setSelectedOption(opt.id)} style={{
                padding: "10px 12px", borderRadius: 10, cursor: "pointer",
                border: sel ? `1.5px solid ${L.color}` : "1.5px solid var(--mist)",
                background: sel ? L.bg : "var(--bone)",
                display: "flex", flexDirection: "column", gap: 4,
              }}>
                <div style={{ fontSize: 20, lineHeight: 1 }}>{opt.emoji}</div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: L.color }}>{opt.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{opt.name}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{opt.cal}</div>
                <button onClick={(e) => { e.stopPropagation(); setSelectedOption(opt.id); }} style={{
                  marginTop: 4, padding: "4px 0", borderRadius: 6, width: "100%",
                  border: sel ? "none" : "1px solid var(--mist)",
                  background: sel ? L.color : "transparent",
                  color: sel ? "#fff" : "var(--slate)",
                  fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4,
                }}>
                  {sel && <I.Check size={10} color="#fff"/>}
                  {sel ? "Selected" : "Select"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <a href="#" onClick={e => e.preventDefault()} style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "9px 12px", borderRadius: 9,
        background: "#F5F3FF", border: "1px solid #DDD6FE",
        fontSize: 12.5, fontWeight: 600, color: "#6D28D9", textDecoration: "none",
      }}>
        <I.Bell size={13} color="#7C3AED"/>
        Pre-order tomorrow's lunch →
      </a>

      <div>
        <SectionLabel>Dietary Restrictions on File</SectionLabel>
        <div style={{
          padding: "10px 12px", borderRadius: 9,
          background: "#FFFBEB", border: "1px solid #FDE68A",
          fontSize: 12.5, color: "#92400E", lineHeight: 1.6,
        }}>
          🥜 Nut allergy on file · 🥛 Lactose intolerance on file
          <br/>
          <a href="#" onClick={e => e.preventDefault()} style={{
            fontSize: 11.5, fontWeight: 700, color: "#92400E", textDecoration: "underline",
          }}>Update preferences →</a>
        </div>
      </div>

      <div>
        <SectionLabel>Location</SectionLabel>
        <ModalMiniMap roomLabel="Cafeteria" layerColor={L.color} layerBg={L.bg}/>
      </div>
    </div>
  );
}

/* ─── Body: School Calendar — Closure / Prof Dev Day ─── */
function ModalBodySchoolClosure({ ev, L, dayLabel }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
      <MetaRow icon="School">Wyndam Park Academy — District-Wide</MetaRow>

      {/* Closure badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "8px 13px", borderRadius: 9,
        background: "#FEF3F2", border: "1px solid #FECDCA",
        alignSelf: "flex-start",
      }}>
        <I.AlertTriangle size={14} color="#DC2626"/>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#B91C1C" }}>No School — Classes Cancelled</span>
      </div>

      {/* Info block */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 9,
        padding: "10px 13px", borderRadius: 9,
        background: "#FFFBEB", border: "1px solid #FDE68A",
      }}>
        <I.Info size={14} color="#D97706" style={{ marginTop: 1, flexShrink: 0 }}/>
        <div style={{ fontSize: 12.5, color: "#92400E", lineHeight: 1.45 }}>
          <strong>Professional Development Day</strong> — Teachers attend district training. All student programs and classes are cancelled. School buildings remain closed.
        </div>
      </div>

      <MetaRow icon="Calendar">Next school day: <strong>Thursday, May 22</strong></MetaRow>

      <div>
        <SectionLabel>What This Means For You</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { icon: "Check",   text: "Classes are cancelled — no need to attend" },
            { icon: "Check",   text: "School buildings are closed to students" },
            { icon: "Check",   text: "Online learning portals remain accessible" },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, padding: "8px 10px", borderRadius: 8, background: "var(--bone)", border: "1px solid var(--mist)" }}>
              <I.Check size={13} color="#16A34A" style={{ marginTop: 2, flexShrink: 0 }}/>
              <span style={{ fontSize: 12.5, color: "var(--slate)" }}>{r.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Body: School Calendar — Assembly / School-Wide Event ─── */
function ModalBodySchoolEvent({ ev, L, dayLabel }) {
  const isFieldDay = ev.title && ev.title.toLowerCase().includes("field day");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        {ev.time   && <MetaRow icon="Clock">{ev.time}</MetaRow>}
        {ev.note   && <MetaRow icon="MapPin">{ev.note}</MetaRow>}
      </div>

      {/* Type badges */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 999,
          background: L.bg, border: `1px solid ${L.border}`,
        }}>
          <I.School size={12} color={L.color}/>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: L.color }}>School Calendar</span>
        </div>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          padding: "5px 10px", borderRadius: 999,
          background: "#F0FDF4", border: "1px solid #BBF7D0",
        }}>
          <I.Check size={12} color="#16A34A"/>
          <span style={{ fontSize: 11.5, fontWeight: 600, color: "#15803D" }}>{isFieldDay ? "All Grades" : "Mandatory · All Grades"}</span>
        </div>
      </div>

      {/* Event description */}
      <div>
        <SectionLabel>About This Event</SectionLabel>
        {isFieldDay ? (
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55 }}>
            Annual Field Day celebration on the Athletic Fields. Activities include team sports, relays, and outdoor games. Wear comfortable athletic clothing and bring sunscreen.
          </p>
        ) : (
          <p style={{ margin: 0, fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55 }}>
            All-school Spring Assembly in the Main Gym. Attendance is required for all students. Includes end-of-year awards, performances, and announcements from administration.
          </p>
        )}
      </div>

      {/* What to bring */}
      <div>
        <SectionLabel>{isFieldDay ? "What to Bring" : "What to Expect"}</SectionLabel>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {(isFieldDay
            ? ["Athletic clothes & sneakers", "Sunscreen & water bottle", "Team spirit — house colors encouraged"]
            : ["All students report to Main Gym by 1:55 PM", "Seating by grade — follow advisor directions", "Phones must be silenced and put away"]
          ).map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 10px", borderRadius: 8, background: "var(--bone)", border: "1px solid var(--mist)" }}>
              <I.Check size={13} color={L.color} style={{ flexShrink: 0 }}/>
              <span style={{ fontSize: 12.5, color: "var(--slate)" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <YellowBanner>📢 Check your advisor's message for any updated instructions before this event.</YellowBanner>
    </div>
  );
}

/* ─── Body: School Calendar — Holiday / No School ─── */
function ModalBodyHoliday({ ev, L, dayLabel }) {
  const nextDay = ev.title && ev.title.includes("Memorial") ? "Tuesday, May 26" : "the next school day";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
      <MetaRow icon="Calendar">Next school day: {nextDay}</MetaRow>
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 9,
        padding: "10px 13px", borderRadius: 9,
        background: "#EFF6FF", border: "1px solid #BFDBFE",
      }}>
        <I.Info size={14} color="#3B82F6" style={{ marginTop: 1, flexShrink: 0 }}/>
        <span style={{ fontSize: 12.5, color: "#1E40AF", lineHeight: 1.45 }}>
          School offices are closed. For emergencies contact:{" "}
          <strong>(555) 123-4567</strong>
        </span>
      </div>
    </div>
  );
}

/* ─── Body: SAT/ACT Exams ─── */
function ModalBodySAT({ ev, L, dayLabel }) {
  const PREP = [
    { icon: "External", bg: "#EFF6FF", fg: "#3B82F6", title: "Official SAT Practice", sub: "Khan Academy →" },
    { icon: "Notes",    bg: "#F5F3FF", fg: "#7C3AED", title: "Class Notes",           sub: "Drive →"        },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {dayLabel && <MetaRow icon="Calendar">{dayLabel}</MetaRow>}
        <MetaRow icon="Clock">8:00 AM – 1:00 PM estimated</MetaRow>
        <MetaRow icon="MapPin">Wyndam Park Academy — Room 201</MetaRow>
      </div>

      <div>
        <SectionLabel>Test Location</SectionLabel>
        <ModalStreetMap label="Room 201" layerColor={L.color}/>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 12px", borderRadius: 9,
        background: "#FEF3F2", border: "1px solid #FECDCA",
      }}>
        <span style={{ fontSize: 14, lineHeight: 1 }}>⚠️</span>
        <span style={{ fontSize: 12.5, color: "#E04C4C", fontWeight: 600 }}>Registration closed</span>
      </div>

      <div>
        <SectionLabel>Prep Resources</SectionLabel>
        {PREP.map((p, i) => (
          <CalEvFileRow key={i} icon={p.icon} bg={p.bg} fg={p.fg} title={p.title} sub={p.sub} last={i === PREP.length - 1}/>
        ))}
      </div>
    </div>
  );
}

/* ─── Main modal ─── */
function CAL_EventModal({ ev, onClose }) {
  const [noteText,   setNoteText]   = React.useState("");
  const [examChecks, setExamChecks] = React.useState([false,false,false,false]);

  const L = calLayerStyle(ev.layer);
  const day = typeof ev.day === "number" ? CAL_DAYS[ev.day] : null;
  const dayLabel = day ? `${day.dow}, May ${day.date}` : "";

  const LAYER_ICON = {
    classes: "Book", assignments: "ListChecks", exams: "Edit",
    activities: "Star", personal: "User", health: "HeartPulse",
    focus: "Sparkle", free: "Sun",
    "school-cal": "Calendar", satact: "Edit",
    "community-service": "HeartHandshake", presentations: "MonitorPlay", "field-studies": "MapPin",
  };
  const iconKey = ev.eventType === "lunch"    ? "Utensils"
                : ev.eventType === "holiday" ? "School"
                : ev.eventType === "closure" ? "AlertTriangle"
                : ev.eventType === "assembly"? "Users"
                : ev.eventType === "district"? "Building"
                : (LAYER_ICON[ev.layer] || "Calendar");
  const HeaderIco = I[iconKey] || I.Calendar;

  React.useEffect(() => {
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const renderBody = () => {
    const props = { ev, L, dayLabel };
    switch (ev.layer) {
      case "classes":     return <ModalBodyClasses     {...props}/>;
      case "assignments": return <ModalBodyAssignments {...props}/>;
      case "exams":       return <ModalBodyExams       {...props} examChecks={examChecks} setExamChecks={setExamChecks}/>;
      case "activities":  return <ModalBodyActivities  {...props} noteText={noteText} setNoteText={setNoteText}/>;
      case "personal":    return <ModalBodyPersonal    {...props} noteText={noteText} setNoteText={setNoteText}/>;
      case "health":            return <ModalBodyHealth           {...props}/>;
      case "community-service": return <ModalBodyCommunityService {...props}/>;
      case "presentations":     return <ModalBodyPresentation     {...props}/>;
      case "field-studies":     return <ModalBodyFieldStudy       {...props}/>;
      case "school-cal":
        if (ev.eventType === "holiday")  return <ModalBodyHoliday     {...props}/>;
        if (ev.eventType === "closure")  return <ModalBodySchoolClosure {...props}/>;
        if (ev.eventType === "assembly" || ev.eventType === "district") return <ModalBodySchoolEvent {...props}/>;
        return <ModalBodyLunch {...props}/>;
      case "satact":      return <ModalBodySAT         {...props}/>;
      default:            return <ModalBodyFocus       {...props}/>;
    }
  };

  /* Footer CTA rows per layer */
  const FOOTER = {
    classes:     [{ label:"Message Teacher",        ghost:true }, { label:"Report Absence",      ghost:true }, { label:"View Class →",        primary:true }],
    assignments: [{ label:"Message Teacher",        ghost:true }, { label:"Generate Study Plan",  ghost:true, sparkle:true }, { label:"Open Assignment →", primary:true }],
    exams:       [{ label:"Schedule Study Session", ghost:true }, { label:"Practice Quiz",        ghost:true, sparkle:true }, { label:"Message Teacher",   ghost:true  }],
    activities:  [{ label:"Invite Someone",         ghost:true }, { label:"Message Organizer",    ghost:true }, { label:"View Program →",      primary:true }],
    personal:    [{ label:"Invite Someone",         ghost:true }, { label:"Edit Event",           ghost:true }, { label:"Set Reminder",        ghost:true   }],
    health:      [{ label:"Message Provider",       primary:true }],
    focus:       [{ label:"Open Study Tools →",     primary:true }],
    free:        [{ label:"View Details",           primary:true }],
    "school-cal":[{ label:"View Full Menu →",       primary:true }],
    "school-cal-closure": [{ label:"View School Announcements →", primary:true }],
    "school-cal-assembly":[{ label:"Add to To Do", ghost:true }, { label:"Message Advisor", ghost:true }, { label:"View Details →", primary:true }],
    satact:             [{ label:"Schedule Study Session", ghost:true  }, { label:"Practice Quiz", ghost:true, sparkle:true }, { label:"View Test Details →", primary:true }],
    "community-service":[{ label:"Log Hours",            ghost:true  }, { label:"Message Organizer", ghost:true }, { label:"View Program →", primary:true }],
    presentations:      [{ label:"Open Project",         ghost:true  }, { label:"Message Participants", ghost:true }, { label:"View Materials →", primary:true }],
    "field-studies":    [{ label:"Message Instructor",   ghost:true  }, { label:"Open Assignment", ghost:true }, { label:"View Field Study →", primary:true }],
  };
  const isHoliday  = ev.eventType === "holiday";
  const isClosure  = ev.eventType === "closure";
  const isAssembly = ev.eventType === "assembly" || ev.eventType === "district";
  const isLunch    = ev.eventType === "lunch";
  const footerKey  = isAssembly ? "school-cal-assembly"
                   : isClosure  ? "school-cal-closure"
                   : ev.layer;
  const footerBtns = (isHoliday || isClosure) ? [] : (FOOTER[footerKey] || FOOTER[ev.layer] || FOOTER.free);
  const showAddToDo = !isLunch && !isHoliday && !isClosure;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.6)" }}/>

      <div style={{
        position: "relative", width: 560, maxHeight: "88vh",
        background: "var(--paper)", borderRadius: 20,
        boxShadow: "0 24px 64px rgba(15,23,42,0.22), 0 8px 24px rgba(15,23,42,0.10)",
        display: "flex", flexDirection: "column", overflow: "hidden",
      }}>

        {/* Header */}
        <div style={{
          padding: "20px 24px 16px", borderBottom: "1px solid var(--mist)",
          display: "flex", alignItems: "flex-start", gap: 14, flexShrink: 0,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 11, flexShrink: 0,
            background: L.bg, border: `1.5px solid ${L.border}`,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <HeaderIco size={20} color={L.color}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)", lineHeight: 1.25 }}>
              {ev.title}
            </div>
            <div style={{ marginTop: 6 }}>
              <span style={{
                fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 999,
                background: L.bg, color: L.color, border: `1px solid ${L.border}`, lineHeight: 1.6,
              }}>{L.label}</span>
            </div>
          </div>
          <button onClick={onClose} style={{
            width: 30, height: 30, borderRadius: 8, flexShrink: 0,
            border: "1px solid var(--mist)", background: "var(--bone)",
            cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, color: "var(--stone)", fontFamily: "inherit", lineHeight: 1,
          }}>×</button>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 24px", flex: 1, overflowY: "auto" }}>
          {renderBody()}
        </div>

        {/* Footer */}
        <div style={{
          padding: "14px 24px", borderTop: "1px solid var(--mist)",
          display: "flex", flexDirection: "column", gap: 8,
          flexShrink: 0, background: "var(--paper)",
        }}>
          {isHoliday ? (
            <button onClick={onClose} style={{
              width: "100%", padding: "9px 0", borderRadius: 9,
              border: "1px solid var(--mist)", background: "var(--bone)",
              color: "var(--slate)", fontSize: 12.5, fontWeight: 700,
              cursor: "pointer", fontFamily: "inherit",
            }}>Close</button>
          ) : (
            <>
              {footerBtns.length > 0 && (
                <div style={{ display: "flex", gap: 8 }}>
                  {footerBtns.map((a, i) => (
                    <button key={i} style={{
                      flex: 1, padding: "9px 6px", borderRadius: 9,
                      background: a.primary ? L.color : "transparent",
                      border: a.primary ? "none" : "1px solid var(--mist)",
                      color: a.primary ? "#fff" : "var(--slate)",
                      fontSize: 12, fontWeight: 700, cursor: "pointer",
                      fontFamily: "inherit",
                      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
                    }}>
                      {a.sparkle && <I.Sparkle size={11} color={a.primary ? "#fff" : "var(--student-deep)"}/>}
                      {a.label}
                    </button>
                  ))}
                </div>
              )}
              {showAddToDo && (
                <button style={{
                  width: "100%", padding: "8px 0", borderRadius: 9,
                  border: "1px solid var(--mist)", background: "transparent",
                  color: "var(--stone)", fontSize: 12.5, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit",
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
                }}>
                  <I.Plus size={12} color="var(--stone)"/> Add to To Do
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CAL_MiniMonthNav — compact month calendar for left sidebar
   Shows May 2026. Today highlighted in purple.
   Click any date in the current week (May 11-17) to drill to that day.
   ============================================================ */
function CAL_MiniMonthNav({ dayIdx, onSelectDay }) {
  // May 1, 2026 = Friday → index 5 in Sun-indexed week (0=Sun)
  const FIRST_DOW   = 5;
  const DAYS_IN_MONTH = 31;
  const TODAY       = 13; // May 13 = "today" in the mock

  // Map May 11-17 to dayIdx 0-6
  const getIdx = (d) => (d >= 11 && d <= 17) ? d - 11 : null;

  // Build grid: leading blanks + date cells
  const cells = [];
  for (let i = 0; i < FIRST_DOW; i++) cells.push(null);
  for (let d = 1; d <= DAYS_IN_MONTH; d++) cells.push(d);

  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 12, padding: "12px 14px",
    }}>
      {/* Month header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <button style={{
          width: 22, height: 22, borderRadius: 5, border: "1px solid var(--mist)",
          background: "transparent", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <I.ChevronLeft size={11} color="var(--stone)"/>
        </button>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>May 2026</span>
        <button style={{
          width: 22, height: 22, borderRadius: 5, border: "1px solid var(--mist)",
          background: "transparent", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <I.ChevronRight size={11} color="var(--stone)"/>
        </button>
      </div>

      {/* Day-of-week header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 3 }}>
        {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 9, fontWeight: 700, color: "var(--silver)", lineHeight: "14px" }}>{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1px 0" }}>
        {cells.map((d, i) => {
          if (!d) return <div key={"e"+i}/>;
          const isToday    = d === TODAY;
          const idx        = getIdx(d);
          const isSelected = idx !== null && idx === dayIdx;
          const isInWeek   = idx !== null;
          return (
            <button key={d}
              onClick={() => isInWeek && onSelectDay && onSelectDay(idx)}
              style={{
                width: "100%", aspectRatio: "1", borderRadius: "50%",
                border: "none", fontFamily: "inherit",
                cursor: isInWeek ? "pointer" : "default",
                background: isToday
                  ? "var(--student)"
                  : (isSelected ? "var(--student-100)" : "transparent"),
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: isToday ? 700 : (isSelected ? 600 : 400),
                color: isToday
                  ? "#fff"
                  : (isSelected ? "var(--student-deep)"
                  : (isInWeek ? "var(--ink)" : "var(--stone)")),
              }}
            >{d}</button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   CAL_AddModal — Quick Add picker + 6 inline form modals
   ============================================================ */

/* ── Shared field style constants ── */
const CAL_ADD_FS = {
  label: { fontSize: 11, fontWeight: 700, color: "var(--stone)", marginBottom: 4, display: "block", letterSpacing: "0.04em", textTransform: "uppercase" },
  input: { width: "100%", padding: "8px 11px", borderRadius: 9, border: "1.5px solid var(--mist)", background: "var(--bone)", fontSize: 13, color: "var(--ink)", fontFamily: "inherit", outline: "none", boxSizing: "border-box" },
  row2:  { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  group: { marginBottom: 13 },
};

/* ── Toggle switch ── */
function CAL_Add_Toggle({ label, defaultOn = false }) {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{label}</span>
      <button onClick={() => setOn(p => !p)} style={{
        width: 38, height: 22, borderRadius: 999, border: "none", cursor: "pointer",
        background: on ? "var(--student)" : "var(--mist)", position: "relative",
        flexShrink: 0, transition: "background 0.15s",
      }}>
        <div style={{
          width: 16, height: 16, borderRadius: "50%", background: "#fff",
          position: "absolute", top: 3, left: on ? 19 : 3, transition: "left 0.15s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
        }}/>
      </button>
    </div>
  );
}

/* ── Priority chip picker (High / Medium / Low) ── */
function CAL_Add_PriorityPicker() {
  const [sel, setSel] = React.useState("medium");
  const opts = [
    { id: "high",   label: "High",   selBg: "#B91C1C", bg: "#FEE2E2", fg: "#B91C1C" },
    { id: "medium", label: "Medium", selBg: "#A16207", bg: "#FEF3C7", fg: "#A16207" },
    { id: "low",    label: "Low",    selBg: "#15803D", bg: "#DCFCE7", fg: "#15803D" },
  ];
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {opts.map(p => (
        <button key={p.id} onClick={() => setSel(p.id)} style={{
          flex: 1, padding: "7px 0", borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
          border: sel === p.id ? `2px solid ${p.selBg}` : "1.5px solid var(--mist)",
          background: sel === p.id ? p.bg : "var(--bone)",
          color: sel === p.id ? p.fg : "var(--stone)",
          fontSize: 12, fontWeight: 700,
        }}>{p.label}</button>
      ))}
    </div>
  );
}

/* ── Generic chip / pill picker (single or multi-select) ── */
function CAL_Add_ChipPicker({ options, defaultVal, multi = false }) {
  const [sel, setSel] = React.useState(multi ? new Set([defaultVal]) : defaultVal);
  const toggle = (id) => {
    if (multi) {
      const next = new Set(sel);
      next.has(id) ? next.delete(id) : next.add(id);
      setSel(next);
    } else { setSel(id); }
  };
  const isOn = (id) => multi ? sel.has(id) : sel === id;
  return (
    <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
      {options.map(o => (
        <button key={o.id} onClick={() => toggle(o.id)} style={{
          padding: "6px 13px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
          border: isOn(o.id) ? "1.5px solid var(--student)" : "1.5px solid var(--mist)",
          background: isOn(o.id) ? "var(--student-50)" : "var(--bone)",
          color: isOn(o.id) ? "var(--student-deep)" : "var(--stone)",
          fontSize: 12, fontWeight: 600,
        }}>{o.label}</button>
      ))}
    </div>
  );
}

/* ── Space type card selector ── */
function CAL_Add_SpacePicker() {
  const [sel, setSel] = React.useState("library");
  const opts = [
    { id: "classroom", label: "Classroom",  icon: "School" },
    { id: "library",   label: "Library",    icon: "Book"   },
    { id: "study",     label: "Study Room", icon: "Team"   },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
      {opts.map(o => {
        const Ic = I[o.icon] || I.Home;
        const on = sel === o.id;
        return (
          <button key={o.id} onClick={() => setSel(o.id)} style={{
            padding: "10px 8px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
            border: on ? "1.5px solid var(--student)" : "1.5px solid var(--mist)",
            background: on ? "var(--student-50)" : "var(--bone)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
          }}>
            <Ic size={16} color={on ? "var(--student)" : "var(--stone)"}/>
            <span style={{ fontSize: 11, fontWeight: 600, color: on ? "var(--student-deep)" : "var(--stone)" }}>{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Shared form chrome: header (back + close) + scrollable body + footer ── */
function CAL_Add_FormWrap({ onBack, onClose, title, accentBg, accentFg, icon, submitLabel = "Create", children }) {
  const Ico = I[icon] || I.Plus;
  return (
    <>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <button onClick={onBack} style={{
          width: 30, height: 30, borderRadius: 8, border: "1px solid var(--mist)",
          background: "var(--bone)", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <I.ChevronLeft size={16} color="var(--slate)"/>
        </button>
        <div style={{
          width: 32, height: 32, borderRadius: 9, background: accentBg,
          display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Ico size={16} color={accentFg}/>
        </div>
        <div style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)", flex: 1 }}>{title}</div>
        <button onClick={onClose} style={{
          width: 30, height: 30, borderRadius: 8, border: "1px solid var(--mist)",
          background: "var(--bone)", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, color: "var(--stone)", fontFamily: "inherit", lineHeight: 1,
        }}>×</button>
      </div>

      {/* Scrollable form body */}
      <div style={{ maxHeight: 370, overflowY: "auto", paddingRight: 2 }}>
        {children}
      </div>

      {/* Footer */}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 14, borderTop: "1px solid var(--mist)", marginTop: 4 }}>
        <button onClick={onBack} style={{
          padding: "8px 18px", borderRadius: 9, border: "1px solid var(--mist)",
          background: "var(--bone)", fontSize: 13, fontWeight: 600,
          color: "var(--slate)", cursor: "pointer", fontFamily: "inherit",
        }}>Cancel</button>
        <button onClick={onClose} style={{
          padding: "8px 20px", borderRadius: 9, border: "none",
          background: "var(--student)", color: "#fff",
          fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 2px 8px rgba(124,58,237,0.22)",
        }}>{submitLabel}</button>
      </div>
    </>
  );
}

/* ── Main modal ── */
function CAL_AddModal({ onClose }) {
  const [view, setView] = React.useState("grid");
  const goBack = () => setView("grid");

  const items = [
    { id: "event",      label: "Event",          icon: "Calendar", bg: "var(--student-50)", fg: "var(--student)",  desc: "Add to calendar" },
    { id: "studyblock", label: "Study Block",    icon: "Book",     bg: "var(--success-50)", fg: "var(--success)", desc: "Schedule focus time" },
    { id: "todo",       label: "To Do",          icon: "Check",    bg: "var(--danger-50)",  fg: "var(--danger)",  desc: "Create a task" },
    { id: "reserve",    label: "Reserve Space",  icon: "MapPin",   bg: "var(--warning-50)", fg: "var(--warning)", desc: "Book a room" },
    { id: "askai",      label: "Ask AI",         icon: "Sparkle",  bg: "var(--student-50)", fg: "var(--student)", desc: "Get suggestions" },
    { id: "focus",      label: "Focus Time",     icon: "Time",     bg: "var(--info-50)",    fg: "var(--info)",    desc: "Block distraction-free time" },
  ];

  React.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") { view === "grid" ? onClose() : setView("grid"); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, view]);

  const fs = CAL_ADD_FS;

  /* ── Form renderers ── */
  const renderEvent = () => (
    <CAL_Add_FormWrap onBack={goBack} onClose={onClose} title="Add Event"
      accentBg="var(--student-50)" accentFg="var(--student)" icon="Calendar">
      <div style={fs.group}>
        <label style={fs.label}>Title</label>
        <input style={fs.input} placeholder="e.g. Study Group, College Visit…"/>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Date</label>
          <input type="date" style={fs.input} defaultValue="2026-05-13"/>
        </div>
        <div>
          <label style={fs.label}>Repeat</label>
          <select style={fs.input}>
            <option>None</option><option>Daily</option>
            <option>Weekly</option><option>Monthly</option>
          </select>
        </div>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Start Time</label>
          <input type="time" style={fs.input} defaultValue="09:00"/>
        </div>
        <div>
          <label style={fs.label}>End Time</label>
          <input type="time" style={fs.input} defaultValue="10:00"/>
        </div>
      </div>
      <div style={fs.group}>
        <label style={fs.label}>Location</label>
        <input style={fs.input} placeholder="Room, address, or Zoom link…"/>
      </div>
      <div style={{ ...fs.group, padding: "11px 13px", borderRadius: 10, background: "var(--bone)", border: "1px solid var(--mist)" }}>
        <CAL_Add_Toggle label="Set a reminder" defaultOn={true}/>
      </div>
    </CAL_Add_FormWrap>
  );

  const renderStudyBlock = () => (
    <CAL_Add_FormWrap onBack={goBack} onClose={onClose} title="Add Study Block"
      accentBg="var(--success-50)" accentFg="var(--success)" icon="Book" submitLabel="Schedule">
      <div style={fs.group}>
        <label style={fs.label}>Title</label>
        <input style={fs.input} placeholder="e.g. Algebra Review, Essay Draft…"/>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Date</label>
          <input type="date" style={fs.input} defaultValue="2026-05-13"/>
        </div>
        <div>
          <label style={fs.label}>Recurrence</label>
          <select style={fs.input}>
            <option>None</option><option>Daily</option>
            <option>Weekdays</option><option>Weekly</option>
          </select>
        </div>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Start Time</label>
          <input type="time" style={fs.input} defaultValue="16:00"/>
        </div>
        <div>
          <label style={fs.label}>End Time</label>
          <input type="time" style={fs.input} defaultValue="17:30"/>
        </div>
      </div>
      <div style={fs.group}>
        <label style={fs.label}>Subject / Topic</label>
        <select style={fs.input}>
          <option>Biology 101</option><option>Algebra II</option>
          <option>English 10</option><option>US History</option>
          <option>Chemistry</option><option>Other…</option>
        </select>
      </div>
      <div style={{ padding: "11px 13px", borderRadius: 10, background: "var(--bone)", border: "1px solid var(--mist)" }}>
        <CAL_Add_Toggle label="Remind me 15 min before"/>
      </div>
    </CAL_Add_FormWrap>
  );

  const renderToDo = () => (
    <CAL_Add_FormWrap onBack={goBack} onClose={onClose} title="Add To Do"
      accentBg="var(--danger-50)" accentFg="var(--danger)" icon="Check">
      <div style={fs.group}>
        <label style={fs.label}>Task Title</label>
        <input style={fs.input} placeholder="What needs to get done?"/>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Due Date</label>
          <input type="date" style={fs.input} defaultValue="2026-05-14"/>
        </div>
        <div>
          <label style={fs.label}>Tags</label>
          <input style={fs.input} placeholder="e.g. AP, Lab, Essay"/>
        </div>
      </div>
      <div style={fs.group}>
        <label style={fs.label}>Priority</label>
        <CAL_Add_PriorityPicker/>
      </div>
      <div style={fs.group}>
        <label style={fs.label}>Checklist Items</label>
        {["Step 1 — Research sources", "Step 2 — Outline", "Step 3 — Draft"].map((s, i) => (
          <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, fontSize: 12.5, color: "var(--ink)", cursor: "pointer" }}>
            <input type="checkbox" style={{ accentColor: "var(--student)", width: 14, height: 14 }}/>
            {s}
          </label>
        ))}
        <button style={{ fontSize: 12, color: "var(--student)", fontWeight: 600, background: "none", border: "none", cursor: "pointer", padding: 0, marginTop: 2, fontFamily: "inherit" }}>+ Add item</button>
      </div>
    </CAL_Add_FormWrap>
  );

  const renderReserve = () => (
    <CAL_Add_FormWrap onBack={goBack} onClose={onClose} title="Reserve a Space"
      accentBg="var(--warning-50)" accentFg="var(--warning)" icon="MapPin" submitLabel="Request">
      <div style={fs.group}>
        <label style={fs.label}>Space Type</label>
        <CAL_Add_SpacePicker/>
      </div>
      <div style={{ ...fs.row2, ...fs.group, marginTop: 4 }}>
        <div>
          <label style={fs.label}>Date</label>
          <input type="date" style={fs.input} defaultValue="2026-05-13"/>
        </div>
        <div>
          <label style={fs.label}>Capacity Needed</label>
          <input type="number" style={fs.input} placeholder="e.g. 4" min="1" max="30"/>
        </div>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Start Time</label>
          <input type="time" style={fs.input} defaultValue="15:00"/>
        </div>
        <div>
          <label style={fs.label}>End Time</label>
          <input type="time" style={fs.input} defaultValue="16:30"/>
        </div>
      </div>
      <div style={fs.group}>
        <label style={fs.label}>Purpose</label>
        <input style={fs.input} placeholder="e.g. Group project, AP study session…"/>
      </div>
      <div style={{ padding: "9px 12px", borderRadius: 9, background: "var(--warning-50)", border: "1px solid var(--mist)", fontSize: 12, color: "var(--stone)", lineHeight: 1.5 }}>
        📋 Requests are reviewed by your school. You'll receive a confirmation notification.
      </div>
    </CAL_Add_FormWrap>
  );

  const renderAskAI = () => (
    <CAL_Add_FormWrap onBack={goBack} onClose={onClose} title="Ask AI"
      accentBg="var(--student-50)" accentFg="var(--student)" icon="Sparkle" submitLabel="Generate">
      <div style={fs.group}>
        <label style={fs.label}>What would you like AI to suggest?</label>
        <textarea style={{ ...fs.input, minHeight: 88, resize: "vertical", lineHeight: 1.55 }}
          placeholder="e.g. Build me a study schedule for my Chemistry exam next Friday…"/>
      </div>
      <div style={fs.group}>
        <label style={fs.label}>Topic Area</label>
        <CAL_Add_ChipPicker multi options={[
          { id: "academics",  label: "Academics"  },
          { id: "wellness",   label: "Wellness"   },
          { id: "timemgmt",   label: "Time Mgmt"  },
          { id: "activities", label: "Activities" },
        ]} defaultVal="academics"/>
      </div>
      <div style={fs.group}>
        <label style={fs.label}>Suggestion Type</label>
        <CAL_Add_ChipPicker options={[
          { id: "schedule",  label: "Schedule Block" },
          { id: "studytips", label: "Study Tips"     },
          { id: "reminders", label: "Reminders"      },
          { id: "breakdown", label: "Task Breakdown" },
        ]} defaultVal="schedule"/>
      </div>
      <div style={{ padding: "9px 12px", borderRadius: 9, background: "var(--student-50)", border: "1px solid var(--mist)", fontSize: 12, color: "var(--stone)", lineHeight: 1.5 }}>
        ✨ LINKS AI will add suggested items directly to your calendar for review.
      </div>
    </CAL_Add_FormWrap>
  );

  const renderFocus = () => (
    <CAL_Add_FormWrap onBack={goBack} onClose={onClose} title="Add Focus Time"
      accentBg="var(--info-50)" accentFg="var(--info)" icon="Time">
      <div style={fs.group}>
        <label style={fs.label}>Title</label>
        <input style={fs.input} placeholder="e.g. Deep Work, Essay Sprint…"/>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Date</label>
          <input type="date" style={fs.input} defaultValue="2026-05-13"/>
        </div>
        <div>
          <label style={fs.label}>Goal</label>
          <input style={fs.input} placeholder="What will you accomplish?"/>
        </div>
      </div>
      <div style={{ ...fs.row2, ...fs.group }}>
        <div>
          <label style={fs.label}>Start Time</label>
          <input type="time" style={fs.input} defaultValue="19:00"/>
        </div>
        <div>
          <label style={fs.label}>End Time</label>
          <input type="time" style={fs.input} defaultValue="20:30"/>
        </div>
      </div>
      <div style={{ ...fs.group, padding: "9px 13px", borderRadius: 10, background: "var(--info-50)", border: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--info)" }}>Duration</div>
          <div style={{ fontSize: 11, color: "var(--stone)" }}>1 hr 30 min</div>
        </div>
        <I.Time size={18} color="var(--info)"/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "11px 13px", borderRadius: 10, background: "var(--bone)", border: "1px solid var(--mist)" }}>
        <CAL_Add_Toggle label="Block notifications" defaultOn={true}/>
        <div style={{ height: 1, background: "var(--mist)" }}/>
        <CAL_Add_Toggle label="Enable focus music"/>
      </div>
    </CAL_Add_FormWrap>
  );

  const formMap = {
    event: renderEvent,
    studyblock: renderStudyBlock,
    todo: renderToDo,
    reserve: renderReserve,
    askai: renderAskAI,
    focus: renderFocus,
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.6)" }}/>
      <div style={{
        position: "relative", width: 520,
        background: "var(--paper)", borderRadius: 20,
        boxShadow: "0 24px 64px rgba(15,23,42,0.22)",
        padding: "24px",
      }}>
        {view === "grid" ? (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>What would you like to add?</div>
              <button onClick={onClose} style={{
                width: 30, height: 30, borderRadius: 8,
                border: "1px solid var(--mist)", background: "var(--bone)",
                cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "var(--stone)", fontFamily: "inherit", lineHeight: 1,
              }}>×</button>
            </div>
            {/* 6-card grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {items.map((it) => {
                const Ico = I[it.icon] || I.Plus;
                return (
                  <button key={it.id} onClick={() => setView(it.id)} style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                    padding: "18px 12px 16px",
                    borderRadius: 12, border: "1.5px solid var(--mist)",
                    background: "var(--paper)", cursor: "pointer", fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = it.fg;
                    e.currentTarget.style.background = it.bg;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--mist)";
                    e.currentTarget.style.background = "var(--paper)";
                  }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 11, background: it.bg,
                      display: "inline-flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Ico size={20} color={it.fg}/>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", textAlign: "center" }}>{it.label}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)", textAlign: "center", lineHeight: 1.35 }}>{it.desc}</div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          formMap[view]?.() || null
        )}
      </div>
    </div>
  );
}

window.CAL_AIPlanInsights = CAL_AIPlanInsights;
window.CAL_LeftRail = CAL_LeftRail;
window.CAL_FilterBar = CAL_FilterBar;
window.CAL_QuickAdd = CAL_QuickAdd;
window.CAL_WeekGrid = CAL_WeekGrid;
window.CAL_DayGrid = CAL_DayGrid;
window.CAL_MonthGrid = CAL_MonthGrid;
window.CAL_YearGrid = CAL_YearGrid;
window.CAL_NowLineV2 = CAL_NowLineV2;
window.CAL_EventPopover = CAL_EventPopover;
window.CAL_EventBlock = CAL_EventBlock;
window.CAL_DayEventBlock = CAL_DayEventBlock;
window.CAL_AgendaDetail = CAL_AgendaDetail;
window.CAL_AgendaView = CAL_AgendaView;
window.CAL_EventModal = CAL_EventModal;
window.CAL_MiniMonthNav = CAL_MiniMonthNav;
window.CAL_AddModal = CAL_AddModal;

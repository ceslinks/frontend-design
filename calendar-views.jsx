/* ============================================================
   MY CALENDAR — Views (token-driven, design-system aligned)
   - CAL_AIPlanInsights, CAL_LeftRail, CAL_QuickAdd  (unchanged shells)
   - CAL_WeekGrid  → tighter chrome, design-system tokens
   - CAL_DayGrid   → adds agenda side-panel (Schedule list)
   - CAL_MonthGrid → tightened gridlines + drill-down on cell click
   - CAL_YearGrid  → real density heatmap (5 tiers) + drill-down
   - CAL_EventBlock, CAL_NowLineV2  (unchanged)
   ============================================================ */

/* -------- Top: AI Plan Insights -------- */
function CAL_AIPlanInsights() {
  const items = [
    { icon: "Calendar", iconBg: "var(--danger-50)",  iconFg: "var(--danger)",
      title: "You have 2 assignments due this week.",
      sub: "Start early to avoid a late week crunch." },
    { icon: "Clock",    iconBg: "var(--warning-50)", iconFg: "var(--warning)",
      title: "Thursday looks heavy.",
      sub: "Consider moving 1 task to Friday.",
      cta: "Optimize My Week" },
    { icon: "Sparkle",  iconBg: "var(--student-50)", iconFg: "var(--student)",
      title: "You have 3h 15m of free time this week.",
      sub: "Want study suggestions?",
      cta: "Suggest Study Blocks" },
  ];
  return (
    <div style={{
      background: "linear-gradient(180deg, var(--student-50) 0%, var(--student-100) 100%)",
      border: "1px solid var(--student-200)",
      borderRadius: 12, padding: "12px 16px", marginBottom: 12,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--student)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <I.Sparkle size={14} color="#fff"/>
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Plan Insights</div>
        </div>
        <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View Full Insights</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {items.map((it, i) => {
          const Ico = I[it.icon] || I.Sparkle;
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: it.iconBg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ico size={14} color={it.iconFg}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>{it.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4, marginTop: 2 }}>{it.sub}</div>
                {it.cta && (
                  <button style={{
                    marginTop: 6, padding: "4px 10px", borderRadius: 6,
                    border: "1px solid var(--student-200)", background: "var(--paper)",
                    color: "var(--student-deep)", fontSize: 11, fontWeight: 600, cursor: "pointer",
                  }}>{it.cta}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* -------- Left rail: Calendar Layers / Show / Calendars -------- */
function CAL_LeftRail({ activeLayers, toggleLayer, show, setShow }) {
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
  return (
    <div style={{ width: 200, flexShrink: 0, fontSize: 12.5 }}>
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Calendar Layers</div>
          <a href="#" style={{ fontSize: 11, color: "var(--stone)", textDecoration: "none" }}>Edit</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {layerOrder.map((k) => {
            const L = CAL_LAYERS[k];
            const on = activeLayers.has(k);
            return (
              <button key={k} onClick={() => toggleLayer(k)}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "transparent", border: "none",
                  padding: "3px 0", cursor: "pointer",
                  color: "var(--ink)", fontWeight: on ? 600 : 500, textAlign: "left",
                }}>
                {checkbox(on, L.color)}
                <span>{L.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Show</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "priority",  label: "Priority Items", icon: "Star",  fg: "var(--warning)" },
            { id: "deadlines", label: "Deadlines",      icon: "Flag",  fg: "var(--danger)" },
            { id: "completed", label: "Completed",      icon: "Check", fg: "var(--success)" },
          ].map((s) => {
            const on = !!show[s.id];
            const Ico = I[s.icon] || I.Star;
            return (
              <button key={s.id} onClick={() => setShow({ ...show, [s.id]: !on })}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "transparent", border: "none",
                  padding: "3px 0", cursor: "pointer",
                  color: "var(--ink)", textAlign: "left", fontWeight: 500,
                }}>
                {checkbox(on, "var(--student)")}
                <Ico size={13} color={s.fg}/>
                <span>{s.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Calendars</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "me",     label: "Me",            color: "var(--student)" },
            { id: "study",  label: "Study Group",   color: "var(--warning)" },
            { id: "school", label: "School Events", color: "var(--info)" },
          ].map((c) => (
            <label key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink)" }}>
              {checkbox(true, c.color)}
              <span>{c.label}</span>
            </label>
          ))}
          <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--student-deep)", textDecoration: "none", marginTop: 4 }}>
            <I.Plus size={11} color="var(--student-deep)"/> Add Calendar
          </a>
        </div>
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
      borderRadius: 12, padding: 14, marginTop: 14,
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

/* -------- A single block on the time grid (week view) -------- */
function CAL_EventBlock({ ev, hourHeight, startHour, narrow, onClick }) {
  const L = calLayerStyle(ev.layer);
  const top = (ev.start - startHour) * hourHeight + 2;
  const h = Math.max(20, (ev.end - ev.start) * hourHeight - 4);
  const isHighlight = ev.highlight;
  return (
    <div onClick={() => onClick && onClick(ev)}
      style={{
        position: "absolute", top, left: 3, right: 3, height: h,
        background: L.bg, border: `1px solid ${L.border}`,
        borderLeft: `3px solid ${L.color}`,
        borderRadius: 6, padding: "5px 8px", cursor: "pointer", overflow: "hidden",
        boxShadow: isHighlight ? "0 0 0 2px var(--student-300), 0 4px 14px rgba(124,58,237,0.18)" : "none",
        outline: isHighlight ? "1px solid var(--student)" : "none",
      }}>
      <div style={{
        fontSize: narrow ? 10 : 11, fontWeight: 700, color: L.color,
        lineHeight: 1.25, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
      }}>{ev.title}</div>
      {h > 32 && ev.time && (
        <div style={{ fontSize: narrow ? 9 : 10, color: "var(--ink)", lineHeight: 1.3, marginTop: 1, opacity: 0.8 }}>
          {ev.time}
        </div>
      )}
      {h > 50 && ev.teacher && <div style={{ fontSize: 10, color: "var(--stone)", marginTop: 1 }}>{ev.teacher}</div>}
      {h > 65 && ev.room && <div style={{ fontSize: 10, color: "var(--stone)" }}>{ev.room}</div>}
      {h > 50 && ev.note && !ev.teacher && <div style={{ fontSize: 10, color: "var(--stone)", marginTop: 1 }}>{ev.note}</div>}
      {ev.attendees && h > 60 && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
          {[0,1,2].map((i) => (
            <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: ["var(--danger-300)", "var(--info-300)", "var(--success-300)"][i], border: "2px solid var(--paper)", marginLeft: i === 0 ? 0 : -6 }}/>
          ))}
          <div style={{ fontSize: 9.5, color: L.color, fontWeight: 600, marginLeft: 4, padding: "1px 6px", borderRadius: 999, background: "var(--paper)" }}>+{ev.attendees - 3}</div>
        </div>
      )}
    </div>
  );
}

/* -------- WEEK grid -------- */
function CAL_WeekGrid({ activeLayers, onSelectEvent, hourHeight = 50 }) {
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
                const L = calLayerStyle(a.layer);
                return (
                  <div key={i} style={{
                    background: L.bg, border: `1px solid ${L.border}`,
                    borderLeft: `3px solid ${L.color}`,
                    borderRadius: 5, padding: "3px 6px",
                    fontSize: 10.5, lineHeight: 1.3,
                  }}>
                    <div style={{ fontWeight: 700, color: L.color, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.title}</div>
                    {a.subtitle && <div style={{ fontSize: 9.5, color: "var(--stone)" }}>{a.subtitle}</div>}
                  </div>
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
              <CAL_EventBlock key={ev.id} ev={ev} hourHeight={hourHeight} startHour={startHour} onClick={onSelectEvent}/>
            ))}
          </div>
        ))}

        <CAL_NowLineV2 startHour={startHour} hourHeight={hourHeight} day={1} hour={14.566}/>
      </div>

      {/* Footer legend */}
      <div style={{
        borderTop: "1px solid var(--mist)", padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 18,
        fontSize: 11.5, color: "var(--stone)", background: "var(--surface-quiet)",
      }}>
        {Object.entries(CAL_LAYERS).slice(0, 6).map(([k, L]) => (
          <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: L.color }}/> {L.label.replace(" Time","")}
          </span>
        ))}
        <a href="#" style={{ marginLeft: "auto", color: "var(--student-deep)", textDecoration: "none", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
          See fewer <I.ChevronUp size={11} color="var(--student-deep)"/>
        </a>
        <button style={{
          padding: "5px 10px", borderRadius: 7,
          border: "1px solid var(--student-200)", background: "var(--paper)",
          color: "var(--student-deep)", fontWeight: 600, fontSize: 11.5,
          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
        }}>
          <I.Sparkle size={11} color="var(--student-deep)"/> AI Schedule Assistant
        </button>
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
function CAL_DayGrid({ activeLayers, onSelectEvent, hourHeight = 56, dayIdx = 2 }) {
  const HOURS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const startHour = 7;
  const day = CAL_DAYS[dayIdx];
  const events = calEventsForDay(dayIdx, activeLayers).sort((a, b) => a.start - b.start);
  const allday = calAllDayForDay(dayIdx, activeLayers);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(280px, 1fr)", gap: 22 }}>
      {/* LEFT: time grid */}
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
              const L = calLayerStyle(a.layer);
              return (
                <div key={i} style={{
                  background: L.bg, border: `1px solid ${L.border}`,
                  borderLeft: `3px solid ${L.color}`,
                  borderRadius: 6, padding: "4px 10px",
                  fontSize: 12, fontWeight: 600, color: L.color,
                }}>{a.title}{a.subtitle ? <span style={{ color: "var(--stone)", fontWeight: 400 }}> · {a.subtitle}</span> : null}</div>
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
              <CAL_DayEventBlock key={ev.id} ev={ev} hourHeight={hourHeight} startHour={startHour} onClick={onSelectEvent}/>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Schedule list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <div style={{
            fontFamily: "var(--font-display)", margin: 0,
            letterSpacing: "0.06em", textTransform: "uppercase",
            fontSize: 10.5, color: "var(--stone)", fontWeight: 600, marginBottom: 8,
          }}>Schedule</div>
          {events.length === 0 ? (
            <EmptyState
              icon="CalendarOff"
              tone="neutral"
              compact
              title="No events for this day"
            >
              Try toggling on more layers, or jump to a different date.
            </EmptyState>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--mist)" }}>
              {events.map((ev) => {
                const L = calLayerStyle(ev.layer);
                return (
                  <button key={ev.id}
                    onClick={() => onSelectEvent && onSelectEvent(ev)}
                    style={{
                      padding: "12px 0", borderBottom: "1px solid var(--mist)",
                      display: "flex", alignItems: "flex-start", gap: 10,
                      background: "transparent", border: "none", borderBottom: "1px solid var(--mist)",
                      textAlign: "left", cursor: "pointer", width: "100%",
                    }}>
                    <div style={{ width: 3, alignSelf: "stretch", borderRadius: 999, background: L.color, flexShrink: 0 }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13, lineHeight: 1.3 }}>{ev.title}</div>
                      <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 3, display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                        <span>{ev.time}</span>
                        {(ev.teacher || ev.note || ev.room) && (<>
                          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--silver)" }}/>
                          <span>{ev.teacher ? `${ev.teacher}${ev.room ? " · " + ev.room : ""}` : ev.note}</span>
                        </>)}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CAL_DayEventBlock({ ev, hourHeight, startHour, onClick }) {
  const L = calLayerStyle(ev.layer);
  const top = (ev.start - startHour) * hourHeight + 2;
  const h = Math.max(28, (ev.end - ev.start) * hourHeight - 4);
  return (
    <div onClick={() => onClick && onClick(ev)} style={{
      position: "absolute", top, left: 8, right: 8, height: h,
      background: L.bg, border: `1px solid ${L.border}`, borderLeft: `3px solid ${L.color}`,
      borderRadius: 8, padding: "8px 12px", cursor: "pointer", overflow: "hidden",
      boxShadow: ev.highlight ? "0 0 0 2px var(--student-300)" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: L.color }}>{ev.title}</div>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>{ev.time}</div>
      </div>
      {(ev.teacher || ev.note || ev.room) && (
        <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 3 }}>
          {ev.teacher ? `${ev.teacher} · ${ev.room || ""}` : ev.note}
        </div>
      )}
    </div>
  );
}

/* -------- MONTH grid (drill-down to Day) -------- */
function CAL_MonthGrid({ activeLayers, onSelectEvent, onDrillToDay }) {
  // May 2026 starts Friday May 1; Mon-first grid → first week starts Mon Apr 27
  const cells = [];
  const start = new Date(2026, 3, 27);
  for (let i = 0; i < 35; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push(d);
  }
  const eventsByDate = {};
  CAL_EVENTS.forEach((ev) => {
    if (!activeLayers || activeLayers.has(ev.layer)) {
      const d = 11 + ev.day;
      (eventsByDate[d] = eventsByDate[d] || []).push(ev);
    }
  });
  CAL_ALLDAY.forEach((a) => {
    if (!activeLayers || activeLayers.has(a.layer)) {
      const d = 11 + a.day;
      (eventsByDate[d] = eventsByDate[d] || []).push({ ...a, allDay: true });
    }
  });

  return (
    <div style={{
      background: "var(--mist)",
      border: "1px solid var(--mist)",
      borderRadius: 12, overflow: "hidden",
      display: "grid", gridTemplateColumns: "repeat(7, 1fr)",
      gap: 1,
    }}>
      {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d) => (
        <div key={d} style={{
          padding: "10px 12px", background: "var(--paper)",
          fontSize: 10.5, fontWeight: 600, color: "var(--silver)",
          letterSpacing: "0.06em", textTransform: "uppercase",
        }}>{d}</div>
      ))}
      {cells.map((c, i) => {
        const inMay = c.getMonth() === 4;
        const dateNum = c.getDate();
        const isToday = inMay && dateNum === 13;
        const evs = eventsByDate[dateNum] || [];
        return (
          <button key={i}
            onClick={() => {
              if (inMay && onDrillToDay) {
                const idx = dateNum - 11;
                if (idx >= 0 && idx <= 6) onDrillToDay(idx);
              }
            }}
            style={{
              background: inMay ? "var(--paper)" : "var(--surface-quiet)",
              padding: "8px 8px 10px",
              minHeight: 110,
              display: "flex", flexDirection: "column", gap: 4,
              cursor: inMay ? "pointer" : "default",
              border: "none", textAlign: "left",
              transition: "background 120ms",
            }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: isToday ? 600 : 500,
                color: isToday ? "#fff" : (inMay ? "var(--ink)" : "var(--silver)"),
                lineHeight: 1, marginBottom: 2,
                width: isToday ? 22 : "auto", height: isToday ? 22 : "auto",
                borderRadius: isToday ? "50%" : 0,
                background: isToday ? "var(--student)" : "transparent",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{dateNum}</span>
              {evs.length > 3 && (
                <span style={{ fontSize: 10.5, color: "var(--stone)" }}>+{evs.length - 3}</span>
              )}
            </div>
            {evs.slice(0, 3).map((ev, k) => {
              const L = calLayerStyle(ev.layer);
              return (
                <div key={k}
                  onClick={(e) => {
                    if (!ev.allDay && onSelectEvent) {
                      e.stopPropagation();
                      onSelectEvent(ev);
                    }
                  }}
                  style={{
                    fontSize: 10.5, padding: "2px 6px", borderRadius: 4,
                    background: L.bg, color: L.color,
                    borderLeft: `2px solid ${L.color}`,
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                    cursor: ev.allDay ? "default" : "pointer", fontWeight: 600, lineHeight: 1.25,
                  }}>{ev.title}</div>
              );
            })}
          </button>
        );
      })}
    </div>
  );
}

/* -------- YEAR grid: density heatmap (5 tiers) -------- */
function CAL_YearGrid({ activeLayers, onDrillToDay }) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthFirstDow = [3, 6, 6, 2, 4, 0, 2, 5, 1, 3, 6, 1]; // Mon-first 0..6, 2026
  const monthLen      = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Density map for May (the only month with mock events). day-number → count.
  const mayCounts = {};
  CAL_EVENTS.forEach((ev) => {
    if (!activeLayers || activeLayers.has(ev.layer)) {
      const d = 11 + ev.day;
      mayCounts[d] = (mayCounts[d] || 0) + 1;
    }
  });
  CAL_ALLDAY.forEach((a) => {
    if (!activeLayers || activeLayers.has(a.layer)) {
      const d = 11 + a.day;
      mayCounts[d] = (mayCounts[d] || 0) + 1;
    }
  });

  // Tier function — matches the design-system calendar
  const tierClass = (count) => count === 0 ? "d0" : count === 1 ? "d1" : count === 2 ? "d2" : count <= 4 ? "d3" : "d4";

  // Tier styles → inline so this works without the cal-component.css being loaded
  const tierStyle = (count, isToday) => {
    const styles = {
      d0: { background: "var(--bone)",         color: "var(--silver)" },
      d1: { background: "var(--student-100)",  color: "var(--student-deep)" },
      d2: { background: "var(--student-300)",  color: "var(--student-ink, var(--student-deep))", fontWeight: 600 },
      d3: { background: "var(--student)",      color: "#fff", fontWeight: 600 },
      d4: { background: "var(--student-deep)", color: "#fff", fontWeight: 700 },
    };
    const t = tierClass(count);
    return {
      ...styles[t],
      ...(isToday ? { outline: "2px solid var(--ink)", outlineOffset: -2 } : {}),
    };
  };

  // total events across the displayed period
  const totalEvents = Object.values(mayCounts).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, padding: 22,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
          {months.map((m, mi) => {
            // sum the month's event count
            const monthCount = mi === 4 ? totalEvents : 0;
            return (
              <div key={m} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{
                  fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600,
                  color: mi === 4 ? "var(--student-deep)" : "var(--ink)",
                  display: "flex", alignItems: "baseline", justifyContent: "space-between",
                }}>
                  <span>{m}</span>
                  <span style={{
                    fontFamily: "var(--font-ui)", fontSize: 10.5, fontWeight: 500,
                    color: "var(--silver)", fontVariantNumeric: "tabular-nums",
                  }}>{monthCount}</span>
                </div>
                <div style={{
                  display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2,
                  fontSize: 9, fontWeight: 500, color: "var(--silver)",
                  textAlign: "center", letterSpacing: "0.05em", textTransform: "uppercase",
                }}>
                  {["M","T","W","T","F","S","S"].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
                  {Array.from({ length: monthFirstDow[mi] }).map((_, i) => (
                    <div key={"e"+i} style={{ aspectRatio: "1", visibility: "hidden" }}/>
                  ))}
                  {Array.from({ length: monthLen[mi] }).map((_, i) => {
                    const day = i + 1;
                    const isToday = mi === 4 && day === 13;
                    const count = mi === 4 ? (mayCounts[day] || 0) : 0;
                    return (
                      <button key={day}
                        onClick={() => {
                          if (mi === 4 && day >= 11 && day <= 17 && onDrillToDay) {
                            onDrillToDay(day - 11);
                          }
                        }}
                        title={`${m} ${day} · ${count} event${count === 1 ? "" : "s"}`}
                        style={{
                          aspectRatio: "1", borderRadius: 3, border: "none", cursor: mi === 4 ? "pointer" : "default",
                          fontFamily: "var(--font-ui)", fontSize: 9.5,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          padding: 0, lineHeight: 1,
                          ...tierStyle(count, isToday),
                        }}>
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12, marginTop: 18,
          paddingTop: 14, borderTop: "1px solid var(--mist)",
          fontSize: 11, color: "var(--silver)",
        }}>
          <span>Less</span>
          <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--bone)" }}/>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--student-100)" }}/>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--student-300)" }}/>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--student)" }}/>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--student-deep)" }}/>
          </span>
          <span>More</span>
          <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--stone)", fontWeight: 500 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600, color: "var(--ink)", fontVariantNumeric: "tabular-nums" }}>{totalEvents}</span>
            events visible
          </span>
        </div>
      </div>
    </div>
  );
}

window.CAL_AIPlanInsights = CAL_AIPlanInsights;
window.CAL_LeftRail = CAL_LeftRail;
window.CAL_QuickAdd = CAL_QuickAdd;
window.CAL_WeekGrid = CAL_WeekGrid;
window.CAL_DayGrid = CAL_DayGrid;
window.CAL_MonthGrid = CAL_MonthGrid;
window.CAL_YearGrid = CAL_YearGrid;
window.CAL_NowLineV2 = CAL_NowLineV2;
window.CAL_EventBlock = CAL_EventBlock;
window.CAL_DayEventBlock = CAL_DayEventBlock;

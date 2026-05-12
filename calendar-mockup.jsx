/* ============================================================
   MY CALENDAR — main page
   Orchestrates layers/show toggles, view (Day/Week/Month/Year),
   and which detail panel is open (or full-page Flex Study mode).
   ============================================================ */

function CalendarPage({ segments, navigate }) {
  /* segments contract:
       ["my-time","my-calendar"]                       → overview (Algebra II detail open by default)
       ["my-time","my-calendar","event","class"]       → Class detail
       ["my-time","my-calendar","event","fieldtrip"]   → Field Trip detail
       ["my-time","my-calendar","event","flexstudy"]   → Flex Study FULL PAGE
  */
  const segDetail = segments[2] === "event" ? segments[3] : null;
  const [selected, setSelected] = React.useState(segDetail || "class");
  const [view, setView] = React.useState("week"); // day | week | month | year
  const [dayIdx, setDayIdx] = React.useState(2); // 0..6 within CAL_DAYS (default Wed = today)
  const [activeLayers, setActiveLayers] = React.useState(
    new Set(["classes", "assignments", "exams", "activities", "personal", "health", "focus"])
  );
  const [show, setShow] = React.useState({ priority: true, deadlines: true, completed: false });

  React.useEffect(() => {
    if (segDetail !== selected) setSelected(segDetail || "class");
  }, [segDetail]);

  const toggleLayer = (k) => {
    const next = new Set(activeLayers);
    next.has(k) ? next.delete(k) : next.add(k);
    setActiveLayers(next);
  };

  const onSelectEvent = (ev) => {
    if (ev.eventType === "fieldtrip") { setSelected("fieldtrip"); navigate(["my-time","my-calendar","event","fieldtrip"]); }
    else if (ev.eventType === "flexstudy") { setSelected("flexstudy"); navigate(["my-time","my-calendar","event","flexstudy"]); }
    else if (ev.layer === "classes") { setSelected("class"); navigate(["my-time","my-calendar","event","class"]); }
    else { setSelected("class"); }
  };
  const closeDetail = () => { setSelected(null); navigate(["my-time","my-calendar"]); };
  const backToCalendar = () => { setSelected("class"); navigate(["my-time","my-calendar"]); };

  // Drill from Year/Month → Day
  const drillToDay = (idx) => {
    setDayIdx(idx);
    setView("day");
    setSelected(null);
    navigate(["my-time","my-calendar"]);
  };

  // ---- Flex Study takes over the whole page ----
  if (selected === "flexstudy") {
    return (
      <div className="fade-in">
        <CAL_FlexStudyDetail onBack={backToCalendar}/>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ padding: "8px 24px 60px", maxWidth: 1500, margin: "0 auto" }}>
      <PageHeader segments={segments} title="My Calendar" lede="Plan smarter. Stay ahead."
        actions={
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Today + nav */}
            <button style={{ padding: "6px 12px", borderRadius: 7, border: "1px solid var(--mist)", background: "var(--paper)", fontSize: 12, fontWeight: 600, color: "var(--ink)", cursor: "pointer" }}>Today</button>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <button style={iconBtn}><I.ChevronLeft size={13} color="var(--slate)"/></button>
              <button style={iconBtn}><I.ChevronRight size={13} color="var(--slate)"/></button>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "5px 10px", borderRadius: 7, border: "1px solid var(--mist)", background: "var(--paper)", fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>
              May 11 – May 17, 2026 <I.ChevronDown size={11} color="var(--stone)"/>
            </div>
            {/* View switcher */}
            <div style={{ display: "inline-flex", padding: 3, borderRadius: 8, background: "var(--bone)", border: "1px solid var(--mist)" }}>
              {["Day","Week","Month","Year"].map((v) => {
                const k = v.toLowerCase();
                const on = view === k;
                return (
                  <button key={v} onClick={() => setView(k)} style={{
                    padding: "5px 14px", borderRadius: 6, border: "none",
                    background: on ? "var(--paper)" : "transparent",
                    color: on ? "var(--ink)" : "var(--stone)",
                    fontWeight: 600, fontSize: 12, cursor: "pointer",
                    boxShadow: on ? "0 1px 2px rgba(15,23,42,0.06)" : "none",
                  }}>{v}</button>
                );
              })}
            </div>
            <button style={{ padding: "6px 12px", borderRadius: 7, border: "1px solid var(--mist)", background: "var(--paper)", fontSize: 12, fontWeight: 600, color: "var(--ink)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <I.Filter size={11} color="var(--slate)"/> Filters
            </button>
          </div>
        }/>

      <CAL_AIPlanInsights/>

      {/* Body grid: left rail + grid + right detail (changes width based on selection) */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        {/* LEFT */}
        <div>
          <CAL_LeftRail activeLayers={activeLayers} toggleLayer={toggleLayer} show={show} setShow={setShow}/>
          <CAL_QuickAdd/>
        </div>

        {/* CENTER */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {view === "week"  && <CAL_WeekGrid activeLayers={activeLayers} onSelectEvent={onSelectEvent}/>}
          {view === "day"   && <CAL_DayGrid activeLayers={activeLayers} onSelectEvent={onSelectEvent} dayIdx={dayIdx}/>}
          {view === "month" && <CAL_MonthGrid activeLayers={activeLayers} onSelectEvent={onSelectEvent} onDrillToDay={drillToDay}/>}
          {view === "year"  && <CAL_YearGrid activeLayers={activeLayers} onDrillToDay={drillToDay}/>}
        </div>

        {/* RIGHT */}
        {selected === "class"     && <CAL_ClassDetail onClose={closeDetail}/>}
        {selected === "fieldtrip" && <CAL_FieldTripDetail onClose={closeDetail}/>}
      </div>
    </div>
  );
}

const iconBtn = {
  width: 28, height: 28, borderRadius: 7,
  background: "var(--paper)", border: "1px solid var(--mist)",
  display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
};

window.CalendarPage = CalendarPage;

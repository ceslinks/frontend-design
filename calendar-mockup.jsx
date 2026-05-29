/* ============================================================
   MY CALENDAR — main page
   Two-column layout: 220px left sidebar + full-width calendar area.
   Event details open as a centered modal overlay.
   ============================================================ */

function CalendarPage({ segments, navigate }) {
  const [view, setView] = React.useState("week");
  const [dayIdx, setDayIdx] = React.useState(2); // 0..6 within CAL_DAYS (default Wed = today)
  const [activeLayers, setActiveLayers] = React.useState(
    new Set(["classes", "assignments", "exams", "activities", "personal", "health", "focus", "school-cal", "satact", "community-service", "presentations", "field-studies"])
  );
  const [yearFilters, setYearFilters] = React.useState(new Set());
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [modalEvent, setModalEvent] = React.useState(null);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [yearSpan, setYearSpan] = React.useState(1); // 1 | 2 | 4

  const toggleLayer = (k) => {
    const next = new Set(activeLayers);
    next.has(k) ? next.delete(k) : next.add(k);
    setActiveLayers(next);
  };
  const toggleYearFilter = (k) => {
    const next = new Set(yearFilters);
    next.has(k) ? next.delete(k) : next.add(k);
    setYearFilters(next);
  };

  const drillToDay = (idx) => {
    setDayIdx(idx);
    setView("day");
  };

  const openModal  = (ev) => setModalEvent(ev);
  const closeModal = () => setModalEvent(null);

  const VIEW_LABELS = ["Day", "Week", "Month", "Year", "Agenda"];
  const filterActiveCount = activeLayers.size;

  return (
    <div className="fade-in" style={{ padding: "8px 24px 60px", maxWidth: 1500, margin: "0 auto" }}>

      {/* ═══════════════════════════════════════════════
          PAGE HEADER (breadcrumbs + title)
          ═══════════════════════════════════════════════ */}
      <PageHeader segments={segments} title="My Calendar" emoji="📅" lede="Plan smarter. Stay ahead."/>

      {/* ═══════════════════════════════════════════════
          TOP CONTROLS BAR
          ═══════════════════════════════════════════════ */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        paddingBottom: 18, marginBottom: 4,
        borderBottom: "1px solid var(--mist)",
      }}>

        {/* Center: date nav */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <button style={calNavArrowBtn}>
            <I.ChevronLeft size={16} color="var(--slate)"/>
          </button>
          <button style={{
            padding: "7px 13px", borderRadius: 9, border: "1px solid var(--mist)",
            background: "var(--paper)", fontSize: 12.5, fontWeight: 600,
            color: "var(--ink)", cursor: "pointer", fontFamily: "inherit",
          }}>Today</button>
          <button style={{
            padding: "7px 16px", borderRadius: 9, border: "1px solid var(--mist)",
            background: "var(--paper)", fontSize: view === "year" ? 12.5 : 13.5, fontWeight: 700,
            color: "var(--ink)", cursor: "pointer", fontFamily: "inherit",
            display: "inline-flex", alignItems: "center", gap: 6,
            whiteSpace: "nowrap",
          }}>
            {view === "year"
              ? yearSpan === 4 ? "2026 – 2029 Academic Years"
              : yearSpan === 2 ? "2026 – 2027 Academic Years"
              : "2026 Academic Year"
              : "May 11 – May 17, 2026"}
            <I.ChevronDown size={12} color="var(--stone)"/>
          </button>
          <button style={calNavArrowBtn}>
            <I.ChevronRight size={16} color="var(--slate)"/>
          </button>
        </div>

        {/* Right: view switcher + filters pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {/* View switcher segmented control */}
          <div style={{
            display: "inline-flex", padding: 3,
            borderRadius: 8, background: "var(--bone)", border: "1px solid var(--mist)",
          }}>
            {VIEW_LABELS.map((v) => {
              const k = v.toLowerCase();
              const on = view === k;
              return (
                <button key={v} onClick={() => setView(k)} style={{
                  padding: "5px 13px", borderRadius: 6, border: "none",
                  background: on ? "var(--paper)" : "transparent",
                  color: on ? "var(--ink)" : "var(--stone)",
                  fontWeight: 600, fontSize: 12, cursor: "pointer",
                  boxShadow: on ? "0 1px 2px rgba(15,23,42,0.06)" : "none",
                  fontFamily: "inherit",
                }}>{v}</button>
              );
            })}
          </div>

          {/* Divider + multi-year toggle — only visible in Year view */}
          {view === "year" && (
            <>
              <div style={{ width: 1, height: 24, background: "var(--mist)", flexShrink: 0 }}/>
              <div style={{
                display: "inline-flex", padding: 3,
                borderRadius: 999, background: "var(--bone)", border: "1px solid var(--mist)",
              }}>
                {[["1 Year", 1], ["2 Years", 2], ["4 Years", 4]].map(([label, n]) => {
                  const on = yearSpan === n;
                  return (
                    <button key={n} onClick={() => setYearSpan(n)} style={{
                      padding: "5px 11px", borderRadius: 999, border: "none",
                      background: on ? "var(--paper)" : "transparent",
                      color: on ? "var(--ink)" : "var(--stone)",
                      fontWeight: 600, fontSize: 12, cursor: "pointer",
                      boxShadow: on ? "0 1px 2px rgba(15,23,42,0.06)" : "none",
                      fontFamily: "inherit",
                    }}>{label}</button>
                  );
                })}
              </div>
            </>
          )}

          {/* Filters pill — shows count badge, opens drawer */}
          <button
            onClick={() => setFilterOpen((p) => !p)}
            style={{
              padding: "6px 14px", borderRadius: 9, fontFamily: "inherit",
              border: filterOpen ? "1.5px solid var(--student)" : "1px solid var(--mist)",
              background: filterOpen ? "var(--student-50)" : "var(--paper)",
              fontSize: 12.5, fontWeight: 600, cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 7,
              color: filterOpen ? "var(--student-deep)" : "var(--ink)",
            }}
          >
            <I.Filter size={12} color={filterOpen ? "var(--student)" : "var(--slate)"}/>
            Filters
            <span style={{
              background: "var(--student)", color: "#fff",
              borderRadius: 999, fontSize: 10, fontWeight: 700,
              padding: "1px 6px", lineHeight: 1.4,
            }}>{filterActiveCount}</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          FILTER DRAWER — slides in below controls bar
          ═══════════════════════════════════════════════ */}
      {filterOpen && view !== "year" && (
        <div style={{ marginTop: 10, marginBottom: 4 }}>
          <CAL_FilterBar activeLayers={activeLayers} toggleLayer={toggleLayer}/>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          BODY: left sidebar (220px) + right calendar area
          ═══════════════════════════════════════════════ */}
      <div style={{ display: "flex", gap: 18, alignItems: "flex-start", paddingTop: 16 }}>

        {/* ─── LEFT SIDEBAR ─── */}
        <div style={{ width: 220, flexShrink: 0, display: "flex", flexDirection: "column", gap: 12 }}>

          {/* + Add button — prominent purple */}
          <button
            onClick={() => setAddModalOpen(true)}
            style={{
              width: "100%", padding: "10px 0",
              borderRadius: 10, border: "none",
              background: "var(--student)", color: "#fff",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              fontFamily: "inherit",
              boxShadow: "0 2px 8px rgba(124,58,237,0.28)",
            }}
          >
            <I.Plus size={15} color="#fff"/> + Add
          </button>

          {/* Mini month calendar navigator */}
          <CAL_MiniMonthNav dayIdx={dayIdx} onSelectDay={drillToDay}/>

          {/* AI Insights card */}
          <CAL_AIPlanInsights/>

          {/* Year view: event-type filter checkboxes */}
          {view === "year" && (
            <CAL_LeftRail
              view="year"
              yearFilters={yearFilters}
              toggleYearFilter={toggleYearFilter}
              activeLayers={activeLayers}
              toggleLayer={toggleLayer}
              show={{}} setShow={() => {}}
            />
          )}
        </div>

        {/* ─── RIGHT: calendar grid + AI insights ─── */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          {view === "week"   && <CAL_WeekGrid   activeLayers={activeLayers} onOpenModal={openModal}/>}
          {view === "day"    && <CAL_DayGrid    activeLayers={activeLayers} onOpenModal={openModal} dayIdx={dayIdx}/>}
          {view === "month"  && <CAL_MonthGrid  activeLayers={activeLayers} onOpenModal={openModal} onDrillToDay={drillToDay}/>}
          {view === "year"   && <CAL_YearGrid   activeLayers={activeLayers} onDrillToDay={drillToDay} yearFilters={yearFilters} yearSpan={yearSpan}/>}
          {view === "agenda" && <CAL_AgendaView activeLayers={activeLayers} onOpenModal={openModal}/>}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          MODALS
          ═══════════════════════════════════════════════ */}
      {modalEvent  && <CAL_EventModal ev={modalEvent} onClose={closeModal}/>}
      {addModalOpen && <CAL_AddModal  onClose={() => setAddModalOpen(false)}/>}
    </div>
  );
}

const calNavArrowBtn = {
  width: 36, height: 36, borderRadius: 9,
  border: "1px solid var(--mist)", background: "var(--paper)",
  cursor: "pointer", display: "inline-flex",
  alignItems: "center", justifyContent: "center",
};

window.CalendarPage = CalendarPage;

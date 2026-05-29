// LINKS — My Counselors sub-page
// Route: #/my-team/counselors
// Exposes: window.MyCounselorsPage

(function () {

/* ── Data ── */

const OKAFOR = {
  id: "okafor",
  name: "Dr. James Okafor",
  role: "Mental Health Provider",
  cat: "Counselor",
  avail: "By appointment",
  initials: "JO",
  avatarFrom: "#A5B4FC",
  avatarTo: "#4F46E5",
  phone: "(555) 203-4200",
  email: "j.okafor@linkshs.edu",
  location: "Counseling Center, Room 8",
};

const DELGADO = {
  id: "delgado",
  name: "Ms. Rosa Delgado",
  role: "Trauma Support Specialist",
  cat: "Counselor",
  avail: "By appointment",
  initials: "RD",
  avatarFrom: "#6EE7B7",
  avatarTo: "#059669",
  phone: "(555) 203-4215",
  email: "r.delgado@linkshs.edu",
  location: "Counseling Center, Room 10",
};

const OKAFOR_SESSIONS = [
  { label: "Last session",   value: "May 7, 2026 · 2:00 PM"  },
  { label: "Next session",   value: "May 21, 2026 · 2:00 PM" },
  { label: "Frequency",      value: "Bi-weekly"               },
  { label: "Session length", value: "50 minutes"              },
];

const DELGADO_SESSIONS = [
  { label: "Last session",   value: "May 6, 2026 · 10:00 AM"  },
  { label: "Next session",   value: "May 20, 2026 · 10:00 AM" },
  { label: "Frequency",      value: "Weekly"                   },
  { label: "Session length", value: "45 minutes"               },
];

const MH_RESOURCES = [
  { title: "Understanding Anxiety",     type: "Article", color: "#EDE9FE", fg: "#5B21B6" },
  { title: "Mindfulness for Students",  type: "Guide",   color: "#E0F2FE", fg: "#0369A1" },
  { title: "Crisis Planning Worksheet", type: "Tool",    color: "#D1FAE5", fg: "#065F46" },
];

/* ── Shared avatar ── */

function CAvatar({ person, size = 52 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flexShrink: 0,
      background: `linear-gradient(135deg, ${person.avatarFrom}, ${person.avatarTo})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: Math.round(size * 0.33), fontWeight: 700,
      border: "2.5px solid rgba(255,255,255,0.75)",
      boxShadow: "0 2px 10px rgba(15,23,42,0.14)",
    }}>
      {person.initials}
    </div>
  );
}

/* ── Reusable counselor card ── */

function CounselorCard({ person }) {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
        <CAvatar person={person} size={56} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1E1B4B", marginBottom: 3 }}>{person.name}</div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>{person.role}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
          <I.MapPin size={15} color="#C4B5FD" strokeWidth={1.8} />
          {person.location}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
          <I.Phone size={15} color="#C4B5FD" strokeWidth={1.8} />
          {person.phone}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
          <I.Mail size={15} color="#C4B5FD" strokeWidth={1.8} />
          {person.email}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
        <button style={{ flex: 1, height: 34, background: "#D1FAE5", border: "none", borderRadius: 10, fontSize: 12.5, fontWeight: 600, color: "#065F46", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 100ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
          <I.Messages size={13} color="#065F46" /> Message
        </button>
        <button style={{ flex: 1, height: 34, background: "#E0F2FE", border: "none", borderRadius: 10, fontSize: 12.5, fontWeight: 600, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 100ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
          <I.Calendar size={13} color="#0369A1" /> Schedule
        </button>
      </div>
    </div>
  );
}

/* ── Add-to-calendar button (popover + toast) ── */

function AddToCalendarButton({ eventName, datetime, location,
  color, borderColor, background, hoverBg, height = 24, fontSize = 11, iconSize = 10 }) {

  const [added,       setAdded]       = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [showToast,   setShowToast]   = React.useState(false);
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  React.useEffect(() => {
    if (!popoverOpen) return;
    function onDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setPopoverOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [popoverOpen]);

  function confirm() {
    setPopoverOpen(false);
    setAdded(true);
    setShowToast(true);
  }

  return (
    <React.Fragment>
      <div ref={wrapRef} style={{ position: "relative", display: "inline-block" }}>

        {added ? (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            height, padding: "0 10px", borderRadius: 999,
            border: "1px solid #E5E7EB", background: "#F3F4F6",
            color: "#9CA3AF", fontSize, fontWeight: 600,
          }}>
            <I.Check size={iconSize} color="#9CA3AF" strokeWidth={2.5} /> Added
          </span>
        ) : (
          <button
            onClick={() => setPopoverOpen(true)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              height, padding: "0 10px", borderRadius: 999,
              border: `1px solid ${borderColor}`, background,
              color, fontSize, fontWeight: 600, cursor: "pointer",
              transition: "background 100ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = background; }}
          >
            <I.Calendar size={iconSize} color={color} /> Add to calendar
          </button>
        )}

        {popoverOpen && (
          <div style={{
            position: "absolute", bottom: "calc(100% + 8px)", left: 0, zIndex: 999,
            background: "#FFFFFF", borderRadius: 14,
            boxShadow: "0 4px 24px rgba(99,102,241,0.14), 0 1px 6px rgba(0,0,0,0.08)",
            padding: "16px 18px", width: 248, whiteSpace: "normal",
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B", marginBottom: 3 }}>{eventName}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: location ? 3 : 14 }}>{datetime}</div>
            {location && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#9CA3AF", marginBottom: 14 }}>
                <I.MapPin size={10} color="#C4B5FD" strokeWidth={1.8} /> {location}
              </div>
            )}
            <div style={{ display: "flex", gap: 7 }}>
              <button
                onClick={confirm}
                style={{
                  flex: 1, height: 32, border: "none", borderRadius: 9,
                  background: "#5B21B6", color: "#FFFFFF",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                  transition: "background 100ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#4C1D95"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#5B21B6"; }}
              >
                Add to My Calendar
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setPopoverOpen(false); }}
                style={{
                  height: 32, padding: "0 12px", border: "1.5px solid #E5E7EB", borderRadius: 9,
                  background: "transparent", color: "#9CA3AF",
                  fontSize: 12, fontWeight: 600, cursor: "pointer",
                  transition: "border-color 100ms, color 100ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.color = "#6B7280"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#9CA3AF"; }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

      </div>

      {showToast && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 99999,
          background: "#1E1B4B", borderRadius: 12, padding: "13px 20px",
          color: "#FFFFFF", fontSize: 13, fontWeight: 600,
          boxShadow: "0 4px 24px rgba(30,27,75,0.22)",
          display: "flex", alignItems: "center", gap: 9,
          animation: "calToastIn 250ms cubic-bezier(0.34,1.56,0.64,1) both",
          whiteSpace: "nowrap",
        }}>
          <I.Check size={14} color="#A5F3FC" strokeWidth={2.5} />
          {eventName} added to your calendar ✓
        </div>
      )}

      <style>{`@keyframes calToastIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </React.Fragment>
  );
}

/* ── Calendar modal (shared across tabs) ── */

function TeamCalendarModal({ event, onClose, onAdd }) {
  const cells = [];
  for (let i = 0; i < 5; i++) cells.push(null);
  for (let d = 1; d <= 31; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const SESSION_DAYS = event.sessionDays || [];
  const TODAY = 19;
  const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 440, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>
        <div style={{ marginBottom: 20, paddingRight: 32 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>{event.name}</h2>
          <div style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}><span style={{ fontWeight: 600 }}>Recurrence · </span>{event.recurrence}</div>
          <div style={{ fontSize: 13, color: "#374151" }}><span style={{ fontWeight: 600 }}>Time · </span>{event.time}</div>
        </div>
        <div style={{ background: "#F7F5FF", borderRadius: 16, padding: "14px 16px", marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#374151", textAlign: "center", marginBottom: 10 }}>May 2026</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3, marginBottom: 4 }}>
            {DAY_LABELS.map((d) => (
              <div key={d} style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", textAlign: "center" }}>{d}</div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
            {cells.map((day, idx) => {
              const isSession = day !== null && SESSION_DAYS.includes(day);
              const isPast    = isSession && day < TODAY;
              const isToday   = day === TODAY;
              return (
                <div key={idx} style={{
                  height: 28, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11.5, fontWeight: isSession || isToday ? 700 : 400,
                  background: isSession ? (isPast ? "#D1FAE5" : "#16A34A") : isToday ? "#EDE9FE" : "transparent",
                  color: isSession ? (isPast ? "#065F46" : "#FFFFFF") : isToday ? "#5B21B6" : day ? "#374151" : "transparent",
                }}>
                  {day || ""}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10, justifyContent: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: "#16A34A" }} /><span style={{ fontSize: 11, color: "#6B7280" }}>Upcoming</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: 3, background: "#D1FAE5", border: "1px solid #A7F3D0" }} /><span style={{ fontSize: 11, color: "#6B7280" }}>Past session</span></div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button onClick={onAdd} className="btn btn-primary" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.Calendar size={14} color="currentColor" /> Add to my calendar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Self-contained calendar button (opens modal, handles its own state) ── */

function CalendarButton({ event }) {
  const [open, setOpen]   = React.useState(false);
  const [toast, setToast] = React.useState(false);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  return (
    <React.Fragment>
      <button
        onClick={() => setOpen(true)}
        style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 16px", background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", transition: "background 100ms" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}
      >
        <I.Calendar size={13} color="#065F46" /> Add to calendar
      </button>
      {open && (
        <TeamCalendarModal
          event={event}
          onClose={() => setOpen(false)}
          onAdd={() => { setOpen(false); setToast(true); }}
        />
      )}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "#1E1B4B", color: "#fff", borderRadius: 12, padding: "12px 18px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", whiteSpace: "nowrap" }}>
          <I.Check size={14} color="#A7F3D0" strokeWidth={2.5} /> Added to your calendar ✓
        </div>
      )}
    </React.Fragment>
  );
}

/* ── Session schedule block ── */

function SessionSchedule({ sessions, eventName = "Session", recurrence = "By appointment", sessionDays = [] }) {
  const nextSession = sessions.find((s) => s.label === "Next session");
  const nextTime = nextSession ? nextSession.value.split(" · ")[1] || nextSession.value : "";
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
        Session Schedule
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {sessions.map((s, i) => (
          <div key={i} style={{ background: "#F7F5FF", borderRadius: 14, padding: "12px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{s.label}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>{s.value}</div>
            {s.label === "Next session" && (
              <div style={{ marginTop: 8 }}>
                <CalendarButton event={{ name: eventName, recurrence, time: nextTime, sessionDays }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Academic tab ── */

const HERNANDEZ = {
  id: "hernandez",
  name: "Dr. Maria Hernandez",
  role: "College Counselor",
  initials: "MH",
  avatarFrom: "#C4B5FD",
  avatarTo: "#7C3AED",
  location: "Counseling Office, Room 5",
  phone: "(555) 203-4100",
  email: "m.hernandez@linkshs.edu",
  avail: "By appointment",
};

const ACADEMIC_RESOURCES = [
  { title: "4-Year Plan Worksheet",        type: "PDF",   color: "#EDE9FE", fg: "#5B21B6", icon: "FileText" },
  { title: "College Application Timeline", type: "Guide", color: "#E0F2FE", fg: "#0369A1", icon: "Lightbulb" },
  { title: "Scholarship Finder",           type: "Tool",  color: "#D1FAE5", fg: "#065F46", icon: "Search"    },
];

function AcademicTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Privacy banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 12, padding: "10px 14px" }}>
        <I.Lock size={13} color="#5B21B6" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.5 }}>Your academic counseling information is read only · Managed by Student Services</span>
      </div>

      {/* Provider card */}
      <CounselorCard person={HERNANDEZ} />

      {/* Counseling Focus */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Counseling Focus</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "Academic planning",            desc: "Mapping out your classes and goals so you stay on track to graduate on time." },
            { name: "College and career readiness", desc: "Exploring your options after high school — colleges, programs, and career paths that fit your interests." },
            { name: "Course selection",             desc: "Choosing the right classes each semester to meet graduation requirements and support your goals." },
            { name: "Credit tracking",              desc: "Keeping an eye on the credits you've earned so there are no surprises before graduation." },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: 999, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <I.Check size={11} color="#5B21B6" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Meeting */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Next Meeting</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#F7F5FF", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Calendar size={20} color="#5B21B6" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>June 3, 2026 · 2:00 PM</div>
            <div style={{ fontSize: 12.5, color: "#6B7280", marginTop: 3 }}>Common App essay review</div>
          </div>
        </div>
        <CalendarButton event={{ name: "Academic Counseling Meeting", recurrence: "One-time", time: "2:00 PM", sessionDays: [] }} />
      </div>

      {/* Shared Resources */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Shared Resources</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {ACADEMIC_RESOURCES.map((r, i) => {
            const Ic = I[r.icon] || I.FileText;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#F7F5FF", cursor: "pointer", transition: "background 100ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F5FF"; }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: r.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Ic size={17} color={r.fg} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1E1B4B" }}>{r.title}</div>
                  <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{r.type}</div>
                </div>
                <I.Download size={14} color="#C4B5FD" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Mental Health tab ── */

function MentalHealthTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Compliance banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 12, padding: "10px 14px" }}>
        <I.Lock size={13} color="#5B21B6" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.5 }}>Your mental health records are strictly private and protected under FERPA · Read only · Managed by Student Services</span>
      </div>
      <CounselorCard person={OKAFOR} />
      <SessionSchedule sessions={OKAFOR_SESSIONS} eventName="Mental Health Session" recurrence="Bi-weekly" sessionDays={[7, 21]} />

      {/* Resources */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Always available to you</div>
          <span style={{ fontSize: 11.5, color: "#9CA3AF", fontStyle: "italic" }}>Shared by Dr. Okafor</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {MH_RESOURCES.map((r, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#F7F5FF", cursor: "pointer", transition: "background 100ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F5FF"; }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: r.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I.Lightbulb size={17} color={r.fg} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1E1B4B" }}>{r.title}</div>
                <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{r.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Trauma Support tab ── */

function TraumaSupportTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Compliance banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#FFF8F5", border: "1px solid #FED7AA", borderRadius: 12, padding: "10px 14px" }}>
        <I.Lock size={13} color="#C2410C" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#7C2D12", lineHeight: 1.5 }}>Your trauma support information is strictly confidential · Highest privacy protection · Read only</span>
      </div>

      {/* Crisis resources — above provider card */}
      <div style={{ background: "linear-gradient(135deg, #FFF8F5 0%, #FDF0E8 100%)", borderRadius: 20, padding: "20px 24px", boxShadow: "0 2px 18px rgba(234,88,12,0.06), 0 1px 4px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(234,88,12,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.Heart size={14} color="#C2410C" strokeWidth={0} style={{ fill: "#C2410C" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#C2410C" }}>If you need support right now</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#78350F" }}>
            <I.Phone size={13} color="#C2410C" strokeWidth={1.8} />
            <span><strong>988</strong> Suicide &amp; Crisis Lifeline — call or text</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#78350F" }}>
            <I.Messages size={13} color="#C2410C" strokeWidth={1.8} />
            <span>Text <strong>HOME</strong> to <strong>741741</strong> — Crisis Text Line</span>
          </div>
        </div>
      </div>

      {/* Provider contact card */}
      <CounselorCard person={DELGADO} />

      {/* Next session only — frequency and length omitted */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Next Session
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FFF8F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Calendar size={20} color="#C2410C" />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E1B4B" }}>May 20, 2026 · 10:00 AM</div>
            <div style={{ marginTop: 8 }}>
              <CalendarButton event={{ name: "Trauma Support Session", recurrence: "Weekly", time: "10:00 AM", sessionDays: [6, 13, 20, 27] }} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── Action nudge card ── */

function ActionNudgeCard({ items }) {
  return (
    <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 20, padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
        <div style={{ width: 28, height: 28, borderRadius: 9, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <I.Lightbulb size={14} color="#15803D" />
        </div>
        <span style={{ fontSize: 12, fontWeight: 700, color: "#166534", textTransform: "uppercase", letterSpacing: "0.07em" }}>What you can do</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
            <div style={{ width: 6, height: 6, borderRadius: 999, background: "#16A34A", flexShrink: 0, marginTop: 5 }} />
            <span style={{ fontSize: 12.5, color: "#166534", lineHeight: 1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Info tooltip (reusable) ── */

function InfoTooltip({ text }) {
  const [open, setOpen] = React.useState(false);
  const hideRef = React.useRef(null);
  function schedHide() { hideRef.current = setTimeout(() => setOpen(false), 140); }
  function cancelHide() { clearTimeout(hideRef.current); }
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      <button
        onMouseEnter={() => { cancelHide(); setOpen(true); }}
        onMouseLeave={schedHide}
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        aria-label="What does this mean?"
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 15, height: 15, borderRadius: 999,
          background: "rgba(99,102,241,0.10)", border: "none",
          color: "#6D28D9", fontSize: 10, fontWeight: 800, fontStyle: "italic",
          cursor: "pointer", flexShrink: 0, lineHeight: 1,
        }}
      >
        i
      </button>
      {open && (
        <div
          onMouseEnter={cancelHide}
          onMouseLeave={schedHide}
          style={{
            position: "absolute", bottom: "calc(100% + 7px)", left: "50%",
            transform: "translateX(-50%)", zIndex: 1001,
            background: "#FFFFFF", borderRadius: 14,
            boxShadow: "0 4px 24px rgba(99,102,241,0.14), 0 1px 6px rgba(0,0,0,0.08)",
            padding: "12px 14px", width: 232, whiteSpace: "normal",
          }}
        >
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{text}</div>
        </div>
      )}
    </span>
  );
}

/* ── SARB tab ── */

function SarbTab() {
  const HAS_REFERRAL = true;

  if (!HAS_REFERRAL) {
    return (
      <div style={{ background: "#F7F5FF", borderRadius: 20, padding: "52px 24px", textAlign: "center", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <I.Check size={26} color="#065F46" strokeWidth={2.5} />
        </div>
        <div style={{ fontSize: 15.5, fontWeight: 700, color: "#1E1B4B", marginBottom: 8 }}>No active SARB referral</div>
        <div style={{ fontSize: 13.5, color: "#9CA3AF", maxWidth: 280, margin: "0 auto", lineHeight: 1.55 }}>
          Your attendance is in good standing.
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Privacy banner — Mental Health style */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 12, padding: "10px 14px" }}>
        <I.Lock size={13} color="#5B21B6" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.5 }}>Your <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>SARB<InfoTooltip text="School Attendance Review Board — a team that works with students and families to improve attendance through support, not punishment." /></span> information is strictly confidential · Read only · Managed by Student Services</span>
      </div>

      {/* Main card */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>

        {/* Status chip */}
        <div style={{ marginBottom: 22 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 999, background: "#FFFBEB", border: "1px solid #FDE68A", color: "#92400E", fontSize: 12, fontWeight: 700 }}>
            Getting Support
            <InfoTooltip text="This means your attendance has been flagged for support. It's not a punishment — it's a signal that your school wants to help." />
          </span>
        </div>

        {/* Attendance Improvement Plan */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Attendance Improvement Plan
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ background: "#FFFBEB", borderRadius: 12, padding: "12px 14px", gridColumn: "span 2" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Goal</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B", lineHeight: 1.4 }}>Reduce absences to fewer than 3 per month</div>
            </div>
            <div style={{ background: "#F7F5FF", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Start Date</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>May 1, 2026</div>
            </div>
            <div style={{ background: "#F7F5FF", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Review Date</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>June 15, 2026</div>
            </div>
          </div>
        </div>

        {/* Required Actions */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Required Actions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Attend weekly check-ins with counselor",
              "Submit absence documentation within 2 days",
              "Complete attendance workshop by June 1",
            ].map((action, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "10px 14px", background: "#F7F5FF", borderRadius: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: 999, background: "#A78BFA", flexShrink: 0, marginTop: 5 }} />
                <span style={{ fontSize: 13, color: "#374151", lineHeight: 1.45 }}>{action}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Hearings */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Upcoming Hearings
          </div>
          <div style={{ background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#1E1B4B", marginBottom: 6 }}>SARB Hearing</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#78350F", marginBottom: 4 }}>
              <I.Calendar size={13} color="#B45309" strokeWidth={1.8} />
              June 20, 2026 · 9:00 AM
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: "#9CA3AF", marginBottom: 14 }}>
              <I.MapPin size={12} color="#C4B5FD" strokeWidth={1.8} />
              Admin Conference Room B
            </div>
            <CalendarButton event={{ name: "SARB Hearing", recurrence: "One-time", time: "9:00 AM", sessionDays: [] }} />
          </div>
        </div>

      </div>

      {/* Your Support Resources */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Your Support Resources</div>
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#FFFBEB", borderRadius: 10, marginBottom: 14 }}>
          <I.Info size={13} color="#B45309" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>These resources are here to support you — not define you. You have a team behind you.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { title: "Attendance Improvement Tips",         type: "Guide"      },
            { title: "Talking to Your Family About School", type: "Resource"   },
            { title: "Your Rights in the SARB Process",    type: "Info Sheet" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#FFFBEB", cursor: "pointer", transition: "background 100ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#FEF3C7"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#FFFBEB"; }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I.FileText size={17} color="#B45309" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1E1B4B" }}>{item.title}</div>
                <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{item.type}</div>
              </div>
              <a href="#" style={{ fontSize: 12, fontWeight: 600, color: "#B45309", textDecoration: "none", whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}>
                View →
              </a>
            </div>
          ))}
        </div>
      </div>
      <ActionNudgeCard items={[
        "Check in with your counselor before the next SARB hearing — they can help you prepare.",
        "Log any absences in your calendar so you have a record to share.",
        "If transportation is the issue, ask Ms. Delgado about school support options.",
      ]} />
    </div>
  );
}

/* ── ESY tab ── */

function EsyTab() {
  const IS_ENROLLED = true;

  const ESY_CLASSES = [
    { name: "Math Support",       days: "Mon / Wed / Fri", time: "9:00 – 11:00 AM", room: "Rm 204" },
    { name: "Reading Strategies", days: "Tue / Thu",       time: "9:00 – 11:00 AM", room: "Rm 210" },
  ];

  if (!IS_ENROLLED) {
    return (
      <div style={{ background: "#F7F5FF", borderRadius: 20, padding: "52px 24px", textAlign: "center", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 18, background: "#F0F9FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
          <I.Book size={26} color="#0369A1" />
        </div>
        <div style={{ fontSize: 15.5, fontWeight: 700, color: "#1E1B4B", marginBottom: 8 }}>No ESY or summer school enrollment on file</div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Privacy banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F0F9FF", border: "1px solid #BAE6FD", borderRadius: 12, padding: "10px 14px" }}>
        <I.Lock size={13} color="#0369A1" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#075985", lineHeight: 1.5 }}>Your <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>ESY<InfoTooltip text="Extended School Year — additional instruction during summer to help maintain the progress you've made during the school year." /></span> / summer school information is read only · Managed by Student Services</span>
      </div>

      {/* Main card */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>

        {/* Enrollment status + program */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
          <div style={{ background: "#F7F5FF", borderRadius: 12, padding: "12px 14px", gridColumn: "span 2" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Enrollment Status</div>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 11px", borderRadius: 999, background: "#D1FAE5", border: "1px solid #A7F3D0", color: "#065F46", fontSize: 12, fontWeight: 700 }}>
              Enrolled
            </span>
          </div>
          <div style={{ background: "#F7F5FF", borderRadius: 12, padding: "12px 14px", gridColumn: "span 2" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Program</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>Extended School Year (ESY)</div>
          </div>
          <div style={{ background: "#F0FDF4", borderRadius: 12, padding: "12px 14px", gridColumn: "span 2" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Session Dates</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>June 23 – July 25, 2026</div>
          </div>
        </div>

        {/* Schedule */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Schedule
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {ESY_CLASSES.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", padding: "13px 16px", background: "#F0F9FF", borderRadius: 14 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I.Book size={17} color="#0369A1" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B", marginBottom: 3 }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{c.days} · {c.time}</div>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#0369A1", background: "#E0F2FE", padding: "3px 10px", borderRadius: 8, flexShrink: 0 }}>{c.room}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location + calendar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#6B7280" }}>
            <I.MapPin size={13} color="#C4B5FD" strokeWidth={1.8} />
            Main Campus, Building C
          </div>
          <CalendarButton event={{ name: "ESY Program", recurrence: "Daily · June 23 – July 25", time: "9:00 AM – 11:00 AM", sessionDays: [] }} />
        </div>

      </div>
    </div>
  );
}

/* ── Crisis connect modal ── */

function CrisisModal({ onClose }) {
  const [selected, setSelected] = React.useState(null);

  const OPTIONS = [
    {
      id: "call988",
      icon: "Phone",
      label: "Call 988",
      desc: "Suicide & Crisis Lifeline · Free, confidential, 24/7",
    },
    {
      id: "text988",
      icon: "MessageSquare",
      label: "Text 988",
      desc: "Text with a crisis counselor · Free, confidential, 24/7",
    },
    {
      id: "text741",
      icon: "MessageSquare",
      label: "Text HOME to 741741",
      desc: "Crisis Text Line · Free, confidential, 24/7",
    },
  ];

  // Close on backdrop click
  function handleBackdrop(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
        background: "rgba(245,243,255,0.55)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 24,
          padding: "32px 28px 24px",
          width: "100%", maxWidth: 420,
          boxShadow: "0 8px 48px rgba(99,60,0,0.10), 0 2px 12px rgba(0,0,0,0.07)",
          position: "relative",
          animation: "crisisModalIn 220ms cubic-bezier(0.34,1.56,0.64,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#1E1B4B", letterSpacing: "-0.02em", marginBottom: 7 }}>
            You&#8217;re not alone
          </div>
          <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.55 }}>
            Choose how you&#8217;d like to connect right now:
          </div>
        </div>

        {/* Option cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.id;
            const Ic = I[opt.icon];
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(isSelected ? null : opt.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 16px",
                  borderRadius: 14,
                  border: isSelected ? "2px solid #FBBF24" : "2px solid #F3F4F6",
                  background: isSelected ? "#FFFBEB" : "#F9FAFB",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 120ms, background 120ms",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#E9D5FF";
                    e.currentTarget.style.background = "#FAF5FF";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = "#F3F4F6";
                    e.currentTarget.style.background = "#F9FAFB";
                  }
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                  background: isSelected ? "rgba(251,191,36,0.15)" : "rgba(167,139,250,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Ic size={18} color={isSelected ? "#D97706" : "#7C3AED"} strokeWidth={1.8} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: isSelected ? "#92400E" : "#1E1B4B", marginBottom: 2 }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.45 }}>
                    {opt.desc}
                  </div>
                </div>
                {isSelected && (
                  <div style={{
                    width: 20, height: 20, borderRadius: 999, flexShrink: 0,
                    background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <I.Check size={11} color="#FFFFFF" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Soft note */}
        <div style={{
          fontSize: 12, color: "#9CA3AF", lineHeight: 1.55, textAlign: "center",
          padding: "0 8px", marginBottom: 22,
        }}>
          These services are confidential. A counselor is ready to help you right now.
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            display: "block", width: "100%", height: 42,
            border: "1.5px solid #E5E7EB", borderRadius: 12,
            background: "transparent", color: "#6B7280",
            fontSize: 13.5, fontWeight: 600, cursor: "pointer",
            transition: "border-color 120ms, color 120ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.color = "#7C3AED"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#6B7280"; }}
        >
          Close
        </button>
      </div>

      {/* Entry animation keyframe */}
      <style>{`
        @keyframes crisisModalIn {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);     }
        }
      `}</style>
    </div>
  );
}

/* ── Right panel — Crisis Resources (persistent) ── */

function CrisisPanel({ tab }) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <React.Fragment>
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Crisis resources card */}
      <div style={{
        background: "linear-gradient(135deg, #FFF8F5 0%, #FDF0E8 100%)",
        borderRadius: 20, padding: "20px",
        boxShadow: "0 2px 18px rgba(234,88,12,0.08), 0 1px 4px rgba(0,0,0,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(234,88,12,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.Heart size={16} color="#C2410C" strokeWidth={0} style={{ fill: "#C2410C" }} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#C2410C" }}>Crisis Resources</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          {/* 988 */}
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#C2410C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
              988 Suicide &amp; Crisis Lifeline
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#78350F" }}>
              <I.Phone size={13} color="#C2410C" strokeWidth={1.8} />
              Call or text <strong>988</strong> · Free, confidential
            </div>
          </div>

          {/* Crisis Text Line */}
          <div style={{ background: "rgba(255,255,255,0.72)", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#C2410C", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
              Crisis Text Line
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#78350F" }}>
              <I.Messages size={13} color="#C2410C" strokeWidth={1.8} />
              Text <strong>HOME</strong> to <strong>741741</strong>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowModal(true)}
          style={{
            width: "100%", height: 38,
            background: "#FCA5A5", border: "none", borderRadius: 12,
            fontSize: 13, fontWeight: 700, color: "#7F1D1D", cursor: "pointer",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
            transition: "background 120ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F87171"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#FCA5A5"; }}>
          <I.Phone size={14} color="#7F1D1D" /> Talk to someone now
        </button>
      </div>

      {/* My Counselors quick links */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          Your Counselors
        </div>
        {[OKAFOR, DELGADO].map((person) => (
          <div key={person.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0" }}>
            <div style={{ width: 34, height: 34, borderRadius: 999, flexShrink: 0, background: `linear-gradient(135deg, ${person.avatarFrom}, ${person.avatarTo})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700, border: "2px solid rgba(255,255,255,0.75)" }}>
              {person.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.name}</div>
              <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>{person.avail}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Confidentiality note */}
      <div style={{ background: "#F7F5FF", borderRadius: 16, padding: "14px 16px" }}>
        <div style={{ fontSize: 13, color: "#5B21B6", lineHeight: 1.55 }}>
          <strong>Confidential:</strong> Your sessions with counselors are private. Information is only shared if there is a safety concern.
        </div>
      </div>

      {/* SARB tab — warm encouragement card */}
      {tab === "sarb" && (
        <div style={{ background: "#F5F3FF", borderRadius: 16, padding: "14px 16px" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#5B21B6", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Remember</div>
          <div style={{ fontSize: 13, color: "#4C1D95", lineHeight: 1.6 }}>
            You are not alone. Your counselors and support team are here to help you succeed.
          </div>
        </div>
      )}

      {/* ESY tab — program contact card */}
      {tab === "esy" && (
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>ESY Program Contact</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
              <I.MapPin size={13} color="#C4B5FD" strokeWidth={1.8} />
              Main Campus Office
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
              <I.Phone size={13} color="#C4B5FD" strokeWidth={1.8} />
              (555) 203-0100
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#9CA3AF" }}>
              <I.Clock size={13} color="#C4B5FD" strokeWidth={1.8} />
              Mon–Fri · 8:00 AM – 4:00 PM
            </div>
          </div>
          <button style={{ width: "100%", height: 32, background: "#E0F2FE", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={12} color="#0369A1" /> Request a meeting
          </button>
        </div>
      )}

    </div>

    {showModal && <CrisisModal onClose={() => setShowModal(false)} />}
    </React.Fragment>
  );
}

/* ── All counselors overview tab ── */

function CounselorsAllTab({ onViewDetails }) {
  function ProviderRow({ person, metaLabel, tabTarget }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#F7F5FF", borderRadius: 16, padding: "14px 18px" }}>
        <CAvatar person={person} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{person.name}</div>
          <div style={{ fontSize: 12.5, color: "#6B7280", marginTop: 2 }}>{person.role}</div>
          {metaLabel && <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{metaLabel}</div>}
        </div>
        <button
          onClick={() => onViewDetails(tabTarget)}
          style={{ height: 32, padding: "0 14px", background: "#EDE9FE", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#5B21B6", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "background 100ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#DDD6FE"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}
        >
          View details
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* Academic */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Academic</div>
        <ProviderRow person={HERNANDEZ} metaLabel="By appointment" tabTarget="academic" />
      </div>

      {/* Mental Health */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Mental Health</div>
        <ProviderRow person={OKAFOR} metaLabel="Next session · May 21, 2026" tabTarget="mental" />
      </div>

      {/* Trauma Support */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Trauma Support</div>
        <ProviderRow person={DELGADO} metaLabel="Next session · May 20, 2026" tabTarget="trauma" />
      </div>

    </div>
  );
}

/* ── Page root ── */

const COUNSELOR_TABS = [
  { id: "all",      label: "All"           },
  { id: "academic", label: "Academic"       },
  { id: "mental",   label: "Mental Health"  },
  { id: "trauma",   label: "Trauma Support" },
  { id: "sarb",     label: "SARB"           },
  { id: "esy",      label: "ESY"            },
];

function ShowRolesToggle({ showRoles, setShowRoles }) {
  return (
    <button
      onClick={() => setShowRoles((v) => !v)}
      aria-pressed={showRoles}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 0", flexShrink: 0 }}
    >
      <div style={{ position: "relative", width: 30, height: 17, borderRadius: 999, background: showRoles ? "#A78BFA" : "var(--mist)", border: showRoles ? "none" : "1px solid #CBD5E1", transition: "background 200ms", flexShrink: 0 }}>
        <div style={{ position: "absolute", top: showRoles ? 2 : 1, left: showRoles ? 14 : 1, width: 13, height: 13, borderRadius: 999, background: "#fff", boxShadow: "0 1px 3px rgba(15,23,42,0.22)", transition: "left 200ms, top 200ms" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: showRoles ? "#5B21B6" : "var(--stone)", transition: "color 200ms", userSelect: "none" }}>
        Show roles
      </span>
    </button>
  );
}

function MyCounselorsPage({ segments }) {
  const [tab,       setTab]       = React.useState("all");
  const [showRoles, setShowRoles] = React.useState(true);

  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto", background: "linear-gradient(160deg, #F3F4F8 0%, #F8F9FC 65%, #F4F7FB 100%)", minHeight: "100vh" }}>

      <Breadcrumbs segments={segments} />

      {/* Header */}
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ margin: "0 0 5px", fontSize: 32, fontWeight: 800, color: "#1E1B4B" }}>Counselors</h1>
        <p style={{ margin: 0, color: "#7C7C8A", fontSize: 15 }}>Your support team, Alex.</p>
      </div>

      {/* My Team tab bar */}
      {window.TeamTabs && <window.TeamTabs sub="counselors" />}

      {/* Search + controls bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <div role="search" aria-label="Search counselors" style={{ display: "flex", alignItems: "center", gap: 8, width: 320, height: 38, padding: "0 14px", background: "var(--paper)", borderRadius: 999, border: "1px solid var(--mist)", flexShrink: 0, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 10px -4px rgba(15,23,42,0.05)" }}>
          <I.Search size={14} color="var(--silver)" />
          <span style={{ fontSize: 13, color: "var(--silver)", userSelect: "none", pointerEvents: "none" }}>Search counselors…</span>
        </div>
        <ShowRolesToggle showRoles={showRoles} setShowRoles={setShowRoles} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>

        {/* Main column */}
        <div>
          {/* Segmented control */}
          <div style={{ display: "inline-flex", background: "#EDEEF2", borderRadius: 12, padding: 3, marginBottom: 20 }}>
            {COUNSELOR_TABS.map(({ id, label }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    display: "inline-flex", alignItems: "center", padding: "8px 18px",
                    border: "none", borderRadius: 9, cursor: "pointer",
                    background: active ? "#EDE9FE" : "transparent",
                    color: active ? "#5B21B6" : "#9CA3AF",
                    fontSize: 13, fontWeight: active ? 700 : 500,
                    whiteSpace: "nowrap", transition: "background 150ms, color 150ms",
                  }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#4B5563"; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#9CA3AF"; }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {tab === "all"      && <CounselorsAllTab onViewDetails={setTab} />}
          {tab === "academic" && <AcademicTab />}
          {tab === "mental"   && <MentalHealthTab />}
          {tab === "trauma"   && <TraumaSupportTab />}
          {tab === "sarb"     && <SarbTab />}
          {tab === "esy"      && <EsyTab />}
        </div>

        {/* Sticky right panel — always Crisis Resources */}
        <div style={{ position: "sticky", top: 24 }}>
          <CrisisPanel tab={tab} />
        </div>

      </div>
    </div>
  );
}

window.MyCounselorsPage = MyCounselorsPage;

})();

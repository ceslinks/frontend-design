// LINKS — My Doctors sub-page
// Route: #/my-team/doctors
// Exposes: window.MyDoctorsPage

(function () {

/* ── Data ── */

const WALSH = {
  id: "walsh",
  name: "Nurse Patricia Walsh",
  role: "School Nurse",
  cat: "Doctor",
  avail: "Health Office · Mon–Fri 8AM–3PM",
  initials: "PW",
  avatarFrom: "#FCA5A5",
  avatarTo: "#E11D48",
  phone: "(555) 203-4100",
  email: "p.walsh@linkshs.edu",
  location: "Building A, Room 12",
};

const IMMUNIZATIONS = [
  { name: "Tdap (Tetanus)",          status: "current",  date: "Aug 2024"     },
  { name: "MMR",                     status: "current",  date: "Sep 2022"     },
  { name: "Varicella",               status: "current",  date: "Sep 2022"     },
  { name: "Hepatitis B",             status: "current",  date: "Jun 2021"     },
  { name: "Meningococcal (MenACWY)", status: "current",  date: "Jul 2024"     },
  { name: "Annual Flu Shot",         status: "due-soon", date: "Due Oct 2026" },
];

const NEXT_APPT = {
  type: "Annual Health Screening",
  date: "May 29, 2026",
  time: "10:30 AM",
  location: "Health Office, Building A",
};

const PCP_PROVIDERS = [
  {
    id: "torres",
    name: "Dr. Michael Torres",
    role: "Family Medicine",
    chipLabel: "PCP", chipBg: "#E0F2FE", chipFg: "#0369A1",
    email: "m.torres@valleyclinic.com",
    phone: "(555) 401-2200",
    location: "Valley Clinic, Suite 200",
    initials: "MT",
    avatarFrom: "#67E8F9", avatarTo: "#0891B2",
    nextAppt: { type: "Annual Physical", date: "June 12, 2026", time: "9:00 AM" },
    calEventObj: { name: "Annual Physical — Dr. Torres", recurrence: "One-time", time: "9:00 AM", sessionDays: [] },
  },
  {
    id: "chen-s",
    name: "Dr. Sarah Chen",
    role: "Optometrist",
    chipLabel: "Optometry", chipBg: "#EDE9FE", chipFg: "#5B21B6",
    email: "s.chen@visionclinic.com",
    phone: "(555) 401-3300",
    location: "Vision Clinic, Suite 110",
    initials: "SC",
    avatarFrom: "#C4B5FD", avatarTo: "#7C3AED",
    nextAppt: { type: "Eye Exam", date: "June 24, 2026", time: "11:00 AM" },
    calEventObj: { name: "Eye Exam — Dr. Chen", recurrence: "One-time", time: "11:00 AM", sessionDays: [] },
  },
  {
    id: "okafor-j",
    name: "Dr. James Okafor",
    role: "Orthopedic Specialist",
    chipLabel: "Orthopedics", chipBg: "#FFE4E6", chipFg: "#9F1239",
    email: "j.okafor@orthocenter.com",
    phone: "(555) 401-4400",
    location: "Ortho Center, Suite 305",
    initials: "JO",
    avatarFrom: "#FCA5A5", avatarTo: "#E11D48",
    nextAppt: { type: "Follow-up Consultation", date: "May 28, 2026", time: "2:30 PM" },
    calEventObj: { name: "Follow-up — Dr. Okafor", recurrence: "One-time", time: "2:30 PM", sessionDays: [28] },
  },
];

/* ── Shared avatar ── */

function DAvatar({ person, size = 52 }) {
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

const THERAPY_PROVIDERS = [
  {
    id: "park", tabId: "speech",
    name: "Ms. Linda Park", role: "Speech-Language Pathologist", specialty: "Speech Therapy",
    location: "Speech Therapy Room, Building B", phone: "(555) 203-4500",
    email: "l.park@linkshs.edu", availability: "By appointment",
    initials: "LP", avatarFrom: "#FDE68A", avatarTo: "#F59E0B",
    sessions: [
      { label: "Last session",   value: "May 15, 2026 · 10:00 AM" },
      { label: "Next session",   value: "May 22, 2026 · 10:00 AM" },
      { label: "Frequency",      value: "Weekly"                   },
      { label: "Session length", value: "45 minutes"               },
    ],
    calEvent: "Speech Therapy Session", calDatetime: "May 22, 2026 · 10:00 AM",
    calEventObj: { name: "Speech Therapy Session", recurrence: "Weekly", time: "10:00 AM", sessionDays: [1, 8, 15, 22, 29] },
    overviewNext: "May 22, 2026",
    sharedDocs: {
      framing: "Ms. Park shared these to support your progress between sessions.",
      items: [
        { title: "Your Speech Therapy Goals",         type: "Progress Summary" },
        { title: "Practice Activities for This Week", type: "Worksheet"        },
      ],
    },
  },
  {
    id: "mendez", tabId: "physical",
    name: "Mr. Carlos Mendez", role: "Physical Therapist", specialty: "Physical Therapy",
    location: "PT Room, Building C", phone: "(555) 203-4600",
    email: "c.mendez@linkshs.edu", availability: "By appointment",
    initials: "CM", avatarFrom: "#A5F3FC", avatarTo: "#0891B2",
    sessions: [
      { label: "Last session",   value: "May 16, 2026 · 2:00 PM"  },
      { label: "Next session",   value: "May 23, 2026 · 2:00 PM"  },
      { label: "Frequency",      value: "Weekly"                   },
      { label: "Session length", value: "60 minutes"               },
    ],
    calEvent: "Physical Therapy Session", calDatetime: "May 23, 2026 · 2:00 PM",
    calEventObj: { name: "Physical Therapy Session", recurrence: "Weekly", time: "2:00 PM", sessionDays: [2, 9, 16, 23, 30] },
    overviewNext: "May 23, 2026",
    sharedDocs: {
      framing: "Mr. Mendez shared these to help you stay on track between sessions.",
      items: [
        { title: "Your PT Goals This Month", type: "Progress Summary" },
        { title: "Home Exercise Plan",       type: "Worksheet"        },
      ],
    },
  },
  {
    id: "nair", tabId: "occupational",
    name: "Ms. Priya Nair", role: "Occupational Therapist", specialty: "Occupational Therapy",
    location: "OT Room, Building B", phone: "(555) 203-4700",
    email: "p.nair@linkshs.edu", availability: "By appointment",
    initials: "PN", avatarFrom: "#C4B5FD", avatarTo: "#7C3AED",
    sessions: [
      { label: "Last session",   value: "May 20, 2026 · 11:00 AM" },
      { label: "Next session",   value: "May 27, 2026 · 11:00 AM" },
      { label: "Frequency",      value: "Bi-weekly"                },
      { label: "Session length", value: "45 minutes"               },
    ],
    calEvent: "Occupational Therapy Session", calDatetime: "May 27, 2026 · 11:00 AM",
    calEventObj: { name: "Occupational Therapy Session", recurrence: "Bi-weekly", time: "11:00 AM", sessionDays: [13, 27] },
    overviewNext: "May 27, 2026",
    sharedDocs: {
      framing: "Ms. Nair shared these to support your independence and daily skills.",
      items: [
        { title: "Your OT Goals This Month",   type: "Progress Summary" },
        { title: "Daily Strategies Checklist", type: "Worksheet"        },
      ],
    },
  },
];

/* ── Medical alert data ── */

const MEDICAL_ALERTS = [
  { type: "Allergy",    name: "Penicillin"                   },
  { type: "Medication", name: "Albuterol inhaler, as needed" },
  { type: "Condition",  name: "Asthma"                       },
];

const ALERT_CHIP_STYLES = {
  "Allergy":    { bg: "#EDE9FE", border: "#C4B5FD", fg: "#4C1D95" },
  "Medication": { bg: "#EFF6FF", border: "#BFDBFE", fg: "#1E40AF" },
  "Condition":  { bg: "#F1F5F9", border: "#CBD5E1", fg: "#334155" },
};

/* ── Request Update Modal ── */

function RequestUpdateModal({ onClose }) {
  const [selectedAlert, setSelectedAlert] = React.useState("");
  const [details,       setDetails]       = React.useState("");
  const [sent,          setSent]          = React.useState(false);

  function handleSend() {
    setSent(true);
    setTimeout(() => { onClose(); }, 2000);
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 440, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>

        {/* Close */}
        <button onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <I.X size={16} color="var(--stone)" />
        </button>

        {sent ? (
          <div style={{ textAlign: "center", padding: "20px 0 8px" }}>
            <div style={{ width: 48, height: 48, borderRadius: 999, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
              <I.Check size={22} color="#5B21B6" strokeWidth={2.5} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B", marginBottom: 6 }}>Request sent</div>
            <div style={{ fontSize: 13, color: "#6B7280" }}>Nurse Patricia Walsh and health staff will review your request.</div>
          </div>
        ) : (
          <React.Fragment>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 800, color: "var(--ink)", margin: "0 0 20px", paddingRight: 32 }}>
              Request a record update
            </h2>

            {/* Recipient — read-only */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Recipient</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#F7F5FF", borderRadius: 10, border: "1px solid #EDE9FE" }}>
                <I.Lock size={12} color="#A78BFA" strokeWidth={2} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#4B5563" }}>Nurse Patricia Walsh · School Administration</span>
              </div>
            </div>

            {/* Alert dropdown */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Which alert needs updating?</div>
              <div style={{ position: "relative" }}>
                <select
                  value={selectedAlert}
                  onChange={(e) => setSelectedAlert(e.target.value)}
                  style={{ width: "100%", height: 40, borderRadius: 10, border: "1.5px solid #E5E7EB", padding: "0 36px 0 14px", fontSize: 13, color: selectedAlert ? "#1E1B4B" : "#9CA3AF", background: "#FFFFFF", WebkitAppearance: "none", appearance: "none", cursor: "pointer", outline: "none" }}
                >
                  <option value="" disabled>Select an alert…</option>
                  <option value="allergy">Penicillin allergy</option>
                  <option value="medication">Albuterol medication</option>
                  <option value="condition">Asthma condition</option>
                  <option value="other">Other</option>
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
                  <I.ChevronDown size={14} color="#9CA3AF" />
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Additional details</div>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Describe what needs to be updated…"
                style={{ display: "block", width: "100%", height: 90, borderRadius: 10, border: "1.5px solid #E5E7EB", padding: "10px 14px", fontSize: 13, color: "#1E1B4B", background: "#FFFFFF", resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              />
            </div>

            {/* Privacy note */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 7, padding: "10px 12px", background: "#F7F5FF", borderRadius: 10, marginBottom: 20 }}>
              <I.Shield size={12} color="#A78BFA" strokeWidth={2} style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>This request is private and goes directly to health staff</span>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
              <button
                onClick={handleSend}
                disabled={!selectedAlert}
                className="btn btn-primary"
                style={{ fontSize: 13, opacity: selectedAlert ? 1 : 0.5, cursor: selectedAlert ? "pointer" : "not-allowed" }}
              >
                Send request
              </button>
            </div>
          </React.Fragment>
        )}

      </div>
    </div>
  );
}

/* ── School Office Modal ── */

function SchoolOfficeModal({ person, onClose, onSend }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 480, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>

        {/* Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22, paddingRight: 32 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.School size={16} color="#5B21B6" />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
            Request through school office
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
          {/* Regarding — read-only */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Regarding</label>
            <div style={{ height: 38, padding: "0 12px", border: "none", borderRadius: 10, background: "#F7F5FF", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, background: `linear-gradient(135deg, ${person.avatarFrom}, ${person.avatarTo})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8.5, fontWeight: 700 }}>
                {person.initials}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{person.name}</span>
            </div>
          </div>
          {/* Request description */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Describe your request</label>
            <textarea placeholder="What would you like to request or ask about?" rows={5} style={{ width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: 100, fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6, border: "1px solid #E0DEFA", borderRadius: 6, padding: "10px 12px", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DEFA"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>
        </div>

        {/* Info note */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 7, padding: "10px 12px", background: "#F7F5FF", borderRadius: 8, marginBottom: 20 }}>
          <I.Info size={12} color="#A78BFA" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>Your request will be routed to the school office who will follow up with you.</span>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { onSend(); onClose(); }} style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.Send size={13} color="currentColor" /> Send request
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Medical Alerts card ── */

function MedicalAlertsCard() {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <React.Fragment>
      <div style={{
        background: "#FAFBFF",
        border: "1px solid #DDD6FE",
        borderRadius: 16,
        padding: "14px 18px 16px",
        marginBottom: 20,
      }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 9 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 7, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I.Shield size={13} color="#5B21B6" strokeWidth={2} />
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#3B1F6E" }}>Medical Alerts</span>
              <span style={{ fontSize: 11, color: "#9CA3AF" }}>Protected under HIPAA · Read only</span>
            </div>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            style={{ fontSize: 12, color: "#6D28D9", background: "none", border: "none", cursor: "pointer", padding: "2px 0", fontWeight: 500, whiteSpace: "nowrap", flexShrink: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
          >
            Flag for review
          </button>
        </div>

        {/* Audit log */}
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 13 }}>
          <I.Lock size={10} color="#C4B5FD" strokeWidth={2} />
          <span style={{ fontSize: 11, color: "#B0AABF" }}>Access to this information is logged</span>
        </div>

        {/* Alert chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {MEDICAL_ALERTS.map((alert) => {
            const cs = ALERT_CHIP_STYLES[alert.type] || {};
            return (
              <div key={alert.type} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "5px 12px", borderRadius: 999,
                background: cs.bg, border: `1px solid ${cs.border}`,
                fontSize: 12.5, color: cs.fg,
              }}>
                <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.65, textTransform: "uppercase", letterSpacing: "0.05em" }}>{alert.type}</span>
                <span style={{ width: 1, height: 11, background: cs.border, opacity: 0.5, display: "inline-block" }} />
                <span style={{ fontWeight: 500 }}>{alert.name}</span>
              </div>
            );
          })}
        </div>

      </div>
      {modalOpen && <RequestUpdateModal onClose={() => setModalOpen(false)} />}
    </React.Fragment>
  );
}

/* ── School Nurse tab ── */

function SchoolNurseTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Compliance banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "10px 14px" }}>
        <I.Lock size={13} color="#15803D" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>Your health information is protected under <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>FERPA &amp; HIPAA<InfoTooltip text="FERPA protects your school records. HIPAA protects your medical information. Both mean your information stays private." /></span> · Read only · Managed by health office</span>
      </div>

      {/* Nurse contact card */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
          <DAvatar person={WALSH} size={58} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#1E1B4B", marginBottom: 3 }}>{WALSH.name}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>{WALSH.role}</div>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, background: "#E0F2FE", color: "#0369A1", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}>
              Doctor
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 18 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.MapPin size={15} color="#C4B5FD" strokeWidth={1.8} />
            {WALSH.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Phone size={15} color="#C4B5FD" strokeWidth={1.8} />
            {WALSH.phone}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Mail size={15} color="#C4B5FD" strokeWidth={1.8} />
            {WALSH.email}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Clock size={15} color="#C4B5FD" strokeWidth={1.8} />
            Mon–Fri · 8:00 AM – 3:00 PM
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
            <I.Calendar size={13} color="#0369A1" /> Schedule visit
          </button>
        </div>
      </div>

      {/* Next appointment */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
          Next Appointment
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Calendar size={24} color="#0369A1" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B" }}>{NEXT_APPT.type}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginTop: 3 }}>{NEXT_APPT.date} · {NEXT_APPT.time}</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{NEXT_APPT.location}</div>
            <div style={{ marginTop: 10 }}>
              <CalendarButton event={{ name: NEXT_APPT.type, recurrence: "One-time", time: NEXT_APPT.time, sessionDays: [29] }} />
            </div>
          </div>
        </div>
      </div>

      {/* Immunization status */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Immunization Status
          </div>
          <span style={{ fontSize: 11.5, color: "#9CA3AF", fontStyle: "italic" }}>Read-only · From school records</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {IMMUNIZATIONS.map((imm, i) => {
            const due = imm.status === "due-soon";
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "11px 14px", borderRadius: 12,
                background: due ? "#FFFBEB" : "#F0FDF4",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: due ? "#FEF3C7" : "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {due
                      ? <I.Clock size={12} color="#92400E" />
                      : <I.Check size={12} color="#065F46" />
                    }
                  </div>
                  <span style={{ fontSize: 13, color: "#1E1B4B", fontWeight: 500 }}>{imm.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 12, color: due ? "#92400E" : "#6B7280" }}>{imm.date}</span>
                  <span style={{
                    display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 999,
                    background: due ? "#FEF3C7" : "#D1FAE5",
                    color: due ? "#92400E" : "#065F46",
                    fontSize: 10.5, fontWeight: 700,
                  }}>
                    {due ? "Due soon" : "Up to date"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Physical exam dates */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Physical Exam</div>
          <span style={{ fontSize: 11.5, color: "#9CA3AF", fontStyle: "italic" }}>Read-only · From school records</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 12, background: "#F0FDF4" }}>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Last physical exam</span>
            <span style={{ fontSize: 13, color: "#065F46", fontWeight: 600 }}>Sept 12, 2025</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 14px", borderRadius: 12, background: "#FFFBEB" }}>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>Next due</span>
            <span style={{ fontSize: 13, color: "#92400E", fontWeight: 600 }}>Sept 2026</span>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── PCP / Specialists tab ── */

function PCPProviderCard({ p }) {
  const [officeOpen, setOfficeOpen] = React.useState(false);
  const [toast,      setToast]      = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <React.Fragment>
      {officeOpen && <SchoolOfficeModal person={p} onClose={() => setOfficeOpen(false)} onSend={() => setToast("office")} />}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>Request sent to school office ✓</span>
        </div>
      )}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>

        {/* Provider header */}
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
          <DAvatar person={p} size={58} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#1E1B4B", marginBottom: 3 }}>{p.name}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>{p.role}</div>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, background: p.chipBg, color: p.chipFg, fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}>
              {p.chipLabel}
            </span>
          </div>
        </div>

        {/* Contact info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 18, borderTop: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.MapPin size={15} color="#C4B5FD" strokeWidth={1.8} />
            {p.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Phone size={15} color="#C4B5FD" strokeWidth={1.8} />
            {p.phone}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Mail size={15} color="#C4B5FD" strokeWidth={1.8} />
            {p.email}
          </div>
        </div>

        {/* Next appointment */}
        <div style={{ marginTop: 20, paddingTop: 18, borderTop: "1px solid #F3F4F6" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
            Next Appointment
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I.Calendar size={20} color="#0369A1" />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1E1B4B" }}>{p.nextAppt.type}</div>
              <div style={{ fontSize: 12.5, color: "#6B7280", marginTop: 3 }}>{p.nextAppt.date} · {p.nextAppt.time}</div>
            </div>
          </div>
        </div>

        {/* Actions: School Office + Add to calendar */}
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 4 }}>
          <button
            onClick={() => setOfficeOpen(true)}
            style={{ flex: 1, height: 34, background: "#F1F5F9", border: "none", borderRadius: 10, fontSize: 11.5, fontWeight: 600, color: "#334155", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E2E8F0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}
          >
            <I.School size={13} color="#334155" /> Request through school office
          </button>
          <CalendarButton event={p.calEventObj} />
        </div>

      </div>
    </React.Fragment>
  );
}

function PCPTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Compliance banner */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "10px 14px" }}>
        <I.Lock size={13} color="#15803D" strokeWidth={2} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>Your health information is protected under FERPA &amp; HIPAA · Read only · Managed by health office</span>
      </div>

      {PCP_PROVIDERS.map((p) => <PCPProviderCard key={p.id} p={p} />)}
    </div>
  );
}

/* ── Info tooltip ── */

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
      >i</button>
      {open && (
        <div onMouseEnter={cancelHide} onMouseLeave={schedHide}
          style={{ position: "absolute", bottom: "calc(100% + 7px)", left: "50%",
            transform: "translateX(-50%)", zIndex: 1001, background: "#FFFFFF",
            borderRadius: 14, boxShadow: "0 4px 24px rgba(99,102,241,0.14), 0 1px 6px rgba(0,0,0,0.08)",
            padding: "12px 14px", width: 232, whiteSpace: "normal" }}>
          <div style={{ fontSize: 12, color: "#374151", lineHeight: 1.6 }}>{text}</div>
        </div>
      )}
    </span>
  );
}

/* ── Therapy shared components ── */

function TherapyBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "10px 14px", marginBottom: 20 }}>
      <I.Lock size={13} color="#15803D" strokeWidth={2} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>Your therapy information is protected under <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>FERPA &amp; HIPAA<InfoTooltip text="FERPA protects your school records. HIPAA protects your medical information. Both mean your information stays private." /></span> · Read only · Managed by health office</span>
    </div>
  );
}

function TherapyProviderCard({ provider }) {
  const [officeOpen, setOfficeOpen] = React.useState(false);
  const [toast,      setToast]      = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <React.Fragment>
      {officeOpen && <SchoolOfficeModal person={provider} onClose={() => setOfficeOpen(false)} onSend={() => setToast("office")} />}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>Request sent to school office ✓</span>
        </div>
      )}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)", marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
          <DAvatar person={provider} size={58} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#1E1B4B", marginBottom: 3 }}>{provider.name}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>{provider.role}</div>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}>
              Active
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 11, paddingTop: 18, borderTop: "1px solid #F3F4F6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.MapPin size={15} color="#C4B5FD" strokeWidth={1.8} />
            {provider.location}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Phone size={15} color="#C4B5FD" strokeWidth={1.8} />
            {provider.phone}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Mail size={15} color="#C4B5FD" strokeWidth={1.8} />
            {provider.email}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#374151" }}>
            <I.Clock size={15} color="#C4B5FD" strokeWidth={1.8} />
            {provider.availability}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
          <button
            onClick={() => setOfficeOpen(true)}
            style={{ flex: 1, height: 34, background: "#F1F5F9", border: "none", borderRadius: 10, fontSize: 11.5, fontWeight: 600, color: "#334155", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E2E8F0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}>
            <I.School size={13} color="#334155" /> Request through school office
          </button>
          <button style={{ flex: 1, height: 34, background: "#E0F2FE", border: "none", borderRadius: 10, fontSize: 12.5, fontWeight: 600, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={13} color="#0369A1" /> Schedule session
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

function TherapySessionSchedule({ provider }) {
  const nextSession = provider.sessions.find((s) => s.label === "Next session");
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
        Session Schedule
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {provider.sessions.map((s, i) => {
          const isNext = s.label === "Next session";
          return (
            <div key={i} style={{ background: "#F7F5FF", borderRadius: 12, padding: "13px 15px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", marginBottom: 5 }}>{s.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B" }}>{s.value}</div>
              {isNext && (
                <div style={{ marginTop: 10 }}>
                  <CalendarButton event={provider.calEventObj} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TherapyTab({ provider }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <TherapyBanner />
      <TherapyProviderCard provider={provider} />
      <TherapySessionSchedule provider={provider} />
      {provider.sharedDocs && (
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)", marginTop: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Shared with you</div>
          <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#F0FDF4", borderRadius: 10, marginBottom: 14 }}>
            <I.Info size={13} color="#15803D" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>{provider.sharedDocs.framing}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {provider.sharedDocs.items.map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#F7F5FF", cursor: "pointer", transition: "background 100ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F5FF"; }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I.FileText size={17} color="#5B21B6" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1E1B4B" }}>{item.title}</div>
                  <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{item.type}</div>
                </div>
                <a href="#" style={{ fontSize: 12, fontWeight: 600, color: "#5B21B6", textDecoration: "none", whiteSpace: "nowrap" }}
                  onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}>
                  View →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TherapyOverviewTab({ onViewDetails }) {
  function ProviderRow({ person, primaryLabel, secondaryLabel, metaLabel, tabTarget, bg }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: bg || "#F7F5FF", borderRadius: 16, padding: "14px 18px" }}>
        <DAvatar person={person} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{primaryLabel}</div>
          <div style={{ fontSize: 12.5, color: "#6B7280", marginTop: 2 }}>{secondaryLabel}</div>
          <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{metaLabel}</div>
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

      {/* Health Office section */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Health Office</div>
        <ProviderRow
          person={WALSH}
          primaryLabel={WALSH.name}
          secondaryLabel={WALSH.role}
          metaLabel="Office hours · Mon–Fri · 8:00 AM – 3:00 PM"
          tabTarget="nurse"
          bg="#F0FDF4"
        />
      </div>

      {/* Therapy Services section */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Therapy Services</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {THERAPY_PROVIDERS.map((p) => (
            <ProviderRow
              key={p.id}
              person={p}
              primaryLabel={p.name}
              secondaryLabel={p.specialty}
              metaLabel={"Next session · " + p.overviewNext}
              tabTarget={p.tabId}
            />
          ))}
        </div>
      </div>

    </div>
  );
}

/* ── Right panel (persistent) ── */

function NursePanel({ tab }) {
  const showTherapyTeam = tab === "all" || tab === "speech" || tab === "physical" || tab === "occupational";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Walsh quick card */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
          <DAvatar person={WALSH} size={44} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{WALSH.name}</div>
            <div style={{ fontSize: 12, color: "#6B7280" }}>{WALSH.role}</div>
          </div>
        </div>

        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
          Health Office Hours
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
            <I.Clock size={13} color="#C4B5FD" strokeWidth={1.8} />
            Mon–Fri · 8:00 AM – 3:00 PM
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
            <I.MapPin size={13} color="#C4B5FD" strokeWidth={1.8} />
            Building A, Room 12
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
            <I.Phone size={13} color="#C4B5FD" strokeWidth={1.8} />
            (555) 203-4100
          </div>
        </div>

        <button style={{
          width: "100%", height: 36,
          background: "#D1FAE5", border: "none", borderRadius: 12,
          fontSize: 13, fontWeight: 700, color: "#065F46", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          transition: "background 120ms",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
          <I.MapPin size={13} color="#065F46" /> Visit health office
        </button>
      </div>

      {/* Quick actions */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          Quick Actions
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <button style={{ width: "100%", height: 34, background: "#E0F2FE", border: "none", borderRadius: 10, fontSize: 12.5, fontWeight: 600, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, padding: "0 14px", transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={13} color="#0369A1" /> Request appointment
          </button>
          <button style={{ width: "100%", height: 34, background: "#D1FAE5", border: "none", borderRadius: 10, fontSize: 12.5, fontWeight: 600, color: "#065F46", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 7, padding: "0 14px", transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
            <I.Messages size={13} color="#065F46" /> Message Nurse Walsh
          </button>
        </div>
      </div>

      {/* Therapy team — visible on Speech, PT, OT tabs */}
      {showTherapyTeam && (
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Your Therapy Team</div>
          {THERAPY_PROVIDERS.map((p, i) => (
            <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < THERAPY_PROVIDERS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <DAvatar person={p} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>{p.specialty}</div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

/* ── Page root ── */

const DOCTOR_TABS = [
  { id: "all",          label: "All"                  },
  { id: "nurse",        label: "School Nurse"         },
  { id: "specialists",  label: "PCP / Specialists"    },
  { id: "speech",       label: "Speech Therapy"       },
  { id: "physical",     label: "Physical Therapy"     },
  { id: "occupational", label: "Occupational Therapy" },
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

function MyDoctorsPage({ segments }) {
  const [tab,       setTab]       = React.useState("all");
  const [showRoles, setShowRoles] = React.useState(true);

  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto", background: "linear-gradient(160deg, #F3F4F8 0%, #F8F9FC 65%, #F4F7FB 100%)", minHeight: "100vh" }}>

      <Breadcrumbs segments={segments} />

      {/* Header */}
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ margin: "0 0 5px", fontSize: 32, fontWeight: 800, color: "#1E1B4B" }}>Doctors</h1>
        <p style={{ margin: 0, color: "#7C7C8A", fontSize: 15 }}>Your health contacts, Alex.</p>
      </div>

      {/* My Team tab bar */}
      {window.TeamTabs && <window.TeamTabs sub="doctors" />}

      {/* Search + controls bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <div role="search" aria-label="Search health contacts" style={{ display: "flex", alignItems: "center", gap: 8, width: 320, height: 38, padding: "0 14px", background: "var(--paper)", borderRadius: 999, border: "1px solid var(--mist)", flexShrink: 0, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 10px -4px rgba(15,23,42,0.05)" }}>
          <I.Search size={14} color="var(--silver)" />
          <span style={{ fontSize: 13, color: "var(--silver)", userSelect: "none", pointerEvents: "none" }}>Search health contacts…</span>
        </div>
        <ShowRolesToggle showRoles={showRoles} setShowRoles={setShowRoles} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>

        {/* Main column */}
        <div>
          {/* Segmented control */}
          <div style={{ display: "inline-flex", background: "#EDEEF2", borderRadius: 12, padding: 3, marginBottom: 20 }}>
            {DOCTOR_TABS.map(({ id, label }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  style={{
                    display: "inline-flex", alignItems: "center", padding: "8px 18px",
                    border: "none", borderRadius: 9, cursor: "pointer",
                    background: active ? "#D1FAE5" : "transparent",
                    color: active ? "#065F46" : "#9CA3AF",
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

          {/* Medical Alerts — persistent across all sub-tabs */}
          <MedicalAlertsCard />

          {tab === "all"          && <TherapyOverviewTab onViewDetails={setTab} />}
          {tab === "nurse"        && <SchoolNurseTab />}
          {tab === "specialists"  && <PCPTab />}
          {tab === "speech"       && <TherapyTab provider={THERAPY_PROVIDERS[0]} />}
          {tab === "physical"     && <TherapyTab provider={THERAPY_PROVIDERS[1]} />}
          {tab === "occupational" && <TherapyTab provider={THERAPY_PROVIDERS[2]} />}
        </div>

        {/* Sticky right panel */}
        <div style={{ position: "sticky", top: 24 }}>
          <NursePanel tab={tab} />
        </div>

      </div>
    </div>
  );
}

window.MedicalAlertsCard = MedicalAlertsCard;
window.MyDoctorsPage = MyDoctorsPage;

})();

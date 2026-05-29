// LINKS — My Home Team sub-page
// Route: #/my-team/home-team
// Exposes: window.MyHomeTeamPage

(function () {

/* ── Data ── */

const HOME_TEAM_TABS = [
  { id: "guardians",      label: "Parents & Guardians" },
  { id: "communications", label: "Communications"       },
];

const GUARDIANS = [
  {
    id: "mom",
    name: "Maria Johnson",
    relationship: "Mom",
    initials: "MJ",
    avatarFrom: "#FDE68A",
    avatarTo:   "#F59E0B",
    email: "m.johnson@email.com",
    phone: "(555) 304-1100",
  },
  {
    id: "dad",
    name: "Robert Johnson",
    relationship: "Dad",
    initials: "RJ",
    avatarFrom: "#A5F3FC",
    avatarTo:   "#0891B2",
    email: "r.johnson@email.com",
    phone: "(555) 304-1200",
  },
];

const SCHOOL_ANNOUNCEMENTS = [
  {
    id: "ann-1",
    sender: "Lincoln High School",
    subject: "End-of-Year Celebration — May 30",
    date: "May 15, 2026",
    body: "Dear Johnson Family,\n\nWe are excited to invite you to our End-of-Year Celebration on Friday, May 30, 2026 from 5:00–7:00 PM on the main campus quad. This event is open to all students and families.\n\nLight refreshments will be provided. We hope to see you there!\n\nLincoln High School Administration",
  },
  {
    id: "ann-2",
    sender: "Student Services Office",
    subject: "Summer Registration Opens June 1",
    date: "May 12, 2026",
    body: "Dear Johnson Family,\n\nSummer enrichment registration opens June 1, 2026. Students can sign up for academic support courses, elective workshops, and athletics programs through the LINKS portal.\n\nPlease contact Student Services at (555) 203-0100 if you have any questions.\n\nStudent Services Office",
  },
  {
    id: "ann-3",
    sender: "Health Office",
    subject: "Annual Health Screening — May 29",
    date: "May 10, 2026",
    body: "Dear Johnson Family,\n\nThis is a reminder that Alex has a scheduled Annual Health Screening on Thursday, May 29, 2026 at 10:30 AM in the Health Office, Building A.\n\nNo preparation is required. Please reach out to Nurse Patricia Walsh at (555) 203-4100 with any questions.\n\nHealth Office",
  },
];

const TEACHER_MESSAGES = [
  {
    id: "tm-1",
    sender: "Ms. Linda Kim · Algebra II",
    subject: "Progress Update — Algebra II",
    date: "May 16, 2026",
    body: "Dear Johnson Family,\n\nI wanted to share a quick progress update on Alex in Algebra II. Alex has shown real improvement in understanding quadratic equations over the past two weeks and consistently completes assignments on time.\n\nI'd encourage Alex to continue reviewing notes before tests. Please don't hesitate to reach out if you have any questions.\n\nBest,\nMs. Kim",
  },
  {
    id: "tm-2",
    sender: "Mr. Aaron Greene · AP Physics",
    subject: "Lab Report Feedback — Newton's Third Law",
    date: "May 14, 2026",
    body: "Dear Johnson Family,\n\nI'm writing to share feedback on Alex's recent lab report on Newton's Third Law. The analysis was strong and showed clear scientific reasoning. I've returned the report with detailed comments through the portal.\n\nAlex is doing excellent work. Keep it up!\n\nBest,\nMr. Greene",
  },
  {
    id: "tm-3",
    sender: "Dr. Priya Patel · AP World History",
    subject: "Upcoming Essay: Peer Review Notes",
    date: "May 11, 2026",
    body: "Dear Johnson Family,\n\nI wanted to let you know that Alex will be participating in a peer review workshop on May 22 for the upcoming AP World History essay. Participation is graded as part of the assignment.\n\nAlex has a strong voice in their writing — I look forward to seeing the final draft. Please encourage them to complete the peer review checklist before class.\n\nBest,\nDr. Patel",
  },
];

const CONFERENCES = [
  {
    id: "conf-1",
    title: "Spring Parent-Teacher Conference",
    organizer: "Academic Counseling Office",
    date: "June 3, 2026",
    time: "3:00 PM",
  },
  {
    id: "conf-2",
    title: "IEP Annual Review Meeting",
    organizer: "Special Education Department",
    date: "June 11, 2026",
    time: "4:30 PM",
  },
];

/* ── Shared avatar ── */

function HAvatar({ person, size = 52 }) {
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

/* ── Guardian card — compact single-row ── */

function GuardianCard({ person }) {
  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 16,
      padding: "16px 20px",
      boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)",
      display: "flex", alignItems: "center", gap: 16,
    }}>

      {/* Avatar */}
      <HAvatar person={person} size={46} />

      {/* Name + relationship */}
      <div style={{ flex: "0 0 160px", minWidth: 0 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: "#1E1B4B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {person.name}
        </div>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{person.relationship}</div>
      </div>

      {/* Contact details */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 5, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#374151" }}>
          <I.Phone size={13} color="#C4B5FD" strokeWidth={1.8} />
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{person.phone}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, color: "#374151" }}>
          <I.Mail size={13} color="#C4B5FD" strokeWidth={1.8} />
          <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{person.email}</span>
        </div>
      </div>

      {/* Message button */}
      <button
        style={{
          flexShrink: 0, height: 32, padding: "0 16px",
          background: "#D1FAE5", border: "none", borderRadius: 10,
          fontSize: 12, fontWeight: 600, color: "#065F46",
          cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
          transition: "background 100ms",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}
      >
        <I.Messages size={12} color="#065F46" /> Message
      </button>

    </div>
  );
}

/* ── Parents & Guardians tab ── */

function GuardiansTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {GUARDIANS.map((person) => (
        <GuardianCard key={person.id} person={person} />
      ))}
    </div>
  );
}

/* ── Communication message modal ── */

function CommMessageModal({ item, onClose }) {
  const paragraphs = item.body.split("\n\n");
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 480, maxWidth: "calc(100vw - 48px)", maxHeight: "80vh", overflowY: "auto", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>

        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <I.X size={16} color="var(--stone)" />
        </button>

        {/* Header */}
        <div style={{ paddingRight: 32, marginBottom: 18 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 800, color: "var(--ink)", margin: "0 0 10px" }}>
            {item.subject}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>From:</span>
            <span style={{ fontSize: 12.5, color: "#6B7280" }}>{item.sender}</span>
            <span style={{ fontSize: 11, color: "#D1D5DB" }}>·</span>
            <span style={{ fontSize: 12, color: "#9CA3AF" }}>{item.date}</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#F3F4F6", marginBottom: 20 }} />

        {/* Body — split on double newline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {paragraphs.map((para, i) => (
            <p key={i} style={{ margin: 0, fontSize: 13.5, color: "#374151", lineHeight: 1.65 }}>
              {para}
            </p>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Close</button>
        </div>

      </div>
    </div>
  );
}

/* ── Add-to-calendar button for conferences ── */

function ConfCalButton({ conf }) {
  const [added, setAdded] = React.useState(false);
  const [toast, setToast] = React.useState(false);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(false), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  return (
    <React.Fragment>
      {added ? (
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          height: 30, padding: "0 12px", borderRadius: 8,
          border: "1px solid #E5E7EB", background: "#F3F4F6",
          color: "#9CA3AF", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
        }}>
          <I.Check size={11} color="#9CA3AF" strokeWidth={2.5} /> Added
        </span>
      ) : (
        <button
          onClick={() => { setAdded(true); setToast(true); }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            height: 30, padding: "0 12px", borderRadius: 8,
            background: "#D1FAE5", border: "1px solid #6EE7B7",
            color: "#065F46", fontSize: 12, fontWeight: 600,
            cursor: "pointer", transition: "background 100ms", whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}
        >
          <I.Calendar size={12} color="#065F46" /> Add to my calendar
        </button>
      )}
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 500,
          background: "#1E1B4B", color: "#fff", borderRadius: 10,
          padding: "12px 20px", fontSize: 13, fontWeight: 500,
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none",
        }}>
          <I.Check size={14} color="#10B981" />
          <span>{conf.title} added to your calendar ✓</span>
        </div>
      )}
    </React.Fragment>
  );
}

/* ── Communications tab ── */

function CommunicationsTab() {
  const [openMessage, setOpenMessage] = React.useState(null);

  function CommRow({ item }) {
    return (
      <div
        style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 16px", borderRadius: 12, background: "#F7F5FF", transition: "background 100ms" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F5FF"; }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {item.subject}
          </div>
          <div style={{ fontSize: 12, color: "#9CA3AF" }}>{item.sender}</div>
        </div>
        <div style={{ fontSize: 12, color: "#B0AABF", whiteSpace: "nowrap", flexShrink: 0, marginRight: 10 }}>
          {item.date}
        </div>
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); setOpenMessage(item); }}
          style={{ fontSize: 12, fontWeight: 600, color: "#5B21B6", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}
        >
          View →
        </a>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

        {/* Info banner */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 9, background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 12, padding: "10px 14px" }}>
          <I.Info size={13} color="#5B21B6" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <span style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.5 }}>
              These are communications your school has shared with your family about you. Read only.
            </span>
            <div style={{ fontSize: 11.5, color: "#B0AABF", marginTop: 4, lineHeight: 1.5 }}>
              Some communications may not be shown based on your age and the nature of the content.
            </div>
          </div>
        </div>

        {/* School Announcements */}
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I.Bell size={14} color="#5B21B6" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              School Announcements
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {SCHOOL_ANNOUNCEMENTS.map((item) => (
              <CommRow key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Teacher Messages */}
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 16 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I.School size={14} color="#0369A1" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Teacher Messages
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TEACHER_MESSAGES.map((item) => (
              <CommRow key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Upcoming Conferences & Meetings */}
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>

          {/* Section header */}
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I.Calendar size={14} color="#065F46" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Upcoming Conferences &amp; Meetings
            </div>
          </div>

          {/* Quiet info note */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", background: "#F7F5FF", borderRadius: 8, marginBottom: 14 }}>
            <I.Info size={11} color="#A78BFA" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
              These are meetings your school has scheduled with your family.
            </span>
          </div>

          {/* Conference rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CONFERENCES.map((conf) => (
              <div key={conf.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, background: "#F0FDF4" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I.Calendar size={17} color="#065F46" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B", marginBottom: 3 }}>{conf.title}</div>
                  <div style={{ fontSize: 12, color: "#6B7280" }}>{conf.organizer} · {conf.date} · {conf.time}</div>
                </div>
                <ConfCalButton conf={conf} />
              </div>
            ))}
          </div>

        </div>

      </div>

      {openMessage && <CommMessageModal item={openMessage} onClose={() => setOpenMessage(null)} />}
    </React.Fragment>
  );
}

/* ── Right panel ── */

function HomeTeamPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Guardian quick list */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Guardians on File
        </div>
        {GUARDIANS.map((person, i) => (
          <div key={person.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < GUARDIANS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
            <HAvatar person={person} size={34} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.name}</div>
              <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>{person.relationship}</div>
            </div>
          </div>
        ))}
      </div>

      {/* School main contact */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>
          School Main Office
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
            <I.Phone size={13} color="#C4B5FD" strokeWidth={1.8} />
            (555) 203-0000
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151" }}>
            <I.Clock size={13} color="#C4B5FD" strokeWidth={1.8} />
            Mon–Fri · 7:30 AM – 4:00 PM
          </div>
        </div>
      </div>

      {/* Privacy note */}
      <div style={{ background: "#F5F3FF", borderRadius: 14, padding: "14px 16px" }}>
        <div style={{ fontSize: 12.5, color: "#5B21B6", lineHeight: 1.55 }}>
          Your family's contact information is private and visible only to you and authorized school staff.
        </div>
      </div>

    </div>
  );
}

/* ── Show roles toggle (matches other My Team pages) ── */

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

/* ── Page root ── */

function MyHomeTeamPage({ segments }) {
  const [tab,       setTab]       = React.useState("guardians");
  const [showRoles, setShowRoles] = React.useState(true);

  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto", background: "linear-gradient(160deg, #F3F4F8 0%, #F8F9FC 65%, #F4F7FB 100%)", minHeight: "100vh" }}>

      <Breadcrumbs segments={segments} />

      {/* Header */}
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ margin: "0 0 5px", fontSize: 32, fontWeight: 800, color: "#1E1B4B" }}>Home Team</h1>
        <p style={{ margin: 0, color: "#7C7C8A", fontSize: 15 }}>Your family connection, Alex.</p>
      </div>

      {/* My Team top nav */}
      {window.TeamTabs && <window.TeamTabs sub="home-team" />}

      {/* Search + controls bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <div
          role="search"
          aria-label="Search home team"
          style={{ display: "flex", alignItems: "center", gap: 8, width: 320, height: 38, padding: "0 14px", background: "var(--paper)", borderRadius: 999, border: "1px solid var(--mist)", flexShrink: 0, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 10px -4px rgba(15,23,42,0.05)" }}
        >
          <I.Search size={14} color="var(--silver)" />
          <span style={{ fontSize: 13, color: "var(--silver)", userSelect: "none", pointerEvents: "none" }}>Search home team…</span>
        </div>
        <ShowRolesToggle showRoles={showRoles} setShowRoles={setShowRoles} />
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>

        {/* Main column */}
        <div>
          {/* Segmented control */}
          <div style={{ display: "inline-flex", background: "#EDEEF2", borderRadius: 12, padding: 3, marginBottom: 20 }}>
            {HOME_TEAM_TABS.map(({ id, label }) => {
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

          {tab === "guardians"      && <GuardiansTab />}
          {tab === "communications" && <CommunicationsTab />}
        </div>

        {/* Sticky right panel */}
        <div style={{ position: "sticky", top: 24 }}>
          <HomeTeamPanel />
        </div>

      </div>
    </div>
  );
}

window.MyHomeTeamPage = MyHomeTeamPage;

})();

// LINKS — My Team
// Route: #/my-team[/overview|/teachers|/advisors|/coaches|/support]

(function () {

/* ─────────── Constants ─────────── */

const TEAM_TABS = [
  { id: "overview",   label: "Overview",             icon: "Home"           },
  { id: "teachers",   label: "Teachers",             icon: "School"         },
  { id: "advisors",   label: "Advisors",             icon: "UserCheck"      },
  { id: "coaches",    label: "Coaches",              icon: "Dumbbell"       },
  { id: "support",    label: "Support Staff",        icon: "HeartHandshake" },
  { id: "doctors",    label: "Doctors",              icon: "Stethoscope"    },
  { id: "counselors", label: "Counselors",           icon: "MessageCircle"  },
  { id: "home-team",  label: "Home Team",            icon: "UsersRound"     },
  { id: "resources",  label: "Resources & Support",  icon: "LifeBuoy"       },
];

const VIEW_MODES = [
  { id: "grid", label: "Grid",        icon: "GridView"   },
  { id: "list", label: "List",        icon: "ListView"   },
  { id: "map",  label: "Support Map", icon: "Navigation" },
];

const FILTER_CHIPS = ["All", "Teachers", "Advisors", "Coaches", "Support Staff", "Doctors", "Counselors"];

// Maps each non-overview tab id → the `cat` value used in people data
const TAB_TO_CAT = {
  teachers: "Teacher",
  advisors: "Advisor",
  coaches:  "Coach",
  support:     "Support Staff",
  doctors:     "Doctor",
  counselors:  "Counselor",
};

/* ─────────── People data ─────────── */

const INNER_CIRCLE = [
  {
    id: "s-chen",
    name: "Ms. Sarah Chen",
    role: "Algebra II",
    cat: "Teacher",
    avail: "Periods 1 & 3 · Room 204",
    initials: "SC",
    avatarFrom: "#A78BFA",
    avatarTo: "#7C3AED",
  },
  {
    id: "reed",
    name: "Mr. Reed",
    role: "Academic Advisor",
    cat: "Advisor",
    avail: "Mon / Fri · Office 2B",
    initials: "MR",
    avatarFrom: "#60A5FA",
    avatarTo: "#2563EB",
  },
];

// sensitive:true → role + badge hidden when showRoles is off
const TEAM_PEOPLE = [
  {
    id: "kim",
    name: "Mr. David Kim",
    role: "US History",
    cat: "Teacher",
    avail: "Tues / Thurs lunch · Rm 220",
    initials: "DK",
    avatarFrom: "#FCD34D",
    avatarTo: "#D97706",
    unread: true,
  },
  {
    id: "patel-r",
    name: "Ms. Rachel Patel",
    role: "English Literature",
    cat: "Teacher",
    avail: "Online · async",
    initials: "RP",
    avatarFrom: "#6EE7B7",
    avatarTo: "#059669",
  },
  {
    id: "morales",
    name: "Sra. Elena Morales",
    role: "Spanish III",
    cat: "Teacher",
    avail: "Wed lunch · Room 312",
    initials: "EM",
    avatarFrom: "#FCA5A5",
    avatarTo: "#DC2626",
  },
  {
    id: "greene",
    name: "Mr. James Greene",
    role: "Biology",
    cat: "Teacher",
    avail: "Office hrs Wed · Rm 105",
    initials: "JG",
    avatarFrom: "#86EFAC",
    avatarTo: "#16A34A",
  },
  {
    id: "coach-patel",
    name: "Coach Marcus Patel",
    role: "Head Coach, Football",
    cat: "Coach",
    avail: "Field daily · 2:30 PM",
    initials: "MP",
    avatarFrom: "#67E8F9",
    avatarTo: "#0891B2",
  },
  {
    id: "coach-torres",
    name: "Coach Lisa Torres",
    role: "Strength & Conditioning",
    cat: "Coach",
    avail: "Weight room · Mon/Wed/Fri",
    initials: "LT",
    avatarFrom: "#86EFAC",
    avatarTo: "#16A34A",
  },
  {
    id: "hernandez",
    name: "Dr. Maria Hernandez",
    role: "College Counselor",
    cat: "Advisor",
    avail: "By appointment",
    initials: "MH",
    avatarFrom: "#C4B5FD",
    avatarTo: "#7C3AED",
    unread: true,
  },
  {
    id: "thompson",
    name: "Ms. Aisha Thompson",
    role: "Case Worker",
    cat: "Support Staff",
    avail: "Wed / Fri AM · Admin Wing",
    initials: "AT",
    avatarFrom: "#94A3B8",
    avatarTo: "#475569",
    sensitive: true,
    contactRoute: "office",
  },
  {
    id: "rivera",
    name: "Officer Carlos Rivera",
    role: "Parole Officer",
    cat: "Support Staff",
    avail: "Monthly check-ins",
    initials: "CR",
    avatarFrom: "#94A3B8",
    avatarTo: "#334155",
    sensitive: true,
    contactRoute: "office",
  },
  {
    id: "walsh",
    name: "Nurse Patricia Walsh",
    role: "School Nurse",
    cat: "Doctor",
    avail: "Health Office · Mon–Fri 8AM–3PM",
    initials: "PW",
    avatarFrom: "#FCA5A5",
    avatarTo: "#E11D48",
  },
  {
    id: "okafor",
    name: "Dr. James Okafor",
    role: "Mental Health Provider",
    cat: "Counselor",
    avail: "By appointment",
    initials: "JO",
    avatarFrom: "#A5B4FC",
    avatarTo: "#4F46E5",
    sensitive: true,
  },
  {
    id: "delgado",
    name: "Ms. Rosa Delgado",
    role: "Trauma Support Specialist",
    cat: "Counselor",
    avail: "By appointment",
    initials: "RD",
    avatarFrom: "#6EE7B7",
    avatarTo: "#059669",
    sensitive: true,
  },
];

/* ─────────── Detail data for dedicated tab layouts ─────────── */

const TEACHER_DETAILS = [
  { id: "s-chen",  name: "Ms. Sarah Chen",    subject: "Algebra II",    unit: "Unit 8: Exponential Functions", nextClass: "Mon & Wed · Period 1",      officeHours: "Tues & Thurs · After School · Rm 204", classHref: "#/my-classes/algebra-ii",   initials: "SC", avatarFrom: "#A78BFA", avatarTo: "#7C3AED", innerCircle: true  },
  { id: "kim",     name: "Mr. David Kim",      subject: "US History",    unit: "Unit 6: The Cold War Era",      nextClass: "Tues & Thurs · Period 4",   officeHours: "Tues & Thurs · Lunch · Rm 220",        classHref: "#/my-classes/us-history",  initials: "DK", avatarFrom: "#FCD34D", avatarTo: "#D97706", innerCircle: false },
  { id: "patel-r", name: "Ms. Rachel Patel",   subject: "English Lit",   unit: "Unit 4: American Modernism",    nextClass: "Mon, Wed & Fri · Period 2", officeHours: "Online · Async",                       classHref: "#/my-classes/english-lit", initials: "RP", avatarFrom: "#6EE7B7", avatarTo: "#059669", innerCircle: false },
  { id: "morales", name: "Sra. Elena Morales", subject: "Spanish III",   unit: "Unit 5: Subjunctive Mood",      nextClass: "Mon & Wed · Period 5",      officeHours: "Wed · Lunch · Rm 312",                 classHref: "#/my-classes/spanish-iii", initials: "EM", avatarFrom: "#FCA5A5", avatarTo: "#DC2626", innerCircle: false },
  { id: "greene",  name: "Mr. James Greene",   subject: "Biology",       unit: "Unit 7: Genetics & Heredity",   nextClass: "Tues & Thurs · Period 3",   officeHours: "Wed · Afternoons · Rm 105",            classHref: "#/my-classes/biology",     initials: "JG", avatarFrom: "#86EFAC", avatarTo: "#16A34A", innerCircle: false },
];

const TODAY_SCHEDULE = [
  { period: "Period 1", time: "8:10 – 9:00 AM",   subject: "Algebra II",  room: "Rm 204"    },
  { period: "Period 2", time: "9:05 – 9:55 AM",   subject: "English Lit", room: "Online"    },
  { period: "Period 3", time: "10:00 – 10:50 AM", subject: "",            room: ""          },
  { period: "Period 4", time: "10:55 – 11:45 AM", subject: "US History",  room: "Rm 220"    },
  { period: "Lunch",    time: "11:50 – 12:25 PM", subject: "Lunch",       room: "Cafeteria" },
  { period: "Period 5", time: "12:30 – 1:20 PM",  subject: "Spanish III", room: "Rm 312"    },
];

const ADVISOR_DETAILS = [
  {
    id: "reed",
    name: "Mr. Reed",
    role: "Academic Advisor",
    nextMeeting: { date: "May 20, 2026", time: "11:00 AM", topic: "Course selection for senior year" },
    credits: 68, creditsTotal: 120,
    notesPlaceholder: "Meeting notes from May 6 — reviewed junior year transcript…",
    initials: "MR", avatarFrom: "#60A5FA", avatarTo: "#2563EB", innerCircle: true,
  },
  {
    id: "hernandez",
    name: "Dr. Maria Hernandez",
    role: "College Counselor",
    nextMeeting: { date: "June 3, 2026", time: "2:00 PM", topic: "Common App essay review" },
    progressLabel: "College Research", progressValue: 3, progressTotal: 10,
    progressNote: "3 of 10 target schools researched",
    notesPlaceholder: "Schools researched so far: UCLA, Howard, Morehouse…",
    initials: "MH", avatarFrom: "#C4B5FD", avatarTo: "#7C3AED", innerCircle: false,
  },
];

const COACH_DETAILS = [
  {
    id: "coach-patel",
    name: "Coach Marcus Patel",
    sport: "Football", role: "Head Coach",
    nextEvent: "Practice", nextEventDate: "Mon, May 18 · 3:30 PM",
    location: "South Athletic Field",
    initials: "MP", avatarFrom: "#67E8F9", avatarTo: "#0891B2",
  },
  {
    id: "coach-torres",
    name: "Coach Lisa Torres",
    sport: "Strength & Conditioning", role: "Conditioning Coach",
    nextEvent: "Training Session", nextEventDate: "Tues, May 19 · 4:00 PM",
    location: "Weight Room, Gym B",
    initials: "LT", avatarFrom: "#86EFAC", avatarTo: "#16A34A",
  },
];

const SUPPORT_DETAILS = [
  {
    id: "thompson",
    name: "Ms. Aisha Thompson",
    role: "Case Worker", serviceType: "Community Support",
    nextCheckIn: "June 5, 2026",
    initials: "AT", avatarFrom: "#94A3B8", avatarTo: "#475569", sensitive: true,
  },
  {
    id: "rivera",
    name: "Officer Carlos Rivera",
    role: "Parole Officer", serviceType: "Community Support",
    nextCheckIn: "June 12, 2026",
    initials: "CR", avatarFrom: "#94A3B8", avatarTo: "#334155", sensitive: true,
  },
];

/* ─────────── Shared primitives ─────────── */

const BADGE_TONES = {
  "Teacher":       { bg: "#EDE9FE", fg: "#5B21B6" },
  "Advisor":       { bg: "#E0F2FE", fg: "#0369A1" },
  "Coach":         { bg: "#D1FAE5", fg: "#065F46" },
  "Support Staff": { bg: "#FFE4E6", fg: "#9F1239" },
  "Doctor":        { bg: "#FEE2E2", fg: "#991B1B" },
  "Counselor":     { bg: "#E0E7FF", fg: "#3730A3" },
};

function CatBadge({ cat }) {
  const t = BADGE_TONES[cat] || { bg: "var(--bone)", fg: "var(--stone)" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    }}>
      {cat}
    </span>
  );
}

const FILTER_COLORS = [
  "#F59E0B", // amber
  "#0D9488", // teal
  "#F43F5E", // rose
  "#0EA5E9", // sky
  "#F97316", // orange
  "#84CC16", // lime
  "#A21CAF", // fuchsia
  "#475569", // slate
];

function FilterBadge({ label, color }) {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 10px", borderRadius: 999,
      background: `rgba(${r}, ${g}, ${b}, 0.15)`,
      color: color,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    }}>
      {label}
    </span>
  );
}

function Avatar({ person, size = 46, unread = false, onUnreadClick }) {
  const dotSize = Math.max(8, Math.round(size * 0.22));
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: 999,
        background: `linear-gradient(135deg, ${person.avatarFrom}, ${person.avatarTo})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff",
        fontSize: size <= 32 ? size * 0.375 : size * 0.34,
        fontWeight: 700, letterSpacing: "0.02em",
        border: "2.5px solid rgba(255,255,255,0.75)",
        boxShadow: "0 2px 6px rgba(15,23,42,0.12)",
        filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))",
      }}>
        {person.initials}
      </div>
      {unread && (
        <div
          onClick={onUnreadClick ? (e) => { e.stopPropagation(); onUnreadClick(); } : undefined}
          style={{
            position: "absolute", bottom: 0, right: 0,
            width: dotSize, height: dotSize, borderRadius: 999,
            background: "#7C3AED",
            border: "2px solid #fff",
            cursor: onUnreadClick ? "pointer" : "default",
          }}
        />
      )}
    </div>
  );
}

function StarButton({ starred, onToggle }) {
  return (
    <button
      onClick={onToggle}
      aria-label={starred ? "Remove from Inner Circle" : "Add to Inner Circle"}
      style={{
        width: 28, height: 28, borderRadius: 8, border: "none", padding: 0,
        flexShrink: 0,
        background: starred ? "rgba(251,146,60,0.14)" : "transparent",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "background 120ms",
      }}
      onMouseEnter={(e) => { if (!starred) e.currentTarget.style.background = "var(--bone)"; }}
      onMouseLeave={(e) => { if (!starred) e.currentTarget.style.background = starred ? "rgba(245,158,11,0.12)" : "transparent"; }}
    >
      <I.Star
        size={15}
        color={starred ? "#F59E0B" : "var(--silver)"}
        strokeWidth={starred ? 0 : 1.6}
        style={{ fill: starred ? "#F59E0B" : "none" }}
      />
    </button>
  );
}

/* ─────────── Notes & Actions — card version ─────────── */

const MOCK_ACTION_ITEMS = [
  "Review last meeting notes",
  "Send follow-up message",
  "Schedule next check-in",
];

function NotesDrawer({ open, onToggle }) {
  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={onToggle}
        data-bare
        style={{
          width: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 11,
          border: "none", borderTop: "none",
          background: "none", cursor: "pointer",
          paddingLeft: 0, paddingRight: 0, paddingBottom: 0,
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 500, color: "#9CA3AF" }}>
          Notes &amp; actions
        </span>
        <I.ChevronDown
          size={14} color={open ? "#A78BFA" : "#C4B5FD"}
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 180ms ease", flexShrink: 0 }}
        />
      </button>

      {open && <NotesContent layout="stack" />}
    </div>
  );
}

/* ─────────── Notes & Actions — list row version ─────────── */

function ListNotesDrawer({ open }) {
  if (!open) return null;
  return (
    <div style={{
      padding: "16px 20px 20px",
      borderBottom: "1px solid #E8E4F7",
      background: "#F7F5FF",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24,
    }}>
      <NotesContent layout="side" />
    </div>
  );
}

/* Shared notes + checklist content — used by both drawer variants */
function NotesContent({ layout }) {
  const isStack = layout === "stack";
  return (
    <div style={{
      paddingTop: isStack ? 14 : 0,
      display: isStack ? "flex" : "contents",
      flexDirection: isStack ? "column" : undefined,
      gap: isStack ? 16 : undefined,
    }}>
      {/* Notes */}
      <div>
        <div style={{
          fontSize: 10.5, fontWeight: 700, color: "#9CA3AF",
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6,
        }}>
          Notes
        </div>
        <textarea
          placeholder="Add a note…"
          rows={3}
          style={{
            width: "100%", boxSizing: "border-box",
            resize: "vertical", minHeight: 64,
            fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55,
            border: "none", borderRadius: 10,
            padding: "8px 10px",
            background: "#F7F6FF",
            fontFamily: "var(--font-ui)",
            outline: "none",
            boxShadow: "inset 0 1px 3px rgba(99,102,241,0.08)",
            transition: "box-shadow 120ms",
          }}
          onFocus={(e) => { e.currentTarget.style.boxShadow = "inset 0 1px 3px rgba(99,102,241,0.08), 0 0 0 2px #C4B5FD"; }}
          onBlur={(e)  => { e.currentTarget.style.boxShadow = "inset 0 1px 3px rgba(99,102,241,0.08)"; }}
        />
      </div>

      {/* Action items */}
      <div>
        <div style={{
          fontSize: 10.5, fontWeight: 700, color: "#9CA3AF",
          textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
        }}>
          Action Items
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {MOCK_ACTION_ITEMS.map((item, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <input type="checkbox" style={{ width: 14, height: 14, accentColor: "#A78BFA", cursor: "pointer", flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.4 }}>{item}</span>
            </label>
          ))}
        </div>
        <button
          style={{
            marginTop: 8,
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 12, fontWeight: 500,
            color: "var(--silver)", background: "none", border: "none",
            cursor: "pointer", padding: "2px 0", transition: "color 100ms",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#A78BFA"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "var(--silver)"; }}
        >
          <I.Plus size={11} color="currentColor" /> Add item
        </button>
      </div>
    </div>
  );
}

/* ─────────── Grid card ─────────── */

function PersonCard({ person, pinned = false, showRoles, onStarChange, filterBadge }) {
  const [starred,    setStarred]   = React.useState(pinned);
  const [notesOpen,  setNotesOpen] = React.useState(false);
  const [msgOpen,    setMsgOpen]   = React.useState(false);
  const [officeOpen, setOfficeOpen] = React.useState(false);
  const [schedOpen,  setSchedOpen] = React.useState(false);
  const [toast,      setToast]     = React.useState(null);
  const revealRole = !person.sensitive || showRoles;

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      {msgOpen    && <MessageModal     person={person} onClose={() => setMsgOpen(false)}    onSend={(name) => setToast("msg:" + name)} />}
      {officeOpen && <SchoolOfficeModal person={person} onClose={() => setOfficeOpen(false)} onSend={() => setToast("office")} />}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>{toast === "office" ? "Request sent to school office ✓" : `Message sent to ${toast.replace("msg:", "")}`}</span>
        </div>
      )}
      {schedOpen && <ScheduleModal person={person} onClose={() => setSchedOpen(false)} />}
      <div className="card" style={{ background: "#FFFFFF", borderRadius: 20, border: "none", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)", padding: "22px 22px 18px", position: "relative", display: "flex", flexDirection: "column" }}>

      <div style={{ position: "absolute", top: 14, right: 14 }}>
        <StarButton starred={starred} onToggle={() => { const n = !starred; setStarred(n); onStarChange && onStarChange(person.id, n); }} />
      </div>

      {/* Avatar + name / role */}
      <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 12, paddingRight: 22 }}>
        <Avatar person={person} size={46} unread={!!person.unread} onUnreadClick={person.unread ? () => setMsgOpen(true) : undefined} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: "#1E1B4B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginBottom: 2 }}>
            {person.name}
          </div>
          {revealRole && (
            <>
              <div style={{ fontSize: 12.5, color: "var(--stone)", marginBottom: 8 }}>{person.role}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, alignItems: "center" }}>
                <CatBadge cat={person.cat} />
                {filterBadge && <FilterBadge label={filterBadge.label} color={filterBadge.color} />}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Availability */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#9CA3AF", marginBottom: 14 }}>
        <I.MapPin size={12} color="#C4B5FD" strokeWidth={1.8} />
        <span style={{ flex: 1, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {person.avail}
        </span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 6 }}>
        {person.contactRoute === "office" ? (
          <button onClick={() => setOfficeOpen(true)} style={{ flex: 1, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, border: "none", background: "#F1F5F9", borderRadius: 10, fontSize: 12, fontWeight: 500, color: "#334155", cursor: "pointer", transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#E2E8F0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}>
            <I.School size={11} color="#334155" /> Request through school office
          </button>
        ) : (
          <button onClick={() => setMsgOpen(true)} style={{ flex: 1, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, border: "none", background: "#D1FAE5", borderRadius: 10, fontSize: 12, fontWeight: 500, color: "#065F46", cursor: "pointer", transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
            <I.Messages size={11} color="#065F46" /> Message
          </button>
        )}
        <button onClick={() => setSchedOpen(true)} style={{ flex: 1, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, border: "none", background: "#E0F2FE", borderRadius: 10, fontSize: 12, fontWeight: 500, color: "#0369A1", cursor: "pointer", transition: "background 100ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
          <I.Calendar size={11} color="#0369A1" /> Schedule
        </button>
      </div>

      <NotesDrawer open={notesOpen} onToggle={() => setNotesOpen((v) => !v)} />
    </div>
    </>
  );
}

/* ─────────── List row ─────────── */

function ListRow({ person, pinned = false, showRoles, isLast, onStarChange, filterBadge }) {
  const [starred,    setStarred]    = React.useState(pinned);
  const [notesOpen,  setNotesOpen]  = React.useState(false);
  const [hovered,    setHovered]    = React.useState(false);
  const [msgOpen,    setMsgOpen]    = React.useState(false);
  const [officeOpen, setOfficeOpen] = React.useState(false);
  const [schedOpen,  setSchedOpen]  = React.useState(false);
  const [toast,      setToast]      = React.useState(null);
  const revealRole = !person.sensitive || showRoles;

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      {msgOpen    && <MessageModal      person={person} onClose={() => setMsgOpen(false)}    onSend={(name) => setToast("msg:" + name)} />}
      {officeOpen && <SchoolOfficeModal person={person} onClose={() => setOfficeOpen(false)} onSend={() => setToast("office")} />}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>{toast === "office" ? "Request sent to school office ✓" : `Message sent to ${toast.replace("msg:", "")}`}</span>
        </div>
      )}
      {schedOpen && <ScheduleModal person={person} onClose={() => setSchedOpen(false)} />}
      <div>
      {/* Row */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 0,
          padding: "0 16px",
          height: 56,
          background: hovered ? "#F7F5FF" : "transparent",
          borderBottom: (!isLast || notesOpen) ? "1px solid #F0EEF9" : "none",
          transition: "background 100ms",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Avatar */}
        <div style={{ width: 44, flexShrink: 0 }}>
          <Avatar person={person} size={32} unread={!!person.unread} onUnreadClick={person.unread ? () => setMsgOpen(true) : undefined} />
        </div>

        {/* Name + role — fixed width col */}
        <div style={{ flex: "0 0 200px", minWidth: 0, paddingRight: 12 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {person.name}
          </div>
          {revealRole && (
            <div style={{ fontSize: 11.5, color: "var(--stone)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.3 }}>
              {person.role}
            </div>
          )}
        </div>

        {/* Badge col */}
        <div style={{ flex: "0 0 200px", paddingRight: 12 }}>
          {revealRole && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
              <CatBadge cat={person.cat} />
              {filterBadge && <FilterBadge label={filterBadge.label} color={filterBadge.color} />}
            </div>
          )}
        </div>

        {/* Availability — grows to fill */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", alignItems: "center", gap: 5, paddingRight: 16 }}>
          <I.MapPin size={11} color="var(--silver)" strokeWidth={1.8} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 12, color: "var(--stone)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {person.avail}
          </span>
        </div>

        {/* Right cluster: star + buttons + notes toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>

          <StarButton starred={starred} onToggle={() => { const n = !starred; setStarred(n); onStarChange && onStarChange(person.id, n); }} />

          {person.contactRoute === "office" ? (
            <button onClick={() => setOfficeOpen(true)} style={{
              height: 30, padding: "0 10px",
              display: "inline-flex", alignItems: "center", gap: 5,
              border: "none", background: "#F1F5F9",
              borderRadius: 8, fontSize: 12, fontWeight: 500, color: "#334155", cursor: "pointer",
              transition: "background 100ms", whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E2E8F0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}>
              <I.School size={11} color="#334155" /> Request through school office
            </button>
          ) : (
            <button onClick={() => setMsgOpen(true)} style={{
              height: 30, padding: "0 10px",
              display: "inline-flex", alignItems: "center", gap: 5,
              border: "none", background: "#D1FAE5",
              borderRadius: 8, fontSize: 12, fontWeight: 500, color: "#065F46", cursor: "pointer",
              transition: "background 100ms", whiteSpace: "nowrap",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
              <I.Messages size={11} color="#065F46" /> Message
            </button>
          )}

          <button onClick={() => setSchedOpen(true)} style={{
            height: 30, padding: "0 10px",
            display: "inline-flex", alignItems: "center", gap: 5,
            border: "none", background: "#E0F2FE",
            borderRadius: 8, fontSize: 12, fontWeight: 500, color: "#0369A1", cursor: "pointer",
            transition: "background 100ms", whiteSpace: "nowrap",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={11} color="#0369A1" /> Schedule
          </button>

          {/* Notes & actions toggle */}
          <button
            onClick={() => setNotesOpen((v) => !v)}
            data-bare
            style={{
              height: 28, padding: "0 10px",
              display: "inline-flex", alignItems: "center", gap: 6,
              border: "none",
              background: notesOpen ? "#EDE9FE" : "transparent",
              borderRadius: 8, fontSize: 12, fontWeight: 500,
              color: notesOpen ? "#5B21B6" : "var(--stone)",
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "background 120ms, color 120ms",
            }}
            onMouseEnter={(e) => {
              if (!notesOpen) {
                e.currentTarget.style.background = "#F3F0FF";
              }
            }}
            onMouseLeave={(e) => {
              if (!notesOpen) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <span>Notes &amp; actions</span>
            <I.ChevronDown
              size={13}
              color={notesOpen ? "#A78BFA" : "#C4B5FD"}
              style={{ transform: notesOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 180ms ease" }}
            />
          </button>
        </div>
      </div>

      {/* Inline notes drawer */}
      <ListNotesDrawer open={notesOpen} />
    </div>
    </>
  );
}

/* ─────────── Show Roles toggle ─────────── */

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

/* ─────────── Inner Circle — grid variant ─────────── */

function InnerCircleGridSection({ showRoles, people = INNER_CIRCLE, onTogglePin }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #FFFDF5 0%, #FFF9EC 100%)", border: "none", borderRadius: 20, padding: "18px 22px 20px", marginBottom: 28, boxShadow: "0 2px 20px rgba(245,158,11,0.1), 0 1px 4px rgba(0,0,0,0.04)" }}>
      <InnerCircleHeader />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
        {people.map((person) => (
          <PersonCard key={person.id} person={person} pinned showRoles={showRoles} onStarChange={onTogglePin} />
        ))}
      </div>
    </div>
  );
}

/* ─────────── Inner Circle — list variant ─────────── */

function InnerCircleListSection({ showRoles, people = INNER_CIRCLE, onTogglePin, filterBadge }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #FFFDF5 0%, #FFF9EC 100%)", border: "none", borderRadius: 20, padding: "14px 0 0", marginBottom: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(245,158,11,0.1), 0 1px 4px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, padding: "0 16px" }}>
        <div style={{ width: 22, height: 22, borderRadius: 8, background: "rgba(245,158,11,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Star size={12} color="#F59E0B" strokeWidth={0} style={{ fill: "#F59E0B" }} />
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#92400E" }}>Inner Circle</span>
        <span style={{ fontSize: 11.5, color: "#B45309" }}>— your pinned contacts</span>
      </div>

      {/* Rows on white inset */}
      <div style={{ background: "rgba(255,255,255,0.8)" }}>
        {people.map((person, i) => (
          <ListRow
            key={person.id}
            person={person}
            pinned
            showRoles={showRoles}
            isLast={i === people.length - 1}
            onStarChange={onTogglePin}
            filterBadge={filterBadge}
          />
        ))}
      </div>
    </div>
  );
}

/* Shared Inner Circle header label */
function InnerCircleHeader() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 16 }}>
      <div style={{ width: 26, height: 26, borderRadius: 8, background: "rgba(245,158,11,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <I.Star size={14} color="#F59E0B" strokeWidth={0} style={{ fill: "#F59E0B" }} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#92400E", letterSpacing: "0.01em" }}>Inner Circle</span>
      <span style={{ fontSize: 11.5, color: "#B45309", marginLeft: 2 }}>— your pinned contacts</span>
    </div>
  );
}

/* ─────────── Add Person card (grid) ─────────── */

function AddPersonCard() {
  const [open,  setOpen]  = React.useState(false);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <>
      {open && (
        <AddPersonModal
          onClose={() => setOpen(false)}
          onSend={(name) => setToast(name ? `Request sent ✓ We'll notify you when ${name} is added` : "Request sent ✓")}
        />
      )}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}
      <div
        onClick={() => setOpen(true)}
        style={{ border: "2px dashed #C4B5FD", borderRadius: 20, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, padding: "28px 20px", cursor: "pointer", transition: "border-color 120ms, background 120ms", background: "transparent", minHeight: 172 }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.background = "#F5F3FF"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C4B5FD"; e.currentTarget.style.background = "transparent"; }}
      >
        <div style={{ width: 36, height: 36, borderRadius: 999, border: "2px dashed #C4B5FD", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Plus size={16} color="#A78BFA" />
        </div>
        <span style={{ fontSize: 12.5, fontWeight: 500, color: "#A78BFA" }}>Add a person</span>
      </div>
    </>
  );
}

/* ─────────── Add Person modal ─────────── */

function AddPersonModal({ onClose, onSend }) {
  const [name, setName] = React.useState("");
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 440, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 8, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: "0 0 20px", paddingRight: 32, letterSpacing: "-0.01em" }}>
          Add someone to your team
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
          {/* Name */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "var(--slate)" }}>Their name</label>
            <input type="text" placeholder="e.g. Ms. Johnson" value={name} onChange={(e) => setName(e.target.value)} style={{ height: 38, padding: "0 12px", border: "1px solid var(--mist)", borderRadius: 10, fontSize: 13.5, color: "var(--ink)", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--mist)"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>
          {/* Role */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "var(--slate)" }}>
              Their role or title <span style={{ fontWeight: 400, color: "var(--silver)" }}>(optional)</span>
            </label>
            <input type="text" placeholder="e.g. Algebra II Teacher" style={{ height: 38, padding: "0 12px", border: "1px solid var(--mist)", borderRadius: 10, fontSize: 13.5, color: "var(--ink)", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--mist)"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>
          {/* Category */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 12.5, fontWeight: 600, color: "var(--slate)" }}>Category</label>
            <div style={{ position: "relative" }}>
              <select defaultValue="" style={{ width: "100%", height: 38, padding: "0 36px 0 12px", border: "1px solid var(--mist)", borderRadius: 10, fontSize: 13.5, color: "var(--ink)", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", appearance: "none", cursor: "pointer" }}>
                <option value="" disabled>Select a category…</option>
                <option value="teachers">Teachers</option>
                <option value="advisors">Advisors</option>
                <option value="coaches">Coaches</option>
                <option value="support">Support Staff</option>
                <option value="other">Other</option>
              </select>
              <I.ChevronDown size={14} color="var(--silver)" style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>

        {/* Note */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 12px", background: "#F5F3FF", borderRadius: 10, marginBottom: 22 }}>
          <I.Info size={14} color="var(--stone)" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "var(--stone)", lineHeight: 1.5 }}>
            Your request will be reviewed and added by your school.
          </span>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { onSend(name.trim()); onClose(); }} style={{ fontSize: 13 }}>Send request</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Message modal ─────────── */

const SCHED_DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SCHED_TIMES = ["Period 1", "Period 3", "Lunch", "After School"];
const SCHED_AVAIL = [
  { day: "Mon", time: "Period 1" },
  { day: "Mon", time: "Lunch" },
  { day: "Tue", time: "Period 3" },
  { day: "Wed", time: "Period 1" },
  { day: "Wed", time: "After School" },
  { day: "Thu", time: "Lunch" },
  { day: "Fri", time: "Period 3" },
];

// Alex's fixed weekly schedule — shown read-only in every Schedule modal
// sh/sm = start hour/min, eh/em = end hour/min (clamped to 5pm max)
const ALEX_WEEK = {
  Mon: [
    { label: "Algebra II",    type: "class",    sh: 8,  sm: 0,  eh: 9,  em: 15 },
    { label: "Biology 101",   type: "class",    sh: 12, sm: 0,  eh: 13, em: 20 },
    { label: "US History",    type: "class",    sh: 13, sm: 25, eh: 14, em: 40 },
  ],
  Tue: [
    { label: "Algebra II",    type: "class",    sh: 8,  sm: 0,  eh: 9,  em: 15 },
    { label: "English Lit",   type: "class",    sh: 9,  sm: 20, eh: 10, em: 35 },
    { label: "Robotics Club", type: "activity", sh: 15, sm: 45, eh: 17, em: 0  },
  ],
  Wed: [
    { label: "Algebra II",    type: "class",    sh: 8,  sm: 0,  eh: 9,  em: 15 },
    { label: "Biology 101",   type: "class",    sh: 12, sm: 0,  eh: 13, em: 20 },
  ],
  Thu: [
    { label: "Algebra II",    type: "class",    sh: 8,  sm: 0,  eh: 9,  em: 15 },
    { label: "Museum Trip",   type: "activity", sh: 15, sm: 30, eh: 17, em: 0  },
  ],
  Fri: [
    { label: "Biology 101",   type: "class",    sh: 8,  sm: 0,  eh: 9,  em: 15 },
    { label: "English Lit",   type: "class",    sh: 9,  sm: 20, eh: 10, em: 35 },
  ],
};

// Teacher open-slot time bands — per-day so mint renders only in the right columns.
// days[] drives which columns show the band; derived from SCHED_AVAIL.
const OPEN_BANDS = [
  { id: "period1",     label: "Period 1",     timeLabel: "8–9:15am",     sh: 8,  sm: 0,  eh: 9,  em: 15, days: ["Mon", "Wed"]  },
  { id: "lunch",       label: "Lunch",        timeLabel: "11:30–12pm",   sh: 11, sm: 30, eh: 12, em: 0,  days: ["Mon", "Thu"]  },
  { id: "period3",     label: "Period 3",     timeLabel: "12:05–1:20pm", sh: 12, sm: 5,  eh: 13, em: 20, days: ["Tue", "Fri"]  },
  { id: "afterschool", label: "After School", timeLabel: "3:30pm+",      sh: 15, sm: 30, eh: 17, em: 0,  days: ["Wed"]         },
];

// Mini-calendar geometry: 8am–5pm (540 min) → MC_H px
const MC_H    = 150;
const MC_S    = 8 * 60;   // 480 min
const MC_SPAN = 9 * 60;   // 540 min
function mcTop(h, m)          { return ((h * 60 + m - MC_S) / MC_SPAN) * MC_H; }
function mcHt(sh, sm, eh, em) { return Math.max(((eh * 60 + em - sh * 60 - sm) / MC_SPAN) * MC_H, 3); }

function MessageModal({ person, onClose, onSend, privacyNote }) {
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
          <Avatar person={person} size={38} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
            Message {person.name}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
          {/* To */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>To</label>
            <div style={{ height: 38, padding: "0 12px", border: "none", borderRadius: 10, background: "#F7F5FF", display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 22, height: 22, borderRadius: 999, flexShrink: 0, background: `linear-gradient(135deg, ${person.avatarFrom}, ${person.avatarTo})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 8.5, fontWeight: 700 }}>
                {person.initials}
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>{person.name}</span>
            </div>
          </div>
          {/* Subject */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Subject</label>
            <input type="text" placeholder="What's this about?" style={{ height: 38, padding: "0 12px", border: "1px solid #E0DEFA", borderRadius: 6, fontSize: 13.5, color: "var(--ink)", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DEFA"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>
          {/* Message */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Message</label>
            <textarea placeholder="Write your message…" rows={5} style={{ width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: 110, fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6, border: "1px solid #E0DEFA", borderRadius: 6, padding: "10px 12px", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DEFA"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>
        </div>

        {privacyNote && (
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 12px", background: "#F7F5FF", borderRadius: 8, marginBottom: 16 }}>
            <I.Lock size={11} color="#A78BFA" />
            <span style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>{privacyNote}</span>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { onSend(person.name); onClose(); }} style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.Send size={13} color="currentColor" /> Send message
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── School Office modal ─────────── */

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

/* ─────────── Parent Route modal ─────────── */

function ParentRouteModal({ person, onClose, onSend }) {
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
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.UsersRound size={16} color="#92400E" />
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
            Contact through parent
          </h2>
        </div>

        {/* Warm explanation box */}
        <div style={{ padding: "12px 14px", background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, marginBottom: 20, fontSize: 13, color: "#92400E", lineHeight: 1.55 }}>
          Your parent or guardian will receive this and can send it to <strong>{person.name}</strong> on your behalf.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 22 }}>
          {/* Request textarea */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>What would you like to ask or request?</label>
            <textarea placeholder="Write what you'd like to ask or request…" rows={5} style={{ width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: 100, fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6, border: "1px solid #E0DEFA", borderRadius: 6, padding: "10px 12px", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
              onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DEFA"; e.currentTarget.style.boxShadow = "none"; }} />
          </div>

          {/* Recipients on file */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Recipients on file</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#FFFBEB", borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0, background: "linear-gradient(135deg, #FCA5A5, #E11D48)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9.5, fontWeight: 700 }}>MJ</div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Maria Johnson</span>
                  <span style={{ fontSize: 12, color: "#92400E", marginLeft: 6 }}>· Mom</span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#FFFBEB", borderRadius: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, flexShrink: 0, background: "linear-gradient(135deg, #86EFAC, #16A34A)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 9.5, fontWeight: 700 }}>RJ</div>
                <div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Robert Johnson</span>
                  <span style={{ fontSize: 12, color: "#92400E", marginLeft: 6 }}>· Dad</span>
                </div>
              </div>
            </div>
            <span style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>Both will receive it.</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { onSend(); onClose(); }} style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.Send size={13} color="currentColor" /> Send to my parents
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Schedule modal ─────────── */

function ScheduleModal({ person, onClose }) {
  const [selected, setSelected] = React.useState(null);

  // True if any student event overlaps this open band (time ranges intersect)
  const hasConflict = (day, band) =>
    (ALEX_WEEK[day] || []).some((ev) => {
      const evS = ev.sh * 60 + ev.sm, evE = ev.eh * 60 + ev.em;
      const bS  = band.sh * 60 + band.sm, bE  = band.eh * 60 + band.em;
      return evS < bE && evE > bS;
    });

  // Returns the first student event that overlaps this band (for conflict cell label)
  const getConflictingEvent = (day, band) =>
    (ALEX_WEEK[day] || []).find((ev) => {
      const evS = ev.sh * 60 + ev.sm, evE = ev.eh * 60 + ev.em;
      const bS  = band.sh * 60 + band.sm, bE  = band.eh * 60 + band.em;
      return evS < bE && evE > bS;
    }) || null;

  // Click handler — conflict = no-op; re-click = deselect
  const handleBandClick = (day, band) => {
    if (hasConflict(day, band)) return;
    setSelected((prev) => prev && prev.day === day && prev.bandId === band.id ? null : { day, bandId: band.id });
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 530, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>

        {/* Title row */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4, paddingRight: 32 }}>
          <Avatar person={person} size={38} />
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.01em" }}>
            Schedule time with {person.name}
          </h2>
        </div>

        {/* Availability hint */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 50, marginBottom: 22 }}>
          <I.MapPin size={11} color="var(--silver)" strokeWidth={1.8} />
          <span style={{ fontSize: 12, color: "var(--stone)" }}>Usually available: {person.avail}</span>
        </div>

        {/* AVAILABILITY GRID */}
        <div style={{ marginBottom: 8 }}>

          {/* Label + legend */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>
              Pick an open time
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "#D1FAE5", border: "1px solid #6EE7B7", flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, color: "var(--stone)" }}>Free to meet</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: "#FEE2E2", border: "1px solid #FECACA", flexShrink: 0 }} />
                <span style={{ fontSize: 10.5, color: "var(--stone)" }}>You have class</span>
              </div>
            </div>
          </div>

          {/* Day headers */}
          <div style={{ display: "grid", gridTemplateColumns: "110px repeat(5, 1fr)", gap: 4, marginBottom: 3 }}>
            <div />
            {SCHED_DAYS.map((d) => (
              <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 600, color: "var(--stone)" }}>{d}</div>
            ))}
          </div>

          {/* One grid row per open slot */}
          {OPEN_BANDS.map((band) => (
            <div key={band.id} style={{ display: "grid", gridTemplateColumns: "110px repeat(5, 1fr)", gap: 4, marginBottom: 4 }}>

              {/* Row label: slot name + time */}
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: 6 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", lineHeight: 1.3 }}>{band.label}</span>
                <span style={{ fontSize: 10, color: "var(--stone)", lineHeight: 1.4 }}>{band.timeLabel}</span>
              </div>

              {/* Day cells */}
              {SCHED_DAYS.map((day) => {
                const teacherOpen = band.days.includes(day);
                const conflict    = teacherOpen && hasConflict(day, band);
                const isFree      = teacherOpen && !conflict;
                const isSel       = isFree && selected && selected.day === day && selected.bandId === band.id;
                const conflictEv  = conflict ? getConflictingEvent(day, band) : null;

                if (!teacherOpen) {
                  // EMPTY — invisible placeholder
                  return <div key={day} style={{ height: 40, borderRadius: 6 }} />;
                }
                if (conflict) {
                  // CONFLICT — red, shows class name, not clickable
                  return (
                    <div key={day} style={{
                      height: 40, borderRadius: 6,
                      background: "#FEE2E2", border: "1px solid #FECACA",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      padding: "0 5px", overflow: "hidden",
                    }}>
                      <span style={{
                        fontSize: 11, color: "#9CA3AF", textAlign: "center", lineHeight: 1.3,
                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                      }}>
                        {conflictEv ? conflictEv.label : "Busy"}
                      </span>
                    </div>
                  );
                }
                // OPEN — mint idle, white+purple when selected
                return (
                  <button
                    key={day}
                    onClick={() => handleBandClick(day, band)}
                    style={{
                      height: 40, borderRadius: 6,
                      background: isSel ? "#fff" : "#D1FAE5",
                      border: isSel ? "2px solid #7C3AED" : "1.5px solid #6EE7B7",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11.5, fontWeight: isSel ? 700 : 500,
                      color: isSel ? "#7C3AED" : "#065F46",
                      transition: "border-color 100ms, background 100ms",
                    }}
                    onMouseEnter={(e) => { if (!isSel) { e.currentTarget.style.background = "#A7F3D0"; e.currentTarget.style.borderColor = "#34D399"; } }}
                    onMouseLeave={(e) => { if (!isSel) { e.currentTarget.style.background = "#D1FAE5"; e.currentTarget.style.borderColor = "#6EE7B7"; } }}
                  >
                    {isSel ? "Selected" : "Free"}
                  </button>
                );
              })}

            </div>
          ))}

        </div>

        {/* Selection chip / placeholder — between grid and Note */}
        <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
          {selected ? (() => {
            const band = OPEN_BANDS.find((b) => b.id === selected.bandId);
            return (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#F3F0FF", borderRadius: 6, padding: "3px 7px 3px 10px", border: "1px solid #C4B5FD" }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#5B21B6", lineHeight: 1.4 }}>
                  {selected.day + " · " + (band ? band.label : selected.bandId)}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "0 2px", lineHeight: 1, color: "#A78BFA", fontSize: 15, display: "flex", alignItems: "center" }}
                >×</button>
              </div>
            );
          })() : (
            <span style={{ fontSize: 12, color: "var(--silver)" }}>Select an available time above</span>
          )}
        </div>

        {/* Note */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 22 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Note <span style={{ fontWeight: 400, color: "var(--silver)", textTransform: "none", letterSpacing: 0 }}>(optional)</span>
          </label>
          <textarea placeholder="What would you like to discuss?" rows={3} style={{ width: "100%", boxSizing: "border-box", resize: "vertical", minHeight: 72, fontSize: 13.5, color: "var(--slate)", lineHeight: 1.6, border: "1px solid #E0DEFA", borderRadius: 6, padding: "10px 12px", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "#E0DEFA"; e.currentTarget.style.boxShadow = "none"; }} />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button className="btn btn-primary" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.Calendar size={13} color="currentColor" /> Send request
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Support Map ─────────── */

// Coordinate system: xPct = % of container width, y = px from top
const MAP_CX = 50;   // Alex center x (percent)
const MAP_CY = 325;  // Alex center y (px) — true vertical center of MAP_H
const MAP_H  = 720;  // container height (px)

// Category color palette — avatars, lines, and zone labels all share these.
const CAT_COLORS = {
  "Teacher":      { from: "#C4B5FD", to: "#7C3AED", line: "#A78BFA", label: "#7C3AED" },
  "Advisor":      { from: "#7DD3FC", to: "#0284C7", line: "#38BDF8", label: "#0284C7" },
  "Coach":        { from: "#FCA5A5", to: "#E11D48", line: "#FB7185", label: "#DC2626" },
  "Support Staff":{ from: "#CBD5E1", to: "#64748B", line: "#94A3B8", label: "#475569" },
  "Doctor":       { from: "#6EE7B7", to: "#0D9488", line: "#34D399", label: "#0D9488" },
  "Counselor":    { from: "#DDD6FE", to: "#8B5CF6", line: "#C4B5FD", label: "#7C3AED" },
};

const MAP_POS = {
  // Inner Circle — pulled closer to Alex so they sit clearly inside the IC zone circle
  "s-chen":       { xPct: 40,  y: 225 },
  "reed":         { xPct: 61,  y: 228 },
  // Teachers — upper fan across top zone
  "kim":          { xPct: 18,  y: 168 },
  "patel-r":      { xPct: 30,  y: 78  },
  "morales":      { xPct: 50,  y: 55  },
  "greene":       { xPct: 70,  y: 82  },
  // Advisors — right mid zone
  "hernandez":    { xPct: 85,  y: 205 },
  // Doctors — far right, lower than Advisors
  "walsh":        { xPct: 91,  y: 315 },
  // Coaches — lower-right quadrant
  "coach-patel":  { xPct: 78,  y: 445 },
  "coach-torres": { xPct: 63,  y: 520 },
  // Support Staff — lower-left quadrant
  "rivera":       { xPct: 16,  y: 382 },
  "thompson":     { xPct: 26,  y: 498 },
  // Counselors — bottom center
  "okafor":       { xPct: 37,  y: 602 },
  "delgado":      { xPct: 57,  y: 640 },
};

const MAP_CAT_LABELS = [
  { text: "Teachers",      cat: "Teacher",       xPct: 44,  y: 24  },
  { text: "Advisors",      cat: "Advisor",        xPct: 87,  y: 126 },
  { text: "Doctors",       cat: "Doctor",         xPct: 91,  y: 234 },
  { text: "Coaches",       cat: "Coach",          xPct: 80,  y: 490 },
  { text: "Counselors",    cat: "Counselor",      xPct: 48,  y: 556 },
  { text: "Support Staff", cat: "Support Staff",  xPct: 19,  y: 540 },
];

function shortenName(name) {
  const TITLES = ["Mr.", "Ms.", "Mrs.", "Dr.", "Sra.", "Coach", "Officer"];
  const parts = name.split(" ");
  if (parts.length <= 2) return name;
  if (TITLES.includes(parts[0])) return parts[0] + " " + parts[parts.length - 1];
  return parts.slice(0, 2).join(" ");
}

function MapNode({ person, size, isIC, showRoles, isSelected, onClick, catFrom, catTo }) {
  // Sensitive contacts never show role label on the bubble (hard rule for map view).
  // showRoles toggle only affects the popover.
  const showRoleOnBubble = !person.sensitive;
  // Use category-palette colors in the map; fall back to the person's own avatar colors.
  const gradFrom = catFrom || person.avatarFrom;
  const gradTo   = catTo   || person.avatarTo;

  return (
    <div
      onClick={onClick}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", userSelect: "none", padding: "4px 5px" }}
    >
      {/* Circle */}
      <div
        style={{
          width: size, height: size, borderRadius: 999,
          background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", fontSize: Math.round(size * 0.33), fontWeight: 700, letterSpacing: "0.02em",
          border: isSelected ? "2.5px solid #A78BFA"
                : isIC       ? "2.5px solid rgba(245,158,11,0.65)"
                :               "2.5px solid rgba(255,255,255,0.78)",
          boxShadow: isSelected ? "0 0 0 4px #EDE9FE, 0 4px 14px rgba(15,23,42,0.18)"
                   : isIC       ? "0 0 0 3px rgba(245,158,11,0.22), 0 3px 10px rgba(15,23,42,0.12)"
                   :               "0 3px 10px rgba(15,23,42,0.12)",
          transition: "transform 150ms ease, box-shadow 150ms ease",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {person.initials}
      </div>

      {/* Name */}
      <div style={{ fontSize: 10.5, fontWeight: 600, color: "var(--ink)", textAlign: "center", lineHeight: 1.25, maxWidth: size + 58 }}>
        {person.name}
      </div>

      {/* Role — never shown for sensitive contacts */}
      {showRoleOnBubble && (
        <div style={{ fontSize: 9.5, color: "var(--stone)", textAlign: "center", lineHeight: 1.2, maxWidth: size + 34, marginTop: -1 }}>
          {person.role.split(",")[0]}
        </div>
      )}
    </div>
  );
}

function MapCenterNode() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, userSelect: "none" }}>
      <div style={{
        width: 64, height: 64, borderRadius: 999,
        background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18, fontWeight: 800, color: "#fff",
        border: "3px solid rgba(255,255,255,0.85)",
        boxShadow: "0 0 0 8px rgba(245,158,11,0.18), 0 6px 20px rgba(15,23,42,0.16)",
      }}>
        AJ
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", textAlign: "center" }}>Alex</div>
      <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 500, marginTop: -3, textAlign: "center" }}>You</div>
    </div>
  );
}

function MapPopover({ person, pos, showRoles, onClose }) {
  const revealRole = !person.sensitive || showRoles;
  const POP_W = 232;
  const [msgOpen,   setMsgOpen]   = React.useState(false);
  const [schedOpen, setSchedOpen] = React.useState(false);
  const [toast,     setToast]     = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Flip left/right so the popover doesn't cover the bubble
  let leftCSS;
  if (pos.xPct > 56)      leftCSS = `calc(${pos.xPct}% - ${POP_W + 28}px)`;
  else if (pos.xPct < 44) leftCSS = `calc(${pos.xPct}% + 28px)`;
  else                     leftCSS = `calc(${pos.xPct}% - ${POP_W / 2}px)`;

  // Flip up if bubble is low in the canvas
  const topPx = pos.y > 430 ? pos.y - 215 : pos.y + 34;

  return (
    <div
      style={{ position: "absolute", left: leftCSS, top: topPx, width: POP_W, zIndex: 20, background: "var(--paper)", borderRadius: 18, boxShadow: "0 4px 24px rgba(99,102,241,0.14), 0 1px 4px rgba(0,0,0,0.06)", border: "none", padding: "14px 14px 12px", pointerEvents: "all" }}
      onClick={(e) => e.stopPropagation()}
    >
      {msgOpen   && <MessageModal  person={person} onClose={() => setMsgOpen(false)} onSend={(name) => setToast(name)} />}
      {schedOpen && <ScheduleModal person={person} onClose={() => setSchedOpen(false)} />}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>Message sent to {toast}</span>
        </div>
      )}
      {/* Header */}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: 999, flexShrink: 0, background: `linear-gradient(135deg, ${person.avatarFrom}, ${person.avatarTo})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, border: "2px solid rgba(255,255,255,0.55)" }}>
          {person.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2, marginBottom: 2 }}>
            {person.name}
          </div>
          {revealRole && (
            <>
              <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 5 }}>{person.role}</div>
              <CatBadge cat={person.cat} />
            </>
          )}
        </div>
        <button
          onClick={onClose}
          style={{ width: 24, height: 24, borderRadius: 4, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, flexShrink: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
        >
          <I.X size={13} color="var(--stone)" />
        </button>
      </div>

      {/* Availability */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--stone)", marginBottom: 12 }}>
        <I.MapPin size={11} color="var(--silver)" strokeWidth={1.8} />
        <span style={{ flex: 1, minWidth: 0 }}>{person.avail}</span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 6 }}>
        <button
          onClick={() => setMsgOpen(true)}
          style={{ flex: 1, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, border: "none", background: "#D1FAE5", borderRadius: 8, fontSize: 11.5, fontWeight: 500, color: "#065F46", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}
        >
          <I.Messages size={11} color="#065F46" /> Message
        </button>
        <button
          onClick={() => setSchedOpen(true)}
          style={{ flex: 1, height: 28, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 4, border: "none", background: "#E0F2FE", borderRadius: 8, fontSize: 11.5, fontWeight: 500, color: "#0369A1", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}
        >
          <I.Calendar size={11} color="#0369A1" /> Schedule
        </button>
      </div>
    </div>
  );
}

function SupportMapContent({ showRoles }) {
  const [selected, setSelected] = React.useState(null);
  const allPeople = [...INNER_CIRCLE, ...TEAM_PEOPLE];

  const handleSelect = (person) => {
    setSelected((prev) => (prev && prev.id === person.id ? null : person));
  };

  return (
    <div
      style={{
        position: "relative", height: MAP_H,
        borderRadius: 20,
        background: "radial-gradient(ellipse at 48% 44%, #F0EEFF 0%, #EAF0FD 52%, #EEF2FB 100%)",
        border: "none",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(99,102,241,0.09), 0 1px 4px rgba(0,0,0,0.05)",
      }}
      onClick={() => setSelected(null)}
    >
      {/* Background zone — outer team (barely-there periwinkle pool) */}
      <div style={{
        position: "absolute", left: MAP_CX + "%", top: MAP_CY,
        transform: "translate(-50%, -50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(199,210,254,0.22) 0%, rgba(199,210,254,0.10) 48%, rgba(199,210,254,0) 72%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Background zone — Inner Circle (soft saturated lavender) */}
      <div style={{
        position: "absolute", left: MAP_CX + "%", top: MAP_CY,
        transform: "translate(-50%, -50%)",
        width: 430, height: 430, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.13) 0%, rgba(139,92,246,0.08) 62%, rgba(139,92,246,0) 84%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* SVG connecting lines */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}
      >
        {allPeople.map((person) => {
          const pos = MAP_POS[person.id];
          if (!pos) return null;
          const isIC = INNER_CIRCLE.some((p) => p.id === person.id);
          const cc = !isIC && person.cat ? CAT_COLORS[person.cat] : null;
          return (
            <line
              key={person.id}
              x1={MAP_CX + "%"} y1={MAP_CY}
              x2={pos.xPct + "%"} y2={pos.y}
              stroke={isIC ? "#F59E0B" : (cc ? cc.line : "#94A3B8")}
              strokeWidth={isIC ? 1.8 : 1.2}
              strokeOpacity={isIC ? 0.5 : 0.35}
              strokeDasharray={isIC ? undefined : "4 3"}
            />
          );
        })}
      </svg>

      {/* Category floating labels */}
      {MAP_CAT_LABELS.map(({ text, xPct, y, cat }) => {
        const cc = CAT_COLORS[cat] || {};
        return (
          <div
            key={text}
            style={{ position: "absolute", left: xPct + "%", top: y, transform: "translateX(-50%)", fontSize: 13, fontWeight: 600, color: cc.label || "var(--stone)", textTransform: "uppercase", letterSpacing: "0.07em", opacity: 0.82, pointerEvents: "none", whiteSpace: "nowrap" }}
          >
            {text}
          </div>
        );
      })}

      {/* Inner Circle floating label */}
      <div style={{ position: "absolute", left: "50%", top: 168, transform: "translateX(-50%)", fontSize: 9.5, fontWeight: 700, color: "#92400E", opacity: 0.58, textTransform: "uppercase", letterSpacing: "0.09em", pointerEvents: "none" }}>
        Inner Circle
      </div>

      {/* Person nodes */}
      {allPeople.map((person) => {
        const pos = MAP_POS[person.id];
        if (!pos) return null;
        const isIC = INNER_CIRCLE.some((p) => p.id === person.id);
        const cc = !isIC && person.cat ? CAT_COLORS[person.cat] : null;
        return (
          <div
            key={person.id}
            style={{ position: "absolute", left: pos.xPct + "%", top: pos.y, transform: "translate(-50%, -50%)", zIndex: isIC ? 3 : 2 }}
          >
            <MapNode
              person={person}
              size={isIC ? 48 : 40}
              isIC={isIC}
              showRoles={showRoles}
              isSelected={selected && selected.id === person.id}
              onClick={(e) => { e.stopPropagation(); handleSelect(person); }}
              catFrom={cc ? cc.from : undefined}
              catTo={cc ? cc.to : undefined}
            />
          </div>
        );
      })}

      {/* Alex center node */}
      <div style={{ position: "absolute", left: MAP_CX + "%", top: MAP_CY, transform: "translate(-50%, -50%)", zIndex: 4 }}>
        <MapCenterNode />
      </div>

      {/* Popover */}
      {selected && MAP_POS[selected.id] && (
        <MapPopover
          person={selected}
          pos={MAP_POS[selected.id]}
          showRoles={showRoles}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}

/* ─────────── Category tab content (Teachers / Advisors / Coaches / Support Staff) ─────────── */

function CategoryContent({ cat, showRoles }) {
  // Split Inner Circle members that belong to this category
  const innerPeople = INNER_CIRCLE.filter((p) => p.cat === cat);
  // Everyone else in this category (non-IC)
  const mainPeople  = TEAM_PEOPLE.filter((p) => p.cat === cat);

  // Human-readable section heading
  const catLabel =
    cat === "Support Staff" ? "Support Staff"
    : cat === "Coach"       ? "Coaches"
    : cat === "Doctor"      ? "Doctors"
    : cat === "Counselor"   ? "Counselors"
    :                         cat + "s";            // Teacher→Teachers, Advisor→Advisors

  return (
    <div>
      {/* Inner Circle section — only when at least one IC member shares this category */}
      {innerPeople.length > 0 && (
        <InnerCircleListSection showRoles={showRoles} people={innerPeople} />
      )}

      {/* Section count label */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
        {catLabel} · {mainPeople.length} {mainPeople.length === 1 ? "person" : "people"}
      </div>

      {/* Rows */}
      {mainPeople.length > 0 ? (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {mainPeople.map((person, i) => (
            <ListRow
              key={person.id}
              person={person}
              pinned={false}
              showRoles={showRoles}
              isLast={i === mainPeople.length - 1}
            />
          ))}
        </div>
      ) : (
        <div style={{ color: "var(--stone)", fontSize: 13.5, padding: "40px 0", textAlign: "center" }}>
          No {catLabel.toLowerCase()} on your team yet.
        </div>
      )}
    </div>
  );
}

/* ─────────── Grid content ─────────── */

/* ─────────── Team Chat Panel ─────────── */

const RECENT_MESSAGES = [
  {
    person: { id: "kim", name: "Mr. David Kim", initials: "DK", avatarFrom: "#FCD34D", avatarTo: "#D97706", role: "US History", cat: "Teacher", avail: "Tues / Thurs lunch · Rm 220" },
    preview: "Great job on last week's essay — your thesis was really strong. Let me know if you'd like to talk through your revisions before the final.",
    timestamp: "2h ago",
    unread: true,
  },
  {
    person: { id: "s-chen", name: "Ms. Sarah Chen", initials: "SC", avatarFrom: "#A78BFA", avatarTo: "#7C3AED", role: "Algebra II", cat: "Teacher", avail: "Periods 1 & 3 · Room 204" },
    preview: "Reminder: office hours are moving to Thursday this week only. Same time, Room 204.",
    timestamp: "Yesterday",
    unread: false,
  },
  {
    person: { id: "hernandez", name: "Dr. Maria Hernandez", initials: "MH", avatarFrom: "#C4B5FD", avatarTo: "#7C3AED", role: "College Counselor", cat: "Advisor", avail: "By appointment" },
    preview: "I've reviewed your Common App draft — can we meet this week to go over feedback before the June deadline?",
    timestamp: "Mon",
    unread: true,
  },
];

const THREAD_MESSAGES = {
  kim: [
    { self: false, text: "Hey Alex, I finished grading the mid-unit essays — yours stood out. Your argument structure has really improved this semester.", time: "Mon 9:14 AM" },
    { self: true,  text: "Thank you so much! I was a bit worried about the thesis — glad it landed.", time: "Mon 10:02 AM" },
    { self: false, text: "Great job on last week's essay — your thesis was really strong. Let me know if you'd like to talk through your revisions before the final.", time: "Today 8:31 AM" },
  ],
  "s-chen": [
    { self: false, text: "Hi Alex — just a quick note that I need to move office hours this week.", time: "Yesterday 2:15 PM" },
    { self: false, text: "Reminder: office hours are moving to Thursday this week only. Same time, Room 204.", time: "Yesterday 2:16 PM" },
  ],
  hernandez: [
    { self: true,  text: "Hi Dr. Hernandez, I just submitted my Common App draft for your review. No rush — thank you!", time: "Fri 3:45 PM" },
    { self: false, text: "I've reviewed your Common App draft — can we meet this week to go over feedback before the June deadline?", time: "Mon 11:22 AM" },
  ],
};

function TeamThreadRow({ thread, isLast, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        cursor: "pointer",
        background: hovered ? "#F7F5FF" : "transparent",
        borderBottom: !isLast ? "1px solid #F0EEF9" : "none",
        transition: "background 100ms",
      }}
    >
      <div style={{ position: "relative", flexShrink: 0 }}>
        <Avatar person={thread.person} size={36} />
        {thread.unread && (
          <div style={{
            position: "absolute", bottom: 0, right: 0,
            width: 9, height: 9, borderRadius: 999,
            background: "#7C3AED", border: "2px solid #fff",
          }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: thread.unread ? 700 : 500, color: "var(--ink)", marginBottom: 1 }}>
          {thread.person.name}
        </div>
        <div style={{ fontSize: 11.5, color: thread.unread ? "#475569" : "#94A3B8", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {thread.preview}
        </div>
      </div>
      <div style={{ flexShrink: 0, fontSize: 11, color: thread.unread ? "#7C3AED" : "#94A3B8", fontWeight: thread.unread ? 600 : 400 }}>
        {thread.timestamp}
      </div>
    </div>
  );
}

function TeamThreadDetail({ thread, draft, onDraftChange, onSend }) {
  const scroller = React.useRef(null);
  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
  }, [thread.messages.length]);

  return (
    <>
      <div ref={scroller} style={{ flex: 1, overflowY: "auto", padding: "12px 14px 6px", display: "flex", flexDirection: "column", gap: 10 }}>
        {thread.messages.map((m, i) =>
          m.self ? (
            <div key={i} style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ maxWidth: "80%" }}>
                <div style={{
                  background: "#7C3AED", color: "#fff",
                  borderRadius: "12px 12px 2px 12px",
                  padding: "8px 11px", fontSize: 12, lineHeight: 1.45,
                }}>{m.text}</div>
                <div style={{ fontSize: 10, color: "var(--silver)", textAlign: "right", marginTop: 2 }}>{m.time}</div>
              </div>
            </div>
          ) : (
            <div key={i} style={{ display: "flex", gap: 8 }}>
              <Avatar person={thread.person} size={26} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, color: "var(--silver)", marginBottom: 2 }}>{m.time}</div>
                <div style={{
                  background: "#F3F0FF",
                  borderRadius: "2px 12px 12px 12px",
                  padding: "8px 10px", fontSize: 12, color: "var(--slate)", lineHeight: 1.45,
                }}>{m.text}</div>
              </div>
            </div>
          )
        )}
      </div>
      <div style={{ borderTop: "1px solid var(--mist)", padding: "10px 12px", background: "var(--paper)", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 6, alignItems: "center", padding: "6px 8px", background: "var(--bone)", borderRadius: 10 }}>
          <input
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
            placeholder={"Reply to " + thread.person.name.split(" ").slice(-1)[0] + "…"}
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "var(--ink)" }}
          />
          <button onClick={onSend} style={{
            background: "#7C3AED", border: "none", borderRadius: 7,
            padding: "5px 8px", cursor: "pointer", display: "flex", alignItems: "center",
            transition: "background 100ms",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#5B21B6"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#7C3AED"; }}
          >
            <I.Send size={12} color="#fff" />
          </button>
        </div>
        <div style={{ fontSize: 10, color: "var(--silver)", marginTop: 5, textAlign: "center" }}>
          Messages are private between you and your team member.
        </div>
      </div>
    </>
  );
}

function NewTeamMessageModal({ onClose }) {
  const [selected, setSelected] = React.useState(null);
  const [query, setQuery]       = React.useState("");
  const allPeople = [...INNER_CIRCLE, ...TEAM_PEOPLE];
  const filtered  = allPeople.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.role.toLowerCase().includes(query.toLowerCase())
  );

  if (selected) {
    return <MessageModal person={selected} onClose={onClose} onSend={onClose} />;
  }

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "24px 24px 20px", width: 440, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative", maxHeight: "calc(100vh - 80px)", display: "flex", flexDirection: "column" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={15} color="var(--stone)" />
        </button>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: "0 0 16px", paddingRight: 28 }}>
          New Message
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 12px", height: 36, background: "var(--bone)", borderRadius: 10, marginBottom: 14, flexShrink: 0 }}>
          <I.Search size={13} color="var(--silver)" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search your team…"
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)" }}
          />
        </div>

        <div style={{ overflowY: "auto", flex: 1 }}>
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "8px 10px", borderRadius: 10, border: "none", background: "transparent", cursor: "pointer", textAlign: "left", transition: "background 80ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F5FF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              <Avatar person={p} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{p.role}</div>
              </div>
              <I.ChevronRight size={14} color="var(--silver)" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamChatPanel() {
  const [tab,          setTab]          = React.useState("all");
  const [openThreadId, setOpenThreadId] = React.useState(null);
  const [newMsgOpen,   setNewMsgOpen]   = React.useState(false);
  const [drafts,       setDrafts]       = React.useState({});
  const [localThreads, setLocalThreads] = React.useState(
    RECENT_MESSAGES.map((t) => ({ ...t, messages: THREAD_MESSAGES[t.person.id] || [] }))
  );

  const unreadCount    = localThreads.filter((t) => t.unread).length;
  const openThread     = openThreadId ? localThreads.find((t) => t.person.id === openThreadId) : null;
  const filteredThreads = tab === "unread"   ? localThreads.filter((t) => t.unread)
                        : tab === "archived" ? []
                        : localThreads;

  const openThreadFn = (threadId) => {
    setOpenThreadId(threadId);
    setLocalThreads((prev) => prev.map((t) =>
      t.person.id === threadId ? { ...t, unread: false } : t
    ));
  };

  const sendReply = (threadId) => {
    const txt = (drafts[threadId] || "").trim();
    if (!txt) return;
    const now  = new Date();
    const time = now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setLocalThreads((prev) => prev.map((t) =>
      t.person.id === threadId
        ? { ...t, preview: txt, timestamp: "Just now", messages: [...t.messages, { self: true, text: txt, time }] }
        : t
    ));
    setDrafts((d) => ({ ...d, [threadId]: "" }));
  };

  return (
    <>
      {newMsgOpen && <NewTeamMessageModal onClose={() => setNewMsgOpen(false)} />}

      <div style={{
        position: "sticky", top: 24,
        background: "var(--paper)", borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)",
        display: "flex", flexDirection: "column",
        height: "calc(100vh - 120px)", maxHeight: 660,
      }}>

        {/* ── Header ── */}
        <div style={{ background: "var(--bone)", borderBottom: "1px solid var(--mist)", flexShrink: 0 }}>
          {/* Title row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 14px 10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {openThread ? (
                <button
                  onClick={() => setOpenThreadId(null)}
                  style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 3, color: "#7C3AED", fontSize: 12, fontWeight: 600, padding: 0 }}
                >
                  <I.ChevronLeft size={14} color="#7C3AED" /> Back
                </button>
              ) : (
                <>
                  <div style={{ width: 20, height: 20, borderRadius: 7, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <I.MessageCircle size={11} color="#7C3AED" />
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Team Messages</span>
                  {unreadCount > 0 && (
                    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 17, height: 17, borderRadius: 999, background: "#7C3AED", color: "#fff", fontSize: 9.5, fontWeight: 700 }}>
                      {unreadCount}
                    </span>
                  )}
                </>
              )}
            </div>
            <button
              onClick={() => setNewMsgOpen(true)}
              style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 26, padding: "0 9px", background: "#7C3AED", border: "none", borderRadius: 7, fontSize: 11, fontWeight: 600, color: "#fff", cursor: "pointer", transition: "background 100ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#5B21B6"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#7C3AED"; }}
            >
              <I.Pencil size={11} color="#fff" /> New
            </button>
          </div>

          {/* Thread person header (when a thread is open) */}
          {openThread && (
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 14px 11px" }}>
              <Avatar person={openThread.person} size={30} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{openThread.person.name}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{openThread.person.role}</div>
              </div>
            </div>
          )}

          {/* Tabs (only on thread list view) */}
          {!openThread && (
            <div style={{ display: "flex" }}>
              {[
                { id: "all",      label: "All"      },
                { id: "unread",   label: "Unread"   },
                { id: "archived", label: "Archived" },
              ].map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: "8px 4px",
                  background: "transparent", border: "none",
                  borderBottom: tab === t.id ? "2px solid #7C3AED" : "2px solid transparent",
                  fontSize: 11.5, fontWeight: tab === t.id ? 700 : 500,
                  color: tab === t.id ? "#7C3AED" : "var(--stone)",
                  cursor: "pointer", transition: "color 100ms",
                }}>
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Thread list ── */}
        {!openThread && (
          <div style={{ flex: 1, overflowY: "auto" }}>
            {filteredThreads.length === 0 ? (
              <div style={{ padding: "28px 16px", textAlign: "center", color: "var(--silver)", fontSize: 12, lineHeight: 1.5 }}>
                {tab === "archived" ? "No archived threads yet." : "No unread messages."}
              </div>
            ) : (
              filteredThreads.map((thread, i) => (
                <TeamThreadRow
                  key={thread.person.id}
                  thread={thread}
                  isLast={i === filteredThreads.length - 1}
                  onClick={() => openThreadFn(thread.person.id)}
                />
              ))
            )}
          </div>
        )}

        {/* ── Thread detail ── */}
        {openThread && (
          <TeamThreadDetail
            thread={openThread}
            draft={drafts[openThread.person.id] || ""}
            onDraftChange={(v) => setDrafts((d) => ({ ...d, [openThread.person.id]: v }))}
            onSend={() => sendReply(openThread.person.id)}
          />
        )}

        {/* ── Footer: services link ── */}
        {!openThread && (
          <div style={{
            padding: "8px 14px 10px",
            borderTop: "1px solid var(--mist)",
            flexShrink: 0,
            textAlign: "center",
          }}>
            <a
              href="#/my-team/resources"
              style={{
                fontSize: 11.5,
                color: "var(--student)",
                fontWeight: 600,
                textDecoration: "none",
                opacity: 0.75,
                transition: "opacity 120ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.75"; }}
            >View your active services →</a>
          </div>
        )}
      </div>
    </>
  );
}

function GridContent({ showRoles, pinnedIds, onTogglePin }) {
  const allPeople       = [...INNER_CIRCLE, ...TEAM_PEOPLE];
  const pinnedPeople    = allPeople.filter((p) => pinnedIds.has(p.id));
  const mainPeople      = TEAM_PEOPLE.filter((p) => !pinnedIds.has(p.id) && p.cat !== "Doctor" && p.cat !== "Counselor");
  const doctorPeople    = TEAM_PEOPLE.filter((p) => p.cat === "Doctor"    && !pinnedIds.has(p.id));
  const counselorPeople = TEAM_PEOPLE.filter((p) => p.cat === "Counselor" && !pinnedIds.has(p.id));

  return (
    <div>
      {pinnedPeople.length > 0 && (
        <InnerCircleGridSection showRoles={showRoles} people={pinnedPeople} onTogglePin={onTogglePin} />
      )}

      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
        Everyone · {mainPeople.length} people
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, alignItems: "start", marginBottom: 28 }}>
        {mainPeople.map((person) => (
          <PersonCard key={person.id} person={person} pinned={false} showRoles={showRoles} onStarChange={onTogglePin} />
        ))}
        <AddPersonCard />
      </div>

      {/* Doctors */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
        Doctors · {doctorPeople.length} {doctorPeople.length === 1 ? "person" : "people"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, alignItems: "start", marginBottom: 28 }}>
        {doctorPeople.map((person) => (
          <PersonCard key={person.id} person={person} pinned={false} showRoles={showRoles} onStarChange={onTogglePin} />
        ))}
      </div>

      {/* Counselors */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
        Counselors · {counselorPeople.length} {counselorPeople.length === 1 ? "person" : "people"}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, alignItems: "start" }}>
        {counselorPeople.map((person) => (
          <PersonCard key={person.id} person={person} pinned={false} showRoles={showRoles} onStarChange={onTogglePin} />
        ))}
      </div>
    </div>
  );
}

/* ─────────── List content ─────────── */

function ListContent({ showRoles, pinnedIds, onTogglePin }) {
  const allPeople       = [...INNER_CIRCLE, ...TEAM_PEOPLE];
  const pinnedPeople    = allPeople.filter((p) => pinnedIds.has(p.id));
  const mainPeople      = TEAM_PEOPLE.filter((p) => !pinnedIds.has(p.id) && p.cat !== "Doctor" && p.cat !== "Counselor");
  const doctorPeople    = TEAM_PEOPLE.filter((p) => p.cat === "Doctor"    && !pinnedIds.has(p.id));
  const counselorPeople = TEAM_PEOPLE.filter((p) => p.cat === "Counselor" && !pinnedIds.has(p.id));

  return (
    <div>
      {pinnedPeople.length > 0 && (
        <InnerCircleListSection showRoles={showRoles} people={pinnedPeople} onTogglePin={onTogglePin} />
      )}

      {/* Everyone label */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
        Everyone · {mainPeople.length} people
      </div>

      {/* Main rows */}
      <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
        {mainPeople.map((person, i) => (
          <ListRow
            key={person.id}
            person={person}
            pinned={false}
            showRoles={showRoles}
            isLast={i === mainPeople.length - 1}
            onStarChange={onTogglePin}
          />
        ))}
      </div>

      {/* Doctors */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
        Doctors · {doctorPeople.length} {doctorPeople.length === 1 ? "person" : "people"}
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 20 }}>
        {doctorPeople.map((person, i) => (
          <ListRow
            key={person.id}
            person={person}
            pinned={false}
            showRoles={showRoles}
            isLast={i === doctorPeople.length - 1}
            onStarChange={onTogglePin}
          />
        ))}
      </div>

      {/* Counselors */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
        Counselors · {counselorPeople.length} {counselorPeople.length === 1 ? "person" : "people"}
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        {counselorPeople.map((person, i) => (
          <ListRow
            key={person.id}
            person={person}
            pinned={false}
            showRoles={showRoles}
            isLast={i === counselorPeople.length - 1}
            onStarChange={onTogglePin}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────── Overview content (view-aware) ─────────── */

function OverviewContent({ showRoles, viewMode }) {
  const [pinnedIds, setPinnedIds] = React.useState(() => new Set(INNER_CIRCLE.map((p) => p.id)));
  const [pinToast,  setPinToast]  = React.useState(null);

  React.useEffect(() => {
    if (!pinToast) return;
    const t = setTimeout(() => setPinToast(null), 3000);
    return () => clearTimeout(t);
  }, [pinToast]);

  const onTogglePin = (personId, isPinning) => {
    setPinnedIds((prev) => {
      const next = new Set(prev);
      if (isPinning) next.add(personId); else next.delete(personId);
      return next;
    });
    setPinToast(isPinning ? "Added to Inner Circle ✓" : "Removed from Inner Circle");
  };

  return (
    <>
      {pinToast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Star size={14} color="#F59E0B" strokeWidth={0} style={{ fill: "#F59E0B" }} />
          <span>{pinToast}</span>
        </div>
      )}
      {viewMode === "map" ? (
        <SupportMapContent showRoles={showRoles} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
          <div>
            {viewMode === "list"
              ? <ListContent showRoles={showRoles} pinnedIds={pinnedIds} onTogglePin={onTogglePin} />
              : <GridContent showRoles={showRoles} pinnedIds={pinnedIds} onTogglePin={onTogglePin} />
            }
          </div>
          <TeamChatPanel />
        </div>
      )}
    </>
  );
}

/* ─────────── Add Filter modal ─────────── */

function AddFilterModal({ onClose, onCreate }) {
  const [name,    setName]    = React.useState("");
  const [color,   setColor]   = React.useState(FILTER_COLORS[0]);
  const [query,   setQuery]   = React.useState("");
  const [checked, setChecked] = React.useState({});

  const allPeople = [...INNER_CIRCLE, ...TEAM_PEOPLE];
  const visible   = allPeople.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.role.toLowerCase().includes(query.toLowerCase())
  );

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const selectedCount = Object.values(checked).filter(Boolean).length;
  const canCreate = selectedCount > 0;

  const handleCreate = () => {
    if (!canCreate) return;
    const people = Object.entries(checked).filter(([, v]) => v).map(([k]) => k);
    onCreate({ id: Date.now().toString(), label: name.trim() || "Custom filter", people, color });
    onClose();
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 480, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative", display: "flex", flexDirection: "column", maxHeight: "calc(100vh - 80px)" }}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--ink)", margin: "0 0 20px", paddingRight: 32, letterSpacing: "-0.01em" }}>
          Create a custom filter
        </h2>

        {/* Filter name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 22 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Filter name</label>
          <input
            type="text"
            placeholder={`e.g. "People I trust most"`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ height: 38, padding: "0 12px", border: "1px solid var(--mist)", borderRadius: 10, fontSize: 13.5, color: "var(--ink)", background: "var(--paper)", fontFamily: "var(--font-ui)", outline: "none", transition: "border-color 120ms, box-shadow 120ms" }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.boxShadow = "0 0 0 3px #EDE9FE"; }}
            onBlur={(e)  => { e.currentTarget.style.borderColor = "var(--mist)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>

        {/* Color picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Choose a color</label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {FILTER_COLORS.map((c) => {
              const isSel = color === c;
              return (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  aria-label={`Select color ${c}`}
                  style={{ width: 24, height: 24, borderRadius: 999, background: c, border: "none", cursor: "pointer", padding: 0, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isSel ? `0 0 0 2.5px #fff, 0 0 0 4.5px ${c}` : "none", transition: "box-shadow 120ms" }}
                >
                  {isSel && <I.Check size={9} color="#fff" strokeWidth={3.5} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Add people section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minHeight: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Add people to this filter
            </span>
            {selectedCount > 0 && (
              <span style={{ fontSize: 12, fontWeight: 600, color: "#5B21B6", background: "#EDE9FE", padding: "2px 8px", borderRadius: 999 }}>
                {selectedCount} selected
              </span>
            )}
          </div>

          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, height: 34, padding: "0 12px", border: "none", borderRadius: 10, background: "#F7F5FF", flexShrink: 0 }}>
            <I.Search size={13} color="var(--silver)" />
            <input
              type="text"
              placeholder="Search by name or role…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1, border: "none", background: "transparent", fontSize: 13, color: "var(--ink)", fontFamily: "var(--font-ui)", outline: "none" }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ border: "none", background: "transparent", cursor: "pointer", padding: 0, display: "flex" }}>
                <I.X size={12} color="var(--silver)" />
              </button>
            )}
          </div>

          {/* People list */}
          <div style={{ overflowY: "auto", flex: 1, minHeight: 160, maxHeight: 240, borderRadius: 12, background: "var(--paper)", boxShadow: "0 0 0 1px #EDE9FE" }}>
            {visible.length === 0 ? (
              <div style={{ padding: "28px 0", textAlign: "center", color: "var(--stone)", fontSize: 13 }}>No matches</div>
            ) : visible.map((person, i) => {
              const isChecked = !!checked[person.id];
              const isLast = i === visible.length - 1;
              return (
                <label
                  key={person.id}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderBottom: isLast ? "none" : "1px solid var(--mist)", cursor: "pointer", transition: "background 80ms" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggle(person.id)}
                    style={{ width: 15, height: 15, accentColor: "#A78BFA", flexShrink: 0, cursor: "pointer" }}
                  />
                  <div style={{ width: 30, height: 30, borderRadius: 999, flexShrink: 0, background: `linear-gradient(135deg, ${person.avatarFrom}, ${person.avatarTo})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10.5, fontWeight: 700, border: "1.5px solid rgba(255,255,255,0.55)" }}>
                    {person.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{person.name}</div>
                    <div style={{ fontSize: 11.5, color: "var(--stone)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{person.role}</div>
                  </div>
                  <CatBadge cat={person.cat} />
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, paddingTop: 20, marginTop: 4, borderTop: "1px solid var(--mist)" }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button
            onClick={handleCreate}
            disabled={!canCreate}
            className="btn btn-primary"
            style={{ fontSize: 13, opacity: canCreate ? 1 : 0.45, cursor: canCreate ? "pointer" : "default" }}
          >
            Create filter
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Custom filter content ─────────── */

function CustomFilterContent({ filter, showRoles }) {
  const allPeople    = [...INNER_CIRCLE, ...TEAM_PEOPLE];
  const people       = allPeople.filter((p) => filter.people.includes(p.id));
  const innerPeople  = people.filter((p) => INNER_CIRCLE.some((ic) => ic.id === p.id));
  const mainPeople   = people.filter((p) => !INNER_CIRCLE.some((ic) => ic.id === p.id));

  return (
    <div>
      {innerPeople.length > 0 && (
        <InnerCircleListSection showRoles={showRoles} people={innerPeople} filterBadge={{ label: filter.label, color: filter.color || FILTER_COLORS[0] }} />
      )}

      <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
        {filter.label} · {mainPeople.length} {mainPeople.length === 1 ? "person" : "people"}
      </div>

      {mainPeople.length > 0 ? (
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {mainPeople.map((person, i) => (
            <ListRow
              key={person.id}
              person={person}
              pinned={false}
              showRoles={showRoles}
              isLast={i === mainPeople.length - 1}
              filterBadge={{ label: filter.label, color: filter.color || FILTER_COLORS[0] }}
            />
          ))}
        </div>
      ) : (
        <div style={{ color: "var(--stone)", fontSize: 13.5, padding: "40px 0", textAlign: "center" }}>
          No people in this filter yet.
        </div>
      )}
    </div>
  );
}

/* ─────────── Add-to-calendar button (shared) ─────────── */

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
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, height, padding: "0 10px", borderRadius: 999, border: "1px solid #E5E7EB", background: "#F3F4F6", color: "#9CA3AF", fontSize, fontWeight: 600 }}>
            <I.Check size={iconSize} color="#9CA3AF" strokeWidth={2.5} /> Added
          </span>
        ) : (
          <button
            onClick={() => setPopoverOpen(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, height, padding: "0 10px", borderRadius: 999, border: `1px solid ${borderColor}`, background, color, fontSize, fontWeight: 600, cursor: "pointer", transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = background; }}
          >
            <I.Calendar size={iconSize} color={color} /> Add to calendar
          </button>
        )}
        {popoverOpen && (
          <div style={{ position: "absolute", bottom: "calc(100% + 8px)", left: 0, zIndex: 999, background: "#FFFFFF", borderRadius: 14, boxShadow: "0 4px 24px rgba(99,102,241,0.14), 0 1px 6px rgba(0,0,0,0.08)", padding: "16px 18px", width: 248, whiteSpace: "normal" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B", marginBottom: 3 }}>{eventName}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginBottom: location ? 3 : 14 }}>{datetime}</div>
            {location && (
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#9CA3AF", marginBottom: 14 }}>
                <I.MapPin size={10} color="#C4B5FD" strokeWidth={1.8} /> {location}
              </div>
            )}
            <div style={{ display: "flex", gap: 7 }}>
              <button onClick={confirm} style={{ flex: 1, height: 32, border: "none", borderRadius: 9, background: "#5B21B6", color: "#FFFFFF", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "background 100ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#4C1D95"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#5B21B6"; }}>
                Add to My Calendar
              </button>
              <button onClick={(e) => { e.stopPropagation(); setPopoverOpen(false); }} style={{ height: 32, padding: "0 12px", border: "1.5px solid #E5E7EB", borderRadius: 9, background: "transparent", color: "#9CA3AF", fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "border-color 100ms, color 100ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.color = "#6B7280"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.color = "#9CA3AF"; }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      {showToast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 99999, background: "#1E1B4B", borderRadius: 12, padding: "13px 20px", color: "#FFFFFF", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 24px rgba(30,27,75,0.22)", display: "flex", alignItems: "center", gap: 9, whiteSpace: "nowrap" }}>
          <I.Check size={14} color="#A5F3FC" strokeWidth={2.5} />
          {eventName} added to your calendar ✓
        </div>
      )}
      <style>{`@keyframes calToastIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </React.Fragment>
  );
}

/* ─────────── Teachers tab ─────────── */

function TeacherCard({ teacher }) {
  return (
    <div className="card" style={{ background: "#FFFFFF", borderRadius: 20, border: "none", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)", padding: "22px 24px" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
        <Avatar person={teacher} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
            <span style={{ fontSize: 15.5, fontWeight: 700, color: "#1E1B4B" }}>{teacher.name}</span>
            {teacher.innerCircle && <I.Star size={13} color="#F59E0B" strokeWidth={0} style={{ fill: "#F59E0B", flexShrink: 0 }} />}
          </div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>{teacher.subject}</div>
        </div>
        <a href={teacher.classHref} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: "#5B21B6", background: "#EDE9FE", padding: "5px 12px", borderRadius: 10, textDecoration: "none", whiteSpace: "nowrap", transition: "background 100ms", flexShrink: 0 }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#DDD6FE"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}>
          View class <I.ChevronRight size={11} color="#5B21B6" />
        </a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "#F7F5FF", borderRadius: 12, padding: "11px 14px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Current Unit</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", lineHeight: 1.35 }}>{teacher.unit}</div>
        </div>
        <div style={{ background: "#F0FDF4", borderRadius: 12, padding: "11px 14px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Next Class</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", lineHeight: 1.35 }}>{teacher.nextClass}</div>
        </div>
        <div style={{ background: "#F0F9FF", borderRadius: 12, padding: "11px 14px", gridColumn: "span 2" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Office Hours</div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B" }}>{teacher.officeHours}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Info tooltip (reusable) ─────────── */

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

/* ─────────── Action nudge card ─────────── */

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

/* ─────────── Special Education tab — modals ─────────── */

function SpEdDocModal({ doc, onClose }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 480, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingRight: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.FileText size={20} color="#5B21B6" />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{doc.title}</h2>
            <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 3 }}>Shared by {doc.sharedBy} · {doc.type}</div>
          </div>
        </div>

        {/* Info note */}
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#F0FDF4", borderRadius: 10, marginBottom: 18 }}>
          <I.Info size={13} color="#15803D" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>Your team shared this to help you understand your plan and advocate for yourself.</span>
        </div>

        {/* Document tile */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#F7F5FF", borderRadius: 12, marginBottom: 14 }}>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "3px 8px", borderRadius: 6, background: "#EDE9FE", color: "#5B21B6", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{doc.fileType}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>{doc.title}</div>
            <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>Added {doc.dateAdded}</div>
          </div>
        </div>

        {/* Preview placeholder */}
        <div style={{ height: 110, borderRadius: 12, background: "#F3F4F6", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
          <I.FileText size={28} color="#D1D5DB" />
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>Preview not available in this view</span>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Close</button>
          <button className="btn btn-primary" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.FileText size={13} color="currentColor" /> Open full document
          </button>
        </div>
      </div>
    </div>
  );
}

function SpEdOpportunityModal({ opp, onClose, onEnroll }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 500, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#F3F0FF"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>

        {/* Title + status */}
        <div style={{ marginBottom: 16, paddingRight: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 10 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{opp.title}</h2>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 999, background: opp.statusBg, color: opp.statusColor, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>{opp.status}</span>
          </div>
          <p style={{ fontSize: 13.5, color: "#374151", margin: 0, lineHeight: 1.65 }}>{opp.description}</p>
        </div>

        {/* Key details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 22 }}>
          {opp.details.map((d, i) => (
            <div key={i} style={{ background: "#F7F5FF", borderRadius: 12, padding: "11px 14px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{d.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>{d.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button className="btn btn-primary" onClick={() => { onEnroll(opp.title, opp.linkLabel); onClose(); }} style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            {opp.linkLabel === "View course"
              ? <><I.Check size={13} color="currentColor" /> Request to enroll</>
              : <><I.ChevronRight size={13} color="currentColor" /> Learn more</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function SpEdCalendarModal({ event, onClose, onAddCalendar }) {
  // May 2026: starts Friday (index 5 in Sun=0 layout)
  const cells = [];
  for (let i = 0; i < 5; i++) cells.push(null);
  for (let d = 1; d <= 31; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const SESSION_DAYS = event.sessionDays || [];
  const TODAY = 18;
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

        {/* Header */}
        <div style={{ marginBottom: 20, paddingRight: 32 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: "0 0 8px" }}>{event.name}</h2>
          <div style={{ fontSize: 13, color: "#374151", marginBottom: 2 }}><span style={{ fontWeight: 600 }}>Recurrence · </span>{event.recurrence}</div>
          <div style={{ fontSize: 13, color: "#374151" }}><span style={{ fontWeight: 600 }}>Time · </span>{event.time}</div>
        </div>

        {/* Mini calendar — May 2026 */}
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

        {/* Calendar buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button onClick={() => { onAddCalendar("LINKS Calendar"); onClose(); }} className="btn btn-primary" style={{ fontSize: 13 }}>
            <I.Calendar size={14} color="currentColor" /> Add to my calendar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Self-contained calendar button (modal + toast) ─────────── */

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
        <SpEdCalendarModal
          event={event}
          onClose={() => setOpen(false)}
          onAddCalendar={() => { setOpen(false); setToast(true); }}
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

/* ─────────── Special Education tab ─────────── */

function SpecEdBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: "10px 14px", marginBottom: 20 }}>
      <I.Lock size={13} color="#15803D" strokeWidth={2} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>Your special education records are protected under <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}>FERPA &amp; IDEA<InfoTooltip text="FERPA protects your education records. IDEA is the federal law that ensures students with disabilities receive appropriate support." /></span> · Read only · Managed by Student Services</span>
    </div>
  );
}

function SpecialEducationTab() {
  const [msgTarget, setMsgTarget] = React.useState(null);
  const [docItem,   setDocItem]   = React.useState(null);
  const [toast,     setToast]     = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const PROVIDERS = [
    { name: "Ms. Karen Liu",  role: "Special Education Coordinator", email: "k.liu@linkshs.edu",   phone: "(555) 203-4800", initials: "KL", avatarFrom: "#A78BFA", avatarTo: "#7C3AED" },
    { name: "Mr. Tony Bravo", role: "Resource Specialist",            email: "t.bravo@linkshs.edu", phone: "(555) 203-4810", initials: "TB", avatarFrom: "#6EE7B7", avatarTo: "#059669" },
  ];

  const DOCS = [
    { title: "Your IEP Goals This Year",           type: "Summary",  sharedBy: "Ms. Karen Liu",  fileType: "PDF", dateAdded: "May 10, 2026" },
    { title: "Understanding Your Accommodations",  type: "Guide",    sharedBy: "Mr. Tony Bravo", fileType: "PDF", dateAdded: "Apr 28, 2026" },
    { title: "Self-Advocacy: Knowing Your Rights", type: "Resource", sharedBy: "Ms. Karen Liu",  fileType: "PDF", dateAdded: "Mar 15, 2026" },
  ];

  const ACCOMMODATIONS = [
    { name: "Extended time on tests",                  desc: "You get extra time to finish tests and quizzes — usually 1.5× or 2× the standard time limit." },
    { name: "Preferential seating",                    desc: "Your seat is chosen to help you focus, like near the front of the room or away from distractions." },
    { name: "Breaks during instruction",               desc: "You can take short breaks during class or a long exam whenever you need to reset and refocus." },
    { name: "Access to assistive technology",          desc: "You can use tools like text-to-speech, digital note-taking, or other tech to help you complete your work." },
    { name: "Reduced distraction testing environment", desc: "You'll take tests in a quieter room with fewer students so you can focus without interruptions." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

      {/* Modals */}
      {msgTarget && (
        <MessageModal
          person={msgTarget}
          privacyNote={`Messages are private and only seen by you and ${msgTarget.name}.`}
          onClose={() => setMsgTarget(null)}
          onSend={(name) => setToast(name)}
        />
      )}
      {docItem && <SpEdDocModal doc={docItem} onClose={() => setDocItem(null)} />}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>Message sent to {toast} ✓</span>
        </div>
      )}

      <SpecEdBanner />

      {/* Plan Status */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Plan Status</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {/* IEP */}
          <div style={{ background: "#F7F5FF", borderRadius: 14, padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>IEP <InfoTooltip text="Individualized Education Program — a personalized learning plan created with your school team that outlines your goals, services, and accommodations." /></div>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.5, marginBottom: 10 }}>Individualized Education Program</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ fontSize: 11.5, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Dates</span> · Sep 2025 – Jun 2026</div>
              <div style={{ fontSize: 11.5, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Review</span> · March 15, 2026</div>
              <div style={{ fontSize: 11.5, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Next meeting</span> · June 5, 2026</div>
            </div>
            <div style={{ marginTop: 12 }}>
              <CalendarButton event={{ name: "IEP Meeting", recurrence: "One-time", time: "By appointment", sessionDays: [] }} />
            </div>
          </div>
          {/* 504 Plan */}
          <div style={{ background: "#F7F5FF", borderRadius: 14, padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>504 Plan <InfoTooltip text="A plan that ensures you get accommodations and support to access your education equally, based on a disability or health condition." /></div>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 600 }}>Active</span>
            </div>
            <div style={{ fontSize: 11.5, color: "#6B7280", lineHeight: 1.5, marginBottom: 10 }}>Section 504 Accommodation Plan</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ fontSize: 11.5, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Dates</span> · Sep 2025 – Jun 2026</div>
              <div style={{ fontSize: 11.5, color: "#6B7280" }}><span style={{ fontWeight: 600, color: "#374151" }}>Review</span> · April 10, 2026</div>
            </div>
          </div>
          {/* IHP */}
          <div style={{ background: "#F9FAFB", borderRadius: 14, padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13.5, fontWeight: 700, color: "#9CA3AF" }}>IHP <InfoTooltip text="Individual Health Plan — a plan that details any health needs or medical procedures your school should know about." /></div>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 999, background: "#F3F4F6", color: "#9CA3AF", fontSize: 11, fontWeight: 600 }}>Not applicable</span>
            </div>
            <div style={{ fontSize: 11.5, color: "#9CA3AF", lineHeight: 1.5 }}>Individual Health Plan</div>
          </div>
        </div>
      </div>

      {/* Accommodations */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Accommodations</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ACCOMMODATIONS.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 20, height: 20, borderRadius: 999, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <I.Check size={11} color="#065F46" strokeWidth={2.5} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Providers */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Service Providers</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PROVIDERS.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", background: "#F7F5FF", borderRadius: 14 }}>
                <Avatar person={p} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{p.role}</div>
                  <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{p.email} · {p.phone}</div>
                </div>
                <button onClick={() => setMsgTarget(p)} style={{ height: 30, padding: "0 12px", background: "#D1FAE5", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "background 100ms" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
                  <I.Messages size={12} color="#065F46" /> Message
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Shared with you */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Shared with you</div>
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#F0FDF4", borderRadius: 10, marginBottom: 14 }}>
          <I.Info size={13} color="#15803D" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "#166534", lineHeight: 1.5 }}>Your team has shared these to help you understand your plan and advocate for yourself.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DOCS.map((doc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: "#F7F5FF", cursor: "pointer", transition: "background 100ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F7F5FF"; }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <I.FileText size={17} color="#5B21B6" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: "#1E1B4B" }}>{doc.title}</div>
                <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{doc.type}</div>
              </div>
              <button onClick={() => setDocItem(doc)} style={{ fontSize: 12, fontWeight: 600, color: "#5B21B6", background: "none", border: "none", cursor: "pointer", padding: 0, whiteSpace: "nowrap" }}
                onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}>
                View →
              </button>
            </div>
          ))}
        </div>
      </div>

      <ActionNudgeCard items={[
        "Ask your team to walk you through your IEP goals before the next review meeting.",
        "Use all your accommodations — extended time and preferential seating are there for you.",
        "Reach out to Ms. Liu or Mr. Bravo anytime you have questions about your support plan.",
      ]} />
    </div>
  );
}

/* ─────────── GATE tab ─────────── */

function GateTab() {
  const [oppModal, setOppModal] = React.useState(null);
  const [msgTarget, setMsgTarget] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const GATE_COORD = { name: "Dr. Patricia Owens", role: "GATE Coordinator", email: "p.owens@linkshs.edu", phone: "(555) 203-4900", initials: "PO", avatarFrom: "#C4B5FD", avatarTo: "#7C3AED" };

  const OPPORTUNITIES = [
    {
      title: "Advanced STEM Elective",
      status: "Available now",
      statusColor: "#065F46", statusBg: "#D1FAE5",
      linkLabel: "View course",
      description: "A hands-on elective covering advanced topics in biology, chemistry, and physics with lab components. Recommended for students interested in science or engineering pathways.",
      details: [
        { label: "Format",     value: "In-person, 5 days/week" },
        { label: "Start date", value: "Next semester"          },
        { label: "Contact",    value: "Dr. Patricia Owens"     },
      ],
    },
    {
      title: "Academic Decathlon",
      status: "Starts Sept 2026",
      statusColor: "#0369A1", statusBg: "#E0F2FE",
      linkLabel: "Learn more",
      description: "A competitive team event covering ten subjects including math, science, language arts, social science, and interview skills. Great for building breadth, teamwork, and public speaking.",
      details: [
        { label: "Format",     value: "Team competition"   },
        { label: "Start date", value: "September 2026"     },
        { label: "Contact",    value: "Dr. Patricia Owens" },
      ],
    },
    {
      title: "Independent Study Project",
      status: "Self-paced",
      statusColor: "#5B21B6", statusBg: "#EDE9FE",
      linkLabel: "Learn more",
      description: "Design your own research or creative project under the guidance of a faculty mentor. Ideal for exploring a topic deeply and producing original work for your portfolio.",
      details: [
        { label: "Format",     value: "Self-directed + faculty mentor" },
        { label: "Start date", value: "Anytime"                        },
        { label: "Contact",    value: "Dr. Patricia Owens"             },
      ],
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {oppModal && (
        <SpEdOpportunityModal
          opp={oppModal}
          onClose={() => setOppModal(null)}
          onEnroll={(title, label) => setToast(label === "View course" ? `Enrollment request sent for ${title} ✓` : `Request sent for ${title} ✓`)}
        />
      )}
      {msgTarget && (
        <MessageModal
          person={msgTarget}
          privacyNote={`Messages are private and only seen by you and ${msgTarget.name}.`}
          onClose={() => setMsgTarget(null)}
          onSend={(name) => setToast(`Message sent to ${name} ✓`)}
        />
      )}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "#1E1B4B", color: "#FFFFFF", borderRadius: 12, padding: "12px 18px", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 8 }}>
          <I.Check size={14} color="#6EE7B7" /> {toast}
        </div>
      )}

      {/* GATE Identification */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>GATE Identification</div>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Star size={20} color="#5B21B6" strokeWidth={1.5} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B" }}>GATE Enrichment Program</span>
              <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 10px", borderRadius: 999, background: "#EDE9FE", color: "#5B21B6", fontSize: 11, fontWeight: 700 }}>Identified</span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Program",              value: "GATE Enrichment" },
            { label: "Identification date",  value: "October 2023"    },
            { label: "Grade identified",     value: "8th Grade"       },
          ].map((item, i) => (
            <div key={i} style={{ background: "#F7F5FF", borderRadius: 12, padding: "12px 14px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B" }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrichment Opportunities */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Enrichment Opportunities</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {OPPORTUNITIES.map((opp, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "#F7F5FF", borderRadius: 14 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B", marginBottom: 5 }}>{opp.title}</div>
                <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 9px", borderRadius: 999, background: opp.statusBg, color: opp.statusColor, fontSize: 11, fontWeight: 600 }}>{opp.status}</span>
              </div>
              <button onClick={() => setOppModal(opp)} style={{ height: 30, padding: "0 12px", background: "#EDE9FE", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#5B21B6", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "background 100ms" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#DDD6FE"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}>
                {opp.linkLabel} <I.ChevronRight size={11} color="#5B21B6" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* GATE Coordinator */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>GATE Coordinator</div>
        <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", background: "#F7F5FF", borderRadius: 14, marginBottom: 12 }}>
          <Avatar person={GATE_COORD} size={42} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{GATE_COORD.name}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{GATE_COORD.role}</div>
            <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{GATE_COORD.email} · {GATE_COORD.phone}</div>
          </div>
          <button onClick={() => setMsgTarget(GATE_COORD)} style={{ height: 30, padding: "0 12px", background: "#D1FAE5", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
            <I.Messages size={12} color="#065F46" /> Message
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#F7F5FF", borderRadius: 10 }}>
          <I.Info size={13} color="#9CA3AF" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>GATE identification and program assignments are managed by your school. Contact your coordinator for questions.</span>
        </div>
      </div>
      <ActionNudgeCard items={[
        "Talk to Dr. Owens about the Advanced STEM elective — it opens doors for next year.",
        "Ask about an independent study project with Dr. Owens to pursue something you're curious about.",
        "Look into Academic Decathlon starting in September — great for your portfolio.",
      ]} />
    </div>
  );
}

/* ─────────── Field Study tab ─────────── */

function FieldStudyTab() {
  const [calOpen, setCalOpen] = React.useState(false);
  const [msgTarget, setMsgTarget] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const CAL_EVENT = {
    name: "Field Study — Green Future Environmental Lab",
    recurrence: "Every Tuesday & Thursday",
    time: "1:00 PM – 4:00 PM",
    sessionDays: [5, 7, 12, 14, 19, 21, 26, 28],
  };

  const SUPERVISORS = [
    { name: "Dr. Amara Osei", role: "Field Supervisor", email: "a.osei@greenfuture.org", phone: "(555) 319-2200", initials: "AO", avatarFrom: "#86EFAC", avatarTo: "#16A34A" },
    { name: "Ms. Jenny Park", role: "School Liaison",   email: "j.park@linkshs.edu",     phone: "(555) 203-4850", initials: "JP", avatarFrom: "#FCA5A5", avatarTo: "#E11D48" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {calOpen && (
        <SpEdCalendarModal
          event={CAL_EVENT}
          onClose={() => setCalOpen(false)}
          onAddCalendar={(cal) => setToast(`Added to ${cal} ✓`)}
        />
      )}
      {msgTarget && (
        <MessageModal
          person={msgTarget}
          privacyNote={`Messages are private and only seen by you and ${msgTarget.name}.`}
          onClose={() => setMsgTarget(null)}
          onSend={(name) => setToast(`Message sent to ${name} ✓`)}
        />
      )}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "#1E1B4B", color: "#FFFFFF", borderRadius: 12, padding: "12px 18px", fontSize: 13, fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.18)", display: "flex", alignItems: "center", gap: 8 }}>
          <I.Check size={14} color="#6EE7B7" /> {toast}
        </div>
      )}

      {/* Current Placement */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em" }}>Current Placement</div>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "2px 10px", borderRadius: 999, background: "#D1FAE5", color: "#065F46", fontSize: 11, fontWeight: 700 }}>Active</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Organization", value: "Green Future Environmental Lab" },
            { label: "Role",         value: "Research Intern"                },
            { label: "Location",     value: "1200 Science Blvd, Building 4"  },
            { label: "Start date",   value: "February 3, 2026"               },
            { label: "End date",     value: "June 13, 2026"                  },
          ].map((item, i) => (
            <div key={i} style={{ background: "#F7F5FF", borderRadius: 12, padding: "11px 14px" }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{item.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "#F7F5FF", borderRadius: 14, padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Hours Logged</div>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: "#5B21B6" }}>42 / 80 required</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: "#EDE9FE", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "52.5%", background: "linear-gradient(90deg, #A78BFA, #7C3AED)", borderRadius: 999, transition: "width 600ms ease" }} />
          </div>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 6 }}>38 hours remaining to complete placement</div>
        </div>
      </div>

      {/* Supervisor & Mentor */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Supervisor &amp; Mentor</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SUPERVISORS.map((p, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, padding: "14px 16px", background: "#F7F5FF", borderRadius: 14 }}>
                <Avatar person={p} size={42} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{p.role}</div>
                  <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>{p.email} · {p.phone}</div>
                </div>
                <button onClick={() => setMsgTarget(p)} style={{ height: 30, padding: "0 12px", background: "#D1FAE5", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", transition: "background 100ms" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
                  <I.Messages size={12} color="#065F46" /> Message
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Schedule</div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "#F7F5FF", borderRadius: 14, marginBottom: 14 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Calendar size={18} color="#065F46" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B" }}>Weekly · Tuesdays &amp; Thursdays</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>1:00 PM – 4:00 PM</div>
          </div>
        </div>
        <button onClick={() => setCalOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 16px", background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", transition: "background 100ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
          <I.Calendar size={13} color="#065F46" /> Add to calendar
        </button>
      </div>
      <ActionNudgeCard items={[
        "Log your hours each week — don't wait until the end of the placement.",
        "Ask Dr. Osei for written feedback you can add to your portfolio.",
        "Connect your field study work to your portfolio Skills &amp; Growth section.",
      ]} />
    </div>
  );
}

function TeachersRightPanel({ sub = "all" }) {
  const SPED_TEAM = [
    { name: "Ms. Karen Liu",  role: "Special Ed Coordinator", initials: "KL", avatarFrom: "#A78BFA", avatarTo: "#7C3AED" },
    { name: "Mr. Tony Bravo", role: "Resource Specialist",    initials: "TB", avatarFrom: "#6EE7B7", avatarTo: "#059669" },
  ];
  const FIELD_CONTACTS = [
    { name: "Dr. Amara Osei", role: "Field Supervisor", initials: "AO", avatarFrom: "#86EFAC", avatarTo: "#16A34A" },
    { name: "Ms. Jenny Park", role: "School Liaison",   initials: "JP", avatarFrom: "#FCA5A5", avatarTo: "#E11D48" },
  ];
  const GATE_COORD = { initials: "PO", avatarFrom: "#C4B5FD", avatarTo: "#7C3AED" };

  return (
    <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Special Education — SpEd team list (above schedule on this tab) */}
      {sub === "special-ed" && (
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Your SpEd Team</div>
          {SPED_TEAM.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < SPED_TEAM.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <Avatar person={p} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>{p.role}</div>
              </div>
            </div>
          ))}
          <button style={{ width: "100%", height: 32, background: "#E0F2FE", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 12, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={12} color="#0369A1" /> Request a meeting
          </button>
        </div>
      )}

      {/* GATE — coordinator card (above schedule on this tab) */}
      {sub === "gate" && (
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Your GATE Coordinator</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <Avatar person={GATE_COORD} size={34} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B" }}>Dr. Patricia Owens</div>
              <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>GATE Coordinator</div>
            </div>
          </div>
          <div style={{ fontSize: 11.5, color: "#9CA3AF", marginBottom: 12, paddingLeft: 44 }}>By appointment</div>
          <button
            style={{ width: "100%", height: 32, background: "#D1FAE5", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, marginBottom: 8, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}
          >
            <I.Messages size={12} color="#065F46" /> Message
          </button>
          <button style={{ width: "100%", height: 32, background: "#E0F2FE", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={12} color="#0369A1" /> Request a meeting
          </button>
        </div>
      )}

      {/* Field Study — site contacts list (above schedule on this tab) */}
      {sub === "field-study" && (
        <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "18px 20px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Your Field Study Contacts</div>
          {FIELD_CONTACTS.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < FIELD_CONTACTS.length - 1 ? "1px solid #F3F4F6" : "none" }}>
              <Avatar person={p} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: "#9CA3AF" }}>{p.role}</div>
              </div>
            </div>
          ))}
          <button style={{ width: "100%", height: 32, background: "#E0F2FE", border: "none", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, marginTop: 12, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={12} color="#0369A1" /> Request a meeting
          </button>
        </div>
      )}

      {/* Today's Schedule — always visible, below contextual card on sub-tabs */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Today's Schedule</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {TODAY_SCHEDULE.map((s, i) => {
            const isClass = !!s.subject && s.subject !== "Lunch";
            const isFree  = !s.subject;
            return (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 10px", borderRadius: 10, background: isClass ? "#F7F5FF" : isFree ? "#FAFAF9" : "#FFFDF5" }}>
                <div style={{ width: 58, flexShrink: 0 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: isClass ? "#5B21B6" : "#9CA3AF" }}>{s.period}</div>
                  <div style={{ fontSize: 10, color: "#9CA3AF", lineHeight: 1.2, marginTop: 1 }}>{s.time.split(" – ")[0]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: isClass ? 600 : 400, color: isClass ? "#1E1B4B" : "#9CA3AF" }}>
                    {isFree ? "Free period" : s.subject}
                  </div>
                  {isClass && s.room && <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 1 }}>{s.room}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}

const TEACHER_SUB_TABS = [
  { id: "all",        label: "All"               },
  { id: "classroom",  label: "Classroom Teachers" },
  { id: "special-ed", label: "Special Education" },
  { id: "gate",       label: "GATE"              },
  { id: "field-study",label: "Field Study"       },
];

function TeachersAllOverviewTab({ onViewDetails }) {
  function ProviderRow({ person, secondaryLabel, metaLabel, tabTarget }) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#F7F5FF", borderRadius: 16, padding: "14px 18px" }}>
        <Avatar person={person} size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{person.name}</div>
          <div style={{ fontSize: 12.5, color: "#6B7280", marginTop: 2 }}>{secondaryLabel}</div>
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

  const SPED_PROVIDERS = [
    { id: "liu",   name: "Ms. Karen Liu",  role: "Special Education Coordinator", initials: "KL", avatarFrom: "#A78BFA", avatarTo: "#7C3AED" },
    { id: "bravo", name: "Mr. Tony Bravo", role: "Resource Specialist",            initials: "TB", avatarFrom: "#6EE7B7", avatarTo: "#059669" },
  ];
  const GATE_COORD_P = { id: "owens", name: "Dr. Patricia Owens", role: "GATE Coordinator", initials: "PO", avatarFrom: "#C4B5FD", avatarTo: "#7C3AED" };
  const FIELD_PROVIDERS = [
    { id: "osei",   name: "Dr. Amara Osei", role: "Field Supervisor", initials: "AO", avatarFrom: "#86EFAC", avatarTo: "#16A34A" },
    { id: "park-j", name: "Ms. Jenny Park", role: "School Liaison",   initials: "JP", avatarFrom: "#FCA5A5", avatarTo: "#E11D48" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* Classroom Teachers */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Classroom Teachers</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {TEACHER_DETAILS.map((t) => (
            <ProviderRow key={t.id} person={t} secondaryLabel={t.subject} metaLabel={"Next class · " + t.nextClass} tabTarget="classroom" />
          ))}
        </div>
      </div>

      {/* Special Education */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Special Education</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SPED_PROVIDERS.map((p) => (
            <ProviderRow key={p.id} person={p} secondaryLabel={p.role} tabTarget="special-ed" />
          ))}
        </div>
      </div>

      {/* GATE */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>GATE</div>
        <ProviderRow person={GATE_COORD_P} secondaryLabel={GATE_COORD_P.role} tabTarget="gate" />
      </div>

      {/* Field Study */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Field Study</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FIELD_PROVIDERS.map((p) => (
            <ProviderRow key={p.id} person={p} secondaryLabel={p.role} tabTarget="field-study" />
          ))}
        </div>
      </div>

    </div>
  );
}

function TeachersTab() {
  const [teacherSub, setTeacherSub] = React.useState("all");
  return (
    <div>
      {/* Pill sub-tab bar */}
      <div style={{ display: "inline-flex", background: "#EDEEF2", borderRadius: 12, padding: 3, marginBottom: 20 }}>
        {TEACHER_SUB_TABS.map((t) => {
          const active = teacherSub === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTeacherSub(t.id)}
              style={{
                height: 32, padding: "0 14px", border: "none", borderRadius: 9, cursor: "pointer",
                fontSize: 12.5, fontWeight: active ? 700 : 500,
                background: active ? "#EDE9FE" : "transparent",
                color: active ? "#5B21B6" : "#6B7280",
                transition: "background 120ms, color 120ms",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {teacherSub === "all" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>
          <TeachersAllOverviewTab onViewDetails={setTeacherSub} />
          <TeachersRightPanel sub="all" />
        </div>
      )}
      {teacherSub === "classroom" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
              Teachers · {TEACHER_DETAILS.length} people
            </div>
            {TEACHER_DETAILS.map((t) => <TeacherCard key={t.id} teacher={t} />)}
          </div>
          <TeachersRightPanel sub="all" />
        </div>
      )}
      {teacherSub === "special-ed" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>
          <SpecialEducationTab />
          <TeachersRightPanel sub="special-ed" />
        </div>
      )}
      {teacherSub === "gate" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>
          <GateTab />
          <TeachersRightPanel sub="gate" />
        </div>
      )}
      {teacherSub === "field-study" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>
          <FieldStudyTab />
          <TeachersRightPanel sub="field-study" />
        </div>
      )}
    </div>
  );
}

/* ─────────── Advisors tab ─────────── */

function AdvisorCard({ advisor }) {
  return (
    <div className="card" style={{ background: "#FFFFFF", borderRadius: 20, border: "none", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)", padding: "22px 24px" }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
        <Avatar person={advisor} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
            <span style={{ fontSize: 15.5, fontWeight: 700, color: "#1E1B4B" }}>{advisor.name}</span>
            {advisor.innerCircle && <I.Star size={13} color="#F59E0B" strokeWidth={0} style={{ fill: "#F59E0B", flexShrink: 0 }} />}
          </div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>{advisor.role}</div>
        </div>
      </div>

      {/* Next meeting */}
      <div style={{ background: "#F0F9FF", borderRadius: 14, padding: "13px 16px", marginBottom: 12 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Next Meeting</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "#E0F2FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Calendar size={17} color="#0369A1" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B" }}>{advisor.nextMeeting.date} · {advisor.nextMeeting.time}</div>
            <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>{advisor.nextMeeting.topic}</div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {advisor.credits !== undefined && (
        <div style={{ background: "#F7F5FF", borderRadius: 14, padding: "13px 16px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>Academic Plan</div>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#5B21B6" }}>{advisor.credits} / {advisor.creditsTotal} credits</span>
          </div>
          <div style={{ height: 7, borderRadius: 999, background: "#EDE9FE", overflow: "hidden" }}>
            <div style={{ height: "100%", width: (advisor.credits / advisor.creditsTotal * 100) + "%", background: "linear-gradient(90deg, #A78BFA, #7C3AED)", borderRadius: 999, transition: "width 600ms ease" }} />
          </div>
          <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 5 }}>Toward graduation</div>
        </div>
      )}
      {advisor.progressLabel !== undefined && (
        <div style={{ background: "#F7F5FF", borderRadius: 14, padding: "13px 16px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em" }}>{advisor.progressLabel}</div>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: "#5B21B6" }}>{advisor.progressValue} / {advisor.progressTotal}</span>
          </div>
          <div style={{ height: 7, borderRadius: 999, background: "#EDE9FE", overflow: "hidden" }}>
            <div style={{ height: "100%", width: (advisor.progressValue / advisor.progressTotal * 100) + "%", background: "linear-gradient(90deg, #A78BFA, #7C3AED)", borderRadius: 999 }} />
          </div>
          <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 5 }}>{advisor.progressNote}</div>
        </div>
      )}

      {/* Shared notes */}
      <div>
        <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 7 }}>Shared Notes</div>
        <textarea
          defaultValue={advisor.notesPlaceholder}
          rows={2}
          style={{ width: "100%", boxSizing: "border-box", resize: "none", fontSize: 12.5, color: "#6B7280", lineHeight: 1.5, border: "none", borderRadius: 10, padding: "8px 10px", background: "#F7F6FF", fontFamily: "var(--font-ui)", outline: "none", boxShadow: "inset 0 1px 3px rgba(99,102,241,0.08)" }}
          onFocus={(e) => { e.currentTarget.style.boxShadow = "inset 0 1px 3px rgba(99,102,241,0.08), 0 0 0 2px #C4B5FD"; }}
          onBlur={(e)  => { e.currentTarget.style.boxShadow = "inset 0 1px 3px rgba(99,102,241,0.08)"; }}
        />
      </div>
    </div>
  );
}

function AdvisorsRightPanel() {
  return (
    <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Upcoming Meetings</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {ADVISOR_DETAILS.map((a) => (
            <div key={a.id} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 12px", borderRadius: 12, background: "#F7F5FF" }}>
              <Avatar person={a} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1E1B4B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.name}</div>
                <div style={{ fontSize: 11.5, color: "#6B7280" }}>{a.nextMeeting.date}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Graduation Overview</div>
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "#1E1B4B", lineHeight: 1 }}>68</div>
          <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 3 }}>of 120 credits earned</div>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: "#EDE9FE", overflow: "hidden", marginBottom: 8 }}>
          <div style={{ height: "100%", width: "56.7%", background: "linear-gradient(90deg, #A78BFA, #7C3AED)", borderRadius: 999 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9CA3AF" }}>
          <span>Junior year</span>
          <span>52 credits left</span>
        </div>
      </div>
    </div>
  );
}

function AdvisorsTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
          Advisors · {ADVISOR_DETAILS.length} people
        </div>
        {ADVISOR_DETAILS.map((a) => <AdvisorCard key={a.id} advisor={a} />)}
      </div>
      <AdvisorsRightPanel />
    </div>
  );
}

/* ─────────── Coaches tab ─────────── */

function CoachCard({ coach }) {
  return (
    <div className="card" style={{ background: "#FFFFFF", borderRadius: 20, border: "none", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)", padding: "22px 24px" }}>
      <div style={{ display: "flex", gap: 13, alignItems: "flex-start", marginBottom: 18 }}>
        <Avatar person={coach} size={48} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15.5, fontWeight: 700, color: "#1E1B4B", marginBottom: 3 }}>{coach.name}</div>
          <div style={{ fontSize: 13, color: "#6B7280" }}>{coach.role} · {coach.sport}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        <div style={{ background: "#F0FDF4", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Next {coach.nextEvent}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>{coach.nextEventDate}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#6B7280" }}>
          <I.MapPin size={13} color="#C4B5FD" strokeWidth={1.8} />
          {coach.location}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ flex: 1, height: 32, background: "#D1FAE5", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 500, color: "#065F46", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 100ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}>
          <I.Messages size={11} color="#065F46" /> Message
        </button>
        <button style={{ flex: 1, height: 32, background: "#E0F2FE", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 500, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 100ms" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
          <I.Calendar size={11} color="#0369A1" /> Schedule
        </button>
      </div>
    </div>
  );
}

function CoachesRightPanel() {
  const patel  = COACH_DETAILS.find((c) => c.id === "coach-patel");
  const torres = COACH_DETAILS.find((c) => c.id === "coach-torres");

  const sessions = [
    { coach: patel,  type: "Next Practice",  datetime: "Mon, May 18 · 3:30 PM",   location: "South Athletic Field" },
    { coach: torres, type: "Next Training",   datetime: "Tues, May 19 · 4:00 PM",  location: "Weight Room, Gym B"   },
    { coach: patel,  type: "Next Practice",  datetime: "Wed, May 21 · 3:30 PM",   location: "South Athletic Field" },
  ];

  const feedback = [
    { coach: patel,  date: "May 14", note: "Great effort on defensive drills. Work on reaction time." },
    { coach: torres, date: "May 13", note: "Bench press form improving. Ready to increase weight next session." },
  ];

  const stats = [
    "4 sessions attended",
    "1 upcoming",
    "2 feedback notes",
  ];

  return (
    <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>

      {/* ── Upcoming Sessions ── */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Upcoming Sessions</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {sessions.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", borderRadius: 12, background: "#F0FDF4" }}>
              <Avatar person={s.coach} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1E1B4B" }}>{s.type}</div>
                <div style={{ fontSize: 11.5, color: "#6B7280", marginTop: 1 }}>{s.datetime}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                  <I.MapPin size={9} color="#C4B5FD" strokeWidth={1.8} style={{ flexShrink: 0 }} />
                  {s.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Feedback ── */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Recent Feedback</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {feedback.map((f, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 12, background: "#F7F5FF" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 7 }}>
                <Avatar person={f.coach} size={28} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1E1B4B" }}>{f.coach.name}</div>
                  <div style={{ fontSize: 11, color: "#9CA3AF" }}>{f.date}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.55, fontStyle: "italic" }}>&#8220;{f.note}&#8221;</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── My Stats This Week ── */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>My Stats This Week</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {stats.map((s, i) => (
            <span key={i} style={{ fontSize: 11.5, fontWeight: 600, color: "#065F46", background: "#D1FAE5", padding: "5px 11px", borderRadius: 999, whiteSpace: "nowrap" }}>{s}</span>
          ))}
        </div>
      </div>

    </div>
  );
}

function CoachesTab() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
          Coaches · {COACH_DETAILS.length} people
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {COACH_DETAILS.map((c) => <CoachCard key={c.id} coach={c} />)}
        </div>
      </div>
      <CoachesRightPanel />
    </div>
  );
}

/* ─────────── Support Staff tab — extended data ─────────── */

const SUPPORT_STAFF_ALL = [
  {
    id: "thompson",
    name: "Ms. Aisha Thompson",
    role: "Case Worker",
    subTab: "case-workers",
    serviceType: "Community Support",
    nextCheckIn: "June 5, 2026",
    location: "Admin Wing, Room 102",
    phone: "(555) 203-4200",
    email: "a.thompson@linkshs.edu",
    availability: "Wed & Fri AM · By appointment",
    initials: "AT", avatarFrom: "#94A3B8", avatarTo: "#475569", sensitive: true,
  },
  {
    id: "reyes",
    name: "Mr. David Reyes",
    role: "School Social Worker",
    subTab: "social-workers",
    serviceType: "Academic & Family Support",
    nextCheckIn: "June 10, 2026",
    location: "Social Services Office, Room 3",
    phone: "(555) 203-4300",
    email: "d.reyes@linkshs.edu",
    availability: "By appointment",
    initials: "DR", avatarFrom: "#A5B4FC", avatarTo: "#4F46E5", sensitive: true,
  },
  {
    id: "vega",
    name: "Ms. Carmen Vega",
    role: "DYFUS Advocate",
    subTab: "family-support",
    serviceType: "Family & Community Support",
    nextCheckIn: "June 18, 2026",
    location: "Student Services, Room 1",
    phone: "(555) 203-4400",
    email: "c.vega@linkshs.edu",
    availability: "By appointment",
    initials: "CV", avatarFrom: "#FCA5A5", avatarTo: "#E11D48", sensitive: true,
  },
  {
    id: "rivera",
    name: "Officer Carlos Rivera",
    role: "Parole Officer",
    subTab: "community-supervision",
    serviceType: "Community Support",
    nextCheckIn: "June 12, 2026",
    location: "Admin Office, Room 101",
    phone: "(555) 203-4100",
    email: "c.rivera@linkshs.edu",
    availability: "Monthly check-ins",
    initials: "CR", avatarFrom: "#94A3B8", avatarTo: "#334155", sensitive: true,
  },
];

const SUPPORT_SUB_TABS = [
  { id: "overview",               label: "All"                   },
  { id: "case-workers",           label: "Case Workers"          },
  { id: "social-workers",         label: "Social Workers"        },
  { id: "family-support",         label: "Family Support"        },
  { id: "community-supervision",  label: "Community Supervision" },
];

/* ─────────── Support Staff tab — components ─────────── */

function SupportConfidentialityBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 12, padding: "10px 14px", marginBottom: 20 }}>
      <I.Lock size={13} color="#92400E" strokeWidth={2} style={{ flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: "#78350F", lineHeight: 1.5 }}>Your support staff information is strictly confidential · Highest privacy protection · Read only</span>
    </div>
  );
}

function SupportEmptyState({ label }) {
  return (
    <div className="card" style={{ padding: "52px 24px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}>
        <I.Lock size={22} color="#94A3B8" />
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1E1B4B" }}>No {label} assigned</div>
      <div style={{ fontSize: 13, color: "#9CA3AF", maxWidth: 280, lineHeight: 1.55 }}>
        Your {label.toLowerCase()} assignment is managed by your school administrator.
      </div>
    </div>
  );
}

function SupportDetailCard({ person }) {
  const [officeOpen, setOfficeOpen] = React.useState(false);
  const [parentOpen, setParentOpen] = React.useState(false);
  const [schedOpen,  setSchedOpen]  = React.useState(false);
  const [toast,      setToast]      = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const isFamilySupport = person.subTab === "family-support";
  const useOffice = person.subTab === "case-workers" || person.subTab === "community-supervision";
  const useParent = person.subTab === "social-workers" || person.subTab === "family-support";

  return (
    <React.Fragment>
      {officeOpen && <SchoolOfficeModal person={person} onClose={() => setOfficeOpen(false)} onSend={() => setToast("office")} />}
      {parentOpen && <ParentRouteModal  person={person} onClose={() => setParentOpen(false)} onSend={() => setToast("parent")} />}
      {schedOpen  && <ScheduleModal     person={person} onClose={() => setSchedOpen(false)} />}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>{toast === "parent" ? "Sent to your parents ✓" : "Request sent to school office ✓"}</span>
        </div>
      )}
      <div className="card" style={{ background: "#FFFFFF", borderRadius: 20, border: "none", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)", padding: "22px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
          <Avatar person={person} size={52} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700, color: "#1E1B4B", marginBottom: 3 }}>{person.name}</div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 8, display: "flex", alignItems: "center", gap: 5 }}>{person.role}{person.role === "DYFUS Advocate" && <InfoTooltip text="Department of Youth and Family Unified Services — a team that connects students and families with community resources and support." />}</div>
            <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, background: "#F1F5F9", color: "#475569", fontSize: 11, fontWeight: 600, letterSpacing: "0.02em" }}>
              Support Staff
            </span>
          </div>
        </div>

        {/* Contact & schedule grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "11px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Location</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", lineHeight: 1.35 }}>{person.location}</div>
          </div>
          <div style={{ background: "#F8FAFC", borderRadius: 12, padding: "11px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Availability</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B", lineHeight: 1.35 }}>{person.availability}</div>
          </div>
          <div style={{ background: "#F0F9FF", borderRadius: 12, padding: "11px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Phone</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0369A1" }}>{person.phone}</div>
          </div>
          <div style={{ background: "#F0F9FF", borderRadius: 12, padding: "11px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Email</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#0369A1", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.email}</div>
          </div>
          <div style={{ background: "#F3F4F8", borderRadius: 12, padding: "11px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Service Type</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "#1E1B4B" }}>{person.serviceType}</div>
          </div>
          <div style={{ background: "#EFF6FF", borderRadius: 12, padding: "11px 14px" }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>Next Check-in</div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1D4ED8" }}>{person.nextCheckIn}</div>
          </div>
        </div>

        {/* Family Support special note */}
        {isFamilySupport && (
          <div style={{ display: "flex", gap: 8, alignItems: "flex-start", padding: "10px 13px", borderRadius: 10, background: "#F5F3FF", border: "1px solid #DDD6FE", marginBottom: 14 }}>
            <I.Lock size={13} color="#A78BFA" style={{ flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.5 }}>
              Family support records are subject to the highest access controls.
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 8 }}>
          {useOffice && (
            <button onClick={() => setOfficeOpen(true)} style={{ flex: 1, height: 32, background: "#F1F5F9", border: "none", borderRadius: 10, fontSize: 11, fontWeight: 600, color: "#334155", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 100ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E2E8F0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}>
              <I.School size={11} color="#334155" /> Request through school office
            </button>
          )}
          {useParent && (
            <button onClick={() => setParentOpen(true)} style={{ flex: 1, height: 32, background: "#F1F5F9", border: "none", borderRadius: 10, fontSize: 11, fontWeight: 600, color: "#334155", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 100ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#E2E8F0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}>
              <I.UsersRound size={11} color="#334155" /> Contact through parent
            </button>
          )}
          <button onClick={() => setSchedOpen(true)} style={{ flex: 1, height: 32, background: "#E0F2FE", border: "none", borderRadius: 10, fontSize: 12, fontWeight: 500, color: "#0369A1", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5, transition: "background 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#BAE6FD"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#E0F2FE"; }}>
            <I.Calendar size={11} color="#0369A1" /> Schedule
          </button>
        </div>

      </div>
    </React.Fragment>
  );
}

function SupportOverviewCard({ person, onViewDetails }) {
  return (
    <div className="card" style={{ background: "#FFFFFF", borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 12px rgba(99,102,241,0.06), 0 1px 3px rgba(0,0,0,0.04)", display: "flex", gap: 14, alignItems: "center" }}>
      <Avatar person={person} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1E1B4B", marginBottom: 2 }}>{person.name}</div>
        <div style={{ fontSize: 12.5, color: "#6B7280", marginBottom: 6 }}>{person.role}</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "#9CA3AF" }}>Next check-in:</span>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: "#1D4ED8" }}>{person.nextCheckIn}</span>
        </div>
      </div>
      <button
        onClick={() => onViewDetails(person.subTab)}
        style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 4, height: 30, padding: "0 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", background: "transparent", color: "#475569", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "border-color 120ms, color 120ms, background 120ms" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.color = "#5B21B6"; e.currentTarget.style.background = "#F5F3FF"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E2E8F0"; e.currentTarget.style.color = "#475569"; e.currentTarget.style.background = "transparent"; }}
      >
        View details <I.ChevronRight size={11} color="currentColor" />
      </button>
    </div>
  );
}

function SupportRightPanel() {
  return (
    <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Your Support Team</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {SUPPORT_STAFF_ALL.map((person) => (
            <div key={person.id} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Avatar person={person} size={34} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1E1B4B", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{person.name}</div>
                <div style={{ fontSize: 11, color: "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{person.role}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #F1F5F9" }}>
          <div style={{ display: "flex", gap: 7, alignItems: "flex-start" }}>
            <I.Lock size={11} color="#94A3B8" style={{ flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 11, color: "#9CA3AF", lineHeight: 1.5 }}>
              Your support team information is private. Only shared with authorized personnel.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FamilySupportDocModal({ doc, onClose }) {
  return (
    <div
      style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.38)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400, backdropFilter: "blur(2px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ background: "var(--paper)", borderRadius: 24, padding: "28px 28px 24px", width: 480, maxWidth: "calc(100vw - 48px)", boxShadow: "var(--shadow-card-lg)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 30, height: 30, borderRadius: 6, border: "none", background: "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#FFFBEB"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
          <I.X size={16} color="var(--stone)" />
        </button>

        {/* Title */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, paddingRight: 32 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.FileText size={20} color="#B45309" />
          </div>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0 }}>{doc.title}</h2>
            <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 3 }}>Shared by {doc.sharedBy}</div>
          </div>
        </div>

        {/* Type chip */}
        <div style={{ marginBottom: 14 }}>
          <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: 999, background: "#FEF3C7", color: "#B45309", fontSize: 11, fontWeight: 700 }}>{doc.type}</span>
        </div>

        {/* Info note */}
        <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#FFFBEB", borderRadius: 10, marginBottom: 18 }}>
          <I.Info size={13} color="#B45309" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>Ms. Vega shared this to help you and your family access the support you deserve.</span>
        </div>

        {/* Document tile */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "#FFFBEB", borderRadius: 12, marginBottom: 14 }}>
          <div style={{ display: "inline-flex", alignItems: "center", padding: "3px 8px", borderRadius: 6, background: "#FEF3C7", color: "#B45309", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{doc.fileType}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>{doc.title}</div>
            <div style={{ fontSize: 11.5, color: "#9CA3AF", marginTop: 2 }}>Added {doc.dateAdded}</div>
          </div>
        </div>

        {/* Preview placeholder */}
        <div style={{ height: 110, borderRadius: 12, background: "#F3F4F6", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
          <I.FileText size={28} color="#D1D5DB" />
          <span style={{ fontSize: 12, color: "#9CA3AF" }}>Preview not available in this view</span>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button onClick={onClose} className="btn" style={{ fontSize: 13 }}>Cancel</button>
          <button className="btn btn-primary" style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.FileText size={13} color="currentColor" /> Open full document
          </button>
        </div>
      </div>
    </div>
  );
}

function SupportStaffTab() {
  const [supportSub, setSupportSub] = React.useState("overview");
  const [familyDocModal, setFamilyDocModal] = React.useState(null);
  const [calModal, setCalModal] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const staffForTab = SUPPORT_STAFF_ALL.filter((p) => p.subTab === supportSub);

  const TAB_LABELS = {
    "overview":               "All",
    "case-workers":           "Case Workers",
    "social-workers":         "Social Workers",
    "family-support":         "Family Support",
    "community-supervision":  "Community Supervision",
  };

  const FAMILY_DOCS = [
    { title: "Know Your Rights",                    type: "Resource",  sharedBy: "Ms. Vega", fileType: "PDF", dateAdded: "Apr 14, 2026" },
    { title: "Community Support Services Near You", type: "Directory", sharedBy: "Ms. Vega", fileType: "PDF", dateAdded: "Mar 28, 2026" },
  ];

  return (
    <div>
      {familyDocModal && (
        <FamilySupportDocModal doc={familyDocModal} onClose={() => setFamilyDocModal(null)} />
      )}
      {calModal && (
        <SpEdCalendarModal event={calModal} onClose={() => setCalModal(null)} onAddCalendar={(cal) => setToast(`Added to ${cal} ✓`)} />
      )}
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "#1E1B4B", color: "#fff", borderRadius: 12, padding: "12px 18px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.18)", whiteSpace: "nowrap" }}>
          <I.Check size={14} color="#A7F3D0" strokeWidth={2.5} /> {toast}
        </div>
      )}

      {/* Internal sub-tab bar */}
      <div style={{ display: "inline-flex", background: "#EDEEF2", borderRadius: 12, padding: 3, marginBottom: 20 }}>
        {SUPPORT_SUB_TABS.map(({ id, label }) => {
          const active = supportSub === id;
          return (
            <button
              key={id}
              onClick={() => setSupportSub(id)}
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
              {id === "community-supervision"
                ? <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>{label}<InfoTooltip text="This tab uses neutral language. Your officer is part of your support network." /></span>
                : label}
            </button>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>

        {/* Left: banner + tab content */}
        <div>
          <SupportConfidentialityBanner />
          {supportSub === "overview" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 12px rgba(99,102,241,0.06), 0 1px 3px rgba(0,0,0,0.04)", fontSize: 14, color: "#475569", lineHeight: 1.65 }}>
                Your support team is here to help you navigate challenges inside and outside of school.
              </div>
              {SUPPORT_STAFF_ALL.map((person) => (
                <SupportOverviewCard key={person.id} person={person} onViewDetails={setSupportSub} />
              ))}
            </div>
          ) : staffForTab.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                {TAB_LABELS[supportSub]} · {staffForTab.length} {staffForTab.length === 1 ? "person" : "people"}
              </div>
              {staffForTab.map((p) => <SupportDetailCard key={p.id} person={p} />)}

              {/* ── Social Workers extra sections ── */}
              {supportSub === "social-workers" && (
                <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Scheduled Meetings</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#F7F5FF", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 11, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <I.Calendar size={18} color="#5B21B6" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>June 10, 2026 · 11:00 AM</div>
                      <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Next check-in · Social Services Office, Room 3</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCalModal({ name: "Check-in with Mr. Reyes", recurrence: "One-time", time: "11:00 AM", sessionDays: [] })}
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 16px", background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", transition: "background 100ms" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}
                  >
                    <I.Calendar size={13} color="#065F46" /> Add to calendar
                  </button>
                </div>
              )}

              {/* ── Family Support extra sections ── */}
              {supportSub === "family-support" && (
                <React.Fragment>
                  {/* Scheduled Meetings */}
                  <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Scheduled Meetings</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, background: "#F7F5FF", borderRadius: 14, padding: "14px 16px", marginBottom: 14 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 11, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <I.Calendar size={18} color="#5B21B6" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>June 18, 2026 · 10:00 AM</div>
                        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Next meeting · Student Services, Room 1</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setCalModal({ name: "Meeting with Ms. Vega", recurrence: "One-time", time: "10:00 AM", sessionDays: [] })}
                      style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 34, padding: "0 16px", background: "#D1FAE5", border: "1px solid #6EE7B7", borderRadius: 9, fontSize: 12, fontWeight: 600, color: "#065F46", cursor: "pointer", transition: "background 100ms" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#A7F3D0"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#D1FAE5"; }}
                    >
                      <I.Calendar size={13} color="#065F46" /> Add to calendar
                    </button>
                  </div>
                  {/* Emergency Contacts */}
                  <div style={{ background: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)", borderRadius: 20, padding: "20px 24px", boxShadow: "0 2px 18px rgba(245,158,11,0.08), 0 1px 4px rgba(0,0,0,0.04)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 9, background: "rgba(245,158,11,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <I.Heart size={14} color="#B45309" strokeWidth={0} style={{ fill: "#B45309" }} />
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#92400E" }}>If you need immediate support</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "rgba(255,255,255,0.65)", borderRadius: 12 }}>
                        <I.Messages size={14} color="#B45309" strokeWidth={1.8} style={{ flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#78350F" }}>Crisis Text Line</div>
                          <div style={{ fontSize: 12, color: "#92400E", marginTop: 2 }}>Text <strong>HOME</strong> to <strong>741741</strong></div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "rgba(255,255,255,0.65)", borderRadius: 12 }}>
                        <I.Phone size={14} color="#B45309" strokeWidth={1.8} style={{ flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#78350F" }}>School Emergency Contact</div>
                          <div style={{ fontSize: 12, color: "#92400E", marginTop: 2 }}>(555) 203-0000 · Available 24/7</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shared with you */}
                  <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Shared with you</div>
                    <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#FFFBEB", borderRadius: 10, marginBottom: 14 }}>
                      <I.Info size={13} color="#B45309" style={{ flexShrink: 0, marginTop: 1 }} />
                      <span style={{ fontSize: 12, color: "#92400E", lineHeight: 1.5 }}>Ms. Vega shared these to help you and your family access the support you deserve.</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {FAMILY_DOCS.map((item, i) => (
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
                          <button onClick={() => setFamilyDocModal(item)} style={{ background: "none", border: "none", padding: 0, fontSize: 12, fontWeight: 600, color: "#B45309", cursor: "pointer", whiteSpace: "nowrap" }}
                            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = "underline"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = "none"; }}>
                            View →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              )}

              {/* ── Community Supervision commitments ── */}
              {supportSub === "community-supervision" && (
                <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "22px 24px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Your Commitments</div>
                  <div style={{ display: "flex", gap: 8, padding: "10px 12px", background: "#F7F5FF", borderRadius: 10, marginBottom: 14 }}>
                    <I.Info size={13} color="#9CA3AF" style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>Staying on track with these commitments is a sign of strength. Your team is here to support you.</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                    {/* Monthly check-in — scheduled */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "#F0FDF4", borderRadius: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 999, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <I.Check size={12} color="#065F46" strokeWidth={2.5} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>Monthly check-in with Officer Rivera</div>
                        <div style={{ fontSize: 11.5, color: "#065F46", marginTop: 2, fontWeight: 600 }}>✓ Scheduled</div>
                      </div>
                    </div>

                    {/* Attendance report — due */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 16px", background: "#FFFBEB", borderRadius: 12 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 999, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <I.Clock size={12} color="#92400E" />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>Submit school attendance report</div>
                        <div style={{ fontSize: 11.5, color: "#92400E", marginTop: 2 }}>Due June 1</div>
                      </div>
                    </div>

                    {/* Community service hours — progress bar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "13px 16px", background: "#F7F5FF", borderRadius: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 999, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <I.Star size={12} color="#5B21B6" strokeWidth={2} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "#1E1B4B" }}>Complete community service hours</div>
                          <div style={{ fontSize: 11.5, color: "#5B21B6", marginTop: 2, fontWeight: 600 }}>12 / 20 completed</div>
                        </div>
                      </div>
                      <div style={{ height: 7, borderRadius: 999, background: "#DDD6FE", overflow: "hidden", marginLeft: 34 }}>
                        <div style={{ height: "100%", width: "60%", background: "linear-gradient(90deg, #A78BFA, #7C3AED)", borderRadius: 999 }} />
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>
          ) : (
            <SupportEmptyState label={TAB_LABELS[supportSub]} />
          )}
        </div>

        {/* Right panel */}
        <SupportRightPanel />

      </div>
    </div>
  );
}

/* ─────────── Toolbar components ─────────── */

function TeamTabs({ sub }) {
  return (
    <div style={{ display: "flex", gap: 4, borderBottom: "2px solid #EEECF7", marginBottom: 28, overflowX: "auto" }}>
      {TEAM_TABS.map(({ id, label, icon }) => {
        const isActive = sub === id;
        const Ic = I[icon];
        return (
          <a key={id} href={"#/my-team/" + id} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "11px 16px", textDecoration: "none", color: isActive ? "#5B21B6" : "#9CA3AF", fontSize: 13, fontWeight: isActive ? 700 : 500, borderBottom: isActive ? "2.5px solid #A78BFA" : "2px solid transparent", marginBottom: -1, whiteSpace: "nowrap", transition: "color 120ms" }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "#4B5563"; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "#9CA3AF"; }}>
            <Ic size={14} color={isActive ? "#A78BFA" : "#9CA3AF"} />
            {label}
          </a>
        );
      })}
    </div>
  );
}

window.TeamTabs = TeamTabs;

function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div style={{ display: "inline-flex", border: "none", borderRadius: 12, background: "#EEEEF6", flexShrink: 0, padding: 3, boxShadow: "0 1px 3px rgba(99,102,241,0.1)" }}>
      {VIEW_MODES.map(({ id, label, icon }, i) => {
        const active = viewMode === id;
        const Ic = I[icon];
        return (
          <button key={id} onClick={() => setViewMode(id)} aria-pressed={active} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", border: "none", borderRight: "none", borderRadius: 9, background: active ? "#FFFFFF" : "transparent", color: active ? "#5B21B6" : "#9CA3AF", fontSize: 12.5, fontWeight: active ? 600 : 500, cursor: "pointer", transition: "background 120ms, color 120ms", boxShadow: active ? "0 1px 4px rgba(99,102,241,0.14)" : "none" }}
            onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.55)"; }}
            onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}>
            <Ic size={13} color={active ? "#5B21B6" : "#9CA3AF"} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

const CHIP_TO_HREF = {
  "All":           "#/my-team/overview",
  "Teachers":      "#/my-team/teachers",
  "Advisors":      "#/my-team/advisors",
  "Coaches":       "#/my-team/coaches",
  "Support Staff": "#/my-team/support",
  "Doctors":    "#/my-team/doctors",
  "Counselors": "#/my-team/counselors",
};

function FilterRow({ activeFilter, activeCustomFilter, customFilters, onSetCustomFilter, onRemoveFilter, onOpenAddFilter }) {
  return (
    <div role="group" aria-label="Filter by role" style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>

      {/* Built-in chips */}
      {FILTER_CHIPS.map((label) => {
        const active = !activeCustomFilter && activeFilter === label;
        return (
          <button
            key={label}
            onClick={() => { onSetCustomFilter(null); window.location.hash = CHIP_TO_HREF[label]; }}
            aria-pressed={active}
            style={{ display: "inline-flex", alignItems: "center", height: 30, padding: "0 12px", borderRadius: 12, border: "none", background: active ? "#EDE9FE" : "#EEEEF6", color: active ? "#5B21B6" : "#6B7280", fontSize: 12, fontWeight: active ? 700 : 500, cursor: "pointer", transition: "background 100ms, color 100ms", whiteSpace: "nowrap", boxShadow: "none" }}
            onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = "#E5E4F0"; e.currentTarget.style.color = "#4B5563"; } }}
            onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "#EEEEF6"; e.currentTarget.style.color = "#6B7280"; } }}
          >
            {label}
          </button>
        );
      })}

      {/* Custom filter chips */}
      {customFilters.map((cf) => {
        const active = activeCustomFilter === cf.id;
        return (
          <div
            key={cf.id}
            style={{ display: "inline-flex", alignItems: "center", height: 30, borderRadius: 12, border: "none", background: active ? "#EDE9FE" : "#EEEEF6", overflow: "hidden", boxShadow: "none", transition: "background 100ms" }}
          >
            {/* Label click — activate/deactivate */}
            <button
              onClick={() => { onSetCustomFilter(active ? null : cf.id); }}
              aria-pressed={active}
              style={{ display: "inline-flex", alignItems: "center", height: "100%", padding: "0 4px 0 12px", border: "none", background: "transparent", color: active ? "#5B21B6" : "#6B7280", fontSize: 12, fontWeight: active ? 700 : 500, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {cf.label}
            </button>
            {/* Remove × */}
            <button
              onClick={(e) => { e.stopPropagation(); onRemoveFilter(cf.id); }}
              aria-label={`Remove ${cf.label} filter`}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 22, height: "100%", border: "none", background: "transparent", cursor: "pointer", color: active ? "#A78BFA" : "var(--silver)", paddingRight: 2, transition: "color 100ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = active ? "#A78BFA" : "var(--silver)"; }}
            >
              <I.X size={10} color="currentColor" />
            </button>
          </div>
        );
      })}

      {/* Add Filter button */}
      <button
        onClick={onOpenAddFilter}
        style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 30, padding: "0 12px", borderRadius: 12, border: "1.5px dashed #C4B5FD", background: "transparent", color: "#A78BFA", fontSize: 12, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", transition: "border-color 100ms, color 100ms" }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.color = "#7C3AED"; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C4B5FD"; e.currentTarget.style.color = "#A78BFA"; }}
      >
        <I.Plus size={11} color="currentColor" /> Add Filter
      </button>

    </div>
  );
}

/* ─────────── Page root ─────────── */

function MyTeamPage({ segments }) {
  const sub = segments[1] || "overview";
  const [viewMode,          setViewMode]          = React.useState("grid");
  const [showRoles,         setShowRoles]         = React.useState(true);
  const [customFilters,     setCustomFilters]     = React.useState([]);
  const [activeCustomId,    setActiveCustomId]    = React.useState(null);
  const [addFilterOpen,        setAddFilterOpen]        = React.useState(false);
  const [filterDropdownOpen,   setFilterDropdownOpen]   = React.useState(false);
  const [hoveredDropdownId,    setHoveredDropdownId]    = React.useState(null);
  const [pendingDeleteId,      setPendingDeleteId]      = React.useState(null);
  const [filterToast,          setFilterToast]          = React.useState(null);

  React.useEffect(() => {
    if (!filterToast) return;
    const t = setTimeout(() => setFilterToast(null), 3000);
    return () => clearTimeout(t);
  }, [filterToast]);

  // Reset pending-delete confirmation whenever the dropdown closes
  React.useEffect(() => {
    if (!filterDropdownOpen) setPendingDeleteId(null);
  }, [filterDropdownOpen]);

  // Derive built-in chip from URL segment
  const SUB_TO_CHIP = {
    overview:   "All",
    teachers:   "Teachers",
    advisors:   "Advisors",
    coaches:    "Coaches",
    support:    "Support Staff",
    doctors:    "Doctors",
    counselors: "Counselors",
  };
  const activeFilter = SUB_TO_CHIP[sub] || "All";
  const isOverview   = sub === "overview";

  // When a custom filter is activated, go to overview URL so built-in chips reset
  const handleSetCustomFilter = (id) => {
    setActiveCustomId(id);
    if (id) window.location.hash = "#/my-team/overview";
  };

  const handleCreateFilter = (filter) => {
    setCustomFilters((prev) => [...prev, filter]);
    setActiveCustomId(filter.id);
    window.location.hash = "#/my-team/overview";
    setFilterToast(`Filter "${filter.label}" created ✓`);
  };

  const handleRemoveFilter = (id) => {
    setCustomFilters((prev) => prev.filter((f) => f.id !== id));
    if (activeCustomId === id) setActiveCustomId(null);
  };

  const activeFilterObj = customFilters.find((f) => f.id === activeCustomId) || null;

  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto", background: "linear-gradient(160deg, #F3F4F8 0%, #F7F4FD 65%, #F4F7FB 100%)", minHeight: "100vh" }}>

      {addFilterOpen && (
        <AddFilterModal
          onClose={() => setAddFilterOpen(false)}
          onCreate={handleCreateFilter}
        />
      )}

      {filterToast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap", pointerEvents: "none" }}>
          <I.Check size={14} color="#10B981" />
          <span>{filterToast}</span>
        </div>
      )}

      <Breadcrumbs segments={segments} />

      {/* Header */}
      <div style={{ marginBottom: 18 }}>
        <h1 className="t-h1" style={{ margin: "0 0 5px", fontSize: 32, fontWeight: 800, color: "#1E1B4B" }}>
          {sub === "teachers" ? "Teachers"
           : sub === "advisors" ? "Advisors"
           : sub === "coaches"  ? "Coaches"
           : sub === "support"  ? "Support Staff"
           : "My Team"}
        </h1>
        <p className="t-body" style={{ margin: 0, color: "#7C7C8A", fontSize: 15 }}>
          {sub === "teachers" ? "Your instructors, Alex."
           : sub === "advisors" ? "Your guides, Alex."
           : sub === "coaches"  ? "Your coaches, Alex."
           : sub === "support"  ? "Your support network, Alex."
           : "Your team, Alex."}
        </p>
      </div>

      {/* Persistent tab bar */}
      <TeamTabs sub={sub} />

      {/* Overview toolbar — search, filter dropdown, add filter, view toggle, show roles */}
      {isOverview && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>

          {/* Search */}
          <div role="search" aria-label="Search your team" style={{ display: "flex", alignItems: "center", gap: 8, width: 320, height: 38, padding: "0 14px", background: "var(--paper)", borderRadius: 999, border: "1px solid var(--mist)", flexShrink: 0, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 10px -4px rgba(15,23,42,0.05)" }}>
            <I.Search size={14} color="var(--silver)" />
            <span style={{ fontSize: 13, color: "var(--silver)", userSelect: "none", pointerEvents: "none" }}>Search your team…</span>
          </div>
          <ShowRolesToggle showRoles={showRoles} setShowRoles={setShowRoles} />

          {/* Filter dropdown */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <button
              onClick={() => setFilterDropdownOpen((v) => !v)}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6, height: 38, padding: "0 14px",
                borderRadius: 999, border: "1px solid var(--mist)", cursor: "pointer",
                background: activeFilter !== "All" ? "#EDE9FE" : "var(--paper)",
                color: activeFilter !== "All" ? "#5B21B6" : "#6B7280",
                fontSize: 13, fontWeight: activeFilter !== "All" ? 700 : 500,
                boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
                transition: "background 120ms, color 120ms",
              }}
            >
              <I.Filter size={13} color="currentColor" />
              {activeFilter !== "All" ? activeFilter : "Filter"}
              <I.ChevronDown size={12} color="currentColor" style={{ opacity: 0.6 }} />
            </button>

            {filterDropdownOpen && (
              <>
                {/* Click-away backdrop */}
                <div onClick={() => setFilterDropdownOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 199 }} />
                {/* Dropdown menu */}
                <div onClick={() => setPendingDeleteId(null)} style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 200, background: "#FFFFFF", borderRadius: 14, boxShadow: "0 4px 28px rgba(0,0,0,0.11), 0 1px 6px rgba(0,0,0,0.06)", minWidth: 200, padding: "6px 0", overflow: "hidden" }}>
                  {FILTER_CHIPS.map((label) => {
                    const isActive = activeFilter === label && !activeCustomId;
                    return (
                      <button
                        key={label}
                        onClick={() => { setFilterDropdownOpen(false); handleSetCustomFilter(null); window.location.hash = CHIP_TO_HREF[label]; }}
                        style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "9px 16px", border: "none", background: isActive ? "#EDE9FE" : "transparent", color: isActive ? "#5B21B6" : "#374151", fontSize: 13, fontWeight: isActive ? 700 : 400, cursor: "pointer", transition: "background 80ms" }}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "#F5F3FF"; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                      >
                        {isActive && <I.Check size={12} color="#7C3AED" strokeWidth={2.5} />}
                        {!isActive && <span style={{ width: 12, flexShrink: 0 }} />}
                        {label}
                      </button>
                    );
                  })}

                  {/* Saved custom filters */}
                  {customFilters.length > 0 && (
                    <>
                      <div style={{ height: 1, background: "var(--mist)", margin: "6px 0" }} />
                      <div style={{ padding: "4px 16px 6px", fontSize: 10, fontWeight: 700, color: "var(--silver)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                        My Filters
                      </div>
                      {customFilters.map((cf) => {
                        const isActive  = activeCustomId === cf.id;
                        const isHov     = hoveredDropdownId === cf.id;
                        const isPending = pendingDeleteId === cf.id;
                        return (
                          <div
                            key={cf.id}
                            style={{ display: "flex", alignItems: "center", position: "relative", background: isPending ? "transparent" : isActive ? "#EDE9FE" : isHov ? "#F5F3FF" : "transparent", transition: "background 80ms" }}
                            onMouseEnter={() => setHoveredDropdownId(cf.id)}
                            onMouseLeave={() => setHoveredDropdownId(null)}
                          >
                            {isPending ? (
                              /* ── Inline confirmation strip ── */
                              <div
                                onClick={(e) => e.stopPropagation()}
                                style={{ display: "flex", alignItems: "center", gap: 4, flex: 1, margin: "3px 6px", padding: "6px 6px 6px 12px", background: "#FFFFFF", borderRadius: 8, boxShadow: "0 1px 6px rgba(0,0,0,0.10), 0 0 0 1px #FEE2E2" }}
                              >
                                <span style={{ flex: 1, fontSize: 12.5, fontWeight: 500, color: "#111827", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  Delete &ldquo;{cf.label}&rdquo;?
                                </span>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setPendingDeleteId(null); }}
                                  style={{ fontSize: 12, fontWeight: 500, color: "#6B7280", background: "none", border: "none", cursor: "pointer", padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap", transition: "color 100ms" }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = "#111827"; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; }}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleRemoveFilter(cf.id); setPendingDeleteId(null); }}
                                  style={{ fontSize: 12, fontWeight: 600, color: "#EF4444", background: "none", border: "none", cursor: "pointer", padding: "3px 8px", borderRadius: 6, whiteSpace: "nowrap", transition: "color 100ms" }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = "#DC2626"; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = "#EF4444"; }}
                                >
                                  Delete
                                </button>
                              </div>
                            ) : (
                              <>
                                {/* Label — activates / deactivates, never deletes */}
                                <button
                                  onClick={() => { setFilterDropdownOpen(false); handleSetCustomFilter(isActive ? null : cf.id); }}
                                  style={{ display: "flex", alignItems: "center", gap: 9, flex: 1, textAlign: "left", padding: "9px 4px 9px 16px", border: "none", background: "transparent", color: isActive ? "#5B21B6" : "#374151", fontSize: 13, fontWeight: isActive ? 700 : 400, cursor: "pointer" }}
                                >
                                  {isActive && <I.Check size={12} color="#7C3AED" strokeWidth={2.5} />}
                                  {!isActive && <span style={{ width: 12, flexShrink: 0 }} />}
                                  {cf.label}
                                </button>
                                {/* Trash — visible on row hover, opens confirmation */}
                                <button
                                  onClick={(e) => { e.stopPropagation(); setPendingDeleteId(cf.id); }}
                                  aria-label={`Delete ${cf.label} filter`}
                                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 36, border: "none", background: "transparent", cursor: "pointer", color: "var(--silver)", opacity: isHov ? 1 : 0, transition: "opacity 120ms, color 120ms", paddingRight: 8, flexShrink: 0 }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = "#EF4444"; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = "var(--silver)"; }}
                                >
                                  <I.Trash size={12} color="currentColor" />
                                </button>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
              </>
            )}
          </div>

          {/* + Add Filter */}
          <button
            onClick={() => setAddFilterOpen(true)}
            style={{ display: "inline-flex", alignItems: "center", gap: 5, height: 38, padding: "0 14px", borderRadius: 999, border: "1.5px dashed #C4B5FD", background: "transparent", color: "#A78BFA", fontSize: 13, fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "border-color 100ms, color 100ms" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#A78BFA"; e.currentTarget.style.color = "#7C3AED"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#C4B5FD"; e.currentTarget.style.color = "#A78BFA"; }}
          >
            <I.Plus size={11} color="currentColor" /> Add Filter
          </button>

          <div style={{ flex: 1 }} />
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      )}

      {/* Non-overview toolbar — search + show roles */}
      {!isOverview && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <div role="search" aria-label="Search your team" style={{ display: "flex", alignItems: "center", gap: 8, width: 320, height: 38, padding: "0 14px", background: "var(--paper)", borderRadius: 999, border: "1px solid var(--mist)", flexShrink: 0, boxShadow: "0 1px 2px rgba(15,23,42,0.04), 0 4px 10px -4px rgba(15,23,42,0.05)" }}>
            <I.Search size={14} color="var(--silver)" />
            <span style={{ fontSize: 13, color: "var(--silver)", userSelect: "none", pointerEvents: "none" }}>Search your team…</span>
          </div>
          <ShowRolesToggle showRoles={showRoles} setShowRoles={setShowRoles} />
        </div>
      )}

      {/* Content */}
      {sub === "teachers" ? <TeachersTab />
       : sub === "advisors" ? <AdvisorsTab />
       : sub === "coaches"  ? <CoachesTab />
       : sub === "support"  ? <SupportStaffTab showRoles={showRoles} />
       : activeFilterObj    ? <CustomFilterContent filter={activeFilterObj} showRoles={showRoles} />
       :                      <OverviewContent showRoles={showRoles} viewMode={viewMode} />
      }

    </div>
  );
}

/* ─────────── Route registration ─────────── */
window["renderRoute_my-team"] = ({ segments }) => {
  const sub = segments[1];
  if (sub === "doctors")    return window.MyDoctorsPage    ? <window.MyDoctorsPage    segments={segments} /> : null;
  if (sub === "counselors") return window.MyCounselorsPage ? <window.MyCounselorsPage segments={segments} /> : null;
  if (sub === "home-team")  return window.MyHomeTeamPage   ? <window.MyHomeTeamPage   segments={segments} /> : null;
  if (sub === "resources")  return window.MyResourcesPage  ? <window.MyResourcesPage  segments={segments} /> : null;
  return <MyTeamPage segments={segments} />;
};

})();

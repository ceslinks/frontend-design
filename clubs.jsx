// LINKS — My Activities · Clubs & Organizations
// Route: #/my-activities/clubs

(function () {

/* ========== Local helpers ========== */
function CL_Pill({ tone = "neutral", children, style }) {
  const tones = {
    neutral: { bg: "var(--bone)", fg: "var(--stone)" },
    purple:  { bg: "var(--student-soft)", fg: "var(--student-deep)" },
    success: { bg: "#DCFCE7", fg: "#15803D" },
    warning: { bg: "#FEF3C7", fg: "#A16207" },
    danger:  { bg: "#FEE2E2", fg: "#B91C1C" },
    info:    { bg: "#DBEAFE", fg: "#1D4ED8" },
    soft:    { bg: "#F1F5F9", fg: "#475569" },
    pink:    { bg: "#FCE7F3", fg: "#9D174D" },
    teal:    { bg: "#CCFBF1", fg: "#0F766E" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
      whiteSpace: "nowrap", ...style,
    }}>{children}</span>
  );
}

function CL_Eyebrow({ children, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
      <div className="t-eyebrow">{children}</div>
      {action}
    </div>
  );
}

/* ========== Data ========== */
const CATEGORIES = [
  { id: "all",        label: "All Clubs",       count: 28, icon: "Globe",      color: "var(--student)" },
  { id: "academic",   label: "Academic",        count: 7,  icon: "Book",       color: "#3B82F6" },
  { id: "stem",       label: "STEM",            count: 5,  icon: "Atom",       color: "#0EA5A4" },
  { id: "arts",       label: "Arts & Culture",  count: 6,  icon: "Image",      color: "#EC4899" },
  { id: "service",    label: "Service",         count: 4,  icon: "Heart",      color: "#22C55E" },
  { id: "leadership", label: "Leadership",      count: 3,  icon: "Trophy",     color: "#F59E0B" },
  { id: "affinity",   label: "Affinity",        count: 3,  icon: "Team",       color: "#A855F7" },
];

const MY_CLUBS = [
  {
    id: "robotics", name: "Robotics Club", icon: "🤖", c: "#DBEAFE", color: "#1D4ED8",
    role: "Programming Lead", joined: "Sep 2024", members: 24,
    nextMeeting: "Tue, May 14 · 3:15 PM",
    location: "Room 112 · Maker Space",
    unread: 2, status: "On track", tone: "info",
    tags: ["STEM", "Competitive"],
  },
  {
    id: "council", name: "Student Council", icon: "🗳️", c: "var(--student-soft)", color: "var(--student-deep)",
    role: "Class Representative", joined: "Aug 2024", members: 18,
    nextMeeting: "Thu, May 16 · 12:30 PM",
    location: "Library Conference Rm",
    unread: 0, status: "Active", tone: "purple",
    tags: ["Leadership"],
  },
  {
    id: "key-club", name: "Key Club", icon: "🌱", c: "#DCFCE7", color: "#15803D",
    role: "Member", joined: "Oct 2024", members: 42,
    nextMeeting: "Wed, May 15 · 3:30 PM",
    location: "Room 205",
    unread: 5, status: "12 service hrs", tone: "success",
    tags: ["Service"],
  },
];

const AI_MATCHES = [
  { name: "Debate Society", icon: "🎙️", c: "#FED7AA", match: 94, why: "Strong fit with your English Lit performance and analytical skills.", cat: "Academic", meeting: "Mon · 3:30 PM" },
  { name: "Math Olympiad Team", icon: "🧮", c: "#DBEAFE", match: 91, why: "Top quartile in Algebra II — competitive math could push you further.", cat: "STEM", meeting: "Fri · Lunch" },
  { name: "Environmental Action Coalition", icon: "🌍", c: "#DCFCE7", match: 88, why: "You're already in Key Club — this expands service into policy.", cat: "Service", meeting: "Wed · 3:30 PM" },
  { name: "Photography Club", icon: "📷", c: "#FCE7F3", match: 82, why: "Bookmarked Art portfolio resources. Photography is a low-commitment entry.", cat: "Arts", meeting: "Thu · 3:30 PM" },
];

const ALL_CLUBS = [
  { name: "Debate Society",            cat: "academic",   icon: "🎙️", c: "#FED7AA", members: 32, meet: "Mon · 3:30 PM",  loc: "Room 117",  status: "Open",        tagline: "Argue. Listen. Win.", spots: 4 },
  { name: "Math Olympiad Team",        cat: "stem",       icon: "🧮", c: "#DBEAFE", members: 14, meet: "Fri · Lunch",     loc: "Room 204",  status: "Tryout",      tagline: "Train for AMC, AIME, USAMO.", spots: 2 },
  { name: "Photography Club",          cat: "arts",       icon: "📷", c: "#FCE7F3", members: 19, meet: "Thu · 3:30 PM",   loc: "Art Rm 2",  status: "Open",        tagline: "Light. Frame. Story.", spots: null },
  { name: "Environmental Action",      cat: "service",    icon: "🌍", c: "#DCFCE7", members: 28, meet: "Wed · 3:30 PM",   loc: "Room 220",  status: "Open",        tagline: "Local impact, global mindset.", spots: null },
  { name: "Model UN",                  cat: "academic",   icon: "🌐", c: "#DBEAFE", members: 24, meet: "Tue · 3:15 PM",   loc: "Room 305",  status: "Open",        tagline: "Diplomacy in motion.", spots: 6 },
  { name: "Chess Club",                cat: "academic",   icon: "♟️", c: "#F1F5F9", members: 16, meet: "Wed · Lunch",     loc: "Library",   status: "Open",        tagline: "Patient minds welcome.", spots: null },
  { name: "Drama Club",                cat: "arts",       icon: "🎭", c: "#FEE2E2", members: 38, meet: "M/W/F · 4:00 PM", loc: "Theater",   status: "Audition",    tagline: "Spring auditions open.", spots: 8 },
  { name: "Astronomy Club",            cat: "stem",       icon: "🔭", c: "#EDE9FE", members: 12, meet: "Fri · 7:00 PM",   loc: "Roof Obs.", status: "Open",        tagline: "Stargazing & observatory nights.", spots: null },
  { name: "Black Student Union",       cat: "affinity",   icon: "✊", c: "#FEF3C7", members: 35, meet: "Tue · Lunch",     loc: "Room 312",  status: "Open",        tagline: "Community. Voice. Joy.", spots: null },
  { name: "Latinx Student Alliance",   cat: "affinity",   icon: "🌶️", c: "#FED7AA", members: 27, meet: "Thu · Lunch",     loc: "Room 312",  status: "Open",        tagline: "Cultura, mentoría, futuro.", spots: null },
  { name: "Yearbook",                  cat: "arts",       icon: "📔", c: "#DBEAFE", members: 22, meet: "Tue · 3:30 PM",   loc: "Pub Lab",   status: "Application", tagline: "Document the year.", spots: 3 },
  { name: "Mock Trial",                cat: "academic",   icon: "⚖️", c: "#FEE2E2", members: 18, meet: "Mon · 3:30 PM",   loc: "Room 220",  status: "Tryout",      tagline: "Courtroom-ready advocacy.", spots: 5 },
  { name: "Coding Collective",         cat: "stem",       icon: "💻", c: "#DBEAFE", members: 31, meet: "Wed · 3:30 PM",   loc: "Lab B",     status: "Open",        tagline: "Build, ship, demo.", spots: null },
  { name: "Red Cross Club",            cat: "service",    icon: "❤️", c: "#FEE2E2", members: 26, meet: "Bi-weekly",       loc: "Health Rm", status: "Open",        tagline: "First aid, blood drives, training.", spots: null },
  { name: "Honor Society",             cat: "leadership", icon: "🎓", c: "#EDE9FE", members: 41, meet: "Monthly",         loc: "Auditorium",status: "Invitation",  tagline: "GPA & service required.", spots: null },
  { name: "Film & Cinema",             cat: "arts",       icon: "🎬", c: "#1E293B", members: 17, meet: "Thu · 4:00 PM",   loc: "Media Rm",  status: "Open",        tagline: "Make. Watch. Discuss.", spots: null, dark: true },
];

const ANNOUNCEMENTS = [
  { from: "Drama Club", title: "Spring auditions open until Mar 3", emoji: "🎭", time: "1h ago" },
  { from: "Robotics Club", title: "Final parts list for Regionals", emoji: "🤖", time: "Yesterday" },
  { from: "Environmental Action", title: "Tree planting Saturday — sign up", emoji: "🌱", time: "2d ago" },
  { from: "Activities Office", title: "Club fair postponed to May 22", emoji: "📣", time: "3d ago" },
];

const CLOSING_SOON = [
  { name: "Yearbook · Editor application", days: 3, status: "Application" },
  { name: "Mock Trial · Spring tryout", days: 5, status: "Tryout" },
  { name: "Math Olympiad · Team selection", days: 7, status: "Tryout" },
];

/* ========== Page ========== */
function ClubsPage({ segments }) {
  const [activeCat, setActiveCat] = React.useState("all");
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("recommended");
  const [view, setView] = React.useState("grid");

  const filtered = ALL_CLUBS
    .filter(c => activeCat === "all" || c.cat === activeCat)
    .filter(c => !search.trim() || c.name.toLowerCase().includes(search.toLowerCase()));

  const subnav = NAV_MAP.find((n) => n.id === "my-activities").children;

  return (
    <Page segments={segments} title="Clubs & Organizations" emoji="🎒"
      lede="Find your people. Try something new. Lead what you love."
      actions={
        <>
          <button className="btn btn-sm">
            <I.Heart size={12} color="var(--stone)"/> Manage Interests
          </button>
          <button className="btn btn-sm">
            <I.Plus size={12} color="var(--stone)"/> Propose a Club
          </button>
        </>
      }
      rightRail={
        <>
          {/* My next meeting */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(135deg, var(--student) 0%, #5B21B6 100%)", padding: "14px 16px", color: "#fff" }}>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", opacity: 0.85 }}>NEXT UP</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>Robotics · Build session</div>
              <div style={{ fontSize: 11.5, opacity: 0.9, marginTop: 2 }}>Today · 3:15 PM · Room 112</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <button style={{ padding: "5px 10px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Check in</button>
                <button style={{ padding: "5px 10px", background: "rgba(255,255,255,0.0)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Can't make it</button>
              </div>
            </div>
          </div>

          {/* Upcoming meetings */}
          <div className="card" style={{ padding: 18 }}>
            <CL_Eyebrow action={<a href="#/my-time/my-calendar" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Calendar →</a>}>UPCOMING THIS WEEK</CL_Eyebrow>
            {[
              { d: "TUE", date: "14", t: "Robotics build session",   s: "3:15 PM · Room 112",    tone: "info" },
              { d: "WED", date: "15", t: "Key Club service prep",     s: "3:30 PM · Room 205",    tone: "success" },
              { d: "THU", date: "16", t: "Student Council mtg.",      s: "12:30 PM · Library",    tone: "purple" },
              { d: "FRI", date: "17", t: "Robotics scrimmage",        s: "4:00 PM · Lab B",       tone: "info" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 36, textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontSize: 9, color: "var(--silver)", fontWeight: 700 }}>{e.d}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{e.date}</div>
                </div>
                <div style={{ flex: 1, paddingLeft: 8, borderLeft: "1px solid var(--mist)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{e.t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{e.s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sign-ups closing soon */}
          <div className="card" style={{ padding: 18 }}>
            <CL_Eyebrow action={<a href="#/my-activities/signups" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>All →</a>}>CLOSING SOON</CL_Eyebrow>
            {CLOSING_SOON.map((s, i) => (
              <div key={i} style={{ padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{s.name}</div>
                  <CL_Pill tone={s.days <= 3 ? "danger" : s.days <= 5 ? "warning" : "soft"}>{s.days}d</CL_Pill>
                </div>
                <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{s.status} · sign up by Mar {3 + s.days}</div>
              </div>
            ))}
          </div>

          {/* Announcements */}
          <div className="card" style={{ padding: 18 }}>
            <CL_Eyebrow action={<a href="#/my-activities/announcements" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>All →</a>}>CLUB ANNOUNCEMENTS</CL_Eyebrow>
            {ANNOUNCEMENTS.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: "var(--bone)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0 }}>{a.emoji}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{a.title}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{a.from} · {a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
    >
      {/* L2 sub-tabs (matches my-activities IA) */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid var(--mist)", overflowX: "auto" }}>
        {subnav.map((sub) => {
          const isActive = sub.id === "clubs";
          return (
            <a key={sub.id} href={"#/my-activities/" + sub.id} style={{
              padding: "10px 14px", textDecoration: "none",
              color: isActive ? "var(--ink)" : "var(--stone)",
              fontSize: 13, fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? "2px solid var(--student)" : "2px solid transparent",
              marginBottom: -1, whiteSpace: "nowrap",
            }}>{sub.label}</a>
          );
        })}
      </div>

      {/* ====== Hero stats strip ====== */}
      <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 22 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr", alignItems: "stretch" }}>
          <div style={{ padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--student-soft)", color: "var(--student-deep)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <I.Team size={22} color="var(--student-deep)"/>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Your involvement</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "var(--ink)", marginTop: 2 }}>You're in 3 clubs</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>4 meetings this week · 12 service hrs YTD</div>
            </div>
          </div>
          {[
            { n: 28, l: "Active clubs", s: "across 7 categories" },
            { n: 4,  l: "Meetings this week", s: "Mon → Fri" },
            { n: 6,  l: "Open sign-ups", s: "3 closing this week" },
            { n: "94%", l: "Top AI match", s: "Debate Society" },
          ].map((s, i) => (
            <div key={i} style={{ padding: "18px 20px", borderLeft: "1px solid var(--mist)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "var(--ink)", fontWeight: 600 }}>{s.l}</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{s.s}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== My Clubs ====== */}
      <div style={{ marginBottom: 26 }}>
        <CL_Eyebrow action={<a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Manage memberships →</a>}>MY CLUBS</CL_Eyebrow>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {MY_CLUBS.map((c) => (
            <div key={c.id} className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: 12, borderBottom: "1px solid var(--mist)" }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: c.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{c.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{c.name}</div>
                    {c.unread > 0 && (
                      <span style={{ fontSize: 9, fontWeight: 700, background: "var(--student)", color: "#fff", padding: "1px 5px", borderRadius: 999 }}>{c.unread}</span>
                    )}
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{c.role} · {c.members} members</div>
                </div>
                <button style={{ width: 24, height: 24, borderRadius: 6, background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <I.MoreH size={14} color="var(--silver)"/>
                </button>
              </div>
              <div style={{ padding: "12px 16px", flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--silver)", letterSpacing: "0.06em" }}>NEXT MEETING</div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>{c.nextMeeting}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{c.location}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                  {c.tags.map(t => <CL_Pill key={t} tone="soft">{t}</CL_Pill>)}
                  <CL_Pill tone={c.tone}>{c.status}</CL_Pill>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid var(--mist)" }}>
                <button style={{ padding: "10px 6px", border: "none", background: "transparent", borderRight: "1px solid var(--mist)", fontSize: 11.5, fontWeight: 600, color: "var(--slate)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                  <I.MessageCircle size={11} color="var(--stone)"/> Chat
                </button>
                <button style={{ padding: "10px 6px", border: "none", background: "transparent", borderRight: "1px solid var(--mist)", fontSize: 11.5, fontWeight: 600, color: "var(--slate)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                  <I.Calendar size={11} color="var(--stone)"/> Schedule
                </button>
                <button style={{ padding: "10px 6px", border: "none", background: "transparent", fontSize: 11.5, fontWeight: 600, color: "var(--student-deep)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                  Open <I.ChevronRight size={11} color="var(--student-deep)"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== AI Recommendations ====== */}
      <div className="card" style={{ padding: 18, marginBottom: 26, background: "var(--student-soft)", border: "1px solid var(--student-200)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <I.Sparkle size={14} color="var(--student)"/>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--ink)" }}>Clubs AI thinks you'd love</div>
            <span style={{ fontSize: 9, fontWeight: 700, color: "var(--student-deep)", background: "var(--paper)", padding: "1px 5px", borderRadius: 3, letterSpacing: "0.06em" }}>BETA</span>
          </div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Why these? →</a>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 12 }}>Matched against your classes, interests, schedule, and what your friends joined.</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {AI_MATCHES.map((m, i) => (
            <div key={i} style={{ background: "var(--paper)", padding: 12, borderRadius: 10, position: "relative" }}>
              <div style={{ position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 700, color: "var(--success)", background: "#DCFCE7", padding: "2px 6px", borderRadius: 999 }}>{m.match}%</div>
              <div style={{ width: 38, height: 38, borderRadius: 8, background: m.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginBottom: 8 }}>{m.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{m.name}</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)", marginTop: 1 }}>{m.cat} · {m.meeting}</div>
              <div style={{ fontSize: 11, color: "var(--slate)", marginTop: 8, lineHeight: 1.4, fontStyle: "italic" }}>"{m.why}"</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                <button style={{ flex: 1, padding: "5px 8px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Request to join</button>
                <button style={{ width: 28, padding: 0, height: 26, background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 6, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <I.Bookmark size={12} color="var(--stone)"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ====== Browse all ====== */}
      <div style={{ marginBottom: 14 }}>
        <CL_Eyebrow>BROWSE ALL CLUBS</CL_Eyebrow>

        {/* Search + sort */}
        <div style={{ display: "flex", gap: 10, marginBottom: 14, alignItems: "center" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8 }}>
            <I.Search size={14} color="var(--silver)"/>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clubs by name, interest, or keyword…"
              style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ border: "none", background: "transparent", cursor: "pointer", display: "inline-flex" }}>
                <I.X size={12} color="var(--silver)"/>
              </button>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--stone)" }}>
            <span>Sort:</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ padding: "7px 10px", border: "1px solid var(--mist)", borderRadius: 6, fontSize: 12, background: "var(--paper)", color: "var(--ink)", fontWeight: 600 }}>
              <option value="recommended">Recommended</option>
              <option value="alpha">A → Z</option>
              <option value="popular">Most members</option>
              <option value="new">Newest</option>
            </select>
          </div>
          <div style={{ display: "inline-flex", border: "1px solid var(--mist)", borderRadius: 8, overflow: "hidden", background: "var(--paper)" }}>
            <button onClick={() => setView("grid")} style={{ padding: "7px 10px", border: "none", background: view === "grid" ? "var(--student-soft)" : "transparent", cursor: "pointer" }}>
              <I.GridView size={14} color={view === "grid" ? "var(--student)" : "var(--stone)"}/>
            </button>
            <button onClick={() => setView("list")} style={{ padding: "7px 10px", border: "none", background: view === "list" ? "var(--student-soft)" : "transparent", cursor: "pointer" }}>
              <I.ListView size={14} color={view === "list" ? "var(--student)" : "var(--stone)"}/>
            </button>
          </div>
        </div>

        {/* Category chips */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {CATEGORIES.map((cat) => {
            const Icon = I[cat.icon];
            const active = activeCat === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)} style={{
                padding: "7px 12px",
                background: active ? "var(--ink)" : "var(--paper)",
                color: active ? "#fff" : "var(--slate)",
                border: "1px solid " + (active ? "var(--ink)" : "var(--mist)"),
                borderRadius: 999,
                fontSize: 12, fontWeight: 600, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 6,
              }}>
                <Icon size={12} color={active ? "#fff" : cat.color}/>
                {cat.label}
                <span style={{ fontSize: 10.5, opacity: 0.6, fontWeight: 500 }}>{cat.count}</span>
              </button>
            );
          })}
        </div>

        {/* Result count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
          <div style={{ fontSize: 12, color: "var(--stone)" }}>
            Showing <b style={{ color: "var(--ink)" }}>{filtered.length}</b> {filtered.length === 1 ? "club" : "clubs"}
            {activeCat !== "all" && <> in <b style={{ color: "var(--ink)" }}>{CATEGORIES.find(c => c.id === activeCat).label}</b></>}
            {search && <> matching "<b style={{ color: "var(--ink)" }}>{search}</b>"</>}
          </div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Compare clubs side-by-side →</a>
        </div>

        {/* Cards / list */}
        {filtered.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>🔍</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>No clubs match your filters</div>
            <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 4 }}>Try broadening the category or clearing the search.</div>
            <button onClick={() => { setActiveCat("all"); setSearch(""); }} style={{ marginTop: 14, padding: "7px 14px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Clear filters</button>
          </div>
        ) : view === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {filtered.map((c) => (
              <div key={c.name} className="card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, background: c.c, color: c.dark ? "#fff" : "inherit", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{c.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>{c.name}</div>
                    <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{CATEGORIES.find(x => x.id === c.cat)?.label}</div>
                  </div>
                </div>
                <div style={{ fontSize: 11.5, color: "var(--slate)", lineHeight: 1.4, fontStyle: "italic", flex: 1 }}>"{c.tagline}"</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, color: "var(--stone)" }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}><I.Team size={11} color="var(--silver)"/>{c.members} members</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}><I.Clock size={11} color="var(--silver)"/>{c.meet}</div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}><I.MapPin size={11} color="var(--silver)"/>{c.loc}</div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--mist)", paddingTop: 10 }}>
                  <CL_Pill tone={
                    c.status === "Open" ? "success"
                    : c.status === "Tryout" ? "warning"
                    : c.status === "Audition" ? "warning"
                    : c.status === "Application" ? "info"
                    : "soft"
                  }>{c.status}{c.spots ? ` · ${c.spots} spots` : ""}</CL_Pill>
                  <button style={{ padding: "5px 10px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                    {c.status === "Tryout" ? "Tryout" : c.status === "Audition" ? "Audition" : c.status === "Application" ? "Apply" : "Join"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 0.8fr 1fr 110px", gap: 0, padding: "10px 16px", fontSize: 10.5, fontWeight: 700, color: "var(--silver)", letterSpacing: "0.06em", background: "var(--bone)", borderBottom: "1px solid var(--mist)" }}>
              <div>CLUB</div><div>CATEGORY</div><div>MEETS</div><div>MEMBERS</div><div>STATUS</div><div></div>
            </div>
            {filtered.map((c, i) => (
              <div key={c.name} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 0.8fr 1fr 110px", gap: 0, padding: "12px 16px", borderTop: i ? "1px solid var(--mist)" : "none", alignItems: "center", fontSize: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: c.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{c.name}</div>
                    <div style={{ fontSize: 10.5, color: "var(--stone)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.tagline}</div>
                  </div>
                </div>
                <div style={{ color: "var(--slate)" }}>{CATEGORIES.find(x => x.id === c.cat)?.label}</div>
                <div style={{ color: "var(--stone)" }}>{c.meet} · {c.loc}</div>
                <div style={{ color: "var(--ink)", fontWeight: 600 }}>{c.members}</div>
                <div>
                  <CL_Pill tone={
                    c.status === "Open" ? "success"
                    : c.status === "Tryout" ? "warning"
                    : c.status === "Audition" ? "warning"
                    : c.status === "Application" ? "info"
                    : "soft"
                  }>{c.status}{c.spots ? ` · ${c.spots} spots` : ""}</CL_Pill>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button style={{ padding: "5px 12px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                    {c.status === "Tryout" ? "Tryout" : c.status === "Audition" ? "Audition" : c.status === "Application" ? "Apply" : "Join"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ====== Propose / start a club ====== */}
      <div className="card" style={{ padding: 22, marginTop: 26, display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center", background: "linear-gradient(135deg, #FAFAFF 0%, #F5F3FF 100%)", border: "1px dashed var(--student-200)" }}>
        <div style={{ width: 56, height: 56, borderRadius: 12, background: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>💡</div>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>Don't see what you're looking for?</div>
          <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2 }}>Start your own club. You'll need a faculty advisor, 5 founding members, and a one-page charter. We'll guide you through it.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-sm">Read the guide</button>
          <button style={{ padding: "8px 14px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", gap: 6, alignItems: "center" }}>
            <I.Plus size={12} color="#fff"/> Start a Club
          </button>
        </div>
      </div>
    </Page>
  );
}

window.ClubsPage = ClubsPage;

})();

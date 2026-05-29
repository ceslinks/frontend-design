// LINKS — Real pages: My To Do, My Calendar, My Activities, My Team, My Portfolio overview surfaces

/* ========== Shared bits ========== */
function Tag({ tone = "neutral", children }) {
  const tones = {
    neutral: { bg: "var(--bone)", fg: "var(--stone)" },
    student: { bg: "var(--student-soft)", fg: "var(--student-deep)" },
    success: { bg: "#DCFCE7", fg: "#15803D" },
    warning: { bg: "#FEF3C7", fg: "#A16207" },
    danger:  { bg: "#FEE2E2", fg: "#B91C1C" },
    info:    { bg: "#DBEAFE", fg: "#1D4ED8" },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 999,
      background: t.bg, color: t.fg,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.02em",
      whiteSpace: "nowrap",
    }}>{children}</span>
  );
}

function L2Tabs({ segments, items }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--mist)", overflowX: "auto" }}>
      {items.map((sub) => {
        const isActive = segments[1] === sub.id || (!segments[1] && sub.id === items[0].id);
        return (
          <a key={sub.id} href={"#/" + segments[0] + "/" + sub.id}
            style={{
              padding: "10px 14px", textDecoration: "none",
              color: isActive ? "var(--ink)" : "var(--stone)",
              fontSize: 13, fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? "2px solid var(--student)" : "2px solid transparent",
              marginBottom: -1, whiteSpace: "nowrap",
            }}>{sub.label}</a>
        );
      })}
    </div>
  );
}

/* ============================================================
   MY CALENDAR (week view)
   ============================================================ */
const CAL_EVENTS = [
  // [day 0-4 Mon-Fri], hour decimal start, hour decimal end, label, course/loc, color tone
  { day: 0, start: 8.5, end: 9.75, title: "Algebra II", loc: "Rm 204", tone: "info" },
  { day: 0, start: 10.0, end: 11.0, title: "English Lit", loc: "Rm 117", tone: "warning" },
  { day: 0, start: 12.5, end: 13.5, title: "Lunch · Cafe", loc: "Cafeteria", tone: "neutral" },
  { day: 0, start: 14.0, end: 15.5, title: "Football practice", loc: "Field", tone: "success" },
  { day: 1, start: 8.5, end: 9.75, title: "Biology", loc: "Lab 2", tone: "success" },
  { day: 1, start: 10.0, end: 11.0, title: "Spanish III", loc: "Rm 312", tone: "danger" },
  { day: 1, start: 13.5, end: 14.5, title: "Advisory", loc: "Rm 204", tone: "student" },
  { day: 1, start: 15.0, end: 16.0, title: "Robotics Club", loc: "Maker Space", tone: "info" },
  { day: 2, start: 9.0, end: 10.5, title: "Algebra II Quiz", loc: "Rm 204", tone: "danger" },
  { day: 2, start: 11.0, end: 12.0, title: "US History", loc: "Rm 220", tone: "warning" },
  { day: 2, start: 14.0, end: 15.5, title: "Football practice", loc: "Field", tone: "success" },
  { day: 3, start: 8.5, end: 9.75, title: "Algebra II", loc: "Rm 204", tone: "info" },
  { day: 3, start: 10.0, end: 11.0, title: "English Lit", loc: "Rm 117", tone: "warning" },
  { day: 3, start: 13.0, end: 14.0, title: "College counselor", loc: "Counseling", tone: "student" },
  { day: 4, start: 9.0, end: 10.5, title: "Biology Lab", loc: "Lab 2", tone: "success" },
  { day: 4, start: 11.0, end: 12.0, title: "Spanish III Test", loc: "Rm 312", tone: "danger" },
  { day: 4, start: 18.0, end: 21.0, title: "Football vs. Rangers", loc: "Home Stadium", tone: "success" },
];

function CalendarPage({ segments }) {
  const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  const days = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"];
  const tones = {
    info:    { bg: "#DBEAFE", fg: "#1D4ED8", bar: "#3B82F6" },
    warning: { bg: "#FEF3C7", fg: "#A16207", bar: "#F59E0B" },
    success: { bg: "#DCFCE7", fg: "#15803D", bar: "#22C55E" },
    danger:  { bg: "#FEE2E2", fg: "#B91C1C", bar: "#EF4444" },
    student: { bg: "var(--student-soft)", fg: "var(--student-deep)", bar: "var(--student)" },
    neutral: { bg: "var(--bone)", fg: "var(--slate)", bar: "var(--silver)" },
  };
  const HOUR_HEIGHT = 56;
  const startHour = 8;

  return (
    <Page segments={segments} title="My Calendar" emoji="📅"
      lede="Plan smarter. Stay ahead of every deadline, class, and commitment."
      actions={
        <>
          <div style={{ display: "inline-flex", border: "1px solid var(--mist)", borderRadius: 8, overflow: "hidden", background: "var(--paper)" }}>
            <button style={{ padding: "7px 12px", border: "none", background: "var(--student-soft)", color: "var(--student-deep)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Week</button>
            <button style={{ padding: "7px 12px", border: "none", background: "transparent", color: "var(--stone)", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Day</button>
            <button style={{ padding: "7px 12px", border: "none", background: "transparent", color: "var(--stone)", fontSize: 12, fontWeight: 500, cursor: "pointer" }}>Month</button>
          </div>
          <button style={{ padding: "7px 14px", borderRadius: 8, border: "none", background: "var(--student)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <I.Plus size={13} color="#fff"/>New event
          </button>
        </>
      }
    >
      {/* week header */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)",
          background: "var(--surface-quiet)", borderBottom: "1px solid var(--mist)",
        }}>
          <div style={{ padding: "12px 8px", fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.08em" }}>WEEK 7</div>
          {days.map((d, i) => {
            const isToday = i === 1;
            return (
              <div key={d} style={{
                padding: "12px 14px", textAlign: "center",
                borderLeft: "1px solid var(--mist)",
                background: isToday ? "var(--student-soft)" : "transparent",
              }}>
                <div style={{ fontSize: 11, color: isToday ? "var(--student-deep)" : "var(--stone)", fontWeight: 600, letterSpacing: "0.04em" }}>{d.split(" ")[0].toUpperCase()}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: isToday ? "var(--student-deep)" : "var(--ink)", marginTop: 2 }}>{d.split(" ")[1]}</div>
              </div>
            );
          })}
        </div>

        {/* time grid */}
        <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", position: "relative" }}>
          {/* hour gutter */}
          <div>
            {HOURS.map((h) => (
              <div key={h} style={{ height: HOUR_HEIGHT, padding: "4px 8px", borderTop: "1px solid var(--mist)", color: "var(--silver)", fontSize: 10, fontWeight: 600, textAlign: "right" }}>
                {h > 12 ? `${h - 12} PM` : h === 12 ? "Noon" : `${h} AM`}
              </div>
            ))}
          </div>
          {/* day columns */}
          {days.map((d, dayIdx) => (
            <div key={d} style={{ position: "relative", borderLeft: "1px solid var(--mist)" }}>
              {HOURS.map((h) => (
                <div key={h} style={{ height: HOUR_HEIGHT, borderTop: "1px solid var(--mist)" }}/>
              ))}
              {CAL_EVENTS.filter((e) => e.day === dayIdx).map((e, i) => {
                const t = tones[e.tone] || tones.neutral;
                const top = (e.start - startHour) * HOUR_HEIGHT;
                const height = (e.end - e.start) * HOUR_HEIGHT;
                return (
                  <div key={i} style={{
                    position: "absolute", top: top + 1, left: 4, right: 4,
                    height: height - 2,
                    background: t.bg, color: t.fg,
                    borderLeft: `3px solid ${t.bar}`,
                    borderRadius: 6, padding: "5px 8px",
                    fontSize: 11.5, fontWeight: 600, lineHeight: 1.25,
                    overflow: "hidden",
                  }}>
                    <div>{e.title}</div>
                    <div style={{ fontWeight: 500, opacity: 0.85, fontSize: 10.5, marginTop: 1 }}>{e.loc}</div>
                  </div>
                );
              })}
              {/* "now" line on Tue 15 at ~13:30 */}
              {dayIdx === 1 && (
                <div style={{ position: "absolute", left: 0, right: 0, top: (13.5 - startHour) * HOUR_HEIGHT, height: 2, background: "var(--public)", zIndex: 2 }}>
                  <div style={{ position: "absolute", left: -6, top: -4, width: 10, height: 10, borderRadius: 999, background: "var(--public)" }}/>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   MY ACTIVITIES (overview)
   ============================================================ */
function ActivitiesOverview({ segments, navigate }) {
  const myActivities = [
    { name: "Varsity Football", role: "Wide Receiver · #14", schedule: "M/T/Th 2:30 PM", icon: "🏈", tone: "success", route: ["my-activities", "athletics", "football", "team-hub"] },
    { name: "Robotics Club", role: "Programming Lead", schedule: "Tue 3:00 PM", icon: "🤖", tone: "info", route: ["my-activities", "clubs"] },
    { name: "Student Council", role: "Class Representative", schedule: "Thu 12:30 PM", icon: "🗳️", tone: "student", route: ["my-activities", "clubs"] },
  ];
  const upcoming = [
    { date: "Fri Feb 18", title: "Football vs. Rangers", subtitle: "Home · 6 PM", tone: "success" },
    { date: "Sat Feb 19", title: "Robotics Regionals — Day 1", subtitle: "Travel · 7 AM", tone: "info" },
    { date: "Mon Feb 21", title: "Student Council mtg.", subtitle: "Library · 12:30 PM", tone: "student" },
  ];
  const announcements = [
    { from: "Coach Patel", title: "Game day shirts ready in athletics office", time: "1h ago" },
    { from: "Robotics Club", title: "Final parts list for Regionals", time: "Yesterday" },
    { from: "Drama Club", title: "Spring auditions open until Mar 3", time: "2d ago" },
  ];

  return (
    <Page segments={segments} title="My Activities" emoji="🌟"
      lede="Get involved. Build skills. Make memories."
    >
      <L2Tabs segments={segments} items={NAV_MAP.find((n) => n.id === "my-activities").children}/>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, marginBottom: 12, color: "var(--ink)" }}>You're in 3 activities</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
            {myActivities.map((a) => (
              <a key={a.name} href={"#" + routeToHref(a.route).slice(1)} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: 18, cursor: "pointer", transition: "transform 120ms" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 30, marginBottom: 8 }}>{a.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 3 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 10 }}>{a.role}</div>
                  <Tag tone={a.tone}>{a.schedule}</Tag>
                </div>
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, margin: 0, color: "var(--ink)" }}>Discover more</h2>
            <a href="#/my-activities/clubs" style={{ fontSize: 12, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Browse all clubs →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {[
              { name: "Debate Society", tag: "Forensics", icon: "🎙️" },
              { name: "Photography Club", tag: "Arts", icon: "📷" },
              { name: "Math Olympiad Team", tag: "Academic", icon: "🧮" },
              { name: "Environmental Action", tag: "Service", icon: "🌱" },
            ].map((c) => (
              <div key={c.name} className="card" style={{ padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 26 }}>{c.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{c.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{c.tag}</div>
                </div>
                <button style={{ padding: "5px 10px", border: "1px solid var(--student)", color: "var(--student-deep)", background: "transparent", borderRadius: 6, fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}>Join</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 12 }}>UPCOMING</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {upcoming.map((u, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <div style={{ width: 4, borderRadius: 2, background: ({ success:"#22C55E", info:"#3B82F6", student:"var(--student)" })[u.tone] }}/>
                  <div>
                    <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 600 }}>{u.date}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{u.title}</div>
                    <div style={{ fontSize: 12, color: "var(--stone)" }}>{u.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <div className="t-eyebrow">ANNOUNCEMENTS</div>
              <a href="#/my-activities/announcements" style={{ fontSize: 11, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>All →</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {announcements.map((a, i) => (
                <div key={i}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.title}</div>
                  <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>{a.from} · {a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   MY TEAM (overview)
   ============================================================ */
const TEAM = [
  { name: "Ms. Sarah Chen",      role: "Algebra II",         dept: "Math",       avail: "Office hrs Tue/Thu", tone: "info",    cat: "teachers" },
  { name: "Mr. James Rivera",    role: "Biology",            dept: "Science",    avail: "Mon 3–4 PM",         tone: "success", cat: "teachers" },
  { name: "Ms. Patel",           role: "English Literature", dept: "Humanities", avail: "Online · async",     tone: "warning", cat: "teachers" },
  { name: "Sra. Morales",        role: "Spanish III",        dept: "Languages",  avail: "Wed lunch",          tone: "danger",  cat: "teachers" },
  { name: "Mr. Greene",          role: "US History",         dept: "Humanities", avail: "Office hrs Wed",     tone: "warning", cat: "teachers" },
  { name: "Dr. Maria Hernandez", role: "College Counselor",  dept: "Counseling", avail: "By appointment",     tone: "student", cat: "advisors" },
  { name: "Mr. Reed",            role: "Academic Advisor",   dept: "Counseling", avail: "Mon/Fri",            tone: "student", cat: "advisors" },
  { name: "Coach Patel",         role: "Head Coach, Football", dept: "Athletics", avail: "Field 2:30 PM",     tone: "success", cat: "coaches" },
  { name: "Coach Yi",            role: "Strength & Conditioning", dept: "Athletics", avail: "Weight room",  tone: "success", cat: "coaches" },
  { name: "Ms. Davis",           role: "School Nurse",       dept: "Health",     avail: "M–F 8–4",            tone: "neutral", cat: "support" },
];

function TeamPage({ segments }) {
  const filter = segments[1] || "overview";
  const list = filter === "overview" ? TEAM : TEAM.filter((p) => p.cat === filter);

  return (
    <Page segments={segments} title="My Team" emoji="👥"
      lede="The people who support, teach, and help you succeed."
    >
      <L2Tabs segments={segments} items={NAV_MAP.find((n) => n.id === "my-team").children}/>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {list.map((p) => (
          <div key={p.name} className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 999,
                background: `linear-gradient(135deg, hsl(${p.name.charCodeAt(0) * 17 % 360} 70% 70%), hsl(${p.name.charCodeAt(2) * 23 % 360} 60% 55%))`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontSize: 16, fontWeight: 700, flexShrink: 0,
              }}>{p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{p.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--stone)" }}>{p.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              <Tag tone={p.tone}>{p.dept}</Tag>
              <Tag tone="neutral">{p.avail}</Tag>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button style={{ flex: 1, padding: "6px 10px", border: "1px solid var(--mist)", background: "var(--paper)", borderRadius: 6, fontSize: 12, fontWeight: 500, color: "var(--slate)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                <I.Messages size={11} color="var(--stone)"/>Message
              </button>
              <button style={{ flex: 1, padding: "6px 10px", border: "1px solid var(--mist)", background: "var(--paper)", borderRadius: 6, fontSize: 12, fontWeight: 500, color: "var(--slate)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                <I.Calendar size={11} color="var(--stone)"/>Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}

/* ============================================================
   MY PORTFOLIO (overview)
   ============================================================ */
function PortfolioPage({ segments }) {
  return (
    <Page segments={segments} title="My Portfolio" emoji="🎓"
      lede="Your story. Your growth. Your future."
      actions={
        <button style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid var(--mist)", background: "var(--paper)", color: "var(--slate)", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
          <I.External size={13} color="var(--stone)"/>Share
        </button>
      }
    >
      <L2Tabs segments={segments} items={NAV_MAP.find((n) => n.id === "my-portfolio").children}/>

      {/* Hero */}
      <div className="card" style={{ padding: 28, marginBottom: 24, background: "linear-gradient(135deg, var(--student-soft) 0%, #FAF5FF 100%)", border: "none" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, overflow: "hidden", border: "3px solid var(--paper)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
            <PortraitSVG size={80}/>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Alex Johnson</h2>
            <div style={{ fontSize: 14, color: "var(--stone)", marginTop: 4 }}>10th Grade · Wyndham Park Academy</div>
            <div style={{ display: "flex", gap: 18, marginTop: 14 }}>
              <div><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>24</div><div style={{ fontSize: 11, color: "var(--stone)" }}>Works</div></div>
              <div><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>12</div><div style={{ fontSize: 11, color: "var(--stone)" }}>Reflections</div></div>
              <div><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>8</div><div style={{ fontSize: 11, color: "var(--stone)" }}>Achievements</div></div>
              <div><div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>3.85</div><div style={{ fontSize: 11, color: "var(--stone)" }}>GPA</div></div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 12 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, margin: 0, color: "var(--ink)" }}>Featured Work</h3>
            <a href="#/my-portfolio/my-work" style={{ fontSize: 12, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>See all →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {[
              { title: "Cell Respiration: A Visual Walkthrough", course: "Biology · Lab", grade: "A", color: "#22C55E" },
              { title: "Symbolism in 'The Great Gatsby'", course: "English Lit · Essay", grade: "A−", color: "#F59E0B" },
              { title: "Quadratic Solver — Robotics App", course: "Algebra II · Project", grade: "A", color: "#3B82F6" },
              { title: "1968 — A Civic Reflection", course: "US History · Paper", grade: "A", color: "#A855F7" },
            ].map((w, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
                <div style={{ height: 110, background: `linear-gradient(135deg, ${w.color}, ${w.color}aa)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700 }}>{w.grade}</div>
                <div style={{ padding: 14 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)", marginBottom: 4 }}>{w.title}</div>
                  <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{w.course}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 12 }}>SKILLS GROWTH</div>
            {[
              { skill: "Critical Thinking", level: 4, max: 5 },
              { skill: "Problem Solving", level: 5, max: 5 },
              { skill: "Communication", level: 3, max: 5 },
              { skill: "Collaboration", level: 4, max: 5 },
              { skill: "Creativity", level: 4, max: 5 },
            ].map((s) => (
              <div key={s.skill} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12, fontWeight: 500, color: "var(--ink)" }}>
                  <span>{s.skill}</span><span style={{ color: "var(--stone)", fontWeight: 400 }}>{s.level}/{s.max}</span>
                </div>
                <div style={{ display: "flex", gap: 3 }}>
                  {[...Array(s.max)].map((_, i) => (
                    <div key={i} style={{ flex: 1, height: 6, borderRadius: 2, background: i < s.level ? "var(--student)" : "var(--bone)" }}/>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 12 }}>RECENT ACHIEVEMENTS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "🥇", title: "Math Olympiad — Gold", date: "Jan 2026" },
                { icon: "🎯", title: "Perfect Attendance Q2", date: "Dec 2025" },
                { icon: "📖", title: "Honor Roll", date: "Dec 2025" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 22 }}>{a.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.title}</div>
                    <div style={{ fontSize: 11, color: "var(--silver)" }}>{a.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ============================================================
   Route handlers — wired into app.jsx via window["renderRoute_<l1>"]
   ============================================================ */
window.renderRoute_my_todo = ({ segments, navigate }) => <TodoPage segments={segments} navigate={navigate}/>;
window["renderRoute_my-todo"] = ({ segments, navigate }) => <TodoPage segments={segments} navigate={navigate}/>;
window["renderRoute_my-time"] = ({ segments, navigate }) => {
  if (segments[1] === "my-calendar") return <CalendarPage segments={segments} navigate={navigate}/>;
  if (segments[1] === "my-schedule") return <MySchedulePage segments={segments}/>;
  if (segments[1] === "study-planner") return <StudyPlannerPage segments={segments} navigate={navigate}/>;
  return <StubRoute segments={segments}/>;
};
window["renderRoute_my-tools"] = ({ segments, navigate }) => <MyToolsPage segments={segments} standalone={true}/>;
window["renderRoute_my-activities"] = ({ segments, navigate }) => {
  const sub = segments[1] || "overview";
  if (segments[1] === "events") return <EventsPage segments={segments}/>;
  if (segments[1] === "athletics" && segments[2] === "football") {
    if (segments[3] === "recruiting-profile") return <RecruitingProfilePage segments={segments}/>;
    // /football or /football/schedule|stats — show team hub
    return <FootballTeamPage segments={segments}/>;
  }
  if (sub === "overview") return <ActivitiesOverviewRefined segments={segments} navigate={navigate}/>;
  return <StubRoute segments={segments}/>;
};
window["renderRoute_my-team"] = ({ segments, navigate }) => <TeamPage segments={segments}/>;
window["renderRoute_my-portfolio"] = ({ segments, navigate, tweaks }) => {
  const pageMap = {
    "my-work": "PortfolioMyWorkPage",
    "skills": "PortfolioSkillsPage",
    "reflections": "PortfolioReflectionsPage",
    "achievements": "PortfolioAchievementsPage",
    "shared": "PortfolioSharedPage",
  };
  const componentName = pageMap[segments[1]] || "PortfolioOverviewPage";
  const PageComponent = window[componentName];
  if (PageComponent && typeof PageComponent === "function") {
    return React.createElement(PageComponent, { segments });
  }
  return <PortfolioPage segments={segments}/>;
};

window.CalendarPage = CalendarPage;
window.ActivitiesOverview = ActivitiesOverview;
window.TeamPage = TeamPage;
window.PortfolioPage = PortfolioPage;

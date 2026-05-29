// LINKS — Generic page scaffolds + stub renderer for L1/L2/L3 routes

const ROUTE_META = {
  // home is rendered separately
  "my-time":                   { title: "My Time",         emoji: "⏰", lede: "Plan smarter. Stay ahead." },
  "my-time/my-schedule":      { title: "My Schedule",     emoji: "🗓️", lede: "Your school day at a glance." },
  "my-time/my-calendar":      { title: "My Calendar",     emoji: "📅", lede: "Plan smarter. Stay ahead." },
  "my-time/study-planner":    { title: "Study Planner",   emoji: "✨", lede: "AI builds personalized plans so you complete work on time." },
  "my-todo":                  { title: "My To Do",        emoji: "✅", lede: "Your tasks, intelligently organized." },
  "my-desk":                  { title: "My Desk",         emoji: "🪴", lede: "Your active workspace." },
  "my-desk/overview":         { title: "My Desk",         emoji: "🪴", lede: "Your active workspace." },
  "my-desk/my-menu":          { title: "My Menu",         emoji: "🌿", lede: "Healthy choices. Transparent ingredients. Powered by you." },
  "my-desk/my-tools":         { title: "My Tools",        emoji: "🛠️", lede: "Your workspace for creating, solving, and bringing ideas to life." },
  "my-desk/notes":            { title: "Notes",           emoji: "📝", lede: "Your captured thoughts, organized and searchable." },
  "my-desk/files":            { title: "Files",           emoji: "📁", lede: "All your uploads and saved work." },
  "my-desk/bookmarks":        { title: "Bookmarks",       emoji: "🔖", lede: "Saved links and resources for quick access." },
  "my-progress":              { title: "My Progress",     emoji: "📈", lede: "You're learning, growing, and getting better every day!" },
  "my-classes":               { title: "My Classes",      emoji: "📚", lede: "All your classes for this term." },
  "my-materials":             { title: "My Materials",    emoji: "📂", lede: "Files, by class, source, and type." },

  "my-activities":            { title: "My Activities",   emoji: "🌟", lede: "Get involved. Build skills. Make memories." },
  "my-activities/overview":   { title: "My Activities",   emoji: "🌟", lede: "Get involved. Build skills. Make memories." },
  "my-activities/clubs":      { title: "Clubs & Organizations", emoji: "🤝", lede: "Find your people and dive in." },
  "my-activities/events":     { title: "Events",          emoji: "📅", lede: "Stay informed. Take action. Make the most of every opportunity." },
  "my-activities/athletics":  { title: "Athletics",       emoji: "🏆", lede: "Teams, training, and recruiting — all in one hub." },
  "my-activities/athletics/dashboard": { title: "Athletics Dashboard", emoji: "📊", lede: "Eligibility, conditioning, and your season at a glance." },
  "my-activities/athletics/teams":     { title: "Teams",  emoji: "👥", lede: "All teams you're part of or following." },
  "my-activities/athletics/football":  { title: "Football", emoji: "🏈", lede: "Wyndham Park Wombats — Varsity." },
  "my-activities/athletics/football/team-hub":   { title: "Wyndham Park Wombats", emoji: "🏈", lede: "Eligibility, schedule, conditioning, and team comms." },
  "my-activities/athletics/football/schedule":   { title: "Schedule", emoji: "📅", lede: "Practices, games, and team commitments." },
  "my-activities/athletics/football/stats":      { title: "Stats", emoji: "📊", lede: "Your season performance at a glance." },
  "my-activities/athletics/football/recruiting": { title: "Recruiting Profile", emoji: "🎖️", lede: "Your athlete profile for college recruiters." },
  "my-activities/signups":       { title: "Sign-Ups & Tryouts", emoji: "✍️", lede: "Apply, upload documents, and submit." },
  "my-activities/announcements": { title: "Announcements",     emoji: "📣", lede: "The latest from clubs, teams, and the school." },

  "my-portfolio":              { title: "My Portfolio",     emoji: "🎓", lede: "Your story. Your growth. Your future." },
  "my-portfolio/overview":     { title: "My Portfolio",     emoji: "🎓", lede: "Your story. Your growth. Your future." },
  "my-portfolio/my-work":      { title: "My Work",          emoji: "💼", lede: "Curated highlights — your best proofs of growth." },
  "my-portfolio/skills":       { title: "Skills & Growth",  emoji: "📈", lede: "How you've grown across key skills this year." },
  "my-portfolio/reflections":  { title: "Reflections",      emoji: "💭", lede: "What you've learned, in your own words." },
  "my-portfolio/achievements": { title: "Achievements",     emoji: "🏆", lede: "Milestones, awards, and recognition." },
  "my-portfolio/shared":       { title: "Shared With Me",   emoji: "🌐", lede: "Portfolios shared with you by classmates and teachers." },

  "messages":                  { title: "Messages",         emoji: "💬", lede: "Inbox, DMs, group threads, and class channels." },

  "my-team":                   { title: "My Team",          emoji: "👥", lede: "The people who support and help you succeed." },
  "my-team/overview":          { title: "My Team",          emoji: "👥", lede: "The people who support and help you succeed." },
  "my-team/teachers":          { title: "Teachers",         emoji: "🎓", lede: "Teachers for your current classes." },
  "my-team/advisors":          { title: "Advisors",         emoji: "🧭", lede: "Guidance counselors and academic advisors." },
  "my-team/coaches":           { title: "Coaches",          emoji: "🏆", lede: "Coaches and club advisors." },
  "my-team/support":           { title: "Support Staff",    emoji: "❤️", lede: "Health, admin, and other support." },

  "my-tools":                  { title: "My Tools",         emoji: "🛠️", lede: "Your workspace for creating, solving, and bringing ideas to life." },
  "ai-coach":                  { title: "LINKS AI",         emoji: "✨", lede: "Quick start prompts, tools, recent conversations." },

  // Account
  "my-profile":         { title: "My Profile",              lede: "Identity, contact, family, transportation, facilities." },
  "settings":           { title: "Settings",                lede: "Language, accessibility, integrations." },
  "notification-prefs": { title: "Notification Preferences", lede: "Per-channel, per-event-type controls." },
  "privacy":            { title: "Privacy & Security",       lede: "Data sharing, login & sessions, two-factor, export." },
};

function getRouteMeta(segments) {
  const key = segments.join("/");
  if (ROUTE_META[key]) return ROUTE_META[key];
  // try parent
  for (let i = segments.length; i > 0; i--) {
    const k = segments.slice(0, i).join("/");
    if (ROUTE_META[k]) return ROUTE_META[k];
  }
  return { title: "Page", lede: "" };
}

/* Lightweight placeholder card for surfaces we haven't fully built yet */
function PlaceholderCanvas({ label, height = 360 }) {
  return (
    <div className="card" style={{
      padding: 0, height, position: "relative", overflow: "hidden",
      background: "repeating-linear-gradient(135deg, var(--paper) 0 18px, var(--surface-quiet) 18px 19px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        textAlign: "center", background: "var(--paper)", padding: "16px 22px",
        borderRadius: 8, border: "1px solid var(--mist)",
      }}>
        <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 4, color: "var(--silver)" }}>SURFACE PLACEHOLDER</div>
        <div style={{ fontFamily: "ui-monospace, SF Mono, monospace", fontSize: 12, color: "var(--stone)" }}>{label}</div>
      </div>
    </div>
  );
}

/* Full-bleed page wrapper used by every L1/L2/L3 surface */
function Page({ segments, extraCrumbs, title, emoji, lede, actions, children, rightRail }) {
  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto" }}>
      <PageHeader segments={segments} title={title} emoji={emoji} lede={lede} actions={actions} extraCrumbs={extraCrumbs}/>
      {rightRail ? (
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 20 }}>
          <div style={{ minWidth: 0 }}>{children}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{rightRail}</div>
        </div>
      ) : (
        children
      )}
    </div>
  );
}

/* Generic stub — used when a route doesn't have a fully-built page.
   Renders breadcrumbs + a clear "scaffolded" canvas + L2 sub-tabs if applicable. */
function StubRoute({ segments }) {
  const meta = getRouteMeta(segments);
  const l1 = NAV_MAP.find((n) => n.id === segments[0]);
  const subnav = l1 && l1.children ? l1.children : null;

  return (
    <Page segments={segments} title={meta.title} emoji={meta.emoji} lede={meta.lede}>
      {/* L2 subtabs (only if there are siblings to swap between) */}
      {subnav && segments.length >= 2 && (
        <div style={{ display: "flex", gap: 4, marginBottom: 24, borderBottom: "1px solid var(--mist)", overflowX: "auto" }}>
          {subnav.map((sub) => {
            const isActive = segments[1] === sub.id;
            return (
              <a
                key={sub.id}
                href={"#/" + segments[0] + "/" + sub.id}
                style={{
                  padding: "10px 14px", textDecoration: "none",
                  color: isActive ? "var(--ink)" : "var(--stone)",
                  fontSize: 13, fontWeight: isActive ? 600 : 500,
                  borderBottom: isActive ? "2px solid var(--student)" : "2px solid transparent",
                  marginBottom: -1, whiteSpace: "nowrap",
                }}
              >{sub.label}</a>
            );
          })}
        </div>
      )}

      <EmptyState
        icon="Sparkle"
        title="This page is on the way"
        action={
          <a href="#/home" className="btn btn-primary" style={{ textDecoration: "none" }}>
            Back to Home
          </a>
        }
      >
        We're still composing this surface. Breadcrumbs and navigation are wired so it sits in the right place — full content follows the patterns from Home, My Calendar, and My To Do.
      </EmptyState>

      <div style={{
        marginTop: 20, padding: "12px 16px",
        background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8,
        display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
        fontSize: 12, color: "var(--silver)",
      }}>
        <span className="t-eyebrow" style={{ fontSize: 10 }}>ROUTE</span>
        <code style={{ background: "var(--bone)", padding: "2px 8px", borderRadius: 4, fontSize: 11.5, color: "var(--stone)" }}>
          /{segments.join("/")}
        </code>
      </div>
    </Page>
  );
}

window.Page = Page;
window.StubRoute = StubRoute;
window.PlaceholderCanvas = PlaceholderCanvas;
window.ROUTE_META = ROUTE_META;
window.getRouteMeta = getRouteMeta;

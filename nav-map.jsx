// LINKS — Navigation map (L1 + L2 + L3 where applicable)
// This is the source of truth for the sidebar, breadcrumbs, and route resolution.
// Routes are hash-based: #/{l1}[/{l2}[/{l3}...]]
//
// Reading the reference screenshots:
//   • My Time      → My Schedule, My Calendar, To Do, Study Planner (also: My Desk on some shots — kept as separate L1)
//   • My Desk      → Overview, My Menu, My Tools, Notes, Files, Bookmarks
//   • My Progress  → Overview (also surfaces Class detail, Skills, Practice via right rail)
//   • My Classes   → All Classes, then per-class detail
//   • My Materials → All, By Class, Recent
//   • My Activities → Discover, My Activities, Events, Sign-Ups & Tryouts, Announcements
//                     ↳ deeper: Athletics → Football → Team Hub / Schedule / Stats / Recruiting Profile
//   • My Portfolio → Overview, My Work, Skills & Growth, Reflections, Achievements, Shared With Me
//   • My Team      → Overview, Teachers, Advisors, Coaches, Support Staff
//   • Messages     → Inbox, DMs, Class Channels, Email
//   • My Tools     → Workspace, by category
//   • LINKS AI     → Hub, System overview

const NAV_MAP = [
  { id: "home", label: "Home", icon: "Home" },

  {
    id: "my-time", label: "My Time", icon: "Time",
    children: [
      { id: "my-schedule",   label: "My Schedule",   icon: "Clock" },
      { id: "my-calendar",   label: "My Calendar",   icon: "Calendar" },
      { id: "study-planner", label: "Study Planner", icon: "Lightbulb", badge: "AI" },
    ],
  },

  { id: "my-todo", label: "My To Do", icon: "ListChecks", badge: 4 },

  {
    id: "my-desk", label: "My Desk", icon: "Desk",
    children: [
      { id: "overview",  label: "Overview",  icon: "Home" },
      { id: "my-menu",   label: "My Menu",   icon: "Heart" },
      { id: "my-tools",  label: "My Tools",  icon: "Tools" },
      { id: "notes",     label: "Notes",     icon: "Notes" },
      { id: "files",     label: "Files",     icon: "Folder" },
      { id: "bookmarks", label: "Bookmarks", icon: "Pin" },
    ],
  },

  { id: "my-progress", label: "My Progress", icon: "Progress" },
  { id: "my-classes",  label: "My Classes",  icon: "Classes" },
  { id: "my-materials",label: "My Materials",icon: "Folder" },

  {
    id: "my-activities", label: "My Activities", icon: "Star",
    children: [
      { id: "overview",            label: "Overview",          icon: "Home" },
      { id: "clubs",               label: "Clubs & Organizations", icon: "Team" },
      { id: "events",              label: "Events",            icon: "Calendar" },
      { id: "athletics",           label: "Athletics",         icon: "Soccer",
        children: [
          { id: "dashboard",        label: "Dashboard",        icon: "ChartBar" },
          { id: "teams",            label: "Teams",            icon: "Team" },
          { id: "football",         label: "Football",         icon: "Soccer",
            children: [
              { id: "schedule",          label: "Schedule",           icon: "Calendar" },
              { id: "stats",             label: "Stats",              icon: "ChartBar" },
              { id: "recruiting-profile",label: "Recruiting Profile", icon: "Trophy" },
            ],
          },
        ],
      },
      { id: "signups",             label: "Sign-Ups & Tryouts",icon: "Check" },
      { id: "announcements",       label: "Announcements",     icon: "Bell" },
    ],
  },

  {
    id: "my-portfolio", label: "My Portfolio", icon: "Portfolio",
    children: [
      { id: "overview",       label: "Overview",       icon: "Home" },
      { id: "my-work",        label: "My Work",        icon: "Work" },
      { id: "skills",         label: "Skills & Growth",icon: "TrendUp" },
      { id: "reflections",    label: "Reflections",    icon: "Quote" },
      { id: "achievements",   label: "Achievements",   icon: "Trophy" },
      { id: "shared",         label: "Shared With Me", icon: "Globe" },
    ],
  },

  { id: "messages", label: "Messages", icon: "Messages", badge: 3 },

  {
    id: "my-team", label: "My Team", icon: "Team",
    children: [
      { id: "overview",      label: "Overview",      icon: "Home" },
      { id: "teachers",      label: "Teachers",      icon: "School" },
      { id: "advisors",      label: "Advisors",      icon: "User" },
      { id: "coaches",       label: "Coaches",       icon: "Soccer" },
      { id: "support",       label: "Support Staff", icon: "Heart" },
    ],
  },

  { id: "my-tools", label: "My Tools", icon: "Tools" },
  { id: "ai-coach", label: "LINKS AI", icon: "Sparkle" },
];

// ACCOUNT_NAV stays in the user dropdown (top-right).
const ACCOUNT_NAV_MAP = [
  { id: "my-profile",         label: "My Profile",              icon: "User" },
  { id: "settings",           label: "Settings",                icon: "Settings" },
  { id: "notification-prefs", label: "Notification Preferences", icon: "Bell" },
  { id: "privacy",            label: "Privacy & Security",       icon: "Shield" },
];

// Pretty label helper for breadcrumbs and stub titles.
function findNavPath(segments) {
  // segments: ["my-activities", "athletics", "football", "team-hub"]
  // returns: array of { id, label, icon, href } from L1 down. Unknown segments still get a labelized fallback.
  const path = [];
  let level = NAV_MAP;
  let hrefAcc = "#";
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    hrefAcc += "/" + seg;
    const found = level && level.find((n) => n.id === seg);
    if (found) {
      path.push({ id: found.id, label: found.label, icon: found.icon, href: hrefAcc });
      level = found.children || [];
    } else {
      // unknown — humanize the slug
      const label = seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      path.push({ id: seg, label, href: hrefAcc, dynamic: true });
      level = [];
    }
  }
  return path;
}

// Find the L1 entry that owns a given route. Used by sidebar to highlight the right top-level item.
function findL1ForRoute(segments) {
  if (!segments.length) return null;
  return NAV_MAP.find((n) => n.id === segments[0]) || null;
}

function parseRoute(hash) {
  // Accepts "#/foo/bar/baz" or "#foo" or ""; returns array of segments.
  if (!hash || hash === "#" || hash === "#/") return ["home"];
  const m = hash.replace(/^#\/?/, "").replace(/\/$/, "").split("?")[0];
  if (!m) return ["home"];
  return m.split("/").filter(Boolean);
}

function routeToHref(segments) {
  return "#/" + segments.join("/");
}

window.NAV_MAP = NAV_MAP;
window.ACCOUNT_NAV_MAP = ACCOUNT_NAV_MAP;
window.findNavPath = findNavPath;
window.findL1ForRoute = findL1ForRoute;
window.parseRoute = parseRoute;
window.routeToHref = routeToHref;

// LINKS — Messages: 3-pane shell with 6 view types

/* ─────────── shared bits ─────────── */

// Avatar with photo-ish gradient + initial fallback. Pass `dot` for online indicator.
function Av({ name, color = "#7C3AED", size = 36, dot, src, ring }) {
  const initials = name?.split(" ").map(s => s[0]).slice(0, 2).join("") || "?";
  return (
    <div style={{ position: "relative", flexShrink: 0, width: size, height: size }}>
      <div style={{
        width: size, height: size, borderRadius: "50%",
        background: src ? "transparent" : `linear-gradient(135deg, ${color}, ${shade(color, -25)})`,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontWeight: 600, fontSize: size * 0.36,
        border: ring ? `2px solid ${ring}` : "none",
        overflow: "hidden",
      }}>
        {src ? <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }}/> : initials}
      </div>
      {dot && (
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: size * 0.28, height: size * 0.28,
          borderRadius: "50%", background: dot === "online" ? "#22C55E" : "#94A3B8",
          border: "2px solid var(--paper)",
        }}/>
      )}
    </div>
  );
}

function shade(hex, pct) {
  const f = parseInt(hex.slice(1), 16);
  const t = pct < 0 ? 0 : 255, p = Math.abs(pct) / 100;
  const R = f >> 16, G = (f >> 8) & 0xff, B = f & 0xff;
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

// Generated portrait — vaguely-photographic at small sizes
function Portrait({ name, hue, size = 36, dot, ring }) {
  const id = name.replace(/\s/g, "");
  const skinA = `hsl(${hue + 20}, 35%, 60%)`;
  const skinB = `hsl(${hue + 20}, 40%, 35%)`;
  const bgA = `hsl(${hue}, 70%, 70%)`;
  const bgB = `hsl(${hue}, 60%, 45%)`;
  const hair = `hsl(${hue - 10}, 40%, ${15 + (hue % 30)}%)`;
  return (
    <div style={{ position: "relative", flexShrink: 0, width: size, height: size }}>
      <svg viewBox="0 0 38 38" width={size} height={size} style={{ display: "block", borderRadius: "50%", border: ring ? `2px solid ${ring}` : "none" }}>
        <defs>
          <radialGradient id={`bg${id}`} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={bgA}/>
            <stop offset="100%" stopColor={bgB}/>
          </radialGradient>
          <radialGradient id={`skin${id}`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={skinA}/>
            <stop offset="100%" stopColor={skinB}/>
          </radialGradient>
        </defs>
        <rect width="38" height="38" fill={`url(#bg${id})`}/>
        <ellipse cx="19" cy="40" rx="17" ry="13" fill="#1E293B"/>
        <ellipse cx="19" cy="20" rx="8.5" ry="10" fill={`url(#skin${id})`}/>
        <path d="M10 16 Q 14 8 19 8 Q 26 8 27 18 Q 27 13 22 11 Q 16 11 12 17 Q 10 19 10 16 Z" fill={hair}/>
        <circle cx="16" cy="20.5" r="0.9" fill="#0F172A"/>
        <circle cx="22.5" cy="20.5" r="0.9" fill="#0F172A"/>
        <path d="M17 24 Q 19 26 21.5 24" stroke="#3B1E0E" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
      </svg>
      {dot && (
        <span style={{
          position: "absolute", bottom: 0, right: 0,
          width: size * 0.28, height: size * 0.28,
          borderRadius: "50%", background: dot === "online" ? "#22C55E" : "#94A3B8",
          border: "2px solid var(--paper)",
        }}/>
      )}
    </div>
  );
}

// Class/group icon tile (no photo)
function GroupTile({ icon, color, size = 36 }) {
  const Icon = icon;
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `${color}1F`,
      color: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <Icon size={size * 0.5} color={color}/>
    </div>
  );
}

/* ─────────── conversation data ─────────── */

const CONVS = {
  "carter": {
    kind: "dm-teacher", who: "Ms. Carter", role: "English 10 Teacher",
    portrait: { hue: 350 }, presence: "online",
    last: "Don't forget our essay is due Friday!", time: "9:41 AM", unread: 2, pinned: false,
  },
  "biology": {
    kind: "group", who: "Biology 101", role: "Mrs. Lopez · Lab report guidelines posted",
    icon: "Atom", color: "#10B981",
    last: "Mrs. Lopez: Lab report guidelines", time: "9:20 AM", unread: 4,
  },
  "study-group": {
    kind: "group", who: "Study Group", role: "Marcus: Can someone send the notes?",
    icon: "Team", color: "#8B5CF6",
    last: "Marcus: Can someone send the notes?", time: "Yesterday", unread: 3,
  },
  "johnson": {
    kind: "dm-teacher", who: "Mr. Johnson", role: "US History — Period 3",
    portrait: { hue: 30 }, presence: "offline",
    last: "Great job on your presentation!", time: "Yesterday", unread: 0,
  },
  "soccer": {
    kind: "group", who: "Soccer Team", role: "Coach David: Game moved to Saturday",
    icon: "Soccer", color: "#22C55E",
    last: "Coach David: Game moved to Saturday", time: "Yesterday", unread: 1,
  },
  "math": {
    kind: "group", who: "Math 10 — Period 3", role: "Mr. Kim: Worksheet answers",
    icon: "Calculator", color: "#0EA5E9",
    last: "Mr. Kim: Worksheet answers", time: "Feb 27", unread: 0,
  },
  "mom": {
    kind: "dm", who: "Alex Mom", role: "Family",
    portrait: { hue: 320 }, presence: "offline",
    last: "Check your schedule for today", time: "Feb 26", unread: 0,
  },
  "college": {
    kind: "group", who: "College Prep", role: "Ms. Patel: Scholarship opportunity",
    icon: "School", color: "#7C3AED",
    last: "Ms. Patel: Scholarship opportunity", time: "Feb 26", unread: 0,
  },
  "jordan": {
    kind: "dm", who: "Jordan Lee", role: "10th Grade · Wyn Park Academy",
    portrait: { hue: 200 }, presence: "online",
    last: "Also, do you want to jump on a quick study session…", time: "9:24 AM", unread: 2,
  },
  "taylor": {
    kind: "dm", who: "Taylor Kim", role: "10th Grade",
    portrait: { hue: 280 }, presence: "offline",
    last: "Thanks! That helped a lot 🙏", time: "Yesterday", unread: 1,
  },
  "marcus": {
    kind: "dm", who: "Marcus Patel", role: "10th Grade",
    portrait: { hue: 40 }, presence: "offline",
    last: "Can you send the worksheet?", time: "Tue", unread: 0,
  },
  "avery": {
    kind: "dm", who: "Avery Johnson", role: "10th Grade",
    portrait: { hue: 100 }, presence: "offline",
    last: "Let's study for the test", time: "Mon", unread: 0,
  },
  // Class channels
  "english10": {
    kind: "class-channel", who: "English 10 — Period 2", role: "Ms. Carter · 24 students",
    icon: "Book", color: "#8B5CF6",
    last: "Remember: Argument Essay due Friday.", time: "9:41 AM", unread: 0, pinned: true,
  },
  "alg2": {
    kind: "class-channel", who: "Alg II — Period 3", role: "Mr. Kim",
    icon: "Calculator", color: "#0EA5E9",
    last: "Quiz tomorrow — bring your calculator", time: "9:15 AM", unread: 2,
  },
  "biology101": {
    kind: "class-channel", who: "Biology 101", role: "Mrs. Lopez",
    icon: "Atom", color: "#10B981",
    last: "Lab report guidelines posted", time: "Yesterday", unread: 1,
  },
  "ushistory": {
    kind: "class-channel", who: "US History", role: "Mr. Johnson",
    icon: "Globe", color: "#F59E0B",
    last: "Reading for Thursday: Ch. 14", time: "Tue", unread: 0,
  },
  "spanish3": {
    kind: "class-channel", who: "Spanish III", role: "Sra. Martinez",
    icon: "Globe", color: "#EF4444",
    last: "Vocab quiz Monday", time: "Mon", unread: 0,
  },
  // Assignment threads
  "argument-essay": {
    kind: "assignment", who: "Argument Essay", role: "English 10 — Period 2",
    icon: "Document", color: "#8B5CF6",
    last: "Ms. Carter: Argument Essay due Fri", time: "9:21 AM", unread: 6, pinned: true, dueLine: "Due Mar 2, 11:59 PM",
  },
  "biology-lab": {
    kind: "assignment", who: "Biology Lab Report", role: "Biology 101",
    icon: "Document", color: "#10B981",
    last: "Lab report guidelines", time: "Yesterday", unread: 3, dueLine: "Due Mar 5, 11:59 PM",
  },
  // Group chats
  "history-team": {
    kind: "group", who: "History Project Team", role: "4 members",
    icon: "Team", color: "#F59E0B",
    last: "Yesterday", time: "Yesterday", unread: 4,
  },
  "study-buddies": {
    kind: "group", who: "Study Buddies", role: "6 members",
    icon: "Team", color: "#A855F7",
    last: "Feb 24", time: "Feb 24", unread: 0,
  },
  // Other classes
  "study-group-chem": {
    kind: "group", who: "Study Group — Chem", role: "5 members",
    icon: "Atom", color: "#06B6D4",
    last: "Tue", time: "Tue", unread: 3,
  },
  "robotics": {
    kind: "group", who: "Robotics Club", role: "Coach Davis",
    icon: "Tools", color: "#0EA5E9",
    last: "Feb 24", time: "Feb 24", unread: 0,
  },
  "wyn-soccer": {
    kind: "group", who: "Wyn Park Soccer", role: "Coach Hill: Practice at 3:30 today",
    icon: "Soccer", color: "#22C55E",
    last: "Coach Hill: Practice at 3:30 today", time: "Mon", unread: 4,
  },
  "biology-101-group": {
    kind: "group", who: "Biology 101 Group", role: "Mrs. Lopez: Lab report guidelines",
    icon: "Atom", color: "#10B981",
    last: "Mrs. Lopez: Lab report guidelines", time: "Yesterday", unread: 0,
  },
};

window.MessagesData = CONVS;
window.MessagesAv = Av;
window.MessagesPortrait = Portrait;
window.MessagesGroupTile = GroupTile;
window.MessagesShade = shade;

// LINKS — Home Dashboard (matched 1:1 to product mockup)

function Home({ tweaks, onAIClick }) {
  const showGamification = tweaks.gamification;

  return (
    <div style={{ padding: "28px 36px 48px", maxWidth: 1320, margin: "0 auto" }}>
      {/* 6 quick tiles row */}
      <QuickTiles />

      {/* Two-column: main content + right rail */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, marginTop: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <GreetingStatsStrip />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <TodaysSchedule />
            <UpcomingCard />
          </div>
          <ProgressOverview />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <AnnouncementsCard />
          <QuickActionsCard />
          {showGamification ? <StreaksBadgesCard /> : <GrowthSnapshotCard />}
        </div>
      </div>

      <HelperBanner onAIClick={onAIClick} />
    </div>
  );
}

/* ---------- 6 Quick Tiles ---------- */
function QuickTiles() {
  const tiles = [
    { label: "My Profile",    icon: "User",     accent: "#6D28D9" },
    { label: "My Time",       icon: "Calendar", accent: "#E07A2D" },
    { label: "My Desk",       icon: "Lamp",     accent: "#6D28D9" },
    { label: "My Team",       icon: "Team",     accent: "#2E9B62" },
    { label: "My Progress",   icon: "Trophy",   accent: "#F59E0B" },
    { label: "My Classrooms", icon: "School",   accent: "#C0392B" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
      {tiles.map((t) => {
        const IconComp = I[t.icon];
        return (
          <button key={t.label} style={{
            padding: 0,
            border: "3px solid var(--silver)",
            borderRadius: 18,
            background: "var(--paper)", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "stretch",
            transition: "transform 140ms",
            overflow: "hidden",
            boxShadow: "none",
            minHeight: 152,
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
            }}
          >
            {/* Illustration zone — pure white, single large colored glyph as placeholder */}
            <div style={{
              flex: 1,
              minHeight: 102,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "18px 0 8px",
            }}>
              <IconComp size={56} color={t.accent}/>
            </div>
            {/* Footer label w/ tiny outlined icon-chip */}
            <div style={{
              padding: "12px 14px 14px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <div style={{
                width: 18, height: 18, borderRadius: 4,
                border: "1.5px solid " + t.accent + "66",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <IconComp size={11} color={t.accent}/>
              </div>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{t.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Greeting + stat strip ---------- */
function GreetingStatsStrip() {
  const stats = [
    { icon: "Calendar",    color: "#6D28D9", label: "Classes Today",   value: "5",     sub: "Next: Algebra II", subColor: "#6D28D9" },
    { icon: "Work",        color: "#C0392B", label: "Assignments",     value: "3",     sub: "Due This Week" },
    { icon: "CircleCheck", color: "#2E9B62", label: "Attendance",      value: "96%",   sub: "This Month" },
    { icon: "Trophy",      color: "#F59E0B", label: "Points",          value: "1,250", sub: "Keep it up!" },
    { icon: "Flame",       color: "#E07A2D", label: "Day Streak",      value: "7",     sub: "You're on fire!" },
  ];
  return (
    <div className="card" style={{ padding: "22px 26px" }}>
      {/* Greeting row — three columns: greeting / quote / spacer */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr auto", gap: 24,
        alignItems: "center", marginBottom: 18,
      }}>
        <div>
          <div style={{
            fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700,
            color: "#3B1A6B", letterSpacing: "-0.01em",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            Good morning, Alex! <span style={{ fontSize: 26 }} aria-hidden>👋</span>
          </div>
          <div style={{ color: "var(--stone)", fontSize: 13.5, marginTop: 4 }}>
            You've got a full day of learning ahead. Let's make it great!
          </div>
        </div>
        <div style={{
          maxWidth: 240,
          textAlign: "center",
          color: "var(--slate)", fontStyle: "italic", lineHeight: 1.5,
          fontSize: 12.5,
        }}>
          <div>"Small steps every day<br/>lead to big things."</div>
          <div style={{ marginTop: 4, color: "#E07A2D", fontWeight: 600, fontStyle: "normal", fontSize: 11.5 }}>
            — Keep going!
          </div>
        </div>
      </div>

      {/* Stats — 5 in a row, soft grey-fill rounded rects, no border */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
        {stats.map((s) => {
          const IconComp = I[s.icon];
          return (
            <div key={s.label} style={{
              padding: "8px 4px",
              background: "transparent",
              borderRadius: 14,
              border: "none",
              display: "flex", alignItems: "center", gap: 10,
              minWidth: 0,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: s.color + "1F",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <IconComp size={18} color={s.color}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div className="t-num" style={{
                  fontSize: 24, fontWeight: 700, color: "var(--ink)",
                  lineHeight: 1, fontFamily: "var(--font-display)",
                }}>{s.value}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--slate)", marginTop: 5, lineHeight: 1.2, whiteSpace: "nowrap" }}>{s.label}</div>
                <div style={{ fontSize: 10.5, color: s.subColor || "var(--stone)", marginTop: 2, lineHeight: 1.3, whiteSpace: "nowrap", fontWeight: s.subColor ? 600 : 400 }}>{s.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Today's Schedule ---------- */
function TodaysSchedule() {
  const periods = [
    { n: 1, time: "8:15 AM",  subject: "Algebra II",  room: "Room 203", state: "in-progress" },
    { n: 2, time: "9:10 AM",  subject: "English 10",  room: "Room 105", state: "next" },
    { n: 3, time: "10:20 AM", subject: "Biology",     room: "Room 310" },
    { n: 4, time: "11:15 AM", subject: "US History",  room: "Room 204" },
    { n: 5, time: "1:00 PM",  subject: "Spanish III", room: "Room 112" },
  ];

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.Calendar size={16} color="var(--student)"/>
          <div className="t-h2" style={{ fontSize: 15 }}>Today's Schedule</div>
        </div>
        <div className="t-caption" style={{ fontSize: 11.5 }}>Friday, February 28</div>
      </div>
      <div>
        {periods.map((p, idx) => {
          const inProgress = p.state === "in-progress";
          const isNext = p.state === "next";
          return (
    <div style={{
      padding: "10px 18px",
      display: "grid", gridTemplateColumns: "28px 56px 1fr auto",
      alignItems: "center", gap: 10,
      borderBottom: idx < periods.length - 1 ? "1px solid var(--mist)" : "none",
      background: "transparent",
    }} key={p.n}>
              {/* Period number chip */}
              <div className="t-num" style={{
                fontSize: 12.5, fontWeight: 700,
                color: "var(--slate)",
                width: 26, height: 26, borderRadius: 7,
                background: "#F2F2F6",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{p.n}</div>
              {/* Time chip */}
              <div style={{
                fontSize: 10.5, fontWeight: 600,
                color: "var(--slate)",
                padding: "4px 6px", borderRadius: 7,
                background: "#F2F2F6",
                textAlign: "center", fontFamily: "var(--font-ui)",
                whiteSpace: "nowrap",
              }}>{p.time}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{p.subject}</div>
                <div className="t-caption" style={{ marginTop: 1, fontSize: 11 }}>{p.room}</div>
              </div>
              <div>
                {inProgress && (
                  <span className="pill" style={{ fontSize: 10, background: "#DCF3E5", color: "#1F7A47", border: "none", whiteSpace: "nowrap", padding: "3px 8px" }}>
                    <span style={{ width: 5, height: 5, borderRadius: 999, background: "#2E9B62", display: "inline-block", marginRight: 4 }}/>
                    In Progress
                  </span>
                )}
                {isNext && (
                  <span className="pill" style={{ fontSize: 10, background: "#FCE6D2", color: "#B65A1A", border: "none", whiteSpace: "nowrap", padding: "3px 8px" }}>
                    Next Up
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ padding: "10px 20px", borderTop: "1px solid var(--mist)", textAlign: "center" }}>
        <button className="btn btn-sm btn-ghost" style={{ color: "var(--student-deep)", fontWeight: 600, padding: 0, whiteSpace: "nowrap" }}>
          View Full Schedule <I.ChevronRight size={12} color="var(--student-deep)"/>
        </button>
      </div>
    </div>
  );
}

/* ---------- Upcoming (tabs) ---------- */
function UpcomingCard() {
  const [tab, setTab] = React.useState("Assignments");
  const data = {
    Assignments: [
      { title: "Algebra II Problem Set 8.3", sub: "Due Tomorrow, 11:59 PM", priority: "High" },
      { title: "English Essay Draft",        sub: "Due Mon, Mar 3",         priority: "Medium" },
      { title: "Biology Lab Report",         sub: "Due Wed, Mar 5",         priority: "Low" },
    ],
    Events: [
      { title: "Science Fair signup deadline", sub: "Mar 7",  priority: "Medium" },
      { title: "Spring band concert",          sub: "Mar 12", priority: "Low" },
    ],
    Deadlines: [
      { title: "Course selection — junior year", sub: "Mar 21", priority: "High" },
    ],
  };
  const priorityPill = { High: "pill-error", Medium: "pill-warning", Low: "pill-success" };

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <I.Pin size={16} color="var(--student)"/>
          <div className="t-h2" style={{ fontSize: 15 }}>Upcoming</div>
        </div>
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--mist)" }}>
          {Object.keys(data).map((t) => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "8px 12px", border: "none",
              background: "transparent",
              color: tab === t ? "var(--student-deep)" : "var(--stone)",
              fontSize: 12.5, fontWeight: tab === t ? 600 : 500,
              borderBottom: tab === t ? "2px solid var(--student)" : "2px solid transparent",
              marginBottom: -1, cursor: "pointer",
            }}>{t}</button>
          ))}
        </div>
      </div>
      <div>
        {data[tab].map((it, i) => (
          <div key={i} style={{
            padding: "12px 20px",
            borderBottom: i < data[tab].length - 1 ? "1px solid var(--mist)" : "none",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "var(--surface-quiet)",
              border: "1px solid var(--mist)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <I.Work size={13} color="var(--stone)"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="truncate" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{it.title}</div>
              <div className="t-caption" style={{ fontSize: 11.5, marginTop: 1 }}>{it.sub}</div>
            </div>
            <span className={"pill " + priorityPill[it.priority]} style={{ fontSize: 10.5 }}>{it.priority}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: "10px 20px", borderTop: "1px solid var(--mist)", textAlign: "center" }}>
        <button className="btn btn-sm btn-ghost" style={{ color: "var(--student-deep)", fontWeight: 600, padding: 0, whiteSpace: "nowrap" }}>
          View All {tab} <I.ChevronRight size={12} color="var(--student-deep)"/>
        </button>
      </div>
    </div>
  );
}

/* ---------- Progress Overview (donut + trend line) ---------- */
function ProgressOverview() {
  const grades = [
    { letter: "A", count: 4, color: "#2E9B62", label: "Classes" },
    { letter: "B", count: 1, color: "#3B82F6", label: "Class" },
    { letter: "C", count: 0, color: "#1E6F8C", label: "Classes" },
    { letter: "D", count: 0, color: "#E07A2D", label: "Classes" },
    { letter: "F", count: 0, color: "#C0392B", label: "Classes" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.ChartBar size={16} color="var(--student)"/>
          <div className="t-h2" style={{ fontSize: 15 }}>My Progress Overview</div>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 20, padding: "20px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Donut value={3.6} max={4.0}/>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {grades.map((g) => (
              <div key={g.letter} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: g.color }}/>
                <span style={{ fontWeight: 700, color: "var(--ink)", width: 14 }}>{g.letter}</span>
                <span className="t-num" style={{ color: "var(--stone)" }}>{g.count} {g.label}</span>
              </div>
            ))}
          </div>
        </div>
        <TrendChart/>
      </div>
    </div>
  );
}

function Donut({ value, max }) {
  const pct = value / max;
  const r = 56, c = 2 * Math.PI * r;
  const greenDash = (pct - 0.05) * c;
  const orangeDash = 0.05 * c;
  return (
    <div style={{ position: "relative", width: 140, height: 140 }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={r} stroke="#E8E8EE" strokeWidth="14" fill="none"/>
        {/* Main green arc */}
        <circle cx="70" cy="70" r={r}
          stroke="#2E9B62" strokeWidth="14" fill="none"
          strokeDasharray={`${greenDash} ${c - greenDash}`}
          strokeDashoffset={c / 4}
          transform="rotate(-90 70 70)"
          strokeLinecap="butt"
        />
        {/* Small orange accent slice at the top */}
        <circle cx="70" cy="70" r={r}
          stroke="#E07A2D" strokeWidth="14" fill="none"
          strokeDasharray={`${orangeDash} ${c - orangeDash}`}
          strokeDashoffset={c / 4 - greenDash}
          transform="rotate(-90 70 70)"
          strokeLinecap="butt"
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div className="t-num" style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{value}</div>
        <div style={{ fontSize: 10.5, color: "var(--stone)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>GPA</div>
      </div>
    </div>
  );
}

function TrendChart() {
  const points = [3.2, 3.3, 3.35, 3.5, 3.45, 3.6];
  const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  const max = 4.0, min = 1.0;
  const w = 460, h = 160, padL = 28, padR = 8, padT = 14, padB = 22;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const xs = points.map((_, i) => padL + (i / (points.length - 1)) * innerW);
  const ys = points.map((v) => padT + (1 - (v - min) / (max - min)) * innerH);

  const path = points.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${ys[i]}`).join(" ");
  const area = `${path} L ${xs[xs.length - 1]} ${padT + innerH} L ${xs[0]} ${padT + innerH} Z`;

  return (
    <div>
      <div style={{ marginBottom: 6 }}>
        <div className="t-h3" style={{ fontSize: 13 }}>Grade Trend</div>
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
        {[1.0, 2.0, 3.0, 4.0].map((g) => {
          const y = padT + (1 - (g - min) / (max - min)) * innerH;
          return (
            <g key={g}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--mist)" strokeDasharray="2 4"/>
              <text x={padL - 6} y={y + 3} fontSize="9.5" fill="var(--silver)" textAnchor="end" fontFamily="var(--font-ui)">{g.toFixed(1)}</text>
            </g>
          );
        })}
        <path d={area} fill="var(--student)" opacity="0.10"/>
        <path d={path} fill="none" stroke="var(--student)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        {points.map((_, i) => (
          <circle key={i} cx={xs[i]} cy={ys[i]} r="4" fill="var(--student)" stroke="var(--paper)" strokeWidth="2"/>
        ))}
        {labels.map((l, i) => (
          <text key={l} x={xs[i]} y={h - 4} fontSize="10" fill="var(--stone)" textAnchor="middle" fontFamily="var(--font-ui)">{l}</text>
        ))}
      </svg>
    </div>
  );
}

/* ---------- Right rail: Announcements ---------- */
function AnnouncementsCard() {
  const items = [
    { title: "Schedule Update", body: "There will be no school on Monday, March 3rd.", time: "2h ago" },
    { title: "Science Fair",    body: "Sign up by March 7th to participate in the annual science fair!", time: "1d ago" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: "#FBEFE2",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.Bell size={13} color="#E07A2D"/>
          </div>
          <div className="t-h2" style={{ fontSize: 14 }}>Announcements</div>
        </div>
        <button className="btn btn-sm btn-ghost" style={{ fontSize: 11, padding: "0 6px", color: "var(--student)", fontWeight: 600, whiteSpace: "nowrap" }}>View All</button>
      </div>
      <div style={{ padding: "6px 14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((a, i) => (
          <div key={i} style={{
            padding: "12px 14px",
            background: "#F4F4F8",
            borderRadius: 12,
          }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", flex: 1, minWidth: 0 }}>{a.title}</span>
              <span className="t-caption no-wrap" style={{ fontSize: 10.5, flexShrink: 0, color: "var(--silver)" }}>{a.time}</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--slate)", lineHeight: 1.5 }}>{a.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Right rail: Quick Actions ---------- */
function QuickActionsCard() {
  const actions = [
    { label: "Submit Assignment", icon: "Work",     bg: "#6D28D9" },
    { label: "Join Classroom",    icon: "Classes",  bg: "#1E6F8C" },
    { label: "Ask AI Assistant",  icon: "Sparkle",  bg: "#2E9B62" },
    { label: "Message Teacher",   icon: "Messages", bg: "#E07A2D" },
    { label: "View Grades",       icon: "ChartBar", bg: "#0EA5C0" },
    { label: "School Library",    icon: "Book",     bg: "#8E3E8E" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: "#FFF7ED",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.Flame size={13} color="#E07A2D"/>
          </div>
          <div className="t-h2" style={{ fontSize: 14 }}>Quick Actions</div>
        </div>
      </div>
      <div style={{ padding: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {actions.map((a) => {
          const IconComp = I[a.icon];
          return (
            <button key={a.label} style={{
              padding: "14px 6px",
              background: a.bg,
              backgroundImage: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 50%)",
              color: "white",
              border: "none",
              borderRadius: 14,
              cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              transition: "transform 120ms, box-shadow 120ms",
              minHeight: 84,
              boxShadow: "0 4px 10px -4px " + a.bg + "66, inset 0 1px 0 rgba(255,255,255,0.16)",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 6px 14px -4px " + a.bg + "88, inset 0 1px 0 rgba(255,255,255,0.16)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 4px 10px -4px " + a.bg + "66, inset 0 1px 0 rgba(255,255,255,0.16)"; }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: 999,
                background: "rgba(255,255,255,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconComp size={16} color="white"/>
              </div>
              <span style={{ fontSize: 10.5, fontWeight: 600, lineHeight: 1.2, textAlign: "center", maxWidth: 80 }}>{a.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Right rail: Streaks & Badges ---------- */
function StreaksBadgesCard() {
  const items = [
    { icon: "Flame",  label: "7 Day Streak",       iconColor: "#E07A2D", shieldFill: "#FFE7CC", shieldBorder: "#E07A2D" },
    { icon: "Book",   label: "Math Master",        iconColor: "#6D28D9", shieldFill: "#EDE5FB", shieldBorder: "#6D28D9" },
    { icon: "Star",   label: "Perfect Attendance", iconColor: "#F59E0B", shieldFill: "#D5EAEC", shieldBorder: "#1E6F8C" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 22, height: 22, borderRadius: 6,
            background: "#E5EEFB",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.Settings size={13} color="#3B82F6"/>
          </div>
          <div className="t-h2" style={{ fontSize: 14 }}>Streaks &amp; Badges</div>
        </div>
        <button className="btn btn-sm btn-ghost" style={{ fontSize: 11, padding: "0 6px", color: "var(--student)", fontWeight: 600, whiteSpace: "nowrap" }}>View All</button>
      </div>
      <div style={{ padding: "4px 14px 18px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
        {items.map((b) => {
          const IconComp = I[b.icon];
          return (
            <div key={b.label} style={{
              padding: "6px 4px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            }}>
              {/* Shield-shaped badge */}
              <div style={{ position: "relative", width: 60, height: 68 }}>
                <svg width="60" height="68" viewBox="0 0 60 68" style={{ filter: "drop-shadow(0 2px 4px rgba(15,23,42,0.12))" }}>
                  <path
                    d="M30 2 L54 10 L54 36 C54 50 42 60 30 66 C18 60 6 50 6 36 L6 10 Z"
                    fill={b.shieldFill}
                    stroke={b.shieldBorder}
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </svg>
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  paddingTop: 4,
                }}>
                  <IconComp size={26} color={b.iconColor}/>
                </div>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", textAlign: "center", lineHeight: 1.25 }}>{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Right rail: Growth Snapshot (alt for gamification OFF) ---------- */
function GrowthSnapshotCard() {
  const skills = [
    { name: "Writing & Composition", level: 4, max: 9, trend: "+1" },
    { name: "Algebraic Reasoning",   level: 6, max: 9, trend: "+0.5" },
    { name: "Scientific Inquiry",    level: 5, max: 9, trend: "stable" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--mist)" }}>
        <div className="t-h2" style={{ fontSize: 14 }}>My Growth</div>
        <span className="t-caption" style={{ fontSize: 10 }}>9-pt scale</span>
      </div>
      <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
        {skills.map((s) => (
          <div key={s.name}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500, flex: 1, minWidth: 0 }}>{s.name}</span>
              <span className="t-num no-wrap" style={{ fontSize: 11, color: "var(--stone)", flexShrink: 0 }}>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{s.level}</span>/{s.max}
                <span style={{ marginLeft: 6, color: s.trend.startsWith("+") ? "var(--success)" : "var(--silver)", fontWeight: 600 }}>{s.trend}</span>
              </span>
            </div>
            <div style={{ display: "flex", gap: 2 }}>
              {Array.from({ length: s.max }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 5, borderRadius: 2, background: i < s.level ? "var(--student)" : "var(--mist)" }}/>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Helper banner ---------- */
function HelperBanner({ onAIClick }) {
  return (
    <div style={{
      marginTop: 20,
      padding: "16px 16px 16px 24px",
      background: "#EFE9F9",
      border: "none",
      borderRadius: 999,
      boxShadow: "var(--shadow-card)",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
      gap: 14,
    }}>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: "#3B1A6B", marginBottom: 2, fontFamily: "var(--font-display)" }}>
          Need help with something?
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>
          Your AI Personal Assistant is here to help you learn, plan, and succeed.
        </div>
      </div>
      <button
        onClick={onAIClick}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          height: 46, padding: "0 24px",
          background: "#3B1A6B", color: "#fff",
          border: "none", borderRadius: 999,
          fontWeight: 600, fontSize: 13.5, cursor: "pointer",
          transition: "background 120ms",
          boxShadow: "0 4px 12px -4px rgba(59,26,107,0.5)",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "#2A1250"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "#3B1A6B"; }}
      >
        <I.Sparkle size={15} color="#fff"/> Chat with AI Assistant
      </button>
    </div>
  );
}

window.Home = Home;

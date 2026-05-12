/* ============================================================
   MY TO DO — high-fidelity rebuild
   Routes:
     /my-todo                    → Focus tab + AI Assistant rail (default)
     /my-todo/ai-suggested       → Focus tab + AI Suggested Tasks rail
     /my-todo/all                → All Tasks tab
     /my-todo/completed          → Completed tab
     /my-todo/archived           → Archived tab
   ============================================================ */

const TD_COURSE_ICON = {
  "English 10":   { Icon: I.Book,       bg: "#EEF2FF", fg: "#6366F1" },
  "English Lit":  { Icon: I.Book,       bg: "#EEF2FF", fg: "#6366F1" },
  "Biology 101":  { Icon: I.Atom,     bg: "#FEF3F2", fg: "#E04C4C" },
  "Biology":      { Icon: I.Atom,     bg: "#FEF3F2", fg: "#E04C4C" },
  "Algebra II":   { Icon: I.Calendar,   bg: "#FFF7ED", fg: "#EA8C2A" },
  "US History":   { Icon: I.Book,       bg: "#EFF6FF", fg: "#3B82F6" },
  "Chemistry":    { Icon: I.Atom,       bg: "#FDF2F8", fg: "#DB2777" },
  "Spanish II":   { Icon: I.MessageCircle, bg: "#F0FDF4", fg: "#16A34A" },
  "Spanish III":  { Icon: I.MessageCircle, bg: "#F0FDF4", fg: "#16A34A" },
  "Portfolio":    { Icon: I.Folder,     bg: "#F5F3FF", fg: "#7C3AED" },
};

const TD_FOCUS_TASKS = [
  {
    id: 1, title: "Finish Argument Essay", course: "English 10",
    priority: "High", priorityTone: "high",
    due: "Due Today, 11:59 PM",
    est: "45 min",
    bestTime: { label: "Today", slot: "Flex Block", time: "10:40 – 11:20 AM", tone: "violet" },
  },
  {
    id: 2, title: "Review Biology Notes", course: "Biology 101",
    priority: "Medium", priorityTone: "med",
    due: "Study for quiz on Friday",
    est: "20 min",
    bestTime: { label: "Today", slot: "After Lunch", time: "12:30 – 1:00 PM", tone: "green" },
  },
  {
    id: 3, title: "Submit Math Homework", course: "Algebra II",
    priority: "High", priorityTone: "high",
    due: "Due Today, 3:00 PM",
    est: "30 min",
    bestTime: { label: "Today", slot: "Between Periods", time: "1:20 – 1:50 PM", tone: "amber" },
  },
  {
    id: 4, title: "Read Chapter 4", course: "US History",
    priority: "Low", priorityTone: "low",
    due: "20 pages",
    est: "30 min",
    bestTime: { label: "Saturday", slot: "Morning", tone: "blue" },
  },
  {
    id: 5, title: "Prepare for Chem Lab", course: "Chemistry",
    priority: "Medium", priorityTone: "med",
    due: "Lab on Thursday",
    est: "25 min",
    bestTime: { label: "Tomorrow", slot: "Flex Block", time: "10:40 – 11:20 AM", tone: "pink" },
  },
];

const TD_UPCOMING = [
  { when: "Tomorrow",    time: "10:40 AM",  title: "Study for Bio Quiz",   course: "Biology 101", icon: "Atom" },
  { when: "Thu, May 15", time: "11:59 PM",  title: "Lab Report",           course: "Chemistry",   icon: "Atom" },
  { when: "Fri, May 16", time: "3:00 PM",   title: "Spanish Vocab Quiz",   course: "Spanish II",  icon: "MessageCircle" },
  { when: "Sun, May 18", time: "All Day",   title: "History Project",     course: "US History",  icon: "Book" },
  { when: "Mon, May 19", time: "9:00 AM",   title: "Peer Review",          course: "Argument Essay", icon: "Edit" },
];

const TD_AI_SUGGESTED = [
  {
    id: "s1", kind: "Assignments", title: "Research Sources for Essay",
    course: "English 10", due: "Due Fri, May 16",
    rationale: "Teacher mentioned bringing 2 sources to class tomorrow.",
    est: "30 min", icon: "Book", tone: { bg: "#EEF2FF", fg: "#6366F1" },
  },
  {
    id: "s2", kind: "Assignments", title: "Chemistry Lab Report",
    course: "Chemistry", due: "Due Thu, May 22",
    rationale: "Lab reports are usually started 3–4 days early.",
    est: "1h 15m", icon: "Atom", tone: { bg: "#FDF2F8", fg: "#DB2777" },
  },
  {
    id: "s3", kind: "Exams", title: "Biology Quiz",
    course: "Biology 101", due: "Next Fri, May 23",
    rationale: "Past quizzes show better scores with review 2–3 days ahead.",
    est: "40 min", icon: "Atom", tone: { bg: "#FEF3F2", fg: "#E04C4C" },
  },
  {
    id: "s4", kind: "Events", title: "Study Session with Jordan",
    course: "Event", due: "Tomorrow, 3:30 PM",
    rationale: "You both have Flex Block at the same time.",
    est: "1h", icon: "Calendar", tone: { bg: "#FFF7ED", fg: "#EA8C2A" },
  },
];

/* ============================================================
   Small atoms
   ============================================================ */
function TD_PriorityTag({ tone, children }) {
  const palette = {
    high: { bg: "#FEE4E2", fg: "#B42318" },
    med:  { bg: "#FEF0C7", fg: "#B54708" },
    low:  { bg: "#DBEAFE", fg: "#1D4ED8" },
  }[tone] || { bg: "#F2F4F7", fg: "#475467" };
  return (
    <span style={{
      fontSize: 10.5, fontWeight: 700, padding: "2px 8px",
      borderRadius: 999, background: palette.bg, color: palette.fg,
      letterSpacing: 0.2, textTransform: "none",
    }}>{children}</span>
  );
}

function TD_BestTimeChip({ best }) {
  const tones = {
    violet: { bg: "#F5F3FF", border: "#DDD6FE", fg: "#5B21B6" },
    green:  { bg: "#F0FDF4", border: "#BBF7D0", fg: "#166534" },
    amber:  { bg: "#FFF7ED", border: "#FED7AA", fg: "#9A3412" },
    blue:   { bg: "#EFF6FF", border: "#BFDBFE", fg: "#1E40AF" },
    pink:   { bg: "#FDF2F8", border: "#FBCFE8", fg: "#9D174D" },
  }[best.tone] || { bg: "#F8FAFC", border: "#E2E8F0", fg: "#475569" };
  return (
    <div style={{
      background: tones.bg, border: `1px solid ${tones.border}`,
      borderRadius: 10, padding: "8px 12px", minWidth: 168,
    }}>
      <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 2 }}>
        Best time: <span style={{ color: tones.fg, fontWeight: 600 }}>{best.label}</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{best.slot}</div>
      {best.time && <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 1 }}>{best.time}</div>}
    </div>
  );
}

function TD_FocusRow({ task, onStart }) {
  const ci = TD_COURSE_ICON[task.course] || { Icon: I.Book, bg: "#F2F4F7", fg: "#475467" };
  const Ico = ci.Icon;
  const [done, setDone] = React.useState(false);
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "44px 1fr auto auto auto",
      gap: 14, alignItems: "center",
      padding: "14px 16px",
      background: "var(--paper)",
      border: "1px solid var(--mist)",
      borderRadius: 12,
      opacity: done ? 0.55 : 1,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 9,
        background: ci.bg, color: ci.fg,
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Ico size={18} color={ci.fg}/>
      </div>

      <div style={{ minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--ink)", textDecoration: done ? "line-through" : "none" }}>
            {task.title}
          </span>
          <TD_PriorityTag tone={task.priorityTone}>{task.priority}</TD_PriorityTag>
        </div>
        <div style={{ fontSize: 12, color: "var(--stone)" }}>
          {task.course} <span style={{ color: "var(--silver)" }}>·</span> {task.due}
        </div>
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", textAlign: "right", minWidth: 56 }}>
        {task.est}
      </div>

      <TD_BestTimeChip best={task.bestTime}/>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <button
          onClick={onStart}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "6px 12px", borderRadius: 8,
            border: "1px solid var(--mist)", background: "var(--paper)",
            color: "var(--student-deep)", fontWeight: 600, fontSize: 12.5,
            cursor: "pointer",
          }}>
          <I.PlayCircle size={13} color="var(--student)"/> Start Now
        </button>
        <button
          onClick={() => setDone(!done)}
          aria-label="Mark done"
          style={{
            width: 26, height: 26, borderRadius: 6,
            border: done ? "none" : "1.5px solid var(--silver)",
            background: done ? "var(--success)" : "transparent",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
          {done && <I.Check size={13} color="#fff"/>}
        </button>
        <button aria-label="More" style={{
          width: 26, height: 26, borderRadius: 6, background: "transparent",
          border: "none", cursor: "pointer", color: "var(--silver)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 18, lineHeight: 1, letterSpacing: 1 }}>⋮</span>
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   AI Plan stat strip (Focus tab top row)
   ============================================================ */
function TD_StatStrip() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr 1fr 1.2fr",
      gap: 12, marginBottom: 18,
    }}>
      {/* AI Plan */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: "#F5F3FF", color: "#7C3AED",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}><I.Sparkle size={17} color="#7C3AED"/></div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>AI Plan for Today</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4 }}>
            You're on track to complete all high priority tasks.
          </div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3, marginTop: 4 }}>
            View plan <I.ChevronRight size={11} color="var(--student-deep)"/>
          </a>
        </div>
      </div>

      {/* On Track ring */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 14,
      }}>
        <TD_Ring pct={78} size={56} stroke={6} color="var(--success)"/>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>78%</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>On Track</div>
        </div>
      </div>

      {/* Workload */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: "#FEF3C7", color: "#B45309",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}><I.Clock size={17} color="#B45309"/></div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Workload</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ flex: 1, height: 5, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: "55%", background: "linear-gradient(90deg, #FBBF24, #F59E0B)" }}/>
            </div>
            <span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)" }}>Moderate</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 3 }}>5 tasks · ~2h 15m</div>
        </div>
      </div>

      {/* Next Free Block */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, padding: "14px 16px",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: "#EFF6FF", color: "#1D4ED8",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}><I.Calendar size={17} color="#1D4ED8"/></div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>Next Free Block</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4 }}>
            Today · 10:40 – 11:20 AM · <span style={{ color: "var(--ink)", fontWeight: 600 }}>Flex Block</span>
          </div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 3, marginTop: 3 }}>
            Find best time for tasks
          </a>
        </div>
      </div>
    </div>
  );
}

function TD_Ring({ pct, size = 60, stroke = 6, color = "var(--success)" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E2E8F0" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={`${dash} ${c-dash}`} strokeDashoffset={c/4} strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
    </svg>
  );
}

/* ============================================================
   Upcoming carousel (Next 7 Days)
   ============================================================ */
function TD_Upcoming() {
  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 12, padding: 16, marginTop: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
            Upcoming (Next 7 Days)
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <a href="#" style={{ fontSize: 12, fontWeight: 600, color: "var(--student-deep)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
            <I.Calendar size={12} color="var(--student-deep)"/> View Calendar
          </a>
          <button style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--mist)", background: "var(--paper)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <I.ChevronLeft size={11} color="var(--stone)"/>
          </button>
          <button style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid var(--mist)", background: "var(--paper)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <I.ChevronRight size={11} color="var(--stone)"/>
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
        {TD_UPCOMING.map((u, i) => {
          const ci = TD_COURSE_ICON[u.course] || { Icon: I[u.icon] || I.Book, bg: "#F2F4F7", fg: "#475467" };
          const Ico = I[u.icon] || ci.Icon;
          return (
            <div key={i} style={{
              border: "1px solid var(--mist)", borderRadius: 10,
              padding: "10px 12px",
              background: "#FCFCFD",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: "var(--ink)" }}>{u.when}</span>
                <span>{u.time}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 7,
                  background: ci.bg, color: ci.fg,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}><Ico size={13} color={ci.fg}/></div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.title}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>{u.course}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   Right rail variants
   ============================================================ */
function TD_RightRail_AIAssistant({ navigate }) {
  return (
    <>
      {/* AI Assistant card */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <I.Sparkle size={14} color="var(--student)"/>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Assistant</span>
          <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#F5F3FF", color: "#5B21B6" }}>BETA</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginBottom: 12 }}>Hi Alex! Here's what I see.</div>

        <div style={{
          background: "linear-gradient(135deg, #F5F3FF 0%, #EEF2FF 100%)",
          border: "1px solid #DDD6FE", borderRadius: 10,
          padding: 12, marginBottom: 12,
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <I.Clock size={13} color="#7C3AED"/>
            </div>
            <div style={{ fontSize: 12, color: "var(--ink)", lineHeight: 1.45 }}>
              You have a <b>40 min Flex Block</b> coming up. Want help choosing the best way to use it?
            </div>
          </div>
          <button style={{
            width: "100%", padding: "7px 12px", borderRadius: 8,
            background: "var(--paper)", color: "var(--student-deep)",
            fontWeight: 600, fontSize: 12, border: "1px solid #DDD6FE",
            cursor: "pointer",
          }}>Get Suggestions</button>
        </div>

        {[
          { icon: "Edit",       bg: "#FEF3F2", fg: "#E04C4C", title: "Break down Argument Essay", sub: "Create a step-by-step plan" },
          { icon: "Search",     bg: "#F0FDF4", fg: "#16A34A", title: "Find a study space",       sub: "Quiet spaces available now" },
          { icon: "Team",      bg: "#FFF7ED", fg: "#EA8C2A", title: "Start a study session",    sub: "Invite friends to join" },
        ].map((t, i) => {
          const Ico = I[t.icon] || I.Sparkle;
          return (
            <a key={i} href="#" style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 4px", textDecoration: "none",
              borderTop: i === 0 ? "1px solid var(--mist)" : "none",
              borderBottom: "1px solid var(--mist)",
            }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: t.bg, display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ico size={14} color={t.fg}/>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{t.title}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{t.sub}</div>
              </div>
              <I.ChevronRight size={12} color="var(--silver)"/>
            </a>
          );
        })}

        <a href="#" onClick={(e) => { e.preventDefault(); navigate && navigate(["my-todo", "ai-suggested"]); }}
          style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "var(--student-deep)", textDecoration: "none", marginTop: 10 }}>
          More AI tools <I.ChevronRight size={11} color="var(--student-deep)"/>
        </a>
      </div>

      {/* Your Progress */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Your Progress</span>
          <select style={{ fontSize: 11, padding: "3px 6px", borderRadius: 5, border: "1px solid var(--mist)", background: "var(--paper)", color: "var(--stone)" }}>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <TD_Ring pct={78} size={92} stroke={9} color="var(--success)"/>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div><div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>14</div><div style={{ fontSize: 11, color: "var(--stone)" }}>Completed</div></div>
            <div><div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>4</div><div style={{ fontSize: 11, color: "var(--stone)" }}>In Progress</div></div>
            <div><div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>6</div><div style={{ fontSize: 11, color: "var(--stone)" }}>Remaining</div></div>
          </div>
        </div>
      </div>

      {/* Quick Add */}
      <TD_QuickAdd/>
    </>
  );
}

function TD_QuickAdd() {
  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Quick Add</div>
      <div style={{
        position: "relative",
        border: "1px solid var(--mist)", borderRadius: 9,
        padding: "8px 32px 8px 12px", marginBottom: 6,
      }}>
        <input
          placeholder="What do you need to do?"
          style={{
            width: "100%", border: "none", outline: "none",
            fontSize: 12.5, color: "var(--ink)", background: "transparent",
          }}
        />
        <button style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 22, height: 22, borderRadius: 5, border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <I.Mic size={13} color="var(--silver)"/>
        </button>
      </div>
      <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 10 }}>AI will help you add it with a due date and time.</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <button style={{
          padding: "8px 10px", borderRadius: 8,
          background: "var(--student)", color: "#fff",
          border: "none", fontWeight: 600, fontSize: 12,
          cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>Add Task <I.Plus size={11} color="#fff"/></button>
        <button style={{
          padding: "8px 10px", borderRadius: 8,
          background: "var(--paper)", color: "var(--ink)",
          border: "1px solid var(--mist)", fontWeight: 600, fontSize: 12,
          cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}><I.Folder size={11} color="var(--stone)"/> Add from Assignment</button>
      </div>
    </div>
  );
}

function TD_RightRail_Suggested({ navigate }) {
  const [filter, setFilter] = React.useState("All");
  const counts = { All: TD_AI_SUGGESTED.length, Assignments: TD_AI_SUGGESTED.filter(t => t.kind === "Assignments").length, Exams: TD_AI_SUGGESTED.filter(t => t.kind === "Exams").length, Events: TD_AI_SUGGESTED.filter(t => t.kind === "Events").length };
  const filtered = filter === "All" ? TD_AI_SUGGESTED : TD_AI_SUGGESTED.filter(t => t.kind === filter);

  return (
    <>
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <I.Sparkle size={14} color="var(--student)"/>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Suggested Tasks</span>
            <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#F5F3FF", color: "#5B21B6" }}>BETA</span>
          </div>
          <button onClick={() => navigate && navigate(["my-todo"])}
            aria-label="Close suggestions"
            style={{ width: 24, height: 24, borderRadius: 6, border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <I.X size={13} color="var(--silver)"/>
          </button>
        </div>
        <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 12 }}>
          Detected from your classes, messages, and calendar.
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
          {["All", "Assignments", "Exams", "Events"].map((k) => (
            <button key={k} onClick={() => setFilter(k)}
              style={{
                padding: "5px 10px", borderRadius: 999,
                fontSize: 11.5, fontWeight: 600,
                border: filter === k ? "1px solid var(--student)" : "1px solid var(--mist)",
                background: filter === k ? "var(--student)" : "var(--paper)",
                color: filter === k ? "#fff" : "var(--stone)",
                cursor: "pointer",
              }}>
              {k} ({counts[k]})
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((s) => {
            const Ico = I[s.icon] || I.Book;
            return (
              <div key={s.id} style={{ borderTop: "1px solid var(--mist)", paddingTop: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 7,
                    background: s.tone.bg, color: s.tone.fg,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}><Ico size={15} color={s.tone.fg}/></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>{s.title}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 4 }}>
                      {s.course} <span style={{ color: "var(--silver)" }}>·</span> {s.due}
                    </div>
                    <div style={{ fontSize: 11.5, color: "var(--slate)", lineHeight: 1.4, marginBottom: 8 }}>
                      {s.rationale}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 11, color: "var(--stone)" }}>Est. time: <b style={{ color: "var(--ink)" }}>{s.est}</b></span>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button style={{
                          padding: "5px 12px", borderRadius: 7,
                          background: "var(--student)", color: "#fff",
                          border: "none", fontWeight: 600, fontSize: 11.5,
                          cursor: "pointer",
                        }}>Add</button>
                        <button style={{
                          padding: "5px 12px", borderRadius: 7,
                          background: "var(--paper)", color: "var(--stone)",
                          border: "1px solid var(--mist)", fontWeight: 600, fontSize: 11.5,
                          cursor: "pointer",
                        }}>Dismiss</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <a href="#" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
          fontSize: 12, fontWeight: 600, color: "var(--student-deep)",
          textDecoration: "none", marginTop: 14, padding: 6,
        }}>
          Show 2 more suggestions <I.ChevronDown size={11} color="var(--student-deep)"/>
        </a>
      </div>

      {/* Smart Add */}
      <div style={{
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)",
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>Smart Add</div>
        <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 8 }}>Tell AI what you want to get done.</div>
        <div style={{
          position: "relative",
          border: "1px solid var(--mist)", borderRadius: 9,
          padding: "8px 32px 8px 12px", marginBottom: 8,
        }}>
          <input
            placeholder="Example: Study for physics test on Friday"
            style={{ width: "100%", border: "none", outline: "none", fontSize: 12, color: "var(--ink)", background: "transparent" }}
          />
          <button style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 22, height: 22, borderRadius: 5, border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <I.Mic size={13} color="var(--silver)"/>
          </button>
        </div>
        <button style={{
          width: "100%", padding: "8px 10px", borderRadius: 8,
          background: "var(--student)", color: "#fff",
          border: "none", fontWeight: 600, fontSize: 12,
          cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 4,
        }}><I.Sparkle size={11} color="#fff"/> Add with AI</button>
        <div style={{ fontSize: 10.5, color: "var(--silver)", textAlign: "center", marginBottom: 12 }}>AI will suggest time and details</div>
        <div style={{ borderTop: "1px solid var(--mist)", paddingTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Don't see something? Create a task manually.</span>
          <button style={{
            padding: "6px 10px", borderRadius: 7,
            background: "var(--paper)", color: "var(--ink)",
            border: "1px solid var(--mist)", fontWeight: 600, fontSize: 11.5,
            cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
          }}><I.Plus size={11} color="var(--ink)"/> Add Task</button>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   Sub-tabs (Focus / All / Completed / Archived)
   ============================================================ */
function TD_Tabs({ active, navigate }) {
  const tabs = [
    { id: "focus",     label: "Focus",     route: ["my-todo"] },
    { id: "all",       label: "All Tasks", route: ["my-todo", "all"] },
    { id: "completed", label: "Completed", route: ["my-todo", "completed"] },
    { id: "archived",  label: "Archived",  route: ["my-todo", "archived"] },
  ];
  return (
    <div style={{
      display: "flex", gap: 24,
      borderBottom: "1px solid var(--mist)",
      marginBottom: 18,
    }}>
      {tabs.map((t) => {
        const isActive = (t.id === "focus" && (active === "focus" || active === "ai-suggested")) || t.id === active;
        return (
          <button key={t.id}
            onClick={() => navigate && navigate(t.route)}
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "10px 0",
              fontSize: 13, fontWeight: 600,
              color: isActive ? "var(--ink)" : "var(--stone)",
              borderBottom: isActive ? "2px solid var(--student)" : "2px solid transparent",
              marginBottom: -1,
            }}>{t.label}</button>
        );
      })}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
function TodoPage({ segments, navigate }) {
  // segments: ["my-todo"] | ["my-todo", "ai-suggested" | "all" | "completed" | "archived"]
  const sub = segments[1] || "focus";
  const isFocus = sub === "focus" || sub === "ai-suggested" || segments.length === 1;
  const showSuggested = sub === "ai-suggested";
  const [showFocusList, setShowFocusList] = React.useState(true);
  const visibleTasks = showFocusList ? TD_FOCUS_TASKS.slice(0, 5) : TD_FOCUS_TASKS;

  const titleLede = showSuggested
    ? "Your tasks, intelligently organized."
    : "Stay on top of what matters and get things done.";

  const extraCrumbs = !isFocus
    ? [{ all: "All Tasks", completed: "Completed", archived: "Archived" }[sub]]
    : showSuggested
      ? ["AI Suggested"]
      : null;

  return (
    <Page
      segments={["my-todo"]}
      extraCrumbs={extraCrumbs}
      title="My To Do"
      lede={titleLede}
      actions={
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button style={{
            padding: "8px 14px", borderRadius: 8, border: "none",
            background: "var(--student)", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>
            <I.Plus size={13} color="#fff"/> Add Task
          </button>
          <button aria-label="More" style={{
            width: 32, height: 32, borderRadius: 8,
            border: "1px solid var(--mist)", background: "var(--paper)",
            cursor: "pointer", color: "var(--stone)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 16, lineHeight: 1, letterSpacing: 1 }}>⋯</span>
          </button>
        </div>
      }
      rightRail={
        showSuggested
          ? <TD_RightRail_Suggested navigate={navigate}/>
          : <TD_RightRail_AIAssistant navigate={navigate}/>
      }
    >
      <TD_Tabs active={isFocus ? "focus" : sub} navigate={navigate}/>

      {isFocus && (
        <>
          <TD_StatStrip/>

          {/* Today's Focus header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 700, color: "var(--ink)", margin: 0, display: "inline-flex", alignItems: "center", gap: 8 }}>
                <I.Sparkle size={14} color="var(--student)"/> Today's Focus
              </h2>
              <span style={{ fontSize: 11.5, fontWeight: 600, padding: "2px 8px", borderRadius: 999, background: "#F5F3FF", color: "#5B21B6" }}>
                {TD_FOCUS_TASKS.length} tasks
              </span>
            </div>
            <button style={{
              padding: "6px 12px", borderRadius: 8,
              border: "1px solid var(--mist)", background: "var(--paper)",
              color: "var(--stone)", fontSize: 12, fontWeight: 600,
              cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <I.Calendar size={12} color="var(--stone)"/> View timeline
            </button>
          </div>
          <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 12 }}>
            AI-prioritized based on deadlines, importance, and your schedule.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {visibleTasks.map((t) => (
              <TD_FocusRow key={t.id} task={t} onStart={() => {}}/>
            ))}
          </div>

          <button onClick={() => setShowFocusList(!showFocusList)}
            style={{
              display: "block", margin: "12px auto 0",
              padding: "6px 14px", borderRadius: 8,
              background: "transparent", border: "none",
              fontSize: 12, fontWeight: 600, color: "var(--student-deep)",
              cursor: "pointer",
            }}>
            {showFocusList ? "Show 2 more" : "Show fewer"}
          </button>

          <TD_Upcoming/>

          {/* Sync banner */}
          <div style={{
            marginTop: 16, padding: "10px 14px",
            background: "#FAF5FF", border: "1px solid #E9D5FF",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: "var(--ink)" }}>
              <I.Sparkle size={13} color="#7C3AED"/>
              <span><b>Tip:</b> Sync your calendar and assignments to get smarter suggestions.</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button style={{
                padding: "6px 12px", borderRadius: 7,
                background: "var(--paper)", color: "var(--ink)",
                border: "1px solid var(--mist)", fontWeight: 600, fontSize: 12,
                cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6,
              }}><I.Refresh size={12} color="var(--stone)"/> Sync Now</button>
              <button aria-label="Dismiss" style={{ width: 20, height: 20, borderRadius: 5, border: "none", background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <I.X size={11} color="var(--silver)"/>
              </button>
            </div>
          </div>
        </>
      )}

      {!isFocus && (
        <EmptyState
          icon={sub === "completed" ? "CircleCheck" : sub === "archived" ? "Archive" : "ListTodo"}
          tone="neutral"
          title={{ all: "All Tasks view is on the way", completed: "No completed tasks yet", archived: "Nothing archived" }[sub]}
        >
          {sub === "completed"
            ? "Tasks you finish will appear here so you can celebrate the wins."
            : sub === "archived"
            ? "Old tasks you tuck away land here. Clean inbox, clear mind."
            : "We're composing the unified task list — for now use the Focus tab."}
        </EmptyState>
      )}
    </Page>
  );
}

window.TodoPage = TodoPage;

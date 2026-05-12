// LINKS — AI System Overview · composite page showing all 4 access modes

function PromoStrip() {
  const items = [
    { icon: "Messages", title: "Always Accessible", desc: "One click away from any page" },
    { icon: "Target",   title: "Contextually Intelligent", desc: "Shows up where you need it" },
    { icon: "Lightbulb",title: "Deeply Powerful", desc: "A full workspace for learning and growth" },
    { icon: "User",     title: "Always You", desc: "Knows your classes, goals, and progress" },
  ];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
      padding: "0 8px",
    }}>
      {items.map((it) => {
        const Ic = I[it.icon];
        return (
          <div key={it.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "var(--student-soft)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Ic size={17} color="var(--student)"/>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{it.title}</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.45 }}>{it.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ColumnHeader({ num, title, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 999,
          background: "var(--student)", color: "#fff",
          fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>{num}</div>
        <div className="t-h3" style={{ fontSize: 14, letterSpacing: "0.02em", textTransform: "uppercase" }}>{title}</div>
      </div>
      <div style={{ fontSize: 12, color: "var(--stone)", lineHeight: 1.5, paddingLeft: 38 }}>{sub}</div>
    </div>
  );
}

/* ---------- Column 1: Global Launcher (mini portal + header zoom) ---------- */
function MiniPortal() {
  const navItems = [
    { icon: "Home", label: "Home", active: true },
    { icon: "Time", label: "My Time" },
    { icon: "Desk", label: "My Desk" },
    { icon: "Classes", label: "My Classes" },
    { icon: "Work", label: "My Work" },
    { icon: "Progress", label: "My Progress" },
    { icon: "Tools", label: "My Tools" },
    { icon: "Team", label: "My Team" },
    { icon: "Materials", label: "My Materials" },
    { icon: "Messages", label: "Messages", badge: 8 },
    { icon: "Sparkle", label: "AI Coach", badge: "BETA" },
  ];
  return (
    <div style={{
      background: "#0F172A", borderRadius: 16, overflow: "hidden",
      display: "grid", gridTemplateColumns: "92px 1fr", height: 380,
      boxShadow: "var(--shadow-card)",
      position: "relative",
    }}>
      {/* mini sidebar */}
      <div style={{ background: "#0F172A", borderRight: "1px solid #1E293B", padding: "14px 8px", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, paddingLeft: 4 }}>
          <div style={{ width: 14, height: 14, borderRadius: 4, background: "var(--student)" }}/>
          <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, fontFamily: "var(--font-display)" }}>LINKS</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {navItems.map((n) => {
            const Ic = I[n.icon];
            return (
              <div key={n.label} style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "5px 6px", borderRadius: 5,
                background: n.active ? "rgba(255,255,255,0.08)" : "transparent",
                color: n.active ? "#fff" : "#94A3B8", fontSize: 9,
              }}>
                <Ic size={11} color={n.active ? "#fff" : "#94A3B8"}/>
                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden" }}>{n.label}</span>
                {n.badge && <span style={{ fontSize: 7, color: "var(--student)", fontWeight: 700 }}>{n.badge}</span>}
              </div>
            );
          })}
        </div>
      </div>
      {/* mini main */}
      <div style={{ background: "#0F172A", padding: 14, overflow: "hidden", color: "#fff" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 2 }}>Good morning, Alex! 👋</div>
        <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 10 }}>Friday, May 12</div>

        <div style={{ background: "#1E293B", borderRadius: 8, padding: 8, marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 6, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Today's Schedule</div>
          {[
            ["8:15 AM", "Algebra II", "Room 203"],
            ["9:30 AM", "English 10", "Room 105"],
            ["11:00 AM", "Biology", "Room 211"],
            ["1:30 PM", "US History", "Room 304"],
          ].map(([t, c, r]) => (
            <div key={t} style={{ display: "flex", gap: 6, fontSize: 8.5, marginBottom: 3, color: "#CBD5E1" }}>
              <span style={{ width: 42, color: "#94A3B8" }}>{t}</span>
              <span style={{ flex: 1, color: "#fff", fontWeight: 600 }}>{c}</span>
              <span style={{ color: "#94A3B8" }}>{r}</span>
            </div>
          ))}
          <div style={{ fontSize: 8.5, color: "var(--student-300)", fontWeight: 600, marginTop: 4 }}>View full schedule →</div>
        </div>

        <div style={{ background: "#1E293B", borderRadius: 8, padding: 8, marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 6, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Upcoming</div>
          <div style={{ fontSize: 8.5, color: "#CBD5E1", marginBottom: 3 }}>Essay Draft Due · May 15</div>
          <div style={{ fontSize: 8.5, color: "#CBD5E1", marginBottom: 3 }}>Biology Lab Report · May 22</div>
          <div style={{ fontSize: 8.5, color: "#CBD5E1" }}>Chapter 7 Quiz · May 25</div>
        </div>

        <div style={{ background: "#1E293B", borderRadius: 8, padding: 8 }}>
          <div style={{ fontSize: 9, color: "#94A3B8", marginBottom: 6, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Progress Overview</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            <div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)" }}>3.6</div>
              <div style={{ fontSize: 8, color: "#94A3B8" }}>GPA</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: "#fff", fontWeight: 700, fontFamily: "var(--font-display)" }}>5</div>
              <div style={{ fontSize: 8, color: "#94A3B8" }}>Classes</div>
            </div>
            <div>
              <div style={{ fontSize: 14, color: "var(--success)", fontWeight: 700, fontFamily: "var(--font-display)" }}>4</div>
              <div style={{ fontSize: 8, color: "#94A3B8" }}>On Track</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating launcher button */}
      <div style={{
        position: "absolute", right: 14, bottom: 14,
        width: 44, height: 44, borderRadius: 999,
        background: "var(--student)",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 8px 20px -4px rgba(109,40,217,0.6)",
      }}>
        <I.Sparkle size={20} color="#fff"/>
      </div>
    </div>
  );
}

function HeaderAccessZoom() {
  return (
    <div className="card" style={{ padding: 14, marginTop: 10 }}>
      <div style={{ fontSize: 11, color: "var(--student)", fontWeight: 600, marginBottom: 10 }}>Header Access (All Pages)</div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "8px 10px", background: "var(--bone)", borderRadius: 10,
        marginBottom: 10,
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "var(--student)", fontFamily: "var(--font-display)" }}>LINKS</span>
        <div style={{
          flex: 1, height: 22, background: "var(--paper)", borderRadius: 999,
          display: "flex", alignItems: "center", padding: "0 8px",
          fontSize: 9, color: "var(--silver)",
        }}>
          <I.Search size={9} color="var(--silver)" /> <span style={{ marginLeft: 4 }}>Search anything…</span>
        </div>
        <div style={{
          height: 22, padding: "0 8px",
          background: "var(--student-soft)", color: "var(--student-deep)",
          borderRadius: 999, fontSize: 9, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 3,
        }}>
          <I.Sparkle size={9} color="var(--student)"/>AI Coach
        </div>
        <div style={{ position: "relative", display: "flex" }}>
          <I.Bell size={11} color="var(--stone)"/>
          <span style={{
            position: "absolute", top: -3, right: -4, width: 8, height: 8, borderRadius: 999,
            background: "var(--public)", border: "1.5px solid var(--paper)",
          }}/>
        </div>
        <div style={{
          width: 18, height: 18, borderRadius: 999,
          background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
        }}/>
      </div>

      {/* Dropdown teaser */}
      <div style={{
        background: "var(--paper)",
        border: "1px solid var(--mist)",
        borderRadius: 10, padding: 10, fontSize: 11,
        boxShadow: "0 8px 18px -8px rgba(15,23,42,0.18)",
        position: "relative", marginLeft: 80,
      }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)" }}>LINKS AI</div>
        <div style={{ fontSize: 10, color: "var(--stone)", marginBottom: 8 }}>Your AI Coach and assistant</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", color: "var(--ink)", fontSize: 10.5 }}>
          <I.Messages size={12} color="var(--student)"/>Chat with LINKS AI
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 0", color: "var(--slate)", fontSize: 10 }}>
          <I.Sparkle size={11} color="var(--stone)"/>Go to AI Hub
        </div>
        <div style={{ fontSize: 9, color: "var(--silver)", marginTop: 6, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Recent Chats</div>
        <div style={{ fontSize: 10, color: "var(--slate)", padding: "3px 0" }}>Help with essay outline · May 15</div>
        <div style={{ fontSize: 10, color: "var(--slate)", padding: "3px 0" }}>Study plan for Biology · May 14</div>
        <div style={{ fontSize: 9.5, color: "var(--student)", fontWeight: 600, marginTop: 4 }}>View all conversations</div>
      </div>
    </div>
  );
}

/* ---------- Column 2: Chat Drawer ---------- */
function MiniDrawer() {
  return (
    <div style={{
      background: "var(--paper)",
      borderRadius: 18, overflow: "hidden",
      boxShadow: "var(--shadow-card)",
      border: "1px solid var(--student-200)",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, var(--student) 0%, var(--student-deep) 100%)",
        color: "#fff", padding: "12px 14px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <I.Sparkle size={14} color="#fff"/>
        <span style={{ fontSize: 13, fontWeight: 700 }}>LINKS AI</span>
        <div style={{ flex: 1 }}/>
        <I.Refresh size={12} color="#fff"/>
        <I.External size={12} color="#fff"/>
        <I.X size={12} color="#fff"/>
      </div>

      {/* Body */}
      <div style={{ padding: 14, background: "var(--student-soft)", minHeight: 460 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: 999, background: "var(--student)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Sparkle size={12} color="#fff"/>
          </div>
          <div style={{ background: "var(--paper)", borderRadius: 12, padding: "10px 12px", fontSize: 12, color: "var(--ink)", lineHeight: 1.5 }}>
            Hi Alex! 👋 I'm your AI Coach. I know your classes, assignments, and goals. How can I help?
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 14, marginLeft: 32 }}>
          {[
            ["Book", "Help me study"],
            ["CircleCheck", "Check my work"],
            ["Lightbulb", "Explain this topic"],
            ["Edit", "Write a message"],
          ].map(([icn, lbl]) => {
            const Ic = I[icn];
            return (
              <div key={lbl} style={{
                background: "var(--paper)", borderRadius: 8,
                padding: "8px 10px", fontSize: 11, fontWeight: 500, color: "var(--ink)",
                display: "flex", alignItems: "center", gap: 6,
              }}>
                <Ic size={11} color="var(--student)"/>{lbl}
              </div>
            );
          })}
        </div>

        {/* User msg */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <div style={{
            background: "var(--student-200)", borderRadius: 12, borderTopRightRadius: 4,
            padding: "8px 12px", fontSize: 12, color: "var(--student-deep)",
            maxWidth: "75%", fontWeight: 500,
          }}>
            Can you help me understand photosynthesis for my Biology quiz?
          </div>
        </div>

        {/* AI long reply with diagram */}
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: 999, background: "var(--student)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <I.Sparkle size={12} color="#fff"/>
          </div>
          <div style={{ background: "var(--paper)", borderRadius: 12, padding: "10px 12px", fontSize: 12, color: "var(--ink)", lineHeight: 1.5, flex: 1 }}>
            <div style={{ marginBottom: 8 }}>Absolutely! Here's a quick overview of photosynthesis:</div>
            {/* tiny diagram */}
            <div style={{
              background: "linear-gradient(180deg, #FEF3C7 0%, #DCFCE7 100%)",
              borderRadius: 8, padding: 10, fontSize: 10, color: "var(--ink)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              marginBottom: 8,
            }}>
              <div style={{ fontWeight: 700, fontSize: 11 }}>Photosynthesis</div>
              <div style={{ display: "flex", gap: 16, fontSize: 9, alignItems: "center" }}>
                <span>☀️ Light</span>
                <I.ArrowRight size={10} color="var(--stone)"/>
                <span>🌱</span>
                <I.ArrowRight size={10} color="var(--stone)"/>
                <span>🔋 Glucose</span>
              </div>
              <div style={{ display: "flex", gap: 12, fontSize: 9, color: "var(--stone)" }}>
                <span>CO₂ + H₂O</span>
                <span>→</span>
                <span>O₂ + sugar</span>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--slate)" }}>Want a practice quiz or flashcards on this?</div>
          </div>
        </div>

        {/* Action chips */}
        <div style={{ display: "flex", gap: 6, marginLeft: 32 }}>
          <span className="pill pill-purple" style={{ fontSize: 10.5 }}>
            <I.Lightbulb size={10} color="var(--student)"/>Practice Quiz
          </span>
          <span className="pill pill-purple" style={{ fontSize: 10.5 }}>
            <I.Notes size={10} color="var(--student)"/>Flashcards
          </span>
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "10px 12px", background: "var(--paper)", borderTop: "1px solid var(--mist)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "6px 10px", background: "var(--bone)", borderRadius: 999,
          fontSize: 11, color: "var(--silver)",
        }}>
          <span style={{ flex: 1 }}>Ask me anything…</span>
          <I.Mic size={11} color="var(--silver)"/>
          <div style={{ width: 22, height: 22, borderRadius: 999, background: "var(--student)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.ArrowRight size={11} color="#fff"/>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        padding: "8px 0", background: "var(--paper)",
        borderTop: "1px solid var(--mist)",
      }}>
        {[
          ["Messages", "Chat", true],
          ["Clock", "History", false],
          ["Tools", "Tools", false],
          ["User", "Profile", false],
        ].map(([icn, lbl, active]) => {
          const Ic = I[icn];
          return (
            <div key={lbl} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              color: active ? "var(--student)" : "var(--stone)", fontSize: 9, fontWeight: active ? 600 : 500,
            }}>
              <Ic size={13} color={active ? "var(--student)" : "var(--stone)"}/>{lbl}
            </div>
          );
        })}
      </div>

      <div style={{ padding: "6px 0", textAlign: "center", fontSize: 8.5, color: "var(--silver)", background: "var(--paper)" }}>
        AI can make mistakes. Check important info.
      </div>
    </div>
  );
}

/* ---------- Column 3: Contextual AI examples ---------- */
function ContextSection({ label, children }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{
        fontSize: 11, color: "var(--student)", fontWeight: 700,
        marginBottom: 6, letterSpacing: "0.02em",
      }}>{label}</div>
      <div className="card" style={{ padding: 12, boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
        {children}
      </div>
    </div>
  );
}

function ContextCard({ heading, body, action, status, statusType = "purple" }) {
  return (
    <>
      {heading && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{heading}</div>
            {body && <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>{body}</div>}
          </div>
          {status && (
            <span className={"pill pill-" + statusType} style={{ fontSize: 10 }}>{status}</span>
          )}
        </div>
      )}
      <div style={{
        background: "var(--student-soft)", borderRadius: 10, padding: 10,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <I.Sparkle size={12} color="var(--student)"/>
        <span style={{ fontSize: 11.5, color: "var(--student-deep)", flex: 1, fontWeight: 500 }}>{action}</span>
      </div>
    </>
  );
}

function ContextualColumn() {
  return (
    <>
      <ContextSection label="In My Progress">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--ink)", fontWeight: 600, marginBottom: 4 }}>
          <I.TrendUp size={12} color="var(--success)"/> You're improving in Algebra II! 🔥
        </div>
        <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 10 }}>Your test average increased 12%</div>
        <div style={{ background: "var(--student-soft)", borderRadius: 10, padding: 10 }}>
          <div style={{ fontSize: 11.5, color: "var(--ink)", marginBottom: 8 }}>Want to practice systems of equations? I can create a personalized quiz.</div>
          <button style={{
            background: "var(--student)", color: "#fff", border: "none",
            borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer",
          }}>
            <I.Sparkle size={10} color="#fff"/>Practice Now
          </button>
        </div>
      </ContextSection>

      <ContextSection label="In My Work (Assignment)">
        <ContextCard
          heading="Literary Analysis Essay"
          body="Due May 19"
          status="In Progress"
          statusType="warning"
          action={<>Want me to review what you've written so far and give feedback? <strong style={{ color: "var(--student)" }}>Check My Work</strong></>}
        />
      </ContextSection>

      <ContextSection label="In Messages (Compose)">
        <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 2 }}>To: Ms. Carter</div>
        <div style={{ fontSize: 12, color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>Subject: Question about essay</div>
        <div style={{
          background: "var(--student-soft)", borderRadius: 10, padding: 10,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <I.Sparkle size={12} color="var(--student)"/>
          <span style={{ fontSize: 11.5, color: "var(--student-deep)", flex: 1, fontWeight: 500 }}>I can draft something for you. <strong>Draft with AI</strong></span>
        </div>
      </ContextSection>

      <ContextSection label="In My Desk (Email)">
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, marginBottom: 2 }}>
          <span style={{ color: "var(--stone)" }}>From:</span>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>Mr. Johnson</span>
          <div style={{ flex: 1 }}/>
          <span style={{ color: "var(--stone)" }}>Today</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--ink)", marginBottom: 8 }}>Re: Chapter 7 Quiz</div>
        <div style={{
          background: "var(--student-soft)", borderRadius: 10, padding: 10,
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <I.Sparkle size={12} color="var(--student)"/>
          <span style={{ fontSize: 11.5, color: "var(--student-deep)", flex: 1, fontWeight: 500 }}>Want a quick summary of this email? I can break it down for you. <strong>Summarize</strong></span>
        </div>
      </ContextSection>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
        <span style={{ fontSize: 12, color: "var(--student)", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 4 }}>
          See more examples <I.ArrowRight size={11} color="var(--student)"/>
        </span>
      </div>
    </>
  );
}

/* ---------- Column 4: Hub ---------- */
function HubMini() {
  return (
    <div style={{
      background: "var(--paper)", borderRadius: 18, overflow: "hidden",
      boxShadow: "var(--shadow-card)",
    }}>
      {/* Hub hero */}
      <div style={{
        background: "linear-gradient(135deg, #1E1B4B 0%, #4C1D95 50%, #6D28D9 100%)",
        padding: "16px 18px", color: "#fff",
        display: "flex", alignItems: "center", gap: 12,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "var(--font-display)" }}>LINKS AI Hub</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Your space to learn, create, and grow</div>
        </div>
        {/* small bot */}
        <div style={{
          width: 50, height: 50, borderRadius: 12,
          background: "rgba(255,255,255,0.12)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg viewBox="0 0 50 50" width="36" height="36">
            <circle cx="25" cy="22" r="12" fill="#C4B5FD"/>
            <rect x="17" y="18" width="16" height="9" rx="2" fill="#1E1B4B"/>
            <circle cx="21" cy="22.5" r="1.4" fill="#67E8F9"/>
            <circle cx="29" cy="22.5" r="1.4" fill="#67E8F9"/>
            <rect x="22" y="32" width="6" height="10" rx="2" fill="#A78BFA"/>
            <rect x="14" y="34" width="22" height="8" rx="2" fill="#7C3AED"/>
          </svg>
        </div>
      </div>

      <div style={{ padding: 14 }}>
        <HubGroup title="Study & Practice" tools={[
          ["Lightbulb", "Practice Quiz", "Auto-generated quizzes"],
          ["Notes", "Flashcards", "Smart flashcards from your notes"],
          ["Book", "Study Guide", "Personalized study guides"],
          ["PlayCircle", "Brain Games", "Fun games to build skills"],
        ]}/>
        <HubGroup title="Create & Write" tools={[
          ["Edit", "Writing Helper", "Essays, paragraphs, and more"],
          ["User", "AI Tutor", "Step-by-step explanations"],
          ["Search", "Source Finder", "Find credible sources"],
          ["Folder", "Presentation", "Outlines and slide decks"],
        ]}/>
        <HubGroup title="Plan & Organize" tools={[
          ["Calendar", "Study Planner", "Smart study schedules"],
          ["Target", "Goal Tracker", "Track goals and stay on track"],
          ["ListChecks", "To-Do List", "AI-powered task suggestions"],
          ["Notes", "Notes Assistant", "Organize and summarize notes"],
        ]}/>

        {/* Recent Chats */}
        <div style={{ marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Recent Chats</span>
            <span style={{ fontSize: 10.5, color: "var(--student)", fontWeight: 600 }}>View all</span>
          </div>
          {[
            ["Help with photosynthesis", "May 16"],
            ["Literary analysis essay feedback", "May 15"],
            ["Study plan for final exams", "May 14"],
          ].map(([t, d]) => (
            <div key={t} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "5px 0", fontSize: 11, color: "var(--slate)",
            }}>
              <I.Messages size={11} color="var(--silver)"/>
              <span style={{ flex: 1 }}>{t}</span>
              <span style={{ fontSize: 10, color: "var(--silver)" }}>{d}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div style={{ padding: "10px 14px", borderTop: "1px solid var(--mist)" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          padding: "8px 12px", background: "var(--bone)", borderRadius: 999,
          fontSize: 11.5, color: "var(--silver)",
        }}>
          <span style={{ flex: 1 }}>Ask LINKS AI anything…</span>
          <div style={{ width: 24, height: 24, borderRadius: 999, background: "var(--student)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.ArrowRight size={12} color="#fff"/>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        padding: "8px 0", background: "var(--paper)",
        borderTop: "1px solid var(--mist)",
      }}>
        {[
          ["Messages", "Chat", false],
          ["Clock", "History", false],
          ["Tools", "Tools", true],
          ["User", "Profile", false],
        ].map(([icn, lbl, active]) => {
          const Ic = I[icn];
          return (
            <div key={lbl} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              color: active ? "var(--student)" : "var(--stone)", fontSize: 9, fontWeight: active ? 600 : 500,
            }}>
              <Ic size={13} color={active ? "var(--student)" : "var(--stone)"}/>{lbl}
            </div>
          );
        })}
      </div>
      <div style={{ padding: "6px 0", textAlign: "center", fontSize: 8.5, color: "var(--silver)", background: "var(--paper)" }}>
        AI can make mistakes. Check important info.
      </div>
    </div>
  );
}

function HubGroup({ title, tools }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>{title}</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {tools.map(([icn, name, desc]) => {
          const Ic = I[icn];
          return (
            <div key={name} style={{
              background: "var(--bone)", borderRadius: 8, padding: "8px 6px",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center",
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: "var(--student-soft)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Ic size={12} color="var(--student)"/>
              </div>
              <div style={{ fontSize: 9.5, fontWeight: 600, color: "var(--ink)", lineHeight: 1.2 }}>{name}</div>
              <div style={{ fontSize: 8, color: "var(--stone)", lineHeight: 1.3 }}>{desc}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Bottom strip ---------- */
function BottomStrip() {
  const items = [
    { icon: "User", title: "Knows Your Context", desc: "Classes, assignments, goals, progress, and preferences." },
    { icon: "Sparkle", title: "Takes Action", desc: "Drafts, summarizes, explains, recommends, and more." },
    { icon: "Shield", title: "Protects Your Data", desc: "FERPA & COPPA compliant. Your data is safe." },
    { icon: "TrendUp", title: "Learns With You", desc: "Gets smarter about how you learn and what helps." },
    { icon: "Team", title: "Supports All Portals", desc: "Student, Instructor, Parent, Admin, and more." },
  ];
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18,
      paddingTop: 22, marginTop: 22, borderTop: "1px solid var(--mist)",
    }}>
      {items.map((it) => {
        const Ic = I[it.icon];
        return (
          <div key={it.title} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 999,
              background: "var(--student-soft)",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <Ic size={15} color="var(--student)"/>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{it.title}</div>
              <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.45 }}>{it.desc}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Main ---------- */
function AISystemOverview() {
  return (
    <div className="fade-in" style={{ padding: "12px 28px 80px", maxWidth: 1480, margin: "0 auto" }}>
      {/* Title */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: 22, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <I.Sparkle size={22} color="var(--student)"/>
          <div>
            <h1 style={{
              margin: 0, fontFamily: "var(--font-display)",
              fontSize: 30, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}>LINKS AI SYSTEM</h1>
            <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 4 }}>
              Always there. Always helpful. Always in context.
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 320 }}>
          <PromoStrip/>
        </div>
      </div>

      {/* Four columns */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 22 }}>
        <div>
          <ColumnHeader num="1" title="Global AI Launcher" sub="Always there. One click away."/>
          <MiniPortal/>
          <HeaderAccessZoom/>
        </div>

        <div>
          <ColumnHeader num="2" title="AI Chat Drawer" sub="Persistent conversation with full context."/>
          <MiniDrawer/>
        </div>

        <div>
          <ColumnHeader num="3" title="Contextual AI Everywhere" sub="Smart help right where you are."/>
          <ContextualColumn/>
        </div>

        <div>
          <ColumnHeader num="4" title="AI Hub (Full Workspace)" sub="Deep learning tools and powerful capabilities."/>
          <HubMini/>
        </div>
      </div>

      <BottomStrip/>
    </div>
  );
}

window.AISystemOverview = AISystemOverview;

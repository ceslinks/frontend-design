// LINKS — AI Hub (LINKS AI / AI Coach landing surface)
// Per design brief Section 07 · AI COACH and Correction 03:
//   AI is a scaffold, never a substitute. Copy reflects coaching, review, and
//   process — not "do my homework for me" framing.

function AIHub({ onAIClick, tweaks, setTweak }) {
  const [chatInput, setChatInput] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [reply, setReply] = React.useState(null);
  const [error, setError] = React.useState(null);

  const sendChat = async () => {
    const q = chatInput.trim();
    if (!q || busy) return;
    setBusy(true);
    setError(null);
    setReply({ q, a: null });
    try {
      const tone = tweaks?.aiTone === "directive"
        ? "Be direct and clear. Give the answer when asked, but always show the reasoning steps so the student can learn."
        : "Be Socratic. Don't just give answers — guide the student with questions, hints, and small steps that build their thinking. Never write the student's work for them.";
      const system =
        "You are LINKS AI, the coaching assistant inside the LINKS Student Portal — a competency-based K-12 platform. " +
        "You help students learn, plan, and reflect. " +
        "You NEVER complete graded work for the student. You ask, scaffold, summarize, explain, and check. " +
        "Keep responses to 4-6 short sentences. Friendly, age-appropriate for grades 9-12. " + tone;
      const text = await window.claude.complete({
        messages: [
          { role: "user", content: system + "\n\nStudent: " + q },
        ],
      });
      setReply({ q, a: text });
    } catch (e) {
      setError(String(e?.message || e));
      setReply({ q, a: null });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fade-in" style={{ padding: "24px 32px 0", maxWidth: 1320, margin: "0 auto", paddingBottom: 40 }}>
      {/* Header strip */}
      <div style={{
        display: "flex", alignItems: "flex-start", justifyContent: "space-between",
        gap: 24, marginBottom: 18,
      }}>
        <div>
          <h1 className="t-h1" style={{ fontSize: 30, marginBottom: 6, color: "#3B1A6B", fontFamily: "var(--font-display)" }}>LINKS AI Hub</h1>
          <p style={{ color: "var(--stone)", fontSize: 14, margin: 0 }}>
            Your personal learning partner. Always here to help you learn, grow, and succeed.
          </p>
        </div>
        <button
          onClick={onAIClick}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            height: 40, padding: "0 18px",
            background: "var(--paper)",
            color: "var(--student-deep)",
            border: "1px solid #DDD6FE",
            borderRadius: 999,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--student-soft)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "var(--paper)"; }}
        >
          <I.Messages size={15} color="var(--student)"/>
          Chat with LINKS AI
        </button>
      </div>

      {/* Hero greeting card */}
      <HeroGreeting tweaks={tweaks} setTweak={setTweak}/>

      {/* Quick Start */}
      <QuickStartTools/>

      {/* Two-up: Your Day with AI · Suggested for You */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        <YourDayWithAI/>
        <SuggestedForYou/>
      </div>

      {/* Tools & Resources */}
      <ToolsAndResources/>

      {/* Two-up: Recent Conversations · AI Insights */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
        <RecentConversations/>
        <AIInsights/>
      </div>

      {/* Sticky chat input at bottom */}
      <div style={{ height: 84 }}/>
      <div style={{
        position: "fixed", bottom: 16, left: 240, right: 24, zIndex: 20,
        display: "flex", justifyContent: "center", pointerEvents: "none",
      }}>
        <div style={{
          width: "100%", maxWidth: 980,
          background: "var(--paper)",
          borderRadius: 999,
          boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 16px 36px -10px rgba(15,23,42,0.20)",
          padding: "8px 8px 8px 18px",
          display: "flex", alignItems: "center", gap: 12,
          pointerEvents: "auto",
        }}>
          <I.Sparkle size={17} color="var(--student)"/>
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") sendChat(); }}
            placeholder={busy ? "Thinking…" : "Ask me anything… I can help with your classes, assignments, and more."}
            disabled={busy}
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontSize: 13.5, color: "var(--ink)",
            }}
          />
          <button aria-label="Voice input" style={{
            width: 36, height: 36, borderRadius: 999, border: "none",
            background: "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <I.Mic size={16} color="var(--stone)"/>
          </button>
          <button
            aria-label="Send"
            disabled={busy || !chatInput.trim()}
            onClick={sendChat}
            style={{
              width: 40, height: 40, borderRadius: 999, border: "none",
              background: chatInput.trim() ? "var(--student)" : "#E9E5F5",
              color: "#fff", cursor: chatInput.trim() ? "pointer" : "default",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              transition: "background 120ms",
            }}
          >
            <I.Send size={16} color={chatInput.trim() ? "#fff" : "var(--silver)"}/>
          </button>
        </div>
      </div>
      {/* Disclaimer */}
      <div style={{
        position: "fixed", bottom: 4, left: 240, right: 24, zIndex: 19,
        textAlign: "center", fontSize: 10.5, color: "var(--silver)",
        pointerEvents: "none",
      }}>
        LINKS AI can make mistakes. Check important info.
      </div>

      {/* Live reply popover (shown when there's a reply or error) */}
      {reply && (
        <div style={{
          position: "fixed", bottom: 92, left: "50%", transform: "translateX(-50%)",
          width: "min(720px, calc(100% - 80px))",
          background: "var(--paper)",
          borderRadius: 16,
          boxShadow: "0 1px 3px rgba(15,23,42,0.08), 0 24px 48px -12px rgba(15,23,42,0.24)",
          padding: 18, zIndex: 21,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <I.Sparkle size={15} color="var(--student)"/>
              <span style={{ fontSize: 12, fontWeight: 600, color: "var(--student-deep)" }}>LINKS AI</span>
              {tweaks?.aiTone && (
                <span className="pill pill-purple" style={{ fontSize: 10, padding: "1px 8px" }}>
                  {tweaks.aiTone === "socratic" ? "Socratic" : "Directive"}
                </span>
              )}
            </div>
            <button onClick={() => { setReply(null); setError(null); }} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}>
              <I.X size={14} color="var(--stone)"/>
            </button>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--stone)", marginBottom: 6 }}>
            <strong style={{ color: "var(--slate)" }}>You:</strong> {reply.q}
          </div>
          {reply.a ? (
            <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.55, whiteSpace: "pre-wrap" }}>
              {reply.a}
            </div>
          ) : error ? (
            <div style={{ fontSize: 12.5, color: "var(--public)" }}>Couldn't reach LINKS AI: {error}</div>
          ) : (
            <div style={{ fontSize: 13, color: "var(--stone)", display: "flex", alignItems: "center", gap: 8 }}>
              <span className="pulse-dot"/> Thinking…
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes pulseDot { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        .pulse-dot { width: 8px; height: 8px; border-radius: 999px; background: var(--student); animation: pulseDot 1.2s ease-in-out infinite; display: inline-block; }
        @keyframes botFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .ai-bot { animation: botFloat 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

/* ---------- Hero greeting card ---------- */
function HeroGreeting({ tweaks, setTweak }) {
  const starters = [
    "Study for a test",
    "Work on an assignment",
    "Improve my skills",
    "Plan my day",
  ];
  return (
    <div style={{
      background: "linear-gradient(120deg, #F1ECFB 0%, #E9E0F8 50%, #F2DCEC 100%)",
      borderRadius: 22,
      padding: "26px 28px",
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 24,
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      marginBottom: 22,
      boxShadow: "var(--shadow-card)",
    }}>
      {/* Sparkles deco */}
      <Sparkles/>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 17, fontWeight: 700, color: "#3B1A6B", marginBottom: 4, fontFamily: "var(--font-display)" }}>
          Hi Alex! <span aria-hidden>👋</span>
        </div>
        <div style={{ fontSize: 14.5, color: "var(--slate)", marginBottom: 4, lineHeight: 1.5 }}>
          I'm LINKS AI, your personal learning coach.
        </div>
        <div style={{ fontSize: 14.5, color: "var(--slate)", marginBottom: 16, lineHeight: 1.5 }}>
          What would you like to focus on today?
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {starters.map((s) => (
            <button key={s} style={{
              padding: "8px 16px",
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.6)",
              borderRadius: 999,
              fontSize: 12.5, fontWeight: 600,
              color: "var(--student-deep)",
              cursor: "pointer",
              boxShadow: "0 1px 2px rgba(91,33,182,0.06)",
              transition: "transform 120ms, box-shadow 120ms",
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px -4px rgba(91,33,182,0.20)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 2px rgba(91,33,182,0.06)"; }}
            >{s}</button>
          ))}
        </div>
      </div>
      {/* Bot illustration placeholder */}
      <BotIllustration/>
    </div>
  );
}

function Sparkles() {
  // Decorative sparkles scattered around the hero
  const dots = [
    { l: "32%", t: "18%", s: 6, c: "#F59E0B" },
    { l: "44%", t: "78%", s: 4, c: "#A78BFA" },
    { l: "56%", t: "22%", s: 5, c: "#A78BFA" },
    { l: "62%", t: "70%", s: 5, c: "#F59E0B" },
    { l: "69%", t: "20%", s: 4, c: "#C4B5FD" },
    { l: "74%", t: "55%", s: 5, c: "#F59E0B" },
    { l: "82%", t: "30%", s: 4, c: "#C4B5FD" },
    { l: "92%", t: "70%", s: 5, c: "#A78BFA" },
  ];
  return (
    <>
      {dots.map((d, i) => (
        <div key={i} style={{
          position: "absolute", left: d.l, top: d.t,
          width: d.s, height: d.s, borderRadius: 999,
          background: d.c, opacity: 0.6,
          transform: "rotate(45deg)",
          boxShadow: `0 0 8px ${d.c}88`,
          zIndex: 1,
        }}/>
      ))}
    </>
  );
}

function BotIllustration() {
  // Friendly cartoon AI assistant — purple body, glowing screen face,
  // raised waving arm. Drawn in SVG so it scales crisp.
  return (
    <div className="ai-bot" style={{ position: "relative", width: 200, height: 180, zIndex: 2 }}>
      {/* Glow halo */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 55%, rgba(167,139,250,0.45) 0%, rgba(167,139,250,0) 60%)",
      }}/>
      <svg viewBox="0 0 200 200" style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
        {/* Antenna */}
        <line x1="100" y1="38" x2="100" y2="22" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="100" cy="20" r="5" fill="#FBBF24"/>
        {/* Head */}
        <rect x="56" y="38" width="88" height="74" rx="22" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2"/>
        {/* Inner screen */}
        <rect x="64" y="48" width="72" height="56" rx="14" fill="#3B1A6B"/>
        {/* Eyes */}
        <ellipse cx="84" cy="76" rx="6" ry="8" fill="#7DD3FC"/>
        <ellipse cx="116" cy="76" rx="6" ry="8" fill="#7DD3FC"/>
        <circle cx="86" cy="73" r="2" fill="#FFFFFF"/>
        <circle cx="118" cy="73" r="2" fill="#FFFFFF"/>
        {/* Smile */}
        <path d="M88 90 Q100 98 112 90" stroke="#7DD3FC" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* Ears */}
        <circle cx="52" cy="74" r="6" fill="#A78BFA"/>
        <circle cx="148" cy="74" r="6" fill="#A78BFA"/>
        {/* Body */}
        <rect x="68" y="108" width="64" height="50" rx="14" fill="#A78BFA"/>
        <rect x="76" y="116" width="48" height="20" rx="6" fill="#C4B5FD" opacity="0.6"/>
        {/* Waving arm */}
        <path d="M68 118 Q44 110 40 86 Q38 76 48 72" stroke="#A78BFA" strokeWidth="11" fill="none" strokeLinecap="round"/>
        <circle cx="48" cy="72" r="9" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2"/>
        {/* Right arm */}
        <path d="M132 118 Q148 124 152 138" stroke="#A78BFA" strokeWidth="11" fill="none" strokeLinecap="round"/>
        <circle cx="152" cy="138" r="9" fill="#FFFFFF" stroke="#C4B5FD" strokeWidth="2"/>
      </svg>
    </div>
  );
}

/* ---------- Quick Start grid ---------- */
function QuickStartTools() {
  const tools = [
    { icon: "Book",      label: "Explain\nThis Topic",   sub: "Get clear explanations for anything you're learning",   color: "#6D28D9", bg: "#EDE9FE" },
    { icon: "Edit",      label: "Check\nMy Work",        sub: "Review your work and get helpful feedback",              color: "#2E9B62", bg: "#DCF7E8" },
    { icon: "Notes",     label: "Create\nFlashcards",    sub: "Turn your notes into smart flashcards instantly",        color: "#E07A2D", bg: "#FFE7CC" },
    { icon: "ListChecks",label: "Practice\nQuiz",        sub: "Generate quizzes and practice to improve",               color: "#1E6F8C", bg: "#D6EAF2" },
    { icon: "Edit",      label: "Writing\nAssistant",    sub: "Get help writing essays and other assignments",          color: "#C0392B", bg: "#FAD9D5" },
    { icon: "Calendar",  label: "Study\nPlanner",        sub: "Plan your study time and stay on track",                 color: "#F59E0B", bg: "#FEF0CB" },
  ];
  return (
    <div className="card" style={{ padding: 22, marginBottom: 0 }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 14 }}>
        <div>
          <div className="t-h2" style={{ fontSize: 17, marginBottom: 2 }}>Quick Start</div>
          <div style={{ fontSize: 12.5, color: "var(--stone)" }}>Popular ways students use LINKS AI</div>
        </div>
        <button style={{
          background: "transparent", border: "none", color: "var(--student)",
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          View all tools <I.ArrowRight size={13} color="var(--student)"/>
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
        {tools.map((t) => {
          const IconComp = I[t.icon];
          return (
            <button key={t.label} style={{
              padding: "16px 12px",
              background: "var(--paper)",
              border: "1px solid var(--mist)",
              borderRadius: 14,
              cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
              textAlign: "center",
              transition: "transform 120ms, box-shadow 120ms, border-color 120ms",
              minHeight: 158,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.color + "66"; e.currentTarget.style.boxShadow = "0 6px 14px -6px " + t.color + "44"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--mist)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: t.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconComp size={22} color={t.color}/>
              </div>
              <div style={{
                fontSize: 13, fontWeight: 700, color: "var(--ink)",
                lineHeight: 1.25, whiteSpace: "pre-line", fontFamily: "var(--font-display)",
              }}>{t.label}</div>
              <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.4 }}>{t.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Your Day with AI ---------- */
function YourDayWithAI() {
  const items = [
    { icon: "Calendar",    color: "#6D28D9", bg: "#EDE9FE", title: "You have an Algebra II quiz on Friday.", sub: "Want to review key concepts?", cta: "Review Now" },
    { icon: "CircleCheck", color: "#2E9B62", bg: "#DCF7E8", title: "Your essay draft is ready for review.",   sub: "Get feedback before you submit?", cta: "Review Essay" },
    { icon: "Calendar",    color: "#E07A2D", bg: "#FFE7CC", title: "You have a meeting with Ms. Carter at 10:30 AM.", sub: "Need help preparing?",        cta: "Prepare Now" },
    { icon: "Book",        color: "#6D28D9", bg: "#EDE9FE", title: "Biology chapter 7 is due next week.",     sub: "Create a study plan?",            cta: "Plan Study" },
  ];
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ marginBottom: 14 }}>
        <div className="t-h2" style={{ fontSize: 17, marginBottom: 2 }}>Your Day with AI</div>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>Here's what I recommend based on your classes and goals</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it, i) => {
          const IconComp = I[it.icon];
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "auto 1fr auto",
              gap: 12, alignItems: "center",
              padding: "12px 14px",
              background: "var(--surface-quiet)",
              borderRadius: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 9,
                background: it.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconComp size={17} color={it.color}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 600, lineHeight: 1.4 }}>{it.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4, marginTop: 1 }}>{it.sub}</div>
              </div>
              <button style={{
                whiteSpace: "nowrap",
                padding: "5px 12px", height: 26,
                background: "var(--paper)",
                color: "var(--student-deep)",
                border: "1px solid #DDD6FE",
                borderRadius: 999,
                fontSize: 11.5, fontWeight: 600, cursor: "pointer",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "var(--student-soft)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "var(--paper)"; }}
              >{it.cta}</button>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button style={{
          background: "transparent", border: "none", color: "var(--student)",
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          See your full schedule <I.ArrowRight size={12} color="var(--student)"/>
        </button>
      </div>
    </div>
  );
}

/* ---------- Suggested for You ---------- */
function SuggestedForYou() {
  const items = [
    { icon: "Edit",     color: "#6D28D9", title: "Strengthen Quadratic Equations",     sub: "You've struggled with this topic in past quizzes.", tag: "Practice", tagBg: "#FFE7CC", tagFg: "#E07A2D" },
    { icon: "Notes",    color: "#2E9B62", title: "Improve Essay Structure",            sub: "Tips to help your writing more clear and organized.", tag: "Writing", tagBg: "#EDE9FE", tagFg: "#6D28D9" },
    { icon: "Sparkle",  color: "#F59E0B", title: "Cell Structure Review",              sub: "Based on your Biology notes and quiz results.",      tag: "Review",   tagBg: "#DCF7E8", tagFg: "#2E9B62" },
    { icon: "Clock",    color: "#E07A2D", title: "Time Management Tips",               sub: "Ideas to help you stay focused and productive.",     tag: "Productivity", tagBg: "#FFE7CC", tagFg: "#E07A2D" },
  ];
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ marginBottom: 14 }}>
        <div className="t-h2" style={{ fontSize: 17, marginBottom: 2 }}>Suggested for You</div>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>Personalized based on your progress</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it, i) => {
          const IconComp = I[it.icon];
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "auto 1fr auto",
              gap: 12, alignItems: "center",
              padding: "12px 14px",
              background: "var(--surface-quiet)",
              borderRadius: 12,
            }}>
              <div style={{
                width: 32, height: 32,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <IconComp size={18} color={it.color}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 600, lineHeight: 1.4 }}>{it.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4, marginTop: 1 }}>{it.sub}</div>
              </div>
              <span style={{
                whiteSpace: "nowrap",
                padding: "3px 10px",
                background: it.tagBg, color: it.tagFg,
                borderRadius: 999,
                fontSize: 11, fontWeight: 600,
              }}>{it.tag}</span>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: 12 }}>
        <button style={{
          background: "transparent", border: "none", color: "var(--student)",
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          See more suggestions <I.ArrowRight size={12} color="var(--student)"/>
        </button>
      </div>
    </div>
  );
}

/* ---------- Tools & Resources ---------- */
function ToolsAndResources() {
  const tools = [
    { icon: "PlayCircle", color: "#1E6F8C", label: "Brain Games",      sub: "Fun games that build skills while you learn" },
    { icon: "Search",     color: "#2E9B62", label: "Source Finder",    sub: "Find credible sources for your research" },
    { icon: "Atom",       color: "#6D28D9", label: "Concept Maps",     sub: "Visualize connections between ideas" },
    { icon: "Sparkle",    color: "#F59E0B", label: "Math Solver",      sub: "Step-by-step solutions to math problems" },
    { icon: "Quote",      color: "#E07A2D", label: "Language Tutor",   sub: "Improve your reading, writing, and vocab" },
    { icon: "Briefcase",  color: "#C0392B", label: "Career Explorer",  sub: "Explore careers that match your interests" },
  ];
  return (
    <div className="card" style={{ padding: 22, marginTop: 20 }}>
      <div style={{ marginBottom: 14 }}>
        <div className="t-h2" style={{ fontSize: 17, marginBottom: 2 }}>Tools &amp; Resources</div>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>Powerful AI tools to support your learning</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
        {tools.map((t) => {
          const IconComp = I[t.icon];
          return (
            <button key={t.label} style={{
              padding: "16px 12px",
              background: "var(--surface-quiet)",
              border: "none",
              borderRadius: 14,
              cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
              textAlign: "center",
              transition: "background 120ms",
              minHeight: 130,
            }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#EFEEF5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "var(--surface-quiet)"; }}
            >
              <IconComp size={26} color={t.color}/>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", lineHeight: 1.25, fontFamily: "var(--font-display)" }}>{t.label}</div>
              <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.4 }}>{t.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Recent Conversations ---------- */
function RecentConversations() {
  const items = [
    { title: "Help me understand photosynthesis",   sub: "We discussed the light reactions and Calvin cycle.",    when: "Today, 9:15 AM" },
    { title: "Feedback on my English essay",        sub: "Reviewed thesis, structure, and evidence.",             when: "Yesterday, 4:30 PM" },
    { title: "Study plan for Chemistry test",       sub: "Created a 5-day study plan with key topics.",           when: "May 16, 10:20 AM" },
  ];
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ marginBottom: 14 }}>
        <div className="t-h2" style={{ fontSize: 17, marginBottom: 2 }}>Recent Conversations</div>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>Pick up where you left off</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map((it, i) => (
          <button key={i} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto",
            gap: 12, alignItems: "center",
            padding: "12px 12px",
            background: "transparent",
            border: "none", borderRadius: 12,
            cursor: "pointer", textAlign: "left",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--surface-quiet)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "#EDE9FE",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <I.Messages size={15} color="#6D28D9"/>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 600, lineHeight: 1.4 }}>{it.title}</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4, marginTop: 1 }}>{it.sub}</div>
            </div>
            <div style={{ fontSize: 11, color: "var(--stone)", whiteSpace: "nowrap" }}>{it.when}</div>
          </button>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <button style={{
          background: "transparent", border: "none", color: "var(--student)",
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          View all conversations <I.ArrowRight size={12} color="var(--student)"/>
        </button>
      </div>
    </div>
  );
}

/* ---------- AI Insights ---------- */
function AIInsights() {
  const items = [
    { icon: "TrendUp",  color: "#2E9B62", bg: "#DCF7E8", title: "You're improving in Algebra!",          sub: "Your quiz scores have increased 18% this month." },
    { icon: "Target",   color: "#6D28D9", bg: "#EDE9FE", title: "Focus on consistency",                  sub: "Short daily study sessions help you most." },
    { icon: "Star",     color: "#F59E0B", bg: "#FEF0CB", title: "Great progress in Biology",             sub: "You've mastered 6 of 8 key topics." },
  ];
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ marginBottom: 14 }}>
        <div className="t-h2" style={{ fontSize: 17, marginBottom: 2 }}>AI Insights</div>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>What I'm noticing about your learning</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it, i) => {
          const IconComp = I[it.icon];
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "auto 1fr",
              gap: 12, alignItems: "flex-start",
              padding: "12px 12px",
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: it.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <IconComp size={16} color={it.color}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 600, lineHeight: 1.4 }}>{it.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4, marginTop: 1 }}>{it.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <button style={{
          background: "transparent", border: "none", color: "var(--student)",
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          See all insights <I.ArrowRight size={12} color="var(--student)"/>
        </button>
      </div>
    </div>
  );
}

window.AIHub = AIHub;

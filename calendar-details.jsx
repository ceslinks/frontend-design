/* ============================================================
   MY CALENDAR — Detail panels
   - CAL_ClassDetail   (right rail; Algebra II)
   - CAL_FieldTripDetail (right rail wider; Museum Field Trip)
   - CAL_FlexStudyDetail (full page; Library Flex Study)
   ============================================================ */

/* Tiny helpers */
function CalIconBox({ icon, bg, fg, size = 28, radius = 8, iconSize = 14 }) {
  const Ico = I[icon] || I.Sparkle;
  return (
    <div style={{
      width: size, height: size, borderRadius: radius, background: bg,
      display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <Ico size={iconSize} color={fg}/>
    </div>
  );
}

function CalAITool({ icon, label, sub, onClick, busy }) {
  const Ico = I[icon] || I.Sparkle;
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "flex-start", gap: 8,
      padding: "8px 10px", borderRadius: 8,
      border: "1px solid var(--mist)", background: "var(--paper)",
      width: "100%", textAlign: "left", cursor: "pointer",
    }}>
      <Ico size={14} color="var(--student-deep)" style={{ marginTop: 2 }}/>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 1 }}>{sub}</div>}
      </div>
      {busy && <I.Sparkle size={12} color="var(--student)" />}
    </button>
  );
}

/* ============================================================
   1. CLASS DETAIL — Algebra II right rail
   ============================================================ */
function CAL_ClassDetail({ onClose, onAskAI }) {
  const [aiResponse, setAiResponse] = React.useState(null);
  const [aiLoading, setAiLoading] = React.useState(null);

  const askAI = async (key, prompt) => {
    setAiLoading(key);
    setAiResponse(null);
    try {
      const text = await window.claude.complete(prompt);
      setAiResponse({ key, text });
    } catch {
      setAiResponse({ key, text: "AI is offline right now. Try again later." });
    } finally {
      setAiLoading(null);
    }
  };

  return (
    <aside style={{
      width: 320, flexShrink: 0,
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 14, padding: 18,
      alignSelf: "flex-start", position: "sticky", top: 12,
    }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Event Details</div>
        <button onClick={onClose} style={{ background: "transparent", border: "none", padding: 2, cursor: "pointer", color: "var(--stone)" }}>
          <I.X size={16}/>
        </button>
      </div>

      {/* Title block */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <CalIconBox icon="Atom" bg="#EFF6FF" fg="#3B82F6" size={42} radius={10} iconSize={20}/>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>Algebra II</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Tuesday, May 12</div>
          <div style={{ fontSize: 11.5, color: "var(--stone)" }}>8:00 – 9:15 AM</div>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        <button style={{
          flex: 1, padding: "8px 10px", borderRadius: 8,
          background: "var(--student)", color: "#fff",
          border: "none", fontWeight: 600, fontSize: 12, cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          <I.Video size={12} color="#fff"/> Join Class
        </button>
        <button style={{
          width: 36, height: 32, borderRadius: 8,
          background: "var(--bone)", color: "var(--slate)",
          border: "1px solid var(--mist)", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>···</button>
      </div>

      {/* Info rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 14, fontSize: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <I.MapPin size={13} color="var(--stone)" style={{ marginTop: 2, flexShrink: 0 }}/>
          <div>
            <div style={{ color: "var(--ink)", fontWeight: 500 }}>Room 203 · Building B</div>
            <div style={{ color: "var(--stone)" }}>Wyndam Park Academy</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <I.User size={13} color="var(--stone)" style={{ marginTop: 2, flexShrink: 0 }}/>
          <div style={{ color: "var(--ink)" }}>Mr. Kim</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <I.Team size={13} color="var(--stone)" style={{ flexShrink: 0 }}/>
          <div style={{ color: "var(--ink)" }}>28 students <span style={{ color: "var(--success)", fontWeight: 600 }}>+3 friends</span></div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 21 }}>
          {[0,1,2,3].map((i) => (
            <div key={i} style={{
              width: 22, height: 22, borderRadius: "50%",
              background: ["#F87171","#60A5FA","#FBBF24","#34D399"][i],
              border: "2px solid var(--paper)",
              marginLeft: i === 0 ? 0 : -8,
              fontSize: 9, fontWeight: 700, color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>{["JS","AM","KP","RT"][i]}</div>
          ))}
          <span style={{ marginLeft: 4, fontSize: 10, fontWeight: 600, color: "var(--stone)" }}>+25</span>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
          <I.Book size={13} color="var(--stone)" style={{ marginTop: 2, flexShrink: 0 }}/>
          <div style={{ color: "var(--ink)" }}>Quadratic Equations and Functions — Chapter 6</div>
        </div>
      </div>

      {/* Linked to */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: 0.4, marginBottom: 6 }}>LINKED TO</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: 10, borderRadius: 9,
          background: "var(--surface)", border: "1px solid var(--mist)",
        }}>
          <CalIconBox icon="File" bg="#FEF3F2" fg="#E04C4C" size={32} radius={7}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Quadratic Functions Homework</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>Due May 15</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <div style={{ flex: 1, height: 4, borderRadius: 99, background: "var(--mist)" }}>
                <div style={{ width: "60%", height: "100%", borderRadius: 99, background: "var(--success)" }}/>
              </div>
              <span style={{ fontSize: 10, color: "var(--stone)", fontWeight: 600 }}>60%</span>
            </div>
          </div>
          <I.ChevronRight size={13} color="var(--stone)"/>
        </div>
      </div>

      {/* Resources */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: 0.4, marginBottom: 6 }}>RESOURCES</div>
        {[
          { icon: "File", bg: "#F5F3FF", fg: "#7C3AED", title: "Lecture Slides", sub: "PDF" },
          { icon: "Edit", bg: "#EFF6FF", fg: "#3B82F6", title: "Practice Problems", sub: "Google Doc" },
          { icon: "Video", bg: "#FEF3F2", fg: "#E04C4C", title: "Video Lesson", sub: "YouTube (18 min)" },
        ].map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0" }}>
            <CalIconBox icon={r.icon} bg={r.bg} fg={r.fg} size={26} radius={6} iconSize={12}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500 }}>{r.title}</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{r.sub}</div>
            </div>
          </div>
        ))}
        <a href="#" style={{ fontSize: 11.5, fontWeight: 600, color: "var(--student-deep)", textDecoration: "none" }}>View All (4)</a>
      </div>

      {/* AI Tools */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: 0.4, marginBottom: 6 }}>AI TOOLS FOR THIS EVENT</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <CalAITool icon="Sparkle" label="Summarize Class Notes" busy={aiLoading === "summary"}
            onClick={() => askAI("summary", "In 3 short bullet points, summarize what a 10th-grader should remember from a 75-minute Algebra II class on Quadratic Equations and Functions, Chapter 6. Each bullet ≤ 18 words. No intro line.")}/>
          <CalAITool icon="Edit" label="Generate Practice Quiz" busy={aiLoading === "quiz"}
            onClick={() => askAI("quiz", "Write 3 practice questions for a 10th grader on quadratic functions (vertex form, factoring, real roots). Number them 1, 2, 3. One short line each. No answers.")}/>
          <CalAITool icon="MessageSquare" label="Ask a Question" busy={aiLoading === "ask"}
            onClick={() => askAI("ask", "Explain in plain language for a 10th-grader: what is the discriminant of a quadratic, and what does its sign tell you? 2-3 short sentences.")}/>
        </div>
        {aiResponse && (
          <div style={{
            marginTop: 8, padding: 10, borderRadius: 8,
            background: "var(--student-50)", border: "1px solid var(--student-200)",
            fontSize: 11.5, color: "var(--ink)", lineHeight: 1.5, whiteSpace: "pre-wrap",
          }}>{aiResponse.text}</div>
        )}
      </div>

      {/* Actions */}
      <div style={{ borderTop: "1px solid var(--mist)", paddingTop: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: 0.4, marginBottom: 8 }}>ACTIONS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <button style={btnGhost}><I.Plus size={11} color="var(--slate)"/> Add to To Do</button>
          <button style={btnGhost}><I.MessageSquare size={11} color="var(--slate)"/> Message Class</button>
        </div>
      </div>
    </aside>
  );
}

const btnGhost = {
  padding: "8px 10px", borderRadius: 8,
  background: "var(--paper)", border: "1px solid var(--mist)",
  fontSize: 11.5, fontWeight: 600, color: "var(--slate)",
  cursor: "pointer",
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 5,
};

/* ============================================================
   2. FIELD TRIP DETAIL — Museum, wide right rail
   ============================================================ */
function CAL_FieldTripDetail({ onClose }) {
  const [tab, setTab] = React.useState("details");
  const [aiResults, setAiResults] = React.useState({}); // { topics, guide, quiz: text }
  const [aiBusy, setAiBusy] = React.useState(null);

  const askAI = async (key, prompt) => {
    setAiBusy(key);
    try {
      const text = await window.claude.complete(prompt);
      setAiResults((r) => ({ ...r, [key]: text }));
    } catch {
      setAiResults((r) => ({ ...r, [key]: "AI is offline." }));
    } finally {
      setAiBusy(null);
    }
  };

  return (
    <aside style={{
      width: 380, flexShrink: 0,
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 14,
      alignSelf: "flex-start", position: "sticky", top: 12,
      maxHeight: "calc(100vh - 24px)", overflowY: "auto",
    }}>
      {/* Header */}
      <div style={{ padding: 18, paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <CalIconBox icon="MapPin" bg="#FEF3F2" fg="#E04C4C" size={36} radius={9} iconSize={18}/>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>Museum Field Trip</div>
                <span style={{ fontSize: 9.5, padding: "2px 8px", borderRadius: 99, background: "#F0FDF4", color: "#16A34A", fontWeight: 700, letterSpacing: 0.3 }}>SCHOOL EVENT</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>Thursday, May 14, 2026 · 3:30 PM – 7:30 PM (4h)</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "transparent", border: "none", padding: 2, cursor: "pointer", color: "var(--stone)" }}>
            <I.X size={16}/>
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 18, borderBottom: "1px solid var(--mist)" }}>
          {[
            { id: "details", label: "Details" },
            { id: "attendees", label: "Attendees (15)" },
            { id: "resources", label: "Resources" },
            { id: "ai", label: "AI Assistant" },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 0", border: "none", background: "transparent",
              borderBottom: tab === t.id ? "2px solid var(--student)" : "2px solid transparent",
              color: tab === t.id ? "var(--student-deep)" : "var(--stone)",
              fontWeight: 600, fontSize: 12.5, cursor: "pointer",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: 18 }}>
        {tab === "details" && <FieldTripDetailsTab/>}
        {tab === "attendees" && <FieldTripAttendeesTab/>}
        {tab === "resources" && <FieldTripResourcesTab/>}
        {tab === "ai" && <FieldTripAITab askAI={askAI} aiResults={aiResults} aiBusy={aiBusy}/>}
      </div>

      {/* Footer */}
      <div style={{
        position: "sticky", bottom: 0,
        borderTop: "1px solid var(--mist)", padding: "12px 16px",
        background: "var(--paper)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <button style={btnGhost}><I.Plus size={11} color="var(--slate)"/> Add to To Do</button>
        <button style={btnGhost}><I.Calendar size={11} color="var(--slate)"/> Add to Calendar</button>
        <button style={{ ...btnGhost, background: "var(--student)", color: "#fff", border: "none" }}>
          <I.MessageSquare size={11} color="#fff"/> Start Conversation
        </button>
        <button style={{ ...btnGhost, padding: "8px 8px" }}>···</button>
      </div>
    </aside>
  );
}

function FieldTripDetailsTab() {
  return (
    <div style={{ fontSize: 12 }}>
      {/* Location + organizer side by side */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: 0.4, marginBottom: 6 }}>LOCATION</div>
          <div style={{ color: "var(--ink)", fontWeight: 600 }}>City Science Museum</div>
          <div style={{ color: "var(--stone)", fontSize: 11.5 }}>433 River St, Raleigh, NC 27601</div>
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", letterSpacing: 0.4, marginBottom: 6 }}>ORGANIZER</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #6D28D9, #C4B5FD)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700 }}>ML</div>
            <div>
              <div style={{ color: "var(--ink)", fontWeight: 600 }}>Ms. Lopez (Biology)</div>
              <div style={{ color: "var(--stone)", fontSize: 10.5 }}>Teacher</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, color: "var(--stone)" }}>
            <I.Mail size={12} color="var(--stone)"/>
            <span style={{ fontSize: 11 }}>mlopez@wynpark.edu</span>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div style={{
        position: "relative",
        height: 110, borderRadius: 10, marginBottom: 14,
        background: "linear-gradient(135deg, #EFF6FF 0%, #F5F3FF 50%, #FEF3F2 100%)",
        border: "1px solid var(--mist)", overflow: "hidden",
      }}>
        {/* fake roads */}
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <path d="M 0 60 Q 100 40 200 70 T 380 50" stroke="#fff" strokeWidth="6" fill="none"/>
          <path d="M 100 0 Q 130 60 90 110" stroke="#fff" strokeWidth="4" fill="none"/>
          <path d="M 250 0 L 270 110" stroke="#fff" strokeWidth="4" fill="none"/>
        </svg>
        <div style={{
          position: "absolute", left: "50%", top: "45%", transform: "translate(-50%, -50%)",
          width: 26, height: 26, borderRadius: "50% 50% 50% 0",
          background: "#E04C4C", transform: "translate(-50%, -50%) rotate(-45deg)",
          boxShadow: "0 4px 10px rgba(220,76,76,0.4)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff" }}/>
        </div>
        <button style={{
          position: "absolute", bottom: 10, right: 10,
          padding: "5px 10px", borderRadius: 7,
          background: "var(--paper)", border: "1px solid var(--mist)",
          fontSize: 11, fontWeight: 600, color: "var(--slate)",
          display: "inline-flex", alignItems: "center", gap: 4, cursor: "pointer",
        }}><I.Navigation size={11} color="var(--slate)"/> Directions</button>
      </div>

      {/* About */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>About This Event</div>
        <div style={{ fontSize: 11.5, color: "var(--slate)", lineHeight: 1.5 }}>
          We'll explore the Human Biology exhibit and attend a live demonstration in the Innovation Lab. Wear comfortable shoes and bring a notebook.
        </div>
      </div>

      {/* What you need to do */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>What You Need To Do</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: 10, borderRadius: 9, background: "var(--bone)",
          marginBottom: 6,
        }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--silver)" }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)" }}>Field Trip Permission Slip</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>Due by Tue, May 12</div>
          </div>
          <button style={{
            padding: "5px 12px", borderRadius: 7, background: "var(--student)", color: "#fff",
            border: "none", fontSize: 11, fontWeight: 600, cursor: "pointer",
          }}>Open Form</button>
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: 10, borderRadius: 9, background: "var(--bone)",
        }}>
          <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid var(--silver)" }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)" }}>Reflection Journal</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>Due May 18</div>
          </div>
          <a href="#" style={{ fontSize: 11, fontWeight: 600, color: "var(--student-deep)", textDecoration: "none" }}>View Assignment ›</a>
        </div>
      </div>

      {/* Prepare with AI BETA */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Prepare with AI</span>
            <span style={{ fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 4, background: "var(--student-50)", color: "var(--student-deep)", letterSpacing: 0.4 }}>BETA</span>
          </div>
          <a href="#" style={{ fontSize: 11, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>See All</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {[
            { icon: "Sparkle", title: "What Will We Learn?", sub: "Preview key topics and exhibit highlights." },
            { icon: "Book",    title: "Study Guide",         sub: "Create a guide to get the most out of this trip." },
            { icon: "Edit",    title: "Pre-Trip Quiz",       sub: "Test your knowledge before we go." },
          ].map((c, i) => {
            const Ico = I[c.icon] || I.Sparkle;
            return (
              <div key={i} style={{
                padding: 9, borderRadius: 8,
                border: "1px solid var(--student-200)",
                background: "linear-gradient(180deg, #FAFAFE, #F5F3FF)",
              }}>
                <Ico size={13} color="var(--student-deep)"/>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--ink)", marginTop: 5, lineHeight: 1.25 }}>{c.title}</div>
                <div style={{ fontSize: 10, color: "var(--stone)", marginTop: 3, lineHeight: 1.4 }}>{c.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reserve & Request */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Reserve & Request</div>
        {[
          { icon: "MapPin", iconBg: "#F5F3FF", iconFg: "#7C3AED", title: "Reserve Study Space", sub: "Book a quiet space before or after the trip.", cta: "Reserve" },
          { icon: "Box",    iconBg: "#FFF7ED", iconFg: "#EA8C2A", title: "Request Equipment",   sub: "Need a whiteboard, cart, or other materials?", cta: "Request" },
        ].map((r, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: 10, borderRadius: 9,
            background: "var(--bone)", marginBottom: 6,
          }}>
            <CalIconBox icon={r.icon} bg={r.iconBg} fg={r.iconFg} size={32} radius={7}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)" }}>{r.title}</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{r.sub}</div>
            </div>
            <button style={{
              padding: "5px 14px", borderRadius: 7,
              background: "var(--paper)", border: "1px solid var(--mist)",
              color: "var(--student-deep)", fontWeight: 600, fontSize: 11, cursor: "pointer",
            }}>{r.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldTripAttendeesTab() {
  const people = [
    { name: "Alex Johnson", you: true,  role: "Student" },
    { name: "Maya Patel",   role: "Student" },
    { name: "Jordan Smith", role: "Student" },
    { name: "Riley Chen",   role: "Student" },
    { name: "Kai Brooks",   role: "Student" },
    { name: "Sam Lee",      role: "Student" },
    { name: "Ms. Lopez",    role: "Organizer" },
    { name: "Mr. Park",     role: "Chaperone" },
  ];
  return (
    <div>
      <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 8 }}>15 going · 3 maybe · 0 declined</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {people.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 10px", borderRadius: 8,
            background: p.you ? "var(--student-50)" : "transparent",
          }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: ["#F87171","#60A5FA","#FBBF24","#34D399","#A78BFA","#FB923C","#22D3EE","#F472B6"][i % 8], color: "#fff", fontSize: 10, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              {p.name.split(" ").map(n => n[0]).join("").slice(0,2)}
            </div>
            <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>
              {p.name}{p.you && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 700, color: "var(--student-deep)" }}>(You)</span>}
            </div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{p.role}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FieldTripResourcesTab() {
  return (
    <div>
      {[
        { icon: "File",  bg: "#F5F3FF", fg: "#7C3AED", title: "Permission Slip Template", sub: "PDF · 1 page" },
        { icon: "File",  bg: "#FEF3F2", fg: "#E04C4C", title: "Trip Itinerary",          sub: "PDF · 3 pages" },
        { icon: "Edit",  bg: "#EFF6FF", fg: "#3B82F6", title: "Pre-Trip Worksheet",      sub: "Google Doc" },
        { icon: "Video", bg: "#F0FDF4", fg: "#16A34A", title: "Museum Virtual Tour",     sub: "YouTube · 8 min" },
      ].map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 3 ? "1px solid var(--mist)" : "none" }}>
          <CalIconBox icon={r.icon} bg={r.bg} fg={r.fg} size={32} radius={7}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{r.title}</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{r.sub}</div>
          </div>
          <I.ChevronRight size={13} color="var(--stone)"/>
        </div>
      ))}
    </div>
  );
}

function FieldTripAITab({ askAI, aiResults, aiBusy }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 9, background: "var(--student-50)", marginBottom: 12, border: "1px solid var(--student-200)" }}>
        <I.Sparkle size={14} color="var(--student)"/>
        <div style={{ fontSize: 11.5, color: "var(--ink)" }}>Real AI prep tools — ask anything about this trip.</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <CalAITool icon="Sparkle" label="What Will We Learn?" sub="Preview the key topics from the museum exhibit"
          busy={aiBusy === "topics"}
          onClick={() => askAI("topics", "Preview the 3-4 key topics a 10th grader will likely learn during a 4-hour field trip to a city science museum focused on a Human Biology exhibit and an Innovation Lab demo. Use short bullet points, ≤ 14 words each. No intro sentence.")}/>
        {aiResults.topics && (
          <div style={aiResultBox}>{aiResults.topics}</div>
        )}
        <CalAITool icon="Book" label="Generate Study Guide" sub="One-page guide tailored to the trip"
          busy={aiBusy === "guide"}
          onClick={() => askAI("guide", "Write a 5-line study guide for a 10th grader visiting a Human Biology museum exhibit. Each line is one bite-sized fact. No headers, just the lines.")}/>
        {aiResults.guide && (
          <div style={aiResultBox}>{aiResults.guide}</div>
        )}
        <CalAITool icon="Edit" label="Pre-Trip Quiz" sub="3 practice questions before we go"
          busy={aiBusy === "quiz"}
          onClick={() => askAI("quiz", "Write 3 multiple-choice questions for a 10th-grader visiting a Human Biology exhibit. Format: Q1) ... a) b) c) d). Don't reveal the answers.")}/>
        {aiResults.quiz && (
          <div style={aiResultBox}>{aiResults.quiz}</div>
        )}
      </div>
    </div>
  );
}

const aiResultBox = {
  padding: 10, borderRadius: 8,
  background: "var(--student-50)", border: "1px solid var(--student-200)",
  fontSize: 11.5, color: "var(--ink)", lineHeight: 1.5, whiteSpace: "pre-wrap",
};

/* ============================================================
   3. FLEX STUDY DETAIL — Full page (replaces calendar)
   ============================================================ */
function CAL_FlexStudyDetail({ onBack }) {
  const [tab, setTab] = React.useState("location"); // overview | location | notes | resources | related
  const [showRoute, setShowRoute] = React.useState(true);
  const [floor, setFloor] = React.useState("1st");
  const [status, setStatus] = React.useState("Going");

  return (
    <div style={{ padding: 24, maxWidth: 1280, margin: "0 auto" }}>
      {/* Back */}
      <button onClick={onBack} style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "transparent", border: "none", padding: "6px 0",
        fontSize: 12, color: "var(--stone)", fontWeight: 600,
        cursor: "pointer", marginBottom: 14,
      }}>
        <I.ChevronLeft size={13} color="var(--stone)"/> Back to Calendar
      </button>

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>Flex Study Session</h1>
            <span style={{ fontSize: 10.5, padding: "3px 10px", borderRadius: 99, background: "#EFF6FF", color: "#1D4ED8", fontWeight: 700, letterSpacing: 0.3 }}>ON CAMPUS</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)" }}>
            Group Study · Organized by Ms. Carter · Created May 8
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={{ ...btnGhost, padding: "8px 14px" }}><I.Calendar size={11} color="var(--slate)"/> Add to Calendar</button>
          <button style={{ ...btnGhost, padding: "8px 12px" }}>···</button>
        </div>
      </div>

      {/* Quick facts row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 0.8fr", gap: 12, marginTop: 14, marginBottom: 18 }}>
        {[
          { icon: "Calendar", iconBg: "#F5F3FF", iconFg: "#7C3AED", value: "Thursday, May 15, 2026" },
          { icon: "Clock",    iconBg: "#FEF0C7", iconFg: "#B54708", value: "2:30 PM – 4:00 PM (1h 30m)" },
          { icon: "MapPin",   iconBg: "#FEF3F2", iconFg: "#E04C4C", value: "Library – East Wing", sub: "Open Study Zone B" },
        ].map((f, i) => {
          const Ico = I[f.icon] || I.Calendar;
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "12px 14px", borderRadius: 10,
              background: "var(--paper)", border: "1px solid var(--mist)",
            }}>
              <CalIconBox icon={f.icon} bg={f.iconBg} fg={f.iconFg} size={32} radius={8}/>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{f.value}</div>
                {f.sub && <div style={{ fontSize: 11, color: "var(--stone)" }}>{f.sub}</div>}
              </div>
            </div>
          );
        })}
        <button onClick={() => setStatus(status === "Going" ? "Maybe" : "Going")} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          padding: "12px 14px", borderRadius: 10,
          background: status === "Going" ? "#F0FDF4" : "var(--paper)",
          border: status === "Going" ? "1px solid #86EFAC" : "1px solid var(--mist)",
          color: status === "Going" ? "#15803D" : "var(--ink)",
          fontWeight: 700, fontSize: 13, cursor: "pointer",
        }}>
          <I.Check size={14} color={status === "Going" ? "#15803D" : "var(--stone)"}/> {status}
          <I.ChevronDown size={11} color={status === "Going" ? "#15803D" : "var(--stone)"}/>
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 22, borderBottom: "1px solid var(--mist)", marginBottom: 16 }}>
        {[
          { id: "overview",  label: "Overview" },
          { id: "location",  label: "Location" },
          { id: "notes",     label: "Notes" },
          { id: "resources", label: "Resources" },
          { id: "related",   label: "Related" },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: "8px 0", border: "none", background: "transparent",
            borderBottom: tab === t.id ? "2px solid var(--student)" : "2px solid transparent",
            color: tab === t.id ? "var(--student-deep)" : "var(--stone)",
            fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Two-col body */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, alignItems: "start" }}>
        <div>
          {tab === "location" && <FlexStudyLocationTab showRoute={showRoute} setShowRoute={setShowRoute} floor={floor} setFloor={setFloor}/>}
          {tab === "overview" && <FlexStudyOverviewTab/>}
          {tab === "notes" && <FlexStudyNotesTab/>}
          {tab === "resources" && <FlexStudyResourcesTab/>}
          {tab === "related" && <FlexStudyRelatedTab/>}
        </div>
        <FlexStudyRightRail status={status} setStatus={setStatus}/>
      </div>

      {/* Bottom bar */}
      <div style={{
        marginTop: 18, padding: "12px 16px",
        background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 12,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--stone)" }}>
          <I.Bell size={13} color="var(--stone)"/> You'll get a reminder 15 minutes before this event.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={btnGhost}><I.Edit size={11} color="var(--slate)"/> Edit Event</button>
          <button style={{ ...btnGhost, background: "#FEF3F2", border: "1px solid #FECDCA", color: "#B42318" }}>
            <I.X size={11} color="#B42318"/> Cancel Event
          </button>
        </div>
      </div>
    </div>
  );
}

function FlexStudyLocationTab({ showRoute, setShowRoute, floor, setFloor }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 14, alignItems: "start" }}>
      {/* Left column inside tab: campus selector + legend */}
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Campus Map</div>
        <div style={{
          padding: "8px 10px", borderRadius: 8,
          background: "var(--paper)", border: "1px solid var(--mist)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          fontSize: 12, fontWeight: 600, color: "var(--ink)", marginBottom: 8,
        }}>Main Campus <I.ChevronDown size={11} color="var(--stone)"/></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 16 }}>
          {[
            { id: "Campus", label: "Campus", icon: "MapPin" },
            { id: "1st",    label: "1st Floor", icon: "Layers" },
            { id: "2nd",    label: "2nd Floor", icon: "Layers" },
          ].map((f) => {
            const Ico = I[f.icon] || I.MapPin;
            const on = floor === f.id;
            return (
              <button key={f.id} onClick={() => setFloor(f.id)} style={{
                padding: "10px 4px", borderRadius: 8,
                background: on ? "var(--student-50)" : "var(--paper)",
                border: on ? "1px solid var(--student-300)" : "1px solid var(--mist)",
                color: on ? "var(--student-deep)" : "var(--slate)",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                fontSize: 11, fontWeight: 600, cursor: "pointer",
              }}>
                <Ico size={13} color={on ? "var(--student-deep)" : "var(--stone)"}/>
                {f.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Map Legend</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11.5 }}>
          {[
            { icon: "MapPin", color: "#3B82F6", label: "Your Location" },
            { icon: "MapPin", color: "#7C3AED", label: "Event Location" },
            { swatch: "#DBEAFE", label: "Classrooms" },
            { swatch: "#EDE9FE", label: "Study Areas" },
            { swatch: "#FEF3C7", label: "Labs" },
            { swatch: "#FEE2E2", label: "Offices" },
            { swatch: "#D1FAE5", label: "Amenities" },
          ].map((l, i) => {
            const Ico = l.icon ? (I[l.icon] || I.MapPin) : null;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {Ico ? (
                  <div style={{ width: 14, display: "inline-flex", justifyContent: "center" }}>
                    <Ico size={11} color={l.color}/>
                  </div>
                ) : (
                  <div style={{ width: 14, height: 10, borderRadius: 3, background: l.swatch, border: "1px solid rgba(0,0,0,0.05)" }}/>
                )}
                <span style={{ color: "var(--slate)" }}>{l.label}</span>
              </div>
            );
          })}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 12, color: "var(--ink)", fontWeight: 600 }}>
          Show Route
          <button onClick={() => setShowRoute(!showRoute)} style={{
            width: 30, height: 17, borderRadius: 99,
            background: showRoute ? "var(--student)" : "var(--mist)",
            border: "none", padding: 0, cursor: "pointer", position: "relative",
          }}>
            <span style={{
              position: "absolute", top: 2, left: showRoute ? 15 : 2,
              width: 13, height: 13, borderRadius: "50%", background: "#fff",
              transition: "left .15s",
            }}/>
          </button>
        </label>
      </div>

      {/* Map */}
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>East Wing — 1st Floor</div>
        <FlexStudyMap showRoute={showRoute}/>

        {/* Route info bar */}
        <div style={{
          marginTop: 8, padding: "10px 14px",
          background: "var(--paper)", border: "1px solid var(--mist)",
          borderRadius: 9,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <I.Walk size={14} color="var(--success)"/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>3 min <span style={{ fontWeight: 500, color: "var(--stone)" }}>(0.1 mi) · Fastest route</span></div>
              <div style={{ fontSize: 11, color: "var(--stone)" }}>From your current location to Open Study Zone B</div>
            </div>
          </div>
          <button style={{
            padding: "6px 14px", borderRadius: 7,
            background: "var(--paper)", border: "1px solid var(--student-200)",
            color: "var(--student-deep)", fontWeight: 600, fontSize: 12,
            display: "inline-flex", alignItems: "center", gap: 5, cursor: "pointer",
          }}><I.Navigation size={11} color="var(--student-deep)"/> Route me</button>
        </div>

        {/* Space card */}
        <div style={{
          marginTop: 12, padding: 12,
          background: "var(--paper)", border: "1px solid var(--mist)",
          borderRadius: 10,
          display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 14, alignItems: "center",
        }}>
          <div style={{
            height: 76, borderRadius: 8,
            background: "linear-gradient(135deg, #DBEAFE, #EDE9FE)",
            border: "1px solid var(--mist)",
            position: "relative", overflow: "hidden",
          }}>
            {/* fake desk drawing */}
            <div style={{ position: "absolute", left: 14, bottom: 16, width: 80, height: 30, background: "#fff", border: "1px solid var(--mist)", borderRadius: 4 }}/>
            <div style={{ position: "absolute", left: 18, bottom: 8, width: 10, height: 8, background: "#94A3B8", borderRadius: 2 }}/>
            <div style={{ position: "absolute", left: 38, bottom: 8, width: 10, height: 8, background: "#94A3B8", borderRadius: 2 }}/>
            <div style={{ position: "absolute", left: 58, bottom: 8, width: 10, height: 8, background: "#94A3B8", borderRadius: 2 }}/>
            <div style={{ position: "absolute", left: 78, bottom: 8, width: 10, height: 8, background: "#94A3B8", borderRadius: 2 }}/>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Open Study Zone B</div>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "#EFF6FF", color: "#1D4ED8", fontWeight: 600 }}>Quiet Study</span>
              <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "#F0FDF4", color: "#15803D", fontWeight: 600 }}>Collaboration Friendly</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6, fontSize: 11, color: "var(--stone)" }}>
              <span>Capacity:</span>
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>12 / 30 seats occupied</span>
              <span style={{ flex: 1, marginLeft: 4, height: 4, borderRadius: 99, background: "var(--mist)", maxWidth: 100 }}>
                <span style={{ display: "block", height: "100%", width: "40%", background: "var(--success)", borderRadius: 99 }}/>
              </span>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: 11, color: "var(--stone)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><I.Edit size={11} color="var(--stone)"/> Whiteboards</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><I.Plug size={11} color="var(--stone)"/> Power Outlets</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><I.Wifi size={11} color="var(--stone)"/> Wi-Fi</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><I.Printer size={11} color="var(--stone)"/> Printer</span>
            </div>
          </div>
          <button style={{
            padding: "6px 12px", borderRadius: 7,
            background: "var(--paper)", border: "1px solid var(--mist)",
            color: "var(--student-deep)", fontWeight: 600, fontSize: 12, cursor: "pointer",
          }}>View Space Details</button>
        </div>
      </div>
    </div>
  );
}

function FlexStudyMap({ showRoute }) {
  return (
    <div style={{
      position: "relative",
      height: 320, borderRadius: 10,
      background: "#FAF9FC", border: "1px solid var(--mist)",
      overflow: "hidden",
    }}>
      {/* zoom controls */}
      <div style={{ position: "absolute", right: 10, top: 10, display: "flex", flexDirection: "column", gap: 4, zIndex: 3 }}>
        <button style={{ width: 28, height: 28, borderRadius: 7, background: "var(--paper)", border: "1px solid var(--mist)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><I.Plus size={12} color="var(--slate)"/></button>
        <button style={{ width: 28, height: 28, borderRadius: 7, background: "var(--paper)", border: "1px solid var(--mist)", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, color: "var(--slate)", paddingBottom: 3 }}>−</button>
      </div>

      {/* SVG floor plan */}
      <svg viewBox="0 0 600 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {/* west wing */}
        <rect x="20" y="40" width="120" height="240" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5"/>
        <text x="50" y="160" fontSize="9" fill="#64748B" fontWeight="600">West</text>
        <text x="50" y="172" fontSize="9" fill="#64748B" fontWeight="600">Wing</text>

        {/* library stacks */}
        <rect x="150" y="40" width="120" height="100" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5"/>
        <text x="180" y="92" fontSize="10" fill="#92400E" fontWeight="700">Library</text>
        <text x="184" y="106" fontSize="10" fill="#92400E" fontWeight="700">Stacks</text>

        {/* quiet study A */}
        <rect x="280" y="40" width="200" height="100" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1.5"/>
        <text x="330" y="86" fontSize="11" fill="#5B21B6" fontWeight="700">Quiet Study</text>
        <text x="338" y="100" fontSize="11" fill="#5B21B6" fontWeight="700">Zone A</text>

        {/* computer lab */}
        <rect x="150" y="150" width="120" height="80" fill="#FEE2E2" stroke="#FECACA" strokeWidth="1.5"/>
        <text x="170" y="186" fontSize="10" fill="#991B1B" fontWeight="700">Computer</text>
        <text x="184" y="200" fontSize="10" fill="#991B1B" fontWeight="700">Lab 1</text>

        {/* group study room 1 */}
        <rect x="280" y="150" width="100" height="80" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5"/>
        <text x="294" y="186" fontSize="10" fill="#92400E" fontWeight="700">Group Study</text>
        <text x="306" y="200" fontSize="10" fill="#92400E" fontWeight="700">Room 1</text>

        {/* OPEN STUDY ZONE B (event location) */}
        <rect x="390" y="150" width="160" height="100" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2.5"/>
        <text x="424" y="194" fontSize="11" fill="#5B21B6" fontWeight="700">Open Study</text>
        <text x="436" y="208" fontSize="11" fill="#5B21B6" fontWeight="700">Zone B</text>

        {/* study room 101 */}
        <rect x="220" y="240" width="200" height="60" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1.5"/>
        <text x="284" y="274" fontSize="10" fill="#475569" fontWeight="700">Study Room 101</text>

        {/* library entrance label */}
        <text x="555" y="135" fontSize="9" fill="#64748B" fontWeight="600">Library</text>
        <text x="552" y="146" fontSize="9" fill="#64748B" fontWeight="600">Entrance</text>
        <line x1="550" y1="150" x2="560" y2="160" stroke="#94A3B8" strokeWidth="1" strokeDasharray="2,2"/>

        {/* small icons */}
        <text x="195" y="278" fontSize="14">🚻</text>
        <text x="370" y="265" fontSize="14"></text>

        {/* "You are here" pin */}
        <g transform="translate(160, 170)">
          <circle r="9" fill="#3B82F6" stroke="#fff" strokeWidth="2.5"/>
          <circle r="3" fill="#fff"/>
        </g>
        <rect x="115" y="148" width="86" height="18" rx="4" fill="#3B82F6"/>
        <text x="125" y="160" fontSize="10" fill="#fff" fontWeight="700">You are here</text>

        {/* Event pin (Open Study Zone B) */}
        <g transform="translate(470, 175)">
          <path d="M 0 -16 C -10 -16, -16 -8, -16 0 C -16 8, 0 22, 0 22 C 0 22, 16 8, 16 0 C 16 -8, 10 -16, 0 -16 Z"
                fill="#7C3AED" stroke="#fff" strokeWidth="2"/>
          <circle r="5" cy="-2" fill="#fff"/>
        </g>

        {/* Route */}
        {showRoute && (
          <path d="M 160 170 Q 250 130 340 170 T 470 175"
                fill="none" stroke="#7C3AED" strokeWidth="3" strokeDasharray="6,5" strokeLinecap="round"/>
        )}
      </svg>
    </div>
  );
}

function FlexStudyOverviewTab() {
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 18 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Session Plan</div>
      <ol style={{ paddingLeft: 18, fontSize: 12, color: "var(--slate)", lineHeight: 1.7, margin: 0 }}>
        <li>Warm-up: review last week's quiz mistakes (10 min)</li>
        <li>Practice problem set — quadratic word problems (40 min)</li>
        <li>Group share: explain one solution to the group (20 min)</li>
        <li>Wrap-up + plan next session (20 min)</li>
      </ol>
    </div>
  );
}

function FlexStudyNotesTab() {
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 18, fontSize: 12, color: "var(--slate)", lineHeight: 1.6 }}>
      No notes yet. Click <strong style={{ color: "var(--student-deep)" }}>+ Add Note</strong> in the right rail to start.
    </div>
  );
}
function FlexStudyResourcesTab() {
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 14 }}>
      {[
        { icon: "File", bg: "#F5F3FF", fg: "#7C3AED", title: "Quadratics Practice Set", sub: "PDF · 4 pages" },
        { icon: "Edit", bg: "#EFF6FF", fg: "#3B82F6", title: "Group Worksheet",         sub: "Google Doc" },
      ].map((r, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < 1 ? "1px solid var(--mist)" : "none" }}>
          <CalIconBox icon={r.icon} bg={r.bg} fg={r.fg} size={32} radius={7}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{r.title}</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{r.sub}</div>
          </div>
          <I.ChevronRight size={13} color="var(--stone)"/>
        </div>
      ))}
    </div>
  );
}
function FlexStudyRelatedTab() {
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 14, fontSize: 12, color: "var(--slate)" }}>
      Linked to <strong style={{ color: "var(--ink)" }}>Algebra II – Period 2</strong> (Ms. Carter).
    </div>
  );
}

function FlexStudyRightRail({ status, setStatus }) {
  return (
    <aside style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Attendees */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Attendees (8)</div>
          <a href="#" style={{ fontSize: 11, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>See all</a>
        </div>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 12 }}>
          {[0,1,2,3,4].map((i) => (
            <div key={i} style={{
              width: 30, height: 30, borderRadius: "50%",
              background: ["#F87171","#60A5FA","#FBBF24","#34D399","#A78BFA"][i], color: "#fff",
              border: "2px solid var(--paper)", marginLeft: i === 0 ? 0 : -8,
              fontSize: 10, fontWeight: 700,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>{["MP","JS","RC","KB","SL"][i]}</div>
          ))}
          <span style={{ marginLeft: 4, fontSize: 11, padding: "5px 10px", borderRadius: 99, background: "var(--bone)", color: "var(--slate)", fontWeight: 700 }}>+3</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", borderRadius: 8, background: "var(--bone)" }}>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Your status</span>
          <button onClick={() => setStatus(status === "Going" ? "Maybe" : "Going")} style={{
            padding: "3px 10px", borderRadius: 99,
            background: status === "Going" ? "#F0FDF4" : "var(--paper)",
            border: status === "Going" ? "1px solid #86EFAC" : "1px solid var(--mist)",
            color: status === "Going" ? "#15803D" : "var(--ink)",
            fontWeight: 700, fontSize: 11, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 4,
          }}><I.Check size={10} color={status === "Going" ? "#15803D" : "var(--stone)"}/> {status} <I.ChevronDown size={9} color={status === "Going" ? "#15803D" : "var(--stone)"}/></button>
        </div>
      </div>

      {/* Description */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Event Description</div>
        <div style={{ fontSize: 11.5, color: "var(--slate)", lineHeight: 1.5 }}>
          Join us for a focused group study session as we prepare for the upcoming Algebra II test. Bring your notes and questions!
        </div>
      </div>

      {/* Before you go */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Before You Go</div>
        {[
          { done: true,  label: "Bring your class notes" },
          { done: true,  label: "Review practice problems" },
          { done: false, label: "Charger / headphones" },
          { done: false, label: "Ask questions!" },
        ].map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 11.5 }}>
            <span style={{
              width: 16, height: 16, borderRadius: 4,
              background: c.done ? "var(--success)" : "transparent",
              border: c.done ? "none" : "1.5px solid var(--silver)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>{c.done && <I.Check size={10} color="#fff"/>}</span>
            <span style={{ color: c.done ? "var(--stone)" : "var(--ink)", textDecoration: c.done ? "line-through" : "none" }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Related to your classes */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Related to Your Classes</div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          padding: 8, borderRadius: 8, background: "var(--surface)",
        }}>
          <CalIconBox icon="Atom" bg="#EFF6FF" fg="#3B82F6" size={32} radius={7}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Algebra II – Period 2</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>Ms. Carter</div>
          </div>
          <I.ChevronRight size={13} color="var(--stone)"/>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 10, padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Quick Actions</div>
        {[
          { icon: "Edit",          label: "Add Note" },
          { icon: "Share",         label: "Share Event" },
          { icon: "MessageSquare", label: "Message Group" },
          { icon: "Check",         label: "Add to To Do" },
        ].map((a, i) => {
          const Ico = I[a.icon] || I.Plus;
          return (
            <button key={i} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "8px 0", border: "none", background: "transparent",
              width: "100%", textAlign: "left", cursor: "pointer",
              fontSize: 12, color: "var(--ink)", fontWeight: 500,
            }}>
              <Ico size={13} color="var(--student-deep)"/> {a.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

window.CAL_ClassDetail = CAL_ClassDetail;
window.CAL_FieldTripDetail = CAL_FieldTripDetail;
window.CAL_FlexStudyDetail = CAL_FlexStudyDetail;

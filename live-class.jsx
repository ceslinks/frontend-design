// Live Class — 1:1 with mockup
// Top bar inside page (Algebra II + LIVE + timer + Class Info icons)
// Stage with whiteboard "Vertex Form" + LIVE QUESTION overlay
// Participant strip with star tiles + "+20 More"
// Bottom info row: Class Goals / Today's Agenda / Class Progress / Next Up
// Right rail tabs: Class Chat | Questions | Polls | AI Tutor (with Claude)

function LiveClassPage({ classId }) {
  const c = ClassesData[classId] || ClassesData.algebra2;
  const [topTab, setTopTab] = React.useState("chat"); // chat | questions | polls | ai
  const [showAITutorPanel, setShowAITutorPanel] = React.useState(true); // bottom AI card on chat tab
  const [mic, setMic] = React.useState(false);
  const [cam, setCam] = React.useState(true);
  const [hand, setHand] = React.useState(false);
  const [answer, setAnswer] = React.useState("C"); // selected answer in live question
  const [timer, setTimer] = React.useState(24 * 60 + 17); // seconds
  React.useEffect(() => {
    const id = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (s) => `${String(Math.floor(s / 3600)).padStart(2, "0")}:${String(Math.floor((s % 3600) / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div style={{ background: "var(--bone)", minHeight: "calc(100vh - 56px)" }}>
      {/* Page-level header bar */}
      <LiveTopBar c={c} timer={fmt(timer)}/>

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 360px", gap: 14, padding: "12px 18px 18px" }}>
        {/* LEFT: Stage + participants + bottom info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
          <Stage answer={answer} setAnswer={setAnswer}/>
          <ControlBar mic={mic} setMic={setMic} cam={cam} setCam={setCam} hand={hand} setHand={setHand}/>
          <ParticipantStrip mic={mic} cam={cam}/>
          <InfoRow/>
        </div>

        {/* RIGHT: Chat / Questions / Polls / AI Tutor */}
        <RightRail
          tab={topTab}
          setTab={setTopTab}
          showAITutorPanel={showAITutorPanel}
          setShowAITutorPanel={setShowAITutorPanel}
        />
      </div>

      {/* Bottom recording footer */}
      <RecordingFooter/>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,60%{opacity:1} 70%,100%{opacity:0.3} }
      `}</style>
    </div>
  );
}

/* ─────────── Top bar ─────────── */
function LiveTopBar({ c, timer }) {
  return (
    <div style={{
      background: "#0F1828", color: "#fff",
      padding: "10px 18px",
      display: "flex", alignItems: "center", gap: 18,
      borderBottom: "1px solid #1E293B",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, minWidth: 0 }}>
        <a href="#/classes" style={{ color: "#94A3B8", textDecoration: "none", fontSize: 12, marginRight: 4, display: "inline-flex", alignItems: "center", gap: 4 }}>
          <I.ChevronLeft size={14} color="#94A3B8"/> My Classes
        </a>
        <div style={{ width: 1, height: 18, background: "#334155" }}/>
        <h1 style={{ margin: 0, fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em" }}>{c.name}</h1>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 10.5, padding: "2px 8px", borderRadius: 4,
          background: "#10B981", color: "#fff", fontWeight: 700, letterSpacing: "0.04em",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "blink 1.4s ease-in-out infinite" }}/>
          LIVE
        </span>
        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 14, color: "#E2E8F0", fontWeight: 600, marginLeft: 6 }}>{timer}</span>
      </div>
      <div style={{ flex: 1, fontSize: 12, color: "#94A3B8" }}>Quadratic Functions — Vertex Form</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <TopAction icon="Info" label="Class Info"/>
        <TopAction icon="Folder" label="Materials"/>
        <TopAction icon="User" label="People (26)"/>
        <TopAction icon="Settings" label="Settings"/>
      </div>
    </div>
  );
}
function TopAction({ icon, label }) {
  const Icon = I[icon];
  return (
    <button style={{
      background: "transparent", border: "none", color: "#fff",
      display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 2,
      cursor: "pointer", padding: "2px 4px",
    }}>
      <Icon size={14} color="#fff"/>
      <span style={{ fontSize: 10.5, color: "#CBD5E1", fontWeight: 500 }}>{label}</span>
    </button>
  );
}

/* ─────────── Stage ─────────── */
function Stage({ answer, setAnswer }) {
  return (
    <div style={{
      position: "relative",
      borderRadius: 14, overflow: "hidden",
      background: "#0F172A",
      boxShadow: "0 4px 16px rgba(15,23,42,0.18)",
      aspectRatio: "16 / 9",
      minHeight: 360,
    }}>
      {/* Composite: teacher portrait LEFT + whiteboard RIGHT */}
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "0.85fr 1.15fr" }}>
        {/* Teacher half */}
        <div style={{
          position: "relative",
          background: "linear-gradient(160deg, #FCE7C9 0%, #C9B5D6 60%, #8B7AB8 100%)",
          overflow: "hidden",
        }}>
          {/* room hint */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
            <rect x="0" y="0" width="100" height="55" fill="#E8D5BE"/>
            <rect x="0" y="55" width="100" height="45" fill="#A88B6E"/>
            <rect x="6" y="14" width="22" height="14" fill="#5C8D6E" rx="1"/>
            <rect x="70" y="10" width="20" height="22" fill="#7AA2C9" opacity="0.7"/>
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <StockPortrait name="Ms Carter" hue={20} size={420}/>
          </div>
          {/* Teacher chip */}
          <div style={{
            position: "absolute", top: 12, left: 14,
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(255,255,255,0.92)", borderRadius: 999,
            padding: "4px 10px 4px 4px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}>
            <StockPortrait name="Ms Carter" hue={20} size={26} ring="#fff"/>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Ms. Carter</span>
            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 5px", background: "#8B5CF6", color: "#fff", borderRadius: 3, letterSpacing: "0.04em" }}>TEACHER</span>
            <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#10B981", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <I.Mic size={9} color="#fff"/>
            </span>
          </div>
        </div>

        {/* Whiteboard half */}
        <div style={{
          position: "relative",
          background: "linear-gradient(180deg, #FFFEF8 0%, #F5F0E0 100%)",
          padding: "28px 36px",
          fontFamily: "Georgia, serif",
          color: "var(--ink)",
        }}>
          <div style={{
            fontSize: 28, fontWeight: 700, color: "#0F172A",
            borderBottom: "2px solid #0F172A", display: "inline-block",
            paddingBottom: 4, marginBottom: 18,
          }}>Vertex Form</div>
          <div style={{ fontSize: 30, fontWeight: 600, marginBottom: 18, color: "#0F172A" }}>
            y = a<span style={{ color: "#8B5CF6" }}>(x − h)</span><sup style={{ fontSize: 18 }}>2</sup> + <span style={{ color: "#0EA5E9" }}>k</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "14px 26px", alignItems: "center", marginTop: 8 }}>
            {/* Mini parabola sketch */}
            <svg viewBox="0 0 160 120" width="170" height="125">
              <line x1="80" y1="6" x2="80" y2="114" stroke="#0F172A" strokeWidth="1.2"/>
              <line x1="6" y1="80" x2="154" y2="80" stroke="#0F172A" strokeWidth="1.2"/>
              <text x="84" y="14" fontSize="10" fill="#0F172A">y</text>
              <text x="148" y="92" fontSize="10" fill="#0F172A">x</text>
              <path d="M 25 25 Q 80 130 135 25" stroke="#8B5CF6" strokeWidth="2.2" fill="none"/>
              <circle cx="80" cy="80" r="3" fill="#8B5CF6"/>
              <text x="86" y="96" fontSize="10" fill="#8B5CF6" fontStyle="italic">(h, k)</text>
            </svg>
            <div style={{ fontSize: 14, lineHeight: 1.7 }}>
              <div><span style={{ color: "#8B5CF6", fontStyle: "italic", fontWeight: 600 }}>(h, k)</span> is the vertex</div>
              <div style={{ marginTop: 6 }}><span style={{ fontStyle: "italic", color: "#0F172A" }}>a</span> determines the opening</div>
              <div style={{ marginLeft: 16, marginTop: 2 }}><span style={{ color: "#0EA5E9", fontStyle: "italic" }}>a {">"} 0</span>  opens up</div>
              <div style={{ marginLeft: 16 }}><span style={{ color: "#EF4444", fontStyle: "italic" }}>a {"<"} 0</span>  opens down</div>
            </div>
          </div>
        </div>
      </div>

      {/* "You're connected" pill (top-right of stage) */}
      <div style={{
        position: "absolute", top: 14, right: 16,
        display: "inline-flex", alignItems: "center", gap: 6,
        background: "rgba(255,255,255,0.95)", borderRadius: 999,
        padding: "5px 11px",
        fontSize: 11.5, color: "#10B981", fontWeight: 600,
        boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
      }}>
        <I.Wifi size={12} color="#10B981"/> You're connected
      </div>

      {/* Live Question overlay */}
      <LiveQuestionOverlay answer={answer} setAnswer={setAnswer}/>
    </div>
  );
}

function LiveQuestionOverlay({ answer, setAnswer }) {
  const opts = [
    { id: "A", text: "y = (x − 2)² − 3" },
    { id: "B", text: "y = (x + 2)² + 3" },
    { id: "C", text: "y = (x − 2)² + 3" },
    { id: "D", text: "y = −(x − 2)² − 3" },
  ];
  return (
    <div style={{
      position: "absolute", left: 16, right: 16, bottom: 16,
      background: "rgba(255,255,255,0.97)", borderRadius: 12,
      boxShadow: "0 6px 20px rgba(15,23,42,0.18)",
      padding: "12px 14px",
      backdropFilter: "blur(8px)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ width: 22, height: 22, borderRadius: 5, background: "#8B5CF6", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
          <I.BarChart size={12} color="#fff"/>
        </span>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#8B5CF6", letterSpacing: "0.06em" }}>LIVE QUESTION</span>
        <span style={{ flex: 1 }}/>
        <span style={{ fontSize: 11, padding: "3px 8px", background: "#EEF2FF", color: "#6366F1", borderRadius: 4, fontWeight: 600 }}>Multiple Choice</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>
          <I.Clock size={11} color="var(--stone)"/> 10 pts
        </span>
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)", marginBottom: 9 }}>
        If the vertex of a parabola is (2, −3) and it opens upward, which of the following could be the equation?
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 9 }}>
        {opts.map((o) => {
          const sel = answer === o.id;
          return (
            <button key={o.id} onClick={() => setAnswer(o.id)} style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "9px 10px",
              background: sel ? "#8B5CF6" : "var(--paper)",
              border: sel ? "1.5px solid #8B5CF6" : "1.5px solid var(--mist)",
              borderRadius: 9,
              cursor: "pointer",
              transition: "all 120ms",
              textAlign: "left",
            }}>
              <span style={{
                width: 22, height: 22, borderRadius: 5,
                background: sel ? "rgba(255,255,255,0.2)" : "var(--bone)",
                color: sel ? "#fff" : "var(--ink)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700,
                flexShrink: 0,
              }}>{o.id}</span>
              <span style={{ fontSize: 12.5, color: sel ? "#fff" : "var(--ink)", fontWeight: 500, fontFamily: "Georgia, serif" }}>{o.text}</span>
              {sel && <I.Check size={13} color="#fff"/>}
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {answer ? (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "#10B981", fontWeight: 600 }}>
            <I.Check size={12} color="#10B981"/> You answered {answer}
          </span>
        ) : (
          <span style={{ fontSize: 11.5, color: "var(--stone)" }}>Select an answer</span>
        )}
        <div style={{ flex: 1, height: 6, background: "var(--mist)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: "88%", height: "100%", background: "#8B5CF6", borderRadius: 3 }}/>
        </div>
        <span style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>23 of 26 responded</span>
        <span style={{ fontSize: 11, color: "#8B5CF6", fontWeight: 700 }}>83% chose C</span>
        <I.BarChart size={13} color="var(--stone)"/>
      </div>
    </div>
  );
}

/* ─────────── Control bar ─────────── */
function ControlBar({ mic, setMic, cam, setCam, hand, setHand }) {
  return (
    <div style={{
      background: "#0F1828",
      borderRadius: 12,
      padding: "10px 16px",
      display: "flex", alignItems: "center", gap: 6,
    }}>
      <Ctrl active={mic} onClick={() => setMic(!mic)} icon={mic ? "Mic" : "MicOff"} label={mic ? "Mute" : "Unmute"}/>
      <Ctrl active={cam} onClick={() => setCam(!cam)} icon={cam ? "Camera" : "CameraOff"} label={cam ? "Stop Video" : "Start Video"}/>
      <Ctrl active={hand} onClick={() => setHand(!hand)} icon="Hand" label="Raise Hand" colorActive="#F59E0B"/>
      <Ctrl active={false} icon="Smile" label="React"/>
      <Ctrl active={true} icon="Screen" label="Share Screen" colorActive="#10B981"/>
      <Ctrl active={false} icon="MoreH" label="More"/>
      <div style={{ flex: 1 }}/>
      <button style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "9px 18px",
        background: "#EF4444", color: "#fff",
        border: "none", borderRadius: 8,
        fontSize: 12.5, fontWeight: 700, cursor: "pointer",
      }}><I.PhoneOff size={14} color="#fff"/> Leave</button>
    </div>
  );
}
function Ctrl({ active, onClick, icon, label, colorActive = "#fff" }) {
  const Icon = I[icon];
  const isStrong = label === "Share Screen" && active;
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 3,
      padding: "6px 14px",
      background: isStrong ? "#10B981" : "transparent",
      border: "none", borderRadius: 8, cursor: "pointer",
    }}>
      <Icon size={17} color={isStrong ? "#fff" : (active ? colorActive : "#fff")}/>
      <span style={{ fontSize: 10.5, color: isStrong ? "#fff" : "#CBD5E1", fontWeight: 600 }}>{label}</span>
    </button>
  );
}

/* ─────────── Participant strip ─────────── */
function ParticipantStrip({ mic, cam }) {
  const tiles = [
    { name: "You", hue: 260, mic: mic, cam: cam, you: true, stars: 2 },
    { name: "Jordan M.", hue: 30, mic: true, cam: true, stars: 1 },
    { name: "Taylor S.", hue: 320, mic: true, cam: true },
    { name: "Riley K.", hue: 200, mic: true, cam: true },
    { name: "Aiden R.", hue: 100, mic: false, cam: true, hand: true },
    { name: "Sofia L.", hue: 0, mic: true, cam: true },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
      {tiles.map((t, i) => <PTile key={i} {...t}/>)}
      <div style={{
        aspectRatio: "16/11",
        borderRadius: 8,
        background: "linear-gradient(160deg, #DDD6FE, #C4B5FD)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        border: "1px solid #C4B5FD",
      }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#5B21B6" }}>+20</span>
        <span style={{ fontSize: 11, color: "#5B21B6", fontWeight: 600 }}>More</span>
      </div>
    </div>
  );
}
function PTile({ name, hue, mic, cam, hand, you, stars }) {
  return (
    <div style={{
      position: "relative", aspectRatio: "16/11",
      borderRadius: 8, overflow: "hidden",
      background: cam ? `linear-gradient(160deg, hsl(${hue},70%,75%), hsl(${hue},55%,45%))` : "#1E293B",
      border: hand ? "2px solid #F59E0B" : "1px solid var(--mist)",
    }}>
      {cam ? (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
          <StockPortrait name={name} hue={hue} size={150}/>
        </div>
      ) : (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: `hsl(${hue},45%,55%)`, color: "#fff", fontWeight: 700, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {name.split(" ").map((s) => s[0]).join("").slice(0, 2)}
          </div>
        </div>
      )}
      {/* stars top-left */}
      {stars > 0 && (
        <div style={{ position: "absolute", top: 4, left: 4, display: "flex", gap: 1 }}>
          {[...Array(stars)].map((_, i) => <span key={i} style={{ fontSize: 11, filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))" }}>⭐</span>)}
        </div>
      )}
      {hand && <div style={{ position: "absolute", top: 4, right: 4, fontSize: 14 }}>✋</div>}
      <div style={{
        position: "absolute", bottom: 4, left: 5,
        fontSize: 10.5, color: "#fff", fontWeight: 700,
        background: "rgba(15,23,42,0.65)", padding: "1px 6px", borderRadius: 3,
      }}>
        {you ? "You" : name}
      </div>
      <div style={{
        position: "absolute", bottom: 4, right: 4,
        width: 16, height: 16, borderRadius: "50%",
        background: mic ? "#10B981" : "#EF4444",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        border: "1.5px solid #fff",
      }}>
        {mic ? <I.Mic size={8} color="#fff"/> : <I.MicOff size={8} color="#fff"/>}
      </div>
    </div>
  );
}

/* ─────────── Bottom info row ─────────── */
function InfoRow() {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr 1.1fr",
      gap: 12,
      background: "var(--paper)", borderRadius: 12,
      padding: "14px 16px",
      boxShadow: "var(--shadow-card)",
    }}>
      <InfoBlock icon="Target" iconColor="#EC4899" title="Class Goals" linkLabel="View goals"
        body={<div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.45 }}>Understand vertex form and graph quadratic functions.</div>}
      />
      <InfoBlock icon="Calendar" iconColor="#0EA5E9" title="Today's Agenda" linkLabel="View full agenda"
        body={
          <ol style={{ margin: 0, padding: "0 0 0 18px", fontSize: 11.5, color: "var(--slate)", lineHeight: 1.55 }}>
            <li>Warm Up</li>
            <li style={{ color: "#8B5CF6", fontWeight: 700 }}>Vertex Form</li>
            <li>Practice</li>
            <li>Wrap Up</li>
          </ol>
        }
      />
      <InfoBlock icon="TrendUp" iconColor="#10B981" title="Class Progress" linkLabel="View details"
        body={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Donut size={56} stroke={6} progress={72} color="#8B5CF6"/>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>On track</div>
              <div style={{ fontSize: 11, color: "var(--stone)" }}>Keep it up!</div>
            </div>
          </div>
        }
      />
      <InfoBlock icon="Document" iconColor="#F59E0B" title="Next Up" linkLabel="Open in To Do"
        body={
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Practice Problems</div>
            <div style={{ fontSize: 11, color: "var(--stone)" }}>Due tomorrow</div>
          </div>
        }
      />
    </div>
  );
}
function InfoBlock({ icon, iconColor, title, body, linkLabel }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Icon size={13} color={iconColor}/>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{title}</span>
      </div>
      <div>{body}</div>
      <a href="#" style={{ fontSize: 11, color: "var(--student)", textDecoration: "none", fontWeight: 600 }}>{linkLabel} →</a>
    </div>
  );
}

/* ─────────── Right rail (tabs + content) ─────────── */
function RightRail({ tab, setTab, showAITutorPanel, setShowAITutorPanel }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      background: "var(--paper)", borderRadius: 12,
      boxShadow: "var(--shadow-card)",
      overflow: "hidden",
      height: "calc(100vh - 56px - 24px - 56px)", // page minus topbar minus padding minus footer
      minHeight: 600,
    }}>
      <RailTabs tab={tab} setTab={setTab}/>
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
        {tab === "chat" && <ChatTab showAITutorPanel={showAITutorPanel} setShowAITutorPanel={setShowAITutorPanel}/>}
        {tab === "questions" && <QuestionsTab/>}
        {tab === "polls" && <PollsTab/>}
        {tab === "ai" && <AITutorTab/>}
      </div>
    </div>
  );
}
function RailTabs({ tab, setTab }) {
  const tabs = [
    { id: "chat", label: "Class Chat" },
    { id: "questions", label: "Questions" },
    { id: "polls", label: "Polls (1)" },
    { id: "ai", label: <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>AI Tutor <span style={{ fontSize: 8, padding: "1px 4px", background: "linear-gradient(90deg, #8B5CF6, #EC4899)", color: "#fff", borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em" }}>BETA</span></span> },
  ];
  return (
    <div style={{ display: "flex", borderBottom: "1px solid var(--mist)", paddingTop: 4 }}>
      {tabs.map((t) => {
        const active = tab === t.id;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1, padding: "10px 4px",
            background: "transparent", border: "none",
            borderBottom: active ? "2px solid #8B5CF6" : "2px solid transparent",
            fontSize: 12, fontWeight: active ? 700 : 500,
            color: active ? "#8B5CF6" : "var(--stone)",
            cursor: "pointer",
          }}>{t.label}</button>
        );
      })}
    </div>
  );
}

/* ─── Class Chat tab ─── */
function ChatTab({ showAITutorPanel, setShowAITutorPanel }) {
  const msgs = [
    { who: "Ms. Carter", role: "teacher", time: "10:32 AM", msg: "Great job so far! Let's try a question together.", reactions: [{ e: "🔥", n: 12 }], hue: 20 },
    { who: "Jordan M.", time: "10:33 AM", msg: "Can you explain why the vertex is (h, k) again?", hue: 30 },
    { who: "Alex (You)", time: "10:33 AM", msg: "I was confused about that part too.", reactions: [{ e: "💜", n: 2 }], hue: 260, you: true },
    { who: "Riley K.", time: "10:34 AM", msg: "This is making more sense now!", hue: 200 },
    { who: "Ms. Carter", role: "teacher", time: "10:34 AM", msg: "Awesome! Let's keep going.", hue: 20 },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      {/* Top scrollable chat */}
      <div style={{ flex: showAITutorPanel ? "1 1 50%" : "1 1 100%", overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
        {msgs.map((m, i) => <ChatMsg key={i} {...m}/>)}
      </div>
      <div style={{ padding: "8px 12px", borderTop: "1px solid var(--mist)" }}>
        <div style={{ padding: "7px 10px", background: "var(--bone)", borderRadius: 8, display: "flex", gap: 6, alignItems: "center" }}>
          <input placeholder="Type a message…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "var(--ink)" }}/>
          <I.Smile size={13} color="var(--silver)"/>
          <button style={{ background: "#8B5CF6", border: "none", borderRadius: 6, padding: 5, cursor: "pointer", display: "flex" }}>
            <I.Send size={11} color="#fff"/>
          </button>
        </div>
      </div>

      {/* Bottom AI Tutor preview card */}
      {showAITutorPanel && (
        <div style={{
          flex: "0 0 auto",
          borderTop: "1px solid var(--mist)",
          background: "linear-gradient(180deg, rgba(139,92,246,0.04), rgba(236,72,153,0.03))",
          padding: "12px 14px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <I.Sparkle size={13} color="#8B5CF6"/>
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>AI Tutor</span>
            <span style={{ fontSize: 8, padding: "1px 5px", background: "linear-gradient(90deg, #8B5CF6, #EC4899)", color: "#fff", borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em" }}>BETA</span>
            <span style={{ flex: 1 }}/>
            <button style={{ fontSize: 11, padding: "3px 9px", background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 6, color: "var(--slate)", cursor: "pointer", fontWeight: 600 }}>New chat</button>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Need help understanding vertex form?</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 2 }}>I can explain concepts, give examples, or help you practice.</div>
            </div>
            <Robot size={48}/>
          </div>
          <button style={{
            width: "100%", padding: "8px 12px",
            background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8,
            display: "flex", alignItems: "center", gap: 8,
            cursor: "pointer", textAlign: "left",
          }}>
            <I.Sparkle size={13} color="#8B5CF6"/>
            <span style={{ fontSize: 12, color: "var(--stone)", flex: 1 }}>Ask me anything…</span>
            <I.ChevronRight size={12} color="var(--silver)"/>
          </button>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {["Explain vertex form", "Show me an example", "Create a practice question"].map((s) => (
              <button key={s} style={{
                fontSize: 10.5, padding: "4px 9px",
                background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: 999, color: "#7C3AED", fontWeight: 600, cursor: "pointer",
              }}>+ {s}</button>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10.5, color: "var(--silver)", marginTop: 8 }}>
            <I.Lock size={10} color="var(--silver)"/> Private · Saved to your study space
          </div>
        </div>
      )}
    </div>
  );
}
function ChatMsg({ who, role, time, msg, reactions, hue, you }) {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <StockPortrait name={who} hue={hue} size={28}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: "var(--stone)", display: "flex", alignItems: "center", gap: 6 }}>
          <b style={{ color: role === "teacher" ? "#8B5CF6" : "var(--ink)" }}>{who}</b>
          <span style={{ color: "var(--silver)" }}>{time}</span>
          {role === "teacher" && <span style={{ fontSize: 8.5, padding: "1px 5px", background: "#8B5CF614", color: "#8B5CF6", borderRadius: 3, fontWeight: 700, letterSpacing: "0.04em" }}>TEACHER</span>}
        </div>
        <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.45, marginTop: 1 }}>{msg}</div>
        {reactions && (
          <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
            {reactions.map((r, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, padding: "2px 7px", background: "var(--bone)", border: "1px solid var(--mist)", borderRadius: 999, color: "var(--slate)" }}>
                {r.e} {r.n}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Questions tab ─── */
function QuestionsTab() {
  return (
    <div style={{ padding: 14, overflowY: "auto" }}>
      <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>Active</div>
      <QCard q="If the vertex of a parabola is (2, −3) and it opens upward, which of the following could be the equation?" status="answered" answer="C"/>
      <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 16, marginBottom: 8 }}>Earlier</div>
      <QCard q="What does h represent in vertex form y = a(x − h)² + k?" status="answered" answer="x-coordinate of vertex" correct/>
      <QCard q="Which sign of a opens the parabola downward?" status="answered" answer="a < 0" correct/>
    </div>
  );
}
function QCard({ q, status, answer, correct }) {
  return (
    <div style={{ padding: "10px 12px", border: "1px solid var(--mist)", borderRadius: 10, marginBottom: 8 }}>
      <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 600, marginBottom: 6 }}>{q}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 11, color: "var(--stone)" }}>You answered:</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: correct ? "#10B981" : "#8B5CF6" }}>{answer}</span>
        {correct && <I.Check size={11} color="#10B981"/>}
      </div>
    </div>
  );
}

/* ─── Polls tab ─── */
function PollsTab() {
  return (
    <div style={{ padding: 14, overflowY: "auto" }}>
      <div style={{ padding: 14, background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", borderRadius: 12, marginBottom: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#92400E", letterSpacing: "0.06em" }}>QUICK POLL</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", margin: "4px 0 10px" }}>How confident do you feel with vertex form?</div>
        {[
          { l: "Very confident", n: 8 },
          { l: "Pretty confident", n: 11 },
          { l: "Still working on it", n: 5 },
          { l: "Need more help", n: 2 },
        ].map((o, i) => {
          const pct = Math.round((o.n / 26) * 100);
          return (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "var(--ink)", marginBottom: 2 }}>
                <span>{o.l}</span>
                <span style={{ color: "var(--stone)" }}>{pct}%</span>
              </div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.6)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: "#F59E0B", borderRadius: 3 }}/>
              </div>
            </div>
          );
        })}
        <div style={{ fontSize: 11, color: "#92400E", marginTop: 8, fontWeight: 600 }}>26 of 26 voted</div>
      </div>
    </div>
  );
}

/* ─── AI Tutor tab — REAL Claude integration ─── */
function AITutorTab() {
  const [thread, setThread] = React.useState([
    { from: "user", text: "I don't get how the vertex form changes the graph. Can you explain?", time: "10:33 AM" },
    {
      from: "ai",
      time: "10:33 AM",
      text: "Absolutely! In vertex form y = a(x − h)² + k, (h, k) is the vertex. It tells us where the parabola \"turns.\"",
      followups: [
        "Think of it like this:",
        "• h moves the graph left or right",
        "• k moves the graph up or down",
        "• a changes the stretch and direction",
      ],
      example: true,
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [thread, loading]);

  const send = async (text) => {
    const message = text || input;
    if (!message.trim() || loading) return;
    setInput("");
    const now = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    setThread((t) => [...t, { from: "user", text: message, time: now }]);
    setLoading(true);
    try {
      const reply = await window.claude.complete({
        messages: [
          ...thread.map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text + (m.followups ? "\n" + m.followups.join("\n") : "") })),
          { role: "user", content: `Context: I'm a 10th grade student in Algebra II watching a live class on Vertex Form (y = a(x − h)² + k). Keep answers concise and student-friendly.\n\nQuestion: ${message}` },
        ],
      });
      setThread((t) => [...t, { from: "ai", text: reply, time: now }]);
    } catch (e) {
      setThread((t) => [...t, { from: "ai", text: "Sorry, I couldn't reach my brain just now. Try again in a moment.", time: now }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid var(--mist)" }}>
        <I.Sparkle size={14} color="#8B5CF6"/>
        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Tutor</span>
        <span style={{ flex: 1 }}/>
        <button style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer" }}><I.ChevronLeft size={13} color="var(--silver)"/></button>
        <button style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer" }}><I.X size={13} color="var(--silver)"/></button>
      </div>

      {/* Thread */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "12px 14px", display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
        {thread.map((m, i) => <AIMessage key={i} m={m} onChip={send}/>)}
        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Robot size={26}/>
            <div style={{ display: "flex", gap: 4 }}>
              <Dot delay={0}/><Dot delay={0.2}/><Dot delay={0.4}/>
            </div>
          </div>
        )}
      </div>

      {/* Save banner */}
      <div style={{
        margin: "0 14px 8px",
        padding: "7px 10px",
        background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.25)",
        borderRadius: 8,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <I.Check size={12} color="#10B981"/>
        <span style={{ fontSize: 11.5, color: "var(--ink)", fontWeight: 600, flex: 1 }}>Saved to My Study Space</span>
        <a href="#" style={{ fontSize: 11, color: "#10B981", textDecoration: "none", fontWeight: 700 }}>View →</a>
      </div>

      {/* Composer */}
      <div style={{ padding: "0 12px 8px" }}>
        <div style={{ padding: "8px 10px", background: "var(--bone)", borderRadius: 999, display: "flex", gap: 6, alignItems: "center" }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask me anything…"
            style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12.5, color: "var(--ink)" }}
          />
          <button onClick={() => send()} disabled={loading} style={{
            background: "#8B5CF6", border: "none", borderRadius: "50%", width: 28, height: 28, cursor: loading ? "wait" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: loading ? 0.5 : 1,
          }}>
            <I.Send size={12} color="#fff"/>
          </button>
        </div>
        <div style={{ fontSize: 10, color: "var(--silver)", textAlign: "center", marginTop: 5, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
          <I.Info size={9} color="var(--silver)"/> AI can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}

function AIMessage({ m, onChip }) {
  if (m.from === "user") {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: "82%" }}>
          <div style={{
            background: "#8B5CF6", color: "#fff",
            padding: "9px 12px", borderRadius: 14, borderTopRightRadius: 4,
            fontSize: 12.5, lineHeight: 1.45,
          }}>{m.text}</div>
          <div style={{ fontSize: 10, color: "var(--silver)", textAlign: "right", marginTop: 3 }}>{m.time}</div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Robot size={26}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          background: "var(--bone)", color: "var(--ink)",
          padding: "9px 12px", borderRadius: 14, borderTopLeftRadius: 4,
          fontSize: 12.5, lineHeight: 1.5,
        }}>
          <div>{m.text}</div>
          {m.followups && (
            <div style={{ marginTop: 6 }}>
              {m.followups.map((f, i) => <div key={i} style={{ fontSize: 12, color: "var(--slate)" }}>{f}</div>)}
            </div>
          )}
          {m.example && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11.5, color: "var(--slate)", marginBottom: 6 }}>Here's an example based on today's question:</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <MiniGraph eq="y = x²" vertex="(0, 0)" hShift={0} vShift={0} color="#8B5CF6"/>
                <MiniGraph eq="y = (x − 2)² − 3" vertex="(2, −3)" hShift={2} vShift={3} color="#0EA5E9"/>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 8, lineHeight: 1.45 }}>So (2, −3) means the graph moved 2 units right and 3 units down.</div>
            </div>
          )}
        </div>
        {/* Chips */}
        {m.example && (
          <div style={{ display: "flex", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
            <button onClick={() => onChip("Show me another example")} style={chipStyle}>+ Show another example</button>
            <button onClick={() => onChip("Create a practice question for me")} style={chipStyle}>+ Create a practice question</button>
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
          <span style={{ fontSize: 10, color: "var(--silver)" }}>{m.time}</span>
          <span style={{ flex: 1 }}/>
          <button style={iconBtn}><I.ThumbsUp size={11} color="var(--silver)"/></button>
          <button style={iconBtn}><I.ThumbsDown size={11} color="var(--silver)"/></button>
        </div>
      </div>
    </div>
  );
}

const chipStyle = {
  fontSize: 11, padding: "4px 9px",
  background: "var(--paper)", border: "1px solid rgba(139,92,246,0.3)",
  borderRadius: 999, color: "#7C3AED", fontWeight: 600, cursor: "pointer",
};
const iconBtn = {
  background: "transparent", border: "none", padding: 3, cursor: "pointer", borderRadius: 4,
};

function MiniGraph({ eq, vertex, hShift, vShift, color }) {
  // hShift right, vShift down
  const cx = 60 + hShift * 8;
  const cy = 50 + vShift * 8;
  const path = (() => {
    let d = "";
    for (let x = 0; x <= 120; x += 4) {
      const xv = (x - cx) / 8;
      const yv = xv * xv;
      const py = cy - yv * 8;
      d += (x === 0 ? "M" : "L") + x + "," + py + " ";
    }
    return d;
  })();
  return (
    <div style={{ background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 8, padding: 6 }}>
      <div style={{ fontSize: 10.5, fontFamily: "Georgia, serif", color: "var(--ink)", fontWeight: 600, marginBottom: 2 }}>{eq}</div>
      <svg viewBox="0 0 120 100" width="100%" height="80">
        <line x1="0" y1="50" x2="120" y2="50" stroke="#CBD5E1" strokeWidth="0.6"/>
        <line x1="60" y1="0" x2="60" y2="100" stroke="#CBD5E1" strokeWidth="0.6"/>
        <path d={path} stroke={color} strokeWidth="1.5" fill="none"/>
        <circle cx={cx} cy={cy} r="2.5" fill={color}/>
      </svg>
      <div style={{ fontSize: 9.5, color: "var(--stone)" }}>Vertex: {vertex}</div>
    </div>
  );
}

function Dot({ delay }) {
  return <span style={{
    width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6",
    animation: `pulse 1.2s ease-in-out infinite`, animationDelay: `${delay}s`,
  }}/>;
}

/* ─────────── Recording footer ─────────── */
function RecordingFooter() {
  return (
    <div style={{
      background: "#0F1828", color: "#94A3B8",
      padding: "10px 18px",
      display: "flex", alignItems: "center", gap: 14,
      fontSize: 11.5,
    }}>
      <span style={{
        display: "inline-flex", alignItems: "center", gap: 5,
        padding: "3px 8px", background: "#EF4444", color: "#fff",
        borderRadius: 4, fontSize: 10, fontWeight: 700, letterSpacing: "0.04em",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", animation: "blink 1.4s infinite" }}/>
        REC
      </span>
      <span style={{ fontSize: 11, color: "#94A3B8" }}>Class is being recorded</span>
      <span style={{ fontSize: 11, color: "#64748B" }}>·</span>
      <span style={{ fontSize: 11, color: "#94A3B8" }}>By joining, you agree to our <a href="#" style={{ color: "#A78BFA", textDecoration: "none" }}>Community Guidelines</a></span>
      <span style={{ flex: 1 }}/>
      <a href="#" style={{ color: "#94A3B8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11 }}><I.Help size={11} color="#94A3B8"/> Help</a>
      <a href="#" style={{ color: "#94A3B8", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11 }}><I.Flag size={11} color="#94A3B8"/> Report an issue</a>
    </div>
  );
}

window.LiveClassPage = LiveClassPage;

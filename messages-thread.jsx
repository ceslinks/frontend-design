// LINKS — Messages: thread center pane

const ConvAv = window.MessagesAv;
const ConvPortrait = window.MessagesPortrait;
const ConvGroupTile = window.MessagesGroupTile;
const ConvData = window.MessagesData;

/* ─────────── Bubble (chat message) ─────────── */

function Bubble({ from, text, time, mine, reactions, attachment, role, badges }) {
  const align = mine ? "flex-end" : "flex-start";
  const bubbleBg = mine ? "var(--student-soft)" : "var(--bone)";
  const bubbleColor = mine ? "var(--student-ink)" : "var(--ink)";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align, gap: 4, marginBottom: 14 }}>
      {!mine && from && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: 44 }}>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{from}</span>
          {role && (
            <span style={{
              fontSize: 9.5, padding: "1px 6px",
              background: "var(--student-soft)", color: "var(--student-deep)",
              borderRadius: 4, fontWeight: 600,
            }}>{role}</span>
          )}
          <span style={{ fontSize: 11, color: "var(--silver)" }}>{time}</span>
        </div>
      )}
      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", maxWidth: "78%" }}>
        {!mine && from && (
          <ConvPortrait name={from} hue={hueOf(from)} size={32}/>
        )}
        <div style={{
          background: bubbleBg,
          color: bubbleColor,
          padding: "10px 14px",
          borderRadius: 14,
          borderBottomLeftRadius: !mine ? 4 : 14,
          borderBottomRightRadius: mine ? 4 : 14,
          fontSize: 13.5, lineHeight: 1.55,
          boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
        }}>
          {text}
          {attachment && (
            <div style={{
              marginTop: 8, padding: 10,
              background: mine ? "rgba(255,255,255,0.7)" : "var(--paper)",
              borderRadius: 10,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <I.Document size={20} color="var(--student)"/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{attachment.name}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{attachment.subtitle}</div>
              </div>
              <button className="btn btn-sm" style={{ height: 24, fontSize: 11 }}>Open</button>
            </div>
          )}
        </div>
      </div>
      {mine && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginRight: 4 }}>
          <span style={{ fontSize: 11, color: "var(--silver)" }}>{time}</span>
          <I.Check size={11} color="#22C55E"/>
        </div>
      )}
      {reactions && reactions.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginLeft: mine ? 0 : 44, marginTop: 2 }}>
          {reactions.map((r, i) => (
            <span key={i} style={{
              fontSize: 11, padding: "2px 8px",
              background: "var(--paper)",
              border: "1px solid var(--mist)",
              borderRadius: 999,
              display: "inline-flex", alignItems: "center", gap: 3,
            }}>
              <span>{r.emoji}</span>
              <span style={{ color: "var(--stone)", fontWeight: 600 }}>{r.count}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function hueOf(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

/* ─────────── Composer ─────────── */

function Composer({ placeholder = "Type a message…", showAIBar, aiSuggestions, onAIDismiss, withTabs, hasGuidelineDraft }) {
  return (
    <div style={{ borderTop: "1px solid var(--mist)", padding: "12px 18px 14px" }}>
      {/* Input */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 14px",
        background: "var(--bone)",
        borderRadius: 22,
        marginBottom: showAIBar || withTabs ? 10 : 0,
      }}>
        <input
          placeholder={placeholder}
          style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13.5, color: "var(--ink)" }}
        />
        <button style={iconBtn}><I.Send size={15} color="var(--student)"/></button>
      </div>
      {/* Toolbar */}
      <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "0 6px", flexWrap: "wrap" }}>
        <ToolbarBtn icon="Plus"/>
        <ToolbarBtn icon="Edit" label="Format"/>
        <ToolbarBtn icon="Smile" label="Emoji"/>
        <ToolbarBtn icon="Paperclip" label="Attach"/>
        <ToolbarBtn icon="Image" label="Image"/>
        <ToolbarBtn icon="Mic" label="Voice"/>
        <div style={{ flex: 1 }}/>
        {withTabs && <ToolbarBtn icon="Sparkle" label="AI Assist" highlight/>}
        <button style={{
          height: 32, padding: "0 14px",
          background: "var(--student)", color: "#fff",
          border: "none", borderRadius: 999,
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <I.Send size={13} color="#fff"/> Send
        </button>
      </div>
      {/* AI suggestion bar */}
      {showAIBar && (
        <div style={{
          marginTop: 12,
          background: "linear-gradient(90deg, rgba(139,92,246,0.06), rgba(59,130,246,0.06))",
          borderRadius: 12,
          padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 10,
          border: "1px dashed rgba(139,92,246,0.30)",
        }}>
          <I.Sparkle size={14} color="var(--student)"/>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--student-deep)" }}>AI Assistant</span>
          <div style={{ display: "flex", gap: 6, flex: 1, flexWrap: "wrap" }}>
            {aiSuggestions.map((s, i) => (
              <button key={i} style={{
                padding: "5px 10px",
                background: "var(--paper)",
                border: "1px solid var(--mist)",
                borderRadius: 999,
                fontSize: 11.5, color: "var(--ink)",
                cursor: "pointer",
              }}>{s}</button>
            ))}
          </div>
          <button onClick={onAIDismiss} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 4 }}>
            <I.X size={12} color="var(--silver)"/>
          </button>
        </div>
      )}
    </div>
  );
}

const iconBtn = {
  width: 30, height: 30, borderRadius: 8,
  background: "transparent", border: "none", cursor: "pointer",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
};

function ToolbarBtn({ icon, label, highlight }) {
  const Icon = I[icon];
  return (
    <button title={label} style={{
      ...iconBtn,
      width: label ? "auto" : 30,
      padding: label ? "0 10px" : 0,
      gap: 5,
      color: highlight ? "var(--student)" : "var(--stone)",
      fontSize: 11.5, fontWeight: 500,
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
    >
      <Icon size={14} color={highlight ? "var(--student)" : "var(--stone)"}/>
      {label && <span>{label}</span>}
    </button>
  );
}

/* ─────────── Day separator ─────────── */
function DaySep({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0 14px" }}>
      <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
      <span style={{ fontSize: 11, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--mist)" }}/>
    </div>
  );
}

/* ─────────── DM Thread (Carter / Jordan / etc.) ─────────── */

function DMThread({ id, onContextOpen }) {
  const conv = ConvData[id];
  const isJordan = id === "jordan";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
      {/* Header */}
      <ThreadHeader
        leading={<button style={iconBtn}><I.ChevronLeft size={16} color="var(--stone)"/></button>}
        avatar={<ConvPortrait name={conv.who} hue={conv.portrait.hue} size={40} dot={conv.presence === "online" ? "online" : null}/>}
        title={conv.who}
        subtitle={<span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: conv.presence === "online" ? "#22C55E" : "#94A3B8" }}/>
          {conv.presence === "online" ? "Online" : conv.role}
        </span>}
        chips={isJordan ? [
          { label: "English 10 — Period 2", color: "#8B5CF6", icon: "Book" },
          { label: "Biology 101", color: "#10B981", icon: "Atom" },
          { label: "+ Add Context", ghost: true },
        ] : null}
        actions={<>
          <button style={iconBtn}><I.Video size={16} color="var(--stone)"/></button>
          <button style={iconBtn}><I.Phone size={16} color="var(--stone)"/></button>
          <button style={iconBtn} onClick={onContextOpen}><I.Info size={16} color="var(--stone)"/></button>
        </>}
      />

      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 22px 6px" }}>
        <DaySep label="Today"/>
        {isJordan ? (
          <>
            <Bubble from="Jordan Lee" time="9:08 AM" text="Hey Alex! Did you finish the Argument Essay yet?"/>
            <Bubble from="Jordan Lee" time="9:08 AM" text="" attachment={{ name: "Argument Essay", subtitle: "English 10 — Period 2" }}/>
            <Bubble mine time="9:10 AM" text="Almost! I'm working on the counterargument section. What sources are you using?"/>
            <Bubble from="Jordan Lee" time="9:11 AM" text="I found this article that's perfect for it. Want me to share?" attachment={{ name: "Social Media Regulation: What Schools Need to Know", subtitle: "EdTechReview · edtechreview.com" }}/>
            <Bubble mine time="9:12 AM" text="Yes please! That would be awesome 🙏"/>
            <Bubble from="Jordan Lee" time="9:13 AM" text="Also, do you want to jump on a quick study session at 7?" reactions={[{ emoji: "👍", count: 1 }, { emoji: "🤔", count: 1 }, { emoji: "🌙", count: 0 }]}/>
            {/* Quick reactions row */}
            <div style={{ display: "flex", gap: 6, marginLeft: 44, marginTop: -10, marginBottom: 14 }}>
              <QuickReply label="Sure!" tint="#10B981"/>
              <QuickReply label="Maybe"/>
              <QuickReply label="Not tonight"/>
            </div>
          </>
        ) : (
          <>
            <Bubble from="Ms. Carter" time="9:15 AM" text="Good morning, Alex! 👋 Just a reminder that our argument essay is due this Friday, March 2nd by 11:59 PM. Let me know if you have any questions!"/>
            <Bubble mine time="9:18 AM" text="Good morning, Ms. Carter! Thanks for the reminder. I have a quick question about the sources we need to include."/>
            <Bubble from="Ms. Carter" time="9:20 AM" text="Of course! You need at least 3 credible sources. One from a scholarly article, one from a trusted news source, and one from our class materials."/>
            <Bubble mine time="9:21 AM" text="Got it! Thanks so much. I'll get started on it today."/>
            <Bubble from="Ms. Carter" time="9:22 AM" text="Sounds good! You're going to do great. Let me know if you need anything. 😊" reactions={[{ emoji: "❤️", count: 1 }]}/>
          </>
        )}
      </div>

      {/* Composer */}
      <Composer
        placeholder={`Message ${conv.who}…`}
        showAIBar={isJordan}
        aiSuggestions={["Summarize this chat", "What's due this week?", "Suggest a reply", "Help me study this topic"]}
      />
    </div>
  );
}

function QuickReply({ label, tint }) {
  return (
    <button style={{
      padding: "5px 12px",
      background: tint ? `${tint}1A` : "var(--bone)",
      color: tint || "var(--slate)",
      border: tint ? `1px solid ${tint}40` : "1px solid var(--mist)",
      borderRadius: 999,
      fontSize: 12, fontWeight: 500,
      cursor: "pointer",
    }}>{label}</button>
  );
}

/* ─────────── Class Channel Thread ─────────── */

function ClassChannelThread({ id }) {
  const conv = ConvData[id];
  const tabs = ["Messages", "Files", "Class Info", "Assignments", "People", "Settings"];
  const [tab, setTab] = React.useState("Messages");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
      <ThreadHeader
        leading={<button style={iconBtn}><I.ChevronLeft size={16} color="var(--stone)"/></button>}
        avatar={<ConvGroupTile icon={I[conv.icon]} color={conv.color} size={40}/>}
        title={<span>{conv.who} <I.Star size={14} color="var(--silver)" style={{ verticalAlign: "middle", marginLeft: 4 }}/></span>}
        subtitle={`${conv.role}`}
        actions={<>
          <button style={iconBtn}><I.Video size={16} color="var(--stone)"/></button>
          <button style={iconBtn}><I.Phone size={16} color="var(--stone)"/></button>
          <button style={iconBtn}><I.Team size={16} color="var(--stone)"/></button>
          <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--stone)", marginRight: 6 }}>24</span>
          <button style={iconBtn}><I.Info size={16} color="var(--stone)"/></button>
        </>}
        tabs={tabs}
        activeTab={tab}
        onTab={setTab}
      />
      {/* Announcement banner */}
      <div style={{
        margin: "12px 22px 0",
        padding: "10px 14px",
        background: "linear-gradient(90deg, #FEF3C7, #FDE68A)",
        border: "1px solid #FDE68A",
        borderRadius: 10,
        display: "flex", alignItems: "flex-start", gap: 10,
      }}>
        <div style={{ width: 26, height: 26, borderRadius: 6, background: "#F59E0B", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Bell size={13} color="#fff"/>
        </div>
        <div style={{ flex: 1, fontSize: 12.5, color: "#78350F" }}>
          <div style={{ fontWeight: 600, marginBottom: 1 }}>Announcement</div>
          Next week we'll begin our persuasive writing unit. Be sure to review the resources in the Files tab!
          <div style={{ fontSize: 10.5, color: "#A16207", marginTop: 2 }}>Posted by Ms. Carter · Feb 25</div>
        </div>
        <button style={iconBtn}><I.X size={12} color="#A16207"/></button>
      </div>
      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 22px 6px" }}>
        <DaySep label="Today"/>
        <Bubble from="Ms. Carter" role="Teacher" time="9:02 AM" text="Good morning, class! 👋 Reminder that your Argument Essay is due this Friday, March 2nd by 11:59 PM. Please make sure you've submitted a draft for feedback by Wednesday." reactions={[{ emoji: "👍", count: 6 }, { emoji: "❤️", count: 4 }, { emoji: "😊", count: 0 }]}/>
        <Bubble from="Jordan Lee" time="9:08 AM" text="Do we need to include a counterargument in the essay?" reactions={[{ emoji: "👍", count: 1 }, { emoji: "😊", count: 0 }]}/>
        <Bubble from="Ms. Carter" role="Teacher" time="9:09 AM" text="Yes! A strong essay includes a counterargument. Check the rubric in the Assignments tab for full details."/>
        <Bubble mine time="9:12 AM" text="Thanks! Will do. Also, will the sources need to be from scholarly articles only?"/>
        <Bubble from="Ms. Carter" role="Teacher" time="9:13 AM" text="At least 3 scholarly sources. You can include one reputable news source as well." reactions={[{ emoji: "👍", count: 2 }]}/>
      </div>
      {/* Composer */}
      <Composer placeholder={`Message ${conv.who}…`} withTabs/>
    </div>
  );
}

/* ─────────── Assignment Thread ─────────── */

function AssignmentThread({ id }) {
  const conv = ConvData[id];
  const tabs = ["Thread", "Details", "My Work", "Rubric", "Grades", "People (24)"];
  const [tab, setTab] = React.useState("Thread");
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", overflow: "hidden" }}>
      <ThreadHeader
        leading={<button style={iconBtn}><I.ChevronLeft size={16} color="var(--stone)"/></button>}
        avatar={<div style={{ width: 40, height: 40, borderRadius: 10, background: `${conv.color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <I.Document size={20} color={conv.color}/>
        </div>}
        title={<span>{conv.who} <span className="pill pill-error" style={{ fontSize: 10.5, marginLeft: 8 }}>High Priority</span></span>}
        subtitle={<span><span style={{ width: 6, height: 6, display: "inline-block", borderRadius: "50%", background: "#22C55E", marginRight: 5, verticalAlign: "middle" }}/>{conv.role} · Ms. Carter</span>}
        actions={<>
          <button style={iconBtn}><I.Calendar size={16} color="var(--stone)"/></button>
          <button style={iconBtn}><I.Info size={16} color="var(--stone)"/></button>
          <button style={iconBtn}><I.MoreH size={16} color="var(--stone)"/></button>
        </>}
        tabs={tabs}
        activeTab={tab}
        onTab={setTab}
      />
      {/* Status strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, padding: "14px 22px", borderBottom: "1px solid var(--mist)" }}>
        <StatusCell icon="Calendar" label="Due Date" value="Fri, Mar 2, 2026" subtitle="11:59 PM"/>
        <StatusCell icon="CircleCheck" label="Submission Status" value={<span style={{ color: "#22C55E" }}>● Submitted</span>} subtitle="Feb 28, 8:42 PM" cta="View Submission" ctaTint/>
        <StatusCell icon="Trophy" label="Your Grade" value={<><span style={{ color: "var(--ink)", fontWeight: 700, fontSize: 20 }}>92</span> <span style={{ color: "#22C55E", fontWeight: 700, fontSize: 14 }}>A-</span></>} subtitle="Feedback available" cta="View Feedback" ctaTint/>
      </div>
      {/* Body */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 22px 6px" }}>
        <DaySep label="Today"/>
        <Bubble from="Ms. Carter" role="Teacher" time="9:02 AM" text="Good morning! Just a reminder that your Argument Essay is due this Friday, March 2nd by 11:59 PM. Make sure to address counterarguments and support your position with at least 3 credible sources. Let me know if you have any questions! 👍" reactions={[{ emoji: "👍", count: 12 }, { emoji: "❤️", count: 4 }, { emoji: "😊", count: 0 }]}/>
        <Bubble from="Jordan Lee" time="9:08 AM" text="Do the sources have to be scholarly articles or can we use reputable news sites too?"/>
        <Bubble from="Ms. Carter" role="Teacher" time="9:10 AM" text="You need at least 2 scholarly sources. You can use one reputable news source as your third." reactions={[{ emoji: "👍", count: 3 }]}/>
        <Bubble mine time="9:21 AM" text="Thanks! I've included 2 scholarly articles and a New York Times opinion piece. Let me know if that works."/>
      </div>
      {/* Composer */}
      <Composer placeholder="Type a message…" withTabs/>
    </div>
  );
}

function StatusCell({ icon, label, value, subtitle, cta, ctaTint }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingRight: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <Icon size={12} color="var(--silver)"/>
        <span style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
      </div>
      <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>{value}</div>
      <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{subtitle}</div>
      {cta && (
        <button style={{
          alignSelf: "flex-start",
          marginTop: 4,
          padding: "4px 10px",
          background: ctaTint ? "var(--student-soft)" : "transparent",
          color: ctaTint ? "var(--student)" : "var(--student)",
          border: "none", borderRadius: 6,
          fontSize: 11.5, fontWeight: 600, cursor: "pointer",
        }}>{cta}</button>
      )}
    </div>
  );
}

/* ─────────── Thread header (shared) ─────────── */
function ThreadHeader({ leading, avatar, title, subtitle, chips, actions, tabs, activeTab, onTab }) {
  return (
    <div style={{ borderBottom: "1px solid var(--mist)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 22px" }}>
        {leading}
        {avatar}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--ink)", lineHeight: 1.2 }}>{title}</div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>{actions}</div>
      </div>
      {chips && (
        <div style={{ display: "flex", gap: 6, padding: "0 22px 12px", flexWrap: "wrap" }}>
          {chips.map((c, i) => {
            const Ico = c.icon ? I[c.icon] : null;
            return (
              <span key={i} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                padding: "3px 9px",
                fontSize: 11.5, fontWeight: 500,
                background: c.ghost ? "transparent" : `${c.color}1A`,
                color: c.ghost ? "var(--stone)" : c.color,
                border: c.ghost ? "1px dashed var(--mist)" : "none",
                borderRadius: 999,
              }}>
                {Ico && <Ico size={11} color={c.color}/>}
                {c.label}
              </span>
            );
          })}
        </div>
      )}
      {tabs && (
        <div style={{ display: "flex", gap: 4, padding: "0 22px", borderTop: "1px solid var(--mist)" }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => onTab(t)}
              style={{
                padding: "10px 12px",
                border: "none", background: "transparent",
                color: t === activeTab ? "var(--student)" : "var(--stone)",
                fontSize: 12.5,
                fontWeight: t === activeTab ? 600 : 500,
                cursor: "pointer",
                borderBottom: t === activeTab ? "2px solid var(--student)" : "2px solid transparent",
                marginBottom: -1,
              }}
            >{t}</button>
          ))}
        </div>
      )}
    </div>
  );
}

window.MessagesDM = DMThread;
window.MessagesClass = ClassChannelThread;
window.MessagesAssignment = AssignmentThread;
window.MessagesBubble = Bubble;
window.MessagesComposer = Composer;
window.MessagesIconBtn = iconBtn;
window.MessagesDaySep = DaySep;

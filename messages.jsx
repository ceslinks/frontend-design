// LINKS — Messages: page-level wrapper

const PageConvList = window.MessagesConvList;
const PageDM = window.MessagesDM;
const PageClass = window.MessagesClass;
const PageAssignment = window.MessagesAssignment;
const PageEmail = window.MessagesEmailView;
const PagePanelTeacher = window.MessagesPanelTeacher;
const PagePanelClassmate = window.MessagesPanelClassmate;
const PagePanelClass = window.MessagesPanelClass;
const PagePanelAssignment = window.MessagesPanelAssignment;
const PageData = window.MessagesData;

const MSG_TABS = [
  { id: "thread",        label: "All",     icon: "MessageCircle", badge: 17, href: "#/messages" },
  { id: "direct",        label: "Direct",  icon: "User",          badge: 4,  href: "#/messages/direct" },
  { id: "class-channel", label: "Classes", icon: "Book",          badge: 6,  href: "#/messages/class-channel" },
  { id: "email",         label: "Email",   icon: "Mail",          badge: 12, href: "#/messages/email" },
];

const ROUTE_DEFAULTS = {
  "thread":            { activeId: "carter",         filter: "All" },
  "direct":            { activeId: "carter",         filter: "Direct" },
  "class-channel":     { activeId: "english10",      filter: "Classes" },
  "assignment-thread": { activeId: "argument-essay", filter: "Classes" },
};

function MessagesPage({ subRoute = "thread", segments = ["messages"] }) {
  const defaults = ROUTE_DEFAULTS[subRoute] || ROUTE_DEFAULTS["thread"];
  const [activeId, setActiveId] = React.useState(defaults.activeId);
  const [filter, setFilter] = React.useState(defaults.filter);
  const [safetyModal, setSafetyModal] = React.useState(null); // null | "soft" | "hard" | "crisis"

  React.useEffect(() => {
    const d = ROUTE_DEFAULTS[subRoute] || ROUTE_DEFAULTS["thread"];
    setActiveId(d.activeId);
    setFilter(d.filter);
  }, [subRoute]);

  const conv = PageData[activeId] || {};
  const kind = conv.kind;

  const isEmail = subRoute === "email" || subRoute === "email-compose";
  const isSettings = subRoute === "settings";
  const isCore = !isEmail && !isSettings;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 96px)", padding: "8px 24px 0" }}>

      {/* Page header with breadcrumbs */}
      <PageHeader
        segments={segments}
        title={isSettings ? "Message Preferences" : "Messages"}
        emoji="💬"
        lede={isSettings ? "Control how and when you receive notifications." : "Inbox, DMs, group threads, and class channels."}
      />

      {/* Tab navigation */}
      <div style={{
        display: "flex", alignItems: "center",
        borderBottom: "1px solid var(--mist)",
        marginBottom: 12, overflowX: "auto",
      }}>
        {/* Core tabs */}
        {MSG_TABS.map((tab) => {
          const active = subRoute === tab.id;
          const Ico = I[tab.icon];
          return (
            <a key={tab.id} href={tab.href} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "10px 14px",
              textDecoration: "none",
              color: active ? "var(--student)" : "var(--stone)",
              fontSize: 13, fontWeight: active ? 600 : 500,
              borderBottom: active ? "2px solid var(--student)" : "2px solid transparent",
              marginBottom: -1, whiteSpace: "nowrap", flexShrink: 0,
            }}>
              <Ico size={13} color={active ? "var(--student)" : "var(--stone)"}/>
              {tab.label}
              {tab.badge && (
                <span style={{
                  background: active ? "var(--student)" : "#94A3B8",
                  color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 999, fontWeight: 700,
                }}>{tab.badge}</span>
              )}
            </a>
          );
        })}

        <div style={{ flex: 1 }}/>

        {/* Settings link */}
        <a href="#/messages/settings" style={{
          height: 32, padding: "0 12px",
          display: "inline-flex", alignItems: "center", gap: 6,
          background: isSettings ? "var(--student-soft)" : "var(--bone)",
          color: isSettings ? "var(--student)" : "var(--stone)",
          borderRadius: 8, fontSize: 12.5, fontWeight: 500,
          textDecoration: "none", flexShrink: 0,
          border: isSettings ? "1px solid rgba(139,92,246,0.25)" : "1px solid var(--mist)",
        }}>
          <I.Settings size={13} color={isSettings ? "var(--student)" : "var(--stone)"}/>
          Settings
        </a>
      </div>

      {/* Content area */}
      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        {isEmail && (
          <PageEmail subView={subRoute === "email-compose" ? "compose" : "detail"}/>
        )}
        {isSettings && (
          <MsgSettingsPage/>
        )}
        {isCore && (
          <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}>
            <PageConvList
              active={activeId}
              onSelect={setActiveId}
              filter={filter}
              onSafetyDemo={setSafetyModal}
            />
            <div style={{ flex: 1, minWidth: 0, display: "flex" }}>
              {(kind === "dm-teacher" || kind === "dm") && <PageDM id={activeId}/>}
              {kind === "class-channel" && <PageClass id={activeId}/>}
              {kind === "assignment" && <PageAssignment id={activeId}/>}
              {kind === "group" && <PageClass id={activeId}/>}
            </div>
            <div style={{ display: "flex", position: "relative" }}>
              {kind === "dm-teacher" && <PagePanelTeacher id={activeId}/>}
              {kind === "dm" && <PagePanelClassmate id={activeId}/>}
              {kind === "class-channel" && <PagePanelClass id={activeId}/>}
              {kind === "assignment" && <PagePanelAssignment id={activeId}/>}
              {kind === "group" && <PagePanelClass id={activeId}/>}
            </div>
          </div>
        )}
      </div>

      {/* Safety modals */}
      {safetyModal && <MsgSafetyModal kind={safetyModal} onClose={() => setSafetyModal(null)}/>}
    </div>
  );
}

/* ─── Settings Page ─── */

function MsgToggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 44, height: 24, borderRadius: 999,
        background: on ? "var(--student)" : "#CBD5E1",
        border: "none", cursor: "pointer", flexShrink: 0,
        display: "flex", alignItems: "center",
        padding: "0 3px",
        transition: "background 150ms",
      }}
    >
      <div style={{
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff",
        marginLeft: on ? "auto" : 0,
        transition: "margin 150ms",
        boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
      }}/>
    </button>
  );
}

function SettingRow({ label, desc, value, onChange, v2, last }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 12,
      paddingBottom: last ? 0 : 16, marginBottom: last ? 0 : 16,
      borderBottom: last ? "none" : "1px solid var(--mist)",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{label}</span>
          {v2 && (
            <span style={{
              fontSize: 9, fontWeight: 700, letterSpacing: "0.05em",
              padding: "1px 5px", background: "#F3F4F6",
              color: "var(--silver)", borderRadius: 3,
            }}>V2</span>
          )}
        </div>
        <p style={{ fontSize: 12, color: "var(--stone)", margin: "3px 0 0", lineHeight: 1.5 }}>{desc}</p>
      </div>
      <div style={{ paddingTop: 3 }}>
        <MsgToggle on={value} onChange={onChange}/>
      </div>
    </div>
  );
}

function SettCard({ icon, iconBg, iconColor, title, children }) {
  const Ico = I[icon];
  return (
    <div className="card" style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: iconBg,
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Ico size={17} color={iconColor}/>
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: "var(--ink)" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

function MsgSettingsPage() {
  const [sound,          setSound]          = React.useState(true);
  const [badge,          setBadge]          = React.useState(true);
  const [digest,         setDigest]         = React.useState(false);
  const [muteSenders,    setMuteSenders]    = React.useState(false);
  const [muteClasses,    setMuteClasses]    = React.useState(false);
  const [dndOn,          setDndOn]          = React.useState(false);
  const [dndRepeat,      setDndRepeat]      = React.useState(true);
  const [dndStart,       setDndStart]       = React.useState("22:00");
  const [dndEnd,         setDndEnd]         = React.useState("07:00");
  const [selDays,        setSelDays]        = React.useState(new Set(["Mon","Tue","Wed","Thu","Fri"]));
  const [autoRead,       setAutoRead]       = React.useState(true);
  const [typingInd,      setTypingInd]      = React.useState(true);
  const [autoArchive,    setAutoArchive]    = React.useState(false);
  const [allowScheduled, setAllowScheduled] = React.useState(true);
  const [allowTemplates, setAllowTemplates] = React.useState(true);
  const [readReceipts,   setReadReceipts]   = React.useState(false);

  const toggleDay = (d) => {
    const next = new Set(selDays);
    next.has(d) ? next.delete(d) : next.add(d);
    setSelDays(next);
  };

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const inputStyle = {
    padding: "8px 12px", borderRadius: 8,
    border: "1px solid var(--mist)",
    background: "var(--bone)", fontSize: 13,
    fontFamily: "inherit", color: "var(--ink)", outline: "none",
    width: "100%", boxSizing: "border-box",
  };

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "20px 0 60px" }}>
      {/* Section heading */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>Message Preferences</h2>
        <p style={{ fontSize: 14, color: "var(--stone)", margin: 0 }}>Control how and when you receive notifications.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>

        {/* 1. Notification Controls */}
        <SettCard icon="Bell" iconBg="#FEF3C7" iconColor="#F59E0B" title="Notification Controls">
          <SettingRow
            label="Sound & badge"
            desc="Play a sound and show badge count for new messages"
            value={sound} onChange={setSound}
          />
          <SettingRow
            label="Mute by sender"
            desc="Silence notifications from specific people"
            value={muteSenders} onChange={setMuteSenders}
          />
          {muteSenders && (
            <div style={{
              background: "var(--bone)", borderRadius: 8,
              padding: "10px 12px", marginBottom: 16,
              fontSize: 12, color: "var(--stone)",
            }}>
              No senders muted yet.{" "}
              <a href="#" style={{ color: "var(--student)", fontWeight: 600, textDecoration: "none" }}>Add sender</a>
            </div>
          )}
          <SettingRow
            label="Mute by class"
            desc="Silence notifications from a class channel"
            value={muteClasses} onChange={setMuteClasses}
          />
          {muteClasses && (
            <div style={{
              background: "var(--bone)", borderRadius: 8,
              padding: "10px 12px", marginBottom: 16,
              fontSize: 12, color: "var(--stone)",
            }}>
              No classes muted yet.{" "}
              <a href="#" style={{ color: "var(--student)", fontWeight: 600, textDecoration: "none" }}>Add class</a>
            </div>
          )}
          <SettingRow
            label="Daily/weekly digest"
            desc="Get a summary instead of individual notifications"
            value={digest} onChange={setDigest} last
          />
        </SettCard>

        {/* 2. Do Not Disturb */}
        <SettCard icon="Clock" iconBg="#E0F2FE" iconColor="#0EA5E9" title="Do Not Disturb">
          <SettingRow
            label="Enable DND schedule"
            desc="Automatically mute notifications during set hours"
            value={dndOn} onChange={setDndOn}
          />
          {dndOn && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--slate)", display: "block", marginBottom: 5 }}>Start time</label>
                  <input type="time" value={dndStart} onChange={(e) => setDndStart(e.target.value)} style={inputStyle}/>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--slate)", display: "block", marginBottom: 5 }}>End time</label>
                  <input type="time" value={dndEnd} onChange={(e) => setDndEnd(e.target.value)} style={inputStyle}/>
                </div>
              </div>
              <div style={{ marginBottom: 8 }}>
                <label style={{ fontSize: 11.5, fontWeight: 600, color: "var(--slate)", display: "block", marginBottom: 7 }}>Days</label>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                  {days.map((d) => (
                    <button key={d} onClick={() => toggleDay(d)} style={{
                      padding: "4px 9px", borderRadius: 999,
                      border: selDays.has(d) ? "none" : "1px solid var(--mist)",
                      background: selDays.has(d) ? "var(--student)" : "transparent",
                      color: selDays.has(d) ? "#fff" : "var(--stone)",
                      fontSize: 11.5, fontWeight: 600, cursor: "pointer",
                      fontFamily: "inherit",
                    }}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <SettingRow
            label="Repeat weekly"
            desc="Apply this DND schedule every week automatically"
            value={dndRepeat} onChange={setDndRepeat} last
          />
        </SettCard>

        {/* 3. Preferences & Privacy (merged) */}
        <SettCard icon="Settings" iconBg="#F0FDF4" iconColor="#22C55E" title="Preferences & Privacy">
          <SettingRow
            label="Auto-mark as read"
            desc="Mark messages as read when you view the thread"
            value={autoRead} onChange={setAutoRead}
          />
          <SettingRow
            label="Show typing indicators"
            desc="See when someone is writing a reply to you"
            value={typingInd} onChange={setTypingInd}
          />
          <SettingRow
            label="Auto-archive after 30 days"
            desc="Archive read conversations you haven't replied to"
            value={autoArchive} onChange={setAutoArchive}
          />
          <SettingRow
            label="Message scheduling"
            desc="Schedule messages to be sent at a future time"
            value={allowScheduled} onChange={setAllowScheduled}
          />
          <SettingRow
            label="Message templates"
            desc="Use pre-written templates when composing"
            value={allowTemplates} onChange={setAllowTemplates}
          />
          <SettingRow
            label="Read receipts"
            desc="Let others see when you've read their message"
            v2 value={readReceipts} onChange={setReadReceipts} last
          />
        </SettCard>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <a href="#/messages" className="btn btn-primary" style={{ textDecoration: "none" }}>
          ← Back to Messages
        </a>
        <button className="btn btn-secondary">Reset to defaults</button>
      </div>
    </div>
  );
}

/* ─── Safety modals ─── */
function MsgSafetyModal({ kind, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15,23,42,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        {kind === "soft" && <SoftFlagCard onClose={onClose}/>}
        {kind === "hard" && <HardBlockCard onClose={onClose}/>}
        {kind === "crisis" && <CrisisCard onClose={onClose}/>}
      </div>
    </div>
  );
}

function SoftFlagCard({ onClose }) {
  return (
    <div style={{
      width: 440, background: "var(--paper)", borderRadius: 20, padding: 28,
      boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
    }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: "#FEF3C7", border: "1.5px solid #FDE68A",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <I.Bell size={22} color="#F59E0B"/>
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: "var(--ink)" }}>This might not land well</h3>
          <p style={{ fontSize: 13, color: "var(--stone)", margin: 0, lineHeight: 1.55 }}>
            Your message could come across as harsh. Want to rephrase it before sending?
          </p>
        </div>
      </div>

      <div style={{ background: "var(--bone)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "var(--slate)", fontStyle: "italic", lineHeight: 1.5 }}>
        "That was a really dumb idea and you should have known better."
      </div>

      <div style={{
        background: "linear-gradient(90deg, rgba(139,92,246,0.06), rgba(59,130,246,0.06))",
        border: "1px dashed rgba(139,92,246,0.25)",
        borderRadius: 10, padding: "12px 14px", marginBottom: 18,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <I.Sparkle size={12} color="var(--student)"/>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--student-deep)" }}>Suggested rephrasing</span>
        </div>
        <p style={{ fontSize: 13, color: "var(--slate)", margin: 0, lineHeight: 1.55 }}>
          "I think that approach could use some reconsideration — here's what I was thinking instead…"
        </p>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>Use suggested</button>
        <button className="btn btn-secondary" style={{ flex: 1 }} onClick={onClose}>Edit myself</button>
        <button onClick={onClose} style={{
          padding: "9px 14px", background: "transparent",
          border: "1px solid var(--mist)", borderRadius: 9,
          fontSize: 12.5, color: "var(--stone)", cursor: "pointer",
          fontFamily: "inherit", fontWeight: 500,
        }}>Send anyway</button>
      </div>
    </div>
  );
}

function HardBlockCard({ onClose }) {
  return (
    <div style={{
      width: 440, background: "var(--paper)", borderRadius: 20, padding: 28,
      boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
    }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: "#FEE2E2", border: "1.5px solid #FECACA",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <I.X size={22} color="#EF4444"/>
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: "var(--ink)" }}>This message can't be sent</h3>
          <p style={{ fontSize: 13, color: "var(--stone)", margin: 0, lineHeight: 1.55 }}>
            This message violates our community guidelines and cannot be delivered.
          </p>
        </div>
      </div>

      <div style={{
        padding: "12px 14px", background: "#FEF2F2",
        border: "1px solid #FECACA", borderRadius: 10, marginBottom: 18,
      }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#DC2626", letterSpacing: "0.06em", marginBottom: 6 }}>Why was this blocked?</div>
        <p style={{ fontSize: 13, color: "#7F1D1D", margin: 0, lineHeight: 1.55 }}>
          Content that threatens, harasses, or intimidates others is not allowed on LINKS. This includes direct threats and repeated unwanted contact.
        </p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={onClose}>Edit message</button>
        <button className="btn btn-secondary" onClick={onClose}>Discard</button>
      </div>
      <div style={{ textAlign: "center", fontSize: 12, color: "var(--stone)" }}>
        Believe this was a mistake?{" "}
        <a href="#" style={{ color: "var(--student)", textDecoration: "none", fontWeight: 600 }}>Contact support</a>
      </div>
    </div>
  );
}

function CrisisCard({ onClose }) {
  return (
    <div style={{
      width: 460, background: "var(--paper)", borderRadius: 20, padding: 28,
      boxShadow: "0 20px 60px rgba(15,23,42,0.18)",
    }}>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 18 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 13,
          background: "linear-gradient(135deg, #EDE9FE, #DBEAFE)",
          border: "1.5px solid #C4B5FD",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <I.Heart size={22} color="#7C3AED"/>
        </div>
        <div>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 6px", color: "var(--ink)" }}>We're here for you</h3>
          <p style={{ fontSize: 13, color: "var(--stone)", margin: 0, lineHeight: 1.55 }}>
            It sounds like you might be going through something difficult. You don't have to face it alone.
          </p>
        </div>
      </div>

      <div style={{
        background: "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(59,130,246,0.06))",
        border: "1px solid rgba(139,92,246,0.15)",
        borderRadius: 12, padding: "14px 16px", marginBottom: 18,
      }}>
        <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.6, marginBottom: 12 }}>
          Your school counselor has been notified and will reach out to you shortly. Your message has been kept private.
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-primary btn-sm" onClick={onClose} style={{ fontSize: 12 }}>
            <I.MessageCircle size={12} color="#fff"/> Message a counselor
          </button>
          <button className="btn btn-secondary btn-sm" style={{ fontSize: 12 }}>
            <I.Phone size={12} color="var(--student)"/> Crisis line: 988
          </button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {[
          { icon: "Heart",     label: "Breathing exercises", sub: "3-minute guided reset" },
          { icon: "Lightbulb", label: "Coping strategies",   sub: "Evidence-based tools" },
          { icon: "Globe",     label: "Crisis Text Line",     sub: "Text HOME to 741741" },
        ].map((r) => {
          const Ico = I[r.icon];
          return (
            <div key={r.label} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "10px 14px", background: "var(--bone)", borderRadius: 10, cursor: "pointer",
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(139,92,246,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Ico size={15} color="var(--student)"/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{r.label}</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{r.sub}</div>
              </div>
              <I.ChevronRight size={13} color="var(--silver)"/>
            </div>
          );
        })}
      </div>

      <button onClick={onClose} style={{
        width: "100%", padding: "10px", background: "transparent",
        border: "1px solid var(--mist)", borderRadius: 10,
        fontSize: 13, color: "var(--stone)", cursor: "pointer",
        fontFamily: "inherit", fontWeight: 500,
      }}>I'm okay — continue</button>
    </div>
  );
}

window.MessagesPage = MessagesPage;

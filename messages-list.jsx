// LINKS — Messages: page-level component
//
// Three-pane shell (conversation list · thread · context panel).
// View state is selected by the conversation `kind`:
//   dm-teacher · dm · group · class-channel · assignment · email · email-compose

const Av = window.MessagesAv;
const Portrait = window.MessagesPortrait;
const GroupTile = window.MessagesGroupTile;
const CONVS = window.MessagesData;

// Safety demo trigger config — staged scenarios on specific conversations
const SAFETY_DEMO_IDS = {
  "carter": [
    { label: "Soft Flag", kind: "soft" },
    { label: "Crisis",    kind: "crisis" },
  ],
  "jordan": [
    { label: "Hard Block", kind: "hard" },
  ],
};

/* ─────────── Left rail: conversation list ─────────── */

function ConversationListItem({ id, conv, active, onClick, sectioned, onSafetyDemo }) {
  const accent = "#8B5CF6";
  const showPin = conv.pinned;
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        width: "100%", display: "flex", gap: 8,
        padding: "8px 12px",
        border: "none",
        background: isActive ? "var(--student-soft)" : "transparent",
        borderRadius: 12,
        textAlign: "left",
        cursor: "pointer",
        transition: "background 100ms",
        position: "relative",
      }}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--bone)"; }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
    >
      {conv.portrait
        ? <Portrait name={conv.who} hue={conv.portrait.hue} dot={conv.presence === "online" ? "online" : null} size={38}/>
        : <GroupTile icon={I[conv.icon]} color={conv.color} size={38}/>
      }
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
          <span style={{
            fontSize: 13.5, fontWeight: conv.unread ? 600 : 500,
            color: "var(--ink)",
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>{conv.who}</span>
          <span style={{ fontSize: 10.5, color: "var(--silver)", flexShrink: 0 }}>{conv.time}</span>
        </div>
        <div style={{
          fontSize: 11.5, color: "var(--stone)", marginTop: 1,
          display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical",
          overflow: "hidden", textOverflow: "ellipsis",
        }}>{conv.last}</div>
        {conv.dueLine && (
          <div style={{ fontSize: 10.5, color: accent, marginTop: 2, fontWeight: 500 }}>{conv.dueLine}</div>
        )}
        {onSafetyDemo && SAFETY_DEMO_IDS[id] && (
          <div style={{ display: "flex", gap: 4, marginTop: 5, alignItems: "center" }} onClick={(e) => e.stopPropagation()}>
            <span style={{ fontSize: 9, color: "var(--silver)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>demo:</span>
            {SAFETY_DEMO_IDS[id].map((t) => (
              <button key={t.kind} onClick={() => onSafetyDemo(t.kind)} style={{
                padding: "2px 7px",
                background: "var(--bone)",
                border: "1px solid var(--mist)",
                borderRadius: 999,
                fontSize: 10, color: "var(--stone)",
                cursor: "pointer", fontFamily: "inherit",
              }}>{t.label}</button>
            ))}
          </div>
        )}
      </div>
      {conv.unread > 0 && (
        <span style={{
          alignSelf: "center",
          minWidth: 18, height: 18, padding: "0 6px",
          borderRadius: 999,
          background: accent, color: "#fff",
          fontSize: 10.5, fontWeight: 700,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>{conv.unread}</span>
      )}
      {showPin && (
        <I.Pin size={11} color="var(--silver)" style={{ position: "absolute", top: 12, right: 12 }}/>
      )}
    </button>
  );
}

function ConvList({ active, onSelect, filter, onSafetyDemo }) {

  // Group conversations into sections
  const pinned = ["english10", "argument-essay", "biology-lab"];
  const direct = ["jordan", "carter", "taylor", "marcus", "avery"];
  const classes = ["alg2", "biology101", "ushistory", "spanish3"];
  const groups = ["study-group-chem", "robotics", "wyn-soccer", "history-team", "study-buddies"];

  // Context-aware middle tab state — resets when top-level filter changes
  const [middleTab, setMiddleTab] = React.useState("All");
  React.useEffect(() => { setMiddleTab("All"); }, [filter]);

  // Middle tab definitions per top-level filter
  const MIDDLE_TAB_OPTIONS = {
    "Direct":  ["All", "Direct (1:1)", "Groups"],
  };
  const middleTabOptions = MIDDLE_TAB_OPTIONS[filter] || null;

  const tabFilter = (id) => {
    if (filter === "All") return true;
    if (filter === "Direct") return CONVS[id].kind === "dm" || CONVS[id].kind === "dm-teacher";
    if (filter === "Groups") return CONVS[id].kind === "group";
    if (filter === "Classes") return CONVS[id].kind === "class-channel" || CONVS[id].kind === "assignment";
    if (filter === "Unread") return CONVS[id].unread > 0;
    return true;
  };

  const filteredPinned = pinned.filter(tabFilter).filter(id => CONVS[id]);
  const filteredDirect = direct.filter(id => CONVS[id] && (CONVS[id].kind === "dm" || CONVS[id].kind === "dm-teacher"));
  const filteredClasses = classes.filter(tabFilter).filter(id => CONVS[id]);
  const filteredGroups = groups.filter(id => CONVS[id]);
  const filteredClassChannels = filteredClasses.filter(id => CONVS[id].kind === "class-channel");
  const filteredAssignments   = [...pinned, ...classes].filter(id => CONVS[id] && CONVS[id].kind === "assignment");

  const Section = ({ title, ids }) => ids.length === 0 ? null : (
    <div style={{ marginBottom: 6 }}>
      {title && (
        <div className="t-eyebrow" style={{
          fontSize: 10, padding: "5px 12px 4px", color: "var(--silver)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          {title === "Pinned" && <I.Pin size={10} color="var(--silver)"/>}
          {title}
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {ids.map((id) => (
          <ConversationListItem key={id} id={id} conv={CONVS[id]} active={active} onClick={onSelect} onSafetyDemo={onSafetyDemo}/>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      width: 320, flexShrink: 0,
      background: "var(--paper)",
      borderRadius: 16,
      boxShadow: "var(--shadow-card)",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{ padding: "16px 16px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <h2 className="t-h2" style={{ fontSize: 20, margin: 0 }}>Messages</h2>
          <button
            title="New message"
            style={{
              width: 32, height: 32,
              background: "var(--student)", color: "#fff",
              border: "none", borderRadius: 8, cursor: "pointer",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "var(--student-deep)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "var(--student)"}
          >
            <I.Compose size={16} color="#fff"/>
          </button>
        </div>
        {/* Search + filter */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 8,
            background: "var(--bone)", borderRadius: 8, padding: "8px 10px",
          }}>
            <I.Search size={13} color="var(--silver)"/>
            <input
              placeholder="Search messages…"
              style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12.5 }}
            />
          </div>
          <button style={{
            width: 32, height: 32, background: "var(--bone)",
            border: "none", borderRadius: 8, cursor: "pointer",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.Filter size={14} color="var(--stone)"/>
          </button>
        </div>
      </div>

      {/* Context-aware middle tabs — appear only when relevant */}
      {middleTabOptions && (
        <div style={{
          display: "flex", gap: 0,
          borderBottom: "1px solid var(--mist)",
          padding: "0 12px",
          flexShrink: 0,
        }}>
          {middleTabOptions.map((t) => {
            const on = middleTab === t;
            return (
              <button key={t} onClick={() => setMiddleTab(t)} style={{
                padding: "8px 10px", border: "none", background: "transparent",
                color: on ? "var(--student)" : "var(--stone)",
                fontSize: 12, fontWeight: on ? 600 : 500,
                cursor: "pointer",
                borderBottom: on ? "2px solid var(--student)" : "2px solid transparent",
                marginBottom: -1, whiteSpace: "nowrap",
                fontFamily: "inherit",
              }}>{t}</button>
            );
          })}
        </div>
      )}

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 8px" }}>
        {filter === "Direct" ? (
          <>
            {(middleTab === "All" || middleTab === "Direct (1:1)") && (
              <>
                <Section title="Pinned" ids={pinned.filter(id => CONVS[id] && (CONVS[id].kind === "dm" || CONVS[id].kind === "dm-teacher"))}/>
                <Section title="Direct Messages" ids={filteredDirect}/>
              </>
            )}
            {(middleTab === "All" || middleTab === "Groups") && (
              <Section title="Group Chats" ids={filteredGroups}/>
            )}
          </>
        ) : filter === "Classes" ? (
          <>
            <Section title="Pinned" ids={filteredPinned.filter(id => CONVS[id].kind === "class-channel")}/>
            <Section title="Class Channels" ids={filteredClassChannels}/>
            <Section title="Assignment Threads" ids={filteredAssignments}/>
          </>
        ) : (
          <>
            <Section title="Pinned" ids={filteredPinned}/>
            <Section title="Direct Messages" ids={direct.filter(id => CONVS[id] && tabFilter(id))}/>
            <Section title="Groups" ids={filter === "All" ? filteredGroups : []}/>
          </>
        )}
      </div>

      {/* Footer removed — archive accessible via ··· menu */}
    </div>
  );
}

window.MessagesConvList = ConvList;
window.MessagesConvListItem = ConversationListItem;

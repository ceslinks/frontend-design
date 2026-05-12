// LINKS — Messages: page-level component
//
// Three-pane shell (conversation list · thread · context panel).
// View state is selected by the conversation `kind`:
//   dm-teacher · dm · group · class-channel · assignment · email · email-compose

const Av = window.MessagesAv;
const Portrait = window.MessagesPortrait;
const GroupTile = window.MessagesGroupTile;
const CONVS = window.MessagesData;

/* ─────────── Left rail: conversation list ─────────── */

function ConversationListItem({ id, conv, active, onClick, sectioned }) {
  const accent = "#8B5CF6";
  const showPin = conv.pinned;
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      style={{
        width: "100%", display: "flex", gap: 10,
        padding: "10px 12px",
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
          <span style={{ fontSize: 11, color: "var(--silver)", flexShrink: 0 }}>{conv.time}</span>
        </div>
        <div style={{
          fontSize: 12, color: "var(--stone)", marginTop: 2,
          display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical",
          overflow: "hidden", textOverflow: "ellipsis",
        }}>{conv.last}</div>
        {conv.dueLine && (
          <div style={{ fontSize: 10.5, color: accent, marginTop: 2, fontWeight: 500 }}>{conv.dueLine}</div>
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

function ConvList({ active, onSelect, filter, setFilter }) {
  const tabs = ["All", "Direct", "Groups", "Classes", "Unread"];

  // Group conversations into sections
  const pinned = ["english10", "argument-essay", "biology-lab"];
  const direct = ["jordan", "carter", "taylor", "marcus", "avery"];
  const classes = ["alg2", "biology101", "ushistory", "spanish3"];
  const groups = ["study-group-chem", "robotics", "wyn-soccer", "history-team", "study-buddies"];

  const tabFilter = (id) => {
    if (filter === "All") return true;
    if (filter === "Direct") return CONVS[id].kind === "dm" || CONVS[id].kind === "dm-teacher";
    if (filter === "Groups") return CONVS[id].kind === "group";
    if (filter === "Classes") return CONVS[id].kind === "class-channel" || CONVS[id].kind === "assignment";
    if (filter === "Unread") return CONVS[id].unread > 0;
    return true;
  };

  const filteredPinned = pinned.filter(tabFilter).filter(id => CONVS[id]);
  const filteredDirect = direct.filter(tabFilter).filter(id => CONVS[id]);
  const filteredClasses = classes.filter(tabFilter).filter(id => CONVS[id]);
  const filteredGroups = groups.filter(tabFilter).filter(id => CONVS[id]);

  const Section = ({ title, ids }) => ids.length === 0 ? null : (
    <div style={{ marginBottom: 8 }}>
      <div className="t-eyebrow" style={{
        fontSize: 10, padding: "6px 12px 6px", color: "var(--silver)",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        {title === "Pinned" && <I.Pin size={10} color="var(--silver)"/>}
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {ids.map((id) => (
          <ConversationListItem key={id} id={id} conv={CONVS[id]} active={active} onClick={onSelect}/>
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
        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "1px solid var(--mist)", marginBottom: 10 }}>
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                padding: "8px 8px",
                border: "none",
                background: "transparent",
                color: filter === t ? "var(--student)" : "var(--stone)",
                fontSize: 12.5,
                fontWeight: filter === t ? 600 : 500,
                cursor: "pointer",
                borderBottom: filter === t ? "2px solid var(--student)" : "2px solid transparent",
                marginBottom: -1,
              }}
            >{t}</button>
          ))}
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

      {/* List */}
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px 8px" }}>
        <Section title="Pinned" ids={filteredPinned}/>
        <Section title={filter === "Direct" ? "Direct Messages" : "My Classes"} ids={filter === "Direct" ? filteredDirect : filteredClasses}/>
        {filter !== "Direct" && <Section title="Direct Messages" ids={filteredDirect}/>}
        <Section title="Groups" ids={filteredGroups}/>
      </div>

      {/* Footer */}
      <div style={{
        padding: "10px 16px", borderTop: "1px solid var(--mist)",
        fontSize: 12, color: "var(--stone)", display: "flex", alignItems: "center", gap: 8,
      }}>
        <I.Archive size={13} color="var(--stone)"/>
        <span>View Archived</span>
      </div>
    </div>
  );
}

window.MessagesConvList = ConvList;
window.MessagesConvListItem = ConversationListItem;

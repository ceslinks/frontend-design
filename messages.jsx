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

function MessagesPage({ subRoute = "thread" }) {
  // subRoute: "thread" | "email" | "email-compose"
  const isEmail = subRoute === "email" || subRoute === "email-compose";

  const [activeId, setActiveId] = React.useState("carter");
  const [filter, setFilter] = React.useState("All");

  const conv = PageData[activeId];
  const kind = conv?.kind;

  // Sub-route bar (Chat / Email tabs)
  const subTabs = [
    { id: "thread", label: "Chat", icon: "MessageCircle" },
    { id: "email", label: "Email", icon: "Mail" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "calc(100vh - 96px)", padding: "20px 24px" }}>
      {/* Top sub-route bar */}
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        padding: "0 4px",
      }}>
        <h1 className="t-h1" style={{ fontSize: 24, margin: 0 }}>Messages</h1>
        <div style={{
          display: "flex", gap: 2, padding: 3,
          background: "var(--bone)", borderRadius: 10,
        }}>
          {subTabs.map((t) => {
            const Ico = I[t.icon];
            const active = (t.id === "thread" && !isEmail) || (t.id === "email" && isEmail);
            return (
              <a key={t.id} href={t.id === "email" ? "#/messages/email" : "#/messages"}
                style={{
                  padding: "6px 12px", borderRadius: 7, fontSize: 12.5, fontWeight: 600,
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: active ? "var(--paper)" : "transparent",
                  color: active ? "var(--student-deep)" : "var(--stone)",
                  boxShadow: active ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
                  textDecoration: "none", cursor: "pointer",
                }}
              >
                <Ico size={12} color={active ? "var(--student)" : "var(--stone)"}/>
                {t.label}
                {t.id === "thread" && <span style={{ background: "var(--student)", color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 999, fontWeight: 700 }}>17</span>}
                {t.id === "email" && <span style={{ background: "#F59E0B", color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 999, fontWeight: 700 }}>12</span>}
              </a>
            );
          })}
        </div>
        <div style={{ flex: 1 }}/>
        <button className="btn btn-secondary btn-sm" style={{ height: 32 }}>
          <I.Settings size={13} color="var(--stone)"/> Settings
        </button>
      </div>

      {/* Main shell */}
      {isEmail ? (
        <PageEmail subView={subRoute === "email-compose" ? "compose" : "detail"}/>
      ) : (
        <div style={{ display: "flex", gap: 14, flex: 1, minHeight: 0 }}>
          <PageConvList active={activeId} onSelect={setActiveId} filter={filter} setFilter={setFilter}/>
          {/* Center thread */}
          <div style={{ flex: 1, minWidth: 0, display: "flex" }}>
            {kind === "dm-teacher" && <PageDM id={activeId}/>}
            {kind === "dm" && <PageDM id={activeId}/>}
            {kind === "class-channel" && <PageClass id={activeId}/>}
            {kind === "assignment" && <PageAssignment id={activeId}/>}
            {(kind === "group") && <PageClass id={activeId}/>}
          </div>
          {/* Right context panel */}
          <div style={{ display: "flex", position: "relative" }}>
            {kind === "dm-teacher" && <PagePanelTeacher id={activeId}/>}
            {kind === "dm" && <PagePanelClassmate id={activeId}/>}
            {kind === "class-channel" && <PagePanelClass id={activeId}/>}
            {kind === "assignment" && <PagePanelAssignment id={activeId}/>}
            {kind === "group" && <PagePanelClass id={activeId}/>}
          </div>
        </div>
      )}

      {/* Quick-jump bar across bottom: choose a demo state */}
      <div style={{
        display: "flex", gap: 6, padding: "10px 12px",
        background: "var(--paper)", border: "1px solid var(--mist)",
        borderRadius: 12, alignItems: "center",
        flexWrap: "wrap",
      }}>
        <span className="t-eyebrow" style={{ fontSize: 10, color: "var(--silver)", marginRight: 4 }}>
          <I.Sparkle size={10} color="var(--silver)" style={{ verticalAlign: "middle", marginRight: 4 }}/>
          Demo views
        </span>
        <DemoChip label="DM · Teacher" active={!isEmail && activeId === "carter"} onClick={() => { window.location.hash = "#/messages"; setActiveId("carter"); }}/>
        <DemoChip label="DM · Classmate (AI)" active={!isEmail && activeId === "jordan"} onClick={() => { window.location.hash = "#/messages"; setActiveId("jordan"); }}/>
        <DemoChip label="Class Channel" active={!isEmail && activeId === "english10"} onClick={() => { window.location.hash = "#/messages"; setActiveId("english10"); }}/>
        <DemoChip label="Assignment Thread" active={!isEmail && activeId === "argument-essay"} onClick={() => { window.location.hash = "#/messages"; setActiveId("argument-essay"); }}/>
        <DemoChip label="Email · Inbox" active={subRoute === "email"} onClick={() => { window.location.hash = "#/messages/email"; }}/>
        <DemoChip label="Email · AI Compose" active={subRoute === "email-compose"} onClick={() => { window.location.hash = "#/messages/email-compose"; }}/>
      </div>
    </div>
  );
}

function DemoChip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 12px",
      background: active ? "var(--student)" : "var(--bone)",
      color: active ? "#fff" : "var(--slate)",
      border: "none", borderRadius: 999,
      fontSize: 11.5, fontWeight: 600, cursor: "pointer",
    }}>{label}</button>
  );
}

window.MessagesPage = MessagesPage;

// LINKS — Tools · Organize category (File Manager, Sticky Notes, Mind Map)

/* ============================================================
   FILE MANAGER — folder tree + grid
   ============================================================ */
function ToolFiles() {
  const breadcrumb = ["My Desk", "School", "Biology", "Cell Unit"];
  const folders = [
    { n: "Lab Reports",  c: "#22C55E", count: 6 },
    { n: "Notes",        c: "#A855F7", count: 14 },
    { n: "Presentations", c: "#EF4444", count: 3 },
  ];
  const files = [
    { n: "Cell respiration overview", k: "Note",         icon: "Notes",     col: "#A855F7", date: "Today, 9:14 AM",   size: "2 KB" },
    { n: "Mitochondria diagram",      k: "Drawing",      icon: "Edit",       col: "#22C55E", date: "Today, 8:42 AM",   size: "84 KB" },
    { n: "Cell Structure deck",       k: "Presentation", icon: "Image",      col: "#A855F7", date: "Yesterday",        size: "412 KB" },
    { n: "Lab #4 — fermentation",     k: "Document",     icon: "Document",   col: "#3B82F6", date: "May 18",           size: "18 KB" },
    { n: "Voice memo · reflection",   k: "Audio",        icon: "Mic",        col: "#EF4444", date: "May 18",           size: "640 KB" },
    { n: "Quadratic graph",           k: "Graph",        icon: "ChartBar",   col: "#22C55E", date: "May 17",           size: "12 KB" },
    { n: "Photosynthesis concept map", k: "Drawing",      icon: "Atom",       col: "#22C55E", date: "May 16",           size: "62 KB" },
    { n: "Mitosis explainer (rough)", k: "Video",        icon: "Video",      col: "#EF4444", date: "May 15",           size: "8.4 MB" },
  ];
  return (
    <ToolShell
      toolId="files"
      docTitle="Cell Unit"
      saveState="Synced · just now"
      headerExtras={<button className="btn btn-sm"><I.Plus size={12} color="var(--stone)"/> New folder</button>}
      toolbar={
        <>
          <ToolBtn label="Grid" active/>
          <ToolBtn label="List"/>
          <ToolDivider/>
          <ToolBtn label="Sort: Modified"/>
          <ToolBtn label="Filter"/>
          <span style={{ flex: 1 }}/>
          <input placeholder="Search this folder…" style={{ border: "1px solid var(--mist)", padding: "5px 10px", fontSize: 12, borderRadius: 6, background: "var(--paper)", width: 200 }}/>
        </>
      }
      leftRail={
        <div className="card" style={{ padding: 12 }}>
          <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>FOLDERS</div>
          {[
            { n: "All my files", c: 248, ic: "Folder" },
            { n: "School", c: 162, ic: "Folder", indent: 0, expand: true },
            { n: "Biology", c: 38, ic: "Folder", indent: 1, expand: true },
            { n: "Cell Unit", c: 14, ic: "Folder", indent: 2, active: true },
            { n: "DNA Unit", c: 9, ic: "Folder", indent: 2 },
            { n: "Algebra II", c: 47, ic: "Folder", indent: 1 },
            { n: "English Lit", c: 36, ic: "Folder", indent: 1 },
            { n: "Personal", c: 86, ic: "Folder" },
            { n: "Trash", c: 12, ic: "Trash" },
          ].map((f, i) => {
            const Ic = I[f.ic] || I.Folder;
            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 6,
                paddingLeft: 8 + (f.indent || 0) * 14,
                paddingRight: 8, paddingTop: 5, paddingBottom: 5,
                borderRadius: 6, cursor: "pointer",
                background: f.active ? "var(--student-soft)" : "transparent",
                color: f.active ? "var(--student-deep)" : "var(--slate)",
                fontWeight: f.active ? 600 : 500, fontSize: 12.5,
              }}>
                {f.expand ? <I.ChevronDown size={10} color="var(--stone)"/> : <span style={{ width: 10 }}/>}
                <Ic size={12} color={f.active ? "var(--student-deep)" : "var(--stone)"}/>
                <span style={{ flex: 1 }}>{f.n}</span>
                <span style={{ fontSize: 10.5, color: "var(--silver)" }}>{f.c}</span>
              </div>
            );
          })}
        </div>
      }
      rightRail={
        <div className="card" style={{ padding: 14 }}>
          <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>SELECTED · CELL RESPIRATION OVERVIEW</div>
          <div style={{ aspectRatio: "4/3", background: "var(--bone)", border: "1px solid var(--mist)", borderRadius: 6, marginBottom: 12, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--silver)", fontSize: 11, fontFamily: "ui-monospace,monospace" }}>[ preview ]</div>
          <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.7 }}>
            <div><strong style={{ color: "var(--ink)" }}>Type</strong> · Note</div>
            <div><strong style={{ color: "var(--ink)" }}>Created</strong> · May 21, 2026</div>
            <div><strong style={{ color: "var(--ink)" }}>Modified</strong> · Today, 9:14 AM</div>
            <div><strong style={{ color: "var(--ink)" }}>Size</strong> · 2 KB</div>
            <div><strong style={{ color: "var(--ink)" }}>Tags</strong> · Bio · Ch 6 · Energy</div>
          </div>
          <button className="btn btn-sm" style={{ width: "100%", marginTop: 12, justifyContent: "center" }}>Open in Notes</button>
        </div>
      }
    >
      <div style={{ padding: "14px 22px 26px" }}>
        {/* breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16, fontSize: 12.5, color: "var(--stone)" }}>
          {breadcrumb.map((b, i) => (
            <React.Fragment key={i}>
              <span style={{ color: i === breadcrumb.length - 1 ? "var(--ink)" : "var(--stone)", fontWeight: i === breadcrumb.length - 1 ? 600 : 500 }}>{b}</span>
              {i < breadcrumb.length - 1 && <I.ChevronRight size={11} color="var(--silver)"/>}
            </React.Fragment>
          ))}
        </div>

        <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 10 }}>FOLDERS · 3</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10, marginBottom: 22 }}>
          {folders.map((f) => (
            <div key={f.n} style={{ padding: 14, border: "1px solid var(--mist)", borderRadius: 8, background: "var(--paper)", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 24, background: f.c + "1A", borderRadius: 4, position: "relative", flexShrink: 0 }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 14, height: 4, background: f.c, borderRadius: "2px 2px 0 0" }}/>
                <div style={{ position: "absolute", inset: 0, top: 4, background: f.c + "55", borderRadius: 2 }}/>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.n}</div>
                <div style={{ fontSize: 10.5, color: "var(--silver)" }}>{f.count} items</div>
              </div>
            </div>
          ))}
        </div>

        <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 10 }}>FILES · 8</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))", gap: 12 }}>
          {files.map((f, i) => {
            const Ic = I[f.icon] || I.Document;
            return (
              <div key={i} style={{
                padding: 12, border: i === 0 ? "2px solid var(--student)" : "1px solid var(--mist)",
                borderRadius: 8, background: "var(--paper)", cursor: "pointer",
              }}>
                <div style={{ aspectRatio: "4/3", background: f.col + "11", borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <Ic size={24} color={f.col}/>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.n}</div>
                <div style={{ fontSize: 10.5, color: "var(--silver)", marginTop: 2, display: "flex", justifyContent: "space-between" }}>
                  <span>{f.k}</span>
                  <span>{f.size}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToolShell>
  );
}

/* ============================================================
   STICKY NOTES — board of post-its
   ============================================================ */
function ToolSticky() {
  const stickies = [
    { c: "#FEF3C7", b: "#F59E0B", text: "Bring graph paper to algebra Friday", rot: -1.5, x: 0, y: 0,    big: true },
    { c: "#DCFCE7", b: "#22C55E", text: "Email Coach Reyes about regionals form", rot: 1.2,  x: 220, y: 30,   tag: "DUE FRI" },
    { c: "#DBEAFE", b: "#3B82F6", text: "Idea for English essay: open with Patel's question", rot: -0.8, x: 0, y: 200 },
    { c: "#FCE7F3", b: "#EC4899", text: "Mom · permission slip", rot: 2.4, x: 220, y: 240, tag: "TODAY" },
    { c: "#EDE9FE", b: "#A855F7", text: "Read 2 more pages of *Things Fall Apart*", rot: -0.4, x: 460, y: 60 },
    { c: "#FFEDD5", b: "#F97316", text: "Practice oboe — 20 min · scales + new piece", rot: 1.6, x: 460, y: 240 },
    { c: "#CFFAFE", b: "#06B6D4", text: "Robotics build night moved to Thursday 6pm", rot: -1.2, x: 660, y: 80, tag: "MEETING" },
  ];
  return (
    <ToolShell
      toolId="sticky"
      docTitle="My Board"
      saveState="Synced · just now"
      contentBg="#FAFAF8"
      toolbar={
        <>
          <ToolBtn icon="Plus" label="New sticky"/>
          <ToolDivider/>
          <ToolBtn label="All"/>
          <ToolBtn label="Today" active/>
          <ToolBtn label="This week"/>
          <ToolBtn label="Done"/>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>7 stickies · 2 due today</span>
        </>
      }
      rightRail={
        <>
          <div className="card" style={{ padding: 14 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>NEW STICKY</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
              {["#FEF3C7", "#DCFCE7", "#DBEAFE", "#FCE7F3", "#EDE9FE", "#FFEDD5", "#CFFAFE"].map((c, i) => (
                <button key={c} style={{ width: 24, height: 24, borderRadius: 4, background: c, border: i === 0 ? "2px solid var(--ink)" : "1px solid var(--mist)", cursor: "pointer" }}/>
              ))}
            </div>
            <textarea placeholder="What's on your mind?" rows={3} style={{ width: "100%", border: "1px solid var(--mist)", borderRadius: 6, padding: 8, fontFamily: "var(--font-handwritten, 'Caveat', cursive)", fontSize: 16, resize: "none", background: "#FEF3C7" }}/>
            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
              <select className="btn btn-sm" style={{ flex: 1, fontSize: 11 }}>
                <option>No due date</option><option>Today</option><option>Tomorrow</option><option>This week</option>
              </select>
              <button className="btn btn-sm btn-primary"><I.Plus size={11} color="#fff"/> Add</button>
            </div>
          </div>
          <AICoachRail context="Your sticky board" suggestions={[
            { t: "Probe", q: "Two stickies are due today. Which one will you do first, and why?" },
            { t: "Self-check", q: "Any sticky here that's actually a project, not a task?" },
          ]}/>
        </>
      }
    >
      <div style={{
        position: "relative", minHeight: 540, padding: 36,
        backgroundImage: "linear-gradient(var(--mist) 1px, transparent 1px), linear-gradient(90deg, var(--mist) 1px, transparent 1px)",
        backgroundSize: "32px 32px", backgroundColor: "#FAFAF8", backgroundPosition: "-1px -1px",
      }}>
        {stickies.map((s, i) => (
          <div key={i} style={{
            position: "absolute", left: 36 + s.x, top: 36 + s.y,
            width: s.big ? 200 : 180, minHeight: s.big ? 160 : 130,
            background: s.c, padding: 14,
            transform: `rotate(${s.rot}deg)`,
            boxShadow: "0 8px 18px rgba(15,23,42,0.10), 0 2px 4px rgba(15,23,42,0.06)",
            borderTop: `3px solid ${s.b}`,
            cursor: "grab",
          }}>
            {s.tag && (
              <div style={{ display: "inline-block", fontSize: 9, fontWeight: 800, color: s.b, letterSpacing: "0.08em", marginBottom: 6, padding: "2px 6px", background: "rgba(255,255,255,0.5)", borderRadius: 3 }}>
                {s.tag}
              </div>
            )}
            <div style={{
              fontFamily: "var(--font-handwritten, 'Caveat', cursive)",
              fontSize: 19, lineHeight: 1.25, color: "#3a2d05",
            }}>
              {s.text}
            </div>
            <div style={{ position: "absolute", bottom: 10, right: 12, display: "flex", gap: 6, opacity: 0.5 }}>
              <I.Edit size={11} color="#3a2d05"/>
              <I.Check size={11} color="#3a2d05"/>
            </div>
          </div>
        ))}
        {/* tape on first one */}
        <div style={{
          position: "absolute", left: 36 + 80, top: 36 - 8, width: 60, height: 18,
          background: "rgba(255,255,255,0.6)", border: "1px solid rgba(15,23,42,0.06)",
          transform: "rotate(-2deg)", pointerEvents: "none",
        }}/>
      </div>
    </ToolShell>
  );
}

/* ============================================================
   MIND MAP — radial idea map
   ============================================================ */
function ToolMindMap() {
  const W = 760, H = 500, cx = W / 2, cy = H / 2;
  const branches = [
    { ang: -150, r: 200, label: "Causes",       color: "#EF4444", kids: ["Industrial revolution", "Fossil fuels", "Deforestation"] },
    { ang:  -50, r: 200, label: "Effects",       color: "#F59E0B", kids: ["Sea-level rise", "Heat waves", "Crop loss"] },
    { ang:   50, r: 200, label: "Solutions",     color: "#22C55E", kids: ["Renewables", "Reforestation", "Policy change"] },
    { ang:  140, r: 190, label: "My questions",  color: "#A855F7", kids: ["Local impact?", "Who pays?"] },
  ];
  const polar = (a, r) => [cx + Math.cos((a * Math.PI) / 180) * r, cy + Math.sin((a * Math.PI) / 180) * r];

  return (
    <ToolShell
      toolId="mindmap"
      docTitle="Climate Change · Research Map"
      saveState="Saved · 18s ago"
      contentBg="#FAFAFB"
      toolbar={
        <>
          <ToolBtn icon="Plus" label="Add node"/>
          <ToolBtn icon="ArrowRight" label="Connect"/>
          <ToolDivider/>
          <ToolBtn label="Radial" active/>
          <ToolBtn label="Tree"/>
          <ToolBtn label="Free"/>
          <ToolDivider/>
          <ToolBtn icon="Sparkle" label="Find missing branches"/>
          <span style={{ flex: 1 }}/>
          <ToolBtn label="−"/>
          <span style={{ fontSize: 11, color: "var(--stone)", fontFamily: "ui-monospace,monospace" }}>100%</span>
          <ToolBtn label="+"/>
        </>
      }
      leftRail={
        <div className="card" style={{ padding: 12 }}>
          <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>BRANCHES · 4</div>
          {branches.map((b) => (
            <div key={b.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: b.color }}/>
                {b.label}
                <span style={{ fontSize: 10, color: "var(--silver)", marginLeft: "auto", fontWeight: 500 }}>{b.kids.length}</span>
              </div>
              {b.kids.map((k) => (
                <div key={k} style={{ paddingLeft: 14, fontSize: 11.5, color: "var(--stone)", padding: "3px 0 3px 14px" }}>
                  · {k}
                </div>
              ))}
            </div>
          ))}
        </div>
      }
      rightRail={<AICoachRail context="Climate change research map" suggestions={[
        { t: "Probe", q: "Your 'Solutions' branch has 3 nodes but 'Effects' has 3 too. Where's the imbalance?" },
        { t: "Sources", q: "Each leaf needs a source. Which two are missing one?" },
        { t: "Self-check", q: "Could a friend look at this map and explain your topic in 60s?" },
      ]} cites={["NYT — Klein column", "IPCC summary"]}/>}
    >
      <div style={{
        minHeight: 540, padding: 12,
        backgroundImage: "radial-gradient(circle, var(--mist) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block", maxWidth: 900, margin: "0 auto" }}>
          {/* connection arcs root → branch */}
          {branches.map((b) => {
            const [bx, by] = polar(b.ang, b.r);
            return <path key={b.label} d={`M ${cx} ${cy} Q ${(cx + bx) / 2 + (b.ang > 0 ? 0 : 20)} ${(cy + by) / 2} ${bx} ${by}`} stroke={b.color} strokeWidth="2.5" fill="none" opacity="0.75"/>;
          })}
          {/* branch → kids */}
          {branches.map((b) =>
            b.kids.map((k, i) => {
              const [bx, by] = polar(b.ang, b.r);
              const subAng = b.ang + (i - (b.kids.length - 1) / 2) * 14;
              const [kx, ky] = polar(subAng, b.r + 110);
              return <line key={b.label + k} x1={bx} y1={by} x2={kx} y2={ky} stroke={b.color} strokeWidth="1.2" opacity="0.4"/>;
            })
          )}

          {/* root */}
          <g>
            <circle cx={cx} cy={cy} r="62" fill="#0F172A"/>
            <circle cx={cx} cy={cy} r="74" fill="none" stroke="#0F172A" strokeOpacity="0.15" strokeWidth="2"/>
            <text x={cx} y={cy - 4} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="var(--font-display)">Climate</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="var(--font-display)">Change</text>
          </g>

          {/* branch nodes */}
          {branches.map((b) => {
            const [bx, by] = polar(b.ang, b.r);
            return (
              <g key={"b" + b.label}>
                <rect x={bx - 70} y={by - 18} width="140" height="36" rx="18" fill="#fff" stroke={b.color} strokeWidth="2.5"/>
                <text x={bx} y={by + 4} textAnchor="middle" fill="var(--ink)" fontSize="13" fontWeight="700" fontFamily="var(--font-display)">{b.label}</text>
              </g>
            );
          })}

          {/* leaf nodes */}
          {branches.map((b) =>
            b.kids.map((k, i) => {
              const subAng = b.ang + (i - (b.kids.length - 1) / 2) * 14;
              const [kx, ky] = polar(subAng, b.r + 110);
              return (
                <g key={b.label + "l" + k}>
                  <rect x={kx - 56} y={ky - 13} width="112" height="26" rx="13" fill={b.color + "14"} stroke={b.color} strokeWidth="1" strokeOpacity="0.5"/>
                  <text x={kx} y={ky + 4} textAnchor="middle" fill="var(--ink)" fontSize="10.5" fontWeight="600">{k}</text>
                </g>
              );
            })
          )}

          {/* coach hint dot near "My questions" */}
          <g>
            <circle cx={polar(140, 190)[0] + 80} cy={polar(140, 190)[1] - 30} r="14" fill="#A855F7" opacity="0.15"/>
            <circle cx={polar(140, 190)[0] + 80} cy={polar(140, 190)[1] - 30} r="6" fill="#A855F7"/>
            <text x={polar(140, 190)[0] + 80} y={polar(140, 190)[1] - 26} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">?</text>
          </g>
        </svg>
      </div>
    </ToolShell>
  );
}

window.ToolFiles = ToolFiles;
window.ToolSticky = ToolSticky;
window.ToolMindMap = ToolMindMap;

// LINKS — Tools · Think category (Calculator, Graphing, Drawing)

/* ============================================================
   CALCULATOR — scientific + history tape
   ============================================================ */
function ToolCalculator() {
  const [expr, setExpr] = React.useState("3x² − 4x − 7 = 0");
  const [mode, setMode] = React.useState("scientific");
  const history = [
    { e: "(2/3) + (5/6)",          r: "3/2",       t: "9:42 AM" },
    { e: "sin(45°) × √2",          r: "1",         t: "9:38 AM" },
    { e: "log(1000)",              r: "3",         t: "9:35 AM" },
    { e: "(−4 ± √(16 + 84)) / 6",  r: "x = 7/3 or x = −1", t: "9:30 AM" },
  ];
  const keys = [
    ["sin", "cos", "tan", "π",   "C"],
    ["log", "ln",  "√",   "x²",  "÷"],
    ["7",   "8",   "9",   "(",   "×"],
    ["4",   "5",   "6",   ")",   "−"],
    ["1",   "2",   "3",   ",",   "+"],
    ["0",   ".",   "x",   "y",   "="],
  ];

  return (
    <ToolShell
      toolId="calculator"
      docTitle="Quadratic from class"
      saveState="History saved"
      toolbar={
        <>
          {["Basic", "Scientific", "Graphing", "Statistics"].map((m) => (
            <ToolBtn key={m} label={m} active={m.toLowerCase() === mode || (m === "Scientific" && mode === "scientific")} onClick={() => setMode(m.toLowerCase())}/>
          ))}
          <ToolDivider/>
          <ToolBtn icon="ChartBar" label="Plot result"/>
          <ToolBtn icon="Sparkle" label="Walk me through it"/>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Radians ▾</span>
        </>
      }
      rightRail={
        <>
          <div className="card" style={{ padding: 14 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>HISTORY</div>
            {history.map((h, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < history.length - 1 ? "1px solid var(--mist)" : "none" }}>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: "var(--slate)", marginBottom: 2 }}>{h.e}</div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>= {h.r}</div>
                <div style={{ fontSize: 10, color: "var(--silver)", marginTop: 2 }}>{h.t}</div>
              </div>
            ))}
          </div>
          <AICoachRail context="Quadratic equation" suggestions={[
            { t: "Probe",      q: "Why does the discriminant tell you how many real roots there are?" },
            { t: "Self-check", q: "What does b² − 4ac equal here? Try it before pressing solve." },
            { t: "Connect",    q: "When have you seen a negative discriminant? What did it mean?" },
          ]} cites={["Algebra II · Lesson 5.4"]}/>
        </>
      }
    >
      <div style={{ padding: 28, display: "grid", gridTemplateRows: "auto 1fr", gap: 16, height: "100%", minHeight: 540 }}>
        {/* Display */}
        <div style={{
          background: "#0F172A", borderRadius: 10, padding: 22, color: "#fff",
          display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 160,
        }}>
          <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>solve for x:</div>
          <input
            value={expr}
            onChange={(e) => setExpr(e.target.value)}
            style={{
              width: "100%", background: "transparent", border: "none", outline: "none",
              color: "#fff", fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 600,
            }}
          />
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 8, marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>x =</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#A78BFA" }}>7/3,  −1</span>
          </div>
        </div>

        {/* Keypad */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
          {keys.flat().map((k, i) => {
            const isOp = ["÷","×","−","+","="].includes(k);
            const isFn = ["sin","cos","tan","π","log","ln","√","x²","C","(",")",",","x","y"].includes(k);
            const isEq = k === "=";
            return (
              <button key={i} style={{
                padding: "14px 0", borderRadius: 8,
                border: "1px solid var(--mist)",
                background: isEq ? "var(--student)" : isOp ? "var(--student-soft)" : isFn ? "var(--bone)" : "var(--paper)",
                color: isEq ? "#fff" : isOp ? "var(--student-deep)" : "var(--ink)",
                fontFamily: isFn || isOp ? "var(--font-ui)" : "var(--font-display)",
                fontSize: isFn ? 13 : 16, fontWeight: 600, cursor: "pointer",
              }}>{k}</button>
            );
          })}
        </div>
      </div>
    </ToolShell>
  );
}

/* ============================================================
   GRAPHING — function plotter
   ============================================================ */
function ToolGraphing() {
  const fns = [
    { e: "y = x² − 2x − 3",      c: "#6D28D9", on: true },
    { e: "y = 2x + 1",            c: "#22C55E", on: true },
    { e: "y = sin(x)",            c: "#F59E0B", on: false },
  ];

  // Build a parabola path roughly y = x²−2x−3 mapped into 0..400 / 0..280
  const W = 560, H = 360, ox = W / 2, oy = H / 2, sx = 32, sy = 24;
  const pts = [];
  for (let xi = -8; xi <= 10; xi += 0.25) {
    const yi = xi * xi - 2 * xi - 3;
    pts.push([ox + xi * sx, oy - yi * sy]);
  }
  const parabola = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  // line y = 2x + 1
  const linePts = [-8, 10].map((xi) => [ox + xi * sx, oy - (2 * xi + 1) * sy]);
  const linePath = `M ${linePts[0][0]} ${linePts[0][1]} L ${linePts[1][0]} ${linePts[1][1]}`;

  return (
    <ToolShell
      toolId="graphing"
      docTitle="Linear Functions Practice Graph"
      saveState="Saved · 3m ago"
      toolbar={
        <>
          <ToolBtn icon="Plus" label="Add function"/>
          <ToolBtn icon="ChartBar" label="Add table"/>
          <ToolBtn icon="Edit" label="Annotate"/>
          <ToolDivider/>
          <ToolBtn label="Zoom in"/>
          <ToolBtn label="Zoom out"/>
          <ToolBtn label="Reset view"/>
          <span style={{ flex: 1 }}/>
          <button className="btn btn-sm"><I.Download size={12} color="var(--stone)"/> Export PNG</button>
        </>
      }
      leftRail={
        <>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>FUNCTIONS</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {fns.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, border: "1px solid var(--mist)", borderRadius: 6, background: f.on ? "var(--paper)" : "var(--bone)" }}>
                  <div style={{ width: 12, height: 12, borderRadius: 2, background: f.c, opacity: f.on ? 1 : 0.4 }}/>
                  <code style={{ flex: 1, fontFamily: "ui-monospace, monospace", fontSize: 11.5, color: f.on ? "var(--ink)" : "var(--silver)" }}>{f.e}</code>
                  <input type="checkbox" defaultChecked={f.on}/>
                </div>
              ))}
              <button style={{ padding: 8, border: "1px dashed var(--mist)", borderRadius: 6, background: "transparent", color: "var(--stone)", cursor: "pointer", fontSize: 11.5, fontFamily: "ui-monospace, monospace" }}>f(x) = …</button>
            </div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>POINTS OF INTEREST</div>
            {[
              { t: "Roots of y = x² − 2x − 3", v: "x = −1, x = 3" },
              { t: "Vertex", v: "(1, −4)" },
              { t: "Intersection", v: "(−1, −1) · (4, 9)" },
            ].map((p, i) => (
              <div key={i} style={{ paddingTop: i ? 8 : 0, borderTop: i ? "1px solid var(--mist)" : "none", marginTop: i ? 8 : 0 }}>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>{p.t}</div>
                <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 12.5, color: "var(--ink)", fontWeight: 600 }}>{p.v}</div>
              </div>
            ))}
          </div>
        </>
      }
      rightRail={<AICoachRail context="Graph of a parabola + line" suggestions={[
        { t: "Probe", q: "Where does the parabola cross the x-axis? What does that tell you about its factors?" },
        { t: "Self-check", q: "Without solving, predict: how many times does the line intersect the parabola?" },
      ]} cites={["Algebra II · Lesson 6.1"]}/>}
    >
      <div style={{ padding: 24, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 540 }}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ background: "#FAFAFB", borderRadius: 8, border: "1px solid var(--mist)", maxWidth: 720 }}>
          {/* grid */}
          {Array.from({ length: 18 }).map((_, i) => (
            <line key={"v" + i} x1={i * sx} x2={i * sx} y1={0} y2={H} stroke="var(--mist)" strokeWidth={i * sx === ox ? 1.5 : 0.5} strokeDasharray={i * sx === ox ? "" : "2 3"}/>
          ))}
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={"h" + i} y1={i * sy} y2={i * sy} x1={0} x2={W} stroke="var(--mist)" strokeWidth={i * sy === oy ? 1.5 : 0.5} strokeDasharray={i * sy === oy ? "" : "2 3"}/>
          ))}
          {/* axes labels */}
          <text x={W - 14} y={oy - 6} fontSize="11" fill="var(--stone)" fontFamily="ui-monospace,monospace">x</text>
          <text x={ox + 6} y={14} fontSize="11" fill="var(--stone)" fontFamily="ui-monospace,monospace">y</text>
          {/* parabola */}
          <path d={parabola} fill="none" stroke="#6D28D9" strokeWidth="2.5"/>
          {/* line */}
          <path d={linePath} fill="none" stroke="#22C55E" strokeWidth="2"/>
          {/* roots */}
          {[[-1, 0], [3, 0]].map((p, i) => (
            <g key={i}>
              <circle cx={ox + p[0] * sx} cy={oy - p[1] * sy} r="5" fill="#6D28D9"/>
              <circle cx={ox + p[0] * sx} cy={oy - p[1] * sy} r="9" fill="none" stroke="#6D28D9" strokeOpacity="0.3" strokeWidth="2"/>
            </g>
          ))}
          {/* vertex marker */}
          <g>
            <circle cx={ox + 1 * sx} cy={oy - (-4) * sy} r="4" fill="#fff" stroke="#6D28D9" strokeWidth="2"/>
            <text x={ox + 1 * sx + 8} y={oy - (-4) * sy + 4} fontSize="11" fill="var(--ink)" fontFamily="ui-monospace,monospace">vertex (1,−4)</text>
          </g>
        </svg>
      </div>
    </ToolShell>
  );
}

/* ============================================================
   DRAWING — diagram & sketch canvas
   ============================================================ */
function ToolDrawing() {
  const tools = [
    { ic: "Edit",    n: "Pen",    a: true },
    { ic: "Edit",    n: "Brush" },
    { ic: "Edit",    n: "Eraser" },
    { ic: "Document", n: "Text" },
    { ic: "Atom",    n: "Shape" },
    { ic: "ArrowRight", n: "Arrow" },
  ];
  return (
    <ToolShell
      toolId="drawing"
      docTitle="Photosynthesis · Concept Map"
      saveState="Saved · 28s ago"
      contentBg="#FAFAFB"
      toolbar={
        <>
          {tools.map((t) => <ToolBtn key={t.n} icon={t.ic} label={t.n} active={t.a}/>)}
          <ToolDivider/>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--stone)" }}>
            Stroke
            <input type="range" min="1" max="12" defaultValue="3" style={{ width: 90 }}/>
            <span style={{ fontFamily: "ui-monospace,monospace" }}>3px</span>
          </span>
          <ToolDivider/>
          <div style={{ display: "flex", gap: 4 }}>
            {["#0F172A", "#6D28D9", "#22C55E", "#EF4444", "#F59E0B", "#3B82F6"].map((c, i) => (
              <button key={c} style={{ width: 22, height: 22, borderRadius: 999, background: c, border: i === 1 ? "2px solid var(--ink)" : "1px solid var(--mist)", cursor: "pointer" }}/>
            ))}
          </div>
          <span style={{ flex: 1 }}/>
          <ToolBtn label="Undo"/>
          <ToolBtn label="Redo"/>
        </>
      }
      leftRail={
        <div className="card" style={{ padding: 12 }}>
          <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>LAYERS</div>
          {["Annotations", "Connections", "Nodes", "Background"].map((l, i) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", borderTop: i ? "1px solid var(--mist)" : "none" }}>
              <I.Eye size={11} color="var(--stone)"/>
              <span style={{ fontSize: 12, color: "var(--ink)", flex: 1 }}>{l}</span>
              <span style={{ fontSize: 10, color: "var(--silver)" }}>{i === 2 ? "8" : i === 1 ? "6" : i === 0 ? "3" : "—"}</span>
            </div>
          ))}
          <button style={{ marginTop: 8, fontSize: 11.5, color: "var(--student-deep)", background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Layer</button>
        </div>
      }
      rightRail={<AICoachRail context="Photosynthesis concept map" suggestions={[
        { t: "Probe", q: "Your map shows inputs and outputs. What happens *between* them?" },
        { t: "Self-check", q: "Could a 6th-grader read this map? If not, what label is missing?" },
      ]}/>}
    >
      <div style={{
        position: "relative", minHeight: 540,
        backgroundImage: "radial-gradient(circle, var(--mist) 1px, transparent 1px)",
        backgroundSize: "20px 20px", padding: 36,
      }}>
        {/* Concept-map nodes */}
        <svg width="100%" height="480" style={{ position: "absolute", inset: 36, pointerEvents: "none" }}>
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--stone)"/>
            </marker>
          </defs>
          <path d="M 130 80 Q 250 40 360 90"  stroke="var(--stone)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)"/>
          <path d="M 360 130 Q 380 220 270 280" stroke="var(--stone)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)"/>
          <path d="M 130 130 L 230 280"        stroke="var(--stone)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)"/>
          <path d="M 410 110 L 600 110"        stroke="var(--stone)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)"/>
          <path d="M 410 110 L 600 200"        stroke="var(--stone)" strokeWidth="1.5" fill="none" markerEnd="url(#arr)"/>
        </svg>

        {[
          { l: "30px", t: "60px",  k: "INPUT",   n: "Sunlight",  c: "#F59E0B" },
          { l: "30px", t: "130px", k: "INPUT",   n: "CO₂ + H₂O", c: "#3B82F6" },
          { l: "320px", t: "70px", k: "PROCESS", n: "Light reactions", c: "#6D28D9" },
          { l: "210px", t: "270px", k: "PRODUCT", n: "Glucose",   c: "#22C55E" },
          { l: "560px", t: "90px",  k: "OUTPUT",  n: "ATP",        c: "#22C55E" },
          { l: "560px", t: "180px", k: "OUTPUT",  n: "O₂",         c: "#22C55E" },
        ].map((n) => (
          <div key={n.n} style={{
            position: "absolute", left: n.l, top: n.t,
            background: "var(--paper)", border: `2px solid ${n.c}`,
            borderRadius: 10, padding: "8px 14px",
            boxShadow: "0 4px 10px rgba(15,23,42,0.06)",
            minWidth: 110, textAlign: "center",
          }}>
            <div className="t-eyebrow" style={{ fontSize: 8, color: n.c, marginBottom: 2 }}>{n.k}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{n.n}</div>
          </div>
        ))}

        {/* hand-drawn annotation */}
        <div style={{
          position: "absolute", left: 360, top: 350,
          fontFamily: "var(--font-handwritten, 'Caveat', cursive)",
          fontSize: 22, color: "#6D28D9", transform: "rotate(-3deg)",
        }}>
          ← this is where it all happens!
        </div>
      </div>
    </ToolShell>
  );
}

window.ToolCalculator = ToolCalculator;
window.ToolGraphing = ToolGraphing;
window.ToolDrawing = ToolDrawing;

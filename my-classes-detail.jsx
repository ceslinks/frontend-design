// LINKS — Class Detail page (Modules / Lesson View)

const Algebra2Course = {
  id: "algebra2",
  name: "Algebra II",
  teacher: "Mr. David Wilson",
  period: "Period 1",
  room: "Virtual",
  color: "#8B5CF6",
  abbr: "x²",
  progress: 45,
  modulesCompleted: 3,
  modulesTotal: 8,
  lessonsCompleted: 24,
  lessonsTotal: 53,
  hoursLogged: 18,
  modules: [
    {
      n: 1, title: "Foundations Review", state: "Completed", progress: 100,
      score: "92%", lessons: 6, lessonsTotal: 6, hours: 3.5,
      sub: "Review of Algebra I concepts and prerequisites",
    },
    {
      n: 2, title: "Linear Functions", state: "Completed", progress: 100,
      score: "85%", lessons: 7, lessonsTotal: 7, hours: 4,
      sub: "Slope-intercept form, graphing, and applications",
    },
    {
      n: 3, title: "Systems of Equations", state: "Completed", progress: 100,
      score: "88%", lessons: 6, lessonsTotal: 6, hours: 4.5,
      sub: "Solving systems algebraically and graphically",
    },
    {
      n: 4, title: "Quadratic Functions", state: "In Progress", progress: 65,
      lessons: 5, lessonsTotal: 8, hours: "3 / 5",
      sub: "Parabolas, vertex form, and the quadratic formula",
      current: true,
      currentLesson: "Lesson 4.6: The Quadratic Formula",
    },
    {
      n: 5, title: "Polynomials", state: "Locked", progress: 0,
      lessons: 0, lessonsTotal: 7, hours: 5,
      sub: "Factoring, roots, and polynomial division",
      locked: true, unlockMsg: "Complete Module 4 to unlock",
    },
    {
      n: 6, title: "Exponential & Logarithmic Functions", state: "Locked", progress: 0,
      lessons: 0, lessonsTotal: 6, hours: 4,
      sub: "Exponential growth, logarithms, and applications",
      locked: true, unlockMsg: "Complete previous modules to unlock",
    },
  ],
};
window.Algebra2Course = Algebra2Course;

/* ─────────── Class Detail wrapper ─────────── */
function ClassDetail({ classId }) {
  const c = ClassesData[classId] || ClassesData.algebra2;
  // Biology has its own bespoke page (chat-first, lab-day flow)
  if (classId === "biology" && window.BiologyClassPage) {
    return <window.BiologyClassPage c={c}/>;
  }
  // Algebra II has its own bespoke page (virtual class, quadratic unit)
  if (classId === "algebra2" && window.Alg2ClassPage) {
    return <window.Alg2ClassPage c={c}/>;
  }
  // Spanish II has its own bespoke page (directed study, check-in flow)
  if (classId === "spanish" && window.Sp2ClassPage) {
    return <window.Sp2ClassPage c={c}/>;
  }
  // English 10 has its own bespoke page (in-person discussion/writing class)
  if (classId === "english10" && window.Eng10ClassPage) {
    return <window.Eng10ClassPage c={c}/>;
  }
  // Right rail tabs: Class Chat | Resources | People
  const [view, setView] = React.useState("modules"); // modules | lesson
  const course = Algebra2Course;
  const [rightTab, setRightTab] = React.useState("chat");

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, padding: "20px 24px", alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Breadcrumbs trail={[
          { label: "My Classes", href: "#/my-classes" },
          { label: c.name },
        ]}/>
        <ClassHeader c={c} course={course}/>

        {/* Sub-tabs */}
        <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--bone)", borderRadius: 10, alignSelf: "flex-start" }}>
          {[
            { id: "modules", label: "Modules", icon: "Folder" },
            { id: "lesson",  label: "Current Lesson", icon: "Book" },
            { id: "assign",  label: "Assignments", icon: "Document" },
            { id: "grades",  label: "Grades", icon: "Trophy" },
          ].map((t) => {
            const Icon = I[t.icon];
            const active = t.id === view;
            return (
              <button key={t.id} onClick={() => setView(t.id)} style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "6px 12px",
                background: active ? "var(--paper)" : "transparent",
                border: "none", borderRadius: 8,
                fontSize: 12.5, fontWeight: active ? 600 : 500,
                color: active ? "var(--student)" : "var(--stone)",
                cursor: "pointer",
                boxShadow: active ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              }}>
                <Icon size={13} color={active ? "var(--student)" : "var(--stone)"}/> {t.label}
              </button>
            );
          })}
        </div>

        {view === "modules" && <ModulesView course={course}/>}
        {view === "lesson" && <CurrentLessonView course={course}/>}
        {view === "assign" && <AssignmentsView course={course}/>}
        {view === "grades" && <GradesView course={course}/>}
      </div>

      <ClassRightRail c={c} course={course} tab={rightTab} setTab={setRightTab}/>
    </div>
  );
}
window.ClassDetail = ClassDetail;

/* ─────────── Header ─────────── */
function ClassHeader({ c, course }) {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${c.color}12, ${c.color}05)`,
      borderRadius: 16, padding: "16px 20px",
      border: `1px solid ${c.color}30`,
      display: "flex", alignItems: "center", gap: 16,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: 14,
        background: c.color, color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, fontWeight: 700,
      }}>{c.abbr}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <h1 className="t-h1" style={{ fontSize: 22, margin: 0 }}>{c.name}</h1>
          <span style={{ fontSize: 10.5, padding: "2px 8px", background: "#EF4444", color: "#fff", borderRadius: 4, fontWeight: 700, letterSpacing: "0.04em" }}>LIVE NOW</span>
        </div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2 }}>{c.teacher} · {c.period} · {c.room}</div>
      </div>
      <div style={{ display: "flex", gap: 16, paddingRight: 8 }}>
        <Stat label="Progress" value={`${course.progress}%`} color={c.color}/>
        <Stat label="Modules" value={`${course.modulesCompleted} / ${course.modulesTotal}`}/>
        <Stat label="Lessons" value={`${course.lessonsCompleted} / ${course.lessonsTotal}`}/>
      </div>
      <a href={`#/my-classes/${c.id}/live`} className="btn btn-primary btn-md" style={{ background: c.color, textDecoration: "none" }}>
        <I.Camera size={14} color="#fff"/> Join Live Class
      </a>
    </div>
  );
}
function Stat({ label, value, color }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: color || "var(--ink)" }}>{value}</div>
    </div>
  );
}

/* ─────────── Modules view ─────────── */
function ModulesView({ course }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {course.modules.map((m) => <ModuleCard key={m.n} m={m} color={course.color}/>)}
    </div>
  );
}

function ModuleCard({ m, color }) {
  const isCurrent = m.current;
  const locked = m.locked;
  return (
    <div style={{
      background: "var(--paper)",
      borderRadius: 14,
      padding: "14px 18px",
      boxShadow: "var(--shadow-card)",
      border: isCurrent ? `1.5px solid ${color}50` : "1px solid var(--mist)",
      opacity: locked ? 0.65 : 1,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {/* Module number */}
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: locked ? "var(--bone)" : (m.state === "Completed" ? "#10B98114" : `${color}14`),
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          {locked ? (
            <I.Lock size={18} color="var(--silver)"/>
          ) : m.state === "Completed" ? (
            <I.Check size={20} color="#10B981"/>
          ) : (
            <span style={{ fontSize: 18, fontWeight: 700, color }}>{m.n}</span>
          )}
        </div>

        {/* Title + sub */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>Module {m.n}: {m.title}</div>
            {m.state === "Completed" && <span style={{ fontSize: 9.5, padding: "2px 6px", background: "#10B98114", color: "#10B981", borderRadius: 3, fontWeight: 700, letterSpacing: "0.03em" }}>COMPLETED</span>}
            {isCurrent && <span style={{ fontSize: 9.5, padding: "2px 6px", background: `${color}14`, color, borderRadius: 3, fontWeight: 700, letterSpacing: "0.03em" }}>IN PROGRESS</span>}
            {locked && <span style={{ fontSize: 9.5, padding: "2px 6px", background: "var(--bone)", color: "var(--silver)", borderRadius: 3, fontWeight: 700, letterSpacing: "0.03em" }}><I.Lock size={9} color="var(--silver)"/> LOCKED</span>}
          </div>
          <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>{m.sub}</div>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: 22, paddingRight: 6 }}>
          <Mini label="Lessons" value={`${m.lessons}/${m.lessonsTotal}`}/>
          <Mini label="Hours" value={m.hours}/>
          {m.score && <Mini label="Score" value={m.score} valueColor="#10B981"/>}
        </div>

        {/* CTA */}
        {locked ? (
          <div style={{ width: 110, fontSize: 10.5, color: "var(--silver)", textAlign: "right" }}>{m.unlockMsg}</div>
        ) : isCurrent ? (
          <button className="btn btn-primary btn-sm" style={{ width: 110, background: color }}>Continue</button>
        ) : (
          <button className="btn btn-secondary btn-sm" style={{ width: 110 }}>Review</button>
        )}
      </div>

      {/* Progress + current lesson */}
      {!locked && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, marginBottom: 4 }}>
            <span style={{ color: "var(--silver)", fontWeight: 600 }}>{m.progress}% complete</span>
            {isCurrent && <span style={{ color: "var(--stone)", fontWeight: 500 }}>{m.currentLesson}</span>}
          </div>
          <ProgressBar value={m.progress} color={m.state === "Completed" ? "#10B981" : color} height={5}/>
        </div>
      )}
    </div>
  );
}
function Mini({ label, value, valueColor = "var(--ink)" }) {
  return (
    <div style={{ textAlign: "right" }}>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: valueColor, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 10, color: "var(--silver)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

/* ─────────── Current Lesson view ─────────── */
function CurrentLessonView({ course }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Lesson hero */}
        <div style={{
          background: "var(--paper)", borderRadius: 14, padding: "18px 22px",
          boxShadow: "var(--shadow-card)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "var(--stone)", marginBottom: 6 }}>
            <a href="#" style={{ color: "var(--student)", textDecoration: "none", fontWeight: 600 }}>Module 4: Quadratic Functions</a>
            <I.ChevronDown size={11} color="var(--stone)" style={{ transform: "rotate(-90deg)" }}/>
            <span>Lesson 4.6</span>
          </div>
          <h1 className="t-h1" style={{ fontSize: 24, margin: "0 0 4px" }}>The Quadratic Formula</h1>
          <div style={{ fontSize: 13, color: "var(--stone)" }}>Solve any quadratic equation with one universal formula.</div>

          <div style={{ display: "flex", gap: 24, marginTop: 14, paddingTop: 14, borderTop: "1px dashed var(--mist)" }}>
            <Mini2 icon="Clock" color="#0EA5E9" label="Estimated time" value="35 min"/>
            <Mini2 icon="Trophy" color="#F59E0B" label="XP reward" value="120 XP"/>
            <Mini2 icon="Sparkle" color="#8B5CF6" label="Difficulty" value="Intermediate"/>
            <Mini2 icon="Document" color="#10B981" label="Resources" value="3 attached"/>
          </div>
        </div>

        {/* Lesson content (real Linear Functions content used as placeholder for "current lesson") */}
        <LessonBody/>

        {/* Practice problems */}
        <PracticeBlock/>

        {/* Nav */}
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary btn-md" style={{ flex: 1 }}><I.ChevronDown size={14} color="var(--ink)" style={{ transform: "rotate(90deg)" }}/> Previous: Lesson 4.5</button>
          <button className="btn btn-primary btn-md" style={{ flex: 1, background: course.color }}>Next: Lesson 4.7 <I.ChevronDown size={14} color="#fff" style={{ transform: "rotate(-90deg)" }}/></button>
        </div>
      </div>

      <LessonSidebar course={course}/>
    </div>
  );
}

function Mini2({ icon, color, label, value }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={14} color={color}/>
      </div>
      <div>
        <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{value}</div>
      </div>
    </div>
  );
}

function LessonBody() {
  return (
    <div style={{
      background: "var(--paper)", borderRadius: 14, padding: "20px 26px",
      boxShadow: "var(--shadow-card)",
      fontSize: 14, lineHeight: 1.7, color: "var(--slate)",
    }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "0 0 10px" }}>1. The Formula</h2>
      <p style={{ margin: "0 0 12px" }}>
        Any quadratic equation in standard form <Eq>ax² + bx + c = 0</Eq> can be solved using the
        <b> quadratic formula</b>:
      </p>

      {/* Big formula card */}
      <div style={{
        background: "linear-gradient(135deg, #8B5CF60D, #3B82F608)",
        border: "1px solid #8B5CF640",
        borderRadius: 12,
        padding: "20px 24px",
        margin: "8px 0 18px",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 26, fontFamily: "Georgia, serif", color: "var(--ink)", fontStyle: "italic" }}>
          x = <span style={{ display: "inline-block", verticalAlign: "middle", textAlign: "center", padding: "0 4px" }}>
            <span style={{ display: "block", borderBottom: "2px solid var(--ink)", padding: "0 8px 4px" }}>−b ± √(b² − 4ac)</span>
            <span style={{ display: "block", padding: "4px 8px 0" }}>2a</span>
          </span>
        </div>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "16px 0 10px" }}>2. The Discriminant</h2>
      <p style={{ margin: "0 0 12px" }}>
        The expression under the square root, <Eq>b² − 4ac</Eq>, is called the <b>discriminant</b>. It tells you how many real solutions a quadratic has:
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, margin: "10px 0 18px" }}>
        <DiscBox sym=">0" label="Two real solutions" color="#10B981"/>
        <DiscBox sym="=0" label="One real solution" color="#F59E0B"/>
        <DiscBox sym="<0" label="No real solutions" color="#EF4444"/>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "16px 0 10px" }}>3. Worked Example</h2>
      <p style={{ margin: "0 0 8px" }}>
        Solve <Eq>2x² + 5x − 3 = 0</Eq> using the quadratic formula.
      </p>
      <div style={{
        background: "var(--bone)",
        borderRadius: 10, padding: "14px 18px",
        margin: "8px 0",
        fontFamily: "Georgia, serif", fontSize: 14.5, lineHeight: 2,
        color: "var(--ink)",
      }}>
        <div><b>Identify:</b> a = 2, b = 5, c = −3</div>
        <div><b>Substitute:</b> &nbsp; x = (−5 ± √(25 − 4·2·(−3))) / (2·2)</div>
        <div><b>Simplify:</b> &nbsp; x = (−5 ± √49) / 4 &nbsp; = &nbsp; (−5 ± 7) / 4</div>
        <div><b>Solutions:</b> &nbsp; x = ½ &nbsp; or &nbsp; x = −3</div>
      </div>

      {/* Embedded graph */}
      <div style={{ margin: "14px 0 8px" }}>
        <div style={{ fontSize: 12, color: "var(--stone)", fontStyle: "italic", textAlign: "center", marginBottom: 6 }}>
          Graph of y = 2x² + 5x − 3 — the parabola crosses x = ½ and x = −3.
        </div>
        <ParabolaGraph/>
      </div>
    </div>
  );
}

function Eq({ children }) {
  return <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", background: "var(--bone)", padding: "1px 6px", borderRadius: 4, fontSize: "0.95em" }}>{children}</span>;
}

function DiscBox({ sym, label, color }) {
  return (
    <div style={{ background: `${color}10`, border: `1px solid ${color}40`, borderRadius: 10, padding: "10px 14px", textAlign: "center" }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontStyle: "italic", color, fontWeight: 700 }}>b² − 4ac {sym}</div>
      <div style={{ fontSize: 11.5, color: "var(--slate)", fontWeight: 500, marginTop: 2 }}>{label}</div>
    </div>
  );
}

/* ─────────── Parabola graph (real math) ─────────── */
function ParabolaGraph() {
  // y = 2x^2 + 5x - 3
  // Plot from x = -4.5 to x = 2 ; map to SVG
  const W = 480, H = 240;
  const padX = 40, padY = 20;
  const xMin = -4.5, xMax = 2;
  const yMin = -8, yMax = 6;
  const sx = (x) => padX + ((x - xMin) / (xMax - xMin)) * (W - 2 * padX);
  const sy = (y) => padY + ((yMax - y) / (yMax - yMin)) * (H - 2 * padY);

  const pts = [];
  for (let x = xMin; x <= xMax; x += 0.05) {
    const y = 2 * x * x + 5 * x - 3;
    pts.push(`${sx(x)},${sy(y)}`);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", maxWidth: 560, display: "block", margin: "0 auto", background: "var(--bone)", borderRadius: 10, border: "1px solid var(--mist)" }}>
      {/* Grid */}
      {[...Array(14)].map((_, i) => {
        const x = xMin + i;
        return <line key={"vx" + i} x1={sx(x)} y1={padY} x2={sx(x)} y2={H - padY} stroke="var(--mist)" strokeWidth={x === 0 ? 1.5 : 0.5}/>;
      })}
      {[...Array(15)].map((_, i) => {
        const y = yMin + i;
        return <line key={"hy" + i} x1={padX} y1={sy(y)} x2={W - padX} y2={sy(y)} stroke="var(--mist)" strokeWidth={y === 0 ? 1.5 : 0.5}/>;
      })}
      {/* Axes labels */}
      <text x={W - padX + 4} y={sy(0) + 4} fontSize="11" fill="var(--stone)">x</text>
      <text x={sx(0) + 4} y={padY + 6} fontSize="11" fill="var(--stone)">y</text>
      {/* Parabola */}
      <polyline points={pts.join(" ")} fill="none" stroke="#8B5CF6" strokeWidth="2.5" strokeLinejoin="round"/>
      {/* Roots */}
      <circle cx={sx(0.5)} cy={sy(0)} r="5" fill="#10B981" stroke="#fff" strokeWidth="2"/>
      <circle cx={sx(-3)} cy={sy(0)} r="5" fill="#10B981" stroke="#fff" strokeWidth="2"/>
      <text x={sx(0.5)} y={sy(0) + 18} fontSize="11" fill="#10B981" fontWeight="700" textAnchor="middle">x = ½</text>
      <text x={sx(-3)} y={sy(0) + 18} fontSize="11" fill="#10B981" fontWeight="700" textAnchor="middle">x = −3</text>
      {/* Vertex */}
      <circle cx={sx(-1.25)} cy={sy(2 * 1.25 * 1.25 + 5 * -1.25 - 3)} r="4" fill="#F59E0B" stroke="#fff" strokeWidth="2"/>
      <text x={sx(-1.25) + 8} y={sy(2 * 1.25 * 1.25 + 5 * -1.25 - 3) + 4} fontSize="10.5" fill="#F59E0B" fontWeight="600">vertex</text>
    </svg>
  );
}

/* ─────────── Practice block ─────────── */
function PracticeBlock() {
  const [done, setDone] = React.useState({});
  const problems = [
    { eq: "x² − 6x + 8 = 0", a: "x = 2 or x = 4", id: 1 },
    { eq: "3x² + 7x + 2 = 0", a: "x = −⅓ or x = −2", id: 2 },
    { eq: "x² + 4x + 5 = 0", a: "No real solutions", id: 3 },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 22px", boxShadow: "var(--shadow-card)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
        <I.Sparkle size={16} color="#F59E0B"/>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Practice Problems</h2>
        <span style={{ marginLeft: "auto", fontSize: 11.5, color: "var(--stone)", fontWeight: 500 }}>{Object.keys(done).length} of {problems.length} solved</span>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--stone)", marginBottom: 12 }}>Try these on your own. Tap "Show solution" when you're ready.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {problems.map((p) => (
          <div key={p.id} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: "var(--bone)", borderRadius: 10, padding: "10px 14px",
          }}>
            <span style={{ fontSize: 11, color: "var(--silver)", fontWeight: 700, width: 14 }}>{p.id}.</span>
            <span style={{ flex: 1, fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 14, color: "var(--ink)" }}>{p.eq}</span>
            {done[p.id] && <span style={{ fontSize: 12, fontFamily: "Georgia, serif", fontStyle: "italic", color: "#10B981", fontWeight: 600 }}>{p.a}</span>}
            <button onClick={() => setDone({ ...done, [p.id]: !done[p.id] })} className="btn btn-secondary btn-sm" style={{ height: 26, fontSize: 11, padding: "0 10px" }}>
              {done[p.id] ? "Hide" : "Show solution"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Lesson sidebar (resources, quick access) ─────────── */
function LessonSidebar({ course }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 20 }}>
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>In this Lesson</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Toc n="1" label="The Formula" active/>
          <Toc n="2" label="The Discriminant"/>
          <Toc n="3" label="Worked Example"/>
          <Toc n="4" label="Practice Problems"/>
          <Toc n="5" label="Knowledge Check"/>
        </div>
      </div>

      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Resources</div>
        <ResourceItem icon="Document" color="#EF4444" name="Quadratic Formula Notes.pdf" sub="2 pages"/>
        <ResourceItem icon="Camera" color="#0EA5E9" name="Khan Academy Video" sub="8:42"/>
        <ResourceItem icon="Calculator2" color="#8B5CF6" name="Interactive Discriminant" sub="Sandbox"/>
      </div>

      <div style={{
        background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.05))",
        border: "1px solid rgba(139,92,246,0.25)",
        borderRadius: 14, padding: "14px 16px",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Robot size={36}/>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--student-deep)" }}>Stuck on something?</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)" }}>Ask AI Tutor for help</div>
          </div>
        </div>
        <button className="btn btn-primary btn-sm" style={{ background: course.color }}>Open AI Tutor</button>
      </div>
    </div>
  );
}
function Toc({ n, label, active }) {
  return (
    <a href="#" style={{
      display: "flex", alignItems: "center", gap: 8,
      padding: "6px 8px", borderRadius: 6,
      background: active ? "rgba(139,92,246,0.08)" : "transparent",
      textDecoration: "none",
    }}>
      <span style={{ width: 18, height: 18, borderRadius: 4, background: active ? "var(--student)" : "var(--mist)", color: active ? "#fff" : "var(--stone)", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</span>
      <span style={{ fontSize: 12, color: active ? "var(--student-deep)" : "var(--slate)", fontWeight: active ? 600 : 500 }}>{label}</span>
    </a>
  );
}
function ResourceItem({ icon, color, name, sub }) {
  const Icon = I[icon];
  return (
    <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", textDecoration: "none", borderBottom: "1px dashed var(--mist)" }}>
      <div style={{ width: 28, height: 28, borderRadius: 7, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={13} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{sub}</div>
      </div>
      <I.Download size={13} color="var(--silver)"/>
    </a>
  );
}

/* ─────────── Right rail (Class Chat / Resources / People) ─────────── */
function ClassRightRail({ c, course, tab, setTab }) {
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, boxShadow: "var(--shadow-card)", overflow: "hidden", position: "sticky", top: 20, maxHeight: "calc(100vh - 120px)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", borderBottom: "1px solid var(--mist)", background: "var(--bone)" }}>
        {["chat", "resources", "people"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "10px 6px",
            background: tab === t ? "var(--paper)" : "transparent",
            border: "none", borderBottom: tab === t ? `2px solid ${c.color}` : "2px solid transparent",
            fontSize: 11.5, fontWeight: tab === t ? 700 : 500,
            color: tab === t ? "var(--ink)" : "var(--stone)", cursor: "pointer",
            textTransform: "capitalize",
          }}>{t === "chat" ? "Class Chat" : t}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {tab === "chat" && <ChatPanel/>}
        {tab === "resources" && <ResourcesPanel/>}
        {tab === "people" && <PeoplePanel/>}
      </div>
    </div>
  );
}

function ChatPanel() {
  const messages = [
    { who: "Mr. Wilson", role: "teacher", msg: "Reminder — Linear Functions quiz tonight at 11:59 PM. Office hours open until 4!", time: "10:42 AM", hue: 220 },
    { who: "Maya P.", msg: "Anyone else getting x = ½ for problem 2?", time: "11:14 AM", hue: 30 },
    { who: "Jordan T.", msg: "Yep — same. Discriminant works out to 49.", time: "11:15 AM", hue: 280 },
    { who: "Maya P.", msg: "Phew, thanks! 🎉", time: "11:16 AM", hue: 30 },
    { who: "Mr. Wilson", role: "teacher", msg: "Nice work on the discriminant. Watch the sign of c — it's negative here.", time: "11:18 AM", hue: 220 },
  ];
  return (
    <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
      {messages.map((m, i) => (
        <div key={i} style={{ display: "flex", gap: 8 }}>
          <StockPortrait name={m.who} hue={m.hue} size={28}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>
              <b style={{ color: m.role === "teacher" ? "#0EA5E9" : "var(--ink)" }}>{m.who}</b>
              {m.role === "teacher" && <span style={{ marginLeft: 4, fontSize: 9, padding: "1px 4px", background: "#0EA5E91A", color: "#0EA5E9", borderRadius: 3, fontWeight: 700 }}>TEACHER</span>}
              <span style={{ marginLeft: 6, fontSize: 10, color: "var(--silver)" }}>{m.time}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.45, marginTop: 2 }}>{m.msg}</div>
          </div>
        </div>
      ))}
      <div style={{ marginTop: 4, padding: "8px 10px", background: "var(--bone)", borderRadius: 8, display: "flex", gap: 6, alignItems: "center" }}>
        <input placeholder="Message your class…" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "var(--ink)" }}/>
        <button style={{ background: "var(--student)", border: "none", borderRadius: 6, padding: 6, cursor: "pointer", display: "flex" }}>
          <I.Send size={12} color="#fff"/>
        </button>
      </div>
    </div>
  );
}

function ResourcesPanel() {
  const items = [
    { name: "Module 4 Slides.pdf", sub: "Mr. Wilson · 2 days ago", icon: "Document", color: "#EF4444" },
    { name: "Quadratic Cheat Sheet.pdf", sub: "Mr. Wilson · 1 week ago", icon: "Document", color: "#EF4444" },
    { name: "Discriminant Walkthrough", sub: "Khan Academy · 8:42", icon: "Camera", color: "#0EA5E9" },
    { name: "Practice Problem Set 4.6", sub: "12 problems", icon: "Sparkle", color: "#F59E0B" },
    { name: "Graphing Calculator", sub: "Embedded tool", color: "#8B5CF6", icon: "Calculator2" },
  ];
  return (
    <div style={{ padding: "12px 14px" }}>
      {items.map((it, i) => <ResourceItem key={i} {...it}/>)}
    </div>
  );
}

function PeoplePanel() {
  const teacher = { name: "Mr. David Wilson", role: "Teacher", hue: 220, online: true };
  const peers = [
    { name: "Maya Patel", hue: 30, online: true },
    { name: "Jordan Tate", hue: 280, online: true },
    { name: "Rachel Kim", hue: 0, online: false },
    { name: "Liam Garcia", hue: 200, online: true },
    { name: "Aisha Brown", hue: 320, online: false },
    { name: "Connor Walsh", hue: 100, online: true },
    { name: "Priya Singh", hue: 350, online: false },
  ];
  return (
    <div style={{ padding: "12px 14px" }}>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>Teacher</div>
      <PersonRow {...teacher}/>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 14, marginBottom: 6 }}>Classmates ({peers.length + 1})</div>
      {peers.map((p, i) => <PersonRow key={i} {...p}/>)}
    </div>
  );
}
function PersonRow({ name, role, hue, online }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0" }}>
      <StockPortrait name={name} hue={hue} size={32} dot={online ? "online" : "offline"}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
        {role && <div style={{ fontSize: 10.5, color: "#0EA5E9", fontWeight: 600 }}>{role}</div>}
      </div>
      <button style={{ padding: 4, background: "transparent", border: "none", cursor: "pointer", display: "flex" }}><I.MessageCircle size={13} color="var(--stone)"/></button>
    </div>
  );
}

/* ─────────── Assignments / Grades view stubs ─────────── */
function AssignmentsView({ course }) {
  const items = [
    { name: "Linear Functions Quiz", sub: "Module 2 · Quiz", due: "Due Today, 11:59 PM", status: "Not started", statusColor: "#EF4444", points: "/ 100", state: "open" },
    { name: "Quadratic Functions Worksheet", sub: "Module 4 · Practice", due: "Due Friday, 11:59 PM", status: "In progress", statusColor: "#F59E0B", points: "/ 50", state: "open" },
    { name: "Module 3 Test", sub: "Systems of Equations", due: "Submitted Oct 18", status: "Graded", statusColor: "#10B981", points: "88 / 100", state: "done" },
    { name: "Module 2 Quiz", sub: "Linear Functions", due: "Submitted Oct 12", status: "Graded", statusColor: "#10B981", points: "85 / 100", state: "done" },
    { name: "Module 1 Diagnostic", sub: "Foundations Review", due: "Submitted Sep 10", status: "Graded", statusColor: "#10B981", points: "92 / 100", state: "done" },
  ];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 18px", boxShadow: "var(--shadow-card)" }}>
      <Tabs items={["All Assignments", "Due Soon (2)", "Submitted", "Graded"]} active={0}/>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {items.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 4px", borderBottom: i === items.length - 1 ? "none" : "1px solid var(--mist)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: `${a.statusColor}1F`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <I.Document size={15} color={a.statusColor}/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.name}</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{a.sub} · {a.due}</div>
            </div>
            <div style={{ width: 110, textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: a.statusColor }}>{a.points}</div>
              <div style={{ fontSize: 10.5, color: a.statusColor, fontWeight: 600 }}>{a.status}</div>
            </div>
            <button className={a.state === "open" ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"} style={{ height: 28, fontSize: 11.5, padding: "0 12px", background: a.state === "open" ? course.color : undefined }}>
              {a.state === "open" ? "Start" : "View"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GradesView({ course }) {
  const cats = [
    { name: "Tests", weight: 40, score: 89, color: "#8B5CF6" },
    { name: "Quizzes", weight: 25, score: 86, color: "#0EA5E9" },
    { name: "Homework", weight: 20, score: 95, color: "#10B981" },
    { name: "Participation", weight: 15, score: 92, color: "#F59E0B" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 14 }}>
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>Current Grade</div>
        <Donut size={140} value={89} color="#10B981">
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>89<span style={{ fontSize: 18 }}>%</span></div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#10B981" }}>B+</div>
          </div>
        </Donut>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>↑ 3% from last month</div>
      </div>
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "18px 20px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 12 }}>Grade Breakdown</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {cats.map((c) => (
            <div key={c.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{c.name} <span style={{ color: "var(--silver)", fontWeight: 500 }}>· {c.weight}% of grade</span></span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: c.color }}>{c.score}%</span>
              </div>
              <ProgressBar value={c.score} color={c.color} height={6}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

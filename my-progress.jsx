// LINKS — My Progress (Overview · Skills · Practice · Assessment & Records)
//
// Competency-first: 9-point goal attainment scale lives at the top of Overview.
// Letter-grade GPA is shown as a secondary "legacy framing" aside.

const PROGRESS_TABS = [
  { id: "overview",   label: "Overview",            icon: "ChartBar" },
  { id: "skills",     label: "Skills & Growth",     icon: "TrendUp" },
  { id: "practice",   label: "Practice Mode",       icon: "Sparkle" },
  { id: "records",    label: "Assessment & Records",icon: "Document" },
];

/* ─────────── Page wrapper ─────────── */

function MyProgressPage({ segments, navigate }) {
  const sub = segments[1] || "overview";

  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto" }}>
      <ProgressHeader segments={segments}/>
      <ProgressTabs sub={sub} segments={segments}/>
      {sub === "overview" && <OverviewView/>}
      {sub === "skills"   && <SkillsView/>}
      {sub === "practice" && <PracticeView/>}
      {sub === "records"  && <RecordsView/>}
    </div>
  );
}

/* ─────────── Header + tabs ─────────── */

function ProgressHeader({ segments }) {
  return (
    <div style={{ padding: "20px 0 16px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div>
          <div className="t-eyebrow" style={{ fontSize: 11, color: "var(--silver)", marginBottom: 6 }}>Trimester 2 · 10th Grade</div>
          <h1 className="t-h1" style={{ margin: 0, fontSize: 30 }}>My Progress</h1>
          <div style={{ fontSize: 14, color: "var(--stone)", marginTop: 6, maxWidth: 620, lineHeight: 1.55 }}>
            How you're growing across skills and competencies — what you've shown,
            what you're working on, and where you're headed next.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button className="btn">
            <I.Download size={13} color="var(--stone)"/> Export records
          </button>
          <button className="btn btn-primary">
            <I.Sparkle size={13} color="#fff"/> Reflect with AI
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressTabs({ sub, segments }) {
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 22, borderBottom: "1px solid var(--mist)", overflowX: "auto" }}>
      {PROGRESS_TABS.map((t) => {
        const isActive = sub === t.id;
        const IconComp = I[t.icon];
        return (
          <a
            key={t.id}
            href={"#/my-progress" + (t.id === "overview" ? "" : "/" + t.id)}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 16px", textDecoration: "none",
              color: isActive ? "var(--student-deep)" : "var(--stone)",
              fontSize: 13, fontWeight: isActive ? 600 : 500,
              borderBottom: isActive ? "2px solid var(--student)" : "2px solid transparent",
              marginBottom: -1, whiteSpace: "nowrap",
            }}
          >
            <IconComp size={14} color={isActive ? "var(--student)" : "var(--silver)"}/>
            {t.label}
          </a>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   OVERVIEW VIEW — competency-first dashboard
   ════════════════════════════════════════════════════════════════════════ */

function OverviewView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
        <MasteryHero/>
        <ClassMasteryGrid/>
        <CompetencyTrajectory/>
        <RecentEvidence/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <AICoachCard/>
        <NextStepsCard/>
        <LegacyGradesCard/>
      </div>
    </div>
  );
}

/* — Hero: 9-point Goal Attainment scale, the canonical CES mastery view — */

const SCALE_9 = [
  { n: 1, label: "Beginning",        band: "novice" },
  { n: 2, label: "Beginning+",       band: "novice" },
  { n: 3, label: "Approaching",      band: "novice" },
  { n: 4, label: "Approaching+",     band: "developing" },
  { n: 5, label: "Developing",       band: "developing" },
  { n: 6, label: "Developing+",      band: "developing" },
  { n: 7, label: "Proficient",       band: "proficient" },
  { n: 8, label: "Proficient+",      band: "advanced" },
  { n: 9, label: "Advanced",         band: "advanced" },
];

const BAND_COLORS = {
  novice:     { fill: "#FCE6D2", ink: "#B65A1A", solid: "#E07A2D" },
  developing: { fill: "#FEF3C7", ink: "#92400E", solid: "#D97706" },
  proficient: { fill: "#DCF3E5", ink: "#1F7A47", solid: "#2E9B62" },
  advanced:   { fill: "#EDE9FE", ink: "#5B21B6", solid: "#6D28D9" },
};

function MasteryHero() {
  // student average across all current competencies
  const avg = 6.2;
  const trend = "+0.8";
  const target = 7.0;

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        padding: "20px 24px 16px",
        background: "linear-gradient(135deg, #F5F3FF 0%, #FAFAFD 60%)",
        borderBottom: "1px solid var(--mist)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <I.Target size={15} color="var(--student)"/>
          <div className="t-eyebrow" style={{ fontSize: 10.5, color: "var(--student-deep)" }}>9-POINT GOAL ATTAINMENT SCALE</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="t-num" style={{
                fontSize: 56, fontWeight: 700, color: "var(--ink)",
                fontFamily: "var(--font-display)", lineHeight: 1, letterSpacing: "-0.02em",
              }}>{avg}</span>
              <span style={{ fontSize: 18, color: "var(--silver)", fontWeight: 500 }}>/ 9</span>
            </div>
            <div style={{ fontSize: 13, color: "var(--slate)", fontWeight: 600, marginTop: 4 }}>
              Developing<span style={{ color: "var(--success)", marginLeft: 8, fontWeight: 700 }}>↑ {trend} this trimester</span>
            </div>
          </div>
          <div>
            <ScaleBar value={avg} target={target}/>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10.5, color: "var(--stone)", fontWeight: 600 }}>
              <span>Beginning</span>
              <span>Developing</span>
              <span>Proficient</span>
              <span>Advanced</span>
            </div>
          </div>
          <div style={{
            padding: "10px 14px", borderRadius: 12, background: "var(--paper)",
            border: "1px solid var(--mist)", textAlign: "center", minWidth: 120,
          }}>
            <div className="t-eyebrow" style={{ fontSize: 9.5, color: "var(--silver)", marginBottom: 2 }}>TRIMESTER GOAL</div>
            <div className="t-num" style={{ fontSize: 22, fontWeight: 700, color: "var(--student-deep)", fontFamily: "var(--font-display)" }}>{target}</div>
            <div style={{ fontSize: 10.5, color: "var(--stone)", fontWeight: 500 }}>Proficient</div>
          </div>
        </div>
      </div>

      {/* Counts row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { count: 8, label: "competencies tracked", color: "var(--ink)" },
          { count: 5, label: "at proficient or above", color: BAND_COLORS.proficient.solid },
          { count: 3, label: "developing", color: BAND_COLORS.developing.solid },
          { count: 0, label: "needs attention", color: BAND_COLORS.novice.solid },
        ].map((c, i) => (
          <div key={i} style={{
            padding: "14px 18px",
            borderRight: i < 3 ? "1px solid var(--mist)" : "none",
            display: "flex", flexDirection: "column", gap: 2,
          }}>
            <span className="t-num" style={{ fontSize: 22, fontWeight: 700, color: c.color, fontFamily: "var(--font-display)" }}>{c.count}</span>
            <span style={{ fontSize: 11.5, color: "var(--stone)", fontWeight: 500 }}>{c.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScaleBar({ value, target }) {
  // 9 ticks, gradient fill across bands
  return (
    <div style={{ position: "relative", height: 38 }}>
      <div style={{ display: "flex", gap: 3, height: 22 }}>
        {SCALE_9.map((s) => {
          const reached = s.n <= Math.floor(value);
          const partial = s.n === Math.ceil(value) && !reached;
          const c = BAND_COLORS[s.band];
          return (
            <div key={s.n} style={{
              flex: 1,
              borderRadius: 4,
              background: reached ? c.solid : (partial ? `linear-gradient(90deg, ${c.solid} ${(value % 1) * 100}%, ${c.fill} ${(value % 1) * 100}%)` : c.fill),
              position: "relative",
              boxShadow: reached ? `inset 0 1px 0 rgba(255,255,255,0.4)` : "none",
            }}>
              <span style={{
                position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)",
                fontSize: 10, fontWeight: 700, color: reached ? c.solid : "var(--silver)",
                fontFamily: "var(--font-ui)",
              }}>{s.n}</span>
            </div>
          );
        })}
      </div>
      {/* Goal marker */}
      <div style={{
        position: "absolute", left: `${((target - 0.5) / 9) * 100}%`,
        top: 14, height: 36, width: 2, background: "var(--ink)",
        borderRadius: 2,
      }}/>
      <div style={{
        position: "absolute", left: `${((target - 0.5) / 9) * 100}%`,
        bottom: -2, transform: "translateX(-50%)",
        fontSize: 9.5, fontWeight: 700, color: "var(--ink)",
        background: "var(--paper)", padding: "1px 5px", borderRadius: 3,
        border: "1px solid var(--mist)", whiteSpace: "nowrap",
      }}>GOAL</div>
    </div>
  );
}

/* — Class mastery grid — */

const CLASS_MASTERY = [
  { id: "algebra2",  name: "Algebra II",      teacher: "Mr. Wilson",   color: "#8B5CF6", abbr: "x²", score: 7.2, prev: 6.1, comps: 4, ptd: 3, dev: 1, nov: 0 },
  { id: "english10", name: "English 10",      teacher: "Mrs. Lee",     color: "#0EA5E9", abbr: "✎",  score: 5.4, prev: 4.8, comps: 5, ptd: 1, dev: 4, nov: 0 },
  { id: "biology",   name: "Biology",         teacher: "Mr. Evans",    color: "#10B981", abbr: "🧬", score: 6.8, prev: 6.2, comps: 4, ptd: 2, dev: 2, nov: 0 },
  { id: "ushistory", name: "US History",      teacher: "Mr. Rodriguez",color: "#F59E0B", abbr: "🏛", score: 6.0, prev: 5.7, comps: 4, ptd: 2, dev: 2, nov: 0 },
  { id: "spanish",   name: "Spanish II",      teacher: "Sra. Martinez",color: "#EF4444", abbr: "Ñ",  score: 6.5, prev: 5.9, comps: 3, ptd: 1, dev: 2, nov: 0 },
];

function ClassMasteryGrid() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.Classes size={16} color="var(--student)"/>
          <div className="t-h2" style={{ fontSize: 15 }}>Mastery by class</div>
        </div>
        <div style={{ display: "flex", gap: 4, padding: 3, background: "var(--bone)", borderRadius: 7 }}>
          <button style={{ padding: "4px 10px", background: "var(--paper)", border: "none", borderRadius: 5, fontSize: 11.5, fontWeight: 600, color: "var(--ink)", boxShadow: "0 1px 2px rgba(0,0,0,0.06)", cursor: "pointer" }}>This trimester</button>
          <button style={{ padding: "4px 10px", background: "transparent", border: "none", borderRadius: 5, fontSize: 11.5, color: "var(--stone)", fontWeight: 500, cursor: "pointer" }}>Year</button>
        </div>
      </div>
      <div>
        {CLASS_MASTERY.map((c, i) => (
          <ClassMasteryRow key={c.id} c={c} last={i === CLASS_MASTERY.length - 1}/>
        ))}
      </div>
    </div>
  );
}

function ClassMasteryRow({ c, last }) {
  const delta = (c.score - c.prev).toFixed(1);
  const band = c.score >= 7 ? "proficient" : c.score >= 4 ? "developing" : "novice";
  const bc = BAND_COLORS[band];

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "200px 1fr 180px 90px",
      alignItems: "center", gap: 16,
      padding: "14px 20px",
      borderBottom: last ? "none" : "1px solid var(--mist)",
    }}>
      {/* Class label */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8,
          background: `${c.color}1F`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: c.color }}>{c.abbr}</span>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{c.name}</div>
          <div className="t-caption" style={{ fontSize: 11 }}>{c.teacher}</div>
        </div>
      </div>

      {/* Mini scale */}
      <div>
        <div style={{ display: "flex", gap: 2, height: 14 }}>
          {SCALE_9.map((s) => {
            const filled = s.n <= Math.floor(c.score);
            const partial = s.n === Math.ceil(c.score) && !filled;
            const sc = BAND_COLORS[s.band];
            return (
              <div key={s.n} style={{
                flex: 1, borderRadius: 3,
                background: filled ? sc.solid : (partial ? `linear-gradient(90deg, ${sc.solid} ${(c.score % 1) * 100}%, ${sc.fill} ${(c.score % 1) * 100}%)` : sc.fill),
              }}/>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 8, fontSize: 11 }}>
          <span style={{ color: BAND_COLORS.proficient.solid, fontWeight: 600 }}>{c.ptd} proficient</span>
          <span style={{ color: "var(--silver)" }}>·</span>
          <span style={{ color: BAND_COLORS.developing.solid, fontWeight: 600 }}>{c.dev} developing</span>
          {c.nov > 0 && <>
            <span style={{ color: "var(--silver)" }}>·</span>
            <span style={{ color: BAND_COLORS.novice.solid, fontWeight: 600 }}>{c.nov} attention</span>
          </>}
        </div>
      </div>

      {/* Score + band */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
          <span className="t-num" style={{ fontSize: 22, fontWeight: 700, color: bc.solid, fontFamily: "var(--font-display)", lineHeight: 1 }}>{c.score.toFixed(1)}</span>
          <span style={{ fontSize: 11, color: "var(--silver)" }}>/ 9</span>
          <span style={{ marginLeft: 8, fontSize: 11, color: "var(--success)", fontWeight: 700 }}>+{delta}</span>
        </div>
        <span className="pill" style={{ marginTop: 4, background: bc.fill, color: bc.ink, border: "none", fontSize: 10.5 }}>
          {band === "proficient" ? "Proficient" : band === "developing" ? "Developing" : "Beginning"}
        </span>
      </div>

      <div style={{ textAlign: "right" }}>
        <a href={`#/my-classes/${c.id}`} style={{ fontSize: 12, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
          View →
        </a>
      </div>
    </div>
  );
}

/* — Competency trajectory (multi-line chart over the year) — */

function CompetencyTrajectory() {
  const series = [
    { name: "Algebra II", color: "#8B5CF6", points: [4.8, 5.2, 5.6, 6.1, 6.6, 7.2] },
    { name: "Biology",    color: "#10B981", points: [5.4, 5.8, 6.0, 6.2, 6.5, 6.8] },
    { name: "English 10", color: "#0EA5E9", points: [4.2, 4.4, 4.6, 4.8, 5.1, 5.4] },
    { name: "US History", color: "#F59E0B", points: [5.0, 5.2, 5.4, 5.7, 5.8, 6.0] },
    { name: "Spanish II", color: "#EF4444", points: [5.6, 5.7, 5.9, 6.1, 6.3, 6.5] },
  ];
  const labels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  const w = 720, h = 240, padL = 32, padR = 12, padT = 16, padB = 28;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const yMin = 1, yMax = 9;

  return (
    <div className="card" style={{ padding: "16px 20px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.TrendUp size={16} color="var(--student)"/>
          <div className="t-h2" style={{ fontSize: 15 }}>Trajectory across competencies</div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {series.map((s) => (
            <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11.5, color: "var(--slate)" }}>
              <span style={{ width: 14, height: 2.5, background: s.color, borderRadius: 2 }}/>
              {s.name}
            </div>
          ))}
        </div>
      </div>
      <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
        {[1, 3, 5, 7, 9].map((g) => {
          const y = padT + (1 - (g - yMin) / (yMax - yMin)) * innerH;
          return (
            <g key={g}>
              <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--mist)" strokeDasharray={g === 7 ? "0" : "2 5"}/>
              <text x={padL - 8} y={y + 3} fontSize="10" fill="var(--silver)" textAnchor="end" fontFamily="var(--font-ui)">{g}</text>
            </g>
          );
        })}
        {/* Proficient band shading */}
        <rect x={padL} y={padT + (1 - (9 - yMin) / (yMax - yMin)) * innerH}
              width={innerW} height={(2 / (yMax - yMin)) * innerH}
              fill="#EDE9FE" opacity="0.5"/>
        <text x={w - padR - 6} y={padT + (1 - (8 - yMin) / (yMax - yMin)) * innerH + 3} fontSize="9.5" fill="var(--student-deep)" textAnchor="end" fontFamily="var(--font-ui)" fontWeight="600">PROFICIENT BAND</text>

        {series.map((s) => {
          const xs = s.points.map((_, i) => padL + (i / (s.points.length - 1)) * innerW);
          const ys = s.points.map((v) => padT + (1 - (v - yMin) / (yMax - yMin)) * innerH);
          const path = s.points.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${ys[i]}`).join(" ");
          return (
            <g key={s.name}>
              <path d={path} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              {s.points.map((_, i) => (
                <circle key={i} cx={xs[i]} cy={ys[i]} r={i === s.points.length - 1 ? "4" : "2.5"}
                        fill={s.color} stroke="var(--paper)" strokeWidth={i === s.points.length - 1 ? "2" : "1"}/>
              ))}
            </g>
          );
        })}
        {labels.map((l, i) => (
          <text key={l} x={padL + (i / (labels.length - 1)) * innerW} y={h - 6}
                fontSize="11" fill="var(--stone)" textAnchor="middle" fontFamily="var(--font-ui)">{l}</text>
        ))}
      </svg>
    </div>
  );
}

/* — Recent evidence — links to actual work that moved the needle — */

const EVIDENCE = [
  { skill: "Algebraic Reasoning",   change: "+0.6", from: 6.1, to: 6.7, kind: "Quiz", title: "Quadratic Functions Quiz", classColor: "#8B5CF6", className: "Algebra II", date: "2 days ago", note: "Strong on vertex form; revisit factoring." },
  { skill: "Scientific Inquiry",    change: "+0.4", from: 6.4, to: 6.8, kind: "Lab",  title: "Cell Respiration Lab Report", classColor: "#10B981", className: "Biology", date: "4 days ago", note: "Methods section is clear; conclusion needs more evidence ties." },
  { skill: "Writing & Composition", change: "+0.2", from: 5.2, to: 5.4, kind: "Draft",title: "Argument Essay Draft 2", classColor: "#0EA5E9", className: "English 10", date: "1 week ago", note: "Thesis sharpened — keep tightening transitions." },
];

function RecentEvidence() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.Star size={16} color="var(--student)"/>
          <div className="t-h2" style={{ fontSize: 15 }}>Recent evidence of growth</div>
        </div>
        <a href="#" style={{ fontSize: 12, color: "var(--student-deep)", textDecoration: "none", fontWeight: 600 }}>View all evidence →</a>
      </div>
      <div>
        {EVIDENCE.map((e, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto",
            gap: 16, alignItems: "center",
            padding: "14px 20px",
            borderBottom: i < EVIDENCE.length - 1 ? "1px solid var(--mist)" : "none",
          }}>
            <div style={{
              width: 56, padding: "6px 4px", borderRadius: 8,
              background: "var(--success-soft)", textAlign: "center",
            }}>
              <div className="t-num" style={{ fontSize: 14, fontWeight: 700, color: "var(--success)", lineHeight: 1 }}>{e.change}</div>
              <div style={{ fontSize: 9, color: "var(--success)", fontWeight: 600, marginTop: 2 }}>on 9-pt</div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{e.skill}</span>
                <span style={{ fontSize: 10.5, color: "var(--stone)" }}>moved {e.from} → {e.to}</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--slate)", marginBottom: 4 }}>
                <span style={{ color: e.classColor, fontWeight: 600 }}>{e.className}</span>
                <span style={{ color: "var(--silver)", margin: "0 6px" }}>·</span>
                <span style={{ fontWeight: 500 }}>{e.kind}: {e.title}</span>
                <span style={{ color: "var(--silver)", margin: "0 6px" }}>·</span>
                <span style={{ color: "var(--stone)" }}>{e.date}</span>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.45, fontStyle: "italic" }}>
                "{e.note}"
              </div>
            </div>
            <a href="#" className="btn btn-sm btn-ghost" style={{ color: "var(--student-deep)", fontWeight: 600 }}>
              Open <I.ChevronRight size={11} color="var(--student-deep)"/>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

/* — Right rail cards — */

function AICoachCard() {
  return (
    <div className="card" style={{
      padding: "16px 18px",
      background: "linear-gradient(160deg, #F5F3FF, #FAFAFD 70%)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <I.Sparkle size={14} color="var(--student)"/>
        <div className="t-h2" style={{ fontSize: 14 }}>AI Coach noticed</div>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55, marginBottom: 12 }}>
        Your <b style={{ color: "var(--ink)" }}>Algebraic Reasoning</b> jumped from Developing to nearly Proficient
        in two weeks — the vertex-form practice is working. Consider applying the same study pattern to
        <b style={{ color: "var(--ink)" }}> Writing & Composition</b>, where you're closest to a band shift.
      </div>
      <button className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
        <I.Sparkle size={12} color="#fff"/> Open coaching session
      </button>
    </div>
  );
}

function NextStepsCard() {
  const steps = [
    { skill: "Writing & Composition", action: "Submit Draft 3 of argument essay", due: "Fri", classColor: "#0EA5E9" },
    { skill: "Scientific Inquiry",    action: "Revise lab conclusion section",    due: "Mon", classColor: "#10B981" },
    { skill: "Quantitative Reasoning",action: "Practice 10 factoring problems",   due: "Wed", classColor: "#8B5CF6" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "14px 18px 10px", display: "flex", alignItems: "center", gap: 8 }}>
        <I.ListChecks size={14} color="var(--student)"/>
        <div className="t-h2" style={{ fontSize: 14 }}>Next steps</div>
      </div>
      <div style={{ padding: "0 18px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            padding: "10px 12px",
            background: "var(--surface-quiet)",
            borderRadius: 10,
          }}>
            <div style={{ width: 4, alignSelf: "stretch", borderRadius: 2, background: s.classColor }}/>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600, marginBottom: 2 }}>{s.skill}</div>
              <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: 500, lineHeight: 1.4 }}>{s.action}</div>
            </div>
            <span className="pill" style={{ fontSize: 10, background: "var(--paper)", border: "1px solid var(--mist)", color: "var(--stone)", flexShrink: 0 }}>{s.due}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegacyGradesCard() {
  return (
    <div className="card" style={{ padding: "14px 18px", background: "var(--surface-quiet)", boxShadow: "none", border: "1px dashed var(--mist)" }}>
      <div className="t-eyebrow" style={{ fontSize: 9.5, color: "var(--silver)", marginBottom: 8 }}>FOR PARENTS / TRANSCRIPT VIEW</div>
      <div className="t-h2" style={{ fontSize: 13, marginBottom: 6 }}>Letter-grade equivalent</div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "center" }}>
        <div className="t-num" style={{ fontSize: 30, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)", lineHeight: 1 }}>3.72</div>
        <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.4 }}>
          GPA <span style={{ color: "var(--success)", fontWeight: 700 }}>↑ 0.15</span><br/>
          <span style={{ fontSize: 10.5 }}>Mapped from 9-point mastery — not the primary view in CES.</span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   SKILLS VIEW — competency-level deep dive
   ════════════════════════════════════════════════════════════════════════ */

const SKILLS = [
  { id: "writing",   name: "Writing & Composition", domain: "Literacy",      score: 5.4, prev: 4.8, evidence: 12, classes: ["English 10", "US History"], status: "developing" },
  { id: "algebra",   name: "Algebraic Reasoning",   domain: "Quantitative",  score: 7.2, prev: 6.1, evidence: 18, classes: ["Algebra II"],                status: "proficient" },
  { id: "scientific",name: "Scientific Inquiry",    domain: "Inquiry",       score: 6.8, prev: 6.2, evidence: 9,  classes: ["Biology"],                   status: "developing" },
  { id: "evidence",  name: "Evidence-Based Argument",domain: "Literacy",     score: 6.0, prev: 5.4, evidence: 7,  classes: ["English 10", "US History"],   status: "developing" },
  { id: "lang",      name: "Language Production",   domain: "Communication", score: 6.5, prev: 5.9, evidence: 11, classes: ["Spanish II"],                status: "developing" },
  { id: "historical",name: "Historical Thinking",   domain: "Inquiry",       score: 6.0, prev: 5.7, evidence: 8,  classes: ["US History"],                status: "developing" },
  { id: "quant",     name: "Quantitative Modeling", domain: "Quantitative",  score: 5.8, prev: 5.5, evidence: 6,  classes: ["Algebra II", "Biology"],     status: "developing" },
  { id: "collab",    name: "Collaboration",         domain: "Habits of Mind",score: 7.5, prev: 7.2, evidence: 14, classes: ["All classes"],               status: "proficient" },
];

function SkillsView() {
  const [active, setActive] = React.useState("writing");
  const skill = SKILLS.find((s) => s.id === active);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }}>
      <SkillsSidebar active={active} onSelect={setActive}/>
      <SkillsDetail skill={skill}/>
    </div>
  );
}

function SkillsSidebar({ active, onSelect }) {
  const domains = [...new Set(SKILLS.map((s) => s.domain))];

  return (
    <div className="card" style={{ padding: 0, height: "fit-content", position: "sticky", top: 20 }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="t-h2" style={{ fontSize: 14 }}>Competencies</div>
        <span className="t-caption" style={{ fontSize: 10.5 }}>{SKILLS.length} tracked</span>
      </div>
      <div style={{ maxHeight: 720, overflow: "auto" }}>
        {domains.map((d) => (
          <div key={d}>
            <div style={{
              padding: "10px 18px 4px", fontSize: 10,
              color: "var(--silver)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            }}>{d}</div>
            {SKILLS.filter((s) => s.domain === d).map((s) => {
              const bc = BAND_COLORS[s.status];
              const isActive = s.id === active;
              return (
                <button key={s.id} onClick={() => onSelect(s.id)} className="btn-bare"
                  style={{
                    width: "100%", textAlign: "left",
                    padding: "10px 18px",
                    background: isActive ? "var(--student-soft)" : "transparent",
                    border: "none", cursor: "pointer",
                    borderLeft: isActive ? "3px solid var(--student)" : "3px solid transparent",
                    display: "flex", alignItems: "center", gap: 10,
                  }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, color: "var(--ink)", fontWeight: isActive ? 600 : 500, lineHeight: 1.3 }}>{s.name}</div>
                    <div style={{ display: "flex", gap: 1.5, marginTop: 5, height: 5 }}>
                      {SCALE_9.map((t) => {
                        const filled = t.n <= Math.floor(s.score);
                        const partial = t.n === Math.ceil(s.score) && !filled;
                        const tc = BAND_COLORS[t.band];
                        return <div key={t.n} style={{
                          flex: 1, borderRadius: 1.5,
                          background: filled ? tc.solid : (partial ? `linear-gradient(90deg, ${tc.solid} ${(s.score % 1) * 100}%, ${tc.fill} ${(s.score % 1) * 100}%)` : tc.fill),
                        }}/>;
                      })}
                    </div>
                  </div>
                  <span className="t-num" style={{ fontSize: 13, fontWeight: 700, color: bc.solid, fontFamily: "var(--font-display)", flexShrink: 0 }}>{s.score.toFixed(1)}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsDetail({ skill }) {
  if (!skill) return null;
  const bc = BAND_COLORS[skill.status];
  const targetScore = 7;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
      {/* Skill hero */}
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px 18px", background: `linear-gradient(135deg, ${bc.fill}, var(--paper) 60%)` }}>
          <div className="t-eyebrow" style={{ fontSize: 10, color: bc.ink, marginBottom: 6 }}>{skill.domain}</div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
            <div>
              <h2 className="t-h1" style={{ fontSize: 24, margin: 0 }}>{skill.name}</h2>
              <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 4 }}>
                Tracked across <b style={{ color: "var(--ink)" }}>{skill.classes.join(", ")}</b>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="t-num" style={{ fontSize: 44, fontWeight: 700, color: bc.solid, fontFamily: "var(--font-display)", lineHeight: 1 }}>{skill.score.toFixed(1)}</span>
                <span style={{ fontSize: 16, color: "var(--silver)" }}>/ 9</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--success)", fontWeight: 700, marginTop: 4 }}>
                ↑ {(skill.score - skill.prev).toFixed(1)} since last trimester
              </div>
            </div>
          </div>

          {/* Big scale */}
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "flex", gap: 4, height: 28 }}>
              {SCALE_9.map((s) => {
                const filled = s.n <= Math.floor(skill.score);
                const partial = s.n === Math.ceil(skill.score) && !filled;
                const sc = BAND_COLORS[s.band];
                const isTarget = s.n === targetScore;
                return (
                  <div key={s.n} style={{
                    flex: 1, borderRadius: 5,
                    background: filled ? sc.solid : (partial ? `linear-gradient(90deg, ${sc.solid} ${(skill.score % 1) * 100}%, ${sc.fill} ${(skill.score % 1) * 100}%)` : sc.fill),
                    position: "relative",
                    outline: isTarget ? "2px dashed var(--ink)" : "none",
                    outlineOffset: 2,
                  }}>
                    <span style={{
                      position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
                      fontSize: 11, fontWeight: 700,
                      color: filled ? "#fff" : sc.ink, fontFamily: "var(--font-ui)",
                    }}>{s.n}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>
              <span>Beginning</span>
              <span>Developing</span>
              <span style={{ color: BAND_COLORS.proficient.ink }}>Proficient (target)</span>
              <span>Advanced</span>
            </div>
          </div>
        </div>
      </div>

      {/* What this means + What to work on */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 8 }}>WHAT YOU'RE SHOWING NOW</div>
          <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
            You can build a clear thesis and support it with evidence.
          </div>
          <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12.5, color: "var(--slate)", lineHeight: 1.7 }}>
            <li>Argument has a defensible position.</li>
            <li>Evidence is mostly relevant and integrated.</li>
            <li>Organization is logical at the paragraph level.</li>
          </ul>
        </div>
        <div className="card" style={{ padding: "16px 20px" }}>
          <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 8, color: BAND_COLORS.proficient.ink }}>NEXT BAND: PROFICIENT</div>
          <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600, marginBottom: 8 }}>
            To move to Proficient, show:
          </div>
          <ul style={{ margin: 0, padding: "0 0 0 18px", fontSize: 12.5, color: "var(--slate)", lineHeight: 1.7 }}>
            <li>Counter-claims acknowledged and addressed.</li>
            <li>Tighter transitions across the whole essay.</li>
            <li>Voice and tone consistent throughout.</li>
          </ul>
        </div>
      </div>

      {/* Trajectory + evidence */}
      <div className="card" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <div className="t-h2" style={{ fontSize: 14 }}>Growth trajectory</div>
          <span className="t-caption" style={{ fontSize: 11 }}>Last 6 months</span>
        </div>
        <SkillTrajectory score={skill.score} prev={skill.prev}/>
      </div>

      {/* Evidence list */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="t-h2" style={{ fontSize: 14 }}>Evidence ({skill.evidence})</div>
          <button className="btn btn-sm btn-ghost"><I.Filter size={11} color="var(--stone)"/> All types</button>
        </div>
        {[
          { kind: "Essay", title: "Argument Essay — Draft 2", className: "English 10", color: "#0EA5E9", date: "Feb 26", score: 5.4 },
          { kind: "Discussion", title: "Socratic seminar — The Crucible", className: "English 10", color: "#0EA5E9", date: "Feb 18", score: 5.2 },
          { kind: "DBQ",    title: "Industrial Revolution DBQ", className: "US History", color: "#F59E0B", date: "Feb 12", score: 5.0 },
          { kind: "Reflection", title: "Self-assessment — January", className: "English 10", color: "#0EA5E9", date: "Jan 31", score: 4.8 },
        ].map((e, i, arr) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "auto 1fr auto auto",
            alignItems: "center", gap: 14,
            padding: "12px 20px",
            borderBottom: i < arr.length - 1 ? "1px solid var(--mist)" : "none",
          }}>
            <span className="pill" style={{ background: `${e.color}1A`, color: e.color, border: "none" }}>{e.kind}</span>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{e.title}</div>
              <div className="t-caption" style={{ fontSize: 11 }}>{e.className} · {e.date}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span className="t-num" style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{e.score.toFixed(1)}</span>
              <span style={{ fontSize: 10, color: "var(--silver)", marginLeft: 4 }}>/ 9</span>
            </div>
            <a href="#" className="btn btn-sm btn-ghost" style={{ color: "var(--student-deep)", fontWeight: 600 }}>Open</a>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillTrajectory({ score, prev }) {
  // synthesized 12-week trajectory ending at `score`
  const points = [prev - 0.4, prev - 0.2, prev, prev + 0.1, prev + 0.2, prev + 0.3, prev + 0.4, prev + 0.45, prev + 0.5, score - 0.2, score - 0.1, score];
  const labels = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "Now"];
  const w = 700, h = 200, padL = 32, padR = 12, padT = 16, padB = 28;
  const innerW = w - padL - padR, innerH = h - padT - padB;
  const yMin = 1, yMax = 9;
  const xs = points.map((_, i) => padL + (i / (points.length - 1)) * innerW);
  const ys = points.map((v) => padT + (1 - (v - yMin) / (yMax - yMin)) * innerH);
  const path = points.map((_, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${ys[i]}`).join(" ");
  const area = `${path} L ${xs[xs.length - 1]} ${padT + innerH} L ${xs[0]} ${padT + innerH} Z`;

  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`}>
      {[1, 3, 5, 7, 9].map((g) => {
        const y = padT + (1 - (g - yMin) / (yMax - yMin)) * innerH;
        return (
          <g key={g}>
            <line x1={padL} y1={y} x2={w - padR} y2={y} stroke="var(--mist)" strokeDasharray="2 5"/>
            <text x={padL - 8} y={y + 3} fontSize="10" fill="var(--silver)" textAnchor="end">{g}</text>
          </g>
        );
      })}
      {/* Proficient threshold */}
      <line x1={padL} x2={w - padR}
            y1={padT + (1 - (7 - yMin) / (yMax - yMin)) * innerH}
            y2={padT + (1 - (7 - yMin) / (yMax - yMin)) * innerH}
            stroke={BAND_COLORS.proficient.solid} strokeWidth="1.5" strokeDasharray="3 4"/>
      <text x={w - padR - 4} y={padT + (1 - (7 - yMin) / (yMax - yMin)) * innerH - 4}
            fontSize="10" fontWeight="700" fill={BAND_COLORS.proficient.solid} textAnchor="end">Proficient threshold</text>

      <path d={area} fill="var(--student)" opacity="0.10"/>
      <path d={path} fill="none" stroke="var(--student)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
      {points.map((_, i) => (
        <circle key={i} cx={xs[i]} cy={ys[i]} r={i === points.length - 1 ? "5" : "3"}
                fill={i === points.length - 1 ? BAND_COLORS.proficient.solid : "var(--student)"}
                stroke="var(--paper)" strokeWidth="2"/>
      ))}
      {labels.map((l, i) => i % 2 === 0 || i === labels.length - 1 ? (
        <text key={l} x={xs[i]} y={h - 6} fontSize="10" fill="var(--stone)" textAnchor="middle">{l}</text>
      ) : null)}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PRACTICE VIEW — adaptive practice sessions, mid-session state
   ════════════════════════════════════════════════════════════════════════ */

function PracticeView() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 20, minWidth: 0 }}>
        <ActiveSessionCard/>
        <PracticeRecommendations/>
        <PracticeHistory/>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <PracticeStatsCard/>
        <FocusModeCard/>
      </div>
    </div>
  );
}

function ActiveSessionCard() {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        padding: "16px 22px",
        background: "linear-gradient(135deg, var(--student-100), var(--paper))",
        borderBottom: "1px solid var(--mist)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <div className="t-eyebrow" style={{ fontSize: 10.5, color: "var(--student-deep)", marginBottom: 4 }}>SESSION IN PROGRESS</div>
          <div className="t-h2" style={{ fontSize: 18 }}>Quadratic Functions · Quick Practice</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <I.Clock size={13} color="var(--stone)"/>
          <span className="t-num" style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600 }}>04:32</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Question */}
        <div style={{ padding: "20px 24px", borderRight: "1px solid var(--mist)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>QUESTION 4 OF 10</span>
            <div style={{ display: "flex", gap: 4 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <div key={n} style={{
                  width: 8, height: 8, borderRadius: 999,
                  background: n < 4 ? BAND_COLORS.proficient.solid : (n === 4 ? "var(--student)" : "var(--mist)"),
                }}/>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.6, marginBottom: 16 }}>
            Solve for <i>x</i>:
            <div style={{
              fontFamily: "ui-monospace, SF Mono, monospace",
              fontSize: 18, padding: "10px 14px",
              background: "var(--surface-quiet)", borderRadius: 8, marginTop: 8,
              fontWeight: 600,
            }}>
              x² − 6x + 8 = 0
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "x = 2 or x = 4", state: "selected" },
              { label: "x = −2 or x = −4", state: "" },
              { label: "x = 1 or x = 8", state: "" },
              { label: "x = 3 or x = 5", state: "" },
            ].map((o, i) => (
              <button key={i} className="pressable" style={{
                padding: "10px 14px",
                textAlign: "left",
                fontSize: 13,
                fontWeight: o.state === "selected" ? 600 : 500,
                color: o.state === "selected" ? "var(--student-deep)" : "var(--ink)",
                background: o.state === "selected" ? "var(--student-soft)" : "var(--paper)",
                borderColor: o.state === "selected" ? "var(--student-300)" : "var(--mist)",
                display: "flex", alignItems: "center", gap: 10,
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 999,
                  border: o.state === "selected" ? "5px solid var(--student)" : "1.5px solid var(--mist)",
                  background: "var(--paper)", flexShrink: 0,
                }}/>
                {o.label}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 16, justifyContent: "space-between" }}>
            <button className="btn btn-ghost btn-sm">Skip</button>
            <button className="btn btn-primary">Submit answer <I.ArrowRight size={12} color="#fff"/></button>
          </div>
        </div>

        {/* AI Hint panel */}
        <div style={{ padding: "20px 24px", background: "linear-gradient(160deg, #FBFAFE, var(--paper))" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <I.Sparkle size={14} color="var(--student)"/>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--student-deep)" }}>AI Study Buddy</div>
            <span className="pill pill-purple" style={{ fontSize: 9.5, marginLeft: "auto" }}>Coaching mode</span>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.6, marginBottom: 12, fontStyle: "italic" }}>
            "What two numbers multiply to give <b style={{ color: "var(--ink)", fontStyle: "normal" }}>+8</b> and add to give <b style={{ color: "var(--ink)", fontStyle: "normal" }}>−6</b>?"
          </div>
          <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 14, lineHeight: 1.5 }}>
            Try writing out the factor pairs of 8. The buddy won't give you the answer — but it'll help you think through it.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              "Walk me through factoring step-by-step",
              "Show me a simpler example first",
              "Compare with using the quadratic formula",
            ].map((p, i) => (
              <button key={i} className="pressable" style={{
                padding: "8px 12px", textAlign: "left",
                fontSize: 12, color: "var(--slate)", fontWeight: 500,
              }}>{p}</button>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--paper)", border: "1px dashed var(--mist)", borderRadius: 8, fontSize: 11, color: "var(--stone)", lineHeight: 1.5 }}>
            <b style={{ color: "var(--ink)" }}>Note:</b> Hints don't change your mastery score. The session below the practice tracks where the AI helped — your teacher sees it too.
          </div>
        </div>
      </div>
    </div>
  );
}

function PracticeRecommendations() {
  const recs = [
    { title: "Factoring quadratics — mixed forms", skill: "Algebraic Reasoning", est: "12 min", q: 8, color: "#8B5CF6", reason: "You're 0.3 away from Proficient" },
    { title: "Cell respiration — short answer",     skill: "Scientific Inquiry", est: "10 min", q: 6, color: "#10B981", reason: "Lab quiz on Thursday" },
    { title: "Thesis tightening drills",            skill: "Writing & Composition", est: "15 min", q: 5, color: "#0EA5E9", reason: "Identified gap from Draft 2" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <I.Target size={15} color="var(--student)"/>
          <div className="t-h2" style={{ fontSize: 15 }}>Recommended for you</div>
        </div>
        <span className="t-caption" style={{ fontSize: 11 }}>Adaptive · refreshed daily</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
        {recs.map((r, i) => (
          <div key={i} style={{
            padding: "16px 18px",
            borderRight: i < recs.length - 1 ? "1px solid var(--mist)" : "none",
            display: "flex", flexDirection: "column", gap: 10, minHeight: 168,
          }}>
            <div className="t-eyebrow" style={{ fontSize: 9.5, color: r.color, fontWeight: 700 }}>{r.skill}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35 }}>{r.title}</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <I.Clock size={10} color="var(--stone)"/> {r.est}
              </span>
              <span>·</span>
              <span>{r.q} questions</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 500, fontStyle: "italic", flex: 1 }}>
              {r.reason}
            </div>
            <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }}>
              <I.PlayCircle size={12} color="#fff"/> Start session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeHistory() {
  const history = [
    { title: "Vertex form — short practice",   skill: "Algebraic Reasoning", date: "Yesterday", q: "8/10", change: "+0.2", color: "#8B5CF6" },
    { title: "Cell organelles — flashcards",   skill: "Scientific Inquiry",  date: "2 days ago", q: "12/15", change: "+0.1", color: "#10B981" },
    { title: "Subjunctive practice (Sp.)",     skill: "Language Production", date: "3 days ago", q: "10/12", change: "+0.3", color: "#EF4444" },
    { title: "DBQ thesis builder",             skill: "Historical Thinking", date: "1 week ago", q: "5/5", change: "—",    color: "#F59E0B" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="t-h2" style={{ fontSize: 15 }}>Recent practice</div>
        <a href="#" style={{ fontSize: 12, color: "var(--student-deep)", textDecoration: "none", fontWeight: 600 }}>View all →</a>
      </div>
      {history.map((h, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "8px 1fr auto auto auto",
          alignItems: "center", gap: 16,
          padding: "12px 20px",
          borderBottom: i < history.length - 1 ? "1px solid var(--mist)" : "none",
        }}>
          <div style={{ width: 8, height: 28, borderRadius: 3, background: h.color }}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{h.title}</div>
            <div className="t-caption" style={{ fontSize: 11 }}>{h.skill} · {h.date}</div>
          </div>
          <span className="t-num" style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600 }}>{h.q}</span>
          <span className="pill" style={{
            background: h.change.startsWith("+") ? "var(--success-soft)" : "var(--bone)",
            color: h.change.startsWith("+") ? "var(--success)" : "var(--stone)",
            border: "none", fontWeight: 700,
          }}>{h.change}</span>
          <a href="#" className="btn btn-sm btn-ghost" style={{ color: "var(--student-deep)", fontWeight: 600 }}>Review</a>
        </div>
      ))}
    </div>
  );
}

function PracticeStatsCard() {
  return (
    <div className="card" style={{ padding: "16px 18px" }}>
      <div className="t-h2" style={{ fontSize: 14, marginBottom: 12 }}>This week</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {[
          { label: "Sessions",       value: "7" },
          { label: "Time",           value: "1h 24m" },
          { label: "Mastery moves",  value: "+0.6" },
          { label: "Skills touched", value: "4" },
        ].map((s, i) => (
          <div key={i} style={{ padding: "12px 14px", background: "var(--surface-quiet)", borderRadius: 10 }}>
            <div className="t-num" style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 500, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--success-soft)", borderRadius: 10, fontSize: 12, color: "var(--success)", fontWeight: 600, lineHeight: 1.5 }}>
        ✓ You hit your weekly practice goal of 1 hour.
      </div>
    </div>
  );
}

function FocusModeCard() {
  return (
    <div className="card" style={{ padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <I.Target size={14} color="var(--warning)"/>
        <div className="t-h2" style={{ fontSize: 14 }}>Focus mode</div>
      </div>
      <div style={{ fontSize: 12, color: "var(--stone)", lineHeight: 1.5, marginBottom: 12 }}>
        Block notifications and run a 25-minute timed practice block. Mastery moves get logged automatically.
      </div>
      <button className="btn" style={{ width: "100%", justifyContent: "center" }}>
        <I.Clock size={12} color="var(--stone)"/> Start 25-min focus block
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ASSESSMENT & RECORDS — formal records-of-learning
   ════════════════════════════════════════════════════════════════════════ */

function RecordsView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <ProgressReportCard/>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <ReportCardsSection/>
        <StandardizedAssessments/>
      </div>
      <PortfolioRecord/>
      <TranscriptCard/>
    </div>
  );
}

function ProgressReportCard() {
  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{
        padding: "20px 24px",
        background: "linear-gradient(135deg, var(--student-100), #FAFAFD 60%)",
        borderBottom: "1px solid var(--mist)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "var(--paper)",
            border: "1px solid var(--student-300)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "var(--shadow-1)",
          }}>
            <I.Document size={22} color="var(--student)"/>
          </div>
          <div>
            <div className="t-eyebrow" style={{ fontSize: 10.5, color: "var(--student-deep)", marginBottom: 4 }}>IN PROGRESS · TRIMESTER 2</div>
            <div className="t-h2" style={{ fontSize: 18 }}>Trimester 2 Progress Report</div>
            <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 4 }}>
              Closes <b style={{ color: "var(--ink)" }}>March 21, 2026</b> · 3 weeks remaining
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn"><I.Eye size={12} color="var(--stone)"/> Preview</button>
          <button className="btn btn-primary"><I.Download size={12} color="#fff"/> Download draft</button>
        </div>
      </div>

      {/* Per-class progress strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
        {CLASS_MASTERY.map((c, i) => {
          const band = c.score >= 7 ? "proficient" : c.score >= 4 ? "developing" : "novice";
          const bc = BAND_COLORS[band];
          return (
            <div key={c.id} style={{
              padding: "16px 18px",
              borderRight: i < CLASS_MASTERY.length - 1 ? "1px solid var(--mist)" : "none",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: 6,
                  background: `${c.color}1F`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: c.color }}>{c.abbr}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{c.name}</span>
              </div>
              <div className="t-num" style={{ fontSize: 22, fontWeight: 700, color: bc.solid, fontFamily: "var(--font-display)", lineHeight: 1 }}>
                {c.score.toFixed(1)}<span style={{ fontSize: 12, color: "var(--silver)", fontWeight: 500 }}> / 9</span>
              </div>
              <div style={{ fontSize: 10.5, color: bc.ink, fontWeight: 700, marginTop: 2 }}>
                {band === "proficient" ? "Proficient" : "Developing"}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ReportCardsSection() {
  const reports = [
    { term: "Trimester 1", year: "2025–26", date: "Issued Dec 15, 2025", state: "issued" },
    { term: "Trimester 3", year: "2024–25", date: "Issued Jun 8, 2025",  state: "archived" },
    { term: "Trimester 2", year: "2024–25", date: "Issued Mar 22, 2025", state: "archived" },
    { term: "Trimester 1", year: "2024–25", date: "Issued Dec 14, 2024", state: "archived" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div className="t-h2" style={{ fontSize: 15 }}>Past report cards</div>
        <div className="t-caption" style={{ fontSize: 11, marginTop: 2 }}>Records-of-learning, mapped from 9-pt mastery</div>
      </div>
      {reports.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "auto 1fr auto auto",
          alignItems: "center", gap: 14,
          padding: "12px 20px",
          borderBottom: i < reports.length - 1 ? "1px solid var(--mist)" : "none",
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: r.state === "issued" ? "var(--student-soft)" : "var(--surface-quiet)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <I.Document size={15} color={r.state === "issued" ? "var(--student)" : "var(--stone)"}/>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{r.term} · {r.year}</div>
            <div className="t-caption" style={{ fontSize: 11 }}>{r.date}</div>
          </div>
          <button className="btn btn-sm btn-ghost"><I.Eye size={11} color="var(--stone)"/></button>
          <button className="btn btn-sm btn-ghost"><I.Download size={11} color="var(--stone)"/></button>
        </div>
      ))}
    </div>
  );
}

function StandardizedAssessments() {
  const tests = [
    { name: "SBAC ELA",  score: 2647, band: "Met standard",  bandColor: BAND_COLORS.proficient.solid, date: "Spring 2025", trend: "+34" },
    { name: "SBAC Math", score: 2598, band: "Nearly met",    bandColor: BAND_COLORS.developing.solid, date: "Spring 2025", trend: "+22" },
    { name: "PSAT 10",   score: 1180, band: "On track",      bandColor: BAND_COLORS.proficient.solid, date: "Oct 2025",    trend: "+50" },
  ];
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div className="t-h2" style={{ fontSize: 15 }}>Standardized assessments</div>
        <div className="t-caption" style={{ fontSize: 11, marginTop: 2 }}>SBAC, PSAT/SAT — context, not the primary lens</div>
      </div>
      {tests.map((t, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto auto",
          alignItems: "center", gap: 16,
          padding: "14px 20px",
          borderBottom: i < tests.length - 1 ? "1px solid var(--mist)" : "none",
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{t.name}</div>
            <div className="t-caption" style={{ fontSize: 11, marginTop: 2 }}>{t.date}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span className="t-num" style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>{t.score.toLocaleString()}</span>
            <span style={{ fontSize: 10.5, color: "var(--success)", fontWeight: 700, marginLeft: 6 }}>+{t.trend}</span>
            <div style={{ fontSize: 10.5, color: t.bandColor, fontWeight: 700, marginTop: 2 }}>{t.band}</div>
          </div>
          <button className="btn btn-sm btn-ghost"><I.ChevronRight size={11} color="var(--stone)"/></button>
        </div>
      ))}
    </div>
  );
}

function PortfolioRecord() {
  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div>
          <div className="t-h2" style={{ fontSize: 15 }}>Portfolio record</div>
          <div className="t-caption" style={{ fontSize: 11, marginTop: 2 }}>Curated proofs of growth — used in trimester reviews</div>
        </div>
        <a href="#/my-portfolio" className="btn btn-sm">Open portfolio <I.ArrowUpRight size={11} color="var(--ink)"/></a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
        {[
          { domain: "Literacy",      items: 4, color: "#0EA5E9" },
          { domain: "Quantitative",  items: 3, color: "#8B5CF6" },
          { domain: "Inquiry",       items: 5, color: "#10B981" },
          { domain: "Habits of Mind",items: 2, color: "#F59E0B" },
        ].map((d, i, arr) => (
          <div key={i} style={{
            padding: "16px 18px",
            borderRight: i < arr.length - 1 ? "1px solid var(--mist)" : "none",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: d.color }}/>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: "var(--slate)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{d.domain}</span>
            </div>
            <div className="t-num" style={{ fontSize: 26, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)", lineHeight: 1 }}>{d.items}</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 4 }}>curated artifacts</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TranscriptCard() {
  return (
    <div className="card" style={{ padding: "16px 24px", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center" }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: "var(--bone)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <I.Shield size={20} color="var(--stone)"/>
      </div>
      <div>
        <div className="t-h2" style={{ fontSize: 15 }}>Official transcript</div>
        <div style={{ fontSize: 12.5, color: "var(--stone)", marginTop: 2, lineHeight: 1.5 }}>
          The school's verified record. Required for college applications and external transfers — generated on request by the registrar.
        </div>
      </div>
      <button className="btn btn-primary"><I.Send size={12} color="#fff"/> Request transcript</button>
    </div>
  );
}

window.MyProgressPage = MyProgressPage;
window["renderRoute_my-progress"] = ({ segments, navigate }) => <MyProgressPage segments={segments} navigate={navigate}/>;

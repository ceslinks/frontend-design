// LINKS — Quiz Page (Taking / Submitted / Graded states)

const LinearQuizQuestions = [
  {
    n: 1, type: "mc", points: 4,
    q: "What is the slope of the line passing through points (2, 3) and (6, 11)?",
    options: ["−2", "1/2", "2", "8"],
    correct: 2,
    explanation: "Slope = (y₂−y₁) / (x₂−x₁) = (11−3) / (6−2) = 8/4 = 2.",
  },
  {
    n: 2, type: "mc", points: 4,
    q: "Which equation represents a line with slope −3 and y-intercept 4?",
    options: ["y = 4x − 3", "y = −3x + 4", "y = 3x + 4", "y = −4x + 3"],
    correct: 1,
    explanation: "Slope-intercept form is y = mx + b — substitute m = −3, b = 4.",
  },
  {
    n: 3, type: "mc", points: 4,
    q: "If f(x) = 2x − 5, what is f(7)?",
    options: ["−5", "9", "12", "14"],
    correct: 1,
    explanation: "f(7) = 2(7) − 5 = 14 − 5 = 9.",
  },
  {
    n: 4, type: "mc", points: 4,
    q: "Two lines are perpendicular. If one has slope 3/4, what is the slope of the other?",
    options: ["3/4", "−3/4", "4/3", "−4/3"],
    correct: 3,
    explanation: "Perpendicular slopes are negative reciprocals: −(4/3).",
  },
  {
    n: 5, type: "graph", points: 4,
    q: "Which graph shows the line y = −x + 2?",
    correct: 1,
    explanation: "Slope is −1 (decreasing), y-intercept is 2 — line crosses (0, 2) and (2, 0).",
  },
  {
    n: 6, type: "short", points: 5,
    q: "Write the equation of the line in slope-intercept form that passes through (0, −2) with slope 3.",
    correctAnswer: "y = 3x − 2",
    studentAnswer: "y = 3x - 2",
    correct: true,
  },
  {
    n: 7, type: "short", points: 5,
    q: "Find the x-intercept of the line 2x + 5y = 10.",
    correctAnswer: "5",
    studentAnswer: "x = 5",
    correct: true,
  },
  {
    n: 8, type: "long", points: 10,
    q: "A taxi charges a flat $3.50 plus $2.25 per mile. (a) Write a linear function C(m) for the total cost. (b) What is the cost of a 12-mile ride?",
    correctAnswer: "(a) C(m) = 2.25m + 3.50    (b) C(12) = 2.25(12) + 3.50 = $30.50",
    studentAnswer: "(a) C(m) = 2.25m + 3.5\n(b) C(12) = 27 + 3.5 = $30.50",
    correct: true,
    feedback: "Excellent setup and execution! Clean function notation.",
  },
  {
    n: 9, type: "long", points: 10,
    q: "Determine whether the lines y = 2x + 1 and 4x − 2y = 6 are parallel, perpendicular, or neither. Justify.",
    correctAnswer: "Rewrite second line: −2y = −4x + 6 → y = 2x − 3. Both slopes are 2, so the lines are PARALLEL.",
    studentAnswer: "Both have slope 2, so they're parallel.",
    correct: true,
    feedback: "Right answer — but show the algebra to rewrite the second equation. −1 pt for missing work.",
    earnedPoints: 9,
  },
  {
    n: 10, type: "long", points: 10,
    q: "Sketch and describe the graph of y = ½x − 4. Include the slope, both intercepts, and at least two points.",
    correctAnswer: "Slope = ½, y-intercept (0, −4), x-intercept (8, 0). Other points: (2, −3), (4, −2).",
    studentAnswer: "Slope is 1/2 and y-intercept is -4. Goes through (0,-4) and (2,-3).",
    correct: false,
    feedback: "Missing the x-intercept and a sketch. Always include all requested elements!",
    earnedPoints: 6,
  },
];
window.LinearQuizQuestions = LinearQuizQuestions;

/* ─────────── Quiz wrapper — pick state from demo chip ─────────── */
function QuizPage({ classId, state }) {
  const [demoState, setDemoState] = React.useState(state || "taking");
  const c = ClassesData[classId] || ClassesData.algebra2;

  return (
    <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Demo state chip */}
      <div style={{
        background: "linear-gradient(135deg, #FEF3C7, #FDE68A)",
        border: "1px solid #F59E0B40",
        borderRadius: 10, padding: "8px 12px",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <I.Sparkle size={13} color="#D97706"/>
        <div style={{ fontSize: 11.5, color: "#92400E", fontWeight: 600 }}>Demo: switch quiz states →</div>
        <div style={{ display: "flex", gap: 4, padding: 3, background: "rgba(255,255,255,0.5)", borderRadius: 8 }}>
          {[
            { id: "taking", label: "Taking" },
            { id: "submitted", label: "Submitted" },
            { id: "graded", label: "Graded" },
          ].map((s) => (
            <button key={s.id} onClick={() => setDemoState(s.id)} style={{
              padding: "4px 10px",
              background: demoState === s.id ? "#D97706" : "transparent",
              color: demoState === s.id ? "#fff" : "#92400E",
              border: "none", borderRadius: 6,
              fontSize: 11, fontWeight: 600, cursor: "pointer",
            }}>{s.label}</button>
          ))}
        </div>
      </div>

      <Breadcrumbs trail={[
        { label: "My Classes", href: "#/classes" },
        { label: c.name, href: `#/classes/${c.id}` },
        { label: "Linear Functions Quiz" },
      ]}/>

      {demoState === "taking" && <QuizTaking c={c}/>}
      {demoState === "submitted" && <QuizSubmitted c={c}/>}
      {demoState === "graded" && <QuizGraded c={c}/>}
    </div>
  );
}
window.QuizPage = QuizPage;

/* ─────────── 1. TAKING state ─────────── */
function QuizTaking({ c }) {
  const [current, setCurrent] = React.useState(2); // showing Q3
  const [answers, setAnswers] = React.useState({ 1: 2, 2: 1 }); // already answered
  const [flagged, setFlagged] = React.useState({ 4: true });

  const total = LinearQuizQuestions.length;
  const answered = Object.keys(answers).length;
  const q = LinearQuizQuestions[current];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14, alignItems: "start" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Header */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, color: "var(--stone)", fontWeight: 600 }}>Algebra II · Module 2 Quiz</div>
              <h1 className="t-h1" style={{ fontSize: 22, margin: "2px 0" }}>Linear Functions Quiz</h1>
              <div style={{ fontSize: 12, color: "var(--stone)" }}>10 questions · 60 points · You may take this quiz once</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: "#FEF3C7", borderRadius: 10, border: "1px solid #F59E0B40" }}>
              <I.Clock size={16} color="#D97706"/>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#92400E", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>14:32</div>
                <div style={{ fontSize: 10, color: "#92400E", letterSpacing: "0.04em" }}>TIME LEFT</div>
              </div>
            </div>
            <button className="btn btn-secondary btn-sm"><I.Sparkle size={12} color="var(--student)"/> Save & Continue Later</button>
            <button className="btn btn-primary btn-md">Submit Quiz</button>
          </div>

          <div style={{ marginTop: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11.5, color: "var(--stone)", fontWeight: 600 }}>Progress: {answered} of {total} answered</span>
              <span style={{ fontSize: 11.5, color: "var(--stone)" }}>{Math.round(answered / total * 100)}% complete</span>
            </div>
            <ProgressBar value={answered / total * 100} color="var(--student)" height={6}/>
          </div>
        </div>

        {/* Question card */}
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "22px 26px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <span style={{ fontSize: 11.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Question {q.n} of {total}</span>
              <span style={{ marginLeft: 10, fontSize: 11.5, padding: "2px 8px", background: "var(--bone)", borderRadius: 4, color: "var(--stone)", fontWeight: 600 }}>{q.points} points</span>
              <span style={{ marginLeft: 6, fontSize: 11.5, padding: "2px 8px", background: "rgba(139,92,246,0.1)", color: "var(--student)", borderRadius: 4, fontWeight: 600, textTransform: "capitalize" }}>{q.type === "mc" ? "Multiple choice" : q.type === "graph" ? "Graph" : q.type === "short" ? "Short answer" : "Long answer"}</span>
            </div>
            <button onClick={() => setFlagged({ ...flagged, [q.n]: !flagged[q.n] })} style={{ background: flagged[q.n] ? "#FEF3C7" : "transparent", border: "1px solid var(--mist)", padding: "5px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, color: flagged[q.n] ? "#92400E" : "var(--stone)", fontWeight: 600 }}>
              <I.Flag size={11} color={flagged[q.n] ? "#D97706" : "var(--stone)"}/> {flagged[q.n] ? "Flagged" : "Flag for review"}
            </button>
          </div>

          <div style={{ fontSize: 16, color: "var(--ink)", fontWeight: 500, lineHeight: 1.55, marginBottom: 18 }}>{q.q}</div>

          {/* Options */}
          {q.type === "mc" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {q.options.map((o, i) => {
                const selected = answers[q.n] === i;
                return (
                  <button key={i} onClick={() => setAnswers({ ...answers, [q.n]: i })} style={{
                    textAlign: "left",
                    padding: "12px 16px",
                    background: selected ? "rgba(139,92,246,0.08)" : "var(--paper)",
                    border: selected ? "2px solid var(--student)" : "1.5px solid var(--mist)",
                    borderRadius: 10,
                    fontSize: 14, color: "var(--ink)",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: "50%",
                      background: selected ? "var(--student)" : "var(--bone)",
                      color: selected ? "#fff" : "var(--stone)",
                      fontSize: 13, fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{String.fromCharCode(65 + i)}</span>
                    <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}>{o}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, paddingTop: 14, borderTop: "1px solid var(--mist)" }}>
            <button className="btn btn-secondary btn-md" disabled={current === 0} onClick={() => setCurrent(Math.max(0, current - 1))}>
              <I.ChevronDown size={13} color="var(--ink)" style={{ transform: "rotate(90deg)" }}/> Previous
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "var(--stone)" }}>
              {answers[q.n] !== undefined ? <><I.Check size={13} color="#10B981"/> Answer saved</> : "No answer yet"}
            </div>
            <button className="btn btn-primary btn-md" onClick={() => setCurrent(Math.min(total - 1, current + 1))}>
              Next <I.ChevronDown size={13} color="#fff" style={{ transform: "rotate(-90deg)" }}/>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar: question palette */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, position: "sticky", top: 20 }}>
        <div style={{ background: "var(--paper)", borderRadius: 14, padding: "14px 16px", boxShadow: "var(--shadow-card)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Question Palette</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6 }}>
            {LinearQuizQuestions.map((qq, i) => {
              const ans = answers[qq.n] !== undefined;
              const flag = flagged[qq.n];
              const cur = i === current;
              return (
                <button key={qq.n} onClick={() => setCurrent(i)} style={{
                  width: 38, height: 38, borderRadius: 8,
                  background: cur ? "var(--student)" : ans ? "#10B98114" : "var(--bone)",
                  border: cur ? "2px solid var(--student)" : flag ? "2px solid #F59E0B" : "1px solid var(--mist)",
                  color: cur ? "#fff" : ans ? "#10B981" : "var(--stone)",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", position: "relative",
                }}>
                  {qq.n}
                  {flag && !cur && <I.Flag size={8} color="#F59E0B" style={{ position: "absolute", top: 2, right: 2 }}/>}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 12, fontSize: 10.5, color: "var(--stone)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--student)" }}/> Current</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "#10B98114", border: "1px solid #10B98140" }}/> Answered ({answered})</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, background: "var(--bone)", border: "1px solid var(--mist)" }}/> Unanswered ({total - answered})</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 3, border: "2px solid #F59E0B" }}/> Flagged ({Object.keys(flagged).length})</div>
          </div>
        </div>

        <div style={{ background: "linear-gradient(135deg, #FEF2F2, #FEE2E2)", border: "1px solid #FECACA", borderRadius: 12, padding: "12px 14px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <I.Bell size={14} color="#DC2626"/>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#991B1B" }}>Quiz Rules</div>
          </div>
          <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 11, color: "#991B1B", lineHeight: 1.5 }}>
            <li>One attempt only</li>
            <li>Time limit: 30 minutes</li>
            <li>AI Tutor is disabled during quizzes</li>
            <li>Auto-saved every question</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─────────── 2. SUBMITTED state (waiting for grade) ─────────── */
function QuizSubmitted({ c }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{
        background: "var(--paper)", borderRadius: 16,
        padding: "32px 36px", boxShadow: "var(--shadow-card)",
        textAlign: "center",
      }}>
        <div style={{ width: 88, height: 88, margin: "0 auto 16px", borderRadius: "50%", background: "linear-gradient(135deg, #DBEAFE, #BFDBFE)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <I.Check size={44} color="#2563EB"/>
        </div>
        <h1 className="t-h1" style={{ fontSize: 26, margin: "0 0 6px" }}>Quiz Submitted!</h1>
        <div style={{ fontSize: 14, color: "var(--stone)", marginBottom: 20 }}>Nice work, Sarah. Your answers are locked in.</div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, padding: "16px 0", borderTop: "1px solid var(--mist)", borderBottom: "1px solid var(--mist)" }}>
          <SubmissionStat label="Submitted" value="Just now" sub="Oct 21, 11:24 AM"/>
          <SubmissionStat label="Time taken" value="22m 14s" sub="Of 30:00"/>
          <SubmissionStat label="Questions" value="10 / 10" sub="All answered"/>
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.04))",
          border: "1px solid rgba(139,92,246,0.25)",
          borderRadius: 12, padding: "14px 18px",
          margin: "20px 0",
          display: "flex", gap: 14, alignItems: "center", textAlign: "left",
        }}>
          <Robot size={56}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--student-deep)" }}>While you wait…</div>
            <div style={{ fontSize: 11.5, color: "var(--slate)", marginTop: 3 }}>Mr. Wilson typically returns grades within 24 hours. I'll prep a personalized review based on your answers — ready when your grade comes back.</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <a href="#/classes/algebra2" className="btn btn-secondary btn-md">Back to Algebra II</a>
          <a href="#/classes" className="btn btn-primary btn-md">View My Classes</a>
        </div>
      </div>

      {/* Status timeline */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 20px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 14 }}>What happens next?</div>
        <Step active done icon="Check" color="#10B981" title="You submitted" sub="Today, 11:24 AM"/>
        <Step active icon="Clock" color="#F59E0B" title="Mr. Wilson is grading" sub="Typically within 24 hours" pulse/>
        <Step icon="Sparkle" color="var(--silver)" title="AI builds your review" sub="Mistakes, concepts to revisit, suggested practice"/>
        <Step icon="Trophy" color="var(--silver)" title="You see your grade" sub="With detailed feedback per question" last/>
      </div>
    </div>
  );
}

function SubmissionStat({ label, value, sub }) {
  return (
    <div>
      <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--stone)" }}>{sub}</div>
    </div>
  );
}

function Step({ active, done, icon, color, title, sub, pulse, last }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "flex", gap: 12, position: "relative", paddingBottom: last ? 0 : 14 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flexShrink: 0 }}>
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          background: active ? `${color}1F` : "var(--bone)",
          border: `2px solid ${active ? color : "var(--mist)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: pulse ? "pulse 1.6s ease-in-out infinite" : "none",
        }}>
          <Icon size={13} color={active ? color : "var(--silver)"}/>
        </div>
        {!last && <div style={{ width: 2, flex: 1, background: done ? color : "var(--mist)", minHeight: 18 }}/>}
      </div>
      <div style={{ paddingTop: 4 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: active ? "var(--ink)" : "var(--silver)" }}>{title}</div>
        <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{sub}</div>
      </div>
    </div>
  );
}

/* ─────────── 3. GRADED state (results + AI review) ─────────── */
function QuizGraded({ c }) {
  const earned = LinearQuizQuestions.reduce((sum, q) => {
    if (q.earnedPoints !== undefined) return sum + q.earnedPoints;
    return sum + (q.correct ? q.points : 0);
  }, 0);
  const total = LinearQuizQuestions.reduce((s, q) => s + q.points, 0);
  const pct = Math.round(earned / total * 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Score banner */}
      <div style={{
        background: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
        border: "1px solid #10B98140",
        borderRadius: 16, padding: "20px 24px",
        display: "flex", gap: 24, alignItems: "center",
      }}>
        <Donut size={120} value={pct} color="#10B981" track="rgba(16,185,129,0.15)">
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{pct}<span style={{ fontSize: 16 }}>%</span></div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>B+</div>
          </div>
        </Donut>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11.5, color: "#065F46", fontWeight: 700, letterSpacing: "0.04em" }}>YOUR SCORE</div>
          <h1 className="t-h1" style={{ fontSize: 28, margin: "2px 0 4px" }}>{earned} / {total} points</h1>
          <div style={{ fontSize: 13, color: "var(--slate)" }}>Linear Functions Quiz · Submitted Oct 21 · Graded by Mr. Wilson</div>
          <div style={{ display: "flex", gap: 14, marginTop: 10 }}>
            <Pill icon="Check" color="#10B981" label={`${LinearQuizQuestions.filter(q => q.correct === true || q.correct === q.options?.indexOf(q.options?.[q.correct])).length} correct`}/>
            <Pill icon="Close" color="#EF4444" label={`${LinearQuizQuestions.filter(q => q.correct === false || (typeof q.correct === "number" && q.n === 5)).length} incorrect`}/>
            <Pill icon="Sparkle" color="#F59E0B" label="2 partial credit"/>
            <Pill icon="Clock" color="#0EA5E9" label="Class average: 81%"/>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-secondary btn-md"><I.Download size={13} color="var(--ink)"/> Download</button>
          <button className="btn btn-primary btn-md">View AI Review →</button>
        </div>
      </div>

      {/* AI Review card */}
      <div style={{
        background: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.04))",
        border: "1px solid rgba(139,92,246,0.25)",
        borderRadius: 14, padding: "16px 20px",
        display: "flex", gap: 16, alignItems: "flex-start",
      }}>
        <div style={{ flexShrink: 0 }}><Robot size={72} mood="happy"/></div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--student-deep)" }}>AI Review</div>
            <span style={{ fontSize: 9.5, padding: "2px 6px", background: "rgba(139,92,246,0.15)", color: "var(--student-deep)", borderRadius: 3, fontWeight: 700 }}>PERSONALIZED</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.55, marginBottom: 12 }}>
            Strong work on the algebraic mechanics — slope, equations, and function evaluation are <b>solid</b>. The places to revisit are <b>graph identification</b> (Q5) and <b>showing your reasoning</b> on word problems (Q9, Q10). When the prompt asks for justification or a sketch, even a quick one-line rewrite earns those points.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <ReviewBlock color="#10B981" icon="Check" title="Strengths" items={["Slope from two points", "Slope-intercept form", "Function evaluation", "Parallel/perp slopes"]}/>
            <ReviewBlock color="#F59E0B" icon="Sparkle" title="Watch for" items={["Reading graphs of negative slopes", "Showing algebra steps", "Including all requested elements"]}/>
            <ReviewBlock color="#0EA5E9" icon="Wand" title="Recommended next" items={["Lesson 2.4: Graphing review", "Practice Set: Linear word problems", "5-min concept video"]}/>
          </div>
        </div>
      </div>

      {/* Question-by-question review */}
      <div style={{ background: "var(--paper)", borderRadius: 14, padding: "16px 22px", boxShadow: "var(--shadow-card)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", margin: 0 }}>Question-by-question review</h2>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn btn-secondary btn-sm" style={{ height: 26, fontSize: 11 }}>All</button>
            <button className="btn btn-secondary btn-sm" style={{ height: 26, fontSize: 11, background: "#FEE2E2", color: "#991B1B" }}>Missed only</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {LinearQuizQuestions.map((q) => <ReviewQuestion key={q.n} q={q}/>)}
        </div>
      </div>
    </div>
  );
}

function Pill({ icon, color, label }) {
  const Icon = I[icon];
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(255,255,255,0.6)", borderRadius: 999, fontSize: 11.5, color: "var(--slate)", fontWeight: 600 }}>
      <Icon size={11} color={color}/> {label}
    </div>
  );
}

function ReviewBlock({ color, icon, title, items }) {
  const Icon = I[icon];
  return (
    <div style={{ background: "rgba(255,255,255,0.6)", borderRadius: 10, padding: "10px 12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <Icon size={13} color={color}/>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)" }}>{title}</div>
      </div>
      <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 11, color: "var(--slate)", lineHeight: 1.55 }}>
        {items.map((it, i) => <li key={i}>{it}</li>)}
      </ul>
    </div>
  );
}

function ReviewQuestion({ q }) {
  const earned = q.earnedPoints !== undefined ? q.earnedPoints : (q.correct === true || q.correct === q.options?.indexOf?.(q.options?.[q.correct]) ? q.points : 0);
  const isCorrect = earned === q.points;
  const isPartial = earned > 0 && earned < q.points;
  const color = isCorrect ? "#10B981" : isPartial ? "#F59E0B" : "#EF4444";

  return (
    <div style={{ borderLeft: `3px solid ${color}`, paddingLeft: 14, paddingBottom: 4 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.04em" }}>Q{q.n}</span>
        <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500, flex: 1 }}>{q.q}</span>
        <span style={{ fontSize: 12, fontWeight: 700, color }}>
          {earned} / {q.points} pts
        </span>
      </div>

      {q.type === "mc" ? (
        <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.5 }}>
          Your answer: <span style={{ color, fontWeight: 600 }}>{q.options[q.n === 5 ? 2 : q.correct]}</span>
          {!isCorrect && <> &nbsp;·&nbsp; Correct: <span style={{ color: "#10B981", fontWeight: 600 }}>{q.options[q.correct]}</span></>}
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 11.5 }}>
          <div style={{ background: "var(--bone)", padding: "8px 10px", borderRadius: 6 }}>
            <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 700, letterSpacing: "0.04em", marginBottom: 2 }}>YOUR ANSWER</div>
            <div style={{ color: "var(--slate)", whiteSpace: "pre-line", fontFamily: "Georgia, serif", fontStyle: "italic" }}>{q.studentAnswer}</div>
          </div>
          <div style={{ background: "#ECFDF5", padding: "8px 10px", borderRadius: 6, border: "1px solid #10B98130" }}>
            <div style={{ fontSize: 10, color: "#065F46", fontWeight: 700, letterSpacing: "0.04em", marginBottom: 2 }}>EXPECTED</div>
            <div style={{ color: "#065F46", fontFamily: "Georgia, serif", fontStyle: "italic" }}>{q.correctAnswer}</div>
          </div>
        </div>
      )}

      {q.feedback && (
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(245,158,11,0.08)", borderRadius: 6, fontSize: 11.5, color: "#92400E", display: "flex", gap: 6 }}>
          <I.MessageCircle size={12} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }}/>
          <span><b>Mr. Wilson:</b> {q.feedback}</span>
        </div>
      )}
      {q.explanation && !q.feedback && (
        <div style={{ marginTop: 6, padding: "6px 10px", background: "rgba(139,92,246,0.06)", borderRadius: 6, fontSize: 11.5, color: "var(--slate)", display: "flex", gap: 6 }}>
          <I.Sparkle size={12} color="var(--student)" style={{ flexShrink: 0, marginTop: 1 }}/>
          <span><b style={{ color: "var(--student-deep)" }}>AI hint:</b> {q.explanation}</span>
        </div>
      )}
    </div>
  );
}

// LINKS — Tools · Create category (Writing, Notes, Presentation)

/* ============================================================
   WRITING — long-form doc editor
   ============================================================ */
function ToolWriting() {
  const [tab, setTab] = React.useState("draft");
  return (
    <ToolShell
      toolId="writing"
      docTitle="Argumentative Essay — Should AI grade student work?"
      saveState="Saved · 12s ago"
      toolbar={
        <>
          <select className="btn btn-sm" defaultValue="h2" style={{ padding: "5px 8px" }}>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="p">Body</option>
            <option value="quote">Quote</option>
          </select>
          <ToolDivider/>
          <ToolBtn icon="Edit" label="B" active/>
          <ToolBtn icon="Edit" label="I"/>
          <ToolBtn icon="Edit" label="U"/>
          <ToolDivider/>
          <ToolBtn icon="ListChecks" label="List"/>
          <ToolBtn icon="Document" label="Cite"/>
          <ToolBtn icon="Image" label="Image"/>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>847 words · 4 min read</span>
        </>
      }
      leftRail={
        <>
          <div className="card" style={{ padding: 14 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>OUTLINE</div>
            {[
              { t: "Introduction", a: true },
              { t: "Claim 1 — Bias in training data" },
              { t: "Claim 2 — Teacher relationship" },
              { t: "Counterargument" },
              { t: "Conclusion", e: true },
            ].map((o, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 8px",
                borderRadius: 6, background: o.a ? "var(--student-soft)" : "transparent",
                color: o.a ? "var(--student-deep)" : "var(--slate)",
                fontSize: 12.5, fontWeight: o.a ? 600 : 500, cursor: "pointer",
              }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 4,
                  background: o.e ? "var(--bone)" : "var(--paper)",
                  border: "1px solid var(--mist)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 9, color: "var(--stone)", fontWeight: 700,
                }}>{i + 1}</span>
                <span>{o.t}</span>
                {o.e && <span className="pill pill-ghost" style={{ fontSize: 9, marginLeft: "auto" }}>Empty</span>}
              </div>
            ))}
            <button style={{
              marginTop: 8, width: "100%", padding: "6px 8px", border: "1px dashed var(--mist)",
              background: "transparent", borderRadius: 6, fontSize: 11.5, color: "var(--stone)", cursor: "pointer",
            }}>+ Add section</button>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>SOURCES (3)</div>
            {[
              "Klein, NYT 2024 — AI bias",
              "Bio · Lesson 6.2 notes",
              "Class debate transcript",
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", padding: "6px 0", fontSize: 12, color: "var(--slate)" }}>
                <I.Document size={11} color="var(--silver)"/>{s}
              </div>
            ))}
          </div>
        </>
      }
      rightRail={
        <AICoachRail
          context="Argument essay draft"
          suggestions={[
            { t: "Probe", q: "Your Claim 1 is strong. What evidence would make it stronger?" },
            { t: "Sources", q: "You cited Klein once. Is there a second moment to bring her in?" },
            { t: "Self-check", q: "Read your intro aloud. Does it set up the claim or restate the prompt?" },
          ]}
          cites={["Klein, NYT 2024", "Lesson 6.2 notes"]}
        />
      }
      bottomBar={
        <>
          <span>847 / 1000 words</span>
          <ToolDivider/>
          <span>Readability: <strong style={{ color: "var(--ink)" }}>Grade 11</strong></span>
        </>
      }
    >
      <div style={{ padding: "32px 56px", maxWidth: 720, margin: "0 auto" }}>
        <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 6, color: "var(--silver)" }}>ENGLISH 10 · MS. PATEL · DUE FRI MAY 16</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 700, color: "var(--ink)", margin: 0, marginBottom: 6, letterSpacing: "-0.02em" }}>Should AI grade student work?</h1>
        <div style={{ fontSize: 13, color: "var(--stone)", marginBottom: 24 }}>By Alex Johnson · Draft 3</div>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, color: "var(--ink)", marginTop: 24, marginBottom: 10 }}>Introduction</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink)", marginTop: 0 }}>
          Every Friday in English class, Ms. Patel hands back our essays with notes
          in the margins — questions, underlines, sometimes a smiley face next to
          a sentence she liked. <span style={{ background: "#FEF3C7" }}>That kind of feedback shaped how I write</span>. Lately, schools have started
          piloting AI that can score essays in seconds. The pitch is appealing — faster
          feedback, less teacher burnout — but I think we should be careful before
          handing grading over to a system that has never asked me a question.
        </p>

        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600, color: "var(--ink)", marginTop: 24, marginBottom: 10 }}>Claim 1 — Training data carries bias</h2>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink)", marginTop: 0 }}>
          AI graders learn from past human grades. If those grades undervalued
          certain dialects, voices, or argument styles, the AI will too — quietly,
          at scale.<sup style={{ color: "var(--student)", fontWeight: 700 }}>[1]</sup> Ezra Klein writes about this pattern in his April column for
          the <em>New York Times</em>: tools trained on biased data don't get more
          fair when they get faster, they just get faster.
        </p>

        <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--ink)" }}>
          <span style={{ background: "var(--student-soft)", padding: "0 2px", borderBottom: "2px solid var(--student-300)" }}>
            In our class debate last week, two students…
          </span>
        </p>

        <div style={{
          marginTop: 12, padding: "10px 14px", background: "var(--student-soft)",
          border: "1px solid var(--student-200)", borderRadius: 8,
          fontSize: 12.5, color: "var(--student-deep)", display: "flex", alignItems: "flex-start", gap: 8,
        }}>
          <I.Sparkle size={13} color="var(--student)" style={{ marginTop: 2 }}/>
          <div>
            <strong>Coach asks:</strong> You mentioned the class debate but didn't name what surprised you. Add a sentence about the moment — that's where your argument lives.
            <div style={{ marginTop: 6, display: "flex", gap: 6 }}>
              <button style={{ padding: "3px 8px", background: "var(--paper)", border: "1px solid var(--student-200)", borderRadius: 4, fontSize: 11, fontWeight: 600, color: "var(--student-deep)", cursor: "pointer" }}>Got it</button>
              <button style={{ padding: "3px 8px", background: "transparent", border: "1px solid transparent", borderRadius: 4, fontSize: 11, color: "var(--student-deep)", cursor: "pointer" }}>Skip</button>
            </div>
          </div>
        </div>

        <p style={{ fontSize: 14, color: "var(--silver)", marginTop: 32, fontStyle: "italic" }}>
          Continue writing… the cursor is here.
        </p>
      </div>
    </ToolShell>
  );
}

/* ============================================================
   NOTES — notebook with sections
   ============================================================ */
function ToolNotes() {
  const notebooks = [
    { name: "Biology", color: "#22C55E", count: 14, active: true },
    { name: "Algebra II", color: "#3B82F6", count: 9 },
    { name: "English Lit", color: "#F59E0B", count: 11 },
    { name: "US History", color: "#A855F7", count: 7 },
    { name: "Personal", color: "#EC4899", count: 22 },
  ];
  const notes = [
    { t: "Cell respiration — overview", d: "Today, 9:14 AM", tags: ["Bio", "Ch 6"], active: true },
    { t: "Mitochondria as the powerhouse", d: "Yesterday", tags: ["Bio"] },
    { t: "Lab questions — fermentation", d: "May 18", tags: ["Bio", "Lab"] },
    { t: "Vocab list (krebs cycle)", d: "May 17", tags: ["Bio"] },
  ];
  return (
    <ToolShell
      toolId="notes"
      docTitle="Cell respiration — overview"
      saveState="Saved · 4s ago"
      headerExtras={<button className="btn btn-sm"><I.Plus size={12} color="var(--stone)"/> New note</button>}
      toolbar={
        <>
          <ToolBtn icon="Edit" label="Format"/>
          <ToolBtn icon="ListChecks" label="Checklist"/>
          <ToolBtn icon="Image" label="Image"/>
          <ToolBtn icon="Document" label="Attach"/>
          <ToolDivider/>
          <ToolBtn icon="Sparkle" label="Ask coach"/>
          <span style={{ flex: 1 }}/>
          <input placeholder="Search notes…" style={{ border: "1px solid var(--mist)", padding: "5px 10px", fontSize: 12, borderRadius: 6, background: "var(--paper)" }}/>
        </>
      }
      leftRail={
        <>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>NOTEBOOKS</div>
            {notebooks.map((n) => (
              <div key={n.name} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "6px 8px",
                background: n.active ? "var(--student-soft)" : "transparent",
                borderRadius: 6, fontSize: 12.5, color: n.active ? "var(--student-deep)" : "var(--slate)",
                fontWeight: n.active ? 600 : 500, cursor: "pointer",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: n.color }}/>
                <span style={{ flex: 1 }}>{n.name}</span>
                <span style={{ fontSize: 11, color: "var(--silver)" }}>{n.count}</span>
              </div>
            ))}
            <button style={{ marginTop: 6, fontSize: 11.5, color: "var(--student-deep)", background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>+ Notebook</button>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>BIOLOGY · 14 NOTES</div>
            {notes.map((n) => (
              <div key={n.t} style={{
                padding: "8px 6px", borderRadius: 6, cursor: "pointer",
                background: n.active ? "var(--bone)" : "transparent",
                borderLeft: n.active ? "2px solid var(--student)" : "2px solid transparent",
              }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>{n.t}</div>
                <div style={{ fontSize: 10.5, color: "var(--silver)" }}>{n.d}</div>
              </div>
            ))}
          </div>
        </>
      }
      rightRail={<AICoachRail context="Bio · cell respiration notes" suggestions={[
        { t: "Self-check", q: "What's the *output* of glycolysis? Try to write it without looking." },
        { t: "Connect", q: "How does this link back to last week's enzyme lesson?" },
      ]} cites={["Bio · Lesson 6.2", "Lab #4 transcript"]}/>}
    >
      <div style={{ padding: "28px 40px", maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
          {["Bio", "Ch 6", "Energy"].map((t) => (
            <span key={t} className="pill pill-purple" style={{ fontSize: 10.5 }}>{t}</span>
          ))}
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "var(--ink)", marginTop: 0, marginBottom: 4 }}>Cell respiration — overview</h1>
        <div style={{ fontSize: 12.5, color: "var(--silver)", marginBottom: 22 }}>Bio · May 21, 2026 · 9:14 AM</div>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginTop: 18, marginBottom: 8 }}>The three stages</h3>
        <ol style={{ fontSize: 14.5, lineHeight: 1.7, color: "var(--ink)", paddingLeft: 22, margin: 0 }}>
          <li><strong>Glycolysis</strong> — happens in the cytoplasm. Glucose → 2 pyruvate.</li>
          <li><strong>Krebs cycle</strong> — in the mitochondrial matrix. Releases CO₂, makes NADH and FADH₂.</li>
          <li><strong>Electron transport chain</strong> — inner membrane. Makes most of the ATP.</li>
        </ol>

        <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--ink)", marginTop: 22, marginBottom: 8 }}>Things to remember</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[
            { c: true, t: "Aerobic = with oxygen, anaerobic = without" },
            { c: true, t: "Net ATP from one glucose ≈ 30–32" },
            { c: false, t: "Re-watch the chemiosmosis animation" },
            { c: false, t: "Quiz Friday — review fermentation" },
          ].map((it, i) => (
            <label key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 14, color: "var(--slate)", cursor: "pointer" }}>
              <input type="checkbox" defaultChecked={it.c} style={{ marginTop: 4 }}/>
              <span style={{ textDecoration: it.c ? "line-through" : "none", color: it.c ? "var(--silver)" : "var(--ink)" }}>{it.t}</span>
            </label>
          ))}
        </div>

        <div style={{
          marginTop: 22, padding: 14, background: "#FEF3C7", borderRadius: 8,
          fontFamily: "var(--font-handwritten, 'Caveat', cursive)", fontSize: 18, color: "#7c4a03", transform: "rotate(-0.4deg)",
        }}>
          ✏️ Pyruvate is the bridge molecule! Don't forget it on the test.
        </div>
      </div>
    </ToolShell>
  );
}

/* ============================================================
   PRESENTATION — slide deck editor
   ============================================================ */
function ToolPresentation() {
  const slides = [
    { n: 1, t: "Cell Structure", k: "Title" },
    { n: 2, t: "Why this matters", k: "Section" },
    { n: 3, t: "Animal vs plant cells", k: "Compare", active: true },
    { n: 4, t: "Organelles in detail", k: "List" },
    { n: 5, t: "Mitochondria — focus", k: "Diagram" },
    { n: 6, t: "Sources & next steps", k: "End" },
  ];
  return (
    <ToolShell
      toolId="presentation"
      docTitle="Cell Structure — Final Project"
      saveState="Saved · 18s ago"
      contentBg="var(--surface-quiet)"
      toolbar={
        <>
          <ToolBtn icon="Plus" label="New slide"/>
          <ToolDivider/>
          <ToolBtn icon="Edit" label="Text"/>
          <ToolBtn icon="Image" label="Image"/>
          <ToolBtn icon="ChartBar" label="Chart"/>
          <ToolBtn icon="Atom" label="Diagram"/>
          <ToolDivider/>
          <ToolBtn icon="Sparkle" label="Coach feedback"/>
          <span style={{ flex: 1 }}/>
          <button className="btn btn-sm"><I.Video size={12} color="var(--stone)"/> Present</button>
        </>
      }
      leftRail={
        <div className="card" style={{ padding: 10 }}>
          <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10, padding: "0 4px" }}>SLIDES · 6</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {slides.map((s) => (
              <div key={s.n} style={{
                position: "relative", border: s.active ? "2px solid var(--student)" : "1px solid var(--mist)",
                borderRadius: 6, overflow: "hidden", background: "var(--paper)", cursor: "pointer",
              }}>
                <div style={{ aspectRatio: "16/9", padding: 8, display: "flex", flexDirection: "column", gap: 3 }}>
                  <div style={{ fontSize: 8, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1 }}>{s.t}</div>
                  <div style={{ flex: 1, background: "var(--bone)", borderRadius: 2 }}/>
                </div>
                <div style={{ position: "absolute", top: 4, left: 4, fontSize: 9, color: "var(--silver)", fontWeight: 700, background: "rgba(255,255,255,0.85)", padding: "0 4px", borderRadius: 3 }}>{s.n}</div>
              </div>
            ))}
            <button style={{ padding: 16, border: "1px dashed var(--mist)", borderRadius: 6, background: "transparent", color: "var(--stone)", cursor: "pointer", fontSize: 11.5 }}>+ Add slide</button>
          </div>
        </div>
      }
      rightRail={
        <>
          <div className="card" style={{ padding: 14 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>SLIDE 3 · COMPARE</div>
            <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>Layout</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 14 }}>
              {[true, false, false].map((a, i) => (
                <div key={i} style={{
                  aspectRatio: "16/9", border: a ? "2px solid var(--student)" : "1px solid var(--mist)",
                  borderRadius: 4, background: "var(--paper)", padding: 4, display: "flex", gap: 2,
                }}>
                  <div style={{ flex: 1, background: "var(--bone)", borderRadius: 2 }}/>
                  {i !== 2 && <div style={{ flex: 1, background: "var(--bone)", borderRadius: 2 }}/>}
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>Theme</div>
            <div style={{ display: "flex", gap: 6 }}>
              {["#0F172A", "#5B21B6", "#15803D", "#B91C1C", "#A16207"].map((c, i) => (
                <div key={i} style={{ width: 22, height: 22, borderRadius: 999, background: c, border: i === 1 ? "2px solid var(--student)" : "1px solid var(--mist)", cursor: "pointer" }}/>
              ))}
            </div>
          </div>
          <AICoachRail context="Slide 3 — compare animal/plant" suggestions={[
            { t: "Probe", q: "What's the one thing you want this slide to teach?" },
            { t: "Self-check", q: "Could you say slide 3 out loud in 30s? Try it." },
          ]}/>
        </>
      }
    >
      <div style={{ padding: 32, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 540 }}>
        <div style={{
          width: "100%", maxWidth: 720, aspectRatio: "16/9",
          background: "var(--paper)", borderRadius: 8,
          boxShadow: "0 8px 28px rgba(15,23,42,0.10)",
          display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden",
        }}>
          <div style={{ padding: 28, background: "linear-gradient(160deg, #DCFCE7, #ffffff)", display: "flex", flexDirection: "column" }}>
            <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 8, color: "#15803D" }}>ANIMAL CELL</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, marginBottom: 14 }}>No cell wall</div>
            <div style={{ flex: 1, background: "var(--bone)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--silver)", fontFamily: "ui-monospace, monospace", fontSize: 11 }}>[ animal cell diagram ]</div>
          </div>
          <div style={{ padding: 28, background: "linear-gradient(160deg, #DBEAFE, #ffffff)", display: "flex", flexDirection: "column", borderLeft: "1px dashed var(--mist)" }}>
            <div className="t-eyebrow" style={{ fontSize: 10, marginBottom: 8, color: "#1D4ED8" }}>PLANT CELL</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1, marginBottom: 14 }}>Has chloroplasts</div>
            <div style={{ flex: 1, background: "var(--bone)", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--silver)", fontFamily: "ui-monospace, monospace", fontSize: 11 }}>[ plant cell diagram ]</div>
          </div>
        </div>
      </div>
    </ToolShell>
  );
}

window.ToolWriting = ToolWriting;
window.ToolNotes = ToolNotes;
window.ToolPresentation = ToolPresentation;

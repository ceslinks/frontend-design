// LINKS — My Portfolio (complete 6-page dashboard system)

const Page = window.Page;
const I = window.I;

/* ─── DESIGN TOKENS ────────────────────────────────────────────────── */

const COLORS = {
  mint: "#A8D5BA",
  coral: "#FFD4B4",
  lavender: "#E8D5F2",
  sky: "#D4E8FF",
  yellow: "#FFF4D4",
  bg: "#C8D4DF",
  surface: "#FFFFFF",
  text: "#1A1A2E",
  textSecondary: "#7A7A8C",
  border: "#E5E0F0",
  shadow: "0 4px 6px rgba(0, 0, 0, 0.15), 0 12px 40px rgba(0, 0, 0, 0.30)",
};

/* ─── DATA ─────────────────────────────────────────────────────────── */

const WORK_ITEMS = [
  { id: "w1", title: "Cell Respiration Lab Report", class: "Biology", type: "Lab report", status: "in-progress", dueDate: "May 12", daysUntilDue: 4, skills: ["Critical Thinking", "Communication"] },
  { id: "w2", title: "Symbols & Theme — The Great Gatsby", class: "English Lit", type: "Essay", status: "in-progress", dueDate: "May 14", daysUntilDue: 6, skills: ["Communication", "Critical Thinking"] },
  { id: "w3", title: "Quadratic Solver — Robotics App", class: "Algebra II", type: "Project", status: "in-progress", dueDate: "May 20", daysUntilDue: 12, skills: ["Problem Solving"] },
  { id: "w4", title: "Photosynthesis Diagram", class: "Biology", type: "Diagram", status: "submitted", submittedDate: "May 3", skills: [] },
  { id: "w5", title: "Persuasive Letter — Climate Policy", class: "English Lit", type: "Letter", status: "submitted", submittedDate: "Apr 28", skills: [] },
  { id: "w6", title: "Cell Respiration: A Visual Walkthrough", class: "Biology", type: "Lab", status: "returned", grade: "A", gradePoints: 98, returnedDate: "Apr 28", feedback: "Exceptional data organization and visual clarity. Your diagrams made the ATP synthesis pathway genuinely easy to follow. The way you annotated each step shows you understand not just what happens, but why it matters. Consider using this same approach in future labs—your peers could really learn from this visual clarity.", teacher: "Mr. Rivera", featured: true, skills: ["Critical Thinking", "Communication"] },
  { id: "w7", title: "Pride and Prejudice Essay", class: "English Lit", type: "Essay", status: "returned", grade: "A", gradePoints: 96, returnedDate: "Apr 25", feedback: "Strong thesis with compelling evidence throughout. You've woven textual examples seamlessly into your argument about Darcy's character development. The section on the letter was particularly insightful. Next time, try to dig even deeper into authorial intent—what was Austen trying to show us about social class through these characters?", teacher: "Ms. Chen", featured: true, skills: ["Communication", "Critical Thinking"] },
  { id: "w8", title: "Systems of Equations Problem Set", class: "Algebra II", type: "Problem Set", status: "returned", grade: "B+", gradePoints: 87, returnedDate: "Apr 20", feedback: "Good work overall. Most problems are solved correctly with clear steps. However, check your work on problem 5—your algebra is solid, but you may have made a small error in simplifying the final answer. Redo it and see what you find. The rest shows solid understanding.", teacher: "Mr. Kumar", featured: false, skills: ["Problem Solving"] },
  { id: "w9", title: "American Revolution Timeline", class: "History", type: "Timeline", status: "returned", grade: "A−", gradePoints: 94, returnedDate: "Apr 18", feedback: "Comprehensive and well-organized timeline that captures the key turning points. You've selected events that really matter and explained their significance clearly. Minor note: the Boston Tea Party section could use a bit more context about why colonists were so upset. Great work overall—this is the kind of timeline that helps us see history as a connected story.", teacher: "Dr. Martinez", featured: true, skills: ["Research", "Communication"] },
  { id: "w10", title: "Spanish Conversational Recording", class: "Spanish II", type: "Audio", status: "returned", grade: "B", gradePoints: 85, returnedDate: "Apr 15", feedback: "Clear pronunciation and good rhythm in your delivery. You're communicating your ideas effectively. To push further, work on using more complex grammatical structures—you're ready for subjunctive mood and conditional tenses. Try incorporating these in your next recording. Your confidence is there; now expand your toolkit.", teacher: "Señora Lopez", featured: false, skills: ["Communication"] },
];

const SKILLS_DATA = [
  { name: "Critical Thinking", level: 92, works: ["w1", "w6", "w7"], sources: ["Cell Respiration Lab", "Pride and Prejudice"] },
  { name: "Communication", level: 88, works: ["w1", "w2", "w6", "w7", "w9"], sources: ["Lab Report", "Essay", "Timeline"] },
  { name: "Problem Solving", level: 85, works: ["w3", "w8"], sources: ["Robotics App", "Equations Set"] },
  { name: "Research", level: 80, works: ["w9"], sources: ["Timeline"] },
  { name: "Creativity", level: 78, works: ["w2", "w3"], sources: ["Essay", "Project"] },
];

const REFLECTIONS_DATA = [
  { id: "r1", title: "Reflection on Lab Work", class: "Biology", date: "May 2", text: "Today's lab session taught me the importance of careful observation. When analyzing cellular processes, small details matter. I realized that my initial hypothesis about ATP synthesis was incomplete because I wasn't looking closely enough at the electron transport chain. This pushed me to ask better questions and dig deeper.", prompt: "What did you learn about yourself as a scientist today?" },
  { id: "r2", title: "Essay Revision Insights", class: "English Lit", date: "Apr 26", text: "Revising my Gatsby essay was enlightening. I had to confront my own assumptions about Daisy as a character. The feedback pushed me to see her not as a symbol, but as a complex human caught between worlds. This exercise in perspective-taking applies beyond literature.", prompt: "How did revision change your understanding?" },
  { id: "r3", title: "Teamwork on the Robotics Project", class: "Algebra II", date: "Apr 20", text: "Working with my team on the quadratic solver app taught me that diverse skill sets create better solutions. One teammate's UX ideas complemented my math background perfectly. I learned that asking for help isn't a weakness—it's strategic.", prompt: "Describe a moment when teamwork helped you succeed." },
];

const ACHIEVEMENTS_DATA = [
  { id: "a1", name: "Lab Specialist", description: "Earned A on 3 consecutive lab reports", earned: "Apr 28", criteria: "#lab #biology" },
  { id: "a2", name: "Essay Master", description: "Submitted 5+ essays with A−or better", earned: "Apr 25", criteria: "#communication #writing" },
  { id: "a3", name: "Consistent Contributor", description: "Submitted work on time for 4 weeks straight", earned: "Apr 15", criteria: "#responsibility #consistency" },
  { id: "a4", name: "Reflection Habit", description: "Written 10+ meaningful reflections", earned: "Apr 10", criteria: "#reflection #growth" },
  { id: "a5", name: "Skill Builder", description: "Demonstrated 5+ distinct skills in work", earned: "Mar 30", criteria: "#skills #growth" },
];

const SHARED_PORTFOLIOS = [
  { id: "s1", title: "Photosynthesis & Respiration Comparison", class: "Biology", type: "Diagram", peer: "Jordan K.", likes: 8, liked: false },
  { id: "s2", title: "Climate Change Policy Brief", class: "English Lit", type: "Essay", peer: "Sam T.", likes: 12, liked: true },
  { id: "s3", title: "Fibonacci Sequence in Nature", class: "Algebra II", type: "Project", peer: "Casey M.", likes: 15, liked: false },
  { id: "s4", title: "Women in the Industrial Revolution", class: "History", type: "Research Paper", peer: "Morgan J.", likes: 10, liked: false },
  { id: "s5", title: "Spanish Dialogue Podcast", class: "Spanish II", type: "Audio", peer: "Riley D.", likes: 7, liked: false },
  { id: "s6", title: "Mitochondrial Function Animation", class: "Biology", type: "Video", peer: "Alex P.", likes: 18, liked: true },
];

const CLASS_COLORS = {
  "Biology": { dot: "#4A9E7A", tag: "tag-bio", grade: "A−" },
  "English Lit": { dot: "#7F77DD", tag: "tag-eng", grade: "A" },
  "Algebra II": { dot: "#EF9F27", tag: "tag-math", grade: "B+" },
  "History": { dot: "#1D9E75", tag: "tag-hist", grade: "A" },
  "Spanish II": { dot: "#D85A30", tag: "tag-span", grade: "B" },
};

// All subjects a student can categorise portfolio work under —
// includes enrolled classes + electives/extracurriculars they may do outside school
const ALL_PORTFOLIO_SUBJECTS = [
  // Enrolled classes
  "Biology", "English Lit", "Algebra II", "History", "Spanish II",
  // STEM
  "Chemistry", "Physics", "Computer Science", "Statistics", "Environmental Science",
  // Humanities / Languages
  "French", "Mandarin", "Latin", "Geography", "Economics", "Philosophy",
  // Arts & Creative
  "Art", "Photography", "Graphic Design", "Film & Media", "Drama / Theatre", "Creative Writing",
  // Music
  "Music", "Music Theory", "Choir / Vocal", "Instrumental",
  // Health & PE
  "Physical Education", "Health & Wellbeing",
  // Other
  "Independent Study", "Personal Project", "Other",
];

const REFLECTION_PROMPTS = [
  "What did I learn from this feedback?",
  "What would I do differently next time?",
  "What am I most proud of in this work?",
  "How can I apply this to future assignments?",
  "What challenged me most, and how did I work through it?",
];

/* ─── COMPONENTS ────────────────────────────────────────────────────── */

function SummaryBar({ stats }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
      gap: 12,
      marginBottom: 32,
    }}>
      {stats.map(s => (
        <div key={s.label} title={s.tooltip || ""} style={{
          padding: "18px 20px",
          borderRadius: 16,
          background: s.bg,
          boxShadow: "var(--shadow-card)",
        }}>
          <div style={{ fontSize: 26, fontWeight: 800, color: s.text, lineHeight: 1 }}>{s.value}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: s.text, marginTop: 5, opacity: 0.85 }}>{s.label}</div>
          <div style={{ fontSize: 11, color: s.text, marginTop: 2, opacity: 0.6 }}>{s.sub}</div>
        </div>
      ))}
    </div>
  );
}

/* ─── WORK PREVIEW ──────────────────────────────────────────────────────
   Renders a sensible placeholder for the student's submitted work so they
   can see it while writing their reflection.
   - Visual types (Project, Diagram, Timeline, Video) → abstract pastel SVG
   - Audio → waveform placeholder
   - Everything else (Lab report, Essay, Letter, Problem Set, Lab) → lorem
     ipsum text snippet
*/

const VISUAL_WORK_TYPES = ["Project", "Diagram", "Timeline", "Video", "Photography"];
const AUDIO_WORK_TYPES  = ["Audio"];

const PORTFOLIO_LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
];

function WorkPreview({ workItem }) {
  const isVisual = VISUAL_WORK_TYPES.includes(workItem.type);
  const isAudio  = AUDIO_WORK_TYPES.includes(workItem.type);

  if (isVisual) {
    return (
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.lavender})`,
        borderRadius: 14, position: "relative",
        aspectRatio: "4 / 3",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <svg viewBox="0 0 200 150" style={{ width: "78%", height: "auto" }}>
          <ellipse cx="78"  cy="78" rx="44" ry="52" fill={COLORS.coral} opacity="0.78"/>
          <circle  cx="128" cy="60" r="30"          fill="#fff" opacity="0.7"/>
          <path    d="M30 116 L 170 116 L 148 138 L 52 138 Z" fill={COLORS.sky} opacity="0.7"/>
          <circle  cx="78"  cy="72" r="5"           fill={COLORS.text} opacity="0.35"/>
          <path    d="M62 84 Q78 96 94 84" stroke={COLORS.text} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>
        </svg>
        <div style={{
          position: "absolute", bottom: 14, left: 0, right: 0,
          textAlign: "center", fontSize: 10.5, fontWeight: 700,
          color: "#3C3489", letterSpacing: 0.8, textTransform: "uppercase",
        }}>Your submitted {workItem.type.toLowerCase()}</div>
      </div>
    );
  }

  if (isAudio) {
    // Simple waveform placeholder
    const bars = [10, 22, 16, 30, 18, 36, 24, 40, 28, 44, 30, 38, 22, 32, 18, 26, 14, 20, 12, 18, 10, 14, 8, 12];
    return (
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.sky}, ${COLORS.lavender})`,
        borderRadius: 14, position: "relative",
        aspectRatio: "4 / 3",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {bars.map((h, i) => (
            <div key={i} style={{
              width: 4, height: h * 1.4, borderRadius: 4,
              background: i === Math.floor(bars.length / 2) ? "#3C3489" : "rgba(60,52,137,0.55)",
            }}/>
          ))}
        </div>
        <div style={{
          position: "absolute", bottom: 14, left: 0, right: 0,
          textAlign: "center", fontSize: 10.5, fontWeight: 700,
          color: "#3C3489", letterSpacing: 0.8, textTransform: "uppercase",
        }}>Your submitted recording</div>
      </div>
    );
  }

  // Text work — lorem ipsum
  return (
    <div style={{
      background: "#F5F3F9", borderRadius: 14,
      padding: "18px 20px",
      fontSize: 13, lineHeight: 1.7, color: COLORS.text,
      maxHeight: 300, overflowY: "auto",
    }}>
      {PORTFOLIO_LOREM.map((p, i) => (
        <p key={i} style={{ margin: i === PORTFOLIO_LOREM.length - 1 ? 0 : "0 0 12px" }}>{p}</p>
      ))}
    </div>
  );
}

function ReflectionModal({ isOpen, onClose, workItem, existingReflection, onSave }) {
  const [text, setText] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(true);

  React.useEffect(() => {
    if (isOpen) {
      setText(existingReflection || "");
      setIsEditing(!existingReflection);
    }
  }, [isOpen, existingReflection]);

  if (!isOpen || !workItem) return null;

  const classColor = CLASS_COLORS[workItem.class];
  const isReadMode = !!existingReflection && !isEditing;

  const handlePromptClick = (prompt) => {
    setText(prev => prev ? prev + "\n\n" + prompt + " " : prompt + " ");
  };

  const handleSave = () => {
    if (text.trim()) {
      onSave(workItem.id, text.trim());
      setIsEditing(false);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div className="portfolio-card" style={{
        background: COLORS.surface, borderRadius: 24, padding: 32,
        width: "100%", maxWidth: 880, maxHeight: "88vh", overflowY: "auto",
        position: "relative",
      }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: COLORS.textSecondary, marginBottom: 6 }}>
              Reflection
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text, marginBottom: 8, fontFamily: "Fredoka, -apple-system, sans-serif", lineHeight: 1.25 }}>
              {workItem.title}
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <span className={`tag ${classColor?.tag}`}>{workItem.class}</span>
              <span style={{ fontSize: 11, color: COLORS.textSecondary }}>{workItem.type}</span>
              {workItem.grade && (
                <span style={{ fontSize: 12, fontWeight: 600, color: "#27500A" }}>{workItem.grade}</span>
              )}
              {workItem.returnedDate && (
                <span style={{ fontSize: 11, color: COLORS.textSecondary }}>Returned {workItem.returnedDate}</span>
              )}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: "#F5F3F9", border: "none", borderRadius: 8,
            width: 30, height: 30, cursor: "pointer", fontSize: 13,
            color: COLORS.textSecondary, fontFamily: "inherit", flexShrink: 0,
          }}>✕</button>
        </div>

        <div style={{ borderTop: "1px solid #E5E0F0", marginBottom: 22 }} />

        {/* Two-column body: Your work | Reflection */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
          {/* Left — your work preview + teacher feedback */}
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: COLORS.textSecondary, marginBottom: 10 }}>
              Your work
            </div>
            <WorkPreview workItem={workItem} />
            {workItem.feedback && (
              <div style={{
                marginTop: 14, padding: "12px 14px",
                background: "#F5F3F9", borderRadius: 12,
              }}>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: "#6B5FAA", marginBottom: 6 }}>
                  Feedback from {workItem.teacher}
                </div>
                <div style={{ fontSize: 12.5, color: COLORS.text, lineHeight: 1.6 }}>{workItem.feedback}</div>
              </div>
            )}
            {workItem.skills && workItem.skills.length > 0 && (
              <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
                {workItem.skills.map(s => (
                  <span key={s} style={{ fontSize: 11, color: "#7F77DD", fontWeight: 500 }}>
                    #{s.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right — reflection editor / viewer */}
          <div>
            {isReadMode ? (
              <>
                <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: COLORS.textSecondary, marginBottom: 10 }}>
                  Your reflection
                </div>
                <div style={{
                  background: "#F8F7FD", borderRadius: 12, padding: "14px 16px",
                  fontSize: 13, color: COLORS.text, lineHeight: 1.75, marginBottom: 16,
                  whiteSpace: "pre-wrap",
                }}>
                  {text}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                  <button onClick={() => setIsEditing(true)} style={{
                    padding: "8px 18px", borderRadius: 10, border: "1px solid #E5E0F0",
                    background: COLORS.surface, color: COLORS.text,
                    fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                  }}>Edit</button>
                  <button onClick={onClose} style={{
                    padding: "8px 20px", borderRadius: 10, border: "none",
                    background: COLORS.text, color: "#fff",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                  }}>Done</button>
                </div>
              </>
            ) : (
              <>
                {/* Prompt starters */}
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: COLORS.textSecondary, marginBottom: 8 }}>
                    Prompt starters
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {REFLECTION_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handlePromptClick(prompt)}
                        style={{
                          padding: "5px 12px", borderRadius: 20,
                          border: "1px solid #E5E0F0",
                          background: COLORS.surface, color: "#6B5FAA",
                          fontSize: 11, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                          transition: "all 150ms",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "#F5F3F9"; e.currentTarget.style.borderColor = "#C4B5FD"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = COLORS.surface; e.currentTarget.style.borderColor = "#E5E0F0"; }}
                      >{prompt}</button>
                    ))}
                  </div>
                </div>

                {/* Textarea */}
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Write your reflection here… What did you learn? What would you do differently? What are you proud of?"
                  style={{
                    width: "100%", minHeight: 200, boxSizing: "border-box",
                    borderRadius: 12, border: "1px solid #E5E0F0",
                    padding: "12px 14px", fontSize: 13, color: COLORS.text,
                    lineHeight: 1.75, resize: "vertical", fontFamily: "inherit",
                    outline: "none", background: "#FAFBFC", display: "block",
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = "#C4B5FD"; e.currentTarget.style.background = "#fff"; }}
                  onBlur={e => { e.currentTarget.style.borderColor = "#E5E0F0"; e.currentTarget.style.background = "#FAFBFC"; }}
                  autoFocus
                />

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 12, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 11, color: COLORS.textSecondary }}>
                    {text.length > 0 ? `${text.length} characters` : ""}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {existingReflection && (
                      <button onClick={() => { setText(existingReflection); setIsEditing(false); }} style={{
                        padding: "8px 18px", borderRadius: 10, border: "1px solid #E5E0F0",
                        background: COLORS.surface, color: COLORS.text,
                        fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                      }}>Cancel</button>
                    )}
                    <button
                      onClick={handleSave}
                      style={{
                        padding: "8px 20px", borderRadius: 10, border: "none",
                        background: text.trim() ? COLORS.text : "#ddd",
                        color: text.trim() ? "#fff" : "#999",
                        fontSize: 13, fontWeight: 600,
                        cursor: text.trim() ? "pointer" : "default",
                        fontFamily: "inherit", transition: "all 150ms",
                      }}
                    >
                      {existingReflection ? "Save changes" : "Submit reflection"}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabNav({ tabs, active, onTabChange }) {
  return (
    <div style={{
      display: "flex",
      gap: 0,
      borderBottom: `2px solid ${COLORS.border}`,
      marginBottom: 0,
      overflowX: "auto",
      background: COLORS.bg,
      paddingLeft: 20,
    }}>
      {tabs.map(tab => (
        <button key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={{
            padding: "14px 18px",
            fontSize: 14,
            fontWeight: active === tab.id ? 600 : 500,
            border: "none",
            background: "none",
            cursor: "pointer",
            color: active === tab.id ? COLORS.text : COLORS.textSecondary,
            borderBottom: active === tab.id ? `3px solid ${COLORS.mint}` : "3px solid transparent",
            marginBottom: -2,
            fontFamily: "Fredoka, -apple-system, sans-serif",
            transition: "all 200ms"
          }}
        >{tab.label}</button>
      ))}
    </div>
  );
}

function WorkItem({ item, showFeedback = false, reflection = null, onReflect = null, isPublicAdded = false, onAddToPublic = null }) {
  const daysUntilDue = item.daysUntilDue;
  const isUrgent = daysUntilDue && daysUntilDue <= 5;
  const classColor = CLASS_COLORS[item.class];

  return (
    <div style={{ padding: "10px 0", borderBottom: "0.5px solid #E5E0F0", display: "flex", flexDirection: "column", gap: 5 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#000", marginBottom: 2 }}>{item.title}</div>
          <div style={{ fontSize: 11, color: "#666", display: "flex", gap: 8, alignItems: "center" }}>
            <span className={`tag ${classColor.tag}`}>{item.class}</span>
            <span>{item.type}</span>
          </div>
        </div>
        <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
          {item.status === "in-progress" && (
            <div style={{ fontSize: 11, color: isUrgent ? "#A32D2D" : "#666" }}>
              Due {item.dueDate}
            </div>
          )}
          {item.status === "submitted" && (
            <div style={{ fontSize: 11, color: "#666" }}>Submitted {item.submittedDate}</div>
          )}
          {item.status === "returned" && (
            <>
              <div style={{ fontSize: 15, fontWeight: 500, color: "#27500A" }}>{item.grade}</div>
              <div style={{ fontSize: 10, color: "#999" }}>{item.returnedDate}</div>
            </>
          )}
        </div>
      </div>

      {item.status === "in-progress" && (
        <div style={{ display: "flex", gap: 5, marginTop: 5 }}>
          <button style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: "none", background: "#000", color: "#fff", cursor: "pointer", fontFamily: "inherit" }}>
            → Continue
          </button>
          <button style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, border: "0.5px solid #ddd", background: "#fff", color: "#000", cursor: "pointer", fontFamily: "inherit" }}>
            Coach
          </button>
        </div>
      )}

      {showFeedback && item.feedback && (
        <>
          {item.skills && item.skills.length > 0 && (
            <div style={{ marginTop: 5, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {item.skills.map(s => (
                <span key={s} style={{ fontSize: 11, color: "#7F77DD", fontWeight: 500 }}>
                  #{s.replace(/\s+/g, "")}
                </span>
              ))}
            </div>
          )}
          <div style={{ background: "#F5F3F9", borderRadius: 6, padding: "8px 10px", marginTop: 7, fontSize: 11, color: "#666", lineHeight: "1.5" }}>
            <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", color: "#999", marginBottom: 3 }}>Feedback from {item.teacher}</div>
            {item.feedback}
          </div>
        </>
      )}

      {/* Returned action row — reflection + public portfolio */}
      {item.status === "returned" && (
        <div style={{ marginTop: 10 }}>
          {/* Teacher recommendation badge — independent of button, shown only when flagged */}
          {item.featured && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: "#FEF3C7", color: "#92400E",
              borderRadius: 6, padding: "4px 9px", fontSize: 10, fontWeight: 600,
              marginBottom: 8,
            }}>
              <span>★</span> Teacher recommends adding to public portfolio
            </div>
          )}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {/* Reflection button */}
            {onReflect && (
              <button
                onClick={() => onReflect(item)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 11, padding: "5px 12px", borderRadius: 8,
                  border: reflection ? "none" : "1px solid #E5E0F0",
                  background: reflection ? "#EEF4EE" : COLORS.surface,
                  color: reflection ? "#27500A" : COLORS.textSecondary,
                  fontWeight: reflection ? 600 : 500,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 150ms",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = reflection ? "#E0EEE0" : "#F8F7FD"; }}
                onMouseLeave={e => { e.currentTarget.style.background = reflection ? "#EEF4EE" : COLORS.surface; }}
              >
                {reflection ? (
                  <>
                    <span style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: "#27500A", display: "inline-flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 9, color: "#fff", flexShrink: 0,
                    }}>✓</span>
                    View Reflection
                  </>
                ) : (
                  <><span style={{ fontSize: 13, lineHeight: 1 }}>+</span> Add Reflection</>
                )}
              </button>
            )}
            {/* Add to public portfolio button */}
            {onAddToPublic && (
              <button
                onClick={() => !isPublicAdded && onAddToPublic(item.id)}
                disabled={isPublicAdded}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  fontSize: 11, padding: "5px 12px", borderRadius: 8,
                  border: isPublicAdded ? "none" : "1px solid #E5E0F0",
                  background: isPublicAdded ? "#EEF4EE" : COLORS.surface,
                  color: isPublicAdded ? "#27500A" : COLORS.textSecondary,
                  fontWeight: isPublicAdded ? 600 : 500,
                  cursor: isPublicAdded ? "default" : "pointer",
                  fontFamily: "inherit", transition: "all 150ms", opacity: 1,
                }}
                onMouseEnter={e => { if (!isPublicAdded) e.currentTarget.style.background = "#F8F7FD"; }}
                onMouseLeave={e => { if (!isPublicAdded) e.currentTarget.style.background = COLORS.surface; }}
              >
                {isPublicAdded ? (
                  <>
                    <span style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: "#27500A", display: "inline-flex",
                      alignItems: "center", justifyContent: "center",
                      fontSize: 9, color: "#fff", flexShrink: 0,
                    }}>✓</span>
                    Added to public portfolio
                  </>
                ) : (
                  <><span style={{ fontSize: 13, lineHeight: 1 }}>+</span> Add to public portfolio</>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── PAGES ─────────────────────────────────────────────────────────── */

function PortfolioOverviewPage({ segments, publicWorkIds = new Set(), onAddToPublic = null }) {
  const [workTab, setWorkTab] = React.useState("p");
  const [reflections, setReflections] = React.useState({});
  const [reflectionItem, setReflectionItem] = React.useState(null);
  const inProgressWorks = WORK_ITEMS.filter(w => w.status === "in-progress");
  const submittedWorks = WORK_ITEMS.filter(w => w.status === "submitted");
  const returnedWorks = WORK_ITEMS.filter(w => w.status === "returned");
  const avgGrade = Math.round(WORK_ITEMS.filter(w => w.gradePoints).reduce((s, w) => s + w.gradePoints, 0) / WORK_ITEMS.filter(w => w.gradePoints).length);

  const handleSaveReflection = (itemId, text) => {
    setReflections(prev => ({ ...prev, [itemId]: text }));
    setReflectionItem(null);
  };

  return (
    <div className="portfolio-page" style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div style={{ padding: "48px 40px" }}>

      {/* Welcome banner */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.mint} 0%, ${COLORS.coral} 100%)`, borderRadius: 24, padding: "40px", marginBottom: 48, boxShadow: COLORS.shadow, position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32, position: "relative", zIndex: 2 }}>
          <div>
            <div style={{ fontSize: 24, fontWeight: 700, color: "#1a3a2a", marginBottom: 8, fontFamily: "Fredoka, -apple-system, sans-serif" }}>Good morning, Alex. 👋</div>
            <div style={{ fontSize: 15, color: "#2d5a45", lineHeight: 1.5 }}>2 assignments due this week · 1 piece awaiting feedback</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: "#1a3a2a", lineHeight: 1 }}>{avgGrade}%</div>
            <div style={{ fontSize: 12, color: "#2d5a45", marginTop: 6 }}>overall avg · 5 classes</div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid rgba(26, 58, 42, 0.2)`, paddingTop: 24, display: "flex", gap: 8 }}>
          {Object.entries(CLASS_COLORS).map(([className, info]) => (
            <div key={className} style={{ flex: 1, background: "rgba(255, 255, 255, 0.7)", borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 500, backdropFilter: "blur(8px)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: info.dot, flexShrink: 0 }} />
              <span style={{ flex: 1, color: "#1a3a2a" }}>{className}</span>
              <span style={{ color: "#1a3a2a", fontWeight: 600 }}>{info.grade}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Summary bar */}
      <SummaryBar stats={[
        { label: "Avg grade", value: `${avgGrade}%`, sub: "across 5 classes", bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26" },
        { label: "Works this term", value: `${WORK_ITEMS.length}`, sub: "across all classes", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
        { label: "Skills earned", value: `${SKILLS_DATA.length}`, sub: "from teacher feedback", bg: "linear-gradient(135deg, #E8D5F2 0%, #D4C5F0 100%)", text: "#3C3489" },
        { label: "Achievements", value: `${ACHIEVEMENTS_DATA.length}`, sub: "milestones unlocked", bg: "linear-gradient(135deg, #FFF4D4 0%, #FFE9A0 100%)", text: "#7C4E00" },
      ]} />

      {/* Two-column: My Work (60%) + Skills/Achievements (40%) */}
      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 24, marginBottom: 48 }}>
        {/* My Work Panel */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 600, display: "flex", gap: 10, alignItems: "center", color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>
              <div style={{ width: 36, height: 36, borderRadius: 12, background: COLORS.yellow, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>📄</div>
              My Work
            </div>
            <a href="#/my-portfolio/my-work" style={{ fontSize: 13, color: COLORS.mint, textDecoration: "none", fontWeight: 600 }}>See more →</a>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 3, background: COLORS.bg, borderRadius: 12, padding: 4, marginBottom: 20 }}>
            {[{id: "p", label: `In Progress (${inProgressWorks.length})`}, {id: "s", label: `Submitted (${submittedWorks.length})`}, {id: "r", label: `Returned (${returnedWorks.length})`}].map(tab => (
              <button key={tab.id} onClick={() => setWorkTab(tab.id)} style={{ flex: 1, fontSize: 13, padding: "8px 12px", borderRadius: 10, border: "none", background: workTab === tab.id ? COLORS.surface : "transparent", color: workTab === tab.id ? COLORS.text : COLORS.textSecondary, fontWeight: workTab === tab.id ? 600 : 500, cursor: "pointer", fontFamily: "Fredoka, -apple-system, sans-serif", boxShadow: workTab === tab.id ? "0 2px 8px rgba(0,0,0,0.06)" : "none", transition: "all 150ms" }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Work items */}
          {workTab === "p" && inProgressWorks.slice(0, 3).map(w => <WorkItem key={w.id} item={w} />)}
          {workTab === "s" && submittedWorks.slice(0, 2).map(w => <WorkItem key={w.id} item={w} />)}
          {workTab === "r" && (
            <div style={{ maxHeight: 320, overflowY: "auto", paddingRight: 4 }}>
              {returnedWorks.map(w => (
                <WorkItem
                  key={w.id}
                  item={w}
                  showFeedback
                  reflection={reflections[w.id] || null}
                  onReflect={setReflectionItem}
                  isPublicAdded={publicWorkIds.has(w.id)}
                  onAddToPublic={onAddToPublic}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right column: Skills + Achievements */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Skills Panel */}
          <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>✨ Skills & Growth</div>
              <a href="#/my-portfolio/skills" style={{ fontSize: 13, color: COLORS.mint, textDecoration: "none", fontWeight: 600 }}>See more →</a>
            </div>
            {SKILLS_DATA.slice(0, 3).map(skill => (
              <div key={skill.name} style={{ paddingBottom: 8, borderBottom: "0.5px solid #E5E0F0", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13 }}>
                  <span style={{ fontWeight: 500 }}>{skill.name}</span>
                  <span style={{ fontSize: 11, color: "#666" }}>{skill.works.length} works</span>
                </div>
                <div style={{ height: 3, background: "#E5E0F0", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#7F77DD", width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
            <div style={{ background: "#F5F3F9", borderRadius: 7, padding: "9px 11px", marginTop: 9, fontSize: 12, color: "#185FA5" }}>
              <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", color: "#999", marginBottom: 2 }}>Next step</div>
              Keep documenting evidence
            </div>
          </div>

          {/* Achievements Panel */}
          <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>🏆 Achievements</div>
              <a href="#/my-portfolio/achievements" style={{ fontSize: 13, color: COLORS.mint, textDecoration: "none", fontWeight: 600 }}>See more →</a>
            </div>
            {ACHIEVEMENTS_DATA.slice(0, 3).map(ach => (
              <div key={ach.id} style={{ display: "flex", gap: 8, alignItems: "flex-start", paddingBottom: 7, borderBottom: "0.5px solid #E5E0F0", marginBottom: 8 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "#F5F3F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>🏆</div>
                <div style={{ fontSize: 11 }}>
                  <div style={{ fontWeight: 500, color: "#000" }}>{ach.name}</div>
                  <div style={{ fontSize: 10, color: "#999", marginTop: 1 }}>{ach.earned}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 11, color: "#666", marginTop: 8 }}>Earn 1 more achievement</div>
          </div>
        </div>
      </div>

      {/* Bottom row: Reflections + Class Gallery */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {/* Reflections */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>💭 Recent Reflections</div>
            <a href="#/my-portfolio/reflections" style={{ fontSize: 13, color: COLORS.mint, textDecoration: "none", fontWeight: 600 }}>See more →</a>
          </div>
          {REFLECTIONS_DATA.slice(0, 2).map(ref => (
            <div key={ref.id} style={{ paddingBottom: 7, borderBottom: "0.5px solid #E5E0F0", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{ref.title}</div>
                <div style={{ fontSize: 10, color: "#999" }}>{ref.date}</div>
              </div>
              <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {ref.text}
              </div>
            </div>
          ))}
          <div style={{ background: "#F5F3F9", borderRadius: 7, padding: "9px 11px", marginTop: 9, fontSize: 11, color: "#666", fontStyle: "italic" }}>
            "What did you learn about yourself?"
          </div>
        </div>

        {/* Class Gallery Preview */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>👥 Classmates' Work</div>
            <a href="#/my-portfolio/shared" style={{ fontSize: 13, color: COLORS.mint, textDecoration: "none", fontWeight: 600 }}>See more →</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, marginBottom: 9 }}>
            {SHARED_PORTFOLIOS.slice(0, 3).map(item => (
              <div key={item.id} style={{ border: "0.5px solid #E5E0F0", borderRadius: 8, overflow: "hidden" }}>
                <div style={{ height: 38, background: "#E5E0F0", display: "flex", alignItems: "center", justifyContent: "center" }}>📦</div>
                <div style={{ padding: "6px 7px" }}>
                  <div style={{ fontSize: 10, fontWeight: 500, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: 10, color: "#999", marginTop: 2 }}>{item.peer}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: "#666" }}>You have <strong>4</strong> featured pieces</div>
        </div>
      </div>

      </div>

      {/* Reflection modal (from overview returned work) */}
      {reflectionItem && (
        <ReflectionModal
          isOpen={true}
          item={reflectionItem}
          existingReflection={reflections[reflectionItem.id] || null}
          onSave={(text) => handleSaveReflection(reflectionItem.id, text)}
          onClose={() => setReflectionItem(null)}
        />
      )}
    </div>
  );
}

function PortfolioMyWorkPage({ segments, publicWorkIds = new Set(), onAddToPublic = null }) {
  const [selectedClass, setSelectedClass] = React.useState("All classes");
  const [selectedStatus, setSelectedStatus] = React.useState("all");
  const [reflections, setReflections] = React.useState({});
  const [reflectionItem, setReflectionItem] = React.useState(null);

  const handleSaveReflection = (workId, text) => {
    setReflections(prev => ({ ...prev, [workId]: text }));
    setReflectionItem(null);
  };

  const classOptions = ["All classes", ...Object.keys(CLASS_COLORS)];
  const filteredWorks = WORK_ITEMS.filter(w => {
    const classMatch = selectedClass === "All classes" || w.class === selectedClass;
    const statusMatch = selectedStatus === "all" || w.status === selectedStatus;
    return classMatch && statusMatch;
  });

  const inProgressWorks = filteredWorks.filter(w => w.status === "in-progress");
  const submittedWorks = filteredWorks.filter(w => w.status === "submitted");
  const returnedWorks = filteredWorks.filter(w => w.status === "returned");

  const allInProgress = WORK_ITEMS.filter(w => w.status === "in-progress");
  const allSubmitted  = WORK_ITEMS.filter(w => w.status === "submitted");
  const allReturned   = WORK_ITEMS.filter(w => w.status === "returned");
  const allGraded     = WORK_ITEMS.filter(w => w.gradePoints);
  const overallAvg    = allGraded.length ? Math.round(allGraded.reduce((s, w) => s + w.gradePoints, 0) / allGraded.length) : 0;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 210px", gap: 24, padding: "40px" }}>
      <div>
        {/* Summary bar */}
        <SummaryBar stats={[
          { label: "In progress", value: `${allInProgress.length}`, sub: "assignments due soon", bg: "linear-gradient(135deg, #FFD4B4 0%, #FFC49A 100%)", text: "#7C2D12" },
          { label: "Submitted", value: `${allSubmitted.length}`, sub: "awaiting grades", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
          { label: "Returned", value: `${allReturned.length}`, sub: "with teacher feedback", bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26" },
          { label: "Avg grade", value: `${overallAvg}%`, sub: "on returned work", bg: "linear-gradient(135deg, #FFF4D4 0%, #FFE9A0 100%)", text: "#7C4E00" },
        ]} />

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
          <div>
            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} style={{ appearance: "none", background: "#fff", border: "0.5px solid #ddd", borderRadius: 6, padding: "5px 10px", fontSize: 12, cursor: "pointer", paddingRight: 28, fontFamily: "inherit", color: "#000" }}>
              {classOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", gap: 2, background: "#F5F3F9", borderRadius: 8, padding: 3, width: "fit-content" }}>
            {[{id: "all", label: "All"}, {id: "in-progress", label: "In Progress"}, {id: "submitted", label: "Submitted"}, {id: "returned", label: "Returned"}].map(s => (
              <button key={s.id} onClick={() => setSelectedStatus(s.id)} style={{ fontSize: 12, padding: "5px 13px", borderRadius: 6, border: "none", background: selectedStatus === s.id ? "#fff" : "none", color: selectedStatus === s.id ? "#000" : "#666", fontWeight: selectedStatus === s.id ? 500 : 400, cursor: "pointer", fontFamily: "inherit" }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {inProgressWorks.length > 0 && (
          <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, marginBottom: 24, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>📝 In Progress</div>
            {inProgressWorks.map(w => <WorkItem key={w.id} item={w} />)}
          </div>
        )}

        {submittedWorks.length > 0 && (
          <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, marginBottom: 24, border: "1px solid #e5e7eb" }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>⏳ Submitted — Awaiting Grade</div>
            {submittedWorks.map(w => <WorkItem key={w.id} item={w} />)}
          </div>
        )}

        {returnedWorks.length > 0 && (
          <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, marginBottom: 24, border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>✅ Returned — Last 2 Weeks</div>
              <a href="#" style={{ fontSize: 11, color: "#185FA5", textDecoration: "none" }}>View all feedback →</a>
            </div>
            {returnedWorks.map(w => (
              <WorkItem
                key={w.id}
                item={w}
                showFeedback
                reflection={reflections[w.id] || null}
                onReflect={setReflectionItem}
                isPublicAdded={publicWorkIds.has(w.id)}
                onAddToPublic={onAddToPublic}
              />
            ))}
          </div>
        )}

        {filteredWorks.length === 0 && (
          <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 48, textAlign: "center", color: COLORS.textSecondary, fontSize: 14, border: "1px solid #e5e7eb" }}>
            No work items match this filter.
          </div>
        )}
      </div>

      {/* Reflection modal — rendered at page level to avoid z-index issues */}
      <ReflectionModal
        isOpen={reflectionItem !== null}
        onClose={() => setReflectionItem(null)}
        workItem={reflectionItem}
        existingReflection={reflectionItem ? (reflections[reflectionItem.id] || null) : null}
        onSave={handleSaveReflection}
      />

      {/* Right sidebar */}
      <div>
        {/* Work Summary */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 24, marginBottom: 24, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>📊 Work Summary</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 12 }}>
            <div style={{ background: COLORS.mint, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{WORK_ITEMS.length}</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Total works</div>
            </div>
            <div style={{ background: COLORS.yellow, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>92%</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Avg grade</div>
            </div>
            <div style={{ background: COLORS.coral, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{inProgressWorks.length}</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>In progress</div>
            </div>
            <div style={{ background: COLORS.sky, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{returnedWorks.length}</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Returned</div>
            </div>
          </div>

          {/* By Class */}
          <div style={{ borderTop: "0.5px solid #E5E0F0", paddingTop: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", color: "#999", marginBottom: 8 }}>By Class</div>
            {Object.entries(CLASS_COLORS).map(([className, info]) => (
              <div key={className} style={{ display: "flex", alignItems: "center", gap: 7, paddingBottom: 6, borderBottom: "0.5px solid #E5E0F0", marginBottom: 6, fontSize: 11 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: info.dot }} />
                <span style={{ flex: 1 }}>{className}</span>
                <span style={{ fontWeight: 500 }}>{info.grade}</span>
                <span style={{ color: "#999" }}>100%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function PortfolioSkillsPage({ segments }) {
  const topSkill = SKILLS_DATA.reduce((a, b) => a.level > b.level ? a : b, SKILLS_DATA[0]);
  const totalWorksWithSkills = WORK_ITEMS.filter(w => w.skills && w.skills.length > 0).length;
  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 205px", gap: 24, padding: "40px" }}>
      <div>
        {/* Summary bar */}
        <SummaryBar stats={[
          { label: "Skills shown", value: `${SKILLS_DATA.length}`, sub: "tagged by teachers", bg: "linear-gradient(135deg, #E8D5F2 0%, #D4C5F0 100%)", text: "#3C3489" },
          { label: "Top level", value: `${topSkill.level}`, sub: `${topSkill.name}`, bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26" },
          { label: "Works tagged", value: `${totalWorksWithSkills}`, sub: "across all classes", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
          { label: "Classes covered", value: `${Object.keys(CLASS_COLORS).length}`, sub: "skill-tagged subjects", bg: "linear-gradient(135deg, #FFD4B4 0%, #FFC49A 100%)", text: "#7C2D12" },
        ]} />

        <div style={{ background: "#E8F4F8", borderRadius: 8, padding: "11px 13px", fontSize: 12, color: "#185FA5", lineHeight: 1.6, marginBottom: 14 }}>
          Skills are tagged by your teachers when they grade your work. As you submit more assignments, your skill profile grows.
        </div>

        {/* Your Skills Card */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
          {SKILLS_DATA.map((skill, idx) => {
            const colors = [COLORS.mint, COLORS.coral, COLORS.lavender, COLORS.sky, COLORS.yellow];
            const bgColor = colors[idx % colors.length];
            return (
              <div key={skill.name} style={{ background: bgColor, borderRadius: 16, padding: 18, boxShadow: COLORS.shadow }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#1a3a2a" }}>{skill.name}</span>
                  <span style={{ fontSize: 12, color: "#1a3a2a", opacity: 0.75 }}>{skill.works.length} works</span>
                </div>
                <div style={{ height: 4, background: "rgba(0,0,0,0.15)", borderRadius: 2, overflow: "hidden", marginBottom: 10 }}>
                  <div style={{ height: "100%", background: "rgba(0,0,0,0.35)", width: `${skill.level}%` }} />
                </div>
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap", marginBottom: 8 }}>
                  {skill.sources.slice(0, 2).map(s => <span key={s} style={{ fontSize: 10, color: "#1a3a2a", opacity: 0.7, background: "rgba(0,0,0,0.1)", padding: "3px 7px", borderRadius: 4 }}>{s}</span>)}
                </div>
                <div style={{ fontSize: 11, color: "#1a3a2a", opacity: 0.85 }}>Continue building →</div>
              </div>
            );
          })}
        </div>

        {/* How Skills Were Tagged */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>🏷️ How Your Skills Were Tagged</div>
          {WORK_ITEMS.filter(w => w.status === "returned").map(work => (
            <div key={work.id} style={{ paddingBottom: 8, borderBottom: "0.5px solid #E5E0F0", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{work.title}</div>
                  <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>
                    {work.teacher}, {work.class}
                  </div>
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#27500A" }}>{work.grade}</div>
              </div>
              <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {work.skills.map(s => <span key={s} className="tag-skill" style={{ fontSize: 10 }}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>📈 Growth Snapshot</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 12 }}>
            <div style={{ background: COLORS.lavender, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{SKILLS_DATA.length}</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Skills shown</div>
            </div>
            <div style={{ background: COLORS.mint, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>5</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Classes covered</div>
            </div>
          </div>
          <div style={{ borderTop: "0.5px solid #E5E0F0", paddingTop: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", color: "#999", marginBottom: 3 }}>Strongest class</div>
            <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>English Lit</div>
            <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5, marginBottom: 12 }}>
              You've earned communication and critical thinking skills primarily in this class.
            </div>
            <div style={{ fontSize: 10, fontWeight: 500, textTransform: "uppercase", color: "#999", marginBottom: 3 }}>Skill gap</div>
            <div style={{ fontSize: 11, color: "#666", lineHeight: 1.5 }}>
              Creativity hasn't appeared in recent work. Look for projects that let you innovate.
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function PortfolioReflectionsPage({ segments }) {
  const uniqueClasses = [...new Set(REFLECTIONS_DATA.map(r => r.class))];
  const avgWords = Math.round(REFLECTIONS_DATA.reduce((s, r) => s + r.text.split(" ").length, 0) / REFLECTIONS_DATA.length);
  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, padding: "40px" }}>
      <div>
        {/* Summary bar */}
        <SummaryBar stats={[
          { label: "Reflections", value: `${REFLECTIONS_DATA.length}`, sub: "written this term", bg: "linear-gradient(135deg, #E8D5F2 0%, #D4C5F0 100%)", text: "#3C3489" },
          { label: "This month", value: "2", sub: "recent entries", bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26" },
          { label: "Avg length", value: `~${avgWords}`, sub: "words per reflection", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
          { label: "Classes", value: `${uniqueClasses.length}`, sub: "subjects explored", bg: "linear-gradient(135deg, #FFF4D4 0%, #FFE9A0 100%)", text: "#7C4E00" },
        ]} />

        <button style={{ float: "right", fontSize: 12, padding: "6px 14px", borderRadius: 6, border: "0.5px solid #ddd", background: "#fff", cursor: "pointer", fontFamily: "inherit", marginBottom: 14 }}>
          + New reflection
        </button>
        <div style={{ clear: "both" }} />

        {REFLECTIONS_DATA.map((ref, idx) => {
          const colors = [COLORS.lavender, COLORS.sky, COLORS.mint];
          const bgColor = colors[idx % colors.length];
          return (
            <div key={ref.id} style={{ background: bgColor, borderRadius: 16, padding: 18, marginBottom: 12, boxShadow: COLORS.shadow }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#1a3a2a" }}>{ref.title}</div>
                <div style={{ fontSize: 11, color: "#1a3a2a", opacity: 0.75 }}>{ref.date}</div>
              </div>
              <div style={{ fontSize: 13, color: "#1a3a2a", lineHeight: 1.6, marginBottom: 8 }}>{ref.text}</div>
              <div style={{ fontSize: 12, color: "#1a3a2a", fontStyle: "italic", opacity: 0.8 }}>"{ref.prompt}"</div>
            </div>
          );
        })}
      </div>

      {/* Right sidebar */}
      <div>
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>💡 Reflection Prompts</div>
          {[
            "What did you learn about yourself today?",
            "How did feedback help you grow?",
            "What challenge did you overcome?"
          ].map((prompt, i) => (
            <div key={i} style={{ background: "#F5F3F9", borderRadius: 8, padding: 11, marginBottom: 8, fontSize: 12, color: "#666", lineHeight: 1.5, cursor: "pointer" }}>
              {prompt}
            </div>
          ))}
          <div style={{ borderTop: "0.5px solid #E5E0F0", paddingTop: 12, marginTop: 12 }}>
            <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>
              <strong>14</strong> reflections written<br />
              <strong>Last week</strong>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function PortfolioAchievementsPage({ segments }) {
  const earned = ACHIEVEMENTS_DATA.slice(0, 3);
  const inReach = ACHIEVEMENTS_DATA.slice(3);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, padding: "40px" }}>
      <div>
        {/* Summary bar */}
        <SummaryBar stats={[
          { label: "Earned", value: `${earned.length}`, sub: "badges unlocked", bg: "linear-gradient(135deg, #FFF4D4 0%, #FFE9A0 100%)", text: "#7C4E00" },
          { label: "In reach", value: `${inReach.length}`, sub: "close to unlocking", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
          { label: "Categories", value: "4", sub: "skill areas covered", bg: "linear-gradient(135deg, #E8D5F2 0%, #D4C5F0 100%)", text: "#3C3489" },
          { label: "Streak", value: "3 wks", sub: "on-time submissions", bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26" },
        ]} />

        {/* Earned */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, marginBottom: 24, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>⭐ Earned</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {earned.map((ach, idx) => {
              const colors = [COLORS.yellow, COLORS.coral, COLORS.mint];
              const bgColor = colors[idx % colors.length];
              return (
                <div key={ach.id} style={{ background: bgColor, borderRadius: 16, padding: 16, boxShadow: COLORS.shadow }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 18 }}>🏆</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "#1a3a2a" }}>{ach.name}</div>
                  <div style={{ fontSize: 11, color: "#1a3a2a", lineHeight: 1.5, marginBottom: 6, opacity: 0.9 }}>{ach.description}</div>
                  <div style={{ fontSize: 10, color: "#1a3a2a", fontWeight: 500 }}>{ach.earned}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* In Reach */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>🎯 In Reach</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {inReach.map((ach, idx) => {
              const colors = [COLORS.sky, COLORS.lavender];
              const bgColor = colors[idx % colors.length];
              return (
                <div key={ach.id} style={{ background: bgColor, borderRadius: 16, padding: 16, boxShadow: COLORS.shadow, opacity: 0.7 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 18 }}>🔒</div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4, color: "#1a3a2a" }}>{ach.name}</div>
                  <div style={{ fontSize: 11, color: "#1a3a2a", lineHeight: 1.5, marginBottom: 6 }}>{ach.description}</div>
                  <div style={{ fontSize: 10, color: "#1a3a2a", fontWeight: 500 }}>2 more works needed</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>🚀 Progress</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 12 }}>
            <div style={{ background: COLORS.yellow, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{earned.length}</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Earned</div>
            </div>
            <div style={{ background: COLORS.sky, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>{inReach.length}</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>In reach</div>
            </div>
          </div>
          <div style={{ fontSize: 11, color: "#666", lineHeight: 1.6 }}>
            Achievements unlock automatically as you build skills and submit work. Each badge represents meaningful progress.
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

function PortfolioSharedPage({ segments }) {
  const [selectedSubject, setSelectedSubject] = React.useState("All");
  const subjects = ["All", "Biology", "English Lit", "Algebra II", "History", "Spanish II"];

  const filteredWorks = selectedSubject === "All"
    ? SHARED_PORTFOLIOS
    : SHARED_PORTFOLIOS.filter(w => w.class === selectedSubject);

  const likedCount  = SHARED_PORTFOLIOS.filter(w => w.liked).length;
  const peersCount  = [...new Set(SHARED_PORTFOLIOS.map(w => w.peer))].length;
  const featuredCount = WORK_ITEMS.filter(w => w.featured).length;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 210px", gap: 24, padding: "40px" }}>
      <div>
        {/* Summary bar */}
        <SummaryBar stats={[
          { label: "Classmates", value: `${peersCount}`, sub: "with shared portfolios", bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26" },
          { label: "Pieces", value: `${SHARED_PORTFOLIOS.length}`, sub: "available to view", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
          { label: "Liked", value: `${likedCount}`, sub: "pieces you appreciated", bg: "linear-gradient(135deg, #FFD4B4 0%, #FFC49A 100%)", text: "#7C2D12" },
          { label: "Your featured", value: `${featuredCount}`, sub: "pieces visible to others", bg: "linear-gradient(135deg, #FFF4D4 0%, #FFE9A0 100%)", text: "#7C4E00" },
        ]} />

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
          {subjects.map(subject => (
            <button key={subject} onClick={() => setSelectedSubject(subject)} style={{
              fontSize: 12, padding: "5px 12px", borderRadius: 20, border: "0.5px solid #ddd", background: selectedSubject === subject ? "#000" : "#fff", color: selectedSubject === subject ? "#fff" : "#666", cursor: "pointer", fontFamily: "inherit", fontWeight: selectedSubject === subject ? 500 : 400
            }}>
              {subject}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 11 }}>
          {filteredWorks.map((work, idx) => {
            const colors = [COLORS.mint, COLORS.coral, COLORS.lavender, COLORS.sky, COLORS.yellow, COLORS.mint];
            const bgColor = colors[idx % colors.length];
            return (
              <div key={work.id} style={{ background: bgColor, borderRadius: 14, overflow: "hidden", cursor: "pointer", boxShadow: COLORS.shadow }}>
                <div style={{ height: 80, background: "rgba(0,0,0,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>📄</div>
                <div style={{ padding: 14, color: "#1a3a2a" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                    {work.title}
                  </div>
                  <div style={{ fontSize: 11, marginBottom: 8, display: "flex", gap: 4, opacity: 0.8 }}>
                    <span style={{ background: "rgba(0,0,0,0.1)", padding: "2px 6px", borderRadius: 4 }}>{work.class}</span>
                    <span style={{ background: "rgba(0,0,0,0.1)", padding: "2px 6px", borderRadius: 4 }}>{work.type}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, opacity: 0.85 }}>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 600 }}>
                        {work.peer.split(" ")[0][0]}
                      </div>
                      <span>{work.peer}</span>
                    </div>
                    <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, padding: 0, color: work.liked ? "#d1557c" : "#1a3a2a", opacity: work.liked ? 1 : 0.7 }}>
                      ♥ {work.likes}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sidebar */}
      <div>
        {/* Your Featured Work */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, marginBottom: 24, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 20, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif" }}>⭐ Your Featured Work</div>
          {WORK_ITEMS.filter(w => w.featured).map(work => (
            <div key={work.id} style={{ display: "flex", alignItems: "flex-start", gap: 9, paddingBottom: 11, marginBottom: 8, borderBottom: "0.5px solid #E5E0F0" }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: "#F5F3F9", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>📄</div>
              <div style={{ flex: 1, fontSize: 11 }}>
                <div style={{ fontWeight: 500, marginBottom: 2 }}>{work.title}</div>
                <div style={{ color: "#666", marginBottom: 2 }}>
                  <span className={`tag ${CLASS_COLORS[work.class]?.tag}`}>{work.class}</span>
                </div>
                <div style={{ background: "#EAF3DE", color: "#27500A", display: "inline-block", fontSize: 10, padding: "2px 7px", borderRadius: 4, marginTop: 4 }}>Visible to class</div>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#999", padding: 0 }}>✕</button>
            </div>
          ))}
          <button style={{ width: "100%", padding: 9, border: "1px dashed #ddd", borderRadius: 9, background: "none", fontSize: 12, color: "#999", cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}>
            + Feature another piece
          </button>
        </div>

        {/* Stats */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, marginBottom: 24, border: "1px solid #e5e7eb" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 12 }}>
            <div style={{ background: COLORS.coral, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>6</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Works shared</div>
            </div>
            <div style={{ background: COLORS.sky, borderRadius: 12, padding: 12, textAlign: "center", color: "#1a3a2a" }}>
              <div style={{ fontSize: 17, fontWeight: 600 }}>24</div>
              <div style={{ fontSize: 10, marginTop: 3 }}>Classmates</div>
            </div>
          </div>
        </div>

        {/* What's Visible */}
        <div className="portfolio-card" style={{ background: COLORS.surface, borderRadius: 24, padding: 28, border: "1px solid #e5e7eb" }}>
          <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 8 }}>What's visible:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, fontSize: 11 }}>
            <div>✓ Work title</div>
            <div>✓ Subject</div>
            <div>✓ Teacher name</div>
            <div>✗ Grade</div>
            <div>✗ Teacher feedback</div>
            <div>✗ Your reflections</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

// ── Mock data: files available from "My Materials / My Files" ────────────
const PLATFORM_FILES_MOCK = [
  { id: "pf1", name: "Cell Division Diagram.pdf",   type: "PDF", class: "Biology",     size: "245 KB", updated: "May 8"  },
  { id: "pf2", name: "Cell Structure Sketch.jpg",   type: "JPG", class: "Biology",     size: "1.2 MB", updated: "May 6"  },
  { id: "pf3", name: "Persuasive Essay Draft.docx", type: "DOC", class: "English Lit", size: "38 KB",  updated: "May 11" },
  { id: "pf4", name: "Watercolour Portrait.jpg",    type: "JPG", class: "Art",         size: "3.4 MB", updated: "Apr 29" },
  { id: "pf5", name: "Algebra Problem Set.pdf",     type: "PDF", class: "Algebra II",  size: "156 KB", updated: "May 3"  },
  { id: "pf6", name: "Charcoal Still Life.jpg",     type: "JPG", class: "Art",         size: "2.1 MB", updated: "May 1"  },
  { id: "pf7", name: "Spanish Vocab Notes.pdf",     type: "PDF", class: "Spanish III", size: "89 KB",  updated: "Apr 25" },
  { id: "pf8", name: "History Timeline.xlsx",       type: "XLS", class: "US History",  size: "512 KB", updated: "May 7"  },
];

const FILE_TYPE_BADGE = {
  PDF: { bg: "#FFE0D4", color: "#993c1d", icon: "📄" },
  JPG: { bg: "#D4E8FF", color: "#185fa5", icon: "🖼️" },
  PNG: { bg: "#D4E8FF", color: "#185fa5", icon: "🖼️" },
  DOC: { bg: "#E0D4FF", color: "#4a32b5", icon: "📝" },
  XLS: { bg: "#D4F0D4", color: "#27500A", icon: "📊" },
  MP4: { bg: "#FFE8D4", color: "#c45c00", icon: "🎬" },
};

function AddPieceModal({ subject, publicWorkIds, onAddToPublic, onClose }) {
  const [source,       setSource]       = React.useState("class-work"); // "class-work" | "upload" | "platform"
  const [selected,     setSelected]     = React.useState(null);   // WORK_ITEMS id
  const [uploadFile,   setUploadFile]   = React.useState(null);   // mock upload obj
  const [uploadTitle,  setUploadTitle]  = React.useState("");
  const [platformSel,  setPlatformSel]  = React.useState(null);   // platform file id
  const [pieceSubject, setPieceSubject] = React.useState(subject); // subject for this piece
  const [statement,    setStatement]    = React.useState("");
  const [dragOver,     setDragOver]     = React.useState(false);

  const available = WORK_ITEMS.filter(
    w => w.status === "returned" && w.class === subject && !publicWorkIds.has(w.id)
  );

  const canAdd =
    !!pieceSubject && (
      (source === "class-work" && !!selected)    ||
      (source === "upload"     && !!uploadFile)  ||
      (source === "platform"   && !!platformSel)
    );

  const handleAdd = () => {
    if (!canAdd) return;
    if (source === "class-work" && selected) onAddToPublic(selected);
    // upload / platform: real app would call an API — this is a mockup
    onClose();
  };

  const handleMockFileSelect = () => {
    setUploadFile({ name: "my_artwork.jpg", type: "JPG", size: "2.4 MB" });
    setUploadTitle("My Artwork");
  };

  const switchSource = (id) => {
    setSource(id);
    setSelected(null); setUploadFile(null); setPlatformSel(null);
  };

  const SOURCE_OPTS = [
    { id: "class-work", icon: "📚", label: "Class work",    desc: "Teacher-assigned, returned work" },
    { id: "upload",     icon: "💻", label: "Upload file",   desc: "PDF, JPG, PNG from your device"  },
    { id: "platform",   icon: "📁", label: "From My Files", desc: "Link existing platform media"    },
  ];

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000, padding: 24,
      }}
    >
      <div style={{
        background: COLORS.surface, borderRadius: 24, padding: 32,
        width: "100%", maxWidth: 560,
        boxShadow: "0 12px 48px rgba(0,0,0,0.2)",
        maxHeight: "90vh", overflowY: "auto",
      }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif", marginBottom: 3 }}>
              Add to portfolio · {subject}
            </div>
            <div style={{ fontSize: 12, color: COLORS.textSecondary }}>Choose a source for this piece</div>
          </div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: "50%", border: "none",
            background: "#F0EEF8", color: COLORS.textSecondary,
            fontSize: 14, cursor: "pointer", fontFamily: "inherit",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>✕</button>
        </div>

        {/* ── Source selector ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 24 }}>
          {SOURCE_OPTS.map(opt => {
            const active = source === opt.id;
            return (
              <button key={opt.id} onClick={() => switchSource(opt.id)}
                style={{
                  padding: "14px 10px", borderRadius: 14, cursor: "pointer", textAlign: "center",
                  border: active ? "2px solid #7F77DD" : "1.5px solid #E5E0F0",
                  background: active ? "#F0EEF8" : COLORS.surface,
                  fontFamily: "inherit", transition: "all 150ms",
                }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{opt.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: active ? "#7F77DD" : COLORS.text, marginBottom: 3 }}>{opt.label}</div>
                <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.4 }}>{opt.desc}</div>
              </button>
            );
          })}
        </div>

        {/* ── Subject selector ── */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.text, display: "block", marginBottom: 6 }}>
            Subject / category
            {source === "class-work" && (
              <span style={{ fontWeight: 400, color: COLORS.textSecondary, marginLeft: 6 }}>— set by the assignment</span>
            )}
          </label>
          <div style={{ position: "relative" }}>
            <select
              value={pieceSubject}
              onChange={e => setPieceSubject(e.target.value)}
              disabled={source === "class-work" && !!selected}
              style={{
                width: "100%", padding: "10px 36px 10px 12px", borderRadius: 10,
                border: "1.5px solid #E5E0F0", fontSize: 13, color: COLORS.text,
                fontFamily: "inherit", appearance: "none", outline: "none",
                background: (source === "class-work" && !!selected) ? "#f5f5f5" : COLORS.surface,
                cursor: (source === "class-work" && !!selected) ? "default" : "pointer",
              }}
            >
              <option value="">— choose a subject —</option>
              {/* Enrolled classes get a visual separator */}
              <optgroup label="My enrolled classes">
                {Object.keys(CLASS_COLORS).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </optgroup>
              <optgroup label="All subjects">
                {ALL_PORTFOLIO_SUBJECTS.filter(s => !CLASS_COLORS[s]).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </optgroup>
            </select>
            {/* Custom chevron */}
            <div style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              pointerEvents: "none", fontSize: 11, color: COLORS.textSecondary,
            }}>▾</div>
          </div>
          {/* Show a tinted pill for the selected subject if it's not an enrolled class */}
          {pieceSubject && !CLASS_COLORS[pieceSubject] && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5, marginTop: 7,
              padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
              background: "#F0EEF8", color: "#7F77DD",
            }}>
              ✦ New category — will appear as its own section in your portfolio
            </div>
          )}
        </div>

        {/* ── CLASS WORK source ── */}
        {source === "class-work" && (
          available.length === 0 ? (
            <div style={{ textAlign: "center", padding: "28px 20px", border: "1.5px dashed #ddd", borderRadius: 14, marginBottom: 20 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📭</div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary }}>All returned {subject} work is already in your portfolio!</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {available.map(w => {
                const isSel = selected === w.id;
                return (
                  <button key={w.id} onClick={() => { setSelected(w.id); setPieceSubject(w.class); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                      borderRadius: 14, cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                      border: isSel ? "2px solid #7F77DD" : "1.5px solid #E5E0F0",
                      background: isSel ? "#F0EEF8" : COLORS.surface, transition: "all 150ms",
                    }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: 10, flexShrink: 0, fontSize: 18,
                      background: CLASS_COLORS[w.class]?.dot + "30" || "#eee",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>📄</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{w.title}</div>
                      <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{w.type} · {w.class}{w.grade ? ` · ${w.grade}` : ""}</div>
                    </div>
                    {isSel && <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#7F77DD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0 }}>✓</div>}
                  </button>
                );
              })}
            </div>
          )
        )}

        {/* ── UPLOAD source ── */}
        {source === "upload" && (
          <div style={{ marginBottom: 20 }}>
            {!uploadFile ? (
              /* Drop zone */
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleMockFileSelect(); }}
                onClick={handleMockFileSelect}
                style={{
                  border: `2px dashed ${dragOver ? "#7F77DD" : "#ddd"}`,
                  borderRadius: 16, padding: "36px 20px", textAlign: "center",
                  cursor: "pointer", transition: "all 150ms",
                  background: dragOver ? "#F5F3FE" : "#fafafa",
                }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>☁️</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 5 }}>Drag & drop your file here</div>
                <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 16 }}>PDF, JPG, PNG, MP4 · max 50 MB</div>
                <div style={{
                  display: "inline-block", padding: "8px 20px", borderRadius: 8,
                  background: COLORS.text, color: "#fff", fontSize: 12, fontWeight: 600,
                }}>Browse files</div>
              </div>
            ) : (
              /* File picked */
              <div>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
                  borderRadius: 14, background: "#F0EEF8", border: "1.5px solid #7F77DD", marginBottom: 14,
                }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0, fontSize: 20,
                    background: (FILE_TYPE_BADGE[uploadFile.type] || {}).bg || "#eee",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{(FILE_TYPE_BADGE[uploadFile.type] || {}).icon || "📄"}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 2 }}>{uploadFile.name}</div>
                    <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{uploadFile.type} · {uploadFile.size}</div>
                  </div>
                  <button onClick={() => setUploadFile(null)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: COLORS.textSecondary, padding: 0, lineHeight: 1 }}>✕</button>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 700, color: COLORS.text, display: "block", marginBottom: 6 }}>Title</label>
                  <input type="text" value={uploadTitle} onChange={e => setUploadTitle(e.target.value)}
                    placeholder="Give this piece a name…"
                    style={{
                      width: "100%", padding: "10px 12px", borderRadius: 10,
                      border: "1.5px solid #E5E0F0", fontSize: 13, color: COLORS.text,
                      fontFamily: "inherit", outline: "none", boxSizing: "border-box",
                    }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── PLATFORM FILES source ── */}
        {source === "platform" && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 10 }}>
              Files from <strong>My Materials</strong> and <strong>My Files</strong>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 230, overflowY: "auto", paddingRight: 2 }}>
              {PLATFORM_FILES_MOCK.map(f => {
                const isSel = platformSel === f.id;
                const badge = FILE_TYPE_BADGE[f.type] || { bg: "#eee", color: "#555", icon: "📄" };
                return (
                  <button key={f.id} onClick={() => setPlatformSel(f.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                      borderRadius: 12, cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                      border: isSel ? "2px solid #7F77DD" : "1.5px solid #E5E0F0",
                      background: isSel ? "#F0EEF8" : COLORS.surface, transition: "all 150ms",
                    }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8, flexShrink: 0, fontSize: 16,
                      background: badge.bg, display: "flex", alignItems: "center", justifyContent: "center",
                    }}>{badge.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, marginBottom: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{f.name}</div>
                      <div style={{ fontSize: 10, color: COLORS.textSecondary }}>{f.class} · {f.size} · Updated {f.updated}</div>
                    </div>
                    <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 5, background: badge.bg, color: badge.color, fontWeight: 700, flexShrink: 0 }}>{f.type}</span>
                    {isSel && <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#7F77DD", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#fff", flexShrink: 0 }}>✓</div>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Artist statement (appears once something is selected) ── */}
        {canAdd && (
          <div style={{ borderTop: "1.5px solid #F0EEF8", paddingTop: 18, marginBottom: 22 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: COLORS.text, display: "block", marginBottom: 4 }}>
              Artist statement&nbsp;
              <span style={{ fontWeight: 400, color: COLORS.textSecondary }}>(optional)</span>
            </label>
            <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 9, lineHeight: 1.5 }}>
              Share what this piece means to you — your process, inspiration, or context you'd like classmates to know.
            </div>
            <textarea
              value={statement}
              onChange={e => setStatement(e.target.value)}
              placeholder={`e.g. "This piece explores the tension between structure and chaos. I started with a rough charcoal sketch, then layered washes of watercolour to…"`}
              rows={4}
              style={{
                width: "100%", padding: "11px 13px", borderRadius: 12,
                border: "1.5px solid #E5E0F0", fontSize: 12, color: COLORS.text,
                fontFamily: "inherit", outline: "none", resize: "vertical",
                boxSizing: "border-box", lineHeight: 1.6,
              }}
            />
            {statement.length > 0 && (
              <div style={{ fontSize: 10, color: COLORS.textSecondary, marginTop: 4, textAlign: "right" }}>
                {statement.length} chars
              </div>
            )}
          </div>
        )}

        {/* ── Footer ── */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "9px 20px", borderRadius: 10,
            border: "1px solid #E5E0F0", background: COLORS.surface,
            color: COLORS.text, fontSize: 13, fontWeight: 500,
            cursor: "pointer", fontFamily: "inherit",
          }}>Cancel</button>
          <button onClick={handleAdd} disabled={!canAdd} style={{
            padding: "9px 24px", borderRadius: 10, border: "none",
            background: canAdd ? COLORS.text : "#ddd",
            color: canAdd ? "#fff" : "#999",
            fontSize: 13, fontWeight: 600,
            cursor: canAdd ? "pointer" : "default",
            fontFamily: "inherit", transition: "all 150ms",
          }}>Add to portfolio</button>
        </div>

      </div>
    </div>
  );
}

function PublicWorkCard({ work }) {
  const bgColors = { "Biology": COLORS.mint, "English Lit": COLORS.lavender, "Algebra II": COLORS.yellow, "History": COLORS.coral, "Spanish II": COLORS.sky };
  const bg = bgColors[work.class] || COLORS.mint;
  return (
    <div style={{ background: bg, borderRadius: 14, overflow: "hidden", boxShadow: COLORS.shadow }}>
      <div style={{ height: 64, background: "rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>📄</div>
      <div style={{ padding: "10px 12px", color: "#1a3a2a" }}>
        <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.3, marginBottom: 3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{work.title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 10, background: "rgba(0,0,0,0.1)", padding: "2px 6px", borderRadius: 4 }}>{work.type}</span>
          {work.grade && <span style={{ fontSize: 11, fontWeight: 600 }}>{work.grade}</span>}
        </div>
      </div>
    </div>
  );
}

function PortfolioPublicPage({ publicWorkIds, onAddToPublic }) {
  const allSubjects = Object.keys(CLASS_COLORS);
  const [subjectToggles, setSubjectToggles] = React.useState(() =>
    Object.fromEntries(allSubjects.map(s => [s, true]))
  );
  const [isOutsiderMode, setIsOutsiderMode] = React.useState(false);
  const [addPieceSubject, setAddPieceSubject] = React.useState(null);

  // Published work per subject (real work cards only — dashed add-card never counts)
  const publishedBySubject = Object.fromEntries(
    allSubjects.map(s => [s, WORK_ITEMS.filter(w => w.class === s && publicWorkIds.has(w.id))])
  );

  // Visibility rule: toggled on = always visible in edit mode
  // In outsider mode: BOTH toggled on AND has ≥1 published piece
  const visibleSubjects = allSubjects.filter(s => {
    if (!subjectToggles[s]) return false;
    if (isOutsiderMode) return publishedBySubject[s].length > 0;
    return true;
  });

  const totalPublished = Array.from(publicWorkIds).length;

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", padding: "40px" }}>

      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif", marginBottom: 4 }}>
            🌐 My Public Portfolio
          </div>
          <div style={{ fontSize: 12, color: COLORS.textSecondary }}>
            {totalPublished} piece{totalPublished !== 1 ? "s" : ""} published · visible to your class
          </div>
        </div>
        <button
          onClick={() => setIsOutsiderMode(v => !v)}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 10, cursor: "pointer",
            border: isOutsiderMode ? "none" : "1px solid #E5E0F0",
            background: isOutsiderMode ? COLORS.text : COLORS.surface,
            color: isOutsiderMode ? "#fff" : COLORS.textSecondary,
            fontSize: 12, fontWeight: 600, fontFamily: "inherit", transition: "all 150ms",
          }}
        >
          {isOutsiderMode ? "← Exit preview" : "👁 View as outsider"}
        </button>
      </div>

      {/* Outsider mode banner */}
      {isOutsiderMode && (
        <div style={{
          background: "#FEF3C7", border: "1px solid #F59E0B",
          borderRadius: 10, padding: "10px 14px", marginBottom: 20,
          fontSize: 12, color: "#92400E", display: "flex", gap: 8, alignItems: "center",
        }}>
          <span>👁</span>
          <span>You're previewing your public portfolio — this is exactly what classmates see.</span>
        </div>
      )}

      {/* Summary bar — always visible */}
      {(() => {
        const publishedSubjects = [...new Set(WORK_ITEMS.filter(w => publicWorkIds.has(w.id)).map(w => w.class))];
        const teacherPicks = WORK_ITEMS.filter(w => w.featured).length;
        return (
          <SummaryBar stats={[
            { label: "Published", value: `${totalPublished}`, sub: "pieces in portfolio", bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26" },
            { label: "Subjects", value: `${publishedSubjects.length}`, sub: "classes represented", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
            { label: "Visible to", value: "28", sub: "classmates", bg: "linear-gradient(135deg, #E8D5F2 0%, #D4C5F0 100%)", text: "#3C3489" },
            { label: "Teacher picks", value: `${teacherPicks}`, sub: "recommended to share", bg: "linear-gradient(135deg, #FFF4D4 0%, #FFE9A0 100%)", text: "#7C4E00" },
          ]} />
        );
      })()}

      {/* Subject toggles — hidden entirely in outsider mode */}
      {!isOutsiderMode && (
        <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 28 }}>
          {allSubjects.map(s => {
            const on = subjectToggles[s];
            const dot = CLASS_COLORS[s].dot;
            return (
              <button key={s}
                onClick={() => setSubjectToggles(prev => ({ ...prev, [s]: !prev[s] }))}
                style={{
                  fontSize: 12, padding: "5px 13px", borderRadius: 20,
                  border: `1.5px solid ${on ? dot : "#ddd"}`,
                  background: on ? dot + "25" : "#fff",
                  color: on ? "#1a3a2a" : "#999",
                  cursor: "pointer", fontFamily: "inherit", fontWeight: on ? 600 : 400,
                  transition: "all 150ms",
                }}
              >{s}</button>
            );
          })}
        </div>
      )}

      {/* Subject sections */}
      {visibleSubjects.map(subject => {
        const works = publishedBySubject[subject];
        const dot = CLASS_COLORS[subject].dot;
        return (
          <div key={subject} style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: dot, flexShrink: 0 }} />
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>{subject}</div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary }}>{works.length} piece{works.length !== 1 ? "s" : ""}</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
              {works.map(w => <PublicWorkCard key={w.id} work={w} />)}
              {/* Dashed add-card — edit mode only, never shown in outsider preview */}
              {!isOutsiderMode && (
                <button
                  onClick={() => setAddPieceSubject(subject)}
                  style={{
                    minHeight: 112, borderRadius: 14, border: "2px dashed #ddd",
                    background: "none", cursor: "pointer", fontSize: 12, color: "#bbb",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "inherit", transition: "all 150ms",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#7F77DD"; e.currentTarget.style.color = "#7F77DD"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#bbb"; }}
                >+ Add a piece</button>
              )}
            </div>
          </div>
        );
      })}

      {/* Empty state in outsider mode when nothing is visible */}
      {isOutsiderMode && visibleSubjects.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>📭</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.text, marginBottom: 6 }}>Nothing published yet</div>
          <div style={{ fontSize: 12, color: COLORS.textSecondary }}>Exit preview and add work from the My Work tab.</div>
        </div>
      )}

      {/* Empty state in edit mode when nothing is toggled on */}
      {!isOutsiderMode && visibleSubjects.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 14, color: COLORS.textSecondary }}>All subjects are hidden. Toggle one on above to get started.</div>
        </div>
      )}

      {/* Add a piece modal */}
      {addPieceSubject && (
        <AddPieceModal
          subject={addPieceSubject}
          publicWorkIds={publicWorkIds}
          onAddToPublic={onAddToPublic}
          onClose={() => setAddPieceSubject(null)}
        />
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ────────────────────────────────────────────────── */

function PortfolioApp({ segments = [] }) {
  const activeTab = segments[1] || "overview";

  // Shared state: which work items have been added to the public portfolio
  // Pre-seeded with featured items so the tab has content out of the box
  const [publicWorkIds, setPublicWorkIds] = React.useState(
    () => new Set(WORK_ITEMS.filter(w => w.featured).map(w => w.id))
  );
  const handleAddToPublic = (workId) => {
    setPublicWorkIds(prev => new Set([...prev, workId]));
  };

  const tabs = [
    { id: "overview",          label: "Overview" },
    { id: "my-work",           label: "My Work" },
    { id: "skills",            label: "Skills & Growth" },
    { id: "reflections",       label: "Reflections" },
    { id: "achievements",      label: "Achievements" },
    { id: "public-portfolio",  label: "Public Portfolio" },
    { id: "shared",            label: "Shared With Me" },
  ];

  const navigate = (id) => {
    window.location.hash = id === "overview" ? "#/my-portfolio" : `#/my-portfolio/${id}`;
  };

  return (
    <div>
      {/* Page title */}
      <div style={{ padding: "32px 40px 0 40px", background: COLORS.bg }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, fontFamily: "Fredoka, -apple-system, sans-serif", marginBottom: 4 }}>
          My Portfolio
        </div>
        <div style={{ fontSize: 14, color: COLORS.textSecondary, marginBottom: 20 }}>
          Your complete picture — work, skills, growth, and connections.
        </div>
      </div>
      <TabNav tabs={tabs} active={activeTab} onTabChange={navigate} />
      {activeTab === "overview"         && <PortfolioOverviewPage     segments={segments} publicWorkIds={publicWorkIds} onAddToPublic={handleAddToPublic} />}
      {activeTab === "my-work"          && <PortfolioMyWorkPage       segments={segments} publicWorkIds={publicWorkIds} onAddToPublic={handleAddToPublic} />}
      {activeTab === "skills"           && <PortfolioSkillsPage       segments={segments} />}
      {activeTab === "reflections"      && <PortfolioReflectionsPage  segments={segments} />}
      {activeTab === "achievements"     && <PortfolioAchievementsPage segments={segments} />}
      {activeTab === "public-portfolio" && <PortfolioPublicPage       publicWorkIds={publicWorkIds} onAddToPublic={handleAddToPublic} />}
      {activeTab === "shared"           && <PortfolioSharedPage       segments={segments} />}
    </div>
  );
}

/* ─── EXPORTS ──────────────────────────────────────────────────────── */

window.PortfolioApp = PortfolioApp;
window.PortfolioOverviewPage = PortfolioOverviewPage;
window.PortfolioMyWorkPage = PortfolioMyWorkPage;
window.PortfolioSkillsPage = PortfolioSkillsPage;
window.PortfolioReflectionsPage = PortfolioReflectionsPage;
window.PortfolioAchievementsPage = PortfolioAchievementsPage;
window.PortfolioSharedPage = PortfolioSharedPage;
window.renderRoute_portfolio = ({ segments, navigate, tweaks }) => <PortfolioApp segments={segments} />;

// LINKS — My Profile (Account)
// Interactive: collapsible sections, Edit modals (request-changes flow), avatar swap

const PROFILE_DATA = {
  name: "Alex Johnson",
  status: "On Track",
  grade: "Grade 10",
  cohort: "Class of 2028",
  school: "Wyndham Park Academy",
  studentId: "WPA-1234-567",
  birthdate: "Mar 15, 2009",
  gender: "Male",
  pronouns: "He/Him",
  language: "English, Spanish",
  legalName: "Alex Johnson",
  enrollmentStatus: "Active · Full Time",
  division: "Upper School",
  schoolId: "WPA-1234-567",
  stateId: "VA-1234567",
  graduationYear: "2028",
  homeroomTeacher: "Ms. Sarah Robinson",
  phone: "(123) 456-7890",
  schoolEmail: "a.johnson@wpa.edu",
  address: "123 Oak Street\nSpringfield, VA 22150",
};

const FAMILY = [
  { name: "Michael Johnson", role: "Legal Guardian · Father", phone: "(123) 456-7890", email: "m.johnson@email.com" },
  { name: "Jennifer Johnson", role: "Legal Guardian · Mother", phone: "(123) 456-7890", email: "j.johnson@email.com" },
];

const EMERGENCY = [
  { name: "Laura Gonzalez",  phone: "(123) 555-0101", relation: "Aunt" },
  { name: "Carlos Martinez", phone: "(123) 555-0102", relation: "Uncle" },
  { name: "Mark Hernandez",  phone: "(123) 555-0103", relation: "Family Friend" },
];

const PICKUP = ["Michael Johnson", "Jennifer Johnson", "Laura Gonzalez", "Carlos Martinez", "Mark Hernandez"];

// Interest tags with chip colors (matching mockup)
const INTERESTS = [
  { label: "Coding",   bg: "#EDE9FE", fg: "#5B21B6" },
  { label: "Robotics", bg: "#DBEAFE", fg: "#1E40AF" },
  { label: "AI / ML",  bg: "#EDE9FE", fg: "#5B21B6" },
  { label: "Gaming",   bg: "#DBEAFE", fg: "#1E40AF" },
  { label: "Math",     bg: "#FEF3C7", fg: "#92400E" },
  { label: "Hiking",   bg: "#DCFCE7", fg: "#166534" },
];

const GOALS = [
  "Improve English essay writing",
  "Master Algebra II concepts",
  "Prepare for AP exam in US History",
];

// Ribbon-style achievements
const ACHIEVEMENTS = [
  { title: "Consistent Learner",   note: "Completed 5 weeks in a row", color: "#6D28D9" },
  { title: "Math Problem Solver",  note: "Scored 90%+ on 3 quizzes",   color: "#16A34A" },
  { title: "Community Contributor",note: "Volunteered 10+ hours",       color: "#E07A2D" },
];

/* ---------- Photographic portrait placeholder ---------- */
function ProfilePhoto({ width = 192, height = 220 }) {
  return (
    <div style={{
      width, height, borderRadius: 14, overflow: "hidden",
      background: "linear-gradient(160deg, #FCD34D 0%, #F59E0B 60%, #B45309 100%)",
      border: "3px solid #E5E7EB",
      boxShadow: "none",
      position: "relative",
    }}>
      <svg viewBox="0 0 192 220" width={width} height={height} style={{ display: "block" }}>
        <defs>
          <radialGradient id="bgPhoto" cx="50%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#FDE68A"/>
            <stop offset="55%" stopColor="#F59E0B"/>
            <stop offset="100%" stopColor="#B45309"/>
          </radialGradient>
          <radialGradient id="skinPhoto" cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#A87856"/>
            <stop offset="60%" stopColor="#7B5235"/>
            <stop offset="100%" stopColor="#5C3A20"/>
          </radialGradient>
          <linearGradient id="shirtPhoto" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A5F"/>
            <stop offset="100%" stopColor="#0F172A"/>
          </linearGradient>
          <linearGradient id="hairPhoto" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1F1B16"/>
            <stop offset="100%" stopColor="#0A0908"/>
          </linearGradient>
        </defs>
        <rect width="192" height="220" fill="url(#bgPhoto)"/>
        {/* soft photographic vignette */}
        <ellipse cx="96" cy="80" rx="120" ry="90" fill="#FFFBEB" opacity="0.22"/>
        {/* shoulders/torso */}
        <path d="M0 220 L 0 175 Q 30 150 60 145 L 132 145 Q 162 150 192 175 L 192 220 Z" fill="url(#shirtPhoto)"/>
        {/* neck */}
        <path d="M78 130 L 78 152 Q 96 162 114 152 L 114 130 Z" fill="#7B5235"/>
        {/* head */}
        <ellipse cx="96" cy="100" rx="42" ry="50" fill="url(#skinPhoto)"/>
        {/* hair top — afro/curl shape */}
        <path d="M52 88 Q 50 56 80 50 Q 96 44 112 50 Q 142 56 140 88 Q 142 76 132 70 Q 122 64 115 70 Q 110 65 96 65 Q 80 65 75 72 Q 65 70 58 78 Q 52 84 52 88 Z" fill="url(#hairPhoto)"/>
        {/* hair texture dots */}
        <g fill="#0A0908" opacity="0.5">
          <circle cx="68" cy="68" r="3.5"/>
          <circle cx="78" cy="60" r="3"/>
          <circle cx="92" cy="56" r="3"/>
          <circle cx="106" cy="58" r="3"/>
          <circle cx="120" cy="64" r="3.2"/>
          <circle cx="128" cy="74" r="3"/>
          <circle cx="60" cy="78" r="3"/>
        </g>
        {/* ears */}
        <ellipse cx="55" cy="103" rx="4" ry="7" fill="#7B5235"/>
        <ellipse cx="137" cy="103" rx="4" ry="7" fill="#7B5235"/>
        {/* brows */}
        <path d="M76 92 Q 84 88 92 92" stroke="#1F1B16" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M100 92 Q 108 88 116 92" stroke="#1F1B16" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        {/* eyes */}
        <ellipse cx="83" cy="103" rx="3.5" ry="2.2" fill="#fff"/>
        <ellipse cx="109" cy="103" rx="3.5" ry="2.2" fill="#fff"/>
        <circle cx="83" cy="103" r="1.8" fill="#1F1B16"/>
        <circle cx="109" cy="103" r="1.8" fill="#1F1B16"/>
        <circle cx="83.7" cy="102.4" r="0.6" fill="#fff"/>
        <circle cx="109.7" cy="102.4" r="0.6" fill="#fff"/>
        {/* nose subtle shadow */}
        <path d="M94 110 Q 96 122 92 124 Q 96 126 100 124" stroke="#5C3A20" strokeWidth="1.1" fill="none" strokeLinecap="round" opacity="0.6"/>
        {/* smile (open, teeth) */}
        <path d="M82 130 Q 96 142 110 130 Q 110 136 96 138 Q 82 136 82 130 Z" fill="#3B1E0E"/>
        <path d="M85 132 Q 96 137 107 132 L 105 134 Q 96 135 87 134 Z" fill="#fff" opacity="0.95"/>
        {/* cheek highlight */}
        <ellipse cx="73" cy="115" rx="6" ry="4" fill="#C7956E" opacity="0.35"/>
        <ellipse cx="119" cy="115" rx="6" ry="4" fill="#C7956E" opacity="0.35"/>
      </svg>
    </div>
  );
}

/* Avatar overlay (small purple) */
function AvatarBubble() {
  return (
    <div style={{
      position: "absolute", top: -10, right: -10,
      width: 50, height: 50, borderRadius: 14,
      background: "linear-gradient(135deg, #C4B5FD, #8B5CF6)",
      border: "3px solid var(--paper)",
      boxShadow: "0 6px 14px -4px rgba(15,23,42,0.20)",
      display: "flex", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
    }}>
      <svg viewBox="0 0 50 50" width="50" height="50">
        <rect width="50" height="50" fill="#A78BFA"/>
        <ellipse cx="25" cy="44" rx="18" ry="12" fill="#5B21B6"/>
        <ellipse cx="25" cy="22" rx="9" ry="11" fill="#7B5235"/>
        <path d="M14 19 Q 14 10 25 9 Q 35 9 35 19 Q 36 14 31 12 Q 28 11 25 11 Q 18 11 16 16 Q 14 17 14 19 Z" fill="#0A0908"/>
        <circle cx="21.5" cy="22.5" r="1" fill="#fff"/>
        <circle cx="28.5" cy="22.5" r="1" fill="#fff"/>
        <path d="M22 27 Q 25 29 28 27" stroke="#3B1E0E" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

/* ---------- Section card (collapsible) ---------- */
function ProfileSection({ icon, iconColor = "var(--student)", iconBg = "var(--student-soft)", title, children, editable = true, defaultOpen = true, onEdit }) {
  const [open, setOpen] = React.useState(defaultOpen);
  const IconComp = icon ? I[icon] : null;
  return (
    <div className="card" style={{ padding: 0, marginBottom: 14, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%", display: "flex", alignItems: "center", gap: 12,
          padding: "16px 22px",
          background: "transparent", border: "none", cursor: "pointer",
          textAlign: "left",
        }}
      >
        {IconComp && (
          <div style={{
            width: 30, height: 30, borderRadius: 9,
            background: iconBg,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <IconComp size={16} color={iconColor}/>
          </div>
        )}
        <span className="t-h3" style={{ flex: 1, fontSize: 15 }}>{title}</span>
        {editable && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => { e.stopPropagation(); onEdit && onEdit(); }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 12, color: "var(--student)", fontWeight: 600,
              padding: "4px 10px", borderRadius: 999,
            }}
          >
            <I.Edit size={12} color="var(--student)"/> Edit
          </span>
        )}
        <I.ChevronDown
          size={16}
          color="var(--silver)"
          style={{
            transform: open ? "rotate(0deg)" : "rotate(-90deg)",
            transition: "transform 160ms ease",
          }}
        />
      </button>
      {open && (
        <div style={{ padding: "0 22px 22px" }}>{children}</div>
      )}
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{
        fontSize: 10.5, color: "var(--silver)", fontWeight: 600,
        letterSpacing: "0.04em", textTransform: "uppercase",
      }}>{label}</span>
      <span style={{
        fontSize: 13.5, color: "var(--ink)", fontWeight: 500, whiteSpace: "pre-line",
      }}>{value}</span>
    </div>
  );
}

function FieldGrid({ cols = 3, children }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: "18px 28px",
    }}>{children}</div>
  );
}

/* ---------- Edit / Request Changes modal ---------- */
function EditModal({ open, title, fields, onClose }) {
  const [submitted, setSubmitted] = React.useState(false);
  React.useEffect(() => { if (open) setSubmitted(false); }, [open]);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(15,23,42,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "overlayIn 160ms ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card"
        style={{
          width: 520, maxWidth: "92vw", maxHeight: "86vh",
          overflowY: "auto", padding: 0,
          boxShadow: "var(--shadow-card-lg)",
        }}
      >
        <div style={{
          padding: "20px 24px", display: "flex", alignItems: "center", gap: 10,
          borderBottom: "1px solid var(--mist)",
        }}>
          <I.Edit size={16} color="var(--student)"/>
          <span className="t-h3" style={{ flex: 1, fontSize: 15 }}>Request changes — {title}</span>
          <button onClick={onClose} style={{
            width: 32, height: 32, borderRadius: 8,
            background: "transparent", border: "none", cursor: "pointer",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}><I.X size={16} color="var(--stone)"/></button>
        </div>
        <div style={{ padding: 24 }}>
          {!submitted ? (
            <>
              <div style={{
                padding: "10px 14px",
                background: "var(--warning-soft)", color: "#7a3f10",
                fontSize: 12.5, borderRadius: 10, marginBottom: 18,
                display: "flex", gap: 10, alignItems: "flex-start",
              }}>
                <I.Shield size={14} color="var(--services)" style={{ flexShrink: 0, marginTop: 2 }}/>
                <span>Some information requires parent/guardian or school administrator approval before it changes.</span>
              </div>
              {fields.map((f) => (
                <div key={f.label} style={{ marginBottom: 14 }}>
                  <label style={{
                    display: "block", fontSize: 11, color: "var(--stone)",
                    letterSpacing: "0.04em", textTransform: "uppercase",
                    fontWeight: 600, marginBottom: 6,
                  }}>{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea defaultValue={f.value} rows={3} style={{
                      width: "100%", padding: "10px 12px",
                      border: "1px solid var(--mist)", borderRadius: 10,
                      fontSize: 13.5, color: "var(--ink)",
                      outline: "none", resize: "vertical", background: "var(--paper)",
                    }}/>
                  ) : (
                    <input defaultValue={f.value} style={{
                      width: "100%", height: 38, padding: "0 12px",
                      border: "1px solid var(--mist)", borderRadius: 10,
                      fontSize: 13.5, color: "var(--ink)",
                      outline: "none", background: "var(--paper)",
                    }}/>
                  )}
                </div>
              ))}
              <div style={{ marginBottom: 14 }}>
                <label style={{
                  display: "block", fontSize: 11, color: "var(--stone)",
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  fontWeight: 600, marginBottom: 6,
                }}>Note for reviewer (optional)</label>
                <textarea rows={2} placeholder="Why are you requesting this change?" style={{
                  width: "100%", padding: "10px 12px",
                  border: "1px solid var(--mist)", borderRadius: 10,
                  fontSize: 13.5, color: "var(--ink)",
                  outline: "none", resize: "vertical", background: "var(--paper)",
                }}/>
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 6 }}>
                <button className="btn" onClick={onClose}>Cancel</button>
                <button className="btn btn-primary" onClick={() => setSubmitted(true)}>Submit for review</button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "24px 8px" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 999,
                background: "var(--success-soft)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                marginBottom: 12,
              }}>
                <I.Check size={22} color="var(--success)"/>
              </div>
              <div className="t-h3" style={{ marginBottom: 6 }}>Request submitted</div>
              <div style={{ fontSize: 13, color: "var(--stone)", marginBottom: 18, lineHeight: 1.55 }}>
                Your guardian and school admin will review. You'll be notified when it's approved or if more info is needed.
              </div>
              <button className="btn btn-primary" onClick={onClose}>Done</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Right rail ---------- */
function GoalDonut({ value }) {
  const r = 36, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <svg width="92" height="92" viewBox="0 0 92 92">
      <circle cx="46" cy="46" r={r} fill="none" stroke="#DCFCE7" strokeWidth="9"/>
      <circle cx="46" cy="46" r={r} fill="none" stroke="#16A34A" strokeWidth="9"
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform="rotate(-90 46 46)"/>
      <text x="46" y="50" textAnchor="middle" fontSize="18" fontWeight="700"
        fill="var(--ink)" fontFamily="var(--font-display)">{value}%</text>
    </svg>
  );
}

function AboutCard({ onEdit }) {
  return (
    <div className="card" style={{ padding: 22, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "#EDE9FE",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><I.User size={15} color="#6D28D9"/></div>
        <span className="t-h3" style={{ flex: 1, fontSize: 14 }}>About Me</span>
        <button onClick={onEdit} style={{
          background: "transparent", border: "none", cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 12, color: "var(--student)", fontWeight: 600,
        }}><I.Edit size={12} color="var(--student)"/>Edit</button>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55, marginBottom: 16 }}>
        Passionate about computer science and mathematics. Member of the robotics team and math club. Aspiring software engineer with interests in artificial intelligence and machine learning.
      </div>
      <div style={{
        fontSize: 10.5, color: "var(--silver)", fontWeight: 600,
        letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 8,
      }}>Interests</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {INTERESTS.map((tag) => (
          <span key={tag.label} style={{
            display: "inline-flex", alignItems: "center",
            padding: "4px 10px", borderRadius: 999,
            background: tag.bg, color: tag.fg,
            fontSize: 11.5, fontWeight: 600,
            letterSpacing: "0.005em",
          }}>{tag.label}</span>
        ))}
      </div>
    </div>
  );
}

function AcademicSnapshot() {
  return (
    <div className="card" style={{ padding: 22, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "#EDE9FE",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><I.ChartBar size={15} color="#6D28D9"/></div>
        <span className="t-h3" style={{ flex: 1, fontSize: 14 }}>Academic Snapshot</span>
        <a style={{ fontSize: 12, color: "var(--student)", fontWeight: 600, cursor: "pointer" }}>View details</a>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10.5, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>GPA (Q3)</div>
          <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "var(--font-display)", color: "var(--ink)", lineHeight: 1.1 }}>3.72</div>
          <div style={{ fontSize: 11.5, color: "#16A34A", fontWeight: 600 }}>↑ 0.15</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <GoalDonut value={72}/>
          <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>Course Progress</div>
        </div>
      </div>
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12,
        paddingTop: 16, borderTop: "1px solid var(--mist)",
      }}>
        <div>
          <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Credits Earned</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>18.5</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>Credits Required</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", fontFamily: "var(--font-display)" }}>24.0</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2 }}>On Track for Graduation</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: "#16A34A" }}>
            <I.CircleCheck size={14} color="#16A34A"/> Yes
          </div>
        </div>
      </div>
    </div>
  );
}

function CurrentFocus() {
  return (
    <div className="card" style={{ padding: 22, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "#EDE9FE",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><I.Target size={15} color="#6D28D9"/></div>
        <span className="t-h3" style={{ flex: 1, fontSize: 14 }}>Current Focus</span>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          fontSize: 11, color: "#6D28D9", fontWeight: 600,
        }}>
          <I.Sparkle size={11} color="#6D28D9"/>AI Insight
        </span>
      </div>
      <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55, marginBottom: 14 }}>
        You're making great progress! Keep focusing on improving your writing structure in English.
      </div>
      <div style={{
        background: "var(--student-soft)", borderRadius: 12, padding: 14,
      }}>
        <div style={{
          fontSize: 11, color: "var(--student-deep)", fontWeight: 700,
          letterSpacing: "0.02em", marginBottom: 8,
        }}>Goals This Term</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {GOALS.map((g) => (
            <div key={g} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <I.Check size={14} color="var(--student)" style={{ marginTop: 1, flexShrink: 0 }}/>
              <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{g}</span>
            </div>
          ))}
        </div>
        <button style={{
          marginTop: 12, fontSize: 12, color: "var(--student)", fontWeight: 600,
          background: "transparent", border: "none", padding: 0, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>Update goals <I.ArrowRight size={11} color="var(--student)"/></button>
      </div>
    </div>
  );
}

/* Paper-cutout achievement stamp — scalloped circle, tinted, with icon. */
function StampBadge({ color, icon, tilt }) {
  // Soft-tint the stamp face from the achievement color (~12% saturation).
  const Ic = I[icon] || I.Trophy;
  return (
    <div className="stamp-paper" style={{
      "--stamp-size": "56px",
      "--stamp-color": tintBg(color),
      "--stamp-ink": color,
      transform: `rotate(${tilt}deg)`,
    }}>
      <Ic size={20} color={color}/>
    </div>
  );
}
function tintBg(hex) {
  // Mix the hex toward warm cream — produces a parchment-tinted stamp face.
  const h = hex.replace("#","");
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  const mix = (c, t) => Math.round(c * 0.18 + t * 0.82);
  return `rgb(${mix(r,250)}, ${mix(g,246)}, ${mix(b,239)})`;
}

function RecentAchievements() {
  return (
    <div className="card" style={{ padding: 22, marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "#EDE9FE",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}><I.Trophy size={15} color="#6D28D9"/></div>
        <span className="t-h3" style={{ flex: 1, fontSize: 14 }}>Recent Achievements</span>
        <a style={{ fontSize: 12, color: "var(--student)", fontWeight: 600, cursor: "pointer" }}>View all</a>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ACHIEVEMENTS.map((a, i) => {
          const tilts = [-2, 1, -1, 2];
          const icons = ["Flame", "Trophy", "Sparkle", "Book"];
          return (
            <div key={a.title} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <StampBadge color={a.color} icon={icons[i % icons.length]} tilt={tilts[i % tilts.length]}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{a.title}</div>
                <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{a.note}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Avatar block ---------- */
function AvatarBlock({ onChangeAvatar }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div className="polaroid has-tape tape-corner-tl tape-color-butter" style={{
        width: 200, transform: "rotate(-1.5deg)", padding: "14px 14px 50px",
      }}>
        <div style={{ position: "relative" }}>
          <ProfilePhoto width={172} height={200}/>
          <AvatarBubble/>
        </div>
        <div className="polaroid-caption">Alex · Grade 10</div>
      </div>
      <button onClick={onChangeAvatar} className="btn btn-sm" style={{ marginTop: 16, height: 30 }}>
        <I.Edit size={11} color="var(--slate)"/> Change Avatar
      </button>
    </div>
  );
}

/* ---------- Main page ---------- */
function MyProfile() {
  const [modal, setModal] = React.useState(null);
  const [avatarPicker, setAvatarPicker] = React.useState(false);

  const open = (key, title, fields) => setModal({ key, title, fields });
  const close = () => setModal(null);

  return (
    <div className="fade-in" style={{ padding: "8px 28px 60px", maxWidth: 1320, margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, fontSize: 13 }}>
        <span style={{ color: "var(--student)", fontWeight: 600 }}>My Profile</span>
        <I.ChevronRight size={12} color="var(--silver)"/>
        <span style={{ color: "var(--stone)" }}>Overview</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 18, alignItems: "start" }}>
        {/* LEFT */}
        <div>
          {/* Hero card */}
          <div className="card" style={{ padding: 24, marginBottom: 14, background: "linear-gradient(180deg, #FAF5FF 0%, var(--paper) 65%)" }}>
            <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 18 }}>
              <AvatarBlock onChangeAvatar={() => setAvatarPicker(true)}/>

              <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                  <h1 style={{
                    margin: 0, fontFamily: "var(--font-display)",
                    fontSize: 30, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em",
                  }}>{PROFILE_DATA.name}</h1>
                  <span style={{
                    display: "inline-flex", alignItems: "center", gap: 5,
                    background: "#DCFCE7", color: "#166534",
                    padding: "3px 10px", borderRadius: 999,
                    fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap",
                  }}>
                    <I.CircleCheck size={11} color="#16A34A"/>{PROFILE_DATA.status}
                  </span>
                  <div style={{ flex: 1 }}/>
                  <button
                    className="btn"
                    onClick={() => open("identity", "Overall Profile", [
                      { label: "Legal Name", value: PROFILE_DATA.legalName },
                      { label: "Pronouns", value: PROFILE_DATA.pronouns },
                      { label: "Languages", value: PROFILE_DATA.language },
                    ])}
                  ><I.Edit size={13} color="var(--slate)"/> Request Changes</button>
                </div>
                <div style={{
                  display: "flex", gap: 14, flexWrap: "wrap",
                  fontSize: 13, color: "var(--stone)",
                }}>
                  <span><I.School size={12} color="var(--silver)" style={{ marginRight: 4, verticalAlign: "-1px" }}/>{PROFILE_DATA.grade} · {PROFILE_DATA.cohort}</span>
                  <span style={{ color: "var(--mist)" }}>·</span>
                  <span><I.Pin size={12} color="var(--silver)" style={{ marginRight: 4, verticalAlign: "-1px" }}/>{PROFILE_DATA.school}</span>
                </div>
              </div>
            </div>

            {/* Full-width quick-facts strip */}
            <div className="card" style={{
              padding: "16px 20px",
              display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 18,
              boxShadow: "0 1px 2px rgba(15,23,42,0.04)",
              background: "var(--paper)",
            }}>
              {[
                { icon: "User", label: "Student ID", value: PROFILE_DATA.studentId, c: "#6D28D9", bg: "#EDE9FE" },
                { icon: "Calendar", label: "Birthdate", value: PROFILE_DATA.birthdate, c: "#1E6F8C", bg: "#DBEAFE" },
                { icon: "User", label: "Gender", value: PROFILE_DATA.gender, c: "#6D28D9", bg: "#EDE9FE" },
                { icon: "User", label: "Pronouns", value: PROFILE_DATA.pronouns, c: "#16A34A", bg: "#DCFCE7" },
                { icon: "Quote", label: "Language", value: PROFILE_DATA.language, c: "#E07A2D", bg: "#FBEFE2" },
              ].map((f) => {
                const Ic = I[f.icon];
                return (
                  <div key={f.label} style={{ display: "flex", gap: 10, alignItems: "center", minWidth: 0 }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: f.bg,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Ic size={14} color={f.c}/>
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 10, color: "var(--silver)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{f.label}</div>
                      <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 600, whiteSpace: "nowrap" }}>{f.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Identity & Enrollment — purple */}
          <ProfileSection
            icon="User" iconColor="#6D28D9" iconBg="#EDE9FE"
            title="Identity & Enrollment Information"
            onEdit={() => open("identity", "Identity & Enrollment", [
              { label: "Legal Name", value: PROFILE_DATA.legalName },
              { label: "Pronouns", value: PROFILE_DATA.pronouns },
              { label: "Homeroom Teacher", value: PROFILE_DATA.homeroomTeacher },
            ])}
          >
            <FieldGrid cols={3}>
              <Field label="Legal Name" value={PROFILE_DATA.legalName}/>
              <Field label="School" value={PROFILE_DATA.school}/>
              <Field label="Enrollment Status" value={PROFILE_DATA.enrollmentStatus}/>
              <Field label="Birthdate" value={PROFILE_DATA.birthdate}/>
              <Field label="Division" value={PROFILE_DATA.division}/>
              <Field label="Graduation Year" value={PROFILE_DATA.graduationYear}/>
              <Field label="Gender" value={PROFILE_DATA.gender}/>
              <Field label="School ID" value={PROFILE_DATA.schoolId}/>
              <Field label="Homeroom Teacher" value={PROFILE_DATA.homeroomTeacher}/>
              <Field label="Pronouns" value={PROFILE_DATA.pronouns}/>
              <Field label="State ID" value={PROFILE_DATA.stateId}/>
              <span/>
            </FieldGrid>
          </ProfileSection>

          {/* Contact — blue */}
          <ProfileSection
            icon="Inbox" iconColor="#1E6F8C" iconBg="#DBEAFE"
            title="Contact Information"
            onEdit={() => open("contact", "Contact Information", [
              { label: "Phone", value: PROFILE_DATA.phone },
              { label: "School Email", value: PROFILE_DATA.schoolEmail },
              { label: "Current Address", type: "textarea", value: PROFILE_DATA.address },
            ])}
          >
            <FieldGrid cols={3}>
              <Field label="Phone Number" value={PROFILE_DATA.phone}/>
              <Field label="School Email" value={PROFILE_DATA.schoolEmail}/>
              <Field label="Current Address" value={PROFILE_DATA.address}/>
            </FieldGrid>
          </ProfileSection>

          {/* Family — green */}
          <ProfileSection
            icon="Team" iconColor="#16A34A" iconBg="#DCFCE7"
            title="Family & Guardians"
            onEdit={() => open("family", "Family & Guardians", [
              { label: "Add note (free-form)", type: "textarea", value: "" },
            ])}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.1fr", gap: 18 }}>
              <div style={{ gridColumn: "1 / span 2" }}>
                <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 10 }}>Parents / Guardians</div>
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--stone)", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase" }}>Emergency Contacts</span>
                  <a style={{ fontSize: 11.5, color: "var(--student)", fontWeight: 600, cursor: "pointer" }}>View all</a>
                </div>
              </div>
              {FAMILY.map((p) => (
                <div key={p.name} style={{ background: "#F8FAFC", borderRadius: 10, padding: 14 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{p.name}</div>
                  <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 8 }}>{p.role}</div>
                  <div style={{ fontSize: 12, color: "var(--slate)" }}>{p.phone}</div>
                  <div style={{ fontSize: 12, color: "var(--slate)" }}>{p.email}</div>
                </div>
              ))}
              <div style={{ background: "#F8FAFC", borderRadius: 10, padding: 14 }}>
                {EMERGENCY.map((c, i) => (
                  <div key={c.name} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    paddingBottom: i < EMERGENCY.length - 1 ? 8 : 0,
                    marginBottom: i < EMERGENCY.length - 1 ? 8 : 0,
                    borderBottom: i < EMERGENCY.length - 1 ? "1px solid var(--mist)" : "none",
                  }}>
                    <I.CircleCheck size={13} color="#16A34A"/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{c.name}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "var(--stone)", textAlign: "right" }}>
                      <div>{c.phone}</div>
                      <div style={{ color: "var(--silver)" }}>{c.relation}</div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-sm" style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
                  <I.Plus size={11} color="var(--slate)"/> Add Emergency Contact
                </button>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase", marginBottom: 10 }}>Authorized Pickup List</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                {PICKUP.map((p) => (
                  <span key={p} style={{
                    display: "inline-flex", alignItems: "center",
                    padding: "5px 12px", borderRadius: 999,
                    background: "#F1F5F9", color: "var(--slate)",
                    fontSize: 11.5, fontWeight: 500,
                  }}>{p}</span>
                ))}
                <button className="btn btn-sm" style={{ marginLeft: "auto" }}>
                  <I.Plus size={11} color="var(--slate)"/> Add Authorized Person
                </button>
              </div>
            </div>
          </ProfileSection>

          {/* Transportation + Facilities */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#FBEFE2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <I.Briefcase size={15} color="#E07A2D"/>
                </div>
                <span className="t-h3" style={{ flex: 1, fontSize: 14.5 }}>Transportation Information</span>
                <button onClick={() => open("transport", "Transportation", [{ label: "Bus Route", value: "Route 12" }])} style={{ background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--student)", fontWeight: 600 }}>
                  <I.Edit size={12} color="var(--student)"/>Edit
                </button>
              </div>
              <FieldGrid cols={2}>
                <Field label="Bus Route" value="Route 12"/>
                <Field label="Pickup Location" value="Oak Street & Maple Avenue"/>
                <Field label="Driver Name" value="Mr. David Wilson"/>
                <Field label="Dropoff Location" value="Oak Street & Maple Avenue"/>
              </FieldGrid>
            </div>
            <div className="card" style={{ padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <I.Lock size={15} color="#1E6F8C"/>
                </div>
                <span className="t-h3" style={{ flex: 1, fontSize: 14.5 }}>Facilities Information</span>
                <button onClick={() => open("facilities", "Facilities", [{ label: "Locker Number", value: "A-247" }])} style={{ background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--student)", fontWeight: 600 }}>
                  <I.Edit size={12} color="var(--student)"/>Edit
                </button>
              </div>
              <FieldGrid cols={2}>
                <Field label="Locker Number" value="A-247"/>
                <Field label="Locker Location" value="Building A, 2nd Floor, West Wing"/>
                <Field label="Locker Combination" value="12-34-56"/>
                <span/>
              </FieldGrid>
            </div>
          </div>

          {/* Footer note */}
          <div className="card" style={{
            padding: "12px 18px", display: "flex", alignItems: "center", gap: 10,
            background: "#F8FAFC", boxShadow: "none",
          }}>
            <I.Shield size={14} color="var(--stone)"/>
            <span style={{ fontSize: 12, color: "var(--stone)", flex: 1 }}>
              Some information can only be changed through your parent/guardian and requires school administrator approval.
            </span>
            <button style={{
              background: "transparent", border: "none", cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 12.5, color: "var(--student)", fontWeight: 600,
            }}>
              Request Changes <I.ArrowRight size={11} color="var(--student)"/>
            </button>
          </div>
        </div>

        {/* RIGHT rail */}
        <div>
          <AboutCard onEdit={() => open("about", "About Me", [
            { label: "Bio", type: "textarea", value: "Passionate about computer science and mathematics. Member of the robotics team and math club." },
            { label: "Interests (comma-separated)", value: INTERESTS.map((t) => t.label).join(", ") },
          ])}/>
          <AcademicSnapshot/>
          <CurrentFocus/>
          <RecentAchievements/>
        </div>
      </div>

      <EditModal
        open={!!modal}
        title={modal?.title || ""}
        fields={modal?.fields || []}
        onClose={close}
      />

      {/* Avatar picker modal */}
      {avatarPicker && (
        <div onClick={() => setAvatarPicker(false)} style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(15,23,42,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "overlayIn 160ms ease",
        }}>
          <div onClick={(e) => e.stopPropagation()} className="card" style={{
            width: 480, maxWidth: "92vw", padding: 24,
            boxShadow: "var(--shadow-card-lg)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <I.User size={16} color="var(--student)"/>
              <span className="t-h3" style={{ flex: 1, fontSize: 15 }}>Choose your avatar</span>
              <button onClick={() => setAvatarPicker(false)} style={{ width: 32, height: 32, borderRadius: 8, background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <I.X size={16} color="var(--stone)"/>
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
              {[
                ["#FCD34D","#F59E0B"], ["#C4B5FD","#8B5CF6"], ["#86EFAC","#22C55E"], ["#FCA5A5","#EF4444"],
                ["#93C5FD","#3B82F6"], ["#F9A8D4","#EC4899"], ["#FDBA74","#F97316"], ["#67E8F9","#06B6D4"],
              ].map(([a,b], i) => (
                <button key={i} style={{
                  aspectRatio: "1", borderRadius: 14,
                  background: `linear-gradient(135deg, ${a}, ${b})`,
                  border: i === 1 ? "3px solid var(--student)" : "3px solid transparent",
                  cursor: "pointer", padding: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg viewBox="0 0 60 60" width="60%" height="60%">
                    <circle cx="30" cy="22" r="11" fill="#fff" opacity="0.85"/>
                    <path d="M10 56 Q 10 38 30 38 Q 50 38 50 56 Z" fill="#fff" opacity="0.85"/>
                  </svg>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 20 }}>
              <button className="btn" onClick={() => setAvatarPicker(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setAvatarPicker(false)}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.MyProfile = MyProfile;

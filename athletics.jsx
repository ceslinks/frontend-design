// LINKS — My Activities → Athletics (overview/dashboard)
//
// L2 surface that lives under My Activities. Per the Master Component Grid,
// Athletics is its own hub with: eligibility, conditioning, teams the student
// is on, schedule, recruiting, and announcements. This page is the landing
// for /my-activities/athletics — it links out to per-team pages (Football
// already exists), the recruiting profile, and the team directory.
//
// Composition: hero band (athlete identity card), L2 tabs, then a 3-column
// dashboard: My Teams + Upcoming + Eligibility/Conditioning + Recruiting
// snapshot + Announcements + Discover other teams.

function AthleticsOverviewPage({ segments }) {
  // L2 sub of "athletics" inside my-activities — keep parity with nav-map
  const athleticsSubnav = [
    { id: "dashboard", label: "Dashboard" },
    { id: "teams",     label: "Teams" },
    { id: "football",  label: "Football" },
  ];
  const sub = segments[2] || "dashboard";

  return (
    <Page segments={segments} title="Athletics" emoji="🏆"
      lede="Teams, training, and recruiting — all in one hub."
      actions={
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn-sm"><I.Calendar size={11} color="var(--stone)"/> Add Game to Calendar</button>
          <a href="#/my-activities/athletics/football/recruiting-profile" style={{ textDecoration: "none" }}>
            <button className="btn btn-sm" style={{ background: "var(--student)", color: "#fff", border: "1px solid var(--student-deep)", whiteSpace: "nowrap" }}>
              <I.Trophy size={11} color="#fff"/> Recruiting
            </button>
          </a>
        </div>
      }
    >
      {/* L3 tabs (athletics-specific) */}
      <div style={{ display: "flex", gap: 14, marginBottom: 18, borderBottom: "1px solid var(--mist)" }}>
        {athleticsSubnav.map((t) => {
          const active = sub === t.id;
          const href = "#/my-activities/athletics/" + (t.id === "football" ? "football/team-hub" : t.id);
          return (
            <a key={t.id} href={href}
              style={{
                padding: "10px 6px", textDecoration: "none",
                color: active ? "var(--student-deep)" : "var(--stone)",
                fontSize: 13, fontWeight: active ? 600 : 500,
                borderBottom: active ? "2px solid var(--student)" : "2px solid transparent",
                marginBottom: -1, whiteSpace: "nowrap",
              }}>{t.label}</a>
          );
        })}
      </div>

      {/* Athlete hero card */}
      <div style={{
        position: "relative",
        background: "linear-gradient(120deg, #4C1D95 0%, #6D28D9 55%, #7E22CE 100%)",
        borderRadius: 16, padding: "22px 24px", marginBottom: 18,
        color: "#fff", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -10, fontSize: 220,
          fontFamily: "var(--font-display)", fontWeight: 800, opacity: 0.10,
          color: "#fff", lineHeight: 1, pointerEvents: "none", letterSpacing: "0.04em",
        }}>14</div>

        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 22, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{
            width: 84, height: 84, borderRadius: 16,
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.25)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 800, color: "#fff",
          }}>AJ</div>

          <div>
            <div style={{ fontSize: 11, opacity: 0.75, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
              Student-Athlete · Wyndham Park Academy
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 10 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>Alex Johnson</div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>Grade 10 · Class of 2028</div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 22px", fontSize: 12, alignItems: "center" }}>
              {[
                { l: "Active Teams",   v: "1" },
                { l: "Eligibility",    v: "Cleared", tone: "good" },
                { l: "Record",         v: "6 - 2" },
                { l: "GPA",            v: "3.85" },
                { l: "Next Event",     v: "Fri, May 31" },
              ].map((s) => (
                <div key={s.l}>
                  <div style={{ opacity: 0.7, fontSize: 10.5, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.l}</div>
                  <div style={{ fontWeight: 700, marginTop: 2, display: "inline-flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                    {s.v}
                    {s.tone === "good" && <span style={{ width: 7, height: 7, borderRadius: 999, background: "#86EFAC", display: "inline-block" }}/>}
                  </div>
                </div>
              ))}
              <div style={{ display: "inline-flex", gap: 6, alignItems: "center", padding: "5px 10px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 999, fontSize: 11, fontWeight: 600, marginLeft: "auto", whiteSpace: "nowrap" }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#86EFAC" }}/> All academic checks passed
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 2-col dashboard */}
      <div style={{ display: "grid", gridTemplateColumns: "1.55fr 1fr", gap: 18 }}>
        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

          {/* MY TEAMS */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div className="t-eyebrow">MY TEAMS</div>
              <a href="#/my-activities/athletics/teams" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View all teams</a>
            </div>

            {/* Active team — Football */}
            <a href="#/my-activities/athletics/football/team-hub" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 14, alignItems: "center",
                padding: 14, borderRadius: 10,
                background: "linear-gradient(135deg, var(--student-soft), #FAF5FF)",
                border: "1px solid var(--student-200)",
                marginBottom: 10, cursor: "pointer",
              }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 10,
                  background: "var(--student-deep)", color: "#fff",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22,
                }}>W</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--ink)" }}>Wyndham Park Wombats — Varsity Football</div>
                    <MK_Pill tone="purple">Active</MK_Pill>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 6 }}>
                    Wide Receiver · #14 · Coach Marcus Hill
                  </div>
                  <div style={{ display: "flex", gap: 14, fontSize: 11.5, color: "var(--stone)" }}>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><I.Calendar size={11} color="var(--silver)"/> M / T / Th · 2:30 PM</span>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><I.MapPin size={11} color="var(--silver)"/> Practice Field</span>
                    <span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}><I.Trophy size={11} color="var(--silver)"/> Record 6 - 2</span>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 600 }}>NEXT</div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>vs. Lincoln HS</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>Fri · 4:00 PM</div>
                </div>
              </div>
            </a>

            {/* Following — non-roster but tracked */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { ic: "🏀", t: "JV Basketball", s: "Following · tryouts open", color: "#FED7AA" },
                { ic: "🥎", t: "Spring Track & Field", s: "Try-out signed up", color: "#DCFCE7" },
              ].map((f) => (
                <div key={f.t} style={{
                  display: "flex", gap: 10, alignItems: "center",
                  padding: 12, borderRadius: 8, border: "1px solid var(--mist)",
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: f.color, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{f.ic}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{f.t}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)" }}>{f.s}</div>
                  </div>
                  <I.ChevronRight size={11} color="var(--silver)"/>
                </div>
              ))}
            </div>
          </div>

          {/* ELIGIBILITY & ACADEMIC STANDING */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div className="t-eyebrow">ELIGIBILITY &amp; ACADEMIC STANDING</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Full report</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 12 }}>
              {[
                { l: "GPA Requirement", v: "3.85", sub: "Min. 2.0 · ✓ Cleared", tone: "good" },
                { l: "Attendance",      v: "97%",  sub: "Min. 90% · ✓ Cleared", tone: "good" },
                { l: "Physical",        v: "Valid", sub: "Expires Aug 12, 2026", tone: "good" },
                { l: "Concussion Form", v: "Renew", sub: "Due in 9 days",        tone: "warn" },
              ].map((c) => (
                <div key={c.l} style={{
                  padding: 12, borderRadius: 8,
                  border: "1px solid " + (c.tone === "warn" ? "#FEF3C7" : "var(--mist)"),
                  background: c.tone === "warn" ? "#FFFBEB" : "var(--paper)",
                }}>
                  <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{c.l}</div>
                  <div style={{
                    fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, marginTop: 4,
                    color: c.tone === "warn" ? "#A16207" : "var(--ink)",
                  }}>{c.v}</div>
                  <div style={{ fontSize: 11, color: c.tone === "warn" ? "#A16207" : "var(--stone)", marginTop: 2 }}>{c.sub}</div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 12, padding: "10px 12px", borderRadius: 8,
              background: "var(--student-soft)",
              display: "flex", gap: 8, alignItems: "center",
            }}>
              <I.Sparkle size={13} color="var(--student)"/>
              <div style={{ fontSize: 12, color: "var(--ink)", flex: 1 }}>
                <b>One item needs attention:</b> upload a renewed concussion baseline form before May 15 to stay cleared for varsity play.
              </div>
              <button className="btn btn-sm" style={{ background: "var(--student)", color: "#fff", border: "1px solid var(--student-deep)" }}>Upload Form</button>
            </div>
          </div>

          {/* CONDITIONING — week strip */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div className="t-eyebrow">CONDITIONING THIS WEEK</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Full program</a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6, marginBottom: 14 }}>
              {[
                { d: "Mon", t: "Lower body", done: true },
                { d: "Tue", t: "Speed",      done: true },
                { d: "Wed", t: "Recovery",   done: true },
                { d: "Thu", t: "Upper body", done: false, today: true },
                { d: "Fri", t: "Game day",   done: false, emph: true },
                { d: "Sat", t: "Mobility",   done: false },
                { d: "Sun", t: "Rest",       done: false, rest: true },
              ].map((d) => (
                <div key={d.d} style={{
                  padding: "10px 6px", textAlign: "center", borderRadius: 8,
                  background: d.today ? "var(--student-soft)" : d.emph ? "#FEF3C7" : d.rest ? "var(--bone)" : "var(--paper)",
                  border: "1px solid " + (d.today ? "var(--student-200)" : d.emph ? "#FDE68A" : "var(--mist)"),
                }}>
                  <div style={{ fontSize: 10, color: "var(--stone)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{d.d}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>{d.t}</div>
                  <div style={{ marginTop: 6, height: 4, borderRadius: 2, background: d.done ? "#22C55E" : d.today ? "var(--student)" : "var(--mist)" }}/>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              <div style={{ padding: 12, borderRadius: 8, border: "1px solid var(--mist)" }}>
                <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>Workouts complete</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>3</div>
                  <div style={{ fontSize: 12, color: "var(--silver)" }}>/ 6 this week</div>
                </div>
                <div style={{ marginTop: 8, height: 5, borderRadius: 3, background: "var(--mist)" }}>
                  <div style={{ width: "50%", height: "100%", borderRadius: 3, background: "var(--student)" }}/>
                </div>
              </div>
              <div style={{ padding: 12, borderRadius: 8, border: "1px solid var(--mist)" }}>
                <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>Recovery score</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>78</div>
                  <div style={{ fontSize: 11, color: "#15803D", fontWeight: 600 }}>Good</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 8 }}>Sleep + load-balanced</div>
              </div>
              <div style={{ padding: 12, borderRadius: 8, border: "1px solid var(--mist)" }}>
                <div style={{ fontSize: 11, color: "var(--stone)", fontWeight: 600 }}>Weekly load</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 2 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>6.4</div>
                  <div style={{ fontSize: 12, color: "var(--silver)" }}>RPE avg.</div>
                </div>
                <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 8 }}>Within target range</div>
              </div>
            </div>
          </div>

          {/* RECRUITING SNAPSHOT */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div className="t-eyebrow">RECRUITING SNAPSHOT</div>
              <a href="#/my-activities/athletics/football/recruiting-profile" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Open profile →</a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14 }}>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Profile completeness</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>72%</div>
                  <div style={{ fontSize: 11.5, color: "var(--stone)" }}>3 sections to complete</div>
                </div>
                <div style={{ marginTop: 8, height: 6, borderRadius: 3, background: "var(--mist)" }}>
                  <div style={{ width: "72%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg, var(--student), #A855F7)" }}/>
                </div>
                <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                  {[
                    { t: "Highlight reel — Game vs. Westfield", done: true },
                    { t: "Updated 40-yard time", done: true },
                    { t: "Coach reference letter", done: false },
                    { t: "Academic transcript", done: false },
                  ].map((x) => (
                    <div key={x.t} style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12 }}>
                      <div style={{
                        width: 14, height: 14, borderRadius: 999,
                        background: x.done ? "#22C55E" : "var(--bone)",
                        border: x.done ? "none" : "1px solid var(--mist)",
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {x.done && <I.Check size={9} color="#fff"/>}
                      </div>
                      <div style={{ color: x.done ? "var(--stone)" : "var(--ink)", textDecoration: x.done ? "line-through" : "none" }}>{x.t}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Profile views</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "var(--ink)" }}>148</div>
                  <div style={{ fontSize: 11, color: "#15803D", fontWeight: 600 }}>+24 this week</div>
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.04em", fontWeight: 600 }}>Recent visitors</div>
                {[
                  { school: "Drake University", sport: "FB", d: "Today" },
                  { school: "Truman State", sport: "FB", d: "May 12" },
                  { school: "St. Olaf College", sport: "FB", d: "May 9" },
                ].map((v, i) => (
                  <div key={v.school} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "6px 0", borderTop: i ? "1px solid var(--mist)" : "none", fontSize: 12,
                  }}>
                    <span style={{ color: "var(--ink)" }}>{v.school}</span>
                    <span style={{ color: "var(--silver)", fontSize: 11 }}>{v.d}</span>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Top stats this season</div>
                {[
                  { l: "Receptions",     v: "42", sub: "12th in district" },
                  { l: "Receiving yards",v: "612", sub: "9th in district" },
                  { l: "TDs",            v: "7",  sub: "Career best" },
                  { l: "40-yd dash",     v: "4.62s", sub: "Verified Apr 18" },
                ].map((s, i) => (
                  <div key={s.l} style={{
                    display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8, alignItems: "baseline",
                    padding: "5px 0", borderTop: i ? "1px solid var(--mist)" : "none",
                  }}>
                    <span style={{ fontSize: 11.5, color: "var(--stone)" }}>{s.l}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{s.v}</span>
                    <span style={{ fontSize: 10, color: "var(--silver)" }}>{s.sub}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

          {/* UPCOMING */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div className="t-eyebrow">UPCOMING</div>
              <a href="#/my-activities/events" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Full schedule →</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { d: "29", m: "MAY", day: "Wed", t: "Practice — Outside run install", s: "3:30 – 5:30 PM · Practice Field", tone: "purple" },
                { d: "30", m: "MAY", day: "Thu", t: "Film review — Lincoln HS",       s: "2:00 – 3:00 PM · Film Room",     tone: "neutral" },
                { d: "31", m: "MAY", day: "Fri", t: "Game vs. Lincoln HS Lions",       s: "4:00 PM · Wyndham Stadium · Home", tone: "game" },
                { d: "02", m: "JUN", day: "Mon", t: "Recovery + Lift",                s: "3:30 – 4:30 PM · Weight Room",   tone: "neutral" },
                { d: "05", m: "JUN", day: "Thu", t: "Track & Field tryouts",           s: "4:00 PM · Sign-up required",     tone: "purple" },
              ].map((u, i) => {
                const accent = u.tone === "game" ? "#DC2626" : u.tone === "purple" ? "var(--student)" : "var(--silver)";
                return (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 4px 1fr", gap: 10 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1 }}>{u.d}</div>
                      <div style={{ fontSize: 9, color: "var(--stone)", fontWeight: 700, letterSpacing: "0.06em" }}>{u.m}</div>
                      <div style={{ fontSize: 9, color: "var(--silver)", marginTop: 2 }}>{u.day}</div>
                    </div>
                    <div style={{ background: accent, borderRadius: 2 }}/>
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{u.t}</div>
                      <div style={{ fontSize: 11, color: "var(--stone)", marginTop: 2 }}>{u.s}</div>
                      {u.tone === "game" && <div style={{ marginTop: 4 }}><MK_Pill tone="warning">Game day</MK_Pill></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* COACH ANNOUNCEMENTS */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div className="t-eyebrow">FROM YOUR COACHES</div>
              <a href="#/my-activities/announcements" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>All →</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { who: "Coach Marcus Hill", role: "Head Coach, Football", color: "linear-gradient(135deg, #F59E0B, #B45309)", t: "Game day shirts in athletics office", s: "Pick up before Friday's pep rally.", time: "2h ago" },
                { who: "Coach Yi", role: "Strength & Conditioning", color: "linear-gradient(135deg, #22C55E, #15803D)", t: "Lift moved to 4:00 Tuesday", s: "Weight room booked for Track tryouts at 3.", time: "Yesterday" },
                { who: "Athletic Dept.", role: "Eligibility office", color: "linear-gradient(135deg, #6D28D9, #4C1D95)", t: "Concussion baseline forms due May 15", s: "Renew through the medical portal.", time: "2d ago" },
              ].map((a, i) => (
                <div key={i} style={{ display: "flex", gap: 10, paddingTop: i ? 12 : 0, borderTop: i ? "1px solid var(--mist)" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 999, background: a.color, flexShrink: 0 }}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{a.who}</div>
                      <div style={{ fontSize: 10.5, color: "var(--silver)" }}>{a.time}</div>
                    </div>
                    <div style={{ fontSize: 10.5, color: "var(--stone)", marginBottom: 4 }}>{a.role}</div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{a.t}</div>
                    <div style={{ fontSize: 11.5, color: "var(--stone)", lineHeight: 1.5 }}>{a.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DISCOVER */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
              <div className="t-eyebrow">DISCOVER OTHER TEAMS</div>
              <a href="#/my-activities/athletics/teams" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>All 16 →</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { ic: "🥎", t: "Spring Track & Field",  s: "Tryouts Jun 5 · Open to all grades", c: "#DCFCE7", action: "Sign up" },
                { ic: "🎾", t: "Boys Tennis",            s: "Tryouts May 29 · Bring own racket",  c: "#DBEAFE", action: "Sign up" },
                { ic: "⚽", t: "JV Soccer (Fall)",       s: "Open practices start Aug 12",        c: "#FEF3C7", action: "Follow" },
                { ic: "🏊", t: "Swim & Dive",            s: "Off-season — winter team",           c: "#E0F2FE", action: "Follow" },
              ].map((d, i) => (
                <div key={d.t} style={{
                  display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 10, alignItems: "center",
                  padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none",
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: d.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{d.ic}</div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{d.t}</div>
                    <div style={{ fontSize: 11, color: "var(--stone)" }}>{d.s}</div>
                  </div>
                  <button style={{
                    padding: "5px 10px", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer",
                    background: d.action === "Sign up" ? "var(--student)" : "var(--paper)",
                    color: d.action === "Sign up" ? "#fff" : "var(--student-deep)",
                    border: d.action === "Sign up" ? "1px solid var(--student-deep)" : "1px solid var(--student-200)",
                  }}>{d.action}</button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Page>
  );
}

window.AthleticsOverviewPage = AthleticsOverviewPage;

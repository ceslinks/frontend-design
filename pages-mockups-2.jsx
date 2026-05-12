// LINKS — Mockup pages part 2: Football Team, Recruiting Profile,
// To Do (AI Suggested), Activities Overview, Calendar event panels

/* ============================================================
   FOOTBALL TEAM HUB
   ============================================================ */
function FootballTeamPage({ segments }) {
  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto" }}>
      <PageHeader segments={segments} title="" emoji=""
        extraCrumbs={[]}
        lede=""/>

      {/* Hero band */}
      <div style={{
        position: "relative",
        background: "linear-gradient(135deg, #4C1D95 0%, #2E1065 100%)",
        borderRadius: 16, padding: "20px 24px",
        marginTop: -8, marginBottom: 18,
        color: "#fff", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.12,
          fontFamily: "var(--font-display)", fontSize: 200, fontWeight: 800,
          letterSpacing: "0.05em", lineHeight: 1, top: -30, right: -10,
          color: "#fff", pointerEvents: "none",
        }}>W</div>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto", gap: 22, alignItems: "center", position: "relative", zIndex: 1 }}>
          <div style={{ width: 110, height: 110, borderRadius: 16, background: "var(--paper)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexDirection: "column", fontFamily: "var(--font-display)", fontWeight: 800 }}>
            <div style={{ fontSize: 12, color: "#7C3AED" }}>WYNDHAM PARK</div>
            <div style={{ fontSize: 26, color: "#1F1240", lineHeight: 1, marginTop: 2 }}>WOMBATS</div>
            <div style={{ width: 62, height: 36, background: "#A855F7", borderRadius: 6, marginTop: 4, opacity: 0.7 }}/>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 800 }}>Wyndham Park Wombats</div>
              <button style={{ padding: "5px 12px", background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", borderRadius: 6, fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", gap: 6, alignItems: "center" }}>
                Varsity Football <I.ChevronDown size={11} color="#fff"/>
              </button>
            </div>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 12, fontStyle: "italic" }}>Low. Strong. Unstoppable.</div>
            <div style={{ display: "flex", gap: 18, fontSize: 12 }}>
              {[
                { ic: "👤", l: "Coach", v: "Marcus Hill" },
                { ic: "📅", l: "Season", v: "Fall 2025" },
                { ic: "🏆", l: "Record", v: "6 - 2" },
                { ic: "🏈", l: "Next Game", v: "May 31 vs Lincoln HS" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: "rgba(255,255,255,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>{s.ic}</div>
                  <div>
                    <div style={{ opacity: 0.7, fontSize: 10 }}>{s.l}</div>
                    <div style={{ fontWeight: 700 }}>{s.v}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <a href={"#/my-activities/athletics/football/recruiting-profile"} style={{ padding: "9px 14px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, color: "#fff", fontSize: 12.5, fontWeight: 600, textDecoration: "none" }}>View Recruiting Hub</a>
          <button style={{ padding: "9px 14px", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, color: "#fff", fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Open Playbook</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1fr", gap: 16 }}>
        {/* Column 1: Next Up + Schedule + Conditioning + Documents */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: 18 }}>
            <div className="t-eyebrow" style={{ marginBottom: 10 }}>NEXT UP</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: 14, alignItems: "center", marginBottom: 14 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, margin: "0 auto", background: "var(--student-deep)", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 800 }}>W</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginTop: 6 }}>Wyndham Park Wombats</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 999, background: "var(--bone)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "var(--stone)" }}>VS</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ width: 56, height: 56, margin: "0 auto", background: "#B91C1C", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22, fontWeight: 800 }}>L</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginTop: 6 }}>Lincoln High School Lions</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 11.5, color: "var(--stone)", marginBottom: 12 }}>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}><I.Calendar size={11} color="var(--silver)"/>Fri, May 31, 2025</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}><I.Clock size={11} color="var(--silver)"/>4:00 PM</div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}><I.MapPin size={11} color="var(--silver)"/>Wyndham Park Stadium</div>
            </div>
            <div style={{ background: "#FEF3C7", color: "#A16207", padding: "5px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, display: "inline-block", marginBottom: 10 }}>Game Day Tomorrow!</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button style={{ padding: "8px 10px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View Game Plan</button>
              <button className="btn btn-sm">Add to Calendar</button>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">TEAM SCHEDULE</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View Full Schedule</a>
            </div>
            {[
              { d: "Wed, May 29", t: "Practice", time: "3:30 PM – 5:30 PM", loc: "Practice Field" },
              { d: "Thu, May 30", t: "Film Review", time: "2:00 PM – 3:00 PM", loc: "Film Room" },
              { d: "Fri, May 31", t: "Game vs Lincoln HS", time: "4:00 PM", loc: "Wyndham Park Stadium", emph: true },
              { d: "Mon, Jun 2", t: "Recovery / Lift", time: "3:30 PM – 4:30 PM", loc: "Weight Room" },
            ].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.2fr 1.2fr", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none", fontSize: 12 }}>
                <div style={{ color: "var(--stone)" }}>{r.d}</div>
                <div style={{ fontWeight: r.emph ? 700 : 500, color: "var(--ink)" }}>{r.t}</div>
                <div style={{ color: "var(--stone)" }}>{r.time}</div>
                <div style={{ color: "var(--stone)" }}>{r.loc}</div>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div className="t-eyebrow">CONDITIONING & HEALTH</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View Full Program</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 14, alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>This Week's Focus</div>
                {[{ d: "🟣", t: "Speed & Acceleration" }, { d: "🟣", t: "Lower Body Strength" }, { d: "🟣", t: "Recovery & Mobility" }].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 6, alignItems: "center", padding: "3px 0", fontSize: 11.5, color: "var(--ink)" }}>
                    <I.Check size={10} color="var(--student)"/> {f.t}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ position: "relative", width: 64, height: 64 }}>
                  <svg viewBox="0 0 36 36" width="64" height="64">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="var(--mist)" strokeWidth="3"/>
                    <circle cx="18" cy="18" r="15" fill="none" stroke="var(--student)" strokeWidth="3" strokeDasharray={`${0.33*94} 94`} transform="rotate(-90 18 18)" strokeLinecap="round"/>
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>33%</div>
                </div>
                <div style={{ fontSize: 10.5, color: "var(--stone)", marginTop: 4 }}>Completed</div>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}><span style={{ color: "var(--stone)" }}>Assigned Workouts</span> <b>3</b></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}><span style={{ color: "var(--stone)" }}>Completed</span> <b>1</b></div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "2px 0" }}><span style={{ color: "var(--stone)" }}>Recovery Score</span> <b>78 <span style={{ color: "var(--success)", fontSize: 10 }}>Good</span></b></div>
              </div>
            </div>
            <button style={{ marginTop: 12, width: "100%", padding: "8px 14px", background: "var(--student-soft)", color: "var(--student-deep)", border: "1px solid var(--student-200)", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Open Conditioning &amp; Health</button>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">TEAM DOCUMENTS</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            {[
              { t: "Team Handbook", d: "Updated May 10" },
              { t: "Travel Itinerary - Away Game", d: "Updated May 20" },
              { t: "Code of Conduct", d: "Updated Aug 5" },
            ].map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none", fontSize: 12.5 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}><I.Document size={13} color="var(--silver)"/>{d.t}</div>
                <div style={{ color: "var(--stone)", fontSize: 11 }}>{d.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Column 2: Coach Announcements + Playbook + Team Media + Important Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">COACH ANNOUNCEMENTS</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: "linear-gradient(135deg, #F59E0B, #B45309)", flexShrink: 0 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Marcus Hill</div>
                <div style={{ fontSize: 11, color: "var(--stone)" }}>Head Coach</div>
              </div>
              <div style={{ fontSize: 11, color: "var(--silver)" }}>2h ago</div>
            </div>
            <div style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.55, marginBottom: 12 }}>
              Focus this week is outside run execution. We will control the line of scrimmage and finish every play. Review the playbook and be ready to compete Friday.
            </div>
            <div style={{ background: "var(--student-soft)", padding: 10, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <I.Sparkle size={11} color="var(--student)"/>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>AI Summary</div>
                <div style={{ fontSize: 10, color: "var(--silver)", marginLeft: "auto" }}>2 key takeaways</div>
              </div>
              <ul style={{ paddingLeft: 14, margin: 0, fontSize: 11.5, color: "var(--ink)", lineHeight: 1.6 }}>
                <li>Outside run keys: patient mesh + cutback</li>
                <li>Finish blocks and maintain leverage</li>
              </ul>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">PLAYBOOK QUICK ACCESS</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All Plays</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { t: "Outside Zone Run", n: "Run · 12 Plays" },
                { t: "Shotgun Spread", n: "Formation · 8 Plays" },
                { t: "Pass Protection", n: "Scheme · 6 Plays" },
              ].map((p, i) => (
                <div key={i} style={{ background: "#0F172A", borderRadius: 8, padding: "32px 8px 8px", color: "#fff", textAlign: "center", position: "relative", minHeight: 88 }}>
                  <div style={{ position: "absolute", inset: "8px 8px auto", height: 50, fontSize: 22, color: "rgba(255,255,255,0.4)", letterSpacing: "0.4em" }}>X · O · X<br/>O · O</div>
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 8, background: "rgba(255,255,255,0.05)", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <div style={{ fontSize: 11, fontWeight: 700 }}>{p.t}</div>
                    <div style={{ fontSize: 10, opacity: 0.7 }}>{p.n}</div>
                  </div>
                </div>
              ))}
            </div>
            <button style={{ marginTop: 10, width: "100%", padding: "8px", background: "var(--paper)", border: "1px dashed var(--mist)", borderRadius: 6, fontSize: 12, fontWeight: 600, color: "var(--student-deep)", cursor: "pointer" }}>+ Quiz Me (AI)</button>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">TEAM MEDIA</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All Media</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
              {[
                { t: "vs Westview HS", s: "Game Film · May 24", v: true },
                { t: "Practice Highlights", s: "May 27" },
                { t: "2025 Season Highlight Reel", s: "" , v: true },
                { t: "Upload Media", s: "Add video or photos", up: true },
              ].map((m, i) => (
                <div key={i} style={{ background: m.up ? "var(--bone)" : "linear-gradient(135deg, #1E293B, #334155)", border: m.up ? "1px dashed var(--mist)" : "none", borderRadius: 8, padding: 8, color: m.up ? "var(--stone)" : "#fff", minHeight: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  {!m.up && m.v && (
                    <div style={{ position: "relative", height: 32, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 22, height: 22, borderRadius: 999, background: "rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>▶</div>
                    </div>
                  )}
                  <div style={{ fontSize: 10.5, fontWeight: 700, lineHeight: 1.3 }}>{m.t}</div>
                  <div style={{ fontSize: 9.5, opacity: 0.7 }}>{m.s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">IMPORTANT LINKS</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {[
                { t: "Playbook", s: "View Plays" },
                { t: "Hudl Team", s: "Watch Film" },
                { t: "MaxPreps", s: "Team Page" },
                { t: "NFHS", s: "Rules & Info" },
              ].map((l, i) => (
                <div key={i} style={{ padding: 10, border: "1px solid var(--mist)", borderRadius: 6, textAlign: "center", fontSize: 11 }}>
                  <I.Document size={14} color="var(--student)"/>
                  <div style={{ fontWeight: 700, color: "var(--ink)", marginTop: 4 }}>{l.t}</div>
                  <div style={{ color: "var(--stone)", fontSize: 10 }}>{l.s}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: AI + Commitments + Team Chat + Quick Actions */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <I.Sparkle size={13} color="var(--student)"/>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>LINKS AI – Team Assistant</div>
              <span style={{ fontSize: 9, fontWeight: 700, color: "var(--student-deep)", background: "var(--student-soft)", padding: "1px 4px", borderRadius: 3, marginLeft: "auto" }}>BETA</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 10 }}>Hey Jerrell! Here's what's happening with your team.</div>
            {[
              { t: "Review Your Assignments", s: "See your role in this week's game plan" },
              { t: "Watch Key Film Clips", s: "AI selected clips for you to study" },
              { t: "Get Practice Plan", s: "See today's practice and focus areas" },
              { t: "Prepare for Opponent", s: "Scouting report: Lincoln High School" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderTop: i ? "1px solid var(--mist)" : "none", alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--student-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I.PlayCircle size={12} color="var(--student)"/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{s.t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{s.s}</div>
                </div>
                <I.ChevronRight size={11} color="var(--silver)"/>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, padding: 8, background: "var(--bone)", borderRadius: 8, marginTop: 8 }}>
              <input placeholder="Ask AI anything about your team..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 11.5 }}/>
              <I.PaperPlane size={12} color="var(--student)"/>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">MY TEAM COMMITMENTS</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            {[
              { t: "Review Outside Zone Play", s: "Due Today", tone: "danger" },
              { t: "Attend Practice", s: "Wed, May 29 at 3:30 PM", tone: "neutral" },
              { t: "Upload New Highlight Clip", s: "Due Jun 1", tone: "warning" },
              { t: "Study Lincoln HS Scout Report", s: "Due Tomorrow", tone: "warning" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: i ? "1px solid var(--mist)" : "none", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{c.t}</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>{c.s.includes("Due") ? "" : c.s}</div>
                </div>
                <span style={{ fontSize: 10.5, fontWeight: 700, color: c.tone === "danger" ? "#DC2626" : c.tone === "warning" ? "#D97706" : "var(--stone)" }}>{c.s}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">TEAM CHAT</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View Messages</a>
            </div>
            {[
              { n: "QB #7 Jaylen Carter", s: "Spread look or Under cover this week?", t: "15m ago" },
              { n: "Coach Marcus Hill", s: "Check the playbook update. We'll install the…", t: "10m ago" },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: "linear-gradient(135deg, " + (i ? "#F59E0B, #B45309" : "#3B82F6, #1E40AF") + ")", flexShrink: 0 }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{m.n}</div>
                    <div style={{ fontSize: 10, color: "var(--silver)" }}>{m.t}</div>
                  </div>
                  <div style={{ fontSize: 11.5, color: "var(--stone)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.s}</div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, padding: 8, background: "var(--bone)", borderRadius: 8, marginTop: 8 }}>
              <input placeholder="Message team..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 11.5 }}/>
              <I.PaperPlane size={12} color="var(--student)"/>
            </div>
          </div>

          <div className="card" style={{ padding: 14 }}>
            <div className="t-eyebrow" style={{ marginBottom: 10 }}>QUICK ACTIONS</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
              {[
                { ic: I.X, l: "Report Absence", c: "#EF4444" },
                { ic: I.Edit, l: "Request Equipment", c: "#3B82F6" },
                { ic: I.Book, l: "Book Facility", c: "#22C55E" },
                { ic: I.ChartBar, l: "Team Poll", c: "#A855F7" },
              ].map((q, i) => (
                <button key={i} style={{ padding: 8, background: "var(--paper)", border: "1px solid var(--mist)", borderRadius: 6, fontSize: 10, color: "var(--ink)", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, fontWeight: 600 }}>
                  <q.ic size={14} color={q.c}/> {q.l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   RECRUITING PROFILE
   ============================================================ */
function RecruitingProfilePage({ segments }) {
  return (
    <div className="fade-in" style={{ padding: "8px 32px 80px", maxWidth: 1500, margin: "0 auto" }}>
      <PageHeader segments={segments} title="" emoji="" lede=""/>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.4fr 1fr", gap: 16 }}>
        {/* Left: Profile + Highlight + Coach Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 240, background: "linear-gradient(135deg, #4C1D95, #2E1065)", padding: 16, color: "#fff" }}>
              <div style={{ position: "absolute", inset: 16, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.6))", borderRadius: 12 }}/>
              <button style={{ position: "absolute", left: 24, bottom: 24, padding: "5px 10px", background: "rgba(0,0,0,0.5)", color: "#fff", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", zIndex: 1, display: "inline-flex", gap: 4, alignItems: "center" }}>
                <I.Camera size={11} color="#fff"/> Change Photo
              </button>
              <div style={{ position: "absolute", bottom: 24, right: 24, color: "#fff", textAlign: "right" }}>
                <div style={{ fontSize: 10, opacity: 0.7 }}>JERSEY</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 80, fontWeight: 800, lineHeight: 0.85 }}>24</div>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--ink)" }}>Jerrell Smiff</div>
                  <I.CircleCheck size={14} color="var(--student)"/>
                  <MK_Pill tone="purple">Verified Athlete</MK_Pill>
                </div>
                <div style={{ fontSize: 12, color: "var(--stone)" }}>Senior · Wyndham Park Academy</div>
                <div style={{ fontSize: 12, color: "var(--stone)" }}>Wombats Football – Varsity</div>
                <div style={{ display: "flex", gap: 14, marginTop: 12, fontSize: 11.5 }}>
                  <div><span style={{ color: "var(--stone)" }}>Position </span><b>Running Back (RB)</b></div>
                  <div><span style={{ color: "var(--stone)" }}>Height </span><b>5'10"</b></div>
                  <div><span style={{ color: "var(--stone)" }}>Weight </span><b>195 lbs</b></div>
                  <div><span style={{ color: "var(--stone)" }}>Class </span><b>2026</b></div>
                </div>
                <div style={{ marginTop: 6, fontSize: 11.5 }}>
                  <span style={{ color: "var(--stone)" }}>Hometown </span>📍 <b>Orlando, FL</b>
                </div>
              </div>
              <div style={{ width: 80, height: 80, background: "var(--student-deep)", color: "#fff", borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", textAlign: "center", lineHeight: 1, fontFamily: "var(--font-display)", fontWeight: 800 }}>
                <div>
                  <div style={{ fontSize: 9 }}>WYNDHAM<br/>PARK</div>
                  <div style={{ fontSize: 12, marginTop: 4 }}>WOMBATS</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button className="btn btn-sm" style={{ flex: 1 }}><I.Send size={11} color="var(--stone)"/> Share Profile</button>
              <button className="btn btn-sm" style={{ flex: 1 }}><I.Plus size={11} color="var(--stone)"/> Add to Portfolio</button>
              <button className="btn btn-sm"><I.MoreH size={12} color="var(--stone)"/></button>
              <a href="#/my-activities/athletics/football" style={{ alignSelf: "center", fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View Team Page →</a>
            </div>
          </div>

          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 200, background: "linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(76,29,149,0.85) 60%, rgba(15,23,42,0.9) 100%)", color: "#fff", padding: 16 }}>
              <MK_Pill tone="open" style={{ background: "rgba(255,255,255,0.85)", color: "#1F1240" }}>2025 SEASON HIGHLIGHT REEL</MK_Pill>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: 999, background: "rgba(255,255,255,0.95)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ marginLeft: 4, width: 0, height: 0, borderLeft: "16px solid var(--ink)", borderTop: "10px solid transparent", borderBottom: "10px solid transparent" }}/>
                </div>
              </div>
              <div style={{ position: "absolute", left: 12, right: 12, bottom: 12, fontSize: 11, display: "flex", alignItems: "center", gap: 6 }}>
                <span>0:00 / 3:45</span>
                <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.3)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ width: "10%", height: "100%", background: "#fff" }}/>
                </div>
                <span>🔊</span>
                <span>⛶</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div className="t-eyebrow">HIGHLIGHTS &amp; MIXTAPES</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-sm"><I.Upload size={11} color="var(--stone)"/> Upload Video</button>
                <button className="btn btn-sm"><I.Sparkle size={11} color="var(--student)"/> Generate Highlight (AI)</button>
                <button className="btn btn-sm">Manage Clips</button>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
              {[
                { t: "2025 Season Highlight Reel", s: "May 12, 2025", v: "3:45", featured: true },
                { t: "Top 10 Plays", s: "May 18, 2025", v: "2:10" },
                { t: "vs Lincoln HS", s: "Apr 26, 2025", v: "1:30" },
                { t: "Hudl Profile", s: "View on Hudl", hudl: true },
                { t: "Add More", s: "Upload or link videos", up: true },
              ].map((m, i) => (
                <div key={i} style={{ background: m.up ? "var(--bone)" : m.hudl ? "linear-gradient(135deg, #F97316, #C2410C)" : "linear-gradient(135deg, #1E293B, #334155)", border: m.up ? "1px dashed var(--mist)" : "none", borderRadius: 8, padding: 8, color: m.up ? "var(--stone)" : "#fff", minHeight: 100, position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                  {m.featured && <span style={{ position: "absolute", top: 4, left: 4, fontSize: 8, background: "#F59E0B", padding: "1px 4px", borderRadius: 3, fontWeight: 700 }}>FEATURED</span>}
                  {m.v && <span style={{ position: "absolute", top: 4, right: 4, fontSize: 9, background: "rgba(0,0,0,0.5)", padding: "1px 4px", borderRadius: 3 }}>{m.v}</span>}
                  {!m.up && !m.hudl && (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ width: 24, height: 24, borderRadius: 999, background: "rgba(255,255,255,0.3)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10 }}>▶</div>
                    </div>
                  )}
                  {m.hudl && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 800 }}>hudl</div>}
                  {m.up && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><I.Plus size={20} color="var(--stone)"/></div>}
                  <div style={{ fontSize: 10, fontWeight: 700, lineHeight: 1.3 }}>{m.t}</div>
                  <div style={{ fontSize: 9, opacity: 0.7 }}>{m.s}</div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 10 }}>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All Videos →</a>
            </div>
          </div>
        </div>

        {/* Middle: Stats + Resume + Coach + Opportunity Matching */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>2025 Season Stats</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All Stats →</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 12 }}>
              {[
                { n: "1,482", l: "Rushing Yards" }, { n: "18", l: "Touchdowns" }, { n: "6.2", l: "Yds / Carry" },
                { n: "22", l: "Receptions" }, { n: "310", l: "Receiving Yards" }, { n: "5", l: "Games Played" },
              ].map((s, i) => (
                <div key={i} style={{ background: "var(--bone)", padding: 10, borderRadius: 8 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "var(--student-deep)" }}>{s.n}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--student-soft)", padding: 12, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <I.Sparkle size={11} color="var(--student)"/>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)" }}>LINKS AI Insight</div>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--ink)", lineHeight: 1.5 }}>Jerrell demonstrates exceptional vision and acceleration. His yards-per-carry ranks in the top 10% of comparable RBs in Florida.</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", marginTop: 4, display: "inline-block" }}>View Full Analysis →</a>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Athletic Resume</div>
              {[
                { t: "All-District Running Back", s: "2025" },
                { t: "Team Offensive MVP", s: "2025" },
                { t: "3x Player of the Week", s: "2024, 2025" },
                { t: "Wombats Team Captain", s: "2025" },
              ].map((r, i) => (
                <div key={i} style={{ padding: "6px 0", borderTop: i ? "1px solid var(--mist)" : "none", display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <I.Trophy size={13} color="#F59E0B"/>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{r.t}</div>
                    <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{r.s}</div>
                  </div>
                </div>
              ))}
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", marginTop: 8, display: "inline-block" }}>View Full Resume →</a>
            </div>

            <div className="card" style={{ padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Coach Information</div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 999, background: "linear-gradient(135deg, #F59E0B, #B45309)", flexShrink: 0 }}/>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>Marcus Hill</div>
                  <div style={{ fontSize: 11, color: "var(--stone)" }}>Head Coach</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-sm" style={{ flex: 1 }}><I.Mail size={11} color="var(--stone)"/></button>
                <button className="btn btn-sm" style={{ flex: 1 }}><I.MessageCircle size={11} color="var(--stone)"/></button>
              </div>
              <div style={{ fontSize: 10.5, color: "var(--stone)", marginTop: 8, lineHeight: 1.4 }}>Contact is school-mediated to protect student privacy.</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", marginTop: 4, display: "inline-block" }}>How it works →</a>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <I.Sparkle size={13} color="var(--student)"/>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Opportunity Matching</div>
              </div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All Matches →</a>
            </div>
            <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 10 }}>Based on your profile, stats, and preferences</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
              {[
                { t: "University of Central Florida", s: "NCAA Division I (FBS)", n: "Mid-Tier Fit", m: 85, c: "#000" },
                { t: "Florida Atlantic University", s: "NCAA Division I (FBS)", n: "Good Fit", m: 78, c: "#1E40AF" },
                { t: "Georgia Southern University", s: "NCAA Division I (FBS)", n: "Good Fit", m: 72, c: "#1E3A8A" },
                { t: "Want more matches?", s: "Complete your profile and add more film to improve match accuracy.", b: "Improve My Matches", soft: true },
              ].map((c, i) => (
                <div key={i} style={{ padding: 10, border: "1px solid var(--mist)", borderRadius: 8, fontSize: 11 }}>
                  {!c.soft && (
                    <>
                      <div style={{ width: 30, height: 30, borderRadius: 999, background: c.c, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, marginBottom: 6 }}>{c.t.split(" ").map(w => w[0]).slice(0,3).join("")}</div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>{c.t}</div>
                      <div style={{ fontSize: 10, color: "var(--stone)" }}>{c.s}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "var(--success)", marginTop: 4 }}>{c.n}</div>
                      <div style={{ marginTop: 6, fontSize: 10, color: "var(--ink)", display: "flex", alignItems: "center", gap: 4 }}>
                        <span style={{ fontWeight: 700 }}>{c.m}%</span>
                        <span style={{ color: "var(--stone)" }}>Match</span>
                      </div>
                      <div style={{ height: 4, background: "var(--bone)", borderRadius: 999, overflow: "hidden", marginTop: 4 }}>
                        <div style={{ height: "100%", width: c.m + "%", background: "var(--student)" }}/>
                      </div>
                    </>
                  )}
                  {c.soft && (
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>{c.t}</div>
                      <div style={{ fontSize: 10, color: "var(--stone)", marginBottom: 6 }}>{c.s}</div>
                      <button style={{ padding: "5px 8px", background: "var(--student)", color: "#fff", border: "none", borderRadius: 6, fontSize: 10.5, fontWeight: 600, cursor: "pointer" }}>{c.b}</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Recruiting + Visibility + Contact Requests + Commitments */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <I.Sparkle size={13} color="var(--student)"/>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>LINKS AI – Recruiting Assistant</div>
              <span style={{ fontSize: 9, fontWeight: 700, color: "var(--student-deep)", background: "var(--student-soft)", padding: "1px 4px", borderRadius: 3, marginLeft: "auto" }}>BETA</span>
            </div>
            <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 10 }}>Hi Jerrell! Let's make your profile stand out.</div>
            {[
              { t: "Improve Your Highlight Reel", s: "AI will create a reel of your top plays" },
              { t: "Build a College-Ready Profile", s: "See what top programs look for" },
              { t: "Draft Message to Coaches", s: "AI will help you write the perfect intro" },
              { t: "Find Programs That Fit You", s: "Match with schools that want your talent" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderTop: i ? "1px solid var(--mist)" : "none", alignItems: "center" }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "var(--student-soft)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I.Sparkle size={11} color="var(--student)"/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{s.t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{s.s}</div>
                </div>
                <I.ChevronRight size={11} color="var(--silver)"/>
              </div>
            ))}
            <div style={{ display: "flex", gap: 6, padding: 8, background: "var(--bone)", borderRadius: 8, marginTop: 8 }}>
              <input placeholder="Ask me anything..." style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 11.5 }}/>
              <I.PaperPlane size={12} color="var(--student)"/>
            </div>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">RECRUITING VISIBILITY</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>Manage</a>
            </div>
            {[
              { t: "Profile Visibility", s: "Visible to Verified Recruiters", ic: I.Eye, c: "var(--success)" },
              { t: "Contact Requests", s: "2 Pending", ic: I.Clock, c: "#F59E0B", pill: 2 },
              { t: "Parent/Guardian Consent", s: "Approved", ic: I.CircleCheck, c: "var(--success)" },
              { t: "School Approval", s: "Approved", ic: I.CircleCheck, c: "var(--success)" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{r.t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{r.s}</div>
                </div>
                <r.ic size={14} color={r.c}/>
              </div>
            ))}
            <button style={{ marginTop: 10, width: "100%", padding: "8px 14px", background: "var(--paper)", border: "1px solid var(--student)", color: "var(--student-deep)", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View &amp; Edit Visibility Settings</button>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div className="t-eyebrow">CONTACT REQUESTS</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            <div style={{ background: "#FFFBEB", padding: 8, borderRadius: 6, marginBottom: 8, fontSize: 11, color: "#92400E" }}>
              ⚠ 2 Colleges have requested contact · School review pending
            </div>
            {[
              { t: "University of Central Florida", s: "Requested May 12, 2025", c: "#000" },
              { t: "Florida Atlantic University", s: "Requested May 9, 2025", c: "#1E40AF" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: i ? "1px solid var(--mist)" : "none", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 999, background: r.c, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 800 }}>{r.t.split(" ").map(w=>w[0]).slice(0,3).join("")}</div>
                  <div>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)" }}>{r.t}</div>
                    <div style={{ fontSize: 10, color: "var(--stone)" }}>{r.s}</div>
                  </div>
                </div>
                <MK_Pill tone="pending">Pending</MK_Pill>
              </div>
            ))}
            <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", marginTop: 6, display: "inline-block" }}>How Contact Requests Work →</a>
          </div>

          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>My Commitments <span style={{ color: "var(--silver)", fontWeight: 500 }}>(from My Desk)</span></div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            {[
              { t: "Upload 2025 Highlight Reel", s: "In Progress", tone: "warning" },
              { t: "Respond to Coach Request", s: "In Progress", tone: "warning" },
              { t: "Improve Pass Protection Clips", s: "Due May 20", tone: "danger" },
              { t: "Add Strength & Conditioning Info", s: "Planned", tone: "neutral" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderTop: i ? "1px solid var(--mist)" : "none", fontSize: 12, alignItems: "center" }}>
                <div style={{ color: "var(--ink)", fontWeight: 500 }}>{c.t}</div>
                <MK_Pill tone={c.tone}>{c.s}</MK_Pill>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ACTIVITIES OVERVIEW (Discover) — refined to match screenshot
   ============================================================ */
function ActivitiesOverviewRefined({ segments }) {
  return (
    <Page segments={segments} title="My Activities" emoji="🎉"
      lede="Get involved. Build skills. Make memories."
      actions={<button className="btn btn-sm"><I.Heart size={11} color="var(--stone)"/> Manage Interests</button>}
      rightRail={
        <>
          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">MY ACTIVITIES</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View all</a>
            </div>
            {[
              { ic: "🏀", c: "#FED7AA", t: "Varsity Basketball", s: "Next: Practice Today, 3:30 PM" },
              { ic: "🤖", c: "#DBEAFE", t: "Robotics Club", s: "Next: Meeting May 23, 3:15 PM" },
              { ic: "👥", c: "#DCFCE7", t: "Student Council", s: "Next: Meeting May 22, 7:30 AM" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "9px 0", borderTop: i ? "1px solid var(--mist)" : "none", alignItems: "center" }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: a.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{a.ic}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)" }}>{a.t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{a.s}</div>
                </div>
                <I.ChevronRight size={11} color="var(--silver)"/>
              </div>
            ))}
            <button style={{ marginTop: 10, width: "100%", padding: "8px 14px", background: "var(--student-soft)", color: "var(--student-deep)", border: "none", borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View My Activities</button>
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">UPCOMING EVENTS</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View calendar</a>
            </div>
            {[
              { d: "MAY 22", t: "Robotics Club Meeting", s: "Today · 3:15 PM · Room 112" },
              { d: "MAY 23", t: "Baseball Game", s: "Tomorrow · 4:30 PM · vs. Lincoln High" },
              { d: "MAY 24", t: "Spring Soccer Championship", s: "Sat · 1:00 PM · Home" },
            ].map((e, i) => (
              <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 38, textAlign: "center", flexShrink: 0 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--student-deep)" }}>{e.d.split(" ")[1]}</div>
                  <div style={{ fontSize: 9, color: "var(--stone)", fontWeight: 700 }}>{e.d.split(" ")[0]}</div>
                </div>
                <div style={{ flex: 1, paddingLeft: 8, borderLeft: "1px solid var(--mist)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)" }}>{e.t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{e.s}</div>
                </div>
              </div>
            ))}
            <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none", marginTop: 8, display: "inline-block" }}>See full calendar →</a>
          </MK_Card>

          <MK_Card padding={18}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div className="t-eyebrow">ANNOUNCEMENTS</div>
              <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View All</a>
            </div>
            {[
              { ic: "🎾", t: "Tennis Tryouts Next Week", s: "May 20 · Athletics Department" },
              { ic: "📔", t: "Yearbook Club Meeting", s: "May 19 · Room 205" },
              { ic: "🌷", t: "Community Service Opportunity", s: "May 18 · Key Club" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 8, padding: "7px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "var(--bone)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{a.ic}</div>
                <div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)" }}>{a.t}</div>
                  <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{a.s}</div>
                </div>
              </div>
            ))}
          </MK_Card>
        </>
      }
    >
      {/* L2 tabs */}
      <div style={{ display: "flex", gap: 14, marginBottom: 16, borderBottom: "1px solid var(--mist)" }}>
        {["Discover", "My Activities", "Events Calendar", "Sign-Ups & Tryouts", "Announcements"].map((t, i) => {
          const a = i === 0;
          return <a key={t} href={i === 2 ? "#/my-activities/events" : "#"} style={{ padding: "10px 6px", textDecoration: "none", color: a ? "var(--student-deep)" : "var(--stone)", fontSize: 13, fontWeight: a ? 600 : 500, borderBottom: a ? "2px solid var(--student)" : "2px solid transparent", marginBottom: -1, whiteSpace: "nowrap" }}>{t}</a>;
        })}
      </div>

      {/* AI Recommendations */}
      <MK_Card padding={16} style={{ marginBottom: 16, background: "var(--student-soft)", border: "1px solid var(--student-200)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <I.Sparkle size={13} color="var(--student)"/>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>AI Recommendations for You</div>
          </div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View all →</a>
        </div>
        <div style={{ fontSize: 11.5, color: "var(--stone)", marginBottom: 10 }}>Based on your interests, classes, and activity</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { ic: "🤖", c: "#DBEAFE", t: "Robotics Club", s: "Love problem solving and building things? You'd fit right in!", m: 92 },
            { ic: "🌱", c: "#DCFCE7", t: "Environmental Club", s: "Make an impact and help sustain our planet.", m: 88 },
            { ic: "🎤", c: "#FED7AA", t: "Debate Team", s: "Sharpen your voice and critical thinking.", m: 85 },
          ].map((r, i) => (
            <div key={i} style={{ background: "var(--paper)", padding: 12, borderRadius: 8, position: "relative" }}>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
                <div style={{ width: 36, height: 36, borderRadius: 6, background: r.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{r.ic}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{r.t}</div>
                </div>
                <button style={{ width: 22, height: 22, borderRadius: 999, background: "var(--student-soft)", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><I.Plus size={10} color="var(--student)"/></button>
              </div>
              <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>{r.s}</div>
              <MK_Pill tone="success">✓ {r.m}% match</MK_Pill>
            </div>
          ))}
        </div>
      </MK_Card>

      {/* Featured This Week */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div className="t-eyebrow">FEATURED THIS WEEK</div>
          <a href="#" style={{ fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600, textDecoration: "none" }}>View all events →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { bg: "linear-gradient(135deg, #16A34A, #15803D)", img: "⚽", t: "Spring Soccer Championship", date: "MAY 24", sub: "vs. Westfield High", info: ["📅 Sat, May 24 · 1:00 PM", "📍 Home"], featured: true, btn: "View Details" },
            { bg: "linear-gradient(135deg, #DC2626, #B91C1C)", img: "🎨", t: "Art Club Creativity Night", date: "MAY 27", sub: "Open to all students!", info: ["📅 Tue, May 27 · 6:00 PM", "📍 Art Room 204"], btn: "I'm Interested" },
            { bg: "linear-gradient(135deg, #EA580C, #C2410C)", img: "🎭", t: "Spring Talent Show", date: "MAY 30", sub: "Show off your talent!", info: ["📅 Fri, May 30 · 7:00 PM", "📍 Auditorium"], btn: "Get Tickets" },
          ].map((e, i) => (
            <MK_Card key={i} padding={0} style={{ overflow: "hidden" }}>
              <div style={{ height: 110, background: e.bg, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60 }}>
                {e.featured && <span style={{ position: "absolute", top: 8, left: 8, background: "var(--student)", color: "#fff", fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 3, letterSpacing: "0.05em" }}>FEATURED</span>}
                <span style={{ position: "absolute", top: 8, right: 8, background: "var(--paper)", color: "var(--ink)", fontSize: 10, fontWeight: 700, padding: "3px 6px", borderRadius: 4, fontFamily: "var(--font-display)" }}>{e.date.split(" ")[1]}<br/><span style={{ fontSize: 8 }}>{e.date.split(" ")[0]}</span></span>
                {e.t.includes("Talent") && <span style={{ position: "absolute", top: 8, left: 8, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 14, fontWeight: 700, padding: "0 6px", borderRadius: 3 }}>×</span>}
              </div>
              <div style={{ padding: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{e.t}</div>
                <div style={{ fontSize: 11, color: "var(--stone)", marginBottom: 8 }}>{e.sub}</div>
                {e.info.map((x, j) => <div key={j} style={{ fontSize: 11, color: "var(--stone)" }}>{x}</div>)}
                <button style={{ marginTop: 8, padding: "6px 12px", background: i === 0 ? "var(--student)" : "var(--paper)", color: i === 0 ? "#fff" : "var(--student-deep)", border: i === 0 ? "none" : "1px solid var(--student-200)", borderRadius: 6, fontSize: 11.5, fontWeight: 600, cursor: "pointer" }}>{e.btn}</button>
              </div>
            </MK_Card>
          ))}
        </div>
      </div>

      {/* Explore Activities */}
      <div style={{ marginBottom: 16 }}>
        <div className="t-eyebrow" style={{ marginBottom: 10 }}>EXPLORE ACTIVITIES</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[
            { ic: "👥", c: "#DBEAFE", t: "Clubs", n: "28 Clubs", s: "Robotics, Art, Debate & more" },
            { ic: "🏆", c: "#FEF3C7", t: "Athletics", n: "16 Teams", s: "Sports & competitions" },
            { ic: "🎵", c: "#FEE2E2", t: "Performing Arts", n: "8 Groups", s: "Music, Theater, Dance" },
            { ic: "🌱", c: "#DCFCE7", t: "Service & Leadership", n: "12 Groups", s: "Make a difference" },
          ].map((c, i) => (
            <MK_Card key={i} padding={14} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ width: 36, height: 36, borderRadius: 6, background: c.c, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{c.ic}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{c.t}</div>
                <div style={{ fontSize: 11, color: "var(--student-deep)", fontWeight: 600 }}>{c.n}</div>
                <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{c.s}</div>
              </div>
              <I.ChevronRight size={12} color="var(--silver)"/>
            </MK_Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <MK_Card padding={16} style={{ background: "#FAFAF9" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
          <div className="t-eyebrow">HOW IT WORKS</div>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>(Join something great)</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1.5fr", gap: 14, alignItems: "center" }}>
          {[
            { ic: I.Search, t: "Discover", s: "Find activities you love" },
            { ic: I.CircleCheck, t: "Join", s: "Sign up or try out for a spot" },
            { ic: I.Star, t: "Get Involved", s: "Attend meetings and events" },
            { ic: I.Heart, t: "Make an Impact", s: "Grow, lead, and make memories" },
          ].map((s, i) => (
            <div key={i} style={{ background: "#DCFCE7", padding: 12, borderRadius: 8, textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: "#86EFAC", margin: "0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <s.ic size={14} color="#15803D"/>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink)", marginTop: 6 }}>{s.t}</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{s.s}</div>
            </div>
          ))}
          <div style={{ background: "var(--student-soft)", padding: 12, borderRadius: 8, display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>Need help finding the right activity?</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)", marginBottom: 6 }}>Chat with AI Assistant for personalized suggestions.</div>
              <button style={{ padding: "5px 10px", background: "var(--paper)", border: "1px solid var(--student-200)", color: "var(--student-deep)", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Ask AI Assistant</button>
            </div>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: "var(--student)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
          </div>
        </div>
      </MK_Card>
    </Page>
  );
}

window.FootballTeamPage = FootballTeamPage;
window.RecruitingProfilePage = RecruitingProfilePage;
window.ActivitiesOverviewRefined = ActivitiesOverviewRefined;

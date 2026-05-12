// LINKS — Messages: Email view (inbox + detail + AI compose helper)

const EmailPortrait = window.MessagesPortrait;

function EmailView({ subView = "detail", onSelectThread }) {
  // subView: "detail" | "compose"
  return (
    <div style={{ display: "flex", flex: 1, gap: 18, minWidth: 0 }}>
      <EmailInbox/>
      {subView === "detail" ? <EmailDetail/> : <EmailComposeHelper/>}
    </div>
  );
}

/* ─────────── Inbox ─────────── */

function EmailInbox() {
  const folders = [
    { icon: "Inbox", label: "Inbox", count: 12, active: true },
    { icon: "Star", label: "Starred", count: 3 },
    { icon: "Send", label: "Sent" },
    { icon: "Document", label: "Drafts", count: 2 },
    { icon: "Archive", label: "Archive" },
    { icon: "Trash", label: "Trash" },
  ];
  const labels = [
    { color: "#8B5CF6", label: "School", count: 24 },
    { color: "#22C55E", label: "Family", count: 8 },
    { color: "#F59E0B", label: "Sports", count: 4 },
    { color: "#0EA5E9", label: "College", count: 6 },
  ];
  const emails = [
    { from: "Ms. Carter", subject: "Argument Essay — Feedback on your draft", preview: "Hi Alex, I've reviewed your draft and have some thoughts on your counterargument…", time: "9:24 AM", unread: true, starred: true, hue: 350, label: { color: "#8B5CF6", text: "School" } },
    { from: "Wyn Park Academy", subject: "Spring Parent–Teacher Conferences", preview: "Conferences will be held March 14–16. Please sign up for a time slot.", time: "8:30 AM", unread: true, hue: 220, label: { color: "#8B5CF6", text: "School" } },
    { from: "Coach Hill", subject: "Saturday game — schedule change", preview: "Hi team, the Saturday game has been moved from 10 AM to 1 PM. Please…", time: "Yesterday", unread: false, hue: 100, label: { color: "#F59E0B", text: "Sports" } },
    { from: "Mom", subject: "Doctor's appointment Thursday", preview: "Don't forget you have a checkup at 4:30 on Thursday. Dad will pick you up.", time: "Yesterday", unread: false, starred: true, hue: 320, label: { color: "#22C55E", text: "Family" } },
    { from: "College Board", subject: "Your PSAT score report is ready", preview: "Hi Alex, your PSAT score report from October is now available…", time: "Tue", unread: true, hue: 200, label: { color: "#0EA5E9", text: "College" } },
    { from: "Mr. Johnson", subject: "Excellent presentation today!", preview: "I just wanted to say what a fantastic job you did on your presentation today.", time: "Tue", unread: false, hue: 30, label: { color: "#8B5CF6", text: "School" } },
    { from: "Ms. Patel", subject: "Scholarship Opportunity — Deadline Mar 15", preview: "Hi Alex, I came across this STEM scholarship and thought you'd be a great fit…", time: "Mon", unread: true, hue: 280, label: { color: "#0EA5E9", text: "College" } },
    { from: "Khan Academy", subject: "You earned a new badge!", preview: "Congratulations — you've completed 5 quizzes in a row!", time: "Mon", unread: false, hue: 140 },
  ];
  return (
    <div style={{ width: 380, flexShrink: 0, display: "flex", gap: 0 }}>
      {/* Folders rail */}
      <div style={{
        width: 168, background: "var(--paper)",
        borderRadius: "16px 0 0 16px",
        boxShadow: "var(--shadow-card)",
        padding: "16px 12px",
        display: "flex", flexDirection: "column", gap: 12,
      }}>
        <button style={{
          padding: "10px 14px",
          background: "var(--student)", color: "#fff",
          border: "none", borderRadius: 10,
          fontSize: 12.5, fontWeight: 600, cursor: "pointer",
          display: "inline-flex", alignItems: "center", gap: 6,
          width: "100%", justifyContent: "center",
        }}>
          <I.Compose size={13} color="#fff"/> Compose
        </button>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {folders.map((f) => {
            const Ico = I[f.icon];
            return (
              <button key={f.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "7px 10px", border: "none", cursor: "pointer",
                background: f.active ? "var(--student-soft)" : "transparent",
                color: f.active ? "var(--student-deep)" : "var(--slate)",
                borderRadius: 8, fontSize: 12.5,
                fontWeight: f.active ? 600 : 500,
                textAlign: "left",
              }}>
                <Ico size={13} color={f.active ? "var(--student)" : "var(--stone)"}/>
                <span style={{ flex: 1 }}>{f.label}</span>
                {f.count && <span style={{ fontSize: 11, color: f.active ? "var(--student)" : "var(--silver)", fontWeight: 600 }}>{f.count}</span>}
              </button>
            );
          })}
        </div>
        <div style={{ paddingTop: 8, borderTop: "1px solid var(--mist)" }}>
          <div className="t-eyebrow" style={{ fontSize: 10, color: "var(--silver)", padding: "0 4px 6px" }}>Labels</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {labels.map((l) => (
              <button key={l.label} style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "6px 10px", border: "none", background: "transparent",
                cursor: "pointer", borderRadius: 8, fontSize: 12, color: "var(--slate)",
                textAlign: "left",
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: l.color }}/>
                <span style={{ flex: 1 }}>{l.label}</span>
                <span style={{ fontSize: 10.5, color: "var(--silver)" }}>{l.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Email list */}
      <div style={{
        flex: 1, minWidth: 0,
        background: "var(--paper)",
        borderRadius: "0 16px 16px 0",
        boxShadow: "var(--shadow-card)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        borderLeft: "1px solid var(--mist)",
      }}>
        <div style={{ padding: "14px 14px 8px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--mist)" }}>
          <h2 className="t-h2" style={{ fontSize: 17, margin: 0, flex: 1 }}>Inbox <span style={{ fontSize: 12, color: "var(--silver)", fontWeight: 500 }}>(12 new)</span></h2>
          <button style={iconBtnE}><I.Search size={13} color="var(--stone)"/></button>
          <button style={iconBtnE}><I.Filter size={13} color="var(--stone)"/></button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {emails.map((e, i) => (
            <button key={i} style={{
              display: "flex", gap: 10, padding: "10px 14px",
              borderBottom: "1px solid var(--mist)",
              background: i === 0 ? "var(--student-soft)" : (e.unread ? "rgba(139,92,246,0.03)" : "transparent"),
              border: "none", borderLeft: i === 0 ? "3px solid var(--student)" : "3px solid transparent",
              width: "100%", textAlign: "left", cursor: "pointer",
            }}>
              <EmailPortrait name={e.from} hue={e.hue} size={36}/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 2 }}>
                  <span style={{ fontSize: 12.5, fontWeight: e.unread ? 700 : 500, color: "var(--ink)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.from}</span>
                  {e.starred && <I.Star size={11} color="#F59E0B"/>}
                  <span style={{ fontSize: 10.5, color: "var(--silver)" }}>{e.time}</span>
                </div>
                <div style={{ fontSize: 12.5, fontWeight: e.unread ? 600 : 500, color: "var(--ink)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{e.subject}</div>
                <div style={{ fontSize: 11.5, color: "var(--stone)", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{e.preview}</div>
                {e.label && (
                  <div style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: e.label.color }}/>
                    <span style={{ fontSize: 10, color: "var(--stone)" }}>{e.label.text}</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const iconBtnE = {
  width: 28, height: 28, borderRadius: 6,
  background: "transparent", border: "none", cursor: "pointer",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
};

/* ─────────── Email Detail ─────────── */

function EmailDetail() {
  return (
    <div style={{ flex: 1, minWidth: 0, background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 8 }}>
        <button style={iconBtnE}><I.ChevronLeft size={14} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.Archive size={13} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.Trash size={13} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.Mail size={13} color="var(--stone)"/></button>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 11.5, color: "var(--silver)" }}>2 of 24</span>
        <button style={iconBtnE}><I.ChevronLeft size={13} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.ChevronRight size={13} color="var(--stone)"/></button>
      </div>
      <div style={{ padding: "20px 28px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0, color: "var(--ink)" }}>Argument Essay — Feedback on your draft</h1>
          <span className="pill" style={{ background: "var(--student-soft)", color: "var(--student-deep)", fontSize: 10.5, padding: "2px 8px" }}>School</span>
          <I.Star size={14} color="#F59E0B"/>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 14, borderBottom: "1px solid var(--mist)" }}>
          <EmailPortrait name="Ms. Carter" hue={350} size={44}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>Ms. Carter <span style={{ fontSize: 12, fontWeight: 400, color: "var(--stone)" }}>&lt;m.carter@wynpark.edu&gt;</span></div>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>To: alex.thompson@wynpark.edu · 9:24 AM</div>
          </div>
          <button className="btn btn-sm btn-secondary" style={{ height: 28, fontSize: 11.5 }}>
            <I.Reply size={12} color="var(--slate)"/> Reply
          </button>
          <button className="btn btn-sm btn-secondary" style={{ height: 28, fontSize: 11.5 }}>
            <I.Forward size={12} color="var(--slate)"/> Forward
          </button>
          <button style={iconBtnE}><I.MoreH size={13} color="var(--stone)"/></button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "18px 28px 22px" }}>
        <div style={{ fontSize: 13.5, color: "var(--ink)", lineHeight: 1.7 }}>
          <p style={{ margin: "0 0 14px" }}>Hi Alex,</p>
          <p style={{ margin: "0 0 14px" }}>I've reviewed your draft of the argument essay and wanted to share some thoughts before Friday's deadline. Overall, your thesis is strong and clearly stated, and I love the way you've organized your introduction.</p>
          <p style={{ margin: "0 0 14px" }}>A few areas to consider:</p>
          <ul style={{ margin: "0 0 14px 20px", paddingLeft: 0, color: "var(--slate)" }}>
            <li style={{ marginBottom: 6 }}>Your <b>counterargument section</b> needs more specific evidence. Right now it's mostly general claims — try to add at least one direct citation from your scholarly sources.</li>
            <li style={{ marginBottom: 6 }}>The transition between paragraphs 3 and 4 could be smoother. Consider adding a sentence to bridge them.</li>
            <li style={{ marginBottom: 6 }}>Your conclusion is solid, but I'd love to see one more sentence connecting back to your opening hook.</li>
          </ul>
          <p style={{ margin: "0 0 14px" }}>I've attached your draft with my inline comments. Office hours are Mon &amp; Wed 3:00–4:30 PM if you'd like to discuss.</p>
          <p style={{ margin: "0 0 14px" }}>Keep up the great work!</p>
          <p style={{ margin: 0, color: "var(--stone)" }}>— Ms. Carter<br/><span style={{ fontSize: 11.5, color: "var(--silver)" }}>English 10 · Wyn Park Academy · Room 204</span></p>
        </div>

        {/* Attachments */}
        <div style={{ marginTop: 22, paddingTop: 16, borderTop: "1px solid var(--mist)" }}>
          <div className="t-eyebrow" style={{ fontSize: 10, color: "var(--silver)", marginBottom: 10 }}>2 Attachments</div>
          <div style={{ display: "flex", gap: 10 }}>
            <AttachmentCard name="Argument_Essay_Draft_Feedback.docx" size="248 KB" color="#3B82F6"/>
            <AttachmentCard name="Argument_Essay_Rubric.pdf" size="124 KB" color="#EF4444"/>
          </div>
        </div>

        {/* AI summary */}
        <div style={{
          marginTop: 16,
          background: "linear-gradient(90deg, rgba(139,92,246,0.06), rgba(59,130,246,0.06))",
          borderRadius: 12,
          padding: "12px 14px",
          border: "1px dashed rgba(139,92,246,0.30)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <I.Sparkle size={13} color="var(--student)"/>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--student-deep)" }}>AI Summary</span>
          </div>
          <div style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.6 }}>
            Ms. Carter wants you to (1) strengthen your counterargument with direct citations, (2) improve the transition between paragraphs 3 and 4, and (3) tie the conclusion back to your opening hook.
          </div>
        </div>
      </div>
      {/* Reply dock */}
      <div style={{ borderTop: "1px solid var(--mist)", padding: "12px 22px", background: "var(--bone)" }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button className="btn btn-secondary" style={{ flex: 1, justifyContent: "flex-start", height: 40, fontSize: 12.5, color: "var(--stone)" }}>
            <I.Reply size={13} color="var(--stone)"/> Reply to Ms. Carter…
          </button>
          <button className="btn btn-primary" style={{ height: 40, fontSize: 12.5 }}>
            <I.Sparkle size={13} color="#fff"/> AI Help
          </button>
        </div>
      </div>
    </div>
  );
}

function AttachmentCard({ name, size, color }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, padding: 10, border: "1px solid var(--mist)", borderRadius: 10, background: "var(--paper)", maxWidth: 260 }}>
      <div style={{ width: 36, height: 44, borderRadius: 6, background: `${color}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <I.Document size={18} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        <div style={{ fontSize: 11, color: "var(--stone)" }}>{size}</div>
      </div>
      <button style={iconBtnE}><I.Download size={13} color="var(--stone)"/></button>
    </div>
  );
}

/* ─────────── Compose helper ─────────── */

function EmailComposeHelper() {
  return (
    <div style={{ flex: 1, minWidth: 0, background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ padding: "16px 22px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 10 }}>
        <h2 className="t-h2" style={{ fontSize: 17, margin: 0, flex: 1 }}>New Message</h2>
        <button style={iconBtnE}><I.Minimize size={13} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.Maximize size={13} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.X size={13} color="var(--stone)"/></button>
      </div>
      <div style={{ padding: "10px 22px", borderBottom: "1px solid var(--mist)", display: "flex", flexDirection: "column", gap: 6 }}>
        <FieldRow label="To" value={<span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 8px 3px 4px", background: "var(--student-soft)", borderRadius: 999, fontSize: 12 }}>
            <EmailPortrait name="Ms. Carter" hue={350} size={20}/>
            Ms. Carter <span style={{ color: "var(--silver)" }}>&lt;m.carter@wynpark.edu&gt;</span>
          </span>
        </span>}/>
        <FieldRow label="Subject" value={<input defaultValue="Question about Argument Essay sources" style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13, color: "var(--ink)", fontWeight: 500 }}/>}/>
      </div>

      {/* AI compose helper */}
      <div style={{
        margin: "14px 22px 0",
        background: "linear-gradient(135deg, rgba(139,92,246,0.06), rgba(59,130,246,0.04))",
        border: "1px dashed rgba(139,92,246,0.30)",
        borderRadius: 14,
        padding: "14px 16px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--student)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.Sparkle size={13} color="#fff"/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--student-deep)" }}>AI Compose Helper</div>
            <div style={{ fontSize: 11.5, color: "var(--stone)" }}>Pick a starting point, or describe what you want to say.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          <ToneChip label="📚 Polite question" active/>
          <ToneChip label="📝 Request feedback"/>
          <ToneChip label="📅 Schedule meeting"/>
          <ToneChip label="🙏 Thank you note"/>
          <ToneChip label="📋 Submit homework"/>
        </div>
        <div style={{ background: "var(--paper)", borderRadius: 10, padding: 12, border: "1px solid var(--mist)", marginBottom: 10 }}>
          <div className="t-eyebrow" style={{ fontSize: 9.5, color: "var(--silver)", marginBottom: 6 }}>Suggested draft</div>
          <div style={{ fontSize: 13, color: "var(--ink)", lineHeight: 1.65 }}>
            <p style={{ margin: "0 0 8px" }}>Hi Ms. Carter,</p>
            <p style={{ margin: "0 0 8px" }}>I had a quick question about the sources for the argument essay due Friday. Are we required to use scholarly sources only, or can a reputable news source count as one of the three?</p>
            <p style={{ margin: "0 0 8px" }}>I want to make sure I'm including the right kinds of references before I finalize my draft. Thanks for your help!</p>
            <p style={{ margin: 0 }}>Best,<br/>Alex</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <PillBtn icon="Check" label="Use this draft" tint primary/>
          <PillBtn icon="Refresh" label="Regenerate"/>
          <PillBtn icon="Edit" label="Make shorter"/>
          <PillBtn icon="Edit" label="More formal"/>
          <PillBtn icon="Edit" label="Add details"/>
        </div>
      </div>

      {/* Body editor */}
      <div style={{ flex: 1, padding: "14px 22px", overflowY: "auto" }}>
        <textarea
          placeholder="Write your message…"
          defaultValue={"Hi Ms. Carter,\n\nI had a quick question about the sources for the argument essay due Friday. Are we required to use scholarly sources only, or can a reputable news source count as one of the three?\n\nI want to make sure I'm including the right kinds of references before I finalize my draft. Thanks for your help!\n\nBest,\nAlex"}
          style={{
            width: "100%", minHeight: 180,
            border: "none", outline: "none", resize: "none",
            fontSize: 13.5, color: "var(--ink)", lineHeight: 1.7,
            background: "transparent", fontFamily: "inherit",
          }}
        />
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 22px", borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", gap: 6 }}>
        <button className="btn btn-primary" style={{ height: 36, fontSize: 13 }}>
          <I.Send size={13} color="#fff"/> Send
        </button>
        <button style={iconBtnE}><I.Paperclip size={14} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.Image size={14} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.Link size={14} color="var(--stone)"/></button>
        <button style={iconBtnE}><I.Smile size={14} color="var(--stone)"/></button>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 11, color: "var(--silver)" }}>Saved as draft · 9:42 AM</span>
        <button style={iconBtnE}><I.Trash size={13} color="var(--stone)"/></button>
      </div>
    </div>
  );
}

function FieldRow({ label, value }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0", borderBottom: "1px solid var(--mist)" }}>
      <span style={{ width: 60, fontSize: 12, color: "var(--silver)", fontWeight: 500 }}>{label}</span>
      <div style={{ flex: 1 }}>{value}</div>
    </div>
  );
}

function ToneChip({ label, active }) {
  return (
    <button style={{
      padding: "5px 11px",
      background: active ? "var(--student)" : "var(--paper)",
      color: active ? "#fff" : "var(--slate)",
      border: active ? "none" : "1px solid var(--mist)",
      borderRadius: 999,
      fontSize: 11.5, fontWeight: active ? 600 : 500,
      cursor: "pointer",
    }}>{label}</button>
  );
}

function PillBtn({ icon, label, primary, tint }) {
  const Ico = I[icon];
  return (
    <button style={{
      padding: "6px 11px",
      background: primary ? "var(--student)" : (tint ? "var(--student-soft)" : "var(--paper)"),
      color: primary ? "#fff" : "var(--student-deep)",
      border: primary ? "none" : "1px solid var(--mist)",
      borderRadius: 999,
      fontSize: 11.5, fontWeight: 600, cursor: "pointer",
      display: "inline-flex", alignItems: "center", gap: 5,
    }}>
      <Ico size={11} color={primary ? "#fff" : "var(--student)"}/> {label}
    </button>
  );
}

window.MessagesEmailView = EmailView;

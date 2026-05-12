// LINKS — Messages: right-side context panels & email view

const PanelData = window.MessagesData;
const PanelPortrait = window.MessagesPortrait;
const PanelGroupTile = window.MessagesGroupTile;

/* ─────────── Right panel: DM (teacher) ─────────── */

function PanelTeacher({ id, onClose }) {
  const conv = PanelData[id];
  return (
    <RightPanel onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 16px 18px", borderBottom: "1px solid var(--mist)" }}>
        <PanelPortrait name={conv.who} hue={conv.portrait.hue} size={72} dot={conv.presence === "online" ? "online" : null}/>
        <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 2px", color: "var(--ink)" }}>{conv.who}</h3>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>{conv.role}</div>
        <div style={{ fontSize: 11.5, color: "#22C55E", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E" }}/> Active now
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          <CircleAction icon="MessageCircle" label="Message"/>
          <CircleAction icon="Video" label="Call"/>
          <CircleAction icon="Bell" label="Mute"/>
          <CircleAction icon="Pin" label="Pin"/>
        </div>
      </div>

      <Section title="Office Hours">
        <Row icon="Calendar" label="Mondays" value="3:00 – 4:30 PM"/>
        <Row icon="Calendar" label="Wednesdays" value="3:00 – 4:30 PM"/>
        <Row icon="MapPin" label="Room" value="Room 204"/>
      </Section>

      <Section title="Shared Classes">
        <ClassRow icon="Book" color="#8B5CF6" name="English 10 — Period 2" sub="Argument Essay due Fri"/>
      </Section>

      <Section title="Shared Files" cta="View All (12)">
        <MsgFileRow icon="Document" name="Argument Essay Rubric.pdf" sub="Shared 3 days ago"/>
        <MsgFileRow icon="Image" name="Class_Notes_Feb24.png" sub="Shared 5 days ago"/>
        <MsgFileRow icon="Document" name="Reading_List.docx" sub="Shared 1 week ago"/>
      </Section>

      <Section title="Quick Links">
        <LinkRow icon="LinkOut" label="Class syllabus"/>
        <LinkRow icon="LinkOut" label="Office hours signup"/>
      </Section>
    </RightPanel>
  );
}

/* ─────────── Right panel: DM (classmate) — Jordan ─────────── */

function PanelClassmate({ id, onClose }) {
  const conv = PanelData[id];
  return (
    <RightPanel onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 16px 18px", borderBottom: "1px solid var(--mist)" }}>
        <PanelPortrait name={conv.who} hue={conv.portrait.hue} size={72} dot="online"/>
        <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 2px", color: "var(--ink)" }}>{conv.who}</h3>
        <div style={{ fontSize: 12.5, color: "var(--stone)" }}>{conv.role}</div>
        <div style={{ fontSize: 11.5, color: "#22C55E", marginTop: 4 }}>Active now</div>
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          <CircleAction icon="MessageCircle" label="Message"/>
          <CircleAction icon="Video" label="Call"/>
          <CircleAction icon="Bell" label="Mute"/>
          <CircleAction icon="Pin" label="Pin"/>
        </div>
      </div>

      <div style={{ padding: "12px 16px", background: "linear-gradient(90deg, rgba(139,92,246,0.04), rgba(59,130,246,0.04))" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <I.Sparkle size={12} color="var(--student)"/>
          <span className="t-eyebrow" style={{ color: "var(--student-deep)", fontSize: 10 }}>AI Conversation Insights</span>
        </div>
        <div style={{ fontSize: 12, color: "var(--slate)", lineHeight: 1.55 }}>
          You and Jordan have been collaborating on the <b>Argument Essay</b>. Recent topics: counterargument structure, source credibility, study session at 7 PM.
        </div>
      </div>

      <Section title="Shared Context">
        <ClassRow icon="Book" color="#8B5CF6" name="English 10 — Period 2" sub="Both currently working on Argument Essay"/>
        <ClassRow icon="Atom" color="#10B981" name="Biology 101" sub="Lab partners — Cell Biology unit"/>
        <ClassRow icon="Team" color="#F59E0B" name="History Project Team" sub="Group project, due Mar 15"/>
      </Section>

      <Section title="Recent Files Shared" cta="View All (8)">
        <MsgFileRow icon="Image" name="Social Media Regulation Article" sub="Shared 5 minutes ago" subColor="#22C55E"/>
        <MsgFileRow icon="Document" name="Argument Essay Outline.docx" sub="Shared yesterday"/>
        <MsgFileRow icon="Document" name="Bio_Lab_Notes.pdf" sub="Shared 2 days ago"/>
      </Section>

      <Section title="Suggested Actions">
        <ActionRow icon="Calendar" label="Schedule study session" sub="Jordan suggested 7 PM tonight"/>
        <ActionRow icon="Document" label="Open Argument Essay" sub="Continue working together"/>
        <ActionRow icon="Sparkle" label="AI: Summarize this chat"/>
      </Section>
    </RightPanel>
  );
}

/* ─────────── Right panel: Class Channel ─────────── */

function PanelClass({ id, onClose }) {
  const conv = PanelData[id];
  return (
    <RightPanel onClose={onClose}>
      <div style={{ padding: "14px 16px 18px", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <PanelGroupTile icon={I[conv.icon]} color={conv.color} size={52}/>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0, color: "var(--ink)" }}>{conv.who}</h3>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>Period 2 · Mon, Wed, Fri</div>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>Room 204 · Ms. Carter</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          <CircleAction icon="Bell" label="Mute"/>
          <CircleAction icon="Pin" label="Pin"/>
          <CircleAction icon="LinkOut" label="Open Class"/>
          <CircleAction icon="Star" label="Favorite"/>
        </div>
      </div>

      <Section title="Pinned Messages">
        <MsgFileRow icon="Pin" name="Argument Essay due Fri, Mar 2" sub="Pinned by Ms. Carter"/>
        <MsgFileRow icon="Pin" name="Persuasive writing unit starts Mon" sub="Pinned by Ms. Carter"/>
      </Section>

      <Section title="Upcoming Assignments">
        <AssignmentRow color="#EF4444" name="Argument Essay" due="Due Fri, Mar 2"/>
        <AssignmentRow color="#F59E0B" name="Reading Response: Ch. 12" due="Due Tue, Mar 5"/>
        <AssignmentRow color="#22C55E" name="Persuasive Speech Outline" due="Due Mar 12"/>
      </Section>

      <Section title="Members (24)" cta="View All">
        <PeopleRow name="Ms. Carter" role="Teacher" hue={350} online/>
        <PeopleRow name="Jordan Lee" hue={200} online/>
        <PeopleRow name="Taylor Kim" hue={280}/>
        <PeopleRow name="Marcus Patel" hue={40}/>
        <PeopleRow name="Avery Johnson" hue={100} online/>
      </Section>

      <Section title="Class Resources">
        <MsgFileRow icon="Document" name="Class Syllabus" sub="PDF · 320 KB"/>
        <MsgFileRow icon="Document" name="Reading List 2026" sub="PDF · 145 KB"/>
        <MsgFileRow icon="Image" name="Argument Essay Examples" sub="Folder · 8 files"/>
      </Section>
    </RightPanel>
  );
}

/* ─────────── Right panel: Assignment ─────────── */

function PanelAssignment({ id, onClose }) {
  return (
    <RightPanel onClose={onClose}>
      <div style={{ padding: "14px 16px 16px", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: 10, background: "var(--student-soft)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <I.Document size={22} color="var(--student)"/>
          </div>
          <div>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "var(--ink)" }}>Argument Essay</h3>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>English 10 — Period 2</div>
          </div>
        </div>
        <div className="pill pill-error" style={{ fontSize: 10.5, marginBottom: 10 }}>Due Fri, Mar 2 · 11:59 PM</div>
        <button className="btn btn-primary" style={{ width: "100%", height: 36, fontSize: 13 }}>
          <I.Document size={13} color="#fff"/> Open Assignment
        </button>
      </div>

      <Section title="Description">
        <p style={{ fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55, margin: 0 }}>
          Write a 5-paragraph argument essay on a topic of your choice. Address a counterargument and support your position with at least 3 credible sources.
        </p>
      </Section>

      <Section title="Rubric" cta="View Full">
        <RubricRow label="Thesis Statement" pts={20}/>
        <RubricRow label="Evidence & Sources" pts={30}/>
        <RubricRow label="Counterargument" pts={20}/>
        <RubricRow label="Organization" pts={15}/>
        <RubricRow label="Grammar & Style" pts={15}/>
      </Section>

      <Section title="My Submission">
        <MsgFileRow icon="Document" name="Argument_Essay_Final.docx" sub="Submitted Feb 28, 8:42 PM" subColor="#22C55E"/>
        <MsgFileRow icon="Document" name="Argument_Essay_Outline.docx" sub="Draft · Feb 25"/>
      </Section>

      <Section title="Feedback from Ms. Carter">
        <div style={{ padding: 12, background: "var(--bone)", borderRadius: 10, fontSize: 12.5, color: "var(--slate)", lineHeight: 1.55 }}>
          Strong thesis and well-organized argument. Your counterargument section could use more specific evidence. Excellent use of scholarly sources!
          <div style={{ marginTop: 8, fontSize: 11, color: "var(--silver)" }}>— Ms. Carter, Mar 1, 2026</div>
        </div>
      </Section>

      <Section title="Classmates Working on This">
        <PeopleRow name="Jordan Lee" status="In progress" hue={200} online/>
        <PeopleRow name="Taylor Kim" status="Submitted" hue={280} statusColor="#22C55E"/>
        <PeopleRow name="Marcus Patel" status="Not started" hue={40} statusColor="#94A3B8"/>
      </Section>
    </RightPanel>
  );
}

/* ─────────── Inline panel pieces ─────────── */

function RightPanel({ children, onClose }) {
  return (
    <div style={{
      width: 340, flexShrink: 0,
      background: "var(--paper)",
      borderRadius: 16,
      boxShadow: "var(--shadow-card)",
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {children}
      </div>
      {onClose && (
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 16,
          width: 24, height: 24, borderRadius: 6,
          background: "transparent", border: "none", cursor: "pointer",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <I.X size={14} color="var(--stone)"/>
        </button>
      )}
    </div>
  );
}

function Section({ title, children, cta }) {
  return (
    <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--mist)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span className="t-eyebrow" style={{ fontSize: 10.5, color: "var(--silver)" }}>{title}</span>
        {cta && <button style={{ background: "transparent", border: "none", color: "var(--student)", fontSize: 11.5, fontWeight: 600, cursor: "pointer", padding: 0 }}>{cta}</button>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{children}</div>
    </div>
  );
}

function CircleAction({ icon, label }) {
  const Ico = I[icon];
  return (
    <button title={label} style={{
      flex: 1,
      padding: "8px 0",
      background: "var(--bone)",
      border: "none", borderRadius: 10,
      display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      cursor: "pointer",
    }}>
      <Ico size={15} color="var(--slate)"/>
      <span style={{ fontSize: 10.5, color: "var(--slate)", fontWeight: 500 }}>{label}</span>
    </button>
  );
}

function Row({ icon, label, value }) {
  const Ico = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Ico size={13} color="var(--silver)"/>
      <span style={{ fontSize: 12, color: "var(--stone)", flex: 1 }}>{label}</span>
      <span style={{ fontSize: 12, color: "var(--ink)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function ClassRow({ icon, color, name, sub }) {
  const Ico = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 8, background: "var(--bone)", borderRadius: 8 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ico size={13} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--stone)" }}>{sub}</div>}
      </div>
    </div>
  );
}

function MsgFileRow({ icon, name, sub, subColor }) {
  const Ico = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 6, cursor: "pointer", borderRadius: 6 }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: "var(--bone)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Ico size={13} color="var(--stone)"/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>
        {sub && <div style={{ fontSize: 10.5, color: subColor || "var(--stone)" }}>{sub}</div>}
      </div>
    </div>
  );
}

function LinkRow({ icon, label }) {
  const Ico = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 6, cursor: "pointer" }}>
      <Ico size={13} color="var(--student)"/>
      <span style={{ fontSize: 12, color: "var(--student)", fontWeight: 500 }}>{label}</span>
    </div>
  );
}

function ActionRow({ icon, label, sub }) {
  const Ico = I[icon];
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 8, background: "var(--bone)", borderRadius: 8, cursor: "pointer" }}>
      <Ico size={14} color="var(--student)"/>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{label}</div>
        {sub && <div style={{ fontSize: 11, color: "var(--stone)" }}>{sub}</div>}
      </div>
      <I.ChevronRight size={12} color="var(--silver)"/>
    </div>
  );
}

function AssignmentRow({ color, name, due }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 8, borderLeft: `3px solid ${color}`, background: "var(--bone)", borderRadius: 6 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{name}</div>
        <div style={{ fontSize: 11, color }}>{due}</div>
      </div>
    </div>
  );
}

function PeopleRow({ name, role, hue = 200, online, status, statusColor }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <PanelPortrait name={name} hue={hue} size={28} dot={online ? "online" : null}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, fontWeight: 500, color: "var(--ink)" }}>
          {name}
          {role && <span style={{ marginLeft: 6, fontSize: 10, padding: "1px 6px", background: "var(--student-soft)", color: "var(--student-deep)", borderRadius: 3, fontWeight: 600 }}>{role}</span>}
        </div>
        {status && <div style={{ fontSize: 10.5, color: statusColor || "var(--stone)" }}>{status}</div>}
      </div>
    </div>
  );
}

function RubricRow({ label, pts }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
      <span style={{ color: "var(--slate)" }}>{label}</span>
      <span style={{ color: "var(--ink)", fontWeight: 600 }}>{pts} pts</span>
    </div>
  );
}

window.MessagesPanelTeacher = PanelTeacher;
window.MessagesPanelClassmate = PanelClassmate;
window.MessagesPanelClass = PanelClass;
window.MessagesPanelAssignment = PanelAssignment;

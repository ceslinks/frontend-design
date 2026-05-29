/* ============================================================
   PROJECT MANAGER — My Schedule › Projects
   Route: #/my-time/my-schedule/projects
   ============================================================ */

/* ── Course color palette (matching calendar / to-do tokens) ── */
const PM_COURSES = {
  biology:  { label: "Biology 101",  bg: "#DCFCE7", fg: "#15803D" },
  history:  { label: "US History",   bg: "#DBEAFE", fg: "#1D4ED8" },
  algebra:  { label: "Algebra II",   bg: "#FEF3C7", fg: "#A16207" },
  english:  { label: "English 10",   bg: "#EEF2FF", fg: "#6366F1" },
  spanish:  { label: "Spanish II",   bg: "#F0FDF4", fg: "#16A34A" },
};

/* ── Sample data ── */
const PM_INIT_PROJECTS = [
  {
    id: "p1",
    title: "Biology Lab Report",
    description: "Write up the cell respiration lab from this week.",
    courseId: "biology",
    dueDate: "Fri, May 15",
    dueDateRaw: "2026-05-15",
    createdDate: "May 10, 2026",
    tasks: [
      { id: "t1", title: "Research cell respiration",   done: true,  dueDate: "" },
      { id: "t2", title: "Create hypothesis",            done: true,  dueDate: "" },
      { id: "t3", title: "Conduct experiments",          done: true,  dueDate: "" },
      { id: "t4", title: "Write results section",        done: false, dueDate: "May 15" },
      { id: "t5", title: "Submit on portal",             done: false, dueDate: "May 15" },
    ],
  },
  {
    id: "p2",
    title: "History Essay Outline",
    description: "",
    courseId: null,
    dueDate: "Wed, May 13",
    dueDateRaw: "2026-05-13",
    createdDate: "May 9, 2026",
    tasks: [
      { id: "t6", title: "Brainstorm main argument", done: false, dueDate: "" },
      { id: "t7", title: "Create outline",           done: false, dueDate: "" },
    ],
  },
  {
    id: "p3",
    title: "Math Problem Set",
    description: "Chapter 8 & 9 problem sets for Algebra II.",
    courseId: "algebra",
    dueDate: "Mon, May 18",
    dueDateRaw: "2026-05-18",
    createdDate: "May 8, 2026",
    tasks: [
      { id: "t8",  title: "Chapter 8 problems",   done: true, dueDate: "" },
      { id: "t9",  title: "Chapter 9 problems",   done: true, dueDate: "" },
      { id: "t10", title: "Review all answers",   done: true, dueDate: "" },
      { id: "t11", title: "Submit on portal",     done: true, dueDate: "" },
    ],
  },
];

const PM_TODAY = "2026-05-29";

/* ── Pure helpers ── */
function pmProgress(proj) {
  const total = proj.tasks.length;
  if (!total) return { done: 0, total: 0, pct: 0 };
  const done = proj.tasks.filter(t => t.done).length;
  return { done, total, pct: Math.round((done / total) * 100) };
}
function pmCompleted(proj) { return proj.tasks.length > 0 && proj.tasks.every(t => t.done); }
function pmOverdue(proj)   {
  if (!proj.dueDateRaw) return false;
  return !pmCompleted(proj) && proj.dueDateRaw < PM_TODAY;
}

/* ── Shared atoms ── */

function PM_CoursePill({ courseId }) {
  if (!courseId) return null;
  const c = PM_COURSES[courseId];
  if (!c) return null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "2px 8px", borderRadius: 999,
      background: c.bg, color: c.fg,
      fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: c.fg, display: "inline-block", flexShrink: 0 }}/>
      {c.label}
    </span>
  );
}

function PM_StatusBadge({ proj }) {
  if (pmOverdue(proj)) return (
    <span style={{ padding: "2px 8px", borderRadius: 999, background: "#FEE2E2", color: "#B91C1C", fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap" }}>
      ⚠ Overdue
    </span>
  );
  if (pmCompleted(proj)) return (
    <span style={{ padding: "2px 8px", borderRadius: 999, background: "#DCFCE7", color: "#15803D", fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap" }}>
      ✓ Completed
    </span>
  );
  return (
    <span style={{ padding: "2px 8px", borderRadius: 999, background: "#F5F3FF", color: "#5B21B6", fontSize: 10.5, fontWeight: 700, whiteSpace: "nowrap" }}>
      Active
    </span>
  );
}

function PM_ProgressBar({ pct, color }) {
  const barColor = color || "var(--student)";
  return (
    <div style={{ height: 5, background: "#E2E8F0", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ height: "100%", width: pct + "%", background: barColor, transition: "width 300ms ease", borderRadius: 3 }}/>
    </div>
  );
}

/* ── Tab strip shared between Schedule and Projects views ── */
function PM_SchTabStrip({ active }) {
  return (
    <div style={{ display: "flex", gap: 0, marginBottom: 20, borderBottom: "1px solid var(--mist)" }}>
      {[
        { label: "Schedule", href: "#/my-time/my-schedule" },
        { label: "Projects", href: "#/my-time/my-schedule/projects" },
      ].map(({ label, href }) => {
        const on = label === active;
        return (
          <a key={label} href={href} style={{
            padding: "10px 18px", textDecoration: "none",
            color: on ? "var(--ink)" : "var(--stone)",
            fontSize: 13, fontWeight: on ? 600 : 500,
            borderBottom: on ? "2px solid var(--student)" : "2px solid transparent",
            marginBottom: -1,
            transition: "color 120ms",
          }}>{label}</a>
        );
      })}
    </div>
  );
}

/* ── Skeleton loading card ── */
function PM_SkeletonCard() {
  const bar = (w, h = 12) => (
    <div style={{ height: h, width: w, background: "var(--bone)", borderRadius: 4, marginBottom: 10 }}/>
  );
  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 16, padding: "18px", boxShadow: "var(--shadow-card)",
    }}>
      {bar("65%", 16)}
      {bar("40%")}
      {bar("50%")}
      {bar("100%", 5)}
      {bar("35%")}
    </div>
  );
}

/* ── Toast notification ── */
function PM_Toast({ message, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [message]);
  return (
    <div style={{
      position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)",
      background: "#1E293B", color: "#fff",
      padding: "10px 18px", borderRadius: 10,
      fontSize: 13, fontWeight: 600,
      boxShadow: "0 4px 20px rgba(0,0,0,0.22)",
      zIndex: 1000, display: "flex", alignItems: "center", gap: 10,
      whiteSpace: "nowrap",
    }}>
      <I.CircleCheck size={14} color="#4ADE80"/>
      {message}
      <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer", padding: 0, display: "inline-flex", alignItems: "center" }}>
        <I.X size={12} color="#94A3B8"/>
      </button>
    </div>
  );
}

/* ── Project card (grid view) ── */
function PM_ProjectCard({ proj, onOpen, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { done, total, pct } = pmProgress(proj);
  const overdue = pmOverdue(proj);
  const completed = pmCompleted(proj);
  const barColor = completed ? "#22C55E" : overdue ? "#EF4444" : "var(--student)";

  return (
    <div
      onClick={() => onOpen(proj.id)}
      style={{
        background: "var(--paper)",
        border: `1px solid ${overdue ? "#FECACA" : "var(--mist)"}`,
        borderRadius: 16, padding: "18px 18px 14px",
        cursor: "pointer", boxShadow: "var(--shadow-card)",
        position: "relative", transition: "box-shadow 150ms",
      }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,23,42,0.1)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card)"}
    >
      {/* Three-dot overflow menu */}
      <div style={{ position: "absolute", top: 12, right: 12 }} onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); }}>
        <button style={{
          width: 28, height: 28, borderRadius: 7, border: "none",
          background: menuOpen ? "var(--bone)" : "transparent",
          cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }}
          onMouseLeave={(e) => { if (!menuOpen) e.currentTarget.style.background = "transparent"; }}
        >
          <span style={{ fontSize: 15, lineHeight: 1, color: "var(--stone)" }}>⋮</span>
        </button>
        {menuOpen && (
          <div style={{
            position: "absolute", top: 32, right: 0,
            background: "var(--paper)", border: "1px solid var(--mist)",
            borderRadius: 10, boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
            zIndex: 50, minWidth: 140, overflow: "hidden",
          }}>
            {[
              { icon: "Edit",     label: "Edit",      danger: false, action: () => { onEdit(proj.id); setMenuOpen(false); } },
              { icon: "Document", label: "Duplicate", danger: false, action: () => setMenuOpen(false) },
              { icon: "Trash",    label: "Delete",    danger: true,  action: () => { onDelete(proj.id); setMenuOpen(false); } },
            ].map((item) => {
              const Ico = I[item.icon] || I.MoreH;
              return (
                <button key={item.label}
                  onClick={(e) => { e.stopPropagation(); item.action(); }}
                  style={{
                    width: "100%", padding: "9px 14px",
                    display: "flex", alignItems: "center", gap: 10,
                    border: "none", background: "transparent",
                    fontSize: 13, fontWeight: 500, textAlign: "left",
                    color: item.danger ? "#EF4444" : "var(--ink)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <Ico size={13} color={item.danger ? "#EF4444" : "var(--stone)"}/>
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Card body */}
      <div style={{ paddingRight: 32, marginBottom: 8 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 7, lineHeight: 1.35 }}>{proj.title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
          <PM_CoursePill courseId={proj.courseId}/>
          <PM_StatusBadge proj={proj}/>
        </div>
      </div>

      {/* Due date */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: overdue ? "#B91C1C" : "var(--stone)", marginBottom: 14 }}>
        <I.Calendar size={11} color={overdue ? "#EF4444" : "var(--silver)"}/>
        {proj.dueDate || "No due date"}
      </div>

      {/* Progress */}
      <PM_ProgressBar pct={pct} color={barColor}/>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
        <span style={{ fontSize: 11, color: "var(--stone)" }}>{done} of {total} tasks done</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--stone)" }}>{pct}%</span>
      </div>
    </div>
  );
}

/* ── Task row (detail view) ── */
function PM_TaskRow({ task, onToggle, onRemove }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "7px 8px", borderRadius: 8,
        background: hovered ? "var(--bone)" : "transparent",
        transition: "background 100ms",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Drag handle — decorative */}
      <span style={{ fontSize: 11, color: "var(--silver)", userSelect: "none", flexShrink: 0, opacity: hovered ? 1 : 0, transition: "opacity 100ms" }}>⠿</span>
      {/* Checkbox */}
      <button
        onClick={onToggle}
        style={{
          width: 20, height: 20, borderRadius: 5, flexShrink: 0,
          border: task.done ? "none" : "1.5px solid var(--silver)",
          background: task.done ? "#22C55E" : "transparent",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 150ms",
        }}
      >
        {task.done && <I.Check size={11} color="#fff"/>}
      </button>
      {/* Title */}
      <span style={{
        flex: 1, fontSize: 13, color: task.done ? "var(--silver)" : "var(--ink)",
        textDecoration: task.done ? "line-through" : "none",
        transition: "color 150ms",
      }}>{task.title}</span>
      {/* Due date */}
      {task.dueDate && (
        <span style={{ fontSize: 11, color: "var(--silver)", display: "inline-flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
          <I.Calendar size={10} color="var(--silver)"/> {task.dueDate}
        </span>
      )}
      {/* Remove */}
      {hovered && (
        <button onClick={onRemove} style={{ background: "transparent", border: "none", cursor: "pointer", padding: 2, display: "inline-flex", flexShrink: 0 }}>
          <I.X size={11} color="var(--silver)"/>
        </button>
      )}
    </div>
  );
}

/* ── Project detail panel ── */
function PM_ProjectDetail({ proj, onToggleTask, onAddTask, onRemoveTask, onBack, onEdit, onDelete, onMarkComplete }) {
  const [newTask, setNewTask] = React.useState("");
  const [showDone, setShowDone] = React.useState(true);
  const { done, total, pct } = pmProgress(proj);
  const overdue = pmOverdue(proj);
  const completed = pmCompleted(proj);
  const barColor = completed ? "#22C55E" : overdue ? "#EF4444" : "var(--student)";
  const completedTasks = proj.tasks.filter(t => t.done);

  const handleAddTask = () => {
    const v = newTask.trim();
    if (!v) return;
    onAddTask(proj.id, v);
    setNewTask("");
  };

  const visibleTasks = showDone ? proj.tasks : proj.tasks.filter(t => !t.done);

  return (
    <div style={{
      background: "var(--paper)", border: "1px solid var(--mist)",
      borderRadius: 16, overflow: "hidden", boxShadow: "var(--shadow-card)",
    }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "flex-start", gap: 12 }}>
        <button onClick={onBack} style={{
          width: 30, height: 30, borderRadius: 8,
          border: "1px solid var(--mist)", background: "transparent",
          cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, marginTop: 2,
        }}>
          <I.ChevronLeft size={14} color="var(--stone)"/>
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: "var(--ink)", marginBottom: 5, lineHeight: 1.3 }}>{proj.title}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <PM_CoursePill courseId={proj.courseId}/>
            <PM_StatusBadge proj={proj}/>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          <button onClick={() => onEdit(proj.id)} style={{
            padding: "5px 12px", borderRadius: 8,
            border: "1px solid var(--mist)", background: "transparent",
            color: "var(--stone)", fontWeight: 600, fontSize: 12,
            cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5,
          }}>
            <I.Edit size={11} color="var(--stone)"/> Edit
          </button>
          <button onClick={() => onDelete(proj.id)} style={{
            width: 30, height: 30, borderRadius: 8,
            border: "1px solid var(--mist)", background: "transparent",
            cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.Trash size={13} color="#EF4444"/>
          </button>
        </div>
      </div>

      {/* Info row */}
      <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--mist)" }}>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 12 }}>
          {proj.dueDate && (
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: overdue ? "#B91C1C" : "var(--stone)" }}>
              <I.Calendar size={12} color={overdue ? "#EF4444" : "var(--silver)"}/>
              {proj.dueDate}
            </div>
          )}
          <div style={{ fontSize: 12, color: "var(--silver)" }}>Created {proj.createdDate}</div>
        </div>
        <PM_ProgressBar pct={pct} color={barColor}/>
        <div style={{ fontSize: 11.5, color: "var(--stone)", marginTop: 5, fontWeight: 500 }}>
          {done} of {total} tasks complete · {pct}%
        </div>
      </div>

      {/* Tasks */}
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>
            Tasks <span style={{ color: "var(--stone)", fontWeight: 400 }}>({done} of {total} complete)</span>
          </span>
          {completedTasks.length > 0 && (
            <button onClick={() => setShowDone(v => !v)} style={{
              fontSize: 11.5, color: "var(--student-deep)", fontWeight: 600,
              background: "transparent", border: "none", cursor: "pointer", padding: 0,
            }}>
              {showDone ? "Hide completed" : `Show completed (${completedTasks.length})`}
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 12 }}>
          {visibleTasks.map((task) => (
            <PM_TaskRow
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(proj.id, task.id)}
              onRemove={() => onRemoveTask(proj.id, task.id)}
            />
          ))}
          {visibleTasks.length === 0 && (
            <div style={{ fontSize: 12.5, color: "var(--silver)", padding: "12px 0", textAlign: "center" }}>All tasks complete!</div>
          )}
        </div>

        {/* Add task */}
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Add a task…"
            style={{
              flex: 1, padding: "8px 12px",
              border: "1.5px solid var(--mist)", borderRadius: 9,
              fontSize: 13, color: "var(--ink)", background: "var(--bone)",
              outline: "none", fontFamily: "inherit",
            }}
          />
          <button onClick={handleAddTask} style={{
            padding: "8px 14px", borderRadius: 9,
            border: "none", background: "var(--student)", color: "#fff",
            fontWeight: 600, fontSize: 13, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 5,
          }}>
            <I.Plus size={12} color="#fff"/> Add
          </button>
        </div>

        {/* Footer actions */}
        {!completed && total > 0 && (
          <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid var(--mist)" }}>
            <button onClick={() => onMarkComplete(proj.id)} style={{
              padding: "8px 16px", borderRadius: 9,
              border: "none", background: "#DCFCE7", color: "#15803D",
              fontWeight: 600, fontSize: 12.5, cursor: "pointer",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              <I.CircleCheck size={13} color="#15803D"/> Mark All Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Create / Edit modal ── */
function PM_ProjectModal({ project, onSave, onClose }) {
  const isEdit = !!project;
  const [title, setTitle]       = React.useState(project?.title       || "");
  const [desc,  setDesc]        = React.useState(project?.description || "");
  const [courseId, setCourseId] = React.useState(project?.courseId    || "");
  const [dueDate,  setDueDate]  = React.useState(project?.dueDate     || "");
  const [tasks, setTasks]       = React.useState(project?.tasks ? project.tasks.map(t => ({ ...t })) : []);
  const [newTask, setNewTask]   = React.useState("");
  const [titleErr, setTitleErr] = React.useState("");

  const addTask = () => {
    const v = newTask.trim();
    if (!v) return;
    setTasks(prev => [...prev, { id: "t" + Date.now(), title: v, done: false, dueDate: "" }]);
    setNewTask("");
  };

  const handleSave = () => {
    if (!title.trim()) { setTitleErr("Project title is required."); return; }
    onSave({ title: title.trim(), description: desc, courseId: courseId || null, dueDate, tasks });
  };

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 24,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 520,
        background: "var(--paper)", borderRadius: 20,
        boxShadow: "0 20px 60px rgba(15,23,42,0.22)",
        display: "flex", flexDirection: "column", maxHeight: "90vh",
      }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px 16px", borderBottom: "1px solid var(--mist)", flexShrink: 0 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>
            {isEdit ? "Edit Project" : "Create Project"}
          </h3>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 7, border: "1px solid var(--mist)", background: "transparent", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <I.X size={14} color="var(--stone)"/>
          </button>
        </div>

        {/* Scrollable form */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>

          {/* Title */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--stone)", marginBottom: 6 }}>
              Project Title <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                value={title}
                onChange={(e) => { setTitle(e.target.value.slice(0, 200)); setTitleErr(""); }}
                placeholder="e.g. Biology Lab Report"
                style={{
                  width: "100%", padding: "9px 52px 9px 12px", boxSizing: "border-box",
                  border: `1.5px solid ${titleErr ? "#EF4444" : "var(--mist)"}`,
                  borderRadius: 9, fontSize: 13.5, color: "var(--ink)",
                  background: "var(--paper)", outline: "none", fontFamily: "inherit",
                }}
              />
              <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", fontSize: 10, color: "var(--silver)" }}>
                {title.length}/200
              </span>
            </div>
            {titleErr && <div style={{ fontSize: 11.5, color: "#EF4444", marginTop: 4 }}>{titleErr}</div>}
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--stone)", marginBottom: 6 }}>
              Description <span style={{ color: "var(--silver)", fontWeight: 400 }}>(optional)</span>
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={2}
              placeholder="Add notes about this project…"
              style={{
                width: "100%", padding: "9px 12px", boxSizing: "border-box",
                border: "1.5px solid var(--mist)", borderRadius: 9,
                fontSize: 13, color: "var(--ink)", background: "var(--paper)",
                outline: "none", resize: "none", fontFamily: "inherit",
              }}
            />
          </div>

          {/* Course + Due Date */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--stone)", marginBottom: 6 }}>Course</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                style={{
                  width: "100%", padding: "9px 12px",
                  border: "1.5px solid var(--mist)", borderRadius: 9,
                  fontSize: 13, color: "var(--ink)", background: "var(--paper)",
                  outline: "none", cursor: "pointer", fontFamily: "inherit",
                }}
              >
                <option value="">No course</option>
                {Object.entries(PM_COURSES).map(([id, c]) => (
                  <option key={id} value={id}>{c.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--stone)", marginBottom: 6 }}>Due Date</label>
              <input
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="e.g. May 20"
                style={{
                  width: "100%", padding: "9px 12px", boxSizing: "border-box",
                  border: "1.5px solid var(--mist)", borderRadius: 9,
                  fontSize: 13, color: "var(--ink)", background: "var(--paper)",
                  outline: "none", fontFamily: "inherit",
                }}
              />
            </div>
          </div>

          {/* Tasks */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--stone)", marginBottom: 8 }}>
              Tasks {tasks.length > 0 && <span style={{ color: "var(--silver)", fontWeight: 400 }}>({tasks.length})</span>}
            </label>
            {tasks.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 8 }}>
                {tasks.map((task) => (
                  <div key={task.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "var(--bone)", borderRadius: 8 }}>
                    <span style={{ color: "var(--silver)", fontSize: 11, userSelect: "none" }}>⠿</span>
                    <span style={{ flex: 1, fontSize: 13, color: "var(--ink)" }}>{task.title}</span>
                    <button onClick={() => setTasks(prev => prev.filter(t => t.id !== task.id))}
                      style={{ background: "transparent", border: "none", cursor: "pointer", display: "inline-flex", padding: 2 }}>
                      <I.X size={12} color="var(--silver)"/>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Task title"
                style={{
                  flex: 1, padding: "8px 12px",
                  border: "1.5px solid var(--mist)", borderRadius: 9,
                  fontSize: 13, color: "var(--ink)", background: "var(--paper)",
                  outline: "none", fontFamily: "inherit",
                }}
              />
              <button onClick={addTask} style={{
                padding: "8px 14px", borderRadius: 9,
                border: "none", background: "var(--bone)",
                color: "var(--ink)", fontWeight: 600, fontSize: 13, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 5,
              }}>
                <I.Plus size={13} color="var(--student)"/> Add
              </button>
            </div>
            {!tasks.length && <div style={{ fontSize: 11.5, color: "var(--silver)", marginTop: 6 }}>No tasks yet — add them here or after saving.</div>}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, padding: "16px 24px", borderTop: "1px solid var(--mist)", flexShrink: 0 }}>
          <button onClick={onClose} style={{
            padding: "8px 18px", borderRadius: 9,
            border: "1.5px solid var(--mist)", background: "transparent",
            color: "var(--stone)", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            padding: "8px 22px", borderRadius: 9,
            border: "none", background: "var(--student)", color: "#fff",
            fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>{isEdit ? "Save Changes" : "Create Project"}</button>
        </div>
      </div>
    </div>
  );
}

/* ── Delete confirmation modal ── */
function PM_DeleteModal({ projTitle, onConfirm, onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 100, padding: 24,
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 400,
        background: "var(--paper)", borderRadius: 18, padding: 28,
        boxShadow: "0 20px 60px rgba(15,23,42,0.22)",
      }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "#FEE2E2", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
          <I.Trash size={20} color="#EF4444"/>
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: 17, fontWeight: 700, color: "var(--ink)" }}>Delete project?</h3>
        <p style={{ margin: "0 0 22px", fontSize: 13.5, color: "var(--stone)", lineHeight: 1.55 }}>
          <b>"{projTitle}"</b> and all its tasks will be permanently deleted. This action cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "8px 18px", borderRadius: 9,
            border: "1.5px solid var(--mist)", background: "transparent",
            color: "var(--stone)", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "8px 22px", borderRadius: 9,
            border: "none", background: "#EF4444", color: "#fff",
            fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function PM_EmptyState({ onNew }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "72px 0", textAlign: "center" }}>
      <div style={{ fontSize: 52, marginBottom: 16, lineHeight: 1 }}>📋</div>
      <div style={{ fontSize: 19, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>No projects yet.</div>
      <div style={{ fontSize: 14, color: "var(--stone)", maxWidth: 360, lineHeight: 1.65, marginBottom: 28 }}>
        Create your first project to break down complex assignments and track your progress.
      </div>
      <button onClick={onNew} style={{
        padding: "10px 24px", borderRadius: 10,
        border: "none", background: "var(--student)", color: "#fff",
        fontSize: 14, fontWeight: 600, cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 7,
        boxShadow: "0 2px 8px rgba(124,58,237,0.28)",
      }}>
        <I.Plus size={14} color="#fff"/> New Project
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ════════════════════════════════════════════════════════════ */
function ProjectManagerPage({ segments, navigate }) {
  const [projects,     setProjects]     = React.useState(PM_INIT_PROJECTS);
  const [activeId,     setActiveId]     = React.useState(null);
  const [filter,       setFilter]       = React.useState("All");
  const [sort,         setSort]         = React.useState("due-asc");
  const [modalState,   setModalState]   = React.useState(null); // null | {mode:"create"|"edit", id?}
  const [deleteTarget, setDeleteTarget] = React.useState(null);
  const [toast,        setToast]        = React.useState(null);
  const [loading,      setLoading]      = React.useState(true);

  /* Simulate async load */
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  /* Filtered + sorted project list */
  const filtered = React.useMemo(() => {
    let list = projects;
    if (filter === "Active")    list = list.filter(p => !pmCompleted(p));
    if (filter === "Completed") list = list.filter(p => pmCompleted(p));
    return [...list].sort((a, b) => {
      // Overdue always floats to top
      const ao = pmOverdue(a), bo = pmOverdue(b);
      if (ao && !bo) return -1;
      if (!ao && bo) return 1;
      if (a.dueDateRaw && b.dueDateRaw) {
        const cmp = a.dueDateRaw.localeCompare(b.dueDateRaw);
        return sort === "due-asc" ? cmp : -cmp;
      }
      return 0;
    });
  }, [projects, filter, sort]);

  const activeProject = activeId ? projects.find(p => p.id === activeId) || null : null;
  const editingProject = modalState?.mode === "edit" ? projects.find(p => p.id === modalState.id) || null : null;

  /* Mutation helpers */
  const showToast = (msg) => setToast(msg);

  const handleToggleTask = (projId, taskId) => {
    setProjects(prev => prev.map(p =>
      p.id !== projId ? p : { ...p, tasks: p.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) }
    ));
  };

  const handleAddTask = (projId, title) => {
    setProjects(prev => prev.map(p =>
      p.id !== projId ? p : { ...p, tasks: [...p.tasks, { id: "t" + Date.now(), title, done: false, dueDate: "" }] }
    ));
  };

  const handleRemoveTask = (projId, taskId) => {
    setProjects(prev => prev.map(p =>
      p.id !== projId ? p : { ...p, tasks: p.tasks.filter(t => t.id !== taskId) }
    ));
  };

  const handleMarkComplete = (projId) => {
    setProjects(prev => prev.map(p =>
      p.id !== projId ? p : { ...p, tasks: p.tasks.map(t => ({ ...t, done: true })) }
    ));
    showToast("All tasks marked complete!");
  };

  const handleSaveProject = (data) => {
    if (modalState?.mode === "edit" && modalState.id) {
      setProjects(prev => prev.map(p => p.id === modalState.id ? { ...p, ...data } : p));
      showToast("Project updated!");
    } else {
      setProjects(prev => [{
        id: "p" + Date.now(),
        createdDate: "May 29, 2026",
        dueDateRaw: "",
        ...data,
      }, ...prev]);
      showToast("Project created!");
    }
    setModalState(null);
  };

  const handleDeleteConfirm = () => {
    setProjects(prev => prev.filter(p => p.id !== deleteTarget));
    if (activeId === deleteTarget) setActiveId(null);
    setDeleteTarget(null);
    showToast("Project deleted.");
  };

  return (
    <Page
      segments={segments}
      title="My Projects"
      lede="Break down assignments into tasks and track your progress."
      actions={
        <button
          onClick={() => setModalState({ mode: "create" })}
          style={{
            padding: "8px 16px", borderRadius: 9,
            border: "none", background: "var(--student)", color: "#fff",
            fontSize: 13, fontWeight: 600, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 7,
            boxShadow: "0 2px 8px rgba(124,58,237,0.28)",
          }}
        >
          <I.Plus size={13} color="#fff"/> New Project
        </button>
      }
    >
      {/* Tab strip */}
      <PM_SchTabStrip active="Projects"/>

      {/* Filter + sort bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["All", "Active", "Completed"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: "5px 14px", borderRadius: 999,
              border: filter === f ? "1.5px solid var(--student)" : "1.5px solid var(--mist)",
              background: filter === f ? "var(--student-soft)" : "var(--paper)",
              color: filter === f ? "var(--student-deep)" : "var(--stone)",
              fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            }}>{f}</button>
          ))}
        </div>
        <div style={{ flex: 1 }}/>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{
            padding: "6px 10px", borderRadius: 8,
            border: "1px solid var(--mist)", background: "var(--paper)",
            fontSize: 12, color: "var(--stone)", cursor: "pointer",
            outline: "none", fontFamily: "inherit",
          }}
        >
          <option value="due-asc">Due Date (Soonest)</option>
          <option value="due-desc">Due Date (Latest)</option>
          <option value="recent">Recently Created</option>
        </select>
      </div>

      {/* ── Content area ── */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <PM_SkeletonCard/><PM_SkeletonCard/><PM_SkeletonCard/>
        </div>
      ) : projects.length === 0 ? (
        <PM_EmptyState onNew={() => setModalState({ mode: "create" })}/>
      ) : activeProject ? (
        /* ── Two-pane detail view ── */
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16, alignItems: "flex-start" }}>
          {/* Mini list (left) */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {filtered.map(p => {
              const { done: pd, total: pt, pct: pp } = pmProgress(p);
              const pActive = p.id === activeId;
              return (
                <div key={p.id} onClick={() => setActiveId(p.id)} style={{
                  padding: "12px 14px", borderRadius: 12, cursor: "pointer",
                  border: `1.5px solid ${pActive ? "var(--student)" : "var(--mist)"}`,
                  background: pActive ? "var(--student-soft)" : "var(--paper)",
                  transition: "all 100ms",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: pActive ? "var(--student-deep)" : "var(--ink)", marginBottom: 6, lineHeight: 1.3 }}>{p.title}</div>
                  <PM_ProgressBar pct={pp} color={pmCompleted(p) ? "#22C55E" : pmOverdue(p) ? "#EF4444" : "var(--student)"}/>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 10.5, color: "var(--silver)" }}>{pd}/{pt} tasks</span>
                    <PM_StatusBadge proj={p}/>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Detail (right) */}
          <PM_ProjectDetail
            proj={activeProject}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onRemoveTask={handleRemoveTask}
            onBack={() => setActiveId(null)}
            onEdit={(id) => setModalState({ mode: "edit", id })}
            onDelete={setDeleteTarget}
            onMarkComplete={handleMarkComplete}
          />
        </div>
      ) : filtered.length === 0 ? (
        /* Filter produced no results */
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--stone)", fontSize: 14 }}>
          No {filter.toLowerCase()} projects. <button onClick={() => setFilter("All")} style={{ color: "var(--student-deep)", background: "none", border: "none", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>Show all</button>
        </div>
      ) : (
        /* ── Card grid ── */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {filtered.map(p => (
            <PM_ProjectCard
              key={p.id}
              proj={p}
              onOpen={setActiveId}
              onEdit={(id) => setModalState({ mode: "edit", id })}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      )}

      {/* ── Modals & toasts ── */}
      {modalState && (
        <PM_ProjectModal
          project={editingProject}
          onSave={handleSaveProject}
          onClose={() => setModalState(null)}
        />
      )}
      {deleteTarget && (
        <PM_DeleteModal
          projTitle={projects.find(p => p.id === deleteTarget)?.title || ""}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTarget(null)}
        />
      )}
      {toast && <PM_Toast message={toast} onClose={() => setToast(null)}/>}
    </Page>
  );
}

window.ProjectManagerPage = ProjectManagerPage;
window.PM_SchTabStrip = PM_SchTabStrip;

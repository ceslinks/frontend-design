// LINKS Curriculum Builder — shell (sidebar + topbar)

function CBShell({ canvas, onCanvasChange, course, children, theme, onOpenAi }) {
  const isAdmin = theme === "admin";
  return (
    <div className={"cb-shell " + (isAdmin ? "is-admin" : "is-instructor")}>
      <aside className="cb-sidebar">
        <div className="cb-sidebar-brand">
          <div className="cb-brand-mark">L</div>
          <div className="cb-brand-meta">
            <div className="cb-brand-name">LINKS</div>
            <div className="cb-brand-portal">{isAdmin ? "Admin · Curriculum" : "Instructor · Curriculum"}</div>
          </div>
        </div>

        <div className="cb-sidebar-section">
          <div className="cb-sidebar-eyebrow">Workspace</div>
          <button className="cb-side-item active">
            <I.BookOpen size={14}/>
            <span>Curriculum builder</span>
          </button>
          <button className="cb-side-item">
            <I.LibraryBig size={14}/>
            <span>Resource library</span>
          </button>
          <button className="cb-side-item">
            <I.Award size={14}/>
            <span>Standards map</span>
          </button>
          <button className="cb-side-item">
            <I.Archive size={14}/>
            <span>Templates</span>
            <span className="cb-side-tag">12</span>
          </button>
          {isAdmin && (
            <button className="cb-side-item">
              <I.ShieldCheck size={14}/>
              <span>District review</span>
              <span className="cb-side-tag warn">3</span>
            </button>
          )}
        </div>

        <div className="cb-sidebar-section">
          <div className="cb-sidebar-eyebrow">Courses</div>
          <button className="cb-side-course active">
            <span className="dot" style={{ background: "#2E9B62" }}/>
            <span className="t">Biology 10 · Honors</span>
            <span className="s">3 sec</span>
          </button>
          <button className="cb-side-course">
            <span className="dot" style={{ background: "#1E3A5F" }}/>
            <span className="t">AP Environmental</span>
            <span className="s">2 sec</span>
          </button>
          <button className="cb-side-course">
            <span className="dot" style={{ background: "#E07A2D" }}/>
            <span className="t">Earth Systems 9</span>
            <span className="s">1 sec</span>
          </button>
          <button className="cb-side-course-add">
            <I.Plus size={11}/>
            <span>New course</span>
          </button>
        </div>

        <div className="cb-sidebar-foot">
          <div className="cb-sidebar-eyebrow">Pinned</div>
          <button className="cb-side-pin"><I.FileText size={12}/><span>NGSS HS-LS reference</span></button>
          <button className="cb-side-pin"><I.FileText size={12}/><span>Lab safety contracts</span></button>
          <button className="cb-side-pin"><I.Sparkles size={12}/><span>AI · my prompts</span></button>
        </div>
      </aside>

      <main className="cb-main">
        <header className="cb-topbar">
          <div className="cb-breadcrumb">
            <span className="b-crumb">Spring '26</span>
            <I.ChevronRight size={11} color="var(--silver)"/>
            <span className="b-crumb">Biology 10</span>
            <I.ChevronRight size={11} color="var(--silver)"/>
            <span className="b-crumb active">Curriculum</span>
          </div>

          <div className="cb-canvas-switcher">
            <button className={"cs " + (canvas === "outline" ? "active" : "")} onClick={() => onCanvasChange("outline")}>
              <I.List size={12}/>
              <span>Outline</span>
            </button>
            <button className={"cs " + (canvas === "calendar" ? "active" : "")} onClick={() => onCanvasChange("calendar")}>
              <I.Calendar size={12}/>
              <span>Calendar</span>
            </button>
            <button className="cs" disabled>
              <I.Columns size={12}/>
              <span>Board</span>
            </button>
          </div>

          <div className="spacer"/>

          <div className="cb-saved">
            <span className="cb-saved-dot"/>
            <span>Auto-saved · 2 min ago</span>
          </div>
          <button className="btn btn-sm">
            <I.History size={13} color="var(--stone)"/>
            History
          </button>
          <button className="btn btn-sm" onClick={onOpenAi}>
            <I.Sparkles size={13} color="var(--instructor)"/>
            AI Coach
          </button>
          <button className="btn btn-sm">
            <I.Share2 size={13} color="var(--stone)"/>
            Share
          </button>
          <button className="btn btn-sm btn-primary">
            <I.Send size={13} color="#fff"/>
            Publish
          </button>
          <div className="cb-avatar">RO</div>
        </header>

        <div className="cb-canvas">{children}</div>
      </main>
    </div>
  );
}

window.CBShell = CBShell;

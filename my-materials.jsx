// LINKS — My Materials Page (class → unit grouped list)

const MaterialsData = [
  { id: 1,  name: "Linear Functions Quiz Review.pdf",   kind: "pdf",   source: "class", className: "Algebra II",  classColor: "#8B5CF6", unit: "Unit 3 · Quadratic Functions",    size: "2.4 MB", modified: "Today, 9:14 AM",      from: "Mr. Wilson",    starred: true  },
  { id: 2,  name: "Quadratic Formula Notes.pdf",         kind: "pdf",   source: "class", className: "Algebra II",  classColor: "#8B5CF6", unit: "Unit 3 · Quadratic Functions",    size: "1.8 MB", modified: "Today, 8:02 AM",      from: "Mr. Wilson",    starred: false },
  { id: 3,  name: "My Algebra II Notebook.notes",        kind: "notes", source: "you",   className: "Algebra II",  classColor: "#8B5CF6", unit: "Unit 3 · Quadratic Functions",    size: "856 KB", modified: "Today, 7:30 AM",      from: "You",           starred: true  },
  { id: 4,  name: "Slope Practice — AI generated.pdf",   kind: "pdf",   source: "ai",    className: "Algebra II",  classColor: "#8B5CF6", unit: "Unit 3 · Quadratic Functions",    size: "1.2 MB", modified: "Yesterday, 6:48 PM",  from: "AI Tutor",      starred: false },
  { id: 5,  name: "Cell Structure Lab Report.docx",      kind: "doc",   source: "you",   className: "Biology",     classColor: "#10B981", unit: "Unit 4 · Cells & Energy",         size: "1.1 MB", modified: "Yesterday, 3:20 PM",  from: "You",           starred: false },
  { id: 6,  name: "Mitochondria Diagram.png",            kind: "image", source: "class", className: "Biology",     classColor: "#10B981", unit: "Unit 4 · Cells & Energy",         size: "640 KB", modified: "Yesterday, 11:05 AM", from: "Mr. Evans",     starred: true  },
  { id: 7,  name: "Cell Cycle Lecture.mp4",              kind: "video", source: "class", className: "Biology",     classColor: "#10B981", unit: "Unit 4 · Cells & Energy",         size: "84 MB",  modified: "2 days ago",          from: "Mr. Evans",     starred: false },
  { id: 8,  name: "Argument Essay — Draft 2.docx",       kind: "doc",   source: "you",   className: "English 10",  classColor: "#0EA5E9", unit: "Unit 2 · Argument & Persuasion",  size: "92 KB",  modified: "2 days ago",          from: "You",           starred: true  },
  { id: 9,  name: "Argument Essay Rubric.pdf",           kind: "pdf",   source: "class", className: "English 10",  classColor: "#0EA5E9", unit: "Unit 2 · Argument & Persuasion",  size: "320 KB", modified: "Oct 18",              from: "Mrs. Lee",      starred: false },
  { id: 10, name: "Industrial Revolution DBQ.pdf",       kind: "pdf",   source: "class", className: "US History",  classColor: "#F59E0B", unit: "Unit 3 · Industrial Revolution",  size: "3.6 MB", modified: "Oct 18",              from: "Mr. Rodriguez", starred: false },
  { id: 11, name: "Spanish Vocab Flashcards.csv",        kind: "csv",   source: "you",   className: "Spanish II",  classColor: "#EF4444", unit: "Unit 3 · La Vida Cotidiana",      size: "18 KB",  modified: "Oct 17",              from: "You",           starred: true  },
  { id: 12, name: "Spanish Speaking Activity.mp3",       kind: "audio", source: "class", className: "Spanish II",  classColor: "#EF4444", unit: "Unit 3 · La Vida Cotidiana",      size: "5.2 MB", modified: "Oct 16",              from: "Sra. Martinez", starred: false },
  { id: 13, name: "Module 3 Test Study Guide — AI.pdf",  kind: "pdf",   source: "ai",    className: "Algebra II",  classColor: "#8B5CF6", unit: "Unit 3 · Quadratic Functions",    size: "1.6 MB", modified: "Oct 15",              from: "AI Tutor",      starred: false },
  { id: 14, name: "Photosynthesis Concept Map.png",      kind: "image", source: "you",   className: "Biology",     classColor: "#10B981", unit: "Unit 4 · Cells & Energy",         size: "1.4 MB", modified: "Oct 14",              from: "You",           starred: false },
  { id: 15, name: "Hamlet Soliloquy Annotations.pdf",    kind: "pdf",   source: "you",   className: "English 10",  classColor: "#0EA5E9", unit: "Unit 2 · Argument & Persuasion",  size: "780 KB", modified: "Oct 12",              from: "You",           starred: false },
];

const GROUPS = [
  { className: "Biology",    classColor: "#10B981", units: ["Unit 4 · Cells & Energy"] },
  { className: "Algebra II", classColor: "#8B5CF6", units: ["Unit 3 · Quadratic Functions"] },
  { className: "English 10", classColor: "#0EA5E9", units: ["Unit 2 · Argument & Persuasion"] },
  { className: "US History", classColor: "#F59E0B", units: ["Unit 3 · Industrial Revolution"] },
  { className: "Spanish II", classColor: "#EF4444", units: ["Unit 3 · La Vida Cotidiana"] },
];

const PORTFOLIO_SECTIONS = [
  { id: "my-work",      icon: "Document",   label: "My Work",         desc: "Assignments, projects & class output" },
  { id: "skills",       icon: "ChartBar",   label: "Skills & Growth", desc: "Evidence of learning and improvement" },
  { id: "reflections",  icon: "Scratchpad", label: "Reflections",     desc: "Your thoughts and self-assessments" },
  { id: "achievements", icon: "Trophy",     label: "Achievements",    desc: "Awards, recognition & milestones" },
];

const KindMeta = {
  pdf:   { icon: "Document",   color: "#EF4444", label: "PDF" },
  doc:   { icon: "Document",   color: "#0EA5E9", label: "DOC" },
  notes: { icon: "Scratchpad", color: "#8B5CF6", label: "Notes" },
  image: { icon: "Camera",     color: "#F59E0B", label: "Image" },
  video: { icon: "Camera",     color: "#10B981", label: "Video" },
  audio: { icon: "Speaker",    color: "#A855F7", label: "Audio" },
  csv:   { icon: "PieChart",   color: "#22C55E", label: "Data" },
};

const UNCATEGORIZED_FILES = [
  { id: 101, name: "Personal Statement — Draft 1.docx", kind: "doc",   source: "you", size: "44 KB",  modified: "Oct 14", from: "You", starred: false },
  { id: 102, name: "Screenshot 2024-10-10.png",          kind: "image", source: "you", size: "2.1 MB", modified: "Oct 10", from: "You", starred: false },
  { id: 103, name: "practice_problems.pdf",              kind: "pdf",   source: "you", size: "890 KB", modified: "Oct 8",  from: "You", starred: false },
];

const initClassExp = () => Object.fromEntries(GROUPS.map(g => [g.className, true]));
const initUnitExp  = () => Object.fromEntries(
  GROUPS.flatMap(g => g.units.map(u => [`${g.className}|${u}`, true]))
);

/* ─── Create Document modal ─── */

function CreateDocumentModal({ onClose }) {
  const [docName,  setDocName]  = React.useState("");
  const [docClass, setDocClass] = React.useState("");
  const [docType,  setDocType]  = React.useState("");
  const canCreate = docName.trim().length > 0;

  const inputStyle = {
    width: "100%", padding: "9px 12px",
    border: "1px solid var(--mist)", borderRadius: 8,
    fontSize: 13, color: "var(--ink)", outline: "none",
    background: "var(--paper)", boxSizing: "border-box",
  };
  const labelStyle = { fontSize: 12, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 };

  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.38)", zIndex: 300 }} onClick={onClose}/>
      <div
        style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 460, background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", zIndex: 301 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--mist)", position: "relative" }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>Create a new document</div>
          <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", borderRadius: 6 }}>
            <I.X size={16} color="var(--stone)"/>
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelStyle}>Document name</label>
            <input
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="Untitled document"
              style={inputStyle}
              autoFocus
            />
          </div>
          <div>
            <label style={labelStyle}>Class</label>
            <select value={docClass} onChange={(e) => setDocClass(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">No class</option>
              <option value="Biology">Biology</option>
              <option value="Algebra II">Algebra II</option>
              <option value="English 10">English 10</option>
              <option value="US History">US History</option>
              <option value="Spanish II">Spanish II</option>
            </select>
          </div>
          <div>
            <label style={labelStyle}>Document type</label>
            <select value={docType} onChange={(e) => setDocType(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="">Select type</option>
              <option value="Essay">Essay</option>
              <option value="Notes">Notes</option>
              <option value="Lab Report">Lab Report</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        {/* Footer */}
        <div style={{ padding: "4px 24px 22px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} className="btn btn-secondary btn-md">Cancel</button>
          <button
            disabled={!canCreate}
            onClick={onClose}
            className="btn btn-primary btn-md"
            style={{ opacity: canCreate ? 1 : 0.5, cursor: canCreate ? "pointer" : "not-allowed", display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <I.Document size={13} color="#fff"/>
            Create
          </button>
        </div>
      </div>
    </>
  );
}

function MyMaterialsPage() {
  const [filter,       setFilter]       = React.useState("all");
  const [classFilter,  setClassFilter]  = React.useState("all");
  const [view,         setView]         = React.useState("list");
  const [search,       setSearch]       = React.useState("");
  const [classExpanded, setClassExpanded] = React.useState(initClassExp);
  const [unitExpanded,  setUnitExpanded]  = React.useState(initUnitExp);
  const [createDocOpen, setCreateDocOpen] = React.useState(false);

  // Read URL params on mount
  React.useEffect(() => {
    const qIdx = window.location.hash.indexOf("?");
    if (qIdx === -1) return;
    const params = new URLSearchParams(window.location.hash.slice(qIdx + 1));
    const classParam = params.get("class");
    const unitParam  = params.get("unit");
    if (!classParam) return;
    const matched = GROUPS.find(g => g.className.toLowerCase() === classParam.toLowerCase());
    if (!matched) return;
    setClassFilter(matched.className);
    if (unitParam) {
      setUnitExpanded(Object.fromEntries(
        GROUPS.flatMap(g => g.units.map(u => [
          `${g.className}|${u}`,
          g.className === matched.className && u.toLowerCase().includes("unit " + unitParam.toLowerCase()),
        ]))
      ));
    }
  }, []);

  // Class filter collapses other groups
  React.useEffect(() => {
    setClassExpanded(
      classFilter === "all"
        ? initClassExp()
        : Object.fromEntries(GROUPS.map(g => [g.className, g.className === classFilter]))
    );
  }, [classFilter]);

  const toggleClass = (name) =>
    setClassExpanded(prev => ({ ...prev, [name]: !prev[name] }));
  const toggleUnit = (key) =>
    setUnitExpanded(prev => ({ ...prev, [key]: !prev[key] }));

  const applyFilters = (files) => files.filter(m => {
    if (filter === "you"     && m.source !== "you")   return false;
    if (filter === "class"   && m.source !== "class") return false;
    if (filter === "ai"      && m.source !== "ai")    return false;
    if (filter === "starred" && !m.starred)            return false;
    if (search && !m.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totalSize = "247 MB";
  const cap = "5 GB";

  return (
    <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h1 className="t-h1" style={{ fontSize: 26, margin: "0 0 4px" }}>My Materials</h1>
          <div className="t-body" style={{ color: "var(--stone)" }}>All your files in one place — class resources, your work, and AI-generated study aids.</div>
        </div>
        <button className="btn btn-secondary btn-md"><I.Wand size={13} color="var(--student)"/> Generate with AI</button>
        <button onClick={() => setCreateDocOpen(true)} className="btn btn-secondary btn-md" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I.Document size={13} color="var(--ink)"/> Create document</button>
        <button className="btn btn-primary btn-md"><I.Upload size={13} color="#fff"/> Upload</button>
      </div>
      {createDocOpen && <CreateDocumentModal onClose={() => setCreateDocOpen(false)}/>}

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <Stat3 icon="Folder"    color="#8B5CF6" value={MaterialsData.length}                              label="Total files"    sub="Across all classes"/>
        <Stat3 icon="Sparkle"   color="#F59E0B" value={MaterialsData.filter(m => m.starred).length}       label="Starred"        sub="Quick access"/>
        <Stat3 icon="Wand"      color="#10B981" value={MaterialsData.filter(m => m.source === "ai").length} label="AI-generated" sub="Study aids & summaries"/>
        <Stat3 icon="HardDrive" color="#0EA5E9" value={totalSize}                                         label="Storage used"   sub={`of ${cap}`} bar="4.9"/>
      </div>

      {/* Filter / search bar */}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ display: "flex", gap: 4, padding: 4, background: "var(--bone)", borderRadius: 10 }}>
          {[
            { id: "all",     label: "All",          count: MaterialsData.length },
            { id: "you",     label: "Your work",    count: MaterialsData.filter(m => m.source === "you").length },
            { id: "class",   label: "From class",   count: MaterialsData.filter(m => m.source === "class").length },
            { id: "ai",      label: "AI-generated", count: MaterialsData.filter(m => m.source === "ai").length },
            { id: "starred", label: "Starred",      count: MaterialsData.filter(m => m.starred).length },
          ].map((f) => (
            <button key={f.id} onClick={() => setFilter(f.id)} style={{
              padding: "6px 12px",
              background: filter === f.id ? "var(--paper)" : "transparent",
              color: filter === f.id ? "var(--student)" : "var(--stone)",
              border: "none", borderRadius: 7,
              fontSize: 12, fontWeight: filter === f.id ? 600 : 500,
              cursor: "pointer", boxShadow: filter === f.id ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              display: "inline-flex", alignItems: "center", gap: 6,
            }}>
              {f.label}
              <span style={{ fontSize: 10.5, padding: "1px 6px", background: filter === f.id ? "rgba(139,92,246,0.12)" : "var(--mist)", color: filter === f.id ? "var(--student)" : "var(--stone)", borderRadius: 8, fontWeight: 600 }}>{f.count}</span>
            </button>
          ))}
        </div>

        <select value={classFilter} onChange={(e) => setClassFilter(e.target.value)} style={{
          padding: "8px 12px", border: "1px solid var(--mist)",
          borderRadius: 8, background: "var(--paper)",
          fontSize: 12, color: "var(--ink)", cursor: "pointer",
        }}>
          <option value="all">All classes</option>
          <option value="Biology">Biology</option>
          <option value="Algebra II">Algebra II</option>
          <option value="English 10">English 10</option>
          <option value="US History">US History</option>
          <option value="Spanish II">Spanish II</option>
        </select>

        <div style={{ flex: 1 }}/>

        <div style={{ position: "relative", width: 220 }}>
          <I.Search size={13} color="var(--silver)" style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}/>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search files…" style={{
            width: "100%", padding: "8px 10px 8px 30px",
            border: "1px solid var(--mist)", borderRadius: 8,
            fontSize: 12, color: "var(--ink)", outline: "none",
            background: "var(--paper)",
          }}/>
        </div>

        <div style={{ display: "flex", gap: 2, padding: 3, background: "var(--bone)", borderRadius: 8 }}>
          <button onClick={() => setView("list")} style={{ padding: 6, background: view === "list" ? "var(--paper)" : "transparent", border: "none", borderRadius: 6, cursor: "pointer", boxShadow: view === "list" ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}><I.ListView size={14} color={view === "list" ? "var(--student)" : "var(--stone)"}/></button>
          <button onClick={() => setView("grid")} style={{ padding: 6, background: view === "grid" ? "var(--paper)" : "transparent", border: "none", borderRadius: 6, cursor: "pointer", boxShadow: view === "grid" ? "0 1px 2px rgba(0,0,0,0.06)" : "none" }}><I.GridView size={14} color={view === "grid" ? "var(--student)" : "var(--stone)"}/></button>
        </div>
      </div>

      {/* Files area */}
      {view === "list"
        ? <GroupedFilesList
            applyFilters={applyFilters}
            classExpanded={classExpanded} toggleClass={toggleClass}
            unitExpanded={unitExpanded}   toggleUnit={toggleUnit}
          />
        : <FilesGrid files={applyFilters(MaterialsData)}/>
      }
    </div>
  );
}
window.MyMaterialsPage = MyMaterialsPage;

/* ─── Grouped list ─── */

function GroupedFilesList({ applyFilters, classExpanded, toggleClass, unitExpanded, toggleUnit }) {
  const colGrid = "32px minmax(0,2.4fr) 1fr 1fr 100px 120px 90px";
  const [uncatExpanded, setUncatExpanded] = React.useState(true);

  return (
    <div style={{ background: "var(--paper)", borderRadius: 12, boxShadow: "var(--shadow-card)" }}>
      {/* Column header */}
      <div style={{
        display: "grid", gridTemplateColumns: colGrid,
        gap: 12, padding: "10px 18px",
        fontSize: 10.5, color: "var(--silver)", fontWeight: 700,
        letterSpacing: "0.04em", textTransform: "uppercase",
        borderBottom: "1px solid var(--mist)", background: "var(--bone)",
        borderRadius: "12px 12px 0 0",
      }}>
        <span/>
        <span>Name</span>
        <span>Class</span>
        <span>Source</span>
        <span>Size</span>
        <span>Modified</span>
        <span style={{ textAlign: "right" }}>Actions</span>
      </div>

      {GROUPS.map((group) => {
        const classFiles = applyFilters(MaterialsData.filter(m => m.className === group.className));
        if (classFiles.length === 0) return null;
        const expanded = classExpanded[group.className];

        return (
          <div key={group.className}>
            {/* Class header */}
            <button
              onClick={() => toggleClass(group.className)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                height: 40, padding: "0 18px",
                background: "var(--bone)",
                border: "none", borderBottom: "1px solid var(--mist)",
                cursor: "pointer",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: group.classColor, flexShrink: 0 }}/>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", flex: 1, textAlign: "left" }}>{group.className}</span>
              <span style={{ fontSize: 11.5, color: "var(--stone)", marginRight: 8 }}>{classFiles.length} file{classFiles.length !== 1 ? "s" : ""}</span>
              <I.ChevronRight size={14} color="var(--stone)" style={{ transform: expanded ? "rotate(90deg)" : "none", transition: "transform 150ms" }}/>
            </button>

            {expanded && group.units.map((unit) => {
              const unitKey = `${group.className}|${unit}`;
              const unitFiles = classFiles.filter(m => m.unit === unit);
              if (unitFiles.length === 0) return null;
              const unitOpen = unitExpanded[unitKey];

              return (
                <div key={unit}>
                  {/* Unit sub-header */}
                  <button
                    onClick={() => toggleUnit(unitKey)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 8,
                      height: 32, paddingLeft: 32, paddingRight: 18,
                      background: "transparent",
                      border: "none", borderBottom: "1px solid var(--mist)",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.05em", flex: 1, textAlign: "left" }}>{unit}</span>
                    <span style={{ fontSize: 11, color: "var(--stone)", marginRight: 8 }}>{unitFiles.length}</span>
                    <I.ChevronRight size={12} color="var(--stone)" style={{ transform: unitOpen ? "rotate(90deg)" : "none", transition: "transform 150ms" }}/>
                  </button>

                  {unitOpen && unitFiles.map((f, i) => (
                    <FileRow key={f.id} f={f} last={i === unitFiles.length - 1} indent={32}/>
                  ))}
                </div>
              );
            })}
          </div>
        );
      })}

      {/* Uncategorized section */}
      {(() => {
        const uncatFiles = applyFilters(UNCATEGORIZED_FILES);
        if (uncatFiles.length === 0) return null;
        return (
          <div>
            <button
              onClick={() => setUncatExpanded(v => !v)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                height: 40, padding: "0 18px",
                background: "var(--bone)",
                border: "none", borderBottom: "1px solid var(--mist)",
                cursor: "pointer",
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#9CA3AF", flexShrink: 0 }}/>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", flex: 1, textAlign: "left" }}>Uncategorized</span>
              <span style={{ fontSize: 11.5, color: "var(--stone)", marginRight: 8 }}>{uncatFiles.length} file{uncatFiles.length !== 1 ? "s" : ""}</span>
              <I.ChevronRight size={14} color="var(--stone)" style={{ transform: uncatExpanded ? "rotate(90deg)" : "none", transition: "transform 150ms" }}/>
            </button>
            {uncatExpanded && uncatFiles.map((f, i) => (
              <FileRow key={f.id} f={f} last={i === uncatFiles.length - 1} indent={0}/>
            ))}
          </div>
        );
      })()}
    </div>
  );
}

/* ─── File row ─── */

function FileRow({ f, last, indent = 0 }) {
  const meta = KindMeta[f.kind] || KindMeta.pdf;
  const Icon = I[meta.icon];
  const sourceLabel = f.source === "you" ? { color: "#0EA5E9", label: "Your work" }
                    : f.source === "ai"  ? { color: "#8B5CF6", label: "AI-generated" }
                    :                      { color: "#10B981", label: "From teacher" };

  const [previewOpen,      setPreviewOpen]      = React.useState(false);
  const [menuOpen,         setMenuOpen]         = React.useState(false);
  const [modalOpen,        setModalOpen]        = React.useState(false);
  const [selectedSection,  setSelectedSection]  = React.useState(null);
  const [toast,            setToast]            = React.useState(null);
  const [aiPopover,        setAiPopover]        = React.useState(false);
  const [labelKept,        setLabelKept]        = React.useState(false);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const openPortfolioModal = () => { setMenuOpen(false); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setSelectedSection(null); };
  const handleSubmit = () => {
    const section = PORTFOLIO_SECTIONS.find(s => s.id === selectedSection);
    setModalOpen(false);
    setSelectedSection(null);
    setToast({ name: f.name, section: section.label });
  };

  return (
    <>
    <div style={{
      display: "grid", gridTemplateColumns: "32px minmax(0,2.4fr) 1fr 1fr 100px 120px 90px",
      gap: 12, padding: `10px 18px 10px ${18 + indent}px`,
      alignItems: "center",
      borderBottom: last ? "none" : "1px solid var(--mist)",
      cursor: "pointer", transition: "background 0.12s",
    }}
      onMouseEnter={(e) => e.currentTarget.style.background = "var(--bone)"}
      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
      onClick={() => setPreviewOpen(true)}
    >
      <button onClick={(e) => e.stopPropagation()} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer", display: "flex" }}>
        <I.Star size={14} color={f.starred ? "#F59E0B" : "var(--silver)"} style={{ fill: f.starred ? "#F59E0B" : "transparent" }}/>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        <div style={{ width: 32, height: 32, borderRadius: 7, background: `${meta.color}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon size={14} color={meta.color}/>
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
          <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{meta.label} · {f.from}</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {f.className && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "2px 8px", background: `${f.classColor}14`, color: f.classColor, borderRadius: 999, fontSize: 11, fontWeight: 600, flexShrink: 0 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: f.classColor }}/>
            {f.className}
          </span>
        )}
        {f.id === 5 && !labelKept && (
          <div style={{ position: "relative" }}>
            <button
              onClick={(e) => { e.stopPropagation(); setAiPopover(v => !v); }}
              title="AI label suggestion"
              style={{ width: 20, height: 20, borderRadius: "50%", background: "#F5F3FF", border: "1.5px solid #8B5CF6", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0, flexShrink: 0 }}
            >
              <I.Sparkle size={11} color="#8B5CF6"/>
            </button>
            {aiPopover && (
              <>
                <div style={{ position: "fixed", inset: 0, zIndex: 150 }} onClick={(e) => { e.stopPropagation(); setAiPopover(false); }}/>
                <div
                  style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 151, width: 264, background: "var(--paper)", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.14)", border: "1px solid var(--mist)", padding: "12px 14px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                    <I.Sparkle size={13} color="#8B5CF6"/>
                    <span style={{ fontSize: 11.5, fontWeight: 700, color: "#8B5CF6" }}>AI Coach</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink)", lineHeight: 1.5, marginBottom: 12 }}>
                    This looks like it might be a History essay — is the <strong>Biology</strong> label correct?
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); setLabelKept(true); setAiPopover(false); }}
                      style={{ flex: 1, height: 30, borderRadius: 7, border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--ink)", fontSize: 12, fontWeight: 500, cursor: "pointer" }}
                    >Keep label</button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setAiPopover(false); }}
                      style={{ flex: 1, height: 30, borderRadius: 7, border: "none", background: "#8B5CF6", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                    >Change label</button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: sourceLabel.color }}>{sourceLabel.label}</div>
      <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{f.size}</div>
      <div style={{ fontSize: 11.5, color: "var(--stone)" }}>{f.modified}</div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 4, justifyContent: "flex-end" }} onClick={(e) => e.stopPropagation()}>
        <button title="Download" style={iconBtn}><I.Download size={13} color="var(--stone)"/></button>
        <button title="Share"    style={iconBtn}><I.Send     size={13} color="var(--stone)"/></button>
        <div style={{ position: "relative" }}>
          <button title="More" style={iconBtn} onClick={(e) => { e.stopPropagation(); setMenuOpen(v => !v); }}>
            <I.MoreH size={13} color="var(--stone)"/>
          </button>
          {menuOpen && (
            <>
              <div style={{ position: "fixed", inset: 0, zIndex: 100 }} onClick={() => setMenuOpen(false)}/>
              <div style={{ position: "absolute", right: 0, top: 32, zIndex: 101, background: "var(--paper)", borderRadius: 10, boxShadow: "0 4px 20px rgba(0,0,0,0.13)", border: "1px solid var(--mist)", minWidth: 190, overflow: "hidden" }}>
                <button onClick={openPortfolioModal} style={menuItemStyle}>
                  <I.Briefcase size={14} color="var(--ink)"/>
                  <span>Add to Portfolio</span>
                </button>
                <div style={{ height: 1, background: "var(--mist)" }}/>
                <button style={menuItemStyle}><I.Download size={14} color="var(--ink)"/><span>Download</span></button>
                <button style={menuItemStyle}><I.Send     size={14} color="var(--ink)"/><span>Share</span></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* File preview modal */}
    {previewOpen && (
      <FilePreviewModal
        f={f}
        onClose={() => setPreviewOpen(false)}
        onAddToPortfolio={() => setModalOpen(true)}
      />
    )}

    {/* Add to Portfolio modal */}
    {modalOpen && (
      <>
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.38)", zIndex: 200 }} onClick={closeModal}/>
        <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 480, background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", zIndex: 201 }} onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div style={{ padding: "20px 24px 16px", borderBottom: "1px solid var(--mist)", position: "relative" }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)" }}>Add to Portfolio</div>
            <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 3, paddingRight: 32, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
            <button onClick={closeModal} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: 6 }}>
              <I.X size={16} color="var(--stone)"/>
            </button>
          </div>
          {/* Section grid */}
          <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {PORTFOLIO_SECTIONS.map(s => {
              const SIcon = I[s.icon];
              const sel = selectedSection === s.id;
              return (
                <button key={s.id} onClick={() => setSelectedSection(s.id)} style={{
                  background: sel ? "#F0FDF9" : "var(--bone)",
                  border: `2px solid ${sel ? "#10B981" : "var(--mist)"}`,
                  borderRadius: 12, padding: "14px 16px",
                  cursor: "pointer", textAlign: "left",
                  transition: "border-color 120ms, background 120ms",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <SIcon size={16} color={sel ? "#10B981" : "var(--stone)"}/>
                    <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{s.label}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--stone)", lineHeight: 1.4 }}>{s.desc}</div>
                </button>
              );
            })}
          </div>
          {/* Footer */}
          <div style={{ padding: "0 24px 22px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <button
                disabled={!selectedSection}
                onClick={handleSubmit}
                style={{
                  flex: 1, height: 40, borderRadius: 8, border: "none",
                  background: selectedSection ? "#10B981" : "var(--mist)",
                  color: selectedSection ? "#fff" : "var(--silver)",
                  fontSize: 14, fontWeight: 600,
                  cursor: selectedSection ? "pointer" : "not-allowed",
                  transition: "background 120ms",
                }}
              >Add to Portfolio</button>
              <button onClick={closeModal} style={{ background: "transparent", border: "none", fontSize: 13, color: "var(--stone)", cursor: "pointer", padding: "0 8px", fontWeight: 500 }}>Cancel</button>
            </div>
            <div style={{ fontSize: 12, color: "var(--stone)", textAlign: "center" }}>
              <a href="#/portfolio" onClick={(e) => { e.preventDefault(); closeModal(); window.location.hash = "#/portfolio"; }} style={{ color: "var(--stone)", textDecoration: "underline" }}>View your portfolio →</a>
            </div>
          </div>
        </div>
      </>
    )}

    {/* Confirmation toast */}
    {toast && (
      <div style={{ position: "fixed", bottom: 28, left: "50%", transform: "translateX(-50%)", zIndex: 300, background: "var(--ink)", color: "#fff", borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 4px 16px rgba(0,0,0,0.18)", whiteSpace: "nowrap" }}>
        <I.Check size={14} color="#10B981"/>
        <span>{toast.name.length > 32 ? toast.name.slice(0, 32) + "…" : toast.name} added to {toast.section}</span>
        <a href="#/portfolio" onClick={(e) => { e.preventDefault(); setToast(null); window.location.hash = "#/portfolio"; }} style={{ color: "#10B981", fontWeight: 600, textDecoration: "none" }}>View Portfolio →</a>
      </div>
    )}
    </>
  );
}

const iconBtn = {
  width: 26, height: 26, borderRadius: 6,
  background: "transparent", border: "none",
  display: "flex", alignItems: "center", justifyContent: "center",
  cursor: "pointer",
};

const menuItemStyle = {
  width: "100%", display: "flex", alignItems: "center", gap: 10,
  padding: "9px 14px", background: "transparent", border: "none",
  fontSize: 13, color: "var(--ink)", fontWeight: 500,
  cursor: "pointer", textAlign: "left",
};

/* ─── File preview modal ─── */

function FilePreviewModal({ f, onClose, onAddToPortfolio }) {
  const meta = KindMeta[f.kind] || KindMeta.pdf;
  const Icon = I[meta.icon];
  return (
    <>
      <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 180 }} onClick={onClose}/>
      <div
        style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 780, maxHeight: "85vh", background: "var(--paper)", borderRadius: 16, boxShadow: "var(--shadow-card)", zIndex: 181, display: "flex", flexDirection: "column", overflow: "hidden" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--mist)", display: "flex", alignItems: "flex-start", gap: 14, flexShrink: 0 }}>
          <div style={{ width: 40, height: 40, borderRadius: 9, background: `${meta.color}1A`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon size={18} color={meta.color}/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: f.classColor, flexShrink: 0 }}/>
              <span style={{ fontSize: 13, color: "var(--stone)" }}>{f.className}</span>
              <span style={{ color: "var(--mist)" }}>·</span>
              <span style={{ fontSize: 13, color: "var(--stone)" }}>{f.unit}</span>
              <span style={{ color: "var(--mist)" }}>·</span>
              <span style={{ fontSize: 13, color: "var(--stone)" }}>{f.from} · {f.size} · {f.modified}</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <button className="btn btn-secondary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><I.Download size={13} color="var(--ink)"/> Download</button>
            <button onClick={onAddToPortfolio} style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 32, padding: "0 14px", background: "#10B981", color: "#fff", border: "none", borderRadius: 8, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Add to Portfolio</button>
            <button onClick={onClose} style={{ width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer", borderRadius: 6 }}>
              <I.X size={16} color="var(--stone)"/>
            </button>
          </div>
        </div>

        {/* Preview area */}
        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          <FilePreviewContent f={f}/>
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 24px", borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <button onClick={onClose} style={{ background: "transparent", border: "none", fontSize: 13, color: "var(--stone)", cursor: "pointer", fontWeight: 500 }}>Close</button>
          <span style={{ fontSize: 10.5, fontWeight: 700, padding: "3px 10px", background: `${meta.color}1A`, color: meta.color, borderRadius: 4, letterSpacing: "0.05em", textTransform: "uppercase" }}>{meta.label}</span>
        </div>
      </div>
    </>
  );
}

function FilePreviewContent({ f }) {
  switch (f.kind) {
    case "image": return <ImagePreview f={f}/>;
    case "video": return <VideoPreview f={f}/>;
    case "audio": return <AudioPreview f={f}/>;
    case "doc":   return <DocPreview   f={f}/>;
    case "csv":   return <CsvPreview   f={f}/>;
    case "notes": return <NotesPreview f={f}/>;
    default:      return <PdfPreview   f={f}/>;
  }
}

function PdfPreview({ f }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 2px 16px rgba(0,0,0,0.10)", padding: "48px 56px", width: "100%", maxWidth: 540 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <I.Document size={52} color="#EF4444"/>
        </div>
        {[
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        ].map((line, i) => (
          <p key={i} style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.75, marginBottom: 14 }}>{line}</p>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0" }}>
        <button style={{ ...iconBtn, border: "1px solid var(--mist)" }}><I.ChevronRight size={15} color="var(--stone)" style={{ transform: "rotate(180deg)" }}/></button>
        <span style={{ fontSize: 12, color: "var(--stone)" }}>Page 1 of 4</span>
        <button style={{ ...iconBtn, border: "1px solid var(--mist)" }}><I.ChevronRight size={15} color="var(--stone)"/></button>
      </div>
    </div>
  );
}

function ImagePreview({ f }) {
  const [broken, setBroken] = React.useState(false);
  return broken ? (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 340, background: "var(--bone)", borderRadius: 10 }}>
      <div style={{ textAlign: "center" }}>
        <I.Camera size={48} color="var(--silver)"/>
        <div style={{ fontSize: 12, color: "var(--silver)", marginTop: 10 }}>{f.name}</div>
      </div>
    </div>
  ) : (
    <img
      src={f.name} alt={f.name}
      onError={() => setBroken(true)}
      style={{ maxHeight: 500, maxWidth: "100%", objectFit: "contain", display: "block", margin: "0 auto", borderRadius: 8 }}
    />
  );
}

function VideoPreview({ f }) {
  return (
    <div style={{ background: "#1a1a2e", borderRadius: 12, padding: "52px 48px", display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.14)", border: "2px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
        <span style={{ fontSize: 30, color: "#fff", marginLeft: 5 }}>▶</span>
      </div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
          <span>0:42</span><span>2:15</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
          <div style={{ width: "30%", height: "100%", background: "#10B981", borderRadius: 2 }}/>
        </div>
      </div>
      <I.Speaker size={18} color="rgba(255,255,255,0.4)"/>
    </div>
  );
}

function AudioPreview({ f }) {
  const bars = [22, 36, 28, 52, 44, 38, 56, 48, 32, 46, 54, 40, 28, 44, 36, 52, 42, 30, 46, 38];
  return (
    <div style={{ background: "var(--bone)", borderRadius: 12, padding: "36px 40px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 64, marginBottom: 24, justifyContent: "center" }}>
        {bars.map((h, i) => (
          <div key={i} style={{ width: 5, height: h, background: i < 6 ? "#10B981" : "var(--mist)", borderRadius: 3 }}/>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button style={{ width: 44, height: 44, borderRadius: "50%", background: "#10B981", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <span style={{ fontSize: 16, color: "#fff", marginLeft: 3 }}>▶</span>
        </button>
        <span style={{ fontSize: 12, color: "var(--stone)", whiteSpace: "nowrap" }}>0:00 / 3:28</span>
        <div style={{ flex: 1, height: 4, background: "var(--mist)", borderRadius: 2 }}>
          <div style={{ width: 0, height: "100%", background: "#10B981", borderRadius: 2 }}/>
        </div>
      </div>
    </div>
  );
}

function DocPreview({ f }) {
  return (
    <div style={{ background: "#fff", borderRadius: 4, boxShadow: "0 2px 16px rgba(0,0,0,0.10)", padding: "48px 56px", maxWidth: 560, margin: "0 auto" }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 20, paddingBottom: 14, borderBottom: "2px solid var(--mist)" }}>
        {f.name.replace(/\.[^.]+$/, "")}
      </div>
      {[
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      ].map((line, i) => (
        <p key={i} style={{ fontSize: 13, color: "var(--slate)", lineHeight: 1.75, marginBottom: 14 }}>{line}</p>
      ))}
    </div>
  );
}

function CsvPreview({ f }) {
  const headers = ["Term", "Definition", "Unit", "Status"];
  const rows = [
    ["Glycolysis",  "Breakdown of glucose in cytoplasm",         "Unit 4", "✓ Learned"],
    ["ATP",         "Adenosine triphosphate — energy currency",  "Unit 4", "✓ Learned"],
    ["Krebs Cycle", "Series of reactions in mitochondria",       "Unit 4", "In progress"],
    ["NADH",        "Electron carrier in cellular respiration",  "Unit 4", "Not started"],
  ];
  return (
    <div style={{ border: "1px solid var(--mist)", borderRadius: 10, overflow: "hidden" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
        <thead>
          <tr style={{ background: "var(--bone)" }}>
            {headers.map(h => (
              <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 700, color: "var(--ink)", borderBottom: "1px solid var(--mist)" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 1 ? "var(--bone)" : "transparent" }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: "9px 16px", color: "var(--slate)", borderBottom: i < rows.length - 1 ? "1px solid var(--mist)" : "none" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NotesPreview({ f }) {
  const lines = [
    "Class notes — Lesson 4.3 · Cellular Respiration overview",
    "ATP is the energy currency. Glycolysis happens in cytoplasm → 2 ATP net.",
    "Krebs cycle: 8 steps, acetyl-CoA enters. Produces CO₂, NADH, FADH₂.",
  ];
  return (
    <div style={{ background: "#fffef5", borderRadius: 10, padding: "36px 44px", position: "relative", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", minHeight: 220 }}>
      {[...Array(7)].map((_, i) => (
        <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${68 + i * 36}px`, height: 1, background: "#EAE4D2" }}/>
      ))}
      <div style={{ position: "relative" }}>
        {lines.map((line, i) => (
          <div key={i} style={{ fontSize: 15, fontStyle: "italic", color: "var(--slate)", lineHeight: 2.25, fontFamily: "'Kalam', cursive" }}>{line}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── Stats card ─── */

function Stat3({ icon, color, value, label, sub, bar }) {
  const Icon = I[icon];
  return (
    <div style={{ background: "var(--paper)", borderRadius: 12, padding: "14px 16px", boxShadow: "var(--shadow-card)", display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}1F`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={18} color={color}/>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 11.5, color: "var(--ink)", fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 10.5, color: "var(--stone)" }}>{sub}</div>
        {bar && (
          <div style={{ marginTop: 4, height: 4, background: "var(--mist)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${bar}%`, background: color }}/>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Grid view ─── */

function FilesGrid({ files }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
      {files.length === 0 && (
        <div style={{ gridColumn: "1/-1", padding: "60px 0", textAlign: "center", color: "var(--silver)", fontSize: 12 }}>No files match your filters.</div>
      )}
      {files.map((f) => {
        const meta = KindMeta[f.kind] || KindMeta.pdf;
        const Icon = I[meta.icon];
        return (
          <div key={f.id} style={{ background: "var(--paper)", borderRadius: 12, boxShadow: "var(--shadow-card)", overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column" }}>
            <div style={{ height: 100, background: `linear-gradient(135deg, ${meta.color}26, ${meta.color}10)`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <Icon size={36} color={meta.color}/>
              {f.starred && <I.Star size={14} color="#F59E0B" style={{ position: "absolute", top: 8, right: 8, fill: "#F59E0B" }}/>}
              <span style={{ position: "absolute", top: 8, left: 8, fontSize: 9.5, padding: "1px 6px", background: "rgba(255,255,255,0.85)", borderRadius: 3, color: meta.color, fontWeight: 700, letterSpacing: "0.04em" }}>{meta.label}</span>
            </div>
            <div style={{ padding: "10px 12px" }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
              <div style={{ fontSize: 10.5, color: f.classColor, fontWeight: 600, marginTop: 2 }}>{f.className}</div>
              <div style={{ fontSize: 10.5, color: "var(--stone)", marginTop: 2 }}>{f.modified} · {f.size}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

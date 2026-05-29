// LINKS — App shell: sidebar (L1+L2 expandable) + topbar + breadcrumbs

function NavRow({ item, depth, active, onNav, expanded, onToggle, hasChildren, onChevron }) {
  const IconComp = item.icon ? I[item.icon] : null;
  const isActive = active;
  const indent = 12 + depth * 12;
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      aria-expanded={hasChildren ? expanded : undefined}
      onClick={(e) => {
        // L1 with children: clicking the row navigates AND opens
        if (hasChildren && depth === 0) {
          onToggle(true); // force-open
        }
        onNav();
      }}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: depth === 0 ? 38 : 32,
        paddingLeft: indent,
        paddingRight: 10,
        border: "none",
        background: isActive ? "var(--student-soft)" : "transparent",
        color: isActive ? "var(--student-deep)" : (depth === 0 ? "var(--slate)" : "var(--stone)"),
        borderRadius: 10,
        fontSize: depth === 0 ? 13.5 : 12.5,
        fontWeight: isActive ? 600 : (depth === 0 ? 500 : 500),
        textAlign: "left",
        transition: "background 100ms ease",
        position: "relative",
      }}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--bone)"; }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
    >
      {depth === 0 ? (
        IconComp ? <IconComp size={18} color={isActive ? "var(--student)" : "var(--stone)"}/> : null
      ) : (
        // L2+ — show a small dot/indent guide
        <span style={{
          width: 14, height: 14, display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{
            width: 4, height: 4, borderRadius: 999,
            background: isActive ? "var(--student)" : "var(--silver)",
            opacity: isActive ? 1 : 0.6,
          }}/>
        </span>
      )}
      <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
      {item.badge && (
        typeof item.badge === "number" ? (
          <span style={{
            minWidth: 18, height: 18, padding: "0 6px",
            borderRadius: 999,
            background: isActive ? "var(--student)" : "var(--bone)",
            color: isActive ? "#fff" : "var(--stone)",
            fontSize: 10.5, fontWeight: 700,
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>{item.badge}</span>
        ) : (
          <span style={{
            padding: "1px 6px",
            borderRadius: 4,
            background: "var(--student-soft)",
            color: "var(--student-deep)",
            fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em",
          }}>{item.badge}</span>
        )
      )}
      {hasChildren && depth === 0 && (
        <span
          role="button"
          tabIndex={0}
          aria-label={expanded ? "Collapse" : "Expand"}
          onClick={(e) => { e.stopPropagation(); onChevron && onChevron(); }}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.stopPropagation(); onChevron && onChevron(); } }}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 22, height: 22, borderRadius: 6, marginRight: -4,
            cursor: "pointer",
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <I.ChevronDown
            size={13}
            color="var(--silver)"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 160ms" }}
          />
        </span>
      )}
      {hasChildren && depth > 0 && (
        <I.ChevronRight
          size={11}
          color="var(--silver)"
          style={{ transform: expanded ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 160ms" }}
        />
      )}
    </button>
  );
}

function NavTree({ items, segments, onNav, depth = 0, expandedSet, collapsedSet, toggleExpanded, forceExpand }) {
  // segments: full route (e.g. ["my-activities","athletics","football","team-hub"])
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {items.map((item) => {
        const segAtDepth = segments[depth];
        const isOnPath = segAtDepth === item.id;
        const isLeafActive = isOnPath && segments.length === depth + 1;
        const hasChildren = !!(item.children && item.children.length);
        const key = buildKey(depth, item.id);
        // Expansion rule:
        //  - if user explicitly collapsed this key → collapsed
        //  - else: expanded if (a) it is on the active route, OR (b) user explicitly expanded it
        const userExpanded = expandedSet.has(key);
        const userCollapsed = collapsedSet.has(key);
        const expanded = !userCollapsed && (userExpanded || isOnPath);

        const navOnly = () => {
          // pure navigate (used when clicking the row itself)
          const newSegs = segments.slice(0, depth);
          newSegs[depth] = item.id;
          if (hasChildren && depth === 0) {
            const firstChild = item.children[0];
            if (firstChild) newSegs.push(firstChild.id);
          }
          onNav(newSegs);
        };

        return (
          <React.Fragment key={item.id}>
            <NavRow
              item={item}
              depth={depth}
              active={depth === 0 ? (isOnPath && (segments.length === 1 || !hasChildren)) || (isOnPath && !hasChildren) || (isOnPath && segments.length === depth + 1) : isLeafActive}
              onNav={navOnly}
              expanded={expanded}
              onToggle={(forceOpen) => toggleExpanded(key, forceOpen)}
              onChevron={() => toggleExpanded(key)}
              hasChildren={hasChildren}
            />
            {hasChildren && expanded && (
              <NavTree
                items={item.children}
                segments={segments}
                onNav={onNav}
                depth={depth + 1}
                expandedSet={expandedSet}
                collapsedSet={collapsedSet}
                toggleExpanded={toggleExpanded}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
function buildKey(depth, id) { return `${depth}:${id}`; }

/* Study Streak card — paper sheet with washi tape, on the corkboard */
function StudyStreakCard() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const completed = [true, true, true, true, true, false, false];
  return (
    <div className="paper has-tape tape-color-butter" style={{
      margin: "0 18px 14px",
      padding: "14px 14px 12px",
      transform: "rotate(-1deg)",
      "--tape-y": "-9px",
      "--tape-w": "70px",
      "--tape-rot": "-6deg",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <I.Flame size={15} color="#E07A2D"/>
        <span style={{ fontSize: 12, fontWeight: 700, color: "var(--paper-warm-ink)" }}>Study Streak</span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700,
          color: "var(--paper-warm-ink)", lineHeight: 1,
        }}>12</span>
        <span style={{ fontSize: 11, color: "#7A6240" }}>days in a row!</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
        {days.map((d, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{
              width: 16, height: 16, borderRadius: 999,
              background: completed[i] ? "var(--success)" : "rgba(74,58,34,0.06)",
              border: completed[i] ? "none" : "1px solid rgba(74,58,34,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {completed[i] && <svg viewBox="0 0 24 24" width="9" height="9" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5L10 17.5l9-11"/></svg>}
            </div>
            <span style={{ fontSize: 9, color: "#A89070", fontWeight: 600 }}>{d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Gamification card */
function LevelCard() {
  return (
    <div style={{
      margin: "0 14px 14px",
      borderRadius: 16,
      padding: "16px 16px 14px",
      background: "linear-gradient(150deg, #7C3AED 0%, #5B21B6 100%)",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 8px 22px -8px rgba(91,33,182,0.55)",
    }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <svg viewBox="0 0 80 80" width="60" height="60" style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))" }}>
          <defs>
            <linearGradient id="crystalA" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FCD34D"/><stop offset="100%" stopColor="#F59E0B"/></linearGradient>
            <linearGradient id="crystalB" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FBBF24"/><stop offset="100%" stopColor="#D97706"/></linearGradient>
            <linearGradient id="crystalC" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FEF3C7"/><stop offset="100%" stopColor="#FCD34D"/></linearGradient>
          </defs>
          <polygon points="40,12 64,26 40,40 16,26" fill="url(#crystalC)"/>
          <polygon points="40,40 64,26 64,54 40,68" fill="url(#crystalA)"/>
          <polygon points="40,40 16,26 16,54 40,68" fill="url(#crystalB)"/>
          <polygon points="40,12 52,19 40,26 28,19" fill="#FFFBEB" opacity="0.6"/>
        </svg>
      </div>
      <div style={{
        fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700,
        textAlign: "center", lineHeight: 1.15, marginBottom: 2,
      }}>Level 8</div>
      <div style={{
        fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.85)",
        textAlign: "center", marginBottom: 10,
      }}>Explorer</div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.85)", marginBottom: 5 }}>
        <span style={{ fontWeight: 600 }}>1,250</span><span>2,000 XP</span>
      </div>
      <div style={{ height: 5, borderRadius: 999, background: "rgba(255,255,255,0.20)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: "62.5%", background: "linear-gradient(90deg, #FCD34D, #FBBF24)", borderRadius: 999 }}/>
      </div>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)", textAlign: "center", marginTop: 5 }}>750 XP to Level 9</div>
    </div>
  );
}

function Sidebar({ segments, onNav }) {
  // Two sets so we can both auto-expand the active path AND let the user override:
  //  expandedSet: keys the user has explicitly opened
  //  collapsedSet: keys the user has explicitly closed (overrides path-auto-expand)
  const [expandedSet, setExpandedSet] = React.useState(() => new Set());
  const [collapsedSet, setCollapsedSet] = React.useState(() => new Set());
  const toggleExpanded = (key, forceOpen) => {
    if (forceOpen === true) {
      // explicit open (used when clicking the L1 label itself — should always reveal children)
      setExpandedSet((prev) => { const n = new Set(prev); n.add(key); return n; });
      setCollapsedSet((prev) => { const n = new Set(prev); n.delete(key); return n; });
      return;
    }
    // chevron click: invert current effective state
    const userExpanded = expandedSet.has(key);
    const userCollapsed = collapsedSet.has(key);
    // figure effective by checking route auto-expand
    const onPath = (() => {
      // key is "depth:id"; only top-level (0:id) is along path if segments[0] === id
      const [d, id] = key.split(":");
      return segments[Number(d)] === id;
    })();
    const effectivelyExpanded = !userCollapsed && (userExpanded || onPath);
    if (effectivelyExpanded) {
      // close it
      setCollapsedSet((prev) => { const n = new Set(prev); n.add(key); return n; });
      setExpandedSet((prev) => { const n = new Set(prev); n.delete(key); return n; });
    } else {
      // open it
      setExpandedSet((prev) => { const n = new Set(prev); n.add(key); return n; });
      setCollapsedSet((prev) => { const n = new Set(prev); n.delete(key); return n; });
    }
  };

  return (
    <aside aria-label="Primary navigation" style={{
      width: 232,
      flexShrink: 0,
      background: "var(--paper)",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 12px", display: "flex", alignItems: "center", gap: 10 }}>
        <LinksMark size={28}/>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: 19, fontWeight: 700, color: "var(--student)",
            letterSpacing: "0.01em",
          }}>LINKS</span>
          <span style={{
            fontSize: 8.5, fontWeight: 600, color: "var(--silver)",
            letterSpacing: "0.18em", marginTop: 3,
          }}>STUDENT PORTAL</span>
        </div>
      </div>

      {/* Primary nav */}
      <nav aria-label="Sections" style={{ flex: 1, padding: "4px 12px 12px", overflowY: "auto", minHeight: 0 }}>
        <NavTree
          items={NAV_MAP}
          segments={segments}
          onNav={onNav}
          expandedSet={expandedSet}
          collapsedSet={collapsedSet}
          toggleExpanded={toggleExpanded}
        />
      </nav>

      <StudyStreakCard/>
      <LevelCard/>
    </aside>
  );
}

/* Breadcrumbs */
function Breadcrumbs({ segments, extra }) {
  const safeSegments = Array.isArray(segments) ? segments : [];
  const safeExtra = Array.isArray(extra) ? extra : [];
  const path = (typeof findNavPath === "function" ? findNavPath(safeSegments) : []) || [];
  const crumbs = [
    { label: "Home", href: "#/home", icon: "Home" },
    ...path,
    ...safeExtra.map((label) => ({ label, dynamic: true })),
  ];

  return (
    <nav aria-label="Breadcrumb" style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "0 0 14px", fontSize: 12.5, color: "var(--stone)",
      flexWrap: "wrap",
    }}>
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        const Ic = c.icon ? I[c.icon] : null;
        return (
          <React.Fragment key={i}>
            {i > 0 && (
              <I.ChevronRight size={11} color="var(--silver)" style={{ flexShrink: 0 }}/>
            )}
            {last ? (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, color: "var(--ink)", fontWeight: 600 }}>
                {Ic && i === 0 && <Ic size={13} color="var(--stone)"/>}
                {c.label}
              </span>
            ) : (
              <a href={c.href || "#"} style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                color: "var(--stone)", textDecoration: "none",
                padding: "2px 4px", borderRadius: 4,
                transition: "background 120ms, color 120ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--stone)"; }}
              >
                {Ic && i === 0 && <Ic size={13} color="var(--stone)"/>}
                {c.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

function TopBar({ onAIClick, onNav, segments }) {
  const [userOpen, setUserOpen] = React.useState(false);
  const userRef = React.useRef(null);

  React.useEffect(() => {
    if (!userOpen) return;
    const onDoc = (e) => { if (userRef.current && !userRef.current.contains(e.target)) setUserOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [userOpen]);

  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "14px 28px",
      background: "transparent",
      position: "sticky", top: 0, zIndex: 10,
    }}>
      <div className="topbar-search" role="search">
        <I.Search size={15} color="var(--stone)"/>
        <input
          type="text"
          aria-label="Search"
          placeholder="Search for classes, assignments, people, or resources…"
        />
        <span className="topbar-search-kbd" aria-hidden="true">⌘K</span>
      </div>

      <div style={{ flex: 1 }}/>

      <button className="btn-ai" onClick={onAIClick} aria-label="Open AI Coach">
        <I.Sparkle size={14} color="var(--student)"/>
        <span>AI Coach</span>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <IconButton aria-label="Calendar" onClick={() => onNav(["my-time","my-calendar"])}>
          <I.Calendar size={18} color="var(--stone)"/>
        </IconButton>
        <IconButton aria-label="Notifications" badge={2}>
          <I.Bell size={18} color="var(--stone)"/>
        </IconButton>
        <IconButton aria-label="Messages" onClick={() => onNav(["messages"])}>
          <I.Messages size={18} color="var(--stone)"/>
        </IconButton>
      </div>

      <div ref={userRef} style={{ position: "relative" }}>
        <button
          onClick={() => setUserOpen((v) => !v)}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            paddingLeft: 10, marginLeft: 4,
            background: "transparent", border: "none", cursor: "pointer",
          }}
        >
          <div style={{
            width: 38, height: 38, borderRadius: 999,
            background: "linear-gradient(135deg, #FCD34D, #F59E0B)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(0,0,0,0.04)", overflow: "hidden",
          }}>
            <PortraitSVG size={38}/>
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, alignItems: "flex-start" }}>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>Alex Johnson</span>
            <span style={{ fontSize: 11.5, color: "var(--stone)" }}>10th Grade</span>
          </div>
          <I.ChevronDown size={14} color="var(--silver)" style={{ transform: userOpen ? "rotate(180deg)" : "none", transition: "transform 160ms" }}/>
        </button>

        {userOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 8px)", right: 0,
            width: 256,
            background: "var(--paper)",
            borderRadius: 14,
            boxShadow: "var(--shadow-card-lg)",
            padding: "8px 0",
            zIndex: 200, overflow: "hidden",
          }}>
            <div style={{ padding: "10px 14px 12px", borderBottom: "1px solid var(--mist)" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Alex Johnson</div>
              <div style={{ fontSize: 11.5, color: "var(--stone)" }}>a.johnson@wpa.edu</div>
            </div>
            <div style={{ padding: "6px 0" }}>
              <div style={{ padding: "6px 14px 4px", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--silver)" }}>My Account</div>
              {ACCOUNT_NAV_MAP.map((item) => {
                const Ic = I[item.icon];
                const isActive = segments[0] === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { onNav([item.id]); setUserOpen(false); }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 14px", border: "none",
                      background: isActive ? "var(--student-soft)" : "transparent",
                      color: isActive ? "var(--student-deep)" : "var(--slate)",
                      fontSize: 13, fontWeight: isActive ? 600 : 500,
                      textAlign: "left", cursor: "pointer",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--bone)"; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    <Ic size={15} color={isActive ? "var(--student)" : "var(--stone)"}/>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ borderTop: "1px solid var(--mist)", padding: "6px 0" }}>
              <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", border: "none", background: "transparent", color: "var(--slate)", fontSize: 13, fontWeight: 500, textAlign: "left", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <I.Help size={15} color="var(--stone)"/> Help &amp; Support
              </button>
              <button style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", border: "none", background: "transparent", color: "var(--public)", fontSize: 13, fontWeight: 500, textAlign: "left", cursor: "pointer" }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bone)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
                <I.External size={15} color="var(--public)"/> Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function PortraitSVG({ size = 38 }) {
  return (
    <svg viewBox="0 0 38 38" width={size} height={size} style={{ display: "block" }}>
      <defs>
        <radialGradient id="bgPort" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FCD34D"/>
          <stop offset="100%" stopColor="#D97706"/>
        </radialGradient>
        <radialGradient id="skinPort" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#A87856"/>
          <stop offset="100%" stopColor="#6B3F23"/>
        </radialGradient>
      </defs>
      <rect width="38" height="38" fill="url(#bgPort)"/>
      <ellipse cx="19" cy="40" rx="17" ry="13" fill="#1E293B"/>
      <ellipse cx="19" cy="20" rx="8.5" ry="10" fill="url(#skinPort)"/>
      <path d="M10 16 Q 14 8 19 8 Q 26 8 27 18 Q 27 13 22 11 Q 16 11 12 17 Q 10 19 10 16 Z" fill="#0F172A"/>
      <circle cx="16" cy="20.5" r="0.9" fill="#0F172A"/>
      <circle cx="22.5" cy="20.5" r="0.9" fill="#0F172A"/>
      <path d="M17 24 Q 19 26 21.5 24" stroke="#3B1E0E" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function IconButton({ children, badge, onClick, ...rest }) {
  return (
    <button className="icon-btn" onClick={onClick} {...rest}>
      {children}
      {typeof badge === "number" && badge > 0 && (
        <span className="icon-btn-badge" aria-label={`${badge} unread`}>{badge}</span>
      )}
    </button>
  );
}

/* PageHeader — used by every L2 page: breadcrumbs + title + lede + optional actions row */
function PageHeader({ segments, title, emoji, lede, actions, extraCrumbs }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <Breadcrumbs segments={segments} extra={extraCrumbs}/>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 className="t-h1" style={{ fontSize: 28, marginBottom: 6, marginTop: 0, display: "flex", alignItems: "center", gap: 10 }}>
            {title}
            {emoji && <span style={{ fontSize: 24 }}>{emoji}</span>}
          </h1>
          {lede && <p className="t-body" style={{ color: "var(--stone)", maxWidth: 720, margin: 0 }}>{lede}</p>}
        </div>
        {actions && <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>{actions}</div>}
      </div>
    </div>
  );
}

// ============================================================
// FLOATING TOOLS BAR
// ============================================================

const FAB_TOOLS_FALLBACK = [
  { id: "calc",    name: "Calculator",    bgColor: "#FFD4B4", icon: "calc"    },
  { id: "draw",    name: "Drawing",       bgColor: "#E8D5F2", icon: "draw"    },
  { id: "sticky",  name: "Sticky Notes",  bgColor: "#FFF4D4", icon: "note"    },
  { id: "write",   name: "Writing",       bgColor: "#D4E8FF", icon: "write"   },
  { id: "present", name: "Presentation",  bgColor: "#A8D5BA", icon: "slides"  },
  { id: "graphic", name: "Graphic Design",bgColor: "#FFD4B4", icon: "design"  },
  { id: "audio",   name: "Audio",         bgColor: "#E8D5F2", icon: "audio"   },
  { id: "video",   name: "Video",         bgColor: "#D4E8FF", icon: "video"   },
];

function FabToolIcon({ icon, size = 22 }) {
  const s = size;
  const c = "#25253A";
  if (icon === "calc") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <rect x="6" y="6" width="28" height="28" rx="4" stroke={c} strokeWidth="2.2"/>
      <circle cx="12" cy="12" r="1.8" fill={c}/>
      <circle cx="20" cy="12" r="1.8" fill={c}/>
      <circle cx="28" cy="12" r="1.8" fill={c}/>
      <line x1="10" y1="21" x2="30" y2="21" stroke={c} strokeWidth="2"/>
      <line x1="12" y1="28" x2="12" y2="34" stroke={c} strokeWidth="2"/>
      <line x1="9"  y1="31" x2="15" y2="31" stroke={c} strokeWidth="2"/>
    </svg>
  );
  if (icon === "draw") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <path d="M8 32L28 12" stroke={c} strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M28 12L32 8L36 16L28 12Z" stroke={c} strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="10" cy="32" r="3" stroke={c} strokeWidth="2"/>
    </svg>
  );
  if (icon === "note") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <rect x="7" y="5" width="20" height="26" rx="2" stroke={c} strokeWidth="2.2"/>
      <line x1="11" y1="12" x2="23" y2="12" stroke={c} strokeWidth="1.8"/>
      <line x1="11" y1="17" x2="23" y2="17" stroke={c} strokeWidth="1.8"/>
      <line x1="11" y1="22" x2="19" y2="22" stroke={c} strokeWidth="1.8"/>
    </svg>
  );
  if (icon === "write") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <rect x="5" y="7" width="30" height="26" rx="2" stroke={c} strokeWidth="2.2"/>
      <line x1="10" y1="14" x2="30" y2="14" stroke={c} strokeWidth="1.8"/>
      <line x1="10" y1="19" x2="30" y2="19" stroke={c} strokeWidth="1.8"/>
      <line x1="10" y1="24" x2="22" y2="24" stroke={c} strokeWidth="1.8"/>
    </svg>
  );
  if (icon === "slides") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <rect x="5" y="7" width="30" height="22" rx="2" stroke={c} strokeWidth="2.2"/>
      <line x1="20" y1="29" x2="20" y2="35" stroke={c} strokeWidth="2"/>
      <line x1="13" y1="35" x2="27" y2="35" stroke={c} strokeWidth="2"/>
    </svg>
  );
  if (icon === "design") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <circle cx="13" cy="13" r="5" stroke={c} strokeWidth="2.2"/>
      <circle cx="27" cy="13" r="5" stroke={c} strokeWidth="2.2"/>
      <circle cx="13" cy="27" r="5" stroke={c} strokeWidth="2.2"/>
      <circle cx="27" cy="27" r="5" stroke={c} strokeWidth="2.2"/>
    </svg>
  );
  if (icon === "audio") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <rect x="14" y="5" width="12" height="20" rx="6" stroke={c} strokeWidth="2.2"/>
      <path d="M8 22C8 29.7 14.3 36 20 36C25.7 36 32 29.7 32 22" stroke={c} strokeWidth="2" strokeLinecap="round"/>
      <line x1="20" y1="36" x2="20" y2="40" stroke={c} strokeWidth="2"/>
    </svg>
  );
  if (icon === "video") return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none">
      <rect x="4" y="10" width="24" height="18" rx="2" stroke={c} strokeWidth="2.2"/>
      <path d="M28 17L36 13V27L28 23V17Z" stroke={c} strokeWidth="2" strokeLinejoin="round"/>
    </svg>
  );
  return <span style={{ fontSize: s * 0.55, fontWeight: 700, color: c }}>{(icon || "?")[0].toUpperCase()}</span>;
}

function FloatingToolsBar() {
  const [open, setOpen] = React.useState(false);
  const [favIds, setFavIds] = React.useState(() => {
    try {
      const key = window.LINKS_FAV_TOOLS_KEY || "links_fav_tools";
      return JSON.parse(localStorage.getItem(key) || "[]");
    } catch { return []; }
  });
  const [tooltipId, setTooltipId] = React.useState(null);

  const refreshFavs = () => {
    try {
      const key = window.LINKS_FAV_TOOLS_KEY || "links_fav_tools";
      setFavIds(JSON.parse(localStorage.getItem(key) || "[]"));
    } catch {}
  };

  React.useEffect(() => {
    const onStorage = (e) => {
      if (e.key === (window.LINKS_FAV_TOOLS_KEY || "links_fav_tools")) refreshFavs();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleToggle = () => {
    if (!open) refreshFavs();
    setOpen((v) => !v);
  };

  const tools = window.LINKS_TOOLS || FAB_TOOLS_FALLBACK;

  const sorted = [
    ...tools.filter((t) => favIds.includes(t.id)),
    ...tools.filter((t) => !favIds.includes(t.id)),
  ].slice(0, 6);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 18,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      {/* Expanded tool pills */}
      {open && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderRadius: 32,
          padding: "6px 10px 6px 8px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid rgba(255,255,255,0.8)",
          pointerEvents: "all",
        }}>
          {sorted.map((tool, i) => (
            <div
              key={tool.id}
              title={tool.name}
              style={{
                position: "relative",
                animation: `fabIn 180ms ${i * 25}ms both`,
              }}
              onMouseEnter={() => setTooltipId(tool.id)}
              onMouseLeave={() => setTooltipId(null)}
            >
              <button
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "none",
                  background: tool.bgColor,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.08)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
                }}
              >
                <FabToolIcon icon={tool.icon} size={22} />
              </button>
              {tooltipId === tool.id && (
                <div style={{
                  position: "absolute",
                  bottom: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#25253A",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                }}>
                  {tool.name}
                  {favIds.includes(tool.id) && <span style={{ marginLeft: 4, color: "#FFD700" }}>★</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={handleToggle}
        title={open ? "Close toolbar" : "Quick tools"}
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: open
            ? "#25253A"
            : "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open
            ? "0 4px 20px rgba(37,37,58,0.35)"
            : "0 4px 20px rgba(91,33,182,0.45)",
          transition: "all 0.2s ease",
          pointerEvents: "all",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
          </svg>
        )}
      </button>

      <style>{`
        @keyframes fabIn {
          from { opacity: 0; transform: scale(0.7) translateX(-8px); }
          to   { opacity: 1; transform: scale(1) translateX(0); }
        }
      `}</style>
    </div>
  );
}

window.FloatingToolsBar = FloatingToolsBar;

window.Sidebar = Sidebar;
window.TopBar = TopBar;
window.Breadcrumbs = Breadcrumbs;
window.PageHeader = PageHeader;
window.NavRow = NavRow;
window.PortraitSVG = PortraitSVG;
window.IconButton = IconButton;

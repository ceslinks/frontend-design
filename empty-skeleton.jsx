/* ============================================================
   LINKS — EmptyState / Skeleton / Spinner / Progress
   Token-driven; mirrors LINKS Design System.html exactly.
   Inject CSS once on first import.
   ============================================================ */

(function injectStyles() {
  if (document.getElementById("links-empty-skel-css")) return;
  const css = `
@keyframes links-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
@keyframes links-spin { to { transform: rotate(360deg); } }
@keyframes links-indeterminate { 0% { left: -40%; } 100% { left: 100%; } }

.links-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center;
  padding: 48px 24px;
  background: var(--paper);
  border-radius: var(--r);
  border: 1px dashed var(--mist);
  min-height: 280px;
}
.links-empty.compact { padding: 28px 18px; min-height: 0; }
.links-empty .ico {
  width: 56px; height: 56px;
  border-radius: 16px;
  background: var(--student-50);
  color: var(--student);
  display: inline-flex; align-items: center; justify-content: center;
  margin-bottom: 18px;
}
.links-empty.compact .ico { width: 40px; height: 40px; border-radius: 11px; margin-bottom: 12px; }
.links-empty .ico svg { width: 26px; height: 26px; stroke-width: 1.6; }
.links-empty.compact .ico svg { width: 18px; height: 18px; }
.links-empty h4 {
  font-family: var(--font-display);
  font-size: 17px; font-weight: 600;
  color: var(--ink);
  margin: 0 0 6px;
  letter-spacing: -0.005em;
}
.links-empty.compact h4 { font-size: 14.5px; }
.links-empty p {
  margin: 0 0 18px;
  font-size: 13.5px; color: var(--stone);
  max-width: 320px;
  line-height: 1.5;
}
.links-empty.compact p { font-size: 12.5px; max-width: 260px; margin-bottom: 0; }
.links-empty.error    .ico { background: var(--danger-50); color: var(--danger); }
.links-empty.success  .ico { background: var(--success-50); color: var(--success); }
.links-empty.warning  .ico { background: var(--warning-50); color: var(--warning); }
.links-empty.neutral  .ico { background: var(--bone); color: var(--stone); }

.links-skel {
  background: linear-gradient(90deg, var(--bone) 0%, var(--mist) 50%, var(--bone) 100%);
  background-size: 800px 100%;
  animation: links-shimmer 1.4s linear infinite;
  border-radius: 6px;
  display: block;
}
.links-skel-line { height: 12px; }
.links-skel-circle { border-radius: 50%; }

.links-spinner {
  width: 18px; height: 18px;
  border: 2px solid var(--mist);
  border-top-color: var(--student);
  border-radius: 50%;
  animation: links-spin 0.8s linear infinite;
  display: inline-block;
}
.links-spinner-sm { width: 12px; height: 12px; border-width: 1.5px; }
.links-spinner-on-primary { border-color: rgba(255,255,255,0.4); border-top-color: #fff; }

.links-progress {
  height: 6px;
  background: var(--bone);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}
.links-progress-bar {
  height: 100%;
  background: var(--student);
  border-radius: 999px;
  transition: width 240ms;
}
.links-progress-indeterminate::before {
  content: ''; position: absolute; top: 0; height: 100%;
  width: 40%;
  background: var(--student);
  border-radius: 999px;
  animation: links-indeterminate 1.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .links-skel, .links-spinner, .links-progress-indeterminate::before { animation: none !important; }
  .links-skel { background: var(--bone); }
}
`;
  const style = document.createElement("style");
  style.id = "links-empty-skel-css";
  style.textContent = css;
  document.head.appendChild(style);
})();

/* ─────────── EmptyState ─────────── */
/* Props:
     icon      — Lucide name string (e.g. "Inbox") or React element
     tone      — "default" | "error" | "success" | "warning" | "neutral"
     title     — required, short headline
     children  — supporting line (one short sentence)
     action    — optional ReactNode (button)
     compact   — boolean, smaller padding for inline use
     style     — extra inline style overrides
*/
function EmptyState({ icon, tone = "default", title, children, action, compact, style }) {
  const Ico = typeof icon === "string" ? (window.I && window.I[icon]) : null;
  const cls = ["links-empty", tone !== "default" && tone, compact && "compact"].filter(Boolean).join(" ");
  return (
    <div className={cls} style={style}>
      <div className="ico">
        {Ico ? <Ico size={compact ? 18 : 26}/> : (React.isValidElement(icon) ? icon : null)}
      </div>
      {title && <h4>{title}</h4>}
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

/* ─────────── Skeleton primitives ─────────── */
function Skeleton({ width, height, circle, style }) {
  const s = {
    width: typeof width === "number" ? width + "px" : width,
    height: typeof height === "number" ? height + "px" : (circle ? width : 12),
    ...style,
  };
  return <span className={"links-skel" + (circle ? " links-skel-circle" : "")} style={s}/>;
}
function SkeletonLine({ width = "100%", height = 12, style }) {
  return <Skeleton width={width} height={height} style={style}/>;
}
function SkeletonCircle({ size = 32, style }) {
  return <Skeleton width={size} height={size} circle style={style}/>;
}

/* Card-shaped skeleton: avatar + 3 lines */
function SkeletonCard({ rows = 3 }) {
  return (
    <div style={{
      display: "flex", gap: 14, padding: 16,
      border: "1px solid var(--mist)", borderRadius: 8,
      background: "var(--paper)",
    }}>
      <SkeletonCircle size={32}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
        {Array.from({ length: rows }).map((_, i) => {
          const w = i === 0 ? "62%" : i === rows - 1 ? "38%" : "88%";
          return <SkeletonLine key={i} width={w}/>;
        })}
      </div>
    </div>
  );
}

/* Table skeleton: N rows of avatar + flex line + 2 fixed-width cells */
function SkeletonTable({ rows = 4 }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 10,
      padding: "14px 16px", border: "1px solid var(--mist)",
      borderRadius: 8, background: "var(--paper)",
    }}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <SkeletonCircle size={24}/>
          <SkeletonLine width="100%" height={10} style={{ flex: 1 }}/>
          <SkeletonLine width={60} height={10}/>
          <SkeletonLine width={40} height={10}/>
        </div>
      ))}
    </div>
  );
}

/* ─────────── Spinner ─────────── */
function Spinner({ size = "md", onPrimary, style }) {
  const cls = "links-spinner" + (size === "sm" ? " links-spinner-sm" : "") + (onPrimary ? " links-spinner-on-primary" : "");
  return <span className={cls} style={style} role="status" aria-label="Loading"/>;
}

/* ─────────── Progress ─────────── */
function Progress({ value, indeterminate, style }) {
  if (indeterminate) {
    return <div className="links-progress links-progress-indeterminate" style={style} role="progressbar" aria-busy="true"/>;
  }
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="links-progress" style={style} role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
      <div className="links-progress-bar" style={{ width: pct + "%" }}/>
    </div>
  );
}

/* ─────────── Exports ─────────── */
Object.assign(window, {
  EmptyState,
  Skeleton, SkeletonLine, SkeletonCircle, SkeletonCard, SkeletonTable,
  Spinner, Progress,
});

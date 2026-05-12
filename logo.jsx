// LINKS — brand logo (original interpretation: linked atomic rings, single-color)
// Per system prompt: avoid recreating copyrighted brand exactly; create original mark.

const LinksMark = ({ size = 28, color = "var(--student)" }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <g stroke={color} strokeWidth="1.8" fill="none">
      <circle cx="16" cy="8" r="5"/>
      <circle cx="9" cy="14" r="5"/>
      <circle cx="23" cy="14" r="5"/>
      <circle cx="12" cy="22" r="5"/>
      <circle cx="20" cy="22" r="5"/>
    </g>
  </svg>
);

const LinksLogo = ({ size = 28, showWordmark = true }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <LinksMark size={size} />
    {showWordmark && (
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{
          fontFamily: "var(--font-display)",
          fontSize: size * 0.78,
          fontWeight: 600,
          color: "var(--student)",
          letterSpacing: "0.02em",
        }}>LINKS</span>
        <span style={{
          fontSize: 9,
          fontWeight: 600,
          color: "var(--stone)",
          letterSpacing: "0.18em",
          marginTop: 3,
        }}>STUDENT PORTAL</span>
      </div>
    )}
  </div>
);

window.LinksMark = LinksMark;
window.LinksLogo = LinksLogo;

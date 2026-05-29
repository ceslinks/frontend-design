// LINKS — My Resources & Support sub-page
// Route: #/my-team/resources
// Exposes: window.MyResourcesPage

(function () {

/* ── Service data ── */

const RESOURCE_CATEGORIES = [
  {
    id: "medical",
    label: "Medical",
    icon: "Stethoscope",
    iconBg: "#EFF6FF",
    iconColor: "#1E40AF",
    services: [
      {
        id: "medical-alerts",
        name: "Medical Alerts",
        provider: { name: "Nurse Patricia Walsh", initials: "PW", avatarFrom: "#FCA5A5", avatarTo: "#C026D3" },
        nextSession: "On file — reviewed May 29",
        actionLabel: "Schedule with nurse",
        auditLog: true,
      },
      {
        id: "school-nurse",
        name: "School Nurse",
        provider: { name: "Nurse Patricia Walsh", initials: "PW", avatarFrom: "#FCA5A5", avatarTo: "#C026D3" },
        nextSession: "Open access · Mon–Fri, 8 AM – 3 PM",
        actionLabel: "Schedule with nurse",
        auditLog: false,
      },
    ],
  },
  {
    id: "academic",
    label: "Academic Support",
    icon: "BookOpen",
    iconBg: "#EDE9FE",
    iconColor: "#5B21B6",
    services: [
      {
        id: "special-ed",
        name: "Special Education",
        provider: { name: "Ms. Sarah Torres", initials: "ST", avatarFrom: "#C4B5FD", avatarTo: "#7C3AED" },
        nextSession: "Weekly · Tuesdays, 1:30 PM",
        actionLabel: "Message provider",
        auditLog: false,
      },
      {
        id: "academic-counseling",
        name: "Academic Counseling",
        provider: { name: "Mr. Reed", initials: "MR", avatarFrom: "#60A5FA", avatarTo: "#2563EB" },
        nextSession: "May 20, 2026 · 11:00 AM",
        actionLabel: "Message provider",
        auditLog: false,
      },
      {
        id: "speech-therapy",
        name: "Speech Therapy",
        provider: { name: "Dr. Anita Kim", initials: "AK", avatarFrom: "#6EE7B7", avatarTo: "#059669" },
        nextSession: "May 21, 2026 · 2:00 PM",
        actionLabel: "Message provider",
        auditLog: false,
      },
      {
        id: "physical-therapy",
        name: "Physical Therapy",
        provider: { name: "Coach T. Davies", initials: "TD", avatarFrom: "#86EFAC", avatarTo: "#16A34A" },
        nextSession: "May 22, 2026 · 3:30 PM",
        actionLabel: "Message provider",
        auditLog: false,
      },
      {
        id: "occupational-therapy",
        name: "Occupational Therapy",
        provider: { name: "Ms. Marie Bravo", initials: "MB", avatarFrom: "#FDE68A", avatarTo: "#D97706" },
        nextSession: "May 23, 2026 · 10:00 AM",
        actionLabel: "Message provider",
        auditLog: false,
      },
    ],
  },
  {
    id: "resource",
    label: "Resource",
    icon: "Star",
    iconBg: "#F1F5F9",
    iconColor: "#334155",
    services: [
      {
        id: "gate",
        name: "GATE",
        provider: { name: "Ms. Sarah Chen", initials: "SC", avatarFrom: "#A78BFA", avatarTo: "#7C3AED" },
        nextSession: "Ongoing · Weekly pull-outs",
        actionLabel: "Message provider",
        auditLog: false,
      },
    ],
  },
];

const TOTAL_SERVICES = RESOURCE_CATEGORIES.reduce((a, c) => a + c.services.length, 0);

/* ── Medical Alerts modal (wraps the card from my-doctors.jsx) ── */

function MedicalAlertsModal({ onClose }) {
  // Prevent body scroll while open
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const Card = window.MedicalAlertsCard;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 400,
        background: "rgba(15,23,42,0.38)",
        backdropFilter: "blur(2px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--paper, #fff)",
          borderRadius: 24,
          padding: 28,
          width: "100%",
          maxWidth: 620,
          maxHeight: "88vh",
          overflowY: "auto",
          boxShadow: "0 8px 48px rgba(15,23,42,0.22), 0 2px 12px rgba(0,0,0,0.08)",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 30, height: 30, borderRadius: 99,
            background: "#F1F5F9", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#E2E8F0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#F1F5F9"; }}
        >
          <I.X size={14} color="#64748B" />
        </button>

        {/* Card content */}
        {Card
          ? <Card />
          : (
            <div style={{ padding: "32px 0", textAlign: "center", color: "#9CA3AF", fontSize: 14 }}>
              Medical Alerts unavailable.
            </div>
          )
        }
      </div>
    </div>
  );
}

/* ── Tiny provider avatar ── */

function RAvatar({ provider, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 999, flexShrink: 0,
      background: `linear-gradient(135deg, ${provider.avatarFrom}, ${provider.avatarTo})`,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: Math.round(size * 0.34), fontWeight: 700,
      border: "2px solid rgba(255,255,255,0.75)",
      boxShadow: "0 1px 6px rgba(15,23,42,0.12)",
    }}>
      {provider.initials}
    </div>
  );
}

/* ── Individual service row ── */

function SupportServiceRow({ service }) {
  const [hover, setHover] = React.useState(false);
  const [alertsOpen, setAlertsOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null); // null | string

  // Auto-dismiss toast after 3 s
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  const isMedical = service.id === "medical-alerts";

  function handleRowClick() {
    if (isMedical) setAlertsOpen(true);
  }

  function handleButtonClick(e) {
    e.stopPropagation(); // don't double-fire if row also handles click
    if (isMedical) {
      setAlertsOpen(true);
    } else if (service.actionLabel === "Message provider") {
      setToast("Message sent ✓");
    } else {
      // "Schedule with nurse" for school-nurse row
      setToast("Request sent ✓");
    }
  }

  return (
    <React.Fragment>
      <div
        onClick={handleRowClick}
        style={{
          display: "flex", alignItems: "center", gap: 0,
          padding: "13px 22px",
          borderRadius: 14,
          background: hover ? "#F5F3FF" : "#FAFBFF",
          border: "1px solid #EDEAF7",
          transition: "background 140ms",
          flexWrap: "wrap",
          rowGap: 10,
          cursor: isMedical ? "pointer" : "default",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {/* Service name + audit log badge */}
        <div style={{ flex: "0 0 210px", display: "flex", alignItems: "center", gap: 8, paddingRight: 16 }}>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1E1B4B" }}>{service.name}</span>
          {service.auditLog && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              fontSize: 10, color: "#7C7C8A",
              background: "#F1F5F9", border: "1px solid #E2E8F0",
              borderRadius: 6, padding: "1px 7px", fontWeight: 500,
              whiteSpace: "nowrap", flexShrink: 0,
            }}>
              <I.Lock size={9} color="#94A3B8" strokeWidth={2} />
              Access logged
            </span>
          )}
        </div>

        {/* Provider chip */}
        <div style={{ flex: "0 0 210px", display: "flex", alignItems: "center", gap: 8, paddingRight: 16 }}>
          <RAvatar provider={service.provider} size={26} />
          <span style={{
            fontSize: 12.5, color: "#374151", fontWeight: 500,
            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {service.provider.name}
          </span>
        </div>

        {/* Next session */}
        <div style={{ flex: 1, minWidth: 160, display: "flex", alignItems: "center", gap: 6 }}>
          <I.Clock size={12} color="#C4B5FD" strokeWidth={1.8} />
          <span style={{ fontSize: 12, color: "#6B7280", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {service.nextSession}
          </span>
        </div>

        {/* Action button */}
        <div style={{ flexShrink: 0, marginLeft: "auto" }}>
          <button
            onClick={handleButtonClick}
            style={{
              height: 30, padding: "0 14px",
              background: "#EDE9FE", border: "none", borderRadius: 8,
              fontSize: 12, fontWeight: 600, color: "#5B21B6",
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "background 100ms",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#DDD6FE"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#EDE9FE"; }}
          >
            {service.actionLabel}
          </button>
        </div>
      </div>

      {/* Medical Alerts modal */}
      {alertsOpen && <MedicalAlertsModal onClose={() => setAlertsOpen(false)} />}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 500,
          background: "var(--ink, #1E1B4B)", color: "#fff",
          borderRadius: 10, padding: "12px 20px",
          fontSize: 13, fontWeight: 500,
          display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          whiteSpace: "nowrap", pointerEvents: "none",
        }}>
          <I.Check size={14} color="#10B981" />
          <span>{toast}</span>
        </div>
      )}
    </React.Fragment>
  );
}

/* ── Category section (non-collapsible) ── */

function CategorySection({ category }) {
  const Ic = I[category.icon];
  return (
    <div style={{ marginBottom: 30 }}>

      {/* Category label row */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 7, flexShrink: 0,
          background: category.iconBg,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Ic size={13} color={category.iconColor} />
        </div>
        <span style={{
          fontSize: 11, fontWeight: 700, color: "#9CA3AF",
          textTransform: "uppercase", letterSpacing: "0.08em",
        }}>
          {category.label}
        </span>
        <div style={{ flex: 1, height: 1, background: "#F1F0F7", marginLeft: 4 }} />
        <span style={{ fontSize: 11, color: "#C4B5FD", fontWeight: 500 }}>
          {category.services.length} {category.services.length === 1 ? "service" : "services"}
        </span>
      </div>

      {/* Service rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {category.services.map((service) => (
          <SupportServiceRow key={service.id} service={service} />
        ))}
      </div>

    </div>
  );
}

/* ── Right panel ── */

function ResourcesPanel() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

      {/* Summary card */}
      <div style={{ background: "#FFFFFF", borderRadius: 20, padding: "20px 22px", boxShadow: "0 2px 18px rgba(99,102,241,0.07), 0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#B0AABF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Active Services
        </div>
        {RESOURCE_CATEGORIES.map((cat, i) => (
          <div key={cat.id} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "8px 0",
            borderBottom: i < RESOURCE_CATEGORIES.length - 1 ? "1px solid #F3F4F6" : "none",
          }}>
            <span style={{ fontSize: 12.5, color: "#4B5563", fontWeight: 500 }}>{cat.label}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, color: "#5B21B6",
              background: "#EDE9FE", borderRadius: 99, padding: "1px 9px",
            }}>
              {cat.services.length}
            </span>
          </div>
        ))}
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #EEEBFB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1E1B4B" }}>Total</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#5B21B6" }}>{TOTAL_SERVICES}</span>
        </div>
      </div>

      {/* Contact prompt */}
      <div style={{ background: "#F5F3FF", borderRadius: 14, padding: "16px 18px" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#5B21B6", marginBottom: 6 }}>
          Need to add a service?
        </div>
        <div style={{ fontSize: 12, color: "#4C1D95", lineHeight: 1.55, marginBottom: 12 }}>
          Contact your counselor or advisor to request additional support services.
        </div>
        <button style={{
          fontSize: 12, fontWeight: 600, color: "#5B21B6",
          background: "none", border: "none", padding: 0,
          cursor: "pointer", textDecoration: "underline",
          textUnderlineOffset: "2px",
        }}>
          Message Mr. Reed →
        </button>
      </div>

      {/* Privacy note */}
      <div style={{
        display: "flex", alignItems: "flex-start", gap: 8,
        background: "#F8FAFC", border: "1px solid #E2E8F0",
        borderRadius: 12, padding: "11px 14px",
      }}>
        <I.Shield size={13} color="#94A3B8" style={{ flexShrink: 0, marginTop: 1 }} />
        <span style={{ fontSize: 11.5, color: "#64748B", lineHeight: 1.5 }}>
          Your service records are private and shared only with authorized school staff.
        </span>
      </div>

    </div>
  );
}

/* ── Page root ── */

function MyResourcesPage({ segments }) {
  return (
    <div className="fade-in" style={{
      padding: "8px 32px 80px",
      maxWidth: 1500, margin: "0 auto",
      background: "linear-gradient(160deg, #F3F4F8 0%, #F8F9FC 65%, #F4F7FB 100%)",
      minHeight: "100vh",
    }}>

      <Breadcrumbs segments={segments} />

      {/* Page header */}
      <div style={{ marginBottom: 26 }}>
        <h1 style={{ margin: "0 0 5px", fontSize: 32, fontWeight: 800, color: "#1E1B4B" }}>
          My Resources &amp; Support
        </h1>
        <p style={{ margin: 0, color: "#7C7C8A", fontSize: 15 }}>Your active services, Alex.</p>
      </div>

      {/* My Team top nav */}
      {window.TeamTabs && <window.TeamTabs sub="resources" />}

      {/* Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 288px", gap: 24, alignItems: "start" }}>

        {/* Main column — service list */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: 20,
          padding: "26px 28px 20px",
          boxShadow: "0 2px 18px rgba(99,102,241,0.06), 0 1px 4px rgba(0,0,0,0.04)",
        }}>
          {RESOURCE_CATEGORIES.length === 0 ? (
            <div style={{ textAlign: "center", padding: "56px 24px", color: "#B0AABF", fontSize: 14 }}>
              No active services right now.
            </div>
          ) : (
            RESOURCE_CATEGORIES.map((cat) => (
              <CategorySection key={cat.id} category={cat} />
            ))
          )}
        </div>

        {/* Sticky right panel */}
        <div style={{ position: "sticky", top: 24 }}>
          <ResourcesPanel />
        </div>

      </div>
    </div>
  );
}

window.MyResourcesPage = MyResourcesPage;

})();

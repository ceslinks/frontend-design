// LINKS — Lesson Detail Page (deep dive into a single lesson)
// Currently aliases the Current Lesson view since that's the "right now" lesson; for any
// other lesson we'd swap content. Keeps things modular for the prototype.

function LessonDetailPage({ classId, lessonId }) {
  const c = ClassesData[classId] || ClassesData.algebra2;
  return (
    <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
      <LessonBreadcrumbs trail={[
        { label: "My Classes", href: "#/classes" },
        { label: c.name, href: `#/classes/${c.id}` },
        { label: "Module 4: Quadratic Functions" },
        { label: "Lesson 4.6" },
      ]}/>
      <CurrentLessonView course={Algebra2Course}/>
    </div>
  );
}

function LessonBreadcrumbs({ trail }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--stone)" }}>
      {trail.map((t, i) => (
        <React.Fragment key={i}>
          {t.href ? (
            <a href={t.href} style={{ color: "var(--student)", textDecoration: "none", fontWeight: 600 }}>{t.label}</a>
          ) : (
            <span style={{ color: i === trail.length - 1 ? "var(--ink)" : "var(--stone)", fontWeight: i === trail.length - 1 ? 600 : 500 }}>{t.label}</span>
          )}
          {i < trail.length - 1 && <I.ChevronDown size={11} color="var(--silver)" style={{ transform: "rotate(-90deg)" }}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

window.LessonDetailPage = LessonDetailPage;
window.LessonBreadcrumbs = LessonBreadcrumbs;

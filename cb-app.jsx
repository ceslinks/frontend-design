// LINKS Curriculum Builder — app entrypoint

const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "canvas": "outline",
  "density": "comfortable",
  "standards": true,
  "theme": "instructor"
}/*EDITMODE-END*/;

function CBApp() {
  const tweaksTuple = typeof useTweaks === "function" ? useTweaks(TWEAK_DEFAULTS) : null;
  const tweaks = tweaksTuple ? tweaksTuple[0] : TWEAK_DEFAULTS;
  const setTweak = tweaksTuple ? tweaksTuple[1] : (() => {});

  const [selectedLessonId, setSelectedLessonId] = useState("u1-l3");
  const [aiOpen, setAiOpen] = useState(false);
  const [genOpen, setGenOpen] = useState(false);

  // Open the AI Generate modal from the "Generate unit" button via global event
  useEffect(() => {
    const handler = (e) => {
      if (e.target.closest && e.target.closest(".btn-ghost-ai")) {
        e.preventDefault();
        setGenOpen(true);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <CBShell
        canvas={tweaks.canvas}
        onCanvasChange={(c) => setTweak("canvas", c)}
        course={CB_COURSE}
        theme={tweaks.theme}
        onOpenAi={() => setAiOpen(true)}
      >
        <div className="cb-canvas-main" data-screen-label={tweaks.canvas === "calendar" ? "Calendar canvas" : "Outline canvas"}>
          {tweaks.canvas === "calendar" ? (
            <CBCalendar
              selectedLessonId={selectedLessonId}
              onSelectLesson={setSelectedLessonId}
              showStandards={tweaks.standards}
            />
          ) : (
            <CBOutline
              selectedLessonId={selectedLessonId}
              onSelectLesson={setSelectedLessonId}
              density={tweaks.density}
              showStandards={tweaks.standards}
            />
          )}
        </div>
        <CBInspector lessonId={selectedLessonId} showStandards={tweaks.standards}/>
      </CBShell>

      <CBAiDrawer open={aiOpen} onClose={() => setAiOpen(false)}/>
      <CBAiGenerateModal open={genOpen} onClose={() => setGenOpen(false)}/>

      {window.TweaksPanel && (
        <TweaksPanel title="Tweaks · Curriculum Builder">
          <TweakSection title="Canvas">
            <TweakRadio
              label="Primary view"
              value={tweaks.canvas}
              options={[{ value: "outline", label: "Outline" }, { value: "calendar", label: "Calendar" }]}
              onChange={(v) => setTweak("canvas", v)}
            />
            <TweakRadio
              label="Density"
              value={tweaks.density}
              options={[{ value: "comfortable", label: "Comfortable" }, { value: "compact", label: "Compact" }]}
              onChange={(v) => setTweak("density", v)}
            />
          </TweakSection>
          <TweakSection title="Display">
            <TweakToggle
              label="Show standards"
              value={tweaks.standards}
              onChange={(v) => setTweak("standards", v)}
            />
          </TweakSection>
          <TweakSection title="Portal theme">
            <TweakRadio
              label="Audience"
              value={tweaks.theme}
              options={[{ value: "instructor", label: "Instructor" }, { value: "admin", label: "Admin" }]}
              onChange={(v) => setTweak("theme", v)}
            />
          </TweakSection>
          <TweakSection title="AI">
            <TweakButton label="Open AI Coach" onClick={() => setAiOpen(true)}/>
            <TweakButton label="Generate unit…" onClick={() => setGenOpen(true)}/>
          </TweakSection>
        </TweaksPanel>
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<CBApp/>);

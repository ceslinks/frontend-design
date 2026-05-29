// LINKS — Student Portal · App root (segment-based routing)

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "gamification": true,
  "density": "comfortable",
  "aiTone": "socratic"
}/*EDITMODE-END*/;

function App() {
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const segments = parseRoute(hash);
  const navigate = (segs) => {
    const next = Array.isArray(segs) ? segs : [segs];
    window.location.hash = routeToHref(next);
  };

  const [coachOpen, setCoachOpen] = React.useState(false);
  const [tweaks, setTweaks] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.dataset.density = tweaks.density;
  }, [tweaks.density]);

  // Resolve which page to render
  const renderPage = () => {
    const [l1, l2, l3, l4] = segments;

    // Special cases — fully-built legacy surfaces
    if (l1 === "home" || !l1) return <Home tweaks={tweaks} onAIClick={() => setCoachOpen(true)}/>;
    if (l1 === "ai-coach") return <AIHub tweaks={tweaks} setTweak={setTweaks} onAIClick={() => setCoachOpen(true)}/>;
    if (l1 === "my-profile") return <MyProfile/>;
    if (l1 === "ai-system") return <AISystemOverview/>;
    if (l1 === "messages") {
      // legacy messages router — map subroutes
      const sub = (l2 === "email" ? "email" : l2 === "email-compose" ? "email-compose" : "thread");
      return <MessagesPage subRoute={sub}/>;
    }
    if (l1 === "my-classes") {
      // overview vs. detail vs. lesson/live/quiz — handled inside legacy MyClassesPage
      let subRoute = { kind: "overview" };
      if (l2) {
        if (l3 === "live") subRoute = { kind: "live", classId: l2 };
        else if (l3 === "lesson") subRoute = { kind: "lesson", classId: l2, lessonId: l4 };
        else if (l3 === "quiz") subRoute = { kind: "quiz", classId: l2, state: l4 };
        else subRoute = { kind: "class", classId: l2 };
      }
      return <MyClassesPage subRoute={subRoute}/>;
    }
    if (l1 === "my-materials") return <MyMaterialsPage/>;
    if (l1 === "my-desk") return window.renderRoute_my_desk({ segments, navigate, tweaks });
    if (l1 === "my-portfolio") return window.renderRoute_portfolio({ segments, navigate, tweaks });

    // Pages we built fresh against the new IA
    if (typeof window["renderRoute_" + l1] === "function") {
      return window["renderRoute_" + l1]({ segments, navigate, tweaks });
    }

    // Otherwise: scaffolded stub with breadcrumbs + L2 tabs
    return <StubRoute segments={segments}/>;
  };

  const coachContext = {
    name: getRouteMeta(segments).title || "Home",
    cites: segments[0] === "home" ? ["Lesson · Quadratics 8.2", "Bio Lab · Cell respiration"] : ["Current section materials"],
    prompts: ["Help me think this through", "Give me a quick check-in", "What did I miss?"],
  };

  return (
    <div className="app" style={{ display: "flex", minHeight: "100vh" }}>
      <a href="#main" className="skip-link">Skip to main content</a>
      <Sidebar segments={segments} onNav={navigate}/>
      <main id="main" style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar onAIClick={() => setCoachOpen(true)} segments={segments} onNav={navigate}/>
        <div style={{ flex: 1 }}>{renderPage()}</div>
      </main>

      <FloatingToolsBar />

      <CoachDrawer
        open={coachOpen}
        onClose={() => setCoachOpen(false)}
        context={coachContext}
        tone={tweaks.aiTone}
      />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Engagement framing">
          <TweakToggle
            label="Show streaks &amp; badges"
            description="Gamification card on the right rail"
            value={tweaks.gamification}
            onChange={(v) => setTweaks("gamification", v)}
          />
        </TweakSection>
        <TweakSection title="Density">
          <TweakRadio
            value={tweaks.density}
            onChange={(v) => setTweaks("density", v)}
            options={[
              { label: "Comfortable", value: "comfortable" },
              { label: "Compact", value: "compact" },
            ]}
          />
        </TweakSection>
        <TweakSection title="AI Coach tone">
          <TweakRadio
            value={tweaks.aiTone}
            onChange={(v) => setTweaks("aiTone", v)}
            options={[
              { label: "Socratic", value: "socratic" },
              { label: "Directive", value: "directive" },
            ]}
          />
        </TweakSection>
        <TweakSection title="Try the AI Coach">
          <TweakButton onClick={() => setCoachOpen(true)}>Open coach drawer</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);

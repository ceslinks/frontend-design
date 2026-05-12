// LINKS — Tools · Produce category (Video Editing, Audio Editing, Audio Recorder)

/* ============================================================
   VIDEO EDITING — multi-track timeline
   ============================================================ */
function ToolVideo() {
  const tracks = [
    { name: "V1 — Camera", color: "#3B82F6", clips: [
      { x: 4,  w: 28, label: "Intro" },
      { x: 36, w: 18, label: "Cut" },
      { x: 58, w: 22, label: "Lab footage" },
    ] },
    { name: "V2 — Diagrams", color: "#A855F7", clips: [
      { x: 14, w: 14, label: "Mitosis 1" },
      { x: 60, w: 16, label: "Mitosis 2" },
    ] },
    { name: "A1 — Voiceover", color: "#22C55E", clips: [
      { x: 4, w: 78, label: "VO take 3", waveform: true },
    ] },
    { name: "A2 — Music", color: "#F59E0B", clips: [
      { x: 0, w: 86, label: "Bed (low)", waveform: true, opacity: 0.4 },
    ] },
  ];

  return (
    <ToolShell
      toolId="video"
      docTitle="Mitosis explainer · Bio Lab"
      saveState="Saved · 1m ago"
      contentBg="#0F172A"
      toolbar={
        <>
          <ToolBtn icon="Plus" label="Import"/>
          <ToolDivider/>
          <ToolBtn label="Cut"/>
          <ToolBtn label="Split"/>
          <ToolBtn label="Trim"/>
          <ToolBtn label="Speed"/>
          <ToolDivider/>
          <ToolBtn icon="Edit" label="Title"/>
          <ToolBtn icon="ArrowRight" label="Transition"/>
          <ToolBtn icon="Sparkle" label="Caption check"/>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>1080p · 30 fps</span>
          <ToolDivider/>
          <button className="btn btn-sm"><I.Download size={12} color="var(--stone)"/> Export</button>
        </>
      }
      leftRail={
        <>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>MEDIA · 8</div>
            {[
              { n: "lab-clip-01.mov",   t: "0:42" },
              { n: "lab-clip-02.mov",   t: "1:14" },
              { n: "mitosis-anim.mp4",  t: "0:18" },
              { n: "voiceover-take3.m4a", t: "1:32" },
              { n: "bed-music.mp3",     t: "2:10" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "6px 0", borderTop: i ? "1px solid var(--mist)" : "none" }}>
                <div style={{ width: 36, height: 24, background: "var(--bone)", borderRadius: 3, border: "1px solid var(--mist)" }}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.n}</div>
                  <div style={{ fontSize: 10, color: "var(--silver)" }}>{c.t}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>PROJECT</div>
            <div style={{ fontSize: 11, color: "var(--stone)", lineHeight: 1.5 }}>
              <div>Resolution<br/><span style={{ color: "var(--ink)", fontWeight: 600 }}>1920 × 1080</span></div>
              <div style={{ marginTop: 6 }}>Length<br/><span style={{ color: "var(--ink)", fontWeight: 600 }}>1:42 / 3:00 max</span></div>
              <div style={{ marginTop: 6 }}>Captions<br/><span style={{ color: "#15803D", fontWeight: 600 }}>✓ Auto-generated</span></div>
            </div>
          </div>
        </>
      }
      rightRail={<AICoachRail context="Mitosis explainer video" suggestions={[
        { t: "Probe",      q: "Your VO says 'cells split.' Could a viewer who skipped Bio follow that?" },
        { t: "Self-check", q: "Watch with sound off. Do the diagrams alone tell the story?" },
        { t: "Sources",    q: "Did you cite where you got the mitosis animation?" },
      ]}/>}
    >
      <div style={{ display: "grid", gridTemplateRows: "1fr auto", height: 540, color: "#fff" }}>
        {/* Preview */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 14, padding: 18, alignItems: "stretch" }}>
          <div style={{ background: "#000", borderRadius: 8, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: "70%", aspectRatio: "16/9", background: "linear-gradient(135deg, #3b1d6b, #0f172a)", borderRadius: 6, display: "flex", flexDirection: "column", padding: 18, color: "#fff" }}>
              <div style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>00:42:18</div>
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.6)", fontFamily: "ui-monospace,monospace", fontSize: 11 }}>[ preview ]</div>
              <div style={{ fontSize: 16, fontFamily: "var(--font-display)", fontWeight: 700 }}>Cells divide. Each daughter is a perfect copy.</div>
              <div style={{ fontSize: 11, opacity: 0.6, marginTop: 4 }}>auto-caption · 3.2s</div>
            </div>
            {/* play controls */}
            <div style={{ position: "absolute", bottom: 14, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8 }}>
              {["⏮", "⏯", "⏭"].map((c) => (
                <button key={c} style={{ width: 36, height: 36, borderRadius: 999, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: 14, cursor: "pointer" }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 14 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10, color: "rgba(255,255,255,0.5)" }}>SELECTED CLIP</div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Lab footage</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginBottom: 14 }}>V1 · 0:38 → 0:56</div>
            {[
              { l: "Volume",   v: 100 },
              { l: "Speed",    v: 50, lab: "1.0x" },
              { l: "Opacity",  v: 100 },
            ].map((s) => (
              <div key={s.l} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}><span>{s.l}</span><span>{s.lab || s.v + "%"}</span></div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 999 }}><div style={{ width: s.v + "%", height: "100%", background: "#A78BFA", borderRadius: 999 }}/></div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ background: "#0a1224", padding: "10px 18px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {/* ruler */}
          <div style={{ height: 18, position: "relative", marginLeft: 90, marginBottom: 6 }}>
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} style={{ position: "absolute", left: i * 10 + "%", top: 0, fontSize: 9.5, color: "rgba(255,255,255,0.4)", fontFamily: "ui-monospace,monospace" }}>0:{(i * 6).toString().padStart(2, "0")}</div>
            ))}
            {/* playhead */}
            <div style={{ position: "absolute", left: "42%", top: -2, bottom: -180, width: 1.5, background: "#EF4444" }}>
              <div style={{ position: "absolute", top: -6, left: -5, width: 12, height: 10, background: "#EF4444", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}/>
            </div>
          </div>
          {tracks.map((tr) => (
            <div key={tr.name} style={{ display: "grid", gridTemplateColumns: "90px 1fr", alignItems: "center", marginBottom: 4, position: "relative" }}>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.7)", fontFamily: "ui-monospace,monospace" }}>{tr.name}</div>
              <div style={{ position: "relative", height: 28, background: "rgba(255,255,255,0.04)", borderRadius: 4 }}>
                {tr.clips.map((c, i) => (
                  <div key={i} style={{
                    position: "absolute", left: c.x + "%", width: c.w + "%",
                    top: 2, bottom: 2, background: tr.color, opacity: c.opacity || 0.85,
                    borderRadius: 4, padding: "0 8px",
                    display: "flex", alignItems: "center",
                    fontSize: 10.5, fontWeight: 600, color: "#fff",
                    overflow: "hidden", whiteSpace: "nowrap",
                    backgroundImage: c.waveform ? "linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)" : "",
                    backgroundSize: c.waveform ? "4px 4px" : "",
                  }}>{c.label}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolShell>
  );
}

/* ============================================================
   AUDIO EDITING — waveform multitrack
   ============================================================ */
function ToolAudioEdit() {
  // pseudo-random bar heights for waveform
  const seed = (s) => {
    let x = s;
    return () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
  };
  const wave = (s, peak = 0.9, count = 180) => {
    const r = seed(s);
    return Array.from({ length: count }).map(() => Math.max(0.08, Math.pow(r(), 1.4) * peak));
  };
  const tracks = [
    { n: "Voiceover",  c: "#22C55E", solo: false, mute: false, w: wave(11, 0.95) },
    { n: "Music bed",  c: "#F59E0B", solo: false, mute: false, w: wave(31, 0.5) },
    { n: "Ambient",    c: "#3B82F6", solo: false, mute: true,  w: wave(57, 0.35) },
  ];
  return (
    <ToolShell
      toolId="audio-edit"
      docTitle="Podcast Episode 02 · Climate Solutions"
      saveState="Saved · 22s ago"
      contentBg="#0F172A"
      toolbar={
        <>
          <ToolBtn icon="Plus" label="Add track"/>
          <ToolDivider/>
          <ToolBtn label="Cut"/>
          <ToolBtn label="Fade in"/>
          <ToolBtn label="Fade out"/>
          <ToolBtn label="Normalize"/>
          <ToolDivider/>
          <ToolBtn icon="Sparkle" label="Detect filler words"/>
          <span style={{ flex: 1 }}/>
          <span style={{ fontFamily: "ui-monospace,monospace", color: "var(--stone)", fontSize: 12 }}>00:01:24 / 00:04:18</span>
        </>
      }
      leftRail={
        <>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>INPUT LEVEL</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 60 }}>
              {[0.4, 0.7, 0.85, 0.95, 0.6, 0.3, 0.5, 0.8].map((v, i) => (
                <div key={i} style={{ flex: 1, height: v * 60, background: v > 0.85 ? "#EF4444" : v > 0.6 ? "#22C55E" : "#15803D", borderRadius: 1 }}/>
              ))}
            </div>
            <div style={{ fontSize: 10.5, color: "var(--stone)", marginTop: 6, fontFamily: "ui-monospace,monospace" }}>peak −2.4 dB</div>
          </div>
          <div className="card" style={{ padding: 12 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>EFFECTS</div>
            {[
              { n: "Noise reduction", on: true },
              { n: "Compression",     on: true },
              { n: "EQ — vocal warm", on: true },
              { n: "Reverb",          on: false },
            ].map((e) => (
              <div key={e.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 0", fontSize: 12, color: "var(--ink)" }}>
                <span>{e.n}</span>
                <span style={{ width: 26, height: 14, borderRadius: 999, background: e.on ? "var(--student)" : "var(--mist)", position: "relative" }}>
                  <span style={{ position: "absolute", top: 1, left: e.on ? 13 : 1, width: 12, height: 12, borderRadius: 999, background: "#fff" }}/>
                </span>
              </div>
            ))}
          </div>
        </>
      }
      rightRail={<AICoachRail context="Podcast ep · Climate Solutions" suggestions={[
        { t: "Probe", q: "What's your main claim in this episode? Time-stamp where you make it." },
        { t: "Self-check", q: "Listen at 1.25x. Does your voice still sound conversational?" },
      ]}/>}
    >
      <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14, color: "#fff" }}>
        {/* transport */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.03)", padding: "10px 14px", borderRadius: 8 }}>
          {["⏮", "⏯", "⏹", "⏭", "⏺"].map((c, i) => (
            <button key={i} style={{ width: 32, height: 32, borderRadius: 999, background: i === 4 ? "#EF4444" : "rgba(255,255,255,0.08)", border: "none", color: "#fff", cursor: "pointer" }}>{c}</button>
          ))}
          <div style={{ width: 1, height: 24, background: "rgba(255,255,255,0.1)" }}/>
          <span style={{ fontFamily: "ui-monospace,monospace", fontSize: 16, color: "#A78BFA", fontWeight: 700 }}>00:01:24.812</span>
        </div>

        {/* tracks */}
        {tracks.map((t) => (
          <div key={t.n} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 4, height: 18, background: t.c, borderRadius: 2 }}/>
              <div style={{ fontSize: 12, fontWeight: 700, flex: 1 }}>{t.n}</div>
              {["S", "M"].map((b, i) => (
                <button key={i} style={{
                  width: 22, height: 22, borderRadius: 4, border: "1px solid rgba(255,255,255,0.15)",
                  background: (b === "M" && t.mute) || (b === "S" && t.solo) ? t.c : "transparent",
                  color: (b === "M" && t.mute) || (b === "S" && t.solo) ? "#0F172A" : "#fff",
                  fontSize: 10, fontWeight: 700, cursor: "pointer",
                }}>{b}</button>
              ))}
              <div style={{ width: 80 }}>
                <div style={{ height: 3, background: "rgba(255,255,255,0.1)", borderRadius: 999 }}>
                  <div style={{ width: "78%", height: "100%", background: t.c, borderRadius: 999 }}/>
                </div>
              </div>
            </div>
            {/* waveform */}
            <div style={{ height: 56, display: "flex", alignItems: "center", gap: 1, position: "relative", opacity: t.mute ? 0.3 : 1 }}>
              {t.w.map((v, i) => (
                <div key={i} style={{ flex: 1, height: v * 56, background: t.c, opacity: 0.7, borderRadius: 0.5 }}/>
              ))}
              {/* playhead */}
              <div style={{ position: "absolute", left: "32%", top: 0, bottom: 0, width: 1.5, background: "#EF4444" }}/>
            </div>
          </div>
        ))}
      </div>
    </ToolShell>
  );
}

/* ============================================================
   AUDIO RECORDER — quick voice capture
   ============================================================ */
function ToolAudioRecord() {
  const recordings = [
    { n: "Quick reflection — chemistry lab",   t: "0:42", d: "Today, 11:14" },
    { n: "Group meeting — Robotics Regionals", t: "9:18", d: "Yesterday" },
    { n: "Mom · permission slip reminder",     t: "0:08", d: "May 18" },
    { n: "Idea for English essay intro",       t: "1:24", d: "May 16" },
  ];
  // animated-style amplitude bars
  const amps = [0.2, 0.3, 0.5, 0.4, 0.7, 0.85, 0.95, 0.7, 0.55, 0.4, 0.6, 0.85, 0.95, 0.85, 0.75, 0.6, 0.4, 0.2, 0.45, 0.7, 0.85, 0.65, 0.4, 0.2];
  return (
    <ToolShell
      toolId="audio-record"
      docTitle="New Recording · 11:14 AM"
      saveState="Recording…"
      contentBg="#FAFAFB"
      toolbar={
        <>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Input: <strong style={{ color: "var(--ink)" }}>MacBook mic</strong></span>
          <ToolDivider/>
          <ToolBtn icon="Edit" label="Live transcript" active/>
          <ToolBtn label="Auto-tag"/>
          <span style={{ flex: 1 }}/>
          <span style={{ fontSize: 11, color: "var(--stone)" }}>Saves to <a href="#/my-desk/files">My Desk → Files</a></span>
        </>
      }
      rightRail={
        <>
          <div className="card" style={{ padding: 14 }}>
            <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 10 }}>RECENT RECORDINGS</div>
            {recordings.map((r) => (
              <div key={r.n} style={{ display: "flex", gap: 10, padding: "8px 0", borderTop: "1px solid var(--mist)", alignItems: "center" }}>
                <div style={{ width: 30, height: 30, borderRadius: 6, background: "#FEE2E2", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <I.Mic size={13} color="#EF4444"/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.n}</div>
                  <div style={{ fontSize: 10.5, color: "var(--silver)" }}>{r.d} · {r.t}</div>
                </div>
                <I.MoreH size={13} color="var(--silver)"/>
              </div>
            ))}
          </div>
          <AICoachRail context="Voice memo · chemistry reflection" suggestions={[
            { t: "Probe", q: "What's the *one* thing you'd want to remember from this recording?" },
            { t: "Connect", q: "Where in your portfolio does this belong?" },
          ]}/>
        </>
      }
    >
      <div style={{ padding: 36, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 540, gap: 22 }}>
        {/* Big timer */}
        <div style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
          00:01:42
          <span style={{ fontSize: 28, color: "var(--silver)" }}>.18</span>
        </div>
        {/* Live waveform */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, height: 120, padding: "0 24px" }}>
          {amps.concat(amps.map((a) => a * 0.6)).map((v, i) => (
            <div key={i} style={{ width: 5, height: v * 120, borderRadius: 2, background: i < amps.length ? "#EF4444" : "var(--mist)" }}/>
          ))}
        </div>
        {/* Transport */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <button style={{ width: 52, height: 52, borderRadius: 999, background: "var(--paper)", border: "1px solid var(--mist)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I.MoreH size={18} color="var(--stone)"/></button>
          <button style={{ width: 78, height: 78, borderRadius: 999, background: "#EF4444", border: "4px solid #fff", boxShadow: "0 0 0 1px #EF4444, 0 8px 22px rgba(239,68,68,0.35)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ width: 24, height: 24, background: "#fff", borderRadius: 4 }}/>
          </button>
          <button style={{ width: 52, height: 52, borderRadius: 999, background: "var(--paper)", border: "1px solid var(--mist)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}><I.Check size={18} color="#15803D"/></button>
        </div>

        {/* Live transcript */}
        <div style={{
          width: "100%", maxWidth: 620, marginTop: 18,
          background: "var(--paper)", border: "1px solid var(--mist)",
          borderRadius: 10, padding: 18,
        }}>
          <div className="t-eyebrow" style={{ fontSize: 9, marginBottom: 8 }}>LIVE TRANSCRIPT</div>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink)", margin: 0 }}>
            Okay, so today in lab the reaction took longer than the textbook said.
            I think the temperature was off — the water bath was only at 60, not 80.
            <span style={{ color: "var(--stone)" }}> That probably</span><span className="caret" style={{ display: "inline-block", width: 2, height: 16, background: "#EF4444", verticalAlign: "middle", marginLeft: 4, animation: "blink 1s infinite" }}/>
          </p>
        </div>
        <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
      </div>
    </ToolShell>
  );
}

window.ToolVideo = ToolVideo;
window.ToolAudioEdit = ToolAudioEdit;
window.ToolAudioRecord = ToolAudioRecord;

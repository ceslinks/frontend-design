// LINKS — AI Coach drawer (Socratic, contextual)
// Per Correction 03: scaffolds, never substitutes. Asks questions, cites materials,
// surfaces gaps, generates derivative practice. Never writes the essay.

function CoachDrawer({ open, onClose, context, tone }) {
  const [messages, setMessages] = React.useState(() => initialMessages(context, tone));
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef();

  React.useEffect(() => {
    setMessages(initialMessages(context, tone));
  }, [context, tone]);

  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const send = (text) => {
    if (!text.trim()) return;
    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setInput("");
    setTimeout(() => {
      setMessages([...next, coachReply(text, tone)]);
    }, 600);
  };

  if (!open) return null;

  return (
    <>
      <div onClick={onClose} style={{
        position: "fixed", inset: 0, background: "rgba(15,23,42,0.16)",
        zIndex: 50, animation: "overlayIn 180ms ease",
        backdropFilter: "blur(2px)",
      }}/>
      <aside style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width: 440, background: "var(--paper)",
        borderLeft: "1px solid var(--mist)",
        zIndex: 51, display: "flex", flexDirection: "column",
        animation: "drawerIn 220ms cubic-bezier(0.32, 0.72, 0, 1)",
        boxShadow: "var(--shadow-pop)",
      }}>
        {/* Header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: "1px solid var(--mist)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, var(--student-soft), #DCC4EA)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.Sparkle size={18} color="var(--student-deep)" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>AI Coach</div>
            <div className="t-caption">{context.name}</div>
          </div>
          <button onClick={onClose} className="btn-ghost btn" style={{ width: 32, height: 32, padding: 0, justifyContent: "center" }}>
            <I.X size={16} color="var(--stone)"/>
          </button>
        </div>

        {/* Tone disclosure */}
        <div style={{
          padding: "8px 20px",
          background: "var(--surface-quiet)",
          borderBottom: "1px solid var(--mist)",
          display: "flex", alignItems: "center", gap: 8,
          fontSize: 11.5, color: "var(--stone)",
        }}>
          <I.Shield size={13} color="var(--success)"/>
          <span>Coaching mode — I help you think; I don't write your work.</span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} style={{
          flex: 1, overflowY: "auto",
          padding: "20px",
          display: "flex", flexDirection: "column", gap: 14,
        }}>
          {messages.map((m, i) => <Bubble key={i} msg={m}/>)}
        </div>

        {/* Suggested actions */}
        <div style={{ padding: "10px 20px", borderTop: "1px solid var(--mist)", display: "flex", flexWrap: "wrap", gap: 6 }}>
          {context.prompts.map((p) => (
            <button key={p} onClick={() => send(p)}
              className="pill"
              style={{ cursor: "pointer", border: "1px solid var(--mist)", background: "var(--paper)", padding: "5px 10px" }}
            >{p}</button>
          ))}
        </div>

        {/* Composer */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          style={{
            padding: "14px 20px 18px",
            borderTop: "1px solid var(--mist)",
            display: "flex", alignItems: "center", gap: 8,
            background: "var(--paper)",
          }}>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", gap: 8,
            height: 42, padding: "0 14px",
            background: "var(--bone)", borderRadius: 12, border: "1px solid var(--mist)",
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question, talk through a problem…"
              style={{ flex: 1, border: "none", background: "transparent", outline: "none", fontSize: 13.5, color: "var(--ink)" }}
            />
            <I.Mic size={15} color="var(--silver)"/>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: 42, padding: 0, justifyContent: "center", height: 42 }}>
            <I.Send size={15} color="white" />
          </button>
        </form>
      </aside>
    </>
  );
}

function Bubble({ msg }) {
  if (msg.role === "user") {
    return (
      <div style={{ alignSelf: "flex-end", maxWidth: "85%" }}>
        <div style={{
          background: "var(--student)",
          color: "white",
          padding: "10px 14px",
          borderRadius: "14px 14px 4px 14px",
          fontSize: 13.5, lineHeight: 1.5,
        }}>{msg.text}</div>
      </div>
    );
  }
  return (
    <div style={{ alignSelf: "flex-start", maxWidth: "92%", display: "flex", gap: 10 }}>
      <div style={{
        width: 26, height: 26, borderRadius: 8, flexShrink: 0,
        background: "var(--student-soft)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <I.Sparkle size={13} color="var(--student-deep)"/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          background: "var(--bone)",
          color: "var(--ink)",
          padding: "10px 14px",
          borderRadius: "14px 14px 14px 4px",
          fontSize: 13.5, lineHeight: 1.55,
        }}>
          {msg.text}
        </div>
        {msg.cites && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8, paddingLeft: 4 }}>
            {msg.cites.map((c) => (
              <span key={c} className="pill pill-purple" style={{ fontSize: 10.5 }}>
                <I.Book size={11} color="var(--student-deep)"/>{c}
              </span>
            ))}
          </div>
        )}
        {msg.actions && (
          <div style={{ display: "flex", gap: 6, marginTop: 8, paddingLeft: 4 }}>
            {msg.actions.map((a) => (
              <button key={a} className="btn btn-sm" style={{ background: "var(--paper)", borderColor: "var(--student-200)", color: "var(--student-deep)", fontWeight: 600 }}>
                {a}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function initialMessages(context, tone) {
  const socratic = [
    {
      role: "coach",
      text: `Hi Alex. I noticed you opened ${context.name}. Before we dig in, what's the part you feel least sure about right now?`,
      cites: context.cites,
    },
  ];
  const directive = [
    {
      role: "coach",
      text: `Hi Alex. Here's a summary of ${context.name} and what to do next: [example directive answer]. (This tone violates the brief — see Correction 03.)`,
    },
  ];
  return tone === "directive" ? directive : socratic;
}

function coachReply(userText, tone) {
  if (tone === "directive") {
    return {
      role: "coach",
      text: "Here's the answer: [a complete worked solution would go here]. ⚠ This is the framing the brief explicitly forbids.",
    };
  }
  // Socratic: question back, route to practice, cite materials
  const replies = [
    {
      role: "coach",
      text: "Good — let's slow down on that. Walk me through your first step. What did you try, and where did it stop making sense?",
    },
    {
      role: "coach",
      text: "Got it. Before I give you anything to read, can you tell me in your own words what the question is actually asking?",
      cites: ["Lesson 8.2 · Factoring trinomials"],
    },
    {
      role: "coach",
      text: "That's a useful instinct. Want to try a 4-question quick check on this — same shape, different numbers — so we can see if the pattern is sticking?",
      actions: ["Start 4-question check"],
    },
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}

window.CoachDrawer = CoachDrawer;

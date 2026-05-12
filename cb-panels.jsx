// LINKS Curriculum Builder — supporting panels (AI Coach drawer, AI Generate Unit modal, Standards map drawer)

function CBAiDrawer({ open, onClose }) {
  return (
    <div className={"cb-ai-drawer " + (open ? "open" : "")}>
      <div className="cb-ai-drawer-hdr">
        <div className="cb-ai-spark large"><I.Sparkles size={14} color="#fff"/></div>
        <div style={{ flex: 1 }}>
          <div className="cb-ai-title">AI Coach · Curriculum</div>
          <div className="cb-ai-sub">Helping plan Unit 1 · Lesson 1.3</div>
        </div>
        <button className="icon-btn" onClick={onClose}><I.X size={13} color="var(--stone)"/></button>
      </div>

      <div className="cb-ai-body">
        <div className="cb-ai-msg from-ai">
          <div className="m-avatar"><I.Sparkles size={11} color="#fff"/></div>
          <div className="m-body">
            <div className="m-text">Looking at your <strong>elodea & BTB lab</strong>, I noticed Period 4's block schedule gives you 90 minutes on Thursdays. Want me to draft an extended version with a longer data-collection window?</div>
            <div className="m-actions">
              <button className="cb-ai-suggestion compact"><span className="s-text">Yes, draft it</span></button>
              <button className="cb-ai-suggestion compact"><span className="s-text">Show me what changes</span></button>
            </div>
          </div>
        </div>

        <div className="cb-ai-msg from-user">
          <div className="m-body">
            <div className="m-text">Add a station for differentiated learners — extension question on photosynthesis rate.</div>
          </div>
        </div>

        <div className="cb-ai-msg from-ai">
          <div className="m-avatar"><I.Sparkles size={11} color="#fff"/></div>
          <div className="m-body">
            <div className="m-text">Here's an extension station you can drop in:</div>
            <div className="cb-ai-card-inline">
              <div className="cb-ai-card-eyebrow">Extension · station 4</div>
              <div className="cb-ai-card-title">Quantifying photosynthesis rate</div>
              <div className="cb-ai-card-text">Students measure dissolved O₂ over time at three light intensities, plot the curves, and identify the saturation point. Aligns to <span className="cb-std-chip">NGSS HS-LS1-5</span>.</div>
              <div className="cb-ai-card-actions">
                <button className="btn btn-sm btn-primary">Insert into 1.3</button>
                <button className="btn btn-sm">Refine</button>
                <button className="btn btn-sm btn-ghost">Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cb-ai-composer">
        <div className="cb-ai-quick">
          <button>+ Generate exit ticket</button>
          <button>+ Differentiate for ELL</button>
          <button>+ Add discussion prompts</button>
        </div>
        <div className="cb-ai-input-wrap">
          <input placeholder="Ask AI Coach to refine, generate, or align…"/>
          <button className="cb-ai-send"><I.Send size={12} color="#fff"/></button>
        </div>
        <div className="cb-ai-foot">
          AI Coach uses your course context · {CB_COURSE.title}, {CB_COURSE.term}
        </div>
      </div>
    </div>
  );
}

function CBAiGenerateModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="cb-modal-scrim" onClick={onClose}>
      <div className="cb-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cb-modal-hdr">
          <div className="cb-ai-spark large"><I.Sparkles size={14} color="#fff"/></div>
          <div style={{ flex: 1 }}>
            <div className="cb-modal-title">Generate a unit with AI</div>
            <div className="cb-modal-sub">Drafts a full unit aligned to your standards. You review before anything is added.</div>
          </div>
          <button className="icon-btn" onClick={onClose}><I.X size={13} color="var(--stone)"/></button>
        </div>

        <div className="cb-modal-body">
          <div className="cb-form-row">
            <label>Unit topic</label>
            <input className="cb-input" defaultValue="Genetics & inheritance"/>
          </div>
          <div className="cb-form-grid-2">
            <div className="cb-form-row">
              <label>Duration</label>
              <select className="cb-input"><option>3 weeks (15 lessons)</option><option>2 weeks</option><option>4 weeks</option></select>
            </div>
            <div className="cb-form-row">
              <label>Grade level</label>
              <select className="cb-input"><option>Grade 10 · Honors</option><option>Grade 10 · Standard</option><option>Grade 9</option></select>
            </div>
          </div>
          <div className="cb-form-row">
            <label>Anchor phenomenon (optional)</label>
            <input className="cb-input" placeholder="e.g. Why do calico cats only come in females?"/>
          </div>
          <div className="cb-form-row">
            <label>Standards to align <span className="muted">· {3} selected</span></label>
            <div className="cb-chip-row">
              <span className="cb-std-chip selected">NGSS HS-LS3-1</span>
              <span className="cb-std-chip selected">NGSS HS-LS3-2</span>
              <span className="cb-std-chip selected">NGSS HS-LS3-3</span>
              <button className="cb-std-add">+ Add standard</button>
            </div>
          </div>
          <div className="cb-form-grid-3">
            <button className="cb-style-card active">
              <I.Beaker size={14} color="var(--instructor)"/>
              <span className="t">Inquiry-led</span>
              <span className="s">Phenomenon-first, lab-heavy</span>
            </button>
            <button className="cb-style-card">
              <I.BookOpen size={14} color="var(--stone)"/>
              <span className="t">Direct instruction</span>
              <span className="s">Lecture + guided practice</span>
            </button>
            <button className="cb-style-card">
              <I.Users size={14} color="var(--stone)"/>
              <span className="t">Project-based</span>
              <span className="s">Capstone-anchored</span>
            </button>
          </div>
        </div>

        <div className="cb-modal-foot">
          <div style={{ flex: 1, fontSize: 11.5, color: "var(--stone)", display: "flex", alignItems: "center", gap: 6 }}>
            <I.ShieldCheck size={12} color="var(--success)"/>
            Drafts are private until you review and publish.
          </div>
          <button className="btn btn-sm" onClick={onClose}>Cancel</button>
          <button className="btn btn-sm btn-primary">
            <I.Sparkles size={12} color="#fff"/>
            Generate draft unit
          </button>
        </div>
      </div>
    </div>
  );
}

window.CBAiDrawer = CBAiDrawer;
window.CBAiGenerateModal = CBAiGenerateModal;

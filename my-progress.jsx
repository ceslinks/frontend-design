// LINKS — My Progress (friendly dashboard build)
//
// Same six tabs / mock data / interactions as the spec, restyled to match the
// portfolio's friendly dashboard look: Fredoka, soft pastels, no visible
// borders, subtle shadows, 20–24px rounding, blob mascot in a welcome banner.

const React = window.React;
const { useState } = React;
const I = window.I;

/* ============================================================ */
/* Design tokens — friendly dashboard                           */
/* ============================================================ */

const MP_C = {
  // Page surfaces — warm off-white, no pure white
  bg:        "#F8F6F2",
  bgCard:    "#FEFEFE",
  bgInset:   "#F3F0EA",
  bgTinted:  "#FAF6EF",

  // Text — soft black, never pure
  text:      "#1A1A2E",
  textLight: "#5C5870",
  textMuted: "#9290A0",

  // Pastels (from portfolio system)
  mint:        "#A8D5BA",
  mintBg:      "#E2F0E8",
  mintDeep:    "#2A5A40",
  coral:       "#FFD4B4",
  coralBg:     "#FFE8DA",
  coralDeep:   "#B85C2E",
  lavender:    "#E8D5F2",
  lavenderBg:  "#F2EBF8",
  lavenderDeep:"#6E4B85",
  sky:         "#D4E8FF",
  skyBg:       "#E5EFFB",
  skyDeep:     "#3A6390",
  yellow:      "#FFF4D4",
  yellowBg:    "#FFF9E4",
  yellowDeep:  "#7C4E00",
  rose:        "#F8C8CE",
  roseBg:      "#FBE2E5",
  roseDeep:    "#A04959",

  // Subtle shadows
  shadowSm: "0 1px 2px rgba(26,26,46,0.04), 0 2px 8px rgba(26,26,46,0.04)",
  shadow:   "0 2px 6px rgba(26,26,46,0.05), 0 8px 24px rgba(26,26,46,0.06)",
  shadowLg: "0 4px 12px rgba(26,26,46,0.08), 0 16px 36px rgba(26,26,46,0.08)",
};

// Typography matches the portfolio's rule:
//   - Inter (inherited from the portal's base CSS) for body, captions,
//     metadata, and numerical values
//   - Fredoka for voice/headings: page title, panel titles, card titles,
//     tab labels, badge / class / quest names, friendly greetings
const MP_F = {
  display: '"Fredoka", -apple-system, sans-serif',
};
const FRED = MP_F.display;

const MP_PAL = {
  // Semantic palette names from the spec, remapped to pastels
  mint:     { bg: MP_C.mintBg,     fg: MP_C.mintDeep,     surface: MP_C.mint },
  forest:   { bg: MP_C.mintBg,     fg: MP_C.mintDeep,     surface: MP_C.mint },
  coral:    { bg: MP_C.coralBg,    fg: MP_C.coralDeep,    surface: MP_C.coral },
  accent:   { bg: MP_C.coralBg,    fg: MP_C.coralDeep,    surface: MP_C.coral },
  lavender: { bg: MP_C.lavenderBg, fg: MP_C.lavenderDeep, surface: MP_C.lavender },
  sky:      { bg: MP_C.skyBg,      fg: MP_C.skyDeep,      surface: MP_C.sky },
  yellow:   { bg: MP_C.yellowBg,   fg: MP_C.yellowDeep,   surface: MP_C.yellow },
  gold:     { bg: MP_C.yellowBg,   fg: MP_C.yellowDeep,   surface: MP_C.yellow },
  warn:     { bg: MP_C.yellowBg,   fg: MP_C.yellowDeep,   surface: MP_C.yellow },
  rose:     { bg: MP_C.roseBg,     fg: MP_C.roseDeep,     surface: MP_C.rose },
  wine:     { bg: MP_C.roseBg,     fg: MP_C.roseDeep,     surface: MP_C.rose },
  gray:     { bg: MP_C.bgInset,    fg: MP_C.textLight,    surface: MP_C.bgInset },
};
const mpPal = (n) => MP_PAL[n] || MP_PAL.gray;

/* ============================================================ */
/* Global styles — Fredoka + interactions                       */
/* ============================================================ */

function MPGlobalStyle() {
  return (
    <style>{`
      /* No Fredoka @import — matches my-portfolio's pattern where Fredoka is
         declared in fontFamily but never actually loaded, so it silently
         falls back to -apple-system / system sans (clean, not bubbly). */
      .mp-root { color: ${MP_C.text}; background: ${MP_C.bg}; min-height: 100%; }
      .mp-num { font-variant-numeric: tabular-nums; }

      .mp-tab { transition: background 180ms ease, color 180ms ease; }
      .mp-tab:hover:not([data-active="true"]) { background: ${MP_C.bgInset}; }

      .mp-card-btn { transition: transform 200ms ease, box-shadow 200ms ease; }
      .mp-card-btn:hover { transform: translateY(-3px); box-shadow: ${MP_C.shadowLg}; }

      .mp-ghost { transition: background 150ms ease; }
      .mp-ghost:hover { background: ${MP_C.bgInset}; }

      .mp-bar-fill { transition: width 500ms cubic-bezier(.2,.7,.3,1); }

      .mp-overlay { animation: mp-fade 150ms ease; }
      @keyframes mp-fade { from { opacity: 0 } to { opacity: 1 } }

      .mp-class-row { transition: background 150ms ease; }
      .mp-class-row:hover { background: ${MP_C.bgTinted}; }

      @keyframes mp-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
      .mp-float { animation: mp-float 4s ease-in-out infinite; }
    `}</style>
  );
}

/* ============================================================ */
/* Mock data                                                    */
/* ============================================================ */

const MP_STUDENT = {
  name: "Jordan", fullName: "Jordan Rivera",
  grade: "10th Grade", school: "Lincoln High School",
  year: "2025–2026", period: "Quarter 3",
  gpa: 3.74, gpaTrend: 0.06,
};

const MP_YEAR = {
  level: 7, levelTitle: "Honored Scholar",
  xp: 3420, nextLevelXP: 4000,
  stats: { badges: 8, booksRead: 9, streakDays: 12, onTimePct: 78, goalsCompleted: 6 },
};

const MP_BADGES = [
  { id: 1, name: "Voice of Reason", category: "Citizenship", date: "Mar 30", teacher: "Mr. Chen", icon: "Heart", palette: "mint",
    description: "Thoughtful contribution in class discussions.",
    moments: [
      { date: "Mar 30", teacher: "Mr. Chen", note: "Your point about how Atticus was wrestling with his own privilege showed real maturity. The discussion shifted because of you." },
      { date: "Mar 21", teacher: "Mr. Chen", note: "When Sarah challenged your reading of the chapter, you didn't get defensive — you actually changed your mind out loud. That's the hardest skill." },
      { date: "Feb 14", teacher: "Mr. Chen", note: "You pulled three quieter classmates into the Socratic seminar by asking them direct, specific questions. Watching you do that on purpose was lovely." },
    ] },
  { id: 2, name: "Deep Diver", category: "Academic", date: "Apr 18", teacher: "Dr. Ahmed", icon: "Compass", palette: "sky",
    description: "Research that went beyond the assignment.",
    moments: [
      { date: "Apr 18", teacher: "Dr. Ahmed", note: "Your chemistry write-up cited two primary sources I didn't assign. The discussion of catalyst surface area was college-level — keep pulling at threads." },
      { date: "Feb 06", teacher: "Dr. Ahmed", note: "You asked three follow-up questions during lab that the rest of the room hadn't thought to ask yet. That's the instinct of a scientist." },
    ] },
  { id: 3, name: "Steady Hand", category: "Effort", date: "Apr 02", teacher: "Ms. Patel", icon: "Target", palette: "coral",
    description: "Consistent on-time submission across all classes.",
    moments: [
      { date: "Apr 02", teacher: "Ms. Patel", note: "Six weeks of every homework in on time. That's not luck — that's a system you've built. Tell other students how you do it." },
    ] },
  { id: 4, name: "Bright Spark", category: "Academic", date: "Mar 12", teacher: "Ms. Lee", icon: "Lightbulb", palette: "yellow",
    description: "Recognized for an exceptional insight.",
    moments: [
      { date: "Mar 12", teacher: "Ms. Lee", note: "Your reframing of the Versailles question as 'who pays for the peace' was the kind of thing AP graders look for. I'm using your phrasing next year." },
    ] },
  { id: 5, name: "Reading Marathon", category: "Milestone", date: "Apr 10", teacher: "Ms. Hartley", icon: "BookMarked", palette: "rose",
    description: "Completed 50 books this academic year.",
    moments: [
      { date: "Apr 10", teacher: "Ms. Hartley", note: "Book #50 — and what a book to land on. Your reading log this year is genuinely remarkable." },
    ],
    milestones: [
      { label: "Book #10 — first milestone", date: "Oct 24, 2025" },
      { label: "Book #25 — halfway",          date: "Jan 12, 2026" },
      { label: "Book #50 — Marathon unlocked",date: "Apr 10, 2026" },
    ] },
  { id: 6, name: "Quiet Leader", category: "Citizenship", date: "Feb 28", teacher: "Coach Martinez", icon: "Users", palette: "lavender",
    description: "Lifts others up without seeking the spotlight.",
    moments: [
      { date: "Feb 28", teacher: "Coach Martinez", note: "You spent your lunch helping Diego catch up on three labs. He'd never have asked you — you offered. That's leadership." },
      { date: "Jan 19", teacher: "Coach Martinez", note: "When the group project was about to fall apart, you re-divided the work in a way that played to everyone's strengths. Quiet, but decisive." },
    ] },
  { id: 7, name: "Curious Mind", category: "Academic", date: "Jan 24", teacher: "Dr. Ahmed", icon: "Sparkles", palette: "sky",
    description: "Asks the questions that move discussions forward.",
    moments: [
      { date: "Jan 24", teacher: "Dr. Ahmed", note: "The question 'but what would happen if the reaction ran backwards' opened the door to next week's lab. You think like a chemist." },
    ] },
  { id: 8, name: "Finishing Strong", category: "Effort", date: "Dec 19", teacher: "Ms. Patel", icon: "Trophy", palette: "yellow",
    description: "Closed out Quarter 2 with every assignment turned in.",
    moments: [
      { date: "Dec 19", teacher: "Ms. Patel", note: "Last day of the quarter and your assignment ledger is spotless. That takes intention — not just talent." },
    ] },
];

const MP_LOCKED = [
  { id: 101, name: "Honor Roll",    category: "Academic", icon: "Award",         palette: "yellow",   criteria: "Earn all A and A− grades for a full quarter.", description: "All quarter grades at A− or above." },
  { id: 102, name: "Streak Keeper", category: "Effort",   icon: "Flame",         palette: "coral",    criteria: "Submit assignments on time for 30 consecutive days.", description: "Sustained reliability across all classes." },
  { id: 103, name: "Polyglot",      category: "Academic", icon: "MessageSquare", palette: "sky",      criteria: "Reach Proficient or above in a Spanish III oral assessment.", description: "Strong communication in a second language." },
  { id: 104, name: "Mystery badge", category: "???",      icon: "Sparkles",      palette: "lavender", mystery: true, criteria: "Keep showing up — you'll know when you've earned it.", description: "???" },
];

const MP_GOALS = [
  { id: 1, title: "Raise English grade to A−", category: "Grade",      setBy: "Self-set",   target: 90, current: 86, unit: "%",            due: "Jun 12",      tracking: "auto",    source: "English Literature gradebook" },
  { id: 2, title: "Read 12 books this quarter", category: "Reading",    setBy: "Self-set",   target: 12, current: 9,  unit: "books",         due: "Jun 4",       tracking: "self",    source: "Your reading log",
    lastLog: { title: "Project Hail Mary", date: "May 18", count: 9 } },
  { id: 3, title: "Submit every assignment on time", category: "Habit", setBy: "Self-set",   target: 100, current: 78, unit: "%",           due: "Ongoing",     tracking: "auto",    source: "Missing-assignment tracker across all classes" },
  { id: 4, title: "Improve SBAC Math by one level", category: "Assessment", setBy: "Mr. Okafor", target: 100, current: 65, unit: "% to target", due: "Spring 2026", tracking: "teacher", source: "Mr. Okafor updates based on practice assessments" },
];

const MP_QUESTS = [
  { id: 1, title: "Perfect Submission Week",
    description: "Submit every assignment on time for 5 school days in a row.",
    progress: 3, target: 5, daysLeft: 2, deadline: "May 27", issuedBy: "System",
    palette: "mint", icon: "Check",
    standardReward: { name: "Reliability badge", detail: "Earned on completion" },
    bonusReward:    { name: "Sharp Eye badge + 50 XP", detail: "If at least 2 submissions are 24+ hours early" } },
  { id: 2, title: "Ms. Patel's Math Marathon",
    description: "Complete three practice problem sets at 80%+ before next test.",
    progress: 2, target: 3, daysLeft: 6, deadline: "Jun 02", issuedBy: "Ms. Patel",
    palette: "coral", icon: "Zap",
    standardReward: { name: "Math Streak badge", detail: "Earned on completion" },
    bonusReward:    { name: "Gold Streak — Distinction", detail: "If all three scores reach 95% or above" } },
  { id: 3, title: "Read Across the World",
    description: "Read one book by an author from a continent you haven't read this year.",
    progress: 1, target: 3, daysLeft: 14, deadline: "Jun 10", issuedBy: "Ms. Hartley",
    palette: "sky", icon: "BookOpen",
    standardReward: { name: "Global Reader badge", detail: "Earned on completion" },
    bonusReward:    { name: "Reflective Reader badge", detail: "If you write a short reflection on each book" } },
];

const MP_CLASSES = [
  { id: "alg", name: "Algebra II", teacher: "Ms. Patel", room: "B204", period: "1",
    grade: "A−", percentage: 91, trend: 2, credits: 1.0, accent: "sky",
    categories: [
      { name: "Tests", weight: 40, average: 89 }, { name: "Quizzes", weight: 20, average: 92 },
      { name: "Homework", weight: 25, average: 95 }, { name: "Participation", weight: 15, average: 88 },
    ],
    assignments: [
      { name: "Unit 7 Test: Quadratics", category: "Tests",   date: "May 16", score: 92,   total: 100, status: "graded",
        comment: "Strong work on factoring and completing the square. Watch your arithmetic on #14 — the setup was right, the final step slipped." },
      { name: "Quiz 7.2: Vertex form",   category: "Quizzes", date: "May 12", score: 18,   total: 20,  status: "graded",
        comment: "Vertex form is locked in. Bring this same confidence to the conics unit next week." },
      { name: "Worksheet 7.3",           category: "Homework",date: "May 9",  score: null, total: 10,  status: "missing" },
      { name: "Worksheet 7.2",           category: "Homework",date: "May 5",  score: 10,   total: 10,  status: "graded",
        comment: "Clean work all the way through. Your annotations help me follow your thinking — keep doing that." },
      { name: "Participation: Week 32",  category: "Participation", date: "May 2", score: 9, total: 10, status: "graded",
        comment: "Two strong board explanations this week. Push yourself to ask a question of a classmate's solution next time." },
    ] },
  { id: "eng", name: "English Literature", teacher: "Mr. Chen", room: "C108", period: "2",
    grade: "B+", percentage: 86, trend: 1, credits: 1.0, accent: "lavender",
    categories: [
      { name: "Essays", weight: 45, average: 84 }, { name: "Reading checks", weight: 20, average: 90 },
      { name: "Discussions", weight: 20, average: 92 }, { name: "Vocab", weight: 15, average: 86 },
    ],
    assignments: [
      { name: "Mockingbird Essay (Draft 2)",      category: "Essays",        date: "May 14", score: 86, total: 100, status: "graded",
        comment: "Thesis is sharper than the first draft. The middle body paragraph drifts — tighten it around one claim and you're at an A." },
      { name: "Chapter 22 reading check",         category: "Reading checks",date: "May 8",  score: 9,  total: 10,  status: "graded",
        comment: "Solid reading. The one you missed was a tricky inference question — worth reviewing." },
      { name: "Socratic seminar — Ch. 18–24",     category: "Discussions",   date: "May 6",  score: 19, total: 20,  status: "graded",
        comment: "You opened the door for two quieter classmates by asking direct questions. That's the move." },
      { name: "Vocab quiz: Unit 11",              category: "Vocab",         date: "Apr 30", score: 17, total: 20,  status: "graded",
        comment: "Good showing. Re-read \"obfuscate\" and \"trepidation\" — those tripped you up and they'll be back." },
    ] },
  { id: "chm", name: "Chemistry", teacher: "Dr. Ahmed", room: "S301", period: "3",
    grade: "A", percentage: 94, trend: 3, credits: 1.0, accent: "mint",
    categories: [
      { name: "Labs", weight: 35, average: 96 }, { name: "Tests", weight: 35, average: 92 },
      { name: "Quizzes", weight: 20, average: 93 }, { name: "Notebook", weight: 10, average: 95 },
    ],
    assignments: [
      { name: "Reaction rates — lab write-up", category: "Labs",     date: "May 15", score: 47, total: 50,  status: "graded",
        comment: "Best lab write-up I've gotten all term. Your discussion of catalyst surface area read like AP work." },
      { name: "Equilibrium quiz",              category: "Quizzes",  date: "May 11", score: 19, total: 20,  status: "graded",
        comment: "Le Chatelier's principle is solid. One small slip on the pressure-shift problem." },
      { name: "Unit 6 Test",                   category: "Tests",    date: "May 5",  score: 92, total: 100, status: "graded",
        comment: "Excellent. The free-response on reaction mechanisms could've used one more line of reasoning, but the math was perfect." },
      { name: "Lab notebook check",            category: "Notebook", date: "Apr 28", score: 10, total: 10,  status: "graded",
        comment: "Spotless notebook. Your data tables are the example I show new students." },
    ] },
  { id: "hst", name: "World History", teacher: "Ms. Lee", room: "C201", period: "4",
    grade: "A−", percentage: 90, trend: 0, credits: 1.0, accent: "yellow",
    categories: [
      { name: "Essays", weight: 35, average: 88 }, { name: "Tests", weight: 30, average: 91 },
      { name: "Document analyses", weight: 25, average: 92 }, { name: "Participation", weight: 10, average: 90 },
    ],
    assignments: [
      { name: "Versailles DBQ",        category: "Document analyses", date: "May 13", score: 23, total: 25,  status: "graded",
        comment: "\"Who pays for the peace\" was a brilliant reframing. I'm using your phrasing with next year's class." },
      { name: "Unit 8 Test",           category: "Tests",             date: "May 6",  score: 90, total: 100, status: "graded",
        comment: "Strong test. The short-answer on Wilson's Fourteen Points was a bit thin — give yourself another sentence next time." },
      { name: "Interwar essay draft",  category: "Essays",            date: "Apr 29", score: 86, total: 100, status: "graded",
        comment: "Argument is there. The transitions between paragraphs are doing most of the heavy lifting — vary them in your revision." },
    ] },
  { id: "spn", name: "Spanish III", teacher: "Sr. Ortega", room: "L112", period: "5",
    grade: "B−", percentage: 80, trend: -1, credits: 1.0, accent: "coral",
    categories: [
      { name: "Oral", weight: 30, average: 76 }, { name: "Writing", weight: 30, average: 82 },
      { name: "Listening", weight: 20, average: 80 }, { name: "Quizzes", weight: 20, average: 84 },
    ],
    assignments: [
      { name: "Diálogo: viaje imaginario",     category: "Oral",      date: "May 12", score: 14,   total: 20,  status: "graded",
        comment: "Vocabulary is there. Slow down — when you rush, the past-tense endings slip. Practice with podcasts." },
      { name: "Composición: mi pueblo",        category: "Writing",   date: "May 7",  score: 80,   total: 100, status: "graded",
        comment: "Nice imagery in paragraph 2. Watch the subjunctive — we'll review the conjugations in office hours." },
      { name: "Listening quiz — Capítulo 9",   category: "Listening", date: "May 1",  score: null, total: 20,  status: "missing" },
      { name: "Vocab quiz — Capítulo 9",       category: "Quizzes",   date: "Apr 26", score: 17,   total: 20,  status: "graded",
        comment: "Buen trabajo. The household-items section was nearly perfect." },
    ] },
  { id: "art", name: "Visual Arts", teacher: "Ms. Hartley", room: "A105", period: "6",
    grade: "A", percentage: 95, trend: 1, credits: 0.5, accent: "rose",
    categories: [
      { name: "Projects", weight: 60, average: 96 }, { name: "Sketchbook", weight: 25, average: 94 }, { name: "Critiques", weight: 15, average: 92 },
    ],
    assignments: [
      { name: "Self-portrait in graphite",       category: "Projects",  date: "May 14", score: 96, total: 100, status: "graded",
        comment: "Strongest piece in the class. The way you handled the shadow under the jaw is genuinely impressive — you're ready for longer studies." },
      { name: "Sketchbook check #6",             category: "Sketchbook",date: "May 7",  score: 24, total: 25,  status: "graded",
        comment: "Loose, fast sketches are paying off. I want to see one full-page composition study in next week's check." },
      { name: "Critique: Renaissance pairings",  category: "Critiques", date: "Apr 30", score: 18, total: 20,  status: "graded",
        comment: "Your observation about Caravaggio's edge work was exactly right. Read up on chiaroscuro for next time." },
    ] },
];

const MP_TREND = [
  { week: "W1", gpa: 3.62 }, { week: "W2", gpa: 3.64 },
  { week: "W3", gpa: 3.68 }, { week: "W4", gpa: 3.68 },
  { week: "W5", gpa: 3.71 }, { week: "W6", gpa: 3.72 },
  { week: "W7", gpa: 3.74 },
];

/* ---------- Prior-year class records ---------- */
// Each entry mirrors the shape of MP_CLASSES so the same accordion + assignment
// table can render them. Categories + assignments are abbreviated vs. the
// current year (these are final snapshots, not live gradebooks).

const MP_CLASSES_Y9 = [
  { id: "alg1", name: "Algebra I", teacher: "Mr. Diaz", room: "B201", period: "1",
    grade: "A−", percentage: 91, trend: 0, credits: 1.0, accent: "sky",
    categories: [
      { name: "Tests",     weight: 40, average: 90 },
      { name: "Quizzes",   weight: 25, average: 92 },
      { name: "Homework",  weight: 25, average: 94 },
      { name: "Class work",weight: 10, average: 88 },
    ],
    assignments: [
      { name: "Final Exam",                category: "Tests",    date: "Jun 09, 2025", score: 88, total: 100, status: "graded",
        comment: "Strong showing on the linear systems block. Solid foundation heading into Algebra II." },
      { name: "Quiz 9.3: Slope-intercept",  category: "Quizzes",  date: "May 22, 2025", score: 19, total: 20,  status: "graded",
        comment: "Quick and clean. Watch your sign on negative slopes." },
      { name: "Homework set 8",             category: "Homework", date: "May 14, 2025", score: 10, total: 10,  status: "graded",
        comment: "Every step shown — exactly what I'm looking for." },
    ] },
  { id: "eng9", name: "English 9", teacher: "Mr. Chen", room: "C108", period: "2",
    grade: "B+", percentage: 88, trend: 0, credits: 1.0, accent: "lavender",
    categories: [
      { name: "Essays",        weight: 50, average: 87 },
      { name: "Reading checks",weight: 20, average: 90 },
      { name: "Discussions",   weight: 20, average: 89 },
      { name: "Vocab",         weight: 10, average: 86 },
    ],
    assignments: [
      { name: "Final essay: Of Mice and Men", category: "Essays",     date: "Jun 02, 2025", score: 87, total: 100, status: "graded",
        comment: "Argument is there. Push harder on textual evidence next year — quote first, summarize second." },
      { name: "Romeo & Juliet seminar",        category: "Discussions",date: "Apr 28, 2025", score: 18, total: 20,  status: "graded",
        comment: "You set the tone for the room. Keep doing that." },
      { name: "Chapter 6 reading check",       category: "Reading checks", date: "Mar 18, 2025", score: 9, total: 10, status: "graded",
        comment: "Solid recall — the inference question was the only stumble." },
    ] },
  { id: "bio", name: "Biology", teacher: "Dr. Greer", room: "S214", period: "3",
    grade: "A", percentage: 94, trend: 0, credits: 1.0, accent: "mint",
    categories: [
      { name: "Labs",     weight: 35, average: 95 },
      { name: "Tests",    weight: 35, average: 93 },
      { name: "Quizzes",  weight: 20, average: 94 },
      { name: "Notebook", weight: 10, average: 95 },
    ],
    assignments: [
      { name: "Cell respiration lab",     category: "Labs",     date: "May 28, 2025", score: 48, total: 50, status: "graded",
        comment: "Lab notebook was meticulous. Your diagrams could be in a textbook." },
      { name: "Unit 7 Test: Genetics",    category: "Tests",    date: "May 12, 2025", score: 93, total: 100, status: "graded",
        comment: "Strong test. Punnett squares were perfect." },
      { name: "Photosynthesis quiz",      category: "Quizzes",  date: "Apr 21, 2025", score: 19, total: 20, status: "graded",
        comment: "Light-dependent vs. light-independent reactions — you've got it." },
    ] },
  { id: "wgeo", name: "World Geography", teacher: "Ms. Lee", room: "C204", period: "4",
    grade: "A−", percentage: 90, trend: 0, credits: 1.0, accent: "yellow",
    categories: [
      { name: "Tests",            weight: 35, average: 90 },
      { name: "Map work",         weight: 25, average: 93 },
      { name: "Projects",         weight: 25, average: 89 },
      { name: "Participation",    weight: 15, average: 88 },
    ],
    assignments: [
      { name: "Region project: Southeast Asia", category: "Projects", date: "Jun 06, 2025", score: 90, total: 100, status: "graded",
        comment: "Original framing on the trade-route map. Tighten your bibliography next time." },
      { name: "Africa political map quiz",       category: "Map work", date: "Mar 24, 2025", score: 24, total: 25, status: "graded",
        comment: "Almost perfect. Only Lesotho tripped you up." },
      { name: "Unit 5 Test",                     category: "Tests",    date: "Feb 14, 2025", score: 88, total: 100, status: "graded",
        comment: "Good test. The free-response on climate zones could use one more example." },
    ] },
  { id: "spn2", name: "Spanish II", teacher: "Sr. Ortega", room: "L110", period: "5",
    grade: "B+", percentage: 88, trend: 0, credits: 1.0, accent: "coral",
    categories: [
      { name: "Writing",   weight: 30, average: 89 },
      { name: "Oral",      weight: 30, average: 84 },
      { name: "Listening", weight: 20, average: 90 },
      { name: "Quizzes",   weight: 20, average: 90 },
    ],
    assignments: [
      { name: "Final oral exam",       category: "Oral",     date: "Jun 04, 2025", score: 17, total: 20,  status: "graded",
        comment: "Pronunciation is great. Slow down on past-tense endings — they slip when you rush." },
      { name: "Composición: mi familia",category: "Writing",  date: "May 06, 2025", score: 89, total: 100, status: "graded",
        comment: "Nice description. Watch ser/estar — you used the wrong one twice." },
      { name: "Listening quiz Capítulo 7", category: "Listening", date: "Apr 02, 2025", score: 19, total: 20, status: "graded",
        comment: "Ear is sharpening. Good work." },
    ] },
  { id: "art1", name: "Intro to Visual Arts", teacher: "Ms. Hartley", room: "A101", period: "6",
    grade: "A", percentage: 95, trend: 0, credits: 0.5, accent: "rose",
    categories: [
      { name: "Projects",   weight: 60, average: 96 },
      { name: "Sketchbook", weight: 30, average: 94 },
      { name: "Critiques",  weight: 10, average: 92 },
    ],
    assignments: [
      { name: "Still life in charcoal",      category: "Projects",  date: "Jun 05, 2025", score: 95, total: 100, status: "graded",
        comment: "Confident value range. You're ready for graphite next year." },
      { name: "Sketchbook check #8",         category: "Sketchbook",date: "May 14, 2025", score: 24, total: 25,  status: "graded",
        comment: "Daily sketches are paying off. Push into longer studies." },
      { name: "Critique: Impressionism",     category: "Critiques", date: "Mar 27, 2025", score: 18, total: 20,  status: "graded",
        comment: "Sharp observation about Monet's edges. Keep writing critiques like that." },
    ] },
];

const MP_CLASSES_Y8 = [
  { id: "prealg", name: "Pre-Algebra", teacher: "Ms. Vega", room: "M210", period: "1",
    grade: "B+", percentage: 87, trend: 0, credits: 1.0, accent: "sky",
    categories: [
      { name: "Tests",    weight: 40, average: 86 },
      { name: "Homework", weight: 30, average: 90 },
      { name: "Quizzes",  weight: 20, average: 85 },
      { name: "Effort",   weight: 10, average: 88 },
    ],
    assignments: [
      { name: "Year-end review test",  category: "Tests",    date: "Jun 03, 2024", score: 85, total: 100, status: "graded",
        comment: "Big improvement from the fall. Keep building from here." },
      { name: "Integers unit test",     category: "Tests",    date: "Feb 22, 2024", score: 84, total: 100, status: "graded",
        comment: "Negative-number rules are clicking. Watch order of operations." },
      { name: "Homework week 18",       category: "Homework", date: "Feb 02, 2024", score: 10, total: 10,  status: "graded",
        comment: "Showed work all the way through. Nice." },
    ] },
  { id: "eng8", name: "English 8", teacher: "Mr. Foster", room: "C107", period: "2",
    grade: "A−", percentage: 91, trend: 0, credits: 1.0, accent: "lavender",
    categories: [
      { name: "Essays",   weight: 40, average: 90 },
      { name: "Reading",  weight: 30, average: 92 },
      { name: "Vocab",    weight: 20, average: 91 },
      { name: "Journal",  weight: 10, average: 93 },
    ],
    assignments: [
      { name: "The Giver — final essay", category: "Essays", date: "May 22, 2024", score: 92, total: 100, status: "graded",
        comment: "Your ending paragraph reframed the whole essay. Beautifully done." },
      { name: "Reading log: Q3",         category: "Reading",date: "Mar 12, 2024", score: 27, total: 30,  status: "graded",
        comment: "Strong reading volume. Try a non-fiction next quarter." },
      { name: "Vocab unit 6",            category: "Vocab",  date: "Jan 28, 2024", score: 18, total: 20,  status: "graded",
        comment: "Solid. \"Reticent\" is one to remember." },
    ] },
  { id: "esci", name: "Earth Science", teacher: "Dr. Mendez", room: "S108", period: "3",
    grade: "A−", percentage: 91, trend: 0, credits: 1.0, accent: "mint",
    categories: [
      { name: "Labs",    weight: 35, average: 92 },
      { name: "Tests",   weight: 35, average: 90 },
      { name: "Quizzes", weight: 30, average: 91 },
    ],
    assignments: [
      { name: "Plate tectonics model",  category: "Labs",   date: "Apr 30, 2024", score: 46, total: 50, status: "graded",
        comment: "Your annotation of fault zones was excellent." },
      { name: "Unit test: Weather",      category: "Tests",  date: "Mar 08, 2024", score: 88, total: 100, status: "graded",
        comment: "Pressure systems are still a bit fuzzy — look at the front diagrams again." },
      { name: "Rocks &amp; minerals quiz", category: "Quizzes",date: "Jan 17, 2024", score: 19, total: 20, status: "graded",
        comment: "Almost perfect. Watch the metamorphic vs. igneous distinction." },
    ] },
  { id: "ushist", name: "US History", teacher: "Mr. Schroeder", room: "C205", period: "4",
    grade: "B+", percentage: 88, trend: 0, credits: 1.0, accent: "yellow",
    categories: [
      { name: "Tests",     weight: 35, average: 87 },
      { name: "Essays",    weight: 35, average: 88 },
      { name: "Documents", weight: 30, average: 89 },
    ],
    assignments: [
      { name: "Civil War DBQ",      category: "Documents", date: "May 06, 2024", score: 22, total: 25, status: "graded",
        comment: "Strong use of Lincoln's letters. Connect causes to consequences more explicitly." },
      { name: "Constitution test",  category: "Tests",     date: "Dec 14, 2023", score: 86, total: 100, status: "graded",
        comment: "Bill of Rights section was perfect. Federalist vs. Anti-Federalist still a little blurry." },
      { name: "Colonial era essay", category: "Essays",    date: "Oct 25, 2023", score: 88, total: 100, status: "graded",
        comment: "Clear thesis. Your transitions need work — vary them." },
    ] },
  { id: "spn1", name: "Spanish I", teacher: "Sra. Garcia", room: "L107", period: "5",
    grade: "A−", percentage: 91, trend: 0, credits: 1.0, accent: "coral",
    categories: [
      { name: "Vocab",     weight: 30, average: 92 },
      { name: "Grammar",   weight: 30, average: 90 },
      { name: "Speaking",  weight: 25, average: 88 },
      { name: "Listening", weight: 15, average: 94 },
    ],
    assignments: [
      { name: "Final speaking test",  category: "Speaking", date: "May 30, 2024", score: 17, total: 20,  status: "graded",
        comment: "Buen trabajo. Your accent is coming along — keep practicing the rolled R." },
      { name: "Vocab final",           category: "Vocab",    date: "May 16, 2024", score: 93, total: 100, status: "graded",
        comment: "Mastered the household and food units. Strong vocab base." },
      { name: "Grammar quiz: Ser/Estar",category: "Grammar", date: "Mar 04, 2024", score: 18, total: 20,  status: "graded",
        comment: "Permanent vs. temporary — you've got it." },
    ] },
  { id: "studio", name: "Studio Art", teacher: "Ms. Bell", room: "A104", period: "6",
    grade: "A", percentage: 96, trend: 0, credits: 0.5, accent: "rose",
    categories: [
      { name: "Projects",   weight: 70, average: 96 },
      { name: "Sketchbook", weight: 20, average: 95 },
      { name: "Critiques",  weight: 10, average: 97 },
    ],
    assignments: [
      { name: "Self-portrait collage", category: "Projects",  date: "May 24, 2024", score: 96, total: 100, status: "graded",
        comment: "Bold choices with texture. The grade reflects how brave the piece was." },
      { name: "Sketchbook check #6",   category: "Sketchbook",date: "Mar 22, 2024", score: 24, total: 25,  status: "graded",
        comment: "Daily practice is showing — line confidence is up." },
      { name: "Critique: peer gallery walk", category: "Critiques", date: "Feb 09, 2024", score: 19, total: 20, status: "graded",
        comment: "You gave Mia feedback she actually used in her revision. That's the goal." },
    ] },
];

const MP_CLASSES_Y7 = [
  { id: "math7", name: "Math 7", teacher: "Mr. Han", room: "M115", period: "1",
    grade: "B+", percentage: 87, trend: 0, credits: 1.0, accent: "sky",
    categories: [
      { name: "Tests",    weight: 45, average: 86 },
      { name: "Homework", weight: 30, average: 90 },
      { name: "Quizzes",  weight: 25, average: 86 },
    ],
    assignments: [
      { name: "Year-end test",          category: "Tests",    date: "Jun 02, 2023", score: 85, total: 100, status: "graded",
        comment: "Fractions and decimals locked in. Ready for pre-algebra." },
      { name: "Fractions quiz",          category: "Quizzes",  date: "Mar 15, 2023", score: 17, total: 20,  status: "graded",
        comment: "Good work. Common denominators on the last one tripped you up." },
      { name: "Homework week 22",        category: "Homework", date: "Feb 24, 2023", score: 10, total: 10,  status: "graded",
        comment: "Neat and complete." },
    ] },
  { id: "eng7", name: "English 7", teacher: "Ms. Park", room: "C106", period: "2",
    grade: "B+", percentage: 88, trend: 0, credits: 1.0, accent: "lavender",
    categories: [
      { name: "Essays",  weight: 40, average: 87 },
      { name: "Reading", weight: 30, average: 90 },
      { name: "Vocab",   weight: 30, average: 87 },
    ],
    assignments: [
      { name: "Persuasive essay",        category: "Essays", date: "May 18, 2023", score: 86, total: 100, status: "graded",
        comment: "Strong opinion. Back it up with one more piece of evidence next time." },
      { name: "Book report: Hatchet",     category: "Reading",date: "Mar 02, 2023", score: 27, total: 30,  status: "graded",
        comment: "Nice plot summary. Add your own reaction — what would YOU do?" },
      { name: "Vocab unit 4",             category: "Vocab",  date: "Jan 13, 2023", score: 17, total: 20,  status: "graded",
        comment: "Strong vocab session. Look up \"begrudging\" again." },
    ] },
  { id: "lsci", name: "Life Science", teacher: "Ms. Olivera", room: "S106", period: "3",
    grade: "A−", percentage: 91, trend: 0, credits: 1.0, accent: "mint",
    categories: [
      { name: "Labs",    weight: 35, average: 93 },
      { name: "Tests",   weight: 35, average: 89 },
      { name: "Quizzes", weight: 30, average: 91 },
    ],
    assignments: [
      { name: "Ecosystems poster",  category: "Labs",   date: "May 11, 2023", score: 47, total: 50, status: "graded",
        comment: "Beautiful food-web diagram. You explained energy flow clearly." },
      { name: "Cell biology test",   category: "Tests",  date: "Feb 17, 2023", score: 88, total: 100, status: "graded",
        comment: "Organelles down. Mitochondria + chloroplast distinction was perfect." },
      { name: "Plant quiz",          category: "Quizzes",date: "Jan 27, 2023", score: 18, total: 20, status: "graded",
        comment: "Solid. Watch xylem vs. phloem direction." },
    ] },
  { id: "anciv", name: "Ancient Civilizations", teacher: "Mr. Yates", room: "C203", period: "4",
    grade: "B", percentage: 84, trend: 0, credits: 1.0, accent: "yellow",
    categories: [
      { name: "Tests",     weight: 40, average: 83 },
      { name: "Projects",  weight: 35, average: 86 },
      { name: "Discussion",weight: 25, average: 84 },
    ],
    assignments: [
      { name: "Greece &amp; Rome project", category: "Projects",   date: "May 04, 2023", score: 87, total: 100, status: "graded",
        comment: "Nice timeline. Cite your sources next time — you found great info." },
      { name: "Mesopotamia test",          category: "Tests",      date: "Feb 03, 2023", score: 82, total: 100, status: "graded",
        comment: "Good recall. The Code of Hammurabi short-answer needed more depth." },
      { name: "Egypt discussion",          category: "Discussion", date: "Dec 09, 2022", score: 17, total: 20,  status: "graded",
        comment: "You asked a great question about pyramid labor. That kind of curiosity is the goal." },
    ] },
  { id: "spnintro", name: "Spanish Intro", teacher: "Sra. Lopez", room: "L106", period: "5",
    grade: "A−", percentage: 91, trend: 0, credits: 0.5, accent: "coral",
    categories: [
      { name: "Vocab",    weight: 40, average: 92 },
      { name: "Speaking", weight: 35, average: 89 },
      { name: "Writing",  weight: 25, average: 91 },
    ],
    assignments: [
      { name: "Year-end conversation", category: "Speaking", date: "May 26, 2023", score: 18, total: 20, status: "graded",
        comment: "Conversation flowed well. Confidence is up from the start of the year." },
      { name: "Vocab: colors &amp; numbers", category: "Vocab", date: "Mar 10, 2023", score: 19, total: 20, status: "graded",
        comment: "Almost perfect — keep at it." },
      { name: "Composición: mi casa",   category: "Writing",  date: "Feb 17, 2023", score: 92, total: 100, status: "graded",
        comment: "Nice sentence variety for a first composition." },
    ] },
  { id: "artfound", name: "Art Foundations", teacher: "Ms. Bell", room: "A104", period: "6",
    grade: "A", percentage: 95, trend: 0, credits: 0.5, accent: "rose",
    categories: [
      { name: "Projects",   weight: 60, average: 96 },
      { name: "Sketchbook", weight: 30, average: 93 },
      { name: "Critiques",  weight: 10, average: 95 },
    ],
    assignments: [
      { name: "Color wheel mural",  category: "Projects",  date: "May 19, 2023", score: 96, total: 100, status: "graded",
        comment: "You picked an unusual color pairing and made it work. Brave choice." },
      { name: "Sketchbook check #5",category: "Sketchbook",date: "Mar 06, 2023", score: 23, total: 25,  status: "graded",
        comment: "Consistent practice. Try outside the box — leaves, hands, faces." },
      { name: "Critique: still life", category: "Critiques",date: "Feb 03, 2023", score: 19, total: 20, status: "graded",
        comment: "Your feedback for Diego was specific and kind. Model student behavior." },
    ] },
];

// Canonical per-year academic record. Current year first, then prior years
// in reverse chronological order. The Grades tab year selector reads from this.
const MP_YEARS = [
  { id: "y10", year: "2025–2026", gradeLevel: "10th Grade", isCurrent: true,
    gpa: 3.74, gpaTrend: 0.06, classes: MP_CLASSES /* current data */ },
  { id: "y9",  year: "2024–2025", gradeLevel: "9th Grade",
    gpa: 3.62, finalIssued: "Jun 14, 2025", classes: MP_CLASSES_Y9 },
  { id: "y8",  year: "2023–2024", gradeLevel: "8th Grade",
    gpa: 3.55, finalIssued: "Jun 12, 2024", classes: MP_CLASSES_Y8 },
  { id: "y7",  year: "2022–2023", gradeLevel: "7th Grade",
    gpa: 3.48, finalIssued: "Jun 16, 2023", classes: MP_CLASSES_Y7 },
];

const MP_READING_LOG = [
  { id: 9, title: "Project Hail Mary",   author: "Andy Weir",      date: "May 18", rating: 5 },
  { id: 8, title: "Pachinko",            author: "Min Jin Lee",    date: "May 02", rating: 5 },
  { id: 7, title: "Educated",            author: "Tara Westover",  date: "Apr 19", rating: 4 },
  { id: 6, title: "The Poppy War",       author: "R. F. Kuang",    date: "Apr 04", rating: 4 },
  { id: 5, title: "Klara and the Sun",   author: "Kazuo Ishiguro", date: "Mar 21", rating: 5 },
];

const MP_PROGRESS_REPORT = {
  period: "Quarter 3, Mid-Term Interim", date: "May 8, 2026",
  classes: [
    { name: "Algebra II",         teacher: "Ms. Patel",   standing: "A−", trend: "improving", concern: false, comment: "Jordan's command of quadratic functions is excellent. The next stretch — modeling problems from word context — is where I'd love to see another gear." },
    { name: "English Literature", teacher: "Mr. Chen",    standing: "B+", trend: "improving", concern: false, comment: "Discussion contributions have been some of the best in the class. The essay revisions are catching up — keep submitting drafts a few days early." },
    { name: "Chemistry",          teacher: "Dr. Ahmed",   standing: "A",  trend: null,        concern: false, comment: "Lab write-ups are college-level. Jordan asks the kind of follow-up questions that move the whole class forward." },
    { name: "World History",      teacher: "Ms. Lee",     standing: "A−", trend: null,        concern: false, comment: "Strong document analysis. The Versailles DBQ was a standout this quarter." },
    { name: "Spanish III",        teacher: "Sr. Ortega",  standing: "B−", trend: "concern",   concern: true,  comment: "Listening and speaking are the growing edges. I'd recommend 10 minutes of Spanish-language podcast time three days a week — small, daily reps." },
    { name: "Visual Arts",        teacher: "Ms. Hartley", standing: "A",  trend: "improving", concern: false, comment: "The self-portrait is the strongest piece in the class. Push into longer studies next quarter — you're ready for them." },
  ],
  history: [
    { id: "q2", label: "Quarter 2 Interim", date: "Feb 6, 2026" },
    { id: "q1", label: "Quarter 1 Interim", date: "Oct 24, 2025" },
  ],
};

const MP_BENCHMARKS = {
  subjects: [
    { name: "Reading", metric: "RIT Scale Score",
      results: [
        { window: "Fall '25",   score: 222, level: "Above" },
        { window: "Winter '26", score: 228, level: "Above" },
        { window: "Spring '26", score: 234, level: "Above" },
      ] },
    { name: "Math", metric: "RIT Scale Score",
      results: [
        { window: "Fall '25",   score: 218, level: "Proficient" },
        { window: "Winter '26", score: 221, level: "Proficient" },
        { window: "Spring '26", score: 226, level: "Proficient" },
      ] },
  ],
};

const MP_STATE_RESULTS = [
  { year: "2025–2026", grade: "10th Grade", ela: { score: 2645, level: 4, levelLabel: "Exceeded" }, math: { score: 2598, level: 3, levelLabel: "Met" } },
  { year: "2024–2025", grade: "9th Grade",  ela: { score: 2612, level: 3, levelLabel: "Met"      }, math: { score: 2570, level: 3, levelLabel: "Met" } },
  { year: "2023–2024", grade: "8th Grade",  ela: { score: 2570, level: 3, levelLabel: "Met"      }, math: { score: 2540, level: 2, levelLabel: "Nearly Met" } },
];

const MP_CREDENTIALS = {
  totalEarned: 16, totalRequired: 24,
  requirements: [
    { name: "English",         earned: 3, required: 4, courses: ["English 9", "English 10", "English Lit (in progress)"] },
    { name: "Mathematics",     earned: 3, required: 4, courses: ["Algebra I", "Geometry", "Algebra II (in progress)"] },
    { name: "Science",         earned: 2, required: 3, courses: ["Biology", "Chemistry (in progress)"] },
    { name: "Social Studies",  earned: 2, required: 3, courses: ["World History (in progress)", "US History"] },
    { name: "World Language",  earned: 2, required: 2, courses: ["Spanish I", "Spanish II"] },
    { name: "Arts",            earned: 1, required: 1, courses: ["Visual Arts"] },
    { name: "PE / Health",     earned: 2, required: 2, courses: ["PE 9", "Health"] },
    { name: "Electives",       earned: 1, required: 5, courses: ["Intro to CS"] },
  ],
  other: [
    { name: "Service hours",      current: 28, target: 40, kind: "progress", unit: "hrs" },
    { name: "Senior project",     status: "Scheduled Fall '26", kind: "status" },
    { name: "Civics requirement", status: "Not started",        kind: "status" },
  ],
};

// Per-day events with which classes they affected. A "sick day" hits every
// class; a bus delay only hits the morning class. The "All classes" heatmap
// aggregates (an absence in any class shows as absent for that day); a
// per-class heatmap only shows events that touched that specific class.
const ALL_CLASS_IDS = ["alg", "eng", "chm", "hst", "spn", "art"];
const MP_ATT_EVENTS = [
  { week: 3,  day: 1, severity: "t", classes: ["alg"],                      note: "Bus delay — late to Period 1" },
  { week: 14, day: 0, severity: "t", classes: ["alg"],                      note: "Bus delay — late to Period 1" },
  { week: 26, day: 2, severity: "t", classes: ["eng", "chm"],               note: "Appointment ran long" },
  { week: 7,  day: 3, severity: "a", classes: ALL_CLASS_IDS,                note: "Family event" },
  { week: 22, day: 4, severity: "a", classes: ALL_CLASS_IDS,                note: "Sick day" },
  { week: 28, day: 1, severity: "a", classes: ALL_CLASS_IDS,                note: "Orthodontist" },
];

function buildClassHeatmap(classId) {
  const g = [];
  for (let w = 0; w < 36; w++) g.push(["p","p","p","p","p"]);
  // Breaks
  for (let d = 0; d < 5; d++) { g[16][d] = "b"; g[17][d] = "b"; }
  for (let d = 0; d < 5; d++) { g[19][d] = "b"; g[20][d] = "b"; }
  for (let d = 0; d < 5; d++) { g[30][d] = "b"; }
  // Future
  g[32][3] = "f"; g[32][4] = "f";
  for (let w = 33; w < 36; w++) g[w] = ["f","f","f","f","f"];
  // Events — only apply if "all" or this class was affected.
  MP_ATT_EVENTS.forEach(({ week, day, severity, classes }) => {
    const touched = classId === "all" || classes.includes(classId);
    if (!touched) return;
    const cur = g[week][day];
    if (cur === "b" || cur === "f") return;
    // Absent outranks tardy in the aggregate
    if (cur === "p" || (cur === "t" && severity === "a")) g[week][day] = severity;
  });
  return g;
}

// Tally school-day attendance for the picked class (skipping break/future cells).
function tallyHeatmap(grid) {
  let p = 0, t = 0, a = 0;
  grid.forEach(week => week.forEach(s => {
    if (s === "p") p++;
    else if (s === "t") t++;
    else if (s === "a") a++;
  }));
  return { present: p, tardy: t, absent: a, total: p + t + a, rate: p + t + a === 0 ? 0 : (p / (p + t + a)) * 100 };
}

const MP_ATT = {
  todayDate: "Wednesday, May 27",
  todayPeriods: [
    { period: 1, class: "Algebra II" }, { period: 2, class: "English Lit" },
    { period: 3, class: "Chemistry" },  { period: 4, class: "World Hist." },
    { period: 5, class: "Spanish III" },{ period: 6, class: "Visual Arts" },
  ],
  week:  { present: 13,  tardy: 0, absent: 0, rate: 100.0 },
  month: { present: 56,  tardy: 1, absent: 1, rate: 96.6 },
  ytd:   { present: 142, tardy: 5, absent: 4, rate: 91.6 },
  streak: { current: 12, best: 47, bestStart: "Aug 12", bestEnd: "Oct 17, 2025" },
  heatmapAll: buildClassHeatmap("all"),
  recent: [
    { date: "Apr 14, 2026", day: "Tue", type: "absent", note: "Excused — orthodontist appointment" },
    { date: "Feb 26, 2026", day: "Thu", type: "absent", note: "Excused — sick day, doctor's note on file" },
    { date: "Mar 19, 2026", day: "Thu", type: "tardy",  note: "Bus delay — 8 minutes late to Period 1" },
    { date: "Nov 12, 2025", day: "Wed", type: "tardy",  note: "Tardy to Period 1 — appointment ran long" },
    { date: "Oct 22, 2025", day: "Wed", type: "absent", note: "Excused — family event" },
  ],
};

const MP_MILESTONES = [
  { label: "10 days strong",    date: "Sep 26, 2025", unlocked: true  },
  { label: "30 days strong",    date: "Oct 31, 2025", unlocked: true  },
  { label: "60 days strong",    date: "Jan 30, 2026", unlocked: true  },
  { label: "Semester perfect",  date: "Pending Q4",   unlocked: false },
  { label: "100 days strong",   date: "Coming up",    unlocked: false },
  { label: "Full year perfect", date: "Jun 12, 2026", unlocked: false },
];

const MP_REPORT_CARDS = [
  { id: "q3", period: "Quarter 3", issued: "May 22, 2026", gpa: 3.74,
    classes: [
      { course: "Algebra II",         teacher: "Ms. Patel",   grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Quadratic functions mastered. Pushing into modeling next." },
      { course: "English Literature", teacher: "Mr. Chen",    grade: "B+", conduct: "Excellent", effort: "Strong",       comment: "Discussion-leader energy. Drafts coming in earlier each week." },
      { course: "Chemistry",          teacher: "Dr. Ahmed",   grade: "A",  conduct: "Excellent", effort: "Strong",       comment: "Lab work is at college level. Asks the right questions." },
      { course: "World History",      teacher: "Ms. Lee",     grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Strong document analysis. Versailles DBQ stood out." },
      { course: "Spanish III",        teacher: "Sr. Ortega",  grade: "B−", conduct: "Good",      effort: "Satisfactory", comment: "Listening and speaking are the growing edges. Daily exposure recommended." },
      { course: "Visual Arts",        teacher: "Ms. Hartley", grade: "A",  conduct: "Excellent", effort: "Strong",       comment: "Self-portrait was the strongest piece in the class." },
    ] },
  { id: "q2", period: "Quarter 2", issued: "Feb 20, 2026", gpa: 3.68,
    classes: [
      { course: "Algebra II",         teacher: "Ms. Patel",   grade: "B+", conduct: "Excellent", effort: "Strong",       comment: "Solid quarter; pushing into harder material." },
      { course: "English Literature", teacher: "Mr. Chen",    grade: "B",  conduct: "Excellent", effort: "Satisfactory", comment: "Essay revision cadence improving." },
      { course: "Chemistry",          teacher: "Dr. Ahmed",   grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Steady lab notebook practice." },
      { course: "World History",      teacher: "Ms. Lee",     grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Engaged in class debates." },
      { course: "Spanish III",        teacher: "Sr. Ortega",  grade: "C+", conduct: "Good",      effort: "Satisfactory", comment: "Build daily listening reps." },
      { course: "Visual Arts",        teacher: "Ms. Hartley", grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Strong observational drawing." },
    ] },
  { id: "q1", period: "Quarter 1", issued: "Nov 7, 2025", gpa: 3.61,
    classes: [
      { course: "Algebra II",         teacher: "Ms. Patel",   grade: "B+", conduct: "Excellent", effort: "Strong",       comment: "Welcome quarter — strong foundation." },
      { course: "English Literature", teacher: "Mr. Chen",    grade: "B",  conduct: "Excellent", effort: "Satisfactory", comment: "Building discussion presence." },
      { course: "Chemistry",          teacher: "Dr. Ahmed",   grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Strong lab start." },
      { course: "World History",      teacher: "Ms. Lee",     grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Confident essay voice." },
      { course: "Spanish III",        teacher: "Sr. Ortega",  grade: "B−", conduct: "Good",      effort: "Satisfactory", comment: "Vocabulary acquisition steady." },
      { course: "Visual Arts",        teacher: "Ms. Hartley", grade: "A−", conduct: "Excellent", effort: "Strong",       comment: "Welcome to the studio." },
    ] },
];

// Final report cards from prior school years — students can open these but
// they don't replace the current view. Each card lists final grades for the
// year and final GPA.
const MP_PRIOR_YEARS = [
  { id: "y9", year: "2024–2025", grade: "9th Grade", finalGPA: 3.62, issued: "Jun 14, 2025",
    summary: [
      { course: "Algebra I",          grade: "A−" },
      { course: "English 9",          grade: "B+" },
      { course: "Biology",            grade: "A"  },
      { course: "World Geography",    grade: "A−" },
      { course: "Spanish II",         grade: "B+" },
      { course: "Intro to Visual Arts", grade: "A" },
    ] },
  { id: "y8", year: "2023–2024", grade: "8th Grade", finalGPA: 3.55, issued: "Jun 12, 2024",
    summary: [
      { course: "Pre-Algebra",        grade: "B+" },
      { course: "English 8",          grade: "A−" },
      { course: "Earth Science",      grade: "A−" },
      { course: "US History",         grade: "B+" },
      { course: "Spanish I",          grade: "A−" },
      { course: "Studio Art",         grade: "A"  },
    ] },
  { id: "y7", year: "2022–2023", grade: "7th Grade", finalGPA: 3.48, issued: "Jun 16, 2023",
    summary: [
      { course: "Math 7",             grade: "B+" },
      { course: "English 7",          grade: "B+" },
      { course: "Life Science",       grade: "A−" },
      { course: "Ancient Civ.",       grade: "B"  },
      { course: "Spanish Intro",      grade: "A−" },
      { course: "Art Foundations",    grade: "A"  },
    ] },
];

/* ============================================================ */
/* Primitives                                                   */
/* ============================================================ */

function MPCard({ children, style, padding = 28, radius = 24, ...rest }) {
  return (
    <div style={{ background: MP_C.bgCard, borderRadius: radius, padding, boxShadow: MP_C.shadow, ...style }} {...rest}>
      {children}
    </div>
  );
}

function MPEyebrow({ children, color, style }) {
  return (
    <div style={{
      fontSize: 11, fontWeight: 500,
      letterSpacing: 0.4, textTransform: "uppercase",
      color: color || MP_C.textMuted,
      marginBottom: 10, ...style,
    }}>{children}</div>
  );
}

function MPPill({ children, palette = "gray", icon, style }) {
  const p = mpPal(palette);
  const Icn = icon ? I[icon] : null;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      fontSize: 11.5, fontWeight: 600,
      color: p.fg, background: p.bg,
      padding: "5px 11px", borderRadius: 999,
      ...style,
    }}>
      {Icn ? <Icn size={11} strokeWidth={2.2} color={p.fg}/> : null}
      {children}
    </span>
  );
}

function MPTrend({ value, style }) {
  let iconName = "Minus", palette = "gray";
  if (value > 0) { iconName = "TrendingUp"; palette = "mint"; }
  else if (value < 0) { iconName = "TrendingDown"; palette = "rose"; }
  const text = value > 0 ? `+${value}` : value < 0 ? `${value}` : "0";
  return <MPPill palette={palette} icon={iconName} style={style}>{text}</MPPill>;
}

function MPStat({ icon, value, label, palette = "gray" }) {
  const p = mpPal(palette);
  const Icn = icon ? I[icon] : null;
  return (
    <div style={{
      background: p.bg, borderRadius: 18, padding: 18,
      display: "flex", flexDirection: "column", gap: 6,
    }}>
      {Icn ? <Icn size={18} color={p.fg} strokeWidth={2}/> : null}
      <div className="mp-num" style={{ fontSize: 32, fontWeight: 700, color: p.fg, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 500, color: p.fg, opacity: 0.85, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</div>
    </div>
  );
}

function MPProgressBar({ pct, palette = "mint", height = 8, style }) {
  const p = mpPal(palette);
  return (
    <div style={{ height, background: MP_C.bgInset, borderRadius: 999, overflow: "hidden", ...style }}>
      <div className="mp-bar-fill" style={{ width: `${Math.min(100, Math.max(0, pct))}%`, height: "100%", background: p.surface }}/>
    </div>
  );
}

// Filled star (lucide shim doesn't support fill)
function MPStarIcon({ size = 16, filled = false, color = MP_C.yellowDeep, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}
         fill={filled ? color : "none"} stroke={color} strokeWidth={1.6}
         strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

/* -------- BadgeMedallion — pastel version -------- */

const MP_CARDINAL_STAR = "M0,-2.5 L0.7,-0.7 L2.5,0 L0.7,0.7 L0,2.5 L-0.7,0.7 L-2.5,0 L-0.7,-0.7 Z";

function MPBadgeMedallion({ icon, palette = "yellow", size = 64, locked = false, mystery = false }) {
  const pal = mpPal(palette);
  const fg = locked ? MP_C.textMuted : pal.fg;
  const bg = locked ? MP_C.bgInset   : pal.bg;
  const ringFg = locked ? MP_C.textMuted : pal.surface;
  const op = locked ? 0.55 : 1;
  const Icn = I[icon];
  const dots = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(a) * 47, y = 50 + Math.sin(a) * 47;
    const r = i % 3 === 0 ? 1.8 : 1.1;
    dots.push(<circle key={`d${i}`} cx={x} cy={y} r={r} fill={ringFg} opacity={op}/>);
  }
  const stars = [];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(a) * 38, y = 50 + Math.sin(a) * 38;
    stars.push(<g key={`s${i}`} transform={`translate(${x}, ${y})`}><path d={MP_CARDINAL_STAR} fill={ringFg} opacity={op * 0.9}/></g>);
  }
  const iconSize = size * 0.4;
  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {dots}
        <circle cx={50} cy={50} r={42} fill="none" stroke={ringFg} strokeWidth={0.8} opacity={op * 0.7}/>
        {stars}
        <circle cx={50} cy={50} r={33} fill={bg}/>
        <circle cx={50} cy={50} r={33} fill="none" stroke={ringFg} strokeWidth={1.2} opacity={op}/>
        <circle cx={50} cy={50} r={29} fill="none" stroke={ringFg} strokeWidth={0.5} opacity={op * 0.55}/>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: fg, opacity: op }}>
        {mystery
          ? <span style={{ fontSize: size * 0.42, fontWeight: 700, color: fg }}>?</span>
          : <Icn size={iconSize} strokeWidth={2} color={fg}/>}
      </div>
    </div>
  );
}

/* -------- Inline charts -------- */

function MPAreaChart({ data, palette = "coral" }) {
  const pal = mpPal(palette);
  // Auto-tighten yDomain so a 0.12 spread doesn't render as a flat line in a
  // 0.7-tall chart. 35% padding above/below the actual data range.
  const vals = data.map(d => d.gpa);
  const dataMin = Math.min(...vals), dataMax = Math.max(...vals);
  const pad = Math.max(0.06, (dataMax - dataMin) * 0.35);
  const lo = Math.max(0, dataMin - pad), hi = dataMax + pad;
  // ViewBox + wrapper share the same aspect ratio so no `preserveAspectRatio`
  // stretching is needed — dots stay round at any container width.
  const width = 760, height = 200;
  const padL = 44, padR = 16, padT = 16, padB = 26;
  const w = width - padL - padR, h = height - padT - padB;
  const xs = data.map((_, i) => padL + (i / (data.length - 1)) * w);
  const yMap = (v) => padT + h - ((v - lo) / (hi - lo)) * h;
  const ys = data.map(d => yMap(d.gpa));
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${ys[i]}`).join(" ");
  const areaPath = `${linePath} L ${xs[xs.length - 1]} ${padT + h} L ${xs[0]} ${padT + h} Z`;
  const yTicks = [lo, (lo + hi) / 2, hi];
  return (
    <div style={{ width: "100%", aspectRatio: `${width} / ${height}` }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "100%", display: "block" }}>
        <defs>
          <linearGradient id="mp-areaG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={pal.surface} stopOpacity={0.55}/>
            <stop offset="100%" stopColor={pal.surface} stopOpacity={0}/>
          </linearGradient>
        </defs>
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={padL} y1={yMap(t)} x2={width - padR} y2={yMap(t)} stroke={MP_C.bgInset} strokeWidth={1}/>
            <text x={padL - 8} y={yMap(t) + 4} textAnchor="end" fontSize={12} fill={MP_C.textMuted}>{t.toFixed(2)}</text>
          </g>
        ))}
        {data.map((d, i) => (
          <text key={d.week} x={xs[i]} y={height - 8} textAnchor="middle" fontSize={12} fill={MP_C.textMuted}>{d.week}</text>
        ))}
        <path d={areaPath} fill="url(#mp-areaG)"/>
        <path d={linePath} fill="none" stroke={pal.fg} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
        {data.map((d, i) => (
          <g key={d.week}>
            <circle cx={xs[i]} cy={ys[i]} r={6} fill={MP_C.bgCard}/>
            <circle cx={xs[i]} cy={ys[i]} r={4.5} fill={pal.fg}><title>{`${d.week}: ${d.gpa.toFixed(2)}`}</title></circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

function MPLineChart({ data, valueKey = "score", labelKey = "window", palette = "sky" }) {
  const pal = mpPal(palette);
  const width = 600, height = 240;
  const padL = 48, padR = 16, padT = 20, padB = 30;
  const w = width - padL - padR, h = height - padT - padB;
  const vals = data.map(d => d[valueKey]);
  const lo = Math.min(...vals) - 5, hi = Math.max(...vals) + 5;
  const xs = data.map((_, i) => padL + (i / Math.max(1, data.length - 1)) * w);
  const yMap = (v) => padT + h - ((v - lo) / (hi - lo)) * h;
  const ys = vals.map(yMap);
  const linePath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${xs[i]} ${ys[i]}`).join(" ");
  const yTicks = [lo, (lo + hi) / 2, hi];
  return (
    <div style={{ width: "100%", aspectRatio: `${width} / ${height}` }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "100%", display: "block" }}>
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={padL} y1={yMap(t)} x2={width - padR} y2={yMap(t)} stroke={MP_C.bgInset} strokeWidth={1}/>
            <text x={padL - 8} y={yMap(t) + 4} textAnchor="end" fontSize={12} fill={MP_C.textMuted}>{Math.round(t)}</text>
          </g>
        ))}
        {data.map((d, i) => (
          <text key={d[labelKey]} x={xs[i]} y={height - 8} textAnchor="middle" fontSize={12} fill={MP_C.textMuted}>{d[labelKey]}</text>
        ))}
        <path d={linePath} fill="none" stroke={pal.fg} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
        {data.map((d, i) => (
          <g key={d[labelKey]}>
            <circle cx={xs[i]} cy={ys[i]} r={7} fill={MP_C.bgCard}/>
            <circle cx={xs[i]} cy={ys[i]} r={5.5} fill={pal.fg}><title>{`${d[labelKey]}: ${d[valueKey]}`}</title></circle>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ============================================================ */
/* Welcome banner — flat illustration + greeting                */
/* ============================================================ */

const TAB_INTROS = {
  badges:      { eyebrow: "Recognition",         sub: "Your badges, quests and goals — what you've earned and what's next." },
  grades:      { eyebrow: "Right now",           sub: `${MP_STUDENT.period} · cumulative GPA ${MP_STUDENT.gpa.toFixed(2)} and a class-by-class breakdown.` },
  progress:    { eyebrow: "Mid-term check-in",   sub: `${MP_PROGRESS_REPORT.period} · what your teachers want you to know.` },
  assessments: { eyebrow: "How you're measured", sub: "District benchmarks, state assessments, and credit progress toward graduation." },
  attendance:  { eyebrow: "Showing up",          sub: `${MP_ATT.streak.current} days strong · ${MP_ATT.ytd.rate.toFixed(1)}% attendance year-to-date.` },
  reportcard:  { eyebrow: "On the record",       sub: "Your official report cards by quarter." },
};

function MPWelcomeBanner({ tab }) {
  const intro = TAB_INTROS[tab] || TAB_INTROS.badges;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${MP_C.coralBg} 0%, ${MP_C.lavenderBg} 60%, ${MP_C.skyBg} 100%)`,
      borderRadius: 24,
      padding: "36px 40px",
      marginBottom: 36,
      boxShadow: MP_C.shadow,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: MP_C.lavenderDeep, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>
        {intro.eyebrow}
      </div>
      <h1 style={{
        fontSize: 36, fontWeight: 700, color: MP_C.text,
        margin: 0, lineHeight: 1.1, letterSpacing: -0.3,
        fontFamily: FRED,
      }}>
        Hi, {MP_STUDENT.name}.
      </h1>
      <div style={{ fontSize: 15, color: MP_C.textLight, lineHeight: 1.5, marginTop: 8, maxWidth: 720 }}>
        {intro.sub}
      </div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
        <span style={{ background: "rgba(255,255,255,0.7)", padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: MP_C.text }}>
          {MP_STUDENT.year}
        </span>
        <span style={{ background: "rgba(255,255,255,0.7)", padding: "7px 14px", borderRadius: 999, fontSize: 12, fontWeight: 600, color: MP_C.text }}>
          {MP_STUDENT.grade} · {MP_STUDENT.school}
        </span>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Modal shell                                                  */
/* ============================================================ */

function MPModalShell({ onClose, children, maxWidth = 720 }) {
  return (
    <div onClick={onClose} className="mp-overlay"
         style={{
           position: "fixed", inset: 0, zIndex: 90,
           background: "rgba(26,26,46,0.45)",
           display: "flex", alignItems: "flex-start", justifyContent: "center",
           padding: "60px 24px", overflowY: "auto",
         }}>
      <div onClick={(e) => e.stopPropagation()}
           style={{
             width: "100%", maxWidth, background: MP_C.bgCard,
             borderRadius: 24, padding: 32,
             boxShadow: "0 30px 80px -20px rgba(26,26,46,0.4)",
           }}>
        {children}
      </div>
    </div>
  );
}

/* ============================================================ */
/* Tab: Badges & Goals                                          */
/* ============================================================ */

function MPScholarLevel() {
  const xpPct = (MP_YEAR.xp / MP_YEAR.nextLevelXP) * 100;
  return (
    <div style={{
      background: `linear-gradient(135deg, ${MP_C.lavender} 0%, ${MP_C.sky} 100%)`,
      borderRadius: 24, padding: 32,
      boxShadow: MP_C.shadow,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 18 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: MP_C.lavenderDeep, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 8 }}>Scholar Level</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <div className="mp-num" style={{ fontSize: 80, fontWeight: 700, color: MP_C.text, lineHeight: 0.9 }}>{MP_YEAR.level}</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: MP_C.lavenderDeep, fontFamily: FRED }}>{MP_YEAR.levelTitle}</div>
          </div>
        </div>
        <div style={{ textAlign: "right", minWidth: 180 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: MP_C.lavenderDeep, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 8 }}>To next level</div>
          <div className="mp-num" style={{ fontSize: 16, fontWeight: 600, color: MP_C.text, marginBottom: 4 }}>
            {MP_YEAR.xp.toLocaleString()} / {MP_YEAR.nextLevelXP.toLocaleString()} XP
          </div>
          <div className="mp-num" style={{ fontSize: 12, fontWeight: 500, color: MP_C.lavenderDeep }}>
            {MP_YEAR.nextLevelXP - MP_YEAR.xp} XP to Level {MP_YEAR.level + 1}
          </div>
        </div>
      </div>

      <div style={{ height: 10, background: "rgba(255,255,255,0.55)", borderRadius: 999, overflow: "hidden", marginBottom: 24 }}>
        <div className="mp-bar-fill" style={{ width: `${xpPct}%`, height: "100%", background: `linear-gradient(90deg, ${MP_C.coral}, ${MP_C.yellow})` }}/>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
        <MPStatChip icon="Award"    value={MP_YEAR.stats.badges}        label="Badges"/>
        <MPStatChip icon="BookOpen" value={MP_YEAR.stats.booksRead}     label="Books"/>
        <MPStatChip icon="Flame"    value={`${MP_YEAR.stats.streakDays}d`} label="Streak"/>
        <MPStatChip icon="Clock"    value={`${MP_YEAR.stats.onTimePct}%`}  label="On time"/>
        <MPStatChip icon="Check"    value={MP_YEAR.stats.goalsCompleted} label="Goals"/>
      </div>
    </div>
  );
}

function MPStatChip({ icon, value, label }) {
  const Icn = I[icon];
  return (
    <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 16, padding: 14, backdropFilter: "blur(6px)" }}>
      <Icn size={16} color={MP_C.lavenderDeep} strokeWidth={2}/>
      <div className="mp-num" style={{ fontSize: 26, fontWeight: 700, color: MP_C.text, lineHeight: 1, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 500, color: MP_C.textLight, marginTop: 2, textTransform: "uppercase", letterSpacing: 0.4 }}>{label}</div>
    </div>
  );
}

function MPMostRecentBadge({ onOpen }) {
  const b = MP_BADGES[0];
  const pal = mpPal(b.palette);
  return (
    <button onClick={() => onOpen(b)} className="mp-card-btn"
            style={{
              background: pal.bg,
              borderRadius: 24, padding: 28,
              boxShadow: MP_C.shadow,
              border: "none",
              display: "flex", flexDirection: "column", gap: 14,
              cursor: "pointer", textAlign: "left", height: "100%", color: MP_C.text,
            }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: pal.fg, letterSpacing: 0.6, textTransform: "uppercase" }}>Most recent</div>
      <MPBadgeMedallion icon={b.icon} palette={b.palette} size={72}/>
      <div>
        <div style={{ fontSize: 22, fontWeight: 700, color: MP_C.text, lineHeight: 1.15, marginBottom: 6, fontFamily: FRED }}>{b.name}</div>
        <div style={{ fontSize: 13, color: MP_C.textLight, lineHeight: 1.5 }}>{b.description}</div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid rgba(26,26,46,0.08)`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: MP_C.textLight, fontWeight: 500 }}>{b.teacher} · {b.date}</div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: pal.fg }}>
          View <I.ArrowUpRight size={13} strokeWidth={2.4} color={pal.fg}/>
        </span>
      </div>
    </button>
  );
}

function MPQuestCard({ quest }) {
  const pal = mpPal(quest.palette);
  const urgent = quest.daysLeft <= 3;
  const pct = (quest.progress / quest.target) * 100;
  return (
    <div style={{
      background: MP_C.bgCard,
      borderRadius: 22, padding: 24,
      boxShadow: MP_C.shadow,
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ position: "absolute", width: 160, height: 160, top: -50, right: -50, background: pal.bg, borderRadius: "50%", pointerEvents: "none" }}/>
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <MPBadgeMedallion icon={quest.icon} palette={quest.palette} size={52}/>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.4, textTransform: "uppercase",
          background: urgent ? MP_C.coral : pal.surface,
          color: urgent ? MP_C.coralDeep : pal.fg,
          padding: "6px 11px", borderRadius: 999,
        }}>{quest.daysLeft} days left</span>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.2, color: MP_C.text, marginBottom: 6, fontFamily: FRED }}>{quest.title}</div>
        <div style={{ fontSize: 13, color: MP_C.textLight, lineHeight: 1.5, minHeight: 56 }}>{quest.description}</div>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted }}>Progress</span>
          <span className="mp-num" style={{ fontSize: 13, fontWeight: 600, color: MP_C.text }}>{quest.progress} / {quest.target}</span>
        </div>
        <MPProgressBar pct={pct} palette={quest.palette} height={8}/>
      </div>
      <div style={{ position: "relative", fontSize: 12, color: MP_C.textMuted, fontWeight: 500 }}>Issued by {quest.issuedBy}</div>
      <div style={{ position: "relative", marginTop: 4, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted }}>What you'll earn</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: MP_C.bgInset, padding: "12px 14px", borderRadius: 14 }}>
          <I.Award size={18} color={MP_C.text} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }}/>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: MP_C.text }}>{quest.standardReward.name}</div>
            <div style={{ fontSize: 11.5, color: MP_C.textLight, marginTop: 2 }}>{quest.standardReward.detail}</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, background: pal.bg, padding: "12px 14px", borderRadius: 14 }}>
          <I.Sparkles size={18} color={pal.fg} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }}/>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: "uppercase", color: pal.fg, marginBottom: 2 }}>Bonus</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: MP_C.text }}>{quest.bonusReward.name}</div>
            <div style={{ fontSize: 11.5, color: MP_C.textLight, marginTop: 2 }}>{quest.bonusReward.detail}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MPBadgeCard({ badge, onOpen }) {
  const moments = badge.moments?.length || 0;
  const pal = mpPal(badge.palette);
  return (
    <button onClick={() => onOpen(badge)} className="mp-card-btn"
            style={{
              background: MP_C.bgCard,
              borderRadius: 20, padding: 20, textAlign: "left",
              boxShadow: MP_C.shadowSm,
              border: "none",
              display: "flex", flexDirection: "column", gap: 12, cursor: "pointer", color: MP_C.text,
            }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <MPBadgeMedallion icon={badge.icon} palette={badge.palette} size={56}/>
        {moments > 1 ? <span style={{ fontSize: 10.5, fontWeight: 600, color: pal.fg, background: pal.bg, padding: "3px 8px", borderRadius: 999 }}>{moments} moments</span> : null}
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: MP_C.text, lineHeight: 1.2, marginBottom: 4, fontFamily: FRED }}>{badge.name}</div>
        <div style={{ fontSize: 12, color: MP_C.textLight, lineHeight: 1.5, minHeight: 36 }}>{badge.description}</div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <MPPill palette={badge.palette}>{badge.category}</MPPill>
        <span className="mp-num" style={{ fontSize: 11.5, color: MP_C.textMuted, fontWeight: 500 }}>{badge.date}</span>
      </div>
    </button>
  );
}

function MPLockedBadgeCard({ badge }) {
  return (
    <div style={{
      background: MP_C.bgCard,
      borderRadius: 20, padding: 20, opacity: 0.92,
      boxShadow: MP_C.shadowSm,
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <MPBadgeMedallion icon={badge.icon} palette={badge.palette} size={56} locked mystery={badge.mystery}/>
        <I.Lock size={14} color={MP_C.textMuted} strokeWidth={2.2}/>
      </div>
      <div>
        <div style={{ fontSize: 17, fontWeight: 700, color: badge.mystery ? MP_C.textMuted : MP_C.text, lineHeight: 1.2, marginBottom: 4, fontFamily: FRED }}>{badge.name}</div>
        <div style={{ fontSize: 12, color: MP_C.textLight, lineHeight: 1.5, minHeight: 36, fontStyle: badge.mystery ? "italic" : "normal" }}>{badge.criteria}</div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 12, fontSize: 11, fontWeight: 600, color: MP_C.textMuted, letterSpacing: 0.6, textTransform: "uppercase" }}>
        {badge.mystery ? "Hidden" : "How to unlock"}
      </div>
    </div>
  );
}

function MPGoalCard({ goal, onUpdate }) {
  const pct = Math.min(100, (goal.current / goal.target) * 100);
  const ok = pct >= 75;
  const fillPal = ok ? "mint" : "yellow";
  const setByPal = goal.setBy === "Self-set" ? "coral" : "sky";
  const trackPal = goal.tracking === "self" ? "lavender" : "gray";
  const trackIcon = goal.tracking === "auto" ? "BarChart3" : goal.tracking === "self" ? "Pencil" : "Users";
  const trackLabel = goal.tracking === "auto" ? "Pulled automatically" : goal.tracking === "self" ? "You log this" : "Teacher updates this";
  return (
    <div style={{ background: MP_C.bgCard, borderRadius: 22, padding: 24, boxShadow: MP_C.shadowSm }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <MPPill palette={setByPal} icon="Target">{goal.setBy}</MPPill>
            <MPPill palette="gray">{goal.category}</MPPill>
            <MPPill palette={trackPal} icon={trackIcon}>{trackLabel}</MPPill>
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, color: MP_C.text, marginBottom: 6, fontFamily: FRED }}>{goal.title}</div>
          <div style={{ fontSize: 12.5, color: MP_C.textMuted, fontWeight: 500 }}>Source: {goal.source} · Due {goal.due}</div>
        </div>
        <div style={{ textAlign: "right", minWidth: 130 }}>
          <div className="mp-num" style={{ fontSize: 38, fontWeight: 700, color: mpPal(fillPal).fg, lineHeight: 1 }}>{Math.round(pct)}%</div>
          <div className="mp-num" style={{ fontSize: 12, color: MP_C.textMuted, marginTop: 4, fontWeight: 500 }}>{goal.current} / {goal.target} {goal.unit}</div>
        </div>
      </div>
      <div style={{ marginTop: 18 }}><MPProgressBar pct={pct} palette={fillPal} height={10}/></div>
      {goal.tracking === "self" && goal.lastLog ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontSize: 12.5, color: MP_C.textLight }}>
            Last logged: <span style={{ fontWeight: 600, color: MP_C.text }}>{goal.lastLog.title}</span> on {goal.lastLog.date}
          </div>
          <button onClick={() => onUpdate(goal)} className="mp-ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: MP_C.lavenderDeep, background: MP_C.lavenderBg, border: "none", borderRadius: 12, padding: "8px 14px", cursor: "pointer" }}>
            <I.Pencil size={13} strokeWidth={2.2} color={MP_C.lavenderDeep}/> Update progress
          </button>
        </div>
      ) : null}
    </div>
  );
}

function MPBadgesAndGoalsTab({ onOpenBadge, onCreateGoal, onUpdateGoal }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Academic", "Effort", "Citizenship", "Milestone"];
  const visible = filter === "All" ? MP_BADGES : MP_BADGES.filter(b => b.category === filter);
  return (
    <div>
      {/* Welcome banner with mascot — lives inside the landing tab, portfolio-style */}
      <MPWelcomeBanner tab="badges"/>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 40 }}>
        <MPScholarLevel/>
        <MPMostRecentBadge onOpen={onOpenBadge}/>
      </div>

      <section style={{ marginBottom: 48 }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>Active quests ✨</h2>
          <div style={{ fontSize: 13.5, color: MP_C.textLight, marginTop: 6 }}>Three challenges happening right now. Each one earns a badge — or two, if you go above and beyond.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {MP_QUESTS.map(q => <MPQuestCard key={q.id} quest={q}/>)}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 14 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>Badge collection 🏆</h2>
          <div style={{ display: "flex", gap: 4, background: MP_C.bgInset, padding: 4, borderRadius: 999 }}>
            {cats.map(c => (
              <button key={c} onClick={() => setFilter(c)}
                      style={{
                        fontSize: 12, fontWeight: 600,
                        background: filter === c ? MP_C.bgCard : "transparent",
                        color: filter === c ? MP_C.text : MP_C.textLight,
                        border: "none",
                        padding: "7px 13px", borderRadius: 999, cursor: "pointer",
                        boxShadow: filter === c ? MP_C.shadowSm : "none",
                        transition: "all 150ms ease",
                      }}>{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {visible.map(b => <MPBadgeCard key={b.id} badge={b} onOpen={onOpenBadge}/>)}
        </div>
      </section>

      <section style={{ marginBottom: 48 }}>
        <div style={{ marginBottom: 18 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>Badges to earn next</h2>
          <div style={{ fontSize: 13.5, color: MP_C.textLight, marginTop: 6 }}>4 more out there. Some you can see how to earn — one is a mystery.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {MP_LOCKED.map(b => <MPLockedBadgeCard key={b.id} badge={b}/>)}
        </div>
      </section>

      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>Active goals 🎯</h2>
          <button onClick={onCreateGoal} className="mp-ghost"
                  style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: MP_C.coralDeep, background: MP_C.coralBg, border: "none", padding: "10px 16px", borderRadius: 14, cursor: "pointer" }}>
            <I.Plus size={14} strokeWidth={2.4} color={MP_C.coralDeep}/> Set a new goal
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {MP_GOALS.map(g => <MPGoalCard key={g.id} goal={g} onUpdate={onUpdateGoal}/>)}
        </div>
      </section>
    </div>
  );
}

/* ============================================================ */
/* Modals                                                       */
/* ============================================================ */

const mpLabel = { display: "block", fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 8 };
// Inputs inherit body font (Inter from the portal) — same as portfolio's `fontFamily: "inherit"`
const mpInput = { width: "100%", fontSize: 14, color: MP_C.text, background: MP_C.bgInset, border: "none", borderRadius: 12, padding: "11px 14px", outline: "none", fontFamily: "inherit" };

function MPBadgeModal({ badge, onClose }) {
  const [idx, setIdx] = useState(0);
  if (!badge) return null;
  const moments = badge.moments || [];
  const current = moments[idx];
  const milestones = badge.milestones;
  const pal = mpPal(badge.palette);
  return (
    <MPModalShell onClose={onClose} maxWidth={680}>
      <div style={{ display: "flex", gap: 20, marginBottom: 24, alignItems: "flex-start" }}>
        <MPBadgeMedallion icon={badge.icon} palette={badge.palette} size={88}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 10 }}><MPPill palette={badge.palette}>{badge.category}</MPPill></div>
          <h3 style={{ fontSize: 28, fontWeight: 700, lineHeight: 1.15, margin: "0 0 8px", color: MP_C.text, fontFamily: FRED }}>{badge.name}</h3>
          <div style={{ fontSize: 14, color: MP_C.textLight, marginBottom: 6 }}>{badge.description}</div>
          <div style={{ fontSize: 12.5, color: MP_C.textMuted, fontWeight: 500 }}>Awarded {badge.date} · by {badge.teacher}</div>
        </div>
        <button onClick={onClose} aria-label="Close" className="mp-ghost"
                style={{ background: MP_C.bgInset, border: "none", borderRadius: 12, padding: 8, cursor: "pointer", color: MP_C.textLight }}>
          <I.X size={18} color={MP_C.textLight}/>
        </button>
      </div>

      {moments.length > 0 ? (
        <div style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted }}>Moments behind it</div>
            {moments.length > 1 ? (
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => setIdx((i) => (i - 1 + moments.length) % moments.length)} aria-label="Previous moment" className="mp-ghost"
                        style={{ background: MP_C.bgInset, border: "none", borderRadius: 10, padding: 8, cursor: "pointer", color: MP_C.text }}>
                  <I.ArrowLeft size={14} color={MP_C.text}/>
                </button>
                <button onClick={() => setIdx((i) => (i + 1) % moments.length)} aria-label="Next moment" className="mp-ghost"
                        style={{ background: MP_C.bgInset, border: "none", borderRadius: 10, padding: 8, cursor: "pointer", color: MP_C.text }}>
                  <I.ArrowRight size={14} color={MP_C.text}/>
                </button>
              </div>
            ) : null}
          </div>
          <div style={{ position: "relative", background: pal.bg, borderRadius: 18, padding: 22, overflow: "hidden" }}>
            <I.Quote size={56} color={pal.fg} strokeWidth={1} style={{ position: "absolute", top: -6, right: -8, opacity: 0.22 }}/>
            <div style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.45, color: MP_C.text, marginBottom: 14 }}>"{current.note}"</div>
            <div style={{ fontSize: 12.5, color: pal.fg, fontWeight: 600 }}>— {current.teacher}, {current.date}</div>
          </div>
          {moments.length > 1 ? (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {moments.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} aria-label={`Moment ${i + 1}`}
                        style={{ width: i === idx ? 22 : 7, height: 7, borderRadius: 999, background: i === idx ? MP_C.text : MP_C.bgInset, border: "none", padding: 0, cursor: "pointer", transition: "width 200ms ease, background 200ms ease" }}/>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {milestones ? (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 10 }}>Milestones</div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {milestones.map((m, i) => (
              <li key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: MP_C.bgInset, borderRadius: 12, fontSize: 13, color: MP_C.text }}>
                <span style={{ fontWeight: 500 }}>{m.label}</span>
                <span className="mp-num" style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500 }}>{m.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </MPModalShell>
  );
}

function MPGoalCreateModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState(null);
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [tracking, setTracking] = useState("auto");
  const [linkedClass, setLinkedClass] = useState(MP_CLASSES[0].id);
  const [due, setDue] = useState("");
  const [share, setShare] = useState(false);
  const cats = [
    { id: "Grade",      desc: "Reach a target grade in a class.",   tracking: "auto",    unit: "%" },
    { id: "Reading",    desc: "Read more this term.",                tracking: "self",    unit: "books" },
    { id: "Habit",      desc: "Build a daily or weekly habit.",      tracking: "auto",    unit: "days" },
    { id: "Assessment", desc: "Improve a benchmark or state score.", tracking: "teacher", unit: "% to target" },
    { id: "Personal",   desc: "Something meaningful to you.",        tracking: "self",    unit: "" },
  ];
  const onPickCat = (c) => { setCat(c.id); setTracking(c.tracking); if (!unit) setUnit(c.unit); };
  return (
    <MPModalShell onClose={onClose} maxWidth={620}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 8 }}>Goal</div>
          <h3 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>Set a new goal 🎯</h3>
        </div>
        <button onClick={onClose} aria-label="Close" className="mp-ghost" style={{ background: MP_C.bgInset, border: "none", borderRadius: 12, padding: 8, cursor: "pointer", color: MP_C.textLight }}><I.X size={18} color={MP_C.textLight}/></button>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={mpLabel}>Goal title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={mpInput} placeholder="e.g. Raise English grade to A−"/>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={mpLabel}>Category</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
          {cats.map(c => (
            <button key={c.id} onClick={() => onPickCat(c)}
                    style={{
                      textAlign: "left", cursor: "pointer",
                      background: cat === c.id ? mpPal("lavender").bg : MP_C.bgInset,
                      border: "none", borderRadius: 14, padding: 14,
                    }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: MP_C.text, marginBottom: 3 }}>{c.id}</div>
              <div style={{ fontSize: 11.5, color: MP_C.textLight }}>{c.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
        <div>
          <label style={mpLabel}>Target</label>
          <input value={target} onChange={(e) => setTarget(e.target.value)} style={mpInput} placeholder="e.g. 90"/>
        </div>
        <div>
          <label style={mpLabel}>Unit</label>
          <input value={unit} onChange={(e) => setUnit(e.target.value)} style={mpInput} placeholder="e.g. %"/>
        </div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <label style={mpLabel}>How is it tracked?</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "auto",    title: "Pulled automatically",     desc: "From your gradebook, attendance, or another system." },
            { id: "self",    title: "I'll log progress myself", desc: "You'll update this manually as you make progress." },
            { id: "teacher", title: "My teacher will update it",desc: "Useful for assessment- or behavior-based goals." },
          ].map(opt => (
            <button key={opt.id} onClick={() => setTracking(opt.id)}
                    style={{
                      textAlign: "left", cursor: "pointer",
                      background: tracking === opt.id ? mpPal("lavender").bg : MP_C.bgInset,
                      border: "none", borderRadius: 14, padding: 14,
                      display: "flex", alignItems: "flex-start", gap: 12,
                    }}>
              <span style={{
                width: 18, height: 18, borderRadius: 999,
                border: `2px solid ${tracking === opt.id ? MP_C.lavenderDeep : MP_C.textMuted}`,
                background: tracking === opt.id ? MP_C.lavender : "transparent",
                marginTop: 2, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {tracking === opt.id ? <span style={{ width: 7, height: 7, background: MP_C.lavenderDeep, borderRadius: 999 }}/> : null}
              </span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: MP_C.text }}>{opt.title}</div>
                <div style={{ fontSize: 12, color: MP_C.textLight, marginTop: 2 }}>{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {tracking === "auto" ? (
        <div style={{ marginBottom: 18 }}>
          <label style={mpLabel}>Linked class</label>
          <select value={linkedClass} onChange={(e) => setLinkedClass(e.target.value)} style={mpInput}>
            {MP_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name} · {c.teacher}</option>)}
          </select>
        </div>
      ) : null}

      <div style={{ marginBottom: 18 }}>
        <label style={mpLabel}>Due date</label>
        <input value={due} onChange={(e) => setDue(e.target.value)} style={mpInput} placeholder='e.g. "End of Q4", "Jun 12", "Ongoing"'/>
      </div>

      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 22, padding: 14, background: MP_C.bgInset, borderRadius: 14 }}>
        <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} style={{ marginTop: 4 }}/>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: MP_C.text }}>Share with teacher</div>
          <div style={{ fontSize: 12, color: MP_C.textLight, marginTop: 2 }}>
            {tracking === "teacher" ? "Required so they can update progress." : "Optional — they'll see this on their roster."}
          </div>
        </div>
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={onClose} className="mp-ghost" style={{ fontSize: 13, fontWeight: 600, color: MP_C.textLight, background: MP_C.bgInset, border: "none", borderRadius: 14, padding: "11px 18px", cursor: "pointer" }}>Cancel</button>
        <button onClick={onClose} style={{ fontSize: 13, fontWeight: 600, color: MP_C.coralDeep, background: MP_C.coral, border: "none", borderRadius: 14, padding: "11px 18px", cursor: "pointer" }}>Create goal</button>
      </div>
    </MPModalShell>
  );
}

function MPGoalUpdateModal({ goal, onClose }) {
  const isReading = goal?.category === "Reading";
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [count, setCount] = useState(goal?.current || 0);
  const [note, setNote] = useState("");
  if (!goal) return null;
  return (
    <MPModalShell onClose={onClose} maxWidth={620}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 8 }}>Update progress</div>
          <h3 style={{ fontSize: 24, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>{goal.title}</h3>
        </div>
        <button onClick={onClose} aria-label="Close" className="mp-ghost" style={{ background: MP_C.bgInset, border: "none", borderRadius: 12, padding: 8, cursor: "pointer", color: MP_C.textLight }}><I.X size={18} color={MP_C.textLight}/></button>
      </div>

      <div style={{ background: mpPal("lavender").bg, borderRadius: 16, padding: 18, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.lavenderDeep, marginBottom: 4 }}>Where you are now</div>
          <div className="mp-num" style={{ fontSize: 22, fontWeight: 700, color: MP_C.text }}>{goal.current} / {goal.target} {goal.unit}</div>
        </div>
        {goal.lastLog ? (
          <div style={{ fontSize: 13, color: MP_C.text }}>
            Last logged: <span style={{ fontWeight: 600 }}>{goal.lastLog.title}</span> on {goal.lastLog.date}
          </div>
        ) : null}
      </div>

      {isReading ? (
        <>
          <div style={{ marginBottom: 14 }}>
            <label style={mpLabel}>Book title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={mpInput} placeholder='e.g. "The Buried Giant"'/>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={mpLabel}>Author</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} style={mpInput} placeholder="e.g. Kazuo Ishiguro"/>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={mpLabel}>Rating</label>
            <div style={{ display: "flex", gap: 6 }}>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer" }}>
                  <MPStarIcon size={26} filled={n <= rating} color={n <= rating ? MP_C.yellowDeep : MP_C.textMuted}/>
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <div style={mpLabel}>Reading log</div>
            <div style={{ maxHeight: 240, overflowY: "auto", background: MP_C.bgInset, borderRadius: 14, padding: 6 }}>
              {MP_READING_LOG.map((b, i) => (
                <div key={b.id} style={{
                  padding: "12px 14px",
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                  background: i === 0 ? mpPal("coral").bg : "transparent",
                  borderRadius: 10, marginBottom: i === MP_READING_LOG.length - 1 ? 0 : 4,
                }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: MP_C.text }}>{b.title}</div>
                    <div style={{ fontSize: 12, color: MP_C.textLight }}>{b.author}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 1, justifyContent: "flex-end", marginBottom: 2 }}>
                      {[1,2,3,4,5].map(n => <MPStarIcon key={n} size={12} filled={n <= b.rating} color={MP_C.yellowDeep}/>)}
                    </div>
                    <div className="mp-num" style={{ fontSize: 11, color: MP_C.textMuted, fontWeight: 500 }}>{b.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 20 }}>
            <label style={mpLabel}>New count</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setCount(Math.max(0, count - 1))} className="mp-ghost" style={{ background: MP_C.bgInset, border: "none", borderRadius: 12, width: 40, height: 40, fontSize: 20, fontWeight: 600, cursor: "pointer", color: MP_C.text }}>−</button>
              <input value={count} onChange={(e) => setCount(parseInt(e.target.value || "0", 10) || 0)} style={{ ...mpInput, textAlign: "center", flex: 1 }}/>
              <button onClick={() => setCount(count + 1)} className="mp-ghost" style={{ background: MP_C.bgInset, border: "none", borderRadius: 12, width: 40, height: 40, fontSize: 20, fontWeight: 600, cursor: "pointer", color: MP_C.text }}>+</button>
            </div>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label style={mpLabel}>Note (optional)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ ...mpInput, minHeight: 90, resize: "vertical" }} placeholder="What changed since last time?"/>
          </div>
        </>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={onClose} className="mp-ghost" style={{ fontSize: 13, fontWeight: 600, color: MP_C.textLight, background: MP_C.bgInset, border: "none", borderRadius: 14, padding: "11px 18px", cursor: "pointer" }}>Cancel</button>
        <button onClick={onClose} style={{ fontSize: 13, fontWeight: 600, color: MP_C.coralDeep, background: MP_C.coral, border: "none", borderRadius: 14, padding: "11px 18px", cursor: "pointer" }}>Save progress</button>
      </div>
    </MPModalShell>
  );
}

/* ============================================================ */
/* Tab: Grades                                                  */
/* ============================================================ */

function MPClassSection({ cls, expanded, onToggle, reflections, onOpenReflection, yearId }) {
  const missing = cls.assignments.filter(a => a.status === "missing").length;
  const pal = mpPal(cls.accent);
  return (
    <div id={`mp-class-${cls.id}`} style={{ background: MP_C.bgCard, borderRadius: 22, overflow: "hidden", boxShadow: MP_C.shadowSm }}>
      <button onClick={onToggle} className="mp-class-row"
              style={{
                width: "100%", background: "transparent", border: "none",
                padding: "22px 26px", cursor: "pointer", textAlign: "left",
                display: "grid", gridTemplateColumns: "auto 2.4fr 1fr 0.8fr 1.2fr 28px",
                gap: 16, alignItems: "center",
              }}>
        <span style={{ width: 8, height: 40, borderRadius: 999, background: pal.surface }}/>
        <div>
          <div style={{ fontSize: 17, fontWeight: 600, color: MP_C.text, fontFamily: FRED }}>{cls.name}</div>
          <div style={{ fontSize: 12.5, color: MP_C.textMuted, marginTop: 2, fontWeight: 500 }}>{cls.teacher} · Period {cls.period} · Room {cls.room}</div>
        </div>
        <div>{missing > 0 ? <MPPill palette="rose" icon="AlertCircle">{missing} missing</MPPill> : null}</div>
        <div><MPTrend value={cls.trend}/></div>
        <div style={{ textAlign: "right" }}>
          <div className="mp-num" style={{ fontSize: 32, fontWeight: 700, lineHeight: 1, color: MP_C.text }}>{cls.grade}</div>
          <div className="mp-num" style={{ fontSize: 12, color: MP_C.textMuted, marginTop: 4, fontWeight: 500 }}>{cls.percentage}%</div>
        </div>
        <I.ChevronDown size={20} strokeWidth={2.2} color={MP_C.textLight}
                       style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 200ms ease", justifySelf: "end" }}/>
      </button>
      {expanded ? (
        <div style={{ background: MP_C.bgTinted, padding: 26 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 14 }}>Categories &amp; weights</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cls.categories.length}, 1fr)`, gap: 12, marginBottom: 28 }}>
            {cls.categories.map(cat => (
              <div key={cat.name} style={{ background: MP_C.bgCard, borderRadius: 16, padding: 16, boxShadow: MP_C.shadowSm }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <div style={{ fontSize: 12.5, color: MP_C.text, fontWeight: 600 }}>{cat.name}</div>
                  <div className="mp-num" style={{ fontSize: 11.5, color: MP_C.textMuted, fontWeight: 500 }}>{cat.weight}%</div>
                </div>
                <div className="mp-num" style={{ fontSize: 26, fontWeight: 700, color: MP_C.text, marginBottom: 8, lineHeight: 1 }}>{cat.average}</div>
                <MPProgressBar pct={cat.average} palette={cat.average >= 90 ? "mint" : cat.average >= 80 ? "sky" : "yellow"} height={5}/>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted }}>Assignments · {cls.name} only</div>
            <div className="mp-num" style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500 }}>{cls.assignments.length} items</div>
          </div>
          <div style={{ background: MP_C.bgCard, borderRadius: 16, overflow: "hidden", boxShadow: MP_C.shadowSm }}>
            <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 0.7fr 0.7fr 0.5fr", padding: "12px 18px", background: MP_C.bgInset, fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: MP_C.textMuted }}>
              <div>Assignment</div><div>Category</div><div>Date</div><div style={{ textAlign: "right" }}>Score</div><div style={{ textAlign: "right" }}>%</div>
            </div>
            {cls.assignments.map((a, i) => {
              const pct = a.status === "missing" ? null : Math.round((a.score / a.total) * 100);
              const pctPal = pct == null ? "rose" : pct >= 90 ? "mint" : pct >= 80 ? "sky" : "yellow";
              return (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "2.4fr 1fr 0.7fr 0.7fr 0.5fr",
                  padding: "16px 18px", alignItems: "start", columnGap: 12,
                  borderTop: i === 0 ? "none" : `1px solid ${MP_C.bgInset}`,
                  fontSize: 13, color: MP_C.text,
                }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
                      {a.status === "missing" ? <I.AlertCircle size={14} color={MP_C.roseDeep} strokeWidth={2.2}/> : null}
                      <span>{a.name}</span>
                    </div>
                    {a.comment ? (
                      <div style={{
                        marginTop: 6, padding: "8px 11px",
                        background: mpPal(pctPal).bg,
                        borderRadius: 10,
                        display: "flex", alignItems: "flex-start", gap: 8,
                      }}>
                        <I.MessageSquare size={12} color={mpPal(pctPal).fg} strokeWidth={2}
                                         style={{ flexShrink: 0, marginTop: 3 }}/>
                        <div style={{ fontSize: 12, color: MP_C.text, lineHeight: 1.5, fontWeight: 400 }}>{a.comment}</div>
                      </div>
                    ) : null}
                    {/* Reflection button — only on graded items */}
                    {a.status === "graded" && onOpenReflection ? (() => {
                      const hasRefl = !!(reflections && reflections[`${yearId || cls.id}-${cls.id}-${i}`]);
                      return (
                        <button
                          onClick={() => onOpenReflection(cls, a, i)}
                          style={{
                            marginTop: 8,
                            display: "inline-flex", alignItems: "center", gap: 6,
                            fontSize: 11.5, fontWeight: 600,
                            padding: "5px 11px", borderRadius: 999,
                            background: hasRefl ? MP_C.mintBg   : MP_C.bgInset,
                            color:      hasRefl ? MP_C.mintDeep : MP_C.textLight,
                            border: "none", cursor: "pointer",
                            fontFamily: "inherit",
                            transition: "background 150ms ease",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = hasRefl ? MP_C.mint : MP_C.lineDark || MP_C.bgInset; }}
                          onMouseLeave={e => { e.currentTarget.style.background = hasRefl ? MP_C.mintBg : MP_C.bgInset; }}
                        >
                          {hasRefl ? (
                            <>
                              <span style={{
                                width: 14, height: 14, borderRadius: 999,
                                background: MP_C.mintDeep, color: MP_C.bgCard,
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                fontSize: 9, fontWeight: 700, flexShrink: 0,
                              }}>✓</span>
                              View reflection
                            </>
                          ) : (
                            <><span style={{ fontSize: 13, lineHeight: 1 }}>+</span> Add reflection</>
                          )}
                        </button>
                      );
                    })() : null}
                  </div>
                  <div style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500, paddingTop: 1 }}>{a.category}</div>
                  <div className="mp-num" style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500, paddingTop: 1 }}>{a.date}</div>
                  <div className="mp-num" style={{ textAlign: "right", fontSize: 12.5, fontWeight: 600, color: a.status === "missing" ? MP_C.roseDeep : MP_C.text, paddingTop: 1 }}>
                    {a.status === "missing" ? "MISSING" : `${a.score} / ${a.total}`}
                  </div>
                  <div style={{ textAlign: "right", paddingTop: 1 }}>
                    {pct == null
                      ? <span className="mp-num" style={{ fontSize: 12.5, color: MP_C.textMuted }}>—</span>
                      : <span className="mp-num" style={{ fontSize: 12.5, fontWeight: 700, color: mpPal(pctPal).fg }}>{pct}%</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Reflection feature (mirrors my-portfolio's "My Work") ---------- */

const MP_REFLECTION_PROMPTS = [
  "What did I learn from this feedback?",
  "What would I do differently next time?",
  "What am I most proud of in this work?",
  "How can I apply this to future assignments?",
  "What challenged me most, and how did I work through it?",
];

const MP_VISUAL_CATEGORIES = ["Projects", "Sketchbook", "Critiques"];

// Lorem-ish snippets so each text submission looks like a different piece of
// work rather than identical placeholder paragraphs.
const MP_LOREM = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt.",
];

function MPAssignmentPreview({ assignment }) {
  const visual = MP_VISUAL_CATEGORIES.includes(assignment.category);
  if (visual) {
    // Abstract pastel "artwork" placeholder
    return (
      <div style={{
        background: `linear-gradient(135deg, ${MP_C.coralBg}, ${MP_C.lavenderBg})`,
        borderRadius: 14, position: "relative",
        aspectRatio: "4 / 3",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        <svg viewBox="0 0 200 150" style={{ width: "78%", height: "auto" }}>
          {/* Abstract pastel shapes — pretend submitted artwork */}
          <ellipse cx="78"  cy="78" rx="44" ry="52" fill={MP_C.coral}    opacity="0.72"/>
          <circle  cx="128" cy="60" r="30"          fill={MP_C.lavender} opacity="0.72"/>
          <path    d="M30 116 L 170 116 L 148 138 L 52 138 Z" fill={MP_C.sky} opacity="0.6"/>
          <circle  cx="78"  cy="72" r="5"           fill={MP_C.text}    opacity="0.35"/>
          <path    d="M62 84 Q78 96 94 84" stroke={MP_C.text} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4"/>
        </svg>
        <div style={{
          position: "absolute", bottom: 14, left: 0, right: 0,
          textAlign: "center", fontSize: 10.5, fontWeight: 700,
          color: MP_C.lavenderDeep, letterSpacing: 0.8, textTransform: "uppercase",
        }}>Your submitted artwork</div>
      </div>
    );
  }
  // Text submission — lorem ipsum
  return (
    <div style={{
      background: MP_C.bgInset, borderRadius: 14,
      padding: "20px 22px",
      fontSize: 13.5, lineHeight: 1.7, color: MP_C.text,
      maxHeight: 320, overflowY: "auto",
    }}>
      {MP_LOREM.map((p, i) => (
        <p key={i} style={{ margin: i === 0 ? "0 0 12px" : (i === MP_LOREM.length - 1 ? 0 : "0 0 12px") }}>{p}</p>
      ))}
    </div>
  );
}

function MPReflectionModal({ cls, assignment, existingReflection, onClose, onSave }) {
  const [text, setText] = useState(existingReflection || "");
  const [isEditing, setIsEditing] = useState(!existingReflection);
  const isReadMode = !!existingReflection && !isEditing;
  const pct = assignment.status === "missing" ? null : Math.round((assignment.score / assignment.total) * 100);
  const pctPal = pct == null ? "rose" : pct >= 90 ? "mint" : pct >= 80 ? "sky" : "yellow";
  const addPrompt = (p) => setText(t => t ? `${t}\n\n${p} ` : `${p} `);
  return (
    <MPModalShell onClose={onClose} maxWidth={920}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 6 }}>Reflection</div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED, lineHeight: 1.2 }}>{assignment.name}</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10, flexWrap: "wrap" }}>
            <MPPill palette={cls.accent}>{cls.name}</MPPill>
            <span style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500 }}>{assignment.category} · {assignment.date}</span>
            {pct != null ? (
              <span className="mp-num" style={{ fontSize: 12.5, fontWeight: 700, color: mpPal(pctPal).fg }}>{assignment.score} / {assignment.total} · {pct}%</span>
            ) : null}
          </div>
        </div>
        <button onClick={onClose} aria-label="Close" className="mp-ghost" style={{ background: MP_C.bgInset, border: "none", borderRadius: 12, padding: 8, cursor: "pointer", color: MP_C.textLight, flexShrink: 0 }}>
          <I.X size={18} color={MP_C.textLight}/>
        </button>
      </div>

      <div style={{ borderTop: `1px solid ${MP_C.bgInset}`, marginBottom: 22 }}/>

      {/* Two-column: Your work | Reflection */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
        {/* Left — your work */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 10 }}>Your work</div>
          <MPAssignmentPreview assignment={assignment}/>
          {assignment.comment ? (
            <div style={{ marginTop: 14, padding: "12px 14px", background: mpPal(pctPal).bg, borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
              <I.MessageSquare size={14} color={mpPal(pctPal).fg} strokeWidth={2} style={{ flexShrink: 0, marginTop: 3 }}/>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase", color: mpPal(pctPal).fg, marginBottom: 4 }}>From {cls.teacher}</div>
                <div style={{ fontSize: 13, color: MP_C.text, lineHeight: 1.55 }}>{assignment.comment}</div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Right — reflection editor / viewer */}
        <div>
          {isReadMode ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 10 }}>Your reflection</div>
              <div style={{ background: MP_C.bgInset, borderRadius: 14, padding: "16px 18px", fontSize: 13.5, color: MP_C.text, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {existingReflection}
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 16 }}>
                <button onClick={() => setIsEditing(true)} className="mp-ghost" style={{ fontSize: 13, fontWeight: 600, color: MP_C.text, background: MP_C.bgInset, border: "none", borderRadius: 14, padding: "10px 16px", cursor: "pointer" }}>Edit</button>
                <button onClick={onClose} style={{ fontSize: 13, fontWeight: 600, color: MP_C.coralDeep, background: MP_C.coral, border: "none", borderRadius: 14, padding: "10px 18px", cursor: "pointer" }}>Done</button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 10 }}>Prompt starters</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {MP_REFLECTION_PROMPTS.map((p, i) => (
                  <button key={i} onClick={() => addPrompt(p)}
                          style={{
                            fontSize: 11.5, fontWeight: 500, padding: "6px 12px", borderRadius: 999,
                            background: MP_C.lavenderBg, color: MP_C.lavenderDeep,
                            border: "none", cursor: "pointer", fontFamily: "inherit",
                            transition: "background 150ms ease",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = MP_C.lavender; }}
                          onMouseLeave={e => { e.currentTarget.style.background = MP_C.lavenderBg; }}
                  >{p}</button>
                ))}
              </div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="What did you learn? What would you do differently? What are you proud of?"
                style={{
                  width: "100%", minHeight: 200, boxSizing: "border-box",
                  borderRadius: 12, border: "none",
                  padding: "14px 16px", fontSize: 13.5, lineHeight: 1.65,
                  color: MP_C.text, background: MP_C.bgInset, outline: "none",
                  fontFamily: "inherit", resize: "vertical", display: "block",
                }}
                autoFocus
              />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14, gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11.5, color: MP_C.textMuted, fontWeight: 500 }}>
                  {text.length > 0 ? `${text.length} characters` : ""}
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  {existingReflection ? (
                    <button onClick={() => { setText(existingReflection); setIsEditing(false); }} className="mp-ghost" style={{ fontSize: 13, fontWeight: 600, color: MP_C.text, background: MP_C.bgInset, border: "none", borderRadius: 14, padding: "10px 16px", cursor: "pointer" }}>Cancel</button>
                  ) : null}
                  <button
                    onClick={() => { if (text.trim()) { onSave(text.trim()); setIsEditing(false); } }}
                    disabled={!text.trim()}
                    style={{
                      fontSize: 13, fontWeight: 600,
                      color: text.trim() ? MP_C.coralDeep : MP_C.textMuted,
                      background: text.trim() ? MP_C.coral : MP_C.bgInset,
                      border: "none", borderRadius: 14, padding: "10px 18px",
                      cursor: text.trim() ? "pointer" : "default",
                      fontFamily: "inherit", transition: "background 150ms ease",
                    }}>
                    {existingReflection ? "Save changes" : "Submit reflection"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </MPModalShell>
  );
}

/* ---------- Grades tab ---------- */

function MPGradesTab() {
  const [yearId, setYearId] = useState(MP_YEARS[0].id);                       // default = current
  const year = MP_YEARS.find(y => y.id === yearId) || MP_YEARS[0];
  const classes = year.classes;
  // First class of the active year expanded by default; reset when year changes.
  const [expanded, setExpanded] = useState({ [classes[0].id]: true });
  React.useEffect(() => {
    // Switching year — collapse all but the first class of the new year.
    setExpanded({ [classes[0].id]: true });
  }, [yearId]);
  const [reflections, setReflections] = useState({});                          // { "y10-alg-0": "text..." } — keyed by year too
  const [reflectionTarget, setReflectionTarget] = useState(null);              // { cls, assignment, idx }
  const expandAll = () => setExpanded(Object.fromEntries(classes.map(c => [c.id, true])));
  const collapseAll = () => setExpanded({});
  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  // Reflection keys include the year id so the same class id across years
  // doesn't collide (e.g. art1 = 9th-grade Visual Arts vs. art = 10th).
  const reflKey = (clsId, idx) => `${year.id}-${clsId}-${idx}`;
  const onOpenReflection = (cls, assignment, idx) => setReflectionTarget({ cls, assignment, idx });
  const onSaveReflection = (text) => {
    if (!reflectionTarget) return;
    const k = reflKey(reflectionTarget.cls.id, reflectionTarget.idx);
    setReflections(prev => ({ ...prev, [k]: text }));
  };
  const overallMissing = classes.reduce((acc, c) => acc + c.assignments.filter(a => a.status === "missing").length, 0);

  const isCurrent = !!year.isCurrent;
  const totalCredits = classes.reduce((s, c) => s + (c.credits || 0), 0);
  return (
    <div>
      {/* Year selector — current year is the default; switching swaps the
          GPA hero, quick-scan and class accordion to that year's record. */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 4, background: MP_C.bgInset, padding: 4, borderRadius: 999, flexWrap: "wrap" }}>
          {MP_YEARS.map(y => (
            <button key={y.id} onClick={() => setYearId(y.id)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      fontSize: 12.5, fontWeight: 600,
                      background: yearId === y.id ? MP_C.bgCard : "transparent",
                      color:      yearId === y.id ? MP_C.text   : MP_C.textLight,
                      border: "none", borderRadius: 999,
                      padding: "8px 14px", cursor: "pointer",
                      boxShadow: yearId === y.id ? MP_C.shadowSm : "none",
                      transition: "all 180ms ease", whiteSpace: "nowrap",
                      fontFamily: "inherit",
                    }}>
              <span>{y.gradeLevel}</span>
              {y.isCurrent ? <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 999, background: yearId === y.id ? MP_C.mintBg : "rgba(0,0,0,0.04)", color: MP_C.mintDeep }}>Current</span> : null}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500 }}>{year.year}</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 20, marginBottom: 36, alignItems: "stretch" }}>
        {/* GPA hero — same shape for any year, but label + trend pill change
            depending on whether it's the current term or a final record. */}
        <div style={{
          background: `linear-gradient(135deg, ${MP_C.sky} 0%, ${MP_C.mint} 100%)`,
          borderRadius: 24, padding: 24, boxShadow: MP_C.shadow,
          display: "flex", flexDirection: "column", justifyContent: "space-between",
          gap: 16, minHeight: 0,
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: MP_C.skyDeep, letterSpacing: 0.6, textTransform: "uppercase", marginBottom: 10 }}>
              {isCurrent ? "Cumulative GPA" : `Final GPA · ${year.gradeLevel}`}
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
              <div className="mp-num" style={{ fontSize: 72, fontWeight: 700, color: MP_C.text, lineHeight: 0.9 }}>{year.gpa.toFixed(2)}</div>
              {isCurrent ? (
                <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.7)", color: MP_C.mintDeep, padding: "5px 11px", borderRadius: 999 }}>
                  +{year.gpaTrend.toFixed(2)} this term
                </span>
              ) : (
                <span style={{ fontSize: 12, fontWeight: 700, background: "rgba(255,255,255,0.7)", color: MP_C.skyDeep, padding: "5px 11px", borderRadius: 999 }}>
                  Final record
                </span>
              )}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
            <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 14, padding: 12 }}>
              <div className="mp-num" style={{ fontSize: 22, fontWeight: 700, color: MP_C.text, lineHeight: 1 }}>{classes.length}</div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: MP_C.skyDeep, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>Classes</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.65)", borderRadius: 14, padding: 12 }}>
              <div className="mp-num" style={{ fontSize: 22, fontWeight: 700, color: MP_C.text, lineHeight: 1 }}>
                {totalCredits.toFixed(1)} / {totalCredits.toFixed(1)}
              </div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: MP_C.skyDeep, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>
                {isCurrent ? "Credits on track" : "Credits earned"}
              </div>
            </div>
            <div style={{ background: overallMissing > 0 ? mpPal("rose").bg : "rgba(255,255,255,0.65)", borderRadius: 14, padding: 12 }}>
              <div className="mp-num" style={{ fontSize: 22, fontWeight: 700, color: overallMissing > 0 ? MP_C.roseDeep : MP_C.text, lineHeight: 1 }}>{overallMissing}</div>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: overallMissing > 0 ? MP_C.roseDeep : MP_C.skyDeep, letterSpacing: 0.5, textTransform: "uppercase", marginTop: 4 }}>Missing work</div>
            </div>
          </div>
        </div>
        {/* Right panel — trend chart for current year, final summary for past years */}
        <MPCard style={{ display: "flex", flexDirection: "column" }}>
          {isCurrent ? (
            <>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>GPA trend · last 7 weeks</div>
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <MPAreaChart data={MP_TREND} palette="coral"/>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>Final grades · {year.year}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                {classes.map(c => {
                  const pal = mpPal(c.accent);
                  return (
                    <div key={c.id} style={{ background: MP_C.bgInset, borderRadius: 12, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12.5, fontWeight: 500, color: MP_C.text }}>{c.name}</span>
                      <span className="mp-num" style={{ fontSize: 16, fontWeight: 700, color: pal.fg }}>{c.grade}</span>
                    </div>
                  );
                })}
              </div>
              {year.finalIssued ? (
                <div style={{ fontSize: 11.5, color: MP_C.textMuted, fontWeight: 500, marginTop: 14 }}>
                  Issued {year.finalIssued}
                </div>
              ) : null}
            </>
          )}
        </MPCard>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>All classes — quick scan</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 44 }}>
        {classes.map(c => {
          const pal = mpPal(c.accent);
          return (
            <button key={c.id} className="mp-card-btn"
                    onClick={() => {
                      setExpanded(prev => ({ ...prev, [c.id]: true }));
                      setTimeout(() => {
                        document.getElementById(`mp-class-${c.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }, 50);
                    }}
                    style={{ background: pal.bg, border: "none", borderRadius: 16, padding: 14, textAlign: "left", cursor: "pointer", color: MP_C.text }}>
              <div style={{ fontSize: 11, color: pal.fg, fontWeight: 600, minHeight: 28, lineHeight: 1.3 }}>{c.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 6 }}>
                <div className="mp-num" style={{ fontSize: 26, fontWeight: 700, color: MP_C.text, lineHeight: 1 }}>{c.grade}</div>
                <MPTrend value={c.trend}/>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>By class</h2>
          <div style={{ fontSize: 13, color: MP_C.textLight, marginTop: 4 }}>Tap any class to see its gradebook.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={expandAll} className="mp-ghost" style={{ fontSize: 12, fontWeight: 600, color: MP_C.text, background: MP_C.bgInset, border: "none", borderRadius: 12, padding: "8px 14px", cursor: "pointer" }}>Expand all</button>
          <button onClick={collapseAll} className="mp-ghost" style={{ fontSize: 12, fontWeight: 600, color: MP_C.text, background: MP_C.bgInset, border: "none", borderRadius: 12, padding: "8px 14px", cursor: "pointer" }}>Collapse all</button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {classes.map(c => (
          <MPClassSection
            key={c.id}
            cls={c}
            expanded={!!expanded[c.id]}
            onToggle={() => toggle(c.id)}
            reflections={reflections}
            onOpenReflection={onOpenReflection}
            yearId={year.id}
          />
        ))}
      </div>

      {reflectionTarget ? (
        <MPReflectionModal
          cls={reflectionTarget.cls}
          assignment={reflectionTarget.assignment}
          existingReflection={reflections[reflKey(reflectionTarget.cls.id, reflectionTarget.idx)] || null}
          onClose={() => setReflectionTarget(null)}
          onSave={onSaveReflection}
        />
      ) : null}
    </div>
  );
}

/* ============================================================ */
/* Tab: Progress Report                                         */
/* ============================================================ */

function MPProgressReportTab() {
  const concerns = MP_PROGRESS_REPORT.classes.filter(c => c.concern).length;
  const improving = MP_PROGRESS_REPORT.classes.filter(c => c.trend === "improving").length;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>{MP_PROGRESS_REPORT.period}</h2>
          <div style={{ fontSize: 13.5, color: MP_C.textLight, marginTop: 6 }}>Issued {MP_PROGRESS_REPORT.date}</div>
        </div>
        <button className="mp-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: MP_C.text, background: MP_C.bgInset, border: "none", borderRadius: 14, padding: "10px 16px", cursor: "pointer" }}>
          <I.Download size={14} strokeWidth={2.4} color={MP_C.text}/> Download PDF
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
        <MPStat icon="BookOpen"  value={MP_PROGRESS_REPORT.classes.length} label="Classes reviewed" palette="sky"/>
        <MPStat icon="TrendingUp" value={improving} label="Trending up" palette="mint"/>
        <MPStat icon="AlertCircle" value={concerns} label="Areas of concern" palette={concerns > 0 ? "yellow" : "gray"}/>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}>
        {MP_PROGRESS_REPORT.classes.map((c, i) => (
          <div key={i} style={{
            background: c.concern ? mpPal("yellow").bg : MP_C.bgCard,
            borderRadius: 22, padding: 26,
            boxShadow: MP_C.shadowSm,
            display: "grid", gridTemplateColumns: "1fr 110px", gap: 24, alignItems: "center",
          }}>
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>{c.name}</h3>
                {c.concern ? <MPPill palette="yellow" icon="AlertCircle">Area of concern</MPPill> : null}
                {c.trend === "improving" ? <MPPill palette="mint" icon="TrendingUp">Improving</MPPill> : null}
              </div>
              <div style={{ fontSize: 12.5, color: MP_C.textMuted, fontWeight: 500, marginBottom: 14 }}>{c.teacher}</div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <I.MessageSquare size={18} color={MP_C.textMuted} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 4 }}/>
                <div style={{ fontSize: 15, lineHeight: 1.55, color: MP_C.text, fontWeight: 500 }}>"{c.comment}"</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 4 }}>Standing</div>
              <div className="mp-num" style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, color: MP_C.text }}>{c.standing}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>Prior interims</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {MP_PROGRESS_REPORT.history.map(h => (
          <button key={h.id} className="mp-card-btn"
                  style={{ textAlign: "left", background: MP_C.bgCard, border: "none", borderRadius: 18, padding: 20, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, boxShadow: MP_C.shadowSm }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: MP_C.text, fontFamily: FRED }}>{h.label}</div>
              <div style={{ fontSize: 12, color: MP_C.textMuted, marginTop: 2, fontWeight: 500 }}>Issued {h.date}</div>
            </div>
            <I.ChevronRight size={16} color={MP_C.textLight}/>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ============================================================ */
/* Tab: Assessment Results                                      */
/* ============================================================ */

function MPSubTabs({ value, onChange, options }) {
  return (
    <div style={{ display: "inline-flex", gap: 4, background: MP_C.bgInset, borderRadius: 999, padding: 4, marginBottom: 28 }}>
      {options.map(o => (
        <button key={o.id} onClick={() => onChange(o.id)}
                style={{
                  fontSize: 13, fontWeight: 600,
                  color: value === o.id ? MP_C.text : MP_C.textLight,
                  background: value === o.id ? MP_C.bgCard : "transparent",
                  border: "none", borderRadius: 999,
                  padding: "9px 18px", cursor: "pointer",
                  boxShadow: value === o.id ? MP_C.shadowSm : "none",
                  transition: "all 180ms ease",
                }}>{o.label}</button>
      ))}
    </div>
  );
}

function MPBenchmarkBlock({ subject, palette }) {
  return (
    <MPCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 28, alignItems: "stretch" }}>
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: MP_C.text, fontFamily: FRED }}>{subject.name}</h3>
          <div style={{ fontSize: 12.5, color: MP_C.textMuted, fontWeight: 500, marginBottom: 18 }}>{subject.metric}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {subject.results.map(r => (
              <div key={r.window} style={{ background: MP_C.bgInset, borderRadius: 14, padding: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: MP_C.textMuted }}>{r.window}</div>
                <div className="mp-num" style={{ fontSize: 24, fontWeight: 700, color: MP_C.text, margin: "6px 0 8px", lineHeight: 1 }}>{r.score}</div>
                <MPPill palette={r.level === "Above" ? "mint" : "sky"}>{r.level}</MPPill>
              </div>
            ))}
          </div>
        </div>
        <MPLineChart data={subject.results} palette={palette}/>
      </div>
    </MPCard>
  );
}

function MPLevelIndicator({ level }) {
  return (
    <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
      {[1,2,3,4].map(n => {
        let bg = MP_C.bgInset;
        if (n <= level && level >= 3) bg = MP_C.mint;
        else if (n <= level && level < 3) bg = MP_C.yellow;
        return <div key={n} style={{ flex: 1, height: 8, background: bg, borderRadius: 4 }}/>;
      })}
    </div>
  );
}

function MPStateYearCard({ year }) {
  return (
    <MPCard padding={26}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr", gap: 24, alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 4 }}>School year</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: MP_C.text, marginBottom: 4, fontFamily: FRED }}>{year.year}</div>
          <div style={{ fontSize: 12.5, color: MP_C.textMuted, fontWeight: 500 }}>{year.grade}</div>
        </div>
        {[["ELA", year.ela], ["Math", year.math]].map(([label, r]) => (
          <div key={label}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 8 }}>{label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
              <div className="mp-num" style={{ fontSize: 22, fontWeight: 700, color: MP_C.text }}>{r.score}</div>
              <MPPill palette={r.level === 4 ? "mint" : r.level >= 3 ? "sky" : "yellow"}>Level {r.level} · {r.levelLabel}</MPPill>
            </div>
            <MPLevelIndicator level={r.level}/>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: MP_C.textMuted, marginTop: 6, letterSpacing: 0.4, textTransform: "uppercase", fontWeight: 500 }}>
              <span>Not met</span><span>Exceeded</span>
            </div>
          </div>
        ))}
      </div>
    </MPCard>
  );
}

function MPCredentialDonut({ earned, total }) {
  const pct = earned / total;
  const r = 60, c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      <circle cx={70} cy={70} r={r} fill="none" stroke={MP_C.bgInset} strokeWidth={14}/>
      <circle cx={70} cy={70} r={r} fill="none" stroke={MP_C.mint} strokeWidth={14}
              strokeDasharray={`${dash} ${c - dash}`} strokeDashoffset={c * 0.25}
              strokeLinecap="round" transform="rotate(-90 70 70)"/>
      <text x={70} y={70} textAnchor="middle" dominantBaseline="central" fontSize={28} fontWeight={700} fill={MP_C.text}>
        {Math.round(pct * 100)}%
      </text>
    </svg>
  );
}

function MPCredentialProgress() {
  return (
    <div>
      <div style={{
        background: `linear-gradient(135deg, ${MP_C.mintBg} 0%, ${MP_C.skyBg} 100%)`,
        borderRadius: 24, padding: 30, marginBottom: 20, boxShadow: MP_C.shadow,
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center" }}>
          <MPCredentialDonut earned={MP_CREDENTIALS.totalEarned} total={MP_CREDENTIALS.totalRequired}/>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.mintDeep, marginBottom: 8 }}>On the path to graduation</div>
            <div style={{ fontSize: 30, fontWeight: 700, color: MP_C.text, lineHeight: 1.1, fontFamily: FRED }}>
              {MP_CREDENTIALS.totalEarned} of {MP_CREDENTIALS.totalRequired} credits earned
            </div>
            <div style={{ fontSize: 13.5, color: MP_C.textLight, marginTop: 8 }}>
              On track to complete by Spring 2028. {MP_CREDENTIALS.totalRequired - MP_CREDENTIALS.totalEarned} credits to go.
            </div>
          </div>
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>Requirements</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
        {MP_CREDENTIALS.requirements.map((r, i) => {
          const pct = (r.earned / r.required) * 100;
          const done = r.earned >= r.required;
          return (
            <div key={i} style={{ background: MP_C.bgCard, borderRadius: 18, padding: 18, boxShadow: MP_C.shadowSm }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: MP_C.text, fontFamily: FRED }}>{r.name}</div>
                {done ? <MPPill palette="mint" icon="Check">Done</MPPill> : null}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: MP_C.textMuted, marginBottom: 8, fontWeight: 500 }}>
                <span className="mp-num">{r.earned} / {r.required} credits</span>
                <span className="mp-num">{Math.round(pct)}%</span>
              </div>
              <MPProgressBar pct={pct} palette={done ? "mint" : "coral"} height={6} style={{ marginBottom: 10 }}/>
              <div style={{ fontSize: 11.5, color: MP_C.textLight, fontWeight: 500 }}>{r.courses.join(" · ")}</div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>Other requirements</div>
      <MPCard>
        {MP_CREDENTIALS.other.map((o, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderTop: i === 0 ? "none" : `1px solid ${MP_C.bgInset}`, gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: MP_C.text, fontFamily: FRED }}>{o.name}</div>
              {o.kind === "progress" ? (
                <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
                  <MPProgressBar pct={(o.current / o.target) * 100} palette="coral" height={6} style={{ flex: 1, maxWidth: 320 }}/>
                  <span className="mp-num" style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500 }}>{o.current} / {o.target} {o.unit}</span>
                </div>
              ) : null}
            </div>
            {o.kind === "status" ? <MPPill palette={o.status === "Not started" ? "gray" : "sky"}>{o.status}</MPPill> : null}
          </div>
        ))}
      </MPCard>
    </div>
  );
}

function MPAssessmentResultsTab() {
  const [sub, setSub] = useState("district");
  const palettes = ["coral", "lavender"];
  return (
    <div>
      <MPSubTabs value={sub} onChange={setSub}
                 options={[
                   { id: "district",    label: "District benchmarks" },
                   { id: "state",       label: "State assessments" },
                   { id: "credentials", label: "Credential progress" },
                 ]}/>
      {sub === "district" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {MP_BENCHMARKS.subjects.map((s, i) => <MPBenchmarkBlock key={s.name} subject={s} palette={palettes[i % palettes.length]}/>)}
        </div>
      ) : null}
      {sub === "state" ? (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
            {MP_STATE_RESULTS.map((y, i) => <MPStateYearCard key={i} year={y}/>)}
          </div>
          <div style={{ background: MP_C.skyBg, borderRadius: 18, padding: 20, display: "flex", gap: 14, alignItems: "flex-start", boxShadow: MP_C.shadowSm }}>
            <I.Info size={20} color={MP_C.skyDeep} strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }}/>
            <div style={{ fontSize: 13.5, color: MP_C.text, lineHeight: 1.55 }}>
              <strong style={{ color: MP_C.skyDeep }}>How to read this:</strong> The SBAC reports performance on a 4-level scale.
              Level 3 means you "met" the standard — you're on grade level. Level 4 means you exceeded it.
              The scale score (e.g. 2645) is the underlying number; the level is what colleges and the state actually use.
            </div>
          </div>
        </div>
      ) : null}
      {sub === "credentials" ? <MPCredentialProgress/> : null}
    </div>
  );
}

/* ============================================================ */
/* Tab: Attendance                                              */
/* ============================================================ */

const MP_HEAT_COLOR = (s) => ({
  p: MP_C.mint, t: MP_C.yellow, a: MP_C.rose, b: MP_C.bgInset, f: "#EAE6DD",
})[s] || MP_C.bgInset;

function MPHeatmap({ grid }) {
  // Single SVG with everything inside — labels positioned exactly at row centers
  // so they can't drift from the cell grid.
  const cell = 13, gap = 3, weeks = grid.length, days = 5;
  // Month starts: the week index where each month begins in the school year.
  const monthStarts = [
    [0, "Aug"], [4, "Sep"], [8, "Oct"], [13, "Nov"], [17, "Dec"],
    [21, "Jan"], [25, "Feb"], [29, "Mar"], [33, "Apr"], [35, "May"],
  ];
  const dayLabels = ["M", "T", "W", "Th", "F"];   // disambiguate Thursday from Tuesday
  const leftLabelW = 26;   // room for day labels (M T W Th F)
  const topLabelH  = 22;   // room for month labels
  const innerW = weeks * (cell + gap);
  const innerH = days  * (cell + gap);
  const svgW = leftLabelW + innerW;
  const svgH = topLabelH  + innerH + 6;
  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={svgW} height={svgH} style={{ display: "block" }} aria-label="Year-at-a-glance attendance heatmap">
        {/* Month labels — sitting above their starting week */}
        {monthStarts.map(([wi, label]) => (
          <text key={label + wi} x={leftLabelW + wi * (cell + gap)} y={13}
                fontSize={11} fontWeight={600} fill={MP_C.textMuted}>{label}</text>
        ))}
        {/* Month divider lines — between adjacent months */}
        {monthStarts.slice(1).map(([wi, label]) => {
          const x = leftLabelW + wi * (cell + gap) - gap / 2 - 0.5;
          return (
            <line key={`div-${label}`} x1={x} y1={topLabelH - 5} x2={x} y2={topLabelH + innerH + 2}
                  stroke={MP_C.bgInset} strokeWidth={1}/>
          );
        })}
        {/* Day labels — y-positioned to match each row's vertical center */}
        {dayLabels.map((d, i) => (
          <text key={d + i}
                x={leftLabelW - 8}
                y={topLabelH + i * (cell + gap) + cell / 2 + 4}
                fontSize={10} fontWeight={600} fill={MP_C.textMuted}
                textAnchor="end">{d}</text>
        ))}
        {/* Cells */}
        <g transform={`translate(${leftLabelW}, ${topLabelH})`}>
          {grid.map((week, wi) =>
            week.map((s, di) => (
              <rect key={`${wi}-${di}`}
                    x={wi * (cell + gap)} y={di * (cell + gap)}
                    width={cell} height={cell} rx={3}
                    fill={MP_HEAT_COLOR(s)}/>
            ))
          )}
        </g>
      </svg>
    </div>
  );
}

function MPSummaryStat({ label, data, accent }) {
  return (
    <div style={{
      background: accent ? `linear-gradient(135deg, ${MP_C.coral} 0%, ${MP_C.yellow} 100%)` : MP_C.bgCard,
      borderRadius: 20, padding: 22,
      boxShadow: accent ? MP_C.shadow : MP_C.shadowSm,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: accent ? MP_C.coralDeep : MP_C.textMuted, marginBottom: 10 }}>{label}</div>
      <div className="mp-num" style={{ fontSize: 40, fontWeight: 700, color: MP_C.text, lineHeight: 1, marginBottom: 10 }}>{data.rate.toFixed(1)}%</div>
      <div style={{ fontSize: 11.5, color: accent ? MP_C.coralDeep : MP_C.textMuted, fontWeight: 600, display: "flex", flexWrap: "wrap", gap: "4px 10px" }}>
        <span><span className="mp-num">{data.present}</span> Present</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span><span className="mp-num">{data.tardy}</span> Tardy</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span><span className="mp-num">{data.absent}</span> Absent</span>
      </div>
    </div>
  );
}

function MPStreakCallout() {
  return (
    <div style={{
      background: `linear-gradient(135deg, ${MP_C.coral} 0%, ${MP_C.yellow} 100%)`,
      borderRadius: 24, padding: 28,
      boxShadow: MP_C.shadow,
      position: "relative", overflow: "hidden", minHeight: 240,
    }}>
      <I.Flame size={160} color="rgba(255,255,255,0.6)" strokeWidth={1.2} style={{ position: "absolute", right: -24, bottom: -24 }} className="mp-float"/>
      <div style={{ position: "relative" }}>
        <I.Flame size={26} strokeWidth={2} color={MP_C.coralDeep}/>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.coralDeep, marginTop: 16 }}>Current streak</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
          <div className="mp-num" style={{ fontSize: 72, fontWeight: 700, color: MP_C.text, lineHeight: 0.9 }}>{MP_ATT.streak.current}</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: MP_C.coralDeep, fontFamily: FRED }}>days strong</div>
        </div>
        <div style={{ marginTop: 22, paddingTop: 18, borderTop: "1px solid rgba(184,92,46,0.2)" }}>
          <div style={{ fontSize: 13, color: MP_C.text }}>
            Personal best: <span style={{ fontWeight: 700 }}>{MP_ATT.streak.best} days</span>
          </div>
          <div className="mp-num" style={{ fontSize: 11.5, color: MP_C.coralDeep, marginTop: 2, fontWeight: 500 }}>
            {MP_ATT.streak.bestStart} → {MP_ATT.streak.bestEnd}
          </div>
        </div>
      </div>
    </div>
  );
}

function MPAttendanceTab() {
  const [heatClass, setHeatClass] = useState("all");
  // Recompute the grid for the selected class. Cheap — runs once per click.
  const heatGrid = React.useMemo(() => buildClassHeatmap(heatClass), [heatClass]);
  const heatStats = React.useMemo(() => tallyHeatmap(heatGrid), [heatGrid]);
  const classOptions = [{ id: "all", name: "All classes" }, ...MP_CLASSES.map(c => ({ id: c.id, name: c.name }))];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 18, marginBottom: 36 }}>
        <div style={{
          background: `linear-gradient(135deg, ${MP_C.mint} 0%, ${MP_C.sky} 100%)`,
          borderRadius: 24, padding: 28,
          boxShadow: MP_C.shadow,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.mintDeep, marginBottom: 14 }}>Today · {MP_ATT.todayDate}</div>
          <div style={{ width: 60, height: 60, borderRadius: 999, background: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
            <I.Check size={32} strokeWidth={3} color={MP_C.mintDeep}/>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1, color: MP_C.text, fontFamily: FRED }}>Present</div>
          <div style={{ fontSize: 13.5, color: MP_C.mintDeep, marginTop: 10, fontWeight: 600 }}>All 6 periods marked present</div>
        </div>
        <MPCard padding={24}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 14 }}>Today's periods</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {MP_ATT.todayPeriods.map(p => (
              <div key={p.period} style={{ background: MP_C.mintBg, borderRadius: 14, padding: 14, textAlign: "center" }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.mintDeep }}>Period {p.period}</div>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: MP_C.mint, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px auto" }}>
                  <I.Check size={16} color={MP_C.mintDeep} strokeWidth={3}/>
                </div>
                <div style={{ fontSize: 11.5, color: MP_C.text, fontWeight: 600 }}>{p.class}</div>
              </div>
            ))}
          </div>
        </MPCard>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>Attendance summary</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 36 }}>
        <MPSummaryStat label="This week"        data={MP_ATT.week}/>
        <MPSummaryStat label="This month"       data={MP_ATT.month}/>
        <MPSummaryStat label="Year to date"     data={MP_ATT.ytd}/>
        <MPSummaryStat label="Attendance rate"  data={MP_ATT.ytd} accent/>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2.4fr", gap: 18, marginBottom: 36 }}>
        <MPStreakCallout/>
        <MPCard>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted }}>Year at a glance</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {[["Present", MP_C.mint], ["Tardy", MP_C.yellow], ["Absent", MP_C.rose], ["Break", MP_C.bgInset]].map(([l, col]) => (
                <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: MP_C.textLight, fontWeight: 500 }}>
                  <span style={{ width: 11, height: 11, background: col, borderRadius: 3 }}/> {l}
                </span>
              ))}
            </div>
          </div>
          {/* Class filter tabs */}
          <div style={{ display: "flex", gap: 4, background: MP_C.bgInset, padding: 4, borderRadius: 999, marginBottom: 18, flexWrap: "wrap" }}>
            {classOptions.map(c => (
              <button key={c.id} onClick={() => setHeatClass(c.id)}
                      style={{
                        fontSize: 12, fontWeight: 600,
                        background: heatClass === c.id ? MP_C.bgCard : "transparent",
                        color: heatClass === c.id ? MP_C.text : MP_C.textLight,
                        border: "none", borderRadius: 999,
                        padding: "7px 13px", cursor: "pointer",
                        boxShadow: heatClass === c.id ? MP_C.shadowSm : "none",
                        transition: "all 180ms ease",
                        whiteSpace: "nowrap",
                      }}>{c.name}</button>
            ))}
          </div>
          <MPHeatmap grid={heatGrid}/>
          {/* Per-class running totals + caption */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginTop: 14, fontSize: 13, color: MP_C.textLight, fontWeight: 500 }}>
            <span>Each square is one school day, August through May.</span>
            <span style={{ display: "inline-flex", gap: 14, flexWrap: "wrap" }}>
              <span><span className="mp-num" style={{ fontWeight: 700, color: MP_C.mintDeep }}>{heatStats.present}</span> Present</span>
              <span><span className="mp-num" style={{ fontWeight: 700, color: MP_C.yellowDeep }}>{heatStats.tardy}</span> Tardy</span>
              <span><span className="mp-num" style={{ fontWeight: 700, color: MP_C.roseDeep }}>{heatStats.absent}</span> Absent</span>
            </span>
          </div>
        </MPCard>
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>Streak milestones</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 36 }}>
        {MP_MILESTONES.map((m, i) => (
          <div key={i} style={{
            background: m.unlocked ? MP_C.mintBg : MP_C.bgCard,
            borderRadius: 16, padding: 16, textAlign: "center",
            boxShadow: m.unlocked ? "none" : MP_C.shadowSm,
            opacity: m.unlocked ? 1 : 0.9,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: m.unlocked ? MP_C.mint : MP_C.bgInset, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
              {m.unlocked
                ? <I.Check size={18} color={MP_C.mintDeep} strokeWidth={3}/>
                : <I.Lock  size={15} color={MP_C.textMuted} strokeWidth={2.4}/>}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: m.unlocked ? MP_C.text : MP_C.textLight }}>{m.label}</div>
            <div className="mp-num" style={{ fontSize: 10.5, color: MP_C.textMuted, marginTop: 4, fontWeight: 500 }}>{m.date}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginBottom: 12 }}>Recent absences &amp; tardies</div>
      <MPCard>
        {MP_ATT.recent.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 2fr", gap: 18, alignItems: "center", padding: "14px 0", borderTop: i === 0 ? "none" : `1px solid ${MP_C.bgInset}` }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: MP_C.text }}>{r.day} · {r.date}</div>
            </div>
            <div>
              <MPPill palette={r.type === "absent" ? "rose" : "yellow"} icon={r.type === "absent" ? "AlertCircle" : "Clock"}>
                {r.type === "absent" ? "Absent" : "Tardy"}
              </MPPill>
            </div>
            <div style={{ fontSize: 12.5, color: MP_C.textLight }}>{r.note}</div>
          </div>
        ))}
      </MPCard>
    </div>
  );
}

/* ============================================================ */
/* Tab: Report Card                                             */
/* ============================================================ */

function MPReportCardTab() {
  const [period, setPeriod] = useState(MP_REPORT_CARDS[0].id);
  const card = MP_REPORT_CARDS.find(c => c.id === period);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 4, background: MP_C.bgInset, padding: 4, borderRadius: 999 }}>
          {MP_REPORT_CARDS.map(c => (
            <button key={c.id} onClick={() => setPeriod(c.id)}
                    style={{
                      fontSize: 12.5, fontWeight: 600,
                      background: period === c.id ? MP_C.bgCard : "transparent",
                      color: period === c.id ? MP_C.text : MP_C.textLight,
                      border: "none",
                      padding: "8px 18px", borderRadius: 999, cursor: "pointer",
                      boxShadow: period === c.id ? MP_C.shadowSm : "none",
                      transition: "all 180ms ease",
                    }}>{c.period}</button>
          ))}
        </div>
        <button className="mp-ghost" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: MP_C.text, background: MP_C.bgInset, border: "none", borderRadius: 14, padding: "10px 16px", cursor: "pointer" }}>
          <I.Download size={14} strokeWidth={2.4} color={MP_C.text}/> Download PDF
        </button>
      </div>

      <MPCard padding={36} radius={28}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingBottom: 20, borderBottom: `2px solid ${MP_C.bgInset}` }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted }}>{card.period} report card</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: MP_C.text, marginTop: 6, fontFamily: FRED }}>{MP_STUDENT.fullName}</div>
            <div style={{ fontSize: 13, color: MP_C.textLight, marginTop: 2, fontWeight: 500 }}>{MP_STUDENT.grade} · {MP_STUDENT.school}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="mp-num" style={{ fontSize: 12, color: MP_C.textMuted, fontWeight: 500 }}>Issued {card.issued}</div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted, marginTop: 14 }}>Cumulative GPA</div>
            <div className="mp-num" style={{ fontSize: 36, fontWeight: 700, color: MP_C.text, lineHeight: 1 }}>{card.gpa.toFixed(2)}</div>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.8fr 0.6fr 0.9fr 0.9fr 2.2fr",
            padding: "12px 0",
            fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: "uppercase", color: MP_C.textMuted,
            borderBottom: `1px solid ${MP_C.bgInset}`,
          }}>
            <div>Course</div><div>Grade</div><div>Conduct</div><div>Effort</div><div>Teacher comment</div>
          </div>
          {card.classes.map((cls, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1.8fr 0.6fr 0.9fr 0.9fr 2.2fr",
              padding: "20px 0",
              borderBottom: i === card.classes.length - 1 ? "none" : `1px solid ${MP_C.bgInset}`,
              alignItems: "flex-start",
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: MP_C.text, fontFamily: FRED }}>{cls.course}</div>
                <div style={{ fontSize: 12, color: MP_C.textMuted, marginTop: 2, fontWeight: 500 }}>{cls.teacher}</div>
              </div>
              <div className="mp-num" style={{ fontSize: 26, fontWeight: 700, color: MP_C.text, lineHeight: 1 }}>{cls.grade}</div>
              <div style={{ fontSize: 13, color: MP_C.text, fontWeight: 500 }}>{cls.conduct}</div>
              <div style={{ fontSize: 13, color: MP_C.text, fontWeight: 500 }}>{cls.effort}</div>
              <div style={{ fontSize: 13.5, color: MP_C.textLight, lineHeight: 1.5 }}>{cls.comment}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 20, borderTop: `1px solid ${MP_C.bgInset}`, fontSize: 11.5, color: MP_C.textMuted, gap: 24, flexWrap: "wrap", fontWeight: 500 }}>
          <div>This is an official record of academic standing. Subject to district FERPA policy.</div>
          <div>Generated from SIS · {MP_STUDENT.school}</div>
        </div>
      </MPCard>

      {/* Previous school years */}
      <div style={{ marginTop: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: MP_C.text, fontFamily: FRED }}>Previous school years</h2>
            <div style={{ fontSize: 13, color: MP_C.textLight, marginTop: 4 }}>Final report cards from earlier years — opens read-only.</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {MP_PRIOR_YEARS.map(y => <MPPriorYearCard key={y.id} year={y}/>)}
        </div>
      </div>
    </div>
  );
}

function MPPriorYearCard({ year }) {
  return (
    <div className="mp-card-btn" style={{
      background: MP_C.bgCard,
      borderRadius: 20, padding: 22,
      boxShadow: MP_C.shadowSm,
      cursor: "pointer",
      display: "flex", flexDirection: "column", gap: 14,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: MP_C.text, fontFamily: FRED, lineHeight: 1.15 }}>{year.year}</div>
          <div style={{ fontSize: 12.5, color: MP_C.textMuted, fontWeight: 500, marginTop: 2 }}>{year.grade}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 0.6, textTransform: "uppercase", color: MP_C.textMuted }}>Final GPA</div>
          <div className="mp-num" style={{ fontSize: 26, fontWeight: 700, color: MP_C.text, lineHeight: 1, marginTop: 2 }}>{year.finalGPA.toFixed(2)}</div>
        </div>
      </div>
      {/* Compact grade list */}
      <div style={{ background: MP_C.bgInset, borderRadius: 12, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 6 }}>
        {year.summary.map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12.5 }}>
            <span style={{ color: MP_C.text, fontWeight: 500 }}>{row.course}</span>
            <span className="mp-num" style={{ color: MP_C.textLight, fontWeight: 700 }}>{row.grade}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 6, borderTop: `1px solid ${MP_C.bgInset}` }}>
        <span className="mp-num" style={{ fontSize: 11.5, color: MP_C.textMuted, fontWeight: 500 }}>Issued {year.issued}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 600, color: MP_C.skyDeep }}>
          View <I.ArrowUpRight size={13} strokeWidth={2.4} color={MP_C.skyDeep}/>
        </span>
      </div>
    </div>
  );
}

/* ============================================================ */
/* Root                                                         */
/* ============================================================ */

const MP_TABS = [
  { id: "badges",      label: "Badges & Goals", emoji: "🏆" },
  { id: "grades",      label: "Grades",         emoji: "📊" },
  { id: "progress",    label: "Progress Report", emoji: "💬" },
  { id: "assessments", label: "Assessments",    emoji: "📈" },
  { id: "attendance",  label: "Attendance",     emoji: "🔥" },
  { id: "reportcard",  label: "Report Card",    emoji: "📄" },
];

// Portfolio-style underline tab nav — full bleed across the page.
function MPTabNav({ tabs, active, onChange }) {
  return (
    <div style={{
      display: "flex", gap: 0,
      borderBottom: `2px solid ${MP_C.bgInset}`,
      paddingLeft: 20,
      overflowX: "auto",
      background: MP_C.bg,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)}
                style={{
                  padding: "14px 18px",
                  fontSize: 14,
                  fontWeight: active === t.id ? 600 : 500,
                  fontFamily: FRED,
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: active === t.id ? MP_C.text : MP_C.textLight,
                  borderBottom: active === t.id ? `3px solid ${MP_C.mint}` : "3px solid transparent",
                  marginBottom: -2,
                  whiteSpace: "nowrap",
                  transition: "all 200ms ease",
                }}>{t.label}</button>
      ))}
    </div>
  );
}

function MyProgressApp({ segments, navigate }) {
  const initialTab = (segments && segments[1] && MP_TABS.some(t => t.id === segments[1])) ? segments[1] : "badges";
  const [tab, setTab] = useState(initialTab);
  const [activeBadge, setActiveBadge]   = useState(null);
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(null);
  return (
    <div className="mp-root fade-in" style={{ background: MP_C.bg, minHeight: "100vh" }}>
      <MPGlobalStyle/>

      {/* Page title — flush left, full width, no center constraint */}
      <div style={{ padding: "32px 40px 0 40px", background: MP_C.bg }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: MP_C.text, marginBottom: 4, fontFamily: FRED }}>
          My Progress
        </div>
        <div style={{ fontSize: 14, color: MP_C.textLight, marginBottom: 20 }}>
          How {MP_STUDENT.period} is going — your badges, grades, attendance, and on-track-for-graduation snapshot.
        </div>
      </div>

      <MPTabNav tabs={MP_TABS} active={tab} onChange={setTab}/>

      {/* Tab content — each tab gets full-width padding, no max-width cap */}
      <div style={{ padding: "40px 40px 80px" }}>
        {tab === "badges"      && <MPBadgesAndGoalsTab onOpenBadge={setActiveBadge} onCreateGoal={() => setCreatingGoal(true)} onUpdateGoal={setUpdatingGoal}/>}
        {tab === "grades"      && <MPGradesTab/>}
        {tab === "progress"    && <MPProgressReportTab/>}
        {tab === "assessments" && <MPAssessmentResultsTab/>}
        {tab === "attendance"  && <MPAttendanceTab/>}
        {tab === "reportcard"  && <MPReportCardTab/>}

        <footer style={{ marginTop: 80, paddingTop: 24, borderTop: `1px solid ${MP_C.bgInset}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", fontSize: 11.5, color: MP_C.textMuted, fontWeight: 500 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <I.Shield size={14} color={MP_C.textMuted} strokeWidth={2}/>
            Only you can see this page — your academic record is protected under FERPA.
          </div>
          <div>{MP_STUDENT.school} · Student Information System</div>
        </footer>
      </div>

      {activeBadge  ? <MPBadgeModal       badge={activeBadge}  onClose={() => setActiveBadge(null)} /> : null}
      {creatingGoal ? <MPGoalCreateModal                       onClose={() => setCreatingGoal(false)} /> : null}
      {updatingGoal ? <MPGoalUpdateModal  goal={updatingGoal}  onClose={() => setUpdatingGoal(null)} /> : null}
    </div>
  );
}

/* ─── EXPORTS ──────────────────────────────────────────────────────── */

window.MyProgressApp  = MyProgressApp;
window.MyProgressPage = MyProgressApp; // legacy alias
window["renderRoute_my-progress"] = ({ segments, navigate, tweaks }) =>
  <MyProgressApp segments={segments} navigate={navigate}/>;

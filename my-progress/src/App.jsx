import React, { useState, useMemo } from "react";
import {
  Award, Target, BookOpen, FileText, BarChart3, Calendar, GraduationCap,
  TrendingUp, TrendingDown, Minus, Check, AlertCircle, Clock, ChevronRight,
  ChevronDown, Plus, Trophy, Sparkles, Star, Flame, Zap, Heart, Users,
  Lightbulb, ArrowUpRight, MessageSquare, Filter, Download, ShieldCheck,
  Info, X, BookMarked, MapPin, Pencil, Quote, ArrowLeft, ArrowRight, Lock,
  Compass
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

/* ============================================================ */
/* Design tokens                                                */
/* ============================================================ */

const C = {
  // Surfaces
  bg:        "#FAF6EE",
  bgCard:    "#FFFFFF",
  bgSubtle:  "#F2ECDE",
  bgTinted:  "#F7F1E3",
  // Text
  ink:       "#1E1916",
  inkLight:  "#5A5048",
  inkMuted:  "#9A8E80",
  // Borders
  line:      "#E8DFCC",
  lineDark:  "#D6CAB1",
  // Accent
  accent:     "#B8451F",
  accentSoft: "#FBE8DA",
  // Semantic
  gold:      "#8C6510",
  goldSoft:  "#F6E5BC",
  forest:    "#2A5A40",
  forestSoft:"#DDEBDC",
  wine:      "#762A3C",
  wineSoft:  "#F0D9DE",
  sky:       "#27536D",
  skySoft:   "#D8E5EC",
  warn:      "#9C6520",
  warnSoft:  "#F5E5C9",
};

const F = {
  display: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  body:    '"DM Sans", -apple-system, system-ui, sans-serif',
  mono:    '"JetBrains Mono", "SF Mono", Menlo, monospace',
};

// palette[name] -> { fg, bg, soft } for badges/quests/pills
const PAL = {
  gold:   { fg: C.gold,     bg: C.goldSoft,   soft: C.goldSoft   },
  forest: { fg: C.forest,   bg: C.forestSoft, soft: C.forestSoft },
  wine:   { fg: C.wine,     bg: C.wineSoft,   soft: C.wineSoft   },
  sky:    { fg: C.sky,      bg: C.skySoft,    soft: C.skySoft    },
  accent: { fg: C.accent,   bg: C.accentSoft, soft: C.accentSoft },
  warn:   { fg: C.warn,     bg: C.warnSoft,   soft: C.warnSoft   },
  gray:   { fg: C.inkLight, bg: C.bgSubtle,   soft: C.bgSubtle   },
};

const palOf = (name) => PAL[name] || PAL.gray;

/* ============================================================ */
/* Global styles (fonts + interactions)                         */
/* ============================================================ */

const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');

    body { font-family: ${F.body}; color: ${C.ink}; background: ${C.bg}; }

    .mp-tab-btn { transition: background 200ms ease, color 200ms ease; }
    .mp-tab-btn:hover:not([data-active="true"]) { background: ${C.bgSubtle}; }

    .mp-badge-card { transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease; }
    .mp-badge-card:hover { transform: translateY(-2px); border-color: ${C.lineDark}; box-shadow: 0 6px 18px -10px rgba(30,25,22,0.18); }

    .mp-ghost-btn { transition: background 180ms ease, border-color 180ms ease; }
    .mp-ghost-btn:hover { background: ${C.bgSubtle}; border-color: ${C.lineDark}; }

    .mp-progress-fill { transition: width 400ms ease; }

    .mp-overlay { animation: mp-fade-in 150ms ease; }
    @keyframes mp-fade-in { from { opacity: 0 } to { opacity: 1 } }

    .mp-class-row { transition: background 150ms ease; }
    .mp-class-row:hover { background: ${C.bgTinted}; }

    .mp-pip { transition: width 200ms ease, background 200ms ease; }

    /* Scrollbar (subtle) */
    ::-webkit-scrollbar { width: 10px; height: 10px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: ${C.lineDark}; border-radius: 999px; border: 2px solid ${C.bg}; }
  `}</style>
);

/* ============================================================ */
/* Mock data                                                    */
/* ============================================================ */

const student = {
  name: "Jordan Rivera",
  grade: "10th Grade",
  school: "Lincoln High School",
  year: "2025–2026",
  period: "Quarter 3",
  gpa: 3.74,
  gpaTrend: 0.06,
};

const yearStats = {
  level: 7,
  levelTitle: "Honored Scholar",
  xp: 3420,
  nextLevelXP: 4000,
  stats: {
    badges: 8,
    booksRead: 9,
    streakDays: 12,
    onTimePct: 78,
    goalsCompleted: 6,
  },
};

const badges = [
  {
    id: 1,
    name: "Voice of Reason",
    category: "Citizenship",
    date: "Mar 30",
    teacher: "Mr. Chen",
    icon: Heart,
    palette: "forest",
    description: "Thoughtful contribution in class discussions.",
    moments: [
      { date: "Mar 30", teacher: "Mr. Chen",
        note: "Your point about how Atticus was wrestling with his own privilege showed real maturity. The discussion shifted because of you." },
      { date: "Mar 21", teacher: "Mr. Chen",
        note: "When Sarah challenged your reading of the chapter, you didn't get defensive — you actually changed your mind out loud. That's the hardest skill." },
      { date: "Feb 14", teacher: "Mr. Chen",
        note: "You pulled three quieter classmates into the Socratic seminar by asking them direct, specific questions. Watching you do that on purpose was lovely." },
    ],
  },
  {
    id: 2,
    name: "Deep Diver",
    category: "Academic",
    date: "Apr 18",
    teacher: "Dr. Ahmed",
    icon: Compass,
    palette: "sky",
    description: "Research that went beyond the assignment.",
    moments: [
      { date: "Apr 18", teacher: "Dr. Ahmed",
        note: "Your chemistry write-up cited two primary sources I didn't assign. The discussion of catalyst surface area was college-level — keep pulling at threads." },
      { date: "Feb 06", teacher: "Dr. Ahmed",
        note: "You asked three follow-up questions during lab that the rest of the room hadn't thought to ask yet. That's the instinct of a scientist." },
    ],
  },
  {
    id: 3,
    name: "Steady Hand",
    category: "Effort",
    date: "Apr 02",
    teacher: "Ms. Patel",
    icon: Target,
    palette: "accent",
    description: "Consistent on-time submission across all classes.",
    moments: [
      { date: "Apr 02", teacher: "Ms. Patel",
        note: "Six weeks of every homework in on time. That's not luck — that's a system you've built. Tell other students how you do it." },
    ],
  },
  {
    id: 4,
    name: "Bright Spark",
    category: "Academic",
    date: "Mar 12",
    teacher: "Ms. Lee",
    icon: Lightbulb,
    palette: "gold",
    description: "Recognized for an exceptional insight.",
    moments: [
      { date: "Mar 12", teacher: "Ms. Lee",
        note: "Your reframing of the Versailles question as 'who pays for the peace' was the kind of thing AP graders look for. I'm using your phrasing next year." },
    ],
  },
  {
    id: 5,
    name: "Reading Marathon",
    category: "Milestone",
    date: "Apr 10",
    teacher: "Ms. Hartley",
    icon: BookMarked,
    palette: "wine",
    description: "Completed 50 books this academic year.",
    moments: [
      { date: "Apr 10", teacher: "Ms. Hartley",
        note: "Book #50 — and what a book to land on. Your reading log this year is genuinely remarkable." },
    ],
    milestones: [
      { label: "Book #10 — first milestone", date: "Oct 24, 2025" },
      { label: "Book #25 — halfway", date: "Jan 12, 2026" },
      { label: "Book #50 — Marathon unlocked", date: "Apr 10, 2026" },
    ],
  },
  {
    id: 6,
    name: "Quiet Leader",
    category: "Citizenship",
    date: "Feb 28",
    teacher: "Coach Martinez",
    icon: Users,
    palette: "forest",
    description: "Lifts others up without seeking the spotlight.",
    moments: [
      { date: "Feb 28", teacher: "Coach Martinez",
        note: "You spent your lunch helping Diego catch up on three labs. He'd never have asked you — you offered. That's leadership." },
      { date: "Jan 19", teacher: "Coach Martinez",
        note: "When the group project was about to fall apart, you re-divided the work in a way that played to everyone's strengths. Quiet, but decisive." },
    ],
  },
  {
    id: 7,
    name: "Curious Mind",
    category: "Academic",
    date: "Jan 24",
    teacher: "Dr. Ahmed",
    icon: Sparkles,
    palette: "sky",
    description: "Asks the questions that move discussions forward.",
    moments: [
      { date: "Jan 24", teacher: "Dr. Ahmed",
        note: "The question 'but what would happen if the reaction ran backwards' opened the door to next week's lab. You think like a chemist." },
    ],
  },
  {
    id: 8,
    name: "Finishing Strong",
    category: "Effort",
    date: "Dec 19",
    teacher: "Ms. Patel",
    icon: Trophy,
    palette: "gold",
    description: "Closed out Quarter 2 with every assignment turned in.",
    moments: [
      { date: "Dec 19", teacher: "Ms. Patel",
        note: "Last day of the quarter and your assignment ledger is spotless. That takes intention — not just talent." },
    ],
  },
];

const lockedBadges = [
  { id: 101, name: "Honor Roll", category: "Academic", icon: Award, palette: "gold",
    criteria: "Earn all A and A− grades for a full quarter.",
    description: "All quarter grades at A− or above." },
  { id: 102, name: "Streak Keeper", category: "Effort", icon: Flame, palette: "accent",
    criteria: "Submit assignments on time for 30 consecutive days.",
    description: "Sustained reliability across all classes." },
  { id: 103, name: "Polyglot", category: "Academic", icon: MessageSquare, palette: "sky",
    criteria: "Reach Proficient or above in a Spanish III oral assessment.",
    description: "Strong communication in a second language." },
  { id: 104, name: "Mystery badge", category: "???", icon: Sparkles, palette: "wine",
    mystery: true,
    criteria: "Keep showing up — you'll know when you've earned it.",
    description: "???" },
];

const goals = [
  {
    id: 1, title: "Raise English grade to A−",
    category: "Grade", setBy: "Self-set",
    target: 90, current: 86, unit: "%",
    due: "Jun 12",
    tracking: "auto",
    source: "English Literature gradebook",
  },
  {
    id: 2, title: "Read 12 books this quarter",
    category: "Reading", setBy: "Self-set",
    target: 12, current: 9, unit: "books",
    due: "Jun 4",
    tracking: "self",
    source: "Your reading log",
    lastLog: { title: "Project Hail Mary", date: "May 18", count: 9 },
  },
  {
    id: 3, title: "Submit every assignment on time",
    category: "Habit", setBy: "Self-set",
    target: 100, current: 78, unit: "%",
    due: "Ongoing",
    tracking: "auto",
    source: "Missing-assignment tracker across all classes",
  },
  {
    id: 4, title: "Improve SBAC Math by one level",
    category: "Assessment", setBy: "Mr. Okafor",
    target: 100, current: 65, unit: "% to target",
    due: "Spring 2026",
    tracking: "teacher",
    source: "Mr. Okafor updates based on practice assessments",
  },
];

const quests = [
  {
    id: 1, title: "Perfect Submission Week",
    description: "Submit every assignment on time for 5 school days in a row.",
    progress: 3, target: 5,
    daysLeft: 2, deadline: "May 27",
    issuedBy: "System",
    palette: "forest", icon: Check,
    standardReward: { name: "Reliability badge", detail: "Earned on completion" },
    bonusReward: {
      name: "Sharp Eye badge + 50 XP",
      detail: "If at least 2 submissions are 24+ hours early",
    },
  },
  {
    id: 2, title: "Ms. Patel's Math Marathon",
    description: "Complete three practice problem sets at 80%+ before next test.",
    progress: 2, target: 3,
    daysLeft: 6, deadline: "Jun 02",
    issuedBy: "Ms. Patel",
    palette: "accent", icon: Zap,
    standardReward: { name: "Math Streak badge", detail: "Earned on completion" },
    bonusReward: {
      name: "Gold Streak — Distinction",
      detail: "If all three scores reach 95% or above",
    },
  },
  {
    id: 3, title: "Read Across the World",
    description: "Read one book by an author from a continent you haven't read this year.",
    progress: 1, target: 3,
    daysLeft: 14, deadline: "Jun 10",
    issuedBy: "Ms. Hartley",
    palette: "sky", icon: BookOpen,
    standardReward: { name: "Global Reader badge", detail: "Earned on completion" },
    bonusReward: {
      name: "Reflective Reader badge",
      detail: "If you write a short reflection on each book",
    },
  },
];

const classes = [
  {
    id: "alg", name: "Algebra II", teacher: "Ms. Patel",
    room: "B204", period: "1",
    grade: "A−", percentage: 91, trend: 2, credits: 1.0,
    categories: [
      { name: "Tests", weight: 40, average: 89 },
      { name: "Quizzes", weight: 20, average: 92 },
      { name: "Homework", weight: 25, average: 95 },
      { name: "Participation", weight: 15, average: 88 },
    ],
    assignments: [
      { name: "Unit 7 Test: Quadratics", category: "Tests", date: "May 16", score: 92, total: 100, status: "graded" },
      { name: "Quiz 7.2: Vertex form", category: "Quizzes", date: "May 12", score: 18, total: 20, status: "graded" },
      { name: "Worksheet 7.3", category: "Homework", date: "May 9", score: null, total: 10, status: "missing" },
      { name: "Worksheet 7.2", category: "Homework", date: "May 5", score: 10, total: 10, status: "graded" },
      { name: "Participation: Week 32", category: "Participation", date: "May 2", score: 9, total: 10, status: "graded" },
    ],
  },
  {
    id: "eng", name: "English Literature", teacher: "Mr. Chen",
    room: "C108", period: "2",
    grade: "B+", percentage: 86, trend: 1, credits: 1.0,
    categories: [
      { name: "Essays", weight: 45, average: 84 },
      { name: "Reading checks", weight: 20, average: 90 },
      { name: "Discussions", weight: 20, average: 92 },
      { name: "Vocab", weight: 15, average: 86 },
    ],
    assignments: [
      { name: "Mockingbird Essay (Draft 2)", category: "Essays", date: "May 14", score: 86, total: 100, status: "graded" },
      { name: "Chapter 22 reading check", category: "Reading checks", date: "May 8", score: 9, total: 10, status: "graded" },
      { name: "Socratic seminar — Ch. 18–24", category: "Discussions", date: "May 6", score: 19, total: 20, status: "graded" },
      { name: "Vocab quiz: Unit 11", category: "Vocab", date: "Apr 30", score: 17, total: 20, status: "graded" },
    ],
  },
  {
    id: "chm", name: "Chemistry", teacher: "Dr. Ahmed",
    room: "S301", period: "3",
    grade: "A", percentage: 94, trend: 3, credits: 1.0,
    categories: [
      { name: "Labs", weight: 35, average: 96 },
      { name: "Tests", weight: 35, average: 92 },
      { name: "Quizzes", weight: 20, average: 93 },
      { name: "Notebook", weight: 10, average: 95 },
    ],
    assignments: [
      { name: "Reaction rates — lab write-up", category: "Labs", date: "May 15", score: 47, total: 50, status: "graded" },
      { name: "Equilibrium quiz", category: "Quizzes", date: "May 11", score: 19, total: 20, status: "graded" },
      { name: "Unit 6 Test", category: "Tests", date: "May 5", score: 92, total: 100, status: "graded" },
      { name: "Lab notebook check", category: "Notebook", date: "Apr 28", score: 10, total: 10, status: "graded" },
    ],
  },
  {
    id: "hst", name: "World History", teacher: "Ms. Lee",
    room: "C201", period: "4",
    grade: "A−", percentage: 90, trend: 0, credits: 1.0,
    categories: [
      { name: "Essays", weight: 35, average: 88 },
      { name: "Tests", weight: 30, average: 91 },
      { name: "Document analyses", weight: 25, average: 92 },
      { name: "Participation", weight: 10, average: 90 },
    ],
    assignments: [
      { name: "Versailles DBQ", category: "Document analyses", date: "May 13", score: 23, total: 25, status: "graded" },
      { name: "Unit 8 Test", category: "Tests", date: "May 6", score: 90, total: 100, status: "graded" },
      { name: "Interwar essay draft", category: "Essays", date: "Apr 29", score: 86, total: 100, status: "graded" },
    ],
  },
  {
    id: "spn", name: "Spanish III", teacher: "Sr. Ortega",
    room: "L112", period: "5",
    grade: "B−", percentage: 80, trend: -1, credits: 1.0,
    categories: [
      { name: "Oral", weight: 30, average: 76 },
      { name: "Writing", weight: 30, average: 82 },
      { name: "Listening", weight: 20, average: 80 },
      { name: "Quizzes", weight: 20, average: 84 },
    ],
    assignments: [
      { name: "Diálogo: viaje imaginario", category: "Oral", date: "May 12", score: 14, total: 20, status: "graded" },
      { name: "Composición: mi pueblo", category: "Writing", date: "May 7", score: 80, total: 100, status: "graded" },
      { name: "Listening quiz — Capítulo 9", category: "Listening", date: "May 1", score: null, total: 20, status: "missing" },
      { name: "Vocab quiz — Capítulo 9", category: "Quizzes", date: "Apr 26", score: 17, total: 20, status: "graded" },
    ],
  },
  {
    id: "art", name: "Visual Arts", teacher: "Ms. Hartley",
    room: "A105", period: "6",
    grade: "A", percentage: 95, trend: 1, credits: 0.5,
    categories: [
      { name: "Projects", weight: 60, average: 96 },
      { name: "Sketchbook", weight: 25, average: 94 },
      { name: "Critiques", weight: 15, average: 92 },
    ],
    assignments: [
      { name: "Self-portrait in graphite", category: "Projects", date: "May 14", score: 96, total: 100, status: "graded" },
      { name: "Sketchbook check #6", category: "Sketchbook", date: "May 7", score: 24, total: 25, status: "graded" },
      { name: "Critique: Renaissance pairings", category: "Critiques", date: "Apr 30", score: 18, total: 20, status: "graded" },
    ],
  },
];

const overallTrend = [
  { week: "W1", gpa: 3.62 },
  { week: "W2", gpa: 3.64 },
  { week: "W3", gpa: 3.68 },
  { week: "W4", gpa: 3.68 },
  { week: "W5", gpa: 3.71 },
  { week: "W6", gpa: 3.72 },
  { week: "W7", gpa: 3.74 },
];

const readingLog = [
  { id: 9, title: "Project Hail Mary",    author: "Andy Weir",            date: "May 18", rating: 5 },
  { id: 8, title: "Pachinko",             author: "Min Jin Lee",          date: "May 02", rating: 5 },
  { id: 7, title: "Educated",             author: "Tara Westover",        date: "Apr 19", rating: 4 },
  { id: 6, title: "The Poppy War",        author: "R. F. Kuang",          date: "Apr 04", rating: 4 },
  { id: 5, title: "Klara and the Sun",    author: "Kazuo Ishiguro",       date: "Mar 21", rating: 5 },
];

const progressReport = {
  period: "Quarter 3, Mid-Term Interim",
  date: "May 8, 2026",
  classes: [
    { name: "Algebra II", teacher: "Ms. Patel", standing: "A−", trend: "improving",
      concern: false,
      comment: "Jordan's command of quadratic functions is excellent. The next stretch — modeling problems from word context — is where I'd love to see another gear." },
    { name: "English Literature", teacher: "Mr. Chen", standing: "B+", trend: "improving",
      concern: false,
      comment: "Discussion contributions have been some of the best in the class. The essay revisions are catching up — keep submitting drafts a few days early." },
    { name: "Chemistry", teacher: "Dr. Ahmed", standing: "A", trend: null,
      concern: false,
      comment: "Lab write-ups are college-level. Jordan asks the kind of follow-up questions that move the whole class forward." },
    { name: "World History", teacher: "Ms. Lee", standing: "A−", trend: null,
      concern: false,
      comment: "Strong document analysis. The Versailles DBQ was a standout this quarter." },
    { name: "Spanish III", teacher: "Sr. Ortega", standing: "B−", trend: "concern",
      concern: true,
      comment: "Listening and speaking are the growing edges. I'd recommend 10 minutes of Spanish-language podcast time three days a week — small, daily reps." },
    { name: "Visual Arts", teacher: "Ms. Hartley", standing: "A", trend: "improving",
      concern: false,
      comment: "The self-portrait is the strongest piece in the class. Push into longer studies next quarter — you're ready for them." },
  ],
  history: [
    { id: "q2", label: "Quarter 2 Interim", date: "Feb 6, 2026" },
    { id: "q1", label: "Quarter 1 Interim", date: "Oct 24, 2025" },
  ],
};

const benchmarks = {
  windows: ["Fall '25", "Winter '26", "Spring '26"],
  subjects: [
    { name: "Reading", metric: "RIT Scale Score",
      results: [
        { window: "Fall '25",   score: 222, percentile: 78, level: "Above" },
        { window: "Winter '26", score: 228, percentile: 82, level: "Above" },
        { window: "Spring '26", score: 234, percentile: 86, level: "Above" },
      ] },
    { name: "Math", metric: "RIT Scale Score",
      results: [
        { window: "Fall '25",   score: 218, percentile: 65, level: "Proficient" },
        { window: "Winter '26", score: 221, percentile: 68, level: "Proficient" },
        { window: "Spring '26", score: 226, percentile: 72, level: "Proficient" },
      ] },
  ],
};

const stateResults = [
  { year: "2025–2026", grade: "10th Grade",
    ela:  { score: 2645, level: 4, levelLabel: "Exceeded" },
    math: { score: 2598, level: 3, levelLabel: "Met" } },
  { year: "2024–2025", grade: "9th Grade",
    ela:  { score: 2612, level: 3, levelLabel: "Met" },
    math: { score: 2570, level: 3, levelLabel: "Met" } },
  { year: "2023–2024", grade: "8th Grade",
    ela:  { score: 2570, level: 3, levelLabel: "Met" },
    math: { score: 2540, level: 2, levelLabel: "Nearly Met" } },
];

const credentials = {
  totalEarned: 16,
  totalRequired: 24,
  requirements: [
    { name: "English", earned: 3, required: 4, courses: ["English 9", "English 10", "English Lit (in progress)"] },
    { name: "Mathematics", earned: 3, required: 4, courses: ["Algebra I", "Geometry", "Algebra II (in progress)"] },
    { name: "Science", earned: 2, required: 3, courses: ["Biology", "Chemistry (in progress)"] },
    { name: "Social Studies", earned: 2, required: 3, courses: ["World History (in progress)", "US History"] },
    { name: "World Language", earned: 2, required: 2, courses: ["Spanish I", "Spanish II"] },
    { name: "Arts", earned: 1, required: 1, courses: ["Visual Arts"] },
    { name: "PE / Health", earned: 2, required: 2, courses: ["PE 9", "Health"] },
    { name: "Electives", earned: 1, required: 5, courses: ["Intro to CS"] },
  ],
  other: [
    { name: "Service hours", current: 28, target: 40, kind: "progress", unit: "hrs" },
    { name: "Senior project", status: "Scheduled Fall '26", kind: "status" },
    { name: "Civics requirement", status: "Not started", kind: "status" },
  ],
};

// Heatmap synthesis — 36 weeks × 5 weekdays, 'p' present, 't' tardy, 'a' absent,
// 'b' break, 'f' future. Build with a few placed tardies/absences, real breaks,
// and the last 2 weekdays of the current week (week 32) marked future.
const ATT_STATUSES = ["p","p","p","p","p"];
const attendanceHeatmap = (() => {
  const weeks = 36;
  const grid = [];
  for (let w = 0; w < weeks; w++) {
    grid.push(["p","p","p","p","p"]);
  }
  // Tardies
  grid[3][1]  = "t";   // late Sep
  grid[14][0] = "t";   // Nov
  grid[26][2] = "t";   // Mar
  // Absences
  grid[7][3]  = "a";   // Oct
  grid[22][4] = "a";   // Feb
  grid[28][1] = "a";   // Apr
  // Thanksgiving — 2-week block around week 17 (per spec; nominally last week of Nov + part of holiday window)
  for (let d = 0; d < 5; d++) { grid[16][d] = "b"; grid[17][d] = "b"; }
  // Winter break weeks 19-20
  for (let d = 0; d < 5; d++) { grid[19][d] = "b"; grid[20][d] = "b"; }
  // Spring break week 30
  for (let d = 0; d < 5; d++) { grid[30][d] = "b"; }
  // Current = week 32, mark the last 2 weekdays as future
  grid[32][3] = "f";
  grid[32][4] = "f";
  for (let w = 33; w < weeks; w++) { grid[w] = ["f","f","f","f","f"]; }
  return grid;
})();

const attendance = {
  todayDate: "Wednesday, May 27",
  todayStatus: "Present",
  todayPeriods: [
    { period: 1, class: "Algebra II",   status: "p" },
    { period: 2, class: "English Lit",  status: "p" },
    { period: 3, class: "Chemistry",    status: "p" },
    { period: 4, class: "World Hist.",  status: "p" },
    { period: 5, class: "Spanish III",  status: "p" },
    { period: 6, class: "Visual Arts",  status: "p" },
  ],
  week:  { present: 13, tardy: 0, absent: 0, total: 13, rate: 100.0 },
  month: { present: 56, tardy: 1, absent: 1, total: 58, rate: 96.6 },
  ytd:   { present: 142, tardy: 5, absent: 4, total: 151, rate: 91.6 },
  ytdRate: 91.6,
  streak: { current: 12, best: 47, bestStart: "Aug 12", bestEnd: "Oct 17, 2025" },
  heatmap: attendanceHeatmap,
  recent: [
    { date: "Apr 14, 2026", day: "Tue", type: "absent", note: "Excused — orthodontist appointment" },
    { date: "Feb 26, 2026", day: "Thu", type: "absent", note: "Excused — sick day, doctor's note on file" },
    { date: "Mar 19, 2026", day: "Thu", type: "tardy",  note: "Bus delay — 8 minutes late to Period 1" },
    { date: "Nov 12, 2025", day: "Wed", type: "tardy",  note: "Tardy to Period 1 — appointment ran long" },
    { date: "Oct 22, 2025", day: "Wed", type: "absent", note: "Excused — family event" },
  ],
};

const attendanceMilestones = [
  { label: "10 days strong",   date: "Sep 26, 2025", unlocked: true },
  { label: "30 days strong",   date: "Oct 31, 2025", unlocked: true },
  { label: "60 days strong",   date: "Jan 30, 2026", unlocked: true },
  { label: "Semester perfect", date: "Pending Q4",   unlocked: false },
  { label: "100 days strong",  date: "Coming up",    unlocked: false },
  { label: "Full year perfect",date: "Jun 12, 2026", unlocked: false },
];

const reportCards = [
  { id: "q3", period: "Quarter 3", issued: "May 22, 2026", gpa: 3.74,
    classes: [
      { course: "Algebra II", teacher: "Ms. Patel",      grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Quadratic functions mastered. Pushing into modeling next." },
      { course: "English Literature", teacher: "Mr. Chen", grade: "B+", conduct: "Excellent",   effort: "Strong",        comment: "Discussion-leader energy. Drafts coming in earlier each week." },
      { course: "Chemistry", teacher: "Dr. Ahmed",       grade: "A",  conduct: "Excellent",     effort: "Strong",        comment: "Lab work is at college level. Asks the right questions." },
      { course: "World History", teacher: "Ms. Lee",     grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Strong document analysis. Versailles DBQ stood out." },
      { course: "Spanish III", teacher: "Sr. Ortega",    grade: "B−", conduct: "Good",          effort: "Satisfactory",  comment: "Listening and speaking are the growing edges. Daily exposure recommended." },
      { course: "Visual Arts", teacher: "Ms. Hartley",   grade: "A",  conduct: "Excellent",     effort: "Strong",        comment: "Self-portrait was the strongest piece in the class." },
    ] },
  { id: "q2", period: "Quarter 2", issued: "Feb 20, 2026", gpa: 3.68,
    classes: [
      { course: "Algebra II", teacher: "Ms. Patel",      grade: "B+", conduct: "Excellent",     effort: "Strong",        comment: "Solid quarter; pushing into harder material." },
      { course: "English Literature", teacher: "Mr. Chen", grade: "B", conduct: "Excellent",    effort: "Satisfactory",  comment: "Essay revision cadence improving." },
      { course: "Chemistry", teacher: "Dr. Ahmed",       grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Steady lab notebook practice." },
      { course: "World History", teacher: "Ms. Lee",     grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Engaged in class debates." },
      { course: "Spanish III", teacher: "Sr. Ortega",    grade: "C+", conduct: "Good",          effort: "Satisfactory",  comment: "Build daily listening reps." },
      { course: "Visual Arts", teacher: "Ms. Hartley",   grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Strong observational drawing." },
    ] },
  { id: "q1", period: "Quarter 1", issued: "Nov 7, 2025", gpa: 3.61,
    classes: [
      { course: "Algebra II", teacher: "Ms. Patel",      grade: "B+", conduct: "Excellent",     effort: "Strong",        comment: "Welcome quarter — strong foundation." },
      { course: "English Literature", teacher: "Mr. Chen", grade: "B", conduct: "Excellent",    effort: "Satisfactory",  comment: "Building discussion presence." },
      { course: "Chemistry", teacher: "Dr. Ahmed",       grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Strong lab start." },
      { course: "World History", teacher: "Ms. Lee",     grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Confident essay voice." },
      { course: "Spanish III", teacher: "Sr. Ortega",    grade: "B−", conduct: "Good",          effort: "Satisfactory",  comment: "Vocabulary acquisition steady." },
      { course: "Visual Arts", teacher: "Ms. Hartley",   grade: "A−", conduct: "Excellent",     effort: "Strong",        comment: "Welcome to the studio." },
    ] },
];

/* ============================================================ */
/* Primitives                                                   */
/* ============================================================ */

const Card = ({ children, style, ...rest }) => (
  <div
    style={{
      background: C.bgCard,
      border: `1px solid ${C.line}`,
      borderRadius: 14,
      padding: 24,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
);

const SectionLabel = ({ children, style }) => (
  <div
    style={{
      fontFamily: F.body,
      fontSize: 11,
      fontWeight: 500,
      letterSpacing: 1.4,
      textTransform: "uppercase",
      color: C.inkMuted,
      marginBottom: 12,
      ...style,
    }}
  >
    {children}
  </div>
);

const Pill = ({ children, palette = "gray", small = false, icon: Icon, style }) => {
  const p = palOf(palette);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: F.body,
        fontSize: small ? 10.5 : 12,
        fontWeight: 500,
        letterSpacing: small ? 0.6 : 0.4,
        textTransform: small ? "uppercase" : "none",
        color: p.fg,
        background: p.bg,
        padding: small ? "3px 8px" : "5px 11px",
        borderRadius: 999,
        ...style,
      }}
    >
      {Icon ? <Icon size={small ? 10 : 12} strokeWidth={2} /> : null}
      {children}
    </span>
  );
};

const TrendArrow = ({ value, style }) => {
  let Icon = Minus, color = C.inkMuted;
  if (value > 0) { Icon = TrendingUp; color = C.forest; }
  else if (value < 0) { Icon = TrendingDown; color = C.wine; }
  const text = value > 0 ? `+${value}` : value < 0 ? `${value}` : "0";
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color, fontFamily: F.mono, fontSize: 12, ...style }}>
      <Icon size={13} strokeWidth={2} />
      {text}
    </span>
  );
};

const Ornament = ({ style }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "40px 0 28px", ...style }}>
    <span style={{ height: 1, width: 80, background: C.lineDark }} />
    <span style={{ width: 4, height: 4, background: C.lineDark, borderRadius: 999 }} />
    <span style={{ width: 7, height: 7, background: "transparent", border: `1px solid ${C.lineDark}`, transform: "rotate(45deg)" }} />
    <span style={{ width: 4, height: 4, background: C.lineDark, borderRadius: 999 }} />
    <span style={{ height: 1, width: 80, background: C.lineDark }} />
  </div>
);

const YearStat = ({ icon: Icon, value, label, accent }) => (
  <div style={{ textAlign: "left" }}>
    <Icon size={16} strokeWidth={1.8} color={accent ? C.goldSoft : C.lineDark} style={{ marginBottom: 8 }} />
    <div style={{ fontFamily: F.display, fontSize: 34, lineHeight: 1, color: C.bg, marginBottom: 6 }}>{value}</div>
    <div style={{ fontFamily: F.body, fontSize: 10.5, letterSpacing: 1.2, color: C.inkMuted, textTransform: "uppercase" }}>{label}</div>
  </div>
);

const MetricCard = ({ label, value, sub, palette = "gray" }) => {
  const p = palOf(palette);
  return (
    <div
      style={{
        background: p.bg,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: p.fg, fontWeight: 500, marginBottom: 10 }}>{label}</div>
      <div style={{ fontFamily: F.display, fontSize: 40, lineHeight: 1, color: C.ink, marginBottom: sub ? 8 : 0 }}>{value}</div>
      {sub ? <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkLight }}>{sub}</div> : null}
    </div>
  );
};

/* -------- BadgeMedallion -------- */

const cardinalStarPath = "M0,-2.5 L0.7,-0.7 L2.5,0 L0.7,0.7 L0,2.5 L-0.7,0.7 L-2.5,0 L-0.7,-0.7 Z";

const BadgeMedallion = ({ icon: Icon, palette = "gold", size = 64, locked = false, mystery = false }) => {
  const pal = palOf(palette);
  const fg = locked ? C.inkMuted : pal.fg;
  const bg = locked ? C.bgSubtle : pal.bg;
  const opacity = locked ? 0.55 : 1;
  // 12 dots around perimeter
  const dots = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(a) * 47;
    const y = 50 + Math.sin(a) * 47;
    const r = i % 3 === 0 ? 1.8 : 1.1;
    dots.push(<circle key={`d${i}`} cx={x} cy={y} r={r} fill={fg} opacity={0.6 * opacity} />);
  }
  // 4 cardinal stars
  const stars = [];
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(a) * 38;
    const y = 50 + Math.sin(a) * 38;
    stars.push(
      <g key={`s${i}`} transform={`translate(${x}, ${y})`}>
        <path d={cardinalStarPath} fill={fg} opacity={0.75 * opacity} />
      </g>
    );
  }
  const iconSize = size * 0.38;
  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {dots}
        <circle cx={50} cy={50} r={42} fill="none" stroke={fg} strokeWidth={0.6} opacity={0.4 * opacity} />
        {stars}
        <circle cx={50} cy={50} r={33} fill={bg} />
        <circle cx={50} cy={50} r={33} fill="none" stroke={fg} strokeWidth={0.8} opacity={0.55 * opacity} />
        <circle cx={50} cy={50} r={29} fill="none" stroke={fg} strokeWidth={0.4} opacity={0.35 * opacity} />
      </svg>
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: fg,
          opacity: opacity,
        }}
      >
        {mystery ? (
          <span style={{ fontFamily: F.display, fontStyle: "italic", fontSize: size * 0.42, color: fg }}>?</span>
        ) : (
          <Icon size={iconSize} strokeWidth={1.5} color={fg} />
        )}
      </div>
    </div>
  );
};

/* -------- Constellation backdrop (deterministic positions) -------- */

const Constellation = () => {
  // ~24 stars (x, y, r) in viewBox 0..400 x 0..280
  const stars = [
    [22, 30, 1.0], [55, 56, 0.7], [78, 22, 1.3],
    [110, 92, 1.0], [130, 38, 0.8], [160, 70, 1.4],
    [190, 110, 0.9], [205, 36, 1.0], [225, 175, 0.7],
    [240, 88, 1.2], [260, 130, 0.8], [280, 50, 1.0],
    [300, 200, 1.0], [318, 90, 1.5], [338, 140, 0.7],
    [355, 60, 1.0], [368, 200, 0.9], [380, 110, 1.3],
    [60, 200, 0.8], [88, 250, 1.0], [140, 220, 0.7],
    [200, 240, 1.2], [260, 260, 0.8], [365, 250, 1.0],
  ];
  // 8 connection sets — pairs of star indices
  const lines = [
    [2, 4], [4, 5], [5, 9], [9, 11],
    [13, 15], [15, 17], [12, 14], [21, 22],
  ];
  // Feature star (8-point asterisk) at 85%, 70% → (340, 196)
  const feature = (cx, cy, r) => {
    const path = [];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      path.push(`M ${cx} ${cy} L ${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}`);
    }
    return path.join(" ");
  };
  return (
    <svg
      viewBox="0 0 400 280"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, pointerEvents: "none" }}
    >
      {lines.map(([a, b], i) => {
        const s1 = stars[a], s2 = stars[b];
        return <line key={`ln${i}`} x1={s1[0]} y1={s1[1]} x2={s2[0]} y2={s2[1]} stroke={C.bg} strokeWidth={0.4} opacity={0.5} />;
      })}
      {stars.map((s, i) => (
        <circle key={`st${i}`} cx={s[0]} cy={s[1]} r={s[2]} fill={C.bg} />
      ))}
      {/* Feature star — big 8-point */}
      <path d={feature(340, 196, 7)} stroke={C.goldSoft} strokeWidth={0.9} fill="none" />
      <circle cx={340} cy={196} r={1.4} fill={C.goldSoft} />
      {/* Accent star earlier */}
      <path d={feature(100, 60, 4)} stroke={C.goldSoft} strokeWidth={0.7} fill="none" opacity={0.85} />
      <circle cx={100} cy={60} r={1} fill={C.goldSoft} />
    </svg>
  );
};

/* ============================================================ */
/* Modal shell                                                  */
/* ============================================================ */

const ModalShell = ({ onClose, children, maxWidth = 720 }) => (
  <div
    onClick={onClose}
    className="mp-overlay"
    style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(30,25,22,0.55)",
      display: "flex", alignItems: "flex-start", justifyContent: "center",
      padding: "60px 24px", overflowY: "auto",
    }}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: "100%", maxWidth, background: C.bgCard,
        border: `1px solid ${C.line}`,
        borderRadius: 18,
        padding: 32,
        boxShadow: "0 30px 60px -25px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  </div>
);

/* ============================================================ */
/* Tab: Badges & Goals                                          */
/* ============================================================ */

const ScholarLevelHero = () => {
  const xpPct = Math.min(100, (yearStats.xp / yearStats.nextLevelXP) * 100);
  return (
    <div
      style={{
        background: C.ink,
        color: C.bg,
        borderRadius: 18,
        padding: 32,
        position: "relative",
        overflow: "hidden",
        minHeight: 280,
      }}
    >
      <Constellation />
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 24 }}>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.inkMuted, marginBottom: 10 }}>Scholar Level</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <div style={{ fontFamily: F.display, fontSize: 84, lineHeight: 0.9, color: C.bg }}>{yearStats.level}</div>
              <div style={{ fontFamily: F.display, fontSize: 24, fontStyle: "italic", color: C.goldSoft }}>{yearStats.levelTitle}</div>
            </div>
          </div>
          <div style={{ textAlign: "right", minWidth: 200 }}>
            <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.inkMuted, marginBottom: 10 }}>To next level</div>
            <div style={{ fontFamily: F.mono, fontSize: 18, color: C.bg, marginBottom: 4 }}>{yearStats.xp.toLocaleString()} / {yearStats.nextLevelXP.toLocaleString()} XP</div>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: C.goldSoft }}>{yearStats.nextLevelXP - yearStats.xp} XP to Level {yearStats.level + 1}</div>
          </div>
        </div>
        {/* Progress bar */}
        <div style={{ background: C.inkLight, height: 5, borderRadius: 999, overflow: "hidden", marginBottom: 24 }}>
          <div
            className="mp-progress-fill"
            style={{
              width: `${xpPct}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${C.gold}, ${C.goldSoft})`,
            }}
          />
        </div>
        {/* Stats strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
          <YearStat icon={Award}     value={yearStats.stats.badges}         label="Badges"      accent />
          <YearStat icon={BookOpen}  value={yearStats.stats.booksRead}      label="Books read" />
          <YearStat icon={Flame}     value={`${yearStats.stats.streakDays}d`} label="Streak"    accent />
          <YearStat icon={Clock}     value={`${yearStats.stats.onTimePct}%`}  label="On time" />
          <YearStat icon={Check}     value={yearStats.stats.goalsCompleted} label="Goals done" />
        </div>
      </div>
    </div>
  );
};

const MostRecentBadge = ({ onOpen }) => {
  const b = badges[0];
  return (
    <button
      onClick={() => onOpen(b)}
      className="mp-badge-card"
      style={{
        background: C.bgCard,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: 24,
        display: "flex", flexDirection: "column", gap: 14,
        cursor: "pointer", textAlign: "left", height: "100%",
      }}
    >
      <SectionLabel>Most recent</SectionLabel>
      <BadgeMedallion icon={b.icon} palette={b.palette} size={72} />
      <div>
        <div style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 26, lineHeight: 1.15, color: C.ink, marginBottom: 6 }}>{b.name}</div>
        <div style={{ fontFamily: F.body, fontSize: 13, color: C.inkLight, lineHeight: 1.45 }}>{b.description}</div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 14, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>{b.teacher} · {b.date}</div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: F.body, fontSize: 12, fontWeight: 500, color: C.accent }}>
          View <ArrowUpRight size={13} strokeWidth={2} />
        </span>
      </div>
    </button>
  );
};

const QuestCard = ({ quest }) => {
  const pal = palOf(quest.palette);
  const urgent = quest.daysLeft <= 3;
  const pct = (quest.progress / quest.target) * 100;
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${urgent ? C.accent : C.line}`,
        borderRadius: 14,
        padding: 24,
        position: "relative",
        overflow: "hidden",
        display: "flex", flexDirection: "column", gap: 14,
      }}
    >
      {/* corner wash */}
      <div
        style={{
          position: "absolute",
          width: 140, height: 140,
          top: -50, right: -50,
          background: pal.bg,
          opacity: 0.5,
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <BadgeMedallion icon={quest.icon} palette={quest.palette} size={52} />
        <span
          style={{
            fontFamily: F.body, fontSize: 11, fontWeight: 500,
            letterSpacing: 0.6,
            textTransform: "uppercase",
            background: urgent ? C.accent : pal.bg,
            color: urgent ? C.bg : pal.fg,
            padding: "5px 10px",
            borderRadius: 999,
          }}
        >
          {quest.daysLeft} days left
        </span>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: F.display, fontSize: 21, lineHeight: 1.2, color: C.ink, marginBottom: 6 }}>{quest.title}</div>
        <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkLight, lineHeight: 1.5, minHeight: 50 }}>{quest.description}</div>
      </div>
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <span style={{ fontFamily: F.body, fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted, fontWeight: 500 }}>Progress</span>
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.ink }}>{quest.progress} / {quest.target}</span>
        </div>
        <div style={{ height: 6, background: C.bgSubtle, borderRadius: 999, overflow: "hidden" }}>
          <div className="mp-progress-fill" style={{ width: `${pct}%`, height: "100%", background: pal.fg }} />
        </div>
      </div>
      <div style={{ position: "relative", fontFamily: F.body, fontSize: 11, color: C.inkMuted }}>Issued by {quest.issuedBy}</div>

      {/* Rewards */}
      <div style={{ position: "relative", marginTop: 6, display: "flex", flexDirection: "column", gap: 10 }}>
        <SectionLabel style={{ marginBottom: 4 }}>What you'll earn</SectionLabel>
        {/* Standard reward */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <Award size={18} color={C.ink} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink }}>{quest.standardReward.name}</div>
            <div style={{ fontFamily: F.body, fontSize: 11.5, color: C.inkMuted }}>{quest.standardReward.detail}</div>
          </div>
        </div>
        {/* Bonus reward */}
        <div
          style={{
            display: "flex", alignItems: "flex-start", gap: 10,
            background: pal.bg,
            border: `1px solid ${pal.fg}22`,
            borderRadius: 10, padding: "12px 14px",
          }}
        >
          <Sparkles size={18} color={pal.fg} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontFamily: F.body, fontSize: 10, letterSpacing: 1.3, textTransform: "uppercase", color: pal.fg, fontWeight: 700, marginBottom: 2 }}>Bonus</div>
            <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink }}>{quest.bonusReward.name}</div>
            <div style={{ fontFamily: F.body, fontSize: 11.5, color: C.inkLight }}>{quest.bonusReward.detail}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BadgeCard = ({ badge, onOpen }) => {
  const moments = badge.moments?.length || 0;
  return (
    <button
      onClick={() => onOpen(badge)}
      className="mp-badge-card"
      style={{
        background: C.bgCard,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: 20,
        textAlign: "left",
        display: "flex", flexDirection: "column", gap: 12,
        cursor: "pointer",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <BadgeMedallion icon={badge.icon} palette={badge.palette} size={56} />
        {moments > 1 ? (
          <span style={{ fontFamily: F.body, fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted }}>{moments} moments</span>
        ) : null}
      </div>
      <div>
        <div style={{ fontFamily: F.display, fontSize: 19, lineHeight: 1.2, color: C.ink, marginBottom: 4 }}>{badge.name}</div>
        <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkLight, lineHeight: 1.5, minHeight: 34 }}>{badge.description}</div>
      </div>
      <div style={{ marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Pill palette={badge.palette} small>{badge.category}</Pill>
        <span style={{ fontFamily: F.mono, fontSize: 11.5, color: C.inkMuted }}>{badge.date}</span>
      </div>
    </button>
  );
};

const LockedBadgeCard = ({ badge }) => (
  <div
    style={{
      background: C.bgCard,
      border: `1px dashed ${C.lineDark}`,
      borderRadius: 14,
      padding: 20,
      opacity: 0.85,
      display: "flex", flexDirection: "column", gap: 12,
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <BadgeMedallion icon={badge.icon} palette={badge.palette} size={56} locked mystery={badge.mystery} />
      <Lock size={14} color={C.inkMuted} strokeWidth={2} />
    </div>
    <div>
      <div style={{ fontFamily: F.display, fontSize: 19, lineHeight: 1.2, color: badge.mystery ? C.inkMuted : C.ink, marginBottom: 4 }}>{badge.name}</div>
      <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkLight, lineHeight: 1.5, minHeight: 34, fontStyle: badge.mystery ? "italic" : "normal" }}>
        {badge.criteria}
      </div>
    </div>
    <div style={{ marginTop: "auto", paddingTop: 12, borderTop: `1px dashed ${C.lineDark}`, fontFamily: F.body, fontSize: 11, color: C.inkMuted, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 500 }}>
      {badge.mystery ? "Hidden" : "How to unlock"}
    </div>
  </div>
);

const GoalCard = ({ goal, onUpdate }) => {
  const pct = Math.min(100, (goal.current / goal.target) * 100);
  const ok = pct >= 75;
  const fill = ok ? C.forest : C.warn;
  const setByPal = goal.setBy === "Self-set" ? "gold" : "sky";
  const trackPal = goal.tracking === "self" ? "accent" : "gray";
  const trackIcon = goal.tracking === "auto" ? BarChart3 : goal.tracking === "self" ? Pencil : Users;
  const trackLabel = goal.tracking === "auto" ? "Pulled automatically" : goal.tracking === "self" ? "You log this" : "Teacher updates this";
  return (
    <div
      style={{
        background: C.bgCard,
        border: `1px solid ${C.line}`,
        borderRadius: 14,
        padding: 24,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <Pill palette={setByPal} small icon={Target}>{goal.setBy}</Pill>
            <Pill palette="gray" small>{goal.category}</Pill>
            <Pill palette={trackPal} small icon={trackIcon}>{trackLabel}</Pill>
          </div>
          <div style={{ fontFamily: F.body, fontSize: 17, fontWeight: 500, color: C.ink, marginBottom: 6 }}>{goal.title}</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>Source: {goal.source} · Due {goal.due}</div>
        </div>
        <div style={{ textAlign: "right", minWidth: 130 }}>
          <div style={{ fontFamily: F.display, fontSize: 32, lineHeight: 1, color: ok ? C.forest : C.warn }}>{Math.round(pct)}%</div>
          <div style={{ fontFamily: F.mono, fontSize: 11.5, color: C.inkMuted, marginTop: 4 }}>
            {goal.current} / {goal.target} {goal.unit}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 16, height: 8, background: C.bgSubtle, borderRadius: 999, overflow: "hidden" }}>
        <div className="mp-progress-fill" style={{ width: `${pct}%`, height: "100%", background: fill }} />
      </div>
      {goal.tracking === "self" && goal.lastLog ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, flexWrap: "wrap", gap: 10 }}>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkLight }}>
            Last logged: <em style={{ fontFamily: F.display, fontSize: 14, fontStyle: "italic" }}>{goal.lastLog.title}</em> on {goal.lastLog.date}
          </div>
          <button
            onClick={() => onUpdate(goal)}
            className="mp-ghost-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: F.body, fontSize: 12, fontWeight: 500,
              color: C.ink,
              background: "transparent",
              border: `1px solid ${C.line}`,
              borderRadius: 8, padding: "7px 12px",
              cursor: "pointer",
            }}
          >
            <Pencil size={13} strokeWidth={1.8} /> Update progress
          </button>
        </div>
      ) : null}
    </div>
  );
};

const BadgesAndGoalsTab = ({ onOpenBadge, onCreateGoal, onUpdateGoal }) => {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Academic", "Effort", "Citizenship", "Milestone"];
  const visible = filter === "All" ? badges : badges.filter(b => b.category === filter);
  return (
    <div>
      {/* Hero row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 48 }}>
        <ScholarLevelHero />
        <MostRecentBadge onOpen={onOpenBadge} />
      </div>

      {/* Active quests */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ marginBottom: 20 }}>
          <SectionLabel style={{ marginBottom: 8 }}>Right now</SectionLabel>
          <h2 style={{ fontFamily: F.display, fontSize: 32, margin: 0, color: C.ink }}>
            Active <span style={{ fontStyle: "italic", color: C.accent }}>quests</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {quests.map(q => <QuestCard key={q.id} quest={q} />)}
        </div>
      </section>

      {/* Badge collection */}
      <section style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
          <h2 style={{ fontFamily: F.display, fontSize: 32, margin: 0, color: C.ink }}>Badge collection</h2>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {cats.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  fontFamily: F.body, fontSize: 12, fontWeight: 500,
                  background: filter === c ? C.ink : "transparent",
                  color: filter === c ? C.bg : C.inkLight,
                  border: `1px solid ${filter === c ? C.ink : C.line}`,
                  padding: "6px 12px", borderRadius: 999, cursor: "pointer",
                  transition: "background 180ms ease, color 180ms ease",
                }}
              >{c}</button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {visible.map(b => <BadgeCard key={b.id} badge={b} onOpen={onOpenBadge} />)}
        </div>
      </section>

      <Ornament />

      {/* Locked badges */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: F.display, fontSize: 28, margin: 0, color: C.ink }}>
            Badges to <span style={{ fontStyle: "italic", color: C.accent }}>earn next</span>
          </h2>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.inkLight, marginTop: 6 }}>
            4 more badges out there. Some you can see how to earn — one is a mystery.
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          {lockedBadges.map(b => <LockedBadgeCard key={b.id} badge={b} />)}
        </div>
      </section>

      {/* Active goals */}
      <section>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <h2 style={{ fontFamily: F.display, fontSize: 32, margin: 0, color: C.ink }}>Active goals</h2>
          <button
            onClick={onCreateGoal}
            className="mp-ghost-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontFamily: F.body, fontSize: 13, fontWeight: 500,
              color: C.ink, background: "transparent",
              border: `1px solid ${C.line}`,
              padding: "8px 14px", borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <Plus size={14} strokeWidth={2} /> Set a new goal
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {goals.map(g => <GoalCard key={g.id} goal={g} onUpdate={onUpdateGoal} />)}
        </div>
      </section>
    </div>
  );
};

/* ============================================================ */
/* Modals                                                       */
/* ============================================================ */

const labelStyle = {
  display: "block",
  fontFamily: F.body, fontSize: 11, fontWeight: 500,
  letterSpacing: 1.2, textTransform: "uppercase",
  color: C.inkMuted, marginBottom: 8,
};

const inputStyle = {
  width: "100%",
  fontFamily: F.body, fontSize: 14,
  color: C.ink, background: C.bg,
  border: `1px solid ${C.line}`,
  borderRadius: 8,
  padding: "10px 14px",
  outline: "none",
};

const BadgeModal = ({ badge, onClose }) => {
  const [idx, setIdx] = useState(0);
  if (!badge) return null;
  const moments = badge.moments || [];
  const current = moments[idx];
  const milestones = badge.milestones;
  const pal = palOf(badge.palette);
  return (
    <ModalShell onClose={onClose} maxWidth={680}>
      <div style={{ display: "flex", gap: 24, marginBottom: 24, alignItems: "flex-start" }}>
        <BadgeMedallion icon={badge.icon} palette={badge.palette} size={88} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: 10 }}><Pill palette={badge.palette} small>{badge.category}</Pill></div>
          <h3 style={{ fontFamily: F.display, fontSize: 36, lineHeight: 1.1, margin: "0 0 8px", color: C.ink }}>{badge.name}</h3>
          <div style={{ fontFamily: F.body, fontSize: 14, color: C.inkLight, marginBottom: 6 }}>{badge.description}</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>Awarded {badge.date} · by {badge.teacher}</div>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "transparent", border: "none", padding: 4,
            cursor: "pointer", color: C.inkMuted,
          }}
        ><X size={20} /></button>
      </div>

      {moments.length > 0 ? (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <SectionLabel style={{ margin: 0 }}>Moments behind it</SectionLabel>
            {moments.length > 1 ? (
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setIdx((i) => (i - 1 + moments.length) % moments.length)}
                  aria-label="Previous moment"
                  className="mp-ghost-btn"
                  style={{ background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: 6, cursor: "pointer", color: C.ink }}
                ><ArrowLeft size={14} /></button>
                <button
                  onClick={() => setIdx((i) => (i + 1) % moments.length)}
                  aria-label="Next moment"
                  className="mp-ghost-btn"
                  style={{ background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: 6, cursor: "pointer", color: C.ink }}
                ><ArrowRight size={14} /></button>
              </div>
            ) : null}
          </div>
          <div
            style={{
              position: "relative",
              background: pal.bg,
              border: `1px solid ${pal.fg}22`,
              borderRadius: 12,
              padding: 24,
              overflow: "hidden",
            }}
          >
            <Quote size={56} color={pal.fg} strokeWidth={1} style={{ position: "absolute", top: -8, right: -8, opacity: 0.18 }} />
            <div style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 20, lineHeight: 1.4, color: C.ink, marginBottom: 14 }}>
              "{current.note}"
            </div>
            <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>— {current.teacher}, {current.date}</div>
          </div>
          {moments.length > 1 ? (
            <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
              {moments.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Moment ${i + 1}`}
                  className="mp-pip"
                  style={{
                    width: i === idx ? 22 : 7, height: 7,
                    borderRadius: 999,
                    background: i === idx ? C.ink : C.lineDark,
                    border: "none", padding: 0, cursor: "pointer",
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {milestones ? (
        <div>
          <SectionLabel>Milestones</SectionLabel>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {milestones.map((m, i) => (
              <li
                key={i}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 16px",
                  background: C.bgSubtle,
                  border: `1px solid ${C.line}`,
                  borderRadius: 10,
                  fontFamily: F.body, fontSize: 13, color: C.ink,
                }}
              >
                <span>{m.label}</span>
                <span style={{ fontFamily: F.mono, fontSize: 12, color: C.inkMuted }}>{m.date}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </ModalShell>
  );
};

const GoalCreateModal = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState(null);
  const [target, setTarget] = useState("");
  const [unit, setUnit] = useState("");
  const [tracking, setTracking] = useState("auto");
  const [linkedClass, setLinkedClass] = useState(classes[0].id);
  const [due, setDue] = useState("");
  const [share, setShare] = useState(false);

  const cats = [
    { id: "Grade",      desc: "Reach a target grade in a class.",   tracking: "auto", unit: "%" },
    { id: "Reading",    desc: "Read more this term.",                tracking: "self", unit: "books" },
    { id: "Habit",      desc: "Build a daily or weekly habit.",      tracking: "auto", unit: "days" },
    { id: "Assessment", desc: "Improve a benchmark or state score.", tracking: "teacher", unit: "% to target" },
    { id: "Personal",   desc: "Something meaningful to you.",        tracking: "self", unit: "" },
  ];

  const onPickCat = (c) => {
    setCat(c.id);
    setTracking(c.tracking);
    if (!unit) setUnit(c.unit);
  };

  return (
    <ModalShell onClose={onClose} maxWidth={620}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <SectionLabel>Goal</SectionLabel>
          <h3 style={{ fontFamily: F.display, fontSize: 28, margin: 0, color: C.ink }}>Set a new goal</h3>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: C.inkMuted }}><X size={20} /></button>
      </div>

      {/* Title */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Goal title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="e.g. Raise English grade to A−" />
      </div>

      {/* Category */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Category</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 8 }}>
          {cats.map(c => (
            <button
              key={c.id}
              onClick={() => onPickCat(c)}
              style={{
                textAlign: "left",
                background: cat === c.id ? C.bgTinted : "transparent",
                border: `1px solid ${cat === c.id ? C.lineDark : C.line}`,
                borderRadius: 10, padding: 12, cursor: "pointer",
              }}
            >
              <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink, marginBottom: 2 }}>{c.id}</div>
              <div style={{ fontFamily: F.body, fontSize: 11.5, color: C.inkMuted }}>{c.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Target & Unit */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div>
          <label style={labelStyle}>Target</label>
          <input value={target} onChange={(e) => setTarget(e.target.value)} style={inputStyle} placeholder="e.g. 90" />
        </div>
        <div>
          <label style={labelStyle}>Unit</label>
          <input value={unit} onChange={(e) => setUnit(e.target.value)} style={inputStyle} placeholder="e.g. %" />
        </div>
      </div>

      {/* Tracking */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>How is it tracked?</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { id: "auto",    title: "Pulled automatically",  desc: "From your gradebook, attendance, or another system." },
            { id: "self",    title: "I'll log progress myself", desc: "You'll update this manually as you make progress." },
            { id: "teacher", title: "My teacher will update it", desc: "Useful for assessment- or behavior-based goals." },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setTracking(opt.id)}
              style={{
                textAlign: "left", cursor: "pointer",
                background: tracking === opt.id ? C.bgTinted : "transparent",
                border: `1px solid ${tracking === opt.id ? C.lineDark : C.line}`,
                borderRadius: 10, padding: 14,
                display: "flex", alignItems: "flex-start", gap: 12,
              }}
            >
              <span style={{
                width: 16, height: 16, borderRadius: 999,
                border: `2px solid ${tracking === opt.id ? C.accent : C.lineDark}`,
                background: tracking === opt.id ? C.accent : "transparent",
                marginTop: 2, flexShrink: 0,
              }} />
              <div>
                <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink }}>{opt.title}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>{opt.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Linked class (auto only) */}
      {tracking === "auto" ? (
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>Linked class</label>
          <select value={linkedClass} onChange={(e) => setLinkedClass(e.target.value)} style={inputStyle}>
            {classes.map(c => <option key={c.id} value={c.id}>{c.name} · {c.teacher}</option>)}
          </select>
        </div>
      ) : null}

      {/* Due */}
      <div style={{ marginBottom: 20 }}>
        <label style={labelStyle}>Due date</label>
        <input value={due} onChange={(e) => setDue(e.target.value)} style={inputStyle} placeholder='e.g. "End of Q4", "Jun 12", "Ongoing"' />
      </div>

      {/* Share */}
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 24 }}>
        <input
          type="checkbox"
          checked={share}
          onChange={(e) => setShare(e.target.checked)}
          style={{ marginTop: 4 }}
        />
        <div>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink }}>Share with teacher</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>
            {tracking === "teacher" ? "Required so they can update progress." : "Optional — they'll see this on their roster."}
          </div>
        </div>
      </label>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          onClick={onClose}
          className="mp-ghost-btn"
          style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer" }}
        >Cancel</button>
        <button
          onClick={onClose}
          style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.bg, background: C.ink, border: `1px solid ${C.ink}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer" }}
        >Create goal</button>
      </div>
    </ModalShell>
  );
};

const GoalUpdateModal = ({ goal, onClose }) => {
  const isReading = goal?.category === "Reading";
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [count, setCount] = useState(goal?.current || 0);
  const [note, setNote] = useState("");
  if (!goal) return null;
  return (
    <ModalShell onClose={onClose} maxWidth={620}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <SectionLabel>Update progress</SectionLabel>
          <h3 style={{ fontFamily: F.display, fontSize: 28, margin: 0, color: C.ink }}>{goal.title}</h3>
        </div>
        <button onClick={onClose} aria-label="Close" style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: C.inkMuted }}><X size={20} /></button>
      </div>

      {/* Where you are now */}
      <div style={{ background: C.bgSubtle, border: `1px solid ${C.line}`, borderRadius: 10, padding: 18, marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted, marginBottom: 4 }}>Where you are now</div>
          <div style={{ fontFamily: F.mono, fontSize: 18, color: C.ink }}>{goal.current} / {goal.target} {goal.unit}</div>
        </div>
        {goal.lastLog ? (
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkLight }}>
            Last logged: <em style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 14 }}>{goal.lastLog.title}</em> on {goal.lastLog.date}
          </div>
        ) : null}
      </div>

      {isReading ? (
        <>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Book title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder='e.g. "The Buried Giant"' />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>Author</label>
            <input value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} placeholder="e.g. Kazuo Ishiguro" />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Rating</label>
            <div style={{ display: "flex", gap: 6 }}>
              {[1,2,3,4,5].map(n => (
                <button
                  key={n}
                  onClick={() => setRating(n)}
                  aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  style={{ background: "transparent", border: "none", padding: 4, cursor: "pointer", color: n <= rating ? C.gold : C.lineDark }}
                ><Star size={24} fill={n <= rating ? C.gold : "none"} strokeWidth={1.6} /></button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <SectionLabel>Reading log</SectionLabel>
            <div style={{ maxHeight: 220, overflowY: "auto", border: `1px solid ${C.line}`, borderRadius: 10 }}>
              {readingLog.map((b, i) => (
                <div
                  key={b.id}
                  style={{
                    padding: "12px 14px",
                    borderBottom: i === readingLog.length - 1 ? "none" : `1px solid ${C.line}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                    background: i === 0 ? C.bgTinted : "transparent",
                  }}
                >
                  <div>
                    <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink }}>{b.title}</div>
                    <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>{b.author}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", gap: 1, justifyContent: "flex-end", marginBottom: 2 }}>
                      {[1,2,3,4,5].map(n => (
                        <Star key={n} size={11} color={C.gold} fill={n <= b.rating ? C.gold : "none"} strokeWidth={1.6} />
                      ))}
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: 11, color: C.inkMuted }}>{b.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>New count</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button onClick={() => setCount(Math.max(0, count - 1))} className="mp-ghost-btn" style={{ background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, width: 36, height: 36, fontSize: 18, cursor: "pointer", color: C.ink }}>−</button>
              <input value={count} onChange={(e) => setCount(parseInt(e.target.value || "0", 10) || 0)} style={{ ...inputStyle, textAlign: "center", flex: 1 }} />
              <button onClick={() => setCount(count + 1)} className="mp-ghost-btn" style={{ background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, width: 36, height: 36, fontSize: 18, cursor: "pointer", color: C.ink }}>+</button>
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Note (optional)</label>
            <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder="What changed since last time?" />
          </div>
        </>
      )}

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button onClick={onClose} className="mp-ghost-btn" style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer" }}>Cancel</button>
        <button onClick={onClose} style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.bg, background: C.ink, border: `1px solid ${C.ink}`, borderRadius: 8, padding: "9px 16px", cursor: "pointer" }}>Save progress</button>
      </div>
    </ModalShell>
  );
};

/* ============================================================ */
/* Tab: Grades                                                  */
/* ============================================================ */

const GradesTab = () => {
  const [expanded, setExpanded] = useState({ alg: true });
  const expandAll = () => setExpanded(Object.fromEntries(classes.map(c => [c.id, true])));
  const collapseAll = () => setExpanded({});
  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  const overallMissing = classes.reduce((acc, c) => acc + c.assignments.filter(a => a.status === "missing").length, 0);

  return (
    <div>
      <SectionLabel>Overall standing · {student.period}</SectionLabel>
      {/* Hero */}
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 2fr", gap: 18, marginBottom: 40 }}>
        {/* GPA hero panel */}
        <div style={{ background: C.ink, color: C.bg, borderRadius: 18, padding: 28 }}>
          <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.inkMuted, marginBottom: 14 }}>Cumulative GPA</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 18 }}>
            <div style={{ fontFamily: F.display, fontSize: 84, lineHeight: 0.9, color: C.bg }}>{student.gpa.toFixed(2)}</div>
            <span style={{
              fontFamily: F.body, fontSize: 11, fontWeight: 500,
              letterSpacing: 0.6, textTransform: "uppercase",
              background: C.forestSoft, color: C.forest,
              padding: "4px 10px", borderRadius: 999,
            }}>
              +{student.gpaTrend.toFixed(2)} this term
            </span>
          </div>
          <div style={{ height: 1, background: C.inkLight, opacity: 0.4, marginBottom: 18 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 22, color: C.bg }}>6</div>
              <div style={{ fontFamily: F.body, fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted, marginTop: 4 }}>Classes</div>
            </div>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 22, color: C.bg }}>5.5 / 5.5</div>
              <div style={{ fontFamily: F.body, fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted, marginTop: 4 }}>Credits on track</div>
            </div>
            <div>
              <div style={{ fontFamily: F.mono, fontSize: 22, color: overallMissing > 0 ? C.wineSoft : C.bg }}>{overallMissing}</div>
              <div style={{ fontFamily: F.body, fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted, marginTop: 4 }}>Missing work</div>
            </div>
          </div>
        </div>
        {/* Trend */}
        <Card style={{ padding: 28 }}>
          <SectionLabel>GPA trend · last 7 weeks</SectionLabel>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overallTrend} margin={{ top: 10, right: 12, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="gpaG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={C.accent} stopOpacity={0.25} />
                    <stop offset="100%" stopColor={C.accent} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 4" stroke={C.line} vertical={false} />
                <XAxis dataKey="week" tick={{ fill: C.inkMuted, fontSize: 11, fontFamily: F.body }} axisLine={false} tickLine={false} />
                <YAxis domain={[3.3, 4.0]} tick={{ fill: C.inkMuted, fontSize: 11, fontFamily: F.body }} axisLine={false} tickLine={false} width={36} />
                <Tooltip
                  contentStyle={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12, fontFamily: F.body, color: C.ink }}
                  labelStyle={{ color: C.inkMuted }}
                />
                <Area dataKey="gpa" stroke={C.accent} strokeWidth={2.5} fill="url(#gpaG)" type="monotone" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Quick scan */}
      <SectionLabel>All classes — quick scan</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 48 }}>
        {classes.map(c => (
          <button
            key={c.id}
            onClick={() => {
              setExpanded(prev => ({ ...prev, [c.id]: true }));
              setTimeout(() => {
                document.getElementById(`class-${c.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 50);
            }}
            style={{
              background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 12,
              padding: 14, textAlign: "left", cursor: "pointer",
              transition: "border-color 180ms ease, transform 180ms ease",
            }}
            className="mp-badge-card"
          >
            <div style={{ fontFamily: F.body, fontSize: 11, color: C.inkMuted, minHeight: 28, lineHeight: 1.3 }}>{c.name}</div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginTop: 4 }}>
              <div style={{ fontFamily: F.display, fontSize: 24, color: C.ink }}>{c.grade}</div>
              <TrendArrow value={c.trend} />
            </div>
          </button>
        ))}
      </div>

      {/* By class */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontFamily: F.display, fontSize: 32, margin: 0, color: C.ink }}>By class</h2>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.inkLight, marginTop: 4 }}>Each section shows the gradebook for that class only.</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={expandAll} className="mp-ghost-btn" style={{ fontFamily: F.body, fontSize: 12, color: C.ink, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer" }}>Expand all</button>
          <button onClick={collapseAll} className="mp-ghost-btn" style={{ fontFamily: F.body, fontSize: 12, color: C.ink, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: "7px 12px", cursor: "pointer" }}>Collapse all</button>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {classes.map(c => (
          <ClassSection key={c.id} cls={c} expanded={!!expanded[c.id]} onToggle={() => toggle(c.id)} />
        ))}
      </div>
    </div>
  );
};

const ClassSection = ({ cls, expanded, onToggle }) => {
  const missing = cls.assignments.filter(a => a.status === "missing").length;
  return (
    <div id={`class-${cls.id}`} style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
      <button
        onClick={onToggle}
        className="mp-class-row"
        style={{
          width: "100%", background: "transparent", border: "none",
          padding: "20px 24px", cursor: "pointer", textAlign: "left",
          display: "grid", gridTemplateColumns: "2.4fr 1fr 0.8fr 1.2fr 32px",
          gap: 16, alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontFamily: F.body, fontSize: 17, fontWeight: 500, color: C.ink }}>{cls.name}</div>
          <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>{cls.teacher} · Period {cls.period} · Room {cls.room}</div>
        </div>
        <div>{missing > 0 ? <Pill palette="wine" small icon={AlertCircle}>{missing} missing</Pill> : null}</div>
        <div><TrendArrow value={cls.trend} /></div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: F.display, fontSize: 30, lineHeight: 1, color: C.ink }}>{cls.grade}</div>
          <div style={{ fontFamily: F.mono, fontSize: 11, color: C.inkMuted, marginTop: 4 }}>{cls.percentage}%</div>
        </div>
        <ChevronDown
          size={20} strokeWidth={2} color={C.inkLight}
          style={{ transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform 180ms ease", justifySelf: "end" }}
        />
      </button>
      {expanded ? (
        <div style={{ background: C.bgTinted, borderTop: `1px solid ${C.line}`, padding: 24 }}>
          {/* Categories */}
          <SectionLabel>Categories &amp; weights</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${cls.categories.length}, 1fr)`, gap: 12, marginBottom: 24 }}>
            {cls.categories.map(cat => (
              <div key={cat.name} style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 10, padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
                  <div style={{ fontFamily: F.body, fontSize: 12, color: C.ink, fontWeight: 500 }}>{cat.name}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 11, color: C.inkMuted }}>{cat.weight}%</div>
                </div>
                <div style={{ fontFamily: F.display, fontSize: 24, color: C.ink, marginBottom: 6 }}>{cat.average}</div>
                <div style={{ height: 4, background: C.bgSubtle, borderRadius: 999, overflow: "hidden" }}>
                  <div className="mp-progress-fill" style={{ width: `${cat.average}%`, height: "100%", background: cat.average >= 90 ? C.forest : cat.average >= 80 ? C.ink : C.warn }} />
                </div>
              </div>
            ))}
          </div>

          {/* Assignments */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <SectionLabel style={{ margin: 0 }}>Assignments · {cls.name} only</SectionLabel>
            <div style={{ fontFamily: F.mono, fontSize: 11, color: C.inkMuted }}>{cls.assignments.length} items</div>
          </div>
          <div style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 10, overflow: "hidden" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2.4fr 1fr 0.7fr 0.7fr 0.5fr", padding: "10px 16px", background: C.bgSubtle, fontFamily: F.body, fontSize: 11, letterSpacing: 1, textTransform: "uppercase", color: C.inkMuted, fontWeight: 500 }}>
              <div>Assignment</div><div>Category</div><div>Date</div><div style={{ textAlign: "right" }}>Score</div><div style={{ textAlign: "right" }}>%</div>
            </div>
            {cls.assignments.map((a, i) => {
              const pct = a.status === "missing" ? null : Math.round((a.score / a.total) * 100);
              const pctColor = pct == null ? C.wine : pct >= 90 ? C.forest : pct >= 80 ? C.ink : C.warn;
              return (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "2.4fr 1fr 0.7fr 0.7fr 0.5fr",
                  padding: "12px 16px", alignItems: "center",
                  borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
                  fontFamily: F.body, fontSize: 13, color: C.ink,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {a.status === "missing" ? <AlertCircle size={14} color={C.wine} strokeWidth={2} /> : null}
                    <span>{a.name}</span>
                  </div>
                  <div style={{ fontSize: 12, color: C.inkMuted }}>{a.category}</div>
                  <div style={{ fontFamily: F.mono, fontSize: 12, color: C.inkMuted }}>{a.date}</div>
                  <div style={{ textAlign: "right", fontFamily: F.mono, fontSize: 12, color: a.status === "missing" ? C.wine : C.ink }}>
                    {a.status === "missing" ? "MISSING" : `${a.score} / ${a.total}`}
                  </div>
                  <div style={{ textAlign: "right", fontFamily: F.mono, fontSize: 12, color: pctColor, fontWeight: 500 }}>
                    {pct == null ? "—" : `${pct}%`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

/* ============================================================ */
/* Tab: Progress Report                                         */
/* ============================================================ */

const ProgressReportTab = () => {
  const concerns = progressReport.classes.filter(c => c.concern).length;
  const improving = progressReport.classes.filter(c => c.trend === "improving").length;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <SectionLabel>Current interim</SectionLabel>
          <h2 style={{ fontFamily: F.display, fontSize: 36, margin: 0, color: C.ink }}>{progressReport.period}</h2>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.inkLight, marginTop: 6 }}>Issued {progressReport.date}</div>
        </div>
        <button className="mp-ghost-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>
          <Download size={14} strokeWidth={2} /> Download PDF
        </button>
      </div>

      {/* Metric strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 36 }}>
        <MetricCard label="Classes reviewed" value={progressReport.classes.length} sub="all current courses" palette="gray" />
        <MetricCard label="Trending up" value={improving} sub={improving === 1 ? "1 class is improving" : `${improving} classes are improving`} palette="forest" />
        <MetricCard label="Areas of concern" value={concerns} sub={concerns === 0 ? "none flagged" : "1 class flagged"} palette={concerns > 0 ? "warn" : "gray"} />
      </div>

      {/* Class comments */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
        {progressReport.classes.map((c, i) => (
          <div
            key={i}
            style={{
              background: C.bgCard,
              border: `1px solid ${C.line}`,
              borderLeft: c.concern ? `3px solid ${C.warn}` : `1px solid ${C.line}`,
              borderRadius: 14,
              padding: 24,
              display: "grid", gridTemplateColumns: "1fr 110px", gap: 24,
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                <h3 style={{ fontFamily: F.body, fontSize: 17, fontWeight: 500, margin: 0, color: C.ink }}>{c.name}</h3>
                {c.concern ? <Pill palette="warn" small icon={AlertCircle}>Area of concern</Pill> : null}
                {c.trend === "improving" ? <Pill palette="forest" small icon={TrendingUp}>Improving</Pill> : null}
              </div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted, marginBottom: 14 }}>{c.teacher}</div>
              <div style={{ display: "flex", gap: 10 }}>
                <MessageSquare size={16} color={C.inkMuted} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: 4 }} />
                <div style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 18, lineHeight: 1.5, color: C.ink }}>
                  "{c.comment}"
                </div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.inkMuted, marginBottom: 4 }}>Standing</div>
              <div style={{ fontFamily: F.display, fontSize: 44, lineHeight: 1, color: C.ink }}>{c.standing}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>Prior interims</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {progressReport.history.map(h => (
          <button key={h.id} className="mp-ghost-btn" style={{
            textAlign: "left", background: "transparent",
            border: `1px solid ${C.line}`, borderRadius: 12,
            padding: 18, cursor: "pointer",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10,
          }}>
            <div>
              <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.ink }}>{h.label}</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>Issued {h.date}</div>
            </div>
            <ChevronRight size={16} color={C.inkLight} />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ============================================================ */
/* Tab: Assessment Results                                      */
/* ============================================================ */

const SubTabs = ({ value, onChange, options }) => (
  <div
    style={{
      display: "inline-flex", gap: 4,
      background: C.bgSubtle,
      border: `1px solid ${C.line}`,
      borderRadius: 999,
      padding: 4,
      marginBottom: 28,
    }}
  >
    {options.map(o => (
      <button
        key={o.id}
        onClick={() => onChange(o.id)}
        style={{
          fontFamily: F.body, fontSize: 13, fontWeight: 500,
          color: value === o.id ? C.ink : C.inkLight,
          background: value === o.id ? C.bgCard : "transparent",
          border: "none", borderRadius: 999,
          padding: "8px 16px", cursor: "pointer",
          boxShadow: value === o.id ? "0 1px 3px rgba(30,25,22,0.08)" : "none",
          transition: "background 180ms ease, color 180ms ease",
        }}
      >{o.label}</button>
    ))}
  </div>
);

const BenchmarkBlock = ({ subject }) => (
  <Card style={{ padding: 28 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 28, alignItems: "stretch" }}>
      <div>
        <SectionLabel>{subject.name}</SectionLabel>
        <div style={{ fontFamily: F.display, fontSize: 28, color: C.ink, marginBottom: 4 }}>{subject.name}</div>
        <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted, marginBottom: 18 }}>{subject.metric}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {subject.results.map(r => (
            <div key={r.window} style={{ background: C.bgSubtle, border: `1px solid ${C.line}`, borderRadius: 10, padding: 12 }}>
              <div style={{ fontFamily: F.body, fontSize: 10.5, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted, fontWeight: 500 }}>{r.window}</div>
              <div style={{ fontFamily: F.mono, fontSize: 20, color: C.ink, margin: "6px 0 8px" }}>{r.score}</div>
              <Pill palette={r.level === "Above" ? "forest" : "sky"} small>{r.level}</Pill>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={subject.results} margin={{ top: 8, right: 12, bottom: 0, left: -12 }}>
            <CartesianGrid strokeDasharray="2 4" stroke={C.line} vertical={false} />
            <XAxis dataKey="window" tick={{ fill: C.inkMuted, fontSize: 11, fontFamily: F.body }} axisLine={false} tickLine={false} />
            <YAxis domain={['dataMin - 5', 'dataMax + 5']} tick={{ fill: C.inkMuted, fontSize: 11, fontFamily: F.body }} axisLine={false} tickLine={false} width={36} />
            <Tooltip contentStyle={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 8, fontSize: 12, fontFamily: F.body }} />
            <Line dataKey="score" stroke={C.accent} strokeWidth={2.5} dot={{ fill: C.accent, r: 5, strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </Card>
);

const LevelIndicator = ({ level }) => (
  <div style={{ display: "flex", gap: 4, marginTop: 8 }}>
    {[1,2,3,4].map(n => {
      let bg = C.bgSubtle;
      if (n <= level && level >= 3) bg = C.forest;
      else if (n <= level && level < 3) bg = C.warn;
      return <div key={n} style={{ flex: 1, height: 7, background: bg, borderRadius: 3 }} />;
    })}
  </div>
);

const StateYearCard = ({ year }) => (
  <Card style={{ padding: 26 }}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1.4fr", gap: 24, alignItems: "flex-start" }}>
      <div>
        <SectionLabel>School year</SectionLabel>
        <div style={{ fontFamily: F.display, fontSize: 26, color: C.ink, marginBottom: 4 }}>{year.year}</div>
        <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>{year.grade}</div>
      </div>
      {[["ELA", year.ela], ["Math", year.math]].map(([label, r]) => (
        <div key={label}>
          <div style={{ fontFamily: F.body, fontSize: 10.5, letterSpacing: 1.4, textTransform: "uppercase", color: C.inkMuted, fontWeight: 500, marginBottom: 8 }}>{label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
            <div style={{ fontFamily: F.mono, fontSize: 22, color: C.ink }}>{r.score}</div>
            <Pill palette={r.level === 4 ? "forest" : r.level >= 3 ? "sky" : "warn"} small>Level {r.level} · {r.levelLabel}</Pill>
          </div>
          <LevelIndicator level={r.level} />
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.body, fontSize: 10, color: C.inkMuted, marginTop: 5, letterSpacing: 0.6, textTransform: "uppercase" }}>
            <span>Standard not met</span>
            <span>Exceeded</span>
          </div>
        </div>
      ))}
    </div>
  </Card>
);

const CredentialDonut = ({ earned, total }) => {
  const pct = earned / total;
  const r = 60, c = 2 * Math.PI * r;
  const dash = c * pct;
  return (
    <svg width={140} height={140} viewBox="0 0 140 140">
      <circle cx={70} cy={70} r={r} fill="none" stroke={C.bgSubtle} strokeWidth={14} />
      <circle
        cx={70} cy={70} r={r}
        fill="none" stroke={C.accent} strokeWidth={14}
        strokeDasharray={`${dash} ${c - dash}`}
        strokeDashoffset={c * 0.25}
        strokeLinecap="round"
        transform="rotate(-90 70 70)"
      />
      <text x={70} y={70} textAnchor="middle" dominantBaseline="central" fontFamily={F.display} fontSize={30} fill={C.ink}>{Math.round(pct * 100)}%</text>
    </svg>
  );
};

const CredentialProgress = () => (
  <div>
    <Card style={{ padding: 28, marginBottom: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 32, alignItems: "center" }}>
        <CredentialDonut earned={credentials.totalEarned} total={credentials.totalRequired} />
        <div>
          <SectionLabel>On the path to graduation</SectionLabel>
          <div style={{ fontFamily: F.display, fontSize: 36, color: C.ink, lineHeight: 1.1 }}>
            {credentials.totalEarned} of {credentials.totalRequired} credits earned
          </div>
          <div style={{ fontFamily: F.body, fontSize: 13, color: C.inkLight, marginTop: 8 }}>
            On track to complete by Spring 2028. {credentials.totalRequired - credentials.totalEarned} credits to go.
          </div>
        </div>
      </div>
    </Card>

    <SectionLabel>Requirements</SectionLabel>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
      {credentials.requirements.map((r, i) => {
        const pct = (r.earned / r.required) * 100;
        const done = r.earned >= r.required;
        return (
          <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 12, padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.ink }}>{r.name}</div>
              {done ? <Pill palette="forest" small icon={Check}>Done</Pill> : null}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontSize: 12, color: C.inkMuted, marginBottom: 6 }}>
              <span>{r.earned} / {r.required} credits</span>
              <span>{Math.round(pct)}%</span>
            </div>
            <div style={{ height: 5, background: C.bgSubtle, borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
              <div className="mp-progress-fill" style={{ width: `${Math.min(100, pct)}%`, height: "100%", background: done ? C.forest : C.accent }} />
            </div>
            <div style={{ fontFamily: F.body, fontSize: 11.5, color: C.inkLight }}>{r.courses.join(" · ")}</div>
          </div>
        );
      })}
    </div>

    <SectionLabel>Other requirements</SectionLabel>
    <Card>
      {credentials.other.map((o, i) => (
        <div key={i} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "14px 0",
          borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
          gap: 16,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.ink }}>{o.name}</div>
            {o.kind === "progress" ? (
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, maxWidth: 320, height: 5, background: C.bgSubtle, borderRadius: 999, overflow: "hidden" }}>
                  <div className="mp-progress-fill" style={{ width: `${Math.min(100, (o.current / o.target) * 100)}%`, height: "100%", background: C.accent }} />
                </div>
                <span style={{ fontFamily: F.mono, fontSize: 12, color: C.inkMuted }}>{o.current} / {o.target} {o.unit}</span>
              </div>
            ) : null}
          </div>
          {o.kind === "status" ? (
            <Pill palette={o.status === "Not started" ? "gray" : "sky"} small>{o.status}</Pill>
          ) : null}
        </div>
      ))}
    </Card>
  </div>
);

const AssessmentResultsTab = () => {
  const [sub, setSub] = useState("district");
  return (
    <div>
      <SectionLabel>How you're measured</SectionLabel>
      <h2 style={{ fontFamily: F.display, fontSize: 32, margin: "0 0 20px", color: C.ink }}>Assessment results</h2>
      <SubTabs
        value={sub}
        onChange={setSub}
        options={[
          { id: "district",    label: "District benchmarks" },
          { id: "state",       label: "State assessments" },
          { id: "credentials", label: "Credential progress" },
        ]}
      />
      {sub === "district" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {benchmarks.subjects.map(s => <BenchmarkBlock key={s.name} subject={s} />)}
        </div>
      ) : null}
      {sub === "state" ? (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            {stateResults.map((y, i) => <StateYearCard key={i} year={y} />)}
          </div>
          <div style={{ background: C.skySoft, border: `1px solid ${C.sky}22`, borderRadius: 12, padding: 18, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <Info size={18} color={C.sky} strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink, lineHeight: 1.5 }}>
              <strong>How to read this:</strong> The SBAC reports performance on a 4-level scale.
              Level 3 means you "met" the standard — you're on grade level. Level 4 means you exceeded it.
              The scale score (e.g. 2645) is the underlying number; the level is what colleges and the
              state actually use.
            </div>
          </div>
        </div>
      ) : null}
      {sub === "credentials" ? <CredentialProgress /> : null}
    </div>
  );
};

/* ============================================================ */
/* Tab: Attendance                                              */
/* ============================================================ */

const HEAT_COLOR = (s) => ({
  p: C.forest, t: C.warn, a: C.wine, b: C.lineDark, f: C.bgSubtle,
})[s] || C.bgSubtle;

const Heatmap = () => {
  const cell = 11, gap = 3, weeks = attendance.heatmap.length, days = 5;
  const w = weeks * (cell + gap), h = days * (cell + gap);
  // month markers: week index -> month label
  const months = [
    [0, "Aug"], [4, "Sep"], [8, "Oct"], [13, "Nov"], [17, "Dec"],
    [21, "Jan"], [25, "Feb"], [29, "Mar"], [33, "Apr"], [35, "May"],
  ];
  const dayLabels = ["M","T","W","T","F"];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 22, paddingRight: 8, height: h }}>
          {dayLabels.map((d, i) => (
            <div key={i} style={{ fontFamily: F.body, fontSize: 9, color: C.inkMuted, lineHeight: `${cell}px`, height: cell }}>{d}</div>
          ))}
        </div>
        <div style={{ flex: 1, overflowX: "auto" }}>
          <svg width={w} height={h + 22} style={{ display: "block" }}>
            {/* Month labels */}
            {months.map(([wi, label]) => (
              <text key={label + wi} x={wi * (cell + gap)} y={11} fontFamily={F.body} fontSize={10} fill={C.inkMuted}>{label}</text>
            ))}
            <g transform="translate(0,22)">
              {attendance.heatmap.map((week, wi) =>
                week.map((s, di) => (
                  <rect
                    key={`${wi}-${di}`}
                    x={wi * (cell + gap)}
                    y={di * (cell + gap)}
                    width={cell} height={cell} rx={2}
                    fill={HEAT_COLOR(s)}
                  />
                ))
              )}
            </g>
          </svg>
        </div>
      </div>
      <div style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 13, color: C.inkMuted, marginTop: 12 }}>
        Each square is one school day, August through May.
      </div>
    </div>
  );
};

const SummaryStat = ({ label, data, accent }) => (
  <div style={{
    background: accent ? C.accent : C.bgCard,
    color: accent ? C.bg : C.ink,
    border: `1px solid ${accent ? C.accent : C.line}`,
    borderRadius: 14, padding: 22,
  }}>
    <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: accent ? C.accentSoft : C.inkMuted, fontWeight: 500, marginBottom: 10 }}>{label}</div>
    <div style={{ fontFamily: F.display, fontSize: 40, lineHeight: 1, marginBottom: 10 }}>{data.rate.toFixed(1)}%</div>
    <div style={{ fontFamily: F.mono, fontSize: 11.5, color: accent ? C.accentSoft : C.inkMuted }}>
      P {data.present} · T {data.tardy} · A {data.absent}
    </div>
  </div>
);

const StreakCallout = () => (
  <div
    style={{
      background: C.accent, color: C.bg,
      borderRadius: 14, padding: 28,
      position: "relative", overflow: "hidden", minHeight: 240,
    }}
  >
    <Flame size={140} color={C.accentSoft} strokeWidth={1} style={{ position: "absolute", right: -24, bottom: -24, opacity: 0.45 }} />
    <div style={{ position: "relative" }}>
      <Flame size={26} strokeWidth={1.8} />
      <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.accentSoft, marginTop: 16 }}>Current streak</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 6, flexWrap: "wrap" }}>
        <div style={{ fontFamily: F.display, fontSize: 76, lineHeight: 0.9, color: C.bg }}>{attendance.streak.current}</div>
        <div style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 20, color: C.accentSoft }}>days strong</div>
      </div>
      <div style={{ marginTop: 22, paddingTop: 18, borderTop: `1px solid ${C.bg}33` }}>
        <div style={{ fontFamily: F.body, fontSize: 12, color: C.accentSoft }}>
          Personal best: <span style={{ color: C.bg, fontWeight: 500 }}>{attendance.streak.best} days</span>
        </div>
        <div style={{ fontFamily: F.mono, fontSize: 11, color: C.accentSoft, marginTop: 2 }}>
          {attendance.streak.bestStart} → {attendance.streak.bestEnd}
        </div>
      </div>
    </div>
  </div>
);

const AttendanceTab = () => (
  <div>
    {/* Today */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 18, marginBottom: 40 }}>
      <div style={{ background: C.forest, color: C.bg, borderRadius: 18, padding: 28 }}>
        <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.forestSoft, marginBottom: 14 }}>Today · {attendance.todayDate}</div>
        <Check size={36} strokeWidth={2.5} />
        <div style={{ fontFamily: F.display, fontSize: 44, lineHeight: 1, marginTop: 10 }}>Present</div>
        <div style={{ fontFamily: F.body, fontSize: 13, color: C.forestSoft, marginTop: 8 }}>All 6 periods marked present</div>
      </div>
      <Card style={{ padding: 24 }}>
        <SectionLabel>Today's periods</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          {attendance.todayPeriods.map(p => (
            <div key={p.period} style={{ background: C.forestSoft, border: `1px solid ${C.forest}22`, borderRadius: 10, padding: 12, textAlign: "center" }}>
              <div style={{ fontFamily: F.body, fontSize: 9.5, letterSpacing: 1.2, textTransform: "uppercase", color: C.forest, fontWeight: 500 }}>Period {p.period}</div>
              <Check size={18} color={C.forest} strokeWidth={2.5} style={{ margin: "8px auto" }} />
              <div style={{ fontFamily: F.body, fontSize: 11, color: C.ink }}>{p.class}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>

    {/* Summary */}
    <SectionLabel>Attendance summary</SectionLabel>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 40 }}>
      <SummaryStat label="This week"   data={attendance.week} />
      <SummaryStat label="This month"  data={attendance.month} />
      <SummaryStat label="Year to date" data={attendance.ytd} />
      <SummaryStat label="Attendance rate" data={attendance.ytd} accent />
    </div>

    {/* Streak + heatmap */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 2.4fr", gap: 18, marginBottom: 40 }}>
      <StreakCallout />
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
          <SectionLabel style={{ margin: 0 }}>Year at a glance</SectionLabel>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            {[["Present", C.forest], ["Tardy", C.warn], ["Absent", C.wine], ["Break", C.lineDark]].map(([l, col]) => (
              <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F.body, fontSize: 11, color: C.inkLight }}>
                <span style={{ width: 9, height: 9, background: col, borderRadius: 2 }} /> {l}
              </span>
            ))}
          </div>
        </div>
        <Heatmap />
      </Card>
    </div>

    {/* Milestones */}
    <SectionLabel>Streak milestones</SectionLabel>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10, marginBottom: 40 }}>
      {attendanceMilestones.map((m, i) => (
        <div
          key={i}
          style={{
            background: m.unlocked ? C.forestSoft : C.bgCard,
            border: m.unlocked ? `1px solid ${C.forest}33` : `1px dashed ${C.lineDark}`,
            borderRadius: 12, padding: 14, textAlign: "center",
            opacity: m.unlocked ? 1 : 0.85,
          }}
        >
          {m.unlocked
            ? <Check size={18} color={C.forest} strokeWidth={2.5} style={{ margin: "0 auto 8px", display: "block" }} />
            : <Lock size={16} color={C.inkMuted} strokeWidth={2} style={{ margin: "0 auto 8px", display: "block" }} />}
          <div style={{ fontFamily: F.body, fontSize: 12, fontWeight: 500, color: m.unlocked ? C.ink : C.inkLight }}>{m.label}</div>
          <div style={{ fontFamily: F.mono, fontSize: 10.5, color: C.inkMuted, marginTop: 4 }}>{m.date}</div>
        </div>
      ))}
    </div>

    {/* Recent */}
    <SectionLabel>Recent absences &amp; tardies</SectionLabel>
    <Card>
      {attendance.recent.map((r, i) => (
        <div key={i} style={{
          display: "grid", gridTemplateColumns: "1fr auto 2fr", gap: 18, alignItems: "center",
          padding: "12px 0",
          borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
        }}>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink }}>{r.day} · {r.date}</div>
          </div>
          <div>
            <Pill palette={r.type === "absent" ? "wine" : "warn"} small icon={r.type === "absent" ? AlertCircle : Clock}>
              {r.type === "absent" ? "Absent" : "Tardy"}
            </Pill>
          </div>
          <div style={{ fontFamily: F.body, fontSize: 12.5, color: C.inkLight }}>{r.note}</div>
        </div>
      ))}
    </Card>
  </div>
);

/* ============================================================ */
/* Tab: Report Card                                             */
/* ============================================================ */

const ReportCardTab = () => {
  const [period, setPeriod] = useState(reportCards[0].id);
  const card = reportCards.find(c => c.id === period);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {reportCards.map(c => (
            <button
              key={c.id}
              onClick={() => setPeriod(c.id)}
              style={{
                fontFamily: F.body, fontSize: 12, fontWeight: 500,
                background: period === c.id ? C.ink : "transparent",
                color: period === c.id ? C.bg : C.inkLight,
                border: `1px solid ${period === c.id ? C.ink : C.line}`,
                padding: "6px 14px", borderRadius: 999, cursor: "pointer",
              }}
            >{c.period}</button>
          ))}
        </div>
        <button className="mp-ghost-btn" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: F.body, fontSize: 13, fontWeight: 500, color: C.ink, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer" }}>
          <Download size={14} strokeWidth={2} /> Download PDF
        </button>
      </div>

      <Card style={{ padding: 40 }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingBottom: 18, borderBottom: `2px solid ${C.ink}` }}>
          <div>
            <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.inkMuted, fontWeight: 500 }}>{card.period} report card</div>
            <div style={{ fontFamily: F.display, fontSize: 28, color: C.ink, marginTop: 6 }}>{student.name}</div>
            <div style={{ fontFamily: F.body, fontSize: 13, color: C.inkLight, marginTop: 2 }}>{student.grade} · {student.school}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: F.mono, fontSize: 12, color: C.inkMuted }}>Issued {card.issued}</div>
            <div style={{ fontFamily: F.body, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: C.inkMuted, marginTop: 14 }}>Cumulative GPA</div>
            <div style={{ fontFamily: F.display, fontSize: 36, color: C.ink, lineHeight: 1 }}>{card.gpa.toFixed(2)}</div>
          </div>
        </div>

        {/* Table */}
        <div style={{ marginTop: 18 }}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.8fr 0.6fr 0.9fr 0.9fr 2.2fr",
            padding: "12px 0",
            fontFamily: F.body, fontSize: 11, letterSpacing: 1.2, textTransform: "uppercase", color: C.inkMuted, fontWeight: 500,
            borderBottom: `1px solid ${C.line}`,
          }}>
            <div>Course</div><div>Grade</div><div>Conduct</div><div>Effort</div><div>Teacher comment</div>
          </div>
          {card.classes.map((cls, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1.8fr 0.6fr 0.9fr 0.9fr 2.2fr",
              padding: "18px 0",
              borderBottom: i === card.classes.length - 1 ? "none" : `1px solid ${C.line}`,
              alignItems: "flex-start",
            }}>
              <div>
                <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.ink }}>{cls.course}</div>
                <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted, marginTop: 2 }}>{cls.teacher}</div>
              </div>
              <div style={{ fontFamily: F.display, fontSize: 26, color: C.ink, lineHeight: 1 }}>{cls.grade}</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink }}>{cls.conduct}</div>
              <div style={{ fontFamily: F.body, fontSize: 13, color: C.ink }}>{cls.effort}</div>
              <div style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 14, color: C.inkLight, lineHeight: 1.5 }}>{cls.comment}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28, paddingTop: 18, borderTop: `1px solid ${C.line}`, fontFamily: F.body, fontSize: 11, color: C.inkMuted, gap: 24, flexWrap: "wrap" }}>
          <div>This is an official record of academic standing. Subject to district FERPA policy.</div>
          <div>Generated from SIS · {student.school}</div>
        </div>
      </Card>
    </div>
  );
};

/* ============================================================ */
/* Root                                                         */
/* ============================================================ */

const TABS = [
  { id: "badges",      label: "Badges & Goals" },
  { id: "grades",      label: "Grades" },
  { id: "progress",    label: "Progress Report" },
  { id: "assessments", label: "Assessment Results" },
  { id: "attendance",  label: "Attendance" },
  { id: "reportcard",  label: "Report Card" },
];

export default function App() {
  const [tab, setTab] = useState("badges");
  const [activeBadge, setActiveBadge] = useState(null);
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [updatingGoal, setUpdatingGoal] = useState(null);

  return (
    <>
      <GlobalStyle />
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "40px 32px 80px", color: C.ink, fontFamily: F.body }}>
        {/* Header */}
        <header style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
            <div>
              <SectionLabel style={{ marginBottom: 6 }}>{student.year} · {student.period}</SectionLabel>
              <h1 style={{ fontFamily: F.display, fontSize: 52, margin: 0, color: C.ink, lineHeight: 1 }}>
                My <span style={{ fontStyle: "italic", color: C.accent }}>progress</span>
              </h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: F.body, fontSize: 14, fontWeight: 500, color: C.ink }}>{student.name}</div>
              <div style={{ fontFamily: F.body, fontSize: 12, color: C.inkMuted }}>{student.grade} · {student.school}</div>
            </div>
          </div>
        </header>

        {/* Sticky tabs */}
        <div
          style={{
            position: "sticky", top: 0, zIndex: 30,
            background: C.bg,
            borderBottom: `1px solid ${C.line}`,
            padding: "12px 0",
            marginBottom: 36,
            display: "flex", gap: 4, flexWrap: "wrap",
          }}
        >
          {TABS.map(t => (
            <button
              key={t.id}
              data-active={tab === t.id}
              className="mp-tab-btn"
              onClick={() => setTab(t.id)}
              style={{
                fontFamily: F.body, fontSize: 13, fontWeight: 500,
                background: tab === t.id ? C.ink : "transparent",
                color: tab === t.id ? C.bg : C.inkLight,
                border: "none",
                padding: "9px 16px", borderRadius: 999, cursor: "pointer",
              }}
            >{t.label}</button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "badges" && (
          <BadgesAndGoalsTab
            onOpenBadge={setActiveBadge}
            onCreateGoal={() => setCreatingGoal(true)}
            onUpdateGoal={setUpdatingGoal}
          />
        )}
        {tab === "grades"      && <GradesTab />}
        {tab === "progress"    && <ProgressReportTab />}
        {tab === "assessments" && <AssessmentResultsTab />}
        {tab === "attendance"  && <AttendanceTab />}
        {tab === "reportcard"  && <ReportCardTab />}

        {/* FERPA footer */}
        <footer style={{ marginTop: 80, paddingTop: 24, borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", fontFamily: F.body, fontSize: 11.5, color: C.inkMuted }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <ShieldCheck size={14} color={C.inkMuted} strokeWidth={1.6} />
            Your academic record is protected under FERPA. Only you and authorized staff can view this page.
          </div>
          <div>Lincoln High School · Student Information System</div>
        </footer>
      </div>

      {/* Modals */}
      {activeBadge ? <BadgeModal badge={activeBadge} onClose={() => setActiveBadge(null)} /> : null}
      {creatingGoal ? <GoalCreateModal onClose={() => setCreatingGoal(false)} /> : null}
      {updatingGoal ? <GoalUpdateModal goal={updatingGoal} onClose={() => setUpdatingGoal(null)} /> : null}
    </>
  );
}

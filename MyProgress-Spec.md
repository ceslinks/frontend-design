# My Progress — Build Specification

*A multi-surface student portal feature for a K-12 Student Information System (SIS)*

---

## Purpose of this document

This is a complete build specification for the **My Progress** feature, written for an AI coding assistant to implement from scratch. The document includes product reasoning, design decisions, technical requirements, and detailed UX specifications.

Read it top to bottom before starting. The **design philosophy** and **gamification principles** sections inform decisions throughout — applying them only at the end produces a different product than building with them in mind. When in doubt about an unspecified detail, the rationale embedded in each section should guide what to build.

---

## 1. Product context

### What the feature is

My Progress is the student-facing portal surface in a K-12 Student Information System. It consolidates a learner's academic and personal data — gradebook, attendance, report cards, standardized assessment results, goals, recognition badges — into one cohesive experience organized around what a student wants to know:

- *How am I doing right now?* → Grades
- *Where am I in the term?* → Progress Report
- *Am I on track for graduation?* → Assessment Results, which includes credential progress
- *Am I showing up?* → Attendance
- *What have I earned, and what should I aim for next?* → Badges & Goals
- *What does my official record say?* → Report Card

### Who it's for

The sole audience is the **student themself** — a 10th grader in this prototype, but the design must work for grades 6–12. The student is the only viewer of this surface. Parents have a separate parent-facing portal; teachers see a gradebook; counselors see a planning surface. This is student-first by design, not student-permissioned: the information architecture, tone, and visual decisions are all calibrated for a teenager checking their own data, not for an adult interpreting a report.

### FERPA and privacy

All data shown is the student's own academic record, protected under FERPA. The feature must be:

- **Read-only** from the student's perspective. Students never edit grades, report cards, attendance records, or assessment scores.
- **Single-user.** No roster comparison, no leaderboards, no peer ranking. Public comparison among teenagers creates anxiety, bullying risk, and FERPA exposure — all three reasons to avoid it.
- **Properly labeled.** A FERPA notice sits in the footer of every tab.

### Read-only philosophy

Almost every number on this page is sourced from a system elsewhere — the gradebook (entered by a teacher), the attendance record (front office), state assessments (district import), credentials (counselor). The student doesn't change these numbers; they witness them. The few things the student *can* interact with are:

- Creating a new goal
- Logging progress on a self-tracked goal (e.g., adding a book to a reading log)
- Viewing badge moments (read-only, but interactive)
- Filtering and expanding views (UI state only)

Everything else is observation. This is important because the gamification we layer on top should *never* incentivize gaming the data — students can't manipulate their grade or attendance to chase a streak, only see how the actual record translates into a felt sense of progress.

---

## 2. Design philosophy

### The "warm editorial" direction

Most K-12 SIS portals look the same: flat enterprise blue or institutional white, sans-serif everything, tabular data dumped onto pages, no personality. They communicate *"this is a database with a UI"* — not *"this is your school year."* The result is a screen students avoid until they have to look at it.

**My Progress is built in deliberate contrast to that aesthetic.** The visual direction is *warm editorial* — think the design of a high-end student planner or an independent magazine devoted to learning. A warm cream background, deep ink for text, an italic serif display face for headings, restrained accent colors used semantically, decorative SVG ornaments that signal *this place was designed for you, not just for the registrar*.

Specific choices and their reasoning:

- **Cream background (`#FAF6EE`) instead of white.** White is institutional; cream signals warmth, time, paper. A student returning every day should feel they're entering a considered space, not a tax form.
- **Instrument Serif for display type.** Italic variants emphasize key words ("My *progress*", "Active *quests*", "Badges to earn *next*") — a literary touch that reframes data as narrative. A generic sans-serif headline would lose this entirely.
- **DM Sans for body.** Modern, neutral, highly readable; pairs with the serif without competing.
- **JetBrains Mono for numbers.** Tabular figures (grades, scores, percentages, dates) sit in mono so they align cleanly and feel "data-like" within the otherwise typographic page.
- **Terracotta accent (`#B8451F`)** instead of generic blue. Distinctive, warm, signals attention without alarm.
- **Semantic palette** (forest = positive/streaks, wine = concerning/missing, ochre = caution/improvement-needed, sky = informational, gold = achievement). Color carries meaning, not decoration.

### Visual maximalism (within restraint)

Modern SaaS UI tends to strip away anything decorative. This feature pushes the other way: custom SVG badge medallions, a constellation backdrop on the Scholar Level hero, a GitHub-style attendance heatmap, an editorial ornament between sections.

The reasoning: students at this age respond to spaces that feel *crafted* for them. Stripped-down chrome reads as generic; visual texture reads as personal. The constraint is that decoration must serve the content, never compete with it. Every decorative element should pass the test: *does this help the content land, or is it ornament for ornament's sake?*

### What this design is NOT

- **Not a Duolingo clone.** No cartoon mascots, no floating "+50 XP!" numbers, no neon "LEVEL UP!" celebrations. Gamification is present but expressed through editorial sophistication (custom medallions, constellation backgrounds, streak counters), not arcade motifs. The audience is a 10th grader, not a 6-year-old.
- **Not a corporate dashboard.** No flat metric tiles in neat 4×4 grids with no breathing room. Layouts vary by surface; hierarchy is asymmetric where it should be (e.g., the Grades overall hero is 1.2fr / 2fr, not 1fr / 1fr).
- **Not a parent portal.** No "share with parents" buttons, no parent-facing summaries. This is the student's space.
- **Not a productivity tool.** Despite having goals and quests, this isn't a to-do app. The product manages the student's perception of progress; it doesn't manage their tasks.

---

## 3. Tech stack and constraints

The prototype is a **single-file React component** for fast iteration. Production would split into modules — the spec describes structure, not file organization.

### Required

- **React 18+** with hooks (function components, default export)
- **lucide-react** for icons. Specifically these imports: `Award, Target, BookOpen, FileText, BarChart3, Calendar, GraduationCap, TrendingUp, TrendingDown, Minus, Check, AlertCircle, Clock, ChevronRight, ChevronDown, Plus, Trophy, Sparkles, Star, Flame, Zap, Heart, Users, Lightbulb, ArrowUpRight, MessageSquare, Filter, Download, ShieldCheck, Info, X, BookMarked, MapPin, Pencil, Quote, ArrowLeft, ArrowRight, Lock, Compass`
- **recharts** for the GPA trend (AreaChart), benchmark history (LineChart). Bar charts have been removed; the attendance trend uses a custom SVG heatmap instead.
- **Google Fonts** imported via `<style>` tag inside the component: Instrument Serif (with italic), DM Sans (weights 400/500/700), JetBrains Mono (400/500).

### Deliberately not used

- **No external state management** (Redux, Zustand, Jotai). All state is `useState` at the appropriate level. Cross-tab state (active modal, currently selected badge) is lifted to the root component.
- **No router.** Tabs are state-driven (`const [tab, setTab] = useState("badges")`).
- **No CSS modules or Tailwind.** Inline styles via the `style` prop. One `<style>` tag at the root handles global rules: font import, hover states, scrollbar styling, keyframe animations.
- **No browser storage** (localStorage, sessionStorage). Wouldn't persist in artifact contexts and isn't needed for a prototype.
- **No backend calls.** All data is mocked in module-level `const` declarations at the top of the file.

### Why inline styles

Two reasons. First, the prototype is self-contained and portable across artifact contexts. Second, it forces the design system to be expressed as JavaScript constants (`C` for colors, `F` for fonts), which makes the system explicit and easy to refactor. Production would migrate to Tailwind tokens or CSS variables; the design tokens transfer cleanly.

---

## 4. Design system

### Color palette

The palette is intentionally small and semantic. Every color has a defined role; no decorative use.

```js
const C = {
  // Surfaces
  bg:        "#FAF6EE",  // Page background — warm cream
  bgCard:    "#FFFFFF",  // Card / panel background
  bgSubtle:  "#F2ECDE",  // Inset / muted surface (e.g., stat backgrounds)
  bgTinted:  "#F7F1E3",  // Expanded class detail background

  // Text
  ink:       "#1E1916",  // Primary text — near-black with warmth
  inkLight:  "#5A5048",  // Secondary text
  inkMuted:  "#9A8E80",  // Tertiary / labels / metadata

  // Borders
  line:      "#E8DFCC",  // Default card border
  lineDark:  "#D6CAB1",  // Stronger border / hover state

  // Accent — used sparingly for emphasis and brand
  accent:     "#B8451F", // Terracotta
  accentSoft: "#FBE8DA",

  // Semantic — each tied to meaning, never decorative
  gold:      "#8C6510",  // Achievement, recognition
  goldSoft:  "#F6E5BC",
  forest:    "#2A5A40",  // Positive, on-track, streaks
  forestSoft:"#DDEBDC",
  wine:      "#762A3C",  // Concerning, missing, declining
  wineSoft:  "#F0D9DE",
  sky:       "#27536D",  // Informational, neutral data
  skySoft:   "#D8E5EC",
  warn:      "#9C6520",  // Caution, area of concern
  warnSoft:  "#F5E5C9"
};
```

| Color | Use | Examples |
|---|---|---|
| `accent` (terracotta) | Brand emphasis, urgent quests, the italicized "progress" in the header | "My *progress*", urgent quest border |
| `gold` | Recognition, achievement, scholar level | Badge medallions, XP progress bar, Scholar Level label |
| `forest` | Positive states, streaks, on-track indicators | Streak counter, "Improving" trend, present attendance |
| `wine` | Negative / missing states | Missing assignments, absences, "Area of concern" |
| `warn` | Caution / improvement-needed | Spanish III grade concern, tardies |
| `sky` | Informational, teacher-set goals, factual context | Teacher-set goal pill, info banners |
| `ink` palette | Page background and primary text only — never decorative |  |

### Typography

```js
const F = {
  display: '"Instrument Serif", "Cormorant Garamond", Georgia, serif',
  body:    '"DM Sans", -apple-system, system-ui, sans-serif',
  mono:    '"JetBrains Mono", "SF Mono", Menlo, monospace'
};
```

**Display font (Instrument Serif)** is used at large sizes only — page header (52px), section headlines (28–36px), hero numbers (76–96px), badge names (19–26px). The italic variant is used to emphasize one or two words in headlines: `My <em>progress</em>`, `Active <em>quests</em>`. This italic-for-emphasis pattern is the single most important typographic signature of the design.

**Body font (DM Sans)** carries everything else: paragraphs, button labels, form inputs, card metadata. Weights used: 400 (regular), 500 (medium for emphasis), 700 (rare, only for very small label callouts).

**Mono font (JetBrains Mono)** is used for tabular data: scores like "94 / 100", dates like "May 14", XP counts like "3,420 / 4,000", percentages in tables. It signals "this is a measured value" within the otherwise typographic page.

### Spacing scale

The page uses a relaxed spacing scale appropriate for an editorial layout, not a dense dashboard:

- Section spacing: `marginBottom: 32–56`
- Card padding: `24–32` (heroes are larger, 28–40)
- Inter-element padding inside cards: `12–18`
- Form fields: `padding: 10px 14px` for inputs
- Border radius: `8` for buttons and small elements, `10–14` for cards, `18` for hero panels, `999` for pills and progress bars

### Component primitives

Build these as small reusable functions. They appear throughout every tab:

**`Card`** — The default surface. White background, 1px `line` border, 14px radius, 24px padding. Accepts a `style` prop for overrides. Used for almost every grouped section.

**`Pill`** — A small inline label. Accepts `palette` prop (one of: `gray`, `forest`, `wine`, `gold`, `sky`, `accent`, `warn`) and `small` boolean. Renders a rounded-full background with semantic color pairing. Used for status indicators, categories, trend labels.

**`SectionLabel`** — A small uppercase eyebrow above section content. 11px, 1.4px letter-spacing, `inkMuted` color, weight 500. Sits 12px above the section content. *Critical for the editorial feel* — these labels are everywhere and they create rhythm.

**`BadgeMedallion`** — Custom decorative SVG badge frame. Detailed below in the Badges & Goals section. This is the centerpiece visual component; do not substitute a simple icon-in-circle.

**`TrendArrow`** — A small indicator showing trend direction. Up arrow + green for positive, down arrow + wine for negative, flat dash + muted for no change. Takes a numeric value, displays it with appropriate symbol and color.

**`Ornament`** — A small decorative SVG flourish (centered line · dot · diamond · dot · line). Used once, between earned badges and locked badges, to signal a tonal shift without needing a heading. Use sparingly.

**`YearStat`** — A small stat block used inside the Scholar Level hero. Tiny icon top, large display-serif number, small uppercase label below.

### Layout patterns

- **Page container**: `maxWidth: 1160px`, centered, 32px horizontal padding.
- **Sticky tab navigation**: Below the header, `position: sticky, top: 0`. Active tab uses solid ink background with cream text (high contrast); inactive uses transparent background with muted text.
- **Hero patterns**: Most tabs open with a 2-column hero (e.g., `2fr 1fr` or `1.2fr 2fr`) where the left is a dark feature panel and the right is a complementary card. The Attendance tab inverts this for "Today" status.
- **Two-column responsive degradation**: Heroes use `flexWrap: "wrap"` so they collapse gracefully on narrow viewports.

---

## 5. Information architecture

Six tabs in a sticky horizontal navigation, in this order:

1. **Badges & Goals** — opens by default
2. **Grades**
3. **Progress Report**
4. **Assessment Results**
5. **Attendance**
6. **Report Card**

**The order is intentional.** Start with what's encouraging (badges, goals, quests), move through what's actionable (grades, narrative feedback), end with what's official (report card). A student who landed on Grades and saw a missing assignment as their first impression would have a different emotional relationship to the page than one who first sees their Scholar Level and recent badge.

This is also why **Badges & Goals is the default tab** — the first tab a student sees on opening the feature is meant to set a tone of recognition and possibility, not evaluation.

Each tab is a major surface with its own internal architecture. The next six sections detail each.


---

## 6. Tab specifications

### 6.1 Badges & Goals (default tab)

This is the most complex tab and the most important to get right tonally. It contains five major sections, in this top-to-bottom order:

1. Scholar Level + Year Stats hero (with Most Recent badge alongside)
2. Active Quests (three cards in a row)
3. Badge Collection (earned badges with category filter)
4. Locked Badges ("Badges to earn next") — separated by an `Ornament`
5. Active Goals

#### Section 1 — Scholar Level hero

A 2-column grid (`2fr 1fr`). Left side is the **Scholar Level hero**: dark ink (`C.ink`) background, cream text, 32px padding, 18px border radius, with a constellation SVG decoration in the background at 18% opacity.

The hero's content layout (z-indexed above the constellation):

- **Top row** — split between a left header and right "to next level" indicator:
  - Left: "Scholar Level" eyebrow, then a baseline-aligned row of the large level number (84px display serif) and the level title in italic gold (24px display serif). For this prototype: Level 7, "*Honored Scholar*".
  - Right: "To next level" eyebrow, then "3,420 / 4,000 XP" in mono, then "580 XP to Level 8" in soft gold mono.
- **Progress bar** — 5px tall, `inkLight` background, with a `linear-gradient(90deg, gold, goldSoft)` fill at the percentage `xp / nextLevelXP`. 24px below the top row, 24px above the stats strip.
- **Stats strip** — a 5-column grid of `YearStat` components: Badges (8), Books read (9), Streak (12d), On time (78%), Goals done (6). Two of them have an `accent` flag (Badges, Streak) which colors their icon `goldSoft` instead of `lineDark` — a subtle visual hierarchy.

**Why a Scholar Level?** A single number that aggregates many activities (badges, completed goals, attendance, on-time work) gives students a felt sense of yearly progress without reducing learning to a single grade. It's intentionally separate from GPA — it rewards behaviors and recognitions the GPA doesn't capture (showing up, finishing what you started, getting noticed for citizenship).

**Why an XP number?** Students don't need to understand the formula behind XP — the progress bar gives them the felt sense. The number is shown for legibility (so they can see "I'm 580 away") but the system intentionally doesn't expose how XP is awarded. This avoids gaming and keeps the focus on the activities themselves.

#### Constellation background

This is the key decorative element of the hero. An SVG with `viewBox="0 0 400 280"` and `preserveAspectRatio="xMidYMid slice"`, absolute-positioned to fill the panel:

- ~24 stars of varying radius (0.7 to 1.7), filled cream, scattered across the panel in a deterministic pattern (not random — pre-defined positions so it's stable across renders)
- ~8 thin lines (`strokeWidth=0.4`, 50% opacity) connecting subsets of stars into constellation patterns
- One **larger feature star** (8-point asterisk path) in gold-soft at ~85% across, 70% down
- One **smaller accent star** earlier in the panel

The whole SVG sits at 18% opacity. The result reads as celestial texture, not a literal constellation — it gives the level *ceremony* without distracting from the content.

#### Section 1 (right side) — Most Recent badge

A `Card` showing the student's most recent badge as a clickable element. Anatomy:

- "Most recent" `SectionLabel`
- 72px `BadgeMedallion`
- Badge name in display serif italic (26px)
- Description in body text (13px, `inkLight`)
- Footer: teacher name + date, with a small "View" call-to-action in accent (with `ArrowUpRight` icon)

The whole card is a button — clicking opens the `BadgeModal` for that badge.

#### Section 2 — Active Quests

A full-width section after the hero. A 3-column grid of quest cards.

Each **quest card** has:

- A soft palette-tinted circular wash in the top-right corner (140px circle, palette `bg` color at 40% opacity) — adds depth and pulls the quest's color into the card body
- A "days left" badge in the top-right corner, with a flipped style if urgent (≤3 days): urgent uses `accent` background with cream text; non-urgent uses palette `bg` and `fg`
- A 52px `BadgeMedallion` using the quest's icon and palette — *the quest icon is itself rendered as a medallion, since the reward at stake is a badge*
- Quest title in display serif (21px)
- Description in body text (12px, `inkLight`), with `minHeight: 50` so cards align even if descriptions vary
- Progress indicator: small uppercase "Progress" label and "X / Y" count, then a 6px progress bar in palette `fg` color
- "Issued by [Name]" line in small text
- **Tiered rewards section** (this is the most important part of the quest card):
  - `SectionLabel`-style heading: "What you'll earn"
  - **Standard reward** row: `Award` icon, reward name in medium weight, "Earned on completion" detail line. Flat layout, no special background — it's the floor.
  - **Bonus reward** row: same structure but wrapped in a palette-tinted background panel, with a `Sparkles` icon (not Award), a small uppercase "BONUS" eyebrow, the bonus reward name, and the criteria for earning it.

**Quest examples for the prototype** (each illustrates the tiered reward pattern):

```
1. "Perfect Submission Week" — System-issued
   Standard: Reliability badge (earned on completion)
   Bonus: Sharp Eye badge + 50 XP (if at least 2 submissions are 24+ hours early)

2. "Ms. Patel's Math Marathon" — Teacher-issued
   Standard: Math Streak badge (earned on completion)
   Bonus: Gold Streak — Distinction (if all three scores reach 95% or above)

3. "Read Across the World" — Teacher-issued  
   Standard: Global Reader badge (earned on completion)
   Bonus: Reflective Reader badge (if you write a short reflection on each book)
```

**Why tiered rewards?** Students who complete a quest on time should never feel they "lost" something — they get the standard reward, full stop. The bonus reward is upside for going above and beyond. The framing is positive throughout — never "if you don't finish early you lose this," always "finish early to earn extra." This matters because high school students are already anxious about deadlines; gamification should reduce anxiety, not amplify it.

**Why a mix of system and teacher quests?** System quests cover universal behaviors (on-time submission, attendance). Teacher quests are class-specific challenges that feel different — "Ms. Patel's Math Marathon" reads as personally issued, which creates accountability and connection. The product surfaces both in the same grid.

#### Section 3 — Badge Collection

A header row with the section title "Badge collection" (display serif, 32px) on the left and a filter strip on the right. The filter has pill buttons for "All", "Academic", "Effort", "Citizenship", "Milestone". Selected pill uses ink background with cream text.

Below the header, a responsive grid of badge cards: `repeat(auto-fill, minmax(220px, 1fr))`, 14px gap.

Each **badge card** anatomy:

- 56px `BadgeMedallion` at the top left
- If the badge has more than one moment, a small "N moments" indicator in the top right (10px uppercase, `inkMuted`)
- Badge name in display serif (19px)
- Description in body text (12px, `inkLight`, `minHeight: 34` to align rows)
- Footer row: category `Pill` on the left, date on the right, separated by a top border
- Hover state: translates 2px up, border darkens to `lineDark`

The whole card is a button — clicking opens the `BadgeModal`.

#### The BadgeMedallion component

This is the centerpiece visual element. It replaces the simple "icon in colored circle" treatment with a decorative SVG frame that makes badges look ceremonial rather than utilitarian.

Anatomy of one medallion (SVG with `viewBox="0 0 100 100"`):

1. **Outer dots ring** — 12 small circles around the perimeter (radius 47 from center). Every 3rd dot (i.e., the four at compass points) is larger (`r=1.8`); others are smaller (`r=1.1`). All filled in palette `fg` color at 60% opacity.
2. **Outer thin ring** — single stroked circle at radius 42, 0.6 stroke, 40% opacity in palette `fg`.
3. **Cardinal stars** — four small 4-point stars (drawn as SVG paths) at the N/E/S/W positions, radius 38 from center, filled in palette `fg` at 75% opacity. Each star is a small diamond-and-cross shape: `M0,-2.5 L0.7,-0.7 L2.5,0 L0.7,0.7 L0,2.5 L-0.7,0.7 L-2.5,0 L-0.7,-0.7 Z`.
4. **Inner medallion** — solid circle at radius 33 in palette `bg` color.
5. **Inner double rings** — two stroked circles at radius 33 (0.8 stroke, 55% opacity) and 29 (0.4 stroke, 35% opacity), both in palette `fg`.
6. **Center icon** — the lucide icon, sized at `size * 0.38`, in palette `fg` color, stroke width 1.5.

The component accepts:
- `icon` — the lucide icon component
- `palette` — one of the named palettes (gold, sky, accent, forest, wine)
- `size` — px size (default 64, used at 56 in gallery, 72 in Most Recent, 88 in modal, 52 in quest cards)
- `locked` — boolean. When true, swaps palette colors for muted (`inkMuted` for fg, `bgSubtle` for bg) and reduces all opacities by 45%.
- `mystery` — boolean. When true, replaces the center icon with a serif italic "?" character at `size * 0.42`. Used for the mystery badge.

#### Section 4 — Locked badges

Preceded by an `Ornament` divider (line · dot · diamond · dot · line) — signals a tonal shift from "what you've achieved" to "what's possible."

Heading: "Badges to *earn next*" (28px display serif, italic accent on "earn next"), with a subtitle: "4 more badges out there. Some you can see how to earn — one is a mystery."

Grid: same responsive layout as the earned collection.

Each **locked badge card**:

- Dashed `lineDark` border (vs solid on earned badges) — visually signals "not yet"
- 85% opacity on the whole card
- 56px `BadgeMedallion` with `locked` flag set (and `mystery` for the mystery one)
- `Lock` icon in the top right corner instead of moments count
- Badge name (mystery badges use `inkMuted` color)
- **Criteria text** instead of description: "Earn all A and A− grades for a full quarter." Mystery badges have an italic text instead: "Keep showing up — you'll know when you've earned it."
- Footer: dashed top border, "How to unlock" or "Hidden" label

**Why include locked badges?** Aspirational targets drive engagement without making the system feel reductive. Three badges have explicit criteria (so students know exactly how to earn them); one is a mystery badge to add intrigue. Discovery mechanics work for engagement but explicit goals work for action — including both is better than picking one.

#### Section 5 — Active Goals

Header row with "Active goals" (32px display serif) on the left and a "Set a new goal" button on the right (ghost button with `Plus` icon).

Stacked list of goal cards (1 per row, full width). Each **goal card** has:

- **Three pills** at the top showing the goal's metadata:
  1. Set-by pill (gold for "Self-set", sky for teacher-set) with `Target` icon
  2. Category pill (plain gray) — values: Grade, Reading, Habit, Assessment, Personal
  3. Tracking pill (accent for "You log this", gray for auto/teacher) showing the appropriate icon: `BarChart3` for auto, `Pencil` for self, `Users` for teacher

- Goal title (17px, weight 500)
- "Source: [data origin] · Due [date]" line in small `inkMuted` text. Examples:
  - "Source: English Literature gradebook · Due Jun 12"
  - "Source: Your reading log · Due Jun 4"
  - "Source: Missing-assignment tracker across all classes · Due Ongoing"
  - "Source: Mr. Okafor updates based on practice assessments · Due Spring 2026"

- Right side: large percentage in display serif (32px), `forest` if `≥75%`, otherwise `warn`. Below it: "9 / 12 books" in `inkMuted`.

- Progress bar below: 8px, `bgSubtle` background, fill in `forest` or `warn` (matching the percentage).

- **For self-tracked goals only**, a second row below the progress bar:
  - Left: "Last logged: *Project Hail Mary* on May 18" in small text
  - Right: "Update progress" ghost button with `Pencil` icon — opens the `GoalUpdateModal`

**Why the tracking taxonomy?** In the first prototype, goals had category labels like "Habit" and "Assessment" that floated without any underlying system — students couldn't see where the progress number came from. The new model makes the **source** explicit on every goal card. Three tracking modes:

- **Auto-tracked** (`tracking: "auto"`) — pulled from a system source (gradebook, attendance, etc.). Read-only progress. Shows source name.
- **Self-tracked** (`tracking: "self"`) — student updates manually. Shows "Last logged" preview and "Update progress" button.
- **Teacher-tracked** (`tracking: "teacher"`) — teacher updates the value. Read-only from student's view. Useful for assessment-tied or behavior goals where the student isn't the right reporter.

This makes the category and tracking method *together* explain what each goal is and where its data lives.

#### Modals

Three modals are triggered from this tab:

**`BadgeModal`** — opens when a badge card is clicked. Shows:
- 88px `BadgeMedallion` at top left
- Close button (X) at top right
- Category `Pill`
- Badge name (36px display serif)
- Description
- "Awarded [date] · by [teacher]" metadata line
- **Moments carousel** — for badges with feedback. Shows one moment at a time in a palette-tinted quote card (with a faint `Quote` icon corner mark). The teacher's note appears in display serif italic, with the teacher name and date below. Navigation: prev/next arrow buttons on the right of the moments header, plus clickable pip indicators at the bottom (active pip is 22px wide, inactive pips are 7px wide — both 7px tall).
- **Milestones list** — for count-based badges (e.g., "Reading Marathon"), shows milestones reached: "Book #10 — first milestone (Oct 24, 2025)", "Book #25 — halfway (Jan 12, 2026)", "Book #50 — Marathon unlocked (Apr 10, 2026)".

**Why moments?** Badges like "Voice of Reason" must have specific instances behind them — that feedback came from somewhere. Surfacing the moments lets students see the *evidence* for the recognition, not just the symbol. This is also a way for teachers' words to live on; without it, the badge is just a chip.

**Why pips for navigation?** Three to five moments per badge is too many to show all at once but too few to need search. Pips are the right pattern — they show how many moments exist and let students jump to any one.

**`GoalCreateModal`** — triggered by "Set a new goal" button. A real form with these fields:

1. **Goal title** — text input
2. **Category** — five clickable cards: Grade, Reading, Habit, Assessment, Personal. Each card has a label and a short description ("Reach a target grade in a class"). Selecting a category auto-suggests defaults for tracking and unit (Reading → "self" + "books"; Grade → "auto" + "%"; etc.).
3. **Target & Unit** — two side-by-side inputs
4. **Tracking method** — three radio options with descriptions:
   - Pulled automatically (from gradebook / attendance)
   - I'll log progress myself
   - My teacher will update it
5. **Linked class** — only shown if tracking is "auto". Dropdown of classes.
6. **Due date** — text input (open-ended, accepts "End of Q4", "Jun 12", "Ongoing")
7. **Share with teacher** — checkbox toggle. Description text changes based on tracking type (e.g., "Required so they can update progress" if teacher-tracked).

Footer: Cancel (ghost) + Create goal (primary) buttons.

**`GoalUpdateModal`** — triggered by "Update progress" on self-tracked goals. Has two variants:

*Reading goal variant* (when `goal.category === "Reading"`):
- "Where you are now" stat panel at top
- "Last logged: *[book]* on [date]" recap
- Book title input
- Author input
- 5-star rating selector
- **Reading log preview** — scrollable list of previously-logged books with title, author, date, and stars. First entry highlighted with `bgTinted` background.

*Generic increment variant* (other self-tracked goals):
- Current-state panel
- +/- counter for the increment amount
- Optional note textarea

Footer: Cancel + Save progress.

**Why a separate modal for reading goals?** Different data shape, different mental model. Logging a book finished is a specific event with metadata (title, author, rating, date); logging "+1 day of practice" is a simple counter. Trying to use one form for both creates a worse UX than two purpose-built forms.


### 6.2 Grades

This tab is the academic gradebook view. It's structured to answer "how am I doing?" at two levels: overall standing first, then per-class detail.

#### Section 1 — Overall standing

Eyebrow: "Overall standing · Quarter 3"

A 2-column grid (`1.2fr 2fr`):

- **Left: GPA hero panel.** Dark ink background, cream text, 28px padding. Contents:
  - "Cumulative GPA" eyebrow
  - GPA in display serif at 84px (e.g., 3.74), baseline-aligned with a small trend pill in forest soft ("+0.06 this term")
  - Divider line (subtle, in `inkLight`)
  - 3-column micro-stats footer: Classes (6), Credits on track (5.5 / 5.5), Missing work (2 — colored in `wineSoft` if positive count, in `bg` if zero)

- **Right: GPA trend chart.** A `Card` containing a "GPA trend · last 7 weeks" `SectionLabel` and an `AreaChart` from recharts. Chart styling:
  - 7-week dataset
  - X-axis: week labels (W1–W7), `inkMuted` 11px
  - Y-axis: 3.3–4.0 domain, `inkMuted` 11px
  - Area fill: linear gradient from accent at 25% opacity at top to accent at 0% at bottom (defined via `<linearGradient id="gpaG">`)
  - Stroke: solid 2.5px in accent
  - Tooltip styling: white card background with `line` border, 8px radius, 12px font

Below the 2-column hero, a "All classes — quick scan" `SectionLabel` and a 6-column grid of small class cards. Each shows the class name (11px, `inkMuted`, with `minHeight: 28` to allow 2 lines), the current grade in display serif (24px), and a `TrendArrow`.

**Critical interaction**: clicking any quick-scan card scrolls smoothly to the per-class detail below and expands that class's accordion. Implementation:

```js
onClick={() => {
  setExpanded(prev => ({ ...prev, [c.id]: true }));
  setTimeout(() => {
    document.getElementById(`class-${c.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 50);
}}
```

The 50ms timeout ensures the expanded state has rendered before scrolling.

#### Section 2 — By class

Header: "By class" (32px display serif) on the left, with subtitle "Each section shows the gradebook for that class only." On the right, "Expand all" / "Collapse all" ghost buttons.

Below, a stacked accordion of class sections, one per class. Each section is a `ClassSection` component.

#### ClassSection

A bordered card with two modes: collapsed (header only) and expanded (header + detail).

**Header** (always visible, full-width button):
- 5-column grid: name+meta, missing pill (if any), trend arrow, large grade, chevron
- Class name (17px, weight 500)
- "Ms. Patel · Period 1 · Room B204" metadata line in `inkMuted`
- "N missing" `Pill` (wine palette) only shown if class has missing assignments
- `TrendArrow` showing class trend value
- Large grade letter (30px display serif), with percentage below in mono (11px)
- `ChevronDown` icon — rotates 180° when expanded (via inline `transform`)

**Expanded body** (only rendered when expanded):
- Background changes to `bgTinted` to distinguish from collapsed cards
- "Categories & weights" `SectionLabel` and an N-column grid of category cards. Each card shows category name, weight percentage in mono, average in display serif, and a small horizontal bar.
- "Assignments · [Class Name] only" `SectionLabel` with assignment count on the right
- **Assignments table** — full-width table showing only this class's assignments:
  - Columns: Assignment, Category, Date, Score (right-aligned), % (right-aligned)
  - Missing assignments show `AlertCircle` icon + "MISSING" in wine
  - Score percentage is colored by performance: ≥90% forest, ≥80% ink, <80% warn
  - Date column uses mono font
  - Rows separated by `line` borders; last row has no border

**Why an accordion (not chips or per-class pages)?** Earlier prototypes used a chip selector that filtered the page to one class at a time. The user reported wanting to see *overall first, then break down by class*. An accordion achieves this: overall summary is always visible at top, classes are individually expandable below, and the quick-scan grid acts as a jump menu. Students can see one class, several classes, or all classes — they control the density.

**Why only one class's assignments per section?** This was explicit feedback from product review: the assignment table should be filtered to the class above it, not a global list. This way the mental model is clear: "in this section, I'm looking at this class."

**Default state**: `{alg: true}` — Algebra II expanded by default so the page never opens completely collapsed (which would feel like nothing is there). Other classes start collapsed.

### 6.3 Progress Report

A narrative-focused tab showing the current interim report.

- Header row: "Current interim" `SectionLabel`, then "Quarter 3, Mid-Term Interim" (36px display serif), "Issued May 8, 2026" subtitle. Right side: "Download PDF" ghost button.
- 3-column **MetricCard** strip:
  - Classes reviewed (gray palette)
  - Trending up (forest palette)
  - Areas of concern (warn palette if > 0, gray if 0)

`MetricCard` shows: small uppercase label, large display-serif value (40px), optional sub-text.

- Stacked list of **class comment cards** (one per class). Each card uses `borderLeft: 3px solid warn` if the class is flagged as an area of concern; otherwise the standard 1px line border.
  - Class name + concern/improving `Pill` if applicable
  - Teacher name in `inkMuted`
  - **Teacher comment** in italic, prefixed with a small `MessageSquare` icon, in display-feel typography
  - Right side: "Standing" eyebrow, large grade letter (44px display serif)

- "Prior interims" `SectionLabel` followed by a 2-column grid of ghost-button cards linking to past interim reports.

**Why italic teacher comments?** The italics carry the typographic implication of "this is someone's voice" — distinguishes the narrative feedback from the surrounding metadata. Comments are the most human element on the page; their treatment should reflect that.

### 6.4 Assessment Results

This tab has three sub-tabs in a segmented control: District benchmarks, State assessments, Credential progress.

The sub-tab control uses a pill-shaped container with `bgSubtle` background. Active sub-tab has white background with subtle shadow; inactive has transparent background.

#### Sub-tab 1: District benchmarks (NWEA MAP)

For each subject (Reading, Math):

- `Card` containing a 2-column grid:
  - Left: subject metadata, then a 3-column grid of small result cards (one per window: Fall '25, Winter '26, Spring '26). Each shows window label, scale score in mono, and a "Above"/"Proficient" `Pill`.
  - Right: a recharts `LineChart` showing the score trend across the three windows. Single line in accent color with circular dots.

The chart's Y-axis uses `domain={['dataMin - 5', 'dataMax + 5']}` so the line fills the chart vertically — students can see growth.

#### Sub-tab 2: State assessments (SBAC / PARCC)

A stacked list of school years (current → oldest). Each year is a `Card` with a 3-column layout:

- Left: "School year" eyebrow, year in display serif, grade level
- Middle: ELA results (scale score, level pill, 4-segment level indicator)
- Right: Math results (same shape)

The level indicator is a 4-segment horizontal bar showing the student's level (1–4). Segments are forest-colored if at-or-below the achieved level *and* passing (level ≥ 3); warn-colored if at-or-below but not passing; `bgSubtle` if above their achieved level. Labels below: "Standard not met" and "Exceeded" at the ends.

Below the year list, an informational banner in `skySoft` background explaining the SBAC scoring scale to the student.

**Why the informational banner?** A 10th grader doesn't necessarily know what SBAC scores mean, what scale scores are, or what Level 3 indicates. Surfacing this on-page (not buried in a help link) makes the data interpretable.

#### Sub-tab 3: Credential progress

This is graduation tracking, not assessment scoring. *Note: there's an argument that this section belongs in a separate "Graduation Progress" tab rather than under Assessment Results — see anti-patterns section. For this prototype it stays here.*

- **Hero card**: 2-column layout with a custom SVG donut chart on the left (140×140 SVG with two circles — background and progress arc), and a large headline on the right ("16 of 24 credits earned"). Donut uses `strokeDasharray` to draw the percentage arc.
- **Requirements grid**: 2-column grid of category cards. Each shows category name, "Done" pill if complete, earned/required count with percentage, progress bar, and the courses contributing ("English 9 · English 10").
- **Other requirements card**: a flat list of non-credit requirements like "Service hours" (with progress bar) and "Senior project" (with status pill: "Not started", "Scheduled Fall '26").

### 6.5 Attendance

The most gamified tab after Badges & Goals. Structured to celebrate consistency.

#### Section 1 — Today

A 2-column grid (`1fr 2fr`):

- **Left: Today panel.** Forest green (`C.forest`) background, cream text, 28px padding, 18px border radius.
  - "Today · [full date]" eyebrow (with `Date.prototype.toLocaleDateString`)
  - Large `Check` icon (36px, stroke width 2.5)
  - "Present" status in display serif (44px)
  - "All 6 periods marked present" subtitle

- **Right: Today's periods card.** 6-column grid of small period cells. Each cell shows: "PERIOD N" eyebrow, `Check` icon in forest, class name. Background `forestSoft`.

#### Section 2 — Attendance summary

`SectionLabel` then a 4-column grid of stat cards:

- This week, This month, Year to date — each shows percentage rate in display serif (40px) and a colored P/T/A breakdown line below
- Attendance rate — accent-colored card showing YTD percentage rate (e.g., 91.6%)

`SummaryStat` component takes a label and a data object `{present, absent, tardy, total}`.

#### Section 3 — Streak + heatmap (the gamified centerpiece)

A 2-column grid (`1fr 2.4fr`):

- **Left: Streak callout.** Accent (`C.accent`) background, cream text, 28px padding, 14px radius, with a large faded `Flame` icon decorating the bottom-right corner.
  - `Flame` icon (26px) at top
  - "Current streak" eyebrow in `accentSoft`
  - "12" in display serif at 76px, baseline-aligned with "*days strong*" in italic display serif (20px, `accentSoft`)
  - Top-border divider, then "Personal best: **47 days**" with date range ("Aug 12 → Oct 17, 2025") in smaller text

- **Right: Heatmap card.** Standard `Card` containing the attendance heatmap.
  - Header row: "Year at a glance" `SectionLabel` on the left, legend dots on the right (Present forest / Tardy warn / Absent wine / Break lineDark)
  - **The heatmap** (custom SVG component): 36 weeks × 5 weekdays grid of small rounded squares
    - 11px cells, 3px gap, 2px corner radius
    - Each cell colored by status: present (forest), tardy (warn), absent (wine), break (lineDark — for school breaks), future (bgSubtle — for upcoming days)
    - Month labels across the top (Aug, Sep, Oct, Nov, Dec, Jan, Feb, Mar, Apr, May) at specific week positions
    - Day labels down the left (M, T, W, T, F)
    - Realistic event distribution: ~3 tardies, ~3 absences, 2 weeks of Thanksgiving break (~week 17), 2 weeks of winter break (~weeks 19-20), 1 week of spring break (~week 30), and the last 2 weekdays of the current week marked "future"
  - Caption below in italic `inkMuted`: "Each square is one school day, August through May."

#### Section 4 — Streak milestones

`SectionLabel` then a 6-column grid of milestone cards.

Each milestone card shows:
- `Check` icon + green styling if `unlocked: true`
- `Lock` icon + muted styling if `unlocked: false`
- Milestone label (e.g., "10 days strong", "60 days strong", "Semester perfect", "100 days strong", "Full year perfect")
- Date below in mono

Unlocked: `forestSoft` background, solid border. Locked: card background with dashed `lineDark` border.

#### Section 5 — Recent absences & tardies

`SectionLabel` then a `Card` containing a flat list of recent attendance events. Each row: day-of-week + date on the left, status `Pill` (wine for absent, warn for tardy), and the explanation note.

**Why a heatmap instead of a bar chart?** The previous version used a stacked bar chart. The heatmap is denser, more "earned-by-effort" feeling, and rewards consistency visibly — students can scan the whole year and *see* what showing up looks like. It also borrows familiar visual vocabulary from GitHub contribution graphs, which many students recognize.

**Why a separate streak callout instead of just a number?** The streak is one of the most motivating elements; it deserves prominence. Placing it next to the heatmap creates a "narrative" — the current streak on the left, the broader pattern on the right. Plus the accent color of the streak panel breaks up the cream/ink monotony of the rest of the page.

### 6.6 Report Card

The most formal-feeling tab. Looks like an official document.

- Period selector at the top: a row of pill buttons (Q2, Q1, …), selected one uses ink background with cream text. Plus a "Download PDF" button on the right.

- Below, a large `Card` styled as a printed report card:
  - 40px padding
  - Heavy divider (`2px solid ink`) below the header
  - **Header row**: split between left (period label, student name + grade + school) and right (issued date in mono, GPA in display serif)
  - **Grades table**: columns for Course, Grade, Conduct, Effort, Teacher Comment. Course column has course name (medium weight) and teacher name (muted) stacked. Grade column has a large display-serif letter. Conduct and Effort are short text labels (Excellent, Strong, Satisfactory, Good). Comment column is italic muted text.
  - **Footer**: small `inkMuted` text with "official record" disclaimer on the left and "Generated from SIS · [School Name]" on the right.

The aesthetic should communicate "this is an official document" — heavier borders, formal layout, no decorative elements. This is the one tab where editorial flourishes don't belong; the report card is the formal record.


---

## 7. Gamification system (deep dive)

This is the most opinionated part of the design. Gamification done poorly is condescending for teenagers; done well, it adds motivation without infantilizing.

### Guiding principles

1. **Reward effort, not innate ability.** Streaks, on-time submission, books read, goals completed — all behaviors a student controls. We deliberately *don't* gamify grades themselves (no "grade streaks", no "consecutive A's" achievements), because that incentivizes score-chasing and risk-averse course selection.
2. **Always positive framing.** Bonus rewards are upside, never penalties. "Earn extra by finishing early" — never "you'll lose this if you're late."
3. **Compare students to their own past, not to peers.** Personal bests are celebrated; rankings are absent.
4. **Don't expose XP formulas.** Students see the level number and progress bar; they don't see "submitting on time = 10 XP per item." This avoids gaming and keeps focus on the activities themselves.
5. **Sophisticated visual language.** No cartoon characters, no neon, no floating point gains. The aesthetic borrows from NYT puzzle stats and Strava year-in-review — adult-feeling motivation systems.

### The four mechanics

#### Scholar Level
A single number that aggregates the student's yearly progress across badges earned, goals completed, attendance maintained, and work submitted on time. Each level has a title (Apprentice → Scholar → Honored Scholar → Distinguished → Polymath) shown in italic display serif. Progress to the next level is visualized as a horizontal bar with gold gradient.

**Why levels?** A single felt sense of "I'm progressing" that's separate from GPA. GPA is academic performance; Scholar Level rewards the broader behaviors (consistency, citizenship, ambition) that GPA misses.

#### Quests with tiered rewards
Time-limited challenges with a deadline and a defined reward path. Every quest has both a **standard reward** (guaranteed on completion) and a **bonus reward** (earned by finishing early or exceeding criteria). Visually, the standard reward is plain; the bonus reward is highlighted in a palette-tinted panel with a Sparkles icon and a small "BONUS" eyebrow.

Quests come from two sources:
- **System quests** cover universal good habits (on-time submission, attendance streaks)
- **Teacher quests** are class-specific challenges ("Ms. Patel's Math Marathon")

Why tiered? Earlier iterations had one reward per quest, which meant a student who finished on time felt the same as a student who finished early. The tiered system rewards going above and beyond without making on-time completion feel disappointing.

#### Streaks
Two streaks are tracked:
- **Attendance streak** (days strong) — current consecutive school days of present + on-time
- **Submission streak** (implied — used in quests but not surfaced as a top-level number)

Streaks earn milestones at 10 / 30 / 60 / 100 days. The streak milestones grid shows which are unlocked (forest soft background, solid border) and which are still ahead (dashed border, locked icon). The current streak gets a prominent accent-colored callout next to the heatmap.

Why streaks? They're one of the most motivating mechanics across consumer products (Snapchat streaks, Duolingo streaks, NYT Wordle streaks). For attendance specifically, they reframe "show up" from an obligation into an achievement.

#### Badges with moments
Recognition badges are awarded by teachers (or the system for milestones). Each earned badge surfaces:
- The specific moments of feedback that contributed to it (for behavioral badges like "Voice of Reason")
- Or the milestones reached (for count-based badges like "Reading Marathon")

Badges are visually rendered as custom SVG medallions (see BadgeMedallion spec above), not generic icons-in-circles. This signals "this is an award" rather than "this is a chip."

The badge collection also shows **locked badges** — aspirational targets the student hasn't earned yet, with their criteria visible. One mystery badge is intentionally opaque to add discovery mechanics.

### Anti-patterns we explicitly avoid

- **Public leaderboards.** Public comparison among teenagers creates anxiety and bullying risk. Plus FERPA exposure.
- **Loot boxes / random rewards.** No randomized reward mechanics. All rewards are earnable through specified behaviors.
- **Pay-to-progress.** Nothing about this is monetized. No premium badges, no purchasable cosmetics.
- **Grade-tied gamification.** No "A streak" achievement; no badges for highest grade. We don't want students avoiding hard classes to protect a streak.
- **Loss aversion.** No "your streak ends today if you don't…", no "you'll lose 100 XP." Gamification adds; it doesn't take away.
- **Childish visual language.** No cartoon characters, no comic-style speech bubbles, no neon "LEVEL UP!" animations. This is for high schoolers.
- **Notification spam.** No "you're 1 badge away from…" pestering. The locked badges section is the place students go to see what's possible; they're not pushed.

---

## 8. Data model

All mock data lives as module-level `const` declarations at the top of the file. Below are the key shapes.

### Student

```js
const student = {
  name: "Jordan Rivera",
  grade: "10th Grade",
  school: "Lincoln High School",
  year: "2025–2026",
  period: "Quarter 3",
  gpa: 3.74,
  gpaTrend: 0.06
};
```

### Year stats (Scholar Level)

```js
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
    goalsCompleted: 6
  }
};
```

### Badges

Each badge has either a `moments` array (for behavioral badges with teacher feedback) or a `milestones` array (for count-based badges).

```js
const badges = [
  {
    id: 1, name: "Voice of Reason",
    category: "Citizenship",       // Academic | Effort | Citizenship | Milestone
    date: "Mar 30",
    teacher: "Mr. Chen",
    icon: Heart,                    // lucide icon component
    palette: "forest",              // gold | sky | accent | forest | wine
    description: "Thoughtful contribution in class discussions.",
    moments: [
      { date: "Mar 30", teacher: "Mr. Chen",
        note: "Your point about how Atticus was wrestling with his own privilege showed real maturity. The discussion shifted because of you." },
      { date: "Mar 21", teacher: "Mr. Chen",
        note: "When Sarah challenged your reading of the chapter, you didn't get defensive — you actually changed your mind out loud. That's the hardest skill." },
      // ...
    ]
  },
  {
    id: 5, name: "Reading Marathon",
    category: "Milestone",
    // ...
    icon: BookMarked, palette: "wine",
    description: "Completed 50 books this academic year.",
    moments: [
      { date: "Apr 10", teacher: "Ms. Hartley",
        note: "Book #50 — and what a book to land on. Your reading log this year is genuinely remarkable." }
    ],
    milestones: [
      { label: "Book #10 — first milestone", date: "Oct 24, 2025" },
      { label: "Book #25 — halfway", date: "Jan 12, 2026" },
      { label: "Book #50 — Marathon unlocked", date: "Apr 10, 2026" }
    ]
  }
];
```

Provide 8 earned badges spanning all four categories, each with realistic teacher names and specific feedback. Treatment of feedback should feel authentic — quote actual classroom moments, not generic praise.

### Locked badges

```js
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
    description: "???" }
];
```

### Goals

```js
const goals = [
  { id: 1, title: "Raise English grade to A−",
    category: "Grade",              // Grade | Reading | Habit | Assessment | Personal
    setBy: "Self-set",              // "Self-set" or a teacher name
    target: 90, current: 86, unit: "%",
    due: "Jun 12",
    tracking: "auto",               // auto | self | teacher
    source: "English Literature gradebook" },
  { id: 2, title: "Read 12 books this quarter",
    category: "Reading", setBy: "Self-set",
    target: 12, current: 9, unit: "books",
    due: "Jun 4",
    tracking: "self",
    source: "Your reading log",
    lastLog: { title: "Project Hail Mary", date: "May 18", count: 9 } },
  { id: 4, title: "Improve SBAC Math by one level",
    category: "Assessment", setBy: "Mr. Okafor",
    target: 100, current: 65, unit: "% to target",
    due: "Spring 2026",
    tracking: "teacher",
    source: "Mr. Okafor updates based on practice assessments" }
];
```

Include 4 goals total: a Grade goal (auto), a Reading goal (self with lastLog), a Habit goal (auto), and an Assessment goal (teacher).

### Quests

```js
const quests = [
  { id: 1, title: "Perfect Submission Week",
    description: "Submit every assignment on time for 5 school days in a row.",
    progress: 3, target: 5,
    daysLeft: 2, deadline: "May 27",
    issuedBy: "System",
    palette: "forest", icon: Check,
    standardReward: { name: "Reliability badge", detail: "Earned on completion" },
    bonusReward: { name: "Sharp Eye badge + 50 XP",
                   detail: "If at least 2 submissions are 24+ hours early" } },
  // ... 2 more quests
];
```

Provide 3 quests total. Mix system-issued and teacher-issued. One should be urgent (`daysLeft ≤ 3`) so the urgent visual state is exercised.

### Classes

Each class has its own `categories` (with weights and averages) and `assignments` array. **Critical:** assignments are embedded in the class, not in a separate global gradebook — this is what allows the per-class accordion to filter naturally.

```js
const classes = [
  { id: "alg", name: "Algebra II", teacher: "Ms. Patel",
    room: "B204", period: "1",
    grade: "A−", percentage: 91, trend: 2, credits: 1.0,
    categories: [
      { name: "Tests", weight: 40, average: 89 },
      { name: "Quizzes", weight: 20, average: 92 },
      { name: "Homework", weight: 25, average: 95 },
      { name: "Participation", weight: 15, average: 88 }
    ],
    assignments: [
      { name: "Unit 7 Test: Quadratics", category: "Tests",
        date: "May 16", score: 92, total: 100, status: "graded" },
      { name: "Worksheet 7.3", category: "Homework",
        date: "May 9", score: null, total: 10, status: "missing" },
      // ... 4 more
    ]
  },
  // ... 5 more classes
];
```

Provide 6 classes total. Each with 4 categories and 3–6 assignments. Include at least 2 classes with a "missing" status assignment (so the missing pill renders); include realistic teacher names. Course mix should feel like a 10th grade schedule: Algebra II, English Literature, Chemistry, World History, Spanish III, Visual Arts.

### Overall GPA trend

```js
const overallTrend = [
  { week: "W1", gpa: 3.62 }, { week: "W2", gpa: 3.64 },
  { week: "W3", gpa: 3.68 }, { week: "W4", gpa: 3.68 },
  { week: "W5", gpa: 3.71 }, { week: "W6", gpa: 3.72 },
  { week: "W7", gpa: 3.74 }
];
```

### Reading log (for the GoalUpdateModal reading variant)

```js
const readingLog = [
  { id: 9, title: "Project Hail Mary", author: "Andy Weir",
    date: "May 18", rating: 5 },
  // ... 4 more, ordered newest first
];
```

### Progress report, assessments, credentials, attendance, report cards

Provide realistic mock data for each. Key shapes:

- `progressReport`: `{ period, date, classes: [...], history: [...] }` where each class has `{name, teacher, standing, trend, comment, concern}`
- `benchmarks`: `{ windows, subjects: [...] }` where each subject has results across three windows with `{window, score, percentile, level}`
- `stateResults`: array of school years, each with `{year, grade, ela: {score, level, levelLabel}, math: {...}}`
- `credentials`: `{ totalEarned, totalRequired, requirements: [...], other: [...] }`
- `attendance`: `{ todayStatus, todayPeriods, week, month, ytd, trend, recent }`
- `attendanceMilestones`: array of `{ label, date, unlocked }`
- `reportCards`: array of `{ period, issued, gpa, classes: [...] }`

---

## 9. Accessibility

Target: **WCAG 2.1 AA** at minimum, with AAA for body text contrast.

### Contrast pairings (verified safe within the palette)

- `ink` (#1E1916) on `bg` (#FAF6EE): ~17:1 — passes AAA easily
- `bg` (#FAF6EE) on `ink` (#1E1916): same as above, used in active tab and Scholar Level hero
- `inkLight` (#5A5048) on `bg` (#FAF6EE): ~7.4:1 — passes AAA for normal text
- `accent` (#B8451F) on `accentSoft` (#FBE8DA): ~4.5:1 — passes AA for normal text, marginal for small text
- `forest` (#2A5A40) on `forestSoft` (#DDEBDC): ~4.8:1 — passes AA
- `wine` (#762A3C) on `wineSoft` (#F0D9DE): ~4.6:1 — passes AA
- `gold` (#8C6510) on `goldSoft` (#F6E5BC): ~4.5:1 — passes AA

### Specific accessibility requirements

- Active tab uses inline `background: tab === t.id ? C.ink : "transparent"` — **don't** rely on CSS class for the active background, because inline `background: "transparent"` would override the class. (This is a real bug we hit in prototyping.)
- All icon-only buttons have `aria-label` (close buttons in modals, arrow buttons in carousels, pip indicators)
- Form inputs in modals have proper `<label>` elements (use the `labelStyle` constant for consistency)
- Color is never the sole indicator of meaning — pills always have an icon + text, trend arrows always include the numeric value, missing assignments always include the text "MISSING" in addition to the wine color
- Keyboard navigation should work for all interactions (tabs, accordion toggles, modal triggers, form fields)
- Focus states are not customized in the prototype but should be in production (visible focus ring on all interactive elements)

### Reduced motion

The page has minimal animation by default (200ms transitions on tabs, 400ms on progress bars, 150ms on modal overlay). Production should respect `prefers-reduced-motion` and remove or shorten these.

---

## 10. What NOT to do (anti-patterns summary)

- **Don't use a flat icon-in-colored-circle for badges.** The `BadgeMedallion` SVG is the centerpiece visual; substituting a simple circle defeats the editorial direction.
- **Don't add public leaderboards or peer comparison.** Anywhere.
- **Don't gamify grades themselves.** No "A streak", no "consecutive perfect scores" badges, no grade-based XP. We only gamify behaviors students control.
- **Don't use loss-aversion framing.** "You'll lose your streak if…" is wrong; "Keep your streak going" is right.
- **Don't expose XP formulas.** The level and progress bar are felt sense; specifics stay internal.
- **Don't use cartoon characters or mascots.** This is for 6th–12th graders; the visual language is editorial, not arcade.
- **Don't show motion graphics for unlocks.** Subtle CSS transitions (fade in, opacity changes) are fine; confetti explosions and floating "+50 XP!" notifications are not.
- **Don't put the Report Card surface under decorative ornament.** It's the formal record; flourishes belong elsewhere.
- **Don't mix Credential Progress with other Assessment Results visually in a confusing way.** Acknowledge in the spec that this is an imperfect grouping (it's not really assessment data). For this prototype, keep it as a sub-tab; production should consider splitting it into its own surface.
- **Don't autoplay anything.** No auto-advancing carousels, no auto-expanding accordions on hover.
- **Don't pre-check the "share with teacher" checkbox in the goal creation modal.** Sharing is a deliberate choice the student should make.

---

## 11. Implementation checklist (build order)

If building this from scratch in Claude Code, this order minimizes rework:

1. **Scaffold the project**: Vite + React, install `lucide-react` and `recharts`.
2. **Set up the design system**: define `C` (colors) and `F` (fonts) as exported constants. Add the `<style>` tag with Google Fonts import and global rules.
3. **Build the primitives**: `Card`, `Pill`, `SectionLabel`, `TrendArrow`. These appear everywhere; getting their proportions right early matters.
4. **Build `BadgeMedallion`**. Get the SVG math right at one size, then verify it scales (try sizes 48, 56, 64, 72, 88, 100).
5. **Build the root component** with state for `tab`, `activeBadge`, `creatingGoal`, `updatingGoal`. Add the header and sticky tab nav. Verify the active tab contrast bug doesn't recur.
6. **Build mock data** at the top of the file. All shapes from Section 8 above. This is reference data the rest of the build depends on.
7. **Build the Badges & Goals tab** in this order:
   1. Scholar Level hero (without constellation first, then add it)
   2. Most Recent card
   3. Quest cards (with tiered rewards)
   4. Badge collection grid
   5. Ornament + Locked badges
   6. Active Goals list
   7. BadgeModal, GoalCreateModal, GoalUpdateModal
8. **Build the Grades tab**: overall hero, quick scan grid, accordion class sections with embedded assignments.
9. **Build the Progress Report tab**: simple stacked layout, less complex than the others.
10. **Build the Assessment Results tab**: sub-tab control + three sub-views.
11. **Build the Attendance tab**: today panel, summary stats, streak callout + heatmap (this is the most custom SVG work after BadgeMedallion), milestones, recent events.
12. **Build the Report Card tab**: formal document layout.
13. **Polish**: verify contrast on all surfaces, check accessibility labels, check hover states, check the active tab background.

### Common pitfalls

- **The "filtered" badge gallery** uses `useState` for filter, but `filter === "All"` must short-circuit to show all badges. Don't filter by `b.category === "All"` (which would return nothing).
- **The accordion expand state** is a `{[classId]: boolean}` object, not a single ID. This allows multiple classes to be expanded simultaneously.
- **The smooth-scroll-to-class** from the quick-scan grid needs a `setTimeout` of 50ms after setting expanded state, so React has time to re-render before `scrollIntoView` measures the layout.
- **The constellation SVG uses `preserveAspectRatio="xMidYMid slice"`** which means the SVG fills the panel and crops as needed. This is correct behavior — the stars stay visually distributed regardless of panel width.
- **The heatmap month labels** must align with their week positions. Use specific week indices for each month label, not even spacing.
- **Modal overlay click-outside-to-close** requires `e.stopPropagation()` on the inner modal content's click handler, so clicks inside the modal don't bubble up to the overlay click handler.
- **The reading log preview in `GoalUpdateModal`** highlights the first entry with `bgTinted` background — this visually represents "this is the most recent book."

---

## Appendix: file structure recommendation

For production (not prototype):

```
my-progress/
├── src/
│   ├── MyProgress/
│   │   ├── index.jsx                    // Root, exports default
│   │   ├── data/                        // Mock data (move to API later)
│   │   │   ├── student.js
│   │   │   ├── badges.js
│   │   │   ├── goals.js
│   │   │   ├── quests.js
│   │   │   ├── classes.js
│   │   │   ├── progressReport.js
│   │   │   ├── assessments.js
│   │   │   ├── attendance.js
│   │   │   └── reportCards.js
│   │   ├── theme/
│   │   │   ├── colors.js                // The C constant
│   │   │   ├── fonts.js                 // The F constant
│   │   │   └── GlobalStyle.jsx          // The <style> tag content
│   │   ├── primitives/
│   │   │   ├── Card.jsx
│   │   │   ├── Pill.jsx
│   │   │   ├── SectionLabel.jsx
│   │   │   ├── TrendArrow.jsx
│   │   │   ├── BadgeMedallion.jsx
│   │   │   ├── Ornament.jsx
│   │   │   └── YearStat.jsx
│   │   ├── tabs/
│   │   │   ├── BadgesAndGoals/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── ScholarLevelHero.jsx
│   │   │   │   ├── Constellation.jsx
│   │   │   │   ├── QuestCard.jsx
│   │   │   │   ├── BadgeCard.jsx
│   │   │   │   ├── LockedBadgeCard.jsx
│   │   │   │   └── GoalCard.jsx
│   │   │   ├── Grades/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── OverallHero.jsx
│   │   │   │   ├── QuickScanGrid.jsx
│   │   │   │   └── ClassSection.jsx
│   │   │   ├── ProgressReport.jsx
│   │   │   ├── Assessments/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── DistrictBenchmarks.jsx
│   │   │   │   ├── StateAssessments.jsx
│   │   │   │   └── CredentialProgress.jsx
│   │   │   ├── Attendance/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── StreakCallout.jsx
│   │   │   │   ├── Heatmap.jsx
│   │   │   │   └── Milestones.jsx
│   │   │   └── ReportCard.jsx
│   │   └── modals/
│   │       ├── ModalShell.jsx
│   │       ├── BadgeModal.jsx
│   │       ├── GoalCreateModal.jsx
│   │       └── GoalUpdateModal.jsx
│   └── ...
```

The single-file prototype maps cleanly to this structure when ready to scale.

---

*End of specification.*

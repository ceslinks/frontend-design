// LINKS Curriculum Builder — sample course data (Biology 10 — modeled after AP-style biology unit)

const CB_COURSE = {
  code: "BIO 1010",
  title: "Biology 10 · Honors",
  term: "Spring '26",
  teacher: "Ms. R. Okafor",
  sections: ["Period 2 · M/W/F", "Period 4 · T/Th block", "Period 7 · M/W/F"],
  cycles: ["Engage", "Explore", "Explain", "Elaborate", "Evaluate"],
};

const CB_STANDARD_DESCS = {
  "NGSS HS-LS2-5": "Carbon cycling among biosphere, atmosphere, hydrosphere, and geosphere.",
  "NGSS HS-LS2-7": "Design solutions for reducing impacts of human activities on biodiversity.",
  "NGSS HS-LS1-5": "Photosynthesis transforms light energy into stored chemical energy.",
  "NGSS HS-LS1-6": "Carbon, hydrogen, oxygen flow through organic molecules.",
  "NGSS HS-LS1-7": "Cellular respiration releases energy from food molecules.",
  "NGSS HS-LS2-3": "Cycling of matter and flow of energy in aerobic vs. anaerobic conditions.",
  "NGSS HS-LS2-4": "Mathematical model for matter & energy transfer in trophic levels.",
  "CCSS RST.9-10.7": "Translate technical text into visual form (and vice versa).",
  "CCSS WHST.9-10.1": "Write arguments focused on discipline-specific content.",
};

// Material kinds — colors match the design system tonal accents
const MAT_COLORS = {
  doc: "#1E3A5F",      // navy
  slides: "#E07A2D",   // orange
  video: "#C0392B",    // wine
  link: "#2E9B62",     // green
  lab: "#6D28D9",      // violet
};

// Helper to make ids stable
const lid = (u, n) => `${u}-l${n}`;

const CB_UNITS = [
  {
    id: "u1",
    label: "Unit 1",
    title: "Ecosystems & Energy Flow",
    color: "#2E9B62",
    weeks: "Wks 1–3",
    summary: "Energy capture, trophic transfer, and matter cycling in ecosystems. Anchor phenomenon: a struggling kelp forest off Monterey.",
    progress: 0.78,
    lessons: [
      {
        id: lid("u1", 1), index: "1.1", day: "Mon, Jan 12", duration: 50,
        title: "Anchor: the Monterey kelp forest mystery",
        type: "discussion", cycle: "Engage", status: "taught",
        objective: "Generate driving questions from a real-world ecosystem disturbance.",
        standards: ["NGSS HS-LS2-5"],
        materials: [
          { id: "m1", kind: "video", kindColor: MAT_COLORS.video, title: "MBARI · Kelp forest decline (4:12)", size: "video" },
          { id: "m2", kind: "doc", kindColor: MAT_COLORS.doc, title: "Driving Question Board · template", size: "PDF · 1 pg" },
        ],
      },
      {
        id: lid("u1", 2), index: "1.2", day: "Wed, Jan 14", duration: 50,
        title: "Producers, consumers, and food webs",
        type: "lecture", cycle: "Explore", status: "taught",
        objective: "Diagram a food web with at least three trophic levels and label energy flow.",
        standards: ["NGSS HS-LS2-4", "CCSS RST.9-10.7"],
        materials: [
          { id: "m3", kind: "slides", kindColor: MAT_COLORS.slides, title: "Trophic levels deck", size: "Slides · 22" },
          { id: "m4", kind: "doc", kindColor: MAT_COLORS.doc, title: "Food web worksheet", size: "PDF · 2 pg" },
        ],
      },
      {
        id: lid("u1", 3), index: "1.3", day: "Fri, Jan 16", duration: 50,
        title: "Lab: photosynthesis with elodea & BTB",
        type: "lab", cycle: "Explore", status: "taught",
        objective: "Use bromothymol blue to detect CO₂ uptake during photosynthesis under different light conditions.",
        standards: ["NGSS HS-LS1-5", "NGSS HS-LS2-5"],
        blocks: [
          { id: "b1", type: "Warm-up", duration: 8, title: "Bell-ringer: name 3 carbon cycle reservoirs", color: "#E07A2D" },
          { id: "b2", type: "Direct instruction", duration: 18, title: "Mini-lecture + carbon cycle diagram", color: "#1E3A5F" },
          { id: "b3", type: "Lab activity", duration: 25, title: "BTB indicator with elodea + light/dark", color: "#2E9B62" },
          { id: "b4", type: "Reflection", duration: 9, title: "Exit ticket: 2 observations, 1 question", color: "#6D28D9" },
        ],
        materials: [
          { id: "m5", kind: "lab", kindColor: MAT_COLORS.lab, title: "Elodea & BTB lab protocol", size: "PDF · 4 pg" },
          { id: "m6", kind: "doc", kindColor: MAT_COLORS.doc, title: "Lab safety contract", size: "PDF · 1 pg" },
          { id: "m7", kind: "video", kindColor: MAT_COLORS.video, title: "Lab demo walkthrough", size: "video · 3:10" },
          { id: "m8", kind: "link", kindColor: MAT_COLORS.link, title: "PhET · Photosynthesis sim", size: "external" },
        ],
      },
      {
        id: lid("u1", 4), index: "1.4", day: "Mon, Jan 19", duration: 50,
        title: "Cellular respiration: the other half of the cycle",
        type: "lecture", cycle: "Explain", status: "taught",
        objective: "Compare reactants and products of photosynthesis vs. cellular respiration.",
        standards: ["NGSS HS-LS1-7", "NGSS HS-LS1-6"],
        materials: [
          { id: "m9", kind: "slides", kindColor: MAT_COLORS.slides, title: "Respiration deck", size: "Slides · 18" },
        ],
      },
      {
        id: lid("u1", 5), index: "1.5", day: "Wed, Jan 21", duration: 50,
        title: "Workshop: model building — carbon cycle",
        type: "workshop", cycle: "Elaborate", status: "in-progress",
        objective: "Construct a system model showing carbon flow through 5 reservoirs.",
        standards: ["NGSS HS-LS2-5", "CCSS RST.9-10.7"],
        materials: [
          { id: "m10", kind: "doc", kindColor: MAT_COLORS.doc, title: "Modeling rubric (4-point)", size: "PDF · 1 pg" },
        ],
      },
      {
        id: lid("u1", 6), index: "1.6", day: "Fri, Jan 23", duration: 50,
        title: "Quiz: producers, consumers, decomposers",
        type: "assessment", cycle: "Evaluate", status: "draft",
        objective: "Demonstrate fluency with energy flow vocabulary and food web reasoning.",
        standards: ["NGSS HS-LS2-4"],
        materials: [
          { id: "m11", kind: "doc", kindColor: MAT_COLORS.doc, title: "Quiz 1.1 (12 questions)", size: "PDF · 3 pg" },
        ],
      },
    ],
  },
  {
    id: "u2",
    label: "Unit 2",
    title: "Population Dynamics",
    color: "#1E3A5F",
    weeks: "Wks 4–6",
    summary: "Logistic & exponential growth, carrying capacity, density-dependent factors. Centered on a sea otter recovery dataset.",
    progress: 0.32,
    lessons: [
      {
        id: lid("u2", 1), index: "2.1", day: "Mon, Feb 2", duration: 50,
        title: "Why don't bunnies cover the earth?",
        type: "discussion", cycle: "Engage", status: "in-progress",
        objective: "Generate hypotheses for why populations don't grow without limit.",
        standards: ["NGSS HS-LS2-3"],
        materials: [
          { id: "m12", kind: "video", kindColor: MAT_COLORS.video, title: "Sea otter recovery · KQED", size: "video · 6:45" },
        ],
      },
      {
        id: lid("u2", 2), index: "2.2", day: "Wed, Feb 4", duration: 50,
        title: "Exponential vs. logistic growth",
        type: "lecture", cycle: "Explain", status: "draft",
        objective: "Distinguish exponential and logistic growth models with annotated graphs.",
        standards: ["NGSS HS-LS2-4", "CCSS RST.9-10.7"],
        materials: [
          { id: "m13", kind: "slides", kindColor: MAT_COLORS.slides, title: "Growth models deck", size: "Slides · 24" },
        ],
      },
      {
        id: lid("u2", 3), index: "2.3", day: "Fri, Feb 6", duration: 50,
        title: "Lab: yeast population growth (3-day)",
        type: "lab", cycle: "Explore", status: "draft",
        objective: "Collect time-series data and fit a logistic model.",
        standards: ["NGSS HS-LS2-3", "CCSS RST.9-10.7"],
        materials: [
          { id: "m14", kind: "lab", kindColor: MAT_COLORS.lab, title: "Yeast growth protocol", size: "PDF · 5 pg" },
          { id: "m15", kind: "link", kindColor: MAT_COLORS.link, title: "Desmos · logistic fit tool", size: "external" },
        ],
      },
      {
        id: lid("u2", 4), index: "2.4", day: "Mon, Feb 9", duration: 50,
        title: "Density-dependent factors",
        type: "lecture", cycle: "Explain", status: "outline",
        objective: "List four density-dependent factors and predict their effects.",
        standards: ["NGSS HS-LS2-3"],
        materials: [],
      },
      {
        id: lid("u2", 5), index: "2.5", day: "Wed, Feb 11", duration: 50,
        title: "Workshop: case study analysis",
        type: "workshop", cycle: "Elaborate", status: "outline",
        objective: "Apply growth models to a real population dataset.",
        standards: ["NGSS HS-LS2-4"],
        materials: [],
      },
      {
        id: lid("u2", 6), index: "2.6", day: "Fri, Feb 13", duration: 50,
        title: "Unit 2 assessment",
        type: "assessment", cycle: "Evaluate", status: "outline",
        objective: "Demonstrate mastery of population growth models.",
        standards: ["NGSS HS-LS2-3", "NGSS HS-LS2-4"],
        materials: [],
      },
    ],
  },
  {
    id: "u3",
    label: "Unit 3",
    title: "Biodiversity & Human Impact",
    color: "#E07A2D",
    weeks: "Wks 7–9",
    summary: "Drivers of biodiversity loss; climate, land-use, and conservation interventions. Capstone: design a local restoration plan.",
    progress: 0.05,
    lessons: [
      {
        id: lid("u3", 1), index: "3.1", day: "Mon, Feb 23", duration: 50,
        title: "What counts as biodiversity?",
        type: "discussion", cycle: "Engage", status: "outline",
        objective: "Define biodiversity at gene, species, and ecosystem levels.",
        standards: ["NGSS HS-LS2-7"],
        materials: [],
      },
      {
        id: lid("u3", 2), index: "3.2", day: "Wed, Feb 25", duration: 50,
        title: "Five drivers of biodiversity loss",
        type: "lecture", cycle: "Explain", status: "outline",
        objective: "Identify and rank drivers of biodiversity loss.",
        standards: ["NGSS HS-LS2-7"],
        materials: [],
      },
      {
        id: lid("u3", 3), index: "3.3", day: "Fri, Feb 27", duration: 50,
        title: "Field study: schoolyard biodiversity",
        type: "lab", cycle: "Explore", status: "outline",
        objective: "Conduct a quadrat survey and calculate Simpson's diversity index.",
        standards: ["NGSS HS-LS2-7", "CCSS RST.9-10.7"],
        materials: [],
      },
      {
        id: lid("u3", 4), index: "3.4", day: "Mon, Mar 2", duration: 50,
        title: "Restoration design workshop",
        type: "workshop", cycle: "Elaborate", status: "outline",
        objective: "Begin a restoration plan with measurable goals.",
        standards: ["NGSS HS-LS2-7", "CCSS WHST.9-10.1"],
        materials: [],
      },
    ],
  },
  {
    id: "u4",
    label: "Unit 4",
    title: "Capstone · Restoration Proposal",
    color: "#6D28D9",
    weeks: "Wks 10–12",
    summary: "Student-led capstone. Teams produce a written + oral restoration proposal for a partner site (Audubon, city parks, watershed council).",
    progress: 0.0,
    lessons: [
      {
        id: lid("u4", 1), index: "4.1", day: "Mon, Mar 9", duration: 50,
        title: "Capstone kickoff & team formation",
        type: "discussion", cycle: "Engage", status: "outline",
        objective: "Form teams and select a partner site.",
        standards: ["CCSS WHST.9-10.1"],
        materials: [],
      },
      {
        id: lid("u4", 2), index: "4.2", day: "Wed, Mar 11", duration: 50,
        title: "Workshop: scoping the proposal",
        type: "workshop", cycle: "Elaborate", status: "outline",
        objective: "Draft a 1-page proposal scope.",
        standards: ["CCSS WHST.9-10.1"],
        materials: [],
      },
      {
        id: lid("u4", 3), index: "4.3", day: "Fri, Mar 13", duration: 50,
        title: "Peer review studio",
        type: "workshop", cycle: "Evaluate", status: "outline",
        objective: "Give and receive structured peer feedback.",
        standards: ["CCSS WHST.9-10.1"],
        materials: [],
      },
      {
        id: lid("u4", 4), index: "4.4", day: "Mon, Mar 23", duration: 50,
        title: "Final presentations · day 1",
        type: "assessment", cycle: "Evaluate", status: "outline",
        objective: "Present restoration proposal to partner panel.",
        standards: ["CCSS WHST.9-10.1", "NGSS HS-LS2-7"],
        materials: [],
      },
      {
        id: lid("u4", 5), index: "4.5", day: "Wed, Mar 25", duration: 50,
        title: "Final presentations · day 2",
        type: "assessment", cycle: "Evaluate", status: "outline",
        objective: "Present restoration proposal to partner panel.",
        standards: ["CCSS WHST.9-10.1", "NGSS HS-LS2-7"],
        materials: [],
      },
      {
        id: lid("u4", 6), index: "4.6", day: "Fri, Mar 27", duration: 50,
        title: "Reflection & portfolio submission",
        type: "discussion", cycle: "Evaluate", status: "outline",
        objective: "Submit final portfolio with reflective letter.",
        standards: ["CCSS WHST.9-10.1"],
        materials: [],
      },
    ],
  },
];

window.CB_COURSE = CB_COURSE;
window.CB_UNITS = CB_UNITS;
window.CB_STANDARD_DESCS = CB_STANDARD_DESCS;
window.CB_MAT_COLORS = MAT_COLORS;

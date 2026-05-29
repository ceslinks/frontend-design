// LINKS — My Activities Portal (5-tab system)

const Page = window.Page;
const I = window.I;

/* ── CATEGORY COLORS ─────────────────────────────────────────── */
const ACT_CAT = {
  Athletics:      { bg: "#E1F5EE", text: "#0F6E56" },
  Academic:       { bg: "#E6F1FB", text: "#0C447C" },
  Clubs:          { bg: "#EEEDFE", text: "#3C3489" },
  Service:        { bg: "#FAECE7", text: "#993C1D" },
  Arts:           { bg: "#FBEAF0", text: "#993556" },
  "School-wide":  { bg: "#FAEEDA", text: "#854F0B" },
};

const STATUS_COLOR = {
  "New":           { bg: "#FEF3C7", text: "#92400E" },
  "Closing soon":  { bg: "#FEE2E2", text: "#991B1B" },
  "Tryout date":   { bg: "#DBEAFE", text: "#1E40AF" },
  "In season":     { bg: "#D1FAE5", text: "#065F46" },
  "Active":        { bg: "#D1FAE5", text: "#065F46" },
  "Action needed": { bg: "#FEF3C7", text: "#92400E" },
  "Waitlisted":    { bg: "#F3F4F6", text: "#4B5563" },
  "Open":          { bg: "#DBEAFE", text: "#1E40AF" },
};

const ANN_TYPE_COLOR = {
  "Cancelled":    { bg: "#FEE2E2", text: "#991B1B" },
  "Reminder":     { bg: "#FEF3C7", text: "#92400E" },
  "Update":       { bg: "#DBEAFE", text: "#1E40AF" },
  "School-wide":  { bg: "#FEF3C7", text: "#92400E" },
  "Congrats":     { bg: "#D1FAE5", text: "#065F46" },
};

const JOB_CAT = {
  Library: { bg: "#EDE9FE", text: "#5B21B6" },
  Office:  { bg: "#E0F2FE", text: "#075985" },
  Tech:    { bg: "#DCFCE7", text: "#166534" },
  Other:   { bg: "#FEF3C7", text: "#92400E" },
};

/* ── DATA ────────────────────────────────────────────────────── */

const JOBS_DATA = [
  {
    id: "j1", title: "Library Assistant", department: "Library",
    supervisor: "Mrs. Hendricks", supervisorEmail: "hendricks@wyndham.edu",
    supervisorRole: "Head Librarian", spots: 2, category: "Library", time: "Free period",
    schedule: "Mon & Wed free periods", hoursPerWeek: "~2 hrs/week",
    duration: "Full semester", credits: "0.5 / semester", icon: "📚",
    about: "Help shelve and catalog books, assist students finding resources, and support the librarian. Great for students who love books or want to explore information science.",
    whatYoullDo: ["Shelve returned books in call-number order", "Help students locate materials", "Process new arrivals", "Assist with overdue notices", "Keep reading areas tidy"],
    requirements: ["GPA 2.0 or above", "Punctual and reliable", "Comfortable with quiet focused work"],
    todaySlot: null, tomorrowSlot: null,
    laterSlot: { day: "Wed", date: 15, time: "10:30 AM", location: "Library" },
  },
  {
    id: "j2", title: "Main Office Aide", department: "Administration",
    supervisor: "Ms. Torres", supervisorEmail: "torres-admin@wyndham.edu",
    supervisorRole: "Office Manager", spots: 1, category: "Office", time: "Free period",
    schedule: "Tue & Thu free periods", hoursPerWeek: "~2 hrs/week",
    duration: "Full semester", credits: "0.5 / semester", icon: "🗂️",
    about: "Assist the front office with filing, answering the phone, greeting visitors, and delivering inter-school mail. Builds professional communication skills.",
    whatYoullDo: ["Answer the front desk phone", "Greet and sign in visitors", "Sort and deliver mail", "Assist with data entry", "Run errands between offices"],
    requirements: ["Professional manner", "Comfortable speaking to adults", "Discretion with private information"],
    todaySlot: null,
    tomorrowSlot: { time: "11:15 AM", location: "Main office" },
    laterSlot: null,
  },
  {
    id: "j3", title: "IT Help Desk", department: "Technology",
    supervisor: "Mr. Patel", supervisorEmail: "patel@wyndham.edu",
    supervisorRole: "IT Coordinator", spots: 2, category: "Tech", time: "Lunch",
    schedule: "Daily lunch period", hoursPerWeek: "~4 hrs/week",
    duration: "Full year preferred", credits: "1.0 / semester", icon: "💻",
    about: "Support students and staff with Chromebook issues, printer problems, and school software. Handle ticketed requests and walk-in support during lunch. Ideal for tech-savvy students interested in IT.",
    whatYoullDo: ["Diagnose Chromebook issues", "Manage the ticket queue", "Handle walk-in support", "Image and reset loaned Chromebooks", "Assist with AV setup"],
    requirements: ["Basic troubleshooting skills", "Patient and clear communicator", "Interest in computer science preferred"],
    todaySlot: { time: "12:15 PM", location: "IT office — Room 102" },
    tomorrowSlot: { time: "12:15 PM", location: "IT office — Room 102" },
    laterSlot: null,
  },
  {
    id: "j4", title: "Cafeteria Monitor", department: "Operations",
    supervisor: "Mr. Vasquez", supervisorEmail: "vasquez@wyndham.edu",
    supervisorRole: "Operations Supervisor", spots: 3, category: "Other", time: "Lunch",
    schedule: "Daily lunch block", hoursPerWeek: "~3 hrs/week",
    duration: "Full semester", credits: "0.5 / semester", icon: "🍽️",
    about: "Help maintain a clean and orderly cafeteria during the lunch rush. No prep required — just show up and help out.",
    whatYoullDo: ["Monitor tables and direct students to open seating", "Wipe tables between shifts", "Assist younger students with trays", "Report issues to supervising staff", "Help with trash and recycling"],
    requirements: ["Friendly and approachable", "No experience needed — training provided"],
    todaySlot: { time: "11:45 AM", location: "Cafeteria" },
    tomorrowSlot: { time: "11:45 AM", location: "Cafeteria" },
    laterSlot: null,
  },
  {
    id: "j5", title: "PE Equipment Room Aide", department: "Athletics",
    supervisor: "Coach Williams", supervisorEmail: "williams@wyndham.edu",
    supervisorRole: "Athletics Director", spots: 2, category: "Other", time: "After school",
    schedule: "Mon–Fri after school 3:00–3:40 PM", hoursPerWeek: "~3 hrs/week",
    duration: "Full semester", credits: "0.5 / semester", icon: "🏅",
    about: "Inventory and organize sports equipment, check gear in and out for teams, and assist with afternoon setup for PE classes and after-school sports. Good fit for students interested in sports management.",
    whatYoullDo: ["Check equipment in and out using the tracking log", "Inspect returned gear for damage", "Organize the equipment room", "Help coaches set up fields", "Notify Coach Williams when supplies run low"],
    requirements: ["Reliable — must show up every school day", "Comfortable with physical tasks up to 20 lbs", "Interest in athletics helpful"],
    todaySlot: { time: "3:00 – 3:40 PM", location: "Equipment room — Gym entrance" },
    tomorrowSlot: { time: "3:00 – 3:40 PM", location: "Equipment room — Gym entrance" },
    laterSlot: null,
  },
  {
    id: "j6", title: "Attendance Office Clerk", department: "Administration",
    supervisor: "Mrs. Okafor", supervisorEmail: "okafor@wyndham.edu",
    supervisorRole: "Attendance Coordinator", spots: 1, category: "Office", time: "Free period",
    schedule: "Fri free period", hoursPerWeek: "~1 hr/week",
    duration: "Full semester", credits: "0.5 / semester", icon: "📋",
    about: "Assist with processing attendance records, sorting late passes, and helping students who need to check in. Requires attention to detail and discretion — any student data is strictly confidential.",
    whatYoullDo: ["Process daily attendance sheets", "Sort and file late passes", "Help students at the check-in window", "Prepare weekly summary reports", "Maintain strict confidentiality"],
    requirements: ["Strong attention to detail", "Trustworthy — role handles confidential records", "GPA 2.5 or above"],
    todaySlot: null, tomorrowSlot: null,
    laterSlot: { day: "Fri", date: 17, time: "10:30 AM", location: "Attendance office" },
  },
];

const MY_MEMBERSHIPS = [
  {
    id: "m1", name: "JV Soccer", category: "Athletics", status: "In season",
    lead: "Coach Williams", email: "williams@wyndham.edu", role: "Head Coach",
    meets: "Mon / Wed / Fri", commitment: "3 hrs/week", season: "Spring",
    openTo: "Grades 9–12",
    about: "Competitive soccer team focused on teamwork, strategy, and physical fitness. We compete in the regional league and develop players at every skill level.",
    whatMembersDo: ["Practice drills and scrimmages", "Compete in regional matches", "Film review sessions", "Strength and conditioning"],
    requirements: ["Athletic physical on file", "2.0 GPA minimum", "Permission slip for away games"],
    icon: "⚽",
  },
  {
    id: "m2", name: "Robotics Club", category: "Clubs", status: "Active",
    lead: "Mr. Torres", email: "torres@wyndham.edu", role: "Faculty Advisor",
    meets: "Tuesdays 3:30–5:30 PM", commitment: "4 hrs/week", season: "Year-round",
    openTo: "All students",
    about: "Build, program, and compete with robots! We participate in VEX Robotics competitions and work on original engineering projects throughout the year.",
    whatMembersDo: ["Design and build robots", "Write control software", "Compete in regional VEX tournaments", "Work on creative engineering challenges"],
    requirements: ["No prior experience needed", "Willingness to learn CAD/programming", "Commitment to 2 meetings/week"],
    icon: "🤖",
  },
  {
    id: "m3", name: "Environmental Action Club", category: "Service", status: "Active",
    lead: "Ms. Park", email: "park@wyndham.edu", role: "Faculty Advisor",
    meets: "Thursdays 3:15 PM", commitment: "2 hrs/week", season: "Year-round",
    openTo: "All students",
    about: "Student-led environmental service and advocacy. We run recycling drives, campus cleanups, and partner with local organizations on sustainability initiatives.",
    whatMembersDo: ["Organize campus cleanups", "Lead recycling drives", "Community outreach events", "Plan awareness campaigns"],
    requirements: ["Log volunteer hours in portal", "Hours require advisor approval"],
    icon: "🌿",
  },
];

const DISCOVER_ACTIVITIES = [
  {
    id: "d1", name: "Drama Club", category: "Arts", status: "New",
    lead: "Ms. Rivera", email: "rivera@wyndham.edu", role: "Drama Advisor",
    meets: "Mon / Wed 3:30 PM", commitment: "5 hrs/week", season: "Year-round",
    openTo: "All students",
    about: "Produce and perform two major productions per year — a fall drama and a spring musical. Open to students interested in acting, directing, set design, and crew.",
    whatMembersDo: ["Rehearse and perform productions", "Build and paint sets", "Learn stage management", "Attend master classes"],
    requirements: ["Spring audition required", "Attendance at all tech week rehearsals"],
    icon: "🎭",
  },
  {
    id: "d2", name: "Math Team", category: "Academic", status: "Tryout date",
    lead: "Mr. Kumar", email: "kumar@wyndham.edu", role: "Math Team Coach",
    meets: "Fridays 2:45 PM", commitment: "2 hrs/week", season: "Fall / Spring",
    openTo: "Algebra II and above",
    about: "Competitive math team training for AMC, MATHCOUNTS, and regional tournaments. We love elegant proofs, creative problem-solving, and surprising our opponents.",
    whatMembersDo: ["Weekly problem sets and competition prep", "AMC 8/10/12 competitions", "Regional invitational meets", "Practice tournaments"],
    requirements: ["Algebra II or higher", "Placement test required for new members"],
    icon: "🔢",
  },
  {
    id: "d3", name: "Key Club", category: "Service", status: "New",
    lead: "Ms. Johnson", email: "johnson@wyndham.edu", role: "Faculty Advisor",
    meets: "Bi-weekly Tuesdays", commitment: "3 hrs/week", season: "Year-round",
    openTo: "All students",
    about: "Service-first student club affiliated with Kiwanis International. Members log volunteer hours, lead community projects, and apply for scholarships.",
    whatMembersDo: ["Community service events", "Fundraisers for local charities", "District and regional conventions", "Leadership development workshops"],
    requirements: ["$25 annual dues", "10 service hours per semester", "Positive school standing"],
    icon: "🔑",
  },
  {
    id: "d4", name: "Photography Club", category: "Arts", status: "Closing soon",
    lead: "Mr. Chen", email: "chen@wyndham.edu", role: "Art Department",
    meets: "Fridays 3:00 PM", commitment: "2 hrs/week", season: "Year-round",
    openTo: "All students",
    about: "Develop your eye and technical skills. Members shoot campus events, curate a year-end gallery show, and explore digital editing and darkroom techniques.",
    whatMembersDo: ["Shoot campus events and portraits", "Digital editing workshops", "Year-end gallery exhibition", "Photography critiques"],
    requirements: ["Own or borrow a camera", "Sign up before May 21"],
    icon: "📷",
  },
  {
    id: "d5", name: "Varsity Swimming", category: "Athletics", status: "Tryout date",
    lead: "Coach Lee", email: "lee@wyndham.edu", role: "Swim Coach",
    meets: "Daily 6:00–7:30 AM", commitment: "8 hrs/week", season: "Spring",
    openTo: "Grades 9–12",
    about: "Competitive swim team with tryouts May 16. Train daily, compete in the district invitational, and qualify for state. Open to all skill levels.",
    whatMembersDo: ["Daily practice sessions", "Stroke technique clinics", "District and state meets", "Team social events"],
    requirements: ["Tryout May 16 after school", "Swimming physical required", "2.0 GPA"],
    icon: "🏊",
  },
  {
    id: "d6", name: "Debate Team", category: "Academic", status: "Open",
    lead: "Dr. Adams", email: "adams@wyndham.edu", role: "Debate Coach",
    meets: "Tues / Thurs 3:30 PM", commitment: "4 hrs/week", season: "Fall / Spring",
    openTo: "All students",
    about: "Policy and Lincoln-Douglas debate. Train in research, argumentation, and public speaking. Compete at regional and state tournaments.",
    whatMembersDo: ["Research and case-building", "In-round practice debates", "State championship tournaments", "Judging novice rounds"],
    requirements: ["No experience needed", "Strong commitment to preparation"],
    icon: "🎤",
  },
];

const EVENTS_TODAY = [
  {
    id: "e1", name: "Soccer Practice", activity: "JV Soccer", category: "Athletics",
    time: "3:30 PM", location: "Field B", actionNeeded: null,
    about: "Regular Tuesday practice focused on set pieces and defensive positioning. Coach Williams will introduce the new corner kick routine.",
    whatHappens: ["Warm-up drills (20 min)", "Set piece and corner kick practice", "Scrimmage (30 min)", "Cool-down stretch"],
    whatToBring: ["Cleats and shin guards", "Water bottle", "Training jersey"],
    lead: "Coach Williams", leadEmail: "williams@wyndham.edu", leadRole: "Head Coach",
    icon: "⚽",
  },
  {
    id: "e2", name: "Robotics Meeting", activity: "Robotics Club", category: "Clubs",
    time: "4:00 PM", location: "Room 204", actionNeeded: "Permission slip due Fri",
    about: "Build session for the regional competition robot. We're finalizing the autonomous routine this week ahead of the May 17 scrimmage.",
    whatHappens: ["Sub-team check-ins (15 min)", "Build / code work time (90 min)", "Progress demo", "Next steps and assignments"],
    whatToBring: ["Laptop with VEX Coding Studio", "Engineering notebook"],
    lead: "Mr. Torres", leadEmail: "torres@wyndham.edu", leadRole: "Faculty Advisor",
    icon: "🤖",
  },
  {
    id: "ec1", name: "Travel Soccer Training", activity: "City Rec League", category: "Athletics",
    time: "5:30 PM", location: "City Sports Complex", actionNeeded: null,
    about: "Weekly travel team training with City Rec League. Focus this session is on transition play and long-range shooting.",
    whatHappens: ["Warmup and passing drills", "Transition scenarios (25 min)", "Shooting practice", "Scrimmage"],
    whatToBring: ["Cleats", "Water bottle", "City Rec jersey"],
    lead: "Coach Martinez", leadEmail: "", leadRole: "Club Coach",
    icon: "⚽", custom: true,
  },
];

const EVENTS_TOMORROW = [
  {
    id: "e3", name: "Drama Auditions", activity: "Drama Club", category: "Arts",
    time: "3:30 PM", location: "Main Auditorium", actionNeeded: null,
    about: "Spring production auditions. Prepare a 1-minute monologue from the posted list. Callbacks for cold reading will follow initial auditions.",
    whatHappens: ["Check-in and form submission", "Monologue presentations", "Cold reading callbacks", "Cast list announcement timeline"],
    whatToBring: ["Prepared monologue (1 min)", "Completed audition form (from website)"],
    lead: "Ms. Rivera", leadEmail: "rivera@wyndham.edu", leadRole: "Drama Advisor",
    icon: "🎭",
  },
  {
    id: "e4", name: "Math Team Practice", activity: "Math Team", category: "Academic",
    time: "4:15 PM", location: "Room 108", actionNeeded: null,
    about: "AMC 10 preparation session. We'll work through past tests and discuss solution strategies for the remaining competition season.",
    whatHappens: ["Timed mini-test (30 min)", "Solution walkthrough and discussion", "Problem-of-the-week reveal"],
    whatToBring: ["Pencils only (no calculator)", "Your brain!"],
    lead: "Mr. Kumar", leadEmail: "kumar@wyndham.edu", leadRole: "Math Team Coach",
    icon: "🔢",
  },
  {
    id: "ec2", name: "Library Volunteer Shift", activity: "Community Service", category: "Service",
    time: "4:00 PM", location: "Wyndham Public Library", actionNeeded: null,
    about: "Volunteer shift at the public library helping with the after-school reading program for elementary students.",
    whatHappens: ["Check in with librarian", "Reading groups with kids (45 min)", "Shelf reshelving and cleanup"],
    whatToBring: ["Volunteer ID badge", "Comfortable clothes"],
    lead: "Ms. Chen", leadEmail: "", leadRole: "Library Coordinator",
    icon: "📚", custom: true,
  },
];

const EVENTS_LATER = [
  { id: "e5",  name: "Environmental Club",   day: "Wed", date: 15, time: "3:15 PM",  location: "Room 301",        category: "Service",     icon: "🌿" },
  { id: "ec3", name: "City Rec League Game", day: "Sat", date: 17, time: "10:00 AM", location: "Riverside Park",  category: "Athletics",   icon: "⚽", custom: true },
  { id: "e6",  name: "Soccer Away Game",     day: "Thu", date: 16, time: "4:00 PM",  location: "Eastside HS",     category: "Athletics",   icon: "⚽" },
  { id: "e7",  name: "Robotics Scrimmage",   day: "Fri", date: 17, time: "1:00 PM",  location: "Gym B",           category: "Clubs",       icon: "🤖" },
  { id: "e8",  name: "Spring Carnival",      day: "Fri", date: 17, time: "12:00 PM", location: "Main Quad",       category: "School-wide", icon: "🎡" },
  { id: "e9",  name: "Award Ceremony",       day: "Wed", date: 20, time: "2:00 PM",  location: "Auditorium",      category: "School-wide", icon: "🏆" },
  { id: "e10", name: "Robotics Meeting",     day: "Thu", date: 21, time: "3:30 PM",  location: "Room 204",        category: "Clubs",       icon: "🤖" },
  { id: "e11", name: "Soccer Practice",      day: "Fri", date: 22, time: "3:30 PM",  location: "Field B",         category: "Athletics",   icon: "⚽" },
  { id: "e12", name: "Environmental Club",   day: "Thu", date: 29, time: "3:15 PM",  location: "Room 301",        category: "Service",     icon: "🌿" },
];

const SIGNUPS_DATA = [
  {
    id: "s1", name: "Varsity Swimming Tryouts", category: "Athletics",
    lead: "Coach Lee", email: "lee@wyndham.edu", role: "Swim Coach",
    location: "Aquatic Center", deadline: "May 16", deadlineUrgency: "urgent",
    commitment: "8 hrs/week", eligibility: "Grades 9–12", slots: "15 spots open",
    dates: "May 16, after school", season: "Spring", openTo: "Grades 9–12",
    requirements: ["Bring swimsuit and goggles", "Valid sports physical on file", "Signed parent permission form", "2.0 GPA minimum"],
    about: "Competitive swim team with tryouts May 16. Train daily and compete in district invitational. All skill levels welcome to try out.",
    whatMembersDo: ["Daily practice 6–7:30 AM", "District and state meets", "Stroke technique clinics"],
    icon: "🏊", when: "after-school",
  },
  {
    id: "s2", name: "Debate Team — New Members", category: "Academic",
    lead: "Dr. Adams", email: "adams@wyndham.edu", role: "Debate Coach",
    location: "Room 210", deadline: "May 22", deadlineUrgency: "normal",
    commitment: "4 hrs/week", eligibility: "All students", slots: "8 spots open",
    dates: "Starting May 26", season: "Fall / Spring", openTo: "All students",
    requirements: ["No prior experience needed", "Attend orientation session", "Strong commitment to preparation"],
    about: "Policy and Lincoln-Douglas debate. Train in research, argumentation, and public speaking. Compete at regional and state tournaments.",
    whatMembersDo: ["Research and case-building", "Practice debates", "State championship tournaments"],
    icon: "🎤", when: "after-school",
  },
  {
    id: "s3", name: "Photography Club", category: "Arts",
    lead: "Mr. Chen", email: "chen@wyndham.edu", role: "Art Department",
    location: "Art Room 5", deadline: "May 21", deadlineUrgency: "soon",
    commitment: "2 hrs/week", eligibility: "All students", slots: "6 spots open",
    dates: "Fridays 3:00 PM", season: "Year-round", openTo: "All students",
    requirements: ["Own or borrow a camera", "Complete online interest form", "Sign up before May 21"],
    about: "Develop your eye and technical skills. Shoot campus events, curate a year-end gallery, and explore digital editing.",
    whatMembersDo: ["Shoot events and portraits", "Digital editing workshops", "Year-end gallery exhibit"],
    icon: "📷", when: "after-school",
  },
  {
    id: "s4", name: "Key Club Membership", category: "Service",
    lead: "Ms. Johnson", email: "johnson@wyndham.edu", role: "Faculty Advisor",
    location: "Room 118", deadline: "May 28", deadlineUrgency: "normal",
    commitment: "3 hrs/week", eligibility: "All students", slots: "Open enrollment",
    dates: "Bi-weekly Tuesdays", season: "Year-round", openTo: "All students",
    requirements: ["$25 annual dues", "10 service hours per semester", "Positive school standing"],
    about: "Service-first student club affiliated with Kiwanis International. Lead community projects and earn volunteer hours.",
    whatMembersDo: ["Community service events", "Fundraisers for charity", "Leadership development"],
    icon: "🔑", when: "during-school",
  },
];

const ANNOUNCEMENTS_DATA = [
  {
    id: "an1", pinned: true, unread: true,
    type: "Cancelled", activity: "JV Soccer", activityCategory: "Athletics",
    title: "Wednesday practice cancelled — field maintenance",
    body: "Coach Williams: Field B will be closed for maintenance on Wed May 15. Practice is cancelled. We'll resume Friday at 3:30 PM. Stay tuned for a makeup session early next week.",
    time: "2h ago", action: null,
  },
  {
    id: "an2", pinned: false, unread: true,
    type: "Reminder", activity: "Robotics Club", activityCategory: "Clubs",
    title: "Permission slip due Friday for regional scrimmage",
    body: "Mr. Torres: The VEX regional scrimmage is May 17. A signed permission slip is required to attend. Download the form from the Files tab and return it to Room 204 by Friday.",
    time: "4h ago", action: { label: "Open permission slip" },
  },
  {
    id: "an3", pinned: false, unread: true,
    type: "Update", activity: "Robotics Club", activityCategory: "Clubs",
    title: "New build session added — Thursday 3:30 PM mandatory",
    body: "Mr. Torres: We've added an extra build session before regionals. This Thursday 3:30–5:30 PM in Room 204 is now mandatory for all competition team members. Update your calendar.",
    time: "Yesterday", action: { label: "View new schedule" },
  },
  {
    id: "an4", pinned: false, unread: false,
    type: "School-wide", activity: "School-wide", activityCategory: "School-wide",
    title: "Spring carnival this Friday — May 17, 12–3 PM",
    body: "Student Activities: The annual spring carnival is this Friday! Food trucks, activities, and performances on the main quad. Clubs can reserve a booth by Thursday. All students welcome.",
    time: "Yesterday", action: { label: "RSVP" },
  },
  {
    id: "an5", pinned: false, unread: false,
    type: "Congrats", activity: "Environmental Action Club", activityCategory: "Service",
    title: "Your club won the District Green School Award!",
    body: "Ms. Park: I'm thrilled to share that the Environmental Action Club has been selected for the district Green School Award! This recognizes our recycling program and campus garden project. Well done, everyone.",
    time: "2 days ago", action: null,
  },
  {
    id: "an6", pinned: false, unread: true,
    type: "Reminder", activity: "Environmental Action Club", activityCategory: "Service",
    title: "Volunteer hours deadline — submit by May 20",
    body: "Ms. Park: Volunteer hours for the semester must be logged and submitted for advisor approval by May 20. Please log your hours in the portal under My Activities. Contact me with any questions.",
    time: "3 days ago", action: { label: "View event" },
  },
];

// Calendar events for May 2026
const CAL_EVENTS_MAP = {
  13: [{ name: "Soccer Practice", cat: "Athletics" }, { name: "Robotics", cat: "Clubs" }],
  14: [{ name: "Drama Auditions", cat: "Arts" }, { name: "Math Team", cat: "Academic" }],
  15: [{ name: "Env. Club", cat: "Service" }],
  16: [{ name: "Soccer Away", cat: "Athletics" }, { name: "Swim Tryouts", cat: "Athletics" }],
  17: [{ name: "Robotics Scrimmage", cat: "Clubs" }, { name: "Spring Carnival", cat: "School-wide" }],
  20: [{ name: "Award Ceremony", cat: "School-wide" }],
  21: [{ name: "Robotics Meeting", cat: "Clubs" }],
  22: [{ name: "Soccer Practice", cat: "Athletics" }],
  27: [{ name: "Memorial Day", cat: "School-wide" }],
  28: [{ name: "Key Club Deadline", cat: "Service" }],
  29: [{ name: "Soccer Practice", cat: "Athletics" }],
};

const ACADEMIC_CAL_MAP = {
  14: [{ name: "Algebra II Quiz", type: "test", subject: "Math" }],
  15: [{ name: "Biology Lab Report Due", type: "deadline", subject: "Biology" }],
  19: [{ name: "Spanish III Unit Test", type: "test", subject: "Spanish" }],
  20: [{ name: "AP Exam Week Begins", type: "milestone", subject: "School-wide" }],
  21: [{ name: "AP US History Exam", type: "exam", subject: "US History" }],
  22: [{ name: "AP Biology Exam", type: "exam", subject: "Biology" }],
  26: [{ name: "English Essay Due", type: "deadline", subject: "English Lit" }],
  27: [{ name: "Memorial Day — No School", type: "holiday", subject: "" }],
  29: [{ name: "Biology Final Exam", type: "exam", subject: "Biology" }],
  30: [{ name: "Math Final Exam", type: "exam", subject: "Math" }],
};

const ACADEMIC_TYPE_STYLE = {
  test:      { bg: "#FEF3C7", text: "#92400E", icon: "📝" },
  exam:      { bg: "#FEE2E2", text: "#991B1B", icon: "📋" },
  deadline:  { bg: "#FFEDD5", text: "#9A3412", icon: "⏰" },
  milestone: { bg: "#EDE9FE", text: "#4C1D95", icon: "🎯" },
  holiday:   { bg: "#D1FAE5", text: "#065F46", icon: "🌿" },
};

/* ── SHARED UI PRIMITIVES ────────────────────────────────────── */

function CatPill({ category, size = 11 }) {
  const c = ACT_CAT[category] || ACT_CAT["School-wide"];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: 999,
      background: c.bg, color: c.text,
      fontSize: size, fontWeight: 600, whiteSpace: "nowrap",
    }}>{category}</span>
  );
}

function StatusPill({ status }) {
  const s = STATUS_COLOR[status] || { bg: "#F3F4F6", text: "#4B5563" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "2px 8px", borderRadius: 999,
      background: s.bg, color: s.text,
      fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
    }}>{status}</span>
  );
}

function IconTile({ icon, category, size = 36 }) {
  const c = ACT_CAT[category] || ACT_CAT["School-wide"];
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size * 0.3),
      background: c.bg, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: Math.round(size * 0.48), flexShrink: 0,
    }}>{icon}</div>
  );
}

function InitialsAvatar({ name, size = 36 }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: "var(--student-soft)", color: "var(--student-deep)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: Math.round(size * 0.36), fontWeight: 700, flexShrink: 0,
    }}>{initials}</div>
  );
}

/* ── MODAL SYSTEM ────────────────────────────────────────────── */

function ModalOverlay({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 20,
          boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
          width: "100%", maxWidth: 560,
          maxHeight: "85vh", overflowY: "auto",
        }}
      >{children}</div>
    </div>
  );
}

function ModalHeader({ title, subtitle, onClose }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", justifyContent: "space-between",
      padding: "20px 20px 14px", borderBottom: "1px solid var(--mist)",
    }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 500, color: "var(--ink)" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      <button onClick={onClose} style={{
        width: 30, height: 30, borderRadius: 8, border: "1px solid var(--mist)",
        background: "var(--bone)", display: "flex", alignItems: "center",
        justifyContent: "center", cursor: "pointer", flexShrink: 0, marginLeft: 12,
      }}>
        <I.X size={14} color="var(--stone)"/>
      </button>
    </div>
  );
}

function SuccessState({ title, sub, onClose }) {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <div style={{
        width: 56, height: 56, borderRadius: 999, background: "#D1FAE5",
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 16px",
      }}>
        <I.Check size={28} color="#065F46"/>
      </div>
      <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 13, color: "var(--stone)", marginBottom: 24 }}>{sub}</div>
      <button onClick={onClose} style={{
        padding: "10px 28px", borderRadius: 8, background: "var(--student)",
        color: "#fff", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500,
      }}>Done</button>
    </div>
  );
}

function MessageModal({ name, role, onClose }) {
  const [subject, setSubject] = React.useState(`Question for ${name}`);
  const [body, setBody] = React.useState("");
  const [sent, setSent] = React.useState(false);

  if (sent) {
    return (
      <ModalOverlay onClose={onClose}>
        <ModalHeader title="Message sent" subtitle={`To ${name}`} onClose={onClose}/>
        <SuccessState title="Message sent!" sub={`${name} will receive your message.`} onClose={onClose}/>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader title={`Message ${name}`} subtitle={role} onClose={onClose}/>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--stone)", display: "block", marginBottom: 4 }}>Subject</label>
          <input value={subject} onChange={e => setSubject(e.target.value)} style={{
            width: "100%", padding: "9px 12px", fontSize: 14, boxSizing: "border-box",
            border: "1px solid var(--mist)", borderRadius: 8, outline: "none",
          }}/>
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--stone)", display: "block", marginBottom: 4 }}>Message</label>
          <textarea value={body} onChange={e => setBody(e.target.value)} rows={5}
            placeholder="Write your message..."
            style={{
              width: "100%", padding: "9px 12px", fontSize: 14, boxSizing: "border-box",
              border: "1px solid var(--mist)", borderRadius: 8, outline: "none", resize: "vertical",
            }}/>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{
            padding: "9px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14,
            border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
          }}>Cancel</button>
          <button onClick={() => setSent(true)} style={{
            padding: "9px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500,
            background: "var(--student)", color: "#fff", border: "none",
          }}>Send message</button>
        </div>
      </div>
    </ModalOverlay>
  );
}

function SignUpConfirmModal({ activity, onClose }) {
  const [confirmed, setConfirmed] = React.useState(false);

  if (confirmed) {
    return (
      <ModalOverlay onClose={onClose}>
        <ModalHeader title="Signed up!" subtitle={activity.name} onClose={onClose}/>
        <div style={{ padding: "16px 20px 20px" }}>
          <div style={{
            padding: "12px 16px", borderRadius: 10, background: "var(--bone)",
            fontWeight: 600, fontSize: 14, textAlign: "center", marginBottom: 20,
          }}>{activity.name}</div>
          <SuccessState title="You're signed up!" sub={`${activity.lead} will be in touch with next steps.`} onClose={onClose}/>
        </div>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader title="Confirm sign up" subtitle="Review before committing" onClose={onClose}/>
      <div style={{ padding: 20 }}>
        <div style={{
          padding: "14px 16px", borderRadius: 10, background: "var(--bone)",
          marginBottom: 14,
        }}>
          <div style={{ fontWeight: 600, fontSize: 15 }}>{activity.name}</div>
          <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 2 }}>
            {activity.category} · {activity.lead}
          </div>
        </div>
        <p style={{ margin: "0 0 24px", fontSize: 13, color: "var(--stone)", lineHeight: 1.6 }}>
          By confirming, you're registering your interest. The advisor will reach out with next steps. You can withdraw before the deadline.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "9px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14,
            border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
          }}>Cancel</button>
          <button onClick={() => setConfirmed(true)} style={{
            padding: "9px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500,
            background: "var(--student)", color: "#fff", border: "none",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <I.Check size={14}/> Confirm sign up
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

function ClubDetailModal({ activity, onClose, showSignUp = true }) {
  const [screen, setScreen] = React.useState("detail"); // detail | message | confirm

  if (screen === "message") {
    return <MessageModal name={activity.lead} role={activity.role} onClose={() => setScreen("detail")}/>;
  }
  if (screen === "confirm") {
    return <SignUpConfirmModal activity={activity} onClose={() => setScreen("detail")}/>;
  }

  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader
        title={activity.name}
        subtitle={`${activity.category} · ${activity.meets}`}
        onClose={onClose}
      />
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <IconTile icon={activity.icon} category={activity.category} size={48}/>
          <p style={{ margin: 0, fontSize: 13, color: "var(--stone)", lineHeight: 1.6 }}>{activity.about}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Meets", activity.meets], ["Season", activity.season], ["Commitment", activity.commitment], ["Open to", activity.openTo]].map(([label, val]) => (
            <div key={label} style={{ padding: "10px 12px", borderRadius: 8, background: "var(--bone)" }}>
              <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontSize: 13, color: "var(--slate)" }}>{val}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>What members do</div>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
            {activity.whatMembersDo.map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--stone)" }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ padding: "12px 14px", borderRadius: 10, background: "var(--bone)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Requirements</div>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
            {activity.requirements.map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--stone)" }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 14px", borderRadius: 10, border: "1px solid var(--mist)",
        }}>
          <InitialsAvatar name={activity.lead} size={36}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{activity.lead}</div>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>{activity.role} · {activity.email}</div>
          </div>
          <button onClick={() => setScreen("message")} style={{
            padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500,
            border: "1px solid var(--mist)", background: "var(--bone)",
          }}>Message</button>
        </div>

        <div style={{ display: "flex", gap: 10, paddingTop: 4, borderTop: "1px solid var(--mist)" }}>
          <button onClick={onClose} style={{
            padding: "10px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14,
            border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
          }}>Close</button>
          {showSignUp && (
            <button onClick={() => setScreen("confirm")} style={{
              padding: "10px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500,
              background: "var(--student)", color: "#fff", border: "none",
            }}>Sign up</button>
          )}
        </div>
      </div>
    </ModalOverlay>
  );
}

function EventDetailModal({ event, onClose }) {
  const [showMessage, setShowMessage] = React.useState(false);

  if (showMessage) {
    return <MessageModal name={event.lead} role={event.leadRole} onClose={() => setShowMessage(false)}/>;
  }

  return (
    <ModalOverlay onClose={onClose}>
      <ModalHeader title={event.name} subtitle={`${event.time} · ${event.location}`} onClose={onClose}/>
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <IconTile icon={event.icon} category={event.category} size={48}/>
          <p style={{ margin: 0, fontSize: 13, color: "var(--stone)", lineHeight: 1.6 }}>{event.about}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Location", event.location], ["Lead", event.lead]].map(([label, val]) => (
            <div key={label} style={{ padding: "10px 12px", borderRadius: 8, background: "var(--bone)" }}>
              <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 600, marginBottom: 2, textTransform: "uppercase" }}>{label}</div>
              <div style={{ fontSize: 13, color: "var(--slate)" }}>{val}</div>
            </div>
          ))}
        </div>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>What happens at this session</div>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
            {event.whatHappens.map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--stone)" }}>{item}</li>
            ))}
          </ul>
        </div>

        <div style={{ padding: "12px 14px", borderRadius: 10, background: "var(--bone)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>What to bring</div>
          <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 4 }}>
            {event.whatToBring.map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: "var(--stone)" }}>{item}</li>
            ))}
          </ul>
        </div>

        {event.actionNeeded && (
          <div style={{
            padding: "12px 14px", borderRadius: 10,
            background: "#FFFBEB", border: "1px solid #FDE68A",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <I.Bell size={16} color="#92400E"/>
            <div style={{ flex: 1, fontSize: 13, color: "#92400E", fontWeight: 500 }}>{event.actionNeeded}</div>
            <button style={{
              padding: "5px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 500,
              background: "#F59E0B", color: "#fff", border: "none",
            }}>Open</button>
          </div>
        )}

        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          padding: "12px 14px", borderRadius: 10, border: "1px solid var(--mist)",
        }}>
          <InitialsAvatar name={event.lead} size={36}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{event.lead}</div>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>{event.leadRole} · {event.leadEmail}</div>
          </div>
          <button onClick={() => setShowMessage(true)} style={{
            padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500,
            border: "1px solid var(--mist)", background: "var(--bone)",
          }}>Message</button>
        </div>

        <div style={{ paddingTop: 4, borderTop: "1px solid var(--mist)" }}>
          <button onClick={onClose} style={{
            padding: "10px 18px", borderRadius: 8, cursor: "pointer", fontSize: 14,
            border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
          }}>Close</button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* ── TAB 1: DISCOVER ─────────────────────────────────────────── */

const DISCOVER_CATS = ["All", "Athletics", "Academic", "Clubs", "Service", "Arts"];

/* ── ADD ACTIVITY MODAL ──────────────────────────────────────── */
function AddActivityModal({ onClose, onSave }) {
  const [form, setForm] = React.useState({
    name: "", category: "Athletics", organization: "",
    started: "", hoursPerWeek: "", description: "", countsAsVolunteer: false,
  });
  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <ModalOverlay onClose={onClose}>
      <div style={{
        background: "#fff", borderRadius: 20,
        width: "min(540px, 95vw)", maxHeight: "90vh", overflow: "auto",
        boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
        padding: "28px 32px",
      }} onClick={e => e.stopPropagation()}>
        <ModalHeader title="Add activity" subtitle="Track something not offered through school" onClose={onClose}/>

        {/* Info banner */}
        <div style={{
          background: "#EFF6FF", border: "1px solid #BFDBFE", borderRadius: 10,
          padding: "12px 14px", marginBottom: 20, fontSize: 13, color: "#1E40AF", lineHeight: 1.5,
        }}>
          <I.Info size={14} color="#3B82F6" style={{ marginRight: 6, verticalAlign: "middle" }}/>
          Looking for school clubs and teams? Browse the <strong>Discover</strong> tab instead. Use this form for outside activities like a community sports league, volunteer work, or a job.
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Activity name */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>
              Activity name <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <input
              value={form.name} onChange={e => set("name", e.target.value)}
              placeholder="e.g. Travel soccer, Library volunteer"
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 14,
                border: "1.5px solid var(--mist)", outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Category + Organization */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>Category</label>
              <select
                value={form.category} onChange={e => set("category", e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 14,
                  border: "1.5px solid var(--mist)", background: "#fff", cursor: "pointer",
                }}
              >
                {["Athletics","Academic","Clubs","Service","Arts","School-wide"].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>Organization</label>
              <input
                value={form.organization} onChange={e => set("organization", e.target.value)}
                placeholder="e.g. City rec league"
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 14,
                  border: "1.5px solid var(--mist)", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Started + Hours */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>Started</label>
              <input
                type="date" value={form.started} onChange={e => set("started", e.target.value)}
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 14,
                  border: "1.5px solid var(--mist)", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>Hours per week</label>
              <input
                type="number" min="0" max="40" value={form.hoursPerWeek} onChange={e => set("hoursPerWeek", e.target.value)}
                placeholder="e.g. 4"
                style={{
                  width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 14,
                  border: "1.5px solid var(--mist)", outline: "none", boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>
              Role or description <span style={{ fontSize: 12, fontWeight: 400, color: "var(--stone)" }}>(optional)</span>
            </label>
            <textarea
              value={form.description} onChange={e => set("description", e.target.value)}
              placeholder="What you do, leadership roles, accomplishments..."
              rows={3}
              style={{
                width: "100%", padding: "10px 12px", borderRadius: 8, fontSize: 14,
                border: "1.5px solid var(--mist)", outline: "none", resize: "vertical",
                fontFamily: "inherit", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Volunteer hours checkbox */}
          <label style={{
            display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer",
            background: "var(--bone)", borderRadius: 10, padding: "12px 14px",
          }}>
            <input
              type="checkbox" checked={form.countsAsVolunteer}
              onChange={e => set("countsAsVolunteer", e.target.checked)}
              style={{ marginTop: 2, width: 16, height: 16, flexShrink: 0, cursor: "pointer" }}
            />
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>Counts toward volunteer hours </span>
              <span style={{ fontSize: 12, color: "var(--stone)" }}>(requires advisor approval before hours apply to graduation requirement)</span>
            </div>
          </label>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 10, marginTop: 24, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{
            padding: "9px 20px", borderRadius: 9, cursor: "pointer", fontSize: 14,
            border: "1.5px solid var(--mist)", background: "#fff", color: "var(--slate)",
          }}>Cancel</button>
          <button
            disabled={!form.name.trim()}
            onClick={() => { if (form.name.trim()) { onSave(form); onClose(); } }}
            style={{
              padding: "9px 20px", borderRadius: 9, cursor: form.name.trim() ? "pointer" : "not-allowed",
              fontSize: 14, fontWeight: 600,
              background: form.name.trim() ? "var(--ink)" : "var(--mist)",
              color: form.name.trim() ? "#fff" : "var(--silver)", border: "none",
            }}>Save activity</button>
        </div>
      </div>
    </ModalOverlay>
  );
}

function MembershipCard({ activity, isCustom, onView }) {
  const cat = ACT_CAT[activity.category] || ACT_CAT["School-wide"];
  return (
    <div style={{
      background: isCustom ? "#FFFBF0" : "#fff",
      borderRadius: 16,
      border: isCustom ? "2px dashed #F59E0B" : "1px solid var(--mist)",
      boxShadow: isCustom ? "none" : "var(--shadow-card)",
      padding: 16,
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, flexShrink: 0,
          background: cat.bg, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>{activity.icon || "📌"}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>{activity.name}</div>
          <div style={{ fontSize: 12, color: "var(--stone)" }}>{activity.category}{activity.organization ? ` · ${activity.organization}` : ""}</div>
        </div>
        {isCustom ? (
          <span style={{
            padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700,
            background: "#FEF3C7", color: "#92400E",
          }}>Personal</span>
        ) : (
          <StatusPill status={activity.status}/>
        )}
      </div>
      <div style={{ fontSize: 12, color: "var(--stone)" }}>
        {isCustom
          ? `~${activity.hoursPerWeek || "?"} hrs/week${activity.started ? ` · Started ${activity.started}` : ""}`
          : `Next: ${activity.meets}`}
      </div>
      <button onClick={() => onView && onView(activity)} style={{
        alignSelf: "flex-start", padding: "6px 14px", borderRadius: 7, cursor: "pointer",
        border: "1px solid var(--mist)", background: "var(--bone)",
        fontSize: 12, fontWeight: 500, color: "var(--slate)",
      }}>{isCustom ? "View details" : "View schedule"}</button>
    </div>
  );
}

function DiscoverActivityCard({ activity, onView }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 16,
      boxShadow: "var(--shadow-card)",
      padding: 16, display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <IconTile icon={activity.icon} category={activity.category} size={36}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{activity.name}</div>
          <div style={{ fontSize: 12, color: "var(--stone)" }}>{activity.category}</div>
        </div>
        <StatusPill status={activity.status}/>
      </div>
      <div style={{ fontSize: 13, color: "var(--stone)", lineHeight: 1.5 }}>
        {activity.about.slice(0, 92)}{activity.about.length > 92 ? "…" : ""}
      </div>
      <button onClick={() => onView(activity)} style={{
        alignSelf: "flex-start", padding: "6px 14px", borderRadius: 7, cursor: "pointer",
        border: "1px solid var(--mist)", background: "var(--bone)",
        fontSize: 12, fontWeight: 500, color: "var(--slate)",
      }}>View details</button>
    </div>
  );
}

function DiscoverTab() {
  const [search, setSearch] = React.useState("");
  const [cat, setCat] = React.useState("All");
  const [detail, setDetail] = React.useState(null);

  const all = [...MY_MEMBERSHIPS, ...DISCOVER_ACTIVITIES];
  const filtered = all.filter(a => {
    const matchCat = cat === "All" || a.category === cat;
    const q = search.toLowerCase();
    const matchSearch = !q || a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero */}
      <div style={{
        borderRadius: 20, overflow: "hidden",
        background: "linear-gradient(135deg, #FFD4B4 0%, #FFF4D4 50%, #A8D5BA 100%)",
        boxShadow: "var(--shadow-card)",
        padding: "28px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7C2D12", marginBottom: 4, opacity: 0.85 }}>Wyndham Park High School</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#3D1A0A", marginBottom: 12 }}>{all.length} activities to explore</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["Athletics","#0F6E56","#E1F5EE"],["Academic","#0C447C","#E6F1FB"],["Clubs","#3C3489","#EEEDFE"],["Service","#993C1D","#FAECE7"],["Arts","#993556","#FBEAF0"]].map(([lbl,text,bg]) => (
              <span key={lbl} style={{ padding: "4px 12px", borderRadius: 999, background: bg, color: text, fontSize: 12, fontWeight: 600 }}>{lbl}</span>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 56, lineHeight: 1, opacity: 0.65 }}>🧭</div>
      </div>

      {/* Search */}
      <div style={{ position: "relative" }}>
        <I.Search size={16} color="var(--silver)" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}/>
        <input
          value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Search clubs, sports, events..."
          style={{
            width: "100%", padding: "11px 12px 11px 38px", fontSize: 14, boxSizing: "border-box",
            border: "1px solid var(--mist)", borderRadius: 10, outline: "none", background: "#fff",
          }}
        />
      </div>

      {/* Category chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        {DISCOVER_CATS.map(c => (
          <button key={c} onClick={() => setCat(c)} style={{
            padding: "5px 14px", borderRadius: 999, fontSize: 13, cursor: "pointer",
            fontWeight: cat === c ? 600 : 500,
            background: cat === c ? "var(--ink)" : "#fff",
            color: cat === c ? "#fff" : "var(--slate)",
            border: cat === c ? "1px solid var(--ink)" : "1px solid var(--mist)",
          }}>{c}</button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--stone)" }}>
          {filtered.length === 0 ? "No matches" : `Showing ${filtered.length}`}
        </span>
      </div>

      {/* Suggested grid */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>Suggested for you</span>
          <span style={{
            padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: "#E8D5F2", color: "#3C3489",
          }}>{filtered.length} matches</span>
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "32px 0", color: "var(--stone)", fontSize: 14 }}>
            No matches found.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {filtered.map(a => <DiscoverActivityCard key={a.id} activity={a} onView={setDetail}/>)}
          </div>
        )}
      </div>

      {/* Happening around school */}
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 14 }}>Happening around school</div>
        <div style={{ borderRadius: 16, overflow: "hidden", background: "#fff", boxShadow: "var(--shadow-card)" }}>
          {[
            { day: "Wed", date: 15, title: "Spring Carnival", sub: "Student Activities · Main Quad", rsvp: true },
            { day: "Thu", date: 16, title: "Swimming Tryouts", sub: "Coach Lee · Aquatic Center", rsvp: false },
            { day: "Fri", date: 17, title: "Robotics Scrimmage (Open to spectators)", sub: "Mr. Torres · Gym B", rsvp: false },
            { day: "Mon", date: 20, title: "Environmental Award Ceremony", sub: "Ms. Park · Main Hall", rsvp: true },
          ].map((ev, i, arr) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
              borderBottom: i < arr.length - 1 ? "1px solid var(--mist)" : "none",
            }}>
              <div style={{ width: 44, textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--silver)", textTransform: "uppercase" }}>{ev.day}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{ev.date}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{ev.title}</div>
                <div style={{ fontSize: 12, color: "var(--stone)" }}>{ev.sub}</div>
              </div>
              {ev.rsvp && (
                <button style={{
                  padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 500,
                  background: "var(--student-soft)", color: "var(--student-deep)",
                  border: "1px solid var(--student-200)",
                }}>RSVP</button>
              )}
            </div>
          ))}
        </div>
      </div>

      {detail && <ClubDetailModal activity={detail} onClose={() => setDetail(null)}/>}
    </div>
  );
}

/* ── TAB 2: MY ACTIVITIES ────────────────────────────────────── */

function EventCard({ event, onView }) {
  return (
    <div style={{
      background: event.isJob ? "#EFF6FF" : event.custom ? "#FFFBF0" : "#fff",
      borderRadius: 16,
      border: event.isJob ? "1.5px solid #93C5FD" : event.custom ? "2px dashed #F59E0B" : "none",
      boxShadow: (event.isJob || event.custom) ? "none" : "var(--shadow-card)",
      padding: 16, display: "flex", flexDirection: "column", gap: 10,
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <IconTile icon={event.icon} category={event.category} size={36}/>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{event.name}</div>
          <div style={{ fontSize: 12, color: "var(--stone)" }}>{event.activity}</div>
        </div>
        {event.isJob
          ? <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#DBEAFE", color: "#1E40AF", whiteSpace: "nowrap" }}>School job</span>
          : event.custom
            ? <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#FEF3C7", color: "#92400E", whiteSpace: "nowrap" }}>Personal</span>
            : <CatPill category={event.category}/>
        }
      </div>
      {event.actionNeeded ? (
        <div style={{ fontSize: 13, color: "#92400E", display: "flex", alignItems: "center", gap: 6 }}>
          <I.Bell size={13} color="#92400E"/>
          {event.actionNeeded}
        </div>
      ) : (
        <div style={{ fontSize: 13, color: "var(--stone)", display: "flex", alignItems: "center", gap: 6 }}>
          <I.Clock size={13} color="var(--silver)"/>
          {event.time} · {event.location}
        </div>
      )}
      <button onClick={() => onView(event)} style={{
        alignSelf: "flex-start", padding: "6px 14px", borderRadius: 7, cursor: "pointer",
        border: "1px solid var(--mist)", background: "var(--bone)",
        fontSize: 12, fontWeight: 500, color: "var(--slate)",
      }}>View details</button>
    </div>
  );
}

function MyActivitiesTab({ addedJobs = [], glowingJobId = null }) {
  const [detail, setDetail] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [customActivities, setCustomActivities] = React.useState([
    { id: "c1", name: "Travel Soccer", category: "Athletics", organization: "City Rec League", icon: "⚽", hoursPerWeek: "4", started: "2024-09-01", description: "Club travel team, competing in regional tournaments." },
  ]);

  const addActivity = form => {
    setCustomActivities(prev => [...prev, {
      id: "c" + Date.now(),
      name: form.name, category: form.category, organization: form.organization,
      icon: "📌", hoursPerWeek: form.hoursPerWeek, started: form.started,
      description: form.description,
    }]);
  };

  // Build job event slots
  const jobEventsToday = addedJobs.filter(j => j.todaySlot).map(j => ({
    id: "job-" + j.id + "-today", name: j.title, activity: j.department,
    category: "School-wide", time: j.todaySlot.time, location: j.todaySlot.location,
    icon: j.icon, isJob: true, jobData: j, actionNeeded: null,
  }));
  const jobEventsTomorrow = addedJobs.filter(j => j.tomorrowSlot).map(j => ({
    id: "job-" + j.id + "-tomorrow", name: j.title, activity: j.department,
    category: "School-wide", time: j.tomorrowSlot.time, location: j.tomorrowSlot.location,
    icon: j.icon, isJob: true, jobData: j, actionNeeded: null,
  }));
  const jobEventsLater = addedJobs.filter(j => j.laterSlot).map(j => ({
    id: "job-" + j.id + "-later", name: j.title,
    day: j.laterSlot.day, date: j.laterSlot.date,
    time: j.laterSlot.time, location: j.laterSlot.location,
    category: "School-wide", icon: j.icon, isJob: true,
  }));

  const allToday    = [...EVENTS_TODAY,    ...jobEventsToday];
  const allTomorrow = [...EVENTS_TOMORROW, ...jobEventsTomorrow];
  const allLater    = [...EVENTS_LATER,    ...jobEventsLater];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Hero banner */}
      <div style={{
        borderRadius: 20, overflow: "hidden",
        background: "linear-gradient(135deg, #A8D5BA 0%, #D4E8FF 50%, #E8D5F2 100%)",
        boxShadow: "var(--shadow-card)",
        padding: "28px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#1a5c3a", marginBottom: 4, opacity: 0.8 }}>Spring 2026 · Week 32</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#0F3D26", marginBottom: 8 }}>3 activities · 7 events this week</div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.55)", borderRadius: 12,
            padding: "10px 16px", backdropFilter: "blur(4px)",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "#1D4ED8", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <I.Clock size={16} color="#fff"/>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#1D4ED8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Next up · 3:30 PM</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1E3A5F" }}>Soccer Practice — Field B</div>
            </div>
            <button onClick={() => setDetail(EVENTS_TODAY[0])} style={{
              marginLeft: 8, padding: "6px 14px", borderRadius: 8, cursor: "pointer",
              fontSize: 12, fontWeight: 600, background: "#1D4ED8", color: "#fff", border: "none",
            }}>View</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, flexShrink: 0 }}>
          <div style={{ fontSize: 48, lineHeight: 1, opacity: 0.7 }}>⚽</div>
          <button onClick={() => setShowAddModal(true)} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600,
            background: "rgba(255,255,255,0.7)", color: "#0F3D26",
            border: "1.5px solid rgba(255,255,255,0.9)", backdropFilter: "blur(4px)",
          }}>
            <I.Plus size={14} color="#0F3D26"/>
            Add activity
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        {[
          { label: "My activities", value: String(3 + addedJobs.length), sub: "clubs & teams", bg: "linear-gradient(135deg, #E8D5F2 0%, #D4C5F0 100%)", text: "#3C3489" },
          { label: "Events this week", value: "7", sub: "across all activities", bg: "linear-gradient(135deg, #D4E8FF 0%, #BFDBFE 100%)", text: "#0C447C" },
          { label: "Volunteer hours", value: "14 / 30", sub: "toward graduation req.", bg: "linear-gradient(135deg, #A8D5BA 0%, #86C9A0 100%)", text: "#0F3D26", tooltip: "Volunteer hours logged toward your graduation requirement (30 hours needed)" },
          { label: "Pending actions", value: "2", sub: "forms & RSVPs due", bg: "linear-gradient(135deg, #FFD4B4 0%, #FFC49A 100%)", text: "#7C2D12" },
        ].map(s => (
          <div key={s.label} title={s.tooltip || ""} style={{
            padding: "18px 20px", borderRadius: 16,
            background: s.bg,
            boxShadow: "var(--shadow-card)",
          }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: s.text, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: s.text, marginTop: 5, opacity: 0.85 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: s.text, marginTop: 2, opacity: 0.6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* My jobs — only visible when jobs have been added */}
      {addedJobs.length > 0 && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>My jobs</span>
            <span style={{ padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600, background: "#DBEAFE", color: "#1E40AF" }}>{addedJobs.length}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {addedJobs.map(job => {
              const c = JOB_CAT[job.category] || JOB_CAT.Other;
              const isGlowing = glowingJobId === job.id;
              return (
                <div key={job.id} style={{
                  borderRadius: 16, padding: "16px",
                  background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                  border: "1.5px solid #93C5FD",
                  boxShadow: isGlowing ? "0 0 0 4px #3B82F660, var(--shadow-card)" : "var(--shadow-card)",
                  display: "flex", flexDirection: "column", gap: 10,
                  transition: "box-shadow 0.3s ease",
                }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{job.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{job.title}</span>
                        <span style={{ fontSize: 11 }}>💼</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#1E40AF" }}>{job.department} · {job.supervisor}</div>
                    </div>
                    <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#DBEAFE", color: "#1E40AF", whiteSpace: "nowrap" }}>School job</span>
                  </div>
                  <div style={{ fontSize: 12, color: "#1E40AF", display: "flex", gap: 12 }}>
                    <span>{job.hoursPerWeek}</span>
                    <span>·</span>
                    <span>{job.credits} credits</span>
                  </div>
                  <button style={{
                    alignSelf: "flex-start", padding: "5px 12px", borderRadius: 7, cursor: "pointer",
                    border: "1px solid #93C5FD", background: "#fff", fontSize: 12, fontWeight: 500, color: "#1E40AF",
                  }}>View schedule</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Today */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>Today</span>
          <span style={{
            padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: "#DBEAFE", color: "#1E40AF",
          }}>Tuesday, May 13</span>
          <span style={{ fontSize: 12, color: "var(--stone)" }}>{allToday.length} events</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {allToday.map(ev => <EventCard key={ev.id} event={ev} onView={setDetail}/>)}
        </div>
      </div>

      {/* Tomorrow */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>Tomorrow</span>
          <span style={{
            padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: "var(--bone)", color: "var(--stone)",
          }}>Wednesday, May 14</span>
          <span style={{ fontSize: 12, color: "var(--stone)" }}>{allTomorrow.length} events</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {allTomorrow.map(ev => <EventCard key={ev.id} event={ev} onView={setDetail}/>)}
        </div>
      </div>

      {/* Next 14 days */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>Next 14 days</span>
          <span style={{
            padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
            background: "var(--bone)", color: "var(--stone)",
          }}>May 15 – 27</span>
          <span style={{ fontSize: 12, color: "var(--stone)" }}>{allLater.length} events</span>
        </div>
        <div style={{
          background: "#fff", borderRadius: 16, overflow: "hidden",
          boxShadow: "var(--shadow-card)",
        }}>
          {allLater.map((ev, i) => (
            <div key={ev.id} style={{
              display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
              borderBottom: i < allLater.length - 1 ? "1px solid var(--mist)" : "none",
              background: ev.isJob ? "#EFF6FF" : ev.custom ? "#FFFBF0" : "transparent",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10, flexShrink: 0, textAlign: "center",
                background: ev.isJob ? "#DBEAFE" : ev.custom ? "#FEF3C7" : (ACT_CAT[ev.category]?.bg || "var(--bone)"),
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                border: ev.isJob ? "1.5px solid #93C5FD" : ev.custom ? "1.5px dashed #F59E0B" : "none",
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: ev.isJob ? "#1E40AF" : ev.custom ? "#92400E" : ACT_CAT[ev.category]?.text, textTransform: "uppercase", letterSpacing: "0.04em" }}>{ev.day}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: ev.isJob ? "#1E40AF" : ev.custom ? "#92400E" : ACT_CAT[ev.category]?.text, lineHeight: 1.1 }}>{ev.date}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 500, color: "var(--ink)" }}>{ev.name}</div>
                <div style={{ fontSize: 12, color: "var(--stone)" }}>{ev.time} · {ev.location}</div>
              </div>
              {ev.isJob
                ? <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#DBEAFE", color: "#1E40AF", whiteSpace: "nowrap" }}>School job</span>
                : ev.custom
                  ? <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#FEF3C7", color: "#92400E", whiteSpace: "nowrap" }}>Personal</span>
                  : <CatPill category={ev.category}/>
              }
            </div>
          ))}
        </div>
      </div>

      {detail && <EventDetailModal event={detail} onClose={() => setDetail(null)}/>}
      {showAddModal && <AddActivityModal onClose={() => setShowAddModal(false)} onSave={addActivity}/>}
    </div>
  );
}

/* ── TAB 3: EVENTS CALENDAR ──────────────────────────────────── */

function DayDetailPanel({ day, actEvents, acadEvents, onViewEvent }) {
  return (
    <div style={{
      background: "#FAFAFA", borderRadius: 0,
      padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--stone)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
        May {day} — details
      </div>

      {actEvents.map((ev, i) => (
        <div key={i} style={{
          background: "#fff", borderRadius: 12, padding: "14px 16px",
          border: `1px solid ${ACT_CAT[ev.cat]?.bg || "var(--mist)"}`,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{ev.name}</div>
            <CatPill category={ev.cat}/>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[["Type", ev.cat], ["Lead", "See activity details"]].map(([lbl, val]) => (
              <div key={lbl} style={{ padding: "8px 10px", borderRadius: 8, background: "var(--bone)" }}>
                <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 600, textTransform: "uppercase" }}>{lbl}</div>
                <div style={{ fontSize: 13, color: "var(--stone)" }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onViewEvent} style={{
              padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500,
              border: "1px solid var(--mist)", background: "var(--bone)",
            }}>View details</button>
            <button style={{
              padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500,
              border: "1px solid var(--mist)", background: "var(--bone)",
            }}>Message lead</button>
          </div>
        </div>
      ))}

      {acadEvents.map((ev, i) => {
        const ts = ACADEMIC_TYPE_STYLE[ev.type] || ACADEMIC_TYPE_STYLE.test;
        return (
          <div key={i} style={{
            background: "#fff", borderRadius: 12, padding: "14px 16px",
            border: `1px solid ${ts.bg}`,
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>{ts.icon} {ev.name}</div>
              <span style={{
                padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700,
                background: ts.bg, color: ts.text,
              }}>{ev.type.charAt(0).toUpperCase() + ev.type.slice(1)}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[["Subject", ev.subject || "—"], ["Type", ev.type.charAt(0).toUpperCase() + ev.type.slice(1)]].map(([lbl, val]) => (
                <div key={lbl} style={{ padding: "8px 10px", borderRadius: 8, background: ts.bg + "60" }}>
                  <div style={{ fontSize: 11, color: ts.text, fontWeight: 600, textTransform: "uppercase", opacity: 0.7 }}>{lbl}</div>
                  <div style={{ fontSize: 13, color: ts.text, fontWeight: 500 }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarTab() {
  const [selected, setSelected] = React.useState(13);
  const [calView, setCalView] = React.useState("Month");
  const [filters, setFilters] = React.useState(["Athletics", "Academic", "Clubs", "Service", "School-wide"]);
  const [showAcademic, setShowAcademic] = React.useState(false);
  const [detail, setDetail] = React.useState(null);
  const [weekSelected, setWeekSelected] = React.useState(null);

  const toggleFilter = cat =>
    setFilters(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);

  // May 2026: May 1 = Friday; Mon-first grid → offset 4
  const offset = 4;
  const cells = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= 31; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const selectedEvents = selected ? (CAL_EVENTS_MAP[selected] || []).filter(e => filters.includes(e.cat)) : [];
  const selectedAcademic = selected ? (ACADEMIC_CAL_MAP[selected] || []) : [];

  const weekSelectedEvents = weekSelected ? (CAL_EVENTS_MAP[weekSelected] || []).filter(e => filters.includes(e.cat)) : [];
  const weekSelectedAcademic = weekSelected ? (ACADEMIC_CAL_MAP[weekSelected] || []) : [];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero */}
      <div style={{
        borderRadius: 20, overflow: "hidden",
        background: "linear-gradient(135deg, #D4E8FF 0%, #C5D5F5 50%, #E8D5F2 100%)",
        boxShadow: "var(--shadow-card)",
        padding: "28px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0C447C", marginBottom: 4, opacity: 0.85 }}>May 2026</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1A1040", marginBottom: 12 }}>Activities calendar</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[["11 events","#0C447C","#D4E8FF"],["3 this week","#3C3489","#EEEDFE"],["2 on your activities","#0F6E56","#E1F5EE"]].map(([label, text, bg]) => (
              <div key={label} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: bg, color: text,
              }}>{label}</div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 56, lineHeight: 1, opacity: 0.65 }}>📅</div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button style={{
            width: 32, height: 32, borderRadius: 8, cursor: "pointer",
            border: "1px solid var(--mist)", background: "var(--bone)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.ChevronLeft size={16} color="var(--slate)"/>
          </button>
          <span style={{ fontSize: 18, fontWeight: 500 }}>May 2026</span>
          <button style={{
            width: 32, height: 32, borderRadius: 8, cursor: "pointer",
            border: "1px solid var(--mist)", background: "var(--bone)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <I.ChevronRight size={16} color="var(--slate)"/>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Academic calendar toggle */}
          <button onClick={() => setShowAcademic(v => !v)} style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "5px 10px 5px 6px", borderRadius: 20, cursor: "pointer",
            background: showAcademic ? "#EFF6FF" : "var(--bone)",
            border: showAcademic ? "1px solid #BFDBFE" : "1px solid var(--mist)",
            color: showAcademic ? "#1E40AF" : "var(--stone)",
            fontSize: 12, fontWeight: showAcademic ? 600 : 500,
          }}>
            {/* Pill switch */}
            <div style={{
              width: 32, height: 18, borderRadius: 9, flexShrink: 0, position: "relative",
              background: showAcademic ? "#3B82F6" : "#D1D5DB",
            }}>
              <div style={{
                position: "absolute", top: 2,
                left: showAcademic ? 14 : 2,
                width: 14, height: 14, borderRadius: 999, background: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
              }}/>
            </div>
            📚 Academic calendar
          </button>
          <div style={{ display: "flex", gap: 4 }}>
            {["Month", "Week"].map(v => (
              <button key={v} onClick={() => setCalView(v)} style={{
                padding: "5px 12px", borderRadius: 6, fontSize: 12, cursor: "pointer",
                background: calView === v ? "var(--ink)" : "var(--bone)",
                color: calView === v ? "#fff" : "var(--slate)",
                border: "1px solid var(--mist)",
              }}>{v}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter chips (multi-select) */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "var(--stone)", fontWeight: 500 }}>Show:</span>
        {["Athletics", "Academic", "Clubs", "Service", "School-wide"].map(cat => {
          const active = filters.includes(cat);
          return (
            <button key={cat} onClick={() => toggleFilter(cat)} style={{
              padding: "4px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer",
              background: active ? "var(--ink)" : "#fff",
              color: active ? "#fff" : "var(--slate)",
              border: active ? "1px solid var(--ink)" : "1px solid var(--mist)",
              fontWeight: active ? 600 : 500,
            }}>{cat}</button>
          );
        })}
      </div>

      {/* Month view */}
      {calView === "Month" && (
        <>
          <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", boxShadow: "var(--shadow-card)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: "1px solid var(--mist)" }}>
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                <div key={d} style={{
                  padding: "8px 0", textAlign: "center",
                  fontSize: 11, fontWeight: 700, color: "var(--silver)", textTransform: "uppercase",
                }}>{d}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
              {cells.map((day, i) => {
                const isToday = day === 13;
                const isSel = day === selected;
                const evs = day ? (CAL_EVENTS_MAP[day] || []).filter(e => filters.includes(e.cat)) : [];
                return (
                  <div key={i} onClick={() => day && setSelected(day)} style={{
                    minHeight: 72, padding: "6px 8px",
                    borderRight: (i + 1) % 7 !== 0 ? "1px solid var(--mist)" : "none",
                    borderBottom: i < cells.length - 7 ? "1px solid var(--mist)" : "none",
                    background: isSel ? "#EFF6FF" : isToday ? "#F0F9FF" : "transparent",
                    cursor: day ? "pointer" : "default",
                    outline: isToday ? "2px solid #3B82F6" : "none",
                    outlineOffset: -2,
                  }}>
                    {day && (
                      <>
                        <div style={{
                          fontSize: 12, marginBottom: 4,
                          fontWeight: isToday ? 700 : 400,
                          color: isToday ? "#1D4ED8" : "var(--ink)",
                        }}>{day}</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          {evs.slice(0, 2).map((ev, j) => (
                            <div key={"ev"+j} style={{
                              fontSize: 10, padding: "1px 5px", borderRadius: 4,
                              background: ACT_CAT[ev.cat]?.bg || "#F3F4F6",
                              color: ACT_CAT[ev.cat]?.text || "#4B5563",
                              fontWeight: 500, overflow: "hidden",
                              whiteSpace: "nowrap", textOverflow: "ellipsis",
                            }}>{ev.name}</div>
                          ))}
                          {showAcademic && (ACADEMIC_CAL_MAP[day] || []).slice(0, 1).map((ev, j) => (
                            <div key={"ac"+j} style={{
                              fontSize: 10, padding: "1px 5px", borderRadius: 4,
                              background: "#EBEBEB", color: "#6B7280",
                              fontWeight: 500, overflow: "hidden",
                              whiteSpace: "nowrap", textOverflow: "ellipsis",
                            }}>· {ev.name}</div>
                          ))}
                          {(evs.length > 2 || (showAcademic && (ACADEMIC_CAL_MAP[day]||[]).length > 1)) && (
                            <div style={{ fontSize: 10, color: "var(--stone)" }}>+more</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Day detail panel */}
          {selected && (selectedEvents.length > 0 || (showAcademic && selectedAcademic.length > 0)) && (
            <DayDetailPanel
              day={selected} actEvents={selectedEvents} acadEvents={showAcademic ? selectedAcademic : []}
              onViewEvent={() => setDetail(EVENTS_TODAY[0])}
            />
          )}
        </>
      )}

      {/* Week view */}
      {calView === "Week" && (
        <div style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--mist)", fontSize: 13, fontWeight: 600, color: "var(--stone)" }}>
            Week of May 13 – 17, 2026
          </div>
          {[
            { day: "Mon", date: 13, label: "Today" },
            { day: "Tue", date: 14 },
            { day: "Wed", date: 15 },
            { day: "Thu", date: 16 },
            { day: "Fri", date: 17 },
          ].map((row, ri, arr) => {
            const evs = (CAL_EVENTS_MAP[row.date] || []).filter(e => filters.includes(e.cat));
            const acEvs = showAcademic ? (ACADEMIC_CAL_MAP[row.date] || []) : [];
            const isSel = weekSelected === row.date;
            const hasEvents = evs.length > 0 || acEvs.length > 0;
            return (
              <div key={row.date} style={{
                display: "flex", flexDirection: "column",
                borderBottom: ri < arr.length - 1 ? "1px solid var(--mist)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <div style={{
                    width: 80, flexShrink: 0, padding: "14px 16px",
                    borderRight: "1px solid var(--mist)",
                    background: row.date === 13 ? "#EFF6FF" : "transparent",
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--silver)", textTransform: "uppercase" }}>{row.day}</div>
                    <div style={{
                      fontSize: 22, fontWeight: 700, lineHeight: 1.2,
                      color: row.date === 13 ? "#1D4ED8" : "var(--ink)",
                    }}>{row.date}</div>
                    {row.label && <div style={{ fontSize: 10, color: "#1D4ED8", fontWeight: 600 }}>{row.label}</div>}
                  </div>
                  <div style={{ flex: 1, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
                    {!hasEvents && <div style={{ fontSize: 13, color: "var(--silver)" }}>No events</div>}
                    {evs.map((ev, j) => (
                      <div key={"ev"+j} onClick={() => setWeekSelected(isSel && weekSelected === row.date ? null : row.date)} style={{
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                        background: ACT_CAT[ev.cat]?.bg || "var(--bone)",
                        outline: isSel ? `2px solid ${ACT_CAT[ev.cat]?.text || "#666"}` : "none",
                        outlineOffset: -1,
                      }}>
                        <span style={{ fontSize: 13, fontWeight: 500, color: ACT_CAT[ev.cat]?.text || "var(--ink)" }}>{ev.name}</span>
                        <CatPill category={ev.cat}/>
                      </div>
                    ))}
                    {acEvs.map((ev, j) => (
                        <div key={"ac"+j} onClick={() => setWeekSelected(isSel ? null : row.date)} style={{
                          display: "flex", alignItems: "center", justifyContent: "space-between",
                          padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                          background: "#F3F4F6",
                          outline: isSel ? "2px solid #9CA3AF" : "none",
                          outlineOffset: -1,
                        }}>
                          <span style={{ fontSize: 13, fontWeight: 500, color: "#6B7280" }}>{ev.name}</span>
                          <span style={{
                            padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 600,
                            background: "#E5E7EB", color: "#6B7280",
                          }}>{ev.subject || ev.type}</span>
                        </div>
                      ))}
                  </div>
                </div>
                {/* Inline detail panel */}
                {isSel && (weekSelectedEvents.length > 0 || (showAcademic && weekSelectedAcademic.length > 0)) && (
                  <div style={{ borderTop: "1px solid var(--mist)" }}>
                    <DayDetailPanel
                      day={row.date} actEvents={weekSelectedEvents}
                      acadEvents={showAcademic ? weekSelectedAcademic : []}
                      onViewEvent={() => setDetail(EVENTS_TODAY[0])}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {detail && <EventDetailModal event={detail} onClose={() => setDetail(null)}/>}
    </div>
  );
}

/* ── TAB 4: SIGN UPS & TRYOUTS ───────────────────────────────── */

const PENDING_APPS = [
  { name: "Drama Club Audition", status: "Awaiting interview", category: "Arts" },
  { name: "Photography Club", status: "Waitlisted #3", category: "Arts" },
];

function SignUpsTab() {
  const [catFilter, setCatFilter] = React.useState("All");
  const [whenFilter, setWhenFilter] = React.useState("Any time");
  const [clubDetail, setClubDetail] = React.useState(null);
  const [signUpTarget, setSignUpTarget] = React.useState(null);

  const filtered = SIGNUPS_DATA.filter(s => {
    const matchCat = catFilter === "All" || s.category === catFilter;
    const matchWhen =
      whenFilter === "Any time" ||
      (whenFilter === "After school" && s.when === "after-school") ||
      (whenFilter === "During school" && s.when === "during-school") ||
      (whenFilter === "Weekend" && s.when === "weekend");
    return matchCat && matchWhen;
  });

  const urgentCount = SIGNUPS_DATA.filter(s => s.deadlineUrgency === "urgent").length;

  const deadlineStyle = urgency =>
    urgency === "urgent" ? { bg: "#FEE2E2", text: "#991B1B" }
    : urgency === "soon"  ? { bg: "#FEF3C7", text: "#92400E" }
    :                       { bg: "#DBEAFE", text: "#1E40AF" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Hero */}
      <div style={{
        borderRadius: 20, overflow: "hidden",
        background: "linear-gradient(135deg, #FFD4B4 0%, #FFECD4 50%, #FFF4C4 100%)",
        boxShadow: "var(--shadow-card)",
        padding: "28px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#7C2D12", marginBottom: 4, opacity: 0.85 }}>Wyndham Park High School</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#3D1A0A", marginBottom: 12 }}>Sign ups & tryouts</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              [`${SIGNUPS_DATA.length} open`, "#0C447C", "#D4E8FF"],
              [`${urgentCount} closing soon`, "#991B1B", "#FEE2E2"],
              ["Submit docs online", "#0F6E56", "#E1F5EE"],
            ].map(([label, text, bg]) => (
              <div key={label} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: bg, color: text,
              }}>{label}</div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 56, lineHeight: 1, opacity: 0.65 }}>✍️</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 18, fontWeight: 500 }}>Open sign ups & tryouts</div>
        <select style={{
          padding: "6px 10px", fontSize: 13, borderRadius: 8,
          border: "1px solid var(--mist)", background: "#fff", cursor: "pointer",
        }}>
          <option>Sort: Deadline (soonest)</option>
          <option>Sort: Alphabetical</option>
          <option>Sort: Category</option>
        </select>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--stone)", width: 72, flexShrink: 0 }}>Category:</span>
          {["All", "Athletics", "Academic", "Clubs", "Service", "Arts"].map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{
              padding: "4px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer",
              background: catFilter === c ? "var(--ink)" : "#fff",
              color: catFilter === c ? "#fff" : "var(--slate)",
              border: catFilter === c ? "1px solid var(--ink)" : "1px solid var(--mist)",
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "var(--stone)", width: 72, flexShrink: 0 }}>When:</span>
          {["Any time", "During school", "After school", "Weekend"].map(w => (
            <button key={w} onClick={() => setWhenFilter(w)} style={{
              padding: "4px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer",
              background: whenFilter === w ? "var(--ink)" : "#fff",
              color: whenFilter === w ? "#fff" : "var(--slate)",
              border: whenFilter === w ? "1px solid var(--ink)" : "1px solid var(--mist)",
            }}>{w}</button>
          ))}
        </div>
      </div>

      {/* Deadline alert */}
      {urgentCount >= 1 && (
        <div style={{
          padding: "12px 16px", borderRadius: 10,
          background: "#FEE2E2", border: "1px solid #FCA5A5",
          display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "#991B1B",
        }}>
          <I.Bell size={16} color="#991B1B"/>
          Heads up — {urgentCount} sign-up{urgentCount > 1 ? "s are" : " is"} closing within 48 hours.
        </div>
      )}

      {/* Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "32px 0", color: "var(--stone)", fontSize: 14 }}>
          No sign-ups match those filters.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(s => {
            const ds = deadlineStyle(s.deadlineUrgency);
            return (
              <div key={s.id} style={{
                background: "#fff", borderRadius: 16, padding: 18, boxShadow: "var(--shadow-card)",
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                  <IconTile icon={s.icon} category={s.category} size={40}/>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 500, color: "var(--ink)" }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: "var(--stone)" }}>{s.category} · {s.lead} · {s.location}</div>
                  </div>
                  <span style={{
                    padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, flexShrink: 0,
                    background: ds.bg, color: ds.text,
                  }}>Due {s.deadline}</span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  {[["Date", s.dates], ["Commitment", s.commitment], ["Eligibility", s.eligibility], ["Slots", s.slots]].map(([lbl, val]) => (
                    <div key={lbl} style={{ padding: "8px 10px", borderRadius: 8, background: "var(--bone)" }}>
                      <div style={{ fontSize: 11, color: "var(--silver)", fontWeight: 600, textTransform: "uppercase" }}>{lbl}</div>
                      <div style={{ fontSize: 12, color: "var(--slate)" }}>{val}</div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: "10px 12px", borderRadius: 10, background: "var(--bone)", marginBottom: 14 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6 }}>Requirements</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {s.requirements.map((r, i) => (
                      <li key={i} style={{ fontSize: 12, color: "var(--stone)" }}>{r}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => setClubDetail(s)} style={{
                    padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500,
                    border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
                  }}>View details</button>
                  <button onClick={() => setSignUpTarget(s)} style={{
                    padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500,
                    background: "var(--student)", color: "#fff", border: "none",
                  }}>Sign up</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pending applications */}
      <div style={{ background: "var(--bone)", borderRadius: 14, padding: 18, marginTop: 4 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 14 }}>Pending applications</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PENDING_APPS.map((app, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
              borderRadius: 10, background: "#fff", border: "1px solid var(--mist)",
            }}>
              <CatPill category={app.category}/>
              <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{app.name}</div>
              <span style={{
                fontSize: 12, color: "var(--stone)", padding: "3px 10px", borderRadius: 999,
                background: "var(--bone)", border: "1px solid var(--mist)",
              }}>{app.status}</span>
            </div>
          ))}
        </div>
      </div>

      {clubDetail && <ClubDetailModal activity={clubDetail} onClose={() => setClubDetail(null)}/>}
      {signUpTarget && <SignUpConfirmModal activity={signUpTarget} onClose={() => setSignUpTarget(null)}/>}
    </div>
  );
}

/* ── TAB 5: ANNOUNCEMENTS ────────────────────────────────────── */

function AnnouncementsTab({ onUnreadChange }) {
  const [items, setItems] = React.useState(ANNOUNCEMENTS_DATA);
  const [feedFilter, setFeedFilter] = React.useState("All");

  const unread = items.filter(a => a.unread).length;

  const markRead = id => {
    setItems(prev => {
      const next = prev.map(a => a.id === id ? { ...a, unread: false } : a);
      onUnreadChange(next.filter(a => a.unread).length);
      return next;
    });
  };

  const markAllRead = () => {
    setItems(prev => prev.map(a => ({ ...a, unread: false })));
    onUnreadChange(0);
  };

  const filtered = items.filter(a => {
    if (feedFilter === "My activities only") return a.activityCategory !== "School-wide";
    if (feedFilter === "School-wide") return a.activityCategory === "School-wide";
    return true;
  });

  const pinned = filtered.filter(a => a.pinned);
  const unpinned = filtered.filter(a => !a.pinned);

  const renderCard = ann => {
    const tc = ANN_TYPE_COLOR[ann.type] || { bg: "#F3F4F6", text: "#4B5563" };
    const ac = ACT_CAT[ann.activityCategory] || { bg: "#F3F4F6", text: "#4B5563" };
    return (
      <div
        key={ann.id}
        onClick={() => markRead(ann.id)}
        style={{
          padding: "16px 18px", borderRadius: 14, cursor: "pointer",
          background: ann.unread ? "#F3F8FE" : "#fff",
          border: ann.unread ? "1px solid #CFE2F6" : "none",
          borderLeft: ann.pinned ? "3px solid #991B1B" : undefined,
          boxShadow: ann.unread ? "0 2px 10px rgba(59,130,246,0.10)" : "0 1px 4px rgba(0,0,0,0.06)",
          transition: "all 200ms",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          {ann.unread && (
            <div style={{ width: 8, height: 8, borderRadius: 999, background: "#3B82F6", flexShrink: 0 }}/>
          )}
          <span style={{
            padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            background: tc.bg, color: tc.text,
          }}>{ann.type}</span>
          <span style={{
            padding: "2px 8px", borderRadius: 999, fontSize: 11, fontWeight: 600,
            background: ac.bg, color: ac.text,
          }}>{ann.activity}</span>
          <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--silver)" }}>{ann.time}</span>
        </div>
        <div style={{
          fontSize: 14, marginBottom: 4,
          fontWeight: ann.unread ? 600 : 500,
          color: ann.unread ? "var(--ink)" : "var(--stone)",
        }}>{ann.title}</div>
        <div style={{
          fontSize: 13, lineHeight: 1.5,
          color: ann.unread ? "var(--stone)" : "var(--silver)",
        }}>{ann.body}</div>
        {ann.action && (
          <div style={{ marginTop: 10 }}>
            <button onClick={e => e.stopPropagation()} style={{
              padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 500,
              border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
            }}>{ann.action.label}</button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Hero */}
      <div style={{
        borderRadius: 20, overflow: "hidden",
        background: "linear-gradient(135deg, #E8D5F2 0%, #D4C5F0 50%, #A8D5BA 100%)",
        boxShadow: "var(--shadow-card)",
        padding: "28px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
      }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#3C3489", marginBottom: 4, opacity: 0.85 }}>Wyndham Park High School</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1A1040", marginBottom: 12 }}>Announcements</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              [unread > 0 ? `${unread} unread` : "All caught up", unread > 0 ? "#991B1B" : "#0F6E56", unread > 0 ? "#FEE2E2" : "#E1F5EE"],
              [`${items.length} total`, "#3C3489", "#EEEDFE"],
              ["From your activities", "#0C447C", "#D4E8FF"],
            ].map(([label, text, bg]) => (
              <div key={label} style={{
                padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                background: bg, color: text,
              }}>{label}</div>
            ))}
          </div>
        </div>
        <div style={{ fontSize: 56, lineHeight: 1, opacity: 0.65 }}>📣</div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 500 }}>Announcements</div>
          {unread > 0 && <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 2 }}>{unread} unread</div>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <select value={feedFilter} onChange={e => setFeedFilter(e.target.value)} style={{
            padding: "6px 10px", fontSize: 13, borderRadius: 8,
            border: "1px solid var(--mist)", background: "#fff", cursor: "pointer",
          }}>
            <option>All</option>
            <option>My activities only</option>
            <option>School-wide</option>
          </select>
          <button onClick={markAllRead} style={{
            padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer",
            border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <I.Check size={13}/>Mark all read
          </button>
        </div>
      </div>

      {pinned.length > 0 && (
        <div>
          <div style={{
            fontSize: 10, fontWeight: 700, color: "var(--silver)", letterSpacing: "0.08em",
            textTransform: "uppercase", marginBottom: 8,
            display: "flex", alignItems: "center", gap: 6,
          }}>
            <I.Pin size={12} color="var(--silver)"/> Pinned
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pinned.map(renderCard)}
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {unpinned.map(renderCard)}
      </div>
    </div>
  );
}

/* ── TAB 6: JOB BOARD ─────────────────────────────────────────── */

function JobCard({ job, onView, onApply, onMessage, applied, added }) {
  const c = JOB_CAT[job.category] || JOB_CAT.Other;
  return (
    <div style={{
      background: "#fff", borderRadius: 18, overflow: "hidden",
      boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{ padding: "18px 20px 14px", display: "flex", alignItems: "flex-start", gap: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: c.bg, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22,
        }}>{job.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginBottom: 3 }}>{job.title}</div>
          <div style={{ fontSize: 12, color: "var(--stone)" }}>
            {job.department} · {job.supervisor} · {job.spots} spot{job.spots !== 1 ? "s" : ""} open
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end", flexShrink: 0 }}>
          <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: c.bg, color: c.text }}>{job.category}</span>
          <span style={{ padding: "3px 9px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#D1FAE5", color: "#065F46" }}>💰 {job.credits}</span>
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: "0 20px 14px", fontSize: 13, color: "var(--stone)", lineHeight: 1.55 }}>{job.about}</div>

      {/* Meta */}
      <div style={{ margin: "0 20px 14px", background: "#F8F9FA", borderRadius: 10, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", overflow: "hidden" }}>
        {[["Schedule", job.schedule], ["Hrs / week", job.hoursPerWeek], ["Duration", job.duration]].map(([lbl, val]) => (
          <div key={lbl} style={{ padding: "10px 12px", borderRight: "1px solid var(--mist)" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--silver)", textTransform: "uppercase", marginBottom: 3 }}>{lbl}</div>
            <div style={{ fontSize: 12, fontWeight: 500, color: "var(--slate)" }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ padding: "12px 20px 16px", borderTop: "1px solid var(--mist)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 999, flexShrink: 0,
            background: c.bg, color: c.text,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 11, fontWeight: 700,
          }}>{job.supervisor.split(" ").map(w => w[0]).join("").slice(0,2)}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{job.supervisor}</div>
            <div style={{ fontSize: 11, color: "var(--stone)" }}>{job.supervisorRole}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          <button onClick={() => onView(job)} style={{
            padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500,
            border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
          }}>View details</button>
          <button onClick={() => onMessage(job)} style={{
            padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500,
            border: "1px solid var(--mist)", background: "var(--bone)", color: "var(--slate)",
          }}>Message</button>
          {applied || added ? (
            <span style={{
              padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
              background: "#D1FAE5", color: "#065F46", display: "inline-flex", alignItems: "center", gap: 5,
            }}>✓ Applied</span>
          ) : (
            <button onClick={() => onApply(job)} style={{
              padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: "var(--ink)", color: "#fff", border: "none",
            }}>Apply</button>
          )}
        </div>
      </div>
    </div>
  );
}

function JobDetailModal({ job, onClose, onApply }) {
  if (!job) return null;
  const c = JOB_CAT[job.category] || JOB_CAT.Other;
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, width: "100%", maxWidth: 560,
        maxHeight: "90vh", overflow: "auto", display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{ padding: "22px 24px 0", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{job.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)" }}>{job.title}</div>
            <div style={{ fontSize: 13, color: "var(--stone)", marginTop: 2 }}>{job.department} · {job.supervisor}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--stone)" }}>✕</button>
        </div>

        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: 16 }}>
          {/* About */}
          <p style={{ margin: 0, fontSize: 14, color: "var(--slate)", lineHeight: 1.6 }}>{job.about}</p>

          {/* Meta grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {[["Schedule", job.schedule], ["Hours / week", job.hoursPerWeek], ["Fee credits earned", job.credits], ["Duration", job.duration]].map(([lbl, val]) => (
              <div key={lbl} style={{ padding: "10px 12px", background: "#F8F9FA", borderRadius: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "var(--silver)", textTransform: "uppercase", marginBottom: 3 }}>{lbl}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--slate)" }}>{val}</div>
              </div>
            ))}
          </div>

          {/* What you'll do */}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>What you'll do</div>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 5 }}>
              {job.whatYoullDo.map((item, i) => (
                <li key={i} style={{ fontSize: 13, color: "var(--slate)" }}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>Requirements</div>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 5 }}>
              {job.requirements.map((req, i) => (
                <li key={i} style={{ fontSize: 13, color: "var(--slate)" }}>{req}</li>
              ))}
            </ul>
          </div>

          {/* Advisor card */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: c.bg + "55", borderRadius: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 999, background: c.bg, color: c.text,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>{job.supervisor.split(" ").map(w => w[0]).join("").slice(0,2)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{job.supervisor}</div>
              <div style={{ fontSize: 12, color: "var(--stone)" }}>{job.supervisorRole} · {job.supervisorEmail}</div>
            </div>
            <button style={{
              padding: "6px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500,
              border: "1px solid var(--mist)", background: "#fff",
            }}>Message</button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 24px", borderTop: "1px solid var(--mist)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 500, border: "1px solid var(--mist)", background: "var(--bone)" }}>Close</button>
          <button onClick={() => { onClose(); onApply(job); }} style={{ padding: "9px 20px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "var(--ink)", color: "#fff", border: "none" }}>Apply</button>
        </div>
      </div>
    </div>
  );
}

function JobApplyModal({ job, onClose, onSuccess }) {
  const [why, setWhy] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleSubmit = () => {
    if (!why.trim()) { setError(true); return; }
    onClose();
    setTimeout(() => onSuccess(job), 80);
  };

  if (!job) return null;
  const c = JOB_CAT[job.category] || JOB_CAT.Other;

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 480, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ padding: "20px 22px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{job.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>Apply — {job.title}</div>
            <div style={{ fontSize: 12, color: "var(--stone)" }}>Reviewed within 2–3 school days</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--stone)" }}>✕</button>
        </div>

        <div style={{ padding: "16px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ margin: 0, fontSize: 13, color: "var(--stone)" }}>
            {job.supervisor} will review your application and get back to you within 2–3 school days.
          </p>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>
              Why do you want this position? <span style={{ color: "#EF4444" }}>*</span>
            </label>
            <textarea
              value={why} onChange={e => { setWhy(e.target.value); setError(false); }}
              placeholder="Tell us what interests you about this role..."
              style={{
                width: "100%", height: 100, padding: "10px 12px", borderRadius: 10, resize: "vertical",
                fontSize: 13, fontFamily: "inherit",
                border: error ? "1.5px solid #EF4444" : "1px solid var(--mist)",
                boxSizing: "border-box",
              }}
            />
            {error && <div style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>Please tell us why you want this position.</div>}
          </div>

          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: 6 }}>
              Relevant experience <span style={{ fontSize: 11, fontWeight: 400, color: "var(--stone)" }}>(optional)</span>
            </label>
            <textarea
              value={experience} onChange={e => setExperience(e.target.value)}
              placeholder="Any past experience, skills, or classes that are relevant..."
              style={{
                width: "100%", height: 80, padding: "10px 12px", borderRadius: 10, resize: "vertical",
                fontSize: 13, border: "1px solid var(--mist)", fontFamily: "inherit",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Info banner */}
          <div style={{ padding: "11px 14px", background: "#EFF6FF", borderRadius: 10, border: "1px solid #BFDBFE", fontSize: 12, color: "#1E40AF" }}>
            Once accepted, this position will appear in your <strong>My activities</strong> tab and your daily schedule.
          </div>
        </div>

        <div style={{ padding: "12px 22px 18px", borderTop: "1px solid var(--mist)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 500, border: "1px solid var(--mist)", background: "var(--bone)" }}>Cancel</button>
          <button onClick={handleSubmit} style={{ padding: "9px 20px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "#1D4ED8", color: "#fff", border: "none" }}>Submit application</button>
        </div>
      </div>
    </div>
  );
}

function JobSuccessModal({ job, onClose, onAddToActivities }) {
  if (!job) return null;
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 420, padding: "28px 28px 22px", textAlign: "center" }}>
        {/* Icon */}
        <div style={{
          width: 56, height: 56, borderRadius: 999, background: "#1D4ED8",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 16px",
        }}>
          <span style={{ fontSize: 24 }}>✈️</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", marginBottom: 10 }}>Application submitted!</div>
        <p style={{ fontSize: 13, color: "var(--stone)", margin: "0 0 18px", lineHeight: 1.6 }}>
          Your application to <strong>{job.title}</strong> has been sent to {job.supervisor}. They'll review it within 2–3 school days.
        </p>

        {/* Where it'll appear */}
        <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "12px 14px", marginBottom: 20, textAlign: "left" }}>
          <div style={{ fontSize: 12, color: "var(--stone)", marginBottom: 8 }}>Once accepted, this will appear in:</div>
          <div style={{ display: "flex", gap: 8 }}>
            <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#DBEAFE", color: "#1E40AF" }}>My activities</span>
            <span style={{ padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 700, background: "#EDE9FE", color: "#5B21B6" }}>Your schedule</span>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={onClose} style={{ padding: "9px 20px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 500, border: "1px solid var(--mist)", background: "var(--bone)" }}>Close</button>
          <button onClick={onAddToActivities} style={{ padding: "9px 20px", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: 600, background: "#1D4ED8", color: "#fff", border: "none" }}>Add to My activities now</button>
        </div>
      </div>
    </div>
  );
}

function JobsTab({ appCount, setAppCount, addedJobIds, onJobAdd }) {
  const [catFilter, setCatFilter] = React.useState("All");
  const [timeFilter, setTimeFilter] = React.useState("Any time");
  const [detailJob, setDetailJob] = React.useState(null);
  const [applyJob, setApplyJob] = React.useState(null);
  const [successJob, setSuccessJob] = React.useState(null);
  const [appliedIds, setAppliedIds] = React.useState([]);

  const filtered = JOBS_DATA.filter(j => {
    const matchCat = catFilter === "All" || j.category === catFilter;
    const matchTime = timeFilter === "Any time" || j.time === timeFilter;
    return matchCat && matchTime;
  });

  const handleApply = job => setApplyJob(job);
  const handleMessage = job => {};
  const handleApplySuccess = job => {
    setAppliedIds(prev => [...prev, job.id]);
    setAppCount(prev => prev + 1);
    setSuccessJob(job);
  };
  const handleAddToActivities = () => {
    onJobAdd(successJob);
    setSuccessJob(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Intro banner */}
      <div style={{
        borderRadius: 16, padding: "16px 20px",
        background: "linear-gradient(135deg, #EFF6FF 0%, #F8FBFF 100%)",
        border: "1px solid #BFDBFE",
        display: "flex", alignItems: "flex-start", gap: 16,
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: "#DBEAFE",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22,
        }}>💼</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: "#1E3A5F", marginBottom: 5 }}>School job board</div>
          <div style={{ fontSize: 13, color: "#3B82F6", lineHeight: 1.6 }}>
            Work during free periods or after school to earn <strong>school fee credits</strong> — no cash, but credits toward meals, activity fees, and school costs. All positions are supervised by a teacher or staff member.
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { label: "Open positions", value: JOBS_DATA.length },
          { label: "Fee credits / sem", value: "0.5 – 1.0" },
          { label: "Your applications", value: appCount },
        ].map(s => (
          <div key={s.label} style={{
            padding: "14px 18px", borderRadius: 14,
            background: "#F8F9FA", border: "1px solid var(--mist)",
          }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: "var(--ink)", lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--stone)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 13, color: "var(--stone)", width: 72, flexShrink: 0 }}>Category:</span>
          {["All", "Library", "Office", "Tech", "Other"].map(c => (
            <button key={c} onClick={() => setCatFilter(c)} style={{
              padding: "4px 12px", borderRadius: 999, fontSize: 12, cursor: "pointer",
              background: catFilter === c ? "var(--ink)" : "#fff",
              color: catFilter === c ? "#fff" : "var(--slate)",
              border: catFilter === c ? "1px solid var(--ink)" : "1px solid var(--mist)",
            }}>{c}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 13, color: "var(--stone)", width: 72, flexShrink: 0 }}>Time:</span>
          <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)} style={{
            padding: "5px 10px", fontSize: 13, borderRadius: 8,
            border: "1px solid var(--mist)", background: "#fff", cursor: "pointer",
          }}>
            {["Any time", "Free period", "After school", "Lunch"].map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Listings */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--stone)", fontSize: 14 }}>
          No positions match those filters.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {filtered.map(job => (
            <JobCard
              key={job.id} job={job}
              onView={setDetailJob}
              onApply={handleApply}
              onMessage={handleMessage}
              applied={appliedIds.includes(job.id)}
              added={addedJobIds.includes(job.id)}
            />
          ))}
        </div>
      )}

      {detailJob && <JobDetailModal job={detailJob} onClose={() => setDetailJob(null)} onApply={j => { setDetailJob(null); setApplyJob(j); }}/>}
      {applyJob  && <JobApplyModal job={applyJob} onClose={() => setApplyJob(null)} onSuccess={handleApplySuccess}/>}
      {successJob && <JobSuccessModal job={successJob} onClose={() => setSuccessJob(null)} onAddToActivities={handleAddToActivities}/>}
    </div>
  );
}

/* ── MAIN APP ────────────────────────────────────────────────── */

const ACT_TABS = [
  { id: "myacts",        label: "My activities" },
  { id: "discover",      label: "Discover" },
  { id: "calendar",      label: "Events calendar" },
  { id: "signups",       label: "Sign ups & tryouts" },
  { id: "announcements", label: "Announcements" },
  { id: "jobs",          label: "💼 Job board" },
];

const SEG_TO_TAB = {
  overview:      "myacts",
  discover:      "discover",
  events:        "calendar",
  signups:       "signups",
  announcements: "announcements",
  jobs:          "jobs",
};

function ActivitiesApp({ segments }) {
  const [unread, setUnread] = React.useState(
    ANNOUNCEMENTS_DATA.filter(a => a.unread).length
  );
  const [addedJobs, setAddedJobs]   = React.useState([]);
  const [glowingJobId, setGlowingJobId] = React.useState(null);
  const [jobAppCount, setJobAppCount]   = React.useState(0);
  const l2 = segments[1] || "overview";
  const [activeTab, setActiveTab] = React.useState(SEG_TO_TAB[l2] || "myacts");

  const handleJobAdd = job => {
    setAddedJobs(prev => prev.find(j => j.id === job.id) ? prev : [...prev, job]);
    setGlowingJobId(job.id);
    setTimeout(() => setGlowingJobId(null), 1200);
    setActiveTab("myacts");
  };

  return (
    <Page segments={segments} title="My Activities" emoji="🌟" lede="Get involved. Build skills. Make memories.">
      {/* Internal tab bar */}
      <div style={{
        display: "flex", borderBottom: "1px solid var(--mist)",
        marginBottom: 28, overflowX: "auto",
      }}>
        {ACT_TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            padding: "12px 18px", fontSize: 14, cursor: "pointer", whiteSpace: "nowrap",
            fontWeight: activeTab === tab.id ? 600 : 500,
            color: activeTab === tab.id ? "var(--student-deep)" : "var(--stone)",
            background: "none", border: "none",
            borderBottom: activeTab === tab.id ? "2px solid var(--student)" : "2px solid transparent",
            display: "flex", alignItems: "center", gap: 6,
          }}>
            {tab.label}
            {tab.id === "announcements" && unread > 0 && (
              <span style={{
                minWidth: 16, height: 16, padding: "0 5px", borderRadius: 999,
                background: "#EF4444", color: "#fff",
                fontSize: 10, fontWeight: 700,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{unread}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{
        background: "#EDF2F7", borderRadius: 20,
        padding: "24px 28px", minHeight: 500,
      }}>
        {activeTab === "discover"      && <DiscoverTab/>}
        {activeTab === "myacts"        && <MyActivitiesTab addedJobs={addedJobs} glowingJobId={glowingJobId}/>}
        {activeTab === "calendar"      && <CalendarTab/>}
        {activeTab === "signups"       && <SignUpsTab/>}
        {activeTab === "announcements" && <AnnouncementsTab onUnreadChange={setUnread}/>}
        {activeTab === "jobs"          && <JobsTab appCount={jobAppCount} setAppCount={setJobAppCount} addedJobIds={addedJobs.map(j => j.id)} onJobAdd={handleJobAdd}/>}
      </div>
    </Page>
  );
}

/* ── EXPORTS ─────────────────────────────────────────────────── */

window.ActivitiesApp = ActivitiesApp;
window["renderRoute_my-activities"] = ({ segments, navigate, tweaks }) =>
  React.createElement(ActivitiesApp, { segments, navigate, tweaks });

/* ============================================================
   MY CALENDAR — events data + layer + helpers
   Single source of truth for the week-view mock.
   ============================================================ */

/* Layer = filter group. Maps to the colored chips in the screenshots. */
const CAL_LAYERS = {
  classes:     { label: "Classes",     color: "#3B82F6", bg: "#EFF6FF",  border: "#BFDBFE" },
  assignments: { label: "Assignments", color: "#E04C4C", bg: "#FEF3F2", border: "#FECDCA" },
  exams:       { label: "Exams",       color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
  activities:  { label: "Activities",  color: "#16A34A", bg: "#F0FDF4", border: "#BBF7D0" },
  personal:    { label: "Personal",    color: "#EA8C2A", bg: "#FFF7ED", border: "#FED7AA" },
  health:      { label: "Health",      color: "#DB2777", bg: "#FDF2F8", border: "#FBCFE8" },
  focus:       { label: "Focus Time",  color: "#0EA5E9", bg: "#F0F9FF", border: "#BAE6FD" },
  free:        { label: "Free",        color: "#94A3B8", bg: "#F1F5F9", border: "#E2E8F0" },
  "school-cal":       { label: "School Calendar",    color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
  satact:             { label: "SAT/ACT Exams",      color: "#14B8A6", bg: "#F0FDFA", border: "#99F6E4" },
  "community-service":{ label: "Community Service",  color: "#0D9488", bg: "#F0FDFA", border: "#99F6E4" },
  presentations:      { label: "Presentations",      color: "#EA580C", bg: "#FFF7ED", border: "#FED7AA" },
  "field-studies":    { label: "Field Studies",      color: "#6366F1", bg: "#EEF2FF", border: "#C7D2FE" },
};

/* Days are 0..6 = Mon..Sun for week of May 11–17, 2026 */
const CAL_WEEK_START = new Date(2026, 4, 11); // May 11, 2026 (Mon)
const CAL_DAYS = [
  { idx: 0, dow: "Mon", date: 11, isToday: false },
  { idx: 1, dow: "Tue", date: 12, isToday: false },
  { idx: 2, dow: "Wed", date: 13, isToday: true,  badge: 13 }, // "today" pill in screenshots
  { idx: 3, dow: "Thu", date: 14, isToday: false },
  { idx: 4, dow: "Fri", date: 15, isToday: false },
  { idx: 5, dow: "Sat", date: 16, isToday: false },
  { idx: 6, dow: "Sun", date: 17, isToday: false },
];

/* All-day rows show due-soft labels.
   status: "overdue" | "due-today" | undefined */
const CAL_ALLDAY = [
  { day: 0, layer: "assignments", title: "Biology Lab Report", subtitle: "due", status: "due-today" },
  { day: 1, layer: "assignments", title: "Math Problem Set",   subtitle: "due", status: "overdue"   },
  { day: 3, layer: "assignments", title: "History Essay",      subtitle: "due", status: "overdue"   },
  { day: 5, layer: "personal",    title: "Family Trip", endDay: 6 },
  { day: 5,  layer: "satact",          title: "SAT Exam",                         time: "8:00 AM – 1:00 PM est." },
  { day: 14, layer: "school-cal",      title: "No School — Memorial Day",         eventType: "holiday" },
  { day: 10, layer: "school-cal",      title: "No School — Prof Dev Day",         eventType: "closure", subtitle: "no school" },
  { day: 4,  layer: "field-studies",   title: "Urban Ecology Final Report",       subtitle: "due", status: "overdue" },
  { day: 2,  layer: "community-service", title: "Service Hours Log Due",          subtitle: "due", status: "due-today" },
];

/* Events on the time grid. Hours are decimals (8.5 = 8:30) */
const CAL_EVENTS = [
  // Mon 5/11
  { id: "biology-mon",   day: 0, start: 8.0,  end: 9.25,  layer: "classes",     title: "Biology 101", time: "8:00 – 9:15 AM", teacher: "Ms. Lopez", room: "Room 215" },
  { id: "studyblock-mon",day: 0, start: 10.0, end: 11.0,  layer: "focus",       title: "Study Block", time: "10:00 – 11:00 AM", note: "Biology Review" },
  { id: "lunch-mon",     day: 0, start: 12.0, end: 12.75, layer: "school-cal",  eventType: "lunch", title: "Lunch", time: "12:00 – 12:45 PM" },
  { id: "english-mon",   day: 0, start: 13.0, end: 14.25, layer: "classes",     title: "English 10", time: "1:00 – 2:15 PM", teacher: "Mr. Carter", room: "Room 302" },
  { id: "soccer-mon",    day: 0, start: 15.5, end: 17.0,  layer: "activities",  title: "Soccer Practice", time: "3:30 – 5:00 PM", note: "Field", status: "cancelled" },
  { id: "focusmon",      day: 0, start: 18.5, end: 20.5,  layer: "focus",       title: "Focus Time", time: "6:30 – 8:30 PM", note: "Deep Work" },

  // Tue 5/12 — Algebra II is the highlighted (Class detail) one
  { id: "algebra-tue",   day: 1, start: 8.0,  end: 9.25,  layer: "classes",     title: "Algebra II",  time: "8:00 – 9:15 AM", teacher: "Mr. Kim", room: "Room 203", highlight: true, eventType: "class" },
  { id: "mathset-tue",   day: 1, start: 10.0, end: 11.0,  layer: "assignments", title: "Math Problem Set", time: "10:00 – 11:00 AM", note: "Work Session" },
  { id: "lunch-tue",     day: 1, start: 12.0, end: 12.75, layer: "school-cal",  eventType: "lunch", title: "Lunch", time: "12:00 – 12:45 PM" },
  { id: "ushist-tue",    day: 1, start: 13.0, end: 14.25, layer: "classes",     title: "US History", time: "1:00 – 2:15 PM", teacher: "Mr. Johnson", room: "Room 307" },
  { id: "study-tue",     day: 1, start: 16.0, end: 17.5,  layer: "focus",       title: "Study Group", time: "4:00 – 5:30 PM", note: "Library · Room 1" },
  { id: "review-tue",    day: 1, start: 19.0, end: 20.5,  layer: "focus",       title: "Review Notes", time: "7:00 – 8:30 PM", note: "US History" },

  // Wed 5/13 (today)
  { id: "chem-wed",      day: 2, start: 8.0,  end: 9.25,  layer: "classes",     title: "Chemistry", time: "8:00 – 9:15 AM", teacher: "Mr. Evans", room: "Room 203" },
  { id: "biolab-wed",    day: 2, start: 10.0, end: 11.0,  layer: "assignments", title: "Biology Lab Report", time: "10:00 – 11:00 AM", note: "Work Session" },
  { id: "lunch-wed",     day: 2, start: 12.0, end: 12.75, layer: "school-cal",  eventType: "lunch", title: "Lunch", time: "12:00 – 12:45 PM" },
  { id: "english-wed",   day: 2, start: 13.0, end: 14.25, layer: "classes",     title: "English 10", time: "1:00 – 2:15 PM", teacher: "Mr. Carter", room: "Room 302" },
  { id: "club-wed",      day: 2, start: 15.0, end: 16.5,  layer: "activities",  title: "Club Meeting", time: "3:00 – 4:30 PM", note: "Robotics Club" },
  { id: "gym-wed",       day: 2, start: 18.0, end: 19.0,  layer: "health",      title: "Gym / Workout", time: "6:00 – 7:00 PM" },

  // Thu 5/14 — Field Trip is the highlight here
  { id: "algebra-thu",   day: 3, start: 8.0,  end: 9.25,  layer: "classes",     title: "Algebra II", time: "8:00 – 9:15 AM", teacher: "Mr. Kim", room: "Room 203" },
  { id: "chemquiz-thu",  day: 3, start: 10.0, end: 11.0,  layer: "exams",       title: "Chemistry Quiz", time: "10:00 – 11:00 AM" },
  { id: "lunch-thu",     day: 3, start: 12.0, end: 12.75, layer: "school-cal",  eventType: "lunch", title: "Lunch", time: "12:00 – 12:45 PM" },
  { id: "ushist-thu",    day: 3, start: 13.0, end: 14.25, layer: "classes",     title: "US History", time: "1:00 – 2:15 PM", teacher: "Mr. Carter", room: "Room 307" },
  { id: "fieldtrip-thu", day: 3, start: 15.5, end: 19.5,  layer: "activities",  title: "Museum Field Trip", time: "3:30 – 7:30 PM", note: "City Science Museum", attendees: 28, eventType: "fieldtrip", highlight: true },

  // Fri 5/15 — Flex Study highlight
  { id: "biology-fri",   day: 4, start: 8.0,  end: 9.25,  layer: "classes",     title: "Biology 101", time: "8:00 – 9:15 AM", teacher: "Ms. Lopez", room: "Room 215" },
  { id: "freestudy-fri", day: 4, start: 10.0, end: 11.5,  layer: "focus",       title: "Free / Study Time", time: "10:00 – 11:30 AM", eventType: "flexstudy" },
  { id: "lunch-fri",     day: 4, start: 12.0, end: 12.75, layer: "school-cal",  eventType: "lunch", title: "Lunch", time: "12:00 – 12:45 PM" },
  { id: "english-fri",   day: 4, start: 13.0, end: 14.25, layer: "classes",     title: "English 10", time: "1:00 – 2:15 PM", teacher: "Mr. Carter", room: "Room 302" },
  { id: "history-fri",   day: 4, start: 15.0, end: 16.0,  layer: "assignments", title: "History Essay", time: "3:00 – 4:00 PM", note: "Work Session" },
  { id: "essay-fri",     day: 4, start: 19.0, end: 20.5,  layer: "focus",       title: "Focus Time", time: "7:00 – 8:30 PM", note: "Essay Draft" },

  // Sat 5/16
  { id: "free-sat-am",   day: 5, start: 9.0,  end: 12.0,  layer: "free",        title: "Free Time", time: "9:00 AM – 12:00 PM" },
  { id: "free-sat-pm",   day: 5, start: 14.0, end: 17.0,  layer: "free",        title: "Free Time", time: "2:00 – 5:00 PM" },

  // ── Health additions ──
  { id: "nurse-thu",      day: 3, start: 14.5,  end: 15.0,  layer: "health",             title: "School Nurse Appointment", time: "2:30 – 3:00 PM",      note: "Nurse Walsh · Wellness Ctr" },
  { id: "counselor-fri",  day: 4, start: 16.0,  end: 16.5,  layer: "health",             title: "Counselor Check-in",       time: "4:00 – 4:30 PM",      note: "Ms. Davis · Room 110" },

  // ── Community Service ──
  { id: "service-sat",    day: 5, start: 15.0,  end: 18.0,  layer: "community-service",  title: "Boys & Girls Club",        time: "3:00 – 6:00 PM",      note: "Volunteer · 3 hrs" },
  { id: "cleanup-sun",    day: 6, start: 9.0,   end: 12.0,  layer: "community-service",  title: "Environmental Cleanup",    time: "9:00 AM – 12:00 PM",  note: "Riverside Park · 3 hrs" },

  // ── Presentations ──
  { id: "biopres-wed",    day: 2, start: 14.5,  end: 15.0,  layer: "presentations",      title: "Biology Lab Presentation", time: "2:30 – 3:00 PM",      room: "Room 204", note: "Group Project" },
  { id: "advisor-wed",    day: 2, start: 17.0,  end: 17.5,  layer: "presentations",      title: "Advisor Check-in",         time: "5:00 – 5:30 PM",      note: "Virtual · Ms. Rivera" },

  // ── Field Studies ──
  { id: "fieldstudy-mon", day: 0, start: 14.5,  end: 15.25, layer: "field-studies",      title: "Urban Ecology Lab Work",   time: "2:30 – 3:15 PM",      note: "Science Wing Lab 3" },

  // ── School Calendar ──
  { id: "assembly-fri",   day: 4, start: 14.0,  end: 15.5,  layer: "school-cal",         title: "Spring Assembly",          time: "2:00 – 3:30 PM",      note: "Main Gym · All grades",    eventType: "assembly" },
  { id: "fieldday-sat",   day: 5, start: 9.0,   end: 12.0,  layer: "school-cal",         title: "Field Day",                time: "9:00 AM – 12:00 PM",  note: "Athletic Fields",          eventType: "assembly" },
];

/* ============================================================
   Helpers
   ============================================================ */
function calLayerStyle(layerKey) {
  return CAL_LAYERS[layerKey] || CAL_LAYERS.free;
}

function calEventsForDay(day, activeLayers) {
  return CAL_EVENTS
    .filter((e) => e.day === day)
    .filter((e) => !activeLayers || activeLayers.has(e.layer));
}

function calAllDayForDay(day, activeLayers) {
  return CAL_ALLDAY
    .filter((e) => e.day === day)
    .filter((e) => !activeLayers || activeLayers.has(e.layer));
}

window.CAL_LAYERS = CAL_LAYERS;
window.CAL_DAYS = CAL_DAYS;
window.CAL_EVENTS = CAL_EVENTS;
window.CAL_ALLDAY = CAL_ALLDAY;
window.calLayerStyle = calLayerStyle;
window.calEventsForDay = calEventsForDay;
window.calAllDayForDay = calAllDayForDay;

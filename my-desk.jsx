// LINKS — My Desk (refactored)
// Student workspace dashboard with 4 tabs:
// My Menu (dietary filters, lunch selection)
// My Tools (quick-access app grid)
// Files (file upload & management)
// Bookmarks (URL bookmarks with tag filtering)
//
// Uses internal state tabs for smoother UX with complex interactive state

const React = window.React;

const COLORS = {
  text: "#25253A",
  textMuted: "#9090A8",
  bg: "#F4F5FA",
  surface: "#FFFFFF",
  border: "#E8EAF2",
  mint: "#A8E6CF",
  coral: "#FFB5A7",
  lavender: "#D4C5F9",
  sky: "#B8D9FF",
  yellow: "#FFE8A3",
  teal: "#9fe1cb",
  darkGreen: "#1a3a2a",
  veg: "#27500A",
  gf: "#185FA5",
  halal: "#9fe1cb",
  df: "#E07A2D",
  allergen: "#E07A2D",
  fileXLS: "#27500A",
  filePDF: "#FFD4B4",
  filePPT: "#E07A2D",
  fileDOC: "#185FA5",
  gold: "#FFD700",
};

const SOFT_SHADOW = "0 4px 20px rgba(0, 0, 0, 0.10)";
const SUBTLE_SHADOW = "0 2px 12px rgba(0, 0, 0, 0.06)";
const CARD_SHADOW = "0 2px 16px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)";

// ============================================================
// DATA STRUCTURES
// ============================================================

const MENU_ITEMS = [
  {
    id: "m1",
    name: "Pasta Primavera",
    description: "Garden vegetables with seasonal pasta",
    diets: "veg gf",
    allergens: ["eggs"],
    calories: 420,
    ingredients: "Pasta, zucchini, bell peppers, tomatoes, garlic, olive oil, basil, parmesan cheese",
  },
  {
    id: "m2",
    name: "Grilled Chicken Bowl",
    description: "Herb-marinated chicken with quinoa",
    diets: "gf",
    allergens: [],
    calories: 520,
    ingredients: "Chicken breast, quinoa, broccoli, carrots, lemon juice, herbs, olive oil",
  },
  {
    id: "m3",
    name: "Falafel Wrap",
    description: "Crispy falafel with tahini sauce",
    diets: "veg halal",
    allergens: ["sesame", "nuts"],
    calories: 480,
    ingredients: "Chickpeas, tahini, garlic, lemon, cumin, whole wheat wrap, lettuce, tomato",
  },
  {
    id: "m4",
    name: "Salmon Teriyaki",
    description: "Pan-seared salmon with brown rice",
    diets: "gf halal",
    allergens: ["fish", "soy"],
    calories: 580,
    ingredients: "Salmon fillet, brown rice, soy sauce, ginger, garlic, bok choy, sesame oil",
  },
  {
    id: "m5",
    name: "Caprese Salad",
    description: "Fresh mozzarella, tomato, basil",
    diets: "veg gf",
    allergens: ["dairy"],
    calories: 280,
    ingredients: "Fresh mozzarella, vine tomatoes, fresh basil, balsamic vinegar, olive oil, sea salt",
  },
  {
    id: "m6",
    name: "Vegetable Stir-fry",
    description: "Mixed vegetables with tofu",
    diets: "veg gf halal",
    allergens: ["soy"],
    calories: 350,
    ingredients: "Tofu, broccoli, snap peas, mushrooms, carrots, ginger, soy sauce, garlic, rice oil",
  },
];

const DIETARY_FILTERS = [
  { id: "veg", label: "Vegetarian", color: COLORS.veg },
  { id: "gf", label: "Gluten Free", color: COLORS.gf },
  { id: "halal", label: "Halal", color: COLORS.halal },
  { id: "df", label: "Dairy Free", color: COLORS.df },
  { id: "no-nuts", label: "No Nuts", color: "#D97706" },
  { id: "no-eggs", label: "No Eggs", color: "#EC4899" },
];

// This week's menu organized by day
const WEEK_MENU = [
  {
    day: "Wednesday",
    date: "May 15, 2026",
    isToday: false,
    items: ["m1", "m2", "m5"],
  },
  {
    day: "Thursday",
    date: "May 16, 2026",
    isToday: true,
    items: ["m2", "m3", "m4"],
  },
  {
    day: "Friday",
    date: "May 17, 2026",
    isToday: false,
    items: ["m1", "m4", "m6"],
  },
];

// Cycle menu organized by category
const CYCLE_MENU = {
  proteins: [
    {
      id: "p1",
      name: "Free-range Chicken",
      description: "Herb-marinated breast, oven-roasted",
      diets: "gf halal",
      allergens: [],
      calories: 520,
    },
    {
      id: "p2",
      name: "Wild-caught Salmon",
      description: "Pan-seared fillet with lemon",
      diets: "gf halal",
      allergens: ["fish"],
      calories: 580,
    },
    {
      id: "p3",
      name: "House-made Falafel",
      description: "Chickpea patties, tahini sauce",
      diets: "veg halal",
      allergens: ["sesame", "nuts"],
      calories: 480,
    },
  ],
  vegetables: [
    {
      id: "v1",
      name: "Spring Greens",
      description: "Spring harvest, garlic, lemon zest",
      diets: "veg gf halal df",
      allergens: [],
      calories: 60,
    },
    {
      id: "v2",
      name: "Roasted Broccoli",
      description: "Seasonal florets, olive oil, herbs",
      diets: "veg gf halal df",
      allergens: [],
      calories: 80,
    },
    {
      id: "v3",
      name: "Carrot & Squash",
      description: "Early season root vegetables, roasted",
      diets: "veg gf halal df",
      allergens: [],
      calories: 90,
    },
  ],
  staples: [
    {
      id: "s1",
      name: "Brown Rice",
      description: "Whole grain, offered daily",
      diets: "veg gf halal df",
      allergens: [],
      calories: 215,
    },
    {
      id: "s2",
      name: "Mixed Greens",
      description: "Fresh salad base, available daily",
      diets: "veg gf halal df",
      allergens: [],
      calories: 25,
    },
    {
      id: "s3",
      name: "Seasonal Fruit Bowl",
      description: "Local, in-season selection",
      diets: "veg gf halal df",
      allergens: [],
      calories: 120,
    },
  ],
};

const TOOLS = [
  {
    id: "calc",
    name: "Calculator",
    description: "Basic arithmetic & conversions",
    icon: "calc",
    bgColor: "#FFD4B4",
  },
  {
    id: "draw",
    name: "Drawing",
    description: "Sketch & paint tool",
    icon: "draw",
    bgColor: "#E8D5F2",
  },
  {
    id: "sticky",
    name: "Sticky Notes",
    description: "Quick note-taking",
    icon: "note",
    bgColor: "#FFF4D4",
  },
  {
    id: "write",
    name: "Writing",
    description: "Word processor",
    icon: "write",
    bgColor: "#D4E8FF",
  },
  {
    id: "present",
    name: "Presentation",
    description: "Slide builder",
    icon: "slides",
    bgColor: "#A8D5BA",
  },
  {
    id: "graphic",
    name: "Graphic Design",
    description: "Design templates",
    icon: "design",
    bgColor: "#FFD4B4",
  },
  {
    id: "audio",
    name: "Audio",
    description: "Record & edit sound",
    icon: "audio",
    bgColor: "#E8D5F2",
  },
  {
    id: "video",
    name: "Video",
    description: "Video editor",
    icon: "video",
    bgColor: "#D4E8FF",
  },
];

const FILES_MOCK = [
  {
    id: "f1",
    name: "Biology Notes",
    subLabel: "Shared with Mr. Rivera",
    class: "Biology",
    type: "XLS",
    source: "You",
    size: "245 KB",
    updated: "May 8",
    starred: true,
    shared: true,
  },
  {
    id: "f2",
    name: "History Essay",
    subLabel: "Submitted",
    class: "History",
    type: "DOC",
    source: "You",
    size: "156 KB",
    updated: "May 6",
    starred: false,
    shared: false,
  },
  {
    id: "f3",
    name: "Math Problem Set",
    subLabel: "Shared with Ms. Chen",
    class: "Math",
    type: "PDF",
    source: "You",
    size: "324 KB",
    updated: "May 7",
    starred: false,
    shared: true,
  },
  {
    id: "f4",
    name: "Chemistry Lab Report",
    subLabel: "Returned by Dr. Smith",
    class: "Chemistry",
    type: "DOC",
    source: "Dr. Smith",
    size: "412 KB",
    updated: "May 5",
    starred: false,
    shared: false,
  },
  {
    id: "f5",
    name: "Project Presentation",
    subLabel: "Shared with Team",
    class: "English",
    type: "PPT",
    source: "You",
    size: "2.1 MB",
    updated: "May 3",
    starred: true,
    shared: true,
  },
];

const BOOKMARKS = [
  {
    id: "b1",
    url: "https://www.khanacademy.org/science/biology",
    title: "Khan Academy - Biology",
    tags: "Biology Study",
    starred: false,
  },
  {
    id: "b2",
    url: "https://www.wolframalpha.com",
    title: "Wolfram Alpha",
    tags: "Math Science",
    starred: true,
  },
  {
    id: "b3",
    url: "https://www.youtube.com/results?search_query=organic+chemistry",
    title: "Chemistry Tutorials",
    tags: "Chemistry Watch later",
    starred: false,
  },
  {
    id: "b4",
    url: "https://www.sparknotes.com",
    title: "SparkNotes",
    tags: "English Literature Study",
    starred: true,
  },
];

// ============================================================
// MY MENU TAB
// ============================================================

function MenuBanner({ cycleLabel, cycleDate, lunchPeriod, viewToggle, onViewChange }) {
  const views = ["Today", "This week", "Cycle"];
  return (
    <div
      style={{
        background: COLORS.darkGreen,
        borderRadius: 20,
        padding: "40px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 40,
        boxShadow: SOFT_SHADOW,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: COLORS.teal,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          {cycleLabel}
        </div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "white", lineHeight: 1.2 }}>
          {cycleDate}
        </div>
        <div style={{ fontSize: 13, color: "white", opacity: 0.7, marginTop: 6 }}>
          {lunchPeriod}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: 4 }}>
        {views.map((v) => (
          <button
            key={v}
            onClick={() => onViewChange(v.toLowerCase())}
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              border: "none",
              background: viewToggle === v.toLowerCase() ? "rgba(255,255,255,0.2)" : "transparent",
              color: "white",
              fontSize: 13,
              fontWeight: viewToggle === v.toLowerCase() ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

function DietaryFilterChips({ filters, activeFilters, onToggle }) {
  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
      {filters.map((f) => {
        const isActive = activeFilters.includes(f.id);
        return (
          <button
            key={f.id}
            onClick={() => onToggle(f.id)}
            style={{
              padding: "10px 18px",
              borderRadius: 14,
              border: isActive ? "none" : `1px solid ${COLORS.border}`,
              background: isActive ? isActive ? f.color : "transparent" : "transparent",
              color: isActive ? "white" : COLORS.text,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: isActive ? SUBTLE_SHADOW : "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (isActive) {
                e.currentTarget.style.boxShadow = SOFT_SHADOW;
              }
            }}
            onMouseLeave={(e) => {
              if (isActive) {
                e.currentTarget.style.boxShadow = SUBTLE_SHADOW;
              }
            }}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
}

function PlaceholderImage({ size = 60 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: "linear-gradient(135deg, #f5f3f0 0%, #ece9e6 100%)",
        borderRadius: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 28,
        color: COLORS.border,
        border: `1px solid ${COLORS.border}`,
        boxShadow: SUBTLE_SHADOW,
        flexShrink: 0,
      }}
    >
      🍽
    </div>
  );
}

function FullIngredientsModal({ item, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: 32,
          maxWidth: 500,
          width: "90%",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", gap: 24, marginBottom: 28 }}>
          <PlaceholderImage size={110} />
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text, marginBottom: 8 }}>
              {item.name}
            </div>
            <div style={{ fontSize: 14, color: COLORS.text + "80", marginBottom: 12, lineHeight: 1.4 }}>
              {item.description}
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: COLORS.mint }}>
              {item.calories} cal
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
            Ingredients
          </div>
          <div style={{ fontSize: 13, color: COLORS.text + "B3", lineHeight: 1.6 }}>
            {item.ingredients}
          </div>
        </div>

        {item.allergens && item.allergens.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Allergens
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {item.allergens.map((allergen) => (
                <span
                  key={allergen}
                  style={{
                    padding: "5px 12px",
                    borderRadius: 10,
                    background: COLORS.df,
                    color: COLORS.text,
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 14,
            border: "none",
            background: COLORS.mint,
            color: COLORS.text,
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = SOFT_SHADOW;
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

function MenuCard({ item, isSelected, onSelect, onViewIngredients }) {
  return (
    <div
      className="desk-card"
      style={{
        borderRadius: 20,
        border: isSelected ? `2px solid ${COLORS.gold}` : "none",
        background: isSelected ? "#FFFBF0" : COLORS.surface,
        transition: "all 0.2s ease",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Grows to fill — pushes buttons to bottom */}
      <div style={{ flex: 1 }}>
        {/* Top: icon + name/description */}
        <div style={{ display: "flex", gap: 16, padding: "20px 20px 14px 20px", alignItems: "flex-start" }}>
          <div style={{ flexShrink: 0 }}>
            <PlaceholderImage size={64} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, lineHeight: 1.2 }}>
                {item.name}
              </div>
              {isSelected && (
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#7a5200",
                  background: "#FFF0C2",
                  border: "1px solid #FFD700",
                  borderRadius: 20,
                  padding: "2px 8px",
                  whiteSpace: "nowrap",
                }}>
                  + your pick
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: COLORS.text + "99", lineHeight: 1.4 }}>
              {item.description}
            </div>
          </div>
        </div>

        {/* Tags + calories row */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", padding: "0 20px 16px 20px" }}>
          {item.diets.split(" ").map((diet) => {
            const filter = DIETARY_FILTERS.find((f) => f.id === diet);
            return (
              <span
                key={diet}
                style={{
                  padding: "3px 10px",
                  borderRadius: 20,
                  background: filter?.color || "#d9d9d9",
                  color: "white",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                {filter?.label || diet}
              </span>
            );
          })}
          <span style={{
            padding: "3px 10px",
            borderRadius: 20,
            background: "#f3f4f6",
            color: COLORS.text,
            fontSize: 11,
            fontWeight: 600,
          }}>
            {item.calories} kcal
          </span>
          {item.allergens && item.allergens.map((allergen) => (
            <span
              key={allergen}
              style={{
                padding: "3px 10px",
                borderRadius: 20,
                background: "#FFF3CD",
                border: "1px solid #FFD080",
                color: "#7a5200",
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              ⚠ {allergen}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${COLORS.border}` }} />

      {/* Action buttons — always at bottom */}
      <div style={{ display: "flex", alignItems: "center", padding: "12px 20px", gap: 12 }}>
        <button
          onClick={() => onViewIngredients(item.id)}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            color: COLORS.text,
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 12,
            textAlign: "left",
            textDecoration: "underline",
            textUnderlineOffset: 2,
            padding: 0,
          }}
        >
          View full ingredients →
        </button>
        <button
          onClick={() => onSelect(item.id)}
          style={{
            padding: "8px 20px",
            borderRadius: 10,
            border: isSelected ? `1px solid ${COLORS.gold}` : `1px solid ${COLORS.border}`,
            background: isSelected ? "#FFF0C2" : "white",
            color: isSelected ? "#7a5200" : COLORS.text,
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            transition: "all 0.15s ease",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = isSelected ? "#FFE88A" : "#f9fafb"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = isSelected ? "#FFF0C2" : "white"; }}
        >
          {isSelected ? "Keep pick" : "Pick this"}
        </button>
      </div>
    </div>
  );
}

// Week view card — same layout as MenuCard
function CompactMenuCard({ item, isSelected, onSelect, onViewIngredients }) {
  return <MenuCard item={item} isSelected={isSelected} onSelect={onSelect} onViewIngredients={onViewIngredients} />;
}

// Cycle view card — same layout as MenuCard
function CycleMenuCard({ item, isSelected, onSelect, onViewIngredients }) {
  return <MenuCard item={item} isSelected={isSelected} onSelect={onSelect} onViewIngredients={onViewIngredients} />;
}

// This week view - organized by day
function ThisWeekView({ activeFilters, selectedItem, onSelectItem, onViewIngredients }) {
  const getItemData = (itemId) => MENU_ITEMS.find((m) => m.id === itemId);

  const shouldShowItem = (item) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.every((filterId) => item.diets.includes(filterId));
  };

  return (
    <div>
      {WEEK_MENU.map((day) => {
        const dayItems = day.items
          .map((id) => getItemData(id))
          .filter(shouldShowItem);

        return (
          <div key={day.date} style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.text }}>
                  {day.day}
                </div>
                <div style={{ fontSize: 12, color: COLORS.text + "80" }}>
                  {day.date}
                </div>
              </div>
              {day.isToday && (
                <span style={{
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: COLORS.mint,
                  color: "white",
                  fontSize: 10,
                  fontWeight: 600,
                }}>
                  Today
                </span>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 20,
              }}
            >
              {dayItems.length > 0 ? (
                dayItems.map((item) => (
                  <CompactMenuCard
                    key={item.id}
                    item={item}
                    isSelected={selectedItem === item.id}
                    onSelect={onSelectItem}
                    onViewIngredients={onViewIngredients}
                  />
                ))
              ) : (
                <div style={{ gridColumn: "1 / -1", padding: "40px 20px", textAlign: "center", color: COLORS.text + "80" }}>
                  No items match your dietary filters
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Cycle view - organized by category
function CycleView({ activeFilters, selectedItem, onSelectItem, onViewIngredients }) {
  const shouldShowItem = (item) => {
    if (activeFilters.length === 0) return true;
    return activeFilters.every((filterId) => item.diets.includes(filterId));
  };

  const renderCategory = (title, items) => {
    const visibleItems = items.filter(shouldShowItem);

    return (
      <div key={title} style={{ marginBottom: 40 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 16, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {title}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {visibleItems.length > 0 ? (
            visibleItems.map((item) => (
              <CycleMenuCard
                key={item.id}
                item={item}
                isSelected={selectedItem === item.id}
                onSelect={onSelectItem}
                onViewIngredients={onViewIngredients}
              />
            ))
          ) : (
            <div style={{ gridColumn: "1 / -1", padding: "30px 20px", textAlign: "center", color: COLORS.text + "80", fontSize: 13 }}>
              No items match your dietary filters
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderCategory("Rotating Proteins", CYCLE_MENU.proteins)}
      {renderCategory("Seasonal Vegetables", CYCLE_MENU.vegetables)}
      {renderCategory("Always Available", CYCLE_MENU.staples)}
    </div>
  );
}

function MyMenuPage({ selectedItem, onSelectItem }) {
  const [viewMode, setViewMode] = React.useState("today");
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [showIngredientsModal, setShowIngredientsModal] = React.useState(false);
  const [modalItem, setModalItem] = React.useState(null);
  const [localSelectedItem, setLocalSelectedItem] = React.useState(selectedItem);

  const toggleFilter = (filterId) => {
    setActiveFilters((prev) =>
      prev.includes(filterId) ? prev.filter((f) => f !== filterId) : [...prev, filterId]
    );
  };

  const handleSelectItem = (itemId) => {
    if (localSelectedItem === itemId) {
      setLocalSelectedItem(null);
      onSelectItem(null);
    } else {
      setLocalSelectedItem(itemId);
      onSelectItem(itemId);
    }
  };

  const handleViewIngredients = (itemId) => {
    const item = MENU_ITEMS.find((m) => m.id === itemId);
    setModalItem(item);
    setShowIngredientsModal(true);
  };

  const filteredItems =
    activeFilters.length === 0
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) =>
          activeFilters.every((filterId) => item.diets.includes(filterId))
        );

  return (
    <div>
      <MenuBanner
        cycleLabel="Cycle A"
        cycleDate="May 8, 2026"
        lunchPeriod="12:00 PM - 1:00 PM"
        viewToggle={viewMode}
        onViewChange={setViewMode}
      />
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: COLORS.text }}>
          Filter by dietary needs:
        </div>
        <DietaryFilterChips
          filters={DIETARY_FILTERS}
          activeFilters={activeFilters}
          onToggle={toggleFilter}
        />
      </div>

      {viewMode === "today" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {filteredItems.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              isSelected={localSelectedItem === item.id}
              onSelect={handleSelectItem}
              onViewIngredients={handleViewIngredients}
            />
          ))}
        </div>
      )}

      {viewMode === "this week" && (
        <ThisWeekView
          activeFilters={activeFilters}
          selectedItem={localSelectedItem}
          onSelectItem={handleSelectItem}
          onViewIngredients={handleViewIngredients}
        />
      )}

      {viewMode === "cycle" && (
        <CycleView
          activeFilters={activeFilters}
          selectedItem={localSelectedItem}
          onSelectItem={handleSelectItem}
          onViewIngredients={handleViewIngredients}
        />
      )}

      {modalItem && (
        <FullIngredientsModal
          item={modalItem}
          isOpen={showIngredientsModal}
          onClose={() => setShowIngredientsModal(false)}
        />
      )}
    </div>
  );
}

// ============================================================
// MY TOOLS TAB
// ============================================================

function IconCalc() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="28" height="28" rx="4" stroke={COLORS.text} strokeWidth="2"/>
      <circle cx="12" cy="12" r="1.5" fill={COLORS.text}/>
      <circle cx="20" cy="12" r="1.5" fill={COLORS.text}/>
      <line x1="10" y1="20" x2="30" y2="20" stroke={COLORS.text} strokeWidth="2"/>
      <line x1="20" y1="26" x2="20" y2="34" stroke={COLORS.text} strokeWidth="2"/>
    </svg>
  );
}

function IconDraw() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32L28 12M32 8L28 12M28 12L32 16" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="24" cy="24" r="12" stroke={COLORS.text} strokeWidth="2"/>
    </svg>
  );
}

function IconNote() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="6" width="18" height="22" rx="2" stroke={COLORS.text} strokeWidth="2"/>
      <line x1="12" y1="12" x2="22" y2="12" stroke={COLORS.text} strokeWidth="1.5"/>
      <line x1="12" y1="16" x2="22" y2="16" stroke={COLORS.text} strokeWidth="1.5"/>
      <line x1="12" y1="20" x2="20" y2="20" stroke={COLORS.text} strokeWidth="1.5"/>
    </svg>
  );
}

function IconWrite() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="28" height="24" rx="2" stroke={COLORS.text} strokeWidth="2"/>
      <line x1="10" y1="14" x2="30" y2="14" stroke={COLORS.text} strokeWidth="1.5"/>
      <line x1="10" y1="18" x2="30" y2="18" stroke={COLORS.text} strokeWidth="1.5"/>
      <line x1="10" y1="22" x2="24" y2="22" stroke={COLORS.text} strokeWidth="1.5"/>
    </svg>
  );
}

function IconSlides() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="28" height="20" rx="2" stroke={COLORS.text} strokeWidth="2"/>
      <rect x="9" y="30" width="8" height="4" rx="1" stroke={COLORS.text} strokeWidth="1.5"/>
      <rect x="20" y="30" width="8" height="4" rx="1" stroke={COLORS.text} strokeWidth="1.5"/>
    </svg>
  );
}

function IconDesign() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" stroke={COLORS.text} strokeWidth="2"/>
      <circle cx="28" cy="12" r="5" stroke={COLORS.text} strokeWidth="2"/>
      <circle cx="12" cy="28" r="5" stroke={COLORS.text} strokeWidth="2"/>
      <circle cx="28" cy="28" r="5" stroke={COLORS.text} strokeWidth="2"/>
    </svg>
  );
}

function IconAudio() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="10" stroke={COLORS.text} strokeWidth="2"/>
      <circle cx="20" cy="20" r="3" fill={COLORS.text}/>
      <path d="M26 20C26 23.3137 23.3137 26 20 26" stroke={COLORS.text} strokeWidth="1.5"/>
    </svg>
  );
}

function IconVideo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="10" width="28" height="18" rx="2" stroke={COLORS.text} strokeWidth="2"/>
      <polygon points="16,16 16,24 25,20" fill={COLORS.text}/>
    </svg>
  );
}

const ICON_COMPONENTS = {
  calc: IconCalc,
  draw: IconDraw,
  note: IconNote,
  write: IconWrite,
  slides: IconSlides,
  design: IconDesign,
  audio: IconAudio,
  video: IconVideo,
};

const FAV_TOOLS_KEY = "links_fav_tools";

function ToolCard({ tool, isFav, onToggleFav }) {
  const IconComponent = ICON_COMPONENTS[tool.icon];
  return (
    <button
      style={{
        padding: 24,
        borderRadius: 20,
        border: "none",
        background: tool.bgColor,
        cursor: "pointer",
        textAlign: "center",
        transition: "all 0.3s ease",
        boxShadow: SUBTLE_SHADOW,
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = SOFT_SHADOW;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = SUBTLE_SHADOW;
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {onToggleFav && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
          title={isFav ? "Remove from toolbar" : "Pin to toolbar"}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            width: 26,
            height: 26,
            borderRadius: "50%",
            border: "none",
            background: isFav ? COLORS.gold : "rgba(0,0,0,0.08)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            lineHeight: 1,
            transition: "all 0.15s ease",
            padding: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
        >
          {isFav ? "★" : "☆"}
        </button>
      )}
      <div style={{ marginBottom: 12 }}>
        {IconComponent ? <IconComponent /> : <div>{tool.icon}</div>}
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
        {tool.name}
      </div>
      <div style={{ fontSize: 12, color: COLORS.text + "B3" }}>{tool.description}</div>
    </button>
  );
}

function MyToolsPage({ standalone }) {
  const [favIds, setFavIds] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem(FAV_TOOLS_KEY) || "[]"); } catch { return []; }
  });

  const toggleFav = (id) => {
    setFavIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try { localStorage.setItem(FAV_TOOLS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const sorted = [
    ...TOOLS.filter((t) => favIds.includes(t.id)),
    ...TOOLS.filter((t) => !favIds.includes(t.id)),
  ];

  const content = (
    <div>
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, marginBottom: 6 }}>
          My Tools
        </div>
        <div style={{ fontSize: 14, color: COLORS.textMuted, maxWidth: 520 }}>
          Quick access to your learning apps. Star your favourites to pin them to the toolbar — they'll always be one click away, no matter which page you're on.
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: 28,
        }}
      >
        {sorted.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            isFav={favIds.includes(tool.id)}
            onToggleFav={() => toggleFav(tool.id)}
          />
        ))}
      </div>
    </div>
  );

  if (standalone) {
    return (
      <div style={{ padding: "32px 40px 80px", maxWidth: 1200, fontFamily: "Nunito, Poppins, 'Segoe UI', sans-serif" }}>
        {content}
      </div>
    );
  }
  return content;
}

// ============================================================
// FILES TAB
// ============================================================

function FileToolbar({ selectedSubTab, onSubTabChange, onUploadClick }) {
  const subTabs = ["All", "Your uploads", "Teacher uploads", "Shared", "Starred"];
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 32,
      }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        {subTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onSubTabChange(tab)}
            style={{
              padding: "10px 18px",
              borderRadius: 14,
              border: "none",
              background: selectedSubTab === tab ? "white" : "transparent",
              color: COLORS.text,
              fontSize: 13,
              fontWeight: selectedSubTab === tab ? 600 : 500,
              cursor: "pointer",
              boxShadow: selectedSubTab === tab ? SUBTLE_SHADOW : "none",
              transition: "all 0.2s ease",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <button
        onClick={onUploadClick}
        style={{
          padding: "10px 20px",
          borderRadius: 14,
          border: "none",
          background: COLORS.mint,
          color: COLORS.text,
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: SUBTLE_SHADOW,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = SOFT_SHADOW;
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = SUBTLE_SHADOW;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Upload file
      </button>
    </div>
  );
}

function FileActionMenu({ fileId }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const actions = [
    { label: "Download", icon: "↓" },
    { label: "Share", icon: "⬤" },
    { label: "Rename", icon: "✎" },
    { label: "Delete", icon: "🗑" },
  ];

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 16,
          padding: "4px 8px",
          color: COLORS.text,
        }}
      >
        ···
      </button>
      {isOpen && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 28,
            background: "white",
            border: `1px solid ${COLORS.border}`,
            borderRadius: 14,
            boxShadow: SOFT_SHADOW,
            zIndex: 100,
            minWidth: 140,
            overflow: "hidden",
          }}
        >
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "none",
                background: "transparent",
                textAlign: "left",
                color: COLORS.text,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                borderBottom: idx < actions.length - 1 ? `1px solid ${COLORS.border}` : "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = COLORS.bg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function FileTable({ files }) {
  const getFileColor = (type) => {
    const colors = {
      XLS: COLORS.fileXLS,
      PDF: COLORS.filePDF,
      PPT: COLORS.filePPT,
      DOC: COLORS.fileDOC,
    };
    return colors[type] || "#ccc";
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${COLORS.border}`, background: COLORS.bg }}>

            <th style={{ padding: 16, textAlign: "left", color: COLORS.text, fontWeight: 600, fontSize: 12 }}>
              Name
            </th>
            <th style={{ padding: 16, textAlign: "left", color: COLORS.text, fontWeight: 600, fontSize: 12 }}>
              Class
            </th>
            <th style={{ padding: 16, textAlign: "left", color: COLORS.text, fontWeight: 600, fontSize: 12 }}>
              Source
            </th>
            <th style={{ padding: 16, textAlign: "left", color: COLORS.text, fontWeight: 600, fontSize: 12 }}>
              Size
            </th>
            <th style={{ padding: 16, textAlign: "left", color: COLORS.text, fontWeight: 600, fontSize: 12 }}>
              Updated
            </th>
            <th style={{ padding: 16, textAlign: "center", color: COLORS.text, fontWeight: 600, fontSize: 12 }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file.id} style={{ borderBottom: `1px solid ${COLORS.border}`, transition: "background 0.2s ease" }} onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.bg; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}>
              <td style={{ padding: 16 }}>
                <div style={{ fontWeight: 600, color: COLORS.text }}>{file.name}</div>
                <div style={{ fontSize: 11, color: COLORS.text + "80" }}>{file.subLabel}</div>
              </td>
              <td style={{ padding: 16, color: COLORS.text }}>{file.class}</td>
              <td style={{ padding: 16, color: COLORS.text }}>{file.source}</td>
              <td style={{ padding: 16, color: COLORS.text }}>{file.size}</td>
              <td style={{ padding: 16, color: COLORS.text }}>{file.updated}</td>
              <td style={{ padding: 16, textAlign: "center" }}>
                <FileActionMenu fileId={file.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UploadModal({ isOpen, onClose, onFileSelect }) {
  const [selectedFile, setSelectedFile] = React.useState(null);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0, 0, 0, 0.15)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "white",
          borderRadius: 24,
          padding: 32,
          maxWidth: 500,
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 12px 32px rgba(0, 0, 0, 0.08)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 28, color: COLORS.text }}>
          Upload file
        </div>

        <div
          style={{
            border: `2px dashed ${COLORS.border}`,
            borderRadius: 16,
            padding: 40,
            textAlign: "center",
            marginBottom: 24,
            cursor: "pointer",
            background: COLORS.bg,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = COLORS.mint;
            e.currentTarget.style.background = "rgba(184, 223, 209, 0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = COLORS.border;
            e.currentTarget.style.background = COLORS.bg;
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>☁️</div>
          <div style={{ fontSize: 12, color: COLORS.text, fontWeight: 600 }}>
            Drag and drop files here
          </div>
          <div style={{ fontSize: 11, color: COLORS.text + "B3", marginTop: 4 }}>
            or click to select
          </div>
        </div>

        {selectedFile && (
          <div
            style={{
              background: COLORS.bg,
              padding: 18,
              borderRadius: 14,
              marginBottom: 24,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 600, color: COLORS.text }}>{selectedFile}</div>
                <div style={{ fontSize: 11, color: COLORS.text + "B3", marginTop: 4 }}>
                  250 KB
                </div>
              </div>
              <button
                onClick={() => setSelectedFile(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, display: "block", marginBottom: 10 }}>
            Class
          </label>
          <select
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
              fontSize: 13,
              background: "white",
              color: COLORS.text,
              transition: "border 0.2s ease",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.mint;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
            }}
          >
            <option>Select a class</option>
            <option>Biology</option>
            <option>History</option>
            <option>Math</option>
            <option>Chemistry</option>
            <option>English</option>
          </select>
        </div>

        <div style={{ marginBottom: 28 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.text,
              display: "block",
              marginBottom: 10,
            }}
          >
            Note (optional)
          </label>
          <textarea
            placeholder="Add a note about this file..."
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 12,
              border: `1px solid ${COLORS.border}`,
              fontSize: 13,
              minHeight: 80,
              fontFamily: "inherit",
              color: COLORS.text,
              transition: "border 0.2s ease",
              resize: "vertical",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = COLORS.mint;
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
            }}
          />
        </div>

        <div style={{ display: "flex", gap: 14, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: 14,
              border: `1px solid ${COLORS.border}`,
              background: "transparent",
              color: COLORS.text,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = COLORS.bg;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedFile) {
                onFileSelect(selectedFile);
                setSelectedFile(null);
                onClose();
              }
            }}
            style={{
              padding: "12px 24px",
              borderRadius: 14,
              border: "none",
              background: selectedFile ? COLORS.mint : "#d9d9d9",
              color: COLORS.text,
              fontSize: 13,
              fontWeight: 600,
              cursor: selectedFile ? "pointer" : "not-allowed",
              boxShadow: selectedFile ? SUBTLE_SHADOW : "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (selectedFile) {
                e.currentTarget.style.boxShadow = SOFT_SHADOW;
                e.currentTarget.style.transform = "translateY(-1px)";
              }
            }}
            onMouseLeave={(e) => {
              if (selectedFile) {
                e.currentTarget.style.boxShadow = SUBTLE_SHADOW;
                e.currentTarget.style.transform = "translateY(0)";
              }
            }}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

function MyFilesPage() {
  const [selectedSubTab, setSelectedSubTab] = React.useState("All");
  const [showUploadModal, setShowUploadModal] = React.useState(false);
  const [files, setFiles] = React.useState(FILES_MOCK);

  const handleFileUpload = (fileName) => {
    setFiles([
      ...files,
      {
        id: `f${files.length + 1}`,
        name: fileName,
        subLabel: "Just uploaded",
        class: "General",
        type: "PDF",
        source: "You",
        size: "250 KB",
        updated: "Now",
        starred: false,
        shared: false,
      },
    ]);
  };

  const filteredFiles = React.useMemo(() => {
    switch (selectedSubTab) {
      case "Your uploads":
        return files.filter((f) => f.source === "You");
      case "Teacher uploads":
        return files.filter((f) => f.source !== "You");
      case "Shared":
        return files.filter((f) => f.shared);
      case "Starred":
        return files.filter((f) => f.starred);
      default:
        return files;
    }
  }, [files, selectedSubTab]);

  return (
    <div className="desk-card" style={{ borderRadius: 20, overflow: "hidden" }}>
      <FileToolbar
        selectedSubTab={selectedSubTab}
        onSubTabChange={setSelectedSubTab}
        onUploadClick={() => setShowUploadModal(true)}
      />
      <FileTable files={filteredFiles} />
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onFileSelect={handleFileUpload}
      />
    </div>
  );
}

// ============================================================
// BOOKMARKS TAB
// ============================================================

function BookmarkInput({ onAdd }) {
  const [url, setUrl] = React.useState("");

  const handleAdd = () => {
    if (url.trim()) {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
      onAdd({
        url,
        title: urlObj.hostname.replace("www.", ""),
      });
      setUrl("");
    }
  };

  return (
    <div style={{ display: "flex", gap: 14, marginBottom: 28 }}>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAdd()}
        placeholder="Paste URL here..."
        style={{
          flex: 1,
          padding: "12px 16px",
          borderRadius: 14,
          border: `1px solid ${COLORS.border}`,
          fontSize: 13,
          transition: "border 0.2s ease",
          color: COLORS.text,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = COLORS.mint;
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = COLORS.border;
        }}
      />
      <button
        onClick={handleAdd}
        style={{
          padding: "12px 24px",
          borderRadius: 14,
          border: "none",
          background: COLORS.mint,
          color: COLORS.text,
          fontWeight: 600,
          fontSize: 13,
          cursor: "pointer",
          boxShadow: SUBTLE_SHADOW,
          transition: "all 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = SOFT_SHADOW;
          e.currentTarget.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = SUBTLE_SHADOW;
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        Save
      </button>
    </div>
  );
}

function BookmarkFilterChips({ tags, activeFilters, onToggle }) {
  const allTags = [
    ...new Set(tags.flatMap((b) => b.tags.split(" "))),
  ];

  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
      {allTags.map((tag) => {
        const isActive = activeFilters.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            style={{
              padding: "8px 16px",
              borderRadius: 12,
              border: isActive ? "none" : `1px solid ${COLORS.border}`,
              background: isActive ? COLORS.mint : "transparent",
              color: isActive ? COLORS.text : COLORS.text,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: isActive ? SUBTLE_SHADOW : "none",
            }}
            onMouseEnter={(e) => {
              if (isActive) {
                e.currentTarget.style.boxShadow = SOFT_SHADOW;
              }
            }}
            onMouseLeave={(e) => {
              if (isActive) {
                e.currentTarget.style.boxShadow = SUBTLE_SHADOW;
              }
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}

function BookmarkCard({ bookmark, isStarred, onToggleStar, onDelete }) {
  return (
    <div
      className="desk-card"
      style={{
        padding: 20,
        borderRadius: 20,
        background: isStarred ? "#FFF8F5" : COLORS.surface,
        borderLeft: isStarred ? `4px solid ${COLORS.coral}` : "none",
        paddingLeft: isStarred ? 16 : 20,
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ fontSize: 20 }}>🔖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>
            {bookmark.title}
          </div>
          <div
            style={{
              fontSize: 11,
              color: COLORS.text + "B3",
              marginBottom: 12,
              wordBreak: "break-all",
            }}
          >
            {bookmark.url}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {bookmark.tags.split(" ").map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "5px 12px",
                  borderRadius: 10,
                  background: COLORS.mint,
                  color: COLORS.text,
                  fontSize: 11,
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => onToggleStar()}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            {isStarred ? "⭐" : "☆"}
          </button>
          <button
            onClick={() => onDelete()}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            🗑
          </button>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ↗
          </a>
        </div>
      </div>
    </div>
  );
}

function MyBookmarksPage() {
  const [bookmarks, setBookmarks] = React.useState(BOOKMARKS);
  const [activeFilters, setActiveFilters] = React.useState([]);
  const [starredIds, setStarredIds] = React.useState(
    new Set(bookmarks.filter((b) => b.starred).map((b) => b.id))
  );

  const toggleFilter = (tag) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleStar = (id) => {
    const newStarred = new Set(starredIds);
    if (newStarred.has(id)) {
      newStarred.delete(id);
    } else {
      newStarred.add(id);
    }
    setStarredIds(newStarred);
  };

  const deleteBookmark = (id) => {
    setBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const addBookmark = ({ url, title }) => {
    setBookmarks([
      {
        id: `b${bookmarks.length + 1}`,
        url,
        title,
        tags: "New",
        starred: false,
      },
      ...bookmarks,
    ]);
  };

  const filteredBookmarks =
    activeFilters.length === 0
      ? bookmarks
      : bookmarks.filter((bookmark) =>
          activeFilters.some((filter) =>
            bookmark.tags.split(" ").includes(filter)
          )
        );

  return (
    <div>
      <BookmarkInput onAdd={addBookmark} />
      <BookmarkFilterChips
        tags={bookmarks}
        activeFilters={activeFilters}
        onToggle={toggleFilter}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {filteredBookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            isStarred={starredIds.has(bookmark.id)}
            onToggleStar={() => toggleStar(bookmark.id)}
            onDelete={() => deleteBookmark(bookmark.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// OVERVIEW TAB
// ============================================================

function HeroIllustration() {
  return (
    <svg width="240" height="170" viewBox="0 0 240 170" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Desk surface */}
      <rect x="20" y="128" width="200" height="14" rx="7" fill="#D4C5F9" opacity="0.7"/>
      {/* Monitor body */}
      <rect x="72" y="62" width="96" height="62" rx="10" fill="#B8D9FF"/>
      <rect x="79" y="69" width="82" height="46" rx="6" fill="white" opacity="0.85"/>
      {/* Code lines on screen */}
      <rect x="85" y="76" width="45" height="4" rx="2" fill="#D4C5F9"/>
      <rect x="85" y="84" width="30" height="4" rx="2" fill="#A8E6CF"/>
      <rect x="85" y="92" width="55" height="4" rx="2" fill="#FFB5A7" opacity="0.7"/>
      <rect x="85" y="100" width="38" height="4" rx="2" fill="#D4C5F9" opacity="0.5"/>
      {/* Monitor stand */}
      <rect x="112" y="124" width="16" height="6" rx="3" fill="#B8D9FF"/>
      <rect x="104" y="129" width="32" height="5" rx="2.5" fill="#B8D9FF" opacity="0.7"/>
      {/* Character — body */}
      <ellipse cx="46" cy="112" rx="18" ry="20" fill="#FFB5A7"/>
      {/* Character — head */}
      <circle cx="46" cy="87" r="18" fill="#FFCBA4"/>
      {/* Character — hair */}
      <path d="M28 83 Q28 66 46 66 Q64 66 64 83 Q60 75 46 73 Q32 75 28 83Z" fill="#5C3D2E"/>
      {/* Character — eyes */}
      <circle cx="40" cy="87" r="2.5" fill="#25253A"/>
      <circle cx="52" cy="87" r="2.5" fill="#25253A"/>
      {/* Character — smile */}
      <path d="M40 94 Q46 99 52 94" stroke="#C0785A" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Book stack */}
      <rect x="170" y="115" width="38" height="9" rx="4" fill="#A8E6CF"/>
      <rect x="173" y="107" width="32" height="9" rx="4" fill="#FFB5A7"/>
      <rect x="176" y="99" width="26" height="9" rx="4" fill="#D4C5F9"/>
      {/* Floating sparkles */}
      <circle cx="168" cy="52" r="5" fill="#FFE8A3" opacity="0.9"/>
      <circle cx="22" cy="100" r="4" fill="#A8E6CF" opacity="0.7"/>
      <circle cx="205" cy="70" r="3.5" fill="#FFB5A7" opacity="0.8"/>
      <circle cx="190" cy="44" r="6" fill="#D4C5F9" opacity="0.6"/>
      {/* Small star */}
      <path d="M155 40 L157 45 L162 45 L158 48 L160 53 L155 50 L150 53 L152 48 L148 45 L153 45Z" fill="#FFE8A3"/>
    </svg>
  );
}

function DeskHeroCard() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #D4C5F9 0%, #A8E6CF 100%)",
      borderRadius: 24,
      padding: "36px 48px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: CARD_SHADOW,
      position: "relative",
      overflow: "hidden",
      marginBottom: 0,
    }}>
      {/* Decorative background blob */}
      <div style={{
        position: "absolute", right: 200, top: -40,
        width: 200, height: 200, borderRadius: "50%",
        background: "rgba(255,255,255,0.15)", pointerEvents: "none",
      }}/>
      {/* Left: greeting + stats */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#5a4a8a", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>
          Wednesday · May 13
        </div>
        <div style={{ fontSize: 34, fontWeight: 900, color: "#25253A", lineHeight: 1.2, marginBottom: 8, fontFamily: "Nunito, Poppins, sans-serif" }}>
          Good morning, Alex! 👋
        </div>
        <div style={{ fontSize: 15, color: "#5a5070", marginBottom: 28 }}>
          Your workspace is all set — let's have a great day.
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "Due this week", value: "3" },
            { label: "Classes today", value: "4" },
            { label: "Saved bookmarks", value: "4" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(8px)",
              borderRadius: 16,
              padding: "14px 22px",
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#25253A", lineHeight: 1, fontFamily: "Nunito, Poppins, sans-serif" }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "#6b6080", marginTop: 4, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Right: illustration — slightly overflows card bottom */}
      <div style={{ position: "relative", zIndex: 1, marginRight: -8, marginBottom: -36, alignSelf: "flex-end" }}>
        <HeroIllustration />
      </div>
    </div>
  );
}

// Shared card shell used by all four overview cards
function OverviewCard({ iconBg, iconColor, iconName, title, linkLabel, onLinkClick, children }) {
  return (
    <div className="desk-card" style={{
      background: COLORS.surface,
      borderRadius: 20,
      overflow: "hidden",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 16px 10px 16px",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: iconBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}>
            <I.Icon name={iconName} size={14} color={iconColor} strokeWidth={2} />
          </div>
          <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{title}</span>
        </div>
        <button
          onClick={onLinkClick}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            color: "#0c447c",
            padding: 0,
            fontWeight: 500,
          }}
        >
          {linkLabel}
        </button>
      </div>
      {/* Divider */}
      <div style={{ borderTop: "1px solid #f3f4f6", margin: "0 16px", flexShrink: 0 }} />
      {/* Body — grows to fill remaining card height */}
      <div style={{ padding: "12px 16px 14px 16px", flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}

// Today's menu card — with Today / This week / Cycle tabs
function OverviewMenuCard({ selectedItem, onSwitchTab }) {
  const [menuView, setMenuView] = React.useState("today");

  const dietAbbr = { veg: "Veg", gf: "GF", halal: "Halal", df: "DF" };
  const dietColor = { veg: COLORS.veg, gf: COLORS.gf, halal: "#0e7a5c", df: COLORS.df };

  const todayEntry = WEEK_MENU.find((d) => d.isToday) || WEEK_MENU[0];
  const todayItems = todayEntry.items
    .map((id) => MENU_ITEMS.find((m) => m.id === id))
    .filter(Boolean);

  function DietTags({ diets }) {
    return (
      <div style={{ display: "flex", gap: 4, alignItems: "center", flexShrink: 0 }}>
        {diets.split(" ").filter((d) => dietAbbr[d]).map((d) => (
          <span key={d} style={{
            padding: "1px 6px", borderRadius: 20,
            background: dietColor[d] || "#d9d9d9", color: "white",
            fontSize: 10, fontWeight: 700,
          }}>{dietAbbr[d]}</span>
        ))}
      </div>
    );
  }

  function ItemRow({ item, isLast }) {
    const isPicked = selectedItem === item.id;
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "7px 0",
        borderBottom: isLast ? "none" : "0.5px solid #e5e7eb",
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
          background: isPicked ? "#d4a847" : "#b4b2a9",
        }} />
        <span style={{
          flex: 1, fontSize: 12, fontWeight: 500, color: COLORS.text,
          minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>{item.name}</span>
        <DietTags diets={item.diets} />
        {isPicked && (
          <span style={{ fontSize: 10, fontWeight: 600, color: "#854f0b", marginLeft: 2, whiteSpace: "nowrap" }}>
            Your pick
          </span>
        )}
      </div>
    );
  }

  const menuViews = ["today", "this week", "cycle"];

  return (
    <OverviewCard
      iconBg={COLORS.darkGreen}
      iconColor={COLORS.teal}
      iconName="Utensils"
      title="Today's Menu"
      linkLabel="See full menu →"
      onLinkClick={() => onSwitchTab("my-menu")}
    >
      {/* View tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
        {menuViews.map((v) => (
          <button
            key={v}
            onClick={() => setMenuView(v)}
            style={{
              padding: "4px 12px", borderRadius: 20, border: "none", cursor: "pointer",
              fontSize: 11, fontWeight: 600,
              background: menuView === v ? COLORS.darkGreen : "#f3f4f6",
              color: menuView === v ? "white" : "#6b7280",
              transition: "all 0.15s",
              textTransform: "capitalize",
            }}
          >{v === "today" ? "Today" : v === "this week" ? "This week" : "Cycle"}</button>
        ))}
      </div>

      {/* Scrollable content area — grows to fill card, never resizes on tab switch */}
      <div style={{ flex: 1, minHeight: 0, overflowY: "auto", overflowX: "hidden" }}>

        {/* TODAY */}
        {menuView === "today" && (
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              background: COLORS.darkGreen, color: COLORS.teal,
              borderRadius: 20, padding: "3px 10px",
              fontSize: 11, fontWeight: 600, marginBottom: 10,
            }}>
              <I.Icon name="Clock" size={11} color={COLORS.teal} strokeWidth={2} />
              5th period · 12:25 – 12:55 PM
            </div>
            {todayItems.map((item, i) => (
              <ItemRow key={item.id} item={item} isLast={i === todayItems.length - 1} />
            ))}
          </div>
        )}

        {/* THIS WEEK */}
        {menuView === "this week" && (
          <div>
            {WEEK_MENU.map((day, di) => {
              const items = day.items.map((id) => MENU_ITEMS.find((m) => m.id === id)).filter(Boolean);
              return (
                <div key={day.date} style={{
                  display: "flex", alignItems: "flex-start", gap: 12,
                  padding: "7px 0",
                  borderBottom: di === WEEK_MENU.length - 1 ? "none" : "0.5px solid #e5e7eb",
                }}>
                  <div style={{ minWidth: 76, flexShrink: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text, display: "flex", alignItems: "center", gap: 5 }}>
                      {day.day.slice(0, 3)}
                      {day.isToday && (
                        <span style={{
                          fontSize: 9, fontWeight: 700, background: COLORS.teal,
                          color: COLORS.darkGreen, borderRadius: 20, padding: "1px 5px",
                        }}>Today</span>
                      )}
                    </div>
                    <div style={{ fontSize: 10, color: "#9ca3af" }}>{day.date.split(",")[0]}</div>
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
                    {items.map((item) => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{
                          width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                          background: selectedItem === item.id ? "#d4a847" : "#d1d5db",
                        }} />
                        <span style={{ fontSize: 11, color: COLORS.text, flex: 1,
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.name}
                        </span>
                        <DietTags diets={item.diets} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CYCLE */}
        {menuView === "cycle" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Proteins", items: CYCLE_MENU.proteins },
              { label: "Vegetables", items: CYCLE_MENU.vegetables },
              { label: "Staples", items: CYCLE_MENU.staples },
            ].map(({ label, items }) => (
              <div key={label}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: "#9ca3af",
                  textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5,
                }}>{label}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  {items.map((item, i) => (
                    <div key={item.id} style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "5px 0",
                      borderBottom: i === items.length - 1 ? "none" : "0.5px solid #f3f4f6",
                    }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                        background: selectedItem === item.id ? "#d4a847" : "#d1d5db",
                      }} />
                      <span style={{ flex: 1, fontSize: 11, color: COLORS.text,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name}
                      </span>
                      <span style={{ fontSize: 10, color: "#9ca3af" }}>{item.calories} kcal</span>
                      <DietTags diets={item.diets} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </OverviewCard>
  );
}

// Tools card — full-width single row of all 8 tools
function OverviewToolsCard({ onSwitchTab }) {
  const toolIconMap = {
    calc: { name: "Calculator", color: "#d97706" },
    draw: { name: "Pencil", color: "#2563eb" },
    note: { name: "FileText", color: "#d97706" },
    write: { name: "AlignLeft", color: "#0284c7" },
    slides: { name: "Monitor", color: "#7c3aed" },
    design: { name: "Palette", color: "#0d9488" },
    audio: { name: "Mic", color: "#db2777" },
    video: { name: "Video", color: "#6b7280" },
  };

  return (
    <OverviewCard
      iconBg="#e6f1fb"
      iconColor="#2563eb"
      iconName="Wrench"
      title="My Tools"
      linkLabel="See all tools →"
      onLinkClick={() => onSwitchTab("my-tools")}
    >
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gap: 10,
      }}>
        {TOOLS.map((tool) => {
          const ic = toolIconMap[tool.icon] || { name: "Box", color: "#6b7280" };
          return (
            <div key={tool.id} style={{
              background: "#f9fafb",
              borderRadius: 10,
              padding: "12px 8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: tool.bgColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <I.Icon name={ic.name} size={16} color={ic.color} strokeWidth={2} />
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.text, lineHeight: 1.2 }}>
                  {tool.name}
                </div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2, lineHeight: 1.3 }}>
                  {tool.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </OverviewCard>
  );
}

// Files card — full-width, all 5 files in a table layout + storage bar
function OverviewFilesCard({ onSwitchTab }) {
  const [openMenu, setOpenMenu] = React.useState(null);

  React.useEffect(() => {
    if (openMenu === null) return;
    const close = () => setOpenMenu(null);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [openMenu]);

  const fileTypeMeta = {
    XLS: { bg: COLORS.fileXLS, color: "white" },
    PDF: { bg: "#e8422a", color: "white" },
    PPT: { bg: COLORS.filePPT, color: "white" },
    DOC: { bg: COLORS.fileDOC, color: "white" },
  };

  const classPillColors = {
    Biology: { bg: "#d1fae5", color: "#065f46" },
    History: { bg: "#fce7f3", color: "#9d174d" },
    Math: { bg: "#dbeafe", color: "#1e40af" },
    Chemistry: { bg: "#ede9fe", color: "#5b21b6" },
    English: { bg: "#fef9c3", color: "#854d0e" },
  };

  const storageUsedMB = 190;
  const storageTotalMB = 500;
  const storagePct = (storageUsedMB / storageTotalMB) * 100;

  const dropdownItems = [
    { icon: "Download", label: "Download", red: false },
    { icon: "Share2", label: "Share", red: false },
    { icon: "Pencil", label: "Rename", red: false },
    { icon: "Star", label: "Star", red: false },
    { divider: true },
    { icon: "Trash2", label: "Delete", red: true },
  ];

  // Column header row
  const colHeader = (label, flex, extra = {}) => (
    <div style={{ flex, fontSize: 10, fontWeight: 600, color: "#9ca3af",
      textTransform: "uppercase", letterSpacing: 0.5, ...extra }}>
      {label}
    </div>
  );

  return (
    <OverviewCard
      iconBg="#eeedfe"
      iconColor="#7c3aed"
      iconName="FolderOpen"
      title="Files"
      linkLabel="See all files →"
      onLinkClick={() => onSwitchTab("files")}
    >
      {/* Column headers */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 6,
        borderBottom: "0.5px solid #e5e7eb", marginBottom: 2 }}>
        {colHeader("Name", 3)}
        {colHeader("Class", 1.2)}
        {colHeader("Source", 1)}
        {colHeader("Size", 0.8)}
        {colHeader("Updated", 0.8)}
        <div style={{ width: 56, flexShrink: 0 }} />
      </div>

      {/* File rows */}
      {FILES_MOCK.map((file, i) => {
        const typeMeta = fileTypeMeta[file.type] || { bg: "#9ca3af", color: "white" };
        const isLast = i === FILES_MOCK.length - 1;
        const isOpen = openMenu === file.id;
        const cc = classPillColors[file.class] || { bg: "#f3f4f6", color: "#374151" };

        return (
          <div
            key={file.id}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "8px 0",
              borderBottom: isLast ? "none" : "0.5px solid #f3f4f6",
              position: "relative",
            }}
          >
            {/* Name col */}
            <div style={{ flex: 3, display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6,
                background: typeMeta.bg, color: typeMeta.color,
                fontSize: 9, fontWeight: 700, flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>{file.type}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.text,
                  overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {file.name}
                </div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>{file.subLabel}</div>
              </div>
            </div>

            {/* Class */}
            <div style={{ flex: 1.2 }}>
              <span style={{ padding: "2px 8px", borderRadius: 20,
                background: cc.bg, color: cc.color, fontSize: 10, fontWeight: 600 }}>
                {file.class}
              </span>
            </div>

            {/* Source */}
            <div style={{ flex: 1, fontSize: 12, color: "#6b7280",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {file.source}
            </div>

            {/* Size */}
            <div style={{ flex: 0.8, fontSize: 12, color: "#6b7280" }}>{file.size}</div>

            {/* Updated */}
            <div style={{ flex: 0.8, fontSize: 12, color: "#6b7280" }}>{file.updated}</div>

            {/* Actions */}
            <div style={{ width: 56, flexShrink: 0, display: "flex", alignItems: "center",
              justifyContent: "flex-end", gap: 4 }}>
              {file.starred && (
                <I.Icon name="Star" size={13} color="#d4a847" strokeWidth={2}
                  style={{ fill: "#d4a847" }} />
              )}
              <button
                onClick={(e) => { e.stopPropagation(); setOpenMenu(isOpen ? null : file.id); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "#9ca3af", padding: "2px 4px", borderRadius: 4,
                  fontSize: 15, lineHeight: 1, flexShrink: 0,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f3f4f6"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
              >···</button>
            </div>

            {/* Dropdown */}
            {isOpen && (
              <div onClick={(e) => e.stopPropagation()} style={{
                position: "absolute", right: 0, top: "100%", zIndex: 100,
                background: "white", border: "0.5px solid #d1d5db",
                borderRadius: 10, boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                minWidth: 150, overflow: "hidden",
              }}>
                {dropdownItems.map((item, idx) => {
                  if (item.divider) return <div key={idx} style={{ borderTop: "0.5px solid #e5e7eb", margin: "2px 0" }} />;
                  return (
                    <button key={idx} style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 8,
                      padding: "7px 10px", background: "none", border: "none", cursor: "pointer",
                      fontSize: 12, color: item.red ? "#a32d2d" : COLORS.text, textAlign: "left",
                    }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = item.red ? "#fcebeb" : "#f9fafb"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "none"; }}
                    >
                      <I.Icon name={item.icon} size={13} color={item.red ? "#a32d2d" : "#6b7280"} strokeWidth={2} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* Storage bar */}
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>Storage used</div>
        <div style={{ flex: 1, height: 5, borderRadius: 99, background: "#f3f4f6", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${storagePct}%`, borderRadius: 99, background: COLORS.darkGreen }} />
        </div>
        <div style={{ fontSize: 11, color: "#9ca3af", whiteSpace: "nowrap" }}>
          {storageUsedMB} MB of {storageTotalMB} MB
        </div>
      </div>
    </OverviewCard>
  );
}

// Bookmarks card — 3 recent bookmarks + stats row
function OverviewBookmarksCard({ onSwitchTab }) {
  const tagColors = {
    Biology: { bg: "#d1fae5", color: "#065f46" },
    Math: { bg: "#dbeafe", color: "#1e40af" },
    Chemistry: { bg: "#ede9fe", color: "#5b21b6" },
    English: { bg: "#fce7f3", color: "#9d174d" },
    Literature: { bg: "#fce7f3", color: "#9d174d" },
    Science: { bg: "#d1fae5", color: "#065f46" },
    Study: { bg: "#fef9c3", color: "#854d0e" },
    "Watch later": { bg: "#fef3c7", color: "#92400e" },
  };

  const previewBookmarks = BOOKMARKS.slice(0, 3);
  const totalSaved = BOOKMARKS.length;
  const totalStarred = BOOKMARKS.filter((b) => b.starred).length;
  const allTags = BOOKMARKS.flatMap((b) => b.tags.split(" "));
  const distinctSubjects = new Set(allTags.filter((t) => !["Study", "Watch later"].includes(t))).size;

  const isYouTube = (url) => url.includes("youtube.com") || url.includes("youtu.be");

  return (
    <OverviewCard
      iconBg="#faeeda"
      iconColor="#d97706"
      iconName="Bookmark"
      title="Bookmarks"
      linkLabel="See all →"
      onLinkClick={() => onSwitchTab("bookmarks")}
    >
      <div>
        {previewBookmarks.map((bm, i) => {
          const isLast = i === previewBookmarks.length - 1;
          const tags = bm.tags.split(" ");
          return (
            <div
              key={bm.id}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                padding: "7px 0",
                borderBottom: isLast ? "none" : "0.5px solid #e5e7eb",
                borderLeft: bm.starred ? "3px solid #d4a847" : "3px solid transparent",
                paddingLeft: bm.starred ? 8 : 0,
                marginLeft: bm.starred ? -3 : 0,
              }}
            >
              {/* Favicon placeholder */}
              <div style={{
                width: 24,
                height: 24,
                borderRadius: 5,
                background: "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}>
                <I.Icon
                  name={isYouTube(bm.url) ? "Youtube" : "Globe"}
                  size={12}
                  color="#9ca3af"
                  strokeWidth={2}
                />
              </div>

              {/* Title + tags */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: COLORS.text,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: 4,
                }}>
                  {bm.title}
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {tags.map((tag) => {
                    const tc = tagColors[tag] || { bg: "#f3f4f6", color: "#6b7280" };
                    return (
                      <span key={tag} style={{
                        padding: "1px 6px",
                        borderRadius: 20,
                        background: tc.bg,
                        color: tc.color,
                        fontSize: 10,
                        fontWeight: 600,
                      }}>
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Star */}
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <I.Icon
                  name="Star"
                  size={14}
                  color={bm.starred ? "#d4a847" : "#d1d5db"}
                  strokeWidth={2}
                  style={{ fill: bm.starred ? "#d4a847" : "none" }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        {[
          { value: totalSaved, label: "Saved" },
          { value: totalStarred, label: "Starred" },
          { value: distinctSubjects, label: "Subjects" },
        ].map(({ value, label }) => (
          <div key={label} style={{
            flex: 1,
            background: "#f9fafb",
            borderRadius: 8,
            padding: "8px 4px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 18, fontWeight: 500, color: COLORS.text, lineHeight: 1.2 }}>
              {value}
            </div>
            <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 2 }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </OverviewCard>
  );
}

function MyOverviewPage({ selectedMenuItem, onSwitchTab }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <DeskHeroCard />
      <div style={{
        display: "grid",
        gridTemplateAreas: `
          "menu bookmarks"
          "tools tools"
          "files files"
        `,
        gridTemplateColumns: "1.15fr 1fr",
        gridTemplateRows: "360px auto auto",
        gap: 14,
      }}>
        <div style={{ gridArea: "menu", display: "flex", flexDirection: "column" }}>
          <OverviewMenuCard selectedItem={selectedMenuItem} onSwitchTab={onSwitchTab} />
        </div>
        <div style={{ gridArea: "bookmarks", display: "flex", flexDirection: "column" }}>
          <OverviewBookmarksCard onSwitchTab={onSwitchTab} />
        </div>
        <div style={{ gridArea: "tools" }}>
          <OverviewToolsCard onSwitchTab={onSwitchTab} />
        </div>
        <div style={{ gridArea: "files" }}>
          <OverviewFilesCard onSwitchTab={onSwitchTab} />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MY MEETINGS
// ============================================================

const SPACES_DATA = [
  { id: "sp1", name: "Study Room A",   stype: "study",   iconBg: "#ede9fe", iconColor: "#5b21b6", capacity: 4,  floor: "Floor 2", amenities: ["WiFi", "Whiteboard", "Power outlets"],                        requiresApproval: false, taken: ["9:00","9:30","11:00","11:30","14:00","14:30"] },
  { id: "sp2", name: "Study Room B",   stype: "study",   iconBg: "#ede9fe", iconColor: "#5b21b6", capacity: 6,  floor: "Floor 2", amenities: ["WiFi", "Whiteboard", "Screen", "Power outlets"],              requiresApproval: false, taken: ["8:00","8:30","10:00","10:30","12:00","12:30","13:00"] },
  { id: "sp3", name: "Collab Suite 1", stype: "collab",  iconBg: "#fef3c7", iconColor: "#d97706", capacity: 12, floor: "Floor 3", amenities: ["WiFi", "Whiteboard", "Screen", "Video call", "Power outlets"], requiresApproval: true,  taken: ["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","13:00","13:30","14:00","14:30","15:00","15:30"] },
  { id: "sp4", name: "Library Zone Q", stype: "library", iconBg: "#ede9fe", iconColor: "#5b21b6", capacity: 8,  floor: "Floor 1", amenities: ["WiFi", "Printing", "Power outlets"],                          requiresApproval: false, taken: ["9:00","11:00","12:00","14:00","15:00","15:30"] },
  { id: "sp5", name: "Maker Space",    stype: "lab",     iconBg: "#d1fae5", iconColor: "#065f46", capacity: 10, floor: "Floor 1", amenities: ["WiFi", "3D printers", "Power outlets", "Whiteboard"],         requiresApproval: true,  taken: ["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30"] },
];

const ALL_SLOTS = ["8:00","8:30","9:00","9:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30"];

const SPACE_FILTERS = [
  { id: "all",     label: "All spaces",    dot: "#9090A8" },
  { id: "study",   label: "Study rooms",   dot: "#7F77DD" },
  { id: "collab",  label: "Collab suites", dot: "#d97706" },
  { id: "lab",     label: "Labs",          dot: "#065f46" },
  { id: "library", label: "Library zones", dot: "#7F77DD" },
];

function _addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
function _isSameDay(a, b) { return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
function _isToday(d) { return _isSameDay(d, new Date()); }
function _fmtISO(d) { return d.toISOString().slice(0,10); }
function _fmtDow(d) { return ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()]; }
function _fmtDay(d) { return String(d.getDate()); }
function _fmtMonth(d) { return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()]; }
function _fmtFull(d) { return `${_fmtDow(d)} ${_fmtDay(d)} ${_fmtMonth(d)}`; }
function _getWeekStart() {
  const t = new Date();
  const diff = t.getDay() === 0 ? -6 : 1 - t.getDay();
  return _addDays(t, diff);
}

function MeetingToast({ message, onDone }) {
  React.useEffect(() => { const id = setTimeout(onDone, 3000); return () => clearTimeout(id); }, []);
  return (
    <div style={{
      position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
      background: "#1a3a2a", color: "#9fe1cb", padding: "10px 22px", borderRadius: 999,
      fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8,
      boxShadow: "0 4px 20px rgba(0,0,0,0.28)", zIndex: 2000, whiteSpace: "nowrap",
      fontFamily: "Nunito, Poppins, sans-serif",
    }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", border: "2px solid #9fe1cb", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0 }}>✓</span>
      {message}
    </div>
  );
}

function SpaceCard({ space, dateKey, dateLabel, bookings, setBookings, openId, setOpenId, setToast }) {
  const [duration, setDuration] = React.useState("30");
  const [purpose, setPurpose] = React.useState("");

  const mySlots = ALL_SLOTS.filter(s => bookings[`${space.id}|${dateKey}|${s}`]);
  const availableSlots = ALL_SLOTS.filter(s => !space.taken.includes(s) && !mySlots.includes(s));

  const badge = (() => {
    if (availableSlots.length === 0) return { label: "Fully booked", bg: "#fee2e2", color: "#991b1b" };
    if (availableSlots.length <= 3) return { label: `${availableSlots.length} slots left`, bg: "#fef3c7", color: "#92400e" };
    if (space.requiresApproval) return { label: "Approval required", bg: "#dbeafe", color: "#1e40af" };
    return { label: "Available today", bg: "#d1fae5", color: "#065f46" };
  })();

  const openPopover = (openId && openId.spaceId === space.id) ? openId : null;
  const isPopoverOpen = !!openPopover;
  const selectedSlot = openPopover?.slot;
  const selectedSlotIdx = selectedSlot ? ALL_SLOTS.indexOf(selectedSlot) : -1;

  const extraSlots = duration === "30" ? 0 : duration === "60" ? 1 : duration === "90" ? 2 : 3;
  const previewSlots = [];
  let durationBlocked = false;
  if (openPopover?.mode === "book" && extraSlots > 0) {
    for (let i = 1; i <= extraSlots; i++) {
      const ns = ALL_SLOTS[selectedSlotIdx + i];
      if (!ns) { durationBlocked = true; break; }
      if (space.taken.includes(ns) || mySlots.includes(ns)) { durationBlocked = true; break; }
      previewSlots.push(ns);
    }
  }

  const handleSlotClick = (slot, isAvail) => {
    if (!isAvail && !mySlots.includes(slot)) return;
    if (openPopover && openPopover.slot === slot) {
      setOpenId(null); setDuration("30"); setPurpose(""); return;
    }
    setOpenId({ spaceId: space.id, slot, mode: mySlots.includes(slot) ? "cancel" : "book" });
    setDuration("30"); setPurpose("");
  };

  const handleConfirm = () => {
    const nb = { ...bookings };
    nb[`${space.id}|${dateKey}|${selectedSlot}`] = true;
    previewSlots.forEach(s => { nb[`${space.id}|${dateKey}|${s}`] = true; });
    setBookings(nb); setOpenId(null); setDuration("30"); setPurpose("");
    setToast(space.requiresApproval ? "Request sent — pending approval." : `Booking confirmed: ${selectedSlot}`);
  };

  const handleCancelBooking = () => {
    const nb = { ...bookings };
    delete nb[`${space.id}|${dateKey}|${selectedSlot}`];
    setBookings(nb); setOpenId(null);
    setToast("Reservation cancelled.");
  };

  const spaceIcon = space.stype === "lab" ? "🔬" : space.stype === "collab" ? "💼" : "📚";

  return (
    <div style={{ background: COLORS.surface, border: `0.5px solid ${COLORS.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 14 }}>
      {/* Header */}
      <div style={{ padding: "12px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 34, height: 34, borderRadius: 8, background: space.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>
          {spaceIcon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 4 }}>{space.name}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 11, color: COLORS.textMuted }}>👥 Up to {space.capacity}</span>
            <span style={{ fontSize: 11, color: COLORS.textMuted }}>📍 {space.floor}</span>
            <span style={{ padding: "2px 8px", borderRadius: 20, fontSize: 10, fontWeight: 600, background: badge.bg, color: badge.color }}>{badge.label}</span>
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div style={{ padding: "0 14px 10px", display: "flex", gap: 5, flexWrap: "wrap" }}>
        {space.amenities.map(a => (
          <span key={a} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 20, background: "#f3f4f6", color: COLORS.textMuted, fontWeight: 500 }}>{a}</span>
        ))}
      </div>

      {/* Slots */}
      <div style={{ padding: "10px 14px 12px", borderTop: `0.5px solid ${COLORS.border}` }}>
        <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>{dateLabel} — available slots</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {ALL_SLOTS.map(slot => {
            const isMine = mySlots.includes(slot);
            const isTaken = space.taken.includes(slot);
            const isSelected = openPopover?.slot === slot;
            const isPreview = previewSlots.includes(slot) && isPopoverOpen && openPopover.mode === "book";

            if (isMine) {
              return (
                <button key={slot} onClick={() => handleSlotClick(slot, false)} aria-label={`Your booking at ${slot}`}
                  style={{ width: 50, height: 30, borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 600,
                    border: "1.5px solid #d4a847", background: "#F5A623", color: "#412402", fontFamily: "inherit" }}>
                  {slot}
                </button>
              );
            }
            if (isTaken) {
              return (
                <div key={slot} style={{ width: 50, height: 30, borderRadius: 6, fontSize: 11, background: "#f3f4f6",
                  color: "#9ca3af", border: "0.5px solid #e5e7eb", display: "flex", alignItems: "center",
                  justifyContent: "center", cursor: "not-allowed" }}>
                  {slot}
                </div>
              );
            }
            let s = { width: 50, height: 30, borderRadius: 6, cursor: "pointer", fontSize: 11, fontWeight: 500,
              border: "1px solid #e5e7eb", background: COLORS.surface, color: COLORS.text, fontFamily: "inherit" };
            if (isPreview) s = { ...s, background: "#e6f1fb", border: "1.5px solid #185fa5", color: "#042c53" };
            if (isSelected) s = { ...s, border: `2px solid ${COLORS.text}` };
            return (
              <button key={slot} onClick={() => handleSlotClick(slot, true)}
                aria-label={`Book ${slot}`} aria-pressed={isSelected} style={s}>
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Inline popover */}
      <div style={{ maxHeight: isPopoverOpen ? 500 : 0, overflow: "hidden", transition: "max-height 0.25s ease",
        borderTop: isPopoverOpen ? `0.5px solid ${COLORS.border}` : "none", background: "#f9fafb" }}>
        {isPopoverOpen && openPopover.mode === "book" && (
          <div style={{ padding: "16px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>Reserve {space.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{dateLabel} · {selectedSlot}</div>
              </div>
              <button onClick={() => { setOpenId(null); setDuration("30"); setPurpose(""); }} aria-label="Close"
                style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "#e5e7eb",
                  color: COLORS.textMuted, cursor: "pointer", fontSize: 13, display: "flex",
                  alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textMuted, marginBottom: 6 }}>Duration</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {[{v:"30",l:"30 min"},{v:"60",l:"1 hour"},{v:"90",l:"1.5 hrs"},{v:"120",l:"2 hours"}].map(({v,l}) => (
                  <button key={v} onClick={() => setDuration(v)} style={{ padding: "5px 12px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontFamily: "inherit",
                    border: duration===v ? "none" : "1px solid #e5e7eb",
                    background: duration===v ? COLORS.text : COLORS.surface,
                    color: duration===v ? "#fff" : COLORS.text, fontWeight: duration===v ? 600 : 400 }}>{l}</button>
                ))}
              </div>
              {extraSlots > 0 && !durationBlocked && (
                <div style={{ marginTop: 7, fontSize: 11, color: "#042c53", background: "#e6f1fb", borderRadius: 6, padding: "5px 10px" }}>
                  Uses the {ALL_SLOTS[selectedSlotIdx + extraSlots]} slot too.
                </div>
              )}
              {extraSlots > 0 && durationBlocked && (
                <div style={{ marginTop: 7, fontSize: 11, color: "#991b1b", background: "#fee2e2", borderRadius: 6, padding: "5px 10px" }}>
                  Next slot unavailable for this duration.
                </div>
              )}
            </div>

            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: COLORS.textMuted, marginBottom: 5 }}>Purpose (optional)</div>
              <textarea value={purpose} onChange={e => setPurpose(e.target.value)}
                placeholder="e.g. Biology study group…"
                style={{ width: "100%", height: 50, boxSizing: "border-box", borderRadius: 8,
                  border: "1px solid #e5e7eb", padding: "7px 10px", fontSize: 12,
                  fontFamily: "inherit", resize: "none", outline: "none", background: "#fff" }} />
            </div>

            {space.requiresApproval && (
              <div style={{ background: "#dbeafe", borderRadius: 8, padding: "8px 11px", marginBottom: 12,
                fontSize: 11, color: "#042c53", display: "flex", gap: 6, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0 }}>ℹ</span>
                This space requires teacher approval. Your request will be reviewed within 24 hours.
              </div>
            )}

            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => { setOpenId(null); setDuration("30"); setPurpose(""); }}
                style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #e5e7eb",
                  background: COLORS.surface, color: COLORS.text, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
              <button onClick={handleConfirm} disabled={durationBlocked && duration !== "30"}
                style={{ padding: "7px 16px", borderRadius: 8, border: "none",
                  background: (durationBlocked && duration !== "30") ? "#9ca3af" : "#1a3a2a",
                  color: "#9fe1cb", fontSize: 12, fontWeight: 600,
                  cursor: (durationBlocked && duration !== "30") ? "default" : "pointer", fontFamily: "inherit" }}>
                {space.requiresApproval ? "Send request" : "Confirm booking"}
              </button>
            </div>
          </div>
        )}
        {isPopoverOpen && openPopover.mode === "cancel" && (
          <div style={{ padding: "16px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{space.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 2 }}>{dateLabel} · {selectedSlot}</div>
              </div>
              <button onClick={() => setOpenId(null)} aria-label="Close"
                style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "#e5e7eb",
                  color: COLORS.textMuted, cursor: "pointer", fontSize: 13, display: "flex",
                  alignItems: "center", justifyContent: "center" }}>✕</button>
            </div>
            <div style={{ background: "#faeeda", border: "0.5px solid #d4a847", borderRadius: 8,
              padding: "10px 12px", marginBottom: 14, fontSize: 12, color: "#412402",
              display: "flex", gap: 8, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0 }}>✦</span>
              You have {selectedSlot} booked. Cancel below if your plans have changed.
            </div>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <button onClick={() => setOpenId(null)}
                style={{ padding: "7px 16px", borderRadius: 8, border: "1px solid #e5e7eb",
                  background: COLORS.surface, color: COLORS.text, fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>Keep booking</button>
              <button onClick={handleCancelBooking}
                style={{ padding: "7px 16px", borderRadius: 8, border: "none", background: "#fef2f2",
                  color: "#991b1b", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Cancel reservation</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── WORKING SPACES MAP ─────────────────────────────────────────────

const MAP_ROOM_STYLES = {
  classroom: { fill: "#daeaf8", stroke: "#185fa5", numCol: "#0c447c", lblCol: "#185fa5" },
  lab:       { fill: "#d5f0e6", stroke: "#0f6e56", numCol: "#085041", lblCol: "#0f6e56" },
  library:   { fill: "#e6e4fa", stroke: "#534ab7", numCol: "#26215c", lblCol: "#534ab7" },
  collab:    { fill: "#faeeda", stroke: "#854f0b", numCol: "#412402", lblCol: "#854f0b" },
  quiet:     { fill: "#fbeaf0", stroke: "#993556", numCol: "#4b1528", lblCol: "#993556" },
};
const MAP_YOURS = { fill: "#fff3d0", stroke: "#d4a847", numCol: "#633806", lblCol: "#854f0b" };
const MAP_DOT   = { available: "#3b6d11", busy: "#993c1d", yours: "#d4a847", restricted: "#9ca3af" };

const MAP_ROOMS = [
  // Ground (floorIdx 0, viewH 230)
  { id:"g-lib",   name:"Main Library",    short:"Library",  type:"library",   bldg:"main",    floor:"Ground",  floorIdx:0, avail:"available", cap:40, x:30,  y:4,   w:216, h:100 },
  { id:"g-hall",  name:"Common Hall",     short:"C.Hall",   type:"collab",    bldg:"main",    floor:"Ground",  floorIdx:0, avail:"available", cap:50, x:268, y:4,   w:108, h:100 },
  { id:"g-music", name:"Music Room",      short:"Music",    type:"collab",    bldg:"arts",    floor:"Ground",  floorIdx:0, avail:"busy",      cap:20, x:380, y:4,   w:112, h:100 },
  { id:"g-media", name:"Media Lab",       short:"Media",    type:"lab",       bldg:"science", floor:"Ground",  floorIdx:0, avail:"busy",      cap:20, x:268, y:132, w:108, h:90  },
  { id:"g-conf",  name:"Conference Room", short:"Conf.",    type:"collab",    bldg:"main",    floor:"Ground",  floorIdx:0, avail:"available", cap:16, x:380, y:132, w:112, h:90  },
  // Floor 1 (floorIdx 1, viewH 200)
  { id:"f1-101",  name:"Room 101",        short:"101",      type:"classroom", bldg:"main",    floor:"Floor 1", floorIdx:1, avail:"available", cap:28, x:30,  y:4,   w:106, h:83  },
  { id:"f1-102",  name:"Room 102",        short:"102",      type:"classroom", bldg:"main",    floor:"Floor 1", floorIdx:1, avail:"busy",      cap:28, x:140, y:4,   w:106, h:83  },
  { id:"f1-sl1",  name:"Science Lab 1",   short:"Sci 1",    type:"lab",       bldg:"science", floor:"Floor 1", floorIdx:1, avail:"available", cap:24, x:268, y:4,   w:108, h:83  },
  { id:"f1-sl2",  name:"Science Lab 2",   short:"Sci 2",    type:"lab",       bldg:"science", floor:"Floor 1", floorIdx:1, avail:"busy",      cap:24, x:380, y:4,   w:112, h:83  },
  { id:"f1-libq", name:"Library Zone Q",  short:"Lib Q",    type:"library",   bldg:"main",    floor:"Floor 1", floorIdx:1, avail:"available", cap:30, x:30,  y:113, w:216, h:83  },
  { id:"f1-itl",  name:"IT Lab",          short:"IT Lab",   type:"lab",       bldg:"main",    floor:"Floor 1", floorIdx:1, avail:"available", cap:20, x:268, y:113, w:108, h:83  },
  { id:"f1-qs1",  name:"Quiet Study 1",   short:"QS 1",     type:"quiet",     bldg:"main",    floor:"Floor 1", floorIdx:1, avail:"available", cap:12, x:380, y:113, w:112, h:83  },
  // Floor 2 (floorIdx 2, viewH 200) — Room 204 = student's next class
  { id:"f2-201",  name:"Room 201",        short:"201",      type:"classroom", bldg:"main",    floor:"Floor 2", floorIdx:2, avail:"available", cap:28, x:30,  y:4,   w:106, h:83  },
  { id:"f2-202",  name:"Room 202",        short:"202",      type:"classroom", bldg:"main",    floor:"Floor 2", floorIdx:2, avail:"busy",      cap:28, x:140, y:4,   w:106, h:83  },
  { id:"f2-203",  name:"Room 203",        short:"203",      type:"classroom", bldg:"main",    floor:"Floor 2", floorIdx:2, avail:"available", cap:28, x:268, y:4,   w:108, h:83  },
  { id:"f2-dsgn", name:"Design Studio",   short:"Design",   type:"collab",    bldg:"arts",    floor:"Floor 2", floorIdx:2, avail:"available", cap:18, x:380, y:4,   w:112, h:83  },
  { id:"f2-204",  name:"Room 204",        short:"204",      type:"classroom", bldg:"main",    floor:"Floor 2", floorIdx:2, avail:"yours",     cap:28, x:30,  y:113, w:106, h:83, isYours:true },
  { id:"f2-bio",  name:"Bio Lab",         short:"Bio Lab",  type:"lab",       bldg:"science", floor:"Floor 2", floorIdx:2, avail:"available", cap:22, x:140, y:113, w:106, h:83  },
  { id:"f2-col1", name:"Collab Suite 1",  short:"C.Ste 1",  type:"collab",    bldg:"main",    floor:"Floor 2", floorIdx:2, avail:"available", cap:12, x:268, y:113, w:108, h:83  },
  { id:"f2-qs2",  name:"Quiet Study 2",   short:"QS 2",     type:"quiet",     bldg:"main",    floor:"Floor 2", floorIdx:2, avail:"available", cap:10, x:380, y:113, w:112, h:83  },
  // Floor 3 (floorIdx 3, viewH 200)
  { id:"f3-301",  name:"Room 301",        short:"301",      type:"classroom", bldg:"main",    floor:"Floor 3", floorIdx:3, avail:"busy",      cap:28, x:30,  y:4,   w:106, h:83  },
  { id:"f3-302",  name:"Room 302",        short:"302",      type:"classroom", bldg:"main",    floor:"Floor 3", floorIdx:3, avail:"available", cap:28, x:140, y:4,   w:106, h:83  },
  { id:"f3-phys", name:"Physics Lab",     short:"Physics",  type:"lab",       bldg:"science", floor:"Floor 3", floorIdx:3, avail:"available", cap:22, x:268, y:4,   w:108, h:83  },
  { id:"f3-303",  name:"Room 303",        short:"303",      type:"classroom", bldg:"main",    floor:"Floor 3", floorIdx:3, avail:"busy",      cap:28, x:380, y:4,   w:112, h:83  },
  { id:"f3-304",  name:"Room 304",        short:"304",      type:"classroom", bldg:"main",    floor:"Floor 3", floorIdx:3, avail:"available", cap:28, x:30,  y:113, w:106, h:83  },
  { id:"f3-chem", name:"Chemistry Lab",   short:"Chem",     type:"lab",       bldg:"science", floor:"Floor 3", floorIdx:3, avail:"busy",      cap:22, x:140, y:113, w:106, h:83  },
  { id:"f3-qs3",  name:"Quiet Study 3",   short:"QS 3",     type:"quiet",     bldg:"main",    floor:"Floor 3", floorIdx:3, avail:"available", cap:10, x:268, y:113, w:108, h:83  },
];

const MAP_TYPE_FILTERS = [
  { id:"all",       label:"All",          dot:"#9090A8" },
  { id:"classroom", label:"Classrooms",   dot:"#185fa5" },
  { id:"lab",       label:"Labs",         dot:"#0f6e56" },
  { id:"library",   label:"Library",      dot:"#534ab7" },
  { id:"collab",    label:"Collab areas", dot:"#854f0b" },
  { id:"quiet",     label:"Quiet study",  dot:"#993556" },
];
const MAP_BLDG_FILTERS = [
  { id:"all",     label:"All buildings", icon:"🏫" },
  { id:"main",    label:"Main block",    icon:"🏛" },
  { id:"science", label:"Science block", icon:"🔬" },
  { id:"arts",    label:"Arts block",    icon:"🎨" },
];

const MAP_FLOORS = [
  { name:"Floor 3",     floorIdx:3, viewH:200, renderIdx:0 },
  { name:"Floor 2",     floorIdx:2, viewH:200, renderIdx:1 },
  { name:"Floor 1",     floorIdx:1, viewH:200, renderIdx:2 },
  { name:"Ground floor",floorIdx:0, viewH:230, renderIdx:3 },
];

function WorkingSpacesMap() {
  const [activeTypes, setActiveTypes] = React.useState(new Set());
  const [activeBldgs, setActiveBldgs] = React.useState(new Set());
  const [searchQ, setSearchQ] = React.useState("");
  const [detailRoom, setDetailRoom] = React.useState(null);
  const [pulseId, setPulseId] = React.useState(null);
  const [hlFloor, setHlFloor] = React.useState(null);
  const floorRefs = React.useRef([null, null, null, null]);

  const toggleType = (id) => {
    setActiveTypes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const toggleBldg = (id) => {
    setActiveBldgs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const clearAllFilters = () => { setActiveTypes(new Set()); setActiveBldgs(new Set()); setSearchQ(""); };

  const matchRoom = (r) => {
    if (activeTypes.size > 0 && !activeTypes.has(r.type)) return false;
    if (activeBldgs.size > 0 && !activeBldgs.has(r.bldg)) return false;
    if (searchQ) {
      const q = searchQ.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.type.includes(q) && !r.short.toLowerCase().includes(q)) return false;
    }
    return true;
  };

  const totalRooms   = MAP_ROOMS.length;
  const visibleRooms = MAP_ROOMS.filter(matchRoom).length;
  const hasFilters   = activeTypes.size > 0 || activeBldgs.size > 0 || searchQ !== "";
  const availCount   = MAP_ROOMS.filter(r => r.avail === "available").length;
  const busyCount    = MAP_ROOMS.filter(r => r.avail === "busy").length;
  const yoursRoom    = MAP_ROOMS.find(r => r.isYours);

  const locateMyClass = () => {
    if (!yoursRoom) return;
    const ri = 3 - yoursRoom.floorIdx;
    floorRefs.current[ri]?.scrollIntoView({ behavior: "smooth", block: "center" });
    setPulseId(yoursRoom.id);
    setHlFloor(ri);
    setDetailRoom(yoursRoom);
    setTimeout(() => { setPulseId(null); setHlFloor(null); }, 2400);
  };

  const handleRoomClick = (room, e) => {
    e.stopPropagation();
    setDetailRoom(dr => dr?.id === room.id ? null : room);
  };

  const roomTypeIcon = (type) =>
    type === "lab" ? "🔬" : type === "library" ? "📚" : type === "collab" ? "💼" : type === "quiet" ? "🔇" : "🏫";

  const renderFloorSVG = (floor, highlighted) => {
    const isGround = floor.floorIdx === 0;
    const vH = floor.viewH;
    const corrY = isGround ? 108 : 89;
    const corrH = 22;
    const bWCy  = isGround ? 186 : 158;
    const floorRooms = MAP_ROOMS.filter(r => r.floorIdx === floor.floorIdx);

    return (
      <svg viewBox={`0 0 520 ${vH}`} width="100%" height={isGround ? 262 : 231} style={{ display:"block" }} role="img"
        onClick={() => setDetailRoom(null)}>
        <title>{floor.name} floor plan</title>

        {/* Shell */}
        <rect x={2} y={2} width={516} height={vH-4} rx={4} fill="#f5f4f0" stroke="#c8c5bb" strokeWidth={1.5} />

        {/* Corridor */}
        <rect x={2} y={corrY} width={516} height={corrH} fill="#e8e6e0" />
        <text x={260} y={corrY+corrH/2+3} textAnchor="middle" fontSize={7} fill="#a09e96" fontStyle="italic">main corridor</text>

        {/* Wing dividers */}
        <rect x={252} y={2}          width={16} height={corrY-2}              fill="#e8e6e0" />
        <rect x={252} y={corrY+corrH} width={16} height={vH-4-corrY-corrH}    fill="#e8e6e0" />

        {/* Stairwells */}
        <rect x={2}   y={corrY} width={26} height={corrH} fill="#d3d1c7" />
        <text x={15}  y={corrY+corrH/2+3} textAnchor="middle" fontSize={7} fill="#7a7870">↑↓</text>
        <rect x={492} y={corrY} width={26} height={corrH} fill="#d3d1c7" />
        <text x={505} y={corrY+corrH/2+3} textAnchor="middle" fontSize={7} fill="#7a7870">↑↓</text>

        {/* Lift (all floors except Floor 3) */}
        {floor.floorIdx !== 3 && (
          <>
            <rect x={244} y={corrY} width={20} height={corrH} fill="#c8c5bc" />
            <text x={254} y={corrY+corrH/2+3} textAnchor="middle" fontSize={6} fill="#5a5850">LIFT</text>
          </>
        )}

        {/* WC top-left */}
        <rect x={2} y={2} width={26} height={38} fill="#d3d1c7" />
        <line x1={15} y1={2} x2={15} y2={40} stroke="#bbb9af" strokeWidth={0.5} />
        <text x={8}  y={9}  textAnchor="middle" fontSize={5} fill="#7a7870">WC</text>
        <text x={8}  y={24} textAnchor="middle" fontSize={6} fill="#7a7870">♂</text>
        <text x={22} y={24} textAnchor="middle" fontSize={6} fill="#7a7870">♀</text>

        {/* WC bottom-left */}
        <rect x={2} y={bWCy} width={26} height={38} fill="#d3d1c7" />
        <line x1={15} y1={bWCy} x2={15} y2={bWCy+38} stroke="#bbb9af" strokeWidth={0.5} />
        <text x={8}  y={bWCy+8}  textAnchor="middle" fontSize={5} fill="#7a7870">WC</text>
        <text x={8}  y={bWCy+24} textAnchor="middle" fontSize={6} fill="#7a7870">♂</text>
        <text x={22} y={bWCy+24} textAnchor="middle" fontSize={6} fill="#7a7870">♀</text>

        {/* Ground-floor extras */}
        {isGround && (
          <>
            <rect x={30} y={132} width={216} height={90} fill="#e0ded8" stroke="#c0bdb3" strokeWidth={1} rx={2} />
            <text x={138} y={174} textAnchor="middle" fontSize={8} fill="#7a7870">Reception &amp; admin</text>
            <rect x={210} y={224} width={100} height={4} fill="#c8c5bb" />
            <line x1={225} y1={224} x2={235} y2={228} stroke="#aaa8a0" strokeWidth={1} />
            <line x1={295} y1={224} x2={285} y2={228} stroke="#aaa8a0" strokeWidth={1} />
            <text x={260} y={222} textAnchor="middle" fontSize={7} fill="#9a9890">main entrance</text>
          </>
        )}

        {/* Interactive rooms */}
        {floorRooms.map(room => {
          const ts      = room.isYours ? MAP_YOURS : (MAP_ROOM_STYLES[room.type] || MAP_ROOM_STYLES.classroom);
          const dotCol  = MAP_DOT[room.avail] || MAP_DOT.available;
          const visible = matchRoom(room);
          const isSelected = detailRoom?.id === room.id;
          const isPulsing  = pulseId === room.id;
          const cx = room.x + room.w / 2;
          const cy = room.y + room.h / 2;
          return (
            <g key={room.id}
              onClick={(e) => handleRoomClick(room, e)}
              className={isPulsing ? "fp-pulse" : ""}
              style={{ cursor:"pointer", opacity: visible ? 1 : 0.08, transition:"opacity 0.2s", pointerEvents: visible ? "auto" : "none" }}>
              <rect x={room.x} y={room.y} width={room.w} height={room.h}
                fill={ts.fill} stroke={isSelected ? "#1a3a2a" : ts.stroke}
                strokeWidth={isSelected ? 2.5 : 1.5} rx={3} />
              {/* Availability dot */}
              <circle cx={room.x+9} cy={room.y+9} r={4.5} fill={dotCol} />
              {/* Your class label */}
              {room.isYours && <text x={cx} y={cy-13} textAnchor="middle" fontSize={7} fill={ts.numCol} fontWeight={700}>★ Your class</text>}
              {/* Room name */}
              <text x={cx} y={room.isYours ? cy : cy-6} textAnchor="middle" fontSize={9} fill={ts.numCol} fontWeight={600}>{room.short}</text>
              {/* Type */}
              <text x={cx} y={room.isYours ? cy+11 : cy+5} textAnchor="middle" fontSize={7} fill={ts.lblCol}>{room.type}</text>
              {/* Capacity */}
              <text x={cx} y={room.isYours ? cy+21 : cy+15} textAnchor="middle" fontSize={7} fill={ts.lblCol}>{room.cap} seats</text>
            </g>
          );
        })}
      </svg>
    );
  };

  const detailBadge = !detailRoom ? null :
    detailRoom.avail === "yours"     ? { label:"Your next class", bg:"#faeeda", color:"#412402" } :
    detailRoom.avail === "available" ? { label:"Available now",   bg:"#d1fae5", color:"#065f46" } :
                                       { label:"In use",          bg:"#fee2e2", color:"#991b1b" };

  return (
    <div>
      <style>{`@keyframes fp-pulse{0%,100%{opacity:1;}50%{opacity:0.3;}} .fp-pulse{animation:fp-pulse 0.55s ease-in-out 4;}`}</style>

      <div style={{ display:"grid", gridTemplateColumns:"180px 1fr", gap:20, alignItems:"start" }}>

        {/* ── Sidebar ── */}
        <div style={{ position:"sticky", top:0, display:"flex", flexDirection:"column", gap:14 }}>

          {/* Card 1 — Your next class */}
          <button onClick={locateMyClass}
            style={{ background:"#1a3a2a", border:"none", borderRadius:16, padding:"14px", cursor:"pointer", textAlign:"left", width:"100%", fontFamily:"inherit" }}>
            <div style={{ fontSize:10, textTransform:"uppercase", letterSpacing:"0.07em", color:"#7fc4a0", fontWeight:600, marginBottom:6 }}>Your next class</div>
            <div style={{ fontSize:12, color:"#fff", fontWeight:500, marginBottom:3 }}>Mr Rivera · Biology</div>
            <div style={{ fontSize:11, color:"#9fe1cb", marginBottom:8 }}>Room 204 · Floor 2</div>
            <div style={{ fontSize:10, color:"#7fc4a0", marginBottom:10 }}>Starting in 18 min</div>
            <div tabIndex={-1} aria-hidden="true"
              style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"4px 11px", borderRadius:999,
                border:"1px solid #3d6e57", background:"rgba(255,255,255,0.07)",
                fontSize:11, color:"#9fe1cb", fontWeight:600, fontFamily:"inherit" }}>📍 Find on map</div>
          </button>

          {/* Card 2 — Type filter */}
          <div style={{ background:COLORS.surface, border:`0.5px solid ${COLORS.border}`, borderRadius:16, padding:"14px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontSize:10, fontWeight:700, color:COLORS.text, textTransform:"uppercase", letterSpacing:"0.07em" }}>Space type</div>
              {activeTypes.size > 0 && (
                <button onClick={() => setActiveTypes(new Set())}
                  style={{ fontSize:10, color:COLORS.textMuted, background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"inherit", textDecoration:"underline" }}>
                  Clear
                </button>
              )}
            </div>
            {MAP_TYPE_FILTERS.map(f => {
              const isAll = f.id === "all";
              const active = isAll ? activeTypes.size === 0 : activeTypes.has(f.id);
              return (
                <button key={f.id}
                  onClick={() => isAll ? setActiveTypes(new Set()) : toggleType(f.id)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"6px 8px", borderRadius:8, border:"none", cursor:"pointer", background: active ? "#f3f4f6" : "transparent", marginBottom:2, fontFamily:"inherit" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:f.dot, flexShrink:0 }} />
                  <span style={{ fontSize:12, fontWeight: active ? 600 : 400, color:COLORS.text, flex:1, textAlign:"left" }}>{f.label}</span>
                  {!isAll && active && <span style={{ fontSize:10, color:"#27500A" }}>✓</span>}
                </button>
              );
            })}
          </div>

          {/* Card 3 — Availability legend */}
          <div style={{ background:COLORS.surface, border:`0.5px solid ${COLORS.border}`, borderRadius:16, padding:"14px" }}>
            <div style={{ fontSize:10, fontWeight:700, color:COLORS.text, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.07em" }}>Availability</div>
            {[
              { dot:"#3b6d11", label:"Available now" },
              { dot:"#993c1d", label:"In use" },
              { dot:"#d4a847", label:"Your class" },
              { dot:"#9ca3af", label:"Restricted" },
            ].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:7 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:l.dot, flexShrink:0 }} />
                <span style={{ fontSize:11, color:COLORS.text }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Card 4 — Building filter */}
          <div style={{ background:COLORS.surface, border:`0.5px solid ${COLORS.border}`, borderRadius:16, padding:"14px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
              <div style={{ fontSize:10, fontWeight:700, color:COLORS.text, textTransform:"uppercase", letterSpacing:"0.07em" }}>Building</div>
              {activeBldgs.size > 0 && (
                <button onClick={() => setActiveBldgs(new Set())}
                  style={{ fontSize:10, color:COLORS.textMuted, background:"none", border:"none", cursor:"pointer", padding:0, fontFamily:"inherit", textDecoration:"underline" }}>
                  Clear
                </button>
              )}
            </div>
            {MAP_BLDG_FILTERS.map(f => {
              const isAll = f.id === "all";
              const active = isAll ? activeBldgs.size === 0 : activeBldgs.has(f.id);
              return (
                <button key={f.id}
                  onClick={() => isAll ? setActiveBldgs(new Set()) : toggleBldg(f.id)}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:7, padding:"6px 8px", borderRadius:8, border:"none", cursor:"pointer", background: active ? "#f3f4f6" : "transparent", marginBottom:2, fontFamily:"inherit" }}>
                  <span style={{ fontSize:13 }}>{f.icon}</span>
                  <span style={{ fontSize:12, fontWeight: active ? 600 : 400, color:COLORS.text, flex:1, textAlign:"left" }}>{f.label}</span>
                  {!isAll && active && <span style={{ fontSize:10, color:"#27500A" }}>✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Map panel ── */}
        <div>
          {/* Toolbar */}
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", background:COLORS.surface, border:`0.5px solid ${COLORS.border}`, borderRadius:12, marginBottom:20 }}>
            <span style={{ fontSize:16, flexShrink:0 }}>🗺️</span>
            <input type="text" placeholder="Search rooms or types…" value={searchQ}
              onChange={e => setSearchQ(e.target.value)}
              style={{ flex:1, border:"none", outline:"none", fontSize:13, background:"transparent", color:COLORS.text, fontFamily:"inherit" }} />
            <span style={{ fontSize:11, color:COLORS.textMuted, whiteSpace:"nowrap" }}>
              {hasFilters ? `${visibleRooms} of ${totalRooms}` : totalRooms} spaces
            </span>
          </div>

          {/* Floors (Floor 3 → Floor 2 → Floor 1 → Ground) */}
          {MAP_FLOORS.map((floor) => (
            <div key={floor.name}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                <span style={{ fontSize:12, fontWeight:700, color:COLORS.text, whiteSpace:"nowrap" }}>{floor.name}</span>
                <div style={{ flex:1, height:1, background:COLORS.border }} />
              </div>
              <div
                ref={(el) => { floorRefs.current[floor.renderIdx] = el; }}
                style={{
                  marginBottom:24, borderRadius:12, overflow:"hidden",
                  boxShadow: hlFloor === floor.renderIdx ? "0 0 0 2px #d4a847" : "none",
                  transition:"box-shadow 0.2s",
                }}>
                {renderFloorSVG(floor, hlFloor === floor.renderIdx)}
              </div>
            </div>
          ))}

          {/* Detail strip */}
          <div role="status" aria-live="polite"
            style={{ maxHeight: detailRoom ? 72 : 0, overflow:"hidden", transition:"max-height 0.25s ease",
              background:COLORS.surface, border: detailRoom ? `0.5px solid ${COLORS.border}` : "none",
              borderRadius:12, marginTop: detailRoom ? 8 : 0 }}>
            {detailRoom && (
              <div style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px" }}>
                <div style={{ width:36, height:36, borderRadius:8, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
                  background: (detailRoom.isYours ? MAP_YOURS : MAP_ROOM_STYLES[detailRoom.type] || MAP_ROOM_STYLES.classroom).fill,
                  border: `1.5px solid ${(detailRoom.isYours ? MAP_YOURS : MAP_ROOM_STYLES[detailRoom.type] || MAP_ROOM_STYLES.classroom).stroke}` }}>
                  {roomTypeIcon(detailRoom.type)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:COLORS.text }}>{detailRoom.name}</div>
                  <div style={{ fontSize:11, color:COLORS.textMuted, textTransform:"capitalize" }}>{detailRoom.type}</div>
                </div>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ fontSize:11, padding:"3px 9px", borderRadius:20, background:"#f3f4f6", color:COLORS.text }}>👥 {detailRoom.cap}</span>
                  <span style={{ fontSize:11, padding:"3px 9px", borderRadius:20, background:"#f3f4f6", color:COLORS.text }}>📍 {detailRoom.floor}</span>
                  {detailBadge && <span style={{ fontSize:11, padding:"3px 9px", borderRadius:20, fontWeight:600, background:detailBadge.bg, color:detailBadge.color }}>{detailBadge.label}</span>}
                </div>
                <button onClick={() => setDetailRoom(null)} aria-label="Close detail"
                  style={{ width:26, height:26, borderRadius:"50%", border:"none", background:"#f3f4f6", color:COLORS.textMuted, cursor:"pointer", fontSize:12, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>✕</button>
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderTop:`0.5px solid ${COLORS.border}`, marginTop:12 }}>
            <div style={{ display:"flex", gap:16 }}>
              {[{ dot:"#3b6d11", label:`${availCount} available` }, { dot:"#993c1d", label:`${busyCount} in use` }, { dot:"#d4a847", label:"1 your class" }].map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, color:COLORS.text }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:s.dot, flexShrink:0 }} />
                  {s.label}
                </div>
              ))}
            </div>
            <div style={{ fontSize:12, color:COLORS.textMuted }}>
              {hasFilters ? `${visibleRooms} of ${totalRooms} spaces` : `All ${totalRooms} spaces`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MyMeetingsPage() {
  const todayRef = React.useRef(new Date());
  const today = todayRef.current;
  const [weekStart, setWeekStart] = React.useState(_getWeekStart);
  const [selectedDate, setSelectedDate] = React.useState(today);
  const [subTab, setSubTab] = React.useState("reserve");
  const [spaceFilter, setSpaceFilter] = React.useState("all");
  const [bookings, setBookings] = React.useState({});
  const [openId, setOpenId] = React.useState(null);
  const [toast, setToast] = React.useState(null);

  const days = Array.from({ length: 7 }, (_, i) => _addDays(weekStart, i));
  const dateKey = _fmtISO(selectedDate);
  const dateLabel = _fmtFull(selectedDate);
  const monthLabel = _fmtMonth(days[3]);
  const isSelectedToday  = _isSameDay(selectedDate, today);
  const weekHasToday     = days.some(d => _isToday(d));
  const todayBtnActive   = !isSelectedToday || !weekHasToday;
  const bookedDates = new Set(Object.keys(bookings).map(k => k.split("|")[1]));

  const myBookingsList = Object.keys(bookings).map(k => {
    const [spaceId, dk, slot] = k.split("|");
    const sp = SPACES_DATA.find(s => s.id === spaceId);
    return { key: k, spaceName: sp?.name || spaceId, dateKey: dk, slot };
  }).sort((a, b) => a.dateKey.localeCompare(b.dateKey) || a.slot.localeCompare(b.slot));

  const filteredSpaces = spaceFilter === "all" ? SPACES_DATA : SPACES_DATA.filter(s => s.stype === spaceFilter);

  return (
    <div>
      {/* L2 pill tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {[{ id: "map", label: "Working Spaces Map" }, { id: "reserve", label: "Reserve a Space" }].map(t => (
          <button key={t.id} onClick={() => setSubTab(t.id)} style={{
            padding: "7px 18px", borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
            border: `1.5px solid ${subTab === t.id ? COLORS.text : COLORS.border}`,
            background: subTab === t.id ? COLORS.text : "transparent",
            color: subTab === t.id ? "#fff" : COLORS.textMuted,
            fontSize: 13, fontWeight: 600, transition: "all 150ms",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Working Spaces Map */}
      {subTab === "map" && <WorkingSpacesMap />}

      {/* Reserve a Space */}
      {subTab === "reserve" && (
        <div>
          {/* Date bar */}
          <div style={{ background: COLORS.surface, border: `0.5px solid ${COLORS.border}`, borderRadius: 16, padding: "14px 18px", marginBottom: 20 }}>
            <div role="group" aria-label="Select day" style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", color: COLORS.textMuted, fontWeight: 600 }}>Select date</span>
              <button aria-label="Previous week"
                onClick={() => setWeekStart(d => _addDays(d, -7))}
                style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", color: COLORS.text }}>‹</button>
              <span style={{ fontSize: 13, fontWeight: 500, minWidth: 72 }}>{monthLabel}</span>
              <button aria-label="Next week"
                onClick={() => setWeekStart(d => _addDays(d, 7))}
                style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${COLORS.border}`, background: COLORS.surface, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit", color: COLORS.text }}>›</button>
              <button
                onClick={todayBtnActive ? () => { setSelectedDate(today); setWeekStart(_getWeekStart()); } : undefined}
                style={{ marginLeft: "auto", padding: "4px 13px", borderRadius: 999, fontSize: 11, fontWeight: 600,
                  border: `1px solid ${COLORS.border}`, background: COLORS.surface,
                  cursor: todayBtnActive ? "pointer" : "default", color: COLORS.text,
                  opacity: todayBtnActive ? 1 : 0.35, pointerEvents: todayBtnActive ? "auto" : "none", fontFamily: "inherit" }}>Today</button>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {days.map(d => {
                const k = _fmtISO(d);
                const isTod = _isToday(d);
                const isSel = _isSameDay(d, selectedDate);
                const hasDot = bookedDates.has(k);
                return (
                  <button key={k} aria-pressed={isSel} onClick={() => setSelectedDate(d)}
                    style={{ flex: 1, padding: "7px 0 10px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
                      border: isSel ? `2px solid ${COLORS.text}` : `1.5px solid ${COLORS.border}`,
                      background: isTod ? "#e8e6e0" : COLORS.surface,
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 2, position: "relative" }}>
                    <span style={{ fontSize: 10, color: COLORS.textMuted, fontWeight: 500 }}>{_fmtDow(d)}</span>
                    <span style={{ fontSize: 14, fontWeight: isSel ? 700 : 500, color: COLORS.text }}>{_fmtDay(d)}</span>
                    {hasDot && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#d4a847", position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)" }} />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Two-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "200px minmax(0,1fr)", gap: 20, alignItems: "start" }}>
            {/* Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Filter */}
              <div style={{ background: COLORS.surface, border: `0.5px solid ${COLORS.border}`, borderRadius: 16, padding: "14px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Space type</div>
                {SPACE_FILTERS.map(f => {
                  const count = f.id === "all" ? SPACES_DATA.length : SPACES_DATA.filter(s => s.stype === f.id).length;
                  const active = spaceFilter === f.id;
                  return (
                    <button key={f.id} onClick={() => setSpaceFilter(f.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, border: "none", cursor: "pointer", background: active ? "#f3f4f6" : "transparent", marginBottom: 2, fontFamily: "inherit" }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: f.dot, flexShrink: 0 }} />
                      <span style={{ flex: 1, fontSize: 12, fontWeight: active ? 600 : 400, color: COLORS.text, textAlign: "left" }}>{f.label}</span>
                      <span style={{ fontSize: 11, color: COLORS.textMuted }}>{count}</span>
                    </button>
                  );
                })}
              </div>

              {/* My bookings */}
              <div style={{ background: COLORS.surface, border: `0.5px solid ${COLORS.border}`, borderRadius: 16, padding: "14px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>My bookings</div>
                {myBookingsList.length === 0 ? (
                  <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>No upcoming bookings.</div>
                ) : myBookingsList.map(b => (
                  <div key={b.key} style={{ borderLeft: "3px solid #d4a847", paddingLeft: 10, marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: COLORS.text }}>{b.spaceName}</div>
                    <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 2 }}>{b.dateKey} · {b.slot}</div>
                    <button onClick={() => { const nb = {...bookings}; delete nb[b.key]; setBookings(nb); setToast("Reservation cancelled."); }}
                      style={{ marginTop: 4, fontSize: 11, color: "#991b1b", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>Cancel</button>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div style={{ background: COLORS.surface, border: `0.5px solid ${COLORS.border}`, borderRadius: 16, padding: "14px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.text, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>Legend</div>
                {[
                  { label: "Available",    bg: COLORS.surface, border: "#e5e7eb", color: COLORS.text },
                  { label: "Taken",        bg: "#f3f4f6",      border: "#e5e7eb", color: "#9ca3af" },
                  { label: "Your booking", bg: "#F5A623",      border: "#d4a847", color: "#412402" },
                ].map(l => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                    <div style={{ width: 38, height: 22, borderRadius: 5, background: l.bg, border: `1px solid ${l.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 9, color: l.color, fontWeight: 600 }}>slot</div>
                    <span style={{ fontSize: 11, color: COLORS.text }}>{l.label}</span>
                  </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                  <div style={{ width: 38, height: 22, borderRadius: 5, background: COLORS.surface, border: `1.5px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#d4a847", position: "absolute", bottom: 3 }} />
                  </div>
                  <span style={{ fontSize: 11, color: COLORS.text }}>Day has booking</span>
                </div>
              </div>
            </div>

            {/* Space cards */}
            <div style={{ minWidth: 0 }}>
              {filteredSpaces.map(space => (
                <SpaceCard key={space.id} space={space} dateKey={dateKey} dateLabel={dateLabel}
                  bookings={bookings} setBookings={setBookings}
                  openId={openId} setOpenId={setOpenId} setToast={setToast} />
              ))}
            </div>
          </div>
        </div>
      )}

      {toast && <MeetingToast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

// ============================================================
// MAIN CONTAINER
// ============================================================

function MyDeskApp() {
  const [activeTab, setActiveTab] = React.useState("overview");
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(null);

  const tabs = [
    { id: "overview",    label: "Overview" },
    { id: "my-menu",     label: "My Menu" },
    { id: "my-tools",    label: "My Tools" },
    { id: "files",       label: "Files" },
    { id: "bookmarks",   label: "Bookmarks" },
    { id: "my-meetings", label: "My Meetings" },
  ];

  return (
    <div className="desk-page" style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "Nunito, Poppins, 'Segoe UI', sans-serif" }}>

      {/* Persistent page header */}
      <div style={{ padding: "32px 60px 0 60px", background: "#fff" }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.text, marginBottom: 4, fontFamily: "Nunito, Poppins, sans-serif" }}>
          My Desk
        </div>
        <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 20 }}>
          Your personal workspace — lunch menu, tools, files, and bookmarks.
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ padding: "0 60px", background: "#fff", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", gap: 24 }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "12px 0",
                border: "none",
                background: "transparent",
                color: activeTab === tab.id ? COLORS.text : COLORS.textMuted,
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 700 : 500,
                cursor: "pointer",
                borderBottom: activeTab === tab.id ? `3px solid ${COLORS.darkGreen}` : "3px solid transparent",
                transition: "color 0.15s, border-color 0.15s",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.text; }}
              onMouseLeave={(e) => { if (activeTab !== tab.id) e.currentTarget.style.color = COLORS.textMuted; }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div style={{ padding: "48px 60px" }}>
        {activeTab === "overview" && (
          <MyOverviewPage selectedMenuItem={selectedMenuItem} onSwitchTab={setActiveTab} />
        )}
        {activeTab === "my-menu" && (
          <MyMenuPage selectedItem={selectedMenuItem} onSelectItem={setSelectedMenuItem} />
        )}
        {activeTab === "my-tools" && <MyToolsPage />}
        {activeTab === "files" && <MyFilesPage />}
        {activeTab === "bookmarks" && <MyBookmarksPage />}
        {activeTab === "my-meetings" && <MyMeetingsPage />}
      </div>
    </div>
  );
}

/* ─── EXPORTS ──────────────────────────────────────────────────────── */

window.MyDeskApp = MyDeskApp;
window.MyMenuPage = MyMenuPage;
window.MyToolsPage = MyToolsPage;
window.MyFilesPage = MyFilesPage;
window.MyBookmarksPage = MyBookmarksPage;
window.renderRoute_my_desk = ({ segments, navigate, tweaks }) => <MyDeskApp />;

window.LINKS_TOOLS = TOOLS;
window.LINKS_TOOL_ICONS = ICON_COMPONENTS;
window.LINKS_FAV_TOOLS_KEY = FAV_TOOLS_KEY;

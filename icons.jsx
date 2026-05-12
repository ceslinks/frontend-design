// LINKS — Icon set (Lucide-backed shim)
//
// All existing call sites use <I.Foo size={N} color="..." strokeWidth={N} style={{}} />.
// We keep that surface, but render Lucide's icon data via inline React SVG so the
// portal uses the same icon family the design system documents.
//
// The vanilla `lucide` UMD attaches every icon as window.lucide.icons[Name],
// where each entry is [tagName, attrs, children[]] — a tiny AST we can render.

(function () {
  const L = window.lucide;
  if (!L || !L.icons) {
    console.error("[icons.jsx] window.lucide.icons not found — load lucide UMD before icons.jsx");
    window.I = new Proxy({}, { get: () => () => null });
    window.Icon = () => null;
    return;
  }
  const ICONS = L.icons;

  // Lucide ICON names use PascalCase. Map our portal names → Lucide names,
  // with fallbacks where naming has shifted across versions.
  const MAP = {
    Home: ["House", "Home"],
    Time: "Clock4",
    Desk: "LayoutGrid",
    Classes: "BookOpen",
    Work: "ClipboardList",
    Progress: "TrendingUp",
    Tools: "Wrench",
    Team: "Users",
    Materials: "FolderOpen",
    Portfolio: "Briefcase",
    Messages: "MessageSquare",
    Sparkle: "Sparkles",
    Search: "Search",
    Bell: "Bell",
    Settings: "Settings",
    ChevronDown: "ChevronDown",
    ChevronUp: "ChevronUp",
    ChevronRight: "ChevronRight",
    ChevronLeft: "ChevronLeft",
    Plus: "Plus",
    Check: "Check",
    Circle: "Circle",
    CircleCheck: ["CircleCheck", "CheckCircle2"],
    X: "X",
    Calendar: "Calendar",
    Clock: "Clock",
    Book: "Book",
    Edit: ["SquarePen", "Pencil"],
    External: "ExternalLink",
    ArrowRight: "ArrowRight",
    ArrowUpRight: "ArrowUpRight",
    TrendUp: "TrendingUp",
    Target: "Target",
    Eye: "Eye",
    EyeOff: "EyeOff",
    Send: "Send",
    Mic: "Mic",
    Filter: "Filter",
    Pin: "Pin",
    Help: ["CircleHelp", "HelpCircle"],
    Sun: "Sun",
    Folder: "Folder",
    Star: "Star",
    Inbox: "Inbox",
    User: "User",
    Lock: "Lock",
    Shield: "Shield",
    Heart: "Heart",
    Flame: "Flame",
    PlayCircle: ["CirclePlay", "PlayCircle"],
    Quote: "Quote",
    ListChecks: "ListChecks",
    Lightbulb: "Lightbulb",
    ChartBar: "BarChart3",
    PaperPlane: "Send",
    Briefcase: "Briefcase",
    Refresh: "RefreshCw",
    Pause: "Pause",
    Atom: "Atom",
    Calculator: "Calculator",
    Calculator2: "Calculator",
    Notes: "NotebookPen",
    Trophy: "Trophy",
    School: "School",
    Lamp: "Lamp",
    Phone: "Phone",
    Video: "Video",
    Info: "Info",
    Paperclip: "Paperclip",
    Smile: "Smile",
    Image: "Image",
    Reply: "Reply",
    Forward: "Forward",
    Archive: "Archive",
    CalendarOff: ["CalendarOff", "CalendarX2", "CalendarX"],
    ListTodo: ["ListTodo", "ListChecks", "List"],
    Trash: ["Trash2", "Trash"],
    MoreH: ["MoreHorizontal", "Ellipsis"],
    Mail: "Mail",
    Compose: ["PenLine", "PenSquare"],
    Document: "FileText",
    Hashtag: "Hash",
    Soccer: "Trophy",
    Globe: "Globe",
    Bookmark: "Bookmark",
    AtSign: "AtSign",
    MessageCircle: "MessageCircle",
    MapPin: "MapPin",
    LinkOut: "ExternalLink",
    Link: "Link",
    Maximize: "Maximize2",
    Minimize: "Minimize2",
    Download: "Download",
    Upload: "Upload",
    GridView: "LayoutGrid",
    ListView: ["List", "AlignJustify"],
    Flag: "Flag",
    Camera: "Camera",
    CameraOff: "CameraOff",
    MicOff: "MicOff",
    Hand: "Hand",
    PhoneOff: "PhoneOff",
    Screen: ["Monitor", "MonitorPlay"],
    ThumbsUp: "ThumbsUp",
    ThumbsDown: "ThumbsDown",
    Wand: ["WandSparkles", "Wand2", "Wand"],
    HardDrive: "HardDrive",
    PieChart: "PieChart",
    Speaker: ["Volume2", "Speaker"],
    Scratchpad: "NotebookPen",
    Wifi: "Wifi",
    BarChart: ["BarChart3", "BarChart"],
    MessageSquare: "MessageSquare",
    Walk: ["Footprints", "PersonStanding"],
    Plug: ["Plug", "Plug2", "PlugZap"],
    Printer: "Printer",
    Layers: "Layers",
    Navigation: "Navigation",
    Box: "Box",
    Share: ["Share2", "Share"],
    File: ["File", "FileText"],
    FileText: "FileText",
  };

  // Pick the first available Lucide icon name from a list of candidates.
  const pickIcon = (val) => {
    const list = Array.isArray(val) ? val : [val];
    for (const n of list) if (ICONS[n]) return ICONS[n];
    return null;
  };

  // Render one Lucide AST node as React. Lucide nodes look like
  //   ["circle", { cx: 12, cy: 12, r: 10 }, []]
  // ICONS[name] is itself the root node array.
  const renderNode = (node, key) => {
    if (!Array.isArray(node)) return null;
    const [tag, attrs = {}, children = []] = node;
    return React.createElement(
      tag,
      { ...attrs, key },
      Array.isArray(children) ? children.map((c, i) => renderNode(c, i)) : null
    );
  };

  // Build an I.Name component from a Lucide icon root.
  const makeIcon = (root, fallbackName) => {
    if (!root) {
      // Tiny dot placeholder so missing icons don't break layout.
      return ({ size = 18, color = "currentColor", style }) => (
        <svg width={size} height={size} viewBox="0 0 24 24" style={style}
             role="img" aria-label={fallbackName}>
          <circle cx="12" cy="12" r="3" fill={color} opacity="0.5"/>
        </svg>
      );
    }
    const [, , children = []] = root;
    return ({ size = 18, color = "currentColor", strokeWidth = 1.6, style, className }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={style}
        className={className}
      >
        {children.map((c, i) => renderNode(c, i))}
      </svg>
    );
  };

  const rawI = {};
  for (const [key, val] of Object.entries(MAP)) {
    rawI[key] = makeIcon(pickIcon(val), key);
  }

  // Proxy so I[anyName] always returns a valid component. If `name` isn't in
  // our MAP, try the Lucide PascalCase name directly (e.g. I.File → ICONS.File);
  // if that also misses, fall back to a placeholder dot so the page never crashes
  // from an undefined component.
  const I = new Proxy(rawI, {
    get(target, prop) {
      if (prop in target) return target[prop];
      if (typeof prop !== "string") return undefined;
      // Try direct Lucide lookup (PascalCase) and a couple of common variants.
      const candidates = [
        prop,
        prop.charAt(0).toUpperCase() + prop.slice(1),
      ];
      for (const n of candidates) {
        if (ICONS[n]) {
          const Comp = makeIcon(ICONS[n], n);
          target[prop] = Comp; // memoize
          return Comp;
        }
      }
      console.warn(`[icons.jsx] Unknown icon "${prop}" — rendering placeholder`);
      const Placeholder = makeIcon(null, prop);
      target[prop] = Placeholder;
      return Placeholder;
    },
  });

  // Generic <Icon name="…" /> for cases that pre-pick a Lucide icon name.
  const Icon = ({ name, size = 18, color = "currentColor", strokeWidth = 1.6, style }) => {
    const Comp = makeIcon(ICONS[name], name);
    return <Comp size={size} color={color} strokeWidth={strokeWidth} style={style}/>;
  };

  window.I = I;
  window.Icon = Icon;
})();

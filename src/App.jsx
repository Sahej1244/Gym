import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Flame, Dumbbell, Camera, MessageCircle, Sparkles, TrendingUp,
  Settings, X, Plus, Check, Lock, Crown, ChevronRight, ChevronLeft,
  Upload, Send, Loader2, Utensils, Beef, Wheat, Droplet, Scale,
  ClipboardList, LayoutGrid, Wand2, Trash2, Info, Search as SearchIcon
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Fonts + base styles                                                */
/* ------------------------------------------------------------------ */
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700;9..144,900&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
    .ds-root, .ds-root * { font-family: 'Space Grotesk', sans-serif; }
    .ds-display { font-family: 'Fraunces', serif; }
    .ds-mono { font-family: 'JetBrains Mono', monospace; }
    .ds-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
    .ds-scrollbar::-webkit-scrollbar-thumb { background: #3a4560; border-radius: 4px; }
    .ds-scrollbar::-webkit-scrollbar-track { background: transparent; }
    @keyframes ds-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .ds-rise { animation: ds-rise 0.35s ease both; }
    @keyframes ds-pop { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    .ds-pop { animation: ds-pop 0.25s ease both; }
    input[type="range"].ds-slider { -webkit-appearance: none; appearance: none; height: 4px; border-radius: 4px; background: #3a4560; }
    input[type="range"].ds-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #FF6B35; border: 3px solid #F1ECDE; cursor: pointer; margin-top: -7px; }
    input[type="range"].ds-slider::-webkit-slider-runnable-track { height: 4px; border-radius: 4px; }
    @keyframes ds-confetti { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(220px) rotate(540deg); opacity: 0; } }
    .ds-confetti-piece { position: absolute; top: 0; animation: ds-confetti 1.1s cubic-bezier(.25,.8,.35,1) forwards; }
    @keyframes ds-select-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,107,53,0.45); } 100% { box-shadow: 0 0 0 8px rgba(255,107,53,0); } }
    .ds-select-pulse { animation: ds-select-pulse 0.5s ease-out; }
    button { -webkit-tap-highlight-color: transparent; }
    .ds-tap { transition: transform 0.12s ease; }
    .ds-tap:active { transform: scale(0.96); }
    .ds-file-overlay { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; }
    .ds-viewport { width: 100%; min-height: 100vh; min-height: 100dvh; display: flex; flex-direction: column; }
    html, body { height: 100%; }

    /* -- generated color/utility classes (this sandbox only supports pre-defined Tailwind
       classes, not arbitrary bracket values, so every custom color lives here as real CSS) -- */
    .ds-active-border-line2:active { border-color: #4a5a80; }
    .ds-aspect-34 { aspect-ratio: 3 / 4; }
    .ds-bg-card { background-color: #1B2C4A; }
    .ds-bg-card-70 { background-color: rgba(27, 44, 74, 0.7); }
    .ds-bg-gold { background-color: #FFC53D; }
    .ds-bg-gold-15 { background-color: rgba(255, 197, 61, 0.15); }
    .ds-bg-ink { background-color: #12213A; }
    .ds-bg-ink-95 { background-color: rgba(18, 33, 58, 0.95); }
    .ds-bg-line { background-color: #2A3A5C; }
    .ds-bg-shell { background-color: #0E1830; }
    .ds-bg-signal { background-color: #FF6B35; }
    .ds-bg-signal-10 { background-color: rgba(255, 107, 53, 0.1); }
    .ds-bg-teal { background-color: #2EC4B6; }
    .ds-border-gold-30 { border-color: rgba(255, 197, 61, 0.3); }
    .ds-border-gold-40 { border-color: rgba(255, 197, 61, 0.4); }
    .ds-border-line { border-color: #2A3A5C; }
    .ds-border-line2 { border-color: #4a5a80; }
    .ds-border-signal { border-color: #FF6B35; }
    .ds-border-teal { border-color: #2EC4B6; }
    .ds-focus-border-signal:focus { border-color: #FF6B35; }
    .ds-focus-border-teal:focus { border-color: #2EC4B6; }
    .ds-grad-card-card2 { background-image: linear-gradient(to bottom right, #1B2C4A, #22335A); }
    .ds-leading-105 { line-height: 1.05; }
    .ds-text-10px { font-size: 10px; }
    .ds-text-11px { font-size: 11px; }
    .ds-text-gold { color: #FFC53D; }
    .ds-text-ink { color: #12213A; }
    .ds-text-muted { color: #8B93A7; }
    .ds-text-muted-60 { color: rgba(139, 147, 167, 0.6); }
    .ds-text-muted-70 { color: rgba(139, 147, 167, 0.7); }
    .ds-text-paper { color: #F1ECDE; }
    .ds-text-paper-60 { color: rgba(241, 236, 222, 0.6); }
    .ds-text-paper-70 { color: rgba(241, 236, 222, 0.7); }
    .ds-text-paper-80 { color: rgba(241, 236, 222, 0.8); }
    .ds-text-paper-90 { color: rgba(241, 236, 222, 0.9); }
    .ds-text-signal { color: #FF6B35; }
    .ds-text-teal { color: #2EC4B6; }
    .ds-tracking-02em { letter-spacing: 0.2em; }
    .ds-w-85 { width: 85%; }.ds-grad-ink-transparent { background-image: linear-gradient(to top, #12213A, transparent); }
    .ds-overlay { background-color: rgba(0,0,0,0.55); }
  `}</style>
);

/* ------------------------------------------------------------------ */
/*  Confetti burst — short-lived celebratory particles                 */
/* ------------------------------------------------------------------ */
function Confetti({ trigger }) {
  const [pieces, setPieces] = useState([]);
  useEffect(() => {
    if (!trigger) return;
    const colors = [C.signal, C.teal, C.gold, "#F1ECDE"];
    const arr = Array.from({ length: 18 }, (_, i) => ({
      id: `${trigger}-${i}`,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 0.15,
      size: 5 + Math.random() * 5,
      color: colors[i % colors.length],
      rotate: Math.random() * 360,
    }));
    setPieces(arr);
    const t = setTimeout(() => setPieces([]), 1300);
    return () => clearTimeout(t);
  }, [trigger]);

  if (pieces.length === 0) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 h-0 z-50 overflow-visible">
      {pieces.map((p) => (
        <span key={p.id} className="ds-confetti-piece" style={{
          left: `${p.left}%`, width: p.size, height: p.size * 0.6, background: p.color,
          animationDelay: `${p.delay}s`, borderRadius: 2, transform: `rotate(${p.rotate}deg)`,
        }} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ModalPortal — renders sheets/modals directly onto document.body.   */
/*  This is deliberate: any ancestor with overflow:auto/hidden (like    */
/*  the scrollable tab container) can clip or break interaction with   */
/*  absolutely/fixed-positioned descendants in some browsers. Portaling */
/*  straight to <body> sidesteps that whole class of bug for good.     */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  Persistence — this is a real deployed site (not the Claude artifact */
/*  sandbox), so localStorage is the right call for MVP-stage storage.  */
/*  Swap this for real backend + database once you have signed-up users */
/*  who need their data to follow them across devices.                  */
/* ------------------------------------------------------------------ */
function usePersistentState(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Storage full or unavailable (e.g. private browsing) — fail silently,
      // the app still works, it just won't persist between sessions.
    }
  }, [key, state]);

  return [state, setState];
}

function ModalPortal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

/* ------------------------------------------------------------------ */
/*  Palette (reference only, used via inline styles / tailwind arbitrary) */
/* ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ */
/*  Build tier — this is the ONLY line that differs between the        */
/*  Free-tier build and the Premium-tier build of this file.           */
/* ------------------------------------------------------------------ */
// Premium status is a normal piece of state now — in production this should be set
// from your backend after verifying a real subscription (Stripe on web, or
// StoreKit/Play Billing in a wrapped mobile app). See README.md.

const C = {
  ink: "#12213A",
  inkSoft: "#1B2C4A",
  paper: "#F1ECDE",
  paperDim: "#E7E0CC",
  signal: "#FF6B35",
  teal: "#2EC4B6",
  muted: "#8B93A7",
  gold: "#FFC53D",
};

/* ------------------------------------------------------------------ */
/*  Domain constants                                                   */
/* ------------------------------------------------------------------ */
const ACTIVITY = [
  { id: "sedentary", label: "Sedentary", desc: "Desk job, little exercise", mult: 1.2 },
  { id: "light", label: "Lightly active", desc: "Exercise 1–3 days/week", mult: 1.375 },
  { id: "moderate", label: "Moderately active", desc: "Exercise 3–5 days/week", mult: 1.55 },
  { id: "active", label: "Very active", desc: "Exercise 6–7 days/week", mult: 1.725 },
  { id: "athlete", label: "Athlete", desc: "Training twice a day", mult: 1.9 },
];

const GOALS = [
  { id: "lose", label: "Lose weight", desc: "Steady fat loss, keep strength", icon: TrendingUp },
  { id: "gain", label: "Gain muscle", desc: "Build size and strength", icon: Dumbbell },
  { id: "maintain", label: "Maintain weight", desc: "Stay consistent, get fitter", icon: Scale },
  { id: "recomp", label: "Recomposition", desc: "Lose fat, build muscle at once", icon: Sparkles },
];

const EXPERIENCE = [
  { id: "beginner", label: "Beginner", desc: "New to structured training" },
  { id: "intermediate", label: "Intermediate", desc: "6+ months consistent training" },
  { id: "advanced", label: "Advanced", desc: "2+ years, knows their body" },
];

const TIPS = [
  "Protein at every meal keeps you fuller for longer — aim for 20–40g per sitting.",
  "Progress isn't linear. A flat week on the scale doesn't mean a flat week of progress.",
  "Sleep is a training variable. 7+ hours changes how recovered you feel tomorrow.",
  "Walking 8–10k steps daily can move the needle as much as an extra gym session.",
  "Track trends, not days. Weigh in, then look at your 7-day average.",
  "Strength holds while dieting is a win — it means you're keeping the muscle you built.",
  "Hydration affects performance more than most people expect. Start the day with water.",
];

const WORKOUT_LIBRARY = {
  beginner: {
    lose: ["Full Body Circuit A", "Brisk Walk / Zone 2", "Full Body Circuit B", "Rest / Mobility", "Full Body Circuit A", "Active Recovery Walk", "Rest"],
    gain: ["Upper Body A", "Lower Body A", "Rest", "Upper Body B", "Lower Body B", "Rest", "Rest"],
    maintain: ["Full Body A", "Cardio / Mobility", "Full Body B", "Rest", "Full Body C", "Light Cardio", "Rest"],
    recomp: ["Full Body Strength A", "Zone 2 Cardio", "Full Body Strength B", "Rest", "Full Body Strength C", "Light Cardio", "Rest"],
  },
  intermediate: {
    lose: ["Upper Push/Pull", "HIIT Intervals", "Lower Body", "Rest", "Full Body Strength", "Steady Cardio", "Rest"],
    gain: ["Push (Chest/Shoulders/Tri)", "Pull (Back/Bi)", "Legs", "Rest", "Upper Body Hypertrophy", "Lower Body Hypertrophy", "Rest"],
    maintain: ["Push", "Pull", "Legs", "Rest", "Full Body", "Cardio + Core", "Rest"],
    recomp: ["Push (Strength)", "Pull (Strength)", "Legs (Strength)", "Zone 2 Cardio", "Upper Hypertrophy", "Lower Hypertrophy", "Rest"],
  },
  advanced: {
    lose: ["Upper Strength", "HIIT + Core", "Lower Strength", "Conditioning", "Upper Hypertrophy", "Lower Hypertrophy", "Active Recovery"],
    gain: ["Chest/Triceps", "Back/Biceps", "Legs/Quads", "Shoulders/Arms", "Legs/Posterior Chain", "Weak Point Training", "Rest"],
    maintain: ["Push", "Pull", "Legs", "Upper Accessory", "Lower Accessory", "Conditioning", "Rest"],
    recomp: ["Upper Strength", "Lower Strength", "Zone 2", "Upper Hypertrophy", "Lower Hypertrophy", "Conditioning", "Rest"],
  },
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ------------------------------------------------------------------ */
/*  Exercise library — searchable, and used to suggest what to do      */
/*  on a given training day based on the session label.                */
/* ------------------------------------------------------------------ */
const EXERCISE_POOLS = {
  chest: [
    { name: "Barbell Bench Press", target: "3 × 8" },
    { name: "Incline Dumbbell Press", target: "3 × 10" },
    { name: "Push-up", target: "3 × 15" },
    { name: "Cable Chest Fly", target: "3 × 12" },
    { name: "Decline Push-up", target: "3 × 12" },
    { name: "Dumbbell Bench Press", target: "3 × 10" },
    { name: "Chest Dip", target: "3 × 10" },
    { name: "Machine Chest Press", target: "3 × 12" },
    { name: "Incline Cable Fly", target: "3 × 12" },
  ],
  back: [
    { name: "Pull-up", target: "3 × 8" },
    { name: "Barbell Bent-over Row", target: "3 × 10" },
    { name: "Lat Pulldown", target: "3 × 10" },
    { name: "Seated Cable Row", target: "3 × 12" },
    { name: "Chin-up", target: "3 × 8" },
    { name: "Single-arm Dumbbell Row", target: "3 × 10/side" },
    { name: "Straight-arm Pulldown", target: "3 × 12" },
    { name: "Inverted Row", target: "3 × 12" },
    { name: "T-Bar Row", target: "3 × 10" },
    { name: "Deadlift", target: "3 × 6" },
  ],
  shoulders: [
    { name: "Overhead Shoulder Press", target: "3 × 10" },
    { name: "Dumbbell Lateral Raise", target: "3 × 15" },
    { name: "Arnold Press", target: "3 × 10" },
    { name: "Face Pull", target: "3 × 15" },
    { name: "Reverse Fly", target: "3 × 15" },
    { name: "Front Raise", target: "3 × 12" },
    { name: "Upright Row", target: "3 × 12" },
    { name: "Pike Push-up", target: "3 × 10" },
  ],
  biceps: [
    { name: "Dumbbell Bicep Curl", target: "3 × 12" },
    { name: "Hammer Curl", target: "3 × 12" },
    { name: "Barbell Curl", target: "3 × 10" },
    { name: "Concentration Curl", target: "3 × 12/side" },
    { name: "Preacher Curl", target: "3 × 10" },
    { name: "Cable Curl", target: "3 × 12" },
  ],
  triceps: [
    { name: "Tricep Dip", target: "3 × 12" },
    { name: "Tricep Pushdown", target: "3 × 15" },
    { name: "Close-grip Bench Press", target: "3 × 10" },
    { name: "Overhead Tricep Extension", target: "3 × 12" },
    { name: "Skull Crushers", target: "3 × 10" },
    { name: "Bench Dip", target: "3 × 15" },
  ],
  legs: [
    { name: "Back Squat", target: "4 × 8" },
    { name: "Romanian Deadlift", target: "3 × 10" },
    { name: "Walking Lunges", target: "3 × 12/side" },
    { name: "Leg Press", target: "3 × 12" },
    { name: "Leg Curl", target: "3 × 12" },
    { name: "Standing Calf Raise", target: "4 × 15" },
    { name: "Front Squat", target: "3 × 8" },
    { name: "Bulgarian Split Squat", target: "3 × 10/side" },
    { name: "Hip Thrust", target: "3 × 12" },
    { name: "Leg Extension", target: "3 × 15" },
    { name: "Goblet Squat", target: "3 × 12" },
    { name: "Step-ups", target: "3 × 12/side" },
    { name: "Seated Calf Raise", target: "4 × 15" },
    { name: "Hack Squat", target: "3 × 10" },
  ],
  fullBody: [
    { name: "Kettlebell Swing", target: "3 × 15" },
    { name: "Burpees", target: "3 × 12" },
    { name: "Dumbbell Thruster", target: "3 × 10" },
    { name: "Farmer's Carry", target: "3 × 30s" },
    { name: "Clean and Press", target: "3 × 8" },
    { name: "Turkish Get-up", target: "3 × 5/side" },
    { name: "Battle Ropes", target: "4 × 30s" },
    { name: "Sled Push", target: "4 × 20m" },
    { name: "Man Makers", target: "3 × 10" },
    { name: "Wall Balls", target: "3 × 15" },
    { name: "Box Jumps", target: "3 × 10" },
  ],
  cardio: [
    { name: "Running", target: "20–30 min" },
    { name: "Cycling", target: "25–35 min" },
    { name: "Rowing Machine", target: "15–20 min" },
    { name: "Jump Rope", target: "10 min intervals" },
    { name: "Stair Climber", target: "15 min" },
    { name: "Brisk Walk", target: "30–45 min" },
    { name: "Elliptical", target: "20–30 min" },
    { name: "Swimming", target: "20–30 min" },
    { name: "Sprint Intervals", target: "8 × 30s" },
    { name: "Incline Treadmill Walk", target: "25 min" },
    { name: "Assault Bike", target: "12–15 min" },
    { name: "Hiking", target: "45–60 min" },
  ],
  core: [
    { name: "Plank", target: "3 × 45s" },
    { name: "Hanging Leg Raise", target: "3 × 12" },
    { name: "Russian Twist", target: "3 × 20" },
    { name: "Bicycle Crunch", target: "3 × 20" },
    { name: "Cable Woodchop", target: "3 × 12/side" },
    { name: "Dead Bug", target: "3 × 12/side" },
    { name: "Side Plank", target: "3 × 30s/side" },
    { name: "Mountain Climbers", target: "3 × 20" },
    { name: "V-ups", target: "3 × 15" },
    { name: "Ab Wheel Rollout", target: "3 × 10" },
    { name: "Flutter Kicks", target: "3 × 30s" },
    { name: "Toe Touches", target: "3 × 15" },
  ],
};

// Flat, searchable list of every exercise with its category label attached.
const EXERCISES = Object.entries(EXERCISE_POOLS).flatMap(([cat, list]) =>
  list.map((e) => ({ ...e, id: `${cat}-${e.name}`, category: cat }))
);

const CATEGORY_LABEL = {
  chest: "Chest", back: "Back", shoulders: "Shoulders", biceps: "Biceps", triceps: "Triceps",
  legs: "Legs", fullBody: "Full Body", cardio: "Cardio", core: "Core",
};
const MUSCLE_FILTERS = ["All", "Chest", "Back", "Shoulders", "Biceps", "Triceps", "Legs", "Core", "Cardio", "Full Body"];

function categoriesForSession(session) {
  const s = session.toLowerCase();
  if (s.includes("rest")) return [];
  const cats = new Set();
  if (s.includes("chest")) cats.add("chest");
  if (s.includes("back")) cats.add("back");
  if (s.includes("shoulder")) cats.add("shoulders");
  if (s.includes("bicep")) cats.add("biceps");
  if (s.includes("tricep")) cats.add("triceps");
  if (s.includes("push")) { cats.add("chest"); cats.add("shoulders"); cats.add("triceps"); }
  if (s.includes("pull")) { cats.add("back"); cats.add("biceps"); }
  if (s.includes("leg") || s.includes("lower") || s.includes("quad") || s.includes("posterior")) cats.add("legs");
  if (s.includes("upper")) { cats.add("chest"); cats.add("back"); cats.add("shoulders"); cats.add("biceps"); cats.add("triceps"); }
  if (s.includes("hiit") || s.includes("cardio") || s.includes("conditioning") || s.includes("zone") || s.includes("walk") || s.includes("steady")) cats.add("cardio");
  if (s.includes("core")) cats.add("core");
  if (s.includes("full body") || s.includes("circuit") || s.includes("accessory") || s.includes("weak point")) cats.add("fullBody");
  if (cats.size === 0) cats.add("fullBody");
  return Array.from(cats);
}

function suggestedExercisesFor(session) {
  const cats = categoriesForSession(session);
  const picked = [];
  const perCat = cats.length > 2 ? 1 : cats.length > 1 ? 2 : 6;
  cats.forEach((cat) => {
    EXERCISE_POOLS[cat].slice(0, perCat).forEach((e) => picked.push({ ...e, category: cat }));
  });
  return picked.slice(0, 6);
}

const CUISINES = ["All", "Breakfast & Snacks", "Indian", "Italian", "Mexican", "Chinese", "Japanese", "Mediterranean", "American", "Thai", "Middle Eastern", "Korean", "Vietnamese", "Spanish", "Ethiopian", "Caribbean", "Brazilian", "German", "French", "Filipino"];

// Naive single-substring search fails on natural queries like "dal and rice" because
// no dish name literally contains that exact phrase. Match word-by-word instead, so
// "chicken rice", "dal and rice", "spicy chicken" etc. all find the right dishes.
const SEARCH_STOPWORDS = new Set(["and", "with", "the", "a", "an", "of", "in", "for", "some", "or"]);
function foodMatchesQuery(item, query) {
  const words = query.toLowerCase().split(/\s+/).filter((w) => w && !SEARCH_STOPWORDS.has(w));
  if (words.length === 0) return true;
  const haystack = `${item.name} ${item.cuisine}`.toLowerCase();
  return words.every((w) => haystack.includes(w));
}

const MEAL_PRESETS = [
  // Indian
  { name: "Paneer tikka + brown rice", cuisine: "Indian", cal: 480, protein: 30, carbs: 46, fat: 18, veg: true },
  { name: "Tandoori chicken + dal + roti", cuisine: "Indian", cal: 560, protein: 46, carbs: 52, fat: 16, veg: false },
  { name: "Chickpea chana masala + rice", cuisine: "Indian", cal: 440, protein: 18, carbs: 70, fat: 10, veg: true },
  { name: "Grilled chicken tikka salad", cuisine: "Indian", cal: 380, protein: 40, carbs: 20, fat: 14, veg: false },
  { name: "Butter chicken + naan", cuisine: "Indian", cal: 640, protein: 38, carbs: 58, fat: 28, veg: false },
  { name: "Rajma (kidney bean curry) + rice", cuisine: "Indian", cal: 450, protein: 19, carbs: 74, fat: 8, veg: true },
  { name: "Egg bhurji + multigrain roti", cuisine: "Indian", cal: 400, protein: 24, carbs: 34, fat: 18, veg: true },
  { name: "Fish curry + steamed rice", cuisine: "Indian", cal: 500, protein: 36, carbs: 52, fat: 16, veg: false },
  // Italian
  { name: "Chicken breast + spaghetti + tomato sauce", cuisine: "Italian", cal: 560, protein: 42, carbs: 62, fat: 12, veg: false },
  { name: "Margherita pizza (2 slices) + side salad", cuisine: "Italian", cal: 520, protein: 22, carbs: 60, fat: 20, veg: true },
  { name: "Caprese salad + grilled shrimp", cuisine: "Italian", cal: 400, protein: 34, carbs: 16, fat: 22, veg: false },
  { name: "Mushroom risotto", cuisine: "Italian", cal: 480, protein: 12, carbs: 68, fat: 16, veg: true },
  { name: "Chicken parmesan + side salad", cuisine: "Italian", cal: 620, protein: 46, carbs: 40, fat: 28, veg: false },
  { name: "Penne arrabbiata + parmesan", cuisine: "Italian", cal: 500, protein: 16, carbs: 78, fat: 14, veg: true },
  // Mexican
  { name: "Chicken tinga tacos (3, corn tortilla)", cuisine: "Mexican", cal: 520, protein: 38, carbs: 48, fat: 18, veg: false },
  { name: "Black bean + veggie burrito bowl", cuisine: "Mexican", cal: 480, protein: 20, carbs: 72, fat: 14, veg: true },
  { name: "Grilled steak fajitas + peppers", cuisine: "Mexican", cal: 540, protein: 44, carbs: 38, fat: 20, veg: false },
  { name: "Shrimp ceviche + tostadas", cuisine: "Mexican", cal: 380, protein: 30, carbs: 34, fat: 12, veg: false },
  { name: "Veggie quesadilla + salsa", cuisine: "Mexican", cal: 460, protein: 18, carbs: 50, fat: 20, veg: true },
  { name: "Chilaquiles with egg", cuisine: "Mexican", cal: 430, protein: 20, carbs: 44, fat: 20, veg: true },
  // Chinese
  { name: "Kung pao chicken + steamed rice", cuisine: "Chinese", cal: 580, protein: 40, carbs: 58, fat: 18, veg: false },
  { name: "Tofu + vegetable stir-fry", cuisine: "Chinese", cal: 410, protein: 26, carbs: 38, fat: 16, veg: true },
  { name: "Beef and broccoli + noodles", cuisine: "Chinese", cal: 610, protein: 40, carbs: 58, fat: 22, veg: false },
  { name: "Mapo tofu + rice", cuisine: "Chinese", cal: 470, protein: 24, carbs: 50, fat: 18, veg: true },
  { name: "Steamed dumplings (8) + chili oil", cuisine: "Chinese", cal: 440, protein: 22, carbs: 52, fat: 16, veg: false },
  { name: "Sweet and sour shrimp + rice", cuisine: "Chinese", cal: 520, protein: 32, carbs: 62, fat: 14, veg: false },
  // Japanese
  { name: "Salmon teriyaki + steamed rice", cuisine: "Japanese", cal: 560, protein: 42, carbs: 50, fat: 18, veg: false },
  { name: "Chicken katsu + cabbage salad", cuisine: "Japanese", cal: 590, protein: 38, carbs: 52, fat: 24, veg: false },
  { name: "Edamame + veggie sushi rolls", cuisine: "Japanese", cal: 420, protein: 18, carbs: 68, fat: 8, veg: true },
  { name: "Miso soup + tofu poke bowl", cuisine: "Japanese", cal: 460, protein: 26, carbs: 52, fat: 16, veg: true },
  { name: "Beef gyudon rice bowl", cuisine: "Japanese", cal: 610, protein: 34, carbs: 68, fat: 20, veg: false },
  { name: "Tempura shrimp + soba noodles", cuisine: "Japanese", cal: 540, protein: 28, carbs: 66, fat: 16, veg: false },
  // Mediterranean
  { name: "Grilled chicken gyro + tzatziki", cuisine: "Mediterranean", cal: 520, protein: 38, carbs: 42, fat: 20, veg: false },
  { name: "Falafel bowl + hummus + pita", cuisine: "Mediterranean", cal: 480, protein: 18, carbs: 62, fat: 18, veg: true },
  { name: "Grilled salmon + quinoa tabbouleh", cuisine: "Mediterranean", cal: 550, protein: 40, carbs: 40, fat: 22, veg: false },
  { name: "Greek yogurt + berries + honey", cuisine: "Mediterranean", cal: 260, protein: 22, carbs: 32, fat: 5, veg: true },
  { name: "Greek salad + grilled chicken", cuisine: "Mediterranean", cal: 420, protein: 36, carbs: 18, fat: 22, veg: false },
  { name: "Stuffed bell peppers with rice", cuisine: "Mediterranean", cal: 400, protein: 14, carbs: 58, fat: 12, veg: true },
  // American
  { name: "Grilled chicken breast + rice + broccoli", cuisine: "American", cal: 520, protein: 48, carbs: 55, fat: 10, veg: false },
  { name: "Turkey burger + sweet potato fries", cuisine: "American", cal: 590, protein: 40, carbs: 52, fat: 22, veg: false },
  { name: "Egg white omelette + avocado toast", cuisine: "American", cal: 390, protein: 28, carbs: 30, fat: 16, veg: true },
  { name: "Protein shake + banana + peanut butter", cuisine: "American", cal: 380, protein: 32, carbs: 38, fat: 12, veg: true },
  { name: "Grilled steak + baked potato + greens", cuisine: "American", cal: 640, protein: 46, carbs: 46, fat: 26, veg: false },
  { name: "BBQ pulled chicken + coleslaw", cuisine: "American", cal: 560, protein: 40, carbs: 48, fat: 20, veg: false },
  { name: "Cottage cheese + pineapple + almonds", cuisine: "American", cal: 320, protein: 26, carbs: 28, fat: 12, veg: true },
  // Thai
  { name: "Thai green curry + jasmine rice (chicken)", cuisine: "Thai", cal: 570, protein: 36, carbs: 56, fat: 20, veg: false },
  { name: "Tofu pad thai", cuisine: "Thai", cal: 490, protein: 20, carbs: 64, fat: 16, veg: true },
  { name: "Shrimp pad see ew", cuisine: "Thai", cal: 520, protein: 32, carbs: 58, fat: 14, veg: false },
  { name: "Thai basil chicken (pad krapow)", cuisine: "Thai", cal: 540, protein: 38, carbs: 50, fat: 18, veg: false },
  { name: "Tom yum soup + jasmine rice", cuisine: "Thai", cal: 380, protein: 22, carbs: 48, fat: 10, veg: false },
  // Middle Eastern
  { name: "Chicken shawarma plate + rice", cuisine: "Middle Eastern", cal: 560, protein: 42, carbs: 52, fat: 18, veg: false },
  { name: "Lentil dal + brown rice", cuisine: "Middle Eastern", cal: 430, protein: 20, carbs: 68, fat: 8, veg: true },
  { name: "Stuffed grape leaves + grilled halloumi", cuisine: "Middle Eastern", cal: 420, protein: 18, carbs: 34, fat: 24, veg: true },
  { name: "Kofta kebab + tabbouleh", cuisine: "Middle Eastern", cal: 520, protein: 36, carbs: 30, fat: 26, veg: false },
  { name: "Fattoush salad + grilled chicken", cuisine: "Middle Eastern", cal: 440, protein: 34, carbs: 28, fat: 20, veg: false },
  // Korean
  { name: "Bibimbap with beef + fried egg", cuisine: "Korean", cal: 610, protein: 38, carbs: 62, fat: 20, veg: false },
  { name: "Kimchi tofu stew + rice", cuisine: "Korean", cal: 440, protein: 24, carbs: 48, fat: 16, veg: true },
  { name: "Korean fried chicken + pickled radish", cuisine: "Korean", cal: 650, protein: 40, carbs: 50, fat: 30, veg: false },
  { name: "Bulgogi beef + steamed rice", cuisine: "Korean", cal: 580, protein: 36, carbs: 56, fat: 20, veg: false },
  { name: "Japchae glass noodles + vegetables", cuisine: "Korean", cal: 460, protein: 14, carbs: 68, fat: 14, veg: true },
  // Vietnamese
  { name: "Chicken pho noodle soup", cuisine: "Vietnamese", cal: 460, protein: 32, carbs: 56, fat: 10, veg: false },
  { name: "Grilled pork banh mi", cuisine: "Vietnamese", cal: 520, protein: 30, carbs: 54, fat: 18, veg: false },
  { name: "Fresh spring rolls + peanut sauce", cuisine: "Vietnamese", cal: 380, protein: 18, carbs: 46, fat: 12, veg: true },
  { name: "Vermicelli noodle bowl + tofu", cuisine: "Vietnamese", cal: 440, protein: 20, carbs: 58, fat: 12, veg: true },
  // Spanish
  { name: "Chicken paella", cuisine: "Spanish", cal: 560, protein: 36, carbs: 62, fat: 16, veg: false },
  { name: "Grilled shrimp + garlic rice", cuisine: "Spanish", cal: 480, protein: 32, carbs: 52, fat: 14, veg: false },
  { name: "Spanish tortilla (potato omelette)", cuisine: "Spanish", cal: 420, protein: 18, carbs: 36, fat: 22, veg: true },
  { name: "Gazpacho + grilled chicken skewers", cuisine: "Spanish", cal: 400, protein: 34, carbs: 24, fat: 16, veg: false },
  // Breakfast & Snacks
  { name: "Oatmeal + banana + almond butter", cuisine: "Breakfast & Snacks", cal: 420, protein: 14, carbs: 58, fat: 16, veg: true },
  { name: "Scrambled eggs (3) + whole wheat toast", cuisine: "Breakfast & Snacks", cal: 380, protein: 24, carbs: 30, fat: 18, veg: true },
  { name: "Protein pancakes + maple syrup", cuisine: "Breakfast & Snacks", cal: 420, protein: 28, carbs: 52, fat: 10, veg: true },
  { name: "Smoothie bowl (berries, banana, granola)", cuisine: "Breakfast & Snacks", cal: 360, protein: 16, carbs: 60, fat: 8, veg: true },
  { name: "Boiled eggs (2) + apple", cuisine: "Breakfast & Snacks", cal: 220, protein: 14, carbs: 20, fat: 10, veg: true },
  { name: "Overnight oats + chia + berries", cuisine: "Breakfast & Snacks", cal: 380, protein: 16, carbs: 56, fat: 12, veg: true },
  { name: "Whey protein bar", cuisine: "Breakfast & Snacks", cal: 220, protein: 20, carbs: 22, fat: 8, veg: true },
  { name: "Mixed nuts (small handful)", cuisine: "Breakfast & Snacks", cal: 200, protein: 6, carbs: 8, fat: 18, veg: true },
  { name: "Rice cakes + peanut butter + banana", cuisine: "Breakfast & Snacks", cal: 320, protein: 10, carbs: 46, fat: 12, veg: true },
  { name: "Cottage cheese + honey + walnuts", cuisine: "Breakfast & Snacks", cal: 300, protein: 24, carbs: 22, fat: 14, veg: true },
  { name: "Turkey and cheese roll-ups", cuisine: "Breakfast & Snacks", cal: 260, protein: 26, carbs: 4, fat: 16, veg: false },
  { name: "Hummus + carrot and cucumber sticks", cuisine: "Breakfast & Snacks", cal: 220, protein: 8, carbs: 24, fat: 11, veg: true },
  { name: "Breakfast burrito (egg, cheese, beans)", cuisine: "Breakfast & Snacks", cal: 480, protein: 24, carbs: 50, fat: 20, veg: true },
  { name: "Apple slices + peanut butter", cuisine: "Breakfast & Snacks", cal: 260, protein: 8, carbs: 30, fat: 14, veg: true },
  // Ethiopian
  { name: "Doro wat (chicken stew) + injera", cuisine: "Ethiopian", cal: 560, protein: 38, carbs: 52, fat: 20, veg: false },
  { name: "Misir wot (spiced lentils) + injera", cuisine: "Ethiopian", cal: 420, protein: 18, carbs: 66, fat: 10, veg: true },
  { name: "Tibs (sautéed beef) + injera", cuisine: "Ethiopian", cal: 540, protein: 40, carbs: 42, fat: 22, veg: false },
  { name: "Shiro (chickpea stew) + injera", cuisine: "Ethiopian", cal: 400, protein: 16, carbs: 58, fat: 12, veg: true },
  // Caribbean
  { name: "Jerk chicken + rice and peas", cuisine: "Caribbean", cal: 560, protein: 42, carbs: 54, fat: 16, veg: false },
  { name: "Curry goat + rice", cuisine: "Caribbean", cal: 580, protein: 40, carbs: 50, fat: 22, veg: false },
  { name: "Ackee and saltfish", cuisine: "Caribbean", cal: 420, protein: 28, carbs: 22, fat: 24, veg: false },
  { name: "Rasta pasta with vegetables", cuisine: "Caribbean", cal: 480, protein: 16, carbs: 68, fat: 16, veg: true },
  // Brazilian
  { name: "Grilled picanha + rice and beans", cuisine: "Brazilian", cal: 620, protein: 44, carbs: 52, fat: 24, veg: false },
  { name: "Feijoada (black bean stew)", cuisine: "Brazilian", cal: 540, protein: 32, carbs: 48, fat: 22, veg: false },
  { name: "Moqueca (fish stew) + rice", cuisine: "Brazilian", cal: 480, protein: 34, carbs: 44, fat: 18, veg: false },
  { name: "Pão de queijo + fruit", cuisine: "Brazilian", cal: 340, protein: 10, carbs: 40, fat: 16, veg: true },
  // German
  { name: "Grilled bratwurst + sauerkraut", cuisine: "German", cal: 520, protein: 26, carbs: 24, fat: 34, veg: false },
  { name: "Schnitzel + potato salad", cuisine: "German", cal: 610, protein: 36, carbs: 48, fat: 28, veg: false },
  { name: "Lentil soup + rye bread", cuisine: "German", cal: 420, protein: 20, carbs: 58, fat: 10, veg: true },
  // French
  { name: "Grilled chicken + ratatouille", cuisine: "French", cal: 460, protein: 38, carbs: 28, fat: 18, veg: false },
  { name: "Niçoise salad with tuna", cuisine: "French", cal: 420, protein: 32, carbs: 22, fat: 20, veg: false },
  { name: "Onion soup + baguette", cuisine: "French", cal: 380, protein: 14, carbs: 48, fat: 14, veg: true },
  { name: "Ratatouille + quinoa", cuisine: "French", cal: 400, protein: 12, carbs: 56, fat: 14, veg: true },
  // Filipino
  { name: "Chicken adobo + rice", cuisine: "Filipino", cal: 560, protein: 38, carbs: 58, fat: 18, veg: false },
  { name: "Pork sinigang (sour soup)", cuisine: "Filipino", cal: 460, protein: 30, carbs: 34, fat: 20, veg: false },
  { name: "Vegetable pancit noodles", cuisine: "Filipino", cal: 440, protein: 14, carbs: 62, fat: 14, veg: true },
  { name: "Grilled tilapia + garlic rice", cuisine: "Filipino", cal: 480, protein: 36, carbs: 46, fat: 16, veg: false },
  // A few more per popular existing cuisine
  { name: "Chicken tikka masala + basmati rice", cuisine: "Indian", cal: 580, protein: 40, carbs: 54, fat: 20, veg: false },
  { name: "Palak paneer + roti", cuisine: "Indian", cal: 460, protein: 22, carbs: 36, fat: 26, veg: true },
  { name: "Chicken alfredo pasta", cuisine: "Italian", cal: 640, protein: 38, carbs: 56, fat: 28, veg: false },
  { name: "Minestrone soup + parmesan", cuisine: "Italian", cal: 340, protein: 14, carbs: 48, fat: 10, veg: true },
  { name: "Carne asada tacos (3)", cuisine: "Mexican", cal: 540, protein: 40, carbs: 42, fat: 20, veg: false },
  { name: "Vegetable fajita bowl", cuisine: "Mexican", cal: 420, protein: 14, carbs: 62, fat: 12, veg: true },
  { name: "Orange chicken + fried rice", cuisine: "Chinese", cal: 620, protein: 34, carbs: 68, fat: 20, veg: false },
  { name: "Vegetable lo mein", cuisine: "Chinese", cal: 460, protein: 14, carbs: 70, fat: 12, veg: true },
  { name: "Chicken ramen bowl", cuisine: "Japanese", cal: 580, protein: 32, carbs: 62, fat: 20, veg: false },
  { name: "Vegetable tempura + rice", cuisine: "Japanese", cal: 460, protein: 12, carbs: 64, fat: 18, veg: true },
  { name: "Grilled lamb chops + hummus", cuisine: "Middle Eastern", cal: 560, protein: 40, carbs: 24, fat: 30, veg: false },
  { name: "Cobb salad with grilled chicken", cuisine: "American", cal: 460, protein: 38, carbs: 16, fat: 26, veg: false },
  { name: "Veggie burger + side salad", cuisine: "American", cal: 460, protein: 20, carbs: 48, fat: 18, veg: true },
];

/* ------------------------------------------------------------------ */
/*  Calculations                                                       */
/* ------------------------------------------------------------------ */
function calcTargets(p) {
  const { age, heightCm, weightKg, gender, activity, goal } = p;
  const bmr = gender === "male"
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  const mult = ACTIVITY.find((a) => a.id === activity)?.mult || 1.2;
  const tdee = bmr * mult;

  let calories = tdee;
  let proteinPerKg = 1.8;
  if (goal === "lose") { calories = tdee - 500; proteinPerKg = 2.0; }
  else if (goal === "gain") { calories = tdee + 300; proteinPerKg = 1.8; }
  else if (goal === "maintain") { calories = tdee; proteinPerKg = 1.6; }
  else if (goal === "recomp") { calories = tdee - 150; proteinPerKg = 2.1; }

  // Safety floor
  const floor = gender === "male" ? 1500 : 1200;
  calories = Math.max(Math.round(calories), floor);

  const protein = Math.round(proteinPerKg * weightKg);
  const fat = Math.round((calories * 0.27) / 9);
  const remaining = calories - protein * 4 - fat * 9;
  const carbs = Math.max(Math.round(remaining / 4), 0);

  return { bmr: Math.round(bmr), tdee: Math.round(tdee), calories, protein, carbs, fat };
}

function generateWorkoutPlan(p) {
  const lib = WORKOUT_LIBRARY[p.experience] || WORKOUT_LIBRARY.beginner;
  const plan = lib[p.goal] || lib.maintain;
  return DAYS.map((d, i) => ({ day: d, session: plan[i] }));
}

function kgFromInput(v, unit) { return unit === "lb" ? v * 0.453592 : v; }
function cmFromInput(v, unit) { return unit === "in" ? v * 2.54 : v; }

/* ------------------------------------------------------------------ */
/*  Small UI atoms                                                     */
/* ------------------------------------------------------------------ */
const Ring = ({ pct, size = 140, stroke = 12, color = C.signal, track = "#2A3A5C" }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, pct));
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeDasharray={c} strokeDashoffset={c * (1 - clamped)} strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
    </svg>
  );
};

const MacroBar = ({ label, icon: Icon, value, target, unit = "g", color }) => {
  const pct = target > 0 ? Math.min(1, value / target) : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 ds-text-paper-80 text-xs">
          <Icon size={13} style={{ color }} />
          <span>{label}</span>
        </div>
        <span className="ds-mono text-xs ds-text-paper-60">{Math.round(value)}/{target}{unit}</span>
      </div>
      <div className="h-1.5 rounded-full ds-bg-line overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${pct * 100}%`, background: color, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`ds-bg-card border ds-border-line rounded-2xl ${className}`}>{children}</div>
);

const PremiumBadge = () => (
  <span className="inline-flex items-center gap-1 ds-text-10px font-semibold ds-mono uppercase tracking-wider px-2 py-0.5 rounded-full ds-bg-gold-15 ds-text-gold border ds-border-gold-30">
    <Crown size={10} /> Premium
  </span>
);

const Paywall = ({ title, desc, onUpgrade }) => (
  <div className="flex flex-col items-center text-center gap-3 py-10 px-6">
    <div className="w-14 h-14 rounded-full ds-bg-gold-15 flex items-center justify-center">
      <Lock size={22} className="ds-text-gold" />
    </div>
    <h3 className="ds-display text-lg ds-text-paper font-semibold">{title}</h3>
    <p className="text-sm ds-text-muted max-w-xs">{desc}</p>
    <button onClick={onUpgrade} className="mt-2 px-5 py-2.5 rounded-full ds-bg-gold ds-text-ink text-sm font-semibold flex items-center gap-1.5">
      <Crown size={14} /> Upgrade to Premium
    </button>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Onboarding                                                         */
/* ------------------------------------------------------------------ */
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [units, setUnits] = useState("metric");
  const [form, setForm] = useState({
    name: "", age: "", heightVal: "", weightVal: "", gender: "",
    activity: "", experience: "", goal: "",
  });

  const steps = ["Welcome", "You", "Body stats", "Activity", "Goal", "Review"];
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const canNext = () => {
    if (step === 1) return form.name.trim().length > 0 && form.age && form.gender;
    if (step === 2) return form.heightVal && form.weightVal;
    if (step === 3) return form.activity && form.experience;
    if (step === 4) return !!form.goal;
    return true;
  };

  const finish = () => {
    const heightCm = Math.round(cmFromInput(parseFloat(form.heightVal), units === "metric" ? "cm" : "in"));
    const weightKg = Math.round(kgFromInput(parseFloat(form.weightVal), units === "metric" ? "kg" : "lb") * 10) / 10;
    const profile = {
      name: form.name.trim(), age: parseInt(form.age, 10), heightCm, weightKg,
      gender: form.gender, activity: form.activity, experience: form.experience, goal: form.goal,
    };
    onComplete(profile);
  };

  return (
    <div className="flex-1 flex flex-col ds-bg-ink ds-text-paper">
      {/* progress */}
      <div className="px-6 pt-8 pb-4">
        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? C.signal : "#2A3A5C" }} />
          ))}
        </div>
      </div>

      <div className="flex-1 px-6 pb-6 overflow-y-auto ds-scrollbar">
        {step === 0 && (
          <div className="h-full flex flex-col justify-center gap-4 ds-rise">
            <div className="ds-mono text-xs ds-tracking-02em ds-text-signal uppercase">Personal coaching, on demand</div>
            <h1 className="ds-display text-5xl font-semibold ds-leading-105">Define<br/>your shape.</h1>
            <p className="ds-text-muted text-sm leading-relaxed max-w-xs">
              A few questions, then DefineShaper builds your calorie targets, macros, workouts and meal plan — and coaches you every day after.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col gap-5 ds-rise">
            <h2 className="ds-display text-2xl font-semibold">Let's get acquainted</h2>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs ds-text-muted">What should we call you?</span>
              <input value={form.name} onChange={(e) => set("name", e.target.value)}
                placeholder="Your name" className="ds-bg-card border ds-border-line rounded-xl px-4 py-3 text-sm outline-none ds-focus-border-signal" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs ds-text-muted">Age</span>
              <input type="number" value={form.age} onChange={(e) => set("age", e.target.value)}
                placeholder="e.g. 28" className="ds-bg-card border ds-border-line rounded-xl px-4 py-3 text-sm outline-none ds-focus-border-signal" />
            </label>
            <div className="flex flex-col gap-1.5">
              <span className="text-xs ds-text-muted">Gender</span>
              <div className="flex gap-2">
                {[{id:"female",label:"Female"},{id:"male",label:"Male"}].map((g) => (
                  <button key={g.id} type="button" onClick={() => set("gender", g.id)} aria-pressed={form.gender === g.id}
                    className={`ds-tap flex-1 py-3 rounded-xl text-sm border-2 ${form.gender === g.id ? "ds-bg-signal ds-border-signal ds-text-ink font-semibold ds-select-pulse" : "ds-bg-card ds-border-line ds-text-paper"}`}>
                    {g.label}
                  </button>
                ))}
              </div>
              <span className="ds-text-10px ds-text-muted-70">Used only for the calorie formula (Mifflin-St Jeor).</span>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-5 ds-rise">
            <div className="flex items-center justify-between">
              <h2 className="ds-display text-2xl font-semibold">Body stats</h2>
              <div className="flex text-xs ds-mono rounded-full ds-bg-card border ds-border-line overflow-hidden">
                {["metric", "imperial"].map((u) => (
                  <button key={u} onClick={() => setUnits(u)} className={`px-3 py-1.5 ${units === u ? "ds-bg-signal ds-text-ink" : "ds-text-muted"}`}>{u}</button>
                ))}
              </div>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs ds-text-muted">Height ({units === "metric" ? "cm" : "inches"})</span>
              <input type="number" value={form.heightVal} onChange={(e) => set("heightVal", e.target.value)}
                placeholder={units === "metric" ? "e.g. 170" : "e.g. 67"} className="ds-bg-card border ds-border-line rounded-xl px-4 py-3 text-sm outline-none ds-focus-border-signal" />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs ds-text-muted">Weight ({units === "metric" ? "kg" : "lb"})</span>
              <input type="number" value={form.weightVal} onChange={(e) => set("weightVal", e.target.value)}
                placeholder={units === "metric" ? "e.g. 68" : "e.g. 150"} className="ds-bg-card border ds-border-line rounded-xl px-4 py-3 text-sm outline-none ds-focus-border-signal" />
            </label>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-5 ds-rise">
            <h2 className="ds-display text-2xl font-semibold">Activity & experience</h2>
            <div className="flex flex-col gap-2">
              <span className="text-xs ds-text-muted">Daily activity level</span>
              {ACTIVITY.map((a) => {
                const selected = form.activity === a.id;
                return (
                  <button key={a.id} type="button" onClick={() => set("activity", a.id)} aria-pressed={selected}
                    className={`ds-tap text-left px-4 py-3 rounded-xl border-2 flex items-center justify-between ${selected ? "ds-bg-signal-10 ds-border-signal ds-select-pulse" : "ds-bg-card ds-border-line"}`}>
                    <div>
                      <div className="text-sm font-medium ds-text-paper">{a.label}</div>
                      <div className="ds-text-11px ds-text-muted">{a.desc}</div>
                    </div>
                    <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selected ? "ds-border-signal ds-bg-signal" : "ds-border-line2"}`}>
                      {selected && <Check size={12} className="ds-text-ink" strokeWidth={3} />}
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <span className="text-xs ds-text-muted">Training experience</span>
              <div className="flex gap-2">
                {EXPERIENCE.map((ex) => (
                  <button key={ex.id} type="button" onClick={() => set("experience", ex.id)} aria-pressed={form.experience === ex.id}
                    className={`ds-tap flex-1 py-2.5 rounded-xl text-xs border-2 ${form.experience === ex.id ? "ds-bg-signal ds-border-signal ds-text-ink font-semibold ds-select-pulse" : "ds-bg-card ds-border-line ds-text-paper"}`}>
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-3 ds-rise">
            <h2 className="ds-display text-2xl font-semibold">What's the goal?</h2>
            <p className="text-xs ds-text-muted -mt-2">Tap one to select it.</p>
            {GOALS.map((g) => {
              const selected = form.goal === g.id;
              return (
                <button key={g.id} type="button" onClick={() => set("goal", g.id)}
                  aria-pressed={selected}
                  className={`ds-tap text-left px-4 py-4 rounded-xl border-2 flex items-center gap-3 ${selected ? "ds-bg-signal-10 ds-border-signal ds-select-pulse" : "ds-bg-card ds-border-line ds-active-border-line2"}`}>
                  <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${selected ? "ds-bg-signal ds-text-ink" : "ds-bg-line ds-text-paper"}`}>
                    <g.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium ds-text-paper">{g.label}</div>
                    <div className="ds-text-11px ds-text-muted">{g.desc}</div>
                  </div>
                  <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${selected ? "ds-border-signal ds-bg-signal" : "ds-border-line2"}`}>
                    {selected && <Check size={12} className="ds-text-ink" strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {step === 5 && (
          <div className="flex flex-col gap-4 ds-rise">
            <h2 className="ds-display text-2xl font-semibold">Looks good, {form.name.split(" ")[0] || "there"}</h2>
            <p className="text-sm ds-text-muted">DefineShaper will calculate your targets and build your first plan now.</p>
            <Card className="p-4 flex flex-col gap-2 ds-mono text-xs ds-text-paper-80">
              <div className="flex justify-between"><span>Age</span><span>{form.age}</span></div>
              <div className="flex justify-between"><span>Height</span><span>{form.heightVal} {units === "metric" ? "cm" : "in"}</span></div>
              <div className="flex justify-between"><span>Weight</span><span>{form.weightVal} {units === "metric" ? "kg" : "lb"}</span></div>
              <div className="flex justify-between"><span>Activity</span><span>{ACTIVITY.find(a=>a.id===form.activity)?.label}</span></div>
              <div className="flex justify-between"><span>Experience</span><span>{EXPERIENCE.find(e=>e.id===form.experience)?.label}</span></div>
              <div className="flex justify-between"><span>Goal</span><span>{GOALS.find(g=>g.id===form.goal)?.label}</span></div>
            </Card>
          </div>
        )}
      </div>

      <div className="px-6 pb-8 pt-2 flex gap-3">
        {step > 0 && (
          <button onClick={() => setStep((s) => s - 1)} className="w-12 h-12 rounded-full ds-bg-card border ds-border-line flex items-center justify-center">
            <ChevronLeft size={18} />
          </button>
        )}
        <button
          disabled={!canNext()}
          onClick={() => (step === steps.length - 1 ? finish() : setStep((s) => s + 1))}
          className="flex-1 rounded-full ds-bg-signal disabled:opacity-40 ds-text-ink font-semibold py-3.5 flex items-center justify-center gap-1.5"
        >
          {step === steps.length - 1 ? "Build my plan" : "Continue"} <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
const Header = ({ title, subtitle, streak, onSettings }) => (
  <div className="px-5 pt-7 pb-4 flex items-start justify-between">
    <div>
      <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-signal uppercase mb-1">{subtitle}</div>
      <h1 className="ds-display text-2xl font-semibold ds-text-paper">{title}</h1>
    </div>
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 ds-bg-card border ds-border-line rounded-full px-3 py-1.5">
        <Flame size={13} className="ds-text-gold" />
        <span className="ds-mono text-xs ds-text-paper">{streak}</span>
      </div>
      <button onClick={onSettings} className="w-9 h-9 rounded-full ds-bg-card border ds-border-line flex items-center justify-center">
        <Settings size={15} className="ds-text-paper" />
      </button>
    </div>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Dashboard                                                          */
/* ------------------------------------------------------------------ */
function greetingWord() {
  const h = new Date().getHours();
  if (h < 5) return "Up late";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good evening";
}

function Dashboard({ profile, targets, todayTotals, weightLog, streak, tip, onSettings, onAddWeight, premium, onUpgrade, workoutPlan, workoutDone, badges }) {
  const consumed = todayTotals.cal;
  const remaining = Math.max(targets.calories - consumed, 0);
  const pct = consumed / targets.calories;
  const todayKey = new Date().toISOString().slice(0, 10);
  const loggedToday = weightLog.some((w) => w.date === todayKey);
  const [weightInput, setWeightInput] = useState("");
  const [glasses, setGlasses] = useState(0);
  const waterTarget = Math.max(6, Math.round((profile.weightKg * 35) / 250));
  const [celebrate, setCelebrate] = useState(0);
  const proteinHitRef = useRef(false);
  const waterHitRef = useRef(false);

  useEffect(() => {
    if (glasses >= waterTarget && !waterHitRef.current) {
      waterHitRef.current = true;
      setCelebrate((c) => c + 1);
    }
    if (glasses < waterTarget) waterHitRef.current = false;
  }, [glasses, waterTarget]);

  useEffect(() => {
    const hit = targets.protein > 0 && todayTotals.protein >= targets.protein;
    if (hit && !proteinHitRef.current) {
      proteinHitRef.current = true;
      setCelebrate((c) => c + 1);
    }
    if (!hit) proteinHitRef.current = false;
  }, [todayTotals.protein, targets.protein]);

  const logWeightToday = () => {
    if (!weightInput) return;
    onAddWeight(parseFloat(weightInput));
    setWeightInput("");
    setCelebrate((c) => c + 1);
  };

  const chartData = weightLog.map((w) => ({
    date: new Date(w.date + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    weight: w.value,
  }));
  const hasTrend = weightLog.length > 1;
  const weightChange = hasTrend ? Math.round((weightLog[weightLog.length - 1].value - weightLog[0].value) * 10) / 10 : null;
  const nonRestDays = workoutPlan.filter((d) => !d.session.toLowerCase().includes("rest")).length;
  const doneCount = Object.values(workoutDone).filter(Boolean).length;
  const adherencePct = nonRestDays > 0 ? Math.round((doneCount / nonRestDays) * 100) : 0;

  return (
    <div className="pb-4">
      <Confetti trigger={celebrate} />
      <Header title={`${greetingWord()}, ${profile.name.split(" ")[0]}`} subtitle="Today's readout" streak={streak} onSettings={onSettings} />

      <div className="px-5">
        <Card className="p-6 flex flex-col items-center ds-rise">
          <div className="relative flex items-center justify-center">
            <Ring pct={pct} />
            <div className="absolute flex flex-col items-center">
              <span className="ds-display text-4xl font-bold ds-text-paper">{Math.round(remaining)}</span>
              <span className="ds-mono ds-text-10px uppercase tracking-wider ds-text-muted">kcal left</span>
            </div>
          </div>
          <div className="ds-mono text-xs ds-text-muted mt-3">{Math.round(consumed)} / {targets.calories} kcal consumed</div>

          <div className="w-full mt-6 flex flex-col gap-3">
            <MacroBar label="Protein" icon={Beef} value={todayTotals.protein} target={targets.protein} color={C.signal} />
            <MacroBar label="Carbs" icon={Wheat} value={todayTotals.carbs} target={targets.carbs} color={C.teal} />
            <MacroBar label="Fat" icon={Droplet} value={todayTotals.fat} target={targets.fat} color={C.gold} />
          </div>
        </Card>
      </div>

      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <div className="ds-mono ds-text-10px uppercase tracking-wider ds-text-muted mb-1">TDEE</div>
          <div className="ds-display text-xl font-semibold ds-text-paper">{targets.tdee}</div>
          <div className="ds-text-10px ds-text-muted">kcal maintenance</div>
        </Card>
        <Card className="p-4">
          <div className="ds-mono ds-text-10px uppercase tracking-wider ds-text-muted mb-1">Goal</div>
          <div className="ds-display text-base font-semibold ds-text-paper leading-tight">{GOALS.find(g => g.id === profile.goal)?.label}</div>
        </Card>
      </div>

      {/* Daily weigh-in — the thing the weekly report is built from */}
      <div className="px-5 mt-4">
        <Card className={`p-4 ${!loggedToday ? "ds-border-signal" : ""}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 ds-text-paper text-sm font-medium"><Scale size={14} className="ds-text-teal" /> Daily check-in</div>
            {loggedToday ? (
              <span className="flex items-center gap-1 ds-text-teal text-xs font-medium"><Check size={12} /> Logged today</span>
            ) : (
              <span className="ds-text-signal text-xs font-medium">Not logged yet</span>
            )}
          </div>
          <div className="flex gap-2 mb-3">
            <input value={weightInput} onChange={(e) => setWeightInput(e.target.value)} type="number"
              placeholder={loggedToday ? "Update today's weight (kg)" : "Log today's weight (kg)"}
              className="flex-1 ds-bg-ink border ds-border-line rounded-lg px-3 py-2 text-xs outline-none ds-focus-border-teal ds-text-paper" />
            <button type="button" onClick={logWeightToday} className="ds-tap px-4 rounded-lg ds-bg-teal ds-text-ink text-xs font-semibold">
              {loggedToday ? "Update" : "Log"}
            </button>
          </div>

          {weightLog.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-1">
                <span className="ds-mono ds-text-10px ds-text-muted uppercase">Trend</span>
                <span className="ds-mono text-xs ds-text-muted">{weightLog[weightLog.length - 1]?.value} kg latest</span>
              </div>
              {weightLog.length > 1 ? (
                <div style={{ width: "100%", height: 130 }}>
                  <ResponsiveContainer>
                    <LineChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid stroke="#2A3A5C" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="date" tick={{ fill: "#8B93A7", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#8B93A7", fontSize: 10 }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                      <Tooltip contentStyle={{ background: "#1B2C4A", border: "1px solid #2A3A5C", borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#F1ECDE" }} />
                      <Line type="monotone" dataKey="weight" stroke={C.teal} strokeWidth={2} dot={{ r: 2, fill: C.teal }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="text-xs ds-text-muted py-3">Log your weight daily and your trend line will build up right here.</p>
              )}
            </>
          )}
        </Card>
      </div>

      {/* Hydration — a fitness-app staple most calorie trackers skip entirely */}
      <div className="px-5 mt-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 ds-text-paper text-sm font-medium"><Droplet size={14} className="ds-text-teal" /> Water intake</div>
            <span className="ds-mono text-xs ds-text-muted">{glasses}/{waterTarget} glasses</span>
          </div>
          <div className="flex items-center gap-1.5 mb-3">
            {Array.from({ length: waterTarget }).map((_, i) => (
              <button key={i} type="button" onClick={() => setGlasses(i < glasses ? i : i + 1)}
                className="ds-tap flex-1 aspect-square rounded-lg flex items-center justify-center"
                style={{ background: i < glasses ? "rgba(46,196,182,0.18)" : "#12213A", border: `1.5px solid ${i < glasses ? C.teal : "#2A3A5C"}` }}>
                <Droplet size={13} style={{ color: i < glasses ? C.teal : "#8B93A7" }} fill={i < glasses ? C.teal : "none"} />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setGlasses((g) => Math.max(0, g - 1))} className="ds-tap flex-1 py-2 rounded-lg ds-bg-card border ds-border-line ds-text-paper text-xs font-medium">− Glass</button>
            <button type="button" onClick={() => setGlasses((g) => g + 1)} className="ds-tap flex-1 py-2 rounded-lg ds-bg-teal ds-text-ink text-xs font-semibold">+ Glass</button>
          </div>
        </Card>
      </div>

      {badges && badges.some((b) => b.earned) && (
        <div className="px-5 mt-4">
          <div className="ds-mono ds-text-10px uppercase tracking-wider ds-text-muted mb-2">Badges earned</div>
          <div className="flex gap-2 overflow-x-auto ds-scrollbar pb-1">
            {badges.filter((b) => b.earned).map((b) => (
              <div key={b.id} className="ds-pop shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full ds-bg-gold-15 border ds-border-gold-40 ds-text-gold ds-text-11px">
                <b.icon size={12} /> {b.label}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-5 mt-4">
        {premium ? (
          <Card className="p-4">
            <div className="flex items-center gap-1.5 ds-text-paper text-sm font-medium mb-3">
              <Sparkles size={14} className="ds-text-gold" /> Weekly progress report <PremiumBadge />
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="ds-display text-lg font-semibold ds-text-paper">{adherencePct}%</div>
                <div className="ds-text-10px ds-text-muted ds-mono uppercase">Workouts done</div>
              </div>
              <div>
                <div className="ds-display text-lg font-semibold ds-text-paper">{hasTrend ? `${weightChange > 0 ? "+" : ""}${weightChange}` : "–"}</div>
                <div className="ds-text-10px ds-text-muted ds-mono uppercase">kg change</div>
              </div>
              <div>
                <div className="ds-display text-lg font-semibold ds-text-paper">{Math.round((todayTotals.cal / targets.calories) * 100)}%</div>
                <div className="ds-text-10px ds-text-muted ds-mono uppercase">Today on-plan</div>
              </div>
            </div>
            {!hasTrend && (
              <p className="ds-text-11px ds-text-muted mt-3 text-center">Log your weight daily — your weight trend will appear here once there's more than one check-in.</p>
            )}
          </Card>
        ) : (
          <Card className="p-4 relative overflow-hidden">
            <div className="flex items-center gap-1.5 ds-text-paper text-sm font-medium mb-3">
              <Sparkles size={14} className="ds-text-gold" /> Weekly progress report
            </div>
            <div className="grid grid-cols-3 gap-2 text-center blur-sm select-none pointer-events-none">
              <div><div className="ds-display text-lg font-semibold ds-text-paper">72%</div><div className="ds-text-10px ds-text-muted ds-mono uppercase">Workouts done</div></div>
              <div><div className="ds-display text-lg font-semibold ds-text-paper">-0.8</div><div className="ds-text-10px ds-text-muted ds-mono uppercase">kg change</div></div>
              <div><div className="ds-display text-lg font-semibold ds-text-paper">94%</div><div className="ds-text-10px ds-text-muted ds-mono uppercase">Today on-plan</div></div>
            </div>
            <button type="button" onClick={onUpgrade} className="ds-tap absolute inset-0 flex items-center justify-center gap-1.5 ds-bg-card-70 text-xs font-semibold ds-text-gold">
              <Lock size={12} /> Unlock with Premium
            </button>
          </Card>
        )}
      </div>

      <div className="px-5 mt-4">
        <Card className="p-4 ds-grad-card-card2">
          <div className="flex items-center gap-1.5 ds-text-gold text-xs ds-mono uppercase tracking-wider mb-2"><Sparkles size={12} /> Coach's tip</div>
          <p className="text-sm ds-text-paper-90 leading-relaxed">{tip}</p>
        </Card>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Log (meals + food scanner)                                         */
/* ------------------------------------------------------------------ */
function LogMeals({ meals, targets, todayTotals, onAdd, onRemove, premium, onUpgrade }) {
  const [showAdd, setShowAdd] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [dietFilter, setDietFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [custom, setCustom] = useState({ name: "", grams: "" });
  const [customLoading, setCustomLoading] = useState(false);
  const [customError, setCustomError] = useState("");

  const presets = MEAL_PRESETS.filter((m) =>
    (dietFilter === "all" || (dietFilter === "veg" ? m.veg : !m.veg)) &&
    (cuisineFilter === "All" || m.cuisine === cuisineFilter) &&
    (search.trim() === "" || foodMatchesQuery(m, search))
  );

  const addCustom = async () => {
    if (!custom.name.trim() || !custom.grams) return;
    setCustomLoading(true);
    setCustomError("");
    try {
      const resp = await fetch("/api/estimate-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: custom.name.trim(), grams: custom.grams }),
      });
      if (!resp.ok) throw new Error("estimate-food request failed");
      const parsed = await resp.json();
      onAdd({
        id: Date.now(), name: `${custom.name.trim()} (${custom.grams}g)`,
        cal: parsed.calories || 0, protein: parsed.protein || 0, carbs: parsed.carbs || 0, fat: parsed.fat || 0,
      });
      setCustom({ name: "", grams: "" });
      setShowAdd(false);
    } catch (e) {
      setCustomError("Couldn't estimate that one — check the spelling or try a more common food name.");
    } finally {
      setCustomLoading(false);
    }
  };

  return (
    <div className="pb-4">
      <div className="px-5 pt-7 pb-4 flex items-center justify-between">
        <div>
          <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-signal uppercase mb-1">Nutrition</div>
          <h1 className="ds-display text-2xl font-semibold ds-text-paper">Today's meals</h1>
        </div>
        <div className="ds-mono text-xs ds-text-muted text-right">
          {Math.round(todayTotals.cal)} / {targets.calories}<br/>kcal
        </div>
      </div>

      <div className="px-5 mt-1">
        <div className="relative">
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search any dish to quick-add…"
            className="w-full ds-bg-card border ds-border-line rounded-xl pl-4 pr-9 py-3 text-sm outline-none ds-focus-border-signal ds-text-paper" />
          {search ? (
            <button type="button" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 ds-text-muted">
              <X size={14} />
            </button>
          ) : (
            <SearchIcon size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 ds-text-muted" />
          )}
        </div>
        {search.trim() && (
          <div className="mt-2 flex flex-col gap-1.5 ds-rise">
            {presets.length === 0 && (
              <div className="text-center text-xs ds-text-muted py-4">No dishes match "{search}" — try the manual entry below, or search a different way (e.g. just "chicken" or "rice").</div>
            )}
            {presets.length > 0 && (
              <div className="ds-text-11px ds-text-muted mb-0.5">{presets.length} match{presets.length === 1 ? "" : "es"}</div>
            )}
            {presets.slice(0, 25).map((m) => (
              <button key={m.name} type="button" onClick={() => { onAdd({ id: Date.now(), name: m.name, cal: m.cal, protein: m.protein, carbs: m.carbs, fat: m.fat }); setSearch(""); }}
                className="ds-tap text-left px-3.5 py-2.5 rounded-xl ds-bg-card border ds-border-line flex items-center justify-between">
                <div className="min-w-0">
                  <div className="text-sm ds-text-paper truncate">{m.name}</div>
                  <div className="ds-mono ds-text-11px ds-text-muted mt-0.5">{m.cuisine} · {m.cal} kcal</div>
                </div>
                <Plus size={14} className="ds-text-signal shrink-0 ml-2" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="px-5 mt-3 flex gap-2">
        <button type="button" onClick={() => setShowAdd(true)} className="ds-tap flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl ds-bg-signal ds-text-ink text-sm font-semibold">
          <Plus size={15} /> Browse all meals
        </button>
        <button type="button" onClick={() => (premium ? setShowScanner(true) : onUpgrade())}
          className="ds-tap flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl ds-bg-card border ds-border-line ds-text-paper text-sm font-semibold relative">
          <Camera size={15} /> Scan food
          {!premium && <Lock size={11} className="absolute top-2 right-2.5 ds-text-gold" />}
        </button>
      </div>

      <div className="px-5 mt-5">
        <div className="text-xs ds-mono uppercase tracking-wider ds-text-muted mb-2">Logged ({meals.length})</div>
        {meals.length === 0 && (
          <Card className="p-6 text-center text-sm ds-text-muted">Nothing logged yet today. Add a meal to get started.</Card>
        )}
        <div className="flex flex-col gap-2">
          {meals.map((m) => (
            <Card key={m.id} className="p-3.5 flex items-center justify-between ds-rise">
              <div className="min-w-0">
                <div className="text-sm ds-text-paper font-medium truncate">{m.name}</div>
                <div className="ds-mono ds-text-11px ds-text-muted mt-0.5">{Math.round(m.cal)} kcal · P{Math.round(m.protein)} C{Math.round(m.carbs)} F{Math.round(m.fat)}</div>
              </div>
              <button onClick={() => onRemove(m.id)} className="w-8 h-8 shrink-0 rounded-full ds-bg-ink flex items-center justify-center ds-text-muted">
                <Trash2 size={13} />
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* Add meal sheet */}
      {showAdd && (
        <ModalPortal>
        <div className="fixed inset-0 z-30 flex items-end justify-center ds-overlay" onClick={() => setShowAdd(false)}>
          <div onClick={(e) => e.stopPropagation()} className="ds-pop w-full max-w-md ds-bg-ink rounded-t-3xl border-t ds-border-line ds-max-h-85 overflow-y-auto ds-scrollbar">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="ds-display text-lg font-semibold ds-text-paper">Add a meal</h3>
                <button type="button" onClick={() => setShowAdd(false)}><X size={18} className="ds-text-muted" /></button>
              </div>

              <div className="relative mb-3">
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search dishes or cuisine…"
                  className="w-full ds-bg-card border ds-border-line rounded-xl pl-4 pr-9 py-3 text-sm outline-none ds-focus-border-signal ds-text-paper" />
                {search && (
                  <button type="button" onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 ds-text-muted">
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="flex gap-2 mb-3">
                {[{id:"all",label:"All"},{id:"veg",label:"Vegetarian"},{id:"nonveg",label:"Non-veg"}].map((f) => (
                  <button key={f.id} type="button" onClick={() => setDietFilter(f.id)}
                    className={`ds-tap px-3 py-1.5 rounded-full text-xs ${dietFilter === f.id ? "ds-bg-signal ds-text-ink font-semibold" : "ds-bg-card ds-text-muted border ds-border-line"}`}>
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 mb-4 overflow-x-auto ds-scrollbar pb-1">
                {CUISINES.map((c) => (
                  <button key={c} type="button" onClick={() => setCuisineFilter(c)}
                    className={`ds-tap shrink-0 px-3 py-1.5 rounded-full text-xs ${cuisineFilter === c ? "ds-bg-teal ds-text-ink font-semibold" : "ds-bg-card ds-text-muted border ds-border-line"}`}>
                    {c}
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 mb-5">
                {presets.length === 0 && (
                  <div className="text-center text-sm ds-text-muted py-6">No dishes match that combination yet — try another cuisine or filter.</div>
                )}
                {presets.map((m) => (
                  <button key={m.name} type="button" onClick={() => { onAdd({ id: Date.now(), name: m.name, cal: m.cal, protein: m.protein, carbs: m.carbs, fat: m.fat }); setShowAdd(false); }}
                    className="ds-tap text-left px-3.5 py-3 rounded-xl ds-bg-card border ds-border-line flex items-center justify-between">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="text-sm ds-text-paper truncate">{m.name}</div>
                        {m.veg && <span className="shrink-0 w-2 h-2 rounded-full ds-bg-teal" title="Vegetarian" />}
                      </div>
                      <div className="ds-mono ds-text-11px ds-text-muted mt-0.5">{m.cuisine} · {m.cal} kcal · P{m.protein} C{m.carbs} F{m.fat}</div>
                    </div>
                    <Plus size={14} className="ds-text-signal shrink-0 ml-2" />
                  </button>
                ))}
              </div>

              <div className="text-xs ds-mono uppercase tracking-wider ds-text-muted mb-2">Not on the list? Just tell us what and how much</div>
              <div className="flex flex-col gap-2">
                <input placeholder="Food name (e.g. grilled chicken breast)" value={custom.name} onChange={(e) => setCustom({ ...custom, name: e.target.value })}
                  className="ds-bg-card border ds-border-line rounded-xl px-3.5 py-2.5 text-sm outline-none ds-focus-border-signal ds-text-paper" />
                <div className="flex gap-2">
                  <input placeholder="Amount in grams" type="number" value={custom.grams} onChange={(e) => setCustom({ ...custom, grams: e.target.value })}
                    className="flex-1 ds-bg-card border ds-border-line rounded-xl px-3.5 py-2.5 text-sm outline-none ds-focus-border-signal ds-text-paper" />
                  <span className="ds-mono text-xs ds-text-muted self-center">grams</span>
                </div>
                {customError && <div className="text-xs ds-text-signal">{customError}</div>}
                <button type="button" onClick={addCustom} disabled={customLoading || !custom.name.trim() || !custom.grams}
                  className="ds-tap mt-1 py-3 rounded-xl ds-bg-signal ds-text-ink text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                  {customLoading ? <><Loader2 size={15} className="animate-spin" /> Estimating nutrition…</> : "Add to log"}
                </button>
                <p className="ds-text-11px ds-text-muted">We'll estimate calories and macros for you — no need to look anything up.</p>
              </div>
            </div>
          </div>
        </div>
        </ModalPortal>
      )}

      {showScanner && <FoodScanner onClose={() => setShowScanner(false)} onAdd={(item) => { onAdd({ id: Date.now(), ...item }); setShowScanner(false); }} />}
    </div>
  );
}

function FoodScanner({ onClose, onAdd }) {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setResult(null);
      setError("");
    };
    reader.readAsDataURL(file);
  };

  const scan = async () => {
    if (!image) return;
    setLoading(true);
    setError("");
    try {
      const base64 = image.split(",")[1];
      const mediaType = image.substring(5, image.indexOf(";"));
      const resp = await fetch("/api/scan-food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64, mediaType }),
      });
      if (!resp.ok) throw new Error("scan-food request failed");
      const parsed = await resp.json();
      setResult(parsed);
    } catch (e) {
      setError("Couldn't read that photo clearly — try a closer, well-lit shot, or log it manually.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-30 flex items-end justify-center ds-overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="ds-pop w-full max-w-md ds-bg-ink rounded-t-3xl border-t ds-border-line ds-max-h-85 overflow-y-auto ds-scrollbar">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="ds-display text-lg font-semibold ds-text-paper flex items-center gap-2"><Camera size={17} /> Food scanner</h3>
            <button type="button" onClick={onClose}><X size={18} className="ds-text-muted" /></button>
          </div>

          {!image && (
            <div className="relative w-full rounded-2xl border-2 border-dashed ds-border-line flex flex-col items-center justify-center gap-2 ds-text-muted py-10 px-4">
              <Upload size={22} />
              <span className="text-sm font-medium">Tap to choose a photo</span>
              <span className="ds-text-11px">From your camera roll or files</span>
              <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])}
                className="ds-file-overlay" aria-label="Choose a photo of your meal" />
            </div>
          )}

          {image && (
            <div className="rounded-2xl overflow-hidden mb-3">
              <img src={image} alt="meal" className="w-full max-h-64 object-cover" />
            </div>
          )}

          {image && !result && (
            <div className="flex gap-2">
              <button type="button" onClick={scan} disabled={loading} className="ds-tap flex-1 py-3 rounded-xl ds-bg-signal ds-text-ink text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                {loading ? <><Loader2 size={15} className="animate-spin" /> Analyzing…</> : <><Wand2 size={15} /> Analyze photo</>}
              </button>
              <button type="button" onClick={() => { setImage(null); setResult(null); setError(""); }} className="ds-tap px-4 py-3 rounded-xl ds-bg-card border ds-border-line ds-text-paper text-sm">
                Retake
              </button>
            </div>
          )}

          {error && <div className="text-xs ds-text-signal mt-3">{error}</div>}

          {result && (
            <Card className="p-4 mt-1 ds-rise">
              <div className="text-sm font-medium ds-text-paper mb-1">{result.name}</div>
              <div className="ds-mono text-xs ds-text-muted mb-2">{Math.round(result.calories)} kcal · P{Math.round(result.protein)} C{Math.round(result.carbs)} F{Math.round(result.fat)}</div>
              {result.note && <div className="ds-text-11px ds-text-muted flex items-start gap-1 mb-3"><Info size={11} className="mt-0.5 shrink-0" />{result.note}</div>}
              <button type="button" onClick={() => onAdd({ name: result.name, cal: result.calories, protein: result.protein, carbs: result.carbs, fat: result.fat })}
                className="ds-tap w-full py-2.5 rounded-xl ds-bg-teal ds-text-ink text-sm font-semibold">Add to today's log</button>
            </Card>
          )}
        </div>
      </div>
    </div>
    </ModalPortal>
  );
}

/* ------------------------------------------------------------------ */
/*  Workout                                                             */
/* ------------------------------------------------------------------ */
function Workout({ profile, plan, done, onToggle, todaysLog, onLogExercise, onRemoveExercise, dayExercises, onToggleDayExercise, onResetDay }) {
  const today = new Date().getDay(); // 0 sun .. 6 sat
  const todayIdx = today === 0 ? 6 : today - 1;
  const [celebrate, setCelebrate] = useState(0);
  const [search, setSearch] = useState("");
  const [muscleFilter, setMuscleFilter] = useState("All");
  const [sheet, setSheet] = useState(null); // null | { mode: "log" } | { mode: "assign", dayIdx }

  const todaySession = plan[todayIdx]?.session || "Rest";
  const isTodayRest = todaySession.toLowerCase().includes("rest");
  const loggedNames = new Set(todaysLog.map((e) => e.name));

  const getDayList = (i) => {
    const custom = dayExercises[i];
    return custom && custom.length > 0 ? custom : suggestedExercisesFor(plan[i].session);
  };
  const isCustomized = (i) => !!(dayExercises[i] && dayExercises[i].length > 0);
  const todaysExercises = getDayList(todayIdx);

  const results = EXERCISES.filter((e) => {
    const matchesSearch = search.trim() === "" || e.name.toLowerCase().includes(search.toLowerCase()) || CATEGORY_LABEL[e.category].toLowerCase().includes(search.toLowerCase());
    const matchesMuscle = muscleFilter === "All" || CATEGORY_LABEL[e.category] === muscleFilter;
    return matchesSearch && matchesMuscle;
  });

  const logExercise = (ex) => {
    if (loggedNames.has(ex.name)) return;
    onLogExercise(ex);
    setCelebrate((c) => c + 1);
    if (!done[todayIdx]) onToggle(todayIdx);
  };

  const handleResultTap = (ex) => {
    if (!sheet) return;
    if (sheet.mode === "log") logExercise(ex);
    else onToggleDayExercise(sheet.dayIdx, ex);
  };

  const isSelectedInSheet = (ex) => {
    if (!sheet) return false;
    if (sheet.mode === "log") return loggedNames.has(ex.name);
    return (dayExercises[sheet.dayIdx] || []).some((a) => a.name === ex.name);
  };

  return (
    <div className="pb-4">
      <Confetti trigger={celebrate} />
      <div className="px-5 pt-7 pb-4">
        <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-signal uppercase mb-1">This week</div>
        <h1 className="ds-display text-2xl font-semibold ds-text-paper">Training plan</h1>
        <p className="text-xs ds-text-muted mt-1">{EXPERIENCE.find(e=>e.id===profile.experience)?.label} · {GOALS.find(g=>g.id===profile.goal)?.label} · pick your own exercises anytime</p>
      </div>

      {/* Today's log */}
      <div className="px-5">
        <Card className={`p-4 ${!isTodayRest ? "ds-border-signal" : ""}`}>
          <div className="flex items-center justify-between mb-1">
            <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-signal uppercase">Today · {DAYS[todayIdx]}</div>
            {done[todayIdx] && <span className="flex items-center gap-1 ds-text-teal text-xs font-medium"><Check size={12} /> Logged</span>}
          </div>
          <div className="text-base font-semibold ds-text-paper mb-3">{todaySession}</div>

          {isTodayRest ? (
            <p className="text-sm ds-text-muted mb-3">Rest day — recovery is part of the plan. Light walking or stretching is great if you feel like moving.</p>
          ) : (
            <>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs ds-text-muted">{isCustomized(todayIdx) ? "Your picks for today:" : "Suggested for today:"}</span>
                <button type="button" onClick={() => setSheet({ mode: "assign", dayIdx: todayIdx })} className="ds-tap ds-text-teal text-xs font-medium">
                  {isCustomized(todayIdx) ? "Edit picks" : "Pick your own"}
                </button>
              </div>
              <div className="flex flex-col gap-2 mb-3">
                {todaysExercises.map((ex) => {
                  const isLogged = loggedNames.has(ex.name);
                  return (
                    <button key={ex.name} type="button" onClick={() => logExercise(ex)}
                      className={`ds-tap text-left px-3.5 py-3 rounded-xl border-2 flex items-center justify-between ${isLogged ? "ds-border-teal" : "ds-bg-card ds-border-line"}`}
                      style={isLogged ? { backgroundColor: "rgba(46,196,182,0.1)" } : undefined}>
                      <div>
                        <div className="text-sm ds-text-paper font-medium">{ex.name}</div>
                        <div className="ds-mono ds-text-11px ds-text-muted mt-0.5">{CATEGORY_LABEL[ex.category]} · {ex.target}</div>
                      </div>
                      <div className={`w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center ${isLogged ? "ds-bg-teal ds-border-teal" : "ds-border-line2"}`}>
                        {isLogged && <Check size={13} className="ds-text-ink" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          <button type="button" onClick={() => setSheet({ mode: "log" })} className="ds-tap w-full py-2.5 rounded-xl ds-bg-card border ds-border-line ds-text-paper text-sm font-medium flex items-center justify-center gap-1.5">
            <SearchIcon size={14} /> Search &amp; log any exercise
          </button>

          {todaysLog.length > 0 && (
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #2A3A5C" }}>
              <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-muted uppercase mb-2">Logged today ({todaysLog.length})</div>
              <div className="flex flex-col gap-1.5">
                {todaysLog.map((ex, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="ds-text-paper">{ex.name} <span className="ds-text-muted ds-mono ds-text-11px">· {ex.target}</span></span>
                    <button type="button" onClick={() => onRemoveExercise(i)} className="ds-text-muted"><X size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Weekly plan preview — tap any day to pick its exercises */}
      <div className="px-5 mt-5">
        <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-muted uppercase mb-2">Week ahead — tap a day to customize it</div>
        <div className="flex flex-col gap-2">
          {plan.map((d, i) => {
            const isRest = d.session.toLowerCase().includes("rest");
            const isDone = !!done[i];
            const isToday = i === todayIdx;
            return (
              <Card key={i} className={`p-3.5 ${isToday ? "ds-border-signal" : ""}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 shrink-0 rounded-xl flex flex-col items-center justify-center ds-mono ${isToday ? "ds-bg-signal ds-text-ink" : "ds-bg-ink ds-text-muted"}`}>
                      <span className="ds-text-10px leading-none">{d.day}</span>
                    </div>
                    <div className="min-w-0">
                      <div className={`text-sm font-medium truncate ${isRest ? "ds-text-muted" : "ds-text-paper"}`}>{d.session}</div>
                      {isCustomized(i) && <div className="ds-text-10px ds-text-teal ds-mono uppercase">Custom picks</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {!isRest && (
                      <button type="button" onClick={() => setSheet({ mode: "assign", dayIdx: i })} className="ds-tap w-8 h-8 rounded-full ds-bg-ink border ds-border-line flex items-center justify-center ds-text-muted">
                        <Wand2 size={13} />
                      </button>
                    )}
                    {!isRest && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${isDone ? "ds-bg-teal ds-border-teal ds-text-ink" : "ds-border-line"}`}>
                        {isDone && <Check size={12} strokeWidth={3} />}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      <div className="px-5 mt-4">
        <Card className="p-4 flex items-start gap-3">
          <Dumbbell size={16} className="ds-text-teal mt-0.5 shrink-0" />
          <p className="text-xs ds-text-muted leading-relaxed">
            Tap the wand icon on any day to build your own routine from the full exercise library — your picks replace the suggested ones for that day.
          </p>
        </Card>
      </div>

      {/* Exercise search / assign sheet */}
      {sheet && (
        <ModalPortal>
        <div className="fixed inset-0 z-30 flex items-end justify-center ds-overlay" onClick={() => setSheet(null)}>
          <div onClick={(e) => e.stopPropagation()} className="ds-pop w-full max-w-md ds-bg-ink rounded-t-3xl border-t ds-border-line ds-max-h-85 overflow-y-auto ds-scrollbar">
            <div className="p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="ds-display text-lg font-semibold ds-text-paper">
                  {sheet.mode === "log" ? "Find an exercise" : `Pick exercises · ${DAYS[sheet.dayIdx]}`}
                </h3>
                <button type="button" onClick={() => setSheet(null)}><X size={18} className="ds-text-muted" /></button>
              </div>
              <p className="ds-text-11px ds-text-muted mb-4">
                {sheet.mode === "log" ? "Tap to log it as done today." : "Tap to add or remove from this day's routine."}
              </p>
              <input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search exercises (e.g. squat, row, plank)…"
                className="w-full ds-bg-card border ds-border-line rounded-xl px-4 py-3 text-sm outline-none ds-focus-border-signal mb-3 ds-text-paper" />
              <div className="flex gap-2 mb-4 overflow-x-auto ds-scrollbar pb-1">
                {MUSCLE_FILTERS.map((m) => (
                  <button key={m} type="button" onClick={() => setMuscleFilter(m)}
                    className={`ds-tap shrink-0 px-3 py-1.5 rounded-full text-xs ${muscleFilter === m ? "ds-bg-teal ds-text-ink font-semibold" : "ds-bg-card ds-text-muted border ds-border-line"}`}>
                    {m}
                  </button>
                ))}
              </div>
              {sheet.mode === "assign" && isCustomized(sheet.dayIdx) && (
                <button type="button" onClick={() => onResetDay(sheet.dayIdx)} className="ds-tap w-full mb-3 py-2 rounded-xl ds-bg-card border ds-border-line ds-text-muted text-xs">
                  Reset this day to suggested exercises
                </button>
              )}
              <div className="flex flex-col gap-2">
                {results.length === 0 && <div className="text-center text-sm ds-text-muted py-6">No exercises match — try a different muscle group or search term.</div>}
                {results.map((ex) => {
                  const selected = isSelectedInSheet(ex);
                  const disableTap = sheet.mode === "log" && selected;
                  return (
                    <button key={ex.id} type="button" disabled={disableTap} onClick={() => handleResultTap(ex)}
                      className={`ds-tap text-left px-3.5 py-3 rounded-xl border flex items-center justify-between ${selected ? (sheet.mode === "log" ? "ds-border-line opacity-50" : "ds-border-teal") : "ds-bg-card ds-border-line"}`}>
                      <div>
                        <div className="text-sm ds-text-paper font-medium">{ex.name}</div>
                        <div className="ds-mono ds-text-11px ds-text-muted mt-0.5">{CATEGORY_LABEL[ex.category]} · {ex.target}</div>
                      </div>
                      {selected ? <Check size={14} className="ds-text-teal shrink-0" /> : <Plus size={14} className="ds-text-signal shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        </ModalPortal>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Coach                                                            */
/* ------------------------------------------------------------------ */
const FREE_DAILY_LIMIT = 3;

function Coach({ profile, targets, todayTotals, messages, setMessages, premium, onUpgrade, aiCount, setAiCount }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }); }, [messages, loading]);

  const suggestions = ["How many calories have I eaten today?", "What workout should I do today?", "How much protein do I still need?", "Give me a high-protein dinner idea"];

  const send = async (text) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    if (!premium && aiCount >= FREE_DAILY_LIMIT) return;

    const newMsgs = [...messages, { role: "user", text: content }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    if (!premium) setAiCount((c) => c + 1);

    const remaining = Math.max(targets.calories - todayTotals.cal, 0);
    const system = `You are the in-app AI coach for DefineShaper, a fitness and body transformation app. Speak like a knowledgeable, encouraging personal trainer — warm, direct, concise (2-5 sentences unless asked for detail). Use the user's real data below to answer specifically; don't ask them to repeat info you already have.

User: ${profile.name}, ${profile.age}yo ${profile.gender}, ${profile.heightCm}cm, ${profile.weightKg}kg
Goal: ${GOALS.find(g=>g.id===profile.goal)?.label}, Experience: ${profile.experience}, Activity: ${profile.activity}
Daily targets: ${targets.calories} kcal, ${targets.protein}g protein, ${targets.carbs}g carbs, ${targets.fat}g fat
Today so far: ${Math.round(todayTotals.cal)} kcal eaten, ${Math.round(todayTotals.protein)}g protein, ${Math.round(todayTotals.carbs)}g carbs, ${Math.round(todayTotals.fat)}g fat
Calories remaining today: ${Math.round(remaining)}

Never give extreme, dangerously low-calorie, or medically risky advice. If asked about topics outside fitness/nutrition coaching, gently redirect to how you can help with their training or nutrition.`;

    try {
      const resp = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system,
          messages: newMsgs.slice(-10).map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      if (!resp.ok) {
        if (resp.status === 429) {
          setMessages((prev) => [...prev, { role: "assistant", text: "You've hit the rate limit for now — give it a minute and try again." }]);
          return;
        }
        throw new Error("coach request failed");
      }
      const data = await resp.json();
      const text2 = (data.content || []).map((b) => b.text || "").join("\n").trim() || "Hmm, I couldn't quite get that — try asking again?";
      setMessages((prev) => [...prev, { role: "assistant", text: text2 }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", text: "I'm having trouble connecting right now — give it another try in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const limitReached = !premium && aiCount >= FREE_DAILY_LIMIT;

  return (
    <div className="pb-2 flex flex-col h-full">
      <div className="px-5 pt-7 pb-3 flex items-center justify-between">
        <div>
          <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-signal uppercase mb-1">Ask anything</div>
          <h1 className="ds-display text-2xl font-semibold ds-text-paper">Your coach</h1>
        </div>
        {!premium && <span className="ds-mono ds-text-10px ds-text-muted">{Math.max(FREE_DAILY_LIMIT - aiCount, 0)}/{FREE_DAILY_LIMIT} free today</span>}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto ds-scrollbar px-5 flex flex-col gap-3 ds-min-h-300">
        {messages.length === 0 && (
          <div className="mt-6">
            <p className="text-sm ds-text-muted mb-3">Try asking:</p>
            <div className="flex flex-col gap-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} className="text-left px-3.5 py-2.5 rounded-xl ds-bg-card border ds-border-line text-sm ds-text-paper-90">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`max-ds-w-85 px-4 py-2.5 rounded-2xl text-sm leading-relaxed ds-rise ${m.role === "user" ? "self-end ds-bg-signal ds-text-ink rounded-br-sm" : "self-start ds-bg-card ds-text-paper border ds-border-line rounded-bl-sm"}`}>
            {m.text}
          </div>
        ))}
        {loading && (
          <div className="self-start ds-bg-card border ds-border-line px-4 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
            <Loader2 size={13} className="animate-spin ds-text-muted" />
            <span className="text-xs ds-text-muted">Coach is thinking…</span>
          </div>
        )}
      </div>

      <div className="px-5 pt-3 pb-5">
        {limitReached ? (
          <div className="ds-bg-card border ds-border-gold-30 rounded-2xl p-4 flex flex-col items-center gap-2 text-center">
            <Crown size={18} className="ds-text-gold" />
            <p className="text-xs ds-text-muted">You've used today's free coaching messages. Upgrade for unlimited AI coaching.</p>
            <button onClick={onUpgrade} className="mt-1 px-4 py-2 rounded-full ds-bg-gold ds-text-ink text-xs font-semibold">Upgrade to Premium</button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask your coach…" className="flex-1 ds-bg-card border ds-border-line rounded-full px-4 py-3 text-sm outline-none ds-focus-border-signal" />
            <button onClick={() => send()} disabled={loading || !input.trim()} className="w-11 h-11 shrink-0 rounded-full ds-bg-signal disabled:opacity-40 flex items-center justify-center">
              <Send size={15} className="ds-text-ink" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Body Transformation preview                                        */
/* ------------------------------------------------------------------ */
function Transform({ premium, onUpgrade }) {
  const [image, setImage] = useState(null);
  const [weeks, setWeeks] = useState(8);

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Purely cosmetic, disclosed-as-stylized filter to suggest a "brighter, more toned" look.
  const filterStyle = {
    filter: `brightness(${1 + weeks * 0.006}) contrast(${1 + weeks * 0.008}) saturate(${1 + weeks * 0.004})`,
  };

  if (!premium) {
    return (
      <div className="pb-4">
        <div className="px-5 pt-7 pb-2">
          <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-signal uppercase mb-1">Stay motivated</div>
          <h1 className="ds-display text-2xl font-semibold ds-text-paper">AI transformation</h1>
        </div>
        <Paywall
          title="Preview your progress"
          desc="Premium members can upload a photo and see a stylized preview of their transformation journey, timed to their goal."
          onUpgrade={onUpgrade}
        />
      </div>
    );
  }

  return (
    <div className="pb-4">
      <div className="px-5 pt-7 pb-4 flex items-center gap-2">
        <div>
          <div className="ds-mono ds-text-10px ds-tracking-02em ds-text-signal uppercase mb-1">Stay motivated</div>
          <h1 className="ds-display text-2xl font-semibold ds-text-paper">AI transformation</h1>
        </div>
        <PremiumBadge />
      </div>

      <div className="px-5">
        {!image ? (
          <div className="relative w-full rounded-2xl border-2 border-dashed ds-border-line flex flex-col items-center justify-center gap-2 ds-text-muted py-12 px-4">
            <Upload size={24} />
            <span className="text-sm font-medium">Tap to choose a full-length photo</span>
            <span className="ds-text-11px">From your camera roll or files</span>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])}
              className="ds-file-overlay" aria-label="Choose a full-length photo" />
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden relative">
            <img src={image} style={filterStyle} alt="preview" className="w-full ds-aspect-34 object-cover transition-all duration-300" />
            <div className="absolute bottom-0 left-0 right-0 ds-grad-ink-transparent p-4">
              <div className="ds-mono ds-text-10px ds-text-paper-70 uppercase tracking-wider">Week {weeks} preview</div>
            </div>
          </div>
        )}

        {image && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs ds-text-muted">Weeks into your plan</span>
              <span className="ds-mono text-xs ds-text-paper">{weeks}w</span>
            </div>
            <input type="range" min={1} max={24} value={weeks} onChange={(e) => setWeeks(parseInt(e.target.value))} className="ds-slider w-full" />
          </div>
        )}

        <div className="mt-4 flex items-start gap-2 ds-text-11px ds-text-muted leading-relaxed">
          <Info size={13} className="mt-0.5 shrink-0" />
          <span>This is a stylized, motivational preview — not a medical or photorealistic prediction. Real results depend on consistency, genetics, and time.</span>
        </div>

        {image && (
          <button type="button" onClick={() => setImage(null)} className="ds-tap mt-4 w-full py-2.5 rounded-xl ds-bg-card border ds-border-line ds-text-paper text-sm">Try another photo</button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Goal edit modal — change goal without redoing onboarding           */
/* ------------------------------------------------------------------ */
function GoalEditModal({ current, onSave, onClose }) {
  const [selected, setSelected] = useState(current);
  return (
    <ModalPortal>
    <div className="fixed inset-0 z-50 flex items-end justify-center ds-overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="ds-pop w-full max-w-md ds-bg-ink rounded-t-3xl border-t ds-border-line ds-max-h-85 overflow-y-auto ds-scrollbar">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="ds-display text-lg font-semibold ds-text-paper">Change your goal</h3>
            <button type="button" onClick={onClose}><X size={18} className="ds-text-muted" /></button>
          </div>
          <div className="flex flex-col gap-3">
            {GOALS.map((g) => {
              const isSel = selected === g.id;
              return (
                <button key={g.id} type="button" onClick={() => setSelected(g.id)} aria-pressed={isSel}
                  className={`ds-tap text-left px-4 py-4 rounded-xl border-2 flex items-center gap-3 ${isSel ? "ds-bg-signal-10 ds-border-signal ds-select-pulse" : "ds-bg-card ds-border-line"}`}>
                  <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${isSel ? "ds-bg-signal ds-text-ink" : "ds-bg-line ds-text-paper"}`}>
                    <g.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium ds-text-paper">{g.label}</div>
                    <div className="ds-text-11px ds-text-muted">{g.desc}</div>
                  </div>
                  <div className={`w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center ${isSel ? "ds-border-signal ds-bg-signal" : "ds-border-line2"}`}>
                    {isSel && <Check size={12} className="ds-text-ink" strokeWidth={3} />}
                  </div>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => onSave(selected)} className="ds-tap mt-5 w-full py-3.5 rounded-full ds-bg-signal ds-text-ink font-semibold">
            Save goal
          </button>
        </div>
      </div>
    </div>
    </ModalPortal>
  );
}

/* ------------------------------------------------------------------ */
/*  Settings / Profile drawer                                          */
/* ------------------------------------------------------------------ */
function WaitlistCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  const submit = async () => {
    if (!email.trim() || !email.includes("@")) return;
    setStatus("sending");
    try {
      const resp = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!resp.ok) throw new Error("bad response");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center ds-bg-teal ds-text-ink">
        ✓ You're on the list — we'll email you when Premium launches
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com"
          className="flex-1 ds-bg-ink border ds-border-line rounded-lg px-3 py-2 text-xs outline-none ds-focus-border-signal ds-text-paper" />
        <button type="button" onClick={submit} disabled={status === "sending"}
          className="ds-tap px-3 rounded-lg ds-bg-gold text-xs font-semibold disabled:opacity-60" style={{ color: "#12213A" }}>
          {status === "sending" ? "…" : "Notify me"}
        </button>
      </div>
      {status === "error" && <div className="ds-text-11px ds-text-signal">Something went wrong — try again in a moment.</div>}
      <p className="ds-text-11px ds-text-muted">Premium (unlimited AI coaching, food scanner, body transformation, weekly reports) isn't live yet — join the list to be first in.</p>
    </div>
  );
}

function Settings_({ profile, premium, onClose, onEditGoal, badges }) {
  return (
    <ModalPortal>
    <div className="fixed inset-0 z-40 flex items-end justify-center ds-overlay" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="ds-pop w-full max-w-md ds-bg-ink rounded-t-3xl border-t ds-border-line ds-max-h-85 overflow-y-auto ds-scrollbar">
        <div className="p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="ds-display text-lg font-semibold ds-text-paper">Profile</h3>
            <button onClick={onClose}><X size={18} className="ds-text-muted" /></button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-full ds-bg-signal flex items-center justify-center ds-display text-lg font-semibold ds-text-ink">
              {profile.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-sm font-medium ds-text-paper">{profile.name}</div>
              <div className="text-xs ds-text-muted">{profile.age} yrs · {profile.heightCm}cm · {profile.weightKg}kg</div>
            </div>
            {premium && <span className="ml-auto"><PremiumBadge /></span>}
          </div>

          <Card className="p-4 mb-3 flex items-center justify-between">
            <div>
              <div className="text-sm ds-text-paper">Goal</div>
              <div className="text-xs ds-text-muted">{GOALS.find(g=>g.id===profile.goal)?.label}</div>
            </div>
            <button type="button" onClick={onEditGoal} className="ds-tap text-xs ds-text-signal font-medium">Change</button>
          </Card>

          <Card className="p-4 mb-3">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm ds-text-paper flex items-center gap-1.5"><Crown size={13} className="ds-text-gold" /> Membership</div>
              <span className={`text-xs font-semibold ${premium ? "ds-text-gold" : "ds-text-muted"}`}>{premium ? "Premium" : "Free"}</span>
            </div>
            <ul className="ds-text-11px ds-text-muted mb-3 mt-2 flex flex-col gap-1">
              <li className="flex items-center gap-1.5"><Crown size={10} className="ds-text-gold shrink-0" /> Unlimited AI coaching (free: 3 msgs/day)</li>
              <li className="flex items-center gap-1.5"><Crown size={10} className="ds-text-gold shrink-0" /> AI photo food scanner</li>
              <li className="flex items-center gap-1.5"><Crown size={10} className="ds-text-gold shrink-0" /> AI body transformation preview</li>
              <li className="flex items-center gap-1.5"><Crown size={10} className="ds-text-gold shrink-0" /> Detailed weekly progress reports</li>
            </ul>
            {premium ? (
              <div className="w-full py-2.5 rounded-xl text-sm font-semibold text-center ds-bg-gold-15 border ds-border-gold-30 ds-text-gold">
                ✓ Premium is active on your account
              </div>
            ) : (
              <WaitlistCapture />
            )}
          </Card>

          {badges && (
            <Card className="p-4 mb-3">
              <div className="text-sm ds-text-paper mb-3">Badges earned</div>
              <div className="flex flex-wrap gap-2">
                {badges.map((b) => (
                  <div key={b.id} className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full ds-text-11px border ${b.earned ? "ds-bg-gold-15 ds-border-gold-40 ds-text-gold" : "ds-bg-ink ds-border-line ds-text-muted-60"}`}>
                    <b.icon size={11} /> {b.label}
                  </div>
                ))}
              </div>
            </Card>
          )}

          <div className="grid grid-cols-3 gap-2 text-center mt-4">
            <div>
              <div className="ds-display text-lg ds-text-paper font-semibold">{profile.experience}</div>
              <div className="ds-text-10px ds-text-muted ds-mono uppercase">Level</div>
            </div>
            <div>
              <div className="ds-display text-lg ds-text-paper font-semibold capitalize">{profile.activity}</div>
              <div className="ds-text-10px ds-text-muted ds-mono uppercase">Activity</div>
            </div>
            <div>
              <div className="ds-display text-lg ds-text-paper font-semibold capitalize">{profile.gender}</div>
              <div className="ds-text-10px ds-text-muted ds-mono uppercase">Gender</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ModalPortal>
  );
}

/* ------------------------------------------------------------------ */
/*  Root App                                                            */
/* ------------------------------------------------------------------ */
export default function App() {
  const [profile, setProfile] = usePersistentState("ds-profile", null);
  const [tab, setTab] = useState("dashboard");
  const [showSettings, setShowSettings] = useState(false);
  const [showGoalEdit, setShowGoalEdit] = useState(false);
  const [premium, setPremium] = usePersistentState("ds-premium", false);
  const [streak, setStreak] = usePersistentState("ds-streak", 0);
  const streakMarkedRef = useRef(false);

  const [meals, setMeals] = usePersistentState("ds-meals", []);
  const [weightLog, setWeightLog] = usePersistentState("ds-weight-log", []);
  const [workoutPlan, setWorkoutPlan] = usePersistentState("ds-workout-plan", []);
  const [workoutDone, setWorkoutDone] = usePersistentState("ds-workout-done", {});
  const [todaysExercises, setTodaysExercises] = usePersistentState("ds-todays-exercises", []);
  const [dayExercises, setDayExercises] = usePersistentState("ds-day-exercises", {});
  const [chatMessages, setChatMessages] = usePersistentState("ds-chat-messages", []);
  const [aiCount, setAiCount] = usePersistentState("ds-ai-count", 0);
  const [lastActiveDate, setLastActiveDate] = usePersistentState("ds-last-active-date", null);
  const [tip] = useState(TIPS[Math.floor(Math.random() * TIPS.length)]);

  // Daily rollover: "today's" meals/exercises/AI-message-count must not silently
  // carry over into a new day just because the browser tab stayed open, or because
  // localStorage remembered yesterday. Without this, calorie tracking would be wrong
  // every single morning.
  useEffect(() => {
    const todayKey = new Date().toISOString().slice(0, 10);
    if (lastActiveDate && lastActiveDate !== todayKey) {
      setMeals([]);
      setTodaysExercises([]);
      setAiCount(0);
    }
    if (lastActiveDate !== todayKey) setLastActiveDate(todayKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!profile) return;
    const hasActivity = meals.length > 0 || Object.values(workoutDone).some(Boolean);
    if (hasActivity && streak === 0 && !streakMarkedRef.current) {
      streakMarkedRef.current = true;
      setStreak(1);
    }
  }, [profile, meals.length, workoutDone, streak]);

  const handleComplete = (p) => {
    setProfile(p);
    setWorkoutPlan(generateWorkoutPlan(p));
    // Start weight tracking with just today's real entry — no fabricated history.
    const todayKey = new Date().toISOString().slice(0, 10);
    setWeightLog([{ date: todayKey, value: p.weightKg }]);
  };

  if (!profile) {
    return (
      <div className="ds-root ds-viewport ds-bg-ink">
        <FontStyles />
        <Onboarding onComplete={handleComplete} />
      </div>
    );
  }

  const targets = calcTargets(profile);
  const todayTotals = meals.reduce((acc, m) => ({
    cal: acc.cal + m.cal, protein: acc.protein + m.protein, carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat,
  }), { cal: 0, protein: 0, carbs: 0, fat: 0 });

  const addMeal = (m) => setMeals((prev) => [m, ...prev]);
  const removeMeal = (id) => setMeals((prev) => prev.filter((m) => m.id !== id));
  const addWeight = (val) => {
    const todayKey = new Date().toISOString().slice(0, 10);
    setWeightLog((prev) => {
      const existingIdx = prev.findIndex((w) => w.date === todayKey);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx] = { date: todayKey, value: val };
        return copy;
      }
      return [...prev, { date: todayKey, value: val }];
    });
  };
  const toggleWorkout = (i) => setWorkoutDone((prev) => ({ ...prev, [i]: !prev[i] }));
  const toggleDayExercise = (dayIdx, ex) => {
    setDayExercises((prev) => {
      const current = prev[dayIdx] || [];
      const exists = current.some((e) => e.name === ex.name);
      const next = exists ? current.filter((e) => e.name !== ex.name) : [...current, ex];
      return { ...prev, [dayIdx]: next };
    });
  };
  const resetDay = (dayIdx) => setDayExercises((prev) => ({ ...prev, [dayIdx]: [] }));
  const logExercise = (ex) => setTodaysExercises((prev) => [...prev, ex]);
  const removeExercise = (idx) => setTodaysExercises((prev) => prev.filter((_, i) => i !== idx));
  const saveGoal = (goalId) => { setProfile((p) => ({ ...p, goal: goalId })); setShowGoalEdit(false); };

  const badges = [
    { id: "first-meal", label: "First meal logged", icon: Utensils, earned: meals.length > 0 },
    { id: "workout-done", label: "First workout done", icon: Dumbbell, earned: Object.values(workoutDone).some(Boolean) },
    { id: "streak-3", label: "3-day streak", icon: Flame, earned: streak >= 3 },
    { id: "streak-7", label: "7-day streak", icon: Flame, earned: streak >= 7 },
    { id: "protein-hit", label: "Hit protein target", icon: Beef, earned: todayTotals.protein >= targets.protein },
  ];

  const NAV = [
    { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
    { id: "log", label: "Log", icon: Utensils },
    { id: "coach", label: "Coach", icon: MessageCircle },
    { id: "workout", label: "Train", icon: Dumbbell },
    { id: "transform", label: "Transform", icon: Wand2 },
  ];

  return (
    <div className="ds-root ds-viewport ds-bg-ink relative overflow-hidden">
      <FontStyles />
      <div className="flex-1 overflow-y-auto ds-scrollbar">
        {tab === "dashboard" && (
          <Dashboard profile={profile} targets={targets} todayTotals={todayTotals} weightLog={weightLog}
            streak={streak} tip={tip} onSettings={() => setShowSettings(true)} onAddWeight={addWeight}
            premium={premium} onUpgrade={() => setShowSettings(true)} workoutPlan={workoutPlan} workoutDone={workoutDone} badges={badges} />
        )}
        {tab === "log" && (
          <LogMeals meals={meals} targets={targets} todayTotals={todayTotals} onAdd={addMeal} onRemove={removeMeal}
            premium={premium} onUpgrade={() => { setTab("dashboard"); setShowSettings(true); }} />
        )}
        {tab === "coach" && (
          <Coach profile={profile} targets={targets} todayTotals={todayTotals} messages={chatMessages} setMessages={setChatMessages}
            premium={premium} onUpgrade={() => setShowSettings(true)} aiCount={aiCount} setAiCount={setAiCount} />
        )}
        {tab === "workout" && (
          <Workout profile={profile} plan={workoutPlan} done={workoutDone} onToggle={toggleWorkout}
            todaysLog={todaysExercises} onLogExercise={logExercise} onRemoveExercise={removeExercise}
            dayExercises={dayExercises} onToggleDayExercise={toggleDayExercise} onResetDay={resetDay} />
        )}
        {tab === "transform" && (
          <Transform premium={premium} onUpgrade={() => setShowSettings(true)} />
        )}
      </div>

      <div className="border-t ds-border-line ds-bg-ink-95 backdrop-blur px-2 pt-2 pb-3 flex items-stretch gap-1">
        {NAV.map((n) => {
          const active = tab === n.id;
          return (
            <button key={n.id} type="button" onClick={() => setTab(n.id)} className="ds-tap flex-1 flex flex-col items-center gap-1 py-1.5 rounded-xl relative">
              {active && <span className="absolute -top-2 w-8 h-0.5 rounded-full ds-bg-signal" />}
              <n.icon size={18} color={active ? C.signal : C.muted} />
              <span className="ds-text-10px ds-mono" style={{ color: active ? C.signal : C.muted }}>{n.label}</span>
            </button>
          );
        })}
      </div>

      {showSettings && (
        <Settings_ profile={profile} premium={premium} onClose={() => setShowSettings(false)}
          onEditGoal={() => { setShowSettings(false); setShowGoalEdit(true); }} badges={badges} />
      )}

      {showGoalEdit && (
        <GoalEditModal current={profile.goal} onSave={saveGoal} onClose={() => setShowGoalEdit(false)} />
      )}
    </div>
  );
}

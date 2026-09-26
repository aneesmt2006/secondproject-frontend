import { Sparkles, Apple, Droplets, Fish } from "lucide-react";

export const getTrimesterMessage = (trimester: number) => {
  switch (trimester) {
    case 1: return "Focus on folate, iron, hydration, and managing nausea while supporting early fetal development.";
    case 2: return "Support your baby's rapid growth with protein, iron, calcium, vitamin D, and nutrient-dense meals.";
    case 3: return "Continue supporting baby's growth with protein, iron, calcium, omega-3s, fiber, and adequate hydration.";
    default: return "Focus on a balanced diet rich in essential nutrients.";
  }
};

export const getDailyTip = (trimester: number) => {
  switch (trimester) {
    case 1: return "Eat small, frequent meals throughout the day to help manage morning sickness and nausea.";
    case 2: return "Pair plant-based iron foods with vitamin-C-rich foods (like a squeeze of lemon) to improve iron absorption.";
    case 3: return "If you feel full quickly, focus on eating smaller, highly nutrient-dense meals to ensure you get enough calories.";
    default: return "Stay hydrated by sipping water continuously throughout the day.";
  }
};

export const primaryNutrients = [
  {
    title: "Folic Acid",
    amount: "600 mcg DFE/day",
    description: "Supports neural tube development and healthy cell growth.",
    icon: <Sparkles className="w-5 h-5 text-emerald-500" />,
    bg: "bg-emerald-50",
    border: "border-emerald-200"
  },
  {
    title: "Iron",
    amount: "27 mg/day",
    description: "Helps produce blood and deliver oxygen to you and your baby.",
    icon: <Apple className="w-5 h-5 text-rose-500" />,
    bg: "bg-rose-50",
    border: "border-rose-200"
  },
  {
    title: "Calcium",
    amount: "1,000 mg/day",
    description: "Supports your baby's bones and teeth and helps maintain your own bone health.",
    icon: <Droplets className="w-5 h-5 text-blue-500" />,
    bg: "bg-blue-50",
    border: "border-blue-200"
  },
  {
    title: "Protein",
    amount: "70-100 g/day",
    description: "Supports your baby's growth and the development of maternal tissues.",
    icon: <Fish className="w-5 h-5 text-orange-500" />,
    bg: "bg-orange-50",
    border: "border-orange-200"
  }
];

export const secondaryNutrients = [
  { title: "Vitamin D", desc: "Helps build baby's bones and teeth." },
  { title: "Iodine", desc: "Essential for healthy brain and nervous system development." },
  { title: "Choline", desc: "Supports development of the baby's brain and spinal cord." },
  { title: "Omega-3/DHA", desc: "Crucial for fetal brain and eye development." },
  { title: "Vitamin B12", desc: "Helps form neural tubes and prevents anemia." }
];

export const buildYourPlateCategories = [
  { title: "Protein-rich foods", examples: "Dal / lentils, Eggs, Well-cooked low-mercury fish, Chicken" },
  { title: "Calcium-rich foods", examples: "Curd, Milk, Paneer" },
  { title: "Vegetables & fruits", examples: "Green leafy vegetables, fresh seasonal fruits" },
  { title: "Whole grains", examples: "Brown rice, Whole wheat chapati, Oats" },
  { title: "Healthy fats", examples: "Nuts and seeds, Coconut, Ghee (in moderation)" }
];

export const mealExamples = [
  "Rice + dal + vegetables + curd",
  "Idli + sambar + egg",
  "Chapati + dal + vegetables",
  "Fish + rice + vegetables"
];

export const foodsToAvoid = [
  "Unpasteurized milk and dairy products",
  "Raw or undercooked seafood",
  "Raw or undercooked meat",
  "Raw or undercooked eggs",
  "High-mercury fish (e.g. shark, swordfish, king mackerel)",
  "Unwashed fruits and vegetables",
  "Raw sprouts"
];

export const foodsToLimit = [
  "Caffeine (limit to 200mg per day)",
  "Certain fish based on mercury levels",
  "Highly processed foods and excess sugar"
];

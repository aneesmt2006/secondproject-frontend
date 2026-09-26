export interface BodyInsight {
  trimester: number;
  weeks: string;
  title: string;
  changes: string[];
  symptoms: string[];
  tips: string[];
}

export const BODY_INSIGHTS_DATA: BodyInsight[] = [
  {
    trimester: 1,
    weeks: "Weeks 1-13",
    title: "The Foundation Phase",
    changes: [
      "Your uterus begins to expand and grow.",
      "Blood volume starts increasing to support the baby.",
      "Breast tenderness and enlargement as milk ducts develop.",
      "Hormonal shifts (hCG, estrogen, progesterone) surge rapidly."
    ],
    symptoms: [
      "Morning sickness or mild nausea",
      "Frequent urination",
      "Heightened sense of smell",
      "Fatigue and sleepiness"
    ],
    tips: [
      "Stay hydrated and sip water throughout the day.",
      "Eat small, frequent meals to help manage nausea.",
      "Rest when you feel tired; your body is working hard!",
      "Start taking a prenatal vitamin if you haven't already."
    ]
  },
  {
    trimester: 2,
    weeks: "Weeks 14-27",
    title: "The Growth Phase",
    changes: [
      "Your baby bump will likely become noticeable.",
      "Energy levels typically improve significantly.",
      "Skin changes such as 'pregnancy glow' or darkening of certain areas.",
      "You may start feeling the baby's first movements (quickening)."
    ],
    symptoms: [
      "Round ligament pain (mild abdominal aches)",
      "Occasional heartburn or indigestion",
      "Leg cramps, especially at night",
      "Mild swelling in the ankles or feet"
    ],
    tips: [
      "Invest in comfortable maternity clothing.",
      "Use a supportive maternity pillow for better sleep.",
      "Maintain a balanced diet rich in calcium and iron.",
      "Stay active with pregnancy-safe exercises like walking or swimming."
    ]
  },
  {
    trimester: 3,
    weeks: "Weeks 28-40+",
    title: "The Final Stretch",
    changes: [
      "Your uterus expands to the rib cage, crowding other organs.",
      "Pelvic joints loosen in preparation for labor.",
      "Your center of gravity shifts, changing your posture.",
      "Colostrum (early milk) may occasionally leak from breasts."
    ],
    symptoms: [
      "Shortness of breath as the baby pushes upward.",
      "Braxton Hicks (practice) contractions.",
      "Increased fatigue and difficulty finding comfortable sleep positions.",
      "Frequent urination returns as the baby drops lower."
    ],
    tips: [
      "Pack your hospital bag and finalize your birth plan.",
      "Practice deep breathing and relaxation techniques.",
      "Keep your feet elevated when sitting to reduce swelling.",
      "Attend regular checkups and monitor the baby's movements."
    ]
  }
];

export const getBodyInsightForWeek = (week: number): BodyInsight => {
  if (week <= 13) return BODY_INSIGHTS_DATA[0];
  if (week <= 27) return BODY_INSIGHTS_DATA[1];
  return BODY_INSIGHTS_DATA[2];
};

export const getWatchOutsForWeek = (week: number) => {
  let trimester = 1;
  if (week >= 14 && week <= 27) trimester = 2;
  else if (week >= 28) trimester = 3;

  const data = {
    1: {
      trimester: 1,
      weeks: "Weeks 1-13",
      dos: [
        "Take a daily prenatal vitamin with at least 400mcg of folic acid.",
        "Stay hydrated by drinking 8-10 glasses of water daily.",
        "Get plenty of rest and listen to your body's need for sleep.",
        "Eat small, frequent, nutrient-dense meals to help manage morning sickness.",
        "Engage in light, safe exercises like walking or prenatal yoga."
      ],
      donts: [
        "Avoid all alcohol, smoking, and recreational drugs.",
        "Do not consume raw or undercooked meat, poultry, eggs, and seafood.",
        "Avoid unpasteurized dairy products (like certain soft cheeses).",
        "Limit caffeine intake to no more than 200mg per day.",
        "Avoid changing cat litter to prevent Toxoplasmosis infection."
      ],
      myths: [
        { myth: "You must 'eat for two'.", fact: "You don't need any extra calories in the first trimester. Focus on nutrient-dense foods instead." },
        { myth: "You can't drink any coffee.", fact: "Up to 200mg of caffeine a day (about one 12oz cup) is generally considered safe." }
      ]
    },
    2: {
      trimester: 2,
      weeks: "Weeks 14-27",
      dos: [
        "Sleep on your side, preferably the left, to improve blood flow to the baby.",
        "Moisturize your belly to help minimize stretch marks and soothe itching.",
        "Start practicing Kegel exercises to strengthen pelvic floor muscles.",
        "Continue your prenatal vitamins and stay well-hydrated.",
        "Attend all scheduled prenatal checkups and anatomy scans."
      ],
      donts: [
        "Avoid exercises that require lying flat on your back.",
        "Do not engage in contact sports or activities with a high risk of falling.",
        "Avoid heavy lifting and strenuous physical exertion.",
        "Don't ignore severe headaches or sudden, extreme swelling in hands/face.",
        "Avoid hot tubs, saunas, and overheating."
      ],
      myths: [
        { myth: "Heartburn means your baby will have lots of hair.", fact: "Studies actually show a correlation! Pregnancy hormones that relax the esophagus also promote fetal hair growth." },
        { myth: "You shouldn't fly during pregnancy.", fact: "The second trimester is typically the safest and most comfortable time to travel." }
      ]
    },
    3: {
      trimester: 3,
      weeks: "Weeks 28-42",
      dos: [
        "Monitor fetal movement and do daily 'kick counts'.",
        "Pack your hospital bag and finalize your birth plan.",
        "Rest as much as possible with your feet elevated to reduce swelling.",
        "Eat smaller meals to help manage severe heartburn and indigestion.",
        "Familiarize yourself with the signs of early labor."
      ],
      donts: [
        "Avoid long flights or car rides without taking breaks to stretch and walk.",
        "Do not stand for very long uninterrupted periods.",
        "Avoid sleeping flat on your back (it can compress a major blood vessel).",
        "Don't ignore decreased fetal movement—contact your doctor immediately.",
        "Avoid excessively large meals and spicy foods right before bedtime."
      ],
      myths: [
        { myth: "Eating spicy food induces labor.", fact: "There's no scientific evidence that spicy food starts labor, but it will likely give you heartburn!" },
        { myth: "You can tell the gender by how you're carrying.", fact: "How you carry depends entirely on your body type, abdominal muscles, and the baby's position." }
      ]
    }
  };

  return data[trimester as keyof typeof data];
};

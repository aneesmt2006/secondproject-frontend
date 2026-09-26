import tri1Do from "../../../assets/images/sleep_guide/tri1_do.jpg";
import tri1Dont from "../../../assets/images/sleep_guide/tri1_dont.jpg";
import tri2Do from "../../../assets/images/sleep_guide/tri2_do.jpg";
import tri2Dont from "../../../assets/images/sleep_guide/tri2_dont.jpg";
import tri3Do from "../../../assets/images/sleep_guide/tri3_do.jpg";
import tri3Dont from "../../../assets/images/sleep_guide/tri3_dont.jpg";

export const getSleepGuideForWeek = (week: number) => {
  let trimester = 1;
  if (week >= 14 && week <= 27) trimester = 2;
  else if (week >= 28) trimester = 3;

  const data = {
    1: {
      trimester: 1,
      weeks: "Weeks 1-13",
      title: "First Trimester Sleep Guide",
      dos: {
        title: "Sleep on Your Side",
        description: "Start getting used to sleeping on your side (preferably left) early on. It improves blood flow to the placenta.",
        image: tri1Do
      },
      donts: {
        title: "Avoid Stomach Sleeping",
        description: "While it's still physically possible, sleeping on your stomach can become uncomfortable and put unnecessary pressure on your growing uterus.",
        image: tri1Dont
      },
      tips: [
        "Take short naps during the day to combat early pregnancy fatigue.",
        "Drink plenty of water, but cut back before bedtime to avoid frequent bathroom trips.",
        "Keep crackers by your bed if morning sickness disrupts your sleep."
      ]
    },
    2: {
      trimester: 2,
      weeks: "Weeks 14-27",
      title: "Second Trimester Sleep Guide",
      dos: {
        title: "Support Your Belly",
        description: "Sleep on your left side with a small pillow under your belly or between your knees to reduce lower back pain and align your hips.",
        image: tri2Do
      },
      donts: {
        title: "Avoid Back Sleeping",
        description: "Sleeping flat on your back can cause the weight of your uterus to compress major blood vessels, leading to dizziness, low blood pressure, and reduced blood flow to the baby.",
        image: tri2Dont
      },
      tips: [
        "Use a humidifier if pregnancy rhinitis is making it hard to breathe at night.",
        "Invest in a pregnancy pillow for added support as your bump grows.",
        "Avoid heavy meals or spicy foods close to bedtime to prevent heartburn."
      ]
    },
    3: {
      trimester: 3,
      weeks: "Weeks 28-42",
      title: "Third Trimester Sleep Guide",
      dos: {
        title: "Use a Full Body Pillow",
        description: "A C-shaped or U-shaped full body pregnancy pillow is highly recommended to support your back, belly, and knees simultaneously while side-sleeping.",
        image: tri3Do
      },
      donts: {
        title: "Never Sleep on Your Back",
        description: "It is strongly advised against sleeping on your back during the third trimester as it poses risks to both your comfort and the baby's oxygen supply.",
        image: tri3Dont
      },
      tips: [
        "If you wake up on your back, don't panic! Just roll back onto your side.",
        "Sleep with your head elevated on pillows to reduce heartburn and shortness of breath.",
        "Do light stretching or prenatal yoga before bed to relieve leg cramps."
      ]
    }
  };

  return data[trimester as keyof typeof data];
};

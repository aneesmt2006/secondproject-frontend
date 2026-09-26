export interface ExerciseVideo {
  id: string;
  title: string;
  thumbnail: string;
  youtubeId: string;
  duration: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  category: string;
}

export const exerciseCategories = [
  "Prenatal Yoga & Stretching",
  "Light Cardio",
  "Strength & Pelvic Floor",
  "Relaxation & Breathing",
];

export const trimesterVideos: Record<number, ExerciseVideo[]> = {
  1: [
    {
      id: "t1-v1",
      title: "9-Minute First Trimester Yoga",
      thumbnail: "/assets/exercise_thumbnails/t1_yoga.jpg",
      youtubeId: "46Vaw3zfu5U",
      duration: "9 min",
      difficulty: "Easy",
      category: "Prenatal Yoga & Stretching",
    },
    {
      id: "t1-v2",
      title: "First Trimester Flow",
      thumbnail: "/assets/exercise_thumbnails/t1_flow.jpg",
      youtubeId: "DjyCGGdDEwU",
      duration: "60 min",
      difficulty: "Moderate",
      category: "Prenatal Yoga & Stretching",
    },
    {
      id: "t1-v3",
      title: "Prenatal Yoga for Beginners",
      thumbnail: "/assets/exercise_thumbnails/t1_breathing.jpg",
      youtubeId: "e-1y7bn8YWY",
      duration: "25 min",
      difficulty: "Easy",
      category: "Relaxation & Breathing",
    }
  ],
  2: [
    {
      id: "t2-v1",
      title: "Second Trimester Safe Yoga",
      thumbnail: "/assets/exercise_thumbnails/t2_yoga.jpg",
      youtubeId: "k6-L2M4kM4U",
      duration: "30 min",
      difficulty: "Easy",
      category: "Prenatal Yoga & Stretching",
    },
    {
      id: "t2-v2",
      title: "Yoga With Adriene - Prenatal",
      thumbnail: "/assets/exercise_thumbnails/t2_strength.jpg",
      youtubeId: "0kF9H80J518",
      duration: "20 min",
      difficulty: "Moderate",
      category: "Strength & Pelvic Floor",
    },
    {
      id: "t2-v3",
      title: "Quick Prenatal Workout",
      thumbnail: "/assets/exercise_thumbnails/t2_cardio.jpg",
      youtubeId: "FqG_8wJ5U0k",
      duration: "25 min",
      difficulty: "Moderate",
      category: "Light Cardio",
    }
  ],
  3: [
    {
      id: "t3-v1",
      title: "Third Trimester Gentle Stretching",
      thumbnail: "/assets/exercise_thumbnails/t3_stretching.jpg",
      youtubeId: "kYJt2xRzM_c",
      duration: "15 min",
      difficulty: "Easy",
      category: "Prenatal Yoga & Stretching",
    },
    {
      id: "t3-v2",
      title: "Hip Opening Yoga for Labor Prep",
      thumbnail: "/assets/exercise_thumbnails/t3_hip_yoga.jpg",
      youtubeId: "k6-L2M4kM4U",
      duration: "20 min",
      difficulty: "Easy",
      category: "Relaxation & Breathing",
    },
    {
      id: "t3-v3",
      title: "Pelvic Floor Exercises",
      thumbnail: "/assets/exercise_thumbnails/t3_pelvic_floor.jpg",
      youtubeId: "0kF9H80J518",
      duration: "10 min",
      difficulty: "Easy",
      category: "Strength & Pelvic Floor",
    }
  ],
};

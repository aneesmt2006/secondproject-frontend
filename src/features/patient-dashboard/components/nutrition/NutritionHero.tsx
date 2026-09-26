import { motion } from "framer-motion";
import nutritionHero from "../../../../assets/images/nutrition-hero.jpg";

interface NutritionHeroProps {
  itemVariants: any;
}

export const NutritionHero = ({ itemVariants }: NutritionHeroProps) => {
  return (
    <motion.div variants={itemVariants} className="relative w-full h-[280px] md:h-[350px] rounded-[2.5rem] overflow-hidden shadow-lg border border-white/60">
      <img 
        src={nutritionHero} 
        alt="Healthy Pregnancy Nutrition" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-2 leading-tight">
          Nourishing Two
        </h2>
        <p className="text-white/90 text-sm md:text-base max-w-lg font-medium">
          A balanced diet during pregnancy gives your baby the nutrients needed for healthy growth while helping you maintain your energy.
        </p>
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";

interface ExerciseHeroProps {
  itemVariants: any;
}

export const ExerciseHero = ({ itemVariants }: ExerciseHeroProps) => {
  return (
    <motion.div
      variants={itemVariants}
      className="relative overflow-hidden rounded-[2.5rem] bg-white/50 backdrop-blur-xl border border-white/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      {/* Decorative background blobs for inner depth */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-40 h-40 rounded-full bg-rose-200/40 blur-3xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-serif font-bold text-slate-800 mb-3">
            Stay Active & Strong
          </h2>
          <p className="text-slate-600 text-sm max-w-[320px] leading-relaxed mb-8 font-medium">
            Empower your pregnancy journey. Regular exercise helps you stay strong for both you and your baby!
          </p>
          
          <div className="inline-flex items-center gap-3 bg-white border border-gray-100 shadow-sm px-5 py-3 rounded-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Weekly Goal</span>
            <div className="w-px h-4 bg-gray-200 mx-1" />
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === 1 ? 'bg-orange-400' : 'bg-gray-200'}`} />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-500 ml-1">1/3</span>
          </div>
        </div>

        {/* Right side illustration placeholder (can be swapped with real img) */}
        <div className="hidden md:flex w-48 h-48 rounded-full border-[6px] border-white shadow-xl overflow-hidden bg-orange-100">
           <img 
              src="/assets/exercise_thumbnails/t2_yoga.jpg" 
              alt="Yoga Hero"
              className="w-full h-full object-cover opacity-90"
           />
        </div>
      </div>
    </motion.div>
  );
};

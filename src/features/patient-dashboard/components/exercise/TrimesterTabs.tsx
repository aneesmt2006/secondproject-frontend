import { motion } from "framer-motion";

interface TrimesterTabsProps {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  userTrimester: number;
}

export const TrimesterTabs = ({ activeTab, setActiveTab, userTrimester }: TrimesterTabsProps) => {
  const tabs = [
    { id: 1, label: "1st Trimester" },
    { id: 2, label: "2nd Trimester" },
    { id: 3, label: "3rd Trimester" },
  ];

  return (
    <div className="flex gap-2 p-1.5 bg-white/50 backdrop-blur-md rounded-2xl w-full max-w-md shadow-sm border border-white/50 mb-6">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isCurrentTrimester = userTrimester === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex-1 py-2.5 text-sm font-bold rounded-xl transition-colors duration-300 ${
              isActive ? "text-white" : "text-[#8D6E63] hover:text-[#5A2D0C]"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="exerciseTab"
                className="absolute inset-0 bg-[#FF8A65] rounded-xl shadow-md"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />
            )}
            <span className="relative z-10 flex items-center justify-center gap-1">
              {tab.label}
              {isCurrentTrimester && (
                 <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onAction: () => void;
  iconBgColor?: string;
}

export const QuickActionCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onAction,
  iconBgColor = "bg-primary",
}: QuickActionCardProps) => {
  return (
    <div className="glass-card rounded-2xl p-3 md:p-5 glass-hover h-full flex flex-col">
      <div className="flex-1">
        <div className={`inline-flex p-2 md:p-3 rounded-lg md:rounded-xl ${iconBgColor} mb-2 md:mb-4`}>
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
        </div>
        <h3 className="text-sm md:text-base font-bold text-foreground mb-1 md:mb-2">{title}</h3>
        <p className="text-[10px] md:text-xs text-muted-foreground leading-relaxed hidden md:block">{description}</p>
      </div>
      <Button
        onClick={onAction}
        className="w-full mt-2 md:mt-4 bg-primary hover:bg-primary/90 text-white rounded-lg md:rounded-xl h-8 md:h-10 text-xs md:text-sm font-medium"
      >
        {buttonText} →
      </Button>
    </div>
  );
};

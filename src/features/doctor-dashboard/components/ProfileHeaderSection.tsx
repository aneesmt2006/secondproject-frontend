import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderSectionProps {
  title: string;
  onBack: () => void;
}

const HeaderSection = ({ title, onBack }: HeaderSectionProps) => (
  <div className="glass-strong rounded-3xl p-4 mx-4 lg:mx-8 mt-6 mb-6">
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={onBack}
        className="glass-card rounded-xl glass-hover"
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
    </div>
  </div>
);

export default HeaderSection;

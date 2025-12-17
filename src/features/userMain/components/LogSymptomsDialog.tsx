import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface LogSymptomsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const moods = [
  { emoji: '😌', label: 'Calm' },
  { emoji: '😊', label: 'Happy' },
  { emoji: '⚡', label: 'Energetic' },
  { emoji: '😜', label: 'Frisky' },
  { emoji: '😕', label: 'Mood swings' },
  { emoji: '😠', label: 'Irritated' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😞', label: 'Depressed' },
  { emoji: '😔', label: 'Feeling guilty' },
  { emoji: '🤯', label: 'Obsessive thoughts' },
  { emoji: '😴', label: 'Low energy' },
  { emoji: '😑', label: 'Apathetic' },
  { emoji: '😕', label: 'Confused' },
  { emoji: '😖', label: 'Very self-critical' },
];

const symptoms = [
  { emoji: '👍', label: 'Everything is fine', gradient: 'from-purple-300/40 to-purple-200/40' },
  { emoji: '🎯', label: 'Cramps', gradient: 'from-orange-300/40 to-pink-300/40' },
  { emoji: '🎯', label: 'Tender breasts', gradient: 'from-pink-400/40 to-purple-400/40' },
  { emoji: '🎯', label: 'Headache', gradient: 'from-blue-300/40 to-purple-300/40' },
  { emoji: '🎯', label: 'Acne', gradient: 'from-orange-200/40 to-brown-300/40' },
  { emoji: '🎯', label: 'Backache', gradient: 'from-pink-400/40 to-red-300/40' },
  { emoji: '🔋', label: 'Fatigue', gradient: 'from-red-200/40 to-pink-200/40' },
  { emoji: '🍕', label: 'Cravings', gradient: 'from-yellow-200/40 to-orange-200/40' },
];

export const LogSymptomsDialog = ({ open, onOpenChange }: LogSymptomsDialogProps) => {
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev => 
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleApply = () => {
    console.log('Selected moods:', selectedMoods);
    console.log('Selected symptoms:', selectedSymptoms);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-background to-secondary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">Today</DialogTitle>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
          </p>
        </DialogHeader>

        {/* Mood Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Mood</h3>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {moods.map((mood) => (
              <motion.button
                key={mood.label}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleMood(mood.label)}
                className={`relative p-3 rounded-2xl border-2 transition-all ${
                  selectedMoods.includes(mood.label)
                    ? 'border-primary bg-primary/10'
                    : 'border-border/40 bg-background/60 hover:border-primary/50'
                }`}
              >
                {selectedMoods.includes(mood.label) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div className="text-3xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium text-foreground">{mood.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Symptoms Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4">Symptoms</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {symptoms.map((symptom) => (
              <motion.button
                key={symptom.label}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSymptom(symptom.label)}
                className={`relative p-4 rounded-2xl border-2 transition-all bg-gradient-to-br ${symptom.gradient} ${
                  selectedSymptoms.includes(symptom.label)
                    ? 'border-primary ring-2 ring-primary/20'
                    : 'border-border/40 hover:border-primary/50'
                }`}
              >
                {selectedSymptoms.includes(symptom.label) && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="text-2xl">{symptom.emoji}</div>
                  <div className="text-sm font-medium text-foreground text-left">{symptom.label}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <Button 
          onClick={handleApply}
          className="w-full py-6 text-lg font-bold rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
        >
          Apply
        </Button>
      </DialogContent>
    </Dialog>
  );
};

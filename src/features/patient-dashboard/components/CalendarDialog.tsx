import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { useIsMobile } from '@/hooks/use-mobile';
import { X } from 'lucide-react';

interface CalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export const CalendarDialog = ({ open, onOpenChange, selectedDate, onDateSelect }: CalendarDialogProps) => {
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState('');
  const isMobile = useIsMobile();

  const dateKey = format(selectedDate, 'yyyy-MM-dd');

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
      const key = format(date, 'yyyy-MM-dd');
      setCurrentNote(notes[key] || '');
    }
  };

  const handleSaveNote = () => {
    setNotes({
      ...notes,
      [dateKey]: currentNote
    });
  };

  const calendarContent = (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border-none"
      />
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          Notes for {format(selectedDate, 'MMM dd, yyyy')}
        </label>
        <Textarea
          placeholder="Add notes for this date..."
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
          className="min-h-[60px]"
        />
        <Button onClick={handleSaveNote} className="w-full bg-periwinkle hover:bg-lavender">
          Save Note
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="h-[80vh] bg-cream rounded-t-3xl border-t-2 border-periwinkle/20">
          <DrawerHeader className="relative border-b border-periwinkle/10 pb-4">
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-periwinkle/10 transition-colors"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            <DrawerTitle className="text-xl text-foreground text-left">Calendar & Notes</DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 py-6">
            {calendarContent}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-cream">
        <DialogHeader>
          <DialogTitle>Calendar & Notes</DialogTitle>
        </DialogHeader>
        {calendarContent}
      </DialogContent>
    </Dialog>
  );
};

import { Edit2, Trash2 } from 'lucide-react';
import { SymptomsData } from '../../types';

interface SymptomsListProps {
  symptomsList: SymptomsData[];
  onEdit: (data: SymptomsData) => void;
  onDelete: (week: number) => void;
  onCreate: () => void;
}

export const SymptomsList = ({ symptomsList, onEdit, onDelete, onCreate }: SymptomsListProps) => {
  console.log("SYMptoms list ------------------->",symptomsList)
  if (symptomsList.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-rose/20 border-dashed">
        <p className="text-cocoa/40">No symptoms content added yet.</p>
        <button 
          onClick={onCreate}
          className="text-rose font-semibold mt-2 hover:underline"
        >
          Create your first entry
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {symptomsList.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-xl border border-rose/20 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-cocoa">Week {item.week}</h3>
            <p className="text-sm text-cocoa/60">
              Includes normal & abnormal symptoms
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit(item)}
              className="p-2 hover:bg-rose/10 rounded-lg text-cocoa/60 hover:text-rose transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => onDelete(item.week)}
              className="p-2 hover:bg-red-50 rounded-lg text-cocoa/60 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

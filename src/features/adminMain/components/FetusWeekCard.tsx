import { Eye, Edit } from 'lucide-react';
import {  fetusForm } from '../types';

interface FetusWeekCardProps {
  data: fetusForm;
  onView: (data: fetusForm) => void;
  onEdit: (week: number) => void;
}

const FetusWeekCard = ({ data, onView, onEdit }: FetusWeekCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-rose/20 overflow-hidden hover:shadow-lg transition-all group">
      {/* Image */}
      <div className="relative h-40 bg-cream overflow-hidden">
        <img
          src={data.fetusImage}
          alt={`Week ${data.week}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 bg-gradient-to-r bg-rose text-white px-3 py-1 rounded-full text-sm font-bold">
          Week {data.week}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex-1">
            <p className="text-xs text-cocoa/60 mb-1">Weight</p>
            <p className="text-sm font-semibold text-cocoa">{data.weight}g</p>
          </div>
          <div className="flex-1">
            <p className="text-xs text-cocoa/60 mb-1">Length</p>
            <p className="text-sm font-semibold text-cocoa">{data.height}cm</p>
          </div>
        </div>

        {/* Fruit Preview */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src={data.fruitImage}
            alt="Fruit comparison"
            className="w-10 h-10 rounded-lg object-cover border border-rose/20"
          />
          <p className="text-xs text-cocoa/60">Size comparison</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onView(data)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-cream text-cocoa rounded-lg hover:bg-rose/10 transition-colors text-sm font-semibold"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={() => onEdit(data.week)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r bg-rose  text-white rounded-lg hover:shadow-lg transition-all text-sm font-semibold"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FetusWeekCard;

import { X, Edit } from 'lucide-react';
import { FetusPreviewModalProps } from '../types';




const FetusPreviewModal = ({ data, onClose, onEdit }: FetusPreviewModalProps) => {
  return (
    <div className="fixed inset-0 bg-cocoa/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-rose to-lilac text-white p-6 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="text-3xl font-bold">Week {data.week}</h2>
            <p className="text-white/90 mt-1">Fetal Development Details</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Images Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Fetus Image */}
            <div>
              <h3 className="text-lg font-bold text-cocoa mb-3">Fetus Development</h3>
              <div className="rounded-xl overflow-hidden border border-rose/20">
                <img
                  src={data.fetusImage}
                  alt={`Week ${data.week} fetus`}
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Fruit Comparison */}
            <div>
              <h3 className="text-lg font-bold text-cocoa mb-3">Size Comparison</h3>
              <div className="rounded-xl overflow-hidden border border-rose/20">
                <img
                  src={data.fruitImage}
                  alt="Fruit comparison"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-cream rounded-xl p-4 border border-rose/20">
              <p className="text-sm text-cocoa/60 mb-1">Baby Weight</p>
              <p className="text-2xl font-bold text-cocoa">{data.weight} <span className="text-lg">grams</span></p>
            </div>
            <div className="bg-cream rounded-xl p-4 border border-rose/20">
              <p className="text-sm text-cocoa/60 mb-1">Baby Length</p>
              <p className="text-2xl font-bold text-cocoa">{data.height} <span className="text-lg">cm</span></p>
            </div>
          </div>

          {/* Development Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-cocoa mb-3">Major Development This Week</h3>
            <div 
              className="prose prose-sm max-w-none text-cocoa bg-cream/50 rounded-xl p-6 border border-rose/20"
              dangerouslySetInnerHTML={{ __html: data.development }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end pt-4 border-t border-rose/20">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-rose/20 text-cocoa rounded-lg hover:bg-rose/5 transition-colors font-semibold"
            >
              Close
            </button>
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-rose to-lilac text-white rounded-lg hover:shadow-lg transition-all font-semibold"
            >
              <Edit className="w-4 h-4" />
              Edit Week
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetusPreviewModal;

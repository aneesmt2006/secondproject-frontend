import { Eye } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { SymptomsData } from '../../types';

interface SymptomsFormProps {
  formData: SymptomsData;
  setFormData: (data: SymptomsData) => void;
  onSave: () => void;
  onCancel: () => void;
  onPreview: () => void;
}

const arrayToHtml = (arr: string[] = []) => {
  if (!Array.isArray(arr)) return "";
  return arr.map(s => `<p>${s}</p>`).join("");
};

const htmlToArray = (html: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const nodes = doc.querySelectorAll("p, li");
  return Array.from(nodes).map(n => n.textContent || "").filter(t => t.trim() !== "");
};

export const SymptomsForm = ({ formData, setFormData, onSave, onCancel, onPreview }: SymptomsFormProps) => {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  return (
    <div className="bg-white rounded-xl border border-rose/20 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-cocoa">Add Week Symptoms</h2>
        <button 
          onClick={onCancel}
          className="text-cocoa/60 hover:text-rose transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="space-y-6">
        {/* Week Selector */}
        <div>
          <label className="block text-sm font-semibold text-cocoa mb-2">
            Pregnancy Week <span className="text-rose">*</span>
          </label>
          <select
            value={formData.week}
            onChange={(e) => setFormData({ ...formData, week: Number(e.target.value) })}
            className="w-full px-4 py-2 bg-white border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
          >
            {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
              <option key={w} value={w}>Week {w}</option>
            ))}
          </select>
        </div>

        {/* Normal Symptoms Editor */}
        <div>
          <label className="block text-sm font-semibold text-cocoa mb-2">
            Normal Symptoms <span className="text-rose">*</span>
          </label>
          <div className="bg-white rounded-lg border border-rose/20 overflow-hidden">
            <ReactQuill
              theme="snow"
              value={arrayToHtml(formData.normalSymptoms)}
              onChange={(content) => setFormData({ ...formData, normalSymptoms: htmlToArray(content) })}
              modules={modules}
              placeholder="List normal symptoms..."
              className="h-48 mb-12"
            />
          </div>
        </div>

        {/* Abnormal Symptoms Editor */}
        <div>
          <label className="block text-sm font-semibold text-cocoa mb-2">
            Abnormal Symptoms (Watch-outs) <span className="text-rose">*</span>
          </label>
          <div className="bg-white rounded-lg border border-rose/20 overflow-hidden">
            <ReactQuill
              theme="snow"
              value={arrayToHtml(formData.abnormalSymptoms)}
              onChange={(content) => setFormData({ ...formData, abnormalSymptoms: htmlToArray(content) })}
              modules={modules}
              placeholder="List abnormal symptoms..."
              className="h-48 mb-12"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            onClick={onPreview}
            className="px-6 py-2 border border-rose/20 text-cocoa rounded-lg hover:bg-rose/5 transition-colors font-semibold flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            Save Symptoms
          </button>
        </div>
      </div>
    </div>
  );
};

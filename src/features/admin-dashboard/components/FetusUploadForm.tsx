import { useState, useEffect } from 'react';
import { Upload, X } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FetusUploadFormProps } from '../types';
import { ThreeDot } from 'react-loading-indicators';



const FetusUploadForm = ({ onSave, onCancel, editingData ,loading,setLoading}: FetusUploadFormProps) => {
  const [fetusFile,setFetusFile] = useState<File|null>(null)
  const [fruitFile,setFruitFile] = useState<File|null>(null)
  const [week, setWeek] = useState<number>(editingData?.week || 1);
  const [fetusPreview, setFetusPreview] = useState<string>(editingData?.fetusImage || '');
  const [fruitPreview, setFruitPreview] = useState<string>(editingData?.fruitImage || '');
  const [weight, setWeight] = useState<string>(editingData?.weight || '');
  const [height, setHeight] = useState<string>(editingData?.height || '');
  const [development, setDevelopment] = useState<string>(editingData?.development || '');
  

  // const [formData,setFormData] = useState<fetusForm>({
  //    fetusWeek:'',
  //    fetusImage:'',
  //    fetusFruitSize:'',
  //    fetusWeight:'',
  //    fetusHeight:'',
  //    fetusContent:''
  // })

  useEffect(() => {
    if (editingData) {
      setWeek(editingData.week);
      setFetusPreview(editingData.fetusImage!);
      setFruitPreview(editingData.fruitImage!);
      setWeight(editingData.weight);
      setHeight(editingData.height);
      setDevelopment(editingData.development);
      setFetusFile(null)
      setFruitFile(null)
    }
  }, [editingData]);

  const handleImageUpload = (file: File,setFile:(f:File | null)=>void,setPreview:(url:string)=>void) => {
    if(file && file.type.startsWith('image/')){
      setFile(file)
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
    }
  };

  useEffect(()=>{
    return ()=>{
      if(fetusPreview.startsWith('blob:')) URL.revokeObjectURL(fetusPreview);
      if(fruitPreview.startsWith('blob:')) URL.revokeObjectURL(fruitPreview)
    }
  },[fetusPreview,fruitPreview])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(!loading)
    onSave({
      week,
      fetusFile,
      fruitFile,
      weight,
      height,
      development,
      fetusImage:editingData?.fetusImage||'',
      fruitImage:editingData?.fruitImage||''
    });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  return (
    <div className="bg-cream/50 rounded-xl p-6 border border-rose/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-cocoa">
          {editingData ? `Edit Week ${week}` : 'Add New Week Data'}
        </h3>
        <button
          onClick={onCancel}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-rose/10 transition-colors"
        >
          <X className="w-5 h-5 text-cocoa/60" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Week Selection */}
        <div>
          <label className="block text-sm font-semibold text-cocoa mb-2">
            Pregnancy Week <span className="text-rose">*</span>
          </label>
          <select
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            className="w-full px-4 py-2 bg-white border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
            required
          >
            {Array.from({ length: 40 }, (_, i) => i + 1).map((w) => (
              <option key={w} value={w}>Week {w}</option>
            ))}
          </select>
        </div>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fetus Illustration */}
          <div>
            <label className="block text-sm font-semibold text-cocoa mb-2">
              Fetus Illustration <span className="text-rose">*</span>
            </label>
            <div className="relative">
              {fetusPreview ? (
                <div className="relative">
                  <img
                    src={fetusPreview}
                    alt="Fetus"
                    className="w-full h-48 object-cover rounded-lg border border-rose/20"
                  />
                  <button
                    type="button"
                    onClick={() => setFetusPreview('')}
                    className="absolute top-2 right-2 w-8 h-8 bg-wine/90 text-white rounded-lg flex items-center justify-center hover:bg-wine transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-rose/30 rounded-lg cursor-pointer hover:bg-rose/5 transition-colors">
                  <Upload className="w-8 h-8 text-cocoa/40 mb-2" />
                  <span className="text-sm text-cocoa/60">Upload Fetus Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file,setFetusFile,setFetusPreview);
                      
                    }}
                    required={!fetusPreview}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Fruit Comparison */}
          <div>
            <label className="block text-sm font-semibold text-cocoa mb-2">
              Fruit Size Comparison <span className="text-rose">*</span>
            </label>
            <div className="relative">
              {fruitPreview ? (
                <div className="relative">
                  <img
                    src={fruitPreview}
                    alt="Fruit"
                    className="w-full h-48 object-cover rounded-lg border border-rose/20"
                  />
                  <button
                    type="button"
                    onClick={() =>{setFruitPreview('');
                      setFruitFile(null);
                      if (fruitPreview.startsWith('blob:')) URL.revokeObjectURL(fruitPreview);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-wine/90 text-white rounded-lg flex items-center justify-center hover:bg-wine transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-rose/30 rounded-lg cursor-pointer hover:bg-rose/5 transition-colors">
                  <Upload className="w-8 h-8 text-cocoa/40 mb-2" />
                  <span className="text-sm text-cocoa/60">Upload Fruit Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleImageUpload(file,setFruitFile,setFruitPreview);
                      
                    }}
                    required={!fruitPreview}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Measurements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-cocoa mb-2">
              Baby Weight (grams) <span className="text-rose">*</span>
            </label>
            <input
              type="text"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g., 500"
              className="w-full px-4 py-2 bg-white border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-cocoa mb-2">
              Baby Height/Length (cm) <span className="text-rose">*</span>
            </label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 25.6"
              className="w-full px-4 py-2 bg-white border border-rose/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose/30 text-cocoa"
              required
            />
          </div>
        </div>

        {/* Development Editor */}
        <div>
          <label className="block text-sm font-semibold text-cocoa mb-2">
            Major Development of the Week <span className="text-rose">*</span>
          </label>
          <div className="bg-white rounded-lg border border-rose/20 overflow-hidden">
            <ReactQuill
              theme="snow"
              value={development}
              onChange={setDevelopment}
              modules={modules}
              placeholder="Describe the major developments for this week..."
              className="fetus-editor"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-rose/20 text-cocoa rounded-lg hover:bg-rose/5 transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r bg-rose  text-white rounded-lg hover:shadow-lg transition-all font-semibold"
          >
            {loading?<span>Uplaoding <ThreeDot size='small' color='white'/></span>:(editingData ? 'Update Week Data' : 'Save Week Data')}  
          </button>
        </div>
      </form>

      <style>{`
        .fetus-editor .ql-editor {
          min-height: 200px;
          font-family: inherit;
        }
        .fetus-editor .ql-toolbar {
          border-bottom: 1px solid hsl(var(--rose) / 0.2);
        }
      `}</style>
    </div>
  );
};

export default FetusUploadForm;

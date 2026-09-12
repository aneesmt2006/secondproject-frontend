import { useEffect, useState } from 'react';
import { Plus, Baby } from 'lucide-react';
import FetusUploadForm from '../components/FetusUploadForm';
import FetusWeekCard from '../components/FetusWeekCard';
import FetusPreviewModal from '../components/FetusPreviewModal';
import {  fetusForm } from '../types';
import { toast } from 'sonner';
import {  fetusCreate, fetusUpdate, getWeeks } from '../../../services/api/users-management.service'



const FetusKnowledge = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [weeklyData, setWeeklyData] = useState<fetusForm[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<fetusForm | null>(null);
  const [editingWeek, setEditingWeek] = useState<number | null>(null);
  const [loading,setLoading] = useState<boolean>(false)


  useEffect(()=>{
    const loadWeek = async ()=>{
       const response = await getWeeks()
       setWeeklyData(response.data!)
    }

    loadWeek()
  },[])

  const handleSaveData = async(data: fetusForm) => {
    console.log("Fetusdata---->",data) 
   try {
    let response 
    if(editingWeek!==null){
      console.log("EDITING WEEK")
        response = await fetusUpdate(data)
    }else{
      response = await fetusCreate(data)
    }
    toast.success(response!.message)
    if(response){
      setLoading(false)
      console.log("response after content",response.data)
      setWeeklyData(prev => {
      const existingIndex = prev.findIndex(item => item.week === data.week);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = data;
        return updated;
      }
      return [...prev, data].sort((a, b) => a.week - b.week);
    });
    setShowUploadForm(false);
    setEditingWeek(null);
    }
   } catch (error) {
    setLoading(false)
    console.log("ERRO fetus",error)
    // toast.error(error)
   }
  };

  // const editingWeek = async(data:fetusForm)=>{
  //   // try {
  //   //   const response = await editWeek(data)
  //   //   toast.success('kkk')
  //   // } catch (error) {
  //   //   toast.error('bbb')
  //   // }
  // }

  const handleEditWeek = (week: number) => {
    console.log("FROm edit set")
    setEditingWeek(week);
    console.log('editweek',editingWeek)
    setShowUploadForm(true);
  };

  const handleViewWeek = (data: fetusForm) => {
    setSelectedWeek(data);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-cocoa mb-2">Fetus Development by Week</h2>
          <p className="text-cocoa/60">Upload and manage weekly fetal development content</p>
        </div>
        <button
          onClick={() => {
            setEditingWeek(null);
            setShowUploadForm(!showUploadForm);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add Week Data
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="mb-8">
          <FetusUploadForm
            onSave={handleSaveData}
            onCancel={() => {
              setShowUploadForm(false);
              setEditingWeek(null);
            }}
            loading={loading}
            setLoading={setLoading}
            editingData={editingWeek !== null ? weeklyData.find(d => d.week === editingWeek) : undefined}
          />
        </div>
      )}

      {/* Week Cards Grid */}
      {weeklyData.length === 0 ? (
        <div className="text-center py-16">
          <Baby className="w-16 h-16 text-cocoa/20 mx-auto mb-4" />
          <p className="text-cocoa/60">No weekly data uploaded yet</p>
          <p className="text-sm text-cocoa/40 mt-2">Click "Add Week Data" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {weeklyData.sort((a,b)=>a.week-b.week).map((data) => (
            <FetusWeekCard
              key={data.week}
              data={data}
              onView={handleViewWeek}
              onEdit={handleEditWeek}
            />
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {selectedWeek && (
        <FetusPreviewModal
          data={selectedWeek}
          onClose={() => setSelectedWeek(null)}
          onEdit={() => {
            handleEditWeek(selectedWeek.week);
            setSelectedWeek(null);
          }}
        />
      )}
    </div>
  );
};

export default FetusKnowledge;

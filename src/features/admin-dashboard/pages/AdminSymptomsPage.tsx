import { Plus } from 'lucide-react';
import { useSymptoms } from '../hooks/useSymptoms';
import { SymptomsList } from '../components/symptoms/SymptomsList';
import { SymptomsForm } from '../components/symptoms/SymptomsForm';
import { SymptomsPreviewModal } from '../components/symptoms/SymptomsPreviewModal';

const AdminSymptomsPage = () => {
  const {
    isCreating,
    setIsCreating,
    previewData,
    setPreviewData,
    formData,
    setFormData,
    symptomsList,
    handleSave,
    handlePreview,
    handleCancel,
    handleEdit,
    handleDelete,
  } = useSymptoms();

  if (isCreating) {
    return (
      <>
        <SymptomsForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onCancel={handleCancel}
          onPreview={handlePreview}
        />
        <SymptomsPreviewModal
          previewData={previewData}
          onClose={() => setPreviewData(null)}
        />
      </>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-cocoa">Symptoms Management</h2>
          <p className="text-cocoa/60">Manage weekly symptoms content</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 px-6 py-3 bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold"
        >
          <Plus className="w-5 h-5" />
          Add New Week
        </button>
      </div>

      <SymptomsList
        symptomsList={symptomsList}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={() => setIsCreating(true)}
      />
    </div>
  );
};

export default AdminSymptomsPage;

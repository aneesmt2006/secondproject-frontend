import { useState } from 'react';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { toast } from 'sonner';
import Modal from '../components/AdminModal';
import { Doctor } from '../types';
import PdfViewerModal from '@/components/PdfViewerModal';
import { readSignedUrl } from '@/services/api/users-management.service';

interface DoctorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  onUpdateStatus: (id: string, status: Doctor['status'], doctor: Doctor) => void;
}

const DoctorDetailModal = ({
  isOpen,
  onClose,
  doctor,
  onUpdateStatus,
}: DoctorDetailModalProps) => {
  // PDF Viewer State
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);
  const [currentPdfUrl, setCurrentPdfUrl] = useState<string | null>(null);
  const [currentFileName, setCurrentFileName] = useState<string>('');

  // Handler to view certificate
  const handleViewCertificate = async (url: string, name: string) => {
    try {
      const response = await readSignedUrl(url);
      if (response.success && response.data) {
        setCurrentPdfUrl(response.data);
        setCurrentFileName(name);
        setIsPdfViewerOpen(true);
      } else {
        toast.error("Failed to retrieve document");
      }
    } catch (error) {
      console.error("Error fetching signed URL:", error);
      toast.error("Error opening document");
    }
  };

  const closePdfViewer = () => {
    setIsPdfViewerOpen(false);
    setCurrentPdfUrl(null);
  };

  if (!doctor) return null;

  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} title="Doctor Profile">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <img
            src={
              doctor.avatar_url ||
              `https://ui-avatars.com/api/?name=${doctor.full_name}&background=7A77B9&color=fff&size=128`
            }
            alt={doctor.full_name}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-cocoa mb-1">
              {doctor.full_name}
            </h3>
            <p className="text-cocoa/60 mb-2">{doctor.email}</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                doctor.status === 'approved'
                  ? 'bg-green-100 text-green-700'
                  : doctor.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {doctor.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-cream p-4 rounded-lg">
            <p className="text-sm text-cocoa/60 mb-1">Specialization</p>
            <p className="font-semibold text-cocoa">{doctor.specialization}</p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <p className="text-sm text-cocoa/60 mb-1">Location</p>
            <p className="font-semibold text-cocoa">{doctor.location}</p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <p className="text-sm text-cocoa/60 mb-1">Consultation Fee</p>
            <p className="font-semibold text-cocoa">${doctor.fee}</p>
          </div>
          <div className="bg-cream p-4 rounded-lg">
            <p className="text-sm text-cocoa/60 mb-1">Total Appointments</p>
            <p className="font-semibold text-cocoa">
              {doctor.total_appointments}
            </p>
          </div>
          {doctor.experience_years && (
            <div className="bg-cream p-4 rounded-lg">
              <p className="text-sm text-cocoa/60 mb-1">Experience</p>
              <p className="font-semibold text-cocoa">
                {doctor.experience_years} years
              </p>
            </div>
          )}
        </div>

        {doctor.qualifications && doctor.qualifications.length > 0 && (
          <div>
            <h4 className="font-semibold text-cocoa mb-2">
              Qualifications Documents
            </h4>
            <div className="space-y-2">
              {doctor.qualifications.map((url, index) => {
                const fileName = url.split('/').pop() || `Certificate ${index + 1}`;
                return (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-rose/20 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <svg
                        className="w-5 h-5 text-rose flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-sm font-medium text-cocoa truncate">
                        {fileName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleViewCertificate(url, fileName)}
                        className="p-2 rounded-lg bg-rose/10 text-rose hover:bg-rose/20 transition-colors"
                        title="View Certificate"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Download Certificate"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {doctor.bio && (
          <div>
            <h4 className="font-semibold text-cocoa mb-2">Bio</h4>
            <p className="text-cocoa/80 bg-cream p-4 rounded-lg">{doctor.bio}</p>
          </div>
        )}

        {doctor.status === 'pending' && (
          <div className="flex gap-3 pt-4 border-t border-rose/20">
            <button
              onClick={() => {
                onUpdateStatus(doctor.doctorId!, 'approved', doctor);
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Approve Doctor
            </button>
            <button
              onClick={() => {
                onUpdateStatus(doctor.doctorId!, 'rejected', doctor);
                onClose();
              }}
              className="flex-1 py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-semibold flex items-center justify-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Reject Application
            </button>
          </div>
        )}
      </div>
    </Modal>
    
    <PdfViewerModal 
      isOpen={isPdfViewerOpen}
      onClose={closePdfViewer}
      pdfUrl={currentPdfUrl}
      fileName={currentFileName}
    />
    </>
  );
};

export default DoctorDetailModal;

import { CheckCircle, XCircle } from 'lucide-react';
import Modal from '../../../components/AdminModal';
import { Doctor } from '../types';

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
  if (!doctor) return null;

  return (
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

        {doctor.qualifications && (
          <div>
            <h4 className="font-semibold text-cocoa mb-2">
              Qualifications Documents
            </h4>
            {doctor.qualifications.map((i, index) => (
              <a
                key={index}
                href={i}
                target="_blank"
                rel="noopener noreferrer"
                className="block mb-2"
              >
                <p className="text-blue-500 bg-white p-4 rounded-lg hover:underline truncate">
                  {i}
                </p>
              </a>
            ))}
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
  );
};

export default DoctorDetailModal;

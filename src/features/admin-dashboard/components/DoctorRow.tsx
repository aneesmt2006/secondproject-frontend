import { useState } from 'react';
import {
  CheckCircle,
  XCircle,
  Edit,
  Eye,
  MoreVertical,
  Users,
} from 'lucide-react';
import { Doctor } from '../types';

interface DoctorRowProps {
  doctor: Doctor;
  onViewProfile: (doctor: Doctor) => void;
  onUpdateStatus: (id: string, status: Doctor['status'], doctor: Doctor) => void;
}

const DoctorRow = ({ doctor, onViewProfile, onUpdateStatus }: DoctorRowProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStatusUpdate = (status: Doctor['status']) => {
    onUpdateStatus(doctor.doctorId!, status, doctor);
    setIsMenuOpen(false);
  };

  return (
    <tr className="hover:bg-cream/50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <img
            src={
              doctor.avatar_url ||
              `https://ui-avatars.com/api/?name=${doctor.full_name}&background=7A77B9&color=fff`
            }
            alt={doctor.full_name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-cocoa">{doctor.full_name}</p>
            <p className="text-sm text-cocoa/60">{doctor.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-cocoa">{doctor.specialization}</td>
      <td className="px-6 py-4 text-cocoa">{doctor.location}</td>
      <td className="px-6 py-4 text-cocoa font-semibold">${doctor.fee}</td>
      <td className="px-6 py-4">
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
      </td>
      <td className="px-6 py-4 text-cocoa">{doctor.total_appointments}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {doctor.status === 'pending' && (
            <>
              <button
                onClick={() => handleStatusUpdate('approved')}
                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all"
                title="Approve"
              >
                <CheckCircle className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleStatusUpdate('rejected')}
                className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                title="Reject"
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
          {doctor.status === 'rejected' && (
            <span className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-semibold">
              Rejected
            </span>
          )}
          {doctor.status === 'approved' && (
            <button
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onViewProfile(doctor)}
            className="p-2 bg-periwinkle/20 text-periwinkle rounded-lg hover:bg-periwinkle/30 transition-all"
            title="View Profile"
          >
            <Eye className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
              title="More Actions"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-0"
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-10 overflow-hidden">
                  {doctor.status !== 'approved' && (
                    <button
                      onClick={() => handleStatusUpdate('approved')}
                      className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-green-50 flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  )}
                  {doctor.status !== 'rejected' && (
                    <button
                      onClick={() => handleStatusUpdate('rejected')}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                  {doctor.status !== 'pending' && (
                    <button
                      onClick={() => handleStatusUpdate('pending')}
                      className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-yellow-50 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      Set to Pending
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

export default DoctorRow;

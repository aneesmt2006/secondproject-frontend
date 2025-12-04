import { Doctor } from '../types';
import DoctorRow from './DoctorRow';

interface DoctorsTableProps {
  doctors: Doctor[];
  onViewProfile: (doctor: Doctor) => void;
  onUpdateStatus: (id: string, status: Doctor['status'], doctor: Doctor) => void;
}

const DoctorsTable = ({ doctors, onViewProfile, onUpdateStatus }: DoctorsTableProps) => {
  return (
    <div className="bg-white rounded-xl border border-rose/20 overflow-hidden">
      <h3 className="text-xl font-bold text-cocoa p-6 border-b border-rose/20">
        All Doctors
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r bg-rose/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">
                Doctor
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">
                Specialization
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">
                Location
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">
                Fee
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">
                Appointments
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-cocoa">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rose/10">
            {doctors.map((doctor) => (
              <DoctorRow
                key={doctor.id}
                doctor={doctor}
                onViewProfile={onViewProfile}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsTable;

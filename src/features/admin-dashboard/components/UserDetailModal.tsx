/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPortal } from 'react-dom';
import { X, Calendar, Activity, Heart, AlertCircle, Pill, Users } from 'lucide-react';
import { User } from '../types';

interface UserDetailModalProps {
  user: User;
  onClose: () => void;
}

const UserDetailModal = ({ user, onClose }: UserDetailModalProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const InfoItem = ({ label, value, icon: Icon, colorClass = "text-rose", bgClass = "bg-cream/30" }: { label: string; value: string | number | boolean; icon?: any, colorClass?: string, bgClass?: string }) => (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${bgClass}`}>
      {Icon && <Icon className={`w-5 h-5 mt-0.5 ${colorClass}`} />}
      <div>
        <p className="text-xs font-medium text-cocoa/60 uppercase tracking-wide">{label}</p>
        <p className="font-semibold text-cocoa mt-0.5">
          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value || 'N/A'}
        </p>
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SectionTitle = ({ title, icon: Icon, colorClass = "text-rose" }: { title: string; icon: any, colorClass?: string }) => (
    <div className={`flex items-center gap-2 mb-4 pb-2 border-b border-gray-100`}>
      <Icon className={`w-5 h-5 ${colorClass}`} />
      <h3 className="text-lg font-bold text-cocoa">{title}</h3>
    </div>
  );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-all text-cocoa hover:text-rose"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto custom-scrollbar rounded-2xl">
          {/* Header Background */}
          <div className="h-28 bg-gradient-to-r from-rose/20 to-lilac/20"></div>

          <div className="px-8 pb-8">
            {/* Profile Header */}
            <div className="relative -mt-12 mb-8 flex items-end gap-6">
              <img
                src={user.profileImage || `https://ui-avatars.com/api/?name=${user.full_name}&background=D4798B&color=fff`}
                alt={user.full_name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover bg-white"
              />
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-cocoa">{user.full_name}</h2>
                <p className="text-cocoa/60  mt-3">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    user.status === true ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                  <span className="text-sm text-cocoa/60">• {user.phone}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Pregnancy Details - Blue Theme */}
              <section>
                <SectionTitle title="Pregnancy Overview" icon={Calendar} colorClass="text-blue-500" />
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem label="Current Week" value={`Week ${user.currentWeek}`} colorClass="text-blue-500" bgClass="bg-blue-50" />
                  <InfoItem label="Due Date" value={formatDate(user.dueDate)} colorClass="text-blue-500" bgClass="bg-blue-50" />
                  <InfoItem label="First Pregnancy" value={user.isFirstPregnancy} colorClass="text-blue-500" bgClass="bg-blue-50" />
                </div>
              </section>

              {/* Physical Stats - Emerald Theme */}
              <section>
                <SectionTitle title="Physical Stats" icon={Activity} colorClass="text-emerald-500" />
                <div className="grid grid-cols-2 gap-3">
                  <InfoItem label="Blood Group" value={user.bloodGroup} colorClass="text-emerald-500" bgClass="bg-emerald-50" />
                  <InfoItem label="Blood Pressure" value={user.bpReading || (user.bloodPressure ? 'Yes' : 'Normal')} colorClass="text-emerald-500" bgClass="bg-emerald-50" />
                  <InfoItem label="Height" value={`${user.height} cm`} colorClass="text-emerald-500" bgClass="bg-emerald-50" />
                  <InfoItem label="Weight" value={`${user.weight} kg`} colorClass="text-emerald-500" bgClass="bg-emerald-50" />
                </div>
              </section>

              {/* Health Conditions - Rose Theme */}
              <section>
                <SectionTitle title="Medical Conditions" icon={Heart} colorClass="text-rose" />
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <InfoItem label="Gestational Diabetes" value={user.gestationalDiabetes} colorClass="text-rose" bgClass="bg-rose/10" />
                    <InfoItem label="Sugar Level" value={user.gestationalSugar} colorClass="text-rose" bgClass="bg-rose/10" />
                    <InfoItem label="Thyroid" value={user.thyroidProblems} colorClass="text-rose" bgClass="bg-rose/10" />
                    <InfoItem label="PCOS/PCOD" value={user.pcosPcod} colorClass="text-rose" bgClass="bg-rose/10" />
                  </div>
                </div>
              </section>

              {/* Additional Info - Violet Theme */}
              <section>
                <SectionTitle title="Additional Information" icon={AlertCircle} colorClass="text-violet-500" />
                <div className="space-y-3">
                  <InfoItem label="Allergies" value={user.knownAllergies} icon={AlertCircle} colorClass="text-violet-500" bgClass="bg-violet-50" />
                  <InfoItem label="Supplements" value={user.takingSupplements} icon={Pill} colorClass="text-violet-500" bgClass="bg-violet-50" />
                  <InfoItem label="Family History" value={user.familyRelated} icon={Users} colorClass="text-violet-500" bgClass="bg-violet-50" />
                  <InfoItem label="Other Issues" value={user.otherHealthIssues} colorClass="text-violet-500" bgClass="bg-violet-50" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UserDetailModal;

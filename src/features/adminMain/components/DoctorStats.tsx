import { Users, Stethoscope, CheckCheck, ArrowRight } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorStatsProps {
  doctors: Doctor[];
}

const DoctorStats = ({ doctors }: DoctorStatsProps) => {
  const stats = {
    pending: doctors.filter((d) => d.status === 'pending').length,
    total: doctors.length,
    approved: doctors.filter((d) => d.status === 'approved').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl p-6 border border-rose/20 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-cocoa/60 mb-1">Pending Applications</p>
            <h3 className="text-4xl font-bold text-cocoa">{stats.pending}</h3>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
        <button className="w-full py-2 px-4 bg-gradient-to-r bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
          Review Applications
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-rose/20 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-cocoa/60 mb-1">Total Doctors</p>
            <h3 className="text-4xl font-bold text-cocoa">{stats.total}</h3>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-blue-600" />
          </div>
        </div>
        <button className="w-full py-2 px-4 bg-gradient-to-r bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
          View All Doctors
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border border-rose/20 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-cocoa/60 mb-1">Approved Doctors</p>
            <h3 className="text-4xl font-bold text-cocoa">{stats.approved}</h3>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
        <button className="w-full py-2 px-4 bg-gradient-to-r bg-rose text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2">
          Manage Approved
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DoctorStats;

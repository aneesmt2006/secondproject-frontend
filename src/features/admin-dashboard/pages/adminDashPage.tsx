import { 
  Users, Stethoscope, Calendar, IndianRupee, 
  Activity, Star
} from 'lucide-react';
import AdminStatCard from '../components/AdminStatCard';
import { useAdminDashboardStats } from '../hooks/useAdminDashboardStats';

const AdminDashboard = () => {
  const { data, loading, period, setPeriod } = useAdminDashboardStats('monthly');

  if (loading || !data) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-rose border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-cocoa/60 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  const maxRevenueValue = data.revenueOverview.length > 0 ? Math.max(...data.revenueOverview.map(d => d.amount)) : 0;


  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-cocoa mb-8">Admin Dashboard</h1>

      {/* TOP ROW: KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard
          title="Total Registered Women"
          value={data.totalRegisteredWomen.toLocaleString()}
          subtitle="All time patients"
          icon={Users}
        />
        <AdminStatCard
          title="Pending Doctor Approvals"
          value={data.pendingDoctorApprovals}
          subtitle="Requires attention"
          icon={Stethoscope}
        />
        <AdminStatCard
          title="Upcoming Appointments"
          value={data.upcomingAppointments}
          subtitle="Next 7 days"
          icon={Calendar}
        />
        <AdminStatCard
          title="Total Revenue"
          value={`₹${(data.totalRevenue / 1000).toFixed(1)}k`}
          subtitle="YTD excluding refunds"
          icon={IndianRupee}
        />
      </div>

      {/* MIDDLE ROW: Revenue Overview & Top Doctors */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        {/* REVENUE CHART */}
        <div className="bg-white rounded-xl p-6 border border-rose/20 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-cocoa">Revenue Overview</h2>
            <div className="flex bg-cream rounded-lg p-1">
              {(['daily', 'monthly', 'yearly'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => setPeriod(filter)}
                  className={`px-4 py-1.5 text-sm font-semibold capitalize rounded-md transition-all ${
                    period === filter 
                      ? 'bg-white text-rose shadow-sm' 
                      : 'text-cocoa/60 hover:text-cocoa'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4 mt-auto">
            {data.revenueOverview.map((point) => {
              const heightPercent = maxRevenueValue > 0 ? (point.amount / maxRevenueValue) * 100 : 0;
              return (
                <div key={point.label} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-cocoa w-12">{point.label}</span>
                  <div className="flex-1 bg-cream rounded-full overflow-hidden h-6">
                    <div
                      className="h-full bg-gradient-to-r from-rose to-lilac rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${heightPercent}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-cocoa w-20 text-right">
                    ₹{point.amount.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TOP DOCTORS */}
        <div className="bg-white rounded-xl p-6 border border-rose/20 shadow-sm flex flex-col">
          <h2 className="text-xl font-bold text-cocoa mb-6">Top Doctors</h2>
          <div className="space-y-4 flex-1">
            {data.topDoctors.length === 0 ? (
              <p className="text-center text-cocoa/60 py-8">No doctor data available</p>
            ) : (
              data.topDoctors.map((doc, index) => (
                <div key={doc.id} className="flex items-center justify-between p-4 bg-cream/30 rounded-xl border border-cream hover:bg-cream/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-lilac/20 text-lilac flex items-center justify-center font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-cocoa">{doc.name}</p>
                      <p className="text-xs font-medium text-cocoa/60">{doc.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-cocoa/50 mt-1">
                      {doc.appointments} Appointments
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* BOTTOM ROW: Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-rose/20 shadow-sm">
        <h2 className="text-xl font-bold text-cocoa mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex justify-center items-center gap-2 py-4 px-6 bg-gradient-to-r from-rose to-lilac text-white rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
            <Stethoscope className="w-5 h-5" />
            <span className="font-bold">Manage Doctors</span>
          </button>
          <button className="flex justify-center items-center gap-2 py-4 px-6 bg-gradient-to-r from-cocoa/80 to-cocoa text-white rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
            <Activity className="w-5 h-5" />
            <span className="font-bold">Content Management</span>
          </button>
          <button className="flex justify-center items-center gap-2 py-4 px-6 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-1">
            <Users className="w-5 h-5" />
            <span className="font-bold">AI System Management</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

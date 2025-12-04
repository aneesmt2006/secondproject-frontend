import { useState } from 'react';
import { Users, Stethoscope, Calendar, DollarSign, Info, AlertTriangle, CheckCircle } from 'lucide-react';
import AdminStatCard from '../../../components/AdminStatCard';

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    approvedDoctors: 0,
    pendingDoctors: 0,
    upcomingAppointments: 0,
    revenue: 0,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [upcomingAppointments] = useState<any[]>([]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-cocoa mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatCard
          title="Total Registered Women"
          value={stats.totalUsers.toLocaleString()}
          subtitle="More than last month"
          icon={Users}
        />
        <AdminStatCard
          title="Total Registered Doctors"
          value={stats.totalDoctors}
          subtitle={`${stats.approvedDoctors} Approved • ${stats.pendingDoctors} Pending`}
          icon={Stethoscope}
        />
        <AdminStatCard
          title="Upcoming Appointments"
          value={stats.upcomingAppointments}
          subtitle="Next 7 days"
          icon={Calendar}
        />
        <AdminStatCard
          title="Total Revenue (YTD)"
          value={`$${(stats.revenue / 1000000).toFixed(1)}M`}
          subtitle="Excluding refunds"
          icon={DollarSign}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-rose/20">
          <h2 className="text-xl font-bold text-cocoa mb-6">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.length === 0 ? (
              <p className="text-center text-cocoa/60 py-8">No upcoming appointments</p>
            ) : (
              upcomingAppointments.map((apt) => (
                <div key={apt.id} className="flex items-start justify-between p-4 bg-cream rounded-lg">
                  <div>
                    <p className="font-semibold text-cocoa">{apt.users?.full_name}</p>
                    <p className="text-sm text-cocoa/60">Dr. {apt.doctors?.full_name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-cocoa/60">
                      {new Date(apt.appointment_date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-cocoa/60">
                      {new Date(apt.appointment_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                      apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-rose/20">
          <h2 className="text-xl font-bold text-cocoa mb-6">Revenue Overview</h2>
          <div className="space-y-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month, idx) => {
              const heights = [40, 30, 20, 28, 20, 25, 37];
              return (
                <div key={month} className="flex items-end gap-3">
                  <span className="text-sm text-cocoa/60 w-8">{month}</span>
                  <div className="flex-1 bg-cream rounded-lg overflow-hidden h-8">
                    <div
                      className="h-full bg-gradient-to-r from-rose to-lilac rounded-lg transition-all"
                      style={{ width: `${heights[idx]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-cocoa/60 w-12 text-right">${heights[idx]}k</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-rose/20">
          <h2 className="text-xl font-bold text-cocoa mb-6">Latest System Notifications</h2>
          <div className="space-y-4">
            <div className="flex gap-3 p-4 bg-blue-50 rounded-lg">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-cocoa">New user registered: Jane Doe.</p>
                <p className="text-xs text-cocoa/50 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-cocoa">Pending doctor application from Dr. Alex Smith.</p>
                <p className="text-xs text-cocoa/50 mt-1">Yesterday</p>
              </div>
            </div>
            <div className="flex gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-cocoa">Monthly revenue report generated successfully.</p>
                <p className="text-xs text-cocoa/50 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-rose/20">
          <h2 className="text-xl font-bold text-cocoa mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-gradient-to-r from-rose to-lilac text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              Approve Doctor
            </button>
            <button className="w-full py-3 px-4 bg-gradient-to-r from-rose to-lilac text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              Content Management
            </button>
            <button className="w-full py-3 px-4 bg-gradient-to-r from-rose to-lilac text-white rounded-lg hover:shadow-lg transition-all font-semibold">
              AI System Management
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

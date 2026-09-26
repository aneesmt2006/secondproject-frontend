import React from 'react';
import { AdminBookingStats } from '../../types/booking.type';
import { Calendar, CheckCircle, XCircle, Clock, RotateCcw, Activity } from 'lucide-react';

interface BookingStatsProps {
  stats: AdminBookingStats | null;
  loading: boolean;
}

const StatCard = ({ title, value, icon: Icon, colorClass, loading }: { title: string, value: number, icon: any, colorClass: string, loading: boolean }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-cocoa/10 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-sm font-medium text-cocoa/70 mb-1">{title}</p>
      {loading ? (
        <div className="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
      ) : (
        <h4 className="text-3xl font-bold text-cocoa">{value}</h4>
      )}
    </div>
    <div className={`p-4 rounded-full ${colorClass} bg-opacity-10`}>
      <Icon className={`w-6 h-6 ${colorClass.replace('bg-', 'text-')}`} />
    </div>
  </div>
);

const BookingStats: React.FC<BookingStatsProps> = ({ stats, loading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
      <StatCard 
        title="Total Bookings" 
        value={stats?.totalBookings || 0} 
        icon={Activity} 
        colorClass="bg-blue-500 text-blue-500" 
        loading={loading} 
      />
      <StatCard 
        title="Today's Bookings" 
        value={stats?.todayBookings || 0} 
        icon={Calendar} 
        colorClass="bg-purple-500 text-purple-500" 
        loading={loading} 
      />
      <StatCard 
        title="Upcoming" 
        value={stats?.upcoming || 0} 
        icon={Clock} 
        colorClass="bg-amber-500 text-amber-500" 
        loading={loading} 
      />
      <StatCard 
        title="Completed" 
        value={stats?.completed || 0} 
        icon={CheckCircle} 
        colorClass="bg-green-500 text-green-500" 
        loading={loading} 
      />
      <StatCard 
        title="Cancelled" 
        value={stats?.cancelled || 0} 
        icon={XCircle} 
        colorClass="bg-red-500 text-red-500" 
        loading={loading} 
      />
      <StatCard 
        title="Refunded" 
        value={stats?.refunded || 0} 
        icon={RotateCcw} 
        colorClass="bg-slate-500 text-slate-500" 
        loading={loading} 
      />
    </div>
  );
};

export default BookingStats;

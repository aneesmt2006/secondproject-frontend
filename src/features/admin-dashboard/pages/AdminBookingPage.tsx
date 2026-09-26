import React from 'react';
import BookingStats from '../components/booking/BookingStats';
import BookingTable from '../components/booking/BookingTable';
import { useAdminBooking } from '../hooks/useAdminBooking';
import { RefreshCcw } from 'lucide-react';

const AdminBookingPage: React.FC = () => {
  const { 
    stats, 
    bookings, 
    loadingStats, 
    loadingList, 
    currentPage, 
    totalPages, 
    handlePageChange,
    refreshData 
  } = useAdminBooking();

  return (
    <div className="p-8 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cocoa">Booking Management</h1>
          <p className="text-cocoa/60 mt-1">Monitor and manage all patient appointments.</p>
        </div>
        <button 
          onClick={refreshData}
          className="flex items-center gap-2 px-4 py-2 bg-white text-cocoa rounded-xl border border-cocoa/10 hover:bg-cream hover:shadow-sm transition-all"
        >
          <RefreshCcw className="w-4 h-4" />
          <span className="font-medium text-sm">Refresh Data</span>
        </button>
      </div>

      <BookingStats stats={stats} loading={loadingStats} />

      <div className="flex-1 flex flex-col min-h-0">
        <h2 className="text-xl font-bold text-cocoa mb-4">Recent Appointments</h2>
        <BookingTable 
          bookings={bookings} 
          loading={loadingList} 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      </div>
    </div>
  );
};

export default AdminBookingPage;

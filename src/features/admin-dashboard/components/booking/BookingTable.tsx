import React from 'react';
import { AdminAppointment } from '../../types/booking.type';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookingTableProps {
  bookings: AdminAppointment[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case 'PENDING': return 'bg-amber-100 text-amber-700';
    case 'COMPLETED': return 'bg-green-100 text-green-700';
    case 'CANCELLED': return 'bg-red-100 text-red-700';
    case 'REFUNDED': return 'bg-slate-100 text-slate-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const BookingTable: React.FC<BookingTableProps> = ({ bookings, loading, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-cocoa/10 overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-cream/50 text-cocoa/70 text-sm uppercase tracking-wider border-b border-cocoa/10">
              <th className="px-6 py-4 font-medium">Booking ID</th>
              <th className="px-6 py-4 font-medium">Patient / Doctor</th>
              <th className="px-6 py-4 font-medium">Date & Time</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cocoa/5 text-sm text-cocoa/90">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse bg-white">
                  <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-16"></div>
                  </td>
                  <td className="px-6 py-4"><div className="h-6 bg-gray-200 rounded-full w-20"></div></td>
                  <td className="px-6 py-4 flex justify-end"><div className="h-4 bg-gray-200 rounded w-12"></div></td>
                </tr>
              ))
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-cocoa/50">
                  No bookings found
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.apmntId} className="hover:bg-cream/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-cocoa">
                    {booking.bookingId || booking.apmntId.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">User: {booking.userId.substring(0, 8)}...</div>
                    <div className="text-xs text-cocoa/60 mt-1">Doc: {booking.doctorId.substring(0, 8)}...</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{new Date(booking.appointmentDate).toLocaleDateString()}</div>
                    <div className="text-xs text-cocoa/60 mt-1">{booking.appointmentTime}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.consultationStatus)}`}>
                      {booking.consultationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-right text-cocoa">
                    ₹{booking.amount}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-cocoa/10 bg-white mt-auto">
        <span className="text-sm text-cocoa/60">
          Page {currentPage} of {totalPages || 1}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1 || loading}
            className="p-2 rounded-lg border border-cocoa/20 text-cocoa hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages || loading}
            className="p-2 rounded-lg border border-cocoa/20 text-cocoa hover:bg-cream disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingTable;

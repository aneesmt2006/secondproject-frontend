import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import { useNotificationLogic } from '../hooks/useNotificationLogic';

export const NotificationModal = () => {
  const { 
    notifications, 
    unreadCount, 
    isModalOpen, 
    isDoctor, 
    handleClose, 
    handleMarkAllAsRead 
  } = useNotificationLogic(true); // Enable socket listener

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div className={isDoctor ? "doctor-theme" : ""}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[70] md:max-w-md md:left-auto md:right-6 md:bottom-24"
          >
            <div className={`${isDoctor ? 'bg-white/95 backdrop-blur-xl border-white/40' : 'bg-white/95 backdrop-blur-xl border-patient-primary/20'} md:rounded-3xl rounded-t-[2.5rem] shadow-2xl overflow-hidden border max-h-[80vh] flex flex-col`}>
              {/* Header */}
              <div className={`p-6 bg-white/60 backdrop-blur-md border-b flex items-center justify-between sticky top-0 z-10 ${isDoctor ? 'border-white/40' : 'border-patient-primary/10'}`}>
                <div>
                  <h2 className={`text-xl font-bold ${isDoctor ? 'text-foreground' : 'text-patient-primary'} flex items-center gap-2`}>
                    Notifications
                    {unreadCount > 0 && (
                      <span className={`${isDoctor ? 'bg-primary' : 'bg-patient-primary'} text-white text-[10px] px-2 py-0.5 rounded-full`}>
                        {unreadCount} New
                      </span>
                    )}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    {isDoctor ? 'Keep track of your appointments and updates' : 'Stay updated with your pregnancy journey'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      className={`text-xs font-semibold transition-colors ${isDoctor ? 'text-primary hover:text-primary/80' : 'text-patient-primary hover:text-patient-primary/80'}`}
                    >
                      Mark all as read
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className={`p-2 hover:bg-black/5 rounded-full transition-colors ${!isDoctor && 'text-patient-primary/70 hover:text-patient-primary'}`}
                  >
                    <X className={`w-5 h-5 ${isDoctor ? 'text-foreground' : 'text-patient-primary'}`} />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                {notifications.length > 0 ? (
                  <AnimatePresence mode="popLayout">
                    {notifications.map((notification, i) => (
                      <NotificationItem key={i} notification={notification} isDoctor={isDoctor} />
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                    <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mb-4">
                      <Bell className={`w-8 h-8 ${isDoctor ? 'text-gray-300' : 'text-patient-primary/30'}`} />
                    </div>
                    <h3 className={`text-lg font-semibold ${isDoctor ? 'text-foreground' : 'text-patient-primary'}`}>All caught up!</h3>
                    <p className={`text-sm mt-2 ${isDoctor ? 'text-gray-500' : 'text-patient-primary/60'}`}>
                      When you get notifications, they'll show up here.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className={`p-4 bg-white/20 border-t text-center ${isDoctor ? 'border-white/40' : 'border-patient-primary/10'}`}>
                <button
                  onClick={handleClose}
                  className={`w-full py-3 ${isDoctor ? 'bg-primary/10 hover:bg-primary/20 text-primary' : 'bg-patient-primary/10 hover:bg-patient-primary/20 text-patient-primary'} rounded-2xl font-semibold text-sm transition-all`}
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

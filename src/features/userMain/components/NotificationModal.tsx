import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Calendar, Info, AlertTriangle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addNotifications, notificationSelector, setModalOpen } from '../slice/notificationSlice';
import { INotification } from '../../../types/notification.type';

import { userSelector } from '../../registration/slice/userSlice';
import { useEffect } from 'react';
import { connectSocket } from '@/services/socket/socket.service';
import { doctorSelector } from '@/features/dr.registration/slice/doctorSlice';

const NotificationItem = ({ notification }: { notification: INotification }) => {
  const { role } = useAppSelector(userSelector);
  const isDoctor = role === 'doctor';

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className={`w-5 h-5 ${isDoctor ? 'text-primary' : 'text-blue-500'}`} />;
      case 'reminder':
        return <Info className={`w-5 h-5 ${isDoctor ? 'text-medical-info' : 'text-green-500'}`} />;
      case 'system':
        return <AlertTriangle className={`w-5 h-5 ${isDoctor ? 'text-medical-warning' : 'text-amber-500'}`} />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`p-4 rounded-2xl mb-3 flex items-start gap-4 transition-all ${
        notification.isRead 
          ? 'bg-white/40' 
          : `bg-white shadow-sm border-l-4 ${isDoctor ? 'border-primary' : 'border-primary'}`
      }`}
    >
      <div className={`p-2 rounded-xl ${notification.isRead ? 'bg-gray-100' : 'bg-primary/10'}`}>
        {getIcon(notification.type)}
      </div>
      <div className="flex-1">
        <h4 className={`text-sm font-semibold ${notification.isRead ? 'text-gray-500' : (isDoctor ? 'text-foreground' : 'text-cocoa')}`}>
          {notification.title}
        </h4>
        <p className={`text-xs mt-1 ${notification.isRead ? 'text-gray-400' : 'text-muted-foreground'}`}>
          {notification.message}
        </p>
        <span className="text-[10px] text-gray-400 mt-2 block">
        </span>
      </div>
    </motion.div>
  );
};

export const NotificationModal = () => {
  const { notifications, unreadCount, isModalOpen } = useAppSelector(notificationSelector);
  const { role ,id:userId} = useAppSelector(userSelector);
  const {role:drRole} = useAppSelector(doctorSelector)
  const dispatch = useAppDispatch();
  const isDoctor = drRole??role

  const handleClose = () => dispatch(setModalOpen(false));


  useEffect(()=>{
   const socket =  connectSocket(userId as string)
   
   socket.on(`user:${userId}`,(data)=>{
    console.log('🔔Notification:',data.message)
    dispatch(addNotifications(data))
   })

   return ()=>{
    socket.off(`user:${userId}`)
   }
  },[userId])
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
            <div className={`${isDoctor ? 'bg-white/95 backdrop-blur-xl' : 'bg-[#F9F0E6]'} md:rounded-3xl rounded-t-[2.5rem] shadow-2xl overflow-hidden border border-white/40 max-h-[80vh] flex flex-col`}>
              {/* Header */}
              <div className="p-6 bg-white/60 backdrop-blur-md border-b border-white/40 flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h2 className={`text-xl font-bold ${isDoctor ? 'text-foreground' : 'text-cocoa'} flex items-center gap-2`}>
                    Notifications
                    {unreadCount > 0 && (
                      <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
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
                      onClick={() => {

                      }}
                      className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <X className={`w-5 h-5 ${isDoctor ? 'text-foreground' : 'text-cocoa'}`} />
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
                {notifications.length > 0 ? (
                  <AnimatePresence mode="popLayout">
                    {notifications.map((notification,i) => (
                      <NotificationItem key={i} notification={notification} />
                    ))}
                  </AnimatePresence>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center px-6">
                    <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mb-4">
                      <Bell className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className={`text-lg font-semibold ${isDoctor ? 'text-foreground' : 'text-cocoa'}`}>All caught up!</h3>
                    <p className="text-sm text-gray-500 mt-2">
                      When you get notifications, they'll show up here.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-white/20 border-t border-white/40 text-center">
                <button
                  onClick={handleClose}
                  className={`w-full py-3 ${isDoctor ? 'bg-primary/10 hover:bg-primary/20 text-primary' : 'bg-white/60 hover:bg-white/80 text-cocoa'} rounded-2xl font-semibold text-sm transition-all`}
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

import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { notificationSelector, fetchNotifications, setModalOpen} from '../slice/notificationSlice';


import { userSelector } from '../../registration/slice/userSlice';

export const NotificationButton = () => {
  const dispatch = useAppDispatch();
  const { unreadCount } = useAppSelector(notificationSelector);
  const { role } = useAppSelector(userSelector);
  const isDoctor = role === 'doctor';

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <>
      <div className={`relative ${isDoctor ? 'doctor-theme' : ''}`}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch(setModalOpen(true))}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative ${
            isDoctor 
              ? 'bg-primary/10 hover:bg-primary/20 border border-primary/30 shadow-sm' 
              : 'bg-white/80 backdrop-blur-sm border border-white/40 hover:bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]'
          }`}
        >
          <Bell className={`w-5 h-5 ${isDoctor ? 'text-primary' : 'text-primary'}`} />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`absolute -top-1 -right-1 min-w-[18px] h-[18px] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 border-2 border-white ${
                isDoctor ? 'bg-medical-warning' : 'bg-red-500'
              }`}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </motion.button>
      </div>
    </>
  );
};

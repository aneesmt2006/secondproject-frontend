import { motion } from 'framer-motion';
import { Bell, Calendar, Info, AlertTriangle } from 'lucide-react';
import { INotification } from '../../../types/notification.type';

export const NotificationItem = ({ notification, isDoctor }: { notification: INotification; isDoctor: boolean }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment':
        return <Calendar className={`w-5 h-5 ${isDoctor ? 'text-primary' : 'text-patient-primary'}`} />;
      case 'reminder':
        return <Info className={`w-5 h-5 ${isDoctor ? 'text-medical-info' : 'text-patient-primary/80'}`} />;
      case 'system':
        return <AlertTriangle className={`w-5 h-5 ${isDoctor ? 'text-medical-warning' : 'text-amber-500'}`} />;
      default:
        return <Bell className={`w-5 h-5 ${isDoctor ? 'text-primary' : 'text-patient-primary'}`} />;
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
          : `bg-white shadow-sm border-l-4 ${isDoctor ? 'border-primary' : 'border-patient-primary'}`
      }`}
    >
      <div className={`p-2 rounded-xl ${notification.isRead ? 'bg-gray-100' : (isDoctor ? 'bg-primary/10' : 'bg-patient-primary/10')}`}>
        {getIcon(notification.type)}
      </div>
      <div className="flex-1">
        <h4 className={`text-sm font-semibold ${notification.isRead ? 'text-gray-500' : (isDoctor ? 'text-foreground' : 'text-patient-primary')}`}>
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

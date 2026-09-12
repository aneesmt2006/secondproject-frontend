import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addNotifications, notificationSelector, setModalOpen, fetchNotifications } from '../slice/notificationSlice';
import { userSelector } from '../../patient-auth/slice/userSlice';
import { doctorSelector } from '@/features/doctor-auth/slice/doctorSlice';
import { connectSocket } from '@/services/socket/socket.service';
import { playNotificationChime } from '@/utils/soundUtils';

export const useNotificationLogic = (shouldListen: boolean = false) => {
  const { notifications, unreadCount, isModalOpen } = useAppSelector(notificationSelector);
  const { role, id: userId } = useAppSelector(userSelector);
  const { role: drRole, id: doctorId } = useAppSelector(doctorSelector);
  const dispatch = useAppDispatch();
  
  // Determine if the current user is a doctor
  const isDoctor = drRole === 'doctor' || role === 'doctor';

  const handleClose = useCallback(() => dispatch(setModalOpen(false)), [dispatch]);
  const handleOpen = useCallback(() => dispatch(setModalOpen(true)), [dispatch]);
  const refreshNotifications = useCallback(() => dispatch(fetchNotifications()), [dispatch]);
  
  const handleMarkAllAsRead = useCallback(() => {
      // Placeholder: Implement mark all as read logic here, e.g. dispatch event
  }, []);

  useEffect(() => {
    if (!shouldListen) return;

    const emittingId = userId || doctorId;
    if (!emittingId) return;

    const socket = connectSocket(emittingId);

    // Listen to both user:* and doctor:* if needed, but keeping logic consistent with original
    const eventName = (drRole === 'doctor' || role === 'doctor') ? `doctor:${emittingId}` : `user:${emittingId}`;
    
    const handleNotification = (data: any) => {
      console.log('🔔 Notification:', data.message);
      dispatch(addNotifications(data));
      playNotificationChime();
    };

    socket.on(eventName, handleNotification);

    return () => {
      socket.off(eventName, handleNotification);
    };
  }, [userId, doctorId, drRole, role, dispatch, shouldListen]);

  return {
    notifications,
    unreadCount,
    isModalOpen,
    isDoctor,
    handleClose,
    handleOpen,
    refreshNotifications,
    handleMarkAllAsRead
  };
};



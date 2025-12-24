export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'system' | 'reminder';
  isRead: boolean;
  createdAt: string;
}

export interface NotificationState {
  notifications: INotification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
}

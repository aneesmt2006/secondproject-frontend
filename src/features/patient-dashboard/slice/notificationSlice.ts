import { getNotifications } from "@/services/api/notification.service";
import { RootState } from "@/store/store";
import { INotification, NotificationState } from "@/types/notification.type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NotificationState = {
  notifications: [],
  isModalOpen: false,
  error: null,
  loading: false,
  unreadCount: 0,
};

export const fetchNotifications = createAsyncThunk(
  "notification/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotifications();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const notificationSlice = createSlice({
  name: "notifcations",
  initialState,
  reducers: {
    addNotifications: (state, action: PayloadAction<INotification>) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
      state.isModalOpen = true;
    },

    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.loading = true;
    });

    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload || [];
        state.unreadCount = action.payload!.length;
      })

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addNotifications, setModalOpen,toggleModal } = notificationSlice.actions;
export const notificationSelector = (state: RootState) => state.notifications;
export default notificationSlice.reducer;

// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import { INotification, NotificationState } from '../../../types/notification.type';
// import { getNotifications, markAllAsRead } from '../../../services/api/notification.service';
// import { RootState } from '../../../store/store';

// const initialState: NotificationState = {
//   notifications: [],
//   unreadCount: 0,
//   loading: false,
//   error: null,
//   isModalOpen: false,
// };

// export const fetchNotifications = createAsyncThunk(
//   'notifications/fetchAll',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getNotifications();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
//     }
//   }
// );

// export const markAllNotificationsRead = createAsyncThunk(
//   'notifications/markAllRead',
//   async (_, { rejectWithValue }) => {
//     try {
//       await markAllAsRead();
//       return;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to mark all as read');
//     }
//   }
// );

// const notificationSlice = createSlice({
//   name: 'notifications',
//   initialState,
//   reducers: {
//     addNotification: (state, action: PayloadAction<INotification>) => {
//       state.notifications.unshift(action.payload);
//       state.unreadCount += 1;
//       state.isModalOpen = true; // Auto-open on new notification
//     },
//     setModalOpen: (state, action: PayloadAction<boolean>) => {
//       state.isModalOpen = action.payload;
//     },
//     toggleModal: (state) => {
//       state.isModalOpen = !state.isModalOpen;
//     },
//   },
//   extraReducers: (builder) => {

//     builder
//       .addCase(fetchNotifications.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchNotifications.fulfilled, (state, action) => {
//         state.loading = false;
//         state.notifications = action.payload || [];
//         state.unreadCount = (action.payload || []).filter((n) => !n.isRead).length;
//       })
//       .addCase(fetchNotifications.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(markAllNotificationsRead.fulfilled, (state) => {
//         state.notifications.forEach((n) => (n.isRead = true));
//         state.unreadCount = 0;
//       });
//   },
// });

// export const { addNotification, setModalOpen, toggleModal } = notificationSlice.actions;
// export const notificationSelector = (state: RootState) => state.notifications;
// export default notificationSlice.reducer;

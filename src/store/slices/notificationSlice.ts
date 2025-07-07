import { createSlice } from "@reduxjs/toolkit";

const initialState: NotificationSlice = {
  data: {
    conmunity: [],
    individual: [],
  },
  activeTab: "community",
  loading: false,
  openNotification: false,
  error: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setOpenNotification: (state, action) => {
      state.openNotification = action.payload;
    },
  },
});

export const { setActiveTab, setOpenNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

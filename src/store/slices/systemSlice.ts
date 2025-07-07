import { createSlice } from "@reduxjs/toolkit";

const initialState: SystemSlice = {
  isShowAuthDialog: false,
  isShowModalSearch: false,
  typeAuth: "signin",
  isOpenDrawer: false,
  windowWidth: 0,
  lastScrollY: 0,
  isVisiable: true,
  isTheaterMode: false, // Thêm state cho theater mode
};

const systemSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    setWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    setIsShowModalSearch: (state, action) => {
      state.isShowModalSearch = action.payload;
    },
    setIsOpenDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
    setLastScrollY: (state, action) => {
      state.lastScrollY = action.payload;
    },
    setIsVisiable: (state, action) => {
      state.isVisiable = action.payload;
    },
    setIsShowAuthDialog: (state, action) => {
      state.isShowAuthDialog = action.payload;
    },
    setTypeAuth: (state, action) => {
      state.typeAuth = action.payload;
    },
    setIsTheaterMode: (state, action) => {
      state.isTheaterMode = action.payload;
    },
  },
});

export const {
  setIsShowAuthDialog,
  setWidth,
  setIsShowModalSearch,
  setIsVisiable,
  setLastScrollY,
  setIsOpenDrawer,
  setTypeAuth,
  setIsTheaterMode,
} = systemSlice.actions;
export default systemSlice.reducer;
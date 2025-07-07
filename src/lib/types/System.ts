type SystemSlice = {
  isShowAuthDialog: boolean;
  isShowModalSearch: boolean; 
  typeAuth: "signin" | "signup" | "forgot-password" | "reset-password";
  isOpenDrawer: boolean;
  windowWidth: number;
  lastScrollY: number;
  isVisiable: boolean;
  isTheaterMode: boolean; // Thêm type cho theater mode
};
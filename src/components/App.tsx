"use client";

import { Box } from "@chakra-ui/react";
import NavBar from "./layouts/header/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  setIsOpenDrawer,
  setIsShowAuthDialog,
  setIsVisiable,
  setLastScrollY,
  setWidth,
} from "@/store/slices/systemSlice";
import { useEffect } from "react";
import DrawerCustom from "./layouts/drawer/DrawerCustom";
import { Toaster } from "./ui/toaster";
import Footer from "./layouts/Footer";
import AuthDialog from "./dialogs/auth-dialog/AuthDialog";
import ScrollToTopButton from "./ScrollToTopButton";
import { signOut, useSession } from "next-auth/react";
import { handleShowToaster } from "@/lib/utils";

const App = ({ children }: { children: React.ReactNode }) => {
  const { lastScrollY, isOpenDrawer, isShowAuthDialog, typeAuth, isTheaterMode } = useSelector(
    (state: RootState) => state.system
  );
  const dispatch: AppDispatch = useDispatch();
  const { data: sesstion, status }: any = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (!sesstion.user?.email) {
        handleShowToaster(
          "Thông báo",
          "Phiên đăng nhập hết hạn! Vui lòng đăng nhập lại để sử dụng đầy đủ chức năng.",
          "error"
        );

        signOut();
      }
    }
  }, [status]);

  useEffect(() => {
    dispatch(setWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      dispatch(setWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 0) {
        dispatch(setIsVisiable(false));
      } else {
        dispatch(setIsVisiable(true));
      }

      dispatch(setLastScrollY(currentScrollY));
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Box>
      {/* Ẩn NavBar khi ở theater mode */}
      {!isTheaterMode && <NavBar />}
      {children}
      {/* Ẩn Footer khi ở theater mode */}
      {!isTheaterMode && <Footer />}

      <DrawerCustom
        isOpen={isOpenDrawer}
        onClose={() => dispatch(setIsOpenDrawer(false))}
      />

      <AuthDialog
        isOpen={isShowAuthDialog}
        type={typeAuth}
        onClose={() => dispatch(setIsShowAuthDialog(false))}
      />

      <Toaster />

      {/* Ẩn ScrollToTopButton khi ở theater mode */}
      {!isTheaterMode && <ScrollToTopButton />}
    </Box>
  );
};

export default App;
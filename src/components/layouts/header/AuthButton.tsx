"use client";

import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const AuthButton = () => {
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const dispatch: AppDispatch = useDispatch();

  const handleSignIn = () => {
    dispatch(setIsShowAuthDialog(true));
    dispatch(setTypeAuth("signin"));
  };

  const handleSignUp = () => {
    dispatch(setIsShowAuthDialog(true));
    dispatch(setTypeAuth("signup"));
  };

  return (
    <Box className="flex items-center gap-4">
      <Button
        rounded="full"
        onClick={handleSignIn}
        size="sm"
        // Cập nhật className với gradient nhạt hơn
        className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-gradient-to-r from-yellow-200 to-[#ffd875] text-gray-800"
      >
        Đăng nhập
      </Button>

      {windowWidth > 1024 && (
        <Button
          onClick={handleSignUp}
          rounded="full"
          size="sm"
          className="bg-gray-50 text-gray-900 hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)]"
        >
          Đăng ký
        </Button>
      )}
    </Box>
  );
};

export default AuthButton;

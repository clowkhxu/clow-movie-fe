"use client";

import { toaster } from "@/components/ui/toaster";
import {
  completeRegistration,
  verifyToken,
} from "@/lib/actions/authActionServer";
import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const MainPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const action = searchParams.get("action");
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    handleVerifyToken();
  }, []);

  const handleVerifyToken = async () => {
    const response = await verifyToken(token as string);

    if (!response?.status) {
      toaster.error({
        description: response?.message,
        type: "error",
        duration: 2000,
      });

      router.push("/");
      return;
    }

    if (action === "register") {
      const response = await completeRegistration(token as string);

      if (!response?.status) {
        toaster.error({
          description: response?.message,
          type: "error",
          duration: 2000,
        });

        router.push("/");
        return;
      }

      toaster.success({
        description: response.message,
        type: "success",
        duration: 2000,
      });

      setTimeout(() => {
        dispatch(setTypeAuth("signin"));
        dispatch(setIsShowAuthDialog(true));
      }, 500);

      router.push("/");
    } else if (action === "reset-password") {
      toaster.success({
        description: response.message,
        type: "success",
        duration: 2000,
      });

      setTimeout(() => {
        dispatch(setTypeAuth("reset-password"));
        dispatch(setIsShowAuthDialog(true));
      }, 500);

      router.push(
        `/?action=reset-password&email=${response?.result?.email}&token=${token}`
      );
    }
  };

  return (
    <Box className="flex justify-center items-center min-h-screen">
      <h1 className="text-[#ffd875] text-lg font-semibold">
        Đang xác thực token, vui lòng chờ trong giây lát...
      </h1>
    </Box>
  );
};

export default MainPage;

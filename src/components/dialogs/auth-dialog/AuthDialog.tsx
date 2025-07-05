"use client";

import { DialogBody, DialogContent, DialogRoot } from "@/components/ui/dialog";
import { Box, CloseButton } from "@chakra-ui/react";
import ForgotPassword from "./ForgotPassword";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";

interface AuthDialogProps {
  isOpen: boolean;
  type: "signin" | "signup" | "forgot-password" | "reset-password";
  onClose: () => void;
}

const AuthDialog = ({ isOpen, type, onClose }: AuthDialogProps) => {
  return (
    <DialogRoot
      onEscapeKeyDown={onClose}
      size="lg"
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent className="relative bg-[rgba(40,43,58,0.8)] rounded-2xl my-auto backdrop-blur lg:max-w-[720px] md:max-w-[640px] max-w-[420px] mx-4">
        <DialogBody p={0}>
          <Box className="flex">
            <Box className="lg:w-80 md:w-60 w-0">
              <Box className="relative pt-[165%] h-0">
                <Box className="absolute flex items-center justify-center w-full h-full inset-0 bg-[url('/images/background-auth.jpg')] bg-cover bg-[0_100%] rounded-l-2xl" />
              </Box>
            </Box>

            <CloseButton
              className="absolute top-2 right-2 text-gray-300 hover:bg-transparent"
              onClick={onClose}
            />

            <Box className="flex-1 lg:p-8 p-4">
              <Box>
                {type === "signin" ? (
                  <SignIn />
                ) : type === "signup" ? (
                  <SignUp />
                ) : type === "forgot-password" ? (
                  <ForgotPassword />
                ) : (
                  <ResetPassword />
                )}
              </Box>
            </Box>
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default AuthDialog;

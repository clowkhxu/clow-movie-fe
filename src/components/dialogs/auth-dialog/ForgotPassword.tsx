"use client";

import { toaster } from "@/components/ui/toaster";
import { forgotPassword } from "@/lib/actions/authActionServer";
import { isValidEmail } from "@/lib/utils";
import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input } from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleResetPassword = () => {
    if (!email.trim()) {
      setInvalid(true);
      setError("Email không được để trống");
      return;
    }

    if (!isValidEmail(email)) {
      setInvalid(true);
      setError("Email không hợp lệ");
      return;
    }

    startTransition(async () => {
      const response = await forgotPassword(email, "credentials");

      if (!response?.status) {
        toaster.error({
          description: response?.message,
          type: "error",
          duration: 3000,
        });
      } else {
        toaster.success({
          description: response?.message,
          type: "success",
          duration: 3000,
        });

        dispatch(setIsShowAuthDialog(false));
      }
    });
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-gray-50 text-lg">Quên mật khẩu</h3>
      <p className="text-gray-400 text-xs">
        Vui lòng nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu
      </p>

      <form
        className="flex flex-col gap-4 mt-4"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleResetPassword();
          }
        }}
      >
        <Field.Root invalid={invalid}>
          <Input
            autoFocus
            onChange={(e) => {
              setEmail(e.target.value);
              setInvalid(false);
              setError("");
            }}
            value={email}
            type="email"
            name="email"
            className={`border text-gray-50 ${
              !invalid
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Email đăng ký"
          />
          <Field.ErrorText>{error}</Field.ErrorText>
        </Field.Root>

        <Button
          onClick={handleResetPassword}
          size="sm"
          loading={isPending}
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
        >
          Gửi yêu cầu
        </Button>
      </form>
      <p className="text-gray-400 text-right text-xs mt-3">
        Quay lại{" "}
        <span
          onClick={() => dispatch(setTypeAuth("signin"))}
          className="text-[#ffd875] cursor-pointer hover:underline"
        >
          đăng nhập
        </span>
      </p>
    </Box>
  );
};

export default ForgotPassword;

"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { resetPassword } from "@/lib/actions/authActionServer";
import { setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const [invalid, setInvalid] = useState({
    password: false,
    confirmPassword: false,
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setInvalid((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleCheckValid = (
    name: string,
    value: string,
    type: "password" | "confirmPassword"
  ) => {
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${
          type === "password"
            ? "Mật khẩu không được để trống"
            : "Mật khẩu nhập lại không được để trống"
        }`,
      }));

      setInvalid((prev) => ({
        ...prev,
        [name]: true,
      }));

      return true;
    }

    if (type === "confirmPassword" && value !== values.password) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Mật khẩu không khớp",
      }));
      setInvalid((prev) => ({
        ...prev,
        [name]: true,
      }));

      return true;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setInvalid((prev) => ({
      ...prev,
      [name]: false,
    }));

    return false;
  };

  const handleResetPassword = () => {
    const { password, confirmPassword } = values;

    const passwordInvalid = handleCheckValid("password", password, "password");
    const confirmPasswordInvalid = handleCheckValid(
      "confirmPassword",
      confirmPassword,
      "confirmPassword"
    );

    if (passwordInvalid || confirmPasswordInvalid) return;

    startTransition(async () => {
      const repsonse = await resetPassword({
        email: email as string,
        password,
      });

      if (repsonse.status) {
        toaster.success({
          description: repsonse.message,
          type: "success",
          duration: 2000,
        });

        dispatch(setTypeAuth("signin"));
      } else {
        toaster.error({
          description: repsonse.message,
          type: "error",
          duration: 2000,
        });
      }
    });
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-lg text-gray-50">Đặt lại mật khẩu</h3>
      <p className="text-xs text-gray-400">
        Thực hiện đặt lại mật khẩu mới cho tài khoản của bạn
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
        <Field.Root invalid={invalid.password}>
          <PasswordInput
            autoFocus
            onChange={handleOnChange}
            value={values.password}
            name="password"
            className={`border text-gray-50 ${
              !invalid.password
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Nhập mật khẩu mới"
          />
          <Field.ErrorText>{errors.password}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={invalid.confirmPassword}>
          <PasswordInput
            onChange={handleOnChange}
            value={values.confirmPassword}
            name="confirmPassword"
            className={`border text-gray-50 ${
              !invalid.confirmPassword
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Nhập lại mật khẩu mới"
          />
          <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
        </Field.Root>

        <Button
          onClick={handleResetPassword}
          size="sm"
          loading={isPending}
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
        >
          Đặt lại mật khẩu
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;

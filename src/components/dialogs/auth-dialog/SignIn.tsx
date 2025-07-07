"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { authenticate } from "@/lib/actions/authActionServer";
import { isValidEmail } from "@/lib/utils";
import { setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useState, useTransition } from "react";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [invalid, setInvalid] = useState({
    email: false,
    password: false,
  });
  const dispatch: AppDispatch = useDispatch();
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
    type: "email" | "password"
  ) => {
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${
          type === "email" ? "Email" : "Mật khẩu"
        } không được để trống`,
      }));

      setInvalid((prev) => ({
        ...prev,
        [name]: true,
      }));

      return true;
    }

    if (!isValidEmail(value) && type === "email") {
      setErrors((prev) => ({
        ...prev,
        email: "Email không hợp lệ",
      }));
      setInvalid((prev) => ({
        ...prev,
        email: true,
      }));

      return true;
    }

    // Reset error
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

  const handleSignIn = () => {
    const { email, password } = values;

    const emailInvalid = handleCheckValid("email", email, "email");
    const passwordInvalid = handleCheckValid("password", password, "password");

    if (emailInvalid || passwordInvalid) return;

    startTransition(async () => {
      const repsonse = await authenticate(email, password);

      if (!repsonse.status) {
        toaster.error({
          title: "Đăng nhập thất bại!",
          description: repsonse.message,
          type: "error",
          duration: 1000,
        });
      } else {
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    });
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-gray-50 text-lg">Đăng nhập</h3>
      <p className="text-gray-400 text-xs">
        Nếu bạn chưa có tài khoản,{" "}
        <span
          onClick={() => dispatch(setTypeAuth("signup"))}
          className="text-[#ffd875] cursor-pointer hover:underline"
        >
          đăng ký ngay
        </span>
      </p>
      <form
        className="flex flex-col gap-4 mt-4"
        onKeyDown={(e) => e.key === "Enter" && handleSignIn()}
      >
        <Field.Root invalid={invalid.email}>
          <Input
            autoFocus
            onChange={handleOnChange}
            value={values.email}
            type="email"
            name="email"
            className={`border text-gray-50 ${
              !invalid.email
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Email"
          />
          <Field.ErrorText>{errors.email}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={invalid.password}>
          <PasswordInput
            onChange={handleOnChange}
            value={values.password}
            name="password"
            className={`border text-gray-50 ${
              !invalid.password
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Mật khẩu"
          />
          <Field.ErrorText>{errors.password}</Field.ErrorText>
        </Field.Root>

        <Button
          onClick={handleSignIn}
          size="sm"
          loading={isPending}
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
        >
          Đăng nhập
        </Button>
        <span
          onClick={() => dispatch(setTypeAuth("forgot-password"))}
          className="text-center text-gray-50 text-xs cursor-pointer hover:underline"
        >
          Quên mật khẩu
        </span>

        <Box className="bg-[#ffffff10] h-[0.5px] w-full" />

        <Button
          size="sm"
          variant="solid"
          onClick={() =>
            signIn("google", { callbackUrl: process.env.NEXTAUTH_URL })
          }
          className="bg-gray-50 text-gray-900 hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)]"
        >
          <FaGoogle />
          Đăng nhập với Google
        </Button>
      </form>
    </Box>
  );
};

export default SignIn;

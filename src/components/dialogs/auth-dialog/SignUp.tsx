"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { register } from "@/lib/actions/authActionServer";
import { handleShowToaster, isValidEmail } from "@/lib/utils";
import { setIsShowAuthDialog, setTypeAuth } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box, Button, Field, Input } from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [values, setValues] = useState({
    nameDisplay: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    nameDisplay: "",
    confirmPassword: "",
  });
  const [invalid, setInvalid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    nameDisplay: false,
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
    type: "email" | "password" | "nameDisplay" | "confirmPassword"
  ) => {
    if (!value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: `${
          type === "email"
            ? "Email"
            : type === "password"
            ? "Mật khẩu"
            : type === "nameDisplay"
            ? "Tên hiển thị"
            : "Xác nhận mật khẩu"
        } không được để trống`,
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

    if (type === "email" && !isValidEmail(value)) {
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

  const handleSignUp = () => {
    const { email, password, nameDisplay, confirmPassword } = values;

    const emailInvalid = handleCheckValid("email", email, "email");
    const passwordInvalid = handleCheckValid("password", password, "password");
    const nameDisplayInvalid = handleCheckValid(
      "nameDisplay",
      nameDisplay,
      "nameDisplay"
    );
    const confirmPasswordInvalid = handleCheckValid(
      "confirmPassword",
      confirmPassword,
      "confirmPassword"
    );

    if (
      emailInvalid ||
      passwordInvalid ||
      nameDisplayInvalid ||
      confirmPasswordInvalid
    )
      return;

    startTransition(async () => {
      const response = await register({
        email,
        password,
        name: nameDisplay,
        typeAccount: "credentials",
        avatar: "/images/avatars/01.jpg",
      });

      handleShowToaster(
        "Thông báo",
        response?.message,
        response?.status ? "success" : "error"
      );

      // Chỉ đóng dialog khi đăng ký thành công
      if (response?.status) {
        dispatch(setIsShowAuthDialog(false));
      }
    });
  };

  return (
    <Box className="flex flex-col gap-2">
      <h3 className="text-gray-50 text-lg">Tạo tài khoản mới</h3>
      <p className="text-gray-400 text-xs">
        Nếu bạn đã có tài khoản,{" "}
        <span
          onClick={() => dispatch(setTypeAuth("signin"))}
          className="text-[#ffd875] cursor-pointer hover:underline"
        >
          đăng nhập
        </span>
      </p>
      <form
        className="flex flex-col gap-4 mt-4"
        onKeyDown={(e) => e.key === "Enter" && handleSignUp()}
      >
        <Field.Root invalid={invalid.nameDisplay}>
          <Input
            autoFocus
            onChange={handleOnChange}
            value={values.nameDisplay}
            type="text"
            name="nameDisplay"
            className={`border text-gray-50  ${
              !invalid.nameDisplay
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Tên hiển thị"
          />
          <Field.ErrorText>{errors.nameDisplay}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={invalid.email}>
          <Input
            onChange={handleOnChange}
            value={values.email}
            type="email"
            name="email"
            className={`border text-gray-50  ${
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
            className={`border text-gray-50  ${
              !invalid.password
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Mật khẩu"
          />
          <Field.ErrorText>{errors.password}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={invalid.confirmPassword}>
          <PasswordInput
            onChange={handleOnChange}
            value={values.confirmPassword}
            name="confirmPassword"
            className={`border text-gray-50  ${
              !invalid.confirmPassword
                ? "focus:border focus:border-gray-50 border-gray-600"
                : "border-[#ef4444]"
            }`}
            placeholder="Nhập lại mật khẩu"
          />
          <Field.ErrorText>{errors.confirmPassword}</Field.ErrorText>
        </Field.Root>
        <Button
          onClick={handleSignUp}
          size="sm"
          loading={isPending}
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
        >
          Đăng ký
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;

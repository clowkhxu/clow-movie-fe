"use client";

import { PasswordInput } from "@/components/ui/password-input";
import { toaster } from "@/components/ui/toaster";
import { resetPassword } from "@/lib/actions/userActionClient";
import { Button, Dialog, Portal, Field, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";

const ResetPassword = () => {
  const { data: session }: any = useSession();
  const [values, setValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    if (values.newPassword !== values.confirmNewPassword) {
      toaster.error({
        description: "Mật khẩu mới không khớp!",
        type: "error",
        duration: 2000,
      });

      return;
    }

    startTransition(async () => {
      const response = await resetPassword({
        email: session?.user?.email as string,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        typeAccount: session?.user?.typeAccount as "credentials",
        accessToken: session?.user?.accessToken,
      });

      if (response?.status) {
        toaster.success({
          description: "Đổi mật khẩu thành công!",
          type: "success",
          duration: 2000,
        });

        setOpen(false);
      } else {
        toaster.error({
          description: response?.message,
          type: "error",
          duration: 2000,
        });
      }
    });
  };

  return (
    <Dialog.Root
      size="xs"
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Dialog.Trigger asChild>
        <span className="text-[#ffd875] cursor-pointer hover:underline">
          đây
        </span>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="bg-[rgba(40,43,58,0.8)] rounded-2xl text-gray-50 backdrop-blur max-w-[420px] mx-4 relative">
            <Dialog.Header>
              <Dialog.Title>Đổi mật khẩu</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form className="flex flex-1 flex-col w-full gap-6 mt-3">
                <Field.Root required className="text-gray-50">
                  <Field.Label>Mật khẩu cũ</Field.Label>
                  <PasswordInput
                    name="oldPassword"
                    className="border border-[#2e313a] focus:border-gray-50"
                    onChange={handleOnChange}
                    value={values.oldPassword}
                    variant="outline"
                  />
                </Field.Root>
                <Field.Root required className="text-gray-50">
                  <Field.Label>Mật khẩu mới</Field.Label>
                  <PasswordInput
                    name="newPassword"
                    className="border border-[#2e313a] focus:border-gray-50"
                    onChange={handleOnChange}
                    value={values.newPassword}
                    variant="outline"
                  />
                </Field.Root>
                <Field.Root required className="text-gray-50">
                  <Field.Label>Nhập lại mật khẩu mới</Field.Label>
                  <PasswordInput
                    name="confirmNewPassword"
                    className="border border-[#2e313a] focus:border-gray-50"
                    onChange={handleOnChange}
                    value={values.confirmNewPassword}
                    variant="outline"
                  />
                </Field.Root>
              </form>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Hủy bỏ
                </Button>
              </Dialog.ActionTrigger>
              <Button
                loading={isPending}
                onClick={handleResetPassword}
                size="xs"
                colorPalette="yellow"
                variant="solid"
                className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] min-w-24"
              >
                Xác nhận
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ResetPassword;

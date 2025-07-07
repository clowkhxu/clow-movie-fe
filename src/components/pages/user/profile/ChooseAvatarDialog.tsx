"use client";

import { toaster } from "@/components/ui/toaster";
import { updateUserProfile } from "@/lib/actions/userActionClient";
import { avatars } from "@/lib/defines/data";
import { Box, Button, Dialog, Image, Portal } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";

const ChooseAvatarDialog = () => {
  const { data: sesstion, update }: any = useSession();
  const [seletedAvatar, setSelectedAvatar] = useState<string | null>(
    avatars[0]
  );
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateUserProfile = () => {
    startTransition(async () => {
      const response = await updateUserProfile({
        userId: sesstion.user?.id,
        username: sesstion.user?.username as string,
        gender: sesstion.user?.gender as any,
        avatar: seletedAvatar as string,
        typeAccount: sesstion.user?.typeAccount as "credentials" | "google",
        accessToken: sesstion.user?.accessToken,
      });

      if (!response?.status) {
        toaster.error({
          description: response?.message,
          type: "error",
          duration: 2000,
        });
      } else {
        toaster.success({
          description: response?.message,
          type: "success",
          duration: 2000,
        });

        await update();

        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog.Root
      size="xs"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>
        <Button
          size="xs"
          className="text-xs text-gray-200 bg-transparent hover:bg-[#25272f] transition-all"
        >
          Đổi ảnh đại diện
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content className="relative text-gray-50 lg:max-w-[600px] max-w-full bg-[rgba(40,43,58,0.8)] rounded-2xl backdrop-blur mx-4">
            <Dialog.Header>
              <Dialog.Title>Đổi ảnh đại diện</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Box className="grid lg:grid-cols-5 grid-cols-3 gap-2">
                {avatars.map((avatar, index) => (
                  <Box
                    onClick={() => setSelectedAvatar(avatar)}
                    key={index}
                    className={`relative cursor-pointer ${
                      seletedAvatar === avatar
                        ? "before:content-[''] before:absolute before:inset-0 before:border-4 before:border-white before:z-20 bg-blue-500"
                        : ""
                    }`}
                  >
                    <Image
                      className={`${
                        seletedAvatar === avatar ? "opacity-100" : "opacity-60"
                      }`}
                      src={avatar}
                      alt={`avatar-${index}`}
                    />
                  </Box>
                ))}
              </Box>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="xs"
                  variant="solid"
                  className="bg-gray-50 text-gray-900 min-w-24"
                >
                  Đóng
                </Button>
              </Dialog.ActionTrigger>
              <Button
                loading={isPending}
                onClick={handleUpdateUserProfile}
                size="xs"
                colorPalette="yellow"
                variant="solid"
                className="min-w-24 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
              >
                Lưu lại
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ChooseAvatarDialog;

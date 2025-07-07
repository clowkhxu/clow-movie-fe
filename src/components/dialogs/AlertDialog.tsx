"use client";

import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

interface AlertDialogProps {
  trigger: React.ReactNode;
  title: string;
  content: string;
  loading: boolean;
  confirmCallback: () => void;
}

const AlertDialog = ({
  trigger,
  title,
  loading,
  content,
  confirmCallback,
}: AlertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    confirmCallback();
    setIsOpen(false);
  };

  return (
    <Dialog.Root
      size="xs"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 bg-[#2a314e] rounded-2xl backdrop-blur max-w-[420px] mx-4">
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{content}</p>
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
                loading={loading}
                onClick={handleConfirm}
                size="xs"
                className="min-w-24 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
              >
                Xác nhận
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;

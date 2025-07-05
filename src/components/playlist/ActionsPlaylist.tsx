"use client";

import AlertDialog from "@/components/dialogs/AlertDialog";
import { toaster } from "@/components/ui/toaster";
import {
  createNewPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "@/lib/actions/playlistAction";
import { handleShowToaster } from "@/lib/utils";
import {
  Button,
  CloseButton,
  Dialog,
  IconButton,
  Input,
  Portal,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { MdDelete } from "react-icons/md";

interface ActionsPlaylistProps {
  action: "update" | "create" | "delete";
  children: React.ReactNode;
  value?: string;
  playlistId?: string;
  callback?: () => void;
}

const ActionsPlaylist = ({
  action,
  value,
  children,
  playlistId,
  callback,
}: ActionsPlaylistProps) => {
  const [playlistName, setPlaylistName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState({
    create: false,
    update: false,
    delete: false,
  });
  const { data: session }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (action === "create") {
      setPlaylistName("");
    } else {
      setPlaylistName(value as string);
    }
  }, [action, value, isOpen]);

  const handleCreateNewPlaylist = async () => {
    const response = await createNewPlaylist({
      userId: session?.user?.id as string,
      playlistName: playlistName as string,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleUpdatePlaylist = async () => {
    const response = await updatePlaylist({
      userId: session?.user?.id as string,
      playlistId: playlistId as string,
      playlistName: playlistName as string,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleDeletePlaylist = async () => {
    const response = await deletePlaylist({
      userId: session?.user?.id as string,
      playlistId: playlistId as string,
      accessToken: session?.user?.accessToken as string,
    });

    // Xóa playlistId và playlistName khỏi URL để set lại selectedPlaylist mặc định
    const params = new URLSearchParams(window.location.search);
    params.delete("playlistId");
    params.delete("playlistName");

    router.replace(`?${params.toString()}`);

    return response;
  };

  const handleActionPlaylist = async (
    action: "update" | "delete" | "create"
  ) => {
    if (playlistName?.trim() === "") {
      handleShowToaster(
        "Thông báo",
        "Tên danh sách không được để trống",
        "error"
      );
      return;
    }

    let response: any = null;

    setLoading((prev) => ({ ...prev, [action]: true }));

    switch (action) {
      case "create":
        response = await handleCreateNewPlaylist();
        break;
      case "update":
        response = await handleUpdatePlaylist();
        break;
      case "delete":
        response = await handleDeletePlaylist();
        break;
      default:
        break;
    }

    setLoading((prev) => ({ ...prev, [action]: false }));

    if (response?.status) {
      setPlaylistName("");
      setIsOpen(false);

      // Thực hiện hành động sau khi xóa thành công
      if (callback) {
        callback();
      }

      // Cập nhật dữ liệu trên trang hiện tại
      router.refresh();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  return (
    <Dialog.Root
      size="xs"
      open={isOpen}
      initialFocusEl={undefined}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Dialog.Content className="relative text-gray-50 max-w-[320px] bg-[#2a314e] rounded-2xl backdrop-blur mx-4 my-auto">
            <Dialog.CloseTrigger
              asChild
              className="absolute top-2 right-2 text-gray-300 hover:text-gray-100 hover:bg-transparent"
            >
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>
                {action === "create" ? "Tạo danh sách" : "Sửa danh sách"}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Input
                autoFocus={action === "create"}
                onFocus={(e) =>
                  action === "update" &&
                  e.target.setSelectionRange(
                    playlistName?.length,
                    playlistName?.length
                  )
                }
                className="border border-[#ffffff10] focus:border-gray-50"
                onChange={(e) => setPlaylistName(e.target.value)}
                value={playlistName}
                placeholder="Tên danh sách"
              />
            </Dialog.Body>
            <Dialog.Footer>
              {action === "update" && (
                <AlertDialog
                  trigger={
                    <IconButton
                      className="mr-auto"
                      size="xs"
                      aria-label="Xóa"
                      colorPalette="red"
                    >
                      <MdDelete />
                    </IconButton>
                  }
                  title="Xác nhận xóa"
                  content="Bạn có chắc chắn muốn xóa danh sách này không?"
                  loading={loading.delete}
                  confirmCallback={() => handleActionPlaylist("delete")}
                />
              )}
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
                loading={loading[action]}
                onClick={() => handleActionPlaylist(action)}
                size="xs"
                className="min-w-24 bg-[#ffd875] text-gray-800 hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
              >
                {action === "create" ? "Thêm" : "Lưu"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default ActionsPlaylist;

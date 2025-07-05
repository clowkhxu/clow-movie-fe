"use client";

import { Box, IconButton, Popover, Portal } from "@chakra-ui/react";
import { useEffect, useState, useTransition } from "react";
import { IoNotifications } from "react-icons/io5";
import HeaderNotification from "./HeaderNotification";
import Link from "next/link";
import NotificationList from "@/components/notification/NotificationList";
import { getNotifications } from "@/lib/actions/notificationActionClient";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { setOpenNotification } from "@/store/slices/notificationSlice";

const PopoverNotification = () => {
  const dispatch: AppDispatch = useDispatch();
  const [notifications, setNotifications] = useState<NotificationCustom[]>([]);
  const [isPending, startTransition] = useTransition();
  const { activeTab, openNotification } = useSelector(
    (state: RootState) => state.notification
  );
  const { data: sesstion } = useSession();


  useEffect(() => {
    startTransition(async () => {
      const response = await getNotifications({
        limit: 5,
        type: activeTab,
        userId: activeTab === "individual" ? sesstion?.user?.id : null,
      });

      setNotifications(response?.result?.items ?? []);
    });
  }, [activeTab]);

  return (
    <Popover.Root
      size="xs"
      autoFocus={false}
      open={openNotification}
      onOpenChange={({ open }) => dispatch(setOpenNotification(open))}
    >
      <Popover.Trigger asChild>
        <Box className="cursor-pointer">
          <IconButton
            size="sm"
            variant="outline"
            className="bg-transparent text-gray-50 lg:border-[#ffffff86] lg:border border-0"
            rounded="full"
          >
            <IoNotifications />
          </IconButton>
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="xl"
            p={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10] max-w-[320px]"
          >
            <Popover.Arrow />
            <Popover.Header p={0}>
              <HeaderNotification />
            </Popover.Header>
            <Popover.Body p={0}>
              <NotificationList
                notifications={notifications}
                loading={isPending}
              />
            </Popover.Body>
            {notifications?.length >= 5 && !isPending && (
              <Popover.Footer p={0}>
                <Box className="w-full p-2 border-t border-[#ffffff10]">
                  <Link
                    onClick={() => dispatch(setOpenNotification(false))}
                    href={`/user/notification?tab=${activeTab}`}
                    className="text-xs hover:text-[#ffd875] text-gray-200 w-full h-full block p-2 text-center"
                  >
                    Xem tất cả
                  </Link>
                </Box>
              </Popover.Footer>
            )}
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverNotification;

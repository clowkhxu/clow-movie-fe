"use client";

import { Box } from "@chakra-ui/react";
import EmptyData from "../EmptyData";
import NotificationItem from "./NotificationItem";

const NotificationList = ({ notifications, loading }: NotificationsProps) => {
  if (loading) {
    return (
      <div className="flex h-32 justify-center items-center">
        <div className="border-[#ffd875] border-[3px] border-b-transparent h-10 rounded-full w-10 animate-spin"></div>
      </div>
    );
  }

  if (!notifications || notifications.length === 0) {
    return (
      <Box className="flex justify-center items-center">
        <EmptyData
          title="Không có thông báo nào"
          description="Hãy quay lại sau nhé!"
        />
      </Box>
    );
  }

  return (
    <ul>
      {notifications?.map((notification, index) => (
        <NotificationItem
          notification={notification}
          key={index}
          isLast={index === notifications.length - 1}
        />
      ))}
    </ul>
  );
};

export default NotificationList;

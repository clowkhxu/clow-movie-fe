"use client";

import { formatDateUnix } from "@/lib/utils";
import { setOpenNotification } from "@/store/slices/notificationSlice";
import { AppDispatch } from "@/store/store";
import { Box, Image as ImageCharka } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface NotificationItemProps {
  notification: NotificationCustom;
  isLast: boolean; // Thêm prop để kiểm tra nếu đây là phần tử cuối
}

const NotificationItem = ({ notification, isLast }: NotificationItemProps) => {
  const [loaded, setLoaded] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (!notification?.image) return;

    const img = new Image();
    img.src = notification?.image;
    img.onload = () => setLoaded(true);
  }, [notification?.image]);

  return (
    <li>
      <Link
        onClick={() => dispatch(setOpenNotification(false))}
        href={notification?.href as string}
        className={`p-4 hover:bg-[#ffffff05] text-gray-50 flex gap-4 items-center ${
          !isLast ? "border-b border-[#ffffff10]" : ""
        }`}
      >
        {notification?.image && (
          <Box className="relative pt-14 h-0 rounded-md overflow-hidden w-10 flex-shrink-0">
            <ImageCharka
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/images/notfound.png";
              }}
              src={loaded ? notification?.image : "/images/placeholder.jpg"}
              alt={notification?.content as string}
              className="w-full h-full object-cover inset-0 absolute"
            />
          </Box>
        )}
        <Box>
          <p className="text-xs text-gray-100">{notification?.content}</p>
          <span className="text-[10px] text-gray-400">
            {formatDateUnix(notification?.created_at)}
          </span>
        </Box>
      </Link>
    </li>
  );
};

export default NotificationItem;

"use client";

import { getNotifications } from "@/lib/actions/notificationActionClient";
import { Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface SeeMoreNotificationsProps {
  notifications: NotificationCustom[];
  setNotifications: (notifications: NotificationCustom[]) => void;
  setHasMore: (hasMore: boolean) => void;
}

const SeeMoreNotifications = ({
  notifications,
  setNotifications,
  setHasMore,
}: SeeMoreNotificationsProps) => {
  const params = useSearchParams();
  const tab = params.get("tab") || "community";
  const activeTab =
    tab === "community" || tab === "individual" ? tab : "community";
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  const handleSeeMoreNotifications = () => {
    startTransition(async () => {
      const response = await getNotifications({
        limit: 5,
        type: session ? activeTab : "community",
        userId: activeTab === "individual" ? session?.user?.id : null,
        afterTime:
          Number(notifications[notifications.length - 1]?.created_at) ?? null,
      });

      const newNotifications = response?.result?.items ?? [];
      const hasMore = response?.result?.has_more ?? false;

      setNotifications([...notifications, ...newNotifications]);
      setHasMore(hasMore);
    });
  };

  return (
    <span
      onClick={handleSeeMoreNotifications}
      className="text-[#ffd875] text-sm mt-6 inline-flex items-center cursor-pointer hover:underline"
    >
      Xem thêm...
      {isPending && <Spinner size="sm" />}
    </span>
  );
};

export default SeeMoreNotifications;

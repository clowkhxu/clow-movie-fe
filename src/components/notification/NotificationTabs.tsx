"use client";

import { Box, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const tabs = [
  { name: "Cộng đồng", value: "community" },
  { name: "Cá nhân", value: "individual" },
];

const NotificationTabs = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  let activeTab =
    tab === "community" || tab === "individual" ? tab : "community";

  // Đổi tên tab cá nhân thành cộng đồng nếu không có session
  activeTab = session ? activeTab : "community";

  useEffect(() => {
    if (!session) {
      handleChangeTab("community");
    }
  }, [session]);

  const handleChangeTab = (tab: "community" | "individual") => {
    const params = new URLSearchParams(window.location.search);

    params.set("tab", tab.toString());
    router.replace(`?${params.toString()}`);
  };

  const filteredTabs = session
    ? tabs
    : tabs.filter((tab) => tab.value !== "individual");

  return (
    <Box className="flex gap-3 items-center my-6">
      {filteredTabs.map((item) => (
        <Button
          rounded="full"
          size="sm"
          key={item.value}
          className={`${
            activeTab === item.value
              ? "text-gray-900 bg-gray-200"
              : "text-gray-100 bg-[#2f3346]"
          }`}
          onClick={() =>
            handleChangeTab(item.value as "community" | "individual")
          }
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
};

export default NotificationTabs;

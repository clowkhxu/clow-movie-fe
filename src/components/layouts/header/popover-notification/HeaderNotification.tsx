"use client";

import { setActiveTab } from "@/store/slices/notificationSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const tabs = [
  { id: "community", title: "Cộng đồng" },
  { id: "individual", title: "Cá nhân" },
];

const HeaderNotification = () => {
  const { activeTab } = useSelector((state: RootState) => state.notification);
  const dispatch: AppDispatch = useDispatch();
  const { data: session } = useSession();

  const filteredTabs = session
    ? tabs
    : tabs.filter((tab) => tab.id !== "individual");

  return (
    <Box className="flex items-center gap-4 p-4 border-b-[0.5px] border-[#ffffff10]">
      {filteredTabs.map((tab) => (
        <Box
          key={tab.id}
          className={`text-sm transition-all cursor-pointer ${
            activeTab === tab.id
              ? "text-primary"
              : "text-gray-200 hover:text-gray-100"
          }`}
          onClick={() => dispatch(setActiveTab(tab.id))}
        >
          {tab.title}
        </Box>
      ))}
    </Box>
  );
};

export default HeaderNotification;

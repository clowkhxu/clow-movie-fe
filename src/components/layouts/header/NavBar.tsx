"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import AuthButton from "./AuthButton";
import MenuBar from "./MenuBar";
import BarButton from "./BarButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import { SkeletonCircle } from "@/components/ui/skeleton";
import PopoverUser from "./PopoverUser";
import PopoverNotification from "./popover-notification/PopoverNotification";
import SearchDialog from "@/components/dialogs/search-dialog/SearchDialog";

const NavBar = () => {
  const { isVisiable, lastScrollY } = useSelector(
    (state: RootState) => state.system
  );
  const { status } = useSession();

  return (
    <header
      className={`flex items-center justify-between fixed left-0 right-0 top-0 z-50 h-14 
        bg-transparent pl-4 pr-4 transition-all 
        ${isVisiable ? "translate-y-0" : "-translate-y-full"} 
        ${lastScrollY > 0 ? "backdrop-blur" : ""}`}
    >
      <Box className="flex items-center gap-6">
        <BarButton />
        <Link
          href="/"
          className="text-primary font-bold lg:text-lg text-sm xs:block hidden"
        >
          CLOWPHIM
        </Link>
        <MenuBar />
      </Box>
      <Box className="flex items-center gap-4">
        <SearchDialog />
        <PopoverNotification />
        {status === "loading" && <SkeletonCircle size="9" />}
        {status === "unauthenticated" && <AuthButton />}
        {status === "authenticated" && <PopoverUser />}
      </Box>
    </header>
  );
};

export default NavBar;

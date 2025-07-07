"use client";

import { Box, Popover, Portal } from "@chakra-ui/react";
import AvatarUser from "./AvatarUser";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaHeart, FaPlus, FaUser } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import ProfileHeader from "@/components/ProfileHeader";
import { useState } from "react";

const menu = [
  {
    icon: <FaHeart />,
    title: "Yêu thích",
    link: "/user/favorite",
  },
  {
    icon: <FaPlus />,
    title: "Danh sách",
    link: "/user/playlist",
  },
  {
    icon: <FaHistory />,
    title: "Lịch sử xem",
    link: "/user/history",
  },
  {
    icon: <FaUser />,
    title: "Tài khoản",
    link: "/user/profile",
  },
];

const PopoverUser = () => {
  const { data: session }: any = useSession();
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root
      size="xs"
      autoFocus={false}
      open={open}
      onOpenChange={({ open }) => setOpen(open)}
    >
      <Popover.Trigger asChild>
        <Box className="cursor-pointer">
          <AvatarUser name={session.user?.username} src={session.user?.image} />
        </Box>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content
            rounded="xl"
            p={0}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10]"
          >
            <Popover.Arrow />
            <Popover.Header p={0}>
              <Box className="p-4 border-b-[0.5px] border-[#ffffff10]">
                <ProfileHeader />
              </Box>
            </Popover.Header>
            <Popover.Body p={0}>
              <ul className="py-2 flex flex-col gap-1">
                {menu.map((item, index) => (
                  <li key={index} onClick={() => setOpen(false)}>
                    <Link
                      href={item.link}
                      className="px-4 py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                    >
                      {item.icon}
                      {item.title}
                    </Link>
                  </li>
                ))}

                <Box className="w-full h-[0.5px] bg-[#ffffff10]" />

                <li onClick={() => signOut({ callbackUrl: "/" })}>
                  <Link
                    href="#"
                    className="px-4 py-2 transition-all hover:bg-[#ffffff05] flex gap-2 items-center truncate"
                  >
                    <FiLogOut />
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PopoverUser;

"use client";

import { Avatar, Box, Button } from "@chakra-ui/react";
import ChooseAvatarDialog from "./ChooseAvatarDialog";
import { useSession } from "next-auth/react";

const UserAvatar = () => {
  const { data: sesstion, update }: any = useSession();

  return (
    <Box className="flex flex-col gap-2 mt-3 justify-center items-center">
      <Avatar.Root size="2xl" className="border-4 border-[#25272f]">
        <Avatar.Fallback name={sesstion.user?.username ?? "phohoccode"} />
        <Avatar.Image src={sesstion.user?.image} />
      </Avatar.Root>
      <ChooseAvatarDialog />
    </Box>
  );
};

export default UserAvatar;

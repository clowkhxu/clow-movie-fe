"use client";

import { Box } from "@chakra-ui/react";
import PlusIcon from "../../icons/PlusIcon";

interface PlaylistButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
  callback?: () => void;
}

const PlaylistButton = ({
  callback,
  placement = "horizontal",
  responsiveText = false,
}: PlaylistButtonProps) => {
  return (
    <Box
      onClick={() => {
        if (callback) {
          callback();
        }
      }}
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
        placement === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      <PlusIcon />
      <span
        className={`text-xs ${!responsiveText ? "block" : "hidden xs:block"}`}
      >
        Thêm vào
      </span>
    </Box>
  );
};

export default PlaylistButton;

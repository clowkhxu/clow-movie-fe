"use client";

import SendIcon from "@/components/icons/SendIcon";
import { handleShare } from "@/lib/utils";
import { Box } from "@chakra-ui/react";

interface ShareButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const ShareButton = ({
  placement = "horizontal",
  responsiveText = false,
}: ShareButtonProps) => {
  return (
    <Box
      onClick={handleShare}
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 text-gray-50 transition-all hover:bg-[#ffffff05] ${
        placement === "vertical" ? "flex-col" : "flex-row"
      }`}
    >
      <SendIcon />
      <span
        className={`text-xs whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        Chia sẻ
      </span>
    </Box>
  );
};

export default ShareButton;

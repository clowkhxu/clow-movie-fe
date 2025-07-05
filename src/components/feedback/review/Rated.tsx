"use client";

import { emojis } from "@/lib/defines/data";
import { Box } from "@chakra-ui/react";

interface RatedProps {
  point: number | string;
}

const Rated = ({ point }: RatedProps) => {
  const emoji = emojis.find((emoji) => emoji.value === point);

  if (!emoji) return null;

  return (
    <Box className="p-1 mr-1 xs:bg-[#3556b6] rounded-full flex gap-2 items-center justify-center xs:static xs:left-0 absolute left-[47px] bg-transparent">
      <Box className="w-5 h-5">
        <img src={emoji.emoji} alt={emoji.text} className="w-full h-full" />
      </Box>
      <span className="text-xs text-gray-50 xs:inline-block hidden">{emoji.text}</span>
    </Box>
  );
};

export default Rated;

"use client";

import { Box } from "@chakra-ui/react";

interface RapPhimButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
  isTheaterMode?: boolean;
  onToggle?: () => void;
}

const RapPhimButton = ({
  placement = "horizontal",
  responsiveText = false,
  isTheaterMode = false,
  onToggle,
}: RapPhimButtonProps) => {
  return (
    <Box
      onClick={onToggle}
      className={`select-none cursor-pointer flex items-center gap-2 transition-all hover:opacity-80
          ${placement === "vertical" ? "flex-col" : "flex-row"}
        `}
    >
      <span className="text-gray-50 text-xs whitespace-nowrap">
        Rạp phim
      </span>
      <Box
        className={`px-1.5 py-0.5 rounded text-[10px] font-medium border transition-all ${
          isTheaterMode 
            ? "bg-transparent text-[#ffd875] border-[#ffd875]" 
            : "bg-transparent text-gray-50 border-white"
        }`}
      >
        {isTheaterMode ? "ON" : "OFF"}
      </Box>
    </Box>
  );
};

export default RapPhimButton;
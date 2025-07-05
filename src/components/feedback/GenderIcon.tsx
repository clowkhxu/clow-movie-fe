"use client";

import { Box } from "@chakra-ui/react";
import { FaInfinity, FaMars, FaVenus } from "react-icons/fa6";

interface GenderIconProps {
  gender: "other" | "male" | "female";
}

const GenderIcon = ({ gender }: GenderIconProps) => {
  return (
    <Box className="text-[#ffd875]">
      {gender === "male" && <FaMars />}
      {gender === "female" && <FaVenus />}
      {gender === "other" && <FaInfinity />}
    </Box>
  );
};

export default GenderIcon;

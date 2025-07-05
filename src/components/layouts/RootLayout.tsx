"use client";

import { Box } from "@chakra-ui/react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box className="max-w-[1900px] mx-auto lg:px-14">{children}</Box>
  );
};

export default RootLayout;

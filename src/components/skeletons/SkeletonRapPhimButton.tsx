"use client";

import { Box, Skeleton } from "@chakra-ui/react";

const SkeletonRapPhimButton = () => {
  return (
    <Box className="flex items-center gap-2">
      <Skeleton className="h-4 w-16" /> {/* Skeleton cho text "Rạp phim" */}
      <Skeleton className="h-6 w-8 rounded" /> {/* Skeleton cho ON/OFF box */}
    </Box>
  );
};

export default SkeletonRapPhimButton;
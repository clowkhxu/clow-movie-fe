"use client";

import { Box, Skeleton } from "@chakra-ui/react";

interface SkeletonEpisodesListProps {
  colums?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
  };
}

const SkeletonEpisodesList = ({ 
  colums = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
  }
}: SkeletonEpisodesListProps) => {
  return (
    <Box className="flex flex-col gap-4 mt-4">
      {/* Skeleton cho server tabs */}
      <Box className="flex gap-2 items-center min-h-[40px]">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-9 w-24 rounded-md" />
        ))}
      </Box>

      {/* Skeleton cho episodes grid */}
      <Box
        className={`grid grid-cols-${colums.base} md:grid-cols-${colums.md} lg:grid-cols-${colums.lg} xl:grid-cols-${colums.xl} lg:gap-4 gap-2`}
      >
        {[...Array(12)].map((_, index) => (
          <Skeleton key={index} className="w-full lg:h-[48px] h-[56px] rounded-lg" />
        ))}
      </Box>
    </Box>
  );
};

export default SkeletonEpisodesList;
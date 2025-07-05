"use client";

import { Box, GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react";

interface SkeletonMovieGridProps {
  limit?: number;
  columns?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl"?: number;
  };
}

const SkeletonMovieGrid = ({ limit = 24, columns }: SkeletonMovieGridProps) => {
  return (
    <SimpleGrid
      columns={columns || { base: 2, md: 4, lg: 5, xl: 6, "2xl": 8 }}
      gap={{
        base: 2,
        md: 3,
        lg: 4,
      }}
    >
      {[...Array(limit)].map((_, index) => (
        <GridItem key={index}>
          <Box className="flex flex-col gap-2">
            <Box className="pb-[150%] h-0 relative">
              <Skeleton
                className="absolute inset-0 w-full h-full"
                rounded="xl"
              />
            </Box>
            <Skeleton width="90%" height="3" />
          </Box>
        </GridItem>
      ))}
    </SimpleGrid>
  );
};

export default SkeletonMovieGrid;

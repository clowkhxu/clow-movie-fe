"use client";

import { Box, Skeleton } from "@chakra-ui/react";

const SkeletonSearchPreview = () => {
  return (
    <ul className="flex flex-col gap-4">
      {[...Array(3)].map((_, index: number) => (
        <li key={index} className="p-2">
          <Box className="flex gap-4">
            <Box className="w-20 h-28 flex-shrink-0">
              <Skeleton className="w-full h-full" />
            </Box>
            <Box className="flex flex-col gap-2 w-full">
              <Skeleton width="80%" height="4" />
              <Skeleton width="60%" height="3" />
              <Box className="flex gap-2 flex-wrap">
                {[...Array(3)].map((_, index: number) => (
                  <Skeleton key={index} width="12%" height="5" />
                ))}
              </Box>
            </Box>
          </Box>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonSearchPreview;

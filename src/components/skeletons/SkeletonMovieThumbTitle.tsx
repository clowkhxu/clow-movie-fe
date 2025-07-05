"use client";

import { Box } from "@chakra-ui/react";
import { Skeleton } from "../ui/skeleton";

const SkeletonMovieThumbTitle = () => {
  return (
    <Box className="flex justify-between items-center gap-2 mb-6">
      <Skeleton className="h-6  lg:w-72 w-32" />
      <Skeleton className="h-4  lg:w-28 w-16" />
    </Box>
  );
};

export default SkeletonMovieThumbTitle;

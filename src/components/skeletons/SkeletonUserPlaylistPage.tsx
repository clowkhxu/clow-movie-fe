"use client";

import { Box, Skeleton } from "@chakra-ui/react";
import SkeletonMovieGrid from "./SkeletonMovieGrid";

const SkeletonUserPlaylistPage = () => {
  return (
    <Box className="flex flex-col gap-4">
      <h3 className="text-lg text-gray-50">Danh sách</h3>
      <Box className="grid grid-cols-2 mb-6 gap-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-5">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="w-full h-16" />
        ))}
      </Box>

      <SkeletonMovieGrid columns={{ base: 2, md: 3, lg: 4, xl: 5, "2xl": 6 }} />
    </Box>
  );
};

export default SkeletonUserPlaylistPage;

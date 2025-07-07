"use client";

import { Box } from "@chakra-ui/react";
import { Skeleton } from "../ui/skeleton";

const SkeletonWachingPage = () => {
  return (
    <Box className="flex flex-col gap-12 max-w-[1620px] mx-auto lg:px-14">
      <Box className="lg:mt-32 mt-24 flex flex-col gap-6">
        <Box className="px-4">
          <Skeleton width="50%" height="6" className="sm:block hidden" />
        </Box>
        <Box className="flex flex-col lg:px-4">
          <Box className="relative h-0 lg:pt-[20%] md:pt-[40%] pt-[56%]">
            <Skeleton
              className="absolute inset-0 rounded-none"
              width="100%"
              height="100%"
            />
          </Box>
          <Box className="p-4 bg-[#08080a] flex justify-between">
            <Box className="flex gap-4">
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
              <Skeleton className="sm:min-w-16 min-w-7" height="5" />
            </Box>
            {/* Skeleton cho nút Rạp phim */}
            <Box className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-6 w-8 rounded" />
            </Box>
          </Box>
        </Box>

        <Box className="flex gap-6 lg:flex-row flex-col pb-12 px-6">
          <Box className="flex-1">
            <Box className="flex gap-4 w-full">
              <Box className="w-28 flex-shrink-0 sm:block hidden">
                <Box className="relative h-0 pt-[150%]">
                  <Skeleton
                    className="absolute inset-0 rounded-xl"
                    width="100%"
                    height="100%"
                  />
                </Box>
              </Box>
              <Box className="flex flex-col gap-2 w-full">
                <Skeleton width="80%" height="5" />
                <Skeleton width="50%" height="3"/>
                <Box className="flex gap-2 mt-2 flex-wrap">
                  {[...Array(6)].map((_, index) => (
                    <Skeleton key={index} width="64px" height="5" />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="xl:flex-2 flex-1">
            {/* Skeleton cho EpisodesList */}
            <Box className="flex flex-col gap-4 mt-4">
              {/* Skeleton cho server tabs */}
              <Box className="flex gap-2 items-center min-h-[40px]">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="h-9 w-24 rounded-md" />
                ))}
              </Box>
              {/* Skeleton cho episodes grid */}
              <Box className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-3 xl:grid-cols-6 gap-2 w-full">
                {[...Array(12)].map((_, index) => (
                  <Skeleton key={index} className="w-full lg:h-[48px] h-[56px] rounded-lg" />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SkeletonWachingPage;
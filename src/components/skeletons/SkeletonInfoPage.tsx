"use client";

import { Box, GridItem, SimpleGrid, Skeleton } from "@chakra-ui/react";

const SkeletonInfoPage = () => {
  return (
    <>
      <Box className="h-0 relative lg:pt-[32%] md:pt-[46%] sm:pt-[50%] pt-[50%]">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </Box>
      <Box className="max-w-[1620px] mx-auto lg:px-14">
        <Box className="mt-[-100px]">
          <SimpleGrid columns={12} gap={0}>
            <GridItem colSpan={{ base: 12, md: 12, lg: 12, xl: 4 }}>
              <Box className="flex flex-col gap-2 p-6 h-full xl:items-start xl:rounded-bl-4xl xl:rounded-tl-4xl xl:rounded-tr-4xl lg:rounded-tl-4xl lg:rounded-tr-4xl items-center lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
                <Box className="w-40 mb-2">
                  <Box className="h-0 relative pt-[150%]">
                    <Skeleton
                      className="absolute inset-0 w-full h-full"
                      rounded="2xl"
                    />
                  </Box>
                </Box>
                <Skeleton className="mt-1" height="5" width="80%" />
                <Skeleton className="mt-1" height="3" width="60%" />
                <Box className="flex gap-2 mt-1 w-full flex-wrap">
                  {[...Array(12)].map((_, index) => (
                    <Skeleton key={index} height="5" width="12%" />
                  ))}
                </Box>
                <Box className="flex flex-col gap-4 w-full mt-2">
                  <Box className="flex gap-2 flex-col">
                    <Skeleton height="3" width="25%" />
                    <Box className="flex flex-col gap-2">
                      <Skeleton height="3" width="70%" />
                      <Skeleton height="3" width="60%" />
                      <Skeleton height="3" width="80%" />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 12, lg: 12, xl: 8 }}>
              <Box className="relative z-[10] flex flex-col gap-4 p-8 h-full xl:rounded-tl-4xl xl:rounded-tr-4xl xl:rounded-br-4xl xl:rounded-bl-none lg:rounded-bl-4xl lg:rounded-br-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
                <Box className="flex gap-6 md:flex-row flex-col md:justify-start justify-center md:items-start items-center">
                  <Skeleton
                    height="60px"
                    className="md:w-44 sm:w-[40%] xs:w-[80%] w-full"
                    rounded="full"
                  />
                  <Box className="flex justify-between gap-6 flex-1 items-center">
                    <Box className="flex gap-2">
                      <Skeleton width="64px" height="60px" borderRadius="8px" />
                      <Skeleton width="64px" height="60px" borderRadius="8px" />
                      <Skeleton width="64px" height="60px" borderRadius="8px" />
                      <Skeleton width="64px" height="60px" borderRadius="8px" className="xs:flex hidden"/>
                    </Box>
                    <Skeleton className="xs:min-w-32 w-12 rounded-full h-12" />
                  </Box>
                </Box>
                <Box className="flex flex-col gap-2 w-full">
                  <Box className="flex gap-2 mt-8">
                    <Skeleton width="64px" height="5" />
                    <Skeleton width="64px" height="5" />
                    <Skeleton width="64px" height="5" />
                  </Box>
                  <Skeleton width="100%" height="1" />
                  <Skeleton width="120px" height="3" className="mt-3" />

                  <Box className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 w-full">
                    {[...Array(24)].map((_, index) => (
                      <Skeleton key={index} className="w-full h-8" />
                    ))}
                  </Box>
                </Box>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default SkeletonInfoPage;

"use client";

import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box } from "@chakra-ui/react";

interface SkeletonMovieThumbProps {
  orientation: "horizontal" | "vertical";
}

const SkeletonMovieThumb = ({ orientation }: SkeletonMovieThumbProps) => {
  return (
    <Swiper
      className="movie-slider"
      breakpoints={{
        320: {
          slidesPerView: orientation === "horizontal" ? 2 : 2, // Sửa từ 3 thành 2 cho mobile
          spaceBetween: 8,
        },
        768: {
          slidesPerView: orientation === "horizontal" ? 3 : 4,
          spaceBetween: 8,
        },
        1024: {
          slidesPerView: orientation === "horizontal" ? 3 : 4,
          spaceBetween: 8,
        },
        1280: {
          slidesPerView: orientation === "horizontal" ? 4 : 5,
          spaceBetween: 12,
        },
        1440: {
          slidesPerView: orientation === "horizontal" ? 5 : 6,
          spaceBetween: 16,
        },
        1920: {
          slidesPerView: orientation === "horizontal" ? 6 : 8,
          spaceBetween: 18,
        },
      }}
    >
      {[...Array(10)].map((_, index) => (
        <SwiperSlide key={index} className="relative">
          <Box
            className={`h-0 relative ${
              orientation === "horizontal" ? "pb-[62%]" : "pb-[150%]"
            } rounded-xl overflow-hidden`}
          >
            <Skeleton className="absolute inset-0 w-full h-full rounded-xl" />
          </Box>
          <SkeletonText noOfLines={1} className="mt-2" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SkeletonMovieThumb;
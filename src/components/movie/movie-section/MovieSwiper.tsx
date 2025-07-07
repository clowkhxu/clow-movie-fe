"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "./MovieCard";
import SkeletonMovieThumb from "@/components/skeletons/SkeletonMovieThumb";
import { Box } from "@chakra-ui/react";
import Error from "../Error";

import "swiper/css";
import "@/assets/css/swiper_custom.css";

interface MovieThumbProps {
  items: any;
  loading: boolean;
  error: boolean;
  orientation: "horizontal" | "vertical";
}

const MovieThumb = ({
  items,
  loading,
  error,
  orientation,
}: MovieThumbProps) => {
  if (loading) return <SkeletonMovieThumb orientation={orientation} />;
  if (error) return <Error />;

  return (
    <Box className="relative movie-slider">
      <Swiper
        breakpoints={{
          320: {
            slidesPerView: orientation === "horizontal" ? 2 : 3,
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
        {items?.map((item: any, index: number) => (
          <SwiperSlide key={index} className="relative">
            <MovieCard data={item} orientation={orientation} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MovieThumb;

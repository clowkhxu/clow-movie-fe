"use client";

import MovieSwiper from "@/components/movie/movie-section/MovieSwiper";
import MovieTitle from "@/components/movie/movie-section/MovieTitle";
import { Box } from "@chakra-ui/react";

import "@/assets/css/animation.css";

interface MovieCollectionProps {
  title: string;
  link: string;
  data: {
    loading: boolean;
    error: boolean;
    items: any[];
  };
  orientation: "horizontal" | "vertical";
}

const MovieCollection = ({
  title,
  link,
  data,
  orientation,
}: MovieCollectionProps) => {
  return (
    <Box className="effect-fade-in">
      <MovieTitle
        loading={data?.loading}
        href={link}
        title={title}
        error={data?.error}
      />
      <Box>
        <MovieSwiper
          items={data?.items}
          loading={data?.loading}
          error={data?.error}
          orientation={orientation}
        />
      </Box>
    </Box>
  );
};

export default MovieCollection;

"use client";

import EmptyData from "@/components/EmptyData";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const TabTrailer = () => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);

  if (!movie?.trailer_url)
    return (
      <EmptyData
        title="Không có trailer"
        description="Rất tiếc, phim này không có trailer."
      />
    );

  return (
    <Box className="w-full h-0 relative lg:pt-[35%] md:pt-[42%] pt-[50%] rounded-2xl overflow-hidden">
      <iframe
        className="w-full h-full absolute inset-0 border border-[#282b3a]"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer"
        referrerPolicy="strict-origin-when-cross-origin"
        src={movie?.trailer_url?.replace("watch?v=", "/embed/")}
      ></iframe>
    </Box>
  );
};

export default TabTrailer;

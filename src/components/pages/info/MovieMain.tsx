"use client";

import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import MovieTabs from "./MovieTabs";
import FavoriteButton from "@/components/movie/controls/FavoriteButton";
import PlaylistPopover from "@/components/playlist/PlaylistPopover";
import ShareButton from "@/components/movie/controls/ShareButton";
import ReviewButton from "@/components/movie/controls/ReviewButton";
import FeedbackSection from "@/components/feedback/FeedbackSection";
import CommentButton from "@/components/movie/controls/FeedbackButton";

// New Play Icon component
const PlayIcon = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path>
  </svg>
);

const MovieMain = () => {
  const params = useParams();
  const slug = params.slug;

  return (
    <Box className="relative h-full z-[10] flex flex-col gap-4 lg:p-8 p-6 xl:rounded-tl-4xl xl:rounded-tr-4xl xl:rounded-br-4xl xl:rounded-bl-none lg:rounded-bl-4xl lg:rounded-br-4xl lg:bg-[#282b3a8a] lg:backdrop-blur-lg">
      <Box className="flex flex-col gap-8">
        <Box className="flex gap-6 md:flex-row flex-col md:justify-start justify-center md:items-start items-center ">
          <Link
            href={`/watching/${slug}`}
            className="md:w-44 sm:w-[40%] xs:w-[63%] w-[80%]"
          >
            <Button
              className="w-full h-14 text-lg shadow-lg hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-gradient-to-r from-yellow-200 to-[#ffd875] text-gray-800"
              rounded="full"
            >
              <PlayIcon />
              Xem ngay
            </Button>
          </Link>
          <Box className="flex justify-between gap-6 flex-1 items-center">
            <Box className="flex gap-4">
              <FavoriteButton placement="vertical" />
              <PlaylistPopover placement="vertical" />
              <ShareButton placement="vertical" />
              <CommentButton placement="vertical" />
            </Box>
            <ReviewButton />
          </Box>
        </Box>
        <MovieTabs />

        <Box className="w-full h-[0.5px] bg-[#ffffff10] my-6"></Box>

        <FeedbackSection />
      </Box>
    </Box>
  );
};

export default MovieMain;
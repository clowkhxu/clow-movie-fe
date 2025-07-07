"use client";

import EpisodesList from "@/components/movie/EpisodeList";
import { RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const TabEpisodes = () => {
  const { episodes } = useSelector((state: RootState) => state.movie.movieInfo);

  return (
    <Box className="flex flex-col gap-6">
      <EpisodesList
        episodes={episodes || []}
        redirect
        colums={{
          base: 3,
          md: 5,
          lg: 5,
          xl: 6,
        }}
      />
    </Box>
  );
};

export default TabEpisodes;
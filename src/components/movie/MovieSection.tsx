"use client";

import { Box } from "@chakra-ui/react";
import MovieCollection from "./MovieCollection";

interface MovieSectionProps {
  finalData: any;
}

const MovieSection = ({ finalData }: MovieSectionProps) => {
  return (
    <Box className="flex flex-col gap-12 lg:p-8 p-4">
      {finalData?.map(
        ({ title, link, data, orientation }: any, index: number) => (
          <Box key={index}>
            <MovieCollection
              title={title}
              link={link}
              data={data}
              orientation={orientation}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default MovieSection;

"use client";

import { RootState } from "@/store/store"; // Giả sử đường dẫn này là chính xác
import { Box } from "@chakra-ui/react"; // Giả sử bạn đang dùng Chakra UI
import { useSelector } from "react-redux";

const SectionVideo = () => {
  const { currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo // Giả sử cấu trúc state là chính xác
  );

  return (
    // Container Box with conditional padding-top and height for 16:9 on large screens
    // On screens smaller than 'lg', it will have a fixed height (e.g., h-64)
    <Box
      className="relative border border-[#ffffff10]
                 h-64 lg:h-0 lg:pt-[56.25%] // Default height 64 on mobile, 16:9 aspect ratio (h-0 + pt) on lg and up
                 xl:rounded-tl-2xl xl:rounded-tr-2xl overflow-hidden"
    >
      {currentEpisode?.link_embed ? (
        <iframe
          src={currentEpisode?.link_embed}
          title={currentEpisode?.name || "Video Player"} // Thêm fallback cho title
          frameBorder="0"
          allowFullScreen
          // Iframe occupies the full space of the parent Box
          className="absolute w-full h-full inset-0"
        ></iframe>
      ) : (
        <Box className="absolute w-full h-full inset-0 flex items-center justify-center bg-[#08080a]">
          <h1 className="text-white text-2xl text-center p-4">
            Video không có sẵn {":(("}
          </h1>
        </Box>
      )}
    </Box>
  );
};

export default SectionVideo;

"use client";

// Import các component cần thiết từ Chakra UI và React.
// LƯU Ý QUAN TRỌNG: Đảm bảo rằng Chakra UI đã được cài đặt trong dự án của bạn.
// Ví dụ, bạn có thể cần chạy lệnh: npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
import { Box, Tabs, Flex, Text } from "@chakra-ui/react";
import React from 'react';

// Giả sử các component này được import đúng đường dẫn trong dự án của bạn.
// Nếu bạn đang sử dụng alias như "@/components/movie/MovieSuggestions", hãy đảm bảo cấu hình alias của bạn hoạt động đúng trong file cấu hình bundler (ví dụ: next.config.js, webpack.config.js).
import MovieSuggestions from "@/components/movie/MovieSuggestions";
import TabEpisodes from "./TabEpisodes";
import TabTrailer from "./TabTrailer";
import TabActors from "./TabActors";

// Biểu tượng SVG đã được loại bỏ theo yêu cầu trước đó.

const MovieTabs = () => {
  return (
    <Tabs.Root defaultValue="episodes" colorPalette="yellow">
      <Tabs.List className="border-[#ffffff10]">
        {/* Tab "Tập phim" */}
        <Tabs.Trigger
          _selected={{
            color: "#ffd875",
            "&:before": {
              height: "1px",
            },
          }}
          className="text-gray-50"
          value="episodes"
        >
          Tập phim
        </Tabs.Trigger>

        {/* Tab "Trailer" - Đã cập nhật tiêu đề và đồng bộ hóa kiểu chữ, khoảng cách với các tab khác */}
        <Tabs.Trigger
          _selected={{
            color: "#ffd875",
            "&:before": {
              height: "1px",
            },
          }}
          className="text-gray-50"
          value="trailer"
        >
          Trailer
        </Tabs.Trigger>

        {/* Tab "Diễn viên" */}
        <Tabs.Trigger
          _selected={{
            color: "#ffd875",
            "&:before": {
              height: "1px",
            },
          }}
          className="text-gray-50"
          value="actors"
        >
          Diễn viên
        </Tabs.Trigger>

        {/* Tab "Đề xuất" - Tiêu đề "Có thể bạn sẽ thích" không còn biểu tượng kèm theo */}
        <Tabs.Trigger
          _selected={{
            color: "#ffd875",
            "&:before": {
              height: "1px",
            },
          }}
          className="text-gray-50"
          value="suggest"
        >
          Đề xuất
        </Tabs.Trigger>
      </Tabs.List>

      {/* Nội dung Tab "Tập phim" */}
      <Tabs.Content
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "160ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
        value="episodes"
      >
        <TabEpisodes />
      </Tabs.Content>

      {/* Nội dung Tab "Trailer" - Đã thêm tiêu đề "Trailer" bên trong và áp dụng kiểu chữ */}
      <Tabs.Content
        value="trailer"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "160ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
      >
        <Box className="mt-3">
          <Flex alignItems="center" mb={4}>
            {/* Loại bỏ fontWeight để không in đậm */}
            <Text fontSize="2xl" color="gray.200">Trailer</Text>
          </Flex>
          <TabTrailer />
        </Box>
      </Tabs.Content>

      {/* Nội dung Tab "Diễn viên" */}
      <Tabs.Content
        value="actors"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "160ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
      >
        <TabActors />
      </Tabs.Content>

      {/* Nội dung Tab "Đề xuất" */}
      <Tabs.Content
        value="suggest"
        _open={{
          animationName: "fade-in, scale-in",
          animationDuration: "160ms",
        }}
        _closed={{
          animationName: "fade-out, scale-out",
          animationDuration: "120ms",
        }}
      >
        <Box className="mt-3">
          <Flex
            alignItems="center"
            mb={4}
          >
            {/* Loại bỏ fontWeight để không in đậm */}
            <Text fontSize="2xl" color="gray.200">Có thể bạn sẽ thích</Text>
          </Flex>
          <MovieSuggestions
            limit={15}
            title=""
            columns={{
              base: 3,
              md: 4,
              lg: 5,
              xl: 4,
              "2xl": 5,
            }}
          />
        </Box>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default MovieTabs;
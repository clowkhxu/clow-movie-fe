"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PaginationItems, PaginationRoot } from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  changeQuery,
  formatTypeMovie,
  getIdFromLinkEmbed,
  handleShowToaster,
} from "@/lib/utils";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import EpisodeItem from "./EpisodeItem";

type Episode = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
  filename: string;
};

// Interface props được cập nhật để 'server_name' là tùy chọn
interface EpisodesListProps {
  server_name?: string; // Đã thay đổi: server_name bây giờ là tùy chọn
  episodes: Episode[];
  colums?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
  };
  redirect?: boolean;
  showToaster?: boolean;
}

const limitDisplay = 24;

const generateRandomId = (length: number = 7): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Component bây giờ chấp nhận trực tiếp prop 'episodes'
const EpisodesList = ({
  episodes = [],
  server_name = "", // Đã thay đổi: Cung cấp giá trị mặc định cho server_name
  colums = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  redirect = false,
  showToaster = true,
}: EpisodesListProps) => {
  const [episodeDisplay, setEpisodeDisplay] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const { currentEpisode } = useSelector((state: RootState) => state.movie.movieInfo);

  // Định nghĩa các icon
  const vietsubIcon = (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 12v2H5v-2h2zm-2-2V8h2v2H5zm6 2v2H9v-2h2zm-2-2V8h2v2H9zm7 6v1H8v-1h8zm-1-4v2h-2v-2h2zm-2-2V8h2v2h-2zm4 4v-2h2v2h-2zm2-4h-2V8h2v2z"></path>
    </svg>
  );

  const dubbedIcon = (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zm6 9a6.002 6.002 0 01-5 5.91V21h-2v-5.09A6.002 6.002 0 016 10V9h2v1a4 4 0 008 0V9h2v1z"></path>
    </svg>
  );

  const thuyetMinhIcon = (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 22C1 17.5817 4.58172 14 9 14C13.4183 14 17 17.5817 17 22H1ZM9 13C5.685 13 3 10.315 3 7.00002C3 3.68502 5.685 1.00002 9 1.00002C12.315 1.00002 15 3.68502 15 7.00002C15 10.315 12.315 13 9 13ZM18.2463 3.18451C18.732 4.36026 19 5.64884 19 7.00002C19 8.35119 18.732 9.63977 18.2463 10.8155L16.5694 9.59595C16.8485 8.78194 17 7.90867 17 7.00002C17 6.09136 16.8485 5.21809 16.5694 4.40408L18.2463 3.18451ZM21.5476 0.783569C22.4773 2.65651 23 4.76723 23 7.00002C23 9.23281 22.4773 11.3435 21.5476 13.2165L19.9027 12.0201C20.6071 10.4928 21 8.79231 21 7.00002C21 5.20772 20.6071 3.5072 19.9027 1.9799L21.5476 0.783569Z"></path>
    </svg>
  );

  let title = "";
  let currentIcon;

  // Xác định tiêu đề và icon dựa trên server_name
  if (server_name.includes("Vietsub")) {
    title = "Phụ đề";
    currentIcon = vietsubIcon;
  } else if (server_name.includes("Thuyết Minh")) {
    title = "Thuyết minh";
    currentIcon = thuyetMinhIcon;
  } else {
    title = "Lồng tiếng";
    currentIcon = dubbedIcon;
  }

  // Sửa lỗi hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset trang khi server thay đổi
  useEffect(() => {
    if (isMounted) {
      setPage(1);
    }
  }, [server_name, isMounted]);

  // Cập nhật danh sách tập phim hiển thị
  useEffect(() => {
    if (!isMounted || !Array.isArray(episodes) || episodes.length === 0) {
      setEpisodeDisplay([]);
      return;
    }

    const start = (page - 1) * limitDisplay;
    const end = start + limitDisplay;
    setEpisodeDisplay(episodes.slice(start, end));
  }, [episodes, page, isMounted]);

  // Xử lý query từ URL để khôi phục trạng thái tập phim
  useEffect(() => {
    if (!isMounted || !Array.isArray(episodes) || episodes.length === 0 || redirect || !server_name) {
      return;
    }

    if (typeof window !== 'undefined') {
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const episodeSlugFromQuery = queryParams.get('episode');
        const typeFromQuery = queryParams.get('type');

        if (episodeSlugFromQuery && typeFromQuery) {
          const currentServerType = formatTypeMovie(server_name);

          if (typeFromQuery === currentServerType) {
            const episodeToRestore = episodes.find(ep => ep?.slug === episodeSlugFromQuery);
            if (episodeToRestore && (!currentEpisode || currentEpisode.link_embed !== episodeToRestore.link_embed)) {
              const episodeIndex = episodes.findIndex(ep => ep?.slug === episodeSlugFromQuery);
              if (episodeIndex !== -1) {
                const initialPage = Math.floor(episodeIndex / limitDisplay) + 1;
                setPage(initialPage);
              }
              dispatch(setCurrentEpisode(episodeToRestore));
            }
          }
        }
      } catch (error) {
        console.error('Error processing URL query:', error);
      }
    }
  }, [isMounted, episodes, server_name, redirect, currentEpisode, dispatch]);

  const handleChangePage = (newPage: number) => {
    if (!isMounted || !Array.isArray(episodes) || episodes.length === 0) return;

    try {
      const start = (newPage - 1) * limitDisplay;
      const end = start + limitDisplay;
      setEpisodeDisplay(episodes.slice(start, end));
      setPage(newPage);
    } catch (error) {
      console.error('Error changing page:', error);
    }
  };

  const handleSetCurrentEpisode = (item: Episode) => {
    if (!isMounted || !item || redirect || !server_name) return;
    if (currentEpisode?.link_embed === item.link_embed) return;

    try {
      let idForQuery = getIdFromLinkEmbed(item.link_embed, 8);
      if (!idForQuery) {
        idForQuery = generateRandomId(7);
      }

      const type = formatTypeMovie(server_name);
      const newQuery = [
        { key: "id", value: idForQuery },
        { key: "episode", value: item.slug || '' },
        { key: "type", value: type },
      ];

      changeQuery(newQuery);
      dispatch(setCurrentEpisode(item));

      if (showToaster) {
        handleShowToaster(
          `Bạn đang xem ${item?.filename || 'tập phim'}`,
          "Chúc bạn xem phim vui vẻ!"
        );
      }
    } catch (error) {
      console.error('Error setting current episode:', error);
    }
  };

  // Trạng thái đang tải
  if (!isMounted) {
    return (
      <Box className="flex flex-col gap-4 mt-4">
        <Box className="items-center gap-1 text-gray-50 rounded-md bg-[#ffffff10] px-3 py-1 inline-flex self-start">
          <h3 className="text-gray-50 text-xs font-semibold">Đang tải...</h3>
        </Box>
      </Box>
    );
  }

  // Trạng thái không có tập phim
  if (!Array.isArray(episodes) || episodes.length === 0) {
    return (
      <Box className="flex flex-col gap-4 mt-4">
        <Box className="items-center gap-1 text-gray-50 rounded-md bg-[#ffffff10] px-3 py-1 inline-flex self-start">
          {currentIcon}
          <h3 className="text-gray-50 text-xs font-semibold">{title}</h3>
        </Box>
        <Box className="text-gray-200">Không có tập phim nào cho server này.</Box>
      </Box>
    );
  }

  // LƯU Ý: Các class grid-cols-* động có thể không hoạt động với trình biên dịch JIT của Tailwind.
  // An toàn hơn là sử dụng map hoặc switch để trả về tên class đầy đủ.
  // Ví dụ: `grid-cols-${colums.base}` -> `grid-cols-2`
  return (
    <Box className="flex flex-col gap-4 mt-4">
      <Box className="items-center gap-1 text-gray-50 rounded-md bg-[#ffffff10] px-3 py-1 inline-flex self-start">
        {currentIcon}
        <h3 className="text-gray-50 text-xs font-semibold">{title}</h3>
      </Box>

      <Box
        className={`grid grid-cols-${colums.base} md:grid-cols-${colums.md} lg:grid-cols-${colums.lg} xl:grid-cols-${colums.xl} lg:gap-4 gap-2`}
      >
        {episodeDisplay.map((item: Episode, index: number) => {
          if (!item || !item.link_embed) return null;

          return (
            <EpisodeItem
              key={`${server_name}-${item.link_embed}-${index}`}
              item={item}
              server_name={server_name}
              redirect={redirect}
              handleSetCurrentEpisode={handleSetCurrentEpisode}
              isActive={currentEpisode?.link_embed === item.link_embed}
            />
          );
        })}
      </Box>

      {episodes.length > limitDisplay && (
        <Box className="flex mx-auto my-6">
          <PaginationRoot
            size={windowWidth < 768 ? "xs" : "md"}
            count={episodes.length}
            pageSize={limitDisplay}
            page={page}
            siblingCount={1}
            onPageChange={(details) => handleChangePage(details.page)}
          >
            <HStack>
              <PaginationItems className="bg-[#282b3a] border border-[#1e2939] text-gray-50 hover:bg-transparent" />
            </HStack>
          </PaginationRoot>
        </Box>
      )}
    </Box>
  );
};

export default EpisodesList;

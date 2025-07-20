"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useState, useEffect, useMemo, useCallback } from "react";
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

// Định nghĩa các kiểu dữ liệu
type Episode = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
  filename: string;
};

type ServerData = {
  server_name: string;
  server_data: Episode[];
};

interface EpisodesListProps {
  episodes: ServerData[];
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

// Hàm tạo ID ngẫu nhiên
const generateRandomId = (length: number = 7): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const EpisodesList = ({
  episodes = [],
  colums = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  redirect = false,
  showToaster = true,
}: EpisodesListProps) => {
  const [activeServerIndex, setActiveServerIndex] = useState(0);
  const [page, setPage] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const { currentEpisode } = useSelector((state: RootState) => state.movie.movieInfo);

  // Memoize server và episodes hiện tại để tối ưu
  const currentServer = useMemo(() => {
    if (!episodes || !Array.isArray(episodes) || episodes.length === 0) {
      return null;
    }
    return episodes[activeServerIndex] || null;
  }, [episodes, activeServerIndex]);

  const currentEpisodes = useMemo(() => {
    if (!currentServer || !currentServer.server_data || !Array.isArray(currentServer.server_data)) {
      return [];
    }
    return currentServer.server_data;
  }, [currentServer]);

  // Memoize danh sách tập phim hiển thị
  const episodeDisplay = useMemo(() => {
    if (!isMounted || !Array.isArray(currentEpisodes) || currentEpisodes.length === 0) {
      return [];
    }
    const start = (page - 1) * limitDisplay;
    const end = start + limitDisplay;
    return currentEpisodes.slice(start, end);
  }, [currentEpisodes, page, isMounted]);

  // ---- Icons (sử dụng useMemo để không tạo lại mỗi lần render) ----
  const vietsubIcon = useMemo(() => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 12v2H5v-2h2zm-2-2V8h2v2H5zm6 2v2H9v-2h2zm-2-2V8h2v2H9zm7 6v1H8v-1h8zm-1-4v2h-2v-2h2zm-2-2V8h2v2h-2zm4 4v-2h2v2h-2zm2-4h-2V8h2v2z"></path>
    </svg>
  ), []);

  const dubbedIcon = useMemo(() => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zm6 9a6.002 6.002 0 01-5 5.91V21h-2v-5.09A6.002 6.002 0 016 10V9h2v1a4 4 0 008 0V9h2v1z"></path>
    </svg>
  ), []);

  const thuyetMinhIcon = useMemo(() => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 22C1 17.5817 4.58172 14 9 14C13.4183 14 17 17.5817 17 22H1ZM9 13C5.685 13 3 10.315 3 7.00002C3 3.68502 5.685 1.00002 9 1.00002C12.315 1.00002 15 3.68502 15 7.00002C15 10.315 12.315 13 9 13ZM18.2463 3.18451C18.732 4.36026 19 5.64884 19 7.00002C19 8.35119 18.732 9.63977 18.2463 10.8155L16.5694 9.59595C16.8485 8.78194 17 7.90867 17 7.00002C17 6.09136 16.8485 5.21809 16.5694 4.40408L18.2463 3.18451ZM21.5476 0.783569C22.4773 2.65651 23 4.76723 23 7.00002C23 9.23281 22.4773 11.3435 21.5476 13.2165L19.9027 12.0201C20.6071 10.4928 21 8.79231 21 7.00002C21 5.20772 20.6071 3.5072 19.9027 1.9799L21.5476 0.783569Z"></path>
    </svg>
  ), []);

  // Hàm lấy thông tin server - memoized
  const getServerInfo = useCallback((serverName: string) => {
    if (!serverName || typeof serverName !== 'string') {
      return { title: "Lồng tiếng", icon: dubbedIcon };
    }
    const lowerServerName = serverName.toLowerCase();
    if (lowerServerName.includes("vietsub")) {
      return { title: "Phụ đề", icon: vietsubIcon };
    } else if (lowerServerName.includes("thuyết minh")) {
      return { title: "Thuyết minh", icon: thuyetMinhIcon };
    } else {
      return { title: "Lồng tiếng", icon: dubbedIcon };
    }
  }, [vietsubIcon, dubbedIcon, thuyetMinhIcon]);

  // ---- useEffect Hooks ----

  // Chỉ set isMounted ở client để tránh hydration error
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Reset page khi server thay đổi
  useEffect(() => {
    if (isMounted) {
      setPage(1);
    }
  }, [activeServerIndex, isMounted]);

  // === FIX: KHÔI PHỤC TRẠNG THÁI TỪ URL KHI REFRESH TRANG ===
  useEffect(() => {
    // Chỉ chạy ở client, sau khi đã mount và có dữ liệu
    if (!isMounted || !Array.isArray(episodes) || episodes.length === 0 || redirect) {
      return;
    }

    // `window` an toàn để truy cập bên trong useEffect
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const episodeSlugFromQuery = queryParams.get('episode');
      const typeFromQuery = queryParams.get('type');

      // Nếu có đủ tham số trên URL
      if (episodeSlugFromQuery && typeFromQuery) {
        // 1. Tìm server khớp với 'type' trên URL
        const serverIndex = episodes.findIndex(
          (server) => formatTypeMovie(server.server_name) === typeFromQuery
        );

        if (serverIndex !== -1) {
          const targetServer = episodes[serverIndex];
          const allEpisodesInServer = targetServer.server_data;

          // 2. Tìm tập phim khớp với 'slug' trên URL
          const episodeToRestore = allEpisodesInServer.find(
            (ep) => ep?.slug === episodeSlugFromQuery
          );

          if (episodeToRestore && currentEpisode?.link_embed !== episodeToRestore.link_embed) {
            // 3. Cập nhật state để khớp với URL
            setActiveServerIndex(serverIndex);
            dispatch(setCurrentEpisode(episodeToRestore));

            // 4. Chuyển đến đúng trang pagination
            const episodeIndexInList = allEpisodesInServer.findIndex(
              (ep) => ep?.slug === episodeSlugFromQuery
            );
            if (episodeIndexInList !== -1) {
              const newPage = Math.floor(episodeIndexInList / limitDisplay) + 1;
              setPage(newPage);
            }
          }
        }
      }
    } catch (error) {
      console.error('Lỗi khi khôi phục trạng thái từ URL:', error);
    }
  }, [isMounted, episodes, dispatch, redirect, currentEpisode]); // Dependencies


  // ---- Callback Handlers ----

  const handleChangePage = useCallback((newPage: number) => {
    if (!isMounted || !Array.isArray(currentEpisodes) || currentEpisodes.length === 0) return;
    setPage(newPage);
  }, [isMounted, currentEpisodes]);

  const handleSetCurrentEpisode = useCallback((item: Episode) => {
    if (!isMounted || !item || redirect) return;
    if (currentEpisode?.link_embed === item.link_embed) return;

    try {
      let idForQuery = getIdFromLinkEmbed(item.link_embed, 8) || generateRandomId(7);
      const type = formatTypeMovie(currentServer?.server_name || '');

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
      console.error('Lỗi khi chọn tập phim:', error);
    }
  }, [isMounted, redirect, currentEpisode, currentServer, dispatch, showToaster]);

  const handleServerChange = useCallback((serverIndex: number) => {
    setActiveServerIndex(serverIndex);
  }, []);

  // ---- Render Logic ----

  // Trạng thái loading ban đầu
  if (!isMounted) {
    return (
      <Box className="flex flex-col gap-4 mt-4">
        <Box className="text-gray-50 text-xs font-semibold">Đang tải danh sách tập...</Box>
      </Box>
    );
  }

  // Không có dữ liệu
  if (!Array.isArray(episodes) || episodes.length === 0) {
    return (
      <Box className="flex flex-col gap-4 mt-4">
        <Box className="text-gray-200">Không có tập phim nào.</Box>
      </Box>
    );
  }

  // Cải thiện cách dùng class động của Tailwind
  const gridColsClasses = {
    base: `grid-cols-${colums.base}`,
    md: `md:grid-cols-${colums.md}`,
    lg: `lg:grid-cols-${colums.lg}`,
    xl: `xl:grid-cols-${colums.xl}`,
  };

  return (
    <Box className="flex flex-col gap-4 mt-4">
      {/* Tabs chọn server */}
      <Box className="flex gap-2 items-center min-h-[40px] overflow-x-auto pb-2">
        {episodes.map((server, index) => {
          if (!server || !server.server_name) return null;

          const { title, icon } = getServerInfo(server.server_name);
          const isActive = activeServerIndex === index;

          return (
            <Box
              key={`${server.server_name}-${index}`}
              onClick={() => handleServerChange(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${isActive
                ? 'border border-white text-white bg-white/10'
                : 'text-white border border-transparent hover:bg-white/5'
                }`}
              style={{ flexShrink: 0 }}
            >
              <Box className="text-white">{icon}</Box>
              <span className="text-xs font-semibold text-white whitespace-nowrap">{title}</span>
            </Box>
          );
        })}
      </Box>

      {/* Lưới các tập phim */}
      {/* LƯU Ý QUAN TRỌNG VỀ TAILWIND:
        Tailwind CSS cần thấy chuỗi class đầy đủ trong code của bạn để generate ra CSS tương ứng.
        Việc dùng `grid-cols-${colums.base}` có thể không hoạt động nếu các class như `grid-cols-2`, `md:grid-cols-4`... 
        không xuất hiện ở đâu khác trong project. 
        Để chắc chắn, bạn nên thêm chúng vào file `tailwind.config.js` trong phần `safelist`.
        Ví dụ: safelist: ['grid-cols-2', 'md:grid-cols-4', 'lg:grid-cols-6', 'xl:grid-cols-8']
      */}
      <Box
        className={`grid ${gridColsClasses.base} ${gridColsClasses.md} ${gridColsClasses.lg} ${gridColsClasses.xl} lg:gap-4 gap-2`}
      >
        {episodeDisplay.map((item: Episode, index: number) => {
          if (!item || !item.link_embed) return null;

          return (
            <EpisodeItem
              key={`${currentServer?.server_name || 'server'}-${item.link_embed}-${index}`}
              item={item}
              server_name={currentServer?.server_name || ''}
              redirect={redirect}
              handleSetCurrentEpisode={handleSetCurrentEpisode}
              isActive={currentEpisode?.link_embed === item.link_embed}
            />
          );
        })}
      </Box>

      {/* Phân trang */}
      {isMounted && currentEpisodes.length > limitDisplay && (
        <Box className="flex mx-auto my-6">
          <PaginationRoot
            size={windowWidth < 768 ? "xs" : "md"}
            count={currentEpisodes.length}
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

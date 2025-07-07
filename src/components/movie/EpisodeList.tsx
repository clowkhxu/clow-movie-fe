"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
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
import SkeletonEpisodesList from "../skeletons/SkeletonEpisodesList";
import Image from "next/image";

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

// *** THAY ĐỔI 1: Loại bỏ `movieSlug` không cần thiết ***
interface EpisodeListProps {
  episodes: ServerData[];
  movieType?: string;
  movieName?: string;
  posterUrl?: string;
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

const EpisodeList = ({
  episodes = [],
  movieType,
  movieName = "Tên phim mặc định",
  posterUrl = "https://i.imgur.com/rxosIgX.jpeg",
  colums = {
    base: 2,
    md: 4,
    lg: 6,
    xl: 8,
  },
  redirect = false,
  showToaster = true,
}: EpisodeListProps) => {
  // *** THAY ĐỔI 2: Loại bỏ `useRouter` ***
  const [activeServerIndex, setActiveServerIndex] = useState(0);
  const [episodeDisplay, setEpisodeDisplay] = useState<Episode[]>([]);
  const [page, setPage] = useState(1);
  const [isClient, setIsClient] = useState(false);
  const hasInitialized = useRef(false);
  const isInitializing = useRef(false);

  const dispatch: AppDispatch = useDispatch();
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const { currentEpisode } = useSelector((state: RootState) => state.movie.movieInfo);

  const currentServer = useMemo(() => episodes[activeServerIndex], [episodes, activeServerIndex]);
  const currentEpisodes = useMemo(() => currentServer?.server_data || [], [currentServer]);

  const isSingleMovieLayout = useMemo(() => {
    if (movieType === 'single') return true;
    const firstEpisode = episodes?.[0]?.server_data?.[0];
    return firstEpisode?.name.toUpperCase() === 'FULL';
  }, [movieType, episodes]);

  // Icons (Memoized)
  const pdIcon = useMemo(() => (
    <Image src="/icon/pd.svg" alt="Icon" width={20} height={20} />
  ), []);
  const vietsubIcon = useMemo(() => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em"><path fill="none" d="M0 0h24v24H0z"></path><path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7 12v2H5v-2h2zm-2-2V8h2v2H5zm6 2v2H9v-2h2zm-2-2V8h2v2H9zm7 6v1H8v-1h8zm-1-4v2h-2v-2h2zm-2-2V8h2v2h-2zm4 4v-2h2v2h-2zm2-4h-2V8h2v2z"></path></svg>
  ), []);
  const dubbedIcon = useMemo(() => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em"><path fill="none" d="M0 0h24v24H0z"></path><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3zm6 9a6.002 6.002 0 01-5 5.91V21h-2v-5.09A6.002 6.002 0 016 10V9h2v1a4 4 0 008 0V9h2v1z"></path></svg>
  ), []);
  const thuyetMinhIcon = useMemo(() => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M1 22C1 17.5817 4.58172 14 9 14C13.4183 14 17 17.5817 17 22H1ZM9 13C5.685 13 3 10.315 3 7.00002C3 3.68502 5.685 1.00002 9 1.00002C12.315 1.00002 15 3.68502 15 7.00002C15 10.315 12.315 13 9 13ZM18.2463 3.18451C18.732 4.36026 19 5.64884 19 7.00002C19 8.35119 18.732 9.63977 18.2463 10.8155L16.5694 9.59595C16.8485 8.78194 17 7.90867 17 7.00002C17 6.09136 16.8485 5.21809 16.5694 4.40408L18.2463 3.18451ZM21.5476 0.783569C22.4773 2.65651 23 4.76723 23 7.00002C23 9.23281 22.4773 11.3435 21.5476 13.2165L19.9027 12.0201C20.6071 10.4928 21 8.79231 21 7.00002C21 5.20772 20.6071 3.5072 19.9027 1.9799L21.5476 0.783569Z"></path></svg>
  ), []);

  const getServerInfo = useCallback((serverName: string) => {
    if (serverName.includes("Vietsub")) return { title: "Phụ đề", icon: vietsubIcon };
    if (serverName.includes("Thuyết Minh")) return { title: "Thuyết minh", icon: thuyetMinhIcon };
    return { title: "Lồng tiếng", icon: dubbedIcon };
  }, [vietsubIcon, thuyetMinhIcon, dubbedIcon]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // *** THAY ĐỔI 3: Trả lại logic `changeQuery` ban đầu ***
  const handleSetCurrentEpisode = useCallback((item: Episode) => {
    if (redirect) return;

    try {
      const idForQuery = getIdFromLinkEmbed(item.link_embed, 8) || generateRandomId(7);
      const type = formatTypeMovie(currentServer.server_name);

      // Sử dụng lại hàm `changeQuery` để chỉ thay đổi tham số URL
      const newQuery = [{ key: "id", value: idForQuery }, { key: "episode", value: item.slug || '' }, { key: "type", value: type }];
      changeQuery(newQuery);

      // Dispatch để cập nhật trạng thái player
      dispatch(setCurrentEpisode(item));

      if (showToaster) {
        handleShowToaster(`Bạn đang xem ${isSingleMovieLayout ? movieName : (item?.filename || 'tập phim')}`, "Chúc bạn xem phim vui vẻ!");
      }
    } catch (error) {
      console.error('Lỗi khi chọn tập phim:', error);
    }
  }, [currentServer, dispatch, showToaster, isSingleMovieLayout, movieName, redirect]);

  useEffect(() => {
    if (!isClient || redirect || !episodes || episodes.length === 0 || hasInitialized.current || isInitializing.current) {
      return;
    }

    isInitializing.current = true;
    hasInitialized.current = true;

    const queryParams = new URLSearchParams(window.location.search);
    const episodeSlugFromQuery = queryParams.get('episode');
    const typeFromQuery = queryParams.get('type');

    if (episodeSlugFromQuery && typeFromQuery) {
      const serverIndex = episodes.findIndex(server => formatTypeMovie(server.server_name) === typeFromQuery);
      if (serverIndex !== -1) {
        const targetServer = episodes[serverIndex];
        const episodeToRestore = targetServer.server_data.find(ep => ep?.slug === episodeSlugFromQuery);
        if (episodeToRestore) {
          setActiveServerIndex(serverIndex);
          dispatch(setCurrentEpisode(episodeToRestore));
          if (!isSingleMovieLayout) {
            const episodeIndex = targetServer.server_data.findIndex(ep => ep?.slug === episodeSlugFromQuery);
            if (episodeIndex !== -1) {
              setPage(Math.floor(episodeIndex / limitDisplay) + 1);
            }
          }
        }
      }
    } else if (isSingleMovieLayout && currentEpisodes.length > 0) {
      if (!currentEpisode) {
        dispatch(setCurrentEpisode(currentEpisodes[0]));
      }
    }

    isInitializing.current = false;
  }, [isClient, episodes, redirect, dispatch, isSingleMovieLayout, currentEpisodes, currentEpisode]);

  useEffect(() => {
    if (!isClient || isSingleMovieLayout) return;
    const start = (page - 1) * limitDisplay;
    const end = start + limitDisplay;
    setEpisodeDisplay(currentEpisodes.slice(start, end));
  }, [page, currentEpisodes, isClient, isSingleMovieLayout]);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleServerChange = useCallback((serverIndex: number) => {
    if (serverIndex === activeServerIndex) return;
    setActiveServerIndex(serverIndex);
    setPage(1);
    if (isSingleMovieLayout) {
      const newServer = episodes[serverIndex];
      if (newServer && newServer.server_data.length > 0) {
        handleSetCurrentEpisode(newServer.server_data[0]);
      }
    }
  }, [activeServerIndex, isSingleMovieLayout, episodes, handleSetCurrentEpisode]);

  if (!isClient) {
    return <SkeletonEpisodesList colums={colums} />;
  }

  if (isSingleMovieLayout) {
    return (
      <Box className="flex flex-col gap-4 mt-4">
        <h2 className="text-xl font-bold text-white">Các bản chiếu</h2>
        <Box className="space-y-3">
          {episodes.map((server, index) => {
            const singleEpisode = server.server_data[0];
            if (!singleEpisode) return null;

            const { title } = getServerInfo(server.server_name);

            return (
              <Box
                key={index}
                className="relative bg-[#3a3d4d] rounded-lg p-6 overflow-hidden cursor-pointer group max-w-sm"
                onClick={() => handleSetCurrentEpisode(singleEpisode)}
              >
                <Box className="relative z-10 flex flex-col items-start gap-3">
                  <div className="flex items-center gap-1.5 text-white/80">
                    {pdIcon}
                    <span className="font-semibold text-xs">{title}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{movieName}</h3>
                  <button
                    className="px-3 py-1.5 text-xs font-semibold text-black bg-white rounded-md hover:bg-gray-200 transition-colors"
                  >
                    Xem bản này
                  </button>
                </Box>
                <Box
                  className="absolute top-0 right-0 h-full w-1/2"
                  style={{
                    maskImage: 'linear-gradient(to left, black 25%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, black 25%, transparent 100%)',
                  }}
                >
                  <Image
                    src={posterUrl}
                    alt={movieName || "Poster"}
                    layout="fill"
                    objectFit="cover"
                    className="opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }

  // Giao diện mặc định cho phim bộ
  return (
    <Box className="flex flex-col gap-4 mt-4">
      <Box className="flex gap-2 items-center min-h-[40px] flex-wrap">
        {episodes.map((server, index) => {
          const { title, icon } = getServerInfo(server.server_name);
          const isActive = activeServerIndex === index;
          return (
            <Box
              key={index}
              onClick={() => handleServerChange(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${isActive ? 'border border-white text-white' : 'text-white border border-transparent'
                }`}
            >
              <Box className="text-white flex-shrink-0">{icon}</Box>
              <span className="text-xs font-semibold text-white whitespace-nowrap">{title}</span>
            </Box>
          );
        })}
      </Box>

      {currentEpisodes.length === 0 ? (
        <Box className="text-gray-200 mt-4">Không có tập phim nào cho server này.</Box>
      ) : (
        <>
          <Box className={`grid grid-cols-${colums.base} md:grid-cols-${colums.md} lg:grid-cols-${colums.lg} xl:grid-cols-${colums.xl} lg:gap-4 gap-2`}>
            {episodeDisplay.map((item: Episode, index: number) => (
              <EpisodeItem
                key={`${currentServer.server_name}-${item.link_embed}-${index}`}
                item={item}
                server_name={currentServer.server_name}
                redirect={redirect}
                handleSetCurrentEpisode={handleSetCurrentEpisode}
                isActive={currentEpisode?.link_embed === item.link_embed}
              />
            ))}
          </Box>

          {currentEpisodes.length > limitDisplay && (
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
        </>
      )}
    </Box>
  );
};

export default EpisodeList;

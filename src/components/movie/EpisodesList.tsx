"use client";

import { Box, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { PaginationItems, PaginationRoot } from "../ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  formatTypeMovie,
  handleShowToaster,
} from "@/lib/utils";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import EpisodeItem from "./EpisodeItem";

// --- TYPE DEFINITIONS ---
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


// --- CLIENT-ONLY COMPONENT ---
// This component contains all the logic and state, refactored to be more robust.
const EpisodesListClient = ({
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
  // State for user interaction
  const [activeServerIndex, setActiveServerIndex] = useState(0);
  const [page, setPage] = useState(1);

  // State for safely derived data to prevent race conditions
  const [currentServer, setCurrentServer] = useState<ServerData | null>(null);
  const [currentEpisodes, setCurrentEpisodes] = useState<Episode[]>([]);
  const [episodeDisplay, setEpisodeDisplay] = useState<Episode[]>([]);

  // Redux selectors
  const dispatch: AppDispatch = useDispatch();
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const { currentEpisode } = useSelector((state: RootState) => state.movie.movieInfo);

  // Effect 1: React to changes in props (episodes) or user selection (activeServerIndex).
  // This is the main effect to safely process incoming data.
  useEffect(() => {
    // Guard: Make sure episodes data is a valid array with content.
    if (episodes && Array.isArray(episodes) && episodes.length > 0 && episodes[activeServerIndex]) {
      const serverData = episodes[activeServerIndex];
      // More validation: ensure the server object and its data are valid.
      if (serverData && typeof serverData.server_name === 'string' && Array.isArray(serverData.server_data)) {
        setCurrentServer(serverData);
        setCurrentEpisodes(serverData.server_data);
        setPage(1); // Reset page whenever the server changes.
      }
    } else {
      // If data is invalid or not ready, reset state to a safe default.
      setCurrentServer(null);
      setCurrentEpisodes([]);
    }
  }, [episodes, activeServerIndex]); // This effect runs only when the source data changes.

  // Effect 2: React to changes in the full episode list or page number to update the visible list.
  useEffect(() => {
    if (currentEpisodes.length > 0) {
      const start = (page - 1) * limitDisplay;
      const end = start + limitDisplay;
      setEpisodeDisplay(currentEpisodes.slice(start, end));
    } else {
      setEpisodeDisplay([]);
    }
  }, [currentEpisodes, page]); // This effect runs only after the server data is safely set.

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

  const getServerInfo = (serverName: string) => {
    const safeServerName = serverName || '';
    if (safeServerName.includes("Vietsub")) return { title: "Phụ đề", icon: vietsubIcon };
    if (safeServerName.includes("Thuyết Minh")) return { title: "Thuyết minh", icon: thuyetMinhIcon };
    return { title: "Lồng tiếng", icon: dubbedIcon };
  };

  const handleSetCurrentEpisode = (item: Episode) => {
    if (!item || redirect) return;
    if (currentEpisode?.link_embed === item.link_embed) return;
    dispatch(setCurrentEpisode(item));
    if (showToaster) {
      handleShowToaster(`Bạn đang xem ${item?.filename || 'tập phim'}`, "Chúc bạn xem phim vui vẻ!");
    }
  };

  if (!Array.isArray(episodes) || episodes.length === 0) {
    return (
      <Box className="flex flex-col gap-4 mt-4">
        <Box className="text-gray-200">Không có tập phim nào.</Box>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-4 mt-4">
      <Box className="flex gap-2 items-center min-h-[40px]">
        {episodes.map((server, index) => {
          if (!server || typeof server.server_name !== 'string') return null;
          const { title, icon } = getServerInfo(server.server_name);
          return (
            <Box
              key={index}
              onClick={() => setActiveServerIndex(index)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors duration-200 ${activeServerIndex === index ? 'border border-white text-white' : 'text-white border border-transparent'}`}
              style={{ minWidth: 'fit-content', boxSizing: 'border-box' }}
            >
              <Box className="text-white flex-shrink-0">{icon}</Box>
              <span className="text-xs font-semibold text-white whitespace-nowrap">{title}</span>
            </Box>
          );
        })}
      </Box>

      <Box className={`grid grid-cols-${colums.base} md:grid-cols-${colums.md} lg:grid-cols-${colums.lg} xl:grid-cols-${colums.xl} lg:gap-4 gap-2`}>
        {currentServer && episodeDisplay.map((item) => {
          if (!item || !item.link_embed) return null;
          return (
            <EpisodeItem
              key={`${currentServer.server_name}-${item.link_embed}`}
              item={item}
              server_name={currentServer.server_name}
              redirect={redirect}
              handleSetCurrentEpisode={handleSetCurrentEpisode}
              isActive={currentEpisode?.link_embed === item.link_embed}
            />
          );
        })}
      </Box>

      {currentEpisodes.length > limitDisplay && (
        <Box className="flex mx-auto my-6">
          <PaginationRoot
            size={windowWidth < 768 ? "xs" : "md"}
            count={currentEpisodes.length}
            pageSize={limitDisplay}
            page={page}
            siblingCount={1}
            onPageChange={(details) => setPage(details.page)}
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


// --- MAIN EXPORTED COMPONENT (HYDRATION GATE) ---
const EpisodesList = (props: EpisodesListProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <Box className="flex flex-col gap-4 mt-4">
        <Box className="text-gray-50 text-xs font-semibold">Đang tải danh sách tập...</Box>
      </Box>
    );
  }

  return <EpisodesListClient {...props} />;
};

export default EpisodesList;

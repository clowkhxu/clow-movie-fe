"use client";

// Import các component cần thiết từ Chakra UI và React
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";

// Import các store, actions và hooks cần thiết
import { fetchDataMovieInfo } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useParams, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentEpisode } from "@/store/slices/movieSlice";
import { setIsTheaterMode } from "@/store/slices/systemSlice";
import { addNewMovie } from "@/lib/actions/userMovieAction";
import { useSession } from "next-auth/react";

// Import các component con
import SectionVideo from "./SectionVideo";
import SectionInfo from "./SectionInfo";
import MovieSuggestions from "@/components/movie/MovieSuggestions";
import EpisodesList from "@/components/movie/EpisodeList";
import SkeletonWachingPage from "@/components/skeletons/SkeletonWatchingPage";
import SkeletonRapPhimButton from "@/components/skeletons/SkeletonRapPhimButton";
import EmptyData from "@/components/EmptyData";
import FavoriteButton from "@/components/movie/controls/FavoriteButton";
import PlaylistButton from "@/components/playlist/PlaylistPopover";
import ShareButton from "@/components/movie/controls/ShareButton";
import ReportFilmButton from "@/components/movie/controls/ReportFilmButton";
import RapPhimButton from "@/components/movie/controls/RapPhimButton";
import CommentSection from "@/components/feedback/FeedbackSection";

// Định nghĩa component Icon SVG
const SuggestionIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 576 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: "8px" }}
  >
    <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"></path>
  </svg>
);

// Hàm trợ giúp để lấy một URL ngẫu nhiên từ chuỗi URL (nếu có nhiều)
// hoặc URL duy nhất, hoặc undefined nếu không có URL hợp lệ.
const getRandomUrlFromString = (urlString?: string): string | undefined => {
  if (!urlString || typeof urlString !== 'string') {
    return undefined; // Trả về undefined nếu không có chuỗi hoặc không phải là chuỗi
  }
  // Tách chuỗi bằng dấu phẩy, loại bỏ khoảng trắng thừa, và lọc ra các chuỗi rỗng
  const urls = urlString.split(',')
    .map(u => u.trim())
    .filter(u => u); // Lọc bỏ các phần tử rỗng sau khi trim

  if (urls.length === 0) {
    return undefined; // Không có URL hợp lệ nào sau khi xử lý
  }
  // Nếu có một hoặc nhiều URL, chọn ngẫu nhiên một URL từ danh sách đã lọc
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
};


const MainPage = () => {
  const searchParams = useSearchParams();
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { movie, episodes, loading, error, currentEpisode } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const { isTheaterMode } = useSelector((state: RootState) => state.system);
  const { data: session }: any = useSession();
  const id = searchParams.get("id");

  useEffect(() => {
    if (params?.slug) {
      dispatch(
        fetchDataMovieInfo({
          slug: params.slug as string,
          page: "watching",
        })
      );
    }
  }, [dispatch, params?.slug]);

  useEffect(() => {
    if (session) {
      if (!loading && movie) {
        // Lấy URL poster ngẫu nhiên nếu movie.poster_url chứa nhiều link
        const selectedPosterUrl = getRandomUrlFromString(movie?.poster_url) || movie?.poster_url; // Fallback về poster_url gốc nếu hàm trả về undefined

        // Xử lý thumb_url tương tự nếu cần, ở đây lấy link thứ 2 sau dấu phẩy, hoặc link đầu tiên
        let selectedThumbUrl = movie?.thumb_url;
        if (movie?.thumb_url && typeof movie.thumb_url === 'string' && movie.thumb_url.includes(',')) {
          const parts = movie.thumb_url.split(',');
          selectedThumbUrl = (parts[1] && parts[1].trim()) ? parts[1].trim() : (parts[0] && parts[0].trim() ? parts[0].trim() : movie.thumb_url);
        }


        addNewMovie({
          userId: session?.user?.id as string,
          movieData: {
            movieName: movie?.name,
            movieSlug: movie?.slug,
            moviePoster: selectedPosterUrl, // Sử dụng URL poster đã được chọn/xử lý
            movieThumbnail: selectedThumbUrl, // Sử dụng thumb_url đã được xử lý
          },
          type: "history",
          accessToken: session?.user?.accessToken,
        });
      }
    }
  }, [loading, movie, session, params.slug, dispatch]); // Thêm dispatch vào dependencies nếu nó được sử dụng trong logic phức tạp hơn (ở đây không cần thiết lắm nhưng để cho an toàn)

  useEffect(() => {
    if (episodes?.length > 0) {
      const allServerData = [
        ...(episodes[0]?.server_data ?? []),
        ...(episodes[1]?.server_data ?? []),
      ];

      let episodeToSet = null;
      if (id) {
        episodeToSet = allServerData.find((item: any) =>
          item?.link_embed?.includes(id)
        );
      }

      if (episodeToSet) {
        dispatch(setCurrentEpisode(episodeToSet));
      } else if (allServerData.length > 0) {
        dispatch(setCurrentEpisode(allServerData[0]));
      }
    }
  }, [episodes, id, dispatch]);

  // Cleanup theater mode khi rời khỏi trang
  useEffect(() => {
    return () => {
      dispatch(setIsTheaterMode(false));
    };
  }, [dispatch]);

  const handleToggleTheaterMode = () => {
    dispatch(setIsTheaterMode(!isTheaterMode));
  };

  if (loading) return <SkeletonWachingPage />;
  if (error) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <EmptyData
          title="Không tìm thấy kết quả"
          description="Bộ phim này không tồn tại hoặc đã bị xóa"
        />
      </Box>
    );
  }

  return (
    <Box className="flex flex-col gap-12 max-w-[1620px] mx-auto lg:px-14">
      <Box className="lg:mt-32 mt-24">
        {/* Ẩn tiêu đề khi ở theater mode */}
        {!isTheaterMode && (
          <h3 className="xl:text-4xl lg:text-3xl px-4 md:text-2xl text-xl title-text font-bold mb-6 sm:inline-block hidden">
            {movie?.name} - {currentEpisode?.name}
          </h3>
        )}
        
        <Box className="flex flex-col lg:px-4">
          <SectionVideo />
          <Box className="p-4 bg-[#08080a] border-l border-r border-b border-[#ffffff10] xl:rounded-bl-2xl xl:rounded-br-2xl flex justify-between">
            <Box className="flex gap-4">
              <FavoriteButton placement="horizontal" responsiveText />
              <PlaylistButton placement="horizontal" responsiveText />
              <ShareButton placement="horizontal" responsiveText />
              <ReportFilmButton placement="horizontal" responsiveText />
            </Box>
            <Box className="flex gap-4">
              {/* Hiển thị skeleton khi đang loading */}
              {loading ? (
                <SkeletonRapPhimButton />
              ) : (
                <RapPhimButton 
                  placement="horizontal" 
                  responsiveText 
                  isTheaterMode={isTheaterMode}
                  onToggle={handleToggleTheaterMode}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tạo khoảng trống để có thể cuộn xuống khi theater mode */}
      <Box style={{ minHeight: isTheaterMode ? '100vh' : 'auto' }}>
        {/* Ẩn tất cả nội dung khác khi ở theater mode */}
        {!isTheaterMode && (
          <>
            <Box className="flex flex-col gap-12 px-4">
              <Box className="flex gap-12 lg:flex-row flex-col pb-12 border-b border-[#ffffff10]">
                <SectionInfo data={movie} />
                <Box className="lg:w-[0.5px] w-full lg:h-auto h-[0.5px] bg-[#ffffff10]"></Box>
                <Box className="xl:flex-2 flex-1">
                  <Box className="flex flex-col gap-6">
                    <EpisodesList
                      episodes={episodes || []}
                      colums={{
                        base: 3,
                        md: 5,
                        lg: 3,
                        xl: 6,
                      }}
                      redirect={false}
                    />
                  </Box>
                </Box>
              </Box>

              <CommentSection />

              <Box className="w-full h-[0.5px] bg-[#ffffff10]"></Box>

              {/* Loại bỏ fontWeight để không in đậm */}
              <Flex
                alignItems="center"
                mb={4}
              >
                <SuggestionIcon />
                <Text fontSize="2xl" color="gray.200">
                  Đề xuất cho bạn
                </Text>
              </Flex>

              <MovieSuggestions
                columns={{ base: 3, md: 4, lg: 5, xl: 6, "2xl": 8 }}
                title=""
                limit={24}
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MainPage;
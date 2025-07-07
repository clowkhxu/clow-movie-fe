"use client";

import { fetchDataMovieInfo } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, GridItem, SimpleGrid } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackgroundMovie from "./BackgroundMovie";
import MovieDetail from "./MovieDetail";
import MovieMain from "./MovieMain";
import SkeletonInfoPage from "@/components/skeletons/SkeletonInfoPage";
import EmptyData from "@/components/EmptyData";

const MainPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { movie, loading, error } = useSelector(
    (state: RootState) => state.movie.movieInfo
  );
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    dispatch(
      fetchDataMovieInfo({
        slug: slug as string,
        page: "info",
      })
    );
  }, [slug]);

  if (loading) return <SkeletonInfoPage />;
  if (error)
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <EmptyData
          title="Không tìm thấy kết quả"
          description="Bộ phim này không tồn tại hoặc đã bị xóa"
        />
      </Box>
    );

  return (
    <>
      <BackgroundMovie url={movie?.thumb_url} />
      <Box className="max-w-[1620px] mx-auto lg:px-14">
        <Box className="mt-[-100px]">
          <SimpleGrid columns={12} gap={0}>
            <GridItem colSpan={{ base: 12, md: 12, lg: 12, xl: 4 }}>
              <MovieDetail data={movie} />
            </GridItem>
            <GridItem colSpan={{ base: 12, md: 12, lg: 12, xl: 8 }}>
              <MovieMain />
            </GridItem>
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};

export default MainPage;

"use client";

import RootLayout from "@/components/layouts/RootLayout";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Skeleton } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/Pagination";
import SkeletonMovieList from "@/components/skeletons/SkeletonMovieGrid";
import EmptyData from "@/components/EmptyData";
import MovieGrid from "@/components/movie/movie-section/MovieGrid";
import "@/assets/css/movie.css";

const MainPage = () => {
  const searchParams = useSearchParams();
  const dispatch: AppDispatch = useDispatch();
  const { items, loading, pagination } = useSelector(
    (state: RootState) => state.movie.searchMovie
  );
  const currentPage = Number(searchParams.get("page")) || 1;
  const keyword = searchParams.get("keyword");
  const limit = 24;

  useEffect(() => {
    dispatch(
      fetchDataMovieSearch({
        keyword: keyword as string,
        page: Number(currentPage),
        limit,
      })
    );
  }, [keyword, currentPage]);

  if (loading) {
    return (
      <RootLayout>
        <Box className="flex flex-col gap-4 px-4 lg:pt-28 pt-24">
          <Skeleton className="lg:h-8 md:h-6 h-4 lg:w-[25%] w-[80%]" />
          <Box className="mt-6">
            <SkeletonMovieList
              limit={limit}
              columns={{ base: 3, md: 4, lg: 5, xl: 6, "2xl": 8 }}
            />
          </Box>
        </Box>
      </RootLayout>
    );
  }

  if (items?.length === 0) {
    return (
      <Box className="min-h-screen flex items-center justify-center">
        <EmptyData
          title="Không tìm thấy kết quả"
          description="Hãy thử lại với từ khóa khác"
        />
      </Box>
    );
  }

  return (
    <RootLayout>
      <Box className="px-4 lg:pt-28 pt-24">
        <h3 className="inline-block xl:text-4xl lg:text-3xl md:text-2xl text-xl title-text font-bold">
          Tìm thấy {pagination?.totalItems} kết quả cho từ khóa &quot;{keyword}
          &quot;
        </h3>

        <Box className="mt-8">
          <MovieGrid
            items={items}
            columns={{ base: 3, md: 4, lg: 5, xl: 6, "2xl": 8 }}
          />
        </Box>

        {!loading && (pagination?.totalItems as number) >= limit && (
          <Box className="flex justify-center mt-6">
            <Pagination
              pagination={{
                totalItems: pagination?.totalItems as number,
                totalItemsPerPage: pagination?.totalItemsPerPage as number,
              }}
              currentPage={currentPage}
            />
          </Box>
        )}
      </Box>
    </RootLayout>
  );
};

export default MainPage;

"use client";

import RootLayout from "@/components/layouts/RootLayout";
import FilterBox from "./FilterBox";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import MovieCard from "@/components/movie/movie-section/MovieCard";
import SkeletonMovieGrid from "@/components/skeletons/SkeletonMovieGrid";
import EmptyData from "@/components/EmptyData";
import { useEffect } from "react";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "next/navigation";

const MainPage = () => {
  const { items, loading, pagination } = useSelector(
    (state: RootState) => state.movie.searchMovie
  );
  const dispatch: AppDispatch = useDispatch();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || 1;
  const country = searchParams.get("country") || "";
  const category = searchParams.get("category") || "";
  const sort_lang = searchParams.get("sort_lang") || "";
  const year = searchParams.get("year") || "";
  const sort_type = searchParams.get("sort_type") || "desc";

  useEffect(() => {
    dispatch(
      fetchDataMovieSearch({
        keyword: "a",
        page: currentPage as number,
        limit: 24,
        country: country as any,
        category: category as any,
        sort_lang: sort_lang as any,
        year: year as any,
        sort_type: sort_type as any,
      })
    );
  }, [currentPage]);

  return (
    <RootLayout>
      <Box className="lg:pt-28 pt-24 px-4">
        <h3 className="inline-block title-text font-bold xl:text-4xl lg:text-3xl md:text-2xl text-xl">
          Lọc nâng cao
        </h3>
        <FilterBox />

        <Box>
          {!loading ? (
            <>
              {items?.length > 0 ? (
                <SimpleGrid
                  columns={{ base: 3, md: 4, lg: 5, xl: 8 }}
                  gap={{
                    base: 2,
                    md: 3,
                    lg: 4,
                  }}
                >
                  {items?.map((item: any, index: number) => (
                    <MovieCard key={index} data={item} orientation="vertical" />
                  ))}
                </SimpleGrid>
              ) : (
                <Box className="h-96 flex items-center justify-center">
                  <EmptyData
                    title="Chưa có dữ liệu"
                    description="Dữ liệu sẽ được cập nhật sớm nhất"
                  />
                </Box>
              )}
            </>
          ) : (
            <SkeletonMovieGrid
              limit={24}
              columns={{ base: 3, md: 4, lg: 5, xl: 8 }}
            />
          )}
        </Box>

        {pagination?.totalItems >= 24 && (
          <Box className="flex justify-center mt-8">
            <Pagination
              pagination={{
                totalItems: pagination?.totalItems,
                totalItemsPerPage: pagination?.totalItemsPerPage,
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

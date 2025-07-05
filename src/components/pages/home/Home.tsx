"use client";

import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import SlideShow from "@/components/movie/slide-section/SlideShow";
import { useEffect, useRef, useState } from "react";
import {
  fetchDataMovie,
  fetchDataSlideShow,
} from "@/store/asyncThunks/movieAsyncThunk";
import MovieSection from "@/components/movie/MovieSection";
import {
  initialMovieConfig,
  quantitySectionMovie,
} from "@/configs/movieConfig";
import { toaster } from "@/components/ui/toaster";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const movieData = useSelector((state: RootState) => state.movie.movieData);
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedMoreData = useRef(false);
  const quantityFetchedData = useRef(quantitySectionMovie);
  const [loadingMoreData, setLoadingMoreData] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // kiểm tra đã fetch dữ liệu chưa
      if (scrollableDivRef.current && !hasFetchedMoreData.current) {
        const rect = scrollableDivRef.current.getBoundingClientRect();

        // kiểm tra đã cuộn đến cuối phần scrollableDivRef chưa
        if (rect.top <= window.innerHeight + 100) {
          // kiểm tra xem đã fetch hết dữ liệu chưa
          if (quantityFetchedData.current < initialMovieConfig.length) {
            fetchMoreData();
            hasFetchedMoreData.current = true;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // fetch dữ liệu ban đầu
        const fetchPromises = initialMovieConfig
          .slice(0, quantitySectionMovie)
          .map((configItem) =>
            dispatch(
              fetchDataMovie({
                type: configItem.type,
                describe: configItem.describe,
              })
            )
          );

        await Promise.all([dispatch(fetchDataSlideShow()), ...fetchPromises]);
      } catch (error) {
        toaster.error({
          description: "Đã có lỗi xảy ra khi lấy dữ liệu.",
          duration: 5000,
        });
      }
    };

    fetchInitialData();
  }, [dispatch]);

  const fetchMoreData = async () => {
    try {
      const start = quantityFetchedData.current;
      const end = start + quantitySectionMovie;

      const fetchPromises = initialMovieConfig
        .slice(start, end)
        .map((configItem) =>
          dispatch(
            fetchDataMovie({
              type: configItem.type,
              describe: configItem.describe,
            })
          )
        );

      setLoadingMoreData(true);
      await Promise.all(fetchPromises);
      setLoadingMoreData(false);

      quantityFetchedData.current = end;
      hasFetchedMoreData.current = false;
    } catch (error) {
      toaster.error({
        description: "Đã có lỗi xảy ra khi lấy dữ liệu.",
        duration: 5000,
      });
    }
  };

  // lọc và hiển thị dữ liệu đã hoàn thành
  const finalData = initialMovieConfig
    .filter((configItem) => movieData[configItem.type])
    .map((configItem) => ({
      title: configItem.title,
      link: `/detail/${configItem.describe}/${configItem.type}`,
      data: movieData[configItem.type],
      orientation: configItem.orientation,
    }));

  if (finalData.length === 0) return <Box className="min-h-screen" />;

  return (
    <Box>
      <SlideShow />
      <Box className="lg:px-14 max-w-[1900px] mt-12 mx-auto">
        <Box className="flex flex-col gap-12 overflow-hidden">
          <Box className="bg-gradient-to-b rounded-2xl from-[#282b3a] via-20% via-transparent">
            <MovieSection finalData={finalData} />
          </Box>
        </Box>
        <Box className="h-1 mt-10" ref={scrollableDivRef} />
        {loadingMoreData && (
          <Box className="flex justify-center items-center mt-12">
            <Box className="border-[#ffd875] border-[3px] border-b-transparent h-10 rounded-full w-10 animate-spin"></Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;

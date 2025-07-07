"use client";

import { TagClassic } from "@/components/movie/TagClassic"; // Giả sử component này tồn tại
import ShowMoreText from "@/components/ShowMoreText"; // Giả sử component này tồn tại
import { generateUrlImageResponsive } from "@/lib/utils";
import { Box, Image, Spinner, Text } from "@chakra-ui/react"; // Thêm Spinner và Text
import Link from "next/link";
import { useState, useEffect } from "react";

interface MovieDataTmdb {
  type?: "single" | "tv" | string;
  id?: string;
  season?: number | null;
  vote_average?: number | null;
  vote_count?: number | null;
}

interface MovieDataCategory {
  name?: string;
  slug?: string;
}

interface MovieDataCountry {
  name?: string;
  slug?: string;
}

interface MovieDetailData {
  poster_url?: string;
  name?: string;
  origin_name?: string;
  tmdb?: MovieDataTmdb; // Quan trọng: tmdb có thể ban đầu không có vote_average/vote_count
  quality?: string;
  year?: string;
  lang?: string;
  time?: string;
  episode_current?: string;
  category?: MovieDataCategory[];
  content?: string;
  director?: string[];
  country?: MovieDataCountry[];
  actor?: string[];
}

interface MovieDetailProps {
  data: MovieDetailData;
}

const getRandomPosterUrlFromString = (urlString?: string): string | undefined => {
  if (!urlString || typeof urlString !== 'string') {
    return undefined;
  }
  const urls = urlString.split(',').map(u => u.trim()).filter(u => u);
  if (urls.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
};

const MovieDetail = ({ data: initialData }: MovieDetailProps) => {
  const [image, setImage] = useState<string>("/images/placeholder.jpg");
  // movieDetails sẽ là nguồn dữ liệu chính để hiển thị,
  // được khởi tạo từ initialData và cập nhật phần điểm TMDb nếu cần.
  const [movieDetails, setMovieDetails] = useState<MovieDetailData>(initialData);
  const [isLoadingTmdb, setIsLoadingTmdb] = useState<boolean>(false);
  const [tmdbError, setTmdbError] = useState<string | null>(null);

  // Effect 1: Cập nhật poster và đồng bộ hóa movieDetails với initialData.
  // Effect này đảm bảo movieDetails luôn phản ánh initialData mới nhất làm cơ sở.
  useEffect(() => {
    const selectedPosterCandidate = getRandomPosterUrlFromString(initialData?.poster_url);
    if (selectedPosterCandidate) {
      const finalImageUrl = generateUrlImageResponsive(selectedPosterCandidate, 'poster');
      setImage(finalImageUrl);
    } else {
      setImage("/images/placeholder.jpg");
    }
    // Đồng bộ toàn bộ initialData vào movieDetails.
    // Nếu initialData.tmdb không có điểm, movieDetails.tmdb cũng sẽ không có điểm ở bước này.
    setMovieDetails(initialData);
  }, [initialData]);

  // Effect 2: Chỉ fetch và cập nhật điểm TMDb nếu thiếu trong initialData.
  // Effect này không đụng chạm đến các phần khác của movieDetails đã được set từ initialData.
  useEffect(() => {
    const fetchTmdbScoreIfNeeded = async () => {
      // Điều kiện để fetch:
      // 1. initialData.tmdb và initialData.tmdb.id phải tồn tại.
      // 2. Ít nhất một trong hai (vote_average hoặc vote_count) phải chưa có (null hoặc undefined).
      const shouldFetchScore =
        initialData?.tmdb?.id &&
        (initialData.tmdb.vote_average == null || initialData.tmdb.vote_count == null);

      if (shouldFetchScore) {
        setIsLoadingTmdb(true);
        setTmdbError(null);

        // Sử dụng non-null assertion (!) vì shouldFetchScore đã kiểm tra sự tồn tại của initialData.tmdb.id
        const tmdbId = initialData.tmdb!.id!;
        const originalType = initialData.tmdb!.type; // Giữ lại type gốc
        // SỬA ĐỔI: Thêm chú thích kiểu :string để tránh lỗi TypeScript khi so sánh.
        // Người dùng sẽ thay thế "YOUR_TMDB_API_KEY" bằng API key thực của họ.
        const apiKey: string = "b2bbbfa278010bd4f2a96083fd3f4fe4"; // !!! QUAN TRỌNG: Thay bằng API key của bạn !!!

        if (!apiKey || apiKey === "YOUR_TMDB_API_KEY") {
          console.warn("API key TMDb chưa được cấu hình. Vui lòng cập nhật trong MovieDetail.tsx");
          setTmdbError("API key TMDb chưa được cấu hình.");
          setIsLoadingTmdb(false);
          // Cập nhật movieDetails để đảm bảo tmdb object tồn tại với điểm số là null
          // nếu không thể fetch. Các phần khác của movieDetails không đổi.
          setMovieDetails(prevDetails => ({
            ...prevDetails, // Giữ nguyên các thông tin khác từ initialData
            tmdb: { // Đảm bảo tmdb object tồn tại
              ...initialData.tmdb, // Lấy id, type từ initialData.tmdb
              id: tmdbId,
              type: originalType,
              vote_average: initialData.tmdb?.vote_average ?? null, // Giữ điểm cũ (nếu có 1 phần) hoặc null
              vote_count: initialData.tmdb?.vote_count ?? null,   // Giữ điểm cũ (nếu có 1 phần) hoặc null
            }
          }));
          return;
        }

        let tmdbEndpointType: string;
        if (originalType === "single") {
          tmdbEndpointType = "movie";
        } else if (originalType === "tv") {
          tmdbEndpointType = "tv";
        } else {
          console.warn(`Loại TMDb không xác định: "${originalType}". Mặc định sử dụng 'movie'.`);
          tmdbEndpointType = "movie"; // Mặc định là 'movie' nếu type không rõ
        }

        const tmdbApiUrl = `https://api.themoviedb.org/3/${tmdbEndpointType}/${tmdbId}?api_key=${apiKey}&language=vi-VN`;

        try {
          const response = await fetch(tmdbApiUrl);
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.status_message || `Lỗi ${response.status} khi gọi TMDb API`);
          }
          const tmdbDataFromApi = await response.json();

          // Cập nhật CHỈ phần điểm trong movieDetails.tmdb.
          // Các trường khác của movieDetails và tmdb (như id, type) được giữ nguyên từ initialData.
          setMovieDetails(prevDetails => ({
            ...prevDetails, // Giữ nguyên các thông tin khác từ initialData
            tmdb: {
              ...initialData.tmdb, // Bắt đầu với tmdb từ initialData (chứa id, type gốc)
              id: tmdbId, // Đảm bảo id và type từ initialData được giữ lại
              type: originalType,
              vote_average: tmdbDataFromApi.vote_average, // Cập nhật điểm mới
              vote_count: tmdbDataFromApi.vote_count,     // Cập nhật điểm mới
            }
          }));
        } catch (error: any) {
          console.error("Lỗi khi fetch dữ liệu điểm từ TMDb:", error);
          setTmdbError(error.message || "Không thể tải thông tin điểm TMDb.");
          // Nếu lỗi, đảm bảo tmdb object và điểm số được đặt về trạng thái ban đầu hoặc null.
          setMovieDetails(prevDetails => ({
            ...prevDetails, // Giữ nguyên các thông tin khác
            tmdb: {
              ...initialData.tmdb,
              id: tmdbId,
              type: originalType,
              vote_average: initialData.tmdb?.vote_average ?? null, // Quay về điểm ban đầu (nếu có 1 phần) hoặc null
              vote_count: initialData.tmdb?.vote_count ?? null,   // Quay về điểm ban đầu (nếu có 1 phần) hoặc null
            }
          }));
        } finally {
          setIsLoadingTmdb(false);
        }
      }
      // Nếu shouldFetchScore là false, không làm gì cả.
      // movieDetails đã được set từ initialData (bao gồm cả điểm nếu đã có).
    };

    fetchTmdbScoreIfNeeded();
  }, [initialData]); // Chạy lại effect này khi initialData thay đổi.

  // displayData luôn là movieDetails, đã được đồng bộ và cập nhật (nếu cần).
  const displayData = movieDetails;

  return (
    <Box className="flex flex-col h-full p-6 gap-2 items-center lg:backdrop-blur-lg lg:bg-[#282b3a8a] xl:items-start xl:rounded-bl-4xl xl:rounded-tl-4xl xl:rounded-tr-4xl lg:rounded-tl-4xl lg:rounded-tr-4xl relative z-[10]">
      <Box className="w-40 mb-2">
        <Box className="h-0 pt-[150%] relative">
          <Image
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/images/notfound.png";
            }}
            src={image}
            alt={displayData?.name ?? "Không xác định"}
            objectFit="cover"
            className="h-full rounded-xl w-full absolute inset-0"
            loading="lazy"
          />
        </Box>
      </Box>

      <Box className="flex flex-col gap-2 xl:items-start items-center">
        <h4 className="lg:text-2xl text-lg text-gray-50 font-semibold text-center xl:text-left">
          {displayData?.name ?? "Không xác định"}
        </h4>
        <p className="text-[#ffd875] text-sm text-center xl:text-left">
          {displayData?.origin_name ?? "Không xác định"}
        </p>
        <Box className="flex flex-wrap gap-2 items-center justify-center xl:justify-start">
          <span className="bg-transparent border border-[#ffd875] h-6 justify-center p-1 rounded-md inline-flex items-center">
            <span className="text-[#ffd875] text-xs">TMDb</span>
            {isLoadingTmdb ? (
              <Spinner size="xs" color="gray.50" ml={1} />
            ) : (
              <span className="text-gray-50 text-sm ml-1">
                {displayData?.tmdb?.vote_average != null ? Number(displayData.tmdb.vote_average).toFixed(1) : "N/A"}
              </span>
            )}
          </span>
          {/* Thêm withBorder={true} cho các tag cụ thể */}
          <TagClassic text={displayData?.quality ?? "N/A"} withBorder={true} />
          <TagClassic text={displayData?.year ?? "N/A"} withBorder={true} />
          <TagClassic text={displayData?.lang ?? "N/A"} withBorder={true} />
          <TagClassic text={displayData?.time ?? "N/A"} withBorder={true} />
          <TagClassic text={displayData?.episode_current ?? "N/A"} withBorder={true} />
        </Box>
        {tmdbError && <Text color="red.400" fontSize="xs" mt={1} textAlign={{ base: "center", xl: "left" }}>{tmdbError}</Text>}

        {/* Các tag category KHÔNG có viền trắng */}
        <Box className="flex flex-wrap gap-2 items-center mt-1 justify-center xl:justify-start">
          {displayData?.category?.map((category, index) => (
            <TagClassic
              key={index}
              text={category?.name ?? "Không xác định"}
              isRedirect
              href={`/detail/the-loai/${category?.slug}`}
              withBorder={false} // Không có viền trắng
            />
          ))}
        </Box>
      </Box>

      <Box className="flex flex-col gap-4 mt-3">
        <Box className="flex flex-col text-sm gap-2">
          <span className="text-gray-50 font-semibold">Giới thiệu:</span>
          {/* Tăng maxLength từ 240 lên 480 (gấp đôi) */}
          <ShowMoreText text={displayData?.content ?? "Không có nội dung."} maxLength={480} />
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Đạo diễn:
          </span>
          <span className="text-gray-400">
            {displayData?.director && Array.isArray(displayData.director) && displayData.director.length > 0
              ? displayData.director.join(", ")
              : "Không có thông tin"}
          </span>
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Quốc gia:
          </span>
          <ul className="flex flex-wrap gap-x-2 gap-y-1">
            {displayData?.country?.map((country, index) => (
              <li
                key={index}
                className="text-gray-400 hover:text-[#ffd875] transition-all"
              >
                <Link href={`/detail/quoc-gia/${country?.slug}`}>
                  {country?.name}
                </Link>
                {index < (displayData.country?.length ?? 0) - 1 && (
                  <span className="ml-0.5">, </span>
                )}
              </li>
            ))}
            {(!displayData?.country || displayData.country.length === 0) && (
              <li className="text-gray-400">Không có thông tin</li>
            )}
          </ul>
        </Box>
        <Box className="flex text-sm gap-2">
          <span className="text-gray-50 font-semibold whitespace-nowrap">
            Diễn viên:
          </span>
          <span className="text-gray-400">
            {displayData?.actor && Array.isArray(displayData.actor) && displayData.actor.length > 0
              ? displayData.actor.join(", ")
              : "Không có thông tin"}
          </span>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetail;
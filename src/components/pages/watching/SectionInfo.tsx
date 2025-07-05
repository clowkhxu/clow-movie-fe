"use client";

import { TagClassic } from "@/components/movie/TagClassic";
import ShowMoreText from "@/components/ShowMoreText";
import { formatStringForURL, generateUrlImageResponsive } from "@/lib/utils";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

interface SectionInfoProps {
  data: any;
}

const SectionInfo = ({ data }: SectionInfoProps) => {
  const [image, setImage] = useState<string>("/images/placeholder.jpg");

  return (
    <Box className="flex-1">
      <Box className="flex flex-col gap-6">
        <Box className="flex gap-4">
          <Box className="flex-shrink-0 w-28 sm:block hidden">
            <Box className="h-0 pt-[150%] relative">
              <Image
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = "/images/notfound.png";
                }}
                src={image}
                onLoad={() =>
                  setImage(() => generateUrlImageResponsive(data?.poster_url, 'poster'))
                }
                alt={data?.name ?? "Không xác định"}
                objectFit="cover"
                className="border border-gray-800 h-full rounded-xl w-full absolute group-hover:brightness-75 inset-0 transition-all"
                loading="lazy"
              />
            </Box>
          </Box>
          <Box className="flex flex-col gap-2">
            <h4 className="lg:text-2xl truncate-lines three text-lg text-gray-50 font-semibold">
              {data?.name ?? "Không xác định"}
            </h4>
            <p className="text-[#ffd875] text-sm">
              {data?.origin_name ?? "Không xác định"}
            </p>
            <Box className="flex flex-wrap gap-2 items-center">
              <span className="bg-transparent border border-[#ffd875] h-6 justify-center p-1 rounded-md inline-flex items-center">
                <span className="text-[#ffd875] text-xs">TMDb</span>
                <span className="text-gray-50 text-sm ml-1">
                  {data?.tmdb?.vote_average ?? "Không xác định"}
                </span>
              </span>
              {/* Thêm withBorder={true} cho các tag cụ thể */}
              <TagClassic text={data?.quality ?? "Không xác định"} withBorder={true} />
              <TagClassic text={data?.year ?? "Không xác định"} withBorder={true} />
              <TagClassic text={data?.lang ?? "Không xác định"} withBorder={true} />
              <TagClassic text={data?.time ?? "Không xác định"} withBorder={true} />
              <TagClassic text={data?.episode_current ?? "Không xác định"} withBorder={true} />
            </Box>
            {/* Các tag category KHÔNG có viền trắng */}
            <Box className="flex flex-wrap gap-2 items-center mt-1">
              {data?.category?.map((category: any, index: number) => (
                <TagClassic
                  key={index}
                  text={category?.name ?? "Không xác định"}
                  isRedirect
                  href={`/detail/the-loai/${category?.slug}`}
                  withBorder={false}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box>
          <ShowMoreText text={data?.content} maxLength={260} />
          <Link
            className="text-[#ffd875] mt-4 text-sm gap-1 hover:underline inline-flex items-center"
            href={`/info/${data?.slug}?name=${formatStringForURL(
              data?.name,
              "-"
            )}`}
          >
            Thông tin phim
            <FaArrowRight />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SectionInfo;
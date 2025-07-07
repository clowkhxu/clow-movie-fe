"use client";

import { createPortal } from "react-dom";
import "@/assets/css/animation.css";
import { Box, Image } from "@chakra-ui/react";
import { generateUrlImageResponsive } from "@/lib/utils";
import { TagClassic } from "../TagClassic";
import MovieActionsButton from "./MovieActionsButton";
import { useState } from "react";

interface MovieTooltipProps {
  data: any;
  position: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
}

const MovieTooltip = ({ data, position }: MovieTooltipProps) => {
  const [image, setImage] = useState<string>("/images/placeholder.jpg");

  return createPortal(
    <div
      style={{
        top: position.top,
        left: position.left,
        width: "420px",
        minHeight: position.height,
      }}
      className="bg-[#2f3346] rounded-lg shadow-lg text-white absolute overflow-hidden tooltip-animation z-50"
    >
      <div className="relative">
        <Image
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/images/notfound.png";
          }}
          src={image}
          onLoad={() => setImage(() => generateUrlImageResponsive(data?.thumb_url, 'thumb'))}
          alt={data?.name}
          className="h-52 w-full object-cover"
        />
        <div className="bg-gradient-to-t h-1/2 absolute bottom-0 from-[#2f3346] inset-x-0 to-transparent"></div>
      </div>

      <Box className="bg-[#2f3346] h-full p-4">
        <h4 className="text-lg">{data?.name ?? "Không xác định"}</h4>
        <p className="text-[#ffd875] text-sm">
          {data?.origin_name ?? "Không xác định"}
        </p>
        <Box className="flex gap-2 items-center mb-4 mt-2">
          <MovieActionsButton slug={data?.slug} />
        </Box>
        <Box className="flex flex-wrap gap-2 items-center">
          <TagClassic text={data?.quality ?? "Không xác định"} />
          <TagClassic text={data?.year ?? "Không xác định"} />
          <TagClassic text={data?.lang ?? "Không xác định"} />
          <TagClassic text={data?.time ?? "Không xác định"} />
          <TagClassic text={data?.episode_current ?? "Không xác định"} />
        </Box>
        <Box className="flex flex-wrap gap-2 items-center mt-3">
          {data?.category?.map((category: any, index: number) => (
            <TagClassic
              key={index}
              text={category?.name ?? "Không xác định"}
              isRedirect
              href={`/detail/the-loai/${category?.slug}`}
            />
          ))}
        </Box>
      </Box>
    </div>,
    document.body
  );
};

export default MovieTooltip;

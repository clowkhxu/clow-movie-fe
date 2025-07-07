"use client";

import { TagClassic } from "@/components/movie/TagClassic";
import { generateUrlImageForSearch } from "@/lib/utils";
import { setIsShowModalSearch } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface SearchPreviewItemProps {
  item: any;
}

const SearchPreviewItem = ({ item }: SearchPreviewItemProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [image, setImage] = useState("/images/placeholder.jpg");

  return (
    <li onClick={() => dispatch(setIsShowModalSearch(false))}>
      <Link href={`/info/${item?.slug}`} className="block">
        <Box className="flex gap-4 p-2 rounded-lg hover:bg-[#ffffff05] transition-all">
          <Box className="w-20 h-28 flex-shrink-0">
            <Image
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/images/notfound.png";
              }}
              src={image}
              onLoad={() => setImage(() => generateUrlImageForSearch(item?.poster_url))}
              objectFit="cover"
              className="w-full h-full rounded-md border border-[#ffffff10]"
              loading="lazy"
            />
          </Box>
          <Box className="flex-1 overflow-hidden">
            <h3 
              className="text-md text-gray-50 truncate"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {item?.name ?? "Không xác định"}
            </h3>
            <p 
              className="text-md truncate mt-1" 
              style={{ 
                color: "#aaa",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {item?.origin_name ?? "Không xác định"}
            </p>
            <Box className="flex flex-wrap gap-2 items-center mt-2">
              <TagClassic text={item?.quality} />
              <TagClassic text={item?.lang} />
              <TagClassic text={item?.year} />
              <TagClassic text={item?.time} />
              <TagClassic text={item?.episode_current} />
            </Box>
          </Box>
        </Box>
      </Link>
    </li>
  );
};

export default SearchPreviewItem;
"use client";

import { formatDate, formatStringForURL, generateUrlImageResponsive } from "@/lib/utils";
import { Box, IconButton, Image as ImageCharka } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface MovieItemProps {
  item: any; // Nên định nghĩa kiểu cụ thể hơn cho item nếu có thể
  isLoading: boolean; // Prop này được truyền vào component
  callback: (slug: string, id: string) => void;
}

// Hàm trợ giúp để lấy một URL ngẫu nhiên từ chuỗi URL (nếu có nhiều)
// hoặc URL duy nhất, hoặc undefined nếu không có URL hợp lệ.
const getRandomPosterUrlFromString = (urlString?: string): string | undefined => {
  if (!urlString || typeof urlString !== 'string') {
    return undefined;
  }
  const urls = urlString.split(',')
    .map(u => u.trim())
    .filter(u => u);
  if (urls.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * urls.length);
  return urls[randomIndex];
};

const MovieItem = ({ item, isLoading, callback }: MovieItemProps) => {
  // State để lưu trữ URL hình ảnh sẽ được hiển thị, khởi tạo với placeholder
  const [displayImageSrc, setDisplayImageSrc] = useState<string>("/images/placeholder.jpg");

  useEffect(() => {
    const randomUrlCandidate = getRandomPosterUrlFromString(item?.movie_poster);

    if (randomUrlCandidate) {
      const finalGeneratedUrl = generateUrlImageResponsive(randomUrlCandidate, 'poster');
      const img = new window.Image();
      img.src = finalGeneratedUrl;
      img.onload = () => {
        setDisplayImageSrc(finalGeneratedUrl);
      };
      img.onerror = () => {
        setDisplayImageSrc("/images/notfound.png");
      };
    } else {
      setDisplayImageSrc("/images/placeholder.jpg");
    }
  }, [item?.movie_poster]);

  return (
    <Box className="group">
      <Box className="relative">
        <Link
          href={`/info/${item?.movie_slug}?name=${formatStringForURL(
            item?.movie_name ?? "Không xác định",
            "-"
          )}`}
          className="flex flex-col gap-4 group"
        >
          <Box className="h-0 rounded-xl overflow-hidden pb-[150%] relative">
            <ImageCharka
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "/images/notfound.png";
              }}
              src={displayImageSrc}
              alt={item?.movie_name ?? "Không xác định"}
              objectFit="cover"
              className="border border-gray-800 h-full rounded-xl w-full absolute group-hover:brightness-75 inset-0 transition-all"
              loading="lazy"
            />
          </Box>
        </Link>
        <span className="lg:text-xs lg:max-w-24 max-w-20 truncate text-[10px] rounded-sm bg-[#25272f] text-gray-50 lg:px-1 lg:py-0.5 px-1 py-0 absolute left-2 top-2">
          {formatDate(item?.created_at)}
        </span>
        <IconButton
          size="xs"
          // Sửa lỗi: Sử dụng prop 'loading' của Chakra UI IconButton
          // thay vì 'isLoading'
          loading={isLoading}
          onClick={() => callback(item?.movie_slug, item?.id)}
          aria-label="Xóa"
          className="absolute right-2 bottom-2 bg-gray-50 text-gray-900 lg:w-8 lg:min-w-8 lg:h-8 min-w-6 w-6 h-6"
        >
          <MdDelete />
        </IconButton>
      </Box>
      <Link
        href={`/info/${item?.movie_slug}?name=${formatStringForURL(
          item?.movie_name ?? "Không xác định",
          "-"
        )}`}
        className="flex flex-col gap-1 mt-4"
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
          className="text-gray-50 group-hover:text-[#ffd875] lg:text-sm text-[13px] transition-all"
        >
          {item?.movie_name}
        </span>
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            color: "#aaa"
          }}
          className="transition-all lg:text-sm text-[13px]"
        >
          {item?.movie_origin_name ?? "Không xác định"}
        </span>
      </Link>
    </Box>
  );
};

export default MovieItem;
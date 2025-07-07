"use client";

import SkeletonMovieThumbTitle from "@/components/skeletons/SkeletonMovieThumbTitle";
import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { RiArrowRightWideLine } from "react-icons/ri";

interface MovieThumbTitleProps {
  loading: boolean;
  href: string;
  title: string;
  error: boolean;
}

// Định nghĩa các lớp CSS Tailwind cho các kiểu tiêu đề
const roseGradientClasses =
  "lg:text-2xl md:text-xl text-md inline-block bg-clip-text text-transparent bg-gradient-to-r from-rose-200 to-white font-bold lg:mb-0 mb-2";
const fuchsiaGradientClasses =
  "lg:text-2xl md:text-xl text-md inline-block bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-200 to-white font-bold lg:mb-0 mb-2";
const skyGradientClasses =
  "lg:text-2xl md:text-xl text-md inline-block bg-clip-text text-transparent bg-gradient-to-r from-sky-200 to-white font-bold lg:mb-0 mb-2";

// Lớp CSS cho "Phim Trung Quốc mới"
// background: linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(247, 161, 11) 130%)
const chinaMovieClasses =
  "lg:text-2xl md:text-xl text-md inline-block bg-clip-text text-transparent font-bold lg:mb-0 mb-2 bg-[linear-gradient(235deg,rgb(255,255,255)_30%,rgb(247,161,11)_130%)]";

// Lớp CSS cho "Tuyệt tác Âu - Mỹ"
// background: linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(255, 0, 153) 130%)
const euAmericaMovieClasses =
  "lg:text-2xl md:text-xl text-md inline-block bg-clip-text text-transparent font-bold lg:mb-0 mb-2 bg-[linear-gradient(235deg,rgb(255,255,255)_30%,rgb(255,0,153)_130%)]";

// Lớp CSS gốc ban đầu (nếu cần tham khảo hoặc quay lại)
// const originalDefaultClasses = "lg:text-2xl md:text-xl text-md font-bold inline-block text-gray-50";

const MovieThumbTitle = ({
  loading,
  href,
  title,
  error,
}: MovieThumbTitleProps) => {
  if (loading) return <SkeletonMovieThumbTitle />;
  if (error) return null;

  let titleClassName = roseGradientClasses; // Mặc định sử dụng rose gradient

  // Áp dụng các lớp CSS cụ thể dựa trên giá trị của 'title'
  if (title === "Phim Hàn Quốc mới") {
    titleClassName = fuchsiaGradientClasses;
  } else if (title === "Cổ trang kinh điển") {
    titleClassName = skyGradientClasses;
  } else if (title === "Phim Trung Quốc mới") {
    titleClassName = chinaMovieClasses;
  } else if (title === "Phim US-UK mới") {
    titleClassName = euAmericaMovieClasses;
  }
  // Bạn có thể thêm các điều kiện 'else if' khác ở đây cho các tiêu đề cụ thể khác
  // Ví dụ:
  // else if (title === "Hành động đỉnh cao") {
  //   titleClassName = anotherSpecificGradientClass;
  // }

  return (
    <Box className="flex justify-between gap-2 items-center mb-6">
      <h3 className={titleClassName}> {/* Áp dụng lớp CSS đã chọn */}
        {title}
      </h3>
      <Link
        href={href}
        className="flex text-gray-50 text-sm gap-1 hover:text-[#ffd875] hover:translate-x-0.5 items-center lg:text-md transition-all"
      >
        Xem tất cả
        <RiArrowRightWideLine />
      </Link>
    </Box>
  );
};

export default MovieThumbTitle;

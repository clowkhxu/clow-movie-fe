"use client";

import SkeletonSearchPreview from "@/components/skeletons/SkeletonSearchPreview";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import EmptyData from "../../EmptyData";
import { setIsShowModalSearch } from "@/store/slices/systemSlice";
import SearchPreviewItem from "./SearchPreviewItem";
import { FaArrowRight } from "react-icons/fa6";

interface SearchPreviewProps {
  keyword: string;
}

const SearchPreview = ({ keyword }: SearchPreviewProps) => {
  const { items, loading } = useSelector(
    (state: RootState) => state.movie.searchMoviePreview
  );
  const dispatch: AppDispatch = useDispatch();

  if (keyword?.trim() === "") return null;
  if (loading) return <SkeletonSearchPreview />;
  if (items?.length === 0 && !loading)
    return (
      <EmptyData
        title="Không tìm thấy kết quả"
        description="Hãy thử lại với từ khóa khác"
      />
    );

  return (
    <Box className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {items?.map((item: any, index: number) => (
          <SearchPreviewItem key={index} item={item} />
        ))}
      </ul>

      <Link
        href={`/search?keyword=${encodeURIComponent(keyword)}`}
        className="w-full flex items-center gap-2 mt-3 "
      >
        <Button
          onClick={() => dispatch(setIsShowModalSearch(false))}
          size="sm"
          className="w-full rounded-xl bg-[#ffd875] hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] text-gray-900"
        >
          Xem tất cả
          <FaArrowRight />
        </Button>
      </Link>
    </Box>
  );
};

export default SearchPreview;

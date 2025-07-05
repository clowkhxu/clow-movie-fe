"use client";

import { PaginationItems, PaginationRoot } from "@/components/ui/pagination";
import { Box, HStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { handleShowToaster } from "@/lib/utils";

interface PaginationProps {
  pagination: {
    totalItems: number | string;
    totalItemsPerPage: number | string;
  };
  currentPage: string | number;
  showToaster?: boolean;
  ref?: any;
}

const Pagination = ({
  pagination,
  currentPage,
  ref,
  showToaster = true,
}: PaginationProps) => {
  const { totalItems, totalItemsPerPage } = pagination;
  const router = useRouter();

  const handleChangePage = (page: number | string) => {
    const params = new URLSearchParams(window.location.search);

    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Cuộn lướt đến vị trí ref nếu có
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }

    if (showToaster) {
      handleShowToaster(`Trang ${page}`, "Chúc bạn xem phim vui vẻ!");
    }
  };

  return (
    <Box className="flex mx-auto mt-12">
      <PaginationRoot
        size={{
          base: "xs",
          md: "sm",
          lg: "md",
        }}
        count={Number(totalItems)}
        pageSize={Number(totalItemsPerPage)}
        page={Number(currentPage)}
        siblingCount={1}
        variant="solid"
        onPageChange={(details) => handleChangePage(details.page)}
      >
        <HStack>
          <PaginationItems className="bg-[#2a314e] border-transparent text-gray-50" />
        </HStack>
      </PaginationRoot>
    </Box>
  );
};

export default Pagination;

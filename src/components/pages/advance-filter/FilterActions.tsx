"use client";

import Refreshicon from "@/components/icons/RefresIcon";
import { Tooltip } from "@/components/ui/tooltip";
import { Box, Button, IconButton } from "@chakra-ui/react";
interface FilterActionsProps {
  loading: boolean;
  handleSearch: () => void;
  handleResetFilter: () => void;
}

const FilterActions = ({
  loading,
  handleSearch,
  handleResetFilter,
}: FilterActionsProps) => {
  

  return (
    <Box className="flex gap-4">
      <Button
        loading={loading}
        onClick={() => handleSearch()}
        rounded="full"
        size="sm"
        className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffda7d] text-[#1e2939] "
      >
        Lọc kết quả
      </Button>
      <Tooltip
        content="Làm mới bộ lọc"
        showArrow
        contentProps={{ css: { "--tooltip-bg": "#282b3a" } }}
      >
        <IconButton
          onClick={handleResetFilter}
          rounded="full"
          className="bg-gray-50 text-gray-900 hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)]"
          size="sm"
        >
          <Refreshicon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FilterActions;

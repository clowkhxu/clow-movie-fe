"use client";

import { filterOptions } from "@/lib/defines/data";
import { updateSearchParams } from "@/lib/utils";
import { fetchDataMovieSearch } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useDispatch } from "react-redux";
import FilterItem from "./FilterItem";
import FilterActions from "./FilterActions";
import _ from "lodash";

const options = {
  charactor: "a",
  country: "",
  category: "",
  year: "",
  sort_lang: "",
  sort_type: "desc",
};

const FilterBox = () => {
  const dispatch: AppDispatch = useDispatch();
  const [filter, setFilter] = useState<any>(options);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const objSearchParams = {
    charactor: searchParams.get("keyword") || "a",
    country: searchParams.get("country") || "",
    category: searchParams.get("category") || "",
    year: searchParams.get("year") || "",
    sort_lang: searchParams.get("sort_lang") || "",
    sort_type: searchParams.get("sort_type") || "desc",
  };

  const handleSetFilter = (key: string, value: any) => {
    setFilter((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleResetFilter = () => {
    setFilter(options);
  };

  const handleSearch = () => {
    // Chỉ gọi API khi có sự thay đổi trong filter
    const notChange = _.isEqual(filter, objSearchParams);

    if (!notChange) {
      // Làm mới page về 1 khi có sự thay đổi trong filter
      const params = new URLSearchParams(window.location.search);
      params.delete("page");

      startTransition(async () => {
        const response = await dispatch(
          fetchDataMovieSearch({
            ...filter,
            keyword: filter.charactor,
            page: 1,
          })
        );
      });

      const newQuery = updateSearchParams({ page: 1, ...filter });

      router.replace(`?${newQuery}`);
    }
  };

  return (
    <Box className="flex flex-col border border-[#ffffff10] rounded-2xl my-12">
      <>
        {filterOptions.map((option) => (
          <Box
            key={option.id}
            className="flex lg:gap-6 gap-4 items-start p-4 border-b border-[#ffffff10]"
          >
            <span className="lg:text-sm text-xs text-end lg:min-w-32 min-w-20 text-gray-50 font-semibold">
              {`${option.title}:`}
            </span>
            <FilterItem
              option={option}
              handleSetFilter={handleSetFilter}
              filter={filter}
            />
          </Box>
        ))}
      </>
      <Box className="flex gap-6 items-start p-4">
        <span className=" min-w-32 md:inline-block hidden">&nbsp;</span>
        <FilterActions
          loading={isPending}
          handleSearch={handleSearch}
          handleResetFilter={handleResetFilter}
        />
      </Box>
    </Box>
  );
};

export default FilterBox;

"use client";

import SearchIcon from "@/components/icons/SearchIcon";
import { InputGroup } from "@/components/ui/input-group";
import { fetchDataMoviePreview } from "@/store/asyncThunks/movieAsyncThunk";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Dialog, Input, Kbd, Portal } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchPreview from "./SearchPreview";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import SearchHistory from "./SearchHistory";
import { createUserSearchHistory } from "@/store/asyncThunks/userAsyncThunk";
import { useSession } from "next-auth/react";
import { IoSearch } from "react-icons/io5";
import { setIsShowModalSearch } from "@/store/slices/systemSlice";
import { handleShowToaster } from "@/lib/utils";

const SearchDialog = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { data: sesstion }: any = useSession();
  const { isShowModalSearch } = useSelector((state: RootState) => state.system);
  const [keyword, setKeyword] = useState("");

  const fetchData = useCallback(
    _.debounce((searchTerm: string) => {
      if (searchTerm.trim()) {
        dispatch(fetchDataMoviePreview({ keyword: searchTerm, limit: 10 }));
      }
    }, 500),
    [dispatch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    fetchData(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (keyword.trim() === "") {
        handleShowToaster("Thông báo", "Bạn muốn tìm gì thế?");
        return;
      }

      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);

      setKeyword("");
      dispatch(setIsShowModalSearch(false));

      if (sesstion) {
        dispatch(
          createUserSearchHistory({
            userId: sesstion.user?.id as string,
            keyword: keyword as string,
            accessToken: sesstion.user?.accessToken as string,
          })
        );
      }
    }
  };

  return (
    <Dialog.Root
      scrollBehavior="inside"
      open={isShowModalSearch}
      onOpenChange={({ open }) => dispatch(setIsShowModalSearch(open))}
    >
      <Dialog.Trigger asChild>
        <Button
          className="2xl:min-w-60 lg:min-w-48 text-gray-50 lg:bg-[#ffffff2f] bg-transparent rounded-md"
          size="sm"
        >
          <IoSearch />
          <span className="flex-1 text-left ml-1 lg:block hidden">
            Tìm kiếm phim ...
          </span>
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            padding={1}
            className="bg-[#0f111af2] text-gray-50 border border-[#ffffff10] rounded-2xl backdrop-blur mx-4 lg:max-w-[560px] md:max-w-[520px] max-w-[420px]"
          >
            <Dialog.Header p={1}>
              <Dialog.Title>
                <InputGroup
                  startElement={<SearchIcon />}
                  endElement={<Kbd>Enter</Kbd>}
                  className="w-full"
                >
                  <Input
                    onKeyDown={(e) => handleKeyDown(e)}
                    value={keyword}
                    onChange={(e) => handleSearch(e)}
                    css={{
                      "&:focus-visible": {
                        outline: "none",
                      },
                    }}
                    className="font-normal text-gray-50 rounded-xl truncate bg-transparent border border-[#ffffff10] focus:border-gray-400"
                    placeholder="Nhập tên phim cần tìm..."
                  />
                </InputGroup>
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body p={1}>
              <Box className="mt-4">
                <SearchPreview keyword={keyword} />
                <SearchHistory keyword={keyword} />
              </Box>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SearchDialog;

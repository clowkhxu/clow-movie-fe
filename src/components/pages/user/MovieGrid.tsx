"use client";

import EmptyData from "@/components/EmptyData";
import { deleteMovie } from "@/lib/actions/userMovieAction";
import { RootState } from "@/store/store";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import { useSession } from "next-auth/react";
import { handleShowToaster } from "@/lib/utils";

interface MovieGridProps {
  items: any;
  userId: string;
  type: "favorite" | "playlist" | "history";
  colums?: {
    base: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
  };
}

const MovieGrid = ({ items, colums, userId, type }: MovieGridProps) => {
  const [slug, setSlug] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedPlaylistId } = useSelector((state: RootState) => state.user);
  const pathname = usePathname();
  const { data: session }: any = useSession();

  const updatePageAndRefresh = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`?${params.toString()}`);
    router.refresh();
  };

  useEffect(() => {
    const currentPage = Number(searchParams.get("page")) || 1;

    if ((!items || items.length === 0) && currentPage > 1) {
      updatePageAndRefresh(currentPage - 1);
    }
  }, [items, searchParams]);

  const handleDeleteMovie = async (slug: string, id: string) => {
    setSlug(slug);
    const response = await deleteMovie({
      userId,
      movieSlug: slug,
      type,
      playlistId: pathname === "/user/playlist" ? selectedPlaylistId : null,
      movieId: type === "history" ? id : null,
      accessToken: session?.user?.accessToken,
    });
    setSlug("");

    if (response?.status) {
      router.refresh();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  if (!items || items?.length === 0) {
    return (
      <Box className="flex h-64 justify-center w-full items-center">
        <EmptyData title="Danh sách phim trống" />
      </Box>
    );
  }

  return (
    <SimpleGrid
      columns={colums || { base: 2, md: 3, lg: 5, xl: 6, "2xl": 8 }}
      gap={{
        base: 4, // Tăng từ 2 lên 4 (16px) cho mobile
        md: 5,   // Tăng từ 3 lên 5 (20px) cho tablet
        lg: 6,   // Tăng từ 4 lên 6 (24px) cho desktop
      }}
    >
      {items?.map((item: any, index: number) => (
        <MovieItem
          key={index}
          item={item}
          callback={handleDeleteMovie}
          isLoading={slug === item.slug}
        />
      ))}
    </SimpleGrid>
  );
};

export default MovieGrid;
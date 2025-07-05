"use client";

import {
  addNewMovie,
  checkMovieExists,
  deleteMovie,
} from "@/lib/actions/userMovieAction";
import { handleShowToaster } from "@/lib/utils";
import { RootState } from "@/store/store";
import { Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState, useTransition } from "react";
import { IoMdHeart, IoMdHeartDislike } from "react-icons/io";
import { useSelector } from "react-redux";

interface FavoriteButtonProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const FavoriteButton = ({
  placement = "horizontal",
  responsiveText = false,
}: FavoriteButtonProps) => {
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const [favorite, setFavorite] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { data: sesstion }: any = useSession();

  useEffect(() => {
    if (sesstion && movie) {
      startTransition(handleCheckMovieExists);
    }
  }, []);

  const handleCheckMovieExists = async () => {
    const response = await checkMovieExists({
      userId: sesstion?.user?.id as string,
      movieSlug: movie?.slug,
      type: "favorite",
      accessToken: sesstion?.user?.accessToken,
    });

    setFavorite(response?.result?.exists ?? false);
  };

  const handleAddNewMovie = async () => {
    const response = await addNewMovie({
      userId: sesstion.user?.id as string,
      movieData: {
        movieName: movie?.name,
        movieSlug: movie?.slug,
        moviePoster: movie?.poster_url,
        movieThumbnail: movie?.thumb_url,
      },
      type: "favorite",
      accessToken: sesstion?.user?.accessToken,
    });

    return response;
  };

  const handleDeleteMovie = async () => {
    const response = await deleteMovie({
      userId: sesstion.user?.id as string,
      movieSlug: movie?.slug,
      type: "favorite",
      accessToken: sesstion?.user?.accessToken,
    });

    return response;
  };

  const handleActionsFavorite = () => {
    if (!sesstion) {
      handleShowToaster(
        "Thông báo",
        "Vui lòng đăng nhập để thực hiện hành động này.",
        "error"
      );

      return;
    }

    let response: any = null;

    startTransition(async () => {
      if (!favorite) {
        response = await handleAddNewMovie();
      } else {
        response = await handleDeleteMovie();
      }

      if (response?.status) {
        handleCheckMovieExists();
      }

      handleShowToaster(
        "Thông báo",
        response?.message,
        response?.status ? "success" : "error"
      );
    });
  };

  return (
    <Box
      onClick={handleActionsFavorite}
      className={`p-2 select-none sm:min-w-16 cursor-pointer rounded-lg flex justify-center items-center gap-2 transition-all hover:bg-[#ffffff05] 
          ${placement === "vertical" ? "flex-col" : "flex-row"}
          ${isPending ? "opacity-50" : ""}
          ${favorite ? "text-[#ffd875]" : "text-gray-50"}
        `}
    >
      {isPending ? (
        <Spinner />
      ) : favorite ? (
        <IoMdHeartDislike />
      ) : (
        <IoMdHeart />
      )}
      <span
        className={`text-xs whitespace-nowrap ${
          !responsiveText ? "block" : "hidden xs:block"
        }`}
      >
        {favorite ? "Bỏ yêu thích" : "Yêu thích"}
      </span>
    </Box>
  );
};

export default FavoriteButton;

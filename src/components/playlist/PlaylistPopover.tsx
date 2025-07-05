"use client";

import ActionsPlaylist from "@/components/playlist/ActionsPlaylist";
import {
  getPlaylists,
  getPlaylistsContainingMovie,
} from "@/lib/actions/playlistAction";
import { addNewMovie, deleteMovie } from "@/lib/actions/userMovieAction";
import { RootState } from "@/store/store";
import { Box, Button, Popover, Portal } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { handleShowToaster } from "@/lib/utils";
import CheckboxPlaylist from "@/components/playlist/CheckBoxPlaylist";
import PlaylistButton from "@/components/movie/controls/PlaylistButton";

interface PlaylistPopoverProps {
  placement?: "vertical" | "horizontal";
  responsiveText?: boolean;
}

const PlaylistPopover = ({
  placement = "horizontal",
  responsiveText = false,
}: PlaylistPopoverProps) => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const [playlistIds, setPlaylistIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const { data: session }: any = useSession();
  const params = useParams();

  useEffect(() => {
    if (!session?.user?.id) return;

    handleGetPlaylist();
  }, []);

  useEffect(() => {
    if (!session?.user?.id) return;

    handleGetPlaylistIds();
  }, [params.slug]);

  const handleGetPlaylist = async () => {
    const response = await getPlaylists({
      userId: session?.user?.id as string,
      accessToken: session?.user?.accessToken,
    });

    const { playlists } = response?.result || {};

    setPlaylists(playlists);
  };

  const handleGetPlaylistIds = async () => {
    const response = await getPlaylistsContainingMovie({
      userId: session?.user?.id as string,
      movieSlug: (params?.slug as string) || "",
      accessToken: session?.user?.accessToken,
    });

    const { playlistIds } = response?.result || { playlistIds: [] };

    setPlaylistIds(playlistIds);
  };

  const handleAddNewMovieFromPlaylist = async (playlistId: string) => {
    const response = await addNewMovie({
      userId: session?.user?.id as string,
      type: "playlist",
      movieData: {
        movieSlug: movie.slug,
        movieName: movie.name,
        movieThumbnail: movie.thumb_url,
        moviePoster: movie.poster_url,
      },
      playlistId,
      accessToken: session?.user?.accessToken,
    });

    return response;
  };

  const handleDeleteMovieFromPlaylist = async (playlistId: string) => {
    const response = await deleteMovie({
      userId: session?.user?.id as string,
      movieSlug: movie?.slug,
      type: "playlist",
      playlistId,
      accessToken: session?.user?.accessToken,
    });

    return response;
  };

  const handleActionsPlaylist = (value: string, checked: boolean) => {
    let response: any = null;

    startTransition(async () => {
      if (checked) {
        response = await handleAddNewMovieFromPlaylist(value);
      } else {
        response = await handleDeleteMovieFromPlaylist(value);
      }

      if (response?.status) {
        handleGetPlaylistIds();
      }

      handleShowToaster(
        "Thông báo",
        response?.message,
        response?.status ? "success" : "error"
      );
    });
  };

  const handleNotSession = () => {
    handleShowToaster(
      "Thông báo",
      "Vui lòng đăng nhập để sử dụng tính năng này",
      "error"
    );
  };

  if (!session) {
    return (
      <PlaylistButton
        placement={placement}
        responsiveText={responsiveText}
        callback={handleNotSession}
      />
    );
  }

  return (
    <Popover.Root autoFocus={false}>
      <Popover.Trigger asChild>
        <Box>
          <PlaylistButton
            placement={placement}
            responsiveText={responsiveText}
          />
        </Box>
      </Popover.Trigger>

      <Portal>
        <Popover.Positioner
          css={{
            zIndex: "123 !important",
          }}
        >
          <Popover.Arrow />
          <Popover.Content className="p-4 max-w-[260px] rounded-lg bg-[#2a314e] text-gray-50">
            {!playlists || playlists.length === 0 ? (
              <p className="text-sm text-gray-300 mb-3">
                Tạo danh sách phát để lưu trữ và quản lý những bộ phim bạn yêu
                thích.
              </p>
            ) : (
              <Box className="mb-4 flex flex-col gap-4">
                {playlists?.map((playlist, index) => (
                  <CheckboxPlaylist
                    key={index}
                    playlist={playlist}
                    playlistIds={playlistIds}
                    callback={handleActionsPlaylist}
                  />
                ))}
              </Box>
            )}

            <ActionsPlaylist action="create" callback={handleGetPlaylist}>
              <Button
                size="sm"
                className="bg-[#ffd875] text-gray-900 text-sm hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)]"
              >
                <FaPlus />
                Thêm mới
              </Button>
            </ActionsPlaylist>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PlaylistPopover;

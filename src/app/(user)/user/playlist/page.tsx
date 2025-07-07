import Loading from "@/app/loading";
import { auth } from "@/auth";
import MovieSection from "@/components/pages/user/MovieSection";
import ActionsPlaylist from "@/components/playlist/ActionsPlaylist";
import Playlists from "@/components/playlist/Playlists";

import {
  getUserMoviesFromPlaylist,
  getUserPlaylists,
} from "@/lib/actions/userActionServer";
import { Box, Button } from "@chakra-ui/react";
import { Suspense } from "react";
import { FaPlus } from "react-icons/fa6";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Page = async ({ searchParams }: PageProps) => {
  const session: any = await auth();
  const userId = session?.user?.id as string;
  const params = await searchParams;
  const limit = 18;
  const currentPage = params?.page ? Number(params?.page) : 1;

  const [responsePlaylist, responseMovies] = await Promise.all([
    getUserPlaylists({ userId, accessToken: session?.user?.accessToken }),

    // kiểm tra xem có playlistId không, nếu có thì lấy danh sách phim trong playlist đó
    params?.playlistId
      ? getUserMoviesFromPlaylist({
          userId,
          playlistId: String(params.playlistId),
          page: currentPage,
          limit,
          accessToken: session?.user?.accessToken,
        })
      : null,
  ]);

  const { playlists } = responsePlaylist?.result || {};

  // nếu không có playlistId thì lấy playlist đầu tiên trong danh sách
  const playlistId = params?.playlistId
    ? String(params.playlistId)
    : playlists?.[0]?.id;

  const response =
    responseMovies ??
    (await getUserMoviesFromPlaylist({
      userId,
      playlistId,
      page: currentPage,
      limit,
      accessToken: session?.user?.accessToken,
    }));

  const { movies, totalItems, totalItemsPerPage } = response?.result || {};

  return (
    <>
      <Box className="flex gap-4 items-center mb-4">
        <h3 className="text-gray-50 text-lg">Danh sách</h3>
        <ActionsPlaylist action="create">
          <Button
            size="xs"
            rounded="full"
            className="text-xs text-gray-200 bg-transparent border border-gray-400 hover:bg-[#25272f] transition-all"
          >
            <FaPlus />
            Thêm mới
          </Button>
        </ActionsPlaylist>
      </Box>

      <Suspense fallback={<Loading height="h-1/6" />}>
        <Playlists playlists={playlists} />
      </Suspense>

      <Suspense fallback={<Loading height="h-1/2" />}>
        <MovieSection
          movies={movies}
          totalItems={totalItems}
          totalItemsPerPage={totalItemsPerPage}
          currentPage={currentPage}
          limit={limit}
          sesstion={session}
          type="playlist"
        />
      </Suspense>
    </>
  );
};

export default Page;

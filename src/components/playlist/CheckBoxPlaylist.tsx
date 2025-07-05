"use client";

import { Checkbox } from "../ui/checkbox";

interface CheckboxPlaylistProps {
  playlist: Playlist;
  playlistIds: string[];
  callback: (value: string, checked: boolean) => void;
}

const CheckboxPlaylist = ({
  playlist,
  playlistIds,
  callback,
}: CheckboxPlaylistProps) => {
  return (
    <Checkbox
      colorPalette="whiteAlpha"
      variant="subtle"
      className="flex items-center gap-2 cursor-pointer"
      checked={playlistIds?.includes(playlist.id)}
      onCheckedChange={(checked) => {
        callback(playlist.id, checked.checked === true);
      }}
    >
      {playlist.name}
    </Checkbox>
  );
};

export default CheckboxPlaylist;

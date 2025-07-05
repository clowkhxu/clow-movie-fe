"use client";

import { Avatar } from "@chakra-ui/react";

interface AvatarProps {
  name?: string;
  src?: string;
  onClick?: () => void;
}

const AvatarUser = ({ name, src, onClick }: AvatarProps) => {
  return (
    <Avatar.Root size="sm" onClick={onClick}>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={src} />
    </Avatar.Root>
  );
};

export default AvatarUser;

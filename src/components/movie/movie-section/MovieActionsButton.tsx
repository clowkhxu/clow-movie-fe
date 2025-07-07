"use client";

import InfoIcon from "@/components/icons/InfoIcon"; // Assuming this component renders the info icon
import PlayIcon from "@/components/icons/PlayIcon"; // Assuming this component renders the play icon
import { Button } from "@chakra-ui/react";
import Link from "next/link";

interface MovieActionsButtonProps {
  slug: string;
}

const MovieActionsButton = ({ slug }: MovieActionsButtonProps) => {
  return (
    <>
      <Link href={`/watching/${slug}`}>
        <Button
          size="sm"
          // Updated className for the "Xem ngay" button
          // Old: className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-[#ffd875] text-gray-900"
          // New: uses Tailwind CSS gradient. from-yellow-200 is a light yellow, to-[#ffd875] is the original button color.
          className="hover:shadow-[0_5px_10px_10px_rgba(255,218,125,.15)] bg-gradient-to-r from-yellow-200 to-[#ffd875] text-gray-900"
        // If you want this button to also be pill-shaped like the other one, add rounded="full"
        // rounded="full"
        >
          <PlayIcon /> {/* Renders the play icon */}
          Xem ngay {/* Text for the button */}
        </Button>
      </Link>
      <Link href={`/info/${slug}`}>
        <Button
          size="sm"
          colorPalette="gray" // It's usually colorScheme for Chakra UI, but your original code had colorPalette
          colorScheme={"gray"}
          variant="subtle"
        // If you want this button to also be pill-shaped, add rounded="full"
        // rounded="full"
        >
          <InfoIcon /> {/* Renders the info icon */}
          Chi tiết {/* Text for the button */}
        </Button>
      </Link>
    </>
  );
};

export default MovieActionsButton;
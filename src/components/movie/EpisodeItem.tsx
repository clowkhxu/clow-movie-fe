"use client";

import { formatTypeMovie, getIdFromLinkEmbed } from "@/lib/utils"; // Assuming this path is correct
import { Button, Text, Box } from "@chakra-ui/react"; // Box is already imported
import Link from "next/link";
import { useParams } from "next/navigation";
import { BsPlayFill } from "react-icons/bs";

// Re-defining Episode type here for clarity or import if exported elsewhere
type Episode = {
  name: string;
  slug: string;
  link_embed: string;
  link_m3u8: string;
  filename: string;
};

interface EpisodeItemProps {
  item: Episode;
  server_name: string;
  redirect?: boolean;
  handleSetCurrentEpisode: (item: Episode) => void;
  isActive: boolean;
}

const EpisodeItem = ({
  item,
  redirect,
  server_name,
  handleSetCurrentEpisode,
  isActive,
}: EpisodeItemProps) => {
  const params = useParams();

  // Safely access item properties
  const id = item ? getIdFromLinkEmbed(item.link_embed, 8) : "";
  const type = formatTypeMovie(server_name);
  const episodeSlug = item ? item.slug : "";
  const href = `/watching/${params?.slug}?id=${id}&episode=${episodeSlug}&type=${type}`;

  // Determine button text, ensuring it's always a string
  const buttonText = item?.name || item?.filename || "N/A";

  return (
    <Link
      href={redirect && item ? href : "#"}
      onClick={() => {
        if (item) {
          handleSetCurrentEpisode(item);
        }
      }}
      style={{ textDecoration: 'none', display: 'block', width: '100%' }} // Ensure Link takes full width for Button
    >
      <Button
        // size="md" // Chakra UI Button size prop - We are controlling height via className
        rounded="lg" // Keeps the rounded corners
        // UPDATED: Adjusted height for PC (lg screens) to be smaller, making it more rectangular.
        // Mobile height remains h-[56px]. PC height changed from lg:h-[64px] to lg:h-[48px].
        // Old: className={`w-full lg:h-[64px] h-[56px] shadow transition-all flex items-center justify-center gap-2 px-4`}
        className={`w-full lg:h-[48px] h-[56px] shadow transition-all flex items-center justify-center gap-2 px-4`} // PC height reduced, mobile height maintained
        bg={isActive ? "#ffd875" : "#282f40"} // Background color based on active state
        color={isActive ? "#282b3a" : "gray.50"} // Text color based on active state
        _hover={{
          color: isActive ? "#282b3a" : "#ffd875", // Text color on hover
        }}
        aria-pressed={isActive} // Accessibility attribute for pressed state
        title={buttonText} // Tooltip for the button
        overflow="hidden" // Ensures button content does not overflow
      >
        {/* Icon wrapper with flexShrink to prevent shrinking */}
        <Box flexShrink={0}>
          <BsPlayFill size="1em" /> {/* Icon size remains 1em */}
        </Box>
        {/* Text component for episode name/filename */}
        <Text
          as="span"
          fontSize="xs" // Font size for the text remains extra small
          overflow="hidden" // Clip overflowing text
          textOverflow="ellipsis" // Display "..." for clipped text
          whiteSpace="nowrap" // Prevent text from wrapping to the next line
          title={buttonText} // Tooltip for the full text
          textAlign="left" // Align text to the left, closer to the icon
        >
          {buttonText}
        </Text>
      </Button>
    </Link>
  );
};

export default EpisodeItem;
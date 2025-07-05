"use client";

import { Box, Image } from "@chakra-ui/react";
import Link from "next/link";
import { RootState } from "@/store/store"; // Assuming this path is correct
import { useSelector } from "react-redux";
import { TagClassic } from "../TagClassic"; // Assuming this path is correct
import MovieActionsButton from "../movie-section/MovieActionsButton"; // Assuming this path is correct
import { useState } from "react";
import "@/assets/css/movie.css"; // Assuming this path is correct
import { generateUrlImageResponsive } from "@/lib/utils";

const SlideItem = ({ item }: any) => {
  const { windowWidth } = useSelector((state: RootState) => state.system);
  const href = windowWidth > 1024 ? "#" : `/info/${item?.slug}`;
  const [image, setImage] = useState<string>("/images/placeholder.jpg");

  return (
    <Box className="relative">
      {/* Container for Image and Overlays (Dotted Pattern + Shadow) */}
      <Box
        className="relative" // Position context for pseudo-elements
        _before={{ // Dotted pattern overlay
          content: '""',
          display: { base: "none", lg: "block" }, // Only on lg screens
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/images/dotted.png')",
          backgroundRepeat: "repeat",
          opacity: 0.2,
          zIndex: 1, // Below shadow, above image
          pointerEvents: "none", // Allow clicks to pass through
        }}
        _after={{ // Shadow overlay
          content: '""',
          // Display shadow on all screen sizes (base and up)
          display: "block",
          position: "absolute",
          inset: 0,
          // Radial gradient: transparent area in the center is smaller (10%),
          // shadow at the edges is darker (0.95 opacity).
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.0) 10%, rgba(0,0,0,0.95) 100%)",
          zIndex: 2, // Above dotted pattern, below text content
          pointerEvents: "none", // Allow clicks to pass through
        }}
      >
        <Link href={href}>
          <Image
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // Prevents looping if fallback also fails
              currentTarget.src = "/images/notfound.png"; // Fallback image
            }}
            onLoad={() => setImage(generateUrlImageResponsive(item?.thumb_url, 'thumb'))}
            src={image}
            alt={item?.name ?? "Không xác định"}
            objectFit="cover"
            loading="lazy"
            // Height classes as provided by the user, no changes here.
            className="lg:h-[792px] md:h-[400px] h-[300px] w-full brightness-[0.85] block"
          />
        </Link>
      </Box>

      {/* Text Content Area */}
      <Box className="absolute bottom-2 left-2 right-2 lg:pl-6 lg:pr-6 lg:pb-20 p-4 slide-in z-[6]">
        <h4 className="font-bold title-text lg:text-4xl md:text-2xl lg:inline-block block text-xl truncate lg:text-left text-center ">
          {item?.name ?? "Không xác định"}
        </h4>
        {/* Subtitle using item.origin_name */}
        {item?.origin_name && (
          <h5
            // Adjusted font sizes: lg:text-lg (was xl), md:text-base (was lg), text-sm (was base)
            className="lg:text-lg md:text-base text-sm text-[#ffd875] truncate lg:text-left text-center mt-1 lg:mt-1.5"
            style={{ color: "#ffd875" }} // Inline style for exact color, Tailwind JIT might not pick up arbitrary hex
          >
            {item.origin_name}
          </h5>
        )}
        <Box className="flex gap-2 items-center flex-wrap lg:justify-start justify-center mt-3">
          <TagClassic text={item?.quality ?? "Không xác định"} />
          <TagClassic text={item?.year ?? "Không xác định"} />
          <TagClassic text={item?.lang ?? "Không xác định"} />
          <TagClassic text={item?.time ?? "Không xác định"} />
          <TagClassic text={item?.episode_current ?? "Không xác định"} />
        </Box>
        {windowWidth > 1024 && (
          <>
            <Box className="flex flex-wrap gap-2 mt-2">
              {item?.category?.map((category: any, index: number) => (
                <TagClassic
                  key={index}
                  text={category?.name ?? "Không xác định"}
                  isRedirect
                  href={`/detail/the-loai/${category?.slug}`}
                />
              ))}
            </Box>
            <Box className="flex gap-2 items-center mt-6">
              <MovieActionsButton slug={item?.slug} />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SlideItem;
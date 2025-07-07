"use client";

import { emojis } from "@/lib/defines/data";
import { setSelectedReview } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const ReviewEmo = () => {
  const { selectedReview } = useSelector(
    (state: RootState) => state.user.reviews
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 rounded-xl p-4 bg-[#0000004d]">
      {emojis.map((emoji) => (
        <Box
          onClick={() => dispatch(setSelectedReview(emoji))}
          key={emoji.id}
          className={`flex md:flex-col flex-row gap-4 items-center justify-center cursor-pointer px-2 py-4 rounded-lg
              ${
                selectedReview?.id === emoji.id
                  ? "bg-[#3556b6] grayscale-0"
                  : "grayscale hover:grayscale-0"
              }
            `}
        >
          <Box className="md:w-16 md:h-16 w-8 h-8">
            <img src={emoji.emoji} alt={emoji.text} className="w-full h-full" />
          </Box>
          <p className="text-xs text-gray-50">{emoji.text}</p>
        </Box>
      ))}
    </Box>
  );
};

export default ReviewEmo;

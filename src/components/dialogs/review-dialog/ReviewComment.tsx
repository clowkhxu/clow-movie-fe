"use client";

import { setReviewContent } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Textarea } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";

const ReviewComment = () => {
  const dispatch: AppDispatch = useDispatch();
  const { reviewContent } = useSelector(
    (state: RootState) => state.user.reviews
  );

  return (
    <Box>
      <Textarea
        onChange={(e) => dispatch(setReviewContent(e.target.value))}
        value={reviewContent || ""}
        className="border-2 p-4 border-[#ffffff10] rounded-2xl focus:border-gray-50"
        rows={3}
        resize="none"
        placeholder="Viết nhận xét về phim..."
      />
    </Box>
  );
};

export default ReviewComment;

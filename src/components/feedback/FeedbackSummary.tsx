"use client";

import { Box } from "@chakra-ui/react";
import { TbMessageFilled } from "react-icons/tb";
import CommentToggleTab from "./FeedbackToggleTab";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { MdReviews } from "react-icons/md";

const FeedbackSummary = () => {
  const { feedbackData, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const totalFeedbacks = feedbackData.totalFeedbacks;

  return (
    <Box className="flex lg:gap-6 gap-4 items-center">
      <Box className="flex gap-2 items-center lg:text-2xl text-lg text-gray-50">
        {feedbackType === "comment" ? <TbMessageFilled /> : <MdReviews />}

        <span>
          {feedbackType === "comment" ? "Bình luận" : "Đánh giá"}{" "}
          <span>({totalFeedbacks})</span>
        </span>
      </Box>
      <CommentToggleTab />
    </Box>
  );
};

export default FeedbackSummary;

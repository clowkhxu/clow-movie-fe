"use client";

import { Box } from "@chakra-ui/react";
import FeedbackSummary from "./FeedbackSummary";
import FeedbackInput from "./FeedbackInput";
import FeedbackList from "./FeedbackList";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const FeedbackSection = () => {
  const { feedbackType } = useSelector((state: RootState) => state.feedback);

  return (
    <Box className="flex flex-col gap-8" id="feedback">
      <FeedbackSummary />
      {feedbackType === "comment" ? <FeedbackInput action="comment" /> : null}
      <FeedbackList />
    </Box>
  );
};

export default FeedbackSection;

"use client";

import { Box } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { formatDateUnix } from "@/lib/utils";
import FeedbackActions from "./FeedbackActions";
import ReplySection from "./reply/ReplySection";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import FeedbackInput from "./FeedbackInput";
import ShowMoreText from "../ShowMoreText";
import GenderIcon from "./GenderIcon";
import Rated from "./review/Rated";
import EditableFeedback from "./EditableFeedback";
import { useSession } from "next-auth/react";

import "@/assets/css/animation.css";

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  const { data: session } = useSession();
  const { feedbackType, feedbackData } = useSelector(
    (state: RootState) => state.feedback
  );
  const showFeedbackId = feedbackData.showFeedbackId;
  const { _id: userId } = feedback?.author || {};
  const params = new URLSearchParams(window.location.search);
  const cid = params.get("cid");

  return (
    <Box
      className={`flex gap-4 items-start ${
        feedback?._id === cid ? "mine" : ""
      }`}
    >
      <Avatar
        name={feedback?.author?.name}
        src={feedback?.author?.avatar}
        className="w-10 h-10 relative"
        fallback={<div className="w-10 h-10 bg-gray-200 rounded-full"></div>}
      />
      <Box className="flex-1">
        <Box className="flex gap-2 items-center mb-1.5">
          {feedbackType === "review" && (
            <Rated point={feedback?.reviews?.point} />
          )}

          <Box className="text-xs flex gap-2 items-center">
            <span className="text-gray-50">{feedback?.author?.name}</span>
            <GenderIcon gender={feedback?.author?.gender} />
          </Box>

          <span className="text-[10px] text-gray-500 ml-1">
            {formatDateUnix(feedback?.created_at)}
          </span>
        </Box>

        {feedback?.is_spam === 0 ? (
          <>
            <EditableFeedback
              feedbackId={feedback?._id}
              parentId={null}
              defaultValue={feedback?.content}
              readonly={session?.user?.id !== userId}
            >
              <ShowMoreText
                text={feedback?.content}
                maxLength={500}
                size="xs"
              />
            </EditableFeedback>

            <FeedbackActions data={feedback} action="comment" />
          </>
        ) : (
          <span className="text-xs text-gray-400 italic">
            Nội dung đã ẩn do bị đánh dấu spam.
          </span>
        )}

        {showFeedbackId === feedback?._id && (
          <FeedbackInput
            action="reply"
            autoFocus
            rootId={feedback?._id}
            feedback={feedback}
          />
        )}

        {feedback?.total_children > 0 && (
          <ReplySection
            totalChildren={feedback?.total_children}
            parentId={feedback?._id}
          />
        )}
      </Box>
    </Box>
  );
};

export default FeedbackItem;

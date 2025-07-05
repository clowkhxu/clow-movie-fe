"use client";

import { Avatar } from "@/components/ui/avatar";
import { formatDateUnix } from "@/lib/utils";
import { Box } from "@chakra-ui/react";
import FeedbackActions from "../FeedbackActions";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FeedbackInput from "../FeedbackInput";
import GenderIcon from "../GenderIcon";
import { useSession } from "next-auth/react";
import EditableFeedback from "../EditableFeedback";
import ShowMoreText from "@/components/ShowMoreText";

const ReplyItem = ({ reply, parentId }: ReplyItemProps) => {
  const { showReplyId } = useSelector(
    (state: RootState) => state.feedback.repliesData
  );
  const { _id: userId } = reply?.author || {};
  const { data: session } = useSession();

  return (
    <Box className="flex gap-4 items-start">
      <Avatar
        name={reply?.author?.name}
        src={reply?.author?.avatar}
        className="sm:w-10 sm:h-10 w-8 h-8"
        fallback={
          <div className="sm:w-10 sm:h-10 w-8 h-8 bg-gray-200 rounded-full"></div>
        }
      />
      <Box className="flex-1">
        <Box className="flex gap-2 items-center mb-1.5">
          <Box className="text-xs flex gap-2 items-center">
            <span className="text-gray-50">{reply?.author?.name}</span>
            <GenderIcon gender={reply?.author?.gender} />
          </Box>
          <span className="text-[10px] text-gray-500 ml-1">
            {formatDateUnix(reply?.created_at)}
          </span>
        </Box>
        {reply?.is_spam === 0 ? (
          <>
            <Box className="flex items-center gap-2">
              <span className="bg-[#3e435c] whitespace-nowrap text-xs text-gray-50 inline-block p-[2px] rounded-sm">
                @{reply?.mention_user?.name}
              </span>

              <EditableFeedback
                parentId={parentId}
                feedbackId={reply?._id}
                defaultValue={reply?.content}
                readonly={session?.user?.id !== userId}
              >
                <ShowMoreText text={reply?.content} maxLength={500} size="xs" />
              </EditableFeedback>
            </Box>

            <FeedbackActions data={reply} action="reply" rootId={parentId} />
          </>
        ) : (
          <span className="text-xs text-gray-400 italic">
            Nội dung đã ẩn do bị đánh dấu spam.
          </span>
        )}

        {showReplyId === reply?._id && (
          <FeedbackInput action="reply" autoFocus rootId={parentId} />
        )}
      </Box>
    </Box>
  );
};

export default ReplyItem;

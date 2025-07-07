"use client";

import { addFeedback, addReply } from "@/lib/actions/feedbackAction";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams, usePathname } from "next/navigation";
import { useState, useTransition } from "react";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";
import {
  setShowFeedbackId,
  setShowReplyId,
} from "@/store/slices/feedbackSlice";
import { createNotification } from "@/lib/actions/notificationActionClient";
import { handleShowToaster } from "@/lib/utils";

const FeedbackInput = ({
  action,
  autoFocus = false,
  rootId,
  feedback,
}: FeedbackInputProps) => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { data: session }: any = useSession();
  const { replyId, feedbackType } = useSelector(
    (state: RootState) => state.feedback
  );
  const pathname = usePathname();
  const { movie } = useSelector((state: RootState) => state.movie.movieInfo);
  const [isPending, startTransition] = useTransition();
  const [length, setLength] = useState(0);
  const [value, setValue] = useState("");
  const maxLength = 1000;

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setValue(value);
    setLength(value.length);
  };

  const handleRefreshFeedback = async () => {
    await Promise.all([
      dispatch(
        getFeedbacks({
          movieSlug: params.slug as string,
          type: feedbackType,
          limit: 10,
        })
      ),

      dispatch(
        getReplyListFeedback({
          parentId: rootId as string,
          type: feedbackType,
          limit: 10,
        })
      ),
    ]);
  };

  const handleCreateNotification = async () => {
    if (session?.user?.id !== feedback?.author?._id) {
      const href = pathname.includes("info")
        ? `/info/${params.slug}?cid=${feedback?._id}`
        : `/watching/${params.slug}?cid=${feedback?._id}`;

      await createNotification({
        userId: feedback?.author?._id,
        senderId: session?.user?.id,
        type: "individual",
        content: `${session?.user?.name} đã trả lời bình luận của bạn trong ${movie?.name}`,
        href,
        image: movie?.poster_url,
        accessToken: session?.user?.accessToken,
      });
    }
  };

  const addNewComment = async () => {
    const response = await addFeedback({
      movieSlug: params.slug as string,
      userId: session?.user?.id as string,
      content: value,
      type: "comment",
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const addNewReply = async () => {
    const response = await addReply({
      parentId: replyId as string,
      userId: session?.user?.id as string,
      content: value,
      type: feedbackType,
      movieSlug: params.slug as string,
      accessToken: session?.user?.accessToken as string,
    });

    return response;
  };

  const handleAddNewComment = () => {
    if (!session) {
      handleShowToaster(
        "Thông báo",
        "Vui lòng đăng nhập để bình luận",
        "error"
      );
      return;
    }

    if (value.trim() === "") {
      handleShowToaster("Thông báo", "Nội dung không được để trống", "error");
      return;
    }

    startTransition(async () => {
      let response: any = null;

      if (action === "comment") {
        response = await addNewComment();
      } else if (action === "reply") {
        response = await addNewReply();

        handleCreateNotification();
      }

      if (response?.status) {
        setValue("");
        setLength(0);

        dispatch(setShowFeedbackId(null));
        dispatch(setShowReplyId(null));

        // Làm mới danh sách bình luận
        handleRefreshFeedback();
      }

      handleShowToaster(
        "Thông báo",
        response?.message,
        response?.status ? "success" : "error"
      );
    });
  };

  return (
    <Box className="flex flex-col justify-end gap-2 p-2 rounded-xl bg-[#ffffff10]">
      <Box className="relative">
        <Textarea
          disabled={!session}
          autoFocus={autoFocus}
          maxLength={maxLength}
          autoresize
          onChange={handleChangeInput}
          value={value}
          placeholder="Viết bình luận..."
          className="h-full min-h-32 bg-[#191b24] text-white rounded-lg p-4 border-2 border-transparent focus:border-gray-400"
        />
        <span className="text-xs absolute top-1.5 right-6 text-gray-400">
          {length}/{maxLength}
        </span>
      </Box>
      <Button
        size="sm"
        maxWidth={120}
        loading={isPending}
        onClick={handleAddNewComment}
        className="bg-transparent text-[#ffd875] ml-auto max-w hover:opacity-80 transition-all"
      >
        Gửi
        <IoMdSend />
      </Button>
    </Box>
  );
};

export default FeedbackInput;

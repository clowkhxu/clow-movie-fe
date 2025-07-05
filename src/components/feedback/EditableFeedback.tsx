"use client";

import { Editable, EditableInput } from "@chakra-ui/react";
import { useState } from "react";
import { updateContentFeedback } from "@/lib/actions/feedbackAction";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import {
  getFeedbacks,
  getReplyListFeedback,
} from "@/store/asyncThunks/feedbackAsyncThunk";
import { handleShowToaster } from "@/lib/utils";

const EditableFeedback = ({
  children,
  defaultValue,
  feedbackId,
  parentId,
  readonly = false,
}: EditableFeedbackProps) => {
  const [value, setValue] = useState(defaultValue || "");
  const { data: session }: any = useSession();
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const { feedbackType } = useSelector((state: RootState) => state.feedback);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    const target = e.target as HTMLInputElement;
    setValue(target.value);
  };

  const handleRefreshFeedback = () => {
    if (!parentId) {
      dispatch(
        getFeedbacks({
          movieSlug: params.slug as string,
          type: feedbackType,
          limit: 10,
        })
      );
    }

    if (parentId) {
      dispatch(
        getReplyListFeedback({
          parentId: parentId as string,
          type: feedbackType,
          limit: 10,
        })
      );
    }
  };

  const updateFeedback = async () => {
    if (value?.trim() === "" || value === defaultValue) {
      setValue(defaultValue || "");
      return;
    }

    const response = await updateContentFeedback({
      feedbackId,
      content: value,
      userId: session?.user?.id as string,
      accessToken: session?.user?.accessToken as string,
    });

    if (response?.status) {
      handleRefreshFeedback();
    }

    handleShowToaster(
      "Thông báo",
      response?.message,
      response?.status ? "success" : "error"
    );
  };

  return (
    <Editable.Root
      value={value}
      onValueCommit={updateFeedback}
      onChange={handleChange}
      readOnly={readonly}
    >
      <Editable.Preview
        className={`${
          !readonly ? "hover:bg-[#ffffff10]" : "bg-transparent"
        } min-h-6`}
      >
        {children}
      </Editable.Preview>
      <EditableInput className="focus-visible:outline-gray-400 min-h-6 text-gray-400 text-xs bg-transparent" />
    </Editable.Root>
  );
};

export default EditableFeedback;

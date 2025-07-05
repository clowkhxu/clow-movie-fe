"use client";

import { setReportDescription } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Field, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ErrorDescriptionInput = () => {
  const { report } = useSelector((state: RootState) => state.user);
  const { reportDescription } = report;
  const dispatch: AppDispatch = useDispatch();
  const [length, setLength] = useState(0);
  const maxLength = 500;

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    dispatch(setReportDescription(value));
    setLength(value.length);
  };

  return (
    <Field.Root required>
      <Field.Label>
        Mô tả chi tiết lỗi <Field.RequiredIndicator />
      </Field.Label>
      <Box className="relative w-full">
        <Textarea
          value={reportDescription}
          maxLength={maxLength}
          resize="none"
          autoresize
          onChange={handleChangeInput}
          variant="outline"
          className="border-gray-400 focus:border-gray-50 w-full py-4 px-2 text-sm"
        />
        <span className="text-xs absolute top-1.5 right-6 text-gray-400">
          {length}/{maxLength}
        </span>
      </Box>
    </Field.Root>
  );
};

export default ErrorDescriptionInput;

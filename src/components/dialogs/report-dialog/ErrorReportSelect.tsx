"use client";

import { setReportError } from "@/store/slices/userSlice";
import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useDispatch } from "react-redux";

const options = createListCollection({
  items: [
    { label: "❌ Không thể phát phim", value: "❌ Không thể phát phim" },
    {
      label: "⏳ Phim load chậm hoặc bị giật",
      value: "⏳ Phim load chậm hoặc bị giật",
    },
    {
      label: "📉 Chất lượng video kém (mờ, nhòe, sai tỷ lệ)",
      value: "📉 Chất lượng video kém (mờ, nhòe, sai tỷ lệ)",
    },
    { label: "🎭 Sai hoặc thiếu phụ đề", value: "🎭 Sai hoặc thiếu phụ đề" },
    {
      label: "🔊 Không có âm thanh hoặc âm thanh bị lệch",
      value: "🔊 Không có âm thanh hoặc âm thanh bị lệch",
    },
    {
      label: "🗣 Sai ngôn ngữ (thuyết minh/phụ đề không đúng)",
      value: "🗣 Sai ngôn ngữ (thuyết minh/phụ đề không đúng)",
    },
    {
      label: "🎬 Phim bị cắt hoặc thiếu tập",
      value: "🎬 Phim bị cắt hoặc thiếu tập",
    },
    {
      label: "🔄 Sai nội dung (nhầm tập, nhầm bản phim)",
      value: "🔄 Sai nội dung (nhầm tập, nhầm bản phim)",
    },
    {
      label: "📵 Không thể tải trang phim",
      value: "📵 Không thể tải trang phim",
    },
    {
      label: "🔗 Link phim bị lỗi (404, 500...)",
      value: "🔗 Link phim bị lỗi (404, 500...)",
    },
    {
      label: "❎ Lỗi tương thích với trình duyệt / thiết bị",
      value: "❎ Lỗi tương thích với trình duyệt / thiết bị",
    },
  ],
});

const ErrorReportSelect = () => {
  const dispatch = useDispatch();


  const handleChangeSelect = (value: string) => {
    dispatch(setReportError(value));
  };

  return (
    <Select.Root
      collection={options}
      size="sm"
      onValueChange={(details) => handleChangeSelect(details?.value?.[0])}
    >
      <Select.HiddenSelect />
      <Select.Label>Lỗi mà bạn gặp phải</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText
            placeholder="---Chọn lỗi---"
            className="text-gray-50 border-gray-400 focus:border-gray-50"
          />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner
          css={{
            zIndex: "9999 !important",
          }}
        >
          <Select.Content className="max-w-[calc(460px-48px)]">
            {options.items.map((option) => (
              <Select.Item item={option} key={option.value}>
                {option.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default ErrorReportSelect;

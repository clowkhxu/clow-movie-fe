"use client";

import EmojiDizzyIcon from "@/components/icons/EmojiDizzyIcon";
import { EmptyState, VStack } from "@chakra-ui/react";

const Error = () => {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <EmptyState.Indicator>
          <EmojiDizzyIcon />
        </EmptyState.Indicator>
        <VStack textAlign="center">
          <EmptyState.Title className="text-gray-50">
            Tải dữ liệu thất bại!
          </EmptyState.Title>
          <EmptyState.Description className="text-gray-50">
            Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.
          </EmptyState.Description>
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
};

export default Error;

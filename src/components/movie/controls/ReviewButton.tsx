"use client";

import ReviewDialog from "@/components/dialogs/review-dialog/ReviewDialog";
import { handleShowToaster } from "@/lib/utils";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { MdReviews } from "react-icons/md";

const ReviewButton = () => {
  const { data: session } = useSession();

  const handleNotSesstion = () => {
    handleShowToaster(
      "Thông báo",
      "Bạn cần đăng nhập để thực hiện hành động này",
      "error"
    );
  };

  if (!session) {
    return (
      <Button
        onClick={handleNotSesstion}
        className="p-2 md:min-w-32 text-gray-50 rounded-full bg-[#3556b6]"
      >
        <MdReviews />
        <span className="sm:text-sm text-[10px] hidden xs:block">Đánh giá</span>
      </Button>
    );
  }

  return (
    <ReviewDialog
      trigger={
        <Button className="p-2 md:min-w-32 text-gray-50 rounded-full bg-[#3556b6]">
          <MdReviews />
          <span className="texts-sm hidden xs:block">Đánh giá</span>
        </Button>
      }
    />
  );
};

export default ReviewButton;

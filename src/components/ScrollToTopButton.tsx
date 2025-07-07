"use client";

import { RootState } from "@/store/store";
import { Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BsArrowUpShort } from "react-icons/bs";

const ScrollToTopButton = () => {
  const { lastScrollY } = useSelector((state: RootState) => state.system);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={handleScrollToTop}
      className={`fixed hover:shadow-[0_5px_10px_10px_rgba(255,255,255,.15)] z-[99] right-4 bottom-4 transition-all duration-300 w-16 h-16 rounded-[25%] bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.2)] text-black flex flex-col justify-center items-center gap-1
        ${lastScrollY > 520 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <BsArrowUpShort />
      <span className="lg:text-xs text-[10px]">Đầu trang</span>
    </Button>
  );
};

export default ScrollToTopButton;

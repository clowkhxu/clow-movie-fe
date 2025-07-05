"use client";

import { setIsOpenDrawer } from "@/store/slices/systemSlice";
import { AppDispatch } from "@/store/store";
import { IconButton } from "@chakra-ui/react";
import { HiMiniBars3 } from "react-icons/hi2";
import { useDispatch } from "react-redux";

const BarButton = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <IconButton
      onClick={() => dispatch(setIsOpenDrawer(true))}
      size="sm"
      variant="solid"
      className="bg-transparent xl:hidden flex"
    >
      <HiMiniBars3 />
    </IconButton>
  );
};

export default BarButton;

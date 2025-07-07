"use client";

import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "@/components/ui/drawer";
import BodyDrawer from "./BodyDrawer";
import "@/assets/css/movie.css";
import ProfileHeader from "@/components/ProfileHeader";

interface DrawerCustomProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerCustom = ({ isOpen, onClose }: DrawerCustomProps) => {
  return (
    <DrawerRoot placement="start" open={isOpen} onOpenChange={onClose}>
      <DrawerBackdrop />

      <DrawerContent
        p={1}
        className="bg-[#2a314e] text-gray-50 border-r border-[#ffffff10]"
      >
        <DrawerHeader p={3}>
          <DrawerTitle>
            <ProfileHeader />
          </DrawerTitle>
        </DrawerHeader>
        <DrawerBody p={3}>
          <BodyDrawer />
        </DrawerBody>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default DrawerCustom;

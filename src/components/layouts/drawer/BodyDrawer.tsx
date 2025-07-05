"use client";

import Link from "next/link";
import { categories, countries } from "@/lib/defines/data";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "@/store/slices/systemSlice";
import AccordionList from "./AccordionList";

const menu = [
  { name: "Trang chủ", path: "/" },
  { name: "Phim lẻ", path: "/detail/danh-sach/phim-le" },
  { name: "Phim bộ", path: "/detail/danh-sach/phim-bo" },
  { name: "Hoạt hình", path: "/detail/danh-sach/hoat-hinh" },
  { name: "Lọc nâng cao", path: "/advance-filter" },
];

const BodyDrawer = () => {
  const dispatch: AppDispatch = useDispatch();

  const handleCloseDrawer = () => dispatch(setIsOpenDrawer(false));

  return (
    <ul className="flex flex-col gap-1 h-full">
      {menu.map((item, index) => (
        <li key={index} onClick={handleCloseDrawer}>
          <Link
            href={item.path}
            className="text-sm p-2 rounded-sm transition-all hover:bg-[#ffffff05] block"
          >
            {item.name}
          </Link>
        </li>
      ))}
      <AccordionList
        label="Thể loại"
        items={categories}
        path="/detail/the-loai"
        callback={handleCloseDrawer}
      />
      <AccordionList
        label="Quốc gia"
        items={countries}
        path="/detail/quoc-gia"
        callback={handleCloseDrawer}
      />
    </ul>
  );
};

export default BodyDrawer;

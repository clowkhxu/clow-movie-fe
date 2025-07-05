"use client";

import { useState } from "react";
import Link from "next/link";
import CategoryAndCountryList from "./CategoryAndCountryList";
import { categories, countries } from "@/lib/defines/data";
import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";

const menu = [
  { name: "Trang chủ", path: "/" },
  { name: "Phim lẻ", path: "/detail/danh-sach/phim-le" },
  { name: "Phim bộ", path: "/detail/danh-sach/phim-bo" },
  { name: "Hoạt hình", path: "/detail/danh-sach/hoat-hinh" },
  { name: "Lọc nâng cao", path: "/advance-filter" },
];

const MenuBar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <ul className="text-gray-50 gap-2 items-center xl:flex hidden">
      {menu.map((item, index) => (
        <li key={index}>
          <Link
            href={item.path}
            className={`p-2 text-sm hover:text-[#ffd875] relative transition-all ${
              pathname === item.path ? "text-[#ffd875]" : ""
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
      <li
        className="flex p-2 text-sm cursor-pointer gap-1 items-center relative"
        onMouseEnter={() => setOpenDropdown("country")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <span>Quốc gia</span>
        <IoIosArrowDown />
        {openDropdown === "country" && (
          <CategoryAndCountryList data={countries} type="quoc-gia" />
        )}
      </li>
      <li
        className="flex p-2 text-sm cursor-pointer gap-1 items-center relative"
        onMouseEnter={() => setOpenDropdown("category")}
        onMouseLeave={() => setOpenDropdown(null)}
      >
        <span>Thể loại</span>
        <IoIosArrowDown />
        {openDropdown === "category" && (
          <CategoryAndCountryList data={categories} type="the-loai" />
        )}
      </li>
    </ul>
  );
};

export default MenuBar;

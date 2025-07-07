"use client";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

interface CategoryAndCountryListProps {
  data: { _id: string; name: string; slug: string }[];
  type: "the-loai" | "quoc-gia";
}

const CategoryAndCountryList = ({
  data,
  type,
}: CategoryAndCountryListProps) => {
  return (
    <Box
      className="absolute left-1/2 top-[calc(100%-16px)] mt-2 min-w-3xl overflow-hidden bg-[#0f111af2] text-gray-50 border border-[#ffffff10] shadow-lg rounded-2xl
      opacity-0 translate-y-2 transition-all duration-300 ease-in-out"
      style={{ opacity: 1, transform: "translate(-50%, 0)" }}
    >
      <ul className="grid grid-cols-5 p-2 text-gray-50 gap-1">
        {data.map((item) => (
          <li key={item._id} className="">
            <Link
              className="rounded-sm text-sm block hover:text-[#ffd875] px-4 py-2 transition"
              href={`/detail/${type}/${item.slug}`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default CategoryAndCountryList;

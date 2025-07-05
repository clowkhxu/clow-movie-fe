"use client";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";
import Link from "next/link";

const AccordionList = ({
  label,
  items,
  path,
  callback,
}: {
  label: string;
  items: any[];
  path: string;
  callback: () => void;
}) => (
  <AccordionRoot collapsible className="text-sm pl-2 pr-2">
    <AccordionItem value={label} className="border-none">
      <AccordionItemTrigger className="text-sm">{label}</AccordionItemTrigger>
      <AccordionItemContent>
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <li key={item._id} onClick={callback}>
              <Link
                href={`${path}/${item.slug}`}
                className="flex text-sm w-full p-2 rounded-sm transition-all hover:bg-[#ffffff05]"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </AccordionItemContent>
    </AccordionItem>
  </AccordionRoot>
);

export default AccordionList;

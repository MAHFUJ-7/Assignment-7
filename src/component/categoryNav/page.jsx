"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryLinks({ categories }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-4 overflow-x-auto">
      {categories.map((Category) => {
        const isActive =
          decodeURIComponent(pathname) === `/categorywise/${Category.slug}`;

        return (
          <div key={Category.id} className="p-1">
            <Link
              href={`/categorywise/${Category.slug}`}
              className={`flex gap-2 items-center px-3 py-1 rounded-full whitespace-nowrap transition ${
                isActive
                  ? "bg-green-400 text-white font-semibold"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{Category.icon}</span>
              <span>{Category.nameBn}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
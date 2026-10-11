"use client";

import React, { useMemo, useState } from "react";
import { Label, ListBox, Select } from "@heroui/react";
import Link from "next/link";

// Converts Bengali digits to English so sorting uses the number value, not text
const bnToEn = (v) =>
  String(v)
    .replace(/[০-৯]/g, (d) => "০১২৩৪৫৬৭৮৯".indexOf(d))
    .replace(/,/g, "");
const toNum = (v) => Number(bnToEn(v)) || 0;

export default function ProductList({ products }) {
  const [sort, setSort] = useState("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => toNum(a.today) - toNum(b.today));
    if (sort === "desc") list.sort((a, b) => toNum(b.today) - toNum(a.today));
    return list;
  }, [products, sort]);

  return (
    <>
      <div className="flex justify-end gap-4 items-center m-3 p-4 bg-[#f0f0f0] rounded-[10px]">
        <Label>সাজান</Label>
        <div>
          <Select
            className="w-[256px]"
            selectedKey={sort}
            onSelectionChange={(key) => setSort(key)}
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="default" textValue="ডিফল্ট">
                  ডিফল্ট
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="asc" textValue="দাম: কম থেকে বেশি">
                  দাম: কম থেকে বেশি
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="desc" textValue="দাম: বেশি থেকে কম">
                  দাম: বেশি থেকে কম
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      <h1>
        মোট <span>{sorted.length.toLocaleString("bn-BD")}</span>টি পণ্য দেখানো হচ্ছে
      </h1>

      <div className="gap-4 overflow-x-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((item) => (
          <div key={item.id} className="gap-4 bg-amber-50 p-4 rounded-lg border">
            <Link href={`/product/${item.slug}`}>
              <div className="flex gap-4 items-center">
                <h1 className="text-2xl bg-gray-400 rounded-[10px] p-2">{item.image}</h1>
                <div>
                  <h1 className="text-lg font-semibold">{item.nameBn}</h1>
                  <h3>
                    প্রতি{" "}
                    {item.unit === "kg"
                      ? "কেজি"
                      : item.unit === "litre"
                      ? "লিটার"
                      : item.unit === "dozen"
                      ? "ডজন"
                      : "পিস"}
                  </h3>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <h1>আজকের দাম</h1>
                  <h2>{Number(item.today).toLocaleString("bn-BD")} টাকা</h2>
                </div>
                {item.change.dir === "up" ? (
                  <h2 className="bg-red-100 text-center items-center h-7 p-1 rounded-2xl">
                    <span className="text-red-500">{"▲"}</span>
                    {Number(item.change.pct).toFixed(2)}%
                  </h2>
                ) : item.change.dir === "down" ? (
                  <h2 className="bg-green-100 text-center items-center h-7 p-1 rounded-2xl">
                    <span className="text-green-500">{"▼"}</span>
                    {Number(item.change.pct * -1).toFixed(2)}%
                  </h2>
                ) : (
                  <h2 className="bg-gray-100 text-center items-center h-7 p-1 rounded-2xl">
                    <span className="text-gray-500">{"–"}</span>0.00%
                  </h2>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
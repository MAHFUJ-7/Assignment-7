import React from 'react'
import { Label, ListBox, Select } from "@heroui/react";
import Link from 'next/link';
import ProductDetailsPage from '@/app/productDetails/[id]/page';

const fetchCategory = async (category) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${category}`);
  const data = await res.json();
  return data;
}


const cateGoryWise = async ({ params }) => {
  const { id } = await params;
  const categoryData = await fetchCategory(id);
  console.log(categoryData);

  return (
    <div>
      <div className="flex gap-4 items-center m-3 p-4 bg-[#f0f0f0] rounded-[10px]">
        <h1 className="text-5xl font-bold">{categoryData[0].categoryIcon}</h1>
        <div>
          <h1 className="text-2xl font-bold">{categoryData[0].categoryNameBn}</h1>
          <h3><span>{categoryData.length.toLocaleString("bn-BD")}</span>টি পণ্যের আজকের দাম ও পরিবর্তন</h3>
        </div>
      </div>

      <div className="flex justify-end  gap-4 items-center m-3 p-4 bg-[#f0f0f0] rounded-[10px]">
        <Label>সাজান</Label>
        <div>
          <Select className="w-[256px]" placeholder="Select one">
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="florida" textValue="Florida">
                  Florida
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="delaware" textValue="Delaware">
                  Delaware
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="california" textValue="California">
                  California
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="texas" textValue="Texas">
                  Texas
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="new-york" textValue="New York">
                  New York
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="washington" textValue="Washington">
                  Washington
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>
      </div>

      <h1>মোট <span>{categoryData.length.toLocaleString("bn-BD")}</span>টি পণ্য দেখানো হচ্ছে</h1>
      <div className=" gap-4 overflow-x-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {categoryData.map((item) => (
            <div key={item.id} className=" gap-4 bg-amber-50 p-4 rounded-lg border">
              <Link href={`/productDetails/${item.id}`}>
                <div className="flex gap-4 items-center">
                  <h1 className="text-2xl bg-gray-400 rounded-[10px] p-2">{item.image}</h1>
                  <div>
                    <h1 className="text-lg font-semibold">{item.nameBn}</h1>
                    <h3>প্রতি {item.unit === "kg" ? "কেজি" : item.unit === "litre" ? "লিটার" : item.unit === "dozen" ? "ডজন" : "পিস"}</h3>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>
                    <h1>আজকের দাম</h1>
                    <h2>{Number(item.today).toLocaleString("bn-BD")} টাকা</h2>
                  </div>
                  <div>
                  </div>
                  {item.change.dir === "up" ? (
                    <h2 className="bg-red-100 text-center items-center h-7 p-1 rounded-2xl"><span className="text-red-500">{"▲"}</span>{Number(item.change.pct).toFixed(2)}%</h2>
                  ) : item.change.dir === "down" ? (
                    <h2 className="bg-green-100 text-center items-center h-7 p-1 rounded-2xl"><span className="text-green-500">{"▼"}</span>{Number(item.change.pct * -1).toFixed(2)}%</h2>
                  ) : (
                    <h2 className="bg-gray-100 text-center items-center h-7 p-1 rounded-2xl"><span className="text-gray-500">{"–"}</span>0.00%</h2>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
    </div>
  )
}

export default cateGoryWise
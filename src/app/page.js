import React from 'react'
import Link from 'next/link'
import HeroSection from '@/component/herosection/page.js'

const productdata = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
  const data = await res.json();
  return data;
}

const page = async () => {
  const data = await productdata();
  // console.log(data);

  let todayIncrease = data.filter((item) => {
    return item.change.dir === "up";
  }).sort((a, b) => b.change.pct - a.change.pct).slice(0, 6);

  const todayDecrease = data.filter((item) => {
    return item.change.dir === "down";
  }).sort((a, b) => a.change.pct - b.change.pct).slice(0, 6);
  console.log(todayDecrease);
  return (
    <div className=" container max-auto m-2 p-5 bg-[#f6f5ed] rounded-[10px]">
      <HeroSection />
      <div className=" gap-4 p-4">

        <h1 className="text-2xl font-bold"><span className="text-red-500">{"▲"}</span>  আজ দাম বেড়েছে</h1>
        <div className=" gap-4 overflow-x-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {todayIncrease.map((item) => (
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
                  <h2 className="bg-red-100 text-center items-center h-7 p-1 rounded-2xl"><span className="text-red-500">{"▲"}</span>{Number(item.change.pct).toFixed(2)}%</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold"><span className="text-green-500">{"▼"}</span> আজ দাম কমেছে</h1>
        <div className=" gap-4 overflow-x-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {todayDecrease.map((item) => (
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
                  <h2 className="bg-green-100 text-center items-center h-7 p-1 rounded-2xl"><span className="text-green-500">{"▼"}</span>{Number(item.change.pct * -1).toFixed(2)}%</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <h1 id="all-products" className="text-2xl font-bold"> সব পণ্য</h1>
        <p>মোট <span>{data.length.toLocaleString("bn-BD")}</span>টি পণ্য দেখানো হচ্ছে</p>
        <div className=" gap-4 overflow-x-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
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

    </div>
  )
}

export default page
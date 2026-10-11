import Link from 'next/link';
import React from 'react'
import { notFound } from 'next/navigation';
const fetchProductDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`);
    if (!res.ok) {
        return null;
    }
    const data = await res.json();
    return data && typeof data === 'object' ? data : null;
}

const ProductDetailsPage = async ({ params }) => {
    const { id } = await params;
    const product = await fetchProductDetails(id);
    if (!product || !Array.isArray(product.markets) || product.markets.length === 0) {
        notFound();
    }

    const minPrice = product.markets.reduce((min, market) => {
        return market.min < min ? market.min : min;
    }, product.markets[0].min);

    const maxPrice = product.markets.reduce((max, market) => {
        return market.max > max ? market.max : max;
    }, product.markets[0].max);

    const averagePrice = product?.markets?.length > 0
        ? product.markets.reduce((sum, market) => sum + (market.min + market.max) / 2, 0) / product.markets.length
        : 0;


    return (
        <div>
            <h3 className='px-3'><Link href="/">হোম</Link> &gt; <Link href={`/categorywise/${product.category}`}>{product.categoryNameBn}</Link> &gt; {product.nameBn}</h3>
            <div className="flex gap-4 m-3 p-4 bg-gray-100 justify-between rounded-[10px] border">
                <div className="flex gap-4 items-center">
                    <h1 className="text-5xl bg-gray-400 rounded-[10px] p-2">{product.image}</h1>
                    <div>
                        <h1 className="text-2xl font-bold">{product.nameBn}</h1>
                        <h3>প্রতি {product.unit === "kg" ? "কেজি" : product.unit === "litre" ? "লিটার" : product.unit === "dozen" ? "ডজন" : "পিস"} {product.categoryNameBn}</h3>
                        <h1>গতকালের তুলনায় আজ দাম {product.change.dir === "up" ? "বেড়েছে" : product.change.dir === "down" ? "কমেছে" : "অপরিবর্তিত"}   {Math.abs(product.today - product.yesterday).toLocaleString("bn-BD")}টাকা</h1>
                    </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                    <h1>আজকের দাম<br></br> <span className='text-3xl font-bold'>{Number(product.today).toLocaleString("bn-BD")}</span> <br></br> টাকা/{product.unit === "kg" ? " কেজি" : product.unit === "litre" ? " লিটার" : product.unit === " dozen" ? " ডজন" : " পিস"}</h1>
                    {
                        product.change.dir === "up" ? <h2 className="bg-red-100 text-center items-center h-7 p-1 rounded-2xl"><span className="text-red-500">{"▲"}</span>{Number(product.change.pct).toFixed(2)}%</h2> : product.change.dir === "down" ? <h2 className="bg-green-100 text-center items-center h-7 p-1 rounded-2xl"><span className="text-green-500">{"▼"}</span>{Number(product.change.pct).toFixed(2)}%</h2> : <h2 className="bg-gray-100 text-center items-center h-7 p-1 rounded-2xl">{Number(product.change.pct).toFixed(2)}%</h2>
                    }
                </div>
            </div>




            <div className="flex flex-col gap-4 m-3 p-4 bg-[#f5f6f0] justify-between rounded-[10px] border">
                <div>
                    <h1 className='text-1.5xl font-bold px-4'>দামের সারসংক্ষেপ</h1>
                    <div className="flex gap-4 m-3 p-4 justify-between rounded-[10px] border">
                        <div className="flex flex-col gap-1 border p-4 rounded-[10px] w-full bg-gray-100">
                            <h2>সর্বনিম্ন দাম</h2>
                            <h3 className="text-green-500 font-bold ">{Number(minPrice).toLocaleString("bn-BD")} টাকা</h3>
                            <p>সবচেয়ে কম দামের বাজার</p>
                        </div>
                        <div className="flex flex-col gap-1 border p-4 rounded-[10px] w-full bg-gray-100">
                            <h2>সর্বোচ্চ দাম</h2>
                            <h3 className="text-red-500 font-bold">{Number(maxPrice).toLocaleString("bn-BD")} টাকা</h3>
                            <p>সবচেয়ে বেশি দামের বাজার</p>
                        </div>
                        <div className="flex flex-col gap-1 border p-4 rounded-[10px] w-full bg-gray-100">
                            <h2>গড় দাম</h2>
                            <h3 className="text-green-500 font-bold">{Math.ceil(averagePrice).toLocaleString("bn-BD")} টাকা</h3>
                            <p>প্রতি কেজি-এর হিসাবে</p>
                        </div>
                    </div>
                </div>


                <div>
                    <h1 className='text-1.5xl font-bold px-4'>বাজার অনুযায়ী দাম</h1>
                    <div className="m-3 border rounded-[10px] overflow-hidden">
                        {/* Header Row */}
                        <div className="grid grid-cols-5 gap-2 p-4 bg-gray-200 font-bold text-gray-700 text-sm md:text-base">
                            <h2>বাজার</h2>
                            <h2>বিভাগ</h2>
                            <h2>সর্বনিম্ন</h2>
                            <h2>সর্বাধিক</h2>
                            <h2>গড়</h2>
                        </div>

                        {/* Data Rows with alternating colors */}
                        <div className="flex flex-col">
                            {product.markets.map((market, index) => {
                                const avg = ((market.min + market.max) / 2).toFixed(1);
                                return (
                                    <div
                                        key={index}
                                        className={`grid grid-cols-5 gap-2 p-4 items-center text-sm md:text-base border-b border-gray-100 last:border-none ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            }`}
                                    >
                                        <h2 className="font-semibold text-gray-800">{market.market}</h2>
                                        <h2 className="text-gray-600">{market.division}</h2>
                                        <h2>{Number(market.min).toLocaleString("bn-BD")} টাকা</h2>
                                        <h2>{Number(market.max).toLocaleString("bn-BD")} টাকা</h2>
                                        <h3 className=" font-bold">{Number(avg).toLocaleString("bn-BD")} টাকা</h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetailsPage
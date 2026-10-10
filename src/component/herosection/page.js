import React from 'react'
import Image from 'next/image'
import Heroimage from '../../assets/bazar-hero.png'
import Link from 'next/link';

const heroSection = () => {

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <div className=" container max-auto m-2 p-5 flex justify-evenly items-center rounded-2xl bg-amber-200">
      <div className="flex flex-col items-start gap-4 text-left">
        <h5 className="text-green-700 bg-green-300 p-2 rounded-2xl">{today}</h5>
        <h1 className="text-4xl font-bold">আজকের বাজারের দাম এক নজরে</h1>
        <p>চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন- <br />সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
        <Link href="#all-products">
        <button className="rounded-2xl bg-blue-500 p-2 text-white shadow transition-all duration-300 hover:bg-blue-600 hover:shadow-lg">
          সব পণ্য দেখুন
        </button> 
        </Link>    
         </div>
      <div>
        <Image src={Heroimage} alt="Hero Image" width={400} height={400} />
      </div>

    </div>
  )
}

export default heroSection
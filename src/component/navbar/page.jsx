import React from 'react'
import Image from 'next/image'
import image from '@/assets/logo-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import UserNav from '../userNav/page'

const data = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
  const data = await res.json();
  return data;
}

const productdata = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
  const data = await res.json();
  return data;
}


const NavbarPage = async () => {

  const allCategories = await data();

  const allProducts = await productdata();

  // const { data: session } = await authClient.getSession();

  const session = await auth.api.getSession({
  headers: await headers(),
})

  console.log('Session data:', session); // Log the session data to check if it's being retrieved correctly
  

  const today = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());


  return (
    <div>
      <div className="px-0 md:px-4 lg:px-8">
        <div className="flex items-center justify-between p-1 border-b-gray-300 border-b">
          <Link href="/">
            <div className="flex items-center gap-4">
              <Image src={image} alt="Logo" width={48} height={48} className='bg-green-400 p-2 rounded-[10px] h-12 w-12' />
              <div>
                <h1 className="text-2xl font-bold">বাজার দর</h1>
                <h5>{today}</h5>
              </div>
            </div>
          </Link>
          <div className="flex gap-4 items-center">
            {
              session?.user ? 
              <>
                <UserNav session={session} />
              </> :
                <>
                  <Link href={"/sign-in"}>
                    সাইন ইন
                  </Link>
                  <Link href={"/sign-up"}>
                    <button className="bg-green-400 rounded-[10px] p-3">সাইন আপ</button>
                  </Link>
                </>
            }
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {allCategories.map((Category) => (
            <div key={Category.category} className="p-1 ">
              <Link href={`/categorywise/${Category.slug}`} className="flex gap-2 items-center">
                <span>{Category.icon}</span>
                <span>{Category.nameBn}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full overflow-hidden bg-white border-y">
        <div className="flex w-max flex-nowrap marquee-rtl">
          {(Array.isArray(allProducts) ? [...allProducts, ...allProducts] : []).map((product, i) => (
            <div
              key={`${product.id}-${i}`}
              className="flex flex-row items-center gap-2 px-5 py-1 text-sm whitespace-nowrap shrink-0"
            >
              <span className="text-xl">{product.image}</span>
              <span className="font-medium">{product.nameBn}</span>
              <span>
                {Number(product.today).toLocaleString("bn-BD")} টাকা/
                {{ kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" }[product.unit] ?? product.unit}
              </span>
              <span
                className={
                  product.change.dir === "up"
                    ? "text-red-500"
                    : product.change.dir === "down"
                      ? "text-green-500"
                      : "text-gray-400"
                }
              >
                {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "–"}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
                %
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default NavbarPage
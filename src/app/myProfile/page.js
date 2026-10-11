import React from 'react'
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { LogOut } from './logOut';
import Link from 'next/link';


const myProfile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  

  return (
    <div className="flex flex-col  text-starts p-3 justify-center gap-4 bg-gray-100 text-foreground">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="flex justify-between  p-4 bg-[#ecedda] rounded-lg">
        <div>
          <h1>{session?.user?.name}</h1>
          <p>{session?.user?.email}</p>
        </div>
        <LogOut />

      </div>

      <div className="flex flex-col gap-4 p-4 bg-[#daedda] rounded-lg mt-3 mx-0 md:mx-4 lg:mx-8">
        <Link href="/profile/update" className="w-fit rounded-lg bg-green-500 px-4 py-2 text-white">
          তথ্য আপডেট করুন
        </Link>
        
      </div>
    </div>
  )
}

export default myProfile
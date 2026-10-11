import React from 'react'
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { Button } from '@heroui/react';
import { signOut } from '@/lib/auth-client';
import { LogOut } from './logOut';
import UpdateProfile from './update';


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
        <UpdateProfile />
        
      </div>
    </div>
  )
}

export default myProfile
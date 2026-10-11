import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import UpdateProfile from "@/app/myProfile/update";

export default async function UpdateProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">প্রোফাইল তথ্য আপডেট</h1>
      <p className="text-gray-600">আপনার নাম পরিবর্তন করে তথ্য সংরক্ষণ করুন।</p>
      <UpdateProfile initialName={session?.user?.name ?? ""} />
    </main>
  );
}

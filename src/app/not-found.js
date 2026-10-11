import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-4xl font-bold">পেজটি পাওয়া যায়নি</h1>
      <p className="text-gray-600">আপনি যে পেজটি খুঁজছেন সেটি আর নেই বা ভুল ঠিকানা ব্যবহার করা হয়েছে।</p>
      <Link href="/" className="rounded-lg bg-green-500 px-4 py-2 text-white">
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default NotFound;

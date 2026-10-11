"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
    toast,
} from "@heroui/react";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";

export default function Basic() {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Do something with the form data, e.g., submit it to a server
        const { data: resData, error } = await signUp.email({
            name: String(data.name),
            email: String(data.email),
            password: String(data.password)
        });
        toast.success("অ্যাকাউন্ট তৈরি করা হয়েছে। অনুগ্রহ করে লগইন করুন।");
    };

    const handleSignUnGoogle = async () => {
        const data = await signIn.social({
            provider: "google",
            callbackURL: "/",
        })
    }

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="flex  flex-col items-center text-starts p-3 justify-center gap-4 bg-gray-100 text-foreground">
            <h1 className="text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
            <p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
            <Form
                className="flex w-96 flex-col gap-4 content-center bg-[#e7e9e3] p-5 rounded-[10px]"
                onSubmit={onSubmit}
            >
                <TextField
                    isRequired
                    name="name"
                    type="text"
                >
                    <Label>নাম<br></br></Label>
                    {/* Removed invalid closing <br> tag */}
                    <Input placeholder="যেমন: রহিম উদ্দিন" className="p-2 bg-gray-200 w-full rounded-[10px] border border-black-500 m-1" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "অনুগ্রহ করে একটি সঠিক ইমেল ঠিকানা লিখুন।";
                        }
                        return null;
                    }}
                >
                    <Label>ইমেইল<br></br></Label>
                    <Input placeholder="you@example.com" className="p-2 bg-gray-200 w-full rounded-[10px] border border-black-500 m-1" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    validate={(value) => {
                        if (value.length < 8) {
                            return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                        }
                        return null;
                    }}
                >
                    <Label>পাসওয়ার্ড</Label>
                    <Input
                        placeholder="কমপক্ষে ৮ অক্ষর"
                        className="p-2 bg-gray-200 w-full rounded-[10px] border border-gray-500 m-1"
                    />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    validate={(value) => {
                        if (value && value !== password) {
                            return "পাসওয়ার্ড দুটি মিলছে না";
                        }
                        return null;
                    }}
                >
                    <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                    <Input
                        placeholder="আবার পাসওয়ার্ড লিখুন"
                        className="p-2 bg-gray-200 w-full rounded-[10px] border border-gray-500 m-1"
                    />
                    <FieldError />
                </TextField>

                <div className="flex gap-2">
                    <Button type="submit" className="bg-green-400 rounded-[10px] p-3 w-full">
                        {/* <Check /> */}
                        অ্যাকাউন্ট তৈরি করুন
                    </Button>
                </div>
            </Form>

            <Button onClick={handleSignUnGoogle} className="flex items-center justify-center gap-2">
                <FcGoogle />
                Google দিয়ে চালিয়ে যান
            </Button>

            <div>
                <h1>অ্যাকাউন্ট আছে? <Link href="/sign-in" className="text-blue-500 hover:underline">সাইন ইন করুন</Link></h1>
            </div>

        </div>
    );
}

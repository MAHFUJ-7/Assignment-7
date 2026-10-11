"use client";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";

const SignInPage = () => {
    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(
            formData.entries(),
        )

        // Perform your sign-in logic here, e.g., send data to your API
        const { data: resData, error } = await signIn.email({
            email: data.email,
            password: data.password,
            rememberMe: true,
            callbackURL: "/",
        })
        router.push("/");
        router.refresh();
    };

    const handleSignInGoogle = async () => {
        const data = await signIn.social({
            provider: "google",
        })
    }


    return (
        <div className="flex  flex-col items-center text-starts p-3 justify-center gap-4 bg-gray-100 text-foreground">
            <h1 className="text-2xl font-bold">সাইন ইন</h1>
            <p>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</p>
            <Form
                className="flex w-96 flex-col gap-4 content-center bg-[#e7e9e3] p-5 rounded-[10px]"
                onSubmit={onSubmit}
            >
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
                    validate={(value) => {
                        if (value.length < 8) {
                            return "পাসওয়ার্ড কমপক্ষে 8 অক্ষরের হতে হবে";
                        }
                        return null;
                    }}
                >
                    <Label>পাসওয়ার্ড</Label>
                    <Input placeholder="আপনার পাসওয়ার্ড লিখুন" className="p-2 bg-gray-200 w-full rounded-[10px] border border-gray-500 m-1" />
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit" className="bg-green-400 rounded-[10px] p-3 w-full">
                        {/* <Check /> */}
                        সাইন ইন
                    </Button>

                </div>
            </Form>
            <p></p>
            <Button onClick={handleSignInGoogle} className="flex items-center justify-center gap-2">
                <FcGoogle />
                Google দিয়ে চালিয়ে যান
            </Button>
            
            <div>
                <h1>অ্যাকাউন্ট নেই? <Link href="/sign-up" className="text-blue-500 hover:underline">সাইন আপ করুন</Link></h1>
            </div>

        </div>
    );
};

export default SignInPage;

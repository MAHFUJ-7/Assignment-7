"use client";
import React from 'react'
import { Form, TextField, Label, Input, FieldError, Button } from "@heroui/react";
import { updateUser } from '@/lib/auth-client';
import { toast } from "@heroui/react";

const UpdateProfile = () => {

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // Do something with the form data, e.g., submit it to a server
    const { data: resData, error } = await updateUser({
            name: data.name,
        });
        if (error) {
            console.error('Error updating profile:', error);
            toast.error("প্রোফাইল আপডেট করতে ব্যর্থ হয়েছে।");
        } else {
            toast.success("প্রোফাইল আপডেট করা হয়েছে।");
        }
    };

    return (
        <div>
            <h1>তথ্য</h1>
            <Form
                className="flex w-96 flex-col gap-4 content-center bg-[#e7e9e3] p-5 rounded-[10px]"
                onSubmit={handleUpdateProfile}
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

                <div className="flex gap-2">
                    <Button type="submit" className="bg-green-400 rounded-[10px] p-3 w-full">
                        {/* <Check /> */}
                        আপডেট 
                    </Button>
                </div>

            </Form>
        </div>
    )
}

export default UpdateProfile
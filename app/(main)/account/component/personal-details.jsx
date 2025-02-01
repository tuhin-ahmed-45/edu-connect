'use client';

import { updateUserInfo } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useState } from "react";
import { toast } from "sonner";

const PersonalDetails = ({ userInfo }) => {
    const [user, setUser] = useState({
        "firstName": userInfo.firstName,
        "lastName": userInfo.lastName,
        "email": userInfo.email,
        "designation": userInfo.designation,
        "bio": userInfo.bio
    });

    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [field]: value
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            await updateUserInfo(userInfo?.email, user);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error(`Failed to update profile : ${error?.message}`);
        }
    }

    return (
        <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
            <h5 className="text-lg font-semibold mb-4">Personal Detail</h5>
            <form onSubmit={handleUpdate}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">
                            First Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="First Name"
                            id="firstName"
                            name="firstName"
                            value={user?.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Last Name <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={user?.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">
                            Your Email <span className="text-red-600">*</span>
                        </Label>
                        <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={user?.email}
                            disabled
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Designation</Label>
                        <Input
                            name="designation"
                            id="designation"
                            type="text"
                            value={user?.designation}
                            onChange={handleChange}
                            placeholder="Designation"
                        />
                    </div>
                </div>
                {/*end grid*/}
                <div className="grid grid-cols-1">
                    <div className="mt-5">
                        <Label className="mb-2 block">Bio</Label>
                        <Textarea
                            id="bio"
                            name="bio"
                            value={user?.bio}
                            onChange={handleChange}
                            placeholder="Bio"
                        />
                    </div>
                </div>
                {/*end row*/}
                <Button className="mt-5 cursor-pointer" asChild>
                    <input type="submit" name="send" value="Save Changes" />
                </Button>
            </form>
            {/*end form*/}
        </div>
    )
}

export default PersonalDetails
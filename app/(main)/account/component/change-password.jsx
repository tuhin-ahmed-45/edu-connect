'use client';

import { updateUserPassword } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const ChangePassword = ({ email }) => {
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const field = e.target.name;
        const value = e.target.value;

        setPassword({
            ...password,
            [field]: value,
        });

        // Clear error if user updates fields
        if (field === "confirmPassword" || field === "newPassword") {
            setError("");
        }
    };

    const doPasswordUpdate = async (e) => {
        e.preventDefault();
    
        if (password.newPassword !== password.confirmPassword) {
            setError("New password and Re-type New password do not match.");
            return;
        }
    
        // Proceed with password update
        try {
            await updateUserPassword(email, password.oldPassword, password.newPassword);
            toast.success("Password updated successfully!");
        } catch (error) {
            console.error("Error updating password:", error.message);
            toast.error(error.message || "Error updating password. Please try again.");
        }
    };    

    return (
        <div>
            <h5 className="text-lg font-semibold mb-4">Change password</h5>
            <form onSubmit={doPasswordUpdate}>
                <div className="grid grid-cols-1 gap-5">
                    <div>
                        <Label className="mb-2 block">Old password</Label>
                        <Input
                            type="password"
                            placeholder="Old password"
                            name="oldPassword"
                            id="oldPassword"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">New password</Label>
                        <Input
                            type="password"
                            placeholder="New password"
                            name="newPassword"
                            id="newPassword"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <Label className="mb-2 block">Re-type New password</Label>
                        <Input
                            type="password"
                            placeholder="Re-type New password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                <Button className="mt-5" type="submit">
                    Save password
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;

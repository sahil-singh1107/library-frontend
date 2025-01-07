import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const url = import.meta.env.VITE_SIGNIN_ENPOINT!;

const formSchema = z.object({
    email: z.string().email({ message: "Enter a valid email" }),
    password: z.string().min(8, { message: "Password must contain 8 characters" }),
});

const Signin = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>("");
    const { toast } = useToast();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const { email, password } = values;
        try {
            setIsLoading(true);
            const res = await axios.post(url, {
                email,
                password,
            });
            toast({
                variant: "default",
                title: res.data.message,
            });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("email", res.data.email);
            navigate("/");
        } catch (error: any) {
            console.log(error);
            toast({
                variant: "destructive",
                title: error.response.data.message,
            });
        }
        setIsLoading(false);
    }

    const handleOtpSubmit = () => {
        if (value === "110703") {
            toast({
                variant: "default",
                title: "Access granted to Admin",
            });
            setIsDialogOpen(false);
            navigate("/admin")
        } else {
            toast({
                variant: "destructive",
                title: "Invalid OTP. Please enter the correct passkey.",
            });
        }
    };

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-[#1a1d21] border-none">
                    <DialogHeader>
                        <DialogTitle className="text-white font-title2">Admin Access Verification</DialogTitle>
                        <DialogDescription className="w-full mt-4">
                            <InputOTP maxLength={6} className="" value={value} onChange={(value) => setValue(value)}>
                                <InputOTPGroup className="flex justify-between w-full mt-6 text-white font-title2">
                                    <InputOTPGroup className="flex justify-between w-full mt-6 text-white font-title2">
                                        <InputOTPSlot index={0} className="border-[#27262B]" />
                                        <InputOTPSlot index={1} className="border-[#27262B]" />
                                        <InputOTPSlot index={2} className="border-[#27262B]" />
                                        <InputOTPSlot index={3} className="border-[#27262B]" />
                                        <InputOTPSlot index={4} className="border-[#27262B]" />
                                        <InputOTPSlot index={5} className="border-[#27262B]" />
                                    </InputOTPGroup>
                                </InputOTPGroup>
                            </InputOTP>
                            <Button
                                onClick={handleOtpSubmit}
                                className="mt-4 w-full bg-yellow-500 text-white font-title2 hover:bg-yellow-500"
                            >
                                Submit OTP
                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

            <div className="bg-[#010100] min-h-screen flex flex-col items-center justify-center space-y-10 w-full text-center">
                <span className="text-white font-title2 font-semibold text-3xl typing-effect transition duration-75">
                    Enter your details to Login
                </span>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 w-[35%] p-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-labels font-title2">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="johndoe@gmail.com"
                                            {...field}
                                            className="bg-[#1A1C20] text-white font-title2 border-[#363a3d] hover:translate-y-[-10%]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="form-labels font-title2">
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder=""
                                            {...field}
                                            className="bg-[#1A1C20] text-white border-[#363A3D] font-title2 hover:translate-y-[-10%]"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={isLoading}
                            className="w-full text-white bg-yellow-500 font-title2 hover:bg-yellow-500"
                            type="submit"
                        >
                            Submit
                        </Button>
                        <div className="bg-[#363a3d] w-full h-[0.5px]"></div>
                        <div className="flex justify-between">
                            <span
                                className="text-white hover:underline hover:cursor-pointer"
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                Sign up
                            </span>
                            <span
                                className="text-[#24AE7C] hover:underline hover:cursor-pointer"
                                onClick={() => {
                                    setIsDialogOpen(true);
                                }} // Open the dialog on Admin link click
                            >
                                Admin
                            </span>
                        </div>
                    </form>
                </Form>
            </div>

        </>
    );
};

export default Signin;

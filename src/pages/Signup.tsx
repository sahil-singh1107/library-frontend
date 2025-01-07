import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const url = import.meta.env.VITE_SIGNUP_ENPOINT!;

const formSchema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(8, { message: "Password must contain 8 characters" }),
  firstName: z
    .string()
    .min(3, { message: "First name should be at least 3 characters long" }),
  lastName: z
    .string()
    .min(3, { message: "Last name should be at least 3 characters long" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Enter a valid phone number" })
    .max(10, { message: "Enter a valid phone number" }),
});

const Signup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password, firstName, lastName, phoneNumber } = values;
    try {
      setIsLoading(true);
      const res = await axios.post(url, {
        email,
        password,
        firstName,
        lastName,
        phone_number: phoneNumber,
      });
      toast({
        variant: "default",
        title: res.data.message,
      });
      navigate("/signin");
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    }
    setIsLoading(false);
  }

  return (
    <div className="bg-[#010100] min-h-screen flex flex-col items-center justify-center space-y-10">
      <span className="text-white font-title2 font-semibold text-3xl">
        Enter your details to continue
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
                <FormLabel className="form-labels font-title2">Email</FormLabel>
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
              <FormItem className="relative">
                <FormLabel className="form-labels font-title2">Password</FormLabel>
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
          <div className="flex space-x-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="form-labels font-title2">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      className="bg-[#1A1C20] text-white border border-[#363A3D] font-title2 hover:translate-y-[-10%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="form-labels font-title2">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      className="bg-[#1A1C20] text-white border-[#363A3D] font-title2 hover:translate-y-[-10%]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="form-labels font-title2">Phone Number</FormLabel>
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
          <div className="bg-[#363a3d] w-full h-[0.5px]" />
          <div className="text-center mt-4">
            <span
              className="text-white hover:underline hover:cursor-pointer"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Login
            </span>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Signup;

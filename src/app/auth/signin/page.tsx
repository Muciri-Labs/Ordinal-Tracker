"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signinSchema } from "@/lib/types";
import type { TSignInSchema } from "@/lib/types";
import {
  IconBrandGoogleFilled,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";
import { signinUser } from "@/actions/signinUser";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("user=invalid-credentials")) {
      form.setError("email", {
        type: "manual",
        message: "email or passoword is incorrect or does not exist",
      });
    }
    if (window.location.search.includes("user=account-exists")) {
      form.setError("email", {
        type: "manual",
        message: "account already exists with this email address",
      });
    }

    window.history.pushState({}, "", "/auth/signin");
    removeCookie("jwt-token");
  }, []);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: TSignInSchema) => {
    // console.log("calling signinUser with data: ", data);
    const response = await signinUser(data);

    console.log("response: ", response);

    if (response.success) {
      console.log("Sign in successful");
      setCookie("jwt-token", response.jwt, { path: "/" });

      form.reset();

      router.push("/dashboard");
    } else {
      form.setError("email", {
        type: "manual",
        message: response.error,
      });

      // console.error("password is incorrect");

      return;
    }
  };

  const onGoogleSubmit = async () => {
    form.reset();

    // form.formState.isSubmitting = true;

    try {
      //link-dependency
      window.location.href =
      "https://ordinal-tracker-nest-be-7be2.onrender.com/auth/google-signin";

      // window.location.href = "http://localhost:3000/auth/google-signin";

      // window.location.href = "http://192.168.0.102:3000/auth/google-signin"
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container flex justify-center items-center h-[100vh]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-zinc-50 border-2 border-solid p-6 rounded-lg w-[20vw]"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="********"
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    >
                      {showPassword ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={() => {
              router.push("/auth/forgot-password");
            }}
          >
            <div className="w-full text-right">forgot password?</div>
          </Button>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            Login
          </Button>

          <hr className="mt-4 opacity-50 rounded-3xl" />

          <Button
            type="button"
            className="w-full mt-4"
            onClick={onGoogleSubmit}
            disabled={form.formState.isSubmitting}
          >
            <IconBrandGoogleFilled />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Page;

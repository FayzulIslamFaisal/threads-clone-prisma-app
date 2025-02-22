"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast, ToastContainer } from "react-toastify";

const loginPage = () => {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await UserLogin(authState);
        console.log(response, "<<<====log response");

        if (response?.error) {
          toast.error(response.error);
        } else {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => router.push("/"), 2000); // Redirect after 2s
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };
  return (
    <>
      <ToastContainer />

      <div className=" bg-background">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
            <div className="flex justify-center"></div>
            <h1 className="text-2xl font-bold">Login</h1>
            <p>welcome back</p>
            <div className="mt-2">
              <form onSubmit={handleSubmit}>
                <div className="pb-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your Email..."
                    id="email"
                    name="email"
                    value={authState.email}
                    onChange={(e) =>
                      setAuthState({ ...authState, email: e.target.value })
                    }
                  />
                </div>
                <div className="pb-4">
                  <Label htmlFor="password">password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    id="password"
                    name="password"
                    value={authState.password}
                    onChange={(e) =>
                      setAuthState({ ...authState, password: e.target.value })
                    }
                  />
                </div>

                <div className="pb-4">
                  <Button className="w-full" disabled={isPending}>
                    {isPending ? "Loading..." : "Login"}
                  </Button>
                </div>
                <div className="">
                  <span> Dont Have a Account? </span>
                  <Link href="/register" className=" text-orange-500 font-bold">
                    Register Now
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loginPage;

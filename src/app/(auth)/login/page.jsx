"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const loginPage = () => {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
    error: null,
    isLoading: false,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className=" bg-background">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            <Image />
          </div>
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
                  value={authState.password}
                  onChange={(e) =>
                    setAuthState({ ...authState, password: e.target.value })
                  }
                />
              </div>
              
              <div className="pb-4">
                <Button className=" w-full">Login</Button>
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
  );
};

export default loginPage;

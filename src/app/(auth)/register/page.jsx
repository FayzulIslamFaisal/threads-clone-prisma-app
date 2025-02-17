"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [authState, setAuthState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
          <h1 className="text-2xl font-bold">Register</h1>
          <p>welcome to the threads</p>
          <div className="mt-2">
            <form onSubmit={handleSubmit}>
              <div className="pb-4">
                <Label htmlFor="name">name</Label>
                <Input
                  type="name"
                  placeholder="Enter your name..."
                  id="name"
                  value={authState.name}
                  onChange={(e) =>
                    setAuthState({ ...authState, email: e.target.value })
                  }
                />
              </div>
              <div className="pb-4">
                <Label htmlFor="username">username</Label>
                <Input
                  type="username"
                  placeholder="Enter your username..."
                  id="username"
                  value={authState.username}
                  onChange={(e) =>
                    setAuthState({ ...authState, email: e.target.value })
                  }
                />
              </div>
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
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="confirmPassword"
                  placeholder="Enter your confirmPassword..."
                  id="confirmPassword"
                  value={authState.confirmPassword}
                  onChange={(e) =>
                    setAuthState({
                      ...authState,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="pb-4">
                <Button className=" w-full">Login</Button>
              </div>
              <div className="">
                <span> already have an Account? </span>
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

export default RegisterPage;

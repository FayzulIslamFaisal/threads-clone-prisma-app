"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify"; // Import React Toastify
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import Image from "next/image";
import Link from "next/link";
import { UserPostRegister } from "@/app/sevices/UserPostRegister";
// import { UserPostRegister } from "@/utils/api"; // Ensure this function exists and is correctly imported

const RegisterPage = () => {
  const [authState, setAuthState] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    startTransition(async () => {
      try {
        const response = await UserPostRegister(authState);

        if (response?.status === 400) {
          setError(response.message);
          toast.error(response.message);
        } else {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => router.push("/login"), 2000); // Redirect after 2s
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <>
      <ToastContainer />

      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="w-full md:w-1/3 mx-2 bg-muted p-6 rounded-lg">
          <div className="flex justify-center">
            {/* <Image src="/logo.png" alt="Logo" width={50} height={50} /> */}
          </div>
          <h1 className="text-2xl font-bold text-center">Register</h1>
          <p className="text-center">Welcome to the Threads</p>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="pb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name..."
                value={authState.name}
                onChange={(e) =>
                  setAuthState({ ...authState, name: e.target.value })
                }
              />
            </div>
            {error && (
              <div className="py-3">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="pb-4">
              <Label htmlFor="username">Username</Label>
              <Input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username..."
                value={authState.username}
                onChange={(e) =>
                  setAuthState({ ...authState, username: e.target.value })
                }
              />
            </div>
            {error && (
              <div className="py-3">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="pb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email..."
                value={authState.email}
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
            </div>
            {error && (
              <div className="py-3">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="pb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password..."
                value={authState.password}
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
            </div>
            {error && (
              <div className="py-3">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="pb-4">
              <Label htmlFor="password_confirmation">Confirm Password</Label>
              <Input
                type="password"
                id="password_confirmation"
                name="password_confirmation"
                placeholder="Confirm your password..."
                value={authState.password_confirmation}
                onChange={(e) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>
            {error && (
              <div className="py-3">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            <div className="pb-4">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Registering..." : "Register"}
              </Button>
            </div>
            <div className="text-center">
              <span>Already have an account? </span>
              <Link href="/login" className="text-orange-500 font-bold">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;

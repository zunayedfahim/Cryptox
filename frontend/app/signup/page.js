"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Cryptox from "@/components/Cryptox";
import { useStore } from "@/app/store";
import { getCookie } from "../auth";

const page = () => {
  const router = useRouter();
  const { user } = useStore();
  const token = getCookie("token");

  const SignUp = async (e) => {
    const username = e.get("username").toString();
    const email = e.get("email").toString();
    const password = e.get("password").toString();
    const confirmPassword = e.get("confirm-password").toString();

    if (!username || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      toast.error("Password didn't match.");
      return;
    }

    const user = { username, email, password };

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      toast.success("Registered Successfully! Please Sign in.");
      router.push("/signin");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const authenticate = () => {
      if (token) {
        toast.info("You're already Signed in.");
        router.push("/dashboard");
      }
    };
    authenticate();
  }, []);

  return (
    <section className="bg-customBlack pt-20 pb-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Cryptox />
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-customGray border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Create an account
            </h1>
            <form action={SignUp} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Username
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="border-none sm:text-sm rounded-lg block w-full p-2.5 bg-customBlack placeholder-gray-400 text-white focus:ring-customGreen focus:border-customGreen"
                  placeholder="username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  id="email"
                  className="border-none sm:text-sm rounded-lg block w-full p-2.5 bg-customBlack placeholder-gray-400 text-white focus:ring-customGreen focus:border-customGreen"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border-none sm:text-sm rounded-lg block w-full p-2.5 bg-customBlack placeholder-gray-400 text-white focus:ring-customGreen focus:border-customGreen"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="border-none sm:text-sm rounded-lg block w-full p-2.5 bg-customBlack placeholder-gray-400 text-white focus:ring-customGreen focus:border-customGreen"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full hover:opacity-90 shadow-xl text-customDarkGreen font-medium focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center bg-customGreen focus:ring-customGreen"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium hover:underline text-customGreen"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;

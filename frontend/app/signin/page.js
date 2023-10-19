"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getCookie, isLoggedIn, setCookie } from "../auth";
import { toast } from "react-toastify";
import Cryptox from "@/components/Cryptox";
import { useStore } from "@/app/store";

export default function page() {
  const router = useRouter();
  const { user, setUser } = useStore();

  const SignIn = async (e) => {
    const email = e.get("email").toString();
    const password = e.get("password").toString();

    if (!email || !password) return;

    const user = { email, password };

    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      setCookie("token", data.token);
      const response = await isLoggedIn();
      toast.success("Sign In Successful!");
      setUser(response);
      router.push("/dashboard");
    } else {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const authenticate = () => {
      const token = getCookie("token");
      if (token) {
        toast.info("You're already Signed in.");
        router.push("/dashboard");
      }
    };
    authenticate();
  }, []);

  return (
    <section className="bg-customBlack pt-20 pb-10">
      <div className="flex flex-col items-center justify-start px-6 py-8 min-h-screen mx-auto lg:py-0">
        <Cryptox />
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-customGray border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form action={SignIn} className="space-y-4 md:space-y-6">
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
                  pattern="[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+(\.[-a-zA-Z0-9~!$%^&amp;*_=+}{'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.([cC][oO][mM]))(:[0-9]{1,5})?"
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
              <button
                type="submit"
                className="w-full hover:opacity-90 shadow-xl text-customDarkGreen font-medium focus:ring-4 focus:outline-nonefont-medium rounded-lg text-sm px-5 py-2.5 text-center bg-customGreen focus:ring-customGreen"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="signup"
                  className="font-medium hover:underline text-customGreen"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

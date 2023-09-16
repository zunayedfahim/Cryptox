"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { getCookie, isLoggedIn } from "../auth";
import { useRouter } from "next/navigation";
import { useStore } from "../store";

const layout = ({ children }) => {
  const router = useRouter();
  const { user, setUser, removeUser } = useStore();

  useEffect(() => {
    const authenticate = async () => {
      const token = getCookie("token");
      if (!token) {
        removeUser();
        router.push("/signin");
      } else if (!user) {
        const data = await isLoggedIn();
        setUser(data);
      }
    };
    authenticate();
  }, [user]);

  return (
    <div className="min-h-screen text-customWhite flex">
      <Sidebar />
      <div className="bg-customGray flex-1 px-10 py-5">
        <TopBar />
        <div className="pt-10">{children}</div>
      </div>
    </div>
  );
};

export default layout;

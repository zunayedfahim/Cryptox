import Cryptox from "./Cryptox";
import Link from "next/link";
import profile from "@/assets/profile.jpeg";
import Image from "next/image";
import { MdDashboardCustomize } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { BsFillCreditCardFill } from "react-icons/bs";
import { LuHistory } from "react-icons/lu";
import { RiStockFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { useStore } from "@/app/store";

const Sidebar = () => {
  const pathname = usePathname().split("/")[2] || "/";
  const { user } = useStore();

  return (
    <div className="flex flex-col w-[20%] bg-customBlack">
      {/* Current Balance */}
      <div className="px-8 py-8">
        <Cryptox />
        <h1>{user?.current_balance || "0.00"} USD</h1>
      </div>

      {/* Menu */}
      <div className="flex flex-col gap-3 mb-20">
        <Link
          href="/dashboard"
          className={`flex items-center gap-3 px-16 py-2 ${
            pathname === "/" &&
            "bg-customDarkGreen border-r-2 border-customGreen text-customGreen"
          }`}
        >
          <MdDashboardCustomize />
          Overview
        </Link>
        <Link
          href="/dashboard/wallet"
          className={`flex items-center gap-3 px-16 py-3 ${
            pathname === "wallet" &&
            "bg-customDarkGreen border-r-2 border-customGreen text-customGreen"
          }`}
        >
          <GiWallet />
          Wallet
        </Link>
        <Link
          href="/dashboard/trade"
          className={`flex items-center gap-3 px-16 py-3 ${
            pathname === "trade" &&
            "bg-customDarkGreen border-r-2 border-customGreen text-customGreen"
          }`}
        >
          <BsFillCreditCardFill />
          Trade
        </Link>
        <Link
          href="/dashboard/history"
          className={`flex items-center gap-3 px-16 py-3 ${
            pathname === "history" &&
            "bg-customDarkGreen border-r-2 border-customGreen text-customGreen"
          }`}
        >
          <LuHistory />
          History
        </Link>
        <Link
          href="/dashboard/staking"
          className={`flex items-center gap-3 px-16 py-3 ${
            pathname === "staking" &&
            "bg-customDarkGreen border-r-2 border-customGreen text-customGreen "
          }`}
        >
          <RiStockFill />
          Staking
        </Link>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3 px-8 pb-5">
        <Image
          src={profile}
          className="w-10 h-10 rounded-lg"
          alt="profilePic"
        />
        <div className="">
          <h1>{user?.username}</h1>
          <h1 className="text-xs">{user?.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

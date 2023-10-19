"use client";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { usePathname } from "next/navigation";

function TradeMenu() {
  const pathname = usePathname().split("/")[3] || "/";
  return (
    <div className="flex gap-5">
      <Link href="/dashboard/trade/">
        <CustomButton name="Buy" type={pathname === "/" && "primary"} />
      </Link>
      <Link href="/dashboard/trade/sell">
        <CustomButton name="Sell" type={pathname === "sell" && "primary"} />
      </Link>
      <Link href="/dashboard/trade/swap">
        <CustomButton name="Swap" type={pathname === "swap" && "primary"} />
      </Link>
    </div>
  );
}

export default TradeMenu;

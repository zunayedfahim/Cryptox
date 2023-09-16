"use client";
import { useStore } from "@/app/store";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

const page = () => {
  const { user } = useStore();
  return (
    <div>
      <div className="bg-customBlack rounded-xl p-5">
        <h1 className="pb-5">Available Balance</h1>
        <p className="text-5xl font-semibold">
          ${user?.current_balance.toLocaleString()}
        </p>
      </div>

      <div className="p-5 flex gap-5">
        <Link href="/dashboard/wallet/deposit">
          <CustomButton name="Deposit" type="primary" />
        </Link>
        <Link href="/dashboard/wallet/withdraw">
          <CustomButton name="Withdraw" type="secondary" />
        </Link>
      </div>
    </div>
  );
};

export default page;

"use client";
import CustomButton from "@/components/CustomButton";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const WalletForm = ({ name }) => {
  const { user } = useStore();
  const router = useRouter();

  const submitForm = async (e) => {
    const payment_method = e.get("payment_method").toString();
    const amount = e.get("amount").toString();

    if (name === "Withdraw" && user.current_balance < amount) {
      toast.error("Insufficient Balance.");
      return;
    }

    const req = {
      user_id: user.user_id,
      amount,
      method: payment_method,
    };

    const res = await fetch(`http://localhost:5000/${name.toLowerCase()}`, {
      method: "POST",
      cache: "no-cache",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      toast.success(data.message);
      user.current_balance =
        name === "Deposit"
          ? user.current_balance + +amount
          : user.current_balance - amount;
      router.push("/dashboard/wallet");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <form action={submitForm} className="flex flex-col gap-5">
      {/* Payment Method */}
      <div className="flex flex-col gap-3">
        <p>Please select your payment method:</p>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="mobile_banking"
            name="payment_method"
            value="Mobile Banking"
            className="focus:ring-0 focus:ring-offset-0 text-customGreen border-0 bg-customWhite/50"
            required
          />
          <label htmlFor="mobile_banking">Mobile Banking</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="internet_banking"
            name="payment_method"
            value="Internet Banking"
            className="focus:ring-0 focus:ring-offset-0 text-customGreen border-0 bg-customWhite/50"
            required
          />
          <label htmlFor="internet_banking">Internet Banking</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="card"
            name="payment_method"
            value="Card"
            className="focus:ring-0 focus:ring-offset-0 text-customGreen border-0 bg-customWhite/50"
            required
          />
          <label htmlFor="card">Card</label>
        </div>
      </div>

      {/* Amount */}
      <div className="">
        <label htmlFor="amount" className="block mb-2 text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          pattern="/^[0-9]+$/"
          className="w-full bg-customGray outline-none border-none rounded-md focus:outline-none focus:ring-customGreen appearance-none"
          required
          step="any"
          placeholder="0.00"
        />
      </div>

      <div className="flex items-center justify-center w-full gap-10">
        <Link href="/dashboard/wallet">
          <CustomButton name="Cancel" />
        </Link>
        <button type="submit">
          <CustomButton name={name} type="primary" />
        </button>
      </div>
    </form>
  );
};

export default WalletForm;

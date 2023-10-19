"use client";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CryptoCard from "./CryptoCard";

function BuyForm({ cryptos }) {
  const { user } = useStore();
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState("");

  const selectCoin = (e) => {
    const coin = cryptos.find((a) => a.id === e.target.value);
    setSelectedCrypto(coin);
  };

  const buyCrypto = async (e) => {
    const quantity = e.get("quantity");

    if (user.current_balance < selectedCrypto.current_price * quantity) {
      toast.error("Insufficient Balance");
      return;
    }

    const req = {
      user_id: user.user_id,
      crypto_id: selectedCrypto.id,
      name: selectedCrypto.name,
      symbol: selectedCrypto.symbol,
      image: selectedCrypto.image,
      buying_price: selectedCrypto.current_price,
      quantity: quantity,
      total_amount: selectedCrypto.current_price * quantity,
    };

    const res = await fetch("http://localhost:5000/buyCrypto", {
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
      user.current_balance = user.current_balance - req.total_amount;
      router.push("/dashboard/staking");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <form action={buyCrypto} className="">
        <div className="flex gap-5">
          <select
            required
            name="coin"
            autoFocus
            onChange={selectCoin}
            className="bg-customGray border border-customGreen rounded-lg focus:border-customGreen focus:ring-customGreen outline-none"
          >
            <option value="" className="text-customWhite/50">
              Please Select a Coin
            </option>
            {cryptos?.map((item, index) => {
              return (
                <option key={index} className="flex gap-5" value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          {/* Quantity */}
          <input
            type="number"
            id="quantity"
            name="quantity"
            pattern="/^[0-9]+$/"
            className="bg-customGray outline-none border-customGreen focus:border-customGreen rounded-md focus:outline-none focus:ring-customGreen appearance-none"
            required
            step="any"
            placeholder="Quantity (e.g. 0.00)"
          />
          <button type="submit">
            <CustomButton name="Buy" type="primary" />
          </button>
        </div>
      </form>
      {/* Show coin info */}
      {selectedCrypto && (
        <div className="mt-5 p-5 flex flex-col gap-5 bg-customGray rounded-lg">
          <CryptoCard crypto={selectedCrypto} buy={true} />
        </div>
      )}
    </div>
  );
}

export default BuyForm;

"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import Image from "next/image";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import CryptoCard from "./CryptoCard";

function SellForm({ cryptos }) {
  const { user } = useStore();
  const router = useRouter();
  const [holdings, setHoldings] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [selectedHoldings, setSelectedHoldings] = useState("");

  useEffect(() => {
    const getHoldings = async () => {
      const res = await fetch("http://localhost:5000/getHoldings", {
        method: "POST",
        cache: "no-cache",
        body: JSON.stringify({ user_id: user?.user_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.ok) {
        setHoldings(data);
      }
    };
    getHoldings();
  }, [holdings]);

  const selectCoin = (e) => {
    const coin = cryptos.find((a) => a.id === e.target.value);
    const myHoldings = holdings.find((a) => a.crypto_id === coin.id);
    setSelectedCrypto({
      ...coin,
      quantity: myHoldings.quantity,
      total_amount: myHoldings.total_amount,
    });
    setSelectedHoldings(myHoldings);
  };

  const sellCrypto = async (e) => {
    const req = {
      user_id: user.user_id,
      symbol: selectedCrypto.symbol,
      selling_price: selectedCrypto.current_price,
      quantity: selectedCrypto.quantity,
      total_amount: selectedCrypto.quantity * selectedCrypto.current_price,
    };

    const res = await fetch("http://localhost:5000/sellCrypto", {
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
      user.current_balance = user.current_balance + req.total_amount;
      router.push("/dashboard/history");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <form action={sellCrypto} className="">
        <div className="flex gap-5">
          <select
            required
            name="coin"
            autoFocus
            onChange={selectCoin}
            className="bg-customGray border border-customGreen rounded-lg focus:border-customGreen focus:ring-customGreen focus:outline-none"
          >
            <option value="" className="text-customWhite/50">
              Please Select a Coin
            </option>
            {holdings?.map((item, index) => {
              return (
                <option
                  key={index}
                  className="flex gap-5"
                  value={item.crypto_id}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
          <button type="submit">
            <CustomButton name="Sell" type="primary" />
          </button>
        </div>
      </form>
      {/* Show coin info */}
      {selectedCrypto && (
        <div className="mt-5 p-5 flex flex-col gap-5 bg-customGray rounded-lg">
          <CryptoCard crypto={selectedCrypto} buy={false} />
        </div>
      )}
    </div>
  );
}

export default SellForm;

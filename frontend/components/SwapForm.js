"use client";
import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useStore } from "@/app/store";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineSwap } from "react-icons/ai";
import CryptoCard from "./CryptoCard";

function SwapForm({ cryptos }) {
  const { user } = useStore();
  const router = useRouter();
  const [holdings, setHoldings] = useState([]);
  const [availableCryptos, setAvailableCryptos] = useState([]);
  const [fromCrypto, setFromCrypto] = useState("");
  const [toCrypto, setToCrypto] = useState("");

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

  const selectFromCrypto = (e) => {
    const coin = cryptos.find((a) => a.id === e.target.value);
    const myHoldings = holdings.find((a) => a.crypto_id === coin.id);
    const availableCoin = cryptos.filter((a) => a.id !== e.target.value);
    setFromCrypto({
      ...coin,
      quantity: myHoldings.quantity,
      total_amount: myHoldings.total_amount,
    });
    setAvailableCryptos(availableCoin);
  };

  const selectToCrypto = (e) => {
    const coin = cryptos.find((a) => a.id === e.target.value);
    const quantity = fromCrypto.total_amount / coin.current_price;

    setToCrypto({ ...coin, quantity, total_amount: fromCrypto.total_amount });
  };

  const swapCrypto = async (e) => {
    const req = {
      user_id: user.user_id,
      fromSymbol: fromCrypto.symbol,
      toCrypto_id: toCrypto.id,
      name: toCrypto.name,
      toSymbol: toCrypto.symbol,
      image: toCrypto.image,
      buying_price: toCrypto.current_price,
      quantity: toCrypto.quantity,
      total_amount: toCrypto.total_amount,
    };

    const res = await fetch("http://localhost:5000/swapCrypto", {
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
      router.push("/dashboard/staking");
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div>
      <form action={swapCrypto} className="">
        <div className="flex gap-5 items-center">
          {/* From Crypto */}
          <select
            required
            name="fromCrypto"
            autoFocus
            onChange={selectFromCrypto}
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

          <AiOutlineSwap className="text-customGreen text-3xl font-extrabold" />

          {/* To Crypto */}
          <select
            required
            name="toCrypto"
            autoFocus
            onChange={selectToCrypto}
            className="bg-customGray border border-customGreen rounded-lg focus:border-customGreen focus:ring-customGreen focus:outline-none"
          >
            <option value="" className="text-customWhite/50">
              Please Select a Coin
            </option>
            {availableCryptos?.map((item, index) => {
              return (
                <option key={index} className="flex gap-5" value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <button type="submit">
            <CustomButton name="Swap" type="primary" />
          </button>
        </div>
      </form>
      {/* Show coin info */}
      {fromCrypto && (
        <div className="mt-5 p-5 flex items-center gap-10 bg-customGray rounded-lg">
          <CryptoCard crypto={fromCrypto} buy={false} />
          <AiOutlineSwap className="text-customGreen text-3xl font-extrabold" />
          {toCrypto && <CryptoCard crypto={toCrypto} buy={false} />}
        </div>
      )}
    </div>
  );
}

export default SwapForm;

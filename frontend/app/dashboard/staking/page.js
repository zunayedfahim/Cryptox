"use client";
import { useStore } from "@/app/store";
import Image from "next/image";
import { useEffect, useState } from "react";

const page = () => {
  const { user } = useStore();
  const [stake, setStake] = useState([]);

  useEffect(() => {
    const fetchStaking = async () => {
      const res = await fetch("http://localhost:5000/getHoldings", {
        method: "POST",
        body: JSON.stringify({ user_id: user?.user_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      // const coins = data?.map(({ crypto }) => crypto).join("%2C");
      // const res2 = await fetch(
      //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coins}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
      // );
      // const data2 = await res2.json();
      // let combined = data.map((item) => ({
      //   ...item,
      //   coin: data2.filter((f) => f.id == item.crypto),
      // }));
      setStake(data);
    };
    fetchStaking();
  }, [stake]);
  return (
    <div>
      <h1 className="font-semibold pb-2">Staking</h1>
      <table className="table-auto w-full text-left text-sm bg-customBlack rounded-xl">
        <thead className="text-xs uppercase border-b border-customWhite/10">
          <tr>
            <th scope="col" className="px-6 py-3">
              Coin
            </th>
            <th scope="col" className="px-6 py-3">
              Buying Price
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {stake?.map((item, index) => {
            return (
              <tr key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap flex gap-5 items-center"
                >
                  <Image
                    src={item.image}
                    width={20}
                    height={20}
                    alt={item.name}
                    className="w-auto"
                  />
                  {item.name}{" "}
                  <span className="text-customWhite/70 text-xs">
                    {item.symbol.toUpperCase()}
                  </span>
                </th>
                <td className={`px-6 py-4 font-semibold text-sm`}>
                  ${item.buying_price.toLocaleString()}
                </td>
                <td className="px-6 py-4">{item.quantity.toLocaleString()}</td>
                <td className={`px-6 py-4 font-semibold text-sm`}>
                  ${item.total_amount.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default page;

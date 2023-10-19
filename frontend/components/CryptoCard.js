import Image from "next/image";
import React from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const CryptoCard = ({ crypto, buy }) => {
  return (
    <div className="flex flex-col gap-5">
      {/* Rank */}
      <h1 className="p-2 bg-customBlack rounded-lg w-fit">
        Rank #{crypto?.market_cap_rank}
      </h1>
      {/* Coin name, image, symbol */}
      <div className="flex gap-5 items-end">
        <Image src={crypto?.image} width={25} height={25} alt={crypto?.name} />
        <h1 className="text-xl font-semibold ">{crypto?.name}</h1>
        <p className="text-sm text-customWhite/50">
          {crypto?.symbol.toUpperCase()}
        </p>
      </div>

      {/* Price & change */}
      <div className="flex items-end gap-2">
        <h1 className="text-4xl font-semibold">
          ${crypto?.current_price.toLocaleString()}
        </h1>
        <p
          className={`${
            crypto?.price_change_percentage_24h >= 0
              ? "text-customGreen"
              : "text-customRed"
          } flex items-center`}
        >
          {crypto?.price_change_percentage_24h >= 0 ? (
            <BiSolidUpArrow />
          ) : (
            <BiSolidDownArrow />
          )}
          {crypto?.price_change_percentage_24h}%
        </p>
      </div>
      <div className="text-customWhite/50">
        {/* Market Cap, Total Volume */}
        <h1>Market Capital: ${crypto?.market_cap.toLocaleString()}</h1>
        <h1>Total Volume: {crypto?.total_volume.toLocaleString()}</h1>
      </div>
      {!buy && (
        <div>
          <h1>
            Quantity:
            <span className="font-semibold text-lg">
              {crypto.quantity.toLocaleString()}
            </span>
          </h1>
          <h1>
            Total Amount:{" "}
            <span className="font-semibold text-lg">
              ${crypto.total_amount.toLocaleString()}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default CryptoCard;

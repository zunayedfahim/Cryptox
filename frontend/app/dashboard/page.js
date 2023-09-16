import Image from "next/image";

const Overview = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20filecoin%2C%20cosmos%2C%20okb%2C%20monero%2C%20uniswap%2C%20chainlink%2C%20stellar%2C%20dai%2C%20litecoin%2C%20polkadot%2C%20tron%2C%20solana%2C%20dogecoin%2C%20cardano%2C%20ripple%2C%20binancecoin%2C%20tether&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  );
  const cryptos = await res.json();

  return (
    <div>
      <h1 className="font-semibold pb-2">Today's Market</h1>
      <table className="table-auto w-full text-left text-sm bg-customBlack rounded-xl">
        <thead className="text-xs uppercase border-b border-customWhite/10">
          <tr>
            <th scope="col" className="px-6 py-3">
              Coin
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Market Cap
            </th>
            <th scope="col" className="px-6 py-3">
              Total Volume
            </th>
            <th scope="col" className="px-6 py-3">
              Change Rate
            </th>
          </tr>
        </thead>
        <tbody>
          {cryptos?.map((item, index) => {
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
                <td className="px-6 py-4">
                  ${item.current_price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  ${item.market_cap.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {item.total_volume.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {parseFloat(item.price_change_percentage_24h)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;

import SwapForm from "@/components/SwapForm";

async function page() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  );
  const cryptos = await res.json();
  return (
    <div>
      <SwapForm cryptos={cryptos} />
    </div>
  );
}

export default page;

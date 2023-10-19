import SellForm from "@/components/SellForm";

const page = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
  );
  const cryptos = await res.json();

  return (
    <div>
      <SellForm cryptos={cryptos} />
    </div>
  );
};

export default page;

import TradeMenu from "@/components/TradeMenu";

const layout = ({ children }) => {
  return (
    <div className="">
      <TradeMenu />
      <div className="mt-5 p-5 bg-customBlack rounded-lg">{children}</div>
    </div>
  );
};

export default layout;

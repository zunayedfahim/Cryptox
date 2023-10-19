import WalletForm from "@/components/WalletForm";

const page = () => {
  return (
    <div className="bg-customBlack rounded-xl flex items-center justify-center mx-auto w-fit p-10 shadow-xl">
      <WalletForm name="Deposit" />
    </div>
  );
};

export default page;

import Cryptox from "@/components/Cryptox";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

const page = () => {
  return (
    <div className="bg-customBlack min-h-screen px-20 pt-5 text-white flex flex-col">
      <nav className="flex justify-between  border-b-[0.5px] border-customGray">
        <Cryptox />

        <div className="flex gap-5">
          <Link href="/signin">
            <CustomButton name="Sign In" type="primary" />
          </Link>
          <Link href="/signup">
            <CustomButton name="Sign Up" type="secondary" />
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center">
        <h1 className="text-5xl text-customGreen font-bold ">
          Welcome to Cryptox!
        </h1>
      </div>
    </div>
  );
};

export default page;

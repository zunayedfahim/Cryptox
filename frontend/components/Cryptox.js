import Link from "next/link";
import { IoFlash } from "react-icons/io5";

const Cryptox = () => {
  return (
    <Link
      href="/"
      className="flex items-center mb-6 text-2xl font-semibold text-white"
    >
      <div className="shadow-xl rounded-full w-8 h-8 mr-3 flex items-center justify-center text-7xl text-gray-900 bg-customGreen motion-safe:animate-pulse">
        <IoFlash />
      </div>
      Cryptox
    </Link>
  );
};

export default Cryptox;

import { useRouter } from "next/navigation";
import { removeCookie } from "../app/auth";
import { toast } from "react-toastify";
import { useStore } from "../app/store";
import CustomButton from "./CustomButton";

const TopBar = () => {
  const router = useRouter();
  const { user, removeUser } = useStore();
  const SignOut = () => {
    removeCookie("token");
    removeUser();
    toast.success("Signed Out Successfully!");
    router.push("/signin");
  };

  //   For Date
  let today = new Date();
  let dd = today.getDate();
  let mm = today.toLocaleString("default", { month: "short" });
  let yyyy = today.getFullYear();
  if (dd < 10) dd = "0" + dd;

  return (
    <div className="flex items-center">
      {/* Welcome Note */}
      <div className="flex-1">
        <h1 className="text-2xl">Good morning, {user?.username}!</h1>
        <p className="text-xs text-customWhite/50">
          {dd} {mm} {yyyy}
        </p>
      </div>

      {/* Options */}
      <button onClick={SignOut}>
        <CustomButton name="Sign Out" type="secondary" />
      </button>
    </div>
  );
};

export default TopBar;

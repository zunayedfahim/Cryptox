import CustomButton from "@/components/CustomButton";

const page = () => {
  return (
    <div className="bg-customBlack rounded-xl flex items-center justify-center mx-auto w-fit p-10 shadow-xl">
      <form action="#" className="flex flex-col gap-5">
        {/* Payment Method */}
        <div className="flex flex-col gap-3">
          <p>Please select your payment method:</p>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="mobile_banking"
              name="payment_method"
              value="Mobile Banking"
              className="focus:ring-0 focus:ring-offset-0 text-customGreen border-0 bg-customWhite/50"
            />
            <label for="mobile_banking">Mobile Banking</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="internet_banking"
              name="payment_method"
              value="Internet Banking"
              className="focus:ring-0 focus:ring-offset-0 text-customGreen border-0 bg-customWhite/50"
            />
            <label for="internet_banking">Internet Banking</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              id="card"
              name="payment_method"
              value="Card"
              className="focus:ring-0 focus:ring-offset-0 text-customGreen border-0 bg-customWhite/50"
            />
            <label for="card">Card</label>
          </div>
        </div>

        {/* Amount */}
        <div className="">
          <label for="amount" className="block mb-2 text-sm font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            pattern="/^[0-9]+$/"
            className="w-full bg-customGray outline-none border-none rounded-md focus:outline-none focus:ring-customGreen appearance-none"
            required
            step="any"
          />
        </div>

        <div className="flex items-center justify-center w-full">
          <button type="submit">
            <CustomButton name="Withdraw" type="primary" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;

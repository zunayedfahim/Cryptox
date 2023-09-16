const CustomButton = ({ name, type }) => {
  return (
    <div
      className={`px-3 py-2 rounded-lg text-sm shadow-inner ring-offset-1 ring-offset-customGreen ring-1 ring-customGreen font-semibold hover:opacity-90 ${
        type === "primary"
          ? "bg-customGreen text-customDarkGreen"
          : "bg-inherit text-customGreen"
      }`}
    >
      {name}
    </div>
  );
};

export default CustomButton;

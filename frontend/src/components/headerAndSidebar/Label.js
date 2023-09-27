import React from "react";

const Label = ({ children }) => {
  return (
    <>
      <div className="bg-[#D70F64] p-2 rounded text-white font-semibold">
        {children}
      </div>
    </>
  );
};

export default Label;

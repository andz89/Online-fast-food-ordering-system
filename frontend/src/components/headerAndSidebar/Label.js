import React from "react";

import { Outlet } from "react-router-dom";

const Label = ({ children }) => {
  return (
    <>
      <div className="bg-slate-700 p-2 rounded text-white font-semibold">
        {children}
      </div>
    </>
  );
};

export default Label;

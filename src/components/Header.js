import React from "react";

const Header = () => {
  return <>
  <div className="bg-pink-600 text-white flex items-center justify-between p-2"><div className="text-2xl font-semibold ">Dashboard
  <h6 className="text-lg">Online Fast Food Ordering System</h6>
  </div> 
  <ul className="flex items-center gap-4">
    
    <li className="bg-pink-500 p-1 rounded hover:cursor-pointer">Logout</li>
    </ul>
    </div></>;
};

export default Header;

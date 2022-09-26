import React from "react";

function Header() {
  return (
    <div className="container m-auto h-screen flex items-center justify-center flex-col">
      <div className="flex flex-col space-y-16 items-center justify-center backdrop-blur-sm px-16 py-8 rounded-xl bg-[rgba(255,255,255,0.05)]">
        <h1 className="text-9xl tracking-wider font-medium text-[rgba(255,255,255,0.7)]">
          Coming Soon
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <font className="text-[rgba(255,255,255,0.8)] text-[1.5rem] text-center tracking-widest">
            Come join us live on 30th September, 2022
          </font>
          <button className="text-xl bg-[rgba(255,255,255,0.3)] text-white font-bold px-8 py-2 rounded-xl">Register Now</button>
        </div>
      </div>
    </div>
  );
}

export default Header;

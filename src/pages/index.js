import React from "react";
import Link from "next/link";
import Global from "@/components/Global";

export default function index() {
  return (
    <Global>
      <div className="h-[75vh] flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <div className="w-64 h-64 md:w-[30rem] md:h-[30rem]">
            <img src="/logo.png" alt="" className="w-full" />
          </div>
        </div>
        <div className="flex px-4 md:px-0 flex-col text-[#1c7987] space-y-2 md:space-y-4 items-center">
          <font className="text-center text-custom text-2xl md:text-4xl first-letter:text-3xl md:first-letter:text-5xl uppercase tracking-wide">
            Center of excellence
          </font>
          <font className="text-xl text-center text-custom md:text-3xl uppercase tracking-wide">
            operating system environment
          </font>
        </div>
      </div>
      <div className="container m-auto h-auto md:h-[75vh] flex items-center justify-center flex-col">
        <div className="flex flex-col space-y-8 md:space-y-16 items-center justify-center md:backdrop-blur-sm px-4 py-4 md:px-16 md:py-8 md:rounded-xl md:bg-[rgba(255,255,255,0.2)]">
          <h1 className="text-5xl md:text-9xl text-center tracking-wider font-medium text-[#138099]">
            Coming Soon
          </h1>
          <div className="flex flex-col items-center space-y-4">
            <font className="text-[#138099] text-lg md:text-[1.5rem] text-center tracking-widest">
              Come join us live Soon
            </font>
            <Link
              href="/event"
              className="md:text-xl bg-[#8dd3d2] text-[#138099] font-bold px-4 md:px-8 py-2 rounded-xl"
            >
              All Events
            </Link>
          </div>
        </div>
      </div>
    </Global>
  );
}

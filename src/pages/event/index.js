import Global from "@/components/Global";
import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Loader from "@/components/Loader";

export default function Events({ data = [] }) {
  const [events, setEvents] = React.useState();
  useEffect(() => {
    axios.get("/api/event").then(({ data }) => {
      setEvents(data.data);
    });
  }, []);
  if (!events) {
    return (
      <Global>
        <Loader />
      </Global>
    );
  }

  return (
    <Global>
      <div className="flex flex-col items-center justify-center">
        <section className="body-font">
          <h1 className="flex item-center justify-center p-6 text-2xl text-white">
            All Events
          </h1>
          <div className="container px-5 py-6 mx-auto">
            <div className="flex flex-wrap -m-4 gap-[1%] p-3">
              {events.map((item, index) => (
                <Link
                  href={`event/${item.route}`}
                  key={index}
                  className="w-full  bg-[#1c7987]/50 mb-[1%]"
                >
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <Image
                      width={500}
                      height={500}
                      className="lg:h-48 md:h-36 w-full object-cover object-center"
                      src="/logo.png"
                      alt="blog"
                    />
                    <div className="p-6">
                      <h2 className="tracking-widest text-xs title-font font-medium text-white mb-1">
                        CATEGORY
                      </h2>
                      <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                        {item.eventName}
                      </h1>
                      <p className="leading-relaxed mb-3 text-white">
                        {item.eventDescription}
                      </p>
                      <div className="flex items-center flex-wrap ">
                        <span className="text-white mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          100
                        </span>
                        <span className="text-white inline-flex items-center leading-none text-sm">
                          <svg
                            className="w-4 h-4 mr-1"
                            stroke="currentColor"
                            stroke-width="2"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            viewBox="0 0 24 24"
                          >
                            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                          </svg>
                          6
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Global>
  );
}

/* eslint-disable react/no-unescaped-entities */
import Global from "@/components/Global";
import { connectDatabase } from "@/server/config/mongodb";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import eventSchema from "@/server/models/event.schema";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";

export default function SingleEvent({ session, data }) {
  const link = useRouter().asPath;
  async function handle() {
    if (session) {
      signOut();
    } else {
      signIn("google", { callbackUrl: "http://localhost:3000" + link });
    }
  }
  const date=new Date(
    data?.eventCreationTimestamp
  )?.toUTCString()
  return (
    <Global>
      <div className="w-screen  bg-gradient-to-b from-[#1c7987] to- flex items-center justify-center">
        <section className="text-white body-font h-full w-[80%] bg-[#1c7987]/50">
          <div className="container px-5 py-20 mx-auto flex flex-col">
            <div className="lg:w-5/6 mx-auto">
              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                  <img
                    className="lg:h-56 md:h-48 w-full object-cover object-center"
                    src="https://dummyimage.com/720x400"
                    alt="blog"
                  />
                  <div className="flex flex-col items-center text-center justify-center">
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <h1 className=" text-2xl">{data.eventName}</h1>
                  </div>
                </div>
                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                  <div className="flex flex-row">
                    <div className="w-[60%]">
                      <div className="flex items-center p-3 gap-3">
                        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                        <h2 className="text-xl font-medium title-font text-white ml-4">
                          Event Details
                        </h2>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <h2 className="text-lg font-medium title-font text-white ml-4">
                            Event Date / Time:
                          </h2>
                          <p className="leading-relaxed text-lg  ml-4">
                            {date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <h2 className="text-lg font-medium title-font text-white ml-4">
                            Event Description:
                          </h2>
                          <p className="leading-relaxed text-lg  ml-4">
                            {data.eventDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-[40%] gap-3 flex flex-col">
                      <div className="flex items-center p-3">
                        <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                        <h2 className="text-xl font-medium title-font text-white ml-4">
                          Your Details
                        </h2>
                      </div>
                      <div>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <h2 className="text-lg font-medium title-font text-white ml-4">
                              Name:
                            </h2>
                            <p className="leading-relaxed text-lg  ml-4">
                              {session?.user?.name ?? "Please Login"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <h2 className="text-lg font-medium title-font text-white ml-4">
                              Email:
                            </h2>
                            <p className="leading-relaxed text-lg  ml-4">
                              {session?.user?.email ?? "Please Login"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handle}
                        className="mt-6 flex mx-auto bg-[#8dd3d2] text-[#138099] border-0 py-2 px-8 focus:outline-none hover:bg-[#4f9e9d] rounded text-lg"
                      >
                        {session?.user ? "Regester" : "Login"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Global>
  );
}

export async function getServerSideProps({ req, res, query }) {
  const session = await getServerSession(req, res, authOptions);
  await connectDatabase();
  let data = await eventSchema.findOne({ route: query.id });
  return {
    props: { session, data: JSON.parse(JSON.stringify(data)) },
  };
}

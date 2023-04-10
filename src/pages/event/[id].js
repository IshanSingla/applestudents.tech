/* eslint-disable react/no-unescaped-entities */
import Global from "@/components/Global";
import { connectDatabase } from "@/server/config/mongodb";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import eventSchema from "@/server/models/event.schema";
import { useRouter } from "next/router";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

export default function SingleEvent({ session, data }) {
  const link = useRouter().asPath;
  async function handle() {
    if (session) {
      signOut();
    } else {
      signIn("google", { callbackUrl: "http://localhost:3000" + link });
    }
  }
  const date = new Date(data?.eventCreationTimestamp)?.toUTCString();
  return (
    <Global>
      <div className="w-screen bg-gradient-to-b from-[#1c7987] to- flex items-center justify-center">
        <section className="text-white h-full w-[90%] xl:w-[80%] mt-[10%] bg-[#1c7987]/50">
          <div className="container xl:px-5 py-20 mx-auto flex flex-col">
            <div className=" px-5 mx-auto ">
              <div className="flex flex-col items-center sm:flex-row justify-center">
                <div className="lg:w-1/3 text-center sm:pr-8 sm:py-8">
                  <Image
                    width={500}
                    height={500}
                    className="lg:h-56 md:h-48 w-full object-cover object-center"
                    src="/logo.png"
                    alt="blog"
                  />
                  <div className="flex flex-col items-center text-center justify-center">
                    <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
                    <h1 className="sm:text-base text-xs md:text-xl lg:text-2xl">{data.eventName}</h1>
                  </div>
                </div>
                <div className="lg:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center lg:text-left">
                  <div className="flex flex-col justify-center lg:flex-row">
                    <div className="w-full lg:w-[60%]">
                      <div className="flex justify-center items-center p-3 gap-3">
                        <div className="w-[30%] h-1 bg-indigo-500 rounded"></div>
                        <h2 className="md:text-sm text-[0.7rem] lg:text-base xl:text-xl font-medium title-font text-white">
                          Event Details
                        </h2>
                        <div className="w-[30%] h-1 bg-indigo-500 rounded"></div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <h2 className="md:text-sm text-[0.7rem] lg:text-lg font-medium title-font text-white ml-4">
                            Event Date / Time:
                          </h2>
                          <p className="leading-relaxed md:text-sm text-[0.7rem] lg:text-lg  ml-4">
                            {date}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <h2 className="md:text-sm text-[0.7rem] lg:text-lg font-medium title-font text-white ml-4">
                            Event Description:
                          </h2>
                          <p className="leading-relaxed md:text-sm text-[0.7rem] lg:text-lg  ml-4">
                            {data.eventDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full items-center lg:w-[40%]  lg:gap-3 flex  flex-col">
                      <div className="w-full flex items-center p-3 lg:gap-3">
                        <div className="lg:w-[20%] w-[40%] h-1 bg-indigo-500 rounded "></div>
                        <h2 className="md:text-xs text-[0.7rem] lg:text-base xl:text-xl font-medium title-font text-white">
                          Your Details
                        </h2>
                        <div className="lg:w-[20%] w-[40%] h-1 bg-indigo-500 rounded"></div>

                      </div>
                      <div>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <h2 className="md:text-sm text-[0.7rem] lg:text-lg font-medium title-font text-white ml-4">
                              Name:
                            </h2>
                            <p className="leading-relaxed md:text-sm text-[0.7rem] lg:text-lg  ml-4">
                              {session?.user?.name ?? "Please Login"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <h2 className="md:text-sm text-[0.7rem] lg:text-lg font-medium title-font text-white ml-4">
                              Email:
                            </h2>
                            <p className="leading-relaxed md:text-sm text-[0.7rem] lg:text-lg ml-4">
                              {session?.user?.email ?? "Please Login"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handle}
                        className="mt-6 flex mx-auto bg-[#8dd3d2] text-[#138099] border-0 py-2 px-8 focus:outline-none hover:bg-[#4f9e9d] rounded md:text-sm text-[0.7rem] lg:text-lg"
                      >
                        {session?.user ? "Register" : "Login"}
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

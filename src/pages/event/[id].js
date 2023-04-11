import { getServerSession } from "next-auth";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import axios from "axios";

import Global from "@/components/Global";
import { connectDatabase } from "@/server/config/mongodb";
import eventSchema from "@/server/models/event.schema";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default function SingleEvent({ session, data }) {
  async function handle() {
    if (session) {
      if (
        data.emailVerification &&
        !session?.user?.email?.includes("@chitkara.edu.in")
      ) {
        signOut();
      } else {
        axios
          .get("/api/event/" + data.route + "/regester")
          .then((res) => {
            alert(res.data.message);
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    } else {
      signIn("google", { callbackUrl: window?.location?.href });
    }
  }
  const date = new Date(data?.eventDate)?.toUTCString();
  return (
    <Global
      title={(data?.eventName ?? "") + " |"}
      description={"Event Description: " + data?.eventDescription}
    >
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
                    <h1 className="sm:text-base text-xs md:text-xl lg:text-2xl">
                      {data.eventName}
                    </h1>
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
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <img
                            height={50}
                            width={50}
                            src={
                              session?.user
                                ? data.emailVerification &&
                                  !session?.user?.email?.includes(
                                    "@chitkara.edu.in"
                                  )
                                  ? "https://img.icons8.com/fluency/512/id-not-verified.png"
                                  : "https://img.icons8.com/material-outlined/512/approval.png"
                                : "https://img.icons8.com/fluency/512/id-not-verified.png"
                            }
                            className="w-10 h-10 rounded-full"
                            alt="profile"
                          />
                        </div>
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
                        {session?.user
                          ? data.emailVerification &&
                            !session?.user?.email?.includes("@chitkara.edu.in")
                            ? "Logout"
                            : "Regester"
                          : "Login"}
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

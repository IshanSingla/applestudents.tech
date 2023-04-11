import Head from "next/head";
import React from "react";
import Background from "./Background";

export default function Global({ children, title = "Apple Community" }) {
  return (
    <main className="w-screen h-screen bg-gradient-to-b from-[#1c7987] to- ">
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Apple Community - A place to discuss Apple tech and share ideas."
        />
        <link rel="apple-touch-icon" href="/logo.png"></link>
        <meta
          property="og:title"
          content="Apple Community - A place to discuss Apple tech and share ideas."
        />
        <meta property="og:image" content="https://applestudents.tech/logo.png" />
        <meta property="og:site_name" content="applestudents" />
        <meta property="og:url" content="https://applestudents.tech/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_in" />
        <meta property="fb:admins" />
        <link rel="canonical" href="https://applestudents.tech/" />
        <meta property="twitter:domain" content="www.applestudents.tech" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:url" content="https://applestudents.tech/" />
        <meta property="twitter:site" content="@applestudents" />
        <title>{title}</title>
      </Head>
      <Background />
      {children}
    </main>
  );
}

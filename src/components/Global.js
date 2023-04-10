import Head from "next/head";
import React from "react";
import Background from "./Background";

export default function Global({children, title="Apple Community"}) {
  return (
    <main>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Apple Community - A place to discuss Apple tech and share ideas."
        />
        <title>{title}</title>
      </Head>
      <Background />
      {children}
    </main>
  );
}

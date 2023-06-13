import React, { ReactNode } from "react";
import Head from "next/head";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>NextOperators</title>
        <meta name="description" content="test task for Brave Developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;

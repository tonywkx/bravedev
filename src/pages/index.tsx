import MainScreen from "@/components/MainComponent.tsx";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>NextOperators</title>
        <meta name="description" content="test task for Brave Developers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <MainScreen />
    </>
  );
}

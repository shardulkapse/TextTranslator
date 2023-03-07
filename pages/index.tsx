import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Detect from "../components/Detect";
import Translate from "../components/Translate";

const Home: NextPage = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="h-screen w-full bg-slate-200">
      <Head>
        <title>Translator App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full flex justify-center items-center py-10">
        <div className="rounded-full bg-slate-300">
          <button
            type="button"
            onClick={() => setActive(1)}
            className={`py-2 px-5 hover:bg-lime-400 hover:text-white ${
              active === 1 && "bg-lime-500 text-white"
            } transition-all duration-300 ease-in-out rounded-full`}
          >
            Translate
          </button>
          <button
            type="button"
            onClick={() => setActive(2)}
            className={`py-2 px-5 hover:bg-lime-400 hover:text-white ${
              active === 2 && "bg-lime-500 text-white"
            } transition-all duration-300 ease-in-out rounded-full`}
          >
            Detect language
          </button>
        </div>
      </div>

      {active === 0 && (
        <div className="w-full text-center mt-10">
          <p>Click the above buttons to select what you want to do.</p>
        </div>
      )}
      {active === 1 && <Translate />}
      {active === 2 && <Detect />}
    </div>
  );
};

export default Home;

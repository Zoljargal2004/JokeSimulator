import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [jokeData, setJokeData] = useState({ setup: `I will have you laugh.` });
  const [newJoke, setNewJoke] = useState(true)
  const [joke, setJoke] = useState(`${jokeData.setup}`)


  async function getTheJoke() {
    const response = await fetch(
      `https://official-joke-api.appspot.com/random_joke`
    );
    const datas = await response.json();
    setNewJoke(false)
    setJokeData(datas);
    setJoke(`${datas.setup}`)

  }

  function continueJoke() {
    setJoke(`${jokeData.setup}    
                          ${jokeData.punchline}`)
    setNewJoke(true)
  }

  return (
    <main className={`h-[100vh] content-center`}>
      <div className="flex flex-col p-10 gap-7 items-center max-w-lg max-h-96 bg-slate-600 w-full h-full m-auto rounded-[12px]">
        <span className="text-4xl">Here is random a joke</span>
        <span className="w-[80%] p-2 text-white bg-slate-950 rounded-[5px] text-center">
          {joke}
        </span>
        {newJoke ? (
          <button className="btn btn-active btn-ghost" onClick={getTheJoke}>
            Generate a joke
          </button>
        ) : (
          <button className="btn btn-active btn-ghost" onClick={continueJoke}>
            Continue the joke
          </button>
        )}
      </div>
    </main>
  );
}

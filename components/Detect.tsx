import axios from "axios";
import React, { useState } from "react";

function Detect() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState("");

  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setError(false);
    setLoading(true);
    event.preventDefault();
    if (!text) {
      setLoading(false);
      return;
    }
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);
    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2/detect",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "application/gzip",
        "X-RapidAPI-Key": "6c61ed0b42mshd83c71699ddb79ap181654jsnb9196199723c",
        "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
      },
      data: encodedParams,
    };
    const response = await axios.request(options);
    if (response.status === 200) {
      const code = response.data.data.detections[0][0].language;

      const language =
        code === "en"
          ? "English"
          : code === "de"
          ? "German"
          : code === "fr"
          ? "French"
          : code === "it"
          ? "Italian"
          : code === "hi"
          ? "Hindi"
          : code === "es"
          ? "Spanish"
          : "Language not supported.";
      setResult(language);
      setLoading(false);
    } else {
      setError(true);
      setResult("");
      setLoading(false);
    }
  };

  return (
    <div className="w-full  flex flex-col justify-start items-center mt-10 px-5 ">
      <p className="text-center">Enter your text</p>
      <input
        type="text"
        className="mt-10 w-full md:w-2/4 px-3 py-1 outline-none"
        placeholder="enter your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="mt-10 text-sm">
        supported languages are english, spanish, german, french, and hindi.
      </p>
      <button
        type="button"
        onClick={(e) => submitHandler(e)}
        disabled={!text || loading}
        className="mt-10 rouned-sm bg-lime-600 text-white px-5 py-2 transition-all duration-300 ease-in-out hover:bg-lime-500 outline-none cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        DETECT
      </button>
      {error && (
        <p className="mt-10 text-red-500">
          Something went wrong...please try again
        </p>
      )}
      {result && (
        <p className="mt-10 w-full md:w-2/4 px-3 py-1 bg-white">{result}</p>
      )}
    </div>
  );
}

export default Detect;

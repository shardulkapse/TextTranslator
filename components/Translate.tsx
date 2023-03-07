import React, { useState } from "react";
import axios from "axios";

function Translate() {
  const [target, setTarget] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [translation, setTranslation] = useState("");
  const [error, setError] = useState(false);
  const submitHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setError(false);
    setLoading(true);
    event.preventDefault();
    if (!text || !target) {
      setLoading(false);
      return;
    }
    const encodedParams = new URLSearchParams();
    encodedParams.append("q", text);
    encodedParams.append("target", target);
    encodedParams.append("source", "en");
    const options = {
      method: "POST",
      url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
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
      setTranslation(response.data.data.translations[0].translatedText);
      setLoading(false);
    } else {
      setError(true);
      setTranslation("");
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center mt-10 px-5">
      <p className="text-center">
        Enter the text (in <span className="text-lime-500">english</span>) that
        you want to translate
      </p>
      <input
        type="text"
        className="mt-10 w-full md:w-2/4 px-3 py-1 outline-none"
        placeholder="enter your text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="mt-10 text-center">
        Select the language you would like to translate to....
      </p>
      <div className="mt-10 flex flex-wrap justify-center items-center gap-x-10 gap-y-5">
        <button
          type="button"
          onClick={() => setTarget("es")}
          className={` ${
            target === "es" ? "bg-lime-500 text-white shadow-lg" : "bg-white"
          } rounded-sm px-3 py-1 transition-all duration-300 ease-in-out`}
        >
          Spanish
        </button>
        <button
          type="button"
          onClick={() => setTarget("de")}
          className={` ${
            target === "de" ? "bg-lime-500 text-white shadow-lg" : "bg-white"
          } rounded-sm px-3 py-1 transition-all duration-300 ease-in-out`}
        >
          German
        </button>
        <button
          type="button"
          onClick={() => setTarget("fr")}
          className={` ${
            target === "fr" ? "bg-lime-500 text-white shadow-lg" : "bg-white"
          } rounded-sm px-3 py-1 transition-all duration-300 ease-in-out`}
        >
          French
        </button>
        <button
          type="button"
          onClick={() => setTarget("it")}
          className={` ${
            target === "it" ? "bg-lime-500 text-white shadow-lg" : "bg-white"
          } rounded-sm px-3 py-1 transition-all duration-300 ease-in-out`}
        >
          Italian
        </button>
        <button
          type="button"
          onClick={() => setTarget("hi")}
          className={` ${
            target === "hi" ? "bg-lime-500 text-white shadow-lg" : "bg-white"
          } rounded-sm px-3 py-1 transition-all duration-300 ease-in-out`}
        >
          Hindi
        </button>
      </div>
      <button
        type="button"
        onClick={(e) => submitHandler(e)}
        disabled={!target || !text || loading}
        className="mt-10 rouned-sm bg-lime-600 text-white px-5 py-2 transition-all duration-300 ease-in-out hover:bg-lime-500 outline-none cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        TRANSLATE
      </button>
      {error && (
        <p className="mt-10 text-red-500">
          Something went wrong...please try again
        </p>
      )}
      {translation && (
        <p className="mt-10 w-full md:w-2/4 px-3 py-1 bg-white">
          {translation}
        </p>
      )}
    </div>
  );
}

export default Translate;

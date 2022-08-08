import { useEffect, useState } from "react";
import axios from "axios";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ClipboardCopyIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

function App() {
  const [linkInput, setLinkInput] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [warning, setWarning] = useState(false);
  const [notice, setNotice] = useState(false);
  function getShortUrl() {
    axios
      .get(`https://api.shrtco.de/v2/shorten?url=${linkInput}`)
      .then((res) => {
        setShortUrl(res.data.result.short_link);
      })
      .catch(() => {
        setWarning(true);
        setTimeout(() => {
          setWarning(false);
        }, 2000);
      });
  }

  return (
    <div className="bg-gradient-to-r from-sky-400 to-indigo-600">
      <div className="max-w-[1000px] mx-auto h-screen pt-10 flex flex-col justify-center items-center px-4">
        <h1 className="font-bold text-5xl text-white mb-10">URL Shortner</h1>
        <div className="md:w-2/3 w-full bg-white p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex flex-col ">
          <div className="grid grid-cols-1 md:grid-cols-4 bg-white rounded-xl overflow-hidden">
            <input
              className="md:col-span-3 bg-transparent outline-none py-2 px-4 text-xl"
              type="text"
              placeholder="Enter link here"
              onChange={(e) => {
                setLinkInput(e.target.value);
              }}
            />
            <button
              className="bg-gradient-to-r from-sky-400 to-indigo-400 text-white text-xl font-medium py-2"
              onClick={getShortUrl}
            >
              Shorten URL
            </button>
          </div>
          {warning ? (
            <p className="font-bold text-red-600 showUp mt-2">
              Please Enter Valid Url
            </p>
          ) : null}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-6">
            <p className="text-xl flex md:flex-row flex-col items-center gap-2 md:col-span-5">
              Here is your link{" "}
              <ArrowRightIcon className="w-5 rotate-90 md:rotate-0" />{" "}
              <p className="text-sky-500">{shortUrl}</p>
            </p>
            <div
              className="flex justify-center items-center bg-white p-2 rounded-md mt-4 hover:bg-slate-100 md:mt-0 cursor-pointer  md:ml-auto"
              onClick={() => {
                navigator.clipboard.writeText(shortUrl);
                setNotice(true);
                setTimeout(() => {
                  setNotice(false);
                }, 2000);
              }}
            >
              <ClipboardCopyIcon className="w-6" />
            </div>
          </div>
        </div>
        <p className="mt-10 text-white text-xl text-center">
          made by{" "}
          <a className="text-black underline" href="https://louayekazar.com/">
            Louaye Kazar
          </a>
          , using{" "}
          <a
            className="text-black underline"
            href="https://shrtco.de/"
            target="_blank"
          >
            SHRTCODE API
          </a>
        </p>
        {notice ? (
          <p className="fixed top-5 right-5  p-4 bg-white rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg flex items-center gap-2">
            <InformationCircleIcon className="w-5" /> Link Coppied To ClipBoard
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default App;

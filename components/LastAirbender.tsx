/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useFetchlastAirBenderApiQuery } from "../redux/apiSlices/lastAirBenderSlice";

type Props = {};

export default function LastAirbender({}: Props) {
  const [check, setCheck] = useState<boolean>(true);
  const [perPage, setPerPage] = useState<number>(9);
  const { data, isError, isFetching, isSuccess, startedTimeStamp } =
    useFetchlastAirBenderApiQuery(perPage, { skip: check });

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPerPage((prev) => prev + 9);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${data?"bg-orange-400":"avatar"}`}>
      <div className="py-28 px-5  max-w-5xl mx-auto">
        <div className="sticky top-3 h-14 bg-gray-200 rounded-lg flex items-center p-3 space-x-8">
          <button
            onClick={() => setCheck(false)}
            className="hover:scale-110 bg-red-500 px-4 py-2 text-xl rounded-lg text-white font-semibold"
          >
            FETCH DATA
          </button>
          <div className="flex">
            <h3> STATUS : </h3>
            {!data && !isFetching && (
              <span className="font-bold  ml-2"> Waiting for fetching...</span>
            )}
            {isFetching && (
              <span className="font-bold  ml-2"> Fetching Data...</span>
            )}
            {isSuccess && (
              <span className="font-bold  ml-2">Succesfully Fetched!</span>
            )}
            {isError && (
              <span className="font-bold  ml-2">An Error Occured</span>
            )}
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-5">
            <span className=" font-semibold ">
              METHOD : <span className="font-bold">Infinite Query</span>
            </span>
            <span className=" font-semibold ">
              Last Fetched:{" "}
              <span className="font-bold">
                {" "}
                {startedTimeStamp && data
                  ? new Date(startedTimeStamp).toLocaleString().slice(11, 19)
                  : "Not Fetch Yet"}
              </span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 mt-6 gap-5 ">
          {data &&
            data.map((item) => (
              <div className="col-span-1 bg-white rounded-lg" key={item._id}>
                <img
                  className="h-60 w-full object-cover rounded-t-lg"
                  src={item.photoUrl}
                  alt=""
                />
                <h3 className="my-1 mx-3 font-semibold">{item.name}</h3>
              </div>
            ))}
        </div>
        {isFetching && (
          <div className="text-2xl mt-4 text-black font-bold  flex items-center justify-center w-full">
            <h2 className="bg-white p-1 rounded-2xl">LOADİNG...</h2>
          </div>
        )}
      </div>
    </div>
  );
}

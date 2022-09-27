/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { fetchMorty } from "../redux/apiSlices/rickAndMortySlice";
import { useAppDispatch, useAppSelector } from "../redux/store";

type Props = {};

export default function RickAndMorty({}: Props) {
  const [page, setPage] = useState<number>(1);
  const [check, setCheck] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const morty = useAppSelector((store) => store.morty);

  useEffect(() => {
    check && dispatch(fetchMorty(page));
    setCheck(true);
  }, [page]);

  return (
    <div className="rickMorty ">
      <div className="py-32 px-5 grid grid-cols-5 space-x-10 max-w-7xl mx-auto ">
        <div className="h-80 space-y-10 cols-span-1 shadow bg-gray-100 rounded-xl p-4 flex flex-col items-center justify-around">
          <div>
            <button
              className="hover:scale-110 bg-red-500 px-4 py-2 text-xl rounded-lg text-white font-semibold"
              onClick={() => dispatch(fetchMorty(page))}
            >
              FETCH DATA
            </button>
            <div className="mt-4 ">
              <span className="font-bold text-sm">STATUS:</span>
              <h3 className="text-sm">{morty.loading && "LOADİNG..."}</h3>
              <h3 className="text-sm">
                {morty.error && "An error occured :("}
              </h3>
              <h3 className="text-sm">
                {morty.data && "Successfully Fetched!"}
              </h3>

              <h3 className="text-sm">
                {morty.data == null && "Waiting for fetching.."}
              </h3>
            </div>
            <div className="mt-5 font-semibold text-sm">
              METHOD:PAGİNATİON
            </div>
          </div>
          
          {morty.data && (
            <div className="text-sm ">
              <h3></h3>
              <h3 className="mb-3 text-lg font-bold tracking-widest">
                {page}/{morty.data.info.pages}
              </h3>
              <div className="text-sm space-x-1">
                <button
                  disabled={morty?.data?.info?.prev == null}
                  onClick={() => setPage((current) => current - 1)}
                  className="disabled:bg-gray-300 p-1 bg-blue-200 rounded-md text-sm font-semibold"
                >
                  PREV PAGE
                </button>
                <button
                  onClick={() => setPage((current) => current + 1)}
                  className="p-1 bg-blue-200 rounded-md text-sm font-semibold"
                >
                  NEXT PAGE
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-2 col-span-4 h-[600px] rounded-lg ">
          {morty.data?.results.map((item) => (
            <div className="col-span-1 bg-gray-100 rounded-lg" key={item.id}>
              <img
                className="h-32 w-full rounded-t-lg"
                src={item.image}
                alt=""
              />
              <h3 className="font-semibold px-2">{item.name.slice(0, 17)}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { addCategory, addIsActive } from "../redux/slices/categorySlice";

type Props = {};

export default function Tabs({}: Props) {
  const dispatch = useAppDispatch();
  const categories = ["LastAirBender", "RickAndMorty"];
  const [active, setActive] = useState("");

  async function Active(e: any) {
    setActive(e.currentTarget.innerHTML);
    dispatch(addIsActive(e.currentTarget.innerHTML));
  }

useEffect(()=>{
    dispatch(addCategory(categories))
},[])

  return (
    <div className="absolute m-5 space-x-2  bg-gray-200 max-w-fit p-2 rounded-lg">
      {categories.map((category, i) => (
        <button
          key={i}
          onClick={(e) => Active(e)}
          className={`border-gray-400 border-2 text-lg font-semibold px-10  py-3 rounded-lg transition-all duration-200 ${
            category == active && "bg-blue-500"
          } ${category !== active && "hover:bg-gray-400"} `}
        >
          {category}
          
        </button>
      ))}
  
    </div>
  );
}

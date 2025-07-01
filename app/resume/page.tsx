import React from "react";
import { FaPhone, FaLocationPin, FaEnvelope } from "react-icons/fa6";

const page = () => {
  return (
    <div className="w-full h-screen p-12 bg-gray-100 flex justify-center">
      <div className="bg-white rounded-2xl w-full max-w-[900px] min-h-96 shadow-xl overflow-hidden">
        <div className="border-r border-gray-200 max-w-1/3 h-full flex flex-col p-4 pt-12">
          <h3 className="font-bold text-zinc-700 text-3xl mb-2">Tommy Vong</h3>
          <h3 className="font-light text-zinc-400 text-xs tracking-widest	">
            Graphic Designer/Web Developer
          </h3>
          <span className="w-full block bg-gray-200 h-[1px] mt-6 mb-6"></span>
          <div className="flex flex-col gap-2 text-zinc-500">
            <h4 className="font-bold text-md text-zinc-700">Info</h4>
            <span className="flex gap-1 items-center text-xs">
              <FaPhone />
              626.340.0000
            </span>
            <span className="flex gap-1 items-center text-xs">
              <FaEnvelope />
              Tommy@test.com
            </span>
            <span className="flex gap-1 items-center text-xs">
              <FaPhone />
              Greater Los Angeles
            </span>
          </div>
          <span className="w-full block bg-gray-200 h-[1px] mt-6 mb-6"></span>
          <div className="flex flex-col gap-2 text-zinc-500">
            <h4 className="font-bold text-md text-zinc-700">Education</h4>
            <p className="font-semibold text-xs">Cal Poly Pomona</p>
            <p className="text-xs">Bachelor of Fine Arts - 2013</p>
            <p className="capitalize leading-1 text-xs">
              With focus on graphic design
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

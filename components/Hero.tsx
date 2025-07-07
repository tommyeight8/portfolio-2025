import Image from "next/image";
import React from "react";
import TypewriterComponent from "./Typewriter";

const Hero = () => {
  return (
    <div className="h-2/3 w-full bg-[#101010] flex justify-center items-center">
      <div className="flex items-center w-full max-w-[900px]">
        <div className="text-gray-100 w-2/3">
          {/* <h3 className="text-xl font-semibold">
            Hello<span className="text-green-400">,</span>
          </h3> */}
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl font-semibold">Hello, I'm Tommy</h3>
            <div className="py-2 px-6 rounded-full bg-purple-500 w-fit text-zinc-900">
              <TypewriterComponent />
            </div>
            <h3 className="text-xl font-bold">
              I design & build beautiful digital experiences
            </h3>
          </div>
        </div>
        <div className="w-1/3 h-full">
          <div className="relative overflow-hidden rounded-full aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1085&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

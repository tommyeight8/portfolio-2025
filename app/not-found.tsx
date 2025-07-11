"use client";

import { IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-4 fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#101010]">
      <div className="relative w-full h-full max-w-[500px] max-h-[50%] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dehmmknu8/image/upload/v1752252582/Asset_2_reworp.png"
          className="object-contain"
          fill
          alt="404 error"
          priority
        />
      </div>

      {/* <p className="text-gray-500 text-lg mt-8">
        This page could not be found.
      </p> */}
      <Link
        href="/"
        className="hover:-translate-y-1 transition duration-200 text-sm md:text-xl text-zinc-700 flex items-center gap-2 mt-2 md:mt-12 px-4 py-2 md:px-8 md:py-4 bg-gray-200 rounded-4xl"
      >
        <IconArrowLeft size={18} /> Take me home
      </Link>
    </div>
  );
}

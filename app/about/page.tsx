import { GlowingEffect } from "@/components/ui/glow-effect";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="min-h-[50vh] text-zinc-800 dark:text-gray-200 bg-gray-100 dark:bg-[#101010] pb-28">
      <div className="h-48 w-full bg-[linear-gradient(135deg,_#ec38bc,_#7303c0,_#03001e,_#00f2fe)] relative">
        <div className="h-56 w-56 rounded-full bg-gray-100 dark:bg-[#101010] p-[4px] absolute top-10 left-1/2 -translate-x-1/2">
          <div className="w-full h-full relative rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="profile"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="relative w-full max-w-[800px] mx-auto mt-28 rounded-lg">
        {/* GlowingEffect positioned absolutely inside this container */}
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          className="rounded-lg"
        />

        {/* Your content card with rounded-lg */}
        <div
          className={`relative z-10 w-full flex flex-col gap-4 justify-center text-center py-8 px-16 rounded-lg`}
        >
          <h3 className="text-4xl uppercase mb-6 dark:text-neutral-200">
            <span className="font-semibold">About</span>{" "}
            <span className="font-light">Me</span>
          </h3>

          <p className="dark:text-neutral-300">
            I'm a multidisciplinary designer and full-stack developer with over
            8 years of experience in graphic design and more than 5 years in web
            development.
          </p>
          <p className="dark:text-neutral-300">
            As a designer, I’ve crafted visuals for websites, social media
            content, menus, and brochures across industries including
            restaurants and entertainment venues—focusing on both brand clarity
            and visual appeal.
          </p>
          <p className="dark:text-neutral-300">
            In development, I specialize in building full-scale web
            applications, mobile apps, and custom Shopify stores, including
            end-to-end builds from scratch. I have hands-on experience with{" "}
            <strong>Next.js</strong>, <strong>React</strong>,{" "}
            <strong>REST APIs</strong>, and both <strong>MongoDB</strong> and{" "}
            <strong>PostgreSQL</strong> databases.
          </p>
          <p className="dark:text-neutral-300">
            Whether it's frontend design or backend architecture, I enjoy
            bridging design and code to create seamless digital experiences.
          </p>
          <Link
            href="/portfolio"
            className="flex items-center gap-1 m-auto py-2 px-4 rounded transition duration-200 mt-4
              text-violet-600"
          >
            View Portfolio
            <IconArrowRight size={21} className="text-violet-600" />
          </Link>
          {/* <Link
            href="/"
            className="flex items-center gap-1 m-auto py-2 px-4 text-sm rounded transition duration-200
    hover:bg-gradient-to-r hover:from-violet-600 hover:to-blue-600 hover:text-white dark:hover:text-white mt-4"
          >
            View Portfolio
            <IconArrowRight size={21} />
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default page;

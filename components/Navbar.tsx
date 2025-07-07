"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch, IoClose } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { IconBadgeTm } from "@tabler/icons-react";

import MagneticLink from "./MagneticLinks";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Works", path: "/works" },
  { label: "Contact", path: "#contact" },
  { label: "Resume", path: "/resume" },
];

const mockResults = [
  { id: 1, title: "Portfolio Website", image: "/thumbs/portfolio.jpg" },
  { id: 2, title: "Landing Page Design", image: "/thumbs/landing.jpg" },
  { id: 3, title: "Mobile UI Kit", image: "/thumbs/mobile-ui.jpg" },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();

  const filteredResults =
    query.length > 0
      ? mockResults.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <motion.header
      animate={{ height: searchOpen ? 240 : 45 }} // use actual height
      transition={{ type: "spring", damping: 20, stiffness: 120 }}
      className="w-full sticky top-0 bg-[#1A1A1D] z-50 shadow border-b border-zinc-800"
    >
      <div className="w-full max-w-[1100px] mx-auto flex flex-col px-4">
        <div className="flex justify-between items-center h-[45px]">
          <div className="flex w-21 justify-start">
            <IconBadgeTm size={30} className="text-gray-200" />
            {/* <div className="bg-zinc-700 h-5 w-5 text-sm font-bold text-white flex justify-center items-center rounded-md">
              T
            </div> */}
          </div>
          {/* <MagneticLink /> */}
          <ul className="flex gap-12 justify-center">
            {navItems.map(({ label, path }) => {
              const isActive = pathname === path;

              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                if (label === "Contact" && path.startsWith("#")) {
                  e.preventDefault();
                  const section = document.querySelector(path);
                  if (section) section.scrollIntoView({ behavior: "smooth" });
                }
              };

              return (
                <li
                  key={label}
                  className="relative group text-xs cursor-pointer"
                >
                  <a
                    href={path}
                    onClick={handleClick}
                    className="text-zinc-300 group-hover:text-zinc-200 transition"
                  >
                    {label}
                  </a>
                  <span
                    className={`absolute left-0 -bottom-0.5 w-full h-[2px] bg-zinc-200 transition-transform origin-left duration-300 ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </li>
              );
            })}
          </ul>
          <button
            onClick={() => setSearchOpen((prev) => !prev)}
            className="w-21 flex justify-end text-sm text-zinc-300 hover:text-zinc-200 transition cursor-pointer"
          >
            {searchOpen ? (
              <IoClose />
            ) : (
              <div className="flex items-center gap-2">
                <IoSearch className="text-base" />
                Search
              </div>
            )}
          </button>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-2 w-1/2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full p-2 rounded-md bg-zinc-800 text-white border border-zinc-700"
              />
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex gap-2 items-center bg-zinc-100 p-2 rounded"
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <span className="text-sm font-medium">{result.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;

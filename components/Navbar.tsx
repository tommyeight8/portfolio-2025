"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch, IoClose, IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { IconBadgeTm, IconLogout, IconUser } from "@tabler/icons-react";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";

import { SignedIn, SignedOut, SignOutButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Contact", path: "#contact" },
  { label: "Resume", path: "/resume" },
  { label: "Dashboard", path: "/dashboard" },
];

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const { signOut } = useClerk();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
    label: string
  ) => {
    if (label === "Contact" && path.startsWith("#")) {
      e.preventDefault();
      const section = document.querySelector(path);
      if (section) section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <motion.header
        animate={{ height: searchOpen ? 240 : 45 }}
        transition={{ type: "spring", damping: 20, stiffness: 120 }}
        className="w-full sticky top-0 bg-white dark:bg-[#1A1A1D] z-50 shadow border-b border-zinc-50 dark:border-zinc-800"
      >
        <div className="w-full max-w-[1100px] mx-auto flex flex-col px-4">
          <div className="flex justify-between items-center h-[45px]">
            <div className="relative flex w-[144px] h-8">
              <Image
                src="/images/tv.png"
                alt="tommy-logo"
                width={36}
                height={36}
                className="object-contain invert-80 dark:invert-0"
              />
              {/* <IconBadgeTm
                size={30}
                className="text-zinc-800 dark:text-gray-200"
              /> */}
            </div>

            {/* Desktop Nav */}
            <ul className="hidden md:flex gap-12 justify-center">
              {navItems
                .filter(({ label }) => label !== "Dashboard")
                .map(({ label, path }) => {
                  const isActive = pathname === path;
                  return (
                    <li
                      key={label}
                      className="relative group text-xs cursor-pointer"
                    >
                      <a
                        href={path}
                        onClick={(e) => handleClick(e, path, label)}
                        className="text-zinc-800 dark:text-gray-200 dark:group-hover:text-gray-100 transition"
                      >
                        {label}
                      </a>
                      <span
                        className={`absolute left-0 -bottom-0.5 w-full h-[2px] bg-zinc-800 dark:bg-gray-200 transition-transform origin-left duration-300 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </li>
                  );
                })}
              {isMounted && (
                <SignedIn>
                  <li className="relative group text-xs cursor-pointer">
                    <a
                      href="/dashboard"
                      onClick={(e) => handleClick(e, "/dashboard", "Dashboard")}
                      className="text-zinc-800 dark:text-gray-200 dark:group-hover:text-gray-100 transition"
                    >
                      Dashboard
                    </a>
                    <span
                      className={`absolute left-0 -bottom-0.5 w-full h-[2px] bg-zinc-800 dark:bg-gray-200 transition-transform origin-left duration-300 ${
                        pathname === "/dashboard"
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </li>
                </SignedIn>
              )}
            </ul>

            <div className="flex items-center gap-2 w-[144px]">
              {/* Theme Toggle */}
              <ModeToggle />

              {/* 👇 Signed Out: show Sign In button */}
              <SignedOut>
                <Link href="/sign-in">
                  <div className="text-zinc-800 dark:text-gray-200 cursor-pointer p-2 rounded-full bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center transition">
                    <IconUser className="h-4 w-4" />
                  </div>
                </Link>
              </SignedOut>

              {/* 👇 Signed In: show user button with dropdown */}
              {isMounted && (
                <SignedIn>
                  <div className="relative">
                    <div
                      onClick={() => setDropdownOpen((prev) => !prev)}
                      className="text-zinc-800 dark:text-gray-200 cursor-pointer p-2 rounded-full bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center transition"
                    >
                      <IconUser className="h-4 w-4" />
                    </div>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg z-50 min-w-[140px] p-2">
                        <button
                          onClick={async () => {
                            await signOut();
                            router.push("/"); // redirect to home
                          }}
                          className="flex justify-center cursor-pointer items-center gap-1 text-sm text-zinc-800 dark:text-gray-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 w-full text-left px-3 py-1.5 rounded transition"
                        >
                          Sign Out <IconLogout size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </SignedIn>
              )}

              {/* Search Button */}
              <button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="text-zinc-800 dark:text-gray-200 cursor-pointer p-2 rounded-full bg-transparent hover:bg-zinc-200 dark:hover:bg-zinc-800 flex items-center justify-center transition"
              >
                {searchOpen ? (
                  <IoClose className="h-4 w-4" />
                ) : (
                  <IoSearch className="h-4 w-4" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-zinc-800 dark:text-gray-200 hover:text-zinc-200 text-2xl"
              >
                <IoMenu />
              </button>
            </div>
          </div>

          {/* Search Box */}
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 w-3/4 h-full bg-[#1A1A1D] shadow-lg z-[999] border-l border-zinc-800"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white text-2xl"
              >
                <IoClose />
              </button>
            </div>

            <ul className="flex flex-col gap-6 px-6 pt-4 text-lg text-zinc-300 md:hidden">
              {navItems.map(({ label, path }) => {
                if (label === "Dashboard") {
                  return (
                    isMounted && (
                      <SignedIn key={label}>
                        <li>
                          <a
                            href={path}
                            onClick={(e) => handleClick(e, path, label)}
                            className="block py-2 hover:text-white transition"
                          >
                            {label}
                          </a>
                        </li>
                      </SignedIn>
                    )
                  );
                }

                return (
                  <li key={label}>
                    <a
                      href={path}
                      onClick={(e) => handleClick(e, path, label)}
                      className="block py-2 hover:text-white transition"
                    >
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

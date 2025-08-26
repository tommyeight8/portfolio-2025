"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch, IoClose, IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { IconBadgeTm, IconLogout, IconUser } from "@tabler/icons-react";
import { ModeToggle } from "@/components/ui/ThemeToggle";
import Link from "next/link";

import { SignedIn, SignedOut, SignOutButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { useProjectContext } from "@/context/ProjectContext";

import { toSlug } from "@/lib/slug-it";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
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

  const debouncedQuery = useDebouncedValue(query, 150);
  const { projects } = useProjectContext();

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];
    return projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.description?.toLowerCase?.().includes(q) ?? false)
      )
      .sort((a, b) => a.position - b.position)
      .slice(0, 8); // cap results
  }, [projects, debouncedQuery]);

  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (searchOpen) {
      // Focus after mount
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [searchOpen]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!searchOpen || results.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + results.length) % results.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const hit = results[activeIndex];
        if (hit) {
          // navigate – adjust this to your route shape if needed
          router.push(`/projects/${toSlug(hit.title)}`);
          setSearchOpen(false);
        }
      } else if (e.key === "Escape") {
        setSearchOpen(false);
      }
    },
    [results, activeIndex, searchOpen, router]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSearchOpen(false);
    setQuery("");
  }, [pathname]);

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
      <motion.header className="w-full sticky top-0 bg-white dark:bg-[#1A1A1D] z-50 shadow border-b border-zinc-50 dark:border-zinc-800">
        <div className="w-full max-w-[1100px] mx-auto flex flex-col px-4 relative">
          <div className="flex justify-between items-center h-[45px]">
            <Link href={"/"} className="relative flex w-[144px] h-8">
              <Image
                src="/images/tv.png"
                alt="tommy-logo"
                width={36}
                height={36}
                className="object-contain invert-80 dark:invert-0"
              />
            </Link>

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
                onClick={() => {
                  if (searchOpen) {
                    setQuery(""); // clear text
                    setSearchOpen(false); // close bar
                  } else {
                    setSearchOpen(true); // open bar
                    // focus handled by the effect
                  }
                }}
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
        </div>
        {/* Search Bar (full-width like header) + Absolute Results */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              // full-width bar directly under the 45px header row
              className="absolute inset-x-0 top-full z-[60] pointer-events-none
                 bg-white dark:bg-[#1A1A1D] shadow-sm"
            >
              {/* align with header container */}
              <div className="max-w-[900px] mx-auto px-4 py-2 pointer-events-auto">
                {/* anchor container for absolute results */}
                <div className="relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Search projects..."
                    className="w-full p-2 rounded-md bg-gray-100 dark:bg-zinc-800 
                       text-zinc-800 dark:text-white border 
                       border-zinc-200 dark:border-zinc-700 outline-none"
                  />

                  {/* Results panel absolutely below input */}
                  <AnimatePresence>
                    {query.trim().length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 right-0 top-full mt-2 rounded-md border 
                           border-zinc-200 dark:border-zinc-700 bg-white/90 
                           dark:bg-zinc-900/90 backdrop-blur shadow-lg"
                        role="listbox"
                        aria-label="Project search results"
                      >
                        {results.length === 0 ? (
                          <div className="p-4 text-sm text-zinc-500">
                            No projects found.
                          </div>
                        ) : (
                          <ul
                            ref={listRef}
                            className="max-h-[320px] overflow-auto py-2"
                          >
                            {results.map((p, idx) => {
                              const isActive = idx === activeIndex;
                              return (
                                <li key={p.id}>
                                  <Link
                                    href={`/projects/${toSlug(p.title)}`}
                                    onClick={() => setSearchOpen(false)}
                                    className={[
                                      "flex items-center gap-3 px-3 py-2 transition",
                                      isActive
                                        ? "bg-zinc-100 dark:bg-zinc-800"
                                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                    ].join(" ")}
                                    role="option"
                                    aria-selected={isActive}
                                    onMouseEnter={() => setActiveIndex(idx)}
                                  >
                                    {/* Thumbnail */}
                                    <div className="relative h-10 w-10 shrink-0 rounded overflow-hidden border border-zinc-200 dark:border-zinc-700">
                                      <Image
                                        src={
                                          p.imageUrl ||
                                          "/images/placeholder.png"
                                        }
                                        alt={p.title}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                      />
                                    </div>
                                    {/* Title + description */}
                                    <div className="min-w-0">
                                      <div className="text-sm text-zinc-800 dark:text-zinc-100 truncate">
                                        {p.title}
                                      </div>
                                      {p.description ? (
                                        <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                                          {p.description}
                                        </div>
                                      ) : null}
                                    </div>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/70 md:hidden"
              aria-label="Close menu"
            />

            {/* Drawer */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              initial={{ x: 320 }} // match the panel width below
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 z-50 h-full w-[320px] bg-white dark:bg-zinc-900 shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between p-4">
                {/* <span className="font-semibold text-lg">Menu</span> */}
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-800 dark:text-gray-200 text-2xl ml-auto"
                  aria-label="Close"
                >
                  <IoClose />
                </button>
              </div>

              <nav className="p-6">
                <ul className="flex flex-col gap-6 text-lg">
                  {navItems.map(({ label, path }) => (
                    <li key={label}>
                      <Link
                        href={path}
                        onClick={(e) => handleClick(e, path, label)}
                        className="block text-zinc-800 dark:text-gray-200 hover:text-blue-500"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

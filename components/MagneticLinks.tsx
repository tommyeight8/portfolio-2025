"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const navItems = ["Home", "About", "Works", "Contact", "Resume"];

const MagneticLink = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ x: 0, width: 0 });

  const handleMouseEnter = (
    index: number,
    e: React.MouseEvent<HTMLLIElement>
  ) => {
    if (!containerRef.current) return;

    const itemRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const x = itemRect.left - containerRect.left;
    const width = itemRect.width;

    setHoveredIndex(index);
    setUnderlineStyle({ x, width });
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <ul
      ref={containerRef}
      className="relative flex gap-12 justify-center items-center"
      onMouseLeave={handleMouseLeave}
    >
      {navItems.map((item, index) => (
        <li
          key={item}
          onMouseEnter={(e) => handleMouseEnter(index, e)}
          className="relative text-xs text-zinc-600 hover:text-black transition cursor-pointer px-1"
        >
          {item}
        </li>
      ))}

      <motion.div
        className="absolute bottom-0 h-[2px] bg-black"
        animate={{
          x: underlineStyle.x,
          width: underlineStyle.width,
          opacity: hoveredIndex !== null ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </ul>
  );
};

export default MagneticLink;

"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { IconArrowRight } from "@tabler/icons-react";
import { useProjectContext } from "@/context/ProjectContext";
import Link from "next/link";
import { toSlug } from "@/lib/slug-it";

// const projects = [
//   {
//     title: "Creative Portfolio",
//     description: "A minimalist portfolio",
//     image:
//       "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop",
//   },
//   {
//     title: "SaaS Landing Page",
//     description: "High-converting landing page tailored for SaaS startups.",
//     image:
//       "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1170&auto=format&fit=crop",
//   },
//   {
//     title: "E-commerce UI Kit",
//     description: "Modular components for building online store frontends.",
//     image:
//       "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop",
//   },
//   {
//     title: "Mobile Finance App",
//     description: "A clean and modern mobile app interface for fintech.",
//     image:
//       "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop",
//   },
//   {
//     title: "Blog CMS Design",
//     description: "Custom UI design for a headless CMS-powered blog.",
//     image:
//       "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop",
//   },
//   {
//     title: "Travel Explorer",
//     description: "Interactive web experience for discovering destinations.",
//     image:
//       "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop",
//   },
// ];

const ProjectSlider = () => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
  });
  const [slidesPerView, setSlidesPerView] = useState(4);

  const { projects } = useProjectContext();

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setSlidesPerView(1);
      else if (width < 1024) setSlidesPerView(2);
      else setSlidesPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full px-6 py-16 bg-white dark:bg-[#101010] text-white relative">
      <h2 className="text-3xl font-bold mb-12 text-center text-zinc-700 dark:text-neutral-200">
        Recent Projects
      </h2>

      <Link
        href={"/projects"}
        className="flex gap-1 items-center text-violet-500 absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer rounded-md transition duration-200 px-6 py-2 hover:bg-violet-500 hover:text-zinc-900"
      >
        View All <IconArrowRight size={18} />
      </Link>
      {/* Navigation Buttons (Bottom Right) */}
      <div className="absolute bottom-6 right-6 z-10 flex gap-3">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 rounded-full bg-zinc-700/20 cursor-pointer text-zinc-600 flex items-center justify-center shadow hover:bg-zinc-100 transition"
        >
          <IoChevronBack />
        </button>
        <button
          onClick={scrollNext}
          className="w-10 h-10 rounded-full bg-zinc-700/20 cursor-pointer text-zinc-600 flex items-center justify-center shadow hover:bg-zinc-100 transition"
        >
          <IoChevronForward />
        </button>
      </div>

      {/* Embla Carousel */}
      <div className="overflow-hidden" ref={viewportRef}>
        <div className="flex" style={{ gap: "24px" }}>
          {projects.map((project, index) => (
            <Link
              href={`/projects/${toSlug(project.title)}`}
              key={index}
              className="flex-[0_0_calc(100%/4-18px)] sm:flex-[0_0_calc(100%/3-16px)] xs:flex-[0_0_calc(100%/2-12px)] py-8"
              style={{ flex: `0 0 ${100 / slidesPerView}%` }}
            >
              <div className="h-full flex flex-col shadow-black/30 bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h4 className="text-lg font-bold mb-1">{project.title}</h4>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSlider;

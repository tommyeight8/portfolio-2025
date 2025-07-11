"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".timeline-section");

    sections.forEach((section) => {
      const heading = section.querySelector(".timeline-heading");

      if (heading) {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            document.querySelectorAll(".timeline-heading").forEach((el) => {
              el.classList.remove("active-timeline-heading");
              el.classList.add("inactive-timeline-heading");
            });

            heading.classList.remove("inactive-timeline-heading");
            heading.classList.add("active-timeline-heading");
          },
          onLeaveBack: () => {
            heading.classList.remove("active-timeline-heading");
            heading.classList.add("inactive-timeline-heading");
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-gray-50 dark:bg-[#101010] font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-zinc-800 dark:text-gray-100 max-w-4xl flex flex-col gap-1">
          <span className="p-0 m-0 inline-block h-1 w-12 bg-purple-500">
            &nbsp;
          </span>
          My Career Timeline
        </h2>

        <p className="flex flex-col text-neutral-800 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          A curated journey through design, development, and everything in
          between.
        </p>
        <br></br>
        <p className="text-neutral-800 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          Over the years, I've worn many hats — from crafting pixel-perfect UIs
          to launching complete design systems. This timeline highlights the key
          milestones, products, and ideas I've brought to life.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="timeline-section flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black/30 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-300 border border-neutral-700 p-2" />
              </div>
              <h3 className="timeline-heading hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-700 transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full text-gray-200">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

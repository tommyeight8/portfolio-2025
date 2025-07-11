"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

const skills = [
  { name: "JavaScript", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "Expo", level: 80 },
  { name: "React Native", level: 85 },
  { name: "CSS", level: 92 },
  { name: "HTML", level: 98 },
  { name: "Tailwind", level: 90 },
  { name: "MongoDB", level: 85 },
  { name: "Neon", level: 85 },
  { name: "PostgreSQL", level: 85 },
  { name: "Adobe Suite", level: 90 },
  { name: "Illustrator", level: 87 },
  { name: "Photoshop", level: 89 },
  { name: "InDesign", level: 80 },
  { name: "Typescript", level: 85 },
];

const SkillGraph = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="w-full flex flex-col items-center p-12 bg-white dark:bg-[#101010] text-white"
    >
      <h3 className="text-3xl font-bold mb-12 text-zinc-700 dark:text-neutral-200 uppercase">
        Tech & Design Proficiency
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-[1100px]">
        {[...skills]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((skill, index) => (
            <div key={skill.name} className="flex flex-col items-center">
              <div className="flex items-end gap-[3px] h-[30px] w-full justify-center">
                {Array.from({ length: 20 }).map((_, i) => {
                  const isFilled = i < Math.round(skill.level / 5);
                  return isFilled ? (
                    <motion.div
                      key={i}
                      className="w-[4px] rounded-full"
                      style={{ height: "100%" }}
                      initial={{
                        backgroundColor: "#8B5CF6",
                        boxShadow: "0 0 0px #8B5CF6",
                      }}
                      animate={
                        isInView
                          ? {
                              backgroundColor: "#8B5CF6",
                              boxShadow: [
                                "0 0 0px #8B5CF6",
                                "0 0 6px #8B5CF6",
                                "0 0 12px #8B5CF6",
                                "0 0 6px #8B5CF6",
                                "0 0 0px #8B5CF6",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        delay: index * 0.05 + i * 0.015,
                        duration: 1,
                        repeat: 0,
                      }}
                    />
                  ) : (
                    <div
                      key={i}
                      className="w-[4px] h-full rounded-full bg-zinc-700 opacity-60"
                    />
                  );
                })}
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-zinc-600 dark:text-neutral-200">
                  {skill.name}
                </p>
                <p className="text-xs text-violet-400">{skill.level}%</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SkillGraph;

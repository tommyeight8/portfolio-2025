"use client";

import { motion } from "framer-motion";
import React from "react";

const skills = [
  { name: "JavaScript", level: 95 },
  { name: "Next.js", level: 90 },
  { name: "Expo", level: 80 },
  { name: "React Native", level: 85 },
  { name: "CSS", level: 92 },
  { name: "HTML", level: 98 },
  { name: "Tailwind", level: 88 },
  { name: "MongoDB", level: 75 },
  { name: "Neon", level: 70 },
  { name: "PostgreSQL", level: 82 },
  { name: "Adobe Suite", level: 90 },
  { name: "Illustrator", level: 87 },
  { name: "Photoshop", level: 89 },
  { name: "InDesign", level: 70 },
];

const SkillGraph = () => {
  return (
    <div className="w-full flex flex-col items-center p-12 bg-zinc-900 text-white">
      <h3 className="text-3xl font-bold mb-12">Tech & Design Proficiency</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-[1100px]">
        {skills.map((skill, index) => (
          <div key={skill.name} className="flex flex-col items-center">
            <div className="flex items-end gap-[3px] h-[30px] w-full justify-center">
              {Array.from({ length: 20 }).map((_, i) => {
                const isFilled = i < Math.round(skill.level / 5); // 100 / 20 = 5
                return isFilled ? (
                  <motion.div
                    key={i}
                    className="w-[4px] rounded-full bg-purple-500 shadow-[0_0_6px_#a855f7]"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{
                      delay: index * 0.05 + i * 0.015,
                      duration: 0.4,
                      type: "spring",
                      damping: 15,
                      stiffness: 200,
                    }}
                    style={{ height: "100%" }}
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
              <p className="text-sm font-medium">{skill.name}</p>
              <p className="text-xs text-purple-400">{skill.level}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGraph;

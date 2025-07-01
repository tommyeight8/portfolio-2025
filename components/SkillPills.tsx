"use client";

import { motion } from "framer-motion";

const skills = [
  "Web Design",
  "Frontend Development",
  "Branding / Visual Identity",
  "UI/UX Design",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const pillVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const SkillPills = () => {
  return (
    <motion.div
      className="flex flex-wrap gap-3 mt-8 justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {skills.map((skill, index) => (
        <motion.div
          key={index}
          variants={pillVariants}
          className="px-4 py-2 bg-zinc-900 text-gray-100 font-medium rounded-full shadow-sm hover:bg-blue-200 transition"
        >
          {skill}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkillPills;

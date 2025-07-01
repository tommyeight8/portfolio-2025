"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";

const projects = [
  {
    title: "Creative Portfolio",
    description: "A minimalist portfolio to showcase design and dev work.",
    image:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "SaaS Landing Page",
    description: "High-converting landing page tailored for SaaS startups.",
    image:
      "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "E-commerce UI Kit",
    description: "Modular components for building online store frontends.",
    image:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Mobile Finance App",
    description: "A clean and modern mobile app interface for fintech.",
    image:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Blog CMS Design",
    description: "Custom UI design for a headless CMS-powered blog.",
    image:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Travel Explorer",
    description: "Interactive web experience for discovering destinations.",
    image:
      "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const ProjectSlider = () => {
  return (
    <section className="w-full px-6 py-16 bg-zinc-900 text-white relative">
      <h2 className="text-3xl font-bold mb-12 text-center">Recent Projects</h2>

      {/* Navigation Buttons */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <button className="swiper-button-prev w-10 h-10 rounded-full bg-white text-zinc-800 flex items-center justify-center shadow hover:bg-zinc-100 transition">
          <IoChevronBack />
        </button>
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <button className="swiper-button-next w-10 h-10 rounded-full bg-white text-zinc-800 flex items-center justify-center shadow hover:bg-zinc-100 transition">
          <IoChevronForward />
        </button>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        spaceBetween={24}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full mx-auto"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} className="py-8 px-0">
            <div className="shadow-black/30 g-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-bold mb-1">{project.title}</h4>
                <p className="text-sm text-zinc-400">{project.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProjectSlider;

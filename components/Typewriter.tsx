"use client";

// components/Typewriter.tsx
import React from "react";
import Typewriter from "typewriter-effect";

const TypewriterComponent = () => {
  return (
    <div className="text-xl font-bold">
      <Typewriter
        options={{
          strings: [
            "Web Developer.",
            "Graphic Designer.",
            "Creative Developer.",
          ],
          autoStart: true,
          loop: true,
          delay: 50,
        }}
      />
    </div>
  );
};

export default TypewriterComponent;

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SkillGraph from "@/components/SkillGraph";
import SkillPills from "@/components/SkillPills";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import ProjectSlider from "@/components/ProjectCarousel";
import Works from "@/components/Works";
import Image from "next/image";
import { GlowingEffectDemo } from "@/components/GlowEffectDemo";
import { HeroParallaxDemo } from "@/components/HeroParallaxDemo";
import LenisProvider from "@/providers/LenisProvider";

export default function Home() {
  return (
    <div className="bg-[#101010]">
      <LenisProvider />
      {/* <Hero /> */}
      <HeroParallaxDemo />
      {/* <SkillPills /> */}
      <div className="h-auto overflow-hidden bg-[radial-gradient(circle_at_center,_#333_0%,_#101010_60%)]">
        <MacbookScroll />
      </div>

      {/* <div className="p-12">
        <GlowingEffectDemo />
      </div> */}
      <ProjectSlider />
      {/* <Works /> */}
      <SkillGraph />
    </div>
  );
}

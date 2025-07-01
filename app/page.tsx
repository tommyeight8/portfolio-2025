import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SkillGraph from "@/components/SkillGraph";
import SkillPills from "@/components/SkillPills";
import Works from "@/components/Works";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />
      {/* <SkillPills /> */}
      <Works />
      <SkillGraph />
      <Footer />
    </>
  );
}

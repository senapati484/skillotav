"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  LuArrowRight,
  LuGraduationCap,
  LuShieldCheck,
  LuTrophy,
} from "react-icons/lu";
import RotatingText from "./ui/rotatingtext";

const HeroSection = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12 px-4">
      {/* Badge */}
      {/* <div className="mb-6">
        <span className="inline-block border-2 border-black px-3 py-1 text-sm bg-blue-100 rounded-md">
          Skill Verification Platform
        </span>
      </div> */}

      {/* Heading */}
      <div
        className="text-10xl md:text-8xl mb-4 flex flex-row items-center gap-6 text-center z-0 font-bold"
        style={{ fontFamily: "ClashDisplay-Medium, sans-serif" }}
      >
        Tokenise your{" "}
        <span className="px-2 sm:px-2 md:px-3 bg-[#5294ff] text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg font-bold">
          <RotatingText
            texts={["Skills", "Credentials", "Experience", "Knowledge"]}
            className="font-bold"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.03}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={5000}
          />
        </span>
      </div>

      {/* Subheading */}
      <p className="text-lg max-w-3xl mx-auto mb-8 text-center">
        A revolutionary platform that transforms your academic achievements and
        professional skills into verifiable digital credentials. Join the future
        of skill verification and career advancement.
      </p>

      {/* CTA Button */}
      <Button
        className="mb-18 text-3xl py-7 px-6"
        style={{ fontFamily: "ClashDisplay-Medium, sans-serif" }}
      >
        Get Started <LuArrowRight className="ml-2" />
      </Button>

      {/* Features Section */}
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Academic Credentials",
            desc: "Securely store and share verified academic records.",
            icon: <LuGraduationCap className="size-8 md:size-10" />,
            bg: "bg-secondary-background",
            iconBg: "bg-main",
          },
          {
            title: "Skill Verification",
            desc: "Get endorsed by industry experts for your abilities.",
            icon: <LuShieldCheck className="size-8 md:size-10" />,
            bg: "bg-secondary-background",
            iconBg: "bg-main",
          },
          {
            title: "Reward System",
            desc: "Earn points and rewards for verified contributions.",
            icon: <LuTrophy className="size-8 md:size-10" />,
            bg: "bg-secondary-background",
            iconBg: "bg-main",
          },
        ].map(({ title, desc, icon, bg, iconBg }, i) => (
          <div
            key={i}
            className={`p-6 border-2 border-border rounded-xl shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all ${bg}`}
          >
            <div
              className={`p-3 rounded-md border border-border inline-block ${iconBg}`}
            >
              {icon}
            </div>
            <h3 className="text-2xl font-bold mt-6 mb-2">{title}</h3>
            <p className="text-base text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

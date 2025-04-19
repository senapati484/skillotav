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
import Link from "next/link";
import { Card, CardHeader, CardContent } from "./ui/card";

const HeroSection = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12 px-4">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        {/* Heading */}
        <h1
          className="text-6xl md:text-8xl mb-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center z-0 font-bold"
          style={{ fontFamily: "ClashDisplay-Medium, sans-serif" }}
        >
          Tokenise your{" "}
          <span className="px-3 md:px-4 bg-[#5294ff] text-black overflow-hidden py-2 md:py-3 rounded-lg font-bold inline-block">
            <RotatingText
              texts={["Skills", "Credentials", "Experience", "Knowledge"]}
              className="font-bold"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={5000}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-muted-foreground">
          A revolutionary platform that transforms your academic achievements
          and professional skills into verifiable digital credentials.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16">
          <Button
            size="lg"
            className="text-lg md:text-xl py-6 px-8"
            style={{ fontFamily: "ClashDisplay-Regular, sans-serif" }}
          >
            <Link href="/auth/login" className="flex items-center">
              Join as Candidate <LuArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg md:text-xl py-6 px-8"
            style={{ fontFamily: "ClashDisplay-Regular, sans-serif" }}
          >
            <Link href="/auth/login" className="flex items-center">
              Join as Recruiter <LuArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          {
            title: "Academic Credentials",
            desc: "Securely store and share verified academic records",
            icon: <LuGraduationCap className="size-8 md:size-10" />,
          },
          {
            title: "Skill Verification",
            desc: "Get endorsed by industry experts for your abilities",
            icon: <LuShieldCheck className="size-8 md:size-10" />,
          },
          {
            title: "Reward System",
            desc: "Earn points and rewards for verified contributions",
            icon: <LuTrophy className="size-8 md:size-10" />,
          },
        ].map(({ title, desc, icon }, i) => (
          <Card
            key={i}
            className="transition-all hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none"
          >
            <CardHeader>
              <div className="p-3 rounded-md border-2 border-border bg-main/10 inline-block">
                {icon}
              </div>
              <h3 className="text-2xl font-clash font-bold mt-4">{title}</h3>
            </CardHeader>
            <CardContent>
              <p className="text-base text-muted-foreground">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;

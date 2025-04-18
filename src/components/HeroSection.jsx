import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  LuArrowRight,
  LuGraduationCap,
  LuShieldCheck,
  LuTrophy,
} from "react-icons/lu";

const HeroSection = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col gap-16 py-16">
      {/* Hero Content */}
      <div className="container mx-auto max-w-6xl px-4 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Visual Card */}
        <div className="w-full z-0 lg:w-1/2 h-[500px] rounded-xl border-2 border-border bg-main shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all p-8 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(0,0,0,0.05)_0%,_transparent_80%)] backdrop-blur-sm" />
          <div className="relative text-center space-y-6">
            <Badge
              variant="neutral"
              className="text-base px-5 py-2 rounded-full border border-border"
            >
              Skill Verification Platform
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold font-heading leading-snug">
              Transform Skills <br /> Into Digital Assets
            </h2>
          </div>
        </div>

        {/* Right Description */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight font-heading">
            <span className="inline-block px-3 py-2 border-2 border-border shadow-md bg-main mb-4">
              Tokenize
            </span>
            <br />
            Your Academics & Knowledge
          </h1>
          <p className="text-lg bg-secondary-background border border-border p-5 rounded-md leading-relaxed">
            Showcase verified credentials, prove your skills, and earn rewards —
            all on a decentralized platform reshaping the future of education.
          </p>
          <Button
            size="lg"
            className="text-lg font-semibold px-4 py-3 h-auto flex items-center gap-2"
          >
            Get Started <LuArrowRight className="size-5" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "Academic Credentials",
            desc: "Securely store and share verified academic records.",
            icon: <LuGraduationCap className="size-8 md:size-10" />,
            bg: "bg-main",
            iconBg: "bg-secondary-background",
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
            bg: "bg-main",
            iconBg: "bg-secondary-background",
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

import React from "react";
import { Button } from "./ui/button";
import { LuArrowRight } from "react-icons/lu";

const HeroSection = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center py-12 px-4">
      {/* Badge */}
      <div className="mb-6">
        <span className="inline-block border-2 border-black px-3 py-1 text-sm bg-blue-100 rounded-md">
          Skill Verification Platform
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center max-w-3xl">
        Tokenize your academics and knowledge
      </h1>

      {/* Subheading */}
      <p className="text-lg max-w-2xl mx-auto mb-8 text-center">
        Verify skills, showcase academic credentials, and earn rewards in a
        decentralized platform designed for the future of education.
      </p>

      {/* CTA Button */}
      <Button className="mb-12">
        Get Started <LuArrowRight className="ml-2" />
      </Button>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <div className="border-2 border-black p-6 rounded-md bg-white">
          <h3 className="text-lg font-bold mb-2">Academic Credentials</h3>
          <p className="text-sm">
            Securely store and share your academic achievements with verified
            institutions.
          </p>
        </div>

        <div className="border-2 border-black p-6 rounded-md bg-white">
          <h3 className="text-lg font-bold mb-2">Skill Verification</h3>
          <p className="text-sm">
            Get your skills verified by experts and showcase them to potential
            employers.
          </p>
        </div>

        <div className="border-2 border-black p-6 rounded-md bg-white">
          <h3 className="text-lg font-bold mb-2">Reward System</h3>
          <p className="text-sm">
            Earn rewards for your achievements and contributions to the
            community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

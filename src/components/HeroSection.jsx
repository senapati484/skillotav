import React from "react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div>
        <h1 className="text-4xl font-extrabold dark:invert">SKILLOTAV</h1>
      </div>
      <div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
          error porro reiciendis ad, fuga commodi quisquam vitae, repudiandae
          praesentium soluta libero quaerat inventore iusto nostrum fugiat atque
          blanditiis distinctio exercitationem!
        </p>
      </div>
      <div className="w-full">
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default HeroSection;

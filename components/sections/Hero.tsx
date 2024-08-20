"use client";
import React from "react";
import { AuroraBackground } from "../aurora";
import SignUpWaitlist from "../SignUpWaitlist";

import Cobe from "../cobe";

const Hero = () => {
  return (
    <section id="hero" className="w-full overflow-hidden min-h-full">
      <AuroraBackground className="w-full fc sm:items-start relative z-10 min-h-screen px-5 sm:px-10 pb-10 py-36">
        <SignUpWaitlist />
        <div className="absolute md:fr md:w-full hidden md:-right-[50vw] lg:-right-[40vw] xl:-right-[30vw] md:h-full size-72 z-10 overflow-hidden px-5">
          {/* <World data={sampleArcs} globeConfig={globeConfig} /> */}
          <Cobe />
        </div>
        {/* <BackgroundBeams /> */}
      </AuroraBackground>
    </section>
  );
};

export default Hero;

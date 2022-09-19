import Image from "next/image";

import { FaArrowRight, FaBatteryHalf } from "react-icons/fa";
import Link from "next/link";
import { gsap, Expo } from "gsap/dist/gsap";
import React, { useEffect, useState } from "react";
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

export default function FrontPage() {
  


  return (
    <>
    <div className="desktop md:block hidden"></div>
    <div className="mobile  md:hidden "></div>
    <div id="mark"
      style={{ height: "100vh", width: "100%"}}
      className="text-white flex justify-center md:flex md:flex-row md:justify-center overflow-hidden relative align-middle items-center "
    >
      <div className="happy">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center">
            <h1 className="spooky mt-24 md:mt-0 text-4xl md:text-6xl font-bold text-center">
              <span className="">Happy</span> <br />
              <span className="">Halloween</span> <br />
            </h1>
            </div>
          </div>
      </div>
    </div>
    </>
  );
}

import Image from "next/image";

import { FaArrowRight, FaBatteryHalf } from "react-icons/fa";
import Link from "next/link";
import { gsap, Expo } from "gsap/dist/gsap";
import React, { useEffect, useState } from "react";
const tl = gsap.timeline({ defaults: { ease: "power1.out" } });
let mm = gsap.matchMedia();


export default function FrontPage() {

  useEffect(() => {
    // Desktop
    mm.add( "(min-width: 1025px)",
      () => {
      tl.from(".desktop", { x: "100%", duration: 1, delay: 0.5, ease: Expo.easeOut });
      tl.from(".deskbottomright", { y: "100%", x:"100%", duration: 1,  ease: Expo.easeOut }, "-=1");
      tl.from(".deskbottomleft", { y: "100%", x:"-100%", duration: 1,  ease: Expo.easeOut }, "-=1");
      tl.from(".spooky", { y: "200%", opacity: 0 ,duration: 2,  ease: Expo.easeOut });
    });
    // Mobile
    mm.add( "(max-width: 1024px)",
      () => {
      tl.from(".mobiletop", { x: "100%", duration: 1, delay: 0.5, ease: Expo.easeOut });
      tl.from(".mobilemiddle", { x: "-100%",  duration: 1,  ease: Expo.easeOut }, "-=1");
      tl.from(".mobilebottom", { y: "100%",  duration: 1,  ease: Expo.easeOut }, "-=1");
    });

 

  }, []);
  


  return (
    <>
    <div className=" sm:block hidden">
      <div className="desktop "></div>
      <div className="deskbottomright"></div>
      <div className="desktopleft"></div>
      <div className="deskbottomleft"></div>
    </div>
    <div className="sm:hidden block ">
      <div className="mobiletop"></div>
      <div className="mobilemiddle"></div>
      <div className="mobilebottom"></div>
    </div>
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

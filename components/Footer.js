// const navigation = [
//   { name: "About", href: "/contact" },
//   { name: "Shop", href: "#" },
//   { name: "Jobs", href: "#" },
//   { name: "Terms and Conditions", href: "#" },
// ];
import Link from "next/link";
import React, { useState } from "react";

import { FaPlus, } from "react-icons/fa";
export default function Footer() {
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [showMe, setShowMe] = useState(false);
  const [showMe1, setShowMe1] = useState(false);
  const [showMe2, setShowMe2] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  }
  function toggle1() {
    setShowMe1(!showMe1);
  }
  function toggle2() {
    setShowMe2(!showMe2);
  }
  return (
    <div className="md:flex relative text-white justify-around p-10 z-20 foot">
      <div>
        <button
          onClick={toggle1}
          className="md:hidden flex justify-between w-full items-center border-b-2 border-gray-500 py-3"
        >
          Service and help <FaPlus />
        </button>
        <div
          style={{
            display: showMe1 ? "block" : "none",
          }}
          className="md:hidden"
        >
          <div>
            <Link href="/info/about">
              <a className="cursor-pointer ">
                <span className="md:text-3xl  px-2  sm:px-4">About</span>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/info/contact">
              <a className="cursor-pointer ">
                <span className="md:text-3xl  px-2  sm:px-4">Contact</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="hidden md:flex">
          <div>
            <Link href="/info/about">
              <a className="cursor-pointer ">
                <span className="md:text-3xl  px-2  sm:px-4">About</span>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/info/contact">
              <a className="cursor-pointer ">
                <span className="md:text-3xl  px-2  sm:px-4">Contact</span>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

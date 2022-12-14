import ProductCard from "./ProductCard";
import React, { Suspense, useRef, useState, useEffect } from "react";
import { gsap, Expo } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const ProductList = ({ products }) => {
  // useEffect(() => {
  //   ScrollTrigger.create({
  //     trigger: ".product-list",
  //     start: "top 50%",
  //     end: "bottom 0%",

  //     onEnter: () => {
  //       gsap.to(".colormix", {
  //         duration: 1,
  //         color: "#000",
  //       });
  //     },

  //     onLeaveBack: () => {
  //       gsap.to(".colormix", {
  //         duration: 1,
  //         color: "#fff",
  //       });
  //     },
  //   });
  //   ScrollTrigger.create({
  //     trigger: ".product-list",
  //     start: "top 50%",
  //     end: "bottom 0%",

  //     onEnter: () => {
  //       gsap.to(".colornav", {
  //         duration: 1.0,
  //         color: "#000",
  //         backgroundColor: "#fff",
  //       });
  //     },

  //     onLeaveBack: () => {
  //       gsap.to(".colornav", {
  //         duration: 1.0,
  //         color: "#fff",
  //         backgroundColor: "#000",
  //       });
  //     },
  //   });
  // });

  return (
    <div style={{
      
    }} id="body" className="relative product-list px-2 ">
      <div className="max-w-2xl mx-auto py-16  sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 ">
        <h1  className="text-2xl py-2  font-extrabold happy">
          Most Popular
        </h1>
        <div className="grid grid-cols-2  gap-y-50 gap-x-1 lg:even:grid-cols-4 lg:odd:grid-cols-2  xl:gap-2">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

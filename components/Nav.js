import Link from "next/link";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/shopContext";
import MiniCart from "./MiniCart";
import { BsBag } from "react-icons/bs";
import { gsap, Expo } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({
  defaults: { ease: "power3.out" },
});
export default function Nav() {
  const { cart, cartOpen, setCartOpen } = useContext(CartContext);

  let cartQuantity = 0;
  cart.map((item) => {
    return (cartQuantity += item?.variantQuantity);
  });
  let cartTotal = 0;
  cart.map((item) => {
    cartTotal += item?.variantPrice * item?.variantQuantity;
  });

  if (cartTotal >= 50) {
    var Good = "Congratulations! We pay shipping!";
  } else {
    var shippingaway = Math.round(50 - cartTotal);
    var free = "You're only" + " $" + shippingaway + " from free shipping";
  }

  useEffect(() => {
    const showAnim = gsap
      .from(".nav-main", {
        yPercent: -300,
        paused: true,
        duration: 0.2,
        opacity: 0,
      })
      .progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });
  });

  return (
    <header className="fixed bg-transparent w-full colornav text-white  max-w-xl mx-auto pt-5   2xl:max-w-full 2xl:px-8 z-50 font-black ">
       <div className="shipping text-center">
        <h1>
          {free} {Good}
        </h1>
      </div>
      <div className="nav-main justify-center  flex flex-col sm:flex-row   text-center items-center">
        <div className="nav-pages text-center sm:pl-96   md:pl-0  flex md:gap-x-2 uppercase ">
          <div>
            <Link href="/">
              <a className="cursor-pointer">
                <span className="md:text-3xl  px-2  sm:px-4">Home</span>
              </a>
            </Link>
          </div>
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

          <div className="happy">
            <a
              className="text-md font-bold cursor-pointer"
              onClick={() => setCartOpen(!cartOpen)}
            >
              <div  className="relative">
                <BsBag size="1.5rem" />
                <div
                  style={{ fontSize: "10px", left: "10px" }}
                  className="absolute top-1 text-sm"
                >
                  {cartQuantity}
                </div>
              </div>
            </a>
          </div>

          <MiniCart cart={cart} />
        </div>
      </div>
    </header>
  );
}

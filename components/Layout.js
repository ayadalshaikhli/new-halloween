import React from "react";
import Footer from "./Footer";
import Hero from "./Hero";
import IntroAnimation from "./IntroAnimation";
import Nav from "./Nav";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col justify-between min-h-full min-w-full ">
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          font-size: 18px;
          font-weight: 400;
          line-height: 1.8;
          color: #333;
          font-family: sans-serif;
          background: #101010 !important;
          overflow-x: hidden;
        }
        body::before {
            animation: grain 8s steps(10) infinite;
            background-image: url("./picture/noise.png");
            content: "";
            height: 300%;
            left: -50%;
            opacity: 0.8;
            position: fixed;
            top: -100%;
            width: 300%;
        }
        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -10%);
          }
          20% {
            transform: translate(-15%, 5%);
          }
          30% {
            transform: translate(7%, -25%);
          }
          40% {
            transform: translate(-5%, 25%);
          }
          50% {
            transform: translate(-15%, 10%);
          }
          60% {
            transform: translate(15%, 0%);
          }
          70% {
            transform: translate(0%, 15%);
          }
          80% {
            transform: translate(3%, 35%);
          }
          90% {
            transform: translate(-10%, 10%);
          }
        }
        h1 {
          font-weight: 700;
        }
        p {
          margin-bottom: 10px;
        }
        .spooky{
          font-family: 'Creepster', cursive;
        }
        .desktop{
          background-image: url("./picture/desktopright.png");
          background-repeat: no-repeat;
          background-size: 35%;
          background-position: top right;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          overflow: hidden;
        }
        .deskbottomright{
          background-image: url("./picture/deskbottomright.png");
          background-repeat: no-repeat;
          background-size: 27%;
          background-position: bottom right;
          position: absolute;
          height: 100%;
          width: 100%;
          bottom: 31%;
          right: 0;
          z-index: -1;
        }
        .deskbottomleft{
          background-image: url("./picture/deskbottomleft.png");
          background-repeat: no-repeat;
          background-size: 37%;
          background-position: bottom left;
          position: absolute;
          height: 100%;
          width: 100%;
          bottom: 31%;
          left: 0;
          z-index: -1;
        }
        .mobiletop{
          background-image: url("./picture/mobiletop.png");
          background-repeat: no-repeat;
          background-size: 30%;
          background-position: top right;
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          right: 0;
          z-index: -1;
        }
        .mobilemiddle{
          background-image: url("./picture/mobilemiddle.png");
          background-repeat: no-repeat;
          background-size: 50%;
          background-position: top;
          position: absolute;
          height: 100vh;
          width: 100%;
          top: 45.5%;
          left: 53%;
          transform: translate(-50%, -50%);
          z-index: -1;
        }
       
        .mobilebottom{
          background-image: url("./picture/mobilebottom.png");
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: bottom;
          position: absolute;
          height: 100vh;
          width: 100%;
          bottom: 0;
          left: 48%;
          transform: translate(-50%, -50%);
          z-index: -1;

        }

        .happy{
          color: #D77400 !important;
        }
     
      `}</style>
      {/* <IntroAnimation /> */}
      <Nav />
      <main   style={{ zIndex: "10" }}>{children}</main>
      <Footer />
    </div>
  );
}

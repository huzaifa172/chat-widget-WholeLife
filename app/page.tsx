"use client";
import Script from "next/script";

export default function Home() {
  return (
   <>
        <Script src="/chat-widget.js"></Script>
        <Script id="chat-widget-init">{`
        window.onload = function() {
            ChatWidget.init("xx-slkUdka819...");
        };
        `}</Script>
<<<<<<< HEAD
      <div className="flex justify-center items-center h-[100vh] w-[100vw] bg-gray-100">
        <h1 className="text-black text-center font-bold font-[70px] ">Whole Life Chat Widget</h1>
      </div>
      <div>
      <iframe src="..." className="hidden" ></iframe>
      <button id="trigger-btn"></button>
    </div>
=======
        <iframe src="..." className="hidden" ></iframe>
        {/* Chat widget deployed on vercel by Huzaifa:*/}
        {/* <iframe
          src="https://demo-practics-chat.vercel.app/"
          width="400"
          height="500"
          style={{border: "none", position: "fixed", bottom: "0px", right: "0px"}}
        ></iframe> */}
      {/* <div>
        <button id="trigger-btn"></button>
      </div> */}
>>>>>>> 942c0fbb3c6b7760aacae8d4d29689ff007e6882

   </>
  );
}

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
      <div className="flex justify-center items-center h-[100vh] w-[100vw] bg-gray-100">
        <h1 className="text-black text-center font-bold font-[70px] ">Whole Life Chat Widget</h1>
      </div>
      <div>
      <iframe src="..." className="hidden" ></iframe>
      <button id="trigger-btn"></button>
    </div>

   </>
  );
}

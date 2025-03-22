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
      <div className="flex justify-center items-center bg-transparent p-[50px]">
      <div>
      <iframe src="..." className="hidden" ></iframe>
      <button id="trigger-btn"></button>
    </div>
      </div>
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

   </>
  );
}

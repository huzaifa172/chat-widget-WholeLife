"use client";
import Script from "next/script";
import './chat/style.css'

export default function Home() {
  return (
   <>
        <Script src="/chat-widget.js"></Script>
        <Script id="chat-widget-init">{`
        window.onload = function() {
            ChatWidget.init("xx-slkUdka819...");
        };
        `}</Script>
  
      <div className="hidden">
      <iframe src="..." className="hidden" ></iframe>
      <button id="trigger-btn"></button>
    </div>
   </> 
  );
}

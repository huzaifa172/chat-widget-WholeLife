import Script from "next/script";


export default function Home() {
  return (
   <>
        <Script src="/chat-widget.js"></Script>
        <Script>{`
        window.onload = function() {
            ChatWidget.init("xx-slkUdka819...");
        };
        `}</Script>
{/* 
      <div>
      <iframe src="..."></iframe>
      <button id="trigger-btn"></button>
    </div> */}

   </>
  );
}

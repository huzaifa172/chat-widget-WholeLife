"use client";
import { useRef, useState } from "react";

export default function ChatWidget() {
  const scrollTargetRef = useRef(null);
  const intialMesages = [
    {
      role: "user",
      content: "Hi, what is websitebot?",
    },
    {
      role: "bot",
      content:
        "WebsiteBot is a software application designed to perform automated tasks on websites.",
    },
  ];
  const [messages, setMessages] = useState(intialMesages);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message) {
      return;
    }

    setMessages([...messages, { role: "user", content: message }]);
    e.target.message.value = "";
    setTimeout(() => {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="relative bg-white max-w-[400px]">
      <p className="p-4 font-medium">Chat with me!</p>
      <div className="divide-y divide-gray-300/50 border-t border-gray-300/50">
        <div className="space-y-6 py-8 text-base leading-7 text-gray-600 h-[400px] overflow-y-auto">
          <ul className="space-y-4 px-4">
            {messages.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-center ${
                  item.role === "user" ? "ml-10 justify-end" : "mr-10"
                }`}
              >
                <p className="bg-gray-100 p-4 rounded-md">{item.content}</p>
              </li>
            ))}
          </ul>
          <div ref={scrollTargetRef}></div>
        </div>
        <form
          onSubmit={handleSubmitMessage}
          className="p-4 flex gap-2 text-base font-semibold leading-7"
        >
          <input
            name="message"
            placeholder="Ask any question"
            className="px-2 py-1.5 border rounded-md flex-1 font-normal focus:outline-none focus:border-gray-400"
          />
          <button className="bg-gray-600 px-2.5 rounded-md text-white">
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" x2="11" y1="2" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

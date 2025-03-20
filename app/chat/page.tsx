"use client";
import { useRef, useState } from "react";

export default function ChatWidget() {
  const scrollTargetRef = useRef<HTMLDivElement | null>(null);
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

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const form = e.currentTarget;
    const input = form.elements.namedItem("message") as HTMLInputElement;
    
    if (!input || !input.value) {
      return;
    }
  
    setMessages([...messages, { role: "user", content: input.value }]);
    input.value = "";
  
    setTimeout(() => {
      scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);


    // this is previous code
    // const message = e.target.message.value;
    // if (!message) {
    //   return;
    // }

    // setMessages([...messages, { role: "user", content: message }]);
    // e.target.message.value = "";
    // setTimeout(() => {
    //   scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    // }, 100);


  };
  const quickQuestionArray = [{
    role: "user",
    content: "What is websitebot?",
  },
  {
    role: "user",
    content: "can help me",
  },{
    role: "user",
    content: "details?",
  },{
    role: "user",
    content: "how much it will get",
  },{
    role: "user",
    content: "you address ?",
  },{
    role: "user",
    content: "explain services",
  },{
    role: "user",
    content: "whats the price",
  },
];
function handleQQ(idx) {
if (typeof window !== "undefined") {
  const selectedQuestion = quickQuestionArray[idx].content;
  setMessages((prevMessages) => [...prevMessages, { role: "user", content: selectedQuestion }]);

  setTimeout(() => {
    scrollTargetRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 100);
}}
  
  
  return (
    <div className="relative bg-white max-w-[400px] rounded-[10px] border border-[#f59e0b] rounded-[10px]">
      <p className="p-4 font-bold">Chat with me!</p>
      <div className="divide-y divide-gray-300/50 border-t border-t-[#f59e0b] border-gray-300/50 ">
        <div className="space-y-6 py-8 text-[13px] leading-7 text-gray-700 h-[300px] overflow-y-auto">
          <ul className="space-y-4 px-4">
            {messages.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-center ${
                  item.role === "user" ? "ml-10 justify-end" : "mr-10"
                }`}
              >
                <p className={`py-1 px-3 rounded-[12px] text-white `} style={{ backgroundImage: "linear-gradient(135deg, #d1c5b7 0%, #756d5d 100%)" }}
                >{item.content}</p>
              </li>
            ))}
          </ul>
          <div ref={scrollTargetRef}></div>
        </div>
        {/* quick questions cnt here */}
        <div className="px-2 py-1">
            <ul className="bg-[#F8F9FA] p-1 flex gap-[2px] overflow-x-scroll overflow-y-hidden rounded-md" >
              {quickQuestionArray.map((item, idx) => (
                <li key={idx}  className="w-[100%] rounded-md">
                  <p className="quickQues text-center w-[120] text-[12px] p-1 border rounded-[5px] bg-[#f59e0b] text-white w-[100%] cursor-pointer" id={`quickQues-${idx.toString()}`}  onClick={()=> handleQQ(idx)}>{item.content}</p>

                </li>))}

            </ul>
        </div>


        <form
          onSubmit={handleSubmitMessage}
          className="p-4 flex gap-2 text-base font-semibold leading-7"
        >
          <input
            name="message"
            placeholder="Ask any question"
            className="px-2 py-1.5 border text-[12px] border-gray-300 rounded-full flex-1 font-normal focus:outline-none focus:border-[#f59e0b]"
          />
          <button className="bg-[#f59e0b] px-2.5 rounded-full text-white">
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

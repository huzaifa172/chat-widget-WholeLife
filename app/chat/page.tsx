'use client';
import { useRef, useState, useEffect } from 'react';

export default function ChatWidget() {
  const scrollTargetRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<
    Array<{ role: string; content: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchInitialGreeting = async () => {
      if (isInitialized) return;

      setIsLoading(true);
      try {
        const response = await fetch('/api/greeting');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setMessages([
          {
            role: 'bot',
            content: data['start chat'],
          },
        ]);

        setIsInitialized(true);
      } catch (error) {
        console.error('Error fetching initial greeting:', error);
        setMessages([
          {
            role: 'bot',
            content: 'Hello! How can I help you today?',
          },
        ]);
        setIsInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialGreeting();
  }, [isInitialized]);

  const fetchResponse = async (userMessage: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: data['response']['output_text'] },
      ]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'bot',
          content: "Sorry, I couldn't process your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;

    if (!input || !input.value) {
      return;
    }

    const userMessage = input.value;
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: userMessage },
    ]);
    input.value = '';
    fetchResponse(userMessage);

    setTimeout(() => {
      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  const quickQuestionArray = [
    { id: 1, content: 'I need prayer or pastoral care' },
    { id: 2, content: 'Join or transfer membership' },
    { id: 3, content: 'Connect with Small Community' },
    { id: 4, content: 'Volunteer opportunities' },
    { id: 5, content: 'Bible study & baptism' },
    { id: 6, content: "I'd like to be baptized" },
    { id: 7, content: 'Child dedication' },
    { id: 8, content: 'Upcoming events' },
  ];
  type AnswersType = {
    [key: string]: string;
  };
  const predefinedAnswers: AnswersType = {
    '1': 'https://share.fluro.io/form/67925d7b38320400360a03d2',
    '2': 'https://share.fluro.io/form/6762d242e959460036fc930b',
    '3': 'https://wholelife.church/communities',
    '4': 'https://wholelife.church/serve',
    '5': 'https://share.fluro.io/form/67925e5681240d00364dbb34',
    '6': 'https://share.fluro.io/form/67925e5681240d00364dbb34',
    '7': 'https://share.fluro.io/form/67925e1f5fa1330036333547',
    '8': 'https://wholelife.church/events',
  };

  function handleQQ(idx: number) {
    if (typeof window !== 'undefined') {
      const selectedQuestion = quickQuestionArray[idx];
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'user',
          content: selectedQuestion.content,
        },
      ]);
      setIsLoading(true);
      setTimeout(() => {
        if (selectedQuestion.id === 9) {
          fetchResponse(selectedQuestion.content);
        } else {
          const answer = predefinedAnswers[selectedQuestion.id.toString()];

          if (answer) {
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                role: 'bot',
                content: `For information on ${selectedQuestion.content}, please visit this link: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="inline-block align-text-bottom mr-1"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg><a href="${answer}" target="_blank" class="text-white underline hover:text-gray-200">${answer}</a>`,
              },
            ]);
          } else {
            fetchResponse(selectedQuestion.content);
          }
        }

        setIsLoading(false);

        setTimeout(() => {
          scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }, 1000); // 1 second delay

      scrollTargetRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="relative bg-transparent max-w-[400px] mt-8 rounded-[10px] border border-[#f59e0b] rounded-[10px] pb-[0px] pt-[0px] mt-[0px] mb-[0px]">
      <div style={{ display: 'flex', alignContent: 'center', alignItems: 'center', marginLeft: '2vh' }} className='bg-transparent'>
          <img
            src="logo.png"
            alt="Wholelife Church Logo"
            className="object-contain w-full h-full p-1"
            style={{width: "45px"}}
          />
        <p className="p-4 font-bold text-black">Chat with me!</p>
      </div>
      <div className="divide-y divide-gray-300/50 border-t border-t-[#f59e0b] border-gray-300/50 ">
        <div className="space-y-6 py-8 text-[13px] leading-7 text-gray-700 h-[300px] overflow-y-auto">
          <ul className="space-y-4 px-4">
            {messages.map((item, idx) => (
              <li
                key={idx}
                className={`flex items-center ${
                  item.role === 'user' ? 'ml-10 justify-end' : 'mr-10'
                }`}
              >
                <p
                  className={`py-1 px-3 rounded-[12px] ${
                    item.role === 'user'
                      ? 'bg-[#f59e0b] text-white'
                      : 'text-white'
                  }`}
                  style={{
                    backgroundImage:
                      item.role === 'user'
                        ? 'none'
                        : 'linear-gradient(135deg, #d1c5b7 0%, #756d5d 100%)',
                  }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></p>
              </li>
            ))}
            {isLoading && (
              <li className="flex items-center mr-10">
                <p
                  className="py-1 px-3 rounded-[12px] text-black"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #d1c5b7 0%, #756d5d 100%)',
                  }}
                >
                  Thinking...
                </p>
              </li>
            )}
          </ul>
          <div ref={scrollTargetRef}></div>
        </div>
        {/* quick questions cnt here */}
        <div className="px-2 py-1">
          <ul className="bg-[#F8F9FA] p-1 flex gap-[2px] overflow-x-scroll overflow-y-hidden rounded-md">
            {quickQuestionArray.map((item, idx) => (
              <li key={idx} className="min-w-[150px] flex-shrink-0 rounded-md">
                <p
                  className="quickQues text-center text-[12px] p-1 border rounded-[5px] bg-[#f59e0b] text-white w-full cursor-pointer"
                  id={`quickQues-${idx.toString()}`}
                  onClick={() => handleQQ(idx)}
                >
                  {item.content}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={handleSubmitMessage}
          className="p-4 flex gap-2 text-base font-semibold leading-7"
        >
          <input
            name="message"
            placeholder="Ask any question"
            className="px-2 py-1.5 border text-black text-[12px] border-gray-300 rounded-full flex-1 font-normal focus:outline-none focus:border-[#f59e0b]"
            disabled={isLoading}
          />
          <button
            className="bg-[#f59e0b] px-2.5 rounded-full text-white"
            disabled={isLoading}
          >
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

import { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import askQuestion from "../services/chat";
import { motion } from 'framer-motion';

const initialMessages = [
  {
    role: "assistant",
    message: "¡Hola! Soy tu amigo para practicar español. ¿Listo para empezar?",
  },
];

function MiAmigo() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem("miAmigoMessages")
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
    setIsInitialLoad(false);
  }, [])
  
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem("miAmigoMessages", JSON.stringify(messages));
    }
  }, [messages, isInitialLoad]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    const newMessages = [...messages, { role: "user", message: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
   await askQuestion(newMessages)
      .then((reply) => {
        setMessages([...newMessages, { role: "assistant", message: reply }]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error from OpenAI:", error);
      });
  };

  const handleClearHistory = () => {
    localStorage.removeItem("miAmigoMessages");
    setMessages(initialMessages);
  };

  useEffect(() => {
    if (bottomRef.current && messages.length > 1) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length, isLoading]);

  

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -300, opacity: 0 }} 
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <Button
        className="absolute top-10 left-10 bg-gray-700 hover:bg-gray-800 hover:border-b-2 hover:border-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        to="/"
      >
        Back to Home
      </Button>
      <div className="flex flex-col h-screen items-center px-4 py-6">
        <h1 className="text-white text-2xl font-bold mb-2">Mi Amigo</h1>
        <p className="text-white text-lg mb-6">
          Learn Spanish with your friend
        </p>

        <div className="flex-grow overflow-y-auto border-2 border-yellow-500 rounded-md p-4 w-full max-w-[500px] mb-4 bg-white/5 text-white relative">
        {messages.length > 1 && (
          <button className="absolute top-4 right-4 text-white text-sm cursor-pointer" onClick={handleClearHistory}>X Clear History</button>
        )}
          {messages.map((message, index) => {
            const isUser = message.role === "user";

            return (
              <div
                key={index}
                className={`mb-2 flex ${
                  isUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] p-2 rounded-lg ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  <p className="text-sm">{message.message}</p>
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="mb-2 flex justify-start">
              <div className="max-w-[70%] p-2 rounded-lg bg-yellow-500 text-black">
                <div className="flex space-x-1">
                  <span className="animate-bounce [animation-delay:-0.3s]">
                    .
                  </span>
                  <span className="animate-bounce [animation-delay:-0.15s]">
                    .
                  </span>
                  <span className="animate-bounce">.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="flex items-center gap-4 w-full max-w-[500px]">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            type="text"
            placeholder="Message"
            className="w-full p-2 rounded-md border-2 border-yellow-500 bg-transparent text-white placeholder:text-white focus:outline-none"
          />
          <button
            className="bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default MiAmigo;

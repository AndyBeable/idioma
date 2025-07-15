import { useState } from 'react'
import Button from '../components/Button'

const initialMessages = [
  {
    role: 'user',
    message: 'Hello, how are you?'
  },
  {
    role: 'assistant',
    message: 'I am good, thank you!'
  }
]

function MiAmigo() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(initialMessages)

  const handleSendMessage = () => {
    console.log('hello')
    if(input.trim() === '') return

    setMessages([...messages, { role: 'user', message: input }])
    setInput('')
  }

  return (
    <>
    <Button className="absolute top-10 left-10 bg-gray-700 hover:bg-gray-800 hover:border-b-2 hover:border-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors" to="/">Back to Home</Button>
    <div className="flex flex-col h-screen items-center px-4 py-6 bg-black">
      <h1 className="text-white text-3xl font-bold mb-2">Mi Amigo</h1>
      <p className="text-white text-lg mb-6">Learn languages with your friend</p>

      {/* Chat History */}
      <div className="flex-grow overflow-y-auto border-2 border-yellow-500 rounded-md p-4 w-full max-w-[500px] mb-4 bg-white/5 text-white">
        {messages.map((message, index) => {
          const isUser = message.role === 'user'

          return (
            <div
              key={index}
              className={`mb-2 flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg ${
                  isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input Box */}
      <div className="flex items-center gap-4 w-full max-w-[500px]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Message"
          className="w-full p-2 rounded-md border-2 border-yellow-500 bg-transparent text-white placeholder:text-white focus:outline-none"
        />
        <button className="bg-blue-500 text-white p-2 px-4 rounded-md hover:bg-blue-600" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
    </>
  )
}

export default MiAmigo

import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
})

const askQuestion = async (messages) => {
try {

  const systemMessage = {
    role: 'system',
    content: 'You are a professional Spanish tutor. You should correct mistakes but not too strict. You should be friendly, encouraging and engaging. Your response should be in Spanish with English translation in brackets'
  }

  const chatCompletion = await openai.chat.completions.create({
    model: 'o4-mini-2025-04-16',
    messages: [systemMessage, ...messages.map(msg => ({
      role: msg.role,
      content: msg.message,
    }))],
  })
  const reply = chatCompletion.choices[0].message.content

  return reply
} catch (error) {
  console.error('Error from OpenAI:', error.message)
  throw error
}
}

export default askQuestion
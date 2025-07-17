// Import dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { OpenAI } = require('openai')

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Create Express app
const app = express()

// Enable CORS so your React app can talk to this server
app.use(cors())

// Parse incoming JSON requests
app.use(express.json())

// Simple test route
app.get('/', (req, res) => {
  res.send('Hello from server!')
})

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body

    const systemMessage = {
      role: 'system',
      content: 'You are a professional Spanish tutor. You should correct mistakes but not too strict. You should be friendly, encouraging and engaging.'
    }

    const chatCompletion = await openai.chat.completions.create({
      model: 'o4-mini-2025-04-16',
      messages: [systemMessage, ...messages.map(msg => ({
        role: msg.role,
        content: msg.message,
      }))],
    })

    const reply = chatCompletion.choices[0].message.content

    res.json({ reply })
  } catch (error) {
    console.error('Error from OpenAI:', error.message)
    res.status(500).json({ error: 'Something went wrong' })
  }
})



// Start server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
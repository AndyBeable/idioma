import { createClient } from 'contentful'

const client = createClient({
  space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
})

export const fetchFlashcards = async () => {
  try {
    const response = await client.getEntries({
      content_type: 'flashcard',
      order: 'sys.createdAt'
    })
    
    return response.items.map(item => ({
      id: item.sys.id,
      question: item.fields.question,
      answer: item.fields.answer,
      colorClass: item.fields.colorClass || 'bg-orange-100',
      category: item.fields.category || ''
    }))
  } catch (error) {
    console.error('Error fetching flashcards from Contentful:', error)
    throw error
  }
}

export default client 
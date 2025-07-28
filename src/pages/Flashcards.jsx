import Button from '../components/Button'
import Flashcard from '../components/Flashcard'
import CreateFlashCardModal from '../components/CreateFlashCardModal'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { fetchFlashcards } from '../services/contentful'

const defaultFlashcards = [
  {
    id: 1,
    question: "¿Cómo estás?",
    answer: "How are you?",
    colorClass: "bg-sky-600",
  },
  {
    id: 2,
    question: "¿Cuál es tu nombre?",
    answer: "What is your name?",
    colorClass: "bg-orange-100",
  },
  {
    id: 3,
    question: "¿De dónde eres?",
    answer: "Where are you from?",
    colorClass: "bg-green-600",
  },
  {
    id: 4,
    question: "¿Cuántos años tienes?",
    answer: "How old are you?",
    colorClass: "bg-red-600",
  }
]

function Flashcards() {
  const loadFlashcards = async () => {
    try {
      const contentfulCards = await fetchFlashcards()
      if (contentfulCards && contentfulCards.length > 0) {
        return contentfulCards
      }
    } catch (error) {
      console.log('Contentful fetch failed, using localStorage fallback:', error)
    }
    
    const saved = localStorage.getItem('flashcards')
    return saved ? JSON.parse(saved) : defaultFlashcards
  }

  const [flashcards, setFlashcards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [studyMode, setStudyMode] = useState('reveal')
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [cardQueue, setCardQueue] = useState([])
  const [currentCardNumber, setCurrentCardNumber] = useState(1)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const loadedCards = await loadFlashcards()
        setFlashcards(loadedCards)
        setCardQueue([...loadedCards])
      } catch (error) {
        console.error('Error loading flashcards:', error)
        setFlashcards(defaultFlashcards)
        setCardQueue([...defaultFlashcards])
      } finally {
        setIsLoading(false)
      }
    }
    
    loadData()
  }, [])

  useEffect(() => {
    if (flashcards.length > 0) {
      localStorage.setItem('flashcards', JSON.stringify(flashcards))
      setCardQueue([...flashcards])
    }
  }, [flashcards])

  useEffect(() => {
    setCurrentCardNumber(1)
  }, [cardQueue.length])
  
  function handleNext() {
    setIsAnswerVisible(false)
    
    if (cardQueue.length <= 1) {
      setCurrentCardNumber(1)
      return
    }
    
    setCurrentCardNumber(prev => {
      if (prev >= cardQueue.length) {
        return 1
      }
      return prev + 1
    })
    
    setCardQueue((prevQueue) => {
      const [first, ...rest] = prevQueue
      return [...rest, first]
    })
  }

  const currentIndex = Math.min(currentCardNumber, cardQueue.length)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white text-xl">Loading flashcards...</div>
      </div>
    )
  }

  return (
    <motion.div 
      className="relative flex flex-col h-screen"
      initial={{ x: 300, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      exit={{ x: -300, opacity: 0 }} 
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >   
      <div className="flex items-center justify-between p-4 lg:p-6">
        <Button className="bg-gray-700 hover:bg-gray-800 border-b-2 border-transparent hover:border-yellow-500 text-white font-bold py-2 px-3 lg:py-3 lg:px-6 rounded-lg transition-colors text-sm lg:text-base" to="/">Back to Home</Button>
        <h1 className="text-white text-xl lg:text-2xl font-bold">Test your knowledge</h1>
        <Button className="bg-gray-700 hover:bg-gray-800 border-b-2 border-transparent hover:border-yellow-500 text-white font-bold py-2 px-3 lg:py-3 lg:px-6 rounded-lg transition-colors text-sm lg:text-base" onClick={() => setIsOpen(true)}>Add Flashcard</Button>
      </div>
      
      <div className="text-center mb-8">
        <p className="text-white text-lg">Learn Spanish and test yourself with flashcards</p>
      </div>
      
      <div className="flex justify-center mb-4">
        <div className="flex bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setStudyMode('reveal')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              studyMode === 'reveal'
                ? 'bg-yellow-500 text-black'
                : 'text-white hover:bg-gray-600'
            }`}
          >
            Reveal Mode
          </button>
          <button
            onClick={() => setStudyMode('type')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              studyMode === 'type'
                ? 'bg-yellow-500 text-black'
                : 'text-white hover:bg-gray-600'
            }`}
          >
            Type Mode
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-[400px] h-[300px] lg:w-[600px] lg:h-[400px]">
        {cardQueue
          .slice(0, 4)
          .reverse()
          .map((card, index, arr) => {
            const zIndex = 10 + index
            const offset = (arr.length - 1 - index) * 10
            const isTopCard = index === arr.length - 1

            return (
              <div
                key={card.id}
                className="absolute transition-all duration-300"
                style={{
                  top: `${offset * 1.5}px`,
                  left: `${offset * 1.5}px`,
                  zIndex,
                }}
              >
                <Flashcard
                  flashcard={card}
                  isAnswerVisible={isTopCard ? isAnswerVisible : false}
                  setIsAnswerVisible={isTopCard ? setIsAnswerVisible : () => {}}
                  handleNext={isTopCard ? handleNext : null}
                  isInteractive={isTopCard}
                  currentIndex={currentIndex}
                  totalCards={cardQueue.length}
                  studyMode={studyMode}
                />
              </div>
            )
          })}
        </div>
      </div>
      
      <CreateFlashCardModal isOpen={isOpen} setIsOpen={setIsOpen} flashcards={flashcards} setFlashcards={setFlashcards} />
    </motion.div>
  )
}

export default Flashcards

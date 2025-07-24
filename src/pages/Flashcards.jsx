import Flashcard from '../components/Flashcard'
import Button from '../components/Button'
import CreateFlashCardModal from '../components/CreateFlashCardModal'
import { useState, useEffect } from 'react'

const defaultFlashcards = [
  {
    id: 1,
    question: 'How do you say Dog in Spanish?',
    answer: 'Perro',
    colorClass: 'bg-sky-600',
  },
  {
    id: 2,
    question: 'How do you say Cat in Spanish?',
    answer: 'Gato',
    colorClass: 'bg-orange-100',
  },
  {
    id: 3,
    question: 'How do you say Bird in Spanish?',
    answer: 'Pájaro',
    colorClass: 'bg-green-600',
  },
  {
    id: 4,
    question: 'How do you say Apple in Spanish?',
    answer: 'Manzana',
    colorClass: 'bg-orange-100',
  },
  {
    id: 5,
    question: 'How do you say Hello in Spanish?',
    answer: 'Hola',
    colorClass: 'bg-rose-600',
  },
  {
    id: 6,
    question: 'How do you say How are you in Spanish?',
    answer: '¿Cómo estás?',
    colorClass: 'bg-orange-500',
  },
  {
    id: 7,
    question: 'How do you say How old are you in Spanish?',
    answer: '¿Cuántos años tienes?',
    colorClass: 'bg-red-300',
  },
  {
    id: 8,
    question: 'How do you say Goodbye in Spanish?',
    answer: 'Adiós',
    colorClass: 'bg-amber-400',
  },
]

function Flashcards() {
  // Load flashcards from localStorage or use defaults
  const loadFlashcards = () => {
    const saved = localStorage.getItem('flashcards')
    return saved ? JSON.parse(saved) : defaultFlashcards
  }

  const [flashcards, setFlashcards] = useState(loadFlashcards)
  const [cardQueue, setCardQueue] = useState(loadFlashcards)
  const [isAnswerVisible, setIsAnswerVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [studyMode, setStudyMode] = useState('reveal')
  const [currentCardNumber, setCurrentCardNumber] = useState(1)

  const currentIndex = currentCardNumber

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards))
  }, [flashcards])

  useEffect(() => {
    setCardQueue([...flashcards])
  }, [flashcards])
  
  function handleNext() {
    setIsAnswerVisible(false)
    setCurrentCardNumber(prev => prev + 1)
    setCardQueue((prevQueue) => {
      const [first, ...rest] = prevQueue
      return [...rest, first]
    })
  }


  


  return (
    <div className="relative flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button className="bg-gray-700 hover:bg-gray-800 hover:border-b-2 hover:border-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors" to="/">Back to Home</Button>
        <h1 className="text-white text-2xl font-bold">Test your knowledge</h1>
        <Button className="bg-gray-700 hover:bg-gray-800 hover:border-b-2 hover:border-r-2 hover:border-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors" onClick={() => setIsOpen(true)}>Add Flashcard</Button>
      </div>
      
      {/* Description */}
      <div className="text-center mb-8">
        <p className="text-white text-lg">Learn languages and test yourself with flashcards</p>
      </div>
      
      {/* Mode Selector */}
      <div className="flex justify-center mb-8">
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
      
      {/* Flashcards */}
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
    </div>
  )
}

export default Flashcards

import Flashcard from '../components/Flashcard'
import Button from '../components/Button'
import CreateFlashCardModal from '../components/CreateFlashCardModal'
import { useState, useEffect } from 'react'

const defaultFlashcards = [
  {
    id: 1,
    question: 'How do you say Dog in Spanish?',
    answer: 'Perro 🐶',
    colorClass: 'bg-gradient-to-br from-indigo-800 to-violet-900',
  },
  {
    id: 2,
    question: 'How do you say Cat in Spanish?',
    answer: 'Gato 🐱',
    colorClass: 'bg-gradient-to-br from-yellow-600 to-yellow-400',
  },
  {
    id: 3,
    question: 'How do you say Bird in Spanish?',
    answer: 'Pájaro 🐦',
    colorClass: 'bg-gradient-to-br from-rose-600 to-pink-500',
  },
  {
    id: 4,
    question: 'How do you say Apple in Spanish?',
    answer: 'Manzana 🍎',
    colorClass: 'bg-gradient-to-br from-green-600 to-lime-800',
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

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards))
  }, [flashcards])

  useEffect(() => {
    setCardQueue([...flashcards])
  }, [flashcards])
  
  function handleNext() {

    setIsAnswerVisible(false)
    setCardQueue((prevQueue) => {
      const [first, ...rest] = prevQueue
      return [...rest, first]
    })
  }

  const currentFlashcard = cardQueue[0]

  const currentIndex = flashcards.findIndex(card => card.id === currentFlashcard.id) + 1

  return (
    <div className="relative flex flex-col justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-white text-2xl font-bold mb-8">Test your knowledge</h1>
        <p className="text-white text-lg mb-8">Learn languages and test yourself with flashcards</p>
        <Button className="absolute top-10 left-10 bg-gray-700 hover:bg-gray-800 hover:border-b-2 hover:border-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors" to="/">Back to Home</Button>
        <Button className="absolute top-10 right-10 bg-gray-700 hover:bg-gray-800 hover:border-b-2 hover:border-r-2 hover:border-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors" onClick={() => setIsOpen(true)}>Add Flashcard</Button>
      </div>
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
                />
              </div>
            )
          })}
      </div>
      
      <CreateFlashCardModal isOpen={isOpen} setIsOpen={setIsOpen} flashcards={flashcards} setFlashcards={setFlashcards} />
    </div>
  )
}

export default Flashcards

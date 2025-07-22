import { useState } from 'react'

function Flashcard({
  flashcard,
  isAnswerVisible,
  setIsAnswerVisible,
  handleNext,
  isInteractive,
  currentIndex,
  totalCards,
}) {
  const [userAnswer, setUserAnswer] = useState('')
  const [isCorrect, setIsCorrect] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSubmitAnswer = () => {
    console.log(userAnswer)
    console.log(flashcard.answer)
    if(userAnswer.trim() === '') return
    const correct = userAnswer.toLowerCase() === flashcard.answer.toLowerCase()
    setIsCorrect(correct)
    setShowFeedback(true)
    setUserAnswer('')
  }

  const handleNextCard = () => {
    setUserAnswer('')
    setIsCorrect(null)
    setShowFeedback(false)
    handleNext()
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-[400px] h-[300px] lg:w-[600px] lg:h-[400px] rounded-lg p-4 shadow-xl text-white ${flashcard.colorClass}`}
    >
      <div className="absolute top-4 right-4 z-10">{currentIndex} / {totalCards}</div>
      <h1 className="text-2xl font-bold mb-4">{flashcard.question}</h1>

      {isInteractive && isAnswerVisible && (
        <p className="text-lg mb-4">{flashcard.answer}</p>
      )}
      <div className="flex items-center justify-center">
        {showFeedback ? (
          // Show feedback
          <div className="text-center">
            <p className={`text-lg font-bold mb-2 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </p>
            <p className="text-sm mb-4">Correct answer: {flashcard.answer}</p>
            <button 
              onClick={handleNextCard}
              className="bg-white text-black px-4 py-2 rounded-lg"
            >
              Next Card
            </button>
          </div>
        ) : (
          // Show input
          <input 
            type="text" 
            value={userAnswer} 
            onChange={(e) => setUserAnswer(e.target.value)} 
            placeholder="Enter your answer" 
            className="bg-white text-black px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white" 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitAnswer()
              }
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Flashcard

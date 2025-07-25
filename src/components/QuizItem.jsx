import { useState, useEffect } from 'react'

function QuizItem({ 
  question, 
  onAnswer, 
  showFeedback, 
  isCorrect, 
  selectedAnswer, 
  studyMode 
}) {
  const [userAnswer, setUserAnswer] = useState('')
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)

  const handleAnswerClick = (selectedOption) => {
    onAnswer(selectedOption)
  }

  const handleFillInSubmit = () => {
    if (userAnswer.trim() === '') return
    
    const correct = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()
    onAnswer(userAnswer, correct)
    setIsAnswerSubmitted(true)
    setUserAnswer('')
  }

  const renderSentence = () => {
    if (!isCorrect) return question.sentence

    const parts = question.sentence.split('___')
    return (
      <>
        {parts[0]}
        <span className="font-bold text-green-600">{question.correctAnswer}</span>
        {parts[1]}
      </>
    )
  }

  const resetState = () => {
    setUserAnswer('')
    setIsAnswerSubmitted(false)
  }

  // Reset state when question changes
  useEffect(() => {
    resetState()
  }, [question])

  return (
    <>
      <h2 className="text-2xl font-bold mb-8">{renderSentence()}</h2>

      {/* Answer options */}
      {studyMode === 'multi' ? (
        <div className="flex items-center justify-center gap-4">
          {question.options.map((option, index) => (
            <button
              onClick={() => handleAnswerClick(option)}
              key={index}
              className={`px-4 py-2 rounded-lg transition-colors border-b-2 border-transparent font-bold ${
                showFeedback && selectedAnswer === option
                  ? isCorrect 
                    ? 'bg-green-600 text-white'
                    : 'bg-red-600 text-white'   
                  : showFeedback && option === question.correctAnswer
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-900 text-white hover:bg-gray-800 hover:border-yellow-500'
              }`} 
            >
              {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="bg-transparent text-black text-lg border-b-2 border-black/50 pb-1 outline-none placeholder:text-black/50 focus:border-black"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFillInSubmit()
              }
            }}
            autoFocus
          />
          {isAnswerSubmitted && (
            <p className={`text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {isCorrect ? '✅ Correct!' : '❌ Incorrect'}
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default QuizItem 
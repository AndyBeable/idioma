import Button from '../components/Button'
import { useState, useEffect } from 'react'

const defaultQuizQuestions = [
  {
    id: 1,
    sentence: 'El coche rojo ___ bonito',
    correctAnswer: 'es',
    options: ['es', 'esta', 'este', 'esto'],
  },
  {
    id: 2,
    sentence: "Los libros ___ en la mesa.",
    correctAnswer: "están",
    options: ["están", "está", "es", "son"],
  },
  {
    id: 3,
    sentence: "¿Cómo ___ tú hoy?",
    correctAnswer: "estás",
    options: ["estás", "está", "es", "son"],
  }
]

function Quiz() {
  const loadQuizQuestions = () => {
    const saved = localStorage.getItem('quizQuestions')
    return saved ? JSON.parse(saved) : defaultQuizQuestions
  }

  const [quizQuestions, setQuizQuestions] = useState(loadQuizQuestions)
  const [studyMode, setStudyMode] = useState('multi')
  
  useEffect(() => {
    localStorage.setItem('quizQuestions', JSON.stringify(quizQuestions))
  }, [quizQuestions])
  

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = quizQuestions[currentQuestionIndex]

  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [lastQuestion, setLastQuestion] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerClick = (selectedAnswer) => {
    if(selectedAnswer === currentQuestion.correctAnswer) {
      setIsCorrect(true)
      setScore(score + 1)
    } else {
      setIsCorrect(false)
    }
    setShowFeedback(true)
    setSelectedAnswer(selectedAnswer)
  }

  const renderSentence = () => {
    if(!isCorrect) return currentQuestion.sentence

    const parts = currentQuestion.sentence.split('___')
    return (
      <>
      {parts[0]}
      <span className="font-bold text-green-600">{currentQuestion.correctAnswer}</span>
      {parts[1]}
      </>
    )
  }

  const handleNextQuestion = () => {
    if(currentQuestionIndex === quizQuestions.length -1) return setLastQuestion(true)
   setCurrentQuestionIndex(currentQuestionIndex + 1)
   setShowFeedback(false)
   setIsCorrect(null)
   setSelectedAnswer(null)
  }
  

  const handleRestartQuiz = () => {
    setScore(0)
    setCurrentQuestionIndex(0)
    setShowFeedback(false)
    setIsCorrect(null)
    setSelectedAnswer(null)
    setLastQuestion(false)
  }


  
  return (
    <div className="relative flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <Button className="bg-gray-700 hover:bg-gray-800 hover:border-b-2 hover:border-yellow-500 text-white font-bold py-3 px-6 rounded-lg transition-colors" to="/">Back to Home</Button>
        <h1 className="text-white text-2xl font-bold">Quiz</h1>
        <div className="w-32"></div> {/* Spacer to center the title */}
      </div>
      
      {/* Description */}
      <div className="text-center mb-8">
        <p className="text-white text-lg">Test your knowledge with quizzes</p>
      </div>
      
      {/* Mode Selector */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-gray-700 rounded-lg p-1">
          <button
            onClick={() => setStudyMode('multi')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              studyMode === 'multi'
                ? 'bg-yellow-500 text-black'
                : 'text-white hover:bg-gray-600'
            }`}
          >
            Multiple Choice
          </button>
          <button
            onClick={() => setStudyMode('fill')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              studyMode === 'fill'
                ? 'bg-yellow-500 text-black'
                : 'text-white hover:bg-gray-600'
            }`}
          >
            Fill in the Blank
          </button>
        </div>
      </div>
      
      {/* Quiz content will go here */}
      <div className="flex-1 flex items-center justify-center">
        <div className={`flex flex-col items-center justify-center w-[400px] h-[300px] lg:w-[600px] lg:h-[400px] rounded-lg p-4 shadow-xl text-black bg-orange-100 text-black`}>
          {!lastQuestion ? (
            // Show the quiz question and answers
            <>
              <h2 className="text-2xl font-bold mb-8">{renderSentence()}</h2>

              {/* Answer options */}
              <div className="flex items-center justify-center gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    onClick={() => handleAnswerClick(option)}
                    key={index}
                    className={`px-4 py-2 rounded-lg transition-colors border-b-2 border-transparent font-bold ${
                      showFeedback && selectedAnswer === option
                        ? isCorrect 
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'   
                        : showFeedback && option === currentQuestion.correctAnswer
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-900 text-white hover:bg-gray-800 hover:border-yellow-500'
                    }`} 
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* Next button */}
              <div className="flex items-center justify-center h-12">
                {showFeedback && (
                  <button onClick={handleNextQuestion} className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors border-b-2 border-transparent hover:border-yellow-500 font-bold">
                    Next Question
                  </button>
                )}
              </div>
            </>
          ) : (
            // Show only the score and restart button
            <div className="flex flex-col items-center justify-center">
              <span className="text-black text-3xl font-bold mb-4">You scored {score}/{quizQuestions.length}</span>
              <button onClick={handleRestartQuiz} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors border-b-2 border-transparent hover:border-yellow-500 font-bold">
                Restart Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Quiz
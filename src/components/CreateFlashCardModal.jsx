import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState, useEffect } from 'react'

function CreateFlashCardModal({ isOpen, setIsOpen, flashcards, setFlashcards }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const colorClasses = [
    'bg-green-600',
    'bg-orange-100',
    'bg-sky-500',
    'bg-orange-100',
    'bg-rose-600',
    'bg-orange-500',
    'bg-red-300',
    'bg-amber-400',
  ]

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setQuestion('')
      setAnswer('')
    }
  }, [isOpen])

  const handleCreateFlashcard = () => {
    // Check if both fields have content (trimmed to remove whitespace)
    if (!question.trim() || !answer.trim()) {
      return // Exit early if either field is empty
    }
    
    const newId = Math.max(...flashcards.map(card => card.id)) + 1
    const randomColorClass = colorClasses[Math.floor(Math.random() * colorClasses.length)]
    setFlashcards([...flashcards, { id: newId, question: question.trim(), answer: answer.trim(), colorClass: randomColorClass }])
    setIsOpen(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (question.trim() && answer.trim())) {
      e.preventDefault()
      handleCreateFlashcard()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setIsOpen(false)
    }
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-full max-w-4xl space-y-4 border bg-gray-800 p-12 rounded-lg">
          <DialogTitle className="font-bold text-xl text-white">Create New Flashcard</DialogTitle>
          <Description className="text-white">
            Add a new flashcard to your collection
          </Description>
          
          <div className="space-y-4" onKeyDown={handleKeyDown}>
            <div>
              <label className="block text-sm font-medium text-white mb-2">Question</label>
              <input 
                type="text" 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
                placeholder="Enter your question..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-2">Answer</label>
              <input 
                type="text" 
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white"
                placeholder="Enter your answer..."
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button 
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-black"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateFlashcard}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create Flashcard
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default CreateFlashCardModal
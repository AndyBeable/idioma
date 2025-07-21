import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Flashcard from './Flashcard'

describe('Flashcard', () => {
  const mockFlashcard = {
    question: 'What is the capital of France?',
    answer: 'Paris',
    colorClass: 'bg-blue-500'
  }

  const defaultProps = {
    flashcard: mockFlashcard,
    isAnswerVisible: false,
    setIsAnswerVisible: vi.fn(),
    handleNext: vi.fn(),
    isInteractive: true,
    currentIndex: 1,
    totalCards: 5
  }

  it('renders the flashcard with question', () => {
    render(<Flashcard {...defaultProps} />)
    
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument()
  })

  it('displays the current index and total cards', () => {
    render(<Flashcard {...defaultProps} />)
    
    expect(screen.getByText('1 / 5')).toBeInTheDocument()
  })

  it('applies the correct color class to the container', () => {
    render(<Flashcard {...defaultProps} />)
    
    const container = screen.getByText('What is the capital of France?').closest('div')
    expect(container).toHaveClass('bg-blue-500')
  })

  it('shows "Reveal" button when answer is not visible', () => {
    render(<Flashcard {...defaultProps} />)
    
    expect(screen.getByRole('button', { name: 'Reveal' })).toBeInTheDocument()
  })

  it('calls setIsAnswerVisible when "Reveal" button is clicked', () => {
    render(<Flashcard {...defaultProps} />)
    
    const revealButton = screen.getByRole('button', { name: 'Reveal' })
    fireEvent.click(revealButton)
    
    expect(defaultProps.setIsAnswerVisible).toHaveBeenCalledWith(true)
  })

  it('shows answer when isAnswerVisible is true', () => {
    render(<Flashcard {...defaultProps} isAnswerVisible={true} />)
    
    expect(screen.getByText('Paris')).toBeInTheDocument()
  })

  it('shows "Next" button when answer is visible', () => {
    render(<Flashcard {...defaultProps} isAnswerVisible={true} />)
    
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument()
  })

  it('calls handleNext when "Next" button is clicked', () => {
    render(<Flashcard {...defaultProps} isAnswerVisible={true} />)
    
    const nextButton = screen.getByRole('button', { name: 'Next' })
    fireEvent.click(nextButton)
    
    expect(defaultProps.handleNext).toHaveBeenCalled()
  })

  it('does not show answer when isInteractive is false', () => {
    render(<Flashcard {...defaultProps} isInteractive={false} isAnswerVisible={true} />)
    
    expect(screen.queryByText('Paris')).not.toBeInTheDocument()
  })

  it('does not show buttons when isInteractive is false', () => {
    render(<Flashcard {...defaultProps} isInteractive={false} />)
    
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders with different flashcard data', () => {
    const differentFlashcard = {
      question: 'What is 2 + 2?',
      answer: '4',
      colorClass: 'bg-green-500'
    }
    
    render(<Flashcard {...defaultProps} flashcard={differentFlashcard} />)
    
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument()
    expect(screen.queryByText('4')).not.toBeInTheDocument()
  })

  it('updates index display when props change', () => {
    const { rerender } = render(<Flashcard {...defaultProps} />)
    
    expect(screen.getByText('1 / 5')).toBeInTheDocument()
    
    rerender(<Flashcard {...defaultProps} currentIndex={3} totalCards={10} />)
    
    expect(screen.getByText('3 / 10')).toBeInTheDocument()
  })
}) 
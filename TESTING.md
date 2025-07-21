# Testing Guide

This project uses Vitest and React Testing Library for testing React components.

## Setup

The testing environment is already configured with:
- **Vitest**: Fast unit test runner
- **React Testing Library**: Testing utilities for React components
- **jsdom**: DOM environment for testing
- **@testing-library/jest-dom**: Custom matchers for assertions

## Running Tests

```bash
# Run tests in watch mode (recommended for development)
npm test

# Run tests once
npm run test:run

# Run tests with UI (if @vitest/ui is installed)
npm run test:ui
```

## Test Structure

Tests are located alongside the components they test with the `.test.jsx` extension:

```
src/
  components/
    Flashcard.jsx
    Flashcard.test.jsx  # Tests for Flashcard component
```

## Writing Tests

### Example Test Structure

```jsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import YourComponent from './YourComponent'

describe('YourComponent', () => {
  const defaultProps = {
    // Define your default props here
  }

  it('should render correctly', () => {
    render(<YourComponent {...defaultProps} />)
    expect(screen.getByText('Expected text')).toBeInTheDocument()
  })

  it('should handle user interactions', () => {
    const mockHandler = vi.fn()
    render(<YourComponent {...defaultProps} onAction={mockHandler} />)
    
    fireEvent.click(screen.getByRole('button'))
    expect(mockHandler).toHaveBeenCalled()
  })
})
```

### Testing Best Practices

1. **Test user behavior, not implementation details**
2. **Use semantic queries** (`getByRole`, `getByText`, `getByLabelText`)
3. **Mock external dependencies** using `vi.fn()`
4. **Test accessibility** by ensuring elements have proper roles and labels
5. **Use descriptive test names** that explain what you're testing

### Available Testing Utilities

- `render()`: Render a React component
- `screen`: Query the rendered component
- `fireEvent`: Simulate user interactions
- `waitFor`: Wait for asynchronous operations
- `vi.fn()`: Create mock functions
- `vi.mock()`: Mock modules

### Common Assertions

```jsx
// Check if element exists
expect(screen.getByText('Text')).toBeInTheDocument()

// Check if element doesn't exist
expect(screen.queryByText('Text')).not.toBeInTheDocument()

// Check if function was called
expect(mockFunction).toHaveBeenCalled()

// Check if function was called with specific arguments
expect(mockFunction).toHaveBeenCalledWith('expected arg')

// Check CSS classes
expect(element).toHaveClass('expected-class')
```

## Flashcard Component Tests

The `Flashcard.test.jsx` file includes comprehensive tests covering:

- ✅ Component rendering
- ✅ Props handling
- ✅ User interactions (button clicks)
- ✅ Conditional rendering
- ✅ Styling classes
- ✅ Accessibility
- ✅ State changes

Run `npm run test:run` to see all tests in action! 
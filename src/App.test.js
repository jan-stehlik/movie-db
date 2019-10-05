import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'

it('should pass', () => {
  const { getByText } = render(<App />)

  getByText(/movie database search/i)
})

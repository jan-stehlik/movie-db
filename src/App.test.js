import React from 'react'
import { render } from '@testing-library/react'
import { App } from './App'

it('should render title', () => {
  const { getByText } = render(<App />)

  getByText(/movie database search/i)
})

it('should render search component', () => {
  const { getByLabelText, getByPlaceholderText } = render(<App />)

  getByLabelText(/search for a movie/i)
  getByPlaceholderText(/e.g. batman/i)
})

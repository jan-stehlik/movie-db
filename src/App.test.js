import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { App } from './App'
import { getMoviesBySearchTerm as mockGetMoviesBySearchTerm } from './api/endpoints'

jest.mock('./api/endpoints', () => {
  return {
    getMoviesBySearchTerm: jest.fn()
  }
})

it('should render title', () => {
  const { getByText } = render(<App />)

  getByText(/movie database search/i)
})

it('should render search component', () => {
  const { getByLabelText, getByPlaceholderText } = render(<App />)

  getByLabelText(/search for a movie/i)
  getByPlaceholderText(/e.g. batman/i)
})

it('should render search button component', () => {
  const { getByText } = render(<App />)

  getByText(/^search$/i)
})

describe('user types a search term', () => {
  it('should display search term', () => {
    const { getByLabelText } = render(<App />)

    const searchInput = getByLabelText(/search for a movie/i)
    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(searchInput.value).toBe('test')
  })
})

describe('user searches for a movie', () => {
  it('should call getMoviesBySearchTerm with a search term input by a user', () => {
    const searchTerm = 'batman'
    const { getByLabelText, getByText } = render(<App />)

    const searchInput = getByLabelText(/search for a movie/i)
    fireEvent.change(searchInput, { target: { value: searchTerm } })

    const searchButton = getByText(/^search$/i)
    fireEvent.click(searchButton)

    expect(mockGetMoviesBySearchTerm).toHaveBeenCalledTimes(1)
    expect(mockGetMoviesBySearchTerm).toHaveBeenCalledWith(searchTerm)
  })
})

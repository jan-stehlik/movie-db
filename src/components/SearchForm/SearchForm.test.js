import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchForm } from './SearchForm'

it('should render search textfield', () => {
  const { getByLabelText, getByPlaceholderText } = render(<SearchForm handleSearch={() => {}} />)

  getByLabelText(/search for a movie/i)
  getByPlaceholderText(/e.g. batman/i)
})

it('should render search button ', () => {
  const { getByText } = render(<SearchForm handleSearch={() => {}} />)

  getByText(/^search$/i)
})

it('should disable search button if already searching', () => {
  const { getByText } = render(<SearchForm handleSearch={() => {}} isSearching />)

  const searchButton = getByText(/^searching$/i)
  expect(searchButton).toBeDisabled()
})

describe('user types a search term', () => {
  it('should display search term', () => {
    const { getByLabelText } = render(<SearchForm handleSearch={() => {}} />)

    const searchInput = getByLabelText(/search for a movie/i)
    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(searchInput.value).toBe('test')
  })
})

describe('user searches for a movie', () => {
  it('should call handleSearch callback with a search term input by a user', () => {
    const searchTerm = 'test'
    const mockHandleSearch = jest.fn()
    const { getByLabelText, getByText } = render(<SearchForm handleSearch={mockHandleSearch} />)

    const searchInput = getByLabelText(/search for a movie/i)
    fireEvent.change(searchInput, { target: { value: searchTerm } })

    const searchButton = getByText(/^search$/i)
    fireEvent.click(searchButton)

    expect(mockHandleSearch).toHaveBeenCalledTimes(1)
    expect(mockHandleSearch).toHaveBeenCalledWith(searchTerm)
  })
})

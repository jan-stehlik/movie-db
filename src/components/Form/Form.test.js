import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Form } from './Form'

const searchTerm = 'test'

it('should render search textfield', () => {
  const { getByLabelText, getByPlaceholderText } = render(<Form handleSearch={() => {}} />)

  getByLabelText(/search for a movie/i)
  getByPlaceholderText(/e.g. batman/i)
})

it('should render search button ', () => {
  const { getByText } = render(<Form handleSearch={() => {}} />)

  getByText(/^search$/i)
})

it('should disable search button if already searching', () => {
  const { getByText } = render(<Form handleSearch={() => {}} isSearching />)

  const searchButton = getByText(/^searching$/i)
  expect(searchButton).toBeDisabled()
})

describe('user types a search term', () => {
  it('should display search term', () => {
    const { getByLabelText } = render(<Form handleSearch={() => {}} />)

    const searchInput = getByLabelText(/search for a movie/i)
    fireEvent.change(searchInput, { target: { value: 'test' } })

    expect(searchInput.value).toBe('test')
  })
})

describe('user searches for a movie', () => {
  it('should call handleSearch callback with a search term input by a user', () => {
    const mockHandleSearch = jest.fn()
    const { getByLabelText, getByText } = render(<Form handleSearch={mockHandleSearch} />)

    const searchInput = getByLabelText(/search for a movie/i)
    fireEvent.change(searchInput, { target: { value: searchTerm } })

    const searchButton = getByText(/^search$/i)
    fireEvent.click(searchButton)

    expect(mockHandleSearch).toHaveBeenCalledTimes(1)
    expect(mockHandleSearch).toHaveBeenCalledWith(searchTerm)
  })
})

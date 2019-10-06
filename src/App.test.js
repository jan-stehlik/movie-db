import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import { App } from './App'
import { getMoviesBySearchTerm as mockGetMoviesBySearchTerm } from './api/endpoints'
import { successStub, errorStub } from './api/stubs/getMoviesBySearchTermStub'

jest.mock('./api/endpoints', () => {
  return {
    getMoviesBySearchTerm: jest.fn()
  }
})

beforeAll(() => {
  mockGetMoviesBySearchTerm.mockImplementation(() => Promise.resolve(successStub))
})

afterEach(() => {
  mockGetMoviesBySearchTerm.mockClear()
})

const searchTerm = 'batman'

it('should render title', () => {
  const { getByText } = render(<App />)

  getByText(/movie database search/i)
})

describe('user searches for a movie', () => {
  it('should call getMoviesBySearchTerm with a search term input by a user', async () => {
    const { getByLabelText, getByText } = render(<App />)

    const searchInput = getByLabelText(/search for a movie/i)
    fireEvent.change(searchInput, { target: { value: searchTerm } })

    const searchButton = getByText(/^search$/i)
    fireEvent.click(searchButton)

    await wait(() => expect(mockGetMoviesBySearchTerm).toHaveBeenCalledTimes(1))
    expect(mockGetMoviesBySearchTerm).toHaveBeenCalledWith(searchTerm)
  })

  describe('search returned successful response', () => {
    it('should display results for a search term', async () => {
      const { getByLabelText, getByText, findByText } = render(<App />)

      const searchInput = getByLabelText(/search for a movie/i)
      fireEvent.change(searchInput, { target: { value: searchTerm } })

      const searchButton = getByText(/^search$/i)
      fireEvent.click(searchButton)

      await findByText(successStub.Search[0].Title)
      getByText(successStub.Search[1].Title)
      getByText(successStub.Search[2].Title)
      getByText(successStub.Search[3].Title)
      getByText(successStub.Search[4].Title)
      getByText(successStub.Search[5].Title)
      getByText(successStub.Search[6].Title)
      getByText(successStub.Search[7].Title)
      getByText(successStub.Search[8].Title)
      getByText(successStub.Search[9].Title)
    })
  })

  describe('search returned error response', () => {
    it('should display error', async () => {
      mockGetMoviesBySearchTerm.mockImplementationOnce(() => Promise.resolve(errorStub))
      const { getByLabelText, getByText, findByText } = render(<App />)

      const searchInput = getByLabelText(/search for a movie/i)
      fireEvent.change(searchInput, { target: { value: searchTerm } })

      const searchButton = getByText(/^search$/i)
      fireEvent.click(searchButton)

      await findByText(errorStub.Error)
    })
  })
})

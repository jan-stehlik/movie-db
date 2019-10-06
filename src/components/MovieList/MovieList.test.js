import React from 'react'
import { render } from '@testing-library/react'
import { MovieList } from './MovieList'

const data = [
  {
    Title: 'Batman: The Dark Knight Returns, Part 2',
    imdbID: 'tt2166834',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYTEzMmE0ZDYtYWNmYi00ZWM4LWJjOTUtYTE0ZmQyYWM3ZjA0XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg'
  },
  {
    Title: 'Batman: Mask of the Phantasm',
    imdbID: 'tt0106364',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYTRiMWM3MGItNjAxZC00M2E3LThhODgtM2QwOGNmZGU4OWZhXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_SX300.jpg'
  },
  {
    Title: 'Batman: Assault on Arkham',
    imdbID: 'tt3139086',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZDU1ZGRiY2YtYmZjMi00ZDQwLWJjMWMtNzUwNDMwYjQ4ZTVhXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg'
  }
]

it('should render list of movies with their images', () => {
  const { getByText, getByAltText } = render(<MovieList data={data} />)

  getByText(data[0].Title)
  const imageA = getByAltText(data[0].Title)
  expect(imageA).toHaveAttribute('src', data[0].Poster)

  getByText(data[1].Title)
  const imageB = getByAltText(data[1].Title)
  expect(imageB).toHaveAttribute('src', data[1].Poster)

  getByText(data[2].Title)
  const imageC = getByAltText(data[2].Title)
  expect(imageC).toHaveAttribute('src', data[2].Poster)
})

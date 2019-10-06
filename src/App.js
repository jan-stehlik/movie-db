import React, { useReducer } from 'react'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash.isempty'
import { getMoviesBySearchTerm } from './api/endpoints'
import { SearchForm } from './components/SearchForm'
import { MovieList } from './components/MovieList'

const searchTypes = {
  SEARCH_START: 'SEARCH_START',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SEARCH_ERROR: 'SEARCH_ERROR'
}

const searchReducer = (state, action) => {
  switch (action.type) {
    case searchTypes.SEARCH_START:
      return {
        ...state,
        isSearching: true,
        data: {},
        error: ''
      }
    case searchTypes.SEARCH_SUCCESS:
      return {
        ...state,
        isSearching: false,
        data: action.data,
        error: ''
      }
    case searchTypes.SEARCH_ERROR:
      return {
        ...state,
        isSearching: false,
        data: {},
        error: action.error
      }
    default:
      throw new Error(`Unhandled type: ${action.type}`)
  }
}

const App = () => {
  const [state, dispatch] = useReducer(searchReducer, {
    data: {},
    error: '',
    isSearching: false
  })
  const { data, error, isSearching } = state

  const handleSearch = async searchTerm => {
    dispatch({ type: searchTypes.SEARCH_START })
    const response = await getMoviesBySearchTerm(searchTerm)

    if (response.Response === 'True') {
      dispatch({ type: searchTypes.SEARCH_SUCCESS, data: response.Search })
    } else {
      dispatch({ type: searchTypes.SEARCH_ERROR, error: response.Error })
    }
  }

  return (
    <>
      <Typography variant="h3">Movie database search</Typography>
      <SearchForm handleSearch={handleSearch} isSearching={isSearching} />
      {!isSearching && !isEmpty(data) && <MovieList data={data} />}
      {!isSearching && !isEmpty(error) && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </>
  )
}

export { App }

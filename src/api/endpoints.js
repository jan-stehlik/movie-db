import axios from 'axios'
import { getSearchUrl } from '../config'

const getMoviesBySearchTerm = async searchTerm => {
  const url = getSearchUrl(searchTerm)
  const response = await axios(url)

  return response
}

export { getMoviesBySearchTerm }

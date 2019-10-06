// given there is no CI/CD process for this demo we hardcode api key
const apiKey = process.env.API_KEY || '3371d963'

export const getSearchUrl = searchTerm => `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&r=json&type=movie`

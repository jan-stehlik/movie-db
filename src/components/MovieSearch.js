import React from 'react'
import TextField from '@material-ui/core/TextField'

const MovieSearch = () => (
  <TextField
    id="movie search"
    label="Search for a movie"
    placeholder="e.g. batman"
    margin="normal"
    variant="outlined"
  />
)

export { MovieSearch }

import React from 'react'
import Typography from '@material-ui/core/Typography'
import { MovieSearch } from './components'

const App = () => (
  <>
    <Typography variant="h3">Movie database search</Typography>
    <MovieSearch />
  </>
)

export { App }

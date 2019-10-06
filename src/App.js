import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import { getMoviesBySearchTerm } from './api/endpoints'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    marginTop: theme.spacing(4)
  }
}))

const App = () => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = async () => {
    const response = await getMoviesBySearchTerm(searchTerm)
  }

  return (
    <>
      <Typography variant="h3">Movie database search</Typography>
      <Grid container spacing={2} className={classes.root}>
        <Grid item>
          <TextField
            id="movie search"
            label="Search for a movie"
            placeholder="e.g. batman"
            margin="normal"
            variant="outlined"
            value={searchTerm}
            onChange={event => setSearchTerm(event.target.value)}
          />
        </Grid>
        <Grid item className={classes.button}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Search
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export { App }

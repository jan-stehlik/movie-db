import React, { useState, useReducer } from 'react'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import isEmpty from 'lodash.isempty'
import { makeStyles } from '@material-ui/core/styles'
import { getMoviesBySearchTerm } from './api/endpoints'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    marginTop: theme.spacing(4)
  },
  movieList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  }
}))

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
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')
  const [state, dispatch] = useReducer(searchReducer, {
    data: {},
    error: '',
    isSearching: false
  })
  const { data, error, isSearching } = state

  const handleSubmit = async () => {
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
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSearching}>
            {isSearching ? 'Searching' : 'Search'}
          </Button>
        </Grid>
      </Grid>
      {!isSearching && !isEmpty(data) && (
        <div className={classes.movieList}>
          {data.map(tile => (
            <GridListTile key={tile.imdbID}>
              <img src={tile.Poster} alt={tile.Title} />
              <GridListTileBar title={tile.Title} />
            </GridListTile>
          ))}
        </div>
      )}
      {!isSearching && !isEmpty(error) && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}
    </>
  )
}

export { App }

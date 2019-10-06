import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    marginTop: theme.spacing(4)
  }
}))

const propTypes = {
  handleSearch: PropTypes.func.isRequired,
  isSearching: PropTypes.bool
}

const Form = ({ handleSearch, isSearching = false }) => {
  const classes = useStyles()
  const [searchTerm, setSearchTerm] = useState('')

  return (
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
        <Button variant="contained" color="primary" onClick={() => handleSearch(searchTerm)} disabled={isSearching}>
          {isSearching ? 'Searching' : 'Search'}
        </Button>
      </Grid>
    </Grid>
  )
}

Form.propTypes = propTypes

export { Form }

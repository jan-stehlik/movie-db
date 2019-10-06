import React from 'react'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
  movieList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden'
  }
}))

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
      Poster: PropTypes.string
    })
  )
}

const MovieList = ({ data }) => {
  const classes = useStyles()

  return (
    <div className={classes.movieList}>
      {data.map(tile => (
        <GridListTile key={tile.imdbID}>
          <img src={tile.Poster} alt={tile.Title} />
          <GridListTileBar title={tile.Title} />
        </GridListTile>
      ))}
    </div>
  )
}

MovieList.propTypes = propTypes

export { MovieList }

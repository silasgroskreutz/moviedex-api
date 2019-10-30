require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIES = require('./movies-data-small.json')

const app = express()

const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting))
app.use(helmet())
app.use(cors())

//based on pokemon example code (checkpoint 6)
//helmet middleware is in 'fetchful' section

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
      return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
  })

app.get('/movie', function handleGetMovies(req, res) {
    let response = MOVIES;

    // assignment has 3 types of responses genre, counttry, avg_vote
    // in query string paramters

    if (req.query.genre) {
        response = repsonse.filter(movie =>
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    if (req.query.country) {
        response = response.filter(movie =>
          movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
      }

    // From hint: using NUMBER to change string to number
    if (req.query.avg_vote) {
        response = response.filter(movie =>
          Number(movie.avg_vote) >= Number(req.query.avg_vote)
        )
      }


} )

const PORT = process.env.PORT || 8000
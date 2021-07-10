const express = require('express')
const app = express()
const port = 8000
const path = require('path')
const mongoose = require('mongoose')

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
  //res.sendFile("/static/index.html")
})

app.get('/exercise', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/exercise.html'))
  //res.sendFile("/static/index.html")
})

app.get('/stats', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/stats.html'))
  //res.sendFile("/static/index.html")
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
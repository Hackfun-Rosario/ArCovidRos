const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  app = express(),
  db = require('./db'),
  port = process.env.PORT || 7000,
  statsRouter = require('./routes/stats-routes')

  app.use(bodyParser.urlencoded({ extended: true}))
  app.use(cors())
  app.use(bodyParser.json())
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'))
  
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.use('/api', statsRouter)
  
  app.listen(port, () => console.log(`Server listening on port ${port}`))
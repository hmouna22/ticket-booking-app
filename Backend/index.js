const express = require('express')
const cors = require('cors')
const user = require('./routes/user.js')
const ticket = require('./routes/ticket.js')
const transportation = require('./routes/transportation.js')
const trip = require('./routes/trip.js')
const db = require('./models/index.js')

const app = express()
app.use(express.json())
app.use(cors())

//use routes
app.use('/user', user)
app.use('/ticket', ticket)
app.use('/transportation', transportation)
app.use('/trip', trip)

db.sequelize.sync() // Sync the models with the database
  .then(() => {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to start the server:', error);
  });
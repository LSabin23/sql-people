const db = require('./db/connection')
const app = require('./lib/app')

db.connect(err => {
  if (err) throw err
  console.log('Database connected.')
  // app()
})

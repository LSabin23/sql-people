const cTable = require('console.table')
const db = require('../server')
const app = require('./app')

class Department {
  // View all departments
  // static methods can be called without instantiating their class and *cannot* be called through a class instance
  static viewAllDepts () {
    console.log('View all depts fxn called.')
    // formatted table showing dept. names and ids
    const sql = `SELECT * FROM department`

    db.query(sql)
      .then(([rows]) => {
        cTable(rows)
        // call menu prompt again
        // app.mainMenu()
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

module.exports = Department

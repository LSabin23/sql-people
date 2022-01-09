const cTable = require('console.table')
const connection = require('../db/connection')
const mainMenu = require('../server')

class Department {
  // View all departments
  // static methods can be called without instantiating their class and *cannot* be called through a class instance
  static viewAllDepts () {
    console.log('View all depts fxn called.')
    // formatted table showing dept. names and ids
    const sql = `SELECT * FROM department`

    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        return
      }
      console.table(results)
      mainMenu.mainMenu()
    })
  }
}

module.exports = Department

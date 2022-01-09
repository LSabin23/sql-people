const cTable = require('console.table')
const inquirer = require('inquirer')
const connection = require('../db/connection')
const mainMenu = require('../server')

// DEPARTMENT PROMPTS START
const addDeptPrompt = [
  {
    type: 'input',
    name: 'deptTitle',
    message: 'Enter the name of the department to add.',
    validate: deptTitleInput => {
      if (deptTitleInput) {
        return true
      } else {
        console.log('Please enter the new department\'s name.')
      }
    }
  }
]
// DEPARTMENT PROMPTS END

class Department {
  // View all departments
  // static methods can be called without instantiating their class and *cannot* be called through a class instance
  static viewAllDepts () {
    // console.log('View all depts fxn called.')
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

  // add a deparment
  static addDept () {
    // console.log('Add a department fxn called.')
    inquirer
      .prompt(addDeptPrompt)
      // validate prompt response is correct before adding to database
      // .then((addDeptResponse) => {
      //   console.log(addDeptResponse)
      //   mainMenu.mainMenu()
      // })
      .then((addDeptResponse) => {
        const sql = `INSERT INTO department (name)
                      VALUES (?)`
        const params = [addDeptResponse.deptTitle]

        connection.query(sql, params, (error, results) => {
          if (error) {
            console.log(error)
            return
          }
          console.table(`The ${params} department has been added.`)
          mainMenu.mainMenu()
        })
      })
  }

  static getDepartments () {
    const sql = `SELECT * FROM department`
    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        return
      }
      // reformat results array of objects to display as list to user
      const deptList = results.map(({ id, name }) => (
        {
          name: name,
          value: id
        }
      ))
      console.log(deptList)
      // return deptList
    })
  }
}

module.exports = Department

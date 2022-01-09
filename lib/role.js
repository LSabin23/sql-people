const cTable = require('console.table')
const inquirer = require('inquirer')
const connection = require('../db/connection')
const mainMenu = require('../server')
const Department = require('./department')


const currentDepts = Department.getDepartments()

// ROLE PROMPTS START
const addRolePrompt = [
  {
    type: 'input',
    name: 'roleTitle',
    message: 'Enter the name of the role to add.',
    validate: roleTitleInput => {
      if (roleTitleInput) {
        return true
      } else {
        console.log('Please enter the new role name.')
      }
    }
  },
  {
    type: 'input',
    name: 'roleSalary',
    message: 'Enter the salary of the new role.',
    validate: roleSalaryInput => {
      if (roleSalaryInput) {
        return true
      } else {
        console.log('Please enter the new role\'s salary.')
      }
    }
  },
  {
    type: 'list',
    name: 'deptForRole',
    message: 'Select the department associated with this role.',
    choices: [
      // available roles array
      // 'A', 'B', 'C'
      currentDepts
    ]
  }
]
// ROLE PROMPTS END

class Role {
  // View all Roles
  static viewAllRoles () {
    console.log('View all roles fxn chosen.')

    const sql = `SELECT * FROM role`

    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        return
      }
      console.table(results)
      mainMenu.mainMenu()
    })
  }

  static addRole () {
    inquirer
      .prompt(addRolePrompt)
      // validate addRoleResponse before adding to database
      .then((addRoleResponse) => {
        console.log(addRoleResponse)
        mainMenu.mainMenu()
      })
      // .then((addRoleResponse) => {
      //   const sql = `INSERT INTO role (title, salary, department)
      //                 VALUES (?, ?, ?)`
      //   const params = [empRole.roleTitle, empRole.roleSalary, empRole.deptForRole]
      // })
  }
}

module.exports = Role

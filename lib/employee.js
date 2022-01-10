const cTable = require('console.table')
const inquirer = require('inquirer')
const connection = require('../db/connection')
const mainMenu = require('../server')

// EMPLOYEE PROMPTS START
const addEmpPrompt = [
  {
    type: 'input',
    name: 'empFirstName',
    message: 'Enter new employee\'s FIRST name.',
    validate: empFirstNameInput => {
      if (empFirstNameInput) {
        return true
      } else {
        console.log('Please enter the new employee\'s first name.')
      }
    }
  },
  {
    type: 'input',
    name: 'empLastName',
    message: 'Enter new employee\'s LAST name.',
    validate: empLastNameInput => {
      if (empLastNameInput) {
        return true
      } else {
        console.log('Please enter the new employee\'s last name.')
      }
    }
  },
  {
    type: 'list',
    name: 'empRole',
    message: 'Select new employee\'s role.'
  },
  {
    type: 'list',
    name: 'empMgr',
    message: 'Select new employee\'s manager (if not applicable, select N/A).',
    choices: [
      // managers array
    ]
  }
]

const updateEmpRolePrompt = [
  {
    type: 'list',
    name: 'currentEmp',
    message: 'Select an employee to update their role.',
    choices: [
      // pull list of employees from employee table
      // create an array of results to insert here?
    ]
  }
]
// EMPLOYEE PROMPTS END

class Employee {
  // View all Employees
  static viewAllEmployees () {
    console.log('View all employees fxn chosen.')

    const sql = `SELECT employee.id AS ID,
                  CONCAT_WS(', ', employee.last_name, employee.first_name) AS 'Employee Name',
                  role.title AS 'Job Title',
                  role.salary AS Salary,
                  department.name AS Department,
                  CONCAT_WS(', ', manager.last_name, manager.first_name) AS Manager
                  FROM employee
                  LEFT JOIN role
                  ON employee.role_id = role.id
                  LEFT JOIN department
                  ON role.department_id = department.id
                  LEFT JOIN employee manager
                  ON employee.manager_id = manager.id
                  ORDER BY employee.last_name ASC`

    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        return
      }
      console.table(results)
      mainMenu.mainMenu()
    })
  }

  static addEmployee () {
    inquirer
      .prompt(addEmpPrompt)
      .then((addEmpResponse) => {
        console.log(addEmpResponse)
        mainMenu.mainMenu()
      })
  }

  static updateEmployee () {
    inquirer
      .prompt(updateEmpRolePrompt)
      .then((updateEmpRoleResponse) => {
        console.log(updateEmpRoleResponse)
        mainMenu.mainMenu()
      })
  }
}

module.exports = Employee

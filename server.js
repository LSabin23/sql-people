const db = require('./db/connection')
const inquirer = require('inquirer')
const Department = require('./lib/department')

// MENU PROMPT START
const menuPrompt = [
  {
    type: 'list',
    name: 'menu',
    message: 'Select an option',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role'
    ]
  }
]
// MENU PROMPT END

const app = () => {
  mainMenu()
}

const mainMenu = () => {
  inquirer
    .prompt(menuPrompt)
    .then(({ menu }) => {
      // use switch cases instead of if else for lists longer than 5 options
      switch (menu) {
        case 'View all departments':
          // call SQL query for showing all departments
          console.log('View all departments chosen.')
          Department.viewAllDepts()
          break
        case 'View all roles':
          // call SQL query for showing all roles
          console.log('View all roles chosen.')
          break
        case 'View all employees':
          // call SQL query for showing all employees
          console.log('View all employees chosen.')
          break
        case 'Add a department':
          // call fxn to prompt user for department name
          // call SQL query to add department to database
          console.log('Add department chosen.')
          break
        case 'Add a role':
          // call fxn to prompt user for name, salary, and department for role
          // call SQL query to add role to database
          console.log('Add role chosen.')
          break
        case 'Add an employee':
          // call fxn to prompt user for first name, last name, role, and manager of employee
          // call SQL query to add employee to database
          console.log('Add employee chosen.')
          break
        case 'Update an employee role':
          // call prompt list for employee
          // prompt user to enter new role for selected employee
          // call SQL query to update employee role in database
          console.log('Update employee role chosen.')
      }
    })
}

app()

module.exports.mainMenu = mainMenu

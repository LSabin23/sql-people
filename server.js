const inquirer = require('inquirer')
const Department = require('./lib/department')
const Role = require('./lib/role')
const Employee = require('./lib/employee')

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
          // call fxn for showing all departments
          console.log('View all departments chosen.')
          Department.viewAllDepts()
          break
        case 'View all roles':
          // call fxn for showing all roles
          console.log('View all roles chosen.')
          Role.viewAllRoles()
          break
        case 'View all employees':
          // call fxn for showing all employees
          console.log('View all employees chosen.')
          Employee.viewAllEmployees()
          break
        case 'Add a department':
          // call fxn to prompt user for department name
          console.log('Add department chosen.')
          Department.addDept()
          break
        case 'Add a role':
          // call fxn to prompt user for name, salary, and department for role
          console.log('Add role chosen.')
          Role.addRole()
          break
        case 'Add an employee':
          // call fxn to prompt user for first name, last name, role, and manager of employee
          console.log('Add employee chosen.')
          Employee.addEmployee()
          break
        case 'Update an employee role':
          // call fxn with prompt list for employee and prompt list for employee's new role
          console.log('Update employee role chosen.')
          Employee.updateEmployeeRole()
      }
    })
}

app()

module.exports.mainMenu = mainMenu

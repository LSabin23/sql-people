const cTable = require('console.table')
const inquirer = require('inquirer')
const connection = require('../db/connection')
const mainMenu = require('../server')
const Role = require('./role')

// EMPLOYEE PROMPTS START
// const addEmpPrompt =

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

    // 'LEFT JOIN employee manager' is a SELF JOIN that enables utilization of manager.<column_name> even though the table isn't called manager to begin with
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

  // BONUS: add 'View all employees by manager'
  // BONUS: add 'View all employees by department'

  static async addEmployee () {
    const currentRoles = await Role.getRoles()
    const currentMgrs = await Employee.getManagers()
    inquirer
      .prompt([
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
          message: 'Select new employee\'s role.',
          choices: currentRoles
        },
        {
          type: 'list',
          name: 'empMgr',
          message: 'Select new employee\'s manager (if not applicable, select N/A).',
          choices: currentMgrs
        }
      ])
      .then((addEmpResponse) => {
        if (addEmpResponse.empMgr === 'N/A, this employee is a manager.') {
          // must use lowercase 'null' instead of 'NULL' as JS thinks that's a variable name
          addEmpResponse.empMgr = null
        }
        const roleId = addEmpResponse.empRole.split(' ')
        let mgrId = ''
        if (addEmpResponse.empMgr !== null) {
          const splitMgrId = addEmpResponse.empMgr.split(' ')
          mgrId = splitMgrId[0]
        } else {
          mgrId = null
        }
        // console.log(addEmpResponse, roleId[0], mgrId)
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                      VALUES (?, ?, ?, ?)`

        const params = [
          addEmpResponse.empFirstName,
          addEmpResponse.empLastName,
          roleId[0],
          mgrId
        ]

        connection.query(sql, params, (error, results) => {
          if (error) {
            console.log(error)
            return
          }
          console.log(`Employee ${params[0]} ${params[1]} was added.`)
          mainMenu.mainMenu()
        })
      })
  }

  // BONUS: add 'Delete employee'

  static updateEmployeeRole () {
    inquirer
      .prompt(updateEmpRolePrompt)
      .then((updateEmpRoleResponse) => {
        console.log(updateEmpRoleResponse)
        mainMenu.mainMenu()
      })
  }

  // BONUS: add 'Update employee manager'

  static getManagers () {
    return new Promise(resolve => {
      const sql = `SELECT * FROM employee
                    WHERE manager_id IS NULL`

      connection.query(sql, (error, results) => {
        if (error) throw error
        const mgrList = results.map((data) => data.id + ' ' + data.first_name + ' ' + data.last_name)
        // add an option to select no manager
        mgrList.push('N/A, this employee is a manager.')
        // console.log(mgrList)
        resolve(mgrList)
      })
    })
  }
}

module.exports = Employee

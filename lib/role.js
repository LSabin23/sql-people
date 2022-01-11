const cTable = require('console.table')
const inquirer = require('inquirer')
const connection = require('../db/connection')
const mainMenu = require('../server')
const Department = require('./department')

// ROLE PROMPTS START
// placeholder for if I figure out how to pull prompts that need to wait for Promises out of their function and into a variable
// maybe use a separate function that calls that function, but then how would I push to the variable inside the prompt if it's not global?
// ROLE PROMPTS END

class Role {
  // View all Roles
  static viewAllRoles () {
    console.log('View all roles fxn chosen.')

    const sql = `SELECT role.id, role.title, role.salary, department.name AS department
                  FROM role
                  LEFT JOIN department
                  ON role.department_id = department.id
                  ORDER BY role.title ASC`

    connection.query(sql, (error, results) => {
      if (error) {
        console.log(error)
        return
      }
      console.table(results)
      mainMenu.mainMenu()
    })
  }

  static async addRole () {
    const currentDepts = await Department.getDepartments()
    inquirer
      .prompt([
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
          choices: currentDepts
        }
      ])
      // validate addRoleResponse before adding to database
      // .then((addRoleResponse) => {
      //   const deptId = addRoleResponse.deptForRole.split(' ')
      //   console.log(deptId[0])
      //   mainMenu.mainMenu()
      // })
      .then((addRoleResponse) => {
        // separate the department id from the title
        const deptId = addRoleResponse.deptForRole.split(' ')
        const sql = `INSERT INTO role (title, salary, department_id)
                      VALUES (?, ?, ?)`
        const params = [addRoleResponse.roleTitle, addRoleResponse.roleSalary, deptId[0]]

        connection.query(sql, params, (error, results) => {
          if (error) {
            console.log(error)
            return
          }
          console.log(`The ${params[0]} role was added.`)
          mainMenu.mainMenu()
        })
      })
  }

  // BONUS: add 'Delete role'

  static getRoles () {
    return new Promise(resolve => {
      const sql = `SELECT * FROM role`

      connection.query(sql, (error, results) => {
        if (error) throw error
        const roleList = results.map((data) => data.id + ' ' + data.title)
        // console.log(roleList)
        resolve(roleList)
      })
    })
  }
}

module.exports = Role
